import prismaClient from '../../prisma'

interface PartnerRequest {
    id: string;
}

class GetPartnerService {
    async execute({ id }: PartnerRequest) {

        const partner = await prismaClient.partner.findUnique({
            where: {
                id: id,
            }
        })

        return (partner)
    }
}

export { GetPartnerService }