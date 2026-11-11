
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  UserRound,
  Mail,
  ShoppingBag,
  CheckCircle,
  Clock,
  Package,
  CalendarDays,
  ChevronRight,
  CreditCard,
  Utensils,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";
import { readStorage } from "../../utils/storage";
import formatCurrency from "../../utils/formatCurrency";

export default function MyProfile() {
  const { user, updateProfile } = useAuth();

  const [name, setName] = useState(user?.name || "");
  const [saved, setSaved] = useState(false);

  // Get all orders
  const allOrders = readStorage("canteen_orders", []);

  // Current user's orders only
  const orders = allOrders
    .filter((order) => {
      const userId = order.userId || order.customerId;
      const userEmail =
        order.userEmail ||
        order.customerEmail ||
        order.email;

      return (
        (userId && userId === user.id) ||
        (userEmail &&
          userEmail.toLowerCase() === user.email?.toLowerCase())
      );
    })
    .sort(
      (a, b) =>
        new Date(b.createdAt || 0) -
        new Date(a.createdAt || 0)
    );

  // Statistics
  const totalOrders = orders.length;

  const paidOrders = orders.filter(
    (order) =>
      order.paymentStatus?.toLowerCase() === "paid"
  ).length;

  const pendingOrders = orders.filter(
    (order) =>
      ["pending", "unpaid", "unpaid pending"].includes(
        order.paymentStatus?.toLowerCase()
      )
  ).length;

  const totalSpent = orders
    .filter(
      (order) =>
        order.paymentStatus?.toLowerCase() === "paid"
    )
    .reduce(
      (sum, order) => sum + Number(order.total || 0),
      0
    );

  // Update profile
  const submit = (e) => {
    e.preventDefault();

    if (!name.trim()) return;

    updateProfile({ name: name.trim() });
    setSaved(true);
  };

  // Date formatter
  const formatDate = (date) => {
    if (!date) return "Date unavailable";

    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatTime = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const paymentStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "paid":
        return "bg-green-50 text-green-700";

      case "pending":
      case "unpaid":
      case "unpaid pending":
        return "bg-amber-50 text-amber-700";

      case "failed":
        return "bg-red-50 text-red-700";

      default:
        return "bg-slate-100 text-slate-600";
    }
  };

  const orderStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "bg-green-50 text-green-700";

      case "pending":
        return "bg-amber-50 text-amber-700";

      case "cancelled":
        return "bg-red-50 text-red-700";

      default:
        return "bg-blue-50 text-blue-700";
    }
  };

  if (!user) return null;

  return (
    <div className="mx-auto max-w-6xl space-y-8">

      {/* PROFILE HEADER */}
      <section className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">

        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">

          <div className="grid h-20 w-20 shrink-0 place-items-center rounded-2xl bg-emerald-50 text-3xl font-black text-emerald-700">
            {user.name?.[0]?.toUpperCase()}
          </div>

          <div className="flex-1">
            <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
              My Account
            </p>

            <h1 className="mt-1 text-2xl font-black text-slate-900 sm:text-3xl">
              {user.name}
            </h1>

            <p className="mt-1 flex items-center gap-2 text-sm text-slate-500">
              <Mail size={16} />
              {user.email}
            </p>

            <span className="mt-3 inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold capitalize text-emerald-700">
              {user.role || "Customer"}
            </span>
          </div>

          <div className="rounded-2xl bg-slate-50 px-5 py-4">
            <p className="text-xs font-semibold text-slate-500">
              Total Paid Amount
            </p>

            <h2 className="mt-1 text-2xl font-black text-slate-900">
              {formatCurrency(totalSpent)}
            </h2>
          </div>

        </div>
      </section>

      {/* ORDER STATISTICS */}
      <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">

        {[
          {
            title: "Total Orders",
            value: totalOrders,
            icon: ShoppingBag,
          },
          {
            title: "Paid Orders",
            value: paidOrders,
            icon: CheckCircle,
          },
          {
            title: "Pending Payments",
            value: pendingOrders,
            icon: Clock,
          },
          {
            title: "Total Spent",
            value: formatCurrency(totalSpent),
            icon: CreditCard,
          },
        ].map(({ title, value, icon: Icon }) => (
          <div
            key={title}
            className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
              <Icon size={21} />
            </div>

            <p className="mt-4 text-sm font-medium text-slate-500">
              {title}
            </p>

            <h3 className="mt-1 text-xl font-black text-slate-900">
              {value}
            </h3>
          </div>
        ))}

      </section>

      {/* PROFILE EDIT */}
      <section className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">

        <div className="mb-6">
          <h2 className="text-xl font-black text-slate-900">
            Personal Information
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Manage your account information.
          </p>
        </div>

        <form onSubmit={submit} className="max-w-xl">

          <label className="block text-sm font-semibold text-slate-700">
            Full Name

            <input
              required
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setSaved(false);
              }}
              className="mt-2 w-full rounded-xl border border-slate-200 p-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            />
          </label>

          <label className="mt-5 block text-sm font-semibold text-slate-700">
            Email Address

            <input
              disabled
              value={user.email}
              className="mt-2 w-full cursor-not-allowed rounded-xl border border-slate-200 bg-slate-50 p-3 text-slate-500"
            />
          </label>

          <button
            type="submit"
            className="mt-6 rounded-xl bg-emerald-600 px-6 py-3 font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-emerald-700 active:scale-95"
          >
            Save Changes
          </button>

          {saved && (
            <span className="ml-3 text-sm font-semibold text-emerald-700">
              Profile updated successfully!
            </span>
          )}

        </form>
      </section>

      {/* ORDER HISTORY */}
      <section className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">

        <div className="mb-7 flex flex-wrap items-center justify-between gap-3">

          <div>
            <h2 className="text-2xl font-black text-slate-900">
              My Order History
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Track your orders and payment status.
            </p>
          </div>

          <Link
            to="/menu"
            className="flex items-center gap-2 text-sm font-bold text-emerald-700 transition hover:gap-3"
          >
            Order Food
            <ChevronRight size={17} />
          </Link>

        </div>

        {/* Empty State */}
        {orders.length === 0 ? (
          <div className="rounded-2xl bg-slate-50 px-5 py-14 text-center">

            <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-white text-slate-400">
              <Package size={30} />
            </div>

            <h3 className="mt-4 text-lg font-bold text-slate-800">
              No Orders Yet
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              You haven't placed any orders yet.
            </p>

            <Link
              to="/menu"
              className="mt-5 inline-flex rounded-xl bg-emerald-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-emerald-700 active:scale-95"
            >
              Explore Menu
            </Link>

          </div>
        ) : (

          <div className="space-y-5">

            {orders.map((order) => (

              <article
                key={order.id}
                className="overflow-hidden rounded-2xl border border-slate-200 transition hover:border-slate-300"
              >

                {/* Order Header */}
                <div className="flex flex-col gap-4 bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Order ID
                    </p>

                    <h3 className="mt-1 font-black text-slate-900">
                      #{order.id}
                    </h3>

                    <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-slate-500">

                      <span className="flex items-center gap-1">
                        <CalendarDays size={14} />
                        {formatDate(order.createdAt)}
                      </span>

                      <span className="flex items-center gap-1">
                        <Clock size={14} />
                        {formatTime(order.createdAt)}
                      </span>

                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">

                    <span
                      className={`rounded-full px-3 py-1.5 text-xs font-bold capitalize ${orderStyle(order.status)}`}
                    >
                      {order.status || "Processing"}
                    </span>

                    <span
                      className={`rounded-full px-3 py-1.5 text-xs font-bold capitalize ${paymentStyle(order.paymentStatus)}`}
                    >
                      Payment: {order.paymentStatus || "Pending"}
                    </span>

                  </div>

                </div>

                {/* Order Items */}
                <div className="p-4 sm:p-5">

                  <h4 className="mb-4 flex items-center gap-2 text-sm font-bold text-slate-800">
                    <Utensils size={17} />
                    Ordered Items
                  </h4>

                  <div className="overflow-x-auto">

                    <table className="w-full min-w-[420px] text-sm">

                      <thead>
                        <tr className="border-b border-slate-200 text-left text-xs uppercase tracking-wide text-slate-500">
                          <th className="pb-3 font-semibold">
                            Food Item
                          </th>

                          <th className="pb-3 text-center font-semibold">
                            Qty
                          </th>

                          <th className="pb-3 text-right font-semibold">
                            Price
                          </th>

                          <th className="pb-3 text-right font-semibold">
                            Subtotal
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {order.items?.map((item, index) => (
                          <tr
                            key={`${item.id}-${index}`}
                            className="border-b border-slate-100 last:border-0"
                          >
                            <td className="py-3 font-semibold text-slate-800">
                              {item.name}
                            </td>

                            <td className="py-3 text-center text-slate-600">
                              {item.quantity}
                            </td>

                            <td className="py-3 text-right text-slate-600">
                              {formatCurrency(item.price)}
                            </td>

                            <td className="py-3 text-right font-semibold text-slate-800">
                              {formatCurrency(
                                item.price * item.quantity
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>

                    </table>

                  </div>

                  {/* Order Footer */}
                  <div className="mt-5 flex flex-col gap-3 border-t border-slate-200 pt-4 sm:flex-row sm:items-center sm:justify-between">

                    <div className="text-sm text-slate-500">
                      <span className="font-semibold text-slate-700">
                        Payment Method:
                      </span>{" "}
                      {order.paymentMethod || "N/A"}
                    </div>

                    <div className="text-right">

                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Order Total
                      </p>

                      <p className="mt-1 text-xl font-black text-slate-900">
                        {formatCurrency(order.total)}
                      </p>

                    </div>

                  </div>

                </div>

              </article>

            ))}

          </div>

        )}

      </section>

    </div>
  );
}
