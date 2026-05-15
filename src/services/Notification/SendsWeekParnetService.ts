import { addHours, differenceInHours, differenceInMinutes } from "date-fns";
import prismaClient from "../../prisma";

class SendsWeekParnetService {
  async execute() {
    const partners = await prismaClient.partner.findMany();
    await Promise.all(
      partners.map(async (partner) => {
        if (partner.sends_week) {
          await prismaClient.partner.update({
            where: {
              id: partner.id,
            },
            data: {
              number_sends: partner.number_sends + partner.sends_week,
            },
          });
        }
      }),
    );
    console.log("Parceiros receberam seus disparos semanais em ", new Date());
  }
}

export { SendsWeekParnetService };
