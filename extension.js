var overlay = $("<div id='link-overlay'>&nbsp;</div>");
$("body").append($(overlay));
var overlayHeight = 55; // Initially set to best guess - based on 13px font height, 30px bottom padding and 10px top padding
$("a[href],area[href]").live("mouseover", function(e) {
	if ( $(overlay).outerHeight() != 0 ) {
		overlayHeight = $(overlay).outerHeight();
	}
	if ( e.clientY < $(window).height() - overlayHeight ) {
		$(overlay).css("top", "auto");
		$(overlay).css("bottom", "0");
	} else {
		$(overlay).css("top", "0");
		$(overlay).css("bottom", "auto");
	}
	var handlerText = $(this).attr("href");
	$(overlay).text(handlerText).stop(true,false).animate({"opacity": 0.6}, "fast");
	if ( $(overlay).is(":hidden") ) {
		$(overlay).show();
	}
	$(".chrome-link-viewer-extension").removeClass("chrome-link-viewer-extension");
	$(this).addClass("chrome-link-viewer-extension");
	var script = $("<script type='text/javascript' charset='utf-8'>\
		if ( typeof(jQuery) !== 'undefined' ) {\
			var events = $('.chrome-link-viewer-extension').data('events');\
			if ( events ) {\
				var clicks = events.click;\
				if ( clicks ) {\
					var eventSource = '<ul>';\
					jQuery.each(clicks, function(name, value) {\
						var txt = '' + value.handler;\
						txt = txt.replace(/&/g,'&amp;');\
						txt = txt.replace(/</g,'&lt;');\
						txt = txt.replace(/>/g,'&gt;');\
						txt = txt.replace(/\\n/g,'<br/>');\
						txt = txt.replace(/\\t/g,'&nbsp;&nbsp;');\
						txt = txt.replace(/ /g,'&nbsp;');\
						eventSource = eventSource + '<li>' + txt + '</li>';\
					});\
					eventSource = eventSource + '</ul>';\
					$('.chrome-link-viewer-extension').attr('data-events', eventSource);\
				}\
			}\
		}\
	</script>");
	$("body").append($(script));
	setTimeout(function(){
		var events = $('.chrome-link-viewer-extension').attr("data-events");
		$(".chrome-link-viewer-extension").removeClass("chrome-link-viewer-extension");
		if ( events ) {
			$(overlay).append($(events));
		}
	}, 10);
});
$("a[href],area[href]").live("mouseleave", function(e) {
	$(overlay).animate({"opacity": 0.0});
});
$(overlay).mouseenter(function(e){
	$(this).hide();
});
