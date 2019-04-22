class SocketManager
{
	private socket:any = io();
	private game:Game;
	
	constructor(game:Game)
	{
		this.game = game;
		this.socket.on("Game:start", this.onStart);
		this.socket.on("Game:changeTurn", this.onChangeTurn);
	}

	public onStart = (datas:any):void =>
	{
		this.onChangeTurn(datas);
		this.game.cols = datas.cols;
	}
	public onChangeTurn = (datas:any):void =>
	{
		this.game.setIsPlaying(datas.turn);
	}
	public emit(type:string, content:any):void
	{
		this.socket.emit(type, content);
	}
}