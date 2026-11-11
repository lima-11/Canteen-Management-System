import { Link } from "react-router-dom";
import { ArrowRight, BadgeCheck, ShoppingBag, Users } from "lucide-react";
import Banner from "../../components/Banner";
import FoodCard from "../../components/FoodCard";
import { foods } from "../../data/foods";
export default function Home() {
  return (
    <div>
      <Banner />
      <section className="py-14">
        <div className="mb-7 flex items-end justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-emerald-700">
              Student favourites
            </p>
            <h2 className="mt-2 text-3xl font-black">Popular items</h2>
          </div>
          <Link
            to="/menu"
            className="flex items-center gap-2 text-sm font-bold text-emerald-700"
          >
            View menu <ArrowRight size={17} />
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {foods
            .filter((f) => f.popular)
            .slice(0, 4)
            .map((food) => (
              <FoodCard key={food.id} food={food} />
            ))}
        </div>
      </section>
      <section className="grid gap-4 rounded-3xl bg-white p-7 shadow-sm sm:grid-cols-3">
        {[
          {
            icon: ShoppingBag,
            title: "Easy ordering",
            desc: "Choose meals and add them to your cart.",
          },
          {
            icon: BadgeCheck,
            title: "Simple checkout",
            desc: "Place and track your local demo orders.",
          },
          {
            icon: Users,
            title: "Campus focused",
            desc: "A convenient canteen experience for students.",
          },
        ].map(({ icon: Icon, title, desc }) => (
          <div key={title} className="flex gap-4">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-emerald-50 text-emerald-700">
              <Icon />
            </div>
            <div>
              <h3 className="font-bold">{title}</h3>
              <p className="mt-1 text-sm leading-6 text-slate-500">{desc}</p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
