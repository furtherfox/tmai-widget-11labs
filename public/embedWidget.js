(function() {
    // Create a new container for the widget
    var widgetContainer = document.createElement('div');
    widgetContainer.id = 'widget-root'; // Use a unique ID
    document.body.appendChild(widgetContainer);

    // Append CSS
    var css = document.createElement('link');
    css.href = 'https://tmai-widget.vercel.app/static/css/main.6d0d6734.css';
    css.rel = 'stylesheet';
    css.type = 'text/css';
    document.head.appendChild(css);

    // Append JavaScript
    var script = document.createElement('script');
    script.src = 'https://tmai-widget.vercel.app/static/js/main.0b046156.js';
    script.async = true;
    document.body.appendChild(script);
})();
