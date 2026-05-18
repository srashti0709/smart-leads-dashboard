import type { Lead } from "../types/lead.types";

export const exportToCSV = (leads: Lead[]) => {
  if (!leads || leads.length === 0) {
    alert("No data to export");
    return;
  }

  const headers = ["Name", "Email", "Status", "Source", "Created At"];

  const rows = leads.map((lead) => [
    lead.name,
    lead.email,
    lead.status,
    lead.source,
    new Date(lead.createdAt).toLocaleString(),
  ]);

  const csvContent =
    [headers, ...rows]
      .map((row) => row.map((item) => `"${item}"`).join(","))
      .join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.setAttribute("download", `leads_export_${Date.now()}.csv`);

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};