import { Request, Response } from "express";
/**
 * CREATE LEAD
 */
export declare const createLead: (req: Request, res: Response) => Promise<void>;
/**
 * GET ALL LEADS (FILTER + SEARCH + PAGINATION + SORT)
 */
export declare const getLeads: (req: Request, res: Response) => Promise<void>;
/**
 * UPDATE LEAD
 */
export declare const updateLead: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
/**
 * DELETE LEAD
 */
export declare const deleteLead: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=leadController.d.ts.map