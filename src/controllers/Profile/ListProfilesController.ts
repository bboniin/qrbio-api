import { Request, Response } from 'express';
import { ListProfilesService } from '../../services/Profile/ListProfilesService';

class ListProfilesController {
    async handle(req: Request, res: Response) {

        let userId = req.userId

        const listProfilesService = new ListProfilesService

        const profiles = await listProfilesService.execute({
            userId
        })
        profiles.map((item) => {
            item["photo_url"] = "https://edish.s3.sa-east-1.amazonaws.com/" + item.photo
            item["background_image"] = "https://edish.s3.sa-east-1.amazonaws.com/" + item.background_image
        })


        return res.json(profiles)
    }
}

export { ListProfilesController }