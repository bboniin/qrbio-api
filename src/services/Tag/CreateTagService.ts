import prismaClient from '../../prisma'


class CreateTagService {
    async execute() {

        const tagCreated = await prismaClient.tag.create({
            data: {}
        })

        return (tagCreated)
    }
}

export { CreateTagService }