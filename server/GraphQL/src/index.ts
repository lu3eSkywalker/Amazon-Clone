const { ApolloServer } = require('apollo-server-express');
const {typeDefs} = require('./graphql/Schema')
const { resolvers } = require('./controllers/fetchProducts')
const express = require('express')


const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();

// Start the Apollo Server
async function startServer() {
    await server.start();
    server.applyMiddleware({ app });
}

startServer().then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () =>
        console.log(`Server running at http://localhost:${PORT}`)
    );
});