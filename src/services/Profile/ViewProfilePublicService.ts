import prismaClient from '../../prisma'

interface ProfileRequest {
    id: string;
}

class ViewProfilePublicService {
    async execute({ id }: ProfileRequest) {

        let filter = {}

        const tag = await prismaClient.tag.findUnique({
            where: {
                id: id
            },
            include: {
                batch: true
            }
        })

        if (tag) {
            if (!tag.profile_id) {
                throw new Error("Nenhum perfil foi vinculado a essa tag")
            } else {
                filter = { id: tag.profile_id }
            }
        } else {
            filter = { nickname: id }
        }

        const viewProfilePublic = await prismaClient.profile.findUnique({
            where: filter,
            include: {
                links: {
                    where: {
                        visible: true,
                    },
                    orderBy: {
                        order: 'asc',
                    },
                },
                sociais: {
                    where: {
                        visible: true
                    },
                    orderBy: {
                        order: 'asc',
                    }
                },
                partners: {
                    orderBy: {
                        create_at: 'asc',
                    },
                    include: {
                        partner: true
                    }
                }
            }
        })

        let partners = []

        if (!viewProfilePublic) {
            throw new Error("Nenhum perfil ou tag foi identificado")
        } else {
            viewProfilePublic.partners.map((item)=>{
                if(item["partner"]["photo"]){
                    item["partner"]["photo_url"] = "https://qrbio-api.s3.amazonaws.com/" + item["partner"]["photo"]
                }
                partners.push(item)
            })

            if (tag) {
                if (tag.batch.partner_id) {
                    let profiles = tag.batch.partner_id.split(",")
                    let filter = []
                    profiles.map((item)=>{
                        filter.push({
                            id: item
                        }) 
                    })
                    
                    const viewPartners = await prismaClient.partner.findMany({
                        where: {
                            OR: filter
                        },
                    })
                    
                    viewPartners.map((item)=>{
                        if(item["photo"]){
                            item["photo_url"] = "https://qrbio-api.s3.amazonaws.com/" + item["photo"]
                        }
                        partners.push({partner: item})
                    })
                } else {
                    if (viewProfilePublic.partner_id) {
                        let partner = await prismaClient.partner.findUnique({
                            where: { id: viewProfilePublic.partner_id }
                        })
                        viewProfilePublic["partner"] = partner
                        if (viewProfilePublic["partner"]["photo"]) {
                            viewProfilePublic["partner"]["photo_url"] = "https://qrbio-api.s3.amazonaws.com/" + viewProfilePublic["partner"]["photo"]
                        }
                    } else {
                        viewProfilePublic["partner"] = null
                    }
                }
            } else {
                if (viewProfilePublic.partner_id) {
                    let partner = await prismaClient.partner.findUnique({
                        where: { id: viewProfilePublic.partner_id }
                    })
                    viewProfilePublic["partner"] = partner
                    if (viewProfilePublic["partner"]["photo"]) {
                        viewProfilePublic["partner"]["photo_url"] = "https://qrbio-api.s3.amazonaws.com/" + viewProfilePublic["partner"]["photo"]
                    }
                } else {
                    viewProfilePublic["partner"] = null
                }
            }
            if (viewProfilePublic.photo) {
                viewProfilePublic["photo_url"] = "https://qrbio-api.s3.amazonaws.com/" + viewProfilePublic.photo
            }
            if (viewProfilePublic.background_image) {
                viewProfilePublic["background_image_url"] = "https://qrbio-api.s3.amazonaws.com/" + viewProfilePublic.background_image
            }
        }
        viewProfilePublic.partners = partners

        return (viewProfilePublic)
    }
}

export { ViewProfilePublicService }