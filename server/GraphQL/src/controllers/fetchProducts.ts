const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

export const resolvers = {
    Query: {
        customers: async() => {
            return await prisma.customer.findMany();
        },
        customer: async(_: any, { id }: {id: string}) => {

            const customerId = parseInt(id);
            try {
                const customer = await prisma.customer.findUnique({
                    where: {
                        id: customerId
                    }
                });
                return customer
            }
            catch(error) {
                console.log("Error: ", error)
            }
        },
        sellers: async() => {
            return await prisma.seller.findMany();
        },
        seller: async(_: any, { id }: { id: string }) => {
            const sellerId = parseInt(id);
            try {
                const seller = await prisma.seller.findUnique({
                    where: {
                        id: sellerId
                    }
                });
                return seller
            }
            catch(error) {
                console.log("Error: ", error)
            }
        },
 
        products: async() => {
            return await prisma.product.findMany();
        },
        product: async(_: any, { id }: {id: string}) => {
            const productId = parseInt(id);
            try {
                const product = await prisma.product.findUnique({
                    where: {
                        id: productId
                    }
                });
                return product
            }
            catch(error) {
                console.log("Error: ", error)
            }

        },
        searchProductByCategory: async(_: any, { category }: {category: string}) => {
            try {
                const products = await prisma.product.findMany({
                    where: {
                        category: {
                            equals: category,
                            mode: 'insensitive'
                        },
                    }
                });
                return products;
            }
            catch(error) {
                console.log("Error: ", error)
            }
        },
        searchProductByName: async(_: any, { name }: {name: string}) => {
            const products = await prisma.product.findMany({
                where: {
                    name: {
                        equals: name,
                        mode: 'insensitive'
                    },
                }
            });
            return products;
        },
        reviewbyproductid: async(_: any, { id }: {id: number}) => {
            const reviews = await prisma.review.findMany({
                where: {
                    prodId: Number(id)
                }
            });
            return reviews;
        },

    }
}