import { addMonths, format } from 'date-fns';
import prismaClient from '../../prisma'

interface CountRequest {
    index: number;
    userId: string;
}

class CountProfilesService {
    async execute({ userId, index }: CountRequest) {

        let date = new Date()

        let dateMonth = addMonths(date, index)

        const countProfiles = await prismaClient.viewProfile.findMany({
            where: {
                month: format(dateMonth, "MM"),
                year: format(dateMonth, "yyyy")
            }
        })

        return countProfiles
    }
}

export { CountProfilesService }
