class Game
{
	public static readonly WIDTH:number = 500;
	public static readonly HEIGHT:number = 600;
	public static readonly ROWS = 7;
	private static readonly STROKE_SIZE:number = 10;
	private ctx:CanvasRenderingContext2D;
	private infoText:HTMLParagraphElement;
	private socketManager:SocketManager;
	private isPlaying:boolean;
	public cols:number;

	constructor(canvas:HTMLCanvasElement)
	{
		this.ctx = canvas.getContext("2d");
		this.infoText = document.getElementsByTagName("p")[0];
		this.socketManager = new SocketManager(this);
		this.cols = 1;
	}

	private drawGrid():void
	{

	}
	public render = ():void =>
	{
		window.requestAnimationFrame(this.render);
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