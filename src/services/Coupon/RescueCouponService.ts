import { addDays, isBefore, format, startOfDay } from "date-fns";
import prismaClient from "../../prisma";

interface CouponRequest {
  profile_id: string;
  id: string;
}

class RescueCouponService {
  async execute({ id, profile_id }: CouponRequest) {
    if (!id || !profile_id) {
      throw new Error("Id da tag e do perfil é obrigátorio");
    }

    const coupon = await prismaClient.coupon.findFirst({
      where: {
        coupon_id: id,
      },
      include: {
        batchsCoupon: true,
      },
    });

    const profile = await prismaClient.profile.findFirst({
      where: {
        id: profile_id,
      },
    });

    if (!profile) {
      throw new Error("Essa perfil não existe no nosso sistema");
    }

    if (!coupon) {
      throw new Error("Esse cupom é inválido");
    }

    if (coupon.rescued) {
      throw new Error("Cupom já foi resgatado");
    }

    const batch = coupon.batchsCoupon;
    const partner_id = batch.partner_id;

    if (batch.expiration_enable) {
      if (isBefore(startOfDay(batch.expiration_date), startOfDay(new Date()))) {
        throw new Error(
          `Esse cupom expirou dia ${format(
            batch.expiration_date,
            "dd/MM/yyyy"
          )}`
        );
      }
    }

    const getPlan = await prismaClient.plan.findUnique({
      where: {
        id: profile_id,
      },
    });

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

    const plansName = [
      "free",
      "promocional",
      "bronze",
      "prata",
      "ouro",
      "prime-90",
      "prime-180",
      "prime-365",
      "prime-vip",
      "prime-promocional",
      "business",
    ];

    let plan_name = coupon.plan;

    if (getPlan) {
      plan_name =
        plansName.indexOf(coupon.plan) > plansName.indexOf(getPlan.name)
          ? coupon.plan
          : getPlan.name;
    }

    await prismaClient.purchase.create({
      data: {
        name: plan_name,
        profile_id: profile_id,
        purchase_id: "CP:" + coupon.coupon_id,
        token_id: "CP:" + coupon.coupon_id,
        value: 0,
      },
    });

    if (getPlan) {
      let plan = await prismaClient.plan.update({
        where: {
          profile_id: profile_id,
        },
        data: {
          name: plan_name,
          validity: addDays(getPlan.validity, days_plan),
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
          id: profile_id,
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
    } else {
      let plan = await prismaClient.plan.create({
        data: {
          name: plan_name,
          profile_id: profile_id,
          validity: addDays(new Date(), days_plan),
          id: profile_id,
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
          id: profile_id,
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
  }
}

export { RescueCouponService };
