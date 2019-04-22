import socketio = require("socket.io");

class Player
{
	private socket:socketio.Socket;
	public brother:Player = null;
	
	constructor(socket:socketio.Socket)
	{
		this.socket = socket;
	}

	public emit(event:string, datas:any):void
	{
		this.socket.emit(event, datas);
	}
	public getId():string
	{
		return (this.socket.id);
	}
}

export default Player;