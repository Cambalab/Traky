const jsonServer = require('json-server');
const express = require('express');
const path = require('path');
const server = jsonServer.create();

const PORT = process.env.SERVER_PORT || 8000;
const HOST = process.env.SERVER_HOST || "localhost";
const STATIC_FOLDER_PATH = process.env.STATIC_FOLDER_PATH || path.join(__dirname, '../build');
const STATIC_INDEX_PATH = process.env.STATIC_INDEX_PATH || path.join(__dirname, '../build/index.html');
const DATA_JSON_PATH = process.env.DATA_JSON_PATH || path.join(__dirname, 'data.json');
const ROUTES_PATH = process.env.ROUTES_PATH || path.join(__dirname, 'routes.json');
const routes = require(ROUTES_PATH);
const router = jsonServer.router(DATA_JSON_PATH);

/*
    @TODO: we need to check if it is necessary in staging
*/
server.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
server.use('/', express.static(STATIC_FOLDER_PATH));
server.use('/api', jsonServer.rewriter(routes));
server.use('/api', router);

server.get('/*', function (req, res) {
    res.sendFile(STATIC_INDEX_PATH);
});

server.listen(PORT, HOST, () => {
    console.log(`Server is running on ${HOST}:${PORT}`);
});
