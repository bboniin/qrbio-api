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
                batch: {
                    include: {
                        partner: true
                    }
                }
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
                    orderBy: {
                        order: 'asc',
                    },
                }
            }
        })

        if (!viewProfilePublic) {
            throw new Error("Nenhum perfil ou tag foi identificado")
        } else {
            if (tag) {
                if (tag.batch.partner) {
                    viewProfilePublic["partner"] = tag.batch.partner
                    if (viewProfilePublic["partner"]["photo"]) {
                        viewProfilePublic["partner"]["photo_url"] = "https://qrbio-api.s3.amazonaws.com/" + viewProfilePublic["partner"]["photo"]
                    }
                } else {
                    viewProfilePublic["partner"] = null
                }
            } else {
                viewProfilePublic["partner"] = null
            }
            if (viewProfilePublic.photo) {
                viewProfilePublic["photo_url"] = "https://qrbio-api.s3.amazonaws.com/" + viewProfilePublic.photo
            }
            if (viewProfilePublic.background_image) {
                viewProfilePublic["background_image_url"] = "https://qrbio-api.s3.amazonaws.com/" + viewProfilePublic.background_image
            }
        }

        return (viewProfilePublic)
    }
}

export { ViewProfilePublicService }