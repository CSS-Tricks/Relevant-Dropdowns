jQuery.expr[':'].contains = function(a, i, m) { 
  return jQuery(a).text().toUpperCase().indexOf(m[3].toUpperCase()) >= 0; 
};

$(function() {

	var doc = $(document);
	
	var search1 = $("#search-1");
	var searchPosition1 = search1.position();
	var datalist1 = $("#datalist-1");
	var datalist1items = datalist1.find("li");
	
	doc.on("keyup", "#search-1", function(e) {
		
		datalist1
				.show()
				.css({
					top: searchPosition1.top + $(this).outerHeight(),
					left: searchPosition1.left,
					width: search1.outerWidth()
				})
				.mouseleave(function() {
					datalist1.fadeOut();
				});
				
		datalist1items.hide();
		
		datalist1.find("li:contains('" + search1.val() + "')").show();
	
	});

});