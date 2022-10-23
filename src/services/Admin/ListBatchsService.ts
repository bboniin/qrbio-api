import { format } from 'date-fns';
import prismaClient from '../../prisma'

interface BatchRequest {
    userId: string;
    page: string;
    search: string;
}

class ListBatchsService {
    async execute({ userId, page, search }: BatchRequest) {

        const listBatchsTotal = await prismaClient.batch.findMany({
            orderBy: {
                update_at: "asc"
            },
            where:
                search ?
                    {
                        name: {
                            contains: search,
                        },
                    }
                    : {}
        })


        const listBatchs = await prismaClient.batch.findMany({
            skip: parseInt(page) * 25,
            take: 25,
            where:
                search ?
                    {
                        name: {
                            contains: search,
                        },
                    }
                    : {},
            orderBy: {
                update_at: "asc"
            },
            include: {
                tags: true
            }
        })

        return ({
            batchs: listBatchs,
            total: listBatchsTotal.length
        })
    }
}

export { ListBatchsService }