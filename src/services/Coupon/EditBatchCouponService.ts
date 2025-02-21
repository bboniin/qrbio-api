import prismaClient from "../../prisma";

interface BatchCouponRequest {
  userId: string;
  id: string;
  name: string;
  partner_id: string;
  expiration_enable: boolean;
  expiration_date: Date;
  days_plan: number;
}

class EditBatchCouponService {
  async execute({
    expiration_enable,
    expiration_date,
    id,
    partner_id,
    name,
    days_plan,
  }: BatchCouponRequest) {
    const getBatchCoupon = await prismaClient.batchCoupon.findUnique({
      where: {
        id: id,
      },
    });

    if (!name) {
      name = getBatchCoupon.name;
    }

    if (!days_plan) {
      days_plan = getBatchCoupon.days_plan;
    }

    if (!partner_id) {
      partner_id = null;
    }

    if (expiration_enable && !expiration_date) {
      throw new Error("Preencha a data de vencimento para editar lote.");
    }

    let data = {
      name: name,
      partner_id: partner_id,
      days_plan: days_plan,
      expiration_enable: expiration_enable,
      expiration_date: expiration_enable ? expiration_date : new Date(),
    };

    const batchCouponEdited = await prismaClient.batchCoupon.update({
      where: {
        id: id,
      },
      data: data,
    });

    return batchCouponEdited;
  }
}

export { EditBatchCouponService };
