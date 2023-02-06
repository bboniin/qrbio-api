import { id } from 'date-fns/locale';
import prismaClient from '../../prisma'

interface BatchRequest {
    userId: string;
    id: string;
    name: string;
    partner_id: string;
}

class EditBatchService {
    async execute({ userId, id, partner_id, name }: BatchRequest) {

        const getBatch = await prismaClient.batch.findUnique({
            where: {
                id: id
            }
        })

        if (!name) {
            name = getBatch.name
        }

        if (!partner_id) {
            partner_id = null
        }



        let data = {
            name: name,
            partner_id: partner_id,
        }

        const batchEdited = await prismaClient.batch.update({
            where: {
                id: id
            },
            data: data
        })


        return (batchEdited)
    }
}

export { EditBatchService }