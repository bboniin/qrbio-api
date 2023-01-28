import { Request, Response } from 'express';
import { CreateEmergencyContactService } from '../../services/Emergency/CreateEmergencyContactService';

class CreateEmergencyContactController {
    async handle(req: Request, res: Response) {
        const { name, kinship, order, contact, emergency_id } = req.body


        const createEmergencyContactService = new CreateEmergencyContactService

        const pixCreated = await createEmergencyContactService.execute({
            name, kinship, order, contact, emergency_id
        })

        return res.json(pixCreated)
    }
}

export { CreateEmergencyContactController }