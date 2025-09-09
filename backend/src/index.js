import express from "express";
import cors from "cors";
import { PORT } from "./config/config.js";

// importig Routes here 
import authRoutes from "./routes/User.js";

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// routes
app.use("/api/v1/auth", authRoutes);


// app.get("/", (req, res) => {
//   return res.json({
//     success: true,
//     message: "Your server is up and Running",
//   });
// });

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
