import { Request, Response } from 'express';
import { ListUsersService } from '../../services/Admin/ListUsersService';

class ListUsersController {
    async handle(req: Request, res: Response) {

        const { page, search } = req.query

        let userId = req.userId

        const listUsersService = new ListUsersService

        const users = await listUsersService.execute({
            userId, page: page ? String(page) : "0", search: search ? String(search) : ""
        })

        return res.json(users)
    }
}

export { ListUsersController }