import { Request, Response } from 'express';
import { ListTagsService } from '../../services/Tag/ListTagsService';

class ListTagsController {
    async handle(req: Request, res: Response) {
        const { id } = req.params

        const listTagsService = new ListTagsService

        const listTags = await listTagsService.execute({
            id
        })

        return res.json(listTags)
    }
}

export { ListTagsController }