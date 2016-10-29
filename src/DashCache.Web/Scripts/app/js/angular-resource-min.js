﻿/*
 AngularJS v1.5.3
 (c) 2010-2016 Google, Inc. http://angularjs.org
 License: MIT
*/
(function (Q, d, G) {
    'use strict'; function H(t, g) { g = g || {}; d.forEach(g, function (d, q) { delete g[q] }); for (var q in t) !t.hasOwnProperty(q) || "$" === q.charAt(0) && "$" === q.charAt(1) || (g[q] = t[q]); return g } var z = d.$$minErr("$resource"), N = /^(\.[a-zA-Z_$@][0-9a-zA-Z_$@]*)+$/; d.module("ngResource", ["ng"]).provider("$resource", function () {
        var t = /^https?:\/\/[^\/]*/, g = this; this.defaults = { stripTrailingSlashes: !0, actions: { get: { method: "GET" }, save: { method: "POST" }, query: { method: "GET", isArray: !0 }, remove: { method: "DELETE" }, "delete": { method: "DELETE" } } };
        this.$get = ["$http", "$log", "$q", "$timeout", function (q, M, I, J) {
            function A(d, h) { return encodeURIComponent(d).replace(/%40/gi, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, h ? "%20" : "+") } function B(d, h) { this.template = d; this.defaults = v({}, g.defaults, h); this.urlParams = {} } function K(e, h, n, k) {
                function c(a, b) {
                    var c = {}; b = v({}, h, b); u(b, function (b, h) {
                        x(b) && (b = b()); var f; if (b && b.charAt && "@" == b.charAt(0)) {
                            f = a; var l = b.substr(1); if (null == l || "" === l || "hasOwnProperty" === l || !N.test("." +
                            l)) throw z("badmember", l); for (var l = l.split("."), m = 0, k = l.length; m < k && d.isDefined(f) ; m++) { var r = l[m]; f = null !== f ? f[r] : G }
                        } else f = b; c[h] = f
                    }); return c
                } function O(a) { return a.resource } function m(a) { H(a || {}, this) } var t = new B(e, k); n = v({}, g.defaults.actions, n); m.prototype.toJSON = function () { var a = v({}, this); delete a.$promise; delete a.$resolved; return a }; u(n, function (a, b) {
                    var h = /^(POST|PUT|PATCH)$/i.test(a.method), e = a.timeout, E = d.isDefined(a.cancellable) ? a.cancellable : k && d.isDefined(k.cancellable) ? k.cancellable :
                    g.defaults.cancellable; e && !d.isNumber(e) && (M.debug("ngResource:\n  Only numeric values are allowed as `timeout`.\n  Promises are not supported in $resource, because the same value would be used for multiple requests. If you are looking for a way to cancel requests, you should use the `cancellable` option."), delete a.timeout, e = null); m[b] = function (f, l, k, g) {
                        var r = {}, n, w, C; switch (arguments.length) {
                            case 4: C = g, w = k; case 3: case 2: if (x(l)) { if (x(f)) { w = f; C = l; break } w = l; C = k } else { r = f; n = l; w = k; break } case 1: x(f) ?
                            w = f : h ? n = f : r = f; break; case 0: break; default: throw z("badargs", arguments.length);
                        } var D = this instanceof m, p = D ? n : a.isArray ? [] : new m(n), s = {}, A = a.interceptor && a.interceptor.response || O, B = a.interceptor && a.interceptor.responseError || G, y, F; u(a, function (a, b) { switch (b) { default: s[b] = P(a); case "params": case "isArray": case "interceptor": case "cancellable": } }); !D && E && (y = I.defer(), s.timeout = y.promise, e && (F = J(y.resolve, e))); h && (s.data = n); t.setUrlParams(s, v({}, c(n, a.params || {}), r), a.url); r = q(s).then(function (f) {
                            var c =
                            f.data; if (c) { if (d.isArray(c) !== !!a.isArray) throw z("badcfg", b, a.isArray ? "array" : "object", d.isArray(c) ? "array" : "object", s.method, s.url); if (a.isArray) p.length = 0, u(c, function (b) { "object" === typeof b ? p.push(new m(b)) : p.push(b) }); else { var l = p.$promise; H(c, p); p.$promise = l } } f.resource = p; return f
                        }, function (b) { (C || L)(b); return I.reject(b) }); r["finally"](function () { p.$resolved = !0; !D && E && (p.$cancelRequest = d.noop, J.cancel(F), y = F = s.timeout = null) }); r = r.then(function (b) { var a = A(b); (w || L)(a, b.headers); return a }, B);
                        return D ? r : (p.$promise = r, p.$resolved = !1, E && (p.$cancelRequest = y.resolve), p)
                    }; m.prototype["$" + b] = function (a, c, d) { x(a) && (d = c, c = a, a = {}); a = m[b].call(this, a, this, c, d); return a.$promise || a }
                }); m.bind = function (a) { return K(e, v({}, h, a), n) }; return m
            } var L = d.noop, u = d.forEach, v = d.extend, P = d.copy, x = d.isFunction; B.prototype = {
                setUrlParams: function (e, h, n) {
                    var k = this, c = n || k.template, g, m, q = "", a = k.urlParams = {}; u(c.split(/\W/), function (b) {
                        if ("hasOwnProperty" === b) throw z("badname"); !/^\d+$/.test(b) && b && (new RegExp("(^|[^\\\\]):" +
                        b + "(\\W|$)")).test(c) && (a[b] = { isQueryParamValue: (new RegExp("\\?.*=:" + b + "(?:\\W|$)")).test(c) })
                    }); c = c.replace(/\\:/g, ":"); c = c.replace(t, function (a) { q = a; return "" }); h = h || {}; u(k.urlParams, function (a, e) {
                        g = h.hasOwnProperty(e) ? h[e] : k.defaults[e]; d.isDefined(g) && null !== g ? (m = a.isQueryParamValue ? A(g, !0) : A(g, !0).replace(/%26/gi, "&").replace(/%3D/gi, "=").replace(/%2B/gi, "+"), c = c.replace(new RegExp(":" + e + "(\\W|$)", "g"), function (a, b) { return m + b })) : c = c.replace(new RegExp("(/?):" + e + "(\\W|$)", "g"), function (a, b, c) {
                            return "/" ==
                            c.charAt(0) ? c : b + c
                        })
                    }); k.defaults.stripTrailingSlashes && (c = c.replace(/\/+$/, "") || "/"); c = c.replace(/\/\.(?=\w+($|\?))/, "."); e.url = q + c.replace(/\/\\\./, "/."); u(h, function (a, c) { k.urlParams[c] || (e.params = e.params || {}, e.params[c] = a) })
                }
            }; return K
        }]
    })
})(window, window.angular);
//# sourceMappingURL=angular-resource.min.js.map