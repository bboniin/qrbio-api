import prismaClient from '../../prisma'
import S3Storage from '../../utils/S3Storage';

interface PartnerRequest {
    id: string;
    name: string;
    latitude: string;
    photo: string;
    userId: string;
    longitude: string;
    url: string;
    label: string;
}

class EditPartnerService {
    async execute({ name, label, id, latitude, longitude, photo, userId, url }: PartnerRequest) {

        const getPartner = await prismaClient.partner.findUnique({
            where: {
                id: id
            }
        })

        let data = {
            name: name,
            latitude: latitude,
            label: label,
            longitude: longitude,
            url: url
        }

        if (photo) {
            const s3Storage = new S3Storage()

            if (getPartner["photo"]) {
                await s3Storage.deleteFile(getPartner["photo"])
            }

            await s3Storage.saveFile(photo)

            data["photo"] = photo
        }

        const partnerEdited = await prismaClient.partner.update({
            where: {
                id: id
            },
            data: data
        })

        return (partnerEdited)
    }
}

export { EditPartnerService }