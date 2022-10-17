const { gql } = require('apollo-server');

const typeDefs = gql`
type ForSale{
    id: ID!
    fishname: String!
    username: String!
    price: Int!
    size: Int!
    quantity: Int!
    location: String!
    createdAt: String!
}

type User{
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String!
}

type Query{
    getAllFish: [ForSale]
    getFish(fishId: ID!): ForSale
}

input RegisterInput{
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
}

type Mutation{
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
    # createFishPost(fishname: String!, price: Int!, size: Int!, quantity: Int!, location: String!): ForSale!
    # deleteFishPost(fishId: ID!): String!
}
`

module.exports = typeDefs;