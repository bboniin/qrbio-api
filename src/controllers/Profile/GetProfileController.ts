import { Request, Response } from 'express';
import { GetProfileService } from '../../services/Profile/GetProfileService';
import { ListModulesService } from '../../services/Modules/ListModulesService';

class GetProfileController {
    async handle(req: Request, res: Response) {

        const { id } = req.params

        const getProfileService = new GetProfileService

        const profile = await getProfileService.execute({
            id
        })

        const listModulesService = new ListModulesService

        const modules = await listModulesService.execute({
            id
        })

        return res.json({ ...profile, modules })
    }
}

export { GetProfileController }