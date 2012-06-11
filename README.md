# minwidth.js

minwidth.js is a javascript library that helps you create fantastic mobile first websites. You provide a width at which your functions are called.

Several use-cases have occured so many times that it made sense to sort this problem out properly. One thing that happened to us often when designing mobile first web-sites is that some elements need to be in a different place in the DOM on wider screens. Another problem was loading certain scripts only desktop screens.

minwidth.js lets you bind to resize events on an advanced level. You provide a screen width and a callback function which is called whenever this width is crossed. You may provide another function which is called when the window is resized back below that width.

    minwidth(600, function() {
      doSomethingLikeLoadFacebook();
    });

# relocate.js

relocate.js lets you move elements in the DOM from their original place to another when you can't do that desktop design with CSS media queries.

For example move selected items into the sidebar which are mixed into the regular page on mobile devices. Pass it a width and an Array, a NodeList or a HTMLCollection of HTML elements and a target element where to relocate the elements to.

    var elements = document.getElementsByClassName("movethis");
    relocate(480, elements, document.getElementById("sidebar"));

Note: IE8 and less don't have getElementsByClassName, you can use jQuery or this [getElementsByClassName polyfill](https://gist.github.com/2299607)

# Minification

    rm minwidth-relocate.min.js && cat *.js | uglifyjs -nc > minwidth-relocate.min.js

# License

The code is dual-licensed under the GNU General Public License Version 2 (GPLv2) and the MIT License.
