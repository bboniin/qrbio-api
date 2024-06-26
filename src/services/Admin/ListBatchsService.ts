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
                update_at: "desc"
            },
            where:
                search ?
                    {
                        name: {
                            contains: search,
                            mode: 'insensitive'
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
                            mode: 'insensitive'
                        },
                    }
                    : {},
            orderBy: {
                update_at: "desc"
            },
            include: {
                tags: {
                    orderBy:
                    {
                        id: 'desc',
                    }
                },
                partner: true
            }
        })

        return ({
            batchs: listBatchs,
            total: listBatchsTotal.length
        })
    }
}

export { ListBatchsService }