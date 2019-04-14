import express = require("express");
import http = require("http");
import path = require("path");


class Server
{
	private static readonly DIR:string = __dirname + "/../../views/";
	private readonly port:number;
	private app = express();
	private server:http.Server;

	constructor(port:number)
	{
		this.port = port;
		this.server = this.app.listen(port, this.initialise)
	}

	private initialise = (err:string) =>
	{
		if (err) {
			console.log(err);
			return;
		}
		console.log(`Server is listening on port ${this.port}.`);
		this.app.use(express.static("views"));
		this.app.get("/", (req, res):void => {
			res.sendFile(path.resolve(Server.DIR + "index.html"));
		});
	}
}

export default Server;