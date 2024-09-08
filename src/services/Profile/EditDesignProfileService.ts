import { String } from 'aws-sdk/clients/cloudsearchdomain';
import prismaClient from '../../prisma'
import S3Storage from '../../utils/S3Storage';

interface ProfileRequest {
    userId: string;
    background: string;
    button_color: string;
    font_button_color: string;
    font_color: string;
    font: string;
    background_image: string;
    background_visible: string;
    background_blur: String;
    button_opacity: String;
    save_contact: String;
    view_profile: String;
    name_visible: String;
    description_visible: String;
    id: string;
}


class EditDesignProfileService {
    async execute({ font, id, userId, background,
        button_color,
        font_button_color,
        font_color,
        background_image,
        background_visible,
        background_blur,
        save_contact,
        view_profile,
        name_visible,
        description_visible,
        button_opacity
    }: ProfileRequest) {

        const getProfile = await prismaClient.profile.findUnique({
            where: {
                id: id
            }
        })

        if (getProfile.user_id != userId) {
            throw new Error("Esse perfil não pertence ao Usuário")
        }

        let data = {
            background: background,
            button_color: button_color,
            font_button_color: font_button_color,
            font_color: font_color,
            font: font,
            name_visible: name_visible == "true" ? true : false,
            description_visible: description_visible == "true" ? true : false,
            background_visible: background_visible == "true" ? true : false,
            view_profile: view_profile == "true" ? true : false,
            save_contact: save_contact == "true" ? true : false,
            background_blur: parseFloat(background_blur),
            button_opacity: parseFloat(button_opacity)
        }

        if (background_image) {
            const s3Storage = new S3Storage()
            if (getProfile["background_image"]) {
                await s3Storage.deleteFile(getProfile["background_image"])
            }
            await s3Storage.saveFile(background_image)

            data["background_image"] = background_image
        }

        const profile = await prismaClient.profile.update({
            where: {
                id: id
            },
            data: data
        })

        return (profile)
    }
}

export { EditDesignProfileService }