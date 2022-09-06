import { Request, Response } from 'express';
import { VisibleLinkService } from '../../services/Link/VisibleLinkService';

class VisibleLinkController {
    async handle(req: Request, res: Response) {
        const { id } = req.params

        const { visible } = req.body

        let userId = req.userId

        const visibleLinkService = new VisibleLinkService

        const linkVisibleed = await visibleLinkService.execute({
            id, visible, userId
        })

        return res.json(linkVisibleed)
    }
}

export { VisibleLinkController }