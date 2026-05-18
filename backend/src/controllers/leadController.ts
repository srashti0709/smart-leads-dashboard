import { Request, Response } from "express";
import Lead from "../models/Lead";

/**
 * CREATE LEAD
 */
export const createLead = async (req: Request, res: Response) => {
  try {
    const lead = await Lead.create(req.body);
    res.status(201).json(lead);
  } catch (error) {
    res.status(500).json({ message: "Error creating lead", error });
  }
};

/**
 * GET ALL LEADS (FILTER + SEARCH + PAGINATION + SORT)
 */
export const getLeads = async (req: Request, res: Response) => {
  try {
    const {
      page = "1",
      limit = "10",
      status,
      source,
      search,
      sort = "latest"
    } = req.query;

    const query: any = {};

    // FILTER: status
    if (status) {
      query.status = status;
    }

    // FILTER: source
    if (source) {
      query.source = source;
    }

    // SEARCH: name or email
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } }
      ];
    }

    // SORT
    let sortOption: any = { createdAt: -1 }; // latest first

    if (sort === "oldest") {
      sortOption = { createdAt: 1 };
    }

    const pageNumber = parseInt(page as string);
    const limitNumber = parseInt(limit as string);

    const leads = await Lead.find(query)
      .sort(sortOption)
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber);

    const total = await Lead.countDocuments(query);

    res.json({
      leads,
      total,
      page: pageNumber,
      totalPages: Math.ceil(total / limitNumber)
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching leads", error });
  }
};

/**
 * UPDATE LEAD
 */
export const updateLead = async (req: Request, res: Response) => {
  try {
    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    res.json(lead);
  } catch (error) {
    res.status(500).json({ message: "Error updating lead", error });
  }
};

/**
 * DELETE LEAD
 */
export const deleteLead = async (req: Request, res: Response) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);

    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    res.json({ message: "Lead deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting lead", error });
  }
};