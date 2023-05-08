import prismaClient from '../../prisma'

interface BatchCouponRequest {
    id: string;
}

class GetBatchCouponService {
    async execute({ id }: BatchCouponRequest) {

        if (!id) {
            throw new Error("ID é obrigátorio")
        }

        const getBatchCoupon = await prismaClient.batchCoupon.findUnique({
            where: {
                id: id,
            },
            include: {
                partner: true,
                coupons: true
            }
        })

        return (getBatchCoupon)
    }
}

export { GetBatchCouponService }