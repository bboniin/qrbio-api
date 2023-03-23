import { format } from 'date-fns';
import prismaClient from '../../prisma'
import { resolve } from "path";
import fs from "fs";
import nodemailer from "nodemailer";
import handlebars from "handlebars";

interface CountRequest {
    profile_id: string;
}

class CountProfileService {
    async execute({ profile_id }: CountRequest) {


        const profile = await prismaClient.profile.findUnique({
            where: {
                id: profile_id
            },
            include: {
                user: true
            }
        })

        let date = new Date()

        const countProfile = await prismaClient.viewProfile.findMany({
            where: {
                profile_id: profile_id,
                month: format(date, "MM"),
                year: format(date, "yyyy")
            }
        })

        const plans = {
            "free": 100,
            "promocional": 200,
            "bronze": 300,
            "prata": 500,
            "ouro": 1000,
            "business": 9999
        }


        if (plans[profile.plan_name] * 0.8 == countProfile.length) {

            const path = resolve(
                __dirname,
                "..",
                "..",
                "views",
                "viewsProfile.hbs"
            );

            const templateFileContent = fs.readFileSync(path).toString("utf-8");

            const templateParse = handlebars.compile(templateFileContent);

            const templateHTML = templateParse({
                profile: profile.name,
                name: profile.user.name,
            });

            var transport = await nodemailer.createTransport({
                host: "smtp.hostinger.com",
                port: 465,
                secure: true,
                auth: {
                    user: "contato@qrbio.com.br",
                    pass: "88120217Dr#",
                },
            });

            await transport.sendMail({
                from: {
                    name: "Equipe QRBio",
                    address: "contato@qrbio.com.br",
                },
                to: {
                    name: profile.user.name,
                    address: profile.user.email,
                },
                subject: "[QRBio] Visulizações do Perfil",
                html: templateHTML,
            });

        }
        if (plans[profile.plan_name] - 1 == countProfile.length) {

            const path = resolve(
                __dirname,
                "..",
                "..",
                "views",
                "viewsProfileTotal.hbs"
            );

            const templateFileContent = fs.readFileSync(path).toString("utf-8");

            const templateParse = handlebars.compile(templateFileContent);

            const templateHTML = templateParse({
                profile: profile.name,
                name: profile.user.name,
            });
            var transport = await nodemailer.createTransport({
                host: "smtp.hostinger.com",
                port: 465,
                secure: true,
                auth: {
                    user: "contato@qrbio.com.br",
                    pass: "88120217Dr#",
                },
            });


            await transport.sendMail({
                from: {
                    name: "Equipe QRBio",
                    address: "contato@qrbio.com.br",
                },
                to: {
                    name: profile.user.name,
                    address: profile.user.email,
                },
                subject: "[QRBio] Visulizações do Perfil",
                html: templateHTML,
            });

        }


        return {
            viewsTotal: countProfile.length,
            viewsPlan: plans[profile.plan_name]
        }
    }
}

export { CountProfileService }
