var overlay = $("<div id='link-overlay'></div>");
$("body").append($(overlay));
$("a").live("mouseover", function(e) {
	if ( e.clientY < $(window).height() - 60 ) {
		$(overlay).text($(this).attr("href")).stop(true,false).animate({"opacity": 0.6},"fast");
		if ( $(overlay).is(":hidden") ) {
			$(overlay).show();
		}
	}
});
$("a").live("mouseleave", function(e) {
	$(overlay).animate({"opacity": 0.0});
});
$(overlay).mouseenter(function(e){
	$(this).hide();
});