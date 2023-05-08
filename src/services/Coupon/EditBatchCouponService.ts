import prismaClient from '../../prisma'

interface BatchCouponRequest {
    userId: string;
    id: string;
    name: string;
    partner_id: string;
}

class EditBatchCouponService {
    async execute({ userId, id, partner_id, name }: BatchCouponRequest) {

        const getBatchCoupon = await prismaClient.batchCoupon.findUnique({
            where: {
                id: id
            }
        })

        if (!name) {
            name = getBatchCoupon.name
        }

        if (!partner_id) {
            partner_id = getBatchCoupon.partner_id
        }


        let data = {
            name: name,
            partner_id: partner_id,
        }

        const batchCouponEdited = await prismaClient.batchCoupon.update({
            where: {
                id: id
            },
            data: data
        })


        return (batchCouponEdited)
    }
}

export { EditBatchCouponService }