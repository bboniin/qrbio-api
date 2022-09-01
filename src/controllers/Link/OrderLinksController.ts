import { Request, Response } from 'express';
import { OrderLinksService } from '../../services/Link/OrderLinksService';

class OrderLinksController {
    async handle(req: Request, res: Response) {
        const { id } = req.params

        const { links } = req.body

        let userId = req.userId

        const orderLinksService = new OrderLinksService

        const orderLinks = await orderLinksService.execute({
            id, links, userId
        })

        return res.json(orderLinks)
    }
}

export { OrderLinksController }