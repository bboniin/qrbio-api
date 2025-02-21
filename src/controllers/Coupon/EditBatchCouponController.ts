import { Request, Response } from "express";
import { EditBatchCouponService } from "../../services/Coupon/EditBatchCouponService";

class EditBatchCouponController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    let userId = req.userId;

    const { name, partner_id, expiration_enable, expiration_date, days_plan } =
      req.body;

    const editBatchCouponService = new EditBatchCouponService();

    const batch = await editBatchCouponService.execute({
      userId,
      id,
      name,
      partner_id,
      expiration_enable,
      expiration_date,
      days_plan,
    });

    return res.json(batch);
  }
}

export { EditBatchCouponController };
