import { Request, Response } from 'express';
import { DeleteTagService } from '../../services/Tag/DeleteTagService';

class DeleteTagController {
    async handle(req: Request, res: Response) {
        const { id } = req.params

        const deleteTagService = new DeleteTagService

        const tagDeleted = await deleteTagService.execute({
            id
        })

        return res.json(tagDeleted)
    }
}

export { DeleteTagController }