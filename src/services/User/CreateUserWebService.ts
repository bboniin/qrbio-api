import { addDays, format, isBefore, startOfDay } from "date-fns";
import prismaClient from "../../prisma";
import { hash } from "bcryptjs";
import { resolve } from "path";
import fs from "fs";
import nodemailer from "nodemailer";
import handlebars from "handlebars";
import { validateEmail } from "../../config/functions";

interface UserRequest {
  name: string;
  email: string;
  phone_number: string;
  password: string;
  nickname: string;
  description: string;
  code: string;
  qrcode: string;
  instagram: string;
}

class CreateUserWebService {
  async execute({
    name,
    email,
    phone_number,
    password,
    nickname,
    qrcode,
    instagram,
    code,
    description,
  }: UserRequest) {
    if (!email || !name || !phone_number || !password || !nickname) {
      throw new Error("Preencha todos os campos obrigátorios");
    }

    if (!validateEmail(email)) {
      throw new Error("Email é inválido");
    }

    const userAlreadyExists = await prismaClient.user.findFirst({
      where: {
        email: email,
      },
    });

    if (userAlreadyExists) {
      throw new Error("Email já cadastrado");
    }

    const nicknameAlreadyExists = await prismaClient.profile.findFirst({
      where: {
        nickname: nickname,
      },
    });

    if (nicknameAlreadyExists) {
      throw new Error("Usuário já está em uso");
    }

    const passwordHash = await hash(password, 8);

    let rescueCode = false;

    if (code) {
      const coupon = await prismaClient.coupon.findFirst({
        where: {
          coupon_id: code,
        },
        include: {
          batchsCoupon: true,
        },
      });

      if (!coupon) {
        throw new Error("Esse cupom é inválido");
      }

      if (coupon.rescued) {
        throw new Error("Cupom já foi resgatado");
      }

      const batch = coupon.batchsCoupon;

      if (batch.expiration_enable) {
        if (
          isBefore(startOfDay(batch.expiration_date), startOfDay(new Date()))
        ) {
          throw new Error(
            `Esse cupom expirou dia ${format(
              batch.expiration_date,
              "dd/MM/yyyy"
            )}`
          );
        }
      }

      rescueCode = true;
    }

    let rescueTag = false;

    if (qrcode) {
      const tag = await prismaClient.tag.findFirst({
        where: {
          id: qrcode,
        },
      });

      if (!tag) {
        throw new Error(
          "Essa tag não existe no nosso sistema ou já foi apagada"
        );
      }

      if (tag.profile_id) {
        throw new Error("Tag já está vinculada a um perfil");
      }

      rescueTag = true;
    }

    const user = await prismaClient.user.create({
      data: {
        name: name,
        email: email,
        password: passwordHash,
        phone_number: phone_number,
        profiles: {
          create: {
            name: name,
            nickname: nickname,
            description: description,
          },
        },
      },
      select: {
        id: true,
        name: true,
        email: true,
        profiles: true,
      },
    });

    const profile = user.profiles[0];

    let redes = [
      {
        name: "Telefone",
        url: phone_number,
        order: 0,
        user_id: user.id,
        profile_id: profile.id,
      },
      {
        name: "Whatsapp",
        url: phone_number,
        order: 0,
        user_id: user.id,
        profile_id: profile.id,
      },
      {
        name: "Email",
        url: email,
        order: 0,
        user_id: user.id,
        profile_id: profile.id,
      },
    ];

    if (instagram) {
      redes.push({
        name: "Instagram",
        url: instagram,
        order: 3,
        user_id: user.id,
        profile_id: profile.id,
      });
    }

    if (rescueTag) {
      const tagLinked = await prismaClient.tag.update({
        where: {
          id: qrcode,
        },
        include: {
          batch: true,
        },
        data: {
          name: name,
          profile_id: profile.id,
        },
      });

      if (tagLinked.batch.partner_id) {
        await prismaClient.profile.update({
          where: {
            id: profile.id,
          },
          data: {
            partner_id: tagLinked.batch.partner_id,
          },
        });
      }

      if (!profile.promotional && profile.plan_name == "free") {
        await prismaClient.profile.update({
          where: {
            id: profile.id,
          },
          data: {
            promotional: true,
          },
        });
        tagLinked["plan"] = "promocional";
      }
    }

    await prismaClient.social.createMany({
      data: redes,
    });

    if (rescueCode) {
      const coupon = await prismaClient.coupon.findFirst({
        where: {
          coupon_id: code,
        },
        include: {
          batchsCoupon: true,
        },
      });

      const batch = coupon.batchsCoupon;
      const partner_id = batch.partner_id;

      const plans = {
        promocional: 365,
        bronze: 90,
        prata: 180,
        ouro: 365,
        "prime-90": 90,
        "prime-180": 180,
        "prime-365": 365,
        "prime-vip": 365,
        "prime-promocional": 365,
      };

      const days_plan = batch.days_plan || plans[coupon.plan];

      let plan_name = coupon.plan;

      await prismaClient.purchase.create({
        data: {
          name: plan_name,
          profile_id: profile.id,
          purchase_id: "CP:" + coupon.coupon_id,
          token_id: "CP:" + coupon.coupon_id,
          value: 0,
        },
      });

      let plan = await prismaClient.plan.create({
        data: {
          name: plan_name,
          profile_id: profile.id,
          validity: addDays(new Date(), days_plan),
          id: profile.id,
        },
      });

      let data = {
        plan_name: plan_name,
      };

      if (partner_id) {
        data["partner_id"] = partner_id;
      }

      await prismaClient.profile.update({
        where: {
          id: profile.id,
        },
        data: data,
      });

      await prismaClient.coupon.update({
        where: {
          id: coupon.id,
        },
        data: {
          rescued: true,
        },
      });

      return plan;
    }
    const path = resolve(__dirname, "..", "..", "views", "welcomeEmail.hbs");

    const templateFileContent = fs.readFileSync(path).toString("utf-8");

    const templateParse = handlebars.compile(templateFileContent);

    const templateHTML = templateParse({
      email: user.email,
      name: user.name,
      password: password,
      id: user.id,
    });

    var transport = await nodemailer.createTransport({
      host: "smtp.hostinger.com",
      port: 465,
      secure: true,
      auth: {
        user: "bemvindo@qrbio.com.br",
        pass: "8812Dr#xx",
      },
    });

    await transport.sendMail({
      from: {
        name: "Equipe QRBio",
        address: "bemvindo@qrbio.com.br ",
      },
      to: {
        name: user.name,
        address: user.email,
      },
      cc: "rodrigoipatinga@hotmail.com",
      subject: "[QRBio] Bem-vindo ao QRBio! 🎉",
      html: templateHTML,
    });

    return user;
  }
}

export { CreateUserWebService };
