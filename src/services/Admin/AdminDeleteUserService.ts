import prismaClient from '../../prisma'

interface DeleteRequest {
    user_id: string;
    adminId: string;
}

class AdminDeleteUserService {
    async execute({ user_id, adminId }: DeleteRequest) {
        
        const user = await prismaClient.user.findUnique({
            where: {
                id: user_id
            }
        })

        if (!user) {
            throw new Error("Usuário não encontrado")
        }

        const userDelete = await prismaClient.user.delete({
            where: {
                id: user_id
            }
        })

        return (userDelete)

    }
}

export { AdminDeleteUserService }