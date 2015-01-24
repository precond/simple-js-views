/**
 * Created by juhana on 1/24/15.
 */


SimpleViews.page('home', function() {
    var button = document.getElementById('clickme');
    var pagename = this.getAttribute('data-sv-page-name');
    button.addEventListener('click',
        function() {
            alert('You did click me on page "' + pagename + '"');
        });
});


SimpleViews.page('home-jquery', function() {
    $('#clickme').on('click', function() {
        alert('You did click the jQuery button!');
    });
});
