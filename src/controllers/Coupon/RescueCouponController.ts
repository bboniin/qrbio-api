import { Request, Response } from 'express';
import { RescueCouponService } from '../../services/Coupon/RescueCouponService';

class RescueCouponController {
    async handle(req: Request, res: Response) {
        const { id } = req.params

        let { profile_id } = req.body

        const rescueCouponService = new RescueCouponService

        const rescueCoupon = await rescueCouponService.execute({
            id, profile_id
        })

        return res.json(rescueCoupon)
    }
}


export { RescueCouponController }