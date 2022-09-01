import prismaClient from '../../prisma'
import S3Storage from '../../utils/S3Storage';

interface ProfileRequest {
    name: string;
    description: string;
    photo: string;
    userId: string;
    nickname: string;
    category: string;
}

class CreateProfileService {
    async execute({ name, description, nickname, photo, userId, category }: ProfileRequest) {

        const profileExist = await prismaClient.profile.findFirst({
            where: {
                nickname: nickname
            }
        })

        if (profileExist) {
            throw new Error("Nickname já está sendo usado")
        }

        if (photo) {
            const s3Storage = new S3Storage()
            await s3Storage.saveFile(photo)
        } else {
            photo = ""
        }

        const profileCreated = await prismaClient.profile.create({
            data: {
                name: name,
                description: description,
                photo: photo,
                category: category,
                nickname: nickname,
                user_id: userId,
            }
        })

        return (profileCreated)
    }
}

export { CreateProfileService }