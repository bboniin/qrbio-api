import { Request, Response } from 'express';
import { LinkPartnerService } from '../../services/Partner/LinkPartnerService';

class LinkPartnerController {
    async handle(req: Request, res: Response) {
        const { batch_id } = req.params

        let { partner_id } = req.body

        const linkPartnerService = new LinkPartnerService

        const partnerLink = await linkPartnerService.execute({
            partner_id, batch_id
        })

        return res.json(partnerLink)
    }
}


export { LinkPartnerController }