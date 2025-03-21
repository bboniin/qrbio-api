import { Request, Response } from "express";
import { CreateUserWebService } from "../../services/User/CreateUserWebService";

class CreateUserWebController {
  async handle(req: Request, res: Response) {
    const {
      name,
      email,
      phone_number,
      password,
      nickname,
      description,
      code,
      qrcode,
      instagram,
    } = req.body;

    const createUserWebService = new CreateUserWebService();

    const user = await createUserWebService.execute({
      name,
      email,
      phone_number,
      password,
      nickname,
      description,
      code,
      qrcode,
      instagram,
    });

    return res.json(user);
  }
}

export { CreateUserWebController };
