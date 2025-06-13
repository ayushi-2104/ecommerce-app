import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Collections = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortOption, setSortOption] = useState("relavent");

  // Toggle category checkbox
  const toggleCategory = (e) => {
    const value = e.target.value;
    setCategory((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  // Toggle subcategory checkbox
  const toggleSubCategory = (e) => {
    const value = e.target.value;
    setSubCategory((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  // Filter + sort + search products
  useEffect(() => {
    console.log("=== Filtering products ===");
    console.log("Selected Categories:", category);
    console.log("Selected SubCategories:", subCategory);
    console.log("Sort Option:", sortOption);
    console.log("Search Term:", search);
    console.log("Show Search:", showSearch);

    let filtered = products;

    if (category.length > 0) {
      filtered = filtered.filter((item) => category.includes(item.category));
      console.log("After category filter:", filtered);
    }

    if (subCategory.length > 0) {
      filtered = filtered.filter((item) => subCategory.includes(item.subCategory));
      console.log("After subcategory filter:", filtered);
    }

    if (showSearch && search.trim() !== "") {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
      console.log("After search filter:", filtered);
    }

    if (sortOption === "low-high") {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
      console.log("After sorting low-high:", filtered);
    } else if (sortOption === "high-low") {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
      console.log("After sorting high-low:", filtered);
    }

    setFilterProducts(filtered);
  }, [category, subCategory, sortOption, search, showSearch, products]);

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      {/* Filters */}
      <div className='min-w-60'>
        <p
          className='my-2 text-xl flex items-center cursor-pointer gap-2'
          onClick={() => setShowFilter(!showFilter)}
        >
          <img
            className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`}
            src={assets.dropdown_icon}
            alt="Dropdown Icon"
          />
          FILTERS
        </p>

        {/* Category Filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            {["Men", "Women", "Kids"].map((cat) => (
              <label key={cat} className='flex gap-2'>
                <input type="checkbox" className='w-3' value={cat} onChange={toggleCategory} /> {cat}
              </label>
            ))}
          </div>
        </div>

        {/* Subcategory Filter */}
        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>TYPE</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            {["Topwear", "Bottomwear", "Winterwear"].map((sub) => (
              <label key={sub} className='flex gap-2'>
                <input type="checkbox" className='w-3' value={sub} onChange={toggleSubCategory} /> {sub}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Product Display */}
      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1={'ALL'} text2={'COLLECTIONS'} />
          {/* Sorting */}
          <select
            className='border-2 border-gray-300 text-sm px-2'
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="relavent">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        {/* Products Grid */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-6'>
          {filterProducts.length === 0 ? (
            <p>No products found matching the filters.</p>
          ) : (
            filterProducts.map((item, index) => (
              <ProductItem
                key={index}
                name={item.name}
                id={item._id}
                price={item.price}
                image={item.image}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Collections;
  