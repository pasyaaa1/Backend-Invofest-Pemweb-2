import { prisma } from "../lib/db.js";
let categories = [];
//menampilkan data category
export const getCategory = async (req, res) => {
    const AllCategories = await prisma.category.findMany({
        orderBy: {
            createdAt: "desc",
        },
    });
    res.json(AllCategories);
};
//membuat data category baru
export const createCategory = (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(500).json({
            error: "Nama kategori wajib diisi",
        });
    }
    const newCategory = {
        id: categories.length + 1,
        name: name
    };
    categories.push(newCategory);
    res.status(201).json(newCategory);
};
// GET Category by ID
export const showCategory = (req, res) => {
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
export const updateCategory = (req, res) => {
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
export const deleteCategory = (req, res) => {
    const id = Number(req.params.id);
    categories = categories.filter((c) => c.id !== id);
    res.json({ message: "Kategori berhasil dihapus" });
};
//# sourceMappingURL=categoryController.js.map