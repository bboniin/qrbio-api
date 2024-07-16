import { Request, Response } from 'express';
import { ListAdminProfilesService } from '../../services/Admin/ListAdminProfilesService';

class ListAdminProfilesController {
    async handle(req: Request, res: Response) {

        const { page, search, premium } = req.query

        let userId = req.userId

        const listAdminProfilesService = new ListAdminProfilesService

        const profiles = await listAdminProfilesService.execute({
            userId, page: page ? String(page) : "0", search: search ? String(search) : "", premium: premium == "true" ? true : false
        })

        profiles.profiles.map((data)=>{
            data["partners"].map((item)=>{
                item["label"] = item["partner"]["label"]
                if(item["partner"]["photo"]){
                    item["photo_url"] = "https://qrbio-api.s3.amazonaws.com/" + item["partner"]["photo"]
                }
            })
        })

        return res.json(profiles)
    }
}

export { ListAdminProfilesController }