import { Request, Response } from 'express';
import { ListModulesService } from '../../services/Modules/ListModulesService';
import { OrderModulesService } from '../../services/Modules/OrderModulesService';

class OrderModulesController {
    async handle(req: Request, res: Response) {
        const { id } = req.params

        const { modules } = req.body


        const orderModulesService = new OrderModulesService

        await orderModulesService.execute({
            modules
        })

        const listModulesService = new ListModulesService

        const orderModules = await listModulesService.execute({
            id
        })


        return res.json(orderModules)
    }
}

export { OrderModulesController }