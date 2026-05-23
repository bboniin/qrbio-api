import { Request, Response } from "express";
import { GetPartnerPublicService } from "../../services/Partner/GetPartnerPublicService";

class GetPartnerPublicController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const getPartnerPublicService = new GetPartnerPublicService();

    const partner = await getPartnerPublicService.execute({
      id: id,
    });

    return res.json(partner);
  }
}

export { GetPartnerPublicController };
