import { Request, Response } from 'express';
import { ViewProfilePublicService } from '../../services/Profile/ViewProfilePublicService';

class ViewProfilePublicController {
    async handle(req: Request, res: Response) {

        const { id } = req.params

        const viewProfilePublicService = new ViewProfilePublicService

        const profile = await viewProfilePublicService.execute({
            id
        })

        return res.json(profile)
    }
}

export { ViewProfilePublicController }