import Player from "./Player"

class Game
{
	private static readonly ROWS:number = 7;
	private pawns:Array<Array<number>> = new Array<Array<number>>();
	private players:Array<Player> = new Array<Player>();
	private cols:number;
	private turn:number = ~~(Math.random() * 2);
	
	constructor(s1:Player, s2:Player)
	{
		s1.brother = s2;
		s2.brother = s1;
		s1.setColor("red");
		s2.setColor("green");
		this.players.push(s1, s2);
		this.cols = ~~(7 + Math.random() * (10 - 7));
		this.initialiseBoard();
		this.broadcast("Game:start", {
			turn: false,
			cols: this.cols
		});
		this.players[this.turn].emit("Game:changeTurn", {
			color: this.players[this.turn].getColor(),
			turn: true
		});
	}

	private initialiseBoard():void
	{
		for (let i:number = 0; i < this.cols; i++) {
			this.pawns.push(new Array<number>());
			for (let j:number = 0; j < Game.ROWS; j++) {
				this.pawns[i].push(-1);
			}
		}
	}

	public broadcast(event:string, datas:any):void
	{
		for (let i = this.players.length - 1; i >= 0; i--) {
			this.players[i].emit(event, datas);
		}
	}
	public getPlayers():Array<Player>
	{
		return (this.players);
	}
}

export default Game;