import { Request, Response } from 'express';
import { GetTagService } from '../../services/Tag/GetTagService';

class GetTagController {
    async handle(req: Request, res: Response) {
        const { id } = req.params

        const getTagService = new GetTagService

        const getTag = await getTagService.execute({
            id
        })

        return res.json(getTag)
    }
}


export { GetTagController }