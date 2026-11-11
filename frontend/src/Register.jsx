import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserPlus } from "lucide-react";
import { useAuth } from "./context/AuthContext";
export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate();
  const submit = (e) => {
    e.preventDefault();
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    const result = register(form);
    if (!result.success) {
      setError(result.message);
      return;
    }
    navigate("/");
  };
  return (
    <div className="mx-auto max-w-xl rounded-3xl bg-white p-7 shadow-sm sm:p-10">
      <UserPlus size={32} className="text-emerald-700" />
      <h1 className="mt-4 text-2xl font-black">Create account</h1>
      <p className="mt-1 text-sm text-slate-500">
        Join CanteenPro and order with ease.
      </p>
      {error && (
        <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
          {error}
        </p>
      )}
      <form onSubmit={submit}>
        <label className="mt-5 block text-sm font-semibold">
          Full name
          <input
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="mt-2 w-full rounded-xl border p-3"
          />
        </label>
        <label className="mt-4 block text-sm font-semibold">
          Email
          <input
            required
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="mt-2 w-full rounded-xl border p-3"
          />
        </label>
        <label className="mt-4 block text-sm font-semibold">
          Password
          <input
            required
            minLength="6"
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="mt-2 w-full rounded-xl border p-3"
          />
        </label>
        <button className="mt-6 w-full rounded-xl bg-emerald-600 p-3 font-bold text-white hover:bg-emerald-700">
          Register
        </button>
      </form>
      <p className="mt-5 text-center text-sm text-slate-500">
        Already registered?{" "}
        <Link to="/login" className="font-bold text-emerald-700">
          Login
        </Link>
      </p>
    </div>
  );
}
