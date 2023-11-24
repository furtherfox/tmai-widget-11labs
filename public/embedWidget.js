(function() {
    // Create a new container for the widget
    var widgetContainer = document.createElement('div');
    widgetContainer.id = 'widget-root'; // Use a unique ID
    document.body.appendChild(widgetContainer);

    // Fetch the asset manifest
    fetch('/asset-manifest.json') // Update with the actual path
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        // Get the actual filenames for CSS and JavaScript from the manifest
        var cssFilename = data['static/css/main.css'];
        var jsFilename = data['static/js/main.js'];

        // Construct the URLs with the retrieved filenames
        var cssUrl = 'https://tmai-widget.vercel.app/' + cssFilename;
        var jsUrl = 'https://tmai-widget.vercel.app/' + jsFilename;

        // Append CSS
        var css = document.createElement('link');
        css.href = cssUrl;
        css.rel = 'stylesheet';
        css.type = 'text/css';
        document.head.appendChild(css);

        // Append JavaScript
        var script = document.createElement('script');
        script.src = jsUrl;
        script.async = true;
        document.body.appendChild(script);
    })
    .catch(function(error) {
        console.error('Error fetching asset manifest:', error);
    });
})();
