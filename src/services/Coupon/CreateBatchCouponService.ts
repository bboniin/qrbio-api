import prismaClient from '../../prisma'
import uniqid from "uniqid";

interface BatchCouponRequest {
    name: string;
    plan: string;
    couponsTotal: number;
}

function getPlanNamePrefix(plan_name) {
    switch (plan_name) {
        case "promocional":
            return "P1";
        case "bronze":
            return "B2";
        case "prata":
            return "P3";
        case "ouro":
            return "O4";
        default:
            return "";
    }
}

class CreateBatchCouponService {
    async execute({ name, plan, couponsTotal }: BatchCouponRequest) {

        const batchCouponCreated = await prismaClient.batchCoupon.create({
            data: {
                name: name,
                plan: plan
            }
        })

        batchCouponCreated["coupons"] = []

        for (let i = 0; i < couponsTotal; i++) {
            let coupon_id = `${getPlanNamePrefix(plan)}-${uniqid.time()}-${Math.floor(Math.random() * 100 + 1)}`.toUpperCase();
            const coupon = await prismaClient.coupon.create({
                data: {
                    plan: plan,
                    coupon_id: coupon_id,
                    batchsCoupon_id: batchCouponCreated.id
                }
            })
            batchCouponCreated["coupons"].push(coupon);
        }


        return (batchCouponCreated)
    }
}

export { CreateBatchCouponService }