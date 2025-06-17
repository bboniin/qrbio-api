import { Request, Response } from "express";
import { VerifyEmailService } from "../../services/Profile/VerifyEmailService";

class VerifyEmailController {
  async handle(req: Request, res: Response) {
    const { email } = req.params;

    const verifyEmailService = new VerifyEmailService();

    const profile = await verifyEmailService.execute({
      email,
    });

    return res.json(profile);
  }
}

export { VerifyEmailController };
