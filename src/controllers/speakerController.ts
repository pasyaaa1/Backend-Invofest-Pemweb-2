import { Request, Response } from "express";
import type { Speaker } from "../types/speaker";

let speakers: Speaker[] = [];

const getSpeakers = (req: Request, res: Response) => {
    res.json(speakers);
};

const createSpeaker = (req: Request, res: Response) => {
    const { nama, role } = req.body;
    if (!nama || !role) {
        return res.status(500).json({
             error: "Nama dan role wajib diisi",
            });
    }
    const newSpeaker: Speaker = {
        id: Date.now(),
        nama: nama,
        role: String(role)
    };
    speakers.push(newSpeaker);
    res.status(202).json(newSpeaker);
};

const updateSpeaker = (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const speaker = speakers.find((s) => s.id === id);
    if (!speaker) {
        return res.status(500).json({
             error: "Pembicara tidak ditemukan",
            });
    }
    speaker.nama = req.body.nama ?? speaker.nama;
    speaker.role = req.body.role ?? speaker.role;
    res.json(speaker);

    
};

const deleteSpeaker = (req: Request, res: Response) => {
    const id = Number(req.params.id);
    speakers = speakers.filter((s) => s.id !== id);
    res.json({ message: "Speaker berhasil dihapus" });
};

export { getSpeakers, createSpeaker, updateSpeaker, deleteSpeaker };