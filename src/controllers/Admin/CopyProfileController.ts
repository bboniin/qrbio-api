import { Request, Response } from "express";
import { CopyProfileService } from "../../services/Admin/CopyProfileService";

class CopyProfileController {
  async handle(req: Request, res: Response) {
    const {
      nicknames,
      nicknameCopy,
      copyLinks,
      copyPixs,
      copySocial,
      copyInfos,
      copyEmergency,
      copyText,
      copyPartners,
    } = req.body;

    const copyProfileService = new CopyProfileService();

    const profileRelocate = await copyProfileService.execute({
      nicknameCopy,
      nicknames,
      copyLinks: copyLinks == "true",
      copyPixs: copyPixs == "true",
      copySocial: copySocial == "true",
      copyInfos: copyInfos == "true",
      copyText: copyText == "true",
      copyEmergency: copyEmergency == "true",
      copyPartners: copyPartners == "true",
    });

    return res.json(profileRelocate);
  }
}

export { CopyProfileController };
