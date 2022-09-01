import prismaClient from '../../prisma'
import S3Storage from '../../utils/S3Storage';

interface ProfileRequest {
    userId: string;
    name: string;
    description: string;
    photo: string;
    id: string;
}


class EditProfileService {
    async execute({ name, id, userId, photo, description }: ProfileRequest) {

        const getProfile = await prismaClient.profile.findUnique({
            where: {
                id: id
            }
        })

        if (getProfile.user_id != userId) {
            throw new Error("Esse perfil não pertence ao Usuário.")
        }

        if (!name) {
            name = getProfile.name
        }

        if (!description) {
            description = getProfile.description
        }

        let data = {
            name: name,
            description: description,
        }

        if (photo) {
            const s3Storage = new S3Storage()

            const profileImage = await prismaClient.profile.findUnique({
                where: {
                    id: id
                },
            })

            await s3Storage.deleteFile(profileImage["photo"])
            const upload = await s3Storage.saveFile(photo)

            data["photo"] = upload
        }


        const profile = await prismaClient.profile.update({
            where: {
                id: id
            },
            data: data
        })

        profile["photo_url"] = "https://edish.s3.sa-east-1.amazonaws.com/" + profile.photo

        return (profile)
    }
}

export { EditProfileService }