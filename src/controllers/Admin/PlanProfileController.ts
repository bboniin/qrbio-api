import { Request, Response } from 'express';
import { PlanProfileService } from '../../services/Admin/PlanProfileService';

class PlanProfileController {
    async handle(req: Request, res: Response) {
        const { profile_id } = req.params

        const { plan_name, validity } = req.body

        const planProfileService = new PlanProfileService

        const planProfile = await planProfileService.execute({
            profile_id, plan_name, validity
        })

        return res.json(planProfile)
    }
}


export { PlanProfileController }