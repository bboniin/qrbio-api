import { Request, Response } from 'express';
import { EditEmergencyService } from '../../services/Emergency/EditEmergencyService';

class EditEmergencyController {
    async handle(req: Request, res: Response) {
        const { id } = req.params

        const { name, message, observation, type_blood } = req.body

        let userId = req.userId

        const editEmergencyService = new EditEmergencyService

        const emergencyEdited = await editEmergencyService.execute({
            id, name, message, observation, type_blood, userId
        })

        return res.json(emergencyEdited)
    }
}

export { EditEmergencyController }