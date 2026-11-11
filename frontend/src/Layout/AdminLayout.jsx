import { NavLink, Outlet } from "react-router-dom";
import {
  LayoutDashboard,
 
  ClipboardList,
  Users,
  ArrowLeft,
} from "lucide-react";
const items = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
  
  { to: "/admin/orders", label: "Manage orders", icon: ClipboardList },
  { to: "/admin/users", label: "Manage users", icon: Users },
];
export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-slate-50 md:flex">
      <aside className="w-full border-b bg-white p-5 md:min-h-screen md:w-64 md:border-b-0 md:border-r">
        <div className="mb-7 text-xl font-black text-emerald-700">
          CanteenPro Admin
        </div>
        <nav className="flex flex-wrap gap-2 md:flex-col">
          {items.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold ${isActive ? "bg-emerald-50 text-emerald-700" : "text-slate-600 hover:bg-slate-50"}`
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
          <NavLink
            to="/"
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50"
          >
            <ArrowLeft size={18} /> Back to website
          </NavLink>
        </nav>
      </aside>
      <main className="min-w-0 flex-1 p-4 sm:p-7 lg:p-9">
        <Outlet />
      </main>
    </div>
  );
}
