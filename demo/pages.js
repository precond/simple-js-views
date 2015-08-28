/**
 * Created by juhana on 1/24/15.
 */


SimpleViews.registerInitializer('home', function(args) {
    var button = document.getElementById('clickme');
    var pagename = this.getAttribute('data-sv-init');
    button.addEventListener('click',
        function() {
            alert('You clicked me on page "' + pagename + '" with message "' + args.msg + '"');
        });
});


SimpleViews.registerInitializer('metoo', function() {
    this.addEventListener('click',
        function() {
            alert('You clicked metoo button!');
        });
});


SimpleViews.registerInitializer('home-jquery', function() {
    $('#clickme').on('click', function() {
        alert('You clicked the jQuery button!');
    });
    $('#load_dynamic').on('click', function() {
        $.ajax({
            url: 'snippet.html',
            type: 'GET',
            dataType: 'html',
            success: function (data, status) {
                $('#dynamic_content').html(data);
                SimpleViews.executeInitializer('dynamic_snippet');
            }
        });
    });
});


SimpleViews.registerInitializer('snippet', function() {
    $('#dynamic').on('click', function() {
        alert('You clicked the dynamically loaded button!');
    });
});
