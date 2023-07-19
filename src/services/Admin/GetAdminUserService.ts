import { format } from 'date-fns';
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

        let filter = {
            OR: []
        }

        let profiles = {}

        user.profiles.map((item) => {
            filter.OR.push({
                profile_id: item.id
            })
            profiles[item.id] = 0
        })

        let date = new Date()

        let views_month = await prismaClient.viewProfile.findMany({
            where: {
                ...filter,
                month: format(date, "MM"),
                year: format(date, "yyyy")
                }
        })
        
        views_month.map((item) => {
            profiles[item.profile_id] += 1
        })
        user.profiles.map(async (item) => {
            item["views_month"] = profiles[item.id]
        })
        
        return (user)
    }
}

export { GetAdminUserService }