import prismaClient from '../../prisma'

interface UserRequest {
    userId: string;
}

class GetUserService {
    async execute({ userId }: UserRequest) {

        const user = await prismaClient.user.findUnique({
            where: {
                id: userId,
            },
            select: {
                name: true,
                email: true,
                phone_number: true,
                id: true,
                observation: true,
                message: true,
            }
        })

        return (user)
    }
}

export { GetUserService }