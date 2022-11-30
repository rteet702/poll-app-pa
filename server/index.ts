import express, { Express } from "express";
import dotenv from "dotenv";
import genericRouter from "./routes/generic.routes";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8000;

genericRouter(app);

app.listen(port, () => {
    console.log(`Server listening on port ${port}!`);
});
