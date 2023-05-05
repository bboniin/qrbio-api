import { Request, Response } from 'express';
import { CreateBatchCouponService } from '../../services/Coupon/CreateBatchCouponService';

class CreateBatchCouponController {
    async handle(req: Request, res: Response) {
        const { name, plan, couponsTotal } = req.body

        const createBatchCouponService = new CreateBatchCouponService

        const batchCoupon = await createBatchCouponService.execute({
            name, plan, couponsTotal
        })

        return res.json(batchCoupon)
    }
}

export { CreateBatchCouponController }