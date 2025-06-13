import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) {
      toast.error("Admin token not found");
      return;
    }

    try {
      const response = await axios.get(`${backendUrl}/api/order/list`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        setOrders(response.data.orders.reverse()); // recent first
      } else {
        toast.error(response.data.message || "Failed to fetch orders");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };
  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.patch(
        backendUrl + '/api/order/status',
        { orderId, status: event.target.value },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.success) {
        await fetchAllOrders();
      } else {
        toast.error(response.data.message || "Failed to update status");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message || "An error occurred");
    }
  };


  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h3 className="text-3xl font-bold text-gray-800 mb-8">Admin Orders</h3>

      {orders.length === 0 ? (
        <p className="text-center text-gray-600">No orders found.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-6 border">
              <div className="flex items-center mb-4">
                <img src={assets.parcel_icon} alt="parcel" className="w-8 h-8 mr-3" />
                <span className="font-semibold text-gray-800">Order ID: <span className="text-blue-600">{order._id}</span></span>
              </div>

              <div className="ml-2 space-y-1">
                {order.items.map((item, idx) => (
                  <div key={idx} className="text-sm text-gray-700">
                    {item.name} x {item.quantity} <span className="ml-2 text-gray-500">[Size: {item.size}]</span>
                  </div>
                ))}
              </div>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-600">
                <p>Status: <span className="font-semibold">{order.status}</span></p>
                <p>Payment: <span className={order.payment ? "text-green-600 font-semibold" : "text-red-500 font-semibold"}>{order.payment ? "Yes" : "No"}</span></p>
                <p>Payment Method: <span className="font-semibold">{order.paymentMethod}</span></p>
                <p>Amount: ₹{order.amount}</p>
                <p>Date: {new Date(order.date).toLocaleString()}</p>
              </div>

              <select onChange={(event) => statusHandler(event, order._id)} value={order.status} className='p-2 font-semibold'>
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out For Delivery">Out For Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
