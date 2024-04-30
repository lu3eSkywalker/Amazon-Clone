export const typeDefs = `#graphql
    type Customer {
        id: ID!
        name: String!
        email: String!
        password: String!
        address: String!
        cart: [ID]!
        reviews: [Review!]!
    }

    type Seller {
        id: ID!
        name: String!
        email: String!
        password: String!
        company: String!
        products: [Product!]!
    }

    type Product {
        id: ID!
        name: String!
        cloudinaryUrl: String!
        price: String!
        description: String!
        category: String!
        reviews: [Review!]!
        seller: Seller!
    }

    type Review {
        id: ID!
        custId: Int!
        prodId: Int!
        review: String
        product: Product!
        customer: Customer!
    }
    type Query {
        customers: [Customer!]!
        customer(id: ID!): Customer

        sellers: [Seller!]!
        seller(id: ID!): Seller
        

        products: [Product!]!
        product(id: ID!): Product

        searchProductByName(name: String!): [Product!]!
        searchProductByCategory(category: String!): [Product!]!


        reviewbyproductid(id: ID!): [Review!]!
    }
`