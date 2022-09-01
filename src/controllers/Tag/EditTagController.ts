import { Request, Response } from 'express';
import { EditTagService } from '../../services/Tag/EditTagService';

class EditTagController {
    async handle(req: Request, res: Response) {
        const { id } = req.params

        let { name } = req.body

        const editTagService = new EditTagService

        const tagEdited = await editTagService.execute({
            name, id
        })

        return res.json(tagEdited)
    }
}


export { EditTagController }