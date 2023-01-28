import prismaClient from '../../prisma'

interface ModuleRequest {
    id: string;
}

class ListModulesService {
    async execute({ id }: ModuleRequest) {

        let modules = []

        let listLinks = await prismaClient.link.findMany({
            where: {
                profile_id: id,
            },
            orderBy: {
                order: "asc"
            }
        })

        listLinks.map((item) => {
            modules.push({ ...item, type: "link" })
        })

        const listTexts = await prismaClient.text.findMany({
            where: {
                profile_id: id,
            },
            orderBy: {
                order: "asc"
            }
        })

        listTexts.map((item) => {
            modules.push({ ...item, type: "text" })
        })

        const getPix = await prismaClient.pix.findFirst({
            where: {
                profile_id: id,
            },
            include: {
                pixKeys: {
                    orderBy: {
                        create_at: "asc"
                    },
                }
            },
        })

        if (getPix) {
            modules.push({ ...getPix, type: "pix" })
        }

        const getEmergency = await prismaClient.emergency.findFirst({
            where: {
                profile_id: id,
            },
            include: {
                emergencyContacts: {
                    orderBy: {
                        create_at: "asc"
                    },
                }
            },
        })

        if (getEmergency) {
            modules.push({ ...getEmergency, type: "emergency" })
        }

        return (modules.sort(((a, b) => a.order - b.order)))
    }
}

export { ListModulesService }