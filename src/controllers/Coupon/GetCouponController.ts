import { Request, Response } from 'express';
import { GetCouponService } from '../../services/Coupon/GetCouponService';

class GetCouponController {
    async handle(req: Request, res: Response) {
        const { id } = req.params

        const getCouponService = new GetCouponService

        const batchCoupon = await getCouponService.execute({
            id
        })

        return res.json(batchCoupon)
    }
}


export { GetCouponController }