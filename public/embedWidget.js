(function() {
    // Create a new container for the widget
    var widgetContainer = document.createElement('div');
    widgetContainer.id = 'widget-root'; // Use a unique ID
    document.body.appendChild(widgetContainer);

    // Append CSS
    var css = document.createElement('link');
    css.href = 'http://localhost:3000/static/css/main.6d0d6734.css';
    css.rel = 'stylesheet';
    css.type = 'text/css';
    document.head.appendChild(css);

    // Append JavaScript
    var script = document.createElement('script');
    script.src = 'http://localhost:3000/static/js/main.b0d65869.js';
    script.async = true;
    document.body.appendChild(script);
})();
