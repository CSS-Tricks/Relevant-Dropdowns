#Relevant Dropdown

##A HTML5 datalist polyfill that depends on jQuery and Modernizr.

Datalist browser support (Dec 2011) is Firefox 4+, Opera 10.6+, and IE 10. It's reasonable that you'd want WebKit support. So. This.

### Usage without the Plugin

Markup like this. IMPORTANT, use value attribute not text.

```html
<input type="search" list="states" placeholder="Find U.S. State">

<datalist id="states">
	<option value="Alabama">
	<option value="Alaska">
  <!-- all states -->
</datalist>
```

You'll need the scripts:

```html
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.0/jquery.min.js"></script>
<script src="js/modernizr.custom.50983.js"></script>
<script src="js/relevant-dropdown.js"></script>
```

On Lines `[12, 42, 47, 55, 91]` of the relevant-dropdown.js file you can change the ID to your own search input's ID.

### Using the Plugin

Markup

```html
<input type="search" list="states" placeholder="Find U.S. State">

<datalist id="states">
	<option value="Alabama">
	<option value="Alaska">
  <!-- all states -->
</datalist>
```

Include jQuery, Modernizer and the Plugin:

```html
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.0/jquery.min.js"></script>
<script src="js/modernizr.custom.50983.js"></script>
<script src="js/jquery.relevant-dropdown.js"></script>
```

Using the Plugin

```html
<script>
    $('#names').relevantDropdown({
        fadeOutSpeed: 'normal', // optional, default: 'normal'
        change: function(new_text) {
            console.log('the new value is: ', new_text);
        }
    });
</script>
```

###TODO

- Would probably be better to only conditionally load the jQuery plugin if the Modernizr test fails
- Better IE styling (drop shadows don't work)
- Might be able to remove Modernizr and just test for support of list attribute in element