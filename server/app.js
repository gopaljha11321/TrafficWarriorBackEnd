const express = require('express');
const fs = require('fs');
const path = require('path');
module.exports = (app, router)=> {
    fs.readdirSync(`${__dirname}/api`).forEach((file) => {
        fs.readdirSync(`${__dirname}/api/${file}`).forEach(
            (subFile) => {
                if (subFile.indexOf('route') !== -1) {
                    require(`${__dirname}/api/${file}/route`)(router);
                }
            },
        );
    });
    app.use('/', router);
    app.use('/static', express.static('public'));
}