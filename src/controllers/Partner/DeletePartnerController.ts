import { Request, Response } from 'express';
import { DeletePartnerService } from '../../services/Partner/DeletePartnerService';

class DeletePartnerController {
    async handle(req: Request, res: Response) {
        const { id } = req.params

        const deletePartnerService = new DeletePartnerService

        const partnerDeleted = await deletePartnerService.execute({
            id
        })

        return res.json(partnerDeleted)
    }
}

export { DeletePartnerController }