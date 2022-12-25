import { Request, Response } from 'express';
import { GetAdminUserService } from '../../services/Admin/GetAdminUserService';

class GetAdminUserController {
    async handle(req: Request, res: Response) {

        const { id } = req.params

        let userId = req.userId

        const getAdminUserService = new GetAdminUserService

        const user = await getAdminUserService.execute({
            userId, id
        })

        return res.json(user)
    }
}

export { GetAdminUserController }