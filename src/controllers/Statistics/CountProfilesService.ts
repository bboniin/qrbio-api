import { Request, Response } from 'express';
import { CountProfilesService } from '../../services/Statistics/CountProfilesService';

class CountProfilesController {
    async handle(req: Request, res: Response) {
        const { index } = req.query

        let userId = req.userId

        const countProfilesService = new CountProfilesService

        const countProfiles = await countProfilesService.execute({
            userId, index: index ? Number(index) : 0,
        })

        return res.json(countProfiles)
    }
}


export { CountProfilesController }