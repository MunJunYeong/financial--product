import 'dotenv/config'
import express, { Express, Request, Response } from 'express';
import basicRouter from './router'

const app: Express = express();
const port = 3000;

app.use(basicRouter)

 
app.listen(port, () => {
  console.log(`[server]: Server is running at <https://localhost>:${port}`);
});