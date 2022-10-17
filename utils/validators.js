module.exports.validateRegisterInput = (
    username,
    email,
    password,
    confirmPassword
) => {
    const errors = {};
    if(username.trim() === ''){
        errors.username = 'Username must not be empty';
    }
    if(email.trim() === ''){
        errors.email = 'Email must not be empty';
    } else {
        const regEx = /.+@.+\..+/;
        if(!email.match(regEx)){
            errors.email = 'Must be a valid email';
        }
    }
    if(password === ''){
        errors.password = 'Password cannot be empty'
    } else if(password !== confirmPassword){
        errors.confirmPassword = 'Passwords must be the same'
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}

module.exports.validateLoginInput = (username, password) => {
    const errors = {};
    if(username.trim() === ''){
        errors.username = 'Username must not be empty';
    }
    if(password.trim() === ''){
        errors.password = 'Password must not be empty';
    }
    
    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}