import express, { Express } from "express";
import { Main } from "./app/main";
import dotenv from "dotenv";
import helmet from "helmet";
var cors = require("cors");

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8080;

app.use(helmet());
app.use(cors());
app.use(express.json());

new Main(app).init();

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
