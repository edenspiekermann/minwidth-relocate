Read the blog post which describes these tools with a nice demo:

[http://edenspiekermann.com/en/blog/responsive-javascript-helpers](http://edenspiekermann.com/en/blog/responsive-javascript-helpers)

# minwidth.js

minwidth.js is a javascript library that helps you create fantastic mobile first websites. You provide a width at which your functions are called.

Several use-cases have occured so many times that it made sense to sort this problem out properly. One thing that happened to us often when designing mobile first web-sites is that some elements need to be in a different place in the DOM on wider screens. Another problem was loading certain scripts only desktop screens.

minwidth.js lets you bind to resize events on an advanced level. You provide a screen width and a callback function which is called whenever this width is crossed. You may provide another function which is called when the window is resized back below that width.

```js
minwidth(600, function() {
  doSomethingLikeLoadFacebook();
});
```

## interface

```js
minwidth(width, forwardCallback, backwardCallback, desktopFirst);
```

**width** specifies the breakpoint at which the callbacks should be fired.

**forwardCallback** is the function that is called if the screen is wider than than the width.

**backwardCallback** (optional) is the function that is called if the screen becomes smaller than than the width.

**desktopFirst** (optional) is a boolean which lets you specify that you want to work in a desktop-first fashion. If true, the backwardCallback is then called if the screen is initially smaller than the width, the forwardCallback will only be called if the screen becomes wider than the width, in this case you can pass *false* as an argument to the forwardCallback.

# relocate.js

relocate.js lets you move elements in the DOM from their original place to another when you can't do that desktop design with CSS media queries.

For example move selected items into the sidebar which are mixed into the regular page on mobile devices. 

```js
var elements = document.getElementsByClassName("movethis");
var sidebar = document.getElementById("sidebar");
relocate(480, elements, sidebar);
```

Note: IE8 and less don't have getElementsByClassName, you can use jQuery or this [getElementsByClassName polyfill](https://gist.github.com/2299607)

## interface

```js
relocate(width, elements, destinationElement, desktopFirst);
```

**width** specifies the breakpoint at which the elements should be relocated.

**elements** can be a single HTMLElement or an Array of HTMLElements, a NodeList or a HTMLCollection. They will be relocated.

**destinationElement** is the HTMLElement into which the elements will be relocated.

**desktopFirst** (optional) is a boolean which lets you specify that you want to work in a desktop-first fashion. If true, the elements will only be relocated if the screen is initially smaller or becomes smaller than the given width.

# Minification

    rm minwidth-relocate.min.js && cat *.js | uglifyjs -nc > minwidth-relocate.min.js

# License

The code is dual-licensed under the GNU General Public License Version 2 (GPLv2) and the MIT License.
