const fs = require('fs');

const {secureGlobal} = require('../utils/miscllaneous');

const startBoot = () => {
    //middlewares js
    let middlewaresList = fs.readdirSync(__dirname + '/../middleware'), middlewares = new Object;
        
    middlewaresList.forEach((util) => {
        let package = require(`${__dirname}/../middleware/${util}`);
        middlewares[package.name] = package.val;
    });
    secureGlobal('middleware', middlewares);

    //controllers js
    let controllersList = fs.readdirSync(__dirname + '/../controller'), controllers = new Object;
        
    controllersList.forEach((util) => {
        let package = require(`${__dirname}/../controller/${util}`);
        controllers[package.name] = package.val;
    });
    secureGlobal('controller', controllers);

    //configs js
    let configList = fs.readdirSync(__dirname + '/../config'), configs = new Object;
        
    configList.forEach((util) => {
        let package = require(`${__dirname}/../config/${util}`);
        configs[package.name] = package.val;
    });
    secureGlobal('config', configs);
    
    //initialise db
    // const db = require('./db/boot').configureDB();
    // secureGlobal('db', db);
}

module.exports = startBoot;