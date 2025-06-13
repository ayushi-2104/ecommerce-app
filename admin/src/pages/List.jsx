import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';

const List = ({ token }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product/list');
      console.log("API Response:", response.data);

      if (response.data.success && Array.isArray(response.data.data)) {
        setList(response.data.data); // ✅ FIXED HERE
      } else {
        toast.error("Invalid response format");
        setList([]);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to fetch products.");
      setList([]);
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(backendUrl + '/api/product/remove', { id }, { headers: { token } })
      if (response.data.success) {
        toast.success(response.data.message)
        await fetchList();
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }


  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="p-4">
      <p className="mb-2 text-lg font-semibold">All Products</p>

      <div className="flex flex-col gap-2">
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-2 px-3 border bg-gray-100 text-sm font-medium">
          <span>Image</span>
          <span>Name</span>
          <span>Category</span>
          <span>Price</span>
          <span>Action</span>
        </div>
        {Array.isArray(list) && list.length > 0 ? (
          list.map((item, index) => (
            <div
              key={index}
              className="grid md:grid-cols-[1fr_3fr_1fr_1fr_1fr] grid-cols-1 items-center gap-4 border p-3"
            >
              <img
                src={item.image?.[0] || 'https://via.placeholder.com/80'}
                alt={item.name}
                className="w-20 h-20 object-cover rounded"
              />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{currency}{item.price}</p>
              <button onClick={() => removeProduct(item._id)} className="text-red-600 hover:underline">Delete</button>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm mt-4">No products found.</p>
        )}

      </div>
    </div>
  );
};

export default List;
