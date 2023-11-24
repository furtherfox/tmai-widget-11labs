(function() {
    // Create a new container for the widget
    var widgetContainer = document.createElement('div');
    widgetContainer.id = 'widget-root'; // Use a unique ID
    document.body.appendChild(widgetContainer);

    // Use fixed filenames for CSS and JavaScript files
    var cssFilename = 'main.css';
    var jsFilename = 'main.js';

    // Construct the URLs with fixed filenames
    var cssUrl = 'https://tmai-widget.vercel.app/static/css/' + cssFilename;
    var jsUrl = 'https://tmai-widget.vercel.app/static/js/' + jsFilename;

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
})();
