import prismaClient from '../../prisma'
import S3Storage from '../../utils/S3Storage';

interface ProfileRequest {
    userId: string;
    name: string;
    description: string;
    photo: string;
    view_partner: string;
    id: string;
    redirect: string;
}


class EditProfileService {
    async execute({ name, id, userId, photo, description, redirect, view_partner}: ProfileRequest) {

        const getProfile = await prismaClient.profile.findUnique({
            where: {
                id: id
            }
        })

        if (getProfile.user_id != userId) {
            throw new Error("Esse perfil não pertence ao Usuário")
        }

        if (!name) {
            name = getProfile.name
        }

        if (!description) {
            description = getProfile.description
        }

        let new_view_partner = true
        
        if (view_partner === undefined) {
            new_view_partner = getProfile.view_partner
        } else {
            new_view_partner = String(view_partner) == "true" ? true : false
        }

        let data = {
            name: name,
            description: description,
            redirect: redirect,
            view_partner: new_view_partner
        }

        if (photo) {
            const s3Storage = new S3Storage()

            const profileImage = await prismaClient.profile.findUnique({
                where: {
                    id: id
                },
            })

            if (profileImage["photo"]) {
                await s3Storage.deleteFile(profileImage["photo"])
            }

            await s3Storage.saveFile(photo)

            data["photo"] = photo
        }

        const profile = await prismaClient.profile.update({
            where: {
                id: id
            },
            data: data
        })

        profile["photo_url"] = "https://qrbio-api.s3.amazonaws.com/" + profile.photo

        return (profile)
    }
}

export { EditProfileService }