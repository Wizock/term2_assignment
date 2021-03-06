var ResizeEvents = {
	baseTextHeight: null,
	currentTextHeight: null,
	baseWindowWidth: null,
	baseWindowHeight: null,
	currentWindowWidth: null,
	currentWindowHeight: null,
	initialised: false,
	intervalReference: null,
	textSizeTestElement: null,
	eventElement: $(document),
	conf: {
		textResizeEvent: "x-text-resize",
		windowResizeEvent: "x-window-resize",
		windowWidthResizeEvent: "x-window-width-resize",
		windowHeightResizeEvent: "x-window-height-resize",
		initialResizeEvent: "x-initial-sizes",
		pollFrequency: 500,
		textSizeTestElId: "text-resize"
	}
};
(function (a) {
	ResizeEvents.bind = function (b, c) {
		a(function () {
			if (ResizeEvents.initialised !== true) {
				ResizeEvents.initialise()
			}
		});
		ResizeEvents.eventElement.bind(b, c)
	};
	ResizeEvents.initialise = function () {
		if (ResizeEvents.initialised === true) {
			return
		}
		ResizeEvents.textSizeTestElement = a('<span id="' + ResizeEvents.conf.textSizeTestElId + '" style="position: absolute; left: -9999px; font-size: 100%; font-family: Courier New, mono; margin: 0; padding: 0;">&nbsp;</span>').get(0);
		a("body").append(ResizeEvents.textSizeTestElement);
		windowWidthNow = a(window).width();
		windowHeightNow = a(window).height();
		textHeightNow = getTextHeight();
		ResizeEvents.baseTextHeight = textHeightNow;
		ResizeEvents.currentTextHeight = textHeightNow;
		ResizeEvents.baseWindowWidth = windowWidthNow;
		ResizeEvents.currentWindowWidth = windowWidthNow;
		ResizeEvents.baseWindowHeight = windowHeightNow;
		ResizeEvents.currentWindowHeight = windowHeightNow;
		if (ResizeEvents.intervalReference == null) {
			ResizeEventsPoll();
			ResizeEvents.intervalReference = window.setInterval("ResizeEventsPoll()", ResizeEvents.conf.pollFrequency)
		}
		ResizeEvents.eventElement.trigger(ResizeEvents.conf.initialResizeEvent, [emPixelNow, textHeightNow, windowWidthNow, windowHeightNow]);
		ResizeEvents.initialised = true
	};
	ResizeEventsPoll = function () {
		windowWidthNow = a(window).width();
		windowHeightNow = a(window).height();
		textHeightNow = getTextHeight();
		emPixelNow = windowWidthNow / textHeightNow;
		widthChanged = false;
		if (ResizeEvents.currentWindowWidth != windowWidthNow) {
			ResizeEvents.eventElement.trigger(ResizeEvents.conf.windowWidthResizeEvent, [emPixelNow, textHeightNow, windowWidthNow, windowHeightNow]);
			ResizeEvents.eventElement.trigger(ResizeEvents.conf.windowResizeEvent, [emPixelNow, textHeightNow, windowWidthNow, windowHeightNow]);
			ResizeEvents.currentWindowWidth = windowWidthNow;
			widthChanged = true
		}
		if (ResizeEvents.currentWindowHeight != windowHeightNow) {
			ResizeEvents.eventElement.trigger(ResizeEvents.conf.windowHeightResizeEvent, [emPixelNow, textHeightNow, windowWidthNow, windowHeightNow]);
			if (!widthChanged) {
				ResizeEvents.eventElement.trigger(ResizeEvents.conf.windowResizeEvent, [emPixelNow, textHeightNow, windowWidthNow, windowHeightNow])
			}
			ResizeEvents.currentWindowHeight = windowHeightNow
		}
		if (ResizeEvents.currentTextHeight != textHeightNow) {
			ResizeEvents.eventElement.trigger(ResizeEvents.conf.textResizeEvent, [emPixelNow, textHeightNow, windowWidthNow, windowHeightNow]);
			ResizeEvents.currentTextHeight = textHeightNow
		}
	};
	getTextHeight = function () {
		return ResizeEvents.textSizeTestElement.offsetHeight + ""
	}
})(jQuery);
(function (a) {
	a.transformer = function (b) {
		b = jQuery.extend({
			addClasses: false
		}, b);
		a("body").data("transformer-layout-options", b);
		if (a.support.mediaQueries()) {
			if (a.browser.webkit && ResizeEvents) {
				ResizeEvents.bind("x-window-width-resize x-text-resize", zoomEventSupplement)
			}
			if (b.addClasses) {
				initMediaQuerySupplement();
				ResizeEvents.bind("x-initial-sizes x-text-resize x-window-width-resize", updateBodyClasses)
			}
		} else {
			if (ResizeEvents) {
				initMediaQuerySupplement();
				ResizeEvents.bind("x-initial-sizes x-text-resize x-window-width-resize", resizeEventSupplement)
			}
		}
		ResizeEvents.initialise()
	};
	resizeEventSupplement = function () {
		options = a("body").data("transformer-layout-options");
		a(".current-media-query-stylesheet").remove();
		a("head link").each(function () {
			a(this).attr("href", a(this).attr("href"))
		});
		processEachStylesheet(addClasses = options.addClasses, addLinks = true)
	};
	updateBodyClasses = function () {
		processEachStylesheet(addClasses = true, addLinks = false)
	};
	processEachStylesheet = function (e, c) {
		e = e || false;
		c = c || false;
		currentWindowWidth = a(window).width();
		if (e) {
			a("body").removeClass(a("body").data("current-layout-names")).data("current-layout-names", "")
		}
		for (var d = 0, b = a.transformer.styles.length; d < b; d++) {
			minPx = (a.transformer.styles[d].minUnit != "em" || a.transformer.styles[d].min === 0) ? a.transformer.styles[d].min : a.emToPx(a.transformer.styles[d].min);
			maxPx = (a.transformer.styles[d].maxUnit != "em" || a.transformer.styles[d].max === 0) ? a.transformer.styles[d].max : a.emToPx(a.transformer.styles[d].max);
			if (a.browser.msie && a.browser.version < 7 && a.transformer.styles[d].minUnit == "em" && currentWindowWidth < 200) {
				minPx = (typeof minPx == "undefined" || minPx === 0) ? minPx : 200
			}
			if (((!(minPx && minPx > currentWindowWidth) && !(maxPx && maxPx < currentWindowWidth)) || (!maxPx && !minPx))) {
				if (c) {
					currentLink = a(a.transformer.styles[d].obj);
					currentLink.after('<link type="' + currentLink.attr("type") + '" rel="' + currentLink.attr("rel") + '" media="' + a.transformer.styles[d].medium + '" href="' + currentLink.attr("href") + '" class="current-media-query-stylesheet" />')
				}
				if (e) {
					a("body").addClass(a.transformer.styles[d].layout).data("current-layout-names", a("body").data("current-layout-names") + " " + a.transformer.styles[d].layout)
				}
			}
		}
	};
	a.emToPx = function (b) {
		if (typeof Number.prototype.pxToEm == "undefined") {
			if (console && console.log) {
				console.log("em value conversion failed. pxToEm could not be found. Returning em value unconverted.")
			}
			return b
		}
		return parseInt(b.pxToEm({
			reverse: true
		}), 10)
	};
	initMediaQuerySupplement = function () {
		a.transformer.styles = [];
		a("link[rel*=style],style").each(parseStylesheets)
	};
	parseStylesheets = function () {
		var m = a(this).attr("media"),
			c = /\(\s*min-width\s*:\s*(\d+)(px|em)\s*\)/,
			h = /\(\s*max-width\s*:\s*(\d+)(px|em)\s*\)/,
			l, o, j, p, g, d, b = ["handheld", "all", "screen", "projection", "tty", "tv", "print"],
			n, k = [];
		m = (!m) ? ["all"] : m.split(",");
		layoutname = parseLayoutNameFromPath(a(this).attr("href"));
		a(this).data("media", a(this).attr("media"));
		for (var e = 0, f = m.length; e < f; e++) {
			n = a.arrayInString(m[e], b);
			if (n != -1) {
				if (!l) {
					l = c.exec(m[e]);
					if (l) {
						o = parseInt(l[1], 10);
						j = l[2]
					}
				}
				if (!p) {
					p = h.exec(m[e]);
					if (p) {
						g = parseInt(p[1], 10);
						d = p[2]
					}
				}
				k.push(b[n])
			}
		}
		if (l || p) {
			a.transformer.styles.push({
				obj: this,
				layout: layoutname,
				min: o,
				minUnit: j,
				max: g,
				maxUnit: d,
				medium: k.join(",")
			})
		}
	};
	parseLayoutNameFromPath = function (b) {
		if ((slashIndex = b.lastIndexOf("/")) != -1) {
			b = b.substring(slashIndex + 1)
		}
		return b.replace(".css", "")
	};
	zoomEventSupplement = function () {
		triggerRecalc = a('<style type="text/css">');
		a("head").prepend(triggerRecalc).remove(triggerRecalc)
	};
	a.arrayInString = function (d, b) {
		var c = -1;
		a.each(b, function (e, f) {
			if (d.indexOf(f) != -1) {
				c = e;
				return false
			}
		});
		return c
	};
	a.extend(a.support, {
		mediaQueries: function () {
			a("body").append(a('<div id="jquery-test-media-query">').css({
				visibility: "hidden",
				position: "absolute"
			}));
			a("head").prepend('<style type="text/css" media="only all" id="jquery-test-media-query-style">');
			styleS = document.styleSheets[0];
			if (styleS.cssRules || styleS.rules) {
				if (styleS.insertRule) {
					styleS.insertRule("#jquery-test-media-query {display:none !important;}", styleS.cssRules.length)
				} else {
					if (styleS.addRule) {
						styleS.addRule("#jquery-test-media-query", "display:none")
					}
				}
			}
			querySupported = a("#jquery-test-media-query").css("display") === "none";
			a("#jquery-test-media-query, #jquery-test-media-query-style").remove();
			return querySupported
		}
	})
})(jQuery);
Number.prototype.pxToEm = String.prototype.pxToEm = function (b) {
	b = jQuery.extend({
		scope: "body",
		reverse: false
	}, b);
	var e = (this == "") ? 0 : parseFloat(this);
	var d;
	var c = function () {
		var g = document.documentElement;
		return self.innerWidth || (g && g.clientWidth) || document.body.clientWidth
	};
	if (b.scope == "body" && $.browser.msie && (parseFloat($("body").css("font-size")) / c()).toFixed(1) > 0) {
		var f = function () {
			return (parseFloat($("body").css("font-size")) / c()).toFixed(3) * 16
		};
		d = f()
	} else {
		d = parseFloat(jQuery(b.scope).css("font-size"))
	}
	var a = (b.reverse == true) ? (e * d).toFixed(2) + "px" : (e / d).toFixed(2) + "em";
	return a
};