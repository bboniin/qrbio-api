import { Request, Response } from 'express';
import { DeleteProfileService } from '../../services/Profile/DeleteProfileService';

class DeleteProfileController {
    async handle(req: Request, res: Response) {
        const { id } = req.params

        const deleteProfileService = new DeleteProfileService

        const profileDeleted = await deleteProfileService.execute({
            id
        })

        return res.json(profileDeleted)
    }
}

export { DeleteProfileController }