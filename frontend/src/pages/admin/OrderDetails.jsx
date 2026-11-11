import { Link, useParams } from "react-router-dom";
import { readStorage } from "../../utils/storage";
import formatCurrency from "../../utils/formatCurrency";
import { downloadInvoice } from "../../utils/invoice";
export default function OrderDetails() {
  const { id } = useParams();
  const order = readStorage("canteen_orders", []).find((o) => o.id === id);
  if (!order)
    return (
      <div>
        Order not found.{" "}
        <Link to="/admin/orders" className="text-emerald-700">
          Back
        </Link>
      </div>
    );
  return (
    <div className="max-w-2xl rounded-2xl bg-white p-7 shadow-sm">
      <Link to="/admin/orders" className="text-sm font-bold text-emerald-700">
        ← All orders
      </Link>
      <h1 className="mt-4 text-2xl font-black">Order {order.id}</h1>
      <p className="mt-2 text-sm text-slate-500">
        {order.customerName} · {order.phone}
      </p>
      <p className="mt-1 text-sm text-slate-500">{order.address}</p>
      <div className="my-6 divide-y">
        {order.items.map((i) => (
          <div key={i.id} className="flex justify-between py-3 text-sm">
            <span>
              {i.name} × {i.quantity}
            </span>
            <strong>{formatCurrency(i.price * i.quantity)}</strong>
          </div>
        ))}
      </div>
      <div className="flex justify-between border-t pt-4 text-lg font-black">
        <span>Total</span>
        <span className="text-emerald-700">{formatCurrency(order.total)}</span>
      </div>
      <p className="mt-4 text-sm">
        Status: <strong>{order.status}</strong> · Payment:{" "}
        <strong>{order.paymentStatus}</strong>
      </p>
      <button
  onClick={() => downloadInvoice(order)}
  className="mt-6 flex items-center justify-center gap-2 rounded-xl border border-black bg-white px-6 py-3 font-bold text-black transition-all duration-200 hover:bg-black hover:text-white active:scale-95"
>
  Download Invoice
</button>
    </div>
  );
}
