// import React, { useContext, useEffect, useState } from 'react';
// import { ShopContext } from '../context/ShopContext';
// import Title from '../components/Title';
// import axios from 'axios';

// const Orders = () => {
//   const { backendUrl, token, currency } = useContext(ShopContext);
//   const [orderData, setOrderData] = useState([]);

//   const loadOrderData = async () => {
//     try {
//       if (!token) return;

//       const response = await axios.get(
//         backendUrl + '/api/order/userorders',
//         {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         }
//       );

//       if (response.data.success) {
//         setOrderData(response.data.data);
//       } else {
//         console.error(response.data.message);
//       }
//     } catch (error) {
//       console.error('Error loading orders', error);
//     }
//   };

//   useEffect(() => {
//     loadOrderData();
//   }, [token]);

//   return (
//     <div className="border-t pt-16 px-4 md:px-8">
//       <div className="text-2xl mb-6">
//         <Title text1={'MY'} text2={'ORDERS'} />
//       </div>

//       {orderData.length === 0 ? (
//         <p className="text-gray-500">No orders found.</p>
//       ) : (
//         orderData.map((order, orderIndex) => (
//           <div key={orderIndex} className="mb-6">
//             <div className="font-semibold mb-2 text-gray-800">
//               Order #{order._id} - {new Date(order.date).toLocaleDateString()}
//             </div>

//             {order.items.map((item, index) => (
//               <div
//                 key={index}
//                 className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
//               >
//                 {/* Product Image and Info */}
//                 <div className="flex items-center gap-4">
//                   <img
//                     src={item.image[0]}
//                     alt={item.name}
//                     className="w-20 h-20 object-cover rounded"
//                   />
//                   <div>
//                     <h3 className="font-medium">{item.name}</h3>
//                     <p className="text-sm text-gray-500">
//                       Quantity: {item.quantity || 1}
//                     </p>
//                     <p className="text-sm text-gray-500">
//                       Price: {currency}
//                       {Number(item.price).toFixed(2)}
//                     </p>
//                   </div>
//                 </div>

//                 {/* Status and Track Button */}
//                 <div className="flex items-center justify-between md:flex-col md:items-end gap-2">
//                   <div className="text-sm text-green-600 font-semibold">
//                     Status: {order.status || 'Processing'}
//                   </div>
//                   <button className="border px-4 py-2 text-sm font-medium rounded-sm hover:bg-gray-100 transition">
//                     Track order
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default Orders;
import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import axios from 'axios';

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);

  const loadOrderData = async () => {
    try {
      if (!token) return;

      const response = await axios.get(`${backendUrl}/api/order/userorders`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.data.success) {
        const sorted = response.data.data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setOrderData(sorted);
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error('Error loading orders', error);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <div className="border-t pt-16 px-4 md:px-10 bg-gray-50 min-h-screen">
      <div className="text-3xl font-semibold mb-10 text-gray-800">
        <Title text1="My" text2="Orders" />
      </div>

      {orderData.length === 0 ? (
        <p className="text-gray-500 text-center text-lg">No orders found.</p>
      ) : (
        orderData.map((order, orderIndex) => (
          <div
            key={orderIndex}
            className="bg-white shadow-md rounded-2xl p-6 mb-8"
          >
            <div className="flex justify-between items-center mb-4">
              <div className="text-lg font-semibold text-gray-700">
                Order ID: <span className="text-grey-600">{order._id}</span>
              </div>
              <div className="text-sm text-gray-500">
                {new Date(order.date).toLocaleString()}
              </div>
            </div>

            <div className="grid gap-4">
              {order.items.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col md:flex-row justify-between items-center gap-4 border p-4 rounded-lg bg-gray-50"
                >
                  <div className="flex items-center gap-4 w-full md:w-2/3">
                    <img
                      src={item.image[0]}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div>
                      <h3 className="font-medium text-gray-800">{item.name}</h3>
                      <p className="text-sm text-gray-500">Quantity: {item.quantity || 1}</p>
                      <p className="text-sm text-gray-500">Size: {item.size || 'N/A'}</p>
                      <p className="text-sm text-gray-500">
                        Price: {currency}
                        {Number(item.price).toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2 w-full md:w-1/3 text-right">
                    <span className="text-sm font-semibold text-green-600">
                      Status: {order.status || 'Processing'}
                    </span>
                    <button className="border px-4 py-1.5 text-sm font-medium rounded-md hover:bg-gray-100 transition">
                      Track Order
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 text-sm text-gray-600">
              Payment Method: <span className="font-medium">{order.paymentMethod}</span> | Paid:{' '}
              <span className={order.payment ? 'text-green-600 font-semibold' : 'text-red-500 font-semibold'}>
                {order.payment ? 'Yes' : 'No'}
              </span>{' '}
              | Amount: <span className="font-semibold">{currency}{order.amount.toFixed(2)}</span>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;

