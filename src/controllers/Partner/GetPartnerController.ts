import { Request, Response } from 'express';
import { GetPartnerService } from '../../services/Partner/GetPartnerService';

class GetPartnerController {
    async handle(req: Request, res: Response) {

        const { id } = req.params

        const getPartnerService = new GetPartnerService

        const partner = await getPartnerService.execute({
            id
        })

        return res.json(partner)
    }
}

export { GetPartnerController }