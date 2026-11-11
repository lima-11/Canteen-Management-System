import { Link } from "react-router-dom";
import { Utensils } from "lucide-react";
export default function Footer() {
  return <footer className="mt-16 bg-slate-950 text-slate-300"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-5 px-4 py-9 sm:flex-row sm:items-center sm:px-6 lg:px-8"><div><div className="flex items-center gap-2 text-xl font-black text-white"><Utensils className="text-emerald-400"/> CanteenPro</div><p className="mt-2 text-sm text-slate-400">Fresh food. Easy ordering. Happy campus.</p></div><div className="flex gap-5 text-sm"><Link to="/menu" className="hover:text-white">Menu</Link><Link to="/about" className="hover:text-white">About</Link><Link to="/contact" className="hover:text-white">Contact</Link></div><p className="text-xs text-slate-500">© {new Date().getFullYear()} CanteenPro</p></div></footer>;
}
