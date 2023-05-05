import { addDays } from 'date-fns';
import prismaClient from '../../prisma'

interface CouponRequest {
    profile_id: string;
    id: string;
}

class RescueCouponService {
    async execute({ id, profile_id }: CouponRequest) {

        if (!id || !profile_id) {
            throw new Error("Id da tag e do perfil é obrigátorio")
        }

        const coupon = await prismaClient.coupon.findFirst({
            where: {
                coupon_id: id
            },
        })

        const profile = await prismaClient.profile.findFirst({
            where: {
                id: profile_id
            },
        })

        if (!profile) {
            throw new Error("Essa perfil não existe no nosso sistema.")
        }

        if (!coupon) {
            throw new Error("Essa cupom não existe no nosso sistema.")
        }

        if (coupon.rescued) {
            throw new Error("Cupom já foi resgatado")
        }

        const getPlan = await prismaClient.plan.findUnique({
            where: {
                id: profile_id
            }
        })

        const plans = {
            "promocional": 365,
            "bronze": 90,
            "prata": 180,
            "ouro": 365
        }

        const plansName = [
            "free",
            "promocional",
            "bronze",
            "prata",
            "ouro",
            "business",
        ]

        let plan_name = coupon.plan

        if (getPlan) {
            plan_name = plansName.indexOf(coupon.plan) > plansName.indexOf(getPlan.name) ? coupon.plan : getPlan.name
        }

        await prismaClient.purchase.create({
            data: {
                name: plan_name,
                profile_id: profile_id,
                purchase_id: "CP:" + coupon.coupon_id,
                token_id: "CP:" + coupon.coupon_id,
                value: 0,
            }
        })

        if (getPlan) {
            let plan = await prismaClient.plan.update({
                where: {
                    profile_id: profile_id
                },
                data: {
                    name: plan_name,
                    validity: addDays(getPlan.validity, plans[coupon.plan]),
                }
            })
            await prismaClient.profile.update({
                where: {
                    id: profile_id
                },
                data: {
                    plan_name: plan_name,
                }
            })

            await prismaClient.coupon.update({
                where: {
                    id: coupon.id
                },
                data: {
                    rescued: true
                }
            })

            return plan
        } else {
            let plan = await prismaClient.plan.create({
                data: {
                    name: plan_name,
                    profile_id: profile_id,
                    validity: addDays(new Date(), plans[coupon.plan]),
                    id: profile_id,
                }
            })
            await prismaClient.profile.update({
                where: {
                    id: profile_id
                },
                data: {
                    plan_name: plan_name,
                }
            })

            await prismaClient.coupon.update({
                where: {
                    id: coupon.id
                },
                data: {
                    rescued: true
                }
            })

            return plan
        }

    }
}

export { RescueCouponService }