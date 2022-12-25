import { Request, Response } from 'express';
import { CountViewProfile } from '../../services/Count/CountViewProfile';
import { ViewProfilePublicService } from '../../services/Profile/ViewProfilePublicService';
import { ListModulesPublicService } from '../../services/Modules/ListModulesPublicService';

class ViewProfilePublicController {
    async handle(req: Request, res: Response) {

        const { id } = req.params

        const viewProfilePublicService = new ViewProfilePublicService

        const profile = await viewProfilePublicService.execute({
            id
        })

        const ip = req.ip;
        console.log(ip)

        const countViewProfile = new CountViewProfile

        await countViewProfile.execute({
            ip, profile_id: profile.id
        })

        const listModulesPublicService = new ListModulesPublicService

        const modules = await listModulesPublicService.execute({
            id: profile.id
        })

        return res.json({ ...profile, modules })

    }
}

export { ViewProfilePublicController }