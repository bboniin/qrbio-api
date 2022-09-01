import { Request, Response } from 'express';
import { EditProfileService } from '../../services/Profile/EditProfileService';

class EditProfileController {
    async handle(req: Request, res: Response) {
        const { id } = req.params

        const { name, description } = req.body

        let userId = req.userId


        let photo = ""

        if (req.file) {
            photo = req.file.filename
        }

        const editProfileService = new EditProfileService

        const profileEdited = await editProfileService.execute({
            userId, id, name, description, photo
        })

        return res.json(profileEdited)
    }
}

export { EditProfileController }