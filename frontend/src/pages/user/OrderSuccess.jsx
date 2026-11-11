import { Link, useParams } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
export default function OrderSuccess() {
  const { id } = useParams();
  return (
    <div className="mx-auto max-w-xl rounded-3xl bg-white p-10 text-center shadow-sm">
      <CheckCircle2 size={58} className="mx-auto text-emerald-600" />
      <h1 className="mt-5 text-3xl font-black">Order placed!</h1>
      <p className="mt-2 text-slate-500">
        Your order ID is <strong>{id}</strong>.
      </p>
      <div className="mt-7 flex justify-center gap-3">
        <Link
          to="/orders"
          className="rounded-xl bg-emerald-600 px-5 py-3 font-bold text-white"
        >
          Track orders
        </Link>
        <Link
          to="/menu"
          className="rounded-xl bg-slate-100 px-5 py-3 font-bold"
        >
          Order more
        </Link>
      </div>
    </div>
  );
}
