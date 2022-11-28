import prismaClient from '../../prisma'

interface ModuleRequest {
    modules: object;
}

class OrderModulesService {
    async execute({ modules }: ModuleRequest) {

        if (!modules) {
            throw new Error("Modulos é obrigátorio")
        }

        Object.values(modules).map(async (item, index) => {
            if (item.type == "link") {
                await prismaClient.link.update({
                    where: {
                        id: item.id
                    },
                    data: {
                        order: index,
                        visible: item.visible,
                    }
                })
            }
            if (item.type == "text") {
                await prismaClient.text.update({
                    where: {
                        id: item.id
                    },
                    data: {
                        order: index,
                        visible: item.visible,
                    }
                })
            }
        })

        return true
    }
}

export { OrderModulesService }