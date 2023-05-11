import prismaClient from '../../prisma'
import { compare } from "bcryptjs"

interface DeleteRequest {
    userId: string;
    password: string;
}

class DeleteUserService {
    async execute({ userId, password }: DeleteRequest) {

        const user = await prismaClient.user.findFirst({
            where: {
                id: userId
            },
            include: {
                profiles: true
            }
        })

        const passwordMatch = await compare(password, user.password)

        if (!passwordMatch) {
            throw new Error("Senha está incorreta")
        }

        const userDelete = await prismaClient.user.delete({
            where: {
                id: userId
            }
        })

        return (userDelete)

    }
}

export { DeleteUserService }