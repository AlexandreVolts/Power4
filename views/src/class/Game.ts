class Game
{
	public static readonly HEIGHT:number = 600;
	public static WIDTH:number = 600;
	public static readonly ROWS = 7;
	public static readonly STROKE_SIZE:number = 10;
	public static readonly PADDING:number = 100;
	private pawns:Array<Pawn> = new Array<Pawn>();
	private canvas:HTMLCanvasElement;
	private ctx:CanvasRenderingContext2D;
	private infoText:HTMLParagraphElement;
	private controlPawn:Pawn;
	private socketManager:SocketManager;
	private isPlaying:boolean;
	private cols:number;

	constructor(canvas:HTMLCanvasElement)
	{
		this.canvas = canvas;
		this.ctx = canvas.getContext("2d");
		this.infoText = document.getElementsByTagName("p")[0];
		this.socketManager = new SocketManager(this);
		this.cols = Game.ROWS;
		this.controlPawn = new Pawn(0, 0, this.cols);
		window.addEventListener("pointermove", this.onMouseMove);
		window.addEventListener("click", this.onMouseClick);
	}

	private onMouseMove = (event:PointerEvent):void =>
	{
		let position:any = {
			x: event.clientX / (Game.WIDTH / this.cols),
			y: 0
		}
		this.controlPawn.setPosition(position.x , position.y);
	}
	private onMouseClick = (event:MouseEvent):void =>
	{
		if (!this.isPlaying)
			return;
	}
	private drawPawns():void
	{
		this.controlPawn.draw(this.ctx);
		for (let i:number = this.pawns.length - 1; i >= 0; i--)
			this.pawns[i].draw(this.ctx);
	}
	private drawGrid():void
	{
		let rect = {
			x: 0, 
			y: 0,
			width: ((Game.WIDTH - Game.STROKE_SIZE) / this.cols),
			height: (Game.HEIGHT - Game.PADDING - Game.STROKE_SIZE / 2) / Game.ROWS
		};

		this.ctx.strokeStyle = "blue";
		this.ctx.lineWidth = Game.STROKE_SIZE;
		this.ctx.beginPath();
		for (let i = 0; i <= this.cols; i++) {
			rect.x = Game.STROKE_SIZE / 2 + rect.width * i;
			rect.y = Game.PADDING + rect.height * i;
			this.ctx.moveTo(rect.x, Game.PADDING);
			this.ctx.lineTo(rect.x, Game.HEIGHT);
			this.ctx.moveTo(0, rect.y);
			this.ctx.lineTo(Game.WIDTH, rect.y);
		}
		this.ctx.closePath();
		this.ctx.stroke();
	}

	public render = ():void =>
	{
		this.ctx.clearRect(0, 0, Game.WIDTH, Game.HEIGHT);
		this.drawPawns();
		this.drawGrid();
		window.requestAnimationFrame(this.render);
	}
	public setColor(color:string):void
	{
		this.controlPawn.color = color;
	}
	public setCols(cols:number):void
	{
		this.cols = cols;
		this.controlPawn = new Pawn(0, 0, this.cols);
	}
	public setIsPlaying(isPlaying:boolean)
	{
		this.isPlaying = isPlaying;
		if (isPlaying)
			this.infoText.textContent = "It is your turn to play.";
		else
			this.infoText.textContent = "Waiting for your adversary to play...";
	}
}