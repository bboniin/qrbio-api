import { Request, Response } from 'express';
import { ListPurchasesService } from '../../services/Plan/ListPurchasesService';

class ListPurchasesController {
    async handle(req: Request, res: Response) {
        const { id } = req.params

        let userId = req.userId

        const listPurchasesService = new ListPurchasesService

        const purchases = await listPurchasesService.execute({
            id, userId
        })

        return res.json(purchases)
    }
}

export { ListPurchasesController }