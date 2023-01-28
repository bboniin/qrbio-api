import { Request, Response } from 'express';
import { DeleteEmergencyService } from '../../services/Emergency/DeleteEmergencyService';

class DeleteEmergencyController {
    async handle(req: Request, res: Response) {
        const { id } = req.params

        let userId = req.userId

        const deleteEmergencyService = new DeleteEmergencyService

        const emergencyDeleted = await deleteEmergencyService.execute({
            id, userId
        })

        return res.json(emergencyDeleted)
    }
}

export { DeleteEmergencyController }