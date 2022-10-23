import prismaClient from '../../prisma'
import { compare } from "bcryptjs"
import { sign } from 'jsonwebtoken'
import authConfig from "../../utils/auth"

interface AuthRequest {
    email: string;
    password: string;
}

class AuthAdminService {
    async execute({ email, password }: AuthRequest) {

        const admin = await prismaClient.admin.findFirst({
            where: {
                email: email
            }
        })

        if (!admin) {
            throw new Error("Email e Senha não correspondem.")
        }

        const passwordMatch = await compare(password, admin.password)

        const token = sign({
            name: admin.name,
            email: admin.email
        }, authConfig.jwt.secret, {
            subject: admin.id,
            expiresIn: '365d'
        })

        if (!passwordMatch) {
            throw new Error("Email/Senha estão incorreto.")
        }

        return ({
            admin: {
                id: admin.id,
                name: admin.name,
                email: admin.email
            },
            token
        })

    }
}

export { AuthAdminService }