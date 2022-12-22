import prismaClient from '../../prisma'
import { hash } from "bcryptjs"

interface UserRequest {
    name: string;
    email: string;
    phone_number: string;
    user_id: string;
    message: string;
    password: string;
    observation: string;
}

class EditAdminUserService {
    async execute({ name, email, phone_number, observation, message, password, user_id }: UserRequest) {

        if (!email || !name || !phone_number || !user_id) {
            throw new Error("Preencha todos os campos")
        }

        const verifyUser = await prismaClient.user.findFirst({
            where: {
                id: user_id
            }
        })

        if (!verifyUser) {
            throw new Error("Usuário não existe")
        }

        const verifyEmail = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        })

        if (verifyEmail) {
            if (verifyEmail.id != user_id) {
                throw new Error("Esse email já está sendo utilizado")
            }
        }

        let data = {
            name: name,
            phone_number: phone_number,
            email: email,
            observation: observation,
            message: message
        }

        if (password) {
            const passwordHash = await hash(password, 8)
            data["password"] = passwordHash
        }

        const user = await prismaClient.user.update({
            where: {
                id: user_id
            },
            data: data
        })



        return (user)

    }
}

export { EditAdminUserService }