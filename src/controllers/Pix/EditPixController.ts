import { Request, Response } from 'express';
import { EditPixService } from '../../services/Pix/EditPixService';

class EditPixController {
    async handle(req: Request, res: Response) {
        const { id } = req.params

        const { name, message, visible_message } = req.body

        let userId = req.userId

        const editPixService = new EditPixService

        const pixEdited = await editPixService.execute({
            id, name, message, visible_message, userId
        })

        return res.json(pixEdited)
    }
}

export { EditPixController }