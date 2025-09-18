import express from "express";
import cors from "cors";
import { PORT } from "./config/config.js";

// importig Routes here 
import authRoutes from "./routes/User.js";
import storeRoutes from "./routes/Store.js";
import ownerRoutes from "./routes/Owner.js";
import ratingRoutes from './routes/Rating.js';

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/store",storeRoutes);
app.use("/api/v1/owner",ownerRoutes);
app.use("/api/v1/rating",ratingRoutes);


// app.get("/", (req, res) => {
//   return res.json({
//     success: true,
//     message: "Your server is up and Running",
//   });
// });

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
