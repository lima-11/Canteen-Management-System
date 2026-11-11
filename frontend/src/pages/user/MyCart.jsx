import { Link } from "react-router-dom";
import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  ShoppingCart,
  ShieldCheck,
} from "lucide-react";

import { useCart } from "../../context/CartContext";
import formatCurrency from "../../utils/formatCurrency";

export default function MyCart() {
  const { cart, updateQuantity, removeFromCart, total } = useCart();

  const totalItems = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  if (!cart.length) {
    return (
      <div className="mx-auto max-w-2xl rounded-3xl border border-slate-100 bg-white px-6 py-20 text-center shadow-sm">
        <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-emerald-50 text-emerald-600">
          <ShoppingBag size={36} />
        </div>

        <h1 className="mt-6 text-2xl font-black text-slate-900">
          Your cart is empty
        </h1>

        <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
          Looks like you haven't added anything to your cart yet.
          Explore our delicious food menu and find something you love.
        </p>

        <Link
          to="/menu"
          className="mt-7 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 font-bold text-white shadow-sm transition hover:bg-emerald-700"
        >
          Explore Food Menu
          <ArrowRight size={18} />
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl">

      {/* Header */}
      <div className="mb-8 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-bold uppercase tracking-widest text-emerald-600">
            Your Selection
          </p>

          <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-900">
            Shopping Cart
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Review your selected food items before checkout.
          </p>
        </div>

        <span className="w-fit rounded-full bg-emerald-50 px-4 py-2 text-sm font-bold text-emerald-700">
          {totalItems} {totalItems === 1 ? "Item" : "Items"}
        </span>
      </div>

      <div className="grid items-start gap-7 lg:grid-cols-[1fr_350px]">

        {/* Cart Items */}
        <section className="space-y-4">

          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-5 flex items-center gap-2 border-b border-slate-100 pb-4">
              <ShoppingCart size={20} className="text-emerald-600" />

              <h2 className="font-bold text-slate-900">
                Cart Items
              </h2>
            </div>

            <div className="space-y-6">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-wrap items-center gap-4 border-b border-slate-100 pb-6 last:border-0 last:pb-0"
                >
                  {/* Food Image */}
                  <div className="h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-slate-100">
                    <img
                      src={`/Images/${item.image}`}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  {/* Food Details */}
                  <div className="min-w-0 flex-1">
                    <h3 className="font-bold text-slate-900">
                      {item.name}
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      {formatCurrency(item.price)} / item
                    </p>

                    <p className="mt-2 font-bold text-emerald-700">
                      {formatCurrency(item.price * item.quantity)}
                    </p>
                  </div>

                  {/* Quantity */}
                  <div className="flex items-center gap-3 rounded-xl border border-slate-200 p-1">
                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.quantity - 1)
                      }
                      aria-label="Decrease quantity"
                      className="grid h-8 w-8 place-items-center rounded-lg text-slate-600 transition hover:bg-slate-100"
                    >
                      <Minus size={15} />
                    </button>

                    <span className="min-w-5 text-center text-sm font-bold text-slate-900">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.quantity + 1)
                      }
                      aria-label="Increase quantity"
                      className="grid h-8 w-8 place-items-center rounded-lg text-slate-600 transition hover:bg-emerald-50 hover:text-emerald-700"
                    >
                      <Plus size={15} />
                    </button>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    aria-label={`Remove ${item.name}`}
                    className="grid h-10 w-10 place-items-center rounded-xl text-red-500 transition hover:bg-red-50"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <Link
            to="/menu"
            className="inline-flex items-center gap-2 text-sm font-bold text-emerald-700 transition hover:text-emerald-800"
          >
            <ArrowRight className="rotate-180" size={17} />
            Continue Shopping
          </Link>
        </section>

        {/* Order Summary */}
        <aside className="sticky top-24 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-black text-slate-900">
            Order Summary
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Review your order details.
          </p>

          <div className="mt-6 space-y-4 text-sm">
            <div className="flex justify-between text-slate-500">
              <span>Subtotal ({totalItems} items)</span>
              <span className="font-semibold text-slate-800">
                {formatCurrency(total)}
              </span>
            </div>

            <div className="flex justify-between text-slate-500">
              <span>Delivery / Service Fee</span>
              <span className="font-semibold text-emerald-700">
                Free
              </span>
            </div>
          </div>

          <div className="mt-6 flex justify-between border-t border-slate-100 pt-5">
            <span className="font-bold text-slate-900">
              Total Amount
            </span>

            <span className="text-xl font-black text-emerald-700">
              {formatCurrency(total)}
            </span>
          </div>

          <Link
            to="/checkout"
            className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3.5 font-bold text-white shadow-sm transition hover:bg-emerald-700 active:scale-[0.98]"
          >
            Proceed to Checkout
            <ArrowRight size={18} />
          </Link>

          <div className="mt-5 flex items-center justify-center gap-2 text-xs text-slate-400">
            <ShieldCheck size={16} className="text-emerald-600" />
            Simple and secure demo checkout
          </div>
        </aside>
      </div>
    </div>
  );
}