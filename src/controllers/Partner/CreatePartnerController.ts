import { Request, Response } from 'express';
import { CreatePartnerService } from '../../services/Partner/CreatePartnerService';

class CreatePartnerController {
    async handle(req: Request, res: Response) {
        const { name, latitude, longitude, url } = req.body

        let userId = req.userId

        let photo = ""

        if (req.file) {
            photo = req.file.filename
        }

        const createPartnerService = new CreatePartnerService

        const PartnerCreated = await createPartnerService.execute({
            name, latitude, longitude, photo, url, userId
        })

        return res.json(PartnerCreated)
    }
}

export { CreatePartnerController }