import { Request, Response } from 'express';
import { PrintedTagService } from '../../services/Admin/PrintedTagService';

class PrintedTagController {
    async handle(req: Request, res: Response) {
        const { id } = req.params

        const printedTagService = new PrintedTagService

        const tagPrinted = await printedTagService.execute({
            id
        })

        return res.json(tagPrinted)
    }
}


export { PrintedTagController }