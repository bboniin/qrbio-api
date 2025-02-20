import { format } from "date-fns";
import prismaClient from "../../prisma";

interface CountRequest {
  profile_id: string;
}

class CountProfileMonthService {
  async execute({ profile_id }: CountRequest) {
    const profile = await prismaClient.profile.findUnique({
      where: {
        id: profile_id,
      },
      include: {
        user: true,
      },
    });

    const plan = await prismaClient.plan.findUnique({
      where: {
        id: profile_id,
      },
    });

    let date = new Date();

    const countProfile = await prismaClient.viewProfile.findMany({
      where: {
        profile_id: profile_id,
        month: format(date, "MM"),
        year: format(date, "yyyy"),
      },
    });

    const plans = {
      free: 100,
      promocional: 200,
      bronze: 300,
      prata: 500,
      ouro: 1000,
      "prime-90": 200,
      "prime-180": 200,
      "prime-365": 200,
      "prime-vip": 200,
      business: plan ? (plan.views ? plan.views : 99999) : 99999,
    };

    return {
      viewsTotal: countProfile.length,
      viewsPlan: plans[profile.plan_name],
    };
  }
}

export { CountProfileMonthService };
