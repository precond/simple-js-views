# simple-js-views
Not a full MVC, but a simple and to-the-point utility for organizing and loading page-specific Javascript client code.

## Purpose and Philosophy
The reasoning behind this library is that there are web applications for which a full-blown client-side MVC
frameworks such as AngularJS would be an overkill. However, almost any page in the web today contains enough
Javascript to benefit from a clean, consistent way to organize and invoke those page specific functions.

This library does not handle models or client-side templating and even the controller aspect is quite shallow,
so if you are looking for those and/or writing a real single page application, you would be better off with
some other framework. However, if you write apps where pages are mostly constructed on the server side, but
still contain some intra-page dynamic functionality, ajax etc, this might be just for you.

The philosophy is to work from the simplest principles, and this library represents that in frontend coding.
Currently it has only page initialization hooks, but in the future it might evolve into something slightly
more sophisticated, providing helpers for some common patterns in general plumbing of a page.


## Usage Example
For this HTML page:

```html
<html>
  <head>
    <title>Simple JS views sample</title>
  </head>
  <body data-sv-init="home">
    <h1>This is a sample page</h1>
    <button id="clickme">Click me</button>

    <script src="js/simple-js-views.js"></script>
    <script src="js/pages.js"></script>
  </body>
</html>
```

You might have the following code (in `pages.js`):

```javascript
SimpleViews.registerInitializer('home', function() {
    var button = document.getElementById('clickme');
    button.addEventListener('click',
        function() {
            alert('You did click me!');
        });
});
```

The key is the `data-sv-init` attribute in the `<body>` element, which binds an initialization function to
the page. The role of the library is to look up this attribute on page load and execute the init function
if it is found (the init function receives the `body` element as `this`). There is no need to write any
inline javascript on the page, just load your script files in the bottom of the page as usual.


## Design goals
* Server-side framework agnostic; works on any HTML page generated in any server environment
* Client-side framework agnostic; specifically does not require jQuery (but does not exclude it, of course)
* Makes it possible to easily write page-specific Javascript code in organized manner
* Makes it possible to hook to that page-specific code non-intrusively in the HTML code
* Keep it simple for pages for which simple is sufficient
* Keep inline javascript out of HTML
