import { Request, Response } from 'express';
import { CountProfileMonthService } from '../../services/Profile/CountProfileMonthService';

class CountProfileMonthController {
    async handle(req: Request, res: Response) {

        let { profile_id } = req.params

        const countProfileMonthService = new CountProfileMonthService

        const countProfile = await countProfileMonthService.execute({
            profile_id
        })

        return res.json(countProfile)
    }
}


export { CountProfileMonthController }