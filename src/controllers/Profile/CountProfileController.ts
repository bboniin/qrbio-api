import { Request, Response } from 'express';
import { CountProfileService } from '../../services/Profile/CountProfileService';

class CountProfileController {
    async handle(req: Request, res: Response) {

        let { profile_id } = req.params

        const countProfileService = new CountProfileService

        const countProfile = await countProfileService.execute({
            profile_id
        })

        return res.json(countProfile)
    }
}


export { CountProfileController }