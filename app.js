/**
 *
 Created by zhangzhao on 2017/9/11.
 Email: zhangzhao@gomeplus.com
 */
const http = require('http');
const path = require('path');
const express = require('express');
const app = express();
const middleWare = require('./middleware/middleware');

middleWare(express, app, {
    root: __dirname,
    projectDescription: path.resolve(__dirname, './README.md'),
    pagePath: path.resolve(__dirname, './view/index.html'),
    buildEnvPath: path.resolve(__dirname, './buildEnv.json'),
    packageFile: path.resolve(__dirname, './package.json')
});

const server = http.createServer(app);

server.listen(7071, (err) => {
    if (err) {
        console.error(err);
    }
    console.log(`The dev server is listening at http://localhost:${7071}/`);
});