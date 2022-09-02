import prismaClient from '../../prisma'
import S3Storage from '../../utils/S3Storage';

interface ProfileRequest {
    id: string;
}

class DeleteProfileService {
    async execute({ id }: ProfileRequest) {


        const profileImage = await prismaClient.profile.findUnique({
            where: {
                id: id
            },
        })

        if (profileImage["photo"]) {
            const s3Storage = new S3Storage()
            await s3Storage.deleteFile(profileImage["photo"])
        }


        const profileDeleted = await prismaClient.profile.delete({
            where: {
                id: id
            }
        })
        return (profileDeleted)
    }
}

export { DeleteProfileService }