import prismaClient from '../../prisma'

interface BatchRequest {
    name: string;
    tagsTotal: string;
    userId: string;
}

class CreateBatchService {
    async execute({ name, userId, tagsTotal }: BatchRequest) {

        let numTagsTotal = parseInt(tagsTotal)

        if (!name || !numTagsTotal) {
            throw new Error("Preencha o nome e a quantidade de tags do lote")
        }

        const batchCreated = await prismaClient.batch.create({
            data: {
                name: name,
            }
        })

        let tags = []
        for (let i = 0; i < numTagsTotal; i++) {
            tags.push({
                batch_id: batchCreated.id
            })
        }

        const tagsCreated = await prismaClient.tag.createMany({
            data: tags

        })

        return ({
            ...batchCreated,
            tags: tagsCreated,
        })
    }
}

export { CreateBatchService }