import { addDays } from 'date-fns';
import prismaClient from '../../prisma'

interface PlanRequest {
    name: string;
    profile_id: string;
    purchase_id: string;
    value: number;
}

class AddPlanService {
    async execute({ name, profile_id, purchase_id, value }: PlanRequest) {

        const getPlan = await prismaClient.plan.findUnique({
            where: {
                id: profile_id
            }
        })

        const plans = {
            "bronze": 90,
            "prata": 180,
            "ouro": 365
        }


        if (getPlan) {
            const planEdit = await prismaClient.plan.update({
                where: {
                    profile_id: profile_id
                },
                data: {
                    name: name,
                    validity: addDays(getPlan.validity, plans[name]),
                }
            })

            const planProfile = await prismaClient.profile.update({
                where: {
                    id: profile_id
                },
                data: {
                    plan_name: name,
                }
            })
            return (planEdit)
        } else {
            const planCreated = await prismaClient.plan.create({
                data: {
                    name: name,
                    profile_id: profile_id,
                    validity: addDays(new Date(), plans[name]),
                    id: profile_id,
                }
            })
            const planProfile = await prismaClient.profile.update({
                where: {
                    id: profile_id
                },
                data: {
                    plan_name: name,
                }
            })
            return (planCreated)
        }

    }
}

export { AddPlanService }