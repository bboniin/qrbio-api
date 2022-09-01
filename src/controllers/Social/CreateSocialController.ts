import { Request, Response } from 'express';
import { CreateSocialService } from '../../services/Social/CreateSocialService';

class CreateSocialController {
    async handle(req: Request, res: Response) {
        const { name, url, order, profile_id } = req.body

        let userId = req.userId

        const createSocialService = new CreateSocialService

        const socialCreated = await createSocialService.execute({
            name, url, order, userId, profile_id
        })

        return res.json(socialCreated)
    }
}

export { CreateSocialController }