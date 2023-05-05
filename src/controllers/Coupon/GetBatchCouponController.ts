import { Request, Response } from 'express';
import { GetBatchCouponService } from '../../services/Coupon/GetBatchCouponService';

class GetBatchCouponController {
    async handle(req: Request, res: Response) {
        const { id } = req.params

        const getBatchCouponService = new GetBatchCouponService

        const batchCoupon = await getBatchCouponService.execute({
            id
        })

        return res.json(batchCoupon)
    }
}


export { GetBatchCouponController }