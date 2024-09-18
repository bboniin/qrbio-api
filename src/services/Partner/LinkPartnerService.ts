import prismaClient from '../../prisma'

interface PartnerRequest {
    batch_id: string;
    partner_id: string;
}

class LinkPartnerService {
    async execute({ partner_id, batch_id }: PartnerRequest) {

        if (!batch_id) {
            throw new Error("Id do lote é obrigátorio")
        }

        if (!partner_id) {
            partner_id = null
        }

        const partnerLinked = await prismaClient.batch.update({
            where: {
                id: batch_id
            },
            data: {
                partner_id: partner_id,
            }
        })

        return (partnerLinked)
    }
}

export { LinkPartnerService }