import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs/promises';
import dotenv from 'dotenv';
import productModel from "../models/productModel.js";

dotenv.config(); // Load variables from .env

// Cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, subCategory, sizes, bestSeller } = req.body;

        console.log('Form Data:', { name, description, price, category, subCategory, sizes, bestSeller });

        // Collect uploaded images
        let images = [];
        if (req.files) {
            Object.keys(req.files).forEach((key) => {
                if (req.files[key][0]) {
                    images.push(req.files[key][0]);
                }
            });
        }

        if (images.length === 0) {
            return res.status(400).json({ success: false, message: "No images uploaded" });
        }

        console.log('Uploading images to Cloudinary...');

        // Upload images to Cloudinary
        const imagesUrl = await Promise.all(
            images.map(async (item, index) => {
                try {
                    console.log(`Uploading image ${index + 1}: ${item.path}`);
                    const result = await cloudinary.uploader.upload(item.path, {
                        resource_type: 'image',
                    });
                    console.log(`Uploaded: ${result.secure_url}`);
                    return result.secure_url;
                } catch (uploadErr) {
                    console.error(`Error uploading image ${index + 1}:`, uploadErr);
                    return null;
                }
            })
        );

        const validUrls = imagesUrl.filter(url => url !== null);

        if (validUrls.length === 0) {
            return res.status(500).json({ success: false, message: 'All image uploads failed' });
        }

        console.log('Uploaded Image URLs:', validUrls);

        // Parse sizes safely
        let parsedSizes;
        try {
            parsedSizes = JSON.parse(sizes);
        } catch (e) {
            return res.status(400).json({ success: false, message: 'Invalid sizes format' });
        }

        const productData = {
            name,
            description,
            category,
            price: Number(price),
            subCategory,
            bestSeller: bestSeller === "true",
            sizes: parsedSizes,
            image: validUrls,
            date: Date.now()
        };

        const product = new productModel(productData);
        await product.save();

        // Delete local temp image files after upload
        await Promise.all(
            images.map(async (item) => {
                try {
                    await fs.unlink(item.path);
                    console.log(`Deleted local file: ${item.path}`);
                } catch (e) {
                    console.warn(`Failed to delete local file ${item.path}: ${e.message}`);
                }
            })
        );

        // ✅ Respond once, after everything completes
        return res.json({
            success: true,
            message: 'Product added successfully',
            data: product,
        });

    } catch (error) {
        console.error('Add Product Error:', error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

const listProducts = async (req, res) => {
    try {
        const products = await productModel.find({});
        res.json({ success: true, data: products });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const removeProduct = async (req, res) => {
    try {
        const { id } = req.body; // FIXED: from req.body, not req.params
        console.log("Deleting product with ID:", id);

        const deletedProduct = await productModel.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        res.json({ success: true, message: "Product removed successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


const singleProduct = async (req, res) => {
    try {
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({ success: false, message: "Product ID is required" });
        }

        const product = await productModel.findById(id);

        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        res.json({ success: true, product });
    } catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export { listProducts, addProduct, removeProduct, singleProduct };
