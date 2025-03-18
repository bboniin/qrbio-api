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
      copyLinks: copyLinks,
      copyPixs: copyPixs,
      copySocial: copySocial,
      copyInfos: copyInfos,
      copyText: copyText,
      copyEmergency: copyEmergency,
      copyPartners: copyPartners,
    });

    return res.json(profileRelocate);
  }
}

export { CopyProfileController };
