import { Request, Response } from 'express';
import { ListProfilesService } from '../../services/Profile/ListProfilesService';

class ListProfilesController {
    async handle(req: Request, res: Response) {

        let userId = req.userId

        const listProfilesService = new ListProfilesService

        const profiles = await listProfilesService.execute({
            userId
        })

        return res.json(profiles)
    }
}

export { ListProfilesController }