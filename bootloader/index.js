const fs = require('fs');

const {secureGlobal} = require('../utils/miscllaneous');

const startBoot = () => {
    //configs js
    let configList = fs.readdirSync(__dirname + '/../config'), configs = new Object;
        
    configList.forEach((util) => {
        let package = require(`${__dirname}/../config/${util}`);
        configs[package.name] = package.val;
    });
    secureGlobal('config', configs);

    //services js
    let servicesList = fs.readdirSync(__dirname + '/../services'), services = new Object;
        
    servicesList.forEach((util) => {
        let package = require(`${__dirname}/../services/${util}`);
        services[package.name] = package.val;
    });
    secureGlobal('services', services);
    
    // initialise db
    const db = require('../db/boot').configureDB();
}

module.exports = startBoot;