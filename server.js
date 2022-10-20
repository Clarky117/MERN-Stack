const { ApolloServer } = require('apollo-server');

// const gql = require('graphql-tag');
const mongoose = require('mongoose');

const User = require('./models/User');
const ForSale = require('./models/ForSale');
const { typeDefs, resolvers } = require('./schemas');

// const { typeDefs, resolvers } = require('./schemas');
// const db = require('./config/connection');

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req })  // TODO: look at week 22 activity 18
});

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/myfishDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('connected to mongooooo')
        return server.listen({ port: 5000 })
    })
    .then(res => {
        console.log(`Server running at ${res.url}`)
    });