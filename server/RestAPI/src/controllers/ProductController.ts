import { Request, Response } from "express";
import {z} from 'zod'
import dotenv from 'dotenv';

dotenv.config();
import jwt, { Secret } from 'jsonwebtoken';
import { cloudinary } from '../utils/cloudinary'

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


const itemSchema = z.object({
    name: z.string().min(5).max(1000),
    price: z.string().min(1).max(100000000),
    description: z.string().min(10).max(10000),
})

export const ProductControllerWithImage = async(req: Request, res: Response): Promise<void> => {
    try {
        let result

        if(req.file) {
            result = await cloudinary.uploader.upload(req.file.path);
        } else {
            result = await cloudinary.uploader.upload(req.body.filePath);
        }

        const {category } = req.body as {category: string};

        const sellerId = parseInt(req.body.sellerId)
        

        const parsedInput = itemSchema.safeParse(req.body);
        if(!parsedInput.success) {
            res.status(411).json({
                error: parsedInput.error
            })
            return;
        }

        const name = parsedInput.data.name;
        const price = parsedInput.data.price;
        const description = parsedInput.data.description;

        const newFile = await prisma.product.create({
            data: {
                sellerId: sellerId,
                name: name,
                price: price,
                description: description,
                category: category,
                cloudinaryUrl: result.secure_url,
            }
        })

        res.status(200).json({
            success: true,
            data: newFile,
            message: 'Entry Created Successfully'
        });

    }
    catch(error) {
        console.log("Error: ", error)
        res.status(500).json({
            success: false,
            message: 'Entry Creation Failed'
        })
    }
}

export const GetAllProducts = async(req: Request, res: Response): Promise<void> => {
    try {
        const allProducts = await prisma.product.findMany({});

        res.status(200).json({
            success: true,
            data: allProducts,
            message: "This is entire Product List"
        });
    }
    catch (error) {
        console.log("Error: ", error);
        res.status(500).json({
            success: false,
            message: 'Error Fetching all the Products'
        });
    }
}

export const getProductByCategory = async(req: Request, res: Response): Promise<void> => {
    try {
        const categoryQuery = req.params.categoryQuery

        const products = await prisma.product.findMany({
            where: {
                category: {
                    equals: categoryQuery,
                    mode: 'insensitive'
                }
            }
        })

        if(products.length === 0) {
            res.status(404).json({
                success: false,
                message: 'No Data Found with the Given category'
            })
            return;
        }

        res.status(200).json({
            success: true,
            data: products,
            message: 'Data Fetched Successfully'
        })
    }
    catch (error) {
        console.log("Error: ", error);
        res.status(500).json({
            success: false,
            message: 'Error Fetching Products by category'
        });
    }
}

export const getProductByName = async(req: Request, res: Response): Promise<void> => {
    try {
        const searchQuery = req.params.searchQuery

        const products = await prisma.product.findMany({
            where: {
                name: {
                    contains: searchQuery,
                    mode: 'insensitive'
                }
            }
        })

        if(!products) {
            res.status(404).json({
                success: false,
                message: 'No Data found with the given Id'
            })
            return;
        }

        res.status(200).json({
            success: true,
            data: products,
            message: 'Data Fetched Successfully'
        })
    }
    catch (error) {
        console.log("Error: ", error);
        res.status(500).json({
            success: false,
            message: 'Error Fetching Products by Name'
        });
    }
}

export const getProductById = async(req: Request, res: Response): Promise<void> => {
    try {
        const prodId = parseInt(req.params.prodId);

        const product = await prisma.product.findUnique({
            where: {
                id: prodId
            }
        })

        if(!product) {
            res.status(404).json({
                success: false,
                message: 'No Data Found with the Given Id'
            })
            return;
        }

        res.status(200).json({
            success: true,
            data: product,
            message: 'Data Fetched Successfully'
        })
    }
    catch (error) {
        console.log("Error: ", error);
        res.status(500).json({
            success: false,
            message: 'Error fetching the product by id'
        });
    }
}


export const addProductToCart = async(req: Request, res: Response): Promise<void> => {
    try {
        const { custId, prodId } = req.body;

        const updatedCustCart = await prisma.customer.update({
            where: {
                id: custId
            },
            data: {
                cart: {
                    push: parseInt(prodId)
                }
            }
        });
        
        res.status(200).json({
            success: true,
            data: updatedCustCart,
            message: 'Product added to cart successfully'
        })

    }
    catch (error) {
        console.log("Error: ", error);
         res.status(500).json({
            success: false,
            message: 'Error Adding the Product to the cart'
        });
    }
}


export const deleteCartItems = async(req: Request, res: Response): Promise<void> => {
    try {
        const { custId, productId } = req.body;

        const customer = await prisma.customer.findUnique({
            where: {
                id: custId
            }
        });

        if (!customer) {
            res.status(404).json({
                success: false,
                message: 'Customer not found'
            });
            return;
        }

        const updatedCustomer = await prisma.customer.update({
            where: {
                id: custId
            },
            data: {
                cart: {
                    // Filter out the productId from the cart
                    set: customer.cart.filter(itemId => itemId !== productId)
                }
            }
        });


        res.status(200).json({
            success: true,
            message: 'Item Deleted Successfully'
        })
    }
    catch (error) {
        console.log("Error: ", error);
        res.status(500).json({
            success: false,
            message: 'Error removing the product from the cart'
        });
    }
}

export const deleteWholeCart = async(req: Request, res: Response): Promise<void> => {
    try {
        const { custId } = req.body;

        const updatedCustCart = await prisma.customer.update({
            where: {
                id: custId
            },
            data: {
                cart: []
            }
        })

        res.status(200).json({
            success: true,
            message: 'Product Removed from cart successfully'
        })

    }
    catch(error) {
        console.log("Error: ", error);
        res.status(500).json({
            success: false,
            message: 'Error removing the product from the cart'
        });
    }
}