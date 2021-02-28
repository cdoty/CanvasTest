(function()
{
	// Canvas object
	const	canvas	= document.getElementById(document.currentScript.getAttribute('canvas'));

	// Default resolution of the page.
	const	defaultWidth	= 1920;
	const	defaultHeight	= 1080;
	
	var	imageScale	= document.currentScript.getAttribute('imageScale');

	// Default image scale. The scale is applied to the image, and then the image is scaled based on the space left for the canvas.
	const	defaultScale	= (null == imageScale) ? 1.0 : imageScale;

	var	offset	= document.currentScript.getAttribute('offset');

	// Default image X offset, from the center of the image. Negative values offset to the left.
	const	defaultXOffset	= (null == offset) ? 0 : offset;

	// Image name
	const	imageName	= document.currentScript.getAttribute('imagePath');

	// 2D context of canvas
	const	context	= canvas.getContext('2d');

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
			var	offsetScale	= window.innerWidth / defaultWidth;
			var	scale		= window.innerHeight / defaultHeight;
			
			if (offsetScale < scale)
			{
				scale	= offsetScale;
			}

			scale	*= defaultScale;

			var	width	= resizedImage.width * scale;
			var	height	= resizedImage.height * scale;
			var	x		= (canvas.width - width) / 2 + (defaultXOffset * offsetScale);

			context.drawImage(resizedImage, x, 0, width, height);
		}
	}
})();
