# Relevant Dropdown

## A HTML5 datalist polyfill that depends on jQuery and Modernizr.

Datalist browser support (Dec 2011) is Firefox 4+, Opera 10.6+, and IE 10. It's reasonable that you'd want WebKit support. So. This.

### Example HTML5 Markup

```html
<input type="search" list="states" placeholder="Find U.S. State">

<datalist id="states">
	<option value="Alabama">
	<option value="Alaska">
  <!-- all states -->
</datalist>
```

### Include jQuery and Modernizr in head of document

```html
<script src="js/jquery-1.7.1.js"></script>
<script src="js/modernizr.custom.50983.js"></script>
```

### Run the Modernizr test, and load polyfill stuff if needed

```html
<script>
	yepnope({
	  test : (!Modernizr.input.list || (parseInt($.browser.version) > 400)),
	  yep : [
	      'js/jquery.relevant-dropdown.js',
	      'js/load-fallbacks.js'
	  ]
	});
</script>
```

load-fallbacks.js calls the plugin. Example contents:

```js
$('#search').relevantDropdown();

$('#name').relevantDropdown({
  fadeOutSpeed: 0, // optional, default: 'normal;
	change: function(new_text) {
      console.log('the new value is: ', new_text);
  }
});
```

### TODO

- Better IE styling (drop shadows don't work)
- Remove Modernizr and jQuery dependencies (make totally standalone)
