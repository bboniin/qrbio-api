import { Request, Response } from 'express';
import { EditUserService } from '../../services/User/EditUserService';

class EditUserController {
    async handle(req: Request, res: Response) {
        const { name, email, phone_number } = req.body


        let userId = req.userId

        const editUserService = new EditUserService

        const user = await editUserService.execute({
            name, email, phone_number, userId
        })

        return res.json(user)
    }
}

export { EditUserController }