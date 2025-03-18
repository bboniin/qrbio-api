import { Request, Response } from "express";
import { ListMessagesService } from "../../services/Message/ListMessagesService";

class ListMessagesController {
  async handle(req: Request, res: Response) {
    const { page, all, search } = req.query;

    const listMessagesService = new ListMessagesService();

    const listMessages = await listMessagesService.execute({
      page: page ? Number(page) || 0 : 0,
      all: all == "true",
      search: search ? String(search) : "",
    });

    return res.json(listMessages);
  }
}

export { ListMessagesController };
