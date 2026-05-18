"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteLead = exports.updateLead = exports.getLeads = exports.createLead = void 0;
const Lead_1 = __importDefault(require("../models/Lead"));
/**
 * CREATE LEAD
 */
const createLead = async (req, res) => {
    try {
        const lead = await Lead_1.default.create(req.body);
        res.status(201).json(lead);
    }
    catch (error) {
        res.status(500).json({ message: "Error creating lead", error });
    }
};
exports.createLead = createLead;
/**
 * GET ALL LEADS (FILTER + SEARCH + PAGINATION + SORT)
 */
const getLeads = async (req, res) => {
    try {
        const { page = "1", limit = "10", status, source, search, sort = "latest" } = req.query;
        const query = {};
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
        let sortOption = { createdAt: -1 }; // latest first
        if (sort === "oldest") {
            sortOption = { createdAt: 1 };
        }
        const pageNumber = parseInt(page);
        const limitNumber = parseInt(limit);
        const leads = await Lead_1.default.find(query)
            .sort(sortOption)
            .skip((pageNumber - 1) * limitNumber)
            .limit(limitNumber);
        const total = await Lead_1.default.countDocuments(query);
        res.json({
            leads,
            total,
            page: pageNumber,
            totalPages: Math.ceil(total / limitNumber)
        });
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching leads", error });
    }
};
exports.getLeads = getLeads;
/**
 * UPDATE LEAD
 */
const updateLead = async (req, res) => {
    try {
        const lead = await Lead_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!lead) {
            return res.status(404).json({ message: "Lead not found" });
        }
        res.json(lead);
    }
    catch (error) {
        res.status(500).json({ message: "Error updating lead", error });
    }
};
exports.updateLead = updateLead;
/**
 * DELETE LEAD
 */
const deleteLead = async (req, res) => {
    try {
        const lead = await Lead_1.default.findByIdAndDelete(req.params.id);
        if (!lead) {
            return res.status(404).json({ message: "Lead not found" });
        }
        res.json({ message: "Lead deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting lead", error });
    }
};
exports.deleteLead = deleteLead;
//# sourceMappingURL=leadController.js.map