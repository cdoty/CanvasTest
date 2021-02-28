(function()
{
	// Canvas object
	const canvas	= document.getElementById(document.currentScript.getAttribute('canvas'));

	// Default resolution of the page.
	const	defaultWidth	= 1920;
	const	defaultHeight	= 1080;
	
	// Default image scale
	const	defaultScale	= document.currentScript.getAttribute('imageScale');
	const	defaultXOffset	= document.currentScript.getAttribute('offset');

	// 2D context of canvas
	const	context	= canvas.getContext('2d');

	// Image name
	const imageName	= document.currentScript.getAttribute('imageName');

	// Mascot image
	var	mascotImage		= null;
	
	// Resize the canvas to fill browser window dynamically
	window.addEventListener('resize', resizeCanvas, false);

	// Pre-load images and then draw the images
	window.addEventListener("DOMContentLoaded", preloadImages, true);

	function resizeCanvas()
	{
		render();
	}

	function preloadImages(event)
	{
		mascotImage		= new Image();
		mascotImage.src	= imageName;
		mascotImage.addEventListener("load", trackProgress, true);
	}

	function trackProgress()
	{
		resizeCanvas();
	}

	function render()
	{
		var rect	= canvas.getBoundingClientRect()
		
		canvas.width	= window.innerWidth;
		canvas.height	= window.innerHeight - rect.top;

		if (mascotImage != null)
		{
			var	scale		= window.innerHeight / defaultHeight * defaultScale;
			var	offsetScale	= window.innerWidth / defaultWidth;
			var	width		= mascotImage.width * scale;
			var	height		= mascotImage.height * scale;
			var	x			= (canvas.width - width) / 2 + (defaultXOffset * offsetScale);

			context.drawImage(mascotImage, x, 0, width, height);
		}
	}
})();
