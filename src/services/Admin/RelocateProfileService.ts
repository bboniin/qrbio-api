import prismaClient from '../../prisma'

interface ProfileRequest {
    nickname: string;
    email: string;
}


class RelocateProfileService {
    async execute({ nickname, email }: ProfileRequest) {

        const getUser = await prismaClient.user.findUnique({
            where: {
                email: email
            }
        })

        if (!getUser) {
            throw new Error("Nenhum usuário foi encontrado com esse email")
        }

        const profile = await prismaClient.profile.update({
            where: {
                nickname: nickname
            },
            data: {
                user_id: getUser.id
            }
        })

        return (profile)
    }
}

export { RelocateProfileService }