const validateUser = (req, res, next) => {
    const detokenize = services.encrypt.decode(req.headers.authorization);

    if( Object.keys(detokenize).length > 0  &&  detokenize._id ) {
        //checks id from mongo and update to request payload
            //object will contains user id , email, and rights
        req.loggedUser = {name: "test user"};
        next();
    } else {
        next({message: "invalid token", status: 400});
    }
}

module.exports = {
    validateUser
}