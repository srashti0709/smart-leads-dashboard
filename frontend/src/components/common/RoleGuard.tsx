import type { ReactNode } from "react";
import { getUserRole } from "../../utils/token";

interface Props {
  children: ReactNode;
  allowedRoles: ("Admin" | "Sales")[];
}

const RoleGuard = ({ children, allowedRoles }: Props) => {
  const role = getUserRole();

  if (!role || !allowedRoles.includes(role)) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-6 bg-gradient-to-br from-gray-100 via-white to-gray-200 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800 transition-all duration-500">

        {/* background glow */}
        <div className="absolute w-72 h-72 bg-red-400/20 dark:bg-red-600/10 blur-3xl rounded-full top-10 left-10"></div>
        <div className="absolute w-72 h-72 bg-blue-400/10 dark:bg-purple-600/10 blur-3xl rounded-full bottom-10 right-10"></div>

        <div className="relative text-center bg-white/70 dark:bg-gray-800/40 backdrop-blur-xl border border-white/20 dark:border-gray-700/40 shadow-2xl rounded-3xl p-10 max-w-md w-full transition-all duration-500 hover:scale-[1.02]">

          <div className="text-5xl mb-4">🚫</div>

          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            Access Denied
          </h2>

          <p className="text-gray-600 dark:text-gray-300 mt-2 text-sm">
            You don’t have permission to view this section.
          </p>

          <div className="mt-5 text-xs text-gray-500 dark:text-gray-400">
            Required role:{" "}
            <span className="font-semibold text-gray-700 dark:text-gray-200">
              {allowedRoles.join(" or ")}
            </span>
          </div>

          <div className="mt-6">
            <div className="inline-block px-4 py-1.5 rounded-full bg-red-100/80 dark:bg-red-900/30 text-red-600 dark:text-red-300 text-xs font-medium border border-red-200 dark:border-red-800">
              Current role: {role || "None"}
            </div>
          </div>

        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default RoleGuard;