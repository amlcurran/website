this.appsView = function(prototype) {

    var appsHolder = document.querySelector('#apps-holder');
    var filter = "";

    var setText = function(node, text) {
        node.innerText = text;
        node.textContent = text;
    };

    var renderTags = function(appDiv, app, tags) {
        var bannerImport = document.querySelector('#banner-import').import.querySelector("#banner");
        for (var i = 0; i < app.tags.length; i++) {
            var newBanner = createBanner(bannerImport, app.tags[i], tags);
            var baseBottom = newBanner.style.bottom.replace("px", "");
            var newBottom = 30 * (i + 1);
            newBanner.style.bottom = newBottom + "px";
            appDiv.querySelector('#talk-image').appendChild(newBanner);
        }

    }

    var createBanner = function(bannerImport, tagId, tagNames) {
        var newBanner = bannerImport.cloneNode(true);
        setText(newBanner, tagNames[tagId].name);
        return newBanner;
    }

    var lowlightTags = function() {
        return function(event) {
            var banners = event.target.querySelectorAll('#banner');
            for (var i = 0; i < banners.length; i++) {
                banners[i].style.opacity = 0.3;
            }
        }
    }

    var highlightTags = function() {
        return function(event) {
            var banners = event.target.querySelectorAll('#banner');
            for (var i = 0; i < banners.length; i++) {
                banners[i].style.opacity = 1.0;
            }
        }
    }

    var createAppItem = function(app, tags) {
        var talkImport = document.querySelector('#talk-chunk-import').import;
        var appDiv = talkImport.querySelector('#talk-chunk').cloneNode(true);
        setText(appDiv.querySelector('#talk-title'), app.title);
        setText(appDiv.querySelector('#talk-blurb'), app.blurb);
        if (app.tags) {
            renderTags(appDiv, app, tags);
        }
        if (app.online) {
            setText(appDiv.querySelector('#talk-link-1'), app.online.place);
            appDiv.querySelector('#talk-link-1').href = app.online.url;
        }
        if (app.image) {
            var imageDiv = appDiv.querySelector('#talk-image');
            imageDiv.style.backgroundImage = 'url(\'' + app.image + '\')';
            imageDiv.addEventListener('mouseenter', lowlightTags());
            imageDiv.addEventListener('mouseleave', highlightTags());
        }
        appDiv.querySelector('#talk-link-2').style.display = 'none';
        return appDiv;
    };

    var createLargerItem = function(app, tags) {
        var appDiv = createAppItem(app, tags);
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
                    appsHolder.appendChild(createLargerItem(app, json.tags));
                } else {
                    appsHolder.appendChild(createAppItem(app, json.tags));
                }
            }
        }
    };

    var isWithinFilter = function(tagsArray) {
        if (!hasFilter()) {
            return true;
        }
        if (hasFilter() && tagsArray) {
            for (var i = 0; i < tagsArray.length; i++) {
                if (filter === tagsArray[i]) {
                    return true;
                }
            }
        }
        return false;
    }

    var hasFilter = function() {
        return filter !== "";
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
