import prismaClient from '../../prisma'
import { hash } from "bcryptjs"

interface UserRequest {
    name: string;
    email: string;
    phone_number: string;
    password: string;
}

class CreateUserService {
    async execute({ name, email, phone_number, password }: UserRequest) {

        if (!email || !name || !phone_number || !password) {
            throw new Error("Preencha todos os campos obrigátorios")
        }

        const userAlreadyExists = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        })

        if (userAlreadyExists) {
            throw new Error("Email já cadastrado")
        }

        const passwordHash = await hash(password, 8)

        const user = await prismaClient.user.create({
            data: {
                name: name,
                email: email,
                password: passwordHash,
                phone_number: phone_number
            },
            select: {
                id: true,
                name: true,
                email: true,
            }
        })

        return (user)

    }
}

export { CreateUserService }