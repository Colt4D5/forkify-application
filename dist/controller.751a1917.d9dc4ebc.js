// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function(modules, cache, entry, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject.parcelRequire === 'function' &&
    globalObject.parcelRequire;
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof parcelRequire === 'function' && parcelRequire;
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

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x) {
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
  newRequire.register = function(id, exports) {
    modules[id] = [
      function(require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  globalObject.parcelRequire = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function() {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"abb6324e68c031a7738b2ab6a87b160f":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = 1234;
var HMR_ENV_HASH = "d751713988987e9331980363e24189ce";
module.bundle.HMR_BUNDLE_ID = "d9dc4ebc6d13efde474cae72222aed72";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH */

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
var checkedAssets, assetsToAccept, acceptedAssets; // eslint-disable-next-line no-redeclare

var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
  var port = HMR_PORT || location.port;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    acceptedAssets = {};
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      // Remove error overlay if there is one
      removeErrorOverlay();
      let assets = data.assets.filter(asset => asset.envHash === HMR_ENV_HASH); // Handle HMR Update

      var handled = false;
      assets.forEach(asset => {
        var didAccept = asset.type === 'css' || hmrAcceptCheck(global.parcelRequire, asset.id);

        if (didAccept) {
          handled = true;
        }
      });

      if (handled) {
        console.clear();
        assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });

        for (var i = 0; i < assetsToAccept.length; i++) {
          var id = assetsToAccept[i][1];

          if (!acceptedAssets[id]) {
            hmrAcceptRun(assetsToAccept[i][0], id);
          }
        }
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'error') {
      // Log parcel errors to console
      for (let ansiDiagnostic of data.diagnostics.ansi) {
        let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
        console.error('🚨 [parcel]: ' + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
      } // Render the fancy html overlay


      removeErrorOverlay();
      var overlay = createErrorOverlay(data.diagnostics.html);
      document.body.appendChild(overlay);
    }
  };

  ws.onerror = function (e) {
    console.error(e.message);
  };

  ws.onclose = function (e) {
    console.warn('[parcel] 🚨 Connection to the HMR server was lost');
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
    console.log('[parcel] ✨ Error resolved');
  }
}

function createErrorOverlay(diagnostics) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;
  let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';

  for (let diagnostic of diagnostics) {
    let stack = diagnostic.codeframe ? diagnostic.codeframe : diagnostic.stack;
    errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>
          ${stack}
        </pre>
        <div>
          ${diagnostic.hints.map(hint => '<div>' + hint + '</div>').join('')}
        </div>
      </div>
    `;
  }

  errorHTML += '</div>';
  overlay.innerHTML = errorHTML;
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
        parents.push([bundle, k]);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    if (link.parentNode !== null) {
      link.parentNode.removeChild(link);
    }
  };

  newLink.setAttribute('href', link.getAttribute('href').split('?')[0] + '?' + Date.now());
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      var absolute = /^https?:\/\//i.test(links[i].getAttribute('href'));

      if (!absolute) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    if (asset.type === 'css') {
      reloadCSS();
    } else {
      var fn = new Function('require', 'module', 'exports', asset.output);
      modules[asset.id] = [fn, asset.depsByBundle[bundle.HMR_BUNDLE_ID]];
    }
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

  return getParents(global.parcelRequire, id).some(function (v) {
    return hmrAcceptCheck(v[0], v[1]);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached && cached.hot) {
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
      var assetsToAlsoAccept = cb(function () {
        return getParents(global.parcelRequire, id);
      });

      if (assetsToAlsoAccept && assetsToAccept.length) {
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
      }
    });
  }

  acceptedAssets[id] = true;
}
},{}],"70ec6b1ca8ee51b2c063b7886425f463":[function(require,module,exports) {
var global = arguments[3];
!function () {
  var t = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof global ? global : {},
      e = {};

  var r = function (t) {
    var r = e[t];
    if (null == r) throw new Error("Could not resolve bundle with id " + t);
    return r;
  };

  (function (t) {
    for (var r = Object.keys(t), n = 0; n < r.length; n++) e[r[n]] = t[r[n]];
  })(JSON.parse('{"67d91acf8a78ec3f":"controller.751a1917.js","a1e15e2135e3c52a":"icons.c781f215.svg"}'));

  var n,
      o = {},
      i = function (t) {
    return t && t.Math == Math && t;
  };

  o = i("object" == typeof globalThis && globalThis) || i("object" == typeof window && window) || i("object" == typeof self && self) || i("object" == typeof t && t) || function () {
    return this;
  }() || Function("return this")();

  var a, u;
  a = !(u = function (t) {
    try {
      return !!t();
    } catch (t) {
      return !0;
    }
  })(function () {
    return 7 != Object.defineProperty({}, 1, {
      get: function () {
        return 7;
      }
    })[1];
  });
  var c,
      s = {}.propertyIsEnumerable,
      f = Object.getOwnPropertyDescriptor,
      l = f && !s.call({
    1: 2
  }, 1) ? function (t) {
    var e = f(this, t);
    return !!e && e.enumerable;
  } : s;

  c = function (t, e) {
    return {
      enumerable: !(1 & t),
      configurable: !(2 & t),
      writable: !(4 & t),
      value: e
    };
  };

  var h,
      p,
      v = {},
      d = {}.toString;

  p = function (t) {
    return d.call(t).slice(8, -1);
  };

  var g = "".split;
  v = u(function () {
    return !Object("z").propertyIsEnumerable(0);
  }) ? function (t) {
    return "String" == p(t) ? g.call(t, "") : Object(t);
  } : Object;
  var y;
  y = function (t) {
    if (null == t) throw TypeError("Can't call method on " + t);
    return t;
  }, h = function (t) {
    return v(y(t));
  };
  var m, b;
  b = function (t) {
    return "object" == typeof t ? null !== t : "function" == typeof t;
  }, m = function (t, e) {
    if (!b(t)) return t;
    var r, n;
    if (e && "function" == typeof (r = t.toString) && !b(n = r.call(t))) return n;
    if ("function" == typeof (r = t.valueOf) && !b(n = r.call(t))) return n;
    if (!e && "function" == typeof (r = t.toString) && !b(n = r.call(t))) return n;
    throw TypeError("Can't convert object to primitive value");
  };
  var w,
      S = {}.hasOwnProperty;

  w = function (t, e) {
    return S.call(t, e);
  };

  var E,
      _,
      x = o.document,
      A = b(x) && b(x.createElement);

  _ = function (t) {
    return A ? x.createElement(t) : {};
  }, E = !a && !u(function () {
    return 7 != Object.defineProperty(_("div"), "a", {
      get: function () {
        return 7;
      }
    }).a;
  });
  var O,
      R = Object.getOwnPropertyDescriptor,
      T = a ? R : function (t, e) {
    if (t = h(t), e = m(e, !0), E) try {
      return R(t, e);
    } catch (t) {}
    if (w(t, e)) return c(!l.call(t, e), t[e]);
  },
      j = T,
      M = {};

  O = function (t) {
    if (!b(t)) throw TypeError(String(t) + " is not an object");
    return t;
  };

  var k = Object.defineProperty,
      I = a ? k : function (t, e, r) {
    if (O(t), e = m(e, !0), O(r), E) try {
      return k(t, e, r);
    } catch (t) {}
    if ("get" in r || "set" in r) throw TypeError("Accessors not supported");
    return "value" in r && (t[e] = r.value), t;
  };
  M = a ? function (t, e, r) {
    return I(t, e, c(1, r));
  } : function (t, e, r) {
    return t[e] = r, t;
  };
  var P, L;

  L = function (t, e) {
    try {
      M(o, t, e);
    } catch (r) {
      o[t] = e;
    }

    return e;
  };

  var F = {},
      N = {},
      U = o["__core-js_shared__"] || L("__core-js_shared__", {});
  N = U;
  var C = Function.toString;
  "function" != typeof N.inspectSource && (N.inspectSource = function (t) {
    return C.call(t);
  }), F = N.inspectSource;
  var B,
      q,
      z = o.WeakMap;
  q = "function" == typeof z && /native code/.test(F(z));
  var D, W;
  (W = function (t, e) {
    return N[t] || (N[t] = void 0 !== e ? e : {});
  })("versions", []).push({
    version: "3.9.1",
    mode: "global",
    copyright: "© 2021 Denis Pushkarev (zloirock.ru)"
  });
  var G,
      V = 0,
      $ = Math.random();

  G = function (t) {
    return "Symbol(" + String(void 0 === t ? "" : t) + ")_" + (++V + $).toString(36);
  };

  var H = W("keys");

  D = function (t) {
    return H[t] || (H[t] = G(t));
  };

  var Y = {};
  Y = {};
  var X,
      J,
      K,
      Q = o.WeakMap;

  if (q) {
    var Z = N.state || (N.state = new Q()),
        tt = Z.get,
        et = Z.has,
        rt = Z.set;
    X = function (t, e) {
      return e.facade = t, rt.call(Z, t, e), e;
    }, J = function (t) {
      return tt.call(Z, t) || {};
    }, K = function (t) {
      return et.call(Z, t);
    };
  } else {
    var nt = D("state");
    Y[nt] = !0, X = function (t, e) {
      return e.facade = t, M(t, nt, e), e;
    }, J = function (t) {
      return w(t, nt) ? t[nt] : {};
    }, K = function (t) {
      return w(t, nt);
    };
  }

  var ot = (B = {
    set: X,
    get: J,
    has: K,
    enforce: function (t) {
      return K(t) ? J(t) : X(t, {});
    },
    getterFor: function (t) {
      return function (e) {
        var r;
        if (!b(e) || (r = J(e)).type !== t) throw TypeError("Incompatible receiver, " + t + " required");
        return r;
      };
    }
  }).get,
      it = B.enforce,
      at = String(String).split("String");
  (P = function (t, e, r, n) {
    var i,
        a = !!n && !!n.unsafe,
        u = !!n && !!n.enumerable,
        c = !!n && !!n.noTargetGet;
    "function" == typeof r && ("string" != typeof e || w(r, "name") || M(r, "name", e), (i = it(r)).source || (i.source = at.join("string" == typeof e ? e : ""))), t !== o ? (a ? !c && t[e] && (u = !0) : delete t[e], u ? t[e] = r : M(t, e, r)) : u ? t[e] = r : L(e, r);
  })(Function.prototype, "toString", function () {
    return "function" == typeof this && ot(this).source || F(this);
  });
  var ut,
      ct,
      st = {},
      ft = {};
  ft = o;

  var lt = function (t) {
    return "function" == typeof t ? t : void 0;
  };

  ct = function (t, e) {
    return arguments.length < 2 ? lt(ft[t]) || lt(o[t]) : ft[t] && ft[t][e] || o[t] && o[t][e];
  };

  var ht,
      pt,
      vt,
      dt,
      gt = Math.ceil,
      yt = Math.floor;

  dt = function (t) {
    return isNaN(t = +t) ? 0 : (t > 0 ? yt : gt)(t);
  };

  var mt = Math.min;

  vt = function (t) {
    return t > 0 ? mt(dt(t), 9007199254740991) : 0;
  };

  var bt,
      wt = Math.max,
      St = Math.min;

  bt = function (t, e) {
    var r = dt(t);
    return r < 0 ? wt(r + e, 0) : St(r, e);
  };

  var Et = function (t) {
    return function (e, r, n) {
      var o,
          i = h(e),
          a = vt(i.length),
          u = bt(n, a);

      if (t && r != r) {
        for (; a > u;) if ((o = i[u++]) != o) return !0;
      } else for (; a > u; u++) if ((t || u in i) && i[u] === r) return t || u || 0;

      return !t && -1;
    };
  },
      _t = (pt = {
    includes: Et(!0),
    indexOf: Et(!1)
  }).indexOf;

  ht = function (t, e) {
    var r,
        n = h(t),
        o = 0,
        i = [];

    for (r in n) !w(Y, r) && w(n, r) && i.push(r);

    for (; e.length > o;) w(n, r = e[o++]) && (~_t(i, r) || i.push(r));

    return i;
  };

  var xt = {},
      At = (xt = ["constructor", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString", "toString", "valueOf"]).concat("length", "prototype"),
      Ot = Object.getOwnPropertyNames || function (t) {
    return ht(t, At);
  },
      Rt = Object.getOwnPropertySymbols;

  st = ct("Reflect", "ownKeys") || function (t) {
    var e = Ot(O(t)),
        r = Rt;
    return r ? e.concat(r(t)) : e;
  }, ut = function (t, e) {
    for (var r = st(e), n = I, o = T, i = 0; i < r.length; i++) {
      var a = r[i];
      w(t, a) || n(t, a, o(e, a));
    }
  };

  var Tt = {},
      jt = /#|\.prototype\./,
      Mt = function (t, e) {
    var r = It[kt(t)];
    return r == Lt || r != Pt && ("function" == typeof e ? u(e) : !!e);
  },
      kt = Mt.normalize = function (t) {
    return String(t).replace(jt, ".").toLowerCase();
  },
      It = Mt.data = {},
      Pt = Mt.NATIVE = "N",
      Lt = Mt.POLYFILL = "P";

  Tt = Mt, n = function (t, e) {
    var r,
        n,
        i,
        a,
        u,
        c = t.target,
        s = t.global,
        f = t.stat;
    if (r = s ? o : f ? o[c] || L(c, {}) : (o[c] || {}).prototype) for (n in e) {
      if (a = e[n], i = t.noTargetGet ? (u = j(r, n)) && u.value : r[n], !Tt(s ? n : c + (f ? "." : "#") + n, t.forced) && void 0 !== i) {
        if (typeof a == typeof i) continue;
        ut(a, i);
      }

      (t.sham || i && i.sham) && M(a, "sham", !0), P(r, n, a, t);
    }
  };
  var Ft, Nt;
  Nt = "process" == p(o.process);
  var Ut,
      Ct = {};
  Ct = ct("navigator", "userAgent") || "";
  var Bt,
      qt,
      zt = o.process,
      Dt = zt && zt.versions,
      Wt = Dt && Dt.v8;
  Wt ? qt = (Bt = Wt.split("."))[0] + Bt[1] : Ct && (!(Bt = Ct.match(/Edge\/(\d+)/)) || Bt[1] >= 74) && (Bt = Ct.match(/Chrome\/(\d+)/)) && (qt = Bt[1]), Ut = qt && +qt;
  var Gt;
  Gt = (Ft = !!Object.getOwnPropertySymbols && !u(function () {
    return !Symbol.sham && (Nt ? 38 === Ut : Ut > 37 && Ut < 41);
  })) && !Symbol.sham && "symbol" == typeof Symbol.iterator;
  var Vt = {};

  Vt = Array.isArray || function (t) {
    return "Array" == p(t);
  };

  var $t;

  $t = function (t) {
    return Object(y(t));
  };

  var Ht = {},
      Yt = {},
      Xt = {};
  Xt = Object.keys || function (t) {
    return ht(t, xt);
  }, Yt = a ? Object.defineProperties : function (t, e) {
    O(t);

    for (var r, n = Xt(e), o = n.length, i = 0; o > i;) I(t, r = n[i++], e[r]);

    return t;
  };
  var Jt = {};
  Jt = ct("document", "documentElement");

  var Kt,
      Qt = D("IE_PROTO"),
      Zt = function () {},
      te = function (t) {
    return "<script>" + t + "<\/script>";
  },
      ee = function () {
    try {
      Kt = document.domain && new ActiveXObject("htmlfile");
    } catch (t) {}

    var t, e;
    ee = Kt ? function (t) {
      t.write(te("")), t.close();
      var e = t.parentWindow.Object;
      return t = null, e;
    }(Kt) : ((e = _("iframe")).style.display = "none", Jt.appendChild(e), e.src = String("javascript:"), (t = e.contentWindow.document).open(), t.write(te("document.F=Object")), t.close(), t.F);

    for (var r = xt.length; r--;) delete ee.prototype[xt[r]];

    return ee();
  };

  Y[Qt] = !0, Ht = Object.create || function (t, e) {
    var r;
    return null !== t ? (Zt.prototype = O(t), r = new Zt(), Zt.prototype = null, r[Qt] = t) : r = ee(), void 0 === e ? r : Yt(r, e);
  };

  var re,
      ne = Ot,
      oe = {}.toString,
      ie = "object" == typeof window && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [],
      ae = function (t) {
    return ie && "[object Window]" == oe.call(t) ? function (t) {
      try {
        return ne(t);
      } catch (t) {
        return ie.slice();
      }
    }(t) : ne(h(t));
  },
      ue = {},
      ce = W("wks"),
      se = o.Symbol,
      fe = Gt ? se : se && se.withoutSetter || G,
      le = I;

  re = function (t) {
    var e = ft.Symbol || (ft.Symbol = {});
    w(e, t) || le(e, t, {
      value: ue(t)
    });
  };

  var he,
      pe = I,
      ve = (ue = function (t) {
    return w(ce, t) && (Ft || "string" == typeof ce[t]) || (Ft && w(se, t) ? ce[t] = se[t] : ce[t] = fe("Symbol." + t)), ce[t];
  })("toStringTag");

  he = function (t, e, r) {
    t && !w(t = r ? t : t.prototype, ve) && pe(t, ve, {
      configurable: !0,
      value: e
    });
  };

  var de, ge, ye;
  ye = function (t) {
    if ("function" != typeof t) throw TypeError(String(t) + " is not a function");
    return t;
  }, ge = function (t, e, r) {
    if (ye(t), void 0 === e) return t;

    switch (r) {
      case 0:
        return function () {
          return t.call(e);
        };

      case 1:
        return function (r) {
          return t.call(e, r);
        };

      case 2:
        return function (r, n) {
          return t.call(e, r, n);
        };

      case 3:
        return function (r, n, o) {
          return t.call(e, r, n, o);
        };
    }

    return function () {
      return t.apply(e, arguments);
    };
  };
  var me,
      be = ue("species");

  me = function (t, e) {
    var r;
    return Vt(t) && ("function" != typeof (r = t.constructor) || r !== Array && !Vt(r.prototype) ? b(r) && null === (r = r[be]) && (r = void 0) : r = void 0), new (void 0 === r ? Array : r)(0 === e ? 0 : e);
  };

  var we = [].push,
      Se = function (t) {
    var e = 1 == t,
        r = 2 == t,
        n = 3 == t,
        o = 4 == t,
        i = 6 == t,
        a = 7 == t,
        u = 5 == t || i;
    return function (c, s, f, l) {
      for (var h, p, d = $t(c), g = v(d), y = ge(s, f, 3), m = vt(g.length), b = 0, w = l || me, S = e ? w(c, m) : r || a ? w(c, 0) : void 0; m > b; b++) if ((u || b in g) && (p = y(h = g[b], b, d), t)) if (e) S[b] = p;else if (p) switch (t) {
        case 3:
          return !0;

        case 5:
          return h;

        case 6:
          return b;

        case 2:
          we.call(S, h);
      } else switch (t) {
        case 4:
          return !1;

        case 7:
          we.call(S, h);
      }

      return i ? -1 : n || o ? o : S;
    };
  },
      Ee = (de = {
    forEach: Se(0),
    map: Se(1),
    filter: Se(2),
    some: Se(3),
    every: Se(4),
    find: Se(5),
    findIndex: Se(6),
    filterOut: Se(7)
  }).forEach,
      _e = D("hidden"),
      xe = ue("toPrimitive"),
      Ae = B.set,
      Oe = B.getterFor("Symbol"),
      Re = Object.prototype,
      Te = o.Symbol,
      je = ct("JSON", "stringify"),
      Me = T,
      ke = I,
      Ie = ae,
      Pe = l,
      Le = W("symbols"),
      Fe = W("op-symbols"),
      Ne = W("string-to-symbol-registry"),
      Ue = W("symbol-to-string-registry"),
      Ce = W("wks"),
      Be = o.QObject,
      qe = !Be || !Be.prototype || !Be.prototype.findChild,
      ze = a && u(function () {
    return 7 != Ht(ke({}, "a", {
      get: function () {
        return ke(this, "a", {
          value: 7
        }).a;
      }
    })).a;
  }) ? function (t, e, r) {
    var n = Me(Re, e);
    n && delete Re[e], ke(t, e, r), n && t !== Re && ke(Re, e, n);
  } : ke,
      De = function (t, e) {
    var r = Le[t] = Ht(Te.prototype);
    return Ae(r, {
      type: "Symbol",
      tag: t,
      description: e
    }), a || (r.description = e), r;
  },
      We = Gt ? function (t) {
    return "symbol" == typeof t;
  } : function (t) {
    return Object(t) instanceof Te;
  },
      Ge = function (t, e, r) {
    t === Re && Ge(Fe, e, r), O(t);
    var n = m(e, !0);
    return O(r), w(Le, n) ? (r.enumerable ? (w(t, _e) && t[_e][n] && (t[_e][n] = !1), r = Ht(r, {
      enumerable: c(0, !1)
    })) : (w(t, _e) || ke(t, _e, c(1, {})), t[_e][n] = !0), ze(t, n, r)) : ke(t, n, r);
  },
      Ve = function (t, e) {
    O(t);
    var r = h(e),
        n = Xt(r).concat(Xe(r));
    return Ee(n, function (e) {
      a && !$e.call(r, e) || Ge(t, e, r[e]);
    }), t;
  },
      $e = function (t) {
    var e = m(t, !0),
        r = Pe.call(this, e);
    return !(this === Re && w(Le, e) && !w(Fe, e)) && (!(r || !w(this, e) || !w(Le, e) || w(this, _e) && this[_e][e]) || r);
  },
      He = function (t, e) {
    var r = h(t),
        n = m(e, !0);

    if (r !== Re || !w(Le, n) || w(Fe, n)) {
      var o = Me(r, n);
      return !o || !w(Le, n) || w(r, _e) && r[_e][n] || (o.enumerable = !0), o;
    }
  },
      Ye = function (t) {
    var e = Ie(h(t)),
        r = [];
    return Ee(e, function (t) {
      w(Le, t) || w(Y, t) || r.push(t);
    }), r;
  },
      Xe = function (t) {
    var e = t === Re,
        r = Ie(e ? Fe : h(t)),
        n = [];
    return Ee(r, function (t) {
      !w(Le, t) || e && !w(Re, t) || n.push(Le[t]);
    }), n;
  };

  if (Ft || (P((Te = function () {
    if (this instanceof Te) throw TypeError("Symbol is not a constructor");

    var t = arguments.length && void 0 !== arguments[0] ? String(arguments[0]) : void 0,
        e = G(t),
        r = function (t) {
      this === Re && r.call(Fe, t), w(this, _e) && w(this[_e], e) && (this[_e][e] = !1), ze(this, e, c(1, t));
    };

    return a && qe && ze(Re, e, {
      configurable: !0,
      set: r
    }), De(e, t);
  }).prototype, "toString", function () {
    return Oe(this).tag;
  }), P(Te, "withoutSetter", function (t) {
    return De(G(t), t);
  }), l = $e, I = Ge, T = He, Ot = ae = Ye, Rt = Xe, ue = function (t) {
    return De(ue(t), t);
  }, a && (ke(Te.prototype, "description", {
    configurable: !0,
    get: function () {
      return Oe(this).description;
    }
  }), P(Re, "propertyIsEnumerable", $e, {
    unsafe: !0
  }))), n({
    global: !0,
    wrap: !0,
    forced: !Ft,
    sham: !Ft
  }, {
    Symbol: Te
  }), Ee(Xt(Ce), function (t) {
    re(t);
  }), n({
    target: "Symbol",
    stat: !0,
    forced: !Ft
  }, {
    for: function (t) {
      var e = String(t);
      if (w(Ne, e)) return Ne[e];
      var r = Te(e);
      return Ne[e] = r, Ue[r] = e, r;
    },
    keyFor: function (t) {
      if (!We(t)) throw TypeError(t + " is not a symbol");
      if (w(Ue, t)) return Ue[t];
    },
    useSetter: function () {
      qe = !0;
    },
    useSimple: function () {
      qe = !1;
    }
  }), n({
    target: "Object",
    stat: !0,
    forced: !Ft,
    sham: !a
  }, {
    create: function (t, e) {
      return void 0 === e ? Ht(t) : Ve(Ht(t), e);
    },
    defineProperty: Ge,
    defineProperties: Ve,
    getOwnPropertyDescriptor: He
  }), n({
    target: "Object",
    stat: !0,
    forced: !Ft
  }, {
    getOwnPropertyNames: Ye,
    getOwnPropertySymbols: Xe
  }), n({
    target: "Object",
    stat: !0,
    forced: u(function () {
      Rt(1);
    })
  }, {
    getOwnPropertySymbols: function (t) {
      return Rt($t(t));
    }
  }), je) {
    var Je = !Ft || u(function () {
      var t = Te();
      return "[null]" != je([t]) || "{}" != je({
        a: t
      }) || "{}" != je(Object(t));
    });
    n({
      target: "JSON",
      stat: !0,
      forced: Je
    }, {
      stringify: function (t, e, r) {
        for (var n, o = [t], i = 1; arguments.length > i;) o.push(arguments[i++]);

        if (n = e, (b(e) || void 0 !== t) && !We(t)) return Vt(e) || (e = function (t, e) {
          if ("function" == typeof n && (e = n.call(this, t, e)), !We(e)) return e;
        }), o[1] = e, je.apply(null, o);
      }
    });
  }

  Te.prototype[xe] || M(Te.prototype, xe, Te.prototype.valueOf), he(Te, "Symbol"), Y[_e] = !0;
  var Ke = I,
      Qe = o.Symbol;

  if (a && "function" == typeof Qe && (!("description" in Qe.prototype) || void 0 !== Qe().description)) {
    var Ze = {},
        tr = function () {
      var t = arguments.length < 1 || void 0 === arguments[0] ? void 0 : String(arguments[0]),
          e = this instanceof tr ? new Qe(t) : void 0 === t ? Qe() : Qe(t);
      return "" === t && (Ze[e] = !0), e;
    };

    ut(tr, Qe);
    var er = tr.prototype = Qe.prototype;
    er.constructor = tr;
    var rr = er.toString,
        nr = "Symbol(test)" == String(Qe("test")),
        or = /^Symbol\((.*)\)[^)]+$/;
    Ke(er, "description", {
      configurable: !0,
      get: function () {
        var t = b(this) ? this.valueOf() : this,
            e = rr.call(t);
        if (w(Ze, t)) return "";
        var r = nr ? e.slice(7, -1) : e.replace(or, "$1");
        return "" === r ? void 0 : r;
      }
    }), n({
      global: !0,
      forced: !0
    }, {
      Symbol: tr
    });
  }

  re("asyncIterator"), re("hasInstance"), re("isConcatSpreadable"), re("iterator"), re("match"), re("replace"), re("search"), re("species"), re("split"), re("toPrimitive"), re("toStringTag"), re("unscopables");
  var ir;

  ir = function (t, e, r) {
    var n = m(e);
    n in t ? I(t, n, c(0, r)) : t[n] = r;
  };

  var ar,
      ur = ue("species");

  ar = function (t) {
    return Ut >= 51 || !u(function () {
      var e = [];
      return (e.constructor = {})[ur] = function () {
        return {
          foo: 1
        };
      }, 1 !== e[t](Boolean).foo;
    });
  };

  var cr = ue("isConcatSpreadable"),
      sr = Ut >= 51 || !u(function () {
    var t = [];
    return t[cr] = !1, t.concat()[0] !== t;
  }),
      fr = ar("concat"),
      lr = function (t) {
    if (!b(t)) return !1;
    var e = t[cr];
    return void 0 !== e ? !!e : Vt(t);
  };

  n({
    target: "Array",
    proto: !0,
    forced: !sr || !fr
  }, {
    concat: function (t) {
      var e,
          r,
          n,
          o,
          i,
          a = $t(this),
          u = me(a, 0),
          c = 0;

      for (e = -1, n = arguments.length; e < n; e++) if (lr(i = -1 === e ? a : arguments[e])) {
        if (c + (o = vt(i.length)) > 9007199254740991) throw TypeError("Maximum allowed index exceeded");

        for (r = 0; r < o; r++, c++) r in i && ir(u, c, i[r]);
      } else {
        if (c >= 9007199254740991) throw TypeError("Maximum allowed index exceeded");
        ir(u, c++, i);
      }

      return u.length = c, u;
    }
  });
  var hr = {},
      pr = Math.min;

  hr = [].copyWithin || function (t, e) {
    var r = $t(this),
        n = vt(r.length),
        o = bt(t, n),
        i = bt(e, n),
        a = arguments.length > 2 ? arguments[2] : void 0,
        u = pr((void 0 === a ? n : bt(a, n)) - i, n - o),
        c = 1;

    for (i < o && o < i + u && (c = -1, i += u - 1, o += u - 1); u-- > 0;) i in r ? r[o] = r[i] : delete r[o], o += c, i += c;

    return r;
  };

  var vr,
      dr = ue("unscopables"),
      gr = Array.prototype;
  null == gr[dr] && I(gr, dr, {
    configurable: !0,
    value: Ht(null)
  }), vr = function (t) {
    gr[dr][t] = !0;
  }, n({
    target: "Array",
    proto: !0
  }, {
    copyWithin: hr
  }), vr("copyWithin");
  var yr;
  n({
    target: "Array",
    proto: !0
  }, {
    fill: yr = function (t) {
      for (var e = $t(this), r = vt(e.length), n = arguments.length, o = bt(n > 1 ? arguments[1] : void 0, r), i = n > 2 ? arguments[2] : void 0, a = void 0 === i ? r : bt(i, r); a > o;) e[o++] = t;

      return e;
    }
  }), vr("fill");
  var mr = de.filter,
      br = ar("filter");
  n({
    target: "Array",
    proto: !0,
    forced: !br
  }, {
    filter: function (t) {
      return mr(this, t, arguments.length > 1 ? arguments[1] : void 0);
    }
  });
  var wr = de.find,
      Sr = !0;
  "find" in [] && Array(1).find(function () {
    Sr = !1;
  }), n({
    target: "Array",
    proto: !0,
    forced: Sr
  }, {
    find: function (t) {
      return wr(this, t, arguments.length > 1 ? arguments[1] : void 0);
    }
  }), vr("find");

  var Er = de.findIndex,
      _r = !0;

  "findIndex" in [] && Array(1).findIndex(function () {
    _r = !1;
  }), n({
    target: "Array",
    proto: !0,
    forced: _r
  }, {
    findIndex: function (t) {
      return Er(this, t, arguments.length > 1 ? arguments[1] : void 0);
    }
  }), vr("findIndex");

  var xr = {},
      Ar = function (t, e, r, n, o, i, a, u) {
    for (var c, s = o, f = 0, l = !!a && ge(a, u, 3); f < n;) {
      if (f in r) {
        if (c = l ? l(r[f], f, e) : r[f], i > 0 && Vt(c)) s = Ar(t, e, c, vt(c.length), s, i - 1) - 1;else {
          if (s >= 9007199254740991) throw TypeError("Exceed the acceptable array length");
          t[s] = c;
        }
        s++;
      }

      f++;
    }

    return s;
  };

  xr = Ar, n({
    target: "Array",
    proto: !0
  }, {
    flat: function () {
      var t = arguments.length ? arguments[0] : void 0,
          e = $t(this),
          r = vt(e.length),
          n = me(e, 0);
      return n.length = xr(n, e, e, r, 0, void 0 === t ? 1 : dt(t)), n;
    }
  }), n({
    target: "Array",
    proto: !0
  }, {
    flatMap: function (t) {
      var e,
          r = $t(this),
          n = vt(r.length);
      return ye(t), (e = me(r, 0)).length = xr(e, r, r, n, 0, 1, t, arguments.length > 1 ? arguments[1] : void 0), e;
    }
  });
  var Or, Rr, Tr;
  Tr = function (t) {
    var e = t.return;
    if (void 0 !== e) return O(e.call(t)).value;
  }, Rr = function (t, e, r, n) {
    try {
      return n ? e(O(r)[0], r[1]) : e(r);
    } catch (e) {
      throw Tr(t), e;
    }
  };
  var jr,
      Mr = {};
  Mr = {};
  var kr = ue("iterator"),
      Ir = Array.prototype;

  jr = function (t) {
    return void 0 !== t && (Mr.Array === t || Ir[kr] === t);
  };

  var Pr,
      Lr,
      Fr = {},
      Nr = {};
  Nr[ue("toStringTag")] = "z", Lr = "[object z]" === String(Nr);
  var Ur = ue("toStringTag"),
      Cr = "Arguments" == p(function () {
    return arguments;
  }());
  Fr = Lr ? p : function (t) {
    var e, r, n;
    return void 0 === t ? "Undefined" : null === t ? "Null" : "string" == typeof (r = function (t, e) {
      try {
        return t[e];
      } catch (t) {}
    }(e = Object(t), Ur)) ? r : Cr ? p(e) : "Object" == (n = p(e)) && "function" == typeof e.callee ? "Arguments" : n;
  };
  var Br = ue("iterator");
  Pr = function (t) {
    if (null != t) return t[Br] || t["@@iterator"] || Mr[Fr(t)];
  }, Or = function (t) {
    var e,
        r,
        n,
        o,
        i,
        a,
        u = $t(t),
        c = "function" == typeof this ? this : Array,
        s = arguments.length,
        f = s > 1 ? arguments[1] : void 0,
        l = void 0 !== f,
        h = Pr(u),
        p = 0;
    if (l && (f = ge(f, s > 2 ? arguments[2] : void 0, 2)), null == h || c == Array && jr(h)) for (r = new c(e = vt(u.length)); e > p; p++) a = l ? f(u[p], p) : u[p], ir(r, p, a);else for (i = (o = h.call(u)).next, r = new c(); !(n = i.call(o)).done; p++) a = l ? Rr(o, f, [n.value, p], !0) : n.value, ir(r, p, a);
    return r.length = p, r;
  };
  var qr,
      zr = ue("iterator"),
      Dr = !1;

  try {
    var Wr = 0,
        Gr = {
      next: function () {
        return {
          done: !!Wr++
        };
      },
      return: function () {
        Dr = !0;
      }
    };
    Gr[zr] = function () {
      return this;
    }, Array.from(Gr, function () {
      throw 2;
    });
  } catch (t) {}

  var Vr = !(qr = function (t, e) {
    if (!e && !Dr) return !1;
    var r = !1;

    try {
      var n = {};
      n[zr] = function () {
        return {
          next: function () {
            return {
              done: r = !0
            };
          }
        };
      }, t(n);
    } catch (t) {}

    return r;
  })(function (t) {
    Array.from(t);
  });
  n({
    target: "Array",
    stat: !0,
    forced: Vr
  }, {
    from: Or
  });
  var $r = pt.includes;
  n({
    target: "Array",
    proto: !0
  }, {
    includes: function (t) {
      return $r(this, t, arguments.length > 1 ? arguments[1] : void 0);
    }
  }), vr("includes");
  var Hr,
      Yr = pt.indexOf;

  Hr = function (t, e) {
    var r = [][t];
    return !!r && u(function () {
      r.call(null, e || function () {
        throw 1;
      }, 1);
    });
  };

  var Xr = [].indexOf,
      Jr = !!Xr && 1 / [1].indexOf(1, -0) < 0,
      Kr = Hr("indexOf");
  n({
    target: "Array",
    proto: !0,
    forced: Jr || !Kr
  }, {
    indexOf: function (t) {
      return Jr ? Xr.apply(this, arguments) || 0 : Yr(this, t, arguments.length > 1 ? arguments[1] : void 0);
    }
  });
  var Qr,
      Zr,
      tn,
      en,
      rn,
      nn = {};
  rn = !u(function () {
    function t() {}

    return t.prototype.constructor = null, Object.getPrototypeOf(new t()) !== t.prototype;
  });
  var on = D("IE_PROTO"),
      an = Object.prototype;
  nn = rn ? Object.getPrototypeOf : function (t) {
    return t = $t(t), w(t, on) ? t[on] : "function" == typeof t.constructor && t instanceof t.constructor ? t.constructor.prototype : t instanceof Object ? an : null;
  };
  var un,
      cn,
      sn,
      fn = ue("iterator"),
      ln = !1;
  [].keys && ("next" in (sn = [].keys()) ? (cn = nn(nn(sn))) !== Object.prototype && (un = cn) : ln = !0);
  var hn = null == un || u(function () {
    var t = {};
    return un[fn].call(t) !== t;
  });
  hn && (un = {}), w(un, fn) || M(un, fn, function () {
    return this;
  });

  var pn = (en = {
    IteratorPrototype: un,
    BUGGY_SAFARI_ITERATORS: ln
  }).IteratorPrototype,
      vn = function () {
    return this;
  };

  tn = function (t, e, r) {
    var n = e + " Iterator";
    return t.prototype = Ht(pn, {
      next: c(1, r)
    }), he(t, n, !1), Mr[n] = vn, t;
  };

  var dn,
      gn = {};
  dn = function (t) {
    if (!b(t) && null !== t) throw TypeError("Can't set " + String(t) + " as a prototype");
    return t;
  }, gn = Object.setPrototypeOf || ("__proto__" in {} ? function () {
    var t,
        e = !1,
        r = {};

    try {
      (t = Object.getOwnPropertyDescriptor(Object.prototype, "__proto__").set).call(r, []), e = r instanceof Array;
    } catch (t) {}

    return function (r, n) {
      return O(r), dn(n), e ? t.call(r, n) : r.__proto__ = n, r;
    };
  }() : void 0);

  var yn = en.IteratorPrototype,
      mn = en.BUGGY_SAFARI_ITERATORS,
      bn = ue("iterator"),
      wn = function () {
    return this;
  };

  Zr = function (t, e, r, o, i, a, u) {
    tn(r, e, o);

    var c,
        s,
        f,
        l = function (t) {
      if (t === i && g) return g;
      if (!mn && t in v) return v[t];

      switch (t) {
        case "keys":
        case "values":
        case "entries":
          return function () {
            return new r(this, t);
          };
      }

      return function () {
        return new r(this);
      };
    },
        h = e + " Iterator",
        p = !1,
        v = t.prototype,
        d = v[bn] || v["@@iterator"] || i && v[i],
        g = !mn && d || l(i),
        y = "Array" == e && v.entries || d;

    if (y && (c = nn(y.call(new t())), yn !== Object.prototype && c.next && (nn(c) !== yn && (gn ? gn(c, yn) : "function" != typeof c[bn] && M(c, bn, wn)), he(c, h, !0))), "values" == i && d && "values" !== d.name && (p = !0, g = function () {
      return d.call(this);
    }), v[bn] !== g && M(v, bn, g), Mr[e] = g, i) if (s = {
      values: l("values"),
      keys: a ? g : l("keys"),
      entries: l("entries")
    }, u) for (f in s) (mn || p || !(f in v)) && P(v, f, s[f]);else n({
      target: e,
      proto: !0,
      forced: mn || p
    }, s);
    return s;
  };

  var Sn = B.set,
      En = B.getterFor("Array Iterator");
  Qr = Zr(Array, "Array", function (t, e) {
    Sn(this, {
      type: "Array Iterator",
      target: h(t),
      index: 0,
      kind: e
    });
  }, function () {
    var t = En(this),
        e = t.target,
        r = t.kind,
        n = t.index++;
    return !e || n >= e.length ? (t.target = void 0, {
      value: void 0,
      done: !0
    }) : "keys" == r ? {
      value: n,
      done: !1
    } : "values" == r ? {
      value: e[n],
      done: !1
    } : {
      value: [n, e[n]],
      done: !1
    };
  }, "values"), Mr.Arguments = Mr.Array, vr("keys"), vr("values"), vr("entries");
  var _n = [].join,
      xn = v != Object,
      An = Hr("join", ",");
  n({
    target: "Array",
    proto: !0,
    forced: xn || !An
  }, {
    join: function (t) {
      return _n.call(h(this), void 0 === t ? "," : t);
    }
  });
  var On = {},
      Rn = Math.min,
      Tn = [].lastIndexOf,
      jn = !!Tn && 1 / [1].lastIndexOf(1, -0) < 0,
      Mn = Hr("lastIndexOf");
  n({
    target: "Array",
    proto: !0,
    forced: (On = jn || !Mn ? function (t) {
      if (jn) return Tn.apply(this, arguments) || 0;
      var e = h(this),
          r = vt(e.length),
          n = r - 1;

      for (arguments.length > 1 && (n = Rn(n, dt(arguments[1]))), n < 0 && (n = r + n); n >= 0; n--) if (n in e && e[n] === t) return n || 0;

      return -1;
    } : Tn) !== [].lastIndexOf
  }, {
    lastIndexOf: On
  });
  var kn = de.map,
      In = ar("map");
  n({
    target: "Array",
    proto: !0,
    forced: !In
  }, {
    map: function (t) {
      return kn(this, t, arguments.length > 1 ? arguments[1] : void 0);
    }
  });
  var Pn = u(function () {
    function t() {}

    return !(Array.of.call(t) instanceof t);
  });
  n({
    target: "Array",
    stat: !0,
    forced: Pn
  }, {
    of: function () {
      for (var t = 0, e = arguments.length, r = new ("function" == typeof this ? this : Array)(e); e > t;) ir(r, t, arguments[t++]);

      return r.length = e, r;
    }
  });

  var Ln,
      Fn = function (t) {
    return function (e, r, n, o) {
      ye(r);
      var i = $t(e),
          a = v(i),
          u = vt(i.length),
          c = t ? u - 1 : 0,
          s = t ? -1 : 1;
      if (n < 2) for (;;) {
        if (c in a) {
          o = a[c], c += s;
          break;
        }

        if (c += s, t ? c < 0 : u <= c) throw TypeError("Reduce of empty array with no initial value");
      }

      for (; t ? c >= 0 : u > c; c += s) c in a && (o = r(o, a[c], c, i));

      return o;
    };
  },
      Nn = (Ln = {
    left: Fn(!1),
    right: Fn(!0)
  }).left,
      Un = Hr("reduce");

  n({
    target: "Array",
    proto: !0,
    forced: !Un || !Nt && Ut > 79 && Ut < 83
  }, {
    reduce: function (t) {
      return Nn(this, t, arguments.length, arguments.length > 1 ? arguments[1] : void 0);
    }
  });
  var Cn = Ln.right,
      Bn = Hr("reduceRight");
  n({
    target: "Array",
    proto: !0,
    forced: !Bn || !Nt && Ut > 79 && Ut < 83
  }, {
    reduceRight: function (t) {
      return Cn(this, t, arguments.length, arguments.length > 1 ? arguments[1] : void 0);
    }
  });
  var qn = ar("slice"),
      zn = ue("species"),
      Dn = [].slice,
      Wn = Math.max;
  n({
    target: "Array",
    proto: !0,
    forced: !qn
  }, {
    slice: function (t, e) {
      var r,
          n,
          o,
          i = h(this),
          a = vt(i.length),
          u = bt(t, a),
          c = bt(void 0 === e ? a : e, a);
      if (Vt(i) && ("function" != typeof (r = i.constructor) || r !== Array && !Vt(r.prototype) ? b(r) && null === (r = r[zn]) && (r = void 0) : r = void 0, r === Array || void 0 === r)) return Dn.call(i, u, c);

      for (n = new (void 0 === r ? Array : r)(Wn(c - u, 0)), o = 0; u < c; u++, o++) u in i && ir(n, o, i[u]);

      return n.length = o, n;
    }
  });
  var Gn = [],
      Vn = Gn.sort,
      $n = u(function () {
    Gn.sort(void 0);
  }),
      Hn = u(function () {
    Gn.sort(null);
  }),
      Yn = Hr("sort");
  n({
    target: "Array",
    proto: !0,
    forced: $n || !Hn || !Yn
  }, {
    sort: function (t) {
      return void 0 === t ? Vn.call($t(this)) : Vn.call($t(this), ye(t));
    }
  });
  var Xn,
      Jn = ue("species");
  (Xn = function (t) {
    var e = ct(t),
        r = I;
    a && e && !e[Jn] && r(e, Jn, {
      configurable: !0,
      get: function () {
        return this;
      }
    });
  })("Array");
  var Kn = ar("splice"),
      Qn = Math.max,
      Zn = Math.min;
  n({
    target: "Array",
    proto: !0,
    forced: !Kn
  }, {
    splice: function (t, e) {
      var r,
          n,
          o,
          i,
          a,
          u,
          c = $t(this),
          s = vt(c.length),
          f = bt(t, s),
          l = arguments.length;
      if (0 === l ? r = n = 0 : 1 === l ? (r = 0, n = s - f) : (r = l - 2, n = Zn(Qn(dt(e), 0), s - f)), s + r - n > 9007199254740991) throw TypeError("Maximum allowed length exceeded");

      for (o = me(c, n), i = 0; i < n; i++) (a = f + i) in c && ir(o, i, c[a]);

      if (o.length = n, r < n) {
        for (i = f; i < s - n; i++) u = i + r, (a = i + n) in c ? c[u] = c[a] : delete c[u];

        for (i = s; i > s - n + r; i--) delete c[i - 1];
      } else if (r > n) for (i = s - n; i > f; i--) u = i + r - 1, (a = i + n - 1) in c ? c[u] = c[a] : delete c[u];

      for (i = 0; i < r; i++) c[i + f] = arguments[i + 2];

      return c.length = s - n + r, o;
    }
  }), vr("flat"), vr("flatMap");
  var to, eo;
  eo = "undefined" != typeof ArrayBuffer && "undefined" != typeof DataView;
  var ro;

  ro = function (t, e, r) {
    for (var n in e) P(t, n, e[n], r);

    return t;
  };

  var no;

  no = function (t, e, r) {
    if (!(t instanceof e)) throw TypeError("Incorrect " + (r ? r + " " : "") + "invocation");
    return t;
  };

  var oo;

  oo = function (t) {
    if (void 0 === t) return 0;
    var e = dt(t),
        r = vt(e);
    if (e !== r) throw RangeError("Wrong length or index");
    return r;
  };

  var io,
      ao = Math.abs,
      uo = Math.pow,
      co = Math.floor,
      so = Math.log,
      fo = Math.LN2;
  io = {
    pack: function (t, e, r) {
      var n,
          o,
          i,
          a = new Array(r),
          u = 8 * r - e - 1,
          c = (1 << u) - 1,
          s = c >> 1,
          f = 23 === e ? uo(2, -24) - uo(2, -77) : 0,
          l = t < 0 || 0 === t && 1 / t < 0 ? 1 : 0,
          h = 0;

      for ((t = ao(t)) != t || t === 1 / 0 ? (o = t != t ? 1 : 0, n = c) : (n = co(so(t) / fo), t * (i = uo(2, -n)) < 1 && (n--, i *= 2), (t += n + s >= 1 ? f / i : f * uo(2, 1 - s)) * i >= 2 && (n++, i /= 2), n + s >= c ? (o = 0, n = c) : n + s >= 1 ? (o = (t * i - 1) * uo(2, e), n += s) : (o = t * uo(2, s - 1) * uo(2, e), n = 0)); e >= 8; a[h++] = 255 & o, o /= 256, e -= 8);

      for (n = n << e | o, u += e; u > 0; a[h++] = 255 & n, n /= 256, u -= 8);

      return a[--h] |= 128 * l, a;
    },
    unpack: function (t, e) {
      var r,
          n = t.length,
          o = 8 * n - e - 1,
          i = (1 << o) - 1,
          a = i >> 1,
          u = o - 7,
          c = n - 1,
          s = t[c--],
          f = 127 & s;

      for (s >>= 7; u > 0; f = 256 * f + t[c], c--, u -= 8);

      for (r = f & (1 << -u) - 1, f >>= -u, u += e; u > 0; r = 256 * r + t[c], c--, u -= 8);

      if (0 === f) f = 1 - a;else {
        if (f === i) return r ? NaN : s ? -1 / 0 : 1 / 0;
        r += uo(2, e), f -= a;
      }
      return (s ? -1 : 1) * r * uo(2, f - e);
    }
  };

  var lo = Ot,
      ho = I,
      po = B.get,
      vo = B.set,
      go = o.ArrayBuffer,
      yo = go,
      mo = o.DataView,
      bo = mo && mo.prototype,
      wo = Object.prototype,
      So = o.RangeError,
      Eo = io.pack,
      _o = io.unpack,
      xo = function (t) {
    return [255 & t];
  },
      Ao = function (t) {
    return [255 & t, t >> 8 & 255];
  },
      Oo = function (t) {
    return [255 & t, t >> 8 & 255, t >> 16 & 255, t >> 24 & 255];
  },
      Ro = function (t) {
    return t[3] << 24 | t[2] << 16 | t[1] << 8 | t[0];
  },
      To = function (t) {
    return Eo(t, 23, 4);
  },
      jo = function (t) {
    return Eo(t, 52, 8);
  },
      Mo = function (t, e) {
    ho(t.prototype, e, {
      get: function () {
        return po(this)[e];
      }
    });
  },
      ko = function (t, e, r, n) {
    var o = oo(r),
        i = po(t);
    if (o + e > i.byteLength) throw So("Wrong index");
    var a = po(i.buffer).bytes,
        u = o + i.byteOffset,
        c = a.slice(u, u + e);
    return n ? c : c.reverse();
  },
      Io = function (t, e, r, n, o, i) {
    var a = oo(r),
        u = po(t);
    if (a + e > u.byteLength) throw So("Wrong index");

    for (var c = po(u.buffer).bytes, s = a + u.byteOffset, f = n(+o), l = 0; l < e; l++) c[s + l] = f[i ? l : e - l - 1];
  };

  if (eo) {
    if (!u(function () {
      go(1);
    }) || !u(function () {
      new go(-1);
    }) || u(function () {
      return new go(), new go(1.5), new go(NaN), "ArrayBuffer" != go.name;
    })) {
      for (var Po, Lo = (yo = function (t) {
        return no(this, yo), new go(oo(t));
      }).prototype = go.prototype, Fo = lo(go), No = 0; Fo.length > No;) (Po = Fo[No++]) in yo || M(yo, Po, go[Po]);

      Lo.constructor = yo;
    }

    gn && nn(bo) !== wo && gn(bo, wo);
    var Uo = new mo(new yo(2)),
        Co = bo.setInt8;
    Uo.setInt8(0, 2147483648), Uo.setInt8(1, 2147483649), !Uo.getInt8(0) && Uo.getInt8(1) || ro(bo, {
      setInt8: function (t, e) {
        Co.call(this, t, e << 24 >> 24);
      },
      setUint8: function (t, e) {
        Co.call(this, t, e << 24 >> 24);
      }
    }, {
      unsafe: !0
    });
  } else yo = function (t) {
    no(this, yo, "ArrayBuffer");
    var e = oo(t);
    vo(this, {
      bytes: yr.call(new Array(e), 0),
      byteLength: e
    }), a || (this.byteLength = e);
  }, mo = function (t, e, r) {
    no(this, mo, "DataView"), no(t, yo, "DataView");
    var n = po(t).byteLength,
        o = dt(e);
    if (o < 0 || o > n) throw So("Wrong offset");
    if (o + (r = void 0 === r ? n - o : vt(r)) > n) throw So("Wrong length");
    vo(this, {
      buffer: t,
      byteLength: r,
      byteOffset: o
    }), a || (this.buffer = t, this.byteLength = r, this.byteOffset = o);
  }, a && (Mo(yo, "byteLength"), Mo(mo, "buffer"), Mo(mo, "byteLength"), Mo(mo, "byteOffset")), ro(mo.prototype, {
    getInt8: function (t) {
      return ko(this, 1, t)[0] << 24 >> 24;
    },
    getUint8: function (t) {
      return ko(this, 1, t)[0];
    },
    getInt16: function (t) {
      var e = ko(this, 2, t, arguments.length > 1 ? arguments[1] : void 0);
      return (e[1] << 8 | e[0]) << 16 >> 16;
    },
    getUint16: function (t) {
      var e = ko(this, 2, t, arguments.length > 1 ? arguments[1] : void 0);
      return e[1] << 8 | e[0];
    },
    getInt32: function (t) {
      return Ro(ko(this, 4, t, arguments.length > 1 ? arguments[1] : void 0));
    },
    getUint32: function (t) {
      return Ro(ko(this, 4, t, arguments.length > 1 ? arguments[1] : void 0)) >>> 0;
    },
    getFloat32: function (t) {
      return _o(ko(this, 4, t, arguments.length > 1 ? arguments[1] : void 0), 23);
    },
    getFloat64: function (t) {
      return _o(ko(this, 8, t, arguments.length > 1 ? arguments[1] : void 0), 52);
    },
    setInt8: function (t, e) {
      Io(this, 1, t, xo, e);
    },
    setUint8: function (t, e) {
      Io(this, 1, t, xo, e);
    },
    setInt16: function (t, e) {
      Io(this, 2, t, Ao, e, arguments.length > 2 ? arguments[2] : void 0);
    },
    setUint16: function (t, e) {
      Io(this, 2, t, Ao, e, arguments.length > 2 ? arguments[2] : void 0);
    },
    setInt32: function (t, e) {
      Io(this, 4, t, Oo, e, arguments.length > 2 ? arguments[2] : void 0);
    },
    setUint32: function (t, e) {
      Io(this, 4, t, Oo, e, arguments.length > 2 ? arguments[2] : void 0);
    },
    setFloat32: function (t, e) {
      Io(this, 4, t, To, e, arguments.length > 2 ? arguments[2] : void 0);
    },
    setFloat64: function (t, e) {
      Io(this, 8, t, jo, e, arguments.length > 2 ? arguments[2] : void 0);
    }
  });

  he(yo, "ArrayBuffer"), he(mo, "DataView");
  var Bo = (to = {
    ArrayBuffer: yo,
    DataView: mo
  }).ArrayBuffer,
      qo = o.ArrayBuffer;
  n({
    global: !0,
    forced: qo !== Bo
  }, {
    ArrayBuffer: Bo
  }), Xn("ArrayBuffer");
  var zo;

  zo = function (t) {
    if ("string" !== t && "number" !== t && "default" !== t) throw TypeError("Incorrect hint");
    return m(O(this), "number" !== t);
  };

  var Do = ue("toPrimitive"),
      Wo = Date.prototype;
  Do in Wo || M(Wo, Do, zo);
  var Go = ue("hasInstance"),
      Vo = Function.prototype;
  Go in Vo || I(Vo, Go, {
    value: function (t) {
      if ("function" != typeof this || !b(t)) return !1;
      if (!b(this.prototype)) return t instanceof this;

      for (; t = nn(t);) if (this.prototype === t) return !0;

      return !1;
    }
  });
  var $o = I,
      Ho = Function.prototype,
      Yo = Ho.toString,
      Xo = /^\s*function ([^ (]*)/;
  a && !("name" in Ho) && $o(Ho, "name", {
    configurable: !0,
    get: function () {
      try {
        return Yo.call(this).match(Xo)[1];
      } catch (t) {
        return "";
      }
    }
  }), he(o.JSON, "JSON", !0);
  var Jo,
      Ko,
      Qo = {},
      Zo = I;
  Ko = !u(function () {
    return Object.isExtensible(Object.preventExtensions({}));
  });

  var ti = G("meta"),
      ei = 0,
      ri = Object.isExtensible || function () {
    return !0;
  },
      ni = function (t) {
    Zo(t, ti, {
      value: {
        objectID: "O" + ++ei,
        weakData: {}
      }
    });
  },
      oi = Qo = {
    REQUIRED: !1,
    fastKey: function (t, e) {
      if (!b(t)) return "symbol" == typeof t ? t : ("string" == typeof t ? "S" : "P") + t;

      if (!w(t, ti)) {
        if (!ri(t)) return "F";
        if (!e) return "E";
        ni(t);
      }

      return t[ti].objectID;
    },
    getWeakData: function (t, e) {
      if (!w(t, ti)) {
        if (!ri(t)) return !0;
        if (!e) return !1;
        ni(t);
      }

      return t[ti].weakData;
    },
    onFreeze: function (t) {
      return Ko && oi.REQUIRED && ri(t) && !w(t, ti) && ni(t), t;
    }
  };

  Y[ti] = !0;

  var ii,
      ai = function (t, e) {
    this.stopped = t, this.result = e;
  };

  ii = function (t, e, r) {
    var n,
        o,
        i,
        a,
        u,
        c,
        s,
        f = r && r.that,
        l = !(!r || !r.AS_ENTRIES),
        h = !(!r || !r.IS_ITERATOR),
        p = !(!r || !r.INTERRUPTED),
        v = ge(e, f, 1 + l + p),
        d = function (t) {
      return n && Tr(n), new ai(!0, t);
    },
        g = function (t) {
      return l ? (O(t), p ? v(t[0], t[1], d) : v(t[0], t[1])) : p ? v(t, d) : v(t);
    };

    if (h) n = t;else {
      if ("function" != typeof (o = Pr(t))) throw TypeError("Target is not iterable");

      if (jr(o)) {
        for (i = 0, a = vt(t.length); a > i; i++) if ((u = g(t[i])) && u instanceof ai) return u;

        return new ai(!1);
      }

      n = o.call(t);
    }

    for (c = n.next; !(s = c.call(n)).done;) {
      try {
        u = g(s.value);
      } catch (t) {
        throw Tr(n), t;
      }

      if ("object" == typeof u && u && u instanceof ai) return u;
    }

    return new ai(!1);
  };

  var ui;
  ui = function (t, e, r) {
    var n, o;
    return gn && "function" == typeof (n = e.constructor) && n !== r && b(o = n.prototype) && o !== r.prototype && gn(t, o), t;
  }, Jo = function (t, e, r) {
    var i = -1 !== t.indexOf("Map"),
        a = -1 !== t.indexOf("Weak"),
        c = i ? "set" : "add",
        s = o[t],
        f = s && s.prototype,
        l = s,
        h = {},
        p = function (t) {
      var e = f[t];
      P(f, t, "add" == t ? function (t) {
        return e.call(this, 0 === t ? 0 : t), this;
      } : "delete" == t ? function (t) {
        return !(a && !b(t)) && e.call(this, 0 === t ? 0 : t);
      } : "get" == t ? function (t) {
        return a && !b(t) ? void 0 : e.call(this, 0 === t ? 0 : t);
      } : "has" == t ? function (t) {
        return !(a && !b(t)) && e.call(this, 0 === t ? 0 : t);
      } : function (t, r) {
        return e.call(this, 0 === t ? 0 : t, r), this;
      });
    };

    if (Tt(t, "function" != typeof s || !(a || f.forEach && !u(function () {
      new s().entries().next();
    })))) l = r.getConstructor(e, t, i, c), Qo.REQUIRED = !0;else if (Tt(t, !0)) {
      var v = new l(),
          d = v[c](a ? {} : -0, 1) != v,
          g = u(function () {
        v.has(1);
      }),
          y = qr(function (t) {
        new s(t);
      }),
          m = !a && u(function () {
        for (var t = new s(), e = 5; e--;) t[c](e, e);

        return !t.has(-0);
      });
      y || ((l = e(function (e, r) {
        no(e, l, t);
        var n = ui(new s(), e, l);
        return null != r && ii(r, n[c], {
          that: n,
          AS_ENTRIES: i
        }), n;
      })).prototype = f, f.constructor = l), (g || m) && (p("delete"), p("has"), i && p("get")), (m || d) && p(c), a && f.clear && delete f.clear;
    }
    return h[t] = l, n({
      global: !0,
      forced: l != s
    }, h), he(l, t), a || r.setStrong(l, t, i), l;
  };
  var ci,
      si = I,
      fi = Qo.fastKey,
      li = B.set,
      hi = B.getterFor;
  Jo("Map", function (t) {
    return function () {
      return t(this, arguments.length ? arguments[0] : void 0);
    };
  }, ci = {
    getConstructor: function (t, e, r, n) {
      var o = t(function (t, i) {
        no(t, o, e), li(t, {
          type: e,
          index: Ht(null),
          first: void 0,
          last: void 0,
          size: 0
        }), a || (t.size = 0), null != i && ii(i, t[n], {
          that: t,
          AS_ENTRIES: r
        });
      }),
          i = hi(e),
          u = function (t, e, r) {
        var n,
            o,
            u = i(t),
            s = c(t, e);
        return s ? s.value = r : (u.last = s = {
          index: o = fi(e, !0),
          key: e,
          value: r,
          previous: n = u.last,
          next: void 0,
          removed: !1
        }, u.first || (u.first = s), n && (n.next = s), a ? u.size++ : t.size++, "F" !== o && (u.index[o] = s)), t;
      },
          c = function (t, e) {
        var r,
            n = i(t),
            o = fi(e);
        if ("F" !== o) return n.index[o];

        for (r = n.first; r; r = r.next) if (r.key == e) return r;
      };

      return ro(o.prototype, {
        clear: function () {
          for (var t = i(this), e = t.index, r = t.first; r;) r.removed = !0, r.previous && (r.previous = r.previous.next = void 0), delete e[r.index], r = r.next;

          t.first = t.last = void 0, a ? t.size = 0 : this.size = 0;
        },
        delete: function (t) {
          var e = i(this),
              r = c(this, t);

          if (r) {
            var n = r.next,
                o = r.previous;
            delete e.index[r.index], r.removed = !0, o && (o.next = n), n && (n.previous = o), e.first == r && (e.first = n), e.last == r && (e.last = o), a ? e.size-- : this.size--;
          }

          return !!r;
        },
        forEach: function (t) {
          for (var e, r = i(this), n = ge(t, arguments.length > 1 ? arguments[1] : void 0, 3); e = e ? e.next : r.first;) for (n(e.value, e.key, this); e && e.removed;) e = e.previous;
        },
        has: function (t) {
          return !!c(this, t);
        }
      }), ro(o.prototype, r ? {
        get: function (t) {
          var e = c(this, t);
          return e && e.value;
        },
        set: function (t, e) {
          return u(this, 0 === t ? 0 : t, e);
        }
      } : {
        add: function (t) {
          return u(this, t = 0 === t ? 0 : t, t);
        }
      }), a && si(o.prototype, "size", {
        get: function () {
          return i(this).size;
        }
      }), o;
    },
    setStrong: function (t, e, r) {
      var n = e + " Iterator",
          o = hi(e),
          i = hi(n);
      Zr(t, e, function (t, e) {
        li(this, {
          type: n,
          target: t,
          state: o(t),
          kind: e,
          last: void 0
        });
      }, function () {
        for (var t = i(this), e = t.kind, r = t.last; r && r.removed;) r = r.previous;

        return t.target && (t.last = r = r ? r.next : t.state.first) ? "keys" == e ? {
          value: r.key,
          done: !1
        } : "values" == e ? {
          value: r.value,
          done: !1
        } : {
          value: [r.key, r.value],
          done: !1
        } : (t.target = void 0, {
          value: void 0,
          done: !0
        });
      }, r ? "entries" : "values", !r, !0), Xn(e);
    }
  });
  var pi = {},
      vi = Math.log;

  pi = Math.log1p || function (t) {
    return (t = +t) > -1e-8 && t < 1e-8 ? t - t * t / 2 : vi(1 + t);
  };

  var di = Math.acosh,
      gi = Math.log,
      yi = Math.sqrt,
      mi = Math.LN2,
      bi = !di || 710 != Math.floor(di(Number.MAX_VALUE)) || di(1 / 0) != 1 / 0;
  n({
    target: "Math",
    stat: !0,
    forced: bi
  }, {
    acosh: function (t) {
      return (t = +t) < 1 ? NaN : t > 94906265.62425156 ? gi(t) + mi : pi(t - 1 + yi(t - 1) * yi(t + 1));
    }
  });
  var wi = Math.asinh,
      Si = Math.log,
      Ei = Math.sqrt;
  n({
    target: "Math",
    stat: !0,
    forced: !(wi && 1 / wi(0) > 0)
  }, {
    asinh: function t(e) {
      return isFinite(e = +e) && 0 != e ? e < 0 ? -t(-e) : Si(e + Ei(e * e + 1)) : e;
    }
  });
  var _i = Math.atanh,
      xi = Math.log;
  n({
    target: "Math",
    stat: !0,
    forced: !(_i && 1 / _i(-0) < 0)
  }, {
    atanh: function (t) {
      return 0 == (t = +t) ? t : xi((1 + t) / (1 - t)) / 2;
    }
  });
  var Ai = {};

  Ai = Math.sign || function (t) {
    return 0 == (t = +t) || t != t ? t : t < 0 ? -1 : 1;
  };

  var Oi = Math.abs,
      Ri = Math.pow;
  n({
    target: "Math",
    stat: !0
  }, {
    cbrt: function (t) {
      return Ai(t = +t) * Ri(Oi(t), 1 / 3);
    }
  });
  var Ti = Math.floor,
      ji = Math.log,
      Mi = Math.LOG2E;
  n({
    target: "Math",
    stat: !0
  }, {
    clz32: function (t) {
      return (t >>>= 0) ? 31 - Ti(ji(t + .5) * Mi) : 32;
    }
  });
  var ki = {},
      Ii = Math.expm1,
      Pi = Math.exp;
  ki = !Ii || Ii(10) > 22025.465794806718 || Ii(10) < 22025.465794806718 || -2e-17 != Ii(-2e-17) ? function (t) {
    return 0 == (t = +t) ? t : t > -1e-6 && t < 1e-6 ? t + t * t / 2 : Pi(t) - 1;
  } : Ii;
  var Li = Math.cosh,
      Fi = Math.abs,
      Ni = Math.E;
  n({
    target: "Math",
    stat: !0,
    forced: !Li || Li(710) === 1 / 0
  }, {
    cosh: function (t) {
      var e = ki(Fi(t) - 1) + 1;
      return (e + 1 / (e * Ni * Ni)) * (Ni / 2);
    }
  }), n({
    target: "Math",
    stat: !0,
    forced: ki != Math.expm1
  }, {
    expm1: ki
  });
  var Ui,
      Ci = Math.abs,
      Bi = Math.pow,
      qi = Bi(2, -52),
      zi = Bi(2, -23),
      Di = Bi(2, 127) * (2 - zi),
      Wi = Bi(2, -126);
  Ui = Math.fround || function (t) {
    var e,
        r,
        n = Ci(t),
        o = Ai(t);
    return n < Wi ? o * (n / Wi / zi + 1 / qi - 1 / qi) * Wi * zi : (r = (e = (1 + zi / qi) * n) - (e - n)) > Di || r != r ? o * (1 / 0) : o * r;
  }, n({
    target: "Math",
    stat: !0
  }, {
    fround: Ui
  });
  var Gi = Math.hypot,
      Vi = Math.abs,
      $i = Math.sqrt,
      Hi = !!Gi && Gi(1 / 0, NaN) !== 1 / 0;
  n({
    target: "Math",
    stat: !0,
    forced: Hi
  }, {
    hypot: function (t, e) {
      for (var r, n, o = 0, i = 0, a = arguments.length, u = 0; i < a;) u < (r = Vi(arguments[i++])) ? (o = o * (n = u / r) * n + 1, u = r) : o += r > 0 ? (n = r / u) * n : r;

      return u === 1 / 0 ? 1 / 0 : u * $i(o);
    }
  });
  var Yi = Math.imul,
      Xi = u(function () {
    return -5 != Yi(4294967295, 5) || 2 != Yi.length;
  });
  n({
    target: "Math",
    stat: !0,
    forced: Xi
  }, {
    imul: function (t, e) {
      var r = +t,
          n = +e,
          o = 65535 & r,
          i = 65535 & n;
      return 0 | o * i + ((65535 & r >>> 16) * i + o * (65535 & n >>> 16) << 16 >>> 0);
    }
  });
  var Ji = Math.log,
      Ki = Math.LOG10E;
  n({
    target: "Math",
    stat: !0
  }, {
    log10: function (t) {
      return Ji(t) * Ki;
    }
  }), n({
    target: "Math",
    stat: !0
  }, {
    log1p: pi
  });
  var Qi = Math.log,
      Zi = Math.LN2;
  n({
    target: "Math",
    stat: !0
  }, {
    log2: function (t) {
      return Qi(t) / Zi;
    }
  }), n({
    target: "Math",
    stat: !0
  }, {
    sign: Ai
  });
  var ta = Math.abs,
      ea = Math.exp,
      ra = Math.E,
      na = u(function () {
    return -2e-17 != Math.sinh(-2e-17);
  });
  n({
    target: "Math",
    stat: !0,
    forced: na
  }, {
    sinh: function (t) {
      return ta(t = +t) < 1 ? (ki(t) - ki(-t)) / 2 : (ea(t - 1) - ea(-t - 1)) * (ra / 2);
    }
  });
  var oa = Math.exp;
  n({
    target: "Math",
    stat: !0
  }, {
    tanh: function (t) {
      var e = ki(t = +t),
          r = ki(-t);
      return e == 1 / 0 ? 1 : r == 1 / 0 ? -1 : (e - r) / (oa(t) + oa(-t));
    }
  }), he(Math, "Math", !0);
  var ia = Math.ceil,
      aa = Math.floor;
  n({
    target: "Math",
    stat: !0
  }, {
    trunc: function (t) {
      return (t > 0 ? aa : ia)(t);
    }
  });

  var ua,
      ca = Ot,
      sa = T,
      fa = I,
      la = {},
      ha = "[" + (la = "\t\n\v\f\r                　\u2028\u2029\ufeff") + "]",
      pa = RegExp("^" + ha + ha + "*"),
      va = RegExp(ha + ha + "*$"),
      da = function (t) {
    return function (e) {
      var r = String(y(e));
      return 1 & t && (r = r.replace(pa, "")), 2 & t && (r = r.replace(va, "")), r;
    };
  },
      ga = (ua = {
    start: da(1),
    end: da(2),
    trim: da(3)
  }).trim,
      ya = o.Number,
      ma = ya.prototype,
      ba = "Number" == p(Ht(ma)),
      wa = function (t) {
    var e,
        r,
        n,
        o,
        i,
        a,
        u,
        c,
        s = m(t, !1);
    if ("string" == typeof s && s.length > 2) if (43 === (e = (s = ga(s)).charCodeAt(0)) || 45 === e) {
      if (88 === (r = s.charCodeAt(2)) || 120 === r) return NaN;
    } else if (48 === e) {
      switch (s.charCodeAt(1)) {
        case 66:
        case 98:
          n = 2, o = 49;
          break;

        case 79:
        case 111:
          n = 8, o = 55;
          break;

        default:
          return +s;
      }

      for (a = (i = s.slice(2)).length, u = 0; u < a; u++) if ((c = i.charCodeAt(u)) < 48 || c > o) return NaN;

      return parseInt(i, n);
    }
    return +s;
  };

  if (Tt("Number", !ya(" 0o1") || !ya("0b1") || ya("+0x1"))) {
    for (var Sa, Ea = function (t) {
      var e = arguments.length < 1 ? 0 : t,
          r = this;
      return r instanceof Ea && (ba ? u(function () {
        ma.valueOf.call(r);
      }) : "Number" != p(r)) ? ui(new ya(wa(e)), r, Ea) : wa(e);
    }, _a = a ? ca(ya) : "MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger,fromString,range".split(","), xa = 0; _a.length > xa; xa++) w(ya, Sa = _a[xa]) && !w(Ea, Sa) && fa(Ea, Sa, sa(ya, Sa));

    Ea.prototype = ma, ma.constructor = Ea, P(o, "Number", Ea);
  }

  n({
    target: "Number",
    stat: !0
  }, {
    EPSILON: Math.pow(2, -52)
  });
  var Aa,
      Oa = o.isFinite;
  Aa = Number.isFinite || function (t) {
    return "number" == typeof t && Oa(t);
  }, n({
    target: "Number",
    stat: !0
  }, {
    isFinite: Aa
  });
  var Ra,
      Ta = Math.floor;
  n({
    target: "Number",
    stat: !0
  }, {
    isInteger: Ra = function (t) {
      return !b(t) && isFinite(t) && Ta(t) === t;
    }
  }), n({
    target: "Number",
    stat: !0
  }, {
    isNaN: function (t) {
      return t != t;
    }
  });
  var ja = Math.abs;
  n({
    target: "Number",
    stat: !0
  }, {
    isSafeInteger: function (t) {
      return Ra(t) && ja(t) <= 9007199254740991;
    }
  }), n({
    target: "Number",
    stat: !0
  }, {
    MAX_SAFE_INTEGER: 9007199254740991
  }), n({
    target: "Number",
    stat: !0
  }, {
    MIN_SAFE_INTEGER: -9007199254740991
  });
  var Ma,
      ka = ua.trim,
      Ia = o.parseFloat;
  Ma = 1 / Ia(la + "-0") != -1 / 0 ? function (t) {
    var e = ka(String(t)),
        r = Ia(e);
    return 0 === r && "-" == e.charAt(0) ? -0 : r;
  } : Ia, n({
    target: "Number",
    stat: !0,
    forced: Number.parseFloat != Ma
  }, {
    parseFloat: Ma
  });
  var Pa,
      La = ua.trim,
      Fa = o.parseInt,
      Na = /^[+-]?0[Xx]/;
  Pa = 8 !== Fa(la + "08") || 22 !== Fa(la + "0x16") ? function (t, e) {
    var r = La(String(t));
    return Fa(r, e >>> 0 || (Na.test(r) ? 16 : 10));
  } : Fa, n({
    target: "Number",
    stat: !0,
    forced: Number.parseInt != Pa
  }, {
    parseInt: Pa
  });
  var Ua;

  Ua = function (t) {
    if ("number" != typeof t && "Number" != p(t)) throw TypeError("Incorrect invocation");
    return +t;
  };

  var Ca = {};

  Ca = "".repeat || function (t) {
    var e = String(y(this)),
        r = "",
        n = dt(t);
    if (n < 0 || n == 1 / 0) throw RangeError("Wrong number of repetitions");

    for (; n > 0; (n >>>= 1) && (e += e)) 1 & n && (r += e);

    return r;
  };

  var Ba = 1..toFixed,
      qa = Math.floor,
      za = function (t, e, r) {
    return 0 === e ? r : e % 2 == 1 ? za(t, e - 1, r * t) : za(t * t, e / 2, r);
  },
      Da = function (t, e, r) {
    for (var n = -1, o = r; ++n < 6;) o += e * t[n], t[n] = o % 1e7, o = qa(o / 1e7);
  },
      Wa = function (t, e) {
    for (var r = 6, n = 0; --r >= 0;) n += t[r], t[r] = qa(n / e), n = n % e * 1e7;
  },
      Ga = function (t) {
    for (var e = 6, r = ""; --e >= 0;) if ("" !== r || 0 === e || 0 !== t[e]) {
      var n = String(t[e]);
      r = "" === r ? n : r + Ca.call("0", 7 - n.length) + n;
    }

    return r;
  },
      Va = Ba && ("0.000" !== 8e-5.toFixed(3) || "1" !== .9.toFixed(0) || "1.25" !== 1.255.toFixed(2) || "1000000000000000128" !== 0xde0b6b3a7640080.toFixed(0)) || !u(function () {
    Ba.call({});
  });

  n({
    target: "Number",
    proto: !0,
    forced: Va
  }, {
    toFixed: function (t) {
      var e,
          r,
          n,
          o,
          i = Ua(this),
          a = dt(t),
          u = [0, 0, 0, 0, 0, 0],
          c = "",
          s = "0";
      if (a < 0 || a > 20) throw RangeError("Incorrect fraction digits");
      if (i != i) return "NaN";
      if (i <= -1e21 || i >= 1e21) return String(i);
      if (i < 0 && (c = "-", i = -i), i > 1e-21) if (r = (e = function (t) {
        for (var e = 0, r = t; r >= 4096;) e += 12, r /= 4096;

        for (; r >= 2;) e += 1, r /= 2;

        return e;
      }(i * za(2, 69, 1)) - 69) < 0 ? i * za(2, -e, 1) : i / za(2, e, 1), r *= 4503599627370496, (e = 52 - e) > 0) {
        for (Da(u, 0, r), n = a; n >= 7;) Da(u, 1e7, 0), n -= 7;

        for (Da(u, za(10, n, 1), 0), n = e - 1; n >= 23;) Wa(u, 1 << 23), n -= 23;

        Wa(u, 1 << n), Da(u, 1, 1), Wa(u, 2), s = Ga(u);
      } else Da(u, 0, r), Da(u, 1 << -e, 0), s = Ga(u) + Ca.call("0", a);
      return s = a > 0 ? c + ((o = s.length) <= a ? "0." + Ca.call("0", a - o) + s : s.slice(0, o - a) + "." + s.slice(o - a)) : c + s;
    }
  });
  var $a = {},
      Ha = Object.assign,
      Ya = Object.defineProperty;
  $a = !Ha || u(function () {
    if (a && 1 !== Ha({
      b: 1
    }, Ha(Ya({}, "a", {
      enumerable: !0,
      get: function () {
        Ya(this, "b", {
          value: 3,
          enumerable: !1
        });
      }
    }), {
      b: 2
    })).b) return !0;
    var t = {},
        e = {},
        r = Symbol();
    return t[r] = 7, "abcdefghijklmnopqrst".split("").forEach(function (t) {
      e[t] = t;
    }), 7 != Ha({}, t)[r] || "abcdefghijklmnopqrst" != Xt(Ha({}, e)).join("");
  }) ? function (t, e) {
    for (var r = $t(t), n = arguments.length, o = 1, i = Rt, u = l; n > o;) for (var c, s = v(arguments[o++]), f = i ? Xt(s).concat(i(s)) : Xt(s), h = f.length, p = 0; h > p;) c = f[p++], a && !u.call(s, c) || (r[c] = s[c]);

    return r;
  } : Ha, n({
    target: "Object",
    stat: !0,
    forced: Object.assign !== $a
  }, {
    assign: $a
  });
  var Xa;
  Xa = !u(function () {
    var t = Math.random();
    __defineSetter__.call(null, t, function () {}), delete o[t];
  }), a && n({
    target: "Object",
    proto: !0,
    forced: Xa
  }, {
    __defineGetter__: function (t, e) {
      I($t(this), t, {
        get: ye(e),
        enumerable: !0,
        configurable: !0
      });
    }
  }), a && n({
    target: "Object",
    proto: !0,
    forced: Xa
  }, {
    __defineSetter__: function (t, e) {
      I($t(this), t, {
        set: ye(e),
        enumerable: !0,
        configurable: !0
      });
    }
  });

  var Ja,
      Ka = l,
      Qa = function (t) {
    return function (e) {
      for (var r, n = h(e), o = Xt(n), i = o.length, u = 0, c = []; i > u;) r = o[u++], a && !Ka.call(n, r) || c.push(t ? [r, n[r]] : n[r]);

      return c;
    };
  },
      Za = (Ja = {
    entries: Qa(!0),
    values: Qa(!1)
  }).entries;

  n({
    target: "Object",
    stat: !0
  }, {
    entries: function (t) {
      return Za(t);
    }
  });
  var tu = Qo.onFreeze,
      eu = Object.freeze,
      ru = u(function () {
    eu(1);
  });
  n({
    target: "Object",
    stat: !0,
    forced: ru,
    sham: !Ko
  }, {
    freeze: function (t) {
      return eu && b(t) ? eu(tu(t)) : t;
    }
  }), n({
    target: "Object",
    stat: !0
  }, {
    fromEntries: function (t) {
      var e = {};
      return ii(t, function (t, r) {
        ir(e, t, r);
      }, {
        AS_ENTRIES: !0
      }), e;
    }
  });
  var nu = T,
      ou = u(function () {
    nu(1);
  });
  n({
    target: "Object",
    stat: !0,
    forced: !a || ou,
    sham: !a
  }, {
    getOwnPropertyDescriptor: function (t, e) {
      return nu(h(t), e);
    }
  }), n({
    target: "Object",
    stat: !0,
    sham: !a
  }, {
    getOwnPropertyDescriptors: function (t) {
      for (var e, r, n = h(t), o = T, i = st(n), a = {}, u = 0; i.length > u;) void 0 !== (r = o(n, e = i[u++])) && ir(a, e, r);

      return a;
    }
  });
  var iu = ae,
      au = u(function () {
    return !Object.getOwnPropertyNames(1);
  });
  n({
    target: "Object",
    stat: !0,
    forced: au
  }, {
    getOwnPropertyNames: iu
  });
  var uu = u(function () {
    nn(1);
  });
  n({
    target: "Object",
    stat: !0,
    forced: uu,
    sham: !rn
  }, {
    getPrototypeOf: function (t) {
      return nn($t(t));
    }
  });
  var cu = {};
  cu = Object.is || function (t, e) {
    return t === e ? 0 !== t || 1 / t == 1 / e : t != t && e != e;
  }, n({
    target: "Object",
    stat: !0
  }, {
    is: cu
  });
  var su = Object.isExtensible,
      fu = u(function () {
    su(1);
  });
  n({
    target: "Object",
    stat: !0,
    forced: fu
  }, {
    isExtensible: function (t) {
      return !!b(t) && (!su || su(t));
    }
  });
  var lu = Object.isFrozen,
      hu = u(function () {
    lu(1);
  });
  n({
    target: "Object",
    stat: !0,
    forced: hu
  }, {
    isFrozen: function (t) {
      return !b(t) || !!lu && lu(t);
    }
  });
  var pu = Object.isSealed,
      vu = u(function () {
    pu(1);
  });
  n({
    target: "Object",
    stat: !0,
    forced: vu
  }, {
    isSealed: function (t) {
      return !b(t) || !!pu && pu(t);
    }
  });
  var du = u(function () {
    Xt(1);
  });
  n({
    target: "Object",
    stat: !0,
    forced: du
  }, {
    keys: function (t) {
      return Xt($t(t));
    }
  });
  var gu = T;
  a && n({
    target: "Object",
    proto: !0,
    forced: Xa
  }, {
    __lookupGetter__: function (t) {
      var e,
          r = $t(this),
          n = m(t, !0);

      do {
        if (e = gu(r, n)) return e.get;
      } while (r = nn(r));
    }
  });
  var yu = T;
  a && n({
    target: "Object",
    proto: !0,
    forced: Xa
  }, {
    __lookupSetter__: function (t) {
      var e,
          r = $t(this),
          n = m(t, !0);

      do {
        if (e = yu(r, n)) return e.set;
      } while (r = nn(r));
    }
  });
  var mu = Qo.onFreeze,
      bu = Object.preventExtensions,
      wu = u(function () {
    bu(1);
  });
  n({
    target: "Object",
    stat: !0,
    forced: wu,
    sham: !Ko
  }, {
    preventExtensions: function (t) {
      return bu && b(t) ? bu(mu(t)) : t;
    }
  });

  var Su = Qo.onFreeze,
      Eu = Object.seal,
      _u = u(function () {
    Eu(1);
  });

  n({
    target: "Object",
    stat: !0,
    forced: _u,
    sham: !Ko
  }, {
    seal: function (t) {
      return Eu && b(t) ? Eu(Su(t)) : t;
    }
  });
  var xu;
  xu = Lr ? {}.toString : function () {
    return "[object " + Fr(this) + "]";
  }, Lr || P(Object.prototype, "toString", xu, {
    unsafe: !0
  });
  var Au = Ja.values;
  n({
    target: "Object",
    stat: !0
  }, {
    values: function (t) {
      return Au(t);
    }
  });
  var Ou = {};
  Ou = o.Promise;
  var Ru,
      Tu = ue("species");

  Ru = function (t, e) {
    var r,
        n = O(t).constructor;
    return void 0 === n || null == (r = O(n)[Tu]) ? e : ye(r);
  };

  var ju, Mu;
  Mu = /(iphone|ipod|ipad).*applewebkit/i.test(Ct);

  var ku,
      Iu,
      Pu,
      Lu = o.location,
      Fu = o.setImmediate,
      Nu = o.clearImmediate,
      Uu = o.process,
      Cu = o.MessageChannel,
      Bu = o.Dispatch,
      qu = 0,
      zu = {},
      Du = function (t) {
    if (zu.hasOwnProperty(t)) {
      var e = zu[t];
      delete zu[t], e();
    }
  },
      Wu = function (t) {
    return function () {
      Du(t);
    };
  },
      Gu = function (t) {
    Du(t.data);
  },
      Vu = function (t) {
    o.postMessage(t + "", Lu.protocol + "//" + Lu.host);
  };

  Fu && Nu || (Fu = function (t) {
    for (var e = [], r = 1; arguments.length > r;) e.push(arguments[r++]);

    return zu[++qu] = function () {
      ("function" == typeof t ? t : Function(t)).apply(void 0, e);
    }, ku(qu), qu;
  }, Nu = function (t) {
    delete zu[t];
  }, Nt ? ku = function (t) {
    Uu.nextTick(Wu(t));
  } : Bu && Bu.now ? ku = function (t) {
    Bu.now(Wu(t));
  } : Cu && !Mu ? (Pu = (Iu = new Cu()).port2, Iu.port1.onmessage = Gu, ku = ge(Pu.postMessage, Pu, 1)) : o.addEventListener && "function" == typeof postMessage && !o.importScripts && Lu && "file:" !== Lu.protocol && !u(Vu) ? (ku = Vu, o.addEventListener("message", Gu, !1)) : ku = "onreadystatechange" in _("script") ? function (t) {
    Jt.appendChild(_("script")).onreadystatechange = function () {
      Jt.removeChild(this), Du(t);
    };
  } : function (t) {
    setTimeout(Wu(t), 0);
  });
  var $u,
      Hu = (ju = {
    set: Fu,
    clear: Nu
  }).set,
      Yu = {},
      Xu = T,
      Ju = ju.set;
  $u = /web0s(?!.*chrome)/i.test(Ct);
  var Ku,
      Qu,
      Zu,
      tc,
      ec,
      rc,
      nc,
      oc,
      ic = o.MutationObserver || o.WebKitMutationObserver,
      ac = o.document,
      uc = o.process,
      cc = o.Promise,
      sc = Xu(o, "queueMicrotask"),
      fc = sc && sc.value;
  fc || (Ku = function () {
    var t, e;

    for (Nt && (t = uc.domain) && t.exit(); Qu;) {
      e = Qu.fn, Qu = Qu.next;

      try {
        e();
      } catch (t) {
        throw Qu ? tc() : Zu = void 0, t;
      }
    }

    Zu = void 0, t && t.enter();
  }, Mu || Nt || $u || !ic || !ac ? cc && cc.resolve ? (nc = cc.resolve(void 0), oc = nc.then, tc = function () {
    oc.call(nc, Ku);
  }) : tc = Nt ? function () {
    uc.nextTick(Ku);
  } : function () {
    Ju.call(o, Ku);
  } : (ec = !0, rc = ac.createTextNode(""), new ic(Ku).observe(rc, {
    characterData: !0
  }), tc = function () {
    rc.data = ec = !ec;
  })), Yu = fc || function (t) {
    var e = {
      fn: t,
      next: void 0
    };
    Zu && (Zu.next = e), Qu || (Qu = e, tc()), Zu = e;
  };

  var lc,
      hc = function (t) {
    var e, r;
    this.promise = new t(function (t, n) {
      if (void 0 !== e || void 0 !== r) throw TypeError("Bad Promise constructor");
      e = t, r = n;
    }), this.resolve = ye(e), this.reject = ye(r);
  },
      pc = function (t) {
    return new hc(t);
  };

  lc = function (t, e) {
    if (O(t), b(e) && e.constructor === t) return e;
    var r = pc(t);
    return (0, r.resolve)(e), r.promise;
  };

  var vc;

  vc = function (t, e) {
    var r = o.console;
    r && r.error && (1 === arguments.length ? r.error(t) : r.error(t, e));
  };

  var dc;

  dc = function (t) {
    try {
      return {
        error: !1,
        value: t()
      };
    } catch (t) {
      return {
        error: !0,
        value: t
      };
    }
  };

  var gc,
      yc,
      mc,
      bc,
      wc = ue("species"),
      Sc = B.get,
      Ec = B.set,
      _c = B.getterFor("Promise"),
      xc = o.TypeError,
      Ac = o.document,
      Oc = o.process,
      Rc = ct("fetch"),
      Tc = pc,
      jc = Tc,
      Mc = !!(Ac && Ac.createEvent && o.dispatchEvent),
      kc = "function" == typeof PromiseRejectionEvent,
      Ic = Tt("Promise", function () {
    if (!(F(Ou) !== String(Ou))) {
      if (66 === Ut) return !0;
      if (!Nt && !kc) return !0;
    }

    if (Ut >= 51 && /native code/.test(Ou)) return !1;

    var t = Ou.resolve(1),
        e = function (t) {
      t(function () {}, function () {});
    };

    return (t.constructor = {})[wc] = e, !(t.then(function () {}) instanceof e);
  }),
      Pc = Ic || !qr(function (t) {
    Ou.all(t).catch(function () {});
  }),
      Lc = function (t) {
    var e;
    return !(!b(t) || "function" != typeof (e = t.then)) && e;
  },
      Fc = function (t, e) {
    if (!t.notified) {
      t.notified = !0;
      var r = t.reactions;
      Yu(function () {
        for (var n = t.value, o = 1 == t.state, i = 0; r.length > i;) {
          var a,
              u,
              c,
              s = r[i++],
              f = o ? s.ok : s.fail,
              l = s.resolve,
              h = s.reject,
              p = s.domain;

          try {
            f ? (o || (2 === t.rejection && Bc(t), t.rejection = 1), !0 === f ? a = n : (p && p.enter(), a = f(n), p && (p.exit(), c = !0)), a === s.promise ? h(xc("Promise-chain cycle")) : (u = Lc(a)) ? u.call(a, l, h) : l(a)) : h(n);
          } catch (t) {
            p && !c && p.exit(), h(t);
          }
        }

        t.reactions = [], t.notified = !1, e && !t.rejection && Uc(t);
      });
    }
  },
      Nc = function (t, e, r) {
    var n, i;
    Mc ? ((n = Ac.createEvent("Event")).promise = e, n.reason = r, n.initEvent(t, !1, !0), o.dispatchEvent(n)) : n = {
      promise: e,
      reason: r
    }, !kc && (i = o["on" + t]) ? i(n) : "unhandledrejection" === t && vc("Unhandled promise rejection", r);
  },
      Uc = function (t) {
    Hu.call(o, function () {
      var e,
          r = t.facade,
          n = t.value;
      if (Cc(t) && (e = dc(function () {
        Nt ? Oc.emit("unhandledRejection", n, r) : Nc("unhandledrejection", r, n);
      }), t.rejection = Nt || Cc(t) ? 2 : 1, e.error)) throw e.value;
    });
  },
      Cc = function (t) {
    return 1 !== t.rejection && !t.parent;
  },
      Bc = function (t) {
    Hu.call(o, function () {
      var e = t.facade;
      Nt ? Oc.emit("rejectionHandled", e) : Nc("rejectionhandled", e, t.value);
    });
  },
      qc = function (t, e, r) {
    return function (n) {
      t(e, n, r);
    };
  },
      zc = function (t, e, r) {
    t.done || (t.done = !0, r && (t = r), t.value = e, t.state = 2, Fc(t, !0));
  },
      Dc = function (t, e, r) {
    if (!t.done) {
      t.done = !0, r && (t = r);

      try {
        if (t.facade === e) throw xc("Promise can't be resolved itself");
        var n = Lc(e);
        n ? Yu(function () {
          var r = {
            done: !1
          };

          try {
            n.call(e, qc(Dc, r, t), qc(zc, r, t));
          } catch (e) {
            zc(r, e, t);
          }
        }) : (t.value = e, t.state = 1, Fc(t, !1));
      } catch (e) {
        zc({
          done: !1
        }, e, t);
      }
    }
  };

  Ic && (function (t) {
    no(this, Ou, "Promise"), ye(t), gc.call(this);
    var e = Sc(this);

    try {
      t(qc(Dc, e), qc(zc, e));
    } catch (t) {
      zc(e, t);
    }
  }, (gc = function (t) {
    Ec(this, {
      type: "Promise",
      done: !1,
      notified: !1,
      parent: !1,
      reactions: [],
      rejection: !1,
      state: 0,
      value: void 0
    });
  }).prototype = ro(Ou.prototype, {
    then: function (t, e) {
      var r = _c(this),
          n = Tc(Ru(this, Ou));

      return n.ok = "function" != typeof t || t, n.fail = "function" == typeof e && e, n.domain = Nt ? Oc.domain : void 0, r.parent = !0, r.reactions.push(n), 0 != r.state && Fc(r, !1), n.promise;
    },
    catch: function (t) {
      return this.then(void 0, t);
    }
  }), yc = function () {
    var t = new gc(),
        e = Sc(t);
    this.promise = t, this.resolve = qc(Dc, e), this.reject = qc(zc, e);
  }, pc = Tc = function (t) {
    return t === Ou || t === mc ? new yc(t) : jc(t);
  }, "function" == typeof Ou && (bc = Ou.prototype.then, P(Ou.prototype, "then", function (t, e) {
    var r = this;
    return new Ou(function (t, e) {
      bc.call(r, t, e);
    }).then(t, e);
  }, {
    unsafe: !0
  }), "function" == typeof Rc && n({
    global: !0,
    enumerable: !0,
    forced: !0
  }, {
    fetch: function (t) {
      return lc(Ou, Rc.apply(o, arguments));
    }
  }))), n({
    global: !0,
    wrap: !0,
    forced: Ic
  }, {
    Promise: Ou
  }), he(Ou, "Promise", !1), Xn("Promise"), mc = ct("Promise"), n({
    target: "Promise",
    stat: !0,
    forced: Ic
  }, {
    reject: function (t) {
      var e = Tc(this);
      return e.reject.call(void 0, t), e.promise;
    }
  }), n({
    target: "Promise",
    stat: !0,
    forced: Ic
  }, {
    resolve: function (t) {
      return lc(this, t);
    }
  }), n({
    target: "Promise",
    stat: !0,
    forced: Pc
  }, {
    all: function (t) {
      var e = this,
          r = Tc(e),
          n = r.resolve,
          o = r.reject,
          i = dc(function () {
        var r = ye(e.resolve),
            i = [],
            a = 0,
            u = 1;
        ii(t, function (t) {
          var c = a++,
              s = !1;
          i.push(void 0), u++, r.call(e, t).then(function (t) {
            s || (s = !0, i[c] = t, --u || n(i));
          }, o);
        }), --u || n(i);
      });
      return i.error && o(i.value), r.promise;
    },
    race: function (t) {
      var e = this,
          r = Tc(e),
          n = r.reject,
          o = dc(function () {
        var o = ye(e.resolve);
        ii(t, function (t) {
          o.call(e, t).then(r.resolve, n);
        });
      });
      return o.error && n(o.value), r.promise;
    }
  });
  var Wc = !!Ou && u(function () {
    Ou.prototype.finally.call({
      then: function () {}
    }, function () {});
  });
  n({
    target: "Promise",
    proto: !0,
    real: !0,
    forced: Wc
  }, {
    finally: function (t) {
      var e = Ru(this, ct("Promise")),
          r = "function" == typeof t;
      return this.then(r ? function (r) {
        return lc(e, t()).then(function () {
          return r;
        });
      } : t, r ? function (r) {
        return lc(e, t()).then(function () {
          throw r;
        });
      } : t);
    }
  }), "function" != typeof Ou || Ou.prototype.finally || P(Ou.prototype, "finally", ct("Promise").prototype.finally);
  var Gc = ct("Reflect", "apply"),
      Vc = Function.apply,
      $c = !u(function () {
    Gc(function () {});
  });
  n({
    target: "Reflect",
    stat: !0,
    forced: $c
  }, {
    apply: function (t, e, r) {
      return ye(t), O(r), Gc ? Gc(t, e, r) : Vc.call(t, e, r);
    }
  });

  var Hc = {},
      Yc = [].slice,
      Xc = {},
      Jc = function (t, e, r) {
    if (!(e in Xc)) {
      for (var n = [], o = 0; o < e; o++) n[o] = "a[" + o + "]";

      Xc[e] = Function("C,a", "return new C(" + n.join(",") + ")");
    }

    return Xc[e](t, r);
  };

  Hc = Function.bind || function (t) {
    var e = ye(this),
        r = Yc.call(arguments, 1),
        n = function () {
      var o = r.concat(Yc.call(arguments));
      return this instanceof n ? Jc(e, o.length, o) : e.apply(t, o);
    };

    return b(e.prototype) && (n.prototype = e.prototype), n;
  };

  var Kc = ct("Reflect", "construct"),
      Qc = u(function () {
    function t() {}

    return !(Kc(function () {}, [], t) instanceof t);
  }),
      Zc = !u(function () {
    Kc(function () {});
  }),
      ts = Qc || Zc;
  n({
    target: "Reflect",
    stat: !0,
    forced: ts,
    sham: ts
  }, {
    construct: function (t, e) {
      ye(t), O(e);
      var r = arguments.length < 3 ? t : ye(arguments[2]);
      if (Zc && !Qc) return Kc(t, e, r);

      if (t == r) {
        switch (e.length) {
          case 0:
            return new t();

          case 1:
            return new t(e[0]);

          case 2:
            return new t(e[0], e[1]);

          case 3:
            return new t(e[0], e[1], e[2]);

          case 4:
            return new t(e[0], e[1], e[2], e[3]);
        }

        var n = [null];
        return n.push.apply(n, e), new (Hc.apply(t, n))();
      }

      var o = r.prototype,
          i = Ht(b(o) ? o : Object.prototype),
          a = Function.apply.call(t, i, e);
      return b(a) ? a : i;
    }
  });
  var es = u(function () {
    Reflect.defineProperty(I({}, 1, {
      value: 1
    }), 1, {
      value: 2
    });
  });
  n({
    target: "Reflect",
    stat: !0,
    forced: es,
    sham: !a
  }, {
    defineProperty: function (t, e, r) {
      O(t);
      var n = m(e, !0);
      O(r);

      try {
        return I(t, n, r), !0;
      } catch (t) {
        return !1;
      }
    }
  });
  var rs = T;
  n({
    target: "Reflect",
    stat: !0
  }, {
    deleteProperty: function (t, e) {
      var r = rs(O(t), e);
      return !(r && !r.configurable) && delete t[e];
    }
  }), n({
    target: "Reflect",
    stat: !0
  }, {
    get: function t(e, r) {
      var n,
          o,
          i = arguments.length < 3 ? e : arguments[2];
      return O(e) === i ? e[r] : (n = T(e, r)) ? w(n, "value") ? n.value : void 0 === n.get ? void 0 : n.get.call(i) : b(o = nn(e)) ? t(o, r, i) : void 0;
    }
  }), n({
    target: "Reflect",
    stat: !0,
    sham: !a
  }, {
    getOwnPropertyDescriptor: function (t, e) {
      return T(O(t), e);
    }
  }), n({
    target: "Reflect",
    stat: !0,
    sham: !rn
  }, {
    getPrototypeOf: function (t) {
      return nn(O(t));
    }
  }), n({
    target: "Reflect",
    stat: !0
  }, {
    has: function (t, e) {
      return e in t;
    }
  });
  var ns = Object.isExtensible;
  n({
    target: "Reflect",
    stat: !0
  }, {
    isExtensible: function (t) {
      return O(t), !ns || ns(t);
    }
  }), n({
    target: "Reflect",
    stat: !0
  }, {
    ownKeys: st
  }), n({
    target: "Reflect",
    stat: !0,
    sham: !Ko
  }, {
    preventExtensions: function (t) {
      O(t);

      try {
        var e = ct("Object", "preventExtensions");
        return e && e(t), !0;
      } catch (t) {
        return !1;
      }
    }
  });
  var os = u(function () {
    var t = function () {},
        e = I(new t(), "a", {
      configurable: !0
    });

    return !1 !== Reflect.set(t.prototype, "a", 1, e);
  });
  n({
    target: "Reflect",
    stat: !0,
    forced: os
  }, {
    set: function t(e, r, n) {
      var o,
          i,
          a = arguments.length < 4 ? e : arguments[3],
          u = T(O(e), r);

      if (!u) {
        if (b(i = nn(e))) return t(i, r, n, a);
        u = c(0);
      }

      if (w(u, "value")) {
        if (!1 === u.writable || !b(a)) return !1;

        if (o = T(a, r)) {
          if (o.get || o.set || !1 === o.writable) return !1;
          o.value = n, I(a, r, o);
        } else I(a, r, c(0, n));

        return !0;
      }

      return void 0 !== u.set && (u.set.call(a, n), !0);
    }
  }), gn && n({
    target: "Reflect",
    stat: !0
  }, {
    setPrototypeOf: function (t, e) {
      O(t), dn(e);

      try {
        return gn(t, e), !0;
      } catch (t) {
        return !1;
      }
    }
  });
  var is,
      as = I,
      us = Ot,
      cs = ue("match");

  is = function (t) {
    var e;
    return b(t) && (void 0 !== (e = t[cs]) ? !!e : "RegExp" == p(t));
  };

  var ss;

  function fs(t, e) {
    return RegExp(t, e);
  }

  ss = function () {
    var t = O(this),
        e = "";
    return t.global && (e += "g"), t.ignoreCase && (e += "i"), t.multiline && (e += "m"), t.dotAll && (e += "s"), t.unicode && (e += "u"), t.sticky && (e += "y"), e;
  };

  var ls = u(function () {
    var t = fs("a", "y");
    return t.lastIndex = 2, null != t.exec("abcd");
  }),
      hs = u(function () {
    var t = fs("^r", "gy");
    return t.lastIndex = 2, null != t.exec("str");
  }),
      ps = B.set,
      vs = ue("match"),
      ds = o.RegExp,
      gs = ds.prototype,
      ys = /a/g,
      ms = /a/g,
      bs = new ds(ys) !== ys,
      ws = ls;

  if (a && Tt("RegExp", !bs || ws || u(function () {
    return ms[vs] = !1, ds(ys) != ys || ds(ms) == ms || "/a/i" != ds(ys, "i");
  }))) {
    for (var Ss = function (t, e) {
      var r,
          n = this instanceof Ss,
          o = is(t),
          i = void 0 === e;
      if (!n && o && t.constructor === Ss && i) return t;
      bs ? o && !i && (t = t.source) : t instanceof Ss && (i && (e = ss.call(t)), t = t.source), ws && (r = !!e && e.indexOf("y") > -1) && (e = e.replace(/y/g, ""));
      var a = ui(bs ? new ds(t, e) : ds(t, e), n ? this : gs, Ss);
      return ws && r && ps(a, {
        sticky: r
      }), a;
    }, Es = function (t) {
      (t in Ss) || as(Ss, t, {
        configurable: !0,
        get: function () {
          return ds[t];
        },
        set: function (e) {
          ds[t] = e;
        }
      });
    }, _s = us(ds), xs = 0; _s.length > xs;) Es(_s[xs++]);

    gs.constructor = Ss, Ss.prototype = gs, P(o, "RegExp", Ss);
  }

  Xn("RegExp");
  var As,
      Os,
      Rs = {},
      Ts = RegExp.prototype.exec,
      js = String.prototype.replace,
      Ms = Ts,
      ks = (As = /a/, Os = /b*/g, Ts.call(As, "a"), Ts.call(Os, "a"), 0 !== As.lastIndex || 0 !== Os.lastIndex),
      Is = ls || hs,
      Ps = void 0 !== /()??/.exec("")[1];
  (ks || Ps || Is) && (Ms = function (t) {
    var e,
        r,
        n,
        o,
        i = this,
        a = Is && i.sticky,
        u = ss.call(i),
        c = i.source,
        s = 0,
        f = t;
    return a && (-1 === (u = u.replace("y", "")).indexOf("g") && (u += "g"), f = String(t).slice(i.lastIndex), i.lastIndex > 0 && (!i.multiline || i.multiline && "\n" !== t[i.lastIndex - 1]) && (c = "(?: " + c + ")", f = " " + f, s++), r = new RegExp("^(?:" + c + ")", u)), Ps && (r = new RegExp("^" + c + "$(?!\\s)", u)), ks && (e = i.lastIndex), n = Ts.call(a ? r : i, f), a ? n ? (n.input = n.input.slice(s), n[0] = n[0].slice(s), n.index = i.lastIndex, i.lastIndex += n[0].length) : i.lastIndex = 0 : ks && n && (i.lastIndex = i.global ? n.index + n[0].length : e), Ps && n && n.length > 1 && js.call(n[0], r, function () {
      for (o = 1; o < arguments.length - 2; o++) void 0 === arguments[o] && (n[o] = void 0);
    }), n;
  }), n({
    target: "RegExp",
    proto: !0,
    forced: /./.exec !== (Rs = Ms)
  }, {
    exec: Rs
  }), a && ("g" != /./g.flags || ls) && I(RegExp.prototype, "flags", {
    configurable: !0,
    get: ss
  });
  var Ls = RegExp.prototype,
      Fs = Ls.toString,
      Ns = u(function () {
    return "/a/b" != Fs.call({
      source: "a",
      flags: "b"
    });
  }),
      Us = "toString" != Fs.name;
  (Ns || Us) && P(RegExp.prototype, "toString", function () {
    var t = O(this),
        e = String(t.source),
        r = t.flags;
    return "/" + e + "/" + String(void 0 === r && t instanceof RegExp && !("flags" in Ls) ? ss.call(t) : r);
  }, {
    unsafe: !0
  });
  Jo("Set", function (t) {
    return function () {
      return t(this, arguments.length ? arguments[0] : void 0);
    };
  }, ci);

  var Cs,
      Bs = function (t) {
    return function (e, r) {
      var n,
          o,
          i = String(y(e)),
          a = dt(r),
          u = i.length;
      return a < 0 || a >= u ? t ? "" : void 0 : (n = i.charCodeAt(a)) < 55296 || n > 56319 || a + 1 === u || (o = i.charCodeAt(a + 1)) < 56320 || o > 57343 ? t ? i.charAt(a) : n : t ? i.slice(a, a + 2) : o - 56320 + (n - 55296 << 10) + 65536;
    };
  },
      qs = (Cs = {
    codeAt: Bs(!1),
    charAt: Bs(!0)
  }).codeAt;

  n({
    target: "String",
    proto: !0
  }, {
    codePointAt: function (t) {
      return qs(this, t);
    }
  });
  var zs,
      Ds = T;

  zs = function (t) {
    if (is(t)) throw TypeError("The method doesn't accept regular expressions");
    return t;
  };

  var Ws,
      Gs = ue("match");

  Ws = function (t) {
    var e = /./;

    try {
      "/./"[t](e);
    } catch (r) {
      try {
        return e[Gs] = !1, "/./"[t](e);
      } catch (t) {}
    }

    return !1;
  };

  var Vs,
      $s = "".endsWith,
      Hs = Math.min,
      Ys = Ws("endsWith"),
      Xs = !(Ys || (Vs = Ds(String.prototype, "endsWith"), !Vs || Vs.writable));
  n({
    target: "String",
    proto: !0,
    forced: !Xs && !Ys
  }, {
    endsWith: function (t) {
      var e = String(y(this));
      zs(t);
      var r = arguments.length > 1 ? arguments[1] : void 0,
          n = vt(e.length),
          o = void 0 === r ? n : Hs(vt(r), n),
          i = String(t);
      return $s ? $s.call(e, i, o) : e.slice(o - i.length, o) === i;
    }
  });
  var Js = String.fromCharCode,
      Ks = String.fromCodePoint,
      Qs = !!Ks && 1 != Ks.length;
  n({
    target: "String",
    stat: !0,
    forced: Qs
  }, {
    fromCodePoint: function (t) {
      for (var e, r = [], n = arguments.length, o = 0; n > o;) {
        if (e = +arguments[o++], bt(e, 1114111) !== e) throw RangeError(e + " is not a valid code point");
        r.push(e < 65536 ? Js(e) : Js(55296 + ((e -= 65536) >> 10), e % 1024 + 56320));
      }

      return r.join("");
    }
  }), n({
    target: "String",
    proto: !0,
    forced: !Ws("includes")
  }, {
    includes: function (t) {
      return !!~String(y(this)).indexOf(zs(t), arguments.length > 1 ? arguments[1] : void 0);
    }
  });
  var Zs = Cs.charAt,
      tf = B.set,
      ef = B.getterFor("String Iterator");
  Zr(String, "String", function (t) {
    tf(this, {
      type: "String Iterator",
      string: String(t),
      index: 0
    });
  }, function () {
    var t,
        e = ef(this),
        r = e.string,
        n = e.index;
    return n >= r.length ? {
      value: void 0,
      done: !0
    } : (t = Zs(r, n), e.index += t.length, {
      value: t,
      done: !1
    });
  });
  var rf,
      nf,
      of = ue("species"),
      af = !u(function () {
    var t = /./;
    return t.exec = function () {
      var t = [];
      return t.groups = {
        a: "7"
      }, t;
    }, "7" !== "".replace(t, "$<a>");
  }),
      uf = "$0" === "a".replace(/./, "$0"),
      cf = ue("replace"),
      sf = !!/./[cf] && "" === /./[cf]("a", "$0"),
      ff = !u(function () {
    var t = /(?:)/,
        e = t.exec;

    t.exec = function () {
      return e.apply(this, arguments);
    };

    var r = "ab".split(t);
    return 2 !== r.length || "a" !== r[0] || "b" !== r[1];
  }),
      lf = Cs.charAt;

  nf = function (t, e, r) {
    return e + (r ? lf(t, e).length : 1);
  };

  var hf;
  hf = function (t, e) {
    var r = t.exec;

    if ("function" == typeof r) {
      var n = r.call(t, e);
      if ("object" != typeof n) throw TypeError("RegExp exec method returned something other than an Object or null");
      return n;
    }

    if ("RegExp" !== p(t)) throw TypeError("RegExp#exec called on incompatible receiver");
    return Rs.call(t, e);
  }, (rf = function (t, e, r, n) {
    var o = ue(t),
        i = !u(function () {
      var e = {};
      return e[o] = function () {
        return 7;
      }, 7 != ""[t](e);
    }),
        a = i && !u(function () {
      var e = !1,
          r = /a/;
      return "split" === t && ((r = {}).constructor = {}, r.constructor[of] = function () {
        return r;
      }, r.flags = "", r[o] = /./[o]), r.exec = function () {
        return e = !0, null;
      }, r[o](""), !e;
    });

    if (!i || !a || "replace" === t && (!af || !uf || sf) || "split" === t && !ff) {
      var c = /./[o],
          s = r(o, ""[t], function (t, e, r, n, o) {
        return e.exec === Rs ? i && !o ? {
          done: !0,
          value: c.call(e, r, n)
        } : {
          done: !0,
          value: t.call(r, e, n)
        } : {
          done: !1
        };
      }, {
        REPLACE_KEEPS_$0: uf,
        REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE: sf
      }),
          f = s[0],
          l = s[1];
      P(String.prototype, t, f), P(RegExp.prototype, o, 2 == e ? function (t, e) {
        return l.call(t, this, e);
      } : function (t) {
        return l.call(t, this);
      });
    }

    n && M(RegExp.prototype[o], "sham", !0);
  })("match", 1, function (t, e, r) {
    return [function (e) {
      var r = y(this),
          n = null == e ? void 0 : e[t];
      return void 0 !== n ? n.call(e, r) : new RegExp(e)[t](String(r));
    }, function (t) {
      var n = r(e, t, this);
      if (n.done) return n.value;
      var o = O(t),
          i = String(this);
      if (!o.global) return hf(o, i);
      var a = o.unicode;
      o.lastIndex = 0;

      for (var u, c = [], s = 0; null !== (u = hf(o, i));) {
        var f = String(u[0]);
        c[s] = f, "" === f && (o.lastIndex = nf(i, vt(o.lastIndex), a)), s++;
      }

      return 0 === s ? null : c;
    }];
  });

  var pf,
      vf,
      df = Math.ceil,
      gf = function (t) {
    return function (e, r, n) {
      var o,
          i,
          a = String(y(e)),
          u = a.length,
          c = void 0 === n ? " " : String(n),
          s = vt(r);
      return s <= u || "" == c ? a : (o = s - u, (i = Ca.call(c, df(o / c.length))).length > o && (i = i.slice(0, o)), t ? a + i : i + a);
    };
  },
      yf = (pf = {
    start: gf(!1),
    end: gf(!0)
  }).end;

  vf = /Version\/10\.\d+(\.\d+)?( Mobile\/\w+)? Safari\//.test(Ct), n({
    target: "String",
    proto: !0,
    forced: vf
  }, {
    padEnd: function (t) {
      return yf(this, t, arguments.length > 1 ? arguments[1] : void 0);
    }
  });
  var mf = pf.start;
  n({
    target: "String",
    proto: !0,
    forced: vf
  }, {
    padStart: function (t) {
      return mf(this, t, arguments.length > 1 ? arguments[1] : void 0);
    }
  }), n({
    target: "String",
    stat: !0
  }, {
    raw: function (t) {
      for (var e = h(t.raw), r = vt(e.length), n = arguments.length, o = [], i = 0; r > i;) o.push(String(e[i++])), i < n && o.push(String(arguments[i]));

      return o.join("");
    }
  }), n({
    target: "String",
    proto: !0
  }, {
    repeat: Ca
  });
  var bf,
      wf = Math.floor,
      Sf = "".replace,
      Ef = /\$([$&'`]|\d{1,2}|<[^>]*>)/g,
      _f = /\$([$&'`]|\d{1,2})/g;

  bf = function (t, e, r, n, o, i) {
    var a = r + t.length,
        u = n.length,
        c = _f;
    return void 0 !== o && (o = $t(o), c = Ef), Sf.call(i, c, function (i, c) {
      var s;

      switch (c.charAt(0)) {
        case "$":
          return "$";

        case "&":
          return t;

        case "`":
          return e.slice(0, r);

        case "'":
          return e.slice(a);

        case "<":
          s = o[c.slice(1, -1)];
          break;

        default:
          var f = +c;
          if (0 === f) return i;

          if (f > u) {
            var l = wf(f / 10);
            return 0 === l ? i : l <= u ? void 0 === n[l - 1] ? c.charAt(1) : n[l - 1] + c.charAt(1) : i;
          }

          s = n[f - 1];
      }

      return void 0 === s ? "" : s;
    });
  };

  var xf = Math.max,
      Af = Math.min;
  rf("replace", 2, function (t, e, r, n) {
    var o = n.REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE,
        i = n.REPLACE_KEEPS_$0,
        a = o ? "$" : "$0";
    return [function (r, n) {
      var o = y(this),
          i = null == r ? void 0 : r[t];
      return void 0 !== i ? i.call(r, o, n) : e.call(String(o), r, n);
    }, function (t, n) {
      if (!o && i || "string" == typeof n && -1 === n.indexOf(a)) {
        var u = r(e, t, this, n);
        if (u.done) return u.value;
      }

      var c = O(t),
          s = String(this),
          f = "function" == typeof n;
      f || (n = String(n));
      var l = c.global;

      if (l) {
        var h = c.unicode;
        c.lastIndex = 0;
      }

      for (var p = [];;) {
        var v = hf(c, s);
        if (null === v) break;
        if (p.push(v), !l) break;
        "" === String(v[0]) && (c.lastIndex = nf(s, vt(c.lastIndex), h));
      }

      for (var d, g = "", y = 0, m = 0; m < p.length; m++) {
        v = p[m];

        for (var b = String(v[0]), w = xf(Af(dt(v.index), s.length), 0), S = [], E = 1; E < v.length; E++) S.push(void 0 === (d = v[E]) ? d : String(d));

        var _ = v.groups;

        if (f) {
          var x = [b].concat(S, w, s);
          void 0 !== _ && x.push(_);
          var A = String(n.apply(void 0, x));
        } else A = bf(b, s, w, S, _, n);

        w >= y && (g += s.slice(y, w) + A, y = w + b.length);
      }

      return g + s.slice(y);
    }];
  }), rf("search", 1, function (t, e, r) {
    return [function (e) {
      var r = y(this),
          n = null == e ? void 0 : e[t];
      return void 0 !== n ? n.call(e, r) : new RegExp(e)[t](String(r));
    }, function (t) {
      var n = r(e, t, this);
      if (n.done) return n.value;
      var o = O(t),
          i = String(this),
          a = o.lastIndex;
      cu(a, 0) || (o.lastIndex = 0);
      var u = hf(o, i);
      return cu(o.lastIndex, a) || (o.lastIndex = a), null === u ? -1 : u.index;
    }];
  });
  var Of = [].push,
      Rf = Math.min,
      Tf = !u(function () {
    return !RegExp(4294967295, "y");
  });
  rf("split", 2, function (t, e, r) {
    var n;
    return n = "c" == "abbc".split(/(b)*/)[1] || 4 != "test".split(/(?:)/, -1).length || 2 != "ab".split(/(?:ab)*/).length || 4 != ".".split(/(.?)(.?)/).length || ".".split(/()()/).length > 1 || "".split(/.?/).length ? function (t, r) {
      var n = String(y(this)),
          o = void 0 === r ? 4294967295 : r >>> 0;
      if (0 === o) return [];
      if (void 0 === t) return [n];
      if (!is(t)) return e.call(n, t, o);

      for (var i, a, u, c = [], s = (t.ignoreCase ? "i" : "") + (t.multiline ? "m" : "") + (t.unicode ? "u" : "") + (t.sticky ? "y" : ""), f = 0, l = new RegExp(t.source, s + "g"); (i = Rs.call(l, n)) && !((a = l.lastIndex) > f && (c.push(n.slice(f, i.index)), i.length > 1 && i.index < n.length && Of.apply(c, i.slice(1)), u = i[0].length, f = a, c.length >= o));) l.lastIndex === i.index && l.lastIndex++;

      return f === n.length ? !u && l.test("") || c.push("") : c.push(n.slice(f)), c.length > o ? c.slice(0, o) : c;
    } : "0".split(void 0, 0).length ? function (t, r) {
      return void 0 === t && 0 === r ? [] : e.call(this, t, r);
    } : e, [function (e, r) {
      var o = y(this),
          i = null == e ? void 0 : e[t];
      return void 0 !== i ? i.call(e, o, r) : n.call(String(o), e, r);
    }, function (t, o) {
      var i = r(n, t, this, o, n !== e);
      if (i.done) return i.value;
      var a = O(t),
          u = String(this),
          c = Ru(a, RegExp),
          s = a.unicode,
          f = (a.ignoreCase ? "i" : "") + (a.multiline ? "m" : "") + (a.unicode ? "u" : "") + (Tf ? "y" : "g"),
          l = new c(Tf ? a : "^(?:" + a.source + ")", f),
          h = void 0 === o ? 4294967295 : o >>> 0;
      if (0 === h) return [];
      if (0 === u.length) return null === hf(l, u) ? [u] : [];

      for (var p = 0, v = 0, d = []; v < u.length;) {
        l.lastIndex = Tf ? v : 0;
        var g,
            y = hf(l, Tf ? u : u.slice(v));
        if (null === y || (g = Rf(vt(l.lastIndex + (Tf ? 0 : v)), u.length)) === p) v = nf(u, v, s);else {
          if (d.push(u.slice(p, v)), d.length === h) return d;

          for (var m = 1; m <= y.length - 1; m++) if (d.push(y[m]), d.length === h) return d;

          v = p = g;
        }
      }

      return d.push(u.slice(p)), d;
    }];
  }, !Tf);
  var jf = T,
      Mf = "".startsWith,
      kf = Math.min,
      If = Ws("startsWith"),
      Pf = !If && !!function () {
    var t = jf(String.prototype, "startsWith");
    return t && !t.writable;
  }();
  n({
    target: "String",
    proto: !0,
    forced: !Pf && !If
  }, {
    startsWith: function (t) {
      var e = String(y(this));
      zs(t);
      var r = vt(kf(arguments.length > 1 ? arguments[1] : void 0, e.length)),
          n = String(t);
      return Mf ? Mf.call(e, n, r) : e.slice(r, r + n.length) === n;
    }
  });
  var Lf,
      Ff = ua.trim;
  n({
    target: "String",
    proto: !0,
    forced: (Lf = function (t) {
      return u(function () {
        return !!la[t]() || "​᠎" != "​᠎"[t]() || la[t].name !== t;
      });
    })("trim")
  }, {
    trim: function () {
      return Ff(this);
    }
  });
  var Nf = ua.end,
      Uf = Lf("trimEnd"),
      Cf = Uf ? function () {
    return Nf(this);
  } : "".trimEnd;
  n({
    target: "String",
    proto: !0,
    forced: Uf
  }, {
    trimEnd: Cf,
    trimRight: Cf
  });
  var Bf = ua.start,
      qf = Lf("trimStart"),
      zf = qf ? function () {
    return Bf(this);
  } : "".trimStart;
  n({
    target: "String",
    proto: !0,
    forced: qf
  }, {
    trimStart: zf,
    trimLeft: zf
  });
  var Df,
      Wf = /"/g;

  Df = function (t, e, r, n) {
    var o = String(y(t)),
        i = "<" + e;
    return "" !== r && (i += " " + r + '="' + String(n).replace(Wf, "&quot;") + '"'), i + ">" + o + "</" + e + ">";
  };

  var Gf;
  n({
    target: "String",
    proto: !0,
    forced: (Gf = function (t) {
      return u(function () {
        var e = ""[t]('"');
        return e !== e.toLowerCase() || e.split('"').length > 3;
      });
    })("anchor")
  }, {
    anchor: function (t) {
      return Df(this, "a", "name", t);
    }
  }), n({
    target: "String",
    proto: !0,
    forced: Gf("big")
  }, {
    big: function () {
      return Df(this, "big", "", "");
    }
  }), n({
    target: "String",
    proto: !0,
    forced: Gf("blink")
  }, {
    blink: function () {
      return Df(this, "blink", "", "");
    }
  }), n({
    target: "String",
    proto: !0,
    forced: Gf("bold")
  }, {
    bold: function () {
      return Df(this, "b", "", "");
    }
  }), n({
    target: "String",
    proto: !0,
    forced: Gf("fixed")
  }, {
    fixed: function () {
      return Df(this, "tt", "", "");
    }
  }), n({
    target: "String",
    proto: !0,
    forced: Gf("fontcolor")
  }, {
    fontcolor: function (t) {
      return Df(this, "font", "color", t);
    }
  }), n({
    target: "String",
    proto: !0,
    forced: Gf("fontsize")
  }, {
    fontsize: function (t) {
      return Df(this, "font", "size", t);
    }
  }), n({
    target: "String",
    proto: !0,
    forced: Gf("italics")
  }, {
    italics: function () {
      return Df(this, "i", "", "");
    }
  }), n({
    target: "String",
    proto: !0,
    forced: Gf("link")
  }, {
    link: function (t) {
      return Df(this, "a", "href", t);
    }
  }), n({
    target: "String",
    proto: !0,
    forced: Gf("small")
  }, {
    small: function () {
      return Df(this, "small", "", "");
    }
  }), n({
    target: "String",
    proto: !0,
    forced: Gf("strike")
  }, {
    strike: function () {
      return Df(this, "strike", "", "");
    }
  }), n({
    target: "String",
    proto: !0,
    forced: Gf("sub")
  }, {
    sub: function () {
      return Df(this, "sub", "", "");
    }
  }), n({
    target: "String",
    proto: !0,
    forced: Gf("sup")
  }, {
    sup: function () {
      return Df(this, "sup", "", "");
    }
  });

  var Vf,
      $f,
      Hf,
      Yf = {},
      Xf = I,
      Jf = o.Int8Array,
      Kf = Jf && Jf.prototype,
      Qf = o.Uint8ClampedArray,
      Zf = Qf && Qf.prototype,
      tl = Jf && nn(Jf),
      el = Kf && nn(Kf),
      rl = Object.prototype,
      nl = rl.isPrototypeOf,
      ol = ue("toStringTag"),
      il = G("TYPED_ARRAY_TAG"),
      al = eo && !!gn && "Opera" !== Fr(o.opera),
      ul = !1,
      cl = {
    Int8Array: 1,
    Uint8Array: 1,
    Uint8ClampedArray: 1,
    Int16Array: 2,
    Uint16Array: 2,
    Int32Array: 4,
    Uint32Array: 4,
    Float32Array: 4,
    Float64Array: 8
  },
      sl = {
    BigInt64Array: 8,
    BigUint64Array: 8
  },
      fl = function (t) {
    if (!b(t)) return !1;
    var e = Fr(t);
    return w(cl, e) || w(sl, e);
  };

  for (Hf in cl) o[Hf] || (al = !1);

  if ((!al || "function" != typeof tl || tl === Function.prototype) && (tl = function () {
    throw TypeError("Incorrect invocation");
  }, al)) for (Hf in cl) o[Hf] && gn(o[Hf], tl);
  if ((!al || !el || el === rl) && (el = tl.prototype, al)) for (Hf in cl) o[Hf] && gn(o[Hf].prototype, el);
  if (al && nn(Zf) !== el && gn(Zf, el), a && !w(el, ol)) for (Hf in ul = !0, Xf(el, ol, {
    get: function () {
      return b(this) ? this[il] : void 0;
    }
  }), cl) o[Hf] && M(o[Hf], il, Hf);
  var ll = ($f = {
    NATIVE_ARRAY_BUFFER_VIEWS: al,
    TYPED_ARRAY_TAG: ul && il,
    aTypedArray: function (t) {
      if (fl(t)) return t;
      throw TypeError("Target is not a typed array");
    },
    aTypedArrayConstructor: function (t) {
      if (gn) {
        if (nl.call(tl, t)) return t;
      } else for (var e in cl) if (w(cl, Hf)) {
        var r = o[e];
        if (r && (t === r || nl.call(r, t))) return t;
      }

      throw TypeError("Target is not a typed array constructor");
    },
    exportTypedArrayMethod: function (t, e, r) {
      if (a) {
        if (r) for (var n in cl) {
          var i = o[n];
          i && w(i.prototype, t) && delete i.prototype[t];
        }
        el[t] && !r || P(el, t, r ? e : al && Kf[t] || e);
      }
    },
    exportTypedArrayStaticMethod: function (t, e, r) {
      var n, i;

      if (a) {
        if (gn) {
          if (r) for (n in cl) (i = o[n]) && w(i, t) && delete i[t];
          if (tl[t] && !r) return;

          try {
            return P(tl, t, r ? e : al && Jf[t] || e);
          } catch (t) {}
        }

        for (n in cl) !(i = o[n]) || i[t] && !r || P(i, t, e);
      }
    },
    isView: function (t) {
      if (!b(t)) return !1;
      var e = Fr(t);
      return "DataView" === e || w(cl, e) || w(sl, e);
    },
    isTypedArray: fl,
    TypedArray: tl,
    TypedArrayPrototype: el
  }).NATIVE_ARRAY_BUFFER_VIEWS,
      hl = o.ArrayBuffer,
      pl = o.Int8Array;
  Vf = !ll || !u(function () {
    pl(1);
  }) || !u(function () {
    new pl(-1);
  }) || !qr(function (t) {
    new pl(), new pl(null), new pl(1.5), new pl(t);
  }, !0) || u(function () {
    return 1 !== new pl(new hl(2), 1, void 0).length;
  });
  var vl, dl;
  dl = function (t) {
    var e = dt(t);
    if (e < 0) throw RangeError("The argument can't be less than 0");
    return e;
  }, vl = function (t, e) {
    var r = dl(t);
    if (r % e) throw RangeError("Wrong offset");
    return r;
  };
  var gl,
      yl = Ot,
      ml = $f.aTypedArrayConstructor;

  gl = function (t) {
    var e,
        r,
        n,
        o,
        i,
        a,
        u = $t(t),
        c = arguments.length,
        s = c > 1 ? arguments[1] : void 0,
        f = void 0 !== s,
        l = Pr(u);
    if (null != l && !jr(l)) for (a = (i = l.call(u)).next, u = []; !(o = a.call(i)).done;) u.push(o.value);

    for (f && c > 2 && (s = ge(s, arguments[2], 2)), r = vt(u.length), n = new (ml(this))(r), e = 0; r > e; e++) n[e] = f ? s(u[e], e) : u[e];

    return n;
  };

  var bl = de.forEach,
      wl = B.get,
      Sl = B.set,
      El = I,
      _l = T,
      xl = Math.round,
      Al = o.RangeError,
      Ol = to.ArrayBuffer,
      Rl = to.DataView,
      Tl = $f.NATIVE_ARRAY_BUFFER_VIEWS,
      jl = $f.TYPED_ARRAY_TAG,
      Ml = $f.TypedArray,
      kl = $f.TypedArrayPrototype,
      Il = $f.aTypedArrayConstructor,
      Pl = $f.isTypedArray,
      Ll = function (t, e) {
    for (var r = 0, n = e.length, o = new (Il(t))(n); n > r;) o[r] = e[r++];

    return o;
  },
      Fl = function (t, e) {
    El(t, e, {
      get: function () {
        return wl(this)[e];
      }
    });
  },
      Nl = function (t) {
    var e;
    return t instanceof Ol || "ArrayBuffer" == (e = Fr(t)) || "SharedArrayBuffer" == e;
  },
      Ul = function (t, e) {
    return Pl(t) && "symbol" != typeof e && e in t && String(+e) == String(e);
  },
      Cl = function (t, e) {
    return Ul(t, e = m(e, !0)) ? c(2, t[e]) : _l(t, e);
  },
      Bl = function (t, e, r) {
    return !(Ul(t, e = m(e, !0)) && b(r) && w(r, "value")) || w(r, "get") || w(r, "set") || r.configurable || w(r, "writable") && !r.writable || w(r, "enumerable") && !r.enumerable ? El(t, e, r) : (t[e] = r.value, t);
  };

  a ? (Tl || (T = Cl, I = Bl, Fl(kl, "buffer"), Fl(kl, "byteOffset"), Fl(kl, "byteLength"), Fl(kl, "length")), n({
    target: "Object",
    stat: !0,
    forced: !Tl
  }, {
    getOwnPropertyDescriptor: Cl,
    defineProperty: Bl
  }), Yf = function (t, e, r) {
    var i = t.match(/\d+$/)[0] / 8,
        a = t + (r ? "Clamped" : "") + "Array",
        u = "get" + t,
        c = "set" + t,
        s = o[a],
        f = s,
        l = f && f.prototype,
        h = {},
        p = function (t, e) {
      El(t, e, {
        get: function () {
          return function (t, e) {
            var r = wl(t);
            return r.view[u](e * i + r.byteOffset, !0);
          }(this, e);
        },
        set: function (t) {
          return function (t, e, n) {
            var o = wl(t);
            r && (n = (n = xl(n)) < 0 ? 0 : n > 255 ? 255 : 255 & n), o.view[c](e * i + o.byteOffset, n, !0);
          }(this, e, t);
        },
        enumerable: !0
      });
    };

    Tl ? Vf && (f = e(function (t, e, r, n) {
      return no(t, f, a), ui(b(e) ? Nl(e) ? void 0 !== n ? new s(e, vl(r, i), n) : void 0 !== r ? new s(e, vl(r, i)) : new s(e) : Pl(e) ? Ll(f, e) : gl.call(f, e) : new s(oo(e)), t, f);
    }), gn && gn(f, Ml), bl(yl(s), function (t) {
      t in f || M(f, t, s[t]);
    }), f.prototype = l) : (f = e(function (t, e, r, n) {
      no(t, f, a);
      var o,
          u,
          c,
          s = 0,
          l = 0;

      if (b(e)) {
        if (!Nl(e)) return Pl(e) ? Ll(f, e) : gl.call(f, e);
        o = e, l = vl(r, i);
        var h = e.byteLength;

        if (void 0 === n) {
          if (h % i) throw Al("Wrong length");
          if ((u = h - l) < 0) throw Al("Wrong length");
        } else if ((u = vt(n) * i) + l > h) throw Al("Wrong length");

        c = u / i;
      } else c = oo(e), o = new Ol(u = c * i);

      for (Sl(t, {
        buffer: o,
        byteOffset: l,
        byteLength: u,
        length: c,
        view: new Rl(o)
      }); s < c;) p(t, s++);
    }), gn && gn(f, Ml), l = f.prototype = Ht(kl)), l.constructor !== f && M(l, "constructor", f), jl && M(l, jl, a), h[a] = f, n({
      global: !0,
      forced: f != s,
      sham: !Tl
    }, h), "BYTES_PER_ELEMENT" in f || M(f, "BYTES_PER_ELEMENT", i), "BYTES_PER_ELEMENT" in l || M(l, "BYTES_PER_ELEMENT", i), Xn(a);
  }) : Yf = function () {}, Yf("Float32", function (t) {
    return function (e, r, n) {
      return t(this, e, r, n);
    };
  }), Yf("Float64", function (t) {
    return function (e, r, n) {
      return t(this, e, r, n);
    };
  }), Yf("Int8", function (t) {
    return function (e, r, n) {
      return t(this, e, r, n);
    };
  }), Yf("Int16", function (t) {
    return function (e, r, n) {
      return t(this, e, r, n);
    };
  }), Yf("Int32", function (t) {
    return function (e, r, n) {
      return t(this, e, r, n);
    };
  }), Yf("Uint8", function (t) {
    return function (e, r, n) {
      return t(this, e, r, n);
    };
  }), Yf("Uint8", function (t) {
    return function (e, r, n) {
      return t(this, e, r, n);
    };
  }, !0), Yf("Uint16", function (t) {
    return function (e, r, n) {
      return t(this, e, r, n);
    };
  }), Yf("Uint32", function (t) {
    return function (e, r, n) {
      return t(this, e, r, n);
    };
  });
  var ql = $f.aTypedArray;
  (0, $f.exportTypedArrayMethod)("copyWithin", function (t, e) {
    return hr.call(ql(this), t, e, arguments.length > 2 ? arguments[2] : void 0);
  });
  var zl = de.every,
      Dl = $f.aTypedArray;
  (0, $f.exportTypedArrayMethod)("every", function (t) {
    return zl(Dl(this), t, arguments.length > 1 ? arguments[1] : void 0);
  });
  var Wl = $f.aTypedArray;
  (0, $f.exportTypedArrayMethod)("fill", function (t) {
    return yr.apply(Wl(this), arguments);
  });
  var Gl,
      Vl = de.filter,
      $l = $f.aTypedArrayConstructor;

  Gl = function (t, e) {
    for (var r = Ru(t, t.constructor), n = 0, o = e.length, i = new ($l(r))(o); o > n;) i[n] = e[n++];

    return i;
  };

  var Hl = $f.aTypedArray;
  (0, $f.exportTypedArrayMethod)("filter", function (t) {
    var e = Vl(Hl(this), t, arguments.length > 1 ? arguments[1] : void 0);
    return Gl(this, e);
  });
  var Yl = de.find,
      Xl = $f.aTypedArray;
  (0, $f.exportTypedArrayMethod)("find", function (t) {
    return Yl(Xl(this), t, arguments.length > 1 ? arguments[1] : void 0);
  });
  var Jl = de.findIndex,
      Kl = $f.aTypedArray;
  (0, $f.exportTypedArrayMethod)("findIndex", function (t) {
    return Jl(Kl(this), t, arguments.length > 1 ? arguments[1] : void 0);
  });
  var Ql = de.forEach,
      Zl = $f.aTypedArray;
  (0, $f.exportTypedArrayMethod)("forEach", function (t) {
    Ql(Zl(this), t, arguments.length > 1 ? arguments[1] : void 0);
  }), (0, $f.exportTypedArrayStaticMethod)("from", gl, Vf);
  var th = pt.includes,
      eh = $f.aTypedArray;
  (0, $f.exportTypedArrayMethod)("includes", function (t) {
    return th(eh(this), t, arguments.length > 1 ? arguments[1] : void 0);
  });
  var rh = pt.indexOf,
      nh = $f.aTypedArray;
  (0, $f.exportTypedArrayMethod)("indexOf", function (t) {
    return rh(nh(this), t, arguments.length > 1 ? arguments[1] : void 0);
  });

  var oh = ue("iterator"),
      ih = o.Uint8Array,
      ah = Qr.values,
      uh = Qr.keys,
      ch = Qr.entries,
      sh = $f.aTypedArray,
      fh = $f.exportTypedArrayMethod,
      lh = ih && ih.prototype[oh],
      hh = !!lh && ("values" == lh.name || null == lh.name),
      ph = function () {
    return ah.call(sh(this));
  };

  fh("entries", function () {
    return ch.call(sh(this));
  }), fh("keys", function () {
    return uh.call(sh(this));
  }), fh("values", ph, !hh), fh(oh, ph, !hh);
  var vh = $f.aTypedArray,
      dh = [].join;
  (0, $f.exportTypedArrayMethod)("join", function (t) {
    return dh.apply(vh(this), arguments);
  });
  var gh = $f.aTypedArray;
  (0, $f.exportTypedArrayMethod)("lastIndexOf", function (t) {
    return On.apply(gh(this), arguments);
  });
  var yh = de.map,
      mh = $f.aTypedArray,
      bh = $f.aTypedArrayConstructor;
  (0, $f.exportTypedArrayMethod)("map", function (t) {
    return yh(mh(this), t, arguments.length > 1 ? arguments[1] : void 0, function (t, e) {
      return new (bh(Ru(t, t.constructor)))(e);
    });
  });
  var wh = $f.aTypedArrayConstructor;
  (0, $f.exportTypedArrayStaticMethod)("of", function () {
    for (var t = 0, e = arguments.length, r = new (wh(this))(e); e > t;) r[t] = arguments[t++];

    return r;
  }, Vf);
  var Sh = Ln.left,
      Eh = $f.aTypedArray;
  (0, $f.exportTypedArrayMethod)("reduce", function (t) {
    return Sh(Eh(this), t, arguments.length, arguments.length > 1 ? arguments[1] : void 0);
  });
  var _h = Ln.right,
      xh = $f.aTypedArray;
  (0, $f.exportTypedArrayMethod)("reduceRight", function (t) {
    return _h(xh(this), t, arguments.length, arguments.length > 1 ? arguments[1] : void 0);
  });
  var Ah = $f.aTypedArray,
      Oh = $f.exportTypedArrayMethod,
      Rh = Math.floor;
  Oh("reverse", function () {
    for (var t, e = Ah(this).length, r = Rh(e / 2), n = 0; n < r;) t = this[n], this[n++] = this[--e], this[e] = t;

    return this;
  });
  var Th = $f.aTypedArray;
  (0, $f.exportTypedArrayMethod)("set", function (t) {
    Th(this);
    var e = vl(arguments.length > 1 ? arguments[1] : void 0, 1),
        r = this.length,
        n = $t(t),
        o = vt(n.length),
        i = 0;
    if (o + e > r) throw RangeError("Wrong length");

    for (; i < o;) this[e + i] = n[i++];
  }, u(function () {
    new Int8Array(1).set({});
  }));
  var jh = $f.aTypedArray,
      Mh = $f.aTypedArrayConstructor,
      kh = [].slice;
  (0, $f.exportTypedArrayMethod)("slice", function (t, e) {
    for (var r = kh.call(jh(this), t, e), n = Ru(this, this.constructor), o = 0, i = r.length, a = new (Mh(n))(i); i > o;) a[o] = r[o++];

    return a;
  }, u(function () {
    new Int8Array(1).slice();
  }));
  var Ih = de.some,
      Ph = $f.aTypedArray;
  (0, $f.exportTypedArrayMethod)("some", function (t) {
    return Ih(Ph(this), t, arguments.length > 1 ? arguments[1] : void 0);
  });
  var Lh = $f.aTypedArray,
      Fh = [].sort;
  (0, $f.exportTypedArrayMethod)("sort", function (t) {
    return Fh.call(Lh(this), t);
  });
  var Nh = $f.aTypedArray;
  (0, $f.exportTypedArrayMethod)("subarray", function (t, e) {
    var r = Nh(this),
        n = r.length,
        o = bt(t, n);
    return new (Ru(r, r.constructor))(r.buffer, r.byteOffset + o * r.BYTES_PER_ELEMENT, vt((void 0 === e ? n : bt(e, n)) - o));
  });
  var Uh = o.Int8Array,
      Ch = $f.aTypedArray,
      Bh = $f.exportTypedArrayMethod,
      qh = [].toLocaleString,
      zh = [].slice,
      Dh = !!Uh && u(function () {
    qh.call(new Uh(1));
  });
  Bh("toLocaleString", function () {
    return qh.apply(Dh ? zh.call(Ch(this)) : Ch(this), arguments);
  }, u(function () {
    return [1, 2].toLocaleString() != new Uh([1, 2]).toLocaleString();
  }) || !u(function () {
    Uh.prototype.toLocaleString.call([1, 2]);
  }));
  var Wh = $f.exportTypedArrayMethod,
      Gh = o.Uint8Array,
      Vh = Gh && Gh.prototype || {},
      $h = [].toString,
      Hh = [].join;
  u(function () {
    $h.call({});
  }) && ($h = function () {
    return Hh.call(this);
  });
  var Yh = Vh.toString != $h;
  Wh("toString", $h, Yh);

  var Xh,
      Jh = Qo.getWeakData,
      Kh = B.set,
      Qh = B.getterFor,
      Zh = de.find,
      tp = de.findIndex,
      ep = 0,
      rp = function (t) {
    return t.frozen || (t.frozen = new np());
  },
      np = function () {
    this.entries = [];
  },
      op = function (t, e) {
    return Zh(t.entries, function (t) {
      return t[0] === e;
    });
  };

  np.prototype = {
    get: function (t) {
      var e = op(this, t);
      if (e) return e[1];
    },
    has: function (t) {
      return !!op(this, t);
    },
    set: function (t, e) {
      var r = op(this, t);
      r ? r[1] = e : this.entries.push([t, e]);
    },
    delete: function (t) {
      var e = tp(this.entries, function (e) {
        return e[0] === t;
      });
      return ~e && this.entries.splice(e, 1), !!~e;
    }
  }, Xh = {
    getConstructor: function (t, e, r, n) {
      var o = t(function (t, i) {
        no(t, o, e), Kh(t, {
          type: e,
          id: ep++,
          frozen: void 0
        }), null != i && ii(i, t[n], {
          that: t,
          AS_ENTRIES: r
        });
      }),
          i = Qh(e),
          a = function (t, e, r) {
        var n = i(t),
            o = Jh(O(e), !0);
        return !0 === o ? rp(n).set(e, r) : o[n.id] = r, t;
      };

      return ro(o.prototype, {
        delete: function (t) {
          var e = i(this);
          if (!b(t)) return !1;
          var r = Jh(t);
          return !0 === r ? rp(e).delete(t) : r && w(r, e.id) && delete r[e.id];
        },
        has: function (t) {
          var e = i(this);
          if (!b(t)) return !1;
          var r = Jh(t);
          return !0 === r ? rp(e).has(t) : r && w(r, e.id);
        }
      }), ro(o.prototype, r ? {
        get: function (t) {
          var e = i(this);

          if (b(t)) {
            var r = Jh(t);
            return !0 === r ? rp(e).get(t) : r ? r[e.id] : void 0;
          }
        },
        set: function (t, e) {
          return a(this, t, e);
        }
      } : {
        add: function (t) {
          return a(this, t, !0);
        }
      }), o;
    }
  };

  var ip,
      ap = B.enforce,
      up = !o.ActiveXObject && "ActiveXObject" in o,
      cp = Object.isExtensible,
      sp = function (t) {
    return function () {
      return t(this, arguments.length ? arguments[0] : void 0);
    };
  },
      fp = Jo("WeakMap", sp, Xh);

  if (q && up) {
    ip = Xh.getConstructor(sp, "WeakMap", !0), Qo.REQUIRED = !0;
    var lp = fp.prototype,
        hp = lp.delete,
        pp = lp.has,
        vp = lp.get,
        dp = lp.set;
    ro(lp, {
      delete: function (t) {
        if (b(t) && !cp(t)) {
          var e = ap(this);
          return e.frozen || (e.frozen = new ip()), hp.call(this, t) || e.frozen.delete(t);
        }

        return hp.call(this, t);
      },
      has: function (t) {
        if (b(t) && !cp(t)) {
          var e = ap(this);
          return e.frozen || (e.frozen = new ip()), pp.call(this, t) || e.frozen.has(t);
        }

        return pp.call(this, t);
      },
      get: function (t) {
        if (b(t) && !cp(t)) {
          var e = ap(this);
          return e.frozen || (e.frozen = new ip()), pp.call(this, t) ? vp.call(this, t) : e.frozen.get(t);
        }

        return vp.call(this, t);
      },
      set: function (t, e) {
        if (b(t) && !cp(t)) {
          var r = ap(this);
          r.frozen || (r.frozen = new ip()), pp.call(this, t) ? dp.call(this, t, e) : r.frozen.set(t, e);
        } else dp.call(this, t, e);

        return this;
      }
    });
  }

  Jo("WeakSet", function (t) {
    return function () {
      return t(this, arguments.length ? arguments[0] : void 0);
    };
  }, Xh);
  var gp;
  gp = {
    CSSRuleList: 0,
    CSSStyleDeclaration: 0,
    CSSValueList: 0,
    ClientRectList: 0,
    DOMRectList: 0,
    DOMStringList: 0,
    DOMTokenList: 1,
    DataTransferItemList: 0,
    FileList: 0,
    HTMLAllCollection: 0,
    HTMLCollection: 0,
    HTMLFormElement: 0,
    HTMLSelectElement: 0,
    MediaList: 0,
    MimeTypeArray: 0,
    NamedNodeMap: 0,
    NodeList: 1,
    PaintRequestList: 0,
    Plugin: 0,
    PluginArray: 0,
    SVGLengthList: 0,
    SVGNumberList: 0,
    SVGPathSegList: 0,
    SVGPointList: 0,
    SVGStringList: 0,
    SVGTransformList: 0,
    SourceBufferList: 0,
    StyleSheetList: 0,
    TextTrackCueList: 0,
    TextTrackList: 0,
    TouchList: 0
  };
  var yp,
      mp = de.forEach,
      bp = Hr("forEach");

  for (var wp in yp = bp ? [].forEach : function (t) {
    return mp(this, t, arguments.length > 1 ? arguments[1] : void 0);
  }, gp) {
    var Sp = o[wp],
        Ep = Sp && Sp.prototype;
    if (Ep && Ep.forEach !== yp) try {
      M(Ep, "forEach", yp);
    } catch (t) {
      Ep.forEach = yp;
    }
  }

  var _p = ue("iterator"),
      xp = ue("toStringTag"),
      Ap = Qr.values;

  for (var Op in gp) {
    var Rp = o[Op],
        Tp = Rp && Rp.prototype;

    if (Tp) {
      if (Tp[_p] !== Ap) try {
        M(Tp, _p, Ap);
      } catch (t) {
        Tp[_p] = Ap;
      }
      if (Tp[xp] || M(Tp, xp, Op), gp[Op]) for (var jp in Qr) if (Tp[jp] !== Qr[jp]) try {
        M(Tp, jp, Qr[jp]);
      } catch (t) {
        Tp[jp] = Qr[jp];
      }
    }
  }

  var Mp = !o.setImmediate || !o.clearImmediate;
  n({
    global: !0,
    bind: !0,
    enumerable: !0,
    forced: Mp
  }, {
    setImmediate: ju.set,
    clearImmediate: ju.clear
  });
  var kp = o.process;
  n({
    global: !0,
    enumerable: !0,
    noTargetGet: !0
  }, {
    queueMicrotask: function (t) {
      var e = Nt && kp.domain;
      Yu(e ? e.bind(t) : t);
    }
  });
  var Ip,
      Pp = ue("iterator");
  Ip = !u(function () {
    var t = new URL("b?a=1&b=2&c=3", "http://a"),
        e = t.searchParams,
        r = "";
    return t.pathname = "c%20d", e.forEach(function (t, n) {
      e.delete("b"), r += n + t;
    }), !e.sort || "http://a/c%20d?a=1&c=3" !== t.href || "3" !== e.get("c") || "a=1" !== String(new URLSearchParams("?a=1")) || !e[Pp] || "a" !== new URL("https://a@b").username || "b" !== new URLSearchParams(new URLSearchParams("a=b")).get("a") || "xn--e1aybc" !== new URL("http://тест").host || "#%D0%B1" !== new URL("http://a#б").hash || "a1c3" !== r || "x" !== new URL("http://x", void 0).host;
  });

  var Lp,
      Fp = Cs.codeAt,
      Np = /[^\0-\u007E]/,
      Up = /[.\u3002\uFF0E\uFF61]/g,
      Cp = Math.floor,
      Bp = String.fromCharCode,
      qp = function (t) {
    return t + 22 + 75 * (t < 26);
  },
      zp = function (t, e, r) {
    var n = 0;

    for (t = r ? Cp(t / 700) : t >> 1, t += Cp(t / e); t > 455; n += 36) t = Cp(t / 35);

    return Cp(n + 36 * t / (t + 38));
  },
      Dp = function (t) {
    var e,
        r,
        n = [],
        o = (t = function (t) {
      for (var e = [], r = 0, n = t.length; r < n;) {
        var o = t.charCodeAt(r++);

        if (o >= 55296 && o <= 56319 && r < n) {
          var i = t.charCodeAt(r++);
          56320 == (64512 & i) ? e.push(((1023 & o) << 10) + (1023 & i) + 65536) : (e.push(o), r--);
        } else e.push(o);
      }

      return e;
    }(t)).length,
        i = 128,
        a = 0,
        u = 72;

    for (e = 0; e < t.length; e++) (r = t[e]) < 128 && n.push(Bp(r));

    var c = n.length,
        s = c;

    for (c && n.push("-"); s < o;) {
      var f = 2147483647;

      for (e = 0; e < t.length; e++) (r = t[e]) >= i && r < f && (f = r);

      var l = s + 1;
      if (f - i > Cp((2147483647 - a) / l)) throw RangeError("Overflow: input needs wider integers to process");

      for (a += (f - i) * l, i = f, e = 0; e < t.length; e++) {
        if ((r = t[e]) < i && ++a > 2147483647) throw RangeError("Overflow: input needs wider integers to process");

        if (r == i) {
          for (var h = a, p = 36;; p += 36) {
            var v = p <= u ? 1 : p >= u + 26 ? 26 : p - u;
            if (h < v) break;
            var d = h - v,
                g = 36 - v;
            n.push(Bp(qp(v + d % g))), h = Cp(d / g);
          }

          n.push(Bp(qp(h))), u = zp(a, l, s == c), a = 0, ++s;
        }
      }

      ++a, ++i;
    }

    return n.join("");
  };

  Lp = function (t) {
    var e,
        r,
        n = [],
        o = t.toLowerCase().replace(Up, ".").split(".");

    for (e = 0; e < o.length; e++) r = o[e], n.push(Np.test(r) ? "xn--" + Dp(r) : r);

    return n.join(".");
  };

  var Wp, Gp;

  Gp = function (t) {
    var e = Pr(t);
    if ("function" != typeof e) throw TypeError(String(t) + " is not iterable");
    return O(e.call(t));
  };

  var Vp = ct("fetch"),
      $p = ct("Headers"),
      Hp = ue("iterator"),
      Yp = B.set,
      Xp = B.getterFor("URLSearchParams"),
      Jp = B.getterFor("URLSearchParamsIterator"),
      Kp = /\+/g,
      Qp = Array(4),
      Zp = function (t) {
    return Qp[t - 1] || (Qp[t - 1] = RegExp("((?:%[\\da-f]{2}){" + t + "})", "gi"));
  },
      tv = function (t) {
    try {
      return decodeURIComponent(t);
    } catch (e) {
      return t;
    }
  },
      ev = function (t) {
    var e = t.replace(Kp, " "),
        r = 4;

    try {
      return decodeURIComponent(e);
    } catch (t) {
      for (; r;) e = e.replace(Zp(r--), tv);

      return e;
    }
  },
      rv = /[!'()~]|%20/g,
      nv = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+"
  },
      ov = function (t) {
    return nv[t];
  },
      iv = function (t) {
    return encodeURIComponent(t).replace(rv, ov);
  },
      av = function (t, e) {
    if (e) for (var r, n, o = e.split("&"), i = 0; i < o.length;) (r = o[i++]).length && (n = r.split("="), t.push({
      key: ev(n.shift()),
      value: ev(n.join("="))
    }));
  },
      uv = function (t) {
    this.entries.length = 0, av(this.entries, t);
  },
      cv = function (t, e) {
    if (t < e) throw TypeError("Not enough arguments");
  },
      sv = tn(function (t, e) {
    Yp(this, {
      type: "URLSearchParamsIterator",
      iterator: Gp(Xp(t).entries),
      kind: e
    });
  }, "Iterator", function () {
    var t = Jp(this),
        e = t.kind,
        r = t.iterator.next(),
        n = r.value;
    return r.done || (r.value = "keys" === e ? n.key : "values" === e ? n.value : [n.key, n.value]), r;
  }),
      fv = function () {
    no(this, fv, "URLSearchParams");
    var t,
        e,
        r,
        n,
        o,
        i,
        a,
        u,
        c,
        s = arguments.length > 0 ? arguments[0] : void 0,
        f = this,
        l = [];
    if (Yp(f, {
      type: "URLSearchParams",
      entries: l,
      updateURL: function () {},
      updateSearchParams: uv
    }), void 0 !== s) if (b(s)) {
      if ("function" == typeof (t = Pr(s))) for (r = (e = t.call(s)).next; !(n = r.call(e)).done;) {
        if ((a = (i = (o = Gp(O(n.value))).next).call(o)).done || (u = i.call(o)).done || !i.call(o).done) throw TypeError("Expected sequence with length 2");
        l.push({
          key: a.value + "",
          value: u.value + ""
        });
      } else for (c in s) w(s, c) && l.push({
        key: c,
        value: s[c] + ""
      });
    } else av(l, "string" == typeof s ? "?" === s.charAt(0) ? s.slice(1) : s : s + "");
  },
      lv = fv.prototype;

  ro(lv, {
    append: function (t, e) {
      cv(arguments.length, 2);
      var r = Xp(this);
      r.entries.push({
        key: t + "",
        value: e + ""
      }), r.updateURL();
    },
    delete: function (t) {
      cv(arguments.length, 1);

      for (var e = Xp(this), r = e.entries, n = t + "", o = 0; o < r.length;) r[o].key === n ? r.splice(o, 1) : o++;

      e.updateURL();
    },
    get: function (t) {
      cv(arguments.length, 1);

      for (var e = Xp(this).entries, r = t + "", n = 0; n < e.length; n++) if (e[n].key === r) return e[n].value;

      return null;
    },
    getAll: function (t) {
      cv(arguments.length, 1);

      for (var e = Xp(this).entries, r = t + "", n = [], o = 0; o < e.length; o++) e[o].key === r && n.push(e[o].value);

      return n;
    },
    has: function (t) {
      cv(arguments.length, 1);

      for (var e = Xp(this).entries, r = t + "", n = 0; n < e.length;) if (e[n++].key === r) return !0;

      return !1;
    },
    set: function (t, e) {
      cv(arguments.length, 1);

      for (var r, n = Xp(this), o = n.entries, i = !1, a = t + "", u = e + "", c = 0; c < o.length; c++) (r = o[c]).key === a && (i ? o.splice(c--, 1) : (i = !0, r.value = u));

      i || o.push({
        key: a,
        value: u
      }), n.updateURL();
    },
    sort: function () {
      var t,
          e,
          r,
          n = Xp(this),
          o = n.entries,
          i = o.slice();

      for (o.length = 0, r = 0; r < i.length; r++) {
        for (t = i[r], e = 0; e < r; e++) if (o[e].key > t.key) {
          o.splice(e, 0, t);
          break;
        }

        e === r && o.push(t);
      }

      n.updateURL();
    },
    forEach: function (t) {
      for (var e, r = Xp(this).entries, n = ge(t, arguments.length > 1 ? arguments[1] : void 0, 3), o = 0; o < r.length;) n((e = r[o++]).value, e.key, this);
    },
    keys: function () {
      return new sv(this, "keys");
    },
    values: function () {
      return new sv(this, "values");
    },
    entries: function () {
      return new sv(this, "entries");
    }
  }, {
    enumerable: !0
  }), P(lv, Hp, lv.entries), P(lv, "toString", function () {
    for (var t, e = Xp(this).entries, r = [], n = 0; n < e.length;) t = e[n++], r.push(iv(t.key) + "=" + iv(t.value));

    return r.join("&");
  }, {
    enumerable: !0
  }), he(fv, "URLSearchParams"), n({
    global: !0,
    forced: !Ip
  }, {
    URLSearchParams: fv
  }), Ip || "function" != typeof Vp || "function" != typeof $p || n({
    global: !0,
    enumerable: !0,
    forced: !0
  }, {
    fetch: function (t) {
      var e,
          r,
          n,
          o = [t];
      return arguments.length > 1 && (b(e = arguments[1]) && (r = e.body, "URLSearchParams" === Fr(r) && ((n = e.headers ? new $p(e.headers) : new $p()).has("content-type") || n.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8"), e = Ht(e, {
        body: c(0, String(r)),
        headers: c(0, n)
      }))), o.push(e)), Vp.apply(this, o);
    }
  }), Wp = {
    URLSearchParams: fv,
    getState: Xp
  };

  var hv = o.URL,
      pv = Wp.URLSearchParams,
      vv = Wp.getState,
      dv = B.set,
      gv = B.getterFor("URL"),
      yv = Math.floor,
      mv = Math.pow,
      bv = /[A-Za-z]/,
      wv = /[\d+-.A-Za-z]/,
      Sv = /\d/,
      Ev = /^(0x|0X)/,
      _v = /^[0-7]+$/,
      xv = /^\d+$/,
      Av = /^[\dA-Fa-f]+$/,
      Ov = /[\u0000\t\u000A\u000D #%/:?@[\\]]/,
      Rv = /[\u0000\t\u000A\u000D #/:?@[\\]]/,
      Tv = /^[\u0000-\u001F ]+|[\u0000-\u001F ]+$/g,
      jv = /[\t\u000A\u000D]/g,
      Mv = function (t, e) {
    var r, n, o;

    if ("[" == e.charAt(0)) {
      if ("]" != e.charAt(e.length - 1)) return "Invalid host";
      if (!(r = Iv(e.slice(1, -1)))) return "Invalid host";
      t.host = r;
    } else if (qv(t)) {
      if (e = Lp(e), Ov.test(e)) return "Invalid host";
      if (null === (r = kv(e))) return "Invalid host";
      t.host = r;
    } else {
      if (Rv.test(e)) return "Invalid host";

      for (r = "", n = Or(e), o = 0; o < n.length; o++) r += Cv(n[o], Lv);

      t.host = r;
    }
  },
      kv = function (t) {
    var e,
        r,
        n,
        o,
        i,
        a,
        u,
        c = t.split(".");
    if (c.length && "" == c[c.length - 1] && c.pop(), (e = c.length) > 4) return t;

    for (r = [], n = 0; n < e; n++) {
      if ("" == (o = c[n])) return t;
      if (i = 10, o.length > 1 && "0" == o.charAt(0) && (i = Ev.test(o) ? 16 : 8, o = o.slice(8 == i ? 1 : 2)), "" === o) a = 0;else {
        if (!(10 == i ? xv : 8 == i ? _v : Av).test(o)) return t;
        a = parseInt(o, i);
      }
      r.push(a);
    }

    for (n = 0; n < e; n++) if (a = r[n], n == e - 1) {
      if (a >= mv(256, 5 - e)) return null;
    } else if (a > 255) return null;

    for (u = r.pop(), n = 0; n < r.length; n++) u += r[n] * mv(256, 3 - n);

    return u;
  },
      Iv = function (t) {
    var e,
        r,
        n,
        o,
        i,
        a,
        u,
        c = [0, 0, 0, 0, 0, 0, 0, 0],
        s = 0,
        f = null,
        l = 0,
        h = function () {
      return t.charAt(l);
    };

    if (":" == h()) {
      if (":" != t.charAt(1)) return;
      l += 2, f = ++s;
    }

    for (; h();) {
      if (8 == s) return;

      if (":" != h()) {
        for (e = r = 0; r < 4 && Av.test(h());) e = 16 * e + parseInt(h(), 16), l++, r++;

        if ("." == h()) {
          if (0 == r) return;
          if (l -= r, s > 6) return;

          for (n = 0; h();) {
            if (o = null, n > 0) {
              if (!("." == h() && n < 4)) return;
              l++;
            }

            if (!Sv.test(h())) return;

            for (; Sv.test(h());) {
              if (i = parseInt(h(), 10), null === o) o = i;else {
                if (0 == o) return;
                o = 10 * o + i;
              }
              if (o > 255) return;
              l++;
            }

            c[s] = 256 * c[s] + o, 2 != ++n && 4 != n || s++;
          }

          if (4 != n) return;
          break;
        }

        if (":" == h()) {
          if (l++, !h()) return;
        } else if (h()) return;

        c[s++] = e;
      } else {
        if (null !== f) return;
        l++, f = ++s;
      }
    }

    if (null !== f) for (a = s - f, s = 7; 0 != s && a > 0;) u = c[s], c[s--] = c[f + a - 1], c[f + --a] = u;else if (8 != s) return;
    return c;
  },
      Pv = function (t) {
    var e, r, n, o;

    if ("number" == typeof t) {
      for (e = [], r = 0; r < 4; r++) e.unshift(t % 256), t = yv(t / 256);

      return e.join(".");
    }

    if ("object" == typeof t) {
      for (e = "", n = function (t) {
        for (var e = null, r = 1, n = null, o = 0, i = 0; i < 8; i++) 0 !== t[i] ? (o > r && (e = n, r = o), n = null, o = 0) : (null === n && (n = i), ++o);

        return o > r && (e = n, r = o), e;
      }(t), r = 0; r < 8; r++) o && 0 === t[r] || (o && (o = !1), n === r ? (e += r ? ":" : "::", o = !0) : (e += t[r].toString(16), r < 7 && (e += ":")));

      return "[" + e + "]";
    }

    return t;
  },
      Lv = {},
      Fv = $a({}, Lv, {
    " ": 1,
    '"': 1,
    "<": 1,
    ">": 1,
    "`": 1
  }),
      Nv = $a({}, Fv, {
    "#": 1,
    "?": 1,
    "{": 1,
    "}": 1
  }),
      Uv = $a({}, Nv, {
    "/": 1,
    ":": 1,
    ";": 1,
    "=": 1,
    "@": 1,
    "[": 1,
    "\\": 1,
    "]": 1,
    "^": 1,
    "|": 1
  }),
      Cv = function (t, e) {
    var r = Fp(t, 0);
    return r > 32 && r < 127 && !w(e, t) ? t : encodeURIComponent(t);
  },
      Bv = {
    ftp: 21,
    file: null,
    http: 80,
    https: 443,
    ws: 80,
    wss: 443
  },
      qv = function (t) {
    return w(Bv, t.scheme);
  },
      zv = function (t) {
    return "" != t.username || "" != t.password;
  },
      Dv = function (t) {
    return !t.host || t.cannotBeABaseURL || "file" == t.scheme;
  },
      Wv = function (t, e) {
    var r;
    return 2 == t.length && bv.test(t.charAt(0)) && (":" == (r = t.charAt(1)) || !e && "|" == r);
  },
      Gv = function (t) {
    var e;
    return t.length > 1 && Wv(t.slice(0, 2)) && (2 == t.length || "/" === (e = t.charAt(2)) || "\\" === e || "?" === e || "#" === e);
  },
      Vv = function (t) {
    var e = t.path,
        r = e.length;
    !r || "file" == t.scheme && 1 == r && Wv(e[0], !0) || e.pop();
  },
      $v = function (t) {
    return "." === t || "%2e" === t.toLowerCase();
  },
      Hv = {},
      Yv = {},
      Xv = {},
      Jv = {},
      Kv = {},
      Qv = {},
      Zv = {},
      ed = {},
      rd = {},
      nd = {},
      od = {},
      id = {},
      ad = {},
      ud = {},
      cd = {},
      sd = {},
      fd = {},
      ld = {},
      hd = {},
      pd = {},
      vd = {},
      dd = function (t, e, r, n) {
    var o,
        i,
        a,
        u,
        c,
        s = r || Hv,
        f = 0,
        l = "",
        h = !1,
        p = !1,
        v = !1;

    for (r || (t.scheme = "", t.username = "", t.password = "", t.host = null, t.port = null, t.path = [], t.query = null, t.fragment = null, t.cannotBeABaseURL = !1, e = e.replace(Tv, "")), e = e.replace(jv, ""), o = Or(e); f <= o.length;) {
      switch (i = o[f], s) {
        case Hv:
          if (!i || !bv.test(i)) {
            if (r) return "Invalid scheme";
            s = Xv;
            continue;
          }

          l += i.toLowerCase(), s = Yv;
          break;

        case Yv:
          if (i && (wv.test(i) || "+" == i || "-" == i || "." == i)) l += i.toLowerCase();else {
            if (":" != i) {
              if (r) return "Invalid scheme";
              l = "", s = Xv, f = 0;
              continue;
            }

            if (r && (qv(t) != w(Bv, l) || "file" == l && (zv(t) || null !== t.port) || "file" == t.scheme && !t.host)) return;
            if (t.scheme = l, r) return void (qv(t) && Bv[t.scheme] == t.port && (t.port = null));
            l = "", "file" == t.scheme ? s = ud : qv(t) && n && n.scheme == t.scheme ? s = Jv : qv(t) ? s = ed : "/" == o[f + 1] ? (s = Kv, f++) : (t.cannotBeABaseURL = !0, t.path.push(""), s = hd);
          }
          break;

        case Xv:
          if (!n || n.cannotBeABaseURL && "#" != i) return "Invalid scheme";

          if (n.cannotBeABaseURL && "#" == i) {
            t.scheme = n.scheme, t.path = n.path.slice(), t.query = n.query, t.fragment = "", t.cannotBeABaseURL = !0, s = vd;
            break;
          }

          s = "file" == n.scheme ? ud : Qv;
          continue;

        case Jv:
          if ("/" != i || "/" != o[f + 1]) {
            s = Qv;
            continue;
          }

          s = rd, f++;
          break;

        case Kv:
          if ("/" == i) {
            s = nd;
            break;
          }

          s = ld;
          continue;

        case Qv:
          if (t.scheme = n.scheme, null == i) t.username = n.username, t.password = n.password, t.host = n.host, t.port = n.port, t.path = n.path.slice(), t.query = n.query;else if ("/" == i || "\\" == i && qv(t)) s = Zv;else if ("?" == i) t.username = n.username, t.password = n.password, t.host = n.host, t.port = n.port, t.path = n.path.slice(), t.query = "", s = pd;else {
            if ("#" != i) {
              t.username = n.username, t.password = n.password, t.host = n.host, t.port = n.port, t.path = n.path.slice(), t.path.pop(), s = ld;
              continue;
            }

            t.username = n.username, t.password = n.password, t.host = n.host, t.port = n.port, t.path = n.path.slice(), t.query = n.query, t.fragment = "", s = vd;
          }
          break;

        case Zv:
          if (!qv(t) || "/" != i && "\\" != i) {
            if ("/" != i) {
              t.username = n.username, t.password = n.password, t.host = n.host, t.port = n.port, s = ld;
              continue;
            }

            s = nd;
          } else s = rd;

          break;

        case ed:
          if (s = rd, "/" != i || "/" != l.charAt(f + 1)) continue;
          f++;
          break;

        case rd:
          if ("/" != i && "\\" != i) {
            s = nd;
            continue;
          }

          break;

        case nd:
          if ("@" == i) {
            h && (l = "%40" + l), h = !0, a = Or(l);

            for (var d = 0; d < a.length; d++) {
              var g = a[d];

              if (":" != g || v) {
                var y = Cv(g, Uv);
                v ? t.password += y : t.username += y;
              } else v = !0;
            }

            l = "";
          } else if (null == i || "/" == i || "?" == i || "#" == i || "\\" == i && qv(t)) {
            if (h && "" == l) return "Invalid authority";
            f -= Or(l).length + 1, l = "", s = od;
          } else l += i;

          break;

        case od:
        case id:
          if (r && "file" == t.scheme) {
            s = sd;
            continue;
          }

          if (":" != i || p) {
            if (null == i || "/" == i || "?" == i || "#" == i || "\\" == i && qv(t)) {
              if (qv(t) && "" == l) return "Invalid host";
              if (r && "" == l && (zv(t) || null !== t.port)) return;
              if (u = Mv(t, l)) return u;
              if (l = "", s = fd, r) return;
              continue;
            }

            "[" == i ? p = !0 : "]" == i && (p = !1), l += i;
          } else {
            if ("" == l) return "Invalid host";
            if (u = Mv(t, l)) return u;
            if (l = "", s = ad, r == id) return;
          }

          break;

        case ad:
          if (!Sv.test(i)) {
            if (null == i || "/" == i || "?" == i || "#" == i || "\\" == i && qv(t) || r) {
              if ("" != l) {
                var m = parseInt(l, 10);
                if (m > 65535) return "Invalid port";
                t.port = qv(t) && m === Bv[t.scheme] ? null : m, l = "";
              }

              if (r) return;
              s = fd;
              continue;
            }

            return "Invalid port";
          }

          l += i;
          break;

        case ud:
          if (t.scheme = "file", "/" == i || "\\" == i) s = cd;else {
            if (!n || "file" != n.scheme) {
              s = ld;
              continue;
            }

            if (null == i) t.host = n.host, t.path = n.path.slice(), t.query = n.query;else if ("?" == i) t.host = n.host, t.path = n.path.slice(), t.query = "", s = pd;else {
              if ("#" != i) {
                Gv(o.slice(f).join("")) || (t.host = n.host, t.path = n.path.slice(), Vv(t)), s = ld;
                continue;
              }

              t.host = n.host, t.path = n.path.slice(), t.query = n.query, t.fragment = "", s = vd;
            }
          }
          break;

        case cd:
          if ("/" == i || "\\" == i) {
            s = sd;
            break;
          }

          n && "file" == n.scheme && !Gv(o.slice(f).join("")) && (Wv(n.path[0], !0) ? t.path.push(n.path[0]) : t.host = n.host), s = ld;
          continue;

        case sd:
          if (null == i || "/" == i || "\\" == i || "?" == i || "#" == i) {
            if (!r && Wv(l)) s = ld;else if ("" == l) {
              if (t.host = "", r) return;
              s = fd;
            } else {
              if (u = Mv(t, l)) return u;
              if ("localhost" == t.host && (t.host = ""), r) return;
              l = "", s = fd;
            }
            continue;
          }

          l += i;
          break;

        case fd:
          if (qv(t)) {
            if (s = ld, "/" != i && "\\" != i) continue;
          } else if (r || "?" != i) {
            if (r || "#" != i) {
              if (null != i && (s = ld, "/" != i)) continue;
            } else t.fragment = "", s = vd;
          } else t.query = "", s = pd;

          break;

        case ld:
          if (null == i || "/" == i || "\\" == i && qv(t) || !r && ("?" == i || "#" == i)) {
            if (".." === (c = (c = l).toLowerCase()) || "%2e." === c || ".%2e" === c || "%2e%2e" === c ? (Vv(t), "/" == i || "\\" == i && qv(t) || t.path.push("")) : $v(l) ? "/" == i || "\\" == i && qv(t) || t.path.push("") : ("file" == t.scheme && !t.path.length && Wv(l) && (t.host && (t.host = ""), l = l.charAt(0) + ":"), t.path.push(l)), l = "", "file" == t.scheme && (null == i || "?" == i || "#" == i)) for (; t.path.length > 1 && "" === t.path[0];) t.path.shift();
            "?" == i ? (t.query = "", s = pd) : "#" == i && (t.fragment = "", s = vd);
          } else l += Cv(i, Nv);

          break;

        case hd:
          "?" == i ? (t.query = "", s = pd) : "#" == i ? (t.fragment = "", s = vd) : null != i && (t.path[0] += Cv(i, Lv));
          break;

        case pd:
          r || "#" != i ? null != i && ("'" == i && qv(t) ? t.query += "%27" : t.query += "#" == i ? "%23" : Cv(i, Lv)) : (t.fragment = "", s = vd);
          break;

        case vd:
          null != i && (t.fragment += Cv(i, Fv));
      }

      f++;
    }
  },
      gd = function (t) {
    var e,
        r,
        n = no(this, gd, "URL"),
        o = arguments.length > 1 ? arguments[1] : void 0,
        i = String(t),
        u = dv(n, {
      type: "URL"
    });
    if (void 0 !== o) if (o instanceof gd) e = gv(o);else if (r = dd(e = {}, String(o))) throw TypeError(r);
    if (r = dd(u, i, null, e)) throw TypeError(r);
    var c = u.searchParams = new pv(),
        s = vv(c);
    s.updateSearchParams(u.query), s.updateURL = function () {
      u.query = String(c) || null;
    }, a || (n.href = md.call(n), n.origin = bd.call(n), n.protocol = wd.call(n), n.username = Sd.call(n), n.password = Ed.call(n), n.host = _d.call(n), n.hostname = xd.call(n), n.port = Ad.call(n), n.pathname = Od.call(n), n.search = Rd.call(n), n.searchParams = Td.call(n), n.hash = jd.call(n));
  },
      yd = gd.prototype,
      md = function () {
    var t = gv(this),
        e = t.scheme,
        r = t.username,
        n = t.password,
        o = t.host,
        i = t.port,
        a = t.path,
        u = t.query,
        c = t.fragment,
        s = e + ":";
    return null !== o ? (s += "//", zv(t) && (s += r + (n ? ":" + n : "") + "@"), s += Pv(o), null !== i && (s += ":" + i)) : "file" == e && (s += "//"), s += t.cannotBeABaseURL ? a[0] : a.length ? "/" + a.join("/") : "", null !== u && (s += "?" + u), null !== c && (s += "#" + c), s;
  },
      bd = function () {
    var t = gv(this),
        e = t.scheme,
        r = t.port;
    if ("blob" == e) try {
      return new URL(e.path[0]).origin;
    } catch (t) {
      return "null";
    }
    return "file" != e && qv(t) ? e + "://" + Pv(t.host) + (null !== r ? ":" + r : "") : "null";
  },
      wd = function () {
    return gv(this).scheme + ":";
  },
      Sd = function () {
    return gv(this).username;
  },
      Ed = function () {
    return gv(this).password;
  },
      _d = function () {
    var t = gv(this),
        e = t.host,
        r = t.port;
    return null === e ? "" : null === r ? Pv(e) : Pv(e) + ":" + r;
  },
      xd = function () {
    var t = gv(this).host;
    return null === t ? "" : Pv(t);
  },
      Ad = function () {
    var t = gv(this).port;
    return null === t ? "" : String(t);
  },
      Od = function () {
    var t = gv(this),
        e = t.path;
    return t.cannotBeABaseURL ? e[0] : e.length ? "/" + e.join("/") : "";
  },
      Rd = function () {
    var t = gv(this).query;
    return t ? "?" + t : "";
  },
      Td = function () {
    return gv(this).searchParams;
  },
      jd = function () {
    var t = gv(this).fragment;
    return t ? "#" + t : "";
  },
      Md = function (t, e) {
    return {
      get: t,
      set: e,
      configurable: !0,
      enumerable: !0
    };
  };

  if (a && Yt(yd, {
    href: Md(md, function (t) {
      var e = gv(this),
          r = String(t),
          n = dd(e, r);
      if (n) throw TypeError(n);
      vv(e.searchParams).updateSearchParams(e.query);
    }),
    origin: Md(bd),
    protocol: Md(wd, function (t) {
      var e = gv(this);
      dd(e, String(t) + ":", Hv);
    }),
    username: Md(Sd, function (t) {
      var e = gv(this),
          r = Or(String(t));

      if (!Dv(e)) {
        e.username = "";

        for (var n = 0; n < r.length; n++) e.username += Cv(r[n], Uv);
      }
    }),
    password: Md(Ed, function (t) {
      var e = gv(this),
          r = Or(String(t));

      if (!Dv(e)) {
        e.password = "";

        for (var n = 0; n < r.length; n++) e.password += Cv(r[n], Uv);
      }
    }),
    host: Md(_d, function (t) {
      var e = gv(this);
      e.cannotBeABaseURL || dd(e, String(t), od);
    }),
    hostname: Md(xd, function (t) {
      var e = gv(this);
      e.cannotBeABaseURL || dd(e, String(t), id);
    }),
    port: Md(Ad, function (t) {
      var e = gv(this);
      Dv(e) || ("" == (t = String(t)) ? e.port = null : dd(e, t, ad));
    }),
    pathname: Md(Od, function (t) {
      var e = gv(this);
      e.cannotBeABaseURL || (e.path = [], dd(e, t + "", fd));
    }),
    search: Md(Rd, function (t) {
      var e = gv(this);
      "" == (t = String(t)) ? e.query = null : ("?" == t.charAt(0) && (t = t.slice(1)), e.query = "", dd(e, t, pd)), vv(e.searchParams).updateSearchParams(e.query);
    }),
    searchParams: Md(Td),
    hash: Md(jd, function (t) {
      var e = gv(this);
      "" != (t = String(t)) ? ("#" == t.charAt(0) && (t = t.slice(1)), e.fragment = "", dd(e, t, vd)) : e.fragment = null;
    })
  }), P(yd, "toJSON", function () {
    return md.call(this);
  }, {
    enumerable: !0
  }), P(yd, "toString", function () {
    return md.call(this);
  }, {
    enumerable: !0
  }), hv) {
    var kd = hv.createObjectURL,
        Id = hv.revokeObjectURL;
    kd && P(gd, "createObjectURL", function (t) {
      return kd.apply(hv, arguments);
    }), Id && P(gd, "revokeObjectURL", function (t) {
      return Id.apply(hv, arguments);
    });
  }

  he(gd, "URL"), n({
    global: !0,
    forced: !Ip,
    sham: !a
  }, {
    URL: gd
  }), n({
    target: "URL",
    proto: !0,
    enumerable: !0
  }, {
    toJSON: function () {
      return URL.prototype.toString.call(this);
    }
  });

  var Pd = function (t) {
    var e = Object.prototype,
        r = e.hasOwnProperty,
        n = "function" == typeof Symbol ? Symbol : {},
        o = n.iterator || "@@iterator",
        i = n.asyncIterator || "@@asyncIterator",
        a = n.toStringTag || "@@toStringTag";

    function u(t, e, r) {
      return Object.defineProperty(t, e, {
        value: r,
        enumerable: !0,
        configurable: !0,
        writable: !0
      }), t[e];
    }

    try {
      u({}, "");
    } catch (t) {
      u = function (t, e, r) {
        return t[e] = r;
      };
    }

    function c(t, e, r, n) {
      var o = e && e.prototype instanceof l ? e : l,
          i = Object.create(o.prototype),
          a = new _(n || []);
      return i._invoke = function (t, e, r) {
        var n = "suspendedStart";
        return function (o, i) {
          if ("executing" === n) throw new Error("Generator is already running");

          if ("completed" === n) {
            if ("throw" === o) throw i;
            return A();
          }

          for (r.method = o, r.arg = i;;) {
            var a = r.delegate;

            if (a) {
              var u = w(a, r);

              if (u) {
                if (u === f) continue;
                return u;
              }
            }

            if ("next" === r.method) r.sent = r._sent = r.arg;else if ("throw" === r.method) {
              if ("suspendedStart" === n) throw n = "completed", r.arg;
              r.dispatchException(r.arg);
            } else "return" === r.method && r.abrupt("return", r.arg);
            n = "executing";
            var c = s(t, e, r);

            if ("normal" === c.type) {
              if (n = r.done ? "completed" : "suspendedYield", c.arg === f) continue;
              return {
                value: c.arg,
                done: r.done
              };
            }

            "throw" === c.type && (n = "completed", r.method = "throw", r.arg = c.arg);
          }
        };
      }(t, r, a), i;
    }

    function s(t, e, r) {
      try {
        return {
          type: "normal",
          arg: t.call(e, r)
        };
      } catch (t) {
        return {
          type: "throw",
          arg: t
        };
      }
    }

    t.wrap = c;
    var f = {};

    function l() {}

    function h() {}

    function p() {}

    var v = {};

    v[o] = function () {
      return this;
    };

    var d = Object.getPrototypeOf,
        g = d && d(d(x([])));
    g && g !== e && r.call(g, o) && (v = g);
    var y = p.prototype = l.prototype = Object.create(v);

    function m(t) {
      ["next", "throw", "return"].forEach(function (e) {
        u(t, e, function (t) {
          return this._invoke(e, t);
        });
      });
    }

    function b(t, e) {
      var n;

      this._invoke = function (o, i) {
        function a() {
          return new e(function (n, a) {
            !function n(o, i, a, u) {
              var c = s(t[o], t, i);

              if ("throw" !== c.type) {
                var f = c.arg,
                    l = f.value;
                return l && "object" == typeof l && r.call(l, "__await") ? e.resolve(l.__await).then(function (t) {
                  n("next", t, a, u);
                }, function (t) {
                  n("throw", t, a, u);
                }) : e.resolve(l).then(function (t) {
                  f.value = t, a(f);
                }, function (t) {
                  return n("throw", t, a, u);
                });
              }

              u(c.arg);
            }(o, i, n, a);
          });
        }

        return n = n ? n.then(a, a) : a();
      };
    }

    function w(t, e) {
      var r = t.iterator[e.method];

      if (void 0 === r) {
        if (e.delegate = null, "throw" === e.method) {
          if (t.iterator.return && (e.method = "return", e.arg = void 0, w(t, e), "throw" === e.method)) return f;
          e.method = "throw", e.arg = new TypeError("The iterator does not provide a 'throw' method");
        }

        return f;
      }

      var n = s(r, t.iterator, e.arg);
      if ("throw" === n.type) return e.method = "throw", e.arg = n.arg, e.delegate = null, f;
      var o = n.arg;
      return o ? o.done ? (e[t.resultName] = o.value, e.next = t.nextLoc, "return" !== e.method && (e.method = "next", e.arg = void 0), e.delegate = null, f) : o : (e.method = "throw", e.arg = new TypeError("iterator result is not an object"), e.delegate = null, f);
    }

    function S(t) {
      var e = {
        tryLoc: t[0]
      };
      1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e);
    }

    function E(t) {
      var e = t.completion || {};
      e.type = "normal", delete e.arg, t.completion = e;
    }

    function _(t) {
      this.tryEntries = [{
        tryLoc: "root"
      }], t.forEach(S, this), this.reset(!0);
    }

    function x(t) {
      if (t) {
        var e = t[o];
        if (e) return e.call(t);
        if ("function" == typeof t.next) return t;

        if (!isNaN(t.length)) {
          var n = -1,
              i = function e() {
            for (; ++n < t.length;) if (r.call(t, n)) return e.value = t[n], e.done = !1, e;

            return e.value = void 0, e.done = !0, e;
          };

          return i.next = i;
        }
      }

      return {
        next: A
      };
    }

    function A() {
      return {
        value: void 0,
        done: !0
      };
    }

    return h.prototype = y.constructor = p, p.constructor = h, h.displayName = u(p, a, "GeneratorFunction"), t.isGeneratorFunction = function (t) {
      var e = "function" == typeof t && t.constructor;
      return !!e && (e === h || "GeneratorFunction" === (e.displayName || e.name));
    }, t.mark = function (t) {
      return Object.setPrototypeOf ? Object.setPrototypeOf(t, p) : (t.__proto__ = p, u(t, a, "GeneratorFunction")), t.prototype = Object.create(y), t;
    }, t.awrap = function (t) {
      return {
        __await: t
      };
    }, m(b.prototype), b.prototype[i] = function () {
      return this;
    }, t.AsyncIterator = b, t.async = function (e, r, n, o, i) {
      void 0 === i && (i = Promise);
      var a = new b(c(e, r, n, o), i);
      return t.isGeneratorFunction(r) ? a : a.next().then(function (t) {
        return t.done ? t.value : a.next();
      });
    }, m(y), u(y, a, "Generator"), y[o] = function () {
      return this;
    }, y.toString = function () {
      return "[object Generator]";
    }, t.keys = function (t) {
      var e = [];

      for (var r in t) e.push(r);

      return e.reverse(), function r() {
        for (; e.length;) {
          var n = e.pop();
          if (n in t) return r.value = n, r.done = !1, r;
        }

        return r.done = !0, r;
      };
    }, t.values = x, _.prototype = {
      constructor: _,
      reset: function (t) {
        if (this.prev = 0, this.next = 0, this.sent = this._sent = void 0, this.done = !1, this.delegate = null, this.method = "next", this.arg = void 0, this.tryEntries.forEach(E), !t) for (var e in this) "t" === e.charAt(0) && r.call(this, e) && !isNaN(+e.slice(1)) && (this[e] = void 0);
      },
      stop: function () {
        this.done = !0;
        var t = this.tryEntries[0].completion;
        if ("throw" === t.type) throw t.arg;
        return this.rval;
      },
      dispatchException: function (t) {
        if (this.done) throw t;
        var e = this;

        function n(r, n) {
          return a.type = "throw", a.arg = t, e.next = r, n && (e.method = "next", e.arg = void 0), !!n;
        }

        for (var o = this.tryEntries.length - 1; o >= 0; --o) {
          var i = this.tryEntries[o],
              a = i.completion;
          if ("root" === i.tryLoc) return n("end");

          if (i.tryLoc <= this.prev) {
            var u = r.call(i, "catchLoc"),
                c = r.call(i, "finallyLoc");

            if (u && c) {
              if (this.prev < i.catchLoc) return n(i.catchLoc, !0);
              if (this.prev < i.finallyLoc) return n(i.finallyLoc);
            } else if (u) {
              if (this.prev < i.catchLoc) return n(i.catchLoc, !0);
            } else {
              if (!c) throw new Error("try statement without catch or finally");
              if (this.prev < i.finallyLoc) return n(i.finallyLoc);
            }
          }
        }
      },
      abrupt: function (t, e) {
        for (var n = this.tryEntries.length - 1; n >= 0; --n) {
          var o = this.tryEntries[n];

          if (o.tryLoc <= this.prev && r.call(o, "finallyLoc") && this.prev < o.finallyLoc) {
            var i = o;
            break;
          }
        }

        i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null);
        var a = i ? i.completion : {};
        return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, f) : this.complete(a);
      },
      complete: function (t, e) {
        if ("throw" === t.type) throw t.arg;
        return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), f;
      },
      finish: function (t) {
        for (var e = this.tryEntries.length - 1; e >= 0; --e) {
          var r = this.tryEntries[e];
          if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), E(r), f;
        }
      },
      catch: function (t) {
        for (var e = this.tryEntries.length - 1; e >= 0; --e) {
          var r = this.tryEntries[e];

          if (r.tryLoc === t) {
            var n = r.completion;

            if ("throw" === n.type) {
              var o = n.arg;
              E(r);
            }

            return o;
          }
        }

        throw new Error("illegal catch attempt");
      },
      delegateYield: function (t, e, r) {
        return this.delegate = {
          iterator: x(t),
          resultName: e,
          nextLoc: r
        }, "next" === this.method && (this.arg = void 0), f;
      }
    }, t;
  }({});

  try {
    regeneratorRuntime = Pd;
  } catch (t) {
    Function("r", "regeneratorRuntime = r")(Pd);
  }

  function Ld(t, e, r, n, o, i, a) {
    try {
      var u = t[i](a),
          c = u.value;
    } catch (t) {
      return void r(t);
    }

    u.done ? e(c) : Promise.resolve(c).then(n, o);
  }

  var Fd = function (t) {
    return new Promise(function (e, r) {
      setTimeout(function () {
        r(new Error("Request took too long! Timeout after ".concat(t, " second").concat(t > 1 ? "s" : "")));
      }, 1e3 * t);
    });
  },
      Nd = function () {
    var t,
        e = (t = regeneratorRuntime.mark(function t(e) {
      var r, n;
      return regeneratorRuntime.wrap(function (t) {
        for (;;) switch (t.prev = t.next) {
          case 0:
            return t.prev = 0, t.next = 3, Promise.race([fetch("".concat(e)), Fd(10)]);

          case 3:
            return r = t.sent, t.next = 6, r.json();

          case 6:
            if (n = t.sent, r.ok) {
              t.next = 9;
              break;
            }

            throw new Error(n.message);

          case 9:
            return t.abrupt("return", n);

          case 12:
            throw t.prev = 12, t.t0 = t.catch(0), console.log("Custom_helpers: ".concat(t.t0.message)), t.t0;

          case 16:
          case "end":
            return t.stop();
        }
      }, t, null, [[0, 12]]);
    }), function () {
      var e = this,
          r = arguments;
      return new Promise(function (n, o) {
        var i = t.apply(e, r);

        function a(t) {
          Ld(i, n, o, a, u, "next", t);
        }

        function u(t) {
          Ld(i, n, o, a, u, "throw", t);
        }

        a(void 0);
      });
    });
    return function (t) {
      return e.apply(this, arguments);
    };
  }();

  function Ud(t, e, r, n, o, i, a) {
    try {
      var u = t[i](a),
          c = u.value;
    } catch (t) {
      return void r(t);
    }

    u.done ? e(c) : Promise.resolve(c).then(n, o);
  }

  function Cd(t) {
    return function () {
      var e = this,
          r = arguments;
      return new Promise(function (n, o) {
        var i = t.apply(e, r);

        function a(t) {
          Ud(i, n, o, a, u, "next", t);
        }

        function u(t) {
          Ud(i, n, o, a, u, "throw", t);
        }

        a(void 0);
      });
    };
  }

  var Bd,
      qd = {
    recipe: {},
    search: {
      query: "",
      results: [],
      page: 1,
      resultsPerPage: 10
    }
  },
      zd = function () {
    var t = Cd(regeneratorRuntime.mark(function t(e) {
      var r, n;
      return regeneratorRuntime.wrap(function (t) {
        for (;;) switch (t.prev = t.next) {
          case 0:
            return t.prev = 0, t.next = 3, Nd("".concat("https://forkify-api.herokuapp.com/api/v2/recipes", "/").concat(e));

          case 3:
            r = t.sent, n = r.data.recipe, qd.recipe = {
              id: n.id,
              title: n.title,
              publisher: n.publisher,
              sourceUrl: n.source_url,
              image: n.image_url,
              servings: n.servings,
              cookingTime: n.cooking_time,
              ingredients: n.ingredients
            }, t.next = 12;
            break;

          case 8:
            throw t.prev = 8, t.t0 = t.catch(0), console.log(t.t0.message), t.t0;

          case 12:
          case "end":
            return t.stop();
        }
      }, t, null, [[0, 8]]);
    }));
    return function (e) {
      return t.apply(this, arguments);
    };
  }(),
      Dd = function () {
    var t = Cd(regeneratorRuntime.mark(function t(e) {
      var r;
      return regeneratorRuntime.wrap(function (t) {
        for (;;) switch (t.prev = t.next) {
          case 0:
            return t.prev = 0, qd.search.query = e, t.next = 4, Nd("".concat("https://forkify-api.herokuapp.com/api/v2/recipes", "?search=").concat(e));

          case 4:
            r = t.sent, qd.search.results = r.data.recipes.map(function (t) {
              return {
                id: t.id,
                title: t.title,
                publisher: t.publisher,
                image: t.image_url
              };
            }), t.next = 12;
            break;

          case 8:
            throw t.prev = 8, t.t0 = t.catch(0), console.error(t.t0), t.t0;

          case 12:
          case "end":
            return t.stop();
        }
      }, t, null, [[0, 8]]);
    }));
    return function (e) {
      return t.apply(this, arguments);
    };
  }(),
      Wd = function () {
    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1;
    qd.search.page = t;
    var e = (t - 1) * qd.search.resultsPerPage,
        r = t * qd.search.resultsPerPage;
    return qd.search.results.slice(e, r);
  },
      Gd = null;

  var Vd,
      $d = function () {
    return Gd || (Gd = function () {
      try {
        throw new Error();
      } catch (e) {
        var t = ("" + e.stack).match(/(https?|file|ftp):\/\/[^)\n]+/g);
        if (t) return ("" + t[0]).replace(/^((?:https?|file|ftp):\/\/.+)\/[^/]+$/, "$1") + "/";
      }

      return "/";
    }()), Gd;
  },
      Hd = r;

  function Yd(t) {
    if ("" === t) return ".";
    var e = "/" === t[t.length - 1] ? t.slice(0, t.length - 1) : t,
        r = e.lastIndexOf("/");
    return -1 === r ? "." : e.slice(0, r);
  }

  function Xd(t, e) {
    if (t === e) return "";
    var r = t.split("/");
    "." === r[0] && r.shift();
    var n,
        o,
        i = e.split("/");

    for ("." === i[0] && i.shift(), n = 0; (n < i.length || n < r.length) && null == o; n++) r[n] !== i[n] && (o = n);

    var a = [];

    for (n = 0; n < r.length - o; n++) a.push("..");

    return i.length > o && a.push.apply(a, i.slice(o)), a.join("/");
  }

  function Jd(t, e) {
    for (var r = 0; r < e.length; r++) {
      var n = e[r];
      n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n);
    }
  }

  (Vd = function (t, e) {
    return Xd(Yd(Hd(t)), Hd(e));
  })._dirname = Yd, Vd._relative = Xd, Bd = $d() + Vd("67d91acf8a78ec3f", "a1e15e2135e3c52a");

  var Kd,
      Qd,
      Zd,
      tg = (Kd = Bd) && Kd.__esModule ? Kd.default : Kd,
      eg = function () {
    function t() {
      var e, r, n;
      !function (t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
      }(this, t), n = void 0, (r = "_data") in (e = this) ? Object.defineProperty(e, r, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
      }) : e[r] = n;
    }

    var e, r, n;
    return e = t, (r = [{
      key: "render",
      value: function (t) {
        if (!t || Array.isArray(t) && 0 === t.length) return this.renderError();
        this._data = t;

        var e = this._generateMarkup();

        this._clear(), this._parentElement.insertAdjacentHTML("afterbegin", e);
      }
    }, {
      key: "update",
      value: function (t) {
        if (!t || Array.isArray(t) && 0 === t.length) return this.renderError();
        console.log(this._data), this._data = t, console.log(this._data);

        var e = this._generateMarkup(),
            r = document.createRange().createContextualFragment(e),
            n = Array.from(r.querySelectorAll("*")),
            o = Array.from(this._parentElement.querySelectorAll("*"));

        n.forEach(function (t, e) {
          var r,
              i = o[e];
          t.isEqualNode(i) || "" === (null === (r = t.firstChild) || void 0 === r ? void 0 : r.nodeValue.trim()) || (i.textContent = t.textContent), t.isEqualNode(i) || console.log(n.attributes);
        });
      }
    }, {
      key: "renderSpinner",
      value: function () {
        var t = '\n    <div class="spinner">\n    <svg>\n    <use href="'.concat(tg, '#icon-loader"></use>\n    </svg>\n    </div>\n    ');
        this._clear(), this._parentElement.insertAdjacentHTML("afterbegin", t);
      }
    }, {
      key: "renderError",
      value: function () {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this._errorMessage,
            e = '\n      <div class="error">\n        <div>\n          <svg>\n            <use href="'.concat(tg, '#icon-alert-triangle"></use>\n          </svg>\n        </div>\n        <p>').concat(t, "</p>\n      </div>");
        console.log(e), this._clear(), this._parentElement.insertAdjacentHTML("afterbegin", e);
      }
    }, {
      key: "renderMessage",
      value: function () {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this._successMessage,
            e = '\n      <div class="message">\n        <div>\n          <svg>\n            <use href="'.concat(tg, '#icon-smile"></use>\n          </svg>\n        </div>\n        <p>').concat(t, "</p>\n      </div>");
        console.log(e), this._clear(), this._parentElement.insertAdjacentHTML("afterbegin", e);
      }
    }, {
      key: "_clear",
      value: function () {
        this._parentElement.innerHTML = "";
      }
    }]) && Jd(e.prototype, r), n && Jd(e, n), t;
  }();

  Fraction = function (t, e) {
    if (void 0 !== t && e) "number" == typeof t && "number" == typeof e ? (this.numerator = t, this.denominator = e) : "string" == typeof t && "string" == typeof e && (this.numerator = parseInt(t), this.denominator = parseInt(e));else if (void 0 === e) if (num = t, "number" == typeof num) this.numerator = num, this.denominator = 1;else if ("string" == typeof num) {
      var r,
          n,
          o = num.split(" ");
      if (o[0] && (r = o[0]), o[1] && (n = o[1]), r % 1 == 0 && n && n.match("/")) return new Fraction(r).add(new Fraction(n));
      if (!r || n) return;

      if ("string" == typeof r && r.match("/")) {
        var i = r.split("/");
        this.numerator = i[0], this.denominator = i[1];
      } else {
        if ("string" == typeof r && r.match(".")) return new Fraction(parseFloat(r));
        this.numerator = parseInt(r), this.denominator = 1;
      }
    }
    this.normalize();
  }, Fraction.prototype.clone = function () {
    return new Fraction(this.numerator, this.denominator);
  }, Fraction.prototype.toString = function () {
    if ("NaN" === this.denominator) return "NaN";
    var t = this.numerator / this.denominator > 0 ? Math.floor(this.numerator / this.denominator) : Math.ceil(this.numerator / this.denominator),
        e = this.numerator % this.denominator,
        r = this.denominator,
        n = [];
    return 0 != t && n.push(t), 0 != e && n.push((0 === t ? e : Math.abs(e)) + "/" + r), n.length > 0 ? n.join(" ") : 0;
  }, Fraction.prototype.rescale = function (t) {
    return this.numerator *= t, this.denominator *= t, this;
  }, Fraction.prototype.add = function (t) {
    var e = this.clone();
    return t = t instanceof Fraction ? t.clone() : new Fraction(t), td = e.denominator, e.rescale(t.denominator), t.rescale(td), e.numerator += t.numerator, e.normalize();
  }, Fraction.prototype.subtract = function (t) {
    var e = this.clone();
    return t = t instanceof Fraction ? t.clone() : new Fraction(t), td = e.denominator, e.rescale(t.denominator), t.rescale(td), e.numerator -= t.numerator, e.normalize();
  }, Fraction.prototype.multiply = function (t) {
    var e = this.clone();
    if (t instanceof Fraction) e.numerator *= t.numerator, e.denominator *= t.denominator;else {
      if ("number" != typeof t) return e.multiply(new Fraction(t));
      e.numerator *= t;
    }
    return e.normalize();
  }, Fraction.prototype.divide = function (t) {
    var e = this.clone();
    if (t instanceof Fraction) e.numerator *= t.denominator, e.denominator *= t.numerator;else {
      if ("number" != typeof t) return e.divide(new Fraction(t));
      e.denominator *= t;
    }
    return e.normalize();
  }, Fraction.prototype.equals = function (t) {
    t instanceof Fraction || (t = new Fraction(t));
    var e = this.clone().normalize();
    t = t.clone().normalize();
    return e.numerator === t.numerator && e.denominator === t.denominator;
  }, Fraction.prototype.normalize = (Qd = function (t) {
    return "number" == typeof t && (t > 0 && t % 1 > 0 && t % 1 < 1 || t < 0 && t % -1 < 0 && t % -1 > -1);
  }, Zd = function (t, e) {
    if (e) {
      var r = Math.pow(10, e);
      return Math.round(t * r) / r;
    }

    return Math.round(t);
  }, function () {
    if (Qd(this.denominator)) {
      var t = Zd(this.denominator, 9),
          e = Math.pow(10, t.toString().split(".")[1].length);
      this.denominator = Math.round(this.denominator * e), this.numerator *= e;
    }

    Qd(this.numerator) && (t = Zd(this.numerator, 9), e = Math.pow(10, t.toString().split(".")[1].length), this.numerator = Math.round(this.numerator * e), this.denominator *= e);
    var r = Fraction.gcf(this.numerator, this.denominator);
    return this.numerator /= r, this.denominator /= r, (this.numerator < 0 && this.denominator < 0 || this.numerator > 0 && this.denominator < 0) && (this.numerator *= -1, this.denominator *= -1), this;
  }), Fraction.gcf = function (t, e) {
    var r = [],
        n = Fraction.primeFactors(t),
        o = Fraction.primeFactors(e);
    return n.forEach(function (t) {
      var e = o.indexOf(t);
      e >= 0 && (r.push(t), o.splice(e, 1));
    }), 0 === r.length ? 1 : function () {
      var t,
          e = r[0];

      for (t = 1; t < r.length; t++) e *= r[t];

      return e;
    }();
  }, Fraction.primeFactors = function (t) {
    for (var e = Math.abs(t), r = [], n = 2; n * n <= e;) e % n == 0 ? (r.push(n), e /= n) : n++;

    return 1 != e && r.push(e), r;
  };
  var rg = Fraction;

  function ng(t) {
    return (ng = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
      return typeof t;
    } : function (t) {
      return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
    })(t);
  }

  function og(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
  }

  function ig(t, e) {
    for (var r = 0; r < e.length; r++) {
      var n = e[r];
      n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n);
    }
  }

  function ag(t, e) {
    return (ag = Object.setPrototypeOf || function (t, e) {
      return t.__proto__ = e, t;
    })(t, e);
  }

  function ug(t) {
    var e = function () {
      if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
      if (Reflect.construct.sham) return !1;
      if ("function" == typeof Proxy) return !0;

      try {
        return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})), !0;
      } catch (t) {
        return !1;
      }
    }();

    return function () {
      var r,
          n = fg(t);

      if (e) {
        var o = fg(this).constructor;
        r = Reflect.construct(n, arguments, o);
      } else r = n.apply(this, arguments);

      return cg(this, r);
    };
  }

  function cg(t, e) {
    return !e || "object" !== ng(e) && "function" != typeof e ? sg(t) : e;
  }

  function sg(t) {
    if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return t;
  }

  function fg(t) {
    return (fg = Object.setPrototypeOf ? Object.getPrototypeOf : function (t) {
      return t.__proto__ || Object.getPrototypeOf(t);
    })(t);
  }

  function lg(t, e, r) {
    return e in t ? Object.defineProperty(t, e, {
      value: r,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : t[e] = r, t;
  }

  var hg = new (function (t) {
    !function (t, e) {
      if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
      t.prototype = Object.create(e && e.prototype, {
        constructor: {
          value: t,
          writable: !0,
          configurable: !0
        }
      }), e && ag(t, e);
    }(i, t);
    var e,
        r,
        n,
        o = ug(i);

    function i() {
      var t;
      og(this, i);

      for (var e = arguments.length, r = new Array(e), n = 0; n < e; n++) r[n] = arguments[n];

      return lg(sg(t = o.call.apply(o, [this].concat(r))), "_parentElement", document.querySelector(".recipe")), lg(sg(t), "_errorMessage", "We could not find that recipe. Please try another one."), lg(sg(t), "_successMessage", "placeholder"), t;
    }

    return e = i, (r = [{
      key: "addHandlerRender",
      value: function (t) {
        ["hashchange", "load"].forEach(function (e) {
          return window.addEventListener(e, t);
        });
      }
    }, {
      key: "addHandlerUpdateServings",
      value: function (t) {
        this._parentElement.addEventListener("click", function (e) {
          var r = e.target.closest(".btn--update-servings");

          if (r) {
            var n = +r.dataset.updateTo;
            +n > 0 && t(+n);
          }
        });
      }
    }, {
      key: "_generateMarkup",
      value: function () {
        var t = this;
        return '\n    <figure class="recipe__fig">\n      <img src="'.concat(this._data.image, '" alt="').concat(this._data.title, '" class="recipe__img" />\n      <h1 class="recipe__title">\n        <span>').concat(this._data.title, '</span>\n      </h1>\n    </figure>\n\n    <div class="recipe__details">\n      <div class="recipe__info">\n        <svg class="recipe__info-icon">\n          <use href="').concat(tg, '#icon-clock"></use>\n        </svg>\n        <span class="recipe__info-data recipe__info-data--minutes">').concat(this._data.cookingTime, '</span>\n        <span class="recipe__info-text">minutes</span>\n      </div>\n      <div class="recipe__info">\n        <svg class="recipe__info-icon">\n          <use href="').concat(tg, '#icon-users"></use>\n        </svg>\n        <span class="recipe__info-data recipe__info-data--people">').concat(this._data.servings, '</span>\n        <span class="recipe__info-text"> servings</span>\n\n        <div class="recipe__info-buttons">\n          <button class="btn--tiny btn--update-servings" data-update-to="').concat(this._data.servings - 1, '">\n            <svg>\n              <use href="').concat(tg, '#icon-minus-circle"></use>\n            </svg>\n          </button>\n          <button class="btn--tiny btn--update-servings" data-update-to="').concat(this._data.servings + 1, '">\n            <svg>\n              <use href="').concat(tg, '#icon-plus-circle"></use>\n            </svg>\n          </button>\n        </div>\n      </div>\n\n      <div class="recipe__user-generated">\n      </div>\n      <button class="btn--round">\n        <svg class="">\n          <use href="').concat(tg, '#icon-bookmark-fill"></use>\n        </svg>\n      </button>\n    </div>\n\n    <div class="recipe__ingredients">\n      <h2 class="heading--2">Recipe ingredients</h2>\n      <ul class="recipe__ingredient-list">\n        ').concat(this._data.ingredients.map(function (e) {
          return t._generateMarkupIngredient(e);
        }).join(""), '\n      </ul>\n    </div>\n\n    <div class="recipe__directions">\n      <h2 class="heading--2">How to cook it</h2>\n      <p class="recipe__directions-text">\n        This recipe was carefully designed and tested by\n        <span class="recipe__publisher">').concat(this._data.publisher, '</span>. Please check out\n        directions at their website.\n      </p>\n      <a\n        class="btn--small recipe__btn"\n        href="').concat(this._data.sourceUrl, '"\n        target="_blank"\n      >\n        <span>Directions</span>\n        <svg class="search__icon">\n          <use href="').concat(tg, '#icon-arrow-right"></use>\n        </svg>\n      </a>\n    </div>');
      }
    }, {
      key: "_generateMarkupIngredient",
      value: function (t) {
        return '\n    <li class="recipe__ingredient">\n      <svg class="recipe__icon">\n        <use href="'.concat(tg, '#icon-check"></use>\n      </svg>\n      <div class="recipe__quantity">').concat(t.quantity ? new rg(t.quantity).toString() : "", '</div>\n      <div class="recipe__description">\n        <span class="recipe__unit">').concat(t.unit, "</span>\n        ").concat(t.description, "\n      </div>\n    </li>\n    ");
      }
    }]) && ig(e.prototype, r), n && ig(e, n), i;
  }(eg))();

  function pg(t, e) {
    for (var r = 0; r < e.length; r++) {
      var n = e[r];
      n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n);
    }
  }

  var vg = new (function () {
    function t() {
      var e, r, n;
      !function (t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
      }(this, t), e = this, r = "_parentElement", n = document.querySelector(".search"), r in e ? Object.defineProperty(e, r, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
      }) : e[r] = n;
    }

    var e, r, n;
    return e = t, (r = [{
      key: "getQuery",
      value: function () {
        var t = this._parentElement.querySelector(".search__field").value;

        return this._clearInput(), t;
      }
    }, {
      key: "_clearInput",
      value: function () {
        document.querySelector(".search__field").value = "", document.querySelector(".search__field").blur();
      }
    }, {
      key: "addHandlerSearch",
      value: function (t) {
        this._parentElement.addEventListener("submit", function (e) {
          e.preventDefault(), t();
        });
      }
    }]) && pg(e.prototype, r), n && pg(e, n), t;
  }())();

  function dg(t) {
    return (dg = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
      return typeof t;
    } : function (t) {
      return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
    })(t);
  }

  function gg(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
  }

  function yg(t, e) {
    for (var r = 0; r < e.length; r++) {
      var n = e[r];
      n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n);
    }
  }

  function mg(t, e) {
    return (mg = Object.setPrototypeOf || function (t, e) {
      return t.__proto__ = e, t;
    })(t, e);
  }

  function bg(t) {
    var e = function () {
      if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
      if (Reflect.construct.sham) return !1;
      if ("function" == typeof Proxy) return !0;

      try {
        return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})), !0;
      } catch (t) {
        return !1;
      }
    }();

    return function () {
      var r,
          n = Eg(t);

      if (e) {
        var o = Eg(this).constructor;
        r = Reflect.construct(n, arguments, o);
      } else r = n.apply(this, arguments);

      return wg(this, r);
    };
  }

  function wg(t, e) {
    return !e || "object" !== dg(e) && "function" != typeof e ? Sg(t) : e;
  }

  function Sg(t) {
    if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return t;
  }

  function Eg(t) {
    return (Eg = Object.setPrototypeOf ? Object.getPrototypeOf : function (t) {
      return t.__proto__ || Object.getPrototypeOf(t);
    })(t);
  }

  function _g(t, e, r) {
    return e in t ? Object.defineProperty(t, e, {
      value: r,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : t[e] = r, t;
  }

  var xg = new (function (t) {
    !function (t, e) {
      if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
      t.prototype = Object.create(e && e.prototype, {
        constructor: {
          value: t,
          writable: !0,
          configurable: !0
        }
      }), e && mg(t, e);
    }(i, t);
    var e,
        r,
        n,
        o = bg(i);

    function i() {
      var t;
      gg(this, i);

      for (var e = arguments.length, r = new Array(e), n = 0; n < e; n++) r[n] = arguments[n];

      return _g(Sg(t = o.call.apply(o, [this].concat(r))), "_parentElement", document.querySelector(".results")), _g(Sg(t), "_errorMessage", "No recipes found for that query. Please try another search."), _g(Sg(t), "_message", ""), t;
    }

    return e = i, (r = [{
      key: "_generateMarkup",
      value: function () {
        return this._data.map(this._generateMarkupPreview).join("");
      }
    }, {
      key: "_generateMarkupPreview",
      value: function (t) {
        return '\n    <li class="preview">\n      <a class="preview__link" href="#'.concat(t.id, '">\n        <figure class="preview__fig">\n          <img src="').concat(t.image, '" alt="').concat(t.title, '" />\n        </figure>\n        <div class="preview__data">\n          <h4 class="preview__title">').concat(t.title, '</h4>\n          <p class="preview__publisher">').concat(t.publisher, "</p>\n        </div>\n      </a>\n    </li>\n  ");
      }
    }]) && yg(e.prototype, r), n && yg(e, n), i;
  }(eg))();

  function Ag(t) {
    return (Ag = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
      return typeof t;
    } : function (t) {
      return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
    })(t);
  }

  function Og(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
  }

  function Rg(t, e) {
    for (var r = 0; r < e.length; r++) {
      var n = e[r];
      n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n);
    }
  }

  function Tg(t, e) {
    return (Tg = Object.setPrototypeOf || function (t, e) {
      return t.__proto__ = e, t;
    })(t, e);
  }

  function jg(t) {
    var e = function () {
      if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
      if (Reflect.construct.sham) return !1;
      if ("function" == typeof Proxy) return !0;

      try {
        return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})), !0;
      } catch (t) {
        return !1;
      }
    }();

    return function () {
      var r,
          n = Ig(t);

      if (e) {
        var o = Ig(this).constructor;
        r = Reflect.construct(n, arguments, o);
      } else r = n.apply(this, arguments);

      return Mg(this, r);
    };
  }

  function Mg(t, e) {
    return !e || "object" !== Ag(e) && "function" != typeof e ? kg(t) : e;
  }

  function kg(t) {
    if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return t;
  }

  function Ig(t) {
    return (Ig = Object.setPrototypeOf ? Object.getPrototypeOf : function (t) {
      return t.__proto__ || Object.getPrototypeOf(t);
    })(t);
  }

  function Pg(t, e, r) {
    return e in t ? Object.defineProperty(t, e, {
      value: r,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : t[e] = r, t;
  }

  var Lg = new (function (t) {
    !function (t, e) {
      if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
      t.prototype = Object.create(e && e.prototype, {
        constructor: {
          value: t,
          writable: !0,
          configurable: !0
        }
      }), e && Tg(t, e);
    }(i, t);
    var e,
        r,
        n,
        o = jg(i);

    function i() {
      var t;
      Og(this, i);

      for (var e = arguments.length, r = new Array(e), n = 0; n < e; n++) r[n] = arguments[n];

      return Pg(kg(t = o.call.apply(o, [this].concat(r))), "_parentElement", document.querySelector(".pagination")), t;
    }

    return e = i, (r = [{
      key: "addHandlerClick",
      value: function (t) {
        this._parentElement.addEventListener("click", function (e) {
          var r = e.target.closest(".btn--inline");

          if (r) {
            var n = +r.dataset.goto;
            t(n);
          }
        });
      }
    }, {
      key: "_generateMarkup",
      value: function () {
        var t = this._data.page,
            e = Math.ceil(this._data.results.length / this._data.resultsPerPage);
        return 1 === t && e > 1 ? '\n        <button data-goto="'.concat(t + 1, '" class="btn--inline pagination__btn--next">\n          <span>Page ').concat(t + 1, '</span>\n          <svg class="search__icon">\n            <use href="').concat(tg, '#icon-arrow-right"></use>\n          </svg>\n        </button>\n      ') : 1 === t && 1 === e ? "" : t === e && e > 1 ? '\n        <button data-goto="'.concat(t - 1, '" class="btn--inline pagination__btn--prev">\n          <svg class="search__icon">\n            <use href="').concat(tg, '#icon-arrow-left"></use>\n          </svg>\n          <span>Page ').concat(t - 1, "</span>\n        </button>\n      ") : '\n      <button data-goto="'.concat(t - 1, '" class="btn--inline pagination__btn--prev">\n        <svg class="search__icon">\n          <use href="').concat(tg, '#icon-arrow-left"></use>\n        </svg>\n        <span>Page ').concat(t - 1, '</span>\n      </button>\n      <button data-goto="').concat(t + 1, '" class="btn--inline pagination__btn--next">\n        <span>Page ').concat(t + 1, '</span>\n        <svg class="search__icon">\n          <use href="').concat(tg, '#icon-arrow-right"></use>\n        </svg>\n      </button>\n    ');
      }
    }]) && Rg(e.prototype, r), n && Rg(e, n), i;
  }(eg))();

  function Fg(t, e, r, n, o, i, a) {
    try {
      var u = t[i](a),
          c = u.value;
    } catch (t) {
      return void r(t);
    }

    u.done ? e(c) : Promise.resolve(c).then(n, o);
  }

  function Ng(t) {
    return function () {
      var e = this,
          r = arguments;
      return new Promise(function (n, o) {
        var i = t.apply(e, r);

        function a(t) {
          Fg(i, n, o, a, u, "next", t);
        }

        function u(t) {
          Fg(i, n, o, a, u, "throw", t);
        }

        a(void 0);
      });
    };
  }

  var Ug = function () {
    var t = Ng(regeneratorRuntime.mark(function t() {
      var e;
      return regeneratorRuntime.wrap(function (t) {
        for (;;) switch (t.prev = t.next) {
          case 0:
            if (t.prev = 0, e = window.location.hash.slice(1)) {
              t.next = 4;
              break;
            }

            return t.abrupt("return");

          case 4:
            return hg.renderSpinner(), t.next = 7, zd(e);

          case 7:
            hg.render(qd.recipe), t.next = 13;
            break;

          case 10:
            t.prev = 10, t.t0 = t.catch(0), hg.renderError();

          case 13:
          case "end":
            return t.stop();
        }
      }, t, null, [[0, 10]]);
    }));
    return function () {
      return t.apply(this, arguments);
    };
  }(),
      Cg = function () {
    var t = Ng(regeneratorRuntime.mark(function t() {
      var e;
      return regeneratorRuntime.wrap(function (t) {
        for (;;) switch (t.prev = t.next) {
          case 0:
            if (t.prev = 0, xg.renderSpinner(), e = vg.getQuery()) {
              t.next = 5;
              break;
            }

            return t.abrupt("return");

          case 5:
            return t.next = 7, Dd(e);

          case 7:
            xg.render(Wd()), Lg.render(qd.search), t.next = 14;
            break;

          case 11:
            t.prev = 11, t.t0 = t.catch(0), console.log("My error - controller: ".concat(t.t0));

          case 14:
          case "end":
            return t.stop();
        }
      }, t, null, [[0, 11]]);
    }));
    return function () {
      return t.apply(this, arguments);
    };
  }(),
      Bg = function (t) {
    xg.render(Wd(t)), Lg.render(qd.search);
  },
      qg = function (t) {
    !function (t) {
      qd.recipe.ingredients.forEach(function (e) {
        e.quantity = e.quantity * t / qd.recipe.servings;
      }), console.log(t), qd.recipe.servings = t;
    }(t), hg.update(qd.recipe);
  };

  hg.addHandlerRender(Ug), hg.addHandlerUpdateServings(qg), vg.addHandlerSearch(Cg), Lg.addHandlerClick(Bg), document.querySelector(".header__logo").addEventListener("click", function (t) {
    return window.location = "";
  });
}();
},{}]},{},["abb6324e68c031a7738b2ab6a87b160f","70ec6b1ca8ee51b2c063b7886425f463"], null)

//# sourceMappingURL=controller.751a1917.d9dc4ebc.js.map
