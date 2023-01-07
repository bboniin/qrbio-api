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
                },
                partner: true
            }
        })

        if (batch["partner"]) {
            if (batch["partner"]["photo"]) {
                batch["partner"]["photo_url"] = "https://qrbio-api.s3.amazonaws.com/" + batch["partner"]["photo"]
            }
        }

        return (batch)
    }
}

export { GetBatchService }