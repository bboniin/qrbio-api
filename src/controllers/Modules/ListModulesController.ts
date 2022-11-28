import { Request, Response } from 'express';
import { ListModulesService } from '../../services/Modules/ListModulesService';

class ListModulesController {
    async handle(req: Request, res: Response) {
        const { id } = req.params

        const listModulesService = new ListModulesService

        const listModules = await listModulesService.execute({
            id
        })

        return res.json(listModules)
    }
}

export { ListModulesController }