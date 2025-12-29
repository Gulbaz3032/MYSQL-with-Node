import express from "express";
const app = express();
import dotenv from "dotenv";
import router from "./routes/studentsRoute.js";
import { mySqlPool } from "./config/db.js";
dotenv.config();

app.use(express.json());

const port = process.env.PORT || 9090;

app.use("/api/v1/students", router);

    mySqlPool
    .query(" SELECT 1")
    .then(() => {
        console.log("MYSQL is Connected");
        app.listen(port, () => {
        console.log(`Server is Running on PORT ${port}`);
        });
    })
    .catch((error) => {
        console.log("Failed to connect db, server error", error);
    });
