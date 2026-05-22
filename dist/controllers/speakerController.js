import { prisma } from "../lib/db.js";
export const getSpeakers = async (_req, res) => {
    try {
        const allSpeakers = await prisma.speaker.findMany({
            orderBy: { createdAt: "desc" },
        });
        res.json(allSpeakers);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Gagal memuat pembicara" });
    }
};
export const getSpeakerById = async (req, res) => {
    const id = Number(req.params.id);
    try {
        const speaker = await prisma.speaker.findUnique({ where: { id } });
        if (!speaker) {
            return res.status(404).json({ error: "Pembicara tidak ditemukan" });
        }
        res.json(speaker);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Gagal memuat pembicara" });
    }
};
export const createSpeaker = async (req, res) => {
    const { nama, name, role, image } = req.body;
    const speakerName = name ?? nama;
    if (!speakerName || !role) {
        return res.status(400).json({ error: "Nama dan role wajib diisi" });
    }
    try {
        const newSpeaker = await prisma.speaker.create({
            data: {
                name: String(speakerName),
                role: String(role),
                image: image ? String(image) : "",
            },
        });
        res.status(201).json(newSpeaker);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Gagal menyimpan pembicara" });
    }
};
export const updateSpeaker = async (req, res) => {
    const id = Number(req.params.id);
    const { nama, name, role, image } = req.body;
    const speakerName = name ?? nama;
    try {
        const speaker = await prisma.speaker.update({
            where: { id },
            data: {
                ...(speakerName !== undefined && { name: String(speakerName) }),
                ...(role !== undefined && { role: String(role) }),
                ...(image !== undefined && { image: String(image) }),
            },
        });
        res.json(speaker);
    }
    catch (error) {
        console.error(error);
        res.status(404).json({ error: "Pembicara tidak ditemukan" });
    }
};
export const deleteSpeaker = async (req, res) => {
    const id = Number(req.params.id);
    try {
        await prisma.speaker.delete({ where: { id } });
        res.json({ message: "Speaker berhasil dihapus" });
    }
    catch (error) {
        console.error(error);
        res.status(404).json({ error: "Pembicara tidak ditemukan" });
    }
};
//# sourceMappingURL=speakerController.js.map