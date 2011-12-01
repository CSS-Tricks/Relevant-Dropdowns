#Relevant Dropdown

##A HTML5 datalist polyfill that depends on jQuery and Modernizr.

Datalist browser support (Dec 2011) is Firefox 4+ and Opera 10.5+ (or therebouts). Maybe IE 10 too. It's reasonable that you'd want WebKit support. So. This.

###Usage

Markup like this:

```
<input type="search" list="states" placeholder="Find U.S. State">

<datalist id="states">
	<option>Alabama</option>
  <option>Alaska</option>
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
- Move position of dropdown when window resized
- Plugize / work on multiple inputs