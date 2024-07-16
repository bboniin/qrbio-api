import { Request, Response } from 'express';
import { ActiveSocialService } from '../../services/Social/ActiveSocialService';

class ActiveSocialController {
    async handle(req: Request, res: Response) {
        const { id } = req.params

        const { visible } = req.body

        let userId = req.userId

        const activeSocialService = new ActiveSocialService

        const socialActiveed = await activeSocialService.execute({
            id, visible, userId
        })

        return res.json(socialActiveed)
    }
}

export { ActiveSocialController }