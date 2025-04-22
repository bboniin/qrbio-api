import { Request, Response } from "express";
import { PartnersProfileService } from "../../services/Profile/PartnersProfileService";

class PartnersProfileController {
  async handle(req: Request, res: Response) {
    const { partners } = req.body;

    const { profile_id } = req.params;

    const partnersProfileService = new PartnersProfileService();

    await partnersProfileService.execute({
      partners,
      profile_id,
    });

    return res.json(partnersProfileService);
  }
}

export { PartnersProfileController };
