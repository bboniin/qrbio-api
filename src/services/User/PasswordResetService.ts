import prismaClient from '../../prisma'
import { isAfter, addHours } from 'date-fns';
import { hash } from "bcryptjs"

interface BodyRequest {
    email: string;
    code: string;
    password: string;
}

class PasswordResetService {
    async execute({ email, code, password }: BodyRequest) {

        const user = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        })

        if (!user) {
            throw new Error("Usuário não encontrado")
        }

        const passwordCodes = await prismaClient.passwordForgot.findMany({
            where: {
                user_email: email,
            },
        });

        if (passwordCodes.length === 0) {
            throw new Error('Código não encontrado!');
        }

        const passwordCode = passwordCodes[passwordCodes.length - 1];

        if (passwordCode["code"] !== code) {
            throw new Error('Códito incorreto!');
        }

        const dateCreated = passwordCode.create_at;
        const dateLimit = addHours(dateCreated, 2);

        const isCodeExpired = isAfter(new Date(), dateLimit);

        if (isCodeExpired) {
            throw new Error('Códito expirou!');
        }

        const hashedPassword = await hash(password, 8);

        await prismaClient.user.update({
            where: {
                email: email
            },
            data: {
                password: hashedPassword
            }
        })

        return ({ message: "Senha alterada com sucesso" })

    }
}

export { PasswordResetService }