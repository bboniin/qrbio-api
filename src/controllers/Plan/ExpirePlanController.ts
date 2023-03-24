import { Request, Response } from 'express';
import { ExpirePlanService } from '../../services/Plan/ExpirePlanService';

class ExpirePlanController {
    async handle(req: Request, res: Response) {

        const expirePlanService = new ExpirePlanService

        const linkCreated = await expirePlanService.execute({
        })

        return res.json(linkCreated)
    }
}

export { ExpirePlanController }