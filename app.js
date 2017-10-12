/**
 *
 Created by zhangzhao on 2017/10/10.
 */
const http = require('http');
const path = require('path');
const express = require('express');
const app = express();
const middleWare = require('./middleware/middleware');

app.set('views', path.join(__dirname, './dist'));
app.use(express.static(path.join(__dirname, './dist')));

middleWare(express, app, {
    root: __dirname,
    projectDescription: path.resolve(__dirname, './README.md'),
    pagePath: path.resolve(__dirname, './dist/index.html'),
    buildEnvPath: path.resolve(__dirname, './config/buildEnv.json'),
    packageFile: path.resolve(__dirname, './package.json')
});

const server = http.createServer(app);

server.listen(7076, (err) => {
    if (err) {
        console.error(err);
    }
    console.log(`The dev server is listening at http://localhost:${7076}/`);
});