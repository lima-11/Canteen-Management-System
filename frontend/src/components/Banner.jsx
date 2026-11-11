
import { Link } from "react-router-dom";
import { ArrowRight, Utensils } from "lucide-react";
import bannerImg from "../assets/banner.png";

const Banner = () => {
  return (
    <section className="overflow-hidden bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">

        <div className="grid min-h-[520px] grid-cols-1 items-center gap-10 py-14 md:grid-cols-2 lg:gap-16">

          {/* Left Content */}
          <div className="order-2 space-y-6 text-center md:order-1 md:text-left">

            <span className="inline-flex items-center gap-2 rounded-full border border-green-100 bg-white px-4 py-2 text-sm font-semibold text-[#008236]">
              <Utensils size={16} />
              Smart Campus Food Ordering
            </span>

            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              Fresh Food,
              <span className="block text-[#008236]">
                Happy Moments.
              </span>
            </h1>

            <p className="mx-auto max-w-lg text-base leading-7 text-gray-500 sm:text-lg md:mx-0">
              Enjoy delicious meals without waiting in long queues. Explore your
              favorite food, order easily, and make every campus break special
              with CanteenPro.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2 md:justify-start">

              <Link
                to="/food-menu"
                className="group inline-flex items-center gap-2 rounded-xl bg-[#008236] px-7 py-3.5 font-bold text-white transition hover:bg-[#006b2c]"
              >
                View More
                <ArrowRight
                  size={19}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>

              <Link
                to="/about-us"
                className="rounded-xl border border-[#008236] bg-white px-7 py-3.5 font-bold text-[#008236] transition hover:bg-green-50"
              >
                About Us
              </Link>

            </div>
          </div>

          {/* Right Image */}
          <div className="order-1 flex justify-center md:order-2">
            <div className="w-full max-w-[520px]">
              <img
                src={bannerImg}
                alt="Delicious fresh food"
                className="block h-auto w-full object-contain"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Banner;

