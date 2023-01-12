import prismaClient from '../../prisma'
import { hash } from "bcryptjs"
import { compare } from "bcryptjs"

interface UserRequest {
    old_password: string;
    new_password: string;
    userId: string;
}

class EditPasswordUserService {
    async execute({ old_password, new_password, userId }: UserRequest) {

        if (!old_password || !new_password) {
            throw new Error("Preencha todos os campos")
        }

        const userView = await prismaClient.user.findFirst({
            where: {
                id: userId
            }
        })

        const passwordMatch = await compare(old_password, userView.password)


        if (!passwordMatch) {
            throw new Error("Senha antiga está incorreta")
        }


        const passwordHash = await hash(new_password, 8)

        const user = await prismaClient.user.update({
            where: {
                id: userId
            },
            data: {
                password: passwordHash,
            }
        })

        return (user)

    }
}

export { EditPasswordUserService }