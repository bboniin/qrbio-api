import { Request, Response } from 'express';
import { SendEmailConfirmService } from '../../services/User/SendEmailConfirmService';

class SendEmailConfirmController {
    async handle(req: Request, res: Response) {

        let userId = req.userId

        const sendEmailConfirmService = new SendEmailConfirmService

        const message = await sendEmailConfirmService.execute({
            userId
        })

        return res.json(message)
    }
}

export { SendEmailConfirmController }