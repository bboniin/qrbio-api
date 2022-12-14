import { Request, Response } from 'express';
import { RelocateProfileService } from '../../services/Admin/RelocateProfileService';

class RelocateProfileController {
    async handle(req: Request, res: Response) {
        const { nickname } = req.params
        const { email } = req.body

        const relocateProfileService = new RelocateProfileService

        const profileRelocate = await relocateProfileService.execute({
            nickname, email
        })

        return res.json(profileRelocate)
    }
}


export { RelocateProfileController }