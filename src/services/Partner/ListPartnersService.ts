import prismaClient from '../../prisma'

interface PartnerRequest {
    page: string;
    search: string;
}

class ListPartnersService {
    async execute({ page, search }: PartnerRequest) {

        const listPartnersTotal = await prismaClient.partner.findMany({
            orderBy: {
                update_at: "desc"
            },
            where:
                search ?
                    {
                        OR: [
                            {
                                label: {
                                    contains: search,
                                },
                            },
                            {
                                name: {
                                    contains: search,
                                },
                            }
                        ]
                    }
                    : {}
        })


        const listPartners = await prismaClient.partner.findMany({
            skip: parseInt(page) * 25,
            take: 25,
            where:
                search ?
                    {
                        OR: [
                            {
                                label: {
                                    contains: search,
                                },
                            },
                            {
                                name: {
                                    contains: search,
                                },
                            }
                        ]
                    }
                    : {},
            orderBy: {
                update_at: "desc"
            },
        })

        listPartners.map(async (item) => {
            if (item.photo) {
                item["photo_url"] = "https://qrbio-api.s3.amazonaws.com/" + item.photo
            }
        })

        return ({
            partners: listPartners,
            total: listPartnersTotal.length
        })
    }
}

export { ListPartnersService }