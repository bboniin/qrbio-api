import { Request, Response } from 'express';
import { CreateTagService } from '../../services/Tag/CreateTagService';

class CreateTagController {
    async handle(req: Request, res: Response) {

        const createTagService = new CreateTagService

        const tagCreated = await createTagService.execute()

        return res.json(tagCreated)
    }
}

export { CreateTagController }