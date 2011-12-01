#Relevant Dropdown

##A HTML5 datalist polyfill that depends on jQuery and Modernizr.

Datalist browser support (Dec 2011) is Firefox 4+, Opera 10.6+, and IE 10. It's reasonable that you'd want WebKit support. So. This.

###Usage

Markup like this. IMPORTANT, use value attribute not text.

```
<input type="search" list="states" placeholder="Find U.S. State">

<datalist id="states">
	<option value="Alabama">
	<option value="Alaska">
  <!-- all states -->
</datalist>
```

You'll need the scripts:

```
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.0/jquery.min.js"></script>
<script src="js/modernizr.custom.50983.js"></script>
<script src="js/relevant-dropdown.js"></script>
```

On Line 12 of the relevant-dropdown.js file you can change the ID to your own search input's ID.

###TODO

- Make better
- Plugize / work on multiple inputs
- Better IE styling