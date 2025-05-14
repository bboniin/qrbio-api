import { Request, Response } from "express";
import { CreatePartnerService } from "../../services/Partner/CreatePartnerService";

class CreatePartnerController {
  async handle(req: Request, res: Response) {
    const {
      name,
      latitude,
      longitude,
      email,
      password,
      url,
      label,
      street,
      number,
      postal_code,
      complement,
      neighborhood,
      city,
      state,
      description,
      whatsapp,
      instagram,
      map_visible,
    } = req.body;

    let userId = req.userId;

    let photo = "";

    if (req.file) {
      photo = req.file.filename;
    }

    const createPartnerService = new CreatePartnerService();

    const PartnerCreated = await createPartnerService.execute({
      name,
      latitude,
      longitude,
      photo,
      url,
      label,
      email,
      password,
      userId,
      street,
      number,
      postal_code,
      complement,
      neighborhood,
      city,
      state,
      description,
      whatsapp,
      instagram,
      map_visible,
    });

    return res.json(PartnerCreated);
  }
}

export { CreatePartnerController };
