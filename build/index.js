"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Server_1 = require("./class/Server");
var PORT = parseInt(process.env.PORT || "8888");
var server = new Server_1.default(PORT);
