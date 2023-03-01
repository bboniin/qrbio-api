import { Request, Response } from 'express';
import { GetPlanService } from '../../services/Plan/GetPlanService';

class GetPlanController {
    async handle(req: Request, res: Response) {
        const { id } = req.params

        let userId = req.userId

        const getPlanService = new GetPlanService

        const plan = await getPlanService.execute({
            id, userId
        })

        return res.json(plan)
    }
}

export { GetPlanController }