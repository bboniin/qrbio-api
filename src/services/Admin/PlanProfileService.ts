import prismaClient from '../../prisma'

interface TagRequest {
    id: string;
    plan: string;
}

class PlanProfileService {
    async execute({ id, plan }: TagRequest) {

        if (!id || !plan) {
            throw new Error("Id do perfil e nome do plano é obrigátorio")
        }
        const tagPrinted = await prismaClient.profile.update({
            where: {
                id: id
            },
            data: {
                plan: plan,
            }
        })

        return (tagPrinted)
    }
}

export { PlanProfileService }