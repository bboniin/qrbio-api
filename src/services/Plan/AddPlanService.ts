import { addDays } from "date-fns";
import prismaClient from "../../prisma";

interface PlanRequest {
  name: string;
  profile_id: string;
  purchase_id: string;
  token_id: string;
  value: number;
}

class AddPlanService {
  async execute({
    name,
    profile_id,
    purchase_id,
    token_id,
    value,
  }: PlanRequest) {
    const getPlan = await prismaClient.plan.findUnique({
      where: {
        id: profile_id,
      },
    });

    const plans = {
      promocional: 365,
      bronze: 90,
      prata: 180,
      ouro: 365,
      "prime-90": 90,
      "prime-180": 180,
      "prime-365": 365,
      "prime-vip": 365,
      "prime-promocional": 365,
    };

    const plansName = [
      "free",
      "promocional",
      "bronze",
      "prata",
      "ouro",
      "prime-90",
      "prime-180",
      "prime-365",
      "prime-vip",
      "prime-promocional",
      "business",
    ];

    let plan_name = name;

    if (getPlan) {
      plan_name =
        plansName.indexOf(name) > plansName.indexOf(getPlan.name)
          ? name
          : getPlan.name;
    }

    await prismaClient.purchase.create({
      data: {
        name: plan_name,
        profile_id: profile_id,
        purchase_id: purchase_id,
        token_id: token_id,
        value: value,
      },
    });

    if (getPlan) {
      const planEdit = await prismaClient.plan.update({
        where: {
          profile_id: profile_id,
        },
        data: {
          name: plan_name,
          validity: addDays(getPlan.validity, plans[name]),
        },
      });
      await prismaClient.profile.update({
        where: {
          id: profile_id,
        },
        data: {
          plan_name: plan_name,
        },
      });
      return planEdit;
    } else {
      const planCreated = await prismaClient.plan.create({
        data: {
          name: plan_name,
          profile_id: profile_id,
          validity: addDays(new Date(), plans[name]),
          id: profile_id,
        },
      });
      await prismaClient.profile.update({
        where: {
          id: profile_id,
        },
        data: {
          plan_name: plan_name,
        },
      });
      return planCreated;
    }
  }
}

export { AddPlanService };
