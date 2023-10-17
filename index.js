const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const cookieParser = require("cookie-parser");
app.use(cookieParser());
const cors = require("cors");
app.use(
  cors({
    origin: ["http://localhost:3000", "https://qdemy.netlify.app"],
    credentials: true,
  })
);
const userRoutes = require("./routes/userRoutes");
const courseRoutes = require("./routes/courseRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const connectDb = require("./config/db");
connectDb();
app.use("/api/user", userRoutes);
app.use("/api/courses", courseRoutes);
app.use("/", notFound);

app.listen(port, () => {
  console.log(`server started on port ${port}`);
});
