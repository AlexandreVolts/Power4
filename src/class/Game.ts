import Player from "./Player"

class Game
{
	private static readonly ROWS = 7;
	private sockets:Array<Player> = new Array<Player>();
	private cols:number;
	private turn:number = ~~(Math.random() * 2);
	
	constructor(s1:Player, s2:Player)
	{
		this.sockets.push(s1, s2);
		this.cols = ~~(7 + Math.random() * (10 - 7));
		this.broadcast("Game:start", {
			cols: this.cols,
			turn: false
		});
		this.sockets[this.turn].emit("Game:changeTurn", {
			turn: true
		});
	}

	public broadcast(event:string, datas:any):void
	{
		for (let i = this.sockets.length - 1; i >= 0; i--) {
			this.sockets[i].emit(event, datas);
		}
	}
	public getSockets():Array<Player>
	{
		return (this.sockets);
	}
}

export default Game;