import { Request, Response } from 'express';
import { PrintedBatchService } from '../../services/Admin/PrintedBatchService';

class PrintedBatchController {
    async handle(req: Request, res: Response) {
        const { id } = req.params

        const printedBatchService = new PrintedBatchService

        const batchPrinted = await printedBatchService.execute({
            id
        })

        return res.json(batchPrinted)
    }
}


export { PrintedBatchController }