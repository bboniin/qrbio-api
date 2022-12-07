import { Request, Response } from 'express';
import { CreatePixKeysService } from '../../services/Pix/CreatePixKeysService';

class CreatePixKeysController {
    async handle(req: Request, res: Response) {
        const { name, key, order, pix_id } = req.body


        const createPixKeysService = new CreatePixKeysService

        const pixCreated = await createPixKeysService.execute({
            name, key, order, pix_id
        })

        return res.json(pixCreated)
    }
}

export { CreatePixKeysController }