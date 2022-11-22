import { Request, Response } from 'express';
import { GetBatchService } from '../../services/Admin/GetBatchService';

class GetBatchController {
    async handle(req: Request, res: Response) {

        const { id } = req.params

        let userId = req.userId

        const getBatchService = new GetBatchService

        const batch = await getBatchService.execute({
            userId, id
        })

        return res.json(batch)
    }
}

export { GetBatchController }