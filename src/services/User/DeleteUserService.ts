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

        if (user.profiles.length != 0) {
            user.profiles.map(async (item) => {
                await prismaClient.link.deleteMany({
                    where: {
                        profile_id: item.id
                    }
                })
                await prismaClient.social.deleteMany({
                    where: {
                        profile_id: item.id
                    }
                })
                await prismaClient.tag.deleteMany({
                    where: {
                        profile_id: item.id
                    }
                })
                await prismaClient.viewProfile.deleteMany({
                    where: {
                        profile_id: item.id
                    }
                })
            })

            await prismaClient.profile.deleteMany({
                where: {
                    user_id: userId
                }
            })
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