(function() {
    // Function to extract query parameters from the script src
    function getQueryParam(param) {
        var script = document.currentScript || document.scripts[document.scripts.length - 1];
        var url = new URL(script.src);
        return url.searchParams.get(param);
    }

    var token = getQueryParam('token');
    var defaultLanguage = getQueryParam('default_language') || 'English';
    var defaultVoice = getQueryParam('default_voice') || 'XrExE9yKIg1WjnnlVkGX';
    var placement = getQueryParam('placement') || 'left';


    // Create a container for the widget
    var widgetContainer = document.createElement('div');
    widgetContainer.id = 'widget-root';
    widgetContainer.setAttribute('data-token', token); // Store the token as a data attribute
    widgetContainer.setAttribute('data-default-language', defaultLanguage);
    widgetContainer.setAttribute('data-default-voice', defaultVoice);

    document.body.appendChild(widgetContainer);

    // Fetch the asset manifest
    fetch('https://tmai-widget-11labs.vercel.app/asset-manifest.json')
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        // Get the actual filenames for CSS and JavaScript from the manifest
        var cssFilename = data.files['main.css'];
        var jsFilename = data.files['main.js'];

        // Base URL for your assets
        var baseUrl = 'https://tmai-widget-11labs.vercel.app/';

        // Construct the URLs with the retrieved filenames
        var cssUrl = baseUrl + cssFilename;
        var jsUrl = baseUrl + jsFilename;

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
