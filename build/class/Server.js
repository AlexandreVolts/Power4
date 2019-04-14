"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var path = require("path");
var Server = /** @class */ (function () {
    function Server(port) {
        var _this = this;
        this.app = express();
        this.initialise = function (err) {
            if (err) {
                console.log(err);
                return;
            }
            console.log("Server is listening on port " + _this.port + ".");
            _this.app.use(express.static("views"));
            _this.app.get("/", function (req, res) {
                res.sendFile(path.resolve(Server.DIR + "index.html"));
            });
        };
        this.port = port;
        this.server = this.app.listen(port, this.initialise);
    }
    Server.DIR = __dirname + "/../../views/";
    return Server;
}());
exports.default = Server;
