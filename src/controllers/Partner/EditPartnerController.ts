import { Request, Response } from "express";
import { EditPartnerService } from "../../services/Partner/EditPartnerService";

class EditPartnerController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const {
      name,
      latitude,
      longitude,
      url,
      label,
      email,
      password,
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
      categories,
      number_sends,
      sends_week,
      interval_send,
      keywords,
    } = req.body;

    let userId = req.userId;

    let photo = "";

    if (req.file) {
      photo = req.file.filename;
    }

    const editPartnerService = new EditPartnerService();

    const partnerEdited = await editPartnerService.execute({
      name,
      id,
      url,
      photo,
      userId,
      label,
      email,
      password,
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
      categories: categories || [],
      keywords,
      latitude: Number(latitude) || 0,
      longitude: Number(longitude) || 0,
      number_sends: Number(number_sends) || 0,
      sends_week: Number(sends_week) || 0,
      interval_send: Number(interval_send) || 0,
      map_visible: map_visible == "true",
    });

    return res.json(partnerEdited);
  }
}

export { EditPartnerController };
