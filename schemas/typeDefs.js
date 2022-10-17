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
}

type User{
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String!
}

type Query{
    getFish: [ForSale]
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
}
`

module.exports = typeDefs;