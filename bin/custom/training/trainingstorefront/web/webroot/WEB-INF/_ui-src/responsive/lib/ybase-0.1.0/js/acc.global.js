ACC.global = {

    _autoload: [
        ["passwordStrength", $('.password-strength').length > 0],
        "bindToggleOffcanvas",
        "bindToggleXsSearch",
        "bindHoverIntentMainNavigation",
        "initImager",
        "backToHome",
        "bindDropdown",
        "closeAccAlert"
    ],

    passwordStrength: function () {
        $('.password-strength').pstrength({
            verdicts: [ACC.pwdStrengthTooShortPwd,
                ACC.pwdStrengthVeryWeak,
                ACC.pwdStrengthWeak,
                ACC.pwdStrengthMedium,
                ACC.pwdStrengthStrong,
                ACC.pwdStrengthVeryStrong],
            minCharText: ACC.pwdStrengthMinCharText
        });
    },

    bindToggleOffcanvas: function () {
        $(document).on("click", ".js-toggle-sm-navigation", function () {
            ACC.global.toggleClassState($("main"), "offcanvas");
            ACC.global.toggleClassState($("html"), "offcanvas");
            ACC.global.toggleClassState($("body"), "offcanvas");
            ACC.global.resetXsSearch();
        });
    },

    bindToggleXsSearch: function () {
        $(document).on("click", ".js-toggle-xs-search", function () {
            ACC.global.toggleClassState($(".site-search"), "active");
            ACC.global.toggleClassState($(".js-mainHeader .navigation--middle"), "search-open");
        });
    },

    resetXsSearch: function () {
        $('.site-search').removeClass('active');
        $(".js-mainHeader .navigation--middle").removeClass("search-open");
    },

    toggleClassState: function ($e, c) {
        $e.hasClass(c) ? $e.removeClass(c) : $e.addClass(c);
        return $e.hasClass(c);
    },

    bindHoverIntentMainNavigation: function () {

        enquire.register("screen and (min-width:" + ACC.common.encodeHtml(screenMdMin) + ")", {

            match: function () {
                // on screens larger or equal screenMdMin (1024px) calculate position for .sub-navigation
                $(".js-enquire-has-sub").hoverIntent(function () {
                    var $this = $(this),
                        itemWidth = $this.width();
                    var $subNav = $this.find('.js_sub__navigation'),
                        subNavWidth = $subNav.outerWidth();
                    var $mainNav = $('.js_navigation--bottom'),
                        mainNavWidth = $mainNav.width();
                    

                    // get the left position for sub-navigation to be centered under each <li>
                    var leftPos = $this.position().left + itemWidth / 2 - subNavWidth / 2;
                    // get the top position for sub-navigation. this is usually the height of the <li> unless there is more than one row of <li>
                    var topPos = $this.position().top + $this.height();
                    if (leftPos > 0 && leftPos + subNavWidth < mainNavWidth) {
                        // .sub-navigation is within bounds of the .main-navigation
                        $subNav.css({
                            "left": leftPos,
                            "top": topPos,
                            "right": "auto"
                        });
                    } else if (leftPos < 0) {
                        // .suv-navigation can't be centered under the <li> because it would exceed the .main-navigation on the left side
                        $subNav.css({
                            "left": 0,
                            "top": topPos,
                            "right": "auto"
                        });
                    } else if (leftPos + subNavWidth > mainNavWidth) {
                        // .suv-navigation can't be centered under the <li> because it would exceed the .main-navigation on the right side
                        $subNav.css({
                            "right": 0,
                            "top": topPos,
                            "left": "auto"
                        });
                    }
                    $this.addClass("show-sub");
                }, function () {
                    $(this).removeClass("show-sub")
                });
            },

            unmatch: function () {
                // on screens smaller than screenMdMin (1024px) remove inline styles from .sub-navigation and remove hoverIntent
                $(".js_sub__navigation").removeAttr("style");
                $(".js-enquire-has-sub").hoverIntent(function () {
                    // unbinding hover
                });
            }

        });
    },

    initImager: function (elems) {
        elems = elems || '.js-responsive-image';
        this.imgr = new Imager(elems);
    },

    reprocessImages: function (elems) {
        elems = elems || '.js-responsive-image';
        if (this.imgr == undefined) {
            this.initImager(elems);
        } else {
            this.imgr.checkImagesNeedReplacing($(elems));
        }
    },

    // usage: ACC.global.addGoogleMapsApi("callback function"); // callback function name like "ACC.global.myfunction"
    addGoogleMapsApi: function (callback) {
        if (callback != undefined && $(".js-googleMapsApi").length == 0) {
        	var googleApiSrc = "//maps.googleapis.com/maps/api/js?key=" + ACC.common.encodeHtml(ACC.config.googleApiKey) + '&sensor=false&callback=' + ACC.common.encodeHtml(callback);
    		$('head').append($("<script>").addClass("js-googleMapsApi")
    								.attr("type", "text/javascript")
    								.attr("src", googleApiSrc));
        } else if (callback != undefined) {
            eval(callback + "()");
        }
    },

    backToHome: function () {
        $(".backToHome").on("click", function () {
            var sUrl = ACC.config.contextPath;
            window.location = sUrl;
        });
    },
    
    bindDropdown: function() {
    	$(document).on("click", ".dropdown-toggle", dropdownToggle);
    },

    closeAccAlert: function () {
        $(".closeAccAlert").on("click", function () {
            $(this).parent('.getAccAlert').remove();
        });
    }

};

