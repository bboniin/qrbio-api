import { Request, Response } from 'express';
import { CreateBatchCouponService } from '../../services/Coupon/CreateBatchCouponService';

class CreateBatchCouponController {
    async handle(req: Request, res: Response) {
        const { name, plan, couponsTotal, partner_id } = req.body

        const createBatchCouponService = new CreateBatchCouponService

        const batchCoupon = await createBatchCouponService.execute({
            name, plan, couponsTotal, partner_id
        })

        return res.json(batchCoupon)
    }
}

export { CreateBatchCouponController }