import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MapPin,
  Armchair,
  ShoppingBag,
  CheckCircle2,
  CreditCard,
  Phone,
} from "lucide-react";

import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import formatCurrency from "../../utils/formatCurrency";

export default function Checkout() {
  const { cart, total, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [method, setMethod] = useState("Cash on delivery");
  const [phone, setPhone] = useState("");
  const [tableNumber, setTableNumber] = useState("");
  const [chairNumber, setChairNumber] = useState("");

  const tables = Array.from({ length: 10 }, (_, i) => i + 1);
  const chairs = [1, 2, 3, 4];

  const totalItems = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const submit = (e) => {
    e.preventDefault();

    if (!cart.length || !tableNumber || !chairNumber || !phone.trim()) {
      return;
    }

    const orders = JSON.parse(
      localStorage.getItem("canteen_orders") || "[]"
    );

    const order = {
      id: `CP-${Date.now()}`,
      userId: user.id,
      customerName: user.name,
      phone,
      tableNumber,
      chairNumber,
      location: `Table ${tableNumber}, Chair ${chairNumber}`,
      items: cart,
      total,
      paymentMethod: method,
      paymentStatus: "Pending",
      status: "Pending",
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem(
      "canteen_orders",
      JSON.stringify([order, ...orders])
    );

    clearCart();
    navigate(`/order-success/${order.id}`);
  };

  if (!cart.length) {
    return (
      <div className="mx-auto max-w-xl rounded-3xl border border-slate-100 bg-white px-6 py-16 text-center shadow-sm">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-50 text-emerald-600">
          <ShoppingBag size={32} />
        </div>

        <h2 className="mt-5 text-xl font-black text-slate-900">
          Your cart is empty
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          Add food items before proceeding to checkout.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl">

      {/* Header */}
      <div className="mb-8">
        <p className="text-sm font-bold uppercase tracking-widest text-emerald-600">
          Almost There
        </p>

        <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-900">
          Checkout
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Confirm your contact information and choose your seating location.
        </p>
      </div>

      <form
        onSubmit={submit}
        className="grid items-start gap-7 lg:grid-cols-[1fr_360px]"
      >

        {/* Left Section */}
        <div className="space-y-6">

          {/* Contact Information */}
          <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-emerald-50 text-emerald-700">
                <Phone size={21} />
              </div>

              <div>
                <h2 className="font-bold text-slate-900">
                  Contact Information
                </h2>

                <p className="text-xs text-slate-500">
                  Enter your contact number.
                </p>
              </div>
            </div>

            <label className="mt-6 block text-sm font-semibold text-slate-700">
              Phone Number

              <input
                required
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="01XXXXXXXXX"
                className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-50"
              />
            </label>
          </section>

          {/* Table Selection */}
          <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-emerald-50 text-emerald-700">
                <MapPin size={21} />
              </div>

              <div>
                <h2 className="font-bold text-slate-900">
                  Choose Your Table
                </h2>

                <p className="text-xs text-slate-500">
                  Select one of the 10 canteen tables.
                </p>
              </div>
            </div>

            {/* Table Grid */}
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-5">
              {tables.map((table) => (
                <button
                  key={table}
                  type="button"
                  onClick={() => {
                    setTableNumber(table);
                    setChairNumber("");
                  }}
                  className={`rounded-xl border p-4 text-center transition ${
                    tableNumber === table
                      ? "border-emerald-600 bg-emerald-50 text-emerald-700 ring-2 ring-emerald-100"
                      : "border-slate-200 bg-white text-slate-600 hover:border-emerald-400 hover:bg-emerald-50/40"
                  }`}
                >
                  <span className="block text-[11px] font-bold tracking-widest">
                    TABLE
                  </span>

                  <span className="mt-1 block text-2xl font-black">
                    {String(table).padStart(2, "0")}
                  </span>

                  {tableNumber === table && (
                    <CheckCircle2
                      size={16}
                      className="mx-auto mt-2"
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Chair Selection */}
            {tableNumber && (
              <div className="mt-8 border-t border-slate-100 pt-6">
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-blue-50 text-blue-600">
                    <Armchair size={20} />
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900">
                      Choose Your Chair
                    </h3>

                    <p className="text-xs text-slate-500">
                      Table {tableNumber} · 4 chairs
                    </p>
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {chairs.map((chair) => (
                    <button
                      key={chair}
                      type="button"
                      onClick={() => setChairNumber(chair)}
                      className={`rounded-xl border p-4 transition ${
                        chairNumber === chair
                          ? "border-emerald-600 bg-emerald-50 text-emerald-700 ring-2 ring-emerald-100"
                          : "border-slate-200 text-slate-600 hover:border-emerald-400 hover:bg-emerald-50/40"
                      }`}
                    >
                      <Armchair size={23} className="mx-auto" />

                      <span className="mt-2 block text-sm font-bold">
                        Chair {chair}
                      </span>

                      {chairNumber === chair && (
                        <span className="mt-1 block text-[10px] font-bold uppercase text-emerald-600">
                          Selected
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Selected Location */}
            {tableNumber && chairNumber && (
              <div className="mt-6 flex items-center gap-3 rounded-xl border border-emerald-100 bg-emerald-50 p-4">
                <CheckCircle2
                  size={22}
                  className="shrink-0 text-emerald-600"
                />

                <div>
                  <p className="text-xs font-semibold text-emerald-700">
                    YOUR SELECTED SEAT
                  </p>

                  <p className="mt-1 font-bold text-emerald-900">
                    Table {tableNumber} · Chair {chairNumber}
                  </p>
                </div>
              </div>
            )}
          </section>

          {/* Payment Method */}
          <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-purple-50 text-purple-600">
                <CreditCard size={21} />
              </div>

              <div>
                <h2 className="font-bold text-slate-900">
                  Payment Method
                </h2>

                <p className="text-xs text-slate-500">
                  Choose how you want to pay.
                </p>
              </div>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {["Cash on delivery", "Pay at canteen"].map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setMethod(option)}
                  className={`flex items-center gap-3 rounded-xl border p-4 text-left transition ${
                    method === option
                      ? "border-emerald-600 bg-emerald-50"
                      : "border-slate-200 hover:border-emerald-400"
                  }`}
                >
                  <span
                    className={`grid h-5 w-5 place-items-center rounded-full border ${
                      method === option
                        ? "border-emerald-600"
                        : "border-slate-300"
                    }`}
                  >
                    {method === option && (
                      <span className="h-2.5 w-2.5 rounded-full bg-emerald-600" />
                    )}
                  </span>

                  <span className="text-sm font-semibold text-slate-700">
                    {option}
                  </span>
                </button>
              ))}
            </div>
          </section>
        </div>

        {/* Right Section - Order Summary */}
        <aside className="sticky top-24 h-fit rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-black text-slate-900">
            Order Summary
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Your selected food items.
          </p>

          <div className="mt-6 max-h-72 space-y-4 overflow-y-auto">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3"
              >
                <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-slate-100">
                  <img
                    src={`/Images/${item.image}`}
                    alt={item.name}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold text-slate-800">
                    {item.name}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Qty: {item.quantity}
                  </p>
                </div>

                <span className="text-sm font-bold text-slate-800">
                  {formatCurrency(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-6 space-y-3 border-t border-slate-100 pt-5 text-sm">
            <div className="flex justify-between text-slate-500">
              <span>Total Items</span>
              <span className="font-semibold text-slate-800">
                {totalItems}
              </span>
            </div>

            <div className="flex justify-between text-slate-500">
              <span>Service Fee</span>
              <span className="font-semibold text-emerald-700">
                Free
              </span>
            </div>
          </div>

          <div className="mt-5 flex justify-between border-t border-slate-100 pt-5">
            <span className="font-bold text-slate-900">
              Total Amount
            </span>

            <span className="text-xl font-black text-emerald-700">
              {formatCurrency(total)}
            </span>
          </div>

          <button
            type="submit"
            disabled={!tableNumber || !chairNumber || !phone.trim()}
            className="mt-7 w-full rounded-xl bg-emerald-600 py-3.5 font-bold text-white shadow-sm transition hover:bg-emerald-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            Confirm & Place Order
          </button>

          <p className="mt-4 text-center text-xs leading-5 text-slate-400">
            Please verify your table, chair and contact number before placing your order.
          </p>
        </aside>
      </form>
    </div>
  );
}