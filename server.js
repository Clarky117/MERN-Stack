const { ApolloServer } = require('apollo-server');
const gql = require('graphql-tag');
const mongoose = require('mongoose');

const User = require('./models/User');
const ForSale = require('./models/ForSale');



// const { typeDefs, resolvers } = require('./schemas');
// const db = require('./config/connection');

const typeDefs = gql`
    type ForSale{
        id: ID!
        fishname: String!
        username: String!
        price: Int!
        size: Int!
        quantity: Int!
        location: String!
    }

    type Query{
        getFish: [ForSale]
    }`

const resolvers = {
    Query: {
        async getFish() {
            try {
                const forSale = await ForSale.find();
                return forSale;
            } catch (err) {
                throw new Error(err);
            }
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
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


