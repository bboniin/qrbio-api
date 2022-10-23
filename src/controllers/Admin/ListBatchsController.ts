import { Request, Response } from 'express';
import { ListBatchsService } from '../../services/Admin/ListBatchsService';

class ListBatchsController {
    async handle(req: Request, res: Response) {

        const { page, search } = req.query

        let userId = req.userId

        const listBatchsService = new ListBatchsService

        const batchs = await listBatchsService.execute({
            userId, page: page ? String(page) : "0", search: search ? String(search) : ""
        })

        return res.json(batchs)
    }
}

export { ListBatchsController }