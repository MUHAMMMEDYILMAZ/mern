import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import env from "./util/validateEnv"

const app = express();

app.get("/", (req, res) => {
  res.send("Hello Worghld!");
});

const port = env.PORT;

mongoose.connect(env.MONGO_CONNECTION_STRING).then(() => {
  console.log("Connected to MongoDB");
  
app.listen(port, () => {
  console.log("Server is running on port" + port);
});

});

