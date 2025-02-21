import { isBefore, startOfDay } from "date-fns";
import prismaClient from "../../prisma";

interface CouponRequest {
  id: string;
}

class GetCouponService {
  async execute({ id }: CouponRequest) {
    if (!id) {
      throw new Error("ID é obrigátorio");
    }

    const getCoupon = await prismaClient.coupon.findFirst({
      where: {
        coupon_id: id,
      },
      include: {
        batchsCoupon: true,
      },
    });

    getCoupon["expiration_enable"] = getCoupon.batchsCoupon.expiration_enable;
    getCoupon["expiration_date"] = getCoupon.batchsCoupon.expiration_date;
    getCoupon["expiration"] = false;
    getCoupon["days_plan"] = getCoupon.batchsCoupon.days_plan;

    if (getCoupon["expiration_enable"]) {
      if (
        isBefore(
          startOfDay(getCoupon["expiration_date"]),
          startOfDay(new Date())
        )
      ) {
        getCoupon["expiration"] = true;
      }
    }

    delete getCoupon.batchsCoupon;

    return getCoupon;
  }
}

export { GetCouponService };
