import React, { useState } from 'react';
import { assets } from '../assets/assets';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const Add = ({ token }) => {
    const [image1, setImage1] = useState(false);
    const [image2, setImage2] = useState(false);
    const [image3, setImage3] = useState(false);
    const [image4, setImage4] = useState(false);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("Men");
    const [subCategory, setSubCategory] = useState("Topwear");
    const [bestseller, setBestseller] = useState(false);
    const [sizes, setSizes] = useState([]);

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("description", description);
            formData.append("price", price);
            formData.append("category", category);
            formData.append("subCategory", subCategory);
            formData.append("bestseller", bestseller);
            formData.append("sizes", JSON.stringify(sizes));

            if (image1) formData.append("image1", image1);
            if (image2) formData.append("image2", image2);
            if (image3) formData.append("image3", image3);
            if (image4) formData.append("image4", image4);

            const response = await axios.post(backendUrl + "/api/product/add", formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }

            });

            if (response.data.success) {
                toast.success(response.data.message)
                setName('')
                setDescription('')
                setImage1(false)
                setImage2(false)
                setImage3(false)
                setImage4(false)
                setPrice('')
            } else {
                toast.error(response.data.message)
            }

        } catch (error) {
            console.error("Error adding product:", error);
            toast.error(error.message)
        }
    };

    const toggleSize = (size) => {
        setSizes((prev) =>
            prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
        );
    };

    return (
        <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
            <div>
                <p className='mb-2'>Upload Image</p>
                <div className='flex gap-2'>
                    {[image1, image2, image3, image4].map((img, idx) => {
                        const setImage = [setImage1, setImage2, setImage3, setImage4][idx];
                        return (
                            <label key={idx} htmlFor={`image${idx + 1}`}>
                                <img className='w-20' src={!img ? assets.upload_area : URL.createObjectURL(img)} alt="" />
                                <input type="file" id={`image${idx + 1}`} hidden onChange={(e) => setImage(e.target.files[0])} />
                            </label>
                        );
                    })}
                </div>
            </div>

            <div className='w-full'>
                <p className="mb-2">Product name</p>
                <input onChange={(e) => setName(e.target.value)} value={name} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder="type here" required />
            </div>

            <div className='w-full'>
                <p className="mb-2">Product description</p>
                <textarea onChange={(e) => setDescription(e.target.value)} value={description} className='w-full max-w-[500px] px-3 py-2' placeholder="Write content here" required />
            </div>

            <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
                <div>
                    <p className='mb-2'>Product category</p>
                    <select onChange={(e) => setCategory(e.target.value)} value={category} className='w-full px-3 py-2'>
                        <option value="Men">Men</option>
                        <option value="Women">Women</option>
                        <option value="Kids">Kids</option>
                    </select>
                </div>
                <div>
                    <p className='mb-2'>Sub category</p>
                    <select onChange={(e) => setSubCategory(e.target.value)} value={subCategory} className='w-full px-3 py-2'>
                        <option value="Topwear">Topwear</option>
                        <option value="Bottomwear">Bottomwear</option>
                        <option value="Winterwear">Winterwear</option>
                    </select>
                </div>
                <div>
                    <p className='mb-2'>Product Price</p>
                    <input onChange={(e) => setPrice(e.target.value)} value={price} className='w-full px-3 py-2 sm:w-[120px]' type="number" placeholder='25' required />
                </div>
            </div>

            <div>
                <p className='mb-2'>Product sizes</p>
                <div className='flex gap-3'>
                    {["S", "M", "L", "XL", "XXL"].map((size) => (
                        <div key={size} onClick={() => toggleSize(size)}>
                            <p className={`${sizes.includes(size) ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>{size}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className='flex gap-2 mt-2'>
                <input
                    type="checkbox"
                    id='bestseller'
                    checked={bestseller}
                    onChange={() => setBestseller((prev) => !prev)}
                />
                <label className='cursor-pointer' htmlFor="bestseller">Add to Bestseller</label>
            </div>

            <button type="submit" className='w-28 py-3 mt-4 bg-black text-white'>ADD</button>
        </form>
    );
};

export default Add;
