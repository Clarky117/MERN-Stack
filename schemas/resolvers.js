const User = require("../models/User");
const ForSale = require("../models/ForSale");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { UserInputError } = require('apollo-server');
const { validateRegisterInput, validateLoginInput } = require('../utils/validators')

// helper function 
function generateToken(user) {
    const secret = 'mysecretssshhhhhhh';
    return jwt.sign({
        id: user.id,
        email: user.email,
        username: user.username
    }, secret, { expiresIn: '1h' });
}

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
    },

    Mutation: {
        async login(parent, { username, password }) {
            const { errors, valid } = validateLoginInput(username, password);

            if(!valid){
                throw new UserInputError('Errors', { errors });
            }

            const user = await User.findOne({ username });

            if (!user) {
                errors.general = 'User not found';
                throw new UserInputError('User not found', { errors });
            }

            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                errors.general = 'Wrong credentials';
                throw new UserInputError('Wrong credentials', { errors });
            }

            const token = generateToken(user)

            return {
                ...user._doc,
                id: user._id,
                token
            }
        },

        async register(parent, { registerInput: { username, email, password, confirmPassword } }, context, info) {
            // validate user data
            const { valid, errors } = validateRegisterInput(username, email, password, confirmPassword);
            if (!valid) {
                throw new UserInputError('Errors', { errors });
            }
            // make sure username isn't taken
            const user = await User.findOne({ username });
            if (user) {
                throw new UserInputError('Username already in use!', {
                    errors: {
                        username: 'Already in use!'
                    }
                })
            }
            // create auth token

            const newUser = new User({
                email,
                username,
                password,
                createdAt: new Date().toISOString()
            });

            const res = await newUser.save();

            const token = generateToken(res)

            return {
                ...res._doc,
                id: res._id,
                token
            }
        }
    }
}

module.exports = resolvers;