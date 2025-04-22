import { Request, Response } from "express";
import { ListProfilesPartnersService } from "../../services/Profile/ListProfilesPartnersService";

class ListProfilesPartnersController {
  async handle(req: Request, res: Response) {
    const listProfilesPartnersService = new ListProfilesPartnersService();

    const profiles = await listProfilesPartnersService.execute();

    return res.json(profiles);
  }
}

export { ListProfilesPartnersController };
