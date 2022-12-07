import prismaClient from '../../prisma'

interface ModuleRequest {
    id: string;
}

class ListModulesPublicService {
    async execute({ id }: ModuleRequest) {

        let modules = []

        let listLinks = await prismaClient.link.findMany({
            where: {
                profile_id: id,
                visible: true
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
                visible: true
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
                visible: true
            },
            include: {
                pixKeys: {
                    where: {
                        visible: true
                    },
                    orderBy: {
                        create_at: "asc"
                    },
                }
            },
        })

        if (getPix) {
            modules.push({ ...getPix, type: "pix" })
        }

        return (modules.sort(((a, b) => a.order - b.order)))
    }
}

export { ListModulesPublicService }