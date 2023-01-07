import { Request, Response } from 'express';
import { ListPartnersService } from '../../services/Partner/ListPartnersService';

class ListPartnersController {
    async handle(req: Request, res: Response) {
        const { page, search } = req.query

        const listPartnersService = new ListPartnersService

        const listPartners = await listPartnersService.execute({
            page: page ? String(page) : "0", search: search ? String(search) : ""
        })

        return res.json(listPartners)
    }
}

export { ListPartnersController }