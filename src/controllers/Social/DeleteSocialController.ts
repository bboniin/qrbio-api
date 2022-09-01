import { Request, Response } from 'express';
import { DeleteSocialService } from '../../services/Social/DeleteSocialService';

class DeleteSocialController {
    async handle(req: Request, res: Response) {
        const { id } = req.params

        const deleteSocialService = new DeleteSocialService

        const socialDeleted = await deleteSocialService.execute({
            id
        })

        return res.json(socialDeleted)
    }
}

export { DeleteSocialController }