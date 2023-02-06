import prismaClient from '../../prisma'

class ListAllPartnersService {
    async execute() {

        const listPartners = await prismaClient.partner.findMany({
            orderBy: {
                update_at: "desc"
            }
        })

        listPartners.map(async (item) => {
            if (item.photo) {
                item["photo_url"] = "https://qrbio-api.s3.amazonaws.com/" + item.photo
            }
        })

        return ({
            partners: listPartners,
        })
    }
}

export { ListAllPartnersService }