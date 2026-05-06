import express from "express";
import cors from "cors";

import eventRoutes from "./routes/eventRoutes";
import categoryRoutes from "./routes/categoryRoutes";
import pembicaraRoutes from "./routes/speakerRoutes";
import speakerRoutes from "./routes/speakerRoutes";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use("/events", eventRoutes);
app.use("/categories", categoryRoutes);
app.use("/speakers", speakerRoutes);

app.get("/", (req, res) => {
res.send("API INVOFEST");
});

app.listen(port, () => {
console.log(`Server lagi jalan di http://localhost:${port}`);
});