import { Request, Response } from 'express';
import { ViewProfilesService } from '../../services/Statistics/ViewProfilesService';

class ViewProfilesController {
    async handle(req: Request, res: Response) {
        let userId = req.userId

        const viewProfilesService = new ViewProfilesService

        const viewProfiles = await viewProfilesService.execute({
            userId
        })

        return res.json(viewProfiles)
    }
}


export { ViewProfilesController }