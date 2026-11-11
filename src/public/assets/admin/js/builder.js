(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __esm = (fn2, res, err) => function __init() {
    if (err) throw err[0];
    try {
      return fn2 && (res = (0, fn2[__getOwnPropNames(fn2)[0]])(fn2 = 0)), res;
    } catch (e) {
      throw err = [e], e;
    }
  };
  var __commonJS = (cb, mod) => function __require() {
    try {
      return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    } catch (e) {
      throw mod = 0, e;
    }
  };
  var __copyProps = (to2, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to2, key) && key !== except)
          __defProp(to2, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to2;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // node_modules/@zumer/snapdom/dist/snapdom.mjs
  function Xi(t) {
    return t === false || typeof t == "string" && t.toLowerCase().trim() === "disabled" ? "disabled" : "soft";
  }
  function Yi(t = "soft") {
    t === "disabled" && (j.computedStyle = /* @__PURE__ */ new WeakMap(), j.measureHints = /* @__PURE__ */ new WeakMap(), j.baseStyle = new gt(50), j.defaultStyle = new gt(64), j.image = new gt(100), j.background = new gt(100), j.resource = new gt(150), j.compress = new gt(50));
  }
  function ge(t) {
    let e = t.match(/url\((['"]?)(.*?)(\1)\)/);
    if (!e) return null;
    let n = e[2].trim();
    return n.startsWith("#") ? null : n;
  }
  function jc(t) {
    let e = [], n = 0, o = 0, r = "";
    for (let i = 0; i < t.length; i++) {
      let s = t[i];
      if (s === "\\") {
        i++;
        continue;
      }
      r ? s === r && (r = "") : s === '"' || s === "'" ? r = s : s === "(" ? o++ : s === ")" ? o-- : s === "," && o === 0 && (e.push(t.slice(n, i)), n = i + 1);
    }
    return e.push(t.slice(n)), e;
  }
  function hn(t, e = 1) {
    let n = t.match(/^\s*-?(?:webkit-)?image-set\(([\s\S]*)\)\s*$/i);
    if (!n) return null;
    let o = [];
    for (let i of jc(n[1])) {
      let s = i.match(/url\((['"]?)(.*?)(\1)\)/);
      if (!s) continue;
      let a = i.match(/type\(\s*["']([^"']+)["']\s*\)/i);
      if (a && !Hc.test(a[1].trim())) continue;
      let l = i.replace(/url\((['"]?)[\s\S]*?\1\)/, " ").match(/(\d+(?:\.\d+)?)\s*(x|dpi|dppx)\b/i), u = 1;
      if (l) {
        let c = parseFloat(l[1]);
        u = /dpi/i.test(l[2]) ? c / 96 : c;
      }
      o.push({ url: s[2].trim(), dppx: u });
    }
    return o.length ? (o.sort((i, s) => i.dppx - s.dppx), (o.find((i) => i.dppx >= e) || o[o.length - 1]).url) : null;
  }
  function sr(t) {
    if (!t || t === "none") return "";
    let e = t.replace(/translate[XY]?\([^)]*\)/g, "");
    return e = e.replace(/matrix\(([^)]+)\)/g, (n, o) => {
      let r = o.split(",").map((i) => i.trim());
      return r.length !== 6 ? `matrix(${o})` : (r[4] = "0", r[5] = "0", `matrix(${r.join(", ")})`);
    }), e = e.replace(/matrix3d\(([^)]+)\)/g, (n, o) => {
      let r = o.split(",").map((i) => i.trim());
      return r.length !== 16 ? `matrix3d(${o})` : (r[12] = "0", r[13] = "0", `matrix3d(${r.join(", ")})`);
    }), e.trim().replace(/\s{2,}/g, " ");
  }
  function jn(t, e) {
    if (!e) return t;
    let [n, o, r] = e.zoomed, i = t.indexOf("</style>") + 8;
    if (i < 8 || !t.startsWith(n) || !t.startsWith(o, i) || !t.endsWith(r)) return t;
    let [s, a, l] = e.flat;
    return s + t.slice(n.length, i) + a + t.slice(i + o.length, t.length - r.length) + l;
  }
  function ie(t) {
    if (/%[0-9A-Fa-f]{2}/.test(t)) return t;
    try {
      return encodeURI(t);
    } catch {
      return t;
    }
  }
  function ar(t, e) {
    if (!t || /^(data|blob|about|#)/i.test(t.trim())) return t;
    try {
      let n = e || typeof document < "u" && (document.baseURI || document.location?.href) || "http://localhost/";
      return new URL(t, n).href;
    } catch {
      return t;
    }
  }
  function mn(t) {
    return !!t && t.tagName === "INPUT" && (t.getAttribute("type") || "").toLowerCase() === "password";
  }
  function lr(t) {
    return "\u2022".repeat(String(t ?? "").length);
  }
  function ft(t, e) {
    return t?.nodeType === 1 && t.localName === e;
  }
  function Pt(t) {
    return t?.nodeType === 1 && t.namespaceURI === Vc;
  }
  function Nt(t) {
    return t?.nodeType === 1 && t.namespaceURI === Gc;
  }
  function Jt(t) {
    return t?.nodeType === 11 && !!t.host;
  }
  function Bt(t) {
    let e = t?.parentNode;
    return e?.nodeType === 11 ? e.host : null;
  }
  function cr(t) {
    return t?.nodeType === 9;
  }
  function qc(t = "[SnapDOM]", { ttlMs: e = 5 * 6e4, maxEntries: n = 12 } = {}) {
    let o = /* @__PURE__ */ new Map(), r = 0;
    function i(s, a, l) {
      if (r >= n) return;
      let u = Date.now();
      (o.get(a) || 0) > u || (o.set(a, u + e), r++, s === "warn" && console && console.warn ? console.warn(`${t} ${l}`) : console && console.error && console.error(`${t} ${l}`));
    }
    return { warnOnce(s, a) {
      i("warn", s, a);
    }, errorOnce(s, a) {
      i("error", s, a);
    }, reset() {
      o.clear(), r = 0;
    } };
  }
  function Qi(t, e, n) {
    if (Qt.size >= Ji) {
      let o = Date.now();
      for (let [r, i] of Qt) i.until <= o && Qt.delete(r);
      for (; Qt.size >= Ji; ) Qt.delete(Qt.keys().next().value);
    }
    Qt.set(t, { until: Date.now() + n, result: e });
  }
  function Xc(t) {
    return /^data:|^blob:|^about:blank$/i.test(t);
  }
  function Yc(t, e) {
    try {
      let n = typeof location < "u" && location.href ? location.href : "http://localhost/", o = e.split(/\{url(?:Raw)?\}/)[0], r = new URL(o || ".", n);
      if (new URL(t, n).origin === r.origin) return true;
    } catch {
    }
    return false;
  }
  function Kc(t, e) {
    if (!e || Xc(t) || Yc(t, e)) return false;
    try {
      let n = typeof location < "u" && location.href ? location.href : "http://localhost/", o = new URL(t, n);
      return typeof location < "u" ? o.origin !== location.origin : true;
    } catch {
      return !!e;
    }
  }
  function Jc(t, e) {
    if (!e) return t;
    if (/\{url(?:Raw)?\}/.test(e)) return e.replace("{urlRaw}", () => ie(t)).replace("{url}", () => encodeURIComponent(t));
    if (/[?&]url=?$/.test(e)) return `${e}${encodeURIComponent(t)}`;
    if (e.endsWith("?")) return `${e}url=${encodeURIComponent(t)}`;
    if (e.endsWith("/")) return `${e}${ie(t)}`;
    let n = e.includes("?") ? "&" : "?";
    return `${e}${n}url=${encodeURIComponent(t)}`;
  }
  function Zi(t) {
    return new Promise((e, n) => {
      let o = new FileReader();
      o.onload = () => e(String(o.result || "").replace(/^data:[^,]*/, (r) => r.replace(/\s+/g, ""))), o.onerror = () => n(new Error("read_failed")), o.readAsDataURL(t);
    });
  }
  function Qc(t, e) {
    return new Headers(e.headers || {}).keys().next().done ? JSON.stringify([e.as || "blob", e.timeout ?? 3e3, e.useProxy || "", e.errorTTL ?? 8e3, e.credentials || "", t]) : null;
  }
  function ts(t) {
    try {
      return new URL(t, globalThis.location?.href || "http://localhost/").origin;
    } catch {
      return "invalid-url";
    }
  }
  function ur(t, e) {
    try {
      t.onError?.(e);
    } catch {
    }
  }
  async function ut(t, e = {}) {
    let n = e.as ?? "blob", o = e.timeout ?? 3e3, r = e.useProxy || "", i = e.errorTTL ?? 8e3, s = e.headers || {}, a = !!e.debug;
    if (/^data:/i.test(t)) try {
      if (n === "text") return { ok: true, data: String(t), status: 200, url: t, fromCache: false };
      if (n === "dataURL") return { ok: true, data: String(t), status: 200, url: t, fromCache: false, mime: String(t).slice(5).split(";")[0] || "" };
      let [, p = "", y = ""] = String(t).match(/^data:([^,]*),(.*)$/) || [], w = /;base64/i.test(p) ? atob(y) : decodeURIComponent(y), S = new Uint8Array([...w].map((C) => C.charCodeAt(0))), v = new Blob([S], { type: (p || "").split(";")[0] || "" });
      return { ok: true, data: v, status: 200, url: t, fromCache: false, mime: v.type || "" };
    } catch {
      return { ok: false, data: null, status: 0, url: t, fromCache: false, reason: "special_url_error" };
    }
    if (/^blob:/i.test(t)) try {
      let p = await fetch(t);
      if (!p.ok) return { ok: false, data: null, status: p.status, url: t, fromCache: false, reason: "http_error" };
      let y = await p.blob(), b = y.type || p.headers.get("content-type") || "";
      return n === "dataURL" ? { ok: true, data: await Zi(y), blob: y, status: p.status, url: t, fromCache: false, mime: b } : n === "text" ? { ok: true, data: await y.text(), status: p.status, url: t, fromCache: false, mime: b } : { ok: true, data: y, status: p.status, url: t, fromCache: false, mime: b };
    } catch {
      return { ok: false, data: null, status: 0, url: t, fromCache: false, reason: "network" };
    }
    if (/^about:blank$/i.test(t)) return n === "dataURL" ? { ok: true, data: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg==", status: 200, url: t, fromCache: false, mime: "image/png" } : { ok: true, data: n === "text" ? "" : new Blob([]), status: 200, url: t, fromCache: false };
    let l;
    try {
      l = Qc(t, { as: n, timeout: o, useProxy: r, errorTTL: i, credentials: e.credentials, headers: s });
    } catch {
      let p = { ok: false, data: null, status: 0, url: t, fromCache: false, reason: "network" };
      return ur(e, p), p;
    }
    let u = Qt.get(l);
    if (u && u.until > Date.now()) return { ...u.result, fromCache: true };
    u && Qt.delete(l);
    let c = fr.get(l);
    if (c) return c;
    let f = Kc(t, r) ? Jc(t, r) : t, d = e.credentials;
    if (!d) try {
      let p = typeof location < "u" && location.href ? location.href : "http://localhost/", y = new URL(t, p);
      d = typeof location < "u" && y.origin === location.origin ? "include" : "omit";
    } catch {
      d = "omit";
    }
    let h = new AbortController(), m = setTimeout(() => h.abort("timeout"), o), g = (async () => {
      try {
        let p = await fetch(f, { signal: h.signal, credentials: d, headers: s });
        if (!p.ok) {
          let w = { ok: false, data: null, status: p.status, url: f, fromCache: false, reason: "http_error" };
          if (l !== null && i > 0 && Qi(l, w, i), a) {
            let S = `${p.status} ${p.statusText || ""}`.trim();
            Ki.warnOnce(`http:${p.status}:${n}:${ts(t)}`, `Couldn't load ${t} (HTTP ${S}).`);
          }
          return ur(e, w), w;
        }
        if (n === "text") return { ok: true, data: await p.text(), status: p.status, url: f, fromCache: false };
        let y = await p.blob(), b = y.type || p.headers.get("content-type") || "";
        return n === "dataURL" ? { ok: true, data: await Zi(y), blob: y, status: p.status, url: f, fromCache: false, mime: b } : { ok: true, data: y, status: p.status, url: f, fromCache: false, mime: b };
      } catch (p) {
        let y = h.signal.aborted ? h.signal.reason === "timeout" ? "timeout" : "abort" : p && typeof p == "object" && p.name === "AbortError" ? "abort" : "network", b = { ok: false, data: null, status: 0, url: f, fromCache: false, reason: y };
        if (l !== null && !/^blob:/i.test(t) && i > 0 && Qi(l, b, i), a) {
          let w = `${y}:${n}:${ts(t)}`, S = y === "timeout" ? `Timed out loading ${t} after ${o}ms. Raise the timeout option or set useProxy.` : y === "abort" ? `Loading ${t} was cancelled.` : `Couldn't load ${t} (network or CORS). Try the useProxy option.`;
          Ki.errorOnce(w, S);
        }
        return ur(e, b), b;
      } finally {
        clearTimeout(m), fr.delete(l);
      }
    })();
    return l !== null && fr.set(l, g), g;
  }
  async function Ie(t, e = {}) {
    if (/^\s*url\(\s*['"]?data:/i.test(t) || /^((repeating-)?(linear|radial|conic)-gradient)\(/i.test(t) || t.trim() === "none") return t;
    let o = hn(t, typeof devicePixelRatio < "u" && devicePixelRatio || 1) ?? ge(t);
    if (!o) return t;
    let r = ar(o), i = ie(r), s = (e.useProxy || "") + "|" + i;
    if (j.background.has(s)) {
      let a = j.background.get(s);
      return a ? `url("${a}")` : "none";
    }
    try {
      let a = await ut(i, { as: "dataURL", useProxy: e.useProxy, debug: e.debug });
      return a.ok ? (j.background.set(s, a.data), `url("${a.data}")`) : (j.background.set(s, null), "none");
    } catch {
      return j.background.set(s, null), "none";
    }
  }
  function rs(t, e) {
    if (Zc.has(e)) t.add(e);
    else if (e.startsWith("transform-origin-")) t.add("transform-origin");
    else return false;
    return true;
  }
  function as(t) {
    let e = t.replace(rf, "").trim();
    return e ? e.replace(/(^|,)(\s*)(?=,|$)/g, "$1$2*") : "*";
  }
  function ls(t, e, n, o) {
    for (let r = 0; r < t.length; r++) {
      if (--o.budget < 0) return false;
      let i = t[r], s = i.style, a = false, l = false;
      if (s) {
        let c = !!i.selectorText && is.test(i.selectorText);
        for (let f = 0; f < s.length; f++) {
          let d = s[f];
          if (e.add(d), o.svgGeometry && (rs(o.svgGeometry, d) ? a = true : tf.test(d) && (l = true)), c && o.pseudoProps.add(d), s.getPropertyPriority(d) && o.importantProps.add(d), d.length > 5 && (d[0] === "m" || d[0] === "p")) {
            let h = d.startsWith("margin") ? "marginUnstable" : d.startsWith("padding") ? "paddingUnstable" : null;
            h && !o[h] && of.test(s.getPropertyValue(d)) && (o[h] = true);
          }
        }
      }
      let u = i.selectorText;
      if (u && u.includes(":has(") && (o.usesHas = true), u && /[+~]|:has\(|:nth-(?:last-)?child\([^)]*\bof\b/i.test(u) && (o.leaksAcrossSubtrees = true), s && (s.counterReset || s.counterIncrement || s.counterSet || s.content && s.content.includes("counter")) && (o.leaksAcrossSubtrees = true), u && u.includes("&")) for (let c = i.parentRule; c && u.includes("&"); c = c.parentRule) c.selectorText && (u = u.replace(/&/g, `:is(${c.selectorText})`));
      if (u && (o.inContainer || os.test(u) || u.includes("+") || u.includes("~"))) for (let c of Gn(u, ",")) {
        let f = c.trim();
        f && (o.inContainer || os.test(f) || f.includes("+") || f.includes("~")) && o.shareUnsafeSels.add(f);
      }
      if ((a || l) && sf(i, u, a, o), u && u.includes(":")) for (let c in ns) ns[c].test(u) && n[c].push(as(u));
      if (i.styleSheet) {
        if (!Vn(i.styleSheet, e, n, o)) return false;
      } else if (i.cssRules && i.cssRules.length) {
        let c = i.constructor?.name === "CSSContainerRule", f = i.constructor?.name === "CSSScopeRule";
        c && o.inContainer++, f && (o.inScope = (o.inScope || 0) + 1);
        let d = ls(i.cssRules, e, n, o);
        if (c && o.inContainer--, f && o.inScope--, !d) return false;
      }
    }
    return true;
  }
  function sf(t, e, n, o) {
    if (n && t.constructor?.name === "CSSKeyframeRule") {
      o.svgKeyframes = true;
      return;
    }
    if (!e || o.inScope) {
      n && (o.svgGeometryAll = true);
      return;
    }
    let r = n ? o.svgGeometrySels : o.svgAnimSels;
    for (let i of Gn(e, ",")) {
      let s = i.trim();
      s && r.add(is.test(s) ? as(s) : s);
    }
  }
  function Vn(t, e, n, o) {
    let r;
    try {
      r = t.cssRules;
    } catch {
      r = o.crossOriginRules?.(t);
    }
    return r ? ls(r, e, n, o) : false;
  }
  function hr(t, e) {
    for (let n of t) {
      let o = n.effect?.getKeyframes?.() || [];
      for (let r of o) for (let i of Object.keys(r)) i === "offset" || i === "easing" || i === "composite" || i === "computedOffset" || e.add(i.replace(/[A-Z]/g, (s) => "-" + s.toLowerCase()));
    }
  }
  function cs(t) {
    let e = /* @__PURE__ */ new Set();
    return Vn(t, e, { before: [], after: [], firstLetter: [], marker: [], firstLine: [] }, { budget: ss, usesHas: false, leaksAcrossSubtrees: false, shareUnsafeSels: /* @__PURE__ */ new Set(), inContainer: 0, marginUnstable: false, paddingUnstable: false, importantProps: /* @__PURE__ */ new Set(), pseudoProps: /* @__PURE__ */ new Set() }) ? e : null;
  }
  function Gn(t, e) {
    if (!t.includes(e)) return [t];
    let n = [], o = 0, r = null, i = 0;
    for (let s = 0; s < t.length; s++) {
      let a = t[s];
      if (a === "\\") {
        s++;
        continue;
      }
      if (r) {
        a === r && (r = null);
        continue;
      }
      a === '"' || a === "'" ? r = a : a === "(" || a === "[" ? o++ : a === ")" || a === "]" ? o-- : o === 0 && a === e && (n.push(t.slice(i, s)), i = s + 1);
    }
    return n.push(t.slice(i)), n;
  }
  function af(t) {
    let e = 0, n = null, o = 0;
    for (let c = 0; c < t.length; c++) {
      let f = t[c];
      if (n) {
        f === n && t[c - 1] !== "\\" && (n = null);
        continue;
      }
      f === '"' || f === "'" ? n = f : f === "(" || f === "[" ? e++ : f === ")" || f === "]" ? e-- : e === 0 && (f === " " || f === ">" || f === "+" || f === "~") && (o = c + 1);
    }
    let r = "", i = 0;
    for (let c of t.slice(o)) c === "(" || c === "[" ? i++ : c === ")" || c === "]" ? i-- : i === 0 && (r += c);
    let s = (c) => !c || /\\[0-9a-fA-F]/.test(c) ? null : c.replace(/\\(.)/g, "$1"), a = s((r.match(/\.((?:\\.|[\w-])+)/) || [])[1]);
    if (a) return "c" + a;
    let l = s((r.match(/#((?:\\.|[\w-])+)/) || [])[1]);
    if (l) return "i" + l;
    let u = (r.match(/^([a-zA-Z][\w-]*)/) || [])[1];
    return u ? "t" + u.toLowerCase() : null;
  }
  function dr(t, e) {
    if (!e.length) return "";
    if (e.some((o) => o.includes("&"))) return null;
    let n = e.join(",");
    try {
      return t.matches(n), n;
    } catch {
      return null;
    }
  }
  function lf(t, e) {
    let n = {};
    for (let o in e) {
      let r = e[o];
      (o === "before" || o === "after") && r.push("q"), n[o] = dr(t, r);
    }
    return n;
  }
  function fs(t, e) {
    let n = { universe: null, pseudoUniverse: null, svgGeometry: null, svgGeometrySel: null, usesHas: true, leaksAcrossSubtrees: true, shareGate: null, marginUnstable: true, paddingUnstable: true, importantProps: null, pseudoGates: { before: null, after: null, firstLetter: null, marker: null, firstLine: null } };
    try {
      let o = new Set(pr), r = { before: [], after: [], firstLetter: [], marker: [], firstLine: [] }, i = { budget: ss, usesHas: false, leaksAcrossSubtrees: false, shareUnsafeSels: /* @__PURE__ */ new Set(), inContainer: 0, marginUnstable: false, paddingUnstable: false, importantProps: /* @__PURE__ */ new Set(), pseudoProps: /* @__PURE__ */ new Set(), svgGeometry: /* @__PURE__ */ new Set(), svgGeometrySels: /* @__PURE__ */ new Set(), svgAnimSels: /* @__PURE__ */ new Set(), svgKeyframes: false, svgGeometryAll: false, inScope: 0, crossOriginRules: e };
      for (let d of t.styleSheets) if (!Vn(d, o, r, i)) return n;
      let s = t.adoptedStyleSheets;
      if (Array.isArray(s)) {
        for (let d of s) if (!Vn(d, o, r, i)) return n;
      }
      if (typeof t.getAnimations == "function") {
        let d = /* @__PURE__ */ new Set();
        hr(t.getAnimations(), d);
        for (let h of d) o.add(h), rs(i.svgGeometry, h) && (i.svgGeometryAll = true);
      }
      if (i.svgKeyframes) for (let d of i.svgAnimSels) i.svgGeometrySels.add(d);
      let a = t.createElement("div"), l = i.svgGeometryAll ? null : dr(a, Array.from(i.svgGeometrySels)), u = Array.from(i.shareUnsafeSels), c = dr(a, u) === null ? null : u.map((d) => ({ sel: d, key: af(d) })), f = new Set(nf);
      for (let d of ef) o.has(d) && f.add(d);
      for (let d of i.pseudoProps) f.add(d);
      return (i.pseudoProps.has("transform") || i.pseudoProps.has("rotate") || i.pseudoProps.has("scale")) && f.add("transform-origin"), i.pseudoProps.has("perspective") && f.add("perspective-origin"), { universe: o, pseudoUniverse: f, svgGeometry: i.svgGeometry, svgGeometrySel: l, pseudoGates: lf(a, r), usesHas: i.usesHas, leaksAcrossSubtrees: i.leaksAcrossSubtrees, shareGate: c, marginUnstable: i.marginUnstable, paddingUnstable: i.paddingUnstable, importantProps: i.importantProps };
    } catch {
      return n;
    }
  }
  function tt(t) {
    return us.add(t), t.setAttribute("data-snapdom-internal", ""), t;
  }
  function Xt(t) {
    return us.has(t);
  }
  function gr(t) {
    if (t = String(t).toLowerCase(), gn.has(t)) {
      let i = {};
      return j.defaultStyle.set(t, i), i;
    }
    if (j.defaultStyle.has(t)) return j.defaultStyle.get(t);
    let e = [...document.querySelectorAll("#snapdom-sandbox")].find(Xt);
    e || (e = document.createElement("div"), tt(e), e.id = "snapdom-sandbox", e.setAttribute("data-snapdom-sandbox", "true"), e.setAttribute("aria-hidden", "true"), e.style.position = "absolute", e.style.left = "-9999px", e.style.top = "-9999px", e.style.width = "0px", e.style.height = "0px", e.style.overflow = "hidden", document.body.appendChild(e));
    let n = document.createElement(t.includes("-") ? "span" : t);
    n.style.all = "initial", e.appendChild(n);
    let o = getComputedStyle(n), r = {};
    for (let i of o) {
      if (We(i)) continue;
      let s = o.getPropertyValue(i);
      r[i] = s;
    }
    for (let i of pr) !(i in r) && !We(i) && (r[i] = o.getPropertyValue(i));
    return e.removeChild(n), j.defaultStyle.set(t, r), r;
  }
  function We(t) {
    let e = ds.get(t);
    if (e === void 0) {
      let n = String(t).toLowerCase();
      e = uf.has(n) || ff.test(n) || cf.test(n), ds.set(t, e);
    }
    return e;
  }
  function ms(t, e) {
    let n = gf.get(t);
    if (n === void 0 || e[n] !== e[t]) return false;
    let o = e["writing-mode"];
    if (o && o !== "horizontal-tb") return false;
    let r = e.direction;
    return !(r && r !== "ltr");
  }
  function Xn(t, e) {
    return !pf.has(t) && (e === "inline" || df.has(t) || hs.has(t));
  }
  function yr(t, e, n) {
    let o = (e.display || "").toLowerCase();
    if (o === "inline" || hs.has(t)) return false;
    if (n) return true;
    if ((e.float || "none").toLowerCase() !== "none") return false;
    let i = (e.position || "static").toLowerCase();
    return i === "absolute" || i === "fixed" ? false : !bf.has(o);
  }
  function Oe(t, e, n = true, o = false) {
    if (e = String(e || "").toLowerCase(), gn.has(e)) return "";
    let r = [], i = gr(e), s = (t.display || "").toLowerCase(), a = s === "inline", l = Xn(e, s), u = t["text-wrap-mode"] || t["white-space"] || "", c = u === "nowrap" || u === "pre", d = l && n && !(l && n && !a && c), h = false;
    for (let m in t) {
      if (We(m) || ms(m, t)) continue;
      let g = t[m];
      if (!(ps.has(m) && hf.has(e))) {
        if (d) {
          if (ps.has(m)) continue;
          if (mf.has(m)) {
            g && g !== i[m] && (r.push(`${m}:${g}`), g !== "auto" && (h = true));
            continue;
          }
        }
        if (g && g !== i[m]) {
          if ((m === "height" || m === "block-size" || !c && (m === "width" || m === "inline-size")) && g.endsWith("px") && g.includes(".")) {
            let y = parseFloat(g);
            if (Number.isFinite(y)) {
              r.push(`${m}:${(y + yf).toFixed(3)}px`);
              continue;
            }
          }
          r.push(`${m}:${g}`);
        }
      }
    }
    if (d && !a && !o && !h) {
      let m = t.width;
      m && m !== "auto" && m !== i.width && r.push(`min-width:${m}`);
    }
    return r.sort(), r.join(";");
  }
  function br(t) {
    let e = /* @__PURE__ */ new Set();
    return t.nodeType !== Node.ELEMENT_NODE && t.nodeType !== Node.DOCUMENT_FRAGMENT_NODE ? [] : (t.tagName && e.add(t.tagName.toLowerCase()), typeof t.querySelectorAll == "function" && t.querySelectorAll("*").forEach((n) => e.add(n.tagName.toLowerCase())), Array.from(e));
  }
  function wr(t, e = null) {
    let n = /* @__PURE__ */ new Map();
    for (let s of t) {
      let a = gr(s);
      if (!a) continue;
      let c = (e ? Object.entries(a).filter(([d]) => e.has(d)) : Object.entries(a)).filter(([d]) => !ms(d, a)).map(([d, h]) => `${d}:${h};`).sort(), f = c.join("");
      f && (n.has(f) || n.set(f, { tagList: [], declarations: c }), n.get(f).tagList.push(s));
    }
    let o = [...n.values()], r = null;
    for (let { declarations: s } of o) {
      let a = new Set(s);
      if (!r) {
        r = a;
        continue;
      }
      for (let l of r) a.has(l) || r.delete(l);
    }
    r ?? (r = /* @__PURE__ */ new Set());
    let i = "";
    if (r.size && o.length > 1) {
      let s = o.flatMap((a) => a.tagList);
      i += `${s.join(",")} { ${[...r].join("")} }
`;
    }
    for (let { tagList: s, declarations: a } of o) {
      let l = o.length > 1 ? a.filter((c) => !r.has(c)) : a;
      if (!l.length) continue;
      let u = l.join("");
      i += `${s.join(",")} { ${u} }
`;
    }
    return i;
  }
  function yn(t) {
    let e = Array.from(new Set(t.values())).filter(Boolean).sort(), n = /* @__PURE__ */ new Map(), o = 1;
    for (let r of e) n.set(r, `c${o++}`);
    return n;
  }
  function wf(t) {
    try {
      let e = t?.ownerDocument;
      if (!e) return typeof window < "u" ? window : null;
      let n = e.defaultView;
      if (n && typeof n.getComputedStyle == "function") return n;
      if (typeof window < "u" && window.frames) for (let o = 0; o < window.frames.length; o++) try {
        if (window.frames[o]?.document === e) return window.frames[o];
      } catch {
      }
    } catch {
    }
    return typeof window < "u" ? window : null;
  }
  function O(t, e = null) {
    let n = () => {
      let i = { length: 0, getPropertyValue: () => "", item: () => "" };
      return i[Symbol.iterator] = function* () {
      }, i;
    };
    if (t?.nodeType !== 1) {
      let i = typeof window < "u" ? window : null;
      if (i && typeof i.getComputedStyle == "function") try {
        return i.getComputedStyle(t, e) || n();
      } catch {
        return n();
      }
      return n();
    }
    let o = j.computedStyle.get(t);
    o || (o = /* @__PURE__ */ new Map(), j.computedStyle.set(t, o));
    let r = o.get(e);
    if (!r) {
      let i = wf(t), s = null;
      try {
        s = i && typeof i.getComputedStyle == "function" ? i.getComputedStyle(t, e) : null;
      } catch {
      }
      if (!s && typeof window < "u" && typeof window.getComputedStyle == "function") try {
        t.ownerDocument === document && (s = window.getComputedStyle(t, e));
      } catch {
      }
      r = s || n(), o.set(e, r);
    }
    return r;
  }
  function De(t, e = null) {
    let n = {};
    for (let o of e || t) {
      let r = t.getPropertyValue(o);
      r && (n[o] = r);
    }
    for (let o of xf) {
      let r = n[`border-${o}-style`], i = n[`border-${o}-width`];
      (r === "none" || r === "hidden" || i === "0px") && (delete n[`border-${o}-style`], delete n[`border-${o}-width`], delete n[`border-${o}-color`]);
    }
    return n;
  }
  function se(t) {
    let e = [], n = 0, o = 0, r = "";
    for (let i = 0; i < t.length; i++) {
      let s = t[i];
      if (s === "\\") {
        i++;
        continue;
      }
      if (r) {
        s === r && (r = "");
        continue;
      }
      (s === '"' || s === "'") && (r = s), s === "(" && n++, s === ")" && n--, s === "," && n === 0 && (e.push(t.slice(o, i).trim()), o = i + 1);
    }
    return e.push(t.slice(o).trim()), e;
  }
  function Ct(t = 1e3) {
    return typeof requestAnimationFrame != "function" || typeof document < "u" && document.visibilityState === "hidden" ? Promise.resolve() : new Promise((e) => {
      let n = false, o = () => {
        n || (n = true, e());
      };
      try {
        requestAnimationFrame(o);
      } catch {
        o();
        return;
      }
      setTimeout(o, t);
    });
  }
  async function wn(t = document) {
    let e = t.fonts, n = false, o = e.ready.then(() => {
      n = true;
    }, () => {
      n = true;
    });
    for (; !n && e.status === "loading"; ) {
      let r = [...e].filter((i) => i.status === "loading");
      if (!r.length) return;
      await Promise.race([o, Promise.allSettled(r.map((i) => i.loaded))]);
    }
  }
  function gs(t) {
    if (t !== false && t !== "auto") return null;
    let e = performance.now() + (t === "auto" ? Sf : xr), n = null, o = { yielded: false, due: () => performance.now() >= e, pause: () => n || (n = Sr().then(() => {
      n = null, o.yielded = true, e = performance.now() + xr;
    })) };
    return o;
  }
  function Sr() {
    return new Promise((t) => {
      let e = new MessageChannel();
      e.port1.onmessage = () => t(), e.port2.postMessage(0);
    });
  }
  async function Yn() {
    bn >= 0 && performance.now() - bn > xr && await Sr(), bn < 0 && (bn = performance.now(), Sr().then(() => {
      bn = -1;
    }));
  }
  function xn() {
    if (typeof navigator > "u") return false;
    if (navigator.userAgentData) return navigator.userAgentData.platform === "iOS";
    let t = navigator.userAgent || "", e = /iPhone|iPad|iPod/.test(t), n = navigator.maxTouchPoints > 2 && /Macintosh/.test(t);
    return e || n;
  }
  function Y() {
    if (typeof navigator > "u") return false;
    let t = navigator.userAgent || "", e = t.toLowerCase(), n = e.includes("safari") && !e.includes("chrome") && !e.includes("crios") && !e.includes("fxios") && !e.includes("android"), o = /applewebkit/i.test(t), r = /mobile/i.test(t), i = !/safari/i.test(t), s = o && r && i, a = /(micromessenger|wxwork|wecom|windowswechat|macwechat)/i.test(t), l = /(baiduboxapp|baidubrowser|baidusearch|baiduboxlite)/i.test(e), u = /ipad|iphone|ipod/.test(e) && o;
    return n || s || a || l || u;
  }
  function _t() {
    return typeof navigator > "u" ? false : (navigator.userAgent || "").toLowerCase().includes("firefox");
  }
  function D(t, e, n) {
    let o = t && typeof t == "object" && (t.options || t);
    o && o.debug && (n !== void 0 ? console.warn("[SnapDOM]", e, n) : console.warn("[SnapDOM]", e));
  }
  function nt(t, e, n, o) {
    let r = t && t.warnings;
    r && r.length < vf && r.push(o === void 0 ? { code: e, message: n } : { code: e, message: n, detail: o });
  }
  function Yr(t) {
    return Qa(t.boxShadow);
  }
  function Kr(t) {
    return Qa(t.textShadow);
  }
  function Qa(t) {
    if (!t || t === "none") return { top: 0, right: 0, bottom: 0, left: 0 };
    let e = [], n = "", o = 0;
    for (let l = 0; l < t.length; l++) {
      let u = t[l];
      u === "(" ? o++ : u === ")" && (o = Math.max(0, o - 1)), u === "," && o === 0 ? (e.push(n), n = "") : n += u;
    }
    n.trim() && e.push(n);
    let r = 0, i = 0, s = 0, a = 0;
    for (let l of e) {
      if (/\binset\b/i.test(l)) continue;
      let u = l.match(/-?\d+(\.\d+)?px/g)?.map((p) => parseFloat(p)) || [];
      if (u.length < 2) continue;
      let [c, f, d = 0, h = 0] = u, m = Math.abs(c) + d + h, g = Math.abs(f) + d + h;
      i = Math.max(i, m + Math.max(c, 0)), a = Math.max(a, m + Math.max(-c, 0)), s = Math.max(s, g + Math.max(f, 0)), r = Math.max(r, g + Math.max(-f, 0));
    }
    return { top: Math.ceil(r), right: Math.ceil(i), bottom: Math.ceil(s), left: Math.ceil(a) };
  }
  function Jr(t) {
    let e = t.filter && t.filter !== "none" ? t.filter : t.webkitFilter || "", n = /blur\(\s*([0-9.]+)px\s*\)/gi, o = 0, r;
    for (; r = n.exec(e); ) o += parseFloat(r[1]) || 0;
    let i = Math.ceil(o * 2);
    return { top: i, right: i, bottom: i, left: i };
  }
  function Qr(t) {
    if ((t.outlineStyle || "none") === "none") return { top: 0, right: 0, bottom: 0, left: 0 };
    let e = Math.ceil(parseFloat(t.outlineWidth || "0") || 0), n = parseFloat(t.outlineOffset || "0") || 0, o = e + Math.max(0, Math.ceil(n));
    return { top: o, right: o, bottom: o, left: o };
  }
  function Zr(t) {
    let e = `${t.filter || ""} ${t.webkitFilter || ""}`.trim();
    if (!e || e === "none") return { bleed: { top: 0, right: 0, bottom: 0, left: 0 }, has: false };
    let n = e.match(/drop-shadow\((?:[^()]|\([^()]*\))*\)/gi) || [], o = 0, r = 0, i = 0, s = 0, a = false;
    for (let l of n) {
      a = true;
      let u = l.match(/-?\d+(?:\.\d+)?px/gi)?.map((g) => parseFloat(g)) || [], [c = 0, f = 0, d = 0] = u, h = Math.abs(c) + d, m = Math.abs(f) + d;
      r = Math.max(r, h + Math.max(c, 0)), s = Math.max(s, h + Math.max(-c, 0)), i = Math.max(i, m + Math.max(f, 0)), o = Math.max(o, m + Math.max(-f, 0));
    }
    return { bleed: { top: H(o), right: H(r), bottom: H(i), left: H(s) }, has: a };
  }
  function Vd(t) {
    let e = Yr(t), n = Kr(t), o = Jr(t), r = Qr(t), i = Zr(t);
    return { top: Math.max(e.top, n.top) + o.top + r.top + i.bleed.top, right: Math.max(e.right, n.right) + o.right + r.right + i.bleed.right, bottom: Math.max(e.bottom, n.bottom) + o.bottom + r.bottom + i.bleed.bottom, left: Math.max(e.left, n.left) + o.left + r.left + i.bleed.left };
  }
  function Gd(t) {
    return t.boxShadow && t.boxShadow !== "none" || t.textShadow && t.textShadow !== "none" || (t.outlineStyle || "none") !== "none" || t.filter && t.filter !== "none" ? true : !!t.webkitFilter && t.webkitFilter !== "none";
  }
  function Ja(t) {
    let e = t.overflowX || t.overflow || "visible", n = t.overflowY || t.overflow || "visible", o = !!t.contain && /\b(paint|content|strict)\b/.test(t.contain) || !!t.clipPath && t.clipPath !== "none";
    return { x: o || e !== "visible", y: o || n !== "visible" };
  }
  function ti(t, e, n, o = 1, r = 1) {
    let i = 0, s = 0, a = 0, l = 0, u = Ja(n.get(t) || O(t));
    if (u.x && u.y) return { top: 0, right: 0, bottom: 0, left: 0 };
    let c = t.getBoundingClientRect();
    for (let f of e.values()) {
      if (f === t || f.nodeType !== 1 || f.ownerDocument !== t.ownerDocument) continue;
      let d = n.get(f);
      if (!d || !Gd(d)) continue;
      let h = Vd(d);
      if (!(h.top || h.right || h.bottom || h.left)) continue;
      let m = f.getBoundingClientRect(), g = { left: m.left - h.left / o, top: m.top - h.top / r, right: m.right + h.right / o, bottom: m.bottom + h.bottom / r };
      for (let p = f.parentElement; p; p = p.parentElement) {
        let y = Ja(n.get(p) || O(p));
        if (y.x || y.y) {
          let b = p.getBoundingClientRect();
          y.x && (g.left = Math.max(g.left, b.left), g.right = Math.min(g.right, b.right)), y.y && (g.top = Math.max(g.top, b.top), g.bottom = Math.min(g.bottom, b.bottom));
        }
        if (p === t) break;
      }
      u.x || (l = Math.max(l, (c.left - g.left) * o), s = Math.max(s, (g.right - c.right) * o)), u.y || (i = Math.max(i, (c.top - g.top) * r), a = Math.max(a, (g.bottom - c.bottom) * r));
    }
    return { top: Math.max(0, Math.ceil(i)), right: Math.max(0, Math.ceil(s)), bottom: Math.max(0, Math.ceil(a)), left: Math.max(0, Math.ceil(l)) };
  }
  function Za(t, e) {
    if (!t || !e || !e.style) return null;
    let n = getComputedStyle(t);
    try {
      e.style.transformOrigin = "0 0";
    } catch {
    }
    try {
      "translate" in e.style && (e.style.translate = "none"), "rotate" in e.style && (e.style.rotate = "none");
    } catch {
    }
    let o = n.transform || "none";
    if (!o || o === "none") {
      let l = null;
      try {
        l = ke(t).scale;
      } catch {
      }
      try {
        e.style.transform = "none";
      } catch {
      }
      if (!l) return { a: 1, b: 0, c: 0, d: 1 };
      let u = de({ scale: l });
      return { a: u.a, b: u.b, c: u.c, d: u.d };
    }
    function r(l, u, c, f) {
      let d = Math.sqrt(l * l + u * u) || 0, h = 0, m = 0;
      if (d > 0) {
        let g = l / d, p = u / d;
        h = g * c + p * f;
        let y = c - g * h, b = f - p * h;
        m = Math.sqrt(y * y + b * b) || 0, m > 0 ? h = h / m : h = 0;
      }
      return { a: d, b: 0, c: h * m, d: m };
    }
    let i = (l) => {
      let u = ke(t).scale;
      if (!u) return l;
      let c = de({ scale: u, baseTransform: `matrix(${l.a},${l.b},${l.c},${l.d},0,0)` });
      return { a: c.a, b: c.b, c: c.c, d: c.d };
    }, s = o.match(/^matrix\(\s*([^)]+)\)$/i);
    if (s) {
      let l = s[1].split(",").map((u) => parseFloat(u.trim()));
      if (l.length === 6 && l.every(Number.isFinite)) {
        let [u, c, f, d] = l, h = r(u, c, f, d);
        try {
          e.style.transform = `matrix(${h.a}, ${h.b}, ${h.c}, ${h.d}, 0, 0)`;
        } catch {
        }
        return i(h);
      }
    }
    let a = o.match(/^matrix3d\(\s*([^)]+)\)$/i);
    if (a) {
      let l = a[1].split(",").map((u) => parseFloat(u.trim()));
      if (l.length === 16 && l.every(Number.isFinite)) {
        let u = l[0], c = l[1], f = l[4], d = l[5], h = r(u, c, f, d);
        try {
          e.style.transform = `matrix(${h.a}, ${h.b}, ${h.c}, ${h.d}, 0, 0)`;
        } catch {
        }
        return i(h);
      }
    }
    try {
      let l = new DOMMatrix(o), u = r(l.a, l.b, l.c, l.d);
      try {
        e.style.transform = `matrix(${u.a}, ${u.b}, ${u.c}, ${u.d}, 0, 0)`;
      } catch {
      }
      return i(u);
    } catch {
      return null;
    }
  }
  function tn(t, e, n, o, r) {
    let i = n.a, s = n.b, a = n.c, l = n.d, u = n.e || 0, c = n.f || 0;
    function f(y, b) {
      let w = y - o, S = b - r, v = i * w + a * S, C = s * w + l * S;
      return v += o + u, C += r + c, [v, C];
    }
    let d = [f(0, 0), f(t, 0), f(0, e), f(t, e)], h = 1 / 0, m = 1 / 0, g = -1 / 0, p = -1 / 0;
    for (let [y, b] of d) y < h && (h = y), b < m && (m = b), y > g && (g = y), b > p && (p = b);
    return { minX: h, minY: m, maxX: g, maxY: p, width: g - h, height: p - m };
  }
  function Tn(t, e, n) {
    let o = (t.transformOrigin || "0 0").trim().split(/\s+/), [r, i] = [o[0] || "0", o[1] || "0"], s = (a, l) => {
      let u = a.toLowerCase();
      return u === "left" || u === "top" ? 0 : u === "center" ? l / 2 : u === "right" || u === "bottom" ? l : u.endsWith("px") ? parseFloat(u) || 0 : u.endsWith("%") ? (parseFloat(u) || 0) * l / 100 : /^-?\d+(\.\d+)?$/.test(u) && parseFloat(u) || 0;
    };
    return { ox: s(r, e), oy: s(i, n) };
  }
  function ke(t) {
    let e = { rotate: "0deg", scale: null, translate: null }, n = null;
    try {
      n = typeof t.computedStyleMap == "function" ? t.computedStyleMap() : null;
    } catch {
    }
    if (n) {
      let r = (l) => {
        try {
          return typeof n.has == "function" && !n.has(l) || typeof n.get != "function" ? null : n.get(l);
        } catch {
          return null;
        }
      }, i = r("rotate");
      if (i) if (i.angle) {
        let l = i.angle;
        e.rotate = l.unit === "rad" ? l.value * 180 / Math.PI + "deg" : l.value + l.unit, i.is2D === false && i.x && i.y && i.z && (e.rotate = `${i.x.value} ${i.y.value} ${i.z.value} ${e.rotate}`);
      } else i.unit ? e.rotate = i.unit === "rad" ? i.value * 180 / Math.PI + "deg" : i.value + i.unit : e.rotate = String(i);
      else {
        let l = getComputedStyle(t);
        e.rotate = l.rotate && l.rotate !== "none" ? l.rotate : "0deg";
      }
      let s = r("scale");
      if (s) {
        let l = (u) => u && u.value != null ? `${u.value}${u.unit === "percent" ? "%" : ""}` : null;
        "x" in s && s.x?.value != null ? e.scale = [l(s.x), l(s.y) ?? l(s.x), ...s.is2D === false ? [l(s.z) ?? "1"] : []].join(" ") : Array.isArray(s) ? e.scale = s.map(l).join(" ") : e.scale = String(s);
      } else {
        let l = getComputedStyle(t);
        e.scale = l.scale && l.scale !== "none" ? l.scale : null;
      }
      let a = r("translate");
      if (a) {
        let l = (u) => u && u.value != null ? `${u.value}${u.unit === "percent" ? "%" : u.unit || "px"}` : null;
        "x" in a && a.x?.value != null ? e.translate = [l(a.x), l(a.y) ?? "0px", ...a.is2D === false ? [l(a.z) ?? "0px"] : []].join(" ") : Array.isArray(a) ? e.translate = a.map(l).join(" ") : e.translate = String(a);
      } else {
        let l = getComputedStyle(t);
        e.translate = l.translate && l.translate !== "none" ? l.translate : null;
      }
      return (!e.rotate || e.rotate === "none") && (e.rotate = "0deg"), (!e.scale || e.scale === "none") && (e.scale = null), (!e.translate || e.translate === "none") && (e.translate = null), e;
    }
    let o = getComputedStyle(t);
    return e.rotate = o.rotate && o.rotate !== "none" ? o.rotate : "0deg", e.scale = o.scale && o.scale !== "none" ? o.scale : null, e.translate = o.translate && o.translate !== "none" ? o.translate : null, e;
  }
  function qd() {
    if (Xr?.isConnected) return Xr;
    let t = document.createElement("div");
    return t.id = "snapdom-measure-slot", t.setAttribute("aria-hidden", "true"), tt(t), Object.assign(t.style, { position: "absolute", left: "-99999px", top: "0px", width: "0px", height: "0px", overflow: "hidden", opacity: "0", pointerEvents: "none", contain: "size layout style" }), document.documentElement.appendChild(t), Xr = t, t;
  }
  function de(t) {
    let e = (i) => {
      let s = [], a = 0, l = 0, u = String(i).trim();
      for (let c = 0; c < u.length; c++) u[c] === "(" ? a++ : u[c] === ")" ? a-- : /\s/.test(u[c]) && !a && (c > l && s.push(u.slice(l, c)), l = c + 1);
      return l < u.length && s.push(u.slice(l)), s;
    }, n = (i) => i && i !== "none", o = [];
    if (n(t.translate)) {
      let i = e(t.translate);
      for (let s = 0; s < 2 && s < i.length; s++) {
        let a = s === 0 ? t.width : t.height;
        /^[+-]?(?:\d*\.)?\d+%$/.test(i[s]) && Number.isFinite(a) && (i[s] = `${parseFloat(i[s]) * a / 100}px`);
      }
      o.push(i.length > 2 ? `translate3d(${i.join(",")})` : `translate(${i.join(",")})`);
    }
    if (n(t.rotate) && t.rotate !== "0deg") {
      let i = e(t.rotate);
      i.length === 4 ? o.push(`rotate3d(${i.join(",")})`) : i.length === 2 && /^[xyz]$/i.test(i[0]) ? o.push(`rotate${i[0].toUpperCase()}(${i[1]})`) : o.push(`rotate(${i.join(" ")})`);
    }
    if (n(t.scale)) {
      let i = e(t.scale).map((s) => /%$/.test(s) ? String(parseFloat(s) / 100) : s);
      o.push(i.length > 2 ? `scale3d(${i.join(",")})` : `scale(${i.join(",")})`);
    }
    if (n(t.baseTransform) && o.push(t.baseTransform), !o.length) return new DOMMatrix();
    let r = o.join(" ");
    try {
      if (r.includes("%")) throw new Error("Transform needs a reference box");
      return new DOMMatrix(r);
    } catch {
      let i = qd(), s = document.createElement("div");
      if (s.style.cssText = "all:initial!important;display:block!important;transform-origin:0 0!important", s.style.setProperty("width", `${Number.isFinite(t.width) ? t.width : 0}px`, "important"), s.style.setProperty("height", `${Number.isFinite(t.height) ? t.height : 0}px`, "important"), s.style.setProperty("transform", r, "important"), !s.style.transform) throw new Error("[SnapDOM] Couldn't read the transform of an element.");
      i.appendChild(s);
      try {
        return Xd(s);
      } finally {
        s.remove();
      }
    }
  }
  function tl(t) {
    let e = O(t), n = e.transform || "none";
    if (n !== "none" && !/^matrix\(\s*1\s*,\s*0\s*,\s*0\s*,\s*1\s*,\s*0\s*,\s*0\s*\)$/i.test(n)) return true;
    let r = e.rotate && e.rotate !== "none" && e.rotate !== "0deg", i = e.scale && e.scale !== "none" && e.scale !== "1", s = e.translate && e.translate !== "none" && e.translate !== "0px 0px";
    return !!(r || i || s);
  }
  function Xd(t) {
    let e = getComputedStyle(t).transform;
    if (!e || e === "none") return new DOMMatrix();
    try {
      return new DOMMatrix(e);
    } catch {
      return new WebKitCSSMatrix(e);
    }
  }
  function Mo(t, e) {
    if (!e) return null;
    let n = t.ownerDocument || document, o = n.defaultView || window, r, i, s, a;
    if (e === "viewport") r = 0, i = 0, s = n.documentElement?.clientWidth || o.innerWidth, a = n.documentElement?.clientHeight || o.innerHeight;
    else if (typeof e == "object") r = (Number(e.x) || 0) - (o.scrollX || 0), i = (Number(e.y) || 0) - (o.scrollY || 0), s = Number(e.width), a = Number(e.height);
    else return null;
    return s > 0 && a > 0 ? { left: r, top: i, width: s, height: a, right: r + s, bottom: i + a } : null;
  }
  function Nn(t) {
    if (t.parentElement) return t.parentElement;
    let e = t.getRootNode && t.getRootNode();
    return Jt(e) ? e.host : null;
  }
  function Yd(t, e) {
    for (let n = e; n; n = Nn(n)) if (n === t) return true;
    return false;
  }
  function Kd(t, e) {
    for (let n = Nn(t); n && n !== e && n?.nodeType === 1; n = Nn(n)) {
      let o = O(n);
      if (o.position !== "static" || ei(o)) return n;
    }
    return null;
  }
  function ei(t) {
    return t.transform && t.transform !== "none" || t.filter && t.filter !== "none" || t.backdropFilter && t.backdropFilter !== "none" || t.perspective && t.perspective !== "none" || /transform|perspective|filter/.test(t.willChange || "") || /layout|paint|strict|content/.test(t.contain || "");
  }
  function rl(t, e, n, o, r, i) {
    if (t.scrollTop || t.scrollLeft) return;
    let s = o.get(t) || O(t);
    if (ei(s)) return;
    let a = s.position !== "static", l = /* @__PURE__ */ new Map();
    for (let [u, c] of e) {
      let f = n.get(u);
      if (!f) continue;
      let d = l.get(f);
      if (d === void 0 && l.set(f, d = Jd.exec(f)?.[1] || ""), !d || d === "absolute" && a || oi.has(u)) continue;
      let h = false;
      for (let y = Nn(c); y && y !== t && y.nodeType === 1; y = Nn(y)) {
        let b = o.get(y) || O(y);
        if (d === "absolute" && b.position !== "static" || ei(b)) {
          h = true;
          break;
        }
      }
      if (h) continue;
      let m = o.get(c) || O(c), g = parseFloat(m.left), p = parseFloat(m.top);
      r && Number.isFinite(g) && (u.style.left = `${g + r}px`), i && Number.isFinite(p) && (u.style.top = `${p + i}px`);
    }
  }
  function ri(t, e) {
    try {
      return de({ baseTransform: t, rotate: e?.rotate, scale: e?.scale });
    } catch {
      return null;
    }
  }
  function il(t, e, n, o, r) {
    let i = t.getBoundingClientRect();
    Pt(e) && O(t).position === "static" && (e.style.position = "relative");
    let s = [];
    for (let [a, l] of n) {
      if (l?.nodeType !== 1) continue;
      let u = a.localName === "svg" && Nt(a) && !Nt(l.parentNode);
      if (!Pt(a) && !u || l === t || !Yd(t, l)) continue;
      let c = o.get(l) || O(l), f = c.position;
      if (f !== "fixed" && f !== "sticky" && f !== "-webkit-sticky" || a.style.position === "absolute") continue;
      let d = l.getBoundingClientRect();
      if (!(d.width > 0 && d.height > 0)) continue;
      oi.add(a);
      let h = c.transform && c.transform !== "none" ? c.transform : "", m = ke(l), g = !!(h || m.rotate !== "0deg" || m.scale || m.translate), p = g ? ri(h, m) : null, y = !p || !p.is2D || p.a === 1 && p.b === 0 && p.c === 0 && p.d === 1, b = d.width, w = d.height;
      y || (b = l.offsetWidth || d.width, w = l.offsetHeight || d.height);
      let S = l.getRootNode && Jt(l.getRootNode()), v = i, C = t.clientLeft || 0, M = t.clientTop || 0;
      if (S) {
        let _ = Kd(l, t);
        _ && (v = _.getBoundingClientRect(), C = _.clientLeft || 0, M = _.clientTop || 0);
      }
      let $2 = d.left - v.left - C, F = d.top - v.top - M;
      if (g) if (a.style.translate = "none", a.style.rotate = "none", a.style.scale = "none", y) a.style.transform = "none";
      else {
        a.style.transform = `matrix(${p.a},${p.b},${p.c},${p.d},0,0)`;
        let { ox: _, oy: P } = Tn(c, b, w), E = tn(b, w, { a: p.a, b: p.b, c: p.c, d: p.d, e: 0, f: 0 }, _, P);
        $2 -= E.minX, F -= E.minY;
      }
      if (f !== "fixed") {
        let _ = a.cloneNode(false);
        _.setAttribute("data-snap-ph", "1"), _.style.position = "static", _.style.visibility = "hidden", _.style.width = `${b}px`, _.style.height = `${w}px`, _.style.boxSizing = "border-box", a.parentElement?.insertBefore(_, a);
      }
      let A = u ? b : b + 2, x = w;
      r && (Math.abs(F - r.y) < 0.5 && (F -= 1, x += 1), Math.abs($2 - r.x) < 0.5 && ($2 -= 1, A += 1)), a.style.position = "absolute", a.style.left = `${$2}px`, a.style.top = `${F}px`, a.style.right = "auto", a.style.bottom = "auto", a.style.margin = "0", a.style.width = `${A}px`, a.style.height = `${x}px`, a.style.boxSizing = "border-box", S || s.push(a);
    }
    for (let a of s) e.appendChild(a);
  }
  function sl(t, e, n = {}) {
    if (!t || !e || !e.style) return;
    let o = getComputedStyle(t);
    try {
      e.style.boxShadow = "none";
    } catch (s) {
      D(n, "Couldn't remove the root box-shadow.", s);
    }
    try {
      e.style.textShadow = "none";
    } catch (s) {
      D(n, "Couldn't remove the root text-shadow.", s);
    }
    try {
      e.style.outline = "none";
    } catch (s) {
      D(n, "Couldn't remove the root outline.", s);
    }
    let i = (o.filter || "").replace(/\bdrop-shadow\((?:[^()]|\([^()]*\))*\)\s*/gi, "").trim().replace(/\s+/g, " ");
    try {
      e.style.filter = i.length ? i : "none";
    } catch (s) {
      D(n, "Couldn't remove the root drop-shadow filter.", s);
    }
  }
  function al(t, e) {
    if (!t || !e || !e.style) return;
    let n = 1;
    try {
      n = parseFloat(getComputedStyle(t).zoom);
    } catch {
      return;
    }
    if (!(!e.style.getPropertyValue("zoom") && (!Number.isFinite(n) || n === 1))) try {
      e.style.setProperty("zoom", "1", "important");
    } catch {
    }
  }
  function el(t) {
    let e = t.display || "";
    if (e.includes("flex") || e.includes("grid") || e.startsWith("table") || e === "inline-block" || e === "flow-root" || t.position === "absolute" || t.position === "fixed" || t.float && t.float !== "none") return true;
    let n = t.overflowX || t.overflow || "visible", o = t.overflowY || t.overflow || "visible";
    return !!(n !== "visible" || o !== "visible" || t.contain && /\b(layout|content|paint|strict)\b/.test(t.contain));
  }
  function ll(t, e) {
    let n = Array.from(t.childNodes), o = e === "top" ? n : n.reverse();
    for (let r of o) {
      if (r.nodeType === Node.TEXT_NODE) {
        if (/\S/.test(r.textContent || "")) return null;
        continue;
      }
      if (r.nodeType !== Node.ELEMENT_NODE) continue;
      let i = getComputedStyle(r), s = String(i.display || "");
      if (s !== "none") {
        if (s === "contents") {
          let a = ll(r, e);
          if (a !== void 0) return a;
          continue;
        }
        if (!(i.position === "absolute" || i.position === "fixed")) return i.float && i.float !== "none" || s.startsWith("inline") ? null : r;
      }
    }
  }
  function cl(t, e, n, o = null) {
    if (!t || !e || !e.style) return;
    let r = getComputedStyle(t);
    if (!el(r)) for (let i of ["top", "bottom"]) {
      let s = i === "top" ? "Top" : "Bottom";
      if ((parseFloat(r[`border${s}Width`]) || 0) > 0 || (parseFloat(r[`padding${s}`]) || 0) > 0) continue;
      let a = t, l = e;
      for (; a && l; ) {
        let u = ll(a, i);
        if (!u) break;
        let c = n ? Array.from(l.children).find((h) => n.get(h) === u) || o?.get(u) || null : l.children[Array.from(a.children).indexOf(u)] || null, f = getComputedStyle(u), d = parseFloat(f[`margin${s}`]) || 0;
        if (c && c.style && d > 0 && (c.style[`margin${s}`] = "0px"), el(f) || (parseFloat(f[`border${s}Width`]) || 0) > 0 || (parseFloat(f[`padding${s}`]) || 0) > 0) break;
        a = u, l = c;
      }
    }
  }
  function Zd(t, e) {
    if (t.startsWith("*") || t === "xmlns" || t.includes("@")) return true;
    if (t.includes(":")) {
      let n = t.split(":", 1)[0];
      if (!Qd.has(n)) return true;
    }
    return e ? t.startsWith("x-") || t.startsWith("v-") || t.startsWith(":") || t.startsWith("on:") || t.startsWith("bind:") || t.startsWith("let:") || t.startsWith("class:") : false;
  }
  function Ao(t, e = {}) {
    if (!t) return;
    let { stripFrameworkDirectives: n = true } = e, o = (a) => {
      for (let l of Array.from(a.attributes)) {
        if (Zd(l.name, n)) {
          a.removeAttribute(l.name);
          continue;
        }
        if (ep.test(l.value)) continue;
        let u = nl(l.value);
        if (u !== l.value) try {
          a.setAttribute(l.name, u);
        } catch {
        }
      }
    };
    t.nodeType === Node.ELEMENT_NODE && o(t);
    let r = [], i = document.createTreeWalker(t, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT | NodeFilter.SHOW_COMMENT), s;
    for (; s = i.nextNode(); ) if (s.nodeType === Node.ELEMENT_NODE) o(s);
    else if (s.nodeType === Node.COMMENT_NODE) r.push(s);
    else {
      let a = nl(s.data);
      a !== s.data && (s.data = a);
    }
    for (let a of r) a.remove();
  }
  function np(t) {
    try {
      let e = t.getAttribute?.("style") || "";
      return /\b(height|width|block-size|inline-size)\s*:/.test(e);
    } catch {
      return false;
    }
  }
  function rp(t) {
    return Nt(t) || op.has(t?.localName);
  }
  function ip(t, e) {
    if (t?.nodeType !== 1 || np(t) || rp(t)) return false;
    let n = e.position;
    if (n === "absolute" || n === "fixed" || n === "sticky") return false;
    let o = e.display || "";
    return !(o.includes("flex") || o.includes("grid") || o.startsWith("table") || e.transform && e.transform !== "none");
  }
  function fl(t, e, n = /* @__PURE__ */ new Map(), o = null) {
    function r(i, s) {
      if (i?.nodeType !== 1 || s?.nodeType !== 1) return;
      let a = i.childElementCount > s.childElementCount, l = n.get(i) || getComputedStyle(i);
      if (n.has(i) || n.set(i, l), a && ip(i, l)) {
        s.style.height || (s.style.height = "auto"), s.style.width || (s.style.width = "auto"), s.style.removeProperty("block-size"), s.style.removeProperty("inline-size"), s.style.minHeight || (s.style.minHeight = "0"), s.style.minWidth || (s.style.minWidth = "0"), s.style.maxHeight || (s.style.maxHeight = "none"), s.style.maxWidth || (s.style.maxWidth = "none");
        let c = l.overflowY || l.overflowBlock || "visible", f = l.overflowX || l.overflowInline || "visible";
        (c !== "visible" || f !== "visible") && (s.style.overflow = "visible");
      }
      let u = Array.from(s.children);
      if (o) for (let c of u) {
        let f = o.get(c);
        f && f.nodeType === 1 && r(f, c);
      }
      else {
        let c = Array.from(i.children);
        for (let f = 0; f < Math.min(c.length, u.length); f++) r(c[f], u[f]);
      }
    }
    r(t, e);
  }
  function sp(t) {
    let e = getComputedStyle(t);
    return !(e.display === "none" || e.position === "absolute" || e.position === "fixed");
  }
  function ap(t, e) {
    if (t?.nodeType !== 1) return false;
    if (t.getAttribute("data-capture") === "exclude") return e?.excludeMode === "remove";
    if (Array.isArray(e?.exclude)) for (let n of e.exclude) try {
      if (t.matches(n)) return e.excludeMode === "remove";
    } catch (o) {
      D(e, "Invalid exclude selector; ignored.", o);
    }
    if (Array.isArray(e?.excludePredicates)) for (let n of e.excludePredicates) try {
      if (n(t)) return e.excludeMode === "remove";
    } catch (o) {
      D(e, "Your exclude function threw; ignored.", o);
    }
    if (typeof e?.filter == "function" && e.filterMode === "remove") try {
      if (!e.filter(t)) return true;
    } catch (n) {
      D(e, "Your filter function threw; ignored.", n);
    }
    return false;
  }
  function ii(t, e) {
    let n = getComputedStyle(t), o = t.getBoundingClientRect(), r = 1 / 0, i = -1 / 0, s = false, a = Array.from(t.children);
    for (let h of a) {
      if (ap(h, e) || !sp(h)) continue;
      let m = h.getBoundingClientRect(), g = m.top - o.top, p = m.bottom - o.top;
      p <= g || (g < r && (r = g), p > i && (i = p), s = true);
    }
    let l = s ? Math.max(0, i - r) : 0, u = parseFloat(n.borderTopWidth) || 0, c = parseFloat(n.borderBottomWidth) || 0, f = parseFloat(n.paddingTop) || 0, d = parseFloat(n.paddingBottom) || 0;
    return u + c + f + d + l;
  }
  function si(t) {
    let e = document.implementation.createHTMLDocument(""), n = e.importNode(t, true);
    for (let o of [n, ...n.querySelectorAll("*")]) {
      let r = o.localName.includes("-");
      if (!Pt(o) || !(r || o.hasAttribute("is"))) continue;
      let i = e.createElement(r ? "span" : o.localName);
      for (let s of o.attributes) s.name !== "is" && i.setAttribute(s.name, s.value);
      i.append(...o.childNodes), o === n ? n = i : o.replaceWith(i);
    }
    return n;
  }
  function Ln(t, e) {
    try {
      let n = new t.ownerDocument.defaultView.CSSStyleSheet();
      n.replaceSync(e), t.adoptedStyleSheets = [n];
    } catch {
      let n = t.ownerDocument.createElement("style");
      n.textContent = e, t.appendChild(n);
    }
  }
  function ul(t, e, n, o, r, i) {
    let s = t.ownerDocument || document, a = t.getBoundingClientRect(), l = r > 0 && a.width > 0 ? a.width / r : 1, u = i > 0 && a.height > 0 ? a.height / i : 1;
    if (Math.abs(l - u) > 0.02) return 0;
    let c = s.createElement("div");
    tt(c), c.style.cssText = "position:absolute!important;left:-9999px!important;top:0!important;width:" + r + "px!important;overflow:visible!important;visibility:hidden!important;";
    let f = c.attachShadow({ mode: "open" });
    Ln(f, n);
    let d = si(e);
    f.appendChild(d), s.body.appendChild(c);
    let h = 0, m = ["paddingLeft", "paddingRight", "borderLeftWidth", "borderRightWidth"], g = ["paddingTop", "paddingBottom", "borderTopWidth", "borderBottomWidth"], p = (y, b, w) => {
      let S = O(y), v = S.boxSizing === "border-box", C = (M, $2, F) => {
        let A = parseFloat(M);
        if (!Number.isFinite(A)) return $2;
        let x = 0;
        if (!v) for (let P of F) x += parseFloat(S[P]) || 0;
        let _ = A + x;
        return Math.abs(_ - $2) <= 0.51 ? _ : $2;
      };
      return { width: C(S.width, b, m), height: C(S.height, w, g) };
    };
    try {
      let y = d.getBoundingClientRect(), b = d.offsetWidth || r, w = d.offsetHeight || i, S = b > 0 && y.width > 0 ? y.width / b : 1, v = w > 0 && y.height > 0 ? y.height / w : 1, C = (M, $2, F = false) => {
        let A = M.children, x = $2.children, _ = Math.min(A.length, x.length);
        for (let P = 0; P < _; P++) {
          let E = A[P], R = x[P], L = o.get(E), k = F || oi.has(E);
          if (L?.nodeType === 1 && Pt(E) && E.style && L.isConnected) {
            let I = L.getBoundingClientRect();
            if (I.width > 0 && I.height > 0) {
              let W = R.getBoundingClientRect(), T = I.width / l, N = I.height / u, U = W.width, z = W.height, V = L.offsetWidth || T, B = L.offsetHeight || N, rt = R.offsetWidth || U, at = R.offsetHeight || z, pt = Math.abs(T - V) > en || Math.abs(N - B) > en || Math.abs(U - rt) > en || Math.abs(z - at) > en;
              if (k) {
                let yt = p(R, rt, at);
                T = U > 0 ? T * S * yt.width / U : T, N = z > 0 ? N * v * yt.height / z : N, U = yt.width, z = yt.height;
              } else if (pt) {
                let yt = p(L, V, B), It = p(R, rt, at);
                T = yt.width, N = yt.height, U = It.width, z = It.height;
              }
              let St = U - T, ee = z - N;
              (Math.abs(St) > en || Math.abs(ee) > en) && (E.style.boxSizing = "border-box", E.style.width = `${H(T)}px`, E.style.height = `${H(N)}px`, h++);
            }
          }
          C(E, R, k);
        }
      };
      C(e, d);
    } finally {
      c.remove();
    }
    return h;
  }
  function ni(t, e = /* @__PURE__ */ new Set()) {
    let n = "";
    if (!t) return n;
    for (let o = 0; o < t.length; o++) {
      let r = t[o];
      try {
        if (r.type === CSSRule.IMPORT_RULE && r.styleSheet) {
          n += ni(r.styleSheet.cssRules, e);
          continue;
        }
        if (r.type === CSSRule.MEDIA_RULE && r.cssRules) {
          let i = ni(r.cssRules, e);
          i && (n += `@media ${r.conditionText}{${i}}`);
          continue;
        }
        if (r.type === CSSRule.STYLE_RULE) {
          let i = r.selectorText || "";
          if (lp.test(i)) {
            let s = r.cssText;
            s && !e.has(s) && (e.add(s), n += s);
          }
        }
      } catch {
      }
    }
    return n;
  }
  function cp(t) {
    let e = "";
    for (let n of t.styleSheets) {
      let o = -1;
      try {
        o = n.cssRules ? n.cssRules.length : -1;
      } catch {
      }
      e += (n.href || "inline") + ":" + o + "|";
    }
    return e;
  }
  function fp(t) {
    if (!t || !t.styleSheets) return "";
    let e = cp(t), n = ol.get(t);
    if (n && n.fp === e) return n.css;
    let o = /* @__PURE__ */ new Set(), r = "";
    for (let i of Array.from(t.styleSheets)) try {
      let s = i.cssRules;
      s && (r += ni(s, o));
    } catch {
    }
    return ol.set(t, { fp: e, css: r }), r;
  }
  function _o(t, e, n) {
    let o = br(t.clone).sort(), r = o.join(","), i = j.baseStyle.get(r), s;
    i && i.universe === n ? s = i.css : (s = wr(o, n), j.baseStyle.set(r, { universe: n, css: s }));
    let a = fp(t.element?.ownerDocument || document);
    return t.fontsCSS = e, t.baseCSS = s, t.scrollbarCSS = a, { baseCSS: s, scrollbarCSS: a, fontsCSS: e };
  }
  function dl(t, e, n) {
    let o = null;
    for (let [r, i] of up) {
      let s = n.getPropertyValue(r);
      if (!s.includes("%")) continue;
      if (n.writingMode !== "horizontal-tb") return;
      o || (o = dp(t, n));
      let a = i === "x" ? o.w : o.h, l = s.replace(/(-?\d*\.?\d+(?:e[+-]?\d+)?)%/gi, (c, f) => `${a * f / 100}px`), u = parseFloat(i === "x" ? n.width : n.height);
      e.style.setProperty(r, Number.isFinite(u) ? `${r.slice(0, 3)}(${l}, ${u}px)` : l);
    }
  }
  function dp(t, e) {
    let n = t.ownerDocument, o = n.documentElement, r = { w: o.clientWidth, h: o.clientHeight };
    if (e.position === "fixed") return r;
    if (e.position === "absolute") {
      let l = t.offsetParent;
      return !l || (l === n.body || l === o) && getComputedStyle(l).position === "static" ? r : { w: l.clientWidth, h: l.clientHeight };
    }
    let i = t.parentElement;
    if (!i) return r;
    let s = getComputedStyle(i), a = (l) => parseFloat(s.getPropertyValue(l)) || 0;
    return { w: i.clientWidth - a("padding-left") - a("padding-right"), h: i.clientHeight - a("padding-top") - a("padding-bottom") };
  }
  function Il() {
    try {
      let t = document.createElement("canvas").getContext("2d");
      if (t && typeof t.drawElementImage == "function") return "drawElementImage";
    } catch {
    }
    return null;
  }
  function ph(t, e, n, o) {
    let r = document.createElement("canvas");
    r.setAttribute("layoutsubtree", ""), r.setAttribute("content", "drawable"), tt(r), r.style.cssText = "position:fixed;top:0;left:0;z-index:-2147483647;pointer-events:none";
    let i = document.createElement("div");
    i.setAttribute("drawable", ""), i.style.cssText = `all:initial;box-sizing:border-box;display:block;overflow:visible;width:${n}px;height:${o}px`;
    let s = i.attachShadow({ mode: "open" });
    return Ln(s, e), s.appendChild(t), r.appendChild(i), { canvas: r, wrapper: i };
  }
  async function hh(t, e) {
    let n = Il();
    if (!n) return null;
    let o = t.element, r = t.clone;
    if (!o || !r) return null;
    let i = o.ownerDocument || document;
    if (!o.isConnected || i !== document || o === i.body || o === i.documentElement || o.scrollTop || o.scrollLeft || e.outerShadows || e.clip || e.excludeMode === "remove" || typeof e.filter == "function" && e.filterMode === "remove" || e.width != null || e.height != null) return null;
    try {
      for (let v = o; v; v = v.assignedSlot || v.parentElement || v.getRootNode?.().host) {
        let C = getComputedStyle(v);
        if (C.transform && C.transform !== "none" || C.rotate && C.rotate !== "none" || C.scale && C.scale !== "none" || C.translate && C.translate !== "none" || v === o && C.filter && C.filter !== "none") return null;
        let M = C.getPropertyValue("zoom");
        if (M && Number.isFinite(parseFloat(M)) && Math.abs(parseFloat(M) - 1) > 1e-4) return null;
      }
    } catch {
      return null;
    }
    let s = o.getBoundingClientRect(), a = Math.max(1, s.width || o.offsetWidth || 1), l = Math.max(1, s.height || o.offsetHeight || 1), u = o.offsetWidth || Math.ceil(a), c = o.offsetHeight || Math.ceil(l), f = Number.isFinite(e.scale) && e.scale > 0 ? e.scale : 1, d = Number.isFinite(e.dpr) && e.dpr > 0 ? e.dpr : window.devicePixelRatio || 1, h = Math.max(1, Math.round(u * f * d)), m = Math.max(1, Math.round(c * f * d)), g = (t.scrollbarCSS || "") + (t.baseCSS || "") + (t.fontsCSS || "") + (t.classCSS || ""), { canvas: p, wrapper: y } = ph(r, g, a, l);
    p.width = h, p.height = m, document.body.appendChild(p);
    let b;
    try {
      p.getBoundingClientRect(), await new Promise((F) => {
        requestAnimationFrame(() => setTimeout(F, 0)), setTimeout(F, 50);
      });
      let v = p.getContext("2d"), C = v && v[n];
      if (typeof C != "function") return null;
      v.save(), v.scale(d * f, d * f), C.call(v, y, 0, 0, a, l), v.restore();
      let M;
      try {
        M = v.getImageData(0, 0, Math.min(64, h), Math.min(64, m)).data;
      } catch {
        return D(e, `html-in-canvas: ${n} tainted the canvas; used the SVG engine.`), null;
      }
      let $2 = false;
      for (let F = 3; F < M.length; F += 4) if (M[F] > 0) {
        $2 = true;
        break;
      }
      if (!$2) {
        let F = v.getImageData(0, 0, h, m).data, A = false;
        for (let x = 3; x < F.length; x += 4) if (F[x] > 0) {
          A = true;
          break;
        }
        if (!A) return null;
      }
      b = document.createElement("canvas"), b.width = h, b.height = m, b.getContext("2d").drawImage(p, 0, 0), b.style.width = `${u * f}px`, b.style.height = `${c * f}px`;
    } catch (v) {
      return D(e, "html-in-canvas: the browser couldn't paint it; used the SVG engine.", v), null;
    } finally {
      try {
        p.remove();
      } catch {
      }
    }
    let w = Object.freeze({ w0: a, h0: l, vbW: u, vbH: c, targetW: a, targetH: l, contentX: 0, contentY: 0, clip: null });
    Object.defineProperty(e, "meta", { value: w, enumerable: true, writable: false, configurable: true }), e.__artifacts = { classCSS: t.classCSS || "", fontsCSS: t.fontsCSS || "", baseCSS: t.baseCSS || "", scrollbarCSS: t.scrollbarCSS || "" }, t.clone = t.nodeMap = t.styleCache = t.svgString = null;
    let S = [...document.querySelectorAll("#snapdom-sandbox")].find(Xt);
    return S && S.style.position === "absolute" && S.remove(), b;
  }
  function Dh(t, e) {
    let n = e.__session;
    try {
      let o = t.match(/<svg\b[^>]*>/i);
      if (!o) return t;
      let r = o[0], i = parseFloat((r.match(/\bwidth="([\d.]+)/i) || [])[1]), s = parseFloat((r.match(/\bheight="([\d.]+)/i) || [])[1]);
      if (!Number.isFinite(i) || !Number.isFinite(s) || i <= 0 || s <= 0) return t;
      let a = Math.min(1, jt / i, jt / s, Math.sqrt(he / (i * s)));
      if (a >= 1) return t;
      let l = Math.max(1, Math.floor(i * a)), u = Math.max(1, Math.floor(s * a));
      return nt(n, "raster-clamp", `capture ${Math.round(i)}x${Math.round(s)}px exceeds decode limits; downscaled to ${l}x${u}px`), D(e, `${Math.round(i)}\xD7${Math.round(s)}px is too large for the browser to draw; scaled down to ${l}\xD7${u}px. For full size, export ${typeof CompressionStream == "function" ? "a PNG or JPEG" : "a JPEG"} blob, an SVG, or crop.`), t.replace(r, r.replace(/(\bwidth=")[\d.]+/i, `$1${l}`).replace(/(\bheight=")[\d.]+/i, `$1${u}`));
    } catch {
      return t;
    }
  }
  function Jo(t, e, { shiftContent: n = Y() } = {}) {
    let o = ["x", "y", "width", "height"].map((F) => Number(e?.[F]));
    if (!o.every(Number.isFinite) || o[2] <= 0 || o[3] <= 0) throw new RangeError("[SnapDOM] crop needs finite x/y and a positive width/height.");
    let r = t.match(/<svg\b[^>]*>/i);
    if (!r) throw new Error("[SnapDOM] Only SVG captures can be cropped.");
    let i = r[0], s = (i.match(/\bviewBox="([^"]+)"/i) || [])[1], a = String(s || "").trim().split(/[\s,]+/).map(Number);
    if (a.length !== 4 || !a.every(Number.isFinite) || a[2] <= 0 || a[3] <= 0) throw new Error("[SnapDOM] Can't crop: the SVG has no valid viewBox.");
    let [l, u, c, f] = a, d = Math.max(l, o[0]), h = Math.max(u, o[1]), m = Math.min(l + c, o[0] + o[2]), g = Math.min(u + f, o[1] + o[3]);
    if (!(m > d) || !(g > h)) throw new RangeError("[SnapDOM] The crop area does not intersect the capture.");
    let p = parseFloat((i.match(/\bwidth="([\d.]+)/i) || [])[1]), y = parseFloat((i.match(/\bheight="([\d.]+)/i) || [])[1]), b = Number.isFinite(p) && p > 0 ? p / c : 1, w = Number.isFinite(y) && y > 0 ? y / f : 1, S = Math.max(1, (m - d) * b), v = Math.max(1, (g - h) * w), C = i.replace(/(\bwidth=")[^"]*/i, `$1${S}`).replace(/(\bheight=")[^"]*/i, `$1${v}`), M = n ? Bh(t, i, d, h) : null;
    if (M) return C.replace(/(\bviewBox=")[^"]*/i, (A, x) => `${x}0 0 ${m - d} ${g - h}`) + M.slice(i.length);
    let $2 = C.replace(/(\bviewBox=")[^"]*/i, `$1${d} ${h} ${m - d} ${g - h}`);
    return t.replace(i, $2);
  }
  function Bh(t, e, n, o) {
    if (!t.startsWith(e)) return null;
    let r = /^\s*<foreignObject\b[^>]*>/i.exec(t.slice(e.length, e.length + 2048));
    if (!r) return null;
    let i = r[0], s = (u, c, f) => {
      let d = new RegExp(`(\\s${c}=")([^"]*)`), h = u.match(d), m = h ? parseFloat(h[2]) : 0;
      return Number.isFinite(m) ? h ? u.replace(d, (g, p) => `${p}${m - f}`) : u.replace(/^(\s*<foreignObject\b)/i, (g, p) => `${p} ${c}="${-f}"`) : null;
    }, a = s(i, "x", n), l = a && s(a, "y", o);
    return l ? e + l + t.slice(e.length + i.length) : null;
  }
  function Ni(t, e, n) {
    let o = t.match(/<svg\b[^>]*>/i);
    if (!o) return null;
    let r = o[0], i = String((r.match(/\bviewBox="([^"]+)"/i) || [])[1] || "").trim().split(/[\s,]+/).map(Number);
    if (i.length !== 4 || !i.every(Number.isFinite) || i[2] <= 0 || i[3] <= 0) return null;
    let s = Math.min(e / i[2], n / i[3]), a = /^\s*<foreignObject\b[^>]*>/i.exec(t.slice(r.length, r.length + 2048));
    if (!a) return null;
    let l = a[0], u = { x: (e - s * i[2]) / 2, y: (n - s * i[3]) / 2 };
    for (let p of ["x", "y", "width", "height"]) {
      let y = new RegExp(`(\\s${p}=")([^"]*)`), b = l.match(y), w = b ? parseFloat(b[2]) : 0;
      if (!Number.isFinite(w)) return null;
      let S = w * s + (u[p] || 0);
      l = b ? l.replace(y, (v, C) => `${C}${S}`) : l.replace(/^(\s*<foreignObject\b)/i, (v, C) => `${C} ${p}="${S}"`);
    }
    let c = t.slice(r.length + a[0].length), f = c.indexOf("</style>"), d = /<div\b[^>]*?( style=")([^"]*)"/i.exec(c.slice(f < 0 ? 0 : f));
    if (!d) return null;
    let h = (f < 0 ? 0 : f) + d.index, m = c.slice(0, h) + d[0].slice(0, -1) + `;zoom:${s} !important"` + c.slice(h + d[0].length);
    return r.replace(/(\bwidth=")[^"]*/i, `$1${e}`).replace(/(\bheight=")[^"]*/i, `$1${n}`).replace(/(\bviewBox=")[^"]*/i, `$10 0 ${e} ${n}`) + l + m;
  }
  function Ri(t) {
    return typeof t == "string" && /^data:image\/svg\+xml/i.test(t);
  }
  function Ee(t) {
    let e = t.indexOf(",");
    return e >= 0 ? decodeURIComponent(t.slice(e + 1)) : "";
  }
  function Qo(t) {
    let e = t.indexOf(",");
    if (e < 0) return "";
    let n = t.slice(e + 1, e + 1201).replace(/%[0-9A-Fa-f]?$/, "");
    try {
      return decodeURIComponent(n);
    } catch {
      return "";
    }
  }
  function Re(t) {
    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(t)}`;
  }
  function pc(t) {
    let e = [], n = "", o = 0;
    for (let r = 0; r < t.length; r++) {
      let i = t[r];
      i === "(" && o++, i === ")" && (o = Math.max(0, o - 1)), i === ";" && o === 0 ? (e.push(n), n = "") : n += i;
    }
    return n.trim() && e.push(n), e.map((r) => r.trim()).filter(Boolean);
  }
  function zh(t) {
    let e = [], n = "", o = 0;
    for (let i = 0; i < t.length; i++) {
      let s = t[i];
      s === "(" && o++, s === ")" && (o = Math.max(0, o - 1)), s === "," && o === 0 ? (e.push(n.trim()), n = "") : n += s;
    }
    n.trim() && e.push(n.trim());
    let r = [];
    for (let i of e) {
      if (/\binset\b/i.test(i)) continue;
      let s = i.match(/-?\d+(?:\.\d+)?px/gi) || [], [a = "0px", l = "0px", u = "0px"] = s;
      u = `${parseFloat(u) / 2}px`;
      let c = i.replace(/-?\d+(?:\.\d+)?px/gi, "").replace(/\binset\b/ig, "").trim().replace(/\s{2,}/g, " "), f = !!c && c !== ",";
      r.push(`drop-shadow(${a} ${l} ${u}${f ? ` ${c}` : ""})`);
    }
    return r.join(" ");
  }
  function hc(t) {
    let e = pc(t), n = null, o = null, r = null, i = [];
    for (let a of e) {
      let l = a.indexOf(":");
      if (l < 0) continue;
      let u = a.slice(0, l).trim().toLowerCase(), c = a.slice(l + 1).trim();
      u === "box-shadow" ? r = c : u === "filter" ? n = c : u === "-webkit-filter" ? o = c : i.push([u, c]);
    }
    if (r) {
      let a = zh(r);
      a && (n = n ? `${n} ${a}` : a, o = o ? `${o} ${a}` : a);
    }
    let s = [...i];
    return n && s.push(["filter", n]), o && s.push(["-webkit-filter", o]), s.map(([a, l]) => `${a}:${l}`).join(";");
  }
  function Uh(t) {
    return t.replace(/([^{}]+)\{([^}]*)\}/g, (e, n, o) => `${n}{${hc(o)}}`);
  }
  function Hh(t) {
    return t = t.replace(/<style[^>]*>([\s\S]*?)<\/style>/gi, (e, n) => e.replace(n, Uh(n))), t = t.replace(/style=(['"])([\s\S]*?)\1/gi, (e, n, o) => `style=${n}${hc(o)}${n}`), t;
  }
  function jh() {
    return qo || (qo = (async () => {
      try {
        let t = '<svg xmlns="http://www.w3.org/2000/svg" width="8" height="20"><foreignObject width="8" height="20"><div xmlns="http://www.w3.org/1999/xhtml" style="width:4px;height:4px;margin-top:8px;background:#000;box-shadow:0 8px 0 0 #000"></div></foreignObject></svg>', e = new Image();
        e.decoding = "sync", e.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(t)}`, await e.decode();
        let n = document.createElement("canvas");
        n.width = 8, n.height = 20;
        let o = n.getContext("2d", { willReadFrequently: true });
        o.drawImage(e, 0, 0);
        let r = o.getImageData(2, 18, 1, 1).data[3] > 128, i = o.getImageData(2, 2, 1, 1).data[3] > 128;
        return { native: r || i, flippedY: i && !r };
      } catch {
        return { native: false, flippedY: false };
      }
    })(), qo);
  }
  function Vh(t) {
    let e = [], n = 0, o = 0;
    for (let r = 0; r < t.length; r++) {
      let i = t[r];
      i === "(" ? n++ : i === ")" ? n = Math.max(0, n - 1) : i === "," && n === 0 && (e.push(t.slice(o, r)), o = r + 1);
    }
    return e.push(t.slice(o)), e.map((r) => {
      let i = 0, s = 0, a = "", l = 0;
      for (; l < r.length; ) {
        let u = r[l];
        if (u === "(" ? i++ : u === ")" && (i = Math.max(0, i - 1)), i === 0 && (l === 0 || r[l - 1] === " ")) {
          let c = /^-?\d*\.?\d+px/.exec(r.slice(l));
          if (c) {
            s++, a += s === 2 ? `${-parseFloat(c[0])}px` : c[0], l += c[0].length;
            continue;
          }
        }
        a += u, l++;
      }
      return a;
    }).join(",");
  }
  function Gh(t, e) {
    let n = (o) => pc(o).map((r) => {
      let i = r.indexOf(":");
      if (i < 0) return r;
      let s = r.slice(0, i).trim().toLowerCase();
      return s === "text-shadow" || e && s === "box-shadow" ? `${s}:${Vh(r.slice(i + 1))}` : r;
    }).join(";");
    return t = t.replace(/<style[^>]*>([\s\S]*?)<\/style>/gi, (o, r) => o.replace(r, r.replace(/([^{}]+)\{([^}]*)\}/g, (i, s, a) => `${s}{${n(a)}}`))), t = t.replace(/style=(['"])([\s\S]*?)\1/gi, (o, r, i) => `style=${r}${n(i)}${r}`), t;
  }
  async function Zo(t) {
    if (!/(?:box-shadow|text-shadow)\s*:[^;"}]*px/i.test(t)) return { svg: t, naturalOnly: false };
    let { native: n, flippedY: o } = await jh();
    try {
      let r = t;
      return n || (r = Hh(r)), o && (r = Gh(r, n)), { svg: r, naturalOnly: true };
    } catch {
      return { svg: t, naturalOnly: true };
    }
  }
  function qh(t, e, n) {
    let o = t.naturalWidth, r = t.naturalHeight, i = Math.min(8, r), s = document.createElement("canvas");
    s.width = Math.max(1, Math.ceil(o * e)), s.height = Math.max(1, Math.ceil(i * 6 * n));
    let a = s.getContext("2d", { willReadFrequently: true });
    return !a || !(o > 0 && r > 0) ? null : () => {
      a.clearRect(0, 0, s.width, s.height);
      for (let f = 0; f < 6; f++) {
        let d = Math.floor((r - i) * f / 5);
        a.drawImage(t, 0, d, o, i, 0, f * i * n, o * e, i * n);
      }
      let l = a.getImageData(0, 0, s.width, s.height).data, u = false, c = 0;
      for (let f = 3; f < l.length; f += 4) l[f] > 0 && (u = true), c = c * 31 + l[f - 3] + l[f - 2] * 7 + l[f - 1] * 13 + l[f] | 0;
      return { ink: u, sig: c };
    };
  }
  async function Xh(t, e, n) {
    tt(t), t.style.cssText = "position:fixed;left:-99999px;top:-99999px;pointer-events:none", document.body.appendChild(t);
    try {
      if (!n) return await Xo(), await Xo(), false;
      let o = performance.now() + (e ? 600 : 150), r = null;
      for (; ; ) {
        let i;
        try {
          i = n();
        } catch {
          return false;
        }
        if (i.ink && (!e || i.sig === r)) return true;
        if (r = i.sig, performance.now() > o) return i.ink;
        await Xo();
      }
    } finally {
      try {
        t.remove();
      } catch {
      }
    }
  }
  function Ko() {
    clearTimeout(Li), pe?.remove(), pe = null, Yo = 0;
  }
  function Kh(t) {
    gc = t ?? mc;
  }
  function uc(t) {
    if (typeof document > "u" || !document.body) return new Image();
    if (clearTimeout(Li), pe && !pe.contentDocument && Ko(), pe && Yo > Yh && Dn === 0 && Ko(), !pe) {
      let n = document.createElement("iframe");
      tt(n), n.setAttribute("aria-hidden", "true"), n.style.cssText = "position:absolute;left:-9999px;top:0;width:0;height:0;border:0;visibility:hidden;pointer-events:none";
      try {
        document.body.appendChild(n);
      } catch {
      }
      if (n.contentDocument) pe = n, Yo = 0;
      else {
        try {
          n.remove();
        } catch {
        }
        return new Image();
      }
    }
    Yo += t.length, Dn += 1;
    let e = pe.contentDocument.createElement("img");
    return e.__snapdomDecodeFrame = true, e;
  }
  function $i(t, e = false) {
    !t || !t.__snapdomDecodeFrame || (t.__snapdomDecodeFrame = false, Dn = Math.max(0, Dn - 1), e && (Fi = true), !(Dn > 0) && (Fi ? (Fi = false, Ko()) : Li = setTimeout(Ko, gc)));
  }
  function dc(t, e) {
    return t.loading = "eager", t.decoding = "sync", t.crossOrigin = "anonymous", t.src = e, t.decode();
  }
  function em(t) {
    if (typeof t != "string") return false;
    let e = t.indexOf(",") + 1, n = Math.max(48, Math.floor((t.length - e) / 200)), o = 0, r = 0;
    for (let i = e; i + 48 <= t.length; i += n) {
      let s = t.slice(i, i + 48);
      o++, tm.some((a) => s.includes(a)) || r++;
    }
    return r * 2 > o;
  }
  function Ti(t, e, n, o, r) {
    if (!e.naturalWidth) {
      t.drawImage(e, 0, 0, n, o);
      return;
    }
    let i = n * o, s = i > Jh && !em(r) ? Math.min(Zh, Math.ceil(i / Qh)) : 1;
    if (s === 1) {
      t.drawImage(e, 0, 0, n, o);
      return;
    }
    let a = e.naturalWidth, l = e.naturalHeight / o;
    for (let u = 0; u < s; u++) {
      let c = Math.round(u * o / s), f = u === s - 1 ? o : Math.round((u + 1) * o / s);
      t.drawImage(e, 0, c * l, a, (f - c) * l, 0, c, n, f - c);
    }
  }
  async function te(t, e) {
    let { width: n, height: o, scale: r = 1, dpr: i = 1, meta: s = {}, backgroundColor: a, crop: l = null } = e, u = typeof HTMLCanvasElement < "u" && t instanceof HTMLCanvasElement ? t : null, c = t, f = false, d = false;
    if (l && !Ri(t)) throw new RangeError("[SnapDOM] Only SVG captures can be cropped.");
    if (Ri(t)) {
      let m = (Qo(t).match(/<svg\b[^>]*>/i) || [])[0] || "", g = parseFloat((m.match(/\bwidth="([\d.]+)/i) || [])[1]), p = parseFloat((m.match(/\bheight="([\d.]+)/i) || [])[1]), y = Number.isFinite(g) && Number.isFinite(p) && g > 0 && p > 0 && Math.min(1, jt / g, jt / p, Math.sqrt(he / (g * p))) < 1;
      if (l || y || Y()) try {
        let b = Ee(t);
        if (l && (b = Jo(b, l)), Y()) {
          let w = await Zo(b);
          b = w.svg, f = w.naturalOnly, d = /@font-face|data:image\//i.test(b);
        }
        (y || l) && (b = Dh(b, e)), c = Re(b);
      } catch (b) {
        if (l) throw b;
        c = t;
      }
    }
    let h = u || uc(c);
    try {
      u || await dc(h, c);
    } catch (m) {
      if (!h.__snapdomDecodeFrame) throw m;
      let g = h;
      h = uc(c), $i(g);
      try {
        await dc(h, c);
      } catch (p) {
        throw $i(h, e.__releaseDecodeFrame), p;
      }
    }
    try {
      !u && !Y() && Ri(c) && (_t() ? /.data(?:%3A|:)image(?:%2F|\/)svg/i : /(?:%40|@)font-face/i).test(c) && await new Promise((N) => {
        let U = new MessageChannel();
        U.port1.onmessage = () => {
          U.port1.close(), U.port2.close(), N();
        }, U.port2.postMessage(0);
      });
      let m = u ? u.width : h.naturalWidth, g = u ? u.height : h.naturalHeight, p = l ? m : Number.isFinite(s.vbW) ? s.vbW : Number.isFinite(s.w0) ? s.w0 : m, y = l ? g : Number.isFinite(s.vbH) ? s.vbH : Number.isFinite(s.h0) ? s.h0 : g, b, w, S = Number.isFinite(n), v = Number.isFinite(o);
      if (S && v) b = Math.max(1, n), w = Math.max(1, o);
      else if (S) {
        let N = n / Math.max(1, p);
        b = n, w = y * N;
      } else if (v) {
        let N = o / Math.max(1, y);
        w = o, b = p * N;
      } else {
        let N = u && Number.isFinite(s.vbW) && Number.isFinite(s.vbH);
        b = N ? s.vbW : m, w = N ? s.vbH : g;
      }
      !S && !v && (b = b * r, w = w * r);
      let C = b * i, M = w * i, $2 = Math.max(C / jt, M / jt, Math.sqrt(C * M / he)), F = e.__encodeFormat === "webp" ? Math.max(C, M) / Pi : 0, A = Math.max($2, F);
      if (A > 1) {
        let N = $2 <= 1;
        nt(e.__session, "canvas-clamp", `output ${Math.round(C)}x${Math.round(M)}px exceeds ${N ? "WebP" : "canvas"} limits; downscaled`), D(e, N ? `${Math.round(C)}\xD7${Math.round(M)}px is larger than WebP can encode (${Pi}px per side); scaled down. For full size, export a PNG, an SVG, or crop.` : `${Math.round(C)}\xD7${Math.round(M)}px is larger than a canvas allows; scaled down. For full size, export ${typeof CompressionStream == "function" ? "a PNG or JPEG" : "a JPEG"} blob, an SVG, or crop.`), b /= A, w /= A;
      }
      let x = Pt(e.canvas) && ft(e.canvas, "canvas") ? e.canvas : document.createElement("canvas");
      x.width = Math.max(1, b * i), x.height = Math.max(1, w * i), x.style.width = `${b}px`, x.style.height = `${w}px`;
      let _ = x.getContext("2d");
      if (!_) throw new Error("[SnapDOM] The canvas you passed has no 2D context (is it already used for WebGL?).");
      let P = null, E = e.__layoutZoom || 1;
      if (!u && _t()) {
        let N = E * p / (b * i), U = Math.round(b * i * N), z = Math.round(w * i * N);
        N > 1.01 && U <= jt && z <= jt && U * z <= he && (P = { w: U, h: z });
      }
      let R = f && (Math.round(b * i) !== m || Math.round(w * i) !== g), L = R ? m : P ? P.w : b * i, k = R ? g : P ? P.h : w * i, I = Y() && !u ? qh(h, L / Math.max(1, m), k / Math.max(1, g)) : null, W = false;
      I && (W = await Xh(h, d, I));
      let T = () => {
        if (_.save(), i !== 1 && _.scale(i, i), a && (_.save(), _.fillStyle = a, _.fillRect(0, 0, b, w), _.restore()), R) {
          let N = document.createElement("canvas");
          N.width = m, N.height = g, Ti(N.getContext("2d"), h, m, g, c), _.drawImage(N, 0, 0, b, w);
        } else {
          if (_.save(), _.setTransform(1, 0, 0, 1, 0, 0), P) {
            let N = document.createElement("canvas");
            for (N.width = P.w, N.height = P.h, Ti(N.getContext("2d"), h, P.w, P.h, c); N.width > b * i * 2; ) {
              let U = document.createElement("canvas");
              U.width = Math.ceil(N.width / 2), U.height = Math.ceil(N.height / 2), U.getContext("2d").drawImage(N, 0, 0, U.width, U.height), N = U;
            }
            _.imageSmoothingQuality = "high", _.drawImage(N, 0, 0, b * i, w * i);
          } else Ti(_, h, b * i, w * i, c);
          _.restore();
        }
        _.restore();
      };
      if (T(), I && W && d) {
        let N = true;
        try {
          N = I().ink;
        } catch {
        }
        if (!N) {
          let U = performance.now() + 600;
          do {
            await Xo();
            try {
              N = I().ink;
            } catch {
              break;
            }
          } while (!N && performance.now() < U);
          x.width = x.width, T();
        }
      }
      return x;
    } finally {
      $i(h, e.__releaseDecodeFrame);
    }
  }
  async function Ii(t, e) {
    let n = await te(t, { ...e, __encodeFormat: e.format }), i = n.width * n.height <= 2e6 ? n.toDataURL(`image/${e.format}`, e.quality) : await new Promise((a) => {
      let l = () => a(n.toDataURL(`image/${e.format}`, e.quality));
      try {
        n.toBlob((u) => {
          if (!u) return l();
          let c = new FileReader();
          c.onload = () => a(String(c.result || "")), c.onerror = l, c.readAsDataURL(u);
        }, `image/${e.format}`, e.quality);
      } catch {
        l();
      }
    }), s = new Image();
    return s.src = i, Y() ? await s.decode() : await new Promise((a, l) => {
      if (s.complete && s.naturalWidth) return a();
      s.onload = a, s.onerror = l;
    }), s.style.width = `${n.width / e.dpr}px`, s.style.height = `${n.height / e.dpr}px`, s;
  }
  async function nm(t, e) {
    let { scale: n = 1, width: o, height: r, meta: i = {} } = e, s = Number.isFinite(o), a = Number.isFinite(r), l = Number.isFinite(n) && n !== 1 || s || a;
    if (Y() && l) try {
      let { svg: d } = await Zo(Ee(t)), h = (d.match(/<svg\b[^>]*>/i) || [])[0] || "", m = parseFloat((h.match(/\bwidth="([\d.]+)/i) || [])[1]), g = parseFloat((h.match(/\bheight="([\d.]+)/i) || [])[1]);
      if (!Number.isFinite(m) || !Number.isFinite(g)) throw new Error("The SVG has no size.");
      let p = Number.isFinite(i.vbW) ? i.vbW : Number.isFinite(i.w0) ? i.w0 : m, y = Number.isFinite(i.vbH) ? i.vbH : Number.isFinite(i.h0) ? i.h0 : g, b, w;
      s && a ? (b = o, w = r) : s ? (b = o, w = Math.max(1, Math.round(y * (o / Math.max(1, p))))) : a ? (w = r, b = Math.max(1, Math.round(p * (r / Math.max(1, y))))) : (b = Math.max(1, Math.round(m * n)), w = Math.max(1, Math.round(g * n)));
      let S = Ni(d, b, w) || d.replace(/width="[^"]*"/, `width="${b}"`).replace(/height="[^"]*"/, `height="${w}"`), v = new Image();
      return v.decoding = "sync", v.loading = "eager", v.src = Re(S), await v.decode(), v.style.width = `${b}px`, v.style.height = `${w}px`, v;
    } catch (d) {
      return nt(e.__session, "safari-png-fallback", "Safari vector toImg failed; using PNG", d), D(e, "Safari couldn't show the SVG; used a PNG.", d), Ii(t, { ...e, format: "png", quality: 1, meta: i });
    }
    let u = t, c = false;
    if (!s && !a && n !== 1 && typeof t == "string" && t.startsWith("data:image/svg+xml")) try {
      let d = Ee(t), h = (d.match(/<svg\b[^>]*>/i) || [])[0] || "", m = Number((h.match(/\bwidth="([\d.]+)"/i) || [])[1]), g = Number((h.match(/\bheight="([\d.]+)"/i) || [])[1]);
      if (m > 0 && g > 0) {
        let p = h.replace(/\bwidth="[^"]*"/i, `width="${Math.max(1, Math.round(m * n))}"`).replace(/\bheight="[^"]*"/i, `height="${Math.max(1, Math.round(g * n))}"`);
        u = Re(d.replace(h, p)), c = true;
      }
    } catch {
    }
    let f = new Image();
    f.decoding = "sync", f.loading = "eager", f.src = u;
    try {
      await f.decode();
    } catch (d) {
      if (!c) throw d;
      f.src = t, c = false, await f.decode();
    }
    if (s && a) f.style.width = `${o}px`, f.style.height = `${r}px`;
    else if (s) {
      let d = Number.isFinite(i.vbW) ? i.vbW : Number.isFinite(i.w0) ? i.w0 : f.naturalWidth, h = Number.isFinite(i.vbH) ? i.vbH : Number.isFinite(i.h0) ? i.h0 : f.naturalHeight, m = o / Math.max(1, d);
      f.style.width = `${o}px`, f.style.height = `${Math.max(1, Math.round(h * m))}px`;
    } else if (a) {
      let d = Number.isFinite(i.vbW) ? i.vbW : Number.isFinite(i.w0) ? i.w0 : f.naturalWidth, h = Number.isFinite(i.vbH) ? i.vbH : Number.isFinite(i.h0) ? i.h0 : f.naturalHeight, m = r / Math.max(1, h);
      f.style.height = `${r}px`, f.style.width = `${Math.max(1, Math.round(d * m))}px`;
    } else {
      let d = Math.max(1, Math.round(f.naturalWidth * (c ? 1 : n))), h = Math.max(1, Math.round(f.naturalHeight * (c ? 1 : n)));
      if (f.style.width = `${d}px`, f.style.height = `${h}px`, !c && n !== 1 && typeof t == "string" && t.startsWith("data:image/svg+xml")) try {
        let g = decodeURIComponent(t.split(",")[1]).replace(/width="[^"]*"/, `width="${d}"`).replace(/height="[^"]*"/, `height="${h}"`);
        f.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(g)}`, await f.decode();
      } catch (m) {
        D(e, "Couldn't size the SVG image.", m), f.src !== t && (f.src = t, await f.decode().catch(() => {
        }));
      }
    }
    return f;
  }
  function tr(t, e = new Uint8Array(0)) {
    let n = new Uint8Array(e.length + 12), o = new DataView(n.buffer);
    o.setUint32(0, e.length);
    for (let i = 0; i < 4; i++) n[i + 4] = t.charCodeAt(i);
    n.set(e, 8);
    let r = 4294967295;
    for (let i = 4; i < n.length - 4; i++) r = bc[(r ^ n[i]) & 255] ^ r >>> 8;
    return o.setUint32(n.length - 4, (r ^ 4294967295) >>> 0), n;
  }
  async function om(t, e, n) {
    if (![t, e].every((g) => Number.isInteger(g) && g > 0 && g <= 2147483647)) throw new RangeError("[SnapDOM] PNG dimensions must be integers from 1 to 2147483647");
    let o = new Uint8Array(13), r = new DataView(o.buffer);
    r.setUint32(0, t), r.setUint32(4, e), o[8] = 8, o[9] = 6;
    let i = [new Uint8Array([137, 80, 78, 71, 13, 10, 26, 10]), tr("IHDR", o), tr("sRGB", new Uint8Array([0]))], s = t * 4, a = Math.max(1, Math.floor(65536 / (s + 1))), l = new Uint8Array(s), u = 0, c = new CompressionStream("deflate"), f = c.writable.getWriter(), d = c.readable.getReader(), h, m = (async () => {
      try {
        for (; ; ) {
          let { done: g, value: p } = await d.read();
          if (g) return;
          i.push(tr("IDAT", p));
        }
      } catch (g) {
        h = g, await f.abort(g).catch(() => {
        });
      }
    })();
    try {
      for await (let g of n) {
        if (!(g instanceof Uint8Array || g instanceof Uint8ClampedArray) || !g.length || g.length % s) throw new RangeError("[SnapDOM] PNG input must contain complete RGBA rows");
        let p = g.length / s;
        if (u + p > e) throw new RangeError("[SnapDOM] PNG input exceeds the declared height");
        for (let y = 0; y < p; y += a) {
          let b = Math.min(p, y + a), w = new Uint8Array((b - y) * (s + 1));
          for (let S = y; S < b; S++) {
            let v = g.subarray(S * s, (S + 1) * s), C = (S - y) * (s + 1), M = 0, $2 = 0;
            for (let F = 0; F < s; F++) {
              let A = v[F] - (F < 4 ? 0 : v[F - 4]) & 255, x = v[F] - l[F] & 255;
              M += Math.min(A, 256 - A), $2 += Math.min(x, 256 - x), w[C + F + 1] = x;
            }
            if (w[C] = $2 <= M ? 2 : 1, M < $2) for (let F = 0; F < s; F++) w[C + F + 1] = v[F] - (F < 4 ? 0 : v[F - 4]);
            l = v;
          }
          await f.write(w);
        }
        l = l.slice(), u += p;
      }
      if (u !== e) throw new RangeError("[SnapDOM] PNG input does not match the declared height");
      if (await f.close(), await m, h) throw h;
      return i.push(tr("IEND")), new Blob(i, { type: "image/png" });
    } catch (g) {
      throw await Promise.allSettled([f.abort(g), d.cancel(g)]), await m, g;
    } finally {
      f.releaseLock(), d.releaseLock();
    }
  }
  function Cc(t) {
    let e = [0, 240];
    for (let n = 0; n < 16; n++) for (let o = 1; o <= 10; o++) e.push(n << 4 | o);
    return t.concat(e.filter((n) => !t.includes(n)).sort((n, o) => n - o));
  }
  function sm(t) {
    for (let e = 0; e < 64; e += 8) Ac(t, e, 1);
    for (let e = 0; e < 8; e++) Ac(t, e, 8);
  }
  function Ac(t, e, n) {
    let o = t[e] + t[e + 7 * n], r = t[e] - t[e + 7 * n], i = t[e + n] + t[e + 6 * n], s = t[e + n] - t[e + 6 * n], a = t[e + 2 * n] + t[e + 5 * n], l = t[e + 2 * n] - t[e + 5 * n], u = t[e + 3 * n] + t[e + 4 * n], c = t[e + 3 * n] - t[e + 4 * n], f = o + u, d = o - u, h = i + a, m = i - a;
    t[e] = f + h, t[e + 4 * n] = f - h;
    let g = (m + d) * 0.707106781;
    t[e + 2 * n] = d + g, t[e + 6 * n] = d - g, f = c + l, h = l + s, m = s + r;
    let p = (f - m) * 0.382683433, y = 0.5411961 * f + p, b = 1.306562965 * m + p, w = h * 0.707106781, S = r + w, v = r - w;
    t[e + 5 * n] = v + y, t[e + 3 * n] = v - y, t[e + n] = S + b, t[e + 7 * n] = S - b;
  }
  async function am(t, e, n, o) {
    if (![t, e].every((R) => Number.isInteger(R) && R > 0 && R <= 65535)) throw new RangeError("[SnapDOM] JPEG dimensions must be integers from 1 to 65535");
    let r = Math.min(100, Math.max(1, Math.round((typeof o == "number" && o >= 0 && o <= 1 ? o : 0.92) * 100))), i = r < 50 ? 5e3 / r : 200 - r * 2, s = r < 90 ? 1 : 0, a = 8 << s, l = [0], u = [rm, im].map((R, L) => {
      let k = new Uint8Array(64), I = new Float32Array(64);
      for (let W = 0; W < 64; W++) {
        let T = Math.min(255, Math.max(1, Math.floor((R[W] * i + 50) / 100)));
        k[Sc[W]] = T, I[W] = 1 / (T * vc[W >> 3] * vc[W & 7] * 8);
      }
      return l.push(...L ? [1] : [], ...k), I;
    }), c = (R, L) => [255, R, L.length + 2 >> 8, L.length + 2 & 255, ...L], f = [255, 216, ...c(224, [74, 70, 73, 70, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0]), ...c(219, l), ...c(192, [8, e >> 8, e & 255, t >> 8, t & 255, 3, 1, s ? 34 : 17, 0, 2, 17, 1, 3, 17, 1]), ...c(196, _c.flatMap(([R, , L, k]) => [R, ...L, ...k])), ...c(218, [3, 1, 0, 2, 17, 3, 17, 0, 63, 0])], d = [new Uint8Array(f)], h = new Uint8Array(65536), m = 0, g = 0, p = 0;
    function y(R, L) {
      for (g = g << L | R, p += L; p >= 8; ) {
        p -= 8;
        let k = g >>> p & 255;
        m >= h.length - 1 && (d.push(h.subarray(0, m)), h = new Uint8Array(65536), m = 0), h[m++] = k, k === 255 && (h[m++] = 0);
      }
      g &= (1 << p) - 1;
    }
    let b = new Float32Array(64), w = new Int32Array(64), S = [0, 0, 0];
    function v(R, L) {
      let k = u[L];
      sm(b);
      for (let z = 0; z < 64; z++) w[Sc[z]] = Math.round(b[z] * k[z]);
      let I = Mc[L * 2], W = Mc[L * 2 + 1], T = w[0] - S[R];
      S[R] = w[0];
      let N = T ? 32 - Math.clz32(Math.abs(T)) : 0;
      y(I[N][0], I[N][1]), N && y((T < 0 ? T - 1 : T) & (1 << N) - 1, N);
      let U = 0;
      for (let z = 1; z < 64; z++) {
        if (T = w[z], !T) {
          U++;
          continue;
        }
        for (; U > 15; U -= 16) y(W[240][0], W[240][1]);
        N = 32 - Math.clz32(Math.abs(T));
        let V = W[U << 4 | N];
        y(V[0], V[1]), y((T < 0 ? T - 1 : T) & (1 << N) - 1, N), U = 0;
      }
      U && y(W[0][0], W[0][1]);
    }
    let C = t * 4, M = new Uint8Array(C * a), $2 = new Float32Array(a * a), F = new Float32Array(64), A = new Float32Array(64), x = s ? 0.25 : 1;
    function _(R) {
      for (let L = 0; L < t; L += a) {
        F.fill(0), A.fill(0);
        for (let k = 0; k < a; k++) {
          let I = Math.min(k, R - 1) * C;
          for (let W = 0; W < a; W++) {
            let T = I + Math.min(L + W, t - 1) * 4, N = M[T], U = M[T + 1], z = M[T + 2];
            $2[k * a + W] = 0.299 * N + 0.587 * U + 0.114 * z - 128;
            let V = (k >> s) * 8 + (W >> s);
            F[V] += (-0.168736 * N - 0.331264 * U + 0.5 * z) * x, A[V] += (0.5 * N - 0.418688 * U - 0.081312 * z) * x;
          }
        }
        for (let k = 0; k < (s ? 4 : 1); k++) {
          let I = (k >> 1) * 128 + (k & 1) * 8;
          for (let W = 0; W < 64; W++) b[W] = $2[I + (W >> 3) * a + (W & 7)];
          v(0, 0);
        }
        b.set(F), v(1, 1), b.set(A), v(2, 1);
      }
    }
    let P = 0, E = 0;
    for await (let R of n) {
      if (!(R instanceof Uint8Array || R instanceof Uint8ClampedArray) || !R.length || R.length % C) throw new RangeError("[SnapDOM] JPEG input must contain complete RGBA rows");
      let L = R.length / C;
      if (P + L > e) throw new RangeError("[SnapDOM] JPEG input exceeds the declared height");
      for (let k = 0; k < L; ) {
        let I = Math.min(a - E, L - k);
        M.set(R.subarray(k * C, (k + I) * C), E * C), E += I, k += I, E === a && (_(a), E = 0);
      }
      P += L;
    }
    if (P !== e) throw new RangeError("[SnapDOM] JPEG input does not match the declared height");
    return E && _(E), p && y((1 << 8 - p) - 1, 8 - p), d.push(h.subarray(0, m), new Uint8Array([255, 217])), new Blob(d, { type: "image/jpeg" });
  }
  function er(t, e, n) {
    if (typeof t != "string" || !t.startsWith("data:image/svg+xml")) return null;
    let o = Qo(t).match(/<svg\b[^>]*>/i)?.[0];
    if (!o) return null;
    let r = e.crop ? Jo(o, e.crop) : o, i = parseFloat(r.match(/\bwidth="([^"]+)/i)?.[1]), s = parseFloat(r.match(/\bheight="([^"]+)/i)?.[1]), a = (r.match(/\bviewBox="([^"]+)/i)?.[1] || "").trim().split(/[\s,]+/).map(Number);
    if (!(i > 0 && s > 0) || a.length !== 4 || !a.every(Number.isFinite) || !(a[2] > 0 && a[3] > 0)) return null;
    let l = Number.isFinite(e.width), u = Number.isFinite(e.height), c = e.meta || {}, f = Math.max(1, Math.floor(i)), d = Math.max(1, Math.floor(s)), h = e.crop ? f : Number.isFinite(c.vbW) ? c.vbW : Number.isFinite(c.w0) ? c.w0 : f, m = e.crop ? d : Number.isFinite(c.vbH) ? c.vbH : Number.isFinite(c.h0) ? c.h0 : d, g = e.dpr ?? 1, p = e.scale ?? 1, y = (l && u ? Math.max(1, e.width) : l ? e.width : u ? e.height * h / Math.max(1, m) : f * p) * g, b = (l && u ? Math.max(1, e.height) : u ? e.height : l ? e.width * m / Math.max(1, h) : d * p) * g;
    if (Math.max(i, s, y, b) <= jt && i * s <= he && y * b <= he || (n === "png" ? typeof CompressionStream != "function" : Math.max(y, b) >= 65536)) return null;
    return w();
    async function w() {
      let S = Math.max(1, Math.floor(y)), v = Math.max(1, Math.floor(b)), C = Ee(t), M = C.slice(C.indexOf(o) + o.length, C.lastIndexOf("</svg>")), $2 = r.match(/\bpreserveAspectRatio="([^"]*)"/i)?.[1] || "xMidYMid meet", F = i / a[2], A = s / a[3], x = 0, _ = 0;
      /\bnone\b/.test($2) || (F = A = /\bslice\b/.test($2) ? Math.max(F, A) : Math.min(F, A), x = (i - a[2] * F) * (/xMin/.test($2) ? 0 : /xMax/.test($2) ? 1 : 0.5), _ = (s - a[3] * A) * (/YMin/.test($2) ? 0 : /YMax/.test($2) ? 1 : 0.5)), x -= a[0] * F, _ -= a[1] * A;
      let P = r.replace(/\s(?:width|height|preserveAspectRatio)="[^"]*"/gi, "").slice(0, -1), E = Y() && /(?:box-shadow|text-shadow)\s*:[^;"}]*px/i.test(C), R = i / y, L = s / b, k = Math.max(1, Math.min(8192, Math.floor(4 * 1024 * 1024 / S), E ? Math.floor(2046 / L) : 8192)), I = Math.max(1, Math.min(8192, S, E ? Math.floor(2046 / R) : 8192));
      async function* W() {
        for (let T = 0; T < v; T += k) {
          let N = Math.min(k, v - T), U = new Uint8Array(S * N * 4);
          for (let z = 0; z < S; z += I) {
            let V = Math.min(I, S - z), B = E ? Math.max(0, Math.floor(z * R) - 1) : z * R, rt = E ? Math.max(0, Math.floor(T * L) - 1) : T * L, at = E ? Math.min(f, Math.ceil((z + V) * R) + 1) - B : V, pt = E ? Math.min(d, Math.ceil((T + N) * L) + 1) - rt : N, St = at / a[2], ee = pt / a[3], yt = E ? 1 : 1 / R, It = E ? 1 : 1 / L, $e = `matrix(${F * yt / St},0,0,${A * It / ee},${(x - B) * yt / St + a[0]},${(_ - rt) * It / ee + a[1]})`, q = `${P} width="${at}" height="${pt}" preserveAspectRatio="none"><g style="all:unset!important;transform:${$e}!important;transform-origin:0 0!important">${M}</g></svg>`, X = await te(Re(q), { width: at, height: pt, dpr: 1, backgroundColor: E ? null : e.backgroundColor, __session: e.__session, __releaseDecodeFrame: true }), G = X;
            try {
              if (E) {
                G = document.createElement("canvas"), G.width = V, G.height = N;
                let Z = G.getContext("2d");
                e.backgroundColor && (Z.fillStyle = e.backgroundColor, Z.fillRect(0, 0, V, N)), Z.drawImage(X, z * R - B, T * L - rt, V * R, N * L, 0, 0, V, N);
              }
              let ht = G.getContext("2d").getImageData(0, 0, V, N).data;
              for (let Z = 0; Z < N; Z++) U.set(ht.subarray(Z * V * 4, (Z + 1) * V * 4), (Z * S + z) * 4);
            } finally {
              X.width = X.height = 0, G !== X && (G.width = G.height = 0);
            }
          }
          yield U;
        }
      }
      return n === "png" ? (await Promise.resolve().then(() => (xc(), wc))).encodePng(S, v, W()) : (await Promise.resolve().then(() => (Rc(), Ec))).encodeJpeg(S, v, W(), e.quality);
    }
  }
  async function Bi(t, e) {
    let n = e.format || e.type || "svg";
    if (n === "svg") {
      if (typeof HTMLCanvasElement < "u" && t instanceof HTMLCanvasElement) throw new Error("[SnapDOM] html-in-canvas makes a raster capture, not an SVG; ask for png, jpeg or webp.");
      let s = jn(decodeURIComponent(t.split(",")[1]), e.__fileSvg);
      return new Blob([s], { type: "image/svg+xml" });
    }
    let o = n === "jpg" ? "jpeg" : n, r = (o === "png" || o === "jpeg") && er(t, e, o);
    if (r) return r;
    let i = await te(t, { ...e, __encodeFormat: o });
    return new Promise((s) => i.toBlob((a) => s(a), `image/${o}`, e.quality));
  }
  async function $c(t, e) {
    let n = new File([t], e, { type: t.type });
    if (!navigator.canShare?.({ files: [n] })) return false;
    try {
      await navigator.share({ files: [n], title: e });
    } catch (o) {
      if (o.name !== "AbortError") return false;
    }
    return true;
  }
  async function lm(t, e) {
    let n = /* @__PURE__ */ new Set(["png", "jpeg", "jpg", "webp", "svg"]), o = (e?.type || "").toLowerCase(), r = n.has(o) ? o : "", i = (e?.format || r || "").toLowerCase(), s = i === "jpg" ? "jpeg" : i || "png", a = e?.filename || "snapdom", l = /\.(png|jpe?g|webp|svg)$/i.test(a) ? a : `${a}.${s}`, u = { ...e || {}, format: s, type: s };
    u.dpr = 1;
    let c = xn(), f = (s === "png" || s === "jpeg") && er(t, u, s);
    if (s === "svg" || f) {
      let m = f ? await f : await Bi(t, { ...u, type: "svg" });
      if (c && await $c(m, l)) return;
      let g = URL.createObjectURL(m), p = document.createElement("a");
      p.href = g, p.download = l, document.body.appendChild(p), p.click(), setTimeout(() => URL.revokeObjectURL(g), 1e3), p.remove();
      return;
    }
    let d = await te(t, { ...u, __encodeFormat: s });
    if (c) {
      let m = `image/${s}`, g = await new Promise((p) => d.toBlob(p, m, e?.quality));
      if (g && await $c(g, l)) return;
    }
    let h = document.createElement("a");
    h.href = d.toDataURL(`image/${s}`, e?.quality), h.download = l, document.body.appendChild(h), h.click(), h.remove();
  }
  function zt() {
    He++;
  }
  function Jn(t) {
    let e = t && (t.nodeType === 1 ? t : t.parentElement);
    for (; e; ) {
      if (Xt(e)) return true;
      e.parentElement ? e = e.parentElement : e = Bt(e);
    }
    return false;
  }
  function Zn(t) {
    for (let e of t) if (xe(e)) return true;
    return false;
  }
  function xe(t) {
    if (Jn(t.target)) return false;
    if (t.type === "childList") {
      let e = true;
      for (let n of t.addedNodes) if (!Jn(n)) {
        e = false;
        break;
      }
      if (e) {
        for (let n of t.removedNodes) if (!Jn(n)) {
          e = false;
          break;
        }
      }
      if (e) return false;
    }
    return true;
  }
  function ks(t) {
    for (let e of t) {
      if (!xe(e)) continue;
      let n = e.target.ownerDocument || document;
      ze.set(n, (ze.get(n) || 0) + 1);
      let o = e.target.nodeType === 1 ? e.target : e.target.parentElement || e.target.host;
      for (; o; o = o.parentElement || Bt(o)) ze.set(o, (ze.get(o) || 0) + 1);
    }
  }
  function kn(t) {
    let e = t.ownerDocument || document;
    return Ge(e), (ze.get(e) || 0) - (ze.get(t) || 0);
  }
  function je(t = document) {
    return Ge(t), Rt;
  }
  function Se() {
    return Ge(), He;
  }
  function Mn(t) {
    return t ? (Ge(t.ownerDocument || document), to(t, Rr(t))) : 0;
  }
  function Ve() {
    zt(), Rt++;
  }
  function kf(t) {
    we.set(t, ++ae);
  }
  function _r(t) {
    if (!t || t.nodeType !== 1) return;
    ae++, we.set(t, ae);
    let e = t.querySelectorAll("*");
    for (let n = 0; n < e.length; n++) we.set(e[n], ae);
  }
  function Er(t) {
    _r(t.parentElement || t);
    for (let e = t.parentElement; e; e = e.parentElement) kf(e);
  }
  function to(t, e = null) {
    let n = we.get(t) || 0;
    if (e) for (let o of e) n = Math.max(n, we.get(o) || 0);
    return le * 1e9 + n;
  }
  function Rr(t) {
    let e = t.getRootNode?.();
    if (!e?.host) return null;
    let n = [];
    for (; e?.host; ) e.mode === "open" && $r(e), n.push(e.host), e = e.host.getRootNode?.();
    return n;
  }
  function Fr(t) {
    t = t || document;
    let e = Cr.get(t);
    if (!e || e.env !== Rt) {
      let n = true;
      try {
        n = Yt(t).usesHas;
      } catch {
      }
      e = { env: Rt, usesHas: n }, Cr.set(t, e);
    }
    return !e.usesHas;
  }
  function Mf(t) {
    let e = (n) => n?.nodeType === 1 && (n.matches?.("style,link") || n.querySelector?.("style,link"));
    for (let n of t) {
      let o = n.target, r = o && (o.nodeType === 1 ? o : o.parentElement);
      if (r && (r.tagName === "STYLE" || r.tagName === "LINK")) return r.ownerDocument || document;
      for (let i of n.addedNodes) if (e(i)) return i.ownerDocument || document;
      for (let i of n.removedNodes) if (e(i)) return i.ownerDocument || o && o.ownerDocument || document;
    }
    return null;
  }
  function Ms(t) {
    if (!Zn(t)) return;
    ks(t), zt();
    let e = /* @__PURE__ */ new Set();
    for (let n of t) {
      if (!xe(n)) continue;
      let o = n.target.getRootNode && n.target.getRootNode();
      if (!o || o.nodeType !== 11 || e.has(o)) continue;
      e.add(o), o.host ? _r(o.host) : ae++;
      let r = o.querySelectorAll("*");
      for (let i = 0; i < r.length; i++) we.set(r[i], ae);
    }
  }
  function $r(t) {
    if (!(!t || kr.has(t))) {
      kr.add(t);
      try {
        let e = new MutationObserver(Ms);
        e.observe(t, { subtree: true, childList: true, characterData: true, attributes: true }), Sn.push({ o: e, root: t });
      } catch {
      }
    }
  }
  function As(t) {
    if (!Zn(t)) return;
    ks(t), zt();
    let e = Mf(t);
    if (e) {
      Cr.delete(e), Rt++, le++;
      return;
    }
    let n = /* @__PURE__ */ new Set();
    for (let o of t) {
      if (!xe(o)) continue;
      let r = o.target.nodeType === 1 ? o.target : o.target.parentElement;
      if (!r) continue;
      let i = r.ownerDocument || document;
      if (!Fr(i)) {
        le++;
        return;
      }
      if (r === i.documentElement || r === i.body) {
        le++;
        return;
      }
      let s = r.parentElement || r;
      n.has(s) || (n.add(s), Er(r));
    }
  }
  function Ge(t = document) {
    if (t === vn || !t || t.nodeType !== 9) return;
    if (Mr.has(t)) {
      vn = t;
      return;
    }
    Mr.add(t), vn = t;
    let e = t.defaultView, n = (r) => {
      Zn(r) && (zt(), Rt++);
    }, o = () => {
      zt(), Rt++;
    };
    try {
      let r = new MutationObserver(As);
      r.observe(t.documentElement, { subtree: true, childList: true, characterData: true, attributes: true }), Cn.push({ o: r, env: false, doc: t });
    } catch {
    }
    try {
      let r = new MutationObserver(n);
      r.observe(t.head, { subtree: true, childList: true, characterData: true, attributes: true }), Cn.push({ o: r, env: true, doc: t });
    } catch {
    }
    try {
      e?.addEventListener("resize", o, { passive: true });
    } catch {
    }
    try {
      let r = (i) => {
        zt();
        let s = i.composedPath?.()[0] || i.target;
        s && s.nodeType === 1 && !Jn(s) && Fr(s.ownerDocument || t) ? Er(s) : le++;
      };
      t.addEventListener("focusin", r, { capture: true, passive: true }), t.addEventListener("focusout", r, { capture: true, passive: true }), t.addEventListener("change", r, { capture: true, passive: true }), t.addEventListener("pointerdown", r, { capture: true, passive: true }), t.addEventListener("pointerup", r, { capture: true, passive: true }), t.addEventListener("pointercancel", r, { capture: true, passive: true }), t.addEventListener("keydown", r, { capture: true, passive: true }), t.addEventListener("keyup", r, { capture: true, passive: true }), t.addEventListener("beforetoggle", r, { capture: true, passive: true }), t.addEventListener("toggle", r, { capture: true, passive: true }), e?.addEventListener("hashchange", () => {
        zt(), le++;
      }, { passive: true });
    } catch {
    }
    try {
      let r = t.fonts;
      r && (r.addEventListener?.("loadingdone", o), r.status === "loading" && r.ready?.then(o).catch(() => {
      }));
    } catch {
    }
  }
  function ws(t, e) {
    if (!t?.querySelectorAll) return;
    let n;
    try {
      n = Array.from(t.querySelectorAll(":hover"));
    } catch {
      return;
    }
    let o = bs.get(t) || [];
    if (o.length === n.length && o.every((i, s) => i === n[s])) return;
    if (bs.set(t, n), zt(), t.nodeType === 11) {
      t.host ? _r(t.host) : ae++;
      for (let i of t.querySelectorAll("*")) we.set(i, ae);
      return;
    }
    let r = o.filter((i) => !n.includes(i)).concat(n.filter((i) => !o.includes(i)));
    for (let i of r) if (i.isConnected) if (Fr(e)) Er(i);
    else {
      le++;
      return;
    }
  }
  function eo(t, e = null) {
    if (!t) return;
    ws(t, t);
    let n = e || Sn.filter(({ root: o }) => o.host?.isConnected).map(({ root: o }) => o);
    for (let o of n) ws(o, t);
  }
  function Ut() {
    Ge();
    try {
      for (let t = Cn.length - 1; t >= 0; t--) {
        let { o: e, env: n, doc: o } = Cn[t];
        if (o !== document && !o.defaultView) {
          try {
            e.disconnect();
          } catch {
          }
          Mr.delete(o), vn === o && (vn = null), Cn.splice(t, 1);
          continue;
        }
        let r = e.takeRecords();
        r.length && (n ? Zn(r) && (zt(), Rt++) : As(r));
      }
      for (let t = Sn.length - 1; t >= 0; t--) {
        let { o: e, root: n } = Sn[t];
        if (!n.host || !n.host.isConnected) {
          try {
            e.disconnect();
          } catch {
          }
          kr.delete(n), Sn.splice(t, 1);
          continue;
        }
        let o = e.takeRecords();
        o.length && Ms(o);
      }
    } catch {
    }
  }
  function ve(t) {
    if (!(!t || t.nodeType !== 1)) {
      ce.delete(t);
      try {
        let e = (t.ownerDocument || document).createTreeWalker(t, NodeFilter.SHOW_ELEMENT);
        for (; e.nextNode(); ) ce.delete(e.currentNode);
      } catch {
      }
    }
  }
  function Tr(t) {
    let e = ce.get(t);
    if (e && no(e, t)) {
      let n = e.snapshot && e.snapshot.__needsBgInline;
      if (n !== void 0) return n;
    }
    return true;
  }
  function _s(t) {
    let e = ce.get(t);
    if (!e || !no(e, t)) return null;
    let n = e.snapshot;
    return !n || n.__bgClipTextFix ? null : n;
  }
  function _f(t) {
    let e = t.href;
    return !e || typeof CSSStyleSheet != "function" ? null : Kn.has(e) ? Kn.get(e) : (Kn.set(e, null), ut(e, { as: "text" }).then((n) => {
      if (!n.ok || typeof n.data != "string" || /@import/i.test(n.data)) return;
      let o = new CSSStyleSheet();
      o.replaceSync(n.data), Kn.set(e, o.cssRules), zt(), Rt++;
    }).catch(() => {
    }), null);
  }
  function Yt(t) {
    let e = xs.get(t);
    if (!e || e.epoch !== He) {
      let n = e && e.universe;
      e = { epoch: He, ...fs(t, _f) };
      let o = e.universe;
      if (n && o && n.size === o.size) {
        let r = true;
        for (let i of o) if (!n.has(i)) {
          r = false;
          break;
        }
        r && (e.universe = n);
      }
      xs.set(t, e);
    }
    return e;
  }
  function Pr(t, e) {
    return e ? (e.__scan || (e.__scan = Yt(t), e.__scanEnv = Rt), e.__scan) : Yt(t);
  }
  function Es(t) {
    return Yt(t).leaksAcrossSubtrees;
  }
  function Rs(t) {
    try {
      let e = Yt(t.ownerDocument || document).shareGate;
      if (e === null) return false;
      if (!e.length) return true;
      let n = /* @__PURE__ */ new Set(), o = (s) => {
        n.add("t" + s.localName), s.id && n.add("i" + s.id);
        let a = s.classList;
        for (let l = 0; l < a.length; l++) n.add("c" + a[l]);
      };
      o(t);
      for (let s of t.querySelectorAll("*")) o(s);
      let r = [];
      for (let { sel: s, key: a } of e) (a === null || n.has(a)) && r.push(s);
      if (!r.length) return true;
      let i = r.join(",");
      return !t.matches(i) && t.querySelector(i) === null;
    } catch {
      return false;
    }
  }
  function Ef(t) {
    let e = t.ownerDocument || document;
    return t.getRootNode && t.getRootNode() !== e ? null : Yt(e).importantProps;
  }
  function qe(t, e) {
    let n = t.ownerDocument || document, o = t.getRootNode ? t.getRootNode() : n;
    return o === n ? Pr(n, e).universe : e && Jt(o) ? Rf(t, o, n, e) : null;
  }
  function Rf(t, e, n, o) {
    let r = o.__shadowUniverse;
    if (r === null) return null;
    if (!r) {
      let a = Pr(n, o).universe;
      if (!a) return o.__shadowUniverse = null;
      r = o.__shadowUniverse = { universe: new Set(a), roots: /* @__PURE__ */ new Set() };
    }
    let i = (a) => {
      for (; Jt(a) && !r.roots.has(a); a = a.host.getRootNode()) {
        r.roots.add(a);
        for (let l of [...a.styleSheets, ...a.adoptedStyleSheets || []]) {
          let u = Ss.get(l);
          if ((!u || u.epoch !== He) && Ss.set(l, u = { epoch: He, props: cs(l) }), !u.props) return false;
          for (let c of u.props) r.universe.add(c);
        }
        hr(a.getAnimations(), r.universe);
      }
      return true;
    }, s = i(e) && (!t.shadowRoot || i(t.shadowRoot));
    for (let a = t.assignedSlot; s && a; a = a.assignedSlot) s = i(a.getRootNode());
    return s ? r.universe : o.__shadowUniverse = null;
  }
  function Qn(t, e) {
    let n = t.ownerDocument || document;
    return t.getRootNode && t.getRootNode() !== n ? null : Pr(n, e).pseudoUniverse;
  }
  function Fs(t) {
    let e = t.ownerDocument || document;
    return t.getRootNode && t.getRootNode() !== e ? null : Yt(e).svgGeometry;
  }
  function $s(t) {
    let e = Yt(t.ownerDocument || document).svgGeometrySel;
    if (e == null) return true;
    if (!e) return false;
    try {
      return t.matches(e);
    } catch {
      return true;
    }
  }
  function fe(t) {
    let e = t.ownerDocument || document;
    return t.getRootNode && t.getRootNode() !== e ? Ff : Yt(e).pseudoGates;
  }
  function $f(t, e = {}, n = null, o = null) {
    let r = {}, i = e.excludeStyleProps, s = (h) => {
      if (r[h] !== void 0 || We(h) || i && (i instanceof RegExp && i.test(h) || typeof i == "function" && i(h))) return;
      let m = t.getPropertyValue(h);
      m && ((h === "background-image" || h === "content") && m.includes("url(") && !m.includes("data:") && (m = "none"), r[h] = m);
    };
    if (o) {
      for (let m of o) s(m);
      let h = n && n.style;
      if (h && h.length) for (let m = 0; m < h.length; m++) s(h[m]);
    } else for (let h = 0; h < t.length; h++) s(t[h]);
    let a = ["text-decoration-line", "text-decoration-color", "text-decoration-style", "text-decoration-thickness", "text-underline-offset", "text-decoration-skip-ink"];
    for (let h of a) if (!r[h]) try {
      let m = t.getPropertyValue(h);
      m && (r[h] = m);
    } catch {
    }
    let l = ["-webkit-text-stroke", "-webkit-text-stroke-width", "-webkit-text-stroke-color", "paint-order"];
    for (let h of l) if (!r[h]) try {
      let m = t.getPropertyValue(h);
      m && (r[h] = m);
    } catch {
    }
    if (e.embedFonts) {
      let h = ["font-feature-settings", "font-variation-settings", "font-kerning", "font-variant", "font-variant-ligatures", "font-optical-sizing"];
      for (let m of h) if (!r[m]) try {
        let g = t.getPropertyValue(m);
        g && (r[m] = g);
      } catch {
      }
    }
    try {
      (r["content-visibility"] || t.getPropertyValue("content-visibility")) === "hidden" && (r["content-visibility"] = "hidden");
    } catch {
    }
    Object.defineProperty(r, "__needsBgInline", { value: Ps(t), enumerable: false });
    let u = parseFloat(t.getPropertyValue("border-top-width") || 0) || 0, c = parseFloat(t.getPropertyValue("border-right-width") || 0) || 0, f = parseFloat(t.getPropertyValue("border-bottom-width") || 0) || 0, d = parseFloat(t.getPropertyValue("border-left-width") || 0) || 0;
    if (u === 0 && c === 0 && f === 0 && d === 0) {
      let h = (t.getPropertyValue("border-image-source") || "").trim(), m = h && h !== "none", g = ["border", "border-top", "border-right", "border-bottom", "border-left", "border-width", "border-style", "border-color", "border-top-width", "border-top-style", "border-top-color", "border-right-width", "border-right-style", "border-right-color", "border-bottom-width", "border-bottom-style", "border-bottom-color", "border-left-width", "border-left-style", "border-left-color", "border-block", "border-block-width", "border-block-style", "border-block-color", "border-inline", "border-inline-width", "border-inline-style", "border-inline-color", "border-block-start", "border-block-start-width", "border-block-start-style", "border-block-start-color", "border-block-end", "border-block-end-width", "border-block-end-style", "border-block-end-color", "border-inline-start", "border-inline-start-width", "border-inline-start-style", "border-inline-start-color", "border-inline-end", "border-inline-end-width", "border-inline-end-style", "border-inline-end-color"];
      for (let p of g) delete r[p];
      m || (r.border = "none");
    }
    return Tf(r), r;
  }
  function Tf(t) {
    if (!_t()) return;
    let e = t["background-clip"] || t["-webkit-background-clip"];
    if (!e || !e.includes("text")) return;
    let n = (i) => i === "transparent" || i === "rgba(0, 0, 0, 0)", o = t["-webkit-text-fill-color"];
    if (!n(o !== void 0 ? o : t.color)) return;
    let r = Lf(t["background-image"], t["background-color"]);
    r && (n(t.color) && (t.color = r), o !== void 0 && (t["-webkit-text-fill-color"] = r), t["background-image"] = "none", t["background-color"] = "transparent", delete t["background-clip"], delete t["-webkit-background-clip"], Object.defineProperty(t, "__bgClipTextFix", { value: r, enumerable: false }));
  }
  function Pf(t, e, n) {
    let o = n.textShadow;
    if (!o || o === "none" || !(parseFloat(n.webkitTextStrokeWidth) > 0) || t.firstElementChild || n.backgroundImage !== "none" || n.boxShadow !== "none" || Ts(n.backgroundColor)[3] !== 0 || ["Top", "Right", "Bottom", "Left"].some((u) => parseFloat(n[`border${u}Width`]) > 0) || o.replace(/\([^)]*\)/g, "").includes(",")) return;
    let r = (o.match(/(?:rgba?|hsla?|color|oklch|oklab|lab|lch)\([^)]*\)|#[\da-f]+|\b[a-z]+\b/i) || [])[0], [i = 0, s = 0, a = 0] = (o.match(/-?[\d.]+px/g) || []).map(parseFloat);
    if (!r) return;
    let l = n.filter && n.filter !== "none" ? `${n.filter} ` : "";
    e.style.setProperty("text-shadow", "none", "important"), e.style.setProperty("filter", `${l}drop-shadow(${i}px ${s}px ${a / 2}px ${r})`, "important");
  }
  function Ts(t) {
    if (!be) {
      let e = document.createElement("canvas");
      e.width = e.height = 1, be = e.getContext("2d", { willReadFrequently: true });
    }
    return be.clearRect(0, 0, 1, 1), be.fillStyle = "transparent", be.fillStyle = t, be.fillRect(0, 0, 1, 1), be.getImageData(0, 0, 1, 1).data;
  }
  function Lf(t, e) {
    let n = (i) => {
      let s = [];
      for (let a of (i || "").match(Nf) || []) {
        let [l, u, c, f] = Ts(a);
        f > 13 && s.push([l, u, c]);
      }
      return s;
    }, o = n(t);
    if (o.length || (o = n(e)), !o.length) return null;
    let r = [0, 0, 0];
    for (let [i, s, a] of o) r[0] += i, r[1] += s, r[2] += a;
    return `rgb(${r.map((i) => Math.round(i / o.length)).join(", ")})`;
  }
  function Ps(t) {
    let e = t.getPropertyValue("background-image");
    if (e && e !== "none") return true;
    let n = t.getPropertyValue("background-color");
    if (n && n !== "rgba(0, 0, 0, 0)" && n !== "transparent") return true;
    for (let r of Af) {
      let i = t.getPropertyValue(r);
      if (i && i !== "none") return true;
    }
    let o = t.getPropertyValue("background");
    return !!(o && /url\s*\(/i.test(o));
  }
  function If(t) {
    for (let e = t.firstChild; e; e = e.nextSibling) {
      if (e.nodeType === 3 && /\S/.test(e.nodeValue || "")) return true;
      if (e.nodeType === 1) {
        let n = O(e).position;
        if (n !== "absolute" && n !== "fixed") return true;
      }
    }
    return false;
  }
  function Wf(t, e, n) {
    try {
      if (typeof t.computedStyleMap == "function") {
        let r = t.computedStyleMap().get("width");
        if (r != null) return !vs(String(r).trim().toLowerCase());
      }
    } catch {
    }
    let o = t.style && (t.style.width || t.style.inlineSize);
    return o && !vs(String(o).trim().toLowerCase()) ? true : Df(t, e) ? n || Bf(t, e) : false;
  }
  function vs(t) {
    return Of.has(t) || t.startsWith("fit-content");
  }
  function Df(t, e) {
    let n = t.getBoundingClientRect().width - (parseFloat(e.paddingLeft) || 0) - (parseFloat(e.paddingRight) || 0) - (parseFloat(e.borderLeftWidth) || 0) - (parseFloat(e.borderRightWidth) || 0);
    if (!(n > 0)) return false;
    let o = 1 / 0, r = -1 / 0, i = null;
    for (let s = t.firstChild; s; s = s.nextSibling) {
      let a;
      if (s.nodeType === 3) {
        if (!/\S/.test(s.nodeValue || "") || (i = i || document.createRange(), i.selectNode(s), a = i.getBoundingClientRect(), !a.width && !a.height)) continue;
      } else if (s.nodeType === 1) {
        let l = O(s);
        if (l.display === "none" || l.position === "absolute" || l.position === "fixed") continue;
        a = s.getBoundingClientRect();
      } else continue;
      a.left < o && (o = a.left), a.right > r && (r = a.right);
    }
    return r === -1 / 0 ? false : r - o < n - 0.5;
  }
  function Bf(t, e) {
    let n = t.parentElement;
    if (!n) return false;
    let o = O(n), r = n.getBoundingClientRect().width - (parseFloat(o.paddingLeft) || 0) - (parseFloat(o.paddingRight) || 0) - (parseFloat(o.borderLeftWidth) || 0) - (parseFloat(o.borderRightWidth) || 0) - (parseFloat(e.marginLeft) || 0) - (parseFloat(e.marginRight) || 0);
    return r > 0 ? Math.abs(t.getBoundingClientRect().width - r) > 0.5 : false;
  }
  function zf(t, e) {
    let n = Ar.get(t);
    if (n) return n;
    let o = [e];
    for (let r in t) o.push(r, t[r]);
    return n = o.join(""), Ar.set(t, n), n;
  }
  function no(t, e) {
    return t.env === Rt && t.stamp === to(e, t.hosts);
  }
  function Vf(t) {
    let e = t.__styleShare;
    return e || (e = t.__styleShare = { ids: /* @__PURE__ */ new WeakMap(), intern: /* @__PURE__ */ new Map(), snaps: /* @__PURE__ */ new Map(), rootSeen: false }), e;
  }
  function Gf(t, e) {
    let n = e.ids.get(t);
    if (n !== void 0) return n;
    let o = t.parentElement, r;
    if (!o) r = "R";
    else if (r = e.ids.get(o), r === void 0) {
      if (e.rootSeen) return e.ids.set(t, -1), -1;
      r = "R";
    }
    if (e.rootSeen = true, r === -1) return e.ids.set(t, -1), -1;
    let i = "", s = t.attributes;
    if (s && s.length) if (s.length === 1) i = s[0].name + "=" + s[0].value;
    else {
      let l = [];
      for (let u = 0; u < s.length; u++) l.push(s[u].name + "=" + s[u].value);
      l.sort(), i = l.join("");
    }
    let a = r + "|" + t.tagName + "|" + i;
    return n = e.intern.get(a), n === void 0 && (n = e.intern.size, e.intern.set(a, n)), e.ids.set(t, n), n;
  }
  function Ns(t, e) {
    let n = t.snap, o = t.snap = { ...n };
    Object.defineProperty(o, "__needsBgInline", { value: n.__needsBgInline, enumerable: false }), n.__bgClipTextFix !== void 0 && Object.defineProperty(o, "__bgClipTextFix", { value: n.__bgClipTextFix, enumerable: false });
    let r = Yt(e.ownerDocument || document), i = e.getAttribute && e.getAttribute("style") || "", s = i && Hf.test(i), a = !!r.marginUnstable || s && /margin/i.test(i), l = !!r.paddingUnstable || s && /padding/i.test(i), u = o.display !== void 0 && o.display.includes("grid"), c = o.transform !== void 0 && o.transform !== "none", f = [];
    for (let m in o) (Uf.test(m) || u && (m === "grid-template-columns" || m === "grid-template-rows") || c && m === "transform" || a && m.charCodeAt(0) === 109 && m.startsWith("margin-") || l && m.charCodeAt(0) === 112 && m.startsWith("padding-")) && f.push(m);
    t.h && !("height" in o) && f.push("height"), t.b && !("block-size" in o) && f.push("block-size");
    let d = new Set(f), h = [e.tagName.toLowerCase()];
    for (let m in o) d.has(m) || h.push(m, o[m]);
    return t.rr = f, t.sig = h.join("") + "" + f.join(""), f;
  }
  function Ls(t, e, n, o, r) {
    let i = r && r.__styleShare ? o && o.__styleShare : null, s = i ? i.ids.get(t) : void 0;
    if (s === void 0 || s === -1 || t.shadowRoot || t.assignedSlot) return De(n, Qn(t, o));
    let a = s + e, l = i.pseudo || (i.pseudo = /* @__PURE__ */ new Map()), u = l.get(a);
    if (u) {
      let f = { ...u.snap }, d = u.rr || Ns(u, t);
      for (let h = 0; h < d.length; h++) {
        let m = n.getPropertyValue(d[h]);
        m ? f[d[h]] = m : delete f[d[h]];
      }
      return f;
    }
    let c = De(n, Qn(t, o));
    return l.set(a, { snap: c, rr: null, sig: null, h: "height" in c, b: "block-size" in c }), c;
  }
  function qf(t, e = null, n = {}, o = null, r = null) {
    let i = ce.get(t), s = !!(n && n.embedFonts), a = n && n.excludeStyleProps || null;
    if (typeof a != "function" && i && no(i, t) && i.embedFonts === s && i.excludeStyleProps === a) return i.snapshot;
    let l = e || getComputedStyle(t), u, c = null, f = o && o.st.snaps.get(o.id);
    if (f) {
      u = { ...f.snap };
      let g = f.rr || Ns(f, t);
      c = [];
      for (let p = 0; p < g.length; p++) {
        let y = g[p], b = l.getPropertyValue(y);
        b ? u[y] = b : delete u[y], c.push(b);
      }
      Object.defineProperty(u, "__needsBgInline", { value: f.snap.__needsBgInline, enumerable: false }), f.snap.__bgClipTextFix !== void 0 && Object.defineProperty(u, "__bgClipTextFix", { value: f.snap.__bgClipTextFix, enumerable: false });
    } else u = $f(l, n, t, qe(t, r)), o && o.st.snaps.set(o.id, { snap: u, rr: null, sig: null, h: "height" in u, b: "block-size" in u });
    let d = false;
    if (typeof t.computedStyleMap == "function") {
      let g;
      for (let p of ys) if (u[p] === "0px") try {
        g || (g = t.computedStyleMap()), g.get(p)?.toString() === "auto" && (u[p] = "auto", d = true);
      } catch {
      }
    }
    lu(t, l, u);
    let h = Zf(t, l, u);
    c !== null && (d && c.push("", ...ys.map((g) => u[g])), h && c.push("" + h), Ar.set(u, f.sig + "" + c.join("") + ("height" in u ? "" : "") + ("block-size" in u ? "" : "")));
    let m = Rr(t);
    return ce.set(t, { env: r?.__scanEnv ?? Rt, stamp: to(t, m), hosts: m, snapshot: u, embedFonts: s, excludeStyleProps: a }), u;
  }
  function Xf(t, e) {
    if (t && t.session && t.persist) return t;
    if (t && (t.styleMap || t.styleCache || t.nodeMap)) {
      let n = t.__ctx;
      return (!n || t.__ctxOpts !== e) && (n = { session: t, persist: { snapshotKeyCache: vr, defaultStyle: j.defaultStyle, baseStyle: j.baseStyle, image: j.image, resource: j.resource, background: j.background }, options: e || {} }, t.__ctx = n, t.__ctxOpts = e), n;
    }
    return { session: { styleMap: /* @__PURE__ */ new Map(), styleCache: /* @__PURE__ */ new WeakMap(), nodeMap: /* @__PURE__ */ new Map() }, persist: { snapshotKeyCache: vr, defaultStyle: j.defaultStyle, baseStyle: j.baseStyle, image: j.image, resource: j.resource, background: j.background }, options: t || e || {} };
  }
  function Jf(t, e, n) {
    if (!t.style || t.style.length === 0) return;
    let o = Ef(t), r = o != null && !Yf.test(t.getAttribute("style") || ""), i;
    for (let s = 0; s < t.style.length; s++) {
      let a = t.style[s], l = a.startsWith("border-") && a.endsWith("-width");
      if (r && l && i === void 0) {
        let c = t.style.borderWidth, f = ce.get(t);
        i = f && no(f, t) && Is.every((d) => f.snapshot[d] === c) || n.borderWidth === c;
      }
      if (r && !o.has(a) && (!l || i) && !(a.startsWith("background") && Kf(t))) continue;
      let u = n.getPropertyValue(a);
      u && (!l || u !== t.style.getPropertyValue(a)) && e.style.setProperty(a, u, t.style.getPropertyPriority(a));
    }
  }
  function xt(t, e, n, o) {
    if (t.tagName === "STYLE") return;
    let r = Xf(n, o), i = r.options && r.options.cache || "soft";
    i !== "disabled" && Ge(t.ownerDocument), i === "disabled" && !r.session.__bumpedForDisabled && (zt(), vr.clear(), r.session.__bumpedForDisabled = true);
    let { session: s, persist: a } = r;
    if (!s.styleCache.has(t)) {
      let y = null;
      try {
        y = getComputedStyle(t);
      } catch {
      }
      s.styleCache.set(t, y || getComputedStyle((t.ownerDocument || document).documentElement));
    }
    let l = s.styleCache.get(t);
    t.getAttribute?.("style") && Jf(t, e, l);
    let u = l.getPropertyValue("animation-name");
    e && e.style && u && u !== "none" && e.style.setProperty("animation", "none", "important");
    let c = t.tagName?.toLowerCase() || "div";
    if (gn.has(c)) {
      let y = {};
      Object.defineProperty(y, "__needsBgInline", { value: Ps(l), enumerable: false });
      let b = Rr(t);
      ce.set(t, { env: Rt, stamp: to(t, b), hosts: b, snapshot: y, embedFonts: !!(r.options && r.options.embedFonts), excludeStyleProps: r.options && r.options.excludeStyleProps || null }), s.styleMap.set(e, "");
      return;
    }
    let f = null;
    if (r.options && r.options.__styleShare && s.styleMap) {
      let y = Vf(s), b = Gf(t, y), w = t.ownerDocument || document, S = w.activeElement;
      b !== -1 && !jf.has(t.tagName) && !(S && S !== w.body && S !== w.documentElement && S === t) && (!t.getRootNode || t.getRootNode() === w) && !t.shadowRoot && !t.assignedSlot && (f = { st: y, id: b });
    }
    let d = qf(t, l, r.options, f, s);
    if (t.getAttribute?.("style")) for (let y of ["top", "right", "bottom", "left"]) {
      let b = `margin-${y}`;
      d[b] === "auto" && e.style.setProperty(b, "auto", "important");
    }
    d.__bgClipTextFix && e && e.style && (e.style.setProperty("background-image", "none", "important"), e.style.setProperty("background-color", "transparent", "important"), e.style.setProperty("color", d.__bgClipTextFix, "important"), e.style.setProperty("-webkit-text-fill-color", d.__bgClipTextFix, "important"), (s.bgClipText || (s.bgClipText = [])).push([t, e])), Y() && Pf(t, e, l), Qf(t, l, d), e.style?.length && d["box-sizing"] === "border-box" && l.getPropertyValue("box-sizing") !== "border-box" && nu(t, e, d);
    let h = zs(t);
    if (ru(t, e, d, h, s), h) {
      let y = l.getPropertyValue("min-width");
      if (!y || y === "auto" || y === "0px") {
        d["min-width"] = "0px";
        let b = l.getPropertyValue("overflow-x"), w = t.parentElement;
        if (y === "auto" && (b === "visible" || b === "clip") && w && O(w).display.includes("flex")) {
          let S = s.flexOverflow || (s.flexOverflow = /* @__PURE__ */ new WeakMap()), v = S.get(w);
          if (v === void 0) {
            if (v = w.scrollWidth > w.clientWidth, !v) {
              let C = O(w), M = (P) => parseFloat(C.getPropertyValue(P)) || 0, $2 = M("width") - (C.boxSizing === "border-box" ? M("padding-left") + M("padding-right") + M("border-left-width") + M("border-right-width") : 0), A = C.flexDirection.startsWith("row") === (C.writingMode === "horizontal-tb") && C.flexWrap === "nowrap", x = 0, _ = 0;
              for (let P of w.children) {
                s.styleCache.has(P) || s.styleCache.set(P, getComputedStyle(P));
                let E = s.styleCache.get(P);
                if (E.display === "none" || E.position === "absolute" || E.position === "fixed") continue;
                let R = (k) => parseFloat(E.getPropertyValue(k)) || 0, L = R("width") + R("margin-left") + R("margin-right") + (E.boxSizing === "border-box" ? 0 : R("padding-left") + R("padding-right") + R("border-left-width") + R("border-right-width"));
                x = A ? x + L : Math.max(x, L), _++;
              }
              v = x + (A ? Math.max(0, _ - 1) * M("column-gap") : 0) > $2 + _ / 60;
            }
            S.set(w, v);
          }
          v && (d["min-width"] = d.width);
        }
      }
    }
    let m = zf(d, c), g = true;
    if (Xn(c, (d.display || "").toLowerCase())) {
      g = If(t), g && yr(c, d, h) && Wf(t, l, h) && (g = false), m = `${m}${g ? "|c" : ""}${h ? "|f" : ""}`;
      let y = d["text-wrap-mode"] || d["white-space"] || "";
      g && y !== "nowrap" && y !== "pre" && (s.reconcileRisk = (s.reconcileRisk || 0) + 1);
    }
    let p = a.snapshotKeyCache.get(m);
    p === void 0 && (p = Oe(d, c, g, h), a.snapshotKeyCache.size >= Cf && a.snapshotKeyCache.delete(a.snapshotKeyCache.keys().next().value), a.snapshotKeyCache.set(m, p)), s.styleMap.set(e, p);
  }
  function Qf(t, e, n) {
    let o = e.getPropertyValue("overflow-x"), r = e.getPropertyValue("overflow-y");
    if ((o === "visible" || !o) && (r === "visible" || !r) || e.getPropertyValue("box-sizing") === "border-box" || typeof t.clientWidth != "number" || !t.offsetWidth) return;
    let i = (u) => parseFloat(u) || 0, s = t.offsetWidth - t.clientWidth - i(e.getPropertyValue("border-left-width")) - i(e.getPropertyValue("border-right-width")), a = t.offsetHeight - t.clientHeight - i(e.getPropertyValue("border-top-width")) - i(e.getPropertyValue("border-bottom-width")), l = (u, c) => {
      let f = n[u];
      if (!f || !f.endsWith("px")) return;
      let d = parseFloat(f);
      Number.isFinite(d) && (n[u] = `${Math.round((d + c) * 1e3) / 1e3}px`);
    };
    s >= 2 && (l("width", s), l("inline-size", s)), a >= 2 && (l("height", a), l("block-size", a));
  }
  function Zf(t, e, n) {
    if (!Is.some((l) => n[l]?.includes(".")) || e.getPropertyValue("box-sizing") === "border-box" || n.display === "inline") return "";
    for (let l of ["width", "height"]) {
      let u = n[`min-${l}`], c = n[`max-${l}`];
      if (u && u !== "0px" && u !== "auto" || c && c !== "none") return "";
    }
    let o = (l) => parseFloat(n[l]) || 0, r = o("padding-left") + o("padding-right") + o("border-left-width") + o("border-right-width"), i = o("padding-top") + o("padding-bottom") + o("border-top-width") + o("border-bottom-width"), s = (n["writing-mode"] || "horizontal-tb") !== "horizontal-tb";
    for (let l of Ws) {
      let u = n[l];
      if (!u || !u.endsWith("px")) continue;
      let f = l === "width" || l === "inline-size" && !s || l === "block-size" && s ? r : i;
      n[l] = `${Math.round((parseFloat(u) + f) * 1e3) / 1e3}px`;
    }
    n["box-sizing"] = "border-box";
    let a = "";
    if (e.getPropertyValue("overflow-x") === "auto") {
      let l = t.scrollWidth <= t.clientWidth;
      n["overflow-x"] = l ? "hidden" : "auto", l && (a += "x");
    }
    if (e.getPropertyValue("overflow-y") === "auto") {
      let l = t.scrollHeight <= t.clientHeight;
      n["overflow-y"] = l ? "hidden" : "auto", l && (a += "y");
    }
    return a;
  }
  function nu(t, e, n) {
    if (eu.test(t.getAttribute("style"))) for (let o of tu) e.style.getPropertyValue(o) && n[o] && e.style.setProperty(o, n[o], e.style.getPropertyPriority(o));
  }
  function ou(t) {
    return t.backgroundImage && t.backgroundImage !== "none" || t.backgroundColor && t.backgroundColor !== "rgba(0, 0, 0, 0)" && t.backgroundColor !== "transparent" || (parseFloat(t.borderTopWidth) || 0) > 0 || (parseFloat(t.borderBottomWidth) || 0) > 0 || (parseFloat(t.paddingTop) || 0) > 0 || (parseFloat(t.paddingBottom) || 0) > 0 ? true : (t.overflowBlock || t.overflowY || "visible") !== "visible";
  }
  function ru(t, e, n, o, r) {
    let i = n["text-wrap-mode"] || n["white-space"] || "", s = i === "nowrap" || i === "pre" || Ue === "white-space" && i !== "normal", a = r.__oneLine || (r.__oneLine = /* @__PURE__ */ new WeakSet());
    if (a.has(t.parentElement)) {
      a.add(t), !s && e.style && e.style.setProperty(Ue, "nowrap");
      return;
    }
    let l = n.display || "";
    !o && !l.startsWith("inline-") && (n.float || "none") === "none" && n.position !== "absolute" && n.position !== "fixed" || s || (n["writing-mode"] || "horizontal-tb") !== "horizontal-tb" || !e.style || iu(t, n, r) && (a.add(t), e.style.setProperty(Ue, "nowrap"));
  }
  function iu(t, e, n) {
    let o = t.clientHeight - (parseFloat(e["padding-top"]) || 0) - (parseFloat(e["padding-bottom"]) || 0);
    if (o > 3 * (parseFloat(e["font-size"]) || 16) || e["word-break"] === "normal" && e["overflow-wrap"] === "normal" && /^[\w\u00C0-\u024F.,:;!?'"()%]*$/.test(t.textContent.trim())) return false;
    let r = t.ownerDocument || document, i = r.createTreeWalker(t, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT), s = r.createRange(), a = null, l = 0, u = 0, c = 0;
    for (let h = i.nextNode(); h; h = i.nextNode()) {
      if (h.nodeType === 1) {
        if (h.shadowRoot || h.localName === "br" || h.localName === "textarea") return false;
        continue;
      }
      if (/\S/.test(h.data)) {
        if (++u > 64) return false;
        s.selectNodeContents(h);
        for (let m of s.getClientRects()) if (m.height) {
          if (c++, a || (a = m), Math.min(a.bottom, m.bottom) - Math.max(a.top, m.top) < Math.min(a.height, m.height) / 2) return false;
          l = Math.max(l, m.height);
        }
      }
    }
    if (!a) return false;
    let f = Bs(t, n.__axes || (n.__axes = /* @__PURE__ */ new WeakMap()));
    if (f === Os) return u === 1 && c === 1 && !t.childElementCount;
    let d = f === Ds && t.offsetHeight ? t.getBoundingClientRect().height / t.offsetHeight : 1;
    return o * d <= 2 * l;
  }
  function Bs(t, e) {
    let n = e.get(t);
    if (n !== void 0) return n;
    let o = O(t), r = o.transform, i = r && r !== "none" ? r.slice(r.indexOf("(") + 1, -1).split(",").map(parseFloat) : null;
    if (o.rotate && o.rotate !== "none" || i && (r.startsWith("matrix3d") ? i[1] || i[4] : i[1] || i[2])) n = Os;
    else {
      let s = t.parentElement || Bt(t);
      n = s ? Bs(s, e) : Cs, n === Cs && (o.scale && o.scale !== "none" || o.zoom && o.zoom !== "1" || i && (r.startsWith("matrix3d") ? i[0] !== 1 || i[5] !== 1 : i[0] !== 1 || i[3] !== 1)) && (n = Ds);
    }
    return e.set(t, n), n;
  }
  function zs(t) {
    let e = t.parentElement;
    if (!e) return false;
    let n = O(e).display || "";
    return n.includes("flex") || n.includes("grid");
  }
  function su(t) {
    for (let o = t.firstChild; o; o = o.nextSibling) if (o.nodeType === 3 && /\S/.test(o.nodeValue)) return true;
    let e = t.firstElementChild, n = t.lastElementChild;
    if (e && e.tagName === "BR" || n && n.tagName === "BR") return true;
    for (let o = t.firstElementChild; o; o = o.nextElementSibling) {
      let r = O(o);
      if (r.display === "none") continue;
      let i = r.position;
      if (i !== "absolute" && i !== "fixed") return true;
    }
    return false;
  }
  function au(t) {
    let e = t.getBoundingClientRect().top, n = -1 / 0, o = null;
    for (let r = t.firstChild; r; r = r.nextSibling) {
      if (r.nodeType === 3) {
        if (!/\S/.test(r.nodeValue || "")) continue;
        o = o || document.createRange(), o.selectNode(r);
        let a = o.getBoundingClientRect();
        (a.width || a.height) && (n = Math.max(n, a.bottom));
        continue;
      }
      if (r.nodeType !== 1) continue;
      let i = O(r);
      if (i.display === "none") continue;
      let s = i.position;
      s === "absolute" || s === "fixed" || i.float && i.float !== "none" || (n = Math.max(n, r.getBoundingClientRect().bottom));
    }
    return n === -1 / 0 ? NaN : n - e;
  }
  function lu(t, e, n) {
    if (Pt(t) && t.style && t.style.height) return;
    let o = t.tagName && t.tagName.toLowerCase();
    if (!o || !["div", "section", "article", "main", "aside", "header", "footer", "nav"].includes(o) || e.aspectRatio && e.aspectRatio !== "none" && e.aspectRatio !== "auto") return;
    let i = e.display || "";
    if (i.includes("flex") || i.includes("grid")) return;
    let s = e.position;
    if (s === "absolute" || s === "fixed" || s === "sticky" || e.transform !== "none" || ou(e) || zs(t)) return;
    let a = e.overflowX || e.overflow || "visible", l = e.overflowY || e.overflow || "visible";
    if (a !== "visible" || l !== "visible") return;
    let u = e.clip;
    if (u && u !== "auto" && u !== "rect(auto, auto, auto, auto)" || e.visibility === "hidden" || e.opacity === "0" || !su(t)) return;
    let c = parseFloat(e.height), f = au(t);
    Number.isFinite(c) && Number.isFinite(f) && Math.abs(c - f) > 2 || (delete n.height, delete n["block-size"]);
  }
  function oo(t) {
    let e = Se();
    return e !== Us && (Nr = /* @__PURE__ */ new WeakMap(), Us = e), Hs(t);
  }
  function Hs(t) {
    let e = Nr.get(t);
    if (e !== void 0) return e;
    let n;
    if (t.namespaceURI === "http://www.w3.org/2000/svg" && (fu.has(t.localName) ? n = false : cu.has(t.localName) && (n = true)), n === void 0) {
      let o = t.parentNode;
      n = !!(o && o.nodeType === 1) && Hs(o);
    }
    return Nr.set(t, n), n;
  }
  function js(t, e) {
    if (t?.nodeType !== 1 || e?.nodeType !== 1 || oo(t)) return;
    let n = t.getAttribute?.("style"), o = !!(n && n.includes("var("));
    if (!o && t.attributes?.length) {
      let i = t.attributes;
      for (let s = 0; s < i.length; s++) {
        let a = i[s];
        if (a && typeof a.value == "string" && !a.value.startsWith("data:") && a.value.includes("var(")) {
          o = true;
          break;
        }
      }
    }
    let r = null;
    if (o) try {
      r = getComputedStyle(t);
    } catch {
    }
    if (o) {
      let i = t.style;
      if (i && i.length) {
        let s = /* @__PURE__ */ new Set();
        for (let a = 0; a < i.length; a++) {
          let l = i[a];
          if (s.has(l)) continue;
          s.add(l);
          let u = i.getPropertyValue(l);
          if (!u || !u.includes("var(")) continue;
          let c = r && r.getPropertyValue(l);
          if (c) try {
            e.style.setProperty(l, c.trim(), i.getPropertyPriority(l));
          } catch {
          }
        }
      }
    }
    if (o && t.attributes?.length) {
      let i = t.attributes;
      for (let s = 0; s < i.length; s++) {
        let a = i[s];
        if (!a || typeof a.value != "string" || a.value.startsWith("data:") || !a.value.includes("var(")) continue;
        let l = a.name, u = r && r.getPropertyValue(l);
        if (u) try {
          e.style.setProperty(l, u.trim());
        } catch {
        }
      }
    }
  }
  function Xe(t) {
    return !!(!t || t.startsWith("data:") || t.startsWith("blob:"));
  }
  function Ye(t, e) {
    if (!t) return null;
    let n = 0;
    try {
      n = e ? e.getBoundingClientRect().width || e.width : 0;
    } catch {
    }
    n || (n = window.innerWidth || 1e3);
    let o = [];
    for (let i of t.split(",")) {
      let s = i.trim().split(/\s+/);
      if (!s[0]) continue;
      let a = s[1] || "", l = 1;
      /^\d*\.?\d+x$/i.test(a) ? l = parseFloat(a) : /^\d+w$/i.test(a) && (l = parseInt(a, 10) / n), o.push({ url: s[0], d: l });
    }
    if (!o.length) return null;
    o.sort((i, s) => i.d - s.d);
    let r = window.devicePixelRatio || 1;
    return (o.find((i) => i.d >= r) || o[o.length - 1]).url;
  }
  function Vs(t, e) {
    let n = t.currentSrc || "";
    if (n && !Xe(n)) return n;
    let o = e.querySelectorAll("source[srcset]"), r = null;
    for (let i of o) {
      let s = i.getAttribute("srcset");
      if (!s || Xe(s)) continue;
      let a = i.getAttribute("type");
      if (a && !ir.test(a.trim())) continue;
      let l = i.getAttribute("media");
      if (l) try {
        if (window.matchMedia(l).matches) return Ye(s, t);
      } catch {
      }
      r || (r = Ye(s, t));
    }
    return r;
  }
  function Gs(t) {
    let e = [t.getAttribute("data-src"), t.getAttribute("data-lazy-src"), t.getAttribute("data-original"), t.getAttribute("data-hi-res-src")];
    for (let o of e) if (o && !Xe(o)) return o;
    let n = t.getAttribute("data-srcset") || t.getAttribute("data-lazy-srcset");
    if (n) {
      let o = n.split(",")[0].trim().split(/\s+/)[0];
      if (o && !Xe(o)) return o;
    }
    return null;
  }
  function uu(t, e) {
    if (t = t.trim(), !t) return t;
    let n = e ? `[data-sd-slotted~="${e}"]` : "[data-sd-slotted]";
    return t.endsWith(":not([data-sd-slotted])") || t.endsWith(`:not(${n})`) ? t : `${t}:not(${n})`;
  }
  function hu(t, e, n = true, o) {
    return Gn(t, ",").map((r) => r.trim()).filter(Boolean).map((r) => {
      if (r.startsWith(":where(") && r.includes("data-sd") || r.startsWith("@")) return r;
      let i = r.match(du);
      if (i && pu.test(i[0])) return ":not(*)";
      let s = i ? r.slice(0, i.index).trim() : r, a = n ? uu(s, o) : s;
      return `:where(${e} ${a})${i ? i[0] : ""}`;
    }).join(", ");
  }
  function Ks(t, e, n) {
    return t ? (t = t.replace(/:host-context\(([^)]+)\)/g, (o, r) => `:where(:where(${r.trim()}) ${e})`), t = t.replace(/:host\(([^)]+)\)/g, (o, r) => `:where(${e}:is(${r.trim()}))`), t = t.replace(/:host\b/g, `:where(${e})`), t = t.replace(/::slotted\(([^)]+)\)/g, (o, r) => `:where(${e} ${r.trim()})`), t = t.replace(/(^|})(\s*)([^@}{]+){/g, (o, r, i, s) => {
      let a = hu(s, e, true, n);
      return `${r}${i}${a}{`;
    }), t) : "";
  }
  function Js(t) {
    return t.shadowScopeSeq = (t.shadowScopeSeq || 0) + 1, `s${t.shadowScopeSeq}`;
  }
  function Ce(t) {
    let e = "";
    for (let n of t) if (n.media && n.cssRules) {
      let o = false;
      try {
        o = window.matchMedia(n.conditionText || n.media.mediaText).matches;
      } catch {
      }
      o && (e += Ce(n.cssRules));
    } else if (n.constructor?.name === "CSSSupportsRule") e += `@supports ${n.conditionText}{${Ce(n.cssRules)}}`;
    else if (n.cssRules && n.cssRules.length && /@media/i.test(n.cssText)) {
      let o = n.cssText.slice(0, n.cssText.indexOf("{") + 1);
      e += o + (n.style ? n.style.cssText : "") + Ce(n.cssRules) + "}";
    } else e += n.cssText + `
`;
    return e;
  }
  function Qs(t) {
    let e = "";
    try {
      t.querySelectorAll("style").forEach((o) => {
        let r = null;
        try {
          r = o.sheet && o.sheet.cssRules;
        } catch {
        }
        e += (r ? Ce(r) : o.textContent || "") + `
`;
      });
      let n = t.adoptedStyleSheets || [];
      for (let o of n) try {
        o && o.cssRules && (e += Ce(o.cssRules));
      } catch {
      }
    } catch {
    }
    return e;
  }
  function Zs(t, e, n) {
    if (!e) return;
    let o = document.createElement("style");
    o.setAttribute("data-sd", n), o.textContent = e, t.insertBefore(o, t.firstChild || null);
  }
  function ta(t, e, n = {}) {
    try {
      let o = null, r = O(t).content;
      if (r && r.includes("url(")) {
        let u = r.match(/url\(["']?([^"')]+)["']?\)/);
        u && (o = u[1]);
      }
      let i = t.closest?.("picture"), s = t.getAttribute("src") || "", a = t.getAttribute("srcset") || "", l = o || (i ? Vs(t, i) : !a.trim() && s.startsWith("data:") ? s : t.currentSrc) || Ye(a, t) || t.src || "";
      if ((!l || Xe(l)) && n.resolvePicturePlaceholders !== false) {
        let u = Gs(t);
        u && (l = u);
      }
      if (!l) return;
      e.getAttribute("src") !== l && e.setAttribute("src", l), e.removeAttribute("srcset"), e.removeAttribute("sizes"), e.loading = "eager", e.decoding = "sync";
    } catch {
    }
  }
  function ea(t) {
    let e = /* @__PURE__ */ new Set();
    if (!t) return e;
    let n = /var\(\s*(--[A-Za-z0-9_-]+)\b/g, o;
    for (; o = n.exec(t); ) e.add(o[1]);
    return e;
  }
  function mu(t, e) {
    try {
      let o = getComputedStyle(t).getPropertyValue(e).trim();
      if (o) return o;
    } catch {
    }
    try {
      let o = getComputedStyle(document.documentElement).getPropertyValue(e).trim();
      if (o) return o;
    } catch {
    }
    return "";
  }
  function na(t, e, n) {
    let o = [];
    for (let r of e) {
      let i = mu(t, r);
      i && o.push(`${r}: ${i};`);
    }
    return o.length ? `${n}{${o.join("")}}
` : "";
  }
  function oa(t, e) {
    if (!t) return;
    let n = (o) => {
      let r = o.getAttribute("data-sd-slotted") || "";
      e ? ` ${r} `.includes(` ${e} `) || o.setAttribute("data-sd-slotted", r ? `${r} ${e}` : e) : o.setAttribute("data-sd-slotted", r);
    };
    t.nodeType === Node.ELEMENT_NODE && n(t), t.querySelectorAll?.("*").forEach(n);
  }
  async function gu(t, e = 3) {
    let n = () => {
      try {
        return t.contentDocument || t.contentWindow?.document || null;
      } catch {
        return null;
      }
    }, o = n(), r = 0;
    for (; r < e && (!o || !o.body && !o.documentElement); ) await new Promise((i) => setTimeout(i, 0)), o = n(), r++;
    return o && (o.body || o.documentElement) ? o : null;
  }
  function yu(t) {
    let e = t.getBoundingClientRect(), n = 0, o = 0, r = 0, i = 0;
    try {
      let l = getComputedStyle(t);
      n = parseFloat(l.borderLeftWidth) || 0, o = parseFloat(l.borderRightWidth) || 0, r = parseFloat(l.borderTopWidth) || 0, i = parseFloat(l.borderBottomWidth) || 0;
    } catch {
    }
    let s = Math.max(0, Math.round(e.width - (n + o))), a = Math.max(0, Math.round(e.height - (r + i)));
    return { contentWidth: s, contentHeight: a, rect: e };
  }
  function Ft(t) {
    let e = 0, n = 0;
    if (t.offsetWidth > 0 && (e = t.offsetWidth), t.offsetHeight > 0 && (n = t.offsetHeight), e === 0 || n === 0) try {
      let o = getComputedStyle(t);
      if (e === 0) {
        let r = parseFloat(o.width);
        !isNaN(r) && r > 0 && (e = r);
      }
      if (n === 0) {
        let r = parseFloat(o.height);
        !isNaN(r) && r > 0 && (n = r);
      }
    } catch {
    }
    if (e === 0 || n === 0) try {
      if (e === 0) {
        let o = parseFloat(t.getAttribute("width"));
        !isNaN(o) && o > 0 && (e = o);
      }
      if (n === 0) {
        let o = parseFloat(t.getAttribute("height"));
        !isNaN(o) && o > 0 && (n = o);
      }
    } catch {
    }
    if ((e === 0 || n === 0) && (t.naturalWidth || t.naturalHeight)) try {
      e === 0 && t.naturalWidth > 0 && (e = t.naturalWidth), n === 0 && t.naturalHeight > 0 && (n = t.naturalHeight);
    } catch {
    }
    return { width: e, height: n };
  }
  function bu(t, e, n) {
    let o = t.defaultView, r = o ? o.scrollX : 0, i = o ? o.scrollY : 0, s = t.body ? t.body.scrollLeft : 0, a = t.body ? t.body.scrollTop : 0, l = t.documentElement ? t.documentElement.scrollLeft : 0, u = t.documentElement ? t.documentElement.scrollTop : 0, c = 0, f = 0, d = 0, h = 0;
    try {
      let p = o && t.body ? o.getComputedStyle(t.body) : null;
      p && (c = (parseFloat(p.marginTop) || 0) + (parseFloat(p.paddingTop) || 0), f = (parseFloat(p.marginRight) || 0) + (parseFloat(p.paddingRight) || 0), d = (parseFloat(p.marginBottom) || 0) + (parseFloat(p.paddingBottom) || 0), h = (parseFloat(p.marginLeft) || 0) + (parseFloat(p.paddingLeft) || 0));
    } catch {
    }
    let m = `html {margin: 0 !important;padding: 0 !important;width: ${e}px !important;height: ${n}px !important;min-width: ${e}px !important;min-height: ${n}px !important;box-sizing: border-box !important;overflow: hidden !important;background-clip: border-box !important;}body {margin: 0 !important;padding: ${c}px ${f}px ${d}px ${h}px !important;width: ${e}px !important;height: ${n}px !important;min-width: ${e}px !important;min-height: ${n}px !important;box-sizing: border-box !important;overflow: hidden !important;background-clip: border-box !important;}`, g;
    try {
      let p = qs.get(t);
      p || qs.set(t, p = new o.CSSStyleSheet()), p.replaceSync(m), t.adoptedStyleSheets = [...t.adoptedStyleSheets, p], g = () => {
        t.adoptedStyleSheets = t.adoptedStyleSheets.filter((y) => y !== p);
      };
    } catch {
      let p = t.createElement("style");
      p.setAttribute("data-sd-iframe-pin", ""), tt(p), p.textContent = m, (t.head || t.documentElement).appendChild(p), g = () => p.remove();
    }
    if (ve(t.documentElement), r || i) try {
      t.body && (t.body.scrollLeft = r, t.body.scrollTop = i), t.documentElement && (t.documentElement.scrollLeft || (t.documentElement.scrollLeft = r), t.documentElement.scrollTop || (t.documentElement.scrollTop = i));
    } catch {
    }
    return () => {
      try {
        g();
      } catch {
      }
      try {
        o && typeof o.scrollTo == "function" && o.scrollTo(r, i), t.body && (t.body.scrollLeft = s, t.body.scrollTop = a), t.documentElement && (t.documentElement.scrollLeft = l, t.documentElement.scrollTop = u);
      } catch {
      }
      ve(t.documentElement);
    };
  }
  async function Lr(t, e, n) {
    let o = await gu(t, 3);
    if (!o) throw new Error("The iframe document isn't ready.");
    let { contentWidth: r, contentHeight: i, rect: s } = yu(t), a = n?.snap;
    if (!a || typeof a.toPng != "function") throw new Error("Iframes are only captured through snapdom(el).");
    let l = { ...n, scale: 1, clip: null, __pinned: true }, u = bu(o, r, i), c;
    try {
      c = await a.toPng(o.documentElement, l);
    } finally {
      u();
    }
    c.style.display = "block", c.style.width = `${r}px`, c.style.height = `${i}px`;
    let f = document.createElement("div");
    return e.nodeMap.set(f, t), xt(t, f, e, n), f.style.overflow = "hidden", f.style.display = "block", f.style.width || (f.style.width = `${Math.round(s.width)}px`), f.style.height || (f.style.height = `${Math.round(s.height)}px`), f.appendChild(c), f;
  }
  function ra(t) {
    try {
      let e = t && t.accentColor;
      if (e && e !== "auto" && e !== "none") return e;
      let n = t && t.color;
      if (n) return n;
    } catch {
    }
    return "#0a6ed1";
  }
  function ia(t) {
    let { width: e, height: n } = Ft(t), o = t.getBoundingClientRect(), r;
    try {
      r = window.getComputedStyle(t);
    } catch {
    }
    let i = r ? parseFloat(r.width) : NaN, s = r ? parseFloat(r.height) : NaN, a = Number.isFinite(i) && i > 0 ? i : e || o.width || 128, l = Number.isFinite(s) && s > 0 ? s : n || o.height || 16, u = Number.parseFloat(t.min) || 0, c = Number.isFinite(Number.parseFloat(t.max)) ? Number.parseFloat(t.max) : 100, f = Number.parseFloat(t.value), d = c - u, h = d > 0 && Number.isFinite(f) ? Math.min(1, Math.max(0, (f - u) / d)) : 0.5, m = "middle";
    try {
      r && r.verticalAlign && (m = r.verticalAlign);
    } catch {
    }
    let g = document.createElement("div");
    g.setAttribute("data-snapdom-input-replacement", "range"), g.style.cssText = `display:inline-block;width:${a}px;height:${l}px;vertical-align:${m};flex-shrink:0;line-height:0;`;
    let p = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    p.setAttribute("width", String(a)), p.setAttribute("height", String(l)), p.setAttribute("viewBox", `0 0 ${a} ${l}`), p.style.cssText = `width:${a}px;height:${l}px;overflow:visible`, g.appendChild(p);
    function y() {
      let b = ra(r), w = !!t.disabled, S = Math.max(2, Math.min(4, l)), v = (l - S) / 2, C = Math.max(10, Math.min(14, Math.max(l, 10))), M = C / 2, $2 = M + h * Math.max(0, a - C);
      p.innerHTML = "";
      let F = (x, _, P, E) => {
        let R = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        R.setAttribute("x", String(x)), R.setAttribute("y", String(v)), R.setAttribute("width", String(Math.max(0, _))), R.setAttribute("height", String(S)), R.setAttribute("rx", String(S / 2)), R.setAttribute("fill", P), E && R.setAttribute("fill-opacity", E), p.appendChild(R);
      };
      F(0, a, "#808080", "0.4"), F(0, $2, b);
      let A = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      A.setAttribute("cx", String($2)), A.setAttribute("cy", String(l / 2)), A.setAttribute("r", String(M)), A.setAttribute("fill", b), p.appendChild(A), w && p.setAttribute("opacity", "0.5"), g.style.setProperty("width", `${a}px`, "important"), g.style.setProperty("height", `${l}px`, "important"), g.style.setProperty("min-width", `${a}px`, "important"), g.style.setProperty("min-height", `${l}px`, "important");
    }
    return y(), { el: g, applyVisual: y };
  }
  function sa(t) {
    let { width: e, height: n } = Ft(t), o = t.getBoundingClientRect(), r;
    try {
      r = window.getComputedStyle(t);
    } catch {
    }
    let i = r ? parseFloat(r.width) : NaN, s = r ? parseFloat(r.height) : NaN, a = Math.round(e || o.width || 0), l = Math.round(n || o.height || 0), u = Number.isFinite(i) && i > 0 ? Math.round(i) : Math.max(12, a || 16), c = Number.isFinite(s) && s > 0 ? Math.round(s) : Math.max(12, l || 16), f = (t.type || "text").toLowerCase() === "checkbox", d = !!t.checked, h = !!t.indeterminate, g = Math.max(Math.min(u, c), 12), p = Math.max(u, g), y = Math.max(c, g), b = "middle";
    try {
      r && r.verticalAlign && (b = r.verticalAlign);
    } catch {
    }
    let w = document.createElement("div");
    w.setAttribute("data-snapdom-input-replacement", t.type || "checkbox"), w.style.cssText = `display:inline-block;width:${p}px;height:${y}px;vertical-align:${b};flex-shrink:0;line-height:0;`;
    let S = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    S.setAttribute("width", String(p)), S.setAttribute("height", String(y)), S.setAttribute("viewBox", `0 0 ${g} ${g}`), S.style.cssText = `width:${p}px;height:${y}px`, w.appendChild(S);
    function v() {
      let C = ra(r), M = 2, $2 = M / 2, F = g - M;
      if (S.innerHTML = "", f) {
        let A = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        if (A.setAttribute("x", String($2)), A.setAttribute("y", String($2)), A.setAttribute("width", String(F)), A.setAttribute("height", String(F)), A.setAttribute("rx", "2"), A.setAttribute("ry", "2"), A.setAttribute("fill", d ? C : "none"), A.setAttribute("stroke", C), A.setAttribute("stroke-width", String(M)), S.appendChild(A), d) {
          let x = document.createElementNS("http://www.w3.org/2000/svg", "path");
          x.setAttribute("d", `M ${$2 + 2} ${g / 2} L ${g / 2 - 1} ${g - $2 - 2} L ${g - $2 - 2} ${$2 + 2}`), x.setAttribute("stroke", "white"), x.setAttribute("stroke-width", String(Math.max(1.5, M))), x.setAttribute("fill", "none"), x.setAttribute("stroke-linecap", "round"), x.setAttribute("stroke-linejoin", "round"), S.appendChild(x);
        } else if (h) {
          let x = document.createElementNS("http://www.w3.org/2000/svg", "rect"), _ = Math.max(6, F - 4);
          x.setAttribute("x", String((g - _) / 2)), x.setAttribute("y", String((g - M) / 2)), x.setAttribute("width", String(_)), x.setAttribute("height", String(M)), x.setAttribute("fill", C), x.setAttribute("rx", "1"), S.appendChild(x);
        }
      } else {
        let A = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        if (A.setAttribute("cx", String(g / 2)), A.setAttribute("cy", String(g / 2)), A.setAttribute("r", String((g - M) / 2)), A.setAttribute("fill", d ? C : "none"), A.setAttribute("stroke", C), A.setAttribute("stroke-width", String(M)), S.appendChild(A), d) {
          let x = document.createElementNS("http://www.w3.org/2000/svg", "circle"), _ = Math.max(2, (g - M * 2) * 0.35);
          x.setAttribute("cx", String(g / 2)), x.setAttribute("cy", String(g / 2)), x.setAttribute("r", String(_)), x.setAttribute("fill", "white"), S.appendChild(x);
        }
      }
      w.style.setProperty("width", `${p}px`, "important"), w.style.setProperty("height", `${y}px`, "important"), w.style.setProperty("min-width", `${p}px`, "important"), w.style.setProperty("min-height", `${y}px`, "important");
    }
    return v(), { el: w, applyVisual: v };
  }
  async function wu(t) {
    if (j.resource?.has(t)) return j.resource.get(t);
    if (An.has(t)) return An.get(t);
    let e = (async () => {
      let n = await ut(t, { as: "dataURL" });
      if (!n.ok || typeof n.data != "string") throw new Error(`Couldn't read ${t}`);
      return j.resource?.set(t, n.data), n.data;
    })();
    An.set(t, e);
    try {
      let n = await e;
      return An.set(t, n), n;
    } catch (n) {
      throw An.delete(t), n;
    }
  }
  function ro(t) {
    return typeof t == "string" && t.startsWith("blob:");
  }
  function xu(t) {
    return (t || "").split(",").map((e) => e.trim()).filter(Boolean).map((e) => {
      let n = e.match(/^(\S+)(\s+.+)?$/);
      return n ? { url: n[1], desc: n[2] || "" } : null;
    }).filter(Boolean);
  }
  function Su(t) {
    return t.map((e) => e.desc ? `${e.url} ${e.desc.trim()}` : e.url).join(", ");
  }
  function _n(t, e) {
    let n = t.querySelectorAll ? Array.from(t.querySelectorAll(e)) : [];
    return t.matches?.(e) && n.unshift(t), n;
  }
  async function io(t, e = null) {
    if (!t) return;
    let n = e, o = /* @__PURE__ */ new Set(), r = [], i = /* @__PURE__ */ new Map(), s = (g, p, y, b) => {
      o.add(y), r.push(() => {
        i.has(y) && (g.setAttribute(p, i.get(y)), b?.());
      });
    }, a = (g, p) => {
      if (!g || !g.includes("blob:")) return;
      let y = g.match(Xs) || [];
      if (y.length) {
        for (let b of y) o.add(b);
        r.push(() => {
          let b = g.replace(Xs, (w) => i.get(w) || w);
          b !== g && p(b);
        });
      }
    }, l = _n(t, "img");
    for (let g of l) try {
      let y = g.getAttribute("src") || g.currentSrc || "";
      ro(y) && s(g, "src", y);
      let b = g.getAttribute("srcset");
      if (b && b.includes("blob:")) {
        let w = xu(b);
        for (let S of w) ro(S.url) && o.add(S.url);
        r.push(() => {
          let S = false;
          for (let v of w) i.has(v.url) && (v.url = i.get(v.url), S = true);
          S && g.setAttribute("srcset", Su(w));
        });
      }
    } catch (p) {
      D(n, "Couldn't inline a blob: image.", p);
    }
    let u = _n(t, "image");
    for (let g of u) try {
      let p = "http://www.w3.org/1999/xlink", y = g.getAttribute("href") || g.getAttributeNS?.(p, "href");
      ro(y) && s(g, "href", y, () => g.removeAttributeNS?.(p, "href"));
    } catch (p) {
      D(n, "Couldn't inline a blob: SVG image.", p);
    }
    let c = _n(t, "[style*='blob:']");
    for (let g of c) try {
      let p = g.getAttribute("style");
      a(p, (y) => g.setAttribute("style", y));
    } catch (p) {
      D(n, "Couldn't inline blob: URLs in a style attribute.", p);
    }
    let f = _n(t, "style");
    for (let g of f) try {
      let p = g.textContent || "";
      a(p, (y) => {
        g.textContent = y;
      });
    } catch (p) {
      D(n, "Couldn't inline blob: URLs in a <style>.", p);
    }
    let d = ["poster"];
    for (let g of d) {
      let p = _n(t, `[${g}^='blob:']`);
      for (let y of p) try {
        let b = y.getAttribute(g);
        ro(b) && s(y, g, b);
      } catch (b) {
        D(n, `Couldn't inline the blob: URL in ${g}.`, b);
      }
    }
    if (!o.size) return;
    let h = [...o], m = 0;
    await Promise.all(Array.from({ length: Math.min(4, h.length) }, async () => {
      for (; m < h.length; ) {
        let g = h[m++];
        try {
          i.set(g, await wu(g));
        } catch (p) {
          D(n, "Couldn't read a blob: URL; kept it as is.", p);
        }
      }
    }));
    for (let g of r) try {
      g();
    } catch (p) {
      D(n, "Couldn't write an inlined blob: URL.", p);
    }
  }
  function aa(t, e = document) {
    let n = e.defaultView || window;
    if (!_t() || !e.body || !(n.visualViewport?.scale < 1 || n.screen.width < e.documentElement.clientWidth)) return;
    let o = tt(e.createElement("div"));
    o.style.cssText = "position:absolute;left:0;top:0;width:0;height:0;overflow:hidden;visibility:hidden";
    let r = [];
    for (let [i, s] of t) {
      if (i.nodeType !== 1 || s.nodeType !== 1) continue;
      let a = n.getComputedStyle(s), l = s.localName === "textarea" || s.localName === "input" && Cu.has(s.type) ? Au(s, a, e) : Mu(s, a.textAlign === "justify" || a.textAlignLast === "justify");
      if (!l) continue;
      let u = s.getBoundingClientRect(), c = s.offsetWidth && u.width ? u.width / s.offsetWidth : 1, f = e.createElement("span");
      f.style.whiteSpace = "pre";
      for (let d of vu) f.style.setProperty(d, a.getPropertyValue(d));
      f.textContent = l.word, o.appendChild(f), r.push({ clone: i, cs: a, span: f, live: l.distance / c, centers: l.centers, height: l.height });
    }
    if (r.length) {
      e.body.appendChild(o);
      try {
        for (let { clone: i, cs: s, span: a, live: l, centers: u, height: c } of r) {
          let f = a.firstChild, d = (parseFloat(s.letterSpacing) || 0) * (u ? f.length - 1 : f.length), h = c ? e.createRange() : null;
          h && h.selectNodeContents(a);
          let m = c ? h.getBoundingClientRect().height : u ? Math.abs(Ys(f, f.length - 1) - Ys(f, 0)) : a.getBoundingClientRect().width, g = (l - (c ? 0 : d)) / (m - (c ? 0 : d));
          if (g > 1.005 && Number.isFinite(g)) {
            if (c) {
              let p = [];
              for (let y of [false, true]) {
                let b = parseFloat(s.fontSize), w = b * (g + 1);
                for (let S = 0; S < 10; S++) {
                  let v = (b + w) / 2;
                  a.style.fontSize = `${v}px`;
                  let C = h.getBoundingClientRect().height;
                  (y ? C > l : C >= l) ? w = v : b = v;
                }
                p.push((b + w) / 2);
              }
              g = (p[0] + p[1]) / 2 / parseFloat(s.fontSize);
            }
            i.style.setProperty("font-size", `${parseFloat(s.fontSize) * g}px`), s.lineHeight !== "normal" && i.style.setProperty("line-height", `${parseFloat(s.lineHeight) * g}px`);
          }
        }
      } finally {
        o.remove();
      }
    }
  }
  function Ys(t, e) {
    let n = t.ownerDocument.createRange();
    n.setStart(t, e), n.setEnd(t, e + 1);
    let o = n.getBoundingClientRect();
    return o.left + o.width / 2;
  }
  function Mu(t, e = false) {
    for (let n = t.firstChild; n; n = n.nextSibling) {
      if (n.nodeType !== 3) continue;
      let o = /\S+/.exec(n.data);
      if (!o) continue;
      let r = t.ownerDocument.createRange();
      r.setStart(n, o.index), r.setEnd(n, o.index + o[0].length);
      let i = r.getClientRects();
      return i.length === 1 ? { word: o[0], distance: e ? i[0].height : i[0].width, centers: false, height: e } : null;
    }
    return null;
  }
  function Au(t, e, n) {
    let o = ku.exec(t.value.split(`
`)[0]);
    if (!o || t.scrollLeft || t.scrollTop || !n.caretPositionFromPoint) return null;
    let r = t.getBoundingClientRect(), i = t.localName === "textarea" ? r.top + (parseFloat(e.borderTopWidth) || 0) + (parseFloat(e.paddingTop) || 0) + 3 : r.top + r.height / 2, s = (c) => {
      let f = n.caretPositionFromPoint(c, i);
      return f && f.offsetNode === t ? f.offset : -1;
    }, a = r.width / 16, l = (c) => {
      let f = r.left;
      for (; f <= r.right && s(f) < c; ) f += a;
      if (f > r.right) return NaN;
      let d = f - a;
      for (let h = 0; h < 16; h++) {
        let m = (d + f) / 2;
        s(m) >= c ? f = m : d = m;
      }
      return f;
    }, u = Math.abs(l(o.index + o[0].length) - l(o.index + 1));
    return Number.isFinite(u) ? { word: o[0], distance: u, centers: true } : null;
  }
  function ca(t) {
    let n = (t.ownerDocument || document).getSelection?.();
    if (!n || n.isCollapsed || n.rangeCount === 0) return null;
    let o = [];
    for (let r = 0; r < n.rangeCount; r += 1) {
      let i = n.getRangeAt(r);
      if (!i.collapsed) try {
        i.intersectsNode(t) && o.push(i);
      } catch {
      }
    }
    return o.length ? { ranges: o, styles: /* @__PURE__ */ new Map() } : null;
  }
  function _u(t, e) {
    if (e.styles.has(t)) return e.styles.get(t);
    let n;
    try {
      let o = getComputedStyle(t);
      if (o.userSelect === "none" || o.webkitUserSelect === "none" || o.getPropertyValue("-webkit-user-select") === "none") return e.styles.set(t, null), null;
      let r = getComputedStyle(t, "::selection"), i = [], s = r.backgroundColor, a = s && !la.has(s) && s !== o.backgroundColor;
      i.push(`background-color:${a ? s : Ir}`), r.color && r.color !== o.color && i.push(`color:${r.color}`, `-webkit-text-fill-color:${r.color}`), r.textShadow && r.textShadow !== o.textShadow && i.push(`text-shadow:${r.textShadow}`), r.textDecorationLine && r.textDecorationLine !== "none" && r.textDecorationLine !== o.textDecorationLine && i.push(`text-decoration:${r.textDecorationLine} ${r.textDecorationStyle || "solid"} ${r.textDecorationColor || "currentcolor"}`), n = i.join(";");
    } catch {
      n = `background-color:${Ir}`;
    }
    return e.styles.set(t, n), n;
  }
  function fa(t, e) {
    let n = t.data;
    if (!n) return null;
    let o = t.parentElement;
    if (!o) return null;
    let r = [];
    for (let u of e.ranges) {
      let c = false;
      try {
        c = u.intersectsNode(t);
      } catch {
      }
      if (!c) continue;
      let f = u.startContainer === t ? u.startOffset : 0, d = u.endContainer === t ? u.endOffset : n.length;
      d > f && r.push([f, d]);
    }
    if (r.length === 0) return null;
    let i = _u(o, e);
    if (!i) return null;
    r.sort((u, c) => u[0] - c[0]);
    let s = t.ownerDocument || document, a = s.createDocumentFragment(), l = 0;
    for (let [u, c] of r) {
      u > l && a.append(s.createTextNode(n.slice(l, u)));
      let f = s.createElement("span");
      f.setAttribute("data-snapdom-selection", ""), f.setAttribute("style", `all:unset;${i}`), f.textContent = n.slice(u, c), a.append(f), l = c;
    }
    return l < n.length && a.append(s.createTextNode(n.slice(l))), a;
  }
  function Ru(t, e) {
    try {
      let o = getComputedStyle(t, "::selection").backgroundColor;
      if (o && !la.has(o) && o !== e.backgroundColor) return o;
    } catch {
    }
    return Ir;
  }
  function ua(t, e) {
    let n = t.ownerDocument || document;
    if (n.activeElement !== t) return;
    let o = null, r = null;
    try {
      o = t.selectionStart, r = t.selectionEnd;
    } catch {
      return;
    }
    if (o == null || r == null || o === r) return;
    let i = t.value || "";
    if (t.localName === "input" && t.type === "password" && (i = "\u2022".repeat(i.length)), !i) return;
    let s = getComputedStyle(t), a = t.localName === "textarea", l = so(s.paddingLeft), u = so(s.paddingTop), c = t.clientWidth - l - so(s.paddingRight), f = t.clientHeight - u - so(s.paddingBottom), d = n.createElement("div");
    d.style.cssText = "position:absolute;top:0;left:-99999px;visibility:hidden;margin:0;border:0;padding:0;box-sizing:content-box;";
    for (let p of Eu) d.style.setProperty(p, s.getPropertyValue(p));
    a ? (d.style.whiteSpace = "pre-wrap", d.style.overflowWrap = "break-word", d.style.width = `${Math.max(0, c)}px`) : d.style.whiteSpace = "pre";
    let h = n.createElement("span");
    h.textContent = i.slice(o, r), d.append(n.createTextNode(i.slice(0, o)), h, n.createTextNode(i.slice(r))), n.body.appendChild(d);
    let m = [];
    try {
      let p = d.getBoundingClientRect(), y = -t.scrollLeft, b = -t.scrollTop;
      if (!a) {
        b += Math.max(0, (f - p.height) / 2);
        let w = s.direction === "rtl", S = s.textAlign;
        S === "start" ? S = w ? "right" : "left" : S === "end" && (S = w ? "left" : "right");
        let v = c - p.width;
        v > 0 && (S === "right" ? y += v : S === "center" && (y += v / 2));
      }
      for (let w of h.getClientRects()) w.width <= 0 || w.height <= 0 || m.push({ x: l + (w.left - p.left) + y, y: u + (w.top - p.top) + b, width: w.width, height: w.height });
    } finally {
      d.remove();
    }
    if (m.length === 0) return;
    let g = Ru(t, s);
    e.__snapdomFieldSelection = { images: m.map(() => `linear-gradient(${g},${g})`), positions: m.map((p) => `${p.x}px ${p.y}px`), sizes: m.map((p) => `${p.width}px ${p.height}px`), repeats: m.map(() => "no-repeat"), origins: m.map(() => "padding-box"), clips: m.map(() => "padding-box"), base: { image: s.backgroundImage, position: s.backgroundPosition, size: s.backgroundSize, repeat: s.backgroundRepeat, origin: s.backgroundOrigin, clip: s.backgroundClip } };
  }
  function da(t) {
    for (let e of t.keys()) {
      let n = e.__snapdomFieldSelection;
      if (!n) continue;
      delete e.__snapdomFieldSelection;
      let { images: o, positions: r, sizes: i, repeats: s, origins: a, clips: l, base: u } = n, c = e.style.backgroundImage || u.image;
      c && c !== "none" ? (o.push(c), r.push(e.style.backgroundPosition || u.position), i.push(e.style.backgroundSize || u.size), s.push(e.style.backgroundRepeat || u.repeat), a.push(e.style.backgroundOrigin || u.origin), l.push(e.style.backgroundClip || u.clip)) : (o.push("linear-gradient(transparent,transparent)"), r.push("0% 0%"), i.push("auto"), s.push("repeat"), a.push(u.origin || "padding-box"), l.push(u.clip || "border-box")), e.style.backgroundImage = o.join(","), e.style.backgroundPosition = r.join(","), e.style.backgroundSize = i.join(","), e.style.backgroundRepeat = s.join(","), e.style.backgroundOrigin = a.join(","), e.style.backgroundClip = l.join(",");
    }
  }
  function Nu(t) {
    let e = t.localName, n = $u[e];
    if (!n) return null;
    let o = Fs(t);
    if (o && (o.size === 0 || !$s(t))) return null;
    let r = o ? ha.get(o) : Pu;
    r || ha.set(o, r = /* @__PURE__ */ new Map());
    let i = r.get(e);
    return i || (i = [...n, ...Fu].filter((s) => !o || o.has(s)), r.set(e, i)), i.length ? i : null;
  }
  function Lu(t, e) {
    let n = t.trim();
    if (!ma.test(n) || !ma.test(e)) return false;
    let o = parseFloat(n), r = parseFloat(e);
    return Math.abs(o - r) <= 1e-4 * Math.max(1, Math.abs(o));
  }
  function Iu(t) {
    let e = t.transform?.baseVal;
    if (!e?.numberOfItems) return null;
    let n = new DOMMatrix();
    for (let o = 0; o < e.numberOfItems; o++) {
      let r = e.getItem(o).matrix;
      n = n.multiply(new DOMMatrix([r.a, r.b, r.c, r.d, r.e, r.f]));
    }
    return n;
  }
  function Wu(t, e) {
    let n = Iu(t), o = e === "none" ? [1, 0, 0, 1, 0, 0] : e.startsWith("matrix(") ? e.slice(7, -1).split(",").map(Number) : null;
    if (!o || o.length !== 6) return false;
    if (!n) return o.join() === "1,0,0,1,0,0";
    let r = [n.a, n.b, n.c, n.d, n.e, n.f];
    for (let i = 0; i < 6; i++) if (Math.abs(r[i] - o[i]) > 1e-4 * Math.max(1, Math.abs(r[i]))) return false;
    return true;
  }
  function Ou(t, e, n, o) {
    let r = false;
    for (let i of o) {
      if (!r && (i === "transform-origin" || i === "transform-box") && !t.hasAttribute("transform")) continue;
      let s = n.getPropertyValue(i);
      if (!s) continue;
      pa.has(i) && s !== "none" && (r = true);
      let a = pa.has(i) && i !== "transform" ? null : t.getAttribute(i);
      if (a != null) {
        if (s === a || s === a + "px" || i === "d" || i === "transform" && (s === "none" || Wu(t, s)) || Lu(a, s)) continue;
      } else if (s === Tu[i]) continue;
      e.style.setProperty(i, s);
    }
  }
  function Ke(t, e) {
    Wr.set(String(t).toUpperCase(), e);
  }
  function ao(t) {
    let e = O(t), n = e.display;
    if (n === "none") return null;
    let o = /^(block|inline-block|flow-root|flex|inline-flex|grid|inline-grid|list-item)$/.test(n), r = (h) => parseFloat(h) || 0, i = (h, m, g, p, y) => {
      if (!o || !h?.endsWith("px")) return null;
      let b = parseFloat(h);
      if (!Number.isFinite(b) || b < 0) return null;
      if (e.boxSizing === "border-box") return b;
      let w = p - y - g;
      return b + m + g + (w > 0 && b + m < y + w / 2 ? w : 0);
    }, [s, a, l, u] = /scroll|auto/.test(e.overflow) ? [t.offsetWidth, t.clientWidth, t.offsetHeight, t.clientHeight] : [0, 0, 0, 0], c = i(e.width, r(e.paddingLeft) + r(e.paddingRight), r(e.borderLeftWidth) + r(e.borderRightWidth), s, a), f = i(e.height, r(e.paddingTop) + r(e.paddingBottom), r(e.borderTopWidth) + r(e.borderBottomWidth), l, u);
    if (c === null || f === null) {
      let { width: h, height: m } = Ft(t), g = h, p = m;
      if (c === null && !g || f === null && !p) {
        let y = t.getBoundingClientRect();
        g || (g = y.width || 0), p || (p = y.height || 0);
      }
      c ?? (c = g), f ?? (f = p);
    }
    let d = document.createElement("div");
    return d.style.cssText = `display:${n === "inline" ? "inline-block" : n};box-sizing:border-box;width:${c}px;height:${f}px;visibility:hidden;`, d;
  }
  function En(t) {
    let e = 0;
    for (let n of t.matchAll(/-?[\d.]+px/g)) e += Math.abs(parseFloat(n[0]));
    return e;
  }
  function xa(t) {
    let e = t.filter;
    return !e || e === "none" ? 0 : e.includes("url(") ? lo : 3 * En(e);
  }
  function Sa(t, e) {
    if (!t) return 0;
    let n = e.filterReach || (e.filterReach = /* @__PURE__ */ new WeakMap()), o = n.get(t);
    return o === void 0 && (o = xa(O(t)) + (t === e.root ? 0 : Sa(t.parentElement, e)), n.set(t, o)), o;
  }
  function ya(t, e, n) {
    try {
      if (!e || !t.matches(e)) return false;
    } catch {
      return true;
    }
    let o = O(t, n).content;
    return !!o && o !== "none" && o !== "normal";
  }
  function zu(t, e, n) {
    let { before: o, after: r } = fe(t);
    if (o === null || r === null || ya(t, o, "::before") || ya(t, r, "::after") || e.borderImageSource && e.borderImageSource !== "none" || e.webkitBoxReflect && e.webkitBoxReflect !== "none") return lo;
    let i = parseFloat(e.fontSize) || 16, s = e.outlineStyle === "none" ? 0 : En(e.outlineWidth) + En(e.outlineOffset);
    return Math.max(i * (e.display === "list-item" ? 3 : 1), s, En(e.boxShadow), En(e.textShadow), xa(e)) + Sa(t.parentElement, n);
  }
  function ba(t, e, n, o) {
    let r = o.rect, i = Math.max(r.left - n.right, n.left - r.right, r.top - n.bottom, n.top - r.bottom);
    if (i <= 0) return true;
    if (i > lo) return false;
    let s = o.inkReach || (o.inkReach = /* @__PURE__ */ new WeakMap()), a = s.get(t);
    return a === void 0 && s.set(t, a = zu(t, e || O(t), o)), i <= a;
  }
  function Uu(t, e) {
    if (t === e.root) return false;
    let n;
    try {
      n = t.getBoundingClientRect();
    } catch {
      return false;
    }
    if (n.width === 0 && n.height === 0) return false;
    let o = O(t);
    if (o.display === "inline" && !Bu.has((t.localName || "").toLowerCase())) return false;
    let r = t.scrollWidth || 0, i = t.scrollHeight || 0, s = { left: o.direction === "rtl" ? Math.min(n.left, n.right - r) : n.left, top: n.top, right: Math.max(n.right, n.left + r), bottom: Math.max(n.bottom, n.top + i) }, a = o.writingMode || "";
    if ((a.startsWith("vertical") || a.startsWith("sideways")) && (s.top = Math.min(n.top, n.bottom - i), s.left = Math.min(s.left, n.right - r)), ba(t, o, s, e)) return false;
    let l = (t.ownerDocument || document).createTreeWalker(t, NodeFilter.SHOW_ELEMENT);
    for (; l.nextNode(); ) {
      let u = l.currentNode, c = u.getBoundingClientRect();
      if ((c.width > 0 || c.height > 0) && ba(u, null, c, e)) return false;
    }
    return true;
  }
  function Hu(t, e) {
    let n = t.cloneNode(false);
    return t.tagName === "IMG" && (n.removeAttribute("src"), n.removeAttribute("srcset"), n.removeAttribute("sizes")), e.husks || (e.husks = /* @__PURE__ */ new Map()), e.husks.set(n, t), n;
  }
  function Gu(t) {
    if (!t) return false;
    let e = O(t);
    return ju.test(e.display) && e.writingMode === "horizontal-tb" && e.columnCount === "auto" && e.columnWidth === "auto";
  }
  function wa(t) {
    if (t.localName === "summary" || t.localName === "legend") return false;
    let e = O(t);
    return Vu.test(e.display) && e.float === "none" && e.clear === "none" && (e.position === "static" || e.position === "relative") && e.counterReset === "none" && e.counterIncrement === "none" && (e.counterSet || "none") === "none";
  }
  function Or(t, e) {
    let n = O(t);
    return n.display !== "contents" && (n.position === "static" || n.position === "relative" && n.top === "0px") && (n.transform === "none" || n.transform === "matrix(1, 0, 0, 1, 0, 0)") && (n.translate || "none") === "none" && (n.rotate || "none") === "none" && (n.scale || "none") === "none" && Math.abs(e.width - t.offsetWidth) < 1 && Math.abs(e.height - t.offsetHeight) < 1;
  }
  function qu(t, e) {
    for (let n = t.nextElementSibling; n; n = n.nextElementSibling) {
      if (n === e) return true;
      if (O(n).display !== "none") return false;
    }
    return false;
  }
  function co(t, e, n) {
    let o = n < 0 ? t.previousSibling : t.nextSibling;
    for (; o; o = n < 0 ? o.previousSibling : o.nextSibling) {
      if (o.nodeType === 3 && !/^[ \t\n\r\f]*$/.test(o.data)) return null;
      if (o.nodeType !== 1) continue;
      let s = O(o);
      if (!(s.display === "none" || s.position === "absolute" || s.position === "fixed" || s.float !== "none")) {
        if (s.display.startsWith("inline")) return null;
        break;
      }
    }
    if (!o) return null;
    let r = o.getBoundingClientRect();
    if (!Or(o, r)) return null;
    let i = n < 0 ? e.top - r.bottom : r.top - e.bottom;
    return i >= 0 ? i : null;
  }
  function Xu(t, e, n, o) {
    let r = [...t.childNodes];
    for (let i = 0; i < r.length; i++) {
      let s = e.get(r[i]);
      if (!s || !Gu(s.parentElement) || !wa(s)) continue;
      let a = [r[i]], l = i, u = s;
      for (let d = i + 1; d < r.length; d++) {
        let h = e.get(r[d]);
        if (h) {
          if (!wa(h) || !qu(u, h)) break;
          a.push(r[d]), u = h, l = d;
        } else if (r[d].nodeType !== 8 && (r[d].nodeType !== 3 || !/^[ \t\n\r\f]*$/.test(r[d].data))) break;
      }
      if (a.length < 2) continue;
      let c = s.getBoundingClientRect(), f = u.getBoundingClientRect();
      if (Or(s, c) && Or(u, f)) {
        let d = 0;
        for (let p of a) {
          let y = e.get(p), b = O(y);
          d = Math.max(d, y.offsetWidth + (parseFloat(b.marginLeft) || 0) + (parseFloat(b.marginRight) || 0)), e.delete(p);
        }
        o.set(s, a[0]).set(u, a[0]);
        let h = f.bottom - c.top, m = co(s, c, -1) ?? (parseFloat(O(s).marginTop) || 0), g = co(u, f, 1) ?? (parseFloat(O(u).marginBottom) || 0);
        a[0].style.cssText = `display:block;position:static;float:none;box-sizing:border-box;padding:0;border:0;width:${d}px;min-width:${d}px;max-width:${d}px;height:${h}px;min-height:${h}px;max-height:${h}px;margin:${m}px 0 ${g}px;overflow:visible;contain:none;clear:none;visibility:hidden`;
        for (let p = 1; p < a.length; p++) n ? a[p].style.cssText = "display:none!important" : a[p].remove();
        for (let p = i + 1; p < l; p++) r[p].nodeType !== 1 && r[p].remove();
      }
      i = l;
    }
  }
  function va(t, e, n) {
    let o = e.clip?.husks;
    if (!o) return null;
    let r = !!t?.querySelector?.("style"), i = /* @__PURE__ */ new Map(), s = /* @__PURE__ */ new Set();
    for (let a of o.keys()) a.parentNode && s.add(a.parentNode);
    for (let a of s) Xu(a, o, r, i);
    for (let [a, l] of o) Ku(a, l, e, n), i.set(l, a);
    return o.clear(), i;
  }
  function Ku(t, e, n, o) {
    let r = O(e);
    if (!Nt(e) && e.localName !== "legend" && Yu.test(r.display) && r.float === "none" && r.clear === "none" && r.position !== "absolute" && r.position !== "fixed" && r.writingMode === "horizontal-tb" && r.counterReset === "none" && r.counterIncrement === "none" && (r.counterSet || "none") === "none" && (r.anchorName || "none") === "none" && (r.zoom || "1") === "1") {
      let l = `display:${r.display};width:0;height:0;margin:${r.marginTop} ${r.marginRight} ${r.marginBottom} ${r.marginLeft};padding:0;border:0;`;
      (r.overflowX !== "visible" || r.overflowY !== "visible") && (l += `overflow:${r.overflowX} ${r.overflowY};`), r.contain !== "none" && (l += `contain:${r.contain};`), (r.columnCount !== "auto" || r.columnWidth !== "auto") && (l += `columns:${r.columnWidth} ${r.columnCount};`), r.verticalAlign !== "baseline" && (l += `vertical-align:${r.verticalAlign};`), r.order !== "0" && (l += `order:${r.order};`), r.alignSelf !== "auto" && (l += `align-self:${r.alignSelf};`), r.justifySelf !== "auto" && (l += `justify-self:${r.justifySelf};`);
      let u = `${r.gridRowStart} / ${r.gridColumnStart} / ${r.gridRowEnd} / ${r.gridColumnEnd}`;
      u !== "auto / auto / auto / auto" && (l += `grid-area:${u};`), t.style.cssText = l;
    } else xt(e, t, n, o);
    let { width: i, height: s } = Ft(e);
    i > 0 && (t.style.width = `${i}px`, t.style.minWidth = `${i}px`, t.style.maxWidth = `${i}px`), s > 0 && (t.style.height = `${s}px`, t.style.minHeight = `${s}px`, t.style.maxHeight = `${s}px`), t.style.visibility = "hidden";
    let a = e.parentElement ? O(e.parentElement).display : "";
    if (!/flex|grid|table/.test(a) && !r.display.startsWith("inline") && r.float === "none" && (r.position === "static" || r.position === "relative")) {
      let l = e.getBoundingClientRect(), u = co(e, l, -1);
      u !== null && (t.style.marginTop = `${u}px`);
      let c = co(e, l, 1);
      c !== null && (t.style.marginBottom = `${c}px`);
    }
    t.style.boxSizing = "border-box";
  }
  async function ue(t, e, n) {
    if (!t) throw new Error("[SnapDOM] The element cannot be null or undefined.");
    for (; e.slicer?.due(); ) await e.slicer.pause();
    let o = /* @__PURE__ */ new Set(), r = null, i = null;
    if (t.nodeType === Node.ELEMENT_NODE) {
      let c = (t.localName || t.tagName || "").toLowerCase(), f = Xt(t);
      if (f && (t.id === "snapdom-sandbox" || t.hasAttribute("data-snapdom-sandbox")) || t !== n.element && f || mr.has(c)) return null;
      if (c === "foreignobject" && t.parentElement?.closest?.("foreignObject")) return D(e, "Skipped a nested <foreignObject>; it can't be captured."), null;
      if (c === "source" && t.parentElement?.localName === "picture") return null;
    }
    if (t.nodeType === Node.TEXT_NODE) {
      if (e.selection) {
        let c = fa(t, e.selection);
        if (c) return c;
      }
      return t.cloneNode(true);
    }
    if (t.nodeType !== Node.ELEMENT_NODE) return t.cloneNode(true);
    if (t.getAttribute("data-capture") === "exclude") {
      if (n.excludeMode === "hide") return ao(t);
      if (n.excludeMode === "remove") return null;
    }
    if (n.exclude && Array.isArray(n.exclude)) for (let c of n.exclude) try {
      if (t.matches?.(c)) {
        if (n.excludeMode === "hide") return ao(t);
        if (n.excludeMode === "remove") return null;
      }
    } catch {
      D(n, `Invalid exclude selector "${c}"; ignored.`);
    }
    if (n.excludePredicates) for (let c of n.excludePredicates) try {
      if (c(t)) return n.excludeMode === "remove" ? null : ao(t);
    } catch (f) {
      D(n, "Your exclude function threw; the element was kept.", f);
    }
    if (typeof n.filter == "function") try {
      if (!n.filter(t)) {
        if (n.filterMode === "hide") return ao(t);
        if (n.filterMode === "remove") return null;
      }
    } catch (c) {
      D(n, "Your filter function threw; the element was kept.", c);
    }
    if (t !== n.element && !Du.has(t.localName) && !Nt(t) && O(t).display === "none") {
      let c = t.cloneNode(false);
      t.tagName === "IMG" && (c.removeAttribute("src"), c.removeAttribute("srcset")), c.style.setProperty("display", "none", "important");
      for (let f of t.querySelectorAll("style")) {
        let d = await ue(f, e, n);
        d && c.appendChild(d);
      }
      return c;
    }
    if (e.clip && Uu(t, e.clip)) return Hu(t, e.clip);
    if (n.__resolveNodeHooks) for (let c of n.__resolveNodeHooks) {
      let f;
      try {
        f = await c(t, n);
      } catch (d) {
        D(e, "A plugin's resolveNode hook threw; ignored it.", d);
      }
      if (f === null) return null;
      if (f?.nodeType) return f.nodeType === Node.ELEMENT_NODE && (e.nodeMap.set(f, t), xt(t, f, e, n)), f;
    }
    {
      let c = ga.has(t.tagName) && Wr.get(t.tagName);
      if (c) {
        let f = await c(t, e, n);
        if (f !== void 0) return f;
      }
    }
    if (t.getAttribute("data-capture") === "placeholder") {
      let c = t.cloneNode(false);
      e.nodeMap.set(c, t), xt(t, c, e, n);
      let f = document.createElement("div");
      return f.textContent = t.getAttribute("data-placeholder-text") || "", f.style.cssText = "color:#666;font-size:12px;text-align:center;line-height:1.4;padding:0.5em;box-sizing:border-box;", c.appendChild(f), c;
    }
    {
      let c = !ga.has(t.tagName) && Wr.get(t.tagName);
      if (c) {
        let f = await c(t, e, n);
        if (f !== void 0) return f;
      }
    }
    let s;
    try {
      if (s = t.cloneNode(false), js(t, s), e.nodeMap.set(s, t), t.tagName === "IMG") {
        ta(t, s, n);
        try {
          let c = window.getComputedStyle(t), f = parseFloat(c.width), d = parseFloat(c.height);
          if (!(f > 0) || !(d > 0)) {
            let g = Ft(t), p = (b) => parseFloat(c.getPropertyValue(b)) || 0, y = c.getPropertyValue("box-sizing") === "border-box";
            f > 0 || (f = g.width - (y ? 0 : p("padding-left") + p("padding-right") + p("border-left-width") + p("border-right-width"))), d > 0 || (d = g.height - (y ? 0 : p("padding-top") + p("padding-bottom") + p("border-top-width") + p("border-bottom-width")));
          }
          let h = Math.round((f || 0) * 1e3) / 1e3, m = Math.round((d || 0) * 1e3) / 1e3;
          h && (s.dataset.snapdomWidth = String(h)), m && (s.dataset.snapdomHeight = String(m));
        } catch (c) {
          D(e, "Couldn't measure an image; kept its own size.", c);
        }
        try {
          let c = t.getAttribute("style") || "", f = window.getComputedStyle(t), d = (w) => {
            let S = c.match(new RegExp(`${w}\\s*:\\s*([^;]+)`, "i")), v = S ? S[1].trim() : f.getPropertyValue(w);
            return /%|auto/i.test(String(v || ""));
          }, h = parseFloat(s.dataset.snapdomWidth || "0") || 0, m = parseFloat(s.dataset.snapdomHeight || "0") || 0, g = d("width") || !(h > 0), p = d("height") || !(m > 0);
          g && h > 0 && (s.style.width = `${h}px`), p && m > 0 && (s.style.height = `${m}px`);
          let y = f.getPropertyValue("object-fit"), b = f.getPropertyValue("object-position");
          y && y !== "fill" ? (s.style.objectFit = y, b && (s.style.objectPosition = b)) : (h > 0 && (s.style.minWidth = `${h}px`), m > 0 && (s.style.minHeight = `${m}px`));
        } catch (c) {
          D(e, "Couldn't fix the size of an image.", c);
        }
      }
    } catch (c) {
      throw D(n, "Couldn't copy this element:", [t, c]), c;
    }
    let a = null;
    if (ft(t, "textarea")) {
      let { width: c, height: f } = Ft(t), d = c || t.getBoundingClientRect().width || 0, h = f || t.getBoundingClientRect().height || 0;
      d && (s.style.width = `${d}px`), h && (s.style.height = `${h}px`), (d || h) && (s.style.boxSizing = "border-box");
    }
    if (ft(t, "input")) {
      let c = (t.type || "text").toLowerCase();
      if ((c === "checkbox" || c === "radio") && (_t() || t.indeterminate)) {
        let { el: d, applyVisual: h } = sa(t);
        e.nodeMap.set(d, t), a = h, s = d;
      } else if (c === "range" && (_t() || Y())) {
        let { el: d, applyVisual: h } = ia(t);
        e.nodeMap.set(d, t), a = h, s = d;
      } else if (c === "color" && Y()) {
        let d = s, h = t.value || "#000000";
        a = () => {
          d.style.setProperty("background-color", h, "important"), d.style.setProperty("color", "transparent", "important"), d.style.setProperty("-webkit-text-fill-color", "transparent", "important"), d.style.setProperty("appearance", "none", "important"), d.style.setProperty("-webkit-appearance", "none", "important");
        }, d.removeAttribute("value");
      } else if ((c === "date" || c === "time" || c === "datetime-local") && (_t() || Y())) {
        s.setAttribute("type", "text");
        let d = t.value;
        c === "date" && t.valueAsDate && (d = t.valueAsDate.toLocaleDateString(void 0, { timeZone: "UTC" })), s.value = d, s.setAttribute("value", d);
      } else {
        let d = mn(t) ? lr(t.value) : t.value;
        s.value = d, s.setAttribute("value", d), t.checked !== void 0 && (s.checked = t.checked, t.checked ? s.setAttribute("checked", "") : s.removeAttribute("checked"), t.indeterminate && (s.indeterminate = t.indeterminate));
      }
    }
    if ((ft(t, "input") || ft(t, "textarea")) && !t.value && t.placeholder) try {
      let c = window.getComputedStyle(t, "::placeholder"), f = c && c.color;
      f && f !== "rgba(0, 0, 0, 0)" && (e.__usesPlaceholder = true, s.setAttribute("data-sd-ph", ""), s.style.setProperty("--sd-ph", f), s.style.setProperty("--sd-ph-o", c.opacity || "1"));
    } catch {
    }
    if (ft(t, "select") && (r = new Set(Array.from(t.options).filter((c) => c.selected))), ft(t, "textarea") && (i = t.value), ft(t, "input") || ft(t, "textarea") || ft(t, "select")) {
      t.disabled && s.setAttribute("disabled", ""), t.required && s.setAttribute("required", ""), t.readOnly && s.setAttribute("readonly", "");
      let c = t;
      c.min !== void 0 && c.min !== "" && s.setAttribute("min", c.min), c.max !== void 0 && c.max !== "" && s.setAttribute("max", c.max), c.pattern !== void 0 && c.pattern !== "" && s.setAttribute("pattern", c.pattern);
      let f = t.getAttribute("aria-invalid");
      f !== null && s.setAttribute("aria-invalid", f);
    }
    if (oo(t) || xt(t, s, e, n), a && a(), n.captureSelection && (ft(t, "input") || ft(t, "textarea"))) try {
      ua(t, s);
    } catch (c) {
      D(e, "Couldn't copy the selection of a text field.", c);
    }
    if (Nt(t) && !oo(t)) {
      let c = ["fill", "stroke", "stroke-width", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "opacity", "fill-opacity", "stroke-opacity", "fill-rule", "clip-rule", "marker", "marker-start", "marker-mid", "marker-end", "visibility", "display", "color"];
      try {
        let f = window.getComputedStyle(t);
        for (let h of c) {
          let m = f.getPropertyValue(h);
          m && s.style.setProperty(h, m);
        }
        t.localName === "stop" && (s.style.setProperty("stop-color", f.getPropertyValue("stop-color")), s.style.setProperty("stop-opacity", f.getPropertyValue("stop-opacity")));
        let d = Nu(t);
        d && Ou(t, s, f, d);
      } catch {
      }
    }
    if (t.shadowRoot) {
      $r(t.shadowRoot);
      try {
        let b = t.shadowRoot.querySelectorAll("slot");
        for (let w of b) {
          let S = w.assignedNodes?.() || [];
          for (let v of S) o.add(v);
        }
      } catch {
      }
      let c = Js(e), f = `[data-sd="${c}"]`;
      e.shadowScopes || (e.shadowScopes = /* @__PURE__ */ new WeakMap()), e.shadowScopes.set(t.shadowRoot, c);
      try {
        s.setAttribute("data-sd", c);
      } catch {
      }
      let d = Qs(t.shadowRoot);
      !e.__shadowPseudo && /::?(?:before|after|first-l|marker)|counter/.test(d) && (e.__shadowPseudo = true);
      let h = Ks(d, f, c), m = ea(d), g = na(t, m, f);
      Zs(s, g + h, c);
      let p = document.createDocumentFragment(), y = await Promise.all(Array.from(t.shadowRoot.childNodes).map((b) => b.nodeType === Node.ELEMENT_NODE && b.tagName === "STYLE" ? null : ue(b, e, n).catch(() => null)));
      p.append(...y.filter((b) => !!b)), s.appendChild(p);
    }
    if (t.tagName === "SLOT") {
      let c = e.shadowScopes?.get(t.getRootNode()), f = t.assignedNodes?.() || [], d = f.length ? t.assignedNodes?.({ flatten: true }) || f : [], h = d.length ? d : Array.from(t.childNodes), m = document.createDocumentFragment(), g = await Promise.all(h.map((p) => ue(p, e, n).then((y) => (y && f.length && oa(y, c), y || null)).catch(() => null)));
      return m.append(...g.filter((p) => !!p)), m;
    }
    let l = (c) => o.has(c) || t.shadowRoot && !c.assignedSlot, u = await Promise.all(Array.from(t.childNodes).map((c) => l(c) ? null : ue(c, e, n).catch(() => null)));
    if (s.append(...u.filter((c) => !!c)), r && ft(s, "select")) {
      let c = false;
      for (let f of s.options) {
        let d = r.has(e.nodeMap.get(f));
        f.selected = d, d ? f.setAttribute("selected", "") : f.removeAttribute("selected"), c || (c = d);
      }
      if (!c && !s.multiple) {
        let f = s.ownerDocument.createElement("option");
        f.hidden = true, f.style.setProperty("display", "none", "important"), f.setAttribute("selected", ""), f.value = "", s.appendChild(f);
      }
    }
    return i !== null && ft(s, "textarea") && (s.textContent = i), s;
  }
  async function Ju(t, e, n) {
    let o = false;
    try {
      o = !!(t.contentDocument || t.contentWindow?.document);
    } catch (r) {
      D(e, "Couldn't tell if an iframe is same-origin; treated it as cross-origin.", r);
    }
    if (o) try {
      return await Lr(t, e, n);
    } catch (r) {
      nt(n.__session, "iframe-failed", "same-origin iframe failed to rasterize", r), D(n, "Couldn't capture an iframe, so it was left out.", r);
    }
    if (o || (nt(n.__session, "iframe-cross-origin", `cross-origin iframe replaced by ${n.placeholders ? "a placeholder" : "a spacer"}`, t), D(n, n.placeholders ? "Can't capture a cross-origin iframe; showing a placeholder. Set placeholders: false to hide it." : "Can't capture a cross-origin iframe; left it out.", t)), n.placeholders) {
      let { width: r, height: i } = Ft(t), s = document.createElement("div");
      return s.style.cssText = `width:${r}px;height:${i}px;background-image:repeating-linear-gradient(45deg,#ddd,#ddd 5px,#f9f9f9 5px,#f9f9f9 10px);display:flex;align-items:center;justify-content:center;font-size:12px;color:#555;border:1px solid #aaa;`, xt(t, s, e, n), s;
    } else {
      let { width: r, height: i } = Ft(t), s = document.createElement("div");
      return s.style.cssText = `display:inline-block;width:${r}px;height:${i}px;visibility:hidden;`, xt(t, s, e, n), s;
    }
  }
  function Rn(t) {
    try {
      let e = Math.max(1, Math.min(32, t.width)), n = Math.max(1, Math.min(32, t.height)), o = document.createElement("canvas");
      o.width = e, o.height = n;
      let r = o.getContext("2d", { willReadFrequently: true });
      if (!r) return false;
      r.drawImage(t, 0, 0, e, n);
      let i = r.getImageData(0, 0, e, n).data;
      for (let s = 3; s < i.length; s += 4) if (i[s] !== 0) return false;
      return true;
    } catch {
      return false;
    }
  }
  function Zu(t, e, n) {
    try {
      let o = t.getImageData(0, 0, e, n).data;
      for (let r = 3; r < o.length; r += 4) if (o[r] !== 255) return false;
      return true;
    } catch {
      return false;
    }
  }
  function td(t) {
    try {
      let e = t.getContext("webgl2") || t.getContext("webgl");
      return !!e && !e.getContextAttributes()?.preserveDrawingBuffer;
    } catch {
      return false;
    }
  }
  async function ed(t, e, n) {
    let o = "";
    try {
      let a = Rn(t);
      a ? (await Ct(), a = Rn(t)) : td(t) && await Ct();
      let l = null;
      if (!a) {
        l = t.getContext("2d", { willReadFrequently: true });
        try {
          l && l.getImageData(0, 0, 1, 1);
        } catch {
        }
        Y() && await Ct();
      }
      if (o = t.toDataURL("image/png"), !o || o === "data:,") {
        try {
          l && l.getImageData(0, 0, 1, 1);
        } catch {
        }
        if (await Ct(), o = t.toDataURL("image/png"), !o || o === "data:,") {
          let u = document.createElement("canvas");
          u.width = t.width, u.height = t.height;
          let c = u.getContext("2d");
          c && (c.drawImage(t, 0, 0), o = u.toDataURL("image/png"));
        }
      }
    } catch (a) {
      nt(n?.__session, "canvas-tainted", "a canvas tainted by cross-origin images cannot be read; it renders blank", t), D(e, "Couldn't read the pixels of a canvas; used its fallback content.", a);
    }
    n && n.debug && o && Rn(t) && D(e, "Empty canvas; capture after its first frame", t);
    let r = document.createElement("img");
    try {
      r.decoding = "sync", r.loading = "eager";
    } catch (a) {
      D(e, "Couldn't set image loading hints.", a);
    }
    o && (r.src = o), r.width = t.width, r.height = t.height;
    let { width: i, height: s } = Ft(t);
    return i > 0 && (r.style.width = `${i}px`), s > 0 && (r.style.height = `${s}px`), e.nodeMap.set(r, t), xt(t, r, e, n), r;
  }
  async function nd(t, e, n) {
    let o = "", r = t.poster && t.paused && !t.currentTime && !t.played.length, i = document.createElement("img");
    try {
      i.decoding = "sync", i.loading = "eager";
    } catch {
    }
    if (!r) try {
      let l = document.createElement("canvas");
      l.width = t.videoWidth || t.offsetWidth || 320, l.height = t.videoHeight || t.offsetHeight || 240;
      let u = l.getContext("2d");
      u && (u.drawImage(t, 0, 0, l.width, l.height), o = l.toDataURL(Zu(u, l.width, l.height) ? "image/jpeg" : "image/png", Qu), (!o || o === "data:,") && (o = ""));
    } catch (l) {
      D(e, "Couldn't capture a video frame; used its poster.", l);
    }
    o ? i.src = o : t.poster && (i.src = t.poster), i.width = t.videoWidth || t.offsetWidth || 0, i.height = t.videoHeight || t.offsetHeight || 0;
    let { width: s, height: a } = Ft(t);
    return s > 0 && (i.style.width = `${s}px`), a > 0 && (i.style.height = `${a}px`), i.style.objectFit = "contain", e.nodeMap.set(i, t), xt(t, i, e, n), i;
  }
  async function od(t, e, n) {
    if (!t.controls) return;
    let { width: o, height: r } = Ft(t), i = Math.round(o || t.offsetWidth || 300), s = Math.round(r || t.offsetHeight || 54), a = s / 2, l = Math.max(4, s * 0.16), u = s * 0.34, c = i - s * 0.34, f = u + l + s * 0.55, d = Math.max(0, c - s * 0.7 - f), h = Math.max(9, Math.round(s * 0.24)), m = `<svg xmlns="http://www.w3.org/2000/svg" width="${i}" height="${s}" viewBox="0 0 ${i} ${s}"><rect width="${i}" height="${s}" rx="${Math.min(s / 2, 10)}" fill="#f1f3f4"/><path d="M ${u} ${a - l} L ${u + l} ${a} L ${u} ${a + l} Z" fill="#5f6368"/><rect x="${f}" y="${a - 1.5}" width="${d}" height="3" rx="1.5" fill="#bdc1c6"/><circle cx="${f}" cy="${a}" r="${Math.max(3, s * 0.09)}" fill="#5f6368"/><text x="${c}" y="${a}" fill="#5f6368" font-family="sans-serif" font-size="${h}" text-anchor="end" dominant-baseline="central">0:00</text></svg>`, g = document.createElement("img");
    try {
      g.decoding = "sync", g.loading = "eager";
    } catch {
    }
    return g.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(m)}`, g.width = i, g.height = s, g.style.width = `${i}px`, g.style.height = `${s}px`, e.nodeMap.set(g, t), xt(t, g, e, n), g;
  }
  async function Ca(t, e, n) {
    let o = t.getAttribute("data") || t.getAttribute("src") || "", r = (t.getAttribute("type") || "").toLowerCase(), i = /^image\//.test(r) || /\.(png|jpe?g|gif|webp|avif|bmp|ico|svg)(\?|#|$)/i.test(o);
    if (o && i) {
      let a = document.createElement("img");
      try {
        a.decoding = "sync", a.loading = "eager";
      } catch {
      }
      a.src = o;
      let { width: l, height: u } = Ft(t);
      return l > 0 && (a.style.width = `${l}px`), u > 0 && (a.style.height = `${u}px`), e.nodeMap.set(a, t), xt(t, a, e, n), a;
    }
    let s = null;
    try {
      s = t.contentDocument;
    } catch {
    }
    if (s) try {
      let a = await Lr(t, e, n);
      if (a) return a;
    } catch {
    }
    o && (nt(n.__session, "embed-fallback", `<${t.localName}> not capturable, using its fallback content: ${o}`), D(n, `Couldn't capture <${t.localName}>${r ? ` (${r})` : ""}; showing its fallback content.`));
  }
  function id(t) {
    return t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }
  function Ma(t, e) {
    let n = Array.isArray(t) ? t : t ? [t] : [], o = [];
    for (let r of n) r instanceof RegExp ? o.push(r) : typeof r == "string" ? o.push(new RegExp(id(r), "i")) : D(e, "Ignored an iconFonts entry: use a string or a RegExp.", r);
    return o;
  }
  function Ht(t, e) {
    let n = typeof t == "string" ? t : "";
    for (let o of rd) if (o.test(n)) return true;
    if (e) {
      for (let o of e) if (o instanceof RegExp && o.test(n)) return true;
    }
    return !!(/icon/i.test(n) || /glyph/i.test(n) || /symbols/i.test(n) || /feather/i.test(n) || /fontawesome/i.test(n));
  }
  function Dr(t, e) {
    if (typeof t != "string" || !t) return false;
    let n;
    try {
      n = new URL(t, typeof location < "u" ? location.href : void 0);
    } catch {
      return Ht(t, e);
    }
    let o = n.searchParams.getAll("family").flatMap((r) => r.split("|")).map((r) => r.split(":")[0].trim()).filter(Boolean);
    return o.length ? o.every((r) => Ht(r, e)) : Ht(t, e);
  }
  function sd(t = "") {
    let e = String(t).toLowerCase();
    return /\bmaterial\s*icons\b/.test(e) || /\bmaterial\s*symbols\b/.test(e);
  }
  function ad(t = "") {
    let e = /* @__PURE__ */ Object.create(null), n = String(t || ""), o = /['"]?\s*([A-Za-z]{3,4})\s*['"]?\s*([+-]?\d+(?:\.\d+)?)\s*/g, r;
    for (; r = o.exec(n); ) e[r[1].toUpperCase()] = Number(r[2]);
    return e;
  }
  async function ld(t, e, n) {
    let o = String(t || ""), r = o.toLowerCase(), i = String(e || "").toLowerCase();
    if (/\bmaterial\s*icons\b/.test(r) && !/\bsymbols\b/.test(r)) return { familyForMeasure: o, familyForCanvas: o };
    if (!/\bmaterial\s*symbols\b/.test(r)) return { familyForMeasure: o, familyForCanvas: o };
    let a = n && (n.FILL ?? n.fill), l = "outlined";
    /\brounded\b/.test(i) || /\bround\b/.test(i) ? l = "rounded" : /\bsharp\b/.test(i) ? l = "sharp" : /\boutlined\b/.test(i) && (l = "outlined");
    let u = a === 1, c = null;
    if (u && (l === "outlined" && Je.materialIconsFilled ? c = { url: Je.materialIconsFilled, alias: "snapdom-mi-filled" } : l === "rounded" && Je.materialIconsRound ? c = { url: Je.materialIconsRound, alias: "snapdom-mi-round" } : l === "sharp" && Je.materialIconsSharp && (c = { url: Je.materialIconsSharp, alias: "snapdom-mi-sharp" })), !c) return { familyForMeasure: o, familyForCanvas: o };
    if (!fo.has(c.alias)) try {
      let d = new FontFace(c.alias, `url(${c.url})`, { style: "normal", weight: "400" });
      await d.load(), document.fonts.add(d), fo.set(c.alias, true);
    } catch {
      return fo.set(c.alias, false), { familyForMeasure: o, familyForCanvas: o };
    }
    if (fo.get(c.alias) === false) return { familyForMeasure: o, familyForCanvas: o };
    let f = `"${c.alias}"`;
    return { familyForMeasure: f, familyForCanvas: f };
  }
  async function cd(t = "Material Icons", e = 24) {
    try {
      await Promise.all([document.fonts.load(`400 ${e}px "${String(t).replace(/["']/g, "")}"`), wn()]);
    } catch {
    }
  }
  function fd(t) {
    let e = t.getPropertyValue("-webkit-text-fill-color")?.trim() || "", n = /^transparent$/i.test(e) || /rgba?\(\s*0\s*,\s*0\s*,\s*0\s*,\s*0\s*\)/i.test(e);
    if (e && !n && e.toLowerCase() !== "currentcolor") return e;
    let o = t.color?.trim();
    return o && o !== "inherit" ? o : "#000";
  }
  async function ud(t, { family: e = "Material Icons", weight: n = "normal", fontSize: o = 32, color: r = "#000", variation: i = "", className: s = "" } = {}) {
    let a = String(e || "").replace(/^['"]+|['"]+$/g, ""), l = window.devicePixelRatio || 1, u = ad(i), { familyForMeasure: c, familyForCanvas: f } = await ld(a, s, u);
    await cd(f.replace(/^["']+|["']+$/g, ""), o);
    let d = document.createElement("span");
    tt(d), d.textContent = t, d.style.position = "absolute", d.style.visibility = "hidden", d.style.left = "-99999px", d.style.whiteSpace = "nowrap", d.style.fontFamily = c, d.style.fontWeight = String(n || "normal"), d.style.fontSize = `${o}px`, d.style.lineHeight = "1", d.style.margin = "0", d.style.padding = "0", d.style.fontFeatureSettings = "'liga' 1", d.style.fontVariantLigatures = "normal", d.style.color = r, document.body.appendChild(d);
    let h = d.getBoundingClientRect(), m = Math.max(1, Math.ceil(h.width)), g = Math.max(1, Math.ceil(h.height));
    document.body.removeChild(d);
    let p = document.createElement("canvas");
    p.width = m * l, p.height = g * l;
    let y = p.getContext("2d");
    y.scale(l, l), y.font = `${n ? `${n} ` : ""}${o}px ${f}`, y.textAlign = "left", y.textBaseline = "top", y.fillStyle = r;
    try {
      y.fontKerning = "normal";
    } catch {
    }
    return y.fillText(t, 0, 0), { dataUrl: p.toDataURL(), width: m, height: g };
  }
  async function uo(t, e, n = /* @__PURE__ */ new Map()) {
    if (t?.nodeType !== 1) return 0;
    let o = '.material-icons, [class*="material-symbols"]', r = Array.from(t.querySelectorAll(o)).filter((a) => a && a.textContent && a.textContent.trim());
    if (t.matches?.(o) && t.textContent && t.textContent.trim() && r.unshift(t), r.length === 0) return 0;
    let i = e?.nodeType === 1 ? Array.from(e.querySelectorAll(o)).filter((a) => a && a.textContent && a.textContent.trim()) : [];
    e?.nodeType === 1 && e.matches?.(o) && e.textContent && e.textContent.trim() && i.unshift(e);
    let s = 0;
    for (let a = 0; a < r.length; a++) {
      let l = r[a], u = n && n.get(l) || i[a] || null;
      try {
        let c = getComputedStyle(u || l), f = c.fontFamily || "Material Icons";
        if (!sd(f)) continue;
        let d = (u || l).textContent.trim();
        if (!d) continue;
        let h = parseInt(c.fontSize, 10) || 24, m = c.fontWeight && c.fontWeight !== "normal" ? c.fontWeight : "normal", g = fd(c), p = c.fontVariationSettings && c.fontVariationSettings !== "normal" ? c.fontVariationSettings : "", y = (u || l).className || "", { dataUrl: b, width: w, height: S } = await ud(d, { family: f, weight: m, fontSize: h, color: g, variation: p, className: y });
        l.textContent = "";
        let v = l.ownerDocument.createElement("img");
        v.src = b, v.alt = d, v.style.height = `${h}px`, v.style.width = `${Math.max(1, Math.round(w / S * h))}px`, v.style.objectFit = "contain", v.style.verticalAlign = getComputedStyle(l).verticalAlign || "baseline", l.appendChild(v), s++;
      } catch {
      }
    }
    return s;
  }
  function po(t, e, n, o) {
    if (!e?.size) return 0;
    let r = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), s = 0;
    for (let a of t) {
      let l = e.get(a);
      if (!l || a.nodeType !== 1 || ka.has(a.firstChild)) continue;
      let u = r.get(l);
      if (u === void 0) {
        let p = dd.exec(l)?.[1];
        r.set(l, u = !!p && Ht(p, o));
      }
      if (!u) continue;
      let c = a.dataset?.snapdomPseudo, f = c ? n.get(a.parentNode) : n.get(a);
      if (f?.nodeType !== 1) continue;
      let d = getComputedStyle(f, c || null);
      if (d.display !== "inline" && d.display !== "inline-block") continue;
      let h = `${d.fontFamily}|${d.fontSize}|${d.fontWeight}|${d.fontStyle}|${d.fontStretch}|${d.lineHeight}`, m = i.get(h);
      if (m === void 0 && i.set(h, m = hd(f.ownerDocument, d)), !m) continue;
      let g = a.ownerDocument.createElement("span");
      ka.add(g), g.style.cssText = `display:inline-block;width:0;height:${m.height}px;vertical-align:${-m.descent}px`, a.style.lineHeight = "0", a.insertBefore(g, a.firstChild), g.nextSibling === null && pd(a, f), s++;
    }
    return s;
  }
  function pd(t, e) {
    let n = getComputedStyle(e.parentElement || e).whiteSpace;
    if (n !== "normal" && n !== "nowrap" && n !== "pre-line") return;
    let o = t.previousSibling, r = t.nextSibling;
    o?.nodeType !== 3 || r?.nodeType !== 3 || /[ \t\n]$/.test(o.data) && (r.data = r.data.replace(/^[ \t\n]+/, ""));
  }
  function hd(t, e) {
    let n = t.createElement("div");
    tt(n), n.style.cssText = `position:absolute;left:-9999px;top:0;visibility:hidden;white-space:nowrap;margin:0;padding:0;border:0;font-family:${e.fontFamily};font-size:${e.fontSize};font-weight:${e.fontWeight};font-style:${e.fontStyle};font-stretch:${e.fontStretch};line-height:${e.lineHeight}`;
    let o = t.createElement("span");
    o.style.cssText = "display:inline-block;width:0;height:0;vertical-align:baseline", n.appendChild(o), (t.body || t.documentElement).appendChild(n);
    try {
      let r = n.getBoundingClientRect().height, i = o.getBoundingClientRect().top - n.getBoundingClientRect().top;
      return r > 0 ? { height: r, descent: r - i } : null;
    } finally {
      n.remove();
    }
  }
  async function Ra(t, e, n, o = 32, r = "#000", i = "normal") {
    e = e.replace(/^['"]+|['"]+$/g, "");
    let s = window.devicePixelRatio || 1;
    try {
      await wn();
    } catch {
    }
    let a = document.createElement("span");
    tt(a), a.textContent = t, a.style.position = "absolute", a.style.visibility = "hidden", a.style.fontFamily = `"${e}"`, a.style.fontWeight = n || "normal", a.style.fontStyle = i || "normal", a.style.fontSize = `${o}px`, a.style.lineHeight = "1", a.style.whiteSpace = "nowrap", a.style.padding = "0", a.style.margin = "0", document.body.appendChild(a);
    let l = a.getBoundingClientRect(), u = Math.ceil(l.width), c = Math.ceil(l.height);
    document.body.removeChild(a);
    let f = document.createElement("canvas");
    f.width = Math.max(1, u * s), f.height = Math.max(1, c * s);
    let d = f.getContext("2d");
    d.scale(s, s), d.font = `${i || "normal"} ${n || "normal"} ${o}px "${e}"`, d.textAlign = "left", d.textBaseline = "top", d.fillStyle = r, d.fillText(t, 0, 0);
    let h = d.measureText(t).actualBoundingBoxAscent;
    d.textBaseline = "alphabetic";
    let m = d.measureText(t).actualBoundingBoxAscent, g = c - (m - h);
    return { dataUrl: f.toDataURL(), width: u, height: c, advance: l.width, descent: Number.isFinite(g) ? g : 0 };
  }
  function zr(t) {
    if (!t) return "";
    for (let e of t.split(",")) {
      let n = e.trim().replace(/^['"]+|['"]+$/g, "");
      if (n && !Fa.has(n.toLowerCase())) return n;
    }
    return "";
  }
  function gd(t) {
    if (!t) return [];
    let e = [];
    for (let n of t.split(",")) {
      let o = n.trim().replace(/^['"]+|['"]+$/g, "");
      o && (Fa.has(o.toLowerCase()) || e.push(o));
    }
    return e;
  }
  function ho(t) {
    let e = String(t ?? "400").trim().toLowerCase();
    if (e === "normal") return 400;
    if (e === "bold") return 700;
    let n = parseInt(e, 10);
    return Number.isFinite(n) ? Math.min(900, Math.max(100, n)) : 400;
  }
  function mo(t) {
    let e = String(t ?? "normal").trim().toLowerCase();
    return e.startsWith("italic") ? "italic" : e.startsWith("oblique") ? "oblique" : "normal";
  }
  function yd(t) {
    let e = String(t ?? "100%").match(/(\d+(?:\.\d+)?)\s*%/);
    return e ? Math.max(50, Math.min(200, parseFloat(e[1]))) : 100;
  }
  function bd(t) {
    let e = String(t || "400").trim(), n = e.match(/^(\d{2,3})\s+(\d{2,3})$/);
    if (n) {
      let r = ho(n[1]), i = ho(n[2]);
      return { min: Math.min(r, i), max: Math.max(r, i) };
    }
    let o = ho(e);
    return { min: o, max: o };
  }
  function wd(t) {
    let e = String(t || "normal").trim().toLowerCase();
    return e === "italic" ? { kind: "italic" } : e.startsWith("oblique") ? { kind: "oblique" } : { kind: "normal" };
  }
  function xd(t) {
    let e = String(t || "100%").trim(), n = e.match(/(\d+(?:\.\d+)?)\s*%\s+(\d+(?:\.\d+)?)\s*%/);
    if (n) {
      let i = parseFloat(n[1]), s = parseFloat(n[2]);
      return { min: Math.min(i, s), max: Math.max(i, s) };
    }
    let o = e.match(/(\d+(?:\.\d+)?)\s*%/), r = o ? parseFloat(o[1]) : 100;
    return { min: r, max: r };
  }
  function Sd(t) {
    return !t || typeof t != "string" ? "" : t.replace(/\s+(variable|vf|v[0-9]+)$/i, "").trim().toLowerCase().replace(/\s+/g, "-");
  }
  function vd(t, e, n = []) {
    if (!t) return false;
    try {
      let o = new URL(t, location.href);
      if (o.origin === location.origin) return true;
      let i = o.host.toLowerCase();
      if (["fonts.googleapis.com", "fonts.gstatic.com", "use.typekit.net", "p.typekit.net", "kit.fontawesome.com", "use.fontawesome.com", "cdn.jsdelivr.net", "unpkg.com", "cdnjs.cloudflare.com", "esm.sh"].some((l) => i.endsWith(l)) || n.some((l) => i === l.toLowerCase() || i.endsWith("." + l.toLowerCase()))) return true;
      let a = (o.pathname + o.search).toLowerCase();
      if (/\bfont(s)?\b/.test(a) || /\.woff2?(\b|$)/.test(a) || md.some((l) => a.includes(l))) return true;
      for (let l of e) {
        let u = l.toLowerCase().replace(/\s+/g, "+"), c = l.toLowerCase().replace(/\s+/g, "-"), f = Sd(l);
        if (a.includes(u) || a.includes(c) || f && a.includes(f)) return true;
      }
      return false;
    } catch {
      return false;
    }
  }
  function Fn(t) {
    return String(t).split(bo)[0];
  }
  function wo(t) {
    let e = /* @__PURE__ */ new Set(), n = /* @__PURE__ */ new Set();
    try {
      for (let o of t.fonts) {
        let r = String(o.family).replace(/["']/g, "").toLowerCase();
        e.add(r), (o.status === "loading" || o.status === "loaded") && n.add(r);
      }
    } catch {
    }
    return { declared: e, drawn: n };
  }
  function Cd(t) {
    let e = /* @__PURE__ */ new Set();
    for (let n of t || []) {
      let o = Fn(n).trim();
      o && e.add(o);
    }
    return e;
  }
  function Aa(t, e) {
    return t && t.replace(/url\(\s*(['"]?)([^)'"]+)\1\s*\)/g, (n, o, r) => {
      let i = (r || "").trim();
      if (!i || /^data:|^blob:|^https?:|^file:|^about:/i.test(i)) return n;
      let s = i;
      try {
        s = new URL(i, e || location.href).href;
      } catch {
      }
      return `url("${s}")`;
    });
  }
  async function kd(t, e, n, o) {
    if (!t) return t;
    let r = /* @__PURE__ */ new Set();
    function i(l, u) {
      try {
        return new URL(l, u || location.href).href;
      } catch {
        return l;
      }
    }
    async function s(l, u, c = 0) {
      if (c > yo) return D({ debug: o }, `Too many nested @import rules in ${u}; stopped at ${yo} levels.`), l;
      let f = "", d = 0, h, m = new RegExp($a.source, "g");
      for (; h = m.exec(l); ) {
        f += l.slice(d, h.index), d = m.lastIndex;
        let g = (h[2] || h[4] || "").trim(), p = i(g, u);
        if (r.has(p)) {
          D({ debug: o }, `Skipped an @import that loops back: ${p}`);
          continue;
        }
        r.add(p);
        let y = "";
        try {
          let b = await ut(p, { as: "text", useProxy: n });
          b.ok && typeof b.data == "string" && (y = b.data);
        } catch {
        }
        y ? (y = Aa(y, p), y = await s(y, p, c + 1), f += `
/* inlined: ${p} */
${y}
`) : f += h[0];
      }
      return f += l.slice(d), f;
    }
    let a = Aa(t, e || location.href);
    return a = await s(a, e || location.href, 0), a;
  }
  function Lt(t, e, n = "") {
    return (t.match(new RegExp(`${e}\\s*:\\s*([^;}]+)[;}]`, "i"))?.[1] || n).trim();
  }
  function Pa(t) {
    if (!t) return [];
    let e = [], n = t.split(",").map((o) => o.trim()).filter(Boolean);
    for (let o of n) {
      let r = o.match(/^U\+([0-9A-Fa-f?]+)(?:-([0-9A-Fa-f?]+))?$/);
      if (!r) continue;
      let i = r[1], s = r[2], a = (l) => {
        if (!l.includes("?")) return parseInt(l, 16);
        let u = parseInt(l.replace(/\?/g, "0"), 16), c = parseInt(l.replace(/\?/g, "F"), 16);
        return [u, c];
      };
      if (s) {
        let l = a(i), u = a(s), c = Array.isArray(l) ? l[0] : l, f = Array.isArray(u) ? u[1] : u;
        e.push([Math.min(c, f), Math.max(c, f)]);
      } else {
        let l = a(i);
        Array.isArray(l) ? e.push([l[0], l[1]]) : e.push([l, l]);
      }
    }
    return e;
  }
  function Na(t, e) {
    if (!e.length || !t || t.size === 0) return true;
    for (let n of t) for (let [o, r] of e) if (n >= o && n <= r) return true;
    return false;
  }
  function Ur(t, e) {
    let n = [];
    if (!t) return n;
    for (let o of t.matchAll(Ta)) {
      let r = (o[2] || "").trim();
      if (!(!r || r.startsWith("data:"))) {
        if (!/^https?:/i.test(r)) try {
          r = new URL(r, e || location.href).href;
        } catch {
        }
        n.push(r);
      }
    }
    return n;
  }
  async function go(t, e, n = "", o = false) {
    let r = t;
    for (let i of t.matchAll(Ta)) {
      let s = ge(i[0]);
      if (!s) continue;
      let a = s;
      if (!a.startsWith("http") && !a.startsWith("data:")) try {
        a = new URL(a, e || location.href).href;
      } catch {
      }
      if (j.resource?.has(a)) {
        r = r.replace(i[0], `url(${j.resource.get(a)})`);
        continue;
      }
      try {
        let l = await ut(a, { as: "dataURL", useProxy: n });
        if (l.ok && typeof l.data == "string") {
          let u = l.data;
          j.resource?.set(a, u), r = r.replace(i[0], `url(${u})`);
        }
      } catch {
        D({ debug: o }, "Couldn't load font file:", a);
      }
    }
    return r;
  }
  function Ad(t) {
    if (!t.length) return null;
    let e = (a, l) => t.some(([u, c]) => !(c < a || u > l)), n = e(0, 255) || e(305, 305), o = e(256, 591) || e(7680, 7935), r = e(880, 1023), i = e(1024, 1279);
    return e(7840, 7929) || e(258, 259) || e(416, 417) || e(431, 432) ? "vietnamese" : i ? "cyrillic" : r ? "greek" : o ? "latin-ext" : n ? "latin" : null;
  }
  function _a(t = {}) {
    let e = new Set((t.families || []).map((r) => String(r).toLowerCase())), n = new Set((t.domains || []).map((r) => String(r).toLowerCase())), o = new Set((t.subsets || []).map((r) => String(r).toLowerCase()));
    return (r, i) => {
      if (e.size && e.has(r.family.toLowerCase())) return true;
      if (n.size) for (let s of r.srcUrls) try {
        if (n.has(new URL(s).host.toLowerCase())) return true;
      } catch {
      }
      if (o.size) {
        let s = Ad(i);
        if (s && o.has(s)) return true;
      }
      return false;
    };
  }
  function _d(t) {
    if (!t) return t;
    let e = /@font-face[^{}]*\{[^}]*\}/gi, n = /* @__PURE__ */ new Set(), o = [];
    for (let i of t.match(e) || []) {
      let s = Lt(i, "font-family"), a = zr(s), l = Lt(i, "font-weight", "400"), u = Lt(i, "font-style", "normal"), c = Lt(i, "font-stretch", "100%"), f = Lt(i, "unicode-range"), d = Lt(i, "src"), h = Ur(d, location.href), m = h.length ? h.map((p) => String(p).toLowerCase()).sort().join("|") : d.toLowerCase(), g = [String(a || "").toLowerCase(), l, u, c, f.toLowerCase(), m].join("|");
      n.has(g) || (n.add(g), o.push(i));
    }
    if (o.length === 0) return t;
    let r = 0;
    return t.replace(e, () => o[r++] || "");
  }
  function Rd(t) {
    let e = Ea.get(t);
    return e === void 0 && (e = Ed++, Ea.set(t, e)), e;
  }
  function Fd(t, e, n, o, r, i, s, a, l) {
    let u = Array.from(t || []).sort().join("|"), c = 0, f = 0;
    for (let b of s || []) {
      let w = Math.imul(b, 2654435761);
      w ^= w >>> 15, w = Math.imul(w, 2246822507), w ^= w >>> 13, c = c + w | 0, f++;
    }
    let d = e ? JSON.stringify({ families: (e.families || []).map((b) => String(b).toLowerCase()).sort(), domains: (e.domains || []).map((b) => String(b).toLowerCase()).sort(), subsets: (e.subsets || []).map((b) => String(b).toLowerCase()).sort() }) : "", h = (n || []).map((b) => `${(b.family || "").toLowerCase()}::${b.weight || "normal"}::${b.style || "normal"}::${b.stretchPct ?? 100}::${b.src || ""}`).sort().join("|"), m = o || "", g = (r || []).map((b) => String(b).toLowerCase()).sort().join("|"), p = Rd(i || document), y = (a || []).map((b) => String(b)).sort().join("|");
    return `fonts-embed-css::req=${u}::ex=${d}::lf=${h}::px=${m}::fd=${g}::doc=${p}::cp=${c}::n=${f}::ic=${y}::env=${l}`;
  }
  async function Br(t, e, n, o) {
    let r = o.doc?.defaultView || window;
    if (t.disabled || t.media?.mediaText && !r.matchMedia(t.media.mediaText).matches) return;
    let i;
    try {
      i = t.cssRules || [];
    } catch {
      return;
    }
    let s = (a, l) => {
      try {
        return new URL(a, l || location.href).href;
      } catch {
        return a;
      }
    };
    for (let a of i) {
      if (a.type === CSSRule.IMPORT_RULE && a.styleSheet) {
        let l = a.href ? s(a.href, e) : e;
        if (o.depth >= yo) {
          D(o, `Too many nested @import rules in ${l}; stopped at ${yo} levels.`);
          continue;
        }
        if (l && o.visitedSheets.has(l)) {
          D(o, `Skipped an @import that loops back: ${l}`);
          continue;
        }
        l && o.visitedSheets.add(l);
        let u = { ...o, depth: (o.depth || 0) + 1 };
        await Br(a.styleSheet, l, n, u);
        continue;
      }
      if (a.cssRules?.length) {
        if (a.type === CSSRule.MEDIA_RULE && !r.matchMedia(a.conditionText).matches || a.type === CSSRule.SUPPORTS_RULE && !r.CSS.supports(a.conditionText)) continue;
        await Br(a, e, n, o);
        continue;
      }
      if (a.type === CSSRule.FONT_FACE_RULE) {
        let l = (a.style.getPropertyValue("font-family") || "").trim(), u = zr(l);
        if (!u || Ht(u, o.iconMatchers)) continue;
        let c = (a.style.getPropertyValue("font-weight") || "").trim(), f = (a.style.getPropertyValue("font-style") || "").trim(), d = (a.style.getPropertyValue("font-stretch") || "").trim(), h = (a.style.getPropertyValue("font-variation-settings") || "").trim(), m = (a.style.getPropertyValue("src") || "").trim(), g = (a.style.getPropertyValue("unicode-range") || "").trim(), p = c || "400", y = f || "normal", b = d || "100%", w = (f ? `font-style:${f};` : "") + (c ? `font-weight:${c};` : "") + (d ? `font-stretch:${d};` : "") + (h ? `font-variation-settings:${h};` : "") + (g ? `unicode-range:${g};` : ""), S = o.faceMatchesRequired(u, y, p, b);
        if (!S && !o.requiredIndex.has(u.toLowerCase())) continue;
        let v = Pa(g);
        if (!Na(o.usedCodepoints, v)) continue;
        let C = { family: u, weightSpec: p, styleSpec: y, stretchSpec: b, unicodeRange: g, srcRaw: m, srcUrls: Ur(m, e || location.href), href: e || location.href };
        if (o.simpleExcluder && o.simpleExcluder(C, v)) continue;
        let M = `"${String(u).replace(/^\s*["']|["']\s*$/g, "").replace(/(["\\])/g, "\\$1")}"`;
        if (!S) {
          o.provisionalFaces.push({ family: u.toLowerCase(), block: `@font-face{font-family:${u};src:${m};${w}}`, srcRaw: m, baseHref: e || location.href });
          continue;
        }
        if (S.near.length) {
          o.nearFaces.push({ family: u.toLowerCase(), block: `@font-face{font-family:${M};src:${m};${w}}`, srcRaw: m, baseHref: e || location.href, near: S.near, ranges: v });
          continue;
        }
        if (o.coverExact(S.exact, v), o.coveredFamilies.add(u.toLowerCase()), /url\(/i.test(m)) {
          let $2 = await go(m, e || location.href, o.useProxy, o.debug);
          await n(`@font-face{font-family:${M};src:${$2};${w}}`);
        } else await n(`@font-face{font-family:${M};src:${m};${w}}`);
      }
    }
  }
  async function La({ required: t, usedCodepoints: e, exclude: n = void 0, localFonts: o = [], useProxy: r = "", fontStylesheetDomains: i = [], iconMatchers: s = [], doc: a = document, debug: l = false } = {}) {
    t instanceof Set || (t = /* @__PURE__ */ new Set()), e instanceof Set || (e = /* @__PURE__ */ new Set());
    let u = /* @__PURE__ */ new Map();
    for (let x of t) {
      let [_, P, E, R] = String(x).split(bo);
      if (!_) continue;
      let L = _.toLowerCase(), k = u.get(L) || [];
      k.push({ w: parseInt(P, 10), s: E, st: parseInt(R, 10) }), u.set(L, k);
    }
    function c(x, _, P, E) {
      let R = String(x).toLowerCase();
      if (!u.has(R)) return null;
      let L = u.get(R), k = bd(P), I = wd(_), W = xd(E), T = k.min !== k.max, N = k.min, U = (V) => I.kind === "normal" && V === "normal" || I.kind !== "normal" && (V === "italic" || V === "oblique"), z = L.filter((V) => (T ? V.w >= k.min && V.w <= k.max : V.w === N) && U(mo(V.s)) && V.st >= W.min && V.st <= W.max);
      if (z.length) return { exact: z, near: [] };
      if (!T) {
        let V = L.filter((B) => Math.abs(N - B.w) <= 300 && U(mo(B.s)) && B.st >= W.min && B.st <= W.max);
        if (V.length) return { exact: z, near: V };
      }
      if (!T && I.kind === "normal" && L.some((B) => mo(B.s) !== "normal")) for (let B of L) {
        let rt = Math.abs(N - B.w) <= 300, at = B.st >= W.min && B.st <= W.max;
        if (rt && at) return { exact: z, near: [] };
      }
      return null;
    }
    let f = _a(n);
    je(a), Ut();
    let d = Fd(t, n, o, r, i, a, e, s, je(a));
    if (j.resource?.has(d)) return j.resource.get(d);
    let h = Cd(t), m = [], g = $a;
    for (let x of a.querySelectorAll("style")) {
      let _ = x.textContent || "";
      for (let P of _.matchAll(g)) {
        let E = (P[2] || P[4] || "").trim();
        if (!E || Dr(E, s)) continue;
        a.querySelector(`link[rel="stylesheet"][href="${E}"]`) || m.push(E);
      }
    }
    let p = [];
    m.length && await Promise.all(m.map((x) => new Promise((_) => {
      if (a.querySelector(`link[rel="stylesheet"][href="${x}"]`)) return _(null);
      let P = a.createElement("link");
      P.rel = "stylesheet", P.href = x, tt(P), P.setAttribute("data-snapdom", "injected-import");
      let E = setTimeout(() => _(null), 3e3), R = (L) => {
        clearTimeout(E), _(L);
      };
      P.onload = () => R(P), P.onerror = () => R(null), a.head.appendChild(P), p.push(P);
    })));
    let y = "", b = /* @__PURE__ */ new Set(), w = [], S = [], v = /* @__PURE__ */ new Map(), C = (x, _) => _.some(([P, E]) => x >= P && x <= E), M = (x, _) => {
      if (_.length) for (let P of x) {
        let E = v.get(P) || /* @__PURE__ */ new Set();
        for (let R of e) C(R, _) && E.add(R);
        v.set(P, E);
      }
    }, $2 = Array.from(a.querySelectorAll('link[rel="stylesheet"]')).filter((x) => !!x.href);
    for (let x of p) try {
      x.remove();
    } catch {
    }
    for (let x of $2) try {
      if (Dr(x.href, s)) continue;
      let _ = "", P = false;
      try {
        P = new URL(x.href, location.href).origin === location.origin;
      } catch {
      }
      if (!P) {
        let R = Array.isArray(i) ? i : [];
        if (!vd(x.href, h, R)) continue;
      }
      if (P) {
        let R = Array.from(a.styleSheets).find((L) => L.href === x.href);
        if (R) try {
          let L = R.cssRules || [];
          _ = Array.from(L).map((k) => k.cssText).join("");
        } catch {
        }
      }
      if (!_) {
        let R = await ut(x.href, { as: "text", useProxy: r, debug: l });
        R?.ok && typeof R.data == "string" && (_ = R.data);
      }
      _ = await kd(_, x.href, r, l);
      let E = "";
      for (let R of _.match(Md) || []) {
        let L = Lt(R, "font-family"), k = zr(L);
        if (!k || Ht(k, s)) continue;
        let I = Lt(R, "font-weight", "400"), W = Lt(R, "font-style", "normal"), T = Lt(R, "font-stretch", "100%"), N = Lt(R, "unicode-range"), U = Lt(R, "src"), z = Ur(U, x.href), V = c(k, W, I, T);
        if (!V && !u.has(k.toLowerCase())) continue;
        let B = Pa(N);
        if (!Na(e, B)) continue;
        let rt = { family: k, weightSpec: I, styleSpec: W, stretchSpec: T, unicodeRange: N, srcRaw: U, srcUrls: z, href: x.href };
        if (n && f(rt, B)) continue;
        let at = { family: k.toLowerCase(), block: R, srcRaw: U, baseHref: x.href };
        if (!V) {
          w.push(at);
          continue;
        }
        if (V.near.length) {
          S.push({ ...at, near: V.near, ranges: B });
          continue;
        }
        M(V.exact, B), b.add(k.toLowerCase());
        let pt = /url\(/i.test(U) ? await go(R, x.href, r, l) : R;
        E += pt;
      }
      E.trim() && (y += E);
    } catch {
      D({ debug: l }, "Couldn't read stylesheet:", x.href);
    }
    let F = { doc: a, requiredIndex: u, usedCodepoints: e, faceMatchesRequired: c, coveredFamilies: b, provisionalFaces: w, nearFaces: S, coverExact: M, simpleExcluder: n ? _a(n) : null, useProxy: r, iconMatchers: s, visitedSheets: /* @__PURE__ */ new Set(), depth: 0, debug: l }, A = /* @__PURE__ */ new Set([...a.styleSheets, ...a.adoptedStyleSheets || []]);
    for (let x of A) if (!(x.href && $2.some((_) => _.href === x.href))) try {
      let _ = x.href || a.baseURI || location.origin + "/";
      _ && F.visitedSheets.add(_), await Br(x, _, async (P) => {
        y += P;
      }, F);
    } catch {
    }
    for (let x of S) x.near.some((P) => {
      let E = v.get(P);
      if (!E || !e.size) return true;
      for (let R of e) if (!E.has(R) && (!x.ranges.length || C(R, x.ranges))) return true;
      return false;
    }) && (b.add(x.family), y += /url\(/i.test(x.srcRaw) ? await go(x.block, x.baseHref, r, l) : x.block);
    for (let x of w) b.has(x.family) || (y += /url\(/i.test(x.srcRaw) ? await go(x.block, x.baseHref, r, l) : x.block);
    try {
      for (let x of a.fonts || []) {
        if (!x || !x.family || x.status !== "loaded" || !x._snapdomSrc) continue;
        let _ = String(x.family).replace(/^['"]+|['"]+$/g, "");
        if (Ht(_, s) || !u.has(_.toLowerCase()) || n?.families && n.families.some((E) => String(E).toLowerCase() === _.toLowerCase())) continue;
        let P = x._snapdomSrc;
        if (!String(P).startsWith("data:")) if (j.resource?.has(x._snapdomSrc)) P = j.resource.get(x._snapdomSrc);
        else try {
          let E = await ut(x._snapdomSrc, { as: "dataURL", useProxy: r });
          if (E.ok && typeof E.data == "string") P = E.data, j.resource?.set(x._snapdomSrc, P);
          else continue;
        } catch {
          D({ debug: l }, "Couldn't load font file:", x._snapdomSrc);
          continue;
        }
        y += `@font-face{font-family:'${_}';src:url(${P});font-style:${x.style || "normal"};font-weight:${x.weight || "normal"};}`;
      }
    } catch {
    }
    for (let x of o) {
      if (!x || typeof x != "object") continue;
      let _ = String(x.family || "").replace(/^['"]+|['"]+$/g, "");
      if (!_ || Ht(_, s) || !u.has(_.toLowerCase()) || n?.families && n.families.some((I) => String(I).toLowerCase() === _.toLowerCase())) continue;
      let P = x.weight != null ? String(x.weight) : "normal", E = x.style != null ? String(x.style) : "normal", R = x.stretchPct != null ? `${x.stretchPct}%` : "100%", L = String(x.src || ""), k = L;
      if (!k.startsWith("data:")) if (j.resource?.has(L)) k = j.resource.get(L);
      else try {
        let I = await ut(L, { as: "dataURL", useProxy: r });
        if (I.ok && typeof I.data == "string") k = I.data, j.resource?.set(L, k);
        else continue;
      } catch {
        D({ debug: l }, "Couldn't load font file from localFonts:", L);
        continue;
      }
      y += `@font-face{font-family:'${_}';src:url(${k});font-style:${E};font-weight:${P};font-stretch:${R};}`;
    }
    return y && (y = _d(y), j.resource?.set(d, y)), y;
  }
  function xo(t, e) {
    let n = /* @__PURE__ */ new Set(), o = /* @__PURE__ */ new Set();
    if (!t) return { required: n, usedCodepoints: o };
    let r = (c) => {
      if (c) for (let f of c) o.add(f.codePointAt(0));
    }, i = (c) => {
      let f = gd(c.fontFamily);
      if (f.length) for (let d of f) n.add([d, ho(c.fontWeight), mo(c.fontStyle), yd(c.fontStretch)].join(bo));
    }, s = fe(t), a = t.getRootNode(), l = (c) => {
      i(O(c));
      let f = c.getRootNode() === a ? s : fe(c);
      for (let d of ["::before", "::after"]) {
        let h = d === "::before" ? f.before : f.after;
        if (h !== null) {
          if (h === "") continue;
          try {
            if (!c.matches(h)) continue;
          } catch {
          }
        }
        let m = O(c, d), g = m && m.content;
        if (!(!g || g === "none" || g === "normal")) if (i(m), /^["']/.test(g)) r(g.slice(1, -1));
        else {
          let p = g.match(/\\[0-9A-Fa-f]{1,6}/g);
          if (p) for (let y of p) try {
            o.add(parseInt(y.slice(1), 16));
          } catch {
          }
        }
      }
    }, u = [t];
    for (let c = 0; c < u.length; c++) {
      let f = u[c];
      f.nodeType === Node.ELEMENT_NODE && l(f), f.shadowRoot && u.push(f.shadowRoot);
      let d = (t.ownerDocument || document).createTreeWalker(f, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT, null);
      for (; d.nextNode(); ) {
        let h = d.currentNode;
        if (h.nodeType === Node.TEXT_NODE) {
          if (e && h.parentElement && !e(h.parentElement)) continue;
          r(h.nodeValue || "");
        } else {
          if (e && !e(h)) continue;
          l(h), h.shadowRoot && u.push(h.shadowRoot);
        }
      }
    }
    return { required: n, usedCodepoints: o };
  }
  async function So(t, e, n = document) {
    try {
      await wn(n);
    } catch {
    }
    if (!t.size) return;
    let o = Array.from(e, (i) => i <= 1114111 ? String.fromCodePoint(i) : "").join(""), r = n.createElement("div");
    tt(r), r.style.cssText = "position:absolute!important;left:-9999px!important;top:0!important;opacity:0!important;pointer-events:none!important;contain:layout size style;";
    for (let i of t) {
      let [s, a, l, u] = i.split(bo), c = n.createElement("span");
      c.textContent = o, c.style.fontFamily = `"${s}"`, c.style.fontWeight = a, c.style.fontStyle = l, c.style.fontStretch = `${u}%`, c.style.fontSize = "32px", c.style.lineHeight = "1", c.style.whiteSpace = "nowrap", c.style.margin = "0", c.style.padding = "0", r.appendChild(c);
    }
    n.body.appendChild(r), r.offsetWidth, n.body.removeChild(r), await Ct(), await Ct();
  }
  function Da(t) {
    return /\bcounter\s*\(|\bcounters\s*\(/.test(t || "");
  }
  function Ia(t, e = false) {
    let n = "", o = Math.max(1, t);
    for (; o > 0; ) o--, n = String.fromCharCode(97 + o % 26) + n, o = Math.floor(o / 26);
    return e ? n.toUpperCase() : n;
  }
  function Wa(t, e = true) {
    let n = [[1e3, "M"], [900, "CM"], [500, "D"], [400, "CD"], [100, "C"], [90, "XC"], [50, "L"], [40, "XL"], [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"]], o = Math.max(1, Math.min(3999, t)), r = "";
    for (let [i, s] of n) for (; o >= i; ) r += s, o -= i;
    return e ? r : r.toLowerCase();
  }
  function Oa(t, e) {
    switch ((e || "decimal").toLowerCase()) {
      case "decimal":
        return String(t);
      case "decimal-leading-zero": {
        let n = Math.abs(t);
        return (t < 0 ? "-" : "") + (n < 10 ? "0" : "") + String(n);
      }
      case "lower-alpha":
      case "lower-latin":
        return Ia(t, false);
      case "upper-alpha":
      case "upper-latin":
        return Ia(t, true);
      case "lower-roman":
        return Wa(t, false);
      case "upper-roman":
        return Wa(t, true);
      case "none":
        return "";
      case "disc":
        return "\u2022";
      case "circle":
        return "\u25E6";
      case "square":
        return "\u25AA";
      default:
        return String(t);
    }
  }
  function $n(t, e) {
    let n = (t || "").trim().split(/[\s,]+/).filter(Boolean), o = [];
    for (let r = 0; r < n.length; r++) {
      let i = n[r];
      if (i === "none") continue;
      let s = n[r + 1], a = s !== void 0 && Number.isFinite(Number(s));
      o.push([i, a ? Number(s) : e]), a && r++;
    }
    return o;
  }
  function Ba(t) {
    let e = /* @__PURE__ */ new WeakMap(), n = cr(t) ? t.documentElement : t, o = (u) => u && u.tagName === "LI", r = /* @__PURE__ */ new WeakMap(), i = (u) => {
      let c = /* @__PURE__ */ new Map();
      for (let [f, d] of u) c.set(f, d.slice());
      return c;
    }, s = (u, c, f) => {
      let d = i(u), h;
      try {
        h = getComputedStyle(f);
      } catch {
        h = f.style;
      }
      let m;
      try {
        m = h?.counterReset;
      } catch {
      }
      if (m && m !== "none") for (let [y, b] of $n(m, 0)) {
        let w = c.get(y);
        if (w && w.length) {
          let S = w.slice();
          S.push(b), d.set(y, S);
        } else d.set(y, [b]);
      }
      let g;
      try {
        g = h?.counterSet;
      } catch {
      }
      if (g && g !== "none") for (let [y, b] of $n(g, 0)) {
        let w = d.get(y) || [];
        w.length === 0 && w.push(0), w[w.length - 1] = b, d.set(y, w);
      }
      let p;
      try {
        p = h?.counterIncrement;
      } catch {
      }
      if (p && p !== "none") for (let [y, b] of $n(p, 1)) {
        let w = d.get(y) || [];
        w.length === 0 && w.push(0), w[w.length - 1] += b, d.set(y, w);
      }
      try {
        if (h?.display === "list-item" && o(f)) {
          let y = f.parentElement, b = y && r.get(y), w = y?.tagName === "OL" ? parseInt(y.getAttribute("start"), 10) : NaN, S = b === void 0 ? Number.isFinite(w) ? w : 1 : b + 1, v = y?.tagName === "OL" ? parseInt(f.getAttribute("value"), 10) : NaN;
          Number.isFinite(v) && (S = v), y && r.set(y, S);
          let C = d.get("list-item") || [];
          C.length === 0 && C.push(0), C[C.length - 1] = S, d.set("list-item", C);
        }
      } catch {
      }
      return d;
    }, a = (u, c, f) => {
      let d = s(f, c, u);
      e.set(u, d);
      let h = d;
      for (let g of u.children) h = a(g, d, h);
      let m = /* @__PURE__ */ new Map();
      for (let [g, p] of f) {
        let y = p.length, b = h.get(g);
        m.set(g, b && b.length ? b.slice(0, y) : p.slice());
      }
      for (let [g, p] of h) !m.has(g) && p.length && !c.has(g) && m.set(g, p.slice(0, 1));
      return m;
    }, l = /* @__PURE__ */ new Map();
    return a(n, l, l), { get(u, c) {
      let f = e.get(u)?.get(c);
      return f && f.length ? f[f.length - 1] : 0;
    }, getStack(u, c) {
      let f = e.get(u)?.get(c);
      return f ? f.slice() : [];
    } };
  }
  function za(t, e, n) {
    if (!t || t === "none") return t;
    try {
      return t.replace($d, (o, r, i) => {
        let s = (String(i).match(Td) || []).map((a) => a.trim());
        if (r === "counter") {
          let a = s[0]?.replace(/^["']|["']$/g, ""), l = (s[1] || "decimal").toLowerCase(), u = n.get(e, a);
          return Oa(u, l);
        } else {
          let a = s[0]?.replace(/^["']|["']$/g, ""), l = s[1]?.replace(/^["']|["']$/g, "") ?? "", u = (s[2] || "decimal").toLowerCase(), c = n.getStack(e, a);
          return c.length ? c.map((d) => Oa(d, u)).join(l) : "";
        }
      });
    } catch {
      return "- ";
    }
  }
  function Pd(t, e) {
    let n = Ga(t);
    return e ? (e.__pseudoPreflightFp !== n && (Ut(), e.__pseudoPreflight = Ha(t, n), e.__pseudoPreflightFp = n), !!e.__pseudoPreflight) : (Ut(), Ha(t, n));
  }
  function vo(t) {
    try {
      return t && t.cssRules ? t.cssRules : null;
    } catch {
      return null;
    }
  }
  function Ga(t) {
    let e = t.querySelectorAll('style,link[rel~="stylesheet"]'), n = `n:${e.length}|`, o = 0;
    for (let s = 0; s < e.length; s++) {
      let a = e[s];
      if (a.tagName === "STYLE") {
        let l = a.textContent ? a.textContent.length : 0;
        n += `S${l}|`;
        let u = a.sheet, c = u ? vo(u) : null;
        c && (o += c.length);
      } else {
        let l = a.getAttribute("href") || "", u = a.getAttribute("media") || "all";
        n += `L${l}|m:${u}|`;
        let c = a.sheet, f = c ? vo(c) : null;
        f && (o += f.length);
      }
    }
    let r = t.adoptedStyleSheets, i = 0;
    if (Array.isArray(r)) for (let s of r) {
      let a = vo(s);
      a && (i += a.length);
    }
    return n += `ass:${Array.isArray(r) ? r.length : 0}/${i}|tr:${o}`, n;
  }
  function Hr(t, e, n) {
    let o = vo(t);
    if (!o) return false;
    for (let r = 0; r < o.length; r++) {
      if (n.budget <= 0) return false;
      let i = o[r], s = i && i.cssText ? i.cssText : "";
      n.budget--;
      for (let a of e) if (s.includes(a)) return true;
      if (i && i.styleSheet && Hr(i.styleSheet, e, n)) return true;
      if (i && i.cssRules && i.cssRules.length) for (let a = 0; a < i.cssRules.length && n.budget > 0; a++) {
        let l = i.cssRules[a], u = l && l.cssText ? l.cssText : "";
        n.budget--;
        for (let c of e) if (u.includes(c)) return true;
      }
      if (n.budget <= 0) return false;
    }
    return false;
  }
  function Ha(t = document, e = Ga(t)) {
    let n = Qe.get(t);
    if (n && n.fingerprint === e) return n.result;
    let o = (a) => (a.match(/\|ass:[^|]*/) || [""])[0];
    n && o(e) !== o(n.fingerprint) && Ve();
    let r = ["::before", "::after", "::first-letter", "::marker", "::first-line", ":before", ":after", ":first-letter", ":first-line", "counter(", "counters(", "counter-increment", "counter-reset"], i = t.querySelectorAll("style");
    for (let a = 0; a < i.length; a++) {
      let l = i[a].textContent || "";
      for (let u of r) if (l.includes(u)) return Qe.set(t, { fingerprint: e, result: true }), true;
    }
    let s = t.adoptedStyleSheets;
    if (Array.isArray(s) && s.length) {
      let a = { budget: Ua };
      try {
        for (let l of s) if (Hr(l, r, a)) return Qe.set(t, { fingerprint: e, result: true }), true;
      } catch {
      }
    }
    {
      let a = t.querySelectorAll('style,link[rel~="stylesheet"]'), l = { budget: Ua };
      for (let u = 0; u < a.length && l.budget > 0; u++) {
        let c = a[u], f = null;
        if (c.tagName, f = c.sheet || null, f && Hr(f, r, l)) return Qe.set(t, { fingerprint: e, result: true }), true;
      }
    }
    return t.querySelector('[style*="counter("], [style*="counters("]') ? (Qe.set(t, { fingerprint: e, result: true }), true) : (Qe.set(t, { fingerprint: e, result: false }), false);
  }
  function ja(t) {
    for (let e of ["Top", "Right", "Bottom", "Left"]) {
      let n = parseFloat(t[`border${e}Width`]) || 0, o = t[`border${e}Style`];
      if (n > 0 && o && o !== "none" && o !== "hidden") return true;
    }
    return false;
  }
  function Nd(t, e) {
    let n = null, o = () => {
      if (!n) try {
        n = Ba(t);
      } catch (r) {
        D(e, "Couldn't compute CSS counters; list numbers may be off.", r), n = { get: () => 0, getStack: () => [] };
      }
      return n;
    };
    return { get(r, i) {
      return o().get(r, i);
    }, getStack(r, i) {
      return o().getStack(r, i);
    } };
  }
  function Ld(t) {
    let e = false;
    for (let n = 0; n < t.length; n++) {
      let o = t[n];
      if (o === '"') e = !e;
      else if (o === "/" && !e) return t.slice(0, n).trim();
    }
    return t;
  }
  function Id(t) {
    return t.replace(/\\(?:([0-9a-fA-F]{1,6})[ \t\n]?|([\s\S]))/g, (e, n, o) => {
      if (n) {
        let r = parseInt(n, 16);
        return r === 0 || r > 1114111 ? "\uFFFD" : String.fromCodePoint(r);
      }
      return o === `
` ? "" : o;
    });
  }
  function Wd(t) {
    if (!t) return "";
    let e = [], n = /"((?:\\[\s\S]|[^"\\])*)"|'((?:\\[\s\S]|[^'\\])*)'/g, o = 0, r;
    for (; r = n.exec(t); ) {
      let s = t.slice(o, r.index).trim();
      s && e.push(s), e.push(Id(r[1] !== void 0 ? r[1] : r[2])), o = n.lastIndex;
    }
    let i = t.slice(o).trim();
    return i && e.push(i), e.join("");
  }
  function jr(t, e, n) {
    let o = t.parentElement, r = o && n ? n.get(o) : null;
    return r ? { get(i, s) {
      let a = e.get(i, s), l = r.get(s);
      return typeof l == "number" ? Math.max(a, l) : a;
    }, getStack(i, s) {
      let a = e.getStack(i, s);
      if (!a.length) return a;
      let l = r.get(s);
      if (typeof l == "number") {
        let u = a.slice();
        return u[u.length - 1] = Math.max(u[u.length - 1], l), u;
      }
      return a;
    } } : e;
  }
  function Vr(t, e, n) {
    let o = /* @__PURE__ */ new Map(), r = (u, c) => $n(u, c).map(([f, d]) => ({ name: f, num: d })), i = r(e?.counterReset, 0), s = r(e?.counterSet, 0), a = r(e?.counterIncrement, 1);
    function l(u) {
      if (o.has(u)) return o.get(u).slice();
      let c = n.getStack(t, u);
      c = c.length ? c.slice() : [];
      let f = i.find((m) => m.name === u);
      if (f) {
        let m = Number.isFinite(f.num) ? f.num : 0;
        c = c.length ? [...c, m] : [m];
      }
      let d = s.find((m) => m.name === u);
      if (d) {
        let m = Number.isFinite(d.num) ? d.num : 0;
        c.length === 0 && (c = [0]), c[c.length - 1] = m;
      }
      let h = a.find((m) => m.name === u);
      if (h) {
        let m = Number.isFinite(h.num) ? h.num : 1;
        c.length === 0 && (c = [0]), c[c.length - 1] += m;
      }
      return o.set(u, c.slice()), c;
    }
    return { get(u, c) {
      let f = l(c);
      return f.length ? f[f.length - 1] : 0;
    }, getStack(u, c) {
      return l(c);
    }, __incs: a };
  }
  function Va(t, e, n, o, r, i) {
    try {
      if (o === null) {
        if (t.getRootNode() !== (t.ownerDocument || document)) return;
        let f = O(t).display || "";
        if (r === "::marker" ? !f.includes("list-item") : !(f === "block" || f === "flow-root" || f === "list-item" || f === "inline-block" || f === "table-cell" || f === "table-caption")) return;
      } else if (!t.matches(o)) return;
      if (r === "::marker" && !(O(t).display || "").includes("list-item")) return;
      let s = O(t, r), a = O(t);
      if (!s) return;
      let l = "";
      for (let f of i) {
        let d = s.getPropertyValue(f);
        d && d !== a.getPropertyValue(f) && !(f === "background-color" && d === "rgba(0, 0, 0, 0)") && !(f === "vertical-align" && d === "baseline") && (l += `${f}:${d};`);
      }
      if (r === "::marker") {
        let f = s.getPropertyValue("content");
        f && f !== "normal" && f !== "none" && (l += `content:${f};`);
      }
      if (!l) return;
      let c = `data-sd-p${n.__pseudoRuleSeq = (n.__pseudoRuleSeq || 0) + 1}`;
      e.setAttribute(c, ""), n.__pseudoCSS = (n.__pseudoCSS || "") + `[${c}]${r}{${l}}`;
    } catch {
    }
  }
  function Bd(t, e) {
    if (!/\b(?:no-)?(?:open|close)-quote\b/.test(t)) return t;
    let n = "\u201C", o = "\u201D";
    try {
      let r = O(e).quotes;
      if (r === "none") n = "", o = "";
      else if (r && r !== "auto") {
        let i = r.match(/"[^"]*"|'[^']*'/g);
        i && i.length >= 2 && (n = i[0].slice(1, -1), o = i[1].slice(1, -1));
      }
    } catch {
    }
    return n = n.replace(/"/g, ""), o = o.replace(/"/g, ""), t.replace(/"[^"]*"|\b(no-open-quote|no-close-quote|open-quote|close-quote)\b/g, (r, i) => i ? i === "open-quote" ? `"${n}"` : i === "close-quote" ? `"${o}"` : '""' : r);
  }
  function zd(t, e, n, o) {
    let r;
    try {
      r = O(t, e);
    } catch {
    }
    let i = r?.content;
    if (!i || i === "none" || i === "normal") return { text: "", incs: [] };
    i = Ld(i), i = Bd(i, t);
    let s = jr(t, n, o), a = Vr(t, r, s), l = Da(i) ? za(i, t, a) : i;
    return { text: Wd(l), incs: a.__incs || [] };
  }
  function Ud(t, e) {
    if (e.__shadowPseudo) return false;
    let n = fe(t), o = [];
    for (let i of ["before", "after", "firstLetter", "marker", "firstLine"]) {
      let s = n[i];
      if (s === null) return false;
      s && o.push(s);
    }
    if (!o.length) return true;
    let r = o.join(",");
    try {
      return !t.matches(r) && t.querySelector(r) === null;
    } catch {
      return false;
    }
  }
  async function Ze(t, e, n, o, r = false) {
    if (t?.nodeType !== 1 || e?.nodeType !== 1 || (n.slicer?.due() && await n.slicer.pause(), t.tagName === "TEXTAREA")) return;
    let i = t.ownerDocument || document;
    if (!r && !Pd(i, n) && !n.__shadowPseudo || !r && Ud(t, n)) return;
    n.__siblingCounters || (n.__siblingCounters = /* @__PURE__ */ new WeakMap()), n.__counterCtx || (n.__counterCtx = Nd(t.ownerDocument || document, n));
    let s = n.__counterCtx, a = fe(t);
    a.marker !== "" && Va(t, e, n, a.marker, "::marker", Od), a.firstLine !== "" && Va(t, e, n, a.firstLine, "::first-line", Dd);
    for (let u of ["::before", "::after", "::first-letter"]) {
      let c = a[u === "::before" ? "before" : u === "::after" ? "after" : "firstLetter"];
      if (c !== null) {
        if (c === "") continue;
        try {
          if (!t.matches(c)) continue;
        } catch {
        }
      }
      try {
        let f = O(t, u);
        if (!f || f.content === "none" && f.backgroundImage === "none" && (f.backgroundColor === "transparent" || f.backgroundColor === "rgba(0, 0, 0, 0)") && !ja(f) && (!f.transform || f.transform === "none") && f.display === "inline") continue;
        if (f.display === "none" || u !== "::first-letter" && (f.content === "none" || f.content === "normal")) {
          u === "::before" && (e.dataset.snapdomHasBefore = "1"), u === "::after" && (e.dataset.snapdomHasAfter = "1");
          continue;
        }
        if (u === "::first-letter") {
          let q = O(t), X = (q?.display || "").toLowerCase();
          if (X.includes("flex") || X.includes("grid")) continue;
          let G = (Gt) => f[Gt] !== q[Gt] && (parseFloat(f[Gt]) || 0) !== 0;
          if (!(f.color !== q.color || f.fontSize !== q.fontSize || f.fontWeight !== q.fontWeight || f.fontFamily !== q.fontFamily || f.fontStyle !== q.fontStyle || f.textTransform !== q.textTransform || f.float !== q.float && f.float !== "none" || G("paddingTop") || G("paddingRight") || G("paddingBottom") || G("paddingLeft") || G("marginTop") || G("marginRight") || G("marginBottom") || G("marginLeft"))) continue;
          let Z = Array.from(e.childNodes).find((Gt) => Gt.nodeType === Node.TEXT_NODE && Gt.textContent?.trim().length > 0);
          if (!Z) continue;
          let zn = Z.textContent, lt = /^\s*/.exec(zn)[0], dn = zn.slice(lt.length), $t = dn.match(/^([^\p{L}\p{N}\s]*[\p{L}\p{N}](?:['’])?)/u)?.[0], Te = dn.slice($t?.length || 0);
          if (!$t || /[\uD800-\uDFFF]/.test($t)) continue;
          let Vt = document.createElement("span");
          Vt.textContent = $t, Vt.dataset.snapdomPseudo = "::first-letter";
          let me = De(f, Qn(t, n)), Pe = Oe(me, "span");
          n.styleMap.set(Vt, Pe);
          let Ne = document.createTextNode(Te);
          e.replaceChild(Ne, Z), e.insertBefore(Vt, Ne), lt && e.insertBefore(document.createTextNode(lt), Vt);
          continue;
        }
        let m = f.content ?? "", g = m === "" || m === "none" || m === "normal", { text: p, incs: y } = zd(t, u, s, n.__siblingCounters), b = f.backgroundImage, w = f.backgroundColor, S = f.fontFamily, v = parseInt(f.fontSize) || 32, C = parseInt(f.fontWeight) || false, M = f.fontStyle || "normal", $2 = f.color || "#000", F = f.transform, A = Ht(S, o?.__iconMatchers), x = !g && p !== "", _ = b && b !== "none", P = w && w !== "transparent" && w !== "rgba(0, 0, 0, 0)", E = ja(f), R = F && F !== "none", L = m !== "none" && m !== "normal", k = /^inline-/.test(f.display || ""), I = L && ((parseFloat(f.width) || 0) > 0 || (parseFloat(f.height) || 0) > 0 || k), W = L && f.boxShadow && f.boxShadow !== "none", T = L && f.outlineStyle && f.outlineStyle !== "none" && (parseFloat(f.outlineWidth) || 0) > 0;
        if (!(x || _ || P || E || R || I || W || T)) {
          if (y && y.length && t.parentElement) {
            let q = n.__siblingCounters.get(t.parentElement) || /* @__PURE__ */ new Map();
            for (let { name: X } of y) {
              if (!X) continue;
              let G = jr(t, s, n.__siblingCounters), Z = Vr(t, O(t, u), G).get(t, X);
              q.set(X, Z);
            }
            n.__siblingCounters.set(t.parentElement, q);
          }
          continue;
        }
        let U = p.startsWith("url(") || /^-?(?:webkit-)?image-set\(/i.test(p), z = f.display === "inline" && f.cssFloat === "none" && f.position !== "absolute" && f.position !== "fixed", V = false;
        if (x && !A && p.length > 1 && !U && z) {
          let q = O(t), X = parseFloat(q.fontSize) || 16, G = parseFloat(q.lineHeight);
          Number.isFinite(G) || (G = X * 1.5), t.getBoundingClientRect().height < G * 1.6 && (e.style.whiteSpace = "nowrap", V = true);
        }
        let B = document.createElement("span");
        B.dataset.snapdomPseudo = u, B.style.pointerEvents = "none", V ? B.style.whiteSpace = "nowrap" : e.style.getPropertyValue(Ue) === "nowrap" && B.style.setProperty(Ue, "nowrap");
        let rt = Ls(t, u, f, n, o), at = (O(t).display || "").toLowerCase(), pt = at.includes("flex") || at.includes("grid");
        if (pt) {
          let q = rt["min-width"];
          (!q || q === "auto" || q === "0px") && (rt["min-width"] = "0px");
        }
        let St = x;
        St && !z && parseFloat(f.height) >= 1.5 * (parseFloat(f.lineHeight) || (parseFloat(f.fontSize) || 16) * 1.2) && (St = false, B.style.whiteSpace = f.whiteSpace);
        let ee = Oe(rt, "span", St, pt);
        if (n.styleMap.set(B, ee), A && p && p.length === 1) {
          let { dataUrl: q, height: X, advance: G, descent: ht } = await Ra(p, S, C, v, $2, M), Z = document.createElement("img");
          Z.src = q, Z.style = `height:${v}px;width:${G / X * v}px;object-fit:contain;vertical-align:${-ht}px;`, B.appendChild(Z);
        } else if (p && U) {
          let q = hn(p, typeof devicePixelRatio < "u" && devicePixelRatio || 1) ?? ge(p);
          if (q?.trim()) try {
            let X = await ut(ie(q), { as: "dataURL", useProxy: o.useProxy, debug: o.debug });
            if (X?.ok && typeof X.data == "string") {
              let G = document.createElement("img");
              G.src = X.data, G.style = `width:${v}px;height:auto;object-fit:contain;`, B.appendChild(G);
            }
          } catch (X) {
            D(o, `Couldn't draw the ${u} icon of`, [t, X]);
          }
        } else !A && x && (B.textContent = p);
        B.style.backgroundImage = "none", "maskImage" in B.style && (B.style.maskImage = "none"), "webkitMaskImage" in B.style && (B.style.webkitMaskImage = "none");
        try {
          B.style.backgroundRepeat = f.backgroundRepeat, B.style.backgroundSize = f.backgroundSize, f.backgroundPositionX && f.backgroundPositionY ? (B.style.backgroundPositionX = f.backgroundPositionX, B.style.backgroundPositionY = f.backgroundPositionY) : B.style.backgroundPosition = f.backgroundPosition, B.style.backgroundOrigin = f.backgroundOrigin, B.style.backgroundClip = f.backgroundClip, B.style.backgroundAttachment = f.backgroundAttachment, B.style.backgroundBlendMode = f.backgroundBlendMode;
        } catch {
        }
        if (_) try {
          let q = se(b), X = await Promise.all(q.map((G) => Ie(G, o)));
          B.style.backgroundImage = X.join(", ");
        } catch (q) {
          D(o, `Couldn't load the ${u} background image.`, q);
        }
        P && (B.style.backgroundColor = w);
        let yt = f.maskImage || f.webkitMaskImage;
        if (yt && yt !== "none") try {
          let X = (await Promise.all(se(yt).map((G) => Ie(G, o)))).join(", ");
          B.style.maskImage = X, B.style.webkitMaskImage = X;
          for (let G of ["maskSize", "maskRepeat", "maskPosition", "maskMode", "maskComposite", "maskOrigin", "maskClip"]) f[G] && (B.style[G] = f[G]);
        } catch (q) {
          D(o, `Couldn't load the ${u} mask image.`, q);
        }
        let $e = B.childNodes.length > 0 || B.textContent?.trim() !== "" || _ || P || E || R || I || W || T;
        if (y && y.length && t.parentElement) {
          let q = n.__siblingCounters.get(t.parentElement) || /* @__PURE__ */ new Map(), X = jr(t, s, n.__siblingCounters), G = Vr(t, O(t, u), X);
          for (let { name: ht } of y) {
            if (!ht) continue;
            let Z = G.get(t, ht);
            q.set(ht, Z);
          }
          n.__siblingCounters.set(t.parentElement, q);
        }
        if (!$e) continue;
        u === "::before" ? (e.dataset.snapdomHasBefore = "1", e.insertBefore(B, e.firstChild)) : (e.dataset.snapdomHasAfter = "1", e.appendChild(B));
      } catch (f) {
        nt(o.__session, "pseudo-failed", `${u} could not be copied`, t), D(o, `Couldn't copy the ${u} of`, [t, f]);
      }
    }
    let l = Array.from(e.children).filter((u) => !u.dataset.snapdomPseudo);
    if (n.nodeMap) for (let u of l) {
      let c = n.nodeMap.get(u);
      c?.nodeType === 1 && await Ze(c, u, n, o, true);
    }
    else {
      let u = Array.from(t.children);
      for (let c = 0; c < Math.min(u.length, l.length); c++) await Ze(u[c], l[c], n, o, true);
    }
  }
  function Xa(t) {
    for (let [e, n] of t) try {
      jd(e, n);
    } catch {
    }
  }
  function jd(t, e) {
    let n = t.ownerDocument.defaultView, o = n.getComputedStyle(t), r = [...t.getClientRects()];
    if (!r.length) return;
    let i = r[0].left + parseFloat(o.borderLeftWidth), s = r[0].top + parseFloat(o.borderTopWidth), a;
    if (o.display === "inline") {
      let y = r.reduce((w, S) => w + S.width, 0), b = 0;
      a = r.map((w) => {
        let S = { x: w.left - i - b, y: w.top - s, w: y, h: w.height, top: w.top, bottom: w.bottom };
        return b += w.width, S;
      });
    } else {
      let y = t.clientWidth || r[0].width, b = t.clientHeight || r[0].height;
      a = [{ x: 0, y: 0, w: y, h: b, top: -1 / 0, bottom: 1 / 0 }];
    }
    let l = e.ownerDocument, u = `sd-bct-${Math.random().toString(36).slice(2, 9)}`, c = Hd.map((y) => `${y}:${o.getPropertyValue(y)}`).join(";").replace(/"/g, "'"), f = "";
    a.forEach((y, b) => {
      let w = `<svg xmlns="${qa}" width="${y.w}" height="${y.h}"><foreignObject width="100%" height="100%"><div xmlns="http://www.w3.org/1999/xhtml" style="width:${y.w}px;height:${y.h}px;${c}"></div></foreignObject></svg>`;
      f += `<pattern id="${u}-${b}" patternUnits="userSpaceOnUse" x="${y.x}" y="${y.y}" width="${y.w}" height="${y.h}"><image width="${y.w}" height="${y.h}" preserveAspectRatio="none" href="data:image/svg+xml;charset=utf-8,${encodeURIComponent(w)}"/></pattern>`;
    });
    let d = "", h = l.createElement("canvas").getContext("2d"), m = t.ownerDocument.createTreeWalker(t, NodeFilter.SHOW_TEXT), g = t.ownerDocument.createRange();
    for (let y = m.nextNode(); y; y = m.nextNode()) {
      let b = n.getComputedStyle(y.parentElement);
      h.font = b.font;
      let w = h.measureText("X").fontBoundingBoxAscent;
      if (!Number.isFinite(w)) return;
      let S = b.font.replace(/"/g, "'"), v = a.map(() => ({ xs: [], ys: [], chars: "" })), C = y.data;
      for (let M = 0; M < C.length; M++) {
        let $2 = C.charCodeAt(M) >= 55296 && C.charCodeAt(M) <= 56319 ? 2 : 1;
        g.setStart(y, M), g.setEnd(y, M + $2);
        let F = g.getClientRects()[0], A = C.slice(M, M + $2);
        if (M += $2 - 1, !F || !A.trim()) continue;
        let x = (F.top + F.bottom) / 2, _ = a.findIndex((P) => x >= P.top && x <= P.bottom);
        _ < 0 && (_ = 0), v[_].xs.push(+(F.left - i).toFixed(2)), v[_].ys.push(+(F.top - s + w).toFixed(2)), v[_].chars += A;
      }
      v.forEach((M, $2) => {
        if (!M.chars) return;
        let F = M.chars.replace(/&/g, "&amp;").replace(/</g, "&lt;");
        d += `<text x="${M.xs.join(" ")}" y="${M.ys.join(" ")}" fill="url(#${u}-${$2})" style="font:${S};font-kerning:none;letter-spacing:0;white-space:pre">${F}</text>`;
      });
    }
    if (!d) return;
    let p = l.createElementNS(qa, "svg");
    p.setAttribute("style", "position:absolute;left:0;top:0;width:1px;height:1px;overflow:visible;pointer-events:none"), p.innerHTML = `<defs>${f}</defs>${d}`, o.position === "static" && e.style.setProperty("position", "relative", "important"), e.style.setProperty("color", "transparent", "important"), e.style.setProperty("-webkit-text-fill-color", "transparent", "important"), e.insertBefore(p, e.firstChild);
  }
  function Ya(t, e, n) {
    if (!t || t?.nodeType !== 1) return;
    let o = t.ownerDocument || document, r = e || o, i = Nt(t) && t.localName === "svg" ? [t] : Array.from(t.querySelectorAll("svg")), s = /url\(\s*["']?\s*#([^)"']+)/g, a = ["fill", "stroke", "filter", "clip-path", "mask", "marker", "marker-start", "marker-mid", "marker-end"], l = (C) => window.CSS && CSS.escape ? CSS.escape(C) : C.replace(/[^a-zA-Z0-9_-]/g, "\\$&"), u = "http://www.w3.org/1999/xlink", c = (C) => {
      if (!C || !C.getAttribute) return null;
      let M = C.getAttribute("href") || C.getAttribute("xlink:href") || (typeof C.getAttributeNS == "function" ? C.getAttributeNS(u, "href") : null);
      if (M) return M;
      let $2 = C.attributes;
      if (!$2) return null;
      for (let F = 0; F < $2.length; F++) {
        let A = $2[F];
        if (!A || !A.name) continue;
        if (A.name === "href") return A.value;
        let x = A.name.indexOf(":");
        if (x !== -1 && A.name.slice(x + 1) === "href") return A.value;
      }
      return null;
    }, f = new Set(Array.from(t.querySelectorAll("[id]")).map((C) => C.id)), d = /* @__PURE__ */ new Set(), h = false, m = (C, M = null) => {
      if (!C) return;
      s.lastIndex = 0;
      let $2;
      for (; $2 = s.exec(C); ) {
        h = true;
        let F = ($2[1] || "").trim();
        F && (f.has(F) || (d.add(F), M && !M.has(F) && M.add(F)));
      }
    }, g = (C) => {
      let M = C.querySelectorAll("use");
      for (let A of M) {
        let x = c(A);
        if (!x || !x.startsWith("#")) continue;
        h = true;
        let _ = x.slice(1).trim();
        _ && !f.has(_) && d.add(_);
      }
      let $2 = '*[style*="url("],*[fill^="url("], *[stroke^="url("],*[filter^="url("],*[clip-path^="url("],*[mask^="url("],*[marker^="url("],*[marker-start^="url("],*[marker-mid^="url("],*[marker-end^="url("]';
      m(C.getAttribute("style") || "");
      for (let A of a) m(C.getAttribute(A));
      let F = C.querySelectorAll($2);
      for (let A of F) {
        m(A.getAttribute("style") || "");
        for (let x of a) m(A.getAttribute(x));
      }
    }, p = (C) => {
      if (!C || C.nodeType !== 1 || !C.querySelectorAll) return;
      let M = "filter[id],clipPath[id],mask[id],linearGradient[id],radialGradient[id],pattern[id]", $2 = false;
      try {
        $2 = !!(r.querySelector && r.querySelector(M));
      } catch {
        return;
      }
      if (!$2) return;
      let F = ["filter", "clipPath", "mask", "maskImage", "webkitMaskImage"], A = (x) => {
        if (Nt(x)) return;
        let _;
        try {
          _ = getComputedStyle(x);
        } catch {
          return;
        }
        for (let P of F) {
          let E = _[P];
          E && E.includes("url(") && m(E);
        }
      };
      A(C);
      for (let x of C.querySelectorAll("*")) A(x);
    };
    for (let C of i) g(C);
    if (p(n), !h) return;
    let y = t.querySelector("svg.inline-defs-container");
    y || (y = o.createElementNS("http://www.w3.org/2000/svg", "svg"), y.classList.add("inline-defs-container"), y.setAttribute("aria-hidden", "true"), y.setAttribute("style", "position:absolute;width:0;height:0;overflow:hidden"), t.insertBefore(y, t.firstChild || null));
    let b = y.querySelector("defs") || null, w = (C) => {
      if (!C || f.has(C)) return null;
      let M = l(C), $2 = (F) => {
        let A = r.querySelector(F);
        return A && !t.contains(A) ? A : null;
      };
      return $2(`svg defs > *#${M}`) || $2(`svg > symbol#${M}`) || $2(`*#${M}`);
    };
    if (!d.size) return;
    let S = new Set(d), v = /* @__PURE__ */ new Set();
    for (; S.size; ) {
      let C = S.values().next().value;
      if (S.delete(C), !C || f.has(C) || v.has(C)) continue;
      let M = w(C);
      if (!M) {
        v.add(C);
        continue;
      }
      b || (b = o.createElementNS("http://www.w3.org/2000/svg", "defs"), y.appendChild(b));
      let $2 = M.cloneNode(true);
      $2.id || $2.setAttribute("id", C), b.appendChild($2), v.add(C), f.add(C);
      let F = [$2, ...$2.querySelectorAll("*")];
      for (let A of F) {
        let x = c(A);
        if (x && x.startsWith("#")) {
          let P = x.slice(1).trim();
          P && !f.has(P) && !v.has(P) && S.add(P);
        }
        let _ = A.getAttribute?.("style") || "";
        _ && m(_, S);
        for (let P of a) {
          let E = A.getAttribute?.(P);
          E && m(E, S);
        }
      }
    }
  }
  function Co(t, e, n) {
    let o = n.get(t), r = t.style;
    if (!o) {
      let s = r.cssText, a = t.hasAttribute("style");
      o = { users: 0, saved: e.map(([u, c]) => {
        let f = { property: u, value: r.getPropertyValue(u), priority: r.getPropertyPriority(u) };
        return r.setProperty(u, c, "important"), f.forcedValue = r.getPropertyValue(u), f;
      }), originalCSS: s, forcedCSS: r.cssText, hadStyle: a }, n.set(t, o);
    }
    o.users++;
    let i = false;
    return () => {
      if (!i && (i = true, !--o.users)) {
        if (n.delete(t), r.cssText === o.forcedCSS) r.cssText = o.originalCSS;
        else for (let s of o.saved) r.getPropertyValue(s.property) !== s.forcedValue || r.getPropertyPriority(s.property) !== "important" || (s.value ? r.setProperty(s.property, s.value, s.priority) : r.removeProperty(s.property));
        !o.hadStyle && !r.length && (t.getAttribute("style"), t.removeAttribute("style"));
      }
    };
  }
  function Ka(t) {
    if (Gr.has(t)) return Co(t, [], Gr);
    let e = getComputedStyle(t), n = e.outlineStyle, o = e.outlineWidth, r = n !== "none" && parseFloat(o) > 0, i = parseFloat(e.borderTopWidth) === 0 && parseFloat(e.borderRightWidth) === 0 && parseFloat(e.borderBottomWidth) === 0 && parseFloat(e.borderLeftWidth) === 0;
    if (r && i) {
      let s = [];
      for (let a of ["top", "right", "bottom", "left"]) s.push([`border-${a}-width`, o], [`border-${a}-style`, "solid"], [`border-${a}-color`, "transparent"]);
      return Co(t, s, Gr);
    }
    return () => {
    };
  }
  function ko(t, e = null) {
    let n = [], o = (r) => {
      if (!Pt(r)) return;
      if (qr.has(r)) {
        n.push(Co(r, [], qr));
        return;
      }
      let i = getComputedStyle(r);
      (i.contentVisibility || i.getPropertyValue("content-visibility") || "") === "auto" && n.push(Co(r, [["content-visibility", "visible"]], qr));
    };
    try {
      if (e) {
        let i = (s) => {
          let a;
          try {
            a = s.getBoundingClientRect();
          } catch {
            return;
          }
          if (!((a.width > 0 || a.height > 0) && (a.right < e.left - 200 || a.left > e.right + 200 || a.bottom < e.top - 200 || a.top > e.bottom + 200))) {
            o(s);
            for (let l = s.firstElementChild; l; l = l.nextElementSibling) i(l);
          }
        };
        i(t);
      } else {
        for (let r of t.querySelectorAll("*")) o(r);
        o(t);
      }
    } catch {
    }
    return () => {
      for (let r of n) try {
        r();
      } catch {
      }
    };
  }
  async function pl(t, e = {}) {
    Ut(), eo(t.ownerDocument || document);
    let n = e.__session || { styleMap: /* @__PURE__ */ new Map(), styleCache: /* @__PURE__ */ new WeakMap(), nodeMap: /* @__PURE__ */ new Map() }, o = { styleMap: n.styleMap, styleCache: n.styleCache, nodeMap: n.nodeMap, options: e, slicer: e.__slicer || null }, r = null, i = null, s = null;
    if (e.clip && (i = Mo(t, e.clip), i && (o.clip = { rect: i, root: t })), e.captureSelection) try {
      o.selection = ca(t);
    } catch (p) {
      D(o, "Couldn't read the text selection.", p);
    }
    let a, l = "", u = "";
    if (Eo.size) {
      let p = (y, b) => {
        for (let w = b; w; w = w.assignedSlot || w.parentElement || Bt(w)) if (w === y) return true;
        return false;
      };
      for (; ; ) {
        let y = [...Eo].filter(({ root: b }) => p(b, t) || p(t, b)).map(({ promise: b }) => b.catch(() => {
        }));
        if (!y.length) break;
        await Promise.all(y);
      }
    }
    if (!o.clip && t.isConnected && t.ownerDocument?.visibilityState !== "hidden") try {
      let p = t.getBoundingClientRect(), y = t.ownerDocument?.defaultView || window, b = p.right <= 0 || p.bottom <= 0 || p.left >= y.innerWidth || p.top >= y.innerHeight, w = [];
      if (b && (() => {
        let v = [];
        t.shadowRoot && v.push(t.shadowRoot);
        for (let C of t.querySelectorAll("*")) C.shadowRoot && v.push(C.shadowRoot);
        for (; v.length; ) {
          let C = v.pop(), M = C.host?.localName === "calcite-icon";
          for (let $2 of C.querySelectorAll("*")) {
            if ($2.shadowRoot && v.push($2.shadowRoot), !M || $2.localName !== "svg") continue;
            let F = $2.querySelectorAll("path");
            if (!F.length || [...F].some((x) => x.getAttribute("d")?.trim())) continue;
            let A = $2.getBoundingClientRect();
            A.width && A.height && w.push($2);
          }
        }
      })(), w.length) {
        let v = (async () => {
          let M = t.style, $2 = t.hasAttribute("style"), F = /* @__PURE__ */ new Map(), A = (x, _) => {
            F.has(x) || F.set(x, { value: M.getPropertyValue(x), priority: M.getPropertyPriority(x) }), M.setProperty(x, _, "important");
            let P = F.get(x);
            P.forcedValue = M.getPropertyValue(x), P.forcedPriority = M.getPropertyPriority(x);
          };
          try {
            A("left", "0"), A("top", "0"), A("right", "auto"), A("bottom", "auto"), A("margin-top", "0"), A("margin-right", "0"), A("margin-bottom", "0"), A("margin-left", "0"), A("transform", "none"), A("translate", "none"), A("opacity", "0"), A("pointer-events", "none");
            let x = t.getBoundingClientRect();
            if (x.right <= 0 || x.bottom <= 0 || x.left >= y.innerWidth || x.top >= y.innerHeight) {
              let E = t.parentElement?.getBoundingClientRect(), R = E && E.right > 0 && E.left < y.innerWidth ? Math.max(0, E.left) : 0, L = E && E.bottom > 0 && E.top < y.innerHeight ? Math.max(0, E.top) : 0;
              A("position", "fixed"), A("left", `${R}px`), A("top", `${L}px`);
            }
            await Ct(100);
            let _ = Date.now() + 1500, P = () => w.some((E) => {
              if ([...E.querySelectorAll("path")].some((L) => L.getAttribute("d")?.trim())) return false;
              let R = E.getBoundingClientRect();
              return R.width && R.height && R.right > 0 && R.bottom > 0 && R.left < y.innerWidth && R.top < y.innerHeight;
            });
            for (; Date.now() < _ && P(); ) await new Promise((E) => setTimeout(E, 25));
            await Ct(100);
          } finally {
            for (let [x, _] of F) M.getPropertyValue(x) !== _.forcedValue || M.getPropertyPriority(x) !== _.forcedPriority || (_.value ? M.setProperty(x, _.value, _.priority) : M.removeProperty(x));
            !$2 && !M.length && t.removeAttribute("style"), await Ct(100);
          }
        })(), C = { root: t, promise: v };
        Eo.add(C);
        try {
          await v;
        } finally {
          Eo.delete(C);
        }
      }
    } catch {
    }
    let c = Ka(t), f = ko(t, i);
    if (i) {
      let p = t.getBoundingClientRect(), y = t.offsetWidth || p.width, b = t.offsetHeight || p.height, w = p.width && Math.abs(y - p.width) >= 1 ? y / p.width : 1, S = p.height && Math.abs(b - p.height) >= 1 ? b / p.height : 1;
      r = { x: (i.left - p.left) * w, y: (i.top - p.top) * S, width: i.width * w, height: i.height * S };
    }
    try {
      a = await ue(t, o, e), s = va(a, o, e);
    } catch (p) {
      throw D(o, "Capture failed while copying the element.", p), p;
    } finally {
      f(), c();
    }
    aa(o.nodeMap, t.ownerDocument || document), o.slicer?.due() && await o.slicer.pause();
    try {
      Ya(a, void 0, t);
    } catch (p) {
      nt(n, "svg-defs-failed", "external <use> references failed to inline", p), D(o, "Couldn't copy external SVG icons; some may be missing.", p);
    }
    try {
      await Ze(t, a, o, e);
    } catch (p) {
      nt(n, "pseudo-failed", "::before/::after pass failed", p), D(o, "Couldn't copy ::before/::after content; some decorations may be missing.", p);
    }
    o.bgClipText && Xa(o.bgClipText), await io(a, o);
    for (let [p, y] of o.nodeMap.entries()) if (y?.tagName === "STYLE" && p?.tagName === "STYLE" && !p.hasAttribute("data-sd")) try {
      let b = y.sheet && y.sheet.cssRules;
      b && /@media/i.test(p.textContent || "") && (p.textContent = Ce(b));
    } catch {
    }
    try {
      let p = a.querySelectorAll("style[data-sd]");
      for (let y of p) u += y.textContent || "", y.remove();
    } catch (p) {
      D(o, "Couldn't copy shadow DOM styles.", p);
    }
    o.slicer?.due() && await o.slicer.pause();
    let d = yn(o.styleMap);
    l = Array.from(d.entries()).map(([p, y]) => `.${y}{${p}}`).join("");
    let m = u + "[data-snapdom-has-after]::after,[data-snapdom-has-before]::before{content:none!important;display:none!important}" + (o.__usesPlaceholder ? hp : "") + (o.__pseudoCSS || "");
    l = m + l;
    for (let [p, y] of o.styleMap.entries()) ai(p, y, d);
    try {
      mp(t, a, o.nodeMap);
    } catch (p) {
      D(o, "Couldn't bring an open dialog or popover into the capture.", p);
    }
    if ((o.clip || t.scrollTop || t.scrollLeft) && a?.nodeType === 1) try {
      let p = o.clip && r ? { x: r.x, y: r.y } : { x: 0, y: 0 };
      il(t, a, o.nodeMap, o.styleCache, p);
    } catch (p) {
      D(o, "Couldn't keep fixed-position elements in place.", p);
    }
    for (let [p, y] of o.nodeMap.entries()) o.clip && y === t && t === t.ownerDocument.scrollingElement || li(p, y, o.nodeMap, o.styleCache);
    let g = t.ownerDocument;
    if ((t === g.body || t === g.documentElement) && g.documentElement.localName === "html") {
      let p = o.styleCache.get(g.documentElement) || O(g.documentElement);
      t === g.documentElement && (a.style.overflow = "visible");
      let y = t === g.body ? a : a.querySelector("body");
      if (y && p.overflowX === "visible" && p.overflowY === "visible" && p.contain === "none" && !p.containerType?.includes("size") && p.contentVisibility !== "auto" && p.contentVisibility !== "hidden") {
        let b = o.styleCache.get(g.body) || O(g.body);
        b.contain === "none" && !b.containerType?.includes("size") && b.contentVisibility !== "auto" && b.contentVisibility !== "hidden" && b.display !== "none" && (y.style.overflow = "visible");
      }
    }
    if (t === o.nodeMap.get(a)) {
      let p = o.styleCache.get(t) || O(t);
      o.styleCache.set(t, p);
      let y = sr(p.transform);
      if (a.style.margin = "0", a.style.top = "auto", a.style.left = "auto", a.style.right = "auto", a.style.bottom = "auto", a.style.animation = "none", a.style.transition = "none", a.style.willChange = "auto", a.style.float = "none", a.style.clear = "none", a.style.placeSelf = "normal", a.style.transform = y || "", a.style.translate = "none", (/^inline-/.test(p.display) || p.display === "inline" && pp.test(t.tagName)) && (a.style.verticalAlign = "top"), dl(t, a, p), !a.hasAttribute("lang")) {
        let b = t.closest?.("[lang]")?.getAttribute("lang") ?? t.ownerDocument?.documentElement?.getAttribute("lang");
        b && a.setAttribute("lang", b);
      }
    }
    for (let [p, y] of o.nodeMap.entries()) y.tagName === "PRE" && (p.style.marginTop = "0", p.style.marginBlockStart = "0");
    return { clone: a, classCSS: l, classPrefixCSS: m, styleCache: o.styleCache, nodeMap: o.nodeMap, reconcileRisk: o.reconcileRisk || 0, clipWindow: r, standIns: s, universe: qe(t, o) };
  }
  function mp(t, e, n) {
    let o = [];
    for (let s of [":modal", ":popover-open"]) try {
      o.push(...t.querySelectorAll(s));
    } catch {
    }
    if (!o.length) return;
    let r = /* @__PURE__ */ new Map();
    for (let [s, a] of n.entries()) r.set(a, s);
    let i = 214748e4;
    for (let s of o) {
      let a = r.get(s);
      if (!(!a || a === e || a.parentNode == null)) {
        try {
          let l = getComputedStyle(s, "::backdrop"), u = l.backgroundColor, c = l.backgroundImage;
          if (u && u !== "rgba(0, 0, 0, 0)" && u !== "transparent" || c && c !== "none") {
            let d = document.createElement("div");
            d.setAttribute("data-sd-backdrop", ""), d.style.cssText = `position:fixed;inset:0;z-index:${i};background-color:${u};` + (c && c !== "none" && c.includes("data:") ? `background-image:${c};` : ""), e.appendChild(d);
          }
        } catch {
        }
        i += 1, a.style.zIndex = String(i), e.appendChild(a), i += 1;
      }
    }
  }
  function ai(t, e, n) {
    if (t.tagName === "STYLE") return;
    if (t.getRootNode && Jt(t.getRootNode())) {
      t.setAttribute("style", e.replace(/;/g, "; "));
      return;
    }
    let o = n.get(e);
    o && t.classList.add(o);
    let r = t.style?.backgroundImage;
    r && r !== "none" && (t.style.backgroundImage = r);
  }
  function li(t, e, n, o) {
    let r = e.scrollLeft, i = e.scrollTop;
    if (!(r || i) || t?.nodeType !== 1 || t.namespaceURI !== "http://www.w3.org/1999/xhtml") return;
    t.style.overflow = "hidden", t.style.scrollbarWidth = "none", t.style.msOverflowStyle = "none";
    try {
      let c = t.querySelectorAll("*");
      for (let f of c) {
        if (f.nodeType !== 1 || f.namespaceURI !== "http://www.w3.org/1999/xhtml") continue;
        let d = n?.get(f), h = d && (o?.get(d) || O(d)), m = f.style.position || h?.position;
        if (m !== "fixed" && m !== "absolute") continue;
        let g = h && h.position !== "absolute" && m === "absolute", p = null;
        if (d && !g) for (let w = d.parentElement || Bt(d); w; w = w.parentElement || Bt(w)) {
          let S = o?.get(w) || O(w);
          if (m === "absolute" && S.position !== "static" || S.transform && S.transform !== "none" || S.translate && S.translate !== "none" || S.rotate && S.rotate !== "none" || S.scale && S.scale !== "none" || S.filter && S.filter !== "none" || S.backdropFilter && S.backdropFilter !== "none" || S.perspective && S.perspective !== "none" || /transform|perspective|filter/.test(S.willChange || "") || /layout|paint|strict|content/.test(S.contain || "")) {
            p = w;
            break;
          }
          if (w === e) break;
        }
        if (p) {
          p === e && (f.style.top = h.top, f.style.left = h.left, f.style.right = h.right, f.style.bottom = h.bottom);
          continue;
        }
        let y = parseFloat(f.style.top || h?.top) || 0, b = parseFloat(f.style.left || h?.left) || 0;
        f.style.top = `${y + i}px`, f.style.left = `${b + r}px`, m === "fixed" && (f.style.position = "absolute");
      }
    } catch {
    }
    let a = document.createElement("div");
    a.style.all = "unset", a.style.direction = "inherit", a.style.transform = `translate(${-r}px, ${-i}px)`, a.style.willChange = "transform";
    let l = (o?.get(e) || O(e)).display, u = l.includes("grid") ? "grid" : l.includes("flex") ? "flex" : "";
    if (u) {
      t.style.display = l.startsWith("inline") ? "inline-block" : "block", a.style.display = u;
      for (let c of gp) a.style.setProperty(c, "inherit");
    } else a.style.display = "inline-block";
    for (a.style.width = "100%"; t.firstChild; ) a.appendChild(t.firstChild);
    t.appendChild(a);
  }
  function yp(t) {
    return t.getAttribute("href") || t.getAttribute("xlink:href") || (typeof t.getAttributeNS == "function" ? t.getAttributeNS(hl, "href") : null);
  }
  function bp(t) {
    let e = parseFloat(t.dataset?.snapdomWidth || "") || 0, n = parseFloat(t.dataset?.snapdomHeight || "") || 0, o = parseInt(t.getAttribute("width") || "", 10) || 0, r = parseInt(t.getAttribute("height") || "", 10) || 0, i = parseFloat(t.style?.width || "") || 0, s = parseFloat(t.style?.height || "") || 0, a = e || i || o || t.width || t.naturalWidth || 100, l = n || s || r || t.height || t.naturalHeight || 100;
    return { width: a, height: l };
  }
  async function Ro(t, e = {}) {
    let n = Array.from(t.querySelectorAll("img"));
    t.tagName === "IMG" && n.unshift(t);
    let o = async (a) => {
      if (!a.getAttribute("src")) {
        let g = a.currentSrc || a.src || Ye(a.getAttribute("srcset"), a) || "";
        g && a.setAttribute("src", g);
      }
      if (a.removeAttribute("srcset"), a.removeAttribute("sizes"), (a.getAttribute("src") || "").startsWith("data:")) {
        a.width || (a.width = a.naturalWidth || 100), a.height || (a.height = a.naturalHeight || 100);
        return;
      }
      let l = a.src || "";
      if (!l) return;
      let u = j.image?.get(l);
      if (u) {
        a.src = u, a.width || (a.width = a.naturalWidth || 100), a.height || (a.height = a.naturalHeight || 100);
        return;
      }
      let c = await ut(l, { as: "dataURL", useProxy: e.useProxy, debug: e.debug });
      if (c.ok && typeof c.data == "string" && c.data.startsWith("data:")) {
        j.image?.set(l, c.data), a.src = c.data, c.blob && (a.__snapdomBlob = c.blob), a.width || (a.width = a.naturalWidth || 100), a.height || (a.height = a.naturalHeight || 100);
        return;
      }
      let { width: f, height: d } = bp(a), { fallbackURL: h } = e || {};
      if (h) try {
        let g = typeof h == "function" ? await h({ width: f, height: d, src: l, element: a }) : h;
        if (g) {
          let p = await ut(g, { as: "dataURL", useProxy: e.useProxy, debug: e.debug });
          if (p?.ok && typeof p.data == "string") {
            a.src = p.data, a.width || (a.width = f), a.height || (a.height = d);
            return;
          }
        }
      } catch {
      }
      let m = "";
      e.placeholders !== false && (nt(e.__session, "image-fallback", `image failed to inline, using placeholder: ${l}`), m = '<rect width="100%" height="100%" fill="#ccc"/><text x="50%" y="50%" fill="#666" font-family="sans-serif" font-size="12" text-anchor="middle" dominant-baseline="central">img</text>'), a.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="${f}" height="${d}">${m}</svg>`)}`, a.width || (a.width = f), a.height || (a.height = d);
    }, r = 6;
    for (let a = 0; a < n.length; a += r) {
      let l = n.slice(a, a + r).map(o);
      await Promise.allSettled(l);
    }
    let i = Array.from(t.querySelectorAll("image"));
    t.localName === "image" && i.unshift(t);
    let s = async (a) => {
      let l = yp(a);
      if (!l || l.startsWith("data:") || l.startsWith("blob:")) return;
      let u = await ut(l, { as: "dataURL", useProxy: e.useProxy, debug: e.debug });
      u.ok && typeof u.data == "string" && u.data.startsWith("data:") && (a.setAttribute("href", u.data), a.removeAttribute("xlink:href"), typeof a.removeAttributeNS == "function" && a.removeAttributeNS(hl, "href"));
    };
    for (let a = 0; a < i.length; a += r) {
      let l = i.slice(a, a + r).map(s);
      await Promise.allSettled(l);
    }
  }
  async function Cp(t, e, n, o) {
    let r = n.get(t) || O(t);
    n.has(t) || n.set(t, r);
    let i = _s(t), s = i ? (m) => m in i ? i[m] : "" : (m) => r.getPropertyValue(m), a = s("border-image"), l = s("border-image-source"), u = a && a !== "none" || l && l !== "none", c = r.getPropertyValue("background-image"), f = s("background-color"), d = c && c !== "none" || f && f !== "rgba(0, 0, 0, 0)" && f !== "transparent" || /url\s*\(|gradient\s*\(/i.test(r.getPropertyValue("background") || ""), h = _t() && (s("background-clip") || s("-webkit-background-clip") || "").includes("text");
    if (d && !h) for (let m of Sp) {
      let g = s(m);
      g && e.style.setProperty(m, g);
    }
    for (let m of wp) {
      if (h && m === "background-image") continue;
      let g = r.getPropertyValue(m);
      if (m === "background-image" && (!g || g === "none")) {
        let b = r.getPropertyValue("background");
        b && /url\s*\(/.test(b) && (g = se(b).filter((w) => /url\s*\(/.test(w)).join(", ") || g);
      }
      if (!g || g === "none") continue;
      let p = se(g), y = await Promise.all(p.map((b) => Ie(b, o)));
      y.some((b) => b && b !== "none" && !/^url\(undefined/.test(b)) && e.style.setProperty(m, y.join(", "));
    }
    for (let m of xp) {
      let g = s(m);
      !g || g === "initial" || e.style.setProperty(m, g);
    }
    if (u) for (let m of vp) {
      let g = s(m);
      !g || g === "initial" || e.style.setProperty(m, g);
    }
    if (d && /fixed/.test(s("background-attachment") || "")) try {
      await Mp(t, e, r);
    } catch {
    }
  }
  function kp(t, e, n, o, r) {
    let i = (t || "auto").trim();
    if (i === "cover" || i === "contain") {
      if (!e || !n) return { w: o, h: r };
      let d = i === "cover" ? Math.max(o / e, r / n) : Math.min(o / e, r / n);
      return { w: e * d, h: n * d };
    }
    let s = i.split(/\s+/), a = (d, h) => {
      if (d === "auto" || d === void 0) return null;
      if (d.endsWith("px")) return parseFloat(d);
      if (d.endsWith("%")) return h * parseFloat(d) / 100;
    }, l = a(s[0], o), u = a(s[1], r);
    if (l === void 0 || u === void 0) return null;
    let c = l, f = u;
    return c == null && f == null ? (c = e || o, f = n || r) : c == null ? c = e && n ? f * (e / n) : o : f == null && (f = e && n ? c * (n / e) : r), !c || !f ? null : { w: c, h: f };
  }
  async function Mp(t, e, n) {
    let o = (n.getPropertyValue("background-attachment") || "").split(",").map((m) => m.trim()), r = xn();
    if (!r) for (let m = t.parentElement; m && !r; m = m.parentElement) {
      let g = O(m);
      (g.transform && g.transform !== "none" || g.filter && g.filter !== "none") && (r = true);
    }
    if (r) {
      e.style.setProperty("background-attachment", o.map(() => "scroll").join(", "));
      return;
    }
    let i = t.getBoundingClientRect(), s = t.ownerDocument?.defaultView || window, a = s.innerWidth, l = s.innerHeight, u = se(e.style.backgroundImage || n.getPropertyValue("background-image") || ""), c = (e.style.backgroundSize || n.getPropertyValue("background-size") || "auto").split(",").map((m) => m.trim()), f = (e.style.backgroundPosition || n.getPropertyValue("background-position") || "0% 0%").split(",").map((m) => m.trim()), d = [], h = [];
    for (let m = 0; m < u.length; m++) {
      let g = o[m % o.length] || "scroll", p = c[m % c.length], y = f[m % f.length];
      if (g !== "fixed") {
        d.push(p), h.push(y);
        continue;
      }
      let b = 0, w = 0, S = u[m] && u[m].match(/url\(["']?([^"')]+)["']?\)/);
      if (S) try {
        let A = new Image();
        A.src = S[1], await A.decode(), b = A.naturalWidth, w = A.naturalHeight;
      } catch {
        d.push(p), h.push(y);
        continue;
      }
      let v = kp(p, b, w, a, l);
      if (!v) {
        d.push(p), h.push(y);
        continue;
      }
      let C = y.split(/\s+/), M = (A, x, _) => {
        if (!A) return 0;
        if (A.endsWith("px")) return parseFloat(A);
        if (A.endsWith("%")) return (x - _) * parseFloat(A) / 100;
      }, $2 = M(C[0] || "0%", a, v.w), F = M(C[1] || C[0] || "0%", l, v.h);
      if ($2 === void 0 || F === void 0) {
        d.push(p), h.push(y);
        continue;
      }
      d.push(`${Fo(v.w)}px ${Fo(v.h)}px`), h.push(`${Fo($2 - i.left)}px ${Fo(F - i.top)}px`);
    }
    e.style.setProperty("background-size", d.join(", ")), e.style.setProperty("background-position", h.join(", ")), e.style.setProperty("background-attachment", o.map(() => "scroll").join(", "));
  }
  async function $o(t, e, n, o = {}, r = /* @__PURE__ */ new Map()) {
    if (!e) return;
    let i = [];
    t && Tr(t) && i.push([t, e]);
    let s = [e];
    for (; s.length; ) {
      let l = s.pop();
      if (l.children) for (let u of l.children) {
        if (u.tagName === "STYLE") continue;
        let c = r.get(u);
        c && Tr(c) && i.push([c, u]), s.push(u);
      }
    }
    let a = 6;
    for (let l = 0; l < i.length; l += a) await Promise.allSettled(i.slice(l, l + a).map(([u, c]) => Cp(u, c, n, o)));
  }
  function gl(t, e, n = /* @__PURE__ */ new Map()) {
    let o = [], r = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT);
    for (let a = r.currentNode; a; a = r.nextNode()) {
      let l = n.get(a);
      if (l?.nodeType !== 1) continue;
      let u = O(l), c = u.getPropertyValue("backdrop-filter") || u.getPropertyValue("-webkit-backdrop-filter");
      c && c !== "none" && a !== e && o.push({ cloneEl: a, orig: l, bf: c, path: Rp(e, a) });
    }
    if (!o.length) return;
    let i = t.getBoundingClientRect(), s = o.map((a, l) => {
      let u = e.cloneNode(true);
      Ep(u, e, a.orig.getBoundingClientRect(), n), Fp(ml(u, a.path));
      for (let c = 0; c < l; c++) {
        let f = ml(u, o[c].path);
        f && (f.style.setProperty("backdrop-filter", "none", "important"), f.style.setProperty("-webkit-backdrop-filter", "none", "important"));
      }
      return { ...a, copy: u };
    });
    for (let { cloneEl: a, orig: l, bf: u, copy: c } of s) Ap.has(a.tagName) || _p(a, l, u, c, i);
  }
  function _p(t, e, n, o, r) {
    let i = e.getBoundingClientRect();
    if (!i.width || !i.height) return;
    let s = O(e), a = e.offsetWidth ? i.width / e.offsetWidth : 1, l = Math.abs(a - 1) > 1e-3 ? 1 / a : 1;
    o.style.position = "absolute", o.style.left = `${(r.left - i.left) * l}px`, o.style.top = `${(r.top - i.top) * l}px`, o.style.width = `${r.width}px`, o.style.height = `${r.height}px`, o.style.margin = "0", o.style.filter = n, l !== 1 && (o.style.transform = `scale(${l})`, o.style.transformOrigin = "top left");
    let u = document.createElement("div");
    u.style.cssText = "position:absolute;inset:0;overflow:hidden;border-radius:inherit;z-index:-2", u.appendChild(o);
    let c = document.createElement("div");
    c.style.cssText = "position:absolute;inset:0;border-radius:inherit;z-index:-1", c.style.backgroundColor = s.backgroundColor, c.style.backgroundImage = t.style.backgroundImage || s.backgroundImage;
    for (let f of ["background-size", "background-position", "background-repeat", "background-origin", "background-clip"]) c.style.setProperty(f, s.getPropertyValue(f));
    t.style.setProperty("background-color", "transparent", "important"), t.style.setProperty("background-image", "none", "important"), t.style.setProperty("backdrop-filter", "none", "important"), t.style.setProperty("-webkit-backdrop-filter", "none", "important"), s.position === "static" && (t.style.position = "relative"), t.style.isolation = "isolate", t.prepend(c), t.prepend(u);
  }
  function Ep(t, e, n, o) {
    let r = [[t, e]];
    for (; r.length; ) {
      let [i, s] = r.pop(), a = o.get(s);
      if (a?.nodeType === 1) {
        let c = a.getBoundingClientRect();
        (c.left > n.right + To || c.right < n.left - To || c.top > n.bottom + To || c.bottom < n.top - To) && (i.tagName === "IMG" && i.setAttribute("src", "data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA="), i.style && (i.style.backgroundImage = "none"));
      }
      let l = i.children, u = s.children;
      for (let c = 0; c < l.length; c++) r.push([l[c], u[c]]);
    }
  }
  function Rp(t, e) {
    let n = [];
    for (let o = e; o !== t; o = o.parentElement) {
      if (!o?.parentElement) return null;
      n.push([...o.parentElement.children].indexOf(o));
    }
    return n.reverse();
  }
  function ml(t, e) {
    if (!e) return null;
    let n = t;
    for (let o of e) if (n = n.children[o], !n) return null;
    return n;
  }
  function Fp(t) {
    if (t) for (let e = t; e && e.parentNode; ) {
      let n = e.parentNode;
      for (; e.nextSibling; ) e.nextSibling.remove();
      e === t && e.remove(), e = n;
    }
  }
  function ci(t) {
    return Yi(t), { styleMap: /* @__PURE__ */ new Map(), styleCache: /* @__PURE__ */ new WeakMap(), nodeMap: /* @__PURE__ */ new Map(), warnings: [] };
  }
  function Po(t, e) {
    if (!t) return () => {
    };
    let n = [], o = 200;
    function r(i) {
      if (e) {
        let u = i.getBoundingClientRect();
        if (u.width > 0 || u.height > 0) {
          let c = Math.max(u.right, u.left + (i.scrollWidth || 0)), f = Math.max(u.bottom, u.top + (i.scrollHeight || 0));
          if (c < e.left - o || u.left > e.right + o || f < e.top - o || u.top > e.bottom + o) return;
        }
      }
      let s = getComputedStyle(i), a = $p(i, s);
      a && n.push(a);
      let l = Tp(i, s);
      l && n.push(l);
      for (let u of i.children || []) r(u);
    }
    return r(t), () => n.forEach((i) => i());
  }
  function $p(t, e) {
    if (!t) return () => {
    };
    e = e || getComputedStyle(t);
    let n = Lp(e);
    if (n <= 0) return () => {
    };
    if (!Sl(t)) return () => {
    };
    let o = xl(t), r = o.text, i = Wp(e);
    o.write("X");
    let s = t.scrollHeight - i;
    o.restore();
    let a = s > 0 ? s : Ip(e), l = Math.round(a * n + i), u = 0.5 * (n + 1);
    if (t.scrollHeight <= l + u) return () => {
    };
    let c = 0, f = r.length, d = -1;
    for (; c <= f; ) {
      let m = c + f >> 1;
      o.write(r.slice(0, fi(r, m)) + "\u2026"), t.scrollHeight <= l + u ? (d = m, c = m + 1) : f = m - 1;
    }
    let h = (d >= 0 ? r.slice(0, fi(r, d)) : "") + "\u2026";
    return o.write(h), wl(t, h, o);
  }
  function Tp(t, e) {
    if (!t) return () => {
    };
    if (e = e || getComputedStyle(t), e.textOverflow !== "ellipsis") return () => {
    };
    if (e.whiteSpace !== "nowrap" && e.whiteSpace !== "pre") return () => {
    };
    if (e.overflowX !== "hidden" && e.overflowX !== "clip") return () => {
    };
    if (!Sl(t)) return () => {
    };
    if (t.scrollWidth <= t.clientWidth + 0.5) return () => {
    };
    let n = xl(t), o = n.text, r = Np(t, e, n.nodes), i = (c) => {
      if (!r) {
        let d = fi(o, c);
        return o.slice(0, d) + bl(o, d) + "\u2026";
      }
      let f = Pp(o, o.length - c);
      return bl(o, f) + o.slice(f) + "\u2026";
    }, s = 0, a = o.length, l = -1;
    for (; s <= a; ) {
      let c = s + a >> 1;
      n.write(i(c)), t.scrollWidth <= t.clientWidth + 0.5 ? (l = c, s = c + 1) : a = c - 1;
    }
    let u = l >= 0 ? i(l) : "\u2026";
    return n.write(u), wl(t, u, n);
  }
  function wl(t, e, n) {
    return () => {
      t.textContent === e && n.restore();
    };
  }
  function xl(t) {
    let e = [];
    for (let o = t.firstChild; o; o = o.nextSibling) o.nodeType === Node.TEXT_NODE && e.push(o);
    let n = e.map((o) => o.data);
    return { nodes: e, text: n.join(""), write(o) {
      e[0].data = o;
      for (let r = 1; r < e.length; r++) e[r].data = "";
    }, restore() {
      for (let o = 0; o < e.length; o++) e[o].data = n[o];
    } };
  }
  function fi(t, e) {
    if (e <= 0 || e >= t.length) return e;
    let n = t.charCodeAt(e - 1);
    return n >= 55296 && n <= 56319 ? e - 1 : e;
  }
  function Pp(t, e) {
    if (e <= 0 || e >= t.length) return e;
    let n = t.charCodeAt(e);
    return n >= 56320 && n <= 57343 ? e - 1 : e;
  }
  function bl(t, e) {
    return e > 0 && e < t.length && yl.test(t[e - 1]) && yl.test(t[e]) && !Y() ? "\u200D" : "";
  }
  function Np(t, e, n) {
    let o = null, r = null;
    for (let p of n) {
      let y = p.data.search(/\S/);
      y < 0 || (o || (o = [p, y]), r = [p, p.data.length - p.data.trimEnd().length]);
    }
    if (!o) return false;
    let i = t.ownerDocument.createRange(), s = (p, y, b) => (i.setStart(p, y), i.setEnd(p, b), i.getBoundingClientRect()), [a, l] = o, [u, c] = r, f = u.data.length - c, d = s(a, l, Math.min(a.data.length, l + 1)), h = s(u, Math.max(0, f - 1), f), m = t.getBoundingClientRect();
    if (e.direction === "rtl") {
      let p = m.right - (parseFloat(e.borderRightWidth) || 0) - (parseFloat(e.paddingRight) || 0);
      return Math.abs(h.right - p) < Math.abs(d.right - p);
    }
    let g = m.left + (parseFloat(e.borderLeftWidth) || 0) + (parseFloat(e.paddingLeft) || 0);
    return Math.abs(h.left - g) < Math.abs(d.left - g);
  }
  function Lp(t) {
    let e = t.getPropertyValue("-webkit-line-clamp") || t.getPropertyValue("line-clamp");
    e = (e || "").trim();
    let n = parseInt(e, 10);
    return Number.isFinite(n) && n > 0 ? n : 0;
  }
  function Ip(t) {
    let e = (t.lineHeight || "").trim(), n = parseFloat(t.fontSize) || 16;
    return !e || e === "normal" ? Math.round(n * 1.2) : e.endsWith("px") ? parseFloat(e) : /^\d+(\.\d+)?$/.test(e) ? Math.round(parseFloat(e) * n) : e.endsWith("%") ? Math.round(parseFloat(e) / 100 * n) : Math.round(n * 1.2);
  }
  function Wp(t) {
    return (parseFloat(t.paddingTop) || 0) + (parseFloat(t.paddingBottom) || 0);
  }
  function Sl(t) {
    return t.childElementCount > 0 ? false : Array.from(t.childNodes).some((e) => e.nodeType === Node.TEXT_NODE);
  }
  function vl(t) {
    let e = Array.isArray(t && t.plugins) ? t.plugins : [];
    if (!e.length) return { stage: kt, loweredBy: [] };
    let n = -1, o = [];
    for (let i of e) {
      if (!i || typeof i != "object") continue;
      let s = i.needs === void 0 ? kt : i.needs;
      if (!Object.prototype.hasOwnProperty.call(In, s)) throw new Error(`[SnapDOM] Plugin '${i.name || "(unnamed)"}' declares needs: ${JSON.stringify(s)}, expected one of ${nn.join(", ")}.`);
      o.push({ name: i.name || "(unnamed)", needs: s }), n = Math.max(n, In[s]);
    }
    if (n < 0) return { stage: kt, loweredBy: [] };
    let r = nn[n];
    return { loweredBy: r === kt ? [] : o.filter((i) => i.needs === r).map((i) => i.name), stage: r };
  }
  function on(t, e) {
    return In[t] >= In[e];
  }
  function kl(t, e, n) {
    let o = e.length ? e.map((r) => `'${r}'`).join(", ") : "the attached plugins";
    return new Error(`[SnapDOM] No ${n}: this capture stopped at '${t}' because ${o} asked for needs: '${t}'. It is not re-captured, since that would be a different instant. Ask the plugin for needs: 'render', or capture without it.`);
  }
  function sn(t) {
    if (!t) return null;
    if (Array.isArray(t)) {
      let [e, n] = t;
      return typeof e == "function" ? e(n) : e;
    }
    if (typeof t == "object" && "plugin" in t) {
      let { plugin: e, options: n } = t;
      return typeof e == "function" ? e(n) : e;
    }
    return typeof t == "function" ? t() : t;
  }
  function ui(...t) {
    let e = t.flat();
    for (let n of e) {
      let o = sn(n);
      if (o) {
        if (o.needs !== void 0 && o.needs !== kt) throw new Error(`[SnapDOM] '${o.name || "(unnamed)"}' declares needs: ${JSON.stringify(o.needs)}, so it can't be a global plugin (it would stop every capture before '${kt}'). Pass it per capture: snapdom(el, { plugins: [...] }).`);
        rn.some((r) => r && r.name && o.name && r.name === o.name) || rn.push(o);
      }
    }
  }
  function Ml(t) {
    return t && Array.isArray(t.plugins) ? t.plugins : rn;
  }
  async function Zt(t, e, n) {
    let o = n, r = Ml(e);
    for (let i of r) {
      let s = i && typeof i[t] == "function" ? i[t] : null;
      if (!s) continue;
      let a = await s(e, o);
      typeof a < "u" && (o = a);
    }
    return o;
  }
  async function No(t, e, n) {
    let o = [], r = Ml(e);
    for (let i of r) {
      let s = i && typeof i[t] == "function" ? i[t] : null;
      if (!s) continue;
      let a = await s(e, n);
      typeof a < "u" && o.push(a);
    }
    return o;
  }
  function Bp(t) {
    let e = [];
    if (Array.isArray(t)) for (let n of t) {
      let o = sn(n);
      if (!o) continue;
      o.name || (o.name = `anonymous-${++Dp}`);
      let r = e.findIndex((i) => i && i.name === o.name);
      r >= 0 && e.splice(r, 1), e.push(o);
    }
    for (let n of rn) n && n.name && !e.some((o) => o.name === n.name) && e.push(n);
    return Object.freeze(e);
  }
  function Al(t, e, n = false) {
    return !t || t.plugins && !n || (t.plugins = Bp(e)), t;
  }
  function di() {
    return rn.slice();
  }
  function Lo(t) {
    let e = Array.isArray(t && t.plugins) ? t.plugins : [];
    for (let n of e) {
      let o = sn(n);
      if (!(!o || o.pure === true)) {
        for (let r of zp) if (typeof o[r] == "function") return true;
      }
    }
    return false;
  }
  function Wo(t, e, n, o, r, i) {
    let s = i.__compressedAssets || (i.__compressedAssets = /* @__PURE__ */ new WeakMap()), a = s.get(t);
    a || (a = { token: String(++Up), properties: [] }, s.set(t, a), t.setAttribute(_e, a.token));
    let l = a.properties.find((u) => u.kind === e && u.name === n);
    l ? (l.compressed !== o && (l.original = o), l.compressed = r) : a.properties.push({ kind: e, name: n, original: o, compressed: r });
  }
  function Oo(t, e) {
    let n = /* @__PURE__ */ new Map();
    if (!t || !e) return n;
    let o = [t, ...t.querySelectorAll(`[${_e}]`)];
    for (let r of o) {
      let i = e.get(r);
      if (!i || r.getAttribute(_e) !== i.token) continue;
      let s = i.properties.filter((a) => $l(r, a) === a.compressed).map((a) => Object.freeze({ ...a }));
      s.length && n.set(i.token, Object.freeze(s));
    }
    return n;
  }
  function Do(t, e) {
    if (!t || !e) return;
    let n = 0;
    for (let o of [t, ...t.querySelectorAll(`[${_e}]`)]) {
      let r = e.get(o);
      r && (r.token = String(++n), o.setAttribute(_e, r.token));
    }
  }
  function Tl(t, e) {
    if (!e?.size || typeof t != "string" || !t.startsWith("data:image/svg+xml")) return t;
    let n = t.indexOf(","), o = new DOMParser().parseFromString(decodeURIComponent(t.slice(n + 1)), "image/svg+xml");
    if (o.querySelector("parsererror")) return t;
    let r = false;
    for (let i of o.querySelectorAll(`[${_e}]`)) for (let s of e.get(i.getAttribute(_e)) || []) $l(i, s) === s.compressed && (s.kind === "style" ? i.style.setProperty(s.name, s.original, i.style.getPropertyPriority(s.name)) : s.name === "xlink:href" ? i.setAttributeNS(Fl, s.name, s.original) : i.setAttribute(s.name, s.original), r = true);
    return r ? `data:image/svg+xml;charset=utf-8,${encodeURIComponent(new XMLSerializer().serializeToString(o))}` : t;
  }
  function _l(t) {
    if (t.is2D === false) return 1 / 0;
    let e = t.a * t.a + t.b * t.b + t.c * t.c + t.d * t.d, n = t.a * t.d - t.b * t.c;
    return Math.sqrt((e + Math.sqrt(Math.max(0, e * e - 4 * n * n))) / 2);
  }
  function pi(t, e) {
    let n = e.element || t, o = n.isConnected ? O(n) : n.style, r = e.__compressionClip, i = (h, m) => {
      try {
        return h[m]?.baseVal?.value || 0;
      } catch {
        return 0;
      }
    }, s = r?.width || n.offsetWidth || parseFloat(o?.width) || i(n, "width"), a = r?.height || n.offsetHeight || parseFloat(o?.height) || i(n, "height"), l = Number.isFinite(e.width), u = Number.isFinite(e.height);
    if (!r && (l || u) && s && a) try {
      let h = e.outerTransforms === false && e.__compressionRootTransform ? e.__compressionRootTransform : de({ baseTransform: o?.transform, rotate: o?.rotate, scale: o?.scale, width: s, height: a });
      if (h.is2D === false) s = 0, a = 0;
      else {
        let m = Math.abs(h.a) * s + Math.abs(h.c) * a, g = Math.abs(h.b) * s + Math.abs(h.d) * a;
        s = Math.min(s, m), a = Math.min(a, g);
      }
    } catch {
      s = 0, a = 0;
    }
    let c = (l || u ? Math.max(l ? s ? e.width / s : 1 / 0 : 0, u ? a ? e.height / a : 1 / 0 : 0) : e.scale || 1) * (e.dpr || 1);
    e.__compressionDensity = c;
    let f = /* @__PURE__ */ new WeakMap(), d = (h) => {
      if (!h || h.nodeType !== 1) return 1;
      if (f.has(h)) return f.get(h);
      let m = h.isConnected ? O(h) : h.style, g = 1;
      try {
        m?.perspective && m.perspective !== "none" && (g = 1 / 0);
        let p = m?.transform;
        if (p && p !== "none") g *= _l(new DOMMatrix(p));
        else if (h.transform?.baseVal?.numberOfItems) {
          let y = new DOMMatrix();
          for (let b = 0; b < h.transform.baseVal.numberOfItems; b++) {
            let w = h.transform.baseVal.getItem(b).matrix;
            y = y.multiply(new DOMMatrix([w.a, w.b, w.c, w.d, w.e, w.f]));
          }
          g *= _l(y);
        }
        if (m?.scale && m.scale !== "none") {
          let y = m.scale.trim().split(/\s+/).map((b) => parseFloat(b) / (b.endsWith("%") ? 100 : 1));
          g *= Math.max(...y.map(Math.abs));
        }
        if (h !== n && m?.zoom && m.zoom !== "normal" && (g *= parseFloat(m.zoom) || 1), h.localName === "svg" && h.viewBox?.baseVal?.width > 0 && h.viewBox.baseVal.height > 0) {
          let y = h.viewBox.baseVal, b = (v) => /^\d+(?:\.\d+)?px$/.test(m?.[v] || "") ? parseFloat(m[v]) : i(h, v), w = b("width"), S = b("height");
          g *= w > 0 && S > 0 ? Math.max(w / y.width, S / y.height) : 1 / 0;
        }
      } catch {
        g = 1 / 0;
      }
      return Number.isFinite(g) || (g = 1 / 0), h !== n && (g *= d(h.parentElement || h.getRootNode?.().host)), f.set(h, g), g;
    };
    return { density: c, stretch: d };
  }
  async function Hp(t) {
    let e = new Image();
    return e.decoding = "sync", e.src = t, typeof e.decode == "function" ? (await e.decode(), e) : (await new Promise((n, o) => {
      e.onload = () => n(), e.onerror = o;
    }), e);
  }
  function jp(t) {
    let e = /^data:([^;,]+)/.exec(t);
    return e ? e[1] : "";
  }
  function Gp(t, e, n, o) {
    if (n.length + (o?.length || 0) > El) return;
    t.set(e, { source: n, result: o });
    let r = 0;
    for (let i of t.values()) r += i.source.length + (i.result?.length || 0);
    for (; r > El; ) {
      let i = t.keys().next().value, s = t.get(i);
      r -= s.source.length + (s.result?.length || 0), t.delete(i);
    }
  }
  function qp(t, e) {
    let n = t.indexOf(",");
    if (n < 0 || !/;base64/i.test(t.slice(0, n))) return null;
    let o = Math.ceil(e / 3) * 4, r = t.length - n - 1, i = Math.min(r, o);
    try {
      let s = atob(t.slice(n + 1, n + 1 + i - i % 4)), a = new Uint8Array(s.length);
      for (let l = 0; l < s.length; l++) a[l] = s.charCodeAt(l);
      return a;
    } catch {
      return null;
    }
  }
  function Xp(t) {
    let e = qp(t, 4096);
    if (!e || e.length < 16) return null;
    let n = (o) => e[o] << 8 | e[o + 1];
    if (e[0] === 137 && e[1] === 80 && e.length >= 24) return { w: (e[16] << 24 | e[17] << 16 | e[18] << 8 | e[19]) >>> 0, h: (e[20] << 24 | e[21] << 16 | e[22] << 8 | e[23]) >>> 0 };
    if (e[0] === 71 && e[1] === 73 && e[2] === 70) return { w: e[6] | e[7] << 8, h: e[8] | e[9] << 8 };
    if (e[0] === 82 && e[1] === 73 && e[8] === 87 && e.length >= 30) {
      let o = e[15];
      if (o === 32 && e[23] === 157) return { w: (e[26] | e[27] << 8) & 16383, h: (e[28] | e[29] << 8) & 16383 };
      if (o === 76) return { w: (e[21] | (e[22] & 63) << 8) + 1, h: ((e[22] >> 6 | e[23] << 2 | (e[24] & 15) << 10) & 16383) + 1 };
      if (o === 88) return { w: (e[24] | e[25] << 8 | e[26] << 16) + 1, h: (e[27] | e[28] << 8 | e[29] << 16) + 1 };
    }
    if (e[0] === 255 && e[1] === 216) {
      let o = 2;
      for (; o + 9 < e.length; ) {
        if (e[o] !== 255) {
          o++;
          continue;
        }
        let r = e[o + 1];
        if (r === 216 || r === 1 || r >= 208 && r <= 215) {
          o += 2;
          continue;
        }
        if (r >= 192 && r <= 207 && r !== 196 && r !== 200 && r !== 204) return { h: n(o + 5), w: n(o + 7) };
        let i = n(o + 2);
        if (i < 2) break;
        o += 2 + i;
      }
    }
    return null;
  }
  function Rl(t, e, n, o) {
    let r = Math.min(1, Math.max(n / t, o / e));
    return !(r > 0) || r >= 0.95 ? 0 : r;
  }
  function Ll() {
    for (let t of Ae.values()) t(void 0);
    if (Ae.clear(), Array.isArray(Kt)) for (let t of Kt) try {
      t?.terminate();
    } catch {
    }
    Kt = false;
  }
  function Zp() {
    let t, e = null;
    try {
      t = URL.createObjectURL(new Blob([Yp], { type: "text/javascript" })), e = new Worker(t), e.onmessage = (n) => {
        let o = Ae.get(n.data.id);
        o && (Ae.delete(n.data.id), o(n.data.error ? void 0 : n.data.url ?? null));
      }, e.onerror = Ll;
    } catch {
      e = null;
    }
    return t && URL.revokeObjectURL(t), e;
  }
  function th() {
    if (Kt === false) return false;
    if (Kt === null) {
      if (typeof Worker > "u" || typeof OffscreenCanvas > "u") return Kt = false;
      Kt = [];
    }
    let t = Jp++ % Kp;
    if (!Kt[t]) {
      let e = Zp();
      if (!e) return Ll(), false;
      Kt[t] = e;
    }
    return Kt[t];
  }
  function nh(t, e, n, o, r) {
    let i = th();
    return i ? new Promise((s) => {
      let a = ++Qp, l = setTimeout(() => {
        Ae.delete(a), s(void 0);
      }, eh);
      Ae.set(a, (u) => {
        clearTimeout(l), s(u);
      });
      try {
        i.postMessage({ id: a, dataURL: r ? "" : t, blob: r, srcLength: t.length, targetW: e, targetH: n, resFactor: Nl, quality: Pl, mime: o });
      } catch {
        clearTimeout(l), Ae.delete(a), s(void 0);
      }
    }) : Promise.resolve(void 0);
  }
  async function hi(t, e, n, o) {
    if (typeof t != "string" || !t.startsWith("data:image") || t.startsWith("data:image/svg")) return null;
    e = Math.ceil(e), n = Math.ceil(n);
    let r = t.length + ":" + t.slice(0, 64) + t.slice(-64) + ":" + e + "x" + n, i = j.compress, s = i.get(r);
    if (s?.source === t) return s.result;
    let a = Io.get(r);
    if (a?.source === t && a.cache === i) return a.promise;
    let l = (async () => {
      let c = jp(t), f = c === "image/jpeg" ? "image/jpeg" : c === "image/webp" ? "image/webp" : "image/png", d = Xp(t);
      if (d && d.w > 0 && d.h > 0 && !Rl(d.w, d.h, e, n)) return null;
      if (t.length >= Vp) {
        let C = await nh(t, e, n, f, o);
        if (C !== void 0) return C;
      }
      let h;
      try {
        h = await Hp(t);
      } catch {
        return null;
      }
      let m = h.naturalWidth || h.width, g = h.naturalHeight || h.height;
      if (!m || !g) return null;
      let p = Rl(m, g, e, n);
      if (!p) return null;
      let y = p * Nl, b = Math.max(1, Math.round(m * y)), w = Math.max(1, Math.round(g * y)), S = document.createElement("canvas");
      S.width = b, S.height = w;
      let v = S.getContext("2d");
      if (!v) return null;
      v.imageSmoothingEnabled = true, v.imageSmoothingQuality = "high", v.drawImage(h, 0, 0, b, w);
      try {
        let C = S.toDataURL(f, Pl);
        if (typeof C == "string" && C.startsWith("data:image") && C.length < t.length) return C;
      } catch {
      }
      return null;
    })(), u = { source: t, promise: l, cache: i };
    Io.set(r, u);
    try {
      let c = await l;
      return Gp(i, r, t, c), c;
    } finally {
      Io.get(r) === u && Io.delete(r);
    }
  }
  async function oh(t, e, n = /* @__PURE__ */ new Map(), o = {}) {
    if (!e.compress) return { count: 0, before: 0, after: 0 };
    let r = Array.from(t.querySelectorAll("img"));
    t.tagName === "IMG" && r.unshift(t);
    let i = 0, s = 0, a = 0, l = async (c) => {
      let f = c.getAttribute("src") || "";
      if (!f.startsWith("data:image") || f.startsWith("data:image/svg")) return;
      let d = parseFloat(c.dataset.snapdomWidth) || parseFloat(c.style.width) || c.width || 0, h = parseFloat(c.dataset.snapdomHeight) || parseFloat(c.style.height) || c.height || 0;
      if (!d || !h) return;
      let m = o.value || (o.value = pi(t, e)), g = m.density * m.stretch(n.get(c) || c), p = await hi(f, d * g, h * g, c.__snapdomBlob);
      p && (i++, s += f.length, a += p.length, c.setAttribute("src", p), Wo(c, "attribute", "src", f, p, e));
    }, u = 6;
    for (let c = 0; c < r.length; c += u) await Promise.allSettled(r.slice(c, c + u).map(l));
    return { count: i, before: s, after: a };
  }
  function ih(t) {
    let e = t.offsetWidth || t.getBoundingClientRect().width || 0, n = t.offsetHeight || t.getBoundingClientRect().height || 0;
    return { w: e, h: n };
  }
  async function sh(t, e, n = /* @__PURE__ */ new Map(), o = {}) {
    if (!e.compress) return { count: 0 };
    let r = [], i = [t, ...t.querySelectorAll("*")];
    for (let u of i) {
      let c = u.style && u.style.backgroundImage;
      c && c.includes("data:image") && r.push(u);
    }
    let s = 0, a = async (u) => {
      let c = n.get(u);
      if (!c || !c.isConnected) return;
      let f;
      try {
        f = getComputedStyle(c);
      } catch {
        return;
      }
      if ((f.backgroundRepeat || "repeat").toLowerCase().split(",").some(($2) => $2.trim() !== "no-repeat")) return;
      let h = (u.style.backgroundSize || f.backgroundSize || "auto").toLowerCase();
      if (h.split(",").some(($2) => !rh.test($2.trim()))) return;
      let { w: m, h: g } = ih(c);
      if (!m || !g) return;
      let p = Math.max(1, ...(h.match(/\d+(?:\.\d+)?%/g) || []).map(($2) => parseFloat($2) / 100)), y = o.value || (o.value = pi(t, e)), b = y.density * y.stretch(c) * p, w = m * b, S = g * b, v = u.style.backgroundImage, C = [...v.matchAll(/url\((['"]?)(data:image\/[^)'"]+)\1\)/gi)], M = v;
      for (let $2 of C) {
        let F = $2[2];
        if (F.startsWith("data:image/svg")) continue;
        let A = await hi(F, w, S);
        A && (M = M.split(F).join(A), s++);
      }
      M !== v && (u.style.setProperty("background-image", M, u.style.getPropertyPriority("background-image")), Wo(u, "style", "background-image", v, u.style.backgroundImage, e));
    }, l = 6;
    for (let u = 0; u < r.length; u += l) await Promise.allSettled(r.slice(u, u + l).map(a));
    return { count: s };
  }
  async function ah(t, e, n = /* @__PURE__ */ new Map(), o = {}) {
    if (!e.compress) return { count: 0 };
    let r = Array.from(t.querySelectorAll("image"));
    t.localName === "image" && r.unshift(t);
    let i = 0, s = async (l) => {
      let u = l.getAttribute("href") || (typeof l.getAttributeNS == "function" ? l.getAttributeNS("http://www.w3.org/1999/xlink", "href") : null);
      if (!u || !u.startsWith("data:image") || u.startsWith("data:image/svg")) return;
      let c = l.getAttribute("width") || "", f = l.getAttribute("height") || "";
      if (c.includes("%") || f.includes("%")) return;
      let d = n.get(l), h = d ? O(d) : l.style, m = (S, v) => {
        if (/^\d+(?:\.\d+)?px$/.test(h?.[S] || "")) return parseFloat(h[S]);
        if (/^\d+(?:\.\d+)?(?:px)?$/.test(v.trim())) return parseFloat(v);
        try {
          return d?.[S]?.baseVal?.value || 0;
        } catch {
          return 0;
        }
      }, g = m("width", c), p = m("height", f);
      if (!g || !p) return;
      let y = o.value || (o.value = pi(t, e)), b = y.density * y.stretch(d || l), w = await hi(u, g * b, p * b);
      w && (l.setAttribute("href", w), Wo(l, "attribute", "href", u, w, e), l.hasAttribute("xlink:href") && (l.setAttributeNS(Fl, "xlink:href", w), Wo(l, "attribute", "xlink:href", u, w, e)), i++);
    }, a = 6;
    for (let l = 0; l < r.length; l += a) await Promise.allSettled(r.slice(l, l + a).map(s));
    return { count: i };
  }
  async function Bo(t, e, n) {
    if (!e.compress) return;
    let o = {};
    await oh(t, e, n, o), await sh(t, e, n, o), await ah(t, e, n, o);
  }
  function an(t, e, n, o) {
    return t > e + 0.5 ? t - n : o - n;
  }
  function lh(t) {
    let e = (r) => r && r !== "transparent" && !/^rgba\(.*,\s*0\)$/.test(r), n = O(t.documentElement).backgroundColor, o = e(n) ? n : O(t.body).backgroundColor;
    return e(o) ? `;background-color:${o} !important` : "";
  }
  function fh(t, e) {
    if (Y()) return t;
    let n = t.indexOf("</style>");
    if (n === -1) return t;
    let o = /<style\b[^>]*>[\s\S]*?<\/style>/g, r = [], i = n, s;
    for (o.lastIndex = n; s = o.exec(t); ) r.push({ text: t.slice(i, s.index), intern: true }), r.push({ text: s[0], intern: false }), i = o.lastIndex;
    r.push({ text: t.slice(i), intern: true });
    let a = /* @__PURE__ */ new Map(), l = / style="([^"]*)"/g, u;
    for (let y of r) if (y.intern) for (l.lastIndex = 0; u = l.exec(y.text); ) a.set(u[1], (a.get(u[1]) || 0) + 1);
    let c = 0;
    for (let [y, b] of a) b > 1 && (c += (b - 1) * y.length);
    if (c < 2048 || t.includes(" data-sdi=")) return t;
    let f = uh(e, r.some((y) => !y.intern), t.includes("data-snapdom-asset"));
    if (f === null) return t;
    let d = /* @__PURE__ */ new Map(), h = 0, m = [], g = (y, b) => {
      if ((a.get(b) || 0) < 2 || f.has(b)) return y;
      let w = d.get(b);
      return w === void 0 && (w = "i" + (h++).toString(36), d.set(b, w), m.push(`[data-sdi="${w}"]{${b}}`)), ` data-sdi="${w}"`;
    }, p = "";
    for (let y of r) p += y.intern ? y.text.replace(l, g) : y.text;
    return t.slice(0, n) + m.join("") + p;
  }
  function uh(t, e, n) {
    let o = /* @__PURE__ */ new Set();
    if (!e && !n) return o;
    if (!t || t.querySelector("[data-sdi]")) return null;
    let r = (l) => {
      let u = l.getAttribute("style");
      u && o.add(u);
    };
    if (n && t.querySelectorAll("[data-snapdom-asset][style]").forEach(r), e) try {
      let l = (u) => {
        for (let c of u) {
          if (c.type === CSSRule.IMPORT_RULE || c.type === CSSRule.NAMESPACE_RULE) throw new Error("External or namespaced CSS");
          if (c.selectorText) {
            if (/\[\s*style\b|data-sdi|\[[^\]]*\\|&/i.test(c.selectorText)) throw new Error("Attribute-dependent or nested CSS");
            t.querySelectorAll(c.selectorText).forEach(r);
          }
          c.cssRules && l(c.cssRules);
        }
      };
      for (let u of [...t.querySelectorAll("style")].slice(1)) {
        let c = u.textContent || "";
        if (/@import\b/i.test(c)) return null;
        let f = new CSSStyleSheet();
        f.replaceSync(c), l(f.cssRules);
      }
    } catch {
      return null;
    }
    let i = /* @__PURE__ */ new Set(), s = document.createElement("div"), a = new XMLSerializer();
    for (let l of o) {
      s.setAttribute("style", l);
      let u = a.serializeToString(s).match(/ style="([^"]*)"/);
      u && i.add(u[1]);
    }
    return i;
  }
  async function zo(t, e) {
    let { clipWindow: n, outerTransforms: o, outerShadows: r, rootTransform2D: i, fontsCSS: s, universe: a } = e, l = t.options;
    if (t !== l) {
      let { options: K, ...Q } = t;
      t = Object.assign(l, Q), Object.defineProperty(t, "options", { value: t, configurable: true });
    }
    let u, c;
    _o(t, s, a), await Zt("beforeRender", t);
    let f = O(t.element), d = t.element.getBoundingClientRect(), h = Math.max(1, H(t.element.offsetWidth || parseFloat(f.width) || d.width || 1)), m = Math.max(1, H(t.element.offsetHeight || parseFloat(f.height) || d.height || 1)), g = t.element.ownerDocument || document, p = !n && (t.element === g.body || t.element === g.documentElement) && !t.__pinned, y = null, b = null, w = 0;
    if (p) {
      let K = Math.max(t.element.scrollHeight || 0, g.documentElement?.scrollHeight || 0, g.body?.scrollHeight || 0), Q = Math.max(t.element.scrollWidth || 0, g.documentElement?.scrollWidth || 0, g.body?.scrollWidth || 0), ot = Math.max(h, H(Q)), it = t.element === g.body, Tt = it && O(g.documentElement).direction === "rtl", mt = (J) => {
        J > 0 && (Tt ? w = Math.max(w, H(J - d.width)) : h = Math.max(h, H(J)));
      };
      if (it && g.documentElement) {
        let J = g.documentElement.getBoundingClientRect(), ct = { top: Math.max(0, d.top - J.top), right: Math.max(0, J.right - d.right), bottom: Math.max(0, J.bottom - d.bottom), left: Math.max(0, d.left - J.left) };
        if (y = ct, r !== "subtree" && (ct.top || ct.right || ct.bottom || ct.left)) {
          let bt = t.__session?.styleMap, pn = /* @__PURE__ */ new Map(), Hn = /* @__PURE__ */ new Map();
          for (let [oe, Ot] of t.nodeMap) {
            let Dt = bt?.get(oe);
            if (Dt) {
              let rr = pn.get(Dt);
              if (rr === void 0 && pn.set(Dt, rr = ch.test(Dt)), !rr) continue;
            }
            Hn.set(oe, Ot);
          }
          let qt = ti(t.element, Hn, t.styleCache, d.width > 0 ? h / d.width : 1, d.height > 0 ? m / d.height : 1);
          b = { top: Math.min(qt.top, ct.top), right: Math.min(qt.right, ct.right), bottom: Math.min(qt.bottom, ct.bottom), left: Math.min(qt.left, ct.left) };
        }
        K = Math.max(t.element.scrollHeight || 0, an(K, J.height, d.top - J.top, d.bottom - J.top)), Q = Math.max(t.element.scrollWidth || 0, Tt ? an(Q, J.width, J.right - d.right, J.right - d.left) : an(Q, J.width, d.left - J.left, d.right - J.left));
      }
      K > 0 && (m = Math.max(m, H(K))), mt(Q);
      try {
        let J = (t.scrollbarCSS || "").length + (t.baseCSS || "").length + (t.fontsCSS || "").length + (t.classCSS || "").length, ct = j.measureHints.get(t.element);
        if (ct && ct.cssLen === J && ct.w0 === ot && ct.docH === K && ct.docW === Q) ct.csh > 0 && (m = Math.max(m, H(ct.csh))), mt(ct.csw);
        else {
          let bt = g.createElement("div");
          tt(bt), bt.style.cssText = "position:absolute!important;left:-9999px!important;top:0!important;width:" + ot + "px!important;overflow:visible!important;visibility:hidden!important;";
          let pn = bt.attachShadow({ mode: "open" });
          Ln(pn, (t.scrollbarCSS || "") + t.baseCSS + "svg{overflow:visible;} foreignObject{overflow:visible;}" + t.classCSS);
          let Hn = pn.appendChild(si(t.clone));
          g.body.appendChild(bt);
          let qt = bt.scrollHeight, oe = bt.scrollWidth;
          if (it) {
            let Ot = bt.getBoundingClientRect(), Dt = Hn.getBoundingClientRect();
            qt = an(qt, Ot.height, Dt.top - Ot.top, Dt.bottom - Ot.top), oe = Tt ? an(oe, Ot.width, Ot.right - Dt.right, Ot.right - Dt.left) : an(oe, Ot.width, Dt.left - Ot.left, Dt.right - Ot.left);
          }
          g.body.removeChild(bt), j.measureHints.set(t.element, { cssLen: J, w0: ot, docH: K, docW: Q, csh: qt, csw: oe }), qt > 0 && (m = Math.max(m, H(qt))), mt(oe);
        }
      } catch {
      }
    }
    if (t.options?.excludeMode === "remove" || typeof t.options?.filter == "function" && t.options.filterMode === "remove") {
      let K = ii(t.element, t.options), Q = 1, ot = ii(t.element, {}), it = Math.max(2, m * 0.15);
      Number.isFinite(ot) && ot >= m - it && Number.isFinite(K) && K > 0 && (m = Math.max(1, Math.min(m, H(K + Q))));
    }
    if (t.options?.reconcile) try {
      let K = (t.scrollbarCSS || "") + t.baseCSS + "svg{overflow:visible;} foreignObject{overflow:visible;}" + t.classCSS;
      ul(t.element, t.clone, K, t.nodeMap, h, m);
    } catch (K) {
      nt(t.options.__session, "reconcile-failed", "reconcile pass failed", K), D(t.options, "reconcile couldn't run; captured without it.", K);
    }
    let S = (K, Q = NaN) => {
      let ot = typeof K == "string" ? parseFloat(K) : K;
      return Number.isFinite(ot) ? ot : Q;
    }, v = S(t.options.width), C = S(t.options.height), M = n ? H(n.width) : h, $2 = n ? H(n.height) : m, F = M, A = $2, x = Number.isFinite(v), _ = Number.isFinite(C), P = $2 > 0 ? M / $2 : 1;
    x && _ ? (F = Math.max(1, H(v)), A = Math.max(1, H(C))) : x ? (F = Math.max(1, H(v)), A = Math.max(1, H(F / (P || 1)))) : _ && (A = Math.max(1, H(C)), F = Math.max(1, H(A * (P || 1))));
    let E = 0, R = 0, L = h, k = m;
    if (n) {
      let K = 0, Q = 0;
      if (mi(t.element)) {
        let it = null;
        if (!o && i && Number.isFinite(i.a)) it = { a: i.a, b: i.b || 0, c: i.c || 0, d: i.d || 1, e: 0, f: 0 };
        else {
          let Tt = ke(t.element), mt = ri(f.transform && f.transform !== "none" ? f.transform : "", Tt);
          mt && mt.is2D && (it = { a: mt.a, b: mt.b, c: mt.c, d: mt.d, e: 0, f: 0 });
        }
        if (it && !(it.a === 1 && it.b === 0 && it.c === 0 && it.d === 1)) {
          let { ox: Tt, oy: mt } = Tn(f, h, m), J = tn(h, m, it, Tt, mt);
          K = J.minX, Q = J.minY;
        }
      }
      let ot = Y() ? 0 : (l.dpr || 1) * (x || _ ? F / M : l.scale || 1);
      E = H(ot ? Math.round((n.x + K) * ot) / ot : n.x + K), R = H(ot ? Math.round((n.y + Q) * ot) / ot : n.y + Q), L = H(E + n.width), k = H(R + n.height);
    } else if (!o && i && Number.isFinite(i.a)) {
      let K = { a: i.a, b: i.b || 0, c: i.c || 0, d: i.d || 1, e: 0, f: 0 }, Q = tn(h, m, K, 0, 0);
      E = H(Q.minX), R = H(Q.minY), L = H(Q.maxX), k = H(Q.maxY);
    } else if (o && mi(t.element)) {
      let Q = f.transform && f.transform !== "none" ? f.transform : "", ot = ke(t.element), it = de({ baseTransform: Q, rotate: ot.rotate || "0deg", scale: ot.scale, translate: ot.translate, width: h, height: m }), { ox: Tt, oy: mt } = Tn(f, h, m), J = it.is2D ? it : new DOMMatrix(it.toString()), ct = { a: J.a, b: J.b, c: J.c, d: J.d, e: 0, f: 0 }, bt = tn(h, m, ct, Tt, mt);
      E = H(bt.minX), R = H(bt.minY), L = H(bt.maxX), k = H(bt.maxY);
    }
    let I = Yr(f), W = Kr(f), T = Jr(f), N = Qr(f), U = Zr(f), z = d.width > 0 ? (L - E) / d.width : 1, V = d.height > 0 ? (k - R) / d.height : 1, B = r === "subtree" && !n ? ti(t.element, t.nodeMap, t.styleCache, z, V) : { top: 0, right: 0, bottom: 0, left: 0 };
    b && (B = { top: b.top, right: Math.max(0, b.right - (h - d.width)), bottom: Math.max(0, b.bottom - (m - d.height)), left: b.left }), w > 0 && (B = { ...B, left: Math.max(B.left, w) });
    let rt = n ? { top: 0, right: 0, bottom: 0, left: 0 } : r ? { top: H(Math.max(I.top, W.top, B.top) + T.top + N.top + U.bleed.top), right: H(Math.max(I.right, W.right, B.right) + T.right + N.right + U.bleed.right), bottom: H(Math.max(I.bottom, W.bottom, B.bottom) + T.bottom + N.bottom + U.bleed.bottom), left: H(Math.max(I.left, W.left, B.left) + T.left + N.left + U.bleed.left) } : { top: H(T.top + B.top), right: H(T.right + B.right), bottom: H(T.bottom + B.bottom), left: H(T.left + B.left) };
    E = H(E - rt.left), R = H(R - rt.top), L = H(L + rt.right), k = H(k + rt.bottom);
    let at = Math.max(1, H(L - E)), pt = Math.max(1, H(k - R)), St = "http://www.w3.org/2000/svg", ee = mi(t.element) ? 2 : 0, It = H(ee + (o ? 0 : 1)), $e = l.__subpixel?.x || 0, q = l.__subpixel?.y || 0, X = Math.ceil(at + It * 2 + $e), G = Math.ceil(pt + It * 2 + q), ht = H(-(H(E) - It)), Z = H(-(H(R) - It)), zn = g.defaultView || window, lt = !Y() && CSS.supports("zoom", "2") ? dh(zn) : 1;
    l.__layoutZoom = lt;
    let dn = n && !Y(), ne = dn ? H(ht - Math.floor(ht * lt + 0.01) / lt) : 0, $t = dn ? H(Z - Math.floor(Z * lt + 0.01) / lt) : 0, Te = Math.min(0, ht - ne) - (ne ? 1 / lt : 0), Vt = Math.min(0, Z - $t) - ($t ? 1 / lt : 0), me = ht - ne - Te + $e, Pe = Z - $t - Vt + q, Ne = H(X - Te), Gt = H(G - Vt), Wt = document.createElementNS(St, "foreignObject");
    Wt.setAttribute("x", String(Te * lt)), Wt.setAttribute("y", String(Vt * lt)), Wt.setAttribute("width", String(Ne * lt)), Wt.setAttribute("height", String(Gt * lt)), Wt.style.overflow = "visible";
    let ji = document.createElement("style"), Ic = "svg{overflow:visible;} foreignObject{overflow:visible;} foreignObject>div{-webkit-text-size-adjust:100%!important;text-size-adjust:100%!important;}";
    ji.textContent = (t.scrollbarCSS || "") + t.baseCSS + t.fontsCSS + Ic + t.classCSS, Wt.appendChild(ji);
    let Le = document.createElement("div");
    Le.setAttribute("xmlns", "http://www.w3.org/1999/xhtml"), Le.style.cssText = `all:initial;box-sizing:border-box;display:block;overflow:visible;width:${l.__subpixel ? H(me + d.width) : Ne}px;height:${Gt}px` + (me !== 0 || Pe !== 0 ? `;padding:${Pe}px 0 0 ${me}px !important` : "") + (lt !== 1 ? `;zoom:${lt} !important` : "") + ";direction:ltr !important" + (y ? lh(g) : ""), y && (me !== y.left || Pe !== y.top) && t.__session && rl(t.element, t.nodeMap, t.__session.styleMap, t.styleCache, me - y.left, Pe - y.top), Le.appendChild(t.clone), Wt.appendChild(Le);
    let Vi = new XMLSerializer(), Wc = Vi.serializeToString(Wt), Gi = x || _, Oc = Object.freeze({ w0: M, h0: $2, vbW: X, vbH: G, targetW: F, targetH: A, contentX: H(ht + (n ? E : 0)), contentY: H(Z + (n ? R : 0)), clip: n ? Object.freeze({ x: H(E), y: H(R), width: M, height: $2 }) : null });
    Object.defineProperty(l, "meta", { value: Oc, enumerable: true, writable: false, configurable: true });
    let Dc = !Gi || Y() ? X : x ? F : H(X * (A / G)), Bc = !Gi || Y() ? G : _ ? A : H(G * (F / X)), zc = parseFloat(O(g.documentElement)?.fontSize) || 16, nr = [ne || $t ? `translate(${ne} ${$t})` : "", lt !== 1 ? `scale(${1 / lt})` : ""].join(" ").trim(), Un = `<svg xmlns="${St}" width="${Dc}" height="${Bc}" viewBox="0 0 ${X} ${G}" font-size="${zc}px">${nr ? `<g transform="${nr}">` : ""}`, qi = nr ? "</g></svg>" : "</svg>";
    if (c = Un + fh(Wc, Wt) + qi, l.__fileSvg = null, lt !== 1) {
      let K = (mt) => {
        let J = Vi.serializeToString(mt.cloneNode(false));
        return J.slice(0, J.indexOf(">") + 1).replace(/\/>$/, ">");
      }, Q = Wt.cloneNode(false);
      Q.setAttribute("x", String(Te)), Q.setAttribute("y", String(Vt)), Q.setAttribute("width", String(Ne)), Q.setAttribute("height", String(Gt));
      let ot = Le.cloneNode(false);
      ot.style.removeProperty("zoom");
      let it = ne || $t ? `translate(${ne} ${$t})` : "", Tt = Un.slice(0, Un.indexOf(">") + 1) + (it ? `<g transform="${it}">` : "");
      l.__fileSvg = { zoomed: [Un + K(Wt), K(Le), qi], flat: [Tt + K(Q), K(ot), it ? "</g></svg>" : "</svg>"] };
    }
    u = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(c)}`, t.svgString = c, t.dataURL = u, l.__artifacts = { classCSS: t.classCSS || "", fontsCSS: t.fontsCSS || "", baseCSS: t.baseCSS || "", scrollbarCSS: t.scrollbarCSS || "" }, await Zt("afterRender", t), t.clone = t.nodeMap = t.styleCache = t.svgString = null;
    let or = [...document.querySelectorAll("#snapdom-sandbox")].find(Xt);
    return or && or.style.position === "absolute" && or.remove(), t.dataURL;
  }
  function mi(t) {
    return tl(t);
  }
  function dh(t) {
    let e = t.devicePixelRatio || 1;
    if (e === 1) return 1;
    let n = t.document, o = e;
    try {
      let r = n.createElement("div");
      tt(r), r.style.cssText = "position:absolute!important;left:-9999px!important;top:0!important;width:0!important;height:0!important;visibility:hidden!important;pointer-events:none!important;border:0 solid transparent!important;border-top-width:0.5px!important", (n.body || n.documentElement).appendChild(r);
      let i = parseFloat(t.getComputedStyle(r).borderTopWidth);
      r.remove(), i >= 1 && (o = 1);
    } catch {
    }
    return o;
  }
  function mh(t) {
    let e = Array.isArray(t.plugins) ? t.plugins : di(), n = [];
    for (let o of e) {
      let r = sn(o);
      r && typeof r.resolveNode == "function" && n.push(r.resolveNode.bind(r));
    }
    return n.length ? n : null;
  }
  async function Dl(t, e) {
    if (!t) throw new Error("[SnapDOM] The element cannot be null or undefined.");
    e.__session = ci(e.cache), delete e.__compressedAssets, delete e.__compressedSnapshot, delete e.__compressionDensity, e.__resolveNodeHooks = mh(e);
    let n = e;
    n.element = t, Object.defineProperty(n, "options", { value: n, configurable: true });
    let o, r, i, s, a, l, u, c, f, d = "", h = null, m = e.needs || kt, g = n.format, p = n.type;
    await Zt("beforeSnap", n);
    let y = n.format !== g && /^(?:png|jpe?g|webp|svg)$/i.test(n.format), b = n.type !== p && /^(?:png|jpe?g|webp|svg)$/i.test(n.type);
    if (y || b) {
      let E = String(y ? n.format : n.type).toLowerCase();
      n.format = E === "jpg" ? "jpeg" : E, n.type = n.format, n.__explicitFormat = n.format, /^(?:jpeg|webp)$/.test(n.format) && (n.backgroundColor == null || n.backgroundColor === "transparent") && (n.backgroundColor = "#ffffff");
    }
    await Zt("beforeClone", n);
    let w = n.outerTransforms !== false, S = n.outerShadows === "subtree" ? "subtree" : !!n.outerShadows, v = n.clip ? Mo(n.element, n.clip) : null;
    if (e.__styleShare === void 0) try {
      e.__styleShare = Rs(n.element) && (typeof n.element.getAnimations != "function" || n.element.getAnimations({ subtree: true }).length === 0);
    } catch {
      e.__styleShare = false;
    }
    let C = gs(e.fast);
    for (; ; ) {
      e.__slicer = C;
      let E = Po(n.element, v);
      try {
        ({ clone: o, classCSS: r, classPrefixCSS: i, styleCache: s, nodeMap: a, reconcileRisk: l, clipWindow: u, standIns: c, universe: f } = await pl(n.element, n.options)), l > 0 && !e.reconcile && (nt(e.__session, "reconcile-risk", "text in inline/table-cell elements kept natural width and may re-wrap; pass { reconcile: true } for pixel-exact layout"), e.debug && !j.warnedReconcile && (j.warnedReconcile = true, D(e, "Some text may wrap differently in the capture. Pass { reconcile: true } to fix it (about 2x slower)."))), !w && o && (h = Za(n.element, o)), !S && o && sl(n.element, o, n.options), o && (cl(n.element, o, a, c), al(n.element, o));
      } finally {
        E();
      }
      if (!C?.yielded || !e.__tornSinceStart?.()) break;
      C = null, e.__session = ci(e.cache);
    }
    if (e.__slicer = null, n.clone = o, n.classCSS = r, n.styleCache = s, n.nodeMap = a, await Zt("afterClone", n), !on(m, "render")) return null;
    if (C?.due() && await C.pause(), Ao(n.clone), n.options?.excludeMode === "remove" || typeof n.options?.filter == "function" && n.options.filterMode === "remove") try {
      fl(n.element, n.clone, n.styleCache, n.nodeMap);
    } catch (E) {
      nt(e.__session, "shrink-failed", "shrink pass failed", E), D(e, "Couldn't close the gaps left by removed elements.", E);
    }
    try {
      await uo(n.clone, n.element, n.nodeMap);
    } catch {
    }
    try {
      let E = e.__session?.styleMap;
      E && po(E.keys(), E, n.nodeMap, n.options.__iconMatchers);
    } catch {
    }
    let M = (E) => Promise.resolve().then(E), $2 = (async () => {
      await Promise.all([M(() => Ro(n.clone, n.options)), M(() => $o(n.element, n.clone, n.styleCache, n.options, n.nodeMap))]);
      try {
        gl(n.element, n.clone, n.nodeMap);
      } catch (E) {
        nt(e.__session, "backdrop-filter-failed", "backdrop-filter emulation failed", E), D(e, "Couldn't reproduce a backdrop-filter; captured without it.", E);
      }
      if (e.compress && (e.__compressionClip = u, e.__compressionRootTransform = h, await M(() => Bo(n.clone, n.options, n.nodeMap))), e.captureSelection) try {
        da(n.nodeMap);
      } catch (E) {
        nt(e.__session, "selection-compose-failed", "field selection compose failed", E);
      }
    })(), F = Promise.resolve();
    (e.embedFonts === "auto" ? ((n.element.ownerDocument || document).fonts?.size || 0) > 0 : e.embedFonts) && (F = M(async () => {
      let E = n.element.ownerDocument || document, R = v ? (T) => {
        try {
          let N = T.getBoundingClientRect();
          return N.right >= v.left - 200 && N.left <= v.right + 200 && N.bottom >= v.top - 200 && N.top <= v.bottom + 200;
        } catch {
          return true;
        }
      } : null, { required: L, usedCodepoints: k } = !v && e.__fontUsage || xo(n.element, R), I = L, W = L;
      if (e.embedFonts === "auto") {
        let { declared: T, drawn: N } = wo(E), U = (z) => Fn(z).toLowerCase();
        if (I = new Set(Array.from(L).filter((z) => N.has(U(z)))), !I.size) return;
        W = new Set(Array.from(L).filter((z) => N.has(U(z)) || !T.has(U(z))));
      }
      Y() && await So(I, k, E), d = await La({ required: W, usedCodepoints: k, exclude: n.options.excludeFonts, localFonts: n.options.localFonts, useProxy: n.options.useProxy, fontStylesheetDomains: n.options.fontStylesheetDomains, iconMatchers: n.options.__iconMatchers, doc: E, debug: n.options.debug });
    })), await Promise.all([$2, F]);
    let x = (n.options.plugins || []).some((E) => E && (typeof E.beforeRender == "function" || typeof E.afterRender == "function"));
    if (n.options.engine === "html-in-canvas" && !x) {
      let { tryCanvasEngine: E } = await Promise.resolve().then(() => (Ol(), Wl));
      _o(n, d, f);
      let R = await E(n, n.options);
      if (R) return R;
    }
    C?.due() && await C.pause();
    let _ = n.clone;
    Do(_, e.__compressedAssets);
    let P = await zo(n, { clipWindow: u, outerTransforms: w, outerShadows: S, rootTransform2D: h, fontsCSS: d, universe: f });
    if (e.__compressedSnapshot = Oo(_, e.__compressedAssets), typeof e.__retain == "function") try {
      e.__retain({ clone: o, nodeMap: a, styleCache: s, styleMap: e.__session.styleMap, classPrefixCSS: i, fontsCSS: d, clipWindow: u, outerTransforms: w, outerShadows: S, rootTransform2D: h, __compressedAssets: e.__compressedAssets, __compressionDensity: e.__compressionDensity });
    } catch {
    }
    return P;
  }
  function Bl(t = {}) {
    let e = typeof t.type == "string" && gh.has(t.type.toLowerCase()) ? t.type.toLowerCase() : null, n = t.format ?? e ?? "png";
    n === "jpg" && (n = "jpeg");
    let o = t.format != null ? n : e === "jpg" ? "jpeg" : e, r = Xi(t.cache), i = t.exclude == null ? [] : Array.isArray(t.exclude) ? t.exclude : [t.exclude], s = [], a = [];
    for (let f of i) if (typeof f == "string") try {
      document.createDocumentFragment().querySelector(f), s.push(f);
    } catch {
      D(t, `Invalid exclude selector "${f}"; ignored.`);
    }
    else typeof f == "function" ? a.push(f) : f != null && D(t, "Ignored an exclude entry: use a CSS selector or a function.", f);
    let l = t.excludeMode ?? "hide", u = (f) => {
      if (!f || f.nodeType !== 1) return false;
      if (f.getAttribute("data-capture") === "exclude") return true;
      for (let d of Array.isArray(c.exclude) ? c.exclude : []) try {
        if (f.matches(d)) return true;
      } catch {
      }
      for (let d of Array.isArray(c.excludePredicates) ? c.excludePredicates : []) try {
        if (d(f)) return true;
      } catch {
      }
      if (typeof c.filter == "function") try {
        if (!c.filter(f)) return true;
      } catch {
      }
      return false;
    }, c = { debug: t.debug ?? false, scale: t.scale ?? 1, exclude: s, excludePredicates: a.length ? a : null, excludeMode: l, filter: t.filter ?? null, filterMode: t.filterMode ?? "hide", shouldExclude: u, placeholders: t.placeholders !== false, captureSelection: t.captureSelection ?? false, canvas: ft(t.canvas, "canvas") ? t.canvas : null, embedFonts: t.embedFonts ?? "auto", iconFonts: Array.isArray(t.iconFonts) ? t.iconFonts : t.iconFonts ? [t.iconFonts] : [], __iconMatchers: Ma(t.iconFonts, t), localFonts: Array.isArray(t.localFonts) ? t.localFonts : [], excludeFonts: t.excludeFonts ?? void 0, fontStylesheetDomains: Array.isArray(t.fontStylesheetDomains) ? t.fontStylesheetDomains : [], fallbackURL: t.fallbackURL ?? void 0, cache: r, __styleShare: t.__styleShare, useProxy: typeof t.useProxy == "string" ? t.useProxy : "", width: t.width ?? null, height: t.height ?? null, format: n, __explicitFormat: o, type: n, quality: t.quality ?? 0.92, dpr: t.dpr ?? (window.devicePixelRatio || 1), backgroundColor: t.backgroundColor ?? (["jpeg", "webp"].includes(n) ? "#ffffff" : null), filename: t.filename ?? "snapDOM", outerTransforms: t.outerTransforms ?? true, outerShadows: t.outerShadows ?? false, reconcile: t.reconcile ?? false, burst: t.burst, fast: t.fast === false || t.fast === "auto" ? t.fast : true, engine: t.engine, invalidate: t.invalidate ?? false, __pinned: t.__pinned === true, __subpixel: t.__subpixel ?? null, clip: t.clip ?? null, compress: t.compress !== false, excludeStyleProps: t.excludeStyleProps ?? null, resolvePicturePlaceholders: t.resolvePicturePlaceholders !== false };
    return c;
  }
  function yh(t) {
    try {
      return t.matches?.("dialog,[popover]") || !!t.querySelector?.("dialog,[popover]");
    } catch {
      return true;
    }
  }
  function wh(t) {
    if (t.__usesBackdropFilter !== void 0) return t.__usesBackdropFilter;
    let e = false;
    for (let n of t.styleMap.values()) if (bh.test(n)) {
      e = true;
      break;
    }
    return t.__usesBackdropFilter = e, e;
  }
  function xh(t, e) {
    let n = e.has("backdrop-filter") || e.has("-webkit-backdrop-filter");
    if (!n && (n = ((i) => /(?:^|;)\s*(?:-webkit-)?backdrop-filter\s*:/i.test(i.getAttribute?.("style") || ""))(t), !n)) try {
      n = !!t.querySelector?.('[style*="backdrop-filter" i]');
    } catch {
      n = true;
    }
    if (!n) return false;
    let o = [t];
    t.querySelectorAll && o.push(...t.querySelectorAll("*"));
    for (let r of o) {
      let i = getComputedStyle(r), s = i.getPropertyValue("backdrop-filter") || i.getPropertyValue("-webkit-backdrop-filter");
      if (s && s !== "none") return true;
    }
    return false;
  }
  function vh(t, e) {
    if (t === e) return true;
    if (!t.endsWith("px") || !e.endsWith("px")) return false;
    let n = parseFloat(t), o = parseFloat(e);
    return Number.isFinite(n) && Number.isFinite(o) && Math.abs(n - o) <= Sh;
  }
  function kh(t) {
    let e = Uo.get(t);
    if (e === void 0) {
      e = null;
      for (let n of Ch) {
        let o = t.match(new RegExp("(?:^|;)" + n + ":([^;]+)"));
        o && o[1].endsWith("px") && ((e || (e = {}))[n] = o[1]);
      }
      Uo.size > 5e3 && Uo.clear(), Uo.set(t, e);
    }
    return e;
  }
  function Mh(t) {
    if (!(!t.classList || !t.classList.length)) for (let e of Array.from(t.classList)) /^c\d+$/.test(e) && t.classList.remove(e);
  }
  function Ah(t, e) {
    let n = [t];
    for (; n.length; ) {
      let o = n.pop();
      if (o.nodeType === 1) {
        let r = e.nodeMap.get(o);
        r !== void 0 && (e.nodeMap.delete(o), e.srcToClone.get(r) === o && e.srcToClone.delete(r)), e.styleMap.delete(o);
      }
      for (let r = o.firstChild; r; r = r.nextSibling) n.push(r);
    }
  }
  async function Ul(t, e, n) {
    gi.attempts++;
    try {
      let o = await _h(t, e, n);
      return o && gi.served++, o;
    } catch {
      return null;
    }
  }
  async function _h(t, e, n) {
    let o = e.retained;
    if (!o || !o.clone || !o.styleMap || !o.srcToClone || n.reconcile || n.clip || n.captureSelection || o.clipWindow || t.scrollTop || t.scrollLeft || yh(t) || wh(o) || o.fontsCSS || Lo(n)) return null;
    for (let d of n.plugins || []) if (d && (typeof d.beforeSnap == "function" || typeof d.beforeClone == "function" || typeof d.resolveNode == "function" || typeof d.afterClone == "function")) return null;
    if (o.classPrefixCSS && (o.classPrefixCSS.includes("::marker") || o.classPrefixCSS.includes("::first-line")) || n.excludeMode === "remove") return null;
    let r = t.ownerDocument || document, i = qe(t);
    if (!i || Es(r)) return null;
    let s = [];
    t: for (let d of e.dirtyRoots) {
      if (!d.isConnected || d === t || !t.contains(d)) return null;
      for (let h of e.dirtyRoots) if (h !== d && h !== t && h.contains(d)) continue t;
      s.push(d);
    }
    if (!s.length) return null;
    n.__compressedAssets = o.__compressedAssets, n.__compressionDensity = o.__compressionDensity, n.__compressionRootTransform = o.rootTransform2D;
    for (let d of s) {
      if (d.parentElement === t || d.matches?.(zl) || d.querySelector?.(zl) || xh(d, i)) return null;
      let h = o.srcToClone.get(d);
      if (!h || !h.parentNode) return null;
      let m = /* @__PURE__ */ new Map(), g = { styleMap: o.styleMap, styleCache: o.styleCache, nodeMap: m, options: n }, p = Po(d, null), y = ko(d), b;
      try {
        b = await ue(d, g, n);
      } finally {
        y(), p();
      }
      if (!b || b.nodeType !== 1 || b.querySelector?.("style[data-sd]") || (await Ze(d, b, g, n), g.__pseudoCSS) || g.__usesPlaceholder && !o.classPrefixCSS?.includes("[data-sd-ph]")) return null;
      await io(b, g), Ao(b);
      try {
        await uo(b, d, m);
      } catch {
      }
      try {
        po([b, ...b.querySelectorAll("*")], o.styleMap, m, n.__iconMatchers);
      } catch {
      }
      if (await Promise.all([Ro(b, n), $o(d, b, o.styleCache, n, m)]), n.compress) try {
        await Bo(b, n, m);
      } catch {
      }
      for (let [w, S] of m.entries()) li(w, S, m, o.styleCache);
      h.replaceWith(b), Ah(h, o);
      for (let [w, S] of m.entries()) o.nodeMap.set(w, S), o.srcToClone.set(S, w);
    }
    let a = { styleMap: o.styleMap, styleCache: o.styleCache, nodeMap: o.nodeMap, options: n }, l = /* @__PURE__ */ new WeakSet();
    for (let [d, h] of o.nodeMap.entries()) {
      if (!h || h.nodeType !== 1 || !h.isConnected) continue;
      let m = o.styleMap.get(d);
      if (!m) continue;
      let g = kh(m);
      if (!g) continue;
      let p = null, y = false;
      for (let b in g) {
        p || (p = getComputedStyle(h));
        let w = p.getPropertyValue(b);
        if (b === "min-width" && w === "auto" && !l.has(h.parentElement)) {
          let S = parseFloat(p.width);
          p.boxSizing !== "border-box" && m.includes("box-sizing:border-box") && (S += ["padding-left", "padding-right", "border-left-width", "border-right-width"].reduce((v, C) => v + (parseFloat(p.getPropertyValue(C)) || 0), 0)), w = `${S}px`;
        }
        if (!vh(w, g[b])) {
          y = true;
          break;
        }
      }
      if (y) {
        if (n.__compressedAssets?.has(d)) return null;
        l.add(h), gi.reconciled++, await xt(h, d, a, n);
      }
    }
    let u = yn(o.styleMap);
    for (let [d, h] of o.styleMap.entries()) Mh(d), ai(d, h, u);
    let c = (o.classPrefixCSS || "") + Array.from(u.entries()).map(([d, h]) => `.${h}{${d}}`).join("");
    if (qe(t) !== i) return null;
    Do(o.clone, n.__compressedAssets);
    let f = await zo({ element: t, options: n, plugins: n.plugins, clone: o.clone, classCSS: c, styleCache: o.styleCache, nodeMap: o.nodeMap }, { clipWindow: null, outerTransforms: o.outerTransforms, outerShadows: o.outerShadows, rootTransform2D: o.rootTransform2D, fontsCSS: o.fontsCSS || "", universe: i });
    return n.__compressedSnapshot = Oo(o.clone, n.__compressedAssets), o.__compressedAssets = n.__compressedAssets, o.__compressionDensity = n.__compressionDensity, f;
  }
  function Fh(t) {
    let e = t?.defaultView;
    return typeof e?.matchMedia != "function" ? "" : Rh.map((n) => {
      try {
        return e.matchMedia(n).matches ? "1" : "0";
      } catch {
        return "?";
      }
    }).join("");
  }
  function Hl(t) {
    let e = [];
    for (let n = t; n; ) {
      try {
        let o = n.getBoundingClientRect();
        e.push(o.x, o.y, o.width, o.height);
      } catch {
        e.push("?");
      }
      n.parentElement ? n = n.parentElement : n = Bt(n) || null;
    }
    return e.join("|");
  }
  function jl(t, e) {
    if (e.disposed || (Wn.delete(t), Wn.set(t, e), Wn.size <= Eh)) return;
    let [n, o] = Wn.entries().next().value;
    ec(n, o);
  }
  function ec(t, e) {
    e.disposed = true, Wn.delete(t), bi.delete(t);
    for (let n of e.observers) try {
      n.disconnect();
    } catch {
    }
    for (let n of tc) t.removeEventListener(n, e.onMediaDirty, true);
    for (let n of e.trackedShadowRoots.keys()) for (let o of xi) n.removeEventListener(o, e.onMediaDirty, true);
    for (let [n, o] of e.trackedImages) n.removeEventListener("load", o), n.removeEventListener("error", o);
    e.trackedImages.clear(), e.trackedShadowRoots.clear(), e.images.length = 0, e.controls.length = 0, e.scrollNodes.length = 0, e.observers.length = 0, e.last = null, e.retained = null, e.retainedFrameDriven = false;
  }
  function nc(t) {
    if (Zl.has(t)) return false;
    jo.delete(t);
    let e = [t], n = [], o = [];
    for (let r = 0; r < e.length; r++) {
      let i = e[r], s = [];
      i?.nodeType === 1 && s.push(i);
      try {
        s.push(...i.querySelectorAll("*"));
      } catch {
        return false;
      }
      for (let a of s) {
        a.shadowRoot && e.push(a.shadowRoot);
        let l = String(a.localName || a.tagName || "").toLowerCase();
        if (/^(?:iframe|canvas|video|audio|object|embed|marquee|blink)$/.test(l) || l === "progress" && !a.hasAttribute("value") || /^(?:animate|animatetransform|animatemotion|set)$/.test(l)) return false;
        let u = "";
        if (l === "img") {
          o.push(a);
          try {
            u = a.currentSrc || a.src || "";
          } catch {
          }
        }
        /^(?:input|textarea|select|option)$/.test(l) && n.push(a);
        let c = a.getAttribute?.("style") || "", f = yi.get(a);
        if (u || c) {
          if ((!f || f.src !== u || f.style !== c) && (f = { src: u, style: c, animated: fn(u) || fn(c) }, yi.set(a, f)), f.animated) return false;
        } else f && yi.delete(a);
      }
    }
    return jo.set(t, { roots: e.slice(1), controls: n, images: o }), true;
  }
  function wi(t, e) {
    if (!t.querySelectorAll) return false;
    let n = jo.get(t);
    jo.delete(t);
    let o = new Set(n?.roots || []);
    if (n && (e.controls = n.controls, e.scannedImages = n.images), !n) {
      let r = [t];
      for (let i = 0; i < r.length; i++) {
        let s = r[i];
        s.shadowRoot && !o.has(s.shadowRoot) && (o.add(s.shadowRoot), r.push(s.shadowRoot));
        for (let a of s.querySelectorAll("*")) a.shadowRoot && !o.has(a.shadowRoot) && (o.add(a.shadowRoot), r.push(a.shadowRoot));
      }
    }
    for (let [r, i] of e.trackedShadowRoots) if (!o.has(r)) {
      try {
        i.disconnect();
      } catch {
      }
      for (let a of xi) r.removeEventListener(a, e.onMediaDirty, true);
      e.trackedShadowRoots.delete(r);
      let s = e.observers.indexOf(i);
      s >= 0 && e.observers.splice(s, 1);
    }
    for (let r of o) if (!e.trackedShadowRoots.has(r)) try {
      let i = new MutationObserver(e.markDirty);
      i.observe(r, { subtree: true, childList: true, attributes: true, characterData: true, attributeOldValue: true, characterDataOldValue: true }), i.__flush = e.markDirty, e.observers.push(i), e.trackedShadowRoots.set(r, i);
      for (let s of xi) r.addEventListener(s, e.onMediaDirty, { capture: true, passive: true });
      e.retained && e.dirtyAll();
    } catch {
    }
    return !!n;
  }
  function Vo(t, e) {
    return [t, ...e.trackedShadowRoots.keys()];
  }
  function Si(t, e) {
    let n = e.scannedImages;
    if (e.scannedImages = null, !n) {
      n = [], t.tagName === "IMG" && n.push(t);
      for (let o of Vo(t, e)) o.querySelectorAll && n.push(...o.querySelectorAll("img"));
    }
    if (e.images = n, e.trackedImages.size) {
      let o = new Set(n);
      for (let [r, i] of e.trackedImages) o.has(r) || (r.removeEventListener("load", i), r.removeEventListener("error", i), e.trackedImages.delete(r));
    }
    for (let o of n) {
      if (o.complete || e.trackedImages.has(o)) continue;
      let r = () => {
        e.capturing && (e.torn = true), e.dirty = true, e.dirtyRoots = null, o.removeEventListener("load", r), o.removeEventListener("error", r), e.trackedImages.delete(o);
      };
      e.trackedImages.set(o, r), o.addEventListener("load", r), o.addEventListener("error", r);
    }
  }
  function Vl(t) {
    let e = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map();
    for (let r of t) if (xe(r)) if (r.type === "attributes") {
      let i = e.get(r.target);
      i || e.set(r.target, i = /* @__PURE__ */ new Map()), i.has(r.attributeName) || i.set(r.attributeName, r.oldValue);
    } else if (r.type === "characterData") n.has(r.target) || n.set(r.target, r.oldValue);
    else if (r.type === "childList") {
      let i = o.get(r.target);
      i || o.set(r.target, i = /* @__PURE__ */ new Map());
      for (let s of r.addedNodes) {
        if (s.nodeType !== 3) return true;
        i.set(s.data, (i.get(s.data) || 0) + 1);
      }
      for (let s of r.removedNodes) {
        if (s.nodeType !== 3) return true;
        i.set(s.data, (i.get(s.data) || 0) - 1);
      }
    } else return true;
    for (let [r, i] of e) for (let [s, a] of i) if (r.getAttribute(s) !== a) return true;
    for (let [r, i] of n) if (r.data !== i) return true;
    for (let r of o.values()) for (let i of r.values()) if (i !== 0) return true;
    return false;
  }
  function Th(t, e = 131072) {
    if (t = String(t || "").trim(), !/^data:/i.test(t)) return "";
    let n = t.indexOf(",");
    if (n < 0) return "";
    let o = t.slice(0, n), r = t.slice(n + 1);
    try {
      if (/;base64/i.test(o)) {
        let i = Math.ceil(e / 3) * 4;
        return atob(r.slice(0, i - i % 4));
      }
      return r.slice(0, e * 3).replace(/%([0-9a-f]{2})/gi, (i, s) => String.fromCharCode(parseInt(s, 16))).slice(0, e);
    } catch {
      return "";
    }
  }
  function Ph(t) {
    let e = (t.match(/^data:([^;,]+)/i)?.[1] || "").toLowerCase();
    if (e === "image/gif" || e === "image/apng") return true;
    if (!/image\/(?:png|webp|avif|svg\+xml)/.test(e)) return false;
    let n = Th(t);
    return e === "image/png" ? n.includes("acTL") : e === "image/webp" ? n.includes("ANIM") || n.includes("ANMF") || n.includes("VP8X") && !!(n.charCodeAt(n.indexOf("VP8X") + 8) & 2) : e === "image/avif" ? n.includes("avis") : /<(?:animate|animateTransform|animateMotion|set)\b|@keyframes\b|animation(?:-name)?\s*:/i.test(n);
  }
  function Gl(t) {
    let e = String(t || "").trim();
    return e ? $h.test(e) ? true : /^data:/i.test(e) ? Ph(e) : false : false;
  }
  function fn(t) {
    let e = String(t || "");
    if (Gl(e)) return true;
    for (let n of e.matchAll(/url\(\s*(?:"((?:\\.|[^"\\])*)"|'((?:\\.|[^'\\])*)'|([^)]*))\s*\)/gi)) if (Gl(n[1] ?? n[2] ?? n[3])) return true;
    return false;
  }
  function ql(t, e = null) {
    let n = t && t.clone;
    if (!n) return false;
    let o = e ? e.map((r) => t.srcToClone?.get(r)).filter(Boolean) : [n];
    for (let r of o) for (let i of oc(r)) if (fn(i.getAttribute?.("src")) || fn(i.getAttribute?.("href")) || fn(i.getAttribute?.("style")) || fn(t.styleMap?.get(i))) return true;
    return false;
  }
  function oc(t) {
    let e = [];
    t && t.nodeType === 1 && e.push(t);
    try {
      e.push(...t.querySelectorAll("*"));
    } catch {
    }
    return e;
  }
  function vi(t, e) {
    let n = [], o = /* @__PURE__ */ new Set(), r = (i) => {
      i && !o.has(i) && (o.add(i), n.push(i));
    };
    t.matches?.("input,textarea,select,option") && r(t);
    for (let i of Vo(t, e)) try {
      for (let s of i.querySelectorAll("input,textarea,select,option")) r(s);
    } catch {
    }
    e.controls = n;
  }
  function Ci(t, e) {
    let n = [], o = /* @__PURE__ */ new Set(), r = (i, s = false) => {
      if (!(!i || o.has(i))) {
        o.add(i);
        try {
          (s || i.scrollLeft || i.scrollTop || i.scrollWidth > i.clientWidth || i.scrollHeight > i.clientHeight) && n.push(i);
        } catch {
        }
      }
    };
    for (let i = t; i; i = i.parentElement) r(i, true);
    for (let i of Vo(t, e)) for (let s of oc(i)) r(s);
    e.scrollNodes = n;
  }
  function Xl(t, e) {
    let n = t.ownerDocument || document, o = n.defaultView, r = [o?.location?.hash || "", Fh(n), o?.innerWidth || 0, o?.innerHeight || 0, o?.devicePixelRatio || 1, o?.screen?.orientation?.type || ""];
    try {
      r.push(...[...n.adoptedStyleSheets || []].map(cn));
    } catch {
    }
    for (let c of e.trackedShadowRoots.keys()) try {
      r.push("#shadow", ...[...c.adoptedStyleSheets || []].map(cn));
    } catch {
    }
    let i = n.activeElement, s = n.fullscreenElement;
    (i?.contains(t) || t.contains(i)) && r.push(cn(i)), (s?.contains(t) || t.contains(s)) && r.push(cn(s));
    let a = [o?.scrollX || 0, o?.scrollY || 0];
    for (let c of e.scrollNodes) a.push(c.scrollLeft || 0, c.scrollTop || 0);
    let l = [];
    for (let c of e.controls) {
      let f = String(c.localName || "").toLowerCase();
      f === "input" ? l.push(c.type, mn(c) ? c.value.length : c.value, c.checked ? 1 : 0, c.indeterminate ? 1 : 0) : f === "textarea" ? l.push(c.value) : f === "select" ? l.push(c.selectedIndex, c.value) : l.push(c.selected ? 1 : 0);
    }
    let u = [];
    for (let c of e.images) {
      let f = "";
      try {
        f = c.currentSrc || c.src || "";
      } catch {
      }
      u.push(f, c.complete ? 1 : 0, c.naturalWidth || 0, c.naturalHeight || 0);
    }
    return { style: r.join("|"), scroll: a.join("|"), controls: l, images: u, frameDriven: e.retainedFrameDriven };
  }
  function ln(t, e, n) {
    if (!t) return false;
    let o = t[n], r = e[n];
    if (o === r) return true;
    if (!Array.isArray(o) || o.length !== r.length) return false;
    for (let i = 0; i < o.length; i++) if (o[i] !== r[i]) return false;
    return true;
  }
  function Yl(t, e) {
    let n = /* @__PURE__ */ new Set();
    for (let o of Vo(t, e)) try {
      let r = o.getAnimations?.(o.nodeType === 1 ? { subtree: true } : void 0) || [];
      for (let i of r) n.add(i);
    } catch {
    }
    return [...n];
  }
  function Kl(t) {
    return t.map((e) => [cn(e), e.playState, Math.round((Number(e.currentTime) || 0) * 10), e.playbackRate].join(":")).join("|");
  }
  function Nh(t, e, n) {
    if (!n || n.nodeType !== 1) return null;
    if (n === t || t.contains(n)) return t;
    for (let o of e.trackedShadowRoots.keys()) if (o.contains(n)) return o;
    return null;
  }
  function Lh(t) {
    let e = { dirty: true, pending: [], torn: false, dirtyRoots: /* @__PURE__ */ new Set(), retained: null, retainedFrameDriven: false, disposed: false, capturing: false, last: null, inflight: Promise.resolve(), observers: [], trackedShadowRoots: /* @__PURE__ */ new Map(), trackedImages: /* @__PURE__ */ new Map(), images: [], scannedImages: null, scrollNodes: [], controls: [], envEpoch: je(), styleEpoch: Se(), styleStamp: Mn(t), outsideMutations: kn(t), geometry: null, renderState: null }, n = () => {
      e.dirty = true, e.dirtyRoots = null;
    }, o = (a) => {
      if (!e.dirtyRoots) return;
      let l = a && (a.nodeType === 1 ? a : a.parentElement);
      if (!l || l === t || !t.contains(l) || e.dirtyRoots.size >= 12) {
        e.dirtyRoots = null;
        return;
      }
      e.dirtyRoots.add(l);
    }, r = (a) => {
      if (e.capturing) {
        for (let l of a) e.pending.push(l);
        return;
      }
      for (let l of a) xe(l) && (e.dirty = true, o(l.target));
    }, i = () => {
      if (e.capturing) {
        e.torn = true;
        return;
      }
      n();
    };
    e.dirtyAll = n;
    try {
      let a = new MutationObserver(r);
      a.observe(t, { subtree: true, childList: true, attributes: true, characterData: true, attributeOldValue: true, characterDataOldValue: true }), a.__flush = r, e.observers.push(a);
    } catch {
    }
    e.markDirty = r, e.onMediaDirty = i;
    try {
      for (let a of tc) t.addEventListener(a, i, { capture: true, passive: true });
    } catch {
    }
    return wi(t, e) || vi(t, e), Ci(t, e), Si(t, e), e;
  }
  function Ho(t) {
    let e = Jl.get(t);
    return e || (e = "@" + ++Ih, Jl.set(t, e)), e;
  }
  function ki(t, e) {
    let n = typeof t;
    if (n === "undefined") return null;
    if (t === null || n === "boolean" || n === "number" || n === "string") return JSON.stringify(t);
    if (n === "function" || n === "symbol") return n === "symbol" ? null : JSON.stringify(Ho(t));
    if (n !== "object") return null;
    if (typeof t.nodeType == "number") return JSON.stringify(Ho(t));
    if (e.has(t)) return null;
    e.add(t);
    try {
      if (Array.isArray(t)) {
        let i = [];
        for (let s of t) {
          let a = ki(s, e);
          if (a === null) return null;
          i.push(a);
        }
        return "[" + i.join(",") + "]";
      }
      let o = Object.getPrototypeOf(t);
      if (o !== Object.prototype && o !== null) return JSON.stringify(Ho(t));
      let r = [];
      for (let i of Object.keys(t).sort()) {
        let s = t[i];
        if (s === void 0) continue;
        let a = ki(s, e);
        if (a === null) return null;
        r.push(JSON.stringify(i) + ":" + a);
      }
      return "{" + r.join(",") + "}";
    } finally {
      e.delete(t);
    }
  }
  function Ql(t, e) {
    let { burst: n, invalidate: o, ...r } = t || {};
    try {
      let i = ki(r, /* @__PURE__ */ new Set());
      return i === null ? null : `${(e || []).map(cn).join(",")}:${i}`;
    } catch {
      return null;
    }
  }
  function rc(t, e, n, o, r = null) {
    let i = bi.get(t);
    i || (i = Lh(t), i.baselineSignature = Ql(e, n.plugins), bi.set(t, i));
    let s = Ql(e, n.plugins), a = async () => {
      if (await Yn(), i.disposed) return o();
      let u = s === null || s !== i.baselineSignature;
      u && s !== null ? i.pendingSig === s ? (i.baselineSignature = s, i.last = null, i.dirty = true, i.dirtyRoots = null, i.pendingSig = null, u = false) : i.pendingSig = s : i.pendingSig = null, wi(t, i), Si(t, i);
      for (let M of i.observers) M.__flush(M.takeRecords());
      Ut();
      let c = kn(t);
      i.dirty && i.outsideMutations !== c && i.dirtyAll(), i.outsideMutations = c;
      let f = t.getRootNode?.(), d = [...i.trackedShadowRoots.keys()];
      f?.nodeType === 11 && !d.includes(f) && d.push(f), eo(t.ownerDocument || document, d);
      let h = Mn(t);
      i.styleStamp !== h && (i.styleStamp = h, i.dirty || i.dirtyAll());
      let m = Xl(t, i), g = Yl(t, i);
      m.animation = Kl(g), i.renderState && (!ln(i.renderState, m, "style") && (Ve(), i.dirtyAll()), ln(i.renderState, m, "scroll") || i.dirtyAll(), ln(i.renderState, m, "controls") || (ve(t), i.dirtyAll()), !ln(i.renderState, m, "images") && !i.dirty && i.dirtyAll());
      let p = je();
      i.envEpoch !== p && (i.dirtyAll(), i.envEpoch = p);
      let y = Se();
      if (i.styleEpoch !== y && (i.styleEpoch = y, !i.dirty)) {
        let M = Hl(t);
        i.geometry !== null && M !== i.geometry && (ve(t), i.dirtyAll()), i.geometry = M;
      }
      n.invalidate && i.dirtyAll();
      let b = false, w = !!i.renderState && !ln(i.renderState, m, "animation");
      try {
        let M = /* @__PURE__ */ new Set();
        w && g.length === 0 && (M = null);
        for (let $2 of g) {
          let F = $2.playState === "running";
          if (!F && !w) continue;
          F && (b = true), w = true;
          let A = $2.effect?.target;
          if (Nh(t, i, A) === t) M.add(A);
          else {
            M = null;
            break;
          }
        }
        if (w && M && M.size && i.retained) {
          i.dirty = true;
          for (let $2 of M) i.dirtyRoots && i.dirtyRoots.add($2), ve($2);
        } else w && !M && i.dirtyAll();
      } catch {
      }
      let S = m.frameDriven, v = b || S;
      if (v && (i.last = null), S && i.dirtyAll(), !u && !v && !i.dirty && i.last) return jl(t, i), i.last;
      i.capturing = true;
      let C = null;
      try {
        let M = null, $2 = false, F = null;
        if (!u && i.dirty && i.retained && i.dirtyRoots && i.dirtyRoots.size && r) {
          F = [...i.dirtyRoots];
          let A = await Ul(t, i, n);
          A && (M = await r(A), $2 = true);
        }
        if (M || (u || (n.__retain = (A) => {
          let x = /* @__PURE__ */ new Map();
          for (let [_, P] of A.nodeMap.entries()) x.set(P, _);
          C = { ...A, srcToClone: x };
        }), n.__tornSinceStart = () => {
          for (let A of i.observers) for (let x of A.takeRecords()) i.pending.push(x);
          return Ut(), i.torn || Vl(i.pending) || kn(t) !== c;
        }, M = await o()), !u && !i.disposed) {
          i.dirty = false, i.dirtyRoots = /* @__PURE__ */ new Set(), C ? (i.retained = C, i.retainedFrameDriven = ql(C), vi(t, i), Ci(t, i)) : $2 && (i.retainedFrameDriven || (i.retainedFrameDriven = ql(i.retained, F)), vi(t, i), Ci(t, i));
          let A = Xl(t, i);
          A.animation = Kl(Yl(t, i));
          let x = ["style", "scroll", "controls", "images"];
          b || x.push("animation");
          let _ = x.every((P) => ln(m, A, P));
          i.renderState = A, i.styleEpoch = Se(), i.styleStamp = Mn(t), i.geometry = Hl(t), i.renderState.frameDriven ? (Zl.add(t), ec(t, i)) : _ ? !v && !i.renderState.frameDriven && (i.last = M, jl(t, i)) : (i.dirtyAll(), i.last = null);
        }
        return M;
      } finally {
        n.__retain = void 0, n.__tornSinceStart = void 0;
        for (let $2 of i.observers) for (let F of $2.takeRecords()) i.pending.push(F);
        Ut();
        let M = kn(t);
        (i.torn || Vl(i.pending) || M !== c) && (i.dirtyAll(), i.last = null), i.outsideMutations = M, i.styleEpoch = Se(), i.styleStamp = Mn(t), i.pending.length = 0, i.torn = false, i.capturing = false, i.disposed || (wi(t, i), Si(t, i));
      }
    }, l = i.inflight.then(a, a);
    return i.inflight = l.catch(() => {
    }), l;
  }
  function ac(t) {
    Go = t;
  }
  function lc(t, e) {
    !Mi || !On || e && e.burst === false || Ai.set(On.control, { element: t, options: e && typeof e == "object" ? { ...e } : e });
  }
  function cc(t) {
    let e = { control: t };
    On = e, setTimeout(() => {
      On === e && (On = null);
    }, 0);
  }
  function Ei(t) {
    let e = t.target, n = e && (e.nodeType === 1 ? e : e.parentElement);
    return n && n.closest ? n.closest(Wh) : null;
  }
  function sc(t) {
    if (t.type === "keydown" && t.key !== "Enter" && t.key !== " ") return;
    let e = Ei(t);
    e && (cc(e), _i(t, false));
  }
  function Oh(t) {
    let e = Ei(t);
    e && cc(e);
  }
  function _i(t, e = true) {
    if (!Go || document.visibilityState === "hidden") return;
    let n = Ei(t);
    if (!n || t.type === "pointerenter" && t.target !== n) return;
    let o = Ai.get(n);
    if (o) {
      if (!o.element.isConnected) {
        Ai.delete(n);
        return;
      }
      Go(o.element, o.options).catch(() => {
      });
      return;
    }
    e && !ic && (ic = true, Go(document.body, { clip: "viewport", burst: false }).catch(() => {
    }));
  }
  function fc() {
    if (Mi || typeof document > "u" || typeof document.addEventListener != "function") return;
    Mi = true;
    let t = { capture: true, passive: true };
    document.addEventListener("pointerdown", sc, t), document.addEventListener("keydown", sc, t), document.addEventListener("click", Oh, t), document.addEventListener("pointerenter", _i, t), document.addEventListener("focusin", _i, t);
  }
  function cm(...t) {
    return ui(...t), et;
  }
  async function fm(t, e) {
    if (typeof t != "string" || !t.trim()) throw new Error("[SnapDOM] fromString() needs an HTML string.");
    let n = document.createElement("div");
    tt(n), n.style.cssText = "position:fixed;left:-99999px;top:0;pointer-events:none;", n.innerHTML = t, document.body.appendChild(n);
    try {
      await Ct();
      let o = Array.from(n.childNodes).some((i) => i.nodeType === 3 && i.textContent.trim()), r = n.children.length === 1 && !o ? n.firstElementChild : n;
      return await Hi(r, { ...e || {}, burst: false });
    } finally {
      n.remove();
    }
  }
  async function Hi(t, e) {
    if (!t) throw new Error("[SnapDOM] The element cannot be null or undefined.");
    let n = Bl(e);
    n.element = t, n.invalidate && Ve(), Al(n, e && e.plugins);
    let { stage: o, loweredBy: r } = vl(n);
    n.needs = o, n.__needsLoweredBy = r;
    let i = on(o, "render"), s = n.burst === true || !Lo(n), a = typeof n.filter == "function" || !!n.excludePredicates || typeof n.excludeStyleProps == "function" || typeof n.fallbackURL == "function", u = i && !n.captureSelection && n.burst !== false && s && !a && nc(t);
    return u && lc(t, e), n.snap || (n.snap = { toPng: (c, f) => et.toPng(c, f), toSvg: (c, f) => et.toSvg(c, f) }), u ? rc(t, e, n, () => et.capture(t, n, Ui), (c) => Lc(c, n)) : (await Yn(), et.capture(t, n, Ui));
  }
  async function Lc(t, e) {
    let n = e.needs || kt, o = on(n, "render"), r = (k) => kl(n, e.__needsLoweredBy || [], k), i = typeof HTMLCanvasElement < "u" && t instanceof HTMLCanvasElement ? t : null, s = i ? null : t, a = () => s ?? (s = i.toDataURL()), l = i || t;
    i && (t = "");
    let u = e.__compressedSnapshot, c = e.__compressionDensity;
    delete e.__compressedSnapshot, delete e.__compressedAssets;
    let f, d = e.meta || {}, m = (Number.isFinite(e.width) || Number.isFinite(e.height)) && !Y(), g = m ? Number.isFinite(e.width) ? d.targetW / d.vbW : d.targetH / d.vbH : 1, p = m ? Number.isFinite(e.height) ? d.targetH / d.vbH : d.targetW / d.vbW : 1, y = (k) => {
      if (i || !u?.size) return l;
      let I = d.vbW, W = d.vbH, T = k.crop;
      T && (I = Math.max(1, Math.min(I, T.x + T.width) - Math.max(0, T.x)), W = Math.max(1, Math.min(W, T.y + T.height) - Math.max(0, T.y)));
      let N = Number.isFinite(k.width), U = Number.isFinite(k.height);
      return (N && U ? Math.max(k.width / I, k.height / W) : N ? k.width / I * (T ? Math.max(1, p / g) : 1) : U ? k.height / W * (T ? Math.max(1, g / p) : 1) : (k.scale || 1) * Math.max(g, p)) * (k.dpr || 1) <= c ? l : f ?? (f = Tl(a(), u));
    }, b = async (k, I) => {
      let { rasterize: W } = await Promise.resolve().then(() => (un(), Bn));
      return W(l, { ...k, ...I || {}, format: "png" });
    }, w = () => {
      if (!o) throw r("svgString");
      if (i) throw new Error("[SnapDOM] html-in-canvas makes a raster capture; there is no SVG string.");
      let k = t.indexOf(",");
      return k >= 0 ? jn(decodeURIComponent(t.slice(k + 1)), e.__fileSvg) : "";
    }, S = (k) => Object.defineProperty({ ...k || {}, svgString: w }, "url", o ? { get: a, enumerable: true } : { get() {
      throw r("export.url");
    }, enumerable: false, configurable: true }), v = { img: async (k, I) => {
      if (i) return b(k, I);
      let { toImg: W } = await Promise.resolve().then(() => (Oi(), Wi)), T = { ...k, ...I || {} };
      return W(y(T), T);
    }, svg: async (k, I) => {
      if (i) return b(k, I);
      let { toSvg: W } = await Promise.resolve().then(() => (Oi(), Wi)), T = { ...k, ...I || {} };
      return W(y(T), T);
    }, canvas: async (k, I) => {
      let { toCanvas: W } = await Promise.resolve().then(() => (Fe(), yc)), T = { ...k, ...I || {} };
      return W(y(T), T);
    }, blob: async (k, I) => {
      let { toBlob: W } = await Promise.resolve().then(() => (zi(), Fc)), T = { ...k, ...I || {} };
      return W(y(T), T);
    }, png: async (k, I) => {
      let { rasterize: W } = await Promise.resolve().then(() => (un(), Bn)), T = { ...k, ...I || {}, format: "png" };
      return W(y(T), T);
    }, jpeg: async (k, I) => {
      let { rasterize: W } = await Promise.resolve().then(() => (un(), Bn)), T = { ...k, ...I || {}, format: "jpeg" };
      return W(y(T), T);
    }, webp: async (k, I) => {
      let { rasterize: W } = await Promise.resolve().then(() => (un(), Bn)), T = { ...k, ...I || {}, format: "webp" };
      return W(y(T), T);
    }, download: async (k, I) => {
      let { download: W } = await Promise.resolve().then(() => (Pc(), Tc)), T = { ...k, ...I || {} };
      return W(y(T), T);
    } };
    if (!o) for (let k of Object.keys(v)) {
      let I = k === "download" ? "download()" : `to${k.charAt(0).toUpperCase()}${k.slice(1)}()`;
      v[k] = async () => {
        throw r(I);
      };
    }
    let C = {};
    for (let k of ["img", "svg", "canvas", "blob", "png", "jpeg", "webp"]) C[k] = async (I) => v[k](e, { ..._(k, I || {}), [dm]: true });
    C.jpg = C.jpeg;
    let M = (k) => Object.defineProperty({ ...e, ...k }, "options", { value: e, configurable: true }), $2 = M({ artifacts: e.__artifacts || null, export: S(), exports: C }), F = await No("defineExports", $2), A = Object.assign({}, ...F.filter((k) => k && typeof k == "object").reverse()), x = { ...v, ...A };
    x.jpeg && !x.jpg && (x.jpg = (k, I) => x.jpeg(k, I));
    function _(k, I) {
      let W = I || {}, T = { ...e, ...W }, N = typeof W.type == "string" ? W.type.toLowerCase() : "", U = typeof W.format == "string" ? W.format.toLowerCase() : Nc.has(N) ? N : "";
      U && (T.format = U === "jpg" ? "jpeg" : U), T.__explicitFormat = U ? T.format : e.__explicitFormat ?? null, k === "blob" && !T.__explicitFormat && (T.format = i ? "png" : "svg"), T.type = T.format;
      let z = (B) => B === "jpeg" || B === "jpg" || B === "webp";
      return [k, T.format, N].map((B) => typeof B == "string" ? B.toLowerCase() : "").find(z) && (T.backgroundColor == null || T.backgroundColor === "transparent") && (T.backgroundColor = "#ffffff"), T.scale !== 1 && (Number.isFinite(T.width) || Number.isFinite(T.height)) && D(T, "scale ignored: width/height already set the size."), T;
    }
    let P = false, E = Promise.resolve();
    async function R(k, I) {
      let W = Object.freeze(I && typeof I == "object" ? { ...I } : {}), T = async () => {
        let U = x[k];
        if (!U) throw new Error(`[SnapDOM] Unknown export type: ${k}`);
        let z = _(k, W), V = M({ artifacts: e.__artifacts || null, export: S({ type: k, options: z, requestedOptions: W }) }), B = z.format, rt = z.type;
        await No("beforeExport", V, { format: k, options: z });
        let at = z.format !== B ? z.format : z.type !== rt ? z.type : "", pt = typeof at == "string" ? at.toLowerCase() : "";
        Nc.has(pt) && (z.format = pt === "jpg" ? "jpeg" : pt, z.type = z.format, z.__explicitFormat = z.format, /^(?:jpeg|webp)$/.test(z.format) && (z.backgroundColor == null || z.backgroundColor === "transparent") && (z.backgroundColor = "#ffffff"));
        let St = await U(V, z);
        return await No("afterExport", V, { format: k, options: z, result: St }), P || (P = true, await Zt("afterSnap", e)), St;
      }, N = E.then(T);
      return E = N.catch(() => {
      }), N;
    }
    let L = { url: t, needs: n, warnings: e.__session && e.__session.warnings || [], toRaw: () => {
      if (!o) throw r("toRaw()");
      return a();
    }, to: (k, I) => R(k, I), toImg: (k) => R("img", k), toSvg: (k) => R("svg", k), toCanvas: (k) => R("canvas", k), toBlob: (k) => R("blob", k), toPng: (k) => R("png", k), toJpg: (k) => R("jpg", k), toWebp: (k) => R("webp", k), download: (k) => R("download", k) };
    o ? i && Object.defineProperty(L, "url", { get: a, enumerable: true, configurable: true }) : Object.defineProperty(L, "url", { get() {
      throw r("url");
    }, enumerable: false, configurable: true }), Object.defineProperty(L, "meta", o ? { value: e.meta, enumerable: true } : { get() {
      throw r("meta");
    }, enumerable: false, configurable: true });
    for (let k of Object.keys(x)) {
      let I = "to" + k.charAt(0).toUpperCase() + k.slice(1);
      L[I] || (L[I] = (W) => R(k, W));
    }
    return L;
  }
  var Uc, st, re, gt, j, Mt, ir, Hc, Vc, Gc, vt, Ki, fr, Ji, Qt, ye, es, Zc, tf, pr, ef, nf, is, ss, of, ns, rf, os, qn, us, At, mr, gn, cf, ff, uf, ds, df, hs, pf, ps, hf, mf, gf, yf, bf, xf, Be, xr, Sf, bn, dt, vf, wt, Et, Xr, Pn, oi, Jd, Qd, tp, nl, ep, op, H, en, lp, ol, up, Me, Wl, Ol, yc, jt, he, Pi, qo, Xo, Yh, mc, pe, Yo, Dn, Fi, gc, Li, Jh, Qh, Zh, tm, Fe, Bn, un, Wi, Oi, wc, bc, xc, Ec, Sc, rm, im, vc, kc, _c, Mc, Rc, Di, Fc, zi, Tc, Pc, ce, ys, vr, Cf, He, ze, Rt, we, ae, le, Cr, kr, Sn, Mr, vn, Cn, bs, Af, xs, Kn, Ss, Ff, Nf, be, Of, Ar, Uf, Hf, jf, Yf, Kf, Is, Ws, tu, eu, Ue, Os, Cs, Ds, cu, fu, Nr, Us, du, pu, qs, An, Xs, vu, Cu, ku, la, Ir, so, Eu, Fu, $u, Tu, pa, ha, Pu, ma, Wr, ga, Du, lo, Bu, ju, Vu, Yu, Qu, rd, Je, fo, dd, ka, Fa, md, bo, $a, yo, Ta, Md, Ea, Ed, $d, Td, Qe, Ua, Od, Dd, qa, Hd, Gr, qr, Eo, pp, hp, gp, hl, wp, xp, Sp, vp, Fo, Ap, To, yl, nn, In, kt, rn, Dp, zp, _e, Fl, Up, $l, Pl, Nl, Vp, El, Io, Yp, Kp, Kt, Jp, Qp, Ae, eh, rh, ch, gh, zl, bh, Sh, Uo, Ch, gi, bi, jo, Zl, yi, Eh, Wn, tc, Rh, xi, $h, cn, Ih, Jl, Go, Wh, Mi, On, Ai, ic, um, et, Ui, dm, Nc;
  var init_snapdom = __esm({
    "node_modules/@zumer/snapdom/dist/snapdom.mjs"() {
      Uc = Object.defineProperty;
      st = (t, e, n) => () => {
        if (n) throw n[0];
        try {
          return t && (e = t(t = 0)), e;
        } catch (o) {
          throw n = [o], o;
        }
      };
      re = (t, e) => {
        for (var n in e) Uc(t, n, { get: e[n], enumerable: true });
      };
      Mt = st(() => {
        "use strict";
        gt = class extends Map {
          constructor(e = 100, ...n) {
            super(...n), this._maxSize = e;
          }
          set(e, n) {
            if (this.size >= this._maxSize && !this.has(e)) {
              let o = this.keys().next().value;
              o !== void 0 && this.delete(o);
            }
            return super.set(e, n);
          }
        }, j = { image: new gt(100), background: new gt(100), resource: new gt(150), defaultStyle: new gt(64), baseStyle: new gt(50), compress: new gt(50), computedStyle: /* @__PURE__ */ new WeakMap(), measureHints: /* @__PURE__ */ new WeakMap(), warnedReconcile: false };
      });
      vt = st(() => {
        "use strict";
        ir = /^image\/(jpeg|jpg|png|gif|webp|avif|apng|svg\+xml|bmp|x-icon|vnd\.microsoft\.icon)\s*(;|$)/i, Hc = ir;
        Vc = "http://www.w3.org/1999/xhtml", Gc = "http://www.w3.org/2000/svg";
      });
      ye = st(() => {
        "use strict";
        vt();
        Ki = qc("[SnapDOM]", { ttlMs: 3 * 6e4, maxEntries: 10 }), fr = /* @__PURE__ */ new Map(), Ji = 50, Qt = /* @__PURE__ */ new Map();
      });
      es = st(() => {
        "use strict";
        Mt();
        vt();
        ye();
      });
      qn = st(() => {
        "use strict";
        Zc = /* @__PURE__ */ new Set(["r", "cx", "cy", "rx", "ry", "x", "y", "width", "height", "d", "transform", "translate", "rotate", "scale", "transform-origin", "transform-box", "vector-effect"]);
        tf = /^(?:animation|transition)/, pr = ["display", "position", "top", "right", "bottom", "left", "float", "clear", "z-index", "box-sizing", "width", "height", "min-width", "min-height", "max-width", "max-height", "margin-top", "margin-right", "margin-bottom", "margin-left", "padding-top", "padding-right", "padding-bottom", "padding-left", "overflow-x", "overflow-y", "visibility", "opacity", "content-visibility", "vertical-align", "border-top-width", "border-right-width", "border-bottom-width", "border-left-width", "border-top-style", "border-right-style", "border-bottom-style", "border-left-style", "border-top-color", "border-right-color", "border-bottom-color", "border-left-color", "border-top-left-radius", "border-top-right-radius", "border-bottom-right-radius", "border-bottom-left-radius", "flex-direction", "flex-wrap", "flex-grow", "flex-shrink", "flex-basis", "order", "align-items", "align-self", "align-content", "justify-content", "justify-items", "justify-self", "row-gap", "column-gap", "grid-template-columns", "grid-template-rows", "grid-auto-flow", "grid-auto-columns", "grid-auto-rows", "grid-column-start", "grid-column-end", "grid-row-start", "grid-row-end", "color", "font-family", "font-size", "font-weight", "font-style", "font-stretch", "line-height", "letter-spacing", "word-spacing", "white-space", "text-align", "text-transform", "text-indent", "text-overflow", "text-shadow", "direction", "unicode-bidi", "writing-mode", "text-orientation", "word-break", "overflow-wrap", "tab-size", "list-style-type", "list-style-position", "list-style-image", "counter-reset", "counter-increment", "counter-set", "background-color", "background-image", "background-size", "background-position", "background-repeat", "background-clip", "background-origin", "background-attachment", "box-shadow", "outline-width", "outline-style", "outline-color", "outline-offset", "transform", "transform-origin", "rotate", "scale", "translate", "filter", "mix-blend-mode", "clip-path", "object-fit", "object-position", "border-collapse", "border-spacing", "table-layout", "caption-side", "empty-cells"], ef = ["color", "font-family", "font-size", "font-weight", "font-style", "font-stretch", "font-variant", "font-kerning", "font-feature-settings", "font-variation-settings", "line-height", "letter-spacing", "word-spacing", "white-space", "text-align", "text-align-last", "text-indent", "text-transform", "text-shadow", "text-rendering", "direction", "unicode-bidi", "word-break", "overflow-wrap", "writing-mode", "text-orientation", "hyphens", "tab-size", "visibility", "list-style-type", "list-style-position", "list-style-image", "border-collapse", "border-spacing", "caption-side", "empty-cells", "quotes", "color-scheme", "-webkit-text-fill-color", "-webkit-font-smoothing", "image-rendering"], nf = ["display", "width", "height", "min-width", "min-height"], is = /(?<!\\)::?(?:before|after|first-letter|first-line|marker)/, ss = 2e4, of = /%|\bauto\b|calc\(|var\(/i, ns = { before: /(?<!\\)::?before\b/, after: /(?<!\\)::?after\b/, firstLetter: /(?<!\\)::?first-letter\b/, marker: /(?<!\\)::marker\b/, firstLine: /(?<!\\)::?first-line\b/ }, rf = /(?<!\\)::?(?:before|after|first-letter|first-line|marker)\b/g;
        os = /:(nth-|first-child|last-child|only-|first-of-type|last-of-type|empty|hover|focus|active|target|checked|indeterminate|disabled|enabled|read-only|read-write|placeholder-shown|autofill|valid|invalid|user-valid|user-invalid|in-range|out-of-range|required|optional|default|link|any-link|scope|defined|modal|fullscreen|picture-in-picture|playing|paused|dir\(|lang\(|has\()/;
      });
      At = st(() => {
        "use strict";
        us = /* @__PURE__ */ new WeakSet();
      });
      Be = st(() => {
        "use strict";
        Mt();
        qn();
        At();
        mr = /* @__PURE__ */ new Set(["meta", "script", "noscript", "title", "link", "template"]), gn = /* @__PURE__ */ new Set(["meta", "link", "style", "title", "noscript", "script", "template", "g", "defs", "use", "marker", "mask", "clipPath", "pattern", "symbol", "path", "polygon", "polyline", "line", "circle", "ellipse", "rect", "filter", "lineargradient", "radialgradient", "stop"]);
        cf = /(?:^|-)(animation|transition)(?:-|$)/i, ff = /^(--.+|view-timeline|scroll-timeline|animation-trigger|offset-|position-try|app-region|interactivity|overlay|view-transition|-webkit-locale|-webkit-user-(?:drag|modify)|-webkit-tap-highlight-color|-webkit-text-security)$/i, uf = /* @__PURE__ */ new Set(["cursor", "pointer-events", "touch-action", "user-select", "print-color-adjust", "speak", "reading-flow", "reading-order", "anchor-name", "anchor-scope", "container-name", "container-type", "timeline-scope", "zoom", "stroke-color"]), ds = /* @__PURE__ */ new Map();
        df = /* @__PURE__ */ new Set(["span", "small", "em", "strong", "b", "i", "u", "s", "code", "cite", "mark", "sub", "sup"]), hs = /* @__PURE__ */ new Set(["table", "thead", "tbody", "tfoot", "tr", "td", "th"]), pf = /* @__PURE__ */ new Set(["img", "video", "canvas", "svg", "iframe", "embed", "object", "input", "textarea", "select"]), ps = /* @__PURE__ */ new Set(["width", "max-width", "inline-size", "max-inline-size"]), hf = /* @__PURE__ */ new Set(["mi", "mn", "mo", "ms", "mtext"]), mf = /* @__PURE__ */ new Set(["min-width", "min-inline-size"]), gf = new Map(Object.entries({ "block-size": "height", "inline-size": "width", "min-block-size": "min-height", "min-inline-size": "min-width", "max-block-size": "max-height", "max-inline-size": "max-width", "margin-block-start": "margin-top", "margin-block-end": "margin-bottom", "margin-inline-start": "margin-left", "margin-inline-end": "margin-right", "padding-block-start": "padding-top", "padding-block-end": "padding-bottom", "padding-inline-start": "padding-left", "padding-inline-end": "padding-right", "inset-block-start": "top", "inset-block-end": "bottom", "inset-inline-start": "left", "inset-inline-end": "right", "border-block-start-width": "border-top-width", "border-block-start-style": "border-top-style", "border-block-start-color": "border-top-color", "border-block-end-width": "border-bottom-width", "border-block-end-style": "border-bottom-style", "border-block-end-color": "border-bottom-color", "border-inline-start-width": "border-left-width", "border-inline-start-style": "border-left-style", "border-inline-start-color": "border-left-color", "border-inline-end-width": "border-right-width", "border-inline-end-style": "border-right-style", "border-inline-end-color": "border-right-color", "border-start-start-radius": "border-top-left-radius", "border-start-end-radius": "border-top-right-radius", "border-end-start-radius": "border-bottom-left-radius", "border-end-end-radius": "border-bottom-right-radius", "overflow-block": "overflow-y", "overflow-inline": "overflow-x", "overscroll-behavior-block": "overscroll-behavior-y", "overscroll-behavior-inline": "overscroll-behavior-x", "contain-intrinsic-block-size": "contain-intrinsic-height", "contain-intrinsic-inline-size": "contain-intrinsic-width" }));
        yf = 1e-3;
        bf = /* @__PURE__ */ new Set(["inline-block", "inline-flex", "inline-grid", "inline-table", "inline-flow-root", "table"]);
        xf = ["top", "right", "bottom", "left"];
      });
      dt = st(() => {
        "use strict";
        xr = 16, Sf = 40;
        bn = -1;
      });
      wt = st(() => {
        "use strict";
        vf = 50;
      });
      Et = st(() => {
        "use strict";
        es();
        Be();
        dt();
        vt();
        wt();
      });
      Pn = st(() => {
        "use strict";
        Me();
        Be();
        At();
        Xr = null;
      });
      Me = st(() => {
        "use strict";
        Et();
        Mt();
        At();
        Pn();
        oi = /* @__PURE__ */ new WeakSet();
        Jd = /(?:^|;)position:(absolute|fixed)(?:;|$)/;
        Qd = /* @__PURE__ */ new Set(["xml", "xlink"]);
        tp = /[\uD800-\uDBFF][\uDC00-\uDFFF]|[\x00-\x08\x0B\x0C\x0E-\x1F\uD800-\uDFFF\uFFFE\uFFFF]/g, nl = (t) => t.replace(tp, (e) => e.length === 2 ? e : ""), ep = /^data:[^,]{0,120};base64,/;
        op = /* @__PURE__ */ new Set(["img", "canvas", "video", "iframe", "object", "embed"]);
        H = (t, e = 3) => Number.isFinite(t) ? Math.round(t * 10 ** e) / 10 ** e : t;
        en = 0.75;
        lp = /::-(?:webkit-(?:scrollbar|meter|progress|slider)|moz-(?:meter|progress))/i;
        ol = /* @__PURE__ */ new WeakMap();
        up = [["max-width", "x"], ["min-width", "x"], ["max-height", "y"], ["min-height", "y"]];
      });
      Wl = {};
      re(Wl, { detectDrawApi: () => Il, tryCanvasEngine: () => hh });
      Ol = st(() => {
        "use strict";
        wt();
        At();
        Me();
      });
      yc = {};
      re(yc, { MAX_RASTER_AREA: () => he, MAX_RASTER_SIDE: () => jt, WEBP_MAX_SIDE: () => Pi, __setDecodeFrameIdleMs: () => Kh, cropSvgText: () => Jo, decodeSvgFromDataURL: () => Ee, encodeSvgToDataURL: () => Re, fixSafariShadows: () => Zo, peekSvgHeader: () => Qo, toCanvas: () => te, zoomSvgText: () => Ni });
      Fe = st(() => {
        "use strict";
        dt();
        wt();
        vt();
        At();
        jt = Y() ? 16384 : 32767, he = 16384 * 16384, Pi = 16383;
        qo = null;
        Xo = () => new Promise((t) => {
          requestAnimationFrame(t), setTimeout(t, 50);
        });
        Yh = 24 * 1024 * 1024, mc = 5e3, pe = null, Yo = 0, Dn = 0, Fi = false, gc = mc, Li = 0;
        Jh = 4e6, Qh = 2e6, Zh = 8, tm = ["%3C", "%3E", "%20", "%7B", "%7D", "%3B"];
      });
      Bn = {};
      re(Bn, { rasterize: () => Ii });
      un = st(() => {
        "use strict";
        Fe();
        dt();
      });
      Wi = {};
      re(Wi, { toImg: () => nm, toSvg: () => nm });
      Oi = st(() => {
        "use strict";
        Et();
        wt();
        un();
        Fe();
      });
      wc = {};
      re(wc, { encodePng: () => om });
      xc = st(() => {
        "use strict";
        bc = new Uint32Array(256);
        for (let t = 0; t < 256; t++) {
          let e = t;
          for (let n = 0; n < 8; n++) e = e & 1 ? 3988292384 ^ e >>> 1 : e >>> 1;
          bc[t] = e;
        }
      });
      Ec = {};
      re(Ec, { encodeJpeg: () => am });
      Rc = st(() => {
        "use strict";
        Sc = [0, 1, 5, 6, 14, 15, 27, 28, 2, 4, 7, 13, 16, 26, 29, 42, 3, 8, 12, 17, 25, 30, 41, 43, 9, 11, 18, 24, 31, 40, 44, 53, 10, 19, 23, 32, 39, 45, 52, 54, 20, 22, 33, 38, 46, 51, 55, 60, 21, 34, 37, 47, 50, 56, 59, 61, 35, 36, 48, 49, 57, 58, 62, 63], rm = [16, 11, 10, 16, 24, 40, 51, 61, 12, 12, 14, 19, 26, 58, 60, 55, 14, 13, 16, 24, 40, 57, 69, 56, 14, 17, 22, 29, 51, 87, 80, 62, 18, 22, 37, 56, 68, 109, 103, 77, 24, 35, 55, 64, 81, 104, 113, 92, 49, 64, 78, 87, 103, 121, 120, 101, 72, 92, 95, 98, 112, 100, 103, 99], im = Array.from({ length: 64 }, (t, e) => (e & 7) < 4 && e < 32 ? [17, 18, 24, 47, 18, 21, 26, 66, 24, 26, 56, 99, 47, 66, 99, 99][(e >> 3) * 4 + (e & 7)] : 99), vc = [1, 1.387039845, 1.306562965, 1.175875602, 1, 0.785694958, 0.5411961, 0.275899379];
        kc = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], _c = [[0, 0, [0, 1, 5, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0], kc], [16, 0, [0, 2, 1, 3, 3, 2, 4, 3, 5, 5, 4, 4, 0, 0, 1, 125], Cc([1, 2, 3, 0, 4, 17, 5, 18, 33, 49, 65, 6, 19, 81, 97, 7, 34, 113, 20, 50, 129, 145, 161, 8, 35, 66, 177, 193, 21, 82, 209, 240, 36, 51, 98, 114, 130])], [1, 1, [0, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0], kc], [17, 1, [0, 2, 1, 2, 4, 4, 3, 4, 7, 5, 4, 4, 0, 1, 2, 119], Cc([0, 1, 2, 3, 17, 4, 5, 33, 49, 6, 18, 65, 81, 7, 97, 113, 19, 34, 50, 129, 8, 20, 66, 145, 161, 177, 193, 9, 35, 51, 82, 240, 21, 98, 114, 209, 10, 22, 36, 52, 225, 37, 241])]], Mc = _c.map(([, , t, e]) => {
          let n = [], o = 0, r = 0;
          for (let i = 1; i <= 16; i++, o <<= 1) for (let s = 0; s < t[i - 1]; s++) n[e[r++]] = [o++, i];
          return n;
        });
      });
      Di = st(() => {
        "use strict";
        Fe();
        dt();
      });
      Fc = {};
      re(Fc, { toBlob: () => Bi });
      zi = st(() => {
        "use strict";
        Fe();
        Di();
        vt();
      });
      Tc = {};
      re(Tc, { download: () => lm });
      Pc = st(() => {
        "use strict";
        zi();
        Fe();
        Di();
        dt();
      });
      Et();
      Et();
      dt();
      Mt();
      qn();
      At();
      ye();
      ce = /* @__PURE__ */ new WeakMap();
      ys = ["margin-top", "margin-right", "margin-bottom", "margin-left", "margin-block-start", "margin-block-end", "margin-inline-start", "margin-inline-end"];
      vr = /* @__PURE__ */ new Map();
      Cf = 2e3;
      He = 0;
      ze = /* @__PURE__ */ new WeakMap();
      Rt = 0;
      we = /* @__PURE__ */ new WeakMap();
      ae = 0;
      le = 0;
      Cr = /* @__PURE__ */ new WeakMap();
      kr = /* @__PURE__ */ new WeakSet();
      Sn = [];
      Mr = /* @__PURE__ */ new WeakSet();
      vn = null;
      Cn = [];
      bs = /* @__PURE__ */ new WeakMap();
      Af = ["mask", "mask-image", "-webkit-mask", "-webkit-mask-image", "mask-source", "mask-box-image-source", "mask-border-source", "-webkit-mask-box-image-source", "border-image", "border-image-source"];
      xs = /* @__PURE__ */ new WeakMap();
      Kn = /* @__PURE__ */ new Map();
      Ss = /* @__PURE__ */ new WeakMap();
      Ff = { before: null, after: null, firstLetter: null, marker: null, firstLine: null };
      Nf = /(?:rgba?|hsla?|oklch|oklab|lab|lch|color)\([^()]*\)/g;
      Of = /* @__PURE__ */ new Set(["auto", "min-content", "max-content", "stretch", "fill-available", "-webkit-fill-available"]);
      Ar = /* @__PURE__ */ new WeakMap();
      Uf = /^(width|height|inline-size|block-size|top|right|bottom|left|transform-origin|perspective-origin)$|^inset-/;
      Hf = /(margin|padding)[a-z-]*\s*:[^;]*(%|\bauto\b|calc\(|var\()/i;
      jf = /* @__PURE__ */ new Set(["INPUT", "TEXTAREA", "SELECT", "OPTION", "OPTGROUP", "PROGRESS", "METER", "BUTTON", "DATALIST"]);
      Yf = /%|[\d.](?:em|rem|ex|ch|cap|ic|lh|rlh|v[whib]|vmin|vmax|cq[whbi]|cqmin|cqmax)\b|\b(?:calc|var|min|max|clamp|env|attr)\(|\b(?:auto|inherit|initial|unset|revert|currentcolor|-webkit-fill-available|fit-content|min-content|max-content)\b/i;
      Kf = (t) => t.tagName === "INPUT" || t.tagName === "TEXTAREA";
      Is = ["border-top-width", "border-right-width", "border-bottom-width", "border-left-width"];
      Ws = ["width", "inline-size", "height", "block-size"];
      tu = ["box-sizing", ...Ws, "overflow-x", "overflow-y"];
      eu = /(?:box-sizing|width|height|inline-size|block-size|overflow(?:-[xy])?)\s*:/i;
      Ue = typeof CSS < "u" && CSS.supports?.("text-wrap-mode", "nowrap") ? "text-wrap-mode" : "white-space";
      Os = 0;
      Cs = 1;
      Ds = 2;
      Be();
      cu = /* @__PURE__ */ new Set(["symbol", "defs"]);
      fu = /* @__PURE__ */ new Set(["mask", "clipPath", "linearGradient", "radialGradient", "pattern", "marker", "filter"]);
      Nr = /* @__PURE__ */ new WeakMap();
      Us = -1;
      Et();
      Et();
      Mt();
      ye();
      qn();
      vt();
      At();
      dt();
      du = /::[a-zA-Z-]+(?:\([^)]*\))?$|(?<!\\):(?:before|after|first-letter|first-line)$/;
      pu = /^::?(?:before|after|first-letter)$/;
      qs = /* @__PURE__ */ new WeakMap();
      An = new gt(80);
      Xs = /\bblob:[^)"'\s]+/g;
      vu = ["font-family", "font-size", "font-style", "font-weight", "font-stretch", "font-variant", "font-feature-settings", "font-variation-settings", "font-kerning", "letter-spacing", "text-transform"];
      Cu = /* @__PURE__ */ new Set(["text", "search", "email", "url", "tel", "number", "submit", "reset", "button"]);
      ku = /[^\s\uD800-\uDFFF]{2,}/;
      dt();
      la = /* @__PURE__ */ new Set(["rgba(0, 0, 0, 0)", "transparent"]);
      Ir = "Highlight";
      so = (t) => Number.parseFloat(t) || 0;
      Eu = ["font-family", "font-size", "font-weight", "font-style", "font-variant", "font-stretch", "letter-spacing", "word-spacing", "text-transform", "text-indent", "text-align", "line-height", "tab-size", "direction"];
      At();
      wt();
      Fu = ["transform", "translate", "rotate", "scale", "transform-origin", "transform-box"];
      $u = { circle: ["cx", "cy", "r", "vector-effect"], ellipse: ["cx", "cy", "rx", "ry", "vector-effect"], rect: ["x", "y", "width", "height", "rx", "ry", "vector-effect"], path: ["d", "vector-effect"], line: ["vector-effect"], polyline: ["vector-effect"], polygon: ["vector-effect"], use: ["x", "y", "width", "height", "vector-effect"], g: [], clipPath: [] };
      Tu = { r: "0px", cx: "0px", cy: "0px", x: "0px", y: "0px", rx: "auto", ry: "auto", width: "auto", height: "auto", d: "none", "vector-effect": "none", transform: "none", translate: "none", rotate: "none", scale: "none", "transform-origin": "0px 0px", "transform-box": "view-box" };
      pa = /* @__PURE__ */ new Set(["transform", "translate", "rotate", "scale"]);
      ha = /* @__PURE__ */ new WeakMap();
      Pu = /* @__PURE__ */ new Map();
      ma = /^-?(?:\d+\.?\d*|\.\d+)(?:e[+-]?\d+)?(?:px)?$/i;
      Wr = /* @__PURE__ */ new Map();
      ga = /* @__PURE__ */ new Set(["IFRAME"]);
      Du = /* @__PURE__ */ new Set(["style", "option", "optgroup"]);
      lo = 200;
      Bu = /* @__PURE__ */ new Set(["img", "canvas", "video", "iframe", "object", "embed"]);
      ju = /^(block|flow-root|list-item|inline-block)$/;
      Vu = /^(block|flow-root|flex|grid|table)$/;
      Yu = /^(block|flow-root|list-item|flex|grid|inline-block|inline-flex|inline-grid|inline)$/;
      Qu = 0.95;
      Ke("IFRAME", Ju);
      Ke("CANVAS", ed);
      Ke("VIDEO", nd);
      Ke("AUDIO", od);
      Ke("OBJECT", Ca);
      Ke("EMBED", Ca);
      wt();
      Et();
      vt();
      Be();
      Mt();
      At();
      dt();
      wt();
      rd = [/font\s*awesome/i, /material\s*icons/i, /ionicons/i, /glyphicons/i, /feather/i, /bootstrap\s*icons/i, /remix\s*icons/i, /heroicons/i, /layui/i, /lucide/i];
      Je = Object.assign({ materialIconsFilled: "https://fonts.gstatic.com/s/materialicons/v48/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2", materialIconsOutlined: "https://fonts.gstatic.com/s/materialiconsoutlined/v110/gok-H7zzDkdnRel8-DQ6KAXJ69wP1tGnf4ZGhUcel5euIg.woff2", materialIconsRound: "https://fonts.gstatic.com/s/materialiconsround/v109/LDItaoyNOAY6Uewc665JcIzCKsKc_M9flwmPq_HTTw.woff2", materialIconsSharp: "https://fonts.gstatic.com/s/materialiconssharp/v110/oPWQ_lt5nv4pWNJpghLP75WiFR4kLh3kvmvRImcycg.woff2" }, typeof window < "u" && window.__SNAPDOM_ICON_FONTS__ || {});
      fo = /* @__PURE__ */ new Map();
      dd = /(?:^|;)font-family:([^;]*)/;
      ka = /* @__PURE__ */ new WeakSet();
      ye();
      dt();
      At();
      wt();
      Fa = /* @__PURE__ */ new Set(["serif", "sans-serif", "monospace", "cursive", "fantasy", "system-ui", "emoji", "math", "fangsong", "ui-serif", "ui-sans-serif", "ui-monospace", "ui-rounded"]);
      md = ["katex", "mathjax", "mathml"];
      bo = "";
      $a = /@import\s+(?:url\(\s*(['"]?)([^)"']+)\1\s*\)|(['"])([^"']+)\3)([^;]*);/g;
      yo = 4;
      Ta = /url\((["']?)([^"')]+)\1\)/g;
      Md = /@font-face[^{}]*\{[^}]*\}/g;
      Ea = /* @__PURE__ */ new WeakMap();
      Ed = 0;
      wt();
      vt();
      $d = /\b(counter|counters)\s*\(((?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|[^)"'])+)\)/g;
      Td = /(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|[^,"'])+/g;
      ye();
      Qe = /* @__PURE__ */ new WeakMap();
      Ua = 1e3;
      Od = ["color", "-webkit-text-fill-color", "font-family", "font-size", "font-weight", "font-style", "letter-spacing", "line-height"];
      Dd = ["color", "-webkit-text-fill-color", "font-family", "font-size", "font-weight", "font-style", "font-variant", "letter-spacing", "word-spacing", "text-transform", "text-decoration-line", "text-decoration-color", "text-decoration-style", "line-height", "background-color", "vertical-align"];
      qa = "http://www.w3.org/2000/svg";
      Hd = ["background-image", "background-size", "background-position", "background-repeat", "background-origin"];
      vt();
      vt();
      Gr = /* @__PURE__ */ new WeakMap();
      qr = /* @__PURE__ */ new WeakMap();
      Me();
      dt();
      Eo = /* @__PURE__ */ new Set();
      pp = /^(?:IMG|VIDEO|CANVAS|IFRAME|EMBED|OBJECT|SVG|svg|INPUT|SELECT|TEXTAREA|BUTTON)$/;
      hp = "[data-sd-ph]::placeholder{color:var(--sd-ph)!important;opacity:var(--sd-ph-o)!important;-webkit-text-fill-color:var(--sd-ph)!important}";
      gp = ["grid-template-columns", "grid-template-rows", "grid-template-areas", "grid-auto-columns", "grid-auto-rows", "grid-auto-flow", "row-gap", "column-gap", "align-items", "justify-items", "align-content", "justify-content", "flex-direction", "flex-wrap"];
      ye();
      wt();
      Mt();
      hl = "http://www.w3.org/1999/xlink";
      dt();
      Et();
      wp = ["background-image", "mask", "mask-image", "-webkit-mask", "-webkit-mask-image", "mask-source", "mask-box-image-source", "mask-border-source", "-webkit-mask-box-image-source", "border-image", "border-image-source"];
      xp = ["mask-position", "mask-size", "mask-repeat", "mask-mode", "mask-composite", "-webkit-mask-position", "-webkit-mask-size", "-webkit-mask-repeat", "-webkit-mask-composite", "mask-origin", "mask-clip", "-webkit-mask-origin", "-webkit-mask-clip", "-webkit-mask-position-x", "-webkit-mask-position-y"];
      Sp = ["background-position", "background-position-x", "background-position-y", "background-size", "background-repeat", "background-origin", "background-clip", "background-attachment", "background-blend-mode"];
      vp = ["border-image-slice", "border-image-width", "border-image-outset", "border-image-repeat"];
      Fo = (t) => Math.round(t * 100) / 100;
      Et();
      Ap = /* @__PURE__ */ new Set(["IMG", "INPUT", "TEXTAREA", "SELECT", "CANVAS", "VIDEO", "AUDIO", "IFRAME", "EMBED", "OBJECT", "PROGRESS", "METER", "HR", "BR"]);
      To = 128;
      Et();
      dt();
      Mt();
      Mt();
      wt();
      dt();
      yl = /[\u0600-\u08FF\u1800-\u18AF\uFB50-\uFDFF\uFE70-\uFEFF]/;
      nn = ["clone", "render"];
      In = { clone: 0, render: 1 };
      kt = "render";
      rn = [];
      Dp = 0;
      zp = ["resolveNode", "beforeSnap", "beforeClone", "afterClone", "beforeRender", "afterRender"];
      Mt();
      Be();
      Pn();
      _e = "data-snapdom-asset";
      Fl = "http://www.w3.org/1999/xlink";
      Up = 0;
      $l = (t, e) => e.kind === "style" ? t.style?.getPropertyValue(e.name) : t.getAttribute(e.name);
      Pl = 0.92;
      Nl = 1;
      Vp = 64 * 1024;
      El = 32 * 1024 * 1024;
      Io = /* @__PURE__ */ new Map();
      Yp = `self.onmessage = async (e) => {
  const { id, dataURL, blob: given, srcLength, targetW, targetH, resFactor, quality, mime } = e.data
  try {
    const blob = given || await (await fetch(dataURL)).blob()
    const bmp = await createImageBitmap(blob)
    const nw = bmp.width, nh = bmp.height
    if (!nw || !nh) { bmp.close(); self.postMessage({ id, url: null }); return }
    const raw = Math.min(1, Math.max(targetW / nw, targetH / nh))
    if (!(raw > 0) || raw >= 0.95) { bmp.close(); self.postMessage({ id, url: null }); return }
    const factor = raw * resFactor
    const ow = Math.max(1, Math.round(nw * factor))
    const oh = Math.max(1, Math.round(nh * factor))
    const canvas = new OffscreenCanvas(ow, oh)
    const ctx = canvas.getContext('2d')
    ctx.imageSmoothingEnabled = true
    ctx.imageSmoothingQuality = 'high'
    ctx.drawImage(bmp, 0, 0, ow, oh)
    bmp.close()
    const out = await canvas.convertToBlob({ type: mime, quality })
    const url = new FileReaderSync().readAsDataURL(out)
    self.postMessage({ id, url: (url && url.length < srcLength) ? url : null })
  } catch (err) {
    self.postMessage({ id, error: String(err) })
  }
}`;
      Kp = Math.max(1, Math.min(4, (typeof navigator < "u" && navigator.hardwareConcurrency || 2) - 1));
      Kt = null;
      Jp = 0;
      Qp = 0;
      Ae = /* @__PURE__ */ new Map();
      eh = 5e3;
      rh = /^(cover|contain|(\d+(\.\d+)?%(\s+\d+(\.\d+)?%)?))$/;
      Et();
      Mt();
      wt();
      At();
      Me();
      Pn();
      ch = /(?:^|;)(?:box-shadow|text-shadow|outline-style|filter|-webkit-filter):/;
      Me();
      Pn();
      Mt();
      vt();
      wt();
      gh = /* @__PURE__ */ new Set(["png", "jpeg", "jpg", "webp", "svg"]);
      dt();
      wt();
      Et();
      Me();
      zl = "svg,iframe,canvas,video,audio,object,embed,slot,template,picture,style,pre";
      bh = /(?:^|;)\s*(?:-webkit-)?backdrop-filter:\s*(?!none(?:\s*!important)?(?:;|$))[^;]+/i;
      Sh = 1 / 16;
      Uo = /* @__PURE__ */ new Map();
      Ch = ["width", "height", "min-width", "min-height"];
      gi = { attempts: 0, served: 0, reconciled: 0 };
      vt();
      dt();
      bi = /* @__PURE__ */ new WeakMap();
      jo = /* @__PURE__ */ new WeakMap();
      Zl = /* @__PURE__ */ new WeakSet();
      yi = /* @__PURE__ */ new WeakMap();
      Eh = 64;
      Wn = /* @__PURE__ */ new Map();
      tc = ["scroll", "input", "change", "focusin", "focusout", "pointerdown", "pointerup", "pointercancel", "keydown", "keyup", "beforetoggle", "toggle"];
      Rh = ["(prefers-color-scheme: dark)", "(prefers-reduced-motion: reduce)", "(prefers-contrast: more)", "(forced-colors: active)", "(inverted-colors: inverted)", "(prefers-reduced-transparency: reduce)", "(hover: hover)", "(any-hover: hover)", "(pointer: coarse)", "(any-pointer: coarse)", "(color-gamut: p3)", "(dynamic-range: high)"];
      xi = ["scroll", "change", "beforetoggle", "toggle"];
      $h = /(?:^data:image\/(?:gif|apng)|\.(?:gif|apng)(?=[?#)'"\s;]|$))/i;
      cn = (t) => t && (typeof t == "object" || typeof t == "function") ? Ho(t) : "-";
      Ih = 0;
      Jl = /* @__PURE__ */ new WeakMap();
      Go = null;
      Wh = 'button, a[href], [role="button"], input, select, summary, label, [tabindex]';
      Mi = false;
      On = null;
      Ai = /* @__PURE__ */ new WeakMap();
      ic = false;
      At();
      vt();
      um = "3.7.4";
      et = Object.assign(Hi, { plugins: cm, fromString: fm, version: um, preCapture: fc });
      ac(Hi);
      Ui = /* @__PURE__ */ Symbol("snapdom.internal");
      dm = /* @__PURE__ */ Symbol("snapdom.internal.silent");
      Nc = /* @__PURE__ */ new Set(["png", "jpeg", "jpg", "webp", "svg"]);
      et.capture = async (t, e, n) => {
        if (n !== Ui) throw new Error("[SnapDOM] snapdom.capture() is internal; use snapdom(el).");
        if (on(e.needs || kt, "render") && Y()) {
          if (e.embedFonts) try {
            let i = t.ownerDocument || document, s = null;
            if (e.embedFonts === "auto" && (t.getBoundingClientRect(), s = wo(i).drawn, s.size === 0)) throw null;
            let a = xo(t);
            e.clip || (e.__fontUsage = a);
            let l = a.required;
            if (s && (l = new Set([...l].filter((u) => s.has(Fn(u).toLowerCase()))), l.size === 0)) throw null;
            await So(l, a.usedCodepoints, i);
          } catch {
          }
          let r = Array.from(t.querySelectorAll("canvas"));
          t.tagName === "CANVAS" && r.unshift(t);
          for (let i of r) try {
            if (Rn(i)) continue;
            let s = i.getContext("2d", { willReadFrequently: true });
            s && s.getImageData(0, 0, 1, 1);
          } catch (s) {
            D(e, "Couldn't prepare canvases for Safari.", s);
          }
        }
        let o = await Dl(t, e);
        return Lc(o, e);
      };
      et.toRaw = (t, e) => et(t, e).then((n) => n.toRaw());
      et.toImg = (t, e) => et(t, e).then((n) => n.toImg());
      et.toSvg = (t, e) => et(t, e).then((n) => n.toSvg());
      et.toCanvas = (t, e) => et(t, e).then((n) => n.toCanvas());
      et.toBlob = (t, e) => et(t, e).then((n) => n.toBlob());
      et.toPng = (t, e) => et(t, { ...e, format: "png" }).then((n) => n.toPng());
      et.toJpg = (t, e) => et(t, { ...e, format: "jpeg" }).then((n) => n.toJpg());
      et.toWebp = (t, e) => et(t, { ...e, format: "webp" }).then((n) => n.toWebp());
      et.download = (t, e) => et(t, e).then((n) => n.download());
    }
  });

  // assets/admin/js/builder/layer.js
  var require_layer = __commonJS({
    "assets/admin/js/builder/layer.js"() {
      init_snapdom();
      var $drawerLayer = $("#drawer_layer");
      var $drawerLayerList = $("#drawer_layer_list");
      $drawerLayer[0].addEventListener("sp-hidden", function() {
        $drawerLayerList.find("img").each(function() {
          URL.revokeObjectURL(this.src);
        });
        $drawerLayerList.empty();
      });
      $drawerLayer[0].addEventListener("sp-beforeshow", async function() {
        $drawerLayerList.empty();
        const results = await capturePageBlocks();
        const images = results.map(({ blob, index }) => ({
          index,
          url: URL.createObjectURL(blob)
        }));
        $drawerLayerList.append(renderList(images));
      });
      function renderList(items) {
        const $template = $(`
        <ul class="flex flex-col gap-4"></ul>
    `);
        items.forEach(({ index, url }) => {
          const $item = $(`
            <li class="flex items-center gap-4 border rounded-md p-2">
                <div class="preview-image">
                    <img src="" alt="">
                </div>

                <div class="flex ml-auto">
                    <button type="button" name="up" class="btn btn-sm btn-icon btn-ghost" title="\u4E0A\u79FB">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-up preview-icon">
                            <path d="m18 15-6-6-6 6"></path>
                        </svg>
                    </button>

                    <button type="button" name="down" class="btn btn-sm btn-icon btn-ghost" title="\u4E0B\u79FB">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-down preview-icon">
                            <path d="m6 9 6 6 6-6"></path>
                        </svg>
                    </button>

                    <button type="button" name="copy" class="btn btn-sm btn-icon btn-ghost" title="\u590D\u5236">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-copy preview-icon">
                            <rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect>
                            <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path>
                        </svg>
                    </button>

                    <button type="button" name="remove" class="btn btn-sm btn-icon btn-ghost" title="\u5220\u9664">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash preview-icon">
                            <path d="M10 11v6"></path>
                            <path d="M14 11v6"></path>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path>
                            <path d="M3 6h18"></path>
                            <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                    </button>
                </div>
            </li>
        `);
          $item.find("img").attr("src", url);
          $item.attr("data-index", index);
          $template.append($item);
        });
        return $template;
      }
      async function capturePageBlocks() {
        const elements = $("#iframe").contents().find("body").children(":not(script, style, link)").get();
        const results = [];
        for (const [index, element] of elements.entries()) {
          const blob = await captureTrim(element);
          if (blob) {
            results.push({ index, blob });
          }
        }
        return results;
      }
      async function captureTrim(element) {
        const img = await et.toPng(element);
        const canvas = document.createElement("canvas");
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext("2d", {
          willReadFrequently: true
        });
        ctx.drawImage(img, 0, 0);
        const { width, height } = canvas;
        const data = ctx.getImageData(0, 0, width, height).data;
        let minX = width;
        let minY = height;
        let maxX = -1;
        let maxY = -1;
        for (let i = 3; i < data.length; i += 4) {
          if (data[i] === 0) continue;
          const pixel = i >> 2;
          const x = pixel % width;
          const y = pixel / width | 0;
          minX = Math.min(minX, x);
          minY = Math.min(minY, y);
          maxX = Math.max(maxX, x);
          maxY = Math.max(maxY, y);
        }
        if (maxX < 0) return null;
        const result = document.createElement("canvas");
        result.width = maxX - minX + 1;
        result.height = maxY - minY + 1;
        result.getContext("2d").drawImage(
          canvas,
          minX,
          minY,
          result.width,
          result.height,
          0,
          0,
          result.width,
          result.height
        );
        return new Promise((resolve) => {
          result.toBlob(resolve, "image/png");
        });
      }
    }
  });

  // node_modules/interactjs/dist/interact.min.js
  var require_interact_min = __commonJS({
    "node_modules/interactjs/dist/interact.min.js"(exports, module) {
      !(function(t, e) {
        "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : (t = "undefined" != typeof globalThis ? globalThis : t || self).interact = e();
      })(exports, (function() {
        "use strict";
        function t(t2, e2) {
          var n2 = Object.keys(t2);
          if (Object.getOwnPropertySymbols) {
            var r2 = Object.getOwnPropertySymbols(t2);
            e2 && (r2 = r2.filter((function(e3) {
              return Object.getOwnPropertyDescriptor(t2, e3).enumerable;
            }))), n2.push.apply(n2, r2);
          }
          return n2;
        }
        function e(e2) {
          for (var n2 = 1; n2 < arguments.length; n2++) {
            var r2 = null != arguments[n2] ? arguments[n2] : {};
            n2 % 2 ? t(Object(r2), true).forEach((function(t2) {
              a(e2, t2, r2[t2]);
            })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e2, Object.getOwnPropertyDescriptors(r2)) : t(Object(r2)).forEach((function(t2) {
              Object.defineProperty(e2, t2, Object.getOwnPropertyDescriptor(r2, t2));
            }));
          }
          return e2;
        }
        function n(t2) {
          return n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t3) {
            return typeof t3;
          } : function(t3) {
            return t3 && "function" == typeof Symbol && t3.constructor === Symbol && t3 !== Symbol.prototype ? "symbol" : typeof t3;
          }, n(t2);
        }
        function r(t2, e2) {
          if (!(t2 instanceof e2)) throw new TypeError("Cannot call a class as a function");
        }
        function i(t2, e2) {
          for (var n2 = 0; n2 < e2.length; n2++) {
            var r2 = e2[n2];
            r2.enumerable = r2.enumerable || false, r2.configurable = true, "value" in r2 && (r2.writable = true), Object.defineProperty(t2, d(r2.key), r2);
          }
        }
        function o(t2, e2, n2) {
          return e2 && i(t2.prototype, e2), n2 && i(t2, n2), Object.defineProperty(t2, "prototype", { writable: false }), t2;
        }
        function a(t2, e2, n2) {
          return (e2 = d(e2)) in t2 ? Object.defineProperty(t2, e2, { value: n2, enumerable: true, configurable: true, writable: true }) : t2[e2] = n2, t2;
        }
        function s(t2, e2) {
          if ("function" != typeof e2 && null !== e2) throw new TypeError("Super expression must either be null or a function");
          t2.prototype = Object.create(e2 && e2.prototype, { constructor: { value: t2, writable: true, configurable: true } }), Object.defineProperty(t2, "prototype", { writable: false }), e2 && l(t2, e2);
        }
        function c(t2) {
          return c = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t3) {
            return t3.__proto__ || Object.getPrototypeOf(t3);
          }, c(t2);
        }
        function l(t2, e2) {
          return l = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t3, e3) {
            return t3.__proto__ = e3, t3;
          }, l(t2, e2);
        }
        function u(t2) {
          if (void 0 === t2) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return t2;
        }
        function p(t2) {
          var e2 = (function() {
            if ("undefined" == typeof Reflect || !Reflect.construct) return false;
            if (Reflect.construct.sham) return false;
            if ("function" == typeof Proxy) return true;
            try {
              return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {
              }))), true;
            } catch (t3) {
              return false;
            }
          })();
          return function() {
            var n2, r2 = c(t2);
            if (e2) {
              var i2 = c(this).constructor;
              n2 = Reflect.construct(r2, arguments, i2);
            } else n2 = r2.apply(this, arguments);
            return (function(t3, e3) {
              if (e3 && ("object" == typeof e3 || "function" == typeof e3)) return e3;
              if (void 0 !== e3) throw new TypeError("Derived constructors may only return object or undefined");
              return u(t3);
            })(this, n2);
          };
        }
        function f() {
          return f = "undefined" != typeof Reflect && Reflect.get ? Reflect.get.bind() : function(t2, e2, n2) {
            var r2 = (function(t3, e3) {
              for (; !Object.prototype.hasOwnProperty.call(t3, e3) && null !== (t3 = c(t3)); ) ;
              return t3;
            })(t2, e2);
            if (r2) {
              var i2 = Object.getOwnPropertyDescriptor(r2, e2);
              return i2.get ? i2.get.call(arguments.length < 3 ? t2 : n2) : i2.value;
            }
          }, f.apply(this, arguments);
        }
        function d(t2) {
          var e2 = (function(t3, e3) {
            if ("object" != typeof t3 || null === t3) return t3;
            var n2 = t3[Symbol.toPrimitive];
            if (void 0 !== n2) {
              var r2 = n2.call(t3, e3 || "default");
              if ("object" != typeof r2) return r2;
              throw new TypeError("@@toPrimitive must return a primitive value.");
            }
            return ("string" === e3 ? String : Number)(t3);
          })(t2, "string");
          return "symbol" == typeof e2 ? e2 : e2 + "";
        }
        var h = function(t2) {
          return !(!t2 || !t2.Window) && t2 instanceof t2.Window;
        }, v = void 0, g = void 0;
        function m(t2) {
          v = t2;
          var e2 = t2.document.createTextNode("");
          e2.ownerDocument !== t2.document && "function" == typeof t2.wrap && t2.wrap(e2) === e2 && (t2 = t2.wrap(t2)), g = t2;
        }
        function y(t2) {
          return h(t2) ? t2 : (t2.ownerDocument || t2).defaultView || g.window;
        }
        "undefined" != typeof window && window && m(window);
        var b = function(t2) {
          return !!t2 && "object" === n(t2);
        }, x = function(t2) {
          return "function" == typeof t2;
        }, w = { window: function(t2) {
          return t2 === g || h(t2);
        }, docFrag: function(t2) {
          return b(t2) && 11 === t2.nodeType;
        }, object: b, func: x, number: function(t2) {
          return "number" == typeof t2;
        }, bool: function(t2) {
          return "boolean" == typeof t2;
        }, string: function(t2) {
          return "string" == typeof t2;
        }, element: function(t2) {
          if (!t2 || "object" !== n(t2)) return false;
          var e2 = y(t2) || g;
          return /object|function/.test("undefined" == typeof Element ? "undefined" : n(Element)) ? t2 instanceof Element || t2 instanceof e2.Element : 1 === t2.nodeType && "string" == typeof t2.nodeName;
        }, plainObject: function(t2) {
          return b(t2) && !!t2.constructor && /function Object\b/.test(t2.constructor.toString());
        }, array: function(t2) {
          return b(t2) && void 0 !== t2.length && x(t2.splice);
        } };
        function E(t2) {
          var e2 = t2.interaction;
          if ("drag" === e2.prepared.name) {
            var n2 = e2.prepared.axis;
            "x" === n2 ? (e2.coords.cur.page.y = e2.coords.start.page.y, e2.coords.cur.client.y = e2.coords.start.client.y, e2.coords.velocity.client.y = 0, e2.coords.velocity.page.y = 0) : "y" === n2 && (e2.coords.cur.page.x = e2.coords.start.page.x, e2.coords.cur.client.x = e2.coords.start.client.x, e2.coords.velocity.client.x = 0, e2.coords.velocity.page.x = 0);
          }
        }
        function T(t2) {
          var e2 = t2.iEvent, n2 = t2.interaction;
          if ("drag" === n2.prepared.name) {
            var r2 = n2.prepared.axis;
            if ("x" === r2 || "y" === r2) {
              var i2 = "x" === r2 ? "y" : "x";
              e2.page[i2] = n2.coords.start.page[i2], e2.client[i2] = n2.coords.start.client[i2], e2.delta[i2] = 0;
            }
          }
        }
        var S = { id: "actions/drag", install: function(t2) {
          var e2 = t2.actions, n2 = t2.Interactable, r2 = t2.defaults;
          n2.prototype.draggable = S.draggable, e2.map.drag = S, e2.methodDict.drag = "draggable", r2.actions.drag = S.defaults;
        }, listeners: { "interactions:before-action-move": E, "interactions:action-resume": E, "interactions:action-move": T, "auto-start:check": function(t2) {
          var e2 = t2.interaction, n2 = t2.interactable, r2 = t2.buttons, i2 = n2.options.drag;
          if (i2 && i2.enabled && (!e2.pointerIsDown || !/mouse|pointer/.test(e2.pointerType) || 0 != (r2 & n2.options.drag.mouseButtons))) return t2.action = { name: "drag", axis: "start" === i2.lockAxis ? i2.startAxis : i2.lockAxis }, false;
        } }, draggable: function(t2) {
          return w.object(t2) ? (this.options.drag.enabled = false !== t2.enabled, this.setPerAction("drag", t2), this.setOnEvents("drag", t2), /^(xy|x|y|start)$/.test(t2.lockAxis) && (this.options.drag.lockAxis = t2.lockAxis), /^(xy|x|y)$/.test(t2.startAxis) && (this.options.drag.startAxis = t2.startAxis), this) : w.bool(t2) ? (this.options.drag.enabled = t2, this) : this.options.drag;
        }, beforeMove: E, move: T, defaults: { startAxis: "xy", lockAxis: "xy" }, getCursor: function() {
          return "move";
        }, filterEventType: function(t2) {
          return 0 === t2.search("drag");
        } }, _ = S, P = { init: function(t2) {
          var e2 = t2;
          P.document = e2.document, P.DocumentFragment = e2.DocumentFragment || O2, P.SVGElement = e2.SVGElement || O2, P.SVGSVGElement = e2.SVGSVGElement || O2, P.SVGElementInstance = e2.SVGElementInstance || O2, P.Element = e2.Element || O2, P.HTMLElement = e2.HTMLElement || P.Element, P.Event = e2.Event, P.Touch = e2.Touch || O2, P.PointerEvent = e2.PointerEvent || e2.MSPointerEvent;
        }, document: null, DocumentFragment: null, SVGElement: null, SVGSVGElement: null, SVGElementInstance: null, Element: null, HTMLElement: null, Event: null, Touch: null, PointerEvent: null };
        function O2() {
        }
        var k = P;
        var D2 = { init: function(t2) {
          var e2 = k.Element, n2 = t2.navigator || {};
          D2.supportsTouch = "ontouchstart" in t2 || w.func(t2.DocumentTouch) && k.document instanceof t2.DocumentTouch, D2.supportsPointerEvent = false !== n2.pointerEnabled && !!k.PointerEvent, D2.isIOS = /iP(hone|od|ad)/.test(n2.platform), D2.isIOS7 = /iP(hone|od|ad)/.test(n2.platform) && /OS 7[^\d]/.test(n2.appVersion), D2.isIe9 = /MSIE 9/.test(n2.userAgent), D2.isOperaMobile = "Opera" === n2.appName && D2.supportsTouch && /Presto/.test(n2.userAgent), D2.prefixedMatchesSelector = "matches" in e2.prototype ? "matches" : "webkitMatchesSelector" in e2.prototype ? "webkitMatchesSelector" : "mozMatchesSelector" in e2.prototype ? "mozMatchesSelector" : "oMatchesSelector" in e2.prototype ? "oMatchesSelector" : "msMatchesSelector", D2.pEventTypes = D2.supportsPointerEvent ? k.PointerEvent === t2.MSPointerEvent ? { up: "MSPointerUp", down: "MSPointerDown", over: "mouseover", out: "mouseout", move: "MSPointerMove", cancel: "MSPointerCancel" } : { up: "pointerup", down: "pointerdown", over: "pointerover", out: "pointerout", move: "pointermove", cancel: "pointercancel" } : null, D2.wheelEvent = k.document && "onmousewheel" in k.document ? "mousewheel" : "wheel";
        }, supportsTouch: null, supportsPointerEvent: null, isIOS7: null, isIOS: null, isIe9: null, isOperaMobile: null, prefixedMatchesSelector: null, pEventTypes: null, wheelEvent: null };
        var I = D2;
        function M(t2, e2) {
          if (t2.contains) return t2.contains(e2);
          for (; e2; ) {
            if (e2 === t2) return true;
            e2 = e2.parentNode;
          }
          return false;
        }
        function z(t2, e2) {
          for (; w.element(t2); ) {
            if (R(t2, e2)) return t2;
            t2 = A(t2);
          }
          return null;
        }
        function A(t2) {
          var e2 = t2.parentNode;
          if (w.docFrag(e2)) {
            for (; (e2 = e2.host) && w.docFrag(e2); ) ;
            return e2;
          }
          return e2;
        }
        function R(t2, e2) {
          return g !== v && (e2 = e2.replace(/\/deep\//g, " ")), t2[I.prefixedMatchesSelector](e2);
        }
        var C = function(t2) {
          return t2.parentNode || t2.host;
        };
        function j2(t2, e2) {
          for (var n2, r2 = [], i2 = t2; (n2 = C(i2)) && i2 !== e2 && n2 !== i2.ownerDocument; ) r2.unshift(i2), i2 = n2;
          return r2;
        }
        function F(t2, e2, n2) {
          for (; w.element(t2); ) {
            if (R(t2, e2)) return true;
            if ((t2 = A(t2)) === n2) return R(t2, e2);
          }
          return false;
        }
        function X(t2) {
          return t2.correspondingUseElement || t2;
        }
        function Y2(t2) {
          var e2 = t2 instanceof k.SVGElement ? t2.getBoundingClientRect() : t2.getClientRects()[0];
          return e2 && { left: e2.left, right: e2.right, top: e2.top, bottom: e2.bottom, width: e2.width || e2.right - e2.left, height: e2.height || e2.bottom - e2.top };
        }
        function L(t2) {
          var e2, n2 = Y2(t2);
          if (!I.isIOS7 && n2) {
            var r2 = { x: (e2 = (e2 = y(t2)) || g).scrollX || e2.document.documentElement.scrollLeft, y: e2.scrollY || e2.document.documentElement.scrollTop };
            n2.left += r2.x, n2.right += r2.x, n2.top += r2.y, n2.bottom += r2.y;
          }
          return n2;
        }
        function q(t2) {
          for (var e2 = []; t2; ) e2.push(t2), t2 = A(t2);
          return e2;
        }
        function B(t2) {
          return !!w.string(t2) && (k.document.querySelector(t2), true);
        }
        function V(t2, e2) {
          for (var n2 in e2) t2[n2] = e2[n2];
          return t2;
        }
        function W(t2, e2, n2) {
          return "parent" === t2 ? A(n2) : "self" === t2 ? e2.getRect(n2) : z(n2, t2);
        }
        function G(t2, e2, n2, r2) {
          var i2 = t2;
          return w.string(i2) ? i2 = W(i2, e2, n2) : w.func(i2) && (i2 = i2.apply(void 0, r2)), w.element(i2) && (i2 = L(i2)), i2;
        }
        function N(t2) {
          return t2 && { x: "x" in t2 ? t2.x : t2.left, y: "y" in t2 ? t2.y : t2.top };
        }
        function U(t2) {
          return !t2 || "x" in t2 && "y" in t2 || ((t2 = V({}, t2)).x = t2.left || 0, t2.y = t2.top || 0, t2.width = t2.width || (t2.right || 0) - t2.x, t2.height = t2.height || (t2.bottom || 0) - t2.y), t2;
        }
        function H2(t2, e2, n2) {
          t2.left && (e2.left += n2.x), t2.right && (e2.right += n2.x), t2.top && (e2.top += n2.y), t2.bottom && (e2.bottom += n2.y), e2.width = e2.right - e2.left, e2.height = e2.bottom - e2.top;
        }
        function K(t2, e2, n2) {
          var r2 = n2 && t2.options[n2];
          return N(G(r2 && r2.origin || t2.options.origin, t2, e2, [t2 && e2])) || { x: 0, y: 0 };
        }
        function $2(t2, e2) {
          var n2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : function(t3) {
            return true;
          }, r2 = arguments.length > 3 ? arguments[3] : void 0;
          if (r2 = r2 || {}, w.string(t2) && -1 !== t2.search(" ") && (t2 = J(t2)), w.array(t2)) return t2.forEach((function(t3) {
            return $2(t3, e2, n2, r2);
          })), r2;
          if (w.object(t2) && (e2 = t2, t2 = ""), w.func(e2) && n2(t2)) r2[t2] = r2[t2] || [], r2[t2].push(e2);
          else if (w.array(e2)) for (var i2 = 0, o2 = e2; i2 < o2.length; i2++) {
            var a2 = o2[i2];
            $2(t2, a2, n2, r2);
          }
          else if (w.object(e2)) for (var s2 in e2) {
            $2(J(s2).map((function(e3) {
              return "".concat(t2).concat(e3);
            })), e2[s2], n2, r2);
          }
          return r2;
        }
        function J(t2) {
          return t2.trim().split(/ +/);
        }
        var Q = function(t2, e2) {
          return Math.sqrt(t2 * t2 + e2 * e2);
        }, Z = ["webkit", "moz"];
        function tt2(t2, e2) {
          t2.__set || (t2.__set = {});
          var n2 = function(n3) {
            if (Z.some((function(t3) {
              return 0 === n3.indexOf(t3);
            }))) return 1;
            "function" != typeof t2[n3] && "__set" !== n3 && Object.defineProperty(t2, n3, { get: function() {
              return n3 in t2.__set ? t2.__set[n3] : t2.__set[n3] = e2[n3];
            }, set: function(e3) {
              t2.__set[n3] = e3;
            }, configurable: true });
          };
          for (var r2 in e2) n2(r2);
          return t2;
        }
        function et2(t2, e2) {
          t2.page = t2.page || {}, t2.page.x = e2.page.x, t2.page.y = e2.page.y, t2.client = t2.client || {}, t2.client.x = e2.client.x, t2.client.y = e2.client.y, t2.timeStamp = e2.timeStamp;
        }
        function nt2(t2) {
          t2.page.x = 0, t2.page.y = 0, t2.client.x = 0, t2.client.y = 0;
        }
        function rt(t2) {
          return t2 instanceof k.Event || t2 instanceof k.Touch;
        }
        function it(t2, e2, n2) {
          return t2 = t2 || "page", (n2 = n2 || {}).x = e2[t2 + "X"], n2.y = e2[t2 + "Y"], n2;
        }
        function ot(t2, e2) {
          return e2 = e2 || { x: 0, y: 0 }, I.isOperaMobile && rt(t2) ? (it("screen", t2, e2), e2.x += window.scrollX, e2.y += window.scrollY) : it("page", t2, e2), e2;
        }
        function at(t2) {
          return w.number(t2.pointerId) ? t2.pointerId : t2.identifier;
        }
        function st2(t2, e2, n2) {
          var r2 = e2.length > 1 ? lt(e2) : e2[0];
          ot(r2, t2.page), (function(t3, e3) {
            e3 = e3 || {}, I.isOperaMobile && rt(t3) ? it("screen", t3, e3) : it("client", t3, e3);
          })(r2, t2.client), t2.timeStamp = n2;
        }
        function ct(t2) {
          var e2 = [];
          return w.array(t2) ? (e2[0] = t2[0], e2[1] = t2[1]) : "touchend" === t2.type ? 1 === t2.touches.length ? (e2[0] = t2.touches[0], e2[1] = t2.changedTouches[0]) : 0 === t2.touches.length && (e2[0] = t2.changedTouches[0], e2[1] = t2.changedTouches[1]) : (e2[0] = t2.touches[0], e2[1] = t2.touches[1]), e2;
        }
        function lt(t2) {
          for (var e2 = { pageX: 0, pageY: 0, clientX: 0, clientY: 0, screenX: 0, screenY: 0 }, n2 = 0; n2 < t2.length; n2++) {
            var r2 = t2[n2];
            for (var i2 in e2) e2[i2] += r2[i2];
          }
          for (var o2 in e2) e2[o2] /= t2.length;
          return e2;
        }
        function ut2(t2) {
          if (!t2.length) return null;
          var e2 = ct(t2), n2 = Math.min(e2[0].pageX, e2[1].pageX), r2 = Math.min(e2[0].pageY, e2[1].pageY), i2 = Math.max(e2[0].pageX, e2[1].pageX), o2 = Math.max(e2[0].pageY, e2[1].pageY);
          return { x: n2, y: r2, left: n2, top: r2, right: i2, bottom: o2, width: i2 - n2, height: o2 - r2 };
        }
        function pt(t2, e2) {
          var n2 = e2 + "X", r2 = e2 + "Y", i2 = ct(t2), o2 = i2[0][n2] - i2[1][n2], a2 = i2[0][r2] - i2[1][r2];
          return Q(o2, a2);
        }
        function ft2(t2, e2) {
          var n2 = e2 + "X", r2 = e2 + "Y", i2 = ct(t2), o2 = i2[1][n2] - i2[0][n2], a2 = i2[1][r2] - i2[0][r2];
          return 180 * Math.atan2(a2, o2) / Math.PI;
        }
        function dt2(t2) {
          return w.string(t2.pointerType) ? t2.pointerType : w.number(t2.pointerType) ? [void 0, void 0, "touch", "pen", "mouse"][t2.pointerType] : /touch/.test(t2.type || "") || t2 instanceof k.Touch ? "touch" : "mouse";
        }
        function ht(t2) {
          var e2 = w.func(t2.composedPath) ? t2.composedPath() : t2.path;
          return [X(e2 ? e2[0] : t2.target), X(t2.currentTarget)];
        }
        var vt2 = (function() {
          function t2(e2) {
            r(this, t2), this.immediatePropagationStopped = false, this.propagationStopped = false, this._interaction = e2;
          }
          return o(t2, [{ key: "preventDefault", value: function() {
          } }, { key: "stopPropagation", value: function() {
            this.propagationStopped = true;
          } }, { key: "stopImmediatePropagation", value: function() {
            this.immediatePropagationStopped = this.propagationStopped = true;
          } }]), t2;
        })();
        Object.defineProperty(vt2.prototype, "interaction", { get: function() {
          return this._interaction._proxy;
        }, set: function() {
        } });
        var gt2 = function(t2, e2) {
          for (var n2 = 0; n2 < e2.length; n2++) {
            var r2 = e2[n2];
            t2.push(r2);
          }
          return t2;
        }, mt = function(t2) {
          return gt2([], t2);
        }, yt = function(t2, e2) {
          for (var n2 = 0; n2 < t2.length; n2++) if (e2(t2[n2], n2, t2)) return n2;
          return -1;
        }, bt = function(t2, e2) {
          return t2[yt(t2, e2)];
        }, xt2 = (function(t2) {
          s(n2, t2);
          var e2 = p(n2);
          function n2(t3, i2, o2) {
            var a2;
            r(this, n2), (a2 = e2.call(this, i2._interaction)).dropzone = void 0, a2.dragEvent = void 0, a2.relatedTarget = void 0, a2.draggable = void 0, a2.propagationStopped = false, a2.immediatePropagationStopped = false;
            var s2 = "dragleave" === o2 ? t3.prev : t3.cur, c2 = s2.element, l2 = s2.dropzone;
            return a2.type = o2, a2.target = c2, a2.currentTarget = c2, a2.dropzone = l2, a2.dragEvent = i2, a2.relatedTarget = i2.target, a2.draggable = i2.interactable, a2.timeStamp = i2.timeStamp, a2;
          }
          return o(n2, [{ key: "reject", value: function() {
            var t3 = this, e3 = this._interaction.dropState;
            if ("dropactivate" === this.type || this.dropzone && e3.cur.dropzone === this.dropzone && e3.cur.element === this.target) if (e3.prev.dropzone = this.dropzone, e3.prev.element = this.target, e3.rejected = true, e3.events.enter = null, this.stopImmediatePropagation(), "dropactivate" === this.type) {
              var r2 = e3.activeDrops, i2 = yt(r2, (function(e4) {
                var n3 = e4.dropzone, r3 = e4.element;
                return n3 === t3.dropzone && r3 === t3.target;
              }));
              e3.activeDrops.splice(i2, 1);
              var o2 = new n2(e3, this.dragEvent, "dropdeactivate");
              o2.dropzone = this.dropzone, o2.target = this.target, this.dropzone.fire(o2);
            } else this.dropzone.fire(new n2(e3, this.dragEvent, "dragleave"));
          } }, { key: "preventDefault", value: function() {
          } }, { key: "stopPropagation", value: function() {
            this.propagationStopped = true;
          } }, { key: "stopImmediatePropagation", value: function() {
            this.immediatePropagationStopped = this.propagationStopped = true;
          } }]), n2;
        })(vt2);
        function wt2(t2, e2) {
          for (var n2 = 0, r2 = t2.slice(); n2 < r2.length; n2++) {
            var i2 = r2[n2], o2 = i2.dropzone, a2 = i2.element;
            e2.dropzone = o2, e2.target = a2, o2.fire(e2), e2.propagationStopped = e2.immediatePropagationStopped = false;
          }
        }
        function Et2(t2, e2) {
          for (var n2 = (function(t3, e3) {
            for (var n3 = [], r3 = 0, i3 = t3.interactables.list; r3 < i3.length; r3++) {
              var o2 = i3[r3];
              if (o2.options.drop.enabled) {
                var a2 = o2.options.drop.accept;
                if (!(w.element(a2) && a2 !== e3 || w.string(a2) && !R(e3, a2) || w.func(a2) && !a2({ dropzone: o2, draggableElement: e3 }))) for (var s2 = 0, c2 = o2.getAllElements(); s2 < c2.length; s2++) {
                  var l2 = c2[s2];
                  l2 !== e3 && n3.push({ dropzone: o2, element: l2, rect: o2.getRect(l2) });
                }
              }
            }
            return n3;
          })(t2, e2), r2 = 0; r2 < n2.length; r2++) {
            var i2 = n2[r2];
            i2.rect = i2.dropzone.getRect(i2.element);
          }
          return n2;
        }
        function Tt(t2, e2, n2) {
          for (var r2 = t2.dropState, i2 = t2.interactable, o2 = t2.element, a2 = [], s2 = 0, c2 = r2.activeDrops; s2 < c2.length; s2++) {
            var l2 = c2[s2], u2 = l2.dropzone, p2 = l2.element, f2 = l2.rect, d2 = u2.dropCheck(e2, n2, i2, o2, p2, f2);
            a2.push(d2 ? p2 : null);
          }
          var h2 = (function(t3) {
            for (var e3, n3, r3, i3 = [], o3 = 0; o3 < t3.length; o3++) {
              var a3 = t3[o3], s3 = t3[e3];
              if (a3 && o3 !== e3) if (s3) {
                var c3 = C(a3), l3 = C(s3);
                if (c3 !== a3.ownerDocument) if (l3 !== a3.ownerDocument) if (c3 !== l3) {
                  i3 = i3.length ? i3 : j2(s3);
                  var u3 = void 0;
                  if (s3 instanceof k.HTMLElement && a3 instanceof k.SVGElement && !(a3 instanceof k.SVGSVGElement)) {
                    if (a3 === l3) continue;
                    u3 = a3.ownerSVGElement;
                  } else u3 = a3;
                  for (var p3 = j2(u3, s3.ownerDocument), f3 = 0; p3[f3] && p3[f3] === i3[f3]; ) f3++;
                  var d3 = [p3[f3 - 1], p3[f3], i3[f3]];
                  if (d3[0]) for (var h3 = d3[0].lastChild; h3; ) {
                    if (h3 === d3[1]) {
                      e3 = o3, i3 = p3;
                      break;
                    }
                    if (h3 === d3[2]) break;
                    h3 = h3.previousSibling;
                  }
                } else r3 = s3, void 0, void 0, (parseInt(y(n3 = a3).getComputedStyle(n3).zIndex, 10) || 0) >= (parseInt(y(r3).getComputedStyle(r3).zIndex, 10) || 0) && (e3 = o3);
                else e3 = o3;
              } else e3 = o3;
            }
            return e3;
          })(a2);
          return r2.activeDrops[h2] || null;
        }
        function St(t2, e2, n2) {
          var r2 = t2.dropState, i2 = { enter: null, leave: null, activate: null, deactivate: null, move: null, drop: null };
          return "dragstart" === n2.type && (i2.activate = new xt2(r2, n2, "dropactivate"), i2.activate.target = null, i2.activate.dropzone = null), "dragend" === n2.type && (i2.deactivate = new xt2(r2, n2, "dropdeactivate"), i2.deactivate.target = null, i2.deactivate.dropzone = null), r2.rejected || (r2.cur.element !== r2.prev.element && (r2.prev.dropzone && (i2.leave = new xt2(r2, n2, "dragleave"), n2.dragLeave = i2.leave.target = r2.prev.element, n2.prevDropzone = i2.leave.dropzone = r2.prev.dropzone), r2.cur.dropzone && (i2.enter = new xt2(r2, n2, "dragenter"), n2.dragEnter = r2.cur.element, n2.dropzone = r2.cur.dropzone)), "dragend" === n2.type && r2.cur.dropzone && (i2.drop = new xt2(r2, n2, "drop"), n2.dropzone = r2.cur.dropzone, n2.relatedTarget = r2.cur.element), "dragmove" === n2.type && r2.cur.dropzone && (i2.move = new xt2(r2, n2, "dropmove"), n2.dropzone = r2.cur.dropzone)), i2;
        }
        function _t2(t2, e2) {
          var n2 = t2.dropState, r2 = n2.activeDrops, i2 = n2.cur, o2 = n2.prev;
          e2.leave && o2.dropzone.fire(e2.leave), e2.enter && i2.dropzone.fire(e2.enter), e2.move && i2.dropzone.fire(e2.move), e2.drop && i2.dropzone.fire(e2.drop), e2.deactivate && wt2(r2, e2.deactivate), n2.prev.dropzone = i2.dropzone, n2.prev.element = i2.element;
        }
        function Pt2(t2, e2) {
          var n2 = t2.interaction, r2 = t2.iEvent, i2 = t2.event;
          if ("dragmove" === r2.type || "dragend" === r2.type) {
            var o2 = n2.dropState;
            e2.dynamicDrop && (o2.activeDrops = Et2(e2, n2.element));
            var a2 = r2, s2 = Tt(n2, a2, i2);
            o2.rejected = o2.rejected && !!s2 && s2.dropzone === o2.cur.dropzone && s2.element === o2.cur.element, o2.cur.dropzone = s2 && s2.dropzone, o2.cur.element = s2 && s2.element, o2.events = St(n2, 0, a2);
          }
        }
        var Ot = { id: "actions/drop", install: function(t2) {
          var e2 = t2.actions, n2 = t2.interactStatic, r2 = t2.Interactable, i2 = t2.defaults;
          t2.usePlugin(_), r2.prototype.dropzone = function(t3) {
            return (function(t4, e3) {
              if (w.object(e3)) {
                if (t4.options.drop.enabled = false !== e3.enabled, e3.listeners) {
                  var n3 = $2(e3.listeners), r3 = Object.keys(n3).reduce((function(t5, e4) {
                    return t5[/^(enter|leave)/.test(e4) ? "drag".concat(e4) : /^(activate|deactivate|move)/.test(e4) ? "drop".concat(e4) : e4] = n3[e4], t5;
                  }), {}), i3 = t4.options.drop.listeners;
                  i3 && t4.off(i3), t4.on(r3), t4.options.drop.listeners = r3;
                }
                return w.func(e3.ondrop) && t4.on("drop", e3.ondrop), w.func(e3.ondropactivate) && t4.on("dropactivate", e3.ondropactivate), w.func(e3.ondropdeactivate) && t4.on("dropdeactivate", e3.ondropdeactivate), w.func(e3.ondragenter) && t4.on("dragenter", e3.ondragenter), w.func(e3.ondragleave) && t4.on("dragleave", e3.ondragleave), w.func(e3.ondropmove) && t4.on("dropmove", e3.ondropmove), /^(pointer|center)$/.test(e3.overlap) ? t4.options.drop.overlap = e3.overlap : w.number(e3.overlap) && (t4.options.drop.overlap = Math.max(Math.min(1, e3.overlap), 0)), "accept" in e3 && (t4.options.drop.accept = e3.accept), "checker" in e3 && (t4.options.drop.checker = e3.checker), t4;
              }
              if (w.bool(e3)) return t4.options.drop.enabled = e3, t4;
              return t4.options.drop;
            })(this, t3);
          }, r2.prototype.dropCheck = function(t3, e3, n3, r3, i3, o2) {
            return (function(t4, e4, n4, r4, i4, o3, a2) {
              var s2 = false;
              if (!(a2 = a2 || t4.getRect(o3))) return !!t4.options.drop.checker && t4.options.drop.checker(e4, n4, s2, t4, o3, r4, i4);
              var c2 = t4.options.drop.overlap;
              if ("pointer" === c2) {
                var l2 = K(r4, i4, "drag"), u2 = ot(e4);
                u2.x += l2.x, u2.y += l2.y;
                var p2 = u2.x > a2.left && u2.x < a2.right, f2 = u2.y > a2.top && u2.y < a2.bottom;
                s2 = p2 && f2;
              }
              var d2 = r4.getRect(i4);
              if (d2 && "center" === c2) {
                var h2 = d2.left + d2.width / 2, v2 = d2.top + d2.height / 2;
                s2 = h2 >= a2.left && h2 <= a2.right && v2 >= a2.top && v2 <= a2.bottom;
              }
              if (d2 && w.number(c2)) {
                s2 = Math.max(0, Math.min(a2.right, d2.right) - Math.max(a2.left, d2.left)) * Math.max(0, Math.min(a2.bottom, d2.bottom) - Math.max(a2.top, d2.top)) / (d2.width * d2.height) >= c2;
              }
              t4.options.drop.checker && (s2 = t4.options.drop.checker(e4, n4, s2, t4, o3, r4, i4));
              return s2;
            })(this, t3, e3, n3, r3, i3, o2);
          }, n2.dynamicDrop = function(e3) {
            return w.bool(e3) ? (t2.dynamicDrop = e3, n2) : t2.dynamicDrop;
          }, V(e2.phaselessTypes, { dragenter: true, dragleave: true, dropactivate: true, dropdeactivate: true, dropmove: true, drop: true }), e2.methodDict.drop = "dropzone", t2.dynamicDrop = false, i2.actions.drop = Ot.defaults;
        }, listeners: { "interactions:before-action-start": function(t2) {
          var e2 = t2.interaction;
          "drag" === e2.prepared.name && (e2.dropState = { cur: { dropzone: null, element: null }, prev: { dropzone: null, element: null }, rejected: null, events: null, activeDrops: [] });
        }, "interactions:after-action-start": function(t2, e2) {
          var n2 = t2.interaction, r2 = (t2.event, t2.iEvent);
          if ("drag" === n2.prepared.name) {
            var i2 = n2.dropState;
            i2.activeDrops = [], i2.events = {}, i2.activeDrops = Et2(e2, n2.element), i2.events = St(n2, 0, r2), i2.events.activate && (wt2(i2.activeDrops, i2.events.activate), e2.fire("actions/drop:start", { interaction: n2, dragEvent: r2 }));
          }
        }, "interactions:action-move": Pt2, "interactions:after-action-move": function(t2, e2) {
          var n2 = t2.interaction, r2 = t2.iEvent;
          if ("drag" === n2.prepared.name) {
            var i2 = n2.dropState;
            _t2(n2, i2.events), e2.fire("actions/drop:move", { interaction: n2, dragEvent: r2 }), i2.events = {};
          }
        }, "interactions:action-end": function(t2, e2) {
          if ("drag" === t2.interaction.prepared.name) {
            var n2 = t2.interaction, r2 = t2.iEvent;
            Pt2(t2, e2), _t2(n2, n2.dropState.events), e2.fire("actions/drop:end", { interaction: n2, dragEvent: r2 });
          }
        }, "interactions:stop": function(t2) {
          var e2 = t2.interaction;
          if ("drag" === e2.prepared.name) {
            var n2 = e2.dropState;
            n2 && (n2.activeDrops = null, n2.events = null, n2.cur.dropzone = null, n2.cur.element = null, n2.prev.dropzone = null, n2.prev.element = null, n2.rejected = false);
          }
        } }, getActiveDrops: Et2, getDrop: Tt, getDropEvents: St, fireDropEvents: _t2, filterEventType: function(t2) {
          return 0 === t2.search("drag") || 0 === t2.search("drop");
        }, defaults: { enabled: false, accept: null, overlap: "pointer" } }, kt2 = Ot;
        function Dt(t2) {
          var e2 = t2.interaction, n2 = t2.iEvent, r2 = t2.phase;
          if ("gesture" === e2.prepared.name) {
            var i2 = e2.pointers.map((function(t3) {
              return t3.pointer;
            })), o2 = "start" === r2, a2 = "end" === r2, s2 = e2.interactable.options.deltaSource;
            if (n2.touches = [i2[0], i2[1]], o2) n2.distance = pt(i2, s2), n2.box = ut2(i2), n2.scale = 1, n2.ds = 0, n2.angle = ft2(i2, s2), n2.da = 0, e2.gesture.startDistance = n2.distance, e2.gesture.startAngle = n2.angle;
            else if (a2 || e2.pointers.length < 2) {
              var c2 = e2.prevEvent;
              n2.distance = c2.distance, n2.box = c2.box, n2.scale = c2.scale, n2.ds = 0, n2.angle = c2.angle, n2.da = 0;
            } else n2.distance = pt(i2, s2), n2.box = ut2(i2), n2.scale = n2.distance / e2.gesture.startDistance, n2.angle = ft2(i2, s2), n2.ds = n2.scale - e2.gesture.scale, n2.da = n2.angle - e2.gesture.angle;
            e2.gesture.distance = n2.distance, e2.gesture.angle = n2.angle, w.number(n2.scale) && n2.scale !== 1 / 0 && !isNaN(n2.scale) && (e2.gesture.scale = n2.scale);
          }
        }
        var It = { id: "actions/gesture", before: ["actions/drag", "actions/resize"], install: function(t2) {
          var e2 = t2.actions, n2 = t2.Interactable, r2 = t2.defaults;
          n2.prototype.gesturable = function(t3) {
            return w.object(t3) ? (this.options.gesture.enabled = false !== t3.enabled, this.setPerAction("gesture", t3), this.setOnEvents("gesture", t3), this) : w.bool(t3) ? (this.options.gesture.enabled = t3, this) : this.options.gesture;
          }, e2.map.gesture = It, e2.methodDict.gesture = "gesturable", r2.actions.gesture = It.defaults;
        }, listeners: { "interactions:action-start": Dt, "interactions:action-move": Dt, "interactions:action-end": Dt, "interactions:new": function(t2) {
          t2.interaction.gesture = { angle: 0, distance: 0, scale: 1, startAngle: 0, startDistance: 0 };
        }, "auto-start:check": function(t2) {
          if (!(t2.interaction.pointers.length < 2)) {
            var e2 = t2.interactable.options.gesture;
            if (e2 && e2.enabled) return t2.action = { name: "gesture" }, false;
          }
        } }, defaults: {}, getCursor: function() {
          return "";
        }, filterEventType: function(t2) {
          return 0 === t2.search("gesture");
        } }, Mt2 = It;
        function zt2(t2, e2, n2, r2, i2, o2, a2) {
          if (!e2) return false;
          if (true === e2) {
            var s2 = w.number(o2.width) ? o2.width : o2.right - o2.left, c2 = w.number(o2.height) ? o2.height : o2.bottom - o2.top;
            if (a2 = Math.min(a2, Math.abs(("left" === t2 || "right" === t2 ? s2 : c2) / 2)), s2 < 0 && ("left" === t2 ? t2 = "right" : "right" === t2 && (t2 = "left")), c2 < 0 && ("top" === t2 ? t2 = "bottom" : "bottom" === t2 && (t2 = "top")), "left" === t2) {
              var l2 = s2 >= 0 ? o2.left : o2.right;
              return n2.x < l2 + a2;
            }
            if ("top" === t2) {
              var u2 = c2 >= 0 ? o2.top : o2.bottom;
              return n2.y < u2 + a2;
            }
            if ("right" === t2) return n2.x > (s2 >= 0 ? o2.right : o2.left) - a2;
            if ("bottom" === t2) return n2.y > (c2 >= 0 ? o2.bottom : o2.top) - a2;
          }
          return !!w.element(r2) && (w.element(e2) ? e2 === r2 : F(r2, e2, i2));
        }
        function At2(t2) {
          var e2 = t2.iEvent, n2 = t2.interaction;
          if ("resize" === n2.prepared.name && n2.resizeAxes) {
            var r2 = e2;
            n2.interactable.options.resize.square ? ("y" === n2.resizeAxes ? r2.delta.x = r2.delta.y : r2.delta.y = r2.delta.x, r2.axes = "xy") : (r2.axes = n2.resizeAxes, "x" === n2.resizeAxes ? r2.delta.y = 0 : "y" === n2.resizeAxes && (r2.delta.x = 0));
          }
        }
        var Rt2, Ct2, jt2 = { id: "actions/resize", before: ["actions/drag"], install: function(t2) {
          var e2 = t2.actions, n2 = t2.browser, r2 = t2.Interactable, i2 = t2.defaults;
          jt2.cursors = (function(t3) {
            return t3.isIe9 ? { x: "e-resize", y: "s-resize", xy: "se-resize", top: "n-resize", left: "w-resize", bottom: "s-resize", right: "e-resize", topleft: "se-resize", bottomright: "se-resize", topright: "ne-resize", bottomleft: "ne-resize" } : { x: "ew-resize", y: "ns-resize", xy: "nwse-resize", top: "ns-resize", left: "ew-resize", bottom: "ns-resize", right: "ew-resize", topleft: "nwse-resize", bottomright: "nwse-resize", topright: "nesw-resize", bottomleft: "nesw-resize" };
          })(n2), jt2.defaultMargin = n2.supportsTouch || n2.supportsPointerEvent ? 20 : 10, r2.prototype.resizable = function(e3) {
            return (function(t3, e4, n3) {
              if (w.object(e4)) return t3.options.resize.enabled = false !== e4.enabled, t3.setPerAction("resize", e4), t3.setOnEvents("resize", e4), w.string(e4.axis) && /^x$|^y$|^xy$/.test(e4.axis) ? t3.options.resize.axis = e4.axis : null === e4.axis && (t3.options.resize.axis = n3.defaults.actions.resize.axis), w.bool(e4.preserveAspectRatio) ? t3.options.resize.preserveAspectRatio = e4.preserveAspectRatio : w.bool(e4.square) && (t3.options.resize.square = e4.square), t3;
              if (w.bool(e4)) return t3.options.resize.enabled = e4, t3;
              return t3.options.resize;
            })(this, e3, t2);
          }, e2.map.resize = jt2, e2.methodDict.resize = "resizable", i2.actions.resize = jt2.defaults;
        }, listeners: { "interactions:new": function(t2) {
          t2.interaction.resizeAxes = "xy";
        }, "interactions:action-start": function(t2) {
          !(function(t3) {
            var e2 = t3.iEvent, n2 = t3.interaction;
            if ("resize" === n2.prepared.name && n2.prepared.edges) {
              var r2 = e2, i2 = n2.rect;
              n2._rects = { start: V({}, i2), corrected: V({}, i2), previous: V({}, i2), delta: { left: 0, right: 0, width: 0, top: 0, bottom: 0, height: 0 } }, r2.edges = n2.prepared.edges, r2.rect = n2._rects.corrected, r2.deltaRect = n2._rects.delta;
            }
          })(t2), At2(t2);
        }, "interactions:action-move": function(t2) {
          !(function(t3) {
            var e2 = t3.iEvent, n2 = t3.interaction;
            if ("resize" === n2.prepared.name && n2.prepared.edges) {
              var r2 = e2, i2 = n2.interactable.options.resize.invert, o2 = "reposition" === i2 || "negate" === i2, a2 = n2.rect, s2 = n2._rects, c2 = s2.start, l2 = s2.corrected, u2 = s2.delta, p2 = s2.previous;
              if (V(p2, l2), o2) {
                if (V(l2, a2), "reposition" === i2) {
                  if (l2.top > l2.bottom) {
                    var f2 = l2.top;
                    l2.top = l2.bottom, l2.bottom = f2;
                  }
                  if (l2.left > l2.right) {
                    var d2 = l2.left;
                    l2.left = l2.right, l2.right = d2;
                  }
                }
              } else l2.top = Math.min(a2.top, c2.bottom), l2.bottom = Math.max(a2.bottom, c2.top), l2.left = Math.min(a2.left, c2.right), l2.right = Math.max(a2.right, c2.left);
              for (var h2 in l2.width = l2.right - l2.left, l2.height = l2.bottom - l2.top, l2) u2[h2] = l2[h2] - p2[h2];
              r2.edges = n2.prepared.edges, r2.rect = l2, r2.deltaRect = u2;
            }
          })(t2), At2(t2);
        }, "interactions:action-end": function(t2) {
          var e2 = t2.iEvent, n2 = t2.interaction;
          if ("resize" === n2.prepared.name && n2.prepared.edges) {
            var r2 = e2;
            r2.edges = n2.prepared.edges, r2.rect = n2._rects.corrected, r2.deltaRect = n2._rects.delta;
          }
        }, "auto-start:check": function(t2) {
          var e2 = t2.interaction, n2 = t2.interactable, r2 = t2.element, i2 = t2.rect, o2 = t2.buttons;
          if (i2) {
            var a2 = V({}, e2.coords.cur.page), s2 = n2.options.resize;
            if (s2 && s2.enabled && (!e2.pointerIsDown || !/mouse|pointer/.test(e2.pointerType) || 0 != (o2 & s2.mouseButtons))) {
              if (w.object(s2.edges)) {
                var c2 = { left: false, right: false, top: false, bottom: false };
                for (var l2 in c2) c2[l2] = zt2(l2, s2.edges[l2], a2, e2._latestPointer.eventTarget, r2, i2, s2.margin || jt2.defaultMargin);
                c2.left = c2.left && !c2.right, c2.top = c2.top && !c2.bottom, (c2.left || c2.right || c2.top || c2.bottom) && (t2.action = { name: "resize", edges: c2 });
              } else {
                var u2 = "y" !== s2.axis && a2.x > i2.right - jt2.defaultMargin, p2 = "x" !== s2.axis && a2.y > i2.bottom - jt2.defaultMargin;
                (u2 || p2) && (t2.action = { name: "resize", axes: (u2 ? "x" : "") + (p2 ? "y" : "") });
              }
              return !t2.action && void 0;
            }
          }
        } }, defaults: { square: false, preserveAspectRatio: false, axis: "xy", margin: NaN, edges: null, invert: "none" }, cursors: null, getCursor: function(t2) {
          var e2 = t2.edges, n2 = t2.axis, r2 = t2.name, i2 = jt2.cursors, o2 = null;
          if (n2) o2 = i2[r2 + n2];
          else if (e2) {
            for (var a2 = "", s2 = 0, c2 = ["top", "bottom", "left", "right"]; s2 < c2.length; s2++) {
              var l2 = c2[s2];
              e2[l2] && (a2 += l2);
            }
            o2 = i2[a2];
          }
          return o2;
        }, filterEventType: function(t2) {
          return 0 === t2.search("resize");
        }, defaultMargin: null }, Ft2 = jt2, Xt2 = { id: "actions", install: function(t2) {
          t2.usePlugin(Mt2), t2.usePlugin(Ft2), t2.usePlugin(_), t2.usePlugin(kt2);
        } }, Yt2 = 0;
        var Lt2 = { request: function(t2) {
          return Rt2(t2);
        }, cancel: function(t2) {
          return Ct2(t2);
        }, init: function(t2) {
          if (Rt2 = t2.requestAnimationFrame, Ct2 = t2.cancelAnimationFrame, !Rt2) for (var e2 = ["ms", "moz", "webkit", "o"], n2 = 0; n2 < e2.length; n2++) {
            var r2 = e2[n2];
            Rt2 = t2["".concat(r2, "RequestAnimationFrame")], Ct2 = t2["".concat(r2, "CancelAnimationFrame")] || t2["".concat(r2, "CancelRequestAnimationFrame")];
          }
          Rt2 = Rt2 && Rt2.bind(t2), Ct2 = Ct2 && Ct2.bind(t2), Rt2 || (Rt2 = function(e3) {
            var n3 = Date.now(), r3 = Math.max(0, 16 - (n3 - Yt2)), i2 = t2.setTimeout((function() {
              e3(n3 + r3);
            }), r3);
            return Yt2 = n3 + r3, i2;
          }, Ct2 = function(t3) {
            return clearTimeout(t3);
          });
        } };
        var qt = { defaults: { enabled: false, margin: 60, container: null, speed: 300 }, now: Date.now, interaction: null, i: 0, x: 0, y: 0, isScrolling: false, prevTime: 0, margin: 0, speed: 0, start: function(t2) {
          qt.isScrolling = true, Lt2.cancel(qt.i), t2.autoScroll = qt, qt.interaction = t2, qt.prevTime = qt.now(), qt.i = Lt2.request(qt.scroll);
        }, stop: function() {
          qt.isScrolling = false, qt.interaction && (qt.interaction.autoScroll = null), Lt2.cancel(qt.i);
        }, scroll: function() {
          var t2 = qt.interaction, e2 = t2.interactable, n2 = t2.element, r2 = t2.prepared.name, i2 = e2.options[r2].autoScroll, o2 = Bt2(i2.container, e2, n2), a2 = qt.now(), s2 = (a2 - qt.prevTime) / 1e3, c2 = i2.speed * s2;
          if (c2 >= 1) {
            var l2 = { x: qt.x * c2, y: qt.y * c2 };
            if (l2.x || l2.y) {
              var u2 = Vt(o2);
              w.window(o2) ? o2.scrollBy(l2.x, l2.y) : o2 && (o2.scrollLeft += l2.x, o2.scrollTop += l2.y);
              var p2 = Vt(o2), f2 = { x: p2.x - u2.x, y: p2.y - u2.y };
              (f2.x || f2.y) && e2.fire({ type: "autoscroll", target: n2, interactable: e2, delta: f2, interaction: t2, container: o2 });
            }
            qt.prevTime = a2;
          }
          qt.isScrolling && (Lt2.cancel(qt.i), qt.i = Lt2.request(qt.scroll));
        }, check: function(t2, e2) {
          var n2;
          return null == (n2 = t2.options[e2].autoScroll) ? void 0 : n2.enabled;
        }, onInteractionMove: function(t2) {
          var e2 = t2.interaction, n2 = t2.pointer;
          if (e2.interacting() && qt.check(e2.interactable, e2.prepared.name)) if (e2.simulation) qt.x = qt.y = 0;
          else {
            var r2, i2, o2, a2, s2 = e2.interactable, c2 = e2.element, l2 = e2.prepared.name, u2 = s2.options[l2].autoScroll, p2 = Bt2(u2.container, s2, c2);
            if (w.window(p2)) a2 = n2.clientX < qt.margin, r2 = n2.clientY < qt.margin, i2 = n2.clientX > p2.innerWidth - qt.margin, o2 = n2.clientY > p2.innerHeight - qt.margin;
            else {
              var f2 = Y2(p2);
              a2 = n2.clientX < f2.left + qt.margin, r2 = n2.clientY < f2.top + qt.margin, i2 = n2.clientX > f2.right - qt.margin, o2 = n2.clientY > f2.bottom - qt.margin;
            }
            qt.x = i2 ? 1 : a2 ? -1 : 0, qt.y = o2 ? 1 : r2 ? -1 : 0, qt.isScrolling || (qt.margin = u2.margin, qt.speed = u2.speed, qt.start(e2));
          }
        } };
        function Bt2(t2, e2, n2) {
          return (w.string(t2) ? W(t2, e2, n2) : t2) || y(n2);
        }
        function Vt(t2) {
          return w.window(t2) && (t2 = window.document.body), { x: t2.scrollLeft, y: t2.scrollTop };
        }
        var Wt = { id: "auto-scroll", install: function(t2) {
          var e2 = t2.defaults, n2 = t2.actions;
          t2.autoScroll = qt, qt.now = function() {
            return t2.now();
          }, n2.phaselessTypes.autoscroll = true, e2.perAction.autoScroll = qt.defaults;
        }, listeners: { "interactions:new": function(t2) {
          t2.interaction.autoScroll = null;
        }, "interactions:destroy": function(t2) {
          t2.interaction.autoScroll = null, qt.stop(), qt.interaction && (qt.interaction = null);
        }, "interactions:stop": qt.stop, "interactions:action-move": function(t2) {
          return qt.onInteractionMove(t2);
        } } }, Gt = Wt;
        function Nt2(t2, e2) {
          var n2 = false;
          return function() {
            return n2 || (g.console.warn(e2), n2 = true), t2.apply(this, arguments);
          };
        }
        function Ut2(t2, e2) {
          return t2.name = e2.name, t2.axis = e2.axis, t2.edges = e2.edges, t2;
        }
        function Ht2(t2) {
          return w.bool(t2) ? (this.options.styleCursor = t2, this) : null === t2 ? (delete this.options.styleCursor, this) : this.options.styleCursor;
        }
        function Kt2(t2) {
          return w.func(t2) ? (this.options.actionChecker = t2, this) : null === t2 ? (delete this.options.actionChecker, this) : this.options.actionChecker;
        }
        var $t = { id: "auto-start/interactableMethods", install: function(t2) {
          var e2 = t2.Interactable;
          e2.prototype.getAction = function(e3, n2, r2, i2) {
            var o2 = (function(t3, e4, n3, r3, i3) {
              var o3 = t3.getRect(r3), a2 = e4.buttons || { 0: 1, 1: 4, 3: 8, 4: 16 }[e4.button], s2 = { action: null, interactable: t3, interaction: n3, element: r3, rect: o3, buttons: a2 };
              return i3.fire("auto-start:check", s2), s2.action;
            })(this, n2, r2, i2, t2);
            return this.options.actionChecker ? this.options.actionChecker(e3, n2, o2, this, i2, r2) : o2;
          }, e2.prototype.ignoreFrom = Nt2((function(t3) {
            return this._backCompatOption("ignoreFrom", t3);
          }), "Interactable.ignoreFrom() has been deprecated. Use Interactble.draggable({ignoreFrom: newValue})."), e2.prototype.allowFrom = Nt2((function(t3) {
            return this._backCompatOption("allowFrom", t3);
          }), "Interactable.allowFrom() has been deprecated. Use Interactble.draggable({allowFrom: newValue})."), e2.prototype.actionChecker = Kt2, e2.prototype.styleCursor = Ht2;
        } };
        function Jt2(t2, e2, n2, r2, i2) {
          return e2.testIgnoreAllow(e2.options[t2.name], n2, r2) && e2.options[t2.name].enabled && ee(e2, n2, t2, i2) ? t2 : null;
        }
        function Qt2(t2, e2, n2, r2, i2, o2, a2) {
          for (var s2 = 0, c2 = r2.length; s2 < c2; s2++) {
            var l2 = r2[s2], u2 = i2[s2], p2 = l2.getAction(e2, n2, t2, u2);
            if (p2) {
              var f2 = Jt2(p2, l2, u2, o2, a2);
              if (f2) return { action: f2, interactable: l2, element: u2 };
            }
          }
          return { action: null, interactable: null, element: null };
        }
        function Zt2(t2, e2, n2, r2, i2) {
          var o2 = [], a2 = [], s2 = r2;
          function c2(t3) {
            o2.push(t3), a2.push(s2);
          }
          for (; w.element(s2); ) {
            o2 = [], a2 = [], i2.interactables.forEachMatch(s2, c2);
            var l2 = Qt2(t2, e2, n2, o2, a2, r2, i2);
            if (l2.action && !l2.interactable.options[l2.action.name].manualStart) return l2;
            s2 = A(s2);
          }
          return { action: null, interactable: null, element: null };
        }
        function te2(t2, e2, n2) {
          var r2 = e2.action, i2 = e2.interactable, o2 = e2.element;
          r2 = r2 || { name: null }, t2.interactable = i2, t2.element = o2, Ut2(t2.prepared, r2), t2.rect = i2 && r2.name ? i2.getRect(o2) : null, ie2(t2, n2), n2.fire("autoStart:prepared", { interaction: t2 });
        }
        function ee(t2, e2, n2, r2) {
          var i2 = t2.options, o2 = i2[n2.name].max, a2 = i2[n2.name].maxPerElement, s2 = r2.autoStart.maxInteractions, c2 = 0, l2 = 0, u2 = 0;
          if (!(o2 && a2 && s2)) return false;
          for (var p2 = 0, f2 = r2.interactions.list; p2 < f2.length; p2++) {
            var d2 = f2[p2], h2 = d2.prepared.name;
            if (d2.interacting()) {
              if (++c2 >= s2) return false;
              if (d2.interactable === t2) {
                if ((l2 += h2 === n2.name ? 1 : 0) >= o2) return false;
                if (d2.element === e2 && (u2++, h2 === n2.name && u2 >= a2)) return false;
              }
            }
          }
          return s2 > 0;
        }
        function ne(t2, e2) {
          return w.number(t2) ? (e2.autoStart.maxInteractions = t2, this) : e2.autoStart.maxInteractions;
        }
        function re2(t2, e2, n2) {
          var r2 = n2.autoStart.cursorElement;
          r2 && r2 !== t2 && (r2.style.cursor = ""), t2.ownerDocument.documentElement.style.cursor = e2, t2.style.cursor = e2, n2.autoStart.cursorElement = e2 ? t2 : null;
        }
        function ie2(t2, e2) {
          var n2 = t2.interactable, r2 = t2.element, i2 = t2.prepared;
          if ("mouse" === t2.pointerType && n2 && n2.options.styleCursor) {
            var o2 = "";
            if (i2.name) {
              var a2 = n2.options[i2.name].cursorChecker;
              o2 = w.func(a2) ? a2(i2, n2, r2, t2._interacting) : e2.actions.map[i2.name].getCursor(i2);
            }
            re2(t2.element, o2 || "", e2);
          } else e2.autoStart.cursorElement && re2(e2.autoStart.cursorElement, "", e2);
        }
        var oe = { id: "auto-start/base", before: ["actions"], install: function(t2) {
          var e2 = t2.interactStatic, n2 = t2.defaults;
          t2.usePlugin($t), n2.base.actionChecker = null, n2.base.styleCursor = true, V(n2.perAction, { manualStart: false, max: 1 / 0, maxPerElement: 1, allowFrom: null, ignoreFrom: null, mouseButtons: 1 }), e2.maxInteractions = function(e3) {
            return ne(e3, t2);
          }, t2.autoStart = { maxInteractions: 1 / 0, withinInteractionLimit: ee, cursorElement: null };
        }, listeners: { "interactions:down": function(t2, e2) {
          var n2 = t2.interaction, r2 = t2.pointer, i2 = t2.event, o2 = t2.eventTarget;
          n2.interacting() || te2(n2, Zt2(n2, r2, i2, o2, e2), e2);
        }, "interactions:move": function(t2, e2) {
          !(function(t3, e3) {
            var n2 = t3.interaction, r2 = t3.pointer, i2 = t3.event, o2 = t3.eventTarget;
            "mouse" !== n2.pointerType || n2.pointerIsDown || n2.interacting() || te2(n2, Zt2(n2, r2, i2, o2, e3), e3);
          })(t2, e2), (function(t3, e3) {
            var n2 = t3.interaction;
            if (n2.pointerIsDown && !n2.interacting() && n2.pointerWasMoved && n2.prepared.name) {
              e3.fire("autoStart:before-start", t3);
              var r2 = n2.interactable, i2 = n2.prepared.name;
              i2 && r2 && (r2.options[i2].manualStart || !ee(r2, n2.element, n2.prepared, e3) ? n2.stop() : (n2.start(n2.prepared, r2, n2.element), ie2(n2, e3)));
            }
          })(t2, e2);
        }, "interactions:stop": function(t2, e2) {
          var n2 = t2.interaction, r2 = n2.interactable;
          r2 && r2.options.styleCursor && re2(n2.element, "", e2);
        } }, maxInteractions: ne, withinInteractionLimit: ee, validateAction: Jt2 }, ae2 = oe;
        var se2 = { id: "auto-start/dragAxis", listeners: { "autoStart:before-start": function(t2, e2) {
          var n2 = t2.interaction, r2 = t2.eventTarget, i2 = t2.dx, o2 = t2.dy;
          if ("drag" === n2.prepared.name) {
            var a2 = Math.abs(i2), s2 = Math.abs(o2), c2 = n2.interactable.options.drag, l2 = c2.startAxis, u2 = a2 > s2 ? "x" : a2 < s2 ? "y" : "xy";
            if (n2.prepared.axis = "start" === c2.lockAxis ? u2[0] : c2.lockAxis, "xy" !== u2 && "xy" !== l2 && l2 !== u2) {
              n2.prepared.name = null;
              for (var p2 = r2, f2 = function(t3) {
                if (t3 !== n2.interactable) {
                  var i3 = n2.interactable.options.drag;
                  if (!i3.manualStart && t3.testIgnoreAllow(i3, p2, r2)) {
                    var o3 = t3.getAction(n2.downPointer, n2.downEvent, n2, p2);
                    if (o3 && "drag" === o3.name && (function(t4, e3) {
                      if (!e3) return false;
                      var n3 = e3.options.drag.startAxis;
                      return "xy" === t4 || "xy" === n3 || n3 === t4;
                    })(u2, t3) && ae2.validateAction(o3, t3, p2, r2, e2)) return t3;
                  }
                }
              }; w.element(p2); ) {
                var d2 = e2.interactables.forEachMatch(p2, f2);
                if (d2) {
                  n2.prepared.name = "drag", n2.interactable = d2, n2.element = p2;
                  break;
                }
                p2 = A(p2);
              }
            }
          }
        } } };
        function ce2(t2) {
          var e2 = t2.prepared && t2.prepared.name;
          if (!e2) return null;
          var n2 = t2.interactable.options;
          return n2[e2].hold || n2[e2].delay;
        }
        var le2 = { id: "auto-start/hold", install: function(t2) {
          var e2 = t2.defaults;
          t2.usePlugin(ae2), e2.perAction.hold = 0, e2.perAction.delay = 0;
        }, listeners: { "interactions:new": function(t2) {
          t2.interaction.autoStartHoldTimer = null;
        }, "autoStart:prepared": function(t2) {
          var e2 = t2.interaction, n2 = ce2(e2);
          n2 > 0 && (e2.autoStartHoldTimer = setTimeout((function() {
            e2.start(e2.prepared, e2.interactable, e2.element);
          }), n2));
        }, "interactions:move": function(t2) {
          var e2 = t2.interaction, n2 = t2.duplicate;
          e2.autoStartHoldTimer && e2.pointerWasMoved && !n2 && (clearTimeout(e2.autoStartHoldTimer), e2.autoStartHoldTimer = null);
        }, "autoStart:before-start": function(t2) {
          var e2 = t2.interaction;
          ce2(e2) > 0 && (e2.prepared.name = null);
        } }, getHoldDuration: ce2 }, ue2 = le2, pe2 = { id: "auto-start", install: function(t2) {
          t2.usePlugin(ae2), t2.usePlugin(ue2), t2.usePlugin(se2);
        } }, fe2 = function(t2) {
          return /^(always|never|auto)$/.test(t2) ? (this.options.preventDefault = t2, this) : w.bool(t2) ? (this.options.preventDefault = t2 ? "always" : "never", this) : this.options.preventDefault;
        };
        function de2(t2) {
          var e2 = t2.interaction, n2 = t2.event;
          e2.interactable && e2.interactable.checkAndPreventDefault(n2);
        }
        var he2 = { id: "core/interactablePreventDefault", install: function(t2) {
          var e2 = t2.Interactable;
          e2.prototype.preventDefault = fe2, e2.prototype.checkAndPreventDefault = function(e3) {
            return (function(t3, e4, n2) {
              var r2 = t3.options.preventDefault;
              if ("never" !== r2) if ("always" !== r2) {
                if (e4.events.supportsPassive && /^touch(start|move)$/.test(n2.type)) {
                  var i2 = y(n2.target).document, o2 = e4.getDocOptions(i2);
                  if (!o2 || !o2.events || false !== o2.events.passive) return;
                }
                /^(mouse|pointer|touch)*(down|start)/i.test(n2.type) || w.element(n2.target) && R(n2.target, "input,select,textarea,[contenteditable=true],[contenteditable=true] *") || n2.preventDefault();
              } else n2.preventDefault();
            })(this, t2, e3);
          }, t2.interactions.docEvents.push({ type: "dragstart", listener: function(e3) {
            for (var n2 = 0, r2 = t2.interactions.list; n2 < r2.length; n2++) {
              var i2 = r2[n2];
              if (i2.element && (i2.element === e3.target || M(i2.element, e3.target))) return void i2.interactable.checkAndPreventDefault(e3);
            }
          } });
        }, listeners: ["down", "move", "up", "cancel"].reduce((function(t2, e2) {
          return t2["interactions:".concat(e2)] = de2, t2;
        }), {}) };
        function ve2(t2, e2) {
          if (e2.phaselessTypes[t2]) return true;
          for (var n2 in e2.map) if (0 === t2.indexOf(n2) && t2.substr(n2.length) in e2.phases) return true;
          return false;
        }
        function ge2(t2) {
          var e2 = {};
          for (var n2 in t2) {
            var r2 = t2[n2];
            w.plainObject(r2) ? e2[n2] = ge2(r2) : w.array(r2) ? e2[n2] = mt(r2) : e2[n2] = r2;
          }
          return e2;
        }
        var me = (function() {
          function t2(e2) {
            r(this, t2), this.states = [], this.startOffset = { left: 0, right: 0, top: 0, bottom: 0 }, this.startDelta = void 0, this.result = void 0, this.endResult = void 0, this.startEdges = void 0, this.edges = void 0, this.interaction = void 0, this.interaction = e2, this.result = ye2(), this.edges = { left: false, right: false, top: false, bottom: false };
          }
          return o(t2, [{ key: "start", value: function(t3, e2) {
            var n2, r2, i2 = t3.phase, o2 = this.interaction, a2 = (function(t4) {
              var e3 = t4.interactable.options[t4.prepared.name], n3 = e3.modifiers;
              if (n3 && n3.length) return n3;
              return ["snap", "snapSize", "snapEdges", "restrict", "restrictEdges", "restrictSize"].map((function(t5) {
                var n4 = e3[t5];
                return n4 && n4.enabled && { options: n4, methods: n4._methods };
              })).filter((function(t5) {
                return !!t5;
              }));
            })(o2);
            this.prepareStates(a2), this.startEdges = V({}, o2.edges), this.edges = V({}, this.startEdges), this.startOffset = (n2 = o2.rect, r2 = e2, n2 ? { left: r2.x - n2.left, top: r2.y - n2.top, right: n2.right - r2.x, bottom: n2.bottom - r2.y } : { left: 0, top: 0, right: 0, bottom: 0 }), this.startDelta = { x: 0, y: 0 };
            var s2 = this.fillArg({ phase: i2, pageCoords: e2, preEnd: false });
            return this.result = ye2(), this.startAll(s2), this.result = this.setAll(s2);
          } }, { key: "fillArg", value: function(t3) {
            var e2 = this.interaction;
            return t3.interaction = e2, t3.interactable = e2.interactable, t3.element = e2.element, t3.rect || (t3.rect = e2.rect), t3.edges || (t3.edges = this.startEdges), t3.startOffset = this.startOffset, t3;
          } }, { key: "startAll", value: function(t3) {
            for (var e2 = 0, n2 = this.states; e2 < n2.length; e2++) {
              var r2 = n2[e2];
              r2.methods.start && (t3.state = r2, r2.methods.start(t3));
            }
          } }, { key: "setAll", value: function(t3) {
            var e2 = t3.phase, n2 = t3.preEnd, r2 = t3.skipModifiers, i2 = t3.rect, o2 = t3.edges;
            t3.coords = V({}, t3.pageCoords), t3.rect = V({}, i2), t3.edges = V({}, o2);
            for (var a2 = r2 ? this.states.slice(r2) : this.states, s2 = ye2(t3.coords, t3.rect), c2 = 0; c2 < a2.length; c2++) {
              var l2, u2 = a2[c2], p2 = u2.options, f2 = V({}, t3.coords), d2 = null;
              null != (l2 = u2.methods) && l2.set && this.shouldDo(p2, n2, e2) && (t3.state = u2, d2 = u2.methods.set(t3), H2(t3.edges, t3.rect, { x: t3.coords.x - f2.x, y: t3.coords.y - f2.y })), s2.eventProps.push(d2);
            }
            V(this.edges, t3.edges), s2.delta.x = t3.coords.x - t3.pageCoords.x, s2.delta.y = t3.coords.y - t3.pageCoords.y, s2.rectDelta.left = t3.rect.left - i2.left, s2.rectDelta.right = t3.rect.right - i2.right, s2.rectDelta.top = t3.rect.top - i2.top, s2.rectDelta.bottom = t3.rect.bottom - i2.bottom;
            var h2 = this.result.coords, v2 = this.result.rect;
            if (h2 && v2) {
              var g2 = s2.rect.left !== v2.left || s2.rect.right !== v2.right || s2.rect.top !== v2.top || s2.rect.bottom !== v2.bottom;
              s2.changed = g2 || h2.x !== s2.coords.x || h2.y !== s2.coords.y;
            }
            return s2;
          } }, { key: "applyToInteraction", value: function(t3) {
            var e2 = this.interaction, n2 = t3.phase, r2 = e2.coords.cur, i2 = e2.coords.start, o2 = this.result, a2 = this.startDelta, s2 = o2.delta;
            "start" === n2 && V(this.startDelta, o2.delta);
            for (var c2 = 0, l2 = [[i2, a2], [r2, s2]]; c2 < l2.length; c2++) {
              var u2 = l2[c2], p2 = u2[0], f2 = u2[1];
              p2.page.x += f2.x, p2.page.y += f2.y, p2.client.x += f2.x, p2.client.y += f2.y;
            }
            var d2 = this.result.rectDelta, h2 = t3.rect || e2.rect;
            h2.left += d2.left, h2.right += d2.right, h2.top += d2.top, h2.bottom += d2.bottom, h2.width = h2.right - h2.left, h2.height = h2.bottom - h2.top;
          } }, { key: "setAndApply", value: function(t3) {
            var e2 = this.interaction, n2 = t3.phase, r2 = t3.preEnd, i2 = t3.skipModifiers, o2 = this.setAll(this.fillArg({ preEnd: r2, phase: n2, pageCoords: t3.modifiedCoords || e2.coords.cur.page }));
            if (this.result = o2, !o2.changed && (!i2 || i2 < this.states.length) && e2.interacting()) return false;
            if (t3.modifiedCoords) {
              var a2 = e2.coords.cur.page, s2 = { x: t3.modifiedCoords.x - a2.x, y: t3.modifiedCoords.y - a2.y };
              o2.coords.x += s2.x, o2.coords.y += s2.y, o2.delta.x += s2.x, o2.delta.y += s2.y;
            }
            this.applyToInteraction(t3);
          } }, { key: "beforeEnd", value: function(t3) {
            var e2 = t3.interaction, n2 = t3.event, r2 = this.states;
            if (r2 && r2.length) {
              for (var i2 = false, o2 = 0; o2 < r2.length; o2++) {
                var a2 = r2[o2];
                t3.state = a2;
                var s2 = a2.options, c2 = a2.methods, l2 = c2.beforeEnd && c2.beforeEnd(t3);
                if (l2) return this.endResult = l2, false;
                i2 = i2 || !i2 && this.shouldDo(s2, true, t3.phase, true);
              }
              i2 && e2.move({ event: n2, preEnd: true });
            }
          } }, { key: "stop", value: function(t3) {
            var e2 = t3.interaction;
            if (this.states && this.states.length) {
              var n2 = V({ states: this.states, interactable: e2.interactable, element: e2.element, rect: null }, t3);
              this.fillArg(n2);
              for (var r2 = 0, i2 = this.states; r2 < i2.length; r2++) {
                var o2 = i2[r2];
                n2.state = o2, o2.methods.stop && o2.methods.stop(n2);
              }
              this.states = null, this.endResult = null;
            }
          } }, { key: "prepareStates", value: function(t3) {
            this.states = [];
            for (var e2 = 0; e2 < t3.length; e2++) {
              var n2 = t3[e2], r2 = n2.options, i2 = n2.methods, o2 = n2.name;
              this.states.push({ options: r2, methods: i2, index: e2, name: o2 });
            }
            return this.states;
          } }, { key: "restoreInteractionCoords", value: function(t3) {
            var e2 = t3.interaction, n2 = e2.coords, r2 = e2.rect, i2 = e2.modification;
            if (i2.result) {
              for (var o2 = i2.startDelta, a2 = i2.result, s2 = a2.delta, c2 = a2.rectDelta, l2 = 0, u2 = [[n2.start, o2], [n2.cur, s2]]; l2 < u2.length; l2++) {
                var p2 = u2[l2], f2 = p2[0], d2 = p2[1];
                f2.page.x -= d2.x, f2.page.y -= d2.y, f2.client.x -= d2.x, f2.client.y -= d2.y;
              }
              r2.left -= c2.left, r2.right -= c2.right, r2.top -= c2.top, r2.bottom -= c2.bottom;
            }
          } }, { key: "shouldDo", value: function(t3, e2, n2, r2) {
            return !(!t3 || false === t3.enabled || r2 && !t3.endOnly || t3.endOnly && !e2 || "start" === n2 && !t3.setStart);
          } }, { key: "copyFrom", value: function(t3) {
            this.startOffset = t3.startOffset, this.startDelta = t3.startDelta, this.startEdges = t3.startEdges, this.edges = t3.edges, this.states = t3.states.map((function(t4) {
              return ge2(t4);
            })), this.result = ye2(V({}, t3.result.coords), V({}, t3.result.rect));
          } }, { key: "destroy", value: function() {
            for (var t3 in this) this[t3] = null;
          } }]), t2;
        })();
        function ye2(t2, e2) {
          return { rect: e2, coords: t2, delta: { x: 0, y: 0 }, rectDelta: { left: 0, right: 0, top: 0, bottom: 0 }, eventProps: [], changed: true };
        }
        function be2(t2, e2) {
          var n2 = t2.defaults, r2 = { start: t2.start, set: t2.set, beforeEnd: t2.beforeEnd, stop: t2.stop }, i2 = function(t3) {
            var i3 = t3 || {};
            for (var o2 in i3.enabled = false !== i3.enabled, n2) o2 in i3 || (i3[o2] = n2[o2]);
            var a2 = { options: i3, methods: r2, name: e2, enable: function() {
              return i3.enabled = true, a2;
            }, disable: function() {
              return i3.enabled = false, a2;
            } };
            return a2;
          };
          return e2 && "string" == typeof e2 && (i2._defaults = n2, i2._methods = r2), i2;
        }
        function xe2(t2) {
          var e2 = t2.iEvent, n2 = t2.interaction.modification.result;
          n2 && (e2.modifiers = n2.eventProps);
        }
        var we2 = { id: "modifiers/base", before: ["actions"], install: function(t2) {
          t2.defaults.perAction.modifiers = [];
        }, listeners: { "interactions:new": function(t2) {
          var e2 = t2.interaction;
          e2.modification = new me(e2);
        }, "interactions:before-action-start": function(t2) {
          var e2 = t2.interaction, n2 = t2.interaction.modification;
          n2.start(t2, e2.coords.start.page), e2.edges = n2.edges, n2.applyToInteraction(t2);
        }, "interactions:before-action-move": function(t2) {
          var e2 = t2.interaction, n2 = e2.modification, r2 = n2.setAndApply(t2);
          return e2.edges = n2.edges, r2;
        }, "interactions:before-action-end": function(t2) {
          var e2 = t2.interaction, n2 = e2.modification, r2 = n2.beforeEnd(t2);
          return e2.edges = n2.startEdges, r2;
        }, "interactions:action-start": xe2, "interactions:action-move": xe2, "interactions:action-end": xe2, "interactions:after-action-start": function(t2) {
          return t2.interaction.modification.restoreInteractionCoords(t2);
        }, "interactions:after-action-move": function(t2) {
          return t2.interaction.modification.restoreInteractionCoords(t2);
        }, "interactions:stop": function(t2) {
          return t2.interaction.modification.stop(t2);
        } } }, Ee2 = we2, Te = { base: { preventDefault: "auto", deltaSource: "page" }, perAction: { enabled: false, origin: { x: 0, y: 0 } }, actions: {} }, Se2 = (function(t2) {
          s(n2, t2);
          var e2 = p(n2);
          function n2(t3, i2, o2, a2, s2, c2, l2) {
            var p2;
            r(this, n2), (p2 = e2.call(this, t3)).relatedTarget = null, p2.screenX = void 0, p2.screenY = void 0, p2.button = void 0, p2.buttons = void 0, p2.ctrlKey = void 0, p2.shiftKey = void 0, p2.altKey = void 0, p2.metaKey = void 0, p2.page = void 0, p2.client = void 0, p2.delta = void 0, p2.rect = void 0, p2.x0 = void 0, p2.y0 = void 0, p2.t0 = void 0, p2.dt = void 0, p2.duration = void 0, p2.clientX0 = void 0, p2.clientY0 = void 0, p2.velocity = void 0, p2.speed = void 0, p2.swipe = void 0, p2.axes = void 0, p2.preEnd = void 0, s2 = s2 || t3.element;
            var f2 = t3.interactable, d2 = (f2 && f2.options || Te).deltaSource, h2 = K(f2, s2, o2), v2 = "start" === a2, g2 = "end" === a2, m2 = v2 ? u(p2) : t3.prevEvent, y2 = v2 ? t3.coords.start : g2 ? { page: m2.page, client: m2.client, timeStamp: t3.coords.cur.timeStamp } : t3.coords.cur;
            return p2.page = V({}, y2.page), p2.client = V({}, y2.client), p2.rect = V({}, t3.rect), p2.timeStamp = y2.timeStamp, g2 || (p2.page.x -= h2.x, p2.page.y -= h2.y, p2.client.x -= h2.x, p2.client.y -= h2.y), p2.ctrlKey = i2.ctrlKey, p2.altKey = i2.altKey, p2.shiftKey = i2.shiftKey, p2.metaKey = i2.metaKey, p2.button = i2.button, p2.buttons = i2.buttons, p2.target = s2, p2.currentTarget = s2, p2.preEnd = c2, p2.type = l2 || o2 + (a2 || ""), p2.interactable = f2, p2.t0 = v2 ? t3.pointers[t3.pointers.length - 1].downTime : m2.t0, p2.x0 = t3.coords.start.page.x - h2.x, p2.y0 = t3.coords.start.page.y - h2.y, p2.clientX0 = t3.coords.start.client.x - h2.x, p2.clientY0 = t3.coords.start.client.y - h2.y, p2.delta = v2 || g2 ? { x: 0, y: 0 } : { x: p2[d2].x - m2[d2].x, y: p2[d2].y - m2[d2].y }, p2.dt = t3.coords.delta.timeStamp, p2.duration = p2.timeStamp - p2.t0, p2.velocity = V({}, t3.coords.velocity[d2]), p2.speed = Q(p2.velocity.x, p2.velocity.y), p2.swipe = g2 || "inertiastart" === a2 ? p2.getSwipe() : null, p2;
          }
          return o(n2, [{ key: "getSwipe", value: function() {
            var t3 = this._interaction;
            if (t3.prevEvent.speed < 600 || this.timeStamp - t3.prevEvent.timeStamp > 150) return null;
            var e3 = 180 * Math.atan2(t3.prevEvent.velocityY, t3.prevEvent.velocityX) / Math.PI;
            e3 < 0 && (e3 += 360);
            var n3 = 112.5 <= e3 && e3 < 247.5, r2 = 202.5 <= e3 && e3 < 337.5;
            return { up: r2, down: !r2 && 22.5 <= e3 && e3 < 157.5, left: n3, right: !n3 && (292.5 <= e3 || e3 < 67.5), angle: e3, speed: t3.prevEvent.speed, velocity: { x: t3.prevEvent.velocityX, y: t3.prevEvent.velocityY } };
          } }, { key: "preventDefault", value: function() {
          } }, { key: "stopImmediatePropagation", value: function() {
            this.immediatePropagationStopped = this.propagationStopped = true;
          } }, { key: "stopPropagation", value: function() {
            this.propagationStopped = true;
          } }]), n2;
        })(vt2);
        Object.defineProperties(Se2.prototype, { pageX: { get: function() {
          return this.page.x;
        }, set: function(t2) {
          this.page.x = t2;
        } }, pageY: { get: function() {
          return this.page.y;
        }, set: function(t2) {
          this.page.y = t2;
        } }, clientX: { get: function() {
          return this.client.x;
        }, set: function(t2) {
          this.client.x = t2;
        } }, clientY: { get: function() {
          return this.client.y;
        }, set: function(t2) {
          this.client.y = t2;
        } }, dx: { get: function() {
          return this.delta.x;
        }, set: function(t2) {
          this.delta.x = t2;
        } }, dy: { get: function() {
          return this.delta.y;
        }, set: function(t2) {
          this.delta.y = t2;
        } }, velocityX: { get: function() {
          return this.velocity.x;
        }, set: function(t2) {
          this.velocity.x = t2;
        } }, velocityY: { get: function() {
          return this.velocity.y;
        }, set: function(t2) {
          this.velocity.y = t2;
        } } });
        var _e2 = o((function t2(e2, n2, i2, o2, a2) {
          r(this, t2), this.id = void 0, this.pointer = void 0, this.event = void 0, this.downTime = void 0, this.downTarget = void 0, this.id = e2, this.pointer = n2, this.event = i2, this.downTime = o2, this.downTarget = a2;
        })), Pe = (function(t2) {
          return t2.interactable = "", t2.element = "", t2.prepared = "", t2.pointerIsDown = "", t2.pointerWasMoved = "", t2._proxy = "", t2;
        })({}), Oe2 = (function(t2) {
          return t2.start = "", t2.move = "", t2.end = "", t2.stop = "", t2.interacting = "", t2;
        })({}), ke2 = 0, De2 = (function() {
          function t2(e2) {
            var n2 = this, i2 = e2.pointerType, o2 = e2.scopeFire;
            r(this, t2), this.interactable = null, this.element = null, this.rect = null, this._rects = void 0, this.edges = null, this._scopeFire = void 0, this.prepared = { name: null, axis: null, edges: null }, this.pointerType = void 0, this.pointers = [], this.downEvent = null, this.downPointer = {}, this._latestPointer = { pointer: null, event: null, eventTarget: null }, this.prevEvent = null, this.pointerIsDown = false, this.pointerWasMoved = false, this._interacting = false, this._ending = false, this._stopped = true, this._proxy = void 0, this.simulation = null, this.doMove = Nt2((function(t3) {
              this.move(t3);
            }), "The interaction.doMove() method has been renamed to interaction.move()"), this.coords = { start: { page: { x: 0, y: 0 }, client: { x: 0, y: 0 }, timeStamp: 0 }, prev: { page: { x: 0, y: 0 }, client: { x: 0, y: 0 }, timeStamp: 0 }, cur: { page: { x: 0, y: 0 }, client: { x: 0, y: 0 }, timeStamp: 0 }, delta: { page: { x: 0, y: 0 }, client: { x: 0, y: 0 }, timeStamp: 0 }, velocity: { page: { x: 0, y: 0 }, client: { x: 0, y: 0 }, timeStamp: 0 } }, this._id = ke2++, this._scopeFire = o2, this.pointerType = i2;
            var a2 = this;
            this._proxy = {};
            var s2 = function(t3) {
              Object.defineProperty(n2._proxy, t3, { get: function() {
                return a2[t3];
              } });
            };
            for (var c2 in Pe) s2(c2);
            var l2 = function(t3) {
              Object.defineProperty(n2._proxy, t3, { value: function() {
                return a2[t3].apply(a2, arguments);
              } });
            };
            for (var u2 in Oe2) l2(u2);
            this._scopeFire("interactions:new", { interaction: this });
          }
          return o(t2, [{ key: "pointerMoveTolerance", get: function() {
            return 1;
          } }, { key: "pointerDown", value: function(t3, e2, n2) {
            var r2 = this.updatePointer(t3, e2, n2, true), i2 = this.pointers[r2];
            this._scopeFire("interactions:down", { pointer: t3, event: e2, eventTarget: n2, pointerIndex: r2, pointerInfo: i2, type: "down", interaction: this });
          } }, { key: "start", value: function(t3, e2, n2) {
            return !(this.interacting() || !this.pointerIsDown || this.pointers.length < ("gesture" === t3.name ? 2 : 1) || !e2.options[t3.name].enabled) && (Ut2(this.prepared, t3), this.interactable = e2, this.element = n2, this.rect = e2.getRect(n2), this.edges = this.prepared.edges ? V({}, this.prepared.edges) : { left: true, right: true, top: true, bottom: true }, this._stopped = false, this._interacting = this._doPhase({ interaction: this, event: this.downEvent, phase: "start" }) && !this._stopped, this._interacting);
          } }, { key: "pointerMove", value: function(t3, e2, n2) {
            this.simulation || this.modification && this.modification.endResult || this.updatePointer(t3, e2, n2, false);
            var r2, i2, o2 = this.coords.cur.page.x === this.coords.prev.page.x && this.coords.cur.page.y === this.coords.prev.page.y && this.coords.cur.client.x === this.coords.prev.client.x && this.coords.cur.client.y === this.coords.prev.client.y;
            this.pointerIsDown && !this.pointerWasMoved && (r2 = this.coords.cur.client.x - this.coords.start.client.x, i2 = this.coords.cur.client.y - this.coords.start.client.y, this.pointerWasMoved = Q(r2, i2) > this.pointerMoveTolerance);
            var a2, s2, c2, l2 = this.getPointerIndex(t3), u2 = { pointer: t3, pointerIndex: l2, pointerInfo: this.pointers[l2], event: e2, type: "move", eventTarget: n2, dx: r2, dy: i2, duplicate: o2, interaction: this };
            o2 || (a2 = this.coords.velocity, s2 = this.coords.delta, c2 = Math.max(s2.timeStamp / 1e3, 1e-3), a2.page.x = s2.page.x / c2, a2.page.y = s2.page.y / c2, a2.client.x = s2.client.x / c2, a2.client.y = s2.client.y / c2, a2.timeStamp = c2), this._scopeFire("interactions:move", u2), o2 || this.simulation || (this.interacting() && (u2.type = null, this.move(u2)), this.pointerWasMoved && et2(this.coords.prev, this.coords.cur));
          } }, { key: "move", value: function(t3) {
            t3 && t3.event || nt2(this.coords.delta), (t3 = V({ pointer: this._latestPointer.pointer, event: this._latestPointer.event, eventTarget: this._latestPointer.eventTarget, interaction: this }, t3 || {})).phase = "move", this._doPhase(t3);
          } }, { key: "pointerUp", value: function(t3, e2, n2, r2) {
            var i2 = this.getPointerIndex(t3);
            -1 === i2 && (i2 = this.updatePointer(t3, e2, n2, false));
            var o2 = /cancel$/i.test(e2.type) ? "cancel" : "up";
            this._scopeFire("interactions:".concat(o2), { pointer: t3, pointerIndex: i2, pointerInfo: this.pointers[i2], event: e2, eventTarget: n2, type: o2, curEventTarget: r2, interaction: this }), this.simulation || this.end(e2), this.removePointer(t3, e2);
          } }, { key: "documentBlur", value: function(t3) {
            this.end(t3), this._scopeFire("interactions:blur", { event: t3, type: "blur", interaction: this });
          } }, { key: "end", value: function(t3) {
            var e2;
            this._ending = true, t3 = t3 || this._latestPointer.event, this.interacting() && (e2 = this._doPhase({ event: t3, interaction: this, phase: "end" })), this._ending = false, true === e2 && this.stop();
          } }, { key: "currentAction", value: function() {
            return this._interacting ? this.prepared.name : null;
          } }, { key: "interacting", value: function() {
            return this._interacting;
          } }, { key: "stop", value: function() {
            this._scopeFire("interactions:stop", { interaction: this }), this.interactable = this.element = null, this._interacting = false, this._stopped = true, this.prepared.name = this.prevEvent = null;
          } }, { key: "getPointerIndex", value: function(t3) {
            var e2 = at(t3);
            return "mouse" === this.pointerType || "pen" === this.pointerType ? this.pointers.length - 1 : yt(this.pointers, (function(t4) {
              return t4.id === e2;
            }));
          } }, { key: "getPointerInfo", value: function(t3) {
            return this.pointers[this.getPointerIndex(t3)];
          } }, { key: "updatePointer", value: function(t3, e2, n2, r2) {
            var i2, o2, a2, s2 = at(t3), c2 = this.getPointerIndex(t3), l2 = this.pointers[c2];
            return r2 = false !== r2 && (r2 || /(down|start)$/i.test(e2.type)), l2 ? l2.pointer = t3 : (l2 = new _e2(s2, t3, e2, null, null), c2 = this.pointers.length, this.pointers.push(l2)), st2(this.coords.cur, this.pointers.map((function(t4) {
              return t4.pointer;
            })), this._now()), i2 = this.coords.delta, o2 = this.coords.prev, a2 = this.coords.cur, i2.page.x = a2.page.x - o2.page.x, i2.page.y = a2.page.y - o2.page.y, i2.client.x = a2.client.x - o2.client.x, i2.client.y = a2.client.y - o2.client.y, i2.timeStamp = a2.timeStamp - o2.timeStamp, r2 && (this.pointerIsDown = true, l2.downTime = this.coords.cur.timeStamp, l2.downTarget = n2, tt2(this.downPointer, t3), this.interacting() || (et2(this.coords.start, this.coords.cur), et2(this.coords.prev, this.coords.cur), this.downEvent = e2, this.pointerWasMoved = false)), this._updateLatestPointer(t3, e2, n2), this._scopeFire("interactions:update-pointer", { pointer: t3, event: e2, eventTarget: n2, down: r2, pointerInfo: l2, pointerIndex: c2, interaction: this }), c2;
          } }, { key: "removePointer", value: function(t3, e2) {
            var n2 = this.getPointerIndex(t3);
            if (-1 !== n2) {
              var r2 = this.pointers[n2];
              this._scopeFire("interactions:remove-pointer", { pointer: t3, event: e2, eventTarget: null, pointerIndex: n2, pointerInfo: r2, interaction: this }), this.pointers.splice(n2, 1), this.pointerIsDown = false;
            }
          } }, { key: "_updateLatestPointer", value: function(t3, e2, n2) {
            this._latestPointer.pointer = t3, this._latestPointer.event = e2, this._latestPointer.eventTarget = n2;
          } }, { key: "destroy", value: function() {
            this._latestPointer.pointer = null, this._latestPointer.event = null, this._latestPointer.eventTarget = null;
          } }, { key: "_createPreparedEvent", value: function(t3, e2, n2, r2) {
            return new Se2(this, t3, this.prepared.name, e2, this.element, n2, r2);
          } }, { key: "_fireEvent", value: function(t3) {
            var e2;
            null == (e2 = this.interactable) || e2.fire(t3), (!this.prevEvent || t3.timeStamp >= this.prevEvent.timeStamp) && (this.prevEvent = t3);
          } }, { key: "_doPhase", value: function(t3) {
            var e2 = t3.event, n2 = t3.phase, r2 = t3.preEnd, i2 = t3.type, o2 = this.rect;
            if (o2 && "move" === n2 && (H2(this.edges, o2, this.coords.delta[this.interactable.options.deltaSource]), o2.width = o2.right - o2.left, o2.height = o2.bottom - o2.top), false === this._scopeFire("interactions:before-action-".concat(n2), t3)) return false;
            var a2 = t3.iEvent = this._createPreparedEvent(e2, n2, r2, i2);
            return this._scopeFire("interactions:action-".concat(n2), t3), "start" === n2 && (this.prevEvent = a2), this._fireEvent(a2), this._scopeFire("interactions:after-action-".concat(n2), t3), true;
          } }, { key: "_now", value: function() {
            return Date.now();
          } }]), t2;
        })();
        function Ie2(t2) {
          Me2(t2.interaction);
        }
        function Me2(t2) {
          if (!(function(t3) {
            return !(!t3.offset.pending.x && !t3.offset.pending.y);
          })(t2)) return false;
          var e2 = t2.offset.pending;
          return Ae2(t2.coords.cur, e2), Ae2(t2.coords.delta, e2), H2(t2.edges, t2.rect, e2), e2.x = 0, e2.y = 0, true;
        }
        function ze2(t2) {
          var e2 = t2.x, n2 = t2.y;
          this.offset.pending.x += e2, this.offset.pending.y += n2, this.offset.total.x += e2, this.offset.total.y += n2;
        }
        function Ae2(t2, e2) {
          var n2 = t2.page, r2 = t2.client, i2 = e2.x, o2 = e2.y;
          n2.x += i2, n2.y += o2, r2.x += i2, r2.y += o2;
        }
        Oe2.offsetBy = "";
        var Re2 = { id: "offset", before: ["modifiers", "pointer-events", "actions", "inertia"], install: function(t2) {
          t2.Interaction.prototype.offsetBy = ze2;
        }, listeners: { "interactions:new": function(t2) {
          t2.interaction.offset = { total: { x: 0, y: 0 }, pending: { x: 0, y: 0 } };
        }, "interactions:update-pointer": function(t2) {
          return (function(t3) {
            t3.pointerIsDown && (Ae2(t3.coords.cur, t3.offset.total), t3.offset.pending.x = 0, t3.offset.pending.y = 0);
          })(t2.interaction);
        }, "interactions:before-action-start": Ie2, "interactions:before-action-move": Ie2, "interactions:before-action-end": function(t2) {
          var e2 = t2.interaction;
          if (Me2(e2)) return e2.move({ offset: true }), e2.end(), false;
        }, "interactions:stop": function(t2) {
          var e2 = t2.interaction;
          e2.offset.total.x = 0, e2.offset.total.y = 0, e2.offset.pending.x = 0, e2.offset.pending.y = 0;
        } } }, Ce2 = Re2;
        var je2 = (function() {
          function t2(e2) {
            r(this, t2), this.active = false, this.isModified = false, this.smoothEnd = false, this.allowResume = false, this.modification = void 0, this.modifierCount = 0, this.modifierArg = void 0, this.startCoords = void 0, this.t0 = 0, this.v0 = 0, this.te = 0, this.targetOffset = void 0, this.modifiedOffset = void 0, this.currentOffset = void 0, this.lambda_v0 = 0, this.one_ve_v0 = 0, this.timeout = void 0, this.interaction = void 0, this.interaction = e2;
          }
          return o(t2, [{ key: "start", value: function(t3) {
            var e2 = this.interaction, n2 = Fe2(e2);
            if (!n2 || !n2.enabled) return false;
            var r2 = e2.coords.velocity.client, i2 = Q(r2.x, r2.y), o2 = this.modification || (this.modification = new me(e2));
            if (o2.copyFrom(e2.modification), this.t0 = e2._now(), this.allowResume = n2.allowResume, this.v0 = i2, this.currentOffset = { x: 0, y: 0 }, this.startCoords = e2.coords.cur.page, this.modifierArg = o2.fillArg({ pageCoords: this.startCoords, preEnd: true, phase: "inertiastart" }), this.t0 - e2.coords.cur.timeStamp < 50 && i2 > n2.minSpeed && i2 > n2.endSpeed) this.startInertia();
            else {
              if (o2.result = o2.setAll(this.modifierArg), !o2.result.changed) return false;
              this.startSmoothEnd();
            }
            return e2.modification.result.rect = null, e2.offsetBy(this.targetOffset), e2._doPhase({ interaction: e2, event: t3, phase: "inertiastart" }), e2.offsetBy({ x: -this.targetOffset.x, y: -this.targetOffset.y }), e2.modification.result.rect = null, this.active = true, e2.simulation = this, true;
          } }, { key: "startInertia", value: function() {
            var t3 = this, e2 = this.interaction.coords.velocity.client, n2 = Fe2(this.interaction), r2 = n2.resistance, i2 = -Math.log(n2.endSpeed / this.v0) / r2;
            this.targetOffset = { x: (e2.x - i2) / r2, y: (e2.y - i2) / r2 }, this.te = i2, this.lambda_v0 = r2 / this.v0, this.one_ve_v0 = 1 - n2.endSpeed / this.v0;
            var o2 = this.modification, a2 = this.modifierArg;
            a2.pageCoords = { x: this.startCoords.x + this.targetOffset.x, y: this.startCoords.y + this.targetOffset.y }, o2.result = o2.setAll(a2), o2.result.changed && (this.isModified = true, this.modifiedOffset = { x: this.targetOffset.x + o2.result.delta.x, y: this.targetOffset.y + o2.result.delta.y }), this.onNextFrame((function() {
              return t3.inertiaTick();
            }));
          } }, { key: "startSmoothEnd", value: function() {
            var t3 = this;
            this.smoothEnd = true, this.isModified = true, this.targetOffset = { x: this.modification.result.delta.x, y: this.modification.result.delta.y }, this.onNextFrame((function() {
              return t3.smoothEndTick();
            }));
          } }, { key: "onNextFrame", value: function(t3) {
            var e2 = this;
            this.timeout = Lt2.request((function() {
              e2.active && t3();
            }));
          } }, { key: "inertiaTick", value: function() {
            var t3, e2, n2, r2, i2, o2, a2, s2 = this, c2 = this.interaction, l2 = Fe2(c2).resistance, u2 = (c2._now() - this.t0) / 1e3;
            if (u2 < this.te) {
              var p2, f2 = 1 - (Math.exp(-l2 * u2) - this.lambda_v0) / this.one_ve_v0;
              this.isModified ? (t3 = 0, e2 = 0, n2 = this.targetOffset.x, r2 = this.targetOffset.y, i2 = this.modifiedOffset.x, o2 = this.modifiedOffset.y, p2 = { x: Ye2(a2 = f2, t3, n2, i2), y: Ye2(a2, e2, r2, o2) }) : p2 = { x: this.targetOffset.x * f2, y: this.targetOffset.y * f2 };
              var d2 = { x: p2.x - this.currentOffset.x, y: p2.y - this.currentOffset.y };
              this.currentOffset.x += d2.x, this.currentOffset.y += d2.y, c2.offsetBy(d2), c2.move(), this.onNextFrame((function() {
                return s2.inertiaTick();
              }));
            } else c2.offsetBy({ x: this.modifiedOffset.x - this.currentOffset.x, y: this.modifiedOffset.y - this.currentOffset.y }), this.end();
          } }, { key: "smoothEndTick", value: function() {
            var t3 = this, e2 = this.interaction, n2 = e2._now() - this.t0, r2 = Fe2(e2).smoothEndDuration;
            if (n2 < r2) {
              var i2 = { x: Le(n2, 0, this.targetOffset.x, r2), y: Le(n2, 0, this.targetOffset.y, r2) }, o2 = { x: i2.x - this.currentOffset.x, y: i2.y - this.currentOffset.y };
              this.currentOffset.x += o2.x, this.currentOffset.y += o2.y, e2.offsetBy(o2), e2.move({ skipModifiers: this.modifierCount }), this.onNextFrame((function() {
                return t3.smoothEndTick();
              }));
            } else e2.offsetBy({ x: this.targetOffset.x - this.currentOffset.x, y: this.targetOffset.y - this.currentOffset.y }), this.end();
          } }, { key: "resume", value: function(t3) {
            var e2 = t3.pointer, n2 = t3.event, r2 = t3.eventTarget, i2 = this.interaction;
            i2.offsetBy({ x: -this.currentOffset.x, y: -this.currentOffset.y }), i2.updatePointer(e2, n2, r2, true), i2._doPhase({ interaction: i2, event: n2, phase: "resume" }), et2(i2.coords.prev, i2.coords.cur), this.stop();
          } }, { key: "end", value: function() {
            this.interaction.move(), this.interaction.end(), this.stop();
          } }, { key: "stop", value: function() {
            this.active = this.smoothEnd = false, this.interaction.simulation = null, Lt2.cancel(this.timeout);
          } }]), t2;
        })();
        function Fe2(t2) {
          var e2 = t2.interactable, n2 = t2.prepared;
          return e2 && e2.options && n2.name && e2.options[n2.name].inertia;
        }
        var Xe2 = { id: "inertia", before: ["modifiers", "actions"], install: function(t2) {
          var e2 = t2.defaults;
          t2.usePlugin(Ce2), t2.usePlugin(Ee2), t2.actions.phases.inertiastart = true, t2.actions.phases.resume = true, e2.perAction.inertia = { enabled: false, resistance: 10, minSpeed: 100, endSpeed: 10, allowResume: true, smoothEndDuration: 300 };
        }, listeners: { "interactions:new": function(t2) {
          var e2 = t2.interaction;
          e2.inertia = new je2(e2);
        }, "interactions:before-action-end": function(t2) {
          var e2 = t2.interaction, n2 = t2.event;
          return (!e2._interacting || e2.simulation || !e2.inertia.start(n2)) && null;
        }, "interactions:down": function(t2) {
          var e2 = t2.interaction, n2 = t2.eventTarget, r2 = e2.inertia;
          if (r2.active) for (var i2 = n2; w.element(i2); ) {
            if (i2 === e2.element) {
              r2.resume(t2);
              break;
            }
            i2 = A(i2);
          }
        }, "interactions:stop": function(t2) {
          var e2 = t2.interaction.inertia;
          e2.active && e2.stop();
        }, "interactions:before-action-resume": function(t2) {
          var e2 = t2.interaction.modification;
          e2.stop(t2), e2.start(t2, t2.interaction.coords.cur.page), e2.applyToInteraction(t2);
        }, "interactions:before-action-inertiastart": function(t2) {
          return t2.interaction.modification.setAndApply(t2);
        }, "interactions:action-resume": xe2, "interactions:action-inertiastart": xe2, "interactions:after-action-inertiastart": function(t2) {
          return t2.interaction.modification.restoreInteractionCoords(t2);
        }, "interactions:after-action-resume": function(t2) {
          return t2.interaction.modification.restoreInteractionCoords(t2);
        } } };
        function Ye2(t2, e2, n2, r2) {
          var i2 = 1 - t2;
          return i2 * i2 * e2 + 2 * i2 * t2 * n2 + t2 * t2 * r2;
        }
        function Le(t2, e2, n2, r2) {
          return -n2 * (t2 /= r2) * (t2 - 2) + e2;
        }
        var qe2 = Xe2;
        function Be2(t2, e2) {
          for (var n2 = 0; n2 < e2.length; n2++) {
            var r2 = e2[n2];
            if (t2.immediatePropagationStopped) break;
            r2(t2);
          }
        }
        var Ve2 = (function() {
          function t2(e2) {
            r(this, t2), this.options = void 0, this.types = {}, this.propagationStopped = false, this.immediatePropagationStopped = false, this.global = void 0, this.options = V({}, e2 || {});
          }
          return o(t2, [{ key: "fire", value: function(t3) {
            var e2, n2 = this.global;
            (e2 = this.types[t3.type]) && Be2(t3, e2), !t3.propagationStopped && n2 && (e2 = n2[t3.type]) && Be2(t3, e2);
          } }, { key: "on", value: function(t3, e2) {
            var n2 = $2(t3, e2);
            for (t3 in n2) this.types[t3] = gt2(this.types[t3] || [], n2[t3]);
          } }, { key: "off", value: function(t3, e2) {
            var n2 = $2(t3, e2);
            for (t3 in n2) {
              var r2 = this.types[t3];
              if (r2 && r2.length) for (var i2 = 0, o2 = n2[t3]; i2 < o2.length; i2++) {
                var a2 = o2[i2], s2 = r2.indexOf(a2);
                -1 !== s2 && r2.splice(s2, 1);
              }
            }
          } }, { key: "getRect", value: function(t3) {
            return null;
          } }]), t2;
        })();
        var We2 = (function() {
          function t2(e2) {
            r(this, t2), this.currentTarget = void 0, this.originalEvent = void 0, this.type = void 0, this.originalEvent = e2, tt2(this, e2);
          }
          return o(t2, [{ key: "preventOriginalDefault", value: function() {
            this.originalEvent.preventDefault();
          } }, { key: "stopPropagation", value: function() {
            this.originalEvent.stopPropagation();
          } }, { key: "stopImmediatePropagation", value: function() {
            this.originalEvent.stopImmediatePropagation();
          } }]), t2;
        })();
        function Ge2(t2) {
          return w.object(t2) ? { capture: !!t2.capture, passive: !!t2.passive } : { capture: !!t2, passive: false };
        }
        function Ne(t2, e2) {
          return t2 === e2 || ("boolean" == typeof t2 ? !!e2.capture === t2 && false == !!e2.passive : !!t2.capture == !!e2.capture && !!t2.passive == !!e2.passive);
        }
        var Ue2 = { id: "events", install: function(t2) {
          var e2, n2 = [], r2 = {}, i2 = [], o2 = { add: a2, remove: s2, addDelegate: function(t3, e3, n3, o3, s3) {
            var u2 = Ge2(s3);
            if (!r2[n3]) {
              r2[n3] = [];
              for (var p2 = 0; p2 < i2.length; p2++) {
                var f2 = i2[p2];
                a2(f2, n3, c2), a2(f2, n3, l2, true);
              }
            }
            var d2 = r2[n3], h2 = bt(d2, (function(n4) {
              return n4.selector === t3 && n4.context === e3;
            }));
            h2 || (h2 = { selector: t3, context: e3, listeners: [] }, d2.push(h2));
            h2.listeners.push({ func: o3, options: u2 });
          }, removeDelegate: function(t3, e3, n3, i3, o3) {
            var a3, u2 = Ge2(o3), p2 = r2[n3], f2 = false;
            if (!p2) return;
            for (a3 = p2.length - 1; a3 >= 0; a3--) {
              var d2 = p2[a3];
              if (d2.selector === t3 && d2.context === e3) {
                for (var h2 = d2.listeners, v2 = h2.length - 1; v2 >= 0; v2--) {
                  var g2 = h2[v2];
                  if (g2.func === i3 && Ne(g2.options, u2)) {
                    h2.splice(v2, 1), h2.length || (p2.splice(a3, 1), s2(e3, n3, c2), s2(e3, n3, l2, true)), f2 = true;
                    break;
                  }
                }
                if (f2) break;
              }
            }
          }, delegateListener: c2, delegateUseCapture: l2, delegatedEvents: r2, documents: i2, targets: n2, supportsOptions: false, supportsPassive: false };
          function a2(t3, e3, r3, i3) {
            if (t3.addEventListener) {
              var a3 = Ge2(i3), s3 = bt(n2, (function(e4) {
                return e4.eventTarget === t3;
              }));
              s3 || (s3 = { eventTarget: t3, events: {} }, n2.push(s3)), s3.events[e3] || (s3.events[e3] = []), bt(s3.events[e3], (function(t4) {
                return t4.func === r3 && Ne(t4.options, a3);
              })) || (t3.addEventListener(e3, r3, o2.supportsOptions ? a3 : a3.capture), s3.events[e3].push({ func: r3, options: a3 }));
            }
          }
          function s2(t3, e3, r3, i3) {
            if (t3.addEventListener && t3.removeEventListener) {
              var a3 = yt(n2, (function(e4) {
                return e4.eventTarget === t3;
              })), c3 = n2[a3];
              if (c3 && c3.events) if ("all" !== e3) {
                var l3 = false, u2 = c3.events[e3];
                if (u2) {
                  if ("all" === r3) {
                    for (var p2 = u2.length - 1; p2 >= 0; p2--) {
                      var f2 = u2[p2];
                      s2(t3, e3, f2.func, f2.options);
                    }
                    return;
                  }
                  for (var d2 = Ge2(i3), h2 = 0; h2 < u2.length; h2++) {
                    var v2 = u2[h2];
                    if (v2.func === r3 && Ne(v2.options, d2)) {
                      t3.removeEventListener(e3, r3, o2.supportsOptions ? d2 : d2.capture), u2.splice(h2, 1), 0 === u2.length && (delete c3.events[e3], l3 = true);
                      break;
                    }
                  }
                }
                l3 && !Object.keys(c3.events).length && n2.splice(a3, 1);
              } else for (e3 in c3.events) c3.events.hasOwnProperty(e3) && s2(t3, e3, "all");
            }
          }
          function c2(t3, e3) {
            for (var n3 = Ge2(e3), i3 = new We2(t3), o3 = r2[t3.type], a3 = ht(t3)[0], s3 = a3; w.element(s3); ) {
              for (var c3 = 0; c3 < o3.length; c3++) {
                var l3 = o3[c3], u2 = l3.selector, p2 = l3.context;
                if (R(s3, u2) && M(p2, a3) && M(p2, s3)) {
                  var f2 = l3.listeners;
                  i3.currentTarget = s3;
                  for (var d2 = 0; d2 < f2.length; d2++) {
                    var h2 = f2[d2];
                    Ne(h2.options, n3) && h2.func(i3);
                  }
                }
              }
              s3 = A(s3);
            }
          }
          function l2(t3) {
            return c2(t3, true);
          }
          return null == (e2 = t2.document) || e2.createElement("div").addEventListener("test", null, { get capture() {
            return o2.supportsOptions = true;
          }, get passive() {
            return o2.supportsPassive = true;
          } }), t2.events = o2, o2;
        } }, He2 = { methodOrder: ["simulationResume", "mouseOrPen", "hasPointer", "idle"], search: function(t2) {
          for (var e2 = 0, n2 = He2.methodOrder; e2 < n2.length; e2++) {
            var r2 = n2[e2], i2 = He2[r2](t2);
            if (i2) return i2;
          }
          return null;
        }, simulationResume: function(t2) {
          var e2 = t2.pointerType, n2 = t2.eventType, r2 = t2.eventTarget, i2 = t2.scope;
          if (!/down|start/i.test(n2)) return null;
          for (var o2 = 0, a2 = i2.interactions.list; o2 < a2.length; o2++) {
            var s2 = a2[o2], c2 = r2;
            if (s2.simulation && s2.simulation.allowResume && s2.pointerType === e2) for (; c2; ) {
              if (c2 === s2.element) return s2;
              c2 = A(c2);
            }
          }
          return null;
        }, mouseOrPen: function(t2) {
          var e2, n2 = t2.pointerId, r2 = t2.pointerType, i2 = t2.eventType, o2 = t2.scope;
          if ("mouse" !== r2 && "pen" !== r2) return null;
          for (var a2 = 0, s2 = o2.interactions.list; a2 < s2.length; a2++) {
            var c2 = s2[a2];
            if (c2.pointerType === r2) {
              if (c2.simulation && !Ke2(c2, n2)) continue;
              if (c2.interacting()) return c2;
              e2 || (e2 = c2);
            }
          }
          if (e2) return e2;
          for (var l2 = 0, u2 = o2.interactions.list; l2 < u2.length; l2++) {
            var p2 = u2[l2];
            if (!(p2.pointerType !== r2 || /down/i.test(i2) && p2.simulation)) return p2;
          }
          return null;
        }, hasPointer: function(t2) {
          for (var e2 = t2.pointerId, n2 = 0, r2 = t2.scope.interactions.list; n2 < r2.length; n2++) {
            var i2 = r2[n2];
            if (Ke2(i2, e2)) return i2;
          }
          return null;
        }, idle: function(t2) {
          for (var e2 = t2.pointerType, n2 = 0, r2 = t2.scope.interactions.list; n2 < r2.length; n2++) {
            var i2 = r2[n2];
            if (1 === i2.pointers.length) {
              var o2 = i2.interactable;
              if (o2 && (!o2.options.gesture || !o2.options.gesture.enabled)) continue;
            } else if (i2.pointers.length >= 2) continue;
            if (!i2.interacting() && e2 === i2.pointerType) return i2;
          }
          return null;
        } };
        function Ke2(t2, e2) {
          return t2.pointers.some((function(t3) {
            return t3.id === e2;
          }));
        }
        var $e = He2, Je2 = ["pointerDown", "pointerMove", "pointerUp", "updatePointer", "removePointer", "windowBlur"];
        function Qe2(t2, e2) {
          return function(n2) {
            var r2 = e2.interactions.list, i2 = dt2(n2), o2 = ht(n2), a2 = o2[0], s2 = o2[1], c2 = [];
            if (/^touch/.test(n2.type)) {
              e2.prevTouchTime = e2.now();
              for (var l2 = 0, u2 = n2.changedTouches; l2 < u2.length; l2++) {
                var p2 = u2[l2], f2 = { pointer: p2, pointerId: at(p2), pointerType: i2, eventType: n2.type, eventTarget: a2, curEventTarget: s2, scope: e2 }, d2 = Ze2(f2);
                c2.push([f2.pointer, f2.eventTarget, f2.curEventTarget, d2]);
              }
            } else {
              var h2 = false;
              if (!I.supportsPointerEvent && /mouse/.test(n2.type)) {
                for (var v2 = 0; v2 < r2.length && !h2; v2++) h2 = "mouse" !== r2[v2].pointerType && r2[v2].pointerIsDown;
                h2 = h2 || e2.now() - e2.prevTouchTime < 500 || 0 === n2.timeStamp;
              }
              if (!h2) {
                var g2 = { pointer: n2, pointerId: at(n2), pointerType: i2, eventType: n2.type, curEventTarget: s2, eventTarget: a2, scope: e2 }, m2 = Ze2(g2);
                c2.push([g2.pointer, g2.eventTarget, g2.curEventTarget, m2]);
              }
            }
            for (var y2 = 0; y2 < c2.length; y2++) {
              var b2 = c2[y2], x2 = b2[0], w2 = b2[1], E2 = b2[2];
              b2[3][t2](x2, n2, w2, E2);
            }
          };
        }
        function Ze2(t2) {
          var e2 = t2.pointerType, n2 = t2.scope, r2 = { interaction: $e.search(t2), searchDetails: t2 };
          return n2.fire("interactions:find", r2), r2.interaction || n2.interactions.new({ pointerType: e2 });
        }
        function tn2(t2, e2) {
          var n2 = t2.doc, r2 = t2.scope, i2 = t2.options, o2 = r2.interactions.docEvents, a2 = r2.events, s2 = a2[e2];
          for (var c2 in r2.browser.isIOS && !i2.events && (i2.events = { passive: false }), a2.delegatedEvents) s2(n2, c2, a2.delegateListener), s2(n2, c2, a2.delegateUseCapture, true);
          for (var l2 = i2 && i2.events, u2 = 0; u2 < o2.length; u2++) {
            var p2 = o2[u2];
            s2(n2, p2.type, p2.listener, l2);
          }
        }
        var en2 = { id: "core/interactions", install: function(t2) {
          for (var e2 = {}, n2 = 0; n2 < Je2.length; n2++) {
            var i2 = Je2[n2];
            e2[i2] = Qe2(i2, t2);
          }
          var a2, c2 = I.pEventTypes;
          function l2() {
            for (var e3 = 0, n3 = t2.interactions.list; e3 < n3.length; e3++) {
              var r2 = n3[e3];
              if (r2.pointerIsDown && "touch" === r2.pointerType && !r2._interacting) for (var i3 = function() {
                var e4 = a3[o2];
                t2.documents.some((function(t3) {
                  return M(t3.doc, e4.downTarget);
                })) || r2.removePointer(e4.pointer, e4.event);
              }, o2 = 0, a3 = r2.pointers; o2 < a3.length; o2++) i3();
            }
          }
          (a2 = k.PointerEvent ? [{ type: c2.down, listener: l2 }, { type: c2.down, listener: e2.pointerDown }, { type: c2.move, listener: e2.pointerMove }, { type: c2.up, listener: e2.pointerUp }, { type: c2.cancel, listener: e2.pointerUp }] : [{ type: "mousedown", listener: e2.pointerDown }, { type: "mousemove", listener: e2.pointerMove }, { type: "mouseup", listener: e2.pointerUp }, { type: "touchstart", listener: l2 }, { type: "touchstart", listener: e2.pointerDown }, { type: "touchmove", listener: e2.pointerMove }, { type: "touchend", listener: e2.pointerUp }, { type: "touchcancel", listener: e2.pointerUp }]).push({ type: "blur", listener: function(e3) {
            for (var n3 = 0, r2 = t2.interactions.list; n3 < r2.length; n3++) {
              r2[n3].documentBlur(e3);
            }
          } }), t2.prevTouchTime = 0, t2.Interaction = (function(e3) {
            s(i3, e3);
            var n3 = p(i3);
            function i3() {
              return r(this, i3), n3.apply(this, arguments);
            }
            return o(i3, [{ key: "pointerMoveTolerance", get: function() {
              return t2.interactions.pointerMoveTolerance;
            }, set: function(e4) {
              t2.interactions.pointerMoveTolerance = e4;
            } }, { key: "_now", value: function() {
              return t2.now();
            } }]), i3;
          })(De2), t2.interactions = { list: [], new: function(e3) {
            e3.scopeFire = function(e4, n4) {
              return t2.fire(e4, n4);
            };
            var n3 = new t2.Interaction(e3);
            return t2.interactions.list.push(n3), n3;
          }, listeners: e2, docEvents: a2, pointerMoveTolerance: 1 }, t2.usePlugin(he2);
        }, listeners: { "scope:add-document": function(t2) {
          return tn2(t2, "add");
        }, "scope:remove-document": function(t2) {
          return tn2(t2, "remove");
        }, "interactable:unset": function(t2, e2) {
          for (var n2 = t2.interactable, r2 = e2.interactions.list.length - 1; r2 >= 0; r2--) {
            var i2 = e2.interactions.list[r2];
            i2.interactable === n2 && (i2.stop(), e2.fire("interactions:destroy", { interaction: i2 }), i2.destroy(), e2.interactions.list.length > 2 && e2.interactions.list.splice(r2, 1));
          }
        } }, onDocSignal: tn2, doOnInteractions: Qe2, methodNames: Je2 }, nn2 = en2, rn2 = (function(t2) {
          return t2[t2.On = 0] = "On", t2[t2.Off = 1] = "Off", t2;
        })(rn2 || {}), on2 = (function() {
          function t2(e2, n2, i2, o2) {
            r(this, t2), this.target = void 0, this.options = void 0, this._actions = void 0, this.events = new Ve2(), this._context = void 0, this._win = void 0, this._doc = void 0, this._scopeEvents = void 0, this._actions = n2.actions, this.target = e2, this._context = n2.context || i2, this._win = y(B(e2) ? this._context : e2), this._doc = this._win.document, this._scopeEvents = o2, this.set(n2);
          }
          return o(t2, [{ key: "_defaults", get: function() {
            return { base: {}, perAction: {}, actions: {} };
          } }, { key: "setOnEvents", value: function(t3, e2) {
            return w.func(e2.onstart) && this.on("".concat(t3, "start"), e2.onstart), w.func(e2.onmove) && this.on("".concat(t3, "move"), e2.onmove), w.func(e2.onend) && this.on("".concat(t3, "end"), e2.onend), w.func(e2.oninertiastart) && this.on("".concat(t3, "inertiastart"), e2.oninertiastart), this;
          } }, { key: "updatePerActionListeners", value: function(t3, e2, n2) {
            var r2, i2 = this, o2 = null == (r2 = this._actions.map[t3]) ? void 0 : r2.filterEventType, a2 = function(t4) {
              return (null == o2 || o2(t4)) && ve2(t4, i2._actions);
            };
            (w.array(e2) || w.object(e2)) && this._onOff(rn2.Off, t3, e2, void 0, a2), (w.array(n2) || w.object(n2)) && this._onOff(rn2.On, t3, n2, void 0, a2);
          } }, { key: "setPerAction", value: function(t3, e2) {
            var n2 = this._defaults;
            for (var r2 in e2) {
              var i2 = r2, o2 = this.options[t3], a2 = e2[i2];
              "listeners" === i2 && this.updatePerActionListeners(t3, o2.listeners, a2), w.array(a2) ? o2[i2] = mt(a2) : w.plainObject(a2) ? (o2[i2] = V(o2[i2] || {}, ge2(a2)), w.object(n2.perAction[i2]) && "enabled" in n2.perAction[i2] && (o2[i2].enabled = false !== a2.enabled)) : w.bool(a2) && w.object(n2.perAction[i2]) ? o2[i2].enabled = a2 : o2[i2] = a2;
            }
          } }, { key: "getRect", value: function(t3) {
            return t3 = t3 || (w.element(this.target) ? this.target : null), w.string(this.target) && (t3 = t3 || this._context.querySelector(this.target)), L(t3);
          } }, { key: "rectChecker", value: function(t3) {
            var e2 = this;
            return w.func(t3) ? (this.getRect = function(n2) {
              var r2 = V({}, t3.call(e2, n2));
              return "width" in r2 || (r2.width = r2.right - r2.left, r2.height = r2.bottom - r2.top), r2;
            }, this) : null === t3 ? (delete this.getRect, this) : this.getRect;
          } }, { key: "_backCompatOption", value: function(t3, e2) {
            if (B(e2) || w.object(e2)) {
              for (var n2 in this.options[t3] = e2, this._actions.map) this.options[n2][t3] = e2;
              return this;
            }
            return this.options[t3];
          } }, { key: "origin", value: function(t3) {
            return this._backCompatOption("origin", t3);
          } }, { key: "deltaSource", value: function(t3) {
            return "page" === t3 || "client" === t3 ? (this.options.deltaSource = t3, this) : this.options.deltaSource;
          } }, { key: "getAllElements", value: function() {
            var t3 = this.target;
            return w.string(t3) ? Array.from(this._context.querySelectorAll(t3)) : w.func(t3) && t3.getAllElements ? t3.getAllElements() : w.element(t3) ? [t3] : [];
          } }, { key: "context", value: function() {
            return this._context;
          } }, { key: "inContext", value: function(t3) {
            return this._context === t3.ownerDocument || M(this._context, t3);
          } }, { key: "testIgnoreAllow", value: function(t3, e2, n2) {
            return !this.testIgnore(t3.ignoreFrom, e2, n2) && this.testAllow(t3.allowFrom, e2, n2);
          } }, { key: "testAllow", value: function(t3, e2, n2) {
            return !t3 || !!w.element(n2) && (w.string(t3) ? F(n2, t3, e2) : !!w.element(t3) && M(t3, n2));
          } }, { key: "testIgnore", value: function(t3, e2, n2) {
            return !(!t3 || !w.element(n2)) && (w.string(t3) ? F(n2, t3, e2) : !!w.element(t3) && M(t3, n2));
          } }, { key: "fire", value: function(t3) {
            return this.events.fire(t3), this;
          } }, { key: "_onOff", value: function(t3, e2, n2, r2, i2) {
            w.object(e2) && !w.array(e2) && (r2 = n2, n2 = null);
            var o2 = $2(e2, n2, i2);
            for (var a2 in o2) {
              "wheel" === a2 && (a2 = I.wheelEvent);
              for (var s2 = 0, c2 = o2[a2]; s2 < c2.length; s2++) {
                var l2 = c2[s2];
                ve2(a2, this._actions) ? this.events[t3 === rn2.On ? "on" : "off"](a2, l2) : w.string(this.target) ? this._scopeEvents[t3 === rn2.On ? "addDelegate" : "removeDelegate"](this.target, this._context, a2, l2, r2) : this._scopeEvents[t3 === rn2.On ? "add" : "remove"](this.target, a2, l2, r2);
              }
            }
            return this;
          } }, { key: "on", value: function(t3, e2, n2) {
            return this._onOff(rn2.On, t3, e2, n2);
          } }, { key: "off", value: function(t3, e2, n2) {
            return this._onOff(rn2.Off, t3, e2, n2);
          } }, { key: "set", value: function(t3) {
            var e2 = this._defaults;
            for (var n2 in w.object(t3) || (t3 = {}), this.options = ge2(e2.base), this._actions.methodDict) {
              var r2 = n2, i2 = this._actions.methodDict[r2];
              this.options[r2] = {}, this.setPerAction(r2, V(V({}, e2.perAction), e2.actions[r2])), this[i2](t3[r2]);
            }
            for (var o2 in t3) "getRect" !== o2 ? w.func(this[o2]) && this[o2](t3[o2]) : this.rectChecker(t3.getRect);
            return this;
          } }, { key: "unset", value: function() {
            if (w.string(this.target)) for (var t3 in this._scopeEvents.delegatedEvents) for (var e2 = this._scopeEvents.delegatedEvents[t3], n2 = e2.length - 1; n2 >= 0; n2--) {
              var r2 = e2[n2], i2 = r2.selector, o2 = r2.context, a2 = r2.listeners;
              i2 === this.target && o2 === this._context && e2.splice(n2, 1);
              for (var s2 = a2.length - 1; s2 >= 0; s2--) this._scopeEvents.removeDelegate(this.target, this._context, t3, a2[s2][0], a2[s2][1]);
            }
            else this._scopeEvents.remove(this.target, "all");
          } }]), t2;
        })(), an2 = (function() {
          function t2(e2) {
            var n2 = this;
            r(this, t2), this.list = [], this.selectorMap = {}, this.scope = void 0, this.scope = e2, e2.addListeners({ "interactable:unset": function(t3) {
              var e3 = t3.interactable, r2 = e3.target, i2 = w.string(r2) ? n2.selectorMap[r2] : r2[n2.scope.id], o2 = yt(i2, (function(t4) {
                return t4 === e3;
              }));
              i2.splice(o2, 1);
            } });
          }
          return o(t2, [{ key: "new", value: function(t3, e2) {
            e2 = V(e2 || {}, { actions: this.scope.actions });
            var n2 = new this.scope.Interactable(t3, e2, this.scope.document, this.scope.events);
            return this.scope.addDocument(n2._doc), this.list.push(n2), w.string(t3) ? (this.selectorMap[t3] || (this.selectorMap[t3] = []), this.selectorMap[t3].push(n2)) : (n2.target[this.scope.id] || Object.defineProperty(t3, this.scope.id, { value: [], configurable: true }), t3[this.scope.id].push(n2)), this.scope.fire("interactable:new", { target: t3, options: e2, interactable: n2, win: this.scope._win }), n2;
          } }, { key: "getExisting", value: function(t3, e2) {
            var n2 = e2 && e2.context || this.scope.document, r2 = w.string(t3), i2 = r2 ? this.selectorMap[t3] : t3[this.scope.id];
            if (i2) return bt(i2, (function(e3) {
              return e3._context === n2 && (r2 || e3.inContext(t3));
            }));
          } }, { key: "forEachMatch", value: function(t3, e2) {
            for (var n2 = 0, r2 = this.list; n2 < r2.length; n2++) {
              var i2 = r2[n2], o2 = void 0;
              if ((w.string(i2.target) ? w.element(t3) && R(t3, i2.target) : t3 === i2.target) && i2.inContext(t3) && (o2 = e2(i2)), void 0 !== o2) return o2;
            }
          } }]), t2;
        })();
        var sn2 = (function() {
          function t2() {
            var e2 = this;
            r(this, t2), this.id = "__interact_scope_".concat(Math.floor(100 * Math.random())), this.isInitialized = false, this.listenerMaps = [], this.browser = I, this.defaults = ge2(Te), this.Eventable = Ve2, this.actions = { map: {}, phases: { start: true, move: true, end: true }, methodDict: {}, phaselessTypes: {} }, this.interactStatic = (function(t3) {
              var e3 = function e4(n3, r2) {
                var i2 = t3.interactables.getExisting(n3, r2);
                return i2 || ((i2 = t3.interactables.new(n3, r2)).events.global = e4.globalEvents), i2;
              };
              return e3.getPointerAverage = lt, e3.getTouchBBox = ut2, e3.getTouchDistance = pt, e3.getTouchAngle = ft2, e3.getElementRect = L, e3.getElementClientRect = Y2, e3.matchesSelector = R, e3.closest = z, e3.globalEvents = {}, e3.version = "1.10.28", e3.scope = t3, e3.use = function(t4, e4) {
                return this.scope.usePlugin(t4, e4), this;
              }, e3.isSet = function(t4, e4) {
                return !!this.scope.interactables.get(t4, e4 && e4.context);
              }, e3.on = Nt2((function(t4, e4, n3) {
                if (w.string(t4) && -1 !== t4.search(" ") && (t4 = t4.trim().split(/ +/)), w.array(t4)) {
                  for (var r2 = 0, i2 = t4; r2 < i2.length; r2++) {
                    var o2 = i2[r2];
                    this.on(o2, e4, n3);
                  }
                  return this;
                }
                if (w.object(t4)) {
                  for (var a2 in t4) this.on(a2, t4[a2], e4);
                  return this;
                }
                return ve2(t4, this.scope.actions) ? this.globalEvents[t4] ? this.globalEvents[t4].push(e4) : this.globalEvents[t4] = [e4] : this.scope.events.add(this.scope.document, t4, e4, { options: n3 }), this;
              }), "The interact.on() method is being deprecated"), e3.off = Nt2((function(t4, e4, n3) {
                if (w.string(t4) && -1 !== t4.search(" ") && (t4 = t4.trim().split(/ +/)), w.array(t4)) {
                  for (var r2 = 0, i2 = t4; r2 < i2.length; r2++) {
                    var o2 = i2[r2];
                    this.off(o2, e4, n3);
                  }
                  return this;
                }
                if (w.object(t4)) {
                  for (var a2 in t4) this.off(a2, t4[a2], e4);
                  return this;
                }
                var s2;
                return ve2(t4, this.scope.actions) ? t4 in this.globalEvents && -1 !== (s2 = this.globalEvents[t4].indexOf(e4)) && this.globalEvents[t4].splice(s2, 1) : this.scope.events.remove(this.scope.document, t4, e4, n3), this;
              }), "The interact.off() method is being deprecated"), e3.debug = function() {
                return this.scope;
              }, e3.supportsTouch = function() {
                return I.supportsTouch;
              }, e3.supportsPointerEvent = function() {
                return I.supportsPointerEvent;
              }, e3.stop = function() {
                for (var t4 = 0, e4 = this.scope.interactions.list; t4 < e4.length; t4++) e4[t4].stop();
                return this;
              }, e3.pointerMoveTolerance = function(t4) {
                return w.number(t4) ? (this.scope.interactions.pointerMoveTolerance = t4, this) : this.scope.interactions.pointerMoveTolerance;
              }, e3.addDocument = function(t4, e4) {
                this.scope.addDocument(t4, e4);
              }, e3.removeDocument = function(t4) {
                this.scope.removeDocument(t4);
              }, e3;
            })(this), this.InteractEvent = Se2, this.Interactable = void 0, this.interactables = new an2(this), this._win = void 0, this.document = void 0, this.window = void 0, this.documents = [], this._plugins = { list: [], map: {} }, this.onWindowUnload = function(t3) {
              return e2.removeDocument(t3.target);
            };
            var n2 = this;
            this.Interactable = (function(t3) {
              s(i2, t3);
              var e3 = p(i2);
              function i2() {
                return r(this, i2), e3.apply(this, arguments);
              }
              return o(i2, [{ key: "_defaults", get: function() {
                return n2.defaults;
              } }, { key: "set", value: function(t4) {
                return f(c(i2.prototype), "set", this).call(this, t4), n2.fire("interactable:set", { options: t4, interactable: this }), this;
              } }, { key: "unset", value: function() {
                f(c(i2.prototype), "unset", this).call(this);
                var t4 = n2.interactables.list.indexOf(this);
                t4 < 0 || (n2.interactables.list.splice(t4, 1), n2.fire("interactable:unset", { interactable: this }));
              } }]), i2;
            })(on2);
          }
          return o(t2, [{ key: "addListeners", value: function(t3, e2) {
            this.listenerMaps.push({ id: e2, map: t3 });
          } }, { key: "fire", value: function(t3, e2) {
            for (var n2 = 0, r2 = this.listenerMaps; n2 < r2.length; n2++) {
              var i2 = r2[n2].map[t3];
              if (i2 && false === i2(e2, this, t3)) return false;
            }
          } }, { key: "init", value: function(t3) {
            return this.isInitialized ? this : (function(t4, e2) {
              t4.isInitialized = true, w.window(e2) && m(e2);
              return k.init(e2), I.init(e2), Lt2.init(e2), t4.window = e2, t4.document = e2.document, t4.usePlugin(nn2), t4.usePlugin(Ue2), t4;
            })(this, t3);
          } }, { key: "pluginIsInstalled", value: function(t3) {
            var e2 = t3.id;
            return e2 ? !!this._plugins.map[e2] : -1 !== this._plugins.list.indexOf(t3);
          } }, { key: "usePlugin", value: function(t3, e2) {
            if (!this.isInitialized) return this;
            if (this.pluginIsInstalled(t3)) return this;
            if (t3.id && (this._plugins.map[t3.id] = t3), this._plugins.list.push(t3), t3.install && t3.install(this, e2), t3.listeners && t3.before) {
              for (var n2 = 0, r2 = this.listenerMaps.length, i2 = t3.before.reduce((function(t4, e3) {
                return t4[e3] = true, t4[cn2(e3)] = true, t4;
              }), {}); n2 < r2; n2++) {
                var o2 = this.listenerMaps[n2].id;
                if (o2 && (i2[o2] || i2[cn2(o2)])) break;
              }
              this.listenerMaps.splice(n2, 0, { id: t3.id, map: t3.listeners });
            } else t3.listeners && this.listenerMaps.push({ id: t3.id, map: t3.listeners });
            return this;
          } }, { key: "addDocument", value: function(t3, e2) {
            if (-1 !== this.getDocIndex(t3)) return false;
            var n2 = y(t3);
            e2 = e2 ? V({}, e2) : {}, this.documents.push({ doc: t3, options: e2 }), this.events.documents.push(t3), t3 !== this.document && this.events.add(n2, "unload", this.onWindowUnload), this.fire("scope:add-document", { doc: t3, window: n2, scope: this, options: e2 });
          } }, { key: "removeDocument", value: function(t3) {
            var e2 = this.getDocIndex(t3), n2 = y(t3), r2 = this.documents[e2].options;
            this.events.remove(n2, "unload", this.onWindowUnload), this.documents.splice(e2, 1), this.events.documents.splice(e2, 1), this.fire("scope:remove-document", { doc: t3, window: n2, scope: this, options: r2 });
          } }, { key: "getDocIndex", value: function(t3) {
            for (var e2 = 0; e2 < this.documents.length; e2++) if (this.documents[e2].doc === t3) return e2;
            return -1;
          } }, { key: "getDocOptions", value: function(t3) {
            var e2 = this.getDocIndex(t3);
            return -1 === e2 ? null : this.documents[e2].options;
          } }, { key: "now", value: function() {
            return (this.window.Date || Date).now();
          } }]), t2;
        })();
        function cn2(t2) {
          return t2 && t2.replace(/\/.*$/, "");
        }
        var ln2 = new sn2(), un2 = ln2.interactStatic, pn = "undefined" != typeof globalThis ? globalThis : window;
        ln2.init(pn);
        var fn2 = Object.freeze({ __proto__: null, edgeTarget: function() {
        }, elements: function() {
        }, grid: function(t2) {
          var e2 = [["x", "y"], ["left", "top"], ["right", "bottom"], ["width", "height"]].filter((function(e3) {
            var n3 = e3[0], r2 = e3[1];
            return n3 in t2 || r2 in t2;
          })), n2 = function(n3, r2) {
            for (var i2 = t2.range, o2 = t2.limits, a2 = void 0 === o2 ? { left: -1 / 0, right: 1 / 0, top: -1 / 0, bottom: 1 / 0 } : o2, s2 = t2.offset, c2 = void 0 === s2 ? { x: 0, y: 0 } : s2, l2 = { range: i2, grid: t2, x: null, y: null }, u2 = 0; u2 < e2.length; u2++) {
              var p2 = e2[u2], f2 = p2[0], d2 = p2[1], h2 = Math.round((n3 - c2.x) / t2[f2]), v2 = Math.round((r2 - c2.y) / t2[d2]);
              l2[f2] = Math.max(a2.left, Math.min(a2.right, h2 * t2[f2] + c2.x)), l2[d2] = Math.max(a2.top, Math.min(a2.bottom, v2 * t2[d2] + c2.y));
            }
            return l2;
          };
          return n2.grid = t2, n2.coordFields = e2, n2;
        } }), dn = { id: "snappers", install: function(t2) {
          var e2 = t2.interactStatic;
          e2.snappers = V(e2.snappers || {}, fn2), e2.createSnapGrid = e2.snappers.grid;
        } }, hn2 = dn, vn2 = { start: function(t2) {
          var n2 = t2.state, r2 = t2.rect, i2 = t2.edges, o2 = t2.pageCoords, a2 = n2.options, s2 = a2.ratio, c2 = a2.enabled, l2 = n2.options, u2 = l2.equalDelta, p2 = l2.modifiers;
          "preserve" === s2 && (s2 = r2.width / r2.height), n2.startCoords = V({}, o2), n2.startRect = V({}, r2), n2.ratio = s2, n2.equalDelta = u2;
          var f2 = n2.linkedEdges = { top: i2.top || i2.left && !i2.bottom, left: i2.left || i2.top && !i2.right, bottom: i2.bottom || i2.right && !i2.top, right: i2.right || i2.bottom && !i2.left };
          if (n2.xIsPrimaryAxis = !(!i2.left && !i2.right), n2.equalDelta) {
            var d2 = (f2.left ? 1 : -1) * (f2.top ? 1 : -1);
            n2.edgeSign = { x: d2, y: d2 };
          } else n2.edgeSign = { x: f2.left ? -1 : 1, y: f2.top ? -1 : 1 };
          if (false !== c2 && V(i2, f2), null != p2 && p2.length) {
            var h2 = new me(t2.interaction);
            h2.copyFrom(t2.interaction.modification), h2.prepareStates(p2), n2.subModification = h2, h2.startAll(e({}, t2));
          }
        }, set: function(t2) {
          var n2 = t2.state, r2 = t2.rect, i2 = t2.coords, o2 = n2.linkedEdges, a2 = V({}, i2), s2 = n2.equalDelta ? gn2 : mn2;
          if (V(t2.edges, o2), s2(n2, n2.xIsPrimaryAxis, i2, r2), !n2.subModification) return null;
          var c2 = V({}, r2);
          H2(o2, c2, { x: i2.x - a2.x, y: i2.y - a2.y });
          var l2 = n2.subModification.setAll(e(e({}, t2), {}, { rect: c2, edges: o2, pageCoords: i2, prevCoords: i2, prevRect: c2 })), u2 = l2.delta;
          l2.changed && (s2(n2, Math.abs(u2.x) > Math.abs(u2.y), l2.coords, l2.rect), V(i2, l2.coords));
          return l2.eventProps;
        }, defaults: { ratio: "preserve", equalDelta: false, modifiers: [], enabled: false } };
        function gn2(t2, e2, n2) {
          var r2 = t2.startCoords, i2 = t2.edgeSign;
          e2 ? n2.y = r2.y + (n2.x - r2.x) * i2.y : n2.x = r2.x + (n2.y - r2.y) * i2.x;
        }
        function mn2(t2, e2, n2, r2) {
          var i2 = t2.startRect, o2 = t2.startCoords, a2 = t2.ratio, s2 = t2.edgeSign;
          if (e2) {
            var c2 = r2.width / a2;
            n2.y = o2.y + (c2 - i2.height) * s2.y;
          } else {
            var l2 = r2.height * a2;
            n2.x = o2.x + (l2 - i2.width) * s2.x;
          }
        }
        var yn2 = be2(vn2, "aspectRatio"), bn2 = function() {
        };
        bn2._defaults = {};
        var xn2 = bn2;
        function wn2(t2, e2, n2) {
          return w.func(t2) ? G(t2, e2.interactable, e2.element, [n2.x, n2.y, e2]) : G(t2, e2.interactable, e2.element);
        }
        var En2 = { start: function(t2) {
          var e2 = t2.rect, n2 = t2.startOffset, r2 = t2.state, i2 = t2.interaction, o2 = t2.pageCoords, a2 = r2.options, s2 = a2.elementRect, c2 = V({ left: 0, top: 0, right: 0, bottom: 0 }, a2.offset || {});
          if (e2 && s2) {
            var l2 = wn2(a2.restriction, i2, o2);
            if (l2) {
              var u2 = l2.right - l2.left - e2.width, p2 = l2.bottom - l2.top - e2.height;
              u2 < 0 && (c2.left += u2, c2.right += u2), p2 < 0 && (c2.top += p2, c2.bottom += p2);
            }
            c2.left += n2.left - e2.width * s2.left, c2.top += n2.top - e2.height * s2.top, c2.right += n2.right - e2.width * (1 - s2.right), c2.bottom += n2.bottom - e2.height * (1 - s2.bottom);
          }
          r2.offset = c2;
        }, set: function(t2) {
          var e2 = t2.coords, n2 = t2.interaction, r2 = t2.state, i2 = r2.options, o2 = r2.offset, a2 = wn2(i2.restriction, n2, e2);
          if (a2) {
            var s2 = (function(t3) {
              return !t3 || "left" in t3 && "top" in t3 || ((t3 = V({}, t3)).left = t3.x || 0, t3.top = t3.y || 0, t3.right = t3.right || t3.left + t3.width, t3.bottom = t3.bottom || t3.top + t3.height), t3;
            })(a2);
            e2.x = Math.max(Math.min(s2.right - o2.right, e2.x), s2.left + o2.left), e2.y = Math.max(Math.min(s2.bottom - o2.bottom, e2.y), s2.top + o2.top);
          }
        }, defaults: { restriction: null, elementRect: null, offset: null, endOnly: false, enabled: false } }, Tn2 = be2(En2, "restrict"), Sn2 = { top: 1 / 0, left: 1 / 0, bottom: -1 / 0, right: -1 / 0 }, _n2 = { top: -1 / 0, left: -1 / 0, bottom: 1 / 0, right: 1 / 0 };
        function Pn2(t2, e2) {
          for (var n2 = 0, r2 = ["top", "left", "bottom", "right"]; n2 < r2.length; n2++) {
            var i2 = r2[n2];
            i2 in t2 || (t2[i2] = e2[i2]);
          }
          return t2;
        }
        var On2 = { noInner: Sn2, noOuter: _n2, start: function(t2) {
          var e2, n2 = t2.interaction, r2 = t2.startOffset, i2 = t2.state, o2 = i2.options;
          o2 && (e2 = N(wn2(o2.offset, n2, n2.coords.start.page))), e2 = e2 || { x: 0, y: 0 }, i2.offset = { top: e2.y + r2.top, left: e2.x + r2.left, bottom: e2.y - r2.bottom, right: e2.x - r2.right };
        }, set: function(t2) {
          var e2 = t2.coords, n2 = t2.edges, r2 = t2.interaction, i2 = t2.state, o2 = i2.offset, a2 = i2.options;
          if (n2) {
            var s2 = V({}, e2), c2 = wn2(a2.inner, r2, s2) || {}, l2 = wn2(a2.outer, r2, s2) || {};
            Pn2(c2, Sn2), Pn2(l2, _n2), n2.top ? e2.y = Math.min(Math.max(l2.top + o2.top, s2.y), c2.top + o2.top) : n2.bottom && (e2.y = Math.max(Math.min(l2.bottom + o2.bottom, s2.y), c2.bottom + o2.bottom)), n2.left ? e2.x = Math.min(Math.max(l2.left + o2.left, s2.x), c2.left + o2.left) : n2.right && (e2.x = Math.max(Math.min(l2.right + o2.right, s2.x), c2.right + o2.right));
          }
        }, defaults: { inner: null, outer: null, offset: null, endOnly: false, enabled: false } }, kn2 = be2(On2, "restrictEdges"), Dn2 = V({ get elementRect() {
          return { top: 0, left: 0, bottom: 1, right: 1 };
        }, set elementRect(t2) {
        } }, En2.defaults), In2 = be2({ start: En2.start, set: En2.set, defaults: Dn2 }, "restrictRect"), Mn2 = { width: -1 / 0, height: -1 / 0 }, zn = { width: 1 / 0, height: 1 / 0 };
        var An2 = be2({ start: function(t2) {
          return On2.start(t2);
        }, set: function(t2) {
          var e2 = t2.interaction, n2 = t2.state, r2 = t2.rect, i2 = t2.edges, o2 = n2.options;
          if (i2) {
            var a2 = U(wn2(o2.min, e2, t2.coords)) || Mn2, s2 = U(wn2(o2.max, e2, t2.coords)) || zn;
            n2.options = { endOnly: o2.endOnly, inner: V({}, On2.noInner), outer: V({}, On2.noOuter) }, i2.top ? (n2.options.inner.top = r2.bottom - a2.height, n2.options.outer.top = r2.bottom - s2.height) : i2.bottom && (n2.options.inner.bottom = r2.top + a2.height, n2.options.outer.bottom = r2.top + s2.height), i2.left ? (n2.options.inner.left = r2.right - a2.width, n2.options.outer.left = r2.right - s2.width) : i2.right && (n2.options.inner.right = r2.left + a2.width, n2.options.outer.right = r2.left + s2.width), On2.set(t2), n2.options = o2;
          }
        }, defaults: { min: null, max: null, endOnly: false, enabled: false } }, "restrictSize");
        var Rn2 = { start: function(t2) {
          var e2, n2 = t2.interaction, r2 = t2.interactable, i2 = t2.element, o2 = t2.rect, a2 = t2.state, s2 = t2.startOffset, c2 = a2.options, l2 = c2.offsetWithOrigin ? (function(t3) {
            var e3 = t3.interaction.element, n3 = N(G(t3.state.options.origin, null, null, [e3])), r3 = n3 || K(t3.interactable, e3, t3.interaction.prepared.name);
            return r3;
          })(t2) : { x: 0, y: 0 };
          if ("startCoords" === c2.offset) e2 = { x: n2.coords.start.page.x, y: n2.coords.start.page.y };
          else {
            var u2 = G(c2.offset, r2, i2, [n2]);
            (e2 = N(u2) || { x: 0, y: 0 }).x += l2.x, e2.y += l2.y;
          }
          var p2 = c2.relativePoints;
          a2.offsets = o2 && p2 && p2.length ? p2.map((function(t3, n3) {
            return { index: n3, relativePoint: t3, x: s2.left - o2.width * t3.x + e2.x, y: s2.top - o2.height * t3.y + e2.y };
          })) : [{ index: 0, relativePoint: null, x: e2.x, y: e2.y }];
        }, set: function(t2) {
          var e2 = t2.interaction, n2 = t2.coords, r2 = t2.state, i2 = r2.options, o2 = r2.offsets, a2 = K(e2.interactable, e2.element, e2.prepared.name), s2 = V({}, n2), c2 = [];
          i2.offsetWithOrigin || (s2.x -= a2.x, s2.y -= a2.y);
          for (var l2 = 0, u2 = o2; l2 < u2.length; l2++) for (var p2 = u2[l2], f2 = s2.x - p2.x, d2 = s2.y - p2.y, h2 = 0, v2 = i2.targets.length; h2 < v2; h2++) {
            var g2 = i2.targets[h2], m2 = void 0;
            (m2 = w.func(g2) ? g2(f2, d2, e2._proxy, p2, h2) : g2) && c2.push({ x: (w.number(m2.x) ? m2.x : f2) + p2.x, y: (w.number(m2.y) ? m2.y : d2) + p2.y, range: w.number(m2.range) ? m2.range : i2.range, source: g2, index: h2, offset: p2 });
          }
          for (var y2 = { target: null, inRange: false, distance: 0, range: 0, delta: { x: 0, y: 0 } }, b2 = 0; b2 < c2.length; b2++) {
            var x2 = c2[b2], E2 = x2.range, T2 = x2.x - s2.x, S2 = x2.y - s2.y, _2 = Q(T2, S2), P2 = _2 <= E2;
            E2 === 1 / 0 && y2.inRange && y2.range !== 1 / 0 && (P2 = false), y2.target && !(P2 ? y2.inRange && E2 !== 1 / 0 ? _2 / E2 < y2.distance / y2.range : E2 === 1 / 0 && y2.range !== 1 / 0 || _2 < y2.distance : !y2.inRange && _2 < y2.distance) || (y2.target = x2, y2.distance = _2, y2.range = E2, y2.inRange = P2, y2.delta.x = T2, y2.delta.y = S2);
          }
          return y2.inRange && (n2.x = y2.target.x, n2.y = y2.target.y), r2.closest = y2, y2;
        }, defaults: { range: 1 / 0, targets: null, offset: null, offsetWithOrigin: true, origin: null, relativePoints: null, endOnly: false, enabled: false } }, Cn2 = be2(Rn2, "snap");
        var jn2 = { start: function(t2) {
          var e2 = t2.state, n2 = t2.edges, r2 = e2.options;
          if (!n2) return null;
          t2.state = { options: { targets: null, relativePoints: [{ x: n2.left ? 0 : 1, y: n2.top ? 0 : 1 }], offset: r2.offset || "self", origin: { x: 0, y: 0 }, range: r2.range } }, e2.targetFields = e2.targetFields || [["width", "height"], ["x", "y"]], Rn2.start(t2), e2.offsets = t2.state.offsets, t2.state = e2;
        }, set: function(t2) {
          var e2 = t2.interaction, n2 = t2.state, r2 = t2.coords, i2 = n2.options, o2 = n2.offsets, a2 = { x: r2.x - o2[0].x, y: r2.y - o2[0].y };
          n2.options = V({}, i2), n2.options.targets = [];
          for (var s2 = 0, c2 = i2.targets || []; s2 < c2.length; s2++) {
            var l2 = c2[s2], u2 = void 0;
            if (u2 = w.func(l2) ? l2(a2.x, a2.y, e2) : l2) {
              for (var p2 = 0, f2 = n2.targetFields; p2 < f2.length; p2++) {
                var d2 = f2[p2], h2 = d2[0], v2 = d2[1];
                if (h2 in u2 || v2 in u2) {
                  u2.x = u2[h2], u2.y = u2[v2];
                  break;
                }
              }
              n2.options.targets.push(u2);
            }
          }
          var g2 = Rn2.set(t2);
          return n2.options = i2, g2;
        }, defaults: { range: 1 / 0, targets: null, offset: null, endOnly: false, enabled: false } }, Fn2 = be2(jn2, "snapSize");
        var Xn2 = { aspectRatio: yn2, restrictEdges: kn2, restrict: Tn2, restrictRect: In2, restrictSize: An2, snapEdges: be2({ start: function(t2) {
          var e2 = t2.edges;
          return e2 ? (t2.state.targetFields = t2.state.targetFields || [[e2.left ? "left" : "right", e2.top ? "top" : "bottom"]], jn2.start(t2)) : null;
        }, set: jn2.set, defaults: V(ge2(jn2.defaults), { targets: void 0, range: void 0, offset: { x: 0, y: 0 } }) }, "snapEdges"), snap: Cn2, snapSize: Fn2, spring: xn2, avoid: xn2, transform: xn2, rubberband: xn2 }, Yn2 = { id: "modifiers", install: function(t2) {
          var e2 = t2.interactStatic;
          for (var n2 in t2.usePlugin(Ee2), t2.usePlugin(hn2), e2.modifiers = Xn2, Xn2) {
            var r2 = Xn2[n2], i2 = r2._defaults, o2 = r2._methods;
            i2._methods = o2, t2.defaults.perAction[n2] = i2;
          }
        } }, Ln2 = Yn2, qn2 = (function(t2) {
          s(n2, t2);
          var e2 = p(n2);
          function n2(t3, i2, o2, a2, s2, c2) {
            var l2;
            if (r(this, n2), tt2(u(l2 = e2.call(this, s2)), o2), o2 !== i2 && tt2(u(l2), i2), l2.timeStamp = c2, l2.originalEvent = o2, l2.type = t3, l2.pointerId = at(i2), l2.pointerType = dt2(i2), l2.target = a2, l2.currentTarget = null, "tap" === t3) {
              var p2 = s2.getPointerIndex(i2);
              l2.dt = l2.timeStamp - s2.pointers[p2].downTime;
              var f2 = l2.timeStamp - s2.tapTime;
              l2.double = !!s2.prevTap && "doubletap" !== s2.prevTap.type && s2.prevTap.target === l2.target && f2 < 500;
            } else "doubletap" === t3 && (l2.dt = i2.timeStamp - s2.tapTime, l2.double = true);
            return l2;
          }
          return o(n2, [{ key: "_subtractOrigin", value: function(t3) {
            var e3 = t3.x, n3 = t3.y;
            return this.pageX -= e3, this.pageY -= n3, this.clientX -= e3, this.clientY -= n3, this;
          } }, { key: "_addOrigin", value: function(t3) {
            var e3 = t3.x, n3 = t3.y;
            return this.pageX += e3, this.pageY += n3, this.clientX += e3, this.clientY += n3, this;
          } }, { key: "preventDefault", value: function() {
            this.originalEvent.preventDefault();
          } }]), n2;
        })(vt2), Bn2 = { id: "pointer-events/base", before: ["inertia", "modifiers", "auto-start", "actions"], install: function(t2) {
          t2.pointerEvents = Bn2, t2.defaults.actions.pointerEvents = Bn2.defaults, V(t2.actions.phaselessTypes, Bn2.types);
        }, listeners: { "interactions:new": function(t2) {
          var e2 = t2.interaction;
          e2.prevTap = null, e2.tapTime = 0;
        }, "interactions:update-pointer": function(t2) {
          var e2 = t2.down, n2 = t2.pointerInfo;
          if (!e2 && n2.hold) return;
          n2.hold = { duration: 1 / 0, timeout: null };
        }, "interactions:move": function(t2, e2) {
          var n2 = t2.interaction, r2 = t2.pointer, i2 = t2.event, o2 = t2.eventTarget;
          t2.duplicate || n2.pointerIsDown && !n2.pointerWasMoved || (n2.pointerIsDown && Gn2(t2), Vn2({ interaction: n2, pointer: r2, event: i2, eventTarget: o2, type: "move" }, e2));
        }, "interactions:down": function(t2, e2) {
          !(function(t3, e3) {
            for (var n2 = t3.interaction, r2 = t3.pointer, i2 = t3.event, o2 = t3.eventTarget, a2 = t3.pointerIndex, s2 = n2.pointers[a2].hold, c2 = q(o2), l2 = { interaction: n2, pointer: r2, event: i2, eventTarget: o2, type: "hold", targets: [], path: c2, node: null }, u2 = 0; u2 < c2.length; u2++) {
              var p2 = c2[u2];
              l2.node = p2, e3.fire("pointerEvents:collect-targets", l2);
            }
            if (!l2.targets.length) return;
            for (var f2 = 1 / 0, d2 = 0, h2 = l2.targets; d2 < h2.length; d2++) {
              var v2 = h2[d2].eventable.options.holdDuration;
              v2 < f2 && (f2 = v2);
            }
            s2.duration = f2, s2.timeout = setTimeout((function() {
              Vn2({ interaction: n2, eventTarget: o2, pointer: r2, event: i2, type: "hold" }, e3);
            }), f2);
          })(t2, e2), Vn2(t2, e2);
        }, "interactions:up": function(t2, e2) {
          Gn2(t2), Vn2(t2, e2), (function(t3, e3) {
            var n2 = t3.interaction, r2 = t3.pointer, i2 = t3.event, o2 = t3.eventTarget;
            n2.pointerWasMoved || Vn2({ interaction: n2, eventTarget: o2, pointer: r2, event: i2, type: "tap" }, e3);
          })(t2, e2);
        }, "interactions:cancel": function(t2, e2) {
          Gn2(t2), Vn2(t2, e2);
        } }, PointerEvent: qn2, fire: Vn2, collectEventTargets: Wn2, defaults: { holdDuration: 600, ignoreFrom: null, allowFrom: null, origin: { x: 0, y: 0 } }, types: { down: true, move: true, up: true, cancel: true, tap: true, doubletap: true, hold: true } };
        function Vn2(t2, e2) {
          var n2 = t2.interaction, r2 = t2.pointer, i2 = t2.event, o2 = t2.eventTarget, a2 = t2.type, s2 = t2.targets, c2 = void 0 === s2 ? Wn2(t2, e2) : s2, l2 = new qn2(a2, r2, i2, o2, n2, e2.now());
          e2.fire("pointerEvents:new", { pointerEvent: l2 });
          for (var u2 = { interaction: n2, pointer: r2, event: i2, eventTarget: o2, targets: c2, type: a2, pointerEvent: l2 }, p2 = 0; p2 < c2.length; p2++) {
            var f2 = c2[p2];
            for (var d2 in f2.props || {}) l2[d2] = f2.props[d2];
            var h2 = K(f2.eventable, f2.node);
            if (l2._subtractOrigin(h2), l2.eventable = f2.eventable, l2.currentTarget = f2.node, f2.eventable.fire(l2), l2._addOrigin(h2), l2.immediatePropagationStopped || l2.propagationStopped && p2 + 1 < c2.length && c2[p2 + 1].node !== l2.currentTarget) break;
          }
          if (e2.fire("pointerEvents:fired", u2), "tap" === a2) {
            var v2 = l2.double ? Vn2({ interaction: n2, pointer: r2, event: i2, eventTarget: o2, type: "doubletap" }, e2) : l2;
            n2.prevTap = v2, n2.tapTime = v2.timeStamp;
          }
          return l2;
        }
        function Wn2(t2, e2) {
          var n2 = t2.interaction, r2 = t2.pointer, i2 = t2.event, o2 = t2.eventTarget, a2 = t2.type, s2 = n2.getPointerIndex(r2), c2 = n2.pointers[s2];
          if ("tap" === a2 && (n2.pointerWasMoved || !c2 || c2.downTarget !== o2)) return [];
          for (var l2 = q(o2), u2 = { interaction: n2, pointer: r2, event: i2, eventTarget: o2, type: a2, path: l2, targets: [], node: null }, p2 = 0; p2 < l2.length; p2++) {
            var f2 = l2[p2];
            u2.node = f2, e2.fire("pointerEvents:collect-targets", u2);
          }
          return "hold" === a2 && (u2.targets = u2.targets.filter((function(t3) {
            var e3, r3;
            return t3.eventable.options.holdDuration === (null == (e3 = n2.pointers[s2]) || null == (r3 = e3.hold) ? void 0 : r3.duration);
          }))), u2.targets;
        }
        function Gn2(t2) {
          var e2 = t2.interaction, n2 = t2.pointerIndex, r2 = e2.pointers[n2].hold;
          r2 && r2.timeout && (clearTimeout(r2.timeout), r2.timeout = null);
        }
        var Nn2 = Object.freeze({ __proto__: null, default: Bn2 });
        function Un(t2) {
          var e2 = t2.interaction;
          e2.holdIntervalHandle && (clearInterval(e2.holdIntervalHandle), e2.holdIntervalHandle = null);
        }
        var Hn = { id: "pointer-events/holdRepeat", install: function(t2) {
          t2.usePlugin(Bn2);
          var e2 = t2.pointerEvents;
          e2.defaults.holdRepeatInterval = 0, e2.types.holdrepeat = t2.actions.phaselessTypes.holdrepeat = true;
        }, listeners: ["move", "up", "cancel", "endall"].reduce((function(t2, e2) {
          return t2["pointerEvents:".concat(e2)] = Un, t2;
        }), { "pointerEvents:new": function(t2) {
          var e2 = t2.pointerEvent;
          "hold" === e2.type && (e2.count = (e2.count || 0) + 1);
        }, "pointerEvents:fired": function(t2, e2) {
          var n2 = t2.interaction, r2 = t2.pointerEvent, i2 = t2.eventTarget, o2 = t2.targets;
          if ("hold" === r2.type && o2.length) {
            var a2 = o2[0].eventable.options.holdRepeatInterval;
            a2 <= 0 || (n2.holdIntervalHandle = setTimeout((function() {
              e2.pointerEvents.fire({ interaction: n2, eventTarget: i2, type: "hold", pointer: r2, event: r2 }, e2);
            }), a2));
          }
        } }) }, Kn2 = Hn;
        var $n2 = { id: "pointer-events/interactableTargets", install: function(t2) {
          var e2 = t2.Interactable;
          e2.prototype.pointerEvents = function(t3) {
            return V(this.events.options, t3), this;
          };
          var n2 = e2.prototype._backCompatOption;
          e2.prototype._backCompatOption = function(t3, e3) {
            var r2 = n2.call(this, t3, e3);
            return r2 === this && (this.events.options[t3] = e3), r2;
          };
        }, listeners: { "pointerEvents:collect-targets": function(t2, e2) {
          var n2 = t2.targets, r2 = t2.node, i2 = t2.type, o2 = t2.eventTarget;
          e2.interactables.forEachMatch(r2, (function(t3) {
            var e3 = t3.events, a2 = e3.options;
            e3.types[i2] && e3.types[i2].length && t3.testIgnoreAllow(a2, r2, o2) && n2.push({ node: r2, eventable: e3, props: { interactable: t3 } });
          }));
        }, "interactable:new": function(t2) {
          var e2 = t2.interactable;
          e2.events.getRect = function(t3) {
            return e2.getRect(t3);
          };
        }, "interactable:set": function(t2, e2) {
          var n2 = t2.interactable, r2 = t2.options;
          V(n2.events.options, e2.pointerEvents.defaults), V(n2.events.options, r2.pointerEvents || {});
        } } }, Jn2 = $n2, Qn2 = { id: "pointer-events", install: function(t2) {
          t2.usePlugin(Nn2), t2.usePlugin(Kn2), t2.usePlugin(Jn2);
        } }, Zn2 = Qn2;
        var tr2 = { id: "reflow", install: function(t2) {
          var e2 = t2.Interactable;
          t2.actions.phases.reflow = true, e2.prototype.reflow = function(e3) {
            return (function(t3, e4, n2) {
              for (var r2 = t3.getAllElements(), i2 = n2.window.Promise, o2 = i2 ? [] : null, a2 = function() {
                var a3 = r2[s2], c2 = t3.getRect(a3);
                if (!c2) return 1;
                var l2, u2 = bt(n2.interactions.list, (function(n3) {
                  return n3.interacting() && n3.interactable === t3 && n3.element === a3 && n3.prepared.name === e4.name;
                }));
                if (u2) u2.move(), o2 && (l2 = u2._reflowPromise || new i2((function(t4) {
                  u2._reflowResolve = t4;
                })));
                else {
                  var p2 = U(c2), f2 = /* @__PURE__ */ (function(t4) {
                    return { coords: t4, get page() {
                      return this.coords.page;
                    }, get client() {
                      return this.coords.client;
                    }, get timeStamp() {
                      return this.coords.timeStamp;
                    }, get pageX() {
                      return this.coords.page.x;
                    }, get pageY() {
                      return this.coords.page.y;
                    }, get clientX() {
                      return this.coords.client.x;
                    }, get clientY() {
                      return this.coords.client.y;
                    }, get pointerId() {
                      return this.coords.pointerId;
                    }, get target() {
                      return this.coords.target;
                    }, get type() {
                      return this.coords.type;
                    }, get pointerType() {
                      return this.coords.pointerType;
                    }, get buttons() {
                      return this.coords.buttons;
                    }, preventDefault: function() {
                    } };
                  })({ page: { x: p2.x, y: p2.y }, client: { x: p2.x, y: p2.y }, timeStamp: n2.now() });
                  l2 = (function(t4, e5, n3, r3, i3) {
                    var o3 = t4.interactions.new({ pointerType: "reflow" }), a4 = { interaction: o3, event: i3, pointer: i3, eventTarget: n3, phase: "reflow" };
                    o3.interactable = e5, o3.element = n3, o3.prevEvent = i3, o3.updatePointer(i3, i3, n3, true), nt2(o3.coords.delta), Ut2(o3.prepared, r3), o3._doPhase(a4);
                    var s3 = t4.window, c3 = s3.Promise, l3 = c3 ? new c3((function(t5) {
                      o3._reflowResolve = t5;
                    })) : void 0;
                    o3._reflowPromise = l3, o3.start(r3, e5, n3), o3._interacting ? (o3.move(a4), o3.end(i3)) : (o3.stop(), o3._reflowResolve());
                    return o3.removePointer(i3, i3), l3;
                  })(n2, t3, a3, e4, f2);
                }
                o2 && o2.push(l2);
              }, s2 = 0; s2 < r2.length && !a2(); s2++) ;
              return o2 && i2.all(o2).then((function() {
                return t3;
              }));
            })(this, e3, t2);
          };
        }, listeners: { "interactions:stop": function(t2, e2) {
          var n2 = t2.interaction;
          "reflow" === n2.pointerType && (n2._reflowResolve && n2._reflowResolve(), (function(t3, e3) {
            t3.splice(t3.indexOf(e3), 1);
          })(e2.interactions.list, n2));
        } } }, er2 = tr2;
        if (un2.use(he2), un2.use(Ce2), un2.use(Zn2), un2.use(qe2), un2.use(Ln2), un2.use(pe2), un2.use(Xt2), un2.use(Gt), un2.use(er2), un2.default = un2, "object" === ("undefined" == typeof module ? "undefined" : n(module)) && module) try {
          module.exports = un2;
        } catch (t2) {
        }
        return un2.default = un2, un2;
      }));
    }
  });

  // assets/admin/js/builder/resize.js
  var require_resize = __commonJS({
    "assets/admin/js/builder/resize.js"() {
      var import_interactjs = __toESM(require_interact_min());
      var $ruler = $(".pb-ruler");
      var $resize = $(".pb-resize");
      var drwidth = 0;
      (0, import_interactjs.default)($resize[0]).resizable({
        edges: {
          left: ".resize-left",
          right: ".resize-right"
        }
      }).on("resizemove", function(event) {
        const target = event.target;
        drwidth += event.deltaRect.width;
        target.style.width = event.rect.width + drwidth + "px";
        $resize.removeClass("ease");
        $resize.find("> iframe").css("pointer-events", "none");
      }).on("resizeend", function() {
        drwidth = 0;
        $resize.addClass("ease");
        $resize.find("> iframe").css("pointer-events", "");
      });
      var sizes = [
        { selector: "fluid", size: "fluid", width: "100%" },
        { selector: "xxl", size: "xxl", width: "1536" },
        { selector: "xl", size: "xl", width: "1280" },
        { selector: "lg", size: "lg", width: "1024" },
        { selector: "md", size: "md", width: "768" },
        { selector: "sm", size: "sm", width: "640" },
        { selector: "xs", size: "", width: "360" }
      ];
      sizes.forEach(({ selector, size, width }) => {
        $ruler.on(
          "click",
          `>.${selector}>.left,>.${selector}>.right`,
          function() {
            resize(this, size, width);
          }
        );
      });
      var savedWidth = sessionStorage.getItem("ruler-width");
      if (savedWidth) {
        const rulerSize = sessionStorage.getItem("ruler-size");
        const $rulerSize = $ruler.find(">." + (rulerSize || "xs"));
        const $rulerLeft = $rulerSize.find(">.left");
        const rulerWidth = $rulerSize.width();
        resize($rulerLeft[0], rulerSize, rulerWidth, 300);
      } else {
        resize($ruler.find(">.xs>.left")[0], "", "360");
      }
      function resize(el2, size, width, delay = 400) {
        sessionStorage.setItem("ruler-size", size);
        sessionStorage.setItem("ruler-width", width);
        $resize.width(width);
        $(el2).parent().siblings().removeClass("active");
        setTimeout(() => {
          $(el2).parent().addClass("active");
          $ruler.addClass("active");
          updateRulerSizeText();
        }, delay);
      }
      function updateRulerSizeText() {
        const width = $resize.width().toString();
        sessionStorage.setItem("ruler-width", width);
        $ruler.find(">.xs>.size").text(
          width + " x " + $resize.height()
        );
      }
    }
  });

  // assets/admin/js/builder.js
  var require_builder = __commonJS({
    "assets/admin/js/builder.js"() {
      var import_layer = __toESM(require_layer());
      var import_resize = __toESM(require_resize());
    }
  });
  require_builder();
})();
