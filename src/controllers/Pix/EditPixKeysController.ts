import { Request, Response } from 'express';
import { EditPixKeysService } from '../../services/Pix/EditPixKeysService';

class EditPixKeysController {
    async handle(req: Request, res: Response) {
        const { id } = req.params

        const { name, visible, key } = req.body

        const editPixKeysService = new EditPixKeysService

        const pixEdited = await editPixKeysService.execute({
            name, id, visible, key
        })

        return res.json(pixEdited)
    }
}

export { EditPixKeysController }