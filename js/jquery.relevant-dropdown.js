(function($) {
  // Check <datalist> and input[list] support
  var supportDatalist = (function(){
    var options     = 'options' in document.createElement('datalist');
    var listoptions = ('list' in document.createElement('input') && 'options' in document.createElement('datalist'));
    var globalobj   = !!window.HTMLDataListElement;
    var shivglobobj = !!(document.createElement('datalist') && window.HTMLDataListElement);

    if ( options && listoptions && globalobj && shivglobobj )
        return true;	        
  })();    

  // Make jQuery's :contains case insensitive (like HTML5 datalist)
  // Changed the name to prevent overriding original functionality
  $.expr[':'].RD_contains = function(a, i, m) { 
    return $(a).text().toUpperCase().indexOf(m[3].toUpperCase()) >= 0; 
  };
        
  function RD ( datalist ) {    
         
    this.datalistElem   = datalist;
    this.listID         = this.datalistElem.attr('id');
    this.inputElem      = $(' input[ list=' + this.listID + ' ] ');
    this.datalistItems  = this.datalistElem.find('option');
    
    this.inputPosition  = 0;
    this.scrollValue    = 0;    
    
    this.activeClass    = "RD_active";
    
    var self = this;

    // Used to prevent reflow
    var temp_items = document.createDocumentFragment();
    var temp_item = null;

    // Insert home for new fake datalist
    $("<ul />", {
      "class": "RD_datalist",
      "id"   : this.listID
    }).appendTo("body");

    // Remove old datalist
    this.datalistElem.remove();

    // Update pointer
    this.datalistElem = $("#" + this.listID);
    
    // Set datalist CSS        
    this.setCSS();        
    
    // Fill new fake datalist
    this.datalistItems.each(function() {
      temp_item = $("<li />", {
			// .val is required here, not .text or .html
			// HTML *needs* to be <option value="xxx"> not <option>xxx</option>  (IE)
        "text": $(this).val()   
      })[0];
      temp_items.appendChild(temp_item);
    });
    this.datalistElem.append(temp_items);

    // Update pointer
    this.datalistItems = this.datalistElem.find('li');

    // Typey type type
    this.inputElem
      .on('focus', function(){
        self.resetScroll();
      })    		
      .on('blur', function() {
        // If this fires immediately, setTimeout prevents click-to-select from working
        setTimeout(function() {
          self.hideIt();
        }, 500);
      })
      .on('keyup focus', function(e) {
        // Show datalist							
        self.datalistElem.show();
        
        // Search for
        self.datalistItems
          .hide()
          .filter(':RD_contains("' + self.inputElem.val() + '")').show();    				
      })
      // Watch arrow keys for up and down
      .on('keydown', function(e) {	

        var active = self.getActive();
        var datalistHeight = self.datalistElem.outerHeight();
        var datalistItemsHeight = self.datalistItems.outerHeight();

        // up arrow		
        if ( e.keyCode == 38 ) {
          if (active.length) {
            prevAll = active.prevAll("li:visible");
            if (prevAll.length > 0) {
              active.removeClass(self.activeClass);
              prevAll.eq(0).addClass(self.activeClass);
            }            

            if ( prevAll.length && prevAll.position().top < 0 && self.scrollValue > 0 ){
              self.datalistElem.scrollTop(self.scrollValue-=datalistItemsHeight);                        
            }                    
          }
        }

        // down arrow
        if ( e.keyCode == 40 ) {
          if (active.length) {
            var nextAll = active.nextAll("li:visible");
            if (nextAll.length > 0) {
              active.removeClass(self.activeClass);
              nextAll.eq(0).addClass(self.activeClass);
            }                 

            if ( nextAll.length && (nextAll.position().top + datalistItemsHeight) >= datalistHeight ){
              self.datalistElem.scrollTop(self.scrollValue+=datalistItemsHeight);
            }                    
          } else {			    
            self.datalistItems.removeClass(self.activeClass);
            self.datalistElem.find("li:visible:first").addClass(self.activeClass);	
          }		    
        }

        // return or tab key
        if ( e.keyCode == 13 || e.keyCode == 9 ){
          if (active.length) {
            self.setValue( active.text() );
          }
          self.hideIt();
        }

        // keys
        if ( e.keyCode != 13 && e.keyCode != 38 && e.keyCode != 40 ){
          // Reset active class
          self.datalistItems.removeClass(self.activeClass);
          self.datalistElem.find("li:visible:first").addClass(self.activeClass);

          self.resetScroll();		    
        }

      });

    // Don't want to use :hover in CSS so doing this instead
    // really helps with arrow key navigation
    this.datalistItems
      .on('mouseenter', function() {
        $(this).addClass(self.activeClass).siblings().removeClass(self.activeClass);
      })
      .on('mouseleave', function() {
        $(this).removeClass(self.activeClass);
      })
      // When choosing from dropdown
      .on("click", function() {
       var active = self.getActive();
       
        if (active.length) {
          self.setValue( $(this).text() );
        }
        self.hideIt();
      });

    // Window resize
    $(window).resize(function() {   
      self.setCSS();
    });		

  }// end RD

  // Set datalist CSS
  RD.prototype.setCSS = function () { 
    this.datalistElem.css({
      top: this.inputElem.position().top + this.inputElem.outerHeight(),
      left: this.inputElem.position().left,
      width: this.inputElem.outerWidth()
    });
  }
  
  // Get active element
  RD.prototype.getActive = function() {
    return this.datalistElem.find('.' + this.activeClass);
  }
  
  // Set input value
  RD.prototype.setValue = function( value ) {
    this.inputElem.val( value );
  }
  
  // Hide datalist
  RD.prototype.hideIt = function () { 
    this.datalistElem.fadeOut();
    this.datalistItems.removeClass(this.activeClass); 
  }

  // Reset datalist scroll
  RD.prototype.resetScroll = function () {
    this.datalistElem.scrollTop(0);    					
    this.scrollValue = 0;        
  }
  
  // If don't support datalist
  if ( !supportDatalist ) {
    // Each <datalist>
    $('datalist').each(function() {        
      if (!$.data(this, 'relevantDropdown')) {
          $.data(this, 'relevantDropdown', new RD( $(this) ));
      }
    });
  } // endif
  
})(jQuery);