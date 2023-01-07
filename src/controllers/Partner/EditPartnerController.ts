import { Request, Response } from 'express';
import { EditPartnerService } from '../../services/Partner/EditPartnerService';

class EditPartnerController {
    async handle(req: Request, res: Response) {
        const { id } = req.params

        const { name, latitude, longitude } = req.body

        let userId = req.userId

        let photo = ""

        if (req.file) {
            photo = req.file.filename
        }

        const editPartnerService = new EditPartnerService

        const partnerEdited = await editPartnerService.execute({
            name, id, latitude, longitude, photo, userId
        })

        return res.json(partnerEdited)
    }
}


export { EditPartnerController }