import prismaClient from '../../prisma'

interface PlanRequest {
    plan_name: string;
    profile_id: string;
    validity: Date;
    views: number;
}

class PlanProfileService {
    async execute({ plan_name, profile_id, validity, views }: PlanRequest) {

        const getPlan = await prismaClient.plan.findUnique({
            where: {
                id: profile_id
            }
        })

        await prismaClient.purchase.create({
            data: {
                name: plan_name,
                profile_id: profile_id,
                purchase_id: "admin",
                token_id: "admin",
                value: 0,
            }
        })

        if (getPlan) {
            const planEdit = await prismaClient.plan.update({
                where: {
                    profile_id: profile_id
                },
                data: {
                    name: plan_name,
                    validity: validity,
                    views: views ? views : 0
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
            return (planEdit)
        } else {
            const planCreated = await prismaClient.plan.create({
                data: {
                    name: plan_name,
                    profile_id: profile_id,
                    validity: validity,
                    views: views ? views : 0,
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
            return (planCreated)
        }

    }
}

export { PlanProfileService }