import { Request, Response } from 'express';
import { GetUserService } from '../../services/Admin/GetUserService';

class GetUserController {
    async handle(req: Request, res: Response) {

        const { id } = req.params

        let userId = req.userId

        const getUserService = new GetUserService

        const user = await getUserService.execute({
            userId, id
        })

        return res.json(user)
    }
}

export { GetUserController }