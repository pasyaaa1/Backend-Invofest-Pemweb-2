import express from 'express';
import { getSpeakers, createSpeaker, updateSpeaker, deleteSpeaker } from "../controllers/speakerController.js";
const router = express.Router();
router.get("/", getSpeakers);
router.post("/", createSpeaker);
router.put("/:id", updateSpeaker);
router.delete("/:id", deleteSpeaker);
export default router;
//# sourceMappingURL=speakerRoutes.js.map