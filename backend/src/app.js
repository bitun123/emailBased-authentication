const express  =  require("express");

//require the routes
const authRoutes = require("./routes/auth.routes")
const cookie = require("cookie-parser");
const cors = require("cors")
const app = express();
app.use(express.json());
app.use(cookie());

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  }),
);


app.use("/api/auth",authRoutes);
module.exports  = app;
