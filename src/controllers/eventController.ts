import { Request, Response } from "express";
import { prisma } from "../lib/db.js";

export const getEvents = async (_req: Request, res: Response) => {
  try {
    const allEvents = await prisma.event.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(allEvents);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Gagal memuat data event" });
  }
};

export const createEvent = async (req: Request, res: Response) => {
  const { name, tanggal, category, description, location, speaker, pembicara } =
    req.body;
  const speakerId = speaker ?? pembicara;

  if (!name || !tanggal || !category) {
    return res.status(400).json({
      error: "Nama, tanggal, dan kategori wajib diisi",
    });
  }

  try {
    const newEvent = await prisma.event.create({
      data: {
        name: String(name),
        categoryId: String(category),
        ...(speakerId && { speakerId: String(speakerId) }),
        location: location ? String(location) : "Universitas Harkat Negeri",
        dateEvent: new Date(tanggal),
        description: description ? String(description) : "",
      },
    });
    res.status(201).json(newEvent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Gagal menyimpan event" });
  }
};

export const getEventById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  try {
    const event = await prisma.event.findUnique({ where: { id } });
    if (!event) {
      return res.status(404).json({ message: "Event tidak ditemukan" });
    }
    res.json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Gagal memuat event" });
  }
};

export const updateEvent = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { name, tanggal, category, description, location, speaker, pembicara } =
    req.body;
  const speakerId = speaker ?? pembicara;

  try {
    const event = await prisma.event.update({
      where: { id },
      data: {
        ...(name !== undefined && { name: String(name) }),
        ...(category !== undefined && { categoryId: String(category) }),
        ...(speakerId !== undefined && {
          speakerId: speakerId ? String(speakerId) : null,
        }),
        ...(location !== undefined && { location: String(location) }),
        ...(tanggal !== undefined && { dateEvent: new Date(tanggal) }),
        ...(description !== undefined && { description: String(description) }),
      },
    });
    res.json(event);
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: "Event tidak ditemukan" });
  }
};

export const deleteEvent = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  try {
    await prisma.event.delete({ where: { id } });
    res.json({ message: "Event berhasil dihapus" });
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: "Event tidak ditemukan" });
  }
};
