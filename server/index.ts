import express, { Express } from "express";
import dotenv from "dotenv";
import genericRouter from "./routes/generic.routes";

// dotenv config
dotenv.config();

// basic declarations
const app: Express = express();
const port = process.env.PORT || 8000;

// route declarations
genericRouter(app);

// spin up server
app.listen(port, () => {
    console.log(`Server listening on port ${port}!`);
});
