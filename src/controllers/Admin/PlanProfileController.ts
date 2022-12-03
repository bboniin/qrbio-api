import { Request, Response } from 'express';
import { PlanProfileService } from '../../services/Admin/PlanProfileService';

class PlanProfileController {
    async handle(req: Request, res: Response) {
        const { id } = req.params

        const { plan } = req.body

        const planProfileService = new PlanProfileService

        const planProfile = await planProfileService.execute({
            id, plan
        })

        return res.json(planProfile)
    }
}


export { PlanProfileController }