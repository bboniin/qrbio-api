import { Request, Response } from 'express';
import { EditAdminUserService } from '../../services/Admin/EditAdminUserService';

class EditAdminUserController {
    async handle(req: Request, res: Response) {
        const { name, email, phone_number, password, message, observation } = req.body


        const { user_id } = req.params

        const editAdminUserService = new EditAdminUserService

        const user = await editAdminUserService.execute({
            name, email, phone_number, user_id, password, message, observation
        })

        return res.json(user)
    }
}

export { EditAdminUserController }