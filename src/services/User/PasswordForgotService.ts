import prismaClient from '../../prisma'
import { resolve } from "path";
import fs from "fs";
import nodemailer from "nodemailer";
import handlebars from "handlebars";

interface BodyRequest {
    email: string;
}

class PasswordForgotService {


    async execute({ email }: BodyRequest) {

        if (!email) {
            throw new Error("Insira o email")
        }

        const user = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        })

        if (!user) {
            throw new Error("Usuário não encontrado")
        }

        const code = Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000;

        await prismaClient.passwordForgot.create({
            data: {
                user_email: email,
                code: String(code),
            }
        });

        const path = resolve(
            __dirname,
            "..",
            "..",
            "views",
            "forgotPassword.hbs"
        );

        const templateFileContent = fs.readFileSync(path).toString("utf-8");

        const templateParse = handlebars.compile(templateFileContent);

        const templateHTML = templateParse({
            code,
            name: user.name,
        });

        var transport = await nodemailer.createTransport({
            host: "smtp.flockmail.com",
            port: 465,
            secure: true,
            auth: {
                user: "support@qrcartao.com.br",
                pass: "88120217Dr#",
            },
        });


        await transport.sendMail({
            from: {
                name: "Equipe QRBio",
                address: "support@qrcartao.com.br",
            },
            to: {
                name: user.name,
                address: user.email,
            },
            subject: "[QRBio] Recuperação de senha",
            html: templateHTML,
        });

        return;

    }
}

export { PasswordForgotService }