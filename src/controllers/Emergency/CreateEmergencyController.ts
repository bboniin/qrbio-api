import { Request, Response } from 'express';
import { CreateEmergencyService } from '../../services/Emergency/CreateEmergencyService';

class CreateEmergencyController {
    async handle(req: Request, res: Response) {
        const { name, message, order, observation, type_blood, profile_id } = req.body

        let userId = req.userId

        const createEmergencyService = new CreateEmergencyService

        const emergencyCreated = await createEmergencyService.execute({
            order, name, message, userId, observation, type_blood, profile_id
        })

        return res.json(emergencyCreated)
    }
}

export { CreateEmergencyController }