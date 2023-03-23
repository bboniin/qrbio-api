import prismaClient from '../../prisma'

interface UserRequest {
    id: string;
}

class EmailConfirmService {
    async execute({ id }: UserRequest) {

        const user = await prismaClient.user.findUnique({
            where: {
                id: id,
            }
        })

        if (!user) {
            throw new Error("Usuário não encontrado")
        }

        if (user.email_confirmation) {
            return ({ message: "Email da conta já foi confirmado" })
        } else {
            await prismaClient.user.update({
                where: {
                    id: id,
                },
                data: {
                    email_confirmation: true
                }
            })
            return ({ message: "Email confirmado com sucesso" })
        }
    }
}

export { EmailConfirmService }