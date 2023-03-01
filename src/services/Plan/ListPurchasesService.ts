import prismaClient from '../../prisma'

interface PlanRequest {
    id: string;
    userId: string;
}

class ListPurchasesService {
    async execute({ id, userId }: PlanRequest) {

        const getPurchases = await prismaClient.purchase.findMany({
            where: {
                profile_id: id
            }
        })


        return (getPurchases)
    }
}

export { ListPurchasesService }