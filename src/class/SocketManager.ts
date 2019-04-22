import http = require("http");
import socketio = require("socket.io");
import Player from "./Player"
import Server from "./Server"

class SocketManager
{
	private io:socketio.Server;
	private players:Array<Player> = new Array<Player>();
	private server:Server;

	constructor(server:Server)
	{
		this.io = socketio(server.getHTTPServer());
		this.server = server;
		this.io.on("connection", this.handleConnection);
	}

	private handleConnection = (socket:socketio.Socket):void =>
	{
		let player = new Player(socket);
		let waitings:Array<Player> = this.players.filter((player:Player):boolean =>
		{
			return (player.brother == null);
		});

		this.players.push(player);
		socket.on("disconnect", ():void => {
			this.handleDisconnect(socket);
		});
		if (waitings.length > 0)
			this.server.createGame(player, waitings[0]);
		console.log(`User ${socket.id} joined the server.`);
	}
	private handleDisconnect = (socket:socketio.Socket):void =>
	{
		let index:number = this.players.findIndex((player:Player):boolean =>
		{
			return (player.getId() === socket.id);
		});

		if (this.players[index].brother != null) {
			
		}
		this.players.splice(index, 1);
		console.log(`User ${socket.id} left the server.`);
	}
}

export default SocketManager;