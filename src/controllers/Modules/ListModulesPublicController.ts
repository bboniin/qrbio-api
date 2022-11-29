import { Request, Response } from 'express';
import { ListModulesPublicService } from '../../services/Modules/ListModulesPublicService';

class ListModulesPublicController {
    async handle(req: Request, res: Response) {
        const { id } = req.params

        const listModulesPublicService = new ListModulesPublicService

        const listModules = await listModulesPublicService.execute({
            id
        })

        return res.json(listModules)
    }
}

export { ListModulesPublicController }