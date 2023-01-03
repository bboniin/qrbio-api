import { id } from 'date-fns/locale';
import prismaClient from '../../prisma'

interface BatchRequest {
    userId: string;
    id: string;
}

class GetBatchService {
    async execute({ userId, id }: BatchRequest) {

        const batch = await prismaClient.batch.findUnique({
            where: {
                id: id,
            },
            include: {
                tags: {
                    orderBy:
                    {
                        id: 'desc',
                    }
                }
            }
        })

        return (batch)
    }
}

export { GetBatchService }