import prismaClient from '../../prisma'

interface ModuleRequest {
    id: string;
}

class ListModulesPublicService {
    async execute({ id }: ModuleRequest) {

        const profile = await prismaClient.profile.findUnique({
            where: {
                id: id
            }
        })

        const plans = {
            "free": {
                pix: 1,
                redes: 5,
                link: 5,
                text: 1,
                emergency: 1
            },
            "promocional": {
                pix: 2,
                redes: 5,
                link: 5,
                text: 2,
                emergency: 2
            },
            "bronze": {
                pix: 99,
                redes: 8,
                link: 8,
                text: 3,
                emergency: 2
            },
            "prata": {
                pix: 99,
                redes: 99,
                link: 99,
                text: 99,
                emergency: 99
            },
            "ouro": {
                pix: 99,
                redes: 99,
                link: 99,
                text: 99,
                emergency: 99
            },
        }

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


        listLinks.map((item, index) => {
            if (plans[profile.plan_name]["link"] > index) {
                modules.push({ ...item, type: "link" })
            }
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

        listTexts.map((item, index) => {
            if (plans[profile.plan_name]["text"] > index) {
                modules.push({ ...item, type: "text" })
            }
        })

        let getPix = await prismaClient.pix.findFirst({
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
            let pixKeys = []

            getPix.pixKeys.map((item, index) => {
                if (plans[profile.plan_name]["pix"] > index) {
                    pixKeys.push(item)
                }
            })

            getPix.pixKeys = pixKeys
        }


        if (getPix) {
            modules.push({ ...getPix, type: "pix" })
        }

        let getEmergency = await prismaClient.emergency.findFirst({
            where: {
                profile_id: id,
                visible: true
            },
            include: {
                emergencyContacts: {
                    where: {
                        visible: true
                    },
                    orderBy: {
                        create_at: "asc"
                    },
                }
            },
        })


        if (getEmergency) {

            let emergencyContacts = []

            getEmergency.emergencyContacts.map((item, index) => {
                if (plans[profile.plan_name]["emergency"] > index) {
                    emergencyContacts.push(item)
                }
            })

            getEmergency.emergencyContacts = emergencyContacts
        }

        if (getEmergency) {
            modules.push({ ...getEmergency, type: "emergency" })
        }

        return (modules.sort(((a, b) => a.order - b.order)))
    }
}

export { ListModulesPublicService }