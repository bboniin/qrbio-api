import prismaClient from '../../prisma'

interface CouponRequest {
    id: string;
}

class GetCouponService {
    async execute({ id }: CouponRequest) {

        if (!id) {
            throw new Error("ID é obrigátorio")
        }

        const getCoupon = await prismaClient.coupon.findFirst({
            where: {
                coupon_id: id,
            },
        })

        return (getCoupon)
    }
}

export { GetCouponService }