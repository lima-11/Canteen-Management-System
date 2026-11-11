
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  User,
  Phone,
  MapPin,
  ShoppingBag,
  CheckCircle,
  ArrowLeft,
} from "lucide-react";

const PlaceOrder = () => {
  const [customer, setCustomer] = useState({
    name: "Rahim Ahmed",
    phone: "01712345678",
    studentId: "2024001",
  });

  const [orderPlaced, setOrderPlaced] = useState(false);

  // Demo Cart Data
  const cart = [
    {
      id: 1,
      name: "Chicken Burger",
      price: 150,
      quantity: 2,
    },
    {
      id: 2,
      name: "Cheese Pizza",
      price: 250,
      quantity: 1,
    },
  ];

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleChange = (e) => {
    setCustomer({
      ...customer,
      [e.target.name]: e.target.value,
    });
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setOrderPlaced(true);
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-5">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sm:p-12 text-center max-w-md w-full">

          <div className="w-20 h-20 rounded-full bg-green-50 text-green-600 flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={45} />
          </div>

          <h2 className="text-2xl font-extrabold text-gray-900">
            Order Placed Successfully!
          </h2>

          <p className="text-gray-500 text-sm mt-3 leading-6">
            Thank you for ordering from CanteenPro.
            Your order has been received successfully.
          </p>

          <div className="bg-green-50 rounded-xl p-4 mt-6">
            <p className="text-sm text-gray-500">Total Amount</p>
            <h3 className="text-2xl font-extrabold text-green-600 mt-1">
              ৳{total}
            </h3>
          </div>

          <Link
            to="/food-menu"
            className="block mt-6 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-bold transition"
          >
            Back to Food Menu
          </Link>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-5">

      <div className="max-w-5xl mx-auto">

        {/* Heading */}
        <div className="mb-8">
          <p className="text-sm font-bold text-green-600 uppercase">
            CanteenPro / Place Order
          </p>

          <h1 className="text-3xl font-extrabold text-gray-900 mt-2">
            Complete Your Order
          </h1>

          <p className="text-gray-500 mt-2">
            Provide your information and confirm your order.
          </p>
        </div>

        <form
          onSubmit={handlePlaceOrder}
          className="grid grid-cols-1 lg:grid-cols-3 gap-7"
        >

          {/* Customer Information */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100">

            <h2 className="text-xl font-bold text-gray-900 mb-7">
              Customer Information
            </h2>

            <div className="space-y-5">

              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-2">
                  Full Name
                </label>

                <div className="relative">
                  <User size={19} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                  <input
                    type="text"
                    name="name"
                    value={customer.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your name"
                    className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl bg-gray-50 outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/10"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-2">
                  Phone Number
                </label>

                <div className="relative">
                  <Phone size={19} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                  <input
                    type="tel"
                    name="phone"
                    value={customer.phone}
                    onChange={handleChange}
                    required
                    placeholder="Enter phone number"
                    className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl bg-gray-50 outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/10"
                  />
                </div>
              </div>

              {/* Student ID */}
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-2">
                  Student ID
                </label>

                <input
                  type="text"
                  name="studentId"
                  value={customer.studentId}
                  onChange={handleChange}
                  required
                  placeholder="Enter student ID"
                  className="w-full px-4 py-3.5 border border-gray-200 rounded-xl bg-gray-50 outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/10"
                />
              </div>

              {/* Pickup Method */}
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-2">
                  Pickup Location
                </label>

                <div className="relative">
                  <MapPin size={19} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                  <select
                    required
                    className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl bg-gray-50 outline-none focus:border-green-500"
                  >
                    <option value="Main Canteen">Main Canteen</option>
                    <option value="Campus Cafeteria">Campus Cafeteria</option>
                  </select>
                </div>
              </div>

              {/* Payment */}
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-2">
                  Payment Method
                </label>

                <div className="border border-green-200 bg-green-50 rounded-xl p-4">
                  <p className="font-bold text-green-700 text-sm">
                    Cash on Pickup
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Pay at the canteen when collecting your order.
                  </p>
                </div>
              </div>

            </div>

          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 h-fit">

            <div className="flex items-center gap-2 mb-6">
              <ShoppingBag size={21} className="text-green-600" />

              <h2 className="text-xl font-bold text-gray-900">
                Order Summary
              </h2>
            </div>

            <div className="space-y-5">

              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between gap-3"
                >
                  <div>
                    <h3 className="text-sm font-semibold text-gray-800">
                      {item.name}
                    </h3>

                    <p className="text-xs text-gray-500 mt-1">
                      Quantity: {item.quantity}
                    </p>
                  </div>

                  <p className="text-sm font-bold text-gray-800">
                    ৳{item.price * item.quantity}
                  </p>
                </div>
              ))}

            </div>

            <div className="border-t border-gray-100 mt-6 pt-5">

              <div className="flex justify-between mb-4 text-sm text-gray-500">
                <span>Subtotal</span>
                <span>৳{total}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="font-bold text-gray-900">
                  Total Amount
                </span>

                <span className="text-2xl font-extrabold text-green-600">
                  ৳{total}
                </span>
              </div>

            </div>

            <button
              type="submit"
              className="w-full mt-7 bg-green-600 hover:bg-green-700 text-white py-3.5 rounded-xl font-bold transition shadow-lg shadow-green-200/50"
            >
              Confirm & Place Order
            </button>

            <Link
              to="/my-cart"
              className="flex items-center justify-center gap-2 text-sm text-gray-500 hover:text-green-600 font-semibold mt-5"
            >
              <ArrowLeft size={16} />
              Back to Cart
            </Link>

          </div>

        </form>

      </div>
    </div>
  );
};

export default PlaceOrder;
