import { Request, Response } from 'express';
import { ListBatchCouponService } from '../../services/Coupon/ListBatchCouponService';

class ListBatchCouponController {
    async handle(req: Request, res: Response) {
        const { page, search } = req.query

        let userId = req.userId

        const listBatchCouponService = new ListBatchCouponService

        const batchCoupons = await listBatchCouponService.execute({
            userId, page: page ? String(page) : "0", search: search ? String(search) : ""
        })

        return res.json(batchCoupons)
    }
}

export { ListBatchCouponController }