import { Request, Response } from "express";
import { EditPartnerService } from "../../services/Partner/EditPartnerService";

class EditPartnerController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const { name, latitude, longitude, url, label, email, password } = req.body;

    let userId = req.userId;

    let photo = "";

    if (req.file) {
      photo = req.file.filename;
    }

    const editPartnerService = new EditPartnerService();

    const partnerEdited = await editPartnerService.execute({
      name,
      id,
      latitude,
      longitude,
      url,
      photo,
      userId,
      label,
      email,
      password,
    });

    return res.json(partnerEdited);
  }
}

export { EditPartnerController };
