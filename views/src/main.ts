function main()
{
	let canvas:HTMLCanvasElement = document.getElementsByTagName("canvas")[0];
	let game:Game;

	canvas.width = Game.WIDTH;
	canvas.height = Game.HEIGHT;
	game = new Game(canvas);
	window.requestAnimationFrame(game.render);
}

document.addEventListener("DOMContentLoaded", main);