import { Request, Response } from 'express';
import { AdminDeleteUserService } from '../../services/Admin/AdminDeleteUserService';

class AdminDeleteUserController {
    async handle(req: Request, res: Response) {
        const { user_id } = req.params

        let adminId = req.userId

        const adminDeleteUserService = new AdminDeleteUserService

        const user = await adminDeleteUserService.execute({
            user_id, adminId
        })

        return res.json(user)
    }
}

export { AdminDeleteUserController }