// ***** Dropdown begins *****
function dropdownParent($this) {
    var selector = $this.attr('href')
    selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7

    var $parent = selector && $(selector)

    return $parent && $parent.length ? $parent : $this.parent()
  };

function dropdownClearMenus(e) {
	// if right click, exit
    if (e && e.which === 3) return
    
    // remove class added on dropdownToggle
    $('.dropdown-backdrop').remove()
    
    $(".dropdown-toggle").each(function () {
      var $parent       = dropdownParent($(this))
      var relatedTarget = { relatedTarget: this }

      if (!$parent.hasClass('open')) return

      if (e && e.type == 'click' && /input|textarea/i.test(e.target.tagName) && $.contains($parent[0], e.target)) return

      $parent.removeClass('open')
    })
  };

 function dropdownToggle(e) {
	var $this = $(this)

    if ($this.is('.disabled, :disabled')) return

    var $parent  = dropdownParent($this)
    var isActive = $parent.hasClass('open')

    dropdownClearMenus()

    if (!isActive) {
      if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
        // if mobile we use a backdrop because click events don't delegate
        $(document.createElement('div'))
          .addClass('dropdown-backdrop')
          .insertAfter($(this))
          .on('click', dropdownClearMenus)
      }

      var relatedTarget = { relatedTarget: this }

      if (e.isDefaultPrevented()) return

      // expand the <ul> on the dropdown
      $this
        .trigger('focus')
        .attr('aria-expanded', 'true')

      // set parent to open
      $parent.toggleClass('open')
    }

    return false
};
//***** Dropdown ends *****

function fetchSlotComponents(element) {
    // Check if element is still in the DOM before proceeding
    if (!element || !element.parentNode) {
        return;
    }

    // Check if element is already being fetched
    if (element.getAttribute("data-fetching") === "true") {
        return;
    }

    // Mark this element as currently being fetched
    element.setAttribute("data-fetching", "true");

    let params = {
        slotPosition: element.getAttribute("data-slot-position"),
        slotElement: element.getAttribute("data-slot-element"),
        slotClass: element.getAttribute("data-slot-class"),
        componentElement: element.getAttribute("data-component-element"),
        componentClass: element.getAttribute("data-component-class"),
        pageId: element.getAttribute("data-page-id")
    };

    let queryString = Object.keys(params)
        .filter(function(key) { return params[key]; })
        .map(function(key) { return key + "=" + encodeURIComponent(params[key]); })
        .join("&");

    fetch(ACC.config.contextPath +  "/cms-components?" + queryString)
        .then(function(response) { return response.text(); })
        .then(function(html) {
            if (element && element.parentNode) {
                element.outerHTML = html;

                let callback = element.getAttribute("data-callback");
                let resolved = callback ? resolveFunctionName(callback) : null;
                if (resolved && typeof resolved.func === "function") {
                    resolved.func.call(resolved.context);  // Call with preserved context
                }
            }
        });
}

/**
 * Resolves a dot-notation (or simple) function name string to the actual function and its context.
 *
 * Examples:
 * - "alert" resolves to the alert function
 * - "ACC.carousel.bindCarousel" resolves to ACC.carousel.bindCarousel
 * - "myFunction" resolves to window.myFunction
 *
 * @param {string} functionName - Function name, can be simple (e.g., "alert") or dot-notation (e.g., "ACC.global.myFunction")
 * @returns {Object|null} Object with {func: Function, context: Object} or null if function not found
 *                        - func: The actual function to call
 *                        - context: The object context (this) for the function
 */
function resolveFunctionName(functionName) {
    // Split the function name by dots to get each property level
    // Example: "ACC.carousel.bindCarousel" becomes ["ACC", "carousel", "bindCarousel"]
    // Example: "alert" becomes ["alert"]
    let parts = functionName.split(".");

    // Start with the global window object
    let func = window;

    // Keep track of the parent object (context) for proper function invocation
    let context = window;

    // Traverse through each part of the dot-notation path
    for (let i = 0; i < parts.length; i++) {
        // Move context one level deeper (the current object becomes the next context)
        context = func;

        // Attempt to access the next property in the chain
        // Example: window["ACC"] -> ACC["carousel"] -> carousel["bindCarousel"]
        // Example: window["alert"] -> alert function
        func = func[parts[i]];

        // If any property in the chain doesn't exist, return null (function not found)
        if (!func) return null;
    }

    // Return both the function and its context (parent object)
    // This allows us to call it with proper 'this' binding: func.call(context)
    return { func: func, context: context };
}

function isInOrAboveViewport(element) {
    let rect = element.getBoundingClientRect();
    return rect.top < (window.innerHeight || document.documentElement.clientHeight);
}

function loadVisibleSlots() {
    let lazySlots = document.querySelectorAll(".lazy-slot-component:not([data-fetching='true'])");
    lazySlots.forEach(function(slot) {
        if (isInOrAboveViewport(slot)) {
            fetchSlotComponents(slot);
        }
    });
}

window.addEventListener("scroll", loadVisibleSlots);
