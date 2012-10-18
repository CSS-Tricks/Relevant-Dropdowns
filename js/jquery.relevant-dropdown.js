(function($) {

  // Make jQuery's :contains case insensitive (like HTML5 datalist)
  // Changed the name to prevent overriding original functionality
  $.expr[":"].RD_contains = $.expr.createPseudo(function(arg) {
      return function( elem ) {
          return $(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
      };
  });

  $.fn.relevantDropdown = function(options) {

    options = $.extend({
      fadeOutSpeed: 'normal', // speed to fade out the dataList Popup
      change: null
    }, options);

    return this.each(function() {

      var $input = $(this),
          list_id = $input.attr('list'),
          $datalist = $("#" + list_id),
          datalistItems = $datalist.find("option"),

          searchPosition,
          scrollValue = 0,

          // Used to prevent reflow
          temp_items = document.createDocumentFragment(),
          temp_item = null;

      // Insert home for new fake datalist
      $("<ul />", {
        "class": "datalist",
        "id"   : list_id
      }).appendTo("body");

      // Remove old datalist
      $datalist.remove();

      // Update pointer
      $datalist = $("#" + list_id);

      // Fill new fake datalist
      datalistItems.each(function() {
        temp_item = $("<li />", {
				// .val is required here, not .text or .html
				// HTML *needs* to be <option value="xxx"> not <option>xxx</option>  (IE)
          "text": $(this).val()
        })[0];
        temp_items.appendChild(temp_item);
      });
      $datalist.append(temp_items);

      // Update pointer
      datalistItems = $datalist.find("li");

      // Typey type type
      $input
        .on("focus", function() {
          // Reset scroll
          $datalist.scrollTop(0);
          scrollValue = 0;
        })
        .on("blur", function() {
          // If this fires immediately, it prevents click-to-select from working
          setTimeout(function() {
            $datalist.fadeOut(options.fadeOutSpeed);
            datalistItems.removeClass("active");
          }, 500);
        })
        .on("keyup focus", function(e) {
          searchPosition = $input.position();
          // Build datalist
          $datalist
            .show()
            .css({
              top: searchPosition.top + $(this).outerHeight(),
              left: searchPosition.left,
              width: $input.outerWidth()
            });

          datalistItems.hide();
          $datalist.find("li:RD_contains('" + $input.val() + "')").show();
        });

      // Don't want to use :hover in CSS so doing this instead
      // really helps with arrow key navigation
      datalistItems
        .on("mouseenter", function() {
          $(this).addClass("active").siblings().removeClass("active");
        })
        .on("mouseleave", function() {
          $(this).removeClass("active");
        });

      // Window resize
      $(window).resize(function() {
        searchPosition = $input.position();
        $datalist
          .css({
            top: searchPosition.top + $(this).outerHeight(),
            left: searchPosition.left,
            width: $input.outerWidth()
          });
      });

      // Watch arrow keys for up and down
      $input.on("keydown", function(e) {

        var active = $datalist.find("li.active"),
            datalistHeight = $datalist.outerHeight(),
            datalistItemsHeight = datalistItems.outerHeight();

        // up arrow
        if ( e.keyCode == 38 ) {
          if (active.length) {
            prevAll = active.prevAll("li:visible");
            if (prevAll.length > 0) {
              active.removeClass("active");
              prevAll.eq(0).addClass("active");
            }

            if ( prevAll.length && prevAll.position().top < 0 && scrollValue > 0 ){
              $datalist.scrollTop(scrollValue-=datalistItemsHeight);
            }
          }
        }

        // down arrow
        if ( e.keyCode == 40 ) {
          if (active.length) {
            var nextAll = active.nextAll("li:visible");
            if (nextAll.length > 0) {
              active.removeClass("active");
              nextAll.eq(0).addClass("active");
            }

            if ( nextAll.length && (nextAll.position().top + datalistItemsHeight) >= datalistHeight ){
              $datalist.stop().animate({
                scrollTop: scrollValue += datalistItemsHeight
              }, 200);
            }
          } else {
            datalistItems.removeClass("active");
            $datalist.find("li:visible:first").addClass("active");
          }
        }

        // return or tab key
        if ( e.keyCode == 13 || e.keyCode == 9 ){
          if (active.length) {
            $input.val(active.text());
            item_selected(active.text());
          }
          $datalist.fadeOut(options.fadeOutSpeed);
          datalistItems.removeClass("active");
        }

        // keys
        if ( e.keyCode != 13 && e.keyCode != 38 && e.keyCode != 40 ){
          // Reset active class
          datalistItems.removeClass("active");
          $datalist.find("li:visible:first").addClass("active");

          // Reset scroll
          $datalist.scrollTop(0);
          scrollValue = 0;
        }

      });

      // When choosing from dropdown
      datalistItems.on("click", function() {
        var active = $("li.active");
        if (active.length) {
          $input.val($(this).text());
        }
        $datalist.fadeOut(options.fadeOutSpeed);
        datalistItems.removeClass("active");
        item_selected($(this).text());
      });

      function item_selected(new_text) {
        if( typeof options.change === 'function' )
          options.change.call(this, new_text);
      }

    });
  };
})(jQuery);