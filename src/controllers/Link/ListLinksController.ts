import { Request, Response } from 'express';
import { ListLinksService } from '../../services/Link/ListLinksService';

class ListLinksController {
    async handle(req: Request, res: Response) {
        const { id } = req.params

        const listLinksService = new ListLinksService

        const listLinks = await listLinksService.execute({
            id
        })

        return res.json(listLinks)
    }
}

export { ListLinksController }