import { format } from 'date-fns';
import prismaClient from '../../prisma'

interface ProfileRequest {
    userId: string;
    page: string;
    premium: boolean;
    search: string;
}

class ListAdminProfilesService {
    async execute({ userId, page, search, premium }: ProfileRequest) {

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
                    ],

                } : {},
            select: {
                create_at: true,
                name: true,
                id: true,
                nickname: true,
                plan_name: true,
            }
        })

        const listProfiles = await prismaClient.profile.findMany({
            skip: parseInt(page) * 25,
            take: 25,
            where:
                search ? {
                    NOT: [
                        {
                            plan_name: {
                                contains: premium ? "free" : "premium",
                            },
                        }
                    ],
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
                } : {
                    NOT: [
                        {
                            plan_name: {
                                contains: premium ? "free" : "premium",
                            },
                        }
                    ],
                },
            orderBy: {
                update_at: "desc"
            },
            select: {
                update_at: true,
                name: true,
                nickname: true,
                id: true,
                plan_name: true,
                user_id: true
            }
        })

        let totalInDay = listProfilesTotal.filter((item) => {
            return format(new Date(item.create_at), "dd/MM/yyyy") == format(new Date(), "dd/MM/yyyy")
        })

        let totalPremium = listProfilesTotal.filter((item) => {
            return item.plan_name != "free"
        })

        return ({
            profiles: listProfiles,
            totalInDay: totalInDay.length,
            totalPremium: totalPremium.length,
            total: listProfilesTotal.length
        })
    }
}

export { ListAdminProfilesService }