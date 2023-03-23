import { Request, Response } from 'express';
import { EmailConfirmService } from '../../services/User/EmailConfirmService';

class EmailConfirmController {
    async handle(req: Request, res: Response) {


        let { id } = req.params

        const emailConfirmService = new EmailConfirmService

        const user = await emailConfirmService.execute({
            id
        })

        return res.send(user.message)
    }
}

export { EmailConfirmController }