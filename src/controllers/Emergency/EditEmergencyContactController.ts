import { Request, Response } from 'express';
import { EditEmergencyContactService } from '../../services/Emergency/EditEmergencyContactService';

class EditEmergencyContactController {
    async handle(req: Request, res: Response) {
        const { id } = req.params

        const { name, visible, kinship, contact } = req.body

        const editEmergencyContactService = new EditEmergencyContactService

        const emergencyEdited = await editEmergencyContactService.execute({
            name, id, visible, kinship, contact
        })

        return res.json(emergencyEdited)
    }
}

export { EditEmergencyContactController }