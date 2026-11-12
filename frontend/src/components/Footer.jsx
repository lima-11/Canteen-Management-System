import { Link } from "react-router-dom";
import logo from "../assets/Logo.png";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-gray-200 bg-white text-gray-600">

      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10">

        <div className="flex flex-col justify-between gap-8 md:flex-row">

          {/* Logo & Description */}
          <div>
            <Link to="/" className="inline-flex items-center gap-2.5">
              <img
                src={logo}
                alt="CanteenPro Logo"
                className="h-11 w-11 object-contain"
              />

              <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
                Canteen
                <span className="bg-gradient-to-r from-green-500 to-emerald-700 bg-clip-text text-transparent">
                  Pro.
                </span>
              </h2>
            </Link>

            <p className="mt-3 max-w-sm text-sm leading-6 text-gray-500">
              Fresh food. Easy ordering. Happy campus.
              Making university food ordering simple and convenient.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-base font-bold text-gray-900">
              Quick Links
            </h3>

            <div className="flex flex-col gap-3 text-sm">
              <Link to="/" className="transition hover:text-green-600">
                Home
              </Link>

              <Link to="/menu" className="transition hover:text-green-600">
                Food Menu
              </Link>

              <Link to="/about" className="transition hover:text-green-600">
                About Us
              </Link>

              <Link to="/contact" className="transition hover:text-green-600">
                Contact
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-base font-bold text-gray-900">
              Contact Us
            </h3>

            <p className="text-sm text-gray-500">
              University Campus Canteen
            </p>

            <p className="mt-2 text-sm text-gray-500">
              Fresh Food, Better Experience.
            </p>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-gray-200 pt-6 sm:flex-row">

          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} CanteenPro. All rights reserved.
          </p>

          <p className="text-xs font-medium text-green-600">
            Made for a Better Campus Experience.
          </p>

        </div>

      </div>
    </footer>
  );
}