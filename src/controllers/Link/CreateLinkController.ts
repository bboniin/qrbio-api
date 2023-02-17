import { Request, Response } from 'express';
import { CreateLinkService } from '../../services/Link/CreateLinkService';

class CreateLinkController {
    async handle(req: Request, res: Response) {
        const { name, url, order, profile_id, icon_name } = req.body

        let userId = req.userId

        const createLinkService = new CreateLinkService

        const linkCreated = await createLinkService.execute({
            name, url, order, userId, profile_id, icon_name
        })

        return res.json(linkCreated)
    }
}

export { CreateLinkController }