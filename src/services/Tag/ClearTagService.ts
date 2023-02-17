import prismaClient from '../../prisma'

interface TagRequest {
    id: string;
}

class ClearTagService {
    async execute({ id }: TagRequest) {

        const tagCleared = await prismaClient.tag.update({
            where: {
                id: id
            },
            data: {
                name: null,
                profile_id: null
            }
        })
        return (tagCleared)
    }
}

export { ClearTagService }