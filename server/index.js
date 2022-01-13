const config = require("config");
const express = require("express");
const mongoose = require("mongoose");
const users = require("./routes/users");
const auth = require("./routes/auth");

const app = express();

if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR : jwtPrivateKey is not defined.");
  process.exit(1);
}

mongoose
  .connect(
    "mongodb+srv://salpa:12345@cluster0.yshnh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  )
  .then(() => console.log("Connected to MongoDB...."))
  .catch((err) =>
    console.error("Could not connect to MongoDB Database...", err)
  );

app.use(express.json());
app.use("/api/register", users);
app.use("/api/auth", auth);

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
