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

        if (batch.partner_id) {
            let profiles = batch.partner_id.split(",")
            let filter = []
            profiles.map((item)=>{
                filter.push({
                    id: item
                }) 
            })
            const viewPartners = await prismaClient.partner.findMany({
                where: {
                    OR: filter
                },
            })
            viewPartners.map((item)=>{
                if(item["photo"]){
                    item["photo_url"] = "https://qrbio-api.s3.amazonaws.com/" + item["photo"]
                }
            })
            batch["partners"] = viewPartners
        }

        return (batch)
    }
}

export { GetBatchService }