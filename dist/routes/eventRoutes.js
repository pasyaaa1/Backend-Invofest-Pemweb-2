import express from "express";
import { getEvents, createEvent, getEventById, updateEvent, deleteEvent } from "../controllers/eventController.js";
const router = express.Router();
router.get("/", getEvents); //Menampilkan data event
router.post("/", createEvent); // menyimpan data event baru
router.get("/:id", getEventById); // GET Event by ID
router.put("/:id", updateEvent); // UPDATE Event
router.delete("/:id", deleteEvent); // Menghapus Event
export default router;
//# sourceMappingURL=eventRoutes.js.map