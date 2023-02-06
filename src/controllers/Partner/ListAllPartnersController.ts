import { Request, Response } from 'express';
import { ListAllPartnersService } from '../../services/Partner/ListAllPartnersService';

class ListAllPartnersController {
    async handle(req: Request, res: Response) {
        const { page, search } = req.query

        const listAllPartnersService = new ListAllPartnersService

        const listAllPartners = await listAllPartnersService.execute()

        return res.json(listAllPartners)
    }
}

export { ListAllPartnersController }