import prismaClient from '../../prisma'

interface ProfileRequest {
    id: string;
}

class GetProfileService {
    async execute({ id }: ProfileRequest) {

        const profile = await prismaClient.profile.findUnique({
            where: {
                id: id
            },
            include: {
                links: {
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

        if (!profile) {
            throw new Error("Nenhum perfil foi encontrado")
        } else {
            if (profile.photo) {
                profile["photo_url"] = "https://qrbio-api.s3.amazonaws.com/" + profile.photo
            }
            if (profile["background_image"]) {
                profile["background_image_url"] = "https://qrbio-api.s3.amazonaws.com/" + profile.background_image
            }
        }

        return (profile)
    }
}

export { GetProfileService }