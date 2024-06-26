import prismaClient from '../../prisma'

interface BatchCouponRequest {
    userId: string;
    page: string;
    search: string;
}

class ListBatchCouponService {
    async execute({ userId, page, search }: BatchCouponRequest) {

        const listBatchsCuponsTotal = await prismaClient.batchCoupon.count({
            where:
                search ?
                    {
                        name: {
                            contains: search,
                            mode: 'insensitive'
                        },
                    }
                    : {}
        })


        const listBatchsCupons = await prismaClient.batchCoupon.findMany({
            skip: parseInt(page) * 25,
            take: 25,
            where:
                search ?
                    {
                        name: {
                            contains: search,
                            mode: 'insensitive'
                        },
                    }
                    : {},
            orderBy: {
                update_at: "desc"
            },
            include: {
                partner: true,
                coupons: {
                    orderBy:
                    {
                        id: 'desc',
                    }
                }
            }
        })

        return ({
            batchs: listBatchsCupons,
            total: listBatchsCuponsTotal
        })
    }
}

export { ListBatchCouponService }