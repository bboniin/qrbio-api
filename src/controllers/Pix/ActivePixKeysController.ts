import { Request, Response } from 'express';
import { ActivePixKeysService } from '../../services/Pix/ActivePixKeysService';

class ActivePixKeysController {
    async handle(req: Request, res: Response) {
        const { id } = req.params

        const { visible } = req.body

        const activePixKeysService = new ActivePixKeysService

        const pixEdited = await activePixKeysService.execute({
            id, visible
        })

        return res.json(pixEdited)
    }
}

export { ActivePixKeysController }