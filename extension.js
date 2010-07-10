var overlay = $("<div id='link-overlay'>&nbsp;</div>");
$("body").append($(overlay));
var overlayHeight = 48; // Initially set to best guess - based on 13px font height, 30px bottom padding and 5px top padding
var overlayHeightCalculated = false;
$("a").live("mouseover", function(e) {
	if ( !overlayHeightCalculated && $(overlay).outerHeight() != 0 ) {
		overlayHeight = $(overlay).outerHeight();
		overlayHeightCalculated = true;
	}
	if ( e.clientY < $(window).height() - overlayHeight ) {
		$(overlay).css("top", "auto");
		$(overlay).css("bottom", "0");
	} else {
		$(overlay).css("top", "0");
		$(overlay).css("bottom", "auto");
	}
	$(overlay).text($(this).attr("href")).stop(true,false).animate({"opacity": 0.6}, "fast");
	if ( $(overlay).is(":hidden") ) {
		$(overlay).show();
	}
});
$("a").live("mouseleave", function(e) {
	$(overlay).animate({"opacity": 0.0});
});
$(overlay).mouseenter(function(e){
	$(this).hide();
});