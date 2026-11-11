
import { useState } from "react";
import {
  Search,
  ShoppingBag,
  Clock,
  CheckCircle,
  ChefHat,
  Eye,
  Filter,
  X,
  ClipboardList,
} from "lucide-react";

const OrderList = () => {
  const [orders, setOrders] = useState([
    {
      id: "ORD-1001",
      customer: "Rahim Ahmed",
      email: "rahim@gmail.com",
      food: "Chicken Burger",
      quantity: 2,
      amount: 300,
      date: "Nov 05, 2026",
      status: "Pending",
    },
    {
      id: "ORD-1002",
      customer: "Karim Hasan",
      email: "karim@gmail.com",
      food: "Cheese Pizza",
      quantity: 1,
      amount: 350,
      date: "Nov 05, 2026",
      status: "Completed",
    },
    {
      id: "ORD-1003",
      customer: "Sakib Hossain",
      email: "sakib@gmail.com",
      food: "Fried Rice",
      quantity: 2,
      amount: 360,
      date: "Nov 05, 2026",
      status: "Preparing",
    },
    {
      id: "ORD-1004",
      customer: "Nusrat Jahan",
      email: "nusrat@gmail.com",
      food: "Chicken Sandwich",
      quantity: 1,
      amount: 120,
      date: "Nov 04, 2026",
      status: "Completed",
    },
    {
      id: "ORD-1005",
      customer: "Tanvir Islam",
      email: "tanvir@gmail.com",
      food: "Chicken Pasta",
      quantity: 2,
      amount: 440,
      date: "Nov 04, 2026",
      status: "Pending",
    },
    {
      id: "ORD-1006",
      customer: "Ayesha Rahman",
      email: "ayesha@gmail.com",
      food: "Beef Burger",
      quantity: 1,
      amount: 220,
      date: "Nov 04, 2026",
      status: "Cancelled",
    },
  ]);

  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Filter Orders
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(search.toLowerCase()) ||
      order.customer.toLowerCase().includes(search.toLowerCase()) ||
      order.food.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      filterStatus === "All" || order.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  // Update Order Status
  const updateStatus = (id, newStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    );

    setSelectedOrder((prev) =>
      prev?.id === id ? { ...prev, status: newStatus } : prev
    );
  };

  // Status Styles
  const getStatusStyle = (status) => {
    switch (status) {
      case "Pending":
        return "bg-orange-50 text-orange-700 border-orange-100";

      case "Preparing":
        return "bg-blue-50 text-blue-700 border-blue-100";

      case "Completed":
        return "bg-green-50 text-green-700 border-green-100";

      case "Cancelled":
        return "bg-red-50 text-red-700 border-red-100";

      default:
        return "bg-gray-50 text-gray-600";
    }
  };

  // Statistics
  const stats = [
    {
      title: "Total Orders",
      value: orders.length,
      icon: ShoppingBag,
      color: "bg-purple-50 text-purple-600",
    },
    {
      title: "Pending",
      value: orders.filter((o) => o.status === "Pending").length,
      icon: Clock,
      color: "bg-orange-50 text-orange-600",
    },
    {
      title: "Preparing",
      value: orders.filter((o) => o.status === "Preparing").length,
      icon: ChefHat,
      color: "bg-blue-50 text-blue-600",
    },
    {
      title: "Completed",
      value: orders.filter((o) => o.status === "Completed").length,
      icon: CheckCircle,
      color: "bg-green-50 text-green-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Header */}
        <div className="mb-8">
          <p className="text-sm font-semibold text-green-600 mb-2">
            CANTEENPRO / ADMIN
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
                Order Management
              </h1>

              <p className="text-gray-500 text-sm mt-2">
                View, manage and track all customer orders.
              </p>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-500">
              <ClipboardList size={18} className="text-green-600" />
              {orders.length} Total Orders
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <div
                key={index}
                className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${stat.color}`}>
                    <Icon size={21} />
                  </div>
                </div>

                <p className="text-sm text-gray-500 font-medium">
                  {stat.title}
                </p>

                <h2 className="text-2xl font-extrabold text-gray-900 mt-1">
                  {stat.value}
                </h2>
              </div>
            );
          })}
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

          {/* Search and Filter */}
          <div className="p-5 sm:p-6 border-b border-gray-100">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">

              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  All Orders
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Manage your canteen orders.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">

                {/* Search */}
                <div className="relative">
                  <Search
                    size={19}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="text"
                    placeholder="Search orders..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full sm:w-64 pl-11 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition"
                  />
                </div>

                {/* Status Filter */}
                <div className="relative">
                  <Filter
                    size={17}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                  />

                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="w-full sm:w-44 pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm outline-none focus:border-green-500 cursor-pointer"
                  >
                    <option value="All">All Orders</option>
                    <option value="Pending">Pending</option>
                    <option value="Preparing">Preparing</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>

              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left whitespace-nowrap">

              <thead className="bg-gray-50">
                <tr className="text-xs uppercase tracking-wider text-gray-500">
                  <th className="px-6 py-4 font-semibold">Order ID</th>
                  <th className="px-6 py-4 font-semibold">Customer</th>
                  <th className="px-6 py-4 font-semibold">Food Item</th>
                  <th className="px-6 py-4 font-semibold">Qty</th>
                  <th className="px-6 py-4 font-semibold">Amount</th>
                  <th className="px-6 py-4 font-semibold">Date</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">

                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-green-50/30 transition">

                    <td className="px-6 py-5 text-sm font-bold text-gray-800">
                      #{order.id}
                    </td>

                    <td className="px-6 py-5">
                      <p className="text-sm font-semibold text-gray-800">
                        {order.customer}
                      </p>

                      <p className="text-xs text-gray-400 mt-1">
                        {order.email}
                      </p>
                    </td>

                    <td className="px-6 py-5 text-sm text-gray-600">
                      {order.food}
                    </td>

                    <td className="px-6 py-5 text-sm text-gray-600">
                      {order.quantity}
                    </td>

                    <td className="px-6 py-5 text-sm font-bold text-gray-800">
                      ৳{order.amount}
                    </td>

                    <td className="px-6 py-5 text-sm text-gray-500">
                      {order.date}
                    </td>

                    <td className="px-6 py-5">
                      <span className={`inline-flex rounded-full border px-3 py-1.5 text-xs font-bold ${getStatusStyle(order.status)}`}>
                        {order.status}
                      </span>
                    </td>

                    <td className="px-6 py-5">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="flex items-center gap-1.5 text-sm font-semibold text-green-600 hover:text-green-700"
                      >
                        <Eye size={17} />
                        View
                      </button>
                    </td>

                  </tr>
                ))}

                {filteredOrders.length === 0 && (
                  <tr>
                    <td colSpan="8" className="px-6 py-16 text-center">
                      <ShoppingBag size={35} className="mx-auto text-gray-300 mb-3" />

                      <p className="font-semibold text-gray-700">
                        No orders found
                      </p>

                      <p className="text-sm text-gray-400 mt-1">
                        Try changing your search or filter.
                      </p>
                    </td>
                  </tr>
                )}

              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-gray-100">
            <p className="text-sm text-gray-500">
              Showing {filteredOrders.length} of {orders.length} orders
            </p>
          </div>

        </div>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

          <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">

            <div className="flex items-center justify-between p-5 border-b border-gray-100">

              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  Order Details
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  #{selectedOrder.id}
                </p>
              </div>

              <button
                onClick={() => setSelectedOrder(null)}
                className="p-2 rounded-lg text-gray-500 hover:bg-gray-100"
                aria-label="Close order details"
              >
                <X size={21} />
              </button>

            </div>

            <div className="p-6 space-y-4">

              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Customer</span>
                <span className="font-semibold text-gray-800">
                  {selectedOrder.customer}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Email</span>
                <span className="font-semibold text-gray-800">
                  {selectedOrder.email}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Food Item</span>
                <span className="font-semibold text-gray-800">
                  {selectedOrder.food}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Quantity</span>
                <span className="font-semibold text-gray-800">
                  {selectedOrder.quantity}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Order Date</span>
                <span className="font-semibold text-gray-800">
                  {selectedOrder.date}
                </span>
              </div>

              <div className="flex justify-between border-t border-gray-100 pt-4">
                <span className="font-bold text-gray-800">
                  Total Amount
                </span>

                <span className="text-xl font-extrabold text-green-600">
                  ৳{selectedOrder.amount}
                </span>
              </div>

              {/* Update Status */}
              <div className="pt-3">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Update Order Status
                </label>

                <select
                  value={selectedOrder.status}
                  onChange={(e) =>
                    updateStatus(selectedOrder.id, e.target.value)
                  }
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-green-500 bg-gray-50"
                >
                  <option value="Pending">Pending</option>
                  <option value="Preparing">Preparing</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              <button
                onClick={() => setSelectedOrder(null)}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl transition"
              >
                Done
              </button>

            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default OrderList;
