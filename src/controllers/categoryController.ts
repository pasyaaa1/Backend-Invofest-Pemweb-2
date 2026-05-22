import { Request, Response } from "express";
import { prisma } from "../lib/db.js";

export const getCategory = async (_req: Request, res: Response) => {
  try {
    const allCategories = await prisma.category.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(allCategories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Gagal memuat kategori" });
  }
};

export const createCategory = async (req: Request, res: Response) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Nama kategori wajib diisi" });
  }

  try {
    const newCategory = await prisma.category.create({
      data: { name: String(name) },
    });
    res.status(201).json(newCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Gagal menyimpan kategori" });
  }
};

export const showCategory = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  try {
    const category = await prisma.category.findUnique({ where: { id } });
    if (!category) {
      return res.status(404).json({ error: "Kategori tidak ditemukan" });
    }
    res.json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Gagal memuat kategori" });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { name } = req.body;

  try {
    const category = await prisma.category.update({
      where: { id },
      data: {
        ...(name !== undefined && { name: String(name) }),
      },
    });
    res.json(category);
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: "Kategori tidak ditemukan" });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  try {
    await prisma.category.delete({ where: { id } });
    res.json({ message: "Kategori berhasil dihapus" });
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: "Kategori tidak ditemukan" });
  }
};
