import { Request, Response } from "express";
import { GetPartnerService } from "../../services/Partner/GetPartnerService";

class GetPartnerController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const { page, search } = req.query;

    const userId = req.userId;

    const getPartnerService = new GetPartnerService();

    const partner = await getPartnerService.execute({
      id: id == "auth" ? userId : id,
      auth: id == "auth",
      page: Number(page) || 0,
      search: search ? String(search) : "",
    });

    if (id == "auth") {
      partner["profiles"].map(async (item) => {
        if (item.photo) {
          item["photo_url"] =
            "https://qrbio-api.s3.amazonaws.com/" + item.photo;
        }
      });
    }

    return res.json(partner);
  }
}

export { GetPartnerController };
