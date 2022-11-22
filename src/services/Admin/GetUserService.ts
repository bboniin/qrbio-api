import { id } from 'date-fns/locale';
import prismaClient from '../../prisma'

interface UserRequest {
    userId: string;
    id: string;
}

class GetUserService {
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
                profiles: {
                    orderBy: {
                        create_at: "asc"
                    }
                }
            }
        })

        return (user)
    }
}

export { GetUserService }