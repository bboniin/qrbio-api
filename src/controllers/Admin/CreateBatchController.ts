import { Request, Response } from 'express';
import { CreateBatchService } from '../../services/Admin/CreateBatchService';

class CreateBatchController {
    async handle(req: Request, res: Response) {
        const { name, tagsTotal } = req.body

        let userId = req.userId

        const createBatchService = new CreateBatchService

        const batchCreated = await createBatchService.execute({
            name, userId, tagsTotal
        })

        return res.json(batchCreated)
    }
}

export { CreateBatchController }