import { Request, Response } from "express";
export declare const getCategory: (req: Request, res: Response) => Promise<void>;
export declare const createCategory: (req: Request, res: Response) => Response<any, Record<string, any>> | undefined;
export declare const showCategory: (req: Request, res: Response) => Response<any, Record<string, any>> | undefined;
export declare const updateCategory: (req: Request, res: Response) => Response<any, Record<string, any>> | undefined;
export declare const deleteCategory: (req: Request, res: Response) => void;
//# sourceMappingURL=categoryController.d.ts.map