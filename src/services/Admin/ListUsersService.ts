import { format } from 'date-fns';
import prismaClient from '../../prisma'

interface UserRequest {
    userId: string;
    page: string;
    search: string;
}

class ListUsersService {
    async execute({ userId, page, search }: UserRequest) {

        const listUsersTotal = await prismaClient.user.findMany({
            orderBy: {
                update_at: "desc"
            },
            where:
                search ? {
                    OR: [
                        {
                            email: {
                                contains: search,
                                mode: 'insensitive'
                            },
                        },
                        {
                            name: {
                                contains: search,
                                mode: 'insensitive'
                            },
                        }
                    ]
                } : {},
            select: {
                create_at: true,
                name: true,
                email: true,
                id: true
            }
        })

        const listUsers = await prismaClient.user.findMany({
            skip: parseInt(page) * 25,
            take: 25,
            where:
                search ? {
                    OR: [
                        {
                            email: {
                                contains: search,
                                mode: 'insensitive'
                            },
                        },

                        {
                            name: {
                                contains: search,
                                mode: 'insensitive'
                            },
                        }
                    ]
                } : {},
            orderBy: {
                update_at: "desc"
            },
            select: {
                update_at: true,
                name: true,
                email: true,
                id: true
            }
        })

        let totalInDay = listUsersTotal.filter((item) => {
            return format(new Date(item.create_at), "dd/MM/yyyy") == format(new Date(), "dd/MM/yyyy")
        })

        return ({
            users: listUsers,
            totalInDay: totalInDay.length,
            total: listUsersTotal.length
        })
    }
}

export { ListUsersService }