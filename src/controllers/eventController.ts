import { Request, Response } from "express";
import type { Event } from "../types/event"; 

let events: Event[] = []; 

//menampilkan data event
export const getEvents = (req: Request, res: Response) => {
  res.json(events);
};

//membuat data event baru
export const createEvent = (req: Request, res: Response) => {
    const { name, tanggal, category, description } = req.body;

    if (!name || !tanggal || !category) {
        return res.status(500).json({
             error: "Nama, tanggal, dan kategori wajib diisi",
            });
    }

    //mapping data
    const newEvent: Event = {
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
export const getEventById = (req: Request, res: Response) => {
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
export const updateEvent = (req: Request, res: Response) => {
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
export const deleteEvent = (req: Request, res: Response) => {
    const id = Number(req.params.id);
    events = events.filter((e) => e.id !== id);
    res.json({ message: "Event berhasil dihapus" });    
}; 