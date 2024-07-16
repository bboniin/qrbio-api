import prismaClient from '../../prisma'

interface PartnerRequest {
    partners: object;
    profile_id: string;
}

class PartnersProfileService {
    async execute({ partners, profile_id }: PartnerRequest) {

        const partnersEdit = Object.values(partners)

        await Promise.all(partnersEdit.map(async (item) => {
            let partner = await prismaClient.partnerProfile.findFirst({
                where: {
                    profile_id: profile_id,
                    partner_id: item.partner_id,
                }
            })
            if(!partner){
                await prismaClient.partnerProfile.create({
                    data: {
                        profile_id: profile_id,
                        partner_id: item.partner_id,
                    }
                })
            }
        }))

        const partnerProfile = await prismaClient.partnerProfile.findMany({
            where: {
                profile_id: profile_id,
            }
        })
        
        partnerProfile.map(async (item)=>{
            if(partnersEdit.filter((data)=>{return item.partner_id == data.partner_id}).length == 0){
                await prismaClient.partnerProfile.delete({
                    where: {
                        id: item.id,
                    }
                })
            }
        })

        return true
    }
}

export { PartnersProfileService }