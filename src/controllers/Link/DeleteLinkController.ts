import { Request, Response } from 'express';
import { DeleteLinkService } from '../../services/Link/DeleteLinkService';

class DeleteLinkController {
    async handle(req: Request, res: Response) {
        const { id } = req.params

        let userId = req.userId

        const deleteLinkService = new DeleteLinkService

        const linkDeleted = await deleteLinkService.execute({
            id, userId
        })

        return res.json(linkDeleted)
    }
}

export { DeleteLinkController }