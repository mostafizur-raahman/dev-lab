const http = require("http");
const express = require("express");
const os = require("os");
const { Server: SocketServer } = require("socket.io");

const pty = require("node-pty");

const shell = os.platform() === "win32" ? "powershell.exe" : "bash";
console.log(shell);
const ptyProcess = pty.spawn(shell, [], {
    name: "xterm-color",
    cols: 80,
    rows: 30,
    cwd: "/home/mostafiz/Development/DevLab/server",
    env: process.env,
});

const app = express();

const server = http.createServer(app);

const io = new SocketServer({
    cors: "*",
});

io.attach(server);

ptyProcess.onData((data) => {
    io.emit("terminal:data", data);
});

io.on("connection", (socket) => {
    console.log(`socket connected `, socket.id);

    socket.on("terminal:write", (data) => {
        ptyProcess.write(data);
    });
});

server.listen(8000, () => {
    console.log("Server running on port 8000");
});
