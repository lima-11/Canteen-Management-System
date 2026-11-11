import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogIn, Utensils } from "lucide-react";
import { useAuth } from "./context/AuthContext";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const submit = (e) => {
    e.preventDefault();
    const result = login(form.email, form.password);
    if (!result.success) {
      setError(result.message);
      return;
    }
    navigate(result.user.role === "admin" ? "/admin" : "/");
  };
  return (
    <div className="mx-auto grid max-w-4xl overflow-hidden rounded-3xl bg-white shadow-sm md:grid-cols-2">
      <div className="hidden bg-emerald-800 p-10 text-white md:block">
        <Utensils size={38} />
        <h1 className="mt-10 text-3xl font-black">Welcome back!</h1>
        <p className="mt-3 leading-7 text-emerald-100">
          Sign in to order your favourite campus food.
        </p>
      </div>
      <form onSubmit={submit} className="p-7 sm:p-10">
        <LogIn className="text-emerald-700" size={30} />
        <h2 className="mt-4 text-2xl font-black">Login</h2>
        <p className="mt-1 text-sm text-slate-500">
          Enter your account details.
        </p>
        {error && (
          <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
            {error}
          </p>
        )}
        <label className="mt-6 block text-sm font-semibold">
          Email
          <input
            required
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="mt-2 w-full rounded-xl border p-3 outline-none focus:border-emerald-500"
          />
        </label>
        <label className="mt-4 block text-sm font-semibold">
          Password
          <input
            required
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="mt-2 w-full rounded-xl border p-3 outline-none focus:border-emerald-500"
          />
        </label>
        <button className="mt-6 w-full rounded-xl bg-emerald-600 p-3 font-bold text-white hover:bg-emerald-700">
          Login
        </button>
        <p className="mt-5 text-center text-sm text-slate-500">
          New here?{" "}
          <Link className="font-bold text-emerald-700" to="/register">
            Create account
          </Link>
        </p>
        <p className="mt-4 text-xs text-slate-400">
          Demo admin: admin@canteenpro.com / Admin@123
        </p>
      </form>
    </div>
  );
}
