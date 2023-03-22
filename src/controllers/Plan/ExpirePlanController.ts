import { Request, Response } from 'express';
import { ExpirePlanService } from '../../services/Plan/ExpirePlanService';

class ExpirePlanController {
    async handle(req: Request, res: Response) {
        const { name, profile_id, value, purchase_id, token_id } = req.body

        let userId = req.userId

        const expirePlanService = new ExpirePlanService

        const linkCreated = await expirePlanService.execute({
            name, profile_id, value, purchase_id
        })

        return res.json(linkCreated)
    }
}

export { ExpirePlanController }