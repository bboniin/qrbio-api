import { format } from 'date-fns';
import prismaClient from '../../prisma'

interface ProfileRequest {
    userId: string;
    page: string;
    search: string;
}

class ListAdminProfilesService {
    async execute({ userId, page, search }: ProfileRequest) {

        const listProfilesTotal = await prismaClient.profile.findMany({
            orderBy: {
                update_at: "desc"
            },
            where:
                search ? {
                    OR: [
                        {
                            name: {
                                contains: search,
                            },
                        },

                        {
                            nickname: {
                                contains: search,
                            },
                        }
                    ]
                } : {},
            select: {
                create_at: true,
                name: true,
                id: true,
                nickname: true
            }
        })

        const listProfiles = await prismaClient.profile.findMany({
            skip: parseInt(page) * 25,
            take: 25,
            where:
                search ? {
                    OR: [
                        {
                            name: {
                                contains: search,
                            },
                        },

                        {
                            nickname: {
                                contains: search,
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
                nickname: true,
                id: true
            }
        })

        let totalInDay = listProfilesTotal.filter((item) => {
            return format(new Date(item.create_at), "dd/MM/yyyy") == format(new Date(), "dd/MM/yyyy")
        })

        return ({
            profiles: listProfiles,
            totalInDay: totalInDay.length,
            total: listProfilesTotal.length
        })
    }
}

export { ListAdminProfilesService }