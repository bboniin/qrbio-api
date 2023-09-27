import prismaClient from '../../prisma'
import { resolve } from "path";
import fs from "fs";
import nodemailer from "nodemailer";
import handlebars from "handlebars";

interface BodyRequest {
    userId: string;
}

class SendEmailConfirmService {
    async execute({ userId }: BodyRequest) {

        const user = await prismaClient.user.findFirst({
            where: {
                id: userId
            }
        })

        if (!user) {
            throw new Error("Usuário não encontrado")
        }

        const path = resolve(
            __dirname,
            "..",
            "..",
            "views",
            "confirmEmail.hbs"
        );

        const templateFileContent = fs.readFileSync(path).toString("utf-8");

        const templateParse = handlebars.compile(templateFileContent);

        const templateHTML = templateParse({
            id: userId,
            name: user.name,
        });

        var transport = await nodemailer.createTransport({
            host: "smtp.hostinger.com",
            port: 465,
            secure: true,
            auth: {
                user: "confirmacaodemail@qrbio.com.br",
                pass: "BoniAdson85Dr#xx",
            },
        });

        await transport.sendMail({
            from: {
                name: "Equipe QRBio",
                address: "confirmacaodemail@qrbio.com.br",
            },
            to: {
                name: user.name,
                address: user.email,
            },
            subject: "[QRBio] Confirme seu Email",
            html: templateHTML,
        });

        return;
    }
}

export { SendEmailConfirmService }