import { Request, Response } from 'express';
import { CreatePixService } from '../../services/Pix/CreatePixService';

class CreatePixController {
    async handle(req: Request, res: Response) {
        const { name, visible_message, message, order, profile_id } = req.body

        let userId = req.userId

        const createPixService = new CreatePixService

        const pixCreated = await createPixService.execute({
            name, order, visible_message, message, userId, profile_id
        })

        return res.json(pixCreated)
    }
}

export { CreatePixController }