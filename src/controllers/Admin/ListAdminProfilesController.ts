import { Request, Response } from 'express';
import { ListAdminProfilesService } from '../../services/Admin/ListAdminProfilesService';

class ListAdminProfilesController {
    async handle(req: Request, res: Response) {

        const { page, search, premium } = req.query

        let userId = req.userId

        const listAdminProfilesService = new ListAdminProfilesService

        const profiles = await listAdminProfilesService.execute({
            userId, page: page ? String(page) : "0", search: search ? String(search) : "", premium: premium == "true" ? true : false
        })

        return res.json(profiles)
    }
}

export { ListAdminProfilesController }