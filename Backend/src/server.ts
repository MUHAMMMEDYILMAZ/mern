import "dotenv/config";
import mongoose from "mongoose";
import env from "./util/validateEnv"
import app from "./app";


const port = env.PORT;

mongoose.connect(env.MONGO_CONNECTION_STRING).then(() => {
  console.log("Connected to MongoDB");
  
app.listen(port, () => {
  console.log("Server is running on port" + port);
});

});

