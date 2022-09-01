import prismaClient from '../../prisma'
import { hash } from "bcryptjs"

interface UserRequest {
    name: string;
    email: string;
    phone_number: string;
    password: string;
    userId: string;
}

class EditUserService {
    async execute({ name, email, phone_number, password, userId }: UserRequest) {

        const user = await prismaClient.user.findFirst({
            where: {
                id: userId
            }
        })

        return (user)

    }
}

export { EditUserService }