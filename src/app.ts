import express,{json,urlencoded, Request, Response} from "express";
// import mongoose from "mongoose";
import helmet from "helmet";
import cors from "cors";


const app = express();

app.use(json({ limit: '50kb' }))
   .use(urlencoded({extended: true, limit: '50kb' }))
   .use(helmet())
   .use(cors())

app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        message: "server works"
    })
})

export default app;
