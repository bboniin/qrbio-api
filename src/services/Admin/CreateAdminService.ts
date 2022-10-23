import prismaClient from '../../prisma'
import { hash } from "bcryptjs"

interface AdminRequest {
    name: string;
    email: string;
    password: string;
}

class CreateAdminService {
    async execute({ name, email, password }: AdminRequest) {

        if (!email || !name || !password) {
            throw new Error("Preencha todos os campos obrigátorios")
        }

        const adminAlreadyExists = await prismaClient.admin.findFirst({
            where: {
                email: email
            }
        })

        if (adminAlreadyExists) {
            throw new Error("Email já cadastrado.")
        }

        const passwordHash = await hash(password, 8)

        const admin = await prismaClient.admin.create({
            data: {
                name: name,
                email: email,
                password: passwordHash
            },
            select: {
                id: true,
                name: true,
                email: true,
            }
        })

        return (admin)

    }
}

export { CreateAdminService }