const { model, Schema } = require('mongoose');

// do required in graphql
const forSaleSchema = new Schema({
    fishname: String,
    username: String,
    createdAt: String,
    price: Number,
    size: Number,
    quantity: Number,
    location: String,
    comments: [
        {
            body: String,
            username: String,
            createdAt: String,
        }
    ],
    thumbsup: [
        {
            username: String,
            createdAt: String,
        }
    ],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
});

module.exports = model('ForSale', forSaleSchema);