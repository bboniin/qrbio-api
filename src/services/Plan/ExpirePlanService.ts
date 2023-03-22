import { addDays, differenceInDays } from 'date-fns';
import prismaClient from '../../prisma'
import { resolve } from "path";
import fs from "fs";
import nodemailer from "nodemailer";
import handlebars from "handlebars";


interface PlanRequest {
}

class ExpirePlanService {
    async execute({ }: PlanRequest) {

        const plans = await prismaClient.plan.findMany({})
        const profilesGet = await prismaClient.profile.findMany({
            include: {
                user: true
            }
        })

        let profiles = {}

        profilesGet.map((item) => {
            profiles[item.id] = item
        })

        var transport = await nodemailer.createTransport({
            host: "smtp.hostinger.com",
            port: 465,
            secure: true,
            auth: {
                user: "contato@qrbio.com.br",
                pass: "88120217Dr#",
            },
        });

        plans.map(async (item) => {
            if (differenceInDays(item.validity, new Date()) == 2) {
                const path = resolve(
                    __dirname,
                    "..",
                    "..",
                    "views",
                    "expireInThreeDays.hbs"
                );

                const templateFileContent = fs.readFileSync(path).toString("utf-8");

                const templateParse = handlebars.compile(templateFileContent);
                const templateHTML = templateParse({
                    name: item.name,
                });

                await transport.sendMail({
                    from: {
                        name: "Equipe QRBio",
                        address: "contato@qrbio.com.br",
                    },
                    to: {
                        name: profiles[item.profile_id].user.name,
                        address: profiles[item.profile_id].user.email,
                    },
                    subject: "[QRBio] Seu plano expira em 3 dias",
                    html: templateHTML,
                });
            } else {
                if (differenceInDays(item.validity, new Date()) < 0) {
                    await prismaClient.plan.delete({
                        where: {
                            profile_id: item.profile_id
                        }
                    })

                    await prismaClient.profile.update({
                        where: {
                            id: item.profile_id
                        },
                        data: {
                            plan_name: "free",
                        }
                    })
                    const path = resolve(
                        __dirname,
                        "..",
                        "..",
                        "views",
                        "expirePlan.hbs"
                    );

                    const templateFileContent = fs.readFileSync(path).toString("utf-8");

                    const templateParse = handlebars.compile(templateFileContent);
                    const templateHTML = templateParse({
                        name: item.name,
                    });

                    await transport.sendMail({
                        from: {
                            name: "Equipe QRBio",
                            address: "contato@qrbio.com.br",
                        },
                        to: {
                            name: profiles[item.profile_id].user.name,
                            address: profiles[item.profile_id].user.email,
                        },
                        subject: "[QRBio] Seu plano expirou",
                        html: templateHTML,
                    });
                }
            }
        })
        return ""
    }
}

export { ExpirePlanService }