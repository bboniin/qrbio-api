import { format } from 'date-fns';
import prismaClient from '../../prisma'

interface ViewRequest {
    profile_id: string;
    ip: string;
}

class CountViewProfile {
    async execute({ ip, profile_id }: ViewRequest) {

        const countView = await prismaClient.viewProfile.findFirst({
            where: {
                profile_id: profile_id,
                ip: ip,
                date: format(new Date(), "dd/MM/yyyy")
            }
        })

        if (!countView) {
            await prismaClient.viewProfile.create({
                data: {
                    profile_id: profile_id,
                    ip: ip,
                    date: format(new Date(), "dd/MM/yyyy"),
                    month: format(new Date(), "MM"),
                    year: format(new Date(), "yyyy"),
                }
            })
        }
    }
}

export { CountViewProfile }