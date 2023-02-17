import { Request, Response } from 'express';
import { EditLinkService } from '../../services/Link/EditLinkService';

class EditLinkController {
    async handle(req: Request, res: Response) {
        const { id } = req.params

        const { name, icon_name, url } = req.body

        let userId = req.userId

        const editLinkService = new EditLinkService

        const linkEdited = await editLinkService.execute({
            id, name, icon_name, url, userId
        })

        return res.json(linkEdited)
    }
}

export { EditLinkController }