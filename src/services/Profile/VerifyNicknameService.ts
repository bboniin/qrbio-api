import prismaClient from '../../prisma'

interface ProfileRequest {
    nickname: string;
}

class VerifyNicknameService {
    async execute({ nickname }: ProfileRequest) {

        const profile = await prismaClient.profile.findUnique({
            where: {
                nickname: nickname
            },
        })

        if (profile) {
            return ({ message: "Nickname já está sendo usado" })
        } else {
            return ({ message: "Nickname disponivel" })
        }


    }
}

export { VerifyNicknameService }