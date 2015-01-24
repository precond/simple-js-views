/**
 * Created by juhana on 1/24/15.
 */


SimpleViews.page('home', function() {
    var button = document.getElementById('clickme');
    button.addEventListener('click',
        function() {
            alert('You did click me!');
        });
});


SimpleViews.page('home-jquery', function() {
    $('#clickme').on('click', function() {
        alert('You did click the jQuery button!');
    });
});
