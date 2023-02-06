import { Request, Response } from 'express';
import { EditBatchService } from '../../services/Admin/EditBatchService';

class EditBatchController {
    async handle(req: Request, res: Response) {

        const { id } = req.params

        let userId = req.userId


        const { name, partner_id } = req.body

        const editBatchService = new EditBatchService

        const batch = await editBatchService.execute({
            userId, id, name, partner_id
        })

        return res.json(batch)
    }
}

export { EditBatchController }