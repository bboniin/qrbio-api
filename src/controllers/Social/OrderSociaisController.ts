import { Request, Response } from 'express';
import { OrderSociaisService } from '../../services/Social/OrderSociaisService';

class OrderSociaisController {
    async handle(req: Request, res: Response) {
        const { id } = req.params

        const { sociais } = req.body

        let userId = req.userId

        const orderSociaisService = new OrderSociaisService

        const orderSociais = await orderSociaisService.execute({
            id, sociais, userId
        })

        return res.json(orderSociais)
    }
}

export { OrderSociaisController }