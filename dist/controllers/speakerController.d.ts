import { Request, Response } from "express";
declare const getSpeakers: (req: Request, res: Response) => Promise<void>;
declare const createSpeaker: (req: Request, res: Response) => Response<any, Record<string, any>> | undefined;
declare const updateSpeaker: (req: Request, res: Response) => Response<any, Record<string, any>> | undefined;
declare const deleteSpeaker: (req: Request, res: Response) => void;
export { getSpeakers, createSpeaker, updateSpeaker, deleteSpeaker };
//# sourceMappingURL=speakerController.d.ts.map