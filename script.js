var draggableOptions = {stack: '.pic'}

// starts, when DOM is ready
$(function() {
	$('a.imgLink').each(function(e) {
		// preload image
		preLoadImage(this.href);
		$(this).click(function(e) {
			e.preventDefault(); 
			createImage(this.href, $(this).attr('alt') ? $(this).attr('alt') : "");
		});
	});
	
	preLoadImage("contact.jpg");
	$('a#contactLink').attr('href', $('a#contactLink').attr('href').replace('email at ', 'kontakt@'))
	$('a#contactLink').click(function(e) {
		e.preventDefault(); 
		createImage("contact.jpg", $(this).attr('alt').replace('email at ', 'kontakt@'));

	});
	
	photoMagic($('.pic'));
});

createImage = function(href, alt) {
	
	var left = 730 + Math.floor(Math.random()*36); // max-image-width: 450 (+20) + 36 = 508
	var top = 70 + Math.floor(Math.random()*36);
	if (alt) {
		var img = $('<div class="pic"><img src="' + href + '" /><p>'+alt+'</p></div>').css("top", "-500px").css("left", left + "px");
	} else {
		var img = $('<div class="pic"><img src="' + href + '" /></div>').css("top", "-500px").css("left", left + "px");
	}
	img.appendTo($('#pics')).animate({top: top + 'px'});
	photoMagic(img);
}

getLeft = function() {
	var documentWidth = $(document).width();
	if (documentWidth < 1238) {
		if (documentWidth < 558) {
			return 50;
		}
		return (documentWidth - 508);
	}
	return 730;
}
// preload images script from http://engineeredweb.com/blog/09/12/preloading-images-jquery-and-javascript [05/29/2011]
var cache = [];
preLoadImages = function() {
	var args_len = arguments.length;
	for (var i = args_len; i--;) {
	  var cacheImage = document.createElement('img');
	  cacheImage.src = arguments[i];
	  cache.push(cacheImage);
	}
}
preLoadImage = function(img) {
	var cacheImage = document.createElement('img');
	cacheImage.src = img;
	cache.push(cacheImage);
}

photoMagic = function(img) {
	img.draggable(draggableOptions);
	img.topZIndex();
	img.mousedown(function() {$(this).addClass('activePic'); $(this).topZIndex();});
	img.mouseup(function() {$(this).removeClass('activePic');});
}