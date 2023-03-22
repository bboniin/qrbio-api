import { format } from 'date-fns';
import prismaClient from '../../prisma'

interface CountRequest {
    profile_id: string;
}

class CountProfileService {
    async execute({ profile_id }: CountRequest) {


        const profile = await prismaClient.profile.findUnique({
            where: {
                id: profile_id
            }
        })

        let date = new Date()

        const countProfile = await prismaClient.viewProfile.findMany({
            where: {
                month: format(date, "MM"),
                year: format(date, "yyyy")
            }
        })

        const plans = {
            "free": 100,
            "promocional": 200,
            "bronze": 300,
            "prata": 500,
            "ouro": 1000
        }

        return {
            viewsTotal: countProfile.length,
            viewsPlan: plans[profile.plan_name]
        }
    }
}

export { CountProfileService }
