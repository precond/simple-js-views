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


## Usage Example: Basic
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


## Usage Example: Initializer on any element
The above example is simple enough for a page, which needs only one initializer function (and in practise is
little more than a glorified `<body onload="doMyStuff()">`). However, often when you render pages from
server-side nested templates, you tend to have more than one initializer: one for the base template, one for
an intermediate derived from the base and one for the actual page. In this case it is handy to be able to add
an initializer to any element on the page, not just `<body>`. For example:

```html
<html>
  <head>
    <title>Simple JS views sample</title>
  </head>
  <body data-sv-init="home">
    <h1>This is a sample page</h1>
    <p><button id="clickme">Click me</button><p>
    <p><button class="sv-init" data-sv-init="metoo">Click me, too</button></p>

    <script src="js/simple-js-views.js"></script>
    <script src="js/pages.js"></script>
  </body>
</html>
```

You can have two initializers (in `pages.js`):

```javascript
SimpleViews.registerInitializer('home', function() {
    var button = document.getElementById('clickme');
    button.addEventListener('click',
        function() {
            alert('You did click me!');
        });
});

SimpleViews.registerInitializer('metoo', function() {
    // Note that "this" is the element on which the initializer was added
    this.addEventListener('click',
        function() {
            alert('You clicked metoo button!');
        });
});
```

The trick is to add a magic `class="sv-init"` to the element in addition to the `data-sv-init` attribute.
(This is strictly for efficiency so that the library does not have to walk through the whole DOM to find
the initializer data attributes.) The initializer functions are executed in the order in which they appear
on the page; `<body>` initializer always first, however.


## Usage Example: Passing arguments
When pages are rendered from server-side templates, it is sometimes necessary to pass template variables as
arguments to javascript function. This often results in an awkward mix of javascript and template syntax, for
example `setupUserPanel({{ user.id }});`. Simple views library allows passing arguments to init functions from
HTML element attributes, whose name is prepended with `data-sv-arg-`, for example:

```html
<html>
  <head>
    <title>Simple JS views sample</title>
  </head>
  <body data-sv-init="home", data-sv-arg-msg="Hello!">
    <h1>This is a sample page</h1>
    <button id="clickme">Click me</button>

    <script src="js/simple-js-views.js"></script>
    <script src="js/pages.js"></script>
  </body>
</html>
```

The init function receives the arguments in an object passed as the first function argument (`data-sv-arg-`
prefix is stripped from the argument names):

```javascript
SimpleViews.registerInitializer('home', function(args) {
    var button = document.getElementById('clickme');
    button.addEventListener('click',
        function() {
            alert('You clicked me with message: ' + args.msg);
        });
});
```

The arguments would naturally be accessible directly from `this` element: `var msg = this.getAttribute('data-sv-init-msg');`,
but having them in a pre-parsed object makes the init function code slightly more concise.


## Usage Example: Invoke initializers manually
If your page loads HTML content dynamically for example via ajax calls, you might want to execute the
initializers on the newly loaded elements. SimpleViews provides a function for running the initializer
of given element (identified by its ID), so you could hook that to your ajax calls, for example:

```javascript
SimpleViews.registerInitializer('snippet', function(args) {
    do_my_thing();
});

$.ajax({
    url: '/load/',
    type: 'GET',
    dataType: 'html',
    success: function (data, status) {
        $('#dynamic_content').html(data);
        SimpleViews.executeInitializer('dynamic_snippet');
    }
});
```


## Design goals
* Server-side framework agnostic; works on any HTML page generated in any server environment
* Client-side framework agnostic; specifically does not require jQuery (but does not exclude it, of course)
* Makes it possible to easily write page-specific Javascript code in an organized way
* Makes it possible to hook to that page-specific code non-intrusively in the HTML code
* Keep it simple for pages for which simple is sufficient
* Get rid of inline javascript in HTML
