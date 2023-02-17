import { Request, Response } from 'express';
import { ClearTagService } from '../../services/Tag/ClearTagService';

class ClearTagController {
    async handle(req: Request, res: Response) {
        const { id } = req.params

        const clearTagService = new ClearTagService

        const tagCleared = await clearTagService.execute({
            id
        })

        return res.json(tagCleared)
    }
}

export { ClearTagController }