import { ShoppingBag, Users, Wallet, TrendingUp, ArrowUpRight } from "lucide-react";
import { readStorage } from "../../utils/storage";
import formatCurrency from "../../utils/formatCurrency";

export default function AdminDashboard() {
  const orders = readStorage("canteen_orders", []);
  const users = readStorage("canteen_users", []);

  const revenue = orders
    .filter((o) => o.status !== "Cancelled")
    .reduce((sum, o) => sum + o.total, 0);

  const stats = [
    {
      label: "Total Orders",
      value: orders.length,
      icon: ShoppingBag,
      color: "bg-blue-50 text-blue-600",
    },
    {
      label: "Registered Users",
      value: users.filter((u) => u.role !== "admin").length,
      icon: Users,
      color: "bg-purple-50 text-purple-600",
    },
    {
      label: "Total Revenue",
      value: formatCurrency(revenue),
      icon: Wallet,
      color: "bg-emerald-50 text-emerald-600",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600">
            Overview
          </p>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-900">
            Dashboard
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Welcome back! Here's what's happening with your canteen.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-2.5 text-sm font-semibold text-emerald-700">
          <TrendingUp size={17} />
          Management Overview
        </div>
      </div>

      {/* Statistics */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div
            key={label}
            className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <div className={`grid h-12 w-12 place-items-center rounded-xl ${color}`}>
                <Icon size={23} />
              </div>
              <ArrowUpRight size={19} className="text-slate-300" />
            </div>

            <p className="mt-5 text-sm font-medium text-slate-500">
              {label}
            </p>

            <h2 className="mt-1 text-3xl font-black tracking-tight text-slate-900">
              {value}
            </h2>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <section className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Recent Orders
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Latest customer orders and their details.
            </p>
          </div>

          <span className="rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700">
            {orders.length} Orders
          </span>
        </div>

        {orders.length > 0 ? (
          <div className="divide-y divide-slate-100">
            {orders.slice(0, 5).map((order) => (
              <div
                key={order.id}
                className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 transition hover:bg-slate-50"
              >
                <div className="min-w-0">
                  <p className="truncate font-bold text-slate-800">
                    {order.customerName}
                  </p>
                  <p className="mt-1 text-xs text-slate-400">
                    {order.id} · {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold ${
                      order.status === "Completed"
                        ? "bg-emerald-50 text-emerald-700"
                        : order.status === "Cancelled"
                        ? "bg-red-50 text-red-600"
                        : order.status === "Ready"
                        ? "bg-blue-50 text-blue-600"
                        : "bg-amber-50 text-amber-700"
                    }`}
                  >
                    {order.status}
                  </span>

                  <p className="min-w-20 text-right font-bold text-slate-900">
                    {formatCurrency(order.total)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="px-6 py-16 text-center">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-slate-50 text-slate-400">
              <ShoppingBag size={26} />
            </div>
            <h3 className="mt-4 font-bold text-slate-800">
              No orders yet
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              New customer orders will appear here.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}