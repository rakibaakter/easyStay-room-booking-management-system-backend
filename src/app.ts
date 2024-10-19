import express, { Application, Request, Response } from 'express'
import cors from "cors"
import router from './app/routes';
const app : Application = express();

// parser
app.use(express.json());
app.use(cors());

// application routers
app.use("/api/", router);

app.get('/', (req : Request, res : Response) => {
  res.send('Hello World!')
})

export default app;