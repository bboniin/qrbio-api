import prismaClient from '../../prisma'

interface ProfileRequest {
    id: string;
    nickname: string;
}

class NicknameProfileService {
    async execute({ id, nickname }: ProfileRequest) {

        if (!id || !nickname) {
            throw new Error("Id do perfil e nickname é obrigátorio")
        }

        const profileView = await prismaClient.profile.findUnique({
            where: {
                id: id
            },
        })

        const nicknameValid = await prismaClient.profile.findUnique({
            where: {
                nickname: nickname
            },
        })

        if (nicknameValid) {
            if (nicknameValid.nickname != profileView.nickname) {
                throw new Error("Nickname já está sendo usado")
            }
        }

        const profile = await prismaClient.profile.update({
            where: {
                id: id
            },
            data: {
                nickname: nickname,
            }
        })

        return (profile)
    }
}

export { NicknameProfileService }