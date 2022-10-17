const { AuthenticationError } = require('apollo-server');
const jwt = require('jsonwebtoken');
const secret = 'mysecretssshhhhhhh';

module.exports = (context) => {
    const authHeader = context.req.headers.authorization;
    if(authHeader){
        const token = authHeader.split('Bearer ')[1];
        if(token){
            try{
                const user = jwt.verify(token, secret);
                return user;
            } catch(err){
                throw new AuthenticationError('Token is expired or invalid');
            }
        }
        throw new Error('Auth token must be \'Bearer [token]')
    }
    throw new Error('Auth header must be provided')

}