const CONFIG = require('../src/config');
const app = require('../src/app');
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io').listen(server, { pingTimeout: 40000 });
const socket = require("../src/socket");
const email = require("../src/util/email");

io.on("connection", socket);

server.listen(CONFIG.PORT, () => {
    console.log(`Running in port => ${CONFIG.PORT}`);
    email.notifyStart();
});