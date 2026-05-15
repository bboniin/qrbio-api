import { Request, Response } from "express";
import { CreateUserService } from "../../services/User/CreateUserService";

class CreateUserController {
  async handle(req: Request, res: Response) {
    const { name, email, password, phone_number, cpf } = req.body;

    const createUserService = new CreateUserService();

    const user = await createUserService.execute({
      name,
      email,
      phone_number,
      password,
      cpf,
    });

    return res.json(user);
  }
}

export { CreateUserController };
