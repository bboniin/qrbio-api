import prismaClient from '../../prisma'

interface UserRequest {
    userId: string;
    id: string;
}

class GetAdminUserService {
    async execute({ userId, id }: UserRequest) {

        const user = await prismaClient.user.findUnique({
            where: {
                id: id,
            },
            select: {
                name: true,
                email: true,
                phone_number: true,
                id: true,
                observation: true,
                message: true,
                profiles: {
                    orderBy: {
                        create_at: "desc"
                    }
                }
            }
        })

        return (user)
    }
}

export { GetAdminUserService }