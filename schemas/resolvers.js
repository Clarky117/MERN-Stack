const User = require("../models/User");
const ForSale = require("../models/ForSale");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { UserInputError, AuthenticationError } = require('apollo-server');
const { validateRegisterInput, validateLoginInput } = require('../utils/validators');
const auth = require("../utils/auth");
const { argsToArgsConfig } = require("graphql/type/definition");

// helper function 
function generateToken(user) {
    const secret = 'mysecretssshhhhhhh';
    return jwt.sign({
        id: user.id,
        email: user.email,
        username: user.username
    }, secret, { expiresIn: '2h' });
}

const resolvers = {
    Query: {
        async getAllFish() {
            try {
                const forSale = await ForSale.find().sort({ createdAt: -1 });
                return forSale;
            } catch (err) {
                throw new Error(err);
            }
        },

        async getFish(parent, { fishId }) {
            try {
                const fish = await ForSale.findById(fishId);
                if (fish) {
                    return fish;
                } else {
                    throw new Error('Fish not found');
                }
            } catch (err) {
                throw new Error(err);
            }
        }

    },

    Mutation: {
        async login(parent, { username, password }) {
            const { errors, valid } = validateLoginInput(username, password);

            if (!valid) {
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
        },

        async createFishPost(parent, { fishname, price, size, quantity, location }, context) {
            const user = auth(context);
            // console.log(user);

            // revisit if this messes things up
            if (args.fishname.trim() === ''){
                throw new Error('Type of fish must not be empty');
            }
            if (args.price.trim() === ''){
                throw new Error('Price of fish must not be empty');
            }
            if (args.size.trim() === ''){
                throw new Error('Size of fish must not be empty');
            }
            if (args.quantity.trim() === ''){
                throw new Error('Quantity of fish must not be empty');
            }
            if (args.location.trim() === ''){
                throw new Error('Location of fish must not be empty');
            }

            const newFishPost = new ForSale({
                fishname,
                price,
                size,
                quantity,
                location,
                user: user.id,
                username: user.username,
                createdAt: new Date().toISOString()
            });

            const fishPost = await newFishPost.save();

            return fishPost;
        },

        async deleteFishPost(parent, { fishId }, context) {
            const user = auth(context);

            try {
                const fishPost = await ForSale.findById(fishId);
                if (user.username === fishPost.username) {
                    await fishPost.delete();
                    return 'Congrats on selling your fish!';
                } else {
                    throw new AuthenticationError('Action not allowed');
                }
            } catch (err) {
                throw new Error(err);
            }
        },

        async createComment(parent, { postId, body }, context) {
            const { username } = auth(context);
            if (body.trim() === '') {
                throw new UserInputError('Comment is empty', {
                    errors: {
                        body: 'Comment must not be empty'
                    }
                })
            }

            const post = await ForSale.findById(postId);

            if (post) {
                post.comments.unshift({
                    body,
                    username,
                    createdAt: new Date().toISOString()
                });
                await post.save();
                return post;
            } else {
                throw new UserInputError('Post not found')
            }
        },

        async deleteComment(parent, { postId, commentId }, context) {
            const { username } = auth(context);

            const post = await ForSale.findById(postId);

            if (post) {
                const commentIndex = post.comments.findIndex((c) => c.id === commentId);

                if (post.comments[commentIndex].username === username) {
                    post.comments.splice(commentIndex, 1);
                    await post.save();
                    return post;
                } else {
                    throw new AuthenticationError('Action not allowed')
                }
            } else {
                throw new UserInputError('Post not found');
            }
        },

        async toggleThumbsUp(parent, { postId }, context){
            const { username } = auth(context);

            const post = await ForSale.findById(postId);
            if(post){
                if(post.thumbsup.find(like => like.username === username)){
                    // already thumbed
                    post.thumbsup = post.thumbsup.filter(like => like.username !== username);
                } else {
                    // de thumbed
                    post.thumbsup.push({
                        username,
                        createdAt: new Date().toISOString()
                    })
                }

                await post.save();
                return post;
            } else {
                throw new UserInputError('Post not found')
            }
        }

    }
}

module.exports = resolvers;

