"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
exports.resolvers = {
    Query: {
        customers: () => __awaiter(void 0, void 0, void 0, function* () {
            return yield prisma.customer.findMany();
        }),
        customer: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { id }) {
            const customerId = parseInt(id);
            try {
                const customer = yield prisma.customer.findUnique({
                    where: {
                        id: customerId
                    }
                });
                return customer;
            }
            catch (error) {
                console.log("Error: ", error);
            }
        }),
        sellers: () => __awaiter(void 0, void 0, void 0, function* () {
            return yield prisma.seller.findMany();
        }),
        seller: (_2, _b) => __awaiter(void 0, [_2, _b], void 0, function* (_, { id }) {
            const sellerId = parseInt(id);
            try {
                const seller = yield prisma.seller.findUnique({
                    where: {
                        id: sellerId
                    }
                });
                return seller;
            }
            catch (error) {
                console.log("Error: ", error);
            }
        }),
        products: () => __awaiter(void 0, void 0, void 0, function* () {
            return yield prisma.product.findMany();
        }),
        product: (_3, _c) => __awaiter(void 0, [_3, _c], void 0, function* (_, { id }) {
            const productId = parseInt(id);
            try {
                const product = yield prisma.product.findUnique({
                    where: {
                        id: productId
                    }
                });
                return product;
            }
            catch (error) {
                console.log("Error: ", error);
            }
        }),
        searchProductByCategory: (_4, _d) => __awaiter(void 0, [_4, _d], void 0, function* (_, { category }) {
            try {
                const products = yield prisma.product.findMany({
                    where: {
                        category: {
                            equals: category,
                            mode: 'insensitive'
                        },
                    }
                });
                return products;
            }
            catch (error) {
                console.log("Error: ", error);
            }
        }),
        searchProductByName: (_5, _e) => __awaiter(void 0, [_5, _e], void 0, function* (_, { name }) {
            const products = yield prisma.product.findMany({
                where: {
                    name: {
                        equals: name,
                        mode: 'insensitive'
                    },
                }
            });
            return products;
        }),
        reviewbyproductid: (_6, _f) => __awaiter(void 0, [_6, _f], void 0, function* (_, { id }) {
            const reviews = yield prisma.review.findMany({
                where: {
                    prodId: Number(id)
                }
            });
            return reviews;
        })
    }
};
//# sourceMappingURL=fetchProducts.js.map