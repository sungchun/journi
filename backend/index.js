import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import router from "./config/router.js";
import { port, dbURI } from "./config/environment.js";

const app = express();

app.use(express.json({ limit: "50MB" }));
app.use(express.urlencoded({ limit: "50MB", extended: true }));
app.use(cors());

async function startServer() {
  try {
    await mongoose.connect(dbURI);

    app.use(express.json());

    app.use((req, _res, next) => {
      console.log(`request received, ${req.method} to ${req.url}`);
      next();
    });

    app.use("/api", router);

    app.use((_req, res) => {
      res.status(404).json({ message: "route not found D:" });
    });

    app.listen(port, () => console.log("servers are up and running!"));
  } catch (err) {
    console.log("error");
    console.log(err);
  }
}
startServer();
