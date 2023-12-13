import cors from "cors";
import dotenv from "dotenv";
import http from "http";
// import bodyParser from "body-parser";
import express, { json, urlencoded } from "express";
import StudentRouter from "./routers/StudentRouter.js";
import UserRouter from "./routers/UserRouter.js";
dotenv.config();
const PORT = process.env.PORT || 8080;
const app = express();

app.use(cors({ origin: "*" }));
app.use(json({ limit: "100mb" }));
// app.use(bodyParser());
app.use(urlencoded({ extended: true }));
app.use(StudentRouter);
app.use(UserRouter);
const httpServer = http.createServer(app);
// //sever
httpServer.listen(PORT, () => {
    console.log(`Starting server on port ${PORT}`);
});
