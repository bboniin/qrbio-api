import { Request, Response } from 'express';
import { ActiveEmergencyContactService } from '../../services/Emergency/ActiveEmergencyContactService';

class ActiveEmergencyContactController {
    async handle(req: Request, res: Response) {
        const { id } = req.params

        const { visible } = req.body

        const activeEmergencyContactService = new ActiveEmergencyContactService

        const EmergencyEdited = await activeEmergencyContactService.execute({
            id, visible
        })

        return res.json(EmergencyEdited)
    }
}

export { ActiveEmergencyContactController }