import prismaClient from '../../prisma'

interface PartnerRequest {
    id: string;
}

class DeletePartnerService {
    async execute({ id }: PartnerRequest) {

        const partnerDeleted = await prismaClient.partner.delete({
            where: {
                id: id
            }
        })

        return (partnerDeleted)
    }
}

export { DeletePartnerService }