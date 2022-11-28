import { Request, Response } from 'express';
import { CreateTextService } from '../../services/Text/CreateTextService';

class CreateTextController {
    async handle(req: Request, res: Response) {
        const { name, text, order, open, profile_id } = req.body

        let userId = req.userId

        const createTextService = new CreateTextService

        const textCreated = await createTextService.execute({
            name, text, order, open, userId, profile_id
        })

        return res.json(textCreated)
    }
}

export { CreateTextController }