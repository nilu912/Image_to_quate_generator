const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

const userRoutes = require("./routes/userRoutes");
const quateRoutes = require("./routes/quateRoutes");

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

app.get("/api", (req, res, next) => {
  res.status(200).json({ message: "server running" });
});
app.use("/api", userRoutes);
app.use("/api", quateRoutes);


const port = process.env.PORT;
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDb Connected!"))
  .catch((err) => console.error("MongoDb connection error", err));

app.listen(port, () => {
  console.log("server is running on 5000!");
});
