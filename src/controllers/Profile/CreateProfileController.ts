import { Request, Response } from 'express';
import { CreateProfileService } from '../../services/Profile/CreateProfileService';

class CreateProfileController {
    async handle(req: Request, res: Response) {
        const { name, description, nickname, category } = req.body

        let userId = req.userId
        let photo = ""
        if (req.file) {
            photo = req.file.filename
        }

        console.log(userId)

        const createProfileService = new CreateProfileService

        const profileCreated = await createProfileService.execute({
            name, description, nickname, photo, userId, category
        })

        return res.json(profileCreated)
    }
}

export { CreateProfileController }