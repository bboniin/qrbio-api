import { Request, Response } from 'express';
import { DeleteTextService } from '../../services/Text/DeleteTextService';

class DeleteTextController {
    async handle(req: Request, res: Response) {
        const { id } = req.params

        let userId = req.userId

        const deleteTextService = new DeleteTextService

        const textDeleted = await deleteTextService.execute({
            id, userId
        })

        return res.json(textDeleted)
    }
}

export { DeleteTextController }