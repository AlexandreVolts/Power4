import express = require("express");
import socketio = require("socket.io");
import http = require("http");
import path = require("path");
import Game from "./Game"
import Player from "./Player"
import SocketManager from "./SocketManager"

class Server
{
	private static readonly DIR:string = __dirname + "/../../views/";
	private readonly port:number;
	private app:any = express();
	private server:http.Server;
	private socketManager:SocketManager;
	private games:Array<Game> = new Array<Game>();

	constructor(port:number)
	{
		this.port = port;
		this.server = this.app.listen(port, this.initialise);
		this.socketManager = new SocketManager(this);
	}

	private initialise = (err:string) =>
	{
		if (err) {
			console.log(err);
			return;
		}
		console.log(`Server is listening on port ${this.port}.`);
		this.app.use(express.static("views"));
		this.app.get("/", (req:any, res:any):void => {
			res.sendFile(path.resolve(Server.DIR + "index.html"));
		});
	}

	public createGame(s1:Player, s2:Player):void
	{
		s1.brother = s2;
		s2.brother = s1;
		this.games.push(new Game(s1, s2));
	}
	public destroyGame(player:Player):void
	{
		let id:string = player.getId();
		let index:number = this.games.findIndex((game:Game):boolean =>
		{
			let players:Array<Player> = game.getSockets();

			return (players[0].getId() == id || players[1].getId() == id);
		});

		this.games.splice(index, 1);
	}
	public getHTTPServer():http.Server
	{
		return (this.server);
	}
}

export default Server;