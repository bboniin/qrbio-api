import prismaClient from '../../prisma'
import S3Storage from '../../utils/S3Storage';

interface PartnerRequest {
    name: string;
    latitude: string;
    photo: string;
    url: string;
    userId: string;
    longitude: string;
    label: string;
}

class CreatePartnerService {
    async execute({ name, label, latitude, longitude, photo, url, userId }: PartnerRequest) {

        if (photo) {
            const s3Storage = new S3Storage()
            await s3Storage.saveFile(photo)
        } else {
            photo = ""
        }

        const partnerCreated = await prismaClient.partner.create({
            data: {
                name: name,
                photo: photo,
                url: url,
                label: label,
                latitude: latitude,
                longitude: longitude
            }
        })

        return (partnerCreated)
    }
}

export { CreatePartnerService }