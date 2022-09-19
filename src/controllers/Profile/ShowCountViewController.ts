import { Request, Response } from "express";
import { ShowCountViewService } from "../../services/Count/ShowCountViewService";

class ShowCountViewController {
  async handle(req: Request, res: Response) {

    const { index, type_date } = req.query;
    const { profile_id } = req.params;

    let userId = req.userId

    const showCountViewService = new ShowCountViewService


    const userViews = await showCountViewService.execute({
      profile_id: profile_id,
      index: index ? Number(index) : 0,
      type_date: type_date ? String(type_date) : "monthly",
      userId: userId
    });

    return res.json(userViews);
  }
}

export { ShowCountViewController };