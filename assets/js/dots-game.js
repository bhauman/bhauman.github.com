var COMPILED = !0, goog = goog || {};
goog.global = this;
goog.DEBUG = !0;
goog.LOCALE = "en";
goog.provide = function(a) {
  if(!COMPILED) {
    if(goog.isProvided_(a)) {
      throw Error('Namespace "' + a + '" already declared.');
    }
    delete goog.implicitNamespaces_[a];
    for(var b = a;(b = b.substring(0, b.lastIndexOf("."))) && !goog.getObjectByName(b);) {
      goog.implicitNamespaces_[b] = !0
    }
  }
  goog.exportPath_(a)
};
goog.setTestOnly = function(a) {
  if(COMPILED && !goog.DEBUG) {
    throw a = a || "", Error("Importing test-only code into non-debug environment" + a ? ": " + a : ".");
  }
};
COMPILED || (goog.isProvided_ = function(a) {
  return!goog.implicitNamespaces_[a] && !!goog.getObjectByName(a)
}, goog.implicitNamespaces_ = {});
goog.exportPath_ = function(a, b, c) {
  a = a.split(".");
  c = c || goog.global;
  !(a[0] in c) && c.execScript && c.execScript("var " + a[0]);
  for(var d;a.length && (d = a.shift());) {
    !a.length && goog.isDef(b) ? c[d] = b : c = c[d] ? c[d] : c[d] = {}
  }
};
goog.getObjectByName = function(a, b) {
  for(var c = a.split("."), d = b || goog.global, e;e = c.shift();) {
    if(goog.isDefAndNotNull(d[e])) {
      d = d[e]
    }else {
      return null
    }
  }
  return d
};
goog.globalize = function(a, b) {
  var c = b || goog.global, d;
  for(d in a) {
    c[d] = a[d]
  }
};
goog.addDependency = function(a, b, c) {
  if(!COMPILED) {
    for(var d, a = a.replace(/\\/g, "/"), e = goog.dependencies_, f = 0;d = b[f];f++) {
      e.nameToPath[d] = a, a in e.pathToNames || (e.pathToNames[a] = {}), e.pathToNames[a][d] = !0
    }
    for(d = 0;b = c[d];d++) {
      a in e.requires || (e.requires[a] = {}), e.requires[a][b] = !0
    }
  }
};
goog.ENABLE_DEBUG_LOADER = !0;
goog.require = function(a) {
  if(!COMPILED && !goog.isProvided_(a)) {
    if(goog.ENABLE_DEBUG_LOADER) {
      var b = goog.getPathFromDeps_(a);
      if(b) {
        goog.included_[b] = !0;
        goog.writeScripts_();
        return
      }
    }
    a = "goog.require could not find: " + a;
    goog.global.console && goog.global.console.error(a);
    throw Error(a);
  }
};
goog.basePath = "";
goog.nullFunction = function() {
};
goog.identityFunction = function(a) {
  return a
};
goog.abstractMethod = function() {
  throw Error("unimplemented abstract method");
};
goog.addSingletonGetter = function(a) {
  a.getInstance = function() {
    if(a.instance_) {
      return a.instance_
    }
    goog.DEBUG && (goog.instantiatedSingletons_[goog.instantiatedSingletons_.length] = a);
    return a.instance_ = new a
  }
};
goog.instantiatedSingletons_ = [];
!COMPILED && goog.ENABLE_DEBUG_LOADER && (goog.included_ = {}, goog.dependencies_ = {pathToNames:{}, nameToPath:{}, requires:{}, visited:{}, written:{}}, goog.inHtmlDocument_ = function() {
  var a = goog.global.document;
  return"undefined" != typeof a && "write" in a
}, goog.findBasePath_ = function() {
  if(goog.global.CLOSURE_BASE_PATH) {
    goog.basePath = goog.global.CLOSURE_BASE_PATH
  }else {
    if(goog.inHtmlDocument_()) {
      for(var a = goog.global.document.getElementsByTagName("script"), b = a.length - 1;0 <= b;--b) {
        var c = a[b].src, d = c.lastIndexOf("?"), d = -1 == d ? c.length : d;
        if("base.js" == c.substr(d - 7, 7)) {
          goog.basePath = c.substr(0, d - 7);
          break
        }
      }
    }
  }
}, goog.importScript_ = function(a) {
  var b = goog.global.CLOSURE_IMPORT_SCRIPT || goog.writeScriptTag_;
  !goog.dependencies_.written[a] && b(a) && (goog.dependencies_.written[a] = !0)
}, goog.writeScriptTag_ = function(a) {
  return goog.inHtmlDocument_() ? (goog.global.document.write('<script type="text/javascript" src="' + a + '"><\/script>'), !0) : !1
}, goog.writeScripts_ = function() {
  function a(e) {
    if(!(e in d.written)) {
      if(!(e in d.visited) && (d.visited[e] = !0, e in d.requires)) {
        for(var g in d.requires[e]) {
          if(!goog.isProvided_(g)) {
            if(g in d.nameToPath) {
              a(d.nameToPath[g])
            }else {
              throw Error("Undefined nameToPath for " + g);
            }
          }
        }
      }
      e in c || (c[e] = !0, b.push(e))
    }
  }
  var b = [], c = {}, d = goog.dependencies_, e;
  for(e in goog.included_) {
    d.written[e] || a(e)
  }
  for(e = 0;e < b.length;e++) {
    if(b[e]) {
      goog.importScript_(goog.basePath + b[e])
    }else {
      throw Error("Undefined script input");
    }
  }
}, goog.getPathFromDeps_ = function(a) {
  return a in goog.dependencies_.nameToPath ? goog.dependencies_.nameToPath[a] : null
}, goog.findBasePath_(), goog.global.CLOSURE_NO_DEPS || goog.importScript_(goog.basePath + "deps.js"));
goog.typeOf = function(a) {
  var b = typeof a;
  if("object" == b) {
    if(a) {
      if(a instanceof Array) {
        return"array"
      }
      if(a instanceof Object) {
        return b
      }
      var c = Object.prototype.toString.call(a);
      if("[object Window]" == c) {
        return"object"
      }
      if("[object Array]" == c || "number" == typeof a.length && "undefined" != typeof a.splice && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("splice")) {
        return"array"
      }
      if("[object Function]" == c || "undefined" != typeof a.call && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("call")) {
        return"function"
      }
    }else {
      return"null"
    }
  }else {
    if("function" == b && "undefined" == typeof a.call) {
      return"object"
    }
  }
  return b
};
goog.isDef = function(a) {
  return void 0 !== a
};
goog.isNull = function(a) {
  return null === a
};
goog.isDefAndNotNull = function(a) {
  return null != a
};
goog.isArray = function(a) {
  return"array" == goog.typeOf(a)
};
goog.isArrayLike = function(a) {
  var b = goog.typeOf(a);
  return"array" == b || "object" == b && "number" == typeof a.length
};
goog.isDateLike = function(a) {
  return goog.isObject(a) && "function" == typeof a.getFullYear
};
goog.isString = function(a) {
  return"string" == typeof a
};
goog.isBoolean = function(a) {
  return"boolean" == typeof a
};
goog.isNumber = function(a) {
  return"number" == typeof a
};
goog.isFunction = function(a) {
  return"function" == goog.typeOf(a)
};
goog.isObject = function(a) {
  var b = typeof a;
  return"object" == b && null != a || "function" == b
};
goog.getUid = function(a) {
  return a[goog.UID_PROPERTY_] || (a[goog.UID_PROPERTY_] = ++goog.uidCounter_)
};
goog.removeUid = function(a) {
  "removeAttribute" in a && a.removeAttribute(goog.UID_PROPERTY_);
  try {
    delete a[goog.UID_PROPERTY_]
  }catch(b) {
  }
};
goog.UID_PROPERTY_ = "closure_uid_" + Math.floor(2147483648 * Math.random()).toString(36);
goog.uidCounter_ = 0;
goog.getHashCode = goog.getUid;
goog.removeHashCode = goog.removeUid;
goog.cloneObject = function(a) {
  var b = goog.typeOf(a);
  if("object" == b || "array" == b) {
    if(a.clone) {
      return a.clone()
    }
    var b = "array" == b ? [] : {}, c;
    for(c in a) {
      b[c] = goog.cloneObject(a[c])
    }
    return b
  }
  return a
};
goog.bindNative_ = function(a, b, c) {
  return a.call.apply(a.bind, arguments)
};
goog.bindJs_ = function(a, b, c) {
  if(!a) {
    throw Error();
  }
  if(2 < arguments.length) {
    var d = Array.prototype.slice.call(arguments, 2);
    return function() {
      var c = Array.prototype.slice.call(arguments);
      Array.prototype.unshift.apply(c, d);
      return a.apply(b, c)
    }
  }
  return function() {
    return a.apply(b, arguments)
  }
};
goog.bind = function(a, b, c) {
  goog.bind = Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? goog.bindNative_ : goog.bindJs_;
  return goog.bind.apply(null, arguments)
};
goog.partial = function(a, b) {
  var c = Array.prototype.slice.call(arguments, 1);
  return function() {
    var b = Array.prototype.slice.call(arguments);
    b.unshift.apply(b, c);
    return a.apply(this, b)
  }
};
goog.mixin = function(a, b) {
  for(var c in b) {
    a[c] = b[c]
  }
};
goog.now = Date.now || function() {
  return+new Date
};
goog.globalEval = function(a) {
  if(goog.global.execScript) {
    goog.global.execScript(a, "JavaScript")
  }else {
    if(goog.global.eval) {
      if(null == goog.evalWorksForGlobals_ && (goog.global.eval("var _et_ = 1;"), "undefined" != typeof goog.global._et_ ? (delete goog.global._et_, goog.evalWorksForGlobals_ = !0) : goog.evalWorksForGlobals_ = !1), goog.evalWorksForGlobals_) {
        goog.global.eval(a)
      }else {
        var b = goog.global.document, c = b.createElement("script");
        c.type = "text/javascript";
        c.defer = !1;
        c.appendChild(b.createTextNode(a));
        b.body.appendChild(c);
        b.body.removeChild(c)
      }
    }else {
      throw Error("goog.globalEval not available");
    }
  }
};
goog.evalWorksForGlobals_ = null;
goog.getCssName = function(a, b) {
  var c = function(a) {
    return goog.cssNameMapping_[a] || a
  }, d = function(a) {
    for(var a = a.split("-"), b = [], d = 0;d < a.length;d++) {
      b.push(c(a[d]))
    }
    return b.join("-")
  }, d = goog.cssNameMapping_ ? "BY_WHOLE" == goog.cssNameMappingStyle_ ? c : d : function(a) {
    return a
  };
  return b ? a + "-" + d(b) : d(a)
};
goog.setCssNameMapping = function(a, b) {
  goog.cssNameMapping_ = a;
  goog.cssNameMappingStyle_ = b
};
!COMPILED && goog.global.CLOSURE_CSS_NAME_MAPPING && (goog.cssNameMapping_ = goog.global.CLOSURE_CSS_NAME_MAPPING);
goog.getMsg = function(a, b) {
  var c = b || {}, d;
  for(d in c) {
    var e = ("" + c[d]).replace(/\$/g, "$$$$"), a = a.replace(RegExp("\\{\\$" + d + "\\}", "gi"), e)
  }
  return a
};
goog.exportSymbol = function(a, b, c) {
  goog.exportPath_(a, b, c)
};
goog.exportProperty = function(a, b, c) {
  a[b] = c
};
goog.inherits = function(a, b) {
  function c() {
  }
  c.prototype = b.prototype;
  a.superClass_ = b.prototype;
  a.prototype = new c;
  a.prototype.constructor = a
};
goog.base = function(a, b, c) {
  var d = arguments.callee.caller;
  if(d.superClass_) {
    return d.superClass_.constructor.apply(a, Array.prototype.slice.call(arguments, 1))
  }
  for(var e = Array.prototype.slice.call(arguments, 2), f = !1, g = a.constructor;g;g = g.superClass_ && g.superClass_.constructor) {
    if(g.prototype[b] === d) {
      f = !0
    }else {
      if(f) {
        return g.prototype[b].apply(a, e)
      }
    }
  }
  if(a[b] === d) {
    return a.constructor.prototype[b].apply(a, e)
  }
  throw Error("goog.base called from a method of one name to a method of a different name");
};
goog.scope = function(a) {
  a.call(goog.global)
};
goog.debug = {};
goog.debug.Error = function(a) {
  Error.captureStackTrace ? Error.captureStackTrace(this, goog.debug.Error) : this.stack = Error().stack || "";
  a && (this.message = String(a))
};
goog.inherits(goog.debug.Error, Error);
goog.debug.Error.prototype.name = "CustomError";
goog.string = {};
goog.string.Unicode = {NBSP:"\u00a0"};
goog.string.startsWith = function(a, b) {
  return 0 == a.lastIndexOf(b, 0)
};
goog.string.endsWith = function(a, b) {
  var c = a.length - b.length;
  return 0 <= c && a.indexOf(b, c) == c
};
goog.string.caseInsensitiveStartsWith = function(a, b) {
  return 0 == goog.string.caseInsensitiveCompare(b, a.substr(0, b.length))
};
goog.string.caseInsensitiveEndsWith = function(a, b) {
  return 0 == goog.string.caseInsensitiveCompare(b, a.substr(a.length - b.length, b.length))
};
goog.string.subs = function(a, b) {
  for(var c = 1;c < arguments.length;c++) {
    var d = String(arguments[c]).replace(/\$/g, "$$$$"), a = a.replace(/\%s/, d)
  }
  return a
};
goog.string.collapseWhitespace = function(a) {
  return a.replace(/[\s\xa0]+/g, " ").replace(/^\s+|\s+$/g, "")
};
goog.string.isEmpty = function(a) {
  return/^[\s\xa0]*$/.test(a)
};
goog.string.isEmptySafe = function(a) {
  return goog.string.isEmpty(goog.string.makeSafe(a))
};
goog.string.isBreakingWhitespace = function(a) {
  return!/[^\t\n\r ]/.test(a)
};
goog.string.isAlpha = function(a) {
  return!/[^a-zA-Z]/.test(a)
};
goog.string.isNumeric = function(a) {
  return!/[^0-9]/.test(a)
};
goog.string.isAlphaNumeric = function(a) {
  return!/[^a-zA-Z0-9]/.test(a)
};
goog.string.isSpace = function(a) {
  return" " == a
};
goog.string.isUnicodeChar = function(a) {
  return 1 == a.length && " " <= a && "~" >= a || "\u0080" <= a && "\ufffd" >= a
};
goog.string.stripNewlines = function(a) {
  return a.replace(/(\r\n|\r|\n)+/g, " ")
};
goog.string.canonicalizeNewlines = function(a) {
  return a.replace(/(\r\n|\r|\n)/g, "\n")
};
goog.string.normalizeWhitespace = function(a) {
  return a.replace(/\xa0|\s/g, " ")
};
goog.string.normalizeSpaces = function(a) {
  return a.replace(/\xa0|[ \t]+/g, " ")
};
goog.string.collapseBreakingSpaces = function(a) {
  return a.replace(/[\t\r\n ]+/g, " ").replace(/^[\t\r\n ]+|[\t\r\n ]+$/g, "")
};
goog.string.trim = function(a) {
  return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g, "")
};
goog.string.trimLeft = function(a) {
  return a.replace(/^[\s\xa0]+/, "")
};
goog.string.trimRight = function(a) {
  return a.replace(/[\s\xa0]+$/, "")
};
goog.string.caseInsensitiveCompare = function(a, b) {
  var c = String(a).toLowerCase(), d = String(b).toLowerCase();
  return c < d ? -1 : c == d ? 0 : 1
};
goog.string.numerateCompareRegExp_ = /(\.\d+)|(\d+)|(\D+)/g;
goog.string.numerateCompare = function(a, b) {
  if(a == b) {
    return 0
  }
  if(!a) {
    return-1
  }
  if(!b) {
    return 1
  }
  for(var c = a.toLowerCase().match(goog.string.numerateCompareRegExp_), d = b.toLowerCase().match(goog.string.numerateCompareRegExp_), e = Math.min(c.length, d.length), f = 0;f < e;f++) {
    var g = c[f], h = d[f];
    if(g != h) {
      return c = parseInt(g, 10), !isNaN(c) && (d = parseInt(h, 10), !isNaN(d) && c - d) ? c - d : g < h ? -1 : 1
    }
  }
  return c.length != d.length ? c.length - d.length : a < b ? -1 : 1
};
goog.string.urlEncode = function(a) {
  return encodeURIComponent(String(a))
};
goog.string.urlDecode = function(a) {
  return decodeURIComponent(a.replace(/\+/g, " "))
};
goog.string.newLineToBr = function(a, b) {
  return a.replace(/(\r\n|\r|\n)/g, b ? "<br />" : "<br>")
};
goog.string.htmlEscape = function(a, b) {
  if(b) {
    return a.replace(goog.string.amperRe_, "&amp;").replace(goog.string.ltRe_, "&lt;").replace(goog.string.gtRe_, "&gt;").replace(goog.string.quotRe_, "&quot;")
  }
  if(!goog.string.allRe_.test(a)) {
    return a
  }
  -1 != a.indexOf("&") && (a = a.replace(goog.string.amperRe_, "&amp;"));
  -1 != a.indexOf("<") && (a = a.replace(goog.string.ltRe_, "&lt;"));
  -1 != a.indexOf(">") && (a = a.replace(goog.string.gtRe_, "&gt;"));
  -1 != a.indexOf('"') && (a = a.replace(goog.string.quotRe_, "&quot;"));
  return a
};
goog.string.amperRe_ = /&/g;
goog.string.ltRe_ = /</g;
goog.string.gtRe_ = />/g;
goog.string.quotRe_ = /\"/g;
goog.string.allRe_ = /[&<>\"]/;
goog.string.unescapeEntities = function(a) {
  return goog.string.contains(a, "&") ? "document" in goog.global ? goog.string.unescapeEntitiesUsingDom_(a) : goog.string.unescapePureXmlEntities_(a) : a
};
goog.string.unescapeEntitiesUsingDom_ = function(a) {
  var b = {"&amp;":"&", "&lt;":"<", "&gt;":">", "&quot;":'"'}, c = document.createElement("div");
  return a.replace(goog.string.HTML_ENTITY_PATTERN_, function(a, e) {
    var f = b[a];
    if(f) {
      return f
    }
    if("#" == e.charAt(0)) {
      var g = Number("0" + e.substr(1));
      isNaN(g) || (f = String.fromCharCode(g))
    }
    f || (c.innerHTML = a + " ", f = c.firstChild.nodeValue.slice(0, -1));
    return b[a] = f
  })
};
goog.string.unescapePureXmlEntities_ = function(a) {
  return a.replace(/&([^;]+);/g, function(a, c) {
    switch(c) {
      case "amp":
        return"&";
      case "lt":
        return"<";
      case "gt":
        return">";
      case "quot":
        return'"';
      default:
        if("#" == c.charAt(0)) {
          var d = Number("0" + c.substr(1));
          if(!isNaN(d)) {
            return String.fromCharCode(d)
          }
        }
        return a
    }
  })
};
goog.string.HTML_ENTITY_PATTERN_ = /&([^;\s<&]+);?/g;
goog.string.whitespaceEscape = function(a, b) {
  return goog.string.newLineToBr(a.replace(/  /g, " &#160;"), b)
};
goog.string.stripQuotes = function(a, b) {
  for(var c = b.length, d = 0;d < c;d++) {
    var e = 1 == c ? b : b.charAt(d);
    if(a.charAt(0) == e && a.charAt(a.length - 1) == e) {
      return a.substring(1, a.length - 1)
    }
  }
  return a
};
goog.string.truncate = function(a, b, c) {
  c && (a = goog.string.unescapeEntities(a));
  a.length > b && (a = a.substring(0, b - 3) + "...");
  c && (a = goog.string.htmlEscape(a));
  return a
};
goog.string.truncateMiddle = function(a, b, c, d) {
  c && (a = goog.string.unescapeEntities(a));
  if(d && a.length > b) {
    d > b && (d = b);
    var e = a.length - d, a = a.substring(0, b - d) + "..." + a.substring(e)
  }else {
    a.length > b && (d = Math.floor(b / 2), e = a.length - d, a = a.substring(0, d + b % 2) + "..." + a.substring(e))
  }
  c && (a = goog.string.htmlEscape(a));
  return a
};
goog.string.specialEscapeChars_ = {"\x00":"\\0", "\b":"\\b", "\f":"\\f", "\n":"\\n", "\r":"\\r", "\t":"\\t", "\x0B":"\\x0B", '"':'\\"', "\\":"\\\\"};
goog.string.jsEscapeCache_ = {"'":"\\'"};
goog.string.quote = function(a) {
  a = String(a);
  if(a.quote) {
    return a.quote()
  }
  for(var b = ['"'], c = 0;c < a.length;c++) {
    var d = a.charAt(c), e = d.charCodeAt(0);
    b[c + 1] = goog.string.specialEscapeChars_[d] || (31 < e && 127 > e ? d : goog.string.escapeChar(d))
  }
  b.push('"');
  return b.join("")
};
goog.string.escapeString = function(a) {
  for(var b = [], c = 0;c < a.length;c++) {
    b[c] = goog.string.escapeChar(a.charAt(c))
  }
  return b.join("")
};
goog.string.escapeChar = function(a) {
  if(a in goog.string.jsEscapeCache_) {
    return goog.string.jsEscapeCache_[a]
  }
  if(a in goog.string.specialEscapeChars_) {
    return goog.string.jsEscapeCache_[a] = goog.string.specialEscapeChars_[a]
  }
  var b = a, c = a.charCodeAt(0);
  if(31 < c && 127 > c) {
    b = a
  }else {
    if(256 > c) {
      if(b = "\\x", 16 > c || 256 < c) {
        b += "0"
      }
    }else {
      b = "\\u", 4096 > c && (b += "0")
    }
    b += c.toString(16).toUpperCase()
  }
  return goog.string.jsEscapeCache_[a] = b
};
goog.string.toMap = function(a) {
  for(var b = {}, c = 0;c < a.length;c++) {
    b[a.charAt(c)] = !0
  }
  return b
};
goog.string.contains = function(a, b) {
  return-1 != a.indexOf(b)
};
goog.string.countOf = function(a, b) {
  return a && b ? a.split(b).length - 1 : 0
};
goog.string.removeAt = function(a, b, c) {
  var d = a;
  0 <= b && (b < a.length && 0 < c) && (d = a.substr(0, b) + a.substr(b + c, a.length - b - c));
  return d
};
goog.string.remove = function(a, b) {
  var c = RegExp(goog.string.regExpEscape(b), "");
  return a.replace(c, "")
};
goog.string.removeAll = function(a, b) {
  var c = RegExp(goog.string.regExpEscape(b), "g");
  return a.replace(c, "")
};
goog.string.regExpEscape = function(a) {
  return String(a).replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08")
};
goog.string.repeat = function(a, b) {
  return Array(b + 1).join(a)
};
goog.string.padNumber = function(a, b, c) {
  a = goog.isDef(c) ? a.toFixed(c) : String(a);
  c = a.indexOf(".");
  -1 == c && (c = a.length);
  return goog.string.repeat("0", Math.max(0, b - c)) + a
};
goog.string.makeSafe = function(a) {
  return null == a ? "" : String(a)
};
goog.string.buildString = function(a) {
  return Array.prototype.join.call(arguments, "")
};
goog.string.getRandomString = function() {
  return Math.floor(2147483648 * Math.random()).toString(36) + Math.abs(Math.floor(2147483648 * Math.random()) ^ goog.now()).toString(36)
};
goog.string.compareVersions = function(a, b) {
  for(var c = 0, d = goog.string.trim(String(a)).split("."), e = goog.string.trim(String(b)).split("."), f = Math.max(d.length, e.length), g = 0;0 == c && g < f;g++) {
    var h = d[g] || "", i = e[g] || "", j = RegExp("(\\d*)(\\D*)", "g"), k = RegExp("(\\d*)(\\D*)", "g");
    do {
      var m = j.exec(h) || ["", "", ""], l = k.exec(i) || ["", "", ""];
      if(0 == m[0].length && 0 == l[0].length) {
        break
      }
      var c = 0 == m[1].length ? 0 : parseInt(m[1], 10), n = 0 == l[1].length ? 0 : parseInt(l[1], 10), c = goog.string.compareElements_(c, n) || goog.string.compareElements_(0 == m[2].length, 0 == l[2].length) || goog.string.compareElements_(m[2], l[2])
    }while(0 == c)
  }
  return c
};
goog.string.compareElements_ = function(a, b) {
  return a < b ? -1 : a > b ? 1 : 0
};
goog.string.HASHCODE_MAX_ = 4294967296;
goog.string.hashCode = function(a) {
  for(var b = 0, c = 0;c < a.length;++c) {
    b = 31 * b + a.charCodeAt(c), b %= goog.string.HASHCODE_MAX_
  }
  return b
};
goog.string.uniqueStringCounter_ = 2147483648 * Math.random() | 0;
goog.string.createUniqueString = function() {
  return"goog_" + goog.string.uniqueStringCounter_++
};
goog.string.toNumber = function(a) {
  var b = Number(a);
  return 0 == b && goog.string.isEmpty(a) ? NaN : b
};
goog.string.toCamelCase = function(a) {
  return String(a).replace(/\-([a-z])/g, function(a, c) {
    return c.toUpperCase()
  })
};
goog.string.toSelectorCase = function(a) {
  return String(a).replace(/([A-Z])/g, "-$1").toLowerCase()
};
goog.string.toTitleCase = function(a, b) {
  var c = goog.isString(b) ? goog.string.regExpEscape(b) : "\\s";
  return a.replace(RegExp("(^" + (c ? "|[" + c + "]+" : "") + ")([a-z])", "g"), function(a, b, c) {
    return b + c.toUpperCase()
  })
};
goog.string.parseInt = function(a) {
  isFinite(a) && (a = String(a));
  return goog.isString(a) ? /^\s*-?0x/i.test(a) ? parseInt(a, 16) : parseInt(a, 10) : NaN
};
goog.asserts = {};
goog.asserts.ENABLE_ASSERTS = goog.DEBUG;
goog.asserts.AssertionError = function(a, b) {
  b.unshift(a);
  goog.debug.Error.call(this, goog.string.subs.apply(null, b));
  b.shift();
  this.messagePattern = a
};
goog.inherits(goog.asserts.AssertionError, goog.debug.Error);
goog.asserts.AssertionError.prototype.name = "AssertionError";
goog.asserts.doAssertFailure_ = function(a, b, c, d) {
  var e = "Assertion failed";
  if(c) {
    var e = e + (": " + c), f = d
  }else {
    a && (e += ": " + a, f = b)
  }
  throw new goog.asserts.AssertionError("" + e, f || []);
};
goog.asserts.assert = function(a, b, c) {
  goog.asserts.ENABLE_ASSERTS && !a && goog.asserts.doAssertFailure_("", null, b, Array.prototype.slice.call(arguments, 2));
  return a
};
goog.asserts.fail = function(a, b) {
  if(goog.asserts.ENABLE_ASSERTS) {
    throw new goog.asserts.AssertionError("Failure" + (a ? ": " + a : ""), Array.prototype.slice.call(arguments, 1));
  }
};
goog.asserts.assertNumber = function(a, b, c) {
  goog.asserts.ENABLE_ASSERTS && !goog.isNumber(a) && goog.asserts.doAssertFailure_("Expected number but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
  return a
};
goog.asserts.assertString = function(a, b, c) {
  goog.asserts.ENABLE_ASSERTS && !goog.isString(a) && goog.asserts.doAssertFailure_("Expected string but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
  return a
};
goog.asserts.assertFunction = function(a, b, c) {
  goog.asserts.ENABLE_ASSERTS && !goog.isFunction(a) && goog.asserts.doAssertFailure_("Expected function but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
  return a
};
goog.asserts.assertObject = function(a, b, c) {
  goog.asserts.ENABLE_ASSERTS && !goog.isObject(a) && goog.asserts.doAssertFailure_("Expected object but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
  return a
};
goog.asserts.assertArray = function(a, b, c) {
  goog.asserts.ENABLE_ASSERTS && !goog.isArray(a) && goog.asserts.doAssertFailure_("Expected array but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
  return a
};
goog.asserts.assertBoolean = function(a, b, c) {
  goog.asserts.ENABLE_ASSERTS && !goog.isBoolean(a) && goog.asserts.doAssertFailure_("Expected boolean but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
  return a
};
goog.asserts.assertInstanceof = function(a, b, c, d) {
  goog.asserts.ENABLE_ASSERTS && !(a instanceof b) && goog.asserts.doAssertFailure_("instanceof check failed.", null, c, Array.prototype.slice.call(arguments, 3));
  return a
};
goog.array = {};
goog.NATIVE_ARRAY_PROTOTYPES = !0;
goog.array.peek = function(a) {
  return a[a.length - 1]
};
goog.array.ARRAY_PROTOTYPE_ = Array.prototype;
goog.array.indexOf = goog.NATIVE_ARRAY_PROTOTYPES && goog.array.ARRAY_PROTOTYPE_.indexOf ? function(a, b, c) {
  goog.asserts.assert(null != a.length);
  return goog.array.ARRAY_PROTOTYPE_.indexOf.call(a, b, c)
} : function(a, b, c) {
  c = null == c ? 0 : 0 > c ? Math.max(0, a.length + c) : c;
  if(goog.isString(a)) {
    return!goog.isString(b) || 1 != b.length ? -1 : a.indexOf(b, c)
  }
  for(;c < a.length;c++) {
    if(c in a && a[c] === b) {
      return c
    }
  }
  return-1
};
goog.array.lastIndexOf = goog.NATIVE_ARRAY_PROTOTYPES && goog.array.ARRAY_PROTOTYPE_.lastIndexOf ? function(a, b, c) {
  goog.asserts.assert(null != a.length);
  return goog.array.ARRAY_PROTOTYPE_.lastIndexOf.call(a, b, null == c ? a.length - 1 : c)
} : function(a, b, c) {
  c = null == c ? a.length - 1 : c;
  0 > c && (c = Math.max(0, a.length + c));
  if(goog.isString(a)) {
    return!goog.isString(b) || 1 != b.length ? -1 : a.lastIndexOf(b, c)
  }
  for(;0 <= c;c--) {
    if(c in a && a[c] === b) {
      return c
    }
  }
  return-1
};
goog.array.forEach = goog.NATIVE_ARRAY_PROTOTYPES && goog.array.ARRAY_PROTOTYPE_.forEach ? function(a, b, c) {
  goog.asserts.assert(null != a.length);
  goog.array.ARRAY_PROTOTYPE_.forEach.call(a, b, c)
} : function(a, b, c) {
  for(var d = a.length, e = goog.isString(a) ? a.split("") : a, f = 0;f < d;f++) {
    f in e && b.call(c, e[f], f, a)
  }
};
goog.array.forEachRight = function(a, b, c) {
  for(var d = a.length, e = goog.isString(a) ? a.split("") : a, d = d - 1;0 <= d;--d) {
    d in e && b.call(c, e[d], d, a)
  }
};
goog.array.filter = goog.NATIVE_ARRAY_PROTOTYPES && goog.array.ARRAY_PROTOTYPE_.filter ? function(a, b, c) {
  goog.asserts.assert(null != a.length);
  return goog.array.ARRAY_PROTOTYPE_.filter.call(a, b, c)
} : function(a, b, c) {
  for(var d = a.length, e = [], f = 0, g = goog.isString(a) ? a.split("") : a, h = 0;h < d;h++) {
    if(h in g) {
      var i = g[h];
      b.call(c, i, h, a) && (e[f++] = i)
    }
  }
  return e
};
goog.array.map = goog.NATIVE_ARRAY_PROTOTYPES && goog.array.ARRAY_PROTOTYPE_.map ? function(a, b, c) {
  goog.asserts.assert(null != a.length);
  return goog.array.ARRAY_PROTOTYPE_.map.call(a, b, c)
} : function(a, b, c) {
  for(var d = a.length, e = Array(d), f = goog.isString(a) ? a.split("") : a, g = 0;g < d;g++) {
    g in f && (e[g] = b.call(c, f[g], g, a))
  }
  return e
};
goog.array.reduce = function(a, b, c, d) {
  if(a.reduce) {
    return d ? a.reduce(goog.bind(b, d), c) : a.reduce(b, c)
  }
  var e = c;
  goog.array.forEach(a, function(c, g) {
    e = b.call(d, e, c, g, a)
  });
  return e
};
goog.array.reduceRight = function(a, b, c, d) {
  if(a.reduceRight) {
    return d ? a.reduceRight(goog.bind(b, d), c) : a.reduceRight(b, c)
  }
  var e = c;
  goog.array.forEachRight(a, function(c, g) {
    e = b.call(d, e, c, g, a)
  });
  return e
};
goog.array.some = goog.NATIVE_ARRAY_PROTOTYPES && goog.array.ARRAY_PROTOTYPE_.some ? function(a, b, c) {
  goog.asserts.assert(null != a.length);
  return goog.array.ARRAY_PROTOTYPE_.some.call(a, b, c)
} : function(a, b, c) {
  for(var d = a.length, e = goog.isString(a) ? a.split("") : a, f = 0;f < d;f++) {
    if(f in e && b.call(c, e[f], f, a)) {
      return!0
    }
  }
  return!1
};
goog.array.every = goog.NATIVE_ARRAY_PROTOTYPES && goog.array.ARRAY_PROTOTYPE_.every ? function(a, b, c) {
  goog.asserts.assert(null != a.length);
  return goog.array.ARRAY_PROTOTYPE_.every.call(a, b, c)
} : function(a, b, c) {
  for(var d = a.length, e = goog.isString(a) ? a.split("") : a, f = 0;f < d;f++) {
    if(f in e && !b.call(c, e[f], f, a)) {
      return!1
    }
  }
  return!0
};
goog.array.find = function(a, b, c) {
  b = goog.array.findIndex(a, b, c);
  return 0 > b ? null : goog.isString(a) ? a.charAt(b) : a[b]
};
goog.array.findIndex = function(a, b, c) {
  for(var d = a.length, e = goog.isString(a) ? a.split("") : a, f = 0;f < d;f++) {
    if(f in e && b.call(c, e[f], f, a)) {
      return f
    }
  }
  return-1
};
goog.array.findRight = function(a, b, c) {
  b = goog.array.findIndexRight(a, b, c);
  return 0 > b ? null : goog.isString(a) ? a.charAt(b) : a[b]
};
goog.array.findIndexRight = function(a, b, c) {
  for(var d = a.length, e = goog.isString(a) ? a.split("") : a, d = d - 1;0 <= d;d--) {
    if(d in e && b.call(c, e[d], d, a)) {
      return d
    }
  }
  return-1
};
goog.array.contains = function(a, b) {
  return 0 <= goog.array.indexOf(a, b)
};
goog.array.isEmpty = function(a) {
  return 0 == a.length
};
goog.array.clear = function(a) {
  if(!goog.isArray(a)) {
    for(var b = a.length - 1;0 <= b;b--) {
      delete a[b]
    }
  }
  a.length = 0
};
goog.array.insert = function(a, b) {
  goog.array.contains(a, b) || a.push(b)
};
goog.array.insertAt = function(a, b, c) {
  goog.array.splice(a, c, 0, b)
};
goog.array.insertArrayAt = function(a, b, c) {
  goog.partial(goog.array.splice, a, c, 0).apply(null, b)
};
goog.array.insertBefore = function(a, b, c) {
  var d;
  2 == arguments.length || 0 > (d = goog.array.indexOf(a, c)) ? a.push(b) : goog.array.insertAt(a, b, d)
};
goog.array.remove = function(a, b) {
  var c = goog.array.indexOf(a, b), d;
  (d = 0 <= c) && goog.array.removeAt(a, c);
  return d
};
goog.array.removeAt = function(a, b) {
  goog.asserts.assert(null != a.length);
  return 1 == goog.array.ARRAY_PROTOTYPE_.splice.call(a, b, 1).length
};
goog.array.removeIf = function(a, b, c) {
  b = goog.array.findIndex(a, b, c);
  return 0 <= b ? (goog.array.removeAt(a, b), !0) : !1
};
goog.array.concat = function(a) {
  return goog.array.ARRAY_PROTOTYPE_.concat.apply(goog.array.ARRAY_PROTOTYPE_, arguments)
};
goog.array.toArray = function(a) {
  var b = a.length;
  if(0 < b) {
    for(var c = Array(b), d = 0;d < b;d++) {
      c[d] = a[d]
    }
    return c
  }
  return[]
};
goog.array.clone = goog.array.toArray;
goog.array.extend = function(a, b) {
  for(var c = 1;c < arguments.length;c++) {
    var d = arguments[c], e;
    if(goog.isArray(d) || (e = goog.isArrayLike(d)) && d.hasOwnProperty("callee")) {
      a.push.apply(a, d)
    }else {
      if(e) {
        for(var f = a.length, g = d.length, h = 0;h < g;h++) {
          a[f + h] = d[h]
        }
      }else {
        a.push(d)
      }
    }
  }
};
goog.array.splice = function(a, b, c, d) {
  goog.asserts.assert(null != a.length);
  return goog.array.ARRAY_PROTOTYPE_.splice.apply(a, goog.array.slice(arguments, 1))
};
goog.array.slice = function(a, b, c) {
  goog.asserts.assert(null != a.length);
  return 2 >= arguments.length ? goog.array.ARRAY_PROTOTYPE_.slice.call(a, b) : goog.array.ARRAY_PROTOTYPE_.slice.call(a, b, c)
};
goog.array.removeDuplicates = function(a, b) {
  for(var c = b || a, d = {}, e = 0, f = 0;f < a.length;) {
    var g = a[f++], h = goog.isObject(g) ? "o" + goog.getUid(g) : (typeof g).charAt(0) + g;
    Object.prototype.hasOwnProperty.call(d, h) || (d[h] = !0, c[e++] = g)
  }
  c.length = e
};
goog.array.binarySearch = function(a, b, c) {
  return goog.array.binarySearch_(a, c || goog.array.defaultCompare, !1, b)
};
goog.array.binarySelect = function(a, b, c) {
  return goog.array.binarySearch_(a, b, !0, void 0, c)
};
goog.array.binarySearch_ = function(a, b, c, d, e) {
  for(var f = 0, g = a.length, h;f < g;) {
    var i = f + g >> 1, j;
    j = c ? b.call(e, a[i], i, a) : b(d, a[i]);
    0 < j ? f = i + 1 : (g = i, h = !j)
  }
  return h ? f : ~f
};
goog.array.sort = function(a, b) {
  goog.asserts.assert(null != a.length);
  goog.array.ARRAY_PROTOTYPE_.sort.call(a, b || goog.array.defaultCompare)
};
goog.array.stableSort = function(a, b) {
  for(var c = 0;c < a.length;c++) {
    a[c] = {index:c, value:a[c]}
  }
  var d = b || goog.array.defaultCompare;
  goog.array.sort(a, function(a, b) {
    return d(a.value, b.value) || a.index - b.index
  });
  for(c = 0;c < a.length;c++) {
    a[c] = a[c].value
  }
};
goog.array.sortObjectsByKey = function(a, b, c) {
  var d = c || goog.array.defaultCompare;
  goog.array.sort(a, function(a, c) {
    return d(a[b], c[b])
  })
};
goog.array.isSorted = function(a, b, c) {
  for(var b = b || goog.array.defaultCompare, d = 1;d < a.length;d++) {
    var e = b(a[d - 1], a[d]);
    if(0 < e || 0 == e && c) {
      return!1
    }
  }
  return!0
};
goog.array.equals = function(a, b, c) {
  if(!goog.isArrayLike(a) || !goog.isArrayLike(b) || a.length != b.length) {
    return!1
  }
  for(var d = a.length, c = c || goog.array.defaultCompareEquality, e = 0;e < d;e++) {
    if(!c(a[e], b[e])) {
      return!1
    }
  }
  return!0
};
goog.array.compare = function(a, b, c) {
  return goog.array.equals(a, b, c)
};
goog.array.compare3 = function(a, b, c) {
  for(var c = c || goog.array.defaultCompare, d = Math.min(a.length, b.length), e = 0;e < d;e++) {
    var f = c(a[e], b[e]);
    if(0 != f) {
      return f
    }
  }
  return goog.array.defaultCompare(a.length, b.length)
};
goog.array.defaultCompare = function(a, b) {
  return a > b ? 1 : a < b ? -1 : 0
};
goog.array.defaultCompareEquality = function(a, b) {
  return a === b
};
goog.array.binaryInsert = function(a, b, c) {
  c = goog.array.binarySearch(a, b, c);
  return 0 > c ? (goog.array.insertAt(a, b, -(c + 1)), !0) : !1
};
goog.array.binaryRemove = function(a, b, c) {
  b = goog.array.binarySearch(a, b, c);
  return 0 <= b ? goog.array.removeAt(a, b) : !1
};
goog.array.bucket = function(a, b) {
  for(var c = {}, d = 0;d < a.length;d++) {
    var e = a[d], f = b(e, d, a);
    goog.isDef(f) && (c[f] || (c[f] = [])).push(e)
  }
  return c
};
goog.array.repeat = function(a, b) {
  for(var c = [], d = 0;d < b;d++) {
    c[d] = a
  }
  return c
};
goog.array.flatten = function(a) {
  for(var b = [], c = 0;c < arguments.length;c++) {
    var d = arguments[c];
    goog.isArray(d) ? b.push.apply(b, goog.array.flatten.apply(null, d)) : b.push(d)
  }
  return b
};
goog.array.rotate = function(a, b) {
  goog.asserts.assert(null != a.length);
  a.length && (b %= a.length, 0 < b ? goog.array.ARRAY_PROTOTYPE_.unshift.apply(a, a.splice(-b, b)) : 0 > b && goog.array.ARRAY_PROTOTYPE_.push.apply(a, a.splice(0, -b)));
  return a
};
goog.array.zip = function(a) {
  if(!arguments.length) {
    return[]
  }
  for(var b = [], c = 0;;c++) {
    for(var d = [], e = 0;e < arguments.length;e++) {
      var f = arguments[e];
      if(c >= f.length) {
        return b
      }
      d.push(f[c])
    }
    b.push(d)
  }
};
goog.array.shuffle = function(a, b) {
  for(var c = b || Math.random, d = a.length - 1;0 < d;d--) {
    var e = Math.floor(c() * (d + 1)), f = a[d];
    a[d] = a[e];
    a[e] = f
  }
};
goog.object = {};
goog.object.forEach = function(a, b, c) {
  for(var d in a) {
    b.call(c, a[d], d, a)
  }
};
goog.object.filter = function(a, b, c) {
  var d = {}, e;
  for(e in a) {
    b.call(c, a[e], e, a) && (d[e] = a[e])
  }
  return d
};
goog.object.map = function(a, b, c) {
  var d = {}, e;
  for(e in a) {
    d[e] = b.call(c, a[e], e, a)
  }
  return d
};
goog.object.some = function(a, b, c) {
  for(var d in a) {
    if(b.call(c, a[d], d, a)) {
      return!0
    }
  }
  return!1
};
goog.object.every = function(a, b, c) {
  for(var d in a) {
    if(!b.call(c, a[d], d, a)) {
      return!1
    }
  }
  return!0
};
goog.object.getCount = function(a) {
  var b = 0, c;
  for(c in a) {
    b++
  }
  return b
};
goog.object.getAnyKey = function(a) {
  for(var b in a) {
    return b
  }
};
goog.object.getAnyValue = function(a) {
  for(var b in a) {
    return a[b]
  }
};
goog.object.contains = function(a, b) {
  return goog.object.containsValue(a, b)
};
goog.object.getValues = function(a) {
  var b = [], c = 0, d;
  for(d in a) {
    b[c++] = a[d]
  }
  return b
};
goog.object.getKeys = function(a) {
  var b = [], c = 0, d;
  for(d in a) {
    b[c++] = d
  }
  return b
};
goog.object.getValueByKeys = function(a, b) {
  for(var c = goog.isArrayLike(b), d = c ? b : arguments, c = c ? 0 : 1;c < d.length && !(a = a[d[c]], !goog.isDef(a));c++) {
  }
  return a
};
goog.object.containsKey = function(a, b) {
  return b in a
};
goog.object.containsValue = function(a, b) {
  for(var c in a) {
    if(a[c] == b) {
      return!0
    }
  }
  return!1
};
goog.object.findKey = function(a, b, c) {
  for(var d in a) {
    if(b.call(c, a[d], d, a)) {
      return d
    }
  }
};
goog.object.findValue = function(a, b, c) {
  return(b = goog.object.findKey(a, b, c)) && a[b]
};
goog.object.isEmpty = function(a) {
  for(var b in a) {
    return!1
  }
  return!0
};
goog.object.clear = function(a) {
  for(var b in a) {
    delete a[b]
  }
};
goog.object.remove = function(a, b) {
  var c;
  (c = b in a) && delete a[b];
  return c
};
goog.object.add = function(a, b, c) {
  if(b in a) {
    throw Error('The object already contains the key "' + b + '"');
  }
  goog.object.set(a, b, c)
};
goog.object.get = function(a, b, c) {
  return b in a ? a[b] : c
};
goog.object.set = function(a, b, c) {
  a[b] = c
};
goog.object.setIfUndefined = function(a, b, c) {
  return b in a ? a[b] : a[b] = c
};
goog.object.clone = function(a) {
  var b = {}, c;
  for(c in a) {
    b[c] = a[c]
  }
  return b
};
goog.object.unsafeClone = function(a) {
  var b = goog.typeOf(a);
  if("object" == b || "array" == b) {
    if(a.clone) {
      return a.clone()
    }
    var b = "array" == b ? [] : {}, c;
    for(c in a) {
      b[c] = goog.object.unsafeClone(a[c])
    }
    return b
  }
  return a
};
goog.object.transpose = function(a) {
  var b = {}, c;
  for(c in a) {
    b[a[c]] = c
  }
  return b
};
goog.object.PROTOTYPE_FIELDS_ = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
goog.object.extend = function(a, b) {
  for(var c, d, e = 1;e < arguments.length;e++) {
    d = arguments[e];
    for(c in d) {
      a[c] = d[c]
    }
    for(var f = 0;f < goog.object.PROTOTYPE_FIELDS_.length;f++) {
      c = goog.object.PROTOTYPE_FIELDS_[f], Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c])
    }
  }
};
goog.object.create = function(a) {
  var b = arguments.length;
  if(1 == b && goog.isArray(arguments[0])) {
    return goog.object.create.apply(null, arguments[0])
  }
  if(b % 2) {
    throw Error("Uneven number of arguments");
  }
  for(var c = {}, d = 0;d < b;d += 2) {
    c[arguments[d]] = arguments[d + 1]
  }
  return c
};
goog.object.createSet = function(a) {
  var b = arguments.length;
  if(1 == b && goog.isArray(arguments[0])) {
    return goog.object.createSet.apply(null, arguments[0])
  }
  for(var c = {}, d = 0;d < b;d++) {
    c[arguments[d]] = !0
  }
  return c
};
goog.string.format = function(a, b) {
  var c = Array.prototype.slice.call(arguments), d = c.shift();
  if("undefined" == typeof d) {
    throw Error("[goog.string.format] Template required");
  }
  return d.replace(/%([0\-\ \+]*)(\d+)?(\.(\d+))?([%sfdiu])/g, function(a, b, d, h, i, j, k, m) {
    if("%" == j) {
      return"%"
    }
    var l = c.shift();
    if("undefined" == typeof l) {
      throw Error("[goog.string.format] Not enough arguments");
    }
    arguments[0] = l;
    return goog.string.format.demuxes_[j].apply(null, arguments)
  })
};
goog.string.format.demuxes_ = {};
goog.string.format.demuxes_.s = function(a, b, c) {
  return isNaN(c) || "" == c || a.length >= c ? a : a = -1 < b.indexOf("-", 0) ? a + goog.string.repeat(" ", c - a.length) : goog.string.repeat(" ", c - a.length) + a
};
goog.string.format.demuxes_.f = function(a, b, c, d, e) {
  d = a.toString();
  isNaN(e) || "" == e || (d = a.toFixed(e));
  var f;
  f = 0 > a ? "-" : 0 <= b.indexOf("+") ? "+" : 0 <= b.indexOf(" ") ? " " : "";
  0 <= a && (d = f + d);
  if(isNaN(c) || d.length >= c) {
    return d
  }
  d = isNaN(e) ? Math.abs(a).toString() : Math.abs(a).toFixed(e);
  a = c - d.length - f.length;
  0 <= b.indexOf("-", 0) ? d = f + d + goog.string.repeat(" ", a) : (b = 0 <= b.indexOf("0", 0) ? "0" : " ", d = f + goog.string.repeat(b, a) + d);
  return d
};
goog.string.format.demuxes_.d = function(a, b, c, d, e, f, g, h) {
  return goog.string.format.demuxes_.f(parseInt(a, 10), b, c, d, 0, f, g, h)
};
goog.string.format.demuxes_.i = goog.string.format.demuxes_.d;
goog.string.format.demuxes_.u = goog.string.format.demuxes_.d;
goog.string.StringBuffer = function(a, b) {
  null != a && this.append.apply(this, arguments)
};
goog.string.StringBuffer.prototype.buffer_ = "";
goog.string.StringBuffer.prototype.set = function(a) {
  this.buffer_ = "" + a
};
goog.string.StringBuffer.prototype.append = function(a, b, c) {
  this.buffer_ += a;
  if(null != b) {
    for(var d = 1;d < arguments.length;d++) {
      this.buffer_ += arguments[d]
    }
  }
  return this
};
goog.string.StringBuffer.prototype.clear = function() {
  this.buffer_ = ""
};
goog.string.StringBuffer.prototype.getLength = function() {
  return this.buffer_.length
};
goog.string.StringBuffer.prototype.toString = function() {
  return this.buffer_
};
var cljs = {core:{}};
cljs.core._STAR_unchecked_if_STAR_ = !1;
cljs.core._STAR_print_fn_STAR_ = function() {
  throw Error("No *print-fn* fn set for evaluation environment");
};
cljs.core.set_print_fn_BANG_ = function(a) {
  return cljs.core._STAR_print_fn_STAR_ = a
};
goog.exportSymbol("cljs.core.set_print_fn_BANG_", cljs.core.set_print_fn_BANG_);
cljs.core._STAR_flush_on_newline_STAR_ = !0;
cljs.core._STAR_print_readably_STAR_ = !0;
cljs.core._STAR_print_meta_STAR_ = !1;
cljs.core._STAR_print_dup_STAR_ = !1;
cljs.core.pr_opts = function() {
  return cljs.core.PersistentArrayMap.fromArray(["\ufdd0:flush-on-newline", cljs.core._STAR_flush_on_newline_STAR_, "\ufdd0:readably", cljs.core._STAR_print_readably_STAR_, "\ufdd0:meta", cljs.core._STAR_print_meta_STAR_, "\ufdd0:dup", cljs.core._STAR_print_dup_STAR_], !0)
};
cljs.core.truth_ = function(a) {
  return null != a && !1 !== a
};
cljs.core.not_native = null;
cljs.core.identical_QMARK_ = function(a, b) {
  return a === b
};
cljs.core.nil_QMARK_ = function(a) {
  return null == a
};
cljs.core.array_QMARK_ = function(a) {
  return a instanceof Array
};
cljs.core.number_QMARK_ = function(a) {
  return"number" === typeof a
};
cljs.core.not = function(a) {
  return cljs.core.truth_(a) ? !1 : !0
};
cljs.core.string_QMARK_ = function(a) {
  var b = goog.isString(a);
  return b ? "\ufdd0" !== a.charAt(0) : b
};
cljs.core.type_satisfies_ = function(a, b) {
  return a[goog.typeOf(null == b ? null : b)] ? !0 : a._ ? !0 : !1
};
cljs.core.is_proto_ = function(a) {
  return a.constructor.prototype === a
};
cljs.core._STAR_main_cli_fn_STAR_ = null;
cljs.core.type = function(a) {
  return null == a ? null : a.constructor
};
cljs.core.missing_protocol = function(a, b) {
  var c = cljs.core.type(b), c = cljs.core.truth_(cljs.core.truth_(c) ? c.cljs$lang$type : c) ? c.cljs$lang$ctorStr : goog.typeOf(b);
  return Error(["No protocol method ", a, " defined for type ", c, ": ", b].join(""))
};
cljs.core.aclone = function(a) {
  return a.slice()
};
cljs.core.array = function(a) {
  return Array.prototype.slice.call(arguments)
};
cljs.core.make_array = function() {
  var a = null, a = function(b, c) {
    switch(arguments.length) {
      case 1:
        return Array(b);
      case 2:
        return a.cljs$core$IFn$_invoke$arity$1(c)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$1 = function(a) {
    return Array(a)
  };
  a.cljs$core$IFn$_invoke$arity$2 = function(b, c) {
    return a.cljs$core$IFn$_invoke$arity$1(c)
  };
  return a
}();
cljs.core.aget = function() {
  var a = null, b = function(b, c, f) {
    return cljs.core.apply.cljs$core$IFn$_invoke$arity$3 ? cljs.core.apply.cljs$core$IFn$_invoke$arity$3(a, a.cljs$core$IFn$_invoke$arity$2(b, c), f) : cljs.core.apply.call(null, a, a.cljs$core$IFn$_invoke$arity$2(b, c), f)
  }, c = function(a, c, f) {
    var g = null;
    2 < arguments.length && (g = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
    return b.call(this, a, c, g)
  };
  c.cljs$lang$maxFixedArity = 2;
  c.cljs$lang$applyTo = function(a) {
    var c = cljs.core.first(a), a = cljs.core.next(a), f = cljs.core.first(a), a = cljs.core.rest(a);
    return b(c, f, a)
  };
  c.cljs$core$IFn$_invoke$arity$variadic = b;
  a = function(a, b, f) {
    switch(arguments.length) {
      case 2:
        return a[b];
      default:
        return c.cljs$core$IFn$_invoke$arity$variadic(a, b, cljs.core.array_seq(arguments, 2))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = c.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$2 = function(a, b) {
    return a[b]
  };
  a.cljs$core$IFn$_invoke$arity$variadic = c.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
cljs.core.aset = function() {
  var a = null, b = function(b, c, f, g) {
    return cljs.core.apply.cljs$core$IFn$_invoke$arity$4 ? cljs.core.apply.cljs$core$IFn$_invoke$arity$4(a, b[c], f, g) : cljs.core.apply.call(null, a, b[c], f, g)
  }, c = function(a, c, f, g) {
    var h = null;
    3 < arguments.length && (h = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
    return b.call(this, a, c, f, h)
  };
  c.cljs$lang$maxFixedArity = 3;
  c.cljs$lang$applyTo = function(a) {
    var c = cljs.core.first(a), a = cljs.core.next(a), f = cljs.core.first(a), a = cljs.core.next(a), g = cljs.core.first(a), a = cljs.core.rest(a);
    return b(c, f, g, a)
  };
  c.cljs$core$IFn$_invoke$arity$variadic = b;
  a = function(a, b, f, g) {
    switch(arguments.length) {
      case 3:
        return a[b] = f;
      default:
        return c.cljs$core$IFn$_invoke$arity$variadic(a, b, f, cljs.core.array_seq(arguments, 3))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 3;
  a.cljs$lang$applyTo = c.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$3 = function(a, b, c) {
    return a[b] = c
  };
  a.cljs$core$IFn$_invoke$arity$variadic = c.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
cljs.core.alength = function(a) {
  return a.length
};
cljs.core.into_array = function() {
  var a = null, b = function(b) {
    return a.cljs$core$IFn$_invoke$arity$2(null, b)
  }, c = function(a, b) {
    return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3 ? cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(function(a, b) {
      a.push(b);
      return a
    }, [], b) : cljs.core.reduce.call(null, function(a, b) {
      a.push(b);
      return a
    }, [], b)
  }, a = function(a, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, e)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$2 = c;
  return a
}();
cljs.core.Fn = {};
cljs.core.IFn = {};
cljs.core._invoke = function() {
  var a = null, b = function(a) {
    var b;
    b = a ? a.cljs$core$IFn$_invoke$arity$1 : a;
    if(b) {
      return a.cljs$core$IFn$_invoke$arity$1(a)
    }
    b = cljs.core._invoke[goog.typeOf(null == a ? null : a)];
    if(!b && (b = cljs.core._invoke._, !b)) {
      throw cljs.core.missing_protocol("IFn.-invoke", a);
    }
    return b.call(null, a)
  }, c = function(a, b) {
    var c;
    c = a ? a.cljs$core$IFn$_invoke$arity$2 : a;
    if(c) {
      return a.cljs$core$IFn$_invoke$arity$2(a, b)
    }
    c = cljs.core._invoke[goog.typeOf(null == a ? null : a)];
    if(!c && (c = cljs.core._invoke._, !c)) {
      throw cljs.core.missing_protocol("IFn.-invoke", a);
    }
    return c.call(null, a, b)
  }, d = function(a, b, c) {
    var d;
    d = a ? a.cljs$core$IFn$_invoke$arity$3 : a;
    if(d) {
      return a.cljs$core$IFn$_invoke$arity$3(a, b, c)
    }
    d = cljs.core._invoke[goog.typeOf(null == a ? null : a)];
    if(!d && (d = cljs.core._invoke._, !d)) {
      throw cljs.core.missing_protocol("IFn.-invoke", a);
    }
    return d.call(null, a, b, c)
  }, e = function(a, b, c, d) {
    var e;
    e = a ? a.cljs$core$IFn$_invoke$arity$4 : a;
    if(e) {
      return a.cljs$core$IFn$_invoke$arity$4(a, b, c, d)
    }
    e = cljs.core._invoke[goog.typeOf(null == a ? null : a)];
    if(!e && (e = cljs.core._invoke._, !e)) {
      throw cljs.core.missing_protocol("IFn.-invoke", a);
    }
    return e.call(null, a, b, c, d)
  }, f = function(a, b, c, d, e) {
    var f;
    f = a ? a.cljs$core$IFn$_invoke$arity$5 : a;
    if(f) {
      return a.cljs$core$IFn$_invoke$arity$5(a, b, c, d, e)
    }
    f = cljs.core._invoke[goog.typeOf(null == a ? null : a)];
    if(!f && (f = cljs.core._invoke._, !f)) {
      throw cljs.core.missing_protocol("IFn.-invoke", a);
    }
    return f.call(null, a, b, c, d, e)
  }, g = function(a, b, c, d, e, f) {
    var g;
    g = a ? a.cljs$core$IFn$_invoke$arity$6 : a;
    if(g) {
      return a.cljs$core$IFn$_invoke$arity$6(a, b, c, d, e, f)
    }
    g = cljs.core._invoke[goog.typeOf(null == a ? null : a)];
    if(!g && (g = cljs.core._invoke._, !g)) {
      throw cljs.core.missing_protocol("IFn.-invoke", a);
    }
    return g.call(null, a, b, c, d, e, f)
  }, h = function(a, b, c, d, e, f, g) {
    var h;
    h = a ? a.cljs$core$IFn$_invoke$arity$7 : a;
    if(h) {
      return a.cljs$core$IFn$_invoke$arity$7(a, b, c, d, e, f, g)
    }
    h = cljs.core._invoke[goog.typeOf(null == a ? null : a)];
    if(!h && (h = cljs.core._invoke._, !h)) {
      throw cljs.core.missing_protocol("IFn.-invoke", a);
    }
    return h.call(null, a, b, c, d, e, f, g)
  }, i = function(a, b, c, d, e, f, g, h) {
    var i;
    i = a ? a.cljs$core$IFn$_invoke$arity$8 : a;
    if(i) {
      return a.cljs$core$IFn$_invoke$arity$8(a, b, c, d, e, f, g, h)
    }
    i = cljs.core._invoke[goog.typeOf(null == a ? null : a)];
    if(!i && (i = cljs.core._invoke._, !i)) {
      throw cljs.core.missing_protocol("IFn.-invoke", a);
    }
    return i.call(null, a, b, c, d, e, f, g, h)
  }, j = function(a, b, c, d, e, f, g, h, i) {
    var j;
    j = a ? a.cljs$core$IFn$_invoke$arity$9 : a;
    if(j) {
      return a.cljs$core$IFn$_invoke$arity$9(a, b, c, d, e, f, g, h, i)
    }
    j = cljs.core._invoke[goog.typeOf(null == a ? null : a)];
    if(!j && (j = cljs.core._invoke._, !j)) {
      throw cljs.core.missing_protocol("IFn.-invoke", a);
    }
    return j.call(null, a, b, c, d, e, f, g, h, i)
  }, k = function(a, b, c, d, e, f, g, h, i, j) {
    var k;
    k = a ? a.cljs$core$IFn$_invoke$arity$10 : a;
    if(k) {
      return a.cljs$core$IFn$_invoke$arity$10(a, b, c, d, e, f, g, h, i, j)
    }
    k = cljs.core._invoke[goog.typeOf(null == a ? null : a)];
    if(!k && (k = cljs.core._invoke._, !k)) {
      throw cljs.core.missing_protocol("IFn.-invoke", a);
    }
    return k.call(null, a, b, c, d, e, f, g, h, i, j)
  }, m = function(a, b, c, d, e, f, g, h, i, j, k) {
    var m;
    m = a ? a.cljs$core$IFn$_invoke$arity$11 : a;
    if(m) {
      return a.cljs$core$IFn$_invoke$arity$11(a, b, c, d, e, f, g, h, i, j, k)
    }
    m = cljs.core._invoke[goog.typeOf(null == a ? null : a)];
    if(!m && (m = cljs.core._invoke._, !m)) {
      throw cljs.core.missing_protocol("IFn.-invoke", a);
    }
    return m.call(null, a, b, c, d, e, f, g, h, i, j, k)
  }, l = function(a, b, c, d, e, f, g, h, i, j, k, m) {
    var l;
    l = a ? a.cljs$core$IFn$_invoke$arity$12 : a;
    if(l) {
      return a.cljs$core$IFn$_invoke$arity$12(a, b, c, d, e, f, g, h, i, j, k, m)
    }
    l = cljs.core._invoke[goog.typeOf(null == a ? null : a)];
    if(!l && (l = cljs.core._invoke._, !l)) {
      throw cljs.core.missing_protocol("IFn.-invoke", a);
    }
    return l.call(null, a, b, c, d, e, f, g, h, i, j, k, m)
  }, n = function(a, b, c, d, e, f, g, h, i, j, k, m, l) {
    var n;
    n = a ? a.cljs$core$IFn$_invoke$arity$13 : a;
    if(n) {
      return a.cljs$core$IFn$_invoke$arity$13(a, b, c, d, e, f, g, h, i, j, k, m, l)
    }
    n = cljs.core._invoke[goog.typeOf(null == a ? null : a)];
    if(!n && (n = cljs.core._invoke._, !n)) {
      throw cljs.core.missing_protocol("IFn.-invoke", a);
    }
    return n.call(null, a, b, c, d, e, f, g, h, i, j, k, m, l)
  }, p = function(a, b, c, d, e, f, g, h, i, j, k, m, l, n) {
    var p;
    p = a ? a.cljs$core$IFn$_invoke$arity$14 : a;
    if(p) {
      return a.cljs$core$IFn$_invoke$arity$14(a, b, c, d, e, f, g, h, i, j, k, m, l, n)
    }
    p = cljs.core._invoke[goog.typeOf(null == a ? null : a)];
    if(!p && (p = cljs.core._invoke._, !p)) {
      throw cljs.core.missing_protocol("IFn.-invoke", a);
    }
    return p.call(null, a, b, c, d, e, f, g, h, i, j, k, m, l, n)
  }, q = function(a, b, c, d, e, f, g, h, i, j, k, m, l, n, p) {
    var q;
    q = a ? a.cljs$core$IFn$_invoke$arity$15 : a;
    if(q) {
      return a.cljs$core$IFn$_invoke$arity$15(a, b, c, d, e, f, g, h, i, j, k, m, l, n, p)
    }
    q = cljs.core._invoke[goog.typeOf(null == a ? null : a)];
    if(!q && (q = cljs.core._invoke._, !q)) {
      throw cljs.core.missing_protocol("IFn.-invoke", a);
    }
    return q.call(null, a, b, c, d, e, f, g, h, i, j, k, m, l, n, p)
  }, r = function(a, b, c, d, e, f, g, h, i, j, k, m, l, n, p, q) {
    var t;
    t = a ? a.cljs$core$IFn$_invoke$arity$16 : a;
    if(t) {
      return a.cljs$core$IFn$_invoke$arity$16(a, b, c, d, e, f, g, h, i, j, k, m, l, n, p, q)
    }
    t = cljs.core._invoke[goog.typeOf(null == a ? null : a)];
    if(!t && (t = cljs.core._invoke._, !t)) {
      throw cljs.core.missing_protocol("IFn.-invoke", a);
    }
    return t.call(null, a, b, c, d, e, f, g, h, i, j, k, m, l, n, p, q)
  }, s = function(a, b, c, d, e, f, g, h, i, j, k, m, l, n, p, q, t) {
    var s;
    s = a ? a.cljs$core$IFn$_invoke$arity$17 : a;
    if(s) {
      return a.cljs$core$IFn$_invoke$arity$17(a, b, c, d, e, f, g, h, i, j, k, m, l, n, p, q, t)
    }
    s = cljs.core._invoke[goog.typeOf(null == a ? null : a)];
    if(!s && (s = cljs.core._invoke._, !s)) {
      throw cljs.core.missing_protocol("IFn.-invoke", a);
    }
    return s.call(null, a, b, c, d, e, f, g, h, i, j, k, m, l, n, p, q, t)
  }, u = function(a, b, c, d, e, f, g, h, i, j, k, m, l, n, p, q, t, s) {
    var r;
    r = a ? a.cljs$core$IFn$_invoke$arity$18 : a;
    if(r) {
      return a.cljs$core$IFn$_invoke$arity$18(a, b, c, d, e, f, g, h, i, j, k, m, l, n, p, q, t, s)
    }
    r = cljs.core._invoke[goog.typeOf(null == a ? null : a)];
    if(!r && (r = cljs.core._invoke._, !r)) {
      throw cljs.core.missing_protocol("IFn.-invoke", a);
    }
    return r.call(null, a, b, c, d, e, f, g, h, i, j, k, m, l, n, p, q, t, s)
  }, t = function(a, b, c, d, e, f, g, h, i, j, k, m, l, n, p, q, t, s, r) {
    var v;
    v = a ? a.cljs$core$IFn$_invoke$arity$19 : a;
    if(v) {
      return a.cljs$core$IFn$_invoke$arity$19(a, b, c, d, e, f, g, h, i, j, k, m, l, n, p, q, t, s, r)
    }
    v = cljs.core._invoke[goog.typeOf(null == a ? null : a)];
    if(!v && (v = cljs.core._invoke._, !v)) {
      throw cljs.core.missing_protocol("IFn.-invoke", a);
    }
    return v.call(null, a, b, c, d, e, f, g, h, i, j, k, m, l, n, p, q, t, s, r)
  }, v = function(a, b, c, d, e, f, g, h, i, j, k, m, l, n, p, q, t, s, r, v) {
    var u;
    u = a ? a.cljs$core$IFn$_invoke$arity$20 : a;
    if(u) {
      return a.cljs$core$IFn$_invoke$arity$20(a, b, c, d, e, f, g, h, i, j, k, m, l, n, p, q, t, s, r, v)
    }
    u = cljs.core._invoke[goog.typeOf(null == a ? null : a)];
    if(!u && (u = cljs.core._invoke._, !u)) {
      throw cljs.core.missing_protocol("IFn.-invoke", a);
    }
    return u.call(null, a, b, c, d, e, f, g, h, i, j, k, m, l, n, p, q, t, s, r, v)
  }, D = function(a, b, c, d, e, f, g, h, i, j, k, m, l, n, p, q, t, s, r, v, u) {
    var D;
    D = a ? a.cljs$core$IFn$_invoke$arity$21 : a;
    if(D) {
      return a.cljs$core$IFn$_invoke$arity$21(a, b, c, d, e, f, g, h, i, j, k, m, l, n, p, q, t, s, r, v, u)
    }
    D = cljs.core._invoke[goog.typeOf(null == a ? null : a)];
    if(!D && (D = cljs.core._invoke._, !D)) {
      throw cljs.core.missing_protocol("IFn.-invoke", a);
    }
    return D.call(null, a, b, c, d, e, f, g, h, i, j, k, m, l, n, p, q, t, s, r, v, u)
  }, a = function(a, w, x, y, z, A, B, C, E, F, G, H, I, J, K, L, M, N, O, P, Q) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, w);
      case 3:
        return d.call(this, a, w, x);
      case 4:
        return e.call(this, a, w, x, y);
      case 5:
        return f.call(this, a, w, x, y, z);
      case 6:
        return g.call(this, a, w, x, y, z, A);
      case 7:
        return h.call(this, a, w, x, y, z, A, B);
      case 8:
        return i.call(this, a, w, x, y, z, A, B, C);
      case 9:
        return j.call(this, a, w, x, y, z, A, B, C, E);
      case 10:
        return k.call(this, a, w, x, y, z, A, B, C, E, F);
      case 11:
        return m.call(this, a, w, x, y, z, A, B, C, E, F, G);
      case 12:
        return l.call(this, a, w, x, y, z, A, B, C, E, F, G, H);
      case 13:
        return n.call(this, a, w, x, y, z, A, B, C, E, F, G, H, I);
      case 14:
        return p.call(this, a, w, x, y, z, A, B, C, E, F, G, H, I, J);
      case 15:
        return q.call(this, a, w, x, y, z, A, B, C, E, F, G, H, I, J, K);
      case 16:
        return r.call(this, a, w, x, y, z, A, B, C, E, F, G, H, I, J, K, L);
      case 17:
        return s.call(this, a, w, x, y, z, A, B, C, E, F, G, H, I, J, K, L, M);
      case 18:
        return u.call(this, a, w, x, y, z, A, B, C, E, F, G, H, I, J, K, L, M, N);
      case 19:
        return t.call(this, a, w, x, y, z, A, B, C, E, F, G, H, I, J, K, L, M, N, O);
      case 20:
        return v.call(this, a, w, x, y, z, A, B, C, E, F, G, H, I, J, K, L, M, N, O, P);
      case 21:
        return D.call(this, a, w, x, y, z, A, B, C, E, F, G, H, I, J, K, L, M, N, O, P, Q)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$2 = c;
  a.cljs$core$IFn$_invoke$arity$3 = d;
  a.cljs$core$IFn$_invoke$arity$4 = e;
  a.cljs$core$IFn$_invoke$arity$5 = f;
  a.cljs$core$IFn$_invoke$arity$6 = g;
  a.cljs$core$IFn$_invoke$arity$7 = h;
  a.cljs$core$IFn$_invoke$arity$8 = i;
  a.cljs$core$IFn$_invoke$arity$9 = j;
  a.cljs$core$IFn$_invoke$arity$10 = k;
  a.cljs$core$IFn$_invoke$arity$11 = m;
  a.cljs$core$IFn$_invoke$arity$12 = l;
  a.cljs$core$IFn$_invoke$arity$13 = n;
  a.cljs$core$IFn$_invoke$arity$14 = p;
  a.cljs$core$IFn$_invoke$arity$15 = q;
  a.cljs$core$IFn$_invoke$arity$16 = r;
  a.cljs$core$IFn$_invoke$arity$17 = s;
  a.cljs$core$IFn$_invoke$arity$18 = u;
  a.cljs$core$IFn$_invoke$arity$19 = t;
  a.cljs$core$IFn$_invoke$arity$20 = v;
  a.cljs$core$IFn$_invoke$arity$21 = D;
  return a
}();
cljs.core.ICounted = {};
cljs.core._count = function(a) {
  var b;
  b = a ? a.cljs$core$ICounted$_count$arity$1 : a;
  if(b) {
    return a.cljs$core$ICounted$_count$arity$1(a)
  }
  b = cljs.core._count[goog.typeOf(null == a ? null : a)];
  if(!b && (b = cljs.core._count._, !b)) {
    throw cljs.core.missing_protocol("ICounted.-count", a);
  }
  return b.call(null, a)
};
cljs.core.IEmptyableCollection = {};
cljs.core._empty = function(a) {
  var b;
  b = a ? a.cljs$core$IEmptyableCollection$_empty$arity$1 : a;
  if(b) {
    return a.cljs$core$IEmptyableCollection$_empty$arity$1(a)
  }
  b = cljs.core._empty[goog.typeOf(null == a ? null : a)];
  if(!b && (b = cljs.core._empty._, !b)) {
    throw cljs.core.missing_protocol("IEmptyableCollection.-empty", a);
  }
  return b.call(null, a)
};
cljs.core.ICollection = {};
cljs.core._conj = function(a, b) {
  var c;
  c = a ? a.cljs$core$ICollection$_conj$arity$2 : a;
  if(c) {
    return a.cljs$core$ICollection$_conj$arity$2(a, b)
  }
  c = cljs.core._conj[goog.typeOf(null == a ? null : a)];
  if(!c && (c = cljs.core._conj._, !c)) {
    throw cljs.core.missing_protocol("ICollection.-conj", a);
  }
  return c.call(null, a, b)
};
cljs.core.IIndexed = {};
cljs.core._nth = function() {
  var a = null, b = function(a, b) {
    var c;
    c = a ? a.cljs$core$IIndexed$_nth$arity$2 : a;
    if(c) {
      return a.cljs$core$IIndexed$_nth$arity$2(a, b)
    }
    c = cljs.core._nth[goog.typeOf(null == a ? null : a)];
    if(!c && (c = cljs.core._nth._, !c)) {
      throw cljs.core.missing_protocol("IIndexed.-nth", a);
    }
    return c.call(null, a, b)
  }, c = function(a, b, c) {
    var g;
    g = a ? a.cljs$core$IIndexed$_nth$arity$3 : a;
    if(g) {
      return a.cljs$core$IIndexed$_nth$arity$3(a, b, c)
    }
    g = cljs.core._nth[goog.typeOf(null == a ? null : a)];
    if(!g && (g = cljs.core._nth._, !g)) {
      throw cljs.core.missing_protocol("IIndexed.-nth", a);
    }
    return g.call(null, a, b, c)
  }, a = function(a, e, f) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, e);
      case 3:
        return c.call(this, a, e, f)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$3 = c;
  return a
}();
cljs.core.ASeq = {};
cljs.core.ISeq = {};
cljs.core._first = function(a) {
  var b;
  b = a ? a.cljs$core$ISeq$_first$arity$1 : a;
  if(b) {
    return a.cljs$core$ISeq$_first$arity$1(a)
  }
  b = cljs.core._first[goog.typeOf(null == a ? null : a)];
  if(!b && (b = cljs.core._first._, !b)) {
    throw cljs.core.missing_protocol("ISeq.-first", a);
  }
  return b.call(null, a)
};
cljs.core._rest = function(a) {
  var b;
  b = a ? a.cljs$core$ISeq$_rest$arity$1 : a;
  if(b) {
    return a.cljs$core$ISeq$_rest$arity$1(a)
  }
  b = cljs.core._rest[goog.typeOf(null == a ? null : a)];
  if(!b && (b = cljs.core._rest._, !b)) {
    throw cljs.core.missing_protocol("ISeq.-rest", a);
  }
  return b.call(null, a)
};
cljs.core.INext = {};
cljs.core._next = function(a) {
  var b;
  b = a ? a.cljs$core$INext$_next$arity$1 : a;
  if(b) {
    return a.cljs$core$INext$_next$arity$1(a)
  }
  b = cljs.core._next[goog.typeOf(null == a ? null : a)];
  if(!b && (b = cljs.core._next._, !b)) {
    throw cljs.core.missing_protocol("INext.-next", a);
  }
  return b.call(null, a)
};
cljs.core.ILookup = {};
cljs.core._lookup = function() {
  var a = null, b = function(a, b) {
    var c;
    c = a ? a.cljs$core$ILookup$_lookup$arity$2 : a;
    if(c) {
      return a.cljs$core$ILookup$_lookup$arity$2(a, b)
    }
    c = cljs.core._lookup[goog.typeOf(null == a ? null : a)];
    if(!c && (c = cljs.core._lookup._, !c)) {
      throw cljs.core.missing_protocol("ILookup.-lookup", a);
    }
    return c.call(null, a, b)
  }, c = function(a, b, c) {
    var g;
    g = a ? a.cljs$core$ILookup$_lookup$arity$3 : a;
    if(g) {
      return a.cljs$core$ILookup$_lookup$arity$3(a, b, c)
    }
    g = cljs.core._lookup[goog.typeOf(null == a ? null : a)];
    if(!g && (g = cljs.core._lookup._, !g)) {
      throw cljs.core.missing_protocol("ILookup.-lookup", a);
    }
    return g.call(null, a, b, c)
  }, a = function(a, e, f) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, e);
      case 3:
        return c.call(this, a, e, f)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$3 = c;
  return a
}();
cljs.core.IAssociative = {};
cljs.core._contains_key_QMARK_ = function(a, b) {
  var c;
  c = a ? a.cljs$core$IAssociative$_contains_key_QMARK_$arity$2 : a;
  if(c) {
    return a.cljs$core$IAssociative$_contains_key_QMARK_$arity$2(a, b)
  }
  c = cljs.core._contains_key_QMARK_[goog.typeOf(null == a ? null : a)];
  if(!c && (c = cljs.core._contains_key_QMARK_._, !c)) {
    throw cljs.core.missing_protocol("IAssociative.-contains-key?", a);
  }
  return c.call(null, a, b)
};
cljs.core._assoc = function(a, b, c) {
  var d;
  d = a ? a.cljs$core$IAssociative$_assoc$arity$3 : a;
  if(d) {
    return a.cljs$core$IAssociative$_assoc$arity$3(a, b, c)
  }
  d = cljs.core._assoc[goog.typeOf(null == a ? null : a)];
  if(!d && (d = cljs.core._assoc._, !d)) {
    throw cljs.core.missing_protocol("IAssociative.-assoc", a);
  }
  return d.call(null, a, b, c)
};
cljs.core.IMap = {};
cljs.core._dissoc = function(a, b) {
  var c;
  c = a ? a.cljs$core$IMap$_dissoc$arity$2 : a;
  if(c) {
    return a.cljs$core$IMap$_dissoc$arity$2(a, b)
  }
  c = cljs.core._dissoc[goog.typeOf(null == a ? null : a)];
  if(!c && (c = cljs.core._dissoc._, !c)) {
    throw cljs.core.missing_protocol("IMap.-dissoc", a);
  }
  return c.call(null, a, b)
};
cljs.core.IMapEntry = {};
cljs.core._key = function(a) {
  var b;
  b = a ? a.cljs$core$IMapEntry$_key$arity$1 : a;
  if(b) {
    return a.cljs$core$IMapEntry$_key$arity$1(a)
  }
  b = cljs.core._key[goog.typeOf(null == a ? null : a)];
  if(!b && (b = cljs.core._key._, !b)) {
    throw cljs.core.missing_protocol("IMapEntry.-key", a);
  }
  return b.call(null, a)
};
cljs.core._val = function(a) {
  var b;
  b = a ? a.cljs$core$IMapEntry$_val$arity$1 : a;
  if(b) {
    return a.cljs$core$IMapEntry$_val$arity$1(a)
  }
  b = cljs.core._val[goog.typeOf(null == a ? null : a)];
  if(!b && (b = cljs.core._val._, !b)) {
    throw cljs.core.missing_protocol("IMapEntry.-val", a);
  }
  return b.call(null, a)
};
cljs.core.ISet = {};
cljs.core._disjoin = function(a, b) {
  var c;
  c = a ? a.cljs$core$ISet$_disjoin$arity$2 : a;
  if(c) {
    return a.cljs$core$ISet$_disjoin$arity$2(a, b)
  }
  c = cljs.core._disjoin[goog.typeOf(null == a ? null : a)];
  if(!c && (c = cljs.core._disjoin._, !c)) {
    throw cljs.core.missing_protocol("ISet.-disjoin", a);
  }
  return c.call(null, a, b)
};
cljs.core.IStack = {};
cljs.core._peek = function(a) {
  var b;
  b = a ? a.cljs$core$IStack$_peek$arity$1 : a;
  if(b) {
    return a.cljs$core$IStack$_peek$arity$1(a)
  }
  b = cljs.core._peek[goog.typeOf(null == a ? null : a)];
  if(!b && (b = cljs.core._peek._, !b)) {
    throw cljs.core.missing_protocol("IStack.-peek", a);
  }
  return b.call(null, a)
};
cljs.core._pop = function(a) {
  var b;
  b = a ? a.cljs$core$IStack$_pop$arity$1 : a;
  if(b) {
    return a.cljs$core$IStack$_pop$arity$1(a)
  }
  b = cljs.core._pop[goog.typeOf(null == a ? null : a)];
  if(!b && (b = cljs.core._pop._, !b)) {
    throw cljs.core.missing_protocol("IStack.-pop", a);
  }
  return b.call(null, a)
};
cljs.core.IVector = {};
cljs.core._assoc_n = function(a, b, c) {
  var d;
  d = a ? a.cljs$core$IVector$_assoc_n$arity$3 : a;
  if(d) {
    return a.cljs$core$IVector$_assoc_n$arity$3(a, b, c)
  }
  d = cljs.core._assoc_n[goog.typeOf(null == a ? null : a)];
  if(!d && (d = cljs.core._assoc_n._, !d)) {
    throw cljs.core.missing_protocol("IVector.-assoc-n", a);
  }
  return d.call(null, a, b, c)
};
cljs.core.IDeref = {};
cljs.core._deref = function(a) {
  var b;
  b = a ? a.cljs$core$IDeref$_deref$arity$1 : a;
  if(b) {
    return a.cljs$core$IDeref$_deref$arity$1(a)
  }
  b = cljs.core._deref[goog.typeOf(null == a ? null : a)];
  if(!b && (b = cljs.core._deref._, !b)) {
    throw cljs.core.missing_protocol("IDeref.-deref", a);
  }
  return b.call(null, a)
};
cljs.core.IDerefWithTimeout = {};
cljs.core._deref_with_timeout = function(a, b, c) {
  var d;
  d = a ? a.cljs$core$IDerefWithTimeout$_deref_with_timeout$arity$3 : a;
  if(d) {
    return a.cljs$core$IDerefWithTimeout$_deref_with_timeout$arity$3(a, b, c)
  }
  d = cljs.core._deref_with_timeout[goog.typeOf(null == a ? null : a)];
  if(!d && (d = cljs.core._deref_with_timeout._, !d)) {
    throw cljs.core.missing_protocol("IDerefWithTimeout.-deref-with-timeout", a);
  }
  return d.call(null, a, b, c)
};
cljs.core.IMeta = {};
cljs.core._meta = function(a) {
  var b;
  b = a ? a.cljs$core$IMeta$_meta$arity$1 : a;
  if(b) {
    return a.cljs$core$IMeta$_meta$arity$1(a)
  }
  b = cljs.core._meta[goog.typeOf(null == a ? null : a)];
  if(!b && (b = cljs.core._meta._, !b)) {
    throw cljs.core.missing_protocol("IMeta.-meta", a);
  }
  return b.call(null, a)
};
cljs.core.IWithMeta = {};
cljs.core._with_meta = function(a, b) {
  var c;
  c = a ? a.cljs$core$IWithMeta$_with_meta$arity$2 : a;
  if(c) {
    return a.cljs$core$IWithMeta$_with_meta$arity$2(a, b)
  }
  c = cljs.core._with_meta[goog.typeOf(null == a ? null : a)];
  if(!c && (c = cljs.core._with_meta._, !c)) {
    throw cljs.core.missing_protocol("IWithMeta.-with-meta", a);
  }
  return c.call(null, a, b)
};
cljs.core.IReduce = {};
cljs.core._reduce = function() {
  var a = null, b = function(a, b) {
    var c;
    c = a ? a.cljs$core$IReduce$_reduce$arity$2 : a;
    if(c) {
      return a.cljs$core$IReduce$_reduce$arity$2(a, b)
    }
    c = cljs.core._reduce[goog.typeOf(null == a ? null : a)];
    if(!c && (c = cljs.core._reduce._, !c)) {
      throw cljs.core.missing_protocol("IReduce.-reduce", a);
    }
    return c.call(null, a, b)
  }, c = function(a, b, c) {
    var g;
    g = a ? a.cljs$core$IReduce$_reduce$arity$3 : a;
    if(g) {
      return a.cljs$core$IReduce$_reduce$arity$3(a, b, c)
    }
    g = cljs.core._reduce[goog.typeOf(null == a ? null : a)];
    if(!g && (g = cljs.core._reduce._, !g)) {
      throw cljs.core.missing_protocol("IReduce.-reduce", a);
    }
    return g.call(null, a, b, c)
  }, a = function(a, e, f) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, e);
      case 3:
        return c.call(this, a, e, f)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$3 = c;
  return a
}();
cljs.core.IKVReduce = {};
cljs.core._kv_reduce = function(a, b, c) {
  var d;
  d = a ? a.cljs$core$IKVReduce$_kv_reduce$arity$3 : a;
  if(d) {
    return a.cljs$core$IKVReduce$_kv_reduce$arity$3(a, b, c)
  }
  d = cljs.core._kv_reduce[goog.typeOf(null == a ? null : a)];
  if(!d && (d = cljs.core._kv_reduce._, !d)) {
    throw cljs.core.missing_protocol("IKVReduce.-kv-reduce", a);
  }
  return d.call(null, a, b, c)
};
cljs.core.IEquiv = {};
cljs.core._equiv = function(a, b) {
  var c;
  c = a ? a.cljs$core$IEquiv$_equiv$arity$2 : a;
  if(c) {
    return a.cljs$core$IEquiv$_equiv$arity$2(a, b)
  }
  c = cljs.core._equiv[goog.typeOf(null == a ? null : a)];
  if(!c && (c = cljs.core._equiv._, !c)) {
    throw cljs.core.missing_protocol("IEquiv.-equiv", a);
  }
  return c.call(null, a, b)
};
cljs.core.IHash = {};
cljs.core._hash = function(a) {
  var b;
  b = a ? a.cljs$core$IHash$_hash$arity$1 : a;
  if(b) {
    return a.cljs$core$IHash$_hash$arity$1(a)
  }
  b = cljs.core._hash[goog.typeOf(null == a ? null : a)];
  if(!b && (b = cljs.core._hash._, !b)) {
    throw cljs.core.missing_protocol("IHash.-hash", a);
  }
  return b.call(null, a)
};
cljs.core.ISeqable = {};
cljs.core._seq = function(a) {
  var b;
  b = a ? a.cljs$core$ISeqable$_seq$arity$1 : a;
  if(b) {
    return a.cljs$core$ISeqable$_seq$arity$1(a)
  }
  b = cljs.core._seq[goog.typeOf(null == a ? null : a)];
  if(!b && (b = cljs.core._seq._, !b)) {
    throw cljs.core.missing_protocol("ISeqable.-seq", a);
  }
  return b.call(null, a)
};
cljs.core.ISequential = {};
cljs.core.IList = {};
cljs.core.IRecord = {};
cljs.core.IReversible = {};
cljs.core._rseq = function(a) {
  var b;
  b = a ? a.cljs$core$IReversible$_rseq$arity$1 : a;
  if(b) {
    return a.cljs$core$IReversible$_rseq$arity$1(a)
  }
  b = cljs.core._rseq[goog.typeOf(null == a ? null : a)];
  if(!b && (b = cljs.core._rseq._, !b)) {
    throw cljs.core.missing_protocol("IReversible.-rseq", a);
  }
  return b.call(null, a)
};
cljs.core.ISorted = {};
cljs.core._sorted_seq = function(a, b) {
  var c;
  c = a ? a.cljs$core$ISorted$_sorted_seq$arity$2 : a;
  if(c) {
    return a.cljs$core$ISorted$_sorted_seq$arity$2(a, b)
  }
  c = cljs.core._sorted_seq[goog.typeOf(null == a ? null : a)];
  if(!c && (c = cljs.core._sorted_seq._, !c)) {
    throw cljs.core.missing_protocol("ISorted.-sorted-seq", a);
  }
  return c.call(null, a, b)
};
cljs.core._sorted_seq_from = function(a, b, c) {
  var d;
  d = a ? a.cljs$core$ISorted$_sorted_seq_from$arity$3 : a;
  if(d) {
    return a.cljs$core$ISorted$_sorted_seq_from$arity$3(a, b, c)
  }
  d = cljs.core._sorted_seq_from[goog.typeOf(null == a ? null : a)];
  if(!d && (d = cljs.core._sorted_seq_from._, !d)) {
    throw cljs.core.missing_protocol("ISorted.-sorted-seq-from", a);
  }
  return d.call(null, a, b, c)
};
cljs.core._entry_key = function(a, b) {
  var c;
  c = a ? a.cljs$core$ISorted$_entry_key$arity$2 : a;
  if(c) {
    return a.cljs$core$ISorted$_entry_key$arity$2(a, b)
  }
  c = cljs.core._entry_key[goog.typeOf(null == a ? null : a)];
  if(!c && (c = cljs.core._entry_key._, !c)) {
    throw cljs.core.missing_protocol("ISorted.-entry-key", a);
  }
  return c.call(null, a, b)
};
cljs.core._comparator = function(a) {
  var b;
  b = a ? a.cljs$core$ISorted$_comparator$arity$1 : a;
  if(b) {
    return a.cljs$core$ISorted$_comparator$arity$1(a)
  }
  b = cljs.core._comparator[goog.typeOf(null == a ? null : a)];
  if(!b && (b = cljs.core._comparator._, !b)) {
    throw cljs.core.missing_protocol("ISorted.-comparator", a);
  }
  return b.call(null, a)
};
cljs.core.IWriter = {};
cljs.core._write = function(a, b) {
  var c;
  c = a ? a.cljs$core$IWriter$_write$arity$2 : a;
  if(c) {
    return a.cljs$core$IWriter$_write$arity$2(a, b)
  }
  c = cljs.core._write[goog.typeOf(null == a ? null : a)];
  if(!c && (c = cljs.core._write._, !c)) {
    throw cljs.core.missing_protocol("IWriter.-write", a);
  }
  return c.call(null, a, b)
};
cljs.core._flush = function(a) {
  var b;
  b = a ? a.cljs$core$IWriter$_flush$arity$1 : a;
  if(b) {
    return a.cljs$core$IWriter$_flush$arity$1(a)
  }
  b = cljs.core._flush[goog.typeOf(null == a ? null : a)];
  if(!b && (b = cljs.core._flush._, !b)) {
    throw cljs.core.missing_protocol("IWriter.-flush", a);
  }
  return b.call(null, a)
};
cljs.core.IPrintWithWriter = {};
cljs.core._pr_writer = function(a, b, c) {
  var d;
  d = a ? a.cljs$core$IPrintWithWriter$_pr_writer$arity$3 : a;
  if(d) {
    return a.cljs$core$IPrintWithWriter$_pr_writer$arity$3(a, b, c)
  }
  d = cljs.core._pr_writer[goog.typeOf(null == a ? null : a)];
  if(!d && (d = cljs.core._pr_writer._, !d)) {
    throw cljs.core.missing_protocol("IPrintWithWriter.-pr-writer", a);
  }
  return d.call(null, a, b, c)
};
cljs.core.IPending = {};
cljs.core._realized_QMARK_ = function(a) {
  var b;
  b = a ? a.cljs$core$IPending$_realized_QMARK_$arity$1 : a;
  if(b) {
    return a.cljs$core$IPending$_realized_QMARK_$arity$1(a)
  }
  b = cljs.core._realized_QMARK_[goog.typeOf(null == a ? null : a)];
  if(!b && (b = cljs.core._realized_QMARK_._, !b)) {
    throw cljs.core.missing_protocol("IPending.-realized?", a);
  }
  return b.call(null, a)
};
cljs.core.IWatchable = {};
cljs.core._notify_watches = function(a, b, c) {
  var d;
  d = a ? a.cljs$core$IWatchable$_notify_watches$arity$3 : a;
  if(d) {
    return a.cljs$core$IWatchable$_notify_watches$arity$3(a, b, c)
  }
  d = cljs.core._notify_watches[goog.typeOf(null == a ? null : a)];
  if(!d && (d = cljs.core._notify_watches._, !d)) {
    throw cljs.core.missing_protocol("IWatchable.-notify-watches", a);
  }
  return d.call(null, a, b, c)
};
cljs.core._add_watch = function(a, b, c) {
  var d;
  d = a ? a.cljs$core$IWatchable$_add_watch$arity$3 : a;
  if(d) {
    return a.cljs$core$IWatchable$_add_watch$arity$3(a, b, c)
  }
  d = cljs.core._add_watch[goog.typeOf(null == a ? null : a)];
  if(!d && (d = cljs.core._add_watch._, !d)) {
    throw cljs.core.missing_protocol("IWatchable.-add-watch", a);
  }
  return d.call(null, a, b, c)
};
cljs.core._remove_watch = function(a, b) {
  var c;
  c = a ? a.cljs$core$IWatchable$_remove_watch$arity$2 : a;
  if(c) {
    return a.cljs$core$IWatchable$_remove_watch$arity$2(a, b)
  }
  c = cljs.core._remove_watch[goog.typeOf(null == a ? null : a)];
  if(!c && (c = cljs.core._remove_watch._, !c)) {
    throw cljs.core.missing_protocol("IWatchable.-remove-watch", a);
  }
  return c.call(null, a, b)
};
cljs.core.IEditableCollection = {};
cljs.core._as_transient = function(a) {
  var b;
  b = a ? a.cljs$core$IEditableCollection$_as_transient$arity$1 : a;
  if(b) {
    return a.cljs$core$IEditableCollection$_as_transient$arity$1(a)
  }
  b = cljs.core._as_transient[goog.typeOf(null == a ? null : a)];
  if(!b && (b = cljs.core._as_transient._, !b)) {
    throw cljs.core.missing_protocol("IEditableCollection.-as-transient", a);
  }
  return b.call(null, a)
};
cljs.core.ITransientCollection = {};
cljs.core._conj_BANG_ = function(a, b) {
  var c;
  c = a ? a.cljs$core$ITransientCollection$_conj_BANG_$arity$2 : a;
  if(c) {
    return a.cljs$core$ITransientCollection$_conj_BANG_$arity$2(a, b)
  }
  c = cljs.core._conj_BANG_[goog.typeOf(null == a ? null : a)];
  if(!c && (c = cljs.core._conj_BANG_._, !c)) {
    throw cljs.core.missing_protocol("ITransientCollection.-conj!", a);
  }
  return c.call(null, a, b)
};
cljs.core._persistent_BANG_ = function(a) {
  var b;
  b = a ? a.cljs$core$ITransientCollection$_persistent_BANG_$arity$1 : a;
  if(b) {
    return a.cljs$core$ITransientCollection$_persistent_BANG_$arity$1(a)
  }
  b = cljs.core._persistent_BANG_[goog.typeOf(null == a ? null : a)];
  if(!b && (b = cljs.core._persistent_BANG_._, !b)) {
    throw cljs.core.missing_protocol("ITransientCollection.-persistent!", a);
  }
  return b.call(null, a)
};
cljs.core.ITransientAssociative = {};
cljs.core._assoc_BANG_ = function(a, b, c) {
  var d;
  d = a ? a.cljs$core$ITransientAssociative$_assoc_BANG_$arity$3 : a;
  if(d) {
    return a.cljs$core$ITransientAssociative$_assoc_BANG_$arity$3(a, b, c)
  }
  d = cljs.core._assoc_BANG_[goog.typeOf(null == a ? null : a)];
  if(!d && (d = cljs.core._assoc_BANG_._, !d)) {
    throw cljs.core.missing_protocol("ITransientAssociative.-assoc!", a);
  }
  return d.call(null, a, b, c)
};
cljs.core.ITransientMap = {};
cljs.core._dissoc_BANG_ = function(a, b) {
  var c;
  c = a ? a.cljs$core$ITransientMap$_dissoc_BANG_$arity$2 : a;
  if(c) {
    return a.cljs$core$ITransientMap$_dissoc_BANG_$arity$2(a, b)
  }
  c = cljs.core._dissoc_BANG_[goog.typeOf(null == a ? null : a)];
  if(!c && (c = cljs.core._dissoc_BANG_._, !c)) {
    throw cljs.core.missing_protocol("ITransientMap.-dissoc!", a);
  }
  return c.call(null, a, b)
};
cljs.core.ITransientVector = {};
cljs.core._assoc_n_BANG_ = function(a, b, c) {
  var d;
  d = a ? a.cljs$core$ITransientVector$_assoc_n_BANG_$arity$3 : a;
  if(d) {
    return a.cljs$core$ITransientVector$_assoc_n_BANG_$arity$3(a, b, c)
  }
  d = cljs.core._assoc_n_BANG_[goog.typeOf(null == a ? null : a)];
  if(!d && (d = cljs.core._assoc_n_BANG_._, !d)) {
    throw cljs.core.missing_protocol("ITransientVector.-assoc-n!", a);
  }
  return d.call(null, a, b, c)
};
cljs.core._pop_BANG_ = function(a) {
  var b;
  b = a ? a.cljs$core$ITransientVector$_pop_BANG_$arity$1 : a;
  if(b) {
    return a.cljs$core$ITransientVector$_pop_BANG_$arity$1(a)
  }
  b = cljs.core._pop_BANG_[goog.typeOf(null == a ? null : a)];
  if(!b && (b = cljs.core._pop_BANG_._, !b)) {
    throw cljs.core.missing_protocol("ITransientVector.-pop!", a);
  }
  return b.call(null, a)
};
cljs.core.ITransientSet = {};
cljs.core._disjoin_BANG_ = function(a, b) {
  var c;
  c = a ? a.cljs$core$ITransientSet$_disjoin_BANG_$arity$2 : a;
  if(c) {
    return a.cljs$core$ITransientSet$_disjoin_BANG_$arity$2(a, b)
  }
  c = cljs.core._disjoin_BANG_[goog.typeOf(null == a ? null : a)];
  if(!c && (c = cljs.core._disjoin_BANG_._, !c)) {
    throw cljs.core.missing_protocol("ITransientSet.-disjoin!", a);
  }
  return c.call(null, a, b)
};
cljs.core.IComparable = {};
cljs.core._compare = function(a, b) {
  var c;
  c = a ? a.cljs$core$IComparable$_compare$arity$2 : a;
  if(c) {
    return a.cljs$core$IComparable$_compare$arity$2(a, b)
  }
  c = cljs.core._compare[goog.typeOf(null == a ? null : a)];
  if(!c && (c = cljs.core._compare._, !c)) {
    throw cljs.core.missing_protocol("IComparable.-compare", a);
  }
  return c.call(null, a, b)
};
cljs.core.IChunk = {};
cljs.core._drop_first = function(a) {
  var b;
  b = a ? a.cljs$core$IChunk$_drop_first$arity$1 : a;
  if(b) {
    return a.cljs$core$IChunk$_drop_first$arity$1(a)
  }
  b = cljs.core._drop_first[goog.typeOf(null == a ? null : a)];
  if(!b && (b = cljs.core._drop_first._, !b)) {
    throw cljs.core.missing_protocol("IChunk.-drop-first", a);
  }
  return b.call(null, a)
};
cljs.core.IChunkedSeq = {};
cljs.core._chunked_first = function(a) {
  var b;
  b = a ? a.cljs$core$IChunkedSeq$_chunked_first$arity$1 : a;
  if(b) {
    return a.cljs$core$IChunkedSeq$_chunked_first$arity$1(a)
  }
  b = cljs.core._chunked_first[goog.typeOf(null == a ? null : a)];
  if(!b && (b = cljs.core._chunked_first._, !b)) {
    throw cljs.core.missing_protocol("IChunkedSeq.-chunked-first", a);
  }
  return b.call(null, a)
};
cljs.core._chunked_rest = function(a) {
  var b;
  b = a ? a.cljs$core$IChunkedSeq$_chunked_rest$arity$1 : a;
  if(b) {
    return a.cljs$core$IChunkedSeq$_chunked_rest$arity$1(a)
  }
  b = cljs.core._chunked_rest[goog.typeOf(null == a ? null : a)];
  if(!b && (b = cljs.core._chunked_rest._, !b)) {
    throw cljs.core.missing_protocol("IChunkedSeq.-chunked-rest", a);
  }
  return b.call(null, a)
};
cljs.core.IChunkedNext = {};
cljs.core._chunked_next = function(a) {
  var b;
  b = a ? a.cljs$core$IChunkedNext$_chunked_next$arity$1 : a;
  if(b) {
    return a.cljs$core$IChunkedNext$_chunked_next$arity$1(a)
  }
  b = cljs.core._chunked_next[goog.typeOf(null == a ? null : a)];
  if(!b && (b = cljs.core._chunked_next._, !b)) {
    throw cljs.core.missing_protocol("IChunkedNext.-chunked-next", a);
  }
  return b.call(null, a)
};
cljs.core.INamed = {};
cljs.core._name = function(a) {
  var b;
  b = a ? a.cljs$core$INamed$_name$arity$1 : a;
  if(b) {
    return a.cljs$core$INamed$_name$arity$1(a)
  }
  b = cljs.core._name[goog.typeOf(null == a ? null : a)];
  if(!b && (b = cljs.core._name._, !b)) {
    throw cljs.core.missing_protocol("INamed.-name", a);
  }
  return b.call(null, a)
};
cljs.core._namespace = function(a) {
  var b;
  b = a ? a.cljs$core$INamed$_namespace$arity$1 : a;
  if(b) {
    return a.cljs$core$INamed$_namespace$arity$1(a)
  }
  b = cljs.core._namespace[goog.typeOf(null == a ? null : a)];
  if(!b && (b = cljs.core._namespace._, !b)) {
    throw cljs.core.missing_protocol("INamed.-namespace", a);
  }
  return b.call(null, a)
};
cljs.core.StringBufferWriter = function(a) {
  this.sb = a;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 1073741824
};
cljs.core.StringBufferWriter.cljs$lang$type = !0;
cljs.core.StringBufferWriter.cljs$lang$ctorStr = "cljs.core/StringBufferWriter";
cljs.core.StringBufferWriter.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write(b, "cljs.core/StringBufferWriter")
};
cljs.core.StringBufferWriter.prototype.cljs$core$IWriter$_write$arity$2 = function(a, b) {
  return this.sb.append(b)
};
cljs.core.StringBufferWriter.prototype.cljs$core$IWriter$_flush$arity$1 = function() {
  return null
};
cljs.core.__GT_StringBufferWriter = function(a) {
  return new cljs.core.StringBufferWriter(a)
};
cljs.core.pr_str_STAR_ = function(a) {
  var b = new goog.string.StringBuffer, c = new cljs.core.StringBufferWriter(b);
  a.cljs$core$IPrintWithWriter$_pr_writer$arity$3(a, c, cljs.core.pr_opts());
  cljs.core._flush(c);
  return"" + cljs.core.str(b)
};
cljs.core.instance_QMARK_ = function(a, b) {
  return b instanceof a
};
cljs.core.symbol_QMARK_ = function(a) {
  return a instanceof cljs.core.Symbol
};
cljs.core.Symbol = function(a, b, c, d, e) {
  this.ns = a;
  this.name = b;
  this.str = c;
  this._hash = d;
  this._meta = e;
  this.cljs$lang$protocol_mask$partition0$ = 2154168321;
  this.cljs$lang$protocol_mask$partition1$ = 4096
};
cljs.core.Symbol.cljs$lang$type = !0;
cljs.core.Symbol.cljs$lang$ctorStr = "cljs.core/Symbol";
cljs.core.Symbol.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write(b, "cljs.core/Symbol")
};
cljs.core.Symbol.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = function(a, b) {
  return cljs.core._write(b, this.str)
};
cljs.core.Symbol.prototype.cljs$core$INamed$_name$arity$1 = function() {
  return this.name
};
cljs.core.Symbol.prototype.cljs$core$INamed$_namespace$arity$1 = function() {
  return this.ns
};
cljs.core.Symbol.prototype.cljs$core$IHash$_hash$arity$1 = function() {
  -1 === this._hash && (this._hash = cljs.core.hash_combine.cljs$core$IFn$_invoke$arity$2 ? cljs.core.hash_combine.cljs$core$IFn$_invoke$arity$2(cljs.core.hash.cljs$core$IFn$_invoke$arity$1 ? cljs.core.hash.cljs$core$IFn$_invoke$arity$1(this.ns) : cljs.core.hash.call(null, this.ns), cljs.core.hash.cljs$core$IFn$_invoke$arity$1 ? cljs.core.hash.cljs$core$IFn$_invoke$arity$1(this.name) : cljs.core.hash.call(null, this.name)) : cljs.core.hash_combine.call(null, cljs.core.hash.cljs$core$IFn$_invoke$arity$1 ? 
  cljs.core.hash.cljs$core$IFn$_invoke$arity$1(this.ns) : cljs.core.hash.call(null, this.ns), cljs.core.hash.cljs$core$IFn$_invoke$arity$1 ? cljs.core.hash.cljs$core$IFn$_invoke$arity$1(this.name) : cljs.core.hash.call(null, this.name)));
  return this._hash
};
cljs.core.Symbol.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(a, b) {
  return new cljs.core.Symbol(this.ns, this.name, this.str, this._hash, b)
};
cljs.core.Symbol.prototype.cljs$core$IMeta$_meta$arity$1 = function() {
  return this._meta
};
cljs.core.Symbol.prototype.call = function() {
  var a = null;
  return a = function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return cljs.core._lookup.cljs$core$IFn$_invoke$arity$3(c, this, null);
      case 3:
        return cljs.core._lookup.cljs$core$IFn$_invoke$arity$3(c, this, d)
    }
    throw Error("Invalid arity: " + arguments.length);
  }
}();
cljs.core.Symbol.prototype.apply = function(a, b) {
  a = this;
  return a.call.apply(a, [a].concat(b.slice()))
};
cljs.core.Symbol.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(a, b) {
  return b instanceof cljs.core.Symbol ? this.str === b.str : !1
};
cljs.core.Symbol.prototype.toString = function() {
  return this.str
};
cljs.core.__GT_Symbol = function(a, b, c, d, e) {
  return new cljs.core.Symbol(a, b, c, d, e)
};
cljs.core.symbol = function() {
  var a = null, b = function(b) {
    return b instanceof cljs.core.Symbol ? b : a.cljs$core$IFn$_invoke$arity$2(null, b)
  }, c = function(a, b) {
    var c = null != a ? [cljs.core.str(a), cljs.core.str("/"), cljs.core.str(b)].join("") : b;
    return new cljs.core.Symbol(a, b, c, -1, null)
  }, a = function(a, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, e)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$2 = c;
  return a
}();
cljs.core.seq = function(a) {
  if(null == a) {
    return null
  }
  var b;
  a ? (b = (b = a.cljs$lang$protocol_mask$partition0$ & 8388608) ? b : a.cljs$core$ISeqable$, b = b ? !0 : !1) : b = !1;
  if(b) {
    return a.cljs$core$ISeqable$_seq$arity$1(a)
  }
  if(a instanceof Array || cljs.core.string_QMARK_(a)) {
    return 0 === a.length ? null : new cljs.core.IndexedSeq(a, 0)
  }
  if(cljs.core.type_satisfies_(cljs.core.ILookup, a)) {
    return cljs.core._seq(a)
  }
  throw Error([cljs.core.str(a), cljs.core.str("is not ISeqable")].join(""));
};
cljs.core.first = function(a) {
  if(null == a) {
    return null
  }
  var b;
  a ? (b = (b = a.cljs$lang$protocol_mask$partition0$ & 64) ? b : a.cljs$core$ISeq$, b = b ? !0 : !1) : b = !1;
  if(b) {
    return a.cljs$core$ISeq$_first$arity$1(a)
  }
  a = cljs.core.seq(a);
  return null == a ? null : cljs.core._first(a)
};
cljs.core.rest = function(a) {
  if(null != a) {
    var b;
    a ? (b = (b = a.cljs$lang$protocol_mask$partition0$ & 64) ? b : a.cljs$core$ISeq$, b = b ? !0 : !1) : b = !1;
    if(b) {
      return a.cljs$core$ISeq$_rest$arity$1(a)
    }
    a = cljs.core.seq(a);
    return null != a ? cljs.core._rest(a) : cljs.core.List.EMPTY
  }
  return cljs.core.List.EMPTY
};
cljs.core.next = function(a) {
  if(null == a) {
    a = null
  }else {
    var b;
    a ? (b = (b = a.cljs$lang$protocol_mask$partition0$ & 128) ? b : a.cljs$core$INext$, b = b ? !0 : !1) : b = !1;
    a = b ? a.cljs$core$INext$_next$arity$1(a) : cljs.core.seq(cljs.core.rest(a))
  }
  return a
};
cljs.core._EQ_ = function() {
  var a = null, b = function(a, b) {
    var c = a === b;
    return c ? c : cljs.core._equiv(a, b)
  }, c = function(b, c, d) {
    for(;;) {
      if(cljs.core.truth_(a.cljs$core$IFn$_invoke$arity$2(b, c))) {
        if(cljs.core.next(d)) {
          b = c, c = cljs.core.first(d), d = cljs.core.next(d)
        }else {
          return a.cljs$core$IFn$_invoke$arity$2(c, cljs.core.first(d))
        }
      }else {
        return!1
      }
    }
  }, d = function(a, b, d) {
    var h = null;
    2 < arguments.length && (h = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
    return c.call(this, a, b, h)
  };
  d.cljs$lang$maxFixedArity = 2;
  d.cljs$lang$applyTo = function(a) {
    var b = cljs.core.first(a), a = cljs.core.next(a), d = cljs.core.first(a), a = cljs.core.rest(a);
    return c(b, d, a)
  };
  d.cljs$core$IFn$_invoke$arity$variadic = c;
  a = function(a, c, g) {
    switch(arguments.length) {
      case 1:
        return!0;
      case 2:
        return b.call(this, a, c);
      default:
        return d.cljs$core$IFn$_invoke$arity$variadic(a, c, cljs.core.array_seq(arguments, 2))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = d.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$1 = function() {
    return!0
  };
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$variadic = d.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
cljs.core.IHash["null"] = !0;
cljs.core._hash["null"] = function() {
  return 0
};
cljs.core.INext["null"] = !0;
cljs.core._next["null"] = function() {
  return null
};
cljs.core.IKVReduce["null"] = !0;
cljs.core._kv_reduce["null"] = function(a, b, c) {
  return c
};
cljs.core.ISet["null"] = !0;
cljs.core._disjoin["null"] = function() {
  return null
};
cljs.core.ICounted["null"] = !0;
cljs.core._count["null"] = function() {
  return 0
};
cljs.core.IStack["null"] = !0;
cljs.core._peek["null"] = function() {
  return null
};
cljs.core._pop["null"] = function() {
  return null
};
cljs.core.IEquiv["null"] = !0;
cljs.core._equiv["null"] = function(a, b) {
  return null == b
};
cljs.core.IWithMeta["null"] = !0;
cljs.core._with_meta["null"] = function() {
  return null
};
cljs.core.IMeta["null"] = !0;
cljs.core._meta["null"] = function() {
  return null
};
cljs.core.IEmptyableCollection["null"] = !0;
cljs.core._empty["null"] = function() {
  return null
};
cljs.core.IMap["null"] = !0;
cljs.core._dissoc["null"] = function() {
  return null
};
Date.prototype.cljs$core$IEquiv$ = !0;
Date.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(a, b) {
  var c = b instanceof Date;
  return c ? a.toString() === b.toString() : c
};
cljs.core.IHash.number = !0;
cljs.core._hash.number = function(a) {
  return Math.floor(a) % 2147483647
};
cljs.core.IEquiv.number = !0;
cljs.core._equiv.number = function(a, b) {
  return a === b
};
cljs.core.IHash["boolean"] = !0;
cljs.core._hash["boolean"] = function(a) {
  return!0 === a ? 1 : 0
};
cljs.core.IMeta["function"] = !0;
cljs.core._meta["function"] = function() {
  return null
};
cljs.core.Fn["function"] = !0;
cljs.core.IHash._ = !0;
cljs.core._hash._ = function(a) {
  return goog.getUid(a)
};
cljs.core.inc = function(a) {
  return a + 1
};
cljs.core.Reduced = function(a) {
  this.val = a;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 32768
};
cljs.core.Reduced.cljs$lang$type = !0;
cljs.core.Reduced.cljs$lang$ctorStr = "cljs.core/Reduced";
cljs.core.Reduced.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write(b, "cljs.core/Reduced")
};
cljs.core.Reduced.prototype.cljs$core$IDeref$_deref$arity$1 = function() {
  return this.val
};
cljs.core.__GT_Reduced = function(a) {
  return new cljs.core.Reduced(a)
};
cljs.core.reduced = function(a) {
  return new cljs.core.Reduced(a)
};
cljs.core.reduced_QMARK_ = function(a) {
  return a instanceof cljs.core.Reduced
};
cljs.core.ci_reduce = function() {
  var a = null, b = function(a, b) {
    var c = cljs.core._count(a);
    if(0 === c) {
      return b.cljs$core$IFn$_invoke$arity$0 ? b.cljs$core$IFn$_invoke$arity$0() : b.call(null)
    }
    for(var d = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(a, 0), i = 1;;) {
      if(i < c) {
        d = b.cljs$core$IFn$_invoke$arity$2 ? b.cljs$core$IFn$_invoke$arity$2(d, cljs.core._nth.cljs$core$IFn$_invoke$arity$2(a, i)) : b.call(null, d, cljs.core._nth.cljs$core$IFn$_invoke$arity$2(a, i));
        if(cljs.core.reduced_QMARK_(d)) {
          return cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(d) : cljs.core.deref.call(null, d)
        }
        i += 1
      }else {
        return d
      }
    }
  }, c = function(a, b, c) {
    for(var d = cljs.core._count(a), i = 0;;) {
      if(i < d) {
        c = b.cljs$core$IFn$_invoke$arity$2 ? b.cljs$core$IFn$_invoke$arity$2(c, cljs.core._nth.cljs$core$IFn$_invoke$arity$2(a, i)) : b.call(null, c, cljs.core._nth.cljs$core$IFn$_invoke$arity$2(a, i));
        if(cljs.core.reduced_QMARK_(c)) {
          return cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(c) : cljs.core.deref.call(null, c)
        }
        i += 1
      }else {
        return c
      }
    }
  }, d = function(a, b, c, d) {
    for(var i = cljs.core._count(a);;) {
      if(d < i) {
        c = b.cljs$core$IFn$_invoke$arity$2 ? b.cljs$core$IFn$_invoke$arity$2(c, cljs.core._nth.cljs$core$IFn$_invoke$arity$2(a, d)) : b.call(null, c, cljs.core._nth.cljs$core$IFn$_invoke$arity$2(a, d));
        if(cljs.core.reduced_QMARK_(c)) {
          return cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(c) : cljs.core.deref.call(null, c)
        }
        d += 1
      }else {
        return c
      }
    }
  }, a = function(a, f, g, h) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, f);
      case 3:
        return c.call(this, a, f, g);
      case 4:
        return d.call(this, a, f, g, h)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$3 = c;
  a.cljs$core$IFn$_invoke$arity$4 = d;
  return a
}();
cljs.core.array_reduce = function() {
  var a = null, b = function(a, b) {
    var c = a.length;
    if(0 === a.length) {
      return b.cljs$core$IFn$_invoke$arity$0 ? b.cljs$core$IFn$_invoke$arity$0() : b.call(null)
    }
    for(var d = a[0], i = 1;;) {
      if(i < c) {
        d = b.cljs$core$IFn$_invoke$arity$2 ? b.cljs$core$IFn$_invoke$arity$2(d, a[i]) : b.call(null, d, a[i]);
        if(cljs.core.reduced_QMARK_(d)) {
          return cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(d) : cljs.core.deref.call(null, d)
        }
        i += 1
      }else {
        return d
      }
    }
  }, c = function(a, b, c) {
    for(var d = a.length, i = 0;;) {
      if(i < d) {
        c = b.cljs$core$IFn$_invoke$arity$2 ? b.cljs$core$IFn$_invoke$arity$2(c, a[i]) : b.call(null, c, a[i]);
        if(cljs.core.reduced_QMARK_(c)) {
          return cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(c) : cljs.core.deref.call(null, c)
        }
        i += 1
      }else {
        return c
      }
    }
  }, d = function(a, b, c, d) {
    for(var i = a.length;;) {
      if(d < i) {
        c = b.cljs$core$IFn$_invoke$arity$2 ? b.cljs$core$IFn$_invoke$arity$2(c, a[d]) : b.call(null, c, a[d]);
        if(cljs.core.reduced_QMARK_(c)) {
          return cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(c) : cljs.core.deref.call(null, c)
        }
        d += 1
      }else {
        return c
      }
    }
  }, a = function(a, f, g, h) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, f);
      case 3:
        return c.call(this, a, f, g);
      case 4:
        return d.call(this, a, f, g, h)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$3 = c;
  a.cljs$core$IFn$_invoke$arity$4 = d;
  return a
}();
cljs.core.counted_QMARK_ = function(a) {
  if(a) {
    var b;
    b = (b = a.cljs$lang$protocol_mask$partition0$ & 2) ? b : a.cljs$core$ICounted$;
    return b ? !0 : a.cljs$lang$protocol_mask$partition0$ ? !1 : cljs.core.type_satisfies_(cljs.core.ICounted, a)
  }
  return cljs.core.type_satisfies_(cljs.core.ICounted, a)
};
cljs.core.indexed_QMARK_ = function(a) {
  if(a) {
    var b;
    b = (b = a.cljs$lang$protocol_mask$partition0$ & 16) ? b : a.cljs$core$IIndexed$;
    return b ? !0 : a.cljs$lang$protocol_mask$partition0$ ? !1 : cljs.core.type_satisfies_(cljs.core.IIndexed, a)
  }
  return cljs.core.type_satisfies_(cljs.core.IIndexed, a)
};
cljs.core.IndexedSeq = function(a, b) {
  this.arr = a;
  this.i = b;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 166199550
};
cljs.core.IndexedSeq.cljs$lang$type = !0;
cljs.core.IndexedSeq.cljs$lang$ctorStr = "cljs.core/IndexedSeq";
cljs.core.IndexedSeq.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write(b, "cljs.core/IndexedSeq")
};
cljs.core.IndexedSeq.prototype.cljs$core$IHash$_hash$arity$1 = function(a) {
  return cljs.core.hash_coll.cljs$core$IFn$_invoke$arity$1 ? cljs.core.hash_coll.cljs$core$IFn$_invoke$arity$1(a) : cljs.core.hash_coll.call(null, a)
};
cljs.core.IndexedSeq.prototype.cljs$core$INext$_next$arity$1 = function() {
  return this.i + 1 < this.arr.length ? new cljs.core.IndexedSeq(this.arr, this.i + 1) : null
};
cljs.core.IndexedSeq.prototype.cljs$core$ICollection$_conj$arity$2 = function(a, b) {
  return cljs.core.cons.cljs$core$IFn$_invoke$arity$2 ? cljs.core.cons.cljs$core$IFn$_invoke$arity$2(b, a) : cljs.core.cons.call(null, b, a)
};
cljs.core.IndexedSeq.prototype.cljs$core$IReversible$_rseq$arity$1 = function(a) {
  var b = a.cljs$core$ICounted$_count$arity$1(a);
  return 0 < b ? new cljs.core.RSeq(a, b - 1, null) : cljs.core.List.EMPTY
};
cljs.core.IndexedSeq.prototype.toString = function() {
  return cljs.core.pr_str_STAR_(this)
};
cljs.core.IndexedSeq.prototype.cljs$core$IReduce$_reduce$arity$2 = function(a, b) {
  return cljs.core.array_reduce.cljs$core$IFn$_invoke$arity$4(this.arr, b, this.arr[this.i], this.i + 1)
};
cljs.core.IndexedSeq.prototype.cljs$core$IReduce$_reduce$arity$3 = function(a, b, c) {
  return cljs.core.array_reduce.cljs$core$IFn$_invoke$arity$4(this.arr, b, c, this.i)
};
cljs.core.IndexedSeq.prototype.cljs$core$ISeqable$_seq$arity$1 = function(a) {
  return a
};
cljs.core.IndexedSeq.prototype.cljs$core$ICounted$_count$arity$1 = function() {
  return this.arr.length - this.i
};
cljs.core.IndexedSeq.prototype.cljs$core$ISeq$_first$arity$1 = function() {
  return this.arr[this.i]
};
cljs.core.IndexedSeq.prototype.cljs$core$ISeq$_rest$arity$1 = function() {
  return this.i + 1 < this.arr.length ? new cljs.core.IndexedSeq(this.arr, this.i + 1) : cljs.core.list.cljs$core$IFn$_invoke$arity$0 ? cljs.core.list.cljs$core$IFn$_invoke$arity$0() : cljs.core.list.call(null)
};
cljs.core.IndexedSeq.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(a, b) {
  return cljs.core.equiv_sequential.cljs$core$IFn$_invoke$arity$2 ? cljs.core.equiv_sequential.cljs$core$IFn$_invoke$arity$2(a, b) : cljs.core.equiv_sequential.call(null, a, b)
};
cljs.core.IndexedSeq.prototype.cljs$core$IIndexed$_nth$arity$2 = function(a, b) {
  var c = b + this.i;
  return c < this.arr.length ? this.arr[c] : null
};
cljs.core.IndexedSeq.prototype.cljs$core$IIndexed$_nth$arity$3 = function(a, b, c) {
  a = b + this.i;
  return a < this.arr.length ? this.arr[a] : c
};
cljs.core.IndexedSeq.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function() {
  return cljs.core.List.EMPTY
};
cljs.core.__GT_IndexedSeq = function(a, b) {
  return new cljs.core.IndexedSeq(a, b)
};
cljs.core.prim_seq = function() {
  var a = null, b = function(b) {
    return a.cljs$core$IFn$_invoke$arity$2(b, 0)
  }, c = function(a, b) {
    return b < a.length ? new cljs.core.IndexedSeq(a, b) : null
  }, a = function(a, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, e)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$2 = c;
  return a
}();
cljs.core.array_seq = function() {
  var a = null, b = function(a) {
    return cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(a, 0)
  }, c = function(a, b) {
    return cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(a, b)
  }, a = function(a, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, e)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$2 = c;
  return a
}();
cljs.core.IReduce.array = !0;
cljs.core._reduce.array = function(a, b) {
  return cljs.core.array_reduce.cljs$core$IFn$_invoke$arity$2(a, b)
};
cljs.core._reduce.array = function(a, b, c) {
  return cljs.core.array_reduce.cljs$core$IFn$_invoke$arity$3(a, b, c)
};
cljs.core.RSeq = function(a, b, c) {
  this.ci = a;
  this.i = b;
  this.meta = c;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 31850574
};
cljs.core.RSeq.cljs$lang$type = !0;
cljs.core.RSeq.cljs$lang$ctorStr = "cljs.core/RSeq";
cljs.core.RSeq.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write(b, "cljs.core/RSeq")
};
cljs.core.RSeq.prototype.cljs$core$IHash$_hash$arity$1 = function(a) {
  return cljs.core.hash_coll.cljs$core$IFn$_invoke$arity$1 ? cljs.core.hash_coll.cljs$core$IFn$_invoke$arity$1(a) : cljs.core.hash_coll.call(null, a)
};
cljs.core.RSeq.prototype.cljs$core$ICollection$_conj$arity$2 = function(a, b) {
  return cljs.core.cons.cljs$core$IFn$_invoke$arity$2 ? cljs.core.cons.cljs$core$IFn$_invoke$arity$2(b, a) : cljs.core.cons.call(null, b, a)
};
cljs.core.RSeq.prototype.toString = function() {
  return cljs.core.pr_str_STAR_(this)
};
cljs.core.RSeq.prototype.cljs$core$ISeqable$_seq$arity$1 = function(a) {
  return a
};
cljs.core.RSeq.prototype.cljs$core$ICounted$_count$arity$1 = function() {
  return this.i + 1
};
cljs.core.RSeq.prototype.cljs$core$ISeq$_first$arity$1 = function() {
  return cljs.core._nth.cljs$core$IFn$_invoke$arity$2(this.ci, this.i)
};
cljs.core.RSeq.prototype.cljs$core$ISeq$_rest$arity$1 = function() {
  return 0 < this.i ? new cljs.core.RSeq(this.ci, this.i - 1, null) : cljs.core.List.EMPTY
};
cljs.core.RSeq.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(a, b) {
  return cljs.core.equiv_sequential.cljs$core$IFn$_invoke$arity$2 ? cljs.core.equiv_sequential.cljs$core$IFn$_invoke$arity$2(a, b) : cljs.core.equiv_sequential.call(null, a, b)
};
cljs.core.RSeq.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(a, b) {
  return new cljs.core.RSeq(this.ci, this.i, b)
};
cljs.core.RSeq.prototype.cljs$core$IMeta$_meta$arity$1 = function() {
  return this.meta
};
cljs.core.RSeq.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function() {
  return cljs.core.with_meta.cljs$core$IFn$_invoke$arity$2 ? cljs.core.with_meta.cljs$core$IFn$_invoke$arity$2(cljs.core.List.EMPTY, this.meta) : cljs.core.with_meta.call(null, cljs.core.List.EMPTY, this.meta)
};
cljs.core.__GT_RSeq = function(a, b, c) {
  return new cljs.core.RSeq(a, b, c)
};
cljs.core.second = function(a) {
  return cljs.core.first(cljs.core.next(a))
};
cljs.core.ffirst = function(a) {
  return cljs.core.first(cljs.core.first(a))
};
cljs.core.nfirst = function(a) {
  return cljs.core.next(cljs.core.first(a))
};
cljs.core.fnext = function(a) {
  return cljs.core.first(cljs.core.next(a))
};
cljs.core.nnext = function(a) {
  return cljs.core.next(cljs.core.next(a))
};
cljs.core.last = function(a) {
  for(;;) {
    var b = cljs.core.next(a);
    if(null != b) {
      a = b
    }else {
      return cljs.core.first(a)
    }
  }
};
cljs.core.IEquiv._ = !0;
cljs.core._equiv._ = function(a, b) {
  return a === b
};
cljs.core.conj = function() {
  var a = null, b = function(a, b) {
    return null != a ? cljs.core._conj(a, b) : cljs.core.list.cljs$core$IFn$_invoke$arity$1 ? cljs.core.list.cljs$core$IFn$_invoke$arity$1(b) : cljs.core.list.call(null, b)
  }, c = function(b, c, d) {
    for(;;) {
      if(cljs.core.truth_(d)) {
        b = a.cljs$core$IFn$_invoke$arity$2(b, c), c = cljs.core.first(d), d = cljs.core.next(d)
      }else {
        return a.cljs$core$IFn$_invoke$arity$2(b, c)
      }
    }
  }, d = function(a, b, d) {
    var h = null;
    2 < arguments.length && (h = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
    return c.call(this, a, b, h)
  };
  d.cljs$lang$maxFixedArity = 2;
  d.cljs$lang$applyTo = function(a) {
    var b = cljs.core.first(a), a = cljs.core.next(a), d = cljs.core.first(a), a = cljs.core.rest(a);
    return c(b, d, a)
  };
  d.cljs$core$IFn$_invoke$arity$variadic = c;
  a = function(a, c, g) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, c);
      default:
        return d.cljs$core$IFn$_invoke$arity$variadic(a, c, cljs.core.array_seq(arguments, 2))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = d.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$variadic = d.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
cljs.core.empty = function(a) {
  return cljs.core._empty(a)
};
cljs.core.accumulating_seq_count = function(a) {
  for(var a = cljs.core.seq(a), b = 0;;) {
    if(cljs.core.counted_QMARK_(a)) {
      return b + cljs.core._count(a)
    }
    a = cljs.core.next(a);
    b += 1
  }
};
cljs.core.count = function(a) {
  if(null != a) {
    var b;
    a ? (b = (b = a.cljs$lang$protocol_mask$partition0$ & 2) ? b : a.cljs$core$ICounted$, b = b ? !0 : !1) : b = !1;
    a = b ? a.cljs$core$ICounted$_count$arity$1(a) : a instanceof Array ? a.length : cljs.core.string_QMARK_(a) ? a.length : cljs.core.type_satisfies_(cljs.core.ICounted, a) ? cljs.core._count(a) : cljs.core.accumulating_seq_count(a)
  }else {
    a = 0
  }
  return a
};
cljs.core.linear_traversal_nth = function() {
  var a = null, b = function(a, b) {
    for(;;) {
      if(null == a) {
        throw Error("Index out of bounds");
      }
      if(0 === b) {
        if(cljs.core.seq(a)) {
          return cljs.core.first(a)
        }
        throw Error("Index out of bounds");
      }
      if(cljs.core.indexed_QMARK_(a)) {
        return cljs.core._nth.cljs$core$IFn$_invoke$arity$2(a, b)
      }
      if(cljs.core.seq(a)) {
        var c = cljs.core.next(a), g = b - 1, a = c, b = g
      }else {
        throw Error("Index out of bounds");
      }
    }
  }, c = function(a, b, c) {
    for(;;) {
      if(null == a) {
        return c
      }
      if(0 === b) {
        return cljs.core.seq(a) ? cljs.core.first(a) : c
      }
      if(cljs.core.indexed_QMARK_(a)) {
        return cljs.core._nth.cljs$core$IFn$_invoke$arity$3(a, b, c)
      }
      if(cljs.core.seq(a)) {
        a = cljs.core.next(a), b -= 1
      }else {
        return c
      }
    }
  }, a = function(a, e, f) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, e);
      case 3:
        return c.call(this, a, e, f)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$3 = c;
  return a
}();
cljs.core.nth = function() {
  var a = null, b = function(a, b) {
    var c;
    null == a ? c = null : (a ? (c = (c = a.cljs$lang$protocol_mask$partition0$ & 16) ? c : a.cljs$core$IIndexed$, c = c ? !0 : !1) : c = !1, c = c ? a.cljs$core$IIndexed$_nth$arity$2(a, Math.floor(b)) : a instanceof Array ? b < a.length ? a[b] : null : cljs.core.string_QMARK_(a) ? b < a.length ? a[b] : null : cljs.core.type_satisfies_(cljs.core.IIndexed, a) ? cljs.core._nth.cljs$core$IFn$_invoke$arity$2(a, b) : cljs.core.linear_traversal_nth.cljs$core$IFn$_invoke$arity$2(a, Math.floor(b)));
    return c
  }, c = function(a, b, c) {
    if(null != a) {
      var g;
      a ? (g = (g = a.cljs$lang$protocol_mask$partition0$ & 16) ? g : a.cljs$core$IIndexed$, g = g ? !0 : !1) : g = !1;
      a = g ? a.cljs$core$IIndexed$_nth$arity$3(a, Math.floor(b), c) : a instanceof Array ? b < a.length ? a[b] : c : cljs.core.string_QMARK_(a) ? b < a.length ? a[b] : c : cljs.core.type_satisfies_(cljs.core.IIndexed, a) ? cljs.core._nth.cljs$core$IFn$_invoke$arity$2(a, b) : cljs.core.linear_traversal_nth.cljs$core$IFn$_invoke$arity$3(a, Math.floor(b), c)
    }else {
      a = c
    }
    return a
  }, a = function(a, e, f) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, e);
      case 3:
        return c.call(this, a, e, f)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$3 = c;
  return a
}();
cljs.core.get = function() {
  var a = null, b = function(a, b) {
    var c;
    null == a ? c = null : (a ? (c = (c = a.cljs$lang$protocol_mask$partition0$ & 256) ? c : a.cljs$core$ILookup$, c = c ? !0 : !1) : c = !1, c = c ? a.cljs$core$ILookup$_lookup$arity$2(a, b) : a instanceof Array ? b < a.length ? a[b] : null : cljs.core.string_QMARK_(a) ? b < a.length ? a[b] : null : cljs.core.type_satisfies_(cljs.core.ILookup, a) ? cljs.core._lookup.cljs$core$IFn$_invoke$arity$2(a, b) : null);
    return c
  }, c = function(a, b, c) {
    if(null != a) {
      var g;
      a ? (g = (g = a.cljs$lang$protocol_mask$partition0$ & 256) ? g : a.cljs$core$ILookup$, g = g ? !0 : !1) : g = !1;
      a = g ? a.cljs$core$ILookup$_lookup$arity$3(a, b, c) : a instanceof Array ? b < a.length ? a[b] : c : cljs.core.string_QMARK_(a) ? b < a.length ? a[b] : c : cljs.core.type_satisfies_(cljs.core.ILookup, a) ? cljs.core._lookup.cljs$core$IFn$_invoke$arity$3(a, b, c) : c
    }else {
      a = c
    }
    return a
  }, a = function(a, e, f) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, e);
      case 3:
        return c.call(this, a, e, f)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$3 = c;
  return a
}();
cljs.core.assoc = function() {
  var a = null, b = function(a, b, c) {
    return null != a ? cljs.core._assoc(a, b, c) : cljs.core.hash_map.cljs$core$IFn$_invoke$arity$2 ? cljs.core.hash_map.cljs$core$IFn$_invoke$arity$2(b, c) : cljs.core.hash_map.call(null, b, c)
  }, c = function(b, c, d, h) {
    for(;;) {
      if(b = a.cljs$core$IFn$_invoke$arity$3(b, c, d), cljs.core.truth_(h)) {
        c = cljs.core.first(h), d = cljs.core.second(h), h = cljs.core.nnext(h)
      }else {
        return b
      }
    }
  }, d = function(a, b, d, h) {
    var i = null;
    3 < arguments.length && (i = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
    return c.call(this, a, b, d, i)
  };
  d.cljs$lang$maxFixedArity = 3;
  d.cljs$lang$applyTo = function(a) {
    var b = cljs.core.first(a), a = cljs.core.next(a), d = cljs.core.first(a), a = cljs.core.next(a), h = cljs.core.first(a), a = cljs.core.rest(a);
    return c(b, d, h, a)
  };
  d.cljs$core$IFn$_invoke$arity$variadic = c;
  a = function(a, c, g, h) {
    switch(arguments.length) {
      case 3:
        return b.call(this, a, c, g);
      default:
        return d.cljs$core$IFn$_invoke$arity$variadic(a, c, g, cljs.core.array_seq(arguments, 3))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 3;
  a.cljs$lang$applyTo = d.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$3 = b;
  a.cljs$core$IFn$_invoke$arity$variadic = d.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
cljs.core.dissoc = function() {
  var a = null, b = function(a, b) {
    return cljs.core._dissoc(a, b)
  }, c = function(b, c, d) {
    for(;;) {
      if(b = a.cljs$core$IFn$_invoke$arity$2(b, c), cljs.core.truth_(d)) {
        c = cljs.core.first(d), d = cljs.core.next(d)
      }else {
        return b
      }
    }
  }, d = function(a, b, d) {
    var h = null;
    2 < arguments.length && (h = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
    return c.call(this, a, b, h)
  };
  d.cljs$lang$maxFixedArity = 2;
  d.cljs$lang$applyTo = function(a) {
    var b = cljs.core.first(a), a = cljs.core.next(a), d = cljs.core.first(a), a = cljs.core.rest(a);
    return c(b, d, a)
  };
  d.cljs$core$IFn$_invoke$arity$variadic = c;
  a = function(a, c, g) {
    switch(arguments.length) {
      case 1:
        return a;
      case 2:
        return b.call(this, a, c);
      default:
        return d.cljs$core$IFn$_invoke$arity$variadic(a, c, cljs.core.array_seq(arguments, 2))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = d.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$1 = function(a) {
    return a
  };
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$variadic = d.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
cljs.core.fn_QMARK_ = function(a) {
  var b = goog.isFunction(a);
  return b ? b : a ? cljs.core.truth_(cljs.core.truth_(null) ? null : a.cljs$core$Fn$) ? !0 : a.cljs$lang$protocol_mask$partition$ ? !1 : cljs.core.type_satisfies_(cljs.core.Fn, a) : cljs.core.type_satisfies_(cljs.core.Fn, a)
};
cljs.core.with_meta = function with_meta(b, c) {
  var d = cljs.core.fn_QMARK_(b);
  d && (d = b ? ((d = b.cljs$lang$protocol_mask$partition0$ & 262144) ? d : b.cljs$core$IWithMeta$) || (b.cljs$lang$protocol_mask$partition0$ ? 0 : cljs.core.type_satisfies_(cljs.core.IWithMeta, b)) : cljs.core.type_satisfies_(cljs.core.IWithMeta, b), d = !d);
  if(d) {
    if(void 0 === cljs.core.t8001) {
      cljs.core.t8001 = {};
      cljs.core.t8001 = function(b, c, d, e) {
        this.meta = b;
        this.o = c;
        this.with_meta = d;
        this.meta8002 = e;
        this.cljs$lang$protocol_mask$partition1$ = 0;
        this.cljs$lang$protocol_mask$partition0$ = 393217
      };
      cljs.core.t8001.cljs$lang$type = !0;
      cljs.core.t8001.cljs$lang$ctorStr = "cljs.core/t8001";
      cljs.core.t8001.cljs$lang$ctorPrWriter = function(b, c) {
        return cljs.core._write(c, "cljs.core/t8001")
      };
      var d = cljs.core.t8001.prototype, e = function(b, c) {
        return cljs.core.apply.cljs$core$IFn$_invoke$arity$2 ? cljs.core.apply.cljs$core$IFn$_invoke$arity$2(b.o, c) : cljs.core.apply.call(null, b.o, c)
      }, f = function(b, c) {
        var b = this, d = null;
        1 < arguments.length && (d = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0));
        return e.call(this, b, d)
      };
      f.cljs$lang$maxFixedArity = 1;
      f.cljs$lang$applyTo = function(b) {
        var c = cljs.core.first(b), b = cljs.core.rest(b);
        return e(c, b)
      };
      f.cljs$core$IFn$_invoke$arity$variadic = e;
      d.call = f;
      cljs.core.t8001.prototype.apply = function(b, c) {
        b = this;
        return b.call.apply(b, [b].concat(c.slice()))
      };
      cljs.core.t8001.prototype.cljs$core$Fn$ = !0;
      cljs.core.t8001.prototype.cljs$core$IMeta$_meta$arity$1 = function() {
        return this.meta8002
      };
      cljs.core.t8001.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(b, c) {
        return new cljs.core.t8001(this.meta, this.o, this.with_meta, c)
      };
      cljs.core.__GT_t8001 = function(b, c, d, e) {
        return new cljs.core.t8001(b, c, d, e)
      }
    }
    d = new cljs.core.t8001(c, b, with_meta, null);
    return with_meta(d, c)
  }
  return cljs.core._with_meta(b, c)
};
cljs.core.meta = function(a) {
  var b;
  a ? (b = (b = a.cljs$lang$protocol_mask$partition0$ & 131072) ? b : a.cljs$core$IMeta$, b = b ? !0 : a.cljs$lang$protocol_mask$partition0$ ? !1 : cljs.core.type_satisfies_(cljs.core.IMeta, a)) : b = cljs.core.type_satisfies_(cljs.core.IMeta, a);
  return b ? cljs.core._meta(a) : null
};
cljs.core.peek = function(a) {
  return cljs.core._peek(a)
};
cljs.core.pop = function(a) {
  return cljs.core._pop(a)
};
cljs.core.disj = function() {
  var a = null, b = function(a, b) {
    return cljs.core._disjoin(a, b)
  }, c = function(b, c, d) {
    for(;;) {
      if(b = a.cljs$core$IFn$_invoke$arity$2(b, c), cljs.core.truth_(d)) {
        c = cljs.core.first(d), d = cljs.core.next(d)
      }else {
        return b
      }
    }
  }, d = function(a, b, d) {
    var h = null;
    2 < arguments.length && (h = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
    return c.call(this, a, b, h)
  };
  d.cljs$lang$maxFixedArity = 2;
  d.cljs$lang$applyTo = function(a) {
    var b = cljs.core.first(a), a = cljs.core.next(a), d = cljs.core.first(a), a = cljs.core.rest(a);
    return c(b, d, a)
  };
  d.cljs$core$IFn$_invoke$arity$variadic = c;
  a = function(a, c, g) {
    switch(arguments.length) {
      case 1:
        return a;
      case 2:
        return b.call(this, a, c);
      default:
        return d.cljs$core$IFn$_invoke$arity$variadic(a, c, cljs.core.array_seq(arguments, 2))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = d.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$1 = function(a) {
    return a
  };
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$variadic = d.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
cljs.core.string_hash_cache = {};
cljs.core.string_hash_cache_count = 0;
cljs.core.add_to_string_hash_cache = function(a) {
  var b = goog.string.hashCode(a);
  cljs.core.string_hash_cache[a] = b;
  cljs.core.string_hash_cache_count += 1;
  return b
};
cljs.core.check_string_hash_cache = function(a) {
  255 < cljs.core.string_hash_cache_count && (cljs.core.string_hash_cache = {}, cljs.core.string_hash_cache_count = 0);
  var b = cljs.core.string_hash_cache[a];
  return"number" === typeof b ? b : cljs.core.add_to_string_hash_cache(a)
};
cljs.core.hash = function() {
  var a = null, b = function(b) {
    return a.cljs$core$IFn$_invoke$arity$2(b, !0)
  }, c = function(a, b) {
    var c = goog.isString(a);
    return(c ? b : c) ? cljs.core.check_string_hash_cache(a) : cljs.core._hash(a)
  }, a = function(a, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, e)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$2 = c;
  return a
}();
cljs.core.empty_QMARK_ = function(a) {
  var b = null == a;
  return b ? b : cljs.core.not(cljs.core.seq(a))
};
cljs.core.coll_QMARK_ = function(a) {
  if(null == a) {
    return!1
  }
  if(a) {
    var b;
    b = (b = a.cljs$lang$protocol_mask$partition0$ & 8) ? b : a.cljs$core$ICollection$;
    return b ? !0 : a.cljs$lang$protocol_mask$partition0$ ? !1 : cljs.core.type_satisfies_(cljs.core.ICollection, a)
  }
  return cljs.core.type_satisfies_(cljs.core.ICollection, a)
};
cljs.core.set_QMARK_ = function(a) {
  if(null == a) {
    return!1
  }
  if(a) {
    var b;
    b = (b = a.cljs$lang$protocol_mask$partition0$ & 4096) ? b : a.cljs$core$ISet$;
    return b ? !0 : a.cljs$lang$protocol_mask$partition0$ ? !1 : cljs.core.type_satisfies_(cljs.core.ISet, a)
  }
  return cljs.core.type_satisfies_(cljs.core.ISet, a)
};
cljs.core.associative_QMARK_ = function(a) {
  if(a) {
    var b;
    b = (b = a.cljs$lang$protocol_mask$partition0$ & 512) ? b : a.cljs$core$IAssociative$;
    return b ? !0 : a.cljs$lang$protocol_mask$partition0$ ? !1 : cljs.core.type_satisfies_(cljs.core.IAssociative, a)
  }
  return cljs.core.type_satisfies_(cljs.core.IAssociative, a)
};
cljs.core.sequential_QMARK_ = function(a) {
  if(a) {
    var b;
    b = (b = a.cljs$lang$protocol_mask$partition0$ & 16777216) ? b : a.cljs$core$ISequential$;
    return b ? !0 : a.cljs$lang$protocol_mask$partition0$ ? !1 : cljs.core.type_satisfies_(cljs.core.ISequential, a)
  }
  return cljs.core.type_satisfies_(cljs.core.ISequential, a)
};
cljs.core.reduceable_QMARK_ = function(a) {
  if(a) {
    var b;
    b = (b = a.cljs$lang$protocol_mask$partition0$ & 524288) ? b : a.cljs$core$IReduce$;
    return b ? !0 : a.cljs$lang$protocol_mask$partition0$ ? !1 : cljs.core.type_satisfies_(cljs.core.IReduce, a)
  }
  return cljs.core.type_satisfies_(cljs.core.IReduce, a)
};
cljs.core.map_QMARK_ = function(a) {
  if(null == a) {
    return!1
  }
  if(a) {
    var b;
    b = (b = a.cljs$lang$protocol_mask$partition0$ & 1024) ? b : a.cljs$core$IMap$;
    return b ? !0 : a.cljs$lang$protocol_mask$partition0$ ? !1 : cljs.core.type_satisfies_(cljs.core.IMap, a)
  }
  return cljs.core.type_satisfies_(cljs.core.IMap, a)
};
cljs.core.vector_QMARK_ = function(a) {
  if(a) {
    var b;
    b = (b = a.cljs$lang$protocol_mask$partition0$ & 16384) ? b : a.cljs$core$IVector$;
    return b ? !0 : a.cljs$lang$protocol_mask$partition0$ ? !1 : cljs.core.type_satisfies_(cljs.core.IVector, a)
  }
  return cljs.core.type_satisfies_(cljs.core.IVector, a)
};
cljs.core.chunked_seq_QMARK_ = function(a) {
  if(a) {
    var b = a.cljs$lang$protocol_mask$partition1$ & 512, a = b ? b : a.cljs$core$IChunkedSeq$;
    return a ? !0 : !1
  }
  return!1
};
cljs.core.js_obj = function() {
  var a = null, b = function(a) {
    return cljs.core.apply.cljs$core$IFn$_invoke$arity$2 ? cljs.core.apply.cljs$core$IFn$_invoke$arity$2(goog.object.create, a) : cljs.core.apply.call(null, goog.object.create, a)
  }, c = function(a) {
    var c = null;
    0 < arguments.length && (c = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0));
    return b.call(this, c)
  };
  c.cljs$lang$maxFixedArity = 0;
  c.cljs$lang$applyTo = function(a) {
    a = cljs.core.seq(a);
    return b(a)
  };
  c.cljs$core$IFn$_invoke$arity$variadic = b;
  a = function(a) {
    switch(arguments.length) {
      case 0:
        return{};
      default:
        return c.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(arguments, 0))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 0;
  a.cljs$lang$applyTo = c.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$0 = function() {
    return{}
  };
  a.cljs$core$IFn$_invoke$arity$variadic = c.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
cljs.core.js_keys = function(a) {
  var b = [];
  goog.object.forEach(a, function(a, d) {
    return b.push(d)
  });
  return b
};
cljs.core.js_delete = function(a, b) {
  return delete a[b]
};
cljs.core.array_copy = function(a, b, c, d, e) {
  for(;;) {
    if(0 === e) {
      return c
    }
    c[d] = a[b];
    d += 1;
    e -= 1;
    b += 1
  }
};
cljs.core.array_copy_downward = function(a, b, c, d, e) {
  b += e - 1;
  for(d += e - 1;;) {
    if(0 === e) {
      return c
    }
    c[d] = a[b];
    d -= 1;
    e -= 1;
    b -= 1
  }
};
cljs.core.lookup_sentinel = {};
cljs.core.false_QMARK_ = function(a) {
  return!1 === a
};
cljs.core.true_QMARK_ = function(a) {
  return!0 === a
};
cljs.core.undefined_QMARK_ = function(a) {
  return void 0 === a
};
cljs.core.seq_QMARK_ = function(a) {
  if(null == a) {
    return!1
  }
  if(a) {
    var b;
    b = (b = a.cljs$lang$protocol_mask$partition0$ & 64) ? b : a.cljs$core$ISeq$;
    return b ? !0 : a.cljs$lang$protocol_mask$partition0$ ? !1 : cljs.core.type_satisfies_(cljs.core.ISeq, a)
  }
  return cljs.core.type_satisfies_(cljs.core.ISeq, a)
};
cljs.core.seqable_QMARK_ = function(a) {
  if(a) {
    var b;
    b = (b = a.cljs$lang$protocol_mask$partition0$ & 8388608) ? b : a.cljs$core$ISeqable$;
    return b ? !0 : a.cljs$lang$protocol_mask$partition0$ ? !1 : cljs.core.type_satisfies_(cljs.core.ISeqable, a)
  }
  return cljs.core.type_satisfies_(cljs.core.ISeqable, a)
};
cljs.core.boolean$ = function(a) {
  return cljs.core.truth_(a) ? !0 : !1
};
cljs.core.keyword_QMARK_ = function(a) {
  var b = goog.isString(a);
  return b ? "\ufdd0" === a.charAt(0) : b
};
cljs.core.ifn_QMARK_ = function(a) {
  var b = cljs.core.fn_QMARK_(a);
  return b ? b : a ? (b = (b = a.cljs$lang$protocol_mask$partition0$ & 1) ? b : a.cljs$core$IFn$, b ? !0 : a.cljs$lang$protocol_mask$partition0$ ? !1 : cljs.core.type_satisfies_(cljs.core.IFn, a)) : cljs.core.type_satisfies_(cljs.core.IFn, a)
};
cljs.core.integer_QMARK_ = function(a) {
  var b = "number" === typeof a;
  return b && (b = !isNaN(a)) ? (b = Infinity !== a) ? parseFloat(a) === parseInt(a, 10) : b : b
};
cljs.core.contains_QMARK_ = function(a, b) {
  return cljs.core.get.cljs$core$IFn$_invoke$arity$3(a, b, cljs.core.lookup_sentinel) === cljs.core.lookup_sentinel ? !1 : !0
};
cljs.core.find = function(a, b) {
  var c;
  if(c = null != a) {
    c = (c = cljs.core.associative_QMARK_(a)) ? cljs.core.contains_QMARK_(a, b) : c
  }
  return c ? cljs.core.PersistentVector.fromArray([b, cljs.core.get.cljs$core$IFn$_invoke$arity$2(a, b)], !0) : null
};
cljs.core.distinct_QMARK_ = function() {
  var a = null, b = function(a, b) {
    return!cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(a, b)
  }, c = function(a, b, c) {
    if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(a, b)) {
      return!1
    }
    a = cljs.core.PersistentHashSet.fromArray([b, null, a, null], !0);
    for(b = c;;) {
      var d = cljs.core.first(b), c = cljs.core.next(b);
      if(cljs.core.truth_(b)) {
        if(cljs.core.contains_QMARK_(a, d)) {
          return!1
        }
        a = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(a, d);
        b = c
      }else {
        return!0
      }
    }
  }, d = function(a, b, d) {
    var h = null;
    2 < arguments.length && (h = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
    return c.call(this, a, b, h)
  };
  d.cljs$lang$maxFixedArity = 2;
  d.cljs$lang$applyTo = function(a) {
    var b = cljs.core.first(a), a = cljs.core.next(a), d = cljs.core.first(a), a = cljs.core.rest(a);
    return c(b, d, a)
  };
  d.cljs$core$IFn$_invoke$arity$variadic = c;
  a = function(a, c, g) {
    switch(arguments.length) {
      case 1:
        return!0;
      case 2:
        return b.call(this, a, c);
      default:
        return d.cljs$core$IFn$_invoke$arity$variadic(a, c, cljs.core.array_seq(arguments, 2))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = d.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$1 = function() {
    return!0
  };
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$variadic = d.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
cljs.core.compare = function(a, b) {
  if(a === b) {
    return 0
  }
  if(null == a) {
    return-1
  }
  if(null == b) {
    return 1
  }
  if(cljs.core.type(a) === cljs.core.type(b)) {
    var c;
    a ? (c = (c = a.cljs$lang$protocol_mask$partition1$ & 2048) ? c : a.cljs$core$IComparable$, c = c ? !0 : !1) : c = !1;
    return c ? a.cljs$core$IComparable$_compare$arity$2(a, b) : goog.array.defaultCompare(a, b)
  }
  throw Error("compare on non-nil objects of different types");
};
cljs.core.compare_indexed = function() {
  var a = null, b = function(b, c) {
    var f = cljs.core.count(b), g = cljs.core.count(c);
    return f < g ? -1 : f > g ? 1 : a.cljs$core$IFn$_invoke$arity$4(b, c, f, 0)
  }, c = function(a, b, c, g) {
    for(;;) {
      var h = cljs.core.compare(cljs.core.nth.cljs$core$IFn$_invoke$arity$2(a, g), cljs.core.nth.cljs$core$IFn$_invoke$arity$2(b, g)), i;
      i = (i = 0 === h) ? g + 1 < c : i;
      if(i) {
        g += 1
      }else {
        return h
      }
    }
  }, a = function(a, e, f, g) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, e);
      case 4:
        return c.call(this, a, e, f, g)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$4 = c;
  return a
}();
cljs.core.fn__GT_comparator = function(a) {
  return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(a, cljs.core.compare) ? cljs.core.compare : function(b, c) {
    var d = a.cljs$core$IFn$_invoke$arity$2 ? a.cljs$core$IFn$_invoke$arity$2(b, c) : a.call(null, b, c);
    return"number" === typeof d ? d : cljs.core.truth_(d) ? -1 : cljs.core.truth_(a.cljs$core$IFn$_invoke$arity$2 ? a.cljs$core$IFn$_invoke$arity$2(c, b) : a.call(null, c, b)) ? 1 : 0
  }
};
cljs.core.sort = function() {
  var a = null, b = function(b) {
    return a.cljs$core$IFn$_invoke$arity$2(cljs.core.compare, b)
  }, c = function(a, b) {
    if(cljs.core.seq(b)) {
      var c = cljs.core.to_array.cljs$core$IFn$_invoke$arity$1 ? cljs.core.to_array.cljs$core$IFn$_invoke$arity$1(b) : cljs.core.to_array.call(null, b);
      goog.array.stableSort(c, cljs.core.fn__GT_comparator(a));
      return cljs.core.seq(c)
    }
    return cljs.core.List.EMPTY
  }, a = function(a, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, e)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$2 = c;
  return a
}();
cljs.core.sort_by = function() {
  var a = null, b = function(b, c) {
    return a.cljs$core$IFn$_invoke$arity$3(b, cljs.core.compare, c)
  }, c = function(a, b, c) {
    return cljs.core.sort.cljs$core$IFn$_invoke$arity$2(function(c, f) {
      return cljs.core.fn__GT_comparator(b).call(null, a.cljs$core$IFn$_invoke$arity$1 ? a.cljs$core$IFn$_invoke$arity$1(c) : a.call(null, c), a.cljs$core$IFn$_invoke$arity$1 ? a.cljs$core$IFn$_invoke$arity$1(f) : a.call(null, f))
    }, c)
  }, a = function(a, e, f) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, e);
      case 3:
        return c.call(this, a, e, f)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$3 = c;
  return a
}();
cljs.core.seq_reduce = function() {
  var a = null, b = function(a, b) {
    var c = cljs.core.seq(b);
    return c ? cljs.core.reduce.cljs$core$IFn$_invoke$arity$3 ? cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(a, cljs.core.first(c), cljs.core.next(c)) : cljs.core.reduce.call(null, a, cljs.core.first(c), cljs.core.next(c)) : a.cljs$core$IFn$_invoke$arity$0 ? a.cljs$core$IFn$_invoke$arity$0() : a.call(null)
  }, c = function(a, b, c) {
    for(c = cljs.core.seq(c);;) {
      if(c) {
        b = a.cljs$core$IFn$_invoke$arity$2 ? a.cljs$core$IFn$_invoke$arity$2(b, cljs.core.first(c)) : a.call(null, b, cljs.core.first(c));
        if(cljs.core.reduced_QMARK_(b)) {
          return cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(b) : cljs.core.deref.call(null, b)
        }
        c = cljs.core.next(c)
      }else {
        return b
      }
    }
  }, a = function(a, e, f) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, e);
      case 3:
        return c.call(this, a, e, f)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$3 = c;
  return a
}();
cljs.core.shuffle = function(a) {
  a = cljs.core.to_array.cljs$core$IFn$_invoke$arity$1 ? cljs.core.to_array.cljs$core$IFn$_invoke$arity$1(a) : cljs.core.to_array.call(null, a);
  goog.array.shuffle(a);
  return cljs.core.vec.cljs$core$IFn$_invoke$arity$1 ? cljs.core.vec.cljs$core$IFn$_invoke$arity$1(a) : cljs.core.vec.call(null, a)
};
cljs.core.reduce = function() {
  var a = null, b = function(a, b) {
    var c;
    b ? (c = (c = b.cljs$lang$protocol_mask$partition0$ & 524288) ? c : b.cljs$core$IReduce$, c = c ? !0 : !1) : c = !1;
    return c ? b.cljs$core$IReduce$_reduce$arity$2(b, a) : b instanceof Array ? cljs.core.array_reduce.cljs$core$IFn$_invoke$arity$2(b, a) : cljs.core.string_QMARK_(b) ? cljs.core.array_reduce.cljs$core$IFn$_invoke$arity$2(b, a) : cljs.core.type_satisfies_(cljs.core.IReduce, b) ? cljs.core._reduce.cljs$core$IFn$_invoke$arity$2(b, a) : cljs.core.seq_reduce.cljs$core$IFn$_invoke$arity$2(a, b)
  }, c = function(a, b, c) {
    var g;
    c ? (g = (g = c.cljs$lang$protocol_mask$partition0$ & 524288) ? g : c.cljs$core$IReduce$, g = g ? !0 : !1) : g = !1;
    return g ? c.cljs$core$IReduce$_reduce$arity$3(c, a, b) : c instanceof Array ? cljs.core.array_reduce.cljs$core$IFn$_invoke$arity$3(c, a, b) : cljs.core.string_QMARK_(c) ? cljs.core.array_reduce.cljs$core$IFn$_invoke$arity$3(c, a, b) : cljs.core.type_satisfies_(cljs.core.IReduce, c) ? cljs.core._reduce.cljs$core$IFn$_invoke$arity$3(c, a, b) : cljs.core.seq_reduce.cljs$core$IFn$_invoke$arity$3(a, b, c)
  }, a = function(a, e, f) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, e);
      case 3:
        return c.call(this, a, e, f)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$3 = c;
  return a
}();
cljs.core.reduce_kv = function(a, b, c) {
  return cljs.core._kv_reduce(c, a, b)
};
cljs.core._PLUS_ = function() {
  var a = null, b = function(b, c, f) {
    return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(a, b + c, f)
  }, c = function(a, c, f) {
    var g = null;
    2 < arguments.length && (g = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
    return b.call(this, a, c, g)
  };
  c.cljs$lang$maxFixedArity = 2;
  c.cljs$lang$applyTo = function(a) {
    var c = cljs.core.first(a), a = cljs.core.next(a), f = cljs.core.first(a), a = cljs.core.rest(a);
    return b(c, f, a)
  };
  c.cljs$core$IFn$_invoke$arity$variadic = b;
  a = function(a, b, f) {
    switch(arguments.length) {
      case 0:
        return 0;
      case 1:
        return a;
      case 2:
        return a + b;
      default:
        return c.cljs$core$IFn$_invoke$arity$variadic(a, b, cljs.core.array_seq(arguments, 2))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = c.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$0 = function() {
    return 0
  };
  a.cljs$core$IFn$_invoke$arity$1 = function(a) {
    return a
  };
  a.cljs$core$IFn$_invoke$arity$2 = function(a, b) {
    return a + b
  };
  a.cljs$core$IFn$_invoke$arity$variadic = c.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
cljs.core._ = function() {
  var a = null, b = function(b, c, f) {
    return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(a, b - c, f)
  }, c = function(a, c, f) {
    var g = null;
    2 < arguments.length && (g = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
    return b.call(this, a, c, g)
  };
  c.cljs$lang$maxFixedArity = 2;
  c.cljs$lang$applyTo = function(a) {
    var c = cljs.core.first(a), a = cljs.core.next(a), f = cljs.core.first(a), a = cljs.core.rest(a);
    return b(c, f, a)
  };
  c.cljs$core$IFn$_invoke$arity$variadic = b;
  a = function(a, b, f) {
    switch(arguments.length) {
      case 1:
        return-a;
      case 2:
        return a - b;
      default:
        return c.cljs$core$IFn$_invoke$arity$variadic(a, b, cljs.core.array_seq(arguments, 2))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = c.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$1 = function(a) {
    return-a
  };
  a.cljs$core$IFn$_invoke$arity$2 = function(a, b) {
    return a - b
  };
  a.cljs$core$IFn$_invoke$arity$variadic = c.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
cljs.core._STAR_ = function() {
  var a = null, b = function(b, c, f) {
    return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(a, b * c, f)
  }, c = function(a, c, f) {
    var g = null;
    2 < arguments.length && (g = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
    return b.call(this, a, c, g)
  };
  c.cljs$lang$maxFixedArity = 2;
  c.cljs$lang$applyTo = function(a) {
    var c = cljs.core.first(a), a = cljs.core.next(a), f = cljs.core.first(a), a = cljs.core.rest(a);
    return b(c, f, a)
  };
  c.cljs$core$IFn$_invoke$arity$variadic = b;
  a = function(a, b, f) {
    switch(arguments.length) {
      case 0:
        return 1;
      case 1:
        return a;
      case 2:
        return a * b;
      default:
        return c.cljs$core$IFn$_invoke$arity$variadic(a, b, cljs.core.array_seq(arguments, 2))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = c.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$0 = function() {
    return 1
  };
  a.cljs$core$IFn$_invoke$arity$1 = function(a) {
    return a
  };
  a.cljs$core$IFn$_invoke$arity$2 = function(a, b) {
    return a * b
  };
  a.cljs$core$IFn$_invoke$arity$variadic = c.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
cljs.core._SLASH_ = function() {
  var a = null, b = function(b) {
    return a.cljs$core$IFn$_invoke$arity$2(1, b)
  }, c = function(b, c, d) {
    return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(a, a.cljs$core$IFn$_invoke$arity$2(b, c), d)
  }, d = function(a, b, d) {
    var h = null;
    2 < arguments.length && (h = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
    return c.call(this, a, b, h)
  };
  d.cljs$lang$maxFixedArity = 2;
  d.cljs$lang$applyTo = function(a) {
    var b = cljs.core.first(a), a = cljs.core.next(a), d = cljs.core.first(a), a = cljs.core.rest(a);
    return c(b, d, a)
  };
  d.cljs$core$IFn$_invoke$arity$variadic = c;
  a = function(a, c, g) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return a / c;
      default:
        return d.cljs$core$IFn$_invoke$arity$variadic(a, c, cljs.core.array_seq(arguments, 2))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = d.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$2 = function(a, b) {
    return a / b
  };
  a.cljs$core$IFn$_invoke$arity$variadic = d.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
cljs.core._LT_ = function() {
  var a = null, b = function(a, b, c) {
    for(;;) {
      if(a < b) {
        if(cljs.core.next(c)) {
          a = b, b = cljs.core.first(c), c = cljs.core.next(c)
        }else {
          return b < cljs.core.first(c)
        }
      }else {
        return!1
      }
    }
  }, c = function(a, c, f) {
    var g = null;
    2 < arguments.length && (g = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
    return b.call(this, a, c, g)
  };
  c.cljs$lang$maxFixedArity = 2;
  c.cljs$lang$applyTo = function(a) {
    var c = cljs.core.first(a), a = cljs.core.next(a), f = cljs.core.first(a), a = cljs.core.rest(a);
    return b(c, f, a)
  };
  c.cljs$core$IFn$_invoke$arity$variadic = b;
  a = function(a, b, f) {
    switch(arguments.length) {
      case 1:
        return!0;
      case 2:
        return a < b;
      default:
        return c.cljs$core$IFn$_invoke$arity$variadic(a, b, cljs.core.array_seq(arguments, 2))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = c.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$1 = function() {
    return!0
  };
  a.cljs$core$IFn$_invoke$arity$2 = function(a, b) {
    return a < b
  };
  a.cljs$core$IFn$_invoke$arity$variadic = c.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
cljs.core._LT__EQ_ = function() {
  var a = null, b = function(a, b, c) {
    for(;;) {
      if(a <= b) {
        if(cljs.core.next(c)) {
          a = b, b = cljs.core.first(c), c = cljs.core.next(c)
        }else {
          return b <= cljs.core.first(c)
        }
      }else {
        return!1
      }
    }
  }, c = function(a, c, f) {
    var g = null;
    2 < arguments.length && (g = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
    return b.call(this, a, c, g)
  };
  c.cljs$lang$maxFixedArity = 2;
  c.cljs$lang$applyTo = function(a) {
    var c = cljs.core.first(a), a = cljs.core.next(a), f = cljs.core.first(a), a = cljs.core.rest(a);
    return b(c, f, a)
  };
  c.cljs$core$IFn$_invoke$arity$variadic = b;
  a = function(a, b, f) {
    switch(arguments.length) {
      case 1:
        return!0;
      case 2:
        return a <= b;
      default:
        return c.cljs$core$IFn$_invoke$arity$variadic(a, b, cljs.core.array_seq(arguments, 2))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = c.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$1 = function() {
    return!0
  };
  a.cljs$core$IFn$_invoke$arity$2 = function(a, b) {
    return a <= b
  };
  a.cljs$core$IFn$_invoke$arity$variadic = c.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
cljs.core._GT_ = function() {
  var a = null, b = function(a, b, c) {
    for(;;) {
      if(a > b) {
        if(cljs.core.next(c)) {
          a = b, b = cljs.core.first(c), c = cljs.core.next(c)
        }else {
          return b > cljs.core.first(c)
        }
      }else {
        return!1
      }
    }
  }, c = function(a, c, f) {
    var g = null;
    2 < arguments.length && (g = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
    return b.call(this, a, c, g)
  };
  c.cljs$lang$maxFixedArity = 2;
  c.cljs$lang$applyTo = function(a) {
    var c = cljs.core.first(a), a = cljs.core.next(a), f = cljs.core.first(a), a = cljs.core.rest(a);
    return b(c, f, a)
  };
  c.cljs$core$IFn$_invoke$arity$variadic = b;
  a = function(a, b, f) {
    switch(arguments.length) {
      case 1:
        return!0;
      case 2:
        return a > b;
      default:
        return c.cljs$core$IFn$_invoke$arity$variadic(a, b, cljs.core.array_seq(arguments, 2))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = c.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$1 = function() {
    return!0
  };
  a.cljs$core$IFn$_invoke$arity$2 = function(a, b) {
    return a > b
  };
  a.cljs$core$IFn$_invoke$arity$variadic = c.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
cljs.core._GT__EQ_ = function() {
  var a = null, b = function(a, b, c) {
    for(;;) {
      if(a >= b) {
        if(cljs.core.next(c)) {
          a = b, b = cljs.core.first(c), c = cljs.core.next(c)
        }else {
          return b >= cljs.core.first(c)
        }
      }else {
        return!1
      }
    }
  }, c = function(a, c, f) {
    var g = null;
    2 < arguments.length && (g = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
    return b.call(this, a, c, g)
  };
  c.cljs$lang$maxFixedArity = 2;
  c.cljs$lang$applyTo = function(a) {
    var c = cljs.core.first(a), a = cljs.core.next(a), f = cljs.core.first(a), a = cljs.core.rest(a);
    return b(c, f, a)
  };
  c.cljs$core$IFn$_invoke$arity$variadic = b;
  a = function(a, b, f) {
    switch(arguments.length) {
      case 1:
        return!0;
      case 2:
        return a >= b;
      default:
        return c.cljs$core$IFn$_invoke$arity$variadic(a, b, cljs.core.array_seq(arguments, 2))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = c.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$1 = function() {
    return!0
  };
  a.cljs$core$IFn$_invoke$arity$2 = function(a, b) {
    return a >= b
  };
  a.cljs$core$IFn$_invoke$arity$variadic = c.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
cljs.core.dec = function(a) {
  return a - 1
};
cljs.core.max = function() {
  var a = null, b = function(a, b) {
    return a > b ? a : b
  }, c = function(b, c, d) {
    return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(a, b > c ? b : c, d)
  }, d = function(a, b, d) {
    var h = null;
    2 < arguments.length && (h = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
    return c.call(this, a, b, h)
  };
  d.cljs$lang$maxFixedArity = 2;
  d.cljs$lang$applyTo = function(a) {
    var b = cljs.core.first(a), a = cljs.core.next(a), d = cljs.core.first(a), a = cljs.core.rest(a);
    return c(b, d, a)
  };
  d.cljs$core$IFn$_invoke$arity$variadic = c;
  a = function(a, c, g) {
    switch(arguments.length) {
      case 1:
        return a;
      case 2:
        return b.call(this, a, c);
      default:
        return d.cljs$core$IFn$_invoke$arity$variadic(a, c, cljs.core.array_seq(arguments, 2))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = d.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$1 = function(a) {
    return a
  };
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$variadic = d.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
cljs.core.min = function() {
  var a = null, b = function(a, b) {
    return a < b ? a : b
  }, c = function(b, c, d) {
    return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(a, b < c ? b : c, d)
  }, d = function(a, b, d) {
    var h = null;
    2 < arguments.length && (h = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
    return c.call(this, a, b, h)
  };
  d.cljs$lang$maxFixedArity = 2;
  d.cljs$lang$applyTo = function(a) {
    var b = cljs.core.first(a), a = cljs.core.next(a), d = cljs.core.first(a), a = cljs.core.rest(a);
    return c(b, d, a)
  };
  d.cljs$core$IFn$_invoke$arity$variadic = c;
  a = function(a, c, g) {
    switch(arguments.length) {
      case 1:
        return a;
      case 2:
        return b.call(this, a, c);
      default:
        return d.cljs$core$IFn$_invoke$arity$variadic(a, c, cljs.core.array_seq(arguments, 2))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = d.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$1 = function(a) {
    return a
  };
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$variadic = d.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
cljs.core.byte$ = function(a) {
  return a
};
cljs.core.char$ = function(a) {
  if("number" === typeof a) {
    return String.fromCharCode(a)
  }
  var b;
  b = (b = cljs.core.string_QMARK_(a)) ? 1 === a.length : b;
  if(b) {
    return a
  }
  throw Error("Argument to char must be a character or number");
};
cljs.core.short$ = function(a) {
  return a
};
cljs.core.float$ = function(a) {
  return a
};
cljs.core.double$ = function(a) {
  return a
};
cljs.core.unchecked_byte = function(a) {
  return a
};
cljs.core.unchecked_char = function(a) {
  return a
};
cljs.core.unchecked_short = function(a) {
  return a
};
cljs.core.unchecked_float = function(a) {
  return a
};
cljs.core.unchecked_double = function(a) {
  return a
};
cljs.core.unchecked_add = function() {
  var a = null, b = function(b, c, f) {
    return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(a, b + c, f)
  }, c = function(a, c, f) {
    var g = null;
    2 < arguments.length && (g = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
    return b.call(this, a, c, g)
  };
  c.cljs$lang$maxFixedArity = 2;
  c.cljs$lang$applyTo = function(a) {
    var c = cljs.core.first(a), a = cljs.core.next(a), f = cljs.core.first(a), a = cljs.core.rest(a);
    return b(c, f, a)
  };
  c.cljs$core$IFn$_invoke$arity$variadic = b;
  a = function(a, b, f) {
    switch(arguments.length) {
      case 0:
        return 0;
      case 1:
        return a;
      case 2:
        return a + b;
      default:
        return c.cljs$core$IFn$_invoke$arity$variadic(a, b, cljs.core.array_seq(arguments, 2))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = c.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$0 = function() {
    return 0
  };
  a.cljs$core$IFn$_invoke$arity$1 = function(a) {
    return a
  };
  a.cljs$core$IFn$_invoke$arity$2 = function(a, b) {
    return a + b
  };
  a.cljs$core$IFn$_invoke$arity$variadic = c.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
cljs.core.unchecked_add_int = function() {
  var a = null, b = function(b, c, f) {
    return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(a, b + c, f)
  }, c = function(a, c, f) {
    var g = null;
    2 < arguments.length && (g = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
    return b.call(this, a, c, g)
  };
  c.cljs$lang$maxFixedArity = 2;
  c.cljs$lang$applyTo = function(a) {
    var c = cljs.core.first(a), a = cljs.core.next(a), f = cljs.core.first(a), a = cljs.core.rest(a);
    return b(c, f, a)
  };
  c.cljs$core$IFn$_invoke$arity$variadic = b;
  a = function(a, b, f) {
    switch(arguments.length) {
      case 0:
        return 0;
      case 1:
        return a;
      case 2:
        return a + b;
      default:
        return c.cljs$core$IFn$_invoke$arity$variadic(a, b, cljs.core.array_seq(arguments, 2))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = c.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$0 = function() {
    return 0
  };
  a.cljs$core$IFn$_invoke$arity$1 = function(a) {
    return a
  };
  a.cljs$core$IFn$_invoke$arity$2 = function(a, b) {
    return a + b
  };
  a.cljs$core$IFn$_invoke$arity$variadic = c.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
cljs.core.unchecked_dec = function(a) {
  return a - 1
};
cljs.core.unchecked_dec_int = function(a) {
  return a - 1
};
cljs.core.unchecked_divide_int = function() {
  var a = null, b = function(b) {
    return a.cljs$core$IFn$_invoke$arity$2(1, b)
  }, c = function(b, c, d) {
    return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(a, a.cljs$core$IFn$_invoke$arity$2(b, c), d)
  }, d = function(a, b, d) {
    var h = null;
    2 < arguments.length && (h = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
    return c.call(this, a, b, h)
  };
  d.cljs$lang$maxFixedArity = 2;
  d.cljs$lang$applyTo = function(a) {
    var b = cljs.core.first(a), a = cljs.core.next(a), d = cljs.core.first(a), a = cljs.core.rest(a);
    return c(b, d, a)
  };
  d.cljs$core$IFn$_invoke$arity$variadic = c;
  a = function(a, c, g) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return a / c;
      default:
        return d.cljs$core$IFn$_invoke$arity$variadic(a, c, cljs.core.array_seq(arguments, 2))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = d.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$2 = function(a, b) {
    return a / b
  };
  a.cljs$core$IFn$_invoke$arity$variadic = d.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
cljs.core.unchecked_inc = function(a) {
  return a + 1
};
cljs.core.unchecked_inc_int = function(a) {
  return a + 1
};
cljs.core.unchecked_multiply = function() {
  var a = null, b = function(b, c, f) {
    return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(a, b * c, f)
  }, c = function(a, c, f) {
    var g = null;
    2 < arguments.length && (g = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
    return b.call(this, a, c, g)
  };
  c.cljs$lang$maxFixedArity = 2;
  c.cljs$lang$applyTo = function(a) {
    var c = cljs.core.first(a), a = cljs.core.next(a), f = cljs.core.first(a), a = cljs.core.rest(a);
    return b(c, f, a)
  };
  c.cljs$core$IFn$_invoke$arity$variadic = b;
  a = function(a, b, f) {
    switch(arguments.length) {
      case 0:
        return 1;
      case 1:
        return a;
      case 2:
        return a * b;
      default:
        return c.cljs$core$IFn$_invoke$arity$variadic(a, b, cljs.core.array_seq(arguments, 2))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = c.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$0 = function() {
    return 1
  };
  a.cljs$core$IFn$_invoke$arity$1 = function(a) {
    return a
  };
  a.cljs$core$IFn$_invoke$arity$2 = function(a, b) {
    return a * b
  };
  a.cljs$core$IFn$_invoke$arity$variadic = c.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
cljs.core.unchecked_multiply_int = function() {
  var a = null, b = function(b, c, f) {
    return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(a, b * c, f)
  }, c = function(a, c, f) {
    var g = null;
    2 < arguments.length && (g = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
    return b.call(this, a, c, g)
  };
  c.cljs$lang$maxFixedArity = 2;
  c.cljs$lang$applyTo = function(a) {
    var c = cljs.core.first(a), a = cljs.core.next(a), f = cljs.core.first(a), a = cljs.core.rest(a);
    return b(c, f, a)
  };
  c.cljs$core$IFn$_invoke$arity$variadic = b;
  a = function(a, b, f) {
    switch(arguments.length) {
      case 0:
        return 1;
      case 1:
        return a;
      case 2:
        return a * b;
      default:
        return c.cljs$core$IFn$_invoke$arity$variadic(a, b, cljs.core.array_seq(arguments, 2))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = c.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$0 = function() {
    return 1
  };
  a.cljs$core$IFn$_invoke$arity$1 = function(a) {
    return a
  };
  a.cljs$core$IFn$_invoke$arity$2 = function(a, b) {
    return a * b
  };
  a.cljs$core$IFn$_invoke$arity$variadic = c.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
cljs.core.unchecked_negate = function(a) {
  return-a
};
cljs.core.unchecked_negate_int = function(a) {
  return-a
};
cljs.core.unchecked_remainder_int = function(a, b) {
  return cljs.core.mod.cljs$core$IFn$_invoke$arity$2 ? cljs.core.mod.cljs$core$IFn$_invoke$arity$2(a, b) : cljs.core.mod.call(null, a, b)
};
cljs.core.unchecked_substract = function() {
  var a = null, b = function(b, c, f) {
    return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(a, b - c, f)
  }, c = function(a, c, f) {
    var g = null;
    2 < arguments.length && (g = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
    return b.call(this, a, c, g)
  };
  c.cljs$lang$maxFixedArity = 2;
  c.cljs$lang$applyTo = function(a) {
    var c = cljs.core.first(a), a = cljs.core.next(a), f = cljs.core.first(a), a = cljs.core.rest(a);
    return b(c, f, a)
  };
  c.cljs$core$IFn$_invoke$arity$variadic = b;
  a = function(a, b, f) {
    switch(arguments.length) {
      case 1:
        return-a;
      case 2:
        return a - b;
      default:
        return c.cljs$core$IFn$_invoke$arity$variadic(a, b, cljs.core.array_seq(arguments, 2))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = c.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$1 = function(a) {
    return-a
  };
  a.cljs$core$IFn$_invoke$arity$2 = function(a, b) {
    return a - b
  };
  a.cljs$core$IFn$_invoke$arity$variadic = c.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
cljs.core.unchecked_substract_int = function() {
  var a = null, b = function(b, c, f) {
    return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(a, b - c, f)
  }, c = function(a, c, f) {
    var g = null;
    2 < arguments.length && (g = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
    return b.call(this, a, c, g)
  };
  c.cljs$lang$maxFixedArity = 2;
  c.cljs$lang$applyTo = function(a) {
    var c = cljs.core.first(a), a = cljs.core.next(a), f = cljs.core.first(a), a = cljs.core.rest(a);
    return b(c, f, a)
  };
  c.cljs$core$IFn$_invoke$arity$variadic = b;
  a = function(a, b, f) {
    switch(arguments.length) {
      case 1:
        return-a;
      case 2:
        return a - b;
      default:
        return c.cljs$core$IFn$_invoke$arity$variadic(a, b, cljs.core.array_seq(arguments, 2))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = c.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$1 = function(a) {
    return-a
  };
  a.cljs$core$IFn$_invoke$arity$2 = function(a, b) {
    return a - b
  };
  a.cljs$core$IFn$_invoke$arity$variadic = c.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
cljs.core.fix = function(a) {
  return 0 <= a ? Math.floor.cljs$core$IFn$_invoke$arity$1 ? Math.floor.cljs$core$IFn$_invoke$arity$1(a) : Math.floor.call(null, a) : Math.ceil.cljs$core$IFn$_invoke$arity$1 ? Math.ceil.cljs$core$IFn$_invoke$arity$1(a) : Math.ceil.call(null, a)
};
cljs.core.int$ = function(a) {
  return a | 0
};
cljs.core.unchecked_int = function(a) {
  return cljs.core.fix(a)
};
cljs.core.long$ = function(a) {
  return cljs.core.fix(a)
};
cljs.core.unchecked_long = function(a) {
  return cljs.core.fix(a)
};
cljs.core.booleans = function(a) {
  return a
};
cljs.core.bytes = function(a) {
  return a
};
cljs.core.chars = function(a) {
  return a
};
cljs.core.shorts = function(a) {
  return a
};
cljs.core.ints = function(a) {
  return a
};
cljs.core.floats = function(a) {
  return a
};
cljs.core.doubles = function(a) {
  return a
};
cljs.core.longs = function(a) {
  return a
};
cljs.core.js_mod = function(a, b) {
  return a % b
};
cljs.core.mod = function(a, b) {
  return(a % b + b) % b
};
cljs.core.quot = function(a, b) {
  return cljs.core.fix((a - a % b) / b)
};
cljs.core.rem = function(a, b) {
  var c = cljs.core.quot(a, b);
  return a - b * c
};
cljs.core.rand = function() {
  var a = null, b = function() {
    return Math.random.cljs$core$IFn$_invoke$arity$0 ? Math.random.cljs$core$IFn$_invoke$arity$0() : Math.random.call(null)
  }, c = function(b) {
    return b * a.cljs$core$IFn$_invoke$arity$0()
  }, a = function(a) {
    switch(arguments.length) {
      case 0:
        return b.call(this);
      case 1:
        return c.call(this, a)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$0 = b;
  a.cljs$core$IFn$_invoke$arity$1 = c;
  return a
}();
cljs.core.rand_int = function(a) {
  return cljs.core.fix(cljs.core.rand.cljs$core$IFn$_invoke$arity$1(a))
};
cljs.core.bit_xor = function(a, b) {
  return a ^ b
};
cljs.core.bit_and = function(a, b) {
  return a & b
};
cljs.core.bit_or = function(a, b) {
  return a | b
};
cljs.core.bit_and_not = function(a, b) {
  return a & ~b
};
cljs.core.bit_clear = function(a, b) {
  return a & ~(1 << b)
};
cljs.core.bit_flip = function(a, b) {
  return a ^ 1 << b
};
cljs.core.bit_not = function(a) {
  return~a
};
cljs.core.bit_set = function(a, b) {
  return a | 1 << b
};
cljs.core.bit_test = function(a, b) {
  return 0 != (a & 1 << b)
};
cljs.core.bit_shift_left = function(a, b) {
  return a << b
};
cljs.core.bit_shift_right = function(a, b) {
  return a >> b
};
cljs.core.bit_shift_right_zero_fill = function(a, b) {
  return a >>> b
};
cljs.core.bit_count = function(a) {
  a -= a >> 1 & 1431655765;
  a = (a & 858993459) + (a >> 2 & 858993459);
  return 16843009 * (a + (a >> 4) & 252645135) >> 24
};
cljs.core._EQ__EQ_ = function() {
  var a = null, b = function(a, b) {
    return cljs.core._equiv(a, b)
  }, c = function(b, c, d) {
    for(;;) {
      if(cljs.core.truth_(a.cljs$core$IFn$_invoke$arity$2(b, c))) {
        if(cljs.core.next(d)) {
          b = c, c = cljs.core.first(d), d = cljs.core.next(d)
        }else {
          return a.cljs$core$IFn$_invoke$arity$2(c, cljs.core.first(d))
        }
      }else {
        return!1
      }
    }
  }, d = function(a, b, d) {
    var h = null;
    2 < arguments.length && (h = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
    return c.call(this, a, b, h)
  };
  d.cljs$lang$maxFixedArity = 2;
  d.cljs$lang$applyTo = function(a) {
    var b = cljs.core.first(a), a = cljs.core.next(a), d = cljs.core.first(a), a = cljs.core.rest(a);
    return c(b, d, a)
  };
  d.cljs$core$IFn$_invoke$arity$variadic = c;
  a = function(a, c, g) {
    switch(arguments.length) {
      case 1:
        return!0;
      case 2:
        return b.call(this, a, c);
      default:
        return d.cljs$core$IFn$_invoke$arity$variadic(a, c, cljs.core.array_seq(arguments, 2))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = d.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$1 = function() {
    return!0
  };
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$variadic = d.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
cljs.core.pos_QMARK_ = function(a) {
  return 0 < a
};
cljs.core.zero_QMARK_ = function(a) {
  return 0 === a
};
cljs.core.neg_QMARK_ = function(a) {
  return 0 > a
};
cljs.core.nthnext = function(a, b) {
  for(var c = b, d = cljs.core.seq(a);;) {
    if(cljs.core.truth_(function() {
      var a = d;
      return a ? 0 < c : a
    }())) {
      var e = c - 1, f = cljs.core.next(d), c = e, d = f
    }else {
      return d
    }
  }
};
cljs.core.str_STAR_ = function() {
  var a = null, b = function(a) {
    return null == a ? "" : a.toString()
  }, c = function(b, c) {
    return function(b, c) {
      for(;;) {
        if(cljs.core.truth_(c)) {
          var d = b.append(a.cljs$core$IFn$_invoke$arity$1(cljs.core.first(c))), e = cljs.core.next(c), b = d, c = e
        }else {
          return a.cljs$core$IFn$_invoke$arity$1(b)
        }
      }
    }.call(null, new goog.string.StringBuffer(a.cljs$core$IFn$_invoke$arity$1(b)), c)
  }, d = function(a, b) {
    var d = null;
    1 < arguments.length && (d = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0));
    return c.call(this, a, d)
  };
  d.cljs$lang$maxFixedArity = 1;
  d.cljs$lang$applyTo = function(a) {
    var b = cljs.core.first(a), a = cljs.core.rest(a);
    return c(b, a)
  };
  d.cljs$core$IFn$_invoke$arity$variadic = c;
  a = function(a, c) {
    switch(arguments.length) {
      case 0:
        return"";
      case 1:
        return b.call(this, a);
      default:
        return d.cljs$core$IFn$_invoke$arity$variadic(a, cljs.core.array_seq(arguments, 1))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 1;
  a.cljs$lang$applyTo = d.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$0 = function() {
    return""
  };
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$variadic = d.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
cljs.core.str = function() {
  var a = null, b = function(a) {
    return cljs.core.keyword_QMARK_(a) ? cljs.core.str_STAR_.cljs$core$IFn$_invoke$arity$variadic(":", cljs.core.array_seq([a.substring(2, a.length)], 0)) : null == a ? "" : a.toString()
  }, c = function(b, c) {
    return function(b, c) {
      for(;;) {
        if(cljs.core.truth_(c)) {
          var d = b.append(a.cljs$core$IFn$_invoke$arity$1(cljs.core.first(c))), e = cljs.core.next(c), b = d, c = e
        }else {
          return cljs.core.str_STAR_.cljs$core$IFn$_invoke$arity$1(b)
        }
      }
    }.call(null, new goog.string.StringBuffer(a.cljs$core$IFn$_invoke$arity$1(b)), c)
  }, d = function(a, b) {
    var d = null;
    1 < arguments.length && (d = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0));
    return c.call(this, a, d)
  };
  d.cljs$lang$maxFixedArity = 1;
  d.cljs$lang$applyTo = function(a) {
    var b = cljs.core.first(a), a = cljs.core.rest(a);
    return c(b, a)
  };
  d.cljs$core$IFn$_invoke$arity$variadic = c;
  a = function(a, c) {
    switch(arguments.length) {
      case 0:
        return"";
      case 1:
        return b.call(this, a);
      default:
        return d.cljs$core$IFn$_invoke$arity$variadic(a, cljs.core.array_seq(arguments, 1))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 1;
  a.cljs$lang$applyTo = d.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$0 = function() {
    return""
  };
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$variadic = d.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
cljs.core.subs = function() {
  var a = null, a = function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return a.substring(c);
      case 3:
        return a.substring(c, d)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$2 = function(a, c) {
    return a.substring(c)
  };
  a.cljs$core$IFn$_invoke$arity$3 = function(a, c, d) {
    return a.substring(c, d)
  };
  return a
}();
cljs.core.format = function() {
  var a = function(a, b) {
    var e = cljs.core.map.cljs$core$IFn$_invoke$arity$2 ? cljs.core.map.cljs$core$IFn$_invoke$arity$2(function(a) {
      var b;
      b = (b = cljs.core.keyword_QMARK_(a)) ? b : a instanceof cljs.core.Symbol;
      return b ? "" + cljs.core.str(a) : a
    }, b) : cljs.core.map.call(null, function(a) {
      var b;
      b = (b = cljs.core.keyword_QMARK_(a)) ? b : a instanceof cljs.core.Symbol;
      return b ? "" + cljs.core.str(a) : a
    }, b);
    return cljs.core.apply.cljs$core$IFn$_invoke$arity$3 ? cljs.core.apply.cljs$core$IFn$_invoke$arity$3(goog.string.format, a, e) : cljs.core.apply.call(null, goog.string.format, a, e)
  }, b = function(b, d) {
    var e = null;
    1 < arguments.length && (e = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0));
    return a.call(this, b, e)
  };
  b.cljs$lang$maxFixedArity = 1;
  b.cljs$lang$applyTo = function(b) {
    var d = cljs.core.first(b), b = cljs.core.rest(b);
    return a(d, b)
  };
  b.cljs$core$IFn$_invoke$arity$variadic = a;
  return b
}();
cljs.core.keyword = function() {
  var a = null, b = function(a) {
    return cljs.core.keyword_QMARK_(a) ? a : a instanceof cljs.core.Symbol ? cljs.core.str_STAR_.cljs$core$IFn$_invoke$arity$variadic("\ufdd0", cljs.core.array_seq([":", cljs.core.name.cljs$core$IFn$_invoke$arity$1 ? cljs.core.name.cljs$core$IFn$_invoke$arity$1(a) : cljs.core.name.call(null, a)], 0)) : cljs.core.str_STAR_.cljs$core$IFn$_invoke$arity$variadic("\ufdd0", cljs.core.array_seq([":", a], 0))
  }, c = function(b, c) {
    return a.cljs$core$IFn$_invoke$arity$1(cljs.core.str_STAR_.cljs$core$IFn$_invoke$arity$variadic(b, cljs.core.array_seq(["/", c], 0)))
  }, a = function(a, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, e)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$2 = c;
  return a
}();
cljs.core.equiv_sequential = function(a, b) {
  return cljs.core.boolean$(cljs.core.sequential_QMARK_(b) ? function() {
    for(var c = cljs.core.seq(a), d = cljs.core.seq(b);;) {
      if(null == c) {
        return null == d
      }
      if(null != d && cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.first(c), cljs.core.first(d))) {
        c = cljs.core.next(c), d = cljs.core.next(d)
      }else {
        return!1
      }
    }
  }() : null)
};
cljs.core.hash_combine = function(a, b) {
  return a ^ b + 2654435769 + (a << 6) + (a >> 2)
};
cljs.core.hash_coll = function(a) {
  return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(function(a, c) {
    return cljs.core.hash_combine(a, cljs.core.hash.cljs$core$IFn$_invoke$arity$2(c, !1))
  }, cljs.core.hash.cljs$core$IFn$_invoke$arity$2(cljs.core.first(a), !1), cljs.core.next(a))
};
cljs.core.hash_imap = function(a) {
  for(var b = 0, a = cljs.core.seq(a);;) {
    if(a) {
      var c = cljs.core.first(a), b = (b + (cljs.core.hash.cljs$core$IFn$_invoke$arity$1(cljs.core.key.cljs$core$IFn$_invoke$arity$1 ? cljs.core.key.cljs$core$IFn$_invoke$arity$1(c) : cljs.core.key.call(null, c)) ^ cljs.core.hash.cljs$core$IFn$_invoke$arity$1(cljs.core.val.cljs$core$IFn$_invoke$arity$1 ? cljs.core.val.cljs$core$IFn$_invoke$arity$1(c) : cljs.core.val.call(null, c)))) % 4503599627370496, a = cljs.core.next(a)
    }else {
      return b
    }
  }
};
cljs.core.hash_iset = function(a) {
  for(var b = 0, a = cljs.core.seq(a);;) {
    if(a) {
      var c = cljs.core.first(a), b = (b + cljs.core.hash.cljs$core$IFn$_invoke$arity$1(c)) % 4503599627370496, a = cljs.core.next(a)
    }else {
      return b
    }
  }
};
cljs.core.extend_object_BANG_ = function(a, b) {
  for(var c = cljs.core.seq(b), d = null, e = 0, f = 0;;) {
    if(f < e) {
      var g = d.cljs$core$IIndexed$_nth$arity$2(d, f), h = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(g, 0, null), g = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(g, 1, null), h = cljs.core.name.cljs$core$IFn$_invoke$arity$1 ? cljs.core.name.cljs$core$IFn$_invoke$arity$1(h) : cljs.core.name.call(null, h);
      a[h] = g;
      f += 1
    }else {
      if(c = cljs.core.seq(c)) {
        cljs.core.chunked_seq_QMARK_(c) ? (e = cljs.core.chunk_first.cljs$core$IFn$_invoke$arity$1 ? cljs.core.chunk_first.cljs$core$IFn$_invoke$arity$1(c) : cljs.core.chunk_first.call(null, c), c = cljs.core.chunk_rest.cljs$core$IFn$_invoke$arity$1 ? cljs.core.chunk_rest.cljs$core$IFn$_invoke$arity$1(c) : cljs.core.chunk_rest.call(null, c), d = e, e = cljs.core.count(e)) : (e = cljs.core.first(c), d = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(e, 0, null), e = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(e, 
        1, null), d = cljs.core.name.cljs$core$IFn$_invoke$arity$1 ? cljs.core.name.cljs$core$IFn$_invoke$arity$1(d) : cljs.core.name.call(null, d), a[d] = e, c = cljs.core.next(c), d = null, e = 0), f = 0
      }else {
        break
      }
    }
  }
  return a
};
cljs.core.List = function(a, b, c, d, e) {
  this.meta = a;
  this.first = b;
  this.rest = c;
  this.count = d;
  this.__hash = e;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 65937646
};
cljs.core.List.cljs$lang$type = !0;
cljs.core.List.cljs$lang$ctorStr = "cljs.core/List";
cljs.core.List.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write(b, "cljs.core/List")
};
cljs.core.List.prototype.cljs$core$IHash$_hash$arity$1 = function(a) {
  var b = this.__hash;
  return null != b ? b : this.__hash = a = cljs.core.hash_coll(a)
};
cljs.core.List.prototype.cljs$core$INext$_next$arity$1 = function() {
  return 1 === this.count ? null : this.rest
};
cljs.core.List.prototype.cljs$core$ICollection$_conj$arity$2 = function(a, b) {
  return new cljs.core.List(this.meta, b, a, this.count + 1, null)
};
cljs.core.List.prototype.toString = function() {
  return cljs.core.pr_str_STAR_(this)
};
cljs.core.List.prototype.cljs$core$IReduce$_reduce$arity$2 = function(a, b) {
  return cljs.core.seq_reduce.cljs$core$IFn$_invoke$arity$2(b, a)
};
cljs.core.List.prototype.cljs$core$IReduce$_reduce$arity$3 = function(a, b, c) {
  return cljs.core.seq_reduce.cljs$core$IFn$_invoke$arity$3(b, c, a)
};
cljs.core.List.prototype.cljs$core$ISeqable$_seq$arity$1 = function(a) {
  return a
};
cljs.core.List.prototype.cljs$core$ICounted$_count$arity$1 = function() {
  return this.count
};
cljs.core.List.prototype.cljs$core$IStack$_peek$arity$1 = function() {
  return this.first
};
cljs.core.List.prototype.cljs$core$IStack$_pop$arity$1 = function(a) {
  return a.cljs$core$ISeq$_rest$arity$1(a)
};
cljs.core.List.prototype.cljs$core$ISeq$_first$arity$1 = function() {
  return this.first
};
cljs.core.List.prototype.cljs$core$ISeq$_rest$arity$1 = function() {
  return 1 === this.count ? cljs.core.List.EMPTY : this.rest
};
cljs.core.List.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(a, b) {
  return cljs.core.equiv_sequential(a, b)
};
cljs.core.List.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(a, b) {
  return new cljs.core.List(b, this.first, this.rest, this.count, this.__hash)
};
cljs.core.List.prototype.cljs$core$IMeta$_meta$arity$1 = function() {
  return this.meta
};
cljs.core.List.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function() {
  return cljs.core.List.EMPTY
};
cljs.core.__GT_List = function(a, b, c, d, e) {
  return new cljs.core.List(a, b, c, d, e)
};
cljs.core.EmptyList = function(a) {
  this.meta = a;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 65413326
};
cljs.core.EmptyList.cljs$lang$type = !0;
cljs.core.EmptyList.cljs$lang$ctorStr = "cljs.core/EmptyList";
cljs.core.EmptyList.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write(b, "cljs.core/EmptyList")
};
cljs.core.EmptyList.prototype.cljs$core$IHash$_hash$arity$1 = function() {
  return 0
};
cljs.core.EmptyList.prototype.cljs$core$INext$_next$arity$1 = function() {
  return null
};
cljs.core.EmptyList.prototype.cljs$core$ICollection$_conj$arity$2 = function(a, b) {
  return new cljs.core.List(this.meta, b, null, 1, null)
};
cljs.core.EmptyList.prototype.toString = function() {
  return cljs.core.pr_str_STAR_(this)
};
cljs.core.EmptyList.prototype.cljs$core$ISeqable$_seq$arity$1 = function() {
  return null
};
cljs.core.EmptyList.prototype.cljs$core$ICounted$_count$arity$1 = function() {
  return 0
};
cljs.core.EmptyList.prototype.cljs$core$IStack$_peek$arity$1 = function() {
  return null
};
cljs.core.EmptyList.prototype.cljs$core$IStack$_pop$arity$1 = function() {
  throw Error("Can't pop empty list");
};
cljs.core.EmptyList.prototype.cljs$core$ISeq$_first$arity$1 = function() {
  return null
};
cljs.core.EmptyList.prototype.cljs$core$ISeq$_rest$arity$1 = function() {
  return cljs.core.List.EMPTY
};
cljs.core.EmptyList.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(a, b) {
  return cljs.core.equiv_sequential(a, b)
};
cljs.core.EmptyList.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(a, b) {
  return new cljs.core.EmptyList(b)
};
cljs.core.EmptyList.prototype.cljs$core$IMeta$_meta$arity$1 = function() {
  return this.meta
};
cljs.core.EmptyList.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function(a) {
  return a
};
cljs.core.__GT_EmptyList = function(a) {
  return new cljs.core.EmptyList(a)
};
cljs.core.List.EMPTY = new cljs.core.EmptyList(null);
cljs.core.reversible_QMARK_ = function(a) {
  if(a) {
    var b;
    b = (b = a.cljs$lang$protocol_mask$partition0$ & 134217728) ? b : a.cljs$core$IReversible$;
    return b ? !0 : a.cljs$lang$protocol_mask$partition0$ ? !1 : cljs.core.type_satisfies_(cljs.core.IReversible, a)
  }
  return cljs.core.type_satisfies_(cljs.core.IReversible, a)
};
cljs.core.rseq = function(a) {
  return cljs.core._rseq(a)
};
cljs.core.reverse = function(a) {
  return cljs.core.reversible_QMARK_(a) ? cljs.core.rseq(a) : cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core.conj, cljs.core.List.EMPTY, a)
};
cljs.core.list = function() {
  var a = function(a) {
    var b;
    if(a instanceof cljs.core.IndexedSeq) {
      b = a.arr
    }else {
      a: {
        for(b = [];;) {
          if(null != a) {
            b.push(a.cljs$core$ISeq$_first$arity$1(a)), a = a.cljs$core$INext$_next$arity$1(a)
          }else {
            break a
          }
        }
        b = void 0
      }
    }
    for(var a = b.length, e = cljs.core.List.EMPTY;;) {
      if(0 < a) {
        var f = a - 1, e = e.cljs$core$ICollection$_conj$arity$2(e, b[a - 1]), a = f
      }else {
        return e
      }
    }
  }, b = function(b) {
    var d = null;
    0 < arguments.length && (d = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0));
    return a.call(this, d)
  };
  b.cljs$lang$maxFixedArity = 0;
  b.cljs$lang$applyTo = function(b) {
    b = cljs.core.seq(b);
    return a(b)
  };
  b.cljs$core$IFn$_invoke$arity$variadic = a;
  return b
}();
cljs.core.Cons = function(a, b, c, d) {
  this.meta = a;
  this.first = b;
  this.rest = c;
  this.__hash = d;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 65405164
};
cljs.core.Cons.cljs$lang$type = !0;
cljs.core.Cons.cljs$lang$ctorStr = "cljs.core/Cons";
cljs.core.Cons.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write(b, "cljs.core/Cons")
};
cljs.core.Cons.prototype.cljs$core$IHash$_hash$arity$1 = function(a) {
  var b = this.__hash;
  return null != b ? b : this.__hash = a = cljs.core.hash_coll(a)
};
cljs.core.Cons.prototype.cljs$core$INext$_next$arity$1 = function() {
  return null == this.rest ? null : cljs.core._seq(this.rest)
};
cljs.core.Cons.prototype.cljs$core$ICollection$_conj$arity$2 = function(a, b) {
  return new cljs.core.Cons(null, b, a, this.__hash)
};
cljs.core.Cons.prototype.toString = function() {
  return cljs.core.pr_str_STAR_(this)
};
cljs.core.Cons.prototype.cljs$core$ISeqable$_seq$arity$1 = function(a) {
  return a
};
cljs.core.Cons.prototype.cljs$core$ISeq$_first$arity$1 = function() {
  return this.first
};
cljs.core.Cons.prototype.cljs$core$ISeq$_rest$arity$1 = function() {
  return null == this.rest ? cljs.core.List.EMPTY : this.rest
};
cljs.core.Cons.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(a, b) {
  return cljs.core.equiv_sequential(a, b)
};
cljs.core.Cons.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(a, b) {
  return new cljs.core.Cons(b, this.first, this.rest, this.__hash)
};
cljs.core.Cons.prototype.cljs$core$IMeta$_meta$arity$1 = function() {
  return this.meta
};
cljs.core.Cons.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function() {
  return cljs.core.with_meta(cljs.core.List.EMPTY, this.meta)
};
cljs.core.__GT_Cons = function(a, b, c, d) {
  return new cljs.core.Cons(a, b, c, d)
};
cljs.core.cons = function(a, b) {
  return function() {
    var a = null == b;
    return a ? a : b ? (a = (a = b.cljs$lang$protocol_mask$partition0$ & 64) ? a : b.cljs$core$ISeq$, a ? !0 : !1) : !1
  }() ? new cljs.core.Cons(null, a, b, null) : new cljs.core.Cons(null, a, cljs.core.seq(b), null)
};
cljs.core.list_QMARK_ = function(a) {
  if(a) {
    var b;
    b = (b = a.cljs$lang$protocol_mask$partition0$ & 33554432) ? b : a.cljs$core$IList$;
    return b ? !0 : a.cljs$lang$protocol_mask$partition0$ ? !1 : cljs.core.type_satisfies_(cljs.core.IList, a)
  }
  return cljs.core.type_satisfies_(cljs.core.IList, a)
};
cljs.core.IHash.string = !0;
cljs.core._hash.string = function(a) {
  return goog.string.hashCode(a)
};
cljs.core.Keyword = function(a) {
  this.k = a;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 1
};
cljs.core.Keyword.cljs$lang$type = !0;
cljs.core.Keyword.cljs$lang$ctorStr = "cljs.core/Keyword";
cljs.core.Keyword.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write(b, "cljs.core/Keyword")
};
cljs.core.Keyword.prototype.call = function() {
  var a = null;
  return a = function(a, c, d) {
    switch(arguments.length) {
      case 2:
        var e = a, e = this;
        if(null == c) {
          e = null
        }else {
          var f;
          c ? (f = (f = c.cljs$lang$protocol_mask$partition0$ & 256) ? f : c.cljs$core$ILookup$, f = f ? !0 : c.cljs$lang$protocol_mask$partition0$ ? !1 : cljs.core.type_satisfies_(cljs.core.ILookup, c)) : f = cljs.core.type_satisfies_(cljs.core.ILookup, c);
          e = f ? cljs.core._lookup.cljs$core$IFn$_invoke$arity$3(c, e.k, null) : null
        }
        return e;
      case 3:
        return e = a, e = this, null == c ? e = d : (f = c ? ((f = c.cljs$lang$protocol_mask$partition0$ & 256) ? f : c.cljs$core$ILookup$) || (c.cljs$lang$protocol_mask$partition0$ ? 0 : cljs.core.type_satisfies_(cljs.core.ILookup, c)) : cljs.core.type_satisfies_(cljs.core.ILookup, c), e = f ? cljs.core._lookup.cljs$core$IFn$_invoke$arity$3(c, e.k, d) : null), e
    }
    throw Error("Invalid arity: " + arguments.length);
  }
}();
cljs.core.Keyword.prototype.apply = function(a, b) {
  a = this;
  return a.call.apply(a, [a].concat(b.slice()))
};
cljs.core.__GT_Keyword = function(a) {
  return new cljs.core.Keyword(a)
};
String.prototype.cljs$core$IFn$ = !0;
String.prototype.call = function() {
  var a = null;
  return a = function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return cljs.core.get.cljs$core$IFn$_invoke$arity$2(c, this.toString());
      case 3:
        return cljs.core.get.cljs$core$IFn$_invoke$arity$3(c, this.toString(), d)
    }
    throw Error("Invalid arity: " + arguments.length);
  }
}();
String.prototype.apply = function(a, b) {
  return a.call.apply(a, [a].concat(b.slice()))
};
String.prototype.apply = function(a, b) {
  return 2 > b.length ? cljs.core.get.cljs$core$IFn$_invoke$arity$2(b[0], a) : cljs.core.get.cljs$core$IFn$_invoke$arity$3(b[0], a, b[1])
};
cljs.core.lazy_seq_value = function(a) {
  var b = a.x;
  if(a.realized) {
    return b
  }
  a.x = b.cljs$core$IFn$_invoke$arity$0 ? b.cljs$core$IFn$_invoke$arity$0() : b.call(null);
  a.realized = !0;
  return a.x
};
cljs.core.LazySeq = function(a, b, c, d) {
  this.meta = a;
  this.realized = b;
  this.x = c;
  this.__hash = d;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 31850700
};
cljs.core.LazySeq.cljs$lang$type = !0;
cljs.core.LazySeq.cljs$lang$ctorStr = "cljs.core/LazySeq";
cljs.core.LazySeq.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write(b, "cljs.core/LazySeq")
};
cljs.core.LazySeq.prototype.cljs$core$IHash$_hash$arity$1 = function(a) {
  var b = this.__hash;
  return null != b ? b : this.__hash = a = cljs.core.hash_coll(a)
};
cljs.core.LazySeq.prototype.cljs$core$INext$_next$arity$1 = function(a) {
  return cljs.core._seq(a.cljs$core$ISeq$_rest$arity$1(a))
};
cljs.core.LazySeq.prototype.cljs$core$ICollection$_conj$arity$2 = function(a, b) {
  return cljs.core.cons(b, a)
};
cljs.core.LazySeq.prototype.toString = function() {
  return cljs.core.pr_str_STAR_(this)
};
cljs.core.LazySeq.prototype.cljs$core$ISeqable$_seq$arity$1 = function(a) {
  return cljs.core.seq(cljs.core.lazy_seq_value(a))
};
cljs.core.LazySeq.prototype.cljs$core$ISeq$_first$arity$1 = function(a) {
  return cljs.core.first(cljs.core.lazy_seq_value(a))
};
cljs.core.LazySeq.prototype.cljs$core$ISeq$_rest$arity$1 = function(a) {
  return cljs.core.rest(cljs.core.lazy_seq_value(a))
};
cljs.core.LazySeq.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(a, b) {
  return cljs.core.equiv_sequential(a, b)
};
cljs.core.LazySeq.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(a, b) {
  return new cljs.core.LazySeq(b, this.realized, this.x, this.__hash)
};
cljs.core.LazySeq.prototype.cljs$core$IMeta$_meta$arity$1 = function() {
  return this.meta
};
cljs.core.LazySeq.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function() {
  return cljs.core.with_meta(cljs.core.List.EMPTY, this.meta)
};
cljs.core.__GT_LazySeq = function(a, b, c, d) {
  return new cljs.core.LazySeq(a, b, c, d)
};
cljs.core.ChunkBuffer = function(a, b) {
  this.buf = a;
  this.end = b;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 2
};
cljs.core.ChunkBuffer.cljs$lang$type = !0;
cljs.core.ChunkBuffer.cljs$lang$ctorStr = "cljs.core/ChunkBuffer";
cljs.core.ChunkBuffer.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write(b, "cljs.core/ChunkBuffer")
};
cljs.core.ChunkBuffer.prototype.cljs$core$ICounted$_count$arity$1 = function() {
  return this.end
};
cljs.core.ChunkBuffer.prototype.add = function(a) {
  this.buf[this.end] = a;
  return this.end += 1
};
cljs.core.ChunkBuffer.prototype.chunk = function() {
  var a = new cljs.core.ArrayChunk(this.buf, 0, this.end);
  this.buf = null;
  return a
};
cljs.core.__GT_ChunkBuffer = function(a, b) {
  return new cljs.core.ChunkBuffer(a, b)
};
cljs.core.chunk_buffer = function(a) {
  return new cljs.core.ChunkBuffer(Array(a), 0)
};
cljs.core.ArrayChunk = function(a, b, c) {
  this.arr = a;
  this.off = b;
  this.end = c;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 524306
};
cljs.core.ArrayChunk.cljs$lang$type = !0;
cljs.core.ArrayChunk.cljs$lang$ctorStr = "cljs.core/ArrayChunk";
cljs.core.ArrayChunk.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write(b, "cljs.core/ArrayChunk")
};
cljs.core.ArrayChunk.prototype.cljs$core$IReduce$_reduce$arity$2 = function(a, b) {
  return cljs.core.array_reduce.cljs$core$IFn$_invoke$arity$4(this.arr, b, this.arr[this.off], this.off + 1)
};
cljs.core.ArrayChunk.prototype.cljs$core$IReduce$_reduce$arity$3 = function(a, b, c) {
  return cljs.core.array_reduce.cljs$core$IFn$_invoke$arity$4(this.arr, b, c, this.off)
};
cljs.core.ArrayChunk.prototype.cljs$core$IChunk$ = !0;
cljs.core.ArrayChunk.prototype.cljs$core$IChunk$_drop_first$arity$1 = function() {
  if(this.off === this.end) {
    throw Error("-drop-first of empty chunk");
  }
  return new cljs.core.ArrayChunk(this.arr, this.off + 1, this.end)
};
cljs.core.ArrayChunk.prototype.cljs$core$IIndexed$_nth$arity$2 = function(a, b) {
  return this.arr[this.off + b]
};
cljs.core.ArrayChunk.prototype.cljs$core$IIndexed$_nth$arity$3 = function(a, b, c) {
  a = (a = 0 <= b) ? b < this.end - this.off : a;
  return a ? this.arr[this.off + b] : c
};
cljs.core.ArrayChunk.prototype.cljs$core$ICounted$_count$arity$1 = function() {
  return this.end - this.off
};
cljs.core.__GT_ArrayChunk = function(a, b, c) {
  return new cljs.core.ArrayChunk(a, b, c)
};
cljs.core.array_chunk = function() {
  var a = null, b = function(a) {
    return new cljs.core.ArrayChunk(a, 0, a.length)
  }, c = function(a, b) {
    return new cljs.core.ArrayChunk(a, b, a.length)
  }, d = function(a, b, c) {
    return new cljs.core.ArrayChunk(a, b, c)
  }, a = function(a, f, g) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, f);
      case 3:
        return d.call(this, a, f, g)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$2 = c;
  a.cljs$core$IFn$_invoke$arity$3 = d;
  return a
}();
cljs.core.ChunkedCons = function(a, b, c, d) {
  this.chunk = a;
  this.more = b;
  this.meta = c;
  this.__hash = d;
  this.cljs$lang$protocol_mask$partition0$ = 31850604;
  this.cljs$lang$protocol_mask$partition1$ = 1536
};
cljs.core.ChunkedCons.cljs$lang$type = !0;
cljs.core.ChunkedCons.cljs$lang$ctorStr = "cljs.core/ChunkedCons";
cljs.core.ChunkedCons.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write(b, "cljs.core/ChunkedCons")
};
cljs.core.ChunkedCons.prototype.cljs$core$IHash$_hash$arity$1 = function(a) {
  var b = this.__hash;
  return null != b ? b : this.__hash = a = cljs.core.hash_coll(a)
};
cljs.core.ChunkedCons.prototype.cljs$core$ICollection$_conj$arity$2 = function(a, b) {
  return cljs.core.cons(b, a)
};
cljs.core.ChunkedCons.prototype.toString = function() {
  return cljs.core.pr_str_STAR_(this)
};
cljs.core.ChunkedCons.prototype.cljs$core$ISeqable$_seq$arity$1 = function(a) {
  return a
};
cljs.core.ChunkedCons.prototype.cljs$core$ISeq$_first$arity$1 = function() {
  return cljs.core._nth.cljs$core$IFn$_invoke$arity$2(this.chunk, 0)
};
cljs.core.ChunkedCons.prototype.cljs$core$ISeq$_rest$arity$1 = function() {
  return 1 < cljs.core._count(this.chunk) ? new cljs.core.ChunkedCons(cljs.core._drop_first(this.chunk), this.more, this.meta, null) : null == this.more ? cljs.core.List.EMPTY : this.more
};
cljs.core.ChunkedCons.prototype.cljs$core$IChunkedNext$_chunked_next$arity$1 = function() {
  return null == this.more ? null : this.more
};
cljs.core.ChunkedCons.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(a, b) {
  return cljs.core.equiv_sequential(a, b)
};
cljs.core.ChunkedCons.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(a, b) {
  return new cljs.core.ChunkedCons(this.chunk, this.more, b, this.__hash)
};
cljs.core.ChunkedCons.prototype.cljs$core$IMeta$_meta$arity$1 = function() {
  return this.meta
};
cljs.core.ChunkedCons.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function() {
  return cljs.core.with_meta(cljs.core.List.EMPTY, this.meta)
};
cljs.core.ChunkedCons.prototype.cljs$core$IChunkedSeq$_chunked_first$arity$1 = function() {
  return this.chunk
};
cljs.core.ChunkedCons.prototype.cljs$core$IChunkedSeq$_chunked_rest$arity$1 = function() {
  return null == this.more ? cljs.core.List.EMPTY : this.more
};
cljs.core.__GT_ChunkedCons = function(a, b, c, d) {
  return new cljs.core.ChunkedCons(a, b, c, d)
};
cljs.core.chunk_cons = function(a, b) {
  return 0 === cljs.core._count(a) ? b : new cljs.core.ChunkedCons(a, b, null, null)
};
cljs.core.chunk_append = function(a, b) {
  return a.add(b)
};
cljs.core.chunk = function(a) {
  return a.chunk()
};
cljs.core.chunk_first = function(a) {
  return cljs.core._chunked_first(a)
};
cljs.core.chunk_rest = function(a) {
  return cljs.core._chunked_rest(a)
};
cljs.core.chunk_next = function(a) {
  var b;
  a ? (b = (b = a.cljs$lang$protocol_mask$partition1$ & 1024) ? b : a.cljs$core$IChunkedNext$, b = b ? !0 : !1) : b = !1;
  return b ? cljs.core._chunked_next(a) : cljs.core.seq(cljs.core._chunked_rest(a))
};
cljs.core.to_array = function(a) {
  for(var b = [];;) {
    if(cljs.core.seq(a)) {
      b.push(cljs.core.first(a)), a = cljs.core.next(a)
    }else {
      return b
    }
  }
};
cljs.core.to_array_2d = function(a) {
  for(var b = Array(cljs.core.count(a)), c = 0, a = cljs.core.seq(a);;) {
    if(a) {
      b[c] = cljs.core.to_array(cljs.core.first(a)), c += 1, a = cljs.core.next(a)
    }else {
      break
    }
  }
  return b
};
cljs.core.int_array = function() {
  var a = null, b = function(b) {
    return"number" === typeof b ? a.cljs$core$IFn$_invoke$arity$2(b, null) : cljs.core.into_array.cljs$core$IFn$_invoke$arity$1(b)
  }, c = function(a, b) {
    var c = Array(a);
    if(cljs.core.seq_QMARK_(b)) {
      for(var g = 0, h = cljs.core.seq(b);;) {
        if(cljs.core.truth_(function() {
          var b = h;
          return b ? g < a : b
        }())) {
          c[g] = cljs.core.first(h);
          var i = g + 1, j = cljs.core.next(h), g = i, h = j
        }else {
          return c
        }
      }
    }else {
      for(i = 0;;) {
        if(i < a) {
          c[i] = b, i += 1
        }else {
          break
        }
      }
      return c
    }
  }, a = function(a, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, e)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$2 = c;
  return a
}();
cljs.core.long_array = function() {
  var a = null, b = function(b) {
    return"number" === typeof b ? a.cljs$core$IFn$_invoke$arity$2(b, null) : cljs.core.into_array.cljs$core$IFn$_invoke$arity$1(b)
  }, c = function(a, b) {
    var c = Array(a);
    if(cljs.core.seq_QMARK_(b)) {
      for(var g = 0, h = cljs.core.seq(b);;) {
        if(cljs.core.truth_(function() {
          var b = h;
          return b ? g < a : b
        }())) {
          c[g] = cljs.core.first(h);
          var i = g + 1, j = cljs.core.next(h), g = i, h = j
        }else {
          return c
        }
      }
    }else {
      for(i = 0;;) {
        if(i < a) {
          c[i] = b, i += 1
        }else {
          break
        }
      }
      return c
    }
  }, a = function(a, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, e)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$2 = c;
  return a
}();
cljs.core.double_array = function() {
  var a = null, b = function(b) {
    return"number" === typeof b ? a.cljs$core$IFn$_invoke$arity$2(b, null) : cljs.core.into_array.cljs$core$IFn$_invoke$arity$1(b)
  }, c = function(a, b) {
    var c = Array(a);
    if(cljs.core.seq_QMARK_(b)) {
      for(var g = 0, h = cljs.core.seq(b);;) {
        if(cljs.core.truth_(function() {
          var b = h;
          return b ? g < a : b
        }())) {
          c[g] = cljs.core.first(h);
          var i = g + 1, j = cljs.core.next(h), g = i, h = j
        }else {
          return c
        }
      }
    }else {
      for(i = 0;;) {
        if(i < a) {
          c[i] = b, i += 1
        }else {
          break
        }
      }
      return c
    }
  }, a = function(a, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, e)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$2 = c;
  return a
}();
cljs.core.object_array = function() {
  var a = null, b = function(b) {
    return"number" === typeof b ? a.cljs$core$IFn$_invoke$arity$2(b, null) : cljs.core.into_array.cljs$core$IFn$_invoke$arity$1(b)
  }, c = function(a, b) {
    var c = Array(a);
    if(cljs.core.seq_QMARK_(b)) {
      for(var g = 0, h = cljs.core.seq(b);;) {
        if(cljs.core.truth_(function() {
          var b = h;
          return b ? g < a : b
        }())) {
          c[g] = cljs.core.first(h);
          var i = g + 1, j = cljs.core.next(h), g = i, h = j
        }else {
          return c
        }
      }
    }else {
      for(i = 0;;) {
        if(i < a) {
          c[i] = b, i += 1
        }else {
          break
        }
      }
      return c
    }
  }, a = function(a, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, e)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$2 = c;
  return a
}();
cljs.core.bounded_count = function(a, b) {
  if(cljs.core.counted_QMARK_(a)) {
    return cljs.core.count(a)
  }
  for(var c = a, d = b, e = 0;;) {
    if(cljs.core.truth_(function() {
      var a = 0 < d;
      return a ? cljs.core.seq(c) : a
    }())) {
      var f = cljs.core.next(c), g = d - 1, e = e + 1, c = f, d = g
    }else {
      return e
    }
  }
};
cljs.core.spread = function spread(b) {
  return null == b ? null : null == cljs.core.next(b) ? cljs.core.seq(cljs.core.first(b)) : cljs.core.cons(cljs.core.first(b), spread(cljs.core.next(b)))
};
cljs.core.concat = function() {
  var a = null, b = function() {
    return new cljs.core.LazySeq(null, !1, function() {
      return null
    }, null)
  }, c = function(a) {
    return new cljs.core.LazySeq(null, !1, function() {
      return a
    }, null)
  }, d = function(b, c) {
    return new cljs.core.LazySeq(null, !1, function() {
      var d = cljs.core.seq(b);
      return d ? cljs.core.chunked_seq_QMARK_(d) ? cljs.core.chunk_cons(cljs.core.chunk_first(d), a.cljs$core$IFn$_invoke$arity$2(cljs.core.chunk_rest(d), c)) : cljs.core.cons(cljs.core.first(d), a.cljs$core$IFn$_invoke$arity$2(cljs.core.rest(d), c)) : c
    }, null)
  }, e = function(b, c, d) {
    return function k(a, b) {
      return new cljs.core.LazySeq(null, !1, function() {
        var c = cljs.core.seq(a);
        return c ? cljs.core.chunked_seq_QMARK_(c) ? cljs.core.chunk_cons(cljs.core.chunk_first(c), k(cljs.core.chunk_rest(c), b)) : cljs.core.cons(cljs.core.first(c), k(cljs.core.rest(c), b)) : cljs.core.truth_(b) ? k(cljs.core.first(b), cljs.core.next(b)) : null
      }, null)
    }(a.cljs$core$IFn$_invoke$arity$2(b, c), d)
  }, f = function(a, b, c) {
    var d = null;
    2 < arguments.length && (d = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
    return e.call(this, a, b, d)
  };
  f.cljs$lang$maxFixedArity = 2;
  f.cljs$lang$applyTo = function(a) {
    var b = cljs.core.first(a), a = cljs.core.next(a), c = cljs.core.first(a), a = cljs.core.rest(a);
    return e(b, c, a)
  };
  f.cljs$core$IFn$_invoke$arity$variadic = e;
  a = function(a, e, i) {
    switch(arguments.length) {
      case 0:
        return b.call(this);
      case 1:
        return c.call(this, a);
      case 2:
        return d.call(this, a, e);
      default:
        return f.cljs$core$IFn$_invoke$arity$variadic(a, e, cljs.core.array_seq(arguments, 2))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = f.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$0 = b;
  a.cljs$core$IFn$_invoke$arity$1 = c;
  a.cljs$core$IFn$_invoke$arity$2 = d;
  a.cljs$core$IFn$_invoke$arity$variadic = f.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
cljs.core.list_STAR_ = function() {
  var a = null, b = function(a) {
    return cljs.core.seq(a)
  }, c = function(a, b) {
    return cljs.core.cons(a, b)
  }, d = function(a, b, c) {
    return cljs.core.cons(a, cljs.core.cons(b, c))
  }, e = function(a, b, c, d) {
    return cljs.core.cons(a, cljs.core.cons(b, cljs.core.cons(c, d)))
  }, f = function(a, b, c, d, e) {
    return cljs.core.cons(a, cljs.core.cons(b, cljs.core.cons(c, cljs.core.cons(d, cljs.core.spread(e)))))
  }, g = function(a, b, c, d, e) {
    var g = null;
    4 < arguments.length && (g = cljs.core.array_seq(Array.prototype.slice.call(arguments, 4), 0));
    return f.call(this, a, b, c, d, g)
  };
  g.cljs$lang$maxFixedArity = 4;
  g.cljs$lang$applyTo = function(a) {
    var b = cljs.core.first(a), a = cljs.core.next(a), c = cljs.core.first(a), a = cljs.core.next(a), d = cljs.core.first(a), a = cljs.core.next(a), e = cljs.core.first(a), a = cljs.core.rest(a);
    return f(b, c, d, e, a)
  };
  g.cljs$core$IFn$_invoke$arity$variadic = f;
  a = function(a, f, j, k, m) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, f);
      case 3:
        return d.call(this, a, f, j);
      case 4:
        return e.call(this, a, f, j, k);
      default:
        return g.cljs$core$IFn$_invoke$arity$variadic(a, f, j, k, cljs.core.array_seq(arguments, 4))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 4;
  a.cljs$lang$applyTo = g.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$2 = c;
  a.cljs$core$IFn$_invoke$arity$3 = d;
  a.cljs$core$IFn$_invoke$arity$4 = e;
  a.cljs$core$IFn$_invoke$arity$variadic = g.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
cljs.core.transient$ = function(a) {
  return cljs.core._as_transient(a)
};
cljs.core.persistent_BANG_ = function(a) {
  return cljs.core._persistent_BANG_(a)
};
cljs.core.conj_BANG_ = function(a, b) {
  return cljs.core._conj_BANG_(a, b)
};
cljs.core.assoc_BANG_ = function(a, b, c) {
  return cljs.core._assoc_BANG_(a, b, c)
};
cljs.core.dissoc_BANG_ = function(a, b) {
  return cljs.core._dissoc_BANG_(a, b)
};
cljs.core.pop_BANG_ = function(a) {
  return cljs.core._pop_BANG_(a)
};
cljs.core.disj_BANG_ = function(a, b) {
  return cljs.core._disjoin_BANG_(a, b)
};
cljs.core.apply_to = function(a, b, c) {
  var d = cljs.core.seq(c);
  if(0 === b) {
    return a.cljs$core$IFn$_invoke$arity$0 ? a.cljs$core$IFn$_invoke$arity$0() : a.call(null)
  }
  var c = cljs.core._first(d), e = cljs.core._rest(d);
  if(1 === b) {
    return a.cljs$core$IFn$_invoke$arity$1 ? a.cljs$core$IFn$_invoke$arity$1(c) : a.cljs$core$IFn$_invoke$arity$1 ? a.cljs$core$IFn$_invoke$arity$1(c) : a.call(null, c)
  }
  var d = cljs.core._first(e), f = cljs.core._rest(e);
  if(2 === b) {
    return a.cljs$core$IFn$_invoke$arity$2 ? a.cljs$core$IFn$_invoke$arity$2(c, d) : a.cljs$core$IFn$_invoke$arity$2 ? a.cljs$core$IFn$_invoke$arity$2(c, d) : a.call(null, c, d)
  }
  var e = cljs.core._first(f), g = cljs.core._rest(f);
  if(3 === b) {
    return a.cljs$core$IFn$_invoke$arity$3 ? a.cljs$core$IFn$_invoke$arity$3(c, d, e) : a.cljs$core$IFn$_invoke$arity$3 ? a.cljs$core$IFn$_invoke$arity$3(c, d, e) : a.call(null, c, d, e)
  }
  var f = cljs.core._first(g), h = cljs.core._rest(g);
  if(4 === b) {
    return a.cljs$core$IFn$_invoke$arity$4 ? a.cljs$core$IFn$_invoke$arity$4(c, d, e, f) : a.cljs$core$IFn$_invoke$arity$4 ? a.cljs$core$IFn$_invoke$arity$4(c, d, e, f) : a.call(null, c, d, e, f)
  }
  g = cljs.core._first(h);
  h = cljs.core._rest(h);
  if(5 === b) {
    return a.cljs$core$IFn$_invoke$arity$5 ? a.cljs$core$IFn$_invoke$arity$5(c, d, e, f, g) : a.cljs$core$IFn$_invoke$arity$5 ? a.cljs$core$IFn$_invoke$arity$5(c, d, e, f, g) : a.call(null, c, d, e, f, g)
  }
  var a = cljs.core._first(h), i = cljs.core._rest(h);
  if(6 === b) {
    return a.cljs$core$IFn$_invoke$arity$6 ? a.cljs$core$IFn$_invoke$arity$6(c, d, e, f, g, a) : a.cljs$core$IFn$_invoke$arity$6 ? a.cljs$core$IFn$_invoke$arity$6(c, d, e, f, g, a) : a.call(null, c, d, e, f, g, a)
  }
  var h = cljs.core._first(i), j = cljs.core._rest(i);
  if(7 === b) {
    return a.cljs$core$IFn$_invoke$arity$7 ? a.cljs$core$IFn$_invoke$arity$7(c, d, e, f, g, a, h) : a.cljs$core$IFn$_invoke$arity$7 ? a.cljs$core$IFn$_invoke$arity$7(c, d, e, f, g, a, h) : a.call(null, c, d, e, f, g, a, h)
  }
  var i = cljs.core._first(j), k = cljs.core._rest(j);
  if(8 === b) {
    return a.cljs$core$IFn$_invoke$arity$8 ? a.cljs$core$IFn$_invoke$arity$8(c, d, e, f, g, a, h, i) : a.cljs$core$IFn$_invoke$arity$8 ? a.cljs$core$IFn$_invoke$arity$8(c, d, e, f, g, a, h, i) : a.call(null, c, d, e, f, g, a, h, i)
  }
  var j = cljs.core._first(k), m = cljs.core._rest(k);
  if(9 === b) {
    return a.cljs$core$IFn$_invoke$arity$9 ? a.cljs$core$IFn$_invoke$arity$9(c, d, e, f, g, a, h, i, j) : a.cljs$core$IFn$_invoke$arity$9 ? a.cljs$core$IFn$_invoke$arity$9(c, d, e, f, g, a, h, i, j) : a.call(null, c, d, e, f, g, a, h, i, j)
  }
  var k = cljs.core._first(m), l = cljs.core._rest(m);
  if(10 === b) {
    return a.cljs$core$IFn$_invoke$arity$10 ? a.cljs$core$IFn$_invoke$arity$10(c, d, e, f, g, a, h, i, j, k) : a.cljs$core$IFn$_invoke$arity$10 ? a.cljs$core$IFn$_invoke$arity$10(c, d, e, f, g, a, h, i, j, k) : a.call(null, c, d, e, f, g, a, h, i, j, k)
  }
  var m = cljs.core._first(l), n = cljs.core._rest(l);
  if(11 === b) {
    return a.cljs$core$IFn$_invoke$arity$11 ? a.cljs$core$IFn$_invoke$arity$11(c, d, e, f, g, a, h, i, j, k, m) : a.cljs$core$IFn$_invoke$arity$11 ? a.cljs$core$IFn$_invoke$arity$11(c, d, e, f, g, a, h, i, j, k, m) : a.call(null, c, d, e, f, g, a, h, i, j, k, m)
  }
  var l = cljs.core._first(n), p = cljs.core._rest(n);
  if(12 === b) {
    return a.cljs$core$IFn$_invoke$arity$12 ? a.cljs$core$IFn$_invoke$arity$12(c, d, e, f, g, a, h, i, j, k, m, l) : a.cljs$core$IFn$_invoke$arity$12 ? a.cljs$core$IFn$_invoke$arity$12(c, d, e, f, g, a, h, i, j, k, m, l) : a.call(null, c, d, e, f, g, a, h, i, j, k, m, l)
  }
  var n = cljs.core._first(p), q = cljs.core._rest(p);
  if(13 === b) {
    return a.cljs$core$IFn$_invoke$arity$13 ? a.cljs$core$IFn$_invoke$arity$13(c, d, e, f, g, a, h, i, j, k, m, l, n) : a.cljs$core$IFn$_invoke$arity$13 ? a.cljs$core$IFn$_invoke$arity$13(c, d, e, f, g, a, h, i, j, k, m, l, n) : a.call(null, c, d, e, f, g, a, h, i, j, k, m, l, n)
  }
  var p = cljs.core._first(q), r = cljs.core._rest(q);
  if(14 === b) {
    return a.cljs$core$IFn$_invoke$arity$14 ? a.cljs$core$IFn$_invoke$arity$14(c, d, e, f, g, a, h, i, j, k, m, l, n, p) : a.cljs$core$IFn$_invoke$arity$14 ? a.cljs$core$IFn$_invoke$arity$14(c, d, e, f, g, a, h, i, j, k, m, l, n, p) : a.call(null, c, d, e, f, g, a, h, i, j, k, m, l, n, p)
  }
  var q = cljs.core._first(r), s = cljs.core._rest(r);
  if(15 === b) {
    return a.cljs$core$IFn$_invoke$arity$15 ? a.cljs$core$IFn$_invoke$arity$15(c, d, e, f, g, a, h, i, j, k, m, l, n, p, q) : a.cljs$core$IFn$_invoke$arity$15 ? a.cljs$core$IFn$_invoke$arity$15(c, d, e, f, g, a, h, i, j, k, m, l, n, p, q) : a.call(null, c, d, e, f, g, a, h, i, j, k, m, l, n, p, q)
  }
  var r = cljs.core._first(s), u = cljs.core._rest(s);
  if(16 === b) {
    return a.cljs$core$IFn$_invoke$arity$16 ? a.cljs$core$IFn$_invoke$arity$16(c, d, e, f, g, a, h, i, j, k, m, l, n, p, q, r) : a.cljs$core$IFn$_invoke$arity$16 ? a.cljs$core$IFn$_invoke$arity$16(c, d, e, f, g, a, h, i, j, k, m, l, n, p, q, r) : a.call(null, c, d, e, f, g, a, h, i, j, k, m, l, n, p, q, r)
  }
  var s = cljs.core._first(u), t = cljs.core._rest(u);
  if(17 === b) {
    return a.cljs$core$IFn$_invoke$arity$17 ? a.cljs$core$IFn$_invoke$arity$17(c, d, e, f, g, a, h, i, j, k, m, l, n, p, q, r, s) : a.cljs$core$IFn$_invoke$arity$17 ? a.cljs$core$IFn$_invoke$arity$17(c, d, e, f, g, a, h, i, j, k, m, l, n, p, q, r, s) : a.call(null, c, d, e, f, g, a, h, i, j, k, m, l, n, p, q, r, s)
  }
  var u = cljs.core._first(t), v = cljs.core._rest(t);
  if(18 === b) {
    return a.cljs$core$IFn$_invoke$arity$18 ? a.cljs$core$IFn$_invoke$arity$18(c, d, e, f, g, a, h, i, j, k, m, l, n, p, q, r, s, u) : a.cljs$core$IFn$_invoke$arity$18 ? a.cljs$core$IFn$_invoke$arity$18(c, d, e, f, g, a, h, i, j, k, m, l, n, p, q, r, s, u) : a.call(null, c, d, e, f, g, a, h, i, j, k, m, l, n, p, q, r, s, u)
  }
  t = cljs.core._first(v);
  v = cljs.core._rest(v);
  if(19 === b) {
    return a.cljs$core$IFn$_invoke$arity$19 ? a.cljs$core$IFn$_invoke$arity$19(c, d, e, f, g, a, h, i, j, k, m, l, n, p, q, r, s, u, t) : a.cljs$core$IFn$_invoke$arity$19 ? a.cljs$core$IFn$_invoke$arity$19(c, d, e, f, g, a, h, i, j, k, m, l, n, p, q, r, s, u, t) : a.call(null, c, d, e, f, g, a, h, i, j, k, m, l, n, p, q, r, s, u, t)
  }
  var D = cljs.core._first(v);
  cljs.core._rest(v);
  if(20 === b) {
    return a.cljs$core$IFn$_invoke$arity$20 ? a.cljs$core$IFn$_invoke$arity$20(c, d, e, f, g, a, h, i, j, k, m, l, n, p, q, r, s, u, t, D) : a.cljs$core$IFn$_invoke$arity$20 ? a.cljs$core$IFn$_invoke$arity$20(c, d, e, f, g, a, h, i, j, k, m, l, n, p, q, r, s, u, t, D) : a.call(null, c, d, e, f, g, a, h, i, j, k, m, l, n, p, q, r, s, u, t, D)
  }
  throw Error("Only up to 20 arguments supported on functions");
};
cljs.core.apply = function() {
  var a = null, b = function(a, b) {
    var c = a.cljs$lang$maxFixedArity;
    if(a.cljs$lang$applyTo) {
      var d = cljs.core.bounded_count(b, c + 1);
      return d <= c ? cljs.core.apply_to(a, d, b) : a.cljs$lang$applyTo(b)
    }
    return a.apply(a, cljs.core.to_array(b))
  }, c = function(a, b, c) {
    b = cljs.core.list_STAR_.cljs$core$IFn$_invoke$arity$2(b, c);
    c = a.cljs$lang$maxFixedArity;
    if(a.cljs$lang$applyTo) {
      var d = cljs.core.bounded_count(b, c + 1);
      return d <= c ? cljs.core.apply_to(a, d, b) : a.cljs$lang$applyTo(b)
    }
    return a.apply(a, cljs.core.to_array(b))
  }, d = function(a, b, c, d) {
    b = cljs.core.list_STAR_.cljs$core$IFn$_invoke$arity$3(b, c, d);
    c = a.cljs$lang$maxFixedArity;
    return a.cljs$lang$applyTo ? (d = cljs.core.bounded_count(b, c + 1), d <= c ? cljs.core.apply_to(a, d, b) : a.cljs$lang$applyTo(b)) : a.apply(a, cljs.core.to_array(b))
  }, e = function(a, b, c, d, e) {
    b = cljs.core.list_STAR_.cljs$core$IFn$_invoke$arity$4(b, c, d, e);
    c = a.cljs$lang$maxFixedArity;
    return a.cljs$lang$applyTo ? (d = cljs.core.bounded_count(b, c + 1), d <= c ? cljs.core.apply_to(a, d, b) : a.cljs$lang$applyTo(b)) : a.apply(a, cljs.core.to_array(b))
  }, f = function(a, b, c, d, e, f) {
    b = cljs.core.cons(b, cljs.core.cons(c, cljs.core.cons(d, cljs.core.cons(e, cljs.core.spread(f)))));
    c = a.cljs$lang$maxFixedArity;
    return a.cljs$lang$applyTo ? (d = cljs.core.bounded_count(b, c + 1), d <= c ? cljs.core.apply_to(a, d, b) : a.cljs$lang$applyTo(b)) : a.apply(a, cljs.core.to_array(b))
  }, g = function(a, b, c, d, e, g) {
    var n = null;
    5 < arguments.length && (n = cljs.core.array_seq(Array.prototype.slice.call(arguments, 5), 0));
    return f.call(this, a, b, c, d, e, n)
  };
  g.cljs$lang$maxFixedArity = 5;
  g.cljs$lang$applyTo = function(a) {
    var b = cljs.core.first(a), a = cljs.core.next(a), c = cljs.core.first(a), a = cljs.core.next(a), d = cljs.core.first(a), a = cljs.core.next(a), e = cljs.core.first(a), a = cljs.core.next(a), g = cljs.core.first(a), a = cljs.core.rest(a);
    return f(b, c, d, e, g, a)
  };
  g.cljs$core$IFn$_invoke$arity$variadic = f;
  a = function(a, f, j, k, m, l) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, f);
      case 3:
        return c.call(this, a, f, j);
      case 4:
        return d.call(this, a, f, j, k);
      case 5:
        return e.call(this, a, f, j, k, m);
      default:
        return g.cljs$core$IFn$_invoke$arity$variadic(a, f, j, k, m, cljs.core.array_seq(arguments, 5))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 5;
  a.cljs$lang$applyTo = g.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$3 = c;
  a.cljs$core$IFn$_invoke$arity$4 = d;
  a.cljs$core$IFn$_invoke$arity$5 = e;
  a.cljs$core$IFn$_invoke$arity$variadic = g.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
cljs.core.vary_meta = function() {
  var a = function(a, b, e) {
    return cljs.core.with_meta(a, cljs.core.apply.cljs$core$IFn$_invoke$arity$3(b, cljs.core.meta(a), e))
  }, b = function(b, d, e) {
    var f = null;
    2 < arguments.length && (f = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
    return a.call(this, b, d, f)
  };
  b.cljs$lang$maxFixedArity = 2;
  b.cljs$lang$applyTo = function(b) {
    var d = cljs.core.first(b), b = cljs.core.next(b), e = cljs.core.first(b), b = cljs.core.rest(b);
    return a(d, e, b)
  };
  b.cljs$core$IFn$_invoke$arity$variadic = a;
  return b
}();
cljs.core.not_EQ_ = function() {
  var a = null, b = function(a, b) {
    return!cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(a, b)
  }, c = function(a, b, c) {
    return cljs.core.not(cljs.core.apply.cljs$core$IFn$_invoke$arity$4(cljs.core._EQ_, a, b, c))
  }, d = function(a, b, d) {
    var h = null;
    2 < arguments.length && (h = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
    return c.call(this, a, b, h)
  };
  d.cljs$lang$maxFixedArity = 2;
  d.cljs$lang$applyTo = function(a) {
    var b = cljs.core.first(a), a = cljs.core.next(a), d = cljs.core.first(a), a = cljs.core.rest(a);
    return c(b, d, a)
  };
  d.cljs$core$IFn$_invoke$arity$variadic = c;
  a = function(a, c, g) {
    switch(arguments.length) {
      case 1:
        return!1;
      case 2:
        return b.call(this, a, c);
      default:
        return d.cljs$core$IFn$_invoke$arity$variadic(a, c, cljs.core.array_seq(arguments, 2))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = d.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$1 = function() {
    return!1
  };
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$variadic = d.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
cljs.core.not_empty = function(a) {
  return cljs.core.seq(a) ? a : null
};
cljs.core.every_QMARK_ = function(a, b) {
  for(;;) {
    if(null == cljs.core.seq(b)) {
      return!0
    }
    if(cljs.core.truth_(a.cljs$core$IFn$_invoke$arity$1 ? a.cljs$core$IFn$_invoke$arity$1(cljs.core.first(b)) : a.call(null, cljs.core.first(b)))) {
      var c = a, d = cljs.core.next(b), a = c, b = d
    }else {
      return!1
    }
  }
};
cljs.core.not_every_QMARK_ = function(a, b) {
  return!cljs.core.every_QMARK_(a, b)
};
cljs.core.some = function(a, b) {
  for(;;) {
    if(cljs.core.seq(b)) {
      var c = a.cljs$core$IFn$_invoke$arity$1 ? a.cljs$core$IFn$_invoke$arity$1(cljs.core.first(b)) : a.call(null, cljs.core.first(b));
      if(cljs.core.truth_(c)) {
        return c
      }
      var c = a, d = cljs.core.next(b), a = c, b = d
    }else {
      return null
    }
  }
};
cljs.core.not_any_QMARK_ = function(a, b) {
  return cljs.core.not(cljs.core.some(a, b))
};
cljs.core.even_QMARK_ = function(a) {
  if(cljs.core.integer_QMARK_(a)) {
    return 0 === (a & 1)
  }
  throw Error([cljs.core.str("Argument must be an integer: "), cljs.core.str(a)].join(""));
};
cljs.core.odd_QMARK_ = function(a) {
  return!cljs.core.even_QMARK_(a)
};
cljs.core.identity = function(a) {
  return a
};
cljs.core.complement = function(a) {
  var b = null, c = function(b, c, d) {
    return cljs.core.not(cljs.core.apply.cljs$core$IFn$_invoke$arity$4(a, b, c, d))
  }, d = function(a, b, d) {
    var h = null;
    2 < arguments.length && (h = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
    return c.call(this, a, b, h)
  };
  d.cljs$lang$maxFixedArity = 2;
  d.cljs$lang$applyTo = function(a) {
    var b = cljs.core.first(a), a = cljs.core.next(a), d = cljs.core.first(a), a = cljs.core.rest(a);
    return c(b, d, a)
  };
  d.cljs$core$IFn$_invoke$arity$variadic = c;
  b = function(b, c, g) {
    switch(arguments.length) {
      case 0:
        return cljs.core.not(a.cljs$core$IFn$_invoke$arity$0 ? a.cljs$core$IFn$_invoke$arity$0() : a.call(null));
      case 1:
        return cljs.core.not(a.cljs$core$IFn$_invoke$arity$1 ? a.cljs$core$IFn$_invoke$arity$1(b) : a.call(null, b));
      case 2:
        return cljs.core.not(a.cljs$core$IFn$_invoke$arity$2 ? a.cljs$core$IFn$_invoke$arity$2(b, c) : a.call(null, b, c));
      default:
        return d.cljs$core$IFn$_invoke$arity$variadic(b, c, cljs.core.array_seq(arguments, 2))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  b.cljs$lang$maxFixedArity = 2;
  b.cljs$lang$applyTo = d.cljs$lang$applyTo;
  return b
};
cljs.core.constantly = function(a) {
  var b = function(b) {
    0 < arguments.length && cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0);
    return a
  };
  b.cljs$lang$maxFixedArity = 0;
  b.cljs$lang$applyTo = function(b) {
    cljs.core.seq(b);
    return a
  };
  b.cljs$core$IFn$_invoke$arity$variadic = function() {
    return a
  };
  return b
};
cljs.core.comp = function() {
  var a = null, b = function() {
    return cljs.core.identity
  }, c = function(a, b) {
    var c = null, d = function(c, d, e, f) {
      return a.cljs$core$IFn$_invoke$arity$1 ? a.cljs$core$IFn$_invoke$arity$1(cljs.core.apply.cljs$core$IFn$_invoke$arity$5(b, c, d, e, f)) : a.call(null, cljs.core.apply.cljs$core$IFn$_invoke$arity$5(b, c, d, e, f))
    }, e = function(a, b, c, e) {
      var f = null;
      3 < arguments.length && (f = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
      return d.call(this, a, b, c, f)
    };
    e.cljs$lang$maxFixedArity = 3;
    e.cljs$lang$applyTo = function(a) {
      var b = cljs.core.first(a), a = cljs.core.next(a), c = cljs.core.first(a), a = cljs.core.next(a), e = cljs.core.first(a), a = cljs.core.rest(a);
      return d(b, c, e, a)
    };
    e.cljs$core$IFn$_invoke$arity$variadic = d;
    c = function(c, d, f, i) {
      switch(arguments.length) {
        case 0:
          return a.cljs$core$IFn$_invoke$arity$1 ? a.cljs$core$IFn$_invoke$arity$1(b.cljs$core$IFn$_invoke$arity$0 ? b.cljs$core$IFn$_invoke$arity$0() : b.call(null)) : a.call(null, b.cljs$core$IFn$_invoke$arity$0 ? b.cljs$core$IFn$_invoke$arity$0() : b.call(null));
        case 1:
          return a.cljs$core$IFn$_invoke$arity$1 ? a.cljs$core$IFn$_invoke$arity$1(b.cljs$core$IFn$_invoke$arity$1 ? b.cljs$core$IFn$_invoke$arity$1(c) : b.call(null, c)) : a.call(null, b.cljs$core$IFn$_invoke$arity$1 ? b.cljs$core$IFn$_invoke$arity$1(c) : b.call(null, c));
        case 2:
          return a.cljs$core$IFn$_invoke$arity$1 ? a.cljs$core$IFn$_invoke$arity$1(b.cljs$core$IFn$_invoke$arity$2 ? b.cljs$core$IFn$_invoke$arity$2(c, d) : b.call(null, c, d)) : a.call(null, b.cljs$core$IFn$_invoke$arity$2 ? b.cljs$core$IFn$_invoke$arity$2(c, d) : b.call(null, c, d));
        case 3:
          return a.cljs$core$IFn$_invoke$arity$1 ? a.cljs$core$IFn$_invoke$arity$1(b.cljs$core$IFn$_invoke$arity$3 ? b.cljs$core$IFn$_invoke$arity$3(c, d, f) : b.call(null, c, d, f)) : a.call(null, b.cljs$core$IFn$_invoke$arity$3 ? b.cljs$core$IFn$_invoke$arity$3(c, d, f) : b.call(null, c, d, f));
        default:
          return e.cljs$core$IFn$_invoke$arity$variadic(c, d, f, cljs.core.array_seq(arguments, 3))
      }
      throw Error("Invalid arity: " + arguments.length);
    };
    c.cljs$lang$maxFixedArity = 3;
    c.cljs$lang$applyTo = e.cljs$lang$applyTo;
    return c
  }, d = function(a, b, c) {
    var d = null, e = function(d, e, f, j) {
      return a.cljs$core$IFn$_invoke$arity$1 ? a.cljs$core$IFn$_invoke$arity$1(b.cljs$core$IFn$_invoke$arity$1 ? b.cljs$core$IFn$_invoke$arity$1(cljs.core.apply.cljs$core$IFn$_invoke$arity$5(c, d, e, f, j)) : b.call(null, cljs.core.apply.cljs$core$IFn$_invoke$arity$5(c, d, e, f, j))) : a.call(null, b.cljs$core$IFn$_invoke$arity$1 ? b.cljs$core$IFn$_invoke$arity$1(cljs.core.apply.cljs$core$IFn$_invoke$arity$5(c, d, e, f, j)) : b.call(null, cljs.core.apply.cljs$core$IFn$_invoke$arity$5(c, d, e, f, 
      j)))
    }, f = function(a, b, c, d) {
      var f = null;
      3 < arguments.length && (f = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
      return e.call(this, a, b, c, f)
    };
    f.cljs$lang$maxFixedArity = 3;
    f.cljs$lang$applyTo = function(a) {
      var b = cljs.core.first(a), a = cljs.core.next(a), c = cljs.core.first(a), a = cljs.core.next(a), d = cljs.core.first(a), a = cljs.core.rest(a);
      return e(b, c, d, a)
    };
    f.cljs$core$IFn$_invoke$arity$variadic = e;
    d = function(d, e, j, k) {
      switch(arguments.length) {
        case 0:
          return a.cljs$core$IFn$_invoke$arity$1 ? a.cljs$core$IFn$_invoke$arity$1(b.cljs$core$IFn$_invoke$arity$1 ? b.cljs$core$IFn$_invoke$arity$1(c.cljs$core$IFn$_invoke$arity$0 ? c.cljs$core$IFn$_invoke$arity$0() : c.call(null)) : b.call(null, c.cljs$core$IFn$_invoke$arity$0 ? c.cljs$core$IFn$_invoke$arity$0() : c.call(null))) : a.call(null, b.cljs$core$IFn$_invoke$arity$1 ? b.cljs$core$IFn$_invoke$arity$1(c.cljs$core$IFn$_invoke$arity$0 ? c.cljs$core$IFn$_invoke$arity$0() : c.call(null)) : b.call(null, 
          c.cljs$core$IFn$_invoke$arity$0 ? c.cljs$core$IFn$_invoke$arity$0() : c.call(null)));
        case 1:
          return a.cljs$core$IFn$_invoke$arity$1 ? a.cljs$core$IFn$_invoke$arity$1(b.cljs$core$IFn$_invoke$arity$1 ? b.cljs$core$IFn$_invoke$arity$1(c.cljs$core$IFn$_invoke$arity$1 ? c.cljs$core$IFn$_invoke$arity$1(d) : c.call(null, d)) : b.call(null, c.cljs$core$IFn$_invoke$arity$1 ? c.cljs$core$IFn$_invoke$arity$1(d) : c.call(null, d))) : a.call(null, b.cljs$core$IFn$_invoke$arity$1 ? b.cljs$core$IFn$_invoke$arity$1(c.cljs$core$IFn$_invoke$arity$1 ? c.cljs$core$IFn$_invoke$arity$1(d) : c.call(null, 
          d)) : b.call(null, c.cljs$core$IFn$_invoke$arity$1 ? c.cljs$core$IFn$_invoke$arity$1(d) : c.call(null, d)));
        case 2:
          return a.cljs$core$IFn$_invoke$arity$1 ? a.cljs$core$IFn$_invoke$arity$1(b.cljs$core$IFn$_invoke$arity$1 ? b.cljs$core$IFn$_invoke$arity$1(c.cljs$core$IFn$_invoke$arity$2 ? c.cljs$core$IFn$_invoke$arity$2(d, e) : c.call(null, d, e)) : b.call(null, c.cljs$core$IFn$_invoke$arity$2 ? c.cljs$core$IFn$_invoke$arity$2(d, e) : c.call(null, d, e))) : a.call(null, b.cljs$core$IFn$_invoke$arity$1 ? b.cljs$core$IFn$_invoke$arity$1(c.cljs$core$IFn$_invoke$arity$2 ? c.cljs$core$IFn$_invoke$arity$2(d, 
          e) : c.call(null, d, e)) : b.call(null, c.cljs$core$IFn$_invoke$arity$2 ? c.cljs$core$IFn$_invoke$arity$2(d, e) : c.call(null, d, e)));
        case 3:
          return a.cljs$core$IFn$_invoke$arity$1 ? a.cljs$core$IFn$_invoke$arity$1(b.cljs$core$IFn$_invoke$arity$1 ? b.cljs$core$IFn$_invoke$arity$1(c.cljs$core$IFn$_invoke$arity$3 ? c.cljs$core$IFn$_invoke$arity$3(d, e, j) : c.call(null, d, e, j)) : b.call(null, c.cljs$core$IFn$_invoke$arity$3 ? c.cljs$core$IFn$_invoke$arity$3(d, e, j) : c.call(null, d, e, j))) : a.call(null, b.cljs$core$IFn$_invoke$arity$1 ? b.cljs$core$IFn$_invoke$arity$1(c.cljs$core$IFn$_invoke$arity$3 ? c.cljs$core$IFn$_invoke$arity$3(d, 
          e, j) : c.call(null, d, e, j)) : b.call(null, c.cljs$core$IFn$_invoke$arity$3 ? c.cljs$core$IFn$_invoke$arity$3(d, e, j) : c.call(null, d, e, j)));
        default:
          return f.cljs$core$IFn$_invoke$arity$variadic(d, e, j, cljs.core.array_seq(arguments, 3))
      }
      throw Error("Invalid arity: " + arguments.length);
    };
    d.cljs$lang$maxFixedArity = 3;
    d.cljs$lang$applyTo = f.cljs$lang$applyTo;
    return d
  }, e = function(a, b, c, d) {
    var e = cljs.core.reverse(cljs.core.list_STAR_.cljs$core$IFn$_invoke$arity$4(a, b, c, d)), f = function(a) {
      for(var a = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.first(e), a), b = cljs.core.next(e);;) {
        if(b) {
          a = cljs.core.first(b).call(null, a), b = cljs.core.next(b)
        }else {
          return a
        }
      }
    }, a = function(a) {
      var b = null;
      0 < arguments.length && (b = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0));
      return f.call(this, b)
    };
    a.cljs$lang$maxFixedArity = 0;
    a.cljs$lang$applyTo = function(a) {
      a = cljs.core.seq(a);
      return f(a)
    };
    a.cljs$core$IFn$_invoke$arity$variadic = f;
    return a
  }, f = function(a, b, c, d) {
    var f = null;
    3 < arguments.length && (f = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
    return e.call(this, a, b, c, f)
  };
  f.cljs$lang$maxFixedArity = 3;
  f.cljs$lang$applyTo = function(a) {
    var b = cljs.core.first(a), a = cljs.core.next(a), c = cljs.core.first(a), a = cljs.core.next(a), d = cljs.core.first(a), a = cljs.core.rest(a);
    return e(b, c, d, a)
  };
  f.cljs$core$IFn$_invoke$arity$variadic = e;
  a = function(a, e, i, j) {
    switch(arguments.length) {
      case 0:
        return b.call(this);
      case 1:
        return a;
      case 2:
        return c.call(this, a, e);
      case 3:
        return d.call(this, a, e, i);
      default:
        return f.cljs$core$IFn$_invoke$arity$variadic(a, e, i, cljs.core.array_seq(arguments, 3))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 3;
  a.cljs$lang$applyTo = f.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$0 = b;
  a.cljs$core$IFn$_invoke$arity$1 = function(a) {
    return a
  };
  a.cljs$core$IFn$_invoke$arity$2 = c;
  a.cljs$core$IFn$_invoke$arity$3 = d;
  a.cljs$core$IFn$_invoke$arity$variadic = f.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
cljs.core.partial = function() {
  var a = null, b = function(a, b) {
    var c = function(c) {
      return cljs.core.apply.cljs$core$IFn$_invoke$arity$3(a, b, c)
    }, d = function(a) {
      var b = null;
      0 < arguments.length && (b = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0));
      return c.call(this, b)
    };
    d.cljs$lang$maxFixedArity = 0;
    d.cljs$lang$applyTo = function(a) {
      a = cljs.core.seq(a);
      return c(a)
    };
    d.cljs$core$IFn$_invoke$arity$variadic = c;
    return d
  }, c = function(a, b, c) {
    var d = function(d) {
      return cljs.core.apply.cljs$core$IFn$_invoke$arity$4(a, b, c, d)
    }, e = function(a) {
      var b = null;
      0 < arguments.length && (b = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0));
      return d.call(this, b)
    };
    e.cljs$lang$maxFixedArity = 0;
    e.cljs$lang$applyTo = function(a) {
      a = cljs.core.seq(a);
      return d(a)
    };
    e.cljs$core$IFn$_invoke$arity$variadic = d;
    return e
  }, d = function(a, b, c, d) {
    var e = function(e) {
      return cljs.core.apply.cljs$core$IFn$_invoke$arity$5(a, b, c, d, e)
    }, f = function(a) {
      var b = null;
      0 < arguments.length && (b = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0));
      return e.call(this, b)
    };
    f.cljs$lang$maxFixedArity = 0;
    f.cljs$lang$applyTo = function(a) {
      a = cljs.core.seq(a);
      return e(a)
    };
    f.cljs$core$IFn$_invoke$arity$variadic = e;
    return f
  }, e = function(a, b, c, d, e) {
    var f = function(f) {
      return cljs.core.apply.cljs$core$IFn$_invoke$arity$5(a, b, c, d, cljs.core.concat.cljs$core$IFn$_invoke$arity$2(e, f))
    }, l = function(a) {
      var b = null;
      0 < arguments.length && (b = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0));
      return f.call(this, b)
    };
    l.cljs$lang$maxFixedArity = 0;
    l.cljs$lang$applyTo = function(a) {
      a = cljs.core.seq(a);
      return f(a)
    };
    l.cljs$core$IFn$_invoke$arity$variadic = f;
    return l
  }, f = function(a, b, c, d, f) {
    var m = null;
    4 < arguments.length && (m = cljs.core.array_seq(Array.prototype.slice.call(arguments, 4), 0));
    return e.call(this, a, b, c, d, m)
  };
  f.cljs$lang$maxFixedArity = 4;
  f.cljs$lang$applyTo = function(a) {
    var b = cljs.core.first(a), a = cljs.core.next(a), c = cljs.core.first(a), a = cljs.core.next(a), d = cljs.core.first(a), a = cljs.core.next(a), f = cljs.core.first(a), a = cljs.core.rest(a);
    return e(b, c, d, f, a)
  };
  f.cljs$core$IFn$_invoke$arity$variadic = e;
  a = function(a, e, i, j, k) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, e);
      case 3:
        return c.call(this, a, e, i);
      case 4:
        return d.call(this, a, e, i, j);
      default:
        return f.cljs$core$IFn$_invoke$arity$variadic(a, e, i, j, cljs.core.array_seq(arguments, 4))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 4;
  a.cljs$lang$applyTo = f.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$3 = c;
  a.cljs$core$IFn$_invoke$arity$4 = d;
  a.cljs$core$IFn$_invoke$arity$variadic = f.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
cljs.core.fnil = function() {
  var a = null, b = function(a, b) {
    var c = null, d = function(c, d, g, h) {
      return cljs.core.apply.cljs$core$IFn$_invoke$arity$5(a, null == c ? b : c, d, g, h)
    }, i = function(a, b, c, e) {
      var f = null;
      3 < arguments.length && (f = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
      return d.call(this, a, b, c, f)
    };
    i.cljs$lang$maxFixedArity = 3;
    i.cljs$lang$applyTo = function(a) {
      var b = cljs.core.first(a), a = cljs.core.next(a), c = cljs.core.first(a), a = cljs.core.next(a), e = cljs.core.first(a), a = cljs.core.rest(a);
      return d(b, c, e, a)
    };
    i.cljs$core$IFn$_invoke$arity$variadic = d;
    c = function(c, d, g, h) {
      switch(arguments.length) {
        case 1:
          return a.cljs$core$IFn$_invoke$arity$1 ? a.cljs$core$IFn$_invoke$arity$1(null == c ? b : c) : a.call(null, null == c ? b : c);
        case 2:
          return a.cljs$core$IFn$_invoke$arity$2 ? a.cljs$core$IFn$_invoke$arity$2(null == c ? b : c, d) : a.call(null, null == c ? b : c, d);
        case 3:
          return a.cljs$core$IFn$_invoke$arity$3 ? a.cljs$core$IFn$_invoke$arity$3(null == c ? b : c, d, g) : a.call(null, null == c ? b : c, d, g);
        default:
          return i.cljs$core$IFn$_invoke$arity$variadic(c, d, g, cljs.core.array_seq(arguments, 3))
      }
      throw Error("Invalid arity: " + arguments.length);
    };
    c.cljs$lang$maxFixedArity = 3;
    c.cljs$lang$applyTo = i.cljs$lang$applyTo;
    return c
  }, c = function(a, b, c) {
    var d = null, i = function(d, h, i, j) {
      return cljs.core.apply.cljs$core$IFn$_invoke$arity$5(a, null == d ? b : d, null == h ? c : h, i, j)
    }, j = function(a, b, c, d) {
      var e = null;
      3 < arguments.length && (e = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
      return i.call(this, a, b, c, e)
    };
    j.cljs$lang$maxFixedArity = 3;
    j.cljs$lang$applyTo = function(a) {
      var b = cljs.core.first(a), a = cljs.core.next(a), c = cljs.core.first(a), a = cljs.core.next(a), d = cljs.core.first(a), a = cljs.core.rest(a);
      return i(b, c, d, a)
    };
    j.cljs$core$IFn$_invoke$arity$variadic = i;
    d = function(d, h, i, n) {
      switch(arguments.length) {
        case 2:
          return a.cljs$core$IFn$_invoke$arity$2 ? a.cljs$core$IFn$_invoke$arity$2(null == d ? b : d, null == h ? c : h) : a.call(null, null == d ? b : d, null == h ? c : h);
        case 3:
          return a.cljs$core$IFn$_invoke$arity$3 ? a.cljs$core$IFn$_invoke$arity$3(null == d ? b : d, null == h ? c : h, i) : a.call(null, null == d ? b : d, null == h ? c : h, i);
        default:
          return j.cljs$core$IFn$_invoke$arity$variadic(d, h, i, cljs.core.array_seq(arguments, 3))
      }
      throw Error("Invalid arity: " + arguments.length);
    };
    d.cljs$lang$maxFixedArity = 3;
    d.cljs$lang$applyTo = j.cljs$lang$applyTo;
    return d
  }, d = function(a, b, c, d) {
    var i = null, j = function(i, j, k, p) {
      return cljs.core.apply.cljs$core$IFn$_invoke$arity$5(a, null == i ? b : i, null == j ? c : j, null == k ? d : k, p)
    }, k = function(a, b, c, d) {
      var e = null;
      3 < arguments.length && (e = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
      return j.call(this, a, b, c, e)
    };
    k.cljs$lang$maxFixedArity = 3;
    k.cljs$lang$applyTo = function(a) {
      var b = cljs.core.first(a), a = cljs.core.next(a), c = cljs.core.first(a), a = cljs.core.next(a), d = cljs.core.first(a), a = cljs.core.rest(a);
      return j(b, c, d, a)
    };
    k.cljs$core$IFn$_invoke$arity$variadic = j;
    i = function(i, j, n, p) {
      switch(arguments.length) {
        case 2:
          return a.cljs$core$IFn$_invoke$arity$2 ? a.cljs$core$IFn$_invoke$arity$2(null == i ? b : i, null == j ? c : j) : a.call(null, null == i ? b : i, null == j ? c : j);
        case 3:
          return a.cljs$core$IFn$_invoke$arity$3 ? a.cljs$core$IFn$_invoke$arity$3(null == i ? b : i, null == j ? c : j, null == n ? d : n) : a.call(null, null == i ? b : i, null == j ? c : j, null == n ? d : n);
        default:
          return k.cljs$core$IFn$_invoke$arity$variadic(i, j, n, cljs.core.array_seq(arguments, 3))
      }
      throw Error("Invalid arity: " + arguments.length);
    };
    i.cljs$lang$maxFixedArity = 3;
    i.cljs$lang$applyTo = k.cljs$lang$applyTo;
    return i
  }, a = function(a, f, g, h) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, f);
      case 3:
        return c.call(this, a, f, g);
      case 4:
        return d.call(this, a, f, g, h)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$3 = c;
  a.cljs$core$IFn$_invoke$arity$4 = d;
  return a
}();
cljs.core.map_indexed = function(a, b) {
  var c = function e(b, c) {
    return new cljs.core.LazySeq(null, !1, function() {
      var h = cljs.core.seq(c);
      if(h) {
        if(cljs.core.chunked_seq_QMARK_(h)) {
          for(var i = cljs.core.chunk_first(h), j = cljs.core.count(i), k = cljs.core.chunk_buffer(j), m = 0;;) {
            if(m < j) {
              cljs.core.chunk_append(k, a.cljs$core$IFn$_invoke$arity$2 ? a.cljs$core$IFn$_invoke$arity$2(b + m, cljs.core._nth.cljs$core$IFn$_invoke$arity$2(i, m)) : a.call(null, b + m, cljs.core._nth.cljs$core$IFn$_invoke$arity$2(i, m))), m += 1
            }else {
              break
            }
          }
          return cljs.core.chunk_cons(cljs.core.chunk(k), e(b + j, cljs.core.chunk_rest(h)))
        }
        return cljs.core.cons(a.cljs$core$IFn$_invoke$arity$2 ? a.cljs$core$IFn$_invoke$arity$2(b, cljs.core.first(h)) : a.call(null, b, cljs.core.first(h)), e(b + 1, cljs.core.rest(h)))
      }
      return null
    }, null)
  };
  return c.cljs$core$IFn$_invoke$arity$2 ? c.cljs$core$IFn$_invoke$arity$2(0, b) : c.call(null, 0, b)
};
cljs.core.keep = function keep(b, c) {
  return new cljs.core.LazySeq(null, !1, function() {
    var d = cljs.core.seq(c);
    if(d) {
      if(cljs.core.chunked_seq_QMARK_(d)) {
        for(var e = cljs.core.chunk_first(d), f = cljs.core.count(e), g = cljs.core.chunk_buffer(f), h = 0;;) {
          if(h < f) {
            var i = b.cljs$core$IFn$_invoke$arity$1 ? b.cljs$core$IFn$_invoke$arity$1(cljs.core._nth.cljs$core$IFn$_invoke$arity$2(e, h)) : b.call(null, cljs.core._nth.cljs$core$IFn$_invoke$arity$2(e, h));
            null != i && cljs.core.chunk_append(g, i);
            h += 1
          }else {
            break
          }
        }
        return cljs.core.chunk_cons(cljs.core.chunk(g), keep(b, cljs.core.chunk_rest(d)))
      }
      e = b.cljs$core$IFn$_invoke$arity$1 ? b.cljs$core$IFn$_invoke$arity$1(cljs.core.first(d)) : b.call(null, cljs.core.first(d));
      return null == e ? keep(b, cljs.core.rest(d)) : cljs.core.cons(e, keep(b, cljs.core.rest(d)))
    }
    return null
  }, null)
};
cljs.core.keep_indexed = function(a, b) {
  var c = function e(b, c) {
    return new cljs.core.LazySeq(null, !1, function() {
      var h = cljs.core.seq(c);
      if(h) {
        if(cljs.core.chunked_seq_QMARK_(h)) {
          for(var i = cljs.core.chunk_first(h), j = cljs.core.count(i), k = cljs.core.chunk_buffer(j), m = 0;;) {
            if(m < j) {
              var l = a.cljs$core$IFn$_invoke$arity$2 ? a.cljs$core$IFn$_invoke$arity$2(b + m, cljs.core._nth.cljs$core$IFn$_invoke$arity$2(i, m)) : a.call(null, b + m, cljs.core._nth.cljs$core$IFn$_invoke$arity$2(i, m));
              null != l && cljs.core.chunk_append(k, l);
              m += 1
            }else {
              break
            }
          }
          return cljs.core.chunk_cons(cljs.core.chunk(k), e(b + j, cljs.core.chunk_rest(h)))
        }
        i = a.cljs$core$IFn$_invoke$arity$2 ? a.cljs$core$IFn$_invoke$arity$2(b, cljs.core.first(h)) : a.call(null, b, cljs.core.first(h));
        return null == i ? e(b + 1, cljs.core.rest(h)) : cljs.core.cons(i, e(b + 1, cljs.core.rest(h)))
      }
      return null
    }, null)
  };
  return c.cljs$core$IFn$_invoke$arity$2 ? c.cljs$core$IFn$_invoke$arity$2(0, b) : c.call(null, 0, b)
};
cljs.core.every_pred = function() {
  var a = null, b = function(a) {
    var b = null, c = function(b) {
      return cljs.core.boolean$(a.cljs$core$IFn$_invoke$arity$1 ? a.cljs$core$IFn$_invoke$arity$1(b) : a.call(null, b))
    }, d = function(b, c) {
      return cljs.core.boolean$(function() {
        var d = a.cljs$core$IFn$_invoke$arity$1 ? a.cljs$core$IFn$_invoke$arity$1(b) : a.call(null, b);
        return cljs.core.truth_(d) ? a.cljs$core$IFn$_invoke$arity$1 ? a.cljs$core$IFn$_invoke$arity$1(c) : a.call(null, c) : d
      }())
    }, e = function(b, c, d) {
      return cljs.core.boolean$(function() {
        var e = a.cljs$core$IFn$_invoke$arity$1 ? a.cljs$core$IFn$_invoke$arity$1(b) : a.call(null, b);
        return cljs.core.truth_(e) ? (e = a.cljs$core$IFn$_invoke$arity$1 ? a.cljs$core$IFn$_invoke$arity$1(c) : a.call(null, c), cljs.core.truth_(e) ? a.cljs$core$IFn$_invoke$arity$1 ? a.cljs$core$IFn$_invoke$arity$1(d) : a.call(null, d) : e) : e
      }())
    }, f = function(c, d, e, f) {
      return cljs.core.boolean$(function() {
        var i = b.cljs$core$IFn$_invoke$arity$3(c, d, e);
        return cljs.core.truth_(i) ? cljs.core.every_QMARK_(a, f) : i
      }())
    }, l = function(a, b, c, d) {
      var e = null;
      3 < arguments.length && (e = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
      return f.call(this, a, b, c, e)
    };
    l.cljs$lang$maxFixedArity = 3;
    l.cljs$lang$applyTo = function(a) {
      var b = cljs.core.first(a), a = cljs.core.next(a), c = cljs.core.first(a), a = cljs.core.next(a), d = cljs.core.first(a), a = cljs.core.rest(a);
      return f(b, c, d, a)
    };
    l.cljs$core$IFn$_invoke$arity$variadic = f;
    b = function(a, b, f, h) {
      switch(arguments.length) {
        case 0:
          return!0;
        case 1:
          return c.call(this, a);
        case 2:
          return d.call(this, a, b);
        case 3:
          return e.call(this, a, b, f);
        default:
          return l.cljs$core$IFn$_invoke$arity$variadic(a, b, f, cljs.core.array_seq(arguments, 3))
      }
      throw Error("Invalid arity: " + arguments.length);
    };
    b.cljs$lang$maxFixedArity = 3;
    b.cljs$lang$applyTo = l.cljs$lang$applyTo;
    b.cljs$core$IFn$_invoke$arity$0 = function() {
      return!0
    };
    b.cljs$core$IFn$_invoke$arity$1 = c;
    b.cljs$core$IFn$_invoke$arity$2 = d;
    b.cljs$core$IFn$_invoke$arity$3 = e;
    b.cljs$core$IFn$_invoke$arity$variadic = l.cljs$core$IFn$_invoke$arity$variadic;
    return b
  }, c = function(a, b) {
    var c = null, d = function(c) {
      return cljs.core.boolean$(function() {
        var d = a.cljs$core$IFn$_invoke$arity$1 ? a.cljs$core$IFn$_invoke$arity$1(c) : a.call(null, c);
        return cljs.core.truth_(d) ? b.cljs$core$IFn$_invoke$arity$1 ? b.cljs$core$IFn$_invoke$arity$1(c) : b.call(null, c) : d
      }())
    }, e = function(c, d) {
      return cljs.core.boolean$(function() {
        var e = a.cljs$core$IFn$_invoke$arity$1 ? a.cljs$core$IFn$_invoke$arity$1(c) : a.call(null, c);
        return cljs.core.truth_(e) && (e = a.cljs$core$IFn$_invoke$arity$1 ? a.cljs$core$IFn$_invoke$arity$1(d) : a.call(null, d), cljs.core.truth_(e)) ? (e = b.cljs$core$IFn$_invoke$arity$1 ? b.cljs$core$IFn$_invoke$arity$1(c) : b.call(null, c), cljs.core.truth_(e) ? b.cljs$core$IFn$_invoke$arity$1 ? b.cljs$core$IFn$_invoke$arity$1(d) : b.call(null, d) : e) : e
      }())
    }, f = function(c, d, e) {
      return cljs.core.boolean$(function() {
        var f = a.cljs$core$IFn$_invoke$arity$1 ? a.cljs$core$IFn$_invoke$arity$1(c) : a.call(null, c);
        return cljs.core.truth_(f) && (f = a.cljs$core$IFn$_invoke$arity$1 ? a.cljs$core$IFn$_invoke$arity$1(d) : a.call(null, d), cljs.core.truth_(f) && (f = a.cljs$core$IFn$_invoke$arity$1 ? a.cljs$core$IFn$_invoke$arity$1(e) : a.call(null, e), cljs.core.truth_(f) && (f = b.cljs$core$IFn$_invoke$arity$1 ? b.cljs$core$IFn$_invoke$arity$1(c) : b.call(null, c), cljs.core.truth_(f)))) ? (f = b.cljs$core$IFn$_invoke$arity$1 ? b.cljs$core$IFn$_invoke$arity$1(d) : b.call(null, d), cljs.core.truth_(f) ? 
        b.cljs$core$IFn$_invoke$arity$1 ? b.cljs$core$IFn$_invoke$arity$1(e) : b.call(null, e) : f) : f
      }())
    }, l = function(d, e, f, j) {
      return cljs.core.boolean$(function() {
        var k = c.cljs$core$IFn$_invoke$arity$3(d, e, f);
        return cljs.core.truth_(k) ? cljs.core.every_QMARK_(function(c) {
          var d = a.cljs$core$IFn$_invoke$arity$1 ? a.cljs$core$IFn$_invoke$arity$1(c) : a.call(null, c);
          return cljs.core.truth_(d) ? b.cljs$core$IFn$_invoke$arity$1 ? b.cljs$core$IFn$_invoke$arity$1(c) : b.call(null, c) : d
        }, j) : k
      }())
    }, n = function(a, b, c, d) {
      var e = null;
      3 < arguments.length && (e = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
      return l.call(this, a, b, c, e)
    };
    n.cljs$lang$maxFixedArity = 3;
    n.cljs$lang$applyTo = function(a) {
      var b = cljs.core.first(a), a = cljs.core.next(a), c = cljs.core.first(a), a = cljs.core.next(a), d = cljs.core.first(a), a = cljs.core.rest(a);
      return l(b, c, d, a)
    };
    n.cljs$core$IFn$_invoke$arity$variadic = l;
    c = function(a, b, c, h) {
      switch(arguments.length) {
        case 0:
          return!0;
        case 1:
          return d.call(this, a);
        case 2:
          return e.call(this, a, b);
        case 3:
          return f.call(this, a, b, c);
        default:
          return n.cljs$core$IFn$_invoke$arity$variadic(a, b, c, cljs.core.array_seq(arguments, 3))
      }
      throw Error("Invalid arity: " + arguments.length);
    };
    c.cljs$lang$maxFixedArity = 3;
    c.cljs$lang$applyTo = n.cljs$lang$applyTo;
    c.cljs$core$IFn$_invoke$arity$0 = function() {
      return!0
    };
    c.cljs$core$IFn$_invoke$arity$1 = d;
    c.cljs$core$IFn$_invoke$arity$2 = e;
    c.cljs$core$IFn$_invoke$arity$3 = f;
    c.cljs$core$IFn$_invoke$arity$variadic = n.cljs$core$IFn$_invoke$arity$variadic;
    return c
  }, d = function(a, b, c) {
    var d = null, e = function(d) {
      return cljs.core.boolean$(function() {
        var e = a.cljs$core$IFn$_invoke$arity$1 ? a.cljs$core$IFn$_invoke$arity$1(d) : a.call(null, d);
        return cljs.core.truth_(e) ? (e = b.cljs$core$IFn$_invoke$arity$1 ? b.cljs$core$IFn$_invoke$arity$1(d) : b.call(null, d), cljs.core.truth_(e) ? c.cljs$core$IFn$_invoke$arity$1 ? c.cljs$core$IFn$_invoke$arity$1(d) : c.call(null, d) : e) : e
      }())
    }, f = function(d, e) {
      return cljs.core.boolean$(function() {
        var f = a.cljs$core$IFn$_invoke$arity$1 ? a.cljs$core$IFn$_invoke$arity$1(d) : a.call(null, d);
        return cljs.core.truth_(f) && (f = b.cljs$core$IFn$_invoke$arity$1 ? b.cljs$core$IFn$_invoke$arity$1(d) : b.call(null, d), cljs.core.truth_(f) && (f = c.cljs$core$IFn$_invoke$arity$1 ? c.cljs$core$IFn$_invoke$arity$1(d) : c.call(null, d), cljs.core.truth_(f) && (f = a.cljs$core$IFn$_invoke$arity$1 ? a.cljs$core$IFn$_invoke$arity$1(e) : a.call(null, e), cljs.core.truth_(f)))) ? (f = b.cljs$core$IFn$_invoke$arity$1 ? b.cljs$core$IFn$_invoke$arity$1(e) : b.call(null, e), cljs.core.truth_(f) ? 
        c.cljs$core$IFn$_invoke$arity$1 ? c.cljs$core$IFn$_invoke$arity$1(e) : c.call(null, e) : f) : f
      }())
    }, l = function(d, e, f) {
      return cljs.core.boolean$(function() {
        var j = a.cljs$core$IFn$_invoke$arity$1 ? a.cljs$core$IFn$_invoke$arity$1(d) : a.call(null, d);
        return cljs.core.truth_(j) && (j = b.cljs$core$IFn$_invoke$arity$1 ? b.cljs$core$IFn$_invoke$arity$1(d) : b.call(null, d), cljs.core.truth_(j) && (j = c.cljs$core$IFn$_invoke$arity$1 ? c.cljs$core$IFn$_invoke$arity$1(d) : c.call(null, d), cljs.core.truth_(j) && (j = a.cljs$core$IFn$_invoke$arity$1 ? a.cljs$core$IFn$_invoke$arity$1(e) : a.call(null, e), cljs.core.truth_(j) && (j = b.cljs$core$IFn$_invoke$arity$1 ? b.cljs$core$IFn$_invoke$arity$1(e) : b.call(null, e), cljs.core.truth_(j) && 
        (j = c.cljs$core$IFn$_invoke$arity$1 ? c.cljs$core$IFn$_invoke$arity$1(e) : c.call(null, e), cljs.core.truth_(j) && (j = a.cljs$core$IFn$_invoke$arity$1 ? a.cljs$core$IFn$_invoke$arity$1(f) : a.call(null, f), cljs.core.truth_(j))))))) ? (j = b.cljs$core$IFn$_invoke$arity$1 ? b.cljs$core$IFn$_invoke$arity$1(f) : b.call(null, f), cljs.core.truth_(j) ? c.cljs$core$IFn$_invoke$arity$1 ? c.cljs$core$IFn$_invoke$arity$1(f) : c.call(null, f) : j) : j
      }())
    }, n = function(e, f, k, m) {
      return cljs.core.boolean$(function() {
        var l = d.cljs$core$IFn$_invoke$arity$3(e, f, k);
        return cljs.core.truth_(l) ? cljs.core.every_QMARK_(function(d) {
          var e = a.cljs$core$IFn$_invoke$arity$1 ? a.cljs$core$IFn$_invoke$arity$1(d) : a.call(null, d);
          return cljs.core.truth_(e) ? (e = b.cljs$core$IFn$_invoke$arity$1 ? b.cljs$core$IFn$_invoke$arity$1(d) : b.call(null, d), cljs.core.truth_(e) ? c.cljs$core$IFn$_invoke$arity$1 ? c.cljs$core$IFn$_invoke$arity$1(d) : c.call(null, d) : e) : e
        }, m) : l
      }())
    }, p = function(a, b, c, d) {
      var e = null;
      3 < arguments.length && (e = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
      return n.call(this, a, b, c, e)
    };
    p.cljs$lang$maxFixedArity = 3;
    p.cljs$lang$applyTo = function(a) {
      var b = cljs.core.first(a), a = cljs.core.next(a), c = cljs.core.first(a), a = cljs.core.next(a), d = cljs.core.first(a), a = cljs.core.rest(a);
      return n(b, c, d, a)
    };
    p.cljs$core$IFn$_invoke$arity$variadic = n;
    d = function(a, b, c, d) {
      switch(arguments.length) {
        case 0:
          return!0;
        case 1:
          return e.call(this, a);
        case 2:
          return f.call(this, a, b);
        case 3:
          return l.call(this, a, b, c);
        default:
          return p.cljs$core$IFn$_invoke$arity$variadic(a, b, c, cljs.core.array_seq(arguments, 3))
      }
      throw Error("Invalid arity: " + arguments.length);
    };
    d.cljs$lang$maxFixedArity = 3;
    d.cljs$lang$applyTo = p.cljs$lang$applyTo;
    d.cljs$core$IFn$_invoke$arity$0 = function() {
      return!0
    };
    d.cljs$core$IFn$_invoke$arity$1 = e;
    d.cljs$core$IFn$_invoke$arity$2 = f;
    d.cljs$core$IFn$_invoke$arity$3 = l;
    d.cljs$core$IFn$_invoke$arity$variadic = p.cljs$core$IFn$_invoke$arity$variadic;
    return d
  }, e = function(a, b, c, d) {
    var e = cljs.core.list_STAR_.cljs$core$IFn$_invoke$arity$4(a, b, c, d), f = null, l = function(a) {
      return cljs.core.every_QMARK_(function(b) {
        return b.cljs$core$IFn$_invoke$arity$1 ? b.cljs$core$IFn$_invoke$arity$1(a) : b.call(null, a)
      }, e)
    }, n = function(a, b) {
      return cljs.core.every_QMARK_(function(c) {
        var d = c.cljs$core$IFn$_invoke$arity$1 ? c.cljs$core$IFn$_invoke$arity$1(a) : c.call(null, a);
        return cljs.core.truth_(d) ? c.cljs$core$IFn$_invoke$arity$1 ? c.cljs$core$IFn$_invoke$arity$1(b) : c.call(null, b) : d
      }, e)
    }, p = function(a, b, c) {
      return cljs.core.every_QMARK_(function(d) {
        var e = d.cljs$core$IFn$_invoke$arity$1 ? d.cljs$core$IFn$_invoke$arity$1(a) : d.call(null, a);
        return cljs.core.truth_(e) ? (e = d.cljs$core$IFn$_invoke$arity$1 ? d.cljs$core$IFn$_invoke$arity$1(b) : d.call(null, b), cljs.core.truth_(e) ? d.cljs$core$IFn$_invoke$arity$1 ? d.cljs$core$IFn$_invoke$arity$1(c) : d.call(null, c) : e) : e
      }, e)
    }, q = function(a, b, c, d) {
      return cljs.core.boolean$(function() {
        var h = f.cljs$core$IFn$_invoke$arity$3(a, b, c);
        return cljs.core.truth_(h) ? cljs.core.every_QMARK_(function(a) {
          return cljs.core.every_QMARK_(a, d)
        }, e) : h
      }())
    }, r = function(a, b, c, d) {
      var e = null;
      3 < arguments.length && (e = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
      return q.call(this, a, b, c, e)
    };
    r.cljs$lang$maxFixedArity = 3;
    r.cljs$lang$applyTo = function(a) {
      var b = cljs.core.first(a), a = cljs.core.next(a), c = cljs.core.first(a), a = cljs.core.next(a), d = cljs.core.first(a), a = cljs.core.rest(a);
      return q(b, c, d, a)
    };
    r.cljs$core$IFn$_invoke$arity$variadic = q;
    f = function(a, b, c, d) {
      switch(arguments.length) {
        case 0:
          return!0;
        case 1:
          return l.call(this, a);
        case 2:
          return n.call(this, a, b);
        case 3:
          return p.call(this, a, b, c);
        default:
          return r.cljs$core$IFn$_invoke$arity$variadic(a, b, c, cljs.core.array_seq(arguments, 3))
      }
      throw Error("Invalid arity: " + arguments.length);
    };
    f.cljs$lang$maxFixedArity = 3;
    f.cljs$lang$applyTo = r.cljs$lang$applyTo;
    f.cljs$core$IFn$_invoke$arity$0 = function() {
      return!0
    };
    f.cljs$core$IFn$_invoke$arity$1 = l;
    f.cljs$core$IFn$_invoke$arity$2 = n;
    f.cljs$core$IFn$_invoke$arity$3 = p;
    f.cljs$core$IFn$_invoke$arity$variadic = r.cljs$core$IFn$_invoke$arity$variadic;
    return f
  }, f = function(a, b, c, d) {
    var f = null;
    3 < arguments.length && (f = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
    return e.call(this, a, b, c, f)
  };
  f.cljs$lang$maxFixedArity = 3;
  f.cljs$lang$applyTo = function(a) {
    var b = cljs.core.first(a), a = cljs.core.next(a), c = cljs.core.first(a), a = cljs.core.next(a), d = cljs.core.first(a), a = cljs.core.rest(a);
    return e(b, c, d, a)
  };
  f.cljs$core$IFn$_invoke$arity$variadic = e;
  a = function(a, e, i, j) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, e);
      case 3:
        return d.call(this, a, e, i);
      default:
        return f.cljs$core$IFn$_invoke$arity$variadic(a, e, i, cljs.core.array_seq(arguments, 3))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 3;
  a.cljs$lang$applyTo = f.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$2 = c;
  a.cljs$core$IFn$_invoke$arity$3 = d;
  a.cljs$core$IFn$_invoke$arity$variadic = f.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
cljs.core.some_fn = function() {
  var a = null, b = function(a) {
    var b = null, c = function(b) {
      return a.cljs$core$IFn$_invoke$arity$1 ? a.cljs$core$IFn$_invoke$arity$1(b) : a.call(null, b)
    }, d = function(b, c) {
      var d = a.cljs$core$IFn$_invoke$arity$1 ? a.cljs$core$IFn$_invoke$arity$1(b) : a.call(null, b);
      return cljs.core.truth_(d) ? d : a.cljs$core$IFn$_invoke$arity$1 ? a.cljs$core$IFn$_invoke$arity$1(c) : a.call(null, c)
    }, e = function(b, c, d) {
      b = a.cljs$core$IFn$_invoke$arity$1 ? a.cljs$core$IFn$_invoke$arity$1(b) : a.call(null, b);
      if(cljs.core.truth_(b)) {
        return b
      }
      c = a.cljs$core$IFn$_invoke$arity$1 ? a.cljs$core$IFn$_invoke$arity$1(c) : a.call(null, c);
      return cljs.core.truth_(c) ? c : a.cljs$core$IFn$_invoke$arity$1 ? a.cljs$core$IFn$_invoke$arity$1(d) : a.call(null, d)
    }, f = function(c, d, e, f) {
      c = b.cljs$core$IFn$_invoke$arity$3(c, d, e);
      return cljs.core.truth_(c) ? c : cljs.core.some(a, f)
    }, l = function(a, b, c, d) {
      var e = null;
      3 < arguments.length && (e = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
      return f.call(this, a, b, c, e)
    };
    l.cljs$lang$maxFixedArity = 3;
    l.cljs$lang$applyTo = function(a) {
      var b = cljs.core.first(a), a = cljs.core.next(a), c = cljs.core.first(a), a = cljs.core.next(a), d = cljs.core.first(a), a = cljs.core.rest(a);
      return f(b, c, d, a)
    };
    l.cljs$core$IFn$_invoke$arity$variadic = f;
    b = function(a, b, f, h) {
      switch(arguments.length) {
        case 0:
          return null;
        case 1:
          return c.call(this, a);
        case 2:
          return d.call(this, a, b);
        case 3:
          return e.call(this, a, b, f);
        default:
          return l.cljs$core$IFn$_invoke$arity$variadic(a, b, f, cljs.core.array_seq(arguments, 3))
      }
      throw Error("Invalid arity: " + arguments.length);
    };
    b.cljs$lang$maxFixedArity = 3;
    b.cljs$lang$applyTo = l.cljs$lang$applyTo;
    b.cljs$core$IFn$_invoke$arity$0 = function() {
      return null
    };
    b.cljs$core$IFn$_invoke$arity$1 = c;
    b.cljs$core$IFn$_invoke$arity$2 = d;
    b.cljs$core$IFn$_invoke$arity$3 = e;
    b.cljs$core$IFn$_invoke$arity$variadic = l.cljs$core$IFn$_invoke$arity$variadic;
    return b
  }, c = function(a, b) {
    var c = null, d = function(c) {
      var d = a.cljs$core$IFn$_invoke$arity$1 ? a.cljs$core$IFn$_invoke$arity$1(c) : a.call(null, c);
      return cljs.core.truth_(d) ? d : b.cljs$core$IFn$_invoke$arity$1 ? b.cljs$core$IFn$_invoke$arity$1(c) : b.call(null, c)
    }, e = function(c, d) {
      var e = a.cljs$core$IFn$_invoke$arity$1 ? a.cljs$core$IFn$_invoke$arity$1(c) : a.call(null, c);
      if(cljs.core.truth_(e)) {
        return e
      }
      e = a.cljs$core$IFn$_invoke$arity$1 ? a.cljs$core$IFn$_invoke$arity$1(d) : a.call(null, d);
      if(cljs.core.truth_(e)) {
        return e
      }
      e = b.cljs$core$IFn$_invoke$arity$1 ? b.cljs$core$IFn$_invoke$arity$1(c) : b.call(null, c);
      return cljs.core.truth_(e) ? e : b.cljs$core$IFn$_invoke$arity$1 ? b.cljs$core$IFn$_invoke$arity$1(d) : b.call(null, d)
    }, f = function(c, d, e) {
      var f = a.cljs$core$IFn$_invoke$arity$1 ? a.cljs$core$IFn$_invoke$arity$1(c) : a.call(null, c);
      if(cljs.core.truth_(f)) {
        return f
      }
      f = a.cljs$core$IFn$_invoke$arity$1 ? a.cljs$core$IFn$_invoke$arity$1(d) : a.call(null, d);
      if(cljs.core.truth_(f)) {
        return f
      }
      f = a.cljs$core$IFn$_invoke$arity$1 ? a.cljs$core$IFn$_invoke$arity$1(e) : a.call(null, e);
      if(cljs.core.truth_(f)) {
        return f
      }
      c = b.cljs$core$IFn$_invoke$arity$1 ? b.cljs$core$IFn$_invoke$arity$1(c) : b.call(null, c);
      if(cljs.core.truth_(c)) {
        return c
      }
      d = b.cljs$core$IFn$_invoke$arity$1 ? b.cljs$core$IFn$_invoke$arity$1(d) : b.call(null, d);
      return cljs.core.truth_(d) ? d : b.cljs$core$IFn$_invoke$arity$1 ? b.cljs$core$IFn$_invoke$arity$1(e) : b.call(null, e)
    }, l = function(d, e, f, j) {
      d = c.cljs$core$IFn$_invoke$arity$3(d, e, f);
      return cljs.core.truth_(d) ? d : cljs.core.some(function(c) {
        var d = a.cljs$core$IFn$_invoke$arity$1 ? a.cljs$core$IFn$_invoke$arity$1(c) : a.call(null, c);
        return cljs.core.truth_(d) ? d : b.cljs$core$IFn$_invoke$arity$1 ? b.cljs$core$IFn$_invoke$arity$1(c) : b.call(null, c)
      }, j)
    }, n = function(a, b, c, d) {
      var e = null;
      3 < arguments.length && (e = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
      return l.call(this, a, b, c, e)
    };
    n.cljs$lang$maxFixedArity = 3;
    n.cljs$lang$applyTo = function(a) {
      var b = cljs.core.first(a), a = cljs.core.next(a), c = cljs.core.first(a), a = cljs.core.next(a), d = cljs.core.first(a), a = cljs.core.rest(a);
      return l(b, c, d, a)
    };
    n.cljs$core$IFn$_invoke$arity$variadic = l;
    c = function(a, b, c, h) {
      switch(arguments.length) {
        case 0:
          return null;
        case 1:
          return d.call(this, a);
        case 2:
          return e.call(this, a, b);
        case 3:
          return f.call(this, a, b, c);
        default:
          return n.cljs$core$IFn$_invoke$arity$variadic(a, b, c, cljs.core.array_seq(arguments, 3))
      }
      throw Error("Invalid arity: " + arguments.length);
    };
    c.cljs$lang$maxFixedArity = 3;
    c.cljs$lang$applyTo = n.cljs$lang$applyTo;
    c.cljs$core$IFn$_invoke$arity$0 = function() {
      return null
    };
    c.cljs$core$IFn$_invoke$arity$1 = d;
    c.cljs$core$IFn$_invoke$arity$2 = e;
    c.cljs$core$IFn$_invoke$arity$3 = f;
    c.cljs$core$IFn$_invoke$arity$variadic = n.cljs$core$IFn$_invoke$arity$variadic;
    return c
  }, d = function(a, b, c) {
    var d = null, e = function(d) {
      var e = a.cljs$core$IFn$_invoke$arity$1 ? a.cljs$core$IFn$_invoke$arity$1(d) : a.call(null, d);
      if(cljs.core.truth_(e)) {
        return e
      }
      e = b.cljs$core$IFn$_invoke$arity$1 ? b.cljs$core$IFn$_invoke$arity$1(d) : b.call(null, d);
      return cljs.core.truth_(e) ? e : c.cljs$core$IFn$_invoke$arity$1 ? c.cljs$core$IFn$_invoke$arity$1(d) : c.call(null, d)
    }, f = function(d, e) {
      var f = a.cljs$core$IFn$_invoke$arity$1 ? a.cljs$core$IFn$_invoke$arity$1(d) : a.call(null, d);
      if(cljs.core.truth_(f)) {
        return f
      }
      f = b.cljs$core$IFn$_invoke$arity$1 ? b.cljs$core$IFn$_invoke$arity$1(d) : b.call(null, d);
      if(cljs.core.truth_(f)) {
        return f
      }
      f = c.cljs$core$IFn$_invoke$arity$1 ? c.cljs$core$IFn$_invoke$arity$1(d) : c.call(null, d);
      if(cljs.core.truth_(f)) {
        return f
      }
      f = a.cljs$core$IFn$_invoke$arity$1 ? a.cljs$core$IFn$_invoke$arity$1(e) : a.call(null, e);
      if(cljs.core.truth_(f)) {
        return f
      }
      f = b.cljs$core$IFn$_invoke$arity$1 ? b.cljs$core$IFn$_invoke$arity$1(e) : b.call(null, e);
      return cljs.core.truth_(f) ? f : c.cljs$core$IFn$_invoke$arity$1 ? c.cljs$core$IFn$_invoke$arity$1(e) : c.call(null, e)
    }, l = function(d, e, f) {
      var j = a.cljs$core$IFn$_invoke$arity$1 ? a.cljs$core$IFn$_invoke$arity$1(d) : a.call(null, d);
      if(cljs.core.truth_(j)) {
        return j
      }
      j = b.cljs$core$IFn$_invoke$arity$1 ? b.cljs$core$IFn$_invoke$arity$1(d) : b.call(null, d);
      if(cljs.core.truth_(j)) {
        return j
      }
      d = c.cljs$core$IFn$_invoke$arity$1 ? c.cljs$core$IFn$_invoke$arity$1(d) : c.call(null, d);
      if(cljs.core.truth_(d)) {
        return d
      }
      d = a.cljs$core$IFn$_invoke$arity$1 ? a.cljs$core$IFn$_invoke$arity$1(e) : a.call(null, e);
      if(cljs.core.truth_(d)) {
        return d
      }
      d = b.cljs$core$IFn$_invoke$arity$1 ? b.cljs$core$IFn$_invoke$arity$1(e) : b.call(null, e);
      if(cljs.core.truth_(d)) {
        return d
      }
      e = c.cljs$core$IFn$_invoke$arity$1 ? c.cljs$core$IFn$_invoke$arity$1(e) : c.call(null, e);
      if(cljs.core.truth_(e)) {
        return e
      }
      e = a.cljs$core$IFn$_invoke$arity$1 ? a.cljs$core$IFn$_invoke$arity$1(f) : a.call(null, f);
      if(cljs.core.truth_(e)) {
        return e
      }
      e = b.cljs$core$IFn$_invoke$arity$1 ? b.cljs$core$IFn$_invoke$arity$1(f) : b.call(null, f);
      return cljs.core.truth_(e) ? e : c.cljs$core$IFn$_invoke$arity$1 ? c.cljs$core$IFn$_invoke$arity$1(f) : c.call(null, f)
    }, n = function(e, f, k, m) {
      e = d.cljs$core$IFn$_invoke$arity$3(e, f, k);
      return cljs.core.truth_(e) ? e : cljs.core.some(function(d) {
        var e = a.cljs$core$IFn$_invoke$arity$1 ? a.cljs$core$IFn$_invoke$arity$1(d) : a.call(null, d);
        if(cljs.core.truth_(e)) {
          return e
        }
        e = b.cljs$core$IFn$_invoke$arity$1 ? b.cljs$core$IFn$_invoke$arity$1(d) : b.call(null, d);
        return cljs.core.truth_(e) ? e : c.cljs$core$IFn$_invoke$arity$1 ? c.cljs$core$IFn$_invoke$arity$1(d) : c.call(null, d)
      }, m)
    }, p = function(a, b, c, d) {
      var e = null;
      3 < arguments.length && (e = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
      return n.call(this, a, b, c, e)
    };
    p.cljs$lang$maxFixedArity = 3;
    p.cljs$lang$applyTo = function(a) {
      var b = cljs.core.first(a), a = cljs.core.next(a), c = cljs.core.first(a), a = cljs.core.next(a), d = cljs.core.first(a), a = cljs.core.rest(a);
      return n(b, c, d, a)
    };
    p.cljs$core$IFn$_invoke$arity$variadic = n;
    d = function(a, b, c, d) {
      switch(arguments.length) {
        case 0:
          return null;
        case 1:
          return e.call(this, a);
        case 2:
          return f.call(this, a, b);
        case 3:
          return l.call(this, a, b, c);
        default:
          return p.cljs$core$IFn$_invoke$arity$variadic(a, b, c, cljs.core.array_seq(arguments, 3))
      }
      throw Error("Invalid arity: " + arguments.length);
    };
    d.cljs$lang$maxFixedArity = 3;
    d.cljs$lang$applyTo = p.cljs$lang$applyTo;
    d.cljs$core$IFn$_invoke$arity$0 = function() {
      return null
    };
    d.cljs$core$IFn$_invoke$arity$1 = e;
    d.cljs$core$IFn$_invoke$arity$2 = f;
    d.cljs$core$IFn$_invoke$arity$3 = l;
    d.cljs$core$IFn$_invoke$arity$variadic = p.cljs$core$IFn$_invoke$arity$variadic;
    return d
  }, e = function(a, b, c, d) {
    var e = cljs.core.list_STAR_.cljs$core$IFn$_invoke$arity$4(a, b, c, d), f = null, l = function(a) {
      return cljs.core.some(function(b) {
        return b.cljs$core$IFn$_invoke$arity$1 ? b.cljs$core$IFn$_invoke$arity$1(a) : b.call(null, a)
      }, e)
    }, n = function(a, b) {
      return cljs.core.some(function(c) {
        var d = c.cljs$core$IFn$_invoke$arity$1 ? c.cljs$core$IFn$_invoke$arity$1(a) : c.call(null, a);
        return cljs.core.truth_(d) ? d : c.cljs$core$IFn$_invoke$arity$1 ? c.cljs$core$IFn$_invoke$arity$1(b) : c.call(null, b)
      }, e)
    }, p = function(a, b, c) {
      return cljs.core.some(function(d) {
        var e = d.cljs$core$IFn$_invoke$arity$1 ? d.cljs$core$IFn$_invoke$arity$1(a) : d.call(null, a);
        if(cljs.core.truth_(e)) {
          return e
        }
        e = d.cljs$core$IFn$_invoke$arity$1 ? d.cljs$core$IFn$_invoke$arity$1(b) : d.call(null, b);
        return cljs.core.truth_(e) ? e : d.cljs$core$IFn$_invoke$arity$1 ? d.cljs$core$IFn$_invoke$arity$1(c) : d.call(null, c)
      }, e)
    }, q = function(a, b, c, d) {
      a = f.cljs$core$IFn$_invoke$arity$3(a, b, c);
      return cljs.core.truth_(a) ? a : cljs.core.some(function(a) {
        return cljs.core.some(a, d)
      }, e)
    }, r = function(a, b, c, d) {
      var e = null;
      3 < arguments.length && (e = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
      return q.call(this, a, b, c, e)
    };
    r.cljs$lang$maxFixedArity = 3;
    r.cljs$lang$applyTo = function(a) {
      var b = cljs.core.first(a), a = cljs.core.next(a), c = cljs.core.first(a), a = cljs.core.next(a), d = cljs.core.first(a), a = cljs.core.rest(a);
      return q(b, c, d, a)
    };
    r.cljs$core$IFn$_invoke$arity$variadic = q;
    f = function(a, b, c, d) {
      switch(arguments.length) {
        case 0:
          return null;
        case 1:
          return l.call(this, a);
        case 2:
          return n.call(this, a, b);
        case 3:
          return p.call(this, a, b, c);
        default:
          return r.cljs$core$IFn$_invoke$arity$variadic(a, b, c, cljs.core.array_seq(arguments, 3))
      }
      throw Error("Invalid arity: " + arguments.length);
    };
    f.cljs$lang$maxFixedArity = 3;
    f.cljs$lang$applyTo = r.cljs$lang$applyTo;
    f.cljs$core$IFn$_invoke$arity$0 = function() {
      return null
    };
    f.cljs$core$IFn$_invoke$arity$1 = l;
    f.cljs$core$IFn$_invoke$arity$2 = n;
    f.cljs$core$IFn$_invoke$arity$3 = p;
    f.cljs$core$IFn$_invoke$arity$variadic = r.cljs$core$IFn$_invoke$arity$variadic;
    return f
  }, f = function(a, b, c, d) {
    var f = null;
    3 < arguments.length && (f = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
    return e.call(this, a, b, c, f)
  };
  f.cljs$lang$maxFixedArity = 3;
  f.cljs$lang$applyTo = function(a) {
    var b = cljs.core.first(a), a = cljs.core.next(a), c = cljs.core.first(a), a = cljs.core.next(a), d = cljs.core.first(a), a = cljs.core.rest(a);
    return e(b, c, d, a)
  };
  f.cljs$core$IFn$_invoke$arity$variadic = e;
  a = function(a, e, i, j) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, e);
      case 3:
        return d.call(this, a, e, i);
      default:
        return f.cljs$core$IFn$_invoke$arity$variadic(a, e, i, cljs.core.array_seq(arguments, 3))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 3;
  a.cljs$lang$applyTo = f.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$2 = c;
  a.cljs$core$IFn$_invoke$arity$3 = d;
  a.cljs$core$IFn$_invoke$arity$variadic = f.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
cljs.core.map = function() {
  var a = null, b = function(b, c) {
    return new cljs.core.LazySeq(null, !1, function() {
      var d = cljs.core.seq(c);
      if(d) {
        if(cljs.core.chunked_seq_QMARK_(d)) {
          for(var e = cljs.core.chunk_first(d), f = cljs.core.count(e), m = cljs.core.chunk_buffer(f), l = 0;;) {
            if(l < f) {
              cljs.core.chunk_append(m, b.cljs$core$IFn$_invoke$arity$1 ? b.cljs$core$IFn$_invoke$arity$1(cljs.core._nth.cljs$core$IFn$_invoke$arity$2(e, l)) : b.call(null, cljs.core._nth.cljs$core$IFn$_invoke$arity$2(e, l))), l += 1
            }else {
              break
            }
          }
          return cljs.core.chunk_cons(cljs.core.chunk(m), a.cljs$core$IFn$_invoke$arity$2(b, cljs.core.chunk_rest(d)))
        }
        return cljs.core.cons(b.cljs$core$IFn$_invoke$arity$1 ? b.cljs$core$IFn$_invoke$arity$1(cljs.core.first(d)) : b.call(null, cljs.core.first(d)), a.cljs$core$IFn$_invoke$arity$2(b, cljs.core.rest(d)))
      }
      return null
    }, null)
  }, c = function(b, c, d) {
    return new cljs.core.LazySeq(null, !1, function() {
      var e = cljs.core.seq(c), f = cljs.core.seq(d);
      return(e ? f : e) ? cljs.core.cons(b.cljs$core$IFn$_invoke$arity$2 ? b.cljs$core$IFn$_invoke$arity$2(cljs.core.first(e), cljs.core.first(f)) : b.call(null, cljs.core.first(e), cljs.core.first(f)), a.cljs$core$IFn$_invoke$arity$3(b, cljs.core.rest(e), cljs.core.rest(f))) : null
    }, null)
  }, d = function(b, c, d, e) {
    return new cljs.core.LazySeq(null, !1, function() {
      var f = cljs.core.seq(c), m = cljs.core.seq(d), l = cljs.core.seq(e);
      return(f ? m ? l : m : f) ? cljs.core.cons(b.cljs$core$IFn$_invoke$arity$3 ? b.cljs$core$IFn$_invoke$arity$3(cljs.core.first(f), cljs.core.first(m), cljs.core.first(l)) : b.call(null, cljs.core.first(f), cljs.core.first(m), cljs.core.first(l)), a.cljs$core$IFn$_invoke$arity$4(b, cljs.core.rest(f), cljs.core.rest(m), cljs.core.rest(l))) : null
    }, null)
  }, e = function(b, c, d, e, f) {
    return a.cljs$core$IFn$_invoke$arity$2(function(a) {
      return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(b, a)
    }, function l(b) {
      return new cljs.core.LazySeq(null, !1, function() {
        var c = a.cljs$core$IFn$_invoke$arity$2(cljs.core.seq, b);
        return cljs.core.every_QMARK_(cljs.core.identity, c) ? cljs.core.cons(a.cljs$core$IFn$_invoke$arity$2(cljs.core.first, c), l(a.cljs$core$IFn$_invoke$arity$2(cljs.core.rest, c))) : null
      }, null)
    }(cljs.core.conj.cljs$core$IFn$_invoke$arity$variadic(f, e, cljs.core.array_seq([d, c], 0))))
  }, f = function(a, b, c, d, f) {
    var m = null;
    4 < arguments.length && (m = cljs.core.array_seq(Array.prototype.slice.call(arguments, 4), 0));
    return e.call(this, a, b, c, d, m)
  };
  f.cljs$lang$maxFixedArity = 4;
  f.cljs$lang$applyTo = function(a) {
    var b = cljs.core.first(a), a = cljs.core.next(a), c = cljs.core.first(a), a = cljs.core.next(a), d = cljs.core.first(a), a = cljs.core.next(a), f = cljs.core.first(a), a = cljs.core.rest(a);
    return e(b, c, d, f, a)
  };
  f.cljs$core$IFn$_invoke$arity$variadic = e;
  a = function(a, e, i, j, k) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, e);
      case 3:
        return c.call(this, a, e, i);
      case 4:
        return d.call(this, a, e, i, j);
      default:
        return f.cljs$core$IFn$_invoke$arity$variadic(a, e, i, j, cljs.core.array_seq(arguments, 4))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 4;
  a.cljs$lang$applyTo = f.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$3 = c;
  a.cljs$core$IFn$_invoke$arity$4 = d;
  a.cljs$core$IFn$_invoke$arity$variadic = f.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
cljs.core.take = function take(b, c) {
  return new cljs.core.LazySeq(null, !1, function() {
    if(0 < b) {
      var d = cljs.core.seq(c);
      return d ? cljs.core.cons(cljs.core.first(d), take(b - 1, cljs.core.rest(d))) : null
    }
    return null
  }, null)
};
cljs.core.drop = function(a, b) {
  return new cljs.core.LazySeq(null, !1, function() {
    var c;
    a: {
      var d = a;
      for(c = b;;) {
        var e = cljs.core.seq(c);
        if(cljs.core.truth_(function() {
          var a = 0 < d;
          return a ? e : a
        }())) {
          c = d - 1;
          var f = cljs.core.rest(e), d = c;
          c = f
        }else {
          c = e;
          break a
        }
      }
      c = void 0
    }
    return c
  }, null)
};
cljs.core.drop_last = function() {
  var a = null, b = function(b) {
    return a.cljs$core$IFn$_invoke$arity$2(1, b)
  }, c = function(a, b) {
    return cljs.core.map.cljs$core$IFn$_invoke$arity$3(function(a) {
      return a
    }, b, cljs.core.drop(a, b))
  }, a = function(a, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, e)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$2 = c;
  return a
}();
cljs.core.take_last = function(a, b) {
  for(var c = cljs.core.seq(b), d = cljs.core.seq(cljs.core.drop(a, b));;) {
    if(d) {
      c = cljs.core.next(c), d = cljs.core.next(d)
    }else {
      return c
    }
  }
};
cljs.core.drop_while = function(a, b) {
  return new cljs.core.LazySeq(null, !1, function() {
    var c;
    a: {
      var d = a;
      for(c = b;;) {
        var e = cljs.core.seq(c);
        if(cljs.core.truth_(function() {
          var a = e;
          return a ? d.cljs$core$IFn$_invoke$arity$1 ? d.cljs$core$IFn$_invoke$arity$1(cljs.core.first(e)) : d.call(null, cljs.core.first(e)) : a
        }())) {
          c = d;
          var f = cljs.core.rest(e), d = c;
          c = f
        }else {
          c = e;
          break a
        }
      }
      c = void 0
    }
    return c
  }, null)
};
cljs.core.cycle = function cycle(b) {
  return new cljs.core.LazySeq(null, !1, function() {
    var c = cljs.core.seq(b);
    return c ? cljs.core.concat.cljs$core$IFn$_invoke$arity$2(c, cycle(c)) : null
  }, null)
};
cljs.core.split_at = function(a, b) {
  return cljs.core.PersistentVector.fromArray([cljs.core.take(a, b), cljs.core.drop(a, b)], !0)
};
cljs.core.repeat = function() {
  var a = null, b = function(b) {
    return new cljs.core.LazySeq(null, !1, function() {
      return cljs.core.cons(b, a.cljs$core$IFn$_invoke$arity$1(b))
    }, null)
  }, c = function(b, c) {
    return cljs.core.take(b, a.cljs$core$IFn$_invoke$arity$1(c))
  }, a = function(a, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, e)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$2 = c;
  return a
}();
cljs.core.replicate = function(a, b) {
  return cljs.core.take(a, cljs.core.repeat.cljs$core$IFn$_invoke$arity$1(b))
};
cljs.core.repeatedly = function() {
  var a = null, b = function(b) {
    return new cljs.core.LazySeq(null, !1, function() {
      return cljs.core.cons(b.cljs$core$IFn$_invoke$arity$0 ? b.cljs$core$IFn$_invoke$arity$0() : b.call(null), a.cljs$core$IFn$_invoke$arity$1(b))
    }, null)
  }, c = function(b, c) {
    return cljs.core.take(b, a.cljs$core$IFn$_invoke$arity$1(c))
  }, a = function(a, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, e)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$2 = c;
  return a
}();
cljs.core.iterate = function iterate(b, c) {
  return cljs.core.cons(c, new cljs.core.LazySeq(null, !1, function() {
    return iterate(b, b.cljs$core$IFn$_invoke$arity$1 ? b.cljs$core$IFn$_invoke$arity$1(c) : b.call(null, c))
  }, null))
};
cljs.core.interleave = function() {
  var a = null, b = function(b, c) {
    return new cljs.core.LazySeq(null, !1, function() {
      var d = cljs.core.seq(b), h = cljs.core.seq(c);
      return(d ? h : d) ? cljs.core.cons(cljs.core.first(d), cljs.core.cons(cljs.core.first(h), a.cljs$core$IFn$_invoke$arity$2(cljs.core.rest(d), cljs.core.rest(h)))) : null
    }, null)
  }, c = function(b, c, d) {
    return new cljs.core.LazySeq(null, !1, function() {
      var h = cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.seq, cljs.core.conj.cljs$core$IFn$_invoke$arity$variadic(d, c, cljs.core.array_seq([b], 0)));
      return cljs.core.every_QMARK_(cljs.core.identity, h) ? cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.first, h), cljs.core.apply.cljs$core$IFn$_invoke$arity$2(a, cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.rest, h))) : null
    }, null)
  }, d = function(a, b, d) {
    var h = null;
    2 < arguments.length && (h = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
    return c.call(this, a, b, h)
  };
  d.cljs$lang$maxFixedArity = 2;
  d.cljs$lang$applyTo = function(a) {
    var b = cljs.core.first(a), a = cljs.core.next(a), d = cljs.core.first(a), a = cljs.core.rest(a);
    return c(b, d, a)
  };
  d.cljs$core$IFn$_invoke$arity$variadic = c;
  a = function(a, c, g) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, c);
      default:
        return d.cljs$core$IFn$_invoke$arity$variadic(a, c, cljs.core.array_seq(arguments, 2))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = d.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$variadic = d.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
cljs.core.interpose = function(a, b) {
  return cljs.core.drop(1, cljs.core.interleave.cljs$core$IFn$_invoke$arity$2(cljs.core.repeat.cljs$core$IFn$_invoke$arity$1(a), b))
};
cljs.core.flatten1 = function(a) {
  return function c(a, e) {
    return new cljs.core.LazySeq(null, !1, function() {
      var f = cljs.core.seq(a);
      return f ? cljs.core.cons(cljs.core.first(f), c(cljs.core.rest(f), e)) : cljs.core.seq(e) ? c(cljs.core.first(e), cljs.core.rest(e)) : null
    }, null)
  }(null, a)
};
cljs.core.mapcat = function() {
  var a = null, b = function(a, b) {
    return cljs.core.flatten1(cljs.core.map.cljs$core$IFn$_invoke$arity$2(a, b))
  }, c = function(a, b, c) {
    return cljs.core.flatten1(cljs.core.apply.cljs$core$IFn$_invoke$arity$4(cljs.core.map, a, b, c))
  }, d = function(a, b, d) {
    var h = null;
    2 < arguments.length && (h = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
    return c.call(this, a, b, h)
  };
  d.cljs$lang$maxFixedArity = 2;
  d.cljs$lang$applyTo = function(a) {
    var b = cljs.core.first(a), a = cljs.core.next(a), d = cljs.core.first(a), a = cljs.core.rest(a);
    return c(b, d, a)
  };
  d.cljs$core$IFn$_invoke$arity$variadic = c;
  a = function(a, c, g) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, c);
      default:
        return d.cljs$core$IFn$_invoke$arity$variadic(a, c, cljs.core.array_seq(arguments, 2))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = d.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$variadic = d.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
cljs.core.filter = function filter(b, c) {
  return new cljs.core.LazySeq(null, !1, function() {
    var d = cljs.core.seq(c);
    if(d) {
      if(cljs.core.chunked_seq_QMARK_(d)) {
        for(var e = cljs.core.chunk_first(d), f = cljs.core.count(e), g = cljs.core.chunk_buffer(f), h = 0;;) {
          if(h < f) {
            cljs.core.truth_(b.cljs$core$IFn$_invoke$arity$1 ? b.cljs$core$IFn$_invoke$arity$1(cljs.core._nth.cljs$core$IFn$_invoke$arity$2(e, h)) : b.call(null, cljs.core._nth.cljs$core$IFn$_invoke$arity$2(e, h))) && cljs.core.chunk_append(g, cljs.core._nth.cljs$core$IFn$_invoke$arity$2(e, h)), h += 1
          }else {
            break
          }
        }
        return cljs.core.chunk_cons(cljs.core.chunk(g), filter(b, cljs.core.chunk_rest(d)))
      }
      e = cljs.core.first(d);
      d = cljs.core.rest(d);
      return cljs.core.truth_(b.cljs$core$IFn$_invoke$arity$1 ? b.cljs$core$IFn$_invoke$arity$1(e) : b.call(null, e)) ? cljs.core.cons(e, filter(b, d)) : filter(b, d)
    }
    return null
  }, null)
};
cljs.core.remove = function(a, b) {
  return cljs.core.filter(cljs.core.complement(a), b)
};
cljs.core.tree_seq = function(a, b, c) {
  return function e(c) {
    return new cljs.core.LazySeq(null, !1, function() {
      return cljs.core.cons(c, cljs.core.truth_(a.cljs$core$IFn$_invoke$arity$1 ? a.cljs$core$IFn$_invoke$arity$1(c) : a.call(null, c)) ? cljs.core.mapcat.cljs$core$IFn$_invoke$arity$2(e, b.cljs$core$IFn$_invoke$arity$1 ? b.cljs$core$IFn$_invoke$arity$1(c) : b.call(null, c)) : null)
    }, null)
  }(c)
};
cljs.core.flatten = function(a) {
  return cljs.core.filter(function(a) {
    return!cljs.core.sequential_QMARK_(a)
  }, cljs.core.rest(cljs.core.tree_seq(cljs.core.sequential_QMARK_, cljs.core.seq, a)))
};
cljs.core.into = function(a, b) {
  var c;
  null != a ? (a ? (c = (c = a.cljs$lang$protocol_mask$partition1$ & 4) ? c : a.cljs$core$IEditableCollection$, c = c ? !0 : !1) : c = !1, c = c ? cljs.core.persistent_BANG_(cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core._conj_BANG_, cljs.core.transient$(a), b)) : cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core._conj, a, b)) : c = cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core.conj, cljs.core.List.EMPTY, b);
  return c
};
cljs.core.mapv = function() {
  var a = null, b = function(a, b) {
    return cljs.core.persistent_BANG_(cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(function(b, c) {
      return cljs.core.conj_BANG_(b, a.cljs$core$IFn$_invoke$arity$1 ? a.cljs$core$IFn$_invoke$arity$1(c) : a.call(null, c))
    }, cljs.core.transient$(cljs.core.PersistentVector.EMPTY), b))
  }, c = function(a, b, c) {
    return cljs.core.into(cljs.core.PersistentVector.EMPTY, cljs.core.map.cljs$core$IFn$_invoke$arity$3(a, b, c))
  }, d = function(a, b, c, d) {
    return cljs.core.into(cljs.core.PersistentVector.EMPTY, cljs.core.map.cljs$core$IFn$_invoke$arity$4(a, b, c, d))
  }, e = function(a, b, c, d, e) {
    return cljs.core.into(cljs.core.PersistentVector.EMPTY, cljs.core.apply.cljs$core$IFn$_invoke$arity$variadic(cljs.core.map, a, b, c, d, cljs.core.array_seq([e], 0)))
  }, f = function(a, b, c, d, f) {
    var m = null;
    4 < arguments.length && (m = cljs.core.array_seq(Array.prototype.slice.call(arguments, 4), 0));
    return e.call(this, a, b, c, d, m)
  };
  f.cljs$lang$maxFixedArity = 4;
  f.cljs$lang$applyTo = function(a) {
    var b = cljs.core.first(a), a = cljs.core.next(a), c = cljs.core.first(a), a = cljs.core.next(a), d = cljs.core.first(a), a = cljs.core.next(a), f = cljs.core.first(a), a = cljs.core.rest(a);
    return e(b, c, d, f, a)
  };
  f.cljs$core$IFn$_invoke$arity$variadic = e;
  a = function(a, e, i, j, k) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, e);
      case 3:
        return c.call(this, a, e, i);
      case 4:
        return d.call(this, a, e, i, j);
      default:
        return f.cljs$core$IFn$_invoke$arity$variadic(a, e, i, j, cljs.core.array_seq(arguments, 4))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 4;
  a.cljs$lang$applyTo = f.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$3 = c;
  a.cljs$core$IFn$_invoke$arity$4 = d;
  a.cljs$core$IFn$_invoke$arity$variadic = f.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
cljs.core.filterv = function(a, b) {
  return cljs.core.persistent_BANG_(cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(function(b, d) {
    return cljs.core.truth_(a.cljs$core$IFn$_invoke$arity$1 ? a.cljs$core$IFn$_invoke$arity$1(d) : a.call(null, d)) ? cljs.core.conj_BANG_(b, d) : b
  }, cljs.core.transient$(cljs.core.PersistentVector.EMPTY), b))
};
cljs.core.partition = function() {
  var a = null, b = function(b, c) {
    return a.cljs$core$IFn$_invoke$arity$3(b, b, c)
  }, c = function(b, c, d) {
    return new cljs.core.LazySeq(null, !1, function() {
      var h = cljs.core.seq(d);
      if(h) {
        var i = cljs.core.take(b, h);
        return b === cljs.core.count(i) ? cljs.core.cons(i, a.cljs$core$IFn$_invoke$arity$3(b, c, cljs.core.drop(c, h))) : null
      }
      return null
    }, null)
  }, d = function(b, c, d, h) {
    return new cljs.core.LazySeq(null, !1, function() {
      var i = cljs.core.seq(h);
      if(i) {
        var j = cljs.core.take(b, i);
        return b === cljs.core.count(j) ? cljs.core.cons(j, a.cljs$core$IFn$_invoke$arity$4(b, c, d, cljs.core.drop(c, i))) : cljs.core.list.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.take(b, cljs.core.concat.cljs$core$IFn$_invoke$arity$2(j, d))], 0))
      }
      return null
    }, null)
  }, a = function(a, f, g, h) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, f);
      case 3:
        return c.call(this, a, f, g);
      case 4:
        return d.call(this, a, f, g, h)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$3 = c;
  a.cljs$core$IFn$_invoke$arity$4 = d;
  return a
}();
cljs.core.get_in = function() {
  var a = null, b = function(b, c) {
    return a.cljs$core$IFn$_invoke$arity$3(b, c, null)
  }, c = function(a, b, c) {
    for(var g = cljs.core.lookup_sentinel, b = cljs.core.seq(b);;) {
      if(b) {
        var h;
        if(h = a) {
          var i = void 0;
          i = (i = h.cljs$lang$protocol_mask$partition0$ & 256) ? i : h.cljs$core$ILookup$;
          h = i ? !0 : h.cljs$lang$protocol_mask$partition0$ ? !1 : cljs.core.type_satisfies_(cljs.core.ILookup, h)
        }else {
          h = cljs.core.type_satisfies_(cljs.core.ILookup, h)
        }
        if(h) {
          a = cljs.core.get.cljs$core$IFn$_invoke$arity$3(a, cljs.core.first(b), g);
          if(g === a) {
            return c
          }
          b = cljs.core.next(b)
        }else {
          return c
        }
      }else {
        return a
      }
    }
  }, a = function(a, e, f) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, e);
      case 3:
        return c.call(this, a, e, f)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$3 = c;
  return a
}();
cljs.core.assoc_in = function assoc_in(b, c, d) {
  var e = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(c, 0, null), c = cljs.core.nthnext(c, 1);
  return cljs.core.truth_(c) ? cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(b, e, assoc_in(cljs.core.get.cljs$core$IFn$_invoke$arity$2(b, e), c, d)) : cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(b, e, d)
};
cljs.core.update_in = function() {
  var a = null, b = function(b, c, d) {
    var e = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(c, 0, null), c = cljs.core.nthnext(c, 1);
    return cljs.core.truth_(c) ? cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(b, e, a.cljs$core$IFn$_invoke$arity$3(cljs.core.get.cljs$core$IFn$_invoke$arity$2(b, e), c, d)) : cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(b, e, d.cljs$core$IFn$_invoke$arity$1 ? d.cljs$core$IFn$_invoke$arity$1(cljs.core.get.cljs$core$IFn$_invoke$arity$2(b, e)) : d.call(null, cljs.core.get.cljs$core$IFn$_invoke$arity$2(b, e)))
  }, c = function(b, c, d, e) {
    var f = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(c, 0, null), c = cljs.core.nthnext(c, 1);
    return cljs.core.truth_(c) ? cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(b, f, a.cljs$core$IFn$_invoke$arity$4(cljs.core.get.cljs$core$IFn$_invoke$arity$2(b, f), c, d, e)) : cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(b, f, d.cljs$core$IFn$_invoke$arity$2 ? d.cljs$core$IFn$_invoke$arity$2(cljs.core.get.cljs$core$IFn$_invoke$arity$2(b, f), e) : d.call(null, cljs.core.get.cljs$core$IFn$_invoke$arity$2(b, f), e))
  }, d = function(b, c, d, e, f) {
    var g = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(c, 0, null), c = cljs.core.nthnext(c, 1);
    return cljs.core.truth_(c) ? cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(b, g, a.cljs$core$IFn$_invoke$arity$5(cljs.core.get.cljs$core$IFn$_invoke$arity$2(b, g), c, d, e, f)) : cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(b, g, d.cljs$core$IFn$_invoke$arity$3 ? d.cljs$core$IFn$_invoke$arity$3(cljs.core.get.cljs$core$IFn$_invoke$arity$2(b, g), e, f) : d.call(null, cljs.core.get.cljs$core$IFn$_invoke$arity$2(b, g), e, f))
  }, e = function(b, c, d, e, f, g) {
    var n = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(c, 0, null), c = cljs.core.nthnext(c, 1);
    return cljs.core.truth_(c) ? cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(b, n, a.cljs$core$IFn$_invoke$arity$6(cljs.core.get.cljs$core$IFn$_invoke$arity$2(b, n), c, d, e, f, g)) : cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(b, n, d.cljs$core$IFn$_invoke$arity$4 ? d.cljs$core$IFn$_invoke$arity$4(cljs.core.get.cljs$core$IFn$_invoke$arity$2(b, n), e, f, g) : d.call(null, cljs.core.get.cljs$core$IFn$_invoke$arity$2(b, n), e, f, g))
  }, f = function(b, c, d, e, f, g, n) {
    var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(c, 0, null), c = cljs.core.nthnext(c, 1);
    return cljs.core.truth_(c) ? cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(b, p, cljs.core.apply.cljs$core$IFn$_invoke$arity$variadic(a, cljs.core.get.cljs$core$IFn$_invoke$arity$2(b, p), c, d, e, cljs.core.array_seq([f, g, n], 0))) : cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(b, p, cljs.core.apply.cljs$core$IFn$_invoke$arity$variadic(d, cljs.core.get.cljs$core$IFn$_invoke$arity$2(b, p), e, f, g, cljs.core.array_seq([n], 0)))
  }, g = function(a, b, c, d, e, g, n) {
    var p = null;
    6 < arguments.length && (p = cljs.core.array_seq(Array.prototype.slice.call(arguments, 6), 0));
    return f.call(this, a, b, c, d, e, g, p)
  };
  g.cljs$lang$maxFixedArity = 6;
  g.cljs$lang$applyTo = function(a) {
    var b = cljs.core.first(a), a = cljs.core.next(a), c = cljs.core.first(a), a = cljs.core.next(a), d = cljs.core.first(a), a = cljs.core.next(a), e = cljs.core.first(a), a = cljs.core.next(a), g = cljs.core.first(a), a = cljs.core.next(a), n = cljs.core.first(a), a = cljs.core.rest(a);
    return f(b, c, d, e, g, n, a)
  };
  g.cljs$core$IFn$_invoke$arity$variadic = f;
  a = function(a, f, j, k, m, l, n) {
    switch(arguments.length) {
      case 3:
        return b.call(this, a, f, j);
      case 4:
        return c.call(this, a, f, j, k);
      case 5:
        return d.call(this, a, f, j, k, m);
      case 6:
        return e.call(this, a, f, j, k, m, l);
      default:
        return g.cljs$core$IFn$_invoke$arity$variadic(a, f, j, k, m, l, cljs.core.array_seq(arguments, 6))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 6;
  a.cljs$lang$applyTo = g.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$3 = b;
  a.cljs$core$IFn$_invoke$arity$4 = c;
  a.cljs$core$IFn$_invoke$arity$5 = d;
  a.cljs$core$IFn$_invoke$arity$6 = e;
  a.cljs$core$IFn$_invoke$arity$variadic = g.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
cljs.core.VectorNode = function(a, b) {
  this.edit = a;
  this.arr = b
};
cljs.core.VectorNode.cljs$lang$type = !0;
cljs.core.VectorNode.cljs$lang$ctorStr = "cljs.core/VectorNode";
cljs.core.VectorNode.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write(b, "cljs.core/VectorNode")
};
cljs.core.__GT_VectorNode = function(a, b) {
  return new cljs.core.VectorNode(a, b)
};
cljs.core.pv_fresh_node = function(a) {
  return new cljs.core.VectorNode(a, Array(32))
};
cljs.core.pv_aget = function(a, b) {
  return a.arr[b]
};
cljs.core.pv_aset = function(a, b, c) {
  return a.arr[b] = c
};
cljs.core.pv_clone_node = function(a) {
  return new cljs.core.VectorNode(a.edit, a.arr.slice())
};
cljs.core.tail_off = function(a) {
  a = a.cnt;
  return 32 > a ? 0 : a - 1 >>> 5 << 5
};
cljs.core.new_path = function(a, b, c) {
  for(;;) {
    if(0 === b) {
      return c
    }
    var d = cljs.core.pv_fresh_node(a);
    cljs.core.pv_aset(d, 0, c);
    c = d;
    b -= 5
  }
};
cljs.core.push_tail = function push_tail(b, c, d, e) {
  var f = cljs.core.pv_clone_node(d), g = b.cnt - 1 >>> c & 31;
  5 === c ? cljs.core.pv_aset(f, g, e) : (d = cljs.core.pv_aget(d, g), b = null != d ? push_tail(b, c - 5, d, e) : cljs.core.new_path(null, c - 5, e), cljs.core.pv_aset(f, g, b));
  return f
};
cljs.core.vector_index_out_of_bounds = function(a, b) {
  throw Error([cljs.core.str("No item "), cljs.core.str(a), cljs.core.str(" in vector of length "), cljs.core.str(b)].join(""));
};
cljs.core.array_for = function(a, b) {
  var c;
  c = (c = 0 <= b) ? b < a.cnt : c;
  if(c) {
    if(b >= cljs.core.tail_off(a)) {
      return a.tail
    }
    c = a.root;
    for(var d = a.shift;;) {
      if(0 < d) {
        c = cljs.core.pv_aget(c, b >>> d & 31), d -= 5
      }else {
        return c.arr
      }
    }
  }else {
    return cljs.core.vector_index_out_of_bounds(b, a.cnt)
  }
};
cljs.core.do_assoc = function do_assoc(b, c, d, e, f) {
  var g = cljs.core.pv_clone_node(d);
  if(0 === c) {
    cljs.core.pv_aset(g, e & 31, f)
  }else {
    var h = e >>> c & 31;
    cljs.core.pv_aset(g, h, do_assoc(b, c - 5, cljs.core.pv_aget(d, h), e, f))
  }
  return g
};
cljs.core.pop_tail = function pop_tail(b, c, d) {
  var e = b.cnt - 2 >>> c & 31;
  if(5 < c) {
    b = pop_tail(b, c - 5, cljs.core.pv_aget(d, e));
    c = null == b;
    if(c ? 0 === e : c) {
      return null
    }
    d = cljs.core.pv_clone_node(d);
    cljs.core.pv_aset(d, e, b);
    return d
  }
  if(0 === e) {
    return null
  }
  d = cljs.core.pv_clone_node(d);
  cljs.core.pv_aset(d, e, null);
  return d
};
cljs.core.PersistentVector = function(a, b, c, d, e, f) {
  this.meta = a;
  this.cnt = b;
  this.shift = c;
  this.root = d;
  this.tail = e;
  this.__hash = f;
  this.cljs$lang$protocol_mask$partition1$ = 4;
  this.cljs$lang$protocol_mask$partition0$ = 167668511
};
cljs.core.PersistentVector.cljs$lang$type = !0;
cljs.core.PersistentVector.cljs$lang$ctorStr = "cljs.core/PersistentVector";
cljs.core.PersistentVector.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write(b, "cljs.core/PersistentVector")
};
cljs.core.PersistentVector.prototype.cljs$core$IEditableCollection$_as_transient$arity$1 = function() {
  return new cljs.core.TransientVector(this.cnt, this.shift, cljs.core.tv_editable_root.cljs$core$IFn$_invoke$arity$1 ? cljs.core.tv_editable_root.cljs$core$IFn$_invoke$arity$1(this.root) : cljs.core.tv_editable_root.call(null, this.root), cljs.core.tv_editable_tail.cljs$core$IFn$_invoke$arity$1 ? cljs.core.tv_editable_tail.cljs$core$IFn$_invoke$arity$1(this.tail) : cljs.core.tv_editable_tail.call(null, this.tail))
};
cljs.core.PersistentVector.prototype.cljs$core$IHash$_hash$arity$1 = function(a) {
  var b = this.__hash;
  return null != b ? b : this.__hash = a = cljs.core.hash_coll(a)
};
cljs.core.PersistentVector.prototype.cljs$core$ILookup$_lookup$arity$2 = function(a, b) {
  return a.cljs$core$IIndexed$_nth$arity$3(a, b, null)
};
cljs.core.PersistentVector.prototype.cljs$core$ILookup$_lookup$arity$3 = function(a, b, c) {
  return a.cljs$core$IIndexed$_nth$arity$3(a, b, c)
};
cljs.core.PersistentVector.prototype.cljs$core$IAssociative$_assoc$arity$3 = function(a, b, c) {
  var d;
  d = (d = 0 <= b) ? b < this.cnt : d;
  if(d) {
    return cljs.core.tail_off(a) <= b ? (a = this.tail.slice(), a[b & 31] = c, new cljs.core.PersistentVector(this.meta, this.cnt, this.shift, this.root, a, null)) : new cljs.core.PersistentVector(this.meta, this.cnt, this.shift, cljs.core.do_assoc(a, this.shift, this.root, b, c), this.tail, null)
  }
  if(b === this.cnt) {
    return a.cljs$core$ICollection$_conj$arity$2(a, c)
  }
  throw Error([cljs.core.str("Index "), cljs.core.str(b), cljs.core.str(" out of bounds  [0,"), cljs.core.str(this.cnt), cljs.core.str("]")].join(""));
};
cljs.core.PersistentVector.prototype.call = function() {
  var a = null;
  return a = function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return this.cljs$core$IIndexed$_nth$arity$2(this, c);
      case 3:
        return this.cljs$core$IIndexed$_nth$arity$3(this, c, d)
    }
    throw Error("Invalid arity: " + arguments.length);
  }
}();
cljs.core.PersistentVector.prototype.apply = function(a, b) {
  a = this;
  return a.call.apply(a, [a].concat(b.slice()))
};
cljs.core.PersistentVector.prototype.cljs$core$IKVReduce$_kv_reduce$arity$3 = function(a, b, c) {
  for(var c = [0, c], d = 0;;) {
    if(d < this.cnt) {
      var e = cljs.core.array_for(a, d), f = e.length;
      a: {
        for(var g = 0, h = c[1];;) {
          if(g < f) {
            if(h = b.cljs$core$IFn$_invoke$arity$3 ? b.cljs$core$IFn$_invoke$arity$3(h, g + d, e[g]) : b.call(null, h, g + d, e[g]), cljs.core.reduced_QMARK_(h)) {
              e = h;
              break a
            }else {
              g += 1
            }
          }else {
            c[0] = f;
            e = c[1] = h;
            break a
          }
        }
        e = void 0
      }
      if(cljs.core.reduced_QMARK_(e)) {
        return cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(e) : cljs.core.deref.call(null, e)
      }
      d += c[0]
    }else {
      return c[1]
    }
  }
};
cljs.core.PersistentVector.prototype.cljs$core$ICollection$_conj$arity$2 = function(a, b) {
  if(32 > this.cnt - cljs.core.tail_off(a)) {
    var c = this.tail.slice();
    c.push(b);
    return new cljs.core.PersistentVector(this.meta, this.cnt + 1, this.shift, this.root, c, null)
  }
  var d = this.cnt >>> 5 > 1 << this.shift, c = d ? this.shift + 5 : this.shift;
  d ? (d = cljs.core.pv_fresh_node(null), cljs.core.pv_aset(d, 0, this.root), cljs.core.pv_aset(d, 1, cljs.core.new_path(null, this.shift, new cljs.core.VectorNode(null, this.tail)))) : d = cljs.core.push_tail(a, this.shift, this.root, new cljs.core.VectorNode(null, this.tail));
  return new cljs.core.PersistentVector(this.meta, this.cnt + 1, c, d, [b], null)
};
cljs.core.PersistentVector.prototype.cljs$core$IReversible$_rseq$arity$1 = function(a) {
  return 0 < this.cnt ? new cljs.core.RSeq(a, this.cnt - 1, null) : cljs.core.List.EMPTY
};
cljs.core.PersistentVector.prototype.cljs$core$IMapEntry$_key$arity$1 = function(a) {
  return a.cljs$core$IIndexed$_nth$arity$2(a, 0)
};
cljs.core.PersistentVector.prototype.cljs$core$IMapEntry$_val$arity$1 = function(a) {
  return a.cljs$core$IIndexed$_nth$arity$2(a, 1)
};
cljs.core.PersistentVector.prototype.toString = function() {
  return cljs.core.pr_str_STAR_(this)
};
cljs.core.PersistentVector.prototype.cljs$core$IReduce$_reduce$arity$2 = function(a, b) {
  return cljs.core.ci_reduce.cljs$core$IFn$_invoke$arity$2(a, b)
};
cljs.core.PersistentVector.prototype.cljs$core$IReduce$_reduce$arity$3 = function(a, b, c) {
  return cljs.core.ci_reduce.cljs$core$IFn$_invoke$arity$3(a, b, c)
};
cljs.core.PersistentVector.prototype.cljs$core$ISeqable$_seq$arity$1 = function(a) {
  return 0 === this.cnt ? null : 32 > this.cnt ? cljs.core.array_seq.cljs$core$IFn$_invoke$arity$1(this.tail) : cljs.core.chunked_seq.cljs$core$IFn$_invoke$arity$3 ? cljs.core.chunked_seq.cljs$core$IFn$_invoke$arity$3(a, 0, 0) : cljs.core.chunked_seq.call(null, a, 0, 0)
};
cljs.core.PersistentVector.prototype.cljs$core$ICounted$_count$arity$1 = function() {
  return this.cnt
};
cljs.core.PersistentVector.prototype.cljs$core$IStack$_peek$arity$1 = function(a) {
  return 0 < this.cnt ? a.cljs$core$IIndexed$_nth$arity$2(a, this.cnt - 1) : null
};
cljs.core.PersistentVector.prototype.cljs$core$IStack$_pop$arity$1 = function(a) {
  if(0 === this.cnt) {
    throw Error("Can't pop empty vector");
  }
  if(1 === this.cnt) {
    return cljs.core._with_meta(cljs.core.PersistentVector.EMPTY, this.meta)
  }
  if(1 < this.cnt - cljs.core.tail_off(a)) {
    return new cljs.core.PersistentVector(this.meta, this.cnt - 1, this.shift, this.root, this.tail.slice(0, -1), null)
  }
  var b = cljs.core.array_for(a, this.cnt - 2), a = cljs.core.pop_tail(a, this.shift, this.root), a = null == a ? cljs.core.PersistentVector.EMPTY_NODE : a, c = this.cnt - 1, d;
  d = (d = 5 < this.shift) ? null == cljs.core.pv_aget(a, 1) : d;
  return d ? new cljs.core.PersistentVector(this.meta, c, this.shift - 5, cljs.core.pv_aget(a, 0), b, null) : new cljs.core.PersistentVector(this.meta, c, this.shift, a, b, null)
};
cljs.core.PersistentVector.prototype.cljs$core$IVector$_assoc_n$arity$3 = function(a, b, c) {
  return a.cljs$core$IAssociative$_assoc$arity$3(a, b, c)
};
cljs.core.PersistentVector.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(a, b) {
  return cljs.core.equiv_sequential(a, b)
};
cljs.core.PersistentVector.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(a, b) {
  return new cljs.core.PersistentVector(b, this.cnt, this.shift, this.root, this.tail, this.__hash)
};
cljs.core.PersistentVector.prototype.cljs$core$IMeta$_meta$arity$1 = function() {
  return this.meta
};
cljs.core.PersistentVector.prototype.cljs$core$IIndexed$_nth$arity$2 = function(a, b) {
  return cljs.core.array_for(a, b)[b & 31]
};
cljs.core.PersistentVector.prototype.cljs$core$IIndexed$_nth$arity$3 = function(a, b, c) {
  var d;
  d = (d = 0 <= b) ? b < this.cnt : d;
  return d ? a.cljs$core$IIndexed$_nth$arity$2(a, b) : c
};
cljs.core.PersistentVector.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function() {
  return cljs.core.with_meta(cljs.core.PersistentVector.EMPTY, this.meta)
};
cljs.core.__GT_PersistentVector = function(a, b, c, d, e, f) {
  return new cljs.core.PersistentVector(a, b, c, d, e, f)
};
cljs.core.PersistentVector.EMPTY_NODE = new cljs.core.VectorNode(null, Array(32));
cljs.core.PersistentVector.EMPTY = new cljs.core.PersistentVector(null, 0, 5, cljs.core.PersistentVector.EMPTY_NODE, [], 0);
cljs.core.PersistentVector.fromArray = function(a, b) {
  var c = a.length, d = b ? a : a.slice();
  if(32 > c) {
    return new cljs.core.PersistentVector(null, c, 5, cljs.core.PersistentVector.EMPTY_NODE, d, null)
  }
  for(var e = d.slice(0, 32), f = new cljs.core.PersistentVector(null, 32, 5, cljs.core.PersistentVector.EMPTY_NODE, e, null), e = 32, g = cljs.core._as_transient(f);;) {
    if(e < c) {
      f = e + 1, g = cljs.core.conj_BANG_(g, d[e]), e = f
    }else {
      return cljs.core.persistent_BANG_(g)
    }
  }
};
cljs.core.vec = function(a) {
  return cljs.core._persistent_BANG_(cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core._conj_BANG_, cljs.core._as_transient(cljs.core.PersistentVector.EMPTY), a))
};
cljs.core.vector = function() {
  var a = function(a) {
    return cljs.core.vec(a)
  }, b = function(b) {
    var d = null;
    0 < arguments.length && (d = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0));
    return a.call(this, d)
  };
  b.cljs$lang$maxFixedArity = 0;
  b.cljs$lang$applyTo = function(b) {
    b = cljs.core.seq(b);
    return a(b)
  };
  b.cljs$core$IFn$_invoke$arity$variadic = a;
  return b
}();
cljs.core.ChunkedSeq = function(a, b, c, d, e, f) {
  this.vec = a;
  this.node = b;
  this.i = c;
  this.off = d;
  this.meta = e;
  this.__hash = f;
  this.cljs$lang$protocol_mask$partition0$ = 32243948;
  this.cljs$lang$protocol_mask$partition1$ = 1536
};
cljs.core.ChunkedSeq.cljs$lang$type = !0;
cljs.core.ChunkedSeq.cljs$lang$ctorStr = "cljs.core/ChunkedSeq";
cljs.core.ChunkedSeq.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write(b, "cljs.core/ChunkedSeq")
};
cljs.core.ChunkedSeq.prototype.cljs$core$IHash$_hash$arity$1 = function(a) {
  var b = this.__hash;
  return null != b ? b : this.__hash = a = cljs.core.hash_coll(a)
};
cljs.core.ChunkedSeq.prototype.cljs$core$INext$_next$arity$1 = function(a) {
  return this.off + 1 < this.node.length ? (a = cljs.core.chunked_seq.cljs$core$IFn$_invoke$arity$4 ? cljs.core.chunked_seq.cljs$core$IFn$_invoke$arity$4(this.vec, this.node, this.i, this.off + 1) : cljs.core.chunked_seq.call(null, this.vec, this.node, this.i, this.off + 1), null == a ? null : a) : a.cljs$core$IChunkedNext$_chunked_next$arity$1(a)
};
cljs.core.ChunkedSeq.prototype.cljs$core$ICollection$_conj$arity$2 = function(a, b) {
  return cljs.core.cons(b, a)
};
cljs.core.ChunkedSeq.prototype.toString = function() {
  return cljs.core.pr_str_STAR_(this)
};
cljs.core.ChunkedSeq.prototype.cljs$core$IReduce$_reduce$arity$2 = function(a, b) {
  return cljs.core.ci_reduce.cljs$core$IFn$_invoke$arity$2(cljs.core.subvec.cljs$core$IFn$_invoke$arity$3 ? cljs.core.subvec.cljs$core$IFn$_invoke$arity$3(this.vec, this.i + this.off, cljs.core.count(this.vec)) : cljs.core.subvec.call(null, this.vec, this.i + this.off, cljs.core.count(this.vec)), b)
};
cljs.core.ChunkedSeq.prototype.cljs$core$IReduce$_reduce$arity$3 = function(a, b, c) {
  return cljs.core.ci_reduce.cljs$core$IFn$_invoke$arity$3(cljs.core.subvec.cljs$core$IFn$_invoke$arity$3 ? cljs.core.subvec.cljs$core$IFn$_invoke$arity$3(this.vec, this.i + this.off, cljs.core.count(this.vec)) : cljs.core.subvec.call(null, this.vec, this.i + this.off, cljs.core.count(this.vec)), b, c)
};
cljs.core.ChunkedSeq.prototype.cljs$core$ISeqable$_seq$arity$1 = function(a) {
  return a
};
cljs.core.ChunkedSeq.prototype.cljs$core$ISeq$_first$arity$1 = function() {
  return this.node[this.off]
};
cljs.core.ChunkedSeq.prototype.cljs$core$ISeq$_rest$arity$1 = function(a) {
  return this.off + 1 < this.node.length ? (a = cljs.core.chunked_seq.cljs$core$IFn$_invoke$arity$4 ? cljs.core.chunked_seq.cljs$core$IFn$_invoke$arity$4(this.vec, this.node, this.i, this.off + 1) : cljs.core.chunked_seq.call(null, this.vec, this.node, this.i, this.off + 1), null == a ? cljs.core.List.EMPTY : a) : a.cljs$core$IChunkedSeq$_chunked_rest$arity$1(a)
};
cljs.core.ChunkedSeq.prototype.cljs$core$IChunkedNext$_chunked_next$arity$1 = function() {
  var a = this.node.length, a = this.i + a < cljs.core._count(this.vec) ? cljs.core.chunked_seq.cljs$core$IFn$_invoke$arity$3 ? cljs.core.chunked_seq.cljs$core$IFn$_invoke$arity$3(this.vec, this.i + a, 0) : cljs.core.chunked_seq.call(null, this.vec, this.i + a, 0) : null;
  return null == a ? null : a
};
cljs.core.ChunkedSeq.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(a, b) {
  return cljs.core.equiv_sequential(a, b)
};
cljs.core.ChunkedSeq.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(a, b) {
  return cljs.core.chunked_seq.cljs$core$IFn$_invoke$arity$5 ? cljs.core.chunked_seq.cljs$core$IFn$_invoke$arity$5(this.vec, this.node, this.i, this.off, b) : cljs.core.chunked_seq.call(null, this.vec, this.node, this.i, this.off, b)
};
cljs.core.ChunkedSeq.prototype.cljs$core$IWithMeta$_meta$arity$1 = function() {
  return this.meta
};
cljs.core.ChunkedSeq.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function() {
  return cljs.core.with_meta(cljs.core.PersistentVector.EMPTY, this.meta)
};
cljs.core.ChunkedSeq.prototype.cljs$core$IChunkedSeq$_chunked_first$arity$1 = function() {
  return cljs.core.array_chunk.cljs$core$IFn$_invoke$arity$2(this.node, this.off)
};
cljs.core.ChunkedSeq.prototype.cljs$core$IChunkedSeq$_chunked_rest$arity$1 = function() {
  var a = this.node.length, a = this.i + a < cljs.core._count(this.vec) ? cljs.core.chunked_seq.cljs$core$IFn$_invoke$arity$3 ? cljs.core.chunked_seq.cljs$core$IFn$_invoke$arity$3(this.vec, this.i + a, 0) : cljs.core.chunked_seq.call(null, this.vec, this.i + a, 0) : null;
  return null == a ? cljs.core.List.EMPTY : a
};
cljs.core.__GT_ChunkedSeq = function(a, b, c, d, e, f) {
  return new cljs.core.ChunkedSeq(a, b, c, d, e, f)
};
cljs.core.chunked_seq = function() {
  var a = null, b = function(a, b, c) {
    return new cljs.core.ChunkedSeq(a, cljs.core.array_for(a, b), b, c, null, null)
  }, c = function(a, b, c, d) {
    return new cljs.core.ChunkedSeq(a, b, c, d, null, null)
  }, d = function(a, b, c, d, i) {
    return new cljs.core.ChunkedSeq(a, b, c, d, i, null)
  }, a = function(a, f, g, h, i) {
    switch(arguments.length) {
      case 3:
        return b.call(this, a, f, g);
      case 4:
        return c.call(this, a, f, g, h);
      case 5:
        return d.call(this, a, f, g, h, i)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$3 = b;
  a.cljs$core$IFn$_invoke$arity$4 = c;
  a.cljs$core$IFn$_invoke$arity$5 = d;
  return a
}();
cljs.core.Subvec = function(a, b, c, d, e) {
  this.meta = a;
  this.v = b;
  this.start = c;
  this.end = d;
  this.__hash = e;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 32400159
};
cljs.core.Subvec.cljs$lang$type = !0;
cljs.core.Subvec.cljs$lang$ctorStr = "cljs.core/Subvec";
cljs.core.Subvec.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write(b, "cljs.core/Subvec")
};
cljs.core.Subvec.prototype.cljs$core$IHash$_hash$arity$1 = function(a) {
  var b = this.__hash;
  return null != b ? b : this.__hash = a = cljs.core.hash_coll(a)
};
cljs.core.Subvec.prototype.cljs$core$ILookup$_lookup$arity$2 = function(a, b) {
  return a.cljs$core$IIndexed$_nth$arity$3(a, b, null)
};
cljs.core.Subvec.prototype.cljs$core$ILookup$_lookup$arity$3 = function(a, b, c) {
  return a.cljs$core$IIndexed$_nth$arity$3(a, b, c)
};
cljs.core.Subvec.prototype.cljs$core$IAssociative$_assoc$arity$3 = function(a, b, c) {
  var d = this, e = d.start + b;
  return cljs.core.build_subvec.cljs$core$IFn$_invoke$arity$5 ? cljs.core.build_subvec.cljs$core$IFn$_invoke$arity$5(d.meta, cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(d.v, e, c), d.start, function() {
    var a = d.end, b = e + 1;
    return a > b ? a : b
  }(), null) : cljs.core.build_subvec.call(null, d.meta, cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(d.v, e, c), d.start, function() {
    var a = d.end, b = e + 1;
    return a > b ? a : b
  }(), null)
};
cljs.core.Subvec.prototype.call = function() {
  var a = null;
  return a = function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return this.cljs$core$IIndexed$_nth$arity$2(this, c);
      case 3:
        return this.cljs$core$IIndexed$_nth$arity$3(this, c, d)
    }
    throw Error("Invalid arity: " + arguments.length);
  }
}();
cljs.core.Subvec.prototype.apply = function(a, b) {
  a = this;
  return a.call.apply(a, [a].concat(b.slice()))
};
cljs.core.Subvec.prototype.cljs$core$ICollection$_conj$arity$2 = function(a, b) {
  return cljs.core.build_subvec.cljs$core$IFn$_invoke$arity$5 ? cljs.core.build_subvec.cljs$core$IFn$_invoke$arity$5(this.meta, cljs.core._assoc_n(this.v, this.end, b), this.start, this.end + 1, null) : cljs.core.build_subvec.call(null, this.meta, cljs.core._assoc_n(this.v, this.end, b), this.start, this.end + 1, null)
};
cljs.core.Subvec.prototype.toString = function() {
  return cljs.core.pr_str_STAR_(this)
};
cljs.core.Subvec.prototype.cljs$core$IReduce$_reduce$arity$2 = function(a, b) {
  return cljs.core.ci_reduce.cljs$core$IFn$_invoke$arity$2(a, b)
};
cljs.core.Subvec.prototype.cljs$core$IReduce$_reduce$arity$3 = function(a, b, c) {
  return cljs.core.ci_reduce.cljs$core$IFn$_invoke$arity$3(a, b, c)
};
cljs.core.Subvec.prototype.cljs$core$ISeqable$_seq$arity$1 = function() {
  var a = this;
  return function c(d) {
    return d === a.end ? null : cljs.core.cons(cljs.core._nth.cljs$core$IFn$_invoke$arity$2(a.v, d), new cljs.core.LazySeq(null, !1, function() {
      return c(d + 1)
    }, null))
  }(a.start)
};
cljs.core.Subvec.prototype.cljs$core$ICounted$_count$arity$1 = function() {
  return this.end - this.start
};
cljs.core.Subvec.prototype.cljs$core$IStack$_peek$arity$1 = function() {
  return cljs.core._nth.cljs$core$IFn$_invoke$arity$2(this.v, this.end - 1)
};
cljs.core.Subvec.prototype.cljs$core$IStack$_pop$arity$1 = function() {
  if(this.start === this.end) {
    throw Error("Can't pop empty vector");
  }
  return cljs.core.build_subvec.cljs$core$IFn$_invoke$arity$5 ? cljs.core.build_subvec.cljs$core$IFn$_invoke$arity$5(this.meta, this.v, this.start, this.end - 1, null) : cljs.core.build_subvec.call(null, this.meta, this.v, this.start, this.end - 1, null)
};
cljs.core.Subvec.prototype.cljs$core$IVector$_assoc_n$arity$3 = function(a, b, c) {
  return a.cljs$core$IAssociative$_assoc$arity$3(a, b, c)
};
cljs.core.Subvec.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(a, b) {
  return cljs.core.equiv_sequential(a, b)
};
cljs.core.Subvec.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(a, b) {
  return cljs.core.build_subvec.cljs$core$IFn$_invoke$arity$5 ? cljs.core.build_subvec.cljs$core$IFn$_invoke$arity$5(b, this.v, this.start, this.end, this.__hash) : cljs.core.build_subvec.call(null, b, this.v, this.start, this.end, this.__hash)
};
cljs.core.Subvec.prototype.cljs$core$IMeta$_meta$arity$1 = function() {
  return this.meta
};
cljs.core.Subvec.prototype.cljs$core$IIndexed$_nth$arity$2 = function(a, b) {
  var c;
  c = (c = 0 > b) ? c : this.end <= this.start + b;
  return c ? cljs.core.vector_index_out_of_bounds(b, this.end - this.start) : cljs.core._nth.cljs$core$IFn$_invoke$arity$2(this.v, this.start + b)
};
cljs.core.Subvec.prototype.cljs$core$IIndexed$_nth$arity$3 = function(a, b, c) {
  a = (a = 0 > b) ? a : this.end <= this.start + b;
  return a ? c : cljs.core._nth.cljs$core$IFn$_invoke$arity$3(this.v, this.start + b, c)
};
cljs.core.Subvec.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function() {
  return cljs.core.with_meta(cljs.core.PersistentVector.EMPTY, this.meta)
};
cljs.core.__GT_Subvec = function(a, b, c, d, e) {
  return new cljs.core.Subvec(a, b, c, d, e)
};
cljs.core.build_subvec = function(a, b, c, d, e) {
  for(;;) {
    if(b instanceof cljs.core.Subvec) {
      var f = b.start + c, g = b.start + d, b = b.v, c = f, d = g
    }else {
      var h = cljs.core.count(b);
      if(function() {
        var a = 0 > c;
        return a || (a = 0 > d) ? a : (a = c > h) ? a : d > h
      }()) {
        throw Error("Index out of bounds");
      }
      return new cljs.core.Subvec(a, b, c, d, e)
    }
  }
};
cljs.core.subvec = function() {
  var a = null, b = function(b, c) {
    return a.cljs$core$IFn$_invoke$arity$3(b, c, cljs.core.count(b))
  }, c = function(a, b, c) {
    return cljs.core.build_subvec(null, a, b, c, null)
  }, a = function(a, e, f) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, e);
      case 3:
        return c.call(this, a, e, f)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$3 = c;
  return a
}();
cljs.core.tv_ensure_editable = function(a, b) {
  return a === b.edit ? b : new cljs.core.VectorNode(a, b.arr.slice())
};
cljs.core.tv_editable_root = function(a) {
  return new cljs.core.VectorNode({}, a.arr.slice())
};
cljs.core.tv_editable_tail = function(a) {
  var b = Array(32);
  cljs.core.array_copy(a, 0, b, 0, a.length);
  return b
};
cljs.core.tv_push_tail = function tv_push_tail(b, c, d, e) {
  var f = cljs.core.tv_ensure_editable(b.root.edit, d), g = b.cnt - 1 >>> c & 31;
  cljs.core.pv_aset(f, g, 5 === c ? e : function() {
    var d = cljs.core.pv_aget(f, g);
    return null != d ? tv_push_tail(b, c - 5, d, e) : cljs.core.new_path(b.root.edit, c - 5, e)
  }());
  return f
};
cljs.core.tv_pop_tail = function tv_pop_tail(b, c, d) {
  var d = cljs.core.tv_ensure_editable(b.root.edit, d), e = b.cnt - 2 >>> c & 31;
  if(5 < c) {
    b = tv_pop_tail(b, c - 5, cljs.core.pv_aget(d, e));
    c = null == b;
    if(c ? 0 === e : c) {
      return null
    }
    cljs.core.pv_aset(d, e, b);
    return d
  }
  if(0 === e) {
    return null
  }
  cljs.core.pv_aset(d, e, null);
  return d
};
cljs.core.editable_array_for = function(a, b) {
  var c;
  c = (c = 0 <= b) ? b < a.cnt : c;
  if(c) {
    if(b >= cljs.core.tail_off(a)) {
      return a.tail
    }
    for(var d = c = a.root, e = a.shift;;) {
      if(0 < e) {
        d = cljs.core.tv_ensure_editable(c.edit, cljs.core.pv_aget(d, b >>> e & 31)), e -= 5
      }else {
        return d.arr
      }
    }
  }else {
    throw Error([cljs.core.str("No item "), cljs.core.str(b), cljs.core.str(" in transient vector of length "), cljs.core.str(a.cnt)].join(""));
  }
};
cljs.core.TransientVector = function(a, b, c, d) {
  this.cnt = a;
  this.shift = b;
  this.root = c;
  this.tail = d;
  this.cljs$lang$protocol_mask$partition0$ = 275;
  this.cljs$lang$protocol_mask$partition1$ = 88
};
cljs.core.TransientVector.cljs$lang$type = !0;
cljs.core.TransientVector.cljs$lang$ctorStr = "cljs.core/TransientVector";
cljs.core.TransientVector.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write(b, "cljs.core/TransientVector")
};
cljs.core.TransientVector.prototype.call = function() {
  var a = null;
  return a = function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return this.cljs$core$ILookup$_lookup$arity$2(this, c);
      case 3:
        return this.cljs$core$ILookup$_lookup$arity$3(this, c, d)
    }
    throw Error("Invalid arity: " + arguments.length);
  }
}();
cljs.core.TransientVector.prototype.apply = function(a, b) {
  a = this;
  return a.call.apply(a, [a].concat(b.slice()))
};
cljs.core.TransientVector.prototype.cljs$core$ILookup$_lookup$arity$2 = function(a, b) {
  return a.cljs$core$IIndexed$_nth$arity$3(a, b, null)
};
cljs.core.TransientVector.prototype.cljs$core$ILookup$_lookup$arity$3 = function(a, b, c) {
  return a.cljs$core$IIndexed$_nth$arity$3(a, b, c)
};
cljs.core.TransientVector.prototype.cljs$core$IIndexed$_nth$arity$2 = function(a, b) {
  if(this.root.edit) {
    return cljs.core.array_for(a, b)[b & 31]
  }
  throw Error("nth after persistent!");
};
cljs.core.TransientVector.prototype.cljs$core$IIndexed$_nth$arity$3 = function(a, b, c) {
  var d;
  d = (d = 0 <= b) ? b < this.cnt : d;
  return d ? a.cljs$core$IIndexed$_nth$arity$2(a, b) : c
};
cljs.core.TransientVector.prototype.cljs$core$ICounted$_count$arity$1 = function() {
  if(this.root.edit) {
    return this.cnt
  }
  throw Error("count after persistent!");
};
cljs.core.TransientVector.prototype.cljs$core$ITransientVector$_assoc_n_BANG_$arity$3 = function(a, b, c) {
  var d = this;
  if(d.root.edit) {
    var e;
    e = (e = 0 <= b) ? b < d.cnt : e;
    if(e) {
      return cljs.core.tail_off(a) <= b ? d.tail[b & 31] = c : (e = function g(a, e) {
        var j = cljs.core.tv_ensure_editable(d.root.edit, e);
        if(0 === a) {
          cljs.core.pv_aset(j, b & 31, c)
        }else {
          var k = b >>> a & 31;
          cljs.core.pv_aset(j, k, g(a - 5, cljs.core.pv_aget(j, k)))
        }
        return j
      }.call(null, d.shift, d.root), d.root = e), a
    }
    if(b === d.cnt) {
      return a.cljs$core$ITransientCollection$_conj_BANG_$arity$2(a, c)
    }
    throw Error([cljs.core.str("Index "), cljs.core.str(b), cljs.core.str(" out of bounds for TransientVector of length"), cljs.core.str(d.cnt)].join(""));
  }
  throw Error("assoc! after persistent!");
};
cljs.core.TransientVector.prototype.cljs$core$ITransientVector$_pop_BANG_$arity$1 = function(a) {
  if(this.root.edit) {
    if(0 === this.cnt) {
      throw Error("Can't pop empty vector");
    }
    if(1 === this.cnt) {
      this.cnt = 0
    }else {
      if(0 < (this.cnt - 1 & 31)) {
        this.cnt -= 1
      }else {
        var b = cljs.core.editable_array_for(a, this.cnt - 2), c;
        c = cljs.core.tv_pop_tail(a, this.shift, this.root);
        c = null != c ? c : new cljs.core.VectorNode(this.root.edit, Array(32));
        var d;
        d = (d = 5 < this.shift) ? null == cljs.core.pv_aget(c, 1) : d;
        d ? (this.root = cljs.core.tv_ensure_editable(this.root.edit, cljs.core.pv_aget(c, 0)), this.shift -= 5) : this.root = c;
        this.cnt -= 1;
        this.tail = b
      }
    }
    return a
  }
  throw Error("pop! after persistent!");
};
cljs.core.TransientVector.prototype.cljs$core$ITransientAssociative$_assoc_BANG_$arity$3 = function(a, b, c) {
  return a.cljs$core$ITransientVector$_assoc_n_BANG_$arity$3(a, b, c)
};
cljs.core.TransientVector.prototype.cljs$core$ITransientCollection$_conj_BANG_$arity$2 = function(a, b) {
  if(this.root.edit) {
    if(32 > this.cnt - cljs.core.tail_off(a)) {
      this.tail[this.cnt & 31] = b
    }else {
      var c = new cljs.core.VectorNode(this.root.edit, this.tail), d = Array(32);
      d[0] = b;
      this.tail = d;
      if(this.cnt >>> 5 > 1 << this.shift) {
        var d = Array(32), e = this.shift + 5;
        d[0] = this.root;
        d[1] = cljs.core.new_path(this.root.edit, this.shift, c);
        this.root = new cljs.core.VectorNode(this.root.edit, d);
        this.shift = e
      }else {
        this.root = cljs.core.tv_push_tail(a, this.shift, this.root, c)
      }
    }
    this.cnt += 1;
    return a
  }
  throw Error("conj! after persistent!");
};
cljs.core.TransientVector.prototype.cljs$core$ITransientCollection$_persistent_BANG_$arity$1 = function(a) {
  if(this.root.edit) {
    this.root.edit = null;
    var a = this.cnt - cljs.core.tail_off(a), b = Array(a);
    cljs.core.array_copy(this.tail, 0, b, 0, a);
    return new cljs.core.PersistentVector(null, this.cnt, this.shift, this.root, b, null)
  }
  throw Error("persistent! called twice");
};
cljs.core.__GT_TransientVector = function(a, b, c, d) {
  return new cljs.core.TransientVector(a, b, c, d)
};
cljs.core.PersistentQueueSeq = function(a, b, c, d) {
  this.meta = a;
  this.front = b;
  this.rear = c;
  this.__hash = d;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 31850572
};
cljs.core.PersistentQueueSeq.cljs$lang$type = !0;
cljs.core.PersistentQueueSeq.cljs$lang$ctorStr = "cljs.core/PersistentQueueSeq";
cljs.core.PersistentQueueSeq.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write(b, "cljs.core/PersistentQueueSeq")
};
cljs.core.PersistentQueueSeq.prototype.cljs$core$IHash$_hash$arity$1 = function(a) {
  var b = this.__hash;
  return null != b ? b : this.__hash = a = cljs.core.hash_coll(a)
};
cljs.core.PersistentQueueSeq.prototype.cljs$core$ICollection$_conj$arity$2 = function(a, b) {
  return cljs.core.cons(b, a)
};
cljs.core.PersistentQueueSeq.prototype.toString = function() {
  return cljs.core.pr_str_STAR_(this)
};
cljs.core.PersistentQueueSeq.prototype.cljs$core$ISeqable$_seq$arity$1 = function(a) {
  return a
};
cljs.core.PersistentQueueSeq.prototype.cljs$core$ISeq$_first$arity$1 = function() {
  return cljs.core.first(this.front)
};
cljs.core.PersistentQueueSeq.prototype.cljs$core$ISeq$_rest$arity$1 = function(a) {
  var b = cljs.core.next(this.front);
  return b ? new cljs.core.PersistentQueueSeq(this.meta, b, this.rear, null) : null == this.rear ? a.cljs$core$IEmptyableCollection$_empty$arity$1(a) : new cljs.core.PersistentQueueSeq(this.meta, this.rear, null, null)
};
cljs.core.PersistentQueueSeq.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(a, b) {
  return cljs.core.equiv_sequential(a, b)
};
cljs.core.PersistentQueueSeq.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(a, b) {
  return new cljs.core.PersistentQueueSeq(b, this.front, this.rear, this.__hash)
};
cljs.core.PersistentQueueSeq.prototype.cljs$core$IMeta$_meta$arity$1 = function() {
  return this.meta
};
cljs.core.PersistentQueueSeq.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function() {
  return cljs.core.with_meta(cljs.core.List.EMPTY, this.meta)
};
cljs.core.__GT_PersistentQueueSeq = function(a, b, c, d) {
  return new cljs.core.PersistentQueueSeq(a, b, c, d)
};
cljs.core.PersistentQueue = function(a, b, c, d, e) {
  this.meta = a;
  this.count = b;
  this.front = c;
  this.rear = d;
  this.__hash = e;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 31858766
};
cljs.core.PersistentQueue.cljs$lang$type = !0;
cljs.core.PersistentQueue.cljs$lang$ctorStr = "cljs.core/PersistentQueue";
cljs.core.PersistentQueue.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write(b, "cljs.core/PersistentQueue")
};
cljs.core.PersistentQueue.prototype.cljs$core$IHash$_hash$arity$1 = function(a) {
  var b = this.__hash;
  return null != b ? b : this.__hash = a = cljs.core.hash_coll(a)
};
cljs.core.PersistentQueue.prototype.cljs$core$ICollection$_conj$arity$2 = function(a, b) {
  var c = this;
  return cljs.core.truth_(c.front) ? new cljs.core.PersistentQueue(c.meta, c.count + 1, c.front, cljs.core.conj.cljs$core$IFn$_invoke$arity$2(function() {
    var a = c.rear;
    return cljs.core.truth_(a) ? a : cljs.core.PersistentVector.EMPTY
  }(), b), null) : new cljs.core.PersistentQueue(c.meta, c.count + 1, cljs.core.conj.cljs$core$IFn$_invoke$arity$2(c.front, b), cljs.core.PersistentVector.EMPTY, null)
};
cljs.core.PersistentQueue.prototype.toString = function() {
  return cljs.core.pr_str_STAR_(this)
};
cljs.core.PersistentQueue.prototype.cljs$core$ISeqable$_seq$arity$1 = function() {
  var a = this, b = cljs.core.seq(a.rear);
  return cljs.core.truth_(function() {
    var c = a.front;
    return cljs.core.truth_(c) ? c : b
  }()) ? new cljs.core.PersistentQueueSeq(null, a.front, cljs.core.seq(b), null) : null
};
cljs.core.PersistentQueue.prototype.cljs$core$ICounted$_count$arity$1 = function() {
  return this.count
};
cljs.core.PersistentQueue.prototype.cljs$core$IStack$_peek$arity$1 = function() {
  return cljs.core.first(this.front)
};
cljs.core.PersistentQueue.prototype.cljs$core$IStack$_pop$arity$1 = function(a) {
  return cljs.core.truth_(this.front) ? (a = cljs.core.next(this.front)) ? new cljs.core.PersistentQueue(this.meta, this.count - 1, a, this.rear, null) : new cljs.core.PersistentQueue(this.meta, this.count - 1, cljs.core.seq(this.rear), cljs.core.PersistentVector.EMPTY, null) : a
};
cljs.core.PersistentQueue.prototype.cljs$core$ISeq$_first$arity$1 = function() {
  return cljs.core.first(this.front)
};
cljs.core.PersistentQueue.prototype.cljs$core$ISeq$_rest$arity$1 = function(a) {
  return cljs.core.rest(cljs.core.seq(a))
};
cljs.core.PersistentQueue.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(a, b) {
  return cljs.core.equiv_sequential(a, b)
};
cljs.core.PersistentQueue.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(a, b) {
  return new cljs.core.PersistentQueue(b, this.count, this.front, this.rear, this.__hash)
};
cljs.core.PersistentQueue.prototype.cljs$core$IMeta$_meta$arity$1 = function() {
  return this.meta
};
cljs.core.PersistentQueue.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function() {
  return cljs.core.PersistentQueue.EMPTY
};
cljs.core.__GT_PersistentQueue = function(a, b, c, d, e) {
  return new cljs.core.PersistentQueue(a, b, c, d, e)
};
cljs.core.PersistentQueue.EMPTY = new cljs.core.PersistentQueue(null, 0, null, cljs.core.PersistentVector.EMPTY, 0);
cljs.core.NeverEquiv = function() {
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 2097152
};
cljs.core.NeverEquiv.cljs$lang$type = !0;
cljs.core.NeverEquiv.cljs$lang$ctorStr = "cljs.core/NeverEquiv";
cljs.core.NeverEquiv.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write(b, "cljs.core/NeverEquiv")
};
cljs.core.NeverEquiv.prototype.cljs$core$IEquiv$_equiv$arity$2 = function() {
  return!1
};
cljs.core.__GT_NeverEquiv = function() {
  return new cljs.core.NeverEquiv
};
cljs.core.never_equiv = new cljs.core.NeverEquiv;
cljs.core.equiv_map = function(a, b) {
  return cljs.core.boolean$(cljs.core.map_QMARK_(b) ? cljs.core.count(a) === cljs.core.count(b) ? cljs.core.every_QMARK_(cljs.core.identity, cljs.core.map.cljs$core$IFn$_invoke$arity$2(function(a) {
    return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.get.cljs$core$IFn$_invoke$arity$3(b, cljs.core.first(a), cljs.core.never_equiv), cljs.core.second(a))
  }, a)) : null : null)
};
cljs.core.scan_array = function(a, b, c) {
  for(var d = c.length, e = 0;;) {
    if(e < d) {
      if(b === c[e]) {
        return e
      }
      e += a
    }else {
      return null
    }
  }
};
cljs.core.obj_map_compare_keys = function(a, b) {
  var c = cljs.core.hash.cljs$core$IFn$_invoke$arity$1(a), d = cljs.core.hash.cljs$core$IFn$_invoke$arity$1(b);
  return c < d ? -1 : c > d ? 1 : 0
};
cljs.core.obj_map__GT_hash_map = function(a, b, c) {
  for(var d = a.keys, e = d.length, f = a.strobj, a = cljs.core.meta(a), g = 0, h = cljs.core.transient$(cljs.core.PersistentHashMap.EMPTY);;) {
    if(g < e) {
      var i = d[g], g = g + 1, h = cljs.core.assoc_BANG_(h, i, f[i])
    }else {
      return cljs.core.with_meta(cljs.core.persistent_BANG_(cljs.core.assoc_BANG_(h, b, c)), a)
    }
  }
};
cljs.core.obj_clone = function(a, b) {
  for(var c = {}, d = b.length, e = 0;;) {
    if(e < d) {
      var f = b[e];
      c[f] = a[f];
      e += 1
    }else {
      break
    }
  }
  return c
};
cljs.core.ObjMap = function(a, b, c, d, e) {
  this.meta = a;
  this.keys = b;
  this.strobj = c;
  this.update_count = d;
  this.__hash = e;
  this.cljs$lang$protocol_mask$partition1$ = 4;
  this.cljs$lang$protocol_mask$partition0$ = 16123663
};
cljs.core.ObjMap.cljs$lang$type = !0;
cljs.core.ObjMap.cljs$lang$ctorStr = "cljs.core/ObjMap";
cljs.core.ObjMap.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write(b, "cljs.core/ObjMap")
};
cljs.core.ObjMap.prototype.cljs$core$IEditableCollection$_as_transient$arity$1 = function(a) {
  return cljs.core.transient$(cljs.core.into(cljs.core.hash_map.cljs$core$IFn$_invoke$arity$0 ? cljs.core.hash_map.cljs$core$IFn$_invoke$arity$0() : cljs.core.hash_map.call(null), a))
};
cljs.core.ObjMap.prototype.cljs$core$IHash$_hash$arity$1 = function(a) {
  var b = this.__hash;
  return null != b ? b : this.__hash = a = cljs.core.hash_imap(a)
};
cljs.core.ObjMap.prototype.cljs$core$ILookup$_lookup$arity$2 = function(a, b) {
  return a.cljs$core$ILookup$_lookup$arity$3(a, b, null)
};
cljs.core.ObjMap.prototype.cljs$core$ILookup$_lookup$arity$3 = function(a, b, c) {
  a = (a = goog.isString(b)) ? null != cljs.core.scan_array(1, b, this.keys) : a;
  return a ? this.strobj[b] : c
};
cljs.core.ObjMap.prototype.cljs$core$IAssociative$_assoc$arity$3 = function(a, b, c) {
  if(goog.isString(b)) {
    var d;
    d = (d = this.update_count > cljs.core.ObjMap.HASHMAP_THRESHOLD) ? d : this.keys.length >= cljs.core.ObjMap.HASHMAP_THRESHOLD;
    if(d) {
      return cljs.core.obj_map__GT_hash_map(a, b, c)
    }
    if(null != cljs.core.scan_array(1, b, this.keys)) {
      return a = cljs.core.obj_clone(this.strobj, this.keys), a[b] = c, new cljs.core.ObjMap(this.meta, this.keys, a, this.update_count + 1, null)
    }
    a = cljs.core.obj_clone(this.strobj, this.keys);
    d = this.keys.slice();
    a[b] = c;
    d.push(b);
    return new cljs.core.ObjMap(this.meta, d, a, this.update_count + 1, null)
  }
  return cljs.core.obj_map__GT_hash_map(a, b, c)
};
cljs.core.ObjMap.prototype.cljs$core$IAssociative$_contains_key_QMARK_$arity$2 = function(a, b) {
  var c;
  c = (c = goog.isString(b)) ? null != cljs.core.scan_array(1, b, this.keys) : c;
  return c ? !0 : !1
};
cljs.core.ObjMap.prototype.call = function() {
  var a = null;
  return a = function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return this.cljs$core$ILookup$_lookup$arity$2(this, c);
      case 3:
        return this.cljs$core$ILookup$_lookup$arity$3(this, c, d)
    }
    throw Error("Invalid arity: " + arguments.length);
  }
}();
cljs.core.ObjMap.prototype.apply = function(a, b) {
  a = this;
  return a.call.apply(a, [a].concat(b.slice()))
};
cljs.core.ObjMap.prototype.cljs$core$IKVReduce$_kv_reduce$arity$3 = function(a, b, c) {
  for(a = this.keys.sort(cljs.core.obj_map_compare_keys);;) {
    if(cljs.core.seq(a)) {
      var d = cljs.core.first(a), c = b.cljs$core$IFn$_invoke$arity$3 ? b.cljs$core$IFn$_invoke$arity$3(c, d, this.strobj[d]) : b.call(null, c, d, this.strobj[d]);
      if(cljs.core.reduced_QMARK_(c)) {
        return cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(c) : cljs.core.deref.call(null, c)
      }
      a = cljs.core.rest(a)
    }else {
      return c
    }
  }
};
cljs.core.ObjMap.prototype.cljs$core$ICollection$_conj$arity$2 = function(a, b) {
  return cljs.core.vector_QMARK_(b) ? a.cljs$core$IAssociative$_assoc$arity$3(a, cljs.core._nth.cljs$core$IFn$_invoke$arity$2(b, 0), cljs.core._nth.cljs$core$IFn$_invoke$arity$2(b, 1)) : cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core._conj, a, b)
};
cljs.core.ObjMap.prototype.toString = function() {
  return cljs.core.pr_str_STAR_(this)
};
cljs.core.ObjMap.prototype.cljs$core$ISeqable$_seq$arity$1 = function() {
  var a = this;
  return 0 < a.keys.length ? cljs.core.map.cljs$core$IFn$_invoke$arity$2(function(b) {
    return cljs.core.vector.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([b, a.strobj[b]], 0))
  }, a.keys.sort(cljs.core.obj_map_compare_keys)) : null
};
cljs.core.ObjMap.prototype.cljs$core$ICounted$_count$arity$1 = function() {
  return this.keys.length
};
cljs.core.ObjMap.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(a, b) {
  return cljs.core.equiv_map(a, b)
};
cljs.core.ObjMap.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(a, b) {
  return new cljs.core.ObjMap(b, this.keys, this.strobj, this.update_count, this.__hash)
};
cljs.core.ObjMap.prototype.cljs$core$IMeta$_meta$arity$1 = function() {
  return this.meta
};
cljs.core.ObjMap.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function() {
  return cljs.core.with_meta(cljs.core.ObjMap.EMPTY, this.meta)
};
cljs.core.ObjMap.prototype.cljs$core$IMap$_dissoc$arity$2 = function(a, b) {
  var c;
  c = (c = goog.isString(b)) ? null != cljs.core.scan_array(1, b, this.keys) : c;
  if(c) {
    c = this.keys.slice();
    var d = cljs.core.obj_clone(this.strobj, this.keys);
    c.splice(cljs.core.scan_array(1, b, c), 1);
    delete d[b];
    return new cljs.core.ObjMap(this.meta, c, d, this.update_count + 1, null)
  }
  return a
};
cljs.core.__GT_ObjMap = function(a, b, c, d, e) {
  return new cljs.core.ObjMap(a, b, c, d, e)
};
cljs.core.ObjMap.EMPTY = new cljs.core.ObjMap(null, [], {}, 0, 0);
cljs.core.ObjMap.HASHMAP_THRESHOLD = 8;
cljs.core.ObjMap.fromObject = function(a, b) {
  return new cljs.core.ObjMap(null, a, b, 0, null)
};
cljs.core.array_map_index_of_nil_QMARK_ = function(a) {
  for(var b = a.length, c = 0;;) {
    if(b <= c) {
      return-1
    }
    if(null == a[c]) {
      return c
    }
    c += 2
  }
};
cljs.core.array_map_index_of_symbol_QMARK_ = function(a, b, c) {
  for(var b = a.length, c = c.str, d = 0;;) {
    if(b <= d) {
      return-1
    }
    var e;
    e = a[d];
    var f = e instanceof cljs.core.Symbol;
    e = f ? c === e.str : f;
    if(e) {
      return d
    }
    d += 2
  }
};
cljs.core.array_map_index_of_identical_QMARK_ = function(a, b, c) {
  for(var b = a.length, d = 0;;) {
    if(b <= d) {
      return-1
    }
    if(c === a[d]) {
      return d
    }
    d += 2
  }
};
cljs.core.array_map_index_of_equiv_QMARK_ = function(a, b, c) {
  for(var b = a.length, d = 0;;) {
    if(b <= d) {
      return-1
    }
    if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(c, a[d])) {
      return d
    }
    d += 2
  }
};
cljs.core.array_map_index_of = function(a, b) {
  var c = a.arr;
  var d = goog.isString(b);
  return(d ? d : "number" === typeof b) ? cljs.core.array_map_index_of_identical_QMARK_(c, a, b) : b instanceof cljs.core.Symbol ? cljs.core.array_map_index_of_symbol_QMARK_(c, a, b) : null == b ? cljs.core.array_map_index_of_nil_QMARK_(c, a, b) : cljs.core.array_map_index_of_equiv_QMARK_(c, a, b)
};
cljs.core.array_map_extend_kv = function(a, b, c) {
  for(var a = a.arr, d = a.length, e = Array(d + 2), f = 0;;) {
    if(f < d) {
      e[f] = a[f], f += 1
    }else {
      break
    }
  }
  e[d] = b;
  e[d + 1] = c;
  return e
};
cljs.core.PersistentArrayMapSeq = function(a, b, c) {
  this.arr = a;
  this.i = b;
  this._meta = c;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 31850702
};
cljs.core.PersistentArrayMapSeq.cljs$lang$type = !0;
cljs.core.PersistentArrayMapSeq.cljs$lang$ctorStr = "cljs.core/PersistentArrayMapSeq";
cljs.core.PersistentArrayMapSeq.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write(b, "cljs.core/PersistentArrayMapSeq")
};
cljs.core.PersistentArrayMapSeq.prototype.cljs$core$IHash$_hash$arity$1 = function(a) {
  return cljs.core.hash_coll(a)
};
cljs.core.PersistentArrayMapSeq.prototype.cljs$core$INext$_next$arity$1 = function() {
  return this.i < this.arr.length - 2 ? new cljs.core.PersistentArrayMapSeq(this.arr, this.i + 2, this._meta) : null
};
cljs.core.PersistentArrayMapSeq.prototype.cljs$core$ICollection$_conj$arity$2 = function(a, b) {
  return cljs.core.cons(b, a)
};
cljs.core.PersistentArrayMapSeq.prototype.toString = function() {
  return cljs.core.pr_str_STAR_(this)
};
cljs.core.PersistentArrayMapSeq.prototype.cljs$core$ISeqable$_seq$arity$1 = function(a) {
  return a
};
cljs.core.PersistentArrayMapSeq.prototype.cljs$core$ICounted$_count$arity$1 = function() {
  return(this.arr.length - this.i) / 2
};
cljs.core.PersistentArrayMapSeq.prototype.cljs$core$ISeq$_first$arity$1 = function() {
  return cljs.core.PersistentVector.fromArray([this.arr[this.i], this.arr[this.i + 1]], !0)
};
cljs.core.PersistentArrayMapSeq.prototype.cljs$core$ISeq$_rest$arity$1 = function() {
  return this.i < this.arr.length - 2 ? new cljs.core.PersistentArrayMapSeq(this.arr, this.i + 2, this._meta) : cljs.core.List.EMPTY
};
cljs.core.PersistentArrayMapSeq.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(a, b) {
  return cljs.core.equiv_sequential(a, b)
};
cljs.core.PersistentArrayMapSeq.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(a, b) {
  return new cljs.core.PersistentArrayMapSeq(this.arr, this.i, b)
};
cljs.core.PersistentArrayMapSeq.prototype.cljs$core$IMeta$_meta$arity$1 = function() {
  return this._meta
};
cljs.core.PersistentArrayMapSeq.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function() {
  return cljs.core.with_meta(cljs.core.List.EMPTY, this._meta)
};
cljs.core.__GT_PersistentArrayMapSeq = function(a, b, c) {
  return new cljs.core.PersistentArrayMapSeq(a, b, c)
};
cljs.core.persistent_array_map_seq = function(a, b, c) {
  return b <= a.length - 2 ? new cljs.core.PersistentArrayMapSeq(a, b, c) : null
};
cljs.core.PersistentArrayMap = function(a, b, c, d) {
  this.meta = a;
  this.cnt = b;
  this.arr = c;
  this.__hash = d;
  this.cljs$lang$protocol_mask$partition1$ = 4;
  this.cljs$lang$protocol_mask$partition0$ = 16123663
};
cljs.core.PersistentArrayMap.cljs$lang$type = !0;
cljs.core.PersistentArrayMap.cljs$lang$ctorStr = "cljs.core/PersistentArrayMap";
cljs.core.PersistentArrayMap.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write(b, "cljs.core/PersistentArrayMap")
};
cljs.core.PersistentArrayMap.prototype.cljs$core$IEditableCollection$_as_transient$arity$1 = function() {
  return new cljs.core.TransientArrayMap({}, this.arr.length, this.arr.slice())
};
cljs.core.PersistentArrayMap.prototype.cljs$core$IHash$_hash$arity$1 = function(a) {
  var b = this.__hash;
  return null != b ? b : this.__hash = a = cljs.core.hash_imap(a)
};
cljs.core.PersistentArrayMap.prototype.cljs$core$ILookup$_lookup$arity$2 = function(a, b) {
  return a.cljs$core$ILookup$_lookup$arity$3(a, b, null)
};
cljs.core.PersistentArrayMap.prototype.cljs$core$ILookup$_lookup$arity$3 = function(a, b, c) {
  a = cljs.core.array_map_index_of(a, b);
  return-1 === a ? c : this.arr[a + 1]
};
cljs.core.PersistentArrayMap.prototype.cljs$core$IAssociative$_assoc$arity$3 = function(a, b, c) {
  var d = cljs.core.array_map_index_of(a, b);
  if(-1 === d) {
    return this.cnt < cljs.core.PersistentArrayMap.HASHMAP_THRESHOLD ? (c = cljs.core.array_map_extend_kv(a, b, c), new cljs.core.PersistentArrayMap(this.meta, this.cnt + 1, c, null)) : cljs.core._with_meta(cljs.core._assoc(cljs.core.into(cljs.core.PersistentHashMap.EMPTY, a), b, c), this.meta)
  }
  if(c === this.arr[d + 1]) {
    return a
  }
  a = this.arr.slice();
  a[d + 1] = c;
  return new cljs.core.PersistentArrayMap(this.meta, this.cnt, a, null)
};
cljs.core.PersistentArrayMap.prototype.cljs$core$IAssociative$_contains_key_QMARK_$arity$2 = function(a, b) {
  return-1 !== cljs.core.array_map_index_of(a, b)
};
cljs.core.PersistentArrayMap.prototype.call = function() {
  var a = null;
  return a = function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return this.cljs$core$ILookup$_lookup$arity$2(this, c);
      case 3:
        return this.cljs$core$ILookup$_lookup$arity$3(this, c, d)
    }
    throw Error("Invalid arity: " + arguments.length);
  }
}();
cljs.core.PersistentArrayMap.prototype.apply = function(a, b) {
  a = this;
  return a.call.apply(a, [a].concat(b.slice()))
};
cljs.core.PersistentArrayMap.prototype.cljs$core$IKVReduce$_kv_reduce$arity$3 = function(a, b, c) {
  for(var a = this.arr.length, d = 0;;) {
    if(d < a) {
      c = b.cljs$core$IFn$_invoke$arity$3 ? b.cljs$core$IFn$_invoke$arity$3(c, this.arr[d], this.arr[d + 1]) : b.call(null, c, this.arr[d], this.arr[d + 1]);
      if(cljs.core.reduced_QMARK_(c)) {
        return cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(c) : cljs.core.deref.call(null, c)
      }
      d += 2
    }else {
      return c
    }
  }
};
cljs.core.PersistentArrayMap.prototype.cljs$core$ICollection$_conj$arity$2 = function(a, b) {
  return cljs.core.vector_QMARK_(b) ? a.cljs$core$IAssociative$_assoc$arity$3(a, cljs.core._nth.cljs$core$IFn$_invoke$arity$2(b, 0), cljs.core._nth.cljs$core$IFn$_invoke$arity$2(b, 1)) : cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core._conj, a, b)
};
cljs.core.PersistentArrayMap.prototype.toString = function() {
  return cljs.core.pr_str_STAR_(this)
};
cljs.core.PersistentArrayMap.prototype.cljs$core$ISeqable$_seq$arity$1 = function() {
  return cljs.core.persistent_array_map_seq(this.arr, 0, null)
};
cljs.core.PersistentArrayMap.prototype.cljs$core$ICounted$_count$arity$1 = function() {
  return this.cnt
};
cljs.core.PersistentArrayMap.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(a, b) {
  return cljs.core.equiv_map(a, b)
};
cljs.core.PersistentArrayMap.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(a, b) {
  return new cljs.core.PersistentArrayMap(b, this.cnt, this.arr, this.__hash)
};
cljs.core.PersistentArrayMap.prototype.cljs$core$IMeta$_meta$arity$1 = function() {
  return this.meta
};
cljs.core.PersistentArrayMap.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function() {
  return cljs.core._with_meta(cljs.core.PersistentArrayMap.EMPTY, this.meta)
};
cljs.core.PersistentArrayMap.prototype.cljs$core$IMap$_dissoc$arity$2 = function(a, b) {
  if(0 <= cljs.core.array_map_index_of(a, b)) {
    var c = this.arr.length, d = c - 2;
    if(0 === d) {
      return a.cljs$core$IEmptyableCollection$_empty$arity$1(a)
    }
    for(var d = Array(d), e = 0, f = 0;;) {
      if(e >= c) {
        return new cljs.core.PersistentArrayMap(this.meta, this.cnt - 1, d, null)
      }
      cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(b, this.arr[e]) || (d[f] = this.arr[e], d[f + 1] = this.arr[e + 1], f += 2);
      e += 2
    }
  }else {
    return a
  }
};
cljs.core.__GT_PersistentArrayMap = function(a, b, c, d) {
  return new cljs.core.PersistentArrayMap(a, b, c, d)
};
cljs.core.PersistentArrayMap.EMPTY = new cljs.core.PersistentArrayMap(null, 0, [], null);
cljs.core.PersistentArrayMap.HASHMAP_THRESHOLD = 8;
cljs.core.PersistentArrayMap.fromArray = function(a, b) {
  var c = b ? a : a.slice();
  return new cljs.core.PersistentArrayMap(null, c.length / 2, c, null)
};
cljs.core.TransientArrayMap = function(a, b, c) {
  this.editable_QMARK_ = a;
  this.len = b;
  this.arr = c;
  this.cljs$lang$protocol_mask$partition1$ = 56;
  this.cljs$lang$protocol_mask$partition0$ = 258
};
cljs.core.TransientArrayMap.cljs$lang$type = !0;
cljs.core.TransientArrayMap.cljs$lang$ctorStr = "cljs.core/TransientArrayMap";
cljs.core.TransientArrayMap.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write(b, "cljs.core/TransientArrayMap")
};
cljs.core.TransientArrayMap.prototype.cljs$core$ITransientMap$_dissoc_BANG_$arity$2 = function(a, b) {
  if(cljs.core.truth_(this.editable_QMARK_)) {
    var c = cljs.core.array_map_index_of(a, b);
    0 <= c && (this.arr[c] = this.arr[this.len - 2], this.arr[c + 1] = this.arr[this.len - 1], c = this.arr, c.pop(), c.pop(), this.len -= 2);
    return a
  }
  throw Error("dissoc! after persistent!");
};
cljs.core.TransientArrayMap.prototype.cljs$core$ITransientAssociative$_assoc_BANG_$arity$3 = function(a, b, c) {
  if(cljs.core.truth_(this.editable_QMARK_)) {
    var d = cljs.core.array_map_index_of(a, b);
    if(-1 === d) {
      return this.len + 2 <= 2 * cljs.core.PersistentArrayMap.HASHMAP_THRESHOLD ? (this.len += 2, this.arr.push(b), this.arr.push(c), a) : cljs.core.assoc_BANG_(cljs.core.array__GT_transient_hash_map.cljs$core$IFn$_invoke$arity$2 ? cljs.core.array__GT_transient_hash_map.cljs$core$IFn$_invoke$arity$2(this.len, this.arr) : cljs.core.array__GT_transient_hash_map.call(null, this.len, this.arr), b, c)
    }
    c !== this.arr[d + 1] && (this.arr[d + 1] = c);
    return a
  }
  throw Error("assoc! after persistent!");
};
cljs.core.TransientArrayMap.prototype.cljs$core$ITransientCollection$_conj_BANG_$arity$2 = function(a, b) {
  if(cljs.core.truth_(this.editable_QMARK_)) {
    var c;
    b ? (c = (c = b.cljs$lang$protocol_mask$partition0$ & 2048) ? c : b.cljs$core$IMapEntry$, c = c ? !0 : b.cljs$lang$protocol_mask$partition0$ ? !1 : cljs.core.type_satisfies_(cljs.core.IMapEntry, b)) : c = cljs.core.type_satisfies_(cljs.core.IMapEntry, b);
    if(c) {
      return a.cljs$core$ITransientAssociative$_assoc_BANG_$arity$3(a, cljs.core.key.cljs$core$IFn$_invoke$arity$1 ? cljs.core.key.cljs$core$IFn$_invoke$arity$1(b) : cljs.core.key.call(null, b), cljs.core.val.cljs$core$IFn$_invoke$arity$1 ? cljs.core.val.cljs$core$IFn$_invoke$arity$1(b) : cljs.core.val.call(null, b))
    }
    c = cljs.core.seq(b);
    for(var d = a;;) {
      var e = cljs.core.first(c);
      if(cljs.core.truth_(e)) {
        c = cljs.core.next(c), d = d.cljs$core$ITransientAssociative$_assoc_BANG_$arity$3(d, cljs.core.key.cljs$core$IFn$_invoke$arity$1 ? cljs.core.key.cljs$core$IFn$_invoke$arity$1(e) : cljs.core.key.call(null, e), cljs.core.val.cljs$core$IFn$_invoke$arity$1 ? cljs.core.val.cljs$core$IFn$_invoke$arity$1(e) : cljs.core.val.call(null, e))
      }else {
        return d
      }
    }
  }else {
    throw Error("conj! after persistent!");
  }
};
cljs.core.TransientArrayMap.prototype.cljs$core$ITransientCollection$_persistent_BANG_$arity$1 = function() {
  if(cljs.core.truth_(this.editable_QMARK_)) {
    return this.editable_QMARK_ = !1, new cljs.core.PersistentArrayMap(null, cljs.core.quot(this.len, 2), this.arr, null)
  }
  throw Error("persistent! called twice");
};
cljs.core.TransientArrayMap.prototype.cljs$core$ILookup$_lookup$arity$2 = function(a, b) {
  return a.cljs$core$ILookup$_lookup$arity$3(a, b, null)
};
cljs.core.TransientArrayMap.prototype.cljs$core$ILookup$_lookup$arity$3 = function(a, b, c) {
  if(cljs.core.truth_(this.editable_QMARK_)) {
    return a = cljs.core.array_map_index_of(a, b), -1 === a ? c : this.arr[a + 1]
  }
  throw Error("lookup after persistent!");
};
cljs.core.TransientArrayMap.prototype.cljs$core$ICounted$_count$arity$1 = function() {
  if(cljs.core.truth_(this.editable_QMARK_)) {
    return cljs.core.quot(this.len, 2)
  }
  throw Error("count after persistent!");
};
cljs.core.__GT_TransientArrayMap = function(a, b, c) {
  return new cljs.core.TransientArrayMap(a, b, c)
};
cljs.core.array__GT_transient_hash_map = function(a, b) {
  for(var c = cljs.core.transient$(cljs.core.PersistentHashMap.EMPTY), d = 0;;) {
    if(d < a) {
      c = cljs.core.assoc_BANG_(c, b[d], b[d + 1]), d += 2
    }else {
      return c
    }
  }
};
cljs.core.Box = function(a) {
  this.val = a
};
cljs.core.Box.cljs$lang$type = !0;
cljs.core.Box.cljs$lang$ctorStr = "cljs.core/Box";
cljs.core.Box.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write(b, "cljs.core/Box")
};
cljs.core.__GT_Box = function(a) {
  return new cljs.core.Box(a)
};
cljs.core.key_test = function(a, b) {
  return goog.isString(a) ? a === b : cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(a, b)
};
cljs.core.mask = function(a, b) {
  return a >>> b & 31
};
cljs.core.clone_and_set = function() {
  var a = null, b = function(a, b, c) {
    a = a.slice();
    a[b] = c;
    return a
  }, c = function(a, b, c, g, h) {
    a = a.slice();
    a[b] = c;
    a[g] = h;
    return a
  }, a = function(a, e, f, g, h) {
    switch(arguments.length) {
      case 3:
        return b.call(this, a, e, f);
      case 5:
        return c.call(this, a, e, f, g, h)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$3 = b;
  a.cljs$core$IFn$_invoke$arity$5 = c;
  return a
}();
cljs.core.remove_pair = function(a, b) {
  var c = Array(a.length - 2);
  cljs.core.array_copy(a, 0, c, 0, 2 * b);
  cljs.core.array_copy(a, 2 * (b + 1), c, 2 * b, c.length - 2 * b);
  return c
};
cljs.core.bitmap_indexed_node_index = function(a, b) {
  return cljs.core.bit_count(a & b - 1)
};
cljs.core.bitpos = function(a, b) {
  return 1 << (a >>> b & 31)
};
cljs.core.edit_and_set = function() {
  var a = null, b = function(a, b, c, g) {
    a = a.ensure_editable(b);
    a.arr[c] = g;
    return a
  }, c = function(a, b, c, g, h, i) {
    a = a.ensure_editable(b);
    a.arr[c] = g;
    a.arr[h] = i;
    return a
  }, a = function(a, e, f, g, h, i) {
    switch(arguments.length) {
      case 4:
        return b.call(this, a, e, f, g);
      case 6:
        return c.call(this, a, e, f, g, h, i)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$4 = b;
  a.cljs$core$IFn$_invoke$arity$6 = c;
  return a
}();
cljs.core.inode_kv_reduce = function(a, b, c) {
  for(var d = a.length, e = 0;;) {
    if(e < d) {
      var f = a[e];
      null != f ? c = b.cljs$core$IFn$_invoke$arity$3 ? b.cljs$core$IFn$_invoke$arity$3(c, f, a[e + 1]) : b.call(null, c, f, a[e + 1]) : (f = a[e + 1], c = null != f ? f.kv_reduce(b, c) : c);
      if(cljs.core.reduced_QMARK_(c)) {
        return cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(c) : cljs.core.deref.call(null, c)
      }
      e += 2
    }else {
      return c
    }
  }
};
cljs.core.BitmapIndexedNode = function(a, b, c) {
  this.edit = a;
  this.bitmap = b;
  this.arr = c
};
cljs.core.BitmapIndexedNode.cljs$lang$type = !0;
cljs.core.BitmapIndexedNode.cljs$lang$ctorStr = "cljs.core/BitmapIndexedNode";
cljs.core.BitmapIndexedNode.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write(b, "cljs.core/BitmapIndexedNode")
};
cljs.core.BitmapIndexedNode.prototype.edit_and_remove_pair = function(a, b, c) {
  if(this.bitmap === b) {
    return null
  }
  var a = this.ensure_editable(a), d = a.arr, e = d.length;
  a.bitmap ^= b;
  cljs.core.array_copy(d, 2 * (c + 1), d, 2 * c, e - 2 * (c + 1));
  d[e - 2] = null;
  d[e - 1] = null;
  return a
};
cljs.core.BitmapIndexedNode.prototype.inode_assoc_BANG_ = function(a, b, c, d, e, f) {
  var g = 1 << (c >>> b & 31), h = cljs.core.bitmap_indexed_node_index(this.bitmap, g);
  if(0 === (this.bitmap & g)) {
    var i = cljs.core.bit_count(this.bitmap);
    if(2 * i < this.arr.length) {
      return a = this.ensure_editable(a), b = a.arr, f.val = !0, cljs.core.array_copy_downward(b, 2 * h, b, 2 * (h + 1), 2 * (i - h)), b[2 * h] = d, b[2 * h + 1] = e, a.bitmap |= g, a
    }
    if(16 <= i) {
      h = Array(32);
      h[c >>> b & 31] = cljs.core.BitmapIndexedNode.EMPTY.inode_assoc_BANG_(a, b + 5, c, d, e, f);
      for(e = d = 0;;) {
        if(32 > d) {
          0 !== (this.bitmap >>> d & 1) && (h[d] = null != this.arr[e] ? cljs.core.BitmapIndexedNode.EMPTY.inode_assoc_BANG_(a, b + 5, cljs.core.hash.cljs$core$IFn$_invoke$arity$1(this.arr[e]), this.arr[e], this.arr[e + 1], f) : this.arr[e + 1], e += 2), d += 1
        }else {
          break
        }
      }
      return new cljs.core.ArrayNode(a, i + 1, h)
    }
    b = Array(2 * (i + 4));
    cljs.core.array_copy(this.arr, 0, b, 0, 2 * h);
    b[2 * h] = d;
    b[2 * h + 1] = e;
    cljs.core.array_copy(this.arr, 2 * h, b, 2 * (h + 1), 2 * (i - h));
    f.val = !0;
    a = this.ensure_editable(a);
    a.arr = b;
    a.bitmap |= g;
    return a
  }
  i = this.arr[2 * h];
  g = this.arr[2 * h + 1];
  if(null == i) {
    return i = g.inode_assoc_BANG_(a, b + 5, c, d, e, f), i === g ? this : cljs.core.edit_and_set.cljs$core$IFn$_invoke$arity$4(this, a, 2 * h + 1, i)
  }
  if(cljs.core.key_test(d, i)) {
    return e === g ? this : cljs.core.edit_and_set.cljs$core$IFn$_invoke$arity$4(this, a, 2 * h + 1, e)
  }
  f.val = !0;
  return cljs.core.edit_and_set.cljs$core$IFn$_invoke$arity$6(this, a, 2 * h, null, 2 * h + 1, cljs.core.create_node.cljs$core$IFn$_invoke$arity$7 ? cljs.core.create_node.cljs$core$IFn$_invoke$arity$7(a, b + 5, i, g, c, d, e) : cljs.core.create_node.call(null, a, b + 5, i, g, c, d, e))
};
cljs.core.BitmapIndexedNode.prototype.inode_seq = function() {
  return cljs.core.create_inode_seq.cljs$core$IFn$_invoke$arity$1 ? cljs.core.create_inode_seq.cljs$core$IFn$_invoke$arity$1(this.arr) : cljs.core.create_inode_seq.call(null, this.arr)
};
cljs.core.BitmapIndexedNode.prototype.inode_without_BANG_ = function(a, b, c, d, e) {
  var f = 1 << (c >>> b & 31);
  if(0 === (this.bitmap & f)) {
    return this
  }
  var g = cljs.core.bitmap_indexed_node_index(this.bitmap, f), h = this.arr[2 * g], i = this.arr[2 * g + 1];
  return null == h ? (b = i.inode_without_BANG_(a, b + 5, c, d, e), b === i ? this : null != b ? cljs.core.edit_and_set.cljs$core$IFn$_invoke$arity$4(this, a, 2 * g + 1, b) : this.bitmap === f ? null : this.edit_and_remove_pair(a, f, g)) : cljs.core.key_test(d, h) ? (e[0] = !0, this.edit_and_remove_pair(a, f, g)) : this
};
cljs.core.BitmapIndexedNode.prototype.ensure_editable = function(a) {
  if(a === this.edit) {
    return this
  }
  var b = cljs.core.bit_count(this.bitmap), c = Array(0 > b ? 4 : 2 * (b + 1));
  cljs.core.array_copy(this.arr, 0, c, 0, 2 * b);
  return new cljs.core.BitmapIndexedNode(a, this.bitmap, c)
};
cljs.core.BitmapIndexedNode.prototype.kv_reduce = function(a, b) {
  return cljs.core.inode_kv_reduce(this.arr, a, b)
};
cljs.core.BitmapIndexedNode.prototype.inode_find = function(a, b, c, d) {
  var e = 1 << (b >>> a & 31);
  if(0 === (this.bitmap & e)) {
    return d
  }
  var f = cljs.core.bitmap_indexed_node_index(this.bitmap, e), e = this.arr[2 * f], f = this.arr[2 * f + 1];
  return null == e ? f.inode_find(a + 5, b, c, d) : cljs.core.key_test(c, e) ? cljs.core.PersistentVector.fromArray([e, f], !0) : d
};
cljs.core.BitmapIndexedNode.prototype.inode_without = function(a, b, c) {
  var d = 1 << (b >>> a & 31);
  if(0 === (this.bitmap & d)) {
    return this
  }
  var e = cljs.core.bitmap_indexed_node_index(this.bitmap, d), f = this.arr[2 * e], g = this.arr[2 * e + 1];
  return null == f ? (a = g.inode_without(a + 5, b, c), a === g ? this : null != a ? new cljs.core.BitmapIndexedNode(null, this.bitmap, cljs.core.clone_and_set.cljs$core$IFn$_invoke$arity$3(this.arr, 2 * e + 1, a)) : this.bitmap === d ? null : new cljs.core.BitmapIndexedNode(null, this.bitmap ^ d, cljs.core.remove_pair(this.arr, e))) : cljs.core.key_test(c, f) ? new cljs.core.BitmapIndexedNode(null, this.bitmap ^ d, cljs.core.remove_pair(this.arr, e)) : this
};
cljs.core.BitmapIndexedNode.prototype.inode_assoc = function(a, b, c, d, e) {
  var f = 1 << (b >>> a & 31), g = cljs.core.bitmap_indexed_node_index(this.bitmap, f);
  if(0 === (this.bitmap & f)) {
    var h = cljs.core.bit_count(this.bitmap);
    if(16 <= h) {
      g = Array(32);
      g[b >>> a & 31] = cljs.core.BitmapIndexedNode.EMPTY.inode_assoc(a + 5, b, c, d, e);
      for(d = c = 0;;) {
        if(32 > c) {
          0 !== (this.bitmap >>> c & 1) && (g[c] = null != this.arr[d] ? cljs.core.BitmapIndexedNode.EMPTY.inode_assoc(a + 5, cljs.core.hash.cljs$core$IFn$_invoke$arity$1(this.arr[d]), this.arr[d], this.arr[d + 1], e) : this.arr[d + 1], d += 2), c += 1
        }else {
          break
        }
      }
      return new cljs.core.ArrayNode(null, h + 1, g)
    }
    a = Array(2 * (h + 1));
    cljs.core.array_copy(this.arr, 0, a, 0, 2 * g);
    a[2 * g] = c;
    a[2 * g + 1] = d;
    cljs.core.array_copy(this.arr, 2 * g, a, 2 * (g + 1), 2 * (h - g));
    e.val = !0;
    return new cljs.core.BitmapIndexedNode(null, this.bitmap | f, a)
  }
  h = this.arr[2 * g];
  f = this.arr[2 * g + 1];
  if(null == h) {
    return h = f.inode_assoc(a + 5, b, c, d, e), h === f ? this : new cljs.core.BitmapIndexedNode(null, this.bitmap, cljs.core.clone_and_set.cljs$core$IFn$_invoke$arity$3(this.arr, 2 * g + 1, h))
  }
  if(cljs.core.key_test(c, h)) {
    return d === f ? this : new cljs.core.BitmapIndexedNode(null, this.bitmap, cljs.core.clone_and_set.cljs$core$IFn$_invoke$arity$3(this.arr, 2 * g + 1, d))
  }
  e.val = !0;
  return new cljs.core.BitmapIndexedNode(null, this.bitmap, cljs.core.clone_and_set.cljs$core$IFn$_invoke$arity$5(this.arr, 2 * g, null, 2 * g + 1, cljs.core.create_node.cljs$core$IFn$_invoke$arity$6 ? cljs.core.create_node.cljs$core$IFn$_invoke$arity$6(a + 5, h, f, b, c, d) : cljs.core.create_node.call(null, a + 5, h, f, b, c, d)))
};
cljs.core.BitmapIndexedNode.prototype.inode_lookup = function(a, b, c, d) {
  var e = 1 << (b >>> a & 31);
  if(0 === (this.bitmap & e)) {
    return d
  }
  var f = cljs.core.bitmap_indexed_node_index(this.bitmap, e), e = this.arr[2 * f], f = this.arr[2 * f + 1];
  return null == e ? f.inode_lookup(a + 5, b, c, d) : cljs.core.key_test(c, e) ? f : d
};
cljs.core.__GT_BitmapIndexedNode = function(a, b, c) {
  return new cljs.core.BitmapIndexedNode(a, b, c)
};
cljs.core.BitmapIndexedNode.EMPTY = new cljs.core.BitmapIndexedNode(null, 0, []);
cljs.core.pack_array_node = function(a, b, c) {
  for(var d = a.arr, a = 2 * (a.cnt - 1), e = Array(a), f = 0, g = 1, h = 0;;) {
    if(f < a) {
      var i;
      i = (i = f !== c) ? null != d[f] : i;
      i && (e[g] = d[f], g += 2, h |= 1 << f);
      f += 1
    }else {
      return new cljs.core.BitmapIndexedNode(b, h, e)
    }
  }
};
cljs.core.ArrayNode = function(a, b, c) {
  this.edit = a;
  this.cnt = b;
  this.arr = c
};
cljs.core.ArrayNode.cljs$lang$type = !0;
cljs.core.ArrayNode.cljs$lang$ctorStr = "cljs.core/ArrayNode";
cljs.core.ArrayNode.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write(b, "cljs.core/ArrayNode")
};
cljs.core.ArrayNode.prototype.inode_assoc_BANG_ = function(a, b, c, d, e, f) {
  var g = c >>> b & 31, h = this.arr[g];
  if(null == h) {
    return a = cljs.core.edit_and_set.cljs$core$IFn$_invoke$arity$4(this, a, g, cljs.core.BitmapIndexedNode.EMPTY.inode_assoc_BANG_(a, b + 5, c, d, e, f)), a.cnt += 1, a
  }
  b = h.inode_assoc_BANG_(a, b + 5, c, d, e, f);
  return b === h ? this : cljs.core.edit_and_set.cljs$core$IFn$_invoke$arity$4(this, a, g, b)
};
cljs.core.ArrayNode.prototype.inode_seq = function() {
  return cljs.core.create_array_node_seq.cljs$core$IFn$_invoke$arity$1 ? cljs.core.create_array_node_seq.cljs$core$IFn$_invoke$arity$1(this.arr) : cljs.core.create_array_node_seq.call(null, this.arr)
};
cljs.core.ArrayNode.prototype.inode_without_BANG_ = function(a, b, c, d, e) {
  var f = c >>> b & 31, g = this.arr[f];
  if(null == g) {
    return this
  }
  b = g.inode_without_BANG_(a, b + 5, c, d, e);
  if(b === g) {
    return this
  }
  if(null == b) {
    if(8 >= this.cnt) {
      return cljs.core.pack_array_node(this, a, f)
    }
    a = cljs.core.edit_and_set.cljs$core$IFn$_invoke$arity$4(this, a, f, b);
    a.cnt -= 1;
    return a
  }
  return cljs.core.edit_and_set.cljs$core$IFn$_invoke$arity$4(this, a, f, b)
};
cljs.core.ArrayNode.prototype.ensure_editable = function(a) {
  return a === this.edit ? this : new cljs.core.ArrayNode(a, this.cnt, this.arr.slice())
};
cljs.core.ArrayNode.prototype.kv_reduce = function(a, b) {
  for(var c = this.arr.length, d = 0, e = b;;) {
    if(d < c) {
      var f = this.arr[d];
      if(null != f && (e = f.kv_reduce(a, e), cljs.core.reduced_QMARK_(e))) {
        return cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(e) : cljs.core.deref.call(null, e)
      }
      d += 1
    }else {
      return e
    }
  }
};
cljs.core.ArrayNode.prototype.inode_find = function(a, b, c, d) {
  var e = this.arr[b >>> a & 31];
  return null != e ? e.inode_find(a + 5, b, c, d) : d
};
cljs.core.ArrayNode.prototype.inode_without = function(a, b, c) {
  var d = b >>> a & 31, e = this.arr[d];
  return null != e ? (a = e.inode_without(a + 5, b, c), a === e ? this : null == a ? 8 >= this.cnt ? cljs.core.pack_array_node(this, null, d) : new cljs.core.ArrayNode(null, this.cnt - 1, cljs.core.clone_and_set.cljs$core$IFn$_invoke$arity$3(this.arr, d, a)) : new cljs.core.ArrayNode(null, this.cnt, cljs.core.clone_and_set.cljs$core$IFn$_invoke$arity$3(this.arr, d, a))) : this
};
cljs.core.ArrayNode.prototype.inode_assoc = function(a, b, c, d, e) {
  var f = b >>> a & 31, g = this.arr[f];
  if(null == g) {
    return new cljs.core.ArrayNode(null, this.cnt + 1, cljs.core.clone_and_set.cljs$core$IFn$_invoke$arity$3(this.arr, f, cljs.core.BitmapIndexedNode.EMPTY.inode_assoc(a + 5, b, c, d, e)))
  }
  a = g.inode_assoc(a + 5, b, c, d, e);
  return a === g ? this : new cljs.core.ArrayNode(null, this.cnt, cljs.core.clone_and_set.cljs$core$IFn$_invoke$arity$3(this.arr, f, a))
};
cljs.core.ArrayNode.prototype.inode_lookup = function(a, b, c, d) {
  var e = this.arr[b >>> a & 31];
  return null != e ? e.inode_lookup(a + 5, b, c, d) : d
};
cljs.core.__GT_ArrayNode = function(a, b, c) {
  return new cljs.core.ArrayNode(a, b, c)
};
cljs.core.hash_collision_node_find_index = function(a, b, c) {
  for(var b = 2 * b, d = 0;;) {
    if(d < b) {
      if(cljs.core.key_test(c, a[d])) {
        return d
      }
      d += 2
    }else {
      return-1
    }
  }
};
cljs.core.HashCollisionNode = function(a, b, c, d) {
  this.edit = a;
  this.collision_hash = b;
  this.cnt = c;
  this.arr = d
};
cljs.core.HashCollisionNode.cljs$lang$type = !0;
cljs.core.HashCollisionNode.cljs$lang$ctorStr = "cljs.core/HashCollisionNode";
cljs.core.HashCollisionNode.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write(b, "cljs.core/HashCollisionNode")
};
cljs.core.HashCollisionNode.prototype.inode_assoc_BANG_ = function(a, b, c, d, e, f) {
  if(c === this.collision_hash) {
    b = cljs.core.hash_collision_node_find_index(this.arr, this.cnt, d);
    if(-1 === b) {
      if(this.arr.length > 2 * this.cnt) {
        return a = cljs.core.edit_and_set.cljs$core$IFn$_invoke$arity$6(this, a, 2 * this.cnt, d, 2 * this.cnt + 1, e), f.val = !0, a.cnt += 1, a
      }
      b = this.arr.length;
      c = Array(b + 2);
      cljs.core.array_copy(this.arr, 0, c, 0, b);
      c[b] = d;
      c[b + 1] = e;
      f.val = !0;
      return this.ensure_editable_array(a, this.cnt + 1, c)
    }
    return this.arr[b + 1] === e ? this : cljs.core.edit_and_set.cljs$core$IFn$_invoke$arity$4(this, a, b + 1, e)
  }
  return(new cljs.core.BitmapIndexedNode(a, 1 << (this.collision_hash >>> b & 31), [null, this, null, null])).inode_assoc_BANG_(a, b, c, d, e, f)
};
cljs.core.HashCollisionNode.prototype.inode_seq = function() {
  return cljs.core.create_inode_seq.cljs$core$IFn$_invoke$arity$1 ? cljs.core.create_inode_seq.cljs$core$IFn$_invoke$arity$1(this.arr) : cljs.core.create_inode_seq.call(null, this.arr)
};
cljs.core.HashCollisionNode.prototype.inode_without_BANG_ = function(a, b, c, d, e) {
  b = cljs.core.hash_collision_node_find_index(this.arr, this.cnt, d);
  if(-1 === b) {
    return this
  }
  e[0] = !0;
  if(1 === this.cnt) {
    return null
  }
  a = this.ensure_editable(a);
  e = a.arr;
  e[b] = e[2 * this.cnt - 2];
  e[b + 1] = e[2 * this.cnt - 1];
  e[2 * this.cnt - 1] = null;
  e[2 * this.cnt - 2] = null;
  a.cnt -= 1;
  return a
};
cljs.core.HashCollisionNode.prototype.ensure_editable = function(a) {
  if(a === this.edit) {
    return this
  }
  var b = Array(2 * (this.cnt + 1));
  cljs.core.array_copy(this.arr, 0, b, 0, 2 * this.cnt);
  return new cljs.core.HashCollisionNode(a, this.collision_hash, this.cnt, b)
};
cljs.core.HashCollisionNode.prototype.kv_reduce = function(a, b) {
  return cljs.core.inode_kv_reduce(this.arr, a, b)
};
cljs.core.HashCollisionNode.prototype.inode_find = function(a, b, c, d) {
  a = cljs.core.hash_collision_node_find_index(this.arr, this.cnt, c);
  return 0 > a ? d : cljs.core.key_test(c, this.arr[a]) ? cljs.core.PersistentVector.fromArray([this.arr[a], this.arr[a + 1]], !0) : d
};
cljs.core.HashCollisionNode.prototype.inode_without = function(a, b, c) {
  a = cljs.core.hash_collision_node_find_index(this.arr, this.cnt, c);
  return-1 === a ? this : 1 === this.cnt ? null : new cljs.core.HashCollisionNode(null, this.collision_hash, this.cnt - 1, cljs.core.remove_pair(this.arr, cljs.core.quot(a, 2)))
};
cljs.core.HashCollisionNode.prototype.inode_assoc = function(a, b, c, d, e) {
  return b === this.collision_hash ? (a = cljs.core.hash_collision_node_find_index(this.arr, this.cnt, c), -1 === a ? (a = this.arr.length, b = Array(a + 2), cljs.core.array_copy(this.arr, 0, b, 0, a), b[a] = c, b[a + 1] = d, e.val = !0, new cljs.core.HashCollisionNode(null, this.collision_hash, this.cnt + 1, b)) : cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this.arr[a], d) ? this : new cljs.core.HashCollisionNode(null, this.collision_hash, this.cnt, cljs.core.clone_and_set.cljs$core$IFn$_invoke$arity$3(this.arr, 
  a + 1, d))) : (new cljs.core.BitmapIndexedNode(null, 1 << (this.collision_hash >>> a & 31), [null, this])).inode_assoc(a, b, c, d, e)
};
cljs.core.HashCollisionNode.prototype.inode_lookup = function(a, b, c, d) {
  a = cljs.core.hash_collision_node_find_index(this.arr, this.cnt, c);
  return 0 > a ? d : cljs.core.key_test(c, this.arr[a]) ? this.arr[a + 1] : d
};
cljs.core.HashCollisionNode.prototype.ensure_editable_array = function(a, b, c) {
  return a === this.edit ? (this.arr = c, this.cnt = b, this) : new cljs.core.HashCollisionNode(this.edit, this.collision_hash, b, c)
};
cljs.core.__GT_HashCollisionNode = function(a, b, c, d) {
  return new cljs.core.HashCollisionNode(a, b, c, d)
};
cljs.core.create_node = function() {
  var a = null, b = function(a, b, c, g, h, i) {
    var j = cljs.core.hash.cljs$core$IFn$_invoke$arity$1(b);
    if(j === g) {
      return new cljs.core.HashCollisionNode(null, j, 2, [b, c, h, i])
    }
    var k = new cljs.core.Box(!1);
    return cljs.core.BitmapIndexedNode.EMPTY.inode_assoc(a, j, b, c, k).inode_assoc(a, g, h, i, k)
  }, c = function(a, b, c, g, h, i, j) {
    var k = cljs.core.hash.cljs$core$IFn$_invoke$arity$1(c);
    if(k === h) {
      return new cljs.core.HashCollisionNode(null, k, 2, [c, g, i, j])
    }
    var m = new cljs.core.Box(!1);
    return cljs.core.BitmapIndexedNode.EMPTY.inode_assoc_BANG_(a, b, k, c, g, m).inode_assoc_BANG_(a, b, h, i, j, m)
  }, a = function(a, e, f, g, h, i, j) {
    switch(arguments.length) {
      case 6:
        return b.call(this, a, e, f, g, h, i);
      case 7:
        return c.call(this, a, e, f, g, h, i, j)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$6 = b;
  a.cljs$core$IFn$_invoke$arity$7 = c;
  return a
}();
cljs.core.NodeSeq = function(a, b, c, d, e) {
  this.meta = a;
  this.nodes = b;
  this.i = c;
  this.s = d;
  this.__hash = e;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 31850572
};
cljs.core.NodeSeq.cljs$lang$type = !0;
cljs.core.NodeSeq.cljs$lang$ctorStr = "cljs.core/NodeSeq";
cljs.core.NodeSeq.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write(b, "cljs.core/NodeSeq")
};
cljs.core.NodeSeq.prototype.cljs$core$IHash$_hash$arity$1 = function(a) {
  var b = this.__hash;
  return null != b ? b : this.__hash = a = cljs.core.hash_coll(a)
};
cljs.core.NodeSeq.prototype.cljs$core$ICollection$_conj$arity$2 = function(a, b) {
  return cljs.core.cons(b, a)
};
cljs.core.NodeSeq.prototype.toString = function() {
  return cljs.core.pr_str_STAR_(this)
};
cljs.core.NodeSeq.prototype.cljs$core$ISeqable$_seq$arity$1 = function(a) {
  return a
};
cljs.core.NodeSeq.prototype.cljs$core$ISeq$_first$arity$1 = function() {
  return null == this.s ? cljs.core.PersistentVector.fromArray([this.nodes[this.i], this.nodes[this.i + 1]], !0) : cljs.core.first(this.s)
};
cljs.core.NodeSeq.prototype.cljs$core$ISeq$_rest$arity$1 = function() {
  return null == this.s ? cljs.core.create_inode_seq.cljs$core$IFn$_invoke$arity$3 ? cljs.core.create_inode_seq.cljs$core$IFn$_invoke$arity$3(this.nodes, this.i + 2, null) : cljs.core.create_inode_seq.call(null, this.nodes, this.i + 2, null) : cljs.core.create_inode_seq.cljs$core$IFn$_invoke$arity$3 ? cljs.core.create_inode_seq.cljs$core$IFn$_invoke$arity$3(this.nodes, this.i, cljs.core.next(this.s)) : cljs.core.create_inode_seq.call(null, this.nodes, this.i, cljs.core.next(this.s))
};
cljs.core.NodeSeq.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(a, b) {
  return cljs.core.equiv_sequential(a, b)
};
cljs.core.NodeSeq.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(a, b) {
  return new cljs.core.NodeSeq(b, this.nodes, this.i, this.s, this.__hash)
};
cljs.core.NodeSeq.prototype.cljs$core$IMeta$_meta$arity$1 = function() {
  return this.meta
};
cljs.core.NodeSeq.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function() {
  return cljs.core.with_meta(cljs.core.List.EMPTY, this.meta)
};
cljs.core.__GT_NodeSeq = function(a, b, c, d, e) {
  return new cljs.core.NodeSeq(a, b, c, d, e)
};
cljs.core.create_inode_seq = function() {
  var a = null, b = function(b) {
    return a.cljs$core$IFn$_invoke$arity$3(b, 0, null)
  }, c = function(a, b, c) {
    if(null == c) {
      for(c = a.length;;) {
        if(b < c) {
          if(null != a[b]) {
            return new cljs.core.NodeSeq(null, a, b, null, null)
          }
          var g = a[b + 1];
          if(cljs.core.truth_(g) && (g = g.inode_seq(), cljs.core.truth_(g))) {
            return new cljs.core.NodeSeq(null, a, b + 2, g, null)
          }
          b += 2
        }else {
          return null
        }
      }
    }else {
      return new cljs.core.NodeSeq(null, a, b, c, null)
    }
  }, a = function(a, e, f) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 3:
        return c.call(this, a, e, f)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$3 = c;
  return a
}();
cljs.core.ArrayNodeSeq = function(a, b, c, d, e) {
  this.meta = a;
  this.nodes = b;
  this.i = c;
  this.s = d;
  this.__hash = e;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 31850572
};
cljs.core.ArrayNodeSeq.cljs$lang$type = !0;
cljs.core.ArrayNodeSeq.cljs$lang$ctorStr = "cljs.core/ArrayNodeSeq";
cljs.core.ArrayNodeSeq.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write(b, "cljs.core/ArrayNodeSeq")
};
cljs.core.ArrayNodeSeq.prototype.cljs$core$IHash$_hash$arity$1 = function(a) {
  var b = this.__hash;
  return null != b ? b : this.__hash = a = cljs.core.hash_coll(a)
};
cljs.core.ArrayNodeSeq.prototype.cljs$core$ICollection$_conj$arity$2 = function(a, b) {
  return cljs.core.cons(b, a)
};
cljs.core.ArrayNodeSeq.prototype.toString = function() {
  return cljs.core.pr_str_STAR_(this)
};
cljs.core.ArrayNodeSeq.prototype.cljs$core$ISeqable$_seq$arity$1 = function(a) {
  return a
};
cljs.core.ArrayNodeSeq.prototype.cljs$core$ISeq$_first$arity$1 = function() {
  return cljs.core.first(this.s)
};
cljs.core.ArrayNodeSeq.prototype.cljs$core$ISeq$_rest$arity$1 = function() {
  return cljs.core.create_array_node_seq.cljs$core$IFn$_invoke$arity$4 ? cljs.core.create_array_node_seq.cljs$core$IFn$_invoke$arity$4(null, this.nodes, this.i, cljs.core.next(this.s)) : cljs.core.create_array_node_seq.call(null, null, this.nodes, this.i, cljs.core.next(this.s))
};
cljs.core.ArrayNodeSeq.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(a, b) {
  return cljs.core.equiv_sequential(a, b)
};
cljs.core.ArrayNodeSeq.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(a, b) {
  return new cljs.core.ArrayNodeSeq(b, this.nodes, this.i, this.s, this.__hash)
};
cljs.core.ArrayNodeSeq.prototype.cljs$core$IMeta$_meta$arity$1 = function() {
  return this.meta
};
cljs.core.ArrayNodeSeq.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function() {
  return cljs.core.with_meta(cljs.core.List.EMPTY, this.meta)
};
cljs.core.__GT_ArrayNodeSeq = function(a, b, c, d, e) {
  return new cljs.core.ArrayNodeSeq(a, b, c, d, e)
};
cljs.core.create_array_node_seq = function() {
  var a = null, b = function(b) {
    return a.cljs$core$IFn$_invoke$arity$4(null, b, 0, null)
  }, c = function(a, b, c, g) {
    if(null == g) {
      for(g = b.length;;) {
        if(c < g) {
          var h = b[c];
          if(cljs.core.truth_(h) && (h = h.inode_seq(), cljs.core.truth_(h))) {
            return new cljs.core.ArrayNodeSeq(a, b, c + 1, h, null)
          }
          c += 1
        }else {
          return null
        }
      }
    }else {
      return new cljs.core.ArrayNodeSeq(a, b, c, g, null)
    }
  }, a = function(a, e, f, g) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 4:
        return c.call(this, a, e, f, g)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$4 = c;
  return a
}();
cljs.core.PersistentHashMap = function(a, b, c, d, e, f) {
  this.meta = a;
  this.cnt = b;
  this.root = c;
  this.has_nil_QMARK_ = d;
  this.nil_val = e;
  this.__hash = f;
  this.cljs$lang$protocol_mask$partition1$ = 4;
  this.cljs$lang$protocol_mask$partition0$ = 16123663
};
cljs.core.PersistentHashMap.cljs$lang$type = !0;
cljs.core.PersistentHashMap.cljs$lang$ctorStr = "cljs.core/PersistentHashMap";
cljs.core.PersistentHashMap.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write(b, "cljs.core/PersistentHashMap")
};
cljs.core.PersistentHashMap.prototype.cljs$core$IEditableCollection$_as_transient$arity$1 = function() {
  return new cljs.core.TransientHashMap({}, this.root, this.cnt, this.has_nil_QMARK_, this.nil_val)
};
cljs.core.PersistentHashMap.prototype.cljs$core$IHash$_hash$arity$1 = function(a) {
  var b = this.__hash;
  return null != b ? b : this.__hash = a = cljs.core.hash_imap(a)
};
cljs.core.PersistentHashMap.prototype.cljs$core$ILookup$_lookup$arity$2 = function(a, b) {
  return a.cljs$core$ILookup$_lookup$arity$3(a, b, null)
};
cljs.core.PersistentHashMap.prototype.cljs$core$ILookup$_lookup$arity$3 = function(a, b, c) {
  return null == b ? this.has_nil_QMARK_ ? this.nil_val : c : null == this.root ? c : this.root.inode_lookup(0, cljs.core.hash.cljs$core$IFn$_invoke$arity$1(b), b, c)
};
cljs.core.PersistentHashMap.prototype.cljs$core$IAssociative$_assoc$arity$3 = function(a, b, c) {
  if(null == b) {
    var d;
    d = (d = this.has_nil_QMARK_) ? c === this.nil_val : d;
    return d ? a : new cljs.core.PersistentHashMap(this.meta, this.has_nil_QMARK_ ? this.cnt : this.cnt + 1, this.root, !0, c, null)
  }
  d = new cljs.core.Box(!1);
  c = (null == this.root ? cljs.core.BitmapIndexedNode.EMPTY : this.root).inode_assoc(0, cljs.core.hash.cljs$core$IFn$_invoke$arity$1(b), b, c, d);
  return c === this.root ? a : new cljs.core.PersistentHashMap(this.meta, d.val ? this.cnt + 1 : this.cnt, c, this.has_nil_QMARK_, this.nil_val, null)
};
cljs.core.PersistentHashMap.prototype.cljs$core$IAssociative$_contains_key_QMARK_$arity$2 = function(a, b) {
  return null == b ? this.has_nil_QMARK_ : null == this.root ? !1 : this.root.inode_lookup(0, cljs.core.hash.cljs$core$IFn$_invoke$arity$1(b), b, cljs.core.lookup_sentinel) !== cljs.core.lookup_sentinel
};
cljs.core.PersistentHashMap.prototype.call = function() {
  var a = null;
  return a = function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return this.cljs$core$ILookup$_lookup$arity$2(this, c);
      case 3:
        return this.cljs$core$ILookup$_lookup$arity$3(this, c, d)
    }
    throw Error("Invalid arity: " + arguments.length);
  }
}();
cljs.core.PersistentHashMap.prototype.apply = function(a, b) {
  a = this;
  return a.call.apply(a, [a].concat(b.slice()))
};
cljs.core.PersistentHashMap.prototype.cljs$core$IKVReduce$_kv_reduce$arity$3 = function(a, b, c) {
  a = this.has_nil_QMARK_ ? b.cljs$core$IFn$_invoke$arity$3 ? b.cljs$core$IFn$_invoke$arity$3(c, null, this.nil_val) : b.call(null, c, null, this.nil_val) : c;
  return cljs.core.reduced_QMARK_(a) ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(a) : cljs.core.deref.call(null, a) : null != this.root ? this.root.kv_reduce(b, a) : a
};
cljs.core.PersistentHashMap.prototype.cljs$core$ICollection$_conj$arity$2 = function(a, b) {
  return cljs.core.vector_QMARK_(b) ? a.cljs$core$IAssociative$_assoc$arity$3(a, cljs.core._nth.cljs$core$IFn$_invoke$arity$2(b, 0), cljs.core._nth.cljs$core$IFn$_invoke$arity$2(b, 1)) : cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core._conj, a, b)
};
cljs.core.PersistentHashMap.prototype.toString = function() {
  return cljs.core.pr_str_STAR_(this)
};
cljs.core.PersistentHashMap.prototype.cljs$core$ISeqable$_seq$arity$1 = function() {
  if(0 < this.cnt) {
    var a = null != this.root ? this.root.inode_seq() : null;
    return this.has_nil_QMARK_ ? cljs.core.cons(cljs.core.PersistentVector.fromArray([null, this.nil_val], !0), a) : a
  }
  return null
};
cljs.core.PersistentHashMap.prototype.cljs$core$ICounted$_count$arity$1 = function() {
  return this.cnt
};
cljs.core.PersistentHashMap.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(a, b) {
  return cljs.core.equiv_map(a, b)
};
cljs.core.PersistentHashMap.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(a, b) {
  return new cljs.core.PersistentHashMap(b, this.cnt, this.root, this.has_nil_QMARK_, this.nil_val, this.__hash)
};
cljs.core.PersistentHashMap.prototype.cljs$core$IMeta$_meta$arity$1 = function() {
  return this.meta
};
cljs.core.PersistentHashMap.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function() {
  return cljs.core._with_meta(cljs.core.PersistentHashMap.EMPTY, this.meta)
};
cljs.core.PersistentHashMap.prototype.cljs$core$IMap$_dissoc$arity$2 = function(a, b) {
  if(null == b) {
    return this.has_nil_QMARK_ ? new cljs.core.PersistentHashMap(this.meta, this.cnt - 1, this.root, !1, null, null) : a
  }
  if(null == this.root) {
    return a
  }
  var c = this.root.inode_without(0, cljs.core.hash.cljs$core$IFn$_invoke$arity$1(b), b);
  return c === this.root ? a : new cljs.core.PersistentHashMap(this.meta, this.cnt - 1, c, this.has_nil_QMARK_, this.nil_val, null)
};
cljs.core.__GT_PersistentHashMap = function(a, b, c, d, e, f) {
  return new cljs.core.PersistentHashMap(a, b, c, d, e, f)
};
cljs.core.PersistentHashMap.EMPTY = new cljs.core.PersistentHashMap(null, 0, null, !1, null, 0);
cljs.core.PersistentHashMap.fromArrays = function(a, b) {
  for(var c = a.length, d = 0, e = cljs.core.transient$(cljs.core.PersistentHashMap.EMPTY);;) {
    if(d < c) {
      var f = d + 1, e = cljs.core.assoc_BANG_(e, a[d], b[d]), d = f
    }else {
      return cljs.core.persistent_BANG_(e)
    }
  }
};
cljs.core.TransientHashMap = function(a, b, c, d, e) {
  this.edit = a;
  this.root = b;
  this.count = c;
  this.has_nil_QMARK_ = d;
  this.nil_val = e;
  this.cljs$lang$protocol_mask$partition1$ = 56;
  this.cljs$lang$protocol_mask$partition0$ = 258
};
cljs.core.TransientHashMap.cljs$lang$type = !0;
cljs.core.TransientHashMap.cljs$lang$ctorStr = "cljs.core/TransientHashMap";
cljs.core.TransientHashMap.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write(b, "cljs.core/TransientHashMap")
};
cljs.core.TransientHashMap.prototype.cljs$core$ITransientMap$_dissoc_BANG_$arity$2 = function(a, b) {
  return a.without_BANG_(b)
};
cljs.core.TransientHashMap.prototype.cljs$core$ITransientAssociative$_assoc_BANG_$arity$3 = function(a, b, c) {
  return a.assoc_BANG_(b, c)
};
cljs.core.TransientHashMap.prototype.cljs$core$ITransientCollection$_conj_BANG_$arity$2 = function(a, b) {
  return a.conj_BANG_(b)
};
cljs.core.TransientHashMap.prototype.cljs$core$ITransientCollection$_persistent_BANG_$arity$1 = function(a) {
  return a.persistent_BANG_()
};
cljs.core.TransientHashMap.prototype.cljs$core$ILookup$_lookup$arity$2 = function(a, b) {
  return null == b ? this.has_nil_QMARK_ ? this.nil_val : null : null == this.root ? null : this.root.inode_lookup(0, cljs.core.hash.cljs$core$IFn$_invoke$arity$1(b), b)
};
cljs.core.TransientHashMap.prototype.cljs$core$ILookup$_lookup$arity$3 = function(a, b, c) {
  return null == b ? this.has_nil_QMARK_ ? this.nil_val : c : null == this.root ? c : this.root.inode_lookup(0, cljs.core.hash.cljs$core$IFn$_invoke$arity$1(b), b, c)
};
cljs.core.TransientHashMap.prototype.cljs$core$ICounted$_count$arity$1 = function() {
  if(this.edit) {
    return this.count
  }
  throw Error("count after persistent!");
};
cljs.core.TransientHashMap.prototype.conj_BANG_ = function(a) {
  if(this.edit) {
    var b;
    a ? (b = (b = a.cljs$lang$protocol_mask$partition0$ & 2048) ? b : a.cljs$core$IMapEntry$, b = b ? !0 : a.cljs$lang$protocol_mask$partition0$ ? !1 : cljs.core.type_satisfies_(cljs.core.IMapEntry, a)) : b = cljs.core.type_satisfies_(cljs.core.IMapEntry, a);
    if(b) {
      return this.assoc_BANG_(cljs.core.key.cljs$core$IFn$_invoke$arity$1 ? cljs.core.key.cljs$core$IFn$_invoke$arity$1(a) : cljs.core.key.call(null, a), cljs.core.val.cljs$core$IFn$_invoke$arity$1 ? cljs.core.val.cljs$core$IFn$_invoke$arity$1(a) : cljs.core.val.call(null, a))
    }
    a = cljs.core.seq(a);
    for(b = this;;) {
      var c = cljs.core.first(a);
      if(cljs.core.truth_(c)) {
        a = cljs.core.next(a), b = b.assoc_BANG_(cljs.core.key.cljs$core$IFn$_invoke$arity$1 ? cljs.core.key.cljs$core$IFn$_invoke$arity$1(c) : cljs.core.key.call(null, c), cljs.core.val.cljs$core$IFn$_invoke$arity$1 ? cljs.core.val.cljs$core$IFn$_invoke$arity$1(c) : cljs.core.val.call(null, c))
      }else {
        return b
      }
    }
  }else {
    throw Error("conj! after persistent");
  }
};
cljs.core.TransientHashMap.prototype.assoc_BANG_ = function(a, b) {
  if(this.edit) {
    if(null == a) {
      this.nil_val !== b && (this.nil_val = b), this.has_nil_QMARK_ || (this.count += 1, this.has_nil_QMARK_ = !0)
    }else {
      var c = new cljs.core.Box(!1), d = (null == this.root ? cljs.core.BitmapIndexedNode.EMPTY : this.root).inode_assoc_BANG_(this.edit, 0, cljs.core.hash.cljs$core$IFn$_invoke$arity$1(a), a, b, c);
      d !== this.root && (this.root = d);
      c.val && (this.count += 1)
    }
    return this
  }
  throw Error("assoc! after persistent!");
};
cljs.core.TransientHashMap.prototype.without_BANG_ = function(a) {
  if(this.edit) {
    if(null == a) {
      this.has_nil_QMARK_ && (this.has_nil_QMARK_ = !1, this.nil_val = null, this.count -= 1)
    }else {
      if(null != this.root) {
        var b = new cljs.core.Box(!1), a = this.root.inode_without_BANG_(this.edit, 0, cljs.core.hash.cljs$core$IFn$_invoke$arity$1(a), a, b);
        a !== this.root && (this.root = a);
        cljs.core.truth_(b[0]) && (this.count -= 1)
      }
    }
    return this
  }
  throw Error("dissoc! after persistent!");
};
cljs.core.TransientHashMap.prototype.persistent_BANG_ = function() {
  if(this.edit) {
    return this.edit = null, new cljs.core.PersistentHashMap(null, this.count, this.root, this.has_nil_QMARK_, this.nil_val, null)
  }
  throw Error("persistent! called twice");
};
cljs.core.__GT_TransientHashMap = function(a, b, c, d, e) {
  return new cljs.core.TransientHashMap(a, b, c, d, e)
};
cljs.core.tree_map_seq_push = function(a, b, c) {
  for(var d = b;;) {
    if(null != a) {
      b = c ? a.left : a.right, d = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(d, a), a = b
    }else {
      return d
    }
  }
};
cljs.core.PersistentTreeMapSeq = function(a, b, c, d, e) {
  this.meta = a;
  this.stack = b;
  this.ascending_QMARK_ = c;
  this.cnt = d;
  this.__hash = e;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 31850574
};
cljs.core.PersistentTreeMapSeq.cljs$lang$type = !0;
cljs.core.PersistentTreeMapSeq.cljs$lang$ctorStr = "cljs.core/PersistentTreeMapSeq";
cljs.core.PersistentTreeMapSeq.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write(b, "cljs.core/PersistentTreeMapSeq")
};
cljs.core.PersistentTreeMapSeq.prototype.cljs$core$IHash$_hash$arity$1 = function(a) {
  var b = this.__hash;
  return null != b ? b : this.__hash = a = cljs.core.hash_coll(a)
};
cljs.core.PersistentTreeMapSeq.prototype.cljs$core$ICollection$_conj$arity$2 = function(a, b) {
  return cljs.core.cons(b, a)
};
cljs.core.PersistentTreeMapSeq.prototype.toString = function() {
  return cljs.core.pr_str_STAR_(this)
};
cljs.core.PersistentTreeMapSeq.prototype.cljs$core$ISeqable$_seq$arity$1 = function(a) {
  return a
};
cljs.core.PersistentTreeMapSeq.prototype.cljs$core$ICounted$_count$arity$1 = function(a) {
  return 0 > this.cnt ? cljs.core.count(cljs.core.next(a)) + 1 : this.cnt
};
cljs.core.PersistentTreeMapSeq.prototype.cljs$core$ISeq$_first$arity$1 = function() {
  return cljs.core.peek(this.stack)
};
cljs.core.PersistentTreeMapSeq.prototype.cljs$core$ISeq$_rest$arity$1 = function() {
  var a = cljs.core.first(this.stack), a = cljs.core.tree_map_seq_push(this.ascending_QMARK_ ? a.right : a.left, cljs.core.next(this.stack), this.ascending_QMARK_);
  return null != a ? new cljs.core.PersistentTreeMapSeq(null, a, this.ascending_QMARK_, this.cnt - 1, null) : cljs.core.List.EMPTY
};
cljs.core.PersistentTreeMapSeq.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(a, b) {
  return cljs.core.equiv_sequential(a, b)
};
cljs.core.PersistentTreeMapSeq.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(a, b) {
  return new cljs.core.PersistentTreeMapSeq(b, this.stack, this.ascending_QMARK_, this.cnt, this.__hash)
};
cljs.core.PersistentTreeMapSeq.prototype.cljs$core$IMeta$_meta$arity$1 = function() {
  return this.meta
};
cljs.core.PersistentTreeMapSeq.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function() {
  return cljs.core.with_meta(cljs.core.List.EMPTY, this.meta)
};
cljs.core.__GT_PersistentTreeMapSeq = function(a, b, c, d, e) {
  return new cljs.core.PersistentTreeMapSeq(a, b, c, d, e)
};
cljs.core.create_tree_map_seq = function(a, b, c) {
  return new cljs.core.PersistentTreeMapSeq(null, cljs.core.tree_map_seq_push(a, null, b), b, c, null)
};
cljs.core.balance_left = function(a, b, c, d) {
  return c instanceof cljs.core.RedNode ? c.left instanceof cljs.core.RedNode ? new cljs.core.RedNode(c.key, c.val, c.left.blacken(), new cljs.core.BlackNode(a, b, c.right, d, null), null) : c.right instanceof cljs.core.RedNode ? new cljs.core.RedNode(c.right.key, c.right.val, new cljs.core.BlackNode(c.key, c.val, c.left, c.right.left, null), new cljs.core.BlackNode(a, b, c.right.right, d, null), null) : new cljs.core.BlackNode(a, b, c, d, null) : new cljs.core.BlackNode(a, b, c, d, null)
};
cljs.core.balance_right = function(a, b, c, d) {
  return d instanceof cljs.core.RedNode ? d.right instanceof cljs.core.RedNode ? new cljs.core.RedNode(d.key, d.val, new cljs.core.BlackNode(a, b, c, d.left, null), d.right.blacken(), null) : d.left instanceof cljs.core.RedNode ? new cljs.core.RedNode(d.left.key, d.left.val, new cljs.core.BlackNode(a, b, c, d.left.left, null), new cljs.core.BlackNode(d.key, d.val, d.left.right, d.right, null), null) : new cljs.core.BlackNode(a, b, c, d, null) : new cljs.core.BlackNode(a, b, c, d, null)
};
cljs.core.balance_left_del = function(a, b, c, d) {
  if(c instanceof cljs.core.RedNode) {
    return new cljs.core.RedNode(a, b, c.blacken(), d, null)
  }
  if(d instanceof cljs.core.BlackNode) {
    return cljs.core.balance_right(a, b, c, d.redden())
  }
  var e;
  e = (e = d instanceof cljs.core.RedNode) ? d.left instanceof cljs.core.BlackNode : e;
  if(e) {
    return new cljs.core.RedNode(d.left.key, d.left.val, new cljs.core.BlackNode(a, b, c, d.left.left, null), cljs.core.balance_right(d.key, d.val, d.left.right, d.right.redden()), null)
  }
  throw Error("red-black tree invariant violation");
};
cljs.core.balance_right_del = function(a, b, c, d) {
  if(d instanceof cljs.core.RedNode) {
    return new cljs.core.RedNode(a, b, c, d.blacken(), null)
  }
  if(c instanceof cljs.core.BlackNode) {
    return cljs.core.balance_left(a, b, c.redden(), d)
  }
  var e;
  e = (e = c instanceof cljs.core.RedNode) ? c.right instanceof cljs.core.BlackNode : e;
  if(e) {
    return new cljs.core.RedNode(c.right.key, c.right.val, cljs.core.balance_left(c.key, c.val, c.left.redden(), c.right.left), new cljs.core.BlackNode(a, b, c.right.right, d, null), null)
  }
  throw Error("red-black tree invariant violation");
};
cljs.core.tree_map_kv_reduce = function tree_map_kv_reduce(b, c, d) {
  d = null != b.left ? tree_map_kv_reduce(b.left, c, d) : d;
  if(cljs.core.reduced_QMARK_(d)) {
    return cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(d) : cljs.core.deref.call(null, d)
  }
  d = c.cljs$core$IFn$_invoke$arity$3 ? c.cljs$core$IFn$_invoke$arity$3(d, b.key, b.val) : c.call(null, d, b.key, b.val);
  if(cljs.core.reduced_QMARK_(d)) {
    return cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(d) : cljs.core.deref.call(null, d)
  }
  b = null != b.right ? tree_map_kv_reduce(b.right, c, d) : d;
  return cljs.core.reduced_QMARK_(b) ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1 ? cljs.core.deref.cljs$core$IFn$_invoke$arity$1(b) : cljs.core.deref.call(null, b) : b
};
cljs.core.BlackNode = function(a, b, c, d, e) {
  this.key = a;
  this.val = b;
  this.left = c;
  this.right = d;
  this.__hash = e;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 32402207
};
cljs.core.BlackNode.cljs$lang$type = !0;
cljs.core.BlackNode.cljs$lang$ctorStr = "cljs.core/BlackNode";
cljs.core.BlackNode.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write(b, "cljs.core/BlackNode")
};
cljs.core.BlackNode.prototype.cljs$core$IHash$_hash$arity$1 = function(a) {
  var b = this.__hash;
  return null != b ? b : this.__hash = a = cljs.core.hash_coll(a)
};
cljs.core.BlackNode.prototype.cljs$core$ILookup$_lookup$arity$2 = function(a, b) {
  return a.cljs$core$IIndexed$_nth$arity$3(a, b, null)
};
cljs.core.BlackNode.prototype.cljs$core$ILookup$_lookup$arity$3 = function(a, b, c) {
  return a.cljs$core$IIndexed$_nth$arity$3(a, b, c)
};
cljs.core.BlackNode.prototype.cljs$core$IAssociative$_assoc$arity$3 = function(a, b, c) {
  return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentVector.fromArray([this.key, this.val], !0), b, c)
};
cljs.core.BlackNode.prototype.call = function() {
  var a = null;
  return a = function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return this.cljs$core$ILookup$_lookup$arity$2(this, c);
      case 3:
        return this.cljs$core$ILookup$_lookup$arity$3(this, c, d)
    }
    throw Error("Invalid arity: " + arguments.length);
  }
}();
cljs.core.BlackNode.prototype.apply = function(a, b) {
  a = this;
  return a.call.apply(a, [a].concat(b.slice()))
};
cljs.core.BlackNode.prototype.cljs$core$ICollection$_conj$arity$2 = function(a, b) {
  return cljs.core.PersistentVector.fromArray([this.key, this.val, b], !0)
};
cljs.core.BlackNode.prototype.cljs$core$IMapEntry$_key$arity$1 = function() {
  return this.key
};
cljs.core.BlackNode.prototype.cljs$core$IMapEntry$_val$arity$1 = function() {
  return this.val
};
cljs.core.BlackNode.prototype.add_right = function(a) {
  return a.balance_right(this)
};
cljs.core.BlackNode.prototype.redden = function() {
  return new cljs.core.RedNode(this.key, this.val, this.left, this.right, null)
};
cljs.core.BlackNode.prototype.remove_right = function(a) {
  return cljs.core.balance_right_del(this.key, this.val, this.left, a)
};
cljs.core.BlackNode.prototype.replace = function(a, b, c, d) {
  return new cljs.core.BlackNode(a, b, c, d, null)
};
cljs.core.BlackNode.prototype.kv_reduce = function(a, b) {
  return cljs.core.tree_map_kv_reduce(this, a, b)
};
cljs.core.BlackNode.prototype.remove_left = function(a) {
  return cljs.core.balance_left_del(this.key, this.val, a, this.right)
};
cljs.core.BlackNode.prototype.add_left = function(a) {
  return a.balance_left(this)
};
cljs.core.BlackNode.prototype.balance_left = function(a) {
  return new cljs.core.BlackNode(a.key, a.val, this, a.right, null)
};
cljs.core.BlackNode.prototype.balance_right = function(a) {
  return new cljs.core.BlackNode(a.key, a.val, a.left, this, null)
};
cljs.core.BlackNode.prototype.blacken = function() {
  return this
};
cljs.core.BlackNode.prototype.cljs$core$IReduce$_reduce$arity$2 = function(a, b) {
  return cljs.core.ci_reduce.cljs$core$IFn$_invoke$arity$2(a, b)
};
cljs.core.BlackNode.prototype.cljs$core$IReduce$_reduce$arity$3 = function(a, b, c) {
  return cljs.core.ci_reduce.cljs$core$IFn$_invoke$arity$3(a, b, c)
};
cljs.core.BlackNode.prototype.cljs$core$ISeqable$_seq$arity$1 = function() {
  return cljs.core.list.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([this.key, this.val], 0))
};
cljs.core.BlackNode.prototype.cljs$core$ICounted$_count$arity$1 = function() {
  return 2
};
cljs.core.BlackNode.prototype.cljs$core$IStack$_peek$arity$1 = function() {
  return this.val
};
cljs.core.BlackNode.prototype.cljs$core$IStack$_pop$arity$1 = function() {
  return cljs.core.PersistentVector.fromArray([this.key], !0)
};
cljs.core.BlackNode.prototype.cljs$core$IVector$_assoc_n$arity$3 = function(a, b, c) {
  return cljs.core._assoc_n(cljs.core.PersistentVector.fromArray([this.key, this.val], !0), b, c)
};
cljs.core.BlackNode.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(a, b) {
  return cljs.core.equiv_sequential(a, b)
};
cljs.core.BlackNode.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(a, b) {
  return cljs.core.with_meta(cljs.core.PersistentVector.fromArray([this.key, this.val], !0), b)
};
cljs.core.BlackNode.prototype.cljs$core$IMeta$_meta$arity$1 = function() {
  return null
};
cljs.core.BlackNode.prototype.cljs$core$IIndexed$_nth$arity$2 = function(a, b) {
  return 0 === b ? this.key : 1 === b ? this.val : null
};
cljs.core.BlackNode.prototype.cljs$core$IIndexed$_nth$arity$3 = function(a, b, c) {
  return 0 === b ? this.key : 1 === b ? this.val : c
};
cljs.core.BlackNode.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function() {
  return cljs.core.PersistentVector.EMPTY
};
cljs.core.__GT_BlackNode = function(a, b, c, d, e) {
  return new cljs.core.BlackNode(a, b, c, d, e)
};
cljs.core.RedNode = function(a, b, c, d, e) {
  this.key = a;
  this.val = b;
  this.left = c;
  this.right = d;
  this.__hash = e;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 32402207
};
cljs.core.RedNode.cljs$lang$type = !0;
cljs.core.RedNode.cljs$lang$ctorStr = "cljs.core/RedNode";
cljs.core.RedNode.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write(b, "cljs.core/RedNode")
};
cljs.core.RedNode.prototype.cljs$core$IHash$_hash$arity$1 = function(a) {
  var b = this.__hash;
  return null != b ? b : this.__hash = a = cljs.core.hash_coll(a)
};
cljs.core.RedNode.prototype.cljs$core$ILookup$_lookup$arity$2 = function(a, b) {
  return a.cljs$core$IIndexed$_nth$arity$3(a, b, null)
};
cljs.core.RedNode.prototype.cljs$core$ILookup$_lookup$arity$3 = function(a, b, c) {
  return a.cljs$core$IIndexed$_nth$arity$3(a, b, c)
};
cljs.core.RedNode.prototype.cljs$core$IAssociative$_assoc$arity$3 = function(a, b, c) {
  return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentVector.fromArray([this.key, this.val], !0), b, c)
};
cljs.core.RedNode.prototype.call = function() {
  var a = null;
  return a = function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return this.cljs$core$ILookup$_lookup$arity$2(this, c);
      case 3:
        return this.cljs$core$ILookup$_lookup$arity$3(this, c, d)
    }
    throw Error("Invalid arity: " + arguments.length);
  }
}();
cljs.core.RedNode.prototype.apply = function(a, b) {
  a = this;
  return a.call.apply(a, [a].concat(b.slice()))
};
cljs.core.RedNode.prototype.cljs$core$ICollection$_conj$arity$2 = function(a, b) {
  return cljs.core.PersistentVector.fromArray([this.key, this.val, b], !0)
};
cljs.core.RedNode.prototype.cljs$core$IMapEntry$_key$arity$1 = function() {
  return this.key
};
cljs.core.RedNode.prototype.cljs$core$IMapEntry$_val$arity$1 = function() {
  return this.val
};
cljs.core.RedNode.prototype.add_right = function(a) {
  return new cljs.core.RedNode(this.key, this.val, this.left, a, null)
};
cljs.core.RedNode.prototype.redden = function() {
  throw Error("red-black tree invariant violation");
};
cljs.core.RedNode.prototype.remove_right = function(a) {
  return new cljs.core.RedNode(this.key, this.val, this.left, a, null)
};
cljs.core.RedNode.prototype.replace = function(a, b, c, d) {
  return new cljs.core.RedNode(a, b, c, d, null)
};
cljs.core.RedNode.prototype.kv_reduce = function(a, b) {
  return cljs.core.tree_map_kv_reduce(this, a, b)
};
cljs.core.RedNode.prototype.remove_left = function(a) {
  return new cljs.core.RedNode(this.key, this.val, a, this.right, null)
};
cljs.core.RedNode.prototype.add_left = function(a) {
  return new cljs.core.RedNode(this.key, this.val, a, this.right, null)
};
cljs.core.RedNode.prototype.balance_left = function(a) {
  return this.left instanceof cljs.core.RedNode ? new cljs.core.RedNode(this.key, this.val, this.left.blacken(), new cljs.core.BlackNode(a.key, a.val, this.right, a.right, null), null) : this.right instanceof cljs.core.RedNode ? new cljs.core.RedNode(this.right.key, this.right.val, new cljs.core.BlackNode(this.key, this.val, this.left, this.right.left, null), new cljs.core.BlackNode(a.key, a.val, this.right.right, a.right, null), null) : new cljs.core.BlackNode(a.key, a.val, this, a.right, null)
};
cljs.core.RedNode.prototype.balance_right = function(a) {
  return this.right instanceof cljs.core.RedNode ? new cljs.core.RedNode(this.key, this.val, new cljs.core.BlackNode(a.key, a.val, a.left, this.left, null), this.right.blacken(), null) : this.left instanceof cljs.core.RedNode ? new cljs.core.RedNode(this.left.key, this.left.val, new cljs.core.BlackNode(a.key, a.val, a.left, this.left.left, null), new cljs.core.BlackNode(this.key, this.val, this.left.right, this.right, null), null) : new cljs.core.BlackNode(a.key, a.val, a.left, this, null)
};
cljs.core.RedNode.prototype.blacken = function() {
  return new cljs.core.BlackNode(this.key, this.val, this.left, this.right, null)
};
cljs.core.RedNode.prototype.cljs$core$IReduce$_reduce$arity$2 = function(a, b) {
  return cljs.core.ci_reduce.cljs$core$IFn$_invoke$arity$2(a, b)
};
cljs.core.RedNode.prototype.cljs$core$IReduce$_reduce$arity$3 = function(a, b, c) {
  return cljs.core.ci_reduce.cljs$core$IFn$_invoke$arity$3(a, b, c)
};
cljs.core.RedNode.prototype.cljs$core$ISeqable$_seq$arity$1 = function() {
  return cljs.core.list.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([this.key, this.val], 0))
};
cljs.core.RedNode.prototype.cljs$core$ICounted$_count$arity$1 = function() {
  return 2
};
cljs.core.RedNode.prototype.cljs$core$IStack$_peek$arity$1 = function() {
  return this.val
};
cljs.core.RedNode.prototype.cljs$core$IStack$_pop$arity$1 = function() {
  return cljs.core.PersistentVector.fromArray([this.key], !0)
};
cljs.core.RedNode.prototype.cljs$core$IVector$_assoc_n$arity$3 = function(a, b, c) {
  return cljs.core._assoc_n(cljs.core.PersistentVector.fromArray([this.key, this.val], !0), b, c)
};
cljs.core.RedNode.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(a, b) {
  return cljs.core.equiv_sequential(a, b)
};
cljs.core.RedNode.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(a, b) {
  return cljs.core.with_meta(cljs.core.PersistentVector.fromArray([this.key, this.val], !0), b)
};
cljs.core.RedNode.prototype.cljs$core$IMeta$_meta$arity$1 = function() {
  return null
};
cljs.core.RedNode.prototype.cljs$core$IIndexed$_nth$arity$2 = function(a, b) {
  return 0 === b ? this.key : 1 === b ? this.val : null
};
cljs.core.RedNode.prototype.cljs$core$IIndexed$_nth$arity$3 = function(a, b, c) {
  return 0 === b ? this.key : 1 === b ? this.val : c
};
cljs.core.RedNode.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function() {
  return cljs.core.PersistentVector.EMPTY
};
cljs.core.__GT_RedNode = function(a, b, c, d, e) {
  return new cljs.core.RedNode(a, b, c, d, e)
};
cljs.core.tree_map_add = function tree_map_add(b, c, d, e, f) {
  if(null == c) {
    return new cljs.core.RedNode(d, e, null, null, null)
  }
  var g = b.cljs$core$IFn$_invoke$arity$2 ? b.cljs$core$IFn$_invoke$arity$2(d, c.key) : b.call(null, d, c.key);
  if(0 === g) {
    return f[0] = c, null
  }
  if(0 > g) {
    return b = tree_map_add(b, c.left, d, e, f), null != b ? c.add_left(b) : null
  }
  b = tree_map_add(b, c.right, d, e, f);
  return null != b ? c.add_right(b) : null
};
cljs.core.tree_map_append = function tree_map_append(b, c) {
  if(null == b) {
    return c
  }
  if(null == c) {
    return b
  }
  if(b instanceof cljs.core.RedNode) {
    if(c instanceof cljs.core.RedNode) {
      var d = tree_map_append(b.right, c.left);
      return d instanceof cljs.core.RedNode ? new cljs.core.RedNode(d.key, d.val, new cljs.core.RedNode(b.key, b.val, b.left, d.left, null), new cljs.core.RedNode(c.key, c.val, d.right, c.right, null), null) : new cljs.core.RedNode(b.key, b.val, b.left, new cljs.core.RedNode(c.key, c.val, d, c.right, null), null)
    }
    return new cljs.core.RedNode(b.key, b.val, b.left, tree_map_append(b.right, c), null)
  }
  if(c instanceof cljs.core.RedNode) {
    return new cljs.core.RedNode(c.key, c.val, tree_map_append(b, c.left), c.right, null)
  }
  d = tree_map_append(b.right, c.left);
  return d instanceof cljs.core.RedNode ? new cljs.core.RedNode(d.key, d.val, new cljs.core.BlackNode(b.key, b.val, b.left, d.left, null), new cljs.core.BlackNode(c.key, c.val, d.right, c.right, null), null) : cljs.core.balance_left_del(b.key, b.val, b.left, new cljs.core.BlackNode(c.key, c.val, d, c.right, null))
};
cljs.core.tree_map_remove = function tree_map_remove(b, c, d, e) {
  if(null != c) {
    var f = b.cljs$core$IFn$_invoke$arity$2 ? b.cljs$core$IFn$_invoke$arity$2(d, c.key) : b.call(null, d, c.key);
    if(0 === f) {
      return e[0] = c, cljs.core.tree_map_append(c.left, c.right)
    }
    if(0 > f) {
      return b = tree_map_remove(b, c.left, d, e), e = (d = null != b) ? d : null != e[0], e ? c.left instanceof cljs.core.BlackNode ? cljs.core.balance_left_del(c.key, c.val, b, c.right) : new cljs.core.RedNode(c.key, c.val, b, c.right, null) : null
    }
    b = tree_map_remove(b, c.right, d, e);
    e = (d = null != b) ? d : null != e[0];
    return e ? c.right instanceof cljs.core.BlackNode ? cljs.core.balance_right_del(c.key, c.val, c.left, b) : new cljs.core.RedNode(c.key, c.val, c.left, b, null) : null
  }
  return null
};
cljs.core.tree_map_replace = function tree_map_replace(b, c, d, e) {
  var f = c.key, g = b.cljs$core$IFn$_invoke$arity$2 ? b.cljs$core$IFn$_invoke$arity$2(d, f) : b.call(null, d, f);
  return 0 === g ? c.replace(f, e, c.left, c.right) : 0 > g ? c.replace(f, c.val, tree_map_replace(b, c.left, d, e), c.right) : c.replace(f, c.val, c.left, tree_map_replace(b, c.right, d, e))
};
cljs.core.PersistentTreeMap = function(a, b, c, d, e) {
  this.comp = a;
  this.tree = b;
  this.cnt = c;
  this.meta = d;
  this.__hash = e;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 418776847
};
cljs.core.PersistentTreeMap.cljs$lang$type = !0;
cljs.core.PersistentTreeMap.cljs$lang$ctorStr = "cljs.core/PersistentTreeMap";
cljs.core.PersistentTreeMap.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write(b, "cljs.core/PersistentTreeMap")
};
cljs.core.PersistentTreeMap.prototype.cljs$core$IHash$_hash$arity$1 = function(a) {
  var b = this.__hash;
  return null != b ? b : this.__hash = a = cljs.core.hash_imap(a)
};
cljs.core.PersistentTreeMap.prototype.cljs$core$ILookup$_lookup$arity$2 = function(a, b) {
  return a.cljs$core$ILookup$_lookup$arity$3(a, b, null)
};
cljs.core.PersistentTreeMap.prototype.cljs$core$ILookup$_lookup$arity$3 = function(a, b, c) {
  a = a.entry_at(b);
  return null != a ? a.val : c
};
cljs.core.PersistentTreeMap.prototype.cljs$core$IAssociative$_assoc$arity$3 = function(a, b, c) {
  var d = [null], e = cljs.core.tree_map_add(this.comp, this.tree, b, c, d);
  return null == e ? (d = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(d, 0), cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(c, d.val) ? a : new cljs.core.PersistentTreeMap(this.comp, cljs.core.tree_map_replace(this.comp, this.tree, b, c), this.cnt, this.meta, null)) : new cljs.core.PersistentTreeMap(this.comp, e.blacken(), this.cnt + 1, this.meta, null)
};
cljs.core.PersistentTreeMap.prototype.cljs$core$IAssociative$_contains_key_QMARK_$arity$2 = function(a, b) {
  return null != a.entry_at(b)
};
cljs.core.PersistentTreeMap.prototype.call = function() {
  var a = null;
  return a = function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return this.cljs$core$ILookup$_lookup$arity$2(this, c);
      case 3:
        return this.cljs$core$ILookup$_lookup$arity$3(this, c, d)
    }
    throw Error("Invalid arity: " + arguments.length);
  }
}();
cljs.core.PersistentTreeMap.prototype.apply = function(a, b) {
  a = this;
  return a.call.apply(a, [a].concat(b.slice()))
};
cljs.core.PersistentTreeMap.prototype.cljs$core$IKVReduce$_kv_reduce$arity$3 = function(a, b, c) {
  return null != this.tree ? cljs.core.tree_map_kv_reduce(this.tree, b, c) : c
};
cljs.core.PersistentTreeMap.prototype.cljs$core$ICollection$_conj$arity$2 = function(a, b) {
  return cljs.core.vector_QMARK_(b) ? a.cljs$core$IAssociative$_assoc$arity$3(a, cljs.core._nth.cljs$core$IFn$_invoke$arity$2(b, 0), cljs.core._nth.cljs$core$IFn$_invoke$arity$2(b, 1)) : cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core._conj, a, b)
};
cljs.core.PersistentTreeMap.prototype.cljs$core$IReversible$_rseq$arity$1 = function() {
  return 0 < this.cnt ? cljs.core.create_tree_map_seq(this.tree, !1, this.cnt) : null
};
cljs.core.PersistentTreeMap.prototype.entry_at = function(a) {
  for(var b = this.tree;;) {
    if(null != b) {
      var c = this.comp.cljs$core$IFn$_invoke$arity$2 ? this.comp.cljs$core$IFn$_invoke$arity$2(a, b.key) : this.comp.call(null, a, b.key);
      if(0 === c) {
        return b
      }
      b = 0 > c ? b.left : b.right
    }else {
      return null
    }
  }
};
cljs.core.PersistentTreeMap.prototype.cljs$core$ISorted$_sorted_seq$arity$2 = function(a, b) {
  return 0 < this.cnt ? cljs.core.create_tree_map_seq(this.tree, b, this.cnt) : null
};
cljs.core.PersistentTreeMap.prototype.cljs$core$ISorted$_sorted_seq_from$arity$3 = function(a, b, c) {
  if(0 < this.cnt) {
    for(var a = null, d = this.tree;;) {
      if(null != d) {
        var e = this.comp.cljs$core$IFn$_invoke$arity$2 ? this.comp.cljs$core$IFn$_invoke$arity$2(b, d.key) : this.comp.call(null, b, d.key);
        if(0 === e) {
          return new cljs.core.PersistentTreeMapSeq(null, cljs.core.conj.cljs$core$IFn$_invoke$arity$2(a, d), c, -1, null)
        }
        cljs.core.truth_(c) ? 0 > e ? (a = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(a, d), d = d.left) : d = d.right : 0 < e ? (a = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(a, d), d = d.right) : d = d.left
      }else {
        return null == a ? null : new cljs.core.PersistentTreeMapSeq(null, a, c, -1, null)
      }
    }
  }else {
    return null
  }
};
cljs.core.PersistentTreeMap.prototype.cljs$core$ISorted$_entry_key$arity$2 = function(a, b) {
  return cljs.core.key.cljs$core$IFn$_invoke$arity$1 ? cljs.core.key.cljs$core$IFn$_invoke$arity$1(b) : cljs.core.key.call(null, b)
};
cljs.core.PersistentTreeMap.prototype.cljs$core$ISorted$_comparator$arity$1 = function() {
  return this.comp
};
cljs.core.PersistentTreeMap.prototype.cljs$core$ISeqable$_seq$arity$1 = function() {
  return 0 < this.cnt ? cljs.core.create_tree_map_seq(this.tree, !0, this.cnt) : null
};
cljs.core.PersistentTreeMap.prototype.cljs$core$ICounted$_count$arity$1 = function() {
  return this.cnt
};
cljs.core.PersistentTreeMap.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(a, b) {
  return cljs.core.equiv_map(a, b)
};
cljs.core.PersistentTreeMap.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(a, b) {
  return new cljs.core.PersistentTreeMap(this.comp, this.tree, this.cnt, b, this.__hash)
};
cljs.core.PersistentTreeMap.prototype.cljs$core$IMeta$_meta$arity$1 = function() {
  return this.meta
};
cljs.core.PersistentTreeMap.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function() {
  return cljs.core.with_meta(cljs.core.PersistentTreeMap.EMPTY, this.meta)
};
cljs.core.PersistentTreeMap.prototype.cljs$core$IMap$_dissoc$arity$2 = function(a, b) {
  var c = [null], d = cljs.core.tree_map_remove(this.comp, this.tree, b, c);
  return null == d ? null == cljs.core.nth.cljs$core$IFn$_invoke$arity$2(c, 0) ? a : new cljs.core.PersistentTreeMap(this.comp, null, 0, this.meta, null) : new cljs.core.PersistentTreeMap(this.comp, d.blacken(), this.cnt - 1, this.meta, null)
};
cljs.core.__GT_PersistentTreeMap = function(a, b, c, d, e) {
  return new cljs.core.PersistentTreeMap(a, b, c, d, e)
};
cljs.core.PersistentTreeMap.EMPTY = new cljs.core.PersistentTreeMap(cljs.core.compare, null, 0, null, 0);
cljs.core.hash_map = function() {
  var a = function(a) {
    for(var a = cljs.core.seq(a), b = cljs.core.transient$(cljs.core.PersistentHashMap.EMPTY);;) {
      if(a) {
        var e = cljs.core.nnext(a), b = cljs.core.assoc_BANG_(b, cljs.core.first(a), cljs.core.second(a)), a = e
      }else {
        return cljs.core.persistent_BANG_(b)
      }
    }
  }, b = function(b) {
    var d = null;
    0 < arguments.length && (d = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0));
    return a.call(this, d)
  };
  b.cljs$lang$maxFixedArity = 0;
  b.cljs$lang$applyTo = function(b) {
    b = cljs.core.seq(b);
    return a(b)
  };
  b.cljs$core$IFn$_invoke$arity$variadic = a;
  return b
}();
cljs.core.array_map = function() {
  var a = function(a) {
    return new cljs.core.PersistentArrayMap(null, cljs.core.quot(cljs.core.count(a), 2), cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.array, a), null)
  }, b = function(b) {
    var d = null;
    0 < arguments.length && (d = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0));
    return a.call(this, d)
  };
  b.cljs$lang$maxFixedArity = 0;
  b.cljs$lang$applyTo = function(b) {
    b = cljs.core.seq(b);
    return a(b)
  };
  b.cljs$core$IFn$_invoke$arity$variadic = a;
  return b
}();
cljs.core.obj_map = function() {
  var a = function(a) {
    for(var b = [], e = {}, a = cljs.core.seq(a);;) {
      if(a) {
        b.push(cljs.core.first(a)), e[cljs.core.first(a)] = cljs.core.second(a), a = cljs.core.nnext(a)
      }else {
        return cljs.core.ObjMap.fromObject.cljs$core$IFn$_invoke$arity$2 ? cljs.core.ObjMap.fromObject.cljs$core$IFn$_invoke$arity$2(b, e) : cljs.core.ObjMap.fromObject.call(null, b, e)
      }
    }
  }, b = function(b) {
    var d = null;
    0 < arguments.length && (d = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0));
    return a.call(this, d)
  };
  b.cljs$lang$maxFixedArity = 0;
  b.cljs$lang$applyTo = function(b) {
    b = cljs.core.seq(b);
    return a(b)
  };
  b.cljs$core$IFn$_invoke$arity$variadic = a;
  return b
}();
cljs.core.sorted_map = function() {
  var a = function(a) {
    for(var a = cljs.core.seq(a), b = cljs.core.PersistentTreeMap.EMPTY;;) {
      if(a) {
        var e = cljs.core.nnext(a), b = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(b, cljs.core.first(a), cljs.core.second(a)), a = e
      }else {
        return b
      }
    }
  }, b = function(b) {
    var d = null;
    0 < arguments.length && (d = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0));
    return a.call(this, d)
  };
  b.cljs$lang$maxFixedArity = 0;
  b.cljs$lang$applyTo = function(b) {
    b = cljs.core.seq(b);
    return a(b)
  };
  b.cljs$core$IFn$_invoke$arity$variadic = a;
  return b
}();
cljs.core.sorted_map_by = function() {
  var a = function(a, b) {
    for(var e = cljs.core.seq(b), f = new cljs.core.PersistentTreeMap(cljs.core.fn__GT_comparator(a), null, 0, null, 0);;) {
      if(e) {
        var g = cljs.core.nnext(e), f = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(f, cljs.core.first(e), cljs.core.second(e)), e = g
      }else {
        return f
      }
    }
  }, b = function(b, d) {
    var e = null;
    1 < arguments.length && (e = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0));
    return a.call(this, b, e)
  };
  b.cljs$lang$maxFixedArity = 1;
  b.cljs$lang$applyTo = function(b) {
    var d = cljs.core.first(b), b = cljs.core.rest(b);
    return a(d, b)
  };
  b.cljs$core$IFn$_invoke$arity$variadic = a;
  return b
}();
cljs.core.KeySeq = function(a, b) {
  this.mseq = a;
  this._meta = b;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 31850700
};
cljs.core.KeySeq.cljs$lang$type = !0;
cljs.core.KeySeq.cljs$lang$ctorStr = "cljs.core/KeySeq";
cljs.core.KeySeq.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write(b, "cljs.core/KeySeq")
};
cljs.core.KeySeq.prototype.cljs$core$IHash$_hash$arity$1 = function(a) {
  return cljs.core.hash_coll(a)
};
cljs.core.KeySeq.prototype.cljs$core$INext$_next$arity$1 = function() {
  var a;
  if(a = this.mseq) {
    var b;
    b = (b = a.cljs$lang$protocol_mask$partition0$ & 128) ? b : a.cljs$core$INext$;
    a = b ? !0 : a.cljs$lang$protocol_mask$partition0$ ? !1 : cljs.core.type_satisfies_(cljs.core.INext, a)
  }else {
    a = cljs.core.type_satisfies_(cljs.core.INext, a)
  }
  a = a ? this.mseq.cljs$core$INext$_next$arity$1(this.mseq) : cljs.core.next(this.mseq);
  return null == a ? null : new cljs.core.KeySeq(a, this._meta)
};
cljs.core.KeySeq.prototype.cljs$core$ICollection$_conj$arity$2 = function(a, b) {
  return cljs.core.cons(b, a)
};
cljs.core.KeySeq.prototype.toString = function() {
  return cljs.core.pr_str_STAR_(this)
};
cljs.core.KeySeq.prototype.cljs$core$ISeqable$_seq$arity$1 = function(a) {
  return a
};
cljs.core.KeySeq.prototype.cljs$core$ISeq$_first$arity$1 = function() {
  var a = this.mseq.cljs$core$ISeq$_first$arity$1(this.mseq);
  return a.cljs$core$IMapEntry$_key$arity$1(a)
};
cljs.core.KeySeq.prototype.cljs$core$ISeq$_rest$arity$1 = function() {
  var a;
  if(a = this.mseq) {
    var b;
    b = (b = a.cljs$lang$protocol_mask$partition0$ & 128) ? b : a.cljs$core$INext$;
    a = b ? !0 : a.cljs$lang$protocol_mask$partition0$ ? !1 : cljs.core.type_satisfies_(cljs.core.INext, a)
  }else {
    a = cljs.core.type_satisfies_(cljs.core.INext, a)
  }
  a = a ? this.mseq.cljs$core$INext$_next$arity$1(this.mseq) : cljs.core.next(this.mseq);
  return null != a ? new cljs.core.KeySeq(a, this._meta) : cljs.core.List.EMPTY
};
cljs.core.KeySeq.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(a, b) {
  return cljs.core.equiv_sequential(a, b)
};
cljs.core.KeySeq.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(a, b) {
  return new cljs.core.KeySeq(this.mseq, b)
};
cljs.core.KeySeq.prototype.cljs$core$IMeta$_meta$arity$1 = function() {
  return this._meta
};
cljs.core.KeySeq.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function() {
  return cljs.core.with_meta(cljs.core.List.EMPTY, this._meta)
};
cljs.core.__GT_KeySeq = function(a, b) {
  return new cljs.core.KeySeq(a, b)
};
cljs.core.keys = function(a) {
  return(a = cljs.core.seq(a)) ? new cljs.core.KeySeq(a, null) : null
};
cljs.core.key = function(a) {
  return cljs.core._key(a)
};
cljs.core.ValSeq = function(a, b) {
  this.mseq = a;
  this._meta = b;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 31850700
};
cljs.core.ValSeq.cljs$lang$type = !0;
cljs.core.ValSeq.cljs$lang$ctorStr = "cljs.core/ValSeq";
cljs.core.ValSeq.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write(b, "cljs.core/ValSeq")
};
cljs.core.ValSeq.prototype.cljs$core$IHash$_hash$arity$1 = function(a) {
  return cljs.core.hash_coll(a)
};
cljs.core.ValSeq.prototype.cljs$core$INext$_next$arity$1 = function() {
  var a;
  if(a = this.mseq) {
    var b;
    b = (b = a.cljs$lang$protocol_mask$partition0$ & 128) ? b : a.cljs$core$INext$;
    a = b ? !0 : a.cljs$lang$protocol_mask$partition0$ ? !1 : cljs.core.type_satisfies_(cljs.core.INext, a)
  }else {
    a = cljs.core.type_satisfies_(cljs.core.INext, a)
  }
  a = a ? this.mseq.cljs$core$INext$_next$arity$1(this.mseq) : cljs.core.next(this.mseq);
  return null == a ? null : new cljs.core.ValSeq(a, this._meta)
};
cljs.core.ValSeq.prototype.cljs$core$ICollection$_conj$arity$2 = function(a, b) {
  return cljs.core.cons(b, a)
};
cljs.core.ValSeq.prototype.toString = function() {
  return cljs.core.pr_str_STAR_(this)
};
cljs.core.ValSeq.prototype.cljs$core$ISeqable$_seq$arity$1 = function(a) {
  return a
};
cljs.core.ValSeq.prototype.cljs$core$ISeq$_first$arity$1 = function() {
  var a = this.mseq.cljs$core$ISeq$_first$arity$1(this.mseq);
  return a.cljs$core$IMapEntry$_val$arity$1(a)
};
cljs.core.ValSeq.prototype.cljs$core$ISeq$_rest$arity$1 = function() {
  var a;
  if(a = this.mseq) {
    var b;
    b = (b = a.cljs$lang$protocol_mask$partition0$ & 128) ? b : a.cljs$core$INext$;
    a = b ? !0 : a.cljs$lang$protocol_mask$partition0$ ? !1 : cljs.core.type_satisfies_(cljs.core.INext, a)
  }else {
    a = cljs.core.type_satisfies_(cljs.core.INext, a)
  }
  a = a ? this.mseq.cljs$core$INext$_next$arity$1(this.mseq) : cljs.core.next(this.mseq);
  return null != a ? new cljs.core.ValSeq(a, this._meta) : cljs.core.List.EMPTY
};
cljs.core.ValSeq.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(a, b) {
  return cljs.core.equiv_sequential(a, b)
};
cljs.core.ValSeq.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(a, b) {
  return new cljs.core.ValSeq(this.mseq, b)
};
cljs.core.ValSeq.prototype.cljs$core$IMeta$_meta$arity$1 = function() {
  return this._meta
};
cljs.core.ValSeq.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function() {
  return cljs.core.with_meta(cljs.core.List.EMPTY, this._meta)
};
cljs.core.__GT_ValSeq = function(a, b) {
  return new cljs.core.ValSeq(a, b)
};
cljs.core.vals = function(a) {
  return(a = cljs.core.seq(a)) ? new cljs.core.ValSeq(a, null) : null
};
cljs.core.val = function(a) {
  return cljs.core._val(a)
};
cljs.core.merge = function() {
  var a = function(a) {
    return cljs.core.truth_(cljs.core.some(cljs.core.identity, a)) ? cljs.core.reduce.cljs$core$IFn$_invoke$arity$2(function(a, b) {
      return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(cljs.core.truth_(a) ? a : cljs.core.PersistentArrayMap.EMPTY, b)
    }, a) : null
  }, b = function(b) {
    var d = null;
    0 < arguments.length && (d = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0));
    return a.call(this, d)
  };
  b.cljs$lang$maxFixedArity = 0;
  b.cljs$lang$applyTo = function(b) {
    b = cljs.core.seq(b);
    return a(b)
  };
  b.cljs$core$IFn$_invoke$arity$variadic = a;
  return b
}();
cljs.core.merge_with = function() {
  var a = function(a, b) {
    if(cljs.core.truth_(cljs.core.some(cljs.core.identity, b))) {
      var e = function(b, d) {
        var e = cljs.core.first(d), i = cljs.core.second(d);
        return cljs.core.contains_QMARK_(b, e) ? cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(b, e, a.cljs$core$IFn$_invoke$arity$2 ? a.cljs$core$IFn$_invoke$arity$2(cljs.core.get.cljs$core$IFn$_invoke$arity$2(b, e), i) : a.call(null, cljs.core.get.cljs$core$IFn$_invoke$arity$2(b, e), i)) : cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(b, e, i)
      };
      return cljs.core.reduce.cljs$core$IFn$_invoke$arity$2(function(a, b) {
        return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(e, cljs.core.truth_(a) ? a : cljs.core.PersistentArrayMap.EMPTY, cljs.core.seq(b))
      }, b)
    }
    return null
  }, b = function(b, d) {
    var e = null;
    1 < arguments.length && (e = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0));
    return a.call(this, b, e)
  };
  b.cljs$lang$maxFixedArity = 1;
  b.cljs$lang$applyTo = function(b) {
    var d = cljs.core.first(b), b = cljs.core.rest(b);
    return a(d, b)
  };
  b.cljs$core$IFn$_invoke$arity$variadic = a;
  return b
}();
cljs.core.select_keys = function(a, b) {
  for(var c = cljs.core.PersistentArrayMap.EMPTY, d = cljs.core.seq(b);;) {
    if(d) {
      var e = cljs.core.first(d), f = cljs.core.get.cljs$core$IFn$_invoke$arity$3(a, e, "\ufdd0:cljs.core/not-found"), c = cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(f, "\ufdd0:cljs.core/not-found") ? cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(c, e, f) : c, d = cljs.core.next(d)
    }else {
      return c
    }
  }
};
cljs.core.PersistentHashSet = function(a, b, c) {
  this.meta = a;
  this.hash_map = b;
  this.__hash = c;
  this.cljs$lang$protocol_mask$partition1$ = 4;
  this.cljs$lang$protocol_mask$partition0$ = 15077647
};
cljs.core.PersistentHashSet.cljs$lang$type = !0;
cljs.core.PersistentHashSet.cljs$lang$ctorStr = "cljs.core/PersistentHashSet";
cljs.core.PersistentHashSet.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write(b, "cljs.core/PersistentHashSet")
};
cljs.core.PersistentHashSet.prototype.cljs$core$IEditableCollection$_as_transient$arity$1 = function() {
  return new cljs.core.TransientHashSet(cljs.core._as_transient(this.hash_map))
};
cljs.core.PersistentHashSet.prototype.cljs$core$IHash$_hash$arity$1 = function(a) {
  var b = this.__hash;
  return null != b ? b : this.__hash = a = cljs.core.hash_iset(a)
};
cljs.core.PersistentHashSet.prototype.cljs$core$ILookup$_lookup$arity$2 = function(a, b) {
  return a.cljs$core$ILookup$_lookup$arity$3(a, b, null)
};
cljs.core.PersistentHashSet.prototype.cljs$core$ILookup$_lookup$arity$3 = function(a, b, c) {
  return cljs.core.truth_(cljs.core._contains_key_QMARK_(this.hash_map, b)) ? b : c
};
cljs.core.PersistentHashSet.prototype.call = function() {
  var a = null;
  return a = function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return this.cljs$core$ILookup$_lookup$arity$2(this, c);
      case 3:
        return this.cljs$core$ILookup$_lookup$arity$3(this, c, d)
    }
    throw Error("Invalid arity: " + arguments.length);
  }
}();
cljs.core.PersistentHashSet.prototype.apply = function(a, b) {
  a = this;
  return a.call.apply(a, [a].concat(b.slice()))
};
cljs.core.PersistentHashSet.prototype.cljs$core$ICollection$_conj$arity$2 = function(a, b) {
  return new cljs.core.PersistentHashSet(this.meta, cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(this.hash_map, b, null), null)
};
cljs.core.PersistentHashSet.prototype.toString = function() {
  return cljs.core.pr_str_STAR_(this)
};
cljs.core.PersistentHashSet.prototype.cljs$core$ISeqable$_seq$arity$1 = function() {
  return cljs.core.keys(this.hash_map)
};
cljs.core.PersistentHashSet.prototype.cljs$core$ISet$_disjoin$arity$2 = function(a, b) {
  return new cljs.core.PersistentHashSet(this.meta, cljs.core._dissoc(this.hash_map, b), null)
};
cljs.core.PersistentHashSet.prototype.cljs$core$ICounted$_count$arity$1 = function() {
  return cljs.core._count(this.hash_map)
};
cljs.core.PersistentHashSet.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(a, b) {
  var c = cljs.core.set_QMARK_(b);
  return c ? (c = cljs.core.count(a) === cljs.core.count(b)) ? cljs.core.every_QMARK_(function(b) {
    return cljs.core.contains_QMARK_(a, b)
  }, b) : c : c
};
cljs.core.PersistentHashSet.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(a, b) {
  return new cljs.core.PersistentHashSet(b, this.hash_map, this.__hash)
};
cljs.core.PersistentHashSet.prototype.cljs$core$IMeta$_meta$arity$1 = function() {
  return this.meta
};
cljs.core.PersistentHashSet.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function() {
  return cljs.core.with_meta(cljs.core.PersistentHashSet.EMPTY, this.meta)
};
cljs.core.__GT_PersistentHashSet = function(a, b, c) {
  return new cljs.core.PersistentHashSet(a, b, c)
};
cljs.core.PersistentHashSet.EMPTY = new cljs.core.PersistentHashSet(null, cljs.core.PersistentArrayMap.EMPTY, 0);
cljs.core.PersistentHashSet.fromArray = function(a, b) {
  var c = a.length;
  if(c / 2 <= cljs.core.PersistentArrayMap.HASHMAP_THRESHOLD) {
    return c = b ? a : a.slice(), new cljs.core.PersistentHashSet(null, cljs.core.PersistentArrayMap.fromArray.cljs$core$IFn$_invoke$arity$2 ? cljs.core.PersistentArrayMap.fromArray.cljs$core$IFn$_invoke$arity$2(c, !0) : cljs.core.PersistentArrayMap.fromArray.call(null, c, !0), null)
  }
  for(var d = 0, e = cljs.core.transient$(cljs.core.PersistentHashSet.EMPTY);;) {
    if(d < c) {
      var f = d + 2, e = cljs.core.conj_BANG_(e, a[d]), d = f
    }else {
      return cljs.core.persistent_BANG_(e)
    }
  }
};
cljs.core.TransientHashSet = function(a) {
  this.transient_map = a;
  this.cljs$lang$protocol_mask$partition0$ = 259;
  this.cljs$lang$protocol_mask$partition1$ = 136
};
cljs.core.TransientHashSet.cljs$lang$type = !0;
cljs.core.TransientHashSet.cljs$lang$ctorStr = "cljs.core/TransientHashSet";
cljs.core.TransientHashSet.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write(b, "cljs.core/TransientHashSet")
};
cljs.core.TransientHashSet.prototype.call = function() {
  var a = null;
  return a = function(a, c, d) {
    switch(arguments.length) {
      case 2:
        var e;
        e = cljs.core._lookup.cljs$core$IFn$_invoke$arity$3(this.transient_map, c, cljs.core.lookup_sentinel) === cljs.core.lookup_sentinel ? null : c;
        return e;
      case 3:
        return e = cljs.core._lookup.cljs$core$IFn$_invoke$arity$3(this.transient_map, c, cljs.core.lookup_sentinel) === cljs.core.lookup_sentinel ? d : c, e
    }
    throw Error("Invalid arity: " + arguments.length);
  }
}();
cljs.core.TransientHashSet.prototype.apply = function(a, b) {
  a = this;
  return a.call.apply(a, [a].concat(b.slice()))
};
cljs.core.TransientHashSet.prototype.cljs$core$ILookup$_lookup$arity$2 = function(a, b) {
  return a.cljs$core$ILookup$_lookup$arity$3(a, b, null)
};
cljs.core.TransientHashSet.prototype.cljs$core$ILookup$_lookup$arity$3 = function(a, b, c) {
  return cljs.core._lookup.cljs$core$IFn$_invoke$arity$3(this.transient_map, b, cljs.core.lookup_sentinel) === cljs.core.lookup_sentinel ? c : b
};
cljs.core.TransientHashSet.prototype.cljs$core$ICounted$_count$arity$1 = function() {
  return cljs.core.count(this.transient_map)
};
cljs.core.TransientHashSet.prototype.cljs$core$ITransientSet$_disjoin_BANG_$arity$2 = function(a, b) {
  this.transient_map = cljs.core.dissoc_BANG_(this.transient_map, b);
  return a
};
cljs.core.TransientHashSet.prototype.cljs$core$ITransientCollection$_conj_BANG_$arity$2 = function(a, b) {
  this.transient_map = cljs.core.assoc_BANG_(this.transient_map, b, null);
  return a
};
cljs.core.TransientHashSet.prototype.cljs$core$ITransientCollection$_persistent_BANG_$arity$1 = function() {
  return new cljs.core.PersistentHashSet(null, cljs.core.persistent_BANG_(this.transient_map), null)
};
cljs.core.__GT_TransientHashSet = function(a) {
  return new cljs.core.TransientHashSet(a)
};
cljs.core.PersistentTreeSet = function(a, b, c) {
  this.meta = a;
  this.tree_map = b;
  this.__hash = c;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 417730831
};
cljs.core.PersistentTreeSet.cljs$lang$type = !0;
cljs.core.PersistentTreeSet.cljs$lang$ctorStr = "cljs.core/PersistentTreeSet";
cljs.core.PersistentTreeSet.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write(b, "cljs.core/PersistentTreeSet")
};
cljs.core.PersistentTreeSet.prototype.cljs$core$IHash$_hash$arity$1 = function(a) {
  var b = this.__hash;
  return null != b ? b : this.__hash = a = cljs.core.hash_iset(a)
};
cljs.core.PersistentTreeSet.prototype.cljs$core$ILookup$_lookup$arity$2 = function(a, b) {
  return a.cljs$core$ILookup$_lookup$arity$3(a, b, null)
};
cljs.core.PersistentTreeSet.prototype.cljs$core$ILookup$_lookup$arity$3 = function(a, b, c) {
  a = this.tree_map.entry_at(b);
  return null != a ? a.key : c
};
cljs.core.PersistentTreeSet.prototype.call = function() {
  var a = null;
  return a = function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return this.cljs$core$ILookup$_lookup$arity$2(this, c);
      case 3:
        return this.cljs$core$ILookup$_lookup$arity$3(this, c, d)
    }
    throw Error("Invalid arity: " + arguments.length);
  }
}();
cljs.core.PersistentTreeSet.prototype.apply = function(a, b) {
  a = this;
  return a.call.apply(a, [a].concat(b.slice()))
};
cljs.core.PersistentTreeSet.prototype.cljs$core$ICollection$_conj$arity$2 = function(a, b) {
  return new cljs.core.PersistentTreeSet(this.meta, cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(this.tree_map, b, null), null)
};
cljs.core.PersistentTreeSet.prototype.cljs$core$IReversible$_rseq$arity$1 = function() {
  return cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.key, cljs.core.rseq(this.tree_map))
};
cljs.core.PersistentTreeSet.prototype.toString = function() {
  return cljs.core.pr_str_STAR_(this)
};
cljs.core.PersistentTreeSet.prototype.cljs$core$ISorted$_sorted_seq$arity$2 = function(a, b) {
  return cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.key, cljs.core._sorted_seq(this.tree_map, b))
};
cljs.core.PersistentTreeSet.prototype.cljs$core$ISorted$_sorted_seq_from$arity$3 = function(a, b, c) {
  return cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.key, cljs.core._sorted_seq_from(this.tree_map, b, c))
};
cljs.core.PersistentTreeSet.prototype.cljs$core$ISorted$_entry_key$arity$2 = function(a, b) {
  return b
};
cljs.core.PersistentTreeSet.prototype.cljs$core$ISorted$_comparator$arity$1 = function() {
  return cljs.core._comparator(this.tree_map)
};
cljs.core.PersistentTreeSet.prototype.cljs$core$ISeqable$_seq$arity$1 = function() {
  return cljs.core.keys(this.tree_map)
};
cljs.core.PersistentTreeSet.prototype.cljs$core$ISet$_disjoin$arity$2 = function(a, b) {
  return new cljs.core.PersistentTreeSet(this.meta, cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(this.tree_map, b), null)
};
cljs.core.PersistentTreeSet.prototype.cljs$core$ICounted$_count$arity$1 = function() {
  return cljs.core.count(this.tree_map)
};
cljs.core.PersistentTreeSet.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(a, b) {
  var c = cljs.core.set_QMARK_(b);
  return c ? (c = cljs.core.count(a) === cljs.core.count(b)) ? cljs.core.every_QMARK_(function(b) {
    return cljs.core.contains_QMARK_(a, b)
  }, b) : c : c
};
cljs.core.PersistentTreeSet.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(a, b) {
  return new cljs.core.PersistentTreeSet(b, this.tree_map, this.__hash)
};
cljs.core.PersistentTreeSet.prototype.cljs$core$IMeta$_meta$arity$1 = function() {
  return this.meta
};
cljs.core.PersistentTreeSet.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function() {
  return cljs.core.with_meta(cljs.core.PersistentTreeSet.EMPTY, this.meta)
};
cljs.core.__GT_PersistentTreeSet = function(a, b, c) {
  return new cljs.core.PersistentTreeSet(a, b, c)
};
cljs.core.PersistentTreeSet.EMPTY = new cljs.core.PersistentTreeSet(null, cljs.core.PersistentTreeMap.EMPTY, 0);
cljs.core.hash_set = function() {
  var a = null, b = function() {
    return cljs.core.PersistentHashSet.EMPTY
  }, c = function(a) {
    var b = a instanceof cljs.core.IndexedSeq;
    if(b ? a.arr.length < cljs.core.PersistentArrayMap.HASHMAP_THRESHOLD : b) {
      for(var a = a.arr, b = a.length, c = Array(2 * b), d = 0;;) {
        if(d < b) {
          var i = 2 * d;
          c[i] = a[d];
          c[i + 1] = null;
          d += 1
        }else {
          return cljs.core.PersistentHashSet.fromArray.cljs$core$IFn$_invoke$arity$2 ? cljs.core.PersistentHashSet.fromArray.cljs$core$IFn$_invoke$arity$2(c, !0) : cljs.core.PersistentHashSet.fromArray.call(null, c, !0)
        }
      }
    }else {
      for(c = cljs.core._as_transient(cljs.core.PersistentHashSet.EMPTY);;) {
        if(null != a) {
          b = a.cljs$core$INext$_next$arity$1(a), c = c.cljs$core$ITransientCollection$_conj_BANG_$arity$2(c, a.cljs$core$ISeq$_first$arity$1(a)), a = b
        }else {
          return c.cljs$core$ITransientCollection$_persistent_BANG_$arity$1(c)
        }
      }
    }
  }, d = function(a) {
    var b = null;
    0 < arguments.length && (b = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0));
    return c.call(this, b)
  };
  d.cljs$lang$maxFixedArity = 0;
  d.cljs$lang$applyTo = function(a) {
    a = cljs.core.seq(a);
    return c(a)
  };
  d.cljs$core$IFn$_invoke$arity$variadic = c;
  a = function(a) {
    switch(arguments.length) {
      case 0:
        return b.call(this);
      default:
        return d.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(arguments, 0))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 0;
  a.cljs$lang$applyTo = d.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$0 = b;
  a.cljs$core$IFn$_invoke$arity$variadic = d.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
cljs.core.set = function(a) {
  return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_set, a)
};
cljs.core.sorted_set = function() {
  var a = function(a) {
    return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core._conj, cljs.core.PersistentTreeSet.EMPTY, a)
  }, b = function(b) {
    var d = null;
    0 < arguments.length && (d = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0));
    return a.call(this, d)
  };
  b.cljs$lang$maxFixedArity = 0;
  b.cljs$lang$applyTo = function(b) {
    b = cljs.core.seq(b);
    return a(b)
  };
  b.cljs$core$IFn$_invoke$arity$variadic = a;
  return b
}();
cljs.core.sorted_set_by = function() {
  var a = function(a, b) {
    return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core._conj, new cljs.core.PersistentTreeSet(null, cljs.core.sorted_map_by(a), 0), b)
  }, b = function(b, d) {
    var e = null;
    1 < arguments.length && (e = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0));
    return a.call(this, b, e)
  };
  b.cljs$lang$maxFixedArity = 1;
  b.cljs$lang$applyTo = function(b) {
    var d = cljs.core.first(b), b = cljs.core.rest(b);
    return a(d, b)
  };
  b.cljs$core$IFn$_invoke$arity$variadic = a;
  return b
}();
cljs.core.replace = function(a, b) {
  if(cljs.core.vector_QMARK_(b)) {
    var c = cljs.core.count(b);
    return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(function(b, c) {
      var f = cljs.core.find(a, cljs.core.nth.cljs$core$IFn$_invoke$arity$2(b, c));
      return cljs.core.truth_(f) ? cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(b, c, cljs.core.second(f)) : b
    }, b, cljs.core.take(c, cljs.core.iterate(cljs.core.inc, 0)))
  }
  return cljs.core.map.cljs$core$IFn$_invoke$arity$2(function(b) {
    var c = cljs.core.find(a, b);
    return cljs.core.truth_(c) ? cljs.core.second(c) : b
  }, b)
};
cljs.core.distinct = function(a) {
  return function c(a, e) {
    return new cljs.core.LazySeq(null, !1, function() {
      return function(a, d) {
        for(;;) {
          var e = a, i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(e, 0, null);
          if(e = cljs.core.seq(e)) {
            if(cljs.core.contains_QMARK_(d, i)) {
              i = cljs.core.rest(e), e = d, a = i, d = e
            }else {
              return cljs.core.cons(i, c(cljs.core.rest(e), cljs.core.conj.cljs$core$IFn$_invoke$arity$2(d, i)))
            }
          }else {
            return null
          }
        }
      }.call(null, a, e)
    }, null)
  }(a, cljs.core.PersistentHashSet.EMPTY)
};
cljs.core.butlast = function(a) {
  for(var b = cljs.core.PersistentVector.EMPTY;;) {
    if(cljs.core.next(a)) {
      b = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(b, cljs.core.first(a)), a = cljs.core.next(a)
    }else {
      return cljs.core.seq(b)
    }
  }
};
cljs.core.name = function(a) {
  var b;
  a ? (b = (b = a.cljs$lang$protocol_mask$partition1$ & 4096) ? b : a.cljs$core$INamed$, b = b ? !0 : !1) : b = !1;
  if(b) {
    return a.cljs$core$INamed$_name$arity$1(a)
  }
  if(cljs.core.string_QMARK_(a)) {
    return a
  }
  if(cljs.core.keyword_QMARK_(a)) {
    return b = a.lastIndexOf("/", a.length - 2), 0 > b ? cljs.core.subs.cljs$core$IFn$_invoke$arity$2(a, 2) : cljs.core.subs.cljs$core$IFn$_invoke$arity$2(a, b + 1)
  }
  throw Error([cljs.core.str("Doesn't support name: "), cljs.core.str(a)].join(""));
};
cljs.core.namespace = function(a) {
  var b;
  a ? (b = (b = a.cljs$lang$protocol_mask$partition1$ & 4096) ? b : a.cljs$core$INamed$, b = b ? !0 : !1) : b = !1;
  if(b) {
    return a.cljs$core$INamed$_namespace$arity$1(a)
  }
  if(cljs.core.keyword_QMARK_(a)) {
    return b = a.lastIndexOf("/", a.length - 2), -1 < b ? cljs.core.subs.cljs$core$IFn$_invoke$arity$3(a, 2, b) : null
  }
  throw Error([cljs.core.str("Doesn't support namespace: "), cljs.core.str(a)].join(""));
};
cljs.core.zipmap = function(a, b) {
  for(var c = cljs.core.transient$(cljs.core.PersistentArrayMap.EMPTY), d = cljs.core.seq(a), e = cljs.core.seq(b);;) {
    var f;
    f = (f = d) ? e : f;
    if(f) {
      c = cljs.core.assoc_BANG_(c, cljs.core.first(d), cljs.core.first(e)), d = cljs.core.next(d), e = cljs.core.next(e)
    }else {
      return cljs.core.persistent_BANG_(c)
    }
  }
};
cljs.core.max_key = function() {
  var a = null, b = function(a, b, c) {
    return(a.cljs$core$IFn$_invoke$arity$1 ? a.cljs$core$IFn$_invoke$arity$1(b) : a.call(null, b)) > (a.cljs$core$IFn$_invoke$arity$1 ? a.cljs$core$IFn$_invoke$arity$1(c) : a.call(null, c)) ? b : c
  }, c = function(b, c, d, h) {
    return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(function(c, d) {
      return a.cljs$core$IFn$_invoke$arity$3(b, c, d)
    }, a.cljs$core$IFn$_invoke$arity$3(b, c, d), h)
  }, d = function(a, b, d, h) {
    var i = null;
    3 < arguments.length && (i = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
    return c.call(this, a, b, d, i)
  };
  d.cljs$lang$maxFixedArity = 3;
  d.cljs$lang$applyTo = function(a) {
    var b = cljs.core.first(a), a = cljs.core.next(a), d = cljs.core.first(a), a = cljs.core.next(a), h = cljs.core.first(a), a = cljs.core.rest(a);
    return c(b, d, h, a)
  };
  d.cljs$core$IFn$_invoke$arity$variadic = c;
  a = function(a, c, g, h) {
    switch(arguments.length) {
      case 2:
        return c;
      case 3:
        return b.call(this, a, c, g);
      default:
        return d.cljs$core$IFn$_invoke$arity$variadic(a, c, g, cljs.core.array_seq(arguments, 3))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 3;
  a.cljs$lang$applyTo = d.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$2 = function(a, b) {
    return b
  };
  a.cljs$core$IFn$_invoke$arity$3 = b;
  a.cljs$core$IFn$_invoke$arity$variadic = d.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
cljs.core.min_key = function() {
  var a = null, b = function(a, b, c) {
    return(a.cljs$core$IFn$_invoke$arity$1 ? a.cljs$core$IFn$_invoke$arity$1(b) : a.call(null, b)) < (a.cljs$core$IFn$_invoke$arity$1 ? a.cljs$core$IFn$_invoke$arity$1(c) : a.call(null, c)) ? b : c
  }, c = function(b, c, d, h) {
    return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(function(c, d) {
      return a.cljs$core$IFn$_invoke$arity$3(b, c, d)
    }, a.cljs$core$IFn$_invoke$arity$3(b, c, d), h)
  }, d = function(a, b, d, h) {
    var i = null;
    3 < arguments.length && (i = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
    return c.call(this, a, b, d, i)
  };
  d.cljs$lang$maxFixedArity = 3;
  d.cljs$lang$applyTo = function(a) {
    var b = cljs.core.first(a), a = cljs.core.next(a), d = cljs.core.first(a), a = cljs.core.next(a), h = cljs.core.first(a), a = cljs.core.rest(a);
    return c(b, d, h, a)
  };
  d.cljs$core$IFn$_invoke$arity$variadic = c;
  a = function(a, c, g, h) {
    switch(arguments.length) {
      case 2:
        return c;
      case 3:
        return b.call(this, a, c, g);
      default:
        return d.cljs$core$IFn$_invoke$arity$variadic(a, c, g, cljs.core.array_seq(arguments, 3))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 3;
  a.cljs$lang$applyTo = d.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$2 = function(a, b) {
    return b
  };
  a.cljs$core$IFn$_invoke$arity$3 = b;
  a.cljs$core$IFn$_invoke$arity$variadic = d.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
cljs.core.partition_all = function() {
  var a = null, b = function(b, c) {
    return a.cljs$core$IFn$_invoke$arity$3(b, b, c)
  }, c = function(b, c, f) {
    return new cljs.core.LazySeq(null, !1, function() {
      var g = cljs.core.seq(f);
      return g ? cljs.core.cons(cljs.core.take(b, g), a.cljs$core$IFn$_invoke$arity$3(b, c, cljs.core.drop(c, g))) : null
    }, null)
  }, a = function(a, e, f) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, e);
      case 3:
        return c.call(this, a, e, f)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$3 = c;
  return a
}();
cljs.core.take_while = function take_while(b, c) {
  return new cljs.core.LazySeq(null, !1, function() {
    var d = cljs.core.seq(c);
    return d ? cljs.core.truth_(b.cljs$core$IFn$_invoke$arity$1 ? b.cljs$core$IFn$_invoke$arity$1(cljs.core.first(d)) : b.call(null, cljs.core.first(d))) ? cljs.core.cons(cljs.core.first(d), take_while(b, cljs.core.rest(d))) : null : null
  }, null)
};
cljs.core.mk_bound_fn = function(a, b, c) {
  return function(d) {
    var e = cljs.core._comparator(a);
    return b.cljs$core$IFn$_invoke$arity$2 ? b.cljs$core$IFn$_invoke$arity$2(e.cljs$core$IFn$_invoke$arity$2 ? e.cljs$core$IFn$_invoke$arity$2(cljs.core._entry_key(a, d), c) : e.call(null, cljs.core._entry_key(a, d), c), 0) : b.call(null, e.cljs$core$IFn$_invoke$arity$2 ? e.cljs$core$IFn$_invoke$arity$2(cljs.core._entry_key(a, d), c) : e.call(null, cljs.core._entry_key(a, d), c), 0)
  }
};
cljs.core.subseq = function() {
  var a = null, b = function(a, b, c) {
    var g = cljs.core.mk_bound_fn(a, b, c);
    return cljs.core.truth_(cljs.core.PersistentHashSet.fromArray([cljs.core._GT_, null, cljs.core._GT__EQ_, null], !0).call(null, b)) ? (a = cljs.core._sorted_seq_from(a, c, !0), cljs.core.truth_(a) ? (b = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(a, 0, null), cljs.core.truth_(g.cljs$core$IFn$_invoke$arity$1 ? g.cljs$core$IFn$_invoke$arity$1(b) : g.call(null, b)) ? a : cljs.core.next(a)) : null) : cljs.core.take_while(g, cljs.core._sorted_seq(a, !0))
  }, c = function(a, b, c, g, h) {
    var i = cljs.core._sorted_seq_from(a, c, !0);
    if(cljs.core.truth_(i)) {
      var j = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(i, 0, null);
      return cljs.core.take_while(cljs.core.mk_bound_fn(a, g, h), cljs.core.truth_(cljs.core.mk_bound_fn(a, b, c).call(null, j)) ? i : cljs.core.next(i))
    }
    return null
  }, a = function(a, e, f, g, h) {
    switch(arguments.length) {
      case 3:
        return b.call(this, a, e, f);
      case 5:
        return c.call(this, a, e, f, g, h)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$3 = b;
  a.cljs$core$IFn$_invoke$arity$5 = c;
  return a
}();
cljs.core.rsubseq = function() {
  var a = null, b = function(a, b, c) {
    var g = cljs.core.mk_bound_fn(a, b, c);
    return cljs.core.truth_(cljs.core.PersistentHashSet.fromArray([cljs.core._LT_, null, cljs.core._LT__EQ_, null], !0).call(null, b)) ? (a = cljs.core._sorted_seq_from(a, c, !1), cljs.core.truth_(a) ? (b = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(a, 0, null), cljs.core.truth_(g.cljs$core$IFn$_invoke$arity$1 ? g.cljs$core$IFn$_invoke$arity$1(b) : g.call(null, b)) ? a : cljs.core.next(a)) : null) : cljs.core.take_while(g, cljs.core._sorted_seq(a, !1))
  }, c = function(a, b, c, g, h) {
    var i = cljs.core._sorted_seq_from(a, h, !1);
    if(cljs.core.truth_(i)) {
      var j = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(i, 0, null);
      return cljs.core.take_while(cljs.core.mk_bound_fn(a, b, c), cljs.core.truth_(cljs.core.mk_bound_fn(a, g, h).call(null, j)) ? i : cljs.core.next(i))
    }
    return null
  }, a = function(a, e, f, g, h) {
    switch(arguments.length) {
      case 3:
        return b.call(this, a, e, f);
      case 5:
        return c.call(this, a, e, f, g, h)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$3 = b;
  a.cljs$core$IFn$_invoke$arity$5 = c;
  return a
}();
cljs.core.Range = function(a, b, c, d, e) {
  this.meta = a;
  this.start = b;
  this.end = c;
  this.step = d;
  this.__hash = e;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 32375006
};
cljs.core.Range.cljs$lang$type = !0;
cljs.core.Range.cljs$lang$ctorStr = "cljs.core/Range";
cljs.core.Range.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write(b, "cljs.core/Range")
};
cljs.core.Range.prototype.cljs$core$IHash$_hash$arity$1 = function(a) {
  var b = this.__hash;
  return null != b ? b : this.__hash = a = cljs.core.hash_coll(a)
};
cljs.core.Range.prototype.cljs$core$INext$_next$arity$1 = function() {
  return 0 < this.step ? this.start + this.step < this.end ? new cljs.core.Range(this.meta, this.start + this.step, this.end, this.step, null) : null : this.start + this.step > this.end ? new cljs.core.Range(this.meta, this.start + this.step, this.end, this.step, null) : null
};
cljs.core.Range.prototype.cljs$core$ICollection$_conj$arity$2 = function(a, b) {
  return cljs.core.cons(b, a)
};
cljs.core.Range.prototype.toString = function() {
  return cljs.core.pr_str_STAR_(this)
};
cljs.core.Range.prototype.cljs$core$IReduce$_reduce$arity$2 = function(a, b) {
  return cljs.core.ci_reduce.cljs$core$IFn$_invoke$arity$2(a, b)
};
cljs.core.Range.prototype.cljs$core$IReduce$_reduce$arity$3 = function(a, b, c) {
  return cljs.core.ci_reduce.cljs$core$IFn$_invoke$arity$3(a, b, c)
};
cljs.core.Range.prototype.cljs$core$ISeqable$_seq$arity$1 = function(a) {
  return 0 < this.step ? this.start < this.end ? a : null : this.start > this.end ? a : null
};
cljs.core.Range.prototype.cljs$core$ICounted$_count$arity$1 = function(a) {
  return cljs.core.not(a.cljs$core$ISeqable$_seq$arity$1(a)) ? 0 : Math.ceil((this.end - this.start) / this.step)
};
cljs.core.Range.prototype.cljs$core$ISeq$_first$arity$1 = function() {
  return this.start
};
cljs.core.Range.prototype.cljs$core$ISeq$_rest$arity$1 = function(a) {
  return null != a.cljs$core$ISeqable$_seq$arity$1(a) ? new cljs.core.Range(this.meta, this.start + this.step, this.end, this.step, null) : cljs.core.List.EMPTY
};
cljs.core.Range.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(a, b) {
  return cljs.core.equiv_sequential(a, b)
};
cljs.core.Range.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(a, b) {
  return new cljs.core.Range(b, this.start, this.end, this.step, this.__hash)
};
cljs.core.Range.prototype.cljs$core$IMeta$_meta$arity$1 = function() {
  return this.meta
};
cljs.core.Range.prototype.cljs$core$IIndexed$_nth$arity$2 = function(a, b) {
  if(b < a.cljs$core$ICounted$_count$arity$1(a)) {
    return this.start + b * this.step
  }
  var c;
  c = (c = this.start > this.end) ? 0 === this.step : c;
  if(c) {
    return this.start
  }
  throw Error("Index out of bounds");
};
cljs.core.Range.prototype.cljs$core$IIndexed$_nth$arity$3 = function(a, b, c) {
  if(b < a.cljs$core$ICounted$_count$arity$1(a)) {
    return this.start + b * this.step
  }
  a = (a = this.start > this.end) ? 0 === this.step : a;
  return a ? this.start : c
};
cljs.core.Range.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function() {
  return cljs.core.with_meta(cljs.core.List.EMPTY, this.meta)
};
cljs.core.__GT_Range = function(a, b, c, d, e) {
  return new cljs.core.Range(a, b, c, d, e)
};
cljs.core.range = function() {
  var a = null, b = function() {
    return a.cljs$core$IFn$_invoke$arity$3(0, Number.MAX_VALUE, 1)
  }, c = function(b) {
    return a.cljs$core$IFn$_invoke$arity$3(0, b, 1)
  }, d = function(b, c) {
    return a.cljs$core$IFn$_invoke$arity$3(b, c, 1)
  }, e = function(a, b, c) {
    return new cljs.core.Range(null, a, b, c, null)
  }, a = function(a, g, h) {
    switch(arguments.length) {
      case 0:
        return b.call(this);
      case 1:
        return c.call(this, a);
      case 2:
        return d.call(this, a, g);
      case 3:
        return e.call(this, a, g, h)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$0 = b;
  a.cljs$core$IFn$_invoke$arity$1 = c;
  a.cljs$core$IFn$_invoke$arity$2 = d;
  a.cljs$core$IFn$_invoke$arity$3 = e;
  return a
}();
cljs.core.take_nth = function take_nth(b, c) {
  return new cljs.core.LazySeq(null, !1, function() {
    var d = cljs.core.seq(c);
    return d ? cljs.core.cons(cljs.core.first(d), take_nth(b, cljs.core.drop(b, d))) : null
  }, null)
};
cljs.core.split_with = function(a, b) {
  return cljs.core.PersistentVector.fromArray([cljs.core.take_while(a, b), cljs.core.drop_while(a, b)], !0)
};
cljs.core.partition_by = function partition_by(b, c) {
  return new cljs.core.LazySeq(null, !1, function() {
    var d = cljs.core.seq(c);
    if(d) {
      var e = cljs.core.first(d), f = b.cljs$core$IFn$_invoke$arity$1 ? b.cljs$core$IFn$_invoke$arity$1(e) : b.call(null, e), e = cljs.core.cons(e, cljs.core.take_while(function(c, d) {
        return function(c) {
          return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(d, b.cljs$core$IFn$_invoke$arity$1 ? b.cljs$core$IFn$_invoke$arity$1(c) : b.call(null, c))
        }
      }(e, f), cljs.core.next(d)));
      return cljs.core.cons(e, partition_by(b, cljs.core.seq(cljs.core.drop(cljs.core.count(e), d))))
    }
    return null
  }, null)
};
cljs.core.frequencies = function(a) {
  return cljs.core.persistent_BANG_(cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(function(a, c) {
    return cljs.core.assoc_BANG_(a, c, cljs.core.get.cljs$core$IFn$_invoke$arity$3(a, c, 0) + 1)
  }, cljs.core.transient$(cljs.core.PersistentArrayMap.EMPTY), a))
};
cljs.core.reductions = function() {
  var a = null, b = function(b, c) {
    return new cljs.core.LazySeq(null, !1, function() {
      var f = cljs.core.seq(c);
      return f ? a.cljs$core$IFn$_invoke$arity$3(b, cljs.core.first(f), cljs.core.rest(f)) : cljs.core.list.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([b.cljs$core$IFn$_invoke$arity$0 ? b.cljs$core$IFn$_invoke$arity$0() : b.call(null)], 0))
    }, null)
  }, c = function(b, c, f) {
    return cljs.core.cons(c, new cljs.core.LazySeq(null, !1, function() {
      var g = cljs.core.seq(f);
      return g ? a.cljs$core$IFn$_invoke$arity$3(b, b.cljs$core$IFn$_invoke$arity$2 ? b.cljs$core$IFn$_invoke$arity$2(c, cljs.core.first(g)) : b.call(null, c, cljs.core.first(g)), cljs.core.rest(g)) : null
    }, null))
  }, a = function(a, e, f) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, e);
      case 3:
        return c.call(this, a, e, f)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$3 = c;
  return a
}();
cljs.core.juxt = function() {
  var a = null, b = function(a) {
    var b = null, c = function(b, c, d, e) {
      return cljs.core.vector.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.apply.cljs$core$IFn$_invoke$arity$5(a, b, c, d, e)], 0))
    }, d = function(a, b, d, e) {
      var f = null;
      3 < arguments.length && (f = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
      return c.call(this, a, b, d, f)
    };
    d.cljs$lang$maxFixedArity = 3;
    d.cljs$lang$applyTo = function(a) {
      var b = cljs.core.first(a), a = cljs.core.next(a), d = cljs.core.first(a), a = cljs.core.next(a), e = cljs.core.first(a), a = cljs.core.rest(a);
      return c(b, d, e, a)
    };
    d.cljs$core$IFn$_invoke$arity$variadic = c;
    b = function(b, c, e, f) {
      switch(arguments.length) {
        case 0:
          return cljs.core.vector.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([a.cljs$core$IFn$_invoke$arity$0 ? a.cljs$core$IFn$_invoke$arity$0() : a.call(null)], 0));
        case 1:
          return cljs.core.vector.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([a.cljs$core$IFn$_invoke$arity$1 ? a.cljs$core$IFn$_invoke$arity$1(b) : a.call(null, b)], 0));
        case 2:
          return cljs.core.vector.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([a.cljs$core$IFn$_invoke$arity$2 ? a.cljs$core$IFn$_invoke$arity$2(b, c) : a.call(null, b, c)], 0));
        case 3:
          return cljs.core.vector.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([a.cljs$core$IFn$_invoke$arity$3 ? a.cljs$core$IFn$_invoke$arity$3(b, c, e) : a.call(null, b, c, e)], 0));
        default:
          return d.cljs$core$IFn$_invoke$arity$variadic(b, c, e, cljs.core.array_seq(arguments, 3))
      }
      throw Error("Invalid arity: " + arguments.length);
    };
    b.cljs$lang$maxFixedArity = 3;
    b.cljs$lang$applyTo = d.cljs$lang$applyTo;
    return b
  }, c = function(a, b) {
    var c = null, d = function(c, d, e, f) {
      return cljs.core.vector.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.apply.cljs$core$IFn$_invoke$arity$5(a, c, d, e, f), cljs.core.apply.cljs$core$IFn$_invoke$arity$5(b, c, d, e, f)], 0))
    }, e = function(a, b, c, e) {
      var f = null;
      3 < arguments.length && (f = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
      return d.call(this, a, b, c, f)
    };
    e.cljs$lang$maxFixedArity = 3;
    e.cljs$lang$applyTo = function(a) {
      var b = cljs.core.first(a), a = cljs.core.next(a), c = cljs.core.first(a), a = cljs.core.next(a), e = cljs.core.first(a), a = cljs.core.rest(a);
      return d(b, c, e, a)
    };
    e.cljs$core$IFn$_invoke$arity$variadic = d;
    c = function(c, d, f, i) {
      switch(arguments.length) {
        case 0:
          return cljs.core.vector.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([a.cljs$core$IFn$_invoke$arity$0 ? a.cljs$core$IFn$_invoke$arity$0() : a.call(null), b.cljs$core$IFn$_invoke$arity$0 ? b.cljs$core$IFn$_invoke$arity$0() : b.call(null)], 0));
        case 1:
          return cljs.core.vector.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([a.cljs$core$IFn$_invoke$arity$1 ? a.cljs$core$IFn$_invoke$arity$1(c) : a.call(null, c), b.cljs$core$IFn$_invoke$arity$1 ? b.cljs$core$IFn$_invoke$arity$1(c) : b.call(null, c)], 0));
        case 2:
          return cljs.core.vector.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([a.cljs$core$IFn$_invoke$arity$2 ? a.cljs$core$IFn$_invoke$arity$2(c, d) : a.call(null, c, d), b.cljs$core$IFn$_invoke$arity$2 ? b.cljs$core$IFn$_invoke$arity$2(c, d) : b.call(null, c, d)], 0));
        case 3:
          return cljs.core.vector.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([a.cljs$core$IFn$_invoke$arity$3 ? a.cljs$core$IFn$_invoke$arity$3(c, d, f) : a.call(null, c, d, f), b.cljs$core$IFn$_invoke$arity$3 ? b.cljs$core$IFn$_invoke$arity$3(c, d, f) : b.call(null, c, d, f)], 0));
        default:
          return e.cljs$core$IFn$_invoke$arity$variadic(c, d, f, cljs.core.array_seq(arguments, 3))
      }
      throw Error("Invalid arity: " + arguments.length);
    };
    c.cljs$lang$maxFixedArity = 3;
    c.cljs$lang$applyTo = e.cljs$lang$applyTo;
    return c
  }, d = function(a, b, c) {
    var d = null, e = function(d, e, f, j) {
      return cljs.core.vector.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.apply.cljs$core$IFn$_invoke$arity$5(a, d, e, f, j), cljs.core.apply.cljs$core$IFn$_invoke$arity$5(b, d, e, f, j), cljs.core.apply.cljs$core$IFn$_invoke$arity$5(c, d, e, f, j)], 0))
    }, f = function(a, b, c, d) {
      var f = null;
      3 < arguments.length && (f = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
      return e.call(this, a, b, c, f)
    };
    f.cljs$lang$maxFixedArity = 3;
    f.cljs$lang$applyTo = function(a) {
      var b = cljs.core.first(a), a = cljs.core.next(a), c = cljs.core.first(a), a = cljs.core.next(a), d = cljs.core.first(a), a = cljs.core.rest(a);
      return e(b, c, d, a)
    };
    f.cljs$core$IFn$_invoke$arity$variadic = e;
    d = function(d, e, j, k) {
      switch(arguments.length) {
        case 0:
          return cljs.core.vector.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([a.cljs$core$IFn$_invoke$arity$0 ? a.cljs$core$IFn$_invoke$arity$0() : a.call(null), b.cljs$core$IFn$_invoke$arity$0 ? b.cljs$core$IFn$_invoke$arity$0() : b.call(null), c.cljs$core$IFn$_invoke$arity$0 ? c.cljs$core$IFn$_invoke$arity$0() : c.call(null)], 0));
        case 1:
          return cljs.core.vector.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([a.cljs$core$IFn$_invoke$arity$1 ? a.cljs$core$IFn$_invoke$arity$1(d) : a.call(null, d), b.cljs$core$IFn$_invoke$arity$1 ? b.cljs$core$IFn$_invoke$arity$1(d) : b.call(null, d), c.cljs$core$IFn$_invoke$arity$1 ? c.cljs$core$IFn$_invoke$arity$1(d) : c.call(null, d)], 0));
        case 2:
          return cljs.core.vector.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([a.cljs$core$IFn$_invoke$arity$2 ? a.cljs$core$IFn$_invoke$arity$2(d, e) : a.call(null, d, e), b.cljs$core$IFn$_invoke$arity$2 ? b.cljs$core$IFn$_invoke$arity$2(d, e) : b.call(null, d, e), c.cljs$core$IFn$_invoke$arity$2 ? c.cljs$core$IFn$_invoke$arity$2(d, e) : c.call(null, d, e)], 0));
        case 3:
          return cljs.core.vector.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([a.cljs$core$IFn$_invoke$arity$3 ? a.cljs$core$IFn$_invoke$arity$3(d, e, j) : a.call(null, d, e, j), b.cljs$core$IFn$_invoke$arity$3 ? b.cljs$core$IFn$_invoke$arity$3(d, e, j) : b.call(null, d, e, j), c.cljs$core$IFn$_invoke$arity$3 ? c.cljs$core$IFn$_invoke$arity$3(d, e, j) : c.call(null, d, e, j)], 0));
        default:
          return f.cljs$core$IFn$_invoke$arity$variadic(d, e, j, cljs.core.array_seq(arguments, 3))
      }
      throw Error("Invalid arity: " + arguments.length);
    };
    d.cljs$lang$maxFixedArity = 3;
    d.cljs$lang$applyTo = f.cljs$lang$applyTo;
    return d
  }, e = function(a, b, c, d) {
    var e = cljs.core.list_STAR_.cljs$core$IFn$_invoke$arity$4(a, b, c, d), a = null, f = function(a, b, c, d) {
      return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(function(e, f) {
        return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(e, cljs.core.apply.cljs$core$IFn$_invoke$arity$5(f, a, b, c, d))
      }, cljs.core.PersistentVector.EMPTY, e)
    }, l = function(a, b, c, d) {
      var e = null;
      3 < arguments.length && (e = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
      return f.call(this, a, b, c, e)
    };
    l.cljs$lang$maxFixedArity = 3;
    l.cljs$lang$applyTo = function(a) {
      var b = cljs.core.first(a), a = cljs.core.next(a), c = cljs.core.first(a), a = cljs.core.next(a), d = cljs.core.first(a), a = cljs.core.rest(a);
      return f(b, c, d, a)
    };
    l.cljs$core$IFn$_invoke$arity$variadic = f;
    a = function(a, b, c, d) {
      switch(arguments.length) {
        case 0:
          return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(function(a, b) {
            return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(a, b.cljs$core$IFn$_invoke$arity$0 ? b.cljs$core$IFn$_invoke$arity$0() : b.call(null))
          }, cljs.core.PersistentVector.EMPTY, e);
        case 1:
          var f = a;
          return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(function(a, b) {
            return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(a, b.cljs$core$IFn$_invoke$arity$1 ? b.cljs$core$IFn$_invoke$arity$1(f) : b.call(null, f))
          }, cljs.core.PersistentVector.EMPTY, e);
        case 2:
          var h = a, g = b;
          return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(function(a, b) {
            return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(a, b.cljs$core$IFn$_invoke$arity$2 ? b.cljs$core$IFn$_invoke$arity$2(h, g) : b.call(null, h, g))
          }, cljs.core.PersistentVector.EMPTY, e);
        case 3:
          var i = a, j = b, m = c;
          return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(function(a, b) {
            return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(a, b.cljs$core$IFn$_invoke$arity$3 ? b.cljs$core$IFn$_invoke$arity$3(i, j, m) : b.call(null, i, j, m))
          }, cljs.core.PersistentVector.EMPTY, e);
        default:
          return l.cljs$core$IFn$_invoke$arity$variadic(a, b, c, cljs.core.array_seq(arguments, 3))
      }
      throw Error("Invalid arity: " + arguments.length);
    };
    a.cljs$lang$maxFixedArity = 3;
    a.cljs$lang$applyTo = l.cljs$lang$applyTo;
    return a
  }, f = function(a, b, c, d) {
    var f = null;
    3 < arguments.length && (f = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
    return e.call(this, a, b, c, f)
  };
  f.cljs$lang$maxFixedArity = 3;
  f.cljs$lang$applyTo = function(a) {
    var b = cljs.core.first(a), a = cljs.core.next(a), c = cljs.core.first(a), a = cljs.core.next(a), d = cljs.core.first(a), a = cljs.core.rest(a);
    return e(b, c, d, a)
  };
  f.cljs$core$IFn$_invoke$arity$variadic = e;
  a = function(a, e, i, j) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, e);
      case 3:
        return d.call(this, a, e, i);
      default:
        return f.cljs$core$IFn$_invoke$arity$variadic(a, e, i, cljs.core.array_seq(arguments, 3))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 3;
  a.cljs$lang$applyTo = f.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$2 = c;
  a.cljs$core$IFn$_invoke$arity$3 = d;
  a.cljs$core$IFn$_invoke$arity$variadic = f.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
cljs.core.dorun = function() {
  var a = null, b = function(a) {
    for(;;) {
      if(cljs.core.seq(a)) {
        a = cljs.core.next(a)
      }else {
        return null
      }
    }
  }, c = function(a, b) {
    for(;;) {
      if(cljs.core.truth_(function() {
        var c = cljs.core.seq(b);
        return c ? 0 < a : c
      }())) {
        var c = a - 1, g = cljs.core.next(b), a = c, b = g
      }else {
        return null
      }
    }
  }, a = function(a, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, e)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$2 = c;
  return a
}();
cljs.core.doall = function() {
  var a = null, b = function(a) {
    cljs.core.dorun.cljs$core$IFn$_invoke$arity$1(a);
    return a
  }, c = function(a, b) {
    cljs.core.dorun.cljs$core$IFn$_invoke$arity$2(a, b);
    return b
  }, a = function(a, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, e)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$2 = c;
  return a
}();
cljs.core.regexp_QMARK_ = function(a) {
  return a instanceof RegExp
};
cljs.core.re_matches = function(a, b) {
  var c = a.exec(b);
  return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.first(c), b) ? 1 === cljs.core.count(c) ? cljs.core.first(c) : cljs.core.vec(c) : null
};
cljs.core.re_find = function(a, b) {
  var c = a.exec(b);
  return null == c ? null : 1 === cljs.core.count(c) ? cljs.core.first(c) : cljs.core.vec(c)
};
cljs.core.re_seq = function re_seq(b, c) {
  var d = cljs.core.re_find(b, c), e = c.search(b), f = cljs.core.coll_QMARK_(d) ? cljs.core.first(d) : d, g = cljs.core.subs.cljs$core$IFn$_invoke$arity$2(c, e + cljs.core.count(f));
  return cljs.core.truth_(d) ? new cljs.core.LazySeq(null, !1, function() {
    return cljs.core.cons(d, re_seq(b, g))
  }, null) : null
};
cljs.core.re_pattern = function(a) {
  var b = cljs.core.re_find(/^(?:\(\?([idmsux]*)\))?(.*)/, a);
  cljs.core.nth.cljs$core$IFn$_invoke$arity$3(b, 0, null);
  a = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(b, 1, null);
  b = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(b, 2, null);
  return RegExp(b, a)
};
cljs.core.pr_sequential_writer = function(a, b, c, d, e, f, g) {
  cljs.core._write(a, c);
  cljs.core.seq(g) && (b.cljs$core$IFn$_invoke$arity$3 ? b.cljs$core$IFn$_invoke$arity$3(cljs.core.first(g), a, f) : b.call(null, cljs.core.first(g), a, f));
  for(var c = cljs.core.seq(cljs.core.next(g)), g = null, h = 0, i = 0;;) {
    if(i < h) {
      var j = g.cljs$core$IIndexed$_nth$arity$2(g, i);
      cljs.core._write(a, d);
      b.cljs$core$IFn$_invoke$arity$3 ? b.cljs$core$IFn$_invoke$arity$3(j, a, f) : b.call(null, j, a, f);
      i += 1
    }else {
      if(c = cljs.core.seq(c)) {
        g = c, cljs.core.chunked_seq_QMARK_(g) ? (c = cljs.core.chunk_first(g), i = cljs.core.chunk_rest(g), g = c, h = cljs.core.count(c), c = i) : (c = cljs.core.first(g), cljs.core._write(a, d), b.cljs$core$IFn$_invoke$arity$3 ? b.cljs$core$IFn$_invoke$arity$3(c, a, f) : b.call(null, c, a, f), c = cljs.core.next(g), g = null, h = 0), i = 0
      }else {
        break
      }
    }
  }
  return cljs.core._write(a, e)
};
cljs.core.write_all = function() {
  var a = function(a, b) {
    for(var e = cljs.core.seq(b), f = null, g = 0, h = 0;;) {
      if(h < g) {
        var i = f.cljs$core$IIndexed$_nth$arity$2(f, h);
        cljs.core._write(a, i);
        h += 1
      }else {
        if(e = cljs.core.seq(e)) {
          f = e, cljs.core.chunked_seq_QMARK_(f) ? (e = cljs.core.chunk_first(f), g = cljs.core.chunk_rest(f), f = e, i = cljs.core.count(e), e = g, g = i) : (i = cljs.core.first(f), cljs.core._write(a, i), e = cljs.core.next(f), f = null, g = 0), h = 0
        }else {
          return null
        }
      }
    }
  }, b = function(b, d) {
    var e = null;
    1 < arguments.length && (e = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0));
    return a.call(this, b, e)
  };
  b.cljs$lang$maxFixedArity = 1;
  b.cljs$lang$applyTo = function(b) {
    var d = cljs.core.first(b), b = cljs.core.rest(b);
    return a(d, b)
  };
  b.cljs$core$IFn$_invoke$arity$variadic = a;
  return b
}();
cljs.core.string_print = function(a) {
  cljs.core._STAR_print_fn_STAR_.cljs$core$IFn$_invoke$arity$1 ? cljs.core._STAR_print_fn_STAR_.cljs$core$IFn$_invoke$arity$1(a) : cljs.core._STAR_print_fn_STAR_.call(null, a);
  return null
};
cljs.core.flush = function() {
  return null
};
cljs.core.char_escapes = {'"':'\\"', "\\":"\\\\", "\b":"\\b", "\f":"\\f", "\n":"\\n", "\r":"\\r", "\t":"\\t"};
cljs.core.quote_string = function(a) {
  return[cljs.core.str('"'), cljs.core.str(a.replace(RegExp('[\\\\"\b\f\n\r\t]', "g"), function(a) {
    return cljs.core.char_escapes[a]
  })), cljs.core.str('"')].join("")
};
cljs.core.pr_writer = function pr_writer(b, c, d) {
  if(null == b) {
    return cljs.core._write(c, "nil")
  }
  if(void 0 === b) {
    return cljs.core._write(c, "#<undefined>")
  }
  cljs.core.truth_(function() {
    var c = cljs.core.get.cljs$core$IFn$_invoke$arity$2(d, "\ufdd0:meta");
    return cljs.core.truth_(c) ? (b ? (c = (c = b.cljs$lang$protocol_mask$partition0$ & 131072) ? c : b.cljs$core$IMeta$, c = c ? !0 : b.cljs$lang$protocol_mask$partition0$ ? !1 : cljs.core.type_satisfies_(cljs.core.IMeta, b)) : c = cljs.core.type_satisfies_(cljs.core.IMeta, b), cljs.core.truth_(c) ? cljs.core.meta(b) : c) : c
  }()) && (cljs.core._write(c, "^"), pr_writer(cljs.core.meta(b), c, d), cljs.core._write(c, " "));
  if(null == b) {
    return cljs.core._write(c, "nil")
  }
  if(b.cljs$lang$type) {
    return b.cljs$lang$ctorPrWriter(b, c, d)
  }
  var e;
  b ? (e = (e = b.cljs$lang$protocol_mask$partition0$ & 2147483648) ? e : b.cljs$core$IPrintWithWriter$, e = e ? !0 : !1) : e = !1;
  if(e) {
    return b.cljs$core$IPrintWithWriter$_pr_writer$arity$3(b, c, d)
  }
  e = cljs.core.type(b) === Boolean;
  if(e ? e : "number" === typeof b) {
    return cljs.core._write(c, "" + cljs.core.str(b))
  }
  if(b instanceof Array) {
    return cljs.core.pr_sequential_writer(c, pr_writer, "#<Array [", ", ", "]>", d, b)
  }
  if(goog.isString(b)) {
    return cljs.core.keyword_QMARK_(b) ? (cljs.core._write(c, ":"), e = cljs.core.namespace(b), cljs.core.truth_(e) && cljs.core.write_all.cljs$core$IFn$_invoke$arity$variadic(c, cljs.core.array_seq(["" + cljs.core.str(e), "/"], 0)), cljs.core._write(c, cljs.core.name(b))) : b instanceof cljs.core.Symbol ? (e = cljs.core.namespace(b), cljs.core.truth_(e) && cljs.core.write_all.cljs$core$IFn$_invoke$arity$variadic(c, cljs.core.array_seq(["" + cljs.core.str(e), "/"], 0)), cljs.core._write(c, cljs.core.name(b))) : 
    cljs.core.truth_((new cljs.core.Keyword("\ufdd0:readably")).call(null, d)) ? cljs.core._write(c, cljs.core.quote_string(b)) : cljs.core._write(c, b)
  }
  if(cljs.core.fn_QMARK_(b)) {
    return cljs.core.write_all.cljs$core$IFn$_invoke$arity$variadic(c, cljs.core.array_seq(["#<", "" + cljs.core.str(b), ">"], 0))
  }
  if(b instanceof Date) {
    return e = function(b, c) {
      for(var d = "" + cljs.core.str(b);;) {
        if(cljs.core.count(d) < c) {
          d = [cljs.core.str("0"), cljs.core.str(d)].join("")
        }else {
          return d
        }
      }
    }, cljs.core.write_all.cljs$core$IFn$_invoke$arity$variadic(c, cljs.core.array_seq(['#inst "', "" + cljs.core.str(b.getUTCFullYear()), "-", e(b.getUTCMonth() + 1, 2), "-", e(b.getUTCDate(), 2), "T", e(b.getUTCHours(), 2), ":", e(b.getUTCMinutes(), 2), ":", e(b.getUTCSeconds(), 2), ".", e(b.getUTCMilliseconds(), 3), "-", '00:00"'], 0))
  }
  cljs.core.truth_(cljs.core.regexp_QMARK_(b)) ? c = cljs.core.write_all.cljs$core$IFn$_invoke$arity$variadic(c, cljs.core.array_seq(['#"', b.source, '"'], 0)) : (b ? (e = (e = b.cljs$lang$protocol_mask$partition0$ & 2147483648) ? e : b.cljs$core$IPrintWithWriter$, e = e ? !0 : b.cljs$lang$protocol_mask$partition0$ ? !1 : cljs.core.type_satisfies_(cljs.core.IPrintWithWriter, b)) : e = cljs.core.type_satisfies_(cljs.core.IPrintWithWriter, b), c = e ? cljs.core._pr_writer(b, c, d) : cljs.core.write_all.cljs$core$IFn$_invoke$arity$variadic(c, 
  cljs.core.array_seq(["#<", "" + cljs.core.str(b), ">"], 0)));
  return c
};
cljs.core.pr_seq_writer = function(a, b, c) {
  cljs.core.pr_writer(cljs.core.first(a), b, c);
  for(var a = cljs.core.seq(cljs.core.next(a)), d = null, e = 0, f = 0;;) {
    if(f < e) {
      var g = d.cljs$core$IIndexed$_nth$arity$2(d, f);
      cljs.core._write(b, " ");
      cljs.core.pr_writer(g, b, c);
      f += 1
    }else {
      if(a = cljs.core.seq(a)) {
        d = a, cljs.core.chunked_seq_QMARK_(d) ? (a = cljs.core.chunk_first(d), e = cljs.core.chunk_rest(d), d = a, g = cljs.core.count(a), a = e, e = g) : (g = cljs.core.first(d), cljs.core._write(b, " "), cljs.core.pr_writer(g, b, c), a = cljs.core.next(d), d = null, e = 0), f = 0
      }else {
        return null
      }
    }
  }
};
cljs.core.pr_sb_with_opts = function(a, b) {
  var c = new goog.string.StringBuffer, d = new cljs.core.StringBufferWriter(c);
  cljs.core.pr_seq_writer(a, d, b);
  cljs.core._flush(d);
  return c
};
cljs.core.pr_str_with_opts = function(a, b) {
  return cljs.core.empty_QMARK_(a) ? "" : "" + cljs.core.str(cljs.core.pr_sb_with_opts(a, b))
};
cljs.core.prn_str_with_opts = function(a, b) {
  if(cljs.core.empty_QMARK_(a)) {
    return"\n"
  }
  var c = cljs.core.pr_sb_with_opts(a, b);
  c.append("\n");
  return"" + cljs.core.str(c)
};
cljs.core.pr_with_opts = function(a, b) {
  return cljs.core.string_print(cljs.core.pr_str_with_opts(a, b))
};
cljs.core.newline = function(a) {
  cljs.core.string_print("\n");
  return cljs.core.truth_(cljs.core.get.cljs$core$IFn$_invoke$arity$2(a, "\ufdd0:flush-on-newline")) ? cljs.core.flush() : null
};
cljs.core.pr_str = function() {
  var a = function(a) {
    return cljs.core.pr_str_with_opts(a, cljs.core.pr_opts())
  }, b = function(b) {
    var d = null;
    0 < arguments.length && (d = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0));
    return a.call(this, d)
  };
  b.cljs$lang$maxFixedArity = 0;
  b.cljs$lang$applyTo = function(b) {
    b = cljs.core.seq(b);
    return a(b)
  };
  b.cljs$core$IFn$_invoke$arity$variadic = a;
  return b
}();
cljs.core.prn_str = function() {
  var a = function(a) {
    return cljs.core.prn_str_with_opts(a, cljs.core.pr_opts())
  }, b = function(b) {
    var d = null;
    0 < arguments.length && (d = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0));
    return a.call(this, d)
  };
  b.cljs$lang$maxFixedArity = 0;
  b.cljs$lang$applyTo = function(b) {
    b = cljs.core.seq(b);
    return a(b)
  };
  b.cljs$core$IFn$_invoke$arity$variadic = a;
  return b
}();
cljs.core.pr = function() {
  var a = function(a) {
    return cljs.core.pr_with_opts(a, cljs.core.pr_opts())
  }, b = function(b) {
    var d = null;
    0 < arguments.length && (d = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0));
    return a.call(this, d)
  };
  b.cljs$lang$maxFixedArity = 0;
  b.cljs$lang$applyTo = function(b) {
    b = cljs.core.seq(b);
    return a(b)
  };
  b.cljs$core$IFn$_invoke$arity$variadic = a;
  return b
}();
cljs.core.print = function() {
  var a = function(a) {
    return cljs.core.pr_with_opts(a, cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.core.pr_opts(), "\ufdd0:readably", !1))
  }, b = function(b) {
    var d = null;
    0 < arguments.length && (d = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0));
    return a.call(this, d)
  };
  b.cljs$lang$maxFixedArity = 0;
  b.cljs$lang$applyTo = function(b) {
    b = cljs.core.seq(b);
    return a(b)
  };
  b.cljs$core$IFn$_invoke$arity$variadic = a;
  return b
}();
cljs.core.print_str = function() {
  var a = function(a) {
    return cljs.core.pr_str_with_opts(a, cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.core.pr_opts(), "\ufdd0:readably", !1))
  }, b = function(b) {
    var d = null;
    0 < arguments.length && (d = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0));
    return a.call(this, d)
  };
  b.cljs$lang$maxFixedArity = 0;
  b.cljs$lang$applyTo = function(b) {
    b = cljs.core.seq(b);
    return a(b)
  };
  b.cljs$core$IFn$_invoke$arity$variadic = a;
  return b
}();
cljs.core.println = function() {
  var a = function(a) {
    cljs.core.pr_with_opts(a, cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.core.pr_opts(), "\ufdd0:readably", !1));
    return cljs.core.newline(cljs.core.pr_opts())
  }, b = function(b) {
    var d = null;
    0 < arguments.length && (d = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0));
    return a.call(this, d)
  };
  b.cljs$lang$maxFixedArity = 0;
  b.cljs$lang$applyTo = function(b) {
    b = cljs.core.seq(b);
    return a(b)
  };
  b.cljs$core$IFn$_invoke$arity$variadic = a;
  return b
}();
cljs.core.println_str = function() {
  var a = function(a) {
    return cljs.core.prn_str_with_opts(a, cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(cljs.core.pr_opts(), "\ufdd0:readably", !1))
  }, b = function(b) {
    var d = null;
    0 < arguments.length && (d = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0));
    return a.call(this, d)
  };
  b.cljs$lang$maxFixedArity = 0;
  b.cljs$lang$applyTo = function(b) {
    b = cljs.core.seq(b);
    return a(b)
  };
  b.cljs$core$IFn$_invoke$arity$variadic = a;
  return b
}();
cljs.core.prn = function() {
  var a = function(a) {
    cljs.core.pr_with_opts(a, cljs.core.pr_opts());
    return cljs.core.newline(cljs.core.pr_opts())
  }, b = function(b) {
    var d = null;
    0 < arguments.length && (d = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0));
    return a.call(this, d)
  };
  b.cljs$lang$maxFixedArity = 0;
  b.cljs$lang$applyTo = function(b) {
    b = cljs.core.seq(b);
    return a(b)
  };
  b.cljs$core$IFn$_invoke$arity$variadic = a;
  return b
}();
cljs.core.printf = function() {
  var a = function(a, b) {
    return cljs.core.print.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.apply.cljs$core$IFn$_invoke$arity$3(cljs.core.format, a, b)], 0))
  }, b = function(b, d) {
    var e = null;
    1 < arguments.length && (e = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0));
    return a.call(this, b, e)
  };
  b.cljs$lang$maxFixedArity = 1;
  b.cljs$lang$applyTo = function(b) {
    var d = cljs.core.first(b), b = cljs.core.rest(b);
    return a(d, b)
  };
  b.cljs$core$IFn$_invoke$arity$variadic = a;
  return b
}();
cljs.core.KeySeq.prototype.cljs$core$IPrintWithWriter$ = !0;
cljs.core.KeySeq.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = function(a, b, c) {
  return cljs.core.pr_sequential_writer(b, cljs.core.pr_writer, "(", " ", ")", c, a)
};
cljs.core.IndexedSeq.prototype.cljs$core$IPrintWithWriter$ = !0;
cljs.core.IndexedSeq.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = function(a, b, c) {
  return cljs.core.pr_sequential_writer(b, cljs.core.pr_writer, "(", " ", ")", c, a)
};
cljs.core.Subvec.prototype.cljs$core$IPrintWithWriter$ = !0;
cljs.core.Subvec.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = function(a, b, c) {
  return cljs.core.pr_sequential_writer(b, cljs.core.pr_writer, "[", " ", "]", c, a)
};
cljs.core.ChunkedCons.prototype.cljs$core$IPrintWithWriter$ = !0;
cljs.core.ChunkedCons.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = function(a, b, c) {
  return cljs.core.pr_sequential_writer(b, cljs.core.pr_writer, "(", " ", ")", c, a)
};
cljs.core.PersistentTreeMap.prototype.cljs$core$IPrintWithWriter$ = !0;
cljs.core.PersistentTreeMap.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = function(a, b, c) {
  return cljs.core.pr_sequential_writer(b, function(a) {
    return cljs.core.pr_sequential_writer(b, cljs.core.pr_writer, "", " ", "", c, a)
  }, "{", ", ", "}", c, a)
};
cljs.core.PersistentArrayMap.prototype.cljs$core$IPrintWithWriter$ = !0;
cljs.core.PersistentArrayMap.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = function(a, b, c) {
  return cljs.core.pr_sequential_writer(b, function(a) {
    return cljs.core.pr_sequential_writer(b, cljs.core.pr_writer, "", " ", "", c, a)
  }, "{", ", ", "}", c, a)
};
cljs.core.PersistentQueue.prototype.cljs$core$IPrintWithWriter$ = !0;
cljs.core.PersistentQueue.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = function(a, b, c) {
  return cljs.core.pr_sequential_writer(b, cljs.core.pr_writer, "#queue [", " ", "]", c, cljs.core.seq(a))
};
cljs.core.LazySeq.prototype.cljs$core$IPrintWithWriter$ = !0;
cljs.core.LazySeq.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = function(a, b, c) {
  return cljs.core.pr_sequential_writer(b, cljs.core.pr_writer, "(", " ", ")", c, a)
};
cljs.core.RSeq.prototype.cljs$core$IPrintWithWriter$ = !0;
cljs.core.RSeq.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = function(a, b, c) {
  return cljs.core.pr_sequential_writer(b, cljs.core.pr_writer, "(", " ", ")", c, a)
};
cljs.core.PersistentTreeSet.prototype.cljs$core$IPrintWithWriter$ = !0;
cljs.core.PersistentTreeSet.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = function(a, b, c) {
  return cljs.core.pr_sequential_writer(b, cljs.core.pr_writer, "#{", " ", "}", c, a)
};
cljs.core.NodeSeq.prototype.cljs$core$IPrintWithWriter$ = !0;
cljs.core.NodeSeq.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = function(a, b, c) {
  return cljs.core.pr_sequential_writer(b, cljs.core.pr_writer, "(", " ", ")", c, a)
};
cljs.core.RedNode.prototype.cljs$core$IPrintWithWriter$ = !0;
cljs.core.RedNode.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = function(a, b, c) {
  return cljs.core.pr_sequential_writer(b, cljs.core.pr_writer, "[", " ", "]", c, a)
};
cljs.core.ChunkedSeq.prototype.cljs$core$IPrintWithWriter$ = !0;
cljs.core.ChunkedSeq.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = function(a, b, c) {
  return cljs.core.pr_sequential_writer(b, cljs.core.pr_writer, "(", " ", ")", c, a)
};
cljs.core.PersistentHashMap.prototype.cljs$core$IPrintWithWriter$ = !0;
cljs.core.PersistentHashMap.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = function(a, b, c) {
  return cljs.core.pr_sequential_writer(b, function(a) {
    return cljs.core.pr_sequential_writer(b, cljs.core.pr_writer, "", " ", "", c, a)
  }, "{", ", ", "}", c, a)
};
cljs.core.PersistentHashSet.prototype.cljs$core$IPrintWithWriter$ = !0;
cljs.core.PersistentHashSet.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = function(a, b, c) {
  return cljs.core.pr_sequential_writer(b, cljs.core.pr_writer, "#{", " ", "}", c, a)
};
cljs.core.PersistentVector.prototype.cljs$core$IPrintWithWriter$ = !0;
cljs.core.PersistentVector.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = function(a, b, c) {
  return cljs.core.pr_sequential_writer(b, cljs.core.pr_writer, "[", " ", "]", c, a)
};
cljs.core.List.prototype.cljs$core$IPrintWithWriter$ = !0;
cljs.core.List.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = function(a, b, c) {
  return cljs.core.pr_sequential_writer(b, cljs.core.pr_writer, "(", " ", ")", c, a)
};
cljs.core.PersistentArrayMapSeq.prototype.cljs$core$IPrintWithWriter$ = !0;
cljs.core.PersistentArrayMapSeq.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = function(a, b, c) {
  return cljs.core.pr_sequential_writer(b, cljs.core.pr_writer, "(", " ", ")", c, a)
};
cljs.core.EmptyList.prototype.cljs$core$IPrintWithWriter$ = !0;
cljs.core.EmptyList.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = function(a, b) {
  return cljs.core._write(b, "()")
};
cljs.core.BlackNode.prototype.cljs$core$IPrintWithWriter$ = !0;
cljs.core.BlackNode.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = function(a, b, c) {
  return cljs.core.pr_sequential_writer(b, cljs.core.pr_writer, "[", " ", "]", c, a)
};
cljs.core.Cons.prototype.cljs$core$IPrintWithWriter$ = !0;
cljs.core.Cons.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = function(a, b, c) {
  return cljs.core.pr_sequential_writer(b, cljs.core.pr_writer, "(", " ", ")", c, a)
};
cljs.core.Range.prototype.cljs$core$IPrintWithWriter$ = !0;
cljs.core.Range.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = function(a, b, c) {
  return cljs.core.pr_sequential_writer(b, cljs.core.pr_writer, "(", " ", ")", c, a)
};
cljs.core.ArrayNodeSeq.prototype.cljs$core$IPrintWithWriter$ = !0;
cljs.core.ArrayNodeSeq.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = function(a, b, c) {
  return cljs.core.pr_sequential_writer(b, cljs.core.pr_writer, "(", " ", ")", c, a)
};
cljs.core.ValSeq.prototype.cljs$core$IPrintWithWriter$ = !0;
cljs.core.ValSeq.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = function(a, b, c) {
  return cljs.core.pr_sequential_writer(b, cljs.core.pr_writer, "(", " ", ")", c, a)
};
cljs.core.ObjMap.prototype.cljs$core$IPrintWithWriter$ = !0;
cljs.core.ObjMap.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = function(a, b, c) {
  return cljs.core.pr_sequential_writer(b, function(a) {
    return cljs.core.pr_sequential_writer(b, cljs.core.pr_writer, "", " ", "", c, a)
  }, "{", ", ", "}", c, a)
};
cljs.core.PersistentTreeMapSeq.prototype.cljs$core$IPrintWithWriter$ = !0;
cljs.core.PersistentTreeMapSeq.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = function(a, b, c) {
  return cljs.core.pr_sequential_writer(b, cljs.core.pr_writer, "(", " ", ")", c, a)
};
cljs.core.PersistentVector.prototype.cljs$core$IComparable$ = !0;
cljs.core.PersistentVector.prototype.cljs$core$IComparable$_compare$arity$2 = function(a, b) {
  return cljs.core.compare_indexed.cljs$core$IFn$_invoke$arity$2(a, b)
};
cljs.core.Subvec.prototype.cljs$core$IComparable$ = !0;
cljs.core.Subvec.prototype.cljs$core$IComparable$_compare$arity$2 = function(a, b) {
  return cljs.core.compare_indexed.cljs$core$IFn$_invoke$arity$2(a, b)
};
cljs.core.Atom = function(a, b, c, d) {
  this.state = a;
  this.meta = b;
  this.validator = c;
  this.watches = d;
  this.cljs$lang$protocol_mask$partition0$ = 2153938944;
  this.cljs$lang$protocol_mask$partition1$ = 2
};
cljs.core.Atom.cljs$lang$type = !0;
cljs.core.Atom.cljs$lang$ctorStr = "cljs.core/Atom";
cljs.core.Atom.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write(b, "cljs.core/Atom")
};
cljs.core.Atom.prototype.cljs$core$IHash$_hash$arity$1 = function(a) {
  return goog.getUid(a)
};
cljs.core.Atom.prototype.cljs$core$IWatchable$_notify_watches$arity$3 = function(a, b, c) {
  for(var d = cljs.core.seq(this.watches), e = null, f = 0, g = 0;;) {
    if(g < f) {
      var h = e.cljs$core$IIndexed$_nth$arity$2(e, g), i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(h, 0, null), h = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(h, 1, null);
      h.cljs$core$IFn$_invoke$arity$4 ? h.cljs$core$IFn$_invoke$arity$4(i, a, b, c) : h.call(null, i, a, b, c);
      g += 1
    }else {
      if(d = cljs.core.seq(d)) {
        cljs.core.chunked_seq_QMARK_(d) ? (e = cljs.core.chunk_first(d), d = cljs.core.chunk_rest(d), i = e, f = cljs.core.count(e), e = i) : (e = cljs.core.first(d), i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(e, 0, null), h = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(e, 1, null), h.cljs$core$IFn$_invoke$arity$4 ? h.cljs$core$IFn$_invoke$arity$4(i, a, b, c) : h.call(null, i, a, b, c), d = cljs.core.next(d), e = null, f = 0), g = 0
      }else {
        return null
      }
    }
  }
};
cljs.core.Atom.prototype.cljs$core$IWatchable$_add_watch$arity$3 = function(a, b, c) {
  return a.watches = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(this.watches, b, c)
};
cljs.core.Atom.prototype.cljs$core$IWatchable$_remove_watch$arity$2 = function(a, b) {
  return a.watches = cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(this.watches, b)
};
cljs.core.Atom.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = function(a, b, c) {
  cljs.core._write(b, "#<Atom: ");
  cljs.core.pr_writer(this.state, b, c);
  return cljs.core._write(b, ">")
};
cljs.core.Atom.prototype.cljs$core$IMeta$_meta$arity$1 = function() {
  return this.meta
};
cljs.core.Atom.prototype.cljs$core$IDeref$_deref$arity$1 = function() {
  return this.state
};
cljs.core.Atom.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(a, b) {
  return a === b
};
cljs.core.__GT_Atom = function(a, b, c, d) {
  return new cljs.core.Atom(a, b, c, d)
};
cljs.core.atom = function() {
  var a = null, b = function(a) {
    return new cljs.core.Atom(a, null, null, null)
  }, c = function(a, b) {
    var c = cljs.core.seq_QMARK_(b) ? cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map, b) : b, d = cljs.core.get.cljs$core$IFn$_invoke$arity$2(c, "\ufdd0:validator"), c = cljs.core.get.cljs$core$IFn$_invoke$arity$2(c, "\ufdd0:meta");
    return new cljs.core.Atom(a, c, d, null)
  }, d = function(a, b) {
    var d = null;
    1 < arguments.length && (d = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0));
    return c.call(this, a, d)
  };
  d.cljs$lang$maxFixedArity = 1;
  d.cljs$lang$applyTo = function(a) {
    var b = cljs.core.first(a), a = cljs.core.rest(a);
    return c(b, a)
  };
  d.cljs$core$IFn$_invoke$arity$variadic = c;
  a = function(a, c) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      default:
        return d.cljs$core$IFn$_invoke$arity$variadic(a, cljs.core.array_seq(arguments, 1))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 1;
  a.cljs$lang$applyTo = d.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$variadic = d.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
cljs.core.reset_BANG_ = function(a, b) {
  var c = a.validator;
  if(cljs.core.truth_(c) && !cljs.core.truth_(c.cljs$core$IFn$_invoke$arity$1 ? c.cljs$core$IFn$_invoke$arity$1(b) : c.call(null, b))) {
    throw Error([cljs.core.str("Assert failed: "), cljs.core.str("Validator rejected reference state"), cljs.core.str("\n"), cljs.core.str(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.list(new cljs.core.Symbol(null, "validate", "validate", 1233162959, null), new cljs.core.Symbol(null, "new-value", "new-value", 972165309, null))], 0)))].join(""));
  }
  c = a.state;
  a.state = b;
  cljs.core._notify_watches(a, c, b);
  return b
};
cljs.core.swap_BANG_ = function() {
  var a = null, b = function(a, b) {
    return cljs.core.reset_BANG_(a, b.cljs$core$IFn$_invoke$arity$1 ? b.cljs$core$IFn$_invoke$arity$1(a.state) : b.call(null, a.state))
  }, c = function(a, b, c) {
    return cljs.core.reset_BANG_(a, b.cljs$core$IFn$_invoke$arity$2 ? b.cljs$core$IFn$_invoke$arity$2(a.state, c) : b.call(null, a.state, c))
  }, d = function(a, b, c, d) {
    return cljs.core.reset_BANG_(a, b.cljs$core$IFn$_invoke$arity$3 ? b.cljs$core$IFn$_invoke$arity$3(a.state, c, d) : b.call(null, a.state, c, d))
  }, e = function(a, b, c, d, e) {
    return cljs.core.reset_BANG_(a, b.cljs$core$IFn$_invoke$arity$4 ? b.cljs$core$IFn$_invoke$arity$4(a.state, c, d, e) : b.call(null, a.state, c, d, e))
  }, f = function(a, b, c, d, e, f) {
    return cljs.core.reset_BANG_(a, cljs.core.apply.cljs$core$IFn$_invoke$arity$variadic(b, a.state, c, d, e, cljs.core.array_seq([f], 0)))
  }, g = function(a, b, c, d, e, g) {
    var n = null;
    5 < arguments.length && (n = cljs.core.array_seq(Array.prototype.slice.call(arguments, 5), 0));
    return f.call(this, a, b, c, d, e, n)
  };
  g.cljs$lang$maxFixedArity = 5;
  g.cljs$lang$applyTo = function(a) {
    var b = cljs.core.first(a), a = cljs.core.next(a), c = cljs.core.first(a), a = cljs.core.next(a), d = cljs.core.first(a), a = cljs.core.next(a), e = cljs.core.first(a), a = cljs.core.next(a), g = cljs.core.first(a), a = cljs.core.rest(a);
    return f(b, c, d, e, g, a)
  };
  g.cljs$core$IFn$_invoke$arity$variadic = f;
  a = function(a, f, j, k, m, l) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, f);
      case 3:
        return c.call(this, a, f, j);
      case 4:
        return d.call(this, a, f, j, k);
      case 5:
        return e.call(this, a, f, j, k, m);
      default:
        return g.cljs$core$IFn$_invoke$arity$variadic(a, f, j, k, m, cljs.core.array_seq(arguments, 5))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 5;
  a.cljs$lang$applyTo = g.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$3 = c;
  a.cljs$core$IFn$_invoke$arity$4 = d;
  a.cljs$core$IFn$_invoke$arity$5 = e;
  a.cljs$core$IFn$_invoke$arity$variadic = g.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
cljs.core.compare_and_set_BANG_ = function(a, b, c) {
  return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(a.state, b) ? (cljs.core.reset_BANG_(a, c), !0) : !1
};
cljs.core.deref = function(a) {
  return cljs.core._deref(a)
};
cljs.core.set_validator_BANG_ = function(a, b) {
  return a.validator = b
};
cljs.core.get_validator = function(a) {
  return a.validator
};
cljs.core.alter_meta_BANG_ = function() {
  var a = function(a, b, e) {
    return a.meta = cljs.core.apply.cljs$core$IFn$_invoke$arity$3(b, a.meta, e)
  }, b = function(b, d, e) {
    var f = null;
    2 < arguments.length && (f = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
    return a.call(this, b, d, f)
  };
  b.cljs$lang$maxFixedArity = 2;
  b.cljs$lang$applyTo = function(b) {
    var d = cljs.core.first(b), b = cljs.core.next(b), e = cljs.core.first(b), b = cljs.core.rest(b);
    return a(d, e, b)
  };
  b.cljs$core$IFn$_invoke$arity$variadic = a;
  return b
}();
cljs.core.reset_meta_BANG_ = function(a, b) {
  return a.meta = b
};
cljs.core.add_watch = function(a, b, c) {
  return cljs.core._add_watch(a, b, c)
};
cljs.core.remove_watch = function(a, b) {
  return cljs.core._remove_watch(a, b)
};
cljs.core.gensym_counter = null;
cljs.core.gensym = function() {
  var a = null, b = function() {
    return a.cljs$core$IFn$_invoke$arity$1("G__")
  }, c = function(a) {
    null == cljs.core.gensym_counter && (cljs.core.gensym_counter = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(0));
    return cljs.core.symbol.cljs$core$IFn$_invoke$arity$1([cljs.core.str(a), cljs.core.str(cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(cljs.core.gensym_counter, cljs.core.inc))].join(""))
  }, a = function(a) {
    switch(arguments.length) {
      case 0:
        return b.call(this);
      case 1:
        return c.call(this, a)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$0 = b;
  a.cljs$core$IFn$_invoke$arity$1 = c;
  return a
}();
cljs.core.fixture1 = 1;
cljs.core.fixture2 = 2;
cljs.core.Delay = function(a, b) {
  this.state = a;
  this.f = b;
  this.cljs$lang$protocol_mask$partition1$ = 1;
  this.cljs$lang$protocol_mask$partition0$ = 32768
};
cljs.core.Delay.cljs$lang$type = !0;
cljs.core.Delay.cljs$lang$ctorStr = "cljs.core/Delay";
cljs.core.Delay.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write(b, "cljs.core/Delay")
};
cljs.core.Delay.prototype.cljs$core$IPending$_realized_QMARK_$arity$1 = function() {
  return(new cljs.core.Keyword("\ufdd0:done")).call(null, cljs.core.deref(this.state))
};
cljs.core.Delay.prototype.cljs$core$IDeref$_deref$arity$1 = function() {
  var a = this;
  return(new cljs.core.Keyword("\ufdd0:value")).call(null, cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(a.state, function(b) {
    var b = cljs.core.seq_QMARK_(b) ? cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map, b) : b, c = cljs.core.get.cljs$core$IFn$_invoke$arity$2(b, "\ufdd0:done");
    return cljs.core.truth_(c) ? b : cljs.core.PersistentArrayMap.fromArray(["\ufdd0:done", !0, "\ufdd0:value", a.f.cljs$core$IFn$_invoke$arity$0 ? a.f.cljs$core$IFn$_invoke$arity$0() : a.f.call(null)], !0)
  }))
};
cljs.core.__GT_Delay = function(a, b) {
  return new cljs.core.Delay(a, b)
};
cljs.core.delay_QMARK_ = function(a) {
  return a instanceof cljs.core.Delay
};
cljs.core.force = function(a) {
  return cljs.core.delay_QMARK_(a) ? cljs.core.deref(a) : a
};
cljs.core.realized_QMARK_ = function(a) {
  return cljs.core._realized_QMARK_(a)
};
cljs.core.IEncodeJS = {};
cljs.core._clj__GT_js = function(a) {
  var b;
  b = a ? a.cljs$core$IEncodeJS$_clj__GT_js$arity$1 : a;
  if(b) {
    return a.cljs$core$IEncodeJS$_clj__GT_js$arity$1(a)
  }
  b = cljs.core._clj__GT_js[goog.typeOf(null == a ? null : a)];
  if(!b && (b = cljs.core._clj__GT_js._, !b)) {
    throw cljs.core.missing_protocol("IEncodeJS.-clj->js", a);
  }
  return b.call(null, a)
};
cljs.core._key__GT_js = function(a) {
  var b;
  b = a ? a.cljs$core$IEncodeJS$_key__GT_js$arity$1 : a;
  if(b) {
    return a.cljs$core$IEncodeJS$_key__GT_js$arity$1(a)
  }
  b = cljs.core._key__GT_js[goog.typeOf(null == a ? null : a)];
  if(!b && (b = cljs.core._key__GT_js._, !b)) {
    throw cljs.core.missing_protocol("IEncodeJS.-key->js", a);
  }
  return b.call(null, a)
};
cljs.core.key__GT_js = function(a) {
  return(a ? cljs.core.truth_(cljs.core.truth_(null) ? null : a.cljs$core$IEncodeJS$) || (a.cljs$lang$protocol_mask$partition$ ? 0 : cljs.core.type_satisfies_(cljs.core.IEncodeJS, a)) : cljs.core.type_satisfies_(cljs.core.IEncodeJS, a)) ? cljs.core._clj__GT_js(a) : function() {
    var b = cljs.core.string_QMARK_(a);
    return b || (b = "number" === typeof a) ? b : (b = cljs.core.keyword_QMARK_(a)) ? b : a instanceof cljs.core.Symbol
  }() ? cljs.core.clj__GT_js.cljs$core$IFn$_invoke$arity$1 ? cljs.core.clj__GT_js.cljs$core$IFn$_invoke$arity$1(a) : cljs.core.clj__GT_js.call(null, a) : cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([a], 0))
};
cljs.core.clj__GT_js = function clj__GT_js(b) {
  if(null == b) {
    return null
  }
  if(b ? cljs.core.truth_(cljs.core.truth_(null) ? null : b.cljs$core$IEncodeJS$) || (b.cljs$lang$protocol_mask$partition$ ? 0 : cljs.core.type_satisfies_(cljs.core.IEncodeJS, b)) : cljs.core.type_satisfies_(cljs.core.IEncodeJS, b)) {
    return cljs.core._clj__GT_js(b)
  }
  if(cljs.core.keyword_QMARK_(b)) {
    return cljs.core.name(b)
  }
  if(b instanceof cljs.core.Symbol) {
    return"" + cljs.core.str(b)
  }
  if(cljs.core.map_QMARK_(b)) {
    for(var c = {}, b = cljs.core.seq(b), d = null, e = 0, f = 0;;) {
      if(f < e) {
        var g = d.cljs$core$IIndexed$_nth$arity$2(d, f), h = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(g, 0, null), g = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(g, 1, null);
        c[cljs.core.key__GT_js(h)] = clj__GT_js(g);
        f += 1
      }else {
        if(b = cljs.core.seq(b)) {
          cljs.core.chunked_seq_QMARK_(b) ? (e = cljs.core.chunk_first(b), b = cljs.core.chunk_rest(b), d = e, e = cljs.core.count(e)) : (e = cljs.core.first(b), d = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(e, 0, null), e = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(e, 1, null), c[cljs.core.key__GT_js(d)] = clj__GT_js(e), b = cljs.core.next(b), d = null, e = 0), f = 0
        }else {
          break
        }
      }
    }
    return c
  }
  return cljs.core.coll_QMARK_(b) ? cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.array, cljs.core.map.cljs$core$IFn$_invoke$arity$2(clj__GT_js, b)) : b
};
cljs.core.IEncodeClojure = {};
cljs.core._js__GT_clj = function(a, b) {
  var c;
  c = a ? a.cljs$core$IEncodeClojure$_js__GT_clj$arity$2 : a;
  if(c) {
    return a.cljs$core$IEncodeClojure$_js__GT_clj$arity$2(a, b)
  }
  c = cljs.core._js__GT_clj[goog.typeOf(null == a ? null : a)];
  if(!c && (c = cljs.core._js__GT_clj._, !c)) {
    throw cljs.core.missing_protocol("IEncodeClojure.-js->clj", a);
  }
  return c.call(null, a, b)
};
cljs.core.js__GT_clj = function() {
  var a = null, b = function(b) {
    return a.cljs$core$IFn$_invoke$arity$variadic(b, cljs.core.array_seq([cljs.core.PersistentArrayMap.fromArray(["\ufdd0:keywordize-keys", !1], !0)], 0))
  }, c = function(a, b) {
    var c = cljs.core.IEncodeClojure;
    if(c ? cljs.core.truth_(cljs.core.truth_(null) ? null : c.cljs$core$x$) || (c.cljs$lang$protocol_mask$partition$ ? 0 : cljs.core.type_satisfies_(a, c)) : cljs.core.type_satisfies_(a, c)) {
      return cljs.core._js__GT_clj(a, cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.array_map, b))
    }
    if(cljs.core.seq(b)) {
      var d = cljs.core.seq_QMARK_(b) ? cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map, b) : b, i = cljs.core.get.cljs$core$IFn$_invoke$arity$2(d, "\ufdd0:keywordize-keys"), j = cljs.core.truth_(i) ? cljs.core.keyword : cljs.core.str;
      return function m(a) {
        return cljs.core.seq_QMARK_(a) ? cljs.core.doall.cljs$core$IFn$_invoke$arity$1(cljs.core.map.cljs$core$IFn$_invoke$arity$2(m, a)) : cljs.core.coll_QMARK_(a) ? cljs.core.into(cljs.core.empty(a), cljs.core.map.cljs$core$IFn$_invoke$arity$2(m, a)) : a instanceof Array ? cljs.core.vec(cljs.core.map.cljs$core$IFn$_invoke$arity$2(m, a)) : cljs.core.type(a) === Object ? cljs.core.into(cljs.core.PersistentArrayMap.EMPTY, function(b, c, d, e) {
          return function u(b) {
            return new cljs.core.LazySeq(null, !1, function() {
              for(;;) {
                var c = cljs.core.seq(b);
                if(c) {
                  if(cljs.core.chunked_seq_QMARK_(c)) {
                    var d = cljs.core.chunk_first(c), f = cljs.core.count(d), h = cljs.core.chunk_buffer(f);
                    a: {
                      for(var g = 0;;) {
                        if(g < f) {
                          var i = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(d, g);
                          cljs.core.chunk_append(h, cljs.core.PersistentVector.fromArray([e.cljs$core$IFn$_invoke$arity$1 ? e.cljs$core$IFn$_invoke$arity$1(i) : e.call(null, i), m(a[i])], !0));
                          g += 1
                        }else {
                          d = !0;
                          break a
                        }
                      }
                      d = void 0
                    }
                    return d ? cljs.core.chunk_cons(cljs.core.chunk(h), u(cljs.core.chunk_rest(c))) : cljs.core.chunk_cons(cljs.core.chunk(h), null)
                  }
                  h = cljs.core.first(c);
                  return cljs.core.cons(cljs.core.PersistentVector.fromArray([e.cljs$core$IFn$_invoke$arity$1 ? e.cljs$core$IFn$_invoke$arity$1(h) : e.call(null, h), m(a[h])], !0), u(cljs.core.rest(c)))
                }
                return null
              }
            }, null)
          }
        }(b, d, i, j)(cljs.core.js_keys(a))) : a
      }(a)
    }
    return null
  }, d = function(a, b) {
    var d = null;
    1 < arguments.length && (d = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0));
    return c.call(this, a, d)
  };
  d.cljs$lang$maxFixedArity = 1;
  d.cljs$lang$applyTo = function(a) {
    var b = cljs.core.first(a), a = cljs.core.rest(a);
    return c(b, a)
  };
  d.cljs$core$IFn$_invoke$arity$variadic = c;
  a = function(a, c) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      default:
        return d.cljs$core$IFn$_invoke$arity$variadic(a, cljs.core.array_seq(arguments, 1))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 1;
  a.cljs$lang$applyTo = d.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$variadic = d.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
cljs.core.memoize = function(a) {
  var b = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY), c = function(c) {
    var d = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(b), c);
    if(cljs.core.truth_(d)) {
      return d
    }
    d = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(a, c);
    cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(b, cljs.core.assoc, c, d);
    return d
  }, d = function(a) {
    var b = null;
    0 < arguments.length && (b = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0));
    return c.call(this, b)
  };
  d.cljs$lang$maxFixedArity = 0;
  d.cljs$lang$applyTo = function(a) {
    a = cljs.core.seq(a);
    return c(a)
  };
  d.cljs$core$IFn$_invoke$arity$variadic = c;
  return d
};
cljs.core.trampoline = function() {
  var a = null, b = function(a) {
    for(;;) {
      if(a = a.cljs$core$IFn$_invoke$arity$0 ? a.cljs$core$IFn$_invoke$arity$0() : a.call(null), !cljs.core.fn_QMARK_(a)) {
        return a
      }
    }
  }, c = function(b, c) {
    return a.cljs$core$IFn$_invoke$arity$1(function() {
      return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(b, c)
    })
  }, d = function(a, b) {
    var d = null;
    1 < arguments.length && (d = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0));
    return c.call(this, a, d)
  };
  d.cljs$lang$maxFixedArity = 1;
  d.cljs$lang$applyTo = function(a) {
    var b = cljs.core.first(a), a = cljs.core.rest(a);
    return c(b, a)
  };
  d.cljs$core$IFn$_invoke$arity$variadic = c;
  a = function(a, c) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      default:
        return d.cljs$core$IFn$_invoke$arity$variadic(a, cljs.core.array_seq(arguments, 1))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 1;
  a.cljs$lang$applyTo = d.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$variadic = d.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
cljs.core.rand = function() {
  var a = null, b = function() {
    return a.cljs$core$IFn$_invoke$arity$1(1)
  }, c = function(a) {
    return(Math.random.cljs$core$IFn$_invoke$arity$0 ? Math.random.cljs$core$IFn$_invoke$arity$0() : Math.random.call(null)) * a
  }, a = function(a) {
    switch(arguments.length) {
      case 0:
        return b.call(this);
      case 1:
        return c.call(this, a)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$0 = b;
  a.cljs$core$IFn$_invoke$arity$1 = c;
  return a
}();
cljs.core.rand_int = function(a) {
  return Math.floor.cljs$core$IFn$_invoke$arity$1 ? Math.floor.cljs$core$IFn$_invoke$arity$1((Math.random.cljs$core$IFn$_invoke$arity$0 ? Math.random.cljs$core$IFn$_invoke$arity$0() : Math.random.call(null)) * a) : Math.floor.call(null, (Math.random.cljs$core$IFn$_invoke$arity$0 ? Math.random.cljs$core$IFn$_invoke$arity$0() : Math.random.call(null)) * a)
};
cljs.core.rand_nth = function(a) {
  return cljs.core.nth.cljs$core$IFn$_invoke$arity$2(a, cljs.core.rand_int(cljs.core.count(a)))
};
cljs.core.group_by = function(a, b) {
  return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(function(b, d) {
    var e = a.cljs$core$IFn$_invoke$arity$1 ? a.cljs$core$IFn$_invoke$arity$1(d) : a.call(null, d);
    return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(b, e, cljs.core.conj.cljs$core$IFn$_invoke$arity$2(cljs.core.get.cljs$core$IFn$_invoke$arity$3(b, e, cljs.core.PersistentVector.EMPTY), d))
  }, cljs.core.PersistentArrayMap.EMPTY, b)
};
cljs.core.make_hierarchy = function() {
  return cljs.core.PersistentArrayMap.fromArray(["\ufdd0:parents", cljs.core.PersistentArrayMap.EMPTY, "\ufdd0:descendants", cljs.core.PersistentArrayMap.EMPTY, "\ufdd0:ancestors", cljs.core.PersistentArrayMap.EMPTY], !0)
};
cljs.core._global_hierarchy = null;
cljs.core.get_global_hierarchy = function() {
  null == cljs.core._global_hierarchy && (cljs.core._global_hierarchy = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.make_hierarchy()));
  return cljs.core._global_hierarchy
};
cljs.core.swap_global_hierarchy_BANG_ = function() {
  var a = function(a, b) {
    return cljs.core.apply.cljs$core$IFn$_invoke$arity$4(cljs.core.swap_BANG_, cljs.core.get_global_hierarchy(), a, b)
  }, b = function(b, d) {
    var e = null;
    1 < arguments.length && (e = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0));
    return a.call(this, b, e)
  };
  b.cljs$lang$maxFixedArity = 1;
  b.cljs$lang$applyTo = function(b) {
    var d = cljs.core.first(b), b = cljs.core.rest(b);
    return a(d, b)
  };
  b.cljs$core$IFn$_invoke$arity$variadic = a;
  return b
}();
cljs.core.isa_QMARK_ = function() {
  var a = null, b = function(b, c) {
    return a.cljs$core$IFn$_invoke$arity$3(cljs.core.deref(cljs.core.get_global_hierarchy()), b, c)
  }, c = function(b, c, f) {
    var g = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(c, f);
    if(!g && !(g = cljs.core.contains_QMARK_((new cljs.core.Keyword("\ufdd0:ancestors")).call(null, b).call(null, c), f)) && (g = cljs.core.vector_QMARK_(f))) {
      if(g = cljs.core.vector_QMARK_(c)) {
        if(g = cljs.core.count(f) === cljs.core.count(c)) {
          for(var g = !0, h = 0;;) {
            var i;
            i = (i = cljs.core.not(g)) ? i : h === cljs.core.count(f);
            if(i) {
              return g
            }
            g = a.cljs$core$IFn$_invoke$arity$3(b, c.cljs$core$IFn$_invoke$arity$1 ? c.cljs$core$IFn$_invoke$arity$1(h) : c.call(null, h), f.cljs$core$IFn$_invoke$arity$1 ? f.cljs$core$IFn$_invoke$arity$1(h) : f.call(null, h));
            h += 1
          }
        }else {
          return g
        }
      }else {
        return g
      }
    }else {
      return g
    }
  }, a = function(a, e, f) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, e);
      case 3:
        return c.call(this, a, e, f)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$3 = c;
  return a
}();
cljs.core.parents = function() {
  var a = null, b = function(b) {
    return a.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(cljs.core.get_global_hierarchy()), b)
  }, c = function(a, b) {
    return cljs.core.not_empty(cljs.core.get.cljs$core$IFn$_invoke$arity$2((new cljs.core.Keyword("\ufdd0:parents")).call(null, a), b))
  }, a = function(a, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, e)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$2 = c;
  return a
}();
cljs.core.ancestors = function() {
  var a = null, b = function(b) {
    return a.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(cljs.core.get_global_hierarchy()), b)
  }, c = function(a, b) {
    return cljs.core.not_empty(cljs.core.get.cljs$core$IFn$_invoke$arity$2((new cljs.core.Keyword("\ufdd0:ancestors")).call(null, a), b))
  }, a = function(a, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, e)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$2 = c;
  return a
}();
cljs.core.descendants = function() {
  var a = null, b = function(b) {
    return a.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(cljs.core.get_global_hierarchy()), b)
  }, c = function(a, b) {
    return cljs.core.not_empty(cljs.core.get.cljs$core$IFn$_invoke$arity$2((new cljs.core.Keyword("\ufdd0:descendants")).call(null, a), b))
  }, a = function(a, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, e)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$2 = c;
  return a
}();
cljs.core.derive = function() {
  var a = null, b = function(b, c) {
    if(!cljs.core.truth_(cljs.core.namespace(c))) {
      throw Error([cljs.core.str("Assert failed: "), cljs.core.str(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.list(new cljs.core.Symbol(null, "namespace", "namespace", -388313324, null), new cljs.core.Symbol(null, "parent", "parent", 1659011683, null))], 0)))].join(""));
    }
    cljs.core.swap_global_hierarchy_BANG_.cljs$core$IFn$_invoke$arity$variadic(a, cljs.core.array_seq([b, c], 0));
    return null
  }, c = function(a, b, c) {
    if(!cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(b, c)) {
      throw Error([cljs.core.str("Assert failed: "), cljs.core.str(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.list(new cljs.core.Symbol(null, "not=", "not=", -1637144189, null), new cljs.core.Symbol(null, "tag", "tag", -1640416941, null), new cljs.core.Symbol(null, "parent", "parent", 1659011683, null))], 0)))].join(""));
    }
    var g = (new cljs.core.Keyword("\ufdd0:parents")).call(null, a), h = (new cljs.core.Keyword("\ufdd0:descendants")).call(null, a), i = (new cljs.core.Keyword("\ufdd0:ancestors")).call(null, a), j;
    j = function(a, b, c, d, e) {
      return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(function(a, b) {
        return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(a, b, cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core.conj, cljs.core.get.cljs$core$IFn$_invoke$arity$3(e, b, cljs.core.PersistentHashSet.EMPTY), cljs.core.cons(d, e.cljs$core$IFn$_invoke$arity$1 ? e.cljs$core$IFn$_invoke$arity$1(d) : e.call(null, d))))
      }, a, cljs.core.cons(b, c.cljs$core$IFn$_invoke$arity$1 ? c.cljs$core$IFn$_invoke$arity$1(b) : c.call(null, b)))
    };
    if(cljs.core.contains_QMARK_(g.cljs$core$IFn$_invoke$arity$1 ? g.cljs$core$IFn$_invoke$arity$1(b) : g.call(null, b), c)) {
      b = null
    }else {
      if(cljs.core.contains_QMARK_(i.cljs$core$IFn$_invoke$arity$1 ? i.cljs$core$IFn$_invoke$arity$1(b) : i.call(null, b), c)) {
        throw Error([cljs.core.str(b), cljs.core.str("already has"), cljs.core.str(c), cljs.core.str("as ancestor")].join(""));
      }
      if(cljs.core.contains_QMARK_(i.cljs$core$IFn$_invoke$arity$1 ? i.cljs$core$IFn$_invoke$arity$1(c) : i.call(null, c), b)) {
        throw Error([cljs.core.str("Cyclic derivation:"), cljs.core.str(c), cljs.core.str("has"), cljs.core.str(b), cljs.core.str("as ancestor")].join(""));
      }
      b = cljs.core.PersistentArrayMap.fromArray(["\ufdd0:parents", cljs.core.assoc.cljs$core$IFn$_invoke$arity$3((new cljs.core.Keyword("\ufdd0:parents")).call(null, a), b, cljs.core.conj.cljs$core$IFn$_invoke$arity$2(cljs.core.get.cljs$core$IFn$_invoke$arity$3(g, b, cljs.core.PersistentHashSet.EMPTY), c)), "\ufdd0:ancestors", j((new cljs.core.Keyword("\ufdd0:ancestors")).call(null, a), b, h, c, i), "\ufdd0:descendants", j((new cljs.core.Keyword("\ufdd0:descendants")).call(null, a), c, i, b, h)], 
      !0)
    }
    return cljs.core.truth_(b) ? b : a
  }, a = function(a, e, f) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, e);
      case 3:
        return c.call(this, a, e, f)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$3 = c;
  return a
}();
cljs.core.underive = function() {
  var a = null, b = function(b, c) {
    cljs.core.swap_global_hierarchy_BANG_.cljs$core$IFn$_invoke$arity$variadic(a, cljs.core.array_seq([b, c], 0));
    return null
  }, c = function(a, b, c) {
    var g = (new cljs.core.Keyword("\ufdd0:parents")).call(null, a), h = cljs.core.truth_(g.cljs$core$IFn$_invoke$arity$1 ? g.cljs$core$IFn$_invoke$arity$1(b) : g.call(null, b)) ? cljs.core.disj.cljs$core$IFn$_invoke$arity$2(g.cljs$core$IFn$_invoke$arity$1 ? g.cljs$core$IFn$_invoke$arity$1(b) : g.call(null, b), c) : cljs.core.PersistentHashSet.EMPTY, h = cljs.core.truth_(cljs.core.not_empty(h)) ? cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(g, b, h) : cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(g, 
    b), h = cljs.core.flatten(cljs.core.map.cljs$core$IFn$_invoke$arity$2(function(a) {
      return cljs.core.cons(cljs.core.first(a), cljs.core.interpose(cljs.core.first(a), cljs.core.second(a)))
    }, cljs.core.seq(h)));
    return cljs.core.contains_QMARK_(g.cljs$core$IFn$_invoke$arity$1 ? g.cljs$core$IFn$_invoke$arity$1(b) : g.call(null, b), c) ? cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(function(a, b) {
      return cljs.core.apply.cljs$core$IFn$_invoke$arity$3(cljs.core.derive, a, b)
    }, cljs.core.make_hierarchy(), cljs.core.partition.cljs$core$IFn$_invoke$arity$2(2, h)) : a
  }, a = function(a, e, f) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, e);
      case 3:
        return c.call(this, a, e, f)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$3 = c;
  return a
}();
cljs.core.reset_cache = function(a, b, c, d) {
  cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(a, function() {
    return cljs.core.deref(b)
  });
  return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(c, function() {
    return cljs.core.deref(d)
  })
};
cljs.core.prefers_STAR_ = function prefers_STAR_(b, c, d) {
  var e = cljs.core.deref(d).call(null, b), e = cljs.core.truth_(cljs.core.truth_(e) ? e.cljs$core$IFn$_invoke$arity$1 ? e.cljs$core$IFn$_invoke$arity$1(c) : e.call(null, c) : e) ? !0 : null;
  if(cljs.core.truth_(e)) {
    return e
  }
  a: {
    for(e = cljs.core.parents.cljs$core$IFn$_invoke$arity$1(c);;) {
      if(0 < cljs.core.count(e)) {
        cljs.core.truth_(prefers_STAR_(b, cljs.core.first(e), d)), e = cljs.core.rest(e)
      }else {
        e = null;
        break a
      }
    }
    e = void 0
  }
  if(cljs.core.truth_(e)) {
    return e
  }
  a: {
    for(b = cljs.core.parents.cljs$core$IFn$_invoke$arity$1(b);;) {
      if(0 < cljs.core.count(b)) {
        cljs.core.truth_(prefers_STAR_(cljs.core.first(b), c, d)), b = cljs.core.rest(b)
      }else {
        c = null;
        break a
      }
    }
    c = void 0
  }
  return cljs.core.truth_(c) ? c : !1
};
cljs.core.dominates = function(a, b, c) {
  c = cljs.core.prefers_STAR_(a, b, c);
  return cljs.core.truth_(c) ? c : cljs.core.isa_QMARK_.cljs$core$IFn$_invoke$arity$2(a, b)
};
cljs.core.find_and_cache_best_method = function find_and_cache_best_method(b, c, d, e, f, g, h) {
  var i = cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(function(e, h) {
    var g = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(h, 0, null);
    cljs.core.nth.cljs$core$IFn$_invoke$arity$3(h, 1, null);
    if(cljs.core.isa_QMARK_.cljs$core$IFn$_invoke$arity$3(cljs.core.deref(d), c, g)) {
      var i = cljs.core.truth_(function() {
        var b = null == e;
        return b ? b : cljs.core.dominates(g, cljs.core.first(e), f)
      }()) ? h : e;
      if(!cljs.core.truth_(cljs.core.dominates(cljs.core.first(i), g, f))) {
        throw Error([cljs.core.str("Multiple methods in multimethod '"), cljs.core.str(b), cljs.core.str("' match dispatch value: "), cljs.core.str(c), cljs.core.str(" -> "), cljs.core.str(g), cljs.core.str(" and "), cljs.core.str(cljs.core.first(i)), cljs.core.str(", and neither is preferred")].join(""));
      }
      return i
    }
    return e
  }, null, cljs.core.deref(e));
  if(cljs.core.truth_(i)) {
    if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(h), cljs.core.deref(d))) {
      return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(g, cljs.core.assoc, c, cljs.core.second(i)), cljs.core.second(i)
    }
    cljs.core.reset_cache(g, e, h, d);
    return find_and_cache_best_method(b, c, d, e, f, g, h)
  }
  return null
};
cljs.core.IMultiFn = {};
cljs.core._reset = function(a) {
  var b;
  b = a ? a.cljs$core$IMultiFn$_reset$arity$1 : a;
  if(b) {
    return a.cljs$core$IMultiFn$_reset$arity$1(a)
  }
  b = cljs.core._reset[goog.typeOf(null == a ? null : a)];
  if(!b && (b = cljs.core._reset._, !b)) {
    throw cljs.core.missing_protocol("IMultiFn.-reset", a);
  }
  return b.call(null, a)
};
cljs.core._add_method = function(a, b, c) {
  var d;
  d = a ? a.cljs$core$IMultiFn$_add_method$arity$3 : a;
  if(d) {
    return a.cljs$core$IMultiFn$_add_method$arity$3(a, b, c)
  }
  d = cljs.core._add_method[goog.typeOf(null == a ? null : a)];
  if(!d && (d = cljs.core._add_method._, !d)) {
    throw cljs.core.missing_protocol("IMultiFn.-add-method", a);
  }
  return d.call(null, a, b, c)
};
cljs.core._remove_method = function(a, b) {
  var c;
  c = a ? a.cljs$core$IMultiFn$_remove_method$arity$2 : a;
  if(c) {
    return a.cljs$core$IMultiFn$_remove_method$arity$2(a, b)
  }
  c = cljs.core._remove_method[goog.typeOf(null == a ? null : a)];
  if(!c && (c = cljs.core._remove_method._, !c)) {
    throw cljs.core.missing_protocol("IMultiFn.-remove-method", a);
  }
  return c.call(null, a, b)
};
cljs.core._prefer_method = function(a, b, c) {
  var d;
  d = a ? a.cljs$core$IMultiFn$_prefer_method$arity$3 : a;
  if(d) {
    return a.cljs$core$IMultiFn$_prefer_method$arity$3(a, b, c)
  }
  d = cljs.core._prefer_method[goog.typeOf(null == a ? null : a)];
  if(!d && (d = cljs.core._prefer_method._, !d)) {
    throw cljs.core.missing_protocol("IMultiFn.-prefer-method", a);
  }
  return d.call(null, a, b, c)
};
cljs.core._get_method = function(a, b) {
  var c;
  c = a ? a.cljs$core$IMultiFn$_get_method$arity$2 : a;
  if(c) {
    return a.cljs$core$IMultiFn$_get_method$arity$2(a, b)
  }
  c = cljs.core._get_method[goog.typeOf(null == a ? null : a)];
  if(!c && (c = cljs.core._get_method._, !c)) {
    throw cljs.core.missing_protocol("IMultiFn.-get-method", a);
  }
  return c.call(null, a, b)
};
cljs.core._methods = function(a) {
  var b;
  b = a ? a.cljs$core$IMultiFn$_methods$arity$1 : a;
  if(b) {
    return a.cljs$core$IMultiFn$_methods$arity$1(a)
  }
  b = cljs.core._methods[goog.typeOf(null == a ? null : a)];
  if(!b && (b = cljs.core._methods._, !b)) {
    throw cljs.core.missing_protocol("IMultiFn.-methods", a);
  }
  return b.call(null, a)
};
cljs.core._prefers = function(a) {
  var b;
  b = a ? a.cljs$core$IMultiFn$_prefers$arity$1 : a;
  if(b) {
    return a.cljs$core$IMultiFn$_prefers$arity$1(a)
  }
  b = cljs.core._prefers[goog.typeOf(null == a ? null : a)];
  if(!b && (b = cljs.core._prefers._, !b)) {
    throw cljs.core.missing_protocol("IMultiFn.-prefers", a);
  }
  return b.call(null, a)
};
cljs.core._dispatch = function(a, b) {
  var c;
  c = a ? a.cljs$core$IMultiFn$_dispatch$arity$2 : a;
  if(c) {
    return a.cljs$core$IMultiFn$_dispatch$arity$2(a, b)
  }
  c = cljs.core._dispatch[goog.typeOf(null == a ? null : a)];
  if(!c && (c = cljs.core._dispatch._, !c)) {
    throw cljs.core.missing_protocol("IMultiFn.-dispatch", a);
  }
  return c.call(null, a, b)
};
cljs.core.do_dispatch = function(a, b, c) {
  b = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(b, c);
  a = cljs.core._get_method(a, b);
  if(!cljs.core.truth_(a)) {
    throw Error([cljs.core.str("No method in multimethod '"), cljs.core.str(cljs.core.name), cljs.core.str("' for dispatch value: "), cljs.core.str(b)].join(""));
  }
  return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(a, c)
};
cljs.core.MultiFn = function(a, b, c, d, e, f, g, h) {
  this.name = a;
  this.dispatch_fn = b;
  this.default_dispatch_val = c;
  this.hierarchy = d;
  this.method_table = e;
  this.prefer_table = f;
  this.method_cache = g;
  this.cached_hierarchy = h;
  this.cljs$lang$protocol_mask$partition0$ = 4194304;
  this.cljs$lang$protocol_mask$partition1$ = 256
};
cljs.core.MultiFn.cljs$lang$type = !0;
cljs.core.MultiFn.cljs$lang$ctorStr = "cljs.core/MultiFn";
cljs.core.MultiFn.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write(b, "cljs.core/MultiFn")
};
cljs.core.MultiFn.prototype.cljs$core$IHash$_hash$arity$1 = function(a) {
  return goog.getUid(a)
};
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_reset$arity$1 = function(a) {
  cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(this.method_table, function() {
    return cljs.core.PersistentArrayMap.EMPTY
  });
  cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(this.method_cache, function() {
    return cljs.core.PersistentArrayMap.EMPTY
  });
  cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(this.prefer_table, function() {
    return cljs.core.PersistentArrayMap.EMPTY
  });
  cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(this.cached_hierarchy, function() {
    return null
  });
  return a
};
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_add_method$arity$3 = function(a, b, c) {
  cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(this.method_table, cljs.core.assoc, b, c);
  cljs.core.reset_cache(this.method_cache, this.method_table, this.cached_hierarchy, this.hierarchy);
  return a
};
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_remove_method$arity$2 = function(a, b) {
  cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(this.method_table, cljs.core.dissoc, b);
  cljs.core.reset_cache(this.method_cache, this.method_table, this.cached_hierarchy, this.hierarchy);
  return a
};
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_get_method$arity$2 = function(a, b) {
  cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(this.cached_hierarchy), cljs.core.deref(this.hierarchy)) || cljs.core.reset_cache(this.method_cache, this.method_table, this.cached_hierarchy, this.hierarchy);
  var c = cljs.core.deref(this.method_cache).call(null, b);
  if(cljs.core.truth_(c)) {
    return c
  }
  c = cljs.core.find_and_cache_best_method(this.name, b, this.hierarchy, this.method_table, this.prefer_table, this.method_cache, this.cached_hierarchy);
  return cljs.core.truth_(c) ? c : cljs.core.deref(this.method_table).call(null, this.default_dispatch_val)
};
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_prefer_method$arity$3 = function(a, b, c) {
  if(cljs.core.truth_(cljs.core.prefers_STAR_(b, c, this.prefer_table))) {
    throw Error([cljs.core.str("Preference conflict in multimethod '"), cljs.core.str(this.name), cljs.core.str("': "), cljs.core.str(c), cljs.core.str(" is already preferred to "), cljs.core.str(b)].join(""));
  }
  cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(this.prefer_table, function(a) {
    return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(a, b, cljs.core.conj.cljs$core$IFn$_invoke$arity$2(cljs.core.get.cljs$core$IFn$_invoke$arity$3(a, b, cljs.core.PersistentHashSet.EMPTY), c))
  });
  return cljs.core.reset_cache(this.method_cache, this.method_table, this.cached_hierarchy, this.hierarchy)
};
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_methods$arity$1 = function() {
  return cljs.core.deref(this.method_table)
};
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_prefers$arity$1 = function() {
  return cljs.core.deref(this.prefer_table)
};
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_dispatch$arity$2 = function(a, b) {
  return cljs.core.do_dispatch(a, this.dispatch_fn, b)
};
cljs.core.__GT_MultiFn = function(a, b, c, d, e, f, g, h) {
  return new cljs.core.MultiFn(a, b, c, d, e, f, g, h)
};
cljs.core.MultiFn.prototype.call = function() {
  var a = function(a, b) {
    return cljs.core._dispatch(this, b)
  }, b = function(a, b) {
    var e = null;
    1 < arguments.length && (e = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0));
    return cljs.core._dispatch(this, e)
  };
  b.cljs$lang$maxFixedArity = 1;
  b.cljs$lang$applyTo = function(b) {
    var d = cljs.core.first(b), b = cljs.core.rest(b);
    return a(d, b)
  };
  b.cljs$core$IFn$_invoke$arity$variadic = a;
  return b
}();
cljs.core.MultiFn.prototype.apply = function(a, b) {
  return cljs.core._dispatch(this, b)
};
cljs.core.remove_all_methods = function(a) {
  return cljs.core._reset(a)
};
cljs.core.remove_method = function(a, b) {
  return cljs.core._remove_method(a, b)
};
cljs.core.prefer_method = function(a, b, c) {
  return cljs.core._prefer_method(a, b, c)
};
cljs.core.methods$ = function(a) {
  return cljs.core._methods(a)
};
cljs.core.get_method = function(a, b) {
  return cljs.core._get_method(a, b)
};
cljs.core.prefers = function(a) {
  return cljs.core._prefers(a)
};
cljs.core.UUID = function(a) {
  this.uuid = a;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 2153775104
};
cljs.core.UUID.cljs$lang$type = !0;
cljs.core.UUID.cljs$lang$ctorStr = "cljs.core/UUID";
cljs.core.UUID.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write(b, "cljs.core/UUID")
};
cljs.core.UUID.prototype.cljs$core$IHash$_hash$arity$1 = function(a) {
  return goog.string.hashCode(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([a], 0)))
};
cljs.core.UUID.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = function(a, b) {
  return cljs.core._write(b, [cljs.core.str('#uuid "'), cljs.core.str(this.uuid), cljs.core.str('"')].join(""))
};
cljs.core.UUID.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(a, b) {
  var c = b instanceof cljs.core.UUID;
  return c ? this.uuid === b.uuid : c
};
cljs.core.__GT_UUID = function(a) {
  return new cljs.core.UUID(a)
};
cljs.core.ExceptionInfo = function(a, b, c) {
  this.message = a;
  this.data = b;
  this.cause = c
};
cljs.core.ExceptionInfo.cljs$lang$type = !0;
cljs.core.ExceptionInfo.cljs$lang$ctorStr = "cljs.core/ExceptionInfo";
cljs.core.ExceptionInfo.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write(b, "cljs.core/ExceptionInfo")
};
cljs.core.__GT_ExceptionInfo = function(a, b, c) {
  return new cljs.core.ExceptionInfo(a, b, c)
};
cljs.core.ExceptionInfo.prototype = Error();
cljs.core.ExceptionInfo.prototype.constructor = cljs.core.ExceptionInfo;
cljs.core.ex_info = function() {
  var a = null, b = function(a, b) {
    return new cljs.core.ExceptionInfo(a, b, null)
  }, c = function(a, b, c) {
    return new cljs.core.ExceptionInfo(a, b, c)
  }, a = function(a, e, f) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, e);
      case 3:
        return c.call(this, a, e, f)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$3 = c;
  return a
}();
cljs.core.ex_data = function(a) {
  return a instanceof cljs.core.ExceptionInfo ? a.data : null
};
cljs.core.ex_message = function(a) {
  return a instanceof Error ? a.message : null
};
cljs.core.ex_cause = function(a) {
  return a instanceof cljs.core.ExceptionInfo ? a.cause : null
};
cljs.core.comparator = function(a) {
  return function(b, c) {
    return cljs.core.truth_(a.cljs$core$IFn$_invoke$arity$2 ? a.cljs$core$IFn$_invoke$arity$2(b, c) : a.call(null, b, c)) ? -1 : cljs.core.truth_(a.cljs$core$IFn$_invoke$arity$2 ? a.cljs$core$IFn$_invoke$arity$2(c, b) : a.call(null, c, b)) ? 1 : 0
  }
};
cljs.core.special_symbol_QMARK_ = function(a) {
  return cljs.core.contains_QMARK_(cljs.core.PersistentHashSet.fromArray([new cljs.core.Symbol(null, "deftype*", "deftype*", -978581244, null), null, new cljs.core.Symbol(null, "new", "new", -1640422567, null), null, new cljs.core.Symbol(null, "try*", "try*", -1636962424, null), null, new cljs.core.Symbol(null, "quote", "quote", -1532577739, null), null, new cljs.core.Symbol(null, "&", "&", -1640531489, null), null, new cljs.core.Symbol(null, "set!", "set!", -1637004872, null), null, new cljs.core.Symbol(null, 
  "recur", "recur", -1532142362, null), null, new cljs.core.Symbol(null, ".", ".", -1640531481, null), null, new cljs.core.Symbol(null, "ns", "ns", -1640528002, null), null, new cljs.core.Symbol(null, "do", "do", -1640528316, null), null, new cljs.core.Symbol(null, "fn*", "fn*", -1640430053, null), null, new cljs.core.Symbol(null, "throw", "throw", -1530191713, null), null, new cljs.core.Symbol(null, "letfn*", "letfn*", 1548249632, null), null, new cljs.core.Symbol(null, "js*", "js*", -1640426054, 
  null), null, new cljs.core.Symbol(null, "defrecord*", "defrecord*", 774272013, null), null, new cljs.core.Symbol(null, "let*", "let*", -1637213400, null), null, new cljs.core.Symbol(null, "loop*", "loop*", -1537374273, null), null, new cljs.core.Symbol(null, "if", "if", -1640528170, null), null, new cljs.core.Symbol(null, "def", "def", -1640432194, null), null], !0), a)
};
var jayq = {util:{}};
jayq.util.wait = function(a, b) {
  return setTimeout(b, a)
};
jayq.util.log = function() {
  var a = function(a, b) {
    var e = cljs.core.string_QMARK_(a) ? cljs.core.apply.cljs$core$IFn$_invoke$arity$3(cljs.core.str, a, b) : a;
    console.log(e);
    return a
  }, b = function(b, d) {
    var e = null;
    1 < arguments.length && (e = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0));
    return a.call(this, b, e)
  };
  b.cljs$lang$maxFixedArity = 1;
  b.cljs$lang$applyTo = function(b) {
    var d = cljs.core.first(b), b = cljs.core.rest(b);
    return a(d, b)
  };
  b.cljs$core$IFn$_invoke$arity$variadic = a;
  return b
}();
var clojure = {string:{}};
clojure.string.seq_reverse = function(a) {
  return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core.conj, cljs.core.List.EMPTY, a)
};
clojure.string.reverse = function(a) {
  return a.split("").reverse().join("")
};
clojure.string.replace = function(a, b, c) {
  if(cljs.core.string_QMARK_(b)) {
    return a.replace(RegExp(goog.string.regExpEscape(b), "g"), c)
  }
  if(cljs.core.truth_(b.hasOwnProperty("source"))) {
    return a.replace(RegExp(b.source, "g"), c)
  }
  throw[cljs.core.str("Invalid match arg: "), cljs.core.str(b)].join("");
};
clojure.string.replace_first = function(a, b, c) {
  return a.replace(b, c)
};
clojure.string.join = function() {
  var a = null, b = function(a) {
    return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.str, a)
  }, c = function(a, b) {
    return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.str, cljs.core.interpose(a, b))
  }, a = function(a, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, e)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$2 = c;
  return a
}();
clojure.string.upper_case = function(a) {
  return a.toUpperCase()
};
clojure.string.lower_case = function(a) {
  return a.toLowerCase()
};
clojure.string.capitalize = function(a) {
  return 2 > cljs.core.count(a) ? clojure.string.upper_case(a) : [cljs.core.str(clojure.string.upper_case(cljs.core.subs.cljs$core$IFn$_invoke$arity$3(a, 0, 1))), cljs.core.str(clojure.string.lower_case(cljs.core.subs.cljs$core$IFn$_invoke$arity$2(a, 1)))].join("")
};
clojure.string.split = function() {
  var a = null, b = function(a, b) {
    return cljs.core.vec(("" + cljs.core.str(a)).split(b))
  }, c = function(a, b, c) {
    if(1 > c) {
      return cljs.core.vec(("" + cljs.core.str(a)).split(b))
    }
    for(var g = cljs.core.PersistentVector.EMPTY;;) {
      if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(c, 1)) {
        return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(g, a)
      }
      var h = cljs.core.re_find(b, a);
      if(cljs.core.truth_(h)) {
        var i = h, h = a.indexOf(i), i = a.substring(h + cljs.core.count(i)), c = c - 1, g = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(g, a.substring(0, h)), a = i
      }else {
        return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(g, a)
      }
    }
  }, a = function(a, e, f) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, e);
      case 3:
        return c.call(this, a, e, f)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$3 = c;
  return a
}();
clojure.string.split_lines = function(a) {
  return clojure.string.split.cljs$core$IFn$_invoke$arity$2(a, /\n|\r\n/)
};
clojure.string.trim = function(a) {
  return goog.string.trim(a)
};
clojure.string.triml = function(a) {
  return goog.string.trimLeft(a)
};
clojure.string.trimr = function(a) {
  return goog.string.trimRight(a)
};
clojure.string.trim_newline = function(a) {
  for(var b = a.length;;) {
    if(0 === b) {
      return""
    }
    var c = cljs.core.get.cljs$core$IFn$_invoke$arity$2(a, b - 1);
    var d = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(c, "\n"), c = d ? d : cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(c, "\r");
    if(c) {
      b -= 1
    }else {
      return a.substring(0, b)
    }
  }
};
clojure.string.blank_QMARK_ = function(a) {
  return goog.string.isEmptySafe(a)
};
clojure.string.escape = function(a, b) {
  for(var c = new goog.string.StringBuffer, d = a.length, e = 0;;) {
    if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(d, e)) {
      return c.toString()
    }
    var f = a.charAt(e), g = cljs.core.get.cljs$core$IFn$_invoke$arity$2(b, f);
    cljs.core.truth_(g) ? c.append("" + cljs.core.str(g)) : c.append(f);
    e += 1
  }
};
var crate = {util:{}};
crate.util._STAR_base_url_STAR_ = null;
crate.util.as_str = function() {
  var a = null, b = function(a) {
    var b;
    b = (b = a instanceof cljs.core.Symbol) ? b : cljs.core.keyword_QMARK_(a);
    return b ? cljs.core.name(a) : "" + cljs.core.str(a)
  }, c = function(b, c) {
    return function(b, c) {
      for(;;) {
        if(cljs.core.truth_(c)) {
          var d = [cljs.core.str(b), cljs.core.str(a.cljs$core$IFn$_invoke$arity$1(cljs.core.first(c)))].join(""), e = cljs.core.next(c), b = d, c = e
        }else {
          return b
        }
      }
    }.call(null, a.cljs$core$IFn$_invoke$arity$1(b), c)
  }, d = function(a, b) {
    var d = null;
    1 < arguments.length && (d = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0));
    return c.call(this, a, d)
  };
  d.cljs$lang$maxFixedArity = 1;
  d.cljs$lang$applyTo = function(a) {
    var b = cljs.core.first(a), a = cljs.core.rest(a);
    return c(b, a)
  };
  d.cljs$core$IFn$_invoke$arity$variadic = c;
  a = function(a, c) {
    switch(arguments.length) {
      case 0:
        return"";
      case 1:
        return b.call(this, a);
      default:
        return d.cljs$core$IFn$_invoke$arity$variadic(a, cljs.core.array_seq(arguments, 1))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 1;
  a.cljs$lang$applyTo = d.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$0 = function() {
    return""
  };
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$variadic = d.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
crate.util.escape_html = function(a) {
  return clojure.string.replace(clojure.string.replace(clojure.string.replace(clojure.string.replace(crate.util.as_str.cljs$core$IFn$_invoke$arity$1(a), "&", "&amp;"), "<", "&lt;"), ">", "&gt;"), '"', "&quot;")
};
crate.util.to_uri = function(a) {
  return cljs.core.truth_(cljs.core.re_matches(/^\w+:.*/, a)) ? a : [cljs.core.str(crate.util._STAR_base_url_STAR_), cljs.core.str(a)].join("")
};
crate.util.url_encode_component = function(a) {
  return encodeURIComponent(crate.util.as_str.cljs$core$IFn$_invoke$arity$1(a))
};
crate.util.url_encode = function(a) {
  return clojure.string.join.cljs$core$IFn$_invoke$arity$2("&", function c(a) {
    return new cljs.core.LazySeq(null, !1, function() {
      for(;;) {
        var e = cljs.core.seq(a);
        if(e) {
          if(cljs.core.chunked_seq_QMARK_(e)) {
            var f = cljs.core.chunk_first(e), g = cljs.core.count(f), h = cljs.core.chunk_buffer(g);
            a: {
              for(var i = 0;;) {
                if(i < g) {
                  var j = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(f, i), k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(j, 0, null), j = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(j, 1, null);
                  cljs.core.chunk_append(h, [cljs.core.str(crate.util.url_encode_component(k)), cljs.core.str("="), cljs.core.str(crate.util.url_encode_component(j))].join(""));
                  i += 1
                }else {
                  f = !0;
                  break a
                }
              }
              f = void 0
            }
            return f ? cljs.core.chunk_cons(cljs.core.chunk(h), c(cljs.core.chunk_rest(e))) : cljs.core.chunk_cons(cljs.core.chunk(h), null)
          }
          f = cljs.core.first(e);
          h = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(f, 0, null);
          f = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(f, 1, null);
          return cljs.core.cons([cljs.core.str(crate.util.url_encode_component(h)), cljs.core.str("="), cljs.core.str(crate.util.url_encode_component(f))].join(""), c(cljs.core.rest(e)))
        }
        return null
      }
    }, null)
  }(a))
};
crate.util.url = function() {
  var a = function(a) {
    var b = cljs.core.last(a), a = cljs.core.butlast(a);
    return"" + cljs.core.str(crate.util.to_uri([cljs.core.str(cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.str, a)), cljs.core.str(cljs.core.map_QMARK_(b) ? [cljs.core.str("?"), cljs.core.str(crate.util.url_encode(b))].join("") : b)].join("")))
  }, b = function(b) {
    var d = null;
    0 < arguments.length && (d = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0));
    return a.call(this, d)
  };
  b.cljs$lang$maxFixedArity = 0;
  b.cljs$lang$applyTo = function(b) {
    b = cljs.core.seq(b);
    return a(b)
  };
  b.cljs$core$IFn$_invoke$arity$variadic = a;
  return b
}();
clojure.set = {};
clojure.set.bubble_max_key = function(a, b) {
  var c = cljs.core.apply.cljs$core$IFn$_invoke$arity$3(cljs.core.max_key, a, b);
  return cljs.core.cons(c, cljs.core.remove(function(a) {
    return c === a
  }, b))
};
clojure.set.union = function() {
  var a = null, b = function() {
    return cljs.core.PersistentHashSet.EMPTY
  }, c = function(a, b) {
    return cljs.core.count(a) < cljs.core.count(b) ? cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core.conj, b, a) : cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core.conj, a, b)
  }, d = function(a, b, c) {
    a = clojure.set.bubble_max_key(cljs.core.count, cljs.core.conj.cljs$core$IFn$_invoke$arity$variadic(c, b, cljs.core.array_seq([a], 0)));
    return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core.into, cljs.core.first(a), cljs.core.rest(a))
  }, e = function(a, b, c) {
    var e = null;
    2 < arguments.length && (e = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
    return d.call(this, a, b, e)
  };
  e.cljs$lang$maxFixedArity = 2;
  e.cljs$lang$applyTo = function(a) {
    var b = cljs.core.first(a), a = cljs.core.next(a), c = cljs.core.first(a), a = cljs.core.rest(a);
    return d(b, c, a)
  };
  e.cljs$core$IFn$_invoke$arity$variadic = d;
  a = function(a, d, h) {
    switch(arguments.length) {
      case 0:
        return b.call(this);
      case 1:
        return a;
      case 2:
        return c.call(this, a, d);
      default:
        return e.cljs$core$IFn$_invoke$arity$variadic(a, d, cljs.core.array_seq(arguments, 2))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = e.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$0 = b;
  a.cljs$core$IFn$_invoke$arity$1 = function(a) {
    return a
  };
  a.cljs$core$IFn$_invoke$arity$2 = c;
  a.cljs$core$IFn$_invoke$arity$variadic = e.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
clojure.set.intersection = function() {
  var a = null, b = function(a, b) {
    for(;;) {
      if(cljs.core.count(b) < cljs.core.count(a)) {
        var c = a, a = b, b = c
      }else {
        return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(function(a, b) {
          return function(a, c) {
            return cljs.core.contains_QMARK_(b, c) ? a : cljs.core.disj.cljs$core$IFn$_invoke$arity$2(a, c)
          }
        }(a, b), a, a)
      }
    }
  }, c = function(b, c, d) {
    b = clojure.set.bubble_max_key(function(a) {
      return-cljs.core.count(a)
    }, cljs.core.conj.cljs$core$IFn$_invoke$arity$variadic(d, c, cljs.core.array_seq([b], 0)));
    return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(a, cljs.core.first(b), cljs.core.rest(b))
  }, d = function(a, b, d) {
    var h = null;
    2 < arguments.length && (h = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
    return c.call(this, a, b, h)
  };
  d.cljs$lang$maxFixedArity = 2;
  d.cljs$lang$applyTo = function(a) {
    var b = cljs.core.first(a), a = cljs.core.next(a), d = cljs.core.first(a), a = cljs.core.rest(a);
    return c(b, d, a)
  };
  d.cljs$core$IFn$_invoke$arity$variadic = c;
  a = function(a, c, g) {
    switch(arguments.length) {
      case 1:
        return a;
      case 2:
        return b.call(this, a, c);
      default:
        return d.cljs$core$IFn$_invoke$arity$variadic(a, c, cljs.core.array_seq(arguments, 2))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = d.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$1 = function(a) {
    return a
  };
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$variadic = d.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
clojure.set.difference = function() {
  var a = null, b = function(a, b) {
    return cljs.core.count(a) < cljs.core.count(b) ? cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(function(a, c) {
      return cljs.core.contains_QMARK_(b, c) ? cljs.core.disj.cljs$core$IFn$_invoke$arity$2(a, c) : a
    }, a, a) : cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core.disj, a, b)
  }, c = function(b, c, d) {
    return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(a, b, cljs.core.conj.cljs$core$IFn$_invoke$arity$2(d, c))
  }, d = function(a, b, d) {
    var h = null;
    2 < arguments.length && (h = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
    return c.call(this, a, b, h)
  };
  d.cljs$lang$maxFixedArity = 2;
  d.cljs$lang$applyTo = function(a) {
    var b = cljs.core.first(a), a = cljs.core.next(a), d = cljs.core.first(a), a = cljs.core.rest(a);
    return c(b, d, a)
  };
  d.cljs$core$IFn$_invoke$arity$variadic = c;
  a = function(a, c, g) {
    switch(arguments.length) {
      case 1:
        return a;
      case 2:
        return b.call(this, a, c);
      default:
        return d.cljs$core$IFn$_invoke$arity$variadic(a, c, cljs.core.array_seq(arguments, 2))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = d.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$1 = function(a) {
    return a
  };
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$variadic = d.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
clojure.set.select = function(a, b) {
  return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(function(b, d) {
    return cljs.core.truth_(a.cljs$core$IFn$_invoke$arity$1 ? a.cljs$core$IFn$_invoke$arity$1(d) : a.call(null, d)) ? b : cljs.core.disj.cljs$core$IFn$_invoke$arity$2(b, d)
  }, b, b)
};
clojure.set.project = function(a, b) {
  return cljs.core.set(cljs.core.map.cljs$core$IFn$_invoke$arity$2(function(a) {
    return cljs.core.select_keys(a, b)
  }, a))
};
clojure.set.rename_keys = function(a, b) {
  return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(function(a, b) {
    var e = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(b, 0, null), f = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(b, 1, null), g;
    g = (g = cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(e, f)) ? cljs.core.contains_QMARK_(a, e) : g;
    return g ? cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(a, f, cljs.core.get.cljs$core$IFn$_invoke$arity$2(a, e)), e) : a
  }, a, b)
};
clojure.set.rename = function(a, b) {
  return cljs.core.set(cljs.core.map.cljs$core$IFn$_invoke$arity$2(function(a) {
    return clojure.set.rename_keys(a, b)
  }, a))
};
clojure.set.index = function(a, b) {
  return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(function(a, d) {
    var e = cljs.core.select_keys(d, b);
    return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(a, e, cljs.core.conj.cljs$core$IFn$_invoke$arity$2(cljs.core.get.cljs$core$IFn$_invoke$arity$3(a, e, cljs.core.PersistentHashSet.EMPTY), d))
  }, cljs.core.PersistentArrayMap.EMPTY, a)
};
clojure.set.map_invert = function(a) {
  return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(function(a, c) {
    var d = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(c, 0, null), e = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(c, 1, null);
    return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(a, e, d)
  }, cljs.core.PersistentArrayMap.EMPTY, a)
};
clojure.set.join = function() {
  var a = null, b = function(a, b) {
    var c;
    c = (c = cljs.core.seq(a)) ? cljs.core.seq(b) : c;
    if(c) {
      var g = clojure.set.intersection.cljs$core$IFn$_invoke$arity$2(cljs.core.set(cljs.core.keys(cljs.core.first(a))), cljs.core.set(cljs.core.keys(cljs.core.first(b)))), h = cljs.core.count(a) <= cljs.core.count(b) ? cljs.core.PersistentVector.fromArray([a, b], !0) : cljs.core.PersistentVector.fromArray([b, a], !0);
      c = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(h, 0, null);
      var h = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(h, 1, null), i = clojure.set.index(c, g);
      return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(function(a, b) {
        var c = i.cljs$core$IFn$_invoke$arity$1 ? i.cljs$core$IFn$_invoke$arity$1(cljs.core.select_keys(b, g)) : i.call(null, cljs.core.select_keys(b, g));
        return cljs.core.truth_(c) ? cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(function(a, c) {
          return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(a, cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([c, b], 0)))
        }, a, c) : a
      }, cljs.core.PersistentHashSet.EMPTY, h)
    }
    return cljs.core.PersistentHashSet.EMPTY
  }, c = function(a, b, c) {
    var a = cljs.core.count(a) <= cljs.core.count(b) ? cljs.core.PersistentVector.fromArray([a, b, clojure.set.map_invert(c)], !0) : cljs.core.PersistentVector.fromArray([b, a, c], !0), b = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(a, 0, null), c = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(a, 1, null), g = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(a, 2, null), h = clojure.set.index(b, cljs.core.vals(g));
    return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(function(a, b) {
      var c = h.cljs$core$IFn$_invoke$arity$1 ? h.cljs$core$IFn$_invoke$arity$1(clojure.set.rename_keys(cljs.core.select_keys(b, cljs.core.keys(g)), g)) : h.call(null, clojure.set.rename_keys(cljs.core.select_keys(b, cljs.core.keys(g)), g));
      return cljs.core.truth_(c) ? cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(function(a, c) {
        return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(a, cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([c, b], 0)))
      }, a, c) : a
    }, cljs.core.PersistentHashSet.EMPTY, c)
  }, a = function(a, e, f) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, e);
      case 3:
        return c.call(this, a, e, f)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$3 = c;
  return a
}();
clojure.set.subset_QMARK_ = function(a, b) {
  var c = cljs.core.count(a) <= cljs.core.count(b);
  return c ? cljs.core.every_QMARK_(function(a) {
    return cljs.core.contains_QMARK_(b, a)
  }, a) : c
};
clojure.set.superset_QMARK_ = function(a, b) {
  var c = cljs.core.count(a) >= cljs.core.count(b);
  return c ? cljs.core.every_QMARK_(function(b) {
    return cljs.core.contains_QMARK_(a, b)
  }, b) : c
};
crate.binding = {};
crate.binding.SubAtom = function(a, b, c, d, e) {
  this.atm = a;
  this.path = b;
  this.prevhash = c;
  this.watches = d;
  this.key = e;
  this.cljs$lang$protocol_mask$partition0$ = 2153807872;
  this.cljs$lang$protocol_mask$partition1$ = 2
};
crate.binding.SubAtom.cljs$lang$type = !0;
crate.binding.SubAtom.cljs$lang$ctorStr = "crate.binding/SubAtom";
crate.binding.SubAtom.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write(b, "crate.binding/SubAtom")
};
crate.binding.SubAtom.prototype.cljs$core$IHash$_hash$arity$1 = function(a) {
  return goog.getUid(a)
};
crate.binding.SubAtom.prototype.cljs$core$IWatchable$_notify_watches$arity$3 = function(a, b, c) {
  for(var d = cljs.core.seq(this.watches), e = null, f = 0, g = 0;;) {
    if(g < f) {
      var h = e.cljs$core$IIndexed$_nth$arity$2(e, g), i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(h, 0, null), h = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(h, 1, null);
      h.cljs$core$IFn$_invoke$arity$4 ? h.cljs$core$IFn$_invoke$arity$4(i, a, b, c) : h.call(null, i, a, b, c);
      g += 1
    }else {
      if(d = cljs.core.seq(d)) {
        cljs.core.chunked_seq_QMARK_(d) ? (e = cljs.core.chunk_first(d), d = cljs.core.chunk_rest(d), i = e, f = cljs.core.count(e), e = i) : (e = cljs.core.first(d), i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(e, 0, null), h = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(e, 1, null), h.cljs$core$IFn$_invoke$arity$4 ? h.cljs$core$IFn$_invoke$arity$4(i, a, b, c) : h.call(null, i, a, b, c), d = cljs.core.next(d), e = null, f = 0), g = 0
      }else {
        return null
      }
    }
  }
};
crate.binding.SubAtom.prototype.cljs$core$IWatchable$_add_watch$arity$3 = function(a, b, c) {
  return cljs.core.truth_(c) ? a.watches = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(this.watches, b, c) : null
};
crate.binding.SubAtom.prototype.cljs$core$IWatchable$_remove_watch$arity$2 = function(a, b) {
  return a.watches = cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(this.watches, b)
};
crate.binding.SubAtom.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = function(a, b) {
  return cljs.core._write(b, [cljs.core.str("#<SubAtom: "), cljs.core.str(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(this.atm), this.path)], 0))), cljs.core.str(">")].join(""))
};
crate.binding.SubAtom.prototype.cljs$core$IDeref$_deref$arity$1 = function() {
  return cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(this.atm), this.path)
};
crate.binding.SubAtom.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(a, b) {
  return a === b
};
crate.binding.__GT_SubAtom = function(a, b, c, d, e) {
  return new crate.binding.SubAtom(a, b, c, d, e)
};
crate.binding.subatom = function(a, b) {
  var c = cljs.core.coll_QMARK_(b) ? b : cljs.core.PersistentVector.fromArray([b], !0), d = a instanceof crate.binding.SubAtom ? cljs.core.PersistentVector.fromArray([a.atm, cljs.core.concat.cljs$core$IFn$_invoke$arity$2(a.path, c)], !0) : cljs.core.PersistentVector.fromArray([a, c], !0), c = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(d, 0, null), e = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(d, 1, null), d = cljs.core.gensym.cljs$core$IFn$_invoke$arity$1("subatom"), f = new crate.binding.SubAtom(c, 
  e, cljs.core.hash.cljs$core$IFn$_invoke$arity$1(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(c), e)), null, d);
  cljs.core.add_watch(c, d, function(a, b, c, d) {
    a = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(d, e);
    d = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(c, e);
    b = cljs.core.hash.cljs$core$IFn$_invoke$arity$1(a);
    var k = cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(f.prevhash, b), d = k ? cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(d, a) : k;
    return d ? (f.prevhash = b, cljs.core._notify_watches(f, cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(c, e), a)) : null
  });
  return f
};
crate.binding.sub_reset_BANG_ = function(a, b) {
  cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(a.atm, cljs.core.assoc_in, a.path, b);
  return b
};
crate.binding.sub_swap_BANG_ = function() {
  var a = null, b = function(a, b) {
    return crate.binding.sub_reset_BANG_(a, b.cljs$core$IFn$_invoke$arity$1 ? b.cljs$core$IFn$_invoke$arity$1(cljs.core.deref(a)) : b.call(null, cljs.core.deref(a)))
  }, c = function(a, b, c) {
    return crate.binding.sub_reset_BANG_(a, b.cljs$core$IFn$_invoke$arity$2 ? b.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(a), c) : b.call(null, cljs.core.deref(a), c))
  }, d = function(a, b, c, d) {
    return crate.binding.sub_reset_BANG_(a, b.cljs$core$IFn$_invoke$arity$3 ? b.cljs$core$IFn$_invoke$arity$3(cljs.core.deref(a), c, d) : b.call(null, cljs.core.deref(a), c, d))
  }, e = function(a, b, c, d, e) {
    return crate.binding.sub_reset_BANG_(a, b.cljs$core$IFn$_invoke$arity$4 ? b.cljs$core$IFn$_invoke$arity$4(cljs.core.deref(a), c, d, e) : b.call(null, cljs.core.deref(a), c, d, e))
  }, f = function(a, b, c, d, e, f) {
    return crate.binding.sub_reset_BANG_(a, cljs.core.apply.cljs$core$IFn$_invoke$arity$variadic(b, cljs.core.deref(a), c, d, e, cljs.core.array_seq([f], 0)))
  }, g = function(a, b, c, d, e, g) {
    var n = null;
    5 < arguments.length && (n = cljs.core.array_seq(Array.prototype.slice.call(arguments, 5), 0));
    return f.call(this, a, b, c, d, e, n)
  };
  g.cljs$lang$maxFixedArity = 5;
  g.cljs$lang$applyTo = function(a) {
    var b = cljs.core.first(a), a = cljs.core.next(a), c = cljs.core.first(a), a = cljs.core.next(a), d = cljs.core.first(a), a = cljs.core.next(a), e = cljs.core.first(a), a = cljs.core.next(a), g = cljs.core.first(a), a = cljs.core.rest(a);
    return f(b, c, d, e, g, a)
  };
  g.cljs$core$IFn$_invoke$arity$variadic = f;
  a = function(a, f, j, k, m, l) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, f);
      case 3:
        return c.call(this, a, f, j);
      case 4:
        return d.call(this, a, f, j, k);
      case 5:
        return e.call(this, a, f, j, k, m);
      default:
        return g.cljs$core$IFn$_invoke$arity$variadic(a, f, j, k, m, cljs.core.array_seq(arguments, 5))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 5;
  a.cljs$lang$applyTo = g.cljs$lang$applyTo;
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$3 = c;
  a.cljs$core$IFn$_invoke$arity$4 = d;
  a.cljs$core$IFn$_invoke$arity$5 = e;
  a.cljs$core$IFn$_invoke$arity$variadic = g.cljs$core$IFn$_invoke$arity$variadic;
  return a
}();
crate.binding.sub_destroy_BANG_ = function(a) {
  cljs.core.remove_watch(a.atm, a.key);
  a.watches = null;
  return a.atm = null
};
crate.binding.computable = {};
crate.binding._compute = function(a) {
  var b;
  b = a ? a.crate$binding$computable$_compute$arity$1 : a;
  if(b) {
    return a.crate$binding$computable$_compute$arity$1(a)
  }
  b = crate.binding._compute[goog.typeOf(null == a ? null : a)];
  if(!b && (b = crate.binding._compute._, !b)) {
    throw cljs.core.missing_protocol("computable.-compute", a);
  }
  return b.call(null, a)
};
crate.binding.Computed = function(a, b, c, d, e) {
  this.atms = a;
  this.value = b;
  this.func = c;
  this.watches = d;
  this.key = e;
  this.cljs$lang$protocol_mask$partition0$ = 2153807872;
  this.cljs$lang$protocol_mask$partition1$ = 2
};
crate.binding.Computed.cljs$lang$type = !0;
crate.binding.Computed.cljs$lang$ctorStr = "crate.binding/Computed";
crate.binding.Computed.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write(b, "crate.binding/Computed")
};
crate.binding.Computed.prototype.crate$binding$computable$ = !0;
crate.binding.Computed.prototype.crate$binding$computable$_compute$arity$1 = function(a) {
  var b = a.value;
  a.value = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(this.func, cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.deref, this.atms));
  return a.cljs$core$IWatchable$_notify_watches$arity$3(a, b, a.value)
};
crate.binding.Computed.prototype.cljs$core$IHash$_hash$arity$1 = function(a) {
  return goog.getUid(a)
};
crate.binding.Computed.prototype.cljs$core$IWatchable$_notify_watches$arity$3 = function(a, b, c) {
  for(var d = cljs.core.seq(this.watches), e = null, f = 0, g = 0;;) {
    if(g < f) {
      var h = e.cljs$core$IIndexed$_nth$arity$2(e, g), i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(h, 0, null), h = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(h, 1, null);
      h.cljs$core$IFn$_invoke$arity$4 ? h.cljs$core$IFn$_invoke$arity$4(i, a, b, c) : h.call(null, i, a, b, c);
      g += 1
    }else {
      if(d = cljs.core.seq(d)) {
        cljs.core.chunked_seq_QMARK_(d) ? (e = cljs.core.chunk_first(d), d = cljs.core.chunk_rest(d), i = e, f = cljs.core.count(e), e = i) : (e = cljs.core.first(d), i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(e, 0, null), h = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(e, 1, null), h.cljs$core$IFn$_invoke$arity$4 ? h.cljs$core$IFn$_invoke$arity$4(i, a, b, c) : h.call(null, i, a, b, c), d = cljs.core.next(d), e = null, f = 0), g = 0
      }else {
        return null
      }
    }
  }
};
crate.binding.Computed.prototype.cljs$core$IWatchable$_add_watch$arity$3 = function(a, b, c) {
  return cljs.core.truth_(c) ? a.watches = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(this.watches, b, c) : null
};
crate.binding.Computed.prototype.cljs$core$IWatchable$_remove_watch$arity$2 = function(a, b) {
  return a.watches = cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(this.watches, b)
};
crate.binding.Computed.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = function(a, b) {
  return cljs.core._write(b, [cljs.core.str("#<Computed: "), cljs.core.str(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([this.value], 0))), cljs.core.str(">")].join(""))
};
crate.binding.Computed.prototype.cljs$core$IDeref$_deref$arity$1 = function() {
  return this.value
};
crate.binding.Computed.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(a, b) {
  return a === b
};
crate.binding.__GT_Computed = function(a, b, c, d, e) {
  return new crate.binding.Computed(a, b, c, d, e)
};
crate.binding.computed = function(a, b) {
  var c = cljs.core.gensym.cljs$core$IFn$_invoke$arity$1("computed"), d = new crate.binding.Computed(a, null, b, null, c);
  crate.binding._compute(d);
  for(var e = cljs.core.seq(a), f = null, g = 0, h = 0;;) {
    if(h < g) {
      var i = f.cljs$core$IIndexed$_nth$arity$2(f, h);
      cljs.core.add_watch(i, c, function() {
        return function() {
          return crate.binding._compute(d)
        }
      }(e, f, g, h, i));
      h += 1
    }else {
      var j = cljs.core.seq(e);
      if(j) {
        i = j;
        if(cljs.core.chunked_seq_QMARK_(i)) {
          e = cljs.core.chunk_first(i), h = cljs.core.chunk_rest(i), f = e, g = cljs.core.count(e), e = h
        }else {
          var k = cljs.core.first(i);
          cljs.core.add_watch(k, c, function() {
            return function() {
              return crate.binding._compute(d)
            }
          }(e, f, g, h, k, i, j));
          e = cljs.core.next(i);
          f = null;
          g = 0
        }
        h = 0
      }else {
        break
      }
    }
  }
  return d
};
crate.binding.z = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentVector.EMPTY);
crate.binding.y = crate.binding.computed(cljs.core.PersistentVector.fromArray([crate.binding.z], !0), function(a) {
  return cljs.core.filter(cljs.core.even_QMARK_, a)
});
crate.binding.r = crate.binding.computed(cljs.core.PersistentVector.fromArray([crate.binding.y], !0), function(a) {
  return cljs.core.filter(function(a) {
    return 100 < a
  }, a)
});
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(crate.binding.z, cljs.core.conj, 1340);
cljs.core.deref(crate.binding.y);
cljs.core.deref(crate.binding.r);
crate.binding.notify = function(a, b, c) {
  return cljs.core._notify_watches(a, b, c)
};
crate.binding.bindable_coll = {};
crate.binding.bindable = {};
crate.binding._value = function(a) {
  var b;
  b = a ? a.crate$binding$bindable$_value$arity$1 : a;
  if(b) {
    return a.crate$binding$bindable$_value$arity$1(a)
  }
  b = crate.binding._value[goog.typeOf(null == a ? null : a)];
  if(!b && (b = crate.binding._value._, !b)) {
    throw cljs.core.missing_protocol("bindable.-value", a);
  }
  return b.call(null, a)
};
crate.binding._on_change = function(a, b) {
  var c;
  c = a ? a.crate$binding$bindable$_on_change$arity$2 : a;
  if(c) {
    return a.crate$binding$bindable$_on_change$arity$2(a, b)
  }
  c = crate.binding._on_change[goog.typeOf(null == a ? null : a)];
  if(!c && (c = crate.binding._on_change._, !c)) {
    throw cljs.core.missing_protocol("bindable.-on-change", a);
  }
  return c.call(null, a, b)
};
crate.binding.atom_binding = function(a, b) {
  this.atm = a;
  this.value_func = b
};
crate.binding.atom_binding.cljs$lang$type = !0;
crate.binding.atom_binding.cljs$lang$ctorStr = "crate.binding/atom-binding";
crate.binding.atom_binding.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write(b, "crate.binding/atom-binding")
};
crate.binding.atom_binding.prototype.crate$binding$bindable$ = !0;
crate.binding.atom_binding.prototype.crate$binding$bindable$_value$arity$1 = function() {
  return this.value_func.cljs$core$IFn$_invoke$arity$1 ? this.value_func.cljs$core$IFn$_invoke$arity$1(cljs.core.deref(this.atm)) : this.value_func.call(null, cljs.core.deref(this.atm))
};
crate.binding.atom_binding.prototype.crate$binding$bindable$_on_change$arity$2 = function(a, b) {
  return cljs.core.add_watch(this.atm, cljs.core.gensym.cljs$core$IFn$_invoke$arity$1("atom-binding"), function() {
    return b.cljs$core$IFn$_invoke$arity$1 ? b.cljs$core$IFn$_invoke$arity$1(a.crate$binding$bindable$_value$arity$1(a)) : b.call(null, a.crate$binding$bindable$_value$arity$1(a))
  })
};
crate.binding.__GT_atom_binding = function(a, b) {
  return new crate.binding.atom_binding(a, b)
};
crate.binding.notifier = function(a) {
  this.watches = a;
  this.cljs$lang$protocol_mask$partition0$ = 0;
  this.cljs$lang$protocol_mask$partition1$ = 2
};
crate.binding.notifier.cljs$lang$type = !0;
crate.binding.notifier.cljs$lang$ctorStr = "crate.binding/notifier";
crate.binding.notifier.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write(b, "crate.binding/notifier")
};
crate.binding.notifier.prototype.cljs$core$IWatchable$_notify_watches$arity$3 = function(a, b, c) {
  for(var d = cljs.core.seq(this.watches), e = null, f = 0, g = 0;;) {
    if(g < f) {
      var h = e.cljs$core$IIndexed$_nth$arity$2(e, g), i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(h, 0, null), h = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(h, 1, null);
      h.cljs$core$IFn$_invoke$arity$4 ? h.cljs$core$IFn$_invoke$arity$4(i, a, b, c) : h.call(null, i, a, b, c);
      g += 1
    }else {
      if(d = cljs.core.seq(d)) {
        cljs.core.chunked_seq_QMARK_(d) ? (e = cljs.core.chunk_first(d), d = cljs.core.chunk_rest(d), i = e, f = cljs.core.count(e), e = i) : (e = cljs.core.first(d), i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(e, 0, null), h = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(e, 1, null), h.cljs$core$IFn$_invoke$arity$4 ? h.cljs$core$IFn$_invoke$arity$4(i, a, b, c) : h.call(null, i, a, b, c), d = cljs.core.next(d), e = null, f = 0), g = 0
      }else {
        return null
      }
    }
  }
};
crate.binding.notifier.prototype.cljs$core$IWatchable$_add_watch$arity$3 = function(a, b, c) {
  return a.watches = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(this.watches, b, c)
};
crate.binding.notifier.prototype.cljs$core$IWatchable$_remove_watch$arity$2 = function(a, b) {
  return a.watches = cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(this.watches, b)
};
crate.binding.__GT_notifier = function(a) {
  return new crate.binding.notifier(a)
};
crate.binding.bound_collection = function(a, b, c, d) {
  this.atm = a;
  this.notif = b;
  this.opts = c;
  this.stuff = d
};
crate.binding.bound_collection.cljs$lang$type = !0;
crate.binding.bound_collection.cljs$lang$ctorStr = "crate.binding/bound-collection";
crate.binding.bound_collection.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write(b, "crate.binding/bound-collection")
};
crate.binding.bound_collection.prototype.crate$binding$bindable$ = !0;
crate.binding.bound_collection.prototype.crate$binding$bindable$_value$arity$1 = function(a) {
  return cljs.core.map.cljs$core$IFn$_invoke$arity$2("\ufdd0:elem", cljs.core.vals(a.stuff))
};
crate.binding.bound_collection.prototype.crate$binding$bindable$_on_change$arity$2 = function(a, b) {
  return cljs.core.add_watch(this.notif, cljs.core.gensym.cljs$core$IFn$_invoke$arity$1("bound-coll"), function(a, d, e, f) {
    a = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(f, 0, null);
    d = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(f, 1, null);
    f = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(f, 2, null);
    return b.cljs$core$IFn$_invoke$arity$3 ? b.cljs$core$IFn$_invoke$arity$3(a, d, f) : b.call(null, a, d, f)
  })
};
crate.binding.bound_collection.prototype.crate$binding$bindable_coll$ = !0;
crate.binding.__GT_bound_collection = function(a, b, c, d) {
  return new crate.binding.bound_collection(a, b, c, d)
};
crate.binding.opt = function(a, b) {
  return a.opts.call(null, b)
};
crate.binding.bc_add = function(a, b, c) {
  var b = crate.binding.subatom(a.atm, b), d = crate.binding.opt(a, "\ufdd0:as").call(null, b);
  a.stuff = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(a.stuff, c, cljs.core.PersistentArrayMap.fromArray(["\ufdd0:elem", d, "\ufdd0:subatom", b], !0));
  return crate.binding.notify(a.notif, null, cljs.core.PersistentVector.fromArray(["\ufdd0:add", d, cljs.core.deref(b)], !0))
};
crate.binding.bc_remove = function(a, b) {
  var c = a.stuff.call(null, b);
  a.stuff = cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(a.stuff, b);
  crate.binding.notify(a.notif, null, cljs.core.PersistentVector.fromArray(["\ufdd0:remove", (new cljs.core.Keyword("\ufdd0:elem")).call(null, c), null], !0));
  return crate.binding.sub_destroy_BANG_((new cljs.core.Keyword("\ufdd0:subatom")).call(null, c))
};
crate.binding.__GT_indexed = function(a) {
  return cljs.core.map_QMARK_(a) ? cljs.core.seq(a) : cljs.core.set_QMARK_(a) ? cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.juxt.cljs$core$IFn$_invoke$arity$2(cljs.core.identity, cljs.core.identity), a) : cljs.core.map_indexed(cljs.core.vector, a)
};
crate.binding.__GT_keyed = function(a, b) {
  return cljs.core.into(cljs.core.PersistentHashSet.EMPTY, cljs.core.map.cljs$core$IFn$_invoke$arity$2(b, crate.binding.__GT_indexed(a)))
};
crate.binding.__GT_path = function() {
  var a = function(a, b) {
    return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(function() {
      var b = crate.binding.opt(a, "\ufdd0:path");
      return cljs.core.truth_(b) ? b : cljs.core.PersistentVector.EMPTY
    }(), b)
  }, b = function(b, d) {
    var e = null;
    1 < arguments.length && (e = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0));
    return a.call(this, b, e)
  };
  b.cljs$lang$maxFixedArity = 1;
  b.cljs$lang$applyTo = function(b) {
    var d = cljs.core.first(b), b = cljs.core.rest(b);
    return a(d, b)
  };
  b.cljs$core$IFn$_invoke$arity$variadic = a;
  return b
}();
crate.binding.bc_compare = function(a, b) {
  for(var c = cljs.core.into(cljs.core.PersistentHashSet.EMPTY, cljs.core.keys(a.stuff)), d = crate.binding.__GT_keyed(b, crate.binding.opt(a, "\ufdd0:keyfn")), e = cljs.core.into(cljs.core.sorted_set(), clojure.set.difference.cljs$core$IFn$_invoke$arity$2(d, c)), c = cljs.core.into(cljs.core.sorted_set(), clojure.set.difference.cljs$core$IFn$_invoke$arity$2(c, d)), e = cljs.core.seq(e), d = null, f = 0, g = 0;;) {
    if(g < f) {
      var h = d.cljs$core$IIndexed$_nth$arity$2(d, g);
      crate.binding.bc_add(a, h, h);
      g += 1
    }else {
      if(e = cljs.core.seq(e)) {
        d = e, cljs.core.chunked_seq_QMARK_(d) ? (e = cljs.core.chunk_first(d), g = cljs.core.chunk_rest(d), d = e, f = cljs.core.count(e), e = g) : (e = cljs.core.first(d), crate.binding.bc_add(a, e, e), e = cljs.core.next(d), d = null, f = 0), g = 0
      }else {
        break
      }
    }
  }
  c = cljs.core.seq(c);
  e = null;
  for(g = f = 0;;) {
    if(g < f) {
      d = e.cljs$core$IIndexed$_nth$arity$2(e, g), crate.binding.bc_remove(a, d), g += 1
    }else {
      if(c = cljs.core.seq(c)) {
        e = c, cljs.core.chunked_seq_QMARK_(e) ? (c = cljs.core.chunk_first(e), f = cljs.core.chunk_rest(e), e = c, d = cljs.core.count(c), c = f, f = d) : (d = cljs.core.first(e), crate.binding.bc_remove(a, d), c = cljs.core.next(e), e = null, f = 0), g = 0
      }else {
        return null
      }
    }
  }
};
crate.binding.bound_coll = function() {
  var a = function(a, b) {
    var e = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(b, 0, null), f = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(b, 1, null), e = cljs.core.truth_(f) ? cljs.core.PersistentVector.fromArray([e, f], !0) : cljs.core.PersistentVector.fromArray([null, e], !0), f = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(e, 0, null), g = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(e, 1, null), e = cljs.core.not(f) ? a : crate.binding.subatom(a, f), f = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(g, "\ufdd0:path", 
    f), f = cljs.core.not((new cljs.core.Keyword("\ufdd0:keyfn")).call(null, f)) ? cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(f, "\ufdd0:keyfn", cljs.core.first) : cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(f, "\ufdd0:keyfn", cljs.core.comp.cljs$core$IFn$_invoke$arity$2((new cljs.core.Keyword("\ufdd0:keyfn")).call(null, f), cljs.core.second)), h = new crate.binding.bound_collection(e, new crate.binding.notifier(null), f, cljs.core.sorted_map());
    cljs.core.add_watch(e, cljs.core.gensym.cljs$core$IFn$_invoke$arity$1("bound-coll"), function(a, b, c, d) {
      return crate.binding.bc_compare(h, d)
    });
    crate.binding.bc_compare(h, cljs.core.deref(e));
    return h
  }, b = function(b, d) {
    var e = null;
    1 < arguments.length && (e = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0));
    return a.call(this, b, e)
  };
  b.cljs$lang$maxFixedArity = 1;
  b.cljs$lang$applyTo = function(b) {
    var d = cljs.core.first(b), b = cljs.core.rest(b);
    return a(d, b)
  };
  b.cljs$core$IFn$_invoke$arity$variadic = a;
  return b
}();
crate.binding.map_bound = function() {
  var a = function(a, b, e) {
    var e = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(e, 0, null), a = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(e, "\ufdd0:as", a), b = cljs.core.not((new cljs.core.Keyword("\ufdd0:path")).call(null, a)) ? b : crate.binding.subatom(b, (new cljs.core.Keyword("\ufdd0:path")).call(null, a)), a = cljs.core.not((new cljs.core.Keyword("\ufdd0:keyfn")).call(null, a)) ? cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(a, "\ufdd0:keyfn", cljs.core.first) : cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(a, 
    "\ufdd0:keyfn", cljs.core.comp.cljs$core$IFn$_invoke$arity$2((new cljs.core.Keyword("\ufdd0:keyfn")).call(null, a), cljs.core.second)), f = new crate.binding.bound_collection(b, new crate.binding.notifier(null), a, cljs.core.sorted_map());
    cljs.core.add_watch(b, cljs.core.gensym.cljs$core$IFn$_invoke$arity$1("bound-coll"), function(a, b, c, d) {
      return crate.binding.bc_compare(f, d)
    });
    crate.binding.bc_compare(f, cljs.core.deref(b));
    return f
  }, b = function(b, d, e) {
    var f = null;
    2 < arguments.length && (f = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
    return a.call(this, b, d, f)
  };
  b.cljs$lang$maxFixedArity = 2;
  b.cljs$lang$applyTo = function(b) {
    var d = cljs.core.first(b), b = cljs.core.next(b), e = cljs.core.first(b), b = cljs.core.rest(b);
    return a(d, e, b)
  };
  b.cljs$core$IFn$_invoke$arity$variadic = a;
  return b
}();
crate.binding.binding_QMARK_ = function(a) {
  return a ? cljs.core.truth_(cljs.core.truth_(null) ? null : a.crate$binding$bindable$) ? !0 : a.cljs$lang$protocol_mask$partition$ ? !1 : cljs.core.type_satisfies_(crate.binding.bindable, a) : cljs.core.type_satisfies_(crate.binding.bindable, a)
};
crate.binding.binding_coll_QMARK_ = function(a) {
  return a ? cljs.core.truth_(cljs.core.truth_(null) ? null : a.crate$binding$bindable_coll$) ? !0 : a.cljs$lang$protocol_mask$partition$ ? !1 : cljs.core.type_satisfies_(crate.binding.bindable_coll, a) : cljs.core.type_satisfies_(crate.binding.bindable_coll, a)
};
crate.binding.deref_QMARK_ = function(a) {
  if(a) {
    var b;
    b = (b = a.cljs$lang$protocol_mask$partition0$ & 32768) ? b : a.cljs$core$IDeref$;
    return b ? !0 : a.cljs$lang$protocol_mask$partition0$ ? !1 : cljs.core.type_satisfies_(cljs.core.IDeref, a)
  }
  return cljs.core.type_satisfies_(cljs.core.IDeref, a)
};
crate.binding.value = function(a) {
  return crate.binding._value(a)
};
crate.binding.index = function(a) {
  return cljs.core.last(a.path)
};
crate.binding.on_change = function(a, b) {
  return crate.binding._on_change(a, b)
};
crate.binding.bound = function() {
  var a = function(a, b) {
    var e;
    e = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(b, 0, null);
    e = cljs.core.truth_(e) ? e : cljs.core.identity;
    return new crate.binding.atom_binding(a, e)
  }, b = function(b, d) {
    var e = null;
    1 < arguments.length && (e = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0));
    return a.call(this, b, e)
  };
  b.cljs$lang$maxFixedArity = 1;
  b.cljs$lang$applyTo = function(b) {
    var d = cljs.core.first(b), b = cljs.core.rest(b);
    return a(d, b)
  };
  b.cljs$core$IFn$_invoke$arity$variadic = a;
  return b
}();
goog.userAgent = {};
goog.userAgent.ASSUME_IE = !1;
goog.userAgent.ASSUME_GECKO = !1;
goog.userAgent.ASSUME_WEBKIT = !1;
goog.userAgent.ASSUME_MOBILE_WEBKIT = !1;
goog.userAgent.ASSUME_OPERA = !1;
goog.userAgent.ASSUME_ANY_VERSION = !1;
goog.userAgent.BROWSER_KNOWN_ = goog.userAgent.ASSUME_IE || goog.userAgent.ASSUME_GECKO || goog.userAgent.ASSUME_MOBILE_WEBKIT || goog.userAgent.ASSUME_WEBKIT || goog.userAgent.ASSUME_OPERA;
goog.userAgent.getUserAgentString = function() {
  return goog.global.navigator ? goog.global.navigator.userAgent : null
};
goog.userAgent.getNavigator = function() {
  return goog.global.navigator
};
goog.userAgent.init_ = function() {
  goog.userAgent.detectedOpera_ = !1;
  goog.userAgent.detectedIe_ = !1;
  goog.userAgent.detectedWebkit_ = !1;
  goog.userAgent.detectedMobile_ = !1;
  goog.userAgent.detectedGecko_ = !1;
  var a;
  if(!goog.userAgent.BROWSER_KNOWN_ && (a = goog.userAgent.getUserAgentString())) {
    var b = goog.userAgent.getNavigator();
    goog.userAgent.detectedOpera_ = 0 == a.indexOf("Opera");
    goog.userAgent.detectedIe_ = !goog.userAgent.detectedOpera_ && -1 != a.indexOf("MSIE");
    goog.userAgent.detectedWebkit_ = !goog.userAgent.detectedOpera_ && -1 != a.indexOf("WebKit");
    goog.userAgent.detectedMobile_ = goog.userAgent.detectedWebkit_ && -1 != a.indexOf("Mobile");
    goog.userAgent.detectedGecko_ = !goog.userAgent.detectedOpera_ && !goog.userAgent.detectedWebkit_ && "Gecko" == b.product
  }
};
goog.userAgent.BROWSER_KNOWN_ || goog.userAgent.init_();
goog.userAgent.OPERA = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_OPERA : goog.userAgent.detectedOpera_;
goog.userAgent.IE = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_IE : goog.userAgent.detectedIe_;
goog.userAgent.GECKO = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_GECKO : goog.userAgent.detectedGecko_;
goog.userAgent.WEBKIT = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_WEBKIT || goog.userAgent.ASSUME_MOBILE_WEBKIT : goog.userAgent.detectedWebkit_;
goog.userAgent.MOBILE = goog.userAgent.ASSUME_MOBILE_WEBKIT || goog.userAgent.detectedMobile_;
goog.userAgent.SAFARI = goog.userAgent.WEBKIT;
goog.userAgent.determinePlatform_ = function() {
  var a = goog.userAgent.getNavigator();
  return a && a.platform || ""
};
goog.userAgent.PLATFORM = goog.userAgent.determinePlatform_();
goog.userAgent.ASSUME_MAC = !1;
goog.userAgent.ASSUME_WINDOWS = !1;
goog.userAgent.ASSUME_LINUX = !1;
goog.userAgent.ASSUME_X11 = !1;
goog.userAgent.PLATFORM_KNOWN_ = goog.userAgent.ASSUME_MAC || goog.userAgent.ASSUME_WINDOWS || goog.userAgent.ASSUME_LINUX || goog.userAgent.ASSUME_X11;
goog.userAgent.initPlatform_ = function() {
  goog.userAgent.detectedMac_ = goog.string.contains(goog.userAgent.PLATFORM, "Mac");
  goog.userAgent.detectedWindows_ = goog.string.contains(goog.userAgent.PLATFORM, "Win");
  goog.userAgent.detectedLinux_ = goog.string.contains(goog.userAgent.PLATFORM, "Linux");
  goog.userAgent.detectedX11_ = !!goog.userAgent.getNavigator() && goog.string.contains(goog.userAgent.getNavigator().appVersion || "", "X11")
};
goog.userAgent.PLATFORM_KNOWN_ || goog.userAgent.initPlatform_();
goog.userAgent.MAC = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_MAC : goog.userAgent.detectedMac_;
goog.userAgent.WINDOWS = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_WINDOWS : goog.userAgent.detectedWindows_;
goog.userAgent.LINUX = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_LINUX : goog.userAgent.detectedLinux_;
goog.userAgent.X11 = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_X11 : goog.userAgent.detectedX11_;
goog.userAgent.determineVersion_ = function() {
  var a = "", b;
  goog.userAgent.OPERA && goog.global.opera ? (a = goog.global.opera.version, a = "function" == typeof a ? a() : a) : (goog.userAgent.GECKO ? b = /rv\:([^\);]+)(\)|;)/ : goog.userAgent.IE ? b = /MSIE\s+([^\);]+)(\)|;)/ : goog.userAgent.WEBKIT && (b = /WebKit\/(\S+)/), b && (a = (a = b.exec(goog.userAgent.getUserAgentString())) ? a[1] : ""));
  return goog.userAgent.IE && (b = goog.userAgent.getDocumentMode_(), b > parseFloat(a)) ? String(b) : a
};
goog.userAgent.getDocumentMode_ = function() {
  var a = goog.global.document;
  return a ? a.documentMode : void 0
};
goog.userAgent.VERSION = goog.userAgent.determineVersion_();
goog.userAgent.compare = function(a, b) {
  return goog.string.compareVersions(a, b)
};
goog.userAgent.isVersionCache_ = {};
goog.userAgent.isVersion = function(a) {
  return goog.userAgent.ASSUME_ANY_VERSION || goog.userAgent.isVersionCache_[a] || (goog.userAgent.isVersionCache_[a] = 0 <= goog.string.compareVersions(goog.userAgent.VERSION, a))
};
goog.userAgent.isDocumentModeCache_ = {};
goog.userAgent.isDocumentMode = function(a) {
  return goog.userAgent.isDocumentModeCache_[a] || (goog.userAgent.isDocumentModeCache_[a] = goog.userAgent.IE && !!document.documentMode && document.documentMode >= a)
};
goog.dom = {};
goog.dom.BrowserFeature = {CAN_ADD_NAME_OR_TYPE_ATTRIBUTES:!goog.userAgent.IE || goog.userAgent.isDocumentMode(9), CAN_USE_CHILDREN_ATTRIBUTE:!goog.userAgent.GECKO && !goog.userAgent.IE || goog.userAgent.IE && goog.userAgent.isDocumentMode(9) || goog.userAgent.GECKO && goog.userAgent.isVersion("1.9.1"), CAN_USE_INNER_TEXT:goog.userAgent.IE && !goog.userAgent.isVersion("9"), CAN_USE_PARENT_ELEMENT_PROPERTY:goog.userAgent.IE || goog.userAgent.OPERA || goog.userAgent.WEBKIT, INNER_HTML_NEEDS_SCOPED_ELEMENT:goog.userAgent.IE};
goog.dom.TagName = {A:"A", ABBR:"ABBR", ACRONYM:"ACRONYM", ADDRESS:"ADDRESS", APPLET:"APPLET", AREA:"AREA", AUDIO:"AUDIO", B:"B", BASE:"BASE", BASEFONT:"BASEFONT", BDO:"BDO", BIG:"BIG", BLOCKQUOTE:"BLOCKQUOTE", BODY:"BODY", BR:"BR", BUTTON:"BUTTON", CANVAS:"CANVAS", CAPTION:"CAPTION", CENTER:"CENTER", CITE:"CITE", CODE:"CODE", COL:"COL", COLGROUP:"COLGROUP", DD:"DD", DEL:"DEL", DFN:"DFN", DIR:"DIR", DIV:"DIV", DL:"DL", DT:"DT", EM:"EM", FIELDSET:"FIELDSET", FONT:"FONT", FORM:"FORM", FRAME:"FRAME", 
FRAMESET:"FRAMESET", H1:"H1", H2:"H2", H3:"H3", H4:"H4", H5:"H5", H6:"H6", HEAD:"HEAD", HR:"HR", HTML:"HTML", I:"I", IFRAME:"IFRAME", IMG:"IMG", INPUT:"INPUT", INS:"INS", ISINDEX:"ISINDEX", KBD:"KBD", LABEL:"LABEL", LEGEND:"LEGEND", LI:"LI", LINK:"LINK", MAP:"MAP", MENU:"MENU", META:"META", NOFRAMES:"NOFRAMES", NOSCRIPT:"NOSCRIPT", OBJECT:"OBJECT", OL:"OL", OPTGROUP:"OPTGROUP", OPTION:"OPTION", P:"P", PARAM:"PARAM", PRE:"PRE", Q:"Q", S:"S", SAMP:"SAMP", SCRIPT:"SCRIPT", SELECT:"SELECT", SMALL:"SMALL", 
SPAN:"SPAN", STRIKE:"STRIKE", STRONG:"STRONG", STYLE:"STYLE", SUB:"SUB", SUP:"SUP", TABLE:"TABLE", TBODY:"TBODY", TD:"TD", TEXTAREA:"TEXTAREA", TFOOT:"TFOOT", TH:"TH", THEAD:"THEAD", TITLE:"TITLE", TR:"TR", TT:"TT", U:"U", UL:"UL", VAR:"VAR", VIDEO:"VIDEO"};
goog.dom.classes = {};
goog.dom.classes.set = function(a, b) {
  a.className = b
};
goog.dom.classes.get = function(a) {
  a = a.className;
  return goog.isString(a) && a.match(/\S+/g) || []
};
goog.dom.classes.add = function(a, b) {
  var c = goog.dom.classes.get(a), d = goog.array.slice(arguments, 1), e = c.length + d.length;
  goog.dom.classes.add_(c, d);
  a.className = c.join(" ");
  return c.length == e
};
goog.dom.classes.remove = function(a, b) {
  var c = goog.dom.classes.get(a), d = goog.array.slice(arguments, 1), e = goog.dom.classes.getDifference_(c, d);
  a.className = e.join(" ");
  return e.length == c.length - d.length
};
goog.dom.classes.add_ = function(a, b) {
  for(var c = 0;c < b.length;c++) {
    goog.array.contains(a, b[c]) || a.push(b[c])
  }
};
goog.dom.classes.getDifference_ = function(a, b) {
  return goog.array.filter(a, function(a) {
    return!goog.array.contains(b, a)
  })
};
goog.dom.classes.swap = function(a, b, c) {
  for(var d = goog.dom.classes.get(a), e = !1, f = 0;f < d.length;f++) {
    d[f] == b && (goog.array.splice(d, f--, 1), e = !0)
  }
  e && (d.push(c), a.className = d.join(" "));
  return e
};
goog.dom.classes.addRemove = function(a, b, c) {
  var d = goog.dom.classes.get(a);
  goog.isString(b) ? goog.array.remove(d, b) : goog.isArray(b) && (d = goog.dom.classes.getDifference_(d, b));
  goog.isString(c) && !goog.array.contains(d, c) ? d.push(c) : goog.isArray(c) && goog.dom.classes.add_(d, c);
  a.className = d.join(" ")
};
goog.dom.classes.has = function(a, b) {
  return goog.array.contains(goog.dom.classes.get(a), b)
};
goog.dom.classes.enable = function(a, b, c) {
  c ? goog.dom.classes.add(a, b) : goog.dom.classes.remove(a, b)
};
goog.dom.classes.toggle = function(a, b) {
  var c = !goog.dom.classes.has(a, b);
  goog.dom.classes.enable(a, b, c);
  return c
};
goog.math = {};
goog.math.randomInt = function(a) {
  return Math.floor(Math.random() * a)
};
goog.math.uniformRandom = function(a, b) {
  return a + Math.random() * (b - a)
};
goog.math.clamp = function(a, b, c) {
  return Math.min(Math.max(a, b), c)
};
goog.math.modulo = function(a, b) {
  var c = a % b;
  return 0 > c * b ? c + b : c
};
goog.math.lerp = function(a, b, c) {
  return a + c * (b - a)
};
goog.math.nearlyEquals = function(a, b, c) {
  return Math.abs(a - b) <= (c || 1E-6)
};
goog.math.standardAngle = function(a) {
  return goog.math.modulo(a, 360)
};
goog.math.toRadians = function(a) {
  return a * Math.PI / 180
};
goog.math.toDegrees = function(a) {
  return 180 * a / Math.PI
};
goog.math.angleDx = function(a, b) {
  return b * Math.cos(goog.math.toRadians(a))
};
goog.math.angleDy = function(a, b) {
  return b * Math.sin(goog.math.toRadians(a))
};
goog.math.angle = function(a, b, c, d) {
  return goog.math.standardAngle(goog.math.toDegrees(Math.atan2(d - b, c - a)))
};
goog.math.angleDifference = function(a, b) {
  var c = goog.math.standardAngle(b) - goog.math.standardAngle(a);
  180 < c ? c -= 360 : -180 >= c && (c = 360 + c);
  return c
};
goog.math.sign = function(a) {
  return 0 == a ? 0 : 0 > a ? -1 : 1
};
goog.math.longestCommonSubsequence = function(a, b, c, d) {
  for(var c = c || function(a, b) {
    return a == b
  }, d = d || function(b) {
    return a[b]
  }, e = a.length, f = b.length, g = [], h = 0;h < e + 1;h++) {
    g[h] = [], g[h][0] = 0
  }
  for(var i = 0;i < f + 1;i++) {
    g[0][i] = 0
  }
  for(h = 1;h <= e;h++) {
    for(i = 1;i <= e;i++) {
      g[h][i] = c(a[h - 1], b[i - 1]) ? g[h - 1][i - 1] + 1 : Math.max(g[h - 1][i], g[h][i - 1])
    }
  }
  for(var j = [], h = e, i = f;0 < h && 0 < i;) {
    c(a[h - 1], b[i - 1]) ? (j.unshift(d(h - 1, i - 1)), h--, i--) : g[h - 1][i] > g[h][i - 1] ? h-- : i--
  }
  return j
};
goog.math.sum = function(a) {
  return goog.array.reduce(arguments, function(a, c) {
    return a + c
  }, 0)
};
goog.math.average = function(a) {
  return goog.math.sum.apply(null, arguments) / arguments.length
};
goog.math.standardDeviation = function(a) {
  var b = arguments.length;
  if(2 > b) {
    return 0
  }
  var c = goog.math.average.apply(null, arguments), b = goog.math.sum.apply(null, goog.array.map(arguments, function(a) {
    return Math.pow(a - c, 2)
  })) / (b - 1);
  return Math.sqrt(b)
};
goog.math.isInt = function(a) {
  return isFinite(a) && 0 == a % 1
};
goog.math.isFiniteNumber = function(a) {
  return isFinite(a) && !isNaN(a)
};
goog.math.Coordinate = function(a, b) {
  this.x = goog.isDef(a) ? a : 0;
  this.y = goog.isDef(b) ? b : 0
};
goog.math.Coordinate.prototype.clone = function() {
  return new goog.math.Coordinate(this.x, this.y)
};
goog.DEBUG && (goog.math.Coordinate.prototype.toString = function() {
  return"(" + this.x + ", " + this.y + ")"
});
goog.math.Coordinate.equals = function(a, b) {
  return a == b ? !0 : !a || !b ? !1 : a.x == b.x && a.y == b.y
};
goog.math.Coordinate.distance = function(a, b) {
  var c = a.x - b.x, d = a.y - b.y;
  return Math.sqrt(c * c + d * d)
};
goog.math.Coordinate.magnitude = function(a) {
  return Math.sqrt(a.x * a.x + a.y * a.y)
};
goog.math.Coordinate.azimuth = function(a) {
  return goog.math.angle(0, 0, a.x, a.y)
};
goog.math.Coordinate.squaredDistance = function(a, b) {
  var c = a.x - b.x, d = a.y - b.y;
  return c * c + d * d
};
goog.math.Coordinate.difference = function(a, b) {
  return new goog.math.Coordinate(a.x - b.x, a.y - b.y)
};
goog.math.Coordinate.sum = function(a, b) {
  return new goog.math.Coordinate(a.x + b.x, a.y + b.y)
};
goog.math.Size = function(a, b) {
  this.width = a;
  this.height = b
};
goog.math.Size.equals = function(a, b) {
  return a == b ? !0 : !a || !b ? !1 : a.width == b.width && a.height == b.height
};
goog.math.Size.prototype.clone = function() {
  return new goog.math.Size(this.width, this.height)
};
goog.DEBUG && (goog.math.Size.prototype.toString = function() {
  return"(" + this.width + " x " + this.height + ")"
});
goog.math.Size.prototype.getLongest = function() {
  return Math.max(this.width, this.height)
};
goog.math.Size.prototype.getShortest = function() {
  return Math.min(this.width, this.height)
};
goog.math.Size.prototype.area = function() {
  return this.width * this.height
};
goog.math.Size.prototype.perimeter = function() {
  return 2 * (this.width + this.height)
};
goog.math.Size.prototype.aspectRatio = function() {
  return this.width / this.height
};
goog.math.Size.prototype.isEmpty = function() {
  return!this.area()
};
goog.math.Size.prototype.ceil = function() {
  this.width = Math.ceil(this.width);
  this.height = Math.ceil(this.height);
  return this
};
goog.math.Size.prototype.fitsInside = function(a) {
  return this.width <= a.width && this.height <= a.height
};
goog.math.Size.prototype.floor = function() {
  this.width = Math.floor(this.width);
  this.height = Math.floor(this.height);
  return this
};
goog.math.Size.prototype.round = function() {
  this.width = Math.round(this.width);
  this.height = Math.round(this.height);
  return this
};
goog.math.Size.prototype.scale = function(a) {
  this.width *= a;
  this.height *= a;
  return this
};
goog.math.Size.prototype.scaleToFit = function(a) {
  a = this.aspectRatio() > a.aspectRatio() ? a.width / this.width : a.height / this.height;
  return this.scale(a)
};
goog.dom.ASSUME_QUIRKS_MODE = !1;
goog.dom.ASSUME_STANDARDS_MODE = !1;
goog.dom.COMPAT_MODE_KNOWN_ = goog.dom.ASSUME_QUIRKS_MODE || goog.dom.ASSUME_STANDARDS_MODE;
goog.dom.NodeType = {ELEMENT:1, ATTRIBUTE:2, TEXT:3, CDATA_SECTION:4, ENTITY_REFERENCE:5, ENTITY:6, PROCESSING_INSTRUCTION:7, COMMENT:8, DOCUMENT:9, DOCUMENT_TYPE:10, DOCUMENT_FRAGMENT:11, NOTATION:12};
goog.dom.getDomHelper = function(a) {
  return a ? new goog.dom.DomHelper(goog.dom.getOwnerDocument(a)) : goog.dom.defaultDomHelper_ || (goog.dom.defaultDomHelper_ = new goog.dom.DomHelper)
};
goog.dom.getDocument = function() {
  return document
};
goog.dom.getElement = function(a) {
  return goog.isString(a) ? document.getElementById(a) : a
};
goog.dom.$ = goog.dom.getElement;
goog.dom.getElementsByTagNameAndClass = function(a, b, c) {
  return goog.dom.getElementsByTagNameAndClass_(document, a, b, c)
};
goog.dom.getElementsByClass = function(a, b) {
  var c = b || document;
  return goog.dom.canUseQuerySelector_(c) ? c.querySelectorAll("." + a) : c.getElementsByClassName ? c.getElementsByClassName(a) : goog.dom.getElementsByTagNameAndClass_(document, "*", a, b)
};
goog.dom.getElementByClass = function(a, b) {
  var c = b || document, d = null;
  return(d = goog.dom.canUseQuerySelector_(c) ? c.querySelector("." + a) : goog.dom.getElementsByClass(a, b)[0]) || null
};
goog.dom.canUseQuerySelector_ = function(a) {
  return!(!a.querySelectorAll || !a.querySelector)
};
goog.dom.getElementsByTagNameAndClass_ = function(a, b, c, d) {
  a = d || a;
  b = b && "*" != b ? b.toUpperCase() : "";
  if(goog.dom.canUseQuerySelector_(a) && (b || c)) {
    return a.querySelectorAll(b + (c ? "." + c : ""))
  }
  if(c && a.getElementsByClassName) {
    a = a.getElementsByClassName(c);
    if(b) {
      for(var d = {}, e = 0, f = 0, g;g = a[f];f++) {
        b == g.nodeName && (d[e++] = g)
      }
      d.length = e;
      return d
    }
    return a
  }
  a = a.getElementsByTagName(b || "*");
  if(c) {
    d = {};
    for(f = e = 0;g = a[f];f++) {
      b = g.className, "function" == typeof b.split && goog.array.contains(b.split(/\s+/), c) && (d[e++] = g)
    }
    d.length = e;
    return d
  }
  return a
};
goog.dom.$$ = goog.dom.getElementsByTagNameAndClass;
goog.dom.setProperties = function(a, b) {
  goog.object.forEach(b, function(b, d) {
    "style" == d ? a.style.cssText = b : "class" == d ? a.className = b : "for" == d ? a.htmlFor = b : d in goog.dom.DIRECT_ATTRIBUTE_MAP_ ? a.setAttribute(goog.dom.DIRECT_ATTRIBUTE_MAP_[d], b) : goog.string.startsWith(d, "aria-") || goog.string.startsWith(d, "data-") ? a.setAttribute(d, b) : a[d] = b
  })
};
goog.dom.DIRECT_ATTRIBUTE_MAP_ = {cellpadding:"cellPadding", cellspacing:"cellSpacing", colspan:"colSpan", frameborder:"frameBorder", height:"height", maxlength:"maxLength", role:"role", rowspan:"rowSpan", type:"type", usemap:"useMap", valign:"vAlign", width:"width"};
goog.dom.getViewportSize = function(a) {
  return goog.dom.getViewportSize_(a || window)
};
goog.dom.getViewportSize_ = function(a) {
  a = a.document;
  a = goog.dom.isCss1CompatMode_(a) ? a.documentElement : a.body;
  return new goog.math.Size(a.clientWidth, a.clientHeight)
};
goog.dom.getDocumentHeight = function() {
  return goog.dom.getDocumentHeight_(window)
};
goog.dom.getDocumentHeight_ = function(a) {
  var b = a.document, c = 0;
  if(b) {
    var a = goog.dom.getViewportSize_(a).height, c = b.body, d = b.documentElement;
    if(goog.dom.isCss1CompatMode_(b) && d.scrollHeight) {
      c = d.scrollHeight != a ? d.scrollHeight : d.offsetHeight
    }else {
      var b = d.scrollHeight, e = d.offsetHeight;
      d.clientHeight != e && (b = c.scrollHeight, e = c.offsetHeight);
      c = b > a ? b > e ? b : e : b < e ? b : e
    }
  }
  return c
};
goog.dom.getPageScroll = function(a) {
  return goog.dom.getDomHelper((a || goog.global || window).document).getDocumentScroll()
};
goog.dom.getDocumentScroll = function() {
  return goog.dom.getDocumentScroll_(document)
};
goog.dom.getDocumentScroll_ = function(a) {
  var b = goog.dom.getDocumentScrollElement_(a), a = goog.dom.getWindow_(a);
  return new goog.math.Coordinate(a.pageXOffset || b.scrollLeft, a.pageYOffset || b.scrollTop)
};
goog.dom.getDocumentScrollElement = function() {
  return goog.dom.getDocumentScrollElement_(document)
};
goog.dom.getDocumentScrollElement_ = function(a) {
  return!goog.userAgent.WEBKIT && goog.dom.isCss1CompatMode_(a) ? a.documentElement : a.body
};
goog.dom.getWindow = function(a) {
  return a ? goog.dom.getWindow_(a) : window
};
goog.dom.getWindow_ = function(a) {
  return a.parentWindow || a.defaultView
};
goog.dom.createDom = function(a, b, c) {
  return goog.dom.createDom_(document, arguments)
};
goog.dom.createDom_ = function(a, b) {
  var c = b[0], d = b[1];
  if(!goog.dom.BrowserFeature.CAN_ADD_NAME_OR_TYPE_ATTRIBUTES && d && (d.name || d.type)) {
    c = ["<", c];
    d.name && c.push(' name="', goog.string.htmlEscape(d.name), '"');
    if(d.type) {
      c.push(' type="', goog.string.htmlEscape(d.type), '"');
      var e = {};
      goog.object.extend(e, d);
      d = e;
      delete d.type
    }
    c.push(">");
    c = c.join("")
  }
  c = a.createElement(c);
  d && (goog.isString(d) ? c.className = d : goog.isArray(d) ? goog.dom.classes.add.apply(null, [c].concat(d)) : goog.dom.setProperties(c, d));
  2 < b.length && goog.dom.append_(a, c, b, 2);
  return c
};
goog.dom.append_ = function(a, b, c, d) {
  function e(c) {
    c && b.appendChild(goog.isString(c) ? a.createTextNode(c) : c)
  }
  for(;d < c.length;d++) {
    var f = c[d];
    goog.isArrayLike(f) && !goog.dom.isNodeLike(f) ? goog.array.forEach(goog.dom.isNodeList(f) ? goog.array.toArray(f) : f, e) : e(f)
  }
};
goog.dom.$dom = goog.dom.createDom;
goog.dom.createElement = function(a) {
  return document.createElement(a)
};
goog.dom.createTextNode = function(a) {
  return document.createTextNode(a)
};
goog.dom.createTable = function(a, b, c) {
  return goog.dom.createTable_(document, a, b, !!c)
};
goog.dom.createTable_ = function(a, b, c, d) {
  for(var e = ["<tr>"], f = 0;f < c;f++) {
    e.push(d ? "<td>&nbsp;</td>" : "<td></td>")
  }
  e.push("</tr>");
  e = e.join("");
  c = ["<table>"];
  for(f = 0;f < b;f++) {
    c.push(e)
  }
  c.push("</table>");
  a = a.createElement(goog.dom.TagName.DIV);
  a.innerHTML = c.join("");
  return a.removeChild(a.firstChild)
};
goog.dom.htmlToDocumentFragment = function(a) {
  return goog.dom.htmlToDocumentFragment_(document, a)
};
goog.dom.htmlToDocumentFragment_ = function(a, b) {
  var c = a.createElement("div");
  goog.dom.BrowserFeature.INNER_HTML_NEEDS_SCOPED_ELEMENT ? (c.innerHTML = "<br>" + b, c.removeChild(c.firstChild)) : c.innerHTML = b;
  if(1 == c.childNodes.length) {
    return c.removeChild(c.firstChild)
  }
  for(var d = a.createDocumentFragment();c.firstChild;) {
    d.appendChild(c.firstChild)
  }
  return d
};
goog.dom.getCompatMode = function() {
  return goog.dom.isCss1CompatMode() ? "CSS1Compat" : "BackCompat"
};
goog.dom.isCss1CompatMode = function() {
  return goog.dom.isCss1CompatMode_(document)
};
goog.dom.isCss1CompatMode_ = function(a) {
  return goog.dom.COMPAT_MODE_KNOWN_ ? goog.dom.ASSUME_STANDARDS_MODE : "CSS1Compat" == a.compatMode
};
goog.dom.canHaveChildren = function(a) {
  if(a.nodeType != goog.dom.NodeType.ELEMENT) {
    return!1
  }
  switch(a.tagName) {
    case goog.dom.TagName.APPLET:
    ;
    case goog.dom.TagName.AREA:
    ;
    case goog.dom.TagName.BASE:
    ;
    case goog.dom.TagName.BR:
    ;
    case goog.dom.TagName.COL:
    ;
    case goog.dom.TagName.FRAME:
    ;
    case goog.dom.TagName.HR:
    ;
    case goog.dom.TagName.IMG:
    ;
    case goog.dom.TagName.INPUT:
    ;
    case goog.dom.TagName.IFRAME:
    ;
    case goog.dom.TagName.ISINDEX:
    ;
    case goog.dom.TagName.LINK:
    ;
    case goog.dom.TagName.NOFRAMES:
    ;
    case goog.dom.TagName.NOSCRIPT:
    ;
    case goog.dom.TagName.META:
    ;
    case goog.dom.TagName.OBJECT:
    ;
    case goog.dom.TagName.PARAM:
    ;
    case goog.dom.TagName.SCRIPT:
    ;
    case goog.dom.TagName.STYLE:
      return!1
  }
  return!0
};
goog.dom.appendChild = function(a, b) {
  a.appendChild(b)
};
goog.dom.append = function(a, b) {
  goog.dom.append_(goog.dom.getOwnerDocument(a), a, arguments, 1)
};
goog.dom.removeChildren = function(a) {
  for(var b;b = a.firstChild;) {
    a.removeChild(b)
  }
};
goog.dom.insertSiblingBefore = function(a, b) {
  b.parentNode && b.parentNode.insertBefore(a, b)
};
goog.dom.insertSiblingAfter = function(a, b) {
  b.parentNode && b.parentNode.insertBefore(a, b.nextSibling)
};
goog.dom.insertChildAt = function(a, b, c) {
  a.insertBefore(b, a.childNodes[c] || null)
};
goog.dom.removeNode = function(a) {
  return a && a.parentNode ? a.parentNode.removeChild(a) : null
};
goog.dom.replaceNode = function(a, b) {
  var c = b.parentNode;
  c && c.replaceChild(a, b)
};
goog.dom.flattenElement = function(a) {
  var b, c = a.parentNode;
  if(c && c.nodeType != goog.dom.NodeType.DOCUMENT_FRAGMENT) {
    if(a.removeNode) {
      return a.removeNode(!1)
    }
    for(;b = a.firstChild;) {
      c.insertBefore(b, a)
    }
    return goog.dom.removeNode(a)
  }
};
goog.dom.getChildren = function(a) {
  return goog.dom.BrowserFeature.CAN_USE_CHILDREN_ATTRIBUTE && void 0 != a.children ? a.children : goog.array.filter(a.childNodes, function(a) {
    return a.nodeType == goog.dom.NodeType.ELEMENT
  })
};
goog.dom.getFirstElementChild = function(a) {
  return void 0 != a.firstElementChild ? a.firstElementChild : goog.dom.getNextElementNode_(a.firstChild, !0)
};
goog.dom.getLastElementChild = function(a) {
  return void 0 != a.lastElementChild ? a.lastElementChild : goog.dom.getNextElementNode_(a.lastChild, !1)
};
goog.dom.getNextElementSibling = function(a) {
  return void 0 != a.nextElementSibling ? a.nextElementSibling : goog.dom.getNextElementNode_(a.nextSibling, !0)
};
goog.dom.getPreviousElementSibling = function(a) {
  return void 0 != a.previousElementSibling ? a.previousElementSibling : goog.dom.getNextElementNode_(a.previousSibling, !1)
};
goog.dom.getNextElementNode_ = function(a, b) {
  for(;a && a.nodeType != goog.dom.NodeType.ELEMENT;) {
    a = b ? a.nextSibling : a.previousSibling
  }
  return a
};
goog.dom.getNextNode = function(a) {
  if(!a) {
    return null
  }
  if(a.firstChild) {
    return a.firstChild
  }
  for(;a && !a.nextSibling;) {
    a = a.parentNode
  }
  return a ? a.nextSibling : null
};
goog.dom.getPreviousNode = function(a) {
  if(!a) {
    return null
  }
  if(!a.previousSibling) {
    return a.parentNode
  }
  for(a = a.previousSibling;a && a.lastChild;) {
    a = a.lastChild
  }
  return a
};
goog.dom.isNodeLike = function(a) {
  return goog.isObject(a) && 0 < a.nodeType
};
goog.dom.isElement = function(a) {
  return goog.isObject(a) && a.nodeType == goog.dom.NodeType.ELEMENT
};
goog.dom.isWindow = function(a) {
  return goog.isObject(a) && a.window == a
};
goog.dom.getParentElement = function(a) {
  if(goog.dom.BrowserFeature.CAN_USE_PARENT_ELEMENT_PROPERTY) {
    return a.parentElement
  }
  a = a.parentNode;
  return goog.dom.isElement(a) ? a : null
};
goog.dom.contains = function(a, b) {
  if(a.contains && b.nodeType == goog.dom.NodeType.ELEMENT) {
    return a == b || a.contains(b)
  }
  if("undefined" != typeof a.compareDocumentPosition) {
    return a == b || Boolean(a.compareDocumentPosition(b) & 16)
  }
  for(;b && a != b;) {
    b = b.parentNode
  }
  return b == a
};
goog.dom.compareNodeOrder = function(a, b) {
  if(a == b) {
    return 0
  }
  if(a.compareDocumentPosition) {
    return a.compareDocumentPosition(b) & 2 ? 1 : -1
  }
  if("sourceIndex" in a || a.parentNode && "sourceIndex" in a.parentNode) {
    var c = a.nodeType == goog.dom.NodeType.ELEMENT, d = b.nodeType == goog.dom.NodeType.ELEMENT;
    if(c && d) {
      return a.sourceIndex - b.sourceIndex
    }
    var e = a.parentNode, f = b.parentNode;
    return e == f ? goog.dom.compareSiblingOrder_(a, b) : !c && goog.dom.contains(e, b) ? -1 * goog.dom.compareParentsDescendantNodeIe_(a, b) : !d && goog.dom.contains(f, a) ? goog.dom.compareParentsDescendantNodeIe_(b, a) : (c ? a.sourceIndex : e.sourceIndex) - (d ? b.sourceIndex : f.sourceIndex)
  }
  d = goog.dom.getOwnerDocument(a);
  c = d.createRange();
  c.selectNode(a);
  c.collapse(!0);
  d = d.createRange();
  d.selectNode(b);
  d.collapse(!0);
  return c.compareBoundaryPoints(goog.global.Range.START_TO_END, d)
};
goog.dom.compareParentsDescendantNodeIe_ = function(a, b) {
  var c = a.parentNode;
  if(c == b) {
    return-1
  }
  for(var d = b;d.parentNode != c;) {
    d = d.parentNode
  }
  return goog.dom.compareSiblingOrder_(d, a)
};
goog.dom.compareSiblingOrder_ = function(a, b) {
  for(var c = b;c = c.previousSibling;) {
    if(c == a) {
      return-1
    }
  }
  return 1
};
goog.dom.findCommonAncestor = function(a) {
  var b, c = arguments.length;
  if(c) {
    if(1 == c) {
      return arguments[0]
    }
  }else {
    return null
  }
  var d = [], e = Infinity;
  for(b = 0;b < c;b++) {
    for(var f = [], g = arguments[b];g;) {
      f.unshift(g), g = g.parentNode
    }
    d.push(f);
    e = Math.min(e, f.length)
  }
  f = null;
  for(b = 0;b < e;b++) {
    for(var g = d[0][b], h = 1;h < c;h++) {
      if(g != d[h][b]) {
        return f
      }
    }
    f = g
  }
  return f
};
goog.dom.getOwnerDocument = function(a) {
  return a.nodeType == goog.dom.NodeType.DOCUMENT ? a : a.ownerDocument || a.document
};
goog.dom.getFrameContentDocument = function(a) {
  return a.contentDocument || a.contentWindow.document
};
goog.dom.getFrameContentWindow = function(a) {
  return a.contentWindow || goog.dom.getWindow_(goog.dom.getFrameContentDocument(a))
};
goog.dom.setTextContent = function(a, b) {
  if("textContent" in a) {
    a.textContent = b
  }else {
    if(a.firstChild && a.firstChild.nodeType == goog.dom.NodeType.TEXT) {
      for(;a.lastChild != a.firstChild;) {
        a.removeChild(a.lastChild)
      }
      a.firstChild.data = b
    }else {
      goog.dom.removeChildren(a);
      var c = goog.dom.getOwnerDocument(a);
      a.appendChild(c.createTextNode(b))
    }
  }
};
goog.dom.getOuterHtml = function(a) {
  if("outerHTML" in a) {
    return a.outerHTML
  }
  var b = goog.dom.getOwnerDocument(a).createElement("div");
  b.appendChild(a.cloneNode(!0));
  return b.innerHTML
};
goog.dom.findNode = function(a, b) {
  var c = [];
  return goog.dom.findNodes_(a, b, c, !0) ? c[0] : void 0
};
goog.dom.findNodes = function(a, b) {
  var c = [];
  goog.dom.findNodes_(a, b, c, !1);
  return c
};
goog.dom.findNodes_ = function(a, b, c, d) {
  if(null != a) {
    for(a = a.firstChild;a;) {
      if(b(a) && (c.push(a), d) || goog.dom.findNodes_(a, b, c, d)) {
        return!0
      }
      a = a.nextSibling
    }
  }
  return!1
};
goog.dom.TAGS_TO_IGNORE_ = {SCRIPT:1, STYLE:1, HEAD:1, IFRAME:1, OBJECT:1};
goog.dom.PREDEFINED_TAG_VALUES_ = {IMG:" ", BR:"\n"};
goog.dom.isFocusableTabIndex = function(a) {
  var b = a.getAttributeNode("tabindex");
  return b && b.specified ? (a = a.tabIndex, goog.isNumber(a) && 0 <= a && 32768 > a) : !1
};
goog.dom.setFocusableTabIndex = function(a, b) {
  b ? a.tabIndex = 0 : (a.tabIndex = -1, a.removeAttribute("tabIndex"))
};
goog.dom.getTextContent = function(a) {
  if(goog.dom.BrowserFeature.CAN_USE_INNER_TEXT && "innerText" in a) {
    a = goog.string.canonicalizeNewlines(a.innerText)
  }else {
    var b = [];
    goog.dom.getTextContent_(a, b, !0);
    a = b.join("")
  }
  a = a.replace(/ \xAD /g, " ").replace(/\xAD/g, "");
  a = a.replace(/\u200B/g, "");
  goog.dom.BrowserFeature.CAN_USE_INNER_TEXT || (a = a.replace(/ +/g, " "));
  " " != a && (a = a.replace(/^\s*/, ""));
  return a
};
goog.dom.getRawTextContent = function(a) {
  var b = [];
  goog.dom.getTextContent_(a, b, !1);
  return b.join("")
};
goog.dom.getTextContent_ = function(a, b, c) {
  if(!(a.nodeName in goog.dom.TAGS_TO_IGNORE_)) {
    if(a.nodeType == goog.dom.NodeType.TEXT) {
      c ? b.push(String(a.nodeValue).replace(/(\r\n|\r|\n)/g, "")) : b.push(a.nodeValue)
    }else {
      if(a.nodeName in goog.dom.PREDEFINED_TAG_VALUES_) {
        b.push(goog.dom.PREDEFINED_TAG_VALUES_[a.nodeName])
      }else {
        for(a = a.firstChild;a;) {
          goog.dom.getTextContent_(a, b, c), a = a.nextSibling
        }
      }
    }
  }
};
goog.dom.getNodeTextLength = function(a) {
  return goog.dom.getTextContent(a).length
};
goog.dom.getNodeTextOffset = function(a, b) {
  for(var c = b || goog.dom.getOwnerDocument(a).body, d = [];a && a != c;) {
    for(var e = a;e = e.previousSibling;) {
      d.unshift(goog.dom.getTextContent(e))
    }
    a = a.parentNode
  }
  return goog.string.trimLeft(d.join("")).replace(/ +/g, " ").length
};
goog.dom.getNodeAtOffset = function(a, b, c) {
  for(var a = [a], d = 0, e;0 < a.length && d < b;) {
    if(e = a.pop(), !(e.nodeName in goog.dom.TAGS_TO_IGNORE_)) {
      if(e.nodeType == goog.dom.NodeType.TEXT) {
        var f = e.nodeValue.replace(/(\r\n|\r|\n)/g, "").replace(/ +/g, " "), d = d + f.length
      }else {
        if(e.nodeName in goog.dom.PREDEFINED_TAG_VALUES_) {
          d += goog.dom.PREDEFINED_TAG_VALUES_[e.nodeName].length
        }else {
          for(f = e.childNodes.length - 1;0 <= f;f--) {
            a.push(e.childNodes[f])
          }
        }
      }
    }
  }
  goog.isObject(c) && (c.remainder = e ? e.nodeValue.length + b - d - 1 : 0, c.node = e);
  return e
};
goog.dom.isNodeList = function(a) {
  if(a && "number" == typeof a.length) {
    if(goog.isObject(a)) {
      return"function" == typeof a.item || "string" == typeof a.item
    }
    if(goog.isFunction(a)) {
      return"function" == typeof a.item
    }
  }
  return!1
};
goog.dom.getAncestorByTagNameAndClass = function(a, b, c) {
  if(!b && !c) {
    return null
  }
  var d = b ? b.toUpperCase() : null;
  return goog.dom.getAncestor(a, function(a) {
    return(!d || a.nodeName == d) && (!c || goog.dom.classes.has(a, c))
  }, !0)
};
goog.dom.getAncestorByClass = function(a, b) {
  return goog.dom.getAncestorByTagNameAndClass(a, null, b)
};
goog.dom.getAncestor = function(a, b, c, d) {
  c || (a = a.parentNode);
  for(var c = null == d, e = 0;a && (c || e <= d);) {
    if(b(a)) {
      return a
    }
    a = a.parentNode;
    e++
  }
  return null
};
goog.dom.getActiveElement = function(a) {
  try {
    return a && a.activeElement
  }catch(b) {
  }
  return null
};
goog.dom.DomHelper = function(a) {
  this.document_ = a || goog.global.document || document
};
goog.dom.DomHelper.prototype.getDomHelper = goog.dom.getDomHelper;
goog.dom.DomHelper.prototype.setDocument = function(a) {
  this.document_ = a
};
goog.dom.DomHelper.prototype.getDocument = function() {
  return this.document_
};
goog.dom.DomHelper.prototype.getElement = function(a) {
  return goog.isString(a) ? this.document_.getElementById(a) : a
};
goog.dom.DomHelper.prototype.$ = goog.dom.DomHelper.prototype.getElement;
goog.dom.DomHelper.prototype.getElementsByTagNameAndClass = function(a, b, c) {
  return goog.dom.getElementsByTagNameAndClass_(this.document_, a, b, c)
};
goog.dom.DomHelper.prototype.getElementsByClass = function(a, b) {
  return goog.dom.getElementsByClass(a, b || this.document_)
};
goog.dom.DomHelper.prototype.getElementByClass = function(a, b) {
  return goog.dom.getElementByClass(a, b || this.document_)
};
goog.dom.DomHelper.prototype.$$ = goog.dom.DomHelper.prototype.getElementsByTagNameAndClass;
goog.dom.DomHelper.prototype.setProperties = goog.dom.setProperties;
goog.dom.DomHelper.prototype.getViewportSize = function(a) {
  return goog.dom.getViewportSize(a || this.getWindow())
};
goog.dom.DomHelper.prototype.getDocumentHeight = function() {
  return goog.dom.getDocumentHeight_(this.getWindow())
};
goog.dom.DomHelper.prototype.createDom = function(a, b, c) {
  return goog.dom.createDom_(this.document_, arguments)
};
goog.dom.DomHelper.prototype.$dom = goog.dom.DomHelper.prototype.createDom;
goog.dom.DomHelper.prototype.createElement = function(a) {
  return this.document_.createElement(a)
};
goog.dom.DomHelper.prototype.createTextNode = function(a) {
  return this.document_.createTextNode(a)
};
goog.dom.DomHelper.prototype.createTable = function(a, b, c) {
  return goog.dom.createTable_(this.document_, a, b, !!c)
};
goog.dom.DomHelper.prototype.htmlToDocumentFragment = function(a) {
  return goog.dom.htmlToDocumentFragment_(this.document_, a)
};
goog.dom.DomHelper.prototype.getCompatMode = function() {
  return this.isCss1CompatMode() ? "CSS1Compat" : "BackCompat"
};
goog.dom.DomHelper.prototype.isCss1CompatMode = function() {
  return goog.dom.isCss1CompatMode_(this.document_)
};
goog.dom.DomHelper.prototype.getWindow = function() {
  return goog.dom.getWindow_(this.document_)
};
goog.dom.DomHelper.prototype.getDocumentScrollElement = function() {
  return goog.dom.getDocumentScrollElement_(this.document_)
};
goog.dom.DomHelper.prototype.getDocumentScroll = function() {
  return goog.dom.getDocumentScroll_(this.document_)
};
goog.dom.DomHelper.prototype.getActiveElement = function(a) {
  return goog.dom.getActiveElement(a || this.document_)
};
goog.dom.DomHelper.prototype.appendChild = goog.dom.appendChild;
goog.dom.DomHelper.prototype.append = goog.dom.append;
goog.dom.DomHelper.prototype.canHaveChildren = goog.dom.canHaveChildren;
goog.dom.DomHelper.prototype.removeChildren = goog.dom.removeChildren;
goog.dom.DomHelper.prototype.insertSiblingBefore = goog.dom.insertSiblingBefore;
goog.dom.DomHelper.prototype.insertSiblingAfter = goog.dom.insertSiblingAfter;
goog.dom.DomHelper.prototype.insertChildAt = goog.dom.insertChildAt;
goog.dom.DomHelper.prototype.removeNode = goog.dom.removeNode;
goog.dom.DomHelper.prototype.replaceNode = goog.dom.replaceNode;
goog.dom.DomHelper.prototype.flattenElement = goog.dom.flattenElement;
goog.dom.DomHelper.prototype.getChildren = goog.dom.getChildren;
goog.dom.DomHelper.prototype.getFirstElementChild = goog.dom.getFirstElementChild;
goog.dom.DomHelper.prototype.getLastElementChild = goog.dom.getLastElementChild;
goog.dom.DomHelper.prototype.getNextElementSibling = goog.dom.getNextElementSibling;
goog.dom.DomHelper.prototype.getPreviousElementSibling = goog.dom.getPreviousElementSibling;
goog.dom.DomHelper.prototype.getNextNode = goog.dom.getNextNode;
goog.dom.DomHelper.prototype.getPreviousNode = goog.dom.getPreviousNode;
goog.dom.DomHelper.prototype.isNodeLike = goog.dom.isNodeLike;
goog.dom.DomHelper.prototype.isElement = goog.dom.isElement;
goog.dom.DomHelper.prototype.isWindow = goog.dom.isWindow;
goog.dom.DomHelper.prototype.getParentElement = goog.dom.getParentElement;
goog.dom.DomHelper.prototype.contains = goog.dom.contains;
goog.dom.DomHelper.prototype.compareNodeOrder = goog.dom.compareNodeOrder;
goog.dom.DomHelper.prototype.findCommonAncestor = goog.dom.findCommonAncestor;
goog.dom.DomHelper.prototype.getOwnerDocument = goog.dom.getOwnerDocument;
goog.dom.DomHelper.prototype.getFrameContentDocument = goog.dom.getFrameContentDocument;
goog.dom.DomHelper.prototype.getFrameContentWindow = goog.dom.getFrameContentWindow;
goog.dom.DomHelper.prototype.setTextContent = goog.dom.setTextContent;
goog.dom.DomHelper.prototype.getOuterHtml = goog.dom.getOuterHtml;
goog.dom.DomHelper.prototype.findNode = goog.dom.findNode;
goog.dom.DomHelper.prototype.findNodes = goog.dom.findNodes;
goog.dom.DomHelper.prototype.isFocusableTabIndex = goog.dom.isFocusableTabIndex;
goog.dom.DomHelper.prototype.setFocusableTabIndex = goog.dom.setFocusableTabIndex;
goog.dom.DomHelper.prototype.getTextContent = goog.dom.getTextContent;
goog.dom.DomHelper.prototype.getNodeTextLength = goog.dom.getNodeTextLength;
goog.dom.DomHelper.prototype.getNodeTextOffset = goog.dom.getNodeTextOffset;
goog.dom.DomHelper.prototype.getNodeAtOffset = goog.dom.getNodeAtOffset;
goog.dom.DomHelper.prototype.isNodeList = goog.dom.isNodeList;
goog.dom.DomHelper.prototype.getAncestorByTagNameAndClass = goog.dom.getAncestorByTagNameAndClass;
goog.dom.DomHelper.prototype.getAncestorByClass = goog.dom.getAncestorByClass;
goog.dom.DomHelper.prototype.getAncestor = goog.dom.getAncestor;
goog.math.Box = function(a, b, c, d) {
  this.top = a;
  this.right = b;
  this.bottom = c;
  this.left = d
};
goog.math.Box.boundingBox = function(a) {
  for(var b = new goog.math.Box(arguments[0].y, arguments[0].x, arguments[0].y, arguments[0].x), c = 1;c < arguments.length;c++) {
    var d = arguments[c];
    b.top = Math.min(b.top, d.y);
    b.right = Math.max(b.right, d.x);
    b.bottom = Math.max(b.bottom, d.y);
    b.left = Math.min(b.left, d.x)
  }
  return b
};
goog.math.Box.prototype.clone = function() {
  return new goog.math.Box(this.top, this.right, this.bottom, this.left)
};
goog.DEBUG && (goog.math.Box.prototype.toString = function() {
  return"(" + this.top + "t, " + this.right + "r, " + this.bottom + "b, " + this.left + "l)"
});
goog.math.Box.prototype.contains = function(a) {
  return goog.math.Box.contains(this, a)
};
goog.math.Box.prototype.expand = function(a, b, c, d) {
  goog.isObject(a) ? (this.top -= a.top, this.right += a.right, this.bottom += a.bottom, this.left -= a.left) : (this.top -= a, this.right += b, this.bottom += c, this.left -= d);
  return this
};
goog.math.Box.prototype.expandToInclude = function(a) {
  this.left = Math.min(this.left, a.left);
  this.top = Math.min(this.top, a.top);
  this.right = Math.max(this.right, a.right);
  this.bottom = Math.max(this.bottom, a.bottom)
};
goog.math.Box.equals = function(a, b) {
  return a == b ? !0 : !a || !b ? !1 : a.top == b.top && a.right == b.right && a.bottom == b.bottom && a.left == b.left
};
goog.math.Box.contains = function(a, b) {
  return!a || !b ? !1 : b instanceof goog.math.Box ? b.left >= a.left && b.right <= a.right && b.top >= a.top && b.bottom <= a.bottom : b.x >= a.left && b.x <= a.right && b.y >= a.top && b.y <= a.bottom
};
goog.math.Box.relativePositionX = function(a, b) {
  return b.x < a.left ? b.x - a.left : b.x > a.right ? b.x - a.right : 0
};
goog.math.Box.relativePositionY = function(a, b) {
  return b.y < a.top ? b.y - a.top : b.y > a.bottom ? b.y - a.bottom : 0
};
goog.math.Box.distance = function(a, b) {
  var c = goog.math.Box.relativePositionX(a, b), d = goog.math.Box.relativePositionY(a, b);
  return Math.sqrt(c * c + d * d)
};
goog.math.Box.intersects = function(a, b) {
  return a.left <= b.right && b.left <= a.right && a.top <= b.bottom && b.top <= a.bottom
};
goog.math.Box.intersectsWithPadding = function(a, b, c) {
  return a.left <= b.right + c && b.left <= a.right + c && a.top <= b.bottom + c && b.top <= a.bottom + c
};
goog.math.Rect = function(a, b, c, d) {
  this.left = a;
  this.top = b;
  this.width = c;
  this.height = d
};
goog.math.Rect.prototype.clone = function() {
  return new goog.math.Rect(this.left, this.top, this.width, this.height)
};
goog.math.Rect.prototype.toBox = function() {
  return new goog.math.Box(this.top, this.left + this.width, this.top + this.height, this.left)
};
goog.math.Rect.createFromBox = function(a) {
  return new goog.math.Rect(a.left, a.top, a.right - a.left, a.bottom - a.top)
};
goog.DEBUG && (goog.math.Rect.prototype.toString = function() {
  return"(" + this.left + ", " + this.top + " - " + this.width + "w x " + this.height + "h)"
});
goog.math.Rect.equals = function(a, b) {
  return a == b ? !0 : !a || !b ? !1 : a.left == b.left && a.width == b.width && a.top == b.top && a.height == b.height
};
goog.math.Rect.prototype.intersection = function(a) {
  var b = Math.max(this.left, a.left), c = Math.min(this.left + this.width, a.left + a.width);
  if(b <= c) {
    var d = Math.max(this.top, a.top), a = Math.min(this.top + this.height, a.top + a.height);
    if(d <= a) {
      return this.left = b, this.top = d, this.width = c - b, this.height = a - d, !0
    }
  }
  return!1
};
goog.math.Rect.intersection = function(a, b) {
  var c = Math.max(a.left, b.left), d = Math.min(a.left + a.width, b.left + b.width);
  if(c <= d) {
    var e = Math.max(a.top, b.top), f = Math.min(a.top + a.height, b.top + b.height);
    if(e <= f) {
      return new goog.math.Rect(c, e, d - c, f - e)
    }
  }
  return null
};
goog.math.Rect.intersects = function(a, b) {
  return a.left <= b.left + b.width && b.left <= a.left + a.width && a.top <= b.top + b.height && b.top <= a.top + a.height
};
goog.math.Rect.prototype.intersects = function(a) {
  return goog.math.Rect.intersects(this, a)
};
goog.math.Rect.difference = function(a, b) {
  var c = goog.math.Rect.intersection(a, b);
  if(!c || !c.height || !c.width) {
    return[a.clone()]
  }
  var c = [], d = a.top, e = a.height, f = a.left + a.width, g = a.top + a.height, h = b.left + b.width, i = b.top + b.height;
  b.top > a.top && (c.push(new goog.math.Rect(a.left, a.top, a.width, b.top - a.top)), d = b.top, e -= b.top - a.top);
  i < g && (c.push(new goog.math.Rect(a.left, i, a.width, g - i)), e = i - d);
  b.left > a.left && c.push(new goog.math.Rect(a.left, d, b.left - a.left, e));
  h < f && c.push(new goog.math.Rect(h, d, f - h, e));
  return c
};
goog.math.Rect.prototype.difference = function(a) {
  return goog.math.Rect.difference(this, a)
};
goog.math.Rect.prototype.boundingRect = function(a) {
  var b = Math.max(this.left + this.width, a.left + a.width), c = Math.max(this.top + this.height, a.top + a.height);
  this.left = Math.min(this.left, a.left);
  this.top = Math.min(this.top, a.top);
  this.width = b - this.left;
  this.height = c - this.top
};
goog.math.Rect.boundingRect = function(a, b) {
  if(!a || !b) {
    return null
  }
  var c = a.clone();
  c.boundingRect(b);
  return c
};
goog.math.Rect.prototype.contains = function(a) {
  return a instanceof goog.math.Rect ? this.left <= a.left && this.left + this.width >= a.left + a.width && this.top <= a.top && this.top + this.height >= a.top + a.height : a.x >= this.left && a.x <= this.left + this.width && a.y >= this.top && a.y <= this.top + this.height
};
goog.math.Rect.prototype.getSize = function() {
  return new goog.math.Size(this.width, this.height)
};
goog.style = {};
goog.style.setStyle = function(a, b, c) {
  goog.isString(b) ? goog.style.setStyle_(a, c, b) : goog.object.forEach(b, goog.partial(goog.style.setStyle_, a))
};
goog.style.setStyle_ = function(a, b, c) {
  a.style[goog.string.toCamelCase(c)] = b
};
goog.style.getStyle = function(a, b) {
  return a.style[goog.string.toCamelCase(b)] || ""
};
goog.style.getComputedStyle = function(a, b) {
  var c = goog.dom.getOwnerDocument(a);
  return c.defaultView && c.defaultView.getComputedStyle && (c = c.defaultView.getComputedStyle(a, null)) ? c[b] || c.getPropertyValue(b) || "" : ""
};
goog.style.getCascadedStyle = function(a, b) {
  return a.currentStyle ? a.currentStyle[b] : null
};
goog.style.getStyle_ = function(a, b) {
  return goog.style.getComputedStyle(a, b) || goog.style.getCascadedStyle(a, b) || a.style && a.style[b]
};
goog.style.getComputedPosition = function(a) {
  return goog.style.getStyle_(a, "position")
};
goog.style.getBackgroundColor = function(a) {
  return goog.style.getStyle_(a, "backgroundColor")
};
goog.style.getComputedOverflowX = function(a) {
  return goog.style.getStyle_(a, "overflowX")
};
goog.style.getComputedOverflowY = function(a) {
  return goog.style.getStyle_(a, "overflowY")
};
goog.style.getComputedZIndex = function(a) {
  return goog.style.getStyle_(a, "zIndex")
};
goog.style.getComputedTextAlign = function(a) {
  return goog.style.getStyle_(a, "textAlign")
};
goog.style.getComputedCursor = function(a) {
  return goog.style.getStyle_(a, "cursor")
};
goog.style.setPosition = function(a, b, c) {
  var d, e = goog.userAgent.GECKO && (goog.userAgent.MAC || goog.userAgent.X11) && goog.userAgent.isVersion("1.9");
  b instanceof goog.math.Coordinate ? (d = b.x, b = b.y) : (d = b, b = c);
  a.style.left = goog.style.getPixelStyleValue_(d, e);
  a.style.top = goog.style.getPixelStyleValue_(b, e)
};
goog.style.getPosition = function(a) {
  return new goog.math.Coordinate(a.offsetLeft, a.offsetTop)
};
goog.style.getClientViewportElement = function(a) {
  a = a ? goog.dom.getOwnerDocument(a) : goog.dom.getDocument();
  return goog.userAgent.IE && !goog.userAgent.isDocumentMode(9) && !goog.dom.getDomHelper(a).isCss1CompatMode() ? a.body : a.documentElement
};
goog.style.getViewportPageOffset = function(a) {
  var b = a.body, a = a.documentElement;
  return new goog.math.Coordinate(b.scrollLeft || a.scrollLeft, b.scrollTop || a.scrollTop)
};
goog.style.supportsGetBoundingClientRect_ = function(a) {
  if(goog.userAgent.MOBILE && goog.userAgent.WEBKIT) {
    var b = a.ownerDocument.defaultView;
    if(b != b.top) {
      return!1
    }
  }
  return!!a.getBoundingClientRect
};
goog.style.getBoundingClientRect_ = function(a) {
  var b = a.getBoundingClientRect();
  goog.userAgent.IE && (a = a.ownerDocument, b.left -= a.documentElement.clientLeft + a.body.clientLeft, b.top -= a.documentElement.clientTop + a.body.clientTop);
  return b
};
goog.style.getOffsetParent = function(a) {
  if(goog.userAgent.IE && !goog.userAgent.isDocumentMode(8)) {
    return a.offsetParent
  }
  for(var b = goog.dom.getOwnerDocument(a), c = goog.style.getStyle_(a, "position"), d = "fixed" == c || "absolute" == c, a = a.parentNode;a && a != b;a = a.parentNode) {
    if(c = goog.style.getStyle_(a, "position"), d = d && "static" == c && a != b.documentElement && a != b.body, !d && (a.scrollWidth > a.clientWidth || a.scrollHeight > a.clientHeight || "fixed" == c || "absolute" == c || "relative" == c)) {
      return a
    }
  }
  return null
};
goog.style.getVisibleRectForElement = function(a) {
  for(var b = new goog.math.Box(0, Infinity, Infinity, 0), c = goog.dom.getDomHelper(a), d = c.getDocument().body, e = c.getDocument().documentElement, f = c.getDocumentScrollElement();a = goog.style.getOffsetParent(a);) {
    if((!goog.userAgent.IE || 0 != a.clientWidth) && (!goog.userAgent.WEBKIT || 0 != a.clientHeight || a != d) && a != d && a != e && "visible" != goog.style.getStyle_(a, "overflow")) {
      var g = goog.style.getPageOffset(a), h = goog.style.getClientLeftTop(a);
      g.x += h.x;
      g.y += h.y;
      b.top = Math.max(b.top, g.y);
      b.right = Math.min(b.right, g.x + a.clientWidth);
      b.bottom = Math.min(b.bottom, g.y + a.clientHeight);
      b.left = Math.max(b.left, g.x)
    }
  }
  d = f.scrollLeft;
  f = f.scrollTop;
  b.left = Math.max(b.left, d);
  b.top = Math.max(b.top, f);
  c = c.getViewportSize();
  b.right = Math.min(b.right, d + c.width);
  b.bottom = Math.min(b.bottom, f + c.height);
  return 0 <= b.top && 0 <= b.left && b.bottom > b.top && b.right > b.left ? b : null
};
goog.style.getContainerOffsetToScrollInto = function(a, b, c) {
  var d = goog.style.getPageOffset(a), e = goog.style.getPageOffset(b), f = goog.style.getBorderBox(b), g = d.x - e.x - f.left, d = d.y - e.y - f.top, e = b.clientWidth - a.offsetWidth, a = b.clientHeight - a.offsetHeight, f = b.scrollLeft, b = b.scrollTop;
  c ? (f += g - e / 2, b += d - a / 2) : (f += Math.min(g, Math.max(g - e, 0)), b += Math.min(d, Math.max(d - a, 0)));
  return new goog.math.Coordinate(f, b)
};
goog.style.scrollIntoContainerView = function(a, b, c) {
  a = goog.style.getContainerOffsetToScrollInto(a, b, c);
  b.scrollLeft = a.x;
  b.scrollTop = a.y
};
goog.style.getClientLeftTop = function(a) {
  if(goog.userAgent.GECKO && !goog.userAgent.isVersion("1.9")) {
    var b = parseFloat(goog.style.getComputedStyle(a, "borderLeftWidth"));
    if(goog.style.isRightToLeft(a)) {
      var c = a.offsetWidth - a.clientWidth - b - parseFloat(goog.style.getComputedStyle(a, "borderRightWidth")), b = b + c
    }
    return new goog.math.Coordinate(b, parseFloat(goog.style.getComputedStyle(a, "borderTopWidth")))
  }
  return new goog.math.Coordinate(a.clientLeft, a.clientTop)
};
goog.style.getPageOffset = function(a) {
  var b, c = goog.dom.getOwnerDocument(a), d = goog.style.getStyle_(a, "position");
  goog.asserts.assertObject(a, "Parameter is required");
  var e = goog.userAgent.GECKO && c.getBoxObjectFor && !a.getBoundingClientRect && "absolute" == d && (b = c.getBoxObjectFor(a)) && (0 > b.screenX || 0 > b.screenY), f = new goog.math.Coordinate(0, 0), g = goog.style.getClientViewportElement(c);
  if(a == g) {
    return f
  }
  if(goog.style.supportsGetBoundingClientRect_(a)) {
    b = goog.style.getBoundingClientRect_(a), a = goog.dom.getDomHelper(c).getDocumentScroll(), f.x = b.left + a.x, f.y = b.top + a.y
  }else {
    if(c.getBoxObjectFor && !e) {
      b = c.getBoxObjectFor(a), a = c.getBoxObjectFor(g), f.x = b.screenX - a.screenX, f.y = b.screenY - a.screenY
    }else {
      b = a;
      do {
        f.x += b.offsetLeft;
        f.y += b.offsetTop;
        b != a && (f.x += b.clientLeft || 0, f.y += b.clientTop || 0);
        if(goog.userAgent.WEBKIT && "fixed" == goog.style.getComputedPosition(b)) {
          f.x += c.body.scrollLeft;
          f.y += c.body.scrollTop;
          break
        }
        b = b.offsetParent
      }while(b && b != a);
      if(goog.userAgent.OPERA || goog.userAgent.WEBKIT && "absolute" == d) {
        f.y -= c.body.offsetTop
      }
      for(b = a;(b = goog.style.getOffsetParent(b)) && b != c.body && b != g;) {
        if(f.x -= b.scrollLeft, !goog.userAgent.OPERA || "TR" != b.tagName) {
          f.y -= b.scrollTop
        }
      }
    }
  }
  return f
};
goog.style.getPageOffsetLeft = function(a) {
  return goog.style.getPageOffset(a).x
};
goog.style.getPageOffsetTop = function(a) {
  return goog.style.getPageOffset(a).y
};
goog.style.getFramedPageOffset = function(a, b) {
  var c = new goog.math.Coordinate(0, 0), d = goog.dom.getWindow(goog.dom.getOwnerDocument(a)), e = a;
  do {
    var f = d == b ? goog.style.getPageOffset(e) : goog.style.getClientPosition(e);
    c.x += f.x;
    c.y += f.y
  }while(d && d != b && (e = d.frameElement) && (d = d.parent));
  return c
};
goog.style.translateRectForAnotherFrame = function(a, b, c) {
  if(b.getDocument() != c.getDocument()) {
    var d = b.getDocument().body, c = goog.style.getFramedPageOffset(d, c.getWindow()), c = goog.math.Coordinate.difference(c, goog.style.getPageOffset(d));
    goog.userAgent.IE && !b.isCss1CompatMode() && (c = goog.math.Coordinate.difference(c, b.getDocumentScroll()));
    a.left += c.x;
    a.top += c.y
  }
};
goog.style.getRelativePosition = function(a, b) {
  var c = goog.style.getClientPosition(a), d = goog.style.getClientPosition(b);
  return new goog.math.Coordinate(c.x - d.x, c.y - d.y)
};
goog.style.getClientPosition = function(a) {
  var b = new goog.math.Coordinate;
  if(a.nodeType == goog.dom.NodeType.ELEMENT) {
    if(goog.style.supportsGetBoundingClientRect_(a)) {
      var c = goog.style.getBoundingClientRect_(a);
      b.x = c.left;
      b.y = c.top
    }else {
      var c = goog.dom.getDomHelper(a).getDocumentScroll(), d = goog.style.getPageOffset(a);
      b.x = d.x - c.x;
      b.y = d.y - c.y
    }
    goog.userAgent.GECKO && !goog.userAgent.isVersion(12) && (b = goog.math.Coordinate.sum(b, goog.style.getCssTranslation(a)))
  }else {
    c = goog.isFunction(a.getBrowserEvent), d = a, a.targetTouches ? d = a.targetTouches[0] : c && a.getBrowserEvent().targetTouches && (d = a.getBrowserEvent().targetTouches[0]), b.x = d.clientX, b.y = d.clientY
  }
  return b
};
goog.style.setPageOffset = function(a, b, c) {
  var d = goog.style.getPageOffset(a);
  b instanceof goog.math.Coordinate && (c = b.y, b = b.x);
  goog.style.setPosition(a, a.offsetLeft + (b - d.x), a.offsetTop + (c - d.y))
};
goog.style.setSize = function(a, b, c) {
  if(b instanceof goog.math.Size) {
    c = b.height, b = b.width
  }else {
    if(void 0 == c) {
      throw Error("missing height argument");
    }
  }
  goog.style.setWidth(a, b);
  goog.style.setHeight(a, c)
};
goog.style.getPixelStyleValue_ = function(a, b) {
  "number" == typeof a && (a = (b ? Math.round(a) : a) + "px");
  return a
};
goog.style.setHeight = function(a, b) {
  a.style.height = goog.style.getPixelStyleValue_(b, !0)
};
goog.style.setWidth = function(a, b) {
  a.style.width = goog.style.getPixelStyleValue_(b, !0)
};
goog.style.getSize = function(a) {
  if("none" != goog.style.getStyle_(a, "display")) {
    return goog.style.getSizeWithDisplay_(a)
  }
  var b = a.style, c = b.display, d = b.visibility, e = b.position;
  b.visibility = "hidden";
  b.position = "absolute";
  b.display = "inline";
  a = goog.style.getSizeWithDisplay_(a);
  b.display = c;
  b.position = e;
  b.visibility = d;
  return a
};
goog.style.getSizeWithDisplay_ = function(a) {
  var b = a.offsetWidth, c = a.offsetHeight, d = goog.userAgent.WEBKIT && !b && !c;
  return(!goog.isDef(b) || d) && a.getBoundingClientRect ? (a = goog.style.getBoundingClientRect_(a), new goog.math.Size(a.right - a.left, a.bottom - a.top)) : new goog.math.Size(b, c)
};
goog.style.getBounds = function(a) {
  var b = goog.style.getPageOffset(a), a = goog.style.getSize(a);
  return new goog.math.Rect(b.x, b.y, a.width, a.height)
};
goog.style.toCamelCase = function(a) {
  return goog.string.toCamelCase(String(a))
};
goog.style.toSelectorCase = function(a) {
  return goog.string.toSelectorCase(a)
};
goog.style.getOpacity = function(a) {
  var b = a.style, a = "";
  "opacity" in b ? a = b.opacity : "MozOpacity" in b ? a = b.MozOpacity : "filter" in b && (b = b.filter.match(/alpha\(opacity=([\d.]+)\)/)) && (a = String(b[1] / 100));
  return"" == a ? a : Number(a)
};
goog.style.setOpacity = function(a, b) {
  var c = a.style;
  "opacity" in c ? c.opacity = b : "MozOpacity" in c ? c.MozOpacity = b : "filter" in c && (c.filter = "" === b ? "" : "alpha(opacity=" + 100 * b + ")")
};
goog.style.setTransparentBackgroundImage = function(a, b) {
  var c = a.style;
  goog.userAgent.IE && !goog.userAgent.isVersion("8") ? c.filter = 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src="' + b + '", sizingMethod="crop")' : (c.backgroundImage = "url(" + b + ")", c.backgroundPosition = "top left", c.backgroundRepeat = "no-repeat")
};
goog.style.clearTransparentBackgroundImage = function(a) {
  a = a.style;
  "filter" in a ? a.filter = "" : a.backgroundImage = "none"
};
goog.style.showElement = function(a, b) {
  a.style.display = b ? "" : "none"
};
goog.style.isElementShown = function(a) {
  return"none" != a.style.display
};
goog.style.installStyles = function(a, b) {
  var c = goog.dom.getDomHelper(b), d = null;
  if(goog.userAgent.IE) {
    d = c.getDocument().createStyleSheet(), goog.style.setStyles(d, a)
  }else {
    var e = c.getElementsByTagNameAndClass("head")[0];
    e || (d = c.getElementsByTagNameAndClass("body")[0], e = c.createDom("head"), d.parentNode.insertBefore(e, d));
    d = c.createDom("style");
    goog.style.setStyles(d, a);
    c.appendChild(e, d)
  }
  return d
};
goog.style.uninstallStyles = function(a) {
  goog.dom.removeNode(a.ownerNode || a.owningElement || a)
};
goog.style.setStyles = function(a, b) {
  goog.userAgent.IE ? a.cssText = b : a.innerHTML = b
};
goog.style.setPreWrap = function(a) {
  a = a.style;
  goog.userAgent.IE && !goog.userAgent.isVersion("8") ? (a.whiteSpace = "pre", a.wordWrap = "break-word") : a.whiteSpace = goog.userAgent.GECKO ? "-moz-pre-wrap" : "pre-wrap"
};
goog.style.setInlineBlock = function(a) {
  a = a.style;
  a.position = "relative";
  goog.userAgent.IE && !goog.userAgent.isVersion("8") ? (a.zoom = "1", a.display = "inline") : a.display = goog.userAgent.GECKO ? goog.userAgent.isVersion("1.9a") ? "inline-block" : "-moz-inline-box" : "inline-block"
};
goog.style.isRightToLeft = function(a) {
  return"rtl" == goog.style.getStyle_(a, "direction")
};
goog.style.unselectableStyle_ = goog.userAgent.GECKO ? "MozUserSelect" : goog.userAgent.WEBKIT ? "WebkitUserSelect" : null;
goog.style.isUnselectable = function(a) {
  return goog.style.unselectableStyle_ ? "none" == a.style[goog.style.unselectableStyle_].toLowerCase() : goog.userAgent.IE || goog.userAgent.OPERA ? "on" == a.getAttribute("unselectable") : !1
};
goog.style.setUnselectable = function(a, b, c) {
  var c = !c ? a.getElementsByTagName("*") : null, d = goog.style.unselectableStyle_;
  if(d) {
    if(b = b ? "none" : "", a.style[d] = b, c) {
      for(var a = 0, e;e = c[a];a++) {
        e.style[d] = b
      }
    }
  }else {
    if(goog.userAgent.IE || goog.userAgent.OPERA) {
      if(b = b ? "on" : "", a.setAttribute("unselectable", b), c) {
        for(a = 0;e = c[a];a++) {
          e.setAttribute("unselectable", b)
        }
      }
    }
  }
};
goog.style.getBorderBoxSize = function(a) {
  return new goog.math.Size(a.offsetWidth, a.offsetHeight)
};
goog.style.setBorderBoxSize = function(a, b) {
  var c = goog.dom.getOwnerDocument(a), d = goog.dom.getDomHelper(c).isCss1CompatMode();
  if(goog.userAgent.IE && (!d || !goog.userAgent.isVersion("8"))) {
    if(c = a.style, d) {
      var d = goog.style.getPaddingBox(a), e = goog.style.getBorderBox(a);
      c.pixelWidth = b.width - e.left - d.left - d.right - e.right;
      c.pixelHeight = b.height - e.top - d.top - d.bottom - e.bottom
    }else {
      c.pixelWidth = b.width, c.pixelHeight = b.height
    }
  }else {
    goog.style.setBoxSizingSize_(a, b, "border-box")
  }
};
goog.style.getContentBoxSize = function(a) {
  var b = goog.dom.getOwnerDocument(a), c = goog.userAgent.IE && a.currentStyle;
  if(c && goog.dom.getDomHelper(b).isCss1CompatMode() && "auto" != c.width && "auto" != c.height && !c.boxSizing) {
    return b = goog.style.getIePixelValue_(a, c.width, "width", "pixelWidth"), a = goog.style.getIePixelValue_(a, c.height, "height", "pixelHeight"), new goog.math.Size(b, a)
  }
  c = goog.style.getBorderBoxSize(a);
  b = goog.style.getPaddingBox(a);
  a = goog.style.getBorderBox(a);
  return new goog.math.Size(c.width - a.left - b.left - b.right - a.right, c.height - a.top - b.top - b.bottom - a.bottom)
};
goog.style.setContentBoxSize = function(a, b) {
  var c = goog.dom.getOwnerDocument(a), d = goog.dom.getDomHelper(c).isCss1CompatMode();
  if(goog.userAgent.IE && (!d || !goog.userAgent.isVersion("8"))) {
    if(c = a.style, d) {
      c.pixelWidth = b.width, c.pixelHeight = b.height
    }else {
      var d = goog.style.getPaddingBox(a), e = goog.style.getBorderBox(a);
      c.pixelWidth = b.width + e.left + d.left + d.right + e.right;
      c.pixelHeight = b.height + e.top + d.top + d.bottom + e.bottom
    }
  }else {
    goog.style.setBoxSizingSize_(a, b, "content-box")
  }
};
goog.style.setBoxSizingSize_ = function(a, b, c) {
  a = a.style;
  goog.userAgent.GECKO ? a.MozBoxSizing = c : goog.userAgent.WEBKIT ? a.WebkitBoxSizing = c : a.boxSizing = c;
  a.width = Math.max(b.width, 0) + "px";
  a.height = Math.max(b.height, 0) + "px"
};
goog.style.getIePixelValue_ = function(a, b, c, d) {
  if(/^\d+px?$/.test(b)) {
    return parseInt(b, 10)
  }
  var e = a.style[c], f = a.runtimeStyle[c];
  a.runtimeStyle[c] = a.currentStyle[c];
  a.style[c] = b;
  b = a.style[d];
  a.style[c] = e;
  a.runtimeStyle[c] = f;
  return b
};
goog.style.getIePixelDistance_ = function(a, b) {
  return goog.style.getIePixelValue_(a, goog.style.getCascadedStyle(a, b), "left", "pixelLeft")
};
goog.style.getBox_ = function(a, b) {
  if(goog.userAgent.IE) {
    var c = goog.style.getIePixelDistance_(a, b + "Left"), d = goog.style.getIePixelDistance_(a, b + "Right"), e = goog.style.getIePixelDistance_(a, b + "Top"), f = goog.style.getIePixelDistance_(a, b + "Bottom");
    return new goog.math.Box(e, d, f, c)
  }
  c = goog.style.getComputedStyle(a, b + "Left");
  d = goog.style.getComputedStyle(a, b + "Right");
  e = goog.style.getComputedStyle(a, b + "Top");
  f = goog.style.getComputedStyle(a, b + "Bottom");
  return new goog.math.Box(parseFloat(e), parseFloat(d), parseFloat(f), parseFloat(c))
};
goog.style.getPaddingBox = function(a) {
  return goog.style.getBox_(a, "padding")
};
goog.style.getMarginBox = function(a) {
  return goog.style.getBox_(a, "margin")
};
goog.style.ieBorderWidthKeywords_ = {thin:2, medium:4, thick:6};
goog.style.getIePixelBorder_ = function(a, b) {
  if("none" == goog.style.getCascadedStyle(a, b + "Style")) {
    return 0
  }
  var c = goog.style.getCascadedStyle(a, b + "Width");
  return c in goog.style.ieBorderWidthKeywords_ ? goog.style.ieBorderWidthKeywords_[c] : goog.style.getIePixelValue_(a, c, "left", "pixelLeft")
};
goog.style.getBorderBox = function(a) {
  if(goog.userAgent.IE) {
    var b = goog.style.getIePixelBorder_(a, "borderLeft"), c = goog.style.getIePixelBorder_(a, "borderRight"), d = goog.style.getIePixelBorder_(a, "borderTop"), a = goog.style.getIePixelBorder_(a, "borderBottom");
    return new goog.math.Box(d, c, a, b)
  }
  b = goog.style.getComputedStyle(a, "borderLeftWidth");
  c = goog.style.getComputedStyle(a, "borderRightWidth");
  d = goog.style.getComputedStyle(a, "borderTopWidth");
  a = goog.style.getComputedStyle(a, "borderBottomWidth");
  return new goog.math.Box(parseFloat(d), parseFloat(c), parseFloat(a), parseFloat(b))
};
goog.style.getFontFamily = function(a) {
  var b = goog.dom.getOwnerDocument(a), c = "";
  if(b.body.createTextRange) {
    b = b.body.createTextRange();
    b.moveToElementText(a);
    try {
      c = b.queryCommandValue("FontName")
    }catch(d) {
      c = ""
    }
  }
  c || (c = goog.style.getStyle_(a, "fontFamily"));
  a = c.split(",");
  1 < a.length && (c = a[0]);
  return goog.string.stripQuotes(c, "\"'")
};
goog.style.lengthUnitRegex_ = /[^\d]+$/;
goog.style.getLengthUnits = function(a) {
  return(a = a.match(goog.style.lengthUnitRegex_)) && a[0] || null
};
goog.style.ABSOLUTE_CSS_LENGTH_UNITS_ = {cm:1, "in":1, mm:1, pc:1, pt:1};
goog.style.CONVERTIBLE_RELATIVE_CSS_UNITS_ = {em:1, ex:1};
goog.style.getFontSize = function(a) {
  var b = goog.style.getStyle_(a, "fontSize"), c = goog.style.getLengthUnits(b);
  if(b && "px" == c) {
    return parseInt(b, 10)
  }
  if(goog.userAgent.IE) {
    if(c in goog.style.ABSOLUTE_CSS_LENGTH_UNITS_) {
      return goog.style.getIePixelValue_(a, b, "left", "pixelLeft")
    }
    if(a.parentNode && a.parentNode.nodeType == goog.dom.NodeType.ELEMENT && c in goog.style.CONVERTIBLE_RELATIVE_CSS_UNITS_) {
      return a = a.parentNode, c = goog.style.getStyle_(a, "fontSize"), goog.style.getIePixelValue_(a, b == c ? "1em" : b, "left", "pixelLeft")
    }
  }
  c = goog.dom.createDom("span", {style:"visibility:hidden;position:absolute;line-height:0;padding:0;margin:0;border:0;height:1em;"});
  goog.dom.appendChild(a, c);
  b = c.offsetHeight;
  goog.dom.removeNode(c);
  return b
};
goog.style.parseStyleAttribute = function(a) {
  var b = {};
  goog.array.forEach(a.split(/\s*;\s*/), function(a) {
    a = a.split(/\s*:\s*/);
    2 == a.length && (b[goog.string.toCamelCase(a[0].toLowerCase())] = a[1])
  });
  return b
};
goog.style.toStyleAttribute = function(a) {
  var b = [];
  goog.object.forEach(a, function(a, d) {
    b.push(goog.string.toSelectorCase(d), ":", a, ";")
  });
  return b.join("")
};
goog.style.setFloat = function(a, b) {
  a.style[goog.userAgent.IE ? "styleFloat" : "cssFloat"] = b
};
goog.style.getFloat = function(a) {
  return a.style[goog.userAgent.IE ? "styleFloat" : "cssFloat"] || ""
};
goog.style.getScrollbarWidth = function(a) {
  var b = goog.dom.createElement("div");
  a && (b.className = a);
  b.style.cssText = "overflow:auto;position:absolute;top:0;width:100px;height:100px";
  a = goog.dom.createElement("div");
  goog.style.setSize(a, "200px", "200px");
  b.appendChild(a);
  goog.dom.appendChild(goog.dom.getDocument().body, b);
  a = b.offsetWidth - b.clientWidth;
  goog.dom.removeNode(b);
  return a
};
goog.style.MATRIX_TRANSLATION_REGEX_ = /matrix\([0-9\.\-]+, [0-9\.\-]+, [0-9\.\-]+, [0-9\.\-]+, ([0-9\.\-]+)p?x?, ([0-9\.\-]+)p?x?\)/;
goog.style.getCssTranslation = function(a) {
  var b;
  goog.userAgent.IE ? b = "-ms-transform" : goog.userAgent.WEBKIT ? b = "-webkit-transform" : goog.userAgent.OPERA ? b = "-o-transform" : goog.userAgent.GECKO && (b = "-moz-transform");
  var c;
  b && (c = goog.style.getStyle_(a, b));
  c || (c = goog.style.getStyle_(a, "transform"));
  if(!c) {
    return new goog.math.Coordinate(0, 0)
  }
  a = c.match(goog.style.MATRIX_TRANSLATION_REGEX_);
  return!a ? new goog.math.Coordinate(0, 0) : new goog.math.Coordinate(parseFloat(a[1]), parseFloat(a[2]))
};
crate.compiler = {};
crate.compiler.xmlns = cljs.core.PersistentArrayMap.fromArray(["\ufdd0:xhtml", "http://www.w3.org/1999/xhtml", "\ufdd0:svg", "http://www.w3.org/2000/svg"], !0);
crate.compiler.group_id = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(0);
crate.compiler.bindings = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentVector.EMPTY);
crate.compiler.capture_binding = function(a, b) {
  return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(crate.compiler.bindings, cljs.core.conj, cljs.core.PersistentVector.fromArray([a, b], !0))
};
crate.compiler.as_content = function as_content(b, c) {
  for(var d = cljs.core.seq(c), e = null, f = 0, g = 0;;) {
    if(g < f) {
      var h = e.cljs$core$IIndexed$_nth$arity$2(e, g);
      if(null == h) {
        h = null
      }else {
        if(cljs.core.map_QMARK_(h)) {
          throw"Maps cannot be used as content";
        }
        cljs.core.string_QMARK_(h) ? h = goog.dom.createTextNode(h) : cljs.core.vector_QMARK_(h) ? h = crate.compiler.elem_factory.cljs$core$IFn$_invoke$arity$1 ? crate.compiler.elem_factory.cljs$core$IFn$_invoke$arity$1(h) : crate.compiler.elem_factory.call(null, h) : cljs.core.seq_QMARK_(h) ? h = as_content(b, h) : cljs.core.truth_(crate.binding.binding_coll_QMARK_(h)) ? (crate.compiler.capture_binding("\ufdd0:coll", h), h = as_content(b, cljs.core.PersistentVector.fromArray([crate.binding.value(h)], 
        !0))) : cljs.core.truth_(crate.binding.binding_QMARK_(h)) ? (crate.compiler.capture_binding("\ufdd0:text", h), h = as_content(b, cljs.core.PersistentVector.fromArray([crate.binding.value(h)], !0))) : h = cljs.core.truth_(h.nodeName) ? h : cljs.core.truth_(h.get) ? h.get(0) : goog.dom.createTextNode("" + cljs.core.str(h))
      }
      cljs.core.truth_(h) && goog.dom.appendChild(b, h);
      g += 1
    }else {
      if(d = cljs.core.seq(d)) {
        if(cljs.core.chunked_seq_QMARK_(d)) {
          f = cljs.core.chunk_first(d), d = cljs.core.chunk_rest(d), e = f, f = cljs.core.count(f)
        }else {
          h = cljs.core.first(d);
          if(null == h) {
            e = null
          }else {
            if(cljs.core.map_QMARK_(h)) {
              throw"Maps cannot be used as content";
            }
            cljs.core.string_QMARK_(h) ? e = goog.dom.createTextNode(h) : cljs.core.vector_QMARK_(h) ? e = crate.compiler.elem_factory.cljs$core$IFn$_invoke$arity$1 ? crate.compiler.elem_factory.cljs$core$IFn$_invoke$arity$1(h) : crate.compiler.elem_factory.call(null, h) : cljs.core.seq_QMARK_(h) ? e = as_content(b, h) : cljs.core.truth_(crate.binding.binding_coll_QMARK_(h)) ? (crate.compiler.capture_binding("\ufdd0:coll", h), e = as_content(b, cljs.core.PersistentVector.fromArray([crate.binding.value(h)], 
            !0))) : cljs.core.truth_(crate.binding.binding_QMARK_(h)) ? (crate.compiler.capture_binding("\ufdd0:text", h), e = as_content(b, cljs.core.PersistentVector.fromArray([crate.binding.value(h)], !0))) : e = cljs.core.truth_(h.nodeName) ? h : cljs.core.truth_(h.get) ? h.get(0) : goog.dom.createTextNode("" + cljs.core.str(h))
          }
          cljs.core.truth_(e) && goog.dom.appendChild(b, e);
          d = cljs.core.next(d);
          e = null;
          f = 0
        }
        g = 0
      }else {
        return null
      }
    }
  }
};
crate.compiler.dom_binding = function() {
  var a = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY), b = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY), c = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY), d = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY), e = cljs.core.get.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentArrayMap.EMPTY, "\ufdd0:hierarchy", cljs.core.get_global_hierarchy());
  return new cljs.core.MultiFn("dom-binding", function(a) {
    return a
  }, "\ufdd0:default", e, a, b, c, d)
}();
crate.compiler.dom_binding.cljs$core$IMultiFn$_add_method$arity$3(crate.compiler.dom_binding, "\ufdd0:text", function(a, b, c) {
  return crate.binding.on_change(b, function(a) {
    goog.dom.removeChildren(c);
    return crate.compiler.as_content(c, cljs.core.PersistentVector.fromArray([a], !0))
  })
});
crate.compiler.dom_binding.cljs$core$IMultiFn$_add_method$arity$3(crate.compiler.dom_binding, "\ufdd0:attr", function(a, b, c) {
  var d = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(b, 0, null), a = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(b, 1, null);
  return crate.binding.on_change(a, function(a) {
    return crate.compiler.dom_attr.cljs$core$IFn$_invoke$arity$3 ? crate.compiler.dom_attr.cljs$core$IFn$_invoke$arity$3(c, d, a) : crate.compiler.dom_attr.call(null, c, d, a)
  })
});
crate.compiler.dom_binding.cljs$core$IMultiFn$_add_method$arity$3(crate.compiler.dom_binding, "\ufdd0:style", function(a, b, c) {
  var d = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(b, 0, null), a = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(b, 1, null);
  return crate.binding.on_change(a, function(a) {
    return cljs.core.truth_(d) ? crate.compiler.dom_style.cljs$core$IFn$_invoke$arity$3 ? crate.compiler.dom_style.cljs$core$IFn$_invoke$arity$3(c, d, a) : crate.compiler.dom_style.call(null, c, d, a) : crate.compiler.dom_style.cljs$core$IFn$_invoke$arity$2 ? crate.compiler.dom_style.cljs$core$IFn$_invoke$arity$2(c, a) : crate.compiler.dom_style.call(null, c, a)
  })
});
crate.compiler.dom_add = function(a, b, c, d) {
  a = crate.binding.opt(a, "\ufdd0:add");
  return cljs.core.truth_(a) ? a.cljs$core$IFn$_invoke$arity$3 ? a.cljs$core$IFn$_invoke$arity$3(b, c, d) : a.call(null, b, c, d) : goog.dom.appendChild(b, c)
};
crate.compiler.dom_remove = function(a, b) {
  var c = crate.binding.opt(a, "\ufdd0:remove");
  return cljs.core.truth_(c) ? c.cljs$core$IFn$_invoke$arity$1 ? c.cljs$core$IFn$_invoke$arity$1(b) : c.call(null, b) : goog.dom.removeNode(b)
};
crate.compiler.dom_binding.cljs$core$IMultiFn$_add_method$arity$3(crate.compiler.dom_binding, "\ufdd0:coll", function(a, b, c) {
  return crate.binding.on_change(b, function(a, e, f) {
    var g = cljs.core._EQ_;
    if(g.cljs$core$IFn$_invoke$arity$2 ? g.cljs$core$IFn$_invoke$arity$2("\ufdd0:add", a) : g.call(null, "\ufdd0:add", a)) {
      return crate.compiler.dom_add(b, c, e, f)
    }
    if(g.cljs$core$IFn$_invoke$arity$2 ? g.cljs$core$IFn$_invoke$arity$2("\ufdd0:remove", a) : g.call(null, "\ufdd0:remove", a)) {
      return crate.compiler.dom_remove(b, e)
    }
    throw Error([cljs.core.str("No matching clause: "), cljs.core.str(a)].join(""));
  })
});
crate.compiler.handle_bindings = function(a, b) {
  for(var c = cljs.core.seq(a), d = null, e = 0, f = 0;;) {
    if(f < e) {
      var g = d.cljs$core$IIndexed$_nth$arity$2(d, f), h = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(g, 0, null), g = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(g, 1, null);
      crate.compiler.dom_binding.cljs$core$IFn$_invoke$arity$3 ? crate.compiler.dom_binding.cljs$core$IFn$_invoke$arity$3(h, g, b) : crate.compiler.dom_binding.call(null, h, g, b);
      f += 1
    }else {
      if(c = cljs.core.seq(c)) {
        cljs.core.chunked_seq_QMARK_(c) ? (d = cljs.core.chunk_first(c), c = cljs.core.chunk_rest(c), h = d, e = cljs.core.count(d), d = h) : (d = cljs.core.first(c), h = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(d, 0, null), g = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(d, 1, null), crate.compiler.dom_binding.cljs$core$IFn$_invoke$arity$3 ? crate.compiler.dom_binding.cljs$core$IFn$_invoke$arity$3(h, g, b) : crate.compiler.dom_binding.call(null, h, g, b), c = cljs.core.next(c), d = null, e = 
        0), f = 0
      }else {
        return null
      }
    }
  }
};
crate.compiler.dom_style = function() {
  var a = null, b = function(b, c) {
    if(cljs.core.string_QMARK_(c)) {
      b.setAttribute("style", c)
    }else {
      if(cljs.core.map_QMARK_(c)) {
        for(var f = cljs.core.seq(c), g = null, h = 0, i = 0;;) {
          if(i < h) {
            var j = g.cljs$core$IIndexed$_nth$arity$2(g, i), k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(j, 0, null), j = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(j, 1, null);
            a.cljs$core$IFn$_invoke$arity$3(b, k, j);
            i += 1
          }else {
            if(f = cljs.core.seq(f)) {
              cljs.core.chunked_seq_QMARK_(f) ? (h = cljs.core.chunk_first(f), f = cljs.core.chunk_rest(f), g = h, h = cljs.core.count(h)) : (h = cljs.core.first(f), g = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(h, 0, null), h = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(h, 1, null), a.cljs$core$IFn$_invoke$arity$3(b, g, h), f = cljs.core.next(f), g = null, h = 0), i = 0
            }else {
              break
            }
          }
        }
      }else {
        cljs.core.truth_(crate.binding.binding_QMARK_(c)) && (crate.compiler.capture_binding("\ufdd0:style", cljs.core.PersistentVector.fromArray([null, c], !0)), a.cljs$core$IFn$_invoke$arity$2(b, crate.binding.value(c)))
      }
    }
    return b
  }, c = function(a, b, c) {
    cljs.core.truth_(crate.binding.binding_QMARK_(c)) && (crate.compiler.capture_binding("\ufdd0:style", cljs.core.PersistentVector.fromArray([b, c], !0)), c = crate.binding.value(c));
    return goog.style.setStyle(a, cljs.core.name(b), c)
  }, a = function(a, e, f) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, e);
      case 3:
        return c.call(this, a, e, f)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$3 = c;
  return a
}();
crate.compiler.dom_attr = function() {
  var a = null, b = function(b, c) {
    if(cljs.core.truth_(b)) {
      if(cljs.core.map_QMARK_(c)) {
        for(var f = cljs.core.seq(c), g = null, h = 0, i = 0;;) {
          if(i < h) {
            var j = g.cljs$core$IIndexed$_nth$arity$2(g, i), k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(j, 0, null), j = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(j, 1, null);
            a.cljs$core$IFn$_invoke$arity$3(b, k, j);
            i += 1
          }else {
            if(f = cljs.core.seq(f)) {
              cljs.core.chunked_seq_QMARK_(f) ? (h = cljs.core.chunk_first(f), f = cljs.core.chunk_rest(f), g = h, h = cljs.core.count(h)) : (h = cljs.core.first(f), g = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(h, 0, null), h = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(h, 1, null), a.cljs$core$IFn$_invoke$arity$3(b, g, h), f = cljs.core.next(f), g = null, h = 0), i = 0
            }else {
              break
            }
          }
        }
        return b
      }
      return b.getAttribute(cljs.core.name(c))
    }
    return null
  }, c = function(a, b, c) {
    cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(b, "\ufdd0:style") ? crate.compiler.dom_style.cljs$core$IFn$_invoke$arity$2(a, c) : (cljs.core.truth_(crate.binding.binding_QMARK_(c)) && (crate.compiler.capture_binding("\ufdd0:attr", cljs.core.PersistentVector.fromArray([b, c], !0)), c = crate.binding.value(c)), a.setAttribute(cljs.core.name(b), c));
    return a
  }, a = function(a, e, f) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, e);
      case 3:
        return c.call(this, a, e, f)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$3 = c;
  return a
}();
crate.compiler.re_tag = /([^\s\.#]+)(?:#([^\s\.#]+))?(?:\.([^\s#]+))?/;
crate.compiler.normalize_map_attrs = function(a) {
  return cljs.core.into(cljs.core.PersistentArrayMap.EMPTY, cljs.core.map.cljs$core$IFn$_invoke$arity$2(function(a) {
    var c = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(a, 0, null), a = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(a, 1, null);
    return!0 === a ? cljs.core.PersistentVector.fromArray([c, cljs.core.name(c)], !0) : cljs.core.PersistentVector.fromArray([c, a], !0)
  }, cljs.core.filter(cljs.core.comp.cljs$core$IFn$_invoke$arity$2(cljs.core.boolean$, cljs.core.second), a)))
};
crate.compiler.normalize_element = function(a) {
  var b = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(a, 0, null), a = cljs.core.nthnext(a, 1), c;
  c = cljs.core.keyword_QMARK_(b);
  c || (c = (c = b instanceof cljs.core.Symbol) ? c : cljs.core.string_QMARK_(b));
  if(!c) {
    throw[cljs.core.str(b), cljs.core.str(" is not a valid tag name.")].join("");
  }
  c = cljs.core.re_matches(crate.compiler.re_tag, cljs.core.name(b));
  cljs.core.nth.cljs$core$IFn$_invoke$arity$3(c, 0, null);
  var d = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(c, 1, null), b = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(c, 2, null);
  c = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(c, 3, null);
  var e;
  e = clojure.string.split.cljs$core$IFn$_invoke$arity$2(d, /:/);
  d = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(e, 0, null);
  e = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(e, 1, null);
  var f = crate.compiler.xmlns.cljs$core$IFn$_invoke$arity$1 ? crate.compiler.xmlns.cljs$core$IFn$_invoke$arity$1(cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(d)) : crate.compiler.xmlns.call(null, cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(d));
  e = cljs.core.truth_(e) ? cljs.core.PersistentVector.fromArray([cljs.core.truth_(f) ? f : d, e], !0) : cljs.core.PersistentVector.fromArray([(new cljs.core.Keyword("\ufdd0:xhtml")).call(null, crate.compiler.xmlns), d], !0);
  d = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(e, 0, null);
  e = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(e, 1, null);
  b = cljs.core.into(cljs.core.PersistentArrayMap.EMPTY, cljs.core.filter(function(a) {
    return null != cljs.core.second(a)
  }, cljs.core.PersistentArrayMap.fromArray(["\ufdd0:id", cljs.core.truth_(b) ? b : null, "\ufdd0:class", cljs.core.truth_(c) ? clojure.string.replace(c, /\./, " ") : null], !0)));
  c = cljs.core.first(a);
  return cljs.core.map_QMARK_(c) ? cljs.core.PersistentVector.fromArray([d, e, cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([b, crate.compiler.normalize_map_attrs(c)], 0)), cljs.core.next(a)], !0) : cljs.core.PersistentVector.fromArray([d, e, b, a], !0)
};
crate.compiler.parse_content = function(a, b) {
  var c = cljs.core.first(b);
  return cljs.core.map_QMARK_(c) ? (crate.compiler.dom_attr.cljs$core$IFn$_invoke$arity$2(a, c), cljs.core.rest(b)) : b
};
crate.compiler.create_elem = cljs.core.truth_(document.createElementNS) ? function(a, b) {
  return document.createElementNS(a, b)
} : function(a, b) {
  return document.createElement(b)
};
crate.compiler.elem_factory = function(a) {
  var b = crate.compiler.bindings;
  try {
    crate.compiler.bindings = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentVector.EMPTY);
    var c = crate.compiler.normalize_element(a), d = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(c, 0, null), e = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(c, 1, null), f = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(c, 2, null), g = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(c, 3, null), h = crate.compiler.create_elem.cljs$core$IFn$_invoke$arity$2 ? crate.compiler.create_elem.cljs$core$IFn$_invoke$arity$2(d, e) : crate.compiler.create_elem.call(null, d, e);
    crate.compiler.dom_attr.cljs$core$IFn$_invoke$arity$2(h, f);
    crate.compiler.as_content(h, g);
    crate.compiler.handle_bindings(cljs.core.deref(crate.compiler.bindings), h);
    return h
  }finally {
    crate.compiler.bindings = b
  }
};
crate.compiler.add_optional_attrs = function(a) {
  var b = function(b) {
    if(cljs.core.map_QMARK_(cljs.core.first(b))) {
      var c = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(a, cljs.core.rest(b)), f = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(c, 0, null), c = cljs.core.nthnext(c, 1);
      return cljs.core.map_QMARK_(cljs.core.first(c)) ? cljs.core.apply.cljs$core$IFn$_invoke$arity$4(cljs.core.vector, f, cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.first(c), cljs.core.first(b)], 0)), cljs.core.rest(c)) : cljs.core.apply.cljs$core$IFn$_invoke$arity$4(cljs.core.vector, f, cljs.core.first(b), c)
    }
    return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(a, b)
  }, c = function(a) {
    var c = null;
    0 < arguments.length && (c = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0));
    return b.call(this, c)
  };
  c.cljs$lang$maxFixedArity = 0;
  c.cljs$lang$applyTo = function(a) {
    a = cljs.core.seq(a);
    return b(a)
  };
  c.cljs$core$IFn$_invoke$arity$variadic = b;
  return c
};
crate.core = {};
crate.core.group_id = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(0);
crate.core.raw = function(a) {
  return goog.dom.htmlToDocumentFragment(a)
};
crate.core.html = function() {
  var a = function(a) {
    a = cljs.core.map.cljs$core$IFn$_invoke$arity$2(crate.compiler.elem_factory, a);
    return cljs.core.truth_(cljs.core.second(a)) ? a : cljs.core.first(a)
  }, b = function(b) {
    var d = null;
    0 < arguments.length && (d = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0));
    return a.call(this, d)
  };
  b.cljs$lang$maxFixedArity = 0;
  b.cljs$lang$applyTo = function(b) {
    b = cljs.core.seq(b);
    return a(b)
  };
  b.cljs$core$IFn$_invoke$arity$variadic = a;
  return b
}();
crate.core.h = crate.util.escape_html;
cljs.core.async = {};
cljs.core.async.impl = {};
cljs.core.async.impl.protocols = {};
cljs.core.async.impl.protocols.ReadPort = {};
cljs.core.async.impl.protocols.take_BANG_ = function(a, b) {
  var c;
  c = a ? a.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 : a;
  if(c) {
    return a.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2(a, b)
  }
  c = cljs.core.async.impl.protocols.take_BANG_[goog.typeOf(null == a ? null : a)];
  if(!c && (c = cljs.core.async.impl.protocols.take_BANG_._, !c)) {
    throw cljs.core.missing_protocol("ReadPort.take!", a);
  }
  return c.call(null, a, b)
};
cljs.core.async.impl.protocols.WritePort = {};
cljs.core.async.impl.protocols.put_BANG_ = function(a, b, c) {
  var d;
  d = a ? a.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 : a;
  if(d) {
    return a.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3(a, b, c)
  }
  d = cljs.core.async.impl.protocols.put_BANG_[goog.typeOf(null == a ? null : a)];
  if(!d && (d = cljs.core.async.impl.protocols.put_BANG_._, !d)) {
    throw cljs.core.missing_protocol("WritePort.put!", a);
  }
  return d.call(null, a, b, c)
};
cljs.core.async.impl.protocols.Channel = {};
cljs.core.async.impl.protocols.close_BANG_ = function(a) {
  var b;
  b = a ? a.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 : a;
  if(b) {
    return a.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1(a)
  }
  b = cljs.core.async.impl.protocols.close_BANG_[goog.typeOf(null == a ? null : a)];
  if(!b && (b = cljs.core.async.impl.protocols.close_BANG_._, !b)) {
    throw cljs.core.missing_protocol("Channel.close!", a);
  }
  return b.call(null, a)
};
cljs.core.async.impl.protocols.Handler = {};
cljs.core.async.impl.protocols.active_QMARK_ = function(a) {
  var b;
  b = a ? a.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 : a;
  if(b) {
    return a.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1(a)
  }
  b = cljs.core.async.impl.protocols.active_QMARK_[goog.typeOf(null == a ? null : a)];
  if(!b && (b = cljs.core.async.impl.protocols.active_QMARK_._, !b)) {
    throw cljs.core.missing_protocol("Handler.active?", a);
  }
  return b.call(null, a)
};
cljs.core.async.impl.protocols.commit = function(a) {
  var b;
  b = a ? a.cljs$core$async$impl$protocols$Handler$commit$arity$1 : a;
  if(b) {
    return a.cljs$core$async$impl$protocols$Handler$commit$arity$1(a)
  }
  b = cljs.core.async.impl.protocols.commit[goog.typeOf(null == a ? null : a)];
  if(!b && (b = cljs.core.async.impl.protocols.commit._, !b)) {
    throw cljs.core.missing_protocol("Handler.commit", a);
  }
  return b.call(null, a)
};
cljs.core.async.impl.protocols.Buffer = {};
cljs.core.async.impl.protocols.full_QMARK_ = function(a) {
  var b;
  b = a ? a.cljs$core$async$impl$protocols$Buffer$full_QMARK_$arity$1 : a;
  if(b) {
    return a.cljs$core$async$impl$protocols$Buffer$full_QMARK_$arity$1(a)
  }
  b = cljs.core.async.impl.protocols.full_QMARK_[goog.typeOf(null == a ? null : a)];
  if(!b && (b = cljs.core.async.impl.protocols.full_QMARK_._, !b)) {
    throw cljs.core.missing_protocol("Buffer.full?", a);
  }
  return b.call(null, a)
};
cljs.core.async.impl.protocols.remove_BANG_ = function(a) {
  var b;
  b = a ? a.cljs$core$async$impl$protocols$Buffer$remove_BANG_$arity$1 : a;
  if(b) {
    return a.cljs$core$async$impl$protocols$Buffer$remove_BANG_$arity$1(a)
  }
  b = cljs.core.async.impl.protocols.remove_BANG_[goog.typeOf(null == a ? null : a)];
  if(!b && (b = cljs.core.async.impl.protocols.remove_BANG_._, !b)) {
    throw cljs.core.missing_protocol("Buffer.remove!", a);
  }
  return b.call(null, a)
};
cljs.core.async.impl.protocols.add_BANG_ = function(a, b) {
  var c;
  c = a ? a.cljs$core$async$impl$protocols$Buffer$add_BANG_$arity$2 : a;
  if(c) {
    return a.cljs$core$async$impl$protocols$Buffer$add_BANG_$arity$2(a, b)
  }
  c = cljs.core.async.impl.protocols.add_BANG_[goog.typeOf(null == a ? null : a)];
  if(!c && (c = cljs.core.async.impl.protocols.add_BANG_._, !c)) {
    throw cljs.core.missing_protocol("Buffer.add!", a);
  }
  return c.call(null, a, b)
};
cljs.core.async.impl.ioc_helpers = {};
cljs.core.async.impl.ioc_helpers.FN_IDX = 0;
cljs.core.async.impl.ioc_helpers.STATE_IDX = 1;
cljs.core.async.impl.ioc_helpers.VALUE_IDX = 2;
cljs.core.async.impl.ioc_helpers.BINDINGS_IDX = 3;
cljs.core.async.impl.ioc_helpers.USER_START_IDX = 4;
cljs.core.async.impl.ioc_helpers.aset_object = function(a, b, c) {
  return a[b][c]
};
cljs.core.async.impl.ioc_helpers.aget_object = function(a, b) {
  return a[b]
};
cljs.core.async.impl.ioc_helpers.finished_QMARK_ = function(a) {
  return"\ufdd0:finished" === a[cljs.core.async.impl.ioc_helpers.STATE_IDX]
};
cljs.core.async.impl.ioc_helpers.fn_handler = function fn_handler(b) {
  void 0 === cljs.core.async.impl.ioc_helpers.t9233 && (cljs.core.async.impl.ioc_helpers.t9233 = {}, cljs.core.async.impl.ioc_helpers.t9233 = function(b, d, e) {
    this.f = b;
    this.fn_handler = d;
    this.meta9234 = e;
    this.cljs$lang$protocol_mask$partition1$ = 0;
    this.cljs$lang$protocol_mask$partition0$ = 393216
  }, cljs.core.async.impl.ioc_helpers.t9233.cljs$lang$type = !0, cljs.core.async.impl.ioc_helpers.t9233.cljs$lang$ctorStr = "cljs.core.async.impl.ioc-helpers/t9233", cljs.core.async.impl.ioc_helpers.t9233.cljs$lang$ctorPrWriter = function(b, d) {
    return cljs.core._write(d, "cljs.core.async.impl.ioc-helpers/t9233")
  }, cljs.core.async.impl.ioc_helpers.t9233.prototype.cljs$core$async$impl$protocols$Handler$ = !0, cljs.core.async.impl.ioc_helpers.t9233.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = function() {
    return!0
  }, cljs.core.async.impl.ioc_helpers.t9233.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = function() {
    return this.f
  }, cljs.core.async.impl.ioc_helpers.t9233.prototype.cljs$core$IMeta$_meta$arity$1 = function() {
    return this.meta9234
  }, cljs.core.async.impl.ioc_helpers.t9233.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(b, d) {
    return new cljs.core.async.impl.ioc_helpers.t9233(this.f, this.fn_handler, d)
  }, cljs.core.async.impl.ioc_helpers.__GT_t9233 = function(b, d, e) {
    return new cljs.core.async.impl.ioc_helpers.t9233(b, d, e)
  });
  return new cljs.core.async.impl.ioc_helpers.t9233(b, fn_handler, null)
};
cljs.core.async.impl.ioc_helpers.run_state_machine = function(a) {
  return cljs.core.async.impl.ioc_helpers.aget_object(a, cljs.core.async.impl.ioc_helpers.FN_IDX).call(null, a)
};
cljs.core.async.impl.ioc_helpers.take_BANG_ = function(a, b, c) {
  c = cljs.core.async.impl.protocols.take_BANG_(c, cljs.core.async.impl.ioc_helpers.fn_handler(function(c) {
    a[cljs.core.async.impl.ioc_helpers.VALUE_IDX] = c;
    a[cljs.core.async.impl.ioc_helpers.STATE_IDX] = b;
    return cljs.core.async.impl.ioc_helpers.run_state_machine(a)
  }));
  return cljs.core.truth_(c) ? (a[cljs.core.async.impl.ioc_helpers.VALUE_IDX] = cljs.core.deref(c), a[cljs.core.async.impl.ioc_helpers.STATE_IDX] = b, "\ufdd0:recur") : null
};
cljs.core.async.impl.ioc_helpers.put_BANG_ = function(a, b, c, d) {
  c = cljs.core.async.impl.protocols.put_BANG_(c, d, cljs.core.async.impl.ioc_helpers.fn_handler(function() {
    a[cljs.core.async.impl.ioc_helpers.VALUE_IDX] = null;
    a[cljs.core.async.impl.ioc_helpers.STATE_IDX] = b;
    return cljs.core.async.impl.ioc_helpers.run_state_machine(a)
  }));
  return cljs.core.truth_(c) ? (a[cljs.core.async.impl.ioc_helpers.VALUE_IDX] = cljs.core.deref(c), a[cljs.core.async.impl.ioc_helpers.STATE_IDX] = b, "\ufdd0:recur") : null
};
cljs.core.async.impl.ioc_helpers.ioc_alts_BANG_ = function() {
  var a = function(a, b, e, f) {
    f = cljs.core.seq_QMARK_(f) ? cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map, f) : f;
    a[cljs.core.async.impl.ioc_helpers.STATE_IDX] = b;
    b = cljs.core.async.do_alts(function(b) {
      a[cljs.core.async.impl.ioc_helpers.VALUE_IDX] = b;
      return cljs.core.async.impl.ioc_helpers.run_state_machine(a)
    }, e, f);
    return cljs.core.truth_(b) ? (a[cljs.core.async.impl.ioc_helpers.VALUE_IDX] = cljs.core.deref(b), "\ufdd0:recur") : null
  }, b = function(b, d, e, f) {
    var g = null;
    3 < arguments.length && (g = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
    return a.call(this, b, d, e, g)
  };
  b.cljs$lang$maxFixedArity = 3;
  b.cljs$lang$applyTo = function(b) {
    var d = cljs.core.first(b), b = cljs.core.next(b), e = cljs.core.first(b), b = cljs.core.next(b), f = cljs.core.first(b), b = cljs.core.rest(b);
    return a(d, e, f, b)
  };
  b.cljs$core$IFn$_invoke$arity$variadic = a;
  return b
}();
cljs.core.async.impl.ioc_helpers.return_chan = function(a, b) {
  var c = a[cljs.core.async.impl.ioc_helpers.USER_START_IDX];
  null != b && cljs.core.async.impl.protocols.put_BANG_(c, b, cljs.core.async.impl.ioc_helpers.fn_handler(function() {
    return null
  }));
  cljs.core.async.impl.protocols.close_BANG_(c);
  return c
};
cljs.core.async.impl.dispatch = {};
cljs.core.async.impl.dispatch.message_channel = null;
cljs.core.async.impl.dispatch.tasks = null;
"undefined" !== typeof MessageChannel && (cljs.core.async.impl.dispatch.message_channel = new MessageChannel, cljs.core.async.impl.dispatch.tasks = [], cljs.core.async.impl.dispatch.message_channel.port1.onmessage = function() {
  return cljs.core.async.impl.dispatch.tasks.shift().call(null)
});
cljs.core.async.impl.dispatch.queue_task = function(a) {
  cljs.core.async.impl.dispatch.tasks.push(a);
  return cljs.core.async.impl.dispatch.message_channel.port2.postMessage(0)
};
cljs.core.async.impl.dispatch.run = function(a) {
  return"undefined" !== typeof MessageChannel ? cljs.core.async.impl.dispatch.queue_task(a) : "undefined" !== typeof setImmediate ? setImmediate(a) : setTimeout(a, 0)
};
cljs.core.async.impl.dispatch.queue_delay = function(a, b) {
  return setTimeout(a, b)
};
cljs.core.async.impl.channels = {};
cljs.core.async.impl.channels.box = function box$$0(b) {
  void 0 === cljs.core.async.impl.channels.t9208 && (cljs.core.async.impl.channels.t9208 = {}, cljs.core.async.impl.channels.t9208 = function(b, d, e) {
    this.val = b;
    this.box = d;
    this.meta9209 = e;
    this.cljs$lang$protocol_mask$partition1$ = 0;
    this.cljs$lang$protocol_mask$partition0$ = 425984
  }, cljs.core.async.impl.channels.t9208.cljs$lang$type = !0, cljs.core.async.impl.channels.t9208.cljs$lang$ctorStr = "cljs.core.async.impl.channels/t9208", cljs.core.async.impl.channels.t9208.cljs$lang$ctorPrWriter = function(b, d) {
    return cljs.core._write(d, "cljs.core.async.impl.channels/t9208")
  }, cljs.core.async.impl.channels.t9208.prototype.cljs$core$IDeref$_deref$arity$1 = function() {
    return this.val
  }, cljs.core.async.impl.channels.t9208.prototype.cljs$core$IMeta$_meta$arity$1 = function() {
    return this.meta9209
  }, cljs.core.async.impl.channels.t9208.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(b, d) {
    return new cljs.core.async.impl.channels.t9208(this.val, this.box, d)
  }, cljs.core.async.impl.channels.__GT_t9208 = function(b, d, e) {
    return new cljs.core.async.impl.channels.t9208(b, d, e)
  });
  return new cljs.core.async.impl.channels.t9208(b, box$$0, null)
};
cljs.core.async.impl.channels.MMC = {};
cljs.core.async.impl.channels.cleanup = function(a) {
  var b;
  b = a ? a.cljs$core$async$impl$channels$MMC$cleanup$arity$1 : a;
  if(b) {
    return a.cljs$core$async$impl$channels$MMC$cleanup$arity$1(a)
  }
  b = cljs.core.async.impl.channels.cleanup[goog.typeOf(null == a ? null : a)];
  if(!b && (b = cljs.core.async.impl.channels.cleanup._, !b)) {
    throw cljs.core.missing_protocol("MMC.cleanup", a);
  }
  return b.call(null, a)
};
cljs.core.async.impl.channels.ManyToManyChannel = function(a, b, c, d) {
  this.takes = a;
  this.puts = b;
  this.buf = c;
  this.closed = d
};
cljs.core.async.impl.channels.ManyToManyChannel.cljs$lang$type = !0;
cljs.core.async.impl.channels.ManyToManyChannel.cljs$lang$ctorStr = "cljs.core.async.impl.channels/ManyToManyChannel";
cljs.core.async.impl.channels.ManyToManyChannel.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write(b, "cljs.core.async.impl.channels/ManyToManyChannel")
};
cljs.core.async.impl.channels.ManyToManyChannel.prototype.cljs$core$async$impl$protocols$Channel$ = !0;
cljs.core.async.impl.channels.ManyToManyChannel.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = function(a) {
  a.cljs$core$async$impl$channels$MMC$cleanup$arity$1(a);
  if(!cljs.core.truth_(cljs.core.deref(this.closed))) {
    cljs.core.reset_BANG_(this.closed, !0);
    for(var a = this.takes.length, b = 0;;) {
      if(b < a) {
        var c = this.takes[b], d;
        d = cljs.core.async.impl.protocols.active_QMARK_(c);
        d = cljs.core.truth_(d) ? cljs.core.async.impl.protocols.commit(c) : d;
        cljs.core.truth_(d) && cljs.core.async.impl.dispatch.run(function(a, b, c) {
          return function() {
            return c.cljs$core$IFn$_invoke$arity$1 ? c.cljs$core$IFn$_invoke$arity$1(null) : c.call(null, null)
          }
        }(b, c, d));
        b += 1
      }else {
        break
      }
    }
  }
  return null
};
cljs.core.async.impl.channels.ManyToManyChannel.prototype.cljs$core$async$impl$protocols$ReadPort$ = !0;
cljs.core.async.impl.channels.ManyToManyChannel.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = function(a, b) {
  var c = this;
  a.cljs$core$async$impl$channels$MMC$cleanup$arity$1(a);
  if(cljs.core.truth_(function() {
    var a = c.buf;
    return cljs.core.truth_(a) ? 0 < cljs.core.count(c.buf) : a
  }())) {
    var d;
    d = cljs.core.async.impl.protocols.active_QMARK_(b);
    d = cljs.core.truth_(d) ? cljs.core.async.impl.protocols.commit(b) : d;
    return cljs.core.truth_(d) ? cljs.core.async.impl.channels.box(cljs.core.async.impl.protocols.remove_BANG_(c.buf)) : null
  }
  var e;
  a: {
    for(d = 0;;) {
      if(d < c.puts.length) {
        var f = c.puts[d], g = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(f, 0, null), f = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(f, 1, null), f = cljs.core.truth_(function() {
          var a = cljs.core.async.impl.protocols.active_QMARK_(b);
          return cljs.core.truth_(a) ? cljs.core.async.impl.protocols.active_QMARK_(g) : a
        }()) ? cljs.core.PersistentVector.fromArray([cljs.core.async.impl.protocols.commit(b), cljs.core.async.impl.protocols.commit(g), f], !0) : null;
        if(cljs.core.truth_(f)) {
          c.puts.splice(d, 1);
          e = f;
          break a
        }else {
          d += 1
        }
      }else {
        e = null;
        break a
      }
    }
    e = void 0
  }
  d = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(e, 0, null);
  f = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(e, 1, null);
  e = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(e, 2, null);
  if(cljs.core.truth_(cljs.core.truth_(f) ? d : f)) {
    return cljs.core.async.impl.dispatch.run(f), cljs.core.async.impl.channels.box(e)
  }
  if(cljs.core.truth_(cljs.core.deref(c.closed))) {
    return d = cljs.core.async.impl.protocols.active_QMARK_(b), d = cljs.core.truth_(d) ? cljs.core.async.impl.protocols.commit(b) : d, cljs.core.truth_(d) ? cljs.core.async.impl.channels.box(null) : null
  }
  c.takes.unshift(b);
  return null
};
cljs.core.async.impl.channels.ManyToManyChannel.prototype.cljs$core$async$impl$protocols$WritePort$ = !0;
cljs.core.async.impl.channels.ManyToManyChannel.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = function(a, b, c) {
  var d = this;
  if(null == b) {
    throw Error([cljs.core.str("Assert failed: "), cljs.core.str("Can't put nil in on a channel"), cljs.core.str("\n"), cljs.core.str(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.list(new cljs.core.Symbol(null, "not", "not", -1640422260, null), cljs.core.list(new cljs.core.Symbol(null, "nil?", "nil?", -1637150201, null), new cljs.core.Symbol(null, "val", "val", -1640415014, null)))], 0)))].join(""));
  }
  a.cljs$core$async$impl$channels$MMC$cleanup$arity$1(a);
  if(cljs.core.truth_(cljs.core.deref(d.closed))) {
    return cljs.core.async.impl.channels.box(null)
  }
  a: {
    for(a = 0;;) {
      if(a < d.takes.length) {
        var e = d.takes[a];
        if(cljs.core.truth_(function() {
          var a = cljs.core.async.impl.protocols.active_QMARK_(e);
          return cljs.core.truth_(a) ? cljs.core.async.impl.protocols.active_QMARK_(c) : a
        }())) {
          d.takes.splice(a, 1);
          a = cljs.core.PersistentVector.fromArray([cljs.core.async.impl.protocols.commit(c), cljs.core.async.impl.protocols.commit(e)], !0);
          break a
        }else {
          a += 1
        }
      }else {
        a = null;
        break a
      }
    }
    a = void 0
  }
  var f = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(a, 0, null), g = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(a, 1, null);
  if(cljs.core.truth_(cljs.core.truth_(f) ? g : f)) {
    return cljs.core.async.impl.dispatch.run(function() {
      return g.cljs$core$IFn$_invoke$arity$1 ? g.cljs$core$IFn$_invoke$arity$1(b) : g.call(null, b)
    }), cljs.core.async.impl.channels.box(null)
  }
  if(cljs.core.truth_(function() {
    var a = d.buf;
    return cljs.core.truth_(a) ? cljs.core.not(cljs.core.async.impl.protocols.full_QMARK_(d.buf)) : a
  }())) {
    return a = cljs.core.async.impl.protocols.active_QMARK_(c), a = cljs.core.truth_(a) ? cljs.core.async.impl.protocols.commit(c) : a, cljs.core.truth_(a) ? (cljs.core.async.impl.protocols.add_BANG_(d.buf, b), cljs.core.async.impl.channels.box(null)) : null
  }
  d.puts.unshift(cljs.core.PersistentVector.fromArray([c, b], !0));
  return null
};
cljs.core.async.impl.channels.ManyToManyChannel.prototype.cljs$core$async$impl$channels$MMC$ = !0;
cljs.core.async.impl.channels.ManyToManyChannel.prototype.cljs$core$async$impl$channels$MMC$cleanup$arity$1 = function() {
  for(var a = 0;;) {
    if(a < this.puts.length) {
      var b = this.puts[a], c = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(b, 0, null);
      cljs.core.nth.cljs$core$IFn$_invoke$arity$3(b, 1, null);
      cljs.core.truth_(cljs.core.async.impl.protocols.active_QMARK_(c)) ? a += 1 : this.puts.splice(a, 1)
    }else {
      break
    }
  }
  for(a = 0;;) {
    if(a < this.takes.length) {
      cljs.core.truth_(cljs.core.async.impl.protocols.active_QMARK_(this.takes[a])) ? a += 1 : this.takes.splice(a, 1)
    }else {
      return null
    }
  }
};
cljs.core.async.impl.channels.__GT_ManyToManyChannel = function(a, b, c, d) {
  return new cljs.core.async.impl.channels.ManyToManyChannel(a, b, c, d)
};
cljs.core.async.impl.channels.chan = function(a) {
  return new cljs.core.async.impl.channels.ManyToManyChannel([], [], a, cljs.core.atom.cljs$core$IFn$_invoke$arity$1(null))
};
cljs.core.async.impl.timers = {};
cljs.core.async.impl.timers.MAX_LEVEL = 15;
cljs.core.async.impl.timers.P = 0.5;
cljs.core.async.impl.timers.random_level = function() {
  var a = null, b = function() {
    return a.cljs$core$IFn$_invoke$arity$1(0)
  }, c = function(a) {
    for(;;) {
      var b;
      b = (b = Math.random() < cljs.core.async.impl.timers.P) ? a < cljs.core.async.impl.timers.MAX_LEVEL : b;
      if(b) {
        a += 1
      }else {
        return a
      }
    }
  }, a = function(a) {
    switch(arguments.length) {
      case 0:
        return b.call(this);
      case 1:
        return c.call(this, a)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$0 = b;
  a.cljs$core$IFn$_invoke$arity$1 = c;
  return a
}();
cljs.core.async.impl.timers.SkipListNode = function(a, b, c) {
  this.key = a;
  this.val = b;
  this.forward = c;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 2155872256
};
cljs.core.async.impl.timers.SkipListNode.cljs$lang$type = !0;
cljs.core.async.impl.timers.SkipListNode.cljs$lang$ctorStr = "cljs.core.async.impl.timers/SkipListNode";
cljs.core.async.impl.timers.SkipListNode.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write(b, "cljs.core.async.impl.timers/SkipListNode")
};
cljs.core.async.impl.timers.SkipListNode.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = function(a, b, c) {
  return cljs.core.pr_sequential_writer(b, cljs.core.pr_writer, "[", " ", "]", c, a)
};
cljs.core.async.impl.timers.SkipListNode.prototype.cljs$core$ISeqable$_seq$arity$1 = function() {
  return cljs.core.list.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([this.key, this.val], 0))
};
cljs.core.async.impl.timers.__GT_SkipListNode = function(a, b, c) {
  return new cljs.core.async.impl.timers.SkipListNode(a, b, c)
};
cljs.core.async.impl.timers.skip_list_node = function() {
  var a = null, b = function(b) {
    return a.cljs$core$IFn$_invoke$arity$3(null, null, b)
  }, c = function(a, b, c) {
    for(var c = Array(c + 1), g = 0;;) {
      if(g < c.length) {
        c[g] = null, g += 1
      }else {
        break
      }
    }
    return new cljs.core.async.impl.timers.SkipListNode(a, b, c)
  }, a = function(a, e, f) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 3:
        return c.call(this, a, e, f)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$3 = c;
  return a
}();
cljs.core.async.impl.timers.least_greater_node = function() {
  var a = null, b = function(b, c, f) {
    return a.cljs$core$IFn$_invoke$arity$4(b, c, f, null)
  }, c = function(a, b, c, g) {
    for(;;) {
      if(0 > c) {
        return a
      }
      a: {
        for(;;) {
          var h = a.forward[c];
          if(cljs.core.truth_(h)) {
            if(h.key < b) {
              a = h
            }else {
              break a
            }
          }else {
            break a
          }
        }
        a = void 0
      }
      null != g && (g[c] = a);
      c -= 1
    }
  }, a = function(a, e, f, g) {
    switch(arguments.length) {
      case 3:
        return b.call(this, a, e, f);
      case 4:
        return c.call(this, a, e, f, g)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$3 = b;
  a.cljs$core$IFn$_invoke$arity$4 = c;
  return a
}();
cljs.core.async.impl.timers.SkipList = function(a, b) {
  this.header = a;
  this.level = b;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 2155872256
};
cljs.core.async.impl.timers.SkipList.cljs$lang$type = !0;
cljs.core.async.impl.timers.SkipList.cljs$lang$ctorStr = "cljs.core.async.impl.timers/SkipList";
cljs.core.async.impl.timers.SkipList.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write(b, "cljs.core.async.impl.timers/SkipList")
};
cljs.core.async.impl.timers.SkipList.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = function(a, b, c) {
  return cljs.core.pr_sequential_writer(b, function(a) {
    return cljs.core.pr_sequential_writer(b, cljs.core.pr_writer, "", " ", "", c, a)
  }, "{", ", ", "}", c, a)
};
cljs.core.async.impl.timers.SkipList.prototype.cljs$core$ISeqable$_seq$arity$1 = function() {
  var a = function c(a) {
    return new cljs.core.LazySeq(null, !1, function() {
      return null == a ? null : cljs.core.cons(cljs.core.PersistentVector.fromArray([a.key, a.val], !0), c(a.forward[0]))
    }, null)
  };
  return a.cljs$core$IFn$_invoke$arity$1 ? a.cljs$core$IFn$_invoke$arity$1(this.header.forward[0]) : a.call(null, this.header.forward[0])
};
cljs.core.async.impl.timers.SkipList.prototype.put = function(a, b) {
  var c = Array(cljs.core.async.impl.timers.MAX_LEVEL), d = cljs.core.async.impl.timers.least_greater_node.cljs$core$IFn$_invoke$arity$4(this.header, a, this.level, c).forward[0], e;
  e = (e = null != d) ? d.key === a : e;
  if(e) {
    return d.val = b
  }
  d = cljs.core.async.impl.timers.random_level.cljs$core$IFn$_invoke$arity$0();
  if(d > this.level) {
    for(e = this.level + 1;;) {
      if(e <= d + 1) {
        c[e] = this.header, e += 1
      }else {
        break
      }
    }
    this.level = d
  }
  for(d = cljs.core.async.impl.timers.skip_list_node.cljs$core$IFn$_invoke$arity$3(a, b, Array(d));;) {
    return 0 <= this.level ? (c = c[0].forward, d.forward[0] = c[0], c[0] = d) : null
  }
};
cljs.core.async.impl.timers.SkipList.prototype.remove = function(a) {
  var b = Array(cljs.core.async.impl.timers.MAX_LEVEL), c = cljs.core.async.impl.timers.least_greater_node.cljs$core$IFn$_invoke$arity$4(this.header, a, this.level, b).forward[0];
  var d = null != c, a = d ? c.key === a : d;
  if(a) {
    for(a = 0;;) {
      if(a <= this.level) {
        d = b[a].forward, d[a] === c && (d[a] = c.forward[a]), a += 1
      }else {
        break
      }
    }
    for(;;) {
      if(b = (b = 0 < this.level) ? null == this.header.forward[this.level] : b, b) {
        this.level -= 1
      }else {
        return null
      }
    }
  }else {
    return null
  }
};
cljs.core.async.impl.timers.SkipList.prototype.ceilingEntry = function(a) {
  for(var b = this.header, c = this.level;;) {
    if(0 > c) {
      return b === this.header ? null : b
    }
    var d;
    a: {
      for(d = b;;) {
        if(d = d.forward[c], null == d) {
          d = null;
          break a
        }else {
          if(d.key >= a) {
            break a
          }
        }
      }
      d = void 0
    }
    null != d ? (c -= 1, b = d) : c -= 1
  }
};
cljs.core.async.impl.timers.SkipList.prototype.floorEntry = function(a) {
  for(var b = this.header, c = this.level;;) {
    if(0 > c) {
      return b === this.header ? null : b
    }
    var d;
    a: {
      for(d = b;;) {
        var e = d.forward[c];
        if(null != e) {
          if(e.key > a) {
            break a
          }
          d = e
        }else {
          d = 0 === c ? d : null;
          break a
        }
      }
      d = void 0
    }
    cljs.core.truth_(d) ? (c -= 1, b = d) : c -= 1
  }
};
cljs.core.async.impl.timers.__GT_SkipList = function(a, b) {
  return new cljs.core.async.impl.timers.SkipList(a, b)
};
cljs.core.async.impl.timers.skip_list = function() {
  return new cljs.core.async.impl.timers.SkipList(cljs.core.async.impl.timers.skip_list_node.cljs$core$IFn$_invoke$arity$1(0), 0)
};
cljs.core.async.impl.timers.timeouts_map = cljs.core.async.impl.timers.skip_list();
cljs.core.async.impl.timers.TIMEOUT_RESOLUTION_MS = 10;
cljs.core.async.impl.timers.timeout = function(a) {
  var b = (new Date).valueOf() + a, c = cljs.core.async.impl.timers.timeouts_map.ceilingEntry(b), c = cljs.core.truth_(cljs.core.truth_(c) ? c.key < b + cljs.core.async.impl.timers.TIMEOUT_RESOLUTION_MS : c) ? c.val : null;
  if(cljs.core.truth_(c)) {
    return c
  }
  var d = cljs.core.async.impl.channels.chan(null);
  cljs.core.async.impl.timers.timeouts_map.put(b, d);
  cljs.core.async.impl.dispatch.queue_delay(function() {
    cljs.core.async.impl.timers.timeouts_map.remove(b);
    return cljs.core.async.impl.protocols.close_BANG_(d)
  }, a);
  return d
};
cljs.core.async.impl.buffers = {};
cljs.core.async.impl.buffers.FixedBuffer = function(a, b) {
  this.buf = a;
  this.n = b;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 2
};
cljs.core.async.impl.buffers.FixedBuffer.cljs$lang$type = !0;
cljs.core.async.impl.buffers.FixedBuffer.cljs$lang$ctorStr = "cljs.core.async.impl.buffers/FixedBuffer";
cljs.core.async.impl.buffers.FixedBuffer.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write(b, "cljs.core.async.impl.buffers/FixedBuffer")
};
cljs.core.async.impl.buffers.FixedBuffer.prototype.cljs$core$ICounted$_count$arity$1 = function() {
  return this.buf.length
};
cljs.core.async.impl.buffers.FixedBuffer.prototype.cljs$core$async$impl$protocols$Buffer$ = !0;
cljs.core.async.impl.buffers.FixedBuffer.prototype.cljs$core$async$impl$protocols$Buffer$full_QMARK_$arity$1 = function() {
  return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this.buf.length, this.n)
};
cljs.core.async.impl.buffers.FixedBuffer.prototype.cljs$core$async$impl$protocols$Buffer$remove_BANG_$arity$1 = function() {
  return this.buf.pop()
};
cljs.core.async.impl.buffers.FixedBuffer.prototype.cljs$core$async$impl$protocols$Buffer$add_BANG_$arity$2 = function(a, b) {
  if(!cljs.core.not(a.cljs$core$async$impl$protocols$Buffer$full_QMARK_$arity$1(a))) {
    throw Error([cljs.core.str("Assert failed: "), cljs.core.str("Can't add to a full buffer"), cljs.core.str("\n"), cljs.core.str(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.list(new cljs.core.Symbol(null, "not", "not", -1640422260, null), cljs.core.list(new cljs.core.Symbol("impl", "full?", "impl/full?", -1337857039, null), new cljs.core.Symbol(null, "this", "this", -1636972457, null)))], 0)))].join(""));
  }
  return this.buf.unshift(b)
};
cljs.core.async.impl.buffers.__GT_FixedBuffer = function(a, b) {
  return new cljs.core.async.impl.buffers.FixedBuffer(a, b)
};
cljs.core.async.impl.buffers.fixed_buffer = function(a) {
  return new cljs.core.async.impl.buffers.FixedBuffer([], a)
};
cljs.core.async.impl.buffers.DroppingBuffer = function(a, b) {
  this.buf = a;
  this.n = b;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 2
};
cljs.core.async.impl.buffers.DroppingBuffer.cljs$lang$type = !0;
cljs.core.async.impl.buffers.DroppingBuffer.cljs$lang$ctorStr = "cljs.core.async.impl.buffers/DroppingBuffer";
cljs.core.async.impl.buffers.DroppingBuffer.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write(b, "cljs.core.async.impl.buffers/DroppingBuffer")
};
cljs.core.async.impl.buffers.DroppingBuffer.prototype.cljs$core$ICounted$_count$arity$1 = function() {
  return this.buf.length
};
cljs.core.async.impl.buffers.DroppingBuffer.prototype.cljs$core$async$impl$protocols$Buffer$ = !0;
cljs.core.async.impl.buffers.DroppingBuffer.prototype.cljs$core$async$impl$protocols$Buffer$full_QMARK_$arity$1 = function() {
  return!1
};
cljs.core.async.impl.buffers.DroppingBuffer.prototype.cljs$core$async$impl$protocols$Buffer$remove_BANG_$arity$1 = function() {
  return this.buf.pop()
};
cljs.core.async.impl.buffers.DroppingBuffer.prototype.cljs$core$async$impl$protocols$Buffer$add_BANG_$arity$2 = function(a, b) {
  return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this.buf.length, this.n) ? null : this.buf.unshift(b)
};
cljs.core.async.impl.buffers.__GT_DroppingBuffer = function(a, b) {
  return new cljs.core.async.impl.buffers.DroppingBuffer(a, b)
};
cljs.core.async.impl.buffers.dropping_buffer = function(a) {
  return new cljs.core.async.impl.buffers.DroppingBuffer([], a)
};
cljs.core.async.impl.buffers.SlidingBuffer = function(a, b) {
  this.buf = a;
  this.n = b;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 2
};
cljs.core.async.impl.buffers.SlidingBuffer.cljs$lang$type = !0;
cljs.core.async.impl.buffers.SlidingBuffer.cljs$lang$ctorStr = "cljs.core.async.impl.buffers/SlidingBuffer";
cljs.core.async.impl.buffers.SlidingBuffer.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write(b, "cljs.core.async.impl.buffers/SlidingBuffer")
};
cljs.core.async.impl.buffers.SlidingBuffer.prototype.cljs$core$ICounted$_count$arity$1 = function() {
  return this.buf.length
};
cljs.core.async.impl.buffers.SlidingBuffer.prototype.cljs$core$async$impl$protocols$Buffer$ = !0;
cljs.core.async.impl.buffers.SlidingBuffer.prototype.cljs$core$async$impl$protocols$Buffer$full_QMARK_$arity$1 = function() {
  return!1
};
cljs.core.async.impl.buffers.SlidingBuffer.prototype.cljs$core$async$impl$protocols$Buffer$remove_BANG_$arity$1 = function() {
  return this.buf.pop()
};
cljs.core.async.impl.buffers.SlidingBuffer.prototype.cljs$core$async$impl$protocols$Buffer$add_BANG_$arity$2 = function(a, b) {
  cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this.buf.length, this.n) && a.cljs$core$async$impl$protocols$Buffer$remove_BANG_$arity$1(a);
  return this.buf.unshift(b)
};
cljs.core.async.impl.buffers.__GT_SlidingBuffer = function(a, b) {
  return new cljs.core.async.impl.buffers.SlidingBuffer(a, b)
};
cljs.core.async.impl.buffers.sliding_buffer = function(a) {
  return new cljs.core.async.impl.buffers.SlidingBuffer([], a)
};
cljs.core.async.fn_handler = function fn_handler$$0(b) {
  void 0 === cljs.core.async.t9155 && (cljs.core.async.t9155 = {}, cljs.core.async.t9155 = function(b, d, e) {
    this.f = b;
    this.fn_handler = d;
    this.meta9156 = e;
    this.cljs$lang$protocol_mask$partition1$ = 0;
    this.cljs$lang$protocol_mask$partition0$ = 393216
  }, cljs.core.async.t9155.cljs$lang$type = !0, cljs.core.async.t9155.cljs$lang$ctorStr = "cljs.core.async/t9155", cljs.core.async.t9155.cljs$lang$ctorPrWriter = function(b, d) {
    return cljs.core._write(d, "cljs.core.async/t9155")
  }, cljs.core.async.t9155.prototype.cljs$core$async$impl$protocols$Handler$ = !0, cljs.core.async.t9155.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = function() {
    return!0
  }, cljs.core.async.t9155.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = function() {
    return this.f
  }, cljs.core.async.t9155.prototype.cljs$core$IMeta$_meta$arity$1 = function() {
    return this.meta9156
  }, cljs.core.async.t9155.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(b, d) {
    return new cljs.core.async.t9155(this.f, this.fn_handler, d)
  }, cljs.core.async.__GT_t9155 = function(b, d, e) {
    return new cljs.core.async.t9155(b, d, e)
  });
  return new cljs.core.async.t9155(b, fn_handler$$0, null)
};
cljs.core.async.buffer = function(a) {
  return cljs.core.async.impl.buffers.fixed_buffer(a)
};
cljs.core.async.dropping_buffer = function(a) {
  return cljs.core.async.impl.buffers.dropping_buffer(a)
};
cljs.core.async.sliding_buffer = function(a) {
  return cljs.core.async.impl.buffers.sliding_buffer(a)
};
cljs.core.async.chan = function() {
  var a = null, b = function() {
    return a.cljs$core$IFn$_invoke$arity$1(null)
  }, c = function(a) {
    return cljs.core.async.impl.channels.chan("number" === typeof a ? cljs.core.async.buffer(a) : a)
  }, a = function(a) {
    switch(arguments.length) {
      case 0:
        return b.call(this);
      case 1:
        return c.call(this, a)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$0 = b;
  a.cljs$core$IFn$_invoke$arity$1 = c;
  return a
}();
cljs.core.async.timeout = function(a) {
  return cljs.core.async.impl.timers.timeout(a)
};
cljs.core.async._LT__BANG_ = function() {
  throw Error([cljs.core.str("Assert failed: "), cljs.core.str("<! used not in (go ...) block"), cljs.core.str("\n"), cljs.core.str(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([null], 0)))].join(""));
};
cljs.core.async.take_BANG_ = function() {
  var a = null, b = function(b, c) {
    return a.cljs$core$IFn$_invoke$arity$3(b, c, !0)
  }, c = function(a, b, c) {
    a = cljs.core.async.impl.protocols.take_BANG_(a, cljs.core.async.fn_handler(b));
    if(cljs.core.truth_(a)) {
      var g = cljs.core.deref(a);
      cljs.core.truth_(c) ? b.cljs$core$IFn$_invoke$arity$1 ? b.cljs$core$IFn$_invoke$arity$1(g) : b.call(null, g) : cljs.core.async.impl.dispatch.run(function() {
        return b.cljs$core$IFn$_invoke$arity$1 ? b.cljs$core$IFn$_invoke$arity$1(g) : b.call(null, g)
      })
    }
    return null
  }, a = function(a, e, f) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, e);
      case 3:
        return c.call(this, a, e, f)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$3 = c;
  return a
}();
cljs.core.async.nop = function() {
  return null
};
cljs.core.async._GT__BANG_ = function() {
  throw Error([cljs.core.str("Assert failed: "), cljs.core.str(">! used not in (go ...) block"), cljs.core.str("\n"), cljs.core.str(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([null], 0)))].join(""));
};
cljs.core.async.put_BANG_ = function() {
  var a = null, b = function(b, c) {
    return a.cljs$core$IFn$_invoke$arity$3(b, c, cljs.core.async.nop)
  }, c = function(b, c, d) {
    return a.cljs$core$IFn$_invoke$arity$4(b, c, d, !0)
  }, d = function(a, b, c, d) {
    a = cljs.core.async.impl.protocols.put_BANG_(a, b, cljs.core.async.fn_handler(c));
    cljs.core.truth_(cljs.core.truth_(a) ? cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(c, cljs.core.async.nop) : a) && (cljs.core.truth_(d) ? c.cljs$core$IFn$_invoke$arity$0 ? c.cljs$core$IFn$_invoke$arity$0() : c.call(null) : cljs.core.async.impl.dispatch.run(c));
    return null
  }, a = function(a, f, g, h) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, f);
      case 3:
        return c.call(this, a, f, g);
      case 4:
        return d.call(this, a, f, g, h)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$3 = c;
  a.cljs$core$IFn$_invoke$arity$4 = d;
  return a
}();
cljs.core.async.close_BANG_ = function(a) {
  return cljs.core.async.impl.protocols.close_BANG_(a)
};
cljs.core.async.random_array = function(a) {
  for(var b = Array(a), c = 0;;) {
    if(c < a) {
      b[c] = 0, c += 1
    }else {
      break
    }
  }
  for(c = 1;;) {
    if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(c, a)) {
      return b
    }
    var d = cljs.core.rand_int(c);
    b[c] = b[d];
    b[d] = c;
    c += 1
  }
};
cljs.core.async.alt_flag = function alt_flag() {
  var b = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(!0);
  void 0 === cljs.core.async.t9166 && (cljs.core.async.t9166 = {}, cljs.core.async.t9166 = function(b, d, e) {
    this.flag = b;
    this.alt_flag = d;
    this.meta9167 = e;
    this.cljs$lang$protocol_mask$partition1$ = 0;
    this.cljs$lang$protocol_mask$partition0$ = 393216
  }, cljs.core.async.t9166.cljs$lang$type = !0, cljs.core.async.t9166.cljs$lang$ctorStr = "cljs.core.async/t9166", cljs.core.async.t9166.cljs$lang$ctorPrWriter = function(b, d) {
    return cljs.core._write(d, "cljs.core.async/t9166")
  }, cljs.core.async.t9166.prototype.cljs$core$async$impl$protocols$Handler$ = !0, cljs.core.async.t9166.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = function() {
    return cljs.core.deref(this.flag)
  }, cljs.core.async.t9166.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = function() {
    cljs.core.reset_BANG_(this.flag, null);
    return!0
  }, cljs.core.async.t9166.prototype.cljs$core$IMeta$_meta$arity$1 = function() {
    return this.meta9167
  }, cljs.core.async.t9166.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(b, d) {
    return new cljs.core.async.t9166(this.flag, this.alt_flag, d)
  }, cljs.core.async.__GT_t9166 = function(b, d, e) {
    return new cljs.core.async.t9166(b, d, e)
  });
  return new cljs.core.async.t9166(b, alt_flag, null)
};
cljs.core.async.alt_handler = function alt_handler(b, c) {
  void 0 === cljs.core.async.t9172 && (cljs.core.async.t9172 = {}, cljs.core.async.t9172 = function(b, c, f, g) {
    this.cb = b;
    this.flag = c;
    this.alt_handler = f;
    this.meta9173 = g;
    this.cljs$lang$protocol_mask$partition1$ = 0;
    this.cljs$lang$protocol_mask$partition0$ = 393216
  }, cljs.core.async.t9172.cljs$lang$type = !0, cljs.core.async.t9172.cljs$lang$ctorStr = "cljs.core.async/t9172", cljs.core.async.t9172.cljs$lang$ctorPrWriter = function(b, c) {
    return cljs.core._write(c, "cljs.core.async/t9172")
  }, cljs.core.async.t9172.prototype.cljs$core$async$impl$protocols$Handler$ = !0, cljs.core.async.t9172.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = function() {
    return cljs.core.async.impl.protocols.active_QMARK_(this.flag)
  }, cljs.core.async.t9172.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = function() {
    cljs.core.async.impl.protocols.commit(this.flag);
    return this.cb
  }, cljs.core.async.t9172.prototype.cljs$core$IMeta$_meta$arity$1 = function() {
    return this.meta9173
  }, cljs.core.async.t9172.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(b, c) {
    return new cljs.core.async.t9172(this.cb, this.flag, this.alt_handler, c)
  }, cljs.core.async.__GT_t9172 = function(b, c, f, g) {
    return new cljs.core.async.t9172(b, c, f, g)
  });
  return new cljs.core.async.t9172(c, b, alt_handler, null)
};
cljs.core.async.do_alts = function(a, b, c) {
  var d = cljs.core.async.alt_flag(), e = cljs.core.count(b), f = cljs.core.async.random_array(e), g = (new cljs.core.Keyword("\ufdd0:priority")).call(null, c);
  a: {
    for(var h = 0;;) {
      if(h < e) {
        var i = cljs.core.truth_(g) ? h : f[h], j = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(b, i), k = cljs.core.vector_QMARK_(j) ? j.cljs$core$IFn$_invoke$arity$1 ? j.cljs$core$IFn$_invoke$arity$1(0) : j.call(null, 0) : null, m = cljs.core.truth_(k) ? function() {
          var b = j.cljs$core$IFn$_invoke$arity$1 ? j.cljs$core$IFn$_invoke$arity$1(1) : j.call(null, 1);
          return cljs.core.async.impl.protocols.put_BANG_(k, b, cljs.core.async.alt_handler(d, function(b, c, d, e, f) {
            return function() {
              return a.cljs$core$IFn$_invoke$arity$1 ? a.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentVector.fromArray([null, f], !0)) : a.call(null, cljs.core.PersistentVector.fromArray([null, f], !0))
            }
          }(h, b, i, j, k, d, e, f, g)))
        }() : cljs.core.async.impl.protocols.take_BANG_(j, cljs.core.async.alt_handler(d, function(b, c, d) {
          return function(b) {
            return a.cljs$core$IFn$_invoke$arity$1 ? a.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentVector.fromArray([b, d], !0)) : a.call(null, cljs.core.PersistentVector.fromArray([b, d], !0))
          }
        }(h, i, j, k, d, e, f, g)));
        if(cljs.core.truth_(m)) {
          b = cljs.core.async.impl.channels.box(cljs.core.PersistentVector.fromArray([cljs.core.deref(m), function() {
            var a = k;
            return cljs.core.truth_(a) ? a : j
          }()], !0));
          break a
        }else {
          h += 1
        }
      }else {
        b = null;
        break a
      }
    }
    b = void 0
  }
  return cljs.core.truth_(b) ? b : cljs.core.contains_QMARK_(c, "\ufdd0:default") ? (b = cljs.core.async.impl.protocols.active_QMARK_(d), b = cljs.core.truth_(b) ? cljs.core.async.impl.protocols.commit(d) : b, cljs.core.truth_(b) ? cljs.core.async.impl.channels.box(cljs.core.PersistentVector.fromArray([(new cljs.core.Keyword("\ufdd0:default")).call(null, c), "\ufdd0:default"], !0)) : null) : null
};
cljs.core.async.alts_BANG_ = function() {
  var a = function(a, b) {
    cljs.core.seq_QMARK_(b) && cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map, b);
    throw Error([cljs.core.str("Assert failed: "), cljs.core.str("alts! used not in (go ...) block"), cljs.core.str("\n"), cljs.core.str(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([null], 0)))].join(""));
  }, b = function(b, d) {
    var e = null;
    1 < arguments.length && (e = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0));
    return a.call(this, b, e)
  };
  b.cljs$lang$maxFixedArity = 1;
  b.cljs$lang$applyTo = function(b) {
    var d = cljs.core.first(b), b = cljs.core.rest(b);
    return a(d, b)
  };
  b.cljs$core$IFn$_invoke$arity$variadic = a;
  return b
}();
cljs.reader = {};
cljs.reader.PushbackReader = {};
cljs.reader.read_char = function(a) {
  var b;
  b = a ? a.cljs$reader$PushbackReader$read_char$arity$1 : a;
  if(b) {
    return a.cljs$reader$PushbackReader$read_char$arity$1(a)
  }
  b = cljs.reader.read_char[goog.typeOf(null == a ? null : a)];
  if(!b && (b = cljs.reader.read_char._, !b)) {
    throw cljs.core.missing_protocol("PushbackReader.read-char", a);
  }
  return b.call(null, a)
};
cljs.reader.unread = function(a, b) {
  var c;
  c = a ? a.cljs$reader$PushbackReader$unread$arity$2 : a;
  if(c) {
    return a.cljs$reader$PushbackReader$unread$arity$2(a, b)
  }
  c = cljs.reader.unread[goog.typeOf(null == a ? null : a)];
  if(!c && (c = cljs.reader.unread._, !c)) {
    throw cljs.core.missing_protocol("PushbackReader.unread", a);
  }
  return c.call(null, a, b)
};
cljs.reader.StringPushbackReader = function(a, b, c) {
  this.s = a;
  this.index_atom = b;
  this.buffer_atom = c
};
cljs.reader.StringPushbackReader.cljs$lang$type = !0;
cljs.reader.StringPushbackReader.cljs$lang$ctorStr = "cljs.reader/StringPushbackReader";
cljs.reader.StringPushbackReader.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write(b, "cljs.reader/StringPushbackReader")
};
cljs.reader.StringPushbackReader.prototype.cljs$reader$PushbackReader$ = !0;
cljs.reader.StringPushbackReader.prototype.cljs$reader$PushbackReader$read_char$arity$1 = function() {
  if(cljs.core.empty_QMARK_(cljs.core.deref(this.buffer_atom))) {
    var a = cljs.core.deref(this.index_atom);
    cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(this.index_atom, cljs.core.inc);
    return this.s[a]
  }
  a = cljs.core.deref(this.buffer_atom);
  cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(this.buffer_atom, cljs.core.rest);
  return cljs.core.first(a)
};
cljs.reader.StringPushbackReader.prototype.cljs$reader$PushbackReader$unread$arity$2 = function(a, b) {
  return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(this.buffer_atom, function(a) {
    return cljs.core.cons(b, a)
  })
};
cljs.reader.__GT_StringPushbackReader = function(a, b, c) {
  return new cljs.reader.StringPushbackReader(a, b, c)
};
cljs.reader.push_back_reader = function(a) {
  return new cljs.reader.StringPushbackReader(a, cljs.core.atom.cljs$core$IFn$_invoke$arity$1(0), cljs.core.atom.cljs$core$IFn$_invoke$arity$1(null))
};
cljs.reader.whitespace_QMARK_ = function(a) {
  var b = goog.string.isBreakingWhitespace(a);
  return cljs.core.truth_(b) ? b : "," === a
};
cljs.reader.numeric_QMARK_ = function(a) {
  return goog.string.isNumeric(a)
};
cljs.reader.comment_prefix_QMARK_ = function(a) {
  return";" === a
};
cljs.reader.number_literal_QMARK_ = function(a, b) {
  var c = cljs.reader.numeric_QMARK_(b);
  if(c) {
    return c
  }
  c = (c = "+" === b) ? c : "-" === b;
  return cljs.core.truth_(c) ? cljs.reader.numeric_QMARK_(function() {
    var b = cljs.reader.read_char(a);
    cljs.reader.unread(a, b);
    return b
  }()) : c
};
cljs.reader.reader_error = function() {
  var a = function(a, b) {
    throw Error(cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.str, b));
  }, b = function(b, d) {
    var e = null;
    1 < arguments.length && (e = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0));
    return a.call(this, b, e)
  };
  b.cljs$lang$maxFixedArity = 1;
  b.cljs$lang$applyTo = function(b) {
    var d = cljs.core.first(b), b = cljs.core.rest(b);
    return a(d, b)
  };
  b.cljs$core$IFn$_invoke$arity$variadic = a;
  return b
}();
cljs.reader.macro_terminating_QMARK_ = function(a) {
  var b = "#" !== a;
  return b && (b = "'" !== a) ? (b = ":" !== a) ? cljs.reader.macros.cljs$core$IFn$_invoke$arity$1 ? cljs.reader.macros.cljs$core$IFn$_invoke$arity$1(a) : cljs.reader.macros.call(null, a) : b : b
};
cljs.reader.read_token = function(a, b) {
  for(var c = new goog.string.StringBuffer(b), d = cljs.reader.read_char(a);;) {
    var e;
    e = null == d;
    e || (e = (e = cljs.reader.whitespace_QMARK_(d)) ? e : cljs.reader.macro_terminating_QMARK_(d));
    if(e) {
      return cljs.reader.unread(a, d), c.toString()
    }
    c.append(d);
    d = cljs.reader.read_char(a)
  }
};
cljs.reader.skip_line = function(a) {
  for(;;) {
    var b = cljs.reader.read_char(a);
    var c = "n" === b;
    b = c ? c : (c = "r" === b) ? c : null == b;
    if(b) {
      return a
    }
  }
};
cljs.reader.int_pattern = cljs.core.re_pattern("([-+]?)(?:(0)|([1-9][0-9]*)|0[xX]([0-9A-Fa-f]+)|0([0-7]+)|([1-9][0-9]?)[rR]([0-9A-Za-z]+)|0[0-9]+)(N)?");
cljs.reader.ratio_pattern = cljs.core.re_pattern("([-+]?[0-9]+)/([0-9]+)");
cljs.reader.float_pattern = cljs.core.re_pattern("([-+]?[0-9]+(\\.[0-9]*)?([eE][-+]?[0-9]+)?)(M)?");
cljs.reader.symbol_pattern = cljs.core.re_pattern("[:]?([^0-9/].*/)?([^0-9/][^/]*)");
cljs.reader.re_find_STAR_ = function(a, b) {
  var c = a.exec(b);
  return null == c ? null : 1 === c.length ? c[0] : c
};
cljs.reader.match_int = function(a) {
  var a = cljs.reader.re_find_STAR_(cljs.reader.int_pattern, a), b = a[2];
  var c = null == b, b = c ? c : 1 > b.length;
  return b ? (b = "-" === a[1] ? -1 : 1, c = cljs.core.truth_(a[3]) ? [a[3], 10] : cljs.core.truth_(a[4]) ? [a[4], 16] : cljs.core.truth_(a[5]) ? [a[5], 8] : cljs.core.truth_(a[7]) ? [a[7], parseInt(a[7])] : [null, null], a = c[0], c = c[1], null == a ? null : b * parseInt(a, c)) : 0
};
cljs.reader.match_ratio = function(a) {
  var a = cljs.reader.re_find_STAR_(cljs.reader.ratio_pattern, a), b = a[2];
  return parseInt(a[1]) / parseInt(b)
};
cljs.reader.match_float = function(a) {
  return parseFloat(a)
};
cljs.reader.re_matches_STAR_ = function(a, b) {
  var c = a.exec(b), d;
  d = (d = null != c) ? c[0] === b : d;
  return d ? 1 === c.length ? c[0] : c : null
};
cljs.reader.match_number = function(a) {
  return cljs.core.truth_(cljs.reader.re_matches_STAR_(cljs.reader.int_pattern, a)) ? cljs.reader.match_int(a) : cljs.core.truth_(cljs.reader.re_matches_STAR_(cljs.reader.ratio_pattern, a)) ? cljs.reader.match_ratio(a) : cljs.core.truth_(cljs.reader.re_matches_STAR_(cljs.reader.float_pattern, a)) ? cljs.reader.match_float(a) : null
};
cljs.reader.escape_char_map = function(a) {
  return"t" === a ? "\t" : "r" === a ? "\r" : "n" === a ? "\n" : "\\" === a ? "\\" : '"' === a ? '"' : "b" === a ? "\b" : "f" === a ? "\f" : null
};
cljs.reader.read_2_chars = function(a) {
  return(new goog.string.StringBuffer(cljs.reader.read_char(a), cljs.reader.read_char(a))).toString()
};
cljs.reader.read_4_chars = function(a) {
  return(new goog.string.StringBuffer(cljs.reader.read_char(a), cljs.reader.read_char(a), cljs.reader.read_char(a), cljs.reader.read_char(a))).toString()
};
cljs.reader.unicode_2_pattern = cljs.core.re_pattern("[0-9A-Fa-f]{2}");
cljs.reader.unicode_4_pattern = cljs.core.re_pattern("[0-9A-Fa-f]{4}");
cljs.reader.validate_unicode_escape = function(a, b, c, d) {
  return cljs.core.truth_(cljs.core.re_matches(a, d)) ? d : cljs.reader.reader_error.cljs$core$IFn$_invoke$arity$variadic(b, cljs.core.array_seq(["Unexpected unicode escape \\", c, d], 0))
};
cljs.reader.make_unicode_char = function(a) {
  a = parseInt(a, 16);
  return String.fromCharCode(a)
};
cljs.reader.escape_char = function(a, b) {
  var c = cljs.reader.read_char(b), d = cljs.reader.escape_char_map(c);
  return cljs.core.truth_(d) ? d : "x" === c ? cljs.reader.make_unicode_char(cljs.reader.validate_unicode_escape(cljs.reader.unicode_2_pattern, b, c, cljs.reader.read_2_chars(b))) : "u" === c ? cljs.reader.make_unicode_char(cljs.reader.validate_unicode_escape(cljs.reader.unicode_4_pattern, b, c, cljs.reader.read_4_chars(b))) : cljs.reader.numeric_QMARK_(c) ? String.fromCharCode(c) : cljs.reader.reader_error.cljs$core$IFn$_invoke$arity$variadic(b, cljs.core.array_seq(["Unexpected unicode escape \\", 
  c], 0))
};
cljs.reader.read_past = function(a, b) {
  for(var c = cljs.reader.read_char(b);;) {
    if(cljs.core.truth_(a.cljs$core$IFn$_invoke$arity$1 ? a.cljs$core$IFn$_invoke$arity$1(c) : a.call(null, c))) {
      c = cljs.reader.read_char(b)
    }else {
      return c
    }
  }
};
cljs.reader.read_delimited_list = function(a, b, c) {
  for(var d = cljs.core.transient$(cljs.core.PersistentVector.EMPTY);;) {
    var e = cljs.reader.read_past(cljs.reader.whitespace_QMARK_, b);
    cljs.core.truth_(e) || cljs.reader.reader_error.cljs$core$IFn$_invoke$arity$variadic(b, cljs.core.array_seq(["EOF while reading"], 0));
    if(a === e) {
      return cljs.core.persistent_BANG_(d)
    }
    var f = cljs.reader.macros.cljs$core$IFn$_invoke$arity$1 ? cljs.reader.macros.cljs$core$IFn$_invoke$arity$1(e) : cljs.reader.macros.call(null, e);
    cljs.core.truth_(f) ? e = f.cljs$core$IFn$_invoke$arity$2 ? f.cljs$core$IFn$_invoke$arity$2(b, e) : f.call(null, b, e) : (cljs.reader.unread(b, e), e = cljs.reader.read.cljs$core$IFn$_invoke$arity$4 ? cljs.reader.read.cljs$core$IFn$_invoke$arity$4(b, !0, null, c) : cljs.reader.read.call(null, b, !0, null, c));
    d = e === b ? d : cljs.core.conj_BANG_(d, e)
  }
};
cljs.reader.not_implemented = function(a, b) {
  return cljs.reader.reader_error.cljs$core$IFn$_invoke$arity$variadic(a, cljs.core.array_seq(["Reader for ", b, " not implemented yet"], 0))
};
cljs.reader.read_dispatch = function(a, b) {
  var c = cljs.reader.read_char(a), d = cljs.reader.dispatch_macros.cljs$core$IFn$_invoke$arity$1 ? cljs.reader.dispatch_macros.cljs$core$IFn$_invoke$arity$1(c) : cljs.reader.dispatch_macros.call(null, c);
  if(cljs.core.truth_(d)) {
    return d.cljs$core$IFn$_invoke$arity$2 ? d.cljs$core$IFn$_invoke$arity$2(a, b) : d.call(null, a, b)
  }
  d = cljs.reader.maybe_read_tagged_type.cljs$core$IFn$_invoke$arity$2 ? cljs.reader.maybe_read_tagged_type.cljs$core$IFn$_invoke$arity$2(a, c) : cljs.reader.maybe_read_tagged_type.call(null, a, c);
  return cljs.core.truth_(d) ? d : cljs.reader.reader_error.cljs$core$IFn$_invoke$arity$variadic(a, cljs.core.array_seq(["No dispatch macro for ", c], 0))
};
cljs.reader.read_unmatched_delimiter = function(a, b) {
  return cljs.reader.reader_error.cljs$core$IFn$_invoke$arity$variadic(a, cljs.core.array_seq(["Unmached delimiter ", b], 0))
};
cljs.reader.read_list = function(a) {
  return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.list, cljs.reader.read_delimited_list(")", a, !0))
};
cljs.reader.read_comment = cljs.reader.skip_line;
cljs.reader.read_vector = function(a) {
  return cljs.reader.read_delimited_list("]", a, !0)
};
cljs.reader.read_map = function(a) {
  var b = cljs.reader.read_delimited_list("}", a, !0);
  cljs.core.odd_QMARK_(cljs.core.count(b)) && cljs.reader.reader_error.cljs$core$IFn$_invoke$arity$variadic(a, cljs.core.array_seq(["Map literal must contain an even number of forms"], 0));
  return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map, b)
};
cljs.reader.read_number = function(a, b) {
  for(var c = new goog.string.StringBuffer(b), d = cljs.reader.read_char(a);;) {
    if(cljs.core.truth_(function() {
      var a = null == d;
      return a ? a : (a = cljs.reader.whitespace_QMARK_(d)) ? a : cljs.reader.macros.cljs$core$IFn$_invoke$arity$1 ? cljs.reader.macros.cljs$core$IFn$_invoke$arity$1(d) : cljs.reader.macros.call(null, d)
    }())) {
      cljs.reader.unread(a, d);
      var e = c.toString(), c = cljs.reader.match_number(e);
      return cljs.core.truth_(c) ? c : cljs.reader.reader_error.cljs$core$IFn$_invoke$arity$variadic(a, cljs.core.array_seq(["Invalid number format [", e, "]"], 0))
    }
    c.append(d);
    d = e = cljs.reader.read_char(a)
  }
};
cljs.reader.read_string_STAR_ = function(a) {
  for(var b = new goog.string.StringBuffer, c = cljs.reader.read_char(a);;) {
    if(null == c) {
      return cljs.reader.reader_error.cljs$core$IFn$_invoke$arity$variadic(a, cljs.core.array_seq(["EOF while reading"], 0))
    }
    if("\\" === c) {
      b.append(cljs.reader.escape_char(b, a))
    }else {
      if('"' === c) {
        return b.toString()
      }
      b.append(c)
    }
    c = cljs.reader.read_char(a)
  }
};
cljs.reader.special_symbols = function(a, b) {
  return"nil" === a ? null : "true" === a ? !0 : "false" === a ? !1 : b
};
cljs.reader.read_symbol = function(a, b) {
  var c = cljs.reader.read_token(a, b);
  return cljs.core.truth_(goog.string.contains(c, "/")) ? cljs.core.symbol.cljs$core$IFn$_invoke$arity$2(cljs.core.subs.cljs$core$IFn$_invoke$arity$3(c, 0, c.indexOf("/")), cljs.core.subs.cljs$core$IFn$_invoke$arity$3(c, c.indexOf("/") + 1, c.length)) : cljs.reader.special_symbols(c, cljs.core.symbol.cljs$core$IFn$_invoke$arity$1(c))
};
cljs.reader.read_keyword = function(a) {
  var b = cljs.reader.read_token(a, cljs.reader.read_char(a)), b = cljs.reader.re_matches_STAR_(cljs.reader.symbol_pattern, b), c = b[0], d = b[1], e = b[2];
  if(cljs.core.truth_(function() {
    var a;
    a = (a = void 0 !== d) ? ":/" === d.substring(d.length - 2, d.length) : a;
    return cljs.core.truth_(a) ? a : (a = ":" === e[e.length - 1]) ? a : -1 !== c.indexOf("::", 1)
  }())) {
    return cljs.reader.reader_error.cljs$core$IFn$_invoke$arity$variadic(a, cljs.core.array_seq(["Invalid token: ", c], 0))
  }
  a = (a = null != d) ? 0 < d.length : a;
  return a ? cljs.core.keyword.cljs$core$IFn$_invoke$arity$2(d.substring(0, d.indexOf("/")), e) : cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(c)
};
cljs.reader.desugar_meta = function(a) {
  return a instanceof cljs.core.Symbol ? cljs.core.PersistentArrayMap.fromArray(["\ufdd0:tag", a], !0) : cljs.core.string_QMARK_(a) ? cljs.core.PersistentArrayMap.fromArray(["\ufdd0:tag", a], !0) : cljs.core.keyword_QMARK_(a) ? cljs.core.PersistentArrayMap.fromArray([a, !0], !0) : a
};
cljs.reader.wrapping_reader = function(a) {
  return function(b) {
    return cljs.core.list.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([a, cljs.reader.read.cljs$core$IFn$_invoke$arity$4 ? cljs.reader.read.cljs$core$IFn$_invoke$arity$4(b, !0, null, !0) : cljs.reader.read.call(null, b, !0, null, !0)], 0))
  }
};
cljs.reader.throwing_reader = function(a) {
  return function(b) {
    return cljs.reader.reader_error.cljs$core$IFn$_invoke$arity$variadic(b, cljs.core.array_seq([a], 0))
  }
};
cljs.reader.read_meta = function(a) {
  var b = cljs.reader.desugar_meta(cljs.reader.read.cljs$core$IFn$_invoke$arity$4 ? cljs.reader.read.cljs$core$IFn$_invoke$arity$4(a, !0, null, !0) : cljs.reader.read.call(null, a, !0, null, !0));
  cljs.core.map_QMARK_(b) || cljs.reader.reader_error.cljs$core$IFn$_invoke$arity$variadic(a, cljs.core.array_seq(["Metadata must be Symbol,Keyword,String or Map"], 0));
  var c = cljs.reader.read.cljs$core$IFn$_invoke$arity$4 ? cljs.reader.read.cljs$core$IFn$_invoke$arity$4(a, !0, null, !0) : cljs.reader.read.call(null, a, !0, null, !0), d;
  c ? (d = (d = c.cljs$lang$protocol_mask$partition0$ & 262144) ? d : c.cljs$core$IWithMeta$, d = d ? !0 : c.cljs$lang$protocol_mask$partition0$ ? !1 : cljs.core.type_satisfies_(cljs.core.IWithMeta, c)) : d = cljs.core.type_satisfies_(cljs.core.IWithMeta, c);
  return d ? cljs.core.with_meta(c, cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.meta(c), b], 0))) : cljs.reader.reader_error.cljs$core$IFn$_invoke$arity$variadic(a, cljs.core.array_seq(["Metadata can only be applied to IWithMetas"], 0))
};
cljs.reader.read_set = function(a) {
  return cljs.core.set(cljs.reader.read_delimited_list("}", a, !0))
};
cljs.reader.read_regex = function(a, b) {
  return cljs.core.re_pattern(cljs.reader.read_string_STAR_(a, b))
};
cljs.reader.read_discard = function(a) {
  cljs.reader.read.cljs$core$IFn$_invoke$arity$4 ? cljs.reader.read.cljs$core$IFn$_invoke$arity$4(a, !0, null, !0) : cljs.reader.read.call(null, a, !0, null, !0);
  return a
};
cljs.reader.macros = function(a) {
  return'"' === a ? cljs.reader.read_string_STAR_ : ":" === a ? cljs.reader.read_keyword : ";" === a ? cljs.reader.not_implemented : "'" === a ? cljs.reader.wrapping_reader(new cljs.core.Symbol(null, "quote", "quote", -1532577739, null)) : "@" === a ? cljs.reader.wrapping_reader(new cljs.core.Symbol(null, "deref", "deref", -1545057749, null)) : "^" === a ? cljs.reader.read_meta : "`" === a ? cljs.reader.not_implemented : "~" === a ? cljs.reader.not_implemented : "(" === a ? cljs.reader.read_list : 
  ")" === a ? cljs.reader.read_unmatched_delimiter : "[" === a ? cljs.reader.read_vector : "]" === a ? cljs.reader.read_unmatched_delimiter : "{" === a ? cljs.reader.read_map : "}" === a ? cljs.reader.read_unmatched_delimiter : "\\" === a ? cljs.reader.read_char : "%" === a ? cljs.reader.not_implemented : "#" === a ? cljs.reader.read_dispatch : null
};
cljs.reader.dispatch_macros = function(a) {
  return"{" === a ? cljs.reader.read_set : "<" === a ? cljs.reader.throwing_reader("Unreadable form") : '"' === a ? cljs.reader.read_regex : "!" === a ? cljs.reader.read_comment : "_" === a ? cljs.reader.read_discard : null
};
cljs.reader.read = function(a, b, c) {
  for(;;) {
    var d = cljs.reader.read_char(a);
    if(null == d) {
      return cljs.core.truth_(b) ? cljs.reader.reader_error.cljs$core$IFn$_invoke$arity$variadic(a, cljs.core.array_seq(["EOF while reading"], 0)) : c
    }
    if(!cljs.reader.whitespace_QMARK_(d)) {
      if(cljs.reader.comment_prefix_QMARK_(d)) {
        a = cljs.reader.read_comment.cljs$core$IFn$_invoke$arity$2 ? cljs.reader.read_comment.cljs$core$IFn$_invoke$arity$2(a, d) : cljs.reader.read_comment.call(null, a, d)
      }else {
        var e = cljs.reader.macros(d), d = cljs.core.truth_(e) ? e.cljs$core$IFn$_invoke$arity$2 ? e.cljs$core$IFn$_invoke$arity$2(a, d) : e.call(null, a, d) : cljs.reader.number_literal_QMARK_(a, d) ? cljs.reader.read_number(a, d) : cljs.reader.read_symbol(a, d);
        if(d !== a) {
          return d
        }
      }
    }
  }
};
cljs.reader.read_string = function(a) {
  a = cljs.reader.push_back_reader(a);
  return cljs.reader.read(a, !0, null, !1)
};
cljs.reader.zero_fill_right = function(a, b) {
  if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(b, cljs.core.count(a))) {
    return a
  }
  if(b < cljs.core.count(a)) {
    return a.substring(0, b)
  }
  for(var c = new goog.string.StringBuffer(a);;) {
    if(c.getLength() < b) {
      c = c.append("0")
    }else {
      return c.toString()
    }
  }
};
cljs.reader.divisible_QMARK_ = function(a, b) {
  return 0 === cljs.core.mod(a, b)
};
cljs.reader.indivisible_QMARK_ = function(a, b) {
  return cljs.core.not(cljs.reader.divisible_QMARK_(a, b))
};
cljs.reader.leap_year_QMARK_ = function(a) {
  var b = cljs.reader.divisible_QMARK_(a, 4);
  return cljs.core.truth_(b) ? (b = cljs.reader.indivisible_QMARK_(a, 100), cljs.core.truth_(b) ? b : cljs.reader.divisible_QMARK_(a, 400)) : b
};
cljs.reader.days_in_month = function() {
  var a = cljs.core.PersistentVector.fromArray([null, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], !0), b = cljs.core.PersistentVector.fromArray([null, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], !0);
  return function(c, d) {
    return cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.truth_(d) ? b : a, c)
  }
}();
cljs.reader.parse_and_validate_timestamp = function() {
  var a = /(\d\d\d\d)(?:-(\d\d)(?:-(\d\d)(?:[T](\d\d)(?::(\d\d)(?::(\d\d)(?:[.](\d+))?)?)?)?)?)?(?:[Z]|([-+])(\d\d):(\d\d))?/, b = function(a, b, e, f) {
    var g = a <= b;
    if(!(g ? b <= e : g)) {
      throw Error([cljs.core.str("Assert failed: "), cljs.core.str([cljs.core.str(f), cljs.core.str(" Failed:  "), cljs.core.str(a), cljs.core.str("<="), cljs.core.str(b), cljs.core.str("<="), cljs.core.str(e)].join("")), cljs.core.str("\n"), cljs.core.str(cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.list(new cljs.core.Symbol(null, "<=", "<=", -1640529606, null), new cljs.core.Symbol(null, "low", "low", -1640424179, null), new cljs.core.Symbol(null, "n", "n", 
      -1640531417, null), new cljs.core.Symbol(null, "high", "high", -1637329061, null))], 0)))].join(""));
    }
    return b
  };
  return function(c) {
    var d = cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.vec, cljs.core.split_at(8, cljs.core.re_matches(a, c)));
    if(cljs.core.truth_(d)) {
      var e = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(d, 0, null);
      cljs.core.nth.cljs$core$IFn$_invoke$arity$3(e, 0, null);
      var c = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(e, 1, null), f = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(e, 2, null), g = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(e, 3, null), h = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(e, 4, null), i = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(e, 5, null), j = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(e, 6, null), e = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(e, 7, null), k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(d, 1, null);
      cljs.core.nth.cljs$core$IFn$_invoke$arity$3(k, 0, null);
      cljs.core.nth.cljs$core$IFn$_invoke$arity$3(k, 1, null);
      cljs.core.nth.cljs$core$IFn$_invoke$arity$3(k, 2, null);
      var m = cljs.core.map.cljs$core$IFn$_invoke$arity$2(function(a) {
        return cljs.core.map.cljs$core$IFn$_invoke$arity$2(function(a) {
          return parseInt(a, 10)
        }, a)
      }, cljs.core.map.cljs$core$IFn$_invoke$arity$3(function(a, b) {
        return cljs.core.update_in.cljs$core$IFn$_invoke$arity$3(b, cljs.core.PersistentVector.fromArray([0], !0), a)
      }, cljs.core.PersistentVector.fromArray([cljs.core.constantly(null), function(a) {
        return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(a, "-") ? "-1" : "1"
      }], !0), d)), l = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(m, 0, null);
      cljs.core.nth.cljs$core$IFn$_invoke$arity$3(l, 0, null);
      var d = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(l, 1, null), k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(l, 2, null), n = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(l, 3, null), p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(l, 4, null), q = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(l, 5, null), r = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(l, 6, null), l = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(l, 7, null), s = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(m, 1, null), m = 
      cljs.core.nth.cljs$core$IFn$_invoke$arity$3(s, 0, null), u = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(s, 1, null), s = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(s, 2, null);
      return cljs.core.PersistentVector.fromArray([cljs.core.not(c) ? 1970 : d, cljs.core.not(f) ? 1 : b(1, k, 12, "timestamp month field must be in range 1..12"), cljs.core.not(g) ? 1 : b(1, n, cljs.reader.days_in_month.cljs$core$IFn$_invoke$arity$2 ? cljs.reader.days_in_month.cljs$core$IFn$_invoke$arity$2(k, cljs.reader.leap_year_QMARK_(d)) : cljs.reader.days_in_month.call(null, k, cljs.reader.leap_year_QMARK_(d)), "timestamp day field must be in range 1..last day in month"), cljs.core.not(h) ? 
      0 : b(0, p, 23, "timestamp hour field must be in range 0..23"), cljs.core.not(i) ? 0 : b(0, q, 59, "timestamp minute field must be in range 0..59"), cljs.core.not(j) ? 0 : b(0, r, cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(q, 59) ? 60 : 59, "timestamp second field must be in range 0..60"), cljs.core.not(e) ? 0 : b(0, l, 999, "timestamp millisecond field must be in range 0..999"), m * (60 * u + s)], !0)
    }
    return null
  }
}();
cljs.reader.parse_timestamp = function(a) {
  var b = cljs.reader.parse_and_validate_timestamp.cljs$core$IFn$_invoke$arity$1 ? cljs.reader.parse_and_validate_timestamp.cljs$core$IFn$_invoke$arity$1(a) : cljs.reader.parse_and_validate_timestamp.call(null, a);
  if(cljs.core.truth_(b)) {
    var a = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(b, 0, null), c = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(b, 1, null), d = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(b, 2, null), e = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(b, 3, null), f = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(b, 4, null), g = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(b, 5, null), h = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(b, 6, null), b = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(b, 7, null);
    return new Date(Date.UTC(a, c - 1, d, e, f, g, h) - 6E4 * b)
  }
  return cljs.reader.reader_error.cljs$core$IFn$_invoke$arity$variadic(null, cljs.core.array_seq([[cljs.core.str("Unrecognized date/time syntax: "), cljs.core.str(a)].join("")], 0))
};
cljs.reader.read_date = function(a) {
  return cljs.core.string_QMARK_(a) ? cljs.reader.parse_timestamp(a) : cljs.reader.reader_error.cljs$core$IFn$_invoke$arity$variadic(null, cljs.core.array_seq(["Instance literal expects a string for its timestamp."], 0))
};
cljs.reader.read_queue = function(a) {
  return cljs.core.vector_QMARK_(a) ? cljs.core.into(cljs.core.PersistentQueue.EMPTY, a) : cljs.reader.reader_error.cljs$core$IFn$_invoke$arity$variadic(null, cljs.core.array_seq(["Queue literal expects a vector for its elements."], 0))
};
cljs.reader.read_uuid = function(a) {
  return cljs.core.string_QMARK_(a) ? new cljs.core.UUID(a) : cljs.reader.reader_error.cljs$core$IFn$_invoke$arity$variadic(null, cljs.core.array_seq(["UUID literal expects a string as its representation."], 0))
};
cljs.reader._STAR_tag_table_STAR_ = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.fromArray(["inst", cljs.reader.read_date, "uuid", cljs.reader.read_uuid, "queue", cljs.reader.read_queue], !0));
cljs.reader._STAR_default_data_reader_fn_STAR_ = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(null);
cljs.reader.maybe_read_tagged_type = function(a, b) {
  var c = cljs.reader.read_symbol(a, b), d = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(cljs.reader._STAR_tag_table_STAR_), "" + cljs.core.str(c)), e = cljs.core.deref(cljs.reader._STAR_default_data_reader_fn_STAR_);
  return cljs.core.truth_(d) ? d.cljs$core$IFn$_invoke$arity$1 ? d.cljs$core$IFn$_invoke$arity$1(cljs.reader.read(a, !0, null, !1)) : d.call(null, cljs.reader.read(a, !0, null, !1)) : cljs.core.truth_(e) ? e.cljs$core$IFn$_invoke$arity$2 ? e.cljs$core$IFn$_invoke$arity$2(c, cljs.reader.read(a, !0, null, !1)) : e.call(null, c, cljs.reader.read(a, !0, null, !1)) : cljs.reader.reader_error.cljs$core$IFn$_invoke$arity$variadic(a, cljs.core.array_seq(["Could not find tag parser for ", "" + cljs.core.str(c), 
  " in ", cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.keys(cljs.core.deref(cljs.reader._STAR_tag_table_STAR_))], 0))], 0))
};
cljs.reader.register_tag_parser_BANG_ = function(a, b) {
  var c = "" + cljs.core.str(a), d = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(cljs.reader._STAR_tag_table_STAR_), c);
  cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(cljs.reader._STAR_tag_table_STAR_, cljs.core.assoc, c, b);
  return d
};
cljs.reader.deregister_tag_parser_BANG_ = function(a) {
  var a = "" + cljs.core.str(a), b = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(cljs.reader._STAR_tag_table_STAR_), a);
  cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(cljs.reader._STAR_tag_table_STAR_, cljs.core.dissoc, a);
  return b
};
cljs.reader.register_default_tag_parser_BANG_ = function(a) {
  var b = cljs.core.deref(cljs.reader._STAR_default_data_reader_fn_STAR_);
  cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(cljs.reader._STAR_default_data_reader_fn_STAR_, function() {
    return a
  });
  return b
};
cljs.reader.deregister_default_tag_parser_BANG_ = function() {
  var a = cljs.core.deref(cljs.reader._STAR_default_data_reader_fn_STAR_);
  cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(cljs.reader._STAR_default_data_reader_fn_STAR_, function() {
    return null
  });
  return a
};
jayq.core = {};
jayq.core.crate_meta = function(a) {
  return a.prototype._crateGroup
};
jayq.core.__GT_selector = function(a) {
  if(cljs.core.string_QMARK_(a)) {
    return a
  }
  if(cljs.core.fn_QMARK_(a)) {
    var b = jayq.core.crate_meta(a);
    return cljs.core.truth_(b) ? [cljs.core.str("[crateGroup="), cljs.core.str(b), cljs.core.str("]")].join("") : a
  }
  return cljs.core.keyword_QMARK_(a) ? cljs.core.name(a) : a
};
jayq.core.$ = function() {
  var a = null, b = function(a) {
    return jQuery(jayq.core.__GT_selector(a))
  }, c = function(a, b) {
    return jQuery(jayq.core.__GT_selector(a), b)
  }, a = function(a, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, e)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$2 = c;
  return a
}();
jQuery.prototype.cljs$core$IFn$ = !0;
jQuery.prototype.call = function() {
  var a = null;
  return a = function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return cljs.core._lookup.cljs$core$IFn$_invoke$arity$2(this, c);
      case 3:
        return cljs.core._lookup.cljs$core$IFn$_invoke$arity$3(this, c, d)
    }
    throw Error("Invalid arity: " + arguments.length);
  }
}();
jQuery.prototype.apply = function(a, b) {
  return a.call.apply(a, [a].concat(b.slice()))
};
jQuery.prototype.cljs$core$IReduce$ = !0;
jQuery.prototype.cljs$core$IReduce$_reduce$arity$2 = function(a, b) {
  return cljs.core.ci_reduce.cljs$core$IFn$_invoke$arity$2(a, b)
};
jQuery.prototype.cljs$core$IReduce$_reduce$arity$3 = function(a, b, c) {
  return cljs.core.ci_reduce.cljs$core$IFn$_invoke$arity$3(a, b, c)
};
jQuery.prototype.cljs$core$ILookup$ = !0;
jQuery.prototype.cljs$core$ILookup$_lookup$arity$2 = function(a, b) {
  var c = a.slice(b, b + 1);
  return cljs.core.truth_(c) ? c : null
};
jQuery.prototype.cljs$core$ILookup$_lookup$arity$3 = function(a, b, c) {
  return cljs.core._nth.cljs$core$IFn$_invoke$arity$3(a, b, c)
};
jQuery.prototype.cljs$core$ISequential$ = !0;
jQuery.prototype.cljs$core$IIndexed$ = !0;
jQuery.prototype.cljs$core$IIndexed$_nth$arity$2 = function(a, b) {
  return b < cljs.core.count(a) ? a.slice(b, b + 1) : null
};
jQuery.prototype.cljs$core$IIndexed$_nth$arity$3 = function(a, b, c) {
  return b < cljs.core.count(a) ? a.slice(b, b + 1) : void 0 === c ? null : c
};
jQuery.prototype.cljs$core$ICounted$ = !0;
jQuery.prototype.cljs$core$ICounted$_count$arity$1 = function(a) {
  return a.length
};
jQuery.prototype.cljs$core$ISeq$ = !0;
jQuery.prototype.cljs$core$ISeq$_first$arity$1 = function(a) {
  return a.get(0)
};
jQuery.prototype.cljs$core$ISeq$_rest$arity$1 = function(a) {
  return 1 < cljs.core.count(a) ? a.slice(1) : cljs.core.list()
};
jQuery.prototype.cljs$core$ISeqable$ = !0;
jQuery.prototype.cljs$core$ISeqable$_seq$arity$1 = function(a) {
  return cljs.core.truth_(a.get(0)) ? a : null
};
jayq.core.anim = function(a, b, c) {
  return a.animate(cljs.core.clj__GT_js(b), c)
};
jayq.core.text = function() {
  var a = null, b = function(a) {
    return a.text()
  }, a = function(a, d) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return a.text(d)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$2 = function(a, b) {
    return a.text(b)
  };
  return a
}();
jayq.core.css = function() {
  var a = null, b = function(a, b) {
    return a.css(cljs.core.clj__GT_js(b))
  }, c = function(a, b, c) {
    return a.css(cljs.core.name(b), c)
  }, a = function(a, e, f) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, e);
      case 3:
        return c.call(this, a, e, f)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$3 = c;
  return a
}();
jayq.core.attr = function() {
  var a = null, b = function(a, b) {
    return a.attr(cljs.core.clj__GT_js(b))
  }, c = function(a, b, c) {
    return a.attr(cljs.core.name(b), c)
  }, a = function(a, e, f) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, e);
      case 3:
        return c.call(this, a, e, f)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$3 = c;
  return a
}();
jayq.core.prop = function() {
  var a = null, b = function(a, b) {
    return a.prop(cljs.core.clj__GT_js(b))
  }, c = function(a, b, c) {
    return a.prop(cljs.core.name(b), c)
  }, a = function(a, e, f) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, e);
      case 3:
        return c.call(this, a, e, f)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$3 = c;
  return a
}();
jayq.core.remove_attr = function(a, b) {
  return a.removeAttr(cljs.core.name(b))
};
jayq.core.remove_prop = function(a, b) {
  return a.removeProp(cljs.core.name(b))
};
jayq.core.data = function() {
  var a = null, b = function(a, b) {
    return a.data(cljs.core.clj__GT_js(b))
  }, c = function(a, b, c) {
    return a.data(cljs.core.name(b), c)
  }, a = function(a, e, f) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, e);
      case 3:
        return c.call(this, a, e, f)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$2 = b;
  a.cljs$core$IFn$_invoke$arity$3 = c;
  return a
}();
jayq.core.add_class = function(a, b) {
  return a.addClass(cljs.core.name(b))
};
jayq.core.remove_class = function(a, b) {
  return a.removeClass(cljs.core.name(b))
};
jayq.core.toggle_class = function(a, b) {
  return a.toggleClass(cljs.core.name(b))
};
jayq.core.has_class = function(a, b) {
  return a.hasClass(cljs.core.name(b))
};
jayq.core.is = function(a, b) {
  return a.is(jayq.core.__GT_selector(b))
};
jayq.core.after = function(a, b) {
  return a.after(b)
};
jayq.core.before = function(a, b) {
  return a.before(b)
};
jayq.core.append = function(a, b) {
  return a.append(b)
};
jayq.core.prepend = function(a, b) {
  return a.prepend(b)
};
jayq.core.append_to = function(a, b) {
  return a.appendTo(jayq.core.__GT_selector(b))
};
jayq.core.prepend_to = function(a, b) {
  return a.prependTo(jayq.core.__GT_selector(b))
};
jayq.core.insert_before = function(a, b) {
  return a.insertBefore(jayq.core.__GT_selector(b))
};
jayq.core.insert_after = function(a, b) {
  return a.insertAfter(jayq.core.__GT_selector(b))
};
jayq.core.replace_with = function(a, b) {
  return a.replaceWith(b)
};
jayq.core.remove = function(a) {
  return a.remove()
};
jayq.core.hide = function() {
  var a = function(a, b) {
    var e = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(b, 0, null), f = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(b, 1, null);
    return a.hide(e, f)
  }, b = function(b, d) {
    var e = null;
    1 < arguments.length && (e = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0));
    return a.call(this, b, e)
  };
  b.cljs$lang$maxFixedArity = 1;
  b.cljs$lang$applyTo = function(b) {
    var d = cljs.core.first(b), b = cljs.core.rest(b);
    return a(d, b)
  };
  b.cljs$core$IFn$_invoke$arity$variadic = a;
  return b
}();
jayq.core.show = function() {
  var a = function(a, b) {
    var e = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(b, 0, null), f = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(b, 1, null);
    return a.show(e, f)
  }, b = function(b, d) {
    var e = null;
    1 < arguments.length && (e = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0));
    return a.call(this, b, e)
  };
  b.cljs$lang$maxFixedArity = 1;
  b.cljs$lang$applyTo = function(b) {
    var d = cljs.core.first(b), b = cljs.core.rest(b);
    return a(d, b)
  };
  b.cljs$core$IFn$_invoke$arity$variadic = a;
  return b
}();
jayq.core.toggle = function() {
  var a = function(a, b) {
    var e = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(b, 0, null), f = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(b, 1, null);
    return a.toggle(e, f)
  }, b = function(b, d) {
    var e = null;
    1 < arguments.length && (e = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0));
    return a.call(this, b, e)
  };
  b.cljs$lang$maxFixedArity = 1;
  b.cljs$lang$applyTo = function(b) {
    var d = cljs.core.first(b), b = cljs.core.rest(b);
    return a(d, b)
  };
  b.cljs$core$IFn$_invoke$arity$variadic = a;
  return b
}();
jayq.core.fade_out = function() {
  var a = function(a, b) {
    var e = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(b, 0, null), f = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(b, 1, null);
    return a.fadeOut(e, f)
  }, b = function(b, d) {
    var e = null;
    1 < arguments.length && (e = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0));
    return a.call(this, b, e)
  };
  b.cljs$lang$maxFixedArity = 1;
  b.cljs$lang$applyTo = function(b) {
    var d = cljs.core.first(b), b = cljs.core.rest(b);
    return a(d, b)
  };
  b.cljs$core$IFn$_invoke$arity$variadic = a;
  return b
}();
jayq.core.fade_in = function() {
  var a = function(a, b) {
    var e = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(b, 0, null), f = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(b, 1, null);
    return a.fadeIn(e, f)
  }, b = function(b, d) {
    var e = null;
    1 < arguments.length && (e = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0));
    return a.call(this, b, e)
  };
  b.cljs$lang$maxFixedArity = 1;
  b.cljs$lang$applyTo = function(b) {
    var d = cljs.core.first(b), b = cljs.core.rest(b);
    return a(d, b)
  };
  b.cljs$core$IFn$_invoke$arity$variadic = a;
  return b
}();
jayq.core.slide_up = function() {
  var a = function(a, b) {
    var e = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(b, 0, null), f = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(b, 1, null);
    return a.slideUp(e, f)
  }, b = function(b, d) {
    var e = null;
    1 < arguments.length && (e = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0));
    return a.call(this, b, e)
  };
  b.cljs$lang$maxFixedArity = 1;
  b.cljs$lang$applyTo = function(b) {
    var d = cljs.core.first(b), b = cljs.core.rest(b);
    return a(d, b)
  };
  b.cljs$core$IFn$_invoke$arity$variadic = a;
  return b
}();
jayq.core.slide_down = function() {
  var a = function(a, b) {
    var e = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(b, 0, null), f = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(b, 1, null);
    return a.slideDown(e, f)
  }, b = function(b, d) {
    var e = null;
    1 < arguments.length && (e = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0));
    return a.call(this, b, e)
  };
  b.cljs$lang$maxFixedArity = 1;
  b.cljs$lang$applyTo = function(b) {
    var d = cljs.core.first(b), b = cljs.core.rest(b);
    return a(d, b)
  };
  b.cljs$core$IFn$_invoke$arity$variadic = a;
  return b
}();
jayq.core.siblings = function() {
  var a = null, b = function(a) {
    return a.siblings()
  }, c = function(a, b) {
    return a.siblings(cljs.core.name(b))
  }, a = function(a, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, e)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$2 = c;
  return a
}();
jayq.core.parent = function(a) {
  return a.parent()
};
jayq.core.parents = function() {
  var a = null, b = function(a) {
    return a.parents()
  }, c = function(a, b) {
    return a.parents(cljs.core.name(b))
  }, a = function(a, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, e)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$2 = c;
  return a
}();
jayq.core.parents_until = function() {
  var a = null, b = function(a) {
    return a.parentsUntil()
  }, c = function(a, b) {
    return a.parentsUntil(jayq.core.__GT_selector(b))
  }, d = function(a, b, c) {
    return a.parentsUntil(jayq.core.__GT_selector(b), cljs.core.name(c))
  }, a = function(a, f, g) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, f);
      case 3:
        return d.call(this, a, f, g)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$2 = c;
  a.cljs$core$IFn$_invoke$arity$3 = d;
  return a
}();
jayq.core.children = function() {
  var a = null, b = function(a) {
    return a.children()
  }, c = function(a, b) {
    return a.children(cljs.core.name(b))
  }, a = function(a, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, e)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$2 = c;
  return a
}();
jayq.core.next = function() {
  var a = null, b = function(a) {
    return a.next()
  }, c = function(a, b) {
    return a.next(cljs.core.name(b))
  }, a = function(a, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, e)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$2 = c;
  return a
}();
jayq.core.prev = function() {
  var a = null, b = function(a) {
    return a.prev()
  }, c = function(a, b) {
    return a.prev(cljs.core.name(b))
  }, a = function(a, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, e)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$2 = c;
  return a
}();
jayq.core.next_all = function() {
  var a = null, b = function(a) {
    return a.nextAll()
  }, c = function(a, b) {
    return a.nextAll(cljs.core.name(b))
  }, a = function(a, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, e)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$2 = c;
  return a
}();
jayq.core.prev_all = function() {
  var a = null, b = function(a) {
    return a.prevAll()
  }, c = function(a, b) {
    return a.prevAll(cljs.core.name(b))
  }, a = function(a, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, e)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$2 = c;
  return a
}();
jayq.core.next_until = function() {
  var a = null, b = function(a) {
    return a.nextUntil()
  }, c = function(a, b) {
    return a.nextUntil(jayq.core.__GT_selector(b))
  }, d = function(a, b, c) {
    return a.nextUntil(jayq.core.__GT_selector(b), cljs.core.name(c))
  }, a = function(a, f, g) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, f);
      case 3:
        return d.call(this, a, f, g)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$2 = c;
  a.cljs$core$IFn$_invoke$arity$3 = d;
  return a
}();
jayq.core.prev_until = function() {
  var a = null, b = function(a) {
    return a.prevUntil()
  }, c = function(a, b) {
    return a.prevUntil(jayq.core.__GT_selector(b))
  }, d = function(a, b, c) {
    return a.prevUntil(jayq.core.__GT_selector(b), cljs.core.name(c))
  }, a = function(a, f, g) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, f);
      case 3:
        return d.call(this, a, f, g)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$2 = c;
  a.cljs$core$IFn$_invoke$arity$3 = d;
  return a
}();
jayq.core.find = function(a, b) {
  return a.find(cljs.core.name(b))
};
jayq.core.closest = function() {
  var a = function(a, b, e) {
    e = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(e, 0, null);
    return a.closest(jayq.core.__GT_selector(b), e)
  }, b = function(b, d, e) {
    var f = null;
    2 < arguments.length && (f = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
    return a.call(this, b, d, f)
  };
  b.cljs$lang$maxFixedArity = 2;
  b.cljs$lang$applyTo = function(b) {
    var d = cljs.core.first(b), b = cljs.core.next(b), e = cljs.core.first(b), b = cljs.core.rest(b);
    return a(d, e, b)
  };
  b.cljs$core$IFn$_invoke$arity$variadic = a;
  return b
}();
jayq.core.clone = function(a) {
  return a.clone()
};
jayq.core.html = function() {
  var a = null, b = function(a) {
    return a.html()
  }, a = function(a, d) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return a.html(d)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$2 = function(a, b) {
    return a.html(b)
  };
  return a
}();
jayq.core.inner = jayq.core.html;
jayq.core.empty = function(a) {
  return a.empty()
};
jayq.core.val = function() {
  var a = null, b = function(a) {
    return a.val()
  }, a = function(a, d) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return a.val(d)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$2 = function(a, b) {
    return a.val(b)
  };
  return a
}();
jayq.core.serialize = function(a) {
  return a.serialize()
};
jayq.core.queue = function() {
  var a = null, b = function(a) {
    return a.queue()
  }, a = function(a, d, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return a.queue(d);
      case 3:
        return a.queue(d, e)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$2 = function(a, b) {
    return a.queue(b)
  };
  a.cljs$core$IFn$_invoke$arity$3 = function(a, b, e) {
    return a.queue(b, e)
  };
  return a
}();
jayq.core.dequeue = function() {
  var a = null, b = function(a) {
    return a.dequeue()
  }, a = function(a, d) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return a.dequeue(d)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$2 = function(a, b) {
    return a.dequeue(b)
  };
  return a
}();
jayq.core.document_ready = function(a) {
  return jayq.core.$.cljs$core$IFn$_invoke$arity$1(document).ready(a)
};
jayq.core.mimetype_converter = function(a) {
  return cljs.reader.read_string("" + cljs.core.str(a))
};
jQuery.ajaxSetup(cljs.core.clj__GT_js(cljs.core.PersistentArrayMap.fromArray(["\ufdd0:accepts", cljs.core.PersistentArrayMap.fromArray(["\ufdd0:edn", "application/edn, text/edn", "\ufdd0:clojure", "application/clojure, text/clojure"], !0), "\ufdd0:contents", cljs.core.PersistentArrayMap.fromArray(["clojure", /edn|clojure/], !0), "\ufdd0:converters", cljs.core.PersistentArrayMap.fromArray(["text edn", jayq.core.mimetype_converter, "text clojure", jayq.core.mimetype_converter], !0)], !0)));
jayq.core.clj_content_type_QMARK_ = function(a) {
  return cljs.core.re_find(/^(text|application)\/(clojure|edn)/, a)
};
jayq.core.__GT_content_type = function(a) {
  return cljs.core.string_QMARK_(a) ? a : cljs.core.keyword_QMARK_(a) ? cljs.core.subs.cljs$core$IFn$_invoke$arity$2("" + cljs.core.str(a), 1) : null
};
jayq.core.preprocess_request = function(a) {
  var a = cljs.core.seq_QMARK_(a) ? cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map, a) : a, b = cljs.core.get.cljs$core$IFn$_invoke$arity$2(a, "\ufdd0:contentType"), c = cljs.core.get.cljs$core$IFn$_invoke$arity$2(a, "\ufdd0:data"), d = jayq.core.__GT_content_type(b);
  return function(a) {
    return cljs.core.truth_(jayq.core.clj_content_type_QMARK_(d)) ? cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(a, "\ufdd0:data", cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([c], 0))) : a
  }.call(null, function(a) {
    return cljs.core.truth_(d) ? cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(a, "\ufdd0:contentType", d) : a
  }.call(null, a))
};
jayq.core.__GT_ajax_settings = function(a) {
  return cljs.core.clj__GT_js(jayq.core.preprocess_request(a))
};
jayq.core.ajax = function() {
  var a = null, b = function(a) {
    return jQuery.ajax(jayq.core.__GT_ajax_settings(a))
  }, c = function(a, b) {
    return jQuery.ajax(a, jayq.core.__GT_ajax_settings(b))
  }, a = function(a, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, e)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$2 = c;
  return a
}();
jayq.core.xhr = function(a, b, c) {
  var d = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(a, 0, null), a = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(a, 1, null), b = cljs.core.clj__GT_js(cljs.core.PersistentArrayMap.fromArray(["\ufdd0:type", clojure.string.upper_case(cljs.core.name(d)), "\ufdd0:data", cljs.core.clj__GT_js(b), "\ufdd0:success", c], !0));
  return jQuery.ajax(a, b)
};
jayq.core.read = function(a) {
  return cljs.reader.read_string(jayq.core.html.cljs$core$IFn$_invoke$arity$1(a))
};
jayq.core.bind = function(a, b, c) {
  return a.bind(cljs.core.name(b), c)
};
jayq.core.unbind = function() {
  var a = function(a, b, e) {
    e = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(e, 0, null);
    return a.unbind(cljs.core.name(b), e)
  }, b = function(b, d, e) {
    var f = null;
    2 < arguments.length && (f = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
    return a.call(this, b, d, f)
  };
  b.cljs$lang$maxFixedArity = 2;
  b.cljs$lang$applyTo = function(b) {
    var d = cljs.core.first(b), b = cljs.core.next(b), e = cljs.core.first(b), b = cljs.core.rest(b);
    return a(d, e, b)
  };
  b.cljs$core$IFn$_invoke$arity$variadic = a;
  return b
}();
jayq.core.trigger = function(a, b) {
  return a.trigger(cljs.core.name(b))
};
jayq.core.delegate = function(a, b, c, d) {
  return a.delegate(jayq.core.__GT_selector(b), cljs.core.name(c), d)
};
jayq.core.__GT_event = function(a) {
  return cljs.core.coll_QMARK_(a) ? clojure.string.join.cljs$core$IFn$_invoke$arity$2(" ", cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.name, a)) : cljs.core.clj__GT_js(a)
};
jayq.core.on = function() {
  var a = function(a, b, e) {
    var f = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(e, 0, null), g = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(e, 1, null), e = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(e, 2, null);
    return a.on(jayq.core.__GT_event(b), jayq.core.__GT_selector(f), g, e)
  }, b = function(b, d, e) {
    var f = null;
    2 < arguments.length && (f = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
    return a.call(this, b, d, f)
  };
  b.cljs$lang$maxFixedArity = 2;
  b.cljs$lang$applyTo = function(b) {
    var d = cljs.core.first(b), b = cljs.core.next(b), e = cljs.core.first(b), b = cljs.core.rest(b);
    return a(d, e, b)
  };
  b.cljs$core$IFn$_invoke$arity$variadic = a;
  return b
}();
jayq.core.one = function() {
  var a = function(a, b, e) {
    var f = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(e, 0, null), g = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(e, 1, null), e = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(e, 2, null);
    return a.one(jayq.core.__GT_event(b), jayq.core.__GT_selector(f), g, e)
  }, b = function(b, d, e) {
    var f = null;
    2 < arguments.length && (f = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
    return a.call(this, b, d, f)
  };
  b.cljs$lang$maxFixedArity = 2;
  b.cljs$lang$applyTo = function(b) {
    var d = cljs.core.first(b), b = cljs.core.next(b), e = cljs.core.first(b), b = cljs.core.rest(b);
    return a(d, e, b)
  };
  b.cljs$core$IFn$_invoke$arity$variadic = a;
  return b
}();
jayq.core.off = function() {
  var a = function(a, b, e) {
    var f = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(e, 0, null), e = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(e, 1, null);
    return a.off(jayq.core.__GT_event(b), jayq.core.__GT_selector(f), e)
  }, b = function(b, d, e) {
    var f = null;
    2 < arguments.length && (f = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
    return a.call(this, b, d, f)
  };
  b.cljs$lang$maxFixedArity = 2;
  b.cljs$lang$applyTo = function(b) {
    var d = cljs.core.first(b), b = cljs.core.next(b), e = cljs.core.first(b), b = cljs.core.rest(b);
    return a(d, e, b)
  };
  b.cljs$core$IFn$_invoke$arity$variadic = a;
  return b
}();
jayq.core.prevent = function(a) {
  return a.preventDefault()
};
jayq.core.height = function() {
  var a = null, b = function(a) {
    return a.height()
  }, a = function(a, d) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return a.height(d)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$2 = function(a, b) {
    return a.height(b)
  };
  return a
}();
jayq.core.width = function() {
  var a = null, b = function(a) {
    return a.width()
  }, a = function(a, d) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return a.width(d)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$2 = function(a, b) {
    return a.width(b)
  };
  return a
}();
jayq.core.inner_height = function(a) {
  return a.innerHeight()
};
jayq.core.inner_width = function(a) {
  return a.innerWidth()
};
jayq.core.outer_height = function(a) {
  return a.outerHeight()
};
jayq.core.outer_width = function(a) {
  return a.outerWidth()
};
jayq.core.offset = function() {
  var a = null, b = function(a) {
    return cljs.core.js__GT_clj.cljs$core$IFn$_invoke$arity$variadic(a.offset(), cljs.core.array_seq(["\ufdd0:keywordize-keys", !0], 0))
  }, c = function(a, b) {
    return cljs.core.clj__GT_js(b).offset()
  }, a = function(a, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, e)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$2 = c;
  return a
}();
jayq.core.offset_parent = function(a) {
  return a.offsetParent()
};
jayq.core.position = function(a) {
  return cljs.core.js__GT_clj.cljs$core$IFn$_invoke$arity$variadic(a.position(), cljs.core.array_seq(["\ufdd0:keywordize-keys", !0], 0))
};
jayq.core.scroll_left = function() {
  var a = null, b = function(a) {
    return a.scrollLeft()
  }, a = function(a, d) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return a.scrollLeft(d)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$2 = function(a, b) {
    return a.scrollLeft(b)
  };
  return a
}();
jayq.core.scroll_top = function() {
  var a = null, b = function(a) {
    return a.scrollTop()
  }, a = function(a, d) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return a.scrollTop(d)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$2 = function(a, b) {
    return a.scrollTop(b)
  };
  return a
}();
jayq.core.$deferred = $.Deferred;
jayq.core.$when = $.when;
jayq.core.then = function() {
  var a = null, b = function(a, b, c) {
    return a.then(cljs.core.clj__GT_js(b), cljs.core.clj__GT_js(c))
  }, c = function(a, b, c, g) {
    return a.then(cljs.core.clj__GT_js(b), cljs.core.clj__GT_js(c), cljs.core.clj__GT_js(g))
  }, a = function(a, e, f, g) {
    switch(arguments.length) {
      case 3:
        return b.call(this, a, e, f);
      case 4:
        return c.call(this, a, e, f, g)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$3 = b;
  a.cljs$core$IFn$_invoke$arity$4 = c;
  return a
}();
jayq.core.done = function() {
  var a = function(a, b) {
    return a.done.apply(a, cljs.core.clj__GT_js(b))
  }, b = function(b, d) {
    var e = null;
    1 < arguments.length && (e = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0));
    return a.call(this, b, e)
  };
  b.cljs$lang$maxFixedArity = 1;
  b.cljs$lang$applyTo = function(b) {
    var d = cljs.core.first(b), b = cljs.core.rest(b);
    return a(d, b)
  };
  b.cljs$core$IFn$_invoke$arity$variadic = a;
  return b
}();
jayq.core.fail = function() {
  var a = function(a, b) {
    return a.fail.apply(a, cljs.core.clj__GT_js(b))
  }, b = function(b, d) {
    var e = null;
    1 < arguments.length && (e = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0));
    return a.call(this, b, e)
  };
  b.cljs$lang$maxFixedArity = 1;
  b.cljs$lang$applyTo = function(b) {
    var d = cljs.core.first(b), b = cljs.core.rest(b);
    return a(d, b)
  };
  b.cljs$core$IFn$_invoke$arity$variadic = a;
  return b
}();
jayq.core.progress = function(a, b) {
  return a.progress(cljs.core.clj__GT_js(b))
};
jayq.core.promise = function() {
  var a = null, b = function(a) {
    return a.promise()
  }, a = function(a, d, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return a.promise(d);
      case 3:
        return a.promise(d, e)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$1 = b;
  a.cljs$core$IFn$_invoke$arity$2 = function(a, b) {
    return a.promise(b)
  };
  a.cljs$core$IFn$_invoke$arity$3 = function(a, b, e) {
    return a.promise(b, e)
  };
  return a
}();
jayq.core.always = function() {
  var a = function(a, b) {
    return a.always.apply(a, cljs.core.clj__GT_js(b))
  }, b = function(b, d) {
    var e = null;
    1 < arguments.length && (e = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0));
    return a.call(this, b, e)
  };
  b.cljs$lang$maxFixedArity = 1;
  b.cljs$lang$applyTo = function(b) {
    var d = cljs.core.first(b), b = cljs.core.rest(b);
    return a(d, b)
  };
  b.cljs$core$IFn$_invoke$arity$variadic = a;
  return b
}();
jayq.core.reject = function(a, b) {
  return a.reject(b)
};
jayq.core.reject_with = function(a, b, c) {
  return a.rejectWith(b, c)
};
jayq.core.notify = function(a, b) {
  return a.notify(b)
};
jayq.core.notify_with = function(a, b, c) {
  return a.notifyWith(b, c)
};
jayq.core.resolve = function(a, b) {
  return a.resolve(b)
};
jayq.core.resolve_with = function(a, b, c) {
  return a.resolveWith(b, c)
};
jayq.core.pipe = function() {
  var a = null, a = function(a, c, d, e) {
    switch(arguments.length) {
      case 2:
        return a.pipe(c);
      case 3:
        return a.pipe(c, d);
      case 4:
        return a.pipe(c, d, e)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$core$IFn$_invoke$arity$2 = function(a, c) {
    return a.pipe(c)
  };
  a.cljs$core$IFn$_invoke$arity$3 = function(a, c, d) {
    return a.pipe(c, d)
  };
  a.cljs$core$IFn$_invoke$arity$4 = function(a, c, d, e) {
    return a.pipe(c, d, e)
  };
  return a
}();
jayq.core.state = function(a) {
  return cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(a.state())
};
jayq.core.deferred_m = cljs.core.PersistentArrayMap.fromArray(["\ufdd0:return", jayq.core.$when, "\ufdd0:bind", function(a, b) {
  var c = jayq.core.$deferred.cljs$core$IFn$_invoke$arity$0 ? jayq.core.$deferred.cljs$core$IFn$_invoke$arity$0() : jayq.core.$deferred.call(null);
  jayq.core.done.cljs$core$IFn$_invoke$arity$variadic(a, cljs.core.array_seq([function(a) {
    return jayq.core.done.cljs$core$IFn$_invoke$arity$variadic(b.cljs$core$IFn$_invoke$arity$1 ? b.cljs$core$IFn$_invoke$arity$1(a) : b.call(null, a), cljs.core.array_seq([cljs.core.partial.cljs$core$IFn$_invoke$arity$2(jayq.core.resolve, c)], 0))
  }], 0));
  return jayq.core.promise.cljs$core$IFn$_invoke$arity$1(c)
}, "\ufdd0:zero", cljs.core.identity], !0);
jayq.core.ajax_m = cljs.core.PersistentArrayMap.fromArray(["\ufdd0:return", cljs.core.identity, "\ufdd0:bind", function(a, b) {
  return jayq.core.done.cljs$core$IFn$_invoke$arity$variadic(jayq.core.ajax.cljs$core$IFn$_invoke$arity$1(a), cljs.core.array_seq([b], 0))
}, "\ufdd0:zero", cljs.core.identity], !0);
var dots_game = {ex2:{}};
dots_game.ex2.grid_unit = 45;
dots_game.ex2.dot_size = 20;
dots_game.ex2.board_size = 6;
dots_game.ex2.peice_colors = cljs.core.PersistentVector.fromArray(["\ufdd0:blue", "\ufdd0:green", "\ufdd0:yellow", "\ufdd0:purple", "\ufdd0:red"], !0);
var number_colors_5243 = cljs.core.count(dots_game.ex2.peice_colors);
dots_game.ex2.rand_color = function() {
  return cljs.core.get.cljs$core$IFn$_invoke$arity$2(dots_game.ex2.peice_colors, cljs.core.rand_int(number_colors_5243))
};
dots_game.ex2.get_rand_colors = function(a) {
  return cljs.core.map.cljs$core$IFn$_invoke$arity$2(function() {
    return dots_game.ex2.rand_color()
  }, cljs.core.range.cljs$core$IFn$_invoke$arity$1(a))
};
dots_game.ex2.dot_pos_to_corner_position = function(a) {
  return cljs.core.PersistentVector.fromArray([25 + dots_game.ex2.grid_unit * (dots_game.ex2.board_size - 1 - a), 25], !0)
};
dots_game.ex2.dot_templ = function(a, b) {
  var c = dots_game.ex2.dot_pos_to_corner_position(a), d = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(c, 0, null), e = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(c, 1, null), c = [cljs.core.str("dot "), cljs.core.str(cljs.core.name(b))].join(""), d = [cljs.core.str("top:"), cljs.core.str(d), cljs.core.str("px; left: "), cljs.core.str(e), cljs.core.str("px;")].join("");
  return cljs.core.PersistentVector.fromArray(["\ufdd0:div", cljs.core.PersistentArrayMap.fromArray(["\ufdd0:class", c, "\ufdd0:style", d], !0)], !0)
};
dots_game.ex2.create_dot = function(a, b) {
  return cljs.core.PersistentArrayMap.fromArray(["\ufdd0:color", b, "\ufdd0:pos", a, "\ufdd0:elem", crate.core.html.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([dots_game.ex2.dot_templ(a, b)], 0))], !0)
};
dots_game.ex2.render_state = function(a, b) {
  return cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(function(b) {
    return jayq.core.append(jayq.core.$.cljs$core$IFn$_invoke$arity$1(a), (new cljs.core.Keyword("\ufdd0:elem")).call(null, b))
  }, b)
};
dots_game.ex2.render_example_board = function(a) {
  return dots_game.ex2.render_state(a, cljs.core.map_indexed(dots_game.ex2.create_dot, dots_game.ex2.get_rand_colors(dots_game.ex2.board_size)))
};
dots_game.ex2.example_2 = dots_game.ex2.render_example_board;
dots_game.ex1 = {};
dots_game.ex1.is_bad_ie_QMARK_ = function() {
  var a = $.browser, b = a.msie;
  return cljs.core.truth_(b) ? 10 > a.version : b
};
dots_game.ex1.xy_message = function(a, b, c) {
  return cljs.core.async.put_BANG_.call(null, a, cljs.core.PersistentVector.fromArray([b, cljs.core.PersistentArrayMap.fromArray(["\ufdd0:x", c.pageX, "\ufdd0:y", c.pageY], !0)], !0))
};
dots_game.ex1.touch_xy_message = function(a, b, c) {
  return dots_game.ex1.xy_message.call(null, a, b, c.originalEvent.touches[0])
};
dots_game.ex1.mousemove_handler = function(a, b) {
  return 0 < (null == b.buttons ? b.which : b.buttons) ? dots_game.ex1.xy_message.call(null, a, "\ufdd0:draw", b) : cljs.core.async.put_BANG_.call(null, a, cljs.core.PersistentVector.fromArray(["\ufdd0:drawend"], !0))
};
dots_game.ex1.nice_mouse_event_capture = function(a, b, c) {
  jayq.core.bind.call(null, jayq.core.$.call(null, b), "mousemove", function(b) {
    return dots_game.ex1.mousemove_handler.call(null, a, b)
  });
  jayq.core.bind.call(null, jayq.core.$.call(null, b), "mousedown", function(b) {
    return dots_game.ex1.xy_message.call(null, a, "\ufdd0:draw", b)
  });
  return jayq.core.bind.call(null, jayq.core.$.call(null, b), "mouseup", c)
};
dots_game.ex1.ie_mouse_event_capture = function(a, b, c) {
  jayq.core.bind.call(null, jayq.core.$.call(null, b), "mousemove", function(b) {
    return dots_game.ex1.xy_message.call(null, a, "\ufdd0:draw", b)
  });
  jayq.core.bind.call(null, jayq.core.$.call(null, "body"), "mousedown", function(b) {
    return dots_game.ex1.xy_message.call(null, a, "\ufdd0:drawstart", b)
  });
  return jayq.core.bind.call(null, jayq.core.$.call(null, "body"), "mouseup", c)
};
dots_game.ex1.draw_event_capture = function(a, b) {
  var c = function() {
    return cljs.core.async.put_BANG_.call(null, a, cljs.core.PersistentVector.fromArray(["\ufdd0:drawend"], !0))
  };
  cljs.core.truth_(dots_game.ex1.is_bad_ie_QMARK_.call(null)) ? dots_game.ex1.ie_mouse_event_capture.call(null, a, b, c) : dots_game.ex1.nice_mouse_event_capture.call(null, a, b, c);
  jayq.core.bind.call(null, jayq.core.$.call(null, b), "touchmove", function(b) {
    return dots_game.ex1.touch_xy_message.call(null, a, "\ufdd0:draw", b)
  });
  return jayq.core.bind.call(null, jayq.core.$.call(null, b), "touchend", c)
};
dots_game.ex1.get_drawing = function(a, b) {
  var c = cljs.core.async.chan.call(null, 1);
  cljs.core.async.impl.dispatch.run.call(null, function() {
    var d = function(c) {
      var d = c[1];
      if(8 === d) {
        var e = c[2];
        c[5] = e;
        c[2] = null;
        c[1] = 3;
        return"\ufdd0:recur"
      }
      return 7 === d ? (d = c[2], c[2] = d, c[1] = 4, "\ufdd0:recur") : 6 === d ? (c[2] = null, c[1] = 7, "\ufdd0:recur") : 5 === d ? cljs.core.async.impl.ioc_helpers.take_BANG_.call(null, c, 8, a) : 4 === d ? (d = c[2], cljs.core.async.impl.ioc_helpers.return_chan.call(null, c, d)) : 3 === d ? (e = c[5], d = cljs.core.async.put_BANG_.call(null, b, e), e = cljs.core.first.call(null, e), e = cljs.core._EQ_.call(null, e, "\ufdd0:draw"), c[6] = d, c[1] = e ? 5 : 6, "\ufdd0:recur") : 2 === d ? (e = c[2], 
      c[5] = e, c[2] = null, c[1] = 3, "\ufdd0:recur") : 1 === d ? cljs.core.async.impl.ioc_helpers.take_BANG_.call(null, c, 2, a) : null
    }, e = null, f = function() {
      var a = Array(7);
      a[0] = e;
      a[1] = 1;
      return a
    }, g = function(a) {
      for(;;) {
        var b = d.call(null, a);
        if("\ufdd0:recur" !== b) {
          return b
        }
      }
    }, e = function(a) {
      switch(arguments.length) {
        case 0:
          return f.call(this);
        case 1:
          return g.call(this, a)
      }
      throw Error("Invalid arity: " + arguments.length);
    };
    e.cljs$core$IFn$_invoke$arity$0 = f;
    e.cljs$core$IFn$_invoke$arity$1 = g;
    var h = e.call(null);
    h[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c;
    return cljs.core.async.impl.ioc_helpers.run_state_machine.call(null, h)
  });
  return c
};
dots_game.ex1.draw_chan = function(a) {
  var b = cljs.core.async.chan.call(null), c = cljs.core.async.chan.call(null), d = cljs.core.truth_(dots_game.ex1.is_bad_ie_QMARK_.call(null)) ? "\ufdd0:drawstart" : "\ufdd0:draw";
  dots_game.ex1.draw_event_capture.call(null, b, a);
  var e = cljs.core.async.chan.call(null, 1);
  cljs.core.async.impl.dispatch.run.call(null, function() {
    var a = function(a) {
      var e = a[1];
      if(9 === e) {
        return e = a[2], a[5] = e, a[2] = null, a[1] = 3, "\ufdd0:recur"
      }
      if(8 === e) {
        return e = a[2], a[2] = e, a[1] = 7, "\ufdd0:recur"
      }
      if(7 === e) {
        return a[6] = a[2], cljs.core.async.impl.ioc_helpers.take_BANG_.call(null, a, 9, b)
      }
      if(6 === e) {
        return a[2] = null, a[1] = 7, "\ufdd0:recur"
      }
      if(5 === e) {
        var e = a[7], e = cljs.core.vector.call(null, "\ufdd0:draw", e), e = cljs.core.async.put_BANG_.call(null, c, e), f = dots_game.ex1.get_drawing.call(null, b, c);
        a[8] = e;
        return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null, a, 8, f)
      }
      if(4 === e) {
        return e = a[2], cljs.core.async.impl.ioc_helpers.return_chan.call(null, a, e)
      }
      if(3 === e) {
        return e = a[5], f = cljs.core.nth.call(null, e, 0, null), e = cljs.core.nth.call(null, e, 1, null), f = cljs.core._EQ_.call(null, f, d), a[7] = e, a[1] = f ? 5 : 6, "\ufdd0:recur"
      }
      if(2 === e) {
        var e = a[2], f = cljs.core.nth.call(null, e, 0, null), h = cljs.core.nth.call(null, e, 1, null);
        a[9] = h;
        a[5] = e;
        a[10] = f;
        a[2] = null;
        a[1] = 3;
        return"\ufdd0:recur"
      }
      return 1 === e ? cljs.core.async.impl.ioc_helpers.take_BANG_.call(null, a, 2, b) : null
    }, g = null, h = function() {
      var a = Array(11);
      a[0] = g;
      a[1] = 1;
      return a
    }, i = function(b) {
      for(;;) {
        var c = a.call(null, b);
        if("\ufdd0:recur" !== c) {
          return c
        }
      }
    }, g = function(a) {
      switch(arguments.length) {
        case 0:
          return h.call(this);
        case 1:
          return i.call(this, a)
      }
      throw Error("Invalid arity: " + arguments.length);
    };
    g.cljs$core$IFn$_invoke$arity$0 = h;
    g.cljs$core$IFn$_invoke$arity$1 = i;
    var j = g.call(null);
    j[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = e;
    return cljs.core.async.impl.ioc_helpers.run_state_machine.call(null, j)
  });
  return c
};
dots_game.ex1.draw_point = function(a, b, c, d) {
  var e = cljs.core.seq_QMARK_.call(null, d) ? cljs.core.apply.call(null, cljs.core.hash_map, d) : d, d = cljs.core.get.call(null, e, "\ufdd0:left"), e = cljs.core.get.call(null, e, "\ufdd0:top");
  return jayq.core.append.call(null, jayq.core.$.call(null, a), crate.core.html.call(null, cljs.core.PersistentVector.fromArray(["\ufdd0:div", cljs.core.PersistentArrayMap.fromArray(["\ufdd0:class", [cljs.core.str("point "), cljs.core.str(cljs.core.name.call(null, b))].join(""), "\ufdd0:style", [cljs.core.str("top: "), cljs.core.str(c.call(null, "\ufdd0:y") - e - 5), cljs.core.str("px;"), cljs.core.str("left: "), cljs.core.str(c.call(null, "\ufdd0:x") - d - 5), cljs.core.str("px;")].join("")], !0)], 
  !0)))
};
dots_game.ex1.draw_points = function(a, b, c) {
  var d = jayq.core.offset.call(null, jayq.core.$.call(null, a)), e = jayq.core.$.call(null, a).width() + d.call(null, "\ufdd0:left"), f, g = jayq.core.$.call(null, a).height() + d.call(null, "\ufdd0:top");
  f = function(a) {
    var b;
    b = (b = d.call(null, "\ufdd0:top") < a.call(null, "\ufdd0:y")) ? a.call(null, "\ufdd0:y") < g : b;
    return cljs.core.truth_(b) ? (b = d.call(null, "\ufdd0:left") < a.call(null, "\ufdd0:x")) ? a.call(null, "\ufdd0:x") < e : b : b
  };
  var h = cljs.core.async.chan.call(null, 1);
  cljs.core.async.impl.dispatch.run.call(null, function() {
    var e = function(e) {
      var h = e[1];
      if(1 === h) {
        return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null, e, 2, b)
      }
      if(2 === h) {
        var h = e[2], g = cljs.core.nth.call(null, h, 0, null), i = cljs.core.nth.call(null, h, 1, null);
        e[5] = h;
        e[6] = i;
        e[7] = g;
        e[2] = null;
        e[1] = 3;
        return"\ufdd0:recur"
      }
      return 3 === h ? (g = e[5], h = cljs.core.nth.call(null, g, 0, null), g = cljs.core.nth.call(null, g, 1, null), h = cljs.core._EQ_.call(null, h, "\ufdd0:draw"), e[8] = g, e[1] = h ? 5 : 6, "\ufdd0:recur") : 4 === h ? (h = e[2], cljs.core.async.impl.ioc_helpers.return_chan.call(null, e, h)) : 5 === h ? (g = e[8], h = f.call(null, g), e[1] = cljs.core.truth_(h) ? 8 : 9, "\ufdd0:recur") : 6 === h ? (e[2] = null, e[1] = 7, "\ufdd0:recur") : 7 === h ? (h = e[2], e[2] = h, e[1] = 4, "\ufdd0:recur") : 
      8 === h ? (g = e[8], h = dots_game.ex1.draw_point.call(null, a, c, g, d), e[2] = h, e[1] = 10, "\ufdd0:recur") : 9 === h ? (e[2] = null, e[1] = 10, "\ufdd0:recur") : 10 === h ? (e[9] = e[2], cljs.core.async.impl.ioc_helpers.take_BANG_.call(null, e, 11, b)) : 11 === h ? (g = e[2], e[5] = g, e[2] = null, e[1] = 3, "\ufdd0:recur") : null
    }, g = null, k = function() {
      var a = Array(10);
      a[0] = g;
      a[1] = 1;
      return a
    }, m = function(a) {
      for(;;) {
        var b = e.call(null, a);
        if("\ufdd0:recur" !== b) {
          return b
        }
      }
    }, g = function(a) {
      switch(arguments.length) {
        case 0:
          return k.call(this);
        case 1:
          return m.call(this, a)
      }
      throw Error("Invalid arity: " + arguments.length);
    };
    g.cljs$core$IFn$_invoke$arity$0 = k;
    g.cljs$core$IFn$_invoke$arity$1 = m;
    var l = g.call(null);
    l[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = h;
    return cljs.core.async.impl.ioc_helpers.run_state_machine.call(null, l)
  });
  return h
};
dots_game.ex1.drawing_loop = function(a) {
  var b = dots_game.ex1.draw_chan.call(null, a), c = cljs.core.async.chan.call(null, 1);
  cljs.core.async.impl.dispatch.run.call(null, function() {
    var d = function(c) {
      var d = c[1];
      if(9 === d) {
        var d = c[5], e = c[2];
        c[5] = d + 1;
        c[6] = e;
        c[2] = null;
        c[1] = 3;
        return"\ufdd0:recur"
      }
      if(8 === d) {
        return d = c[2], c[2] = d, c[1] = 7, "\ufdd0:recur"
      }
      if(7 === d) {
        return c[7] = c[2], cljs.core.async.impl.ioc_helpers.take_BANG_.call(null, c, 9, b)
      }
      if(6 === d) {
        return c[2] = null, c[1] = 7, "\ufdd0:recur"
      }
      if(5 === d) {
        return d = c[5], e = cljs.core.vector.call(null, "\ufdd0:red", "\ufdd0:green", "\ufdd0:blue"), d = cljs.core.mod.call(null, d, 3), d = cljs.core.get.call(null, e, d), d = dots_game.ex1.draw_points.call(null, a, b, d), cljs.core.async.impl.ioc_helpers.take_BANG_.call(null, c, 8, d)
      }
      if(4 === d) {
        return d = c[2], cljs.core.async.impl.ioc_helpers.return_chan.call(null, c, d)
      }
      if(3 === d) {
        return e = c[6], d = cljs.core.nth.call(null, e, 0, null), e = cljs.core.nth.call(null, e, 1, null), d = cljs.core._EQ_.call(null, "\ufdd0:draw", d), c[8] = e, c[1] = d ? 5 : 6, "\ufdd0:recur"
      }
      if(2 === d) {
        var d = c[2], e = cljs.core.nth.call(null, d, 0, null), f = cljs.core.nth.call(null, d, 1, null);
        c[5] = 0;
        c[6] = d;
        c[9] = f;
        c[10] = e;
        c[2] = null;
        c[1] = 3;
        return"\ufdd0:recur"
      }
      return 1 === d ? cljs.core.async.impl.ioc_helpers.take_BANG_.call(null, c, 2, b) : null
    }, e = null, f = function() {
      var a = Array(11);
      a[0] = e;
      a[1] = 1;
      return a
    }, g = function(a) {
      for(;;) {
        var b = d.call(null, a);
        if("\ufdd0:recur" !== b) {
          return b
        }
      }
    }, e = function(a) {
      switch(arguments.length) {
        case 0:
          return f.call(this);
        case 1:
          return g.call(this, a)
      }
      throw Error("Invalid arity: " + arguments.length);
    };
    e.cljs$core$IFn$_invoke$arity$0 = f;
    e.cljs$core$IFn$_invoke$arity$1 = g;
    var h = e.call(null);
    h[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c;
    return cljs.core.async.impl.ioc_helpers.run_state_machine.call(null, h)
  });
  return c
};
dots_game.ex1.example_1 = function(a) {
  return dots_game.ex1.drawing_loop.call(null, a)
};
dots_game.ex8 = {};
dots_game.ex8.reverse_board_position = cljs.core.partial.cljs$core$IFn$_invoke$arity$2(cljs.core._, dots_game.ex2.board_size - 1);
dots_game.ex8.dot_pos_to_corner_position = function(a) {
  var b = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(a, 0, null), a = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(a, 1, null);
  return cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(function(a) {
    return 25 + dots_game.ex2.grid_unit * a
  }, cljs.core.PersistentVector.fromArray([dots_game.ex8.reverse_board_position.cljs$core$IFn$_invoke$arity$1 ? dots_game.ex8.reverse_board_position.cljs$core$IFn$_invoke$arity$1(a) : dots_game.ex8.reverse_board_position.call(null, a), b], !0))
};
dots_game.ex8.coord__GT_dot_pos = function(a, b) {
  var c = cljs.core.seq_QMARK_(b) ? cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map, b) : b, d = cljs.core.get.cljs$core$IFn$_invoke$arity$2(c, "\ufdd0:y"), c = cljs.core.get.cljs$core$IFn$_invoke$arity$2(c, "\ufdd0:x"), d = cljs.core.map.cljs$core$IFn$_invoke$arity$4(cljs.core._, cljs.core.PersistentVector.fromArray([c, d], !0), a, cljs.core.PersistentVector.fromArray([13, 13], !0)), e = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(d, 0, null), f = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(d, 
  1, null);
  return cljs.core.truth_(function() {
    var a;
    a = (a = 12 < e) ? e < dots_game.ex2.board_size * dots_game.ex2.grid_unit : a;
    return cljs.core.truth_(a) ? (a = 12 < f) ? f < dots_game.ex2.board_size * dots_game.ex2.grid_unit : a : a
  }()) ? cljs.core.PersistentVector.fromArray([e / dots_game.ex2.grid_unit | 0, dots_game.ex8.reverse_board_position.cljs$core$IFn$_invoke$arity$1 ? dots_game.ex8.reverse_board_position.cljs$core$IFn$_invoke$arity$1(f / dots_game.ex2.grid_unit | 0) : dots_game.ex8.reverse_board_position.call(null, f / dots_game.ex2.grid_unit | 0)], !0) : null
};
dots_game.ex8.collect_dots = function(a, b, c, d) {
  var e = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(1);
  cljs.core.async.impl.dispatch.run(function() {
    var f, g = function(e) {
      var f = e[1];
      if(1 === f) {
        var h;
        h = d;
        e[5] = null;
        e[6] = h;
        e[2] = null;
        e[1] = 2;
        return"\ufdd0:recur"
      }
      return 2 === f ? (h = e[6], f = cljs.core.first(h), f = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("\ufdd0:draw", f), e[1] = f ? 4 : 5, "\ufdd0:recur") : 3 === f ? (f = e[2], cljs.core.async.impl.ioc_helpers.return_chan(e, f)) : 4 === f ? (h = e[6], f = e[7], f = e[8], f = cljs.core.last(h), f = dots_game.ex8.coord__GT_dot_pos(c, f), h = cljs.core.not(null == f), e[7] = f, e[8] = h, e[1] = h ? 7 : 8, "\ufdd0:recur") : 5 === f ? (e[2] = null, e[1] = 6, "\ufdd0:recur") : 6 === f ? (f = e[2], 
      e[2] = f, e[1] = 3, "\ufdd0:recur") : 7 === f ? (h = e[5], f = e[7], f = cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(f, h), e[2] = f, e[1] = 9, "\ufdd0:recur") : 8 === f ? (f = e[8], e[2] = f, e[1] = 9, "\ufdd0:recur") : 9 === f ? (f = e[2], e[1] = cljs.core.truth_(f) ? 10 : 11, "\ufdd0:recur") : 10 === f ? (f = e[7], f = cljs.core.vector.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["\ufdd0:dot-pos", f], 0)), f = cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(b, f), 
      e[2] = f, e[1] = 12, "\ufdd0:recur") : 11 === f ? (e[2] = null, e[1] = 12, "\ufdd0:recur") : 12 === f ? (f = e[7], e[9] = e[2], e[1] = cljs.core.truth_(f) ? 13 : 14, "\ufdd0:recur") : 13 === f ? (f = e[7], e[2] = f, e[1] = 15, "\ufdd0:recur") : 14 === f ? (h = e[5], e[2] = h, e[1] = 15, "\ufdd0:recur") : 15 === f ? (f = e[2], e[10] = f, cljs.core.async.impl.ioc_helpers.take_BANG_(e, 16, a)) : 16 === f ? (f = e[10], h = e[2], e[5] = f, e[6] = h, e[2] = null, e[1] = 2, "\ufdd0:recur") : null
    }, h = null, i = function() {
      var a = Array(11);
      a[0] = h;
      a[1] = 1;
      return a
    }, j = function(a) {
      for(;;) {
        var b = g(a);
        if("\ufdd0:recur" !== b) {
          return b
        }
      }
    }, h = function(a) {
      switch(arguments.length) {
        case 0:
          return i.call(this);
        case 1:
          return j.call(this, a)
      }
      throw Error("Invalid arity: " + arguments.length);
    };
    h.cljs$core$IFn$_invoke$arity$0 = i;
    h.cljs$core$IFn$_invoke$arity$1 = j;
    f = h;
    f = f.cljs$core$IFn$_invoke$arity$0 ? f.cljs$core$IFn$_invoke$arity$0() : f.call(null);
    f[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = e;
    return cljs.core.async.impl.ioc_helpers.run_state_machine(f)
  });
  return e
};
dots_game.ex8.dot_chan = function(a) {
  jayq.util.log(a);
  var b = dots_game.ex1.draw_chan(a), a = cljs.core.juxt.cljs$core$IFn$_invoke$arity$2("\ufdd0:left", "\ufdd0:top").call(null, jayq.core.offset.cljs$core$IFn$_invoke$arity$1(jayq.core.$.cljs$core$IFn$_invoke$arity$1(a))), c = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0(), d = cljs.core.partial.cljs$core$IFn$_invoke$arity$4(dots_game.ex8.collect_dots, b, c, a), e = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(1);
  cljs.core.async.impl.dispatch.run(function() {
    var a, g = function(a) {
      var e = a[1];
      if(9 === e) {
        return e = a[2], a[5] = e, a[2] = null, a[1] = 3, "\ufdd0:recur"
      }
      if(8 === e) {
        var e = a[2], f = cljs.core.vector.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["\ufdd0:end-dots"], 0)), f = cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(c, f);
        a[6] = e;
        a[2] = f;
        a[1] = 7;
        return"\ufdd0:recur"
      }
      return 7 === e ? (a[7] = a[2], cljs.core.async.impl.ioc_helpers.take_BANG_(a, 9, b)) : 6 === e ? (a[2] = null, a[1] = 7, "\ufdd0:recur") : 5 === e ? (e = a[5], e = d.cljs$core$IFn$_invoke$arity$1 ? d.cljs$core$IFn$_invoke$arity$1(e) : d.call(null, e), cljs.core.async.impl.ioc_helpers.take_BANG_(a, 8, e)) : 4 === e ? (e = a[2], cljs.core.async.impl.ioc_helpers.return_chan(a, e)) : 3 === e ? (e = a[5], e = cljs.core.first(e), e = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(e, "\ufdd0:draw"), 
      a[1] = e ? 5 : 6, "\ufdd0:recur") : 2 === e ? (e = a[2], a[5] = e, a[2] = null, a[1] = 3, "\ufdd0:recur") : 1 === e ? cljs.core.async.impl.ioc_helpers.take_BANG_(a, 2, b) : null
    }, h = null, i = function() {
      var a = Array(8);
      a[0] = h;
      a[1] = 1;
      return a
    }, j = function(a) {
      for(;;) {
        var b = g(a);
        if("\ufdd0:recur" !== b) {
          return b
        }
      }
    }, h = function(a) {
      switch(arguments.length) {
        case 0:
          return i.call(this);
        case 1:
          return j.call(this, a)
      }
      throw Error("Invalid arity: " + arguments.length);
    };
    h.cljs$core$IFn$_invoke$arity$0 = i;
    h.cljs$core$IFn$_invoke$arity$1 = j;
    a = h;
    a = a.cljs$core$IFn$_invoke$arity$0 ? a.cljs$core$IFn$_invoke$arity$0() : a.call(null);
    a[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = e;
    return cljs.core.async.impl.ioc_helpers.run_state_machine(a)
  });
  return c
};
dots_game.ex8.create_dots = function(a) {
  return cljs.core.map_indexed(dots_game.ex2.create_dot, dots_game.ex2.get_rand_colors(a))
};
dots_game.ex8.initial_state = function(a) {
  return cljs.core.PersistentArrayMap.fromArray(["\ufdd0:board", cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(function() {
    return cljs.core.vec(dots_game.ex8.create_dots(dots_game.ex2.board_size))
  }, cljs.core.range.cljs$core$IFn$_invoke$arity$1(dots_game.ex2.board_size)), "\ufdd0:dot-chain", cljs.core.PersistentVector.EMPTY, "\ufdd0:selector", a], !0)
};
dots_game.ex8.add_dots_to_board = function(a, b) {
  return cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(function(b) {
    return jayq.core.append(jayq.core.$.cljs$core$IFn$_invoke$arity$1(a), (new cljs.core.Keyword("\ufdd0:elem")).call(null, b))
  }, b)
};
dots_game.ex8.move_dot_to_pos = function(a, b) {
  var c = dots_game.ex8.dot_pos_to_corner_position(b), d = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(c, 0, null), c = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(c, 1, null);
  return jayq.core.css.cljs$core$IFn$_invoke$arity$2(jayq.core.$.cljs$core$IFn$_invoke$arity$1(a.cljs$core$IFn$_invoke$arity$1 ? a.cljs$core$IFn$_invoke$arity$1("\ufdd0:elem") : a.call(null, "\ufdd0:elem")), cljs.core.PersistentArrayMap.fromArray(["\ufdd0:top", d, "\ufdd0:left", c], !0))
};
dots_game.ex8.move_dots_to_new_positions = function(a) {
  var b = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(1);
  cljs.core.async.impl.dispatch.run(function() {
    var c, d = function(b) {
      var c = b[1];
      if(1 === c) {
        var d = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(a, 0, null), e = cljs.core.nthnext(a, 1), c = a;
        b[5] = c;
        b[6] = 0;
        b[7] = e;
        b[8] = d;
        b[2] = null;
        b[1] = 2;
        return"\ufdd0:recur"
      }
      return 2 === c ? (c = b[5], d = b[9], e = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(c, 0, null), d = cljs.core.nthnext(c, 1), c = cljs.core.not(null == e), b[10] = d, b[9] = e, b[1] = c ? 4 : 5, "\ufdd0:recur") : 3 === c ? (c = b[2], cljs.core.async.impl.ioc_helpers.return_chan(b, c)) : 4 === c ? (d = b[9], c = b[6], d = d.cljs$core$IFn$_invoke$arity$1 ? d.cljs$core$IFn$_invoke$arity$1("\ufdd0:pos") : d.call(null, "\ufdd0:pos"), c = cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(d, c), b[1] = 
      c ? 7 : 8, "\ufdd0:recur") : 5 === c ? (b[2] = null, b[1] = 6, "\ufdd0:recur") : 6 === c ? (c = b[2], b[2] = c, b[1] = 3, "\ufdd0:recur") : 7 === c ? (d = b[9], c = b[6], c = dots_game.ex8.move_dot_to_pos(d, c), d = cljs.core.async.timeout(100), b[11] = c, cljs.core.async.impl.ioc_helpers.take_BANG_(b, 10, d)) : 8 === c ? (b[2] = null, b[1] = 9, "\ufdd0:recur") : 9 === c ? (d = b[10], c = b[6], e = b[2], b[12] = e, b[5] = d, b[6] = c + 1, b[2] = null, b[1] = 2, "\ufdd0:recur") : 10 === c ? 
      (c = b[2], b[2] = c, b[1] = 9, "\ufdd0:recur") : null
    }, e = null, f = function() {
      var a = Array(13);
      a[0] = e;
      a[1] = 1;
      return a
    }, g = function(a) {
      for(;;) {
        var b = d(a);
        if("\ufdd0:recur" !== b) {
          return b
        }
      }
    }, e = function(a) {
      switch(arguments.length) {
        case 0:
          return f.call(this);
        case 1:
          return g.call(this, a)
      }
      throw Error("Invalid arity: " + arguments.length);
    };
    e.cljs$core$IFn$_invoke$arity$0 = f;
    e.cljs$core$IFn$_invoke$arity$1 = g;
    c = e;
    c = c.cljs$core$IFn$_invoke$arity$0 ? c.cljs$core$IFn$_invoke$arity$0() : c.call(null);
    c[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = b;
    return cljs.core.async.impl.ioc_helpers.run_state_machine(c)
  });
  return b
};
dots_game.ex8.update_positions = function(a) {
  jayq.util.log.cljs$core$IFn$_invoke$arity$variadic("board", cljs.core.array_seq([cljs.core.prn_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([a], 0))], 0));
  return cljs.core.vec(cljs.core.map_indexed(function(a, c) {
    return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(c, "\ufdd0:pos", a)
  }, a))
};
dots_game.ex8.remove_dots_from_dom = function(a) {
  for(var a = cljs.core.seq(a), b = null, c = 0, d = 0;;) {
    if(d < c) {
      var e = b.cljs$core$IIndexed$_nth$arity$2(b, d), f = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(1);
      cljs.core.async.impl.dispatch.run(function(a, b, c, d, e, f) {
        return function() {
          var a, b = null, c = function() {
            var a = Array(8);
            a[0] = b;
            a[1] = 1;
            return a
          }, d = function(a) {
            for(;;) {
              var b;
              b = a;
              var c = b[1];
              if(2 === c) {
                var d = b[2], e = b[5].remove(), c = void 0;
                b[6] = d;
                c = b;
                b = cljs.core.async.impl.ioc_helpers.return_chan(c, e)
              }else {
                1 === c ? (c = f.cljs$core$IFn$_invoke$arity$1 ? f.cljs$core$IFn$_invoke$arity$1("\ufdd0:elem") : f.call(null, "\ufdd0:elem"), c = jayq.core.$.cljs$core$IFn$_invoke$arity$1(c), e = c.addClass("scale-out"), d = cljs.core.async.timeout(150), b[7] = e, b[5] = c, c = b, b = cljs.core.async.impl.ioc_helpers.take_BANG_(c, 2, d)) : b = null
              }
              if("\ufdd0:recur" !== b) {
                return b
              }
            }
          }, b = function(a) {
            switch(arguments.length) {
              case 0:
                return c.call(this);
              case 1:
                return d.call(this, a)
            }
            throw Error("Invalid arity: " + arguments.length);
          };
          b.cljs$core$IFn$_invoke$arity$0 = c;
          b.cljs$core$IFn$_invoke$arity$1 = d;
          a = b;
          a = a.cljs$core$IFn$_invoke$arity$0 ? a.cljs$core$IFn$_invoke$arity$0() : a.call(null);
          a[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = e;
          return cljs.core.async.impl.ioc_helpers.run_state_machine(a)
        }
      }(a, b, c, d, f, e));
      d += 1
    }else {
      var g = cljs.core.seq(a);
      if(g) {
        f = g;
        if(cljs.core.chunked_seq_QMARK_(f)) {
          a = cljs.core.chunk_first(f), d = cljs.core.chunk_rest(f), b = a, c = cljs.core.count(a), a = d
        }else {
          var e = cljs.core.first(f), h = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(1);
          cljs.core.async.impl.dispatch.run(function(a, b, c, d, e, f) {
            return function() {
              var a, b = null, c = function() {
                var a = Array(8);
                a[0] = b;
                a[1] = 1;
                return a
              }, d = function(a) {
                for(;;) {
                  var b;
                  b = a;
                  var c = b[1];
                  if(2 === c) {
                    var d = b[2], e = b[5].remove(), c = void 0;
                    b[6] = d;
                    c = b;
                    b = cljs.core.async.impl.ioc_helpers.return_chan(c, e)
                  }else {
                    1 === c ? (c = f.cljs$core$IFn$_invoke$arity$1 ? f.cljs$core$IFn$_invoke$arity$1("\ufdd0:elem") : f.call(null, "\ufdd0:elem"), c = jayq.core.$.cljs$core$IFn$_invoke$arity$1(c), e = c.addClass("scale-out"), d = cljs.core.async.timeout(150), b[5] = c, b[7] = e, c = b, b = cljs.core.async.impl.ioc_helpers.take_BANG_(c, 2, d)) : b = null
                  }
                  if("\ufdd0:recur" !== b) {
                    return b
                  }
                }
              }, b = function(a) {
                switch(arguments.length) {
                  case 0:
                    return c.call(this);
                  case 1:
                    return d.call(this, a)
                }
                throw Error("Invalid arity: " + arguments.length);
              };
              b.cljs$core$IFn$_invoke$arity$0 = c;
              b.cljs$core$IFn$_invoke$arity$1 = d;
              a = b;
              a = a.cljs$core$IFn$_invoke$arity$0 ? a.cljs$core$IFn$_invoke$arity$0() : a.call(null);
              a[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = e;
              return cljs.core.async.impl.ioc_helpers.run_state_machine(a)
            }
          }(a, b, c, d, h, e, f, g));
          a = cljs.core.next(f);
          b = null;
          c = 0
        }
        d = 0
      }else {
        return null
      }
    }
  }
};
dots_game.ex8.remove_dots = function(a) {
  var a = cljs.core.seq_QMARK_(a) ? cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map, a) : a, b = cljs.core.get.cljs$core$IFn$_invoke$arity$2(a, "\ufdd0:dot-chain"), c = cljs.core.set(b), b = cljs.core.keep_indexed(function(a) {
    return function(b, c) {
      return cljs.core.truth_(a.cljs$core$IFn$_invoke$arity$1 ? a.cljs$core$IFn$_invoke$arity$1(b) : a.call(null, b)) ? c : null
    }
  }(c), a.cljs$core$IFn$_invoke$arity$1 ? a.cljs$core$IFn$_invoke$arity$1("\ufdd0:board") : a.call(null, "\ufdd0:board")), c = cljs.core.keep_indexed(function(a) {
    return function(b, c) {
      return cljs.core.not(a.cljs$core$IFn$_invoke$arity$1 ? a.cljs$core$IFn$_invoke$arity$1(b) : a.call(null, b)) ? c : null
    }
  }(c, b), a.cljs$core$IFn$_invoke$arity$1 ? a.cljs$core$IFn$_invoke$arity$1("\ufdd0:board") : a.call(null, "\ufdd0:board"));
  dots_game.ex8.remove_dots_from_dom(b);
  dots_game.ex8.move_dots_to_new_positions(c);
  return cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(a, "\ufdd0:board", dots_game.ex8.update_positions(c), cljs.core.array_seq(["\ufdd0:dot-chain", cljs.core.PersistentVector.EMPTY], 0))
};
dots_game.ex8.add_dots = function(a) {
  var b = dots_game.ex2.board_size - cljs.core.count(a.cljs$core$IFn$_invoke$arity$1 ? a.cljs$core$IFn$_invoke$arity$1("\ufdd0:board") : a.call(null, "\ufdd0:board")), b = cljs.core.map.cljs$core$IFn$_invoke$arity$3(dots_game.ex2.create_dot, cljs.core.repeat.cljs$core$IFn$_invoke$arity$1(8), dots_game.ex2.get_rand_colors(b)), c = cljs.core.concat.cljs$core$IFn$_invoke$arity$2(a.cljs$core$IFn$_invoke$arity$1 ? a.cljs$core$IFn$_invoke$arity$1("\ufdd0:board") : a.call(null, "\ufdd0:board"), b);
  dots_game.ex8.add_dots_to_board(a.cljs$core$IFn$_invoke$arity$1 ? a.cljs$core$IFn$_invoke$arity$1("\ufdd0:selector") : a.call(null, "\ufdd0:selector"), b);
  var d = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(1);
  cljs.core.async.impl.dispatch.run(function() {
    var a, b = null, g = function() {
      var a = Array(6);
      a[0] = b;
      a[1] = 1;
      return a
    }, h = function(a) {
      for(;;) {
        var b;
        b = a;
        var d = b[1];
        if(2 === d) {
          var e = b[2], f = dots_game.ex8.move_dots_to_new_positions(c), d = void 0;
          b[5] = e;
          d = b;
          b = cljs.core.async.impl.ioc_helpers.return_chan(d, f)
        }else {
          1 === d ? (e = cljs.core.async.timeout(500), d = b, b = cljs.core.async.impl.ioc_helpers.take_BANG_(d, 2, e)) : b = null
        }
        if("\ufdd0:recur" !== b) {
          return b
        }
      }
    }, b = function(a) {
      switch(arguments.length) {
        case 0:
          return g.call(this);
        case 1:
          return h.call(this, a)
      }
      throw Error("Invalid arity: " + arguments.length);
    };
    b.cljs$core$IFn$_invoke$arity$0 = g;
    b.cljs$core$IFn$_invoke$arity$1 = h;
    a = b;
    a = a.cljs$core$IFn$_invoke$arity$0 ? a.cljs$core$IFn$_invoke$arity$0() : a.call(null);
    a[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = d;
    return cljs.core.async.impl.ioc_helpers.run_state_machine(a)
  });
  return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(a, "\ufdd0:board", dots_game.ex8.update_positions(c))
};
dots_game.ex8.render_updates = function(a) {
  return 0 < cljs.core.count(a.cljs$core$IFn$_invoke$arity$1 ? a.cljs$core$IFn$_invoke$arity$1("\ufdd0:dot-chain") : a.call(null, "\ufdd0:dot-chain")) ? dots_game.ex8.add_dots(dots_game.ex8.remove_dots(a)) : a
};
dots_game.ex8.dot_pos_to_center_position = function(a) {
  return cljs.core.vec(cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.partial.cljs$core$IFn$_invoke$arity$2(cljs.core._PLUS_, 10), dots_game.ex8.dot_pos_to_corner_position(a)))
};
dots_game.ex8.chain_element_templ = function(a, b, c) {
  var d = dots_game.ex8.dot_pos_to_center_position(a), a = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(d, 0, null), d = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(d, 1, null), e = dots_game.ex8.dot_pos_to_center_position(b), b = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(e, 0, null), e = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(e, 1, null), f = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(d, e) ? cljs.core.PersistentVector.fromArray([5, dots_game.ex2.grid_unit], !0) : cljs.core.PersistentVector.fromArray([dots_game.ex2.grid_unit, 
  5], !0), g = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(f, 0, null), f = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(f, 1, null), a = [cljs.core.str("width: "), cljs.core.str(g), cljs.core.str("px;"), cljs.core.str("height: "), cljs.core.str(f), cljs.core.str("px;"), cljs.core.str("top: "), cljs.core.str((a < b ? a : b) - 2), cljs.core.str("px;"), cljs.core.str("left: "), cljs.core.str((d < e ? d : e) - 2), cljs.core.str("px;")].join("");
  return cljs.core.PersistentVector.fromArray(["\ufdd0:div", cljs.core.PersistentArrayMap.fromArray(["\ufdd0:style", a, "\ufdd0:class", [cljs.core.str("line "), cljs.core.str(cljs.core.name(cljs.core.truth_(c) ? c : "\ufdd0:blue"))].join("")], !0)], !0)
};
dots_game.ex8.dot_highlight_templ = function(a, b) {
  var c = dots_game.ex8.dot_pos_to_corner_position(a), d = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(c, 0, null), c = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(c, 1, null), d = [cljs.core.str("top:"), cljs.core.str(d), cljs.core.str("px; left: "), cljs.core.str(c), cljs.core.str("px;")].join("");
  return cljs.core.PersistentVector.fromArray(["\ufdd0:div", cljs.core.PersistentArrayMap.fromArray(["\ufdd0:style", d, "\ufdd0:class", [cljs.core.str("dot-highlight "), cljs.core.str(cljs.core.name(b))].join("")], !0)], !0)
};
dots_game.ex8.dot_color = function(a, b) {
  var c = cljs.core.seq_QMARK_(a) ? cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map, a) : a, c = cljs.core.get.cljs$core$IFn$_invoke$arity$2(c, "\ufdd0:board");
  return(new cljs.core.Keyword("\ufdd0:color")).call(null, cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(c, b))
};
dots_game.ex8.render_dot_chain_update = function(a, b, c) {
  var a = cljs.core.count(a), d = cljs.core.count(b), e = c.cljs$core$IFn$_invoke$arity$1 ? c.cljs$core$IFn$_invoke$arity$1("\ufdd0:selector") : c.call(null, "\ufdd0:selector");
  jayq.util.log(cljs.core.prn_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([b], 0)));
  var f = cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(a, d);
  if(f ? 0 < d : f) {
    c = dots_game.ex8.dot_color(c, cljs.core.first(b)), 1 < d ? 0 < d - a ? jayq.core.append(jayq.core.$.cljs$core$IFn$_invoke$arity$1([cljs.core.str(e), cljs.core.str(" .dot-chain-holder")].join("")), crate.core.html.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([dots_game.ex8.chain_element_templ(cljs.core.last(cljs.core.butlast(b)), cljs.core.last(b), c)], 0))) : jayq.core.$.cljs$core$IFn$_invoke$arity$1([cljs.core.str(e), cljs.core.str(" .dot-chain-holder .line")].join("")).last().remove() : 
    jayq.core.inner.cljs$core$IFn$_invoke$arity$2 ? jayq.core.inner.cljs$core$IFn$_invoke$arity$2(jayq.core.$.cljs$core$IFn$_invoke$arity$1([cljs.core.str(e), cljs.core.str(" .dot-chain-holder")].join("")), "") : jayq.core.inner.call(null, jayq.core.$.cljs$core$IFn$_invoke$arity$1([cljs.core.str(e), cljs.core.str(" .dot-chain-holder")].join("")), ""), jayq.core.append(jayq.core.$.cljs$core$IFn$_invoke$arity$1([cljs.core.str(e), cljs.core.str(" .dot-highlights")].join("")), crate.core.html.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([dots_game.ex8.dot_highlight_templ(cljs.core.last(b), 
    c)], 0)))
  }
  return b
};
dots_game.ex8.erase_dot_chain = function(a) {
  jayq.core.inner.cljs$core$IFn$_invoke$arity$2 ? jayq.core.inner.cljs$core$IFn$_invoke$arity$2(jayq.core.$.cljs$core$IFn$_invoke$arity$1([cljs.core.str(a.cljs$core$IFn$_invoke$arity$1 ? a.cljs$core$IFn$_invoke$arity$1("\ufdd0:selector") : a.call(null, "\ufdd0:selector")), cljs.core.str(" .chain-line")].join("")), "") : jayq.core.inner.call(null, jayq.core.$.cljs$core$IFn$_invoke$arity$1([cljs.core.str(a.cljs$core$IFn$_invoke$arity$1 ? a.cljs$core$IFn$_invoke$arity$1("\ufdd0:selector") : a.call(null, 
  "\ufdd0:selector")), cljs.core.str(" .chain-line")].join("")), "");
  return jayq.core.inner.cljs$core$IFn$_invoke$arity$2 ? jayq.core.inner.cljs$core$IFn$_invoke$arity$2(jayq.core.$.cljs$core$IFn$_invoke$arity$1([cljs.core.str(a.cljs$core$IFn$_invoke$arity$1 ? a.cljs$core$IFn$_invoke$arity$1("\ufdd0:selector") : a.call(null, "\ufdd0:selector")), cljs.core.str(" .dot-highlights")].join("")), "") : jayq.core.inner.call(null, jayq.core.$.cljs$core$IFn$_invoke$arity$1([cljs.core.str(a.cljs$core$IFn$_invoke$arity$1 ? a.cljs$core$IFn$_invoke$arity$1("\ufdd0:selector") : 
  a.call(null, "\ufdd0:selector")), cljs.core.str(" .dot-highlights")].join("")), "")
};
dots_game.ex8.abs = function(a) {
  return Math.abs(a)
};
dots_game.ex8.dot_follows_QMARK_ = function(a, b, c) {
  jayq.util.log(cljs.core.prn_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.PersistentVector.fromArray([b, c], !0)], 0)));
  var d = cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(b, c);
  return d ? (d = null == b) ? d : (a = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(dots_game.ex8.dot_color(a, b), dots_game.ex8.dot_color(a, c))) ? cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(1, cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core._PLUS_, cljs.core.mapv.cljs$core$IFn$_invoke$arity$3(cljs.core.comp.cljs$core$IFn$_invoke$arity$2(dots_game.ex8.abs, cljs.core._), c, b))) : a : d
};
dots_game.ex8.get_dot_chain = function(a, b, c) {
  var d = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(1);
  cljs.core.async.impl.dispatch.run(function() {
    var e, f = function(d) {
      var e = d[1];
      if(1 === e) {
        var e = cljs.core.vector(), f = c;
        d[5] = e;
        d[6] = f;
        d[2] = null;
        d[1] = 2;
        return"\ufdd0:recur"
      }
      return 2 === e ? (f = d[6], e = cljs.core.first(f), e = cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2("\ufdd0:dot-pos", e), d[1] = e ? 4 : 5, "\ufdd0:recur") : 3 === e ? (e = d[2], cljs.core.async.impl.ioc_helpers.return_chan(d, e)) : 4 === e ? (e = d[5], f = dots_game.ex8.erase_dot_chain(a), d[7] = f, d[2] = e, d[1] = 6, "\ufdd0:recur") : 5 === e ? (e = d[5], f = d[6], e = cljs.core.last(e), f = cljs.core.last(f), e = dots_game.ex8.dot_follows_QMARK_(a, e, f), d[1] = cljs.core.truth_(e) ? 
      7 : 8, "\ufdd0:recur") : 6 === e ? (e = d[2], d[2] = e, d[1] = 3, "\ufdd0:recur") : 7 === e ? (e = d[5], f = d[6], f = cljs.core.last(f), f = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(e, f), e = dots_game.ex8.render_dot_chain_update(e, f, a), d[2] = e, d[1] = 9, "\ufdd0:recur") : 8 === e ? (e = d[5], d[2] = e, d[1] = 9, "\ufdd0:recur") : 9 === e ? (e = d[2], d[8] = e, cljs.core.async.impl.ioc_helpers.take_BANG_(d, 10, b)) : 10 === e ? (e = d[8], f = d[2], d[5] = e, d[6] = f, d[2] = null, 
      d[1] = 2, "\ufdd0:recur") : null
    }, g = null, h = function() {
      var a = Array(9);
      a[0] = g;
      a[1] = 1;
      return a
    }, i = function(a) {
      for(;;) {
        var b = f(a);
        if("\ufdd0:recur" !== b) {
          return b
        }
      }
    }, g = function(a) {
      switch(arguments.length) {
        case 0:
          return h.call(this);
        case 1:
          return i.call(this, a)
      }
      throw Error("Invalid arity: " + arguments.length);
    };
    g.cljs$core$IFn$_invoke$arity$0 = h;
    g.cljs$core$IFn$_invoke$arity$1 = i;
    e = g;
    e = e.cljs$core$IFn$_invoke$arity$0 ? e.cljs$core$IFn$_invoke$arity$0() : e.call(null);
    e[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = d;
    return cljs.core.async.impl.ioc_helpers.run_state_machine(e)
  });
  return d
};
dots_game.ex8.dot_chain_getter = function(a, b) {
  var c = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(1);
  cljs.core.async.impl.dispatch.run(function() {
    var d, e = function(c) {
      var d = c[1];
      return 9 === d ? (d = c[2], c[5] = d, c[2] = null, c[1] = 3, "\ufdd0:recur") : 8 === d ? (d = c[2], c[2] = d, c[1] = 7, "\ufdd0:recur") : 7 === d ? (d = c[2], c[2] = d, c[1] = 4, "\ufdd0:recur") : 6 === d ? cljs.core.async.impl.ioc_helpers.take_BANG_(c, 9, b) : 5 === d ? (d = c[5], d = dots_game.ex8.get_dot_chain(a, b, d), cljs.core.async.impl.ioc_helpers.take_BANG_(c, 8, d)) : 4 === d ? (d = c[2], cljs.core.async.impl.ioc_helpers.return_chan(c, d)) : 3 === d ? (d = c[5], d = cljs.core.first(d), 
      d = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("\ufdd0:dot-pos", d), c[1] = d ? 5 : 6, "\ufdd0:recur") : 2 === d ? (d = c[2], c[5] = d, c[2] = null, c[1] = 3, "\ufdd0:recur") : 1 === d ? cljs.core.async.impl.ioc_helpers.take_BANG_(c, 2, b) : null
    }, f = null, g = function() {
      var a = Array(6);
      a[0] = f;
      a[1] = 1;
      return a
    }, h = function(a) {
      for(;;) {
        var b = e(a);
        if("\ufdd0:recur" !== b) {
          return b
        }
      }
    }, f = function(a) {
      switch(arguments.length) {
        case 0:
          return g.call(this);
        case 1:
          return h.call(this, a)
      }
      throw Error("Invalid arity: " + arguments.length);
    };
    f.cljs$core$IFn$_invoke$arity$0 = g;
    f.cljs$core$IFn$_invoke$arity$1 = h;
    d = f;
    d = d.cljs$core$IFn$_invoke$arity$0 ? d.cljs$core$IFn$_invoke$arity$0() : d.call(null);
    d[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c;
    return cljs.core.async.impl.ioc_helpers.run_state_machine(d)
  });
  return c
};
dots_game.ex8.column_selectors = function(a) {
  return cljs.core.map_indexed(function(a, c) {
    return[cljs.core.str(c), cljs.core.str(" .column-"), cljs.core.str(a)].join("")
  }, cljs.core.repeat.cljs$core$IFn$_invoke$arity$1(a))
};
dots_game.ex8.add_dots_to_columns = function(a, b) {
  return cljs.core.mapv.cljs$core$IFn$_invoke$arity$3(dots_game.ex8.add_dots_to_board, dots_game.ex8.column_selectors(a), b)
};
dots_game.ex8.duplex_updates = function(a) {
  var b = cljs.core.map.cljs$core$IFn$_invoke$arity$2(function(a) {
    var b = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(a, 0, null), a = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(a, 1, null);
    return cljs.core.PersistentVector.fromArray([b, cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.last, a)], !0)
  }, cljs.core.group_by(cljs.core.first, a.cljs$core$IFn$_invoke$arity$1 ? a.cljs$core$IFn$_invoke$arity$1("\ufdd0:dot-chain") : a.call(null, "\ufdd0:dot-chain"))), c = a.cljs$core$IFn$_invoke$arity$1 ? a.cljs$core$IFn$_invoke$arity$1("\ufdd0:board") : a.call(null, "\ufdd0:board"), d = dots_game.ex8.column_selectors(a.cljs$core$IFn$_invoke$arity$1 ? a.cljs$core$IFn$_invoke$arity$1("\ufdd0:selector") : a.call(null, "\ufdd0:selector"));
  cljs.core.nth.cljs$core$IFn$_invoke$arity$3(b, 0, null);
  for(cljs.core.nthnext(b, 1);;) {
    var e = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(b, 0, null), b = cljs.core.nthnext(b, 1);
    if(null == e) {
      return cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(a, "\ufdd0:board", c, cljs.core.array_seq(["\ufdd0:dot-chain", cljs.core.PersistentVector.EMPTY], 0))
    }
    var f = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(e, 0, null);
    cljs.core.nth.cljs$core$IFn$_invoke$arity$3(e, 1, null);
    c = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(c, f, (new cljs.core.Keyword("\ufdd0:board")).call(null, dots_game.ex8.render_updates(cljs.core.PersistentArrayMap.fromArray(["\ufdd0:board", cljs.core.get.cljs$core$IFn$_invoke$arity$2(c, f), "\ufdd0:selector", cljs.core.get.cljs$core$IFn$_invoke$arity$2(d, f)], !0))))
  }
};
dots_game.ex8.game_loop = function(a, b) {
  var c = dots_game.ex8.dot_chan(a);
  dots_game.ex8.add_dots_to_columns(a, b.cljs$core$IFn$_invoke$arity$1 ? b.cljs$core$IFn$_invoke$arity$1("\ufdd0:board") : b.call(null, "\ufdd0:board"));
  var d = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(1);
  cljs.core.async.impl.dispatch.run(function() {
    var a, f = function(a) {
      var d = a[1];
      if(4 === d) {
        var d = a[5], d = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(d, "\ufdd0:dot-chain", a[2]), d = dots_game.ex8.render_updates(d), e = cljs.core.prn_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([d], 0)), e = jayq.util.log(e);
        a[6] = e;
        a[5] = d;
        a[2] = null;
        a[1] = 2;
        return"\ufdd0:recur"
      }
      return 3 === d ? (d = a[2], cljs.core.async.impl.ioc_helpers.return_chan(a, d)) : 2 === d ? (d = a[5], d = dots_game.ex8.dot_chain_getter(d, c), cljs.core.async.impl.ioc_helpers.take_BANG_(a, 4, d)) : 1 === d ? (d = b, a[5] = d, a[2] = null, a[1] = 2, "\ufdd0:recur") : null
    }, g = null, h = function() {
      var a = Array(7);
      a[0] = g;
      a[1] = 1;
      return a
    }, i = function(a) {
      for(;;) {
        var b = f(a);
        if("\ufdd0:recur" !== b) {
          return b
        }
      }
    }, g = function(a) {
      switch(arguments.length) {
        case 0:
          return h.call(this);
        case 1:
          return i.call(this, a)
      }
      throw Error("Invalid arity: " + arguments.length);
    };
    g.cljs$core$IFn$_invoke$arity$0 = h;
    g.cljs$core$IFn$_invoke$arity$1 = i;
    a = g;
    a = a.cljs$core$IFn$_invoke$arity$0 ? a.cljs$core$IFn$_invoke$arity$0() : a.call(null);
    a[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = d;
    return cljs.core.async.impl.ioc_helpers.run_state_machine(a)
  });
  return d
};
dots_game.ex8.example_8 = function(a) {
  return dots_game.ex8.game_loop(a, dots_game.ex8.initial_state(a))
};
dots_game.ex3 = {};
dots_game.ex3.reverse_board_position = cljs.core.partial.cljs$core$IFn$_invoke$arity$2(cljs.core._, dots_game.ex2.board_size - 1);
dots_game.ex3.coord__GT_dot_pos = function(a, b) {
  var c = cljs.core.seq_QMARK_(b) ? cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map, b) : b, d = cljs.core.get.cljs$core$IFn$_invoke$arity$2(c, "\ufdd0:y"), c = cljs.core.get.cljs$core$IFn$_invoke$arity$2(c, "\ufdd0:x"), d = cljs.core.map.cljs$core$IFn$_invoke$arity$4(cljs.core._, cljs.core.PersistentVector.fromArray([c, d], !0), a, cljs.core.PersistentVector.fromArray([13, 13], !0)), e = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(d, 0, null), f = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(d, 
  1, null);
  return cljs.core.truth_(function() {
    var a;
    a = (a = 12 < e) ? e < 12 + dots_game.ex2.grid_unit : a;
    return cljs.core.truth_(a) ? (a = 12 < f) ? f < dots_game.ex2.board_size * dots_game.ex2.grid_unit : a : a
  }()) ? dots_game.ex3.reverse_board_position.cljs$core$IFn$_invoke$arity$1 ? dots_game.ex3.reverse_board_position.cljs$core$IFn$_invoke$arity$1(f / dots_game.ex2.grid_unit | 0) : dots_game.ex3.reverse_board_position.call(null, f / dots_game.ex2.grid_unit | 0) : null
};
dots_game.ex3.collect_dots = function(a, b, c, d) {
  var e = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(1);
  cljs.core.async.impl.dispatch.run(function() {
    var f, g = function(e) {
      var f = e[1];
      if(1 === f) {
        var h;
        h = d;
        e[5] = h;
        e[6] = null;
        e[2] = null;
        e[1] = 2;
        return"\ufdd0:recur"
      }
      return 2 === f ? (h = e[5], f = cljs.core.first(h), f = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("\ufdd0:draw", f), e[1] = f ? 4 : 5, "\ufdd0:recur") : 3 === f ? (f = e[2], cljs.core.async.impl.ioc_helpers.return_chan(e, f)) : 4 === f ? (h = e[5], f = e[7], f = e[8], f = cljs.core.last(h), f = dots_game.ex3.coord__GT_dot_pos(c, f), h = cljs.core.not(null == f), e[7] = f, e[8] = h, e[1] = h ? 7 : 8, "\ufdd0:recur") : 5 === f ? (e[2] = null, e[1] = 6, "\ufdd0:recur") : 6 === f ? (f = e[2], 
      e[2] = f, e[1] = 3, "\ufdd0:recur") : 7 === f ? (h = e[6], f = e[7], f = cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(f, h), e[2] = f, e[1] = 9, "\ufdd0:recur") : 8 === f ? (f = e[8], e[2] = f, e[1] = 9, "\ufdd0:recur") : 9 === f ? (f = e[2], e[1] = cljs.core.truth_(f) ? 10 : 11, "\ufdd0:recur") : 10 === f ? (f = e[7], f = cljs.core.vector.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["\ufdd0:dot-pos", f], 0)), f = cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(b, f), 
      e[2] = f, e[1] = 12, "\ufdd0:recur") : 11 === f ? (e[2] = null, e[1] = 12, "\ufdd0:recur") : 12 === f ? (f = e[7], e[9] = e[2], e[1] = cljs.core.truth_(f) ? 13 : 14, "\ufdd0:recur") : 13 === f ? (f = e[7], e[2] = f, e[1] = 15, "\ufdd0:recur") : 14 === f ? (h = e[6], e[2] = h, e[1] = 15, "\ufdd0:recur") : 15 === f ? (f = e[2], e[10] = f, cljs.core.async.impl.ioc_helpers.take_BANG_(e, 16, a)) : 16 === f ? (f = e[10], h = e[2], e[5] = h, e[6] = f, e[2] = null, e[1] = 2, "\ufdd0:recur") : null
    }, h = null, i = function() {
      var a = Array(11);
      a[0] = h;
      a[1] = 1;
      return a
    }, j = function(a) {
      for(;;) {
        var b = g(a);
        if("\ufdd0:recur" !== b) {
          return b
        }
      }
    }, h = function(a) {
      switch(arguments.length) {
        case 0:
          return i.call(this);
        case 1:
          return j.call(this, a)
      }
      throw Error("Invalid arity: " + arguments.length);
    };
    h.cljs$core$IFn$_invoke$arity$0 = i;
    h.cljs$core$IFn$_invoke$arity$1 = j;
    f = h;
    f = f.cljs$core$IFn$_invoke$arity$0 ? f.cljs$core$IFn$_invoke$arity$0() : f.call(null);
    f[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = e;
    return cljs.core.async.impl.ioc_helpers.run_state_machine(f)
  });
  return e
};
dots_game.ex3.dot_chan = function(a) {
  var b = dots_game.ex1.draw_chan(a), a = cljs.core.juxt.cljs$core$IFn$_invoke$arity$2("\ufdd0:left", "\ufdd0:top").call(null, jayq.core.offset.cljs$core$IFn$_invoke$arity$1(jayq.core.$.cljs$core$IFn$_invoke$arity$1(a))), c = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0(), d = cljs.core.partial.cljs$core$IFn$_invoke$arity$4(dots_game.ex3.collect_dots, b, c, a), e = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(1);
  cljs.core.async.impl.dispatch.run(function() {
    var a, g = function(a) {
      var e = a[1];
      if(9 === e) {
        return e = a[2], a[5] = e, a[2] = null, a[1] = 3, "\ufdd0:recur"
      }
      if(8 === e) {
        var e = a[2], f = cljs.core.vector.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["\ufdd0:end-dots"], 0)), f = cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(c, f);
        a[6] = e;
        a[2] = f;
        a[1] = 7;
        return"\ufdd0:recur"
      }
      return 7 === e ? (a[7] = a[2], cljs.core.async.impl.ioc_helpers.take_BANG_(a, 9, b)) : 6 === e ? (a[2] = null, a[1] = 7, "\ufdd0:recur") : 5 === e ? (e = a[5], e = d.cljs$core$IFn$_invoke$arity$1 ? d.cljs$core$IFn$_invoke$arity$1(e) : d.call(null, e), cljs.core.async.impl.ioc_helpers.take_BANG_(a, 8, e)) : 4 === e ? (e = a[2], cljs.core.async.impl.ioc_helpers.return_chan(a, e)) : 3 === e ? (e = a[5], e = cljs.core.first(e), e = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(e, "\ufdd0:draw"), 
      a[1] = e ? 5 : 6, "\ufdd0:recur") : 2 === e ? (e = a[2], a[5] = e, a[2] = null, a[1] = 3, "\ufdd0:recur") : 1 === e ? cljs.core.async.impl.ioc_helpers.take_BANG_(a, 2, b) : null
    }, h = null, i = function() {
      var a = Array(8);
      a[0] = h;
      a[1] = 1;
      return a
    }, j = function(a) {
      for(;;) {
        var b = g(a);
        if("\ufdd0:recur" !== b) {
          return b
        }
      }
    }, h = function(a) {
      switch(arguments.length) {
        case 0:
          return i.call(this);
        case 1:
          return j.call(this, a)
      }
      throw Error("Invalid arity: " + arguments.length);
    };
    h.cljs$core$IFn$_invoke$arity$0 = i;
    h.cljs$core$IFn$_invoke$arity$1 = j;
    a = h;
    a = a.cljs$core$IFn$_invoke$arity$0 ? a.cljs$core$IFn$_invoke$arity$0() : a.call(null);
    a[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = e;
    return cljs.core.async.impl.ioc_helpers.run_state_machine(a)
  });
  return c
};
dots_game.ex3.log_loop = function(a) {
  var b = dots_game.ex3.dot_chan(a);
  dots_game.ex2.render_example_board(a);
  var c = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(1);
  cljs.core.async.impl.dispatch.run(function() {
    var d, e = function(c) {
      var d = c[1];
      if(4 === d) {
        var d = c[5], e = cljs.core.prn_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([c[2]], 0)), e = cljs.core.vector.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq(["\ufdd0:div", e], 0)), e = crate.core.html.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([e], 0)), d = d.prepend(e);
        c[6] = d;
        c[2] = null;
        c[1] = 2;
        return"\ufdd0:recur"
      }
      return 3 === d ? (d = c[2], cljs.core.async.impl.ioc_helpers.return_chan(c, d)) : 2 === d ? (d = [cljs.core.str(a), cljs.core.str("-log")].join(""), d = jayq.core.$.cljs$core$IFn$_invoke$arity$1(d), c[5] = d, cljs.core.async.impl.ioc_helpers.take_BANG_(c, 4, b)) : 1 === d ? (c[2] = null, c[1] = 2, "\ufdd0:recur") : null
    }, f = null, g = function() {
      var a = Array(7);
      a[0] = f;
      a[1] = 1;
      return a
    }, h = function(a) {
      for(;;) {
        var b = e(a);
        if("\ufdd0:recur" !== b) {
          return b
        }
      }
    }, f = function(a) {
      switch(arguments.length) {
        case 0:
          return g.call(this);
        case 1:
          return h.call(this, a)
      }
      throw Error("Invalid arity: " + arguments.length);
    };
    f.cljs$core$IFn$_invoke$arity$0 = g;
    f.cljs$core$IFn$_invoke$arity$1 = h;
    d = f;
    d = d.cljs$core$IFn$_invoke$arity$0 ? d.cljs$core$IFn$_invoke$arity$0() : d.call(null);
    d[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c;
    return cljs.core.async.impl.ioc_helpers.run_state_machine(d)
  });
  return c
};
dots_game.ex4 = {};
dots_game.ex4.create_dots = function(a) {
  return cljs.core.map_indexed(dots_game.ex2.create_dot, dots_game.ex2.get_rand_colors(a))
};
dots_game.ex4.initial_state = function() {
  return cljs.core.PersistentArrayMap.fromArray(["\ufdd0:board", dots_game.ex4.create_dots(dots_game.ex2.board_size), "\ufdd0:dot-chain", cljs.core.PersistentVector.EMPTY], !0)
};
dots_game.ex4.add_dots_to_board = function(a, b) {
  return cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(function(b) {
    return jayq.core.append(jayq.core.$.cljs$core$IFn$_invoke$arity$1(a), (new cljs.core.Keyword("\ufdd0:elem")).call(null, b))
  }, b)
};
dots_game.ex4.move_dot_to_pos = function(a, b) {
  var c = dots_game.ex2.dot_pos_to_corner_position(b), d = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(c, 0, null), c = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(c, 1, null);
  return jayq.core.css.cljs$core$IFn$_invoke$arity$2(jayq.core.$.cljs$core$IFn$_invoke$arity$1(a.cljs$core$IFn$_invoke$arity$1 ? a.cljs$core$IFn$_invoke$arity$1("\ufdd0:elem") : a.call(null, "\ufdd0:elem")), cljs.core.PersistentArrayMap.fromArray(["\ufdd0:top", d, "\ufdd0:left", c], !0))
};
dots_game.ex4.move_dots_to_new_positions = function(a) {
  var b = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(1);
  cljs.core.async.impl.dispatch.run(function() {
    var c, d = function(b) {
      var c = b[1];
      if(1 === c) {
        var d = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(a, 0, null), e = cljs.core.nthnext(a, 1), c = a;
        b[5] = c;
        b[6] = 0;
        b[7] = e;
        b[8] = d;
        b[2] = null;
        b[1] = 2;
        return"\ufdd0:recur"
      }
      return 2 === c ? (d = b[9], c = b[5], e = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(c, 0, null), d = cljs.core.nthnext(c, 1), c = cljs.core.not(null == e), b[9] = e, b[10] = d, b[1] = c ? 4 : 5, "\ufdd0:recur") : 3 === c ? (c = b[2], cljs.core.async.impl.ioc_helpers.return_chan(b, c)) : 4 === c ? (d = b[9], c = b[6], d = d.cljs$core$IFn$_invoke$arity$1 ? d.cljs$core$IFn$_invoke$arity$1("\ufdd0:pos") : d.call(null, "\ufdd0:pos"), c = cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(d, c), b[1] = 
      c ? 7 : 8, "\ufdd0:recur") : 5 === c ? (b[2] = null, b[1] = 6, "\ufdd0:recur") : 6 === c ? (c = b[2], b[2] = c, b[1] = 3, "\ufdd0:recur") : 7 === c ? (d = b[9], c = b[6], c = dots_game.ex4.move_dot_to_pos(d, c), d = cljs.core.async.timeout(100), b[11] = c, cljs.core.async.impl.ioc_helpers.take_BANG_(b, 10, d)) : 8 === c ? (b[2] = null, b[1] = 9, "\ufdd0:recur") : 9 === c ? (d = b[10], c = b[6], e = b[2], b[5] = d, b[12] = e, b[6] = c + 1, b[2] = null, b[1] = 2, "\ufdd0:recur") : 10 === c ? 
      (c = b[2], b[2] = c, b[1] = 9, "\ufdd0:recur") : null
    }, e = null, f = function() {
      var a = Array(13);
      a[0] = e;
      a[1] = 1;
      return a
    }, g = function(a) {
      for(;;) {
        var b = d(a);
        if("\ufdd0:recur" !== b) {
          return b
        }
      }
    }, e = function(a) {
      switch(arguments.length) {
        case 0:
          return f.call(this);
        case 1:
          return g.call(this, a)
      }
      throw Error("Invalid arity: " + arguments.length);
    };
    e.cljs$core$IFn$_invoke$arity$0 = f;
    e.cljs$core$IFn$_invoke$arity$1 = g;
    c = e;
    c = c.cljs$core$IFn$_invoke$arity$0 ? c.cljs$core$IFn$_invoke$arity$0() : c.call(null);
    c[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = b;
    return cljs.core.async.impl.ioc_helpers.run_state_machine(c)
  });
  return b
};
dots_game.ex4.update_positions = function(a) {
  return cljs.core.vec(cljs.core.map_indexed(function(a, c) {
    return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(c, "\ufdd0:pos", a)
  }, a))
};
dots_game.ex4.remove_dots_from_dom = function(a) {
  for(var a = cljs.core.seq(a), b = null, c = 0, d = 0;;) {
    if(d < c) {
      var e = b.cljs$core$IIndexed$_nth$arity$2(b, d), f = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(1);
      cljs.core.async.impl.dispatch.run(function(a, b, c, d, e, f) {
        return function() {
          var a, b = null, c = function() {
            var a = Array(8);
            a[0] = b;
            a[1] = 1;
            return a
          }, d = function(a) {
            for(;;) {
              var b;
              b = a;
              var c = b[1];
              if(2 === c) {
                var d = b[2], e = b[5].remove(), c = void 0;
                b[6] = d;
                c = b;
                b = cljs.core.async.impl.ioc_helpers.return_chan(c, e)
              }else {
                1 === c ? (c = f.cljs$core$IFn$_invoke$arity$1 ? f.cljs$core$IFn$_invoke$arity$1("\ufdd0:elem") : f.call(null, "\ufdd0:elem"), c = jayq.core.$.cljs$core$IFn$_invoke$arity$1(c), e = c.addClass("scale-out"), d = cljs.core.async.timeout(150), b[7] = e, b[5] = c, c = b, b = cljs.core.async.impl.ioc_helpers.take_BANG_(c, 2, d)) : b = null
              }
              if("\ufdd0:recur" !== b) {
                return b
              }
            }
          }, b = function(a) {
            switch(arguments.length) {
              case 0:
                return c.call(this);
              case 1:
                return d.call(this, a)
            }
            throw Error("Invalid arity: " + arguments.length);
          };
          b.cljs$core$IFn$_invoke$arity$0 = c;
          b.cljs$core$IFn$_invoke$arity$1 = d;
          a = b;
          a = a.cljs$core$IFn$_invoke$arity$0 ? a.cljs$core$IFn$_invoke$arity$0() : a.call(null);
          a[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = e;
          return cljs.core.async.impl.ioc_helpers.run_state_machine(a)
        }
      }(a, b, c, d, f, e));
      d += 1
    }else {
      var g = cljs.core.seq(a);
      if(g) {
        f = g;
        if(cljs.core.chunked_seq_QMARK_(f)) {
          a = cljs.core.chunk_first(f), d = cljs.core.chunk_rest(f), b = a, c = cljs.core.count(a), a = d
        }else {
          var e = cljs.core.first(f), h = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(1);
          cljs.core.async.impl.dispatch.run(function(a, b, c, d, e, f) {
            return function() {
              var a, b = null, c = function() {
                var a = Array(8);
                a[0] = b;
                a[1] = 1;
                return a
              }, d = function(a) {
                for(;;) {
                  var b;
                  b = a;
                  var c = b[1];
                  if(2 === c) {
                    var d = b[2], e = b[5].remove(), c = void 0;
                    b[6] = d;
                    c = b;
                    b = cljs.core.async.impl.ioc_helpers.return_chan(c, e)
                  }else {
                    1 === c ? (c = f.cljs$core$IFn$_invoke$arity$1 ? f.cljs$core$IFn$_invoke$arity$1("\ufdd0:elem") : f.call(null, "\ufdd0:elem"), c = jayq.core.$.cljs$core$IFn$_invoke$arity$1(c), e = c.addClass("scale-out"), d = cljs.core.async.timeout(150), b[7] = e, b[5] = c, c = b, b = cljs.core.async.impl.ioc_helpers.take_BANG_(c, 2, d)) : b = null
                  }
                  if("\ufdd0:recur" !== b) {
                    return b
                  }
                }
              }, b = function(a) {
                switch(arguments.length) {
                  case 0:
                    return c.call(this);
                  case 1:
                    return d.call(this, a)
                }
                throw Error("Invalid arity: " + arguments.length);
              };
              b.cljs$core$IFn$_invoke$arity$0 = c;
              b.cljs$core$IFn$_invoke$arity$1 = d;
              a = b;
              a = a.cljs$core$IFn$_invoke$arity$0 ? a.cljs$core$IFn$_invoke$arity$0() : a.call(null);
              a[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = e;
              return cljs.core.async.impl.ioc_helpers.run_state_machine(a)
            }
          }(a, b, c, d, h, e, f, g));
          a = cljs.core.next(f);
          b = null;
          c = 0
        }
        d = 0
      }else {
        return null
      }
    }
  }
};
dots_game.ex4.remove_dots = function(a) {
  var a = cljs.core.seq_QMARK_(a) ? cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map, a) : a, b = cljs.core.get.cljs$core$IFn$_invoke$arity$2(a, "\ufdd0:dot-chain"), c = cljs.core.set(b), b = cljs.core.keep_indexed(function(a) {
    return function(b, c) {
      return cljs.core.truth_(a.cljs$core$IFn$_invoke$arity$1 ? a.cljs$core$IFn$_invoke$arity$1(b) : a.call(null, b)) ? c : null
    }
  }(c), a.cljs$core$IFn$_invoke$arity$1 ? a.cljs$core$IFn$_invoke$arity$1("\ufdd0:board") : a.call(null, "\ufdd0:board")), c = cljs.core.keep_indexed(function(a) {
    return function(b, c) {
      return cljs.core.not(a.cljs$core$IFn$_invoke$arity$1 ? a.cljs$core$IFn$_invoke$arity$1(b) : a.call(null, b)) ? c : null
    }
  }(c, b), a.cljs$core$IFn$_invoke$arity$1 ? a.cljs$core$IFn$_invoke$arity$1("\ufdd0:board") : a.call(null, "\ufdd0:board"));
  dots_game.ex4.remove_dots_from_dom(b);
  dots_game.ex4.move_dots_to_new_positions(c);
  return cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(a, "\ufdd0:board", dots_game.ex4.update_positions(c), cljs.core.array_seq(["\ufdd0:dot-chain", cljs.core.PersistentVector.EMPTY], 0))
};
dots_game.ex4.render_updates = function(a) {
  return 0 < cljs.core.count(a.cljs$core$IFn$_invoke$arity$1 ? a.cljs$core$IFn$_invoke$arity$1("\ufdd0:dot-chain") : a.call(null, "\ufdd0:dot-chain")) ? dots_game.ex4.remove_dots(a) : a
};
dots_game.ex4.get_dot_chain = function(a, b) {
  var c = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(1);
  cljs.core.async.impl.dispatch.run(function() {
    var d, e = function(c) {
      var d = c[1];
      if(7 === d) {
        var d = c[5], e = c[2];
        c[6] = e;
        c[7] = d;
        c[2] = null;
        c[1] = 2;
        return"\ufdd0:recur"
      }
      return 6 === d ? (d = c[2], c[2] = d, c[1] = 3, "\ufdd0:recur") : 5 === d ? (e = c[6], d = c[7], e = cljs.core.last(e), d = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(d, e), c[5] = d, cljs.core.async.impl.ioc_helpers.take_BANG_(c, 7, a)) : 4 === d ? (d = c[7], c[2] = d, c[1] = 6, "\ufdd0:recur") : 3 === d ? (d = c[2], cljs.core.async.impl.ioc_helpers.return_chan(c, d)) : 2 === d ? (e = c[6], d = cljs.core.first(e), d = cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2("\ufdd0:dot-pos", d), 
      c[1] = d ? 4 : 5, "\ufdd0:recur") : 1 === d ? (d = cljs.core.vector(), e = b, c[6] = e, c[7] = d, c[2] = null, c[1] = 2, "\ufdd0:recur") : null
    }, f = null, g = function() {
      var a = Array(8);
      a[0] = f;
      a[1] = 1;
      return a
    }, h = function(a) {
      for(;;) {
        var b = e(a);
        if("\ufdd0:recur" !== b) {
          return b
        }
      }
    }, f = function(a) {
      switch(arguments.length) {
        case 0:
          return g.call(this);
        case 1:
          return h.call(this, a)
      }
      throw Error("Invalid arity: " + arguments.length);
    };
    f.cljs$core$IFn$_invoke$arity$0 = g;
    f.cljs$core$IFn$_invoke$arity$1 = h;
    d = f;
    d = d.cljs$core$IFn$_invoke$arity$0 ? d.cljs$core$IFn$_invoke$arity$0() : d.call(null);
    d[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c;
    return cljs.core.async.impl.ioc_helpers.run_state_machine(d)
  });
  return c
};
dots_game.ex4.dot_chain_getter = function(a) {
  var b = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(1);
  cljs.core.async.impl.dispatch.run(function() {
    var c, d = function(b) {
      var c = b[1];
      return 9 === c ? (c = b[2], b[5] = c, b[2] = null, b[1] = 3, "\ufdd0:recur") : 8 === c ? (c = b[2], b[2] = c, b[1] = 7, "\ufdd0:recur") : 7 === c ? (c = b[2], b[2] = c, b[1] = 4, "\ufdd0:recur") : 6 === c ? cljs.core.async.impl.ioc_helpers.take_BANG_(b, 9, a) : 5 === c ? (c = b[5], c = dots_game.ex4.get_dot_chain(a, c), cljs.core.async.impl.ioc_helpers.take_BANG_(b, 8, c)) : 4 === c ? (c = b[2], cljs.core.async.impl.ioc_helpers.return_chan(b, c)) : 3 === c ? (c = b[5], c = cljs.core.first(c), 
      c = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("\ufdd0:dot-pos", c), b[1] = c ? 5 : 6, "\ufdd0:recur") : 2 === c ? (c = b[2], b[5] = c, b[2] = null, b[1] = 3, "\ufdd0:recur") : 1 === c ? cljs.core.async.impl.ioc_helpers.take_BANG_(b, 2, a) : null
    }, e = null, f = function() {
      var a = Array(6);
      a[0] = e;
      a[1] = 1;
      return a
    }, g = function(a) {
      for(;;) {
        var b = d(a);
        if("\ufdd0:recur" !== b) {
          return b
        }
      }
    }, e = function(a) {
      switch(arguments.length) {
        case 0:
          return f.call(this);
        case 1:
          return g.call(this, a)
      }
      throw Error("Invalid arity: " + arguments.length);
    };
    e.cljs$core$IFn$_invoke$arity$0 = f;
    e.cljs$core$IFn$_invoke$arity$1 = g;
    c = e;
    c = c.cljs$core$IFn$_invoke$arity$0 ? c.cljs$core$IFn$_invoke$arity$0() : c.call(null);
    c[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = b;
    return cljs.core.async.impl.ioc_helpers.run_state_machine(c)
  });
  return b
};
dots_game.ex4.game_loop = function(a, b) {
  var c = dots_game.ex3.dot_chan(a);
  dots_game.ex4.add_dots_to_board(a, b.cljs$core$IFn$_invoke$arity$1 ? b.cljs$core$IFn$_invoke$arity$1("\ufdd0:board") : b.call(null, "\ufdd0:board"));
  var d = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(1);
  cljs.core.async.impl.dispatch.run(function() {
    var a, f = function(a) {
      var d = a[1];
      return 4 === d ? (d = a[5], d = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(d, "\ufdd0:dot-chain", a[2]), d = dots_game.ex4.render_updates(d), a[5] = d, a[2] = null, a[1] = 2, "\ufdd0:recur") : 3 === d ? (d = a[2], cljs.core.async.impl.ioc_helpers.return_chan(a, d)) : 2 === d ? (d = dots_game.ex4.dot_chain_getter(c), cljs.core.async.impl.ioc_helpers.take_BANG_(a, 4, d)) : 1 === d ? (d = b, a[5] = d, a[2] = null, a[1] = 2, "\ufdd0:recur") : null
    }, g = null, h = function() {
      var a = Array(6);
      a[0] = g;
      a[1] = 1;
      return a
    }, i = function(a) {
      for(;;) {
        var b = f(a);
        if("\ufdd0:recur" !== b) {
          return b
        }
      }
    }, g = function(a) {
      switch(arguments.length) {
        case 0:
          return h.call(this);
        case 1:
          return i.call(this, a)
      }
      throw Error("Invalid arity: " + arguments.length);
    };
    g.cljs$core$IFn$_invoke$arity$0 = h;
    g.cljs$core$IFn$_invoke$arity$1 = i;
    a = g;
    a = a.cljs$core$IFn$_invoke$arity$0 ? a.cljs$core$IFn$_invoke$arity$0() : a.call(null);
    a[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = d;
    return cljs.core.async.impl.ioc_helpers.run_state_machine(a)
  });
  return d
};
dots_game.ex4.example_4 = function(a) {
  return dots_game.ex4.game_loop(a, dots_game.ex4.initial_state(a))
};
dots_game.ex5 = {};
dots_game.ex5.create_dots = function(a) {
  return cljs.core.map_indexed(dots_game.ex2.create_dot, dots_game.ex2.get_rand_colors(a))
};
dots_game.ex5.initial_state = function(a) {
  return cljs.core.PersistentArrayMap.fromArray(["\ufdd0:board", dots_game.ex5.create_dots(dots_game.ex2.board_size), "\ufdd0:dot-chain", cljs.core.PersistentVector.EMPTY, "\ufdd0:selector", a], !0)
};
dots_game.ex5.add_dots_to_board = function(a, b) {
  return cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(function(b) {
    return jayq.core.append(jayq.core.$.cljs$core$IFn$_invoke$arity$1(a), (new cljs.core.Keyword("\ufdd0:elem")).call(null, b))
  }, b)
};
dots_game.ex5.move_dot_to_pos = function(a, b) {
  var c = dots_game.ex2.dot_pos_to_corner_position(b), d = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(c, 0, null), c = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(c, 1, null);
  return jayq.core.css.cljs$core$IFn$_invoke$arity$2(jayq.core.$.cljs$core$IFn$_invoke$arity$1(a.cljs$core$IFn$_invoke$arity$1 ? a.cljs$core$IFn$_invoke$arity$1("\ufdd0:elem") : a.call(null, "\ufdd0:elem")), cljs.core.PersistentArrayMap.fromArray(["\ufdd0:top", d, "\ufdd0:left", c], !0))
};
dots_game.ex5.move_dots_to_new_positions = function(a) {
  var b = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(1);
  cljs.core.async.impl.dispatch.run(function() {
    var c, d = function(b) {
      var c = b[1];
      if(1 === c) {
        var d = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(a, 0, null), e = cljs.core.nthnext(a, 1), c = a;
        b[5] = c;
        b[6] = d;
        b[7] = e;
        b[8] = 0;
        b[2] = null;
        b[1] = 2;
        return"\ufdd0:recur"
      }
      return 2 === c ? (c = b[5], d = b[9], e = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(c, 0, null), d = cljs.core.nthnext(c, 1), c = cljs.core.not(null == e), b[10] = d, b[9] = e, b[1] = c ? 4 : 5, "\ufdd0:recur") : 3 === c ? (c = b[2], cljs.core.async.impl.ioc_helpers.return_chan(b, c)) : 4 === c ? (c = b[8], d = b[9], d = d.cljs$core$IFn$_invoke$arity$1 ? d.cljs$core$IFn$_invoke$arity$1("\ufdd0:pos") : d.call(null, "\ufdd0:pos"), c = cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(d, c), b[1] = 
      c ? 7 : 8, "\ufdd0:recur") : 5 === c ? (b[2] = null, b[1] = 6, "\ufdd0:recur") : 6 === c ? (c = b[2], b[2] = c, b[1] = 3, "\ufdd0:recur") : 7 === c ? (c = b[8], d = b[9], c = dots_game.ex5.move_dot_to_pos(d, c), d = cljs.core.async.timeout(100), b[11] = c, cljs.core.async.impl.ioc_helpers.take_BANG_(b, 10, d)) : 8 === c ? (b[2] = null, b[1] = 9, "\ufdd0:recur") : 9 === c ? (d = b[10], c = b[8], e = b[2], b[5] = d, b[12] = e, b[8] = c + 1, b[2] = null, b[1] = 2, "\ufdd0:recur") : 10 === c ? 
      (c = b[2], b[2] = c, b[1] = 9, "\ufdd0:recur") : null
    }, e = null, f = function() {
      var a = Array(13);
      a[0] = e;
      a[1] = 1;
      return a
    }, g = function(a) {
      for(;;) {
        var b = d(a);
        if("\ufdd0:recur" !== b) {
          return b
        }
      }
    }, e = function(a) {
      switch(arguments.length) {
        case 0:
          return f.call(this);
        case 1:
          return g.call(this, a)
      }
      throw Error("Invalid arity: " + arguments.length);
    };
    e.cljs$core$IFn$_invoke$arity$0 = f;
    e.cljs$core$IFn$_invoke$arity$1 = g;
    c = e;
    c = c.cljs$core$IFn$_invoke$arity$0 ? c.cljs$core$IFn$_invoke$arity$0() : c.call(null);
    c[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = b;
    return cljs.core.async.impl.ioc_helpers.run_state_machine(c)
  });
  return b
};
dots_game.ex5.update_positions = function(a) {
  return cljs.core.vec(cljs.core.map_indexed(function(a, c) {
    return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(c, "\ufdd0:pos", a)
  }, a))
};
dots_game.ex5.remove_dots_from_dom = function(a) {
  for(var a = cljs.core.seq(a), b = null, c = 0, d = 0;;) {
    if(d < c) {
      var e = b.cljs$core$IIndexed$_nth$arity$2(b, d), f = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(1);
      cljs.core.async.impl.dispatch.run(function(a, b, c, d, e, f) {
        return function() {
          var a, b = null, c = function() {
            var a = Array(8);
            a[0] = b;
            a[1] = 1;
            return a
          }, d = function(a) {
            for(;;) {
              var b;
              b = a;
              var c = b[1];
              if(2 === c) {
                var d = b[2], e = b[5].remove(), c = void 0;
                b[6] = d;
                c = b;
                b = cljs.core.async.impl.ioc_helpers.return_chan(c, e)
              }else {
                1 === c ? (c = f.cljs$core$IFn$_invoke$arity$1 ? f.cljs$core$IFn$_invoke$arity$1("\ufdd0:elem") : f.call(null, "\ufdd0:elem"), c = jayq.core.$.cljs$core$IFn$_invoke$arity$1(c), e = c.addClass("scale-out"), d = cljs.core.async.timeout(150), b[7] = e, b[5] = c, c = b, b = cljs.core.async.impl.ioc_helpers.take_BANG_(c, 2, d)) : b = null
              }
              if("\ufdd0:recur" !== b) {
                return b
              }
            }
          }, b = function(a) {
            switch(arguments.length) {
              case 0:
                return c.call(this);
              case 1:
                return d.call(this, a)
            }
            throw Error("Invalid arity: " + arguments.length);
          };
          b.cljs$core$IFn$_invoke$arity$0 = c;
          b.cljs$core$IFn$_invoke$arity$1 = d;
          a = b;
          a = a.cljs$core$IFn$_invoke$arity$0 ? a.cljs$core$IFn$_invoke$arity$0() : a.call(null);
          a[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = e;
          return cljs.core.async.impl.ioc_helpers.run_state_machine(a)
        }
      }(a, b, c, d, f, e));
      d += 1
    }else {
      var g = cljs.core.seq(a);
      if(g) {
        f = g;
        if(cljs.core.chunked_seq_QMARK_(f)) {
          a = cljs.core.chunk_first(f), d = cljs.core.chunk_rest(f), b = a, c = cljs.core.count(a), a = d
        }else {
          var e = cljs.core.first(f), h = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(1);
          cljs.core.async.impl.dispatch.run(function(a, b, c, d, e, f) {
            return function() {
              var a, b = null, c = function() {
                var a = Array(8);
                a[0] = b;
                a[1] = 1;
                return a
              }, d = function(a) {
                for(;;) {
                  var b;
                  b = a;
                  var c = b[1];
                  if(2 === c) {
                    var d = b[2], e = b[5].remove(), c = void 0;
                    b[6] = d;
                    c = b;
                    b = cljs.core.async.impl.ioc_helpers.return_chan(c, e)
                  }else {
                    1 === c ? (c = f.cljs$core$IFn$_invoke$arity$1 ? f.cljs$core$IFn$_invoke$arity$1("\ufdd0:elem") : f.call(null, "\ufdd0:elem"), c = jayq.core.$.cljs$core$IFn$_invoke$arity$1(c), e = c.addClass("scale-out"), d = cljs.core.async.timeout(150), b[5] = c, b[7] = e, c = b, b = cljs.core.async.impl.ioc_helpers.take_BANG_(c, 2, d)) : b = null
                  }
                  if("\ufdd0:recur" !== b) {
                    return b
                  }
                }
              }, b = function(a) {
                switch(arguments.length) {
                  case 0:
                    return c.call(this);
                  case 1:
                    return d.call(this, a)
                }
                throw Error("Invalid arity: " + arguments.length);
              };
              b.cljs$core$IFn$_invoke$arity$0 = c;
              b.cljs$core$IFn$_invoke$arity$1 = d;
              a = b;
              a = a.cljs$core$IFn$_invoke$arity$0 ? a.cljs$core$IFn$_invoke$arity$0() : a.call(null);
              a[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = e;
              return cljs.core.async.impl.ioc_helpers.run_state_machine(a)
            }
          }(a, b, c, d, h, e, f, g));
          a = cljs.core.next(f);
          b = null;
          c = 0
        }
        d = 0
      }else {
        return null
      }
    }
  }
};
dots_game.ex5.remove_dots = function(a) {
  var a = cljs.core.seq_QMARK_(a) ? cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map, a) : a, b = cljs.core.get.cljs$core$IFn$_invoke$arity$2(a, "\ufdd0:dot-chain"), c = cljs.core.set(b), b = cljs.core.keep_indexed(function(a) {
    return function(b, c) {
      return cljs.core.truth_(a.cljs$core$IFn$_invoke$arity$1 ? a.cljs$core$IFn$_invoke$arity$1(b) : a.call(null, b)) ? c : null
    }
  }(c), a.cljs$core$IFn$_invoke$arity$1 ? a.cljs$core$IFn$_invoke$arity$1("\ufdd0:board") : a.call(null, "\ufdd0:board")), c = cljs.core.keep_indexed(function(a) {
    return function(b, c) {
      return cljs.core.not(a.cljs$core$IFn$_invoke$arity$1 ? a.cljs$core$IFn$_invoke$arity$1(b) : a.call(null, b)) ? c : null
    }
  }(c, b), a.cljs$core$IFn$_invoke$arity$1 ? a.cljs$core$IFn$_invoke$arity$1("\ufdd0:board") : a.call(null, "\ufdd0:board"));
  dots_game.ex5.remove_dots_from_dom(b);
  dots_game.ex5.move_dots_to_new_positions(c);
  return cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(a, "\ufdd0:board", dots_game.ex5.update_positions(c), cljs.core.array_seq(["\ufdd0:dot-chain", cljs.core.PersistentVector.EMPTY], 0))
};
dots_game.ex5.add_dots = function(a) {
  var b = dots_game.ex2.board_size - cljs.core.count(a.cljs$core$IFn$_invoke$arity$1 ? a.cljs$core$IFn$_invoke$arity$1("\ufdd0:board") : a.call(null, "\ufdd0:board")), b = cljs.core.map.cljs$core$IFn$_invoke$arity$3(dots_game.ex2.create_dot, cljs.core.repeat.cljs$core$IFn$_invoke$arity$1(8), dots_game.ex2.get_rand_colors(b)), c = cljs.core.concat.cljs$core$IFn$_invoke$arity$2(a.cljs$core$IFn$_invoke$arity$1 ? a.cljs$core$IFn$_invoke$arity$1("\ufdd0:board") : a.call(null, "\ufdd0:board"), b);
  dots_game.ex5.add_dots_to_board(a.cljs$core$IFn$_invoke$arity$1 ? a.cljs$core$IFn$_invoke$arity$1("\ufdd0:selector") : a.call(null, "\ufdd0:selector"), b);
  var d = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(1);
  cljs.core.async.impl.dispatch.run(function() {
    var a, b = null, g = function() {
      var a = Array(6);
      a[0] = b;
      a[1] = 1;
      return a
    }, h = function(a) {
      for(;;) {
        var b;
        b = a;
        var d = b[1];
        if(2 === d) {
          var e = b[2], f = dots_game.ex5.move_dots_to_new_positions(c), d = void 0;
          b[5] = e;
          d = b;
          b = cljs.core.async.impl.ioc_helpers.return_chan(d, f)
        }else {
          1 === d ? (e = cljs.core.async.timeout(500), d = b, b = cljs.core.async.impl.ioc_helpers.take_BANG_(d, 2, e)) : b = null
        }
        if("\ufdd0:recur" !== b) {
          return b
        }
      }
    }, b = function(a) {
      switch(arguments.length) {
        case 0:
          return g.call(this);
        case 1:
          return h.call(this, a)
      }
      throw Error("Invalid arity: " + arguments.length);
    };
    b.cljs$core$IFn$_invoke$arity$0 = g;
    b.cljs$core$IFn$_invoke$arity$1 = h;
    a = b;
    a = a.cljs$core$IFn$_invoke$arity$0 ? a.cljs$core$IFn$_invoke$arity$0() : a.call(null);
    a[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = d;
    return cljs.core.async.impl.ioc_helpers.run_state_machine(a)
  });
  return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(a, "\ufdd0:board", dots_game.ex5.update_positions(c))
};
dots_game.ex5.render_updates = function(a) {
  return 0 < cljs.core.count(a.cljs$core$IFn$_invoke$arity$1 ? a.cljs$core$IFn$_invoke$arity$1("\ufdd0:dot-chain") : a.call(null, "\ufdd0:dot-chain")) ? dots_game.ex5.add_dots(dots_game.ex5.remove_dots(a)) : a
};
dots_game.ex5.get_dot_chain = function(a, b) {
  var c = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(1);
  cljs.core.async.impl.dispatch.run(function() {
    var d, e = function(c) {
      var d = c[1];
      if(7 === d) {
        var d = c[5], e = c[2];
        c[6] = d;
        c[7] = e;
        c[2] = null;
        c[1] = 2;
        return"\ufdd0:recur"
      }
      return 6 === d ? (d = c[2], c[2] = d, c[1] = 3, "\ufdd0:recur") : 5 === d ? (d = c[6], e = c[7], e = cljs.core.last(e), d = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(d, e), c[5] = d, cljs.core.async.impl.ioc_helpers.take_BANG_(c, 7, a)) : 4 === d ? (d = c[6], c[2] = d, c[1] = 6, "\ufdd0:recur") : 3 === d ? (d = c[2], cljs.core.async.impl.ioc_helpers.return_chan(c, d)) : 2 === d ? (e = c[7], d = cljs.core.first(e), d = cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2("\ufdd0:dot-pos", d), 
      c[1] = d ? 4 : 5, "\ufdd0:recur") : 1 === d ? (d = cljs.core.vector(), e = b, c[6] = d, c[7] = e, c[2] = null, c[1] = 2, "\ufdd0:recur") : null
    }, f = null, g = function() {
      var a = Array(8);
      a[0] = f;
      a[1] = 1;
      return a
    }, h = function(a) {
      for(;;) {
        var b = e(a);
        if("\ufdd0:recur" !== b) {
          return b
        }
      }
    }, f = function(a) {
      switch(arguments.length) {
        case 0:
          return g.call(this);
        case 1:
          return h.call(this, a)
      }
      throw Error("Invalid arity: " + arguments.length);
    };
    f.cljs$core$IFn$_invoke$arity$0 = g;
    f.cljs$core$IFn$_invoke$arity$1 = h;
    d = f;
    d = d.cljs$core$IFn$_invoke$arity$0 ? d.cljs$core$IFn$_invoke$arity$0() : d.call(null);
    d[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c;
    return cljs.core.async.impl.ioc_helpers.run_state_machine(d)
  });
  return c
};
dots_game.ex5.dot_chain_getter = function(a) {
  var b = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(1);
  cljs.core.async.impl.dispatch.run(function() {
    var c, d = function(b) {
      var c = b[1];
      return 9 === c ? (c = b[2], b[5] = c, b[2] = null, b[1] = 3, "\ufdd0:recur") : 8 === c ? (c = b[2], b[2] = c, b[1] = 7, "\ufdd0:recur") : 7 === c ? (c = b[2], b[2] = c, b[1] = 4, "\ufdd0:recur") : 6 === c ? cljs.core.async.impl.ioc_helpers.take_BANG_(b, 9, a) : 5 === c ? (c = b[5], c = dots_game.ex5.get_dot_chain(a, c), cljs.core.async.impl.ioc_helpers.take_BANG_(b, 8, c)) : 4 === c ? (c = b[2], cljs.core.async.impl.ioc_helpers.return_chan(b, c)) : 3 === c ? (c = b[5], c = cljs.core.first(c), 
      c = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("\ufdd0:dot-pos", c), b[1] = c ? 5 : 6, "\ufdd0:recur") : 2 === c ? (c = b[2], b[5] = c, b[2] = null, b[1] = 3, "\ufdd0:recur") : 1 === c ? cljs.core.async.impl.ioc_helpers.take_BANG_(b, 2, a) : null
    }, e = null, f = function() {
      var a = Array(6);
      a[0] = e;
      a[1] = 1;
      return a
    }, g = function(a) {
      for(;;) {
        var b = d(a);
        if("\ufdd0:recur" !== b) {
          return b
        }
      }
    }, e = function(a) {
      switch(arguments.length) {
        case 0:
          return f.call(this);
        case 1:
          return g.call(this, a)
      }
      throw Error("Invalid arity: " + arguments.length);
    };
    e.cljs$core$IFn$_invoke$arity$0 = f;
    e.cljs$core$IFn$_invoke$arity$1 = g;
    c = e;
    c = c.cljs$core$IFn$_invoke$arity$0 ? c.cljs$core$IFn$_invoke$arity$0() : c.call(null);
    c[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = b;
    return cljs.core.async.impl.ioc_helpers.run_state_machine(c)
  });
  return b
};
dots_game.ex5.game_loop = function(a, b) {
  var c = dots_game.ex3.dot_chan(a);
  dots_game.ex5.add_dots_to_board(a, b.cljs$core$IFn$_invoke$arity$1 ? b.cljs$core$IFn$_invoke$arity$1("\ufdd0:board") : b.call(null, "\ufdd0:board"));
  var d = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(1);
  cljs.core.async.impl.dispatch.run(function() {
    var a, f = function(a) {
      var d = a[1];
      return 4 === d ? (d = a[5], d = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(d, "\ufdd0:dot-chain", a[2]), d = dots_game.ex5.render_updates(d), a[5] = d, a[2] = null, a[1] = 2, "\ufdd0:recur") : 3 === d ? (d = a[2], cljs.core.async.impl.ioc_helpers.return_chan(a, d)) : 2 === d ? (d = dots_game.ex5.dot_chain_getter(c), cljs.core.async.impl.ioc_helpers.take_BANG_(a, 4, d)) : 1 === d ? (d = b, a[5] = d, a[2] = null, a[1] = 2, "\ufdd0:recur") : null
    }, g = null, h = function() {
      var a = Array(6);
      a[0] = g;
      a[1] = 1;
      return a
    }, i = function(a) {
      for(;;) {
        var b = f(a);
        if("\ufdd0:recur" !== b) {
          return b
        }
      }
    }, g = function(a) {
      switch(arguments.length) {
        case 0:
          return h.call(this);
        case 1:
          return i.call(this, a)
      }
      throw Error("Invalid arity: " + arguments.length);
    };
    g.cljs$core$IFn$_invoke$arity$0 = h;
    g.cljs$core$IFn$_invoke$arity$1 = i;
    a = g;
    a = a.cljs$core$IFn$_invoke$arity$0 ? a.cljs$core$IFn$_invoke$arity$0() : a.call(null);
    a[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = d;
    return cljs.core.async.impl.ioc_helpers.run_state_machine(a)
  });
  return d
};
dots_game.ex5.example_5 = function(a) {
  return dots_game.ex5.game_loop(a, dots_game.ex5.initial_state(a))
};
dots_game.ex6 = {};
dots_game.ex6.create_dots = function(a) {
  return cljs.core.map_indexed(dots_game.ex2.create_dot, dots_game.ex2.get_rand_colors(a))
};
dots_game.ex6.initial_state = function(a) {
  return cljs.core.PersistentArrayMap.fromArray(["\ufdd0:board", dots_game.ex6.create_dots(dots_game.ex2.board_size), "\ufdd0:dot-chain", cljs.core.PersistentVector.EMPTY, "\ufdd0:selector", a], !0)
};
dots_game.ex6.add_dots_to_board = function(a, b) {
  return cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(function(b) {
    return jayq.core.append(jayq.core.$.cljs$core$IFn$_invoke$arity$1(a), (new cljs.core.Keyword("\ufdd0:elem")).call(null, b))
  }, b)
};
dots_game.ex6.move_dot_to_pos = function(a, b) {
  var c = dots_game.ex2.dot_pos_to_corner_position(b), d = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(c, 0, null), c = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(c, 1, null);
  return jayq.core.css.cljs$core$IFn$_invoke$arity$2(jayq.core.$.cljs$core$IFn$_invoke$arity$1(a.cljs$core$IFn$_invoke$arity$1 ? a.cljs$core$IFn$_invoke$arity$1("\ufdd0:elem") : a.call(null, "\ufdd0:elem")), cljs.core.PersistentArrayMap.fromArray(["\ufdd0:top", d, "\ufdd0:left", c], !0))
};
dots_game.ex6.move_dots_to_new_positions = function(a) {
  var b = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(1);
  cljs.core.async.impl.dispatch.run(function() {
    var c, d = function(b) {
      var c = b[1];
      if(1 === c) {
        var d = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(a, 0, null), e = cljs.core.nthnext(a, 1), c = a;
        b[5] = 0;
        b[6] = c;
        b[7] = d;
        b[8] = e;
        b[2] = null;
        b[1] = 2;
        return"\ufdd0:recur"
      }
      return 2 === c ? (c = b[6], d = b[9], e = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(c, 0, null), d = cljs.core.nthnext(c, 1), c = cljs.core.not(null == e), b[10] = d, b[9] = e, b[1] = c ? 4 : 5, "\ufdd0:recur") : 3 === c ? (c = b[2], cljs.core.async.impl.ioc_helpers.return_chan(b, c)) : 4 === c ? (c = b[5], d = b[9], d = d.cljs$core$IFn$_invoke$arity$1 ? d.cljs$core$IFn$_invoke$arity$1("\ufdd0:pos") : d.call(null, "\ufdd0:pos"), c = cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(d, c), b[1] = 
      c ? 7 : 8, "\ufdd0:recur") : 5 === c ? (b[2] = null, b[1] = 6, "\ufdd0:recur") : 6 === c ? (c = b[2], b[2] = c, b[1] = 3, "\ufdd0:recur") : 7 === c ? (c = b[5], d = b[9], c = dots_game.ex6.move_dot_to_pos(d, c), d = cljs.core.async.timeout(100), b[11] = c, cljs.core.async.impl.ioc_helpers.take_BANG_(b, 10, d)) : 8 === c ? (b[2] = null, b[1] = 9, "\ufdd0:recur") : 9 === c ? (c = b[5], d = b[10], e = b[2], b[5] = c + 1, b[6] = d, b[12] = e, b[2] = null, b[1] = 2, "\ufdd0:recur") : 10 === c ? 
      (c = b[2], b[2] = c, b[1] = 9, "\ufdd0:recur") : null
    }, e = null, f = function() {
      var a = Array(13);
      a[0] = e;
      a[1] = 1;
      return a
    }, g = function(a) {
      for(;;) {
        var b = d(a);
        if("\ufdd0:recur" !== b) {
          return b
        }
      }
    }, e = function(a) {
      switch(arguments.length) {
        case 0:
          return f.call(this);
        case 1:
          return g.call(this, a)
      }
      throw Error("Invalid arity: " + arguments.length);
    };
    e.cljs$core$IFn$_invoke$arity$0 = f;
    e.cljs$core$IFn$_invoke$arity$1 = g;
    c = e;
    c = c.cljs$core$IFn$_invoke$arity$0 ? c.cljs$core$IFn$_invoke$arity$0() : c.call(null);
    c[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = b;
    return cljs.core.async.impl.ioc_helpers.run_state_machine(c)
  });
  return b
};
dots_game.ex6.update_positions = function(a) {
  return cljs.core.vec(cljs.core.map_indexed(function(a, c) {
    return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(c, "\ufdd0:pos", a)
  }, a))
};
dots_game.ex6.remove_dots_from_dom = function(a) {
  for(var a = cljs.core.seq(a), b = null, c = 0, d = 0;;) {
    if(d < c) {
      var e = b.cljs$core$IIndexed$_nth$arity$2(b, d), f = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(1);
      cljs.core.async.impl.dispatch.run(function(a, b, c, d, e, f) {
        return function() {
          var a, b = null, c = function() {
            var a = Array(8);
            a[0] = b;
            a[1] = 1;
            return a
          }, d = function(a) {
            for(;;) {
              var b;
              b = a;
              var c = b[1];
              if(2 === c) {
                var d = b[2], e = b[5].remove(), c = void 0;
                b[6] = d;
                c = b;
                b = cljs.core.async.impl.ioc_helpers.return_chan(c, e)
              }else {
                1 === c ? (c = f.cljs$core$IFn$_invoke$arity$1 ? f.cljs$core$IFn$_invoke$arity$1("\ufdd0:elem") : f.call(null, "\ufdd0:elem"), c = jayq.core.$.cljs$core$IFn$_invoke$arity$1(c), e = c.addClass("scale-out"), d = cljs.core.async.timeout(150), b[5] = c, b[7] = e, c = b, b = cljs.core.async.impl.ioc_helpers.take_BANG_(c, 2, d)) : b = null
              }
              if("\ufdd0:recur" !== b) {
                return b
              }
            }
          }, b = function(a) {
            switch(arguments.length) {
              case 0:
                return c.call(this);
              case 1:
                return d.call(this, a)
            }
            throw Error("Invalid arity: " + arguments.length);
          };
          b.cljs$core$IFn$_invoke$arity$0 = c;
          b.cljs$core$IFn$_invoke$arity$1 = d;
          a = b;
          a = a.cljs$core$IFn$_invoke$arity$0 ? a.cljs$core$IFn$_invoke$arity$0() : a.call(null);
          a[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = e;
          return cljs.core.async.impl.ioc_helpers.run_state_machine(a)
        }
      }(a, b, c, d, f, e));
      d += 1
    }else {
      var g = cljs.core.seq(a);
      if(g) {
        f = g;
        if(cljs.core.chunked_seq_QMARK_(f)) {
          a = cljs.core.chunk_first(f), d = cljs.core.chunk_rest(f), b = a, c = cljs.core.count(a), a = d
        }else {
          var e = cljs.core.first(f), h = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(1);
          cljs.core.async.impl.dispatch.run(function(a, b, c, d, e, f) {
            return function() {
              var a, b = null, c = function() {
                var a = Array(8);
                a[0] = b;
                a[1] = 1;
                return a
              }, d = function(a) {
                for(;;) {
                  var b;
                  b = a;
                  var c = b[1];
                  if(2 === c) {
                    var d = b[2], e = b[5].remove(), c = void 0;
                    b[6] = d;
                    c = b;
                    b = cljs.core.async.impl.ioc_helpers.return_chan(c, e)
                  }else {
                    1 === c ? (c = f.cljs$core$IFn$_invoke$arity$1 ? f.cljs$core$IFn$_invoke$arity$1("\ufdd0:elem") : f.call(null, "\ufdd0:elem"), c = jayq.core.$.cljs$core$IFn$_invoke$arity$1(c), e = c.addClass("scale-out"), d = cljs.core.async.timeout(150), b[7] = e, b[5] = c, c = b, b = cljs.core.async.impl.ioc_helpers.take_BANG_(c, 2, d)) : b = null
                  }
                  if("\ufdd0:recur" !== b) {
                    return b
                  }
                }
              }, b = function(a) {
                switch(arguments.length) {
                  case 0:
                    return c.call(this);
                  case 1:
                    return d.call(this, a)
                }
                throw Error("Invalid arity: " + arguments.length);
              };
              b.cljs$core$IFn$_invoke$arity$0 = c;
              b.cljs$core$IFn$_invoke$arity$1 = d;
              a = b;
              a = a.cljs$core$IFn$_invoke$arity$0 ? a.cljs$core$IFn$_invoke$arity$0() : a.call(null);
              a[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = e;
              return cljs.core.async.impl.ioc_helpers.run_state_machine(a)
            }
          }(a, b, c, d, h, e, f, g));
          a = cljs.core.next(f);
          b = null;
          c = 0
        }
        d = 0
      }else {
        return null
      }
    }
  }
};
dots_game.ex6.remove_dots = function(a) {
  var a = cljs.core.seq_QMARK_(a) ? cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map, a) : a, b = cljs.core.get.cljs$core$IFn$_invoke$arity$2(a, "\ufdd0:dot-chain"), c = cljs.core.set(b), b = cljs.core.keep_indexed(function(a) {
    return function(b, c) {
      return cljs.core.truth_(a.cljs$core$IFn$_invoke$arity$1 ? a.cljs$core$IFn$_invoke$arity$1(b) : a.call(null, b)) ? c : null
    }
  }(c), a.cljs$core$IFn$_invoke$arity$1 ? a.cljs$core$IFn$_invoke$arity$1("\ufdd0:board") : a.call(null, "\ufdd0:board")), c = cljs.core.keep_indexed(function(a) {
    return function(b, c) {
      return cljs.core.not(a.cljs$core$IFn$_invoke$arity$1 ? a.cljs$core$IFn$_invoke$arity$1(b) : a.call(null, b)) ? c : null
    }
  }(c, b), a.cljs$core$IFn$_invoke$arity$1 ? a.cljs$core$IFn$_invoke$arity$1("\ufdd0:board") : a.call(null, "\ufdd0:board"));
  dots_game.ex6.remove_dots_from_dom(b);
  dots_game.ex6.move_dots_to_new_positions(c);
  return cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(a, "\ufdd0:board", dots_game.ex6.update_positions(c), cljs.core.array_seq(["\ufdd0:dot-chain", cljs.core.PersistentVector.EMPTY], 0))
};
dots_game.ex6.add_dots = function(a) {
  var b = dots_game.ex2.board_size - cljs.core.count(a.cljs$core$IFn$_invoke$arity$1 ? a.cljs$core$IFn$_invoke$arity$1("\ufdd0:board") : a.call(null, "\ufdd0:board")), b = cljs.core.map.cljs$core$IFn$_invoke$arity$3(dots_game.ex2.create_dot, cljs.core.repeat.cljs$core$IFn$_invoke$arity$1(8), dots_game.ex2.get_rand_colors(b)), c = cljs.core.concat.cljs$core$IFn$_invoke$arity$2(a.cljs$core$IFn$_invoke$arity$1 ? a.cljs$core$IFn$_invoke$arity$1("\ufdd0:board") : a.call(null, "\ufdd0:board"), b);
  dots_game.ex6.add_dots_to_board(a.cljs$core$IFn$_invoke$arity$1 ? a.cljs$core$IFn$_invoke$arity$1("\ufdd0:selector") : a.call(null, "\ufdd0:selector"), b);
  var d = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(1);
  cljs.core.async.impl.dispatch.run(function() {
    var a, b = null, g = function() {
      var a = Array(6);
      a[0] = b;
      a[1] = 1;
      return a
    }, h = function(a) {
      for(;;) {
        var b;
        b = a;
        var d = b[1];
        if(2 === d) {
          var e = b[2], f = dots_game.ex6.move_dots_to_new_positions(c), d = void 0;
          b[5] = e;
          d = b;
          b = cljs.core.async.impl.ioc_helpers.return_chan(d, f)
        }else {
          1 === d ? (e = cljs.core.async.timeout(500), d = b, b = cljs.core.async.impl.ioc_helpers.take_BANG_(d, 2, e)) : b = null
        }
        if("\ufdd0:recur" !== b) {
          return b
        }
      }
    }, b = function(a) {
      switch(arguments.length) {
        case 0:
          return g.call(this);
        case 1:
          return h.call(this, a)
      }
      throw Error("Invalid arity: " + arguments.length);
    };
    b.cljs$core$IFn$_invoke$arity$0 = g;
    b.cljs$core$IFn$_invoke$arity$1 = h;
    a = b;
    a = a.cljs$core$IFn$_invoke$arity$0 ? a.cljs$core$IFn$_invoke$arity$0() : a.call(null);
    a[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = d;
    return cljs.core.async.impl.ioc_helpers.run_state_machine(a)
  });
  return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(a, "\ufdd0:board", dots_game.ex6.update_positions(c))
};
dots_game.ex6.render_updates = function(a) {
  return 0 < cljs.core.count(a.cljs$core$IFn$_invoke$arity$1 ? a.cljs$core$IFn$_invoke$arity$1("\ufdd0:dot-chain") : a.call(null, "\ufdd0:dot-chain")) ? dots_game.ex6.add_dots(dots_game.ex6.remove_dots(a)) : a
};
dots_game.ex6.dot_follows_QMARK_ = function(a, b, c) {
  var a = cljs.core.seq_QMARK_(a) ? cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map, a) : a, d = cljs.core.get.cljs$core$IFn$_invoke$arity$2(a, "\ufdd0:board"), a = (new cljs.core.Keyword("\ufdd0:color")).call(null, cljs.core.get.cljs$core$IFn$_invoke$arity$2(d, b)), d = (new cljs.core.Keyword("\ufdd0:color")).call(null, cljs.core.get.cljs$core$IFn$_invoke$arity$2(d, c)), e = null == b;
  return e ? e : (a = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(a, d)) ? (a = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(c, b + 1)) ? a : cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(c, b - 1) : a
};
dots_game.ex6.get_dot_chain = function(a, b, c) {
  var d = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(1);
  cljs.core.async.impl.dispatch.run(function() {
    var e, f = function(d) {
      var e = d[1];
      if(1 === e) {
        var e = cljs.core.vector(), f = c;
        d[5] = e;
        d[6] = f;
        d[2] = null;
        d[1] = 2;
        return"\ufdd0:recur"
      }
      return 2 === e ? (f = d[6], e = cljs.core.first(f), e = cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2("\ufdd0:dot-pos", e), d[1] = e ? 4 : 5, "\ufdd0:recur") : 3 === e ? (e = d[2], cljs.core.async.impl.ioc_helpers.return_chan(d, e)) : 4 === e ? (e = d[5], d[2] = e, d[1] = 6, "\ufdd0:recur") : 5 === e ? (e = d[5], f = d[6], e = cljs.core.last(e), f = cljs.core.last(f), e = dots_game.ex6.dot_follows_QMARK_(a, e, f), d[1] = cljs.core.truth_(e) ? 7 : 8, "\ufdd0:recur") : 6 === e ? (e = d[2], 
      d[2] = e, d[1] = 3, "\ufdd0:recur") : 7 === e ? (e = d[5], f = d[6], f = cljs.core.last(f), e = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(e, f), d[2] = e, d[1] = 9, "\ufdd0:recur") : 8 === e ? (e = d[5], d[2] = e, d[1] = 9, "\ufdd0:recur") : 9 === e ? (e = d[2], d[7] = e, cljs.core.async.impl.ioc_helpers.take_BANG_(d, 10, b)) : 10 === e ? (e = d[7], f = d[2], d[5] = e, d[6] = f, d[2] = null, d[1] = 2, "\ufdd0:recur") : null
    }, g = null, h = function() {
      var a = Array(8);
      a[0] = g;
      a[1] = 1;
      return a
    }, i = function(a) {
      for(;;) {
        var b = f(a);
        if("\ufdd0:recur" !== b) {
          return b
        }
      }
    }, g = function(a) {
      switch(arguments.length) {
        case 0:
          return h.call(this);
        case 1:
          return i.call(this, a)
      }
      throw Error("Invalid arity: " + arguments.length);
    };
    g.cljs$core$IFn$_invoke$arity$0 = h;
    g.cljs$core$IFn$_invoke$arity$1 = i;
    e = g;
    e = e.cljs$core$IFn$_invoke$arity$0 ? e.cljs$core$IFn$_invoke$arity$0() : e.call(null);
    e[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = d;
    return cljs.core.async.impl.ioc_helpers.run_state_machine(e)
  });
  return d
};
dots_game.ex6.dot_chain_getter = function(a, b) {
  var c = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(1);
  cljs.core.async.impl.dispatch.run(function() {
    var d, e = function(c) {
      var d = c[1];
      return 9 === d ? (d = c[2], c[5] = d, c[2] = null, c[1] = 3, "\ufdd0:recur") : 8 === d ? (d = c[2], c[2] = d, c[1] = 7, "\ufdd0:recur") : 7 === d ? (d = c[2], c[2] = d, c[1] = 4, "\ufdd0:recur") : 6 === d ? cljs.core.async.impl.ioc_helpers.take_BANG_(c, 9, b) : 5 === d ? (d = c[5], d = dots_game.ex6.get_dot_chain(a, b, d), cljs.core.async.impl.ioc_helpers.take_BANG_(c, 8, d)) : 4 === d ? (d = c[2], cljs.core.async.impl.ioc_helpers.return_chan(c, d)) : 3 === d ? (d = c[5], d = cljs.core.first(d), 
      d = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("\ufdd0:dot-pos", d), c[1] = d ? 5 : 6, "\ufdd0:recur") : 2 === d ? (d = c[2], c[5] = d, c[2] = null, c[1] = 3, "\ufdd0:recur") : 1 === d ? cljs.core.async.impl.ioc_helpers.take_BANG_(c, 2, b) : null
    }, f = null, g = function() {
      var a = Array(6);
      a[0] = f;
      a[1] = 1;
      return a
    }, h = function(a) {
      for(;;) {
        var b = e(a);
        if("\ufdd0:recur" !== b) {
          return b
        }
      }
    }, f = function(a) {
      switch(arguments.length) {
        case 0:
          return g.call(this);
        case 1:
          return h.call(this, a)
      }
      throw Error("Invalid arity: " + arguments.length);
    };
    f.cljs$core$IFn$_invoke$arity$0 = g;
    f.cljs$core$IFn$_invoke$arity$1 = h;
    d = f;
    d = d.cljs$core$IFn$_invoke$arity$0 ? d.cljs$core$IFn$_invoke$arity$0() : d.call(null);
    d[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c;
    return cljs.core.async.impl.ioc_helpers.run_state_machine(d)
  });
  return c
};
dots_game.ex6.game_loop = function(a, b) {
  var c = dots_game.ex3.dot_chan(a);
  dots_game.ex6.add_dots_to_board(a, b.cljs$core$IFn$_invoke$arity$1 ? b.cljs$core$IFn$_invoke$arity$1("\ufdd0:board") : b.call(null, "\ufdd0:board"));
  var d = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(1);
  cljs.core.async.impl.dispatch.run(function() {
    var a, f = function(a) {
      var d = a[1];
      return 4 === d ? (d = a[5], d = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(d, "\ufdd0:dot-chain", a[2]), d = dots_game.ex6.render_updates(d), a[5] = d, a[2] = null, a[1] = 2, "\ufdd0:recur") : 3 === d ? (d = a[2], cljs.core.async.impl.ioc_helpers.return_chan(a, d)) : 2 === d ? (d = a[5], d = dots_game.ex6.dot_chain_getter(d, c), cljs.core.async.impl.ioc_helpers.take_BANG_(a, 4, d)) : 1 === d ? (d = b, a[5] = d, a[2] = null, a[1] = 2, "\ufdd0:recur") : null
    }, g = null, h = function() {
      var a = Array(6);
      a[0] = g;
      a[1] = 1;
      return a
    }, i = function(a) {
      for(;;) {
        var b = f(a);
        if("\ufdd0:recur" !== b) {
          return b
        }
      }
    }, g = function(a) {
      switch(arguments.length) {
        case 0:
          return h.call(this);
        case 1:
          return i.call(this, a)
      }
      throw Error("Invalid arity: " + arguments.length);
    };
    g.cljs$core$IFn$_invoke$arity$0 = h;
    g.cljs$core$IFn$_invoke$arity$1 = i;
    a = g;
    a = a.cljs$core$IFn$_invoke$arity$0 ? a.cljs$core$IFn$_invoke$arity$0() : a.call(null);
    a[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = d;
    return cljs.core.async.impl.ioc_helpers.run_state_machine(a)
  });
  return d
};
dots_game.ex6.example_6 = function(a) {
  return dots_game.ex6.game_loop(a, dots_game.ex6.initial_state(a))
};
dots_game.ex7 = {};
dots_game.ex7.create_dots = function(a) {
  return cljs.core.map_indexed(dots_game.ex2.create_dot, dots_game.ex2.get_rand_colors(a))
};
dots_game.ex7.initial_state = function(a) {
  return cljs.core.PersistentArrayMap.fromArray(["\ufdd0:board", cljs.core.vec(dots_game.ex7.create_dots(dots_game.ex2.board_size)), "\ufdd0:dot-chain", cljs.core.PersistentVector.EMPTY, "\ufdd0:selector", a], !0)
};
dots_game.ex7.add_dots_to_board = function(a, b) {
  return cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(function(b) {
    return jayq.core.append(jayq.core.$.cljs$core$IFn$_invoke$arity$1(a), (new cljs.core.Keyword("\ufdd0:elem")).call(null, b))
  }, b)
};
dots_game.ex7.move_dot_to_pos = function(a, b) {
  var c = dots_game.ex2.dot_pos_to_corner_position(b), d = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(c, 0, null), c = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(c, 1, null);
  return jayq.core.css.cljs$core$IFn$_invoke$arity$2(jayq.core.$.cljs$core$IFn$_invoke$arity$1(a.cljs$core$IFn$_invoke$arity$1 ? a.cljs$core$IFn$_invoke$arity$1("\ufdd0:elem") : a.call(null, "\ufdd0:elem")), cljs.core.PersistentArrayMap.fromArray(["\ufdd0:top", d, "\ufdd0:left", c], !0))
};
dots_game.ex7.move_dots_to_new_positions = function(a) {
  var b = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(1);
  cljs.core.async.impl.dispatch.run(function() {
    var c, d = function(b) {
      var c = b[1];
      if(1 === c) {
        var d = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(a, 0, null), e = cljs.core.nthnext(a, 1), c = a;
        b[5] = d;
        b[6] = c;
        b[7] = 0;
        b[8] = e;
        b[2] = null;
        b[1] = 2;
        return"\ufdd0:recur"
      }
      return 2 === c ? (d = b[9], c = b[6], e = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(c, 0, null), d = cljs.core.nthnext(c, 1), c = cljs.core.not(null == e), b[9] = e, b[10] = d, b[1] = c ? 4 : 5, "\ufdd0:recur") : 3 === c ? (c = b[2], cljs.core.async.impl.ioc_helpers.return_chan(b, c)) : 4 === c ? (d = b[9], c = b[7], d = d.cljs$core$IFn$_invoke$arity$1 ? d.cljs$core$IFn$_invoke$arity$1("\ufdd0:pos") : d.call(null, "\ufdd0:pos"), c = cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(d, c), b[1] = 
      c ? 7 : 8, "\ufdd0:recur") : 5 === c ? (b[2] = null, b[1] = 6, "\ufdd0:recur") : 6 === c ? (c = b[2], b[2] = c, b[1] = 3, "\ufdd0:recur") : 7 === c ? (d = b[9], c = b[7], c = dots_game.ex7.move_dot_to_pos(d, c), d = cljs.core.async.timeout(100), b[11] = c, cljs.core.async.impl.ioc_helpers.take_BANG_(b, 10, d)) : 8 === c ? (b[2] = null, b[1] = 9, "\ufdd0:recur") : 9 === c ? (d = b[10], c = b[7], e = b[2], b[6] = d, b[7] = c + 1, b[12] = e, b[2] = null, b[1] = 2, "\ufdd0:recur") : 10 === c ? 
      (c = b[2], b[2] = c, b[1] = 9, "\ufdd0:recur") : null
    }, e = null, f = function() {
      var a = Array(13);
      a[0] = e;
      a[1] = 1;
      return a
    }, g = function(a) {
      for(;;) {
        var b = d(a);
        if("\ufdd0:recur" !== b) {
          return b
        }
      }
    }, e = function(a) {
      switch(arguments.length) {
        case 0:
          return f.call(this);
        case 1:
          return g.call(this, a)
      }
      throw Error("Invalid arity: " + arguments.length);
    };
    e.cljs$core$IFn$_invoke$arity$0 = f;
    e.cljs$core$IFn$_invoke$arity$1 = g;
    c = e;
    c = c.cljs$core$IFn$_invoke$arity$0 ? c.cljs$core$IFn$_invoke$arity$0() : c.call(null);
    c[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = b;
    return cljs.core.async.impl.ioc_helpers.run_state_machine(c)
  });
  return b
};
dots_game.ex7.update_positions = function(a) {
  return cljs.core.vec(cljs.core.map_indexed(function(a, c) {
    return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(c, "\ufdd0:pos", a)
  }, a))
};
dots_game.ex7.remove_dots_from_dom = function(a) {
  for(var a = cljs.core.seq(a), b = null, c = 0, d = 0;;) {
    if(d < c) {
      var e = b.cljs$core$IIndexed$_nth$arity$2(b, d), f = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(1);
      cljs.core.async.impl.dispatch.run(function(a, b, c, d, e, f) {
        return function() {
          var a, b = null, c = function() {
            var a = Array(8);
            a[0] = b;
            a[1] = 1;
            return a
          }, d = function(a) {
            for(;;) {
              var b;
              b = a;
              var c = b[1];
              if(2 === c) {
                var d = b[2], e = b[5].remove(), c = void 0;
                b[6] = d;
                c = b;
                b = cljs.core.async.impl.ioc_helpers.return_chan(c, e)
              }else {
                1 === c ? (c = f.cljs$core$IFn$_invoke$arity$1 ? f.cljs$core$IFn$_invoke$arity$1("\ufdd0:elem") : f.call(null, "\ufdd0:elem"), c = jayq.core.$.cljs$core$IFn$_invoke$arity$1(c), e = c.addClass("scale-out"), d = cljs.core.async.timeout(150), b[5] = c, b[7] = e, c = b, b = cljs.core.async.impl.ioc_helpers.take_BANG_(c, 2, d)) : b = null
              }
              if("\ufdd0:recur" !== b) {
                return b
              }
            }
          }, b = function(a) {
            switch(arguments.length) {
              case 0:
                return c.call(this);
              case 1:
                return d.call(this, a)
            }
            throw Error("Invalid arity: " + arguments.length);
          };
          b.cljs$core$IFn$_invoke$arity$0 = c;
          b.cljs$core$IFn$_invoke$arity$1 = d;
          a = b;
          a = a.cljs$core$IFn$_invoke$arity$0 ? a.cljs$core$IFn$_invoke$arity$0() : a.call(null);
          a[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = e;
          return cljs.core.async.impl.ioc_helpers.run_state_machine(a)
        }
      }(a, b, c, d, f, e));
      d += 1
    }else {
      var g = cljs.core.seq(a);
      if(g) {
        f = g;
        if(cljs.core.chunked_seq_QMARK_(f)) {
          a = cljs.core.chunk_first(f), d = cljs.core.chunk_rest(f), b = a, c = cljs.core.count(a), a = d
        }else {
          var e = cljs.core.first(f), h = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(1);
          cljs.core.async.impl.dispatch.run(function(a, b, c, d, e, f) {
            return function() {
              var a, b = null, c = function() {
                var a = Array(8);
                a[0] = b;
                a[1] = 1;
                return a
              }, d = function(a) {
                for(;;) {
                  var b;
                  b = a;
                  var c = b[1];
                  if(2 === c) {
                    var d = b[2], e = b[5].remove(), c = void 0;
                    b[6] = d;
                    c = b;
                    b = cljs.core.async.impl.ioc_helpers.return_chan(c, e)
                  }else {
                    1 === c ? (c = f.cljs$core$IFn$_invoke$arity$1 ? f.cljs$core$IFn$_invoke$arity$1("\ufdd0:elem") : f.call(null, "\ufdd0:elem"), c = jayq.core.$.cljs$core$IFn$_invoke$arity$1(c), e = c.addClass("scale-out"), d = cljs.core.async.timeout(150), b[5] = c, b[7] = e, c = b, b = cljs.core.async.impl.ioc_helpers.take_BANG_(c, 2, d)) : b = null
                  }
                  if("\ufdd0:recur" !== b) {
                    return b
                  }
                }
              }, b = function(a) {
                switch(arguments.length) {
                  case 0:
                    return c.call(this);
                  case 1:
                    return d.call(this, a)
                }
                throw Error("Invalid arity: " + arguments.length);
              };
              b.cljs$core$IFn$_invoke$arity$0 = c;
              b.cljs$core$IFn$_invoke$arity$1 = d;
              a = b;
              a = a.cljs$core$IFn$_invoke$arity$0 ? a.cljs$core$IFn$_invoke$arity$0() : a.call(null);
              a[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = e;
              return cljs.core.async.impl.ioc_helpers.run_state_machine(a)
            }
          }(a, b, c, d, h, e, f, g));
          a = cljs.core.next(f);
          b = null;
          c = 0
        }
        d = 0
      }else {
        return null
      }
    }
  }
};
dots_game.ex7.remove_dots = function(a) {
  var a = cljs.core.seq_QMARK_(a) ? cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map, a) : a, b = cljs.core.get.cljs$core$IFn$_invoke$arity$2(a, "\ufdd0:dot-chain"), c = cljs.core.set(b), b = cljs.core.keep_indexed(function(a) {
    return function(b, c) {
      return cljs.core.truth_(a.cljs$core$IFn$_invoke$arity$1 ? a.cljs$core$IFn$_invoke$arity$1(b) : a.call(null, b)) ? c : null
    }
  }(c), a.cljs$core$IFn$_invoke$arity$1 ? a.cljs$core$IFn$_invoke$arity$1("\ufdd0:board") : a.call(null, "\ufdd0:board")), c = cljs.core.keep_indexed(function(a) {
    return function(b, c) {
      return cljs.core.not(a.cljs$core$IFn$_invoke$arity$1 ? a.cljs$core$IFn$_invoke$arity$1(b) : a.call(null, b)) ? c : null
    }
  }(c, b), a.cljs$core$IFn$_invoke$arity$1 ? a.cljs$core$IFn$_invoke$arity$1("\ufdd0:board") : a.call(null, "\ufdd0:board"));
  dots_game.ex7.remove_dots_from_dom(b);
  dots_game.ex7.move_dots_to_new_positions(c);
  return cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(a, "\ufdd0:board", dots_game.ex7.update_positions(c), cljs.core.array_seq(["\ufdd0:dot-chain", cljs.core.PersistentVector.EMPTY], 0))
};
dots_game.ex7.add_dots = function(a) {
  var b = dots_game.ex2.board_size - cljs.core.count(a.cljs$core$IFn$_invoke$arity$1 ? a.cljs$core$IFn$_invoke$arity$1("\ufdd0:board") : a.call(null, "\ufdd0:board")), b = cljs.core.map.cljs$core$IFn$_invoke$arity$3(dots_game.ex2.create_dot, cljs.core.repeat.cljs$core$IFn$_invoke$arity$1(8), dots_game.ex2.get_rand_colors(b)), c = cljs.core.concat.cljs$core$IFn$_invoke$arity$2(a.cljs$core$IFn$_invoke$arity$1 ? a.cljs$core$IFn$_invoke$arity$1("\ufdd0:board") : a.call(null, "\ufdd0:board"), b);
  dots_game.ex7.add_dots_to_board(a.cljs$core$IFn$_invoke$arity$1 ? a.cljs$core$IFn$_invoke$arity$1("\ufdd0:selector") : a.call(null, "\ufdd0:selector"), b);
  var d = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(1);
  cljs.core.async.impl.dispatch.run(function() {
    var a, b = null, g = function() {
      var a = Array(6);
      a[0] = b;
      a[1] = 1;
      return a
    }, h = function(a) {
      for(;;) {
        var b;
        b = a;
        var d = b[1];
        if(2 === d) {
          var e = b[2], f = dots_game.ex7.move_dots_to_new_positions(c), d = void 0;
          b[5] = e;
          d = b;
          b = cljs.core.async.impl.ioc_helpers.return_chan(d, f)
        }else {
          1 === d ? (e = cljs.core.async.timeout(500), d = b, b = cljs.core.async.impl.ioc_helpers.take_BANG_(d, 2, e)) : b = null
        }
        if("\ufdd0:recur" !== b) {
          return b
        }
      }
    }, b = function(a) {
      switch(arguments.length) {
        case 0:
          return g.call(this);
        case 1:
          return h.call(this, a)
      }
      throw Error("Invalid arity: " + arguments.length);
    };
    b.cljs$core$IFn$_invoke$arity$0 = g;
    b.cljs$core$IFn$_invoke$arity$1 = h;
    a = b;
    a = a.cljs$core$IFn$_invoke$arity$0 ? a.cljs$core$IFn$_invoke$arity$0() : a.call(null);
    a[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = d;
    return cljs.core.async.impl.ioc_helpers.run_state_machine(a)
  });
  return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(a, "\ufdd0:board", dots_game.ex7.update_positions(c))
};
dots_game.ex7.render_updates = function(a) {
  return 0 < cljs.core.count(a.cljs$core$IFn$_invoke$arity$1 ? a.cljs$core$IFn$_invoke$arity$1("\ufdd0:dot-chain") : a.call(null, "\ufdd0:dot-chain")) ? dots_game.ex7.add_dots(dots_game.ex7.remove_dots(a)) : a
};
dots_game.ex7.dot_pos_to_center_position = function(a) {
  return cljs.core.vec(cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.partial.cljs$core$IFn$_invoke$arity$2(cljs.core._PLUS_, 10), dots_game.ex2.dot_pos_to_corner_position(a)))
};
dots_game.ex7.render_chain_element = function(a, b, c) {
  var d = dots_game.ex7.dot_pos_to_center_position(a), a = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(d, 0, null), d = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(d, 1, null), b = dots_game.ex7.dot_pos_to_center_position(b), e = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(b, 0, null);
  cljs.core.nth.cljs$core$IFn$_invoke$arity$3(b, 1, null);
  a = [cljs.core.str("width: 5px; height: 50px; top:"), cljs.core.str(a < e ? a : e), cljs.core.str("px; left: "), cljs.core.str(d - 2), cljs.core.str("px;")].join("");
  return cljs.core.PersistentVector.fromArray(["\ufdd0:div", cljs.core.PersistentArrayMap.fromArray(["\ufdd0:style", a, "\ufdd0:class", [cljs.core.str("line "), cljs.core.str(cljs.core.name(cljs.core.truth_(c) ? c : "\ufdd0:blue"))].join("")], !0)], !0)
};
dots_game.ex7.dot_highlight_templ = function(a, b) {
  var c = dots_game.ex2.dot_pos_to_corner_position(a), d = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(c, 0, null), c = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(c, 1, null), d = [cljs.core.str("top:"), cljs.core.str(d), cljs.core.str("px; left: "), cljs.core.str(c), cljs.core.str("px;")].join("");
  return cljs.core.PersistentVector.fromArray(["\ufdd0:div", cljs.core.PersistentArrayMap.fromArray(["\ufdd0:style", d, "\ufdd0:class", [cljs.core.str("dot-highlight "), cljs.core.str(cljs.core.name(cljs.core.truth_(b) ? b : "\ufdd0:blue"))].join("")], !0)], !0)
};
dots_game.ex7.render_dot_chain = function(a, b) {
  var c = (new cljs.core.Keyword("\ufdd0:color")).call(null, cljs.core.get.cljs$core$IFn$_invoke$arity$2((new cljs.core.Keyword("\ufdd0:board")).call(null, a), cljs.core.first(b))), d = cljs.core.map.cljs$core$IFn$_invoke$arity$4(dots_game.ex7.render_chain_element, cljs.core.butlast(b), cljs.core.rest(b), cljs.core.repeat.cljs$core$IFn$_invoke$arity$1(c));
  0 < cljs.core.count(b) && (jayq.core.inner.cljs$core$IFn$_invoke$arity$2 ? jayq.core.inner.cljs$core$IFn$_invoke$arity$2(jayq.core.$.cljs$core$IFn$_invoke$arity$1([cljs.core.str(a.cljs$core$IFn$_invoke$arity$1 ? a.cljs$core$IFn$_invoke$arity$1("\ufdd0:selector") : a.call(null, "\ufdd0:selector")), cljs.core.str(" .dot-chain-holder")].join("")), crate.core.html.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentVector.fromArray(["\ufdd0:div"], 
  !0), d)], 0))) : jayq.core.inner.call(null, jayq.core.$.cljs$core$IFn$_invoke$arity$1([cljs.core.str(a.cljs$core$IFn$_invoke$arity$1 ? a.cljs$core$IFn$_invoke$arity$1("\ufdd0:selector") : a.call(null, "\ufdd0:selector")), cljs.core.str(" .dot-chain-holder")].join("")), crate.core.html.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([cljs.core.concat.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentVector.fromArray(["\ufdd0:div"], !0), d)], 0))), jayq.core.append(jayq.core.$.cljs$core$IFn$_invoke$arity$1([cljs.core.str(a.cljs$core$IFn$_invoke$arity$1 ? 
  a.cljs$core$IFn$_invoke$arity$1("\ufdd0:selector") : a.call(null, "\ufdd0:selector")), cljs.core.str(" .dot-highlights")].join("")), crate.core.html.cljs$core$IFn$_invoke$arity$variadic(cljs.core.array_seq([dots_game.ex7.dot_highlight_templ(cljs.core.last(b), c)], 0))));
  return b
};
dots_game.ex7.erase_dot_chain = function(a) {
  jayq.core.inner.cljs$core$IFn$_invoke$arity$2 ? jayq.core.inner.cljs$core$IFn$_invoke$arity$2(jayq.core.$.cljs$core$IFn$_invoke$arity$1([cljs.core.str(a.cljs$core$IFn$_invoke$arity$1 ? a.cljs$core$IFn$_invoke$arity$1("\ufdd0:selector") : a.call(null, "\ufdd0:selector")), cljs.core.str(" .dot-chain-holder")].join("")), "") : jayq.core.inner.call(null, jayq.core.$.cljs$core$IFn$_invoke$arity$1([cljs.core.str(a.cljs$core$IFn$_invoke$arity$1 ? a.cljs$core$IFn$_invoke$arity$1("\ufdd0:selector") : a.call(null, 
  "\ufdd0:selector")), cljs.core.str(" .dot-chain-holder")].join("")), "");
  return jayq.core.inner.cljs$core$IFn$_invoke$arity$2 ? jayq.core.inner.cljs$core$IFn$_invoke$arity$2(jayq.core.$.cljs$core$IFn$_invoke$arity$1([cljs.core.str(a.cljs$core$IFn$_invoke$arity$1 ? a.cljs$core$IFn$_invoke$arity$1("\ufdd0:selector") : a.call(null, "\ufdd0:selector")), cljs.core.str(" .dot-highlights")].join("")), "") : jayq.core.inner.call(null, jayq.core.$.cljs$core$IFn$_invoke$arity$1([cljs.core.str(a.cljs$core$IFn$_invoke$arity$1 ? a.cljs$core$IFn$_invoke$arity$1("\ufdd0:selector") : 
  a.call(null, "\ufdd0:selector")), cljs.core.str(" .dot-highlights")].join("")), "")
};
dots_game.ex7.dot_follows_QMARK_ = function(a, b, c) {
  var a = cljs.core.seq_QMARK_(a) ? cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map, a) : a, d = cljs.core.get.cljs$core$IFn$_invoke$arity$2(a, "\ufdd0:board"), a = (new cljs.core.Keyword("\ufdd0:color")).call(null, cljs.core.get.cljs$core$IFn$_invoke$arity$2(d, b)), d = (new cljs.core.Keyword("\ufdd0:color")).call(null, cljs.core.get.cljs$core$IFn$_invoke$arity$2(d, c)), e = null == b;
  return e ? e : (a = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(a, d)) ? (a = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(c, b + 1)) ? a : cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(c, b - 1) : a
};
dots_game.ex7.get_dot_chain = function(a, b, c) {
  var d = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(1);
  cljs.core.async.impl.dispatch.run(function() {
    var e, f = function(d) {
      var e = d[1];
      if(1 === e) {
        var e = cljs.core.vector(), f = c;
        d[5] = f;
        d[6] = e;
        d[2] = null;
        d[1] = 2;
        return"\ufdd0:recur"
      }
      return 2 === e ? (f = d[5], e = cljs.core.first(f), e = cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2("\ufdd0:dot-pos", e), d[1] = e ? 4 : 5, "\ufdd0:recur") : 3 === e ? (e = d[2], cljs.core.async.impl.ioc_helpers.return_chan(d, e)) : 4 === e ? (e = d[6], f = dots_game.ex7.erase_dot_chain(a), d[7] = f, d[2] = e, d[1] = 6, "\ufdd0:recur") : 5 === e ? (f = d[5], e = d[6], e = cljs.core.last(e), f = cljs.core.last(f), e = dots_game.ex7.dot_follows_QMARK_(a, e, f), d[1] = cljs.core.truth_(e) ? 
      7 : 8, "\ufdd0:recur") : 6 === e ? (e = d[2], d[2] = e, d[1] = 3, "\ufdd0:recur") : 7 === e ? (f = d[5], e = d[6], f = cljs.core.last(f), e = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(e, f), e = dots_game.ex7.render_dot_chain(a, e), d[2] = e, d[1] = 9, "\ufdd0:recur") : 8 === e ? (e = d[6], d[2] = e, d[1] = 9, "\ufdd0:recur") : 9 === e ? (e = d[2], d[8] = e, cljs.core.async.impl.ioc_helpers.take_BANG_(d, 10, b)) : 10 === e ? (e = d[8], f = d[2], d[5] = f, d[6] = e, d[2] = null, d[1] = 2, 
      "\ufdd0:recur") : null
    }, g = null, h = function() {
      var a = Array(9);
      a[0] = g;
      a[1] = 1;
      return a
    }, i = function(a) {
      for(;;) {
        var b = f(a);
        if("\ufdd0:recur" !== b) {
          return b
        }
      }
    }, g = function(a) {
      switch(arguments.length) {
        case 0:
          return h.call(this);
        case 1:
          return i.call(this, a)
      }
      throw Error("Invalid arity: " + arguments.length);
    };
    g.cljs$core$IFn$_invoke$arity$0 = h;
    g.cljs$core$IFn$_invoke$arity$1 = i;
    e = g;
    e = e.cljs$core$IFn$_invoke$arity$0 ? e.cljs$core$IFn$_invoke$arity$0() : e.call(null);
    e[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = d;
    return cljs.core.async.impl.ioc_helpers.run_state_machine(e)
  });
  return d
};
dots_game.ex7.dot_chain_getter = function(a, b) {
  var c = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(1);
  cljs.core.async.impl.dispatch.run(function() {
    var d, e = function(c) {
      var d = c[1];
      return 9 === d ? (d = c[2], c[5] = d, c[2] = null, c[1] = 3, "\ufdd0:recur") : 8 === d ? (d = c[2], c[2] = d, c[1] = 7, "\ufdd0:recur") : 7 === d ? (d = c[2], c[2] = d, c[1] = 4, "\ufdd0:recur") : 6 === d ? cljs.core.async.impl.ioc_helpers.take_BANG_(c, 9, b) : 5 === d ? (d = c[5], d = dots_game.ex7.get_dot_chain(a, b, d), cljs.core.async.impl.ioc_helpers.take_BANG_(c, 8, d)) : 4 === d ? (d = c[2], cljs.core.async.impl.ioc_helpers.return_chan(c, d)) : 3 === d ? (d = c[5], d = cljs.core.first(d), 
      d = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("\ufdd0:dot-pos", d), c[1] = d ? 5 : 6, "\ufdd0:recur") : 2 === d ? (d = c[2], c[5] = d, c[2] = null, c[1] = 3, "\ufdd0:recur") : 1 === d ? cljs.core.async.impl.ioc_helpers.take_BANG_(c, 2, b) : null
    }, f = null, g = function() {
      var a = Array(6);
      a[0] = f;
      a[1] = 1;
      return a
    }, h = function(a) {
      for(;;) {
        var b = e(a);
        if("\ufdd0:recur" !== b) {
          return b
        }
      }
    }, f = function(a) {
      switch(arguments.length) {
        case 0:
          return g.call(this);
        case 1:
          return h.call(this, a)
      }
      throw Error("Invalid arity: " + arguments.length);
    };
    f.cljs$core$IFn$_invoke$arity$0 = g;
    f.cljs$core$IFn$_invoke$arity$1 = h;
    d = f;
    d = d.cljs$core$IFn$_invoke$arity$0 ? d.cljs$core$IFn$_invoke$arity$0() : d.call(null);
    d[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = c;
    return cljs.core.async.impl.ioc_helpers.run_state_machine(d)
  });
  return c
};
dots_game.ex7.game_loop = function(a, b) {
  var c = dots_game.ex3.dot_chan(a);
  dots_game.ex7.add_dots_to_board(a, b.cljs$core$IFn$_invoke$arity$1 ? b.cljs$core$IFn$_invoke$arity$1("\ufdd0:board") : b.call(null, "\ufdd0:board"));
  var d = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(1);
  cljs.core.async.impl.dispatch.run(function() {
    var a, f = function(a) {
      var d = a[1];
      return 4 === d ? (d = a[5], d = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(d, "\ufdd0:dot-chain", a[2]), d = dots_game.ex7.render_updates(d), a[5] = d, a[2] = null, a[1] = 2, "\ufdd0:recur") : 3 === d ? (d = a[2], cljs.core.async.impl.ioc_helpers.return_chan(a, d)) : 2 === d ? (d = a[5], d = dots_game.ex7.dot_chain_getter(d, c), cljs.core.async.impl.ioc_helpers.take_BANG_(a, 4, d)) : 1 === d ? (d = b, a[5] = d, a[2] = null, a[1] = 2, "\ufdd0:recur") : null
    }, g = null, h = function() {
      var a = Array(6);
      a[0] = g;
      a[1] = 1;
      return a
    }, i = function(a) {
      for(;;) {
        var b = f(a);
        if("\ufdd0:recur" !== b) {
          return b
        }
      }
    }, g = function(a) {
      switch(arguments.length) {
        case 0:
          return h.call(this);
        case 1:
          return i.call(this, a)
      }
      throw Error("Invalid arity: " + arguments.length);
    };
    g.cljs$core$IFn$_invoke$arity$0 = h;
    g.cljs$core$IFn$_invoke$arity$1 = i;
    a = g;
    a = a.cljs$core$IFn$_invoke$arity$0 ? a.cljs$core$IFn$_invoke$arity$0() : a.call(null);
    a[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = d;
    return cljs.core.async.impl.ioc_helpers.run_state_machine(a)
  });
  return d
};
dots_game.ex7.example_7 = function(a) {
  return dots_game.ex7.game_loop(a, dots_game.ex7.initial_state(a))
};
dots_game.core = {};
dots_game.core.no_scroll_on_touch = function(a) {
  jayq.core.bind.call(null, jayq.core.$.call(null, a), "touchstart", function(a) {
    return jayq.core.prevent.call(null, a)
  });
  jayq.core.bind.call(null, jayq.core.$.call(null, a), "dragstart", function(a) {
    return jayq.core.prevent.call(null, a)
  });
  return jayq.core.bind.call(null, jayq.core.$.call(null, a), "drop", function(a) {
    return jayq.core.prevent.call(null, a)
  })
};
jayq.core.$.call(null, function() {
  var a = cljs.core.async.chan.call(null, 1);
  cljs.core.async.impl.dispatch.run.call(null, function() {
    var b = function(a) {
      var b = a[1];
      if(2 === b) {
        var b = a[2], c = dots_game.ex1.example_1.call(null, "#example-1"), d = dots_game.ex2.example_2.call(null, "#example-2"), e = dots_game.ex3.log_loop.call(null, "#example-3"), f = dots_game.ex4.example_4.call(null, "#example-4"), l = dots_game.ex5.example_5.call(null, "#example-5"), n = dots_game.ex6.example_6.call(null, "#example-6"), p = dots_game.ex7.example_7.call(null, "#example-7"), q = dots_game.core.no_scroll_on_touch.call(null, ".no-scroll");
        a[5] = l;
        a[6] = n;
        a[7] = f;
        a[8] = b;
        a[9] = c;
        a[10] = d;
        a[11] = p;
        a[12] = e;
        return cljs.core.async.impl.ioc_helpers.return_chan.call(null, a, q)
      }
      return 1 === b ? (b = cljs.core.async.timeout.call(null, 2E3), cljs.core.async.impl.ioc_helpers.take_BANG_.call(null, a, 2, b)) : null
    }, c = null, d = function() {
      var a = Array(13);
      a[0] = c;
      a[1] = 1;
      return a
    }, e = function(a) {
      for(;;) {
        var c = b.call(null, a);
        if("\ufdd0:recur" !== c) {
          return c
        }
      }
    }, c = function(a) {
      switch(arguments.length) {
        case 0:
          return d.call(this);
        case 1:
          return e.call(this, a)
      }
      throw Error("Invalid arity: " + arguments.length);
    };
    c.cljs$core$IFn$_invoke$arity$0 = d;
    c.cljs$core$IFn$_invoke$arity$1 = e;
    var f = c.call(null);
    f[cljs.core.async.impl.ioc_helpers.USER_START_IDX] = a;
    return cljs.core.async.impl.ioc_helpers.run_state_machine.call(null, f)
  });
  return a
});
