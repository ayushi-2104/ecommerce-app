// frontend/src/context/ShopContext.jsx

import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = '$';
  const delivery_fee = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();

  const deepClone = (obj) => JSON.parse(JSON.stringify(obj));

  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('cartItems');
    return saved ? JSON.parse(saved) : {};
  });

  const [products, setProducts] = useState([]);
  const [token, _setToken] = useState(localStorage.getItem("token") || "");
  const [loading, setLoading] = useState(true);

  const setToken = (newToken) => {
    _setToken(newToken);
    if (newToken) {
      localStorage.setItem("token", newToken);
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("cartItems");
      setCartItems({});
    }
  };

  // Sync cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const getUserCart = async (userToken) => {
    try {
      const res = await axios.post(`${backendUrl}/api/cart/get`, {}, {
        headers: { token: userToken },
      });
      if (res.data.success) {
        const userCart = res.data.cartData || {};
        setCartItems(userCart);
        localStorage.setItem('cartItems', JSON.stringify(userCart));
      }
    } catch (err) {
      console.error("Error fetching user cart:", err);
      toast.error("Could not sync cart");
    }
  };

  const addToCart = async (itemId, size) => {
    if (!itemId || !size) {
      toast.error("Missing item ID or size");
      return;
    }

    const updated = deepClone(cartItems);
    if (!updated[itemId]) updated[itemId] = {};
    updated[itemId][size] = (updated[itemId][size] || 0) + 1;

    setCartItems(updated);
    localStorage.setItem('cartItems', JSON.stringify(updated));

    if (token) {
      try {
        await axios.post(`${backendUrl}/api/cart/add`, { itemId, size }, {
          headers: { token },
        });
        getUserCart(token);
        toast.success("Item added to cart");
      } catch (err) {
        console.error("Error syncing addToCart:", err);
        toast.error("Failed to sync cart");
      }
    }
  };

  const updateQuantity = async (itemId, size, quantity) => {
    const updated = deepClone(cartItems);

    if (quantity > 0) {
      if (!updated[itemId]) updated[itemId] = {};
      updated[itemId][size] = quantity;
    } else {
      if (updated[itemId]) {
        delete updated[itemId][size];
        if (Object.keys(updated[itemId]).length === 0) {
          delete updated[itemId];
        }
      }
    }

    setCartItems(updated);
    localStorage.setItem('cartItems', JSON.stringify(updated));

    if (token) {
      try {
        await axios.post(`${backendUrl}/api/cart/update`, { itemId, size, quantity }, {
          headers: { token },
        });
        getUserCart(token);
      } catch (err) {
        console.error("Update cart failed:", err);
        toast.error("Could not sync update");
      }
    }
  };

  const getCartCount = () => {
    let total = 0;
    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        total += cartItems[itemId][size];
      }
    }
    return total;
  };

  const getCartAmount = () => {
    let total = 0;
    for (const itemId in cartItems) {
      const product = products.find(p => p._id === itemId);
      if (!product) continue;
      for (const size in cartItems[itemId]) {
        total += product.price * cartItems[itemId][size];
      }
    }
    return total;
  };

  const getProductsData = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/product/list`);
      const list = Array.isArray(res.data.products)
        ? res.data.products
        : res.data.data;

      if (res.data.success) {
        setProducts(list || []);
      } else {
        toast.error("Failed to fetch products");
      }
    } catch (err) {
      console.error("Product fetch failed:", err);
      toast.error("Product load error");
    }
  };

  // Initial fetch
  useEffect(() => {
    getProductsData();
  }, []);

  // On mount, restore token & cart
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
      getUserCart(savedToken);
    }
    setLoading(false);
  }, []);

  // Sync cart if token changes
  useEffect(() => {
    if (token) getUserCart(token);
  }, [token]);

  const value = {
    products,
    currency,
    delivery_fee,
    search, setSearch,
    showSearch, setShowSearch,
    cartItems, setCartItems,
    addToCart,
    updateQuantity,
    getCartCount,
    getCartAmount,
    backendUrl,
    token, setToken,
    loading,
    navigate,
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
