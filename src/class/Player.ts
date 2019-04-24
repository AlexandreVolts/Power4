import socketio = require("socket.io");

class Player
{
	private socket:socketio.Socket;
	private color:string;
	public brother:Player = null;
	
	constructor(socket:socketio.Socket)
	{
		this.socket = socket;
	}

	public emit(event:string, datas:any):void
	{
		this.socket.emit(event, datas);
	}
	public getColor():string
	{
		return (this.color);
	}
	public getId():string
	{
		return (this.socket.id);
	}
	public setColor(color:string):void
	{
		this.color = color;
		this.emit("Game:getColor", {
			color: this.color
		});
	}
}

export default Player;