import { isBefore, startOfDay } from "date-fns";
import prismaClient from "../../prisma";

interface BatchCouponRequest {
  id: string;
}

class GetBatchCouponService {
  async execute({ id }: BatchCouponRequest) {
    if (!id) {
      throw new Error("ID é obrigátorio");
    }

    const getBatchCoupon = await prismaClient.batchCoupon.findUnique({
      where: {
        id: id,
      },
      include: {
        partner: true,
        coupons: true,
      },
    });

    getBatchCoupon["expiration"] = false;

    if (getBatchCoupon.expiration_enable) {
      if (
        isBefore(
          startOfDay(getBatchCoupon.expiration_date),
          startOfDay(new Date())
        )
      ) {
        getBatchCoupon["expiration"] = true;
      }
    }

    return getBatchCoupon;
  }
}

export { GetBatchCouponService };
