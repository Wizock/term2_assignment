if (typeof jQuery == "undefined") {
	if (console && console.log) {
		console.log("Keyboard Focus plugin could not be initialised because jQuery is not available")
	}
} else {
	jQuery.keyFocus = {};
	jQuery.keyFocus.conf = {
		keyFocusClass: "keyboard-focus",
		mouseFocusClass: "mouse-focus",
		focusClass: "focus",
		mouseTimeout: 50
	};
	(function (a) {
		a(document).ready(function () {
			a("body").trackFocus()
		});
		a.fn.trackFocus = function () {
			a(this).data("last-device-used", "");
			a(this).bind("mousedown", function (b) {
				a(this).data("last-device-used", "mouse");
				a(this).data("last-device-used-when", new Date().getTime())
			}).bind("keydown", function (b) {
				a(this).data("last-device-used", "keyboard")
			}).bind("focusin", function (b) {
				if (a(this).data("last-device-used") != "mouse" || new Date().getTime() - 50 > a(this).data("last-device-used-when")) {
					a(b.target).addClass(a.keyFocus.conf.keyFocusClass)
				} else {
					a(b.target).addClass(a.keyFocus.conf.mouseFocusClass)
				}
				a(b.target).addClass(a.keyFocus.conf.focusClass)
			}).bind("focusout", function (b) {
				a("." + a.keyFocus.conf.keyFocusClass + ", ." + a.keyFocus.conf.mouseFocusClass).removeClass(a.keyFocus.conf.keyFocusClass + " " + a.keyFocus.conf.mouseFocusClass);
				a(b.target).removeClass(a.keyFocus.conf.focusClass)
			})
		}
	})(jQuery)
}(function (d) {
	var c = "http://www.w3.org/2005/07/aaa";
	var g = ["main", "secondary", "navigation", "banner", "contentinfo", "statements", "note", "seealso", "search"];
	var a = new RegExp("^" + g.join("|") + "$");
	var f = ["button", "checkbox", "columnheader", "combobox", "grid", "gridcell", "group", "listbox", "listitem", "menu", "menubar", "menuitem", "menuitemcheckbox", "menuitemradio", "option", "radio", "radiogroup", "row", "rowheader", "slider", "spinbutton", "tab", "tabpanel", "textbox", "toolbar", "tree", "treegrid", "treeitem"];
	var e = new RegExp("^(wairole:)?" + f.join("|") + "$");
	var b = (function () {
		if (d.browser.mozilla && parseFloat(d.browser.version) < 1.9) {
			return function (j, h, i) {
				if (typeof i != "undefined") {
					j.each(function (k, l) {
						l.setAttributeNS(c, h, i)
					})
				} else {
					return j.get(0).getAttributeNS(c, h)
				}
			}
		} else {
			return function (j, h, i) {
				if (typeof i != "undefined") {
					j.each(function (k, l) {
						d(l).attr("aria-" + h, i)
					})
				} else {
					return j.attr("aria-" + h)
				}
			}
		}
	})();
	d.fn.extend({
		ariaRole: function (i) {
			var h = this;
			if (i) {
				i = a.test(i) ? i : "wairole:" + i;
				h.each(function (j, k) {
					d(k).attr("role", i);
					if (e.test(i) && k.tabIndex < 0) {
						k.tabIndex = 0
					}
				});
				return h
			} else {
				var i = h.eq(0).attr("role");
				if (i) {
					i = i.replace(/^wairole:/, "")
				}
				return i
			}
		},
		ariaState: function () {
			var h = arguments;
			var i = this;
			if (h.length == 2) {
				i.each(function (j, k) {
					b(d(k), h[0], h[1])
				});
				return i
			} else {
				if (typeof h[0] == "string") {
					return b(i.eq(0), h[0])
				} else {
					i.each(function (j, k) {
						d.each(h[0], function (l, m) {
							d(k).ariaState(l, m)
						})
					});
					return i
				}
			}
		},
		ariaParse: function () {
			var h = this;
			h.find("*").filter(".axs").each(function (l, m) {
				var n = d(m).attr("className").split(/\s+/);
				var k = false;
				var j = false;
				d.each(n, function (o, p) {
					if (p == "axs") {
						k = true;
						return true
					}
					if (k) {
						if (j) {
							var q = p.split(/-/);
							d(m).ariaState(q[0], q[1] || "true")
						} else {
							d(m).ariaRole(p);
							j = true
						}
					}
				})
			});
			h.trigger("ariaready");
			return h
		}
	});
	d.extend(d.expr[":"], {
		ariaRole: "jQuery(a).ariaRole()==m[3]",
		ariaState: "jQuery(a).ariaState(m[3].split(/=/)[0])==(/=/.test(m[3])?m[3].split(/=/)[1]:'true')"
	});
	d(document).ready(function () {
		d(document).ariaParse()
	})
})(jQuery);
DOM_VK_END = 35;
DOM_VK_HOME = 36;
DOM_VK_LEFT = 37;
DOM_VK_UP = 38;
DOM_VK_RIGHT = 39;
DOM_VK_DOWN = 40;
DOM_VK_ENTER = 14;
DOM_VK_RETURN = 13;
DOM_VK_ESCAPE = 27;
jQuery.AKN = {
	DIRECTION_PREV: 0,
	DIRECTION_NEXT: 1,
	DIRECTION_FIRST: 2,
	DIRECTION_LAST: 3,
	ORDER_NORMAL: 1,
	ORDER_REVERSE: 0
};
jQuery.AKN.defaultOptions = {
	controlOrder: jQuery.AKN.ORDER_NORMAL,
	rememberActiveControl: true,
	ignoreKeys: [],
	keyHandlers: {},
	role: "toolbar",
	controlRole: "button"
};
jQuery.AKN.conf = {
	controlsetClass: "controlset",
	regionClass: "region",
	controlClass: "control",
	ariaFocusClass: "aria-focus"
};
(function (b) {
	regionCount = 0;
	controlCount = 0;
	b.fn.managefocus = function (d, c) {
		if (typeof c == "undefined") {
			c = {}
		}
		if (typeof c.controlRole == "undefined" || c.controlRole == "") {
			switch (b.trim(c.role)) {
			case "menubar":
			case "toolbar":
				c.controlRole = "button";
				break;
			case "tablist":
				c.controlRole = "tab";
				break;
			case "menu":
				c.controlRole = "menuitem";
				break;
			default:
				break
			}
		}
		c = (typeof c == "undefined") ? b.AKN.defaultOptions : b.extend({}, b.AKN.defaultOptions, c);
		b(this).addClass(b.AKN.conf.controlsetClass).data("controlSelector", d).data("options", c).each(initManageFocus);
		return b(this)
	};
	initManageFocus = function () {
		controlSelector = b(this).data("controlSelector");
		options = b(this).data("options");
		if (b(this).attr("id") == "") {
			b(this).attr("id", "controlset-" + regionCount++)
		}
		if (typeof b(this).ariaRole() == "undefined") {
			b(this).ariaRole(options.role)
		}
		b(this).attr("tabindex", -1);
		b(this).find(controlSelector).each(function () {
			if (b(this).attr("id") == "") {
				controlCount++;
				b(this).attr("id", b.AKN.conf.controlClass + "-" + controlCount)
			}
			if (typeof b(this).ariaRole() == "undefined") {
				b(this).ariaRole(options.controlRole)
			}
			b(this).attr("tabindex", -1).addClass(b.AKN.conf.controlClass)
		});
		if (options.controlOrder == b.AKN.ORDER_NORMAL) {
			defaultControl = b(this).find(controlSelector + ":first")
		} else {
			defaultControl = b(this).find(controlSelector + ":last")
		}
		defaultControl.attr("tabindex", 0);
		b(this).bind("keydown", handleKeyDownEvent).bind("focusin", handleFocusInEvent)
	};
	handleKeyDownEvent = function (c) {
		currentControl = b(c.target);
		evtKeyCode = a(c);
		if (c.ctrlKey || c.altKey || c.shiftKey || c.metaKey) {
			return true
		}
		containerEl = currentControl.closest("." + b.AKN.conf.controlsetClass);
		options = containerEl.data("options");
		if (b.inArray(evtKeyCode, options.ignoreKeys) != -1) {
			processKeyHandlers(containerEl, options.keyHandlers, c);
			return true
		}
		switch (evtKeyCode) {
			default: return true;
			break;
		case DOM_VK_UP:
		case DOM_VK_LEFT:
			direction = (options.controlOrder == b.AKN.ORDER_NORMAL) ? b.AKN.DIRECTION_PREV : b.AKN.DIRECTION_NEXT;
			break;
		case DOM_VK_DOWN:
		case DOM_VK_RIGHT:
			direction = (options.controlOrder == b.AKN.ORDER_NORMAL) ? b.AKN.DIRECTION_NEXT : b.AKN.DIRECTION_PREV;
			break;
		case DOM_VK_HOME:
			direction = (options.controlOrder == b.AKN.ORDER_NORMAL) ? b.AKN.DIRECTION_FIRST : b.AKN.DIRECTION_LAST;
			break;
		case DOM_VK_END:
			direction = (options.controlOrder == b.AKN.ORDER_NORMAL) ? b.AKN.DIRECTION_LAST : b.AKN.DIRECTION_FIRST;
			break
		}
		c.preventDefault();
		currentControl.focusNextControl(direction)
	};
	processKeyHandlers = function (e, d, c) {
		evtKeyCode = a(c);
		if (evtKeyCode in d) {
			for (keyCode in d) {
				if (keyCode == evtKeyCode) {
					d[keyCode].apply(e.get(0), [c])
				}
			}
		}
	};
	handleFocusInEvent = function (c) {
		focused = b(c.target);
		containerEl = b(this);
		if (containerEl.attr("id") == focused.attr("id")) {
			containerEl.find("*[tabindex=0]").first().focus();
			return
		}
		allControls = containerEl.find(containerEl.data("controlSelector"));
		allControls.not(focused).attr("tabindex", -1);
		focused.attr("tabindex", 0);
		if (b("body").data("akn-last-focused-controlset") != b(this).attr("id")) {
			b("body").data("akn-last-focused-controlset", b(this).attr("id"));
			options = containerEl.data("options");
			if (options.rememberActiveControl) {
				return
			} else {
				direction = (options.controlOrder == b.AKN.ORDER_NORMAL) ? b.AKN.DIRECTION_FIRST : b.AKN.DIRECTION_LAST;
				firstControl = b(focused).findNextControl(direction);
				if (focused.attr("id") == firstControl.attr("id")) {
					return
				}
				c.preventDefault();
				focused.shiftFocus(firstControl)
			}
		}
	};
	b.fn.focusNextControl = function (c) {
		return b(this).shiftFocus(b(this).findNextControl(c))
	};
	b.fn.findNextControl = function (c) {
		containerEl = b(this).closest("." + b.AKN.conf.controlsetClass);
		allControls = containerEl.find(containerEl.data("controlSelector")).filter(":visible");
		currentControlIndex = allControls.index(b(this));
		switch (c) {
			default:
		case b.AKN.DIRECTION_NEXT:
			return (currentControlIndex + 1 < allControls.size()) ? allControls.eq(currentControlIndex + 1) : allControls.eq(0);
			break;
		case b.AKN.DIRECTION_PREV:
			return (currentControlIndex - 1 >= 0) ? allControls.eq(currentControlIndex - 1) : allControls.eq(allControls.size() - 1);
			break;
		case b.AKN.DIRECTION_FIRST:
			return allControls.eq(0);
			break;
		case b.AKN.DIRECTION_LAST:
			return allControls.eq(allControls.size() - 1);
			break
		}
	};
	b.fn.shiftFocus = function (c) {
		if (b(this).attr("id") == c.attr("id")) {
			return b(this)
		}
		c.attr("tabindex", 0).focus();
		b(this).attr("tabindex", -1);
		return b(this)
	};
	b.fn.controls = function (c) {
		b(this).each(function () {
			elementList = "";
			b(c).each(function () {
				if (b(this).attr("id") == "") {
					regionCount++;
					b(this).attr("id", b.AKN.conf.regionClass + "-" + regionCount)
				}
				elementList += " " + b(this).attr("id")
			});
			if (elementList != "") {
				b(this).addClass(b.AKN.conf.regionClass).ariaState("controls", b.trim(elementList))
			}
		});
		return b(this)
	};
	b.fn.controlsParent = function (c) {
		b(this).each(function () {
			b(this).controls(b(this).closest(c))
		});
		return b(this)
	};

	function a(c) {
		c = c || window.event;
		if (c.keyCode) {
			return c.keyCode
		} else {
			if (c.which) {
				return c.which
			}
		}
		return null
	}
})(jQuery);
if (typeof jQuery != "undefined") {
	(function (a) {
		landmarkLabelCount = 1;
		a.fn.labelledBy = function (b) {
			a(this).data("labelled-by-selector", b);
			a(this).each(initLabelledBy)
		};
		initLabelledBy = function () {
			labelledBySelector = a(this).data("labelled-by-selector");
			label = a(this).find(labelledBySelector).first();
			if (label.size() == 0) {
				label = a(labelledBySelector).first()
			}
			if (label.size() == 0) {
				return
			}
			if (label.attr("id") == "") {
				label.attr("id", "landmark-label-" + landmarkLabelCount++)
			}
			a(this).ariaState("labelledby", label.attr("id"))
		}
	})(jQuery)
}
if (typeof (jQuery) != "undefined") {
	(function (c) {
		var b = function (d) {
			if (c(d.target).is(".qg-cue-widget-container > a")) {
				if ((d.keyCode == DOM_VK_LEFT && c(d.target).find("img").attr("alt") == "[-]") || (d.keyCode == DOM_VK_RIGHT && c(d.target).find("img").attr("alt") == "[+]")) {
					c(d.target).parent().find(".qg-cue-widget").trigger("click")
				}
			}
		};
		var a = {};
		a[DOM_VK_LEFT] = a[DOM_VK_RIGHT] = b;
		c("#nav-section").click(function (d) {
			var f = c(d.target).closest("a");
			var e = (f.find("img").attr("alt") || "").replace(/^.*\[([+-])\].*$/, "$1");
			switch (e) {
			case "+":
				f.nextAll("ul").stop(true, true).show().end().html('<img src="/static/cue/images/minus-flat.png" alt="[-]" /><span class="title">Close the ' + f.next().text() + " submenu</span>");
				return false;
			case "-":
				f.nextAll("ul").stop(true, true).hide().end().html('<img src="/static/cue/images/plus-flat.png" alt="[+]" /><span class="title">Open the ' + f.next().text() + " submenu</span>");
				return false
			}
		}).keypress(function (d) {
			if (d.ctrlKey || d.shiftKey || d.altKey || d.metaKey) {
				return true
			}
			switch (d.charCode) {
			case 42:
				c('#nav-section img[alt="[+]"]').closest("a").trigger("click");
				return false
			}
			var e = String.fromCharCode(d.charCode).toUpperCase();
			if (e.match(/[A-Z]/)) {
				c(d.target).nextAll().add(c(d.target).parentsUntil("#nav-section").nextAll()).find("a:visible").filter(function () {
					return c(this).text().charAt(0).toUpperCase() == e
				}).eq(0).focus()
			}
			return true
		}).managefocus("a", {
			role: "menu",
			ignoreKeys: [DOM_VK_LEFT, DOM_VK_RIGHT],
			keyHandlers: a
		});
		if (typeof (currentPageTitle) == "undefined") {
			currentPageTitle = c("#content h1").text()
		}
		c("#nav-section ul a").filter(function () {
			return c(this).text() == currentPageTitle
		}).parents("li").addClass("qg-cue-widget-container").each(function () {
			var d = c(this);
			d.prepend('<a href="#nav-section" class="qg-cue-widget"><img src="/static/cue/images/minus-flat.png" alt="[-]" /><span class="title">Close the ' + d.children("a").text() + " submenu</span></a>")
		});
		c("#nav-section li:not(.qg-cue-widget-container) ul").parent().addClass("qg-cue-widget-container").each(function () {
			var d = c(this);
			d.prepend('<a href="#nav-section" class="qg-cue-widget"><img src="/static/cue/images/plus-flat.png" alt="[+]" /><span class="title">Open the ' + d.children("a").text() + " submenu</span></a>")
		}).end().hide()
	})(jQuery)
}
if (typeof jQuery != "undefined") {
	(function (a) {
		a.fn.qgDropDown = function () {
			a(this).each(initDropDown)
		};
		initDropDown = function () {
			toplist = a(this).is("ul, ol") ? a(this) : a(this).find("ul, ol").first();
			if (toplist.size() == 0) {
				console && console.log && console.log("Debug: Unable to initialise qgDropDown menu, no list was found within the target element " + a(this).selector);
				return
			}
			keyHandlers = {};
			keyHandlers[DOM_VK_LEFT] = handleLeftKeyEvent;
			keyHandlers[DOM_VK_RIGHT] = handleRightKeyEvent;
			keyHandlers[DOM_VK_ESCAPE] = handleEscKeyEvent;
			toplist.data("timeoutID", null).addClass("qg-drop-down").children("li").bind("mouseenter focus focusin", openCurrentMenu).bind("mouseleave blur focusout", closeCurrentMenu).managefocus("a:not(ul ul ul a)", {
				role: "menu",
				ignoreKeys: [DOM_VK_LEFT, DOM_VK_RIGHT, DOM_VK_ESCAPE],
				keyHandlers: keyHandlers,
				rememberActiveControl: false
			}).each(function () {
				if (a(this).find("ul").size() > 0) {
					a(this).addClass("parent")
				} else {
					a(this).addClass("single")
				}
				indent = 20;
				parentWidth = a(this).children("a").first().outerWidth(true);
				childWidth = a(this).children("ul").first().width();
				if (parentWidth > childWidth) {
					a(this).children("ul").first().width(parentWidth + indent)
				}
			})
		};
		openCurrentMenu = function (b) {
			toplist = a(this).closest(".qg-drop-down");
			if ((timeoutID = toplist.data("timeoutID")) != null) {
				window.clearTimeout(timeoutID);
				toplist.data("timeoutID", null)
			}
			closeAllOpenMenus();
			currentLI = a(this).closest(".qg-drop-down > li");
			currentLI.addClass("hover").css("z-index", 2);
			childMenu = currentLI.children("ul").first();
			if (childMenu.size() > 0) {
				currentLI.children("a").removeClass("parent").addClass("open");
				if (childMenu.offset().left + childMenu.outerWidth(true) > toplist.parent().offset().left + toplist.parent().width()) {
					childMenu.addClass("right-edge")
				}
			}
		};
		closeCurrentMenu = function () {
			tid = window.setTimeout(closeAllOpenMenus, 300);
			a(this).closest(".qg-drop-down").data("timeoutID", tid)
		};
		closeAllOpenMenus = function () {
			a(".qg-drop-down").data("timeoutID", null).find("li.hover").css("z-index", 1).add("ul").add("a.open").removeClass("hover open right-edge")
		};
		handleLeftKeyEvent = function (b) {
			toBeFocused = a(this).prev().children("a");
			if (toBeFocused.size() == 0) {
				toBeFocused = a(this).siblings().last().children("a")
			}
			toBeFocused.attr("tabindex", 0).focus()
		};
		handleRightKeyEvent = function (b) {
			toBeFocused = a(this).next().children("a");
			if (toBeFocused.size() == 0) {
				toBeFocused = a(this).siblings().first().children("a")
			}
			toBeFocused.attr("tabindex", 0).focus()
		};
		handleEscKeyEvent = function (b) {
			a(this).children("a").attr("tabindex", 0).focus();
			closeAllOpenMenus()
		}
	})(jQuery)
}
if (typeof jQuery != "undefined") {
	$.fn.printLinkURLs = function () {
		printLinkMaxURLLength = printLinkMaxURLLength || 200;
		$(this).filter("a").each(function () {
			linkHref = this.href;
			if (linkHref.length > printLinkMaxURLLength) {
				linkHref = this.protocol + "//" + this.hostname
			}
			$(this).after('<small class="print-link-url"> ( ' + linkHref + " )</small>")
		})
	}
}
if (typeof jQuery != "undefined") {
	(function (a) {
		a.enhancePageOptions = function () {
			if (a("#pre-page-options, #post-page-options, #page-feedback").size() == 0) {
				return
			}
			if (a("#pre-page-options").size() > 0) {
				addEmailOption();
				addPrintOption();
				populateShare()
			}
			if (a("#post-page-options").size() == 0) {
				postPageOptions = a('<div class="page-options" id="post-page-options"><ul></ul></div>');
				if (a("#page-feedback").size() > 0) {
					a("#page-feedback").before(postPageOptions)
				} else {
					a("#document-properties, .aside:last, #content, .article").first().after(postPageOptions)
				}
			}
			duplicateOptionsToPost();
			addFeedbackOption()
		};
		addEmailOption = function () {
			a("#pre-page-options > ul").prepend('<li><a href="#email" id="share-by-email" title="Email this page to a friend">Email</a></li>');
			pageTitle = a("h1").first().text();
			pageURL = window.location + "";
			a("#share-by-email").attr("href", "mailto:?subject=" + pageTitle + "&body=" + pageTitle + " (read more at: " + pageURL + " )")
		};
		addPrintOption = function () {
			printFriendlyLink = a("#pre-page-options > ul > li > a").filter(function () {
				return a(this).text() == "Printable version" ? true : false
			});
			if (printFriendlyLink.size() == 0) {
				a("#pre-page-options > ul").prepend('<li><a href="#print" id="print-page" title="Print this page">Print</a></li>')
			}
			a("#print-page").click(function () {
				window.print();
				return false
			})
		};
		populateShare = function () {
			shareLink = a("#pre-page-options > ul > li > a").filter(function () {
				return a(this).text() == "Share" ? true : false
			});
			pageTitle = encodeURIComponent(a("h1").first().text());
			shareLink.each(function () {
				if (a(this).siblings("ul").size() == 0) {
					a(this).attr("href", a(this).attr("href") + "?title=" + pageTitle).after('<ul><li><a href="http://www.qld.gov.au/share/?via=twitter&title=' + pageTitle + '">Twitter</a></li><li><a href="http://www.qld.gov.au/share/?via=facebook&title=' + pageTitle + '">Facebook</a></li><li><a href="http://www.qld.gov.au/share/?via=delicious&title=' + pageTitle + '">Delicious</a></li><li><a href="http://www.qld.gov.au/share/?via=reddit&title=' + pageTitle + '">Reddit</a></li><li><a href="http://www.qld.gov.au/share/?via=digg&title=' + pageTitle + '">Digg</a></li><li><a href="http://www.qld.gov.au/share/?title=' + pageTitle + '">More...</a></li></ul>')
				}
			})
		};
		duplicateOptionsToPost = function () {
			a("#post-page-options > ul").append(a("#pre-page-options > ul > li").clone(true))
		};
		addFeedbackOption = function () {
			if (a("#page-feedback").size() > 0) {
				a("#page-feedback").hide();
				sectionTitle = a("#page-feedback").find(":header:first").text();
				a("#post-page-options > ul").prepend('<li><a href="#page-feedback" id="page-feedback-toggle">' + sectionTitle + "</a></li>");
				a("#page-feedback-toggle").data("feedbackSectionTitle", sectionTitle).click(toggleFeedbackSection)
			}
		};
		toggleFeedbackSection = function () {
			if (!a("#page-feedback").is(":visible")) {
				a(this).addClass("open").attr("title", 'Hide the "' + a(this).data("feedbackSectionTitle") + '" section');
				a("#page-feedback").fadeIn().find("form:first").attr("tabindex", 0).focus()
			} else {
				a(this).removeClass("open").attr("title", a(this).data("feedbackSectionTitle"));
				a("#page-feedback").fadeOut().find("form:first").attr("tabindex", -1)
			}
			return false
		}
	})(jQuery)
}
if (typeof jQuery != "undefined") {
	(function (b) {
		var c = ['<span lang="ar">??????????????</span>', '<span lang="el">????????????????</span>', '<span lang="pl">Polski</span>', '<span lang="bs">Bosanksi</span>', '<span lang="id">Bahasa Indonesia</span>', '<span lang="ru">??????????????</span>', '<span lang="zh">??????</span>', '<span lang="it">Italiano</span>', '<span lang="sr">????????????</span>', '<span lang="hr">Hrvatski</span>', '<span lang="ja">?????????</span>', '<span lang="es">Espa??ol</span>', '<span lang="fr">Fran??ais</span>', '<span lang="ko">?????????</span>', '<span lang="tl">Tagalog</span>', '<span lang="de">Deutsch</span>', '<span lang="fa">??????????</span>', '<span lang="vi">Ti???ng Vi???t</span>'];
		var a = document.doctype ? document.doctype.publicId : document.firstChild.data;
		var d = a.indexOf("XHTML") > 0;
		updateLanguage = function () {
			b("#languages a").empty().append(c[Math.floor(Math.random() * c.length)] + " (Other languages)");
			if (d) {
				b("#languages span").attr("xml:lang", b("#languages span").attr("lang"))
			}
		};
		updateLanguage();
		window.setInterval(updateLanguage, 5000)
	})(jQuery)
}
if (typeof jQuery != "undefined") {
	(function (a) {
		fatFooterLeftKeyEvent = function (b) {
			toBeFocused = a(this).prev().find("a[tabindex=0]");
			if (toBeFocused.size() == 0) {
				toBeFocused = a(this).siblings(".section").last().find("a[tabindex=0]")
			}
			toBeFocused.attr("tabindex", 0).focus()
		};
		fatFooterRightKeyEvent = function (b) {
			toBeFocused = a(this).next().find("a[tabindex=0]");
			if (toBeFocused.size() == 0) {
				toBeFocused = a(this).siblings(".section").first().find("a[tabindex=0]")
			}
			toBeFocused.attr("tabindex", 0).focus()
		};
		ffooterKeyHandlers = {};
		ffooterKeyHandlers[DOM_VK_LEFT] = fatFooterLeftKeyEvent;
		ffooterKeyHandlers[DOM_VK_RIGHT] = fatFooterRightKeyEvent;
		a("#fat-footer .section").managefocus("a", {
			role: "menu",
			ignoreKeys: [DOM_VK_LEFT, DOM_VK_RIGHT],
			keyHandlers: ffooterKeyHandlers
		})
	})(jQuery)
}
if (typeof jQuery == "undefined") {
	if (typeof console != "undefined" && typeof console.log != "undefined") {
		console.log("Queensland Government template behaviours failed to initialise. jQuery is not available")
	}
} else {
	(function (a) {
		a.enhancePageOptions();
		a("#nav-site, .page-options").qgDropDown();
		a("#access").addClass("hidden").bind("focusin", function () {
			a("#access").addClass("visible")
		}).bind("focusout", function () {
			a("#access").removeClass("visible")
		});
		printLinkMaxURLLength = 200;
		a("#content-container a, #footer a").not("#breadcrumbs a, .page-options a, #fat-footer a").printLinkURLs();
		a("#header").ariaRole("banner");
		a("#tools, #nav-site, #nav-section, #breadcrumbs, #fat-footer").ariaRole("navigation");
		a("#search-form, .search-box-group").ariaRole("search");
		a("#footer").ariaRole("contentinfo");
		a("#content").ariaRole("main");
		a(".article").ariaRole("article");
		a(".application #content .article, #content.application .article").ariaRole("application");
		a(".aside").ariaRole("complementary");
		a(".max-width, .box-sizing").ariaRole("presentation");
		a("#access, #header, #nav-site, #nav-section, #breadcrumbs, #fat-footer, .aside, #page-feedback").labelledBy("h2");
		a("#nav-site ul li, .page-options ul li").labelledBy("a");
		a("#fat-footer .section").labelledBy("h3");
		a("#content, .article").labelledBy(":header");
		a(".search-scope, #page-feedback .select1 fieldset").labelledBy("strong");
		a("#footer").labelledBy("h2:not(#fat-footer h2)");
		if (a.browser.webkit) {
			zoomTimeoutId = null;
			a(window).resize(function () {
				if (zoomTimeoutId != null) {
					window.clearTimeout(zoomTimeoutId)
				}
				zoomTimeoutId = window.setTimeout(function () {
					triggerRecalc = a('<style type="text/css">');
					a("head").prepend(triggerRecalc).remove(triggerRecalc)
				}, 300)
			})
		}
	})(jQuery)
};