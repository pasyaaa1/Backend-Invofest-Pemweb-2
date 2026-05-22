import "dotenv/config";
import express from "express";
import cors from "cors";

import eventRoutes from "./routes/eventRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import speakerRoutes from "./routes/speakerRoutes.js";

const app = express();
const port = Number(process.env.PORT) || 3000;

app.use(
  cors({
    origin: [
      "https://fe-invovest-dashboard.vercel.app",
      "http://localhost:5173",
      "http://localhost:4173",
    ],
  })
);
app.use(express.json());
app.use("/events", eventRoutes);
app.use("/categories", categoryRoutes);
app.use("/speakers", speakerRoutes);

app.get("/", (req, res) => {
res.send("API INVOFEST");
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Server jalan di port ${port}`);
});