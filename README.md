# simple-js-views
Not a full MVC, but a very simple and to-the-point utility for organizing Javascript client code specific to a page.

## Purpose
This is a library for those applications which do not event try to be SPAs, yet have enough page-specific
Javascript code to warrant some well-defined way to organize the code and hook it to the page. This library
does not handle models or client-side templating and even the controller aspect is quite shallow, so if you
are looking for those, you would be better off with some other framework.

## Design goals
* Server-side framework agnostic; works on any HTML page
* Client-side framework agnostic; specifically does not require jQuery, but does not exclude it either
* Makes it possible to easily organize page-specific Javascript code in same place, off the page
* Makes it possible to hook to that page-specific code non-intrusively in the HTML code
* Keep it simple for pages for which simple is sufficient

## Example
For this HTML page:

```html
<html>
  <head>
    <title>Simple JS views sample</title>
  </head>
  <body simple-page-name="home">
    <h1>This is a sample page</h1>
    <button id="clickme">Click me</button>

    <script src="js/simple-js-views.js"></script>
    <script src="js/pages-concatenated.js"></script>
  </body>
</html>
```

You might have the following JS file:

```javascript
SimpleViews.page('home', function() {
    var button = document.getElementById('clickme');
    button.addEventListener('click',
        function() {
            alert('You did click me!');
        });
});
```

The key is the "simple-page-name" attribute in the <body> element, which binds the page initialization
function to the page. The role of the framework is to look up this attribute on page load and execute
the init function if it is found.
