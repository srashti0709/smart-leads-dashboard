import { useEffect, useState } from "react";
import type { Lead } from "../../types/lead.types";

interface Props {
  onSubmit: (data: {
    name: string;
    email: string;
    status: Lead["status"];
    source: Lead["source"];
  }) => void;

  onClose: () => void;
  initialData?: Lead | null;
  loading?: boolean;
}

const LeadForm: React.FC<Props> = ({
  onSubmit,
  onClose,
  initialData,
  loading,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Lead["status"]>("New");
  const [source, setSource] = useState<Lead["source"]>("Website");

  useEffect(() => {
    console.log("INITIAL DATA:", initialData);
    if (initialData) {
      setName(initialData.name);
      setEmail(initialData.email);
      setStatus(initialData.status);
      setSource(initialData.source);
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email) {
      alert("Name and Email are required");
      return;
    }

    onSubmit({ name, email, status, source });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fade-in">

      {/* MODAL CARD */}
      <div className="w-[420px] max-w-[90%] rounded-3xl p-6 bg-white/70 dark:bg-gray-800/40 backdrop-blur-2xl border border-white/20 dark:border-gray-700/40 shadow-2xl transition-all duration-500 hover:scale-[1.01]">

        {/* HEADER */}
        <h2 className="text-2xl font-bold mb-1 text-gray-800 dark:text-white">
          {initialData ? "Update Lead" : "Create Lead"}
        </h2>

        <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">
          Fill in the details below
        </p>

        {/* FORM */}
        <form  onSubmit={(e) => {
    console.log("FORM SUBMIT TRIGGERED"); // 🔥 MUST PRINT
    handleSubmit(e);
  }}
  className="space-y-3">

          {/* NAME */}
          <input
            className="w-full p-3 rounded-xl bg-white/70 dark:bg-gray-700/60 text-gray-800 dark:text-white border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-300 placeholder-gray-500 dark:placeholder-gray-300"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          {/* EMAIL */}
          <input
            className="w-full p-3 rounded-xl bg-white/70 dark:bg-gray-700/60 text-gray-800 dark:text-white border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-300 placeholder-gray-500 dark:placeholder-gray-300"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* STATUS */}
          <select
            className="w-full p-3 rounded-xl bg-white/70 dark:bg-gray-700/60 text-gray-800 dark:text-white border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-300"
            value={status}
            onChange={(e) => setStatus(e.target.value as Lead["status"])}
          >
            <option>New</option>
            <option>Contacted</option>
            <option>Qualified</option>
            <option>Lost</option>
          </select>

          {/* SOURCE */}
          <select
            className="w-full p-3 rounded-xl bg-white/70 dark:bg-gray-700/60 text-gray-800 dark:text-white border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-300"
            value={source}
            onChange={(e) => setSource(e.target.value as Lead["source"])}
          >
            <option>Website</option>
            <option>Instagram</option>
            <option>Referral</option>
          </select>

          {/* BUTTONS */}
          <div className="flex justify-end gap-3 mt-6">

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:scale-[1.02] transition-all duration-200"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20 transition-all duration-300 active:scale-[0.98] disabled:opacity-60"
            >
              {loading ? "Saving..." : "Save"}
            </button>

          </div>

        </form>

      </div>
    </div>
  );
};

export default LeadForm;