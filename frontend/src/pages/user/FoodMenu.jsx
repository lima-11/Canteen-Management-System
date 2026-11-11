import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import FoodCard from "../../components/FoodCard";
import { foods } from "../../data/foods";
import { categories } from "../../data/categories";
export default function FoodMenu() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const menu = useMemo(() => {
    const saved = JSON.parse(localStorage.getItem("canteen_foods") || "null");
    const list = saved || foods;
    return list.filter(
      (f) =>
        f.available !== false &&
        (category === "All" || f.category === category) &&
        f.name.toLowerCase().includes(query.toLowerCase()),
    );
  }, [query, category]);
  return (
    <section>
      <p className="text-sm font-bold uppercase tracking-widest text-emerald-700">
        Explore our food
      </p>
      <h1 className="mt-2 text-3xl font-black">Food Menu</h1>
      <div className="mt-6 flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-3.5 text-slate-400"
            size={18}
          />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search food..."
            className="w-full rounded-xl border bg-white py-3 pl-10 pr-4 outline-none focus:border-emerald-500"
          />
        </div>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-xl border bg-white px-4 py-3"
        >
          {categories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </div>
      <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {menu.map((food) => (
          <FoodCard key={food.id} food={food} />
        ))}
      </div>
      {menu.length === 0 && (
        <p className="py-16 text-center text-slate-500">No food items found.</p>
      )}
    </section>
  );
}
