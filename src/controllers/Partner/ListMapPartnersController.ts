import { Request, Response } from "express";
import { ListMapPartnersService } from "../../services/Partner/ListMapPartnersService";

class ListMapPartnersController {
  async handle(req: Request, res: Response) {
    const {
      minLatitude,
      minLongitude,
      maxLatitude,
      maxLongitude,
      keywords,
      categories,
    } = req.query;

    const listMapPartnersService = new ListMapPartnersService();

    const partners = await listMapPartnersService.execute({
      minLatitude: Number(minLatitude),
      minLongitude: Number(minLongitude),
      maxLatitude: Number(maxLatitude),
      maxLongitude: Number(maxLongitude),
      categories: categories ? String(categories) : "",
      keywords: keywords ? String(keywords) : "",
    });

    partners.map((item) => {
      if (item["photo"]) {
        item["photo_url"] =
          "https://qrbio-api.s3.amazonaws.com/" + item["photo"];
      }
    });

    return res.json(partners);
  }
}

export { ListMapPartnersController };
