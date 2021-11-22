// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/app.js":[function(require,module,exports) {
//grab elments
var mainBtn = document.querySelector('.main');
var navbarUpper = document.querySelector('.navbar-upper');
var headerNav = document.querySelector('header');
var headerWrapper = document.querySelector('.header-wrapper');
var logo = document.querySelector('.logo');
var links = navbarUpper.querySelectorAll('li');
var burgerMenu = document.querySelector('.burger-menu');
var burgerLines = burgerMenu.querySelectorAll('.line'); // burger lines

var firstLine = burgerLines[0];
var secondLine = burgerLines[1];
var thirdLine = burgerLines[2];
var timeL = gsap.timeline({
  defaults: {
    duration: 1,
    ease: 'power2.out'
  }
});
var timeL2 = gsap.timeline({
  defaults: {
    duration: .7,
    ease: 'power2.in'
  }
}); // animate nav when site loads

gsap.fromTo(headerWrapper, {
  y: '-100%'
}, {
  y: '0%'
}, '+=.5');

var animSlides = function animSlides() {
  var getSlides = document.querySelectorAll('.slide');

  var handleIntersect = function handleIntersect(entries, observer) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var element = entry.target;
        var reveal = element.querySelectorAll('.reveal-hide');
        timeL.fromTo(reveal, {
          opacity: 0
        }, {
          opacity: 1,
          stagger: 0.5
        });
        observer.unobserve(element);
      }
    });
  };

  var createObserver = function createObserver(el) {
    var observer;
    var options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.33
    };
    observer = new IntersectionObserver(handleIntersect, options);
    observer.observe(el);
  };

  getSlides.forEach(function (slide) {
    createObserver(slide);
  });
}; //open navbar when user clicks on burger


var openNavbar = function openNavbar() {
  if (!navbarUpper.classList.contains('active')) {
    navbarUpper.classList.add('active');
    gsap.to(firstLine, {
      rotate: '40deg'
    });
    gsap.to(firstLine, {
      top: '20px'
    });
    gsap.to(secondLine, {
      opacity: 0
    });
    gsap.to(thirdLine, {
      rotate: '-40deg'
    });
    timeL2.fromTo(navbarUpper, {
      y: '-100%'
    }, {
      y: '0%',
      onComplete: function onComplete() {
        gsap.to(logo, {
          opacity: 0
        });
        document.body.style.overflow = 'hidden';
      }
    });
    timeL2.fromTo(links, {
      x: '20%'
    }, {
      x: '0%',
      stagger: 0.2
    });
    timeL2.fromTo(links, {
      opacity: 0
    }, {
      opacity: 1,
      stagger: 0.2
    }, '-=1.3');
  } else {
    gsap.to(firstLine, {
      rotate: '0deg'
    });
    gsap.to(firstLine, {
      top: '0px'
    });
    gsap.to(secondLine, {
      opacity: 1
    });
    gsap.to(thirdLine, {
      rotate: '0'
    });
    navbarUpper.classList.remove('active');
    timeL2.fromTo(links, {
      x: '0%'
    }, {
      x: '20%',
      stagger: 0.2
    });
    timeL2.fromTo(links, {
      opacity: 1
    }, {
      opacity: 0,
      stagger: 0.2
    }, '-=1.3');
    timeL2.fromTo(navbarUpper, {
      y: '0%'
    }, {
      y: '-100%',
      onComplete: function onComplete() {
        gsap.to(logo, {
          opacity: 1
        });
        document.body.style.overflow = 'auto';
      }
    });
  }
}; // when user scrolls make navbar sticky


var whenScroll = function whenScroll() {
  var position = window.scrollY;

  if (position > 30) {
    headerWrapper.classList.add('active');
  } else {
    headerWrapper.classList.remove('active');
  }
}; //scroll to specific container on click function


var ScrollTo = function ScrollTo(key) {
  var getEl = document.querySelector(".".concat(key));
  var getPos = getEl.offsetTop;
  window.scrollTo({
    top: getPos,
    behavior: "smooth"
  });
};

document.addEventListener('scroll', whenScroll);
burgerMenu.addEventListener('click', openNavbar);
mainBtn.addEventListener('click', function (e) {
  var key = e.target.getAttribute('data-key');
  ScrollTo(key);
});

var animLinks = function animLinks() {
  links.forEach(function (link) {
    link.addEventListener('click', function (e) {
      document.body.style.pointerEvents = 'none';
      var key = e.target.getAttribute('data-key');
      gsap.to(firstLine, {
        rotate: '0deg'
      });
      gsap.to(firstLine, {
        top: '0px'
      });
      gsap.to(secondLine, {
        opacity: 1
      });
      gsap.to(thirdLine, {
        rotate: '0'
      });
      navbarUpper.classList.remove('active');
      timeL2.fromTo(links, {
        x: '0%'
      }, {
        x: '20%',
        stagger: 0.2
      });
      timeL2.fromTo(links, {
        opacity: 1
      }, {
        opacity: 0,
        stagger: 0.2
      }, '-=1.3');
      timeL2.fromTo(navbarUpper, {
        y: '0%'
      }, {
        y: '-100%',
        onComplete: function onComplete() {
          gsap.to(logo, {
            opacity: 1
          });
          document.body.style.overflow = 'auto', ScrollTo(key), document.body.style.pointerEvents = 'auto';
        }
      });
    });
  });
}; // when site loads execute functions


document.addEventListener('DOMContentLoaded', function () {
  animSlides();
  animLinks();
  window.scroll(0, 0);
});
},{}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "60419" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/app.js"], null)
//# sourceMappingURL=/app.c3f9f951.js.map