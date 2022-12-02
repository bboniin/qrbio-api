import prismaClient from '../../prisma'

interface BatchRequest {
    id: string;
}

class PrintedBatchService {
    async execute({ id }: BatchRequest) {

        if (!id) {
            throw new Error("Id do lote é obrigátorio")
        }
        const batchPrinted = await prismaClient.batch.update({
            where: {
                id: id
            },
            data: {
                printed: true,
            }
        })

        return (batchPrinted)
    }
}

export { PrintedBatchService }