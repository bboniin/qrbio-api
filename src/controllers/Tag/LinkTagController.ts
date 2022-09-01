import { Request, Response } from 'express';
import { LinkTagService } from '../../services/Tag/LinkTagService';

class LinkTagController {
    async handle(req: Request, res: Response) {
        const { id } = req.params

        let { name, profile_id } = req.body

        const linkTagService = new LinkTagService

        const tagLink = await linkTagService.execute({
            name, id, profile_id
        })

        return res.json(tagLink)
    }
}


export { LinkTagController }