import express, { Application, Request, Response } from 'express'
import cors from "cors"
import router from './app/routes';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
const app : Application = express();

// parser
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:3000','https://easy-stay-five.vercel.app'], // Adjust this for your frontend's domain
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Authorization', 'Content-Type'],
  credentials : true
}));

// application routers
app.use("/api/", router);

app.get('/', (req : Request, res : Response) => {
  res.send('Hello World!')
})

// global error handle
app.use(globalErrorHandler as any);

// not found api handler middleware
app.use(notFound as any)

export default app;