require("dotenv");
import express, { Request, Response, NextFunction } from "express";
import 'express-async-errors'
import cors from 'cors'
import cron from "node-cron";

import { router } from "./routes";
import { ExpirePlanService } from "./services/Plan/ExpirePlanService";

const app = express()

app.use(cors())
app.use(express.json())
app.set("trust proxy", true);

app.use(router)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof Error) {
        return res.status(400).json({ message: err.message })
    }
    return res.status(500).json({
        status: 'error',
        message: 'Internal serve error'
    })
})

cron.schedule("0 8 * * *", () => {
    const expirePlanService = new ExpirePlanService();
    expirePlanService.execute({});
});

app.listen(3333, () => console.log("rodando v38"))