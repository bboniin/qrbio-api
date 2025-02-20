import { Request, Response } from "express";
import { CreateBatchCouponService } from "../../services/Coupon/CreateBatchCouponService";

class CreateBatchCouponController {
  async handle(req: Request, res: Response) {
    const {
      name,
      plan,
      couponsTotal,
      partner_id,
      expiration_enable,
      expiration_date,
    } = req.body;

    const createBatchCouponService = new CreateBatchCouponService();

    const batchCoupon = await createBatchCouponService.execute({
      name,
      plan,
      couponsTotal,
      partner_id,
      expiration_enable,
      expiration_date,
    });

    return res.json(batchCoupon);
  }
}

export { CreateBatchCouponController };
