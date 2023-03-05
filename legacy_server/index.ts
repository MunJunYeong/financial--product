import 'dotenv/config'
import express, { Express, Request, Response } from 'express';
import basicRouter from './router'
import bodyParser from 'body-parser'

const app: Express = express();
const port = 3000;

app.use(bodyParser.json({limit : 50000000}));
app.use(basicRouter)

interface savings {
  duration: string
  date: string
  rate: number
  isSimple: boolean // true - 단리 , false - 복리
  tariff: number // 이자세율
}

app.post('/test', (req, res) => {
  const data  = req.body
  console.log(data);

  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`[server]: Server is running at <https://localhost>:${port}`);
});