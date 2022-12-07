import { Request, Response } from 'express';
import { DeletePixKeysService } from '../../services/Pix/DeletePixKeysService';

class DeletePixKeysController {
    async handle(req: Request, res: Response) {
        const { id } = req.params


        const deletePixKeysService = new DeletePixKeysService

        const pixDeleted = await deletePixKeysService.execute({
            id
        })

        return res.json(pixDeleted)
    }
}

export { DeletePixKeysController }