import prismaClient from '../../prisma'

interface ProfileRequest {
    userId: string;
}

class ViewProfilesService {
    async execute({ userId }: ProfileRequest) {


        const profilesAll = await prismaClient.profile.findMany({
            include: {
                links: true,
                sociais: true,
                pix: true,
                emergency: true,
                tags: true,
                texts: true
            }
        })

        return profilesAll
    }
}

export { ViewProfilesService }
