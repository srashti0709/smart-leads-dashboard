import { useEffect, useState } from "react";
import LeadFilters from "../components/leads/LeadFilters";
import LeadForm from "../components/leads/LeadForm";
import { getLeads, updateLead } from "../api/leads.api";
import type { Lead } from "../types/lead.types";
import { exportToCSV } from "../utils/exportCSV";
import { deleteLead } from "../api/leads.api";
import { getUserRole } from "../utils/token";
import ThemeToggle from "../components/common/ThemeToggle";

const Dashboard = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [filters, setFilters] = useState({
    search: "",
    status: "",
    source: "",
    sort: "latest",
  });

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this lead?"
    );

    if (!confirmDelete) return;

    try {
      await deleteLead(id);
      fetchLeads();
    } catch (err) {
      console.log("Delete failed:", err);
    }
  };

  // modal state
  const [openModal, setOpenModal] = useState(false);
  const [editLead, setEditLead] = useState<Lead | null>(null);
  const [saving, setSaving] = useState(false);

  // ROLE
  const role = getUserRole();

  const fetchLeads = async () => {
    setLoading(true);

    const data = await getLeads({
      page,
      limit: 10,
      ...filters,
    });

    setLeads(data.leads || []);
    setTotalPages(data.totalPages || 1);

    setLoading(false);
  };

  useEffect(() => {
    fetchLeads();
  }, [filters, page]);

  // CREATE / UPDATE
  const handleSubmit = async (data: any) => {
    console.log("🔥 SUBMIT FIRED");
    console.log("DATA:", data);
    console.log("EDIT ID:", editLead?._id);

    try {
      setSaving(true);

if (!editLead) return;

const res = await updateLead(editLead._id, data);
      console.log("UPDATE RESPONSE:", res);

      setOpenModal(false);
      setEditLead(null);

      fetchLeads();
    } catch (err) {
      console.log("UPDATE ERROR:", err);
      alert("Update failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-100 via-gray-100 to-purple-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800 p-6 transition-all duration-500">

      {/* Background Effects */}
      <div className="absolute top-[-100px] left-[-100px] w-80 h-80 bg-blue-400/20 dark:bg-blue-700/20 rounded-full blur-3xl"></div>

      <div className="absolute bottom-[-100px] right-[-100px] w-80 h-80 bg-pink-400/20 dark:bg-purple-700/20 rounded-full blur-3xl"></div>

      {/* Main Content */}
      <div className="relative z-10">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
              Smart Leads Dashboard
            </h1>

            <p className="text-gray-600 dark:text-gray-300 mt-1">
              Manage and track your leads efficiently
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">

            <ThemeToggle />

            {role === "Admin" && (
              <button
                onClick={() => exportToCSV(leads)}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl shadow-lg transition-all duration-300 hover:scale-[1.02]"
              >
                Export CSV
              </button>
            )}

            {role === "Admin" && (
              <button
                onClick={() => {
                  setEditLead(null);
                  setOpenModal(true);
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl shadow-lg transition-all duration-300 hover:scale-[1.02]"
              >
                + Add Lead
              </button>
            )}

          </div>
        </div>

        {/* FILTERS */}
        <div className="mb-6 bg-white/60 dark:bg-gray-800/40 backdrop-blur-xl border border-white/20 dark:border-gray-700/40 p-4 rounded-2xl shadow-xl transition-all duration-300">
          <LeadFilters
            onChange={(f) => {
              setFilters(f);
              setPage(1);
            }}
          />
        </div>

        {/* TABLE */}
        <div className="bg-white/60 dark:bg-gray-800/40 backdrop-blur-xl border border-white/20 dark:border-gray-700/40 rounded-2xl shadow-2xl overflow-hidden transition-all duration-300">

          {loading ? (
            <div className="p-6 text-gray-700 dark:text-gray-300">
              Loading...
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">

                <thead className="bg-gray-200/60 dark:bg-gray-700/50 text-gray-800 dark:text-white">
  <tr>
    <th className="p-4 text-left">Name</th>
    <th className="text-left">Email</th>
    <th className="text-left">Status</th>
    <th className="text-left">Source</th>

    {/* ✅ ONLY SHOW HEADER FOR ADMIN */}
    {role === "Admin" && (
      <th className="text-left">Actions</th>
    )}
  </tr>
</thead>

<tbody>
  {leads.map((lead) => (
    <tr
      key={lead._id}
      className="border-t border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-white/40 dark:hover:bg-gray-700/30 transition-all duration-200"
    >
      <td className="p-4 font-medium">{lead.name}</td>
      <td>{lead.email}</td>

      <td>
        <span className="px-3 py-1 rounded-full text-sm bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300">
          {lead.status}
        </span>
      </td>

      <td>{lead.source}</td>

      {/* ✅ ONLY ADMIN SEE ACTIONS CELL */}
      {role === "Admin" && (
        <td className="flex gap-3 p-4">

          <button
            onClick={() => {
              setEditLead(lead);
              setOpenModal(true);
            }}
            className="text-blue-600 dark:text-blue-400 hover:underline transition"
          >
            Edit
          </button>

          <button
            onClick={() => handleDelete(lead._id)}
            className="text-red-600 dark:text-red-400 hover:underline transition"
          >
            Delete
          </button>

        </td>
      )}

    </tr>
  ))}
</tbody>

              </table>
            </div>
          )}
        </div>

        {/* PAGINATION */}
        <div className="flex items-center justify-center gap-4 mt-6">

          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-4 py-2 rounded-xl bg-white/60 dark:bg-gray-800/50 text-gray-800 dark:text-white border border-gray-200 dark:border-gray-700 disabled:opacity-50 transition-all duration-300 hover:scale-[1.02]"
          >
            Prev
          </button>

          <span className="text-gray-700 dark:text-gray-300 font-medium">
            {page} / {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="px-4 py-2 rounded-xl bg-white/60 dark:bg-gray-800/50 text-gray-800 dark:text-white border border-gray-200 dark:border-gray-700 disabled:opacity-50 transition-all duration-300 hover:scale-[1.02]"
          >
            Next
          </button>

        </div>

        {/* MODAL */}
        {openModal && role === "Admin" && (
          <LeadForm
            initialData={editLead || undefined}
            onClose={() => {
              setOpenModal(false);
              setEditLead(null);
            }}
            onSubmit={handleSubmit}
            loading={saving}
          />
        )}

      </div>
    </div>
  );
};

export default Dashboard;