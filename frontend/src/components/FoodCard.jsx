import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { useCart } from "../context/CartContext";
import formatCurrency from "../utils/formatCurrency";

export default function FoodCard({ food }) {
  const { addToCart } = useCart();

  return (
    <article className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">

      {/* Product Image */}
      <Link
        to={`/foods/${food.id}`}
        className="flex h-48 w-full items-center justify-center overflow-hidden rounded-t-2xl bg-slate-100 p-4"
      >
        <img
          src={`/Images/${food.image}`}
          alt={food.name}
          className={`${
            food.imageSize || "h-36 w-36"
          } max-h-full max-w-full object-contain transition-transform duration-300 hover:scale-105`}
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
      </Link>

      {/* Product Details */}
      <div className="p-4">

        <div className="mb-2 flex items-center justify-between gap-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
            {food.category}
          </span>

          <span className="font-bold text-emerald-700">
            {formatCurrency(food.price)}
          </span>
        </div>

        <Link
          to={`/foods/${food.id}`}
          className="text-lg font-bold text-slate-900 hover:text-emerald-700"
        >
          {food.name}
        </Link>

        <p className="mt-1 min-h-10 text-sm text-slate-500">
          {food.description}
        </p>

        <button
          onClick={() => addToCart(food)}
          disabled={food.available === false}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl 
bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white 
transition-all duration-200 ease-in-out
hover:bg-emerald-700 hover:shadow-md hover:-translate-y-0.5
active:scale-95 active:translate-y-0 active:shadow-sm
focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2
disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          <Plus size={17} />
          Add to cart
        </button>

      </div>
    </article>
  );
}