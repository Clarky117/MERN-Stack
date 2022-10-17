const { model, Schema } = require('mongoose');
const bcrypt = require('bcrypt');

// do required in graphql
const userSchema = new Schema({
    username: String,
    password: String,
    email: String,
    createdAt: String,
    description: String,
});

userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
      const hackerProof = 10;
      this.password = await bcrypt.hash(this.password, hackerProof);
    }
  
    next();
  });
  
  userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
  };

module.exports = model('User', userSchema);