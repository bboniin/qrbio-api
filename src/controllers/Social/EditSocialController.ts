import { Request, Response } from 'express';
import { EditSocialService } from '../../services/Social/EditSocialService';

class EditSocialController {
    async handle(req: Request, res: Response) {
        const { id } = req.params

        const { name, url } = req.body

        let userId = req.userId

        const editSocialService = new EditSocialService

        const socialEdited = await editSocialService.execute({
            id, name, url, userId
        })

        return res.json(socialEdited)
    }
}

export { EditSocialController }