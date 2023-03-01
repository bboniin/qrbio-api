import prismaClient from '../../prisma'

interface PlanRequest {
    id: string;
    userId: string;
}

class GetPlanService {
    async execute({ id, userId }: PlanRequest) {

        const getPlan = await prismaClient.plan.findUnique({
            where: {
                profile_id: id
            }
        })


        return (getPlan)
    }
}

export { GetPlanService }