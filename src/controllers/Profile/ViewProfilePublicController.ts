import { Request, Response } from 'express';
import { CountViewProfile } from '../../services/Count/CountViewProfile';
import { ViewProfilePublicService } from '../../services/Profile/ViewProfilePublicService';

class ViewProfilePublicController {
    async handle(req: Request, res: Response) {

        const { id } = req.params

        const viewProfilePublicService = new ViewProfilePublicService

        const profile = await viewProfilePublicService.execute({
            id
        })

        const ip = req.ip;

        const countViewProfile = new CountViewProfile

        const countProfile = await countViewProfile.execute({
            ip, profile_id: profile.id
        })

        return res.json(profile)
    }
}

export { ViewProfilePublicController }