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
	const imageName	= document.currentScript.getAttribute('imagePath');

	// Resized image
	var	resizedImage	= null;
	
	// Resize the canvas to fill browser window dynamically
	window.addEventListener('resize', render, false);

	// Pre-load images
	window.addEventListener("DOMContentLoaded", preloadImage, true);

	function preloadImage(event)
	{
		resizedImage		= new Image();
		resizedImage.src	= imageName;
		resizedImage.addEventListener("load", render, true);
	}

	function render()
	{
		var rect	= canvas.getBoundingClientRect()
		
		canvas.width	= window.innerWidth;
		canvas.height	= window.innerHeight - rect.top;

		if (resizedImage != null)
		{
			var	scale		= window.innerHeight / defaultHeight * defaultScale;
			var	offsetScale	= window.innerWidth / defaultWidth;
			var	width		= resizedImage.width * scale;
			var	height		= resizedImage.height * scale;
			var	x			= (canvas.width - width) / 2 + (defaultXOffset * offsetScale);

			context.drawImage(resizedImage, x, 0, width, height);
		}
	}
})();
