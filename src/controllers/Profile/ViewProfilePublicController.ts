import { Request, Response } from 'express';
import { CountViewProfile } from '../../services/Count/CountViewProfile';
import { CountProfileService } from '../../services/Profile/CountProfileService';
import { ViewProfilePublicService } from '../../services/Profile/ViewProfilePublicService';
import { ListModulesPublicService } from '../../services/Modules/ListModulesPublicService';

class ViewProfilePublicController {
    async handle(req: Request, res: Response) {

        const { id } = req.params

        const viewProfilePublicService = new ViewProfilePublicService

        const profile = await viewProfilePublicService.execute({
            id
        })

        const countProfileService = new CountProfileService

        const views = await countProfileService.execute({
            profile_id: profile.id
        })

        if (views.viewsTotal >= views.viewsPlan) {
            throw new Error("Esse perfil atingiu o limite de leituras mensal")
        }

        const ip = req.ip;

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