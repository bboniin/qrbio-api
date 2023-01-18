import { Request, Response } from 'express';
import { NicknameProfileService } from '../../services/Admin/NicknameProfileService';

class NicknameProfileController {
    async handle(req: Request, res: Response) {
        const { id } = req.params

        const { nickname } = req.body

        const nicknameProfileService = new NicknameProfileService

        const nicknameProfile = await nicknameProfileService.execute({
            id, nickname
        })

        return res.json(nicknameProfile)
    }
}


export { NicknameProfileController }