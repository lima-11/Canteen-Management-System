import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Download,
  CheckCircle2,
  Clock,
  Eye,
  ShoppingBag,
  Wallet,
} from "lucide-react";

import { readStorage, writeStorage } from "../../utils/storage";
import formatCurrency from "../../utils/formatCurrency";
import { downloadInvoice } from "../../utils/invoice";

export default function ManageOrders() {
  const [orders, setOrders] = useState(() =>
    readStorage("canteen_orders", [])
  );

  const updatePayment = (order) => {
    if (order.paymentStatus === "Paid") {
      downloadInvoice(order);
      return;
    }

    const updatedOrder = {
      ...order,
      paymentStatus: "Paid",
      paidAt: new Date().toISOString(),
    };

    const updatedOrders = orders.map((o) =>
      o.id === order.id ? updatedOrder : o
    );

    setOrders(updatedOrders);
    writeStorage("canteen_orders", updatedOrders);

    // Download receipt after payment confirmation
    downloadInvoice(updatedOrder);
  };

  const pendingPayments = orders.filter(
    (o) => o.paymentStatus !== "Paid"
  ).length;

  return (
    <div className="space-y-7">

      {/* Header */}
      <div>
        <p className="text-sm font-bold uppercase tracking-widest text-emerald-600">
          Order Management
        </p>

        <h1 className="mt-2 text-3xl font-black text-slate-900">
          Manage Orders
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Manage customer orders, verify payments and download receipts.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid gap-4 sm:grid-cols-3">

        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500">Total Orders</span>
            <ShoppingBag className="text-blue-600" />
          </div>
          <h2 className="mt-4 text-3xl font-black">{orders.length}</h2>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500">Pending Payments</span>
            <Clock className="text-amber-500" />
          </div>
          <h2 className="mt-4 text-3xl font-black">{pendingPayments}</h2>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500">Paid Orders</span>
            <Wallet className="text-emerald-600" />
          </div>
          <h2 className="mt-4 text-3xl font-black">
            {orders.length - pendingPayments}
          </h2>
        </div>

      </div>

      {/* Orders Table */}
      <section className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">

        <div className="border-b border-slate-100 px-6 py-5">
          <h2 className="text-lg font-black text-slate-900">
            Customer Orders
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Review orders and confirm customer payments.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] text-left text-sm">

            <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-6 py-4">Order</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Location</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Payment</th>
                <th className="px-6 py-4">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">

              {orders.map((order) => (
                <tr key={order.id} className="transition hover:bg-slate-50">

                  <td className="px-6 py-4">
                    <p className="font-bold text-slate-800">
                      {order.id}
                    </p>
                    <p className="mt-1 text-xs text-slate-400">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </td>

                  <td className="px-6 py-4">
                    <p className="font-semibold text-slate-800">
                      {order.customerName}
                    </p>
                    <p className="mt-1 text-xs text-slate-400">
                      {order.phone}
                    </p>
                  </td>

                  <td className="px-6 py-4">
                    <p className="font-semibold text-slate-700">
                      Table {order.tableNumber || "N/A"}
                    </p>
                    <p className="mt-1 text-xs text-slate-400">
                      Chair {order.chairNumber || "N/A"}
                    </p>
                  </td>

                  <td className="px-6 py-4 font-bold text-slate-900">
                    {formatCurrency(order.total)}
                  </td>

                  <td className="px-6 py-4">
                    {order.paymentStatus === "Paid" ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700">
                        <CheckCircle2 size={14} />
                        Paid
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1.5 text-xs font-bold text-amber-700">
                        <Clock size={14} />
                        Pending
                      </span>
                    )}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">

                      <Link
                        to={`/admin/orders/${order.id}`}
                        className="grid h-9 w-9 place-items-center rounded-lg bg-slate-100 text-slate-600 transition hover:bg-slate-200"
                        title="View order"
                      >
                        <Eye size={17} />
                      </Link>

                      <button
                        onClick={() => updatePayment(order)}
                        disabled={order.status === "Cancelled"}
                        className={`flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-bold transition disabled:cursor-not-allowed disabled:opacity-50 ${
                          order.paymentStatus === "Paid"
                            ? "bg-blue-50 text-blue-700 hover:bg-blue-100"
                            : "bg-emerald-600 text-white hover:bg-emerald-700"
                        }`}
                      >
                        <Download size={15} />

                        {order.paymentStatus === "Paid"
                          ? "Download Receipt"
                          : "Mark Paid & Download"}
                      </button>

                    </div>
                  </td>

                </tr>
              ))}

            </tbody>
          </table>
        </div>

        {orders.length === 0 && (
          <div className="py-16 text-center">
            <ShoppingBag size={35} className="mx-auto text-slate-300" />
            <h3 className="mt-4 font-bold text-slate-800">
              No orders found
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Customer orders will appear here.
            </p>
          </div>
        )}

      </section>
    </div>
  );
}