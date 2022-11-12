import prismaClient from '../../prisma'
import { hash } from "bcryptjs"

interface UserRequest {
    name: string;
    email: string;
    phone_number: string;
    userId: string;
}

class EditUserService {
    async execute({ name, email, phone_number, userId }: UserRequest) {

        if (!email || !name || !phone_number) {
            throw new Error("Preencha todos os campos")
        }

        const verifyEmail = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        })

        if (verifyEmail) {
            if (verifyEmail.id != userId) {
                throw new Error("Esse email já está sendo utilizado")
            }
        }

        const user = await prismaClient.user.update({
            where: {
                id: userId
            },
            data: {
                name: name,
                phone_number: phone_number,
                email: email
            }
        })



        return (user)

    }
}

export { EditUserService }