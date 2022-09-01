import prismaClient from '../../prisma'

interface TagRequest {
    name: string;
    profile_id: string;
    id: string;
}

class LinkTagService {
    async execute({ name, id, profile_id }: TagRequest) {

        if (!id || !profile_id) {
            throw new Error("Id da tag e do perfil é obrigátorio")
        }
        const tag = await prismaClient.tag.findFirst({
            where: {
                id: id
            },
        })

        if (tag.profile_id) {
            throw new Error("Tag já está vinculada a um perfil")
        }

        const tagLinked = await prismaClient.tag.update({
            where: {
                id: id
            },
            data: {
                name: name,
                profile_id: profile_id
            }
        })

        return (tagLinked)
    }
}

export { LinkTagService }