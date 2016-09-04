var langHeight;
var langIsSliding = false;

function lang_slide() {
	if(langIsSliding) return false;
	 
	langIsSliding = true;
	 
	if ($('#lang_bar').hasClass('extended')) {
		$('#lang_bar .languages').delay(200).animate({
			'height': 0
		}, $('#lang_bar .languages').height()*7,function(){
			$('#lang_bar ul').css({
				'display': 'none'
			});
			$('#lang_bar').removeClass('extended');
			langIsSliding = false;
		});
		
		$('body').unbind('click');
	}
	else {
		$('#lang_bar').addClass('extended');
		 
		$('#lang_bar .languages').css({
			'height': 0, 
			'display': 'block'
		});
		$('#lang_bar .languages').animate({
			'height': langHeight
		}, langHeight*7, function(){ 
			langIsSliding = false; 
		});
		$('body').bind('click', lang_slide);
	}
}

$(document).ready(function(){
	langHeight = $('#lang_bar .languages').height();
	
	$('#lang_bar').click(lang_slide);
	
	$('.tooltip').qtip({
		position: {
			my: 'bottom center',
			at: 'top center'
		},
		style: {
			classes: 'qtip-tipsy'
		},
		show: {
			delay: 0,
			effect: false
		},
		hide: {
			delay: 0,
			effect: false
		}
	});
	
	$('a.disabled').click(function(e) {
		e.preventDefault();
	});
	
	// Social box
	$('#social-toggler').click(function() {
		$(this).toggleClass('active');
		if ($(this).hasClass('active')) {
			$('#social-box').fadeIn();
		}
		else {
			$('#social-box').fadeOut();
		}
	});
	
	
	// Facebook Actions
	if (FB && FB.Event && FB.Event.subscribe) {
		// Likes
		FB.Event.subscribe('edge.create', function(targetUrl) {
			ga('send', 'social', 'facebook', 'like', targetUrl);
		});

		// Unlikes
		FB.Event.subscribe('edge.remove', function(targetUrl) {
			ga('send', 'social', 'facebook', 'unlike', targetUrl);
		});
	}
});

function loadCss(name) {
	var el = document.createElement("link");
	el.setAttribute("rel", "stylesheet");
	el.setAttribute("type", "text/css");
	el.setAttribute("href", name);
	document.getElementsByTagName("head")[0].appendChild(el);
}

function showFbLikeBox() {
	var fbl = $('#fb-like-box');
	$(fbl).show();
	$(fbl).animate({'right' : 10}, 400);
	setTimeout(function() {
		localStorage.isShownLikeBox = 1;
	}, 7 * 1000);
}

function hideFbLikeBox() {
	var fbl = $('#fb-like-box');
	$(fbl).fadeOut(400);
	localStorage.isShownLikeBox = 1;
	localStorage.isClosedLikeBox = 1;
}


if (typeof localStorage.firstVistDate === 'undefined') {
	localStorage.showLikeBox = 1;
	var dateObj = new Date();
	localStorage.firstVistDate = dateObj.toGMTString();
}
else if(typeof localStorage.showLikeBox === 'undefined') {
	localStorage.showLikeBox = 0;
}

if (typeof localStorage.isShownLikeBox === 'undefined') {
	localStorage.isShownLikeBox = 0;
}

if (localStorage.showLikeBox == 1 && localStorage.isShownLikeBox == 0) {
	setTimeout(function() {
		showFbLikeBox();
	}, 18 * 1000);
}