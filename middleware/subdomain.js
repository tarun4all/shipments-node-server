const createError = require('http-errors');
const subdomain = (req, res, next) => {
    let hostUrl = encodeURIComponent(req.hostname);

    if(encodeURIComponent('codalien.localhost').includes(process.env.HOST || 'localhost')) {
        let subdomain = hostUrl.replace(process.env.HOST || 'localhost', ''); subdomain = subdomain.replace(/\./g, '');
        
        //check valid subdomain
        req.subdomain = subdomain;
        next();
    } else 
        next(createError(404));
}

module.exports = {
    name: 'subdomain',
    val: subdomain
}