import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  ShoppingCart,
  Menu,
  X,
  LogIn,
  UserPlus,
  UserRound,
  LogOut,
} from "lucide-react";

import logo from "../assets/Logo.png";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { count } = useCart();
  const { user, logout } = useAuth();

  const navLinks = [
    { name: "Home", path: "/", end: true },
    { name: "Food Menu", path: "/menu" },
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const linkStyle = ({ isActive }) =>
    `text-[15px] font-semibold transition-colors duration-300 ${
      isActive
        ? "text-green-600"
        : "text-gray-600 hover:text-green-600"
    }`;

  const closeMenu = () => setIsOpen(false);

  const handleLogout = () => {
    logout();
    closeMenu();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/95 backdrop-blur-xl">

      <nav className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">

        {/* Logo */}
        <Link
          to="/"
          onClick={closeMenu}
          className="flex shrink-0 items-center gap-2.5"
        >
          <img
            src={logo}
            alt="CanteenPro Logo"
            className="h-11 w-11 object-contain"
          />

          <h1 className="text-2xl font-extrabold tracking-tight text-gray-900">
            Canteen
            <span className="bg-gradient-to-r from-green-500 to-emerald-700 bg-clip-text text-transparent">
              Pro.
            </span>
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-9 md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.end}
              className={linkStyle}
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-2.5 md:flex">

          {/* Cart */}
          <Link
            to="/cart"
            aria-label={`Shopping Cart, ${count} items`}
            className="relative mr-2 flex h-10 w-10 items-center justify-center rounded-xl text-gray-600 transition hover:bg-green-50 hover:text-green-600"
          >
            <ShoppingCart size={21} />

            {count > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-green-600 px-1 text-[11px] font-bold text-white ring-2 ring-white">
                {count}
              </span>
            )}
          </Link>

          {/* Authentication Based Navigation */}
          {user ? (
            <>
              {/* My Profile */}
              <Link
                to="/profile"
                className="flex items-center gap-2 rounded-lg border border-green-600 px-4 py-2 text-sm font-semibold text-green-700 transition hover:bg-green-50"
              >
                <UserRound size={17} />
                My Profile
              </Link>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-red-600 active:scale-95"
              >
                <LogOut size={17} />
                Logout
              </button>
            </>
          ) : (
            <>
              {/* Login */}
              <Link
                to="/login"
                className="flex items-center gap-2 rounded-lg border border-green-600 px-4 py-2 text-sm font-semibold text-green-700 transition hover:bg-green-50"
              >
                <LogIn size={16} />
                Login
              </Link>

              {/* Register */}
              <Link
                to="/register"
                className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-green-700 active:scale-95"
              >
                <UserPlus size={16} />
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-gray-700 transition hover:bg-green-50 hover:text-green-600 md:hidden"
          aria-label="Toggle Menu"
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={23} /> : <Menu size={23} />}
        </button>

      </nav>

      {/* Mobile Navigation */}
      <div
        className={`overflow-hidden border-t border-gray-100 bg-white transition-all duration-300 md:hidden ${
          isOpen ? "max-h-[550px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="space-y-2 px-5 py-5">

          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.end}
              onClick={closeMenu}
              className={({ isActive }) =>
                `block rounded-xl px-4 py-3 text-sm font-semibold transition ${
                  isActive
                    ? "bg-green-50 text-green-600"
                    : "text-gray-600 hover:bg-green-50 hover:text-green-600"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}

          {/* Mobile Actions */}
          <div className="grid grid-cols-2 gap-2 pt-3">

            {/* Cart */}
            <Link
              to="/cart"
              onClick={closeMenu}
              className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 py-3 text-sm font-semibold text-gray-700 hover:border-green-500 hover:text-green-600"
            >
              <ShoppingCart size={17} />
              Cart ({count})
            </Link>

            {user ? (
              <>
                {/* My Profile */}
                <Link
                  to="/profile"
                  onClick={closeMenu}
                  className="flex items-center justify-center gap-2 rounded-lg border border-green-600 py-3 text-sm font-semibold text-green-700 hover:bg-green-50"
                >
                  <UserRound size={17} />
                  My Profile
                </Link>

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="col-span-2 flex items-center justify-center gap-2 rounded-lg bg-red-500 py-3 text-sm font-semibold text-white transition hover:bg-red-600 active:scale-95"
                >
                  <LogOut size={17} />
                  Logout
                </button>
              </>
            ) : (
              <>
                {/* Login */}
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="flex items-center justify-center gap-2 rounded-lg border border-green-600 py-3 text-sm font-semibold text-green-700 hover:bg-green-50"
                >
                  <LogIn size={16} />
                  Login
                </Link>

                {/* Register */}
                <Link
                  to="/register"
                  onClick={closeMenu}
                  className="flex items-center justify-center gap-2 rounded-lg bg-green-600 py-3 text-sm font-semibold text-white hover:bg-green-700"
                >
                  <UserPlus size={16} />
                  Register
                </Link>
              </>
            )}

          </div>
        </div>
      </div>

    </header>
  );
};

export default Navbar;