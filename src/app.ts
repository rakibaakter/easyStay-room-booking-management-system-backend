import express, { Application, Request, Response } from 'express'
import cors from "cors"
import router from './app/routes';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
const app : Application = express();

// parser
app.use(express.json());
app.use(cors());

// application routers
app.use("/api/", router);

app.get('/', (req : Request, res : Response) => {
  res.send('Hello World!')
})

// global error handle
app.use(globalErrorHandler as any);

export default app;