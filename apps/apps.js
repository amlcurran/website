this.appsView = function(prototype) {

    var appsHolder = document.querySelector('#apps-holder');

    var setText = function(node, text) {
        node.innerText = text;
        node.textContent = text;
    };

    var createAppItem = function(app) {
        var talkImport = document.querySelector('#talk-chunk-import').import;
        var appDiv = talkImport.querySelector('#talk-chunk').cloneNode(true);
        setText(appDiv.querySelector('#talk-title'), app.title);
        setText(appDiv.querySelector('#talk-blurb'), app.blurb);
        if (app.banner) {
            setText(appDiv.querySelector('#banner'), app.banner);
        } else {
            appDiv.querySelector('#banner').style.display = 'none';
        }
        if (app.online) {
            setText(appDiv.querySelector('#talk-link-1'), app.online.place);
            appDiv.querySelector('#talk-link-1').href = app.online.url;
        }
        if (app.image) {
            appDiv.querySelector('#talk-image').style.backgroundImage = 'url(\'' + app.image + '\')';
        }
        appDiv.querySelector('#talk-link-2').style.display = 'none';
        return appDiv;
    };

    var createLargerItem = function(app) {
        var appDiv = createAppItem(app);
        removeClass(appDiv, 'card');
        addClass(appDiv, 'large-card');
        return appDiv;
    }

    var addViews = function(json) {
        var apps = json.apps;
        for (i = 0; i < apps.length; i++) {
            var app = apps[i];
            if (isWithinFilter(app.tags)) {
                if ((i + 1) % 3 == 0) {
                    appsHolder.appendChild(createLargerItem(app));
                } else {
                    appsHolder.appendChild(createAppItem(app));
                }
            }
        }
    };

    var isWithinFilter = function(tagsArray) {
        var queryParams = window.location.hash;
        if (!hasFilter()) {
            return true;
        }
        if (hasFilter() && tagsArray) {
            var regex = new RegExp(".*?filter=(.*)").exec(queryParams);
            for (var i = 0; i < tagsArray.length; i++) {
                if (regex[1] === tagsArray[i]) {
                    return true;
                }
            }
        }
        return false;
    }

    var hasFilter = function() {
        return window.location.hash.indexOf("?filter") !== -1;
    }

    return function() {

        var returnee = Object.create(prototype);
        returnee.loaded = function(talks) {

            var filter = document.querySelector('#apps-filter');
            if (hasFilter()) {
                filter.style.display = 'block';
            } else {
                filter.style.display = 'none';
            }
            if (document.querySelector('#talk-chunk-import').import) {
                addViews(talks);
            } else {
                window.addEventListener('HTMLImportsLoaded', function() {
                    addViews(talks);
                });
            }

        };

        return returnee;

    }();

};
