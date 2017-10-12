/**
 *
 Created by zhangzhao on 2017/9/13.
 */

const path = require('path');
const ncu = require('npm-check-updates');
const fs = require('fs');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const _ = require('lodash');
const marked = require('marked');
const cors = require('cors');

module.exports = function (express, app, opts) {

    var packageFile = opts.packageFile;
    var buildFile = opts.buildEnvPath;
    var readme = path.resolve(opts.root, './readme.html');
    var packageData = {};
    marked.setOptions({
        highlight: function (code) {
            return require('highlight.js').highlightAuto(code).value;
        }
    });
    app.engine('html', ejs.renderFile);
    app.set('view engine', 'html');


    app.use(cors());

    app.use(bodyParser.urlencoded({
        extended: false
    }));
    app.use(bodyParser.json());

    var fileContent;
    try {
        fileContent = fs.readFileSync(opts.projectDescription, 'utf8');
        fileContent = marked(fileContent);
        fs.writeFileSync(readme, fileContent);
    } catch (e) {
        throw new Error(e);
    }

    app.get('/project/getReadme', function (req, res) {
        res.sendFile(readme);
    })
    app.post('/package/upgrade', function (req, res) {
        console.log(req.body.packs);
        try {
            ncu.run({
                packageFile: packageFile,
                filter: req.body.packs,
                upgrade: true,
                silent: true
            }).then((upgraded) => {
                res.json({
                    data: {
                        code: 0
                    }
                })
            });
        }catch (e) {
            throw new Error(e);
        }
    });

    app.post('/config/updateConfig', function (req, res) {
        var projectInfo = fs.readFileSync(buildFile, {encoding: "utf-8"});
        var json = JSON.parse(projectInfo);
        if (!_.isEmpty(req.body.project) && _.trim(req.body.project) != "") {
            json.project = req.body.project;
        }
        if (!_.isEmpty(req.body.devUrl) && _.trim(req.body.devUrl) != "") {
            json.urls.dev = req.body.devUrl;
        }
        if (!_.isEmpty(req.body.preUrl) && _.trim(req.body.preUrl) != "") {
            json.urls.pre = req.body.preUrl;
        }
        if (!_.isEmpty(req.body.prodUrl) && _.trim(req.body.prodUrl != "")) {
            json.urls.production = req.body.prodUrl;
        }
        if (!_.isEmpty(req.body.devApi) && _.trim(req.body.devApi != "")) {
            json.hosts.dev = req.body.devApi;
        }
        if (!_.isEmpty(req.body.preApi) && _.trim(req.body.preApi != "")) {
            json.hosts.pre = req.body.preApi;
        }
        if (!_.isEmpty(req.body.prodApi) && _.trim(req.body.prodApi != "")) {
            json.hosts.production = req.body.prodApi;
        }
        try {
            fs.writeFileSync(buildFile, JSON.stringify(json, null, 4));
        }catch (e) {
            throw new Error(e);
        }
        res.json({
            data: {
                code: 0,
                msg: ''
            }
        })
    });

    app.get('/config/getConfig', function (req, res) {
        try {
            var projectInfo = fs.readFileSync(buildFile, {encoding: "utf-8"});
            var json = JSON.parse(projectInfo);
            res.json({
                data: {
                    code: 0,
                    data: {
                        project: json.project || 'project',
                        devUrl: json.hosts.dev,
                        preUrl: json.hosts.pre,
                        prodUrl: json.hosts.production,
                        devApi: json.urls.dev,
                        preApi: json.urls.pre,
                        prodApi: json.urls.production
                    }
                }
            });
        }catch(e) {
            throw new Error(e);
        }
    });

    app.get('/package/getPackage', function (req, res) {
        try {
            var packageContent = fs.readFileSync(packageFile).toString();
            //console.log(packageContent);
            var packJson = JSON.parse(packageContent);
            var object = {};
            Object.keys(packJson.devDependencies).forEach(function (current) {
                object[current] = [packJson.devDependencies[current]];
            });
            Object.keys(packJson.dependencies).forEach(function (current) {
                object[current] =  [packJson.dependencies[current]];
            });

            ncu.run({
                packageFile: packageFile,
                silent: true,
                jsonUpgraded: true
            }).then((upgraded) => {
                // console.log('dependencies to upgrade:', upgraded);
                Object.keys(upgraded).forEach(function (current) {
                    var pack = object[current];
                    if (pack != null) {
                        pack.push(upgraded[current]);
                    }
                });
                var array = [];
                Object.keys(object).forEach(function (current) {
                    var obj = {};
                    obj[current] = object[current];
                    array.push(obj);
                })
                array.sort(function (a,b) {
                    var aa = Object.keys(a)[0];
                    var bb = Object.keys(b)[0];
                    if (aa > bb) {
                        return 1;
                    } else if (aa < bb) {
                        return -1;
                    } else {
                        return 0;
                    }
                });
                var retObj = {};
                array.forEach(function (current) {
                    var key = Object.keys(current)[0];
                    var value = current[key];
                    retObj[key] = value;
                })

                res.json(retObj);
            });
        }catch(e) {
            throw new Error(e);
        }
    })
};