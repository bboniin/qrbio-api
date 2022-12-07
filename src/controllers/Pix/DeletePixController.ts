import { Request, Response } from 'express';
import { DeletePixService } from '../../services/Pix/DeletePixService';

class DeletePixController {
    async handle(req: Request, res: Response) {
        const { id } = req.params

        let userId = req.userId

        const deletePixService = new DeletePixService

        const pixDeleted = await deletePixService.execute({
            id, userId
        })

        return res.json(pixDeleted)
    }
}

export { DeletePixController }