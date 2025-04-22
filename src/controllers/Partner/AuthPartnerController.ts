import { Request, Response } from "express";
import { AuthPartnerService } from "../../services/Partner/AuthPartnerService";

class AuthPartnerController {
  async handle(req: Request, res: Response) {
    const { email, password } = req.body;

    const authPartnerService = new AuthPartnerService();

    const partner = await authPartnerService.execute({
      email,
      password,
    });

    return res.json(partner);
  }
}

export { AuthPartnerController };
