import { useEffect, useState } from "react";

export interface LeadFiltersProps {
  onChange: (filters: {
    search: string;
    status: string;
    source: string;
    sort: string;
  }) => void;
}

const LeadFilters: React.FC<LeadFiltersProps> = ({ onChange }) => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [source, setSource] = useState("");
  const [sort, setSort] = useState("latest");

  useEffect(() => {
    const timer = setTimeout(() => {
      onChange({ search, status, source, sort });
    }, 500);

    return () => clearTimeout(timer);
  }, [search, status, source, sort]);

  return (
    <div className="bg-white/70 dark:bg-gray-800/40 backdrop-blur-xl border border-white/20 dark:border-gray-700/40 p-5 rounded-2xl shadow-xl transition-all duration-500">

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

        {/* SEARCH */}
        <input
          placeholder="Search name/email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2.5 rounded-xl bg-white/70 dark:bg-gray-700/60 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-300 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-300"
        />

        {/* STATUS */}
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full p-2.5 rounded-xl bg-white/70 dark:bg-gray-700/60 text-gray-800 dark:text-white border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-300"
        >
          <option value="">All Status</option>
          <option value="New">New</option>
          <option value="Contacted">Contacted</option>
          <option value="Qualified">Qualified</option>
          <option value="Lost">Lost</option>
        </select>

        {/* SOURCE */}
        <select
          value={source}
          onChange={(e) => setSource(e.target.value)}
          className="w-full p-2.5 rounded-xl bg-white/70 dark:bg-gray-700/60 text-gray-800 dark:text-white border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-300"
        >
          <option value="">All Sources</option>
          <option value="Website">Website</option>
          <option value="Instagram">Instagram</option>
          <option value="Referral">Referral</option>
        </select>

        {/* SORT */}
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="w-full p-2.5 rounded-xl bg-white/70 dark:bg-gray-700/60 text-gray-800 dark:text-white border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-300"
        >
          <option value="latest">Latest</option>
          <option value="oldest">Oldest</option>
        </select>

      </div>
    </div>
  );
};

export default LeadFilters;