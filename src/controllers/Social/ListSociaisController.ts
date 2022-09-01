import { Request, Response } from 'express';
import { ListSociaisService } from '../../services/Social/ListSociaisService';

class ListSociaisController {
    async handle(req: Request, res: Response) {
        const { id } = req.params

        const listSociaisService = new ListSociaisService

        const listSociais = await listSociaisService.execute({
            id
        })

        return res.json(listSociais)
    }
}

export { ListSociaisController }