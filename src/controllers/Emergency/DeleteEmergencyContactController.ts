import { Request, Response } from 'express';
import { DeleteEmergencyContactService } from '../../services/Emergency/DeleteEmergencyContactService';

class DeleteEmergencyContactController {
    async handle(req: Request, res: Response) {
        const { id } = req.params


        const deleteEmergencyContactService = new DeleteEmergencyContactService

        const emergencyDeleted = await deleteEmergencyContactService.execute({
            id
        })

        return res.json(emergencyDeleted)
    }
}

export { DeleteEmergencyContactController }