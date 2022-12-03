import prismaClient from '../../prisma'

interface TagRequest {
    id: string;
    plan_name: string;
}

class PlanProfileService {
    async execute({ id, plan_name }: TagRequest) {

        if (!id || !plan_name) {
            throw new Error("Id do perfil e nome do plano é obrigátorio")
        }
        const tagPrinted = await prismaClient.profile.update({
            where: {
                id: id
            },
            data: {
                plan_name: plan_name,
            }
        })

        return (tagPrinted)
    }
}

export { PlanProfileService }