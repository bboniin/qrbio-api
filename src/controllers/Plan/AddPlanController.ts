import { Request, Response } from 'express';
import { AddPlanService } from '../../services/Plan/AddPlanService';

class AddPlanController {
    async handle(req: Request, res: Response) {
        const { name, profile_id, value, purchase_id, token_id } = req.body

        let userId = req.userId

        const addPlanService = new AddPlanService

        const linkCreated = await addPlanService.execute({
            name, profile_id, value, purchase_id, token_id
        })

        return res.json(linkCreated)
    }
}

export { AddPlanController }