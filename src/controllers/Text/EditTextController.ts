import { Request, Response } from 'express';
import { EditTextService } from '../../services/Text/EditTextService';

class EditTextController {
    async handle(req: Request, res: Response) {
        const { id } = req.params

        const { name, text, open, alignment } = req.body

        let userId = req.userId

        const editTextService = new EditTextService

        const textEdited = await editTextService.execute({
            id, name, text, open, alignment, userId
        })

        return res.json(textEdited)
    }
}

export { EditTextController }