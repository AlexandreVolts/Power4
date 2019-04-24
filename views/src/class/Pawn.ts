class Pawn
{
	private x:number;
	private y:number;
	private radius:number;
	private cols:number;
	public color:string = "red";

	constructor(x:number, y:number, cols:number)
	{
		this.radius = ((Game.WIDTH - Game.STROKE_SIZE * 2) / (cols + 1)) * 0.45;
		this.setPosition(x, y);
		this.cols = cols;
	}

	public draw(ctx:CanvasRenderingContext2D):void
	{
		ctx.fillStyle = this.color;
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
		ctx.fill();
		ctx.beginPath();
		ctx.fillStyle = "rgba(255, 255, 255, 0.25)";
		ctx.strokeStyle = "black";
		ctx.lineWidth = 1;
		ctx.arc(this.x, this.y, this.radius * 0.5, 0, Math.PI * 2);
		ctx.fill();
		ctx.stroke();
	}
	public setPosition(x:number, y:number)
	{
		let width:number = (Game.WIDTH - Game.STROKE_SIZE) / this.cols;
		let height:number = (Game.HEIGHT - Game.PADDING - Game.STROKE_SIZE / 2) / Game.ROWS;

		this.x = Game.STROKE_SIZE / 2 + (~~x) * width + width / 2;
		this.y = Game.PADDING + (~~y) * height - height / 2;
	}
}