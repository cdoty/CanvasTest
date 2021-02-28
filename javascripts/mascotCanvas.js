(function()
{
	// Element above the canvas
	const priorElement	= document.getElementById('introText');
	
	// Canvas object
	const canvas		= document.getElementById('mascotCanvas');

	// Default resolution of the page.
	const	defaultWidth	= 1920;
	const	defaultHeight	= 1080;
	
	// Default image scale
	const	defaultScale	= 1.0;

	// 2D context of canvas
	const	context	= canvas.getContext('2d');

	// Mascot image
	var	mascotImage		= null;
	
	// Preload variables
	var	loadedImages	= 0;
	var	requiredImages	= 1;
	
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
		mascotImage.src	= "images/mascot.png";
		mascotImage.addEventListener("load", trackProgress, true);
	}

	function trackProgress()
	{
		loadedImages++;

		if (loadedImages == requiredImages)
		{
			resizeCanvas();
		}
	}

	function render()
	{
		if (priorElement != null)
		{
			var rect	= priorElement.getBoundingClientRect()
			
			canvas.width	= window.innerWidth;
			canvas.height	= window.innerHeight - rect.bottom;

			if (mascotImage != null)
			{
				var	scale	= window.innerHeight / defaultHeight * defaultScale;
				var	width	= mascotImage.width * scale;
				var	height	= mascotImage.height * scale;
				var	x		= (canvas.width - width) / 2;

				context.drawImage(mascotImage, x, 0, width, height);
			}
		}
	}
})();
