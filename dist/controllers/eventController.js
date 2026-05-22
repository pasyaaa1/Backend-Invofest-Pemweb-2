import { prisma } from "../lib/db.js";
let events = [];
//menampilkan data event
export const getEvents = async (req, res) => {
    const AllEvents = await prisma.event.findMany({
        orderBy: {
            createdAt: "desc",
        },
    });
    res.json(AllEvents);
};
//membuat data event baru
export const createEvent = (req, res) => {
    const { name, tanggal, category, description } = req.body;
    if (!name || !tanggal || !category) {
        return res.status(500).json({
            error: "Nama, tanggal, dan kategori wajib diisi",
        });
    }
    //mapping data
    const newEvent = {
        id: Date.now(),
        name: name,
        tanggal: tanggal,
        category: category,
        description: description
    };
    //simpan data
    events.push(newEvent);
    res.status(201).json(newEvent);
};
// GET Event by ID
export const getEventById = (req, res) => {
    const id = Number(req.params.id);
    const event = events.find((e) => e.id === id);
    if (!event) {
        return res.status(500).json({
            Massage: "Event tidak ditemukan",
        });
    }
    res.json(event);
};
// UPDATE Event
export const updateEvent = (req, res) => {
    const id = Number(req.params.id);
    const event = events.find((e) => e.id === id);
    if (!event) {
        return res.status(404).json({ message: "Event tidak ditemukan" });
    }
    event.name = req.body.name ?? event.name;
    event.tanggal = req.body.tanggal ?? event.tanggal;
    event.category = req.body.category ?? event.category;
    event.description = req.body.description ?? event.description;
    res.json(event);
};
// DELETE Event
export const deleteEvent = (req, res) => {
    const id = Number(req.params.id);
    events = events.filter((e) => e.id !== id);
    res.json({ message: "Event berhasil dihapus" });
};
//# sourceMappingURL=eventController.js.map