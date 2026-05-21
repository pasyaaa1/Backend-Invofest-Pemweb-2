import { Request, Response } from "express";
import type { Category } from "../types/category.js"; 
import { prisma } from "../lib/db.js";
let categories: Category[] = []; 

//menampilkan data category
export const getCategory = async (req: Request, res: Response) => {
  const AllCategories = await prisma.category.findMany({
    orderBy: {
        createdAt: "desc",
    },
  });
  res.json(AllCategories);
};

//membuat data category baru
export const createCategory = (req: Request, res: Response) => {
    const { name } = req.body;

    if (!name) {
        return res.status(500).json({
             error: "Nama kategori wajib diisi",
            });
    }

    const newCategory: Category = {
        id: categories.length + 1,
        name: name
    };

    categories.push(newCategory);
    res.status(201).json(newCategory);
};

// GET Category by ID
export const showCategory = (req: Request, res: Response) => {
    const id = Number(req.params.id);

    const category = categories.find((c) => c.id === id);
    if (!category) {
        return res.status(500).json({
             error: "Kategori tidak ditemukan",
            });
    }
    res.json(category);
};

// UPDATE Category
export const updateCategory = (req: Request, res: Response) => {
    const id = Number(req.params.id);

    const category = categories.find((c) => c.id === id);
    if (!category) {
        return res.status(500).json({
             error: "Kategori tidak ditemukan",
            });
    }
    category.name = req.body.name ?? category.name;
    res.json(category);
};

// DELETE Category
export const deleteCategory = (req: Request, res: Response) => {
    const id = Number(req.params.id);
    categories = categories.filter((c) => c.id !== id);
    res.json({ message: "Kategori berhasil dihapus" });

}; 