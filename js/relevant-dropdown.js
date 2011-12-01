// Make jQuery's :contains case insensitive (like HTML5 datalist)
jQuery.expr[':'].contains = function(a, i, m) { 
  return jQuery(a).text().toUpperCase().indexOf(m[3].toUpperCase()) >= 0; 
};

$(function() {
	
	if (!Modernizr.input.list) {

		var doc = $(document);
	
		var $searchInput = $("#search");
		var searchPosition = $searchInput.position();
		var $datalist = $("#" + $searchInput.attr("list"));
		var datalistItems = $datalist.find("option");
		
		// Insert home for new fake datalist
		$("<ul />", {
			"class": "datalist",
			"id"   : $searchInput.attr("list")
		}).appendTo("body");
		
		// Remove old datalist
		$datalist.remove();
		
		// Update pointer
		var $datalist = $("#" + $searchInput.attr("list"));
		
		// Fill new fake datalist
		datalistItems.each(function() {
			$("<li />", {
				"text": $(this).val()
			}).appendTo($datalist);
		});
		
		// Update pointer
		var datalistItems = $datalist.find("li");
	
		// Typey type type
		doc
		    .on("keyup focus", "#search", function(e) {
		        								
    			$datalist
    					.show()
    					.css({
    						top: searchPosition.top + $(this).outerHeight(),
    						left: searchPosition.left,
    						width: $searchInput.outerWidth()
    					});
				
    			datalistItems.hide();		
    			$datalist.find("li:contains('" + $searchInput.val() + "')").show();
    				
    		})
    		.on("blur", "#search", function(){
    		  
					// If this fires immediately, it prevents click-to-select from working
					setTimeout(function() {
		        $datalist.fadeOut();
			    	datalistItems.removeClass("active"); 
					}, 500);
			    			    
		    });
		
		// Don't want to use :hover in CSS so doing this instead
		datalistItems.on("mouseenter", function() {
			$(this).addClass("active");
		});
		datalistItems.on("mouseleave", function() {
			$(this).removeClass("active");
		});
	
		// TODO
		$(window).resize(function() {
			// Move it
		});
		
		// Watch arrow keys for up and down
		doc.on("keydown", "#search", function(e) {	
						
			var active = $("li.active");
			
			// up arrow		
			if (e.keyCode == 38) {
				if (active.length) {
					prevAll = active.prevAll("li:visible");
					if (prevAll.length > 0) {
						active.removeClass("active");
						prevAll.eq(0).addClass("active");
					}
				}
			}
			// down arrow
			if (e.keyCode == 40) {
				if (active.length) {
					var nextAll = active.nextAll("li:visible");
					if (nextAll.length > 0) {
						active.removeClass("active");
						nextAll.eq(0).addClass("active");
					}
				} else {
					$datalist.find("li:first").addClass("active");
				}
			} 
			// return key
			if (e.keyCode == 13) {
				var active = $("li.active");
				if (active.length) {
					$searchInput.val(active.text());
				}
        $datalist.fadeOut();
    		datalistItems.removeClass("active");
			}
			
		});
		
		// When choosing from dropdown
		datalistItems.on("click", function() {
			var active = $("li.active");
			if (active.length) {
				$searchInput.val($(this).text());
			}
			$datalist.fadeOut();
			datalistItems.removeClass("active");
		});
	}

});