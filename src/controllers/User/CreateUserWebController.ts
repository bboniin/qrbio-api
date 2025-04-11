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
      partner_id,
      qrcode,
      instagram,
    } = req.body;

    let photo = "";
    if (req.file) {
      photo = req.file.filename;
    }

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
      partner_id,
      photo,
    });

    return res.json(user);
  }
}

export { CreateUserWebController };
