import { Request, Response } from 'express';
import { VerifyNicknameService } from '../../services/Profile/VerifyNicknameService';

class VerifyNicknameController {
    async handle(req: Request, res: Response) {

        const { nickname } = req.params

        const verifyNicknameService = new VerifyNicknameService

        const profile = await verifyNicknameService.execute({
            nickname
        })

        return res.json(profile)
    }
}

export { VerifyNicknameController }