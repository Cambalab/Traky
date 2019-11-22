const jsonServer = require('json-server');
const express = require('express');
const path = require('path');
const routes = require('./routes');
const server = jsonServer.create();

const PORT = process.env.SERVER_PORT || 8000;
const HOST = process.env.SERVER_HOST || "localhost";
const STATIC_PATH = path.join(__dirname ,'../', 'build');

const router = jsonServer.router(path.join(__dirname, 'data.json'));

/*
    @TODO: we need to check if it is necessary in stating
*/
server.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

server.use('/', express.static(STATIC_PATH));

server.use('/api', jsonServer.rewriter(routes));
server.use('/api', router);

/*
    @TODO: do we need to redirect to a new page? By default we redirect to index.html
*/
server.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '../', 'build', 'index.html'));
});

server.listen(PORT, HOST, () => {
    console.log(`Server is running on ${HOST}:${PORT}`);
});
