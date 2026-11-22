(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __esm = (fn2, res, err) => function __init() {
    if (err) throw err[0];
    try {
      return fn2 && (res = (0, fn2[__getOwnPropNames(fn2)[0]])(fn2 = 0)), res;
    } catch (e2) {
      throw err = [e2], e2;
    }
  };
  var __commonJS = (cb, mod) => function __require() {
    try {
      return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    } catch (e2) {
      throw mod = 0, e2;
    }
  };

  // node_modules/@zumer/snapdom/dist/snapdom.mjs
  function Xi(t2) {
    return t2 === false || typeof t2 == "string" && t2.toLowerCase().trim() === "disabled" ? "disabled" : "soft";
  }
  function Yi(t2 = "soft") {
    t2 === "disabled" && (j.computedStyle = /* @__PURE__ */ new WeakMap(), j.measureHints = /* @__PURE__ */ new WeakMap(), j.baseStyle = new gt(50), j.defaultStyle = new gt(64), j.image = new gt(100), j.background = new gt(100), j.resource = new gt(150), j.compress = new gt(50));
  }
  function ge(t2) {
    let e2 = t2.match(/url\((['"]?)(.*?)(\1)\)/);
    if (!e2) return null;
    let n2 = e2[2].trim();
    return n2.startsWith("#") ? null : n2;
  }
  function jc(t2) {
    let e2 = [], n2 = 0, o2 = 0, r2 = "";
    for (let i2 = 0; i2 < t2.length; i2++) {
      let s2 = t2[i2];
      if (s2 === "\\") {
        i2++;
        continue;
      }
      r2 ? s2 === r2 && (r2 = "") : s2 === '"' || s2 === "'" ? r2 = s2 : s2 === "(" ? o2++ : s2 === ")" ? o2-- : s2 === "," && o2 === 0 && (e2.push(t2.slice(n2, i2)), n2 = i2 + 1);
    }
    return e2.push(t2.slice(n2)), e2;
  }
  function hn(t2, e2 = 1) {
    let n2 = t2.match(/^\s*-?(?:webkit-)?image-set\(([\s\S]*)\)\s*$/i);
    if (!n2) return null;
    let o2 = [];
    for (let i2 of jc(n2[1])) {
      let s2 = i2.match(/url\((['"]?)(.*?)(\1)\)/);
      if (!s2) continue;
      let a2 = i2.match(/type\(\s*["']([^"']+)["']\s*\)/i);
      if (a2 && !Hc.test(a2[1].trim())) continue;
      let l2 = i2.replace(/url\((['"]?)[\s\S]*?\1\)/, " ").match(/(\d+(?:\.\d+)?)\s*(x|dpi|dppx)\b/i), u2 = 1;
      if (l2) {
        let c2 = parseFloat(l2[1]);
        u2 = /dpi/i.test(l2[2]) ? c2 / 96 : c2;
      }
      o2.push({ url: s2[2].trim(), dppx: u2 });
    }
    return o2.length ? (o2.sort((i2, s2) => i2.dppx - s2.dppx), (o2.find((i2) => i2.dppx >= e2) || o2[o2.length - 1]).url) : null;
  }
  function sr(t2) {
    if (!t2 || t2 === "none") return "";
    let e2 = t2.replace(/translate[XY]?\([^)]*\)/g, "");
    return e2 = e2.replace(/matrix\(([^)]+)\)/g, (n2, o2) => {
      let r2 = o2.split(",").map((i2) => i2.trim());
      return r2.length !== 6 ? `matrix(${o2})` : (r2[4] = "0", r2[5] = "0", `matrix(${r2.join(", ")})`);
    }), e2 = e2.replace(/matrix3d\(([^)]+)\)/g, (n2, o2) => {
      let r2 = o2.split(",").map((i2) => i2.trim());
      return r2.length !== 16 ? `matrix3d(${o2})` : (r2[12] = "0", r2[13] = "0", `matrix3d(${r2.join(", ")})`);
    }), e2.trim().replace(/\s{2,}/g, " ");
  }
  function jn(t2, e2) {
    if (!e2) return t2;
    let [n2, o2, r2] = e2.zoomed, i2 = t2.indexOf("</style>") + 8;
    if (i2 < 8 || !t2.startsWith(n2) || !t2.startsWith(o2, i2) || !t2.endsWith(r2)) return t2;
    let [s2, a2, l2] = e2.flat;
    return s2 + t2.slice(n2.length, i2) + a2 + t2.slice(i2 + o2.length, t2.length - r2.length) + l2;
  }
  function ie(t2) {
    if (/%[0-9A-Fa-f]{2}/.test(t2)) return t2;
    try {
      return encodeURI(t2);
    } catch {
      return t2;
    }
  }
  function ar(t2, e2) {
    if (!t2 || /^(data|blob|about|#)/i.test(t2.trim())) return t2;
    try {
      let n2 = e2 || typeof document < "u" && (document.baseURI || document.location?.href) || "http://localhost/";
      return new URL(t2, n2).href;
    } catch {
      return t2;
    }
  }
  function mn(t2) {
    return !!t2 && t2.tagName === "INPUT" && (t2.getAttribute("type") || "").toLowerCase() === "password";
  }
  function lr(t2) {
    return "\u2022".repeat(String(t2 ?? "").length);
  }
  function ft(t2, e2) {
    return t2?.nodeType === 1 && t2.localName === e2;
  }
  function Pt(t2) {
    return t2?.nodeType === 1 && t2.namespaceURI === Vc;
  }
  function Nt(t2) {
    return t2?.nodeType === 1 && t2.namespaceURI === Gc;
  }
  function Jt(t2) {
    return t2?.nodeType === 11 && !!t2.host;
  }
  function Bt(t2) {
    let e2 = t2?.parentNode;
    return e2?.nodeType === 11 ? e2.host : null;
  }
  function cr(t2) {
    return t2?.nodeType === 9;
  }
  function qc(t2 = "[SnapDOM]", { ttlMs: e2 = 5 * 6e4, maxEntries: n2 = 12 } = {}) {
    let o2 = /* @__PURE__ */ new Map(), r2 = 0;
    function i2(s2, a2, l2) {
      if (r2 >= n2) return;
      let u2 = Date.now();
      (o2.get(a2) || 0) > u2 || (o2.set(a2, u2 + e2), r2++, s2 === "warn" && console && console.warn ? console.warn(`${t2} ${l2}`) : console && console.error && console.error(`${t2} ${l2}`));
    }
    return { warnOnce(s2, a2) {
      i2("warn", s2, a2);
    }, errorOnce(s2, a2) {
      i2("error", s2, a2);
    }, reset() {
      o2.clear(), r2 = 0;
    } };
  }
  function Qi(t2, e2, n2) {
    if (Qt.size >= Ji) {
      let o2 = Date.now();
      for (let [r2, i2] of Qt) i2.until <= o2 && Qt.delete(r2);
      for (; Qt.size >= Ji; ) Qt.delete(Qt.keys().next().value);
    }
    Qt.set(t2, { until: Date.now() + n2, result: e2 });
  }
  function Xc(t2) {
    return /^data:|^blob:|^about:blank$/i.test(t2);
  }
  function Yc(t2, e2) {
    try {
      let n2 = typeof location < "u" && location.href ? location.href : "http://localhost/", o2 = e2.split(/\{url(?:Raw)?\}/)[0], r2 = new URL(o2 || ".", n2);
      if (new URL(t2, n2).origin === r2.origin) return true;
    } catch {
    }
    return false;
  }
  function Kc(t2, e2) {
    if (!e2 || Xc(t2) || Yc(t2, e2)) return false;
    try {
      let n2 = typeof location < "u" && location.href ? location.href : "http://localhost/", o2 = new URL(t2, n2);
      return typeof location < "u" ? o2.origin !== location.origin : true;
    } catch {
      return !!e2;
    }
  }
  function Jc(t2, e2) {
    if (!e2) return t2;
    if (/\{url(?:Raw)?\}/.test(e2)) return e2.replace("{urlRaw}", () => ie(t2)).replace("{url}", () => encodeURIComponent(t2));
    if (/[?&]url=?$/.test(e2)) return `${e2}${encodeURIComponent(t2)}`;
    if (e2.endsWith("?")) return `${e2}url=${encodeURIComponent(t2)}`;
    if (e2.endsWith("/")) return `${e2}${ie(t2)}`;
    let n2 = e2.includes("?") ? "&" : "?";
    return `${e2}${n2}url=${encodeURIComponent(t2)}`;
  }
  function Zi(t2) {
    return new Promise((e2, n2) => {
      let o2 = new FileReader();
      o2.onload = () => e2(String(o2.result || "").replace(/^data:[^,]*/, (r2) => r2.replace(/\s+/g, ""))), o2.onerror = () => n2(new Error("read_failed")), o2.readAsDataURL(t2);
    });
  }
  function Qc(t2, e2) {
    return new Headers(e2.headers || {}).keys().next().done ? JSON.stringify([e2.as || "blob", e2.timeout ?? 3e3, e2.useProxy || "", e2.errorTTL ?? 8e3, e2.credentials || "", t2]) : null;
  }
  function ts(t2) {
    try {
      return new URL(t2, globalThis.location?.href || "http://localhost/").origin;
    } catch {
      return "invalid-url";
    }
  }
  function ur(t2, e2) {
    try {
      t2.onError?.(e2);
    } catch {
    }
  }
  async function ut(t2, e2 = {}) {
    let n2 = e2.as ?? "blob", o2 = e2.timeout ?? 3e3, r2 = e2.useProxy || "", i2 = e2.errorTTL ?? 8e3, s2 = e2.headers || {}, a2 = !!e2.debug;
    if (/^data:/i.test(t2)) try {
      if (n2 === "text") return { ok: true, data: String(t2), status: 200, url: t2, fromCache: false };
      if (n2 === "dataURL") return { ok: true, data: String(t2), status: 200, url: t2, fromCache: false, mime: String(t2).slice(5).split(";")[0] || "" };
      let [, p2 = "", y2 = ""] = String(t2).match(/^data:([^,]*),(.*)$/) || [], w2 = /;base64/i.test(p2) ? atob(y2) : decodeURIComponent(y2), S2 = new Uint8Array([...w2].map((C) => C.charCodeAt(0))), v2 = new Blob([S2], { type: (p2 || "").split(";")[0] || "" });
      return { ok: true, data: v2, status: 200, url: t2, fromCache: false, mime: v2.type || "" };
    } catch {
      return { ok: false, data: null, status: 0, url: t2, fromCache: false, reason: "special_url_error" };
    }
    if (/^blob:/i.test(t2)) try {
      let p2 = await fetch(t2);
      if (!p2.ok) return { ok: false, data: null, status: p2.status, url: t2, fromCache: false, reason: "http_error" };
      let y2 = await p2.blob(), b2 = y2.type || p2.headers.get("content-type") || "";
      return n2 === "dataURL" ? { ok: true, data: await Zi(y2), blob: y2, status: p2.status, url: t2, fromCache: false, mime: b2 } : n2 === "text" ? { ok: true, data: await y2.text(), status: p2.status, url: t2, fromCache: false, mime: b2 } : { ok: true, data: y2, status: p2.status, url: t2, fromCache: false, mime: b2 };
    } catch {
      return { ok: false, data: null, status: 0, url: t2, fromCache: false, reason: "network" };
    }
    if (/^about:blank$/i.test(t2)) return n2 === "dataURL" ? { ok: true, data: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg==", status: 200, url: t2, fromCache: false, mime: "image/png" } : { ok: true, data: n2 === "text" ? "" : new Blob([]), status: 200, url: t2, fromCache: false };
    let l2;
    try {
      l2 = Qc(t2, { as: n2, timeout: o2, useProxy: r2, errorTTL: i2, credentials: e2.credentials, headers: s2 });
    } catch {
      let p2 = { ok: false, data: null, status: 0, url: t2, fromCache: false, reason: "network" };
      return ur(e2, p2), p2;
    }
    let u2 = Qt.get(l2);
    if (u2 && u2.until > Date.now()) return { ...u2.result, fromCache: true };
    u2 && Qt.delete(l2);
    let c2 = fr.get(l2);
    if (c2) return c2;
    let f2 = Kc(t2, r2) ? Jc(t2, r2) : t2, d2 = e2.credentials;
    if (!d2) try {
      let p2 = typeof location < "u" && location.href ? location.href : "http://localhost/", y2 = new URL(t2, p2);
      d2 = typeof location < "u" && y2.origin === location.origin ? "include" : "omit";
    } catch {
      d2 = "omit";
    }
    let h2 = new AbortController(), m2 = setTimeout(() => h2.abort("timeout"), o2), g2 = (async () => {
      try {
        let p2 = await fetch(f2, { signal: h2.signal, credentials: d2, headers: s2 });
        if (!p2.ok) {
          let w2 = { ok: false, data: null, status: p2.status, url: f2, fromCache: false, reason: "http_error" };
          if (l2 !== null && i2 > 0 && Qi(l2, w2, i2), a2) {
            let S2 = `${p2.status} ${p2.statusText || ""}`.trim();
            Ki.warnOnce(`http:${p2.status}:${n2}:${ts(t2)}`, `Couldn't load ${t2} (HTTP ${S2}).`);
          }
          return ur(e2, w2), w2;
        }
        if (n2 === "text") return { ok: true, data: await p2.text(), status: p2.status, url: f2, fromCache: false };
        let y2 = await p2.blob(), b2 = y2.type || p2.headers.get("content-type") || "";
        return n2 === "dataURL" ? { ok: true, data: await Zi(y2), blob: y2, status: p2.status, url: f2, fromCache: false, mime: b2 } : { ok: true, data: y2, status: p2.status, url: f2, fromCache: false, mime: b2 };
      } catch (p2) {
        let y2 = h2.signal.aborted ? h2.signal.reason === "timeout" ? "timeout" : "abort" : p2 && typeof p2 == "object" && p2.name === "AbortError" ? "abort" : "network", b2 = { ok: false, data: null, status: 0, url: f2, fromCache: false, reason: y2 };
        if (l2 !== null && !/^blob:/i.test(t2) && i2 > 0 && Qi(l2, b2, i2), a2) {
          let w2 = `${y2}:${n2}:${ts(t2)}`, S2 = y2 === "timeout" ? `Timed out loading ${t2} after ${o2}ms. Raise the timeout option or set useProxy.` : y2 === "abort" ? `Loading ${t2} was cancelled.` : `Couldn't load ${t2} (network or CORS). Try the useProxy option.`;
          Ki.errorOnce(w2, S2);
        }
        return ur(e2, b2), b2;
      } finally {
        clearTimeout(m2), fr.delete(l2);
      }
    })();
    return l2 !== null && fr.set(l2, g2), g2;
  }
  async function Ie(t2, e2 = {}) {
    if (/^\s*url\(\s*['"]?data:/i.test(t2) || /^((repeating-)?(linear|radial|conic)-gradient)\(/i.test(t2) || t2.trim() === "none") return t2;
    let o2 = hn(t2, typeof devicePixelRatio < "u" && devicePixelRatio || 1) ?? ge(t2);
    if (!o2) return t2;
    let r2 = ar(o2), i2 = ie(r2), s2 = (e2.useProxy || "") + "|" + i2;
    if (j.background.has(s2)) {
      let a2 = j.background.get(s2);
      return a2 ? `url("${a2}")` : "none";
    }
    try {
      let a2 = await ut(i2, { as: "dataURL", useProxy: e2.useProxy, debug: e2.debug });
      return a2.ok ? (j.background.set(s2, a2.data), `url("${a2.data}")`) : (j.background.set(s2, null), "none");
    } catch {
      return j.background.set(s2, null), "none";
    }
  }
  function rs(t2, e2) {
    if (Zc.has(e2)) t2.add(e2);
    else if (e2.startsWith("transform-origin-")) t2.add("transform-origin");
    else return false;
    return true;
  }
  function as(t2) {
    let e2 = t2.replace(rf, "").trim();
    return e2 ? e2.replace(/(^|,)(\s*)(?=,|$)/g, "$1$2*") : "*";
  }
  function ls(t2, e2, n2, o2) {
    for (let r2 = 0; r2 < t2.length; r2++) {
      if (--o2.budget < 0) return false;
      let i2 = t2[r2], s2 = i2.style, a2 = false, l2 = false;
      if (s2) {
        let c2 = !!i2.selectorText && is.test(i2.selectorText);
        for (let f2 = 0; f2 < s2.length; f2++) {
          let d2 = s2[f2];
          if (e2.add(d2), o2.svgGeometry && (rs(o2.svgGeometry, d2) ? a2 = true : tf.test(d2) && (l2 = true)), c2 && o2.pseudoProps.add(d2), s2.getPropertyPriority(d2) && o2.importantProps.add(d2), d2.length > 5 && (d2[0] === "m" || d2[0] === "p")) {
            let h2 = d2.startsWith("margin") ? "marginUnstable" : d2.startsWith("padding") ? "paddingUnstable" : null;
            h2 && !o2[h2] && of.test(s2.getPropertyValue(d2)) && (o2[h2] = true);
          }
        }
      }
      let u2 = i2.selectorText;
      if (u2 && u2.includes(":has(") && (o2.usesHas = true), u2 && /[+~]|:has\(|:nth-(?:last-)?child\([^)]*\bof\b/i.test(u2) && (o2.leaksAcrossSubtrees = true), s2 && (s2.counterReset || s2.counterIncrement || s2.counterSet || s2.content && s2.content.includes("counter")) && (o2.leaksAcrossSubtrees = true), u2 && u2.includes("&")) for (let c2 = i2.parentRule; c2 && u2.includes("&"); c2 = c2.parentRule) c2.selectorText && (u2 = u2.replace(/&/g, `:is(${c2.selectorText})`));
      if (u2 && (o2.inContainer || os.test(u2) || u2.includes("+") || u2.includes("~"))) for (let c2 of Gn(u2, ",")) {
        let f2 = c2.trim();
        f2 && (o2.inContainer || os.test(f2) || f2.includes("+") || f2.includes("~")) && o2.shareUnsafeSels.add(f2);
      }
      if ((a2 || l2) && sf(i2, u2, a2, o2), u2 && u2.includes(":")) for (let c2 in ns) ns[c2].test(u2) && n2[c2].push(as(u2));
      if (i2.styleSheet) {
        if (!Vn(i2.styleSheet, e2, n2, o2)) return false;
      } else if (i2.cssRules && i2.cssRules.length) {
        let c2 = i2.constructor?.name === "CSSContainerRule", f2 = i2.constructor?.name === "CSSScopeRule";
        c2 && o2.inContainer++, f2 && (o2.inScope = (o2.inScope || 0) + 1);
        let d2 = ls(i2.cssRules, e2, n2, o2);
        if (c2 && o2.inContainer--, f2 && o2.inScope--, !d2) return false;
      }
    }
    return true;
  }
  function sf(t2, e2, n2, o2) {
    if (n2 && t2.constructor?.name === "CSSKeyframeRule") {
      o2.svgKeyframes = true;
      return;
    }
    if (!e2 || o2.inScope) {
      n2 && (o2.svgGeometryAll = true);
      return;
    }
    let r2 = n2 ? o2.svgGeometrySels : o2.svgAnimSels;
    for (let i2 of Gn(e2, ",")) {
      let s2 = i2.trim();
      s2 && r2.add(is.test(s2) ? as(s2) : s2);
    }
  }
  function Vn(t2, e2, n2, o2) {
    let r2;
    try {
      r2 = t2.cssRules;
    } catch {
      r2 = o2.crossOriginRules?.(t2);
    }
    return r2 ? ls(r2, e2, n2, o2) : false;
  }
  function hr(t2, e2) {
    for (let n2 of t2) {
      let o2 = n2.effect?.getKeyframes?.() || [];
      for (let r2 of o2) for (let i2 of Object.keys(r2)) i2 === "offset" || i2 === "easing" || i2 === "composite" || i2 === "computedOffset" || e2.add(i2.replace(/[A-Z]/g, (s2) => "-" + s2.toLowerCase()));
    }
  }
  function cs(t2) {
    let e2 = /* @__PURE__ */ new Set();
    return Vn(t2, e2, { before: [], after: [], firstLetter: [], marker: [], firstLine: [] }, { budget: ss, usesHas: false, leaksAcrossSubtrees: false, shareUnsafeSels: /* @__PURE__ */ new Set(), inContainer: 0, marginUnstable: false, paddingUnstable: false, importantProps: /* @__PURE__ */ new Set(), pseudoProps: /* @__PURE__ */ new Set() }) ? e2 : null;
  }
  function Gn(t2, e2) {
    if (!t2.includes(e2)) return [t2];
    let n2 = [], o2 = 0, r2 = null, i2 = 0;
    for (let s2 = 0; s2 < t2.length; s2++) {
      let a2 = t2[s2];
      if (a2 === "\\") {
        s2++;
        continue;
      }
      if (r2) {
        a2 === r2 && (r2 = null);
        continue;
      }
      a2 === '"' || a2 === "'" ? r2 = a2 : a2 === "(" || a2 === "[" ? o2++ : a2 === ")" || a2 === "]" ? o2-- : o2 === 0 && a2 === e2 && (n2.push(t2.slice(i2, s2)), i2 = s2 + 1);
    }
    return n2.push(t2.slice(i2)), n2;
  }
  function af(t2) {
    let e2 = 0, n2 = null, o2 = 0;
    for (let c2 = 0; c2 < t2.length; c2++) {
      let f2 = t2[c2];
      if (n2) {
        f2 === n2 && t2[c2 - 1] !== "\\" && (n2 = null);
        continue;
      }
      f2 === '"' || f2 === "'" ? n2 = f2 : f2 === "(" || f2 === "[" ? e2++ : f2 === ")" || f2 === "]" ? e2-- : e2 === 0 && (f2 === " " || f2 === ">" || f2 === "+" || f2 === "~") && (o2 = c2 + 1);
    }
    let r2 = "", i2 = 0;
    for (let c2 of t2.slice(o2)) c2 === "(" || c2 === "[" ? i2++ : c2 === ")" || c2 === "]" ? i2-- : i2 === 0 && (r2 += c2);
    let s2 = (c2) => !c2 || /\\[0-9a-fA-F]/.test(c2) ? null : c2.replace(/\\(.)/g, "$1"), a2 = s2((r2.match(/\.((?:\\.|[\w-])+)/) || [])[1]);
    if (a2) return "c" + a2;
    let l2 = s2((r2.match(/#((?:\\.|[\w-])+)/) || [])[1]);
    if (l2) return "i" + l2;
    let u2 = (r2.match(/^([a-zA-Z][\w-]*)/) || [])[1];
    return u2 ? "t" + u2.toLowerCase() : null;
  }
  function dr(t2, e2) {
    if (!e2.length) return "";
    if (e2.some((o2) => o2.includes("&"))) return null;
    let n2 = e2.join(",");
    try {
      return t2.matches(n2), n2;
    } catch {
      return null;
    }
  }
  function lf(t2, e2) {
    let n2 = {};
    for (let o2 in e2) {
      let r2 = e2[o2];
      (o2 === "before" || o2 === "after") && r2.push("q"), n2[o2] = dr(t2, r2);
    }
    return n2;
  }
  function fs(t2, e2) {
    let n2 = { universe: null, pseudoUniverse: null, svgGeometry: null, svgGeometrySel: null, usesHas: true, leaksAcrossSubtrees: true, shareGate: null, marginUnstable: true, paddingUnstable: true, importantProps: null, pseudoGates: { before: null, after: null, firstLetter: null, marker: null, firstLine: null } };
    try {
      let o2 = new Set(pr), r2 = { before: [], after: [], firstLetter: [], marker: [], firstLine: [] }, i2 = { budget: ss, usesHas: false, leaksAcrossSubtrees: false, shareUnsafeSels: /* @__PURE__ */ new Set(), inContainer: 0, marginUnstable: false, paddingUnstable: false, importantProps: /* @__PURE__ */ new Set(), pseudoProps: /* @__PURE__ */ new Set(), svgGeometry: /* @__PURE__ */ new Set(), svgGeometrySels: /* @__PURE__ */ new Set(), svgAnimSels: /* @__PURE__ */ new Set(), svgKeyframes: false, svgGeometryAll: false, inScope: 0, crossOriginRules: e2 };
      for (let d2 of t2.styleSheets) if (!Vn(d2, o2, r2, i2)) return n2;
      let s2 = t2.adoptedStyleSheets;
      if (Array.isArray(s2)) {
        for (let d2 of s2) if (!Vn(d2, o2, r2, i2)) return n2;
      }
      if (typeof t2.getAnimations == "function") {
        let d2 = /* @__PURE__ */ new Set();
        hr(t2.getAnimations(), d2);
        for (let h2 of d2) o2.add(h2), rs(i2.svgGeometry, h2) && (i2.svgGeometryAll = true);
      }
      if (i2.svgKeyframes) for (let d2 of i2.svgAnimSels) i2.svgGeometrySels.add(d2);
      let a2 = t2.createElement("div"), l2 = i2.svgGeometryAll ? null : dr(a2, Array.from(i2.svgGeometrySels)), u2 = Array.from(i2.shareUnsafeSels), c2 = dr(a2, u2) === null ? null : u2.map((d2) => ({ sel: d2, key: af(d2) })), f2 = new Set(nf);
      for (let d2 of ef) o2.has(d2) && f2.add(d2);
      for (let d2 of i2.pseudoProps) f2.add(d2);
      return (i2.pseudoProps.has("transform") || i2.pseudoProps.has("rotate") || i2.pseudoProps.has("scale")) && f2.add("transform-origin"), i2.pseudoProps.has("perspective") && f2.add("perspective-origin"), { universe: o2, pseudoUniverse: f2, svgGeometry: i2.svgGeometry, svgGeometrySel: l2, pseudoGates: lf(a2, r2), usesHas: i2.usesHas, leaksAcrossSubtrees: i2.leaksAcrossSubtrees, shareGate: c2, marginUnstable: i2.marginUnstable, paddingUnstable: i2.paddingUnstable, importantProps: i2.importantProps };
    } catch {
      return n2;
    }
  }
  function tt(t2) {
    return us.add(t2), t2.setAttribute("data-snapdom-internal", ""), t2;
  }
  function Xt(t2) {
    return us.has(t2);
  }
  function gr(t2) {
    if (t2 = String(t2).toLowerCase(), gn.has(t2)) {
      let i2 = {};
      return j.defaultStyle.set(t2, i2), i2;
    }
    if (j.defaultStyle.has(t2)) return j.defaultStyle.get(t2);
    let e2 = [...document.querySelectorAll("#snapdom-sandbox")].find(Xt);
    e2 || (e2 = document.createElement("div"), tt(e2), e2.id = "snapdom-sandbox", e2.setAttribute("data-snapdom-sandbox", "true"), e2.setAttribute("aria-hidden", "true"), e2.style.position = "absolute", e2.style.left = "-9999px", e2.style.top = "-9999px", e2.style.width = "0px", e2.style.height = "0px", e2.style.overflow = "hidden", document.body.appendChild(e2));
    let n2 = document.createElement(t2.includes("-") ? "span" : t2);
    n2.style.all = "initial", e2.appendChild(n2);
    let o2 = getComputedStyle(n2), r2 = {};
    for (let i2 of o2) {
      if (We(i2)) continue;
      let s2 = o2.getPropertyValue(i2);
      r2[i2] = s2;
    }
    for (let i2 of pr) !(i2 in r2) && !We(i2) && (r2[i2] = o2.getPropertyValue(i2));
    return e2.removeChild(n2), j.defaultStyle.set(t2, r2), r2;
  }
  function We(t2) {
    let e2 = ds.get(t2);
    if (e2 === void 0) {
      let n2 = String(t2).toLowerCase();
      e2 = uf.has(n2) || ff.test(n2) || cf.test(n2), ds.set(t2, e2);
    }
    return e2;
  }
  function ms(t2, e2) {
    let n2 = gf.get(t2);
    if (n2 === void 0 || e2[n2] !== e2[t2]) return false;
    let o2 = e2["writing-mode"];
    if (o2 && o2 !== "horizontal-tb") return false;
    let r2 = e2.direction;
    return !(r2 && r2 !== "ltr");
  }
  function Xn(t2, e2) {
    return !pf.has(t2) && (e2 === "inline" || df.has(t2) || hs.has(t2));
  }
  function yr(t2, e2, n2) {
    let o2 = (e2.display || "").toLowerCase();
    if (o2 === "inline" || hs.has(t2)) return false;
    if (n2) return true;
    if ((e2.float || "none").toLowerCase() !== "none") return false;
    let i2 = (e2.position || "static").toLowerCase();
    return i2 === "absolute" || i2 === "fixed" ? false : !bf.has(o2);
  }
  function Oe(t2, e2, n2 = true, o2 = false) {
    if (e2 = String(e2 || "").toLowerCase(), gn.has(e2)) return "";
    let r2 = [], i2 = gr(e2), s2 = (t2.display || "").toLowerCase(), a2 = s2 === "inline", l2 = Xn(e2, s2), u2 = t2["text-wrap-mode"] || t2["white-space"] || "", c2 = u2 === "nowrap" || u2 === "pre", d2 = l2 && n2 && !(l2 && n2 && !a2 && c2), h2 = false;
    for (let m2 in t2) {
      if (We(m2) || ms(m2, t2)) continue;
      let g2 = t2[m2];
      if (!(ps.has(m2) && hf.has(e2))) {
        if (d2) {
          if (ps.has(m2)) continue;
          if (mf.has(m2)) {
            g2 && g2 !== i2[m2] && (r2.push(`${m2}:${g2}`), g2 !== "auto" && (h2 = true));
            continue;
          }
        }
        if (g2 && g2 !== i2[m2]) {
          if ((m2 === "height" || m2 === "block-size" || !c2 && (m2 === "width" || m2 === "inline-size")) && g2.endsWith("px") && g2.includes(".")) {
            let y2 = parseFloat(g2);
            if (Number.isFinite(y2)) {
              r2.push(`${m2}:${(y2 + yf).toFixed(3)}px`);
              continue;
            }
          }
          r2.push(`${m2}:${g2}`);
        }
      }
    }
    if (d2 && !a2 && !o2 && !h2) {
      let m2 = t2.width;
      m2 && m2 !== "auto" && m2 !== i2.width && r2.push(`min-width:${m2}`);
    }
    return r2.sort(), r2.join(";");
  }
  function br(t2) {
    let e2 = /* @__PURE__ */ new Set();
    return t2.nodeType !== Node.ELEMENT_NODE && t2.nodeType !== Node.DOCUMENT_FRAGMENT_NODE ? [] : (t2.tagName && e2.add(t2.tagName.toLowerCase()), typeof t2.querySelectorAll == "function" && t2.querySelectorAll("*").forEach((n2) => e2.add(n2.tagName.toLowerCase())), Array.from(e2));
  }
  function wr(t2, e2 = null) {
    let n2 = /* @__PURE__ */ new Map();
    for (let s2 of t2) {
      let a2 = gr(s2);
      if (!a2) continue;
      let c2 = (e2 ? Object.entries(a2).filter(([d2]) => e2.has(d2)) : Object.entries(a2)).filter(([d2]) => !ms(d2, a2)).map(([d2, h2]) => `${d2}:${h2};`).sort(), f2 = c2.join("");
      f2 && (n2.has(f2) || n2.set(f2, { tagList: [], declarations: c2 }), n2.get(f2).tagList.push(s2));
    }
    let o2 = [...n2.values()], r2 = null;
    for (let { declarations: s2 } of o2) {
      let a2 = new Set(s2);
      if (!r2) {
        r2 = a2;
        continue;
      }
      for (let l2 of r2) a2.has(l2) || r2.delete(l2);
    }
    r2 ?? (r2 = /* @__PURE__ */ new Set());
    let i2 = "";
    if (r2.size && o2.length > 1) {
      let s2 = o2.flatMap((a2) => a2.tagList);
      i2 += `${s2.join(",")} { ${[...r2].join("")} }
`;
    }
    for (let { tagList: s2, declarations: a2 } of o2) {
      let l2 = o2.length > 1 ? a2.filter((c2) => !r2.has(c2)) : a2;
      if (!l2.length) continue;
      let u2 = l2.join("");
      i2 += `${s2.join(",")} { ${u2} }
`;
    }
    return i2;
  }
  function yn(t2) {
    let e2 = Array.from(new Set(t2.values())).filter(Boolean).sort(), n2 = /* @__PURE__ */ new Map(), o2 = 1;
    for (let r2 of e2) n2.set(r2, `c${o2++}`);
    return n2;
  }
  function wf(t2) {
    try {
      let e2 = t2?.ownerDocument;
      if (!e2) return typeof window < "u" ? window : null;
      let n2 = e2.defaultView;
      if (n2 && typeof n2.getComputedStyle == "function") return n2;
      if (typeof window < "u" && window.frames) for (let o2 = 0; o2 < window.frames.length; o2++) try {
        if (window.frames[o2]?.document === e2) return window.frames[o2];
      } catch {
      }
    } catch {
    }
    return typeof window < "u" ? window : null;
  }
  function O(t2, e2 = null) {
    let n2 = () => {
      let i2 = { length: 0, getPropertyValue: () => "", item: () => "" };
      return i2[Symbol.iterator] = function* () {
      }, i2;
    };
    if (t2?.nodeType !== 1) {
      let i2 = typeof window < "u" ? window : null;
      if (i2 && typeof i2.getComputedStyle == "function") try {
        return i2.getComputedStyle(t2, e2) || n2();
      } catch {
        return n2();
      }
      return n2();
    }
    let o2 = j.computedStyle.get(t2);
    o2 || (o2 = /* @__PURE__ */ new Map(), j.computedStyle.set(t2, o2));
    let r2 = o2.get(e2);
    if (!r2) {
      let i2 = wf(t2), s2 = null;
      try {
        s2 = i2 && typeof i2.getComputedStyle == "function" ? i2.getComputedStyle(t2, e2) : null;
      } catch {
      }
      if (!s2 && typeof window < "u" && typeof window.getComputedStyle == "function") try {
        t2.ownerDocument === document && (s2 = window.getComputedStyle(t2, e2));
      } catch {
      }
      r2 = s2 || n2(), o2.set(e2, r2);
    }
    return r2;
  }
  function De(t2, e2 = null) {
    let n2 = {};
    for (let o2 of e2 || t2) {
      let r2 = t2.getPropertyValue(o2);
      r2 && (n2[o2] = r2);
    }
    for (let o2 of xf) {
      let r2 = n2[`border-${o2}-style`], i2 = n2[`border-${o2}-width`];
      (r2 === "none" || r2 === "hidden" || i2 === "0px") && (delete n2[`border-${o2}-style`], delete n2[`border-${o2}-width`], delete n2[`border-${o2}-color`]);
    }
    return n2;
  }
  function se(t2) {
    let e2 = [], n2 = 0, o2 = 0, r2 = "";
    for (let i2 = 0; i2 < t2.length; i2++) {
      let s2 = t2[i2];
      if (s2 === "\\") {
        i2++;
        continue;
      }
      if (r2) {
        s2 === r2 && (r2 = "");
        continue;
      }
      (s2 === '"' || s2 === "'") && (r2 = s2), s2 === "(" && n2++, s2 === ")" && n2--, s2 === "," && n2 === 0 && (e2.push(t2.slice(o2, i2).trim()), o2 = i2 + 1);
    }
    return e2.push(t2.slice(o2).trim()), e2;
  }
  function Ct(t2 = 1e3) {
    return typeof requestAnimationFrame != "function" || typeof document < "u" && document.visibilityState === "hidden" ? Promise.resolve() : new Promise((e2) => {
      let n2 = false, o2 = () => {
        n2 || (n2 = true, e2());
      };
      try {
        requestAnimationFrame(o2);
      } catch {
        o2();
        return;
      }
      setTimeout(o2, t2);
    });
  }
  async function wn(t2 = document) {
    let e2 = t2.fonts, n2 = false, o2 = e2.ready.then(() => {
      n2 = true;
    }, () => {
      n2 = true;
    });
    for (; !n2 && e2.status === "loading"; ) {
      let r2 = [...e2].filter((i2) => i2.status === "loading");
      if (!r2.length) return;
      await Promise.race([o2, Promise.allSettled(r2.map((i2) => i2.loaded))]);
    }
  }
  function gs(t2) {
    if (t2 !== false && t2 !== "auto") return null;
    let e2 = performance.now() + (t2 === "auto" ? Sf : xr), n2 = null, o2 = { yielded: false, due: () => performance.now() >= e2, pause: () => n2 || (n2 = Sr().then(() => {
      n2 = null, o2.yielded = true, e2 = performance.now() + xr;
    })) };
    return o2;
  }
  function Sr() {
    return new Promise((t2) => {
      let e2 = new MessageChannel();
      e2.port1.onmessage = () => t2(), e2.port2.postMessage(0);
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
    let t2 = navigator.userAgent || "", e2 = /iPhone|iPad|iPod/.test(t2), n2 = navigator.maxTouchPoints > 2 && /Macintosh/.test(t2);
    return e2 || n2;
  }
  function Y() {
    if (typeof navigator > "u") return false;
    let t2 = navigator.userAgent || "", e2 = t2.toLowerCase(), n2 = e2.includes("safari") && !e2.includes("chrome") && !e2.includes("crios") && !e2.includes("fxios") && !e2.includes("android"), o2 = /applewebkit/i.test(t2), r2 = /mobile/i.test(t2), i2 = !/safari/i.test(t2), s2 = o2 && r2 && i2, a2 = /(micromessenger|wxwork|wecom|windowswechat|macwechat)/i.test(t2), l2 = /(baiduboxapp|baidubrowser|baidusearch|baiduboxlite)/i.test(e2), u2 = /ipad|iphone|ipod/.test(e2) && o2;
    return n2 || s2 || a2 || l2 || u2;
  }
  function _t() {
    return typeof navigator > "u" ? false : (navigator.userAgent || "").toLowerCase().includes("firefox");
  }
  function D(t2, e2, n2) {
    let o2 = t2 && typeof t2 == "object" && (t2.options || t2);
    o2 && o2.debug && (n2 !== void 0 ? console.warn("[SnapDOM]", e2, n2) : console.warn("[SnapDOM]", e2));
  }
  function nt(t2, e2, n2, o2) {
    let r2 = t2 && t2.warnings;
    r2 && r2.length < vf && r2.push(o2 === void 0 ? { code: e2, message: n2 } : { code: e2, message: n2, detail: o2 });
  }
  function Yr(t2) {
    return Qa(t2.boxShadow);
  }
  function Kr(t2) {
    return Qa(t2.textShadow);
  }
  function Qa(t2) {
    if (!t2 || t2 === "none") return { top: 0, right: 0, bottom: 0, left: 0 };
    let e2 = [], n2 = "", o2 = 0;
    for (let l2 = 0; l2 < t2.length; l2++) {
      let u2 = t2[l2];
      u2 === "(" ? o2++ : u2 === ")" && (o2 = Math.max(0, o2 - 1)), u2 === "," && o2 === 0 ? (e2.push(n2), n2 = "") : n2 += u2;
    }
    n2.trim() && e2.push(n2);
    let r2 = 0, i2 = 0, s2 = 0, a2 = 0;
    for (let l2 of e2) {
      if (/\binset\b/i.test(l2)) continue;
      let u2 = l2.match(/-?\d+(\.\d+)?px/g)?.map((p2) => parseFloat(p2)) || [];
      if (u2.length < 2) continue;
      let [c2, f2, d2 = 0, h2 = 0] = u2, m2 = Math.abs(c2) + d2 + h2, g2 = Math.abs(f2) + d2 + h2;
      i2 = Math.max(i2, m2 + Math.max(c2, 0)), a2 = Math.max(a2, m2 + Math.max(-c2, 0)), s2 = Math.max(s2, g2 + Math.max(f2, 0)), r2 = Math.max(r2, g2 + Math.max(-f2, 0));
    }
    return { top: Math.ceil(r2), right: Math.ceil(i2), bottom: Math.ceil(s2), left: Math.ceil(a2) };
  }
  function Jr(t2) {
    let e2 = t2.filter && t2.filter !== "none" ? t2.filter : t2.webkitFilter || "", n2 = /blur\(\s*([0-9.]+)px\s*\)/gi, o2 = 0, r2;
    for (; r2 = n2.exec(e2); ) o2 += parseFloat(r2[1]) || 0;
    let i2 = Math.ceil(o2 * 2);
    return { top: i2, right: i2, bottom: i2, left: i2 };
  }
  function Qr(t2) {
    if ((t2.outlineStyle || "none") === "none") return { top: 0, right: 0, bottom: 0, left: 0 };
    let e2 = Math.ceil(parseFloat(t2.outlineWidth || "0") || 0), n2 = parseFloat(t2.outlineOffset || "0") || 0, o2 = e2 + Math.max(0, Math.ceil(n2));
    return { top: o2, right: o2, bottom: o2, left: o2 };
  }
  function Zr(t2) {
    let e2 = `${t2.filter || ""} ${t2.webkitFilter || ""}`.trim();
    if (!e2 || e2 === "none") return { bleed: { top: 0, right: 0, bottom: 0, left: 0 }, has: false };
    let n2 = e2.match(/drop-shadow\((?:[^()]|\([^()]*\))*\)/gi) || [], o2 = 0, r2 = 0, i2 = 0, s2 = 0, a2 = false;
    for (let l2 of n2) {
      a2 = true;
      let u2 = l2.match(/-?\d+(?:\.\d+)?px/gi)?.map((g2) => parseFloat(g2)) || [], [c2 = 0, f2 = 0, d2 = 0] = u2, h2 = Math.abs(c2) + d2, m2 = Math.abs(f2) + d2;
      r2 = Math.max(r2, h2 + Math.max(c2, 0)), s2 = Math.max(s2, h2 + Math.max(-c2, 0)), i2 = Math.max(i2, m2 + Math.max(f2, 0)), o2 = Math.max(o2, m2 + Math.max(-f2, 0));
    }
    return { bleed: { top: H(o2), right: H(r2), bottom: H(i2), left: H(s2) }, has: a2 };
  }
  function Vd(t2) {
    let e2 = Yr(t2), n2 = Kr(t2), o2 = Jr(t2), r2 = Qr(t2), i2 = Zr(t2);
    return { top: Math.max(e2.top, n2.top) + o2.top + r2.top + i2.bleed.top, right: Math.max(e2.right, n2.right) + o2.right + r2.right + i2.bleed.right, bottom: Math.max(e2.bottom, n2.bottom) + o2.bottom + r2.bottom + i2.bleed.bottom, left: Math.max(e2.left, n2.left) + o2.left + r2.left + i2.bleed.left };
  }
  function Gd(t2) {
    return t2.boxShadow && t2.boxShadow !== "none" || t2.textShadow && t2.textShadow !== "none" || (t2.outlineStyle || "none") !== "none" || t2.filter && t2.filter !== "none" ? true : !!t2.webkitFilter && t2.webkitFilter !== "none";
  }
  function Ja(t2) {
    let e2 = t2.overflowX || t2.overflow || "visible", n2 = t2.overflowY || t2.overflow || "visible", o2 = !!t2.contain && /\b(paint|content|strict)\b/.test(t2.contain) || !!t2.clipPath && t2.clipPath !== "none";
    return { x: o2 || e2 !== "visible", y: o2 || n2 !== "visible" };
  }
  function ti(t2, e2, n2, o2 = 1, r2 = 1) {
    let i2 = 0, s2 = 0, a2 = 0, l2 = 0, u2 = Ja(n2.get(t2) || O(t2));
    if (u2.x && u2.y) return { top: 0, right: 0, bottom: 0, left: 0 };
    let c2 = t2.getBoundingClientRect();
    for (let f2 of e2.values()) {
      if (f2 === t2 || f2.nodeType !== 1 || f2.ownerDocument !== t2.ownerDocument) continue;
      let d2 = n2.get(f2);
      if (!d2 || !Gd(d2)) continue;
      let h2 = Vd(d2);
      if (!(h2.top || h2.right || h2.bottom || h2.left)) continue;
      let m2 = f2.getBoundingClientRect(), g2 = { left: m2.left - h2.left / o2, top: m2.top - h2.top / r2, right: m2.right + h2.right / o2, bottom: m2.bottom + h2.bottom / r2 };
      for (let p2 = f2.parentElement; p2; p2 = p2.parentElement) {
        let y2 = Ja(n2.get(p2) || O(p2));
        if (y2.x || y2.y) {
          let b2 = p2.getBoundingClientRect();
          y2.x && (g2.left = Math.max(g2.left, b2.left), g2.right = Math.min(g2.right, b2.right)), y2.y && (g2.top = Math.max(g2.top, b2.top), g2.bottom = Math.min(g2.bottom, b2.bottom));
        }
        if (p2 === t2) break;
      }
      u2.x || (l2 = Math.max(l2, (c2.left - g2.left) * o2), s2 = Math.max(s2, (g2.right - c2.right) * o2)), u2.y || (i2 = Math.max(i2, (c2.top - g2.top) * r2), a2 = Math.max(a2, (g2.bottom - c2.bottom) * r2));
    }
    return { top: Math.max(0, Math.ceil(i2)), right: Math.max(0, Math.ceil(s2)), bottom: Math.max(0, Math.ceil(a2)), left: Math.max(0, Math.ceil(l2)) };
  }
  function Za(t2, e2) {
    if (!t2 || !e2 || !e2.style) return null;
    let n2 = getComputedStyle(t2);
    try {
      e2.style.transformOrigin = "0 0";
    } catch {
    }
    try {
      "translate" in e2.style && (e2.style.translate = "none"), "rotate" in e2.style && (e2.style.rotate = "none");
    } catch {
    }
    let o2 = n2.transform || "none";
    if (!o2 || o2 === "none") {
      let l2 = null;
      try {
        l2 = ke(t2).scale;
      } catch {
      }
      try {
        e2.style.transform = "none";
      } catch {
      }
      if (!l2) return { a: 1, b: 0, c: 0, d: 1 };
      let u2 = de({ scale: l2 });
      return { a: u2.a, b: u2.b, c: u2.c, d: u2.d };
    }
    function r2(l2, u2, c2, f2) {
      let d2 = Math.sqrt(l2 * l2 + u2 * u2) || 0, h2 = 0, m2 = 0;
      if (d2 > 0) {
        let g2 = l2 / d2, p2 = u2 / d2;
        h2 = g2 * c2 + p2 * f2;
        let y2 = c2 - g2 * h2, b2 = f2 - p2 * h2;
        m2 = Math.sqrt(y2 * y2 + b2 * b2) || 0, m2 > 0 ? h2 = h2 / m2 : h2 = 0;
      }
      return { a: d2, b: 0, c: h2 * m2, d: m2 };
    }
    let i2 = (l2) => {
      let u2 = ke(t2).scale;
      if (!u2) return l2;
      let c2 = de({ scale: u2, baseTransform: `matrix(${l2.a},${l2.b},${l2.c},${l2.d},0,0)` });
      return { a: c2.a, b: c2.b, c: c2.c, d: c2.d };
    }, s2 = o2.match(/^matrix\(\s*([^)]+)\)$/i);
    if (s2) {
      let l2 = s2[1].split(",").map((u2) => parseFloat(u2.trim()));
      if (l2.length === 6 && l2.every(Number.isFinite)) {
        let [u2, c2, f2, d2] = l2, h2 = r2(u2, c2, f2, d2);
        try {
          e2.style.transform = `matrix(${h2.a}, ${h2.b}, ${h2.c}, ${h2.d}, 0, 0)`;
        } catch {
        }
        return i2(h2);
      }
    }
    let a2 = o2.match(/^matrix3d\(\s*([^)]+)\)$/i);
    if (a2) {
      let l2 = a2[1].split(",").map((u2) => parseFloat(u2.trim()));
      if (l2.length === 16 && l2.every(Number.isFinite)) {
        let u2 = l2[0], c2 = l2[1], f2 = l2[4], d2 = l2[5], h2 = r2(u2, c2, f2, d2);
        try {
          e2.style.transform = `matrix(${h2.a}, ${h2.b}, ${h2.c}, ${h2.d}, 0, 0)`;
        } catch {
        }
        return i2(h2);
      }
    }
    try {
      let l2 = new DOMMatrix(o2), u2 = r2(l2.a, l2.b, l2.c, l2.d);
      try {
        e2.style.transform = `matrix(${u2.a}, ${u2.b}, ${u2.c}, ${u2.d}, 0, 0)`;
      } catch {
      }
      return i2(u2);
    } catch {
      return null;
    }
  }
  function tn(t2, e2, n2, o2, r2) {
    let i2 = n2.a, s2 = n2.b, a2 = n2.c, l2 = n2.d, u2 = n2.e || 0, c2 = n2.f || 0;
    function f2(y2, b2) {
      let w2 = y2 - o2, S2 = b2 - r2, v2 = i2 * w2 + a2 * S2, C = s2 * w2 + l2 * S2;
      return v2 += o2 + u2, C += r2 + c2, [v2, C];
    }
    let d2 = [f2(0, 0), f2(t2, 0), f2(0, e2), f2(t2, e2)], h2 = 1 / 0, m2 = 1 / 0, g2 = -1 / 0, p2 = -1 / 0;
    for (let [y2, b2] of d2) y2 < h2 && (h2 = y2), b2 < m2 && (m2 = b2), y2 > g2 && (g2 = y2), b2 > p2 && (p2 = b2);
    return { minX: h2, minY: m2, maxX: g2, maxY: p2, width: g2 - h2, height: p2 - m2 };
  }
  function Tn(t2, e2, n2) {
    let o2 = (t2.transformOrigin || "0 0").trim().split(/\s+/), [r2, i2] = [o2[0] || "0", o2[1] || "0"], s2 = (a2, l2) => {
      let u2 = a2.toLowerCase();
      return u2 === "left" || u2 === "top" ? 0 : u2 === "center" ? l2 / 2 : u2 === "right" || u2 === "bottom" ? l2 : u2.endsWith("px") ? parseFloat(u2) || 0 : u2.endsWith("%") ? (parseFloat(u2) || 0) * l2 / 100 : /^-?\d+(\.\d+)?$/.test(u2) && parseFloat(u2) || 0;
    };
    return { ox: s2(r2, e2), oy: s2(i2, n2) };
  }
  function ke(t2) {
    let e2 = { rotate: "0deg", scale: null, translate: null }, n2 = null;
    try {
      n2 = typeof t2.computedStyleMap == "function" ? t2.computedStyleMap() : null;
    } catch {
    }
    if (n2) {
      let r2 = (l2) => {
        try {
          return typeof n2.has == "function" && !n2.has(l2) || typeof n2.get != "function" ? null : n2.get(l2);
        } catch {
          return null;
        }
      }, i2 = r2("rotate");
      if (i2) if (i2.angle) {
        let l2 = i2.angle;
        e2.rotate = l2.unit === "rad" ? l2.value * 180 / Math.PI + "deg" : l2.value + l2.unit, i2.is2D === false && i2.x && i2.y && i2.z && (e2.rotate = `${i2.x.value} ${i2.y.value} ${i2.z.value} ${e2.rotate}`);
      } else i2.unit ? e2.rotate = i2.unit === "rad" ? i2.value * 180 / Math.PI + "deg" : i2.value + i2.unit : e2.rotate = String(i2);
      else {
        let l2 = getComputedStyle(t2);
        e2.rotate = l2.rotate && l2.rotate !== "none" ? l2.rotate : "0deg";
      }
      let s2 = r2("scale");
      if (s2) {
        let l2 = (u2) => u2 && u2.value != null ? `${u2.value}${u2.unit === "percent" ? "%" : ""}` : null;
        "x" in s2 && s2.x?.value != null ? e2.scale = [l2(s2.x), l2(s2.y) ?? l2(s2.x), ...s2.is2D === false ? [l2(s2.z) ?? "1"] : []].join(" ") : Array.isArray(s2) ? e2.scale = s2.map(l2).join(" ") : e2.scale = String(s2);
      } else {
        let l2 = getComputedStyle(t2);
        e2.scale = l2.scale && l2.scale !== "none" ? l2.scale : null;
      }
      let a2 = r2("translate");
      if (a2) {
        let l2 = (u2) => u2 && u2.value != null ? `${u2.value}${u2.unit === "percent" ? "%" : u2.unit || "px"}` : null;
        "x" in a2 && a2.x?.value != null ? e2.translate = [l2(a2.x), l2(a2.y) ?? "0px", ...a2.is2D === false ? [l2(a2.z) ?? "0px"] : []].join(" ") : Array.isArray(a2) ? e2.translate = a2.map(l2).join(" ") : e2.translate = String(a2);
      } else {
        let l2 = getComputedStyle(t2);
        e2.translate = l2.translate && l2.translate !== "none" ? l2.translate : null;
      }
      return (!e2.rotate || e2.rotate === "none") && (e2.rotate = "0deg"), (!e2.scale || e2.scale === "none") && (e2.scale = null), (!e2.translate || e2.translate === "none") && (e2.translate = null), e2;
    }
    let o2 = getComputedStyle(t2);
    return e2.rotate = o2.rotate && o2.rotate !== "none" ? o2.rotate : "0deg", e2.scale = o2.scale && o2.scale !== "none" ? o2.scale : null, e2.translate = o2.translate && o2.translate !== "none" ? o2.translate : null, e2;
  }
  function qd() {
    if (Xr?.isConnected) return Xr;
    let t2 = document.createElement("div");
    return t2.id = "snapdom-measure-slot", t2.setAttribute("aria-hidden", "true"), tt(t2), Object.assign(t2.style, { position: "absolute", left: "-99999px", top: "0px", width: "0px", height: "0px", overflow: "hidden", opacity: "0", pointerEvents: "none", contain: "size layout style" }), document.documentElement.appendChild(t2), Xr = t2, t2;
  }
  function de(t2) {
    let e2 = (i2) => {
      let s2 = [], a2 = 0, l2 = 0, u2 = String(i2).trim();
      for (let c2 = 0; c2 < u2.length; c2++) u2[c2] === "(" ? a2++ : u2[c2] === ")" ? a2-- : /\s/.test(u2[c2]) && !a2 && (c2 > l2 && s2.push(u2.slice(l2, c2)), l2 = c2 + 1);
      return l2 < u2.length && s2.push(u2.slice(l2)), s2;
    }, n2 = (i2) => i2 && i2 !== "none", o2 = [];
    if (n2(t2.translate)) {
      let i2 = e2(t2.translate);
      for (let s2 = 0; s2 < 2 && s2 < i2.length; s2++) {
        let a2 = s2 === 0 ? t2.width : t2.height;
        /^[+-]?(?:\d*\.)?\d+%$/.test(i2[s2]) && Number.isFinite(a2) && (i2[s2] = `${parseFloat(i2[s2]) * a2 / 100}px`);
      }
      o2.push(i2.length > 2 ? `translate3d(${i2.join(",")})` : `translate(${i2.join(",")})`);
    }
    if (n2(t2.rotate) && t2.rotate !== "0deg") {
      let i2 = e2(t2.rotate);
      i2.length === 4 ? o2.push(`rotate3d(${i2.join(",")})`) : i2.length === 2 && /^[xyz]$/i.test(i2[0]) ? o2.push(`rotate${i2[0].toUpperCase()}(${i2[1]})`) : o2.push(`rotate(${i2.join(" ")})`);
    }
    if (n2(t2.scale)) {
      let i2 = e2(t2.scale).map((s2) => /%$/.test(s2) ? String(parseFloat(s2) / 100) : s2);
      o2.push(i2.length > 2 ? `scale3d(${i2.join(",")})` : `scale(${i2.join(",")})`);
    }
    if (n2(t2.baseTransform) && o2.push(t2.baseTransform), !o2.length) return new DOMMatrix();
    let r2 = o2.join(" ");
    try {
      if (r2.includes("%")) throw new Error("Transform needs a reference box");
      return new DOMMatrix(r2);
    } catch {
      let i2 = qd(), s2 = document.createElement("div");
      if (s2.style.cssText = "all:initial!important;display:block!important;transform-origin:0 0!important", s2.style.setProperty("width", `${Number.isFinite(t2.width) ? t2.width : 0}px`, "important"), s2.style.setProperty("height", `${Number.isFinite(t2.height) ? t2.height : 0}px`, "important"), s2.style.setProperty("transform", r2, "important"), !s2.style.transform) throw new Error("[SnapDOM] Couldn't read the transform of an element.");
      i2.appendChild(s2);
      try {
        return Xd(s2);
      } finally {
        s2.remove();
      }
    }
  }
  function tl(t2) {
    let e2 = O(t2), n2 = e2.transform || "none";
    if (n2 !== "none" && !/^matrix\(\s*1\s*,\s*0\s*,\s*0\s*,\s*1\s*,\s*0\s*,\s*0\s*\)$/i.test(n2)) return true;
    let r2 = e2.rotate && e2.rotate !== "none" && e2.rotate !== "0deg", i2 = e2.scale && e2.scale !== "none" && e2.scale !== "1", s2 = e2.translate && e2.translate !== "none" && e2.translate !== "0px 0px";
    return !!(r2 || i2 || s2);
  }
  function Xd(t2) {
    let e2 = getComputedStyle(t2).transform;
    if (!e2 || e2 === "none") return new DOMMatrix();
    try {
      return new DOMMatrix(e2);
    } catch {
      return new WebKitCSSMatrix(e2);
    }
  }
  function Mo(t2, e2) {
    if (!e2) return null;
    let n2 = t2.ownerDocument || document, o2 = n2.defaultView || window, r2, i2, s2, a2;
    if (e2 === "viewport") r2 = 0, i2 = 0, s2 = n2.documentElement?.clientWidth || o2.innerWidth, a2 = n2.documentElement?.clientHeight || o2.innerHeight;
    else if (typeof e2 == "object") r2 = (Number(e2.x) || 0) - (o2.scrollX || 0), i2 = (Number(e2.y) || 0) - (o2.scrollY || 0), s2 = Number(e2.width), a2 = Number(e2.height);
    else return null;
    return s2 > 0 && a2 > 0 ? { left: r2, top: i2, width: s2, height: a2, right: r2 + s2, bottom: i2 + a2 } : null;
  }
  function Nn(t2) {
    if (t2.parentElement) return t2.parentElement;
    let e2 = t2.getRootNode && t2.getRootNode();
    return Jt(e2) ? e2.host : null;
  }
  function Yd(t2, e2) {
    for (let n2 = e2; n2; n2 = Nn(n2)) if (n2 === t2) return true;
    return false;
  }
  function Kd(t2, e2) {
    for (let n2 = Nn(t2); n2 && n2 !== e2 && n2?.nodeType === 1; n2 = Nn(n2)) {
      let o2 = O(n2);
      if (o2.position !== "static" || ei(o2)) return n2;
    }
    return null;
  }
  function ei(t2) {
    return t2.transform && t2.transform !== "none" || t2.filter && t2.filter !== "none" || t2.backdropFilter && t2.backdropFilter !== "none" || t2.perspective && t2.perspective !== "none" || /transform|perspective|filter/.test(t2.willChange || "") || /layout|paint|strict|content/.test(t2.contain || "");
  }
  function rl(t2, e2, n2, o2, r2, i2) {
    if (t2.scrollTop || t2.scrollLeft) return;
    let s2 = o2.get(t2) || O(t2);
    if (ei(s2)) return;
    let a2 = s2.position !== "static", l2 = /* @__PURE__ */ new Map();
    for (let [u2, c2] of e2) {
      let f2 = n2.get(u2);
      if (!f2) continue;
      let d2 = l2.get(f2);
      if (d2 === void 0 && l2.set(f2, d2 = Jd.exec(f2)?.[1] || ""), !d2 || d2 === "absolute" && a2 || oi.has(u2)) continue;
      let h2 = false;
      for (let y2 = Nn(c2); y2 && y2 !== t2 && y2.nodeType === 1; y2 = Nn(y2)) {
        let b2 = o2.get(y2) || O(y2);
        if (d2 === "absolute" && b2.position !== "static" || ei(b2)) {
          h2 = true;
          break;
        }
      }
      if (h2) continue;
      let m2 = o2.get(c2) || O(c2), g2 = parseFloat(m2.left), p2 = parseFloat(m2.top);
      r2 && Number.isFinite(g2) && (u2.style.left = `${g2 + r2}px`), i2 && Number.isFinite(p2) && (u2.style.top = `${p2 + i2}px`);
    }
  }
  function ri(t2, e2) {
    try {
      return de({ baseTransform: t2, rotate: e2?.rotate, scale: e2?.scale });
    } catch {
      return null;
    }
  }
  function il(t2, e2, n2, o2, r2) {
    let i2 = t2.getBoundingClientRect();
    Pt(e2) && O(t2).position === "static" && (e2.style.position = "relative");
    let s2 = [];
    for (let [a2, l2] of n2) {
      if (l2?.nodeType !== 1) continue;
      let u2 = a2.localName === "svg" && Nt(a2) && !Nt(l2.parentNode);
      if (!Pt(a2) && !u2 || l2 === t2 || !Yd(t2, l2)) continue;
      let c2 = o2.get(l2) || O(l2), f2 = c2.position;
      if (f2 !== "fixed" && f2 !== "sticky" && f2 !== "-webkit-sticky" || a2.style.position === "absolute") continue;
      let d2 = l2.getBoundingClientRect();
      if (!(d2.width > 0 && d2.height > 0)) continue;
      oi.add(a2);
      let h2 = c2.transform && c2.transform !== "none" ? c2.transform : "", m2 = ke(l2), g2 = !!(h2 || m2.rotate !== "0deg" || m2.scale || m2.translate), p2 = g2 ? ri(h2, m2) : null, y2 = !p2 || !p2.is2D || p2.a === 1 && p2.b === 0 && p2.c === 0 && p2.d === 1, b2 = d2.width, w2 = d2.height;
      y2 || (b2 = l2.offsetWidth || d2.width, w2 = l2.offsetHeight || d2.height);
      let S2 = l2.getRootNode && Jt(l2.getRootNode()), v2 = i2, C = t2.clientLeft || 0, M = t2.clientTop || 0;
      if (S2) {
        let _2 = Kd(l2, t2);
        _2 && (v2 = _2.getBoundingClientRect(), C = _2.clientLeft || 0, M = _2.clientTop || 0);
      }
      let $2 = d2.left - v2.left - C, F = d2.top - v2.top - M;
      if (g2) if (a2.style.translate = "none", a2.style.rotate = "none", a2.style.scale = "none", y2) a2.style.transform = "none";
      else {
        a2.style.transform = `matrix(${p2.a},${p2.b},${p2.c},${p2.d},0,0)`;
        let { ox: _2, oy: P } = Tn(c2, b2, w2), E = tn(b2, w2, { a: p2.a, b: p2.b, c: p2.c, d: p2.d, e: 0, f: 0 }, _2, P);
        $2 -= E.minX, F -= E.minY;
      }
      if (f2 !== "fixed") {
        let _2 = a2.cloneNode(false);
        _2.setAttribute("data-snap-ph", "1"), _2.style.position = "static", _2.style.visibility = "hidden", _2.style.width = `${b2}px`, _2.style.height = `${w2}px`, _2.style.boxSizing = "border-box", a2.parentElement?.insertBefore(_2, a2);
      }
      let A = u2 ? b2 : b2 + 2, x2 = w2;
      r2 && (Math.abs(F - r2.y) < 0.5 && (F -= 1, x2 += 1), Math.abs($2 - r2.x) < 0.5 && ($2 -= 1, A += 1)), a2.style.position = "absolute", a2.style.left = `${$2}px`, a2.style.top = `${F}px`, a2.style.right = "auto", a2.style.bottom = "auto", a2.style.margin = "0", a2.style.width = `${A}px`, a2.style.height = `${x2}px`, a2.style.boxSizing = "border-box", S2 || s2.push(a2);
    }
    for (let a2 of s2) e2.appendChild(a2);
  }
  function sl(t2, e2, n2 = {}) {
    if (!t2 || !e2 || !e2.style) return;
    let o2 = getComputedStyle(t2);
    try {
      e2.style.boxShadow = "none";
    } catch (s2) {
      D(n2, "Couldn't remove the root box-shadow.", s2);
    }
    try {
      e2.style.textShadow = "none";
    } catch (s2) {
      D(n2, "Couldn't remove the root text-shadow.", s2);
    }
    try {
      e2.style.outline = "none";
    } catch (s2) {
      D(n2, "Couldn't remove the root outline.", s2);
    }
    let i2 = (o2.filter || "").replace(/\bdrop-shadow\((?:[^()]|\([^()]*\))*\)\s*/gi, "").trim().replace(/\s+/g, " ");
    try {
      e2.style.filter = i2.length ? i2 : "none";
    } catch (s2) {
      D(n2, "Couldn't remove the root drop-shadow filter.", s2);
    }
  }
  function al(t2, e2) {
    if (!t2 || !e2 || !e2.style) return;
    let n2 = 1;
    try {
      n2 = parseFloat(getComputedStyle(t2).zoom);
    } catch {
      return;
    }
    if (!(!e2.style.getPropertyValue("zoom") && (!Number.isFinite(n2) || n2 === 1))) try {
      e2.style.setProperty("zoom", "1", "important");
    } catch {
    }
  }
  function el(t2) {
    let e2 = t2.display || "";
    if (e2.includes("flex") || e2.includes("grid") || e2.startsWith("table") || e2 === "inline-block" || e2 === "flow-root" || t2.position === "absolute" || t2.position === "fixed" || t2.float && t2.float !== "none") return true;
    let n2 = t2.overflowX || t2.overflow || "visible", o2 = t2.overflowY || t2.overflow || "visible";
    return !!(n2 !== "visible" || o2 !== "visible" || t2.contain && /\b(layout|content|paint|strict)\b/.test(t2.contain));
  }
  function ll(t2, e2) {
    let n2 = Array.from(t2.childNodes), o2 = e2 === "top" ? n2 : n2.reverse();
    for (let r2 of o2) {
      if (r2.nodeType === Node.TEXT_NODE) {
        if (/\S/.test(r2.textContent || "")) return null;
        continue;
      }
      if (r2.nodeType !== Node.ELEMENT_NODE) continue;
      let i2 = getComputedStyle(r2), s2 = String(i2.display || "");
      if (s2 !== "none") {
        if (s2 === "contents") {
          let a2 = ll(r2, e2);
          if (a2 !== void 0) return a2;
          continue;
        }
        if (!(i2.position === "absolute" || i2.position === "fixed")) return i2.float && i2.float !== "none" || s2.startsWith("inline") ? null : r2;
      }
    }
  }
  function cl(t2, e2, n2, o2 = null) {
    if (!t2 || !e2 || !e2.style) return;
    let r2 = getComputedStyle(t2);
    if (!el(r2)) for (let i2 of ["top", "bottom"]) {
      let s2 = i2 === "top" ? "Top" : "Bottom";
      if ((parseFloat(r2[`border${s2}Width`]) || 0) > 0 || (parseFloat(r2[`padding${s2}`]) || 0) > 0) continue;
      let a2 = t2, l2 = e2;
      for (; a2 && l2; ) {
        let u2 = ll(a2, i2);
        if (!u2) break;
        let c2 = n2 ? Array.from(l2.children).find((h2) => n2.get(h2) === u2) || o2?.get(u2) || null : l2.children[Array.from(a2.children).indexOf(u2)] || null, f2 = getComputedStyle(u2), d2 = parseFloat(f2[`margin${s2}`]) || 0;
        if (c2 && c2.style && d2 > 0 && (c2.style[`margin${s2}`] = "0px"), el(f2) || (parseFloat(f2[`border${s2}Width`]) || 0) > 0 || (parseFloat(f2[`padding${s2}`]) || 0) > 0) break;
        a2 = u2, l2 = c2;
      }
    }
  }
  function Zd(t2, e2) {
    if (t2.startsWith("*") || t2 === "xmlns" || t2.includes("@")) return true;
    if (t2.includes(":")) {
      let n2 = t2.split(":", 1)[0];
      if (!Qd.has(n2)) return true;
    }
    return e2 ? t2.startsWith("x-") || t2.startsWith("v-") || t2.startsWith(":") || t2.startsWith("on:") || t2.startsWith("bind:") || t2.startsWith("let:") || t2.startsWith("class:") : false;
  }
  function Ao(t2, e2 = {}) {
    if (!t2) return;
    let { stripFrameworkDirectives: n2 = true } = e2, o2 = (a2) => {
      for (let l2 of Array.from(a2.attributes)) {
        if (Zd(l2.name, n2)) {
          a2.removeAttribute(l2.name);
          continue;
        }
        if (ep.test(l2.value)) continue;
        let u2 = nl(l2.value);
        if (u2 !== l2.value) try {
          a2.setAttribute(l2.name, u2);
        } catch {
        }
      }
    };
    t2.nodeType === Node.ELEMENT_NODE && o2(t2);
    let r2 = [], i2 = document.createTreeWalker(t2, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT | NodeFilter.SHOW_COMMENT), s2;
    for (; s2 = i2.nextNode(); ) if (s2.nodeType === Node.ELEMENT_NODE) o2(s2);
    else if (s2.nodeType === Node.COMMENT_NODE) r2.push(s2);
    else {
      let a2 = nl(s2.data);
      a2 !== s2.data && (s2.data = a2);
    }
    for (let a2 of r2) a2.remove();
  }
  function np(t2) {
    try {
      let e2 = t2.getAttribute?.("style") || "";
      return /\b(height|width|block-size|inline-size)\s*:/.test(e2);
    } catch {
      return false;
    }
  }
  function rp(t2) {
    return Nt(t2) || op.has(t2?.localName);
  }
  function ip(t2, e2) {
    if (t2?.nodeType !== 1 || np(t2) || rp(t2)) return false;
    let n2 = e2.position;
    if (n2 === "absolute" || n2 === "fixed" || n2 === "sticky") return false;
    let o2 = e2.display || "";
    return !(o2.includes("flex") || o2.includes("grid") || o2.startsWith("table") || e2.transform && e2.transform !== "none");
  }
  function fl(t2, e2, n2 = /* @__PURE__ */ new Map(), o2 = null) {
    function r2(i2, s2) {
      if (i2?.nodeType !== 1 || s2?.nodeType !== 1) return;
      let a2 = i2.childElementCount > s2.childElementCount, l2 = n2.get(i2) || getComputedStyle(i2);
      if (n2.has(i2) || n2.set(i2, l2), a2 && ip(i2, l2)) {
        s2.style.height || (s2.style.height = "auto"), s2.style.width || (s2.style.width = "auto"), s2.style.removeProperty("block-size"), s2.style.removeProperty("inline-size"), s2.style.minHeight || (s2.style.minHeight = "0"), s2.style.minWidth || (s2.style.minWidth = "0"), s2.style.maxHeight || (s2.style.maxHeight = "none"), s2.style.maxWidth || (s2.style.maxWidth = "none");
        let c2 = l2.overflowY || l2.overflowBlock || "visible", f2 = l2.overflowX || l2.overflowInline || "visible";
        (c2 !== "visible" || f2 !== "visible") && (s2.style.overflow = "visible");
      }
      let u2 = Array.from(s2.children);
      if (o2) for (let c2 of u2) {
        let f2 = o2.get(c2);
        f2 && f2.nodeType === 1 && r2(f2, c2);
      }
      else {
        let c2 = Array.from(i2.children);
        for (let f2 = 0; f2 < Math.min(c2.length, u2.length); f2++) r2(c2[f2], u2[f2]);
      }
    }
    r2(t2, e2);
  }
  function sp2(t2) {
    let e2 = getComputedStyle(t2);
    return !(e2.display === "none" || e2.position === "absolute" || e2.position === "fixed");
  }
  function ap(t2, e2) {
    if (t2?.nodeType !== 1) return false;
    if (t2.getAttribute("data-capture") === "exclude") return e2?.excludeMode === "remove";
    if (Array.isArray(e2?.exclude)) for (let n2 of e2.exclude) try {
      if (t2.matches(n2)) return e2.excludeMode === "remove";
    } catch (o2) {
      D(e2, "Invalid exclude selector; ignored.", o2);
    }
    if (Array.isArray(e2?.excludePredicates)) for (let n2 of e2.excludePredicates) try {
      if (n2(t2)) return e2.excludeMode === "remove";
    } catch (o2) {
      D(e2, "Your exclude function threw; ignored.", o2);
    }
    if (typeof e2?.filter == "function" && e2.filterMode === "remove") try {
      if (!e2.filter(t2)) return true;
    } catch (n2) {
      D(e2, "Your filter function threw; ignored.", n2);
    }
    return false;
  }
  function ii(t2, e2) {
    let n2 = getComputedStyle(t2), o2 = t2.getBoundingClientRect(), r2 = 1 / 0, i2 = -1 / 0, s2 = false, a2 = Array.from(t2.children);
    for (let h2 of a2) {
      if (ap(h2, e2) || !sp2(h2)) continue;
      let m2 = h2.getBoundingClientRect(), g2 = m2.top - o2.top, p2 = m2.bottom - o2.top;
      p2 <= g2 || (g2 < r2 && (r2 = g2), p2 > i2 && (i2 = p2), s2 = true);
    }
    let l2 = s2 ? Math.max(0, i2 - r2) : 0, u2 = parseFloat(n2.borderTopWidth) || 0, c2 = parseFloat(n2.borderBottomWidth) || 0, f2 = parseFloat(n2.paddingTop) || 0, d2 = parseFloat(n2.paddingBottom) || 0;
    return u2 + c2 + f2 + d2 + l2;
  }
  function si(t2) {
    let e2 = document.implementation.createHTMLDocument(""), n2 = e2.importNode(t2, true);
    for (let o2 of [n2, ...n2.querySelectorAll("*")]) {
      let r2 = o2.localName.includes("-");
      if (!Pt(o2) || !(r2 || o2.hasAttribute("is"))) continue;
      let i2 = e2.createElement(r2 ? "span" : o2.localName);
      for (let s2 of o2.attributes) s2.name !== "is" && i2.setAttribute(s2.name, s2.value);
      i2.append(...o2.childNodes), o2 === n2 ? n2 = i2 : o2.replaceWith(i2);
    }
    return n2;
  }
  function Ln(t2, e2) {
    try {
      let n2 = new t2.ownerDocument.defaultView.CSSStyleSheet();
      n2.replaceSync(e2), t2.adoptedStyleSheets = [n2];
    } catch {
      let n2 = t2.ownerDocument.createElement("style");
      n2.textContent = e2, t2.appendChild(n2);
    }
  }
  function ul(t2, e2, n2, o2, r2, i2) {
    let s2 = t2.ownerDocument || document, a2 = t2.getBoundingClientRect(), l2 = r2 > 0 && a2.width > 0 ? a2.width / r2 : 1, u2 = i2 > 0 && a2.height > 0 ? a2.height / i2 : 1;
    if (Math.abs(l2 - u2) > 0.02) return 0;
    let c2 = s2.createElement("div");
    tt(c2), c2.style.cssText = "position:absolute!important;left:-9999px!important;top:0!important;width:" + r2 + "px!important;overflow:visible!important;visibility:hidden!important;";
    let f2 = c2.attachShadow({ mode: "open" });
    Ln(f2, n2);
    let d2 = si(e2);
    f2.appendChild(d2), s2.body.appendChild(c2);
    let h2 = 0, m2 = ["paddingLeft", "paddingRight", "borderLeftWidth", "borderRightWidth"], g2 = ["paddingTop", "paddingBottom", "borderTopWidth", "borderBottomWidth"], p2 = (y2, b2, w2) => {
      let S2 = O(y2), v2 = S2.boxSizing === "border-box", C = (M, $2, F) => {
        let A = parseFloat(M);
        if (!Number.isFinite(A)) return $2;
        let x2 = 0;
        if (!v2) for (let P of F) x2 += parseFloat(S2[P]) || 0;
        let _2 = A + x2;
        return Math.abs(_2 - $2) <= 0.51 ? _2 : $2;
      };
      return { width: C(S2.width, b2, m2), height: C(S2.height, w2, g2) };
    };
    try {
      let y2 = d2.getBoundingClientRect(), b2 = d2.offsetWidth || r2, w2 = d2.offsetHeight || i2, S2 = b2 > 0 && y2.width > 0 ? y2.width / b2 : 1, v2 = w2 > 0 && y2.height > 0 ? y2.height / w2 : 1, C = (M, $2, F = false) => {
        let A = M.children, x2 = $2.children, _2 = Math.min(A.length, x2.length);
        for (let P = 0; P < _2; P++) {
          let E = A[P], R = x2[P], L = o2.get(E), k = F || oi.has(E);
          if (L?.nodeType === 1 && Pt(E) && E.style && L.isConnected) {
            let I = L.getBoundingClientRect();
            if (I.width > 0 && I.height > 0) {
              let W = R.getBoundingClientRect(), T = I.width / l2, N = I.height / u2, U = W.width, z = W.height, V = L.offsetWidth || T, B = L.offsetHeight || N, rt = R.offsetWidth || U, at = R.offsetHeight || z, pt = Math.abs(T - V) > en || Math.abs(N - B) > en || Math.abs(U - rt) > en || Math.abs(z - at) > en;
              if (k) {
                let yt = p2(R, rt, at);
                T = U > 0 ? T * S2 * yt.width / U : T, N = z > 0 ? N * v2 * yt.height / z : N, U = yt.width, z = yt.height;
              } else if (pt) {
                let yt = p2(L, V, B), It = p2(R, rt, at);
                T = yt.width, N = yt.height, U = It.width, z = It.height;
              }
              let St = U - T, ee = z - N;
              (Math.abs(St) > en || Math.abs(ee) > en) && (E.style.boxSizing = "border-box", E.style.width = `${H(T)}px`, E.style.height = `${H(N)}px`, h2++);
            }
          }
          C(E, R, k);
        }
      };
      C(e2, d2);
    } finally {
      c2.remove();
    }
    return h2;
  }
  function ni(t2, e2 = /* @__PURE__ */ new Set()) {
    let n2 = "";
    if (!t2) return n2;
    for (let o2 = 0; o2 < t2.length; o2++) {
      let r2 = t2[o2];
      try {
        if (r2.type === CSSRule.IMPORT_RULE && r2.styleSheet) {
          n2 += ni(r2.styleSheet.cssRules, e2);
          continue;
        }
        if (r2.type === CSSRule.MEDIA_RULE && r2.cssRules) {
          let i2 = ni(r2.cssRules, e2);
          i2 && (n2 += `@media ${r2.conditionText}{${i2}}`);
          continue;
        }
        if (r2.type === CSSRule.STYLE_RULE) {
          let i2 = r2.selectorText || "";
          if (lp.test(i2)) {
            let s2 = r2.cssText;
            s2 && !e2.has(s2) && (e2.add(s2), n2 += s2);
          }
        }
      } catch {
      }
    }
    return n2;
  }
  function cp(t2) {
    let e2 = "";
    for (let n2 of t2.styleSheets) {
      let o2 = -1;
      try {
        o2 = n2.cssRules ? n2.cssRules.length : -1;
      } catch {
      }
      e2 += (n2.href || "inline") + ":" + o2 + "|";
    }
    return e2;
  }
  function fp(t2) {
    if (!t2 || !t2.styleSheets) return "";
    let e2 = cp(t2), n2 = ol.get(t2);
    if (n2 && n2.fp === e2) return n2.css;
    let o2 = /* @__PURE__ */ new Set(), r2 = "";
    for (let i2 of Array.from(t2.styleSheets)) try {
      let s2 = i2.cssRules;
      s2 && (r2 += ni(s2, o2));
    } catch {
    }
    return ol.set(t2, { fp: e2, css: r2 }), r2;
  }
  function _o(t2, e2, n2) {
    let o2 = br(t2.clone).sort(), r2 = o2.join(","), i2 = j.baseStyle.get(r2), s2;
    i2 && i2.universe === n2 ? s2 = i2.css : (s2 = wr(o2, n2), j.baseStyle.set(r2, { universe: n2, css: s2 }));
    let a2 = fp(t2.element?.ownerDocument || document);
    return t2.fontsCSS = e2, t2.baseCSS = s2, t2.scrollbarCSS = a2, { baseCSS: s2, scrollbarCSS: a2, fontsCSS: e2 };
  }
  function dl(t2, e2, n2) {
    let o2 = null;
    for (let [r2, i2] of up) {
      let s2 = n2.getPropertyValue(r2);
      if (!s2.includes("%")) continue;
      if (n2.writingMode !== "horizontal-tb") return;
      o2 || (o2 = dp(t2, n2));
      let a2 = i2 === "x" ? o2.w : o2.h, l2 = s2.replace(/(-?\d*\.?\d+(?:e[+-]?\d+)?)%/gi, (c2, f2) => `${a2 * f2 / 100}px`), u2 = parseFloat(i2 === "x" ? n2.width : n2.height);
      e2.style.setProperty(r2, Number.isFinite(u2) ? `${r2.slice(0, 3)}(${l2}, ${u2}px)` : l2);
    }
  }
  function dp(t2, e2) {
    let n2 = t2.ownerDocument, o2 = n2.documentElement, r2 = { w: o2.clientWidth, h: o2.clientHeight };
    if (e2.position === "fixed") return r2;
    if (e2.position === "absolute") {
      let l2 = t2.offsetParent;
      return !l2 || (l2 === n2.body || l2 === o2) && getComputedStyle(l2).position === "static" ? r2 : { w: l2.clientWidth, h: l2.clientHeight };
    }
    let i2 = t2.parentElement;
    if (!i2) return r2;
    let s2 = getComputedStyle(i2), a2 = (l2) => parseFloat(s2.getPropertyValue(l2)) || 0;
    return { w: i2.clientWidth - a2("padding-left") - a2("padding-right"), h: i2.clientHeight - a2("padding-top") - a2("padding-bottom") };
  }
  function Il() {
    try {
      let t2 = document.createElement("canvas").getContext("2d");
      if (t2 && typeof t2.drawElementImage == "function") return "drawElementImage";
    } catch {
    }
    return null;
  }
  function ph(t2, e2, n2, o2) {
    let r2 = document.createElement("canvas");
    r2.setAttribute("layoutsubtree", ""), r2.setAttribute("content", "drawable"), tt(r2), r2.style.cssText = "position:fixed;top:0;left:0;z-index:-2147483647;pointer-events:none";
    let i2 = document.createElement("div");
    i2.setAttribute("drawable", ""), i2.style.cssText = `all:initial;box-sizing:border-box;display:block;overflow:visible;width:${n2}px;height:${o2}px`;
    let s2 = i2.attachShadow({ mode: "open" });
    return Ln(s2, e2), s2.appendChild(t2), r2.appendChild(i2), { canvas: r2, wrapper: i2 };
  }
  async function hh(t2, e2) {
    let n2 = Il();
    if (!n2) return null;
    let o2 = t2.element, r2 = t2.clone;
    if (!o2 || !r2) return null;
    let i2 = o2.ownerDocument || document;
    if (!o2.isConnected || i2 !== document || o2 === i2.body || o2 === i2.documentElement || o2.scrollTop || o2.scrollLeft || e2.outerShadows || e2.clip || e2.excludeMode === "remove" || typeof e2.filter == "function" && e2.filterMode === "remove" || e2.width != null || e2.height != null) return null;
    try {
      for (let v2 = o2; v2; v2 = v2.assignedSlot || v2.parentElement || v2.getRootNode?.().host) {
        let C = getComputedStyle(v2);
        if (C.transform && C.transform !== "none" || C.rotate && C.rotate !== "none" || C.scale && C.scale !== "none" || C.translate && C.translate !== "none" || v2 === o2 && C.filter && C.filter !== "none") return null;
        let M = C.getPropertyValue("zoom");
        if (M && Number.isFinite(parseFloat(M)) && Math.abs(parseFloat(M) - 1) > 1e-4) return null;
      }
    } catch {
      return null;
    }
    let s2 = o2.getBoundingClientRect(), a2 = Math.max(1, s2.width || o2.offsetWidth || 1), l2 = Math.max(1, s2.height || o2.offsetHeight || 1), u2 = o2.offsetWidth || Math.ceil(a2), c2 = o2.offsetHeight || Math.ceil(l2), f2 = Number.isFinite(e2.scale) && e2.scale > 0 ? e2.scale : 1, d2 = Number.isFinite(e2.dpr) && e2.dpr > 0 ? e2.dpr : window.devicePixelRatio || 1, h2 = Math.max(1, Math.round(u2 * f2 * d2)), m2 = Math.max(1, Math.round(c2 * f2 * d2)), g2 = (t2.scrollbarCSS || "") + (t2.baseCSS || "") + (t2.fontsCSS || "") + (t2.classCSS || ""), { canvas: p2, wrapper: y2 } = ph(r2, g2, a2, l2);
    p2.width = h2, p2.height = m2, document.body.appendChild(p2);
    let b2;
    try {
      p2.getBoundingClientRect(), await new Promise((F) => {
        requestAnimationFrame(() => setTimeout(F, 0)), setTimeout(F, 50);
      });
      let v2 = p2.getContext("2d"), C = v2 && v2[n2];
      if (typeof C != "function") return null;
      v2.save(), v2.scale(d2 * f2, d2 * f2), C.call(v2, y2, 0, 0, a2, l2), v2.restore();
      let M;
      try {
        M = v2.getImageData(0, 0, Math.min(64, h2), Math.min(64, m2)).data;
      } catch {
        return D(e2, `html-in-canvas: ${n2} tainted the canvas; used the SVG engine.`), null;
      }
      let $2 = false;
      for (let F = 3; F < M.length; F += 4) if (M[F] > 0) {
        $2 = true;
        break;
      }
      if (!$2) {
        let F = v2.getImageData(0, 0, h2, m2).data, A = false;
        for (let x2 = 3; x2 < F.length; x2 += 4) if (F[x2] > 0) {
          A = true;
          break;
        }
        if (!A) return null;
      }
      b2 = document.createElement("canvas"), b2.width = h2, b2.height = m2, b2.getContext("2d").drawImage(p2, 0, 0), b2.style.width = `${u2 * f2}px`, b2.style.height = `${c2 * f2}px`;
    } catch (v2) {
      return D(e2, "html-in-canvas: the browser couldn't paint it; used the SVG engine.", v2), null;
    } finally {
      try {
        p2.remove();
      } catch {
      }
    }
    let w2 = Object.freeze({ w0: a2, h0: l2, vbW: u2, vbH: c2, targetW: a2, targetH: l2, contentX: 0, contentY: 0, clip: null });
    Object.defineProperty(e2, "meta", { value: w2, enumerable: true, writable: false, configurable: true }), e2.__artifacts = { classCSS: t2.classCSS || "", fontsCSS: t2.fontsCSS || "", baseCSS: t2.baseCSS || "", scrollbarCSS: t2.scrollbarCSS || "" }, t2.clone = t2.nodeMap = t2.styleCache = t2.svgString = null;
    let S2 = [...document.querySelectorAll("#snapdom-sandbox")].find(Xt);
    return S2 && S2.style.position === "absolute" && S2.remove(), b2;
  }
  function Dh(t2, e2) {
    let n2 = e2.__session;
    try {
      let o2 = t2.match(/<svg\b[^>]*>/i);
      if (!o2) return t2;
      let r2 = o2[0], i2 = parseFloat((r2.match(/\bwidth="([\d.]+)/i) || [])[1]), s2 = parseFloat((r2.match(/\bheight="([\d.]+)/i) || [])[1]);
      if (!Number.isFinite(i2) || !Number.isFinite(s2) || i2 <= 0 || s2 <= 0) return t2;
      let a2 = Math.min(1, jt / i2, jt / s2, Math.sqrt(he / (i2 * s2)));
      if (a2 >= 1) return t2;
      let l2 = Math.max(1, Math.floor(i2 * a2)), u2 = Math.max(1, Math.floor(s2 * a2));
      return nt(n2, "raster-clamp", `capture ${Math.round(i2)}x${Math.round(s2)}px exceeds decode limits; downscaled to ${l2}x${u2}px`), D(e2, `${Math.round(i2)}\xD7${Math.round(s2)}px is too large for the browser to draw; scaled down to ${l2}\xD7${u2}px. For full size, export ${typeof CompressionStream == "function" ? "a PNG or JPEG" : "a JPEG"} blob, an SVG, or crop.`), t2.replace(r2, r2.replace(/(\bwidth=")[\d.]+/i, `$1${l2}`).replace(/(\bheight=")[\d.]+/i, `$1${u2}`));
    } catch {
      return t2;
    }
  }
  function Jo(t2, e2, { shiftContent: n2 = Y() } = {}) {
    let o2 = ["x", "y", "width", "height"].map((F) => Number(e2?.[F]));
    if (!o2.every(Number.isFinite) || o2[2] <= 0 || o2[3] <= 0) throw new RangeError("[SnapDOM] crop needs finite x/y and a positive width/height.");
    let r2 = t2.match(/<svg\b[^>]*>/i);
    if (!r2) throw new Error("[SnapDOM] Only SVG captures can be cropped.");
    let i2 = r2[0], s2 = (i2.match(/\bviewBox="([^"]+)"/i) || [])[1], a2 = String(s2 || "").trim().split(/[\s,]+/).map(Number);
    if (a2.length !== 4 || !a2.every(Number.isFinite) || a2[2] <= 0 || a2[3] <= 0) throw new Error("[SnapDOM] Can't crop: the SVG has no valid viewBox.");
    let [l2, u2, c2, f2] = a2, d2 = Math.max(l2, o2[0]), h2 = Math.max(u2, o2[1]), m2 = Math.min(l2 + c2, o2[0] + o2[2]), g2 = Math.min(u2 + f2, o2[1] + o2[3]);
    if (!(m2 > d2) || !(g2 > h2)) throw new RangeError("[SnapDOM] The crop area does not intersect the capture.");
    let p2 = parseFloat((i2.match(/\bwidth="([\d.]+)/i) || [])[1]), y2 = parseFloat((i2.match(/\bheight="([\d.]+)/i) || [])[1]), b2 = Number.isFinite(p2) && p2 > 0 ? p2 / c2 : 1, w2 = Number.isFinite(y2) && y2 > 0 ? y2 / f2 : 1, S2 = Math.max(1, (m2 - d2) * b2), v2 = Math.max(1, (g2 - h2) * w2), C = i2.replace(/(\bwidth=")[^"]*/i, `$1${S2}`).replace(/(\bheight=")[^"]*/i, `$1${v2}`), M = n2 ? Bh(t2, i2, d2, h2) : null;
    if (M) return C.replace(/(\bviewBox=")[^"]*/i, (A, x2) => `${x2}0 0 ${m2 - d2} ${g2 - h2}`) + M.slice(i2.length);
    let $2 = C.replace(/(\bviewBox=")[^"]*/i, `$1${d2} ${h2} ${m2 - d2} ${g2 - h2}`);
    return t2.replace(i2, $2);
  }
  function Bh(t2, e2, n2, o2) {
    if (!t2.startsWith(e2)) return null;
    let r2 = /^\s*<foreignObject\b[^>]*>/i.exec(t2.slice(e2.length, e2.length + 2048));
    if (!r2) return null;
    let i2 = r2[0], s2 = (u2, c2, f2) => {
      let d2 = new RegExp(`(\\s${c2}=")([^"]*)`), h2 = u2.match(d2), m2 = h2 ? parseFloat(h2[2]) : 0;
      return Number.isFinite(m2) ? h2 ? u2.replace(d2, (g2, p2) => `${p2}${m2 - f2}`) : u2.replace(/^(\s*<foreignObject\b)/i, (g2, p2) => `${p2} ${c2}="${-f2}"`) : null;
    }, a2 = s2(i2, "x", n2), l2 = a2 && s2(a2, "y", o2);
    return l2 ? e2 + l2 + t2.slice(e2.length + i2.length) : null;
  }
  function Ni(t2, e2, n2) {
    let o2 = t2.match(/<svg\b[^>]*>/i);
    if (!o2) return null;
    let r2 = o2[0], i2 = String((r2.match(/\bviewBox="([^"]+)"/i) || [])[1] || "").trim().split(/[\s,]+/).map(Number);
    if (i2.length !== 4 || !i2.every(Number.isFinite) || i2[2] <= 0 || i2[3] <= 0) return null;
    let s2 = Math.min(e2 / i2[2], n2 / i2[3]), a2 = /^\s*<foreignObject\b[^>]*>/i.exec(t2.slice(r2.length, r2.length + 2048));
    if (!a2) return null;
    let l2 = a2[0], u2 = { x: (e2 - s2 * i2[2]) / 2, y: (n2 - s2 * i2[3]) / 2 };
    for (let p2 of ["x", "y", "width", "height"]) {
      let y2 = new RegExp(`(\\s${p2}=")([^"]*)`), b2 = l2.match(y2), w2 = b2 ? parseFloat(b2[2]) : 0;
      if (!Number.isFinite(w2)) return null;
      let S2 = w2 * s2 + (u2[p2] || 0);
      l2 = b2 ? l2.replace(y2, (v2, C) => `${C}${S2}`) : l2.replace(/^(\s*<foreignObject\b)/i, (v2, C) => `${C} ${p2}="${S2}"`);
    }
    let c2 = t2.slice(r2.length + a2[0].length), f2 = c2.indexOf("</style>"), d2 = /<div\b[^>]*?( style=")([^"]*)"/i.exec(c2.slice(f2 < 0 ? 0 : f2));
    if (!d2) return null;
    let h2 = (f2 < 0 ? 0 : f2) + d2.index, m2 = c2.slice(0, h2) + d2[0].slice(0, -1) + `;zoom:${s2} !important"` + c2.slice(h2 + d2[0].length);
    return r2.replace(/(\bwidth=")[^"]*/i, `$1${e2}`).replace(/(\bheight=")[^"]*/i, `$1${n2}`).replace(/(\bviewBox=")[^"]*/i, `$10 0 ${e2} ${n2}`) + l2 + m2;
  }
  function Ri(t2) {
    return typeof t2 == "string" && /^data:image\/svg\+xml/i.test(t2);
  }
  function Ee(t2) {
    let e2 = t2.indexOf(",");
    return e2 >= 0 ? decodeURIComponent(t2.slice(e2 + 1)) : "";
  }
  function Qo(t2) {
    let e2 = t2.indexOf(",");
    if (e2 < 0) return "";
    let n2 = t2.slice(e2 + 1, e2 + 1201).replace(/%[0-9A-Fa-f]?$/, "");
    try {
      return decodeURIComponent(n2);
    } catch {
      return "";
    }
  }
  function Re(t2) {
    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(t2)}`;
  }
  function pc(t2) {
    let e2 = [], n2 = "", o2 = 0;
    for (let r2 = 0; r2 < t2.length; r2++) {
      let i2 = t2[r2];
      i2 === "(" && o2++, i2 === ")" && (o2 = Math.max(0, o2 - 1)), i2 === ";" && o2 === 0 ? (e2.push(n2), n2 = "") : n2 += i2;
    }
    return n2.trim() && e2.push(n2), e2.map((r2) => r2.trim()).filter(Boolean);
  }
  function zh(t2) {
    let e2 = [], n2 = "", o2 = 0;
    for (let i2 = 0; i2 < t2.length; i2++) {
      let s2 = t2[i2];
      s2 === "(" && o2++, s2 === ")" && (o2 = Math.max(0, o2 - 1)), s2 === "," && o2 === 0 ? (e2.push(n2.trim()), n2 = "") : n2 += s2;
    }
    n2.trim() && e2.push(n2.trim());
    let r2 = [];
    for (let i2 of e2) {
      if (/\binset\b/i.test(i2)) continue;
      let s2 = i2.match(/-?\d+(?:\.\d+)?px/gi) || [], [a2 = "0px", l2 = "0px", u2 = "0px"] = s2;
      u2 = `${parseFloat(u2) / 2}px`;
      let c2 = i2.replace(/-?\d+(?:\.\d+)?px/gi, "").replace(/\binset\b/ig, "").trim().replace(/\s{2,}/g, " "), f2 = !!c2 && c2 !== ",";
      r2.push(`drop-shadow(${a2} ${l2} ${u2}${f2 ? ` ${c2}` : ""})`);
    }
    return r2.join(" ");
  }
  function hc(t2) {
    let e2 = pc(t2), n2 = null, o2 = null, r2 = null, i2 = [];
    for (let a2 of e2) {
      let l2 = a2.indexOf(":");
      if (l2 < 0) continue;
      let u2 = a2.slice(0, l2).trim().toLowerCase(), c2 = a2.slice(l2 + 1).trim();
      u2 === "box-shadow" ? r2 = c2 : u2 === "filter" ? n2 = c2 : u2 === "-webkit-filter" ? o2 = c2 : i2.push([u2, c2]);
    }
    if (r2) {
      let a2 = zh(r2);
      a2 && (n2 = n2 ? `${n2} ${a2}` : a2, o2 = o2 ? `${o2} ${a2}` : a2);
    }
    let s2 = [...i2];
    return n2 && s2.push(["filter", n2]), o2 && s2.push(["-webkit-filter", o2]), s2.map(([a2, l2]) => `${a2}:${l2}`).join(";");
  }
  function Uh(t2) {
    return t2.replace(/([^{}]+)\{([^}]*)\}/g, (e2, n2, o2) => `${n2}{${hc(o2)}}`);
  }
  function Hh(t2) {
    return t2 = t2.replace(/<style[^>]*>([\s\S]*?)<\/style>/gi, (e2, n2) => e2.replace(n2, Uh(n2))), t2 = t2.replace(/style=(['"])([\s\S]*?)\1/gi, (e2, n2, o2) => `style=${n2}${hc(o2)}${n2}`), t2;
  }
  function jh() {
    return qo || (qo = (async () => {
      try {
        let t2 = '<svg xmlns="http://www.w3.org/2000/svg" width="8" height="20"><foreignObject width="8" height="20"><div xmlns="http://www.w3.org/1999/xhtml" style="width:4px;height:4px;margin-top:8px;background:#000;box-shadow:0 8px 0 0 #000"></div></foreignObject></svg>', e2 = new Image();
        e2.decoding = "sync", e2.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(t2)}`, await e2.decode();
        let n2 = document.createElement("canvas");
        n2.width = 8, n2.height = 20;
        let o2 = n2.getContext("2d", { willReadFrequently: true });
        o2.drawImage(e2, 0, 0);
        let r2 = o2.getImageData(2, 18, 1, 1).data[3] > 128, i2 = o2.getImageData(2, 2, 1, 1).data[3] > 128;
        return { native: r2 || i2, flippedY: i2 && !r2 };
      } catch {
        return { native: false, flippedY: false };
      }
    })(), qo);
  }
  function Vh(t2) {
    let e2 = [], n2 = 0, o2 = 0;
    for (let r2 = 0; r2 < t2.length; r2++) {
      let i2 = t2[r2];
      i2 === "(" ? n2++ : i2 === ")" ? n2 = Math.max(0, n2 - 1) : i2 === "," && n2 === 0 && (e2.push(t2.slice(o2, r2)), o2 = r2 + 1);
    }
    return e2.push(t2.slice(o2)), e2.map((r2) => {
      let i2 = 0, s2 = 0, a2 = "", l2 = 0;
      for (; l2 < r2.length; ) {
        let u2 = r2[l2];
        if (u2 === "(" ? i2++ : u2 === ")" && (i2 = Math.max(0, i2 - 1)), i2 === 0 && (l2 === 0 || r2[l2 - 1] === " ")) {
          let c2 = /^-?\d*\.?\d+px/.exec(r2.slice(l2));
          if (c2) {
            s2++, a2 += s2 === 2 ? `${-parseFloat(c2[0])}px` : c2[0], l2 += c2[0].length;
            continue;
          }
        }
        a2 += u2, l2++;
      }
      return a2;
    }).join(",");
  }
  function Gh(t2, e2) {
    let n2 = (o2) => pc(o2).map((r2) => {
      let i2 = r2.indexOf(":");
      if (i2 < 0) return r2;
      let s2 = r2.slice(0, i2).trim().toLowerCase();
      return s2 === "text-shadow" || e2 && s2 === "box-shadow" ? `${s2}:${Vh(r2.slice(i2 + 1))}` : r2;
    }).join(";");
    return t2 = t2.replace(/<style[^>]*>([\s\S]*?)<\/style>/gi, (o2, r2) => o2.replace(r2, r2.replace(/([^{}]+)\{([^}]*)\}/g, (i2, s2, a2) => `${s2}{${n2(a2)}}`))), t2 = t2.replace(/style=(['"])([\s\S]*?)\1/gi, (o2, r2, i2) => `style=${r2}${n2(i2)}${r2}`), t2;
  }
  async function Zo(t2) {
    if (!/(?:box-shadow|text-shadow)\s*:[^;"}]*px/i.test(t2)) return { svg: t2, naturalOnly: false };
    let { native: n2, flippedY: o2 } = await jh();
    try {
      let r2 = t2;
      return n2 || (r2 = Hh(r2)), o2 && (r2 = Gh(r2, n2)), { svg: r2, naturalOnly: true };
    } catch {
      return { svg: t2, naturalOnly: true };
    }
  }
  function qh(t2, e2, n2) {
    let o2 = t2.naturalWidth, r2 = t2.naturalHeight, i2 = Math.min(8, r2), s2 = document.createElement("canvas");
    s2.width = Math.max(1, Math.ceil(o2 * e2)), s2.height = Math.max(1, Math.ceil(i2 * 6 * n2));
    let a2 = s2.getContext("2d", { willReadFrequently: true });
    return !a2 || !(o2 > 0 && r2 > 0) ? null : () => {
      a2.clearRect(0, 0, s2.width, s2.height);
      for (let f2 = 0; f2 < 6; f2++) {
        let d2 = Math.floor((r2 - i2) * f2 / 5);
        a2.drawImage(t2, 0, d2, o2, i2, 0, f2 * i2 * n2, o2 * e2, i2 * n2);
      }
      let l2 = a2.getImageData(0, 0, s2.width, s2.height).data, u2 = false, c2 = 0;
      for (let f2 = 3; f2 < l2.length; f2 += 4) l2[f2] > 0 && (u2 = true), c2 = c2 * 31 + l2[f2 - 3] + l2[f2 - 2] * 7 + l2[f2 - 1] * 13 + l2[f2] | 0;
      return { ink: u2, sig: c2 };
    };
  }
  async function Xh(t2, e2, n2) {
    tt(t2), t2.style.cssText = "position:fixed;left:-99999px;top:-99999px;pointer-events:none", document.body.appendChild(t2);
    try {
      if (!n2) return await Xo(), await Xo(), false;
      let o2 = performance.now() + (e2 ? 600 : 150), r2 = null;
      for (; ; ) {
        let i2;
        try {
          i2 = n2();
        } catch {
          return false;
        }
        if (i2.ink && (!e2 || i2.sig === r2)) return true;
        if (r2 = i2.sig, performance.now() > o2) return i2.ink;
        await Xo();
      }
    } finally {
      try {
        t2.remove();
      } catch {
      }
    }
  }
  function Ko() {
    clearTimeout(Li), pe?.remove(), pe = null, Yo = 0;
  }
  function Kh(t2) {
    gc = t2 ?? mc;
  }
  function uc(t2) {
    if (typeof document > "u" || !document.body) return new Image();
    if (clearTimeout(Li), pe && !pe.contentDocument && Ko(), pe && Yo > Yh && Dn === 0 && Ko(), !pe) {
      let n2 = document.createElement("iframe");
      tt(n2), n2.setAttribute("aria-hidden", "true"), n2.style.cssText = "position:absolute;left:-9999px;top:0;width:0;height:0;border:0;visibility:hidden;pointer-events:none";
      try {
        document.body.appendChild(n2);
      } catch {
      }
      if (n2.contentDocument) pe = n2, Yo = 0;
      else {
        try {
          n2.remove();
        } catch {
        }
        return new Image();
      }
    }
    Yo += t2.length, Dn += 1;
    let e2 = pe.contentDocument.createElement("img");
    return e2.__snapdomDecodeFrame = true, e2;
  }
  function $i(t2, e2 = false) {
    !t2 || !t2.__snapdomDecodeFrame || (t2.__snapdomDecodeFrame = false, Dn = Math.max(0, Dn - 1), e2 && (Fi = true), !(Dn > 0) && (Fi ? (Fi = false, Ko()) : Li = setTimeout(Ko, gc)));
  }
  function dc(t2, e2) {
    return t2.loading = "eager", t2.decoding = "sync", t2.crossOrigin = "anonymous", t2.src = e2, t2.decode();
  }
  function em(t2) {
    if (typeof t2 != "string") return false;
    let e2 = t2.indexOf(",") + 1, n2 = Math.max(48, Math.floor((t2.length - e2) / 200)), o2 = 0, r2 = 0;
    for (let i2 = e2; i2 + 48 <= t2.length; i2 += n2) {
      let s2 = t2.slice(i2, i2 + 48);
      o2++, tm.some((a2) => s2.includes(a2)) || r2++;
    }
    return r2 * 2 > o2;
  }
  function Ti(t2, e2, n2, o2, r2) {
    if (!e2.naturalWidth) {
      t2.drawImage(e2, 0, 0, n2, o2);
      return;
    }
    let i2 = n2 * o2, s2 = i2 > Jh && !em(r2) ? Math.min(Zh, Math.ceil(i2 / Qh)) : 1;
    if (s2 === 1) {
      t2.drawImage(e2, 0, 0, n2, o2);
      return;
    }
    let a2 = e2.naturalWidth, l2 = e2.naturalHeight / o2;
    for (let u2 = 0; u2 < s2; u2++) {
      let c2 = Math.round(u2 * o2 / s2), f2 = u2 === s2 - 1 ? o2 : Math.round((u2 + 1) * o2 / s2);
      t2.drawImage(e2, 0, c2 * l2, a2, (f2 - c2) * l2, 0, c2, n2, f2 - c2);
    }
  }
  async function te(t2, e2) {
    let { width: n2, height: o2, scale: r2 = 1, dpr: i2 = 1, meta: s2 = {}, backgroundColor: a2, crop: l2 = null } = e2, u2 = typeof HTMLCanvasElement < "u" && t2 instanceof HTMLCanvasElement ? t2 : null, c2 = t2, f2 = false, d2 = false;
    if (l2 && !Ri(t2)) throw new RangeError("[SnapDOM] Only SVG captures can be cropped.");
    if (Ri(t2)) {
      let m2 = (Qo(t2).match(/<svg\b[^>]*>/i) || [])[0] || "", g2 = parseFloat((m2.match(/\bwidth="([\d.]+)/i) || [])[1]), p2 = parseFloat((m2.match(/\bheight="([\d.]+)/i) || [])[1]), y2 = Number.isFinite(g2) && Number.isFinite(p2) && g2 > 0 && p2 > 0 && Math.min(1, jt / g2, jt / p2, Math.sqrt(he / (g2 * p2))) < 1;
      if (l2 || y2 || Y()) try {
        let b2 = Ee(t2);
        if (l2 && (b2 = Jo(b2, l2)), Y()) {
          let w2 = await Zo(b2);
          b2 = w2.svg, f2 = w2.naturalOnly, d2 = /@font-face|data:image\//i.test(b2);
        }
        (y2 || l2) && (b2 = Dh(b2, e2)), c2 = Re(b2);
      } catch (b2) {
        if (l2) throw b2;
        c2 = t2;
      }
    }
    let h2 = u2 || uc(c2);
    try {
      u2 || await dc(h2, c2);
    } catch (m2) {
      if (!h2.__snapdomDecodeFrame) throw m2;
      let g2 = h2;
      h2 = uc(c2), $i(g2);
      try {
        await dc(h2, c2);
      } catch (p2) {
        throw $i(h2, e2.__releaseDecodeFrame), p2;
      }
    }
    try {
      !u2 && !Y() && Ri(c2) && (_t() ? /.data(?:%3A|:)image(?:%2F|\/)svg/i : /(?:%40|@)font-face/i).test(c2) && await new Promise((N) => {
        let U = new MessageChannel();
        U.port1.onmessage = () => {
          U.port1.close(), U.port2.close(), N();
        }, U.port2.postMessage(0);
      });
      let m2 = u2 ? u2.width : h2.naturalWidth, g2 = u2 ? u2.height : h2.naturalHeight, p2 = l2 ? m2 : Number.isFinite(s2.vbW) ? s2.vbW : Number.isFinite(s2.w0) ? s2.w0 : m2, y2 = l2 ? g2 : Number.isFinite(s2.vbH) ? s2.vbH : Number.isFinite(s2.h0) ? s2.h0 : g2, b2, w2, S2 = Number.isFinite(n2), v2 = Number.isFinite(o2);
      if (S2 && v2) b2 = Math.max(1, n2), w2 = Math.max(1, o2);
      else if (S2) {
        let N = n2 / Math.max(1, p2);
        b2 = n2, w2 = y2 * N;
      } else if (v2) {
        let N = o2 / Math.max(1, y2);
        w2 = o2, b2 = p2 * N;
      } else {
        let N = u2 && Number.isFinite(s2.vbW) && Number.isFinite(s2.vbH);
        b2 = N ? s2.vbW : m2, w2 = N ? s2.vbH : g2;
      }
      !S2 && !v2 && (b2 = b2 * r2, w2 = w2 * r2);
      let C = b2 * i2, M = w2 * i2, $2 = Math.max(C / jt, M / jt, Math.sqrt(C * M / he)), F = e2.__encodeFormat === "webp" ? Math.max(C, M) / Pi : 0, A = Math.max($2, F);
      if (A > 1) {
        let N = $2 <= 1;
        nt(e2.__session, "canvas-clamp", `output ${Math.round(C)}x${Math.round(M)}px exceeds ${N ? "WebP" : "canvas"} limits; downscaled`), D(e2, N ? `${Math.round(C)}\xD7${Math.round(M)}px is larger than WebP can encode (${Pi}px per side); scaled down. For full size, export a PNG, an SVG, or crop.` : `${Math.round(C)}\xD7${Math.round(M)}px is larger than a canvas allows; scaled down. For full size, export ${typeof CompressionStream == "function" ? "a PNG or JPEG" : "a JPEG"} blob, an SVG, or crop.`), b2 /= A, w2 /= A;
      }
      let x2 = Pt(e2.canvas) && ft(e2.canvas, "canvas") ? e2.canvas : document.createElement("canvas");
      x2.width = Math.max(1, b2 * i2), x2.height = Math.max(1, w2 * i2), x2.style.width = `${b2}px`, x2.style.height = `${w2}px`;
      let _2 = x2.getContext("2d");
      if (!_2) throw new Error("[SnapDOM] The canvas you passed has no 2D context (is it already used for WebGL?).");
      let P = null, E = e2.__layoutZoom || 1;
      if (!u2 && _t()) {
        let N = E * p2 / (b2 * i2), U = Math.round(b2 * i2 * N), z = Math.round(w2 * i2 * N);
        N > 1.01 && U <= jt && z <= jt && U * z <= he && (P = { w: U, h: z });
      }
      let R = f2 && (Math.round(b2 * i2) !== m2 || Math.round(w2 * i2) !== g2), L = R ? m2 : P ? P.w : b2 * i2, k = R ? g2 : P ? P.h : w2 * i2, I = Y() && !u2 ? qh(h2, L / Math.max(1, m2), k / Math.max(1, g2)) : null, W = false;
      I && (W = await Xh(h2, d2, I));
      let T = () => {
        if (_2.save(), i2 !== 1 && _2.scale(i2, i2), a2 && (_2.save(), _2.fillStyle = a2, _2.fillRect(0, 0, b2, w2), _2.restore()), R) {
          let N = document.createElement("canvas");
          N.width = m2, N.height = g2, Ti(N.getContext("2d"), h2, m2, g2, c2), _2.drawImage(N, 0, 0, b2, w2);
        } else {
          if (_2.save(), _2.setTransform(1, 0, 0, 1, 0, 0), P) {
            let N = document.createElement("canvas");
            for (N.width = P.w, N.height = P.h, Ti(N.getContext("2d"), h2, P.w, P.h, c2); N.width > b2 * i2 * 2; ) {
              let U = document.createElement("canvas");
              U.width = Math.ceil(N.width / 2), U.height = Math.ceil(N.height / 2), U.getContext("2d").drawImage(N, 0, 0, U.width, U.height), N = U;
            }
            _2.imageSmoothingQuality = "high", _2.drawImage(N, 0, 0, b2 * i2, w2 * i2);
          } else Ti(_2, h2, b2 * i2, w2 * i2, c2);
          _2.restore();
        }
        _2.restore();
      };
      if (T(), I && W && d2) {
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
          x2.width = x2.width, T();
        }
      }
      return x2;
    } finally {
      $i(h2, e2.__releaseDecodeFrame);
    }
  }
  async function Ii(t2, e2) {
    let n2 = await te(t2, { ...e2, __encodeFormat: e2.format }), i2 = n2.width * n2.height <= 2e6 ? n2.toDataURL(`image/${e2.format}`, e2.quality) : await new Promise((a2) => {
      let l2 = () => a2(n2.toDataURL(`image/${e2.format}`, e2.quality));
      try {
        n2.toBlob((u2) => {
          if (!u2) return l2();
          let c2 = new FileReader();
          c2.onload = () => a2(String(c2.result || "")), c2.onerror = l2, c2.readAsDataURL(u2);
        }, `image/${e2.format}`, e2.quality);
      } catch {
        l2();
      }
    }), s2 = new Image();
    return s2.src = i2, Y() ? await s2.decode() : await new Promise((a2, l2) => {
      if (s2.complete && s2.naturalWidth) return a2();
      s2.onload = a2, s2.onerror = l2;
    }), s2.style.width = `${n2.width / e2.dpr}px`, s2.style.height = `${n2.height / e2.dpr}px`, s2;
  }
  async function nm(t2, e2) {
    let { scale: n2 = 1, width: o2, height: r2, meta: i2 = {} } = e2, s2 = Number.isFinite(o2), a2 = Number.isFinite(r2), l2 = Number.isFinite(n2) && n2 !== 1 || s2 || a2;
    if (Y() && l2) try {
      let { svg: d2 } = await Zo(Ee(t2)), h2 = (d2.match(/<svg\b[^>]*>/i) || [])[0] || "", m2 = parseFloat((h2.match(/\bwidth="([\d.]+)/i) || [])[1]), g2 = parseFloat((h2.match(/\bheight="([\d.]+)/i) || [])[1]);
      if (!Number.isFinite(m2) || !Number.isFinite(g2)) throw new Error("The SVG has no size.");
      let p2 = Number.isFinite(i2.vbW) ? i2.vbW : Number.isFinite(i2.w0) ? i2.w0 : m2, y2 = Number.isFinite(i2.vbH) ? i2.vbH : Number.isFinite(i2.h0) ? i2.h0 : g2, b2, w2;
      s2 && a2 ? (b2 = o2, w2 = r2) : s2 ? (b2 = o2, w2 = Math.max(1, Math.round(y2 * (o2 / Math.max(1, p2))))) : a2 ? (w2 = r2, b2 = Math.max(1, Math.round(p2 * (r2 / Math.max(1, y2))))) : (b2 = Math.max(1, Math.round(m2 * n2)), w2 = Math.max(1, Math.round(g2 * n2)));
      let S2 = Ni(d2, b2, w2) || d2.replace(/width="[^"]*"/, `width="${b2}"`).replace(/height="[^"]*"/, `height="${w2}"`), v2 = new Image();
      return v2.decoding = "sync", v2.loading = "eager", v2.src = Re(S2), await v2.decode(), v2.style.width = `${b2}px`, v2.style.height = `${w2}px`, v2;
    } catch (d2) {
      return nt(e2.__session, "safari-png-fallback", "Safari vector toImg failed; using PNG", d2), D(e2, "Safari couldn't show the SVG; used a PNG.", d2), Ii(t2, { ...e2, format: "png", quality: 1, meta: i2 });
    }
    let u2 = t2, c2 = false;
    if (!s2 && !a2 && n2 !== 1 && typeof t2 == "string" && t2.startsWith("data:image/svg+xml")) try {
      let d2 = Ee(t2), h2 = (d2.match(/<svg\b[^>]*>/i) || [])[0] || "", m2 = Number((h2.match(/\bwidth="([\d.]+)"/i) || [])[1]), g2 = Number((h2.match(/\bheight="([\d.]+)"/i) || [])[1]);
      if (m2 > 0 && g2 > 0) {
        let p2 = h2.replace(/\bwidth="[^"]*"/i, `width="${Math.max(1, Math.round(m2 * n2))}"`).replace(/\bheight="[^"]*"/i, `height="${Math.max(1, Math.round(g2 * n2))}"`);
        u2 = Re(d2.replace(h2, p2)), c2 = true;
      }
    } catch {
    }
    let f2 = new Image();
    f2.decoding = "sync", f2.loading = "eager", f2.src = u2;
    try {
      await f2.decode();
    } catch (d2) {
      if (!c2) throw d2;
      f2.src = t2, c2 = false, await f2.decode();
    }
    if (s2 && a2) f2.style.width = `${o2}px`, f2.style.height = `${r2}px`;
    else if (s2) {
      let d2 = Number.isFinite(i2.vbW) ? i2.vbW : Number.isFinite(i2.w0) ? i2.w0 : f2.naturalWidth, h2 = Number.isFinite(i2.vbH) ? i2.vbH : Number.isFinite(i2.h0) ? i2.h0 : f2.naturalHeight, m2 = o2 / Math.max(1, d2);
      f2.style.width = `${o2}px`, f2.style.height = `${Math.max(1, Math.round(h2 * m2))}px`;
    } else if (a2) {
      let d2 = Number.isFinite(i2.vbW) ? i2.vbW : Number.isFinite(i2.w0) ? i2.w0 : f2.naturalWidth, h2 = Number.isFinite(i2.vbH) ? i2.vbH : Number.isFinite(i2.h0) ? i2.h0 : f2.naturalHeight, m2 = r2 / Math.max(1, h2);
      f2.style.height = `${r2}px`, f2.style.width = `${Math.max(1, Math.round(d2 * m2))}px`;
    } else {
      let d2 = Math.max(1, Math.round(f2.naturalWidth * (c2 ? 1 : n2))), h2 = Math.max(1, Math.round(f2.naturalHeight * (c2 ? 1 : n2)));
      if (f2.style.width = `${d2}px`, f2.style.height = `${h2}px`, !c2 && n2 !== 1 && typeof t2 == "string" && t2.startsWith("data:image/svg+xml")) try {
        let g2 = decodeURIComponent(t2.split(",")[1]).replace(/width="[^"]*"/, `width="${d2}"`).replace(/height="[^"]*"/, `height="${h2}"`);
        f2.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(g2)}`, await f2.decode();
      } catch (m2) {
        D(e2, "Couldn't size the SVG image.", m2), f2.src !== t2 && (f2.src = t2, await f2.decode().catch(() => {
        }));
      }
    }
    return f2;
  }
  function tr(t2, e2 = new Uint8Array(0)) {
    let n2 = new Uint8Array(e2.length + 12), o2 = new DataView(n2.buffer);
    o2.setUint32(0, e2.length);
    for (let i2 = 0; i2 < 4; i2++) n2[i2 + 4] = t2.charCodeAt(i2);
    n2.set(e2, 8);
    let r2 = 4294967295;
    for (let i2 = 4; i2 < n2.length - 4; i2++) r2 = bc[(r2 ^ n2[i2]) & 255] ^ r2 >>> 8;
    return o2.setUint32(n2.length - 4, (r2 ^ 4294967295) >>> 0), n2;
  }
  async function om(t2, e2, n2) {
    if (![t2, e2].every((g2) => Number.isInteger(g2) && g2 > 0 && g2 <= 2147483647)) throw new RangeError("[SnapDOM] PNG dimensions must be integers from 1 to 2147483647");
    let o2 = new Uint8Array(13), r2 = new DataView(o2.buffer);
    r2.setUint32(0, t2), r2.setUint32(4, e2), o2[8] = 8, o2[9] = 6;
    let i2 = [new Uint8Array([137, 80, 78, 71, 13, 10, 26, 10]), tr("IHDR", o2), tr("sRGB", new Uint8Array([0]))], s2 = t2 * 4, a2 = Math.max(1, Math.floor(65536 / (s2 + 1))), l2 = new Uint8Array(s2), u2 = 0, c2 = new CompressionStream("deflate"), f2 = c2.writable.getWriter(), d2 = c2.readable.getReader(), h2, m2 = (async () => {
      try {
        for (; ; ) {
          let { done: g2, value: p2 } = await d2.read();
          if (g2) return;
          i2.push(tr("IDAT", p2));
        }
      } catch (g2) {
        h2 = g2, await f2.abort(g2).catch(() => {
        });
      }
    })();
    try {
      for await (let g2 of n2) {
        if (!(g2 instanceof Uint8Array || g2 instanceof Uint8ClampedArray) || !g2.length || g2.length % s2) throw new RangeError("[SnapDOM] PNG input must contain complete RGBA rows");
        let p2 = g2.length / s2;
        if (u2 + p2 > e2) throw new RangeError("[SnapDOM] PNG input exceeds the declared height");
        for (let y2 = 0; y2 < p2; y2 += a2) {
          let b2 = Math.min(p2, y2 + a2), w2 = new Uint8Array((b2 - y2) * (s2 + 1));
          for (let S2 = y2; S2 < b2; S2++) {
            let v2 = g2.subarray(S2 * s2, (S2 + 1) * s2), C = (S2 - y2) * (s2 + 1), M = 0, $2 = 0;
            for (let F = 0; F < s2; F++) {
              let A = v2[F] - (F < 4 ? 0 : v2[F - 4]) & 255, x2 = v2[F] - l2[F] & 255;
              M += Math.min(A, 256 - A), $2 += Math.min(x2, 256 - x2), w2[C + F + 1] = x2;
            }
            if (w2[C] = $2 <= M ? 2 : 1, M < $2) for (let F = 0; F < s2; F++) w2[C + F + 1] = v2[F] - (F < 4 ? 0 : v2[F - 4]);
            l2 = v2;
          }
          await f2.write(w2);
        }
        l2 = l2.slice(), u2 += p2;
      }
      if (u2 !== e2) throw new RangeError("[SnapDOM] PNG input does not match the declared height");
      if (await f2.close(), await m2, h2) throw h2;
      return i2.push(tr("IEND")), new Blob(i2, { type: "image/png" });
    } catch (g2) {
      throw await Promise.allSettled([f2.abort(g2), d2.cancel(g2)]), await m2, g2;
    } finally {
      f2.releaseLock(), d2.releaseLock();
    }
  }
  function Cc(t2) {
    let e2 = [0, 240];
    for (let n2 = 0; n2 < 16; n2++) for (let o2 = 1; o2 <= 10; o2++) e2.push(n2 << 4 | o2);
    return t2.concat(e2.filter((n2) => !t2.includes(n2)).sort((n2, o2) => n2 - o2));
  }
  function sm(t2) {
    for (let e2 = 0; e2 < 64; e2 += 8) Ac(t2, e2, 1);
    for (let e2 = 0; e2 < 8; e2++) Ac(t2, e2, 8);
  }
  function Ac(t2, e2, n2) {
    let o2 = t2[e2] + t2[e2 + 7 * n2], r2 = t2[e2] - t2[e2 + 7 * n2], i2 = t2[e2 + n2] + t2[e2 + 6 * n2], s2 = t2[e2 + n2] - t2[e2 + 6 * n2], a2 = t2[e2 + 2 * n2] + t2[e2 + 5 * n2], l2 = t2[e2 + 2 * n2] - t2[e2 + 5 * n2], u2 = t2[e2 + 3 * n2] + t2[e2 + 4 * n2], c2 = t2[e2 + 3 * n2] - t2[e2 + 4 * n2], f2 = o2 + u2, d2 = o2 - u2, h2 = i2 + a2, m2 = i2 - a2;
    t2[e2] = f2 + h2, t2[e2 + 4 * n2] = f2 - h2;
    let g2 = (m2 + d2) * 0.707106781;
    t2[e2 + 2 * n2] = d2 + g2, t2[e2 + 6 * n2] = d2 - g2, f2 = c2 + l2, h2 = l2 + s2, m2 = s2 + r2;
    let p2 = (f2 - m2) * 0.382683433, y2 = 0.5411961 * f2 + p2, b2 = 1.306562965 * m2 + p2, w2 = h2 * 0.707106781, S2 = r2 + w2, v2 = r2 - w2;
    t2[e2 + 5 * n2] = v2 + y2, t2[e2 + 3 * n2] = v2 - y2, t2[e2 + n2] = S2 + b2, t2[e2 + 7 * n2] = S2 - b2;
  }
  async function am(t2, e2, n2, o2) {
    if (![t2, e2].every((R) => Number.isInteger(R) && R > 0 && R <= 65535)) throw new RangeError("[SnapDOM] JPEG dimensions must be integers from 1 to 65535");
    let r2 = Math.min(100, Math.max(1, Math.round((typeof o2 == "number" && o2 >= 0 && o2 <= 1 ? o2 : 0.92) * 100))), i2 = r2 < 50 ? 5e3 / r2 : 200 - r2 * 2, s2 = r2 < 90 ? 1 : 0, a2 = 8 << s2, l2 = [0], u2 = [rm, im].map((R, L) => {
      let k = new Uint8Array(64), I = new Float32Array(64);
      for (let W = 0; W < 64; W++) {
        let T = Math.min(255, Math.max(1, Math.floor((R[W] * i2 + 50) / 100)));
        k[Sc[W]] = T, I[W] = 1 / (T * vc[W >> 3] * vc[W & 7] * 8);
      }
      return l2.push(...L ? [1] : [], ...k), I;
    }), c2 = (R, L) => [255, R, L.length + 2 >> 8, L.length + 2 & 255, ...L], f2 = [255, 216, ...c2(224, [74, 70, 73, 70, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0]), ...c2(219, l2), ...c2(192, [8, e2 >> 8, e2 & 255, t2 >> 8, t2 & 255, 3, 1, s2 ? 34 : 17, 0, 2, 17, 1, 3, 17, 1]), ...c2(196, _c.flatMap(([R, , L, k]) => [R, ...L, ...k])), ...c2(218, [3, 1, 0, 2, 17, 3, 17, 0, 63, 0])], d2 = [new Uint8Array(f2)], h2 = new Uint8Array(65536), m2 = 0, g2 = 0, p2 = 0;
    function y2(R, L) {
      for (g2 = g2 << L | R, p2 += L; p2 >= 8; ) {
        p2 -= 8;
        let k = g2 >>> p2 & 255;
        m2 >= h2.length - 1 && (d2.push(h2.subarray(0, m2)), h2 = new Uint8Array(65536), m2 = 0), h2[m2++] = k, k === 255 && (h2[m2++] = 0);
      }
      g2 &= (1 << p2) - 1;
    }
    let b2 = new Float32Array(64), w2 = new Int32Array(64), S2 = [0, 0, 0];
    function v2(R, L) {
      let k = u2[L];
      sm(b2);
      for (let z = 0; z < 64; z++) w2[Sc[z]] = Math.round(b2[z] * k[z]);
      let I = Mc[L * 2], W = Mc[L * 2 + 1], T = w2[0] - S2[R];
      S2[R] = w2[0];
      let N = T ? 32 - Math.clz32(Math.abs(T)) : 0;
      y2(I[N][0], I[N][1]), N && y2((T < 0 ? T - 1 : T) & (1 << N) - 1, N);
      let U = 0;
      for (let z = 1; z < 64; z++) {
        if (T = w2[z], !T) {
          U++;
          continue;
        }
        for (; U > 15; U -= 16) y2(W[240][0], W[240][1]);
        N = 32 - Math.clz32(Math.abs(T));
        let V = W[U << 4 | N];
        y2(V[0], V[1]), y2((T < 0 ? T - 1 : T) & (1 << N) - 1, N), U = 0;
      }
      U && y2(W[0][0], W[0][1]);
    }
    let C = t2 * 4, M = new Uint8Array(C * a2), $2 = new Float32Array(a2 * a2), F = new Float32Array(64), A = new Float32Array(64), x2 = s2 ? 0.25 : 1;
    function _2(R) {
      for (let L = 0; L < t2; L += a2) {
        F.fill(0), A.fill(0);
        for (let k = 0; k < a2; k++) {
          let I = Math.min(k, R - 1) * C;
          for (let W = 0; W < a2; W++) {
            let T = I + Math.min(L + W, t2 - 1) * 4, N = M[T], U = M[T + 1], z = M[T + 2];
            $2[k * a2 + W] = 0.299 * N + 0.587 * U + 0.114 * z - 128;
            let V = (k >> s2) * 8 + (W >> s2);
            F[V] += (-0.168736 * N - 0.331264 * U + 0.5 * z) * x2, A[V] += (0.5 * N - 0.418688 * U - 0.081312 * z) * x2;
          }
        }
        for (let k = 0; k < (s2 ? 4 : 1); k++) {
          let I = (k >> 1) * 128 + (k & 1) * 8;
          for (let W = 0; W < 64; W++) b2[W] = $2[I + (W >> 3) * a2 + (W & 7)];
          v2(0, 0);
        }
        b2.set(F), v2(1, 1), b2.set(A), v2(2, 1);
      }
    }
    let P = 0, E = 0;
    for await (let R of n2) {
      if (!(R instanceof Uint8Array || R instanceof Uint8ClampedArray) || !R.length || R.length % C) throw new RangeError("[SnapDOM] JPEG input must contain complete RGBA rows");
      let L = R.length / C;
      if (P + L > e2) throw new RangeError("[SnapDOM] JPEG input exceeds the declared height");
      for (let k = 0; k < L; ) {
        let I = Math.min(a2 - E, L - k);
        M.set(R.subarray(k * C, (k + I) * C), E * C), E += I, k += I, E === a2 && (_2(a2), E = 0);
      }
      P += L;
    }
    if (P !== e2) throw new RangeError("[SnapDOM] JPEG input does not match the declared height");
    return E && _2(E), p2 && y2((1 << 8 - p2) - 1, 8 - p2), d2.push(h2.subarray(0, m2), new Uint8Array([255, 217])), new Blob(d2, { type: "image/jpeg" });
  }
  function er(t2, e2, n2) {
    if (typeof t2 != "string" || !t2.startsWith("data:image/svg+xml")) return null;
    let o2 = Qo(t2).match(/<svg\b[^>]*>/i)?.[0];
    if (!o2) return null;
    let r2 = e2.crop ? Jo(o2, e2.crop) : o2, i2 = parseFloat(r2.match(/\bwidth="([^"]+)/i)?.[1]), s2 = parseFloat(r2.match(/\bheight="([^"]+)/i)?.[1]), a2 = (r2.match(/\bviewBox="([^"]+)/i)?.[1] || "").trim().split(/[\s,]+/).map(Number);
    if (!(i2 > 0 && s2 > 0) || a2.length !== 4 || !a2.every(Number.isFinite) || !(a2[2] > 0 && a2[3] > 0)) return null;
    let l2 = Number.isFinite(e2.width), u2 = Number.isFinite(e2.height), c2 = e2.meta || {}, f2 = Math.max(1, Math.floor(i2)), d2 = Math.max(1, Math.floor(s2)), h2 = e2.crop ? f2 : Number.isFinite(c2.vbW) ? c2.vbW : Number.isFinite(c2.w0) ? c2.w0 : f2, m2 = e2.crop ? d2 : Number.isFinite(c2.vbH) ? c2.vbH : Number.isFinite(c2.h0) ? c2.h0 : d2, g2 = e2.dpr ?? 1, p2 = e2.scale ?? 1, y2 = (l2 && u2 ? Math.max(1, e2.width) : l2 ? e2.width : u2 ? e2.height * h2 / Math.max(1, m2) : f2 * p2) * g2, b2 = (l2 && u2 ? Math.max(1, e2.height) : u2 ? e2.height : l2 ? e2.width * m2 / Math.max(1, h2) : d2 * p2) * g2;
    if (Math.max(i2, s2, y2, b2) <= jt && i2 * s2 <= he && y2 * b2 <= he || (n2 === "png" ? typeof CompressionStream != "function" : Math.max(y2, b2) >= 65536)) return null;
    return w2();
    async function w2() {
      let S2 = Math.max(1, Math.floor(y2)), v2 = Math.max(1, Math.floor(b2)), C = Ee(t2), M = C.slice(C.indexOf(o2) + o2.length, C.lastIndexOf("</svg>")), $2 = r2.match(/\bpreserveAspectRatio="([^"]*)"/i)?.[1] || "xMidYMid meet", F = i2 / a2[2], A = s2 / a2[3], x2 = 0, _2 = 0;
      /\bnone\b/.test($2) || (F = A = /\bslice\b/.test($2) ? Math.max(F, A) : Math.min(F, A), x2 = (i2 - a2[2] * F) * (/xMin/.test($2) ? 0 : /xMax/.test($2) ? 1 : 0.5), _2 = (s2 - a2[3] * A) * (/YMin/.test($2) ? 0 : /YMax/.test($2) ? 1 : 0.5)), x2 -= a2[0] * F, _2 -= a2[1] * A;
      let P = r2.replace(/\s(?:width|height|preserveAspectRatio)="[^"]*"/gi, "").slice(0, -1), E = Y() && /(?:box-shadow|text-shadow)\s*:[^;"}]*px/i.test(C), R = i2 / y2, L = s2 / b2, k = Math.max(1, Math.min(8192, Math.floor(4 * 1024 * 1024 / S2), E ? Math.floor(2046 / L) : 8192)), I = Math.max(1, Math.min(8192, S2, E ? Math.floor(2046 / R) : 8192));
      async function* W() {
        for (let T = 0; T < v2; T += k) {
          let N = Math.min(k, v2 - T), U = new Uint8Array(S2 * N * 4);
          for (let z = 0; z < S2; z += I) {
            let V = Math.min(I, S2 - z), B = E ? Math.max(0, Math.floor(z * R) - 1) : z * R, rt = E ? Math.max(0, Math.floor(T * L) - 1) : T * L, at = E ? Math.min(f2, Math.ceil((z + V) * R) + 1) - B : V, pt = E ? Math.min(d2, Math.ceil((T + N) * L) + 1) - rt : N, St = at / a2[2], ee = pt / a2[3], yt = E ? 1 : 1 / R, It = E ? 1 : 1 / L, $e = `matrix(${F * yt / St},0,0,${A * It / ee},${(x2 - B) * yt / St + a2[0]},${(_2 - rt) * It / ee + a2[1]})`, q = `${P} width="${at}" height="${pt}" preserveAspectRatio="none"><g style="all:unset!important;transform:${$e}!important;transform-origin:0 0!important">${M}</g></svg>`, X = await te(Re(q), { width: at, height: pt, dpr: 1, backgroundColor: E ? null : e2.backgroundColor, __session: e2.__session, __releaseDecodeFrame: true }), G = X;
            try {
              if (E) {
                G = document.createElement("canvas"), G.width = V, G.height = N;
                let Z = G.getContext("2d");
                e2.backgroundColor && (Z.fillStyle = e2.backgroundColor, Z.fillRect(0, 0, V, N)), Z.drawImage(X, z * R - B, T * L - rt, V * R, N * L, 0, 0, V, N);
              }
              let ht = G.getContext("2d").getImageData(0, 0, V, N).data;
              for (let Z = 0; Z < N; Z++) U.set(ht.subarray(Z * V * 4, (Z + 1) * V * 4), (Z * S2 + z) * 4);
            } finally {
              X.width = X.height = 0, G !== X && (G.width = G.height = 0);
            }
          }
          yield U;
        }
      }
      return n2 === "png" ? (await Promise.resolve().then(() => (xc(), wc))).encodePng(S2, v2, W()) : (await Promise.resolve().then(() => (Rc(), Ec))).encodeJpeg(S2, v2, W(), e2.quality);
    }
  }
  async function Bi(t2, e2) {
    let n2 = e2.format || e2.type || "svg";
    if (n2 === "svg") {
      if (typeof HTMLCanvasElement < "u" && t2 instanceof HTMLCanvasElement) throw new Error("[SnapDOM] html-in-canvas makes a raster capture, not an SVG; ask for png, jpeg or webp.");
      let s2 = jn(decodeURIComponent(t2.split(",")[1]), e2.__fileSvg);
      return new Blob([s2], { type: "image/svg+xml" });
    }
    let o2 = n2 === "jpg" ? "jpeg" : n2, r2 = (o2 === "png" || o2 === "jpeg") && er(t2, e2, o2);
    if (r2) return r2;
    let i2 = await te(t2, { ...e2, __encodeFormat: o2 });
    return new Promise((s2) => i2.toBlob((a2) => s2(a2), `image/${o2}`, e2.quality));
  }
  async function $c(t2, e2) {
    let n2 = new File([t2], e2, { type: t2.type });
    if (!navigator.canShare?.({ files: [n2] })) return false;
    try {
      await navigator.share({ files: [n2], title: e2 });
    } catch (o2) {
      if (o2.name !== "AbortError") return false;
    }
    return true;
  }
  async function lm(t2, e2) {
    let n2 = /* @__PURE__ */ new Set(["png", "jpeg", "jpg", "webp", "svg"]), o2 = (e2?.type || "").toLowerCase(), r2 = n2.has(o2) ? o2 : "", i2 = (e2?.format || r2 || "").toLowerCase(), s2 = i2 === "jpg" ? "jpeg" : i2 || "png", a2 = e2?.filename || "snapdom", l2 = /\.(png|jpe?g|webp|svg)$/i.test(a2) ? a2 : `${a2}.${s2}`, u2 = { ...e2 || {}, format: s2, type: s2 };
    u2.dpr = 1;
    let c2 = xn(), f2 = (s2 === "png" || s2 === "jpeg") && er(t2, u2, s2);
    if (s2 === "svg" || f2) {
      let m2 = f2 ? await f2 : await Bi(t2, { ...u2, type: "svg" });
      if (c2 && await $c(m2, l2)) return;
      let g2 = URL.createObjectURL(m2), p2 = document.createElement("a");
      p2.href = g2, p2.download = l2, document.body.appendChild(p2), p2.click(), setTimeout(() => URL.revokeObjectURL(g2), 1e3), p2.remove();
      return;
    }
    let d2 = await te(t2, { ...u2, __encodeFormat: s2 });
    if (c2) {
      let m2 = `image/${s2}`, g2 = await new Promise((p2) => d2.toBlob(p2, m2, e2?.quality));
      if (g2 && await $c(g2, l2)) return;
    }
    let h2 = document.createElement("a");
    h2.href = d2.toDataURL(`image/${s2}`, e2?.quality), h2.download = l2, document.body.appendChild(h2), h2.click(), h2.remove();
  }
  function zt() {
    He++;
  }
  function Jn(t2) {
    let e2 = t2 && (t2.nodeType === 1 ? t2 : t2.parentElement);
    for (; e2; ) {
      if (Xt(e2)) return true;
      e2.parentElement ? e2 = e2.parentElement : e2 = Bt(e2);
    }
    return false;
  }
  function Zn(t2) {
    for (let e2 of t2) if (xe(e2)) return true;
    return false;
  }
  function xe(t2) {
    if (Jn(t2.target)) return false;
    if (t2.type === "childList") {
      let e2 = true;
      for (let n2 of t2.addedNodes) if (!Jn(n2)) {
        e2 = false;
        break;
      }
      if (e2) {
        for (let n2 of t2.removedNodes) if (!Jn(n2)) {
          e2 = false;
          break;
        }
      }
      if (e2) return false;
    }
    return true;
  }
  function ks(t2) {
    for (let e2 of t2) {
      if (!xe(e2)) continue;
      let n2 = e2.target.ownerDocument || document;
      ze.set(n2, (ze.get(n2) || 0) + 1);
      let o2 = e2.target.nodeType === 1 ? e2.target : e2.target.parentElement || e2.target.host;
      for (; o2; o2 = o2.parentElement || Bt(o2)) ze.set(o2, (ze.get(o2) || 0) + 1);
    }
  }
  function kn(t2) {
    let e2 = t2.ownerDocument || document;
    return Ge(e2), (ze.get(e2) || 0) - (ze.get(t2) || 0);
  }
  function je(t2 = document) {
    return Ge(t2), Rt;
  }
  function Se() {
    return Ge(), He;
  }
  function Mn(t2) {
    return t2 ? (Ge(t2.ownerDocument || document), to(t2, Rr(t2))) : 0;
  }
  function Ve() {
    zt(), Rt++;
  }
  function kf(t2) {
    we.set(t2, ++ae);
  }
  function _r(t2) {
    if (!t2 || t2.nodeType !== 1) return;
    ae++, we.set(t2, ae);
    let e2 = t2.querySelectorAll("*");
    for (let n2 = 0; n2 < e2.length; n2++) we.set(e2[n2], ae);
  }
  function Er(t2) {
    _r(t2.parentElement || t2);
    for (let e2 = t2.parentElement; e2; e2 = e2.parentElement) kf(e2);
  }
  function to(t2, e2 = null) {
    let n2 = we.get(t2) || 0;
    if (e2) for (let o2 of e2) n2 = Math.max(n2, we.get(o2) || 0);
    return le * 1e9 + n2;
  }
  function Rr(t2) {
    let e2 = t2.getRootNode?.();
    if (!e2?.host) return null;
    let n2 = [];
    for (; e2?.host; ) e2.mode === "open" && $r(e2), n2.push(e2.host), e2 = e2.host.getRootNode?.();
    return n2;
  }
  function Fr(t2) {
    t2 = t2 || document;
    let e2 = Cr.get(t2);
    if (!e2 || e2.env !== Rt) {
      let n2 = true;
      try {
        n2 = Yt(t2).usesHas;
      } catch {
      }
      e2 = { env: Rt, usesHas: n2 }, Cr.set(t2, e2);
    }
    return !e2.usesHas;
  }
  function Mf(t2) {
    let e2 = (n2) => n2?.nodeType === 1 && (n2.matches?.("style,link") || n2.querySelector?.("style,link"));
    for (let n2 of t2) {
      let o2 = n2.target, r2 = o2 && (o2.nodeType === 1 ? o2 : o2.parentElement);
      if (r2 && (r2.tagName === "STYLE" || r2.tagName === "LINK")) return r2.ownerDocument || document;
      for (let i2 of n2.addedNodes) if (e2(i2)) return i2.ownerDocument || document;
      for (let i2 of n2.removedNodes) if (e2(i2)) return i2.ownerDocument || o2 && o2.ownerDocument || document;
    }
    return null;
  }
  function Ms(t2) {
    if (!Zn(t2)) return;
    ks(t2), zt();
    let e2 = /* @__PURE__ */ new Set();
    for (let n2 of t2) {
      if (!xe(n2)) continue;
      let o2 = n2.target.getRootNode && n2.target.getRootNode();
      if (!o2 || o2.nodeType !== 11 || e2.has(o2)) continue;
      e2.add(o2), o2.host ? _r(o2.host) : ae++;
      let r2 = o2.querySelectorAll("*");
      for (let i2 = 0; i2 < r2.length; i2++) we.set(r2[i2], ae);
    }
  }
  function $r(t2) {
    if (!(!t2 || kr.has(t2))) {
      kr.add(t2);
      try {
        let e2 = new MutationObserver(Ms);
        e2.observe(t2, { subtree: true, childList: true, characterData: true, attributes: true }), Sn.push({ o: e2, root: t2 });
      } catch {
      }
    }
  }
  function As(t2) {
    if (!Zn(t2)) return;
    ks(t2), zt();
    let e2 = Mf(t2);
    if (e2) {
      Cr.delete(e2), Rt++, le++;
      return;
    }
    let n2 = /* @__PURE__ */ new Set();
    for (let o2 of t2) {
      if (!xe(o2)) continue;
      let r2 = o2.target.nodeType === 1 ? o2.target : o2.target.parentElement;
      if (!r2) continue;
      let i2 = r2.ownerDocument || document;
      if (!Fr(i2)) {
        le++;
        return;
      }
      if (r2 === i2.documentElement || r2 === i2.body) {
        le++;
        return;
      }
      let s2 = r2.parentElement || r2;
      n2.has(s2) || (n2.add(s2), Er(r2));
    }
  }
  function Ge(t2 = document) {
    if (t2 === vn || !t2 || t2.nodeType !== 9) return;
    if (Mr.has(t2)) {
      vn = t2;
      return;
    }
    Mr.add(t2), vn = t2;
    let e2 = t2.defaultView, n2 = (r2) => {
      Zn(r2) && (zt(), Rt++);
    }, o2 = () => {
      zt(), Rt++;
    };
    try {
      let r2 = new MutationObserver(As);
      r2.observe(t2.documentElement, { subtree: true, childList: true, characterData: true, attributes: true }), Cn.push({ o: r2, env: false, doc: t2 });
    } catch {
    }
    try {
      let r2 = new MutationObserver(n2);
      r2.observe(t2.head, { subtree: true, childList: true, characterData: true, attributes: true }), Cn.push({ o: r2, env: true, doc: t2 });
    } catch {
    }
    try {
      e2?.addEventListener("resize", o2, { passive: true });
    } catch {
    }
    try {
      let r2 = (i2) => {
        zt();
        let s2 = i2.composedPath?.()[0] || i2.target;
        s2 && s2.nodeType === 1 && !Jn(s2) && Fr(s2.ownerDocument || t2) ? Er(s2) : le++;
      };
      t2.addEventListener("focusin", r2, { capture: true, passive: true }), t2.addEventListener("focusout", r2, { capture: true, passive: true }), t2.addEventListener("change", r2, { capture: true, passive: true }), t2.addEventListener("pointerdown", r2, { capture: true, passive: true }), t2.addEventListener("pointerup", r2, { capture: true, passive: true }), t2.addEventListener("pointercancel", r2, { capture: true, passive: true }), t2.addEventListener("keydown", r2, { capture: true, passive: true }), t2.addEventListener("keyup", r2, { capture: true, passive: true }), t2.addEventListener("beforetoggle", r2, { capture: true, passive: true }), t2.addEventListener("toggle", r2, { capture: true, passive: true }), e2?.addEventListener("hashchange", () => {
        zt(), le++;
      }, { passive: true });
    } catch {
    }
    try {
      let r2 = t2.fonts;
      r2 && (r2.addEventListener?.("loadingdone", o2), r2.status === "loading" && r2.ready?.then(o2).catch(() => {
      }));
    } catch {
    }
  }
  function ws(t2, e2) {
    if (!t2?.querySelectorAll) return;
    let n2;
    try {
      n2 = Array.from(t2.querySelectorAll(":hover"));
    } catch {
      return;
    }
    let o2 = bs.get(t2) || [];
    if (o2.length === n2.length && o2.every((i2, s2) => i2 === n2[s2])) return;
    if (bs.set(t2, n2), zt(), t2.nodeType === 11) {
      t2.host ? _r(t2.host) : ae++;
      for (let i2 of t2.querySelectorAll("*")) we.set(i2, ae);
      return;
    }
    let r2 = o2.filter((i2) => !n2.includes(i2)).concat(n2.filter((i2) => !o2.includes(i2)));
    for (let i2 of r2) if (i2.isConnected) if (Fr(e2)) Er(i2);
    else {
      le++;
      return;
    }
  }
  function eo(t2, e2 = null) {
    if (!t2) return;
    ws(t2, t2);
    let n2 = e2 || Sn.filter(({ root: o2 }) => o2.host?.isConnected).map(({ root: o2 }) => o2);
    for (let o2 of n2) ws(o2, t2);
  }
  function Ut() {
    Ge();
    try {
      for (let t2 = Cn.length - 1; t2 >= 0; t2--) {
        let { o: e2, env: n2, doc: o2 } = Cn[t2];
        if (o2 !== document && !o2.defaultView) {
          try {
            e2.disconnect();
          } catch {
          }
          Mr.delete(o2), vn === o2 && (vn = null), Cn.splice(t2, 1);
          continue;
        }
        let r2 = e2.takeRecords();
        r2.length && (n2 ? Zn(r2) && (zt(), Rt++) : As(r2));
      }
      for (let t2 = Sn.length - 1; t2 >= 0; t2--) {
        let { o: e2, root: n2 } = Sn[t2];
        if (!n2.host || !n2.host.isConnected) {
          try {
            e2.disconnect();
          } catch {
          }
          kr.delete(n2), Sn.splice(t2, 1);
          continue;
        }
        let o2 = e2.takeRecords();
        o2.length && Ms(o2);
      }
    } catch {
    }
  }
  function ve(t2) {
    if (!(!t2 || t2.nodeType !== 1)) {
      ce.delete(t2);
      try {
        let e2 = (t2.ownerDocument || document).createTreeWalker(t2, NodeFilter.SHOW_ELEMENT);
        for (; e2.nextNode(); ) ce.delete(e2.currentNode);
      } catch {
      }
    }
  }
  function Tr(t2) {
    let e2 = ce.get(t2);
    if (e2 && no(e2, t2)) {
      let n2 = e2.snapshot && e2.snapshot.__needsBgInline;
      if (n2 !== void 0) return n2;
    }
    return true;
  }
  function _s(t2) {
    let e2 = ce.get(t2);
    if (!e2 || !no(e2, t2)) return null;
    let n2 = e2.snapshot;
    return !n2 || n2.__bgClipTextFix ? null : n2;
  }
  function _f(t2) {
    let e2 = t2.href;
    return !e2 || typeof CSSStyleSheet != "function" ? null : Kn.has(e2) ? Kn.get(e2) : (Kn.set(e2, null), ut(e2, { as: "text" }).then((n2) => {
      if (!n2.ok || typeof n2.data != "string" || /@import/i.test(n2.data)) return;
      let o2 = new CSSStyleSheet();
      o2.replaceSync(n2.data), Kn.set(e2, o2.cssRules), zt(), Rt++;
    }).catch(() => {
    }), null);
  }
  function Yt(t2) {
    let e2 = xs.get(t2);
    if (!e2 || e2.epoch !== He) {
      let n2 = e2 && e2.universe;
      e2 = { epoch: He, ...fs(t2, _f) };
      let o2 = e2.universe;
      if (n2 && o2 && n2.size === o2.size) {
        let r2 = true;
        for (let i2 of o2) if (!n2.has(i2)) {
          r2 = false;
          break;
        }
        r2 && (e2.universe = n2);
      }
      xs.set(t2, e2);
    }
    return e2;
  }
  function Pr(t2, e2) {
    return e2 ? (e2.__scan || (e2.__scan = Yt(t2), e2.__scanEnv = Rt), e2.__scan) : Yt(t2);
  }
  function Es(t2) {
    return Yt(t2).leaksAcrossSubtrees;
  }
  function Rs(t2) {
    try {
      let e2 = Yt(t2.ownerDocument || document).shareGate;
      if (e2 === null) return false;
      if (!e2.length) return true;
      let n2 = /* @__PURE__ */ new Set(), o2 = (s2) => {
        n2.add("t" + s2.localName), s2.id && n2.add("i" + s2.id);
        let a2 = s2.classList;
        for (let l2 = 0; l2 < a2.length; l2++) n2.add("c" + a2[l2]);
      };
      o2(t2);
      for (let s2 of t2.querySelectorAll("*")) o2(s2);
      let r2 = [];
      for (let { sel: s2, key: a2 } of e2) (a2 === null || n2.has(a2)) && r2.push(s2);
      if (!r2.length) return true;
      let i2 = r2.join(",");
      return !t2.matches(i2) && t2.querySelector(i2) === null;
    } catch {
      return false;
    }
  }
  function Ef(t2) {
    let e2 = t2.ownerDocument || document;
    return t2.getRootNode && t2.getRootNode() !== e2 ? null : Yt(e2).importantProps;
  }
  function qe(t2, e2) {
    let n2 = t2.ownerDocument || document, o2 = t2.getRootNode ? t2.getRootNode() : n2;
    return o2 === n2 ? Pr(n2, e2).universe : e2 && Jt(o2) ? Rf(t2, o2, n2, e2) : null;
  }
  function Rf(t2, e2, n2, o2) {
    let r2 = o2.__shadowUniverse;
    if (r2 === null) return null;
    if (!r2) {
      let a2 = Pr(n2, o2).universe;
      if (!a2) return o2.__shadowUniverse = null;
      r2 = o2.__shadowUniverse = { universe: new Set(a2), roots: /* @__PURE__ */ new Set() };
    }
    let i2 = (a2) => {
      for (; Jt(a2) && !r2.roots.has(a2); a2 = a2.host.getRootNode()) {
        r2.roots.add(a2);
        for (let l2 of [...a2.styleSheets, ...a2.adoptedStyleSheets || []]) {
          let u2 = Ss.get(l2);
          if ((!u2 || u2.epoch !== He) && Ss.set(l2, u2 = { epoch: He, props: cs(l2) }), !u2.props) return false;
          for (let c2 of u2.props) r2.universe.add(c2);
        }
        hr(a2.getAnimations(), r2.universe);
      }
      return true;
    }, s2 = i2(e2) && (!t2.shadowRoot || i2(t2.shadowRoot));
    for (let a2 = t2.assignedSlot; s2 && a2; a2 = a2.assignedSlot) s2 = i2(a2.getRootNode());
    return s2 ? r2.universe : o2.__shadowUniverse = null;
  }
  function Qn(t2, e2) {
    let n2 = t2.ownerDocument || document;
    return t2.getRootNode && t2.getRootNode() !== n2 ? null : Pr(n2, e2).pseudoUniverse;
  }
  function Fs(t2) {
    let e2 = t2.ownerDocument || document;
    return t2.getRootNode && t2.getRootNode() !== e2 ? null : Yt(e2).svgGeometry;
  }
  function $s(t2) {
    let e2 = Yt(t2.ownerDocument || document).svgGeometrySel;
    if (e2 == null) return true;
    if (!e2) return false;
    try {
      return t2.matches(e2);
    } catch {
      return true;
    }
  }
  function fe(t2) {
    let e2 = t2.ownerDocument || document;
    return t2.getRootNode && t2.getRootNode() !== e2 ? Ff : Yt(e2).pseudoGates;
  }
  function $f(t2, e2 = {}, n2 = null, o2 = null) {
    let r2 = {}, i2 = e2.excludeStyleProps, s2 = (h2) => {
      if (r2[h2] !== void 0 || We(h2) || i2 && (i2 instanceof RegExp && i2.test(h2) || typeof i2 == "function" && i2(h2))) return;
      let m2 = t2.getPropertyValue(h2);
      m2 && ((h2 === "background-image" || h2 === "content") && m2.includes("url(") && !m2.includes("data:") && (m2 = "none"), r2[h2] = m2);
    };
    if (o2) {
      for (let m2 of o2) s2(m2);
      let h2 = n2 && n2.style;
      if (h2 && h2.length) for (let m2 = 0; m2 < h2.length; m2++) s2(h2[m2]);
    } else for (let h2 = 0; h2 < t2.length; h2++) s2(t2[h2]);
    let a2 = ["text-decoration-line", "text-decoration-color", "text-decoration-style", "text-decoration-thickness", "text-underline-offset", "text-decoration-skip-ink"];
    for (let h2 of a2) if (!r2[h2]) try {
      let m2 = t2.getPropertyValue(h2);
      m2 && (r2[h2] = m2);
    } catch {
    }
    let l2 = ["-webkit-text-stroke", "-webkit-text-stroke-width", "-webkit-text-stroke-color", "paint-order"];
    for (let h2 of l2) if (!r2[h2]) try {
      let m2 = t2.getPropertyValue(h2);
      m2 && (r2[h2] = m2);
    } catch {
    }
    if (e2.embedFonts) {
      let h2 = ["font-feature-settings", "font-variation-settings", "font-kerning", "font-variant", "font-variant-ligatures", "font-optical-sizing"];
      for (let m2 of h2) if (!r2[m2]) try {
        let g2 = t2.getPropertyValue(m2);
        g2 && (r2[m2] = g2);
      } catch {
      }
    }
    try {
      (r2["content-visibility"] || t2.getPropertyValue("content-visibility")) === "hidden" && (r2["content-visibility"] = "hidden");
    } catch {
    }
    Object.defineProperty(r2, "__needsBgInline", { value: Ps(t2), enumerable: false });
    let u2 = parseFloat(t2.getPropertyValue("border-top-width") || 0) || 0, c2 = parseFloat(t2.getPropertyValue("border-right-width") || 0) || 0, f2 = parseFloat(t2.getPropertyValue("border-bottom-width") || 0) || 0, d2 = parseFloat(t2.getPropertyValue("border-left-width") || 0) || 0;
    if (u2 === 0 && c2 === 0 && f2 === 0 && d2 === 0) {
      let h2 = (t2.getPropertyValue("border-image-source") || "").trim(), m2 = h2 && h2 !== "none", g2 = ["border", "border-top", "border-right", "border-bottom", "border-left", "border-width", "border-style", "border-color", "border-top-width", "border-top-style", "border-top-color", "border-right-width", "border-right-style", "border-right-color", "border-bottom-width", "border-bottom-style", "border-bottom-color", "border-left-width", "border-left-style", "border-left-color", "border-block", "border-block-width", "border-block-style", "border-block-color", "border-inline", "border-inline-width", "border-inline-style", "border-inline-color", "border-block-start", "border-block-start-width", "border-block-start-style", "border-block-start-color", "border-block-end", "border-block-end-width", "border-block-end-style", "border-block-end-color", "border-inline-start", "border-inline-start-width", "border-inline-start-style", "border-inline-start-color", "border-inline-end", "border-inline-end-width", "border-inline-end-style", "border-inline-end-color"];
      for (let p2 of g2) delete r2[p2];
      m2 || (r2.border = "none");
    }
    return Tf(r2), r2;
  }
  function Tf(t2) {
    if (!_t()) return;
    let e2 = t2["background-clip"] || t2["-webkit-background-clip"];
    if (!e2 || !e2.includes("text")) return;
    let n2 = (i2) => i2 === "transparent" || i2 === "rgba(0, 0, 0, 0)", o2 = t2["-webkit-text-fill-color"];
    if (!n2(o2 !== void 0 ? o2 : t2.color)) return;
    let r2 = Lf(t2["background-image"], t2["background-color"]);
    r2 && (n2(t2.color) && (t2.color = r2), o2 !== void 0 && (t2["-webkit-text-fill-color"] = r2), t2["background-image"] = "none", t2["background-color"] = "transparent", delete t2["background-clip"], delete t2["-webkit-background-clip"], Object.defineProperty(t2, "__bgClipTextFix", { value: r2, enumerable: false }));
  }
  function Pf(t2, e2, n2) {
    let o2 = n2.textShadow;
    if (!o2 || o2 === "none" || !(parseFloat(n2.webkitTextStrokeWidth) > 0) || t2.firstElementChild || n2.backgroundImage !== "none" || n2.boxShadow !== "none" || Ts(n2.backgroundColor)[3] !== 0 || ["Top", "Right", "Bottom", "Left"].some((u2) => parseFloat(n2[`border${u2}Width`]) > 0) || o2.replace(/\([^)]*\)/g, "").includes(",")) return;
    let r2 = (o2.match(/(?:rgba?|hsla?|color|oklch|oklab|lab|lch)\([^)]*\)|#[\da-f]+|\b[a-z]+\b/i) || [])[0], [i2 = 0, s2 = 0, a2 = 0] = (o2.match(/-?[\d.]+px/g) || []).map(parseFloat);
    if (!r2) return;
    let l2 = n2.filter && n2.filter !== "none" ? `${n2.filter} ` : "";
    e2.style.setProperty("text-shadow", "none", "important"), e2.style.setProperty("filter", `${l2}drop-shadow(${i2}px ${s2}px ${a2 / 2}px ${r2})`, "important");
  }
  function Ts(t2) {
    if (!be) {
      let e2 = document.createElement("canvas");
      e2.width = e2.height = 1, be = e2.getContext("2d", { willReadFrequently: true });
    }
    return be.clearRect(0, 0, 1, 1), be.fillStyle = "transparent", be.fillStyle = t2, be.fillRect(0, 0, 1, 1), be.getImageData(0, 0, 1, 1).data;
  }
  function Lf(t2, e2) {
    let n2 = (i2) => {
      let s2 = [];
      for (let a2 of (i2 || "").match(Nf) || []) {
        let [l2, u2, c2, f2] = Ts(a2);
        f2 > 13 && s2.push([l2, u2, c2]);
      }
      return s2;
    }, o2 = n2(t2);
    if (o2.length || (o2 = n2(e2)), !o2.length) return null;
    let r2 = [0, 0, 0];
    for (let [i2, s2, a2] of o2) r2[0] += i2, r2[1] += s2, r2[2] += a2;
    return `rgb(${r2.map((i2) => Math.round(i2 / o2.length)).join(", ")})`;
  }
  function Ps(t2) {
    let e2 = t2.getPropertyValue("background-image");
    if (e2 && e2 !== "none") return true;
    let n2 = t2.getPropertyValue("background-color");
    if (n2 && n2 !== "rgba(0, 0, 0, 0)" && n2 !== "transparent") return true;
    for (let r2 of Af) {
      let i2 = t2.getPropertyValue(r2);
      if (i2 && i2 !== "none") return true;
    }
    let o2 = t2.getPropertyValue("background");
    return !!(o2 && /url\s*\(/i.test(o2));
  }
  function If(t2) {
    for (let e2 = t2.firstChild; e2; e2 = e2.nextSibling) {
      if (e2.nodeType === 3 && /\S/.test(e2.nodeValue || "")) return true;
      if (e2.nodeType === 1) {
        let n2 = O(e2).position;
        if (n2 !== "absolute" && n2 !== "fixed") return true;
      }
    }
    return false;
  }
  function Wf(t2, e2, n2) {
    try {
      if (typeof t2.computedStyleMap == "function") {
        let r2 = t2.computedStyleMap().get("width");
        if (r2 != null) return !vs(String(r2).trim().toLowerCase());
      }
    } catch {
    }
    let o2 = t2.style && (t2.style.width || t2.style.inlineSize);
    return o2 && !vs(String(o2).trim().toLowerCase()) ? true : Df(t2, e2) ? n2 || Bf(t2, e2) : false;
  }
  function vs(t2) {
    return Of.has(t2) || t2.startsWith("fit-content");
  }
  function Df(t2, e2) {
    let n2 = t2.getBoundingClientRect().width - (parseFloat(e2.paddingLeft) || 0) - (parseFloat(e2.paddingRight) || 0) - (parseFloat(e2.borderLeftWidth) || 0) - (parseFloat(e2.borderRightWidth) || 0);
    if (!(n2 > 0)) return false;
    let o2 = 1 / 0, r2 = -1 / 0, i2 = null;
    for (let s2 = t2.firstChild; s2; s2 = s2.nextSibling) {
      let a2;
      if (s2.nodeType === 3) {
        if (!/\S/.test(s2.nodeValue || "") || (i2 = i2 || document.createRange(), i2.selectNode(s2), a2 = i2.getBoundingClientRect(), !a2.width && !a2.height)) continue;
      } else if (s2.nodeType === 1) {
        let l2 = O(s2);
        if (l2.display === "none" || l2.position === "absolute" || l2.position === "fixed") continue;
        a2 = s2.getBoundingClientRect();
      } else continue;
      a2.left < o2 && (o2 = a2.left), a2.right > r2 && (r2 = a2.right);
    }
    return r2 === -1 / 0 ? false : r2 - o2 < n2 - 0.5;
  }
  function Bf(t2, e2) {
    let n2 = t2.parentElement;
    if (!n2) return false;
    let o2 = O(n2), r2 = n2.getBoundingClientRect().width - (parseFloat(o2.paddingLeft) || 0) - (parseFloat(o2.paddingRight) || 0) - (parseFloat(o2.borderLeftWidth) || 0) - (parseFloat(o2.borderRightWidth) || 0) - (parseFloat(e2.marginLeft) || 0) - (parseFloat(e2.marginRight) || 0);
    return r2 > 0 ? Math.abs(t2.getBoundingClientRect().width - r2) > 0.5 : false;
  }
  function zf(t2, e2) {
    let n2 = Ar.get(t2);
    if (n2) return n2;
    let o2 = [e2];
    for (let r2 in t2) o2.push(r2, t2[r2]);
    return n2 = o2.join(""), Ar.set(t2, n2), n2;
  }
  function no(t2, e2) {
    return t2.env === Rt && t2.stamp === to(e2, t2.hosts);
  }
  function Vf(t2) {
    let e2 = t2.__styleShare;
    return e2 || (e2 = t2.__styleShare = { ids: /* @__PURE__ */ new WeakMap(), intern: /* @__PURE__ */ new Map(), snaps: /* @__PURE__ */ new Map(), rootSeen: false }), e2;
  }
  function Gf(t2, e2) {
    let n2 = e2.ids.get(t2);
    if (n2 !== void 0) return n2;
    let o2 = t2.parentElement, r2;
    if (!o2) r2 = "R";
    else if (r2 = e2.ids.get(o2), r2 === void 0) {
      if (e2.rootSeen) return e2.ids.set(t2, -1), -1;
      r2 = "R";
    }
    if (e2.rootSeen = true, r2 === -1) return e2.ids.set(t2, -1), -1;
    let i2 = "", s2 = t2.attributes;
    if (s2 && s2.length) if (s2.length === 1) i2 = s2[0].name + "=" + s2[0].value;
    else {
      let l2 = [];
      for (let u2 = 0; u2 < s2.length; u2++) l2.push(s2[u2].name + "=" + s2[u2].value);
      l2.sort(), i2 = l2.join("");
    }
    let a2 = r2 + "|" + t2.tagName + "|" + i2;
    return n2 = e2.intern.get(a2), n2 === void 0 && (n2 = e2.intern.size, e2.intern.set(a2, n2)), e2.ids.set(t2, n2), n2;
  }
  function Ns(t2, e2) {
    let n2 = t2.snap, o2 = t2.snap = { ...n2 };
    Object.defineProperty(o2, "__needsBgInline", { value: n2.__needsBgInline, enumerable: false }), n2.__bgClipTextFix !== void 0 && Object.defineProperty(o2, "__bgClipTextFix", { value: n2.__bgClipTextFix, enumerable: false });
    let r2 = Yt(e2.ownerDocument || document), i2 = e2.getAttribute && e2.getAttribute("style") || "", s2 = i2 && Hf.test(i2), a2 = !!r2.marginUnstable || s2 && /margin/i.test(i2), l2 = !!r2.paddingUnstable || s2 && /padding/i.test(i2), u2 = o2.display !== void 0 && o2.display.includes("grid"), c2 = o2.transform !== void 0 && o2.transform !== "none", f2 = [];
    for (let m2 in o2) (Uf.test(m2) || u2 && (m2 === "grid-template-columns" || m2 === "grid-template-rows") || c2 && m2 === "transform" || a2 && m2.charCodeAt(0) === 109 && m2.startsWith("margin-") || l2 && m2.charCodeAt(0) === 112 && m2.startsWith("padding-")) && f2.push(m2);
    t2.h && !("height" in o2) && f2.push("height"), t2.b && !("block-size" in o2) && f2.push("block-size");
    let d2 = new Set(f2), h2 = [e2.tagName.toLowerCase()];
    for (let m2 in o2) d2.has(m2) || h2.push(m2, o2[m2]);
    return t2.rr = f2, t2.sig = h2.join("") + "" + f2.join(""), f2;
  }
  function Ls(t2, e2, n2, o2, r2) {
    let i2 = r2 && r2.__styleShare ? o2 && o2.__styleShare : null, s2 = i2 ? i2.ids.get(t2) : void 0;
    if (s2 === void 0 || s2 === -1 || t2.shadowRoot || t2.assignedSlot) return De(n2, Qn(t2, o2));
    let a2 = s2 + e2, l2 = i2.pseudo || (i2.pseudo = /* @__PURE__ */ new Map()), u2 = l2.get(a2);
    if (u2) {
      let f2 = { ...u2.snap }, d2 = u2.rr || Ns(u2, t2);
      for (let h2 = 0; h2 < d2.length; h2++) {
        let m2 = n2.getPropertyValue(d2[h2]);
        m2 ? f2[d2[h2]] = m2 : delete f2[d2[h2]];
      }
      return f2;
    }
    let c2 = De(n2, Qn(t2, o2));
    return l2.set(a2, { snap: c2, rr: null, sig: null, h: "height" in c2, b: "block-size" in c2 }), c2;
  }
  function qf(t2, e2 = null, n2 = {}, o2 = null, r2 = null) {
    let i2 = ce.get(t2), s2 = !!(n2 && n2.embedFonts), a2 = n2 && n2.excludeStyleProps || null;
    if (typeof a2 != "function" && i2 && no(i2, t2) && i2.embedFonts === s2 && i2.excludeStyleProps === a2) return i2.snapshot;
    let l2 = e2 || getComputedStyle(t2), u2, c2 = null, f2 = o2 && o2.st.snaps.get(o2.id);
    if (f2) {
      u2 = { ...f2.snap };
      let g2 = f2.rr || Ns(f2, t2);
      c2 = [];
      for (let p2 = 0; p2 < g2.length; p2++) {
        let y2 = g2[p2], b2 = l2.getPropertyValue(y2);
        b2 ? u2[y2] = b2 : delete u2[y2], c2.push(b2);
      }
      Object.defineProperty(u2, "__needsBgInline", { value: f2.snap.__needsBgInline, enumerable: false }), f2.snap.__bgClipTextFix !== void 0 && Object.defineProperty(u2, "__bgClipTextFix", { value: f2.snap.__bgClipTextFix, enumerable: false });
    } else u2 = $f(l2, n2, t2, qe(t2, r2)), o2 && o2.st.snaps.set(o2.id, { snap: u2, rr: null, sig: null, h: "height" in u2, b: "block-size" in u2 });
    let d2 = false;
    if (typeof t2.computedStyleMap == "function") {
      let g2;
      for (let p2 of ys) if (u2[p2] === "0px") try {
        g2 || (g2 = t2.computedStyleMap()), g2.get(p2)?.toString() === "auto" && (u2[p2] = "auto", d2 = true);
      } catch {
      }
    }
    lu(t2, l2, u2);
    let h2 = Zf(t2, l2, u2);
    c2 !== null && (d2 && c2.push("", ...ys.map((g2) => u2[g2])), h2 && c2.push("" + h2), Ar.set(u2, f2.sig + "" + c2.join("") + ("height" in u2 ? "" : "") + ("block-size" in u2 ? "" : "")));
    let m2 = Rr(t2);
    return ce.set(t2, { env: r2?.__scanEnv ?? Rt, stamp: to(t2, m2), hosts: m2, snapshot: u2, embedFonts: s2, excludeStyleProps: a2 }), u2;
  }
  function Xf(t2, e2) {
    if (t2 && t2.session && t2.persist) return t2;
    if (t2 && (t2.styleMap || t2.styleCache || t2.nodeMap)) {
      let n2 = t2.__ctx;
      return (!n2 || t2.__ctxOpts !== e2) && (n2 = { session: t2, persist: { snapshotKeyCache: vr, defaultStyle: j.defaultStyle, baseStyle: j.baseStyle, image: j.image, resource: j.resource, background: j.background }, options: e2 || {} }, t2.__ctx = n2, t2.__ctxOpts = e2), n2;
    }
    return { session: { styleMap: /* @__PURE__ */ new Map(), styleCache: /* @__PURE__ */ new WeakMap(), nodeMap: /* @__PURE__ */ new Map() }, persist: { snapshotKeyCache: vr, defaultStyle: j.defaultStyle, baseStyle: j.baseStyle, image: j.image, resource: j.resource, background: j.background }, options: t2 || e2 || {} };
  }
  function Jf(t2, e2, n2) {
    if (!t2.style || t2.style.length === 0) return;
    let o2 = Ef(t2), r2 = o2 != null && !Yf.test(t2.getAttribute("style") || ""), i2;
    for (let s2 = 0; s2 < t2.style.length; s2++) {
      let a2 = t2.style[s2], l2 = a2.startsWith("border-") && a2.endsWith("-width");
      if (r2 && l2 && i2 === void 0) {
        let c2 = t2.style.borderWidth, f2 = ce.get(t2);
        i2 = f2 && no(f2, t2) && Is.every((d2) => f2.snapshot[d2] === c2) || n2.borderWidth === c2;
      }
      if (r2 && !o2.has(a2) && (!l2 || i2) && !(a2.startsWith("background") && Kf(t2))) continue;
      let u2 = n2.getPropertyValue(a2);
      u2 && (!l2 || u2 !== t2.style.getPropertyValue(a2)) && e2.style.setProperty(a2, u2, t2.style.getPropertyPriority(a2));
    }
  }
  function xt(t2, e2, n2, o2) {
    if (t2.tagName === "STYLE") return;
    let r2 = Xf(n2, o2), i2 = r2.options && r2.options.cache || "soft";
    i2 !== "disabled" && Ge(t2.ownerDocument), i2 === "disabled" && !r2.session.__bumpedForDisabled && (zt(), vr.clear(), r2.session.__bumpedForDisabled = true);
    let { session: s2, persist: a2 } = r2;
    if (!s2.styleCache.has(t2)) {
      let y2 = null;
      try {
        y2 = getComputedStyle(t2);
      } catch {
      }
      s2.styleCache.set(t2, y2 || getComputedStyle((t2.ownerDocument || document).documentElement));
    }
    let l2 = s2.styleCache.get(t2);
    t2.getAttribute?.("style") && Jf(t2, e2, l2);
    let u2 = l2.getPropertyValue("animation-name");
    e2 && e2.style && u2 && u2 !== "none" && e2.style.setProperty("animation", "none", "important");
    let c2 = t2.tagName?.toLowerCase() || "div";
    if (gn.has(c2)) {
      let y2 = {};
      Object.defineProperty(y2, "__needsBgInline", { value: Ps(l2), enumerable: false });
      let b2 = Rr(t2);
      ce.set(t2, { env: Rt, stamp: to(t2, b2), hosts: b2, snapshot: y2, embedFonts: !!(r2.options && r2.options.embedFonts), excludeStyleProps: r2.options && r2.options.excludeStyleProps || null }), s2.styleMap.set(e2, "");
      return;
    }
    let f2 = null;
    if (r2.options && r2.options.__styleShare && s2.styleMap) {
      let y2 = Vf(s2), b2 = Gf(t2, y2), w2 = t2.ownerDocument || document, S2 = w2.activeElement;
      b2 !== -1 && !jf.has(t2.tagName) && !(S2 && S2 !== w2.body && S2 !== w2.documentElement && S2 === t2) && (!t2.getRootNode || t2.getRootNode() === w2) && !t2.shadowRoot && !t2.assignedSlot && (f2 = { st: y2, id: b2 });
    }
    let d2 = qf(t2, l2, r2.options, f2, s2);
    if (t2.getAttribute?.("style")) for (let y2 of ["top", "right", "bottom", "left"]) {
      let b2 = `margin-${y2}`;
      d2[b2] === "auto" && e2.style.setProperty(b2, "auto", "important");
    }
    d2.__bgClipTextFix && e2 && e2.style && (e2.style.setProperty("background-image", "none", "important"), e2.style.setProperty("background-color", "transparent", "important"), e2.style.setProperty("color", d2.__bgClipTextFix, "important"), e2.style.setProperty("-webkit-text-fill-color", d2.__bgClipTextFix, "important"), (s2.bgClipText || (s2.bgClipText = [])).push([t2, e2])), Y() && Pf(t2, e2, l2), Qf(t2, l2, d2), e2.style?.length && d2["box-sizing"] === "border-box" && l2.getPropertyValue("box-sizing") !== "border-box" && nu(t2, e2, d2);
    let h2 = zs(t2);
    if (ru(t2, e2, d2, h2, s2), h2) {
      let y2 = l2.getPropertyValue("min-width");
      if (!y2 || y2 === "auto" || y2 === "0px") {
        d2["min-width"] = "0px";
        let b2 = l2.getPropertyValue("overflow-x"), w2 = t2.parentElement;
        if (y2 === "auto" && (b2 === "visible" || b2 === "clip") && w2 && O(w2).display.includes("flex")) {
          let S2 = s2.flexOverflow || (s2.flexOverflow = /* @__PURE__ */ new WeakMap()), v2 = S2.get(w2);
          if (v2 === void 0) {
            if (v2 = w2.scrollWidth > w2.clientWidth, !v2) {
              let C = O(w2), M = (P) => parseFloat(C.getPropertyValue(P)) || 0, $2 = M("width") - (C.boxSizing === "border-box" ? M("padding-left") + M("padding-right") + M("border-left-width") + M("border-right-width") : 0), A = C.flexDirection.startsWith("row") === (C.writingMode === "horizontal-tb") && C.flexWrap === "nowrap", x2 = 0, _2 = 0;
              for (let P of w2.children) {
                s2.styleCache.has(P) || s2.styleCache.set(P, getComputedStyle(P));
                let E = s2.styleCache.get(P);
                if (E.display === "none" || E.position === "absolute" || E.position === "fixed") continue;
                let R = (k) => parseFloat(E.getPropertyValue(k)) || 0, L = R("width") + R("margin-left") + R("margin-right") + (E.boxSizing === "border-box" ? 0 : R("padding-left") + R("padding-right") + R("border-left-width") + R("border-right-width"));
                x2 = A ? x2 + L : Math.max(x2, L), _2++;
              }
              v2 = x2 + (A ? Math.max(0, _2 - 1) * M("column-gap") : 0) > $2 + _2 / 60;
            }
            S2.set(w2, v2);
          }
          v2 && (d2["min-width"] = d2.width);
        }
      }
    }
    let m2 = zf(d2, c2), g2 = true;
    if (Xn(c2, (d2.display || "").toLowerCase())) {
      g2 = If(t2), g2 && yr(c2, d2, h2) && Wf(t2, l2, h2) && (g2 = false), m2 = `${m2}${g2 ? "|c" : ""}${h2 ? "|f" : ""}`;
      let y2 = d2["text-wrap-mode"] || d2["white-space"] || "";
      g2 && y2 !== "nowrap" && y2 !== "pre" && (s2.reconcileRisk = (s2.reconcileRisk || 0) + 1);
    }
    let p2 = a2.snapshotKeyCache.get(m2);
    p2 === void 0 && (p2 = Oe(d2, c2, g2, h2), a2.snapshotKeyCache.size >= Cf && a2.snapshotKeyCache.delete(a2.snapshotKeyCache.keys().next().value), a2.snapshotKeyCache.set(m2, p2)), s2.styleMap.set(e2, p2);
  }
  function Qf(t2, e2, n2) {
    let o2 = e2.getPropertyValue("overflow-x"), r2 = e2.getPropertyValue("overflow-y");
    if ((o2 === "visible" || !o2) && (r2 === "visible" || !r2) || e2.getPropertyValue("box-sizing") === "border-box" || typeof t2.clientWidth != "number" || !t2.offsetWidth) return;
    let i2 = (u2) => parseFloat(u2) || 0, s2 = t2.offsetWidth - t2.clientWidth - i2(e2.getPropertyValue("border-left-width")) - i2(e2.getPropertyValue("border-right-width")), a2 = t2.offsetHeight - t2.clientHeight - i2(e2.getPropertyValue("border-top-width")) - i2(e2.getPropertyValue("border-bottom-width")), l2 = (u2, c2) => {
      let f2 = n2[u2];
      if (!f2 || !f2.endsWith("px")) return;
      let d2 = parseFloat(f2);
      Number.isFinite(d2) && (n2[u2] = `${Math.round((d2 + c2) * 1e3) / 1e3}px`);
    };
    s2 >= 2 && (l2("width", s2), l2("inline-size", s2)), a2 >= 2 && (l2("height", a2), l2("block-size", a2));
  }
  function Zf(t2, e2, n2) {
    if (!Is.some((l2) => n2[l2]?.includes(".")) || e2.getPropertyValue("box-sizing") === "border-box" || n2.display === "inline") return "";
    for (let l2 of ["width", "height"]) {
      let u2 = n2[`min-${l2}`], c2 = n2[`max-${l2}`];
      if (u2 && u2 !== "0px" && u2 !== "auto" || c2 && c2 !== "none") return "";
    }
    let o2 = (l2) => parseFloat(n2[l2]) || 0, r2 = o2("padding-left") + o2("padding-right") + o2("border-left-width") + o2("border-right-width"), i2 = o2("padding-top") + o2("padding-bottom") + o2("border-top-width") + o2("border-bottom-width"), s2 = (n2["writing-mode"] || "horizontal-tb") !== "horizontal-tb";
    for (let l2 of Ws) {
      let u2 = n2[l2];
      if (!u2 || !u2.endsWith("px")) continue;
      let f2 = l2 === "width" || l2 === "inline-size" && !s2 || l2 === "block-size" && s2 ? r2 : i2;
      n2[l2] = `${Math.round((parseFloat(u2) + f2) * 1e3) / 1e3}px`;
    }
    n2["box-sizing"] = "border-box";
    let a2 = "";
    if (e2.getPropertyValue("overflow-x") === "auto") {
      let l2 = t2.scrollWidth <= t2.clientWidth;
      n2["overflow-x"] = l2 ? "hidden" : "auto", l2 && (a2 += "x");
    }
    if (e2.getPropertyValue("overflow-y") === "auto") {
      let l2 = t2.scrollHeight <= t2.clientHeight;
      n2["overflow-y"] = l2 ? "hidden" : "auto", l2 && (a2 += "y");
    }
    return a2;
  }
  function nu(t2, e2, n2) {
    if (eu.test(t2.getAttribute("style"))) for (let o2 of tu) e2.style.getPropertyValue(o2) && n2[o2] && e2.style.setProperty(o2, n2[o2], e2.style.getPropertyPriority(o2));
  }
  function ou(t2) {
    return t2.backgroundImage && t2.backgroundImage !== "none" || t2.backgroundColor && t2.backgroundColor !== "rgba(0, 0, 0, 0)" && t2.backgroundColor !== "transparent" || (parseFloat(t2.borderTopWidth) || 0) > 0 || (parseFloat(t2.borderBottomWidth) || 0) > 0 || (parseFloat(t2.paddingTop) || 0) > 0 || (parseFloat(t2.paddingBottom) || 0) > 0 ? true : (t2.overflowBlock || t2.overflowY || "visible") !== "visible";
  }
  function ru(t2, e2, n2, o2, r2) {
    let i2 = n2["text-wrap-mode"] || n2["white-space"] || "", s2 = i2 === "nowrap" || i2 === "pre" || Ue === "white-space" && i2 !== "normal", a2 = r2.__oneLine || (r2.__oneLine = /* @__PURE__ */ new WeakSet());
    if (a2.has(t2.parentElement)) {
      a2.add(t2), !s2 && e2.style && e2.style.setProperty(Ue, "nowrap");
      return;
    }
    let l2 = n2.display || "";
    !o2 && !l2.startsWith("inline-") && (n2.float || "none") === "none" && n2.position !== "absolute" && n2.position !== "fixed" || s2 || (n2["writing-mode"] || "horizontal-tb") !== "horizontal-tb" || !e2.style || iu(t2, n2, r2) && (a2.add(t2), e2.style.setProperty(Ue, "nowrap"));
  }
  function iu(t2, e2, n2) {
    let o2 = t2.clientHeight - (parseFloat(e2["padding-top"]) || 0) - (parseFloat(e2["padding-bottom"]) || 0);
    if (o2 > 3 * (parseFloat(e2["font-size"]) || 16) || e2["word-break"] === "normal" && e2["overflow-wrap"] === "normal" && /^[\w\u00C0-\u024F.,:;!?'"()%]*$/.test(t2.textContent.trim())) return false;
    let r2 = t2.ownerDocument || document, i2 = r2.createTreeWalker(t2, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT), s2 = r2.createRange(), a2 = null, l2 = 0, u2 = 0, c2 = 0;
    for (let h2 = i2.nextNode(); h2; h2 = i2.nextNode()) {
      if (h2.nodeType === 1) {
        if (h2.shadowRoot || h2.localName === "br" || h2.localName === "textarea") return false;
        continue;
      }
      if (/\S/.test(h2.data)) {
        if (++u2 > 64) return false;
        s2.selectNodeContents(h2);
        for (let m2 of s2.getClientRects()) if (m2.height) {
          if (c2++, a2 || (a2 = m2), Math.min(a2.bottom, m2.bottom) - Math.max(a2.top, m2.top) < Math.min(a2.height, m2.height) / 2) return false;
          l2 = Math.max(l2, m2.height);
        }
      }
    }
    if (!a2) return false;
    let f2 = Bs(t2, n2.__axes || (n2.__axes = /* @__PURE__ */ new WeakMap()));
    if (f2 === Os) return u2 === 1 && c2 === 1 && !t2.childElementCount;
    let d2 = f2 === Ds && t2.offsetHeight ? t2.getBoundingClientRect().height / t2.offsetHeight : 1;
    return o2 * d2 <= 2 * l2;
  }
  function Bs(t2, e2) {
    let n2 = e2.get(t2);
    if (n2 !== void 0) return n2;
    let o2 = O(t2), r2 = o2.transform, i2 = r2 && r2 !== "none" ? r2.slice(r2.indexOf("(") + 1, -1).split(",").map(parseFloat) : null;
    if (o2.rotate && o2.rotate !== "none" || i2 && (r2.startsWith("matrix3d") ? i2[1] || i2[4] : i2[1] || i2[2])) n2 = Os;
    else {
      let s2 = t2.parentElement || Bt(t2);
      n2 = s2 ? Bs(s2, e2) : Cs, n2 === Cs && (o2.scale && o2.scale !== "none" || o2.zoom && o2.zoom !== "1" || i2 && (r2.startsWith("matrix3d") ? i2[0] !== 1 || i2[5] !== 1 : i2[0] !== 1 || i2[3] !== 1)) && (n2 = Ds);
    }
    return e2.set(t2, n2), n2;
  }
  function zs(t2) {
    let e2 = t2.parentElement;
    if (!e2) return false;
    let n2 = O(e2).display || "";
    return n2.includes("flex") || n2.includes("grid");
  }
  function su(t2) {
    for (let o2 = t2.firstChild; o2; o2 = o2.nextSibling) if (o2.nodeType === 3 && /\S/.test(o2.nodeValue)) return true;
    let e2 = t2.firstElementChild, n2 = t2.lastElementChild;
    if (e2 && e2.tagName === "BR" || n2 && n2.tagName === "BR") return true;
    for (let o2 = t2.firstElementChild; o2; o2 = o2.nextElementSibling) {
      let r2 = O(o2);
      if (r2.display === "none") continue;
      let i2 = r2.position;
      if (i2 !== "absolute" && i2 !== "fixed") return true;
    }
    return false;
  }
  function au(t2) {
    let e2 = t2.getBoundingClientRect().top, n2 = -1 / 0, o2 = null;
    for (let r2 = t2.firstChild; r2; r2 = r2.nextSibling) {
      if (r2.nodeType === 3) {
        if (!/\S/.test(r2.nodeValue || "")) continue;
        o2 = o2 || document.createRange(), o2.selectNode(r2);
        let a2 = o2.getBoundingClientRect();
        (a2.width || a2.height) && (n2 = Math.max(n2, a2.bottom));
        continue;
      }
      if (r2.nodeType !== 1) continue;
      let i2 = O(r2);
      if (i2.display === "none") continue;
      let s2 = i2.position;
      s2 === "absolute" || s2 === "fixed" || i2.float && i2.float !== "none" || (n2 = Math.max(n2, r2.getBoundingClientRect().bottom));
    }
    return n2 === -1 / 0 ? NaN : n2 - e2;
  }
  function lu(t2, e2, n2) {
    if (Pt(t2) && t2.style && t2.style.height) return;
    let o2 = t2.tagName && t2.tagName.toLowerCase();
    if (!o2 || !["div", "section", "article", "main", "aside", "header", "footer", "nav"].includes(o2) || e2.aspectRatio && e2.aspectRatio !== "none" && e2.aspectRatio !== "auto") return;
    let i2 = e2.display || "";
    if (i2.includes("flex") || i2.includes("grid")) return;
    let s2 = e2.position;
    if (s2 === "absolute" || s2 === "fixed" || s2 === "sticky" || e2.transform !== "none" || ou(e2) || zs(t2)) return;
    let a2 = e2.overflowX || e2.overflow || "visible", l2 = e2.overflowY || e2.overflow || "visible";
    if (a2 !== "visible" || l2 !== "visible") return;
    let u2 = e2.clip;
    if (u2 && u2 !== "auto" && u2 !== "rect(auto, auto, auto, auto)" || e2.visibility === "hidden" || e2.opacity === "0" || !su(t2)) return;
    let c2 = parseFloat(e2.height), f2 = au(t2);
    Number.isFinite(c2) && Number.isFinite(f2) && Math.abs(c2 - f2) > 2 || (delete n2.height, delete n2["block-size"]);
  }
  function oo(t2) {
    let e2 = Se();
    return e2 !== Us && (Nr = /* @__PURE__ */ new WeakMap(), Us = e2), Hs(t2);
  }
  function Hs(t2) {
    let e2 = Nr.get(t2);
    if (e2 !== void 0) return e2;
    let n2;
    if (t2.namespaceURI === "http://www.w3.org/2000/svg" && (fu.has(t2.localName) ? n2 = false : cu.has(t2.localName) && (n2 = true)), n2 === void 0) {
      let o2 = t2.parentNode;
      n2 = !!(o2 && o2.nodeType === 1) && Hs(o2);
    }
    return Nr.set(t2, n2), n2;
  }
  function js(t2, e2) {
    if (t2?.nodeType !== 1 || e2?.nodeType !== 1 || oo(t2)) return;
    let n2 = t2.getAttribute?.("style"), o2 = !!(n2 && n2.includes("var("));
    if (!o2 && t2.attributes?.length) {
      let i2 = t2.attributes;
      for (let s2 = 0; s2 < i2.length; s2++) {
        let a2 = i2[s2];
        if (a2 && typeof a2.value == "string" && !a2.value.startsWith("data:") && a2.value.includes("var(")) {
          o2 = true;
          break;
        }
      }
    }
    let r2 = null;
    if (o2) try {
      r2 = getComputedStyle(t2);
    } catch {
    }
    if (o2) {
      let i2 = t2.style;
      if (i2 && i2.length) {
        let s2 = /* @__PURE__ */ new Set();
        for (let a2 = 0; a2 < i2.length; a2++) {
          let l2 = i2[a2];
          if (s2.has(l2)) continue;
          s2.add(l2);
          let u2 = i2.getPropertyValue(l2);
          if (!u2 || !u2.includes("var(")) continue;
          let c2 = r2 && r2.getPropertyValue(l2);
          if (c2) try {
            e2.style.setProperty(l2, c2.trim(), i2.getPropertyPriority(l2));
          } catch {
          }
        }
      }
    }
    if (o2 && t2.attributes?.length) {
      let i2 = t2.attributes;
      for (let s2 = 0; s2 < i2.length; s2++) {
        let a2 = i2[s2];
        if (!a2 || typeof a2.value != "string" || a2.value.startsWith("data:") || !a2.value.includes("var(")) continue;
        let l2 = a2.name, u2 = r2 && r2.getPropertyValue(l2);
        if (u2) try {
          e2.style.setProperty(l2, u2.trim());
        } catch {
        }
      }
    }
  }
  function Xe(t2) {
    return !!(!t2 || t2.startsWith("data:") || t2.startsWith("blob:"));
  }
  function Ye(t2, e2) {
    if (!t2) return null;
    let n2 = 0;
    try {
      n2 = e2 ? e2.getBoundingClientRect().width || e2.width : 0;
    } catch {
    }
    n2 || (n2 = window.innerWidth || 1e3);
    let o2 = [];
    for (let i2 of t2.split(",")) {
      let s2 = i2.trim().split(/\s+/);
      if (!s2[0]) continue;
      let a2 = s2[1] || "", l2 = 1;
      /^\d*\.?\d+x$/i.test(a2) ? l2 = parseFloat(a2) : /^\d+w$/i.test(a2) && (l2 = parseInt(a2, 10) / n2), o2.push({ url: s2[0], d: l2 });
    }
    if (!o2.length) return null;
    o2.sort((i2, s2) => i2.d - s2.d);
    let r2 = window.devicePixelRatio || 1;
    return (o2.find((i2) => i2.d >= r2) || o2[o2.length - 1]).url;
  }
  function Vs(t2, e2) {
    let n2 = t2.currentSrc || "";
    if (n2 && !Xe(n2)) return n2;
    let o2 = e2.querySelectorAll("source[srcset]"), r2 = null;
    for (let i2 of o2) {
      let s2 = i2.getAttribute("srcset");
      if (!s2 || Xe(s2)) continue;
      let a2 = i2.getAttribute("type");
      if (a2 && !ir.test(a2.trim())) continue;
      let l2 = i2.getAttribute("media");
      if (l2) try {
        if (window.matchMedia(l2).matches) return Ye(s2, t2);
      } catch {
      }
      r2 || (r2 = Ye(s2, t2));
    }
    return r2;
  }
  function Gs(t2) {
    let e2 = [t2.getAttribute("data-src"), t2.getAttribute("data-lazy-src"), t2.getAttribute("data-original"), t2.getAttribute("data-hi-res-src")];
    for (let o2 of e2) if (o2 && !Xe(o2)) return o2;
    let n2 = t2.getAttribute("data-srcset") || t2.getAttribute("data-lazy-srcset");
    if (n2) {
      let o2 = n2.split(",")[0].trim().split(/\s+/)[0];
      if (o2 && !Xe(o2)) return o2;
    }
    return null;
  }
  function uu(t2, e2) {
    if (t2 = t2.trim(), !t2) return t2;
    let n2 = e2 ? `[data-sd-slotted~="${e2}"]` : "[data-sd-slotted]";
    return t2.endsWith(":not([data-sd-slotted])") || t2.endsWith(`:not(${n2})`) ? t2 : `${t2}:not(${n2})`;
  }
  function hu(t2, e2, n2 = true, o2) {
    return Gn(t2, ",").map((r2) => r2.trim()).filter(Boolean).map((r2) => {
      if (r2.startsWith(":where(") && r2.includes("data-sd") || r2.startsWith("@")) return r2;
      let i2 = r2.match(du);
      if (i2 && pu.test(i2[0])) return ":not(*)";
      let s2 = i2 ? r2.slice(0, i2.index).trim() : r2, a2 = n2 ? uu(s2, o2) : s2;
      return `:where(${e2} ${a2})${i2 ? i2[0] : ""}`;
    }).join(", ");
  }
  function Ks(t2, e2, n2) {
    return t2 ? (t2 = t2.replace(/:host-context\(([^)]+)\)/g, (o2, r2) => `:where(:where(${r2.trim()}) ${e2})`), t2 = t2.replace(/:host\(([^)]+)\)/g, (o2, r2) => `:where(${e2}:is(${r2.trim()}))`), t2 = t2.replace(/:host\b/g, `:where(${e2})`), t2 = t2.replace(/::slotted\(([^)]+)\)/g, (o2, r2) => `:where(${e2} ${r2.trim()})`), t2 = t2.replace(/(^|})(\s*)([^@}{]+){/g, (o2, r2, i2, s2) => {
      let a2 = hu(s2, e2, true, n2);
      return `${r2}${i2}${a2}{`;
    }), t2) : "";
  }
  function Js(t2) {
    return t2.shadowScopeSeq = (t2.shadowScopeSeq || 0) + 1, `s${t2.shadowScopeSeq}`;
  }
  function Ce(t2) {
    let e2 = "";
    for (let n2 of t2) if (n2.media && n2.cssRules) {
      let o2 = false;
      try {
        o2 = window.matchMedia(n2.conditionText || n2.media.mediaText).matches;
      } catch {
      }
      o2 && (e2 += Ce(n2.cssRules));
    } else if (n2.constructor?.name === "CSSSupportsRule") e2 += `@supports ${n2.conditionText}{${Ce(n2.cssRules)}}`;
    else if (n2.cssRules && n2.cssRules.length && /@media/i.test(n2.cssText)) {
      let o2 = n2.cssText.slice(0, n2.cssText.indexOf("{") + 1);
      e2 += o2 + (n2.style ? n2.style.cssText : "") + Ce(n2.cssRules) + "}";
    } else e2 += n2.cssText + `
`;
    return e2;
  }
  function Qs(t2) {
    let e2 = "";
    try {
      t2.querySelectorAll("style").forEach((o2) => {
        let r2 = null;
        try {
          r2 = o2.sheet && o2.sheet.cssRules;
        } catch {
        }
        e2 += (r2 ? Ce(r2) : o2.textContent || "") + `
`;
      });
      let n2 = t2.adoptedStyleSheets || [];
      for (let o2 of n2) try {
        o2 && o2.cssRules && (e2 += Ce(o2.cssRules));
      } catch {
      }
    } catch {
    }
    return e2;
  }
  function Zs(t2, e2, n2) {
    if (!e2) return;
    let o2 = document.createElement("style");
    o2.setAttribute("data-sd", n2), o2.textContent = e2, t2.insertBefore(o2, t2.firstChild || null);
  }
  function ta(t2, e2, n2 = {}) {
    try {
      let o2 = null, r2 = O(t2).content;
      if (r2 && r2.includes("url(")) {
        let u2 = r2.match(/url\(["']?([^"')]+)["']?\)/);
        u2 && (o2 = u2[1]);
      }
      let i2 = t2.closest?.("picture"), s2 = t2.getAttribute("src") || "", a2 = t2.getAttribute("srcset") || "", l2 = o2 || (i2 ? Vs(t2, i2) : !a2.trim() && s2.startsWith("data:") ? s2 : t2.currentSrc) || Ye(a2, t2) || t2.src || "";
      if ((!l2 || Xe(l2)) && n2.resolvePicturePlaceholders !== false) {
        let u2 = Gs(t2);
        u2 && (l2 = u2);
      }
      if (!l2) return;
      e2.getAttribute("src") !== l2 && e2.setAttribute("src", l2), e2.removeAttribute("srcset"), e2.removeAttribute("sizes"), e2.loading = "eager", e2.decoding = "sync";
    } catch {
    }
  }
  function ea(t2) {
    let e2 = /* @__PURE__ */ new Set();
    if (!t2) return e2;
    let n2 = /var\(\s*(--[A-Za-z0-9_-]+)\b/g, o2;
    for (; o2 = n2.exec(t2); ) e2.add(o2[1]);
    return e2;
  }
  function mu(t2, e2) {
    try {
      let o2 = getComputedStyle(t2).getPropertyValue(e2).trim();
      if (o2) return o2;
    } catch {
    }
    try {
      let o2 = getComputedStyle(document.documentElement).getPropertyValue(e2).trim();
      if (o2) return o2;
    } catch {
    }
    return "";
  }
  function na(t2, e2, n2) {
    let o2 = [];
    for (let r2 of e2) {
      let i2 = mu(t2, r2);
      i2 && o2.push(`${r2}: ${i2};`);
    }
    return o2.length ? `${n2}{${o2.join("")}}
` : "";
  }
  function oa(t2, e2) {
    if (!t2) return;
    let n2 = (o2) => {
      let r2 = o2.getAttribute("data-sd-slotted") || "";
      e2 ? ` ${r2} `.includes(` ${e2} `) || o2.setAttribute("data-sd-slotted", r2 ? `${r2} ${e2}` : e2) : o2.setAttribute("data-sd-slotted", r2);
    };
    t2.nodeType === Node.ELEMENT_NODE && n2(t2), t2.querySelectorAll?.("*").forEach(n2);
  }
  async function gu(t2, e2 = 3) {
    let n2 = () => {
      try {
        return t2.contentDocument || t2.contentWindow?.document || null;
      } catch {
        return null;
      }
    }, o2 = n2(), r2 = 0;
    for (; r2 < e2 && (!o2 || !o2.body && !o2.documentElement); ) await new Promise((i2) => setTimeout(i2, 0)), o2 = n2(), r2++;
    return o2 && (o2.body || o2.documentElement) ? o2 : null;
  }
  function yu(t2) {
    let e2 = t2.getBoundingClientRect(), n2 = 0, o2 = 0, r2 = 0, i2 = 0;
    try {
      let l2 = getComputedStyle(t2);
      n2 = parseFloat(l2.borderLeftWidth) || 0, o2 = parseFloat(l2.borderRightWidth) || 0, r2 = parseFloat(l2.borderTopWidth) || 0, i2 = parseFloat(l2.borderBottomWidth) || 0;
    } catch {
    }
    let s2 = Math.max(0, Math.round(e2.width - (n2 + o2))), a2 = Math.max(0, Math.round(e2.height - (r2 + i2)));
    return { contentWidth: s2, contentHeight: a2, rect: e2 };
  }
  function Ft(t2) {
    let e2 = 0, n2 = 0;
    if (t2.offsetWidth > 0 && (e2 = t2.offsetWidth), t2.offsetHeight > 0 && (n2 = t2.offsetHeight), e2 === 0 || n2 === 0) try {
      let o2 = getComputedStyle(t2);
      if (e2 === 0) {
        let r2 = parseFloat(o2.width);
        !isNaN(r2) && r2 > 0 && (e2 = r2);
      }
      if (n2 === 0) {
        let r2 = parseFloat(o2.height);
        !isNaN(r2) && r2 > 0 && (n2 = r2);
      }
    } catch {
    }
    if (e2 === 0 || n2 === 0) try {
      if (e2 === 0) {
        let o2 = parseFloat(t2.getAttribute("width"));
        !isNaN(o2) && o2 > 0 && (e2 = o2);
      }
      if (n2 === 0) {
        let o2 = parseFloat(t2.getAttribute("height"));
        !isNaN(o2) && o2 > 0 && (n2 = o2);
      }
    } catch {
    }
    if ((e2 === 0 || n2 === 0) && (t2.naturalWidth || t2.naturalHeight)) try {
      e2 === 0 && t2.naturalWidth > 0 && (e2 = t2.naturalWidth), n2 === 0 && t2.naturalHeight > 0 && (n2 = t2.naturalHeight);
    } catch {
    }
    return { width: e2, height: n2 };
  }
  function bu(t2, e2, n2) {
    let o2 = t2.defaultView, r2 = o2 ? o2.scrollX : 0, i2 = o2 ? o2.scrollY : 0, s2 = t2.body ? t2.body.scrollLeft : 0, a2 = t2.body ? t2.body.scrollTop : 0, l2 = t2.documentElement ? t2.documentElement.scrollLeft : 0, u2 = t2.documentElement ? t2.documentElement.scrollTop : 0, c2 = 0, f2 = 0, d2 = 0, h2 = 0;
    try {
      let p2 = o2 && t2.body ? o2.getComputedStyle(t2.body) : null;
      p2 && (c2 = (parseFloat(p2.marginTop) || 0) + (parseFloat(p2.paddingTop) || 0), f2 = (parseFloat(p2.marginRight) || 0) + (parseFloat(p2.paddingRight) || 0), d2 = (parseFloat(p2.marginBottom) || 0) + (parseFloat(p2.paddingBottom) || 0), h2 = (parseFloat(p2.marginLeft) || 0) + (parseFloat(p2.paddingLeft) || 0));
    } catch {
    }
    let m2 = `html {margin: 0 !important;padding: 0 !important;width: ${e2}px !important;height: ${n2}px !important;min-width: ${e2}px !important;min-height: ${n2}px !important;box-sizing: border-box !important;overflow: hidden !important;background-clip: border-box !important;}body {margin: 0 !important;padding: ${c2}px ${f2}px ${d2}px ${h2}px !important;width: ${e2}px !important;height: ${n2}px !important;min-width: ${e2}px !important;min-height: ${n2}px !important;box-sizing: border-box !important;overflow: hidden !important;background-clip: border-box !important;}`, g2;
    try {
      let p2 = qs.get(t2);
      p2 || qs.set(t2, p2 = new o2.CSSStyleSheet()), p2.replaceSync(m2), t2.adoptedStyleSheets = [...t2.adoptedStyleSheets, p2], g2 = () => {
        t2.adoptedStyleSheets = t2.adoptedStyleSheets.filter((y2) => y2 !== p2);
      };
    } catch {
      let p2 = t2.createElement("style");
      p2.setAttribute("data-sd-iframe-pin", ""), tt(p2), p2.textContent = m2, (t2.head || t2.documentElement).appendChild(p2), g2 = () => p2.remove();
    }
    if (ve(t2.documentElement), r2 || i2) try {
      t2.body && (t2.body.scrollLeft = r2, t2.body.scrollTop = i2), t2.documentElement && (t2.documentElement.scrollLeft || (t2.documentElement.scrollLeft = r2), t2.documentElement.scrollTop || (t2.documentElement.scrollTop = i2));
    } catch {
    }
    return () => {
      try {
        g2();
      } catch {
      }
      try {
        o2 && typeof o2.scrollTo == "function" && o2.scrollTo(r2, i2), t2.body && (t2.body.scrollLeft = s2, t2.body.scrollTop = a2), t2.documentElement && (t2.documentElement.scrollLeft = l2, t2.documentElement.scrollTop = u2);
      } catch {
      }
      ve(t2.documentElement);
    };
  }
  async function Lr(t2, e2, n2) {
    let o2 = await gu(t2, 3);
    if (!o2) throw new Error("The iframe document isn't ready.");
    let { contentWidth: r2, contentHeight: i2, rect: s2 } = yu(t2), a2 = n2?.snap;
    if (!a2 || typeof a2.toPng != "function") throw new Error("Iframes are only captured through snapdom(el).");
    let l2 = { ...n2, scale: 1, clip: null, __pinned: true }, u2 = bu(o2, r2, i2), c2;
    try {
      c2 = await a2.toPng(o2.documentElement, l2);
    } finally {
      u2();
    }
    c2.style.display = "block", c2.style.width = `${r2}px`, c2.style.height = `${i2}px`;
    let f2 = document.createElement("div");
    return e2.nodeMap.set(f2, t2), xt(t2, f2, e2, n2), f2.style.overflow = "hidden", f2.style.display = "block", f2.style.width || (f2.style.width = `${Math.round(s2.width)}px`), f2.style.height || (f2.style.height = `${Math.round(s2.height)}px`), f2.appendChild(c2), f2;
  }
  function ra(t2) {
    try {
      let e2 = t2 && t2.accentColor;
      if (e2 && e2 !== "auto" && e2 !== "none") return e2;
      let n2 = t2 && t2.color;
      if (n2) return n2;
    } catch {
    }
    return "#0a6ed1";
  }
  function ia(t2) {
    let { width: e2, height: n2 } = Ft(t2), o2 = t2.getBoundingClientRect(), r2;
    try {
      r2 = window.getComputedStyle(t2);
    } catch {
    }
    let i2 = r2 ? parseFloat(r2.width) : NaN, s2 = r2 ? parseFloat(r2.height) : NaN, a2 = Number.isFinite(i2) && i2 > 0 ? i2 : e2 || o2.width || 128, l2 = Number.isFinite(s2) && s2 > 0 ? s2 : n2 || o2.height || 16, u2 = Number.parseFloat(t2.min) || 0, c2 = Number.isFinite(Number.parseFloat(t2.max)) ? Number.parseFloat(t2.max) : 100, f2 = Number.parseFloat(t2.value), d2 = c2 - u2, h2 = d2 > 0 && Number.isFinite(f2) ? Math.min(1, Math.max(0, (f2 - u2) / d2)) : 0.5, m2 = "middle";
    try {
      r2 && r2.verticalAlign && (m2 = r2.verticalAlign);
    } catch {
    }
    let g2 = document.createElement("div");
    g2.setAttribute("data-snapdom-input-replacement", "range"), g2.style.cssText = `display:inline-block;width:${a2}px;height:${l2}px;vertical-align:${m2};flex-shrink:0;line-height:0;`;
    let p2 = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    p2.setAttribute("width", String(a2)), p2.setAttribute("height", String(l2)), p2.setAttribute("viewBox", `0 0 ${a2} ${l2}`), p2.style.cssText = `width:${a2}px;height:${l2}px;overflow:visible`, g2.appendChild(p2);
    function y2() {
      let b2 = ra(r2), w2 = !!t2.disabled, S2 = Math.max(2, Math.min(4, l2)), v2 = (l2 - S2) / 2, C = Math.max(10, Math.min(14, Math.max(l2, 10))), M = C / 2, $2 = M + h2 * Math.max(0, a2 - C);
      p2.innerHTML = "";
      let F = (x2, _2, P, E) => {
        let R = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        R.setAttribute("x", String(x2)), R.setAttribute("y", String(v2)), R.setAttribute("width", String(Math.max(0, _2))), R.setAttribute("height", String(S2)), R.setAttribute("rx", String(S2 / 2)), R.setAttribute("fill", P), E && R.setAttribute("fill-opacity", E), p2.appendChild(R);
      };
      F(0, a2, "#808080", "0.4"), F(0, $2, b2);
      let A = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      A.setAttribute("cx", String($2)), A.setAttribute("cy", String(l2 / 2)), A.setAttribute("r", String(M)), A.setAttribute("fill", b2), p2.appendChild(A), w2 && p2.setAttribute("opacity", "0.5"), g2.style.setProperty("width", `${a2}px`, "important"), g2.style.setProperty("height", `${l2}px`, "important"), g2.style.setProperty("min-width", `${a2}px`, "important"), g2.style.setProperty("min-height", `${l2}px`, "important");
    }
    return y2(), { el: g2, applyVisual: y2 };
  }
  function sa(t2) {
    let { width: e2, height: n2 } = Ft(t2), o2 = t2.getBoundingClientRect(), r2;
    try {
      r2 = window.getComputedStyle(t2);
    } catch {
    }
    let i2 = r2 ? parseFloat(r2.width) : NaN, s2 = r2 ? parseFloat(r2.height) : NaN, a2 = Math.round(e2 || o2.width || 0), l2 = Math.round(n2 || o2.height || 0), u2 = Number.isFinite(i2) && i2 > 0 ? Math.round(i2) : Math.max(12, a2 || 16), c2 = Number.isFinite(s2) && s2 > 0 ? Math.round(s2) : Math.max(12, l2 || 16), f2 = (t2.type || "text").toLowerCase() === "checkbox", d2 = !!t2.checked, h2 = !!t2.indeterminate, g2 = Math.max(Math.min(u2, c2), 12), p2 = Math.max(u2, g2), y2 = Math.max(c2, g2), b2 = "middle";
    try {
      r2 && r2.verticalAlign && (b2 = r2.verticalAlign);
    } catch {
    }
    let w2 = document.createElement("div");
    w2.setAttribute("data-snapdom-input-replacement", t2.type || "checkbox"), w2.style.cssText = `display:inline-block;width:${p2}px;height:${y2}px;vertical-align:${b2};flex-shrink:0;line-height:0;`;
    let S2 = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    S2.setAttribute("width", String(p2)), S2.setAttribute("height", String(y2)), S2.setAttribute("viewBox", `0 0 ${g2} ${g2}`), S2.style.cssText = `width:${p2}px;height:${y2}px`, w2.appendChild(S2);
    function v2() {
      let C = ra(r2), M = 2, $2 = M / 2, F = g2 - M;
      if (S2.innerHTML = "", f2) {
        let A = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        if (A.setAttribute("x", String($2)), A.setAttribute("y", String($2)), A.setAttribute("width", String(F)), A.setAttribute("height", String(F)), A.setAttribute("rx", "2"), A.setAttribute("ry", "2"), A.setAttribute("fill", d2 ? C : "none"), A.setAttribute("stroke", C), A.setAttribute("stroke-width", String(M)), S2.appendChild(A), d2) {
          let x2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
          x2.setAttribute("d", `M ${$2 + 2} ${g2 / 2} L ${g2 / 2 - 1} ${g2 - $2 - 2} L ${g2 - $2 - 2} ${$2 + 2}`), x2.setAttribute("stroke", "white"), x2.setAttribute("stroke-width", String(Math.max(1.5, M))), x2.setAttribute("fill", "none"), x2.setAttribute("stroke-linecap", "round"), x2.setAttribute("stroke-linejoin", "round"), S2.appendChild(x2);
        } else if (h2) {
          let x2 = document.createElementNS("http://www.w3.org/2000/svg", "rect"), _2 = Math.max(6, F - 4);
          x2.setAttribute("x", String((g2 - _2) / 2)), x2.setAttribute("y", String((g2 - M) / 2)), x2.setAttribute("width", String(_2)), x2.setAttribute("height", String(M)), x2.setAttribute("fill", C), x2.setAttribute("rx", "1"), S2.appendChild(x2);
        }
      } else {
        let A = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        if (A.setAttribute("cx", String(g2 / 2)), A.setAttribute("cy", String(g2 / 2)), A.setAttribute("r", String((g2 - M) / 2)), A.setAttribute("fill", d2 ? C : "none"), A.setAttribute("stroke", C), A.setAttribute("stroke-width", String(M)), S2.appendChild(A), d2) {
          let x2 = document.createElementNS("http://www.w3.org/2000/svg", "circle"), _2 = Math.max(2, (g2 - M * 2) * 0.35);
          x2.setAttribute("cx", String(g2 / 2)), x2.setAttribute("cy", String(g2 / 2)), x2.setAttribute("r", String(_2)), x2.setAttribute("fill", "white"), S2.appendChild(x2);
        }
      }
      w2.style.setProperty("width", `${p2}px`, "important"), w2.style.setProperty("height", `${y2}px`, "important"), w2.style.setProperty("min-width", `${p2}px`, "important"), w2.style.setProperty("min-height", `${y2}px`, "important");
    }
    return v2(), { el: w2, applyVisual: v2 };
  }
  async function wu(t2) {
    if (j.resource?.has(t2)) return j.resource.get(t2);
    if (An.has(t2)) return An.get(t2);
    let e2 = (async () => {
      let n2 = await ut(t2, { as: "dataURL" });
      if (!n2.ok || typeof n2.data != "string") throw new Error(`Couldn't read ${t2}`);
      return j.resource?.set(t2, n2.data), n2.data;
    })();
    An.set(t2, e2);
    try {
      let n2 = await e2;
      return An.set(t2, n2), n2;
    } catch (n2) {
      throw An.delete(t2), n2;
    }
  }
  function ro(t2) {
    return typeof t2 == "string" && t2.startsWith("blob:");
  }
  function xu(t2) {
    return (t2 || "").split(",").map((e2) => e2.trim()).filter(Boolean).map((e2) => {
      let n2 = e2.match(/^(\S+)(\s+.+)?$/);
      return n2 ? { url: n2[1], desc: n2[2] || "" } : null;
    }).filter(Boolean);
  }
  function Su(t2) {
    return t2.map((e2) => e2.desc ? `${e2.url} ${e2.desc.trim()}` : e2.url).join(", ");
  }
  function _n(t2, e2) {
    let n2 = t2.querySelectorAll ? Array.from(t2.querySelectorAll(e2)) : [];
    return t2.matches?.(e2) && n2.unshift(t2), n2;
  }
  async function io(t2, e2 = null) {
    if (!t2) return;
    let n2 = e2, o2 = /* @__PURE__ */ new Set(), r2 = [], i2 = /* @__PURE__ */ new Map(), s2 = (g2, p2, y2, b2) => {
      o2.add(y2), r2.push(() => {
        i2.has(y2) && (g2.setAttribute(p2, i2.get(y2)), b2?.());
      });
    }, a2 = (g2, p2) => {
      if (!g2 || !g2.includes("blob:")) return;
      let y2 = g2.match(Xs) || [];
      if (y2.length) {
        for (let b2 of y2) o2.add(b2);
        r2.push(() => {
          let b2 = g2.replace(Xs, (w2) => i2.get(w2) || w2);
          b2 !== g2 && p2(b2);
        });
      }
    }, l2 = _n(t2, "img");
    for (let g2 of l2) try {
      let y2 = g2.getAttribute("src") || g2.currentSrc || "";
      ro(y2) && s2(g2, "src", y2);
      let b2 = g2.getAttribute("srcset");
      if (b2 && b2.includes("blob:")) {
        let w2 = xu(b2);
        for (let S2 of w2) ro(S2.url) && o2.add(S2.url);
        r2.push(() => {
          let S2 = false;
          for (let v2 of w2) i2.has(v2.url) && (v2.url = i2.get(v2.url), S2 = true);
          S2 && g2.setAttribute("srcset", Su(w2));
        });
      }
    } catch (p2) {
      D(n2, "Couldn't inline a blob: image.", p2);
    }
    let u2 = _n(t2, "image");
    for (let g2 of u2) try {
      let p2 = "http://www.w3.org/1999/xlink", y2 = g2.getAttribute("href") || g2.getAttributeNS?.(p2, "href");
      ro(y2) && s2(g2, "href", y2, () => g2.removeAttributeNS?.(p2, "href"));
    } catch (p2) {
      D(n2, "Couldn't inline a blob: SVG image.", p2);
    }
    let c2 = _n(t2, "[style*='blob:']");
    for (let g2 of c2) try {
      let p2 = g2.getAttribute("style");
      a2(p2, (y2) => g2.setAttribute("style", y2));
    } catch (p2) {
      D(n2, "Couldn't inline blob: URLs in a style attribute.", p2);
    }
    let f2 = _n(t2, "style");
    for (let g2 of f2) try {
      let p2 = g2.textContent || "";
      a2(p2, (y2) => {
        g2.textContent = y2;
      });
    } catch (p2) {
      D(n2, "Couldn't inline blob: URLs in a <style>.", p2);
    }
    let d2 = ["poster"];
    for (let g2 of d2) {
      let p2 = _n(t2, `[${g2}^='blob:']`);
      for (let y2 of p2) try {
        let b2 = y2.getAttribute(g2);
        ro(b2) && s2(y2, g2, b2);
      } catch (b2) {
        D(n2, `Couldn't inline the blob: URL in ${g2}.`, b2);
      }
    }
    if (!o2.size) return;
    let h2 = [...o2], m2 = 0;
    await Promise.all(Array.from({ length: Math.min(4, h2.length) }, async () => {
      for (; m2 < h2.length; ) {
        let g2 = h2[m2++];
        try {
          i2.set(g2, await wu(g2));
        } catch (p2) {
          D(n2, "Couldn't read a blob: URL; kept it as is.", p2);
        }
      }
    }));
    for (let g2 of r2) try {
      g2();
    } catch (p2) {
      D(n2, "Couldn't write an inlined blob: URL.", p2);
    }
  }
  function aa(t2, e2 = document) {
    let n2 = e2.defaultView || window;
    if (!_t() || !e2.body || !(n2.visualViewport?.scale < 1 || n2.screen.width < e2.documentElement.clientWidth)) return;
    let o2 = tt(e2.createElement("div"));
    o2.style.cssText = "position:absolute;left:0;top:0;width:0;height:0;overflow:hidden;visibility:hidden";
    let r2 = [];
    for (let [i2, s2] of t2) {
      if (i2.nodeType !== 1 || s2.nodeType !== 1) continue;
      let a2 = n2.getComputedStyle(s2), l2 = s2.localName === "textarea" || s2.localName === "input" && Cu.has(s2.type) ? Au(s2, a2, e2) : Mu(s2, a2.textAlign === "justify" || a2.textAlignLast === "justify");
      if (!l2) continue;
      let u2 = s2.getBoundingClientRect(), c2 = s2.offsetWidth && u2.width ? u2.width / s2.offsetWidth : 1, f2 = e2.createElement("span");
      f2.style.whiteSpace = "pre";
      for (let d2 of vu) f2.style.setProperty(d2, a2.getPropertyValue(d2));
      f2.textContent = l2.word, o2.appendChild(f2), r2.push({ clone: i2, cs: a2, span: f2, live: l2.distance / c2, centers: l2.centers, height: l2.height });
    }
    if (r2.length) {
      e2.body.appendChild(o2);
      try {
        for (let { clone: i2, cs: s2, span: a2, live: l2, centers: u2, height: c2 } of r2) {
          let f2 = a2.firstChild, d2 = (parseFloat(s2.letterSpacing) || 0) * (u2 ? f2.length - 1 : f2.length), h2 = c2 ? e2.createRange() : null;
          h2 && h2.selectNodeContents(a2);
          let m2 = c2 ? h2.getBoundingClientRect().height : u2 ? Math.abs(Ys(f2, f2.length - 1) - Ys(f2, 0)) : a2.getBoundingClientRect().width, g2 = (l2 - (c2 ? 0 : d2)) / (m2 - (c2 ? 0 : d2));
          if (g2 > 1.005 && Number.isFinite(g2)) {
            if (c2) {
              let p2 = [];
              for (let y2 of [false, true]) {
                let b2 = parseFloat(s2.fontSize), w2 = b2 * (g2 + 1);
                for (let S2 = 0; S2 < 10; S2++) {
                  let v2 = (b2 + w2) / 2;
                  a2.style.fontSize = `${v2}px`;
                  let C = h2.getBoundingClientRect().height;
                  (y2 ? C > l2 : C >= l2) ? w2 = v2 : b2 = v2;
                }
                p2.push((b2 + w2) / 2);
              }
              g2 = (p2[0] + p2[1]) / 2 / parseFloat(s2.fontSize);
            }
            i2.style.setProperty("font-size", `${parseFloat(s2.fontSize) * g2}px`), s2.lineHeight !== "normal" && i2.style.setProperty("line-height", `${parseFloat(s2.lineHeight) * g2}px`);
          }
        }
      } finally {
        o2.remove();
      }
    }
  }
  function Ys(t2, e2) {
    let n2 = t2.ownerDocument.createRange();
    n2.setStart(t2, e2), n2.setEnd(t2, e2 + 1);
    let o2 = n2.getBoundingClientRect();
    return o2.left + o2.width / 2;
  }
  function Mu(t2, e2 = false) {
    for (let n2 = t2.firstChild; n2; n2 = n2.nextSibling) {
      if (n2.nodeType !== 3) continue;
      let o2 = /\S+/.exec(n2.data);
      if (!o2) continue;
      let r2 = t2.ownerDocument.createRange();
      r2.setStart(n2, o2.index), r2.setEnd(n2, o2.index + o2[0].length);
      let i2 = r2.getClientRects();
      return i2.length === 1 ? { word: o2[0], distance: e2 ? i2[0].height : i2[0].width, centers: false, height: e2 } : null;
    }
    return null;
  }
  function Au(t2, e2, n2) {
    let o2 = ku.exec(t2.value.split(`
`)[0]);
    if (!o2 || t2.scrollLeft || t2.scrollTop || !n2.caretPositionFromPoint) return null;
    let r2 = t2.getBoundingClientRect(), i2 = t2.localName === "textarea" ? r2.top + (parseFloat(e2.borderTopWidth) || 0) + (parseFloat(e2.paddingTop) || 0) + 3 : r2.top + r2.height / 2, s2 = (c2) => {
      let f2 = n2.caretPositionFromPoint(c2, i2);
      return f2 && f2.offsetNode === t2 ? f2.offset : -1;
    }, a2 = r2.width / 16, l2 = (c2) => {
      let f2 = r2.left;
      for (; f2 <= r2.right && s2(f2) < c2; ) f2 += a2;
      if (f2 > r2.right) return NaN;
      let d2 = f2 - a2;
      for (let h2 = 0; h2 < 16; h2++) {
        let m2 = (d2 + f2) / 2;
        s2(m2) >= c2 ? f2 = m2 : d2 = m2;
      }
      return f2;
    }, u2 = Math.abs(l2(o2.index + o2[0].length) - l2(o2.index + 1));
    return Number.isFinite(u2) ? { word: o2[0], distance: u2, centers: true } : null;
  }
  function ca(t2) {
    let n2 = (t2.ownerDocument || document).getSelection?.();
    if (!n2 || n2.isCollapsed || n2.rangeCount === 0) return null;
    let o2 = [];
    for (let r2 = 0; r2 < n2.rangeCount; r2 += 1) {
      let i2 = n2.getRangeAt(r2);
      if (!i2.collapsed) try {
        i2.intersectsNode(t2) && o2.push(i2);
      } catch {
      }
    }
    return o2.length ? { ranges: o2, styles: /* @__PURE__ */ new Map() } : null;
  }
  function _u(t2, e2) {
    if (e2.styles.has(t2)) return e2.styles.get(t2);
    let n2;
    try {
      let o2 = getComputedStyle(t2);
      if (o2.userSelect === "none" || o2.webkitUserSelect === "none" || o2.getPropertyValue("-webkit-user-select") === "none") return e2.styles.set(t2, null), null;
      let r2 = getComputedStyle(t2, "::selection"), i2 = [], s2 = r2.backgroundColor, a2 = s2 && !la.has(s2) && s2 !== o2.backgroundColor;
      i2.push(`background-color:${a2 ? s2 : Ir}`), r2.color && r2.color !== o2.color && i2.push(`color:${r2.color}`, `-webkit-text-fill-color:${r2.color}`), r2.textShadow && r2.textShadow !== o2.textShadow && i2.push(`text-shadow:${r2.textShadow}`), r2.textDecorationLine && r2.textDecorationLine !== "none" && r2.textDecorationLine !== o2.textDecorationLine && i2.push(`text-decoration:${r2.textDecorationLine} ${r2.textDecorationStyle || "solid"} ${r2.textDecorationColor || "currentcolor"}`), n2 = i2.join(";");
    } catch {
      n2 = `background-color:${Ir}`;
    }
    return e2.styles.set(t2, n2), n2;
  }
  function fa(t2, e2) {
    let n2 = t2.data;
    if (!n2) return null;
    let o2 = t2.parentElement;
    if (!o2) return null;
    let r2 = [];
    for (let u2 of e2.ranges) {
      let c2 = false;
      try {
        c2 = u2.intersectsNode(t2);
      } catch {
      }
      if (!c2) continue;
      let f2 = u2.startContainer === t2 ? u2.startOffset : 0, d2 = u2.endContainer === t2 ? u2.endOffset : n2.length;
      d2 > f2 && r2.push([f2, d2]);
    }
    if (r2.length === 0) return null;
    let i2 = _u(o2, e2);
    if (!i2) return null;
    r2.sort((u2, c2) => u2[0] - c2[0]);
    let s2 = t2.ownerDocument || document, a2 = s2.createDocumentFragment(), l2 = 0;
    for (let [u2, c2] of r2) {
      u2 > l2 && a2.append(s2.createTextNode(n2.slice(l2, u2)));
      let f2 = s2.createElement("span");
      f2.setAttribute("data-snapdom-selection", ""), f2.setAttribute("style", `all:unset;${i2}`), f2.textContent = n2.slice(u2, c2), a2.append(f2), l2 = c2;
    }
    return l2 < n2.length && a2.append(s2.createTextNode(n2.slice(l2))), a2;
  }
  function Ru(t2, e2) {
    try {
      let o2 = getComputedStyle(t2, "::selection").backgroundColor;
      if (o2 && !la.has(o2) && o2 !== e2.backgroundColor) return o2;
    } catch {
    }
    return Ir;
  }
  function ua(t2, e2) {
    let n2 = t2.ownerDocument || document;
    if (n2.activeElement !== t2) return;
    let o2 = null, r2 = null;
    try {
      o2 = t2.selectionStart, r2 = t2.selectionEnd;
    } catch {
      return;
    }
    if (o2 == null || r2 == null || o2 === r2) return;
    let i2 = t2.value || "";
    if (t2.localName === "input" && t2.type === "password" && (i2 = "\u2022".repeat(i2.length)), !i2) return;
    let s2 = getComputedStyle(t2), a2 = t2.localName === "textarea", l2 = so(s2.paddingLeft), u2 = so(s2.paddingTop), c2 = t2.clientWidth - l2 - so(s2.paddingRight), f2 = t2.clientHeight - u2 - so(s2.paddingBottom), d2 = n2.createElement("div");
    d2.style.cssText = "position:absolute;top:0;left:-99999px;visibility:hidden;margin:0;border:0;padding:0;box-sizing:content-box;";
    for (let p2 of Eu) d2.style.setProperty(p2, s2.getPropertyValue(p2));
    a2 ? (d2.style.whiteSpace = "pre-wrap", d2.style.overflowWrap = "break-word", d2.style.width = `${Math.max(0, c2)}px`) : d2.style.whiteSpace = "pre";
    let h2 = n2.createElement("span");
    h2.textContent = i2.slice(o2, r2), d2.append(n2.createTextNode(i2.slice(0, o2)), h2, n2.createTextNode(i2.slice(r2))), n2.body.appendChild(d2);
    let m2 = [];
    try {
      let p2 = d2.getBoundingClientRect(), y2 = -t2.scrollLeft, b2 = -t2.scrollTop;
      if (!a2) {
        b2 += Math.max(0, (f2 - p2.height) / 2);
        let w2 = s2.direction === "rtl", S2 = s2.textAlign;
        S2 === "start" ? S2 = w2 ? "right" : "left" : S2 === "end" && (S2 = w2 ? "left" : "right");
        let v2 = c2 - p2.width;
        v2 > 0 && (S2 === "right" ? y2 += v2 : S2 === "center" && (y2 += v2 / 2));
      }
      for (let w2 of h2.getClientRects()) w2.width <= 0 || w2.height <= 0 || m2.push({ x: l2 + (w2.left - p2.left) + y2, y: u2 + (w2.top - p2.top) + b2, width: w2.width, height: w2.height });
    } finally {
      d2.remove();
    }
    if (m2.length === 0) return;
    let g2 = Ru(t2, s2);
    e2.__snapdomFieldSelection = { images: m2.map(() => `linear-gradient(${g2},${g2})`), positions: m2.map((p2) => `${p2.x}px ${p2.y}px`), sizes: m2.map((p2) => `${p2.width}px ${p2.height}px`), repeats: m2.map(() => "no-repeat"), origins: m2.map(() => "padding-box"), clips: m2.map(() => "padding-box"), base: { image: s2.backgroundImage, position: s2.backgroundPosition, size: s2.backgroundSize, repeat: s2.backgroundRepeat, origin: s2.backgroundOrigin, clip: s2.backgroundClip } };
  }
  function da(t2) {
    for (let e2 of t2.keys()) {
      let n2 = e2.__snapdomFieldSelection;
      if (!n2) continue;
      delete e2.__snapdomFieldSelection;
      let { images: o2, positions: r2, sizes: i2, repeats: s2, origins: a2, clips: l2, base: u2 } = n2, c2 = e2.style.backgroundImage || u2.image;
      c2 && c2 !== "none" ? (o2.push(c2), r2.push(e2.style.backgroundPosition || u2.position), i2.push(e2.style.backgroundSize || u2.size), s2.push(e2.style.backgroundRepeat || u2.repeat), a2.push(e2.style.backgroundOrigin || u2.origin), l2.push(e2.style.backgroundClip || u2.clip)) : (o2.push("linear-gradient(transparent,transparent)"), r2.push("0% 0%"), i2.push("auto"), s2.push("repeat"), a2.push(u2.origin || "padding-box"), l2.push(u2.clip || "border-box")), e2.style.backgroundImage = o2.join(","), e2.style.backgroundPosition = r2.join(","), e2.style.backgroundSize = i2.join(","), e2.style.backgroundRepeat = s2.join(","), e2.style.backgroundOrigin = a2.join(","), e2.style.backgroundClip = l2.join(",");
    }
  }
  function Nu(t2) {
    let e2 = t2.localName, n2 = $u[e2];
    if (!n2) return null;
    let o2 = Fs(t2);
    if (o2 && (o2.size === 0 || !$s(t2))) return null;
    let r2 = o2 ? ha.get(o2) : Pu;
    r2 || ha.set(o2, r2 = /* @__PURE__ */ new Map());
    let i2 = r2.get(e2);
    return i2 || (i2 = [...n2, ...Fu].filter((s2) => !o2 || o2.has(s2)), r2.set(e2, i2)), i2.length ? i2 : null;
  }
  function Lu(t2, e2) {
    let n2 = t2.trim();
    if (!ma.test(n2) || !ma.test(e2)) return false;
    let o2 = parseFloat(n2), r2 = parseFloat(e2);
    return Math.abs(o2 - r2) <= 1e-4 * Math.max(1, Math.abs(o2));
  }
  function Iu(t2) {
    let e2 = t2.transform?.baseVal;
    if (!e2?.numberOfItems) return null;
    let n2 = new DOMMatrix();
    for (let o2 = 0; o2 < e2.numberOfItems; o2++) {
      let r2 = e2.getItem(o2).matrix;
      n2 = n2.multiply(new DOMMatrix([r2.a, r2.b, r2.c, r2.d, r2.e, r2.f]));
    }
    return n2;
  }
  function Wu(t2, e2) {
    let n2 = Iu(t2), o2 = e2 === "none" ? [1, 0, 0, 1, 0, 0] : e2.startsWith("matrix(") ? e2.slice(7, -1).split(",").map(Number) : null;
    if (!o2 || o2.length !== 6) return false;
    if (!n2) return o2.join() === "1,0,0,1,0,0";
    let r2 = [n2.a, n2.b, n2.c, n2.d, n2.e, n2.f];
    for (let i2 = 0; i2 < 6; i2++) if (Math.abs(r2[i2] - o2[i2]) > 1e-4 * Math.max(1, Math.abs(r2[i2]))) return false;
    return true;
  }
  function Ou(t2, e2, n2, o2) {
    let r2 = false;
    for (let i2 of o2) {
      if (!r2 && (i2 === "transform-origin" || i2 === "transform-box") && !t2.hasAttribute("transform")) continue;
      let s2 = n2.getPropertyValue(i2);
      if (!s2) continue;
      pa.has(i2) && s2 !== "none" && (r2 = true);
      let a2 = pa.has(i2) && i2 !== "transform" ? null : t2.getAttribute(i2);
      if (a2 != null) {
        if (s2 === a2 || s2 === a2 + "px" || i2 === "d" || i2 === "transform" && (s2 === "none" || Wu(t2, s2)) || Lu(a2, s2)) continue;
      } else if (s2 === Tu[i2]) continue;
      e2.style.setProperty(i2, s2);
    }
  }
  function Ke(t2, e2) {
    Wr.set(String(t2).toUpperCase(), e2);
  }
  function ao(t2) {
    let e2 = O(t2), n2 = e2.display;
    if (n2 === "none") return null;
    let o2 = /^(block|inline-block|flow-root|flex|inline-flex|grid|inline-grid|list-item)$/.test(n2), r2 = (h2) => parseFloat(h2) || 0, i2 = (h2, m2, g2, p2, y2) => {
      if (!o2 || !h2?.endsWith("px")) return null;
      let b2 = parseFloat(h2);
      if (!Number.isFinite(b2) || b2 < 0) return null;
      if (e2.boxSizing === "border-box") return b2;
      let w2 = p2 - y2 - g2;
      return b2 + m2 + g2 + (w2 > 0 && b2 + m2 < y2 + w2 / 2 ? w2 : 0);
    }, [s2, a2, l2, u2] = /scroll|auto/.test(e2.overflow) ? [t2.offsetWidth, t2.clientWidth, t2.offsetHeight, t2.clientHeight] : [0, 0, 0, 0], c2 = i2(e2.width, r2(e2.paddingLeft) + r2(e2.paddingRight), r2(e2.borderLeftWidth) + r2(e2.borderRightWidth), s2, a2), f2 = i2(e2.height, r2(e2.paddingTop) + r2(e2.paddingBottom), r2(e2.borderTopWidth) + r2(e2.borderBottomWidth), l2, u2);
    if (c2 === null || f2 === null) {
      let { width: h2, height: m2 } = Ft(t2), g2 = h2, p2 = m2;
      if (c2 === null && !g2 || f2 === null && !p2) {
        let y2 = t2.getBoundingClientRect();
        g2 || (g2 = y2.width || 0), p2 || (p2 = y2.height || 0);
      }
      c2 ?? (c2 = g2), f2 ?? (f2 = p2);
    }
    let d2 = document.createElement("div");
    return d2.style.cssText = `display:${n2 === "inline" ? "inline-block" : n2};box-sizing:border-box;width:${c2}px;height:${f2}px;visibility:hidden;`, d2;
  }
  function En(t2) {
    let e2 = 0;
    for (let n2 of t2.matchAll(/-?[\d.]+px/g)) e2 += Math.abs(parseFloat(n2[0]));
    return e2;
  }
  function xa(t2) {
    let e2 = t2.filter;
    return !e2 || e2 === "none" ? 0 : e2.includes("url(") ? lo : 3 * En(e2);
  }
  function Sa(t2, e2) {
    if (!t2) return 0;
    let n2 = e2.filterReach || (e2.filterReach = /* @__PURE__ */ new WeakMap()), o2 = n2.get(t2);
    return o2 === void 0 && (o2 = xa(O(t2)) + (t2 === e2.root ? 0 : Sa(t2.parentElement, e2)), n2.set(t2, o2)), o2;
  }
  function ya(t2, e2, n2) {
    try {
      if (!e2 || !t2.matches(e2)) return false;
    } catch {
      return true;
    }
    let o2 = O(t2, n2).content;
    return !!o2 && o2 !== "none" && o2 !== "normal";
  }
  function zu(t2, e2, n2) {
    let { before: o2, after: r2 } = fe(t2);
    if (o2 === null || r2 === null || ya(t2, o2, "::before") || ya(t2, r2, "::after") || e2.borderImageSource && e2.borderImageSource !== "none" || e2.webkitBoxReflect && e2.webkitBoxReflect !== "none") return lo;
    let i2 = parseFloat(e2.fontSize) || 16, s2 = e2.outlineStyle === "none" ? 0 : En(e2.outlineWidth) + En(e2.outlineOffset);
    return Math.max(i2 * (e2.display === "list-item" ? 3 : 1), s2, En(e2.boxShadow), En(e2.textShadow), xa(e2)) + Sa(t2.parentElement, n2);
  }
  function ba(t2, e2, n2, o2) {
    let r2 = o2.rect, i2 = Math.max(r2.left - n2.right, n2.left - r2.right, r2.top - n2.bottom, n2.top - r2.bottom);
    if (i2 <= 0) return true;
    if (i2 > lo) return false;
    let s2 = o2.inkReach || (o2.inkReach = /* @__PURE__ */ new WeakMap()), a2 = s2.get(t2);
    return a2 === void 0 && s2.set(t2, a2 = zu(t2, e2 || O(t2), o2)), i2 <= a2;
  }
  function Uu(t2, e2) {
    if (t2 === e2.root) return false;
    let n2;
    try {
      n2 = t2.getBoundingClientRect();
    } catch {
      return false;
    }
    if (n2.width === 0 && n2.height === 0) return false;
    let o2 = O(t2);
    if (o2.display === "inline" && !Bu.has((t2.localName || "").toLowerCase())) return false;
    let r2 = t2.scrollWidth || 0, i2 = t2.scrollHeight || 0, s2 = { left: o2.direction === "rtl" ? Math.min(n2.left, n2.right - r2) : n2.left, top: n2.top, right: Math.max(n2.right, n2.left + r2), bottom: Math.max(n2.bottom, n2.top + i2) }, a2 = o2.writingMode || "";
    if ((a2.startsWith("vertical") || a2.startsWith("sideways")) && (s2.top = Math.min(n2.top, n2.bottom - i2), s2.left = Math.min(s2.left, n2.right - r2)), ba(t2, o2, s2, e2)) return false;
    let l2 = (t2.ownerDocument || document).createTreeWalker(t2, NodeFilter.SHOW_ELEMENT);
    for (; l2.nextNode(); ) {
      let u2 = l2.currentNode, c2 = u2.getBoundingClientRect();
      if ((c2.width > 0 || c2.height > 0) && ba(u2, null, c2, e2)) return false;
    }
    return true;
  }
  function Hu(t2, e2) {
    let n2 = t2.cloneNode(false);
    return t2.tagName === "IMG" && (n2.removeAttribute("src"), n2.removeAttribute("srcset"), n2.removeAttribute("sizes")), e2.husks || (e2.husks = /* @__PURE__ */ new Map()), e2.husks.set(n2, t2), n2;
  }
  function Gu(t2) {
    if (!t2) return false;
    let e2 = O(t2);
    return ju.test(e2.display) && e2.writingMode === "horizontal-tb" && e2.columnCount === "auto" && e2.columnWidth === "auto";
  }
  function wa(t2) {
    if (t2.localName === "summary" || t2.localName === "legend") return false;
    let e2 = O(t2);
    return Vu.test(e2.display) && e2.float === "none" && e2.clear === "none" && (e2.position === "static" || e2.position === "relative") && e2.counterReset === "none" && e2.counterIncrement === "none" && (e2.counterSet || "none") === "none";
  }
  function Or(t2, e2) {
    let n2 = O(t2);
    return n2.display !== "contents" && (n2.position === "static" || n2.position === "relative" && n2.top === "0px") && (n2.transform === "none" || n2.transform === "matrix(1, 0, 0, 1, 0, 0)") && (n2.translate || "none") === "none" && (n2.rotate || "none") === "none" && (n2.scale || "none") === "none" && Math.abs(e2.width - t2.offsetWidth) < 1 && Math.abs(e2.height - t2.offsetHeight) < 1;
  }
  function qu(t2, e2) {
    for (let n2 = t2.nextElementSibling; n2; n2 = n2.nextElementSibling) {
      if (n2 === e2) return true;
      if (O(n2).display !== "none") return false;
    }
    return false;
  }
  function co(t2, e2, n2) {
    let o2 = n2 < 0 ? t2.previousSibling : t2.nextSibling;
    for (; o2; o2 = n2 < 0 ? o2.previousSibling : o2.nextSibling) {
      if (o2.nodeType === 3 && !/^[ \t\n\r\f]*$/.test(o2.data)) return null;
      if (o2.nodeType !== 1) continue;
      let s2 = O(o2);
      if (!(s2.display === "none" || s2.position === "absolute" || s2.position === "fixed" || s2.float !== "none")) {
        if (s2.display.startsWith("inline")) return null;
        break;
      }
    }
    if (!o2) return null;
    let r2 = o2.getBoundingClientRect();
    if (!Or(o2, r2)) return null;
    let i2 = n2 < 0 ? e2.top - r2.bottom : r2.top - e2.bottom;
    return i2 >= 0 ? i2 : null;
  }
  function Xu(t2, e2, n2, o2) {
    let r2 = [...t2.childNodes];
    for (let i2 = 0; i2 < r2.length; i2++) {
      let s2 = e2.get(r2[i2]);
      if (!s2 || !Gu(s2.parentElement) || !wa(s2)) continue;
      let a2 = [r2[i2]], l2 = i2, u2 = s2;
      for (let d2 = i2 + 1; d2 < r2.length; d2++) {
        let h2 = e2.get(r2[d2]);
        if (h2) {
          if (!wa(h2) || !qu(u2, h2)) break;
          a2.push(r2[d2]), u2 = h2, l2 = d2;
        } else if (r2[d2].nodeType !== 8 && (r2[d2].nodeType !== 3 || !/^[ \t\n\r\f]*$/.test(r2[d2].data))) break;
      }
      if (a2.length < 2) continue;
      let c2 = s2.getBoundingClientRect(), f2 = u2.getBoundingClientRect();
      if (Or(s2, c2) && Or(u2, f2)) {
        let d2 = 0;
        for (let p2 of a2) {
          let y2 = e2.get(p2), b2 = O(y2);
          d2 = Math.max(d2, y2.offsetWidth + (parseFloat(b2.marginLeft) || 0) + (parseFloat(b2.marginRight) || 0)), e2.delete(p2);
        }
        o2.set(s2, a2[0]).set(u2, a2[0]);
        let h2 = f2.bottom - c2.top, m2 = co(s2, c2, -1) ?? (parseFloat(O(s2).marginTop) || 0), g2 = co(u2, f2, 1) ?? (parseFloat(O(u2).marginBottom) || 0);
        a2[0].style.cssText = `display:block;position:static;float:none;box-sizing:border-box;padding:0;border:0;width:${d2}px;min-width:${d2}px;max-width:${d2}px;height:${h2}px;min-height:${h2}px;max-height:${h2}px;margin:${m2}px 0 ${g2}px;overflow:visible;contain:none;clear:none;visibility:hidden`;
        for (let p2 = 1; p2 < a2.length; p2++) n2 ? a2[p2].style.cssText = "display:none!important" : a2[p2].remove();
        for (let p2 = i2 + 1; p2 < l2; p2++) r2[p2].nodeType !== 1 && r2[p2].remove();
      }
      i2 = l2;
    }
  }
  function va(t2, e2, n2) {
    let o2 = e2.clip?.husks;
    if (!o2) return null;
    let r2 = !!t2?.querySelector?.("style"), i2 = /* @__PURE__ */ new Map(), s2 = /* @__PURE__ */ new Set();
    for (let a2 of o2.keys()) a2.parentNode && s2.add(a2.parentNode);
    for (let a2 of s2) Xu(a2, o2, r2, i2);
    for (let [a2, l2] of o2) Ku(a2, l2, e2, n2), i2.set(l2, a2);
    return o2.clear(), i2;
  }
  function Ku(t2, e2, n2, o2) {
    let r2 = O(e2);
    if (!Nt(e2) && e2.localName !== "legend" && Yu.test(r2.display) && r2.float === "none" && r2.clear === "none" && r2.position !== "absolute" && r2.position !== "fixed" && r2.writingMode === "horizontal-tb" && r2.counterReset === "none" && r2.counterIncrement === "none" && (r2.counterSet || "none") === "none" && (r2.anchorName || "none") === "none" && (r2.zoom || "1") === "1") {
      let l2 = `display:${r2.display};width:0;height:0;margin:${r2.marginTop} ${r2.marginRight} ${r2.marginBottom} ${r2.marginLeft};padding:0;border:0;`;
      (r2.overflowX !== "visible" || r2.overflowY !== "visible") && (l2 += `overflow:${r2.overflowX} ${r2.overflowY};`), r2.contain !== "none" && (l2 += `contain:${r2.contain};`), (r2.columnCount !== "auto" || r2.columnWidth !== "auto") && (l2 += `columns:${r2.columnWidth} ${r2.columnCount};`), r2.verticalAlign !== "baseline" && (l2 += `vertical-align:${r2.verticalAlign};`), r2.order !== "0" && (l2 += `order:${r2.order};`), r2.alignSelf !== "auto" && (l2 += `align-self:${r2.alignSelf};`), r2.justifySelf !== "auto" && (l2 += `justify-self:${r2.justifySelf};`);
      let u2 = `${r2.gridRowStart} / ${r2.gridColumnStart} / ${r2.gridRowEnd} / ${r2.gridColumnEnd}`;
      u2 !== "auto / auto / auto / auto" && (l2 += `grid-area:${u2};`), t2.style.cssText = l2;
    } else xt(e2, t2, n2, o2);
    let { width: i2, height: s2 } = Ft(e2);
    i2 > 0 && (t2.style.width = `${i2}px`, t2.style.minWidth = `${i2}px`, t2.style.maxWidth = `${i2}px`), s2 > 0 && (t2.style.height = `${s2}px`, t2.style.minHeight = `${s2}px`, t2.style.maxHeight = `${s2}px`), t2.style.visibility = "hidden";
    let a2 = e2.parentElement ? O(e2.parentElement).display : "";
    if (!/flex|grid|table/.test(a2) && !r2.display.startsWith("inline") && r2.float === "none" && (r2.position === "static" || r2.position === "relative")) {
      let l2 = e2.getBoundingClientRect(), u2 = co(e2, l2, -1);
      u2 !== null && (t2.style.marginTop = `${u2}px`);
      let c2 = co(e2, l2, 1);
      c2 !== null && (t2.style.marginBottom = `${c2}px`);
    }
    t2.style.boxSizing = "border-box";
  }
  async function ue(t2, e2, n2) {
    if (!t2) throw new Error("[SnapDOM] The element cannot be null or undefined.");
    for (; e2.slicer?.due(); ) await e2.slicer.pause();
    let o2 = /* @__PURE__ */ new Set(), r2 = null, i2 = null;
    if (t2.nodeType === Node.ELEMENT_NODE) {
      let c2 = (t2.localName || t2.tagName || "").toLowerCase(), f2 = Xt(t2);
      if (f2 && (t2.id === "snapdom-sandbox" || t2.hasAttribute("data-snapdom-sandbox")) || t2 !== n2.element && f2 || mr.has(c2)) return null;
      if (c2 === "foreignobject" && t2.parentElement?.closest?.("foreignObject")) return D(e2, "Skipped a nested <foreignObject>; it can't be captured."), null;
      if (c2 === "source" && t2.parentElement?.localName === "picture") return null;
    }
    if (t2.nodeType === Node.TEXT_NODE) {
      if (e2.selection) {
        let c2 = fa(t2, e2.selection);
        if (c2) return c2;
      }
      return t2.cloneNode(true);
    }
    if (t2.nodeType !== Node.ELEMENT_NODE) return t2.cloneNode(true);
    if (t2.getAttribute("data-capture") === "exclude") {
      if (n2.excludeMode === "hide") return ao(t2);
      if (n2.excludeMode === "remove") return null;
    }
    if (n2.exclude && Array.isArray(n2.exclude)) for (let c2 of n2.exclude) try {
      if (t2.matches?.(c2)) {
        if (n2.excludeMode === "hide") return ao(t2);
        if (n2.excludeMode === "remove") return null;
      }
    } catch {
      D(n2, `Invalid exclude selector "${c2}"; ignored.`);
    }
    if (n2.excludePredicates) for (let c2 of n2.excludePredicates) try {
      if (c2(t2)) return n2.excludeMode === "remove" ? null : ao(t2);
    } catch (f2) {
      D(n2, "Your exclude function threw; the element was kept.", f2);
    }
    if (typeof n2.filter == "function") try {
      if (!n2.filter(t2)) {
        if (n2.filterMode === "hide") return ao(t2);
        if (n2.filterMode === "remove") return null;
      }
    } catch (c2) {
      D(n2, "Your filter function threw; the element was kept.", c2);
    }
    if (t2 !== n2.element && !Du.has(t2.localName) && !Nt(t2) && O(t2).display === "none") {
      let c2 = t2.cloneNode(false);
      t2.tagName === "IMG" && (c2.removeAttribute("src"), c2.removeAttribute("srcset")), c2.style.setProperty("display", "none", "important");
      for (let f2 of t2.querySelectorAll("style")) {
        let d2 = await ue(f2, e2, n2);
        d2 && c2.appendChild(d2);
      }
      return c2;
    }
    if (e2.clip && Uu(t2, e2.clip)) return Hu(t2, e2.clip);
    if (n2.__resolveNodeHooks) for (let c2 of n2.__resolveNodeHooks) {
      let f2;
      try {
        f2 = await c2(t2, n2);
      } catch (d2) {
        D(e2, "A plugin's resolveNode hook threw; ignored it.", d2);
      }
      if (f2 === null) return null;
      if (f2?.nodeType) return f2.nodeType === Node.ELEMENT_NODE && (e2.nodeMap.set(f2, t2), xt(t2, f2, e2, n2)), f2;
    }
    {
      let c2 = ga.has(t2.tagName) && Wr.get(t2.tagName);
      if (c2) {
        let f2 = await c2(t2, e2, n2);
        if (f2 !== void 0) return f2;
      }
    }
    if (t2.getAttribute("data-capture") === "placeholder") {
      let c2 = t2.cloneNode(false);
      e2.nodeMap.set(c2, t2), xt(t2, c2, e2, n2);
      let f2 = document.createElement("div");
      return f2.textContent = t2.getAttribute("data-placeholder-text") || "", f2.style.cssText = "color:#666;font-size:12px;text-align:center;line-height:1.4;padding:0.5em;box-sizing:border-box;", c2.appendChild(f2), c2;
    }
    {
      let c2 = !ga.has(t2.tagName) && Wr.get(t2.tagName);
      if (c2) {
        let f2 = await c2(t2, e2, n2);
        if (f2 !== void 0) return f2;
      }
    }
    let s2;
    try {
      if (s2 = t2.cloneNode(false), js(t2, s2), e2.nodeMap.set(s2, t2), t2.tagName === "IMG") {
        ta(t2, s2, n2);
        try {
          let c2 = window.getComputedStyle(t2), f2 = parseFloat(c2.width), d2 = parseFloat(c2.height);
          if (!(f2 > 0) || !(d2 > 0)) {
            let g2 = Ft(t2), p2 = (b2) => parseFloat(c2.getPropertyValue(b2)) || 0, y2 = c2.getPropertyValue("box-sizing") === "border-box";
            f2 > 0 || (f2 = g2.width - (y2 ? 0 : p2("padding-left") + p2("padding-right") + p2("border-left-width") + p2("border-right-width"))), d2 > 0 || (d2 = g2.height - (y2 ? 0 : p2("padding-top") + p2("padding-bottom") + p2("border-top-width") + p2("border-bottom-width")));
          }
          let h2 = Math.round((f2 || 0) * 1e3) / 1e3, m2 = Math.round((d2 || 0) * 1e3) / 1e3;
          h2 && (s2.dataset.snapdomWidth = String(h2)), m2 && (s2.dataset.snapdomHeight = String(m2));
        } catch (c2) {
          D(e2, "Couldn't measure an image; kept its own size.", c2);
        }
        try {
          let c2 = t2.getAttribute("style") || "", f2 = window.getComputedStyle(t2), d2 = (w2) => {
            let S2 = c2.match(new RegExp(`${w2}\\s*:\\s*([^;]+)`, "i")), v2 = S2 ? S2[1].trim() : f2.getPropertyValue(w2);
            return /%|auto/i.test(String(v2 || ""));
          }, h2 = parseFloat(s2.dataset.snapdomWidth || "0") || 0, m2 = parseFloat(s2.dataset.snapdomHeight || "0") || 0, g2 = d2("width") || !(h2 > 0), p2 = d2("height") || !(m2 > 0);
          g2 && h2 > 0 && (s2.style.width = `${h2}px`), p2 && m2 > 0 && (s2.style.height = `${m2}px`);
          let y2 = f2.getPropertyValue("object-fit"), b2 = f2.getPropertyValue("object-position");
          y2 && y2 !== "fill" ? (s2.style.objectFit = y2, b2 && (s2.style.objectPosition = b2)) : (h2 > 0 && (s2.style.minWidth = `${h2}px`), m2 > 0 && (s2.style.minHeight = `${m2}px`));
        } catch (c2) {
          D(e2, "Couldn't fix the size of an image.", c2);
        }
      }
    } catch (c2) {
      throw D(n2, "Couldn't copy this element:", [t2, c2]), c2;
    }
    let a2 = null;
    if (ft(t2, "textarea")) {
      let { width: c2, height: f2 } = Ft(t2), d2 = c2 || t2.getBoundingClientRect().width || 0, h2 = f2 || t2.getBoundingClientRect().height || 0;
      d2 && (s2.style.width = `${d2}px`), h2 && (s2.style.height = `${h2}px`), (d2 || h2) && (s2.style.boxSizing = "border-box");
    }
    if (ft(t2, "input")) {
      let c2 = (t2.type || "text").toLowerCase();
      if ((c2 === "checkbox" || c2 === "radio") && (_t() || t2.indeterminate)) {
        let { el: d2, applyVisual: h2 } = sa(t2);
        e2.nodeMap.set(d2, t2), a2 = h2, s2 = d2;
      } else if (c2 === "range" && (_t() || Y())) {
        let { el: d2, applyVisual: h2 } = ia(t2);
        e2.nodeMap.set(d2, t2), a2 = h2, s2 = d2;
      } else if (c2 === "color" && Y()) {
        let d2 = s2, h2 = t2.value || "#000000";
        a2 = () => {
          d2.style.setProperty("background-color", h2, "important"), d2.style.setProperty("color", "transparent", "important"), d2.style.setProperty("-webkit-text-fill-color", "transparent", "important"), d2.style.setProperty("appearance", "none", "important"), d2.style.setProperty("-webkit-appearance", "none", "important");
        }, d2.removeAttribute("value");
      } else if ((c2 === "date" || c2 === "time" || c2 === "datetime-local") && (_t() || Y())) {
        s2.setAttribute("type", "text");
        let d2 = t2.value;
        c2 === "date" && t2.valueAsDate && (d2 = t2.valueAsDate.toLocaleDateString(void 0, { timeZone: "UTC" })), s2.value = d2, s2.setAttribute("value", d2);
      } else {
        let d2 = mn(t2) ? lr(t2.value) : t2.value;
        s2.value = d2, s2.setAttribute("value", d2), t2.checked !== void 0 && (s2.checked = t2.checked, t2.checked ? s2.setAttribute("checked", "") : s2.removeAttribute("checked"), t2.indeterminate && (s2.indeterminate = t2.indeterminate));
      }
    }
    if ((ft(t2, "input") || ft(t2, "textarea")) && !t2.value && t2.placeholder) try {
      let c2 = window.getComputedStyle(t2, "::placeholder"), f2 = c2 && c2.color;
      f2 && f2 !== "rgba(0, 0, 0, 0)" && (e2.__usesPlaceholder = true, s2.setAttribute("data-sd-ph", ""), s2.style.setProperty("--sd-ph", f2), s2.style.setProperty("--sd-ph-o", c2.opacity || "1"));
    } catch {
    }
    if (ft(t2, "select") && (r2 = new Set(Array.from(t2.options).filter((c2) => c2.selected))), ft(t2, "textarea") && (i2 = t2.value), ft(t2, "input") || ft(t2, "textarea") || ft(t2, "select")) {
      t2.disabled && s2.setAttribute("disabled", ""), t2.required && s2.setAttribute("required", ""), t2.readOnly && s2.setAttribute("readonly", "");
      let c2 = t2;
      c2.min !== void 0 && c2.min !== "" && s2.setAttribute("min", c2.min), c2.max !== void 0 && c2.max !== "" && s2.setAttribute("max", c2.max), c2.pattern !== void 0 && c2.pattern !== "" && s2.setAttribute("pattern", c2.pattern);
      let f2 = t2.getAttribute("aria-invalid");
      f2 !== null && s2.setAttribute("aria-invalid", f2);
    }
    if (oo(t2) || xt(t2, s2, e2, n2), a2 && a2(), n2.captureSelection && (ft(t2, "input") || ft(t2, "textarea"))) try {
      ua(t2, s2);
    } catch (c2) {
      D(e2, "Couldn't copy the selection of a text field.", c2);
    }
    if (Nt(t2) && !oo(t2)) {
      let c2 = ["fill", "stroke", "stroke-width", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "opacity", "fill-opacity", "stroke-opacity", "fill-rule", "clip-rule", "marker", "marker-start", "marker-mid", "marker-end", "visibility", "display", "color"];
      try {
        let f2 = window.getComputedStyle(t2);
        for (let h2 of c2) {
          let m2 = f2.getPropertyValue(h2);
          m2 && s2.style.setProperty(h2, m2);
        }
        t2.localName === "stop" && (s2.style.setProperty("stop-color", f2.getPropertyValue("stop-color")), s2.style.setProperty("stop-opacity", f2.getPropertyValue("stop-opacity")));
        let d2 = Nu(t2);
        d2 && Ou(t2, s2, f2, d2);
      } catch {
      }
    }
    if (t2.shadowRoot) {
      $r(t2.shadowRoot);
      try {
        let b2 = t2.shadowRoot.querySelectorAll("slot");
        for (let w2 of b2) {
          let S2 = w2.assignedNodes?.() || [];
          for (let v2 of S2) o2.add(v2);
        }
      } catch {
      }
      let c2 = Js(e2), f2 = `[data-sd="${c2}"]`;
      e2.shadowScopes || (e2.shadowScopes = /* @__PURE__ */ new WeakMap()), e2.shadowScopes.set(t2.shadowRoot, c2);
      try {
        s2.setAttribute("data-sd", c2);
      } catch {
      }
      let d2 = Qs(t2.shadowRoot);
      !e2.__shadowPseudo && /::?(?:before|after|first-l|marker)|counter/.test(d2) && (e2.__shadowPseudo = true);
      let h2 = Ks(d2, f2, c2), m2 = ea(d2), g2 = na(t2, m2, f2);
      Zs(s2, g2 + h2, c2);
      let p2 = document.createDocumentFragment(), y2 = await Promise.all(Array.from(t2.shadowRoot.childNodes).map((b2) => b2.nodeType === Node.ELEMENT_NODE && b2.tagName === "STYLE" ? null : ue(b2, e2, n2).catch(() => null)));
      p2.append(...y2.filter((b2) => !!b2)), s2.appendChild(p2);
    }
    if (t2.tagName === "SLOT") {
      let c2 = e2.shadowScopes?.get(t2.getRootNode()), f2 = t2.assignedNodes?.() || [], d2 = f2.length ? t2.assignedNodes?.({ flatten: true }) || f2 : [], h2 = d2.length ? d2 : Array.from(t2.childNodes), m2 = document.createDocumentFragment(), g2 = await Promise.all(h2.map((p2) => ue(p2, e2, n2).then((y2) => (y2 && f2.length && oa(y2, c2), y2 || null)).catch(() => null)));
      return m2.append(...g2.filter((p2) => !!p2)), m2;
    }
    let l2 = (c2) => o2.has(c2) || t2.shadowRoot && !c2.assignedSlot, u2 = await Promise.all(Array.from(t2.childNodes).map((c2) => l2(c2) ? null : ue(c2, e2, n2).catch(() => null)));
    if (s2.append(...u2.filter((c2) => !!c2)), r2 && ft(s2, "select")) {
      let c2 = false;
      for (let f2 of s2.options) {
        let d2 = r2.has(e2.nodeMap.get(f2));
        f2.selected = d2, d2 ? f2.setAttribute("selected", "") : f2.removeAttribute("selected"), c2 || (c2 = d2);
      }
      if (!c2 && !s2.multiple) {
        let f2 = s2.ownerDocument.createElement("option");
        f2.hidden = true, f2.style.setProperty("display", "none", "important"), f2.setAttribute("selected", ""), f2.value = "", s2.appendChild(f2);
      }
    }
    return i2 !== null && ft(s2, "textarea") && (s2.textContent = i2), s2;
  }
  async function Ju(t2, e2, n2) {
    let o2 = false;
    try {
      o2 = !!(t2.contentDocument || t2.contentWindow?.document);
    } catch (r2) {
      D(e2, "Couldn't tell if an iframe is same-origin; treated it as cross-origin.", r2);
    }
    if (o2) try {
      return await Lr(t2, e2, n2);
    } catch (r2) {
      nt(n2.__session, "iframe-failed", "same-origin iframe failed to rasterize", r2), D(n2, "Couldn't capture an iframe, so it was left out.", r2);
    }
    if (o2 || (nt(n2.__session, "iframe-cross-origin", `cross-origin iframe replaced by ${n2.placeholders ? "a placeholder" : "a spacer"}`, t2), D(n2, n2.placeholders ? "Can't capture a cross-origin iframe; showing a placeholder. Set placeholders: false to hide it." : "Can't capture a cross-origin iframe; left it out.", t2)), n2.placeholders) {
      let { width: r2, height: i2 } = Ft(t2), s2 = document.createElement("div");
      return s2.style.cssText = `width:${r2}px;height:${i2}px;background-image:repeating-linear-gradient(45deg,#ddd,#ddd 5px,#f9f9f9 5px,#f9f9f9 10px);display:flex;align-items:center;justify-content:center;font-size:12px;color:#555;border:1px solid #aaa;`, xt(t2, s2, e2, n2), s2;
    } else {
      let { width: r2, height: i2 } = Ft(t2), s2 = document.createElement("div");
      return s2.style.cssText = `display:inline-block;width:${r2}px;height:${i2}px;visibility:hidden;`, xt(t2, s2, e2, n2), s2;
    }
  }
  function Rn(t2) {
    try {
      let e2 = Math.max(1, Math.min(32, t2.width)), n2 = Math.max(1, Math.min(32, t2.height)), o2 = document.createElement("canvas");
      o2.width = e2, o2.height = n2;
      let r2 = o2.getContext("2d", { willReadFrequently: true });
      if (!r2) return false;
      r2.drawImage(t2, 0, 0, e2, n2);
      let i2 = r2.getImageData(0, 0, e2, n2).data;
      for (let s2 = 3; s2 < i2.length; s2 += 4) if (i2[s2] !== 0) return false;
      return true;
    } catch {
      return false;
    }
  }
  function Zu(t2, e2, n2) {
    try {
      let o2 = t2.getImageData(0, 0, e2, n2).data;
      for (let r2 = 3; r2 < o2.length; r2 += 4) if (o2[r2] !== 255) return false;
      return true;
    } catch {
      return false;
    }
  }
  function td(t2) {
    try {
      let e2 = t2.getContext("webgl2") || t2.getContext("webgl");
      return !!e2 && !e2.getContextAttributes()?.preserveDrawingBuffer;
    } catch {
      return false;
    }
  }
  async function ed(t2, e2, n2) {
    let o2 = "";
    try {
      let a2 = Rn(t2);
      a2 ? (await Ct(), a2 = Rn(t2)) : td(t2) && await Ct();
      let l2 = null;
      if (!a2) {
        l2 = t2.getContext("2d", { willReadFrequently: true });
        try {
          l2 && l2.getImageData(0, 0, 1, 1);
        } catch {
        }
        Y() && await Ct();
      }
      if (o2 = t2.toDataURL("image/png"), !o2 || o2 === "data:,") {
        try {
          l2 && l2.getImageData(0, 0, 1, 1);
        } catch {
        }
        if (await Ct(), o2 = t2.toDataURL("image/png"), !o2 || o2 === "data:,") {
          let u2 = document.createElement("canvas");
          u2.width = t2.width, u2.height = t2.height;
          let c2 = u2.getContext("2d");
          c2 && (c2.drawImage(t2, 0, 0), o2 = u2.toDataURL("image/png"));
        }
      }
    } catch (a2) {
      nt(n2?.__session, "canvas-tainted", "a canvas tainted by cross-origin images cannot be read; it renders blank", t2), D(e2, "Couldn't read the pixels of a canvas; used its fallback content.", a2);
    }
    n2 && n2.debug && o2 && Rn(t2) && D(e2, "Empty canvas; capture after its first frame", t2);
    let r2 = document.createElement("img");
    try {
      r2.decoding = "sync", r2.loading = "eager";
    } catch (a2) {
      D(e2, "Couldn't set image loading hints.", a2);
    }
    o2 && (r2.src = o2), r2.width = t2.width, r2.height = t2.height;
    let { width: i2, height: s2 } = Ft(t2);
    return i2 > 0 && (r2.style.width = `${i2}px`), s2 > 0 && (r2.style.height = `${s2}px`), e2.nodeMap.set(r2, t2), xt(t2, r2, e2, n2), r2;
  }
  async function nd(t2, e2, n2) {
    let o2 = "", r2 = t2.poster && t2.paused && !t2.currentTime && !t2.played.length, i2 = document.createElement("img");
    try {
      i2.decoding = "sync", i2.loading = "eager";
    } catch {
    }
    if (!r2) try {
      let l2 = document.createElement("canvas");
      l2.width = t2.videoWidth || t2.offsetWidth || 320, l2.height = t2.videoHeight || t2.offsetHeight || 240;
      let u2 = l2.getContext("2d");
      u2 && (u2.drawImage(t2, 0, 0, l2.width, l2.height), o2 = l2.toDataURL(Zu(u2, l2.width, l2.height) ? "image/jpeg" : "image/png", Qu), (!o2 || o2 === "data:,") && (o2 = ""));
    } catch (l2) {
      D(e2, "Couldn't capture a video frame; used its poster.", l2);
    }
    o2 ? i2.src = o2 : t2.poster && (i2.src = t2.poster), i2.width = t2.videoWidth || t2.offsetWidth || 0, i2.height = t2.videoHeight || t2.offsetHeight || 0;
    let { width: s2, height: a2 } = Ft(t2);
    return s2 > 0 && (i2.style.width = `${s2}px`), a2 > 0 && (i2.style.height = `${a2}px`), i2.style.objectFit = "contain", e2.nodeMap.set(i2, t2), xt(t2, i2, e2, n2), i2;
  }
  async function od(t2, e2, n2) {
    if (!t2.controls) return;
    let { width: o2, height: r2 } = Ft(t2), i2 = Math.round(o2 || t2.offsetWidth || 300), s2 = Math.round(r2 || t2.offsetHeight || 54), a2 = s2 / 2, l2 = Math.max(4, s2 * 0.16), u2 = s2 * 0.34, c2 = i2 - s2 * 0.34, f2 = u2 + l2 + s2 * 0.55, d2 = Math.max(0, c2 - s2 * 0.7 - f2), h2 = Math.max(9, Math.round(s2 * 0.24)), m2 = `<svg xmlns="http://www.w3.org/2000/svg" width="${i2}" height="${s2}" viewBox="0 0 ${i2} ${s2}"><rect width="${i2}" height="${s2}" rx="${Math.min(s2 / 2, 10)}" fill="#f1f3f4"/><path d="M ${u2} ${a2 - l2} L ${u2 + l2} ${a2} L ${u2} ${a2 + l2} Z" fill="#5f6368"/><rect x="${f2}" y="${a2 - 1.5}" width="${d2}" height="3" rx="1.5" fill="#bdc1c6"/><circle cx="${f2}" cy="${a2}" r="${Math.max(3, s2 * 0.09)}" fill="#5f6368"/><text x="${c2}" y="${a2}" fill="#5f6368" font-family="sans-serif" font-size="${h2}" text-anchor="end" dominant-baseline="central">0:00</text></svg>`, g2 = document.createElement("img");
    try {
      g2.decoding = "sync", g2.loading = "eager";
    } catch {
    }
    return g2.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(m2)}`, g2.width = i2, g2.height = s2, g2.style.width = `${i2}px`, g2.style.height = `${s2}px`, e2.nodeMap.set(g2, t2), xt(t2, g2, e2, n2), g2;
  }
  async function Ca(t2, e2, n2) {
    let o2 = t2.getAttribute("data") || t2.getAttribute("src") || "", r2 = (t2.getAttribute("type") || "").toLowerCase(), i2 = /^image\//.test(r2) || /\.(png|jpe?g|gif|webp|avif|bmp|ico|svg)(\?|#|$)/i.test(o2);
    if (o2 && i2) {
      let a2 = document.createElement("img");
      try {
        a2.decoding = "sync", a2.loading = "eager";
      } catch {
      }
      a2.src = o2;
      let { width: l2, height: u2 } = Ft(t2);
      return l2 > 0 && (a2.style.width = `${l2}px`), u2 > 0 && (a2.style.height = `${u2}px`), e2.nodeMap.set(a2, t2), xt(t2, a2, e2, n2), a2;
    }
    let s2 = null;
    try {
      s2 = t2.contentDocument;
    } catch {
    }
    if (s2) try {
      let a2 = await Lr(t2, e2, n2);
      if (a2) return a2;
    } catch {
    }
    o2 && (nt(n2.__session, "embed-fallback", `<${t2.localName}> not capturable, using its fallback content: ${o2}`), D(n2, `Couldn't capture <${t2.localName}>${r2 ? ` (${r2})` : ""}; showing its fallback content.`));
  }
  function id(t2) {
    return t2.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }
  function Ma(t2, e2) {
    let n2 = Array.isArray(t2) ? t2 : t2 ? [t2] : [], o2 = [];
    for (let r2 of n2) r2 instanceof RegExp ? o2.push(r2) : typeof r2 == "string" ? o2.push(new RegExp(id(r2), "i")) : D(e2, "Ignored an iconFonts entry: use a string or a RegExp.", r2);
    return o2;
  }
  function Ht(t2, e2) {
    let n2 = typeof t2 == "string" ? t2 : "";
    for (let o2 of rd) if (o2.test(n2)) return true;
    if (e2) {
      for (let o2 of e2) if (o2 instanceof RegExp && o2.test(n2)) return true;
    }
    return !!(/icon/i.test(n2) || /glyph/i.test(n2) || /symbols/i.test(n2) || /feather/i.test(n2) || /fontawesome/i.test(n2));
  }
  function Dr(t2, e2) {
    if (typeof t2 != "string" || !t2) return false;
    let n2;
    try {
      n2 = new URL(t2, typeof location < "u" ? location.href : void 0);
    } catch {
      return Ht(t2, e2);
    }
    let o2 = n2.searchParams.getAll("family").flatMap((r2) => r2.split("|")).map((r2) => r2.split(":")[0].trim()).filter(Boolean);
    return o2.length ? o2.every((r2) => Ht(r2, e2)) : Ht(t2, e2);
  }
  function sd(t2 = "") {
    let e2 = String(t2).toLowerCase();
    return /\bmaterial\s*icons\b/.test(e2) || /\bmaterial\s*symbols\b/.test(e2);
  }
  function ad(t2 = "") {
    let e2 = /* @__PURE__ */ Object.create(null), n2 = String(t2 || ""), o2 = /['"]?\s*([A-Za-z]{3,4})\s*['"]?\s*([+-]?\d+(?:\.\d+)?)\s*/g, r2;
    for (; r2 = o2.exec(n2); ) e2[r2[1].toUpperCase()] = Number(r2[2]);
    return e2;
  }
  async function ld(t2, e2, n2) {
    let o2 = String(t2 || ""), r2 = o2.toLowerCase(), i2 = String(e2 || "").toLowerCase();
    if (/\bmaterial\s*icons\b/.test(r2) && !/\bsymbols\b/.test(r2)) return { familyForMeasure: o2, familyForCanvas: o2 };
    if (!/\bmaterial\s*symbols\b/.test(r2)) return { familyForMeasure: o2, familyForCanvas: o2 };
    let a2 = n2 && (n2.FILL ?? n2.fill), l2 = "outlined";
    /\brounded\b/.test(i2) || /\bround\b/.test(i2) ? l2 = "rounded" : /\bsharp\b/.test(i2) ? l2 = "sharp" : /\boutlined\b/.test(i2) && (l2 = "outlined");
    let u2 = a2 === 1, c2 = null;
    if (u2 && (l2 === "outlined" && Je.materialIconsFilled ? c2 = { url: Je.materialIconsFilled, alias: "snapdom-mi-filled" } : l2 === "rounded" && Je.materialIconsRound ? c2 = { url: Je.materialIconsRound, alias: "snapdom-mi-round" } : l2 === "sharp" && Je.materialIconsSharp && (c2 = { url: Je.materialIconsSharp, alias: "snapdom-mi-sharp" })), !c2) return { familyForMeasure: o2, familyForCanvas: o2 };
    if (!fo.has(c2.alias)) try {
      let d2 = new FontFace(c2.alias, `url(${c2.url})`, { style: "normal", weight: "400" });
      await d2.load(), document.fonts.add(d2), fo.set(c2.alias, true);
    } catch {
      return fo.set(c2.alias, false), { familyForMeasure: o2, familyForCanvas: o2 };
    }
    if (fo.get(c2.alias) === false) return { familyForMeasure: o2, familyForCanvas: o2 };
    let f2 = `"${c2.alias}"`;
    return { familyForMeasure: f2, familyForCanvas: f2 };
  }
  async function cd(t2 = "Material Icons", e2 = 24) {
    try {
      await Promise.all([document.fonts.load(`400 ${e2}px "${String(t2).replace(/["']/g, "")}"`), wn()]);
    } catch {
    }
  }
  function fd(t2) {
    let e2 = t2.getPropertyValue("-webkit-text-fill-color")?.trim() || "", n2 = /^transparent$/i.test(e2) || /rgba?\(\s*0\s*,\s*0\s*,\s*0\s*,\s*0\s*\)/i.test(e2);
    if (e2 && !n2 && e2.toLowerCase() !== "currentcolor") return e2;
    let o2 = t2.color?.trim();
    return o2 && o2 !== "inherit" ? o2 : "#000";
  }
  async function ud(t2, { family: e2 = "Material Icons", weight: n2 = "normal", fontSize: o2 = 32, color: r2 = "#000", variation: i2 = "", className: s2 = "" } = {}) {
    let a2 = String(e2 || "").replace(/^['"]+|['"]+$/g, ""), l2 = window.devicePixelRatio || 1, u2 = ad(i2), { familyForMeasure: c2, familyForCanvas: f2 } = await ld(a2, s2, u2);
    await cd(f2.replace(/^["']+|["']+$/g, ""), o2);
    let d2 = document.createElement("span");
    tt(d2), d2.textContent = t2, d2.style.position = "absolute", d2.style.visibility = "hidden", d2.style.left = "-99999px", d2.style.whiteSpace = "nowrap", d2.style.fontFamily = c2, d2.style.fontWeight = String(n2 || "normal"), d2.style.fontSize = `${o2}px`, d2.style.lineHeight = "1", d2.style.margin = "0", d2.style.padding = "0", d2.style.fontFeatureSettings = "'liga' 1", d2.style.fontVariantLigatures = "normal", d2.style.color = r2, document.body.appendChild(d2);
    let h2 = d2.getBoundingClientRect(), m2 = Math.max(1, Math.ceil(h2.width)), g2 = Math.max(1, Math.ceil(h2.height));
    document.body.removeChild(d2);
    let p2 = document.createElement("canvas");
    p2.width = m2 * l2, p2.height = g2 * l2;
    let y2 = p2.getContext("2d");
    y2.scale(l2, l2), y2.font = `${n2 ? `${n2} ` : ""}${o2}px ${f2}`, y2.textAlign = "left", y2.textBaseline = "top", y2.fillStyle = r2;
    try {
      y2.fontKerning = "normal";
    } catch {
    }
    return y2.fillText(t2, 0, 0), { dataUrl: p2.toDataURL(), width: m2, height: g2 };
  }
  async function uo(t2, e2, n2 = /* @__PURE__ */ new Map()) {
    if (t2?.nodeType !== 1) return 0;
    let o2 = '.material-icons, [class*="material-symbols"]', r2 = Array.from(t2.querySelectorAll(o2)).filter((a2) => a2 && a2.textContent && a2.textContent.trim());
    if (t2.matches?.(o2) && t2.textContent && t2.textContent.trim() && r2.unshift(t2), r2.length === 0) return 0;
    let i2 = e2?.nodeType === 1 ? Array.from(e2.querySelectorAll(o2)).filter((a2) => a2 && a2.textContent && a2.textContent.trim()) : [];
    e2?.nodeType === 1 && e2.matches?.(o2) && e2.textContent && e2.textContent.trim() && i2.unshift(e2);
    let s2 = 0;
    for (let a2 = 0; a2 < r2.length; a2++) {
      let l2 = r2[a2], u2 = n2 && n2.get(l2) || i2[a2] || null;
      try {
        let c2 = getComputedStyle(u2 || l2), f2 = c2.fontFamily || "Material Icons";
        if (!sd(f2)) continue;
        let d2 = (u2 || l2).textContent.trim();
        if (!d2) continue;
        let h2 = parseInt(c2.fontSize, 10) || 24, m2 = c2.fontWeight && c2.fontWeight !== "normal" ? c2.fontWeight : "normal", g2 = fd(c2), p2 = c2.fontVariationSettings && c2.fontVariationSettings !== "normal" ? c2.fontVariationSettings : "", y2 = (u2 || l2).className || "", { dataUrl: b2, width: w2, height: S2 } = await ud(d2, { family: f2, weight: m2, fontSize: h2, color: g2, variation: p2, className: y2 });
        l2.textContent = "";
        let v2 = l2.ownerDocument.createElement("img");
        v2.src = b2, v2.alt = d2, v2.style.height = `${h2}px`, v2.style.width = `${Math.max(1, Math.round(w2 / S2 * h2))}px`, v2.style.objectFit = "contain", v2.style.verticalAlign = getComputedStyle(l2).verticalAlign || "baseline", l2.appendChild(v2), s2++;
      } catch {
      }
    }
    return s2;
  }
  function po(t2, e2, n2, o2) {
    if (!e2?.size) return 0;
    let r2 = /* @__PURE__ */ new Map(), i2 = /* @__PURE__ */ new Map(), s2 = 0;
    for (let a2 of t2) {
      let l2 = e2.get(a2);
      if (!l2 || a2.nodeType !== 1 || ka.has(a2.firstChild)) continue;
      let u2 = r2.get(l2);
      if (u2 === void 0) {
        let p2 = dd.exec(l2)?.[1];
        r2.set(l2, u2 = !!p2 && Ht(p2, o2));
      }
      if (!u2) continue;
      let c2 = a2.dataset?.snapdomPseudo, f2 = c2 ? n2.get(a2.parentNode) : n2.get(a2);
      if (f2?.nodeType !== 1) continue;
      let d2 = getComputedStyle(f2, c2 || null);
      if (d2.display !== "inline" && d2.display !== "inline-block") continue;
      let h2 = `${d2.fontFamily}|${d2.fontSize}|${d2.fontWeight}|${d2.fontStyle}|${d2.fontStretch}|${d2.lineHeight}`, m2 = i2.get(h2);
      if (m2 === void 0 && i2.set(h2, m2 = hd(f2.ownerDocument, d2)), !m2) continue;
      let g2 = a2.ownerDocument.createElement("span");
      ka.add(g2), g2.style.cssText = `display:inline-block;width:0;height:${m2.height}px;vertical-align:${-m2.descent}px`, a2.style.lineHeight = "0", a2.insertBefore(g2, a2.firstChild), g2.nextSibling === null && pd(a2, f2), s2++;
    }
    return s2;
  }
  function pd(t2, e2) {
    let n2 = getComputedStyle(e2.parentElement || e2).whiteSpace;
    if (n2 !== "normal" && n2 !== "nowrap" && n2 !== "pre-line") return;
    let o2 = t2.previousSibling, r2 = t2.nextSibling;
    o2?.nodeType !== 3 || r2?.nodeType !== 3 || /[ \t\n]$/.test(o2.data) && (r2.data = r2.data.replace(/^[ \t\n]+/, ""));
  }
  function hd(t2, e2) {
    let n2 = t2.createElement("div");
    tt(n2), n2.style.cssText = `position:absolute;left:-9999px;top:0;visibility:hidden;white-space:nowrap;margin:0;padding:0;border:0;font-family:${e2.fontFamily};font-size:${e2.fontSize};font-weight:${e2.fontWeight};font-style:${e2.fontStyle};font-stretch:${e2.fontStretch};line-height:${e2.lineHeight}`;
    let o2 = t2.createElement("span");
    o2.style.cssText = "display:inline-block;width:0;height:0;vertical-align:baseline", n2.appendChild(o2), (t2.body || t2.documentElement).appendChild(n2);
    try {
      let r2 = n2.getBoundingClientRect().height, i2 = o2.getBoundingClientRect().top - n2.getBoundingClientRect().top;
      return r2 > 0 ? { height: r2, descent: r2 - i2 } : null;
    } finally {
      n2.remove();
    }
  }
  async function Ra(t2, e2, n2, o2 = 32, r2 = "#000", i2 = "normal") {
    e2 = e2.replace(/^['"]+|['"]+$/g, "");
    let s2 = window.devicePixelRatio || 1;
    try {
      await wn();
    } catch {
    }
    let a2 = document.createElement("span");
    tt(a2), a2.textContent = t2, a2.style.position = "absolute", a2.style.visibility = "hidden", a2.style.fontFamily = `"${e2}"`, a2.style.fontWeight = n2 || "normal", a2.style.fontStyle = i2 || "normal", a2.style.fontSize = `${o2}px`, a2.style.lineHeight = "1", a2.style.whiteSpace = "nowrap", a2.style.padding = "0", a2.style.margin = "0", document.body.appendChild(a2);
    let l2 = a2.getBoundingClientRect(), u2 = Math.ceil(l2.width), c2 = Math.ceil(l2.height);
    document.body.removeChild(a2);
    let f2 = document.createElement("canvas");
    f2.width = Math.max(1, u2 * s2), f2.height = Math.max(1, c2 * s2);
    let d2 = f2.getContext("2d");
    d2.scale(s2, s2), d2.font = `${i2 || "normal"} ${n2 || "normal"} ${o2}px "${e2}"`, d2.textAlign = "left", d2.textBaseline = "top", d2.fillStyle = r2, d2.fillText(t2, 0, 0);
    let h2 = d2.measureText(t2).actualBoundingBoxAscent;
    d2.textBaseline = "alphabetic";
    let m2 = d2.measureText(t2).actualBoundingBoxAscent, g2 = c2 - (m2 - h2);
    return { dataUrl: f2.toDataURL(), width: u2, height: c2, advance: l2.width, descent: Number.isFinite(g2) ? g2 : 0 };
  }
  function zr(t2) {
    if (!t2) return "";
    for (let e2 of t2.split(",")) {
      let n2 = e2.trim().replace(/^['"]+|['"]+$/g, "");
      if (n2 && !Fa.has(n2.toLowerCase())) return n2;
    }
    return "";
  }
  function gd(t2) {
    if (!t2) return [];
    let e2 = [];
    for (let n2 of t2.split(",")) {
      let o2 = n2.trim().replace(/^['"]+|['"]+$/g, "");
      o2 && (Fa.has(o2.toLowerCase()) || e2.push(o2));
    }
    return e2;
  }
  function ho(t2) {
    let e2 = String(t2 ?? "400").trim().toLowerCase();
    if (e2 === "normal") return 400;
    if (e2 === "bold") return 700;
    let n2 = parseInt(e2, 10);
    return Number.isFinite(n2) ? Math.min(900, Math.max(100, n2)) : 400;
  }
  function mo(t2) {
    let e2 = String(t2 ?? "normal").trim().toLowerCase();
    return e2.startsWith("italic") ? "italic" : e2.startsWith("oblique") ? "oblique" : "normal";
  }
  function yd(t2) {
    let e2 = String(t2 ?? "100%").match(/(\d+(?:\.\d+)?)\s*%/);
    return e2 ? Math.max(50, Math.min(200, parseFloat(e2[1]))) : 100;
  }
  function bd(t2) {
    let e2 = String(t2 || "400").trim(), n2 = e2.match(/^(\d{2,3})\s+(\d{2,3})$/);
    if (n2) {
      let r2 = ho(n2[1]), i2 = ho(n2[2]);
      return { min: Math.min(r2, i2), max: Math.max(r2, i2) };
    }
    let o2 = ho(e2);
    return { min: o2, max: o2 };
  }
  function wd(t2) {
    let e2 = String(t2 || "normal").trim().toLowerCase();
    return e2 === "italic" ? { kind: "italic" } : e2.startsWith("oblique") ? { kind: "oblique" } : { kind: "normal" };
  }
  function xd(t2) {
    let e2 = String(t2 || "100%").trim(), n2 = e2.match(/(\d+(?:\.\d+)?)\s*%\s+(\d+(?:\.\d+)?)\s*%/);
    if (n2) {
      let i2 = parseFloat(n2[1]), s2 = parseFloat(n2[2]);
      return { min: Math.min(i2, s2), max: Math.max(i2, s2) };
    }
    let o2 = e2.match(/(\d+(?:\.\d+)?)\s*%/), r2 = o2 ? parseFloat(o2[1]) : 100;
    return { min: r2, max: r2 };
  }
  function Sd(t2) {
    return !t2 || typeof t2 != "string" ? "" : t2.replace(/\s+(variable|vf|v[0-9]+)$/i, "").trim().toLowerCase().replace(/\s+/g, "-");
  }
  function vd(t2, e2, n2 = []) {
    if (!t2) return false;
    try {
      let o2 = new URL(t2, location.href);
      if (o2.origin === location.origin) return true;
      let i2 = o2.host.toLowerCase();
      if (["fonts.googleapis.com", "fonts.gstatic.com", "use.typekit.net", "p.typekit.net", "kit.fontawesome.com", "use.fontawesome.com", "cdn.jsdelivr.net", "unpkg.com", "cdnjs.cloudflare.com", "esm.sh"].some((l2) => i2.endsWith(l2)) || n2.some((l2) => i2 === l2.toLowerCase() || i2.endsWith("." + l2.toLowerCase()))) return true;
      let a2 = (o2.pathname + o2.search).toLowerCase();
      if (/\bfont(s)?\b/.test(a2) || /\.woff2?(\b|$)/.test(a2) || md.some((l2) => a2.includes(l2))) return true;
      for (let l2 of e2) {
        let u2 = l2.toLowerCase().replace(/\s+/g, "+"), c2 = l2.toLowerCase().replace(/\s+/g, "-"), f2 = Sd(l2);
        if (a2.includes(u2) || a2.includes(c2) || f2 && a2.includes(f2)) return true;
      }
      return false;
    } catch {
      return false;
    }
  }
  function Fn(t2) {
    return String(t2).split(bo)[0];
  }
  function wo(t2) {
    let e2 = /* @__PURE__ */ new Set(), n2 = /* @__PURE__ */ new Set();
    try {
      for (let o2 of t2.fonts) {
        let r2 = String(o2.family).replace(/["']/g, "").toLowerCase();
        e2.add(r2), (o2.status === "loading" || o2.status === "loaded") && n2.add(r2);
      }
    } catch {
    }
    return { declared: e2, drawn: n2 };
  }
  function Cd(t2) {
    let e2 = /* @__PURE__ */ new Set();
    for (let n2 of t2 || []) {
      let o2 = Fn(n2).trim();
      o2 && e2.add(o2);
    }
    return e2;
  }
  function Aa(t2, e2) {
    return t2 && t2.replace(/url\(\s*(['"]?)([^)'"]+)\1\s*\)/g, (n2, o2, r2) => {
      let i2 = (r2 || "").trim();
      if (!i2 || /^data:|^blob:|^https?:|^file:|^about:/i.test(i2)) return n2;
      let s2 = i2;
      try {
        s2 = new URL(i2, e2 || location.href).href;
      } catch {
      }
      return `url("${s2}")`;
    });
  }
  async function kd(t2, e2, n2, o2) {
    if (!t2) return t2;
    let r2 = /* @__PURE__ */ new Set();
    function i2(l2, u2) {
      try {
        return new URL(l2, u2 || location.href).href;
      } catch {
        return l2;
      }
    }
    async function s2(l2, u2, c2 = 0) {
      if (c2 > yo) return D({ debug: o2 }, `Too many nested @import rules in ${u2}; stopped at ${yo} levels.`), l2;
      let f2 = "", d2 = 0, h2, m2 = new RegExp($a.source, "g");
      for (; h2 = m2.exec(l2); ) {
        f2 += l2.slice(d2, h2.index), d2 = m2.lastIndex;
        let g2 = (h2[2] || h2[4] || "").trim(), p2 = i2(g2, u2);
        if (r2.has(p2)) {
          D({ debug: o2 }, `Skipped an @import that loops back: ${p2}`);
          continue;
        }
        r2.add(p2);
        let y2 = "";
        try {
          let b2 = await ut(p2, { as: "text", useProxy: n2 });
          b2.ok && typeof b2.data == "string" && (y2 = b2.data);
        } catch {
        }
        y2 ? (y2 = Aa(y2, p2), y2 = await s2(y2, p2, c2 + 1), f2 += `
/* inlined: ${p2} */
${y2}
`) : f2 += h2[0];
      }
      return f2 += l2.slice(d2), f2;
    }
    let a2 = Aa(t2, e2 || location.href);
    return a2 = await s2(a2, e2 || location.href, 0), a2;
  }
  function Lt(t2, e2, n2 = "") {
    return (t2.match(new RegExp(`${e2}\\s*:\\s*([^;}]+)[;}]`, "i"))?.[1] || n2).trim();
  }
  function Pa(t2) {
    if (!t2) return [];
    let e2 = [], n2 = t2.split(",").map((o2) => o2.trim()).filter(Boolean);
    for (let o2 of n2) {
      let r2 = o2.match(/^U\+([0-9A-Fa-f?]+)(?:-([0-9A-Fa-f?]+))?$/);
      if (!r2) continue;
      let i2 = r2[1], s2 = r2[2], a2 = (l2) => {
        if (!l2.includes("?")) return parseInt(l2, 16);
        let u2 = parseInt(l2.replace(/\?/g, "0"), 16), c2 = parseInt(l2.replace(/\?/g, "F"), 16);
        return [u2, c2];
      };
      if (s2) {
        let l2 = a2(i2), u2 = a2(s2), c2 = Array.isArray(l2) ? l2[0] : l2, f2 = Array.isArray(u2) ? u2[1] : u2;
        e2.push([Math.min(c2, f2), Math.max(c2, f2)]);
      } else {
        let l2 = a2(i2);
        Array.isArray(l2) ? e2.push([l2[0], l2[1]]) : e2.push([l2, l2]);
      }
    }
    return e2;
  }
  function Na(t2, e2) {
    if (!e2.length || !t2 || t2.size === 0) return true;
    for (let n2 of t2) for (let [o2, r2] of e2) if (n2 >= o2 && n2 <= r2) return true;
    return false;
  }
  function Ur(t2, e2) {
    let n2 = [];
    if (!t2) return n2;
    for (let o2 of t2.matchAll(Ta)) {
      let r2 = (o2[2] || "").trim();
      if (!(!r2 || r2.startsWith("data:"))) {
        if (!/^https?:/i.test(r2)) try {
          r2 = new URL(r2, e2 || location.href).href;
        } catch {
        }
        n2.push(r2);
      }
    }
    return n2;
  }
  async function go(t2, e2, n2 = "", o2 = false) {
    let r2 = t2;
    for (let i2 of t2.matchAll(Ta)) {
      let s2 = ge(i2[0]);
      if (!s2) continue;
      let a2 = s2;
      if (!a2.startsWith("http") && !a2.startsWith("data:")) try {
        a2 = new URL(a2, e2 || location.href).href;
      } catch {
      }
      if (j.resource?.has(a2)) {
        r2 = r2.replace(i2[0], `url(${j.resource.get(a2)})`);
        continue;
      }
      try {
        let l2 = await ut(a2, { as: "dataURL", useProxy: n2 });
        if (l2.ok && typeof l2.data == "string") {
          let u2 = l2.data;
          j.resource?.set(a2, u2), r2 = r2.replace(i2[0], `url(${u2})`);
        }
      } catch {
        D({ debug: o2 }, "Couldn't load font file:", a2);
      }
    }
    return r2;
  }
  function Ad(t2) {
    if (!t2.length) return null;
    let e2 = (a2, l2) => t2.some(([u2, c2]) => !(c2 < a2 || u2 > l2)), n2 = e2(0, 255) || e2(305, 305), o2 = e2(256, 591) || e2(7680, 7935), r2 = e2(880, 1023), i2 = e2(1024, 1279);
    return e2(7840, 7929) || e2(258, 259) || e2(416, 417) || e2(431, 432) ? "vietnamese" : i2 ? "cyrillic" : r2 ? "greek" : o2 ? "latin-ext" : n2 ? "latin" : null;
  }
  function _a(t2 = {}) {
    let e2 = new Set((t2.families || []).map((r2) => String(r2).toLowerCase())), n2 = new Set((t2.domains || []).map((r2) => String(r2).toLowerCase())), o2 = new Set((t2.subsets || []).map((r2) => String(r2).toLowerCase()));
    return (r2, i2) => {
      if (e2.size && e2.has(r2.family.toLowerCase())) return true;
      if (n2.size) for (let s2 of r2.srcUrls) try {
        if (n2.has(new URL(s2).host.toLowerCase())) return true;
      } catch {
      }
      if (o2.size) {
        let s2 = Ad(i2);
        if (s2 && o2.has(s2)) return true;
      }
      return false;
    };
  }
  function _d(t2) {
    if (!t2) return t2;
    let e2 = /@font-face[^{}]*\{[^}]*\}/gi, n2 = /* @__PURE__ */ new Set(), o2 = [];
    for (let i2 of t2.match(e2) || []) {
      let s2 = Lt(i2, "font-family"), a2 = zr(s2), l2 = Lt(i2, "font-weight", "400"), u2 = Lt(i2, "font-style", "normal"), c2 = Lt(i2, "font-stretch", "100%"), f2 = Lt(i2, "unicode-range"), d2 = Lt(i2, "src"), h2 = Ur(d2, location.href), m2 = h2.length ? h2.map((p2) => String(p2).toLowerCase()).sort().join("|") : d2.toLowerCase(), g2 = [String(a2 || "").toLowerCase(), l2, u2, c2, f2.toLowerCase(), m2].join("|");
      n2.has(g2) || (n2.add(g2), o2.push(i2));
    }
    if (o2.length === 0) return t2;
    let r2 = 0;
    return t2.replace(e2, () => o2[r2++] || "");
  }
  function Rd(t2) {
    let e2 = Ea.get(t2);
    return e2 === void 0 && (e2 = Ed++, Ea.set(t2, e2)), e2;
  }
  function Fd(t2, e2, n2, o2, r2, i2, s2, a2, l2) {
    let u2 = Array.from(t2 || []).sort().join("|"), c2 = 0, f2 = 0;
    for (let b2 of s2 || []) {
      let w2 = Math.imul(b2, 2654435761);
      w2 ^= w2 >>> 15, w2 = Math.imul(w2, 2246822507), w2 ^= w2 >>> 13, c2 = c2 + w2 | 0, f2++;
    }
    let d2 = e2 ? JSON.stringify({ families: (e2.families || []).map((b2) => String(b2).toLowerCase()).sort(), domains: (e2.domains || []).map((b2) => String(b2).toLowerCase()).sort(), subsets: (e2.subsets || []).map((b2) => String(b2).toLowerCase()).sort() }) : "", h2 = (n2 || []).map((b2) => `${(b2.family || "").toLowerCase()}::${b2.weight || "normal"}::${b2.style || "normal"}::${b2.stretchPct ?? 100}::${b2.src || ""}`).sort().join("|"), m2 = o2 || "", g2 = (r2 || []).map((b2) => String(b2).toLowerCase()).sort().join("|"), p2 = Rd(i2 || document), y2 = (a2 || []).map((b2) => String(b2)).sort().join("|");
    return `fonts-embed-css::req=${u2}::ex=${d2}::lf=${h2}::px=${m2}::fd=${g2}::doc=${p2}::cp=${c2}::n=${f2}::ic=${y2}::env=${l2}`;
  }
  async function Br(t2, e2, n2, o2) {
    let r2 = o2.doc?.defaultView || window;
    if (t2.disabled || t2.media?.mediaText && !r2.matchMedia(t2.media.mediaText).matches) return;
    let i2;
    try {
      i2 = t2.cssRules || [];
    } catch {
      return;
    }
    let s2 = (a2, l2) => {
      try {
        return new URL(a2, l2 || location.href).href;
      } catch {
        return a2;
      }
    };
    for (let a2 of i2) {
      if (a2.type === CSSRule.IMPORT_RULE && a2.styleSheet) {
        let l2 = a2.href ? s2(a2.href, e2) : e2;
        if (o2.depth >= yo) {
          D(o2, `Too many nested @import rules in ${l2}; stopped at ${yo} levels.`);
          continue;
        }
        if (l2 && o2.visitedSheets.has(l2)) {
          D(o2, `Skipped an @import that loops back: ${l2}`);
          continue;
        }
        l2 && o2.visitedSheets.add(l2);
        let u2 = { ...o2, depth: (o2.depth || 0) + 1 };
        await Br(a2.styleSheet, l2, n2, u2);
        continue;
      }
      if (a2.cssRules?.length) {
        if (a2.type === CSSRule.MEDIA_RULE && !r2.matchMedia(a2.conditionText).matches || a2.type === CSSRule.SUPPORTS_RULE && !r2.CSS.supports(a2.conditionText)) continue;
        await Br(a2, e2, n2, o2);
        continue;
      }
      if (a2.type === CSSRule.FONT_FACE_RULE) {
        let l2 = (a2.style.getPropertyValue("font-family") || "").trim(), u2 = zr(l2);
        if (!u2 || Ht(u2, o2.iconMatchers)) continue;
        let c2 = (a2.style.getPropertyValue("font-weight") || "").trim(), f2 = (a2.style.getPropertyValue("font-style") || "").trim(), d2 = (a2.style.getPropertyValue("font-stretch") || "").trim(), h2 = (a2.style.getPropertyValue("font-variation-settings") || "").trim(), m2 = (a2.style.getPropertyValue("src") || "").trim(), g2 = (a2.style.getPropertyValue("unicode-range") || "").trim(), p2 = c2 || "400", y2 = f2 || "normal", b2 = d2 || "100%", w2 = (f2 ? `font-style:${f2};` : "") + (c2 ? `font-weight:${c2};` : "") + (d2 ? `font-stretch:${d2};` : "") + (h2 ? `font-variation-settings:${h2};` : "") + (g2 ? `unicode-range:${g2};` : ""), S2 = o2.faceMatchesRequired(u2, y2, p2, b2);
        if (!S2 && !o2.requiredIndex.has(u2.toLowerCase())) continue;
        let v2 = Pa(g2);
        if (!Na(o2.usedCodepoints, v2)) continue;
        let C = { family: u2, weightSpec: p2, styleSpec: y2, stretchSpec: b2, unicodeRange: g2, srcRaw: m2, srcUrls: Ur(m2, e2 || location.href), href: e2 || location.href };
        if (o2.simpleExcluder && o2.simpleExcluder(C, v2)) continue;
        let M = `"${String(u2).replace(/^\s*["']|["']\s*$/g, "").replace(/(["\\])/g, "\\$1")}"`;
        if (!S2) {
          o2.provisionalFaces.push({ family: u2.toLowerCase(), block: `@font-face{font-family:${u2};src:${m2};${w2}}`, srcRaw: m2, baseHref: e2 || location.href });
          continue;
        }
        if (S2.near.length) {
          o2.nearFaces.push({ family: u2.toLowerCase(), block: `@font-face{font-family:${M};src:${m2};${w2}}`, srcRaw: m2, baseHref: e2 || location.href, near: S2.near, ranges: v2 });
          continue;
        }
        if (o2.coverExact(S2.exact, v2), o2.coveredFamilies.add(u2.toLowerCase()), /url\(/i.test(m2)) {
          let $2 = await go(m2, e2 || location.href, o2.useProxy, o2.debug);
          await n2(`@font-face{font-family:${M};src:${$2};${w2}}`);
        } else await n2(`@font-face{font-family:${M};src:${m2};${w2}}`);
      }
    }
  }
  async function La({ required: t2, usedCodepoints: e2, exclude: n2 = void 0, localFonts: o2 = [], useProxy: r2 = "", fontStylesheetDomains: i2 = [], iconMatchers: s2 = [], doc: a2 = document, debug: l2 = false } = {}) {
    t2 instanceof Set || (t2 = /* @__PURE__ */ new Set()), e2 instanceof Set || (e2 = /* @__PURE__ */ new Set());
    let u2 = /* @__PURE__ */ new Map();
    for (let x2 of t2) {
      let [_2, P, E, R] = String(x2).split(bo);
      if (!_2) continue;
      let L = _2.toLowerCase(), k = u2.get(L) || [];
      k.push({ w: parseInt(P, 10), s: E, st: parseInt(R, 10) }), u2.set(L, k);
    }
    function c2(x2, _2, P, E) {
      let R = String(x2).toLowerCase();
      if (!u2.has(R)) return null;
      let L = u2.get(R), k = bd(P), I = wd(_2), W = xd(E), T = k.min !== k.max, N = k.min, U = (V) => I.kind === "normal" && V === "normal" || I.kind !== "normal" && (V === "italic" || V === "oblique"), z = L.filter((V) => (T ? V.w >= k.min && V.w <= k.max : V.w === N) && U(mo(V.s)) && V.st >= W.min && V.st <= W.max);
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
    let f2 = _a(n2);
    je(a2), Ut();
    let d2 = Fd(t2, n2, o2, r2, i2, a2, e2, s2, je(a2));
    if (j.resource?.has(d2)) return j.resource.get(d2);
    let h2 = Cd(t2), m2 = [], g2 = $a;
    for (let x2 of a2.querySelectorAll("style")) {
      let _2 = x2.textContent || "";
      for (let P of _2.matchAll(g2)) {
        let E = (P[2] || P[4] || "").trim();
        if (!E || Dr(E, s2)) continue;
        a2.querySelector(`link[rel="stylesheet"][href="${E}"]`) || m2.push(E);
      }
    }
    let p2 = [];
    m2.length && await Promise.all(m2.map((x2) => new Promise((_2) => {
      if (a2.querySelector(`link[rel="stylesheet"][href="${x2}"]`)) return _2(null);
      let P = a2.createElement("link");
      P.rel = "stylesheet", P.href = x2, tt(P), P.setAttribute("data-snapdom", "injected-import");
      let E = setTimeout(() => _2(null), 3e3), R = (L) => {
        clearTimeout(E), _2(L);
      };
      P.onload = () => R(P), P.onerror = () => R(null), a2.head.appendChild(P), p2.push(P);
    })));
    let y2 = "", b2 = /* @__PURE__ */ new Set(), w2 = [], S2 = [], v2 = /* @__PURE__ */ new Map(), C = (x2, _2) => _2.some(([P, E]) => x2 >= P && x2 <= E), M = (x2, _2) => {
      if (_2.length) for (let P of x2) {
        let E = v2.get(P) || /* @__PURE__ */ new Set();
        for (let R of e2) C(R, _2) && E.add(R);
        v2.set(P, E);
      }
    }, $2 = Array.from(a2.querySelectorAll('link[rel="stylesheet"]')).filter((x2) => !!x2.href);
    for (let x2 of p2) try {
      x2.remove();
    } catch {
    }
    for (let x2 of $2) try {
      if (Dr(x2.href, s2)) continue;
      let _2 = "", P = false;
      try {
        P = new URL(x2.href, location.href).origin === location.origin;
      } catch {
      }
      if (!P) {
        let R = Array.isArray(i2) ? i2 : [];
        if (!vd(x2.href, h2, R)) continue;
      }
      if (P) {
        let R = Array.from(a2.styleSheets).find((L) => L.href === x2.href);
        if (R) try {
          let L = R.cssRules || [];
          _2 = Array.from(L).map((k) => k.cssText).join("");
        } catch {
        }
      }
      if (!_2) {
        let R = await ut(x2.href, { as: "text", useProxy: r2, debug: l2 });
        R?.ok && typeof R.data == "string" && (_2 = R.data);
      }
      _2 = await kd(_2, x2.href, r2, l2);
      let E = "";
      for (let R of _2.match(Md) || []) {
        let L = Lt(R, "font-family"), k = zr(L);
        if (!k || Ht(k, s2)) continue;
        let I = Lt(R, "font-weight", "400"), W = Lt(R, "font-style", "normal"), T = Lt(R, "font-stretch", "100%"), N = Lt(R, "unicode-range"), U = Lt(R, "src"), z = Ur(U, x2.href), V = c2(k, W, I, T);
        if (!V && !u2.has(k.toLowerCase())) continue;
        let B = Pa(N);
        if (!Na(e2, B)) continue;
        let rt = { family: k, weightSpec: I, styleSpec: W, stretchSpec: T, unicodeRange: N, srcRaw: U, srcUrls: z, href: x2.href };
        if (n2 && f2(rt, B)) continue;
        let at = { family: k.toLowerCase(), block: R, srcRaw: U, baseHref: x2.href };
        if (!V) {
          w2.push(at);
          continue;
        }
        if (V.near.length) {
          S2.push({ ...at, near: V.near, ranges: B });
          continue;
        }
        M(V.exact, B), b2.add(k.toLowerCase());
        let pt = /url\(/i.test(U) ? await go(R, x2.href, r2, l2) : R;
        E += pt;
      }
      E.trim() && (y2 += E);
    } catch {
      D({ debug: l2 }, "Couldn't read stylesheet:", x2.href);
    }
    let F = { doc: a2, requiredIndex: u2, usedCodepoints: e2, faceMatchesRequired: c2, coveredFamilies: b2, provisionalFaces: w2, nearFaces: S2, coverExact: M, simpleExcluder: n2 ? _a(n2) : null, useProxy: r2, iconMatchers: s2, visitedSheets: /* @__PURE__ */ new Set(), depth: 0, debug: l2 }, A = /* @__PURE__ */ new Set([...a2.styleSheets, ...a2.adoptedStyleSheets || []]);
    for (let x2 of A) if (!(x2.href && $2.some((_2) => _2.href === x2.href))) try {
      let _2 = x2.href || a2.baseURI || location.origin + "/";
      _2 && F.visitedSheets.add(_2), await Br(x2, _2, async (P) => {
        y2 += P;
      }, F);
    } catch {
    }
    for (let x2 of S2) x2.near.some((P) => {
      let E = v2.get(P);
      if (!E || !e2.size) return true;
      for (let R of e2) if (!E.has(R) && (!x2.ranges.length || C(R, x2.ranges))) return true;
      return false;
    }) && (b2.add(x2.family), y2 += /url\(/i.test(x2.srcRaw) ? await go(x2.block, x2.baseHref, r2, l2) : x2.block);
    for (let x2 of w2) b2.has(x2.family) || (y2 += /url\(/i.test(x2.srcRaw) ? await go(x2.block, x2.baseHref, r2, l2) : x2.block);
    try {
      for (let x2 of a2.fonts || []) {
        if (!x2 || !x2.family || x2.status !== "loaded" || !x2._snapdomSrc) continue;
        let _2 = String(x2.family).replace(/^['"]+|['"]+$/g, "");
        if (Ht(_2, s2) || !u2.has(_2.toLowerCase()) || n2?.families && n2.families.some((E) => String(E).toLowerCase() === _2.toLowerCase())) continue;
        let P = x2._snapdomSrc;
        if (!String(P).startsWith("data:")) if (j.resource?.has(x2._snapdomSrc)) P = j.resource.get(x2._snapdomSrc);
        else try {
          let E = await ut(x2._snapdomSrc, { as: "dataURL", useProxy: r2 });
          if (E.ok && typeof E.data == "string") P = E.data, j.resource?.set(x2._snapdomSrc, P);
          else continue;
        } catch {
          D({ debug: l2 }, "Couldn't load font file:", x2._snapdomSrc);
          continue;
        }
        y2 += `@font-face{font-family:'${_2}';src:url(${P});font-style:${x2.style || "normal"};font-weight:${x2.weight || "normal"};}`;
      }
    } catch {
    }
    for (let x2 of o2) {
      if (!x2 || typeof x2 != "object") continue;
      let _2 = String(x2.family || "").replace(/^['"]+|['"]+$/g, "");
      if (!_2 || Ht(_2, s2) || !u2.has(_2.toLowerCase()) || n2?.families && n2.families.some((I) => String(I).toLowerCase() === _2.toLowerCase())) continue;
      let P = x2.weight != null ? String(x2.weight) : "normal", E = x2.style != null ? String(x2.style) : "normal", R = x2.stretchPct != null ? `${x2.stretchPct}%` : "100%", L = String(x2.src || ""), k = L;
      if (!k.startsWith("data:")) if (j.resource?.has(L)) k = j.resource.get(L);
      else try {
        let I = await ut(L, { as: "dataURL", useProxy: r2 });
        if (I.ok && typeof I.data == "string") k = I.data, j.resource?.set(L, k);
        else continue;
      } catch {
        D({ debug: l2 }, "Couldn't load font file from localFonts:", L);
        continue;
      }
      y2 += `@font-face{font-family:'${_2}';src:url(${k});font-style:${E};font-weight:${P};font-stretch:${R};}`;
    }
    return y2 && (y2 = _d(y2), j.resource?.set(d2, y2)), y2;
  }
  function xo(t2, e2) {
    let n2 = /* @__PURE__ */ new Set(), o2 = /* @__PURE__ */ new Set();
    if (!t2) return { required: n2, usedCodepoints: o2 };
    let r2 = (c2) => {
      if (c2) for (let f2 of c2) o2.add(f2.codePointAt(0));
    }, i2 = (c2) => {
      let f2 = gd(c2.fontFamily);
      if (f2.length) for (let d2 of f2) n2.add([d2, ho(c2.fontWeight), mo(c2.fontStyle), yd(c2.fontStretch)].join(bo));
    }, s2 = fe(t2), a2 = t2.getRootNode(), l2 = (c2) => {
      i2(O(c2));
      let f2 = c2.getRootNode() === a2 ? s2 : fe(c2);
      for (let d2 of ["::before", "::after"]) {
        let h2 = d2 === "::before" ? f2.before : f2.after;
        if (h2 !== null) {
          if (h2 === "") continue;
          try {
            if (!c2.matches(h2)) continue;
          } catch {
          }
        }
        let m2 = O(c2, d2), g2 = m2 && m2.content;
        if (!(!g2 || g2 === "none" || g2 === "normal")) if (i2(m2), /^["']/.test(g2)) r2(g2.slice(1, -1));
        else {
          let p2 = g2.match(/\\[0-9A-Fa-f]{1,6}/g);
          if (p2) for (let y2 of p2) try {
            o2.add(parseInt(y2.slice(1), 16));
          } catch {
          }
        }
      }
    }, u2 = [t2];
    for (let c2 = 0; c2 < u2.length; c2++) {
      let f2 = u2[c2];
      f2.nodeType === Node.ELEMENT_NODE && l2(f2), f2.shadowRoot && u2.push(f2.shadowRoot);
      let d2 = (t2.ownerDocument || document).createTreeWalker(f2, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT, null);
      for (; d2.nextNode(); ) {
        let h2 = d2.currentNode;
        if (h2.nodeType === Node.TEXT_NODE) {
          if (e2 && h2.parentElement && !e2(h2.parentElement)) continue;
          r2(h2.nodeValue || "");
        } else {
          if (e2 && !e2(h2)) continue;
          l2(h2), h2.shadowRoot && u2.push(h2.shadowRoot);
        }
      }
    }
    return { required: n2, usedCodepoints: o2 };
  }
  async function So(t2, e2, n2 = document) {
    try {
      await wn(n2);
    } catch {
    }
    if (!t2.size) return;
    let o2 = Array.from(e2, (i2) => i2 <= 1114111 ? String.fromCodePoint(i2) : "").join(""), r2 = n2.createElement("div");
    tt(r2), r2.style.cssText = "position:absolute!important;left:-9999px!important;top:0!important;opacity:0!important;pointer-events:none!important;contain:layout size style;";
    for (let i2 of t2) {
      let [s2, a2, l2, u2] = i2.split(bo), c2 = n2.createElement("span");
      c2.textContent = o2, c2.style.fontFamily = `"${s2}"`, c2.style.fontWeight = a2, c2.style.fontStyle = l2, c2.style.fontStretch = `${u2}%`, c2.style.fontSize = "32px", c2.style.lineHeight = "1", c2.style.whiteSpace = "nowrap", c2.style.margin = "0", c2.style.padding = "0", r2.appendChild(c2);
    }
    n2.body.appendChild(r2), r2.offsetWidth, n2.body.removeChild(r2), await Ct(), await Ct();
  }
  function Da(t2) {
    return /\bcounter\s*\(|\bcounters\s*\(/.test(t2 || "");
  }
  function Ia(t2, e2 = false) {
    let n2 = "", o2 = Math.max(1, t2);
    for (; o2 > 0; ) o2--, n2 = String.fromCharCode(97 + o2 % 26) + n2, o2 = Math.floor(o2 / 26);
    return e2 ? n2.toUpperCase() : n2;
  }
  function Wa(t2, e2 = true) {
    let n2 = [[1e3, "M"], [900, "CM"], [500, "D"], [400, "CD"], [100, "C"], [90, "XC"], [50, "L"], [40, "XL"], [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"]], o2 = Math.max(1, Math.min(3999, t2)), r2 = "";
    for (let [i2, s2] of n2) for (; o2 >= i2; ) r2 += s2, o2 -= i2;
    return e2 ? r2 : r2.toLowerCase();
  }
  function Oa(t2, e2) {
    switch ((e2 || "decimal").toLowerCase()) {
      case "decimal":
        return String(t2);
      case "decimal-leading-zero": {
        let n2 = Math.abs(t2);
        return (t2 < 0 ? "-" : "") + (n2 < 10 ? "0" : "") + String(n2);
      }
      case "lower-alpha":
      case "lower-latin":
        return Ia(t2, false);
      case "upper-alpha":
      case "upper-latin":
        return Ia(t2, true);
      case "lower-roman":
        return Wa(t2, false);
      case "upper-roman":
        return Wa(t2, true);
      case "none":
        return "";
      case "disc":
        return "\u2022";
      case "circle":
        return "\u25E6";
      case "square":
        return "\u25AA";
      default:
        return String(t2);
    }
  }
  function $n(t2, e2) {
    let n2 = (t2 || "").trim().split(/[\s,]+/).filter(Boolean), o2 = [];
    for (let r2 = 0; r2 < n2.length; r2++) {
      let i2 = n2[r2];
      if (i2 === "none") continue;
      let s2 = n2[r2 + 1], a2 = s2 !== void 0 && Number.isFinite(Number(s2));
      o2.push([i2, a2 ? Number(s2) : e2]), a2 && r2++;
    }
    return o2;
  }
  function Ba(t2) {
    let e2 = /* @__PURE__ */ new WeakMap(), n2 = cr(t2) ? t2.documentElement : t2, o2 = (u2) => u2 && u2.tagName === "LI", r2 = /* @__PURE__ */ new WeakMap(), i2 = (u2) => {
      let c2 = /* @__PURE__ */ new Map();
      for (let [f2, d2] of u2) c2.set(f2, d2.slice());
      return c2;
    }, s2 = (u2, c2, f2) => {
      let d2 = i2(u2), h2;
      try {
        h2 = getComputedStyle(f2);
      } catch {
        h2 = f2.style;
      }
      let m2;
      try {
        m2 = h2?.counterReset;
      } catch {
      }
      if (m2 && m2 !== "none") for (let [y2, b2] of $n(m2, 0)) {
        let w2 = c2.get(y2);
        if (w2 && w2.length) {
          let S2 = w2.slice();
          S2.push(b2), d2.set(y2, S2);
        } else d2.set(y2, [b2]);
      }
      let g2;
      try {
        g2 = h2?.counterSet;
      } catch {
      }
      if (g2 && g2 !== "none") for (let [y2, b2] of $n(g2, 0)) {
        let w2 = d2.get(y2) || [];
        w2.length === 0 && w2.push(0), w2[w2.length - 1] = b2, d2.set(y2, w2);
      }
      let p2;
      try {
        p2 = h2?.counterIncrement;
      } catch {
      }
      if (p2 && p2 !== "none") for (let [y2, b2] of $n(p2, 1)) {
        let w2 = d2.get(y2) || [];
        w2.length === 0 && w2.push(0), w2[w2.length - 1] += b2, d2.set(y2, w2);
      }
      try {
        if (h2?.display === "list-item" && o2(f2)) {
          let y2 = f2.parentElement, b2 = y2 && r2.get(y2), w2 = y2?.tagName === "OL" ? parseInt(y2.getAttribute("start"), 10) : NaN, S2 = b2 === void 0 ? Number.isFinite(w2) ? w2 : 1 : b2 + 1, v2 = y2?.tagName === "OL" ? parseInt(f2.getAttribute("value"), 10) : NaN;
          Number.isFinite(v2) && (S2 = v2), y2 && r2.set(y2, S2);
          let C = d2.get("list-item") || [];
          C.length === 0 && C.push(0), C[C.length - 1] = S2, d2.set("list-item", C);
        }
      } catch {
      }
      return d2;
    }, a2 = (u2, c2, f2) => {
      let d2 = s2(f2, c2, u2);
      e2.set(u2, d2);
      let h2 = d2;
      for (let g2 of u2.children) h2 = a2(g2, d2, h2);
      let m2 = /* @__PURE__ */ new Map();
      for (let [g2, p2] of f2) {
        let y2 = p2.length, b2 = h2.get(g2);
        m2.set(g2, b2 && b2.length ? b2.slice(0, y2) : p2.slice());
      }
      for (let [g2, p2] of h2) !m2.has(g2) && p2.length && !c2.has(g2) && m2.set(g2, p2.slice(0, 1));
      return m2;
    }, l2 = /* @__PURE__ */ new Map();
    return a2(n2, l2, l2), { get(u2, c2) {
      let f2 = e2.get(u2)?.get(c2);
      return f2 && f2.length ? f2[f2.length - 1] : 0;
    }, getStack(u2, c2) {
      let f2 = e2.get(u2)?.get(c2);
      return f2 ? f2.slice() : [];
    } };
  }
  function za(t2, e2, n2) {
    if (!t2 || t2 === "none") return t2;
    try {
      return t2.replace($d, (o2, r2, i2) => {
        let s2 = (String(i2).match(Td) || []).map((a2) => a2.trim());
        if (r2 === "counter") {
          let a2 = s2[0]?.replace(/^["']|["']$/g, ""), l2 = (s2[1] || "decimal").toLowerCase(), u2 = n2.get(e2, a2);
          return Oa(u2, l2);
        } else {
          let a2 = s2[0]?.replace(/^["']|["']$/g, ""), l2 = s2[1]?.replace(/^["']|["']$/g, "") ?? "", u2 = (s2[2] || "decimal").toLowerCase(), c2 = n2.getStack(e2, a2);
          return c2.length ? c2.map((d2) => Oa(d2, u2)).join(l2) : "";
        }
      });
    } catch {
      return "- ";
    }
  }
  function Pd(t2, e2) {
    let n2 = Ga(t2);
    return e2 ? (e2.__pseudoPreflightFp !== n2 && (Ut(), e2.__pseudoPreflight = Ha(t2, n2), e2.__pseudoPreflightFp = n2), !!e2.__pseudoPreflight) : (Ut(), Ha(t2, n2));
  }
  function vo(t2) {
    try {
      return t2 && t2.cssRules ? t2.cssRules : null;
    } catch {
      return null;
    }
  }
  function Ga(t2) {
    let e2 = t2.querySelectorAll('style,link[rel~="stylesheet"]'), n2 = `n:${e2.length}|`, o2 = 0;
    for (let s2 = 0; s2 < e2.length; s2++) {
      let a2 = e2[s2];
      if (a2.tagName === "STYLE") {
        let l2 = a2.textContent ? a2.textContent.length : 0;
        n2 += `S${l2}|`;
        let u2 = a2.sheet, c2 = u2 ? vo(u2) : null;
        c2 && (o2 += c2.length);
      } else {
        let l2 = a2.getAttribute("href") || "", u2 = a2.getAttribute("media") || "all";
        n2 += `L${l2}|m:${u2}|`;
        let c2 = a2.sheet, f2 = c2 ? vo(c2) : null;
        f2 && (o2 += f2.length);
      }
    }
    let r2 = t2.adoptedStyleSheets, i2 = 0;
    if (Array.isArray(r2)) for (let s2 of r2) {
      let a2 = vo(s2);
      a2 && (i2 += a2.length);
    }
    return n2 += `ass:${Array.isArray(r2) ? r2.length : 0}/${i2}|tr:${o2}`, n2;
  }
  function Hr(t2, e2, n2) {
    let o2 = vo(t2);
    if (!o2) return false;
    for (let r2 = 0; r2 < o2.length; r2++) {
      if (n2.budget <= 0) return false;
      let i2 = o2[r2], s2 = i2 && i2.cssText ? i2.cssText : "";
      n2.budget--;
      for (let a2 of e2) if (s2.includes(a2)) return true;
      if (i2 && i2.styleSheet && Hr(i2.styleSheet, e2, n2)) return true;
      if (i2 && i2.cssRules && i2.cssRules.length) for (let a2 = 0; a2 < i2.cssRules.length && n2.budget > 0; a2++) {
        let l2 = i2.cssRules[a2], u2 = l2 && l2.cssText ? l2.cssText : "";
        n2.budget--;
        for (let c2 of e2) if (u2.includes(c2)) return true;
      }
      if (n2.budget <= 0) return false;
    }
    return false;
  }
  function Ha(t2 = document, e2 = Ga(t2)) {
    let n2 = Qe.get(t2);
    if (n2 && n2.fingerprint === e2) return n2.result;
    let o2 = (a2) => (a2.match(/\|ass:[^|]*/) || [""])[0];
    n2 && o2(e2) !== o2(n2.fingerprint) && Ve();
    let r2 = ["::before", "::after", "::first-letter", "::marker", "::first-line", ":before", ":after", ":first-letter", ":first-line", "counter(", "counters(", "counter-increment", "counter-reset"], i2 = t2.querySelectorAll("style");
    for (let a2 = 0; a2 < i2.length; a2++) {
      let l2 = i2[a2].textContent || "";
      for (let u2 of r2) if (l2.includes(u2)) return Qe.set(t2, { fingerprint: e2, result: true }), true;
    }
    let s2 = t2.adoptedStyleSheets;
    if (Array.isArray(s2) && s2.length) {
      let a2 = { budget: Ua };
      try {
        for (let l2 of s2) if (Hr(l2, r2, a2)) return Qe.set(t2, { fingerprint: e2, result: true }), true;
      } catch {
      }
    }
    {
      let a2 = t2.querySelectorAll('style,link[rel~="stylesheet"]'), l2 = { budget: Ua };
      for (let u2 = 0; u2 < a2.length && l2.budget > 0; u2++) {
        let c2 = a2[u2], f2 = null;
        if (c2.tagName, f2 = c2.sheet || null, f2 && Hr(f2, r2, l2)) return Qe.set(t2, { fingerprint: e2, result: true }), true;
      }
    }
    return t2.querySelector('[style*="counter("], [style*="counters("]') ? (Qe.set(t2, { fingerprint: e2, result: true }), true) : (Qe.set(t2, { fingerprint: e2, result: false }), false);
  }
  function ja(t2) {
    for (let e2 of ["Top", "Right", "Bottom", "Left"]) {
      let n2 = parseFloat(t2[`border${e2}Width`]) || 0, o2 = t2[`border${e2}Style`];
      if (n2 > 0 && o2 && o2 !== "none" && o2 !== "hidden") return true;
    }
    return false;
  }
  function Nd(t2, e2) {
    let n2 = null, o2 = () => {
      if (!n2) try {
        n2 = Ba(t2);
      } catch (r2) {
        D(e2, "Couldn't compute CSS counters; list numbers may be off.", r2), n2 = { get: () => 0, getStack: () => [] };
      }
      return n2;
    };
    return { get(r2, i2) {
      return o2().get(r2, i2);
    }, getStack(r2, i2) {
      return o2().getStack(r2, i2);
    } };
  }
  function Ld(t2) {
    let e2 = false;
    for (let n2 = 0; n2 < t2.length; n2++) {
      let o2 = t2[n2];
      if (o2 === '"') e2 = !e2;
      else if (o2 === "/" && !e2) return t2.slice(0, n2).trim();
    }
    return t2;
  }
  function Id(t2) {
    return t2.replace(/\\(?:([0-9a-fA-F]{1,6})[ \t\n]?|([\s\S]))/g, (e2, n2, o2) => {
      if (n2) {
        let r2 = parseInt(n2, 16);
        return r2 === 0 || r2 > 1114111 ? "\uFFFD" : String.fromCodePoint(r2);
      }
      return o2 === `
` ? "" : o2;
    });
  }
  function Wd(t2) {
    if (!t2) return "";
    let e2 = [], n2 = /"((?:\\[\s\S]|[^"\\])*)"|'((?:\\[\s\S]|[^'\\])*)'/g, o2 = 0, r2;
    for (; r2 = n2.exec(t2); ) {
      let s2 = t2.slice(o2, r2.index).trim();
      s2 && e2.push(s2), e2.push(Id(r2[1] !== void 0 ? r2[1] : r2[2])), o2 = n2.lastIndex;
    }
    let i2 = t2.slice(o2).trim();
    return i2 && e2.push(i2), e2.join("");
  }
  function jr(t2, e2, n2) {
    let o2 = t2.parentElement, r2 = o2 && n2 ? n2.get(o2) : null;
    return r2 ? { get(i2, s2) {
      let a2 = e2.get(i2, s2), l2 = r2.get(s2);
      return typeof l2 == "number" ? Math.max(a2, l2) : a2;
    }, getStack(i2, s2) {
      let a2 = e2.getStack(i2, s2);
      if (!a2.length) return a2;
      let l2 = r2.get(s2);
      if (typeof l2 == "number") {
        let u2 = a2.slice();
        return u2[u2.length - 1] = Math.max(u2[u2.length - 1], l2), u2;
      }
      return a2;
    } } : e2;
  }
  function Vr(t2, e2, n2) {
    let o2 = /* @__PURE__ */ new Map(), r2 = (u2, c2) => $n(u2, c2).map(([f2, d2]) => ({ name: f2, num: d2 })), i2 = r2(e2?.counterReset, 0), s2 = r2(e2?.counterSet, 0), a2 = r2(e2?.counterIncrement, 1);
    function l2(u2) {
      if (o2.has(u2)) return o2.get(u2).slice();
      let c2 = n2.getStack(t2, u2);
      c2 = c2.length ? c2.slice() : [];
      let f2 = i2.find((m2) => m2.name === u2);
      if (f2) {
        let m2 = Number.isFinite(f2.num) ? f2.num : 0;
        c2 = c2.length ? [...c2, m2] : [m2];
      }
      let d2 = s2.find((m2) => m2.name === u2);
      if (d2) {
        let m2 = Number.isFinite(d2.num) ? d2.num : 0;
        c2.length === 0 && (c2 = [0]), c2[c2.length - 1] = m2;
      }
      let h2 = a2.find((m2) => m2.name === u2);
      if (h2) {
        let m2 = Number.isFinite(h2.num) ? h2.num : 1;
        c2.length === 0 && (c2 = [0]), c2[c2.length - 1] += m2;
      }
      return o2.set(u2, c2.slice()), c2;
    }
    return { get(u2, c2) {
      let f2 = l2(c2);
      return f2.length ? f2[f2.length - 1] : 0;
    }, getStack(u2, c2) {
      return l2(c2);
    }, __incs: a2 };
  }
  function Va(t2, e2, n2, o2, r2, i2) {
    try {
      if (o2 === null) {
        if (t2.getRootNode() !== (t2.ownerDocument || document)) return;
        let f2 = O(t2).display || "";
        if (r2 === "::marker" ? !f2.includes("list-item") : !(f2 === "block" || f2 === "flow-root" || f2 === "list-item" || f2 === "inline-block" || f2 === "table-cell" || f2 === "table-caption")) return;
      } else if (!t2.matches(o2)) return;
      if (r2 === "::marker" && !(O(t2).display || "").includes("list-item")) return;
      let s2 = O(t2, r2), a2 = O(t2);
      if (!s2) return;
      let l2 = "";
      for (let f2 of i2) {
        let d2 = s2.getPropertyValue(f2);
        d2 && d2 !== a2.getPropertyValue(f2) && !(f2 === "background-color" && d2 === "rgba(0, 0, 0, 0)") && !(f2 === "vertical-align" && d2 === "baseline") && (l2 += `${f2}:${d2};`);
      }
      if (r2 === "::marker") {
        let f2 = s2.getPropertyValue("content");
        f2 && f2 !== "normal" && f2 !== "none" && (l2 += `content:${f2};`);
      }
      if (!l2) return;
      let c2 = `data-sd-p${n2.__pseudoRuleSeq = (n2.__pseudoRuleSeq || 0) + 1}`;
      e2.setAttribute(c2, ""), n2.__pseudoCSS = (n2.__pseudoCSS || "") + `[${c2}]${r2}{${l2}}`;
    } catch {
    }
  }
  function Bd(t2, e2) {
    if (!/\b(?:no-)?(?:open|close)-quote\b/.test(t2)) return t2;
    let n2 = "\u201C", o2 = "\u201D";
    try {
      let r2 = O(e2).quotes;
      if (r2 === "none") n2 = "", o2 = "";
      else if (r2 && r2 !== "auto") {
        let i2 = r2.match(/"[^"]*"|'[^']*'/g);
        i2 && i2.length >= 2 && (n2 = i2[0].slice(1, -1), o2 = i2[1].slice(1, -1));
      }
    } catch {
    }
    return n2 = n2.replace(/"/g, ""), o2 = o2.replace(/"/g, ""), t2.replace(/"[^"]*"|\b(no-open-quote|no-close-quote|open-quote|close-quote)\b/g, (r2, i2) => i2 ? i2 === "open-quote" ? `"${n2}"` : i2 === "close-quote" ? `"${o2}"` : '""' : r2);
  }
  function zd(t2, e2, n2, o2) {
    let r2;
    try {
      r2 = O(t2, e2);
    } catch {
    }
    let i2 = r2?.content;
    if (!i2 || i2 === "none" || i2 === "normal") return { text: "", incs: [] };
    i2 = Ld(i2), i2 = Bd(i2, t2);
    let s2 = jr(t2, n2, o2), a2 = Vr(t2, r2, s2), l2 = Da(i2) ? za(i2, t2, a2) : i2;
    return { text: Wd(l2), incs: a2.__incs || [] };
  }
  function Ud(t2, e2) {
    if (e2.__shadowPseudo) return false;
    let n2 = fe(t2), o2 = [];
    for (let i2 of ["before", "after", "firstLetter", "marker", "firstLine"]) {
      let s2 = n2[i2];
      if (s2 === null) return false;
      s2 && o2.push(s2);
    }
    if (!o2.length) return true;
    let r2 = o2.join(",");
    try {
      return !t2.matches(r2) && t2.querySelector(r2) === null;
    } catch {
      return false;
    }
  }
  async function Ze(t2, e2, n2, o2, r2 = false) {
    if (t2?.nodeType !== 1 || e2?.nodeType !== 1 || (n2.slicer?.due() && await n2.slicer.pause(), t2.tagName === "TEXTAREA")) return;
    let i2 = t2.ownerDocument || document;
    if (!r2 && !Pd(i2, n2) && !n2.__shadowPseudo || !r2 && Ud(t2, n2)) return;
    n2.__siblingCounters || (n2.__siblingCounters = /* @__PURE__ */ new WeakMap()), n2.__counterCtx || (n2.__counterCtx = Nd(t2.ownerDocument || document, n2));
    let s2 = n2.__counterCtx, a2 = fe(t2);
    a2.marker !== "" && Va(t2, e2, n2, a2.marker, "::marker", Od), a2.firstLine !== "" && Va(t2, e2, n2, a2.firstLine, "::first-line", Dd);
    for (let u2 of ["::before", "::after", "::first-letter"]) {
      let c2 = a2[u2 === "::before" ? "before" : u2 === "::after" ? "after" : "firstLetter"];
      if (c2 !== null) {
        if (c2 === "") continue;
        try {
          if (!t2.matches(c2)) continue;
        } catch {
        }
      }
      try {
        let f2 = O(t2, u2);
        if (!f2 || f2.content === "none" && f2.backgroundImage === "none" && (f2.backgroundColor === "transparent" || f2.backgroundColor === "rgba(0, 0, 0, 0)") && !ja(f2) && (!f2.transform || f2.transform === "none") && f2.display === "inline") continue;
        if (f2.display === "none" || u2 !== "::first-letter" && (f2.content === "none" || f2.content === "normal")) {
          u2 === "::before" && (e2.dataset.snapdomHasBefore = "1"), u2 === "::after" && (e2.dataset.snapdomHasAfter = "1");
          continue;
        }
        if (u2 === "::first-letter") {
          let q = O(t2), X = (q?.display || "").toLowerCase();
          if (X.includes("flex") || X.includes("grid")) continue;
          let G = (Gt) => f2[Gt] !== q[Gt] && (parseFloat(f2[Gt]) || 0) !== 0;
          if (!(f2.color !== q.color || f2.fontSize !== q.fontSize || f2.fontWeight !== q.fontWeight || f2.fontFamily !== q.fontFamily || f2.fontStyle !== q.fontStyle || f2.textTransform !== q.textTransform || f2.float !== q.float && f2.float !== "none" || G("paddingTop") || G("paddingRight") || G("paddingBottom") || G("paddingLeft") || G("marginTop") || G("marginRight") || G("marginBottom") || G("marginLeft"))) continue;
          let Z = Array.from(e2.childNodes).find((Gt) => Gt.nodeType === Node.TEXT_NODE && Gt.textContent?.trim().length > 0);
          if (!Z) continue;
          let zn = Z.textContent, lt = /^\s*/.exec(zn)[0], dn = zn.slice(lt.length), $t = dn.match(/^([^\p{L}\p{N}\s]*[\p{L}\p{N}](?:['’])?)/u)?.[0], Te = dn.slice($t?.length || 0);
          if (!$t || /[\uD800-\uDFFF]/.test($t)) continue;
          let Vt = document.createElement("span");
          Vt.textContent = $t, Vt.dataset.snapdomPseudo = "::first-letter";
          let me = De(f2, Qn(t2, n2)), Pe = Oe(me, "span");
          n2.styleMap.set(Vt, Pe);
          let Ne = document.createTextNode(Te);
          e2.replaceChild(Ne, Z), e2.insertBefore(Vt, Ne), lt && e2.insertBefore(document.createTextNode(lt), Vt);
          continue;
        }
        let m2 = f2.content ?? "", g2 = m2 === "" || m2 === "none" || m2 === "normal", { text: p2, incs: y2 } = zd(t2, u2, s2, n2.__siblingCounters), b2 = f2.backgroundImage, w2 = f2.backgroundColor, S2 = f2.fontFamily, v2 = parseInt(f2.fontSize) || 32, C = parseInt(f2.fontWeight) || false, M = f2.fontStyle || "normal", $2 = f2.color || "#000", F = f2.transform, A = Ht(S2, o2?.__iconMatchers), x2 = !g2 && p2 !== "", _2 = b2 && b2 !== "none", P = w2 && w2 !== "transparent" && w2 !== "rgba(0, 0, 0, 0)", E = ja(f2), R = F && F !== "none", L = m2 !== "none" && m2 !== "normal", k = /^inline-/.test(f2.display || ""), I = L && ((parseFloat(f2.width) || 0) > 0 || (parseFloat(f2.height) || 0) > 0 || k), W = L && f2.boxShadow && f2.boxShadow !== "none", T = L && f2.outlineStyle && f2.outlineStyle !== "none" && (parseFloat(f2.outlineWidth) || 0) > 0;
        if (!(x2 || _2 || P || E || R || I || W || T)) {
          if (y2 && y2.length && t2.parentElement) {
            let q = n2.__siblingCounters.get(t2.parentElement) || /* @__PURE__ */ new Map();
            for (let { name: X } of y2) {
              if (!X) continue;
              let G = jr(t2, s2, n2.__siblingCounters), Z = Vr(t2, O(t2, u2), G).get(t2, X);
              q.set(X, Z);
            }
            n2.__siblingCounters.set(t2.parentElement, q);
          }
          continue;
        }
        let U = p2.startsWith("url(") || /^-?(?:webkit-)?image-set\(/i.test(p2), z = f2.display === "inline" && f2.cssFloat === "none" && f2.position !== "absolute" && f2.position !== "fixed", V = false;
        if (x2 && !A && p2.length > 1 && !U && z) {
          let q = O(t2), X = parseFloat(q.fontSize) || 16, G = parseFloat(q.lineHeight);
          Number.isFinite(G) || (G = X * 1.5), t2.getBoundingClientRect().height < G * 1.6 && (e2.style.whiteSpace = "nowrap", V = true);
        }
        let B = document.createElement("span");
        B.dataset.snapdomPseudo = u2, B.style.pointerEvents = "none", V ? B.style.whiteSpace = "nowrap" : e2.style.getPropertyValue(Ue) === "nowrap" && B.style.setProperty(Ue, "nowrap");
        let rt = Ls(t2, u2, f2, n2, o2), at = (O(t2).display || "").toLowerCase(), pt = at.includes("flex") || at.includes("grid");
        if (pt) {
          let q = rt["min-width"];
          (!q || q === "auto" || q === "0px") && (rt["min-width"] = "0px");
        }
        let St = x2;
        St && !z && parseFloat(f2.height) >= 1.5 * (parseFloat(f2.lineHeight) || (parseFloat(f2.fontSize) || 16) * 1.2) && (St = false, B.style.whiteSpace = f2.whiteSpace);
        let ee = Oe(rt, "span", St, pt);
        if (n2.styleMap.set(B, ee), A && p2 && p2.length === 1) {
          let { dataUrl: q, height: X, advance: G, descent: ht } = await Ra(p2, S2, C, v2, $2, M), Z = document.createElement("img");
          Z.src = q, Z.style = `height:${v2}px;width:${G / X * v2}px;object-fit:contain;vertical-align:${-ht}px;`, B.appendChild(Z);
        } else if (p2 && U) {
          let q = hn(p2, typeof devicePixelRatio < "u" && devicePixelRatio || 1) ?? ge(p2);
          if (q?.trim()) try {
            let X = await ut(ie(q), { as: "dataURL", useProxy: o2.useProxy, debug: o2.debug });
            if (X?.ok && typeof X.data == "string") {
              let G = document.createElement("img");
              G.src = X.data, G.style = `width:${v2}px;height:auto;object-fit:contain;`, B.appendChild(G);
            }
          } catch (X) {
            D(o2, `Couldn't draw the ${u2} icon of`, [t2, X]);
          }
        } else !A && x2 && (B.textContent = p2);
        B.style.backgroundImage = "none", "maskImage" in B.style && (B.style.maskImage = "none"), "webkitMaskImage" in B.style && (B.style.webkitMaskImage = "none");
        try {
          B.style.backgroundRepeat = f2.backgroundRepeat, B.style.backgroundSize = f2.backgroundSize, f2.backgroundPositionX && f2.backgroundPositionY ? (B.style.backgroundPositionX = f2.backgroundPositionX, B.style.backgroundPositionY = f2.backgroundPositionY) : B.style.backgroundPosition = f2.backgroundPosition, B.style.backgroundOrigin = f2.backgroundOrigin, B.style.backgroundClip = f2.backgroundClip, B.style.backgroundAttachment = f2.backgroundAttachment, B.style.backgroundBlendMode = f2.backgroundBlendMode;
        } catch {
        }
        if (_2) try {
          let q = se(b2), X = await Promise.all(q.map((G) => Ie(G, o2)));
          B.style.backgroundImage = X.join(", ");
        } catch (q) {
          D(o2, `Couldn't load the ${u2} background image.`, q);
        }
        P && (B.style.backgroundColor = w2);
        let yt = f2.maskImage || f2.webkitMaskImage;
        if (yt && yt !== "none") try {
          let X = (await Promise.all(se(yt).map((G) => Ie(G, o2)))).join(", ");
          B.style.maskImage = X, B.style.webkitMaskImage = X;
          for (let G of ["maskSize", "maskRepeat", "maskPosition", "maskMode", "maskComposite", "maskOrigin", "maskClip"]) f2[G] && (B.style[G] = f2[G]);
        } catch (q) {
          D(o2, `Couldn't load the ${u2} mask image.`, q);
        }
        let $e = B.childNodes.length > 0 || B.textContent?.trim() !== "" || _2 || P || E || R || I || W || T;
        if (y2 && y2.length && t2.parentElement) {
          let q = n2.__siblingCounters.get(t2.parentElement) || /* @__PURE__ */ new Map(), X = jr(t2, s2, n2.__siblingCounters), G = Vr(t2, O(t2, u2), X);
          for (let { name: ht } of y2) {
            if (!ht) continue;
            let Z = G.get(t2, ht);
            q.set(ht, Z);
          }
          n2.__siblingCounters.set(t2.parentElement, q);
        }
        if (!$e) continue;
        u2 === "::before" ? (e2.dataset.snapdomHasBefore = "1", e2.insertBefore(B, e2.firstChild)) : (e2.dataset.snapdomHasAfter = "1", e2.appendChild(B));
      } catch (f2) {
        nt(o2.__session, "pseudo-failed", `${u2} could not be copied`, t2), D(o2, `Couldn't copy the ${u2} of`, [t2, f2]);
      }
    }
    let l2 = Array.from(e2.children).filter((u2) => !u2.dataset.snapdomPseudo);
    if (n2.nodeMap) for (let u2 of l2) {
      let c2 = n2.nodeMap.get(u2);
      c2?.nodeType === 1 && await Ze(c2, u2, n2, o2, true);
    }
    else {
      let u2 = Array.from(t2.children);
      for (let c2 = 0; c2 < Math.min(u2.length, l2.length); c2++) await Ze(u2[c2], l2[c2], n2, o2, true);
    }
  }
  function Xa(t2) {
    for (let [e2, n2] of t2) try {
      jd(e2, n2);
    } catch {
    }
  }
  function jd(t2, e2) {
    let n2 = t2.ownerDocument.defaultView, o2 = n2.getComputedStyle(t2), r2 = [...t2.getClientRects()];
    if (!r2.length) return;
    let i2 = r2[0].left + parseFloat(o2.borderLeftWidth), s2 = r2[0].top + parseFloat(o2.borderTopWidth), a2;
    if (o2.display === "inline") {
      let y2 = r2.reduce((w2, S2) => w2 + S2.width, 0), b2 = 0;
      a2 = r2.map((w2) => {
        let S2 = { x: w2.left - i2 - b2, y: w2.top - s2, w: y2, h: w2.height, top: w2.top, bottom: w2.bottom };
        return b2 += w2.width, S2;
      });
    } else {
      let y2 = t2.clientWidth || r2[0].width, b2 = t2.clientHeight || r2[0].height;
      a2 = [{ x: 0, y: 0, w: y2, h: b2, top: -1 / 0, bottom: 1 / 0 }];
    }
    let l2 = e2.ownerDocument, u2 = `sd-bct-${Math.random().toString(36).slice(2, 9)}`, c2 = Hd.map((y2) => `${y2}:${o2.getPropertyValue(y2)}`).join(";").replace(/"/g, "'"), f2 = "";
    a2.forEach((y2, b2) => {
      let w2 = `<svg xmlns="${qa}" width="${y2.w}" height="${y2.h}"><foreignObject width="100%" height="100%"><div xmlns="http://www.w3.org/1999/xhtml" style="width:${y2.w}px;height:${y2.h}px;${c2}"></div></foreignObject></svg>`;
      f2 += `<pattern id="${u2}-${b2}" patternUnits="userSpaceOnUse" x="${y2.x}" y="${y2.y}" width="${y2.w}" height="${y2.h}"><image width="${y2.w}" height="${y2.h}" preserveAspectRatio="none" href="data:image/svg+xml;charset=utf-8,${encodeURIComponent(w2)}"/></pattern>`;
    });
    let d2 = "", h2 = l2.createElement("canvas").getContext("2d"), m2 = t2.ownerDocument.createTreeWalker(t2, NodeFilter.SHOW_TEXT), g2 = t2.ownerDocument.createRange();
    for (let y2 = m2.nextNode(); y2; y2 = m2.nextNode()) {
      let b2 = n2.getComputedStyle(y2.parentElement);
      h2.font = b2.font;
      let w2 = h2.measureText("X").fontBoundingBoxAscent;
      if (!Number.isFinite(w2)) return;
      let S2 = b2.font.replace(/"/g, "'"), v2 = a2.map(() => ({ xs: [], ys: [], chars: "" })), C = y2.data;
      for (let M = 0; M < C.length; M++) {
        let $2 = C.charCodeAt(M) >= 55296 && C.charCodeAt(M) <= 56319 ? 2 : 1;
        g2.setStart(y2, M), g2.setEnd(y2, M + $2);
        let F = g2.getClientRects()[0], A = C.slice(M, M + $2);
        if (M += $2 - 1, !F || !A.trim()) continue;
        let x2 = (F.top + F.bottom) / 2, _2 = a2.findIndex((P) => x2 >= P.top && x2 <= P.bottom);
        _2 < 0 && (_2 = 0), v2[_2].xs.push(+(F.left - i2).toFixed(2)), v2[_2].ys.push(+(F.top - s2 + w2).toFixed(2)), v2[_2].chars += A;
      }
      v2.forEach((M, $2) => {
        if (!M.chars) return;
        let F = M.chars.replace(/&/g, "&amp;").replace(/</g, "&lt;");
        d2 += `<text x="${M.xs.join(" ")}" y="${M.ys.join(" ")}" fill="url(#${u2}-${$2})" style="font:${S2};font-kerning:none;letter-spacing:0;white-space:pre">${F}</text>`;
      });
    }
    if (!d2) return;
    let p2 = l2.createElementNS(qa, "svg");
    p2.setAttribute("style", "position:absolute;left:0;top:0;width:1px;height:1px;overflow:visible;pointer-events:none"), p2.innerHTML = `<defs>${f2}</defs>${d2}`, o2.position === "static" && e2.style.setProperty("position", "relative", "important"), e2.style.setProperty("color", "transparent", "important"), e2.style.setProperty("-webkit-text-fill-color", "transparent", "important"), e2.insertBefore(p2, e2.firstChild);
  }
  function Ya(t2, e2, n2) {
    if (!t2 || t2?.nodeType !== 1) return;
    let o2 = t2.ownerDocument || document, r2 = e2 || o2, i2 = Nt(t2) && t2.localName === "svg" ? [t2] : Array.from(t2.querySelectorAll("svg")), s2 = /url\(\s*["']?\s*#([^)"']+)/g, a2 = ["fill", "stroke", "filter", "clip-path", "mask", "marker", "marker-start", "marker-mid", "marker-end"], l2 = (C) => window.CSS && CSS.escape ? CSS.escape(C) : C.replace(/[^a-zA-Z0-9_-]/g, "\\$&"), u2 = "http://www.w3.org/1999/xlink", c2 = (C) => {
      if (!C || !C.getAttribute) return null;
      let M = C.getAttribute("href") || C.getAttribute("xlink:href") || (typeof C.getAttributeNS == "function" ? C.getAttributeNS(u2, "href") : null);
      if (M) return M;
      let $2 = C.attributes;
      if (!$2) return null;
      for (let F = 0; F < $2.length; F++) {
        let A = $2[F];
        if (!A || !A.name) continue;
        if (A.name === "href") return A.value;
        let x2 = A.name.indexOf(":");
        if (x2 !== -1 && A.name.slice(x2 + 1) === "href") return A.value;
      }
      return null;
    }, f2 = new Set(Array.from(t2.querySelectorAll("[id]")).map((C) => C.id)), d2 = /* @__PURE__ */ new Set(), h2 = false, m2 = (C, M = null) => {
      if (!C) return;
      s2.lastIndex = 0;
      let $2;
      for (; $2 = s2.exec(C); ) {
        h2 = true;
        let F = ($2[1] || "").trim();
        F && (f2.has(F) || (d2.add(F), M && !M.has(F) && M.add(F)));
      }
    }, g2 = (C) => {
      let M = C.querySelectorAll("use");
      for (let A of M) {
        let x2 = c2(A);
        if (!x2 || !x2.startsWith("#")) continue;
        h2 = true;
        let _2 = x2.slice(1).trim();
        _2 && !f2.has(_2) && d2.add(_2);
      }
      let $2 = '*[style*="url("],*[fill^="url("], *[stroke^="url("],*[filter^="url("],*[clip-path^="url("],*[mask^="url("],*[marker^="url("],*[marker-start^="url("],*[marker-mid^="url("],*[marker-end^="url("]';
      m2(C.getAttribute("style") || "");
      for (let A of a2) m2(C.getAttribute(A));
      let F = C.querySelectorAll($2);
      for (let A of F) {
        m2(A.getAttribute("style") || "");
        for (let x2 of a2) m2(A.getAttribute(x2));
      }
    }, p2 = (C) => {
      if (!C || C.nodeType !== 1 || !C.querySelectorAll) return;
      let M = "filter[id],clipPath[id],mask[id],linearGradient[id],radialGradient[id],pattern[id]", $2 = false;
      try {
        $2 = !!(r2.querySelector && r2.querySelector(M));
      } catch {
        return;
      }
      if (!$2) return;
      let F = ["filter", "clipPath", "mask", "maskImage", "webkitMaskImage"], A = (x2) => {
        if (Nt(x2)) return;
        let _2;
        try {
          _2 = getComputedStyle(x2);
        } catch {
          return;
        }
        for (let P of F) {
          let E = _2[P];
          E && E.includes("url(") && m2(E);
        }
      };
      A(C);
      for (let x2 of C.querySelectorAll("*")) A(x2);
    };
    for (let C of i2) g2(C);
    if (p2(n2), !h2) return;
    let y2 = t2.querySelector("svg.inline-defs-container");
    y2 || (y2 = o2.createElementNS("http://www.w3.org/2000/svg", "svg"), y2.classList.add("inline-defs-container"), y2.setAttribute("aria-hidden", "true"), y2.setAttribute("style", "position:absolute;width:0;height:0;overflow:hidden"), t2.insertBefore(y2, t2.firstChild || null));
    let b2 = y2.querySelector("defs") || null, w2 = (C) => {
      if (!C || f2.has(C)) return null;
      let M = l2(C), $2 = (F) => {
        let A = r2.querySelector(F);
        return A && !t2.contains(A) ? A : null;
      };
      return $2(`svg defs > *#${M}`) || $2(`svg > symbol#${M}`) || $2(`*#${M}`);
    };
    if (!d2.size) return;
    let S2 = new Set(d2), v2 = /* @__PURE__ */ new Set();
    for (; S2.size; ) {
      let C = S2.values().next().value;
      if (S2.delete(C), !C || f2.has(C) || v2.has(C)) continue;
      let M = w2(C);
      if (!M) {
        v2.add(C);
        continue;
      }
      b2 || (b2 = o2.createElementNS("http://www.w3.org/2000/svg", "defs"), y2.appendChild(b2));
      let $2 = M.cloneNode(true);
      $2.id || $2.setAttribute("id", C), b2.appendChild($2), v2.add(C), f2.add(C);
      let F = [$2, ...$2.querySelectorAll("*")];
      for (let A of F) {
        let x2 = c2(A);
        if (x2 && x2.startsWith("#")) {
          let P = x2.slice(1).trim();
          P && !f2.has(P) && !v2.has(P) && S2.add(P);
        }
        let _2 = A.getAttribute?.("style") || "";
        _2 && m2(_2, S2);
        for (let P of a2) {
          let E = A.getAttribute?.(P);
          E && m2(E, S2);
        }
      }
    }
  }
  function Co(t2, e2, n2) {
    let o2 = n2.get(t2), r2 = t2.style;
    if (!o2) {
      let s2 = r2.cssText, a2 = t2.hasAttribute("style");
      o2 = { users: 0, saved: e2.map(([u2, c2]) => {
        let f2 = { property: u2, value: r2.getPropertyValue(u2), priority: r2.getPropertyPriority(u2) };
        return r2.setProperty(u2, c2, "important"), f2.forcedValue = r2.getPropertyValue(u2), f2;
      }), originalCSS: s2, forcedCSS: r2.cssText, hadStyle: a2 }, n2.set(t2, o2);
    }
    o2.users++;
    let i2 = false;
    return () => {
      if (!i2 && (i2 = true, !--o2.users)) {
        if (n2.delete(t2), r2.cssText === o2.forcedCSS) r2.cssText = o2.originalCSS;
        else for (let s2 of o2.saved) r2.getPropertyValue(s2.property) !== s2.forcedValue || r2.getPropertyPriority(s2.property) !== "important" || (s2.value ? r2.setProperty(s2.property, s2.value, s2.priority) : r2.removeProperty(s2.property));
        !o2.hadStyle && !r2.length && (t2.getAttribute("style"), t2.removeAttribute("style"));
      }
    };
  }
  function Ka(t2) {
    if (Gr.has(t2)) return Co(t2, [], Gr);
    let e2 = getComputedStyle(t2), n2 = e2.outlineStyle, o2 = e2.outlineWidth, r2 = n2 !== "none" && parseFloat(o2) > 0, i2 = parseFloat(e2.borderTopWidth) === 0 && parseFloat(e2.borderRightWidth) === 0 && parseFloat(e2.borderBottomWidth) === 0 && parseFloat(e2.borderLeftWidth) === 0;
    if (r2 && i2) {
      let s2 = [];
      for (let a2 of ["top", "right", "bottom", "left"]) s2.push([`border-${a2}-width`, o2], [`border-${a2}-style`, "solid"], [`border-${a2}-color`, "transparent"]);
      return Co(t2, s2, Gr);
    }
    return () => {
    };
  }
  function ko(t2, e2 = null) {
    let n2 = [], o2 = (r2) => {
      if (!Pt(r2)) return;
      if (qr.has(r2)) {
        n2.push(Co(r2, [], qr));
        return;
      }
      let i2 = getComputedStyle(r2);
      (i2.contentVisibility || i2.getPropertyValue("content-visibility") || "") === "auto" && n2.push(Co(r2, [["content-visibility", "visible"]], qr));
    };
    try {
      if (e2) {
        let i2 = (s2) => {
          let a2;
          try {
            a2 = s2.getBoundingClientRect();
          } catch {
            return;
          }
          if (!((a2.width > 0 || a2.height > 0) && (a2.right < e2.left - 200 || a2.left > e2.right + 200 || a2.bottom < e2.top - 200 || a2.top > e2.bottom + 200))) {
            o2(s2);
            for (let l2 = s2.firstElementChild; l2; l2 = l2.nextElementSibling) i2(l2);
          }
        };
        i2(t2);
      } else {
        for (let r2 of t2.querySelectorAll("*")) o2(r2);
        o2(t2);
      }
    } catch {
    }
    return () => {
      for (let r2 of n2) try {
        r2();
      } catch {
      }
    };
  }
  async function pl(t2, e2 = {}) {
    Ut(), eo(t2.ownerDocument || document);
    let n2 = e2.__session || { styleMap: /* @__PURE__ */ new Map(), styleCache: /* @__PURE__ */ new WeakMap(), nodeMap: /* @__PURE__ */ new Map() }, o2 = { styleMap: n2.styleMap, styleCache: n2.styleCache, nodeMap: n2.nodeMap, options: e2, slicer: e2.__slicer || null }, r2 = null, i2 = null, s2 = null;
    if (e2.clip && (i2 = Mo(t2, e2.clip), i2 && (o2.clip = { rect: i2, root: t2 })), e2.captureSelection) try {
      o2.selection = ca(t2);
    } catch (p2) {
      D(o2, "Couldn't read the text selection.", p2);
    }
    let a2, l2 = "", u2 = "";
    if (Eo.size) {
      let p2 = (y2, b2) => {
        for (let w2 = b2; w2; w2 = w2.assignedSlot || w2.parentElement || Bt(w2)) if (w2 === y2) return true;
        return false;
      };
      for (; ; ) {
        let y2 = [...Eo].filter(({ root: b2 }) => p2(b2, t2) || p2(t2, b2)).map(({ promise: b2 }) => b2.catch(() => {
        }));
        if (!y2.length) break;
        await Promise.all(y2);
      }
    }
    if (!o2.clip && t2.isConnected && t2.ownerDocument?.visibilityState !== "hidden") try {
      let p2 = t2.getBoundingClientRect(), y2 = t2.ownerDocument?.defaultView || window, b2 = p2.right <= 0 || p2.bottom <= 0 || p2.left >= y2.innerWidth || p2.top >= y2.innerHeight, w2 = [];
      if (b2 && (() => {
        let v2 = [];
        t2.shadowRoot && v2.push(t2.shadowRoot);
        for (let C of t2.querySelectorAll("*")) C.shadowRoot && v2.push(C.shadowRoot);
        for (; v2.length; ) {
          let C = v2.pop(), M = C.host?.localName === "calcite-icon";
          for (let $2 of C.querySelectorAll("*")) {
            if ($2.shadowRoot && v2.push($2.shadowRoot), !M || $2.localName !== "svg") continue;
            let F = $2.querySelectorAll("path");
            if (!F.length || [...F].some((x2) => x2.getAttribute("d")?.trim())) continue;
            let A = $2.getBoundingClientRect();
            A.width && A.height && w2.push($2);
          }
        }
      })(), w2.length) {
        let v2 = (async () => {
          let M = t2.style, $2 = t2.hasAttribute("style"), F = /* @__PURE__ */ new Map(), A = (x2, _2) => {
            F.has(x2) || F.set(x2, { value: M.getPropertyValue(x2), priority: M.getPropertyPriority(x2) }), M.setProperty(x2, _2, "important");
            let P = F.get(x2);
            P.forcedValue = M.getPropertyValue(x2), P.forcedPriority = M.getPropertyPriority(x2);
          };
          try {
            A("left", "0"), A("top", "0"), A("right", "auto"), A("bottom", "auto"), A("margin-top", "0"), A("margin-right", "0"), A("margin-bottom", "0"), A("margin-left", "0"), A("transform", "none"), A("translate", "none"), A("opacity", "0"), A("pointer-events", "none");
            let x2 = t2.getBoundingClientRect();
            if (x2.right <= 0 || x2.bottom <= 0 || x2.left >= y2.innerWidth || x2.top >= y2.innerHeight) {
              let E = t2.parentElement?.getBoundingClientRect(), R = E && E.right > 0 && E.left < y2.innerWidth ? Math.max(0, E.left) : 0, L = E && E.bottom > 0 && E.top < y2.innerHeight ? Math.max(0, E.top) : 0;
              A("position", "fixed"), A("left", `${R}px`), A("top", `${L}px`);
            }
            await Ct(100);
            let _2 = Date.now() + 1500, P = () => w2.some((E) => {
              if ([...E.querySelectorAll("path")].some((L) => L.getAttribute("d")?.trim())) return false;
              let R = E.getBoundingClientRect();
              return R.width && R.height && R.right > 0 && R.bottom > 0 && R.left < y2.innerWidth && R.top < y2.innerHeight;
            });
            for (; Date.now() < _2 && P(); ) await new Promise((E) => setTimeout(E, 25));
            await Ct(100);
          } finally {
            for (let [x2, _2] of F) M.getPropertyValue(x2) !== _2.forcedValue || M.getPropertyPriority(x2) !== _2.forcedPriority || (_2.value ? M.setProperty(x2, _2.value, _2.priority) : M.removeProperty(x2));
            !$2 && !M.length && t2.removeAttribute("style"), await Ct(100);
          }
        })(), C = { root: t2, promise: v2 };
        Eo.add(C);
        try {
          await v2;
        } finally {
          Eo.delete(C);
        }
      }
    } catch {
    }
    let c2 = Ka(t2), f2 = ko(t2, i2);
    if (i2) {
      let p2 = t2.getBoundingClientRect(), y2 = t2.offsetWidth || p2.width, b2 = t2.offsetHeight || p2.height, w2 = p2.width && Math.abs(y2 - p2.width) >= 1 ? y2 / p2.width : 1, S2 = p2.height && Math.abs(b2 - p2.height) >= 1 ? b2 / p2.height : 1;
      r2 = { x: (i2.left - p2.left) * w2, y: (i2.top - p2.top) * S2, width: i2.width * w2, height: i2.height * S2 };
    }
    try {
      a2 = await ue(t2, o2, e2), s2 = va(a2, o2, e2);
    } catch (p2) {
      throw D(o2, "Capture failed while copying the element.", p2), p2;
    } finally {
      f2(), c2();
    }
    aa(o2.nodeMap, t2.ownerDocument || document), o2.slicer?.due() && await o2.slicer.pause();
    try {
      Ya(a2, void 0, t2);
    } catch (p2) {
      nt(n2, "svg-defs-failed", "external <use> references failed to inline", p2), D(o2, "Couldn't copy external SVG icons; some may be missing.", p2);
    }
    try {
      await Ze(t2, a2, o2, e2);
    } catch (p2) {
      nt(n2, "pseudo-failed", "::before/::after pass failed", p2), D(o2, "Couldn't copy ::before/::after content; some decorations may be missing.", p2);
    }
    o2.bgClipText && Xa(o2.bgClipText), await io(a2, o2);
    for (let [p2, y2] of o2.nodeMap.entries()) if (y2?.tagName === "STYLE" && p2?.tagName === "STYLE" && !p2.hasAttribute("data-sd")) try {
      let b2 = y2.sheet && y2.sheet.cssRules;
      b2 && /@media/i.test(p2.textContent || "") && (p2.textContent = Ce(b2));
    } catch {
    }
    try {
      let p2 = a2.querySelectorAll("style[data-sd]");
      for (let y2 of p2) u2 += y2.textContent || "", y2.remove();
    } catch (p2) {
      D(o2, "Couldn't copy shadow DOM styles.", p2);
    }
    o2.slicer?.due() && await o2.slicer.pause();
    let d2 = yn(o2.styleMap);
    l2 = Array.from(d2.entries()).map(([p2, y2]) => `.${y2}{${p2}}`).join("");
    let m2 = u2 + "[data-snapdom-has-after]::after,[data-snapdom-has-before]::before{content:none!important;display:none!important}" + (o2.__usesPlaceholder ? hp : "") + (o2.__pseudoCSS || "");
    l2 = m2 + l2;
    for (let [p2, y2] of o2.styleMap.entries()) ai(p2, y2, d2);
    try {
      mp(t2, a2, o2.nodeMap);
    } catch (p2) {
      D(o2, "Couldn't bring an open dialog or popover into the capture.", p2);
    }
    if ((o2.clip || t2.scrollTop || t2.scrollLeft) && a2?.nodeType === 1) try {
      let p2 = o2.clip && r2 ? { x: r2.x, y: r2.y } : { x: 0, y: 0 };
      il(t2, a2, o2.nodeMap, o2.styleCache, p2);
    } catch (p2) {
      D(o2, "Couldn't keep fixed-position elements in place.", p2);
    }
    for (let [p2, y2] of o2.nodeMap.entries()) o2.clip && y2 === t2 && t2 === t2.ownerDocument.scrollingElement || li(p2, y2, o2.nodeMap, o2.styleCache);
    let g2 = t2.ownerDocument;
    if ((t2 === g2.body || t2 === g2.documentElement) && g2.documentElement.localName === "html") {
      let p2 = o2.styleCache.get(g2.documentElement) || O(g2.documentElement);
      t2 === g2.documentElement && (a2.style.overflow = "visible");
      let y2 = t2 === g2.body ? a2 : a2.querySelector("body");
      if (y2 && p2.overflowX === "visible" && p2.overflowY === "visible" && p2.contain === "none" && !p2.containerType?.includes("size") && p2.contentVisibility !== "auto" && p2.contentVisibility !== "hidden") {
        let b2 = o2.styleCache.get(g2.body) || O(g2.body);
        b2.contain === "none" && !b2.containerType?.includes("size") && b2.contentVisibility !== "auto" && b2.contentVisibility !== "hidden" && b2.display !== "none" && (y2.style.overflow = "visible");
      }
    }
    if (t2 === o2.nodeMap.get(a2)) {
      let p2 = o2.styleCache.get(t2) || O(t2);
      o2.styleCache.set(t2, p2);
      let y2 = sr(p2.transform);
      if (a2.style.margin = "0", a2.style.top = "auto", a2.style.left = "auto", a2.style.right = "auto", a2.style.bottom = "auto", a2.style.animation = "none", a2.style.transition = "none", a2.style.willChange = "auto", a2.style.float = "none", a2.style.clear = "none", a2.style.placeSelf = "normal", a2.style.transform = y2 || "", a2.style.translate = "none", (/^inline-/.test(p2.display) || p2.display === "inline" && pp.test(t2.tagName)) && (a2.style.verticalAlign = "top"), dl(t2, a2, p2), !a2.hasAttribute("lang")) {
        let b2 = t2.closest?.("[lang]")?.getAttribute("lang") ?? t2.ownerDocument?.documentElement?.getAttribute("lang");
        b2 && a2.setAttribute("lang", b2);
      }
    }
    for (let [p2, y2] of o2.nodeMap.entries()) y2.tagName === "PRE" && (p2.style.marginTop = "0", p2.style.marginBlockStart = "0");
    return { clone: a2, classCSS: l2, classPrefixCSS: m2, styleCache: o2.styleCache, nodeMap: o2.nodeMap, reconcileRisk: o2.reconcileRisk || 0, clipWindow: r2, standIns: s2, universe: qe(t2, o2) };
  }
  function mp(t2, e2, n2) {
    let o2 = [];
    for (let s2 of [":modal", ":popover-open"]) try {
      o2.push(...t2.querySelectorAll(s2));
    } catch {
    }
    if (!o2.length) return;
    let r2 = /* @__PURE__ */ new Map();
    for (let [s2, a2] of n2.entries()) r2.set(a2, s2);
    let i2 = 214748e4;
    for (let s2 of o2) {
      let a2 = r2.get(s2);
      if (!(!a2 || a2 === e2 || a2.parentNode == null)) {
        try {
          let l2 = getComputedStyle(s2, "::backdrop"), u2 = l2.backgroundColor, c2 = l2.backgroundImage;
          if (u2 && u2 !== "rgba(0, 0, 0, 0)" && u2 !== "transparent" || c2 && c2 !== "none") {
            let d2 = document.createElement("div");
            d2.setAttribute("data-sd-backdrop", ""), d2.style.cssText = `position:fixed;inset:0;z-index:${i2};background-color:${u2};` + (c2 && c2 !== "none" && c2.includes("data:") ? `background-image:${c2};` : ""), e2.appendChild(d2);
          }
        } catch {
        }
        i2 += 1, a2.style.zIndex = String(i2), e2.appendChild(a2), i2 += 1;
      }
    }
  }
  function ai(t2, e2, n2) {
    if (t2.tagName === "STYLE") return;
    if (t2.getRootNode && Jt(t2.getRootNode())) {
      t2.setAttribute("style", e2.replace(/;/g, "; "));
      return;
    }
    let o2 = n2.get(e2);
    o2 && t2.classList.add(o2);
    let r2 = t2.style?.backgroundImage;
    r2 && r2 !== "none" && (t2.style.backgroundImage = r2);
  }
  function li(t2, e2, n2, o2) {
    let r2 = e2.scrollLeft, i2 = e2.scrollTop;
    if (!(r2 || i2) || t2?.nodeType !== 1 || t2.namespaceURI !== "http://www.w3.org/1999/xhtml") return;
    t2.style.overflow = "hidden", t2.style.scrollbarWidth = "none", t2.style.msOverflowStyle = "none";
    try {
      let c2 = t2.querySelectorAll("*");
      for (let f2 of c2) {
        if (f2.nodeType !== 1 || f2.namespaceURI !== "http://www.w3.org/1999/xhtml") continue;
        let d2 = n2?.get(f2), h2 = d2 && (o2?.get(d2) || O(d2)), m2 = f2.style.position || h2?.position;
        if (m2 !== "fixed" && m2 !== "absolute") continue;
        let g2 = h2 && h2.position !== "absolute" && m2 === "absolute", p2 = null;
        if (d2 && !g2) for (let w2 = d2.parentElement || Bt(d2); w2; w2 = w2.parentElement || Bt(w2)) {
          let S2 = o2?.get(w2) || O(w2);
          if (m2 === "absolute" && S2.position !== "static" || S2.transform && S2.transform !== "none" || S2.translate && S2.translate !== "none" || S2.rotate && S2.rotate !== "none" || S2.scale && S2.scale !== "none" || S2.filter && S2.filter !== "none" || S2.backdropFilter && S2.backdropFilter !== "none" || S2.perspective && S2.perspective !== "none" || /transform|perspective|filter/.test(S2.willChange || "") || /layout|paint|strict|content/.test(S2.contain || "")) {
            p2 = w2;
            break;
          }
          if (w2 === e2) break;
        }
        if (p2) {
          p2 === e2 && (f2.style.top = h2.top, f2.style.left = h2.left, f2.style.right = h2.right, f2.style.bottom = h2.bottom);
          continue;
        }
        let y2 = parseFloat(f2.style.top || h2?.top) || 0, b2 = parseFloat(f2.style.left || h2?.left) || 0;
        f2.style.top = `${y2 + i2}px`, f2.style.left = `${b2 + r2}px`, m2 === "fixed" && (f2.style.position = "absolute");
      }
    } catch {
    }
    let a2 = document.createElement("div");
    a2.style.all = "unset", a2.style.direction = "inherit", a2.style.transform = `translate(${-r2}px, ${-i2}px)`, a2.style.willChange = "transform";
    let l2 = (o2?.get(e2) || O(e2)).display, u2 = l2.includes("grid") ? "grid" : l2.includes("flex") ? "flex" : "";
    if (u2) {
      t2.style.display = l2.startsWith("inline") ? "inline-block" : "block", a2.style.display = u2;
      for (let c2 of gp) a2.style.setProperty(c2, "inherit");
    } else a2.style.display = "inline-block";
    for (a2.style.width = "100%"; t2.firstChild; ) a2.appendChild(t2.firstChild);
    t2.appendChild(a2);
  }
  function yp(t2) {
    return t2.getAttribute("href") || t2.getAttribute("xlink:href") || (typeof t2.getAttributeNS == "function" ? t2.getAttributeNS(hl, "href") : null);
  }
  function bp(t2) {
    let e2 = parseFloat(t2.dataset?.snapdomWidth || "") || 0, n2 = parseFloat(t2.dataset?.snapdomHeight || "") || 0, o2 = parseInt(t2.getAttribute("width") || "", 10) || 0, r2 = parseInt(t2.getAttribute("height") || "", 10) || 0, i2 = parseFloat(t2.style?.width || "") || 0, s2 = parseFloat(t2.style?.height || "") || 0, a2 = e2 || i2 || o2 || t2.width || t2.naturalWidth || 100, l2 = n2 || s2 || r2 || t2.height || t2.naturalHeight || 100;
    return { width: a2, height: l2 };
  }
  async function Ro(t2, e2 = {}) {
    let n2 = Array.from(t2.querySelectorAll("img"));
    t2.tagName === "IMG" && n2.unshift(t2);
    let o2 = async (a2) => {
      if (!a2.getAttribute("src")) {
        let g2 = a2.currentSrc || a2.src || Ye(a2.getAttribute("srcset"), a2) || "";
        g2 && a2.setAttribute("src", g2);
      }
      if (a2.removeAttribute("srcset"), a2.removeAttribute("sizes"), (a2.getAttribute("src") || "").startsWith("data:")) {
        a2.width || (a2.width = a2.naturalWidth || 100), a2.height || (a2.height = a2.naturalHeight || 100);
        return;
      }
      let l2 = a2.src || "";
      if (!l2) return;
      let u2 = j.image?.get(l2);
      if (u2) {
        a2.src = u2, a2.width || (a2.width = a2.naturalWidth || 100), a2.height || (a2.height = a2.naturalHeight || 100);
        return;
      }
      let c2 = await ut(l2, { as: "dataURL", useProxy: e2.useProxy, debug: e2.debug });
      if (c2.ok && typeof c2.data == "string" && c2.data.startsWith("data:")) {
        j.image?.set(l2, c2.data), a2.src = c2.data, c2.blob && (a2.__snapdomBlob = c2.blob), a2.width || (a2.width = a2.naturalWidth || 100), a2.height || (a2.height = a2.naturalHeight || 100);
        return;
      }
      let { width: f2, height: d2 } = bp(a2), { fallbackURL: h2 } = e2 || {};
      if (h2) try {
        let g2 = typeof h2 == "function" ? await h2({ width: f2, height: d2, src: l2, element: a2 }) : h2;
        if (g2) {
          let p2 = await ut(g2, { as: "dataURL", useProxy: e2.useProxy, debug: e2.debug });
          if (p2?.ok && typeof p2.data == "string") {
            a2.src = p2.data, a2.width || (a2.width = f2), a2.height || (a2.height = d2);
            return;
          }
        }
      } catch {
      }
      let m2 = "";
      e2.placeholders !== false && (nt(e2.__session, "image-fallback", `image failed to inline, using placeholder: ${l2}`), m2 = '<rect width="100%" height="100%" fill="#ccc"/><text x="50%" y="50%" fill="#666" font-family="sans-serif" font-size="12" text-anchor="middle" dominant-baseline="central">img</text>'), a2.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="${f2}" height="${d2}">${m2}</svg>`)}`, a2.width || (a2.width = f2), a2.height || (a2.height = d2);
    }, r2 = 6;
    for (let a2 = 0; a2 < n2.length; a2 += r2) {
      let l2 = n2.slice(a2, a2 + r2).map(o2);
      await Promise.allSettled(l2);
    }
    let i2 = Array.from(t2.querySelectorAll("image"));
    t2.localName === "image" && i2.unshift(t2);
    let s2 = async (a2) => {
      let l2 = yp(a2);
      if (!l2 || l2.startsWith("data:") || l2.startsWith("blob:")) return;
      let u2 = await ut(l2, { as: "dataURL", useProxy: e2.useProxy, debug: e2.debug });
      u2.ok && typeof u2.data == "string" && u2.data.startsWith("data:") && (a2.setAttribute("href", u2.data), a2.removeAttribute("xlink:href"), typeof a2.removeAttributeNS == "function" && a2.removeAttributeNS(hl, "href"));
    };
    for (let a2 = 0; a2 < i2.length; a2 += r2) {
      let l2 = i2.slice(a2, a2 + r2).map(s2);
      await Promise.allSettled(l2);
    }
  }
  async function Cp(t2, e2, n2, o2) {
    let r2 = n2.get(t2) || O(t2);
    n2.has(t2) || n2.set(t2, r2);
    let i2 = _s(t2), s2 = i2 ? (m2) => m2 in i2 ? i2[m2] : "" : (m2) => r2.getPropertyValue(m2), a2 = s2("border-image"), l2 = s2("border-image-source"), u2 = a2 && a2 !== "none" || l2 && l2 !== "none", c2 = r2.getPropertyValue("background-image"), f2 = s2("background-color"), d2 = c2 && c2 !== "none" || f2 && f2 !== "rgba(0, 0, 0, 0)" && f2 !== "transparent" || /url\s*\(|gradient\s*\(/i.test(r2.getPropertyValue("background") || ""), h2 = _t() && (s2("background-clip") || s2("-webkit-background-clip") || "").includes("text");
    if (d2 && !h2) for (let m2 of Sp) {
      let g2 = s2(m2);
      g2 && e2.style.setProperty(m2, g2);
    }
    for (let m2 of wp) {
      if (h2 && m2 === "background-image") continue;
      let g2 = r2.getPropertyValue(m2);
      if (m2 === "background-image" && (!g2 || g2 === "none")) {
        let b2 = r2.getPropertyValue("background");
        b2 && /url\s*\(/.test(b2) && (g2 = se(b2).filter((w2) => /url\s*\(/.test(w2)).join(", ") || g2);
      }
      if (!g2 || g2 === "none") continue;
      let p2 = se(g2), y2 = await Promise.all(p2.map((b2) => Ie(b2, o2)));
      y2.some((b2) => b2 && b2 !== "none" && !/^url\(undefined/.test(b2)) && e2.style.setProperty(m2, y2.join(", "));
    }
    for (let m2 of xp) {
      let g2 = s2(m2);
      !g2 || g2 === "initial" || e2.style.setProperty(m2, g2);
    }
    if (u2) for (let m2 of vp) {
      let g2 = s2(m2);
      !g2 || g2 === "initial" || e2.style.setProperty(m2, g2);
    }
    if (d2 && /fixed/.test(s2("background-attachment") || "")) try {
      await Mp(t2, e2, r2);
    } catch {
    }
  }
  function kp(t2, e2, n2, o2, r2) {
    let i2 = (t2 || "auto").trim();
    if (i2 === "cover" || i2 === "contain") {
      if (!e2 || !n2) return { w: o2, h: r2 };
      let d2 = i2 === "cover" ? Math.max(o2 / e2, r2 / n2) : Math.min(o2 / e2, r2 / n2);
      return { w: e2 * d2, h: n2 * d2 };
    }
    let s2 = i2.split(/\s+/), a2 = (d2, h2) => {
      if (d2 === "auto" || d2 === void 0) return null;
      if (d2.endsWith("px")) return parseFloat(d2);
      if (d2.endsWith("%")) return h2 * parseFloat(d2) / 100;
    }, l2 = a2(s2[0], o2), u2 = a2(s2[1], r2);
    if (l2 === void 0 || u2 === void 0) return null;
    let c2 = l2, f2 = u2;
    return c2 == null && f2 == null ? (c2 = e2 || o2, f2 = n2 || r2) : c2 == null ? c2 = e2 && n2 ? f2 * (e2 / n2) : o2 : f2 == null && (f2 = e2 && n2 ? c2 * (n2 / e2) : r2), !c2 || !f2 ? null : { w: c2, h: f2 };
  }
  async function Mp(t2, e2, n2) {
    let o2 = (n2.getPropertyValue("background-attachment") || "").split(",").map((m2) => m2.trim()), r2 = xn();
    if (!r2) for (let m2 = t2.parentElement; m2 && !r2; m2 = m2.parentElement) {
      let g2 = O(m2);
      (g2.transform && g2.transform !== "none" || g2.filter && g2.filter !== "none") && (r2 = true);
    }
    if (r2) {
      e2.style.setProperty("background-attachment", o2.map(() => "scroll").join(", "));
      return;
    }
    let i2 = t2.getBoundingClientRect(), s2 = t2.ownerDocument?.defaultView || window, a2 = s2.innerWidth, l2 = s2.innerHeight, u2 = se(e2.style.backgroundImage || n2.getPropertyValue("background-image") || ""), c2 = (e2.style.backgroundSize || n2.getPropertyValue("background-size") || "auto").split(",").map((m2) => m2.trim()), f2 = (e2.style.backgroundPosition || n2.getPropertyValue("background-position") || "0% 0%").split(",").map((m2) => m2.trim()), d2 = [], h2 = [];
    for (let m2 = 0; m2 < u2.length; m2++) {
      let g2 = o2[m2 % o2.length] || "scroll", p2 = c2[m2 % c2.length], y2 = f2[m2 % f2.length];
      if (g2 !== "fixed") {
        d2.push(p2), h2.push(y2);
        continue;
      }
      let b2 = 0, w2 = 0, S2 = u2[m2] && u2[m2].match(/url\(["']?([^"')]+)["']?\)/);
      if (S2) try {
        let A = new Image();
        A.src = S2[1], await A.decode(), b2 = A.naturalWidth, w2 = A.naturalHeight;
      } catch {
        d2.push(p2), h2.push(y2);
        continue;
      }
      let v2 = kp(p2, b2, w2, a2, l2);
      if (!v2) {
        d2.push(p2), h2.push(y2);
        continue;
      }
      let C = y2.split(/\s+/), M = (A, x2, _2) => {
        if (!A) return 0;
        if (A.endsWith("px")) return parseFloat(A);
        if (A.endsWith("%")) return (x2 - _2) * parseFloat(A) / 100;
      }, $2 = M(C[0] || "0%", a2, v2.w), F = M(C[1] || C[0] || "0%", l2, v2.h);
      if ($2 === void 0 || F === void 0) {
        d2.push(p2), h2.push(y2);
        continue;
      }
      d2.push(`${Fo(v2.w)}px ${Fo(v2.h)}px`), h2.push(`${Fo($2 - i2.left)}px ${Fo(F - i2.top)}px`);
    }
    e2.style.setProperty("background-size", d2.join(", ")), e2.style.setProperty("background-position", h2.join(", ")), e2.style.setProperty("background-attachment", o2.map(() => "scroll").join(", "));
  }
  async function $o(t2, e2, n2, o2 = {}, r2 = /* @__PURE__ */ new Map()) {
    if (!e2) return;
    let i2 = [];
    t2 && Tr(t2) && i2.push([t2, e2]);
    let s2 = [e2];
    for (; s2.length; ) {
      let l2 = s2.pop();
      if (l2.children) for (let u2 of l2.children) {
        if (u2.tagName === "STYLE") continue;
        let c2 = r2.get(u2);
        c2 && Tr(c2) && i2.push([c2, u2]), s2.push(u2);
      }
    }
    let a2 = 6;
    for (let l2 = 0; l2 < i2.length; l2 += a2) await Promise.allSettled(i2.slice(l2, l2 + a2).map(([u2, c2]) => Cp(u2, c2, n2, o2)));
  }
  function gl(t2, e2, n2 = /* @__PURE__ */ new Map()) {
    let o2 = [], r2 = document.createTreeWalker(e2, NodeFilter.SHOW_ELEMENT);
    for (let a2 = r2.currentNode; a2; a2 = r2.nextNode()) {
      let l2 = n2.get(a2);
      if (l2?.nodeType !== 1) continue;
      let u2 = O(l2), c2 = u2.getPropertyValue("backdrop-filter") || u2.getPropertyValue("-webkit-backdrop-filter");
      c2 && c2 !== "none" && a2 !== e2 && o2.push({ cloneEl: a2, orig: l2, bf: c2, path: Rp(e2, a2) });
    }
    if (!o2.length) return;
    let i2 = t2.getBoundingClientRect(), s2 = o2.map((a2, l2) => {
      let u2 = e2.cloneNode(true);
      Ep(u2, e2, a2.orig.getBoundingClientRect(), n2), Fp(ml(u2, a2.path));
      for (let c2 = 0; c2 < l2; c2++) {
        let f2 = ml(u2, o2[c2].path);
        f2 && (f2.style.setProperty("backdrop-filter", "none", "important"), f2.style.setProperty("-webkit-backdrop-filter", "none", "important"));
      }
      return { ...a2, copy: u2 };
    });
    for (let { cloneEl: a2, orig: l2, bf: u2, copy: c2 } of s2) Ap.has(a2.tagName) || _p(a2, l2, u2, c2, i2);
  }
  function _p(t2, e2, n2, o2, r2) {
    let i2 = e2.getBoundingClientRect();
    if (!i2.width || !i2.height) return;
    let s2 = O(e2), a2 = e2.offsetWidth ? i2.width / e2.offsetWidth : 1, l2 = Math.abs(a2 - 1) > 1e-3 ? 1 / a2 : 1;
    o2.style.position = "absolute", o2.style.left = `${(r2.left - i2.left) * l2}px`, o2.style.top = `${(r2.top - i2.top) * l2}px`, o2.style.width = `${r2.width}px`, o2.style.height = `${r2.height}px`, o2.style.margin = "0", o2.style.filter = n2, l2 !== 1 && (o2.style.transform = `scale(${l2})`, o2.style.transformOrigin = "top left");
    let u2 = document.createElement("div");
    u2.style.cssText = "position:absolute;inset:0;overflow:hidden;border-radius:inherit;z-index:-2", u2.appendChild(o2);
    let c2 = document.createElement("div");
    c2.style.cssText = "position:absolute;inset:0;border-radius:inherit;z-index:-1", c2.style.backgroundColor = s2.backgroundColor, c2.style.backgroundImage = t2.style.backgroundImage || s2.backgroundImage;
    for (let f2 of ["background-size", "background-position", "background-repeat", "background-origin", "background-clip"]) c2.style.setProperty(f2, s2.getPropertyValue(f2));
    t2.style.setProperty("background-color", "transparent", "important"), t2.style.setProperty("background-image", "none", "important"), t2.style.setProperty("backdrop-filter", "none", "important"), t2.style.setProperty("-webkit-backdrop-filter", "none", "important"), s2.position === "static" && (t2.style.position = "relative"), t2.style.isolation = "isolate", t2.prepend(c2), t2.prepend(u2);
  }
  function Ep(t2, e2, n2, o2) {
    let r2 = [[t2, e2]];
    for (; r2.length; ) {
      let [i2, s2] = r2.pop(), a2 = o2.get(s2);
      if (a2?.nodeType === 1) {
        let c2 = a2.getBoundingClientRect();
        (c2.left > n2.right + To || c2.right < n2.left - To || c2.top > n2.bottom + To || c2.bottom < n2.top - To) && (i2.tagName === "IMG" && i2.setAttribute("src", "data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA="), i2.style && (i2.style.backgroundImage = "none"));
      }
      let l2 = i2.children, u2 = s2.children;
      for (let c2 = 0; c2 < l2.length; c2++) r2.push([l2[c2], u2[c2]]);
    }
  }
  function Rp(t2, e2) {
    let n2 = [];
    for (let o2 = e2; o2 !== t2; o2 = o2.parentElement) {
      if (!o2?.parentElement) return null;
      n2.push([...o2.parentElement.children].indexOf(o2));
    }
    return n2.reverse();
  }
  function ml(t2, e2) {
    if (!e2) return null;
    let n2 = t2;
    for (let o2 of e2) if (n2 = n2.children[o2], !n2) return null;
    return n2;
  }
  function Fp(t2) {
    if (t2) for (let e2 = t2; e2 && e2.parentNode; ) {
      let n2 = e2.parentNode;
      for (; e2.nextSibling; ) e2.nextSibling.remove();
      e2 === t2 && e2.remove(), e2 = n2;
    }
  }
  function ci(t2) {
    return Yi(t2), { styleMap: /* @__PURE__ */ new Map(), styleCache: /* @__PURE__ */ new WeakMap(), nodeMap: /* @__PURE__ */ new Map(), warnings: [] };
  }
  function Po(t2, e2) {
    if (!t2) return () => {
    };
    let n2 = [], o2 = 200;
    function r2(i2) {
      if (e2) {
        let u2 = i2.getBoundingClientRect();
        if (u2.width > 0 || u2.height > 0) {
          let c2 = Math.max(u2.right, u2.left + (i2.scrollWidth || 0)), f2 = Math.max(u2.bottom, u2.top + (i2.scrollHeight || 0));
          if (c2 < e2.left - o2 || u2.left > e2.right + o2 || f2 < e2.top - o2 || u2.top > e2.bottom + o2) return;
        }
      }
      let s2 = getComputedStyle(i2), a2 = $p(i2, s2);
      a2 && n2.push(a2);
      let l2 = Tp(i2, s2);
      l2 && n2.push(l2);
      for (let u2 of i2.children || []) r2(u2);
    }
    return r2(t2), () => n2.forEach((i2) => i2());
  }
  function $p(t2, e2) {
    if (!t2) return () => {
    };
    e2 = e2 || getComputedStyle(t2);
    let n2 = Lp(e2);
    if (n2 <= 0) return () => {
    };
    if (!Sl(t2)) return () => {
    };
    let o2 = xl(t2), r2 = o2.text, i2 = Wp(e2);
    o2.write("X");
    let s2 = t2.scrollHeight - i2;
    o2.restore();
    let a2 = s2 > 0 ? s2 : Ip(e2), l2 = Math.round(a2 * n2 + i2), u2 = 0.5 * (n2 + 1);
    if (t2.scrollHeight <= l2 + u2) return () => {
    };
    let c2 = 0, f2 = r2.length, d2 = -1;
    for (; c2 <= f2; ) {
      let m2 = c2 + f2 >> 1;
      o2.write(r2.slice(0, fi(r2, m2)) + "\u2026"), t2.scrollHeight <= l2 + u2 ? (d2 = m2, c2 = m2 + 1) : f2 = m2 - 1;
    }
    let h2 = (d2 >= 0 ? r2.slice(0, fi(r2, d2)) : "") + "\u2026";
    return o2.write(h2), wl(t2, h2, o2);
  }
  function Tp(t2, e2) {
    if (!t2) return () => {
    };
    if (e2 = e2 || getComputedStyle(t2), e2.textOverflow !== "ellipsis") return () => {
    };
    if (e2.whiteSpace !== "nowrap" && e2.whiteSpace !== "pre") return () => {
    };
    if (e2.overflowX !== "hidden" && e2.overflowX !== "clip") return () => {
    };
    if (!Sl(t2)) return () => {
    };
    if (t2.scrollWidth <= t2.clientWidth + 0.5) return () => {
    };
    let n2 = xl(t2), o2 = n2.text, r2 = Np(t2, e2, n2.nodes), i2 = (c2) => {
      if (!r2) {
        let d2 = fi(o2, c2);
        return o2.slice(0, d2) + bl(o2, d2) + "\u2026";
      }
      let f2 = Pp(o2, o2.length - c2);
      return bl(o2, f2) + o2.slice(f2) + "\u2026";
    }, s2 = 0, a2 = o2.length, l2 = -1;
    for (; s2 <= a2; ) {
      let c2 = s2 + a2 >> 1;
      n2.write(i2(c2)), t2.scrollWidth <= t2.clientWidth + 0.5 ? (l2 = c2, s2 = c2 + 1) : a2 = c2 - 1;
    }
    let u2 = l2 >= 0 ? i2(l2) : "\u2026";
    return n2.write(u2), wl(t2, u2, n2);
  }
  function wl(t2, e2, n2) {
    return () => {
      t2.textContent === e2 && n2.restore();
    };
  }
  function xl(t2) {
    let e2 = [];
    for (let o2 = t2.firstChild; o2; o2 = o2.nextSibling) o2.nodeType === Node.TEXT_NODE && e2.push(o2);
    let n2 = e2.map((o2) => o2.data);
    return { nodes: e2, text: n2.join(""), write(o2) {
      e2[0].data = o2;
      for (let r2 = 1; r2 < e2.length; r2++) e2[r2].data = "";
    }, restore() {
      for (let o2 = 0; o2 < e2.length; o2++) e2[o2].data = n2[o2];
    } };
  }
  function fi(t2, e2) {
    if (e2 <= 0 || e2 >= t2.length) return e2;
    let n2 = t2.charCodeAt(e2 - 1);
    return n2 >= 55296 && n2 <= 56319 ? e2 - 1 : e2;
  }
  function Pp(t2, e2) {
    if (e2 <= 0 || e2 >= t2.length) return e2;
    let n2 = t2.charCodeAt(e2);
    return n2 >= 56320 && n2 <= 57343 ? e2 - 1 : e2;
  }
  function bl(t2, e2) {
    return e2 > 0 && e2 < t2.length && yl.test(t2[e2 - 1]) && yl.test(t2[e2]) && !Y() ? "\u200D" : "";
  }
  function Np(t2, e2, n2) {
    let o2 = null, r2 = null;
    for (let p2 of n2) {
      let y2 = p2.data.search(/\S/);
      y2 < 0 || (o2 || (o2 = [p2, y2]), r2 = [p2, p2.data.length - p2.data.trimEnd().length]);
    }
    if (!o2) return false;
    let i2 = t2.ownerDocument.createRange(), s2 = (p2, y2, b2) => (i2.setStart(p2, y2), i2.setEnd(p2, b2), i2.getBoundingClientRect()), [a2, l2] = o2, [u2, c2] = r2, f2 = u2.data.length - c2, d2 = s2(a2, l2, Math.min(a2.data.length, l2 + 1)), h2 = s2(u2, Math.max(0, f2 - 1), f2), m2 = t2.getBoundingClientRect();
    if (e2.direction === "rtl") {
      let p2 = m2.right - (parseFloat(e2.borderRightWidth) || 0) - (parseFloat(e2.paddingRight) || 0);
      return Math.abs(h2.right - p2) < Math.abs(d2.right - p2);
    }
    let g2 = m2.left + (parseFloat(e2.borderLeftWidth) || 0) + (parseFloat(e2.paddingLeft) || 0);
    return Math.abs(h2.left - g2) < Math.abs(d2.left - g2);
  }
  function Lp(t2) {
    let e2 = t2.getPropertyValue("-webkit-line-clamp") || t2.getPropertyValue("line-clamp");
    e2 = (e2 || "").trim();
    let n2 = parseInt(e2, 10);
    return Number.isFinite(n2) && n2 > 0 ? n2 : 0;
  }
  function Ip(t2) {
    let e2 = (t2.lineHeight || "").trim(), n2 = parseFloat(t2.fontSize) || 16;
    return !e2 || e2 === "normal" ? Math.round(n2 * 1.2) : e2.endsWith("px") ? parseFloat(e2) : /^\d+(\.\d+)?$/.test(e2) ? Math.round(parseFloat(e2) * n2) : e2.endsWith("%") ? Math.round(parseFloat(e2) / 100 * n2) : Math.round(n2 * 1.2);
  }
  function Wp(t2) {
    return (parseFloat(t2.paddingTop) || 0) + (parseFloat(t2.paddingBottom) || 0);
  }
  function Sl(t2) {
    return t2.childElementCount > 0 ? false : Array.from(t2.childNodes).some((e2) => e2.nodeType === Node.TEXT_NODE);
  }
  function vl(t2) {
    let e2 = Array.isArray(t2 && t2.plugins) ? t2.plugins : [];
    if (!e2.length) return { stage: kt, loweredBy: [] };
    let n2 = -1, o2 = [];
    for (let i2 of e2) {
      if (!i2 || typeof i2 != "object") continue;
      let s2 = i2.needs === void 0 ? kt : i2.needs;
      if (!Object.prototype.hasOwnProperty.call(In, s2)) throw new Error(`[SnapDOM] Plugin '${i2.name || "(unnamed)"}' declares needs: ${JSON.stringify(s2)}, expected one of ${nn.join(", ")}.`);
      o2.push({ name: i2.name || "(unnamed)", needs: s2 }), n2 = Math.max(n2, In[s2]);
    }
    if (n2 < 0) return { stage: kt, loweredBy: [] };
    let r2 = nn[n2];
    return { loweredBy: r2 === kt ? [] : o2.filter((i2) => i2.needs === r2).map((i2) => i2.name), stage: r2 };
  }
  function on(t2, e2) {
    return In[t2] >= In[e2];
  }
  function kl(t2, e2, n2) {
    let o2 = e2.length ? e2.map((r2) => `'${r2}'`).join(", ") : "the attached plugins";
    return new Error(`[SnapDOM] No ${n2}: this capture stopped at '${t2}' because ${o2} asked for needs: '${t2}'. It is not re-captured, since that would be a different instant. Ask the plugin for needs: 'render', or capture without it.`);
  }
  function sn(t2) {
    if (!t2) return null;
    if (Array.isArray(t2)) {
      let [e2, n2] = t2;
      return typeof e2 == "function" ? e2(n2) : e2;
    }
    if (typeof t2 == "object" && "plugin" in t2) {
      let { plugin: e2, options: n2 } = t2;
      return typeof e2 == "function" ? e2(n2) : e2;
    }
    return typeof t2 == "function" ? t2() : t2;
  }
  function ui(...t2) {
    let e2 = t2.flat();
    for (let n2 of e2) {
      let o2 = sn(n2);
      if (o2) {
        if (o2.needs !== void 0 && o2.needs !== kt) throw new Error(`[SnapDOM] '${o2.name || "(unnamed)"}' declares needs: ${JSON.stringify(o2.needs)}, so it can't be a global plugin (it would stop every capture before '${kt}'). Pass it per capture: snapdom(el, { plugins: [...] }).`);
        rn.some((r2) => r2 && r2.name && o2.name && r2.name === o2.name) || rn.push(o2);
      }
    }
  }
  function Ml(t2) {
    return t2 && Array.isArray(t2.plugins) ? t2.plugins : rn;
  }
  async function Zt(t2, e2, n2) {
    let o2 = n2, r2 = Ml(e2);
    for (let i2 of r2) {
      let s2 = i2 && typeof i2[t2] == "function" ? i2[t2] : null;
      if (!s2) continue;
      let a2 = await s2(e2, o2);
      typeof a2 < "u" && (o2 = a2);
    }
    return o2;
  }
  async function No(t2, e2, n2) {
    let o2 = [], r2 = Ml(e2);
    for (let i2 of r2) {
      let s2 = i2 && typeof i2[t2] == "function" ? i2[t2] : null;
      if (!s2) continue;
      let a2 = await s2(e2, n2);
      typeof a2 < "u" && o2.push(a2);
    }
    return o2;
  }
  function Bp(t2) {
    let e2 = [];
    if (Array.isArray(t2)) for (let n2 of t2) {
      let o2 = sn(n2);
      if (!o2) continue;
      o2.name || (o2.name = `anonymous-${++Dp}`);
      let r2 = e2.findIndex((i2) => i2 && i2.name === o2.name);
      r2 >= 0 && e2.splice(r2, 1), e2.push(o2);
    }
    for (let n2 of rn) n2 && n2.name && !e2.some((o2) => o2.name === n2.name) && e2.push(n2);
    return Object.freeze(e2);
  }
  function Al(t2, e2, n2 = false) {
    return !t2 || t2.plugins && !n2 || (t2.plugins = Bp(e2)), t2;
  }
  function di() {
    return rn.slice();
  }
  function Lo(t2) {
    let e2 = Array.isArray(t2 && t2.plugins) ? t2.plugins : [];
    for (let n2 of e2) {
      let o2 = sn(n2);
      if (!(!o2 || o2.pure === true)) {
        for (let r2 of zp) if (typeof o2[r2] == "function") return true;
      }
    }
    return false;
  }
  function Wo(t2, e2, n2, o2, r2, i2) {
    let s2 = i2.__compressedAssets || (i2.__compressedAssets = /* @__PURE__ */ new WeakMap()), a2 = s2.get(t2);
    a2 || (a2 = { token: String(++Up), properties: [] }, s2.set(t2, a2), t2.setAttribute(_e, a2.token));
    let l2 = a2.properties.find((u2) => u2.kind === e2 && u2.name === n2);
    l2 ? (l2.compressed !== o2 && (l2.original = o2), l2.compressed = r2) : a2.properties.push({ kind: e2, name: n2, original: o2, compressed: r2 });
  }
  function Oo(t2, e2) {
    let n2 = /* @__PURE__ */ new Map();
    if (!t2 || !e2) return n2;
    let o2 = [t2, ...t2.querySelectorAll(`[${_e}]`)];
    for (let r2 of o2) {
      let i2 = e2.get(r2);
      if (!i2 || r2.getAttribute(_e) !== i2.token) continue;
      let s2 = i2.properties.filter((a2) => $l(r2, a2) === a2.compressed).map((a2) => Object.freeze({ ...a2 }));
      s2.length && n2.set(i2.token, Object.freeze(s2));
    }
    return n2;
  }
  function Do(t2, e2) {
    if (!t2 || !e2) return;
    let n2 = 0;
    for (let o2 of [t2, ...t2.querySelectorAll(`[${_e}]`)]) {
      let r2 = e2.get(o2);
      r2 && (r2.token = String(++n2), o2.setAttribute(_e, r2.token));
    }
  }
  function Tl(t2, e2) {
    if (!e2?.size || typeof t2 != "string" || !t2.startsWith("data:image/svg+xml")) return t2;
    let n2 = t2.indexOf(","), o2 = new DOMParser().parseFromString(decodeURIComponent(t2.slice(n2 + 1)), "image/svg+xml");
    if (o2.querySelector("parsererror")) return t2;
    let r2 = false;
    for (let i2 of o2.querySelectorAll(`[${_e}]`)) for (let s2 of e2.get(i2.getAttribute(_e)) || []) $l(i2, s2) === s2.compressed && (s2.kind === "style" ? i2.style.setProperty(s2.name, s2.original, i2.style.getPropertyPriority(s2.name)) : s2.name === "xlink:href" ? i2.setAttributeNS(Fl, s2.name, s2.original) : i2.setAttribute(s2.name, s2.original), r2 = true);
    return r2 ? `data:image/svg+xml;charset=utf-8,${encodeURIComponent(new XMLSerializer().serializeToString(o2))}` : t2;
  }
  function _l(t2) {
    if (t2.is2D === false) return 1 / 0;
    let e2 = t2.a * t2.a + t2.b * t2.b + t2.c * t2.c + t2.d * t2.d, n2 = t2.a * t2.d - t2.b * t2.c;
    return Math.sqrt((e2 + Math.sqrt(Math.max(0, e2 * e2 - 4 * n2 * n2))) / 2);
  }
  function pi(t2, e2) {
    let n2 = e2.element || t2, o2 = n2.isConnected ? O(n2) : n2.style, r2 = e2.__compressionClip, i2 = (h2, m2) => {
      try {
        return h2[m2]?.baseVal?.value || 0;
      } catch {
        return 0;
      }
    }, s2 = r2?.width || n2.offsetWidth || parseFloat(o2?.width) || i2(n2, "width"), a2 = r2?.height || n2.offsetHeight || parseFloat(o2?.height) || i2(n2, "height"), l2 = Number.isFinite(e2.width), u2 = Number.isFinite(e2.height);
    if (!r2 && (l2 || u2) && s2 && a2) try {
      let h2 = e2.outerTransforms === false && e2.__compressionRootTransform ? e2.__compressionRootTransform : de({ baseTransform: o2?.transform, rotate: o2?.rotate, scale: o2?.scale, width: s2, height: a2 });
      if (h2.is2D === false) s2 = 0, a2 = 0;
      else {
        let m2 = Math.abs(h2.a) * s2 + Math.abs(h2.c) * a2, g2 = Math.abs(h2.b) * s2 + Math.abs(h2.d) * a2;
        s2 = Math.min(s2, m2), a2 = Math.min(a2, g2);
      }
    } catch {
      s2 = 0, a2 = 0;
    }
    let c2 = (l2 || u2 ? Math.max(l2 ? s2 ? e2.width / s2 : 1 / 0 : 0, u2 ? a2 ? e2.height / a2 : 1 / 0 : 0) : e2.scale || 1) * (e2.dpr || 1);
    e2.__compressionDensity = c2;
    let f2 = /* @__PURE__ */ new WeakMap(), d2 = (h2) => {
      if (!h2 || h2.nodeType !== 1) return 1;
      if (f2.has(h2)) return f2.get(h2);
      let m2 = h2.isConnected ? O(h2) : h2.style, g2 = 1;
      try {
        m2?.perspective && m2.perspective !== "none" && (g2 = 1 / 0);
        let p2 = m2?.transform;
        if (p2 && p2 !== "none") g2 *= _l(new DOMMatrix(p2));
        else if (h2.transform?.baseVal?.numberOfItems) {
          let y2 = new DOMMatrix();
          for (let b2 = 0; b2 < h2.transform.baseVal.numberOfItems; b2++) {
            let w2 = h2.transform.baseVal.getItem(b2).matrix;
            y2 = y2.multiply(new DOMMatrix([w2.a, w2.b, w2.c, w2.d, w2.e, w2.f]));
          }
          g2 *= _l(y2);
        }
        if (m2?.scale && m2.scale !== "none") {
          let y2 = m2.scale.trim().split(/\s+/).map((b2) => parseFloat(b2) / (b2.endsWith("%") ? 100 : 1));
          g2 *= Math.max(...y2.map(Math.abs));
        }
        if (h2 !== n2 && m2?.zoom && m2.zoom !== "normal" && (g2 *= parseFloat(m2.zoom) || 1), h2.localName === "svg" && h2.viewBox?.baseVal?.width > 0 && h2.viewBox.baseVal.height > 0) {
          let y2 = h2.viewBox.baseVal, b2 = (v2) => /^\d+(?:\.\d+)?px$/.test(m2?.[v2] || "") ? parseFloat(m2[v2]) : i2(h2, v2), w2 = b2("width"), S2 = b2("height");
          g2 *= w2 > 0 && S2 > 0 ? Math.max(w2 / y2.width, S2 / y2.height) : 1 / 0;
        }
      } catch {
        g2 = 1 / 0;
      }
      return Number.isFinite(g2) || (g2 = 1 / 0), h2 !== n2 && (g2 *= d2(h2.parentElement || h2.getRootNode?.().host)), f2.set(h2, g2), g2;
    };
    return { density: c2, stretch: d2 };
  }
  async function Hp(t2) {
    let e2 = new Image();
    return e2.decoding = "sync", e2.src = t2, typeof e2.decode == "function" ? (await e2.decode(), e2) : (await new Promise((n2, o2) => {
      e2.onload = () => n2(), e2.onerror = o2;
    }), e2);
  }
  function jp(t2) {
    let e2 = /^data:([^;,]+)/.exec(t2);
    return e2 ? e2[1] : "";
  }
  function Gp(t2, e2, n2, o2) {
    if (n2.length + (o2?.length || 0) > El) return;
    t2.set(e2, { source: n2, result: o2 });
    let r2 = 0;
    for (let i2 of t2.values()) r2 += i2.source.length + (i2.result?.length || 0);
    for (; r2 > El; ) {
      let i2 = t2.keys().next().value, s2 = t2.get(i2);
      r2 -= s2.source.length + (s2.result?.length || 0), t2.delete(i2);
    }
  }
  function qp(t2, e2) {
    let n2 = t2.indexOf(",");
    if (n2 < 0 || !/;base64/i.test(t2.slice(0, n2))) return null;
    let o2 = Math.ceil(e2 / 3) * 4, r2 = t2.length - n2 - 1, i2 = Math.min(r2, o2);
    try {
      let s2 = atob(t2.slice(n2 + 1, n2 + 1 + i2 - i2 % 4)), a2 = new Uint8Array(s2.length);
      for (let l2 = 0; l2 < s2.length; l2++) a2[l2] = s2.charCodeAt(l2);
      return a2;
    } catch {
      return null;
    }
  }
  function Xp(t2) {
    let e2 = qp(t2, 4096);
    if (!e2 || e2.length < 16) return null;
    let n2 = (o2) => e2[o2] << 8 | e2[o2 + 1];
    if (e2[0] === 137 && e2[1] === 80 && e2.length >= 24) return { w: (e2[16] << 24 | e2[17] << 16 | e2[18] << 8 | e2[19]) >>> 0, h: (e2[20] << 24 | e2[21] << 16 | e2[22] << 8 | e2[23]) >>> 0 };
    if (e2[0] === 71 && e2[1] === 73 && e2[2] === 70) return { w: e2[6] | e2[7] << 8, h: e2[8] | e2[9] << 8 };
    if (e2[0] === 82 && e2[1] === 73 && e2[8] === 87 && e2.length >= 30) {
      let o2 = e2[15];
      if (o2 === 32 && e2[23] === 157) return { w: (e2[26] | e2[27] << 8) & 16383, h: (e2[28] | e2[29] << 8) & 16383 };
      if (o2 === 76) return { w: (e2[21] | (e2[22] & 63) << 8) + 1, h: ((e2[22] >> 6 | e2[23] << 2 | (e2[24] & 15) << 10) & 16383) + 1 };
      if (o2 === 88) return { w: (e2[24] | e2[25] << 8 | e2[26] << 16) + 1, h: (e2[27] | e2[28] << 8 | e2[29] << 16) + 1 };
    }
    if (e2[0] === 255 && e2[1] === 216) {
      let o2 = 2;
      for (; o2 + 9 < e2.length; ) {
        if (e2[o2] !== 255) {
          o2++;
          continue;
        }
        let r2 = e2[o2 + 1];
        if (r2 === 216 || r2 === 1 || r2 >= 208 && r2 <= 215) {
          o2 += 2;
          continue;
        }
        if (r2 >= 192 && r2 <= 207 && r2 !== 196 && r2 !== 200 && r2 !== 204) return { h: n2(o2 + 5), w: n2(o2 + 7) };
        let i2 = n2(o2 + 2);
        if (i2 < 2) break;
        o2 += 2 + i2;
      }
    }
    return null;
  }
  function Rl(t2, e2, n2, o2) {
    let r2 = Math.min(1, Math.max(n2 / t2, o2 / e2));
    return !(r2 > 0) || r2 >= 0.95 ? 0 : r2;
  }
  function Ll() {
    for (let t2 of Ae.values()) t2(void 0);
    if (Ae.clear(), Array.isArray(Kt)) for (let t2 of Kt) try {
      t2?.terminate();
    } catch {
    }
    Kt = false;
  }
  function Zp() {
    let t2, e2 = null;
    try {
      t2 = URL.createObjectURL(new Blob([Yp], { type: "text/javascript" })), e2 = new Worker(t2), e2.onmessage = (n2) => {
        let o2 = Ae.get(n2.data.id);
        o2 && (Ae.delete(n2.data.id), o2(n2.data.error ? void 0 : n2.data.url ?? null));
      }, e2.onerror = Ll;
    } catch {
      e2 = null;
    }
    return t2 && URL.revokeObjectURL(t2), e2;
  }
  function th() {
    if (Kt === false) return false;
    if (Kt === null) {
      if (typeof Worker > "u" || typeof OffscreenCanvas > "u") return Kt = false;
      Kt = [];
    }
    let t2 = Jp++ % Kp;
    if (!Kt[t2]) {
      let e2 = Zp();
      if (!e2) return Ll(), false;
      Kt[t2] = e2;
    }
    return Kt[t2];
  }
  function nh(t2, e2, n2, o2, r2) {
    let i2 = th();
    return i2 ? new Promise((s2) => {
      let a2 = ++Qp, l2 = setTimeout(() => {
        Ae.delete(a2), s2(void 0);
      }, eh);
      Ae.set(a2, (u2) => {
        clearTimeout(l2), s2(u2);
      });
      try {
        i2.postMessage({ id: a2, dataURL: r2 ? "" : t2, blob: r2, srcLength: t2.length, targetW: e2, targetH: n2, resFactor: Nl, quality: Pl, mime: o2 });
      } catch {
        clearTimeout(l2), Ae.delete(a2), s2(void 0);
      }
    }) : Promise.resolve(void 0);
  }
  async function hi(t2, e2, n2, o2) {
    if (typeof t2 != "string" || !t2.startsWith("data:image") || t2.startsWith("data:image/svg")) return null;
    e2 = Math.ceil(e2), n2 = Math.ceil(n2);
    let r2 = t2.length + ":" + t2.slice(0, 64) + t2.slice(-64) + ":" + e2 + "x" + n2, i2 = j.compress, s2 = i2.get(r2);
    if (s2?.source === t2) return s2.result;
    let a2 = Io.get(r2);
    if (a2?.source === t2 && a2.cache === i2) return a2.promise;
    let l2 = (async () => {
      let c2 = jp(t2), f2 = c2 === "image/jpeg" ? "image/jpeg" : c2 === "image/webp" ? "image/webp" : "image/png", d2 = Xp(t2);
      if (d2 && d2.w > 0 && d2.h > 0 && !Rl(d2.w, d2.h, e2, n2)) return null;
      if (t2.length >= Vp) {
        let C = await nh(t2, e2, n2, f2, o2);
        if (C !== void 0) return C;
      }
      let h2;
      try {
        h2 = await Hp(t2);
      } catch {
        return null;
      }
      let m2 = h2.naturalWidth || h2.width, g2 = h2.naturalHeight || h2.height;
      if (!m2 || !g2) return null;
      let p2 = Rl(m2, g2, e2, n2);
      if (!p2) return null;
      let y2 = p2 * Nl, b2 = Math.max(1, Math.round(m2 * y2)), w2 = Math.max(1, Math.round(g2 * y2)), S2 = document.createElement("canvas");
      S2.width = b2, S2.height = w2;
      let v2 = S2.getContext("2d");
      if (!v2) return null;
      v2.imageSmoothingEnabled = true, v2.imageSmoothingQuality = "high", v2.drawImage(h2, 0, 0, b2, w2);
      try {
        let C = S2.toDataURL(f2, Pl);
        if (typeof C == "string" && C.startsWith("data:image") && C.length < t2.length) return C;
      } catch {
      }
      return null;
    })(), u2 = { source: t2, promise: l2, cache: i2 };
    Io.set(r2, u2);
    try {
      let c2 = await l2;
      return Gp(i2, r2, t2, c2), c2;
    } finally {
      Io.get(r2) === u2 && Io.delete(r2);
    }
  }
  async function oh(t2, e2, n2 = /* @__PURE__ */ new Map(), o2 = {}) {
    if (!e2.compress) return { count: 0, before: 0, after: 0 };
    let r2 = Array.from(t2.querySelectorAll("img"));
    t2.tagName === "IMG" && r2.unshift(t2);
    let i2 = 0, s2 = 0, a2 = 0, l2 = async (c2) => {
      let f2 = c2.getAttribute("src") || "";
      if (!f2.startsWith("data:image") || f2.startsWith("data:image/svg")) return;
      let d2 = parseFloat(c2.dataset.snapdomWidth) || parseFloat(c2.style.width) || c2.width || 0, h2 = parseFloat(c2.dataset.snapdomHeight) || parseFloat(c2.style.height) || c2.height || 0;
      if (!d2 || !h2) return;
      let m2 = o2.value || (o2.value = pi(t2, e2)), g2 = m2.density * m2.stretch(n2.get(c2) || c2), p2 = await hi(f2, d2 * g2, h2 * g2, c2.__snapdomBlob);
      p2 && (i2++, s2 += f2.length, a2 += p2.length, c2.setAttribute("src", p2), Wo(c2, "attribute", "src", f2, p2, e2));
    }, u2 = 6;
    for (let c2 = 0; c2 < r2.length; c2 += u2) await Promise.allSettled(r2.slice(c2, c2 + u2).map(l2));
    return { count: i2, before: s2, after: a2 };
  }
  function ih(t2) {
    let e2 = t2.offsetWidth || t2.getBoundingClientRect().width || 0, n2 = t2.offsetHeight || t2.getBoundingClientRect().height || 0;
    return { w: e2, h: n2 };
  }
  async function sh(t2, e2, n2 = /* @__PURE__ */ new Map(), o2 = {}) {
    if (!e2.compress) return { count: 0 };
    let r2 = [], i2 = [t2, ...t2.querySelectorAll("*")];
    for (let u2 of i2) {
      let c2 = u2.style && u2.style.backgroundImage;
      c2 && c2.includes("data:image") && r2.push(u2);
    }
    let s2 = 0, a2 = async (u2) => {
      let c2 = n2.get(u2);
      if (!c2 || !c2.isConnected) return;
      let f2;
      try {
        f2 = getComputedStyle(c2);
      } catch {
        return;
      }
      if ((f2.backgroundRepeat || "repeat").toLowerCase().split(",").some(($2) => $2.trim() !== "no-repeat")) return;
      let h2 = (u2.style.backgroundSize || f2.backgroundSize || "auto").toLowerCase();
      if (h2.split(",").some(($2) => !rh.test($2.trim()))) return;
      let { w: m2, h: g2 } = ih(c2);
      if (!m2 || !g2) return;
      let p2 = Math.max(1, ...(h2.match(/\d+(?:\.\d+)?%/g) || []).map(($2) => parseFloat($2) / 100)), y2 = o2.value || (o2.value = pi(t2, e2)), b2 = y2.density * y2.stretch(c2) * p2, w2 = m2 * b2, S2 = g2 * b2, v2 = u2.style.backgroundImage, C = [...v2.matchAll(/url\((['"]?)(data:image\/[^)'"]+)\1\)/gi)], M = v2;
      for (let $2 of C) {
        let F = $2[2];
        if (F.startsWith("data:image/svg")) continue;
        let A = await hi(F, w2, S2);
        A && (M = M.split(F).join(A), s2++);
      }
      M !== v2 && (u2.style.setProperty("background-image", M, u2.style.getPropertyPriority("background-image")), Wo(u2, "style", "background-image", v2, u2.style.backgroundImage, e2));
    }, l2 = 6;
    for (let u2 = 0; u2 < r2.length; u2 += l2) await Promise.allSettled(r2.slice(u2, u2 + l2).map(a2));
    return { count: s2 };
  }
  async function ah(t2, e2, n2 = /* @__PURE__ */ new Map(), o2 = {}) {
    if (!e2.compress) return { count: 0 };
    let r2 = Array.from(t2.querySelectorAll("image"));
    t2.localName === "image" && r2.unshift(t2);
    let i2 = 0, s2 = async (l2) => {
      let u2 = l2.getAttribute("href") || (typeof l2.getAttributeNS == "function" ? l2.getAttributeNS("http://www.w3.org/1999/xlink", "href") : null);
      if (!u2 || !u2.startsWith("data:image") || u2.startsWith("data:image/svg")) return;
      let c2 = l2.getAttribute("width") || "", f2 = l2.getAttribute("height") || "";
      if (c2.includes("%") || f2.includes("%")) return;
      let d2 = n2.get(l2), h2 = d2 ? O(d2) : l2.style, m2 = (S2, v2) => {
        if (/^\d+(?:\.\d+)?px$/.test(h2?.[S2] || "")) return parseFloat(h2[S2]);
        if (/^\d+(?:\.\d+)?(?:px)?$/.test(v2.trim())) return parseFloat(v2);
        try {
          return d2?.[S2]?.baseVal?.value || 0;
        } catch {
          return 0;
        }
      }, g2 = m2("width", c2), p2 = m2("height", f2);
      if (!g2 || !p2) return;
      let y2 = o2.value || (o2.value = pi(t2, e2)), b2 = y2.density * y2.stretch(d2 || l2), w2 = await hi(u2, g2 * b2, p2 * b2);
      w2 && (l2.setAttribute("href", w2), Wo(l2, "attribute", "href", u2, w2, e2), l2.hasAttribute("xlink:href") && (l2.setAttributeNS(Fl, "xlink:href", w2), Wo(l2, "attribute", "xlink:href", u2, w2, e2)), i2++);
    }, a2 = 6;
    for (let l2 = 0; l2 < r2.length; l2 += a2) await Promise.allSettled(r2.slice(l2, l2 + a2).map(s2));
    return { count: i2 };
  }
  async function Bo(t2, e2, n2) {
    if (!e2.compress) return;
    let o2 = {};
    await oh(t2, e2, n2, o2), await sh(t2, e2, n2, o2), await ah(t2, e2, n2, o2);
  }
  function an(t2, e2, n2, o2) {
    return t2 > e2 + 0.5 ? t2 - n2 : o2 - n2;
  }
  function lh(t2) {
    let e2 = (r2) => r2 && r2 !== "transparent" && !/^rgba\(.*,\s*0\)$/.test(r2), n2 = O(t2.documentElement).backgroundColor, o2 = e2(n2) ? n2 : O(t2.body).backgroundColor;
    return e2(o2) ? `;background-color:${o2} !important` : "";
  }
  function fh(t2, e2) {
    if (Y()) return t2;
    let n2 = t2.indexOf("</style>");
    if (n2 === -1) return t2;
    let o2 = /<style\b[^>]*>[\s\S]*?<\/style>/g, r2 = [], i2 = n2, s2;
    for (o2.lastIndex = n2; s2 = o2.exec(t2); ) r2.push({ text: t2.slice(i2, s2.index), intern: true }), r2.push({ text: s2[0], intern: false }), i2 = o2.lastIndex;
    r2.push({ text: t2.slice(i2), intern: true });
    let a2 = /* @__PURE__ */ new Map(), l2 = / style="([^"]*)"/g, u2;
    for (let y2 of r2) if (y2.intern) for (l2.lastIndex = 0; u2 = l2.exec(y2.text); ) a2.set(u2[1], (a2.get(u2[1]) || 0) + 1);
    let c2 = 0;
    for (let [y2, b2] of a2) b2 > 1 && (c2 += (b2 - 1) * y2.length);
    if (c2 < 2048 || t2.includes(" data-sdi=")) return t2;
    let f2 = uh(e2, r2.some((y2) => !y2.intern), t2.includes("data-snapdom-asset"));
    if (f2 === null) return t2;
    let d2 = /* @__PURE__ */ new Map(), h2 = 0, m2 = [], g2 = (y2, b2) => {
      if ((a2.get(b2) || 0) < 2 || f2.has(b2)) return y2;
      let w2 = d2.get(b2);
      return w2 === void 0 && (w2 = "i" + (h2++).toString(36), d2.set(b2, w2), m2.push(`[data-sdi="${w2}"]{${b2}}`)), ` data-sdi="${w2}"`;
    }, p2 = "";
    for (let y2 of r2) p2 += y2.intern ? y2.text.replace(l2, g2) : y2.text;
    return t2.slice(0, n2) + m2.join("") + p2;
  }
  function uh(t2, e2, n2) {
    let o2 = /* @__PURE__ */ new Set();
    if (!e2 && !n2) return o2;
    if (!t2 || t2.querySelector("[data-sdi]")) return null;
    let r2 = (l2) => {
      let u2 = l2.getAttribute("style");
      u2 && o2.add(u2);
    };
    if (n2 && t2.querySelectorAll("[data-snapdom-asset][style]").forEach(r2), e2) try {
      let l2 = (u2) => {
        for (let c2 of u2) {
          if (c2.type === CSSRule.IMPORT_RULE || c2.type === CSSRule.NAMESPACE_RULE) throw new Error("External or namespaced CSS");
          if (c2.selectorText) {
            if (/\[\s*style\b|data-sdi|\[[^\]]*\\|&/i.test(c2.selectorText)) throw new Error("Attribute-dependent or nested CSS");
            t2.querySelectorAll(c2.selectorText).forEach(r2);
          }
          c2.cssRules && l2(c2.cssRules);
        }
      };
      for (let u2 of [...t2.querySelectorAll("style")].slice(1)) {
        let c2 = u2.textContent || "";
        if (/@import\b/i.test(c2)) return null;
        let f2 = new CSSStyleSheet();
        f2.replaceSync(c2), l2(f2.cssRules);
      }
    } catch {
      return null;
    }
    let i2 = /* @__PURE__ */ new Set(), s2 = document.createElement("div"), a2 = new XMLSerializer();
    for (let l2 of o2) {
      s2.setAttribute("style", l2);
      let u2 = a2.serializeToString(s2).match(/ style="([^"]*)"/);
      u2 && i2.add(u2[1]);
    }
    return i2;
  }
  async function zo(t2, e2) {
    let { clipWindow: n2, outerTransforms: o2, outerShadows: r2, rootTransform2D: i2, fontsCSS: s2, universe: a2 } = e2, l2 = t2.options;
    if (t2 !== l2) {
      let { options: K, ...Q } = t2;
      t2 = Object.assign(l2, Q), Object.defineProperty(t2, "options", { value: t2, configurable: true });
    }
    let u2, c2;
    _o(t2, s2, a2), await Zt("beforeRender", t2);
    let f2 = O(t2.element), d2 = t2.element.getBoundingClientRect(), h2 = Math.max(1, H(t2.element.offsetWidth || parseFloat(f2.width) || d2.width || 1)), m2 = Math.max(1, H(t2.element.offsetHeight || parseFloat(f2.height) || d2.height || 1)), g2 = t2.element.ownerDocument || document, p2 = !n2 && (t2.element === g2.body || t2.element === g2.documentElement) && !t2.__pinned, y2 = null, b2 = null, w2 = 0;
    if (p2) {
      let K = Math.max(t2.element.scrollHeight || 0, g2.documentElement?.scrollHeight || 0, g2.body?.scrollHeight || 0), Q = Math.max(t2.element.scrollWidth || 0, g2.documentElement?.scrollWidth || 0, g2.body?.scrollWidth || 0), ot = Math.max(h2, H(Q)), it = t2.element === g2.body, Tt = it && O(g2.documentElement).direction === "rtl", mt = (J) => {
        J > 0 && (Tt ? w2 = Math.max(w2, H(J - d2.width)) : h2 = Math.max(h2, H(J)));
      };
      if (it && g2.documentElement) {
        let J = g2.documentElement.getBoundingClientRect(), ct = { top: Math.max(0, d2.top - J.top), right: Math.max(0, J.right - d2.right), bottom: Math.max(0, J.bottom - d2.bottom), left: Math.max(0, d2.left - J.left) };
        if (y2 = ct, r2 !== "subtree" && (ct.top || ct.right || ct.bottom || ct.left)) {
          let bt = t2.__session?.styleMap, pn = /* @__PURE__ */ new Map(), Hn = /* @__PURE__ */ new Map();
          for (let [oe, Ot] of t2.nodeMap) {
            let Dt = bt?.get(oe);
            if (Dt) {
              let rr = pn.get(Dt);
              if (rr === void 0 && pn.set(Dt, rr = ch.test(Dt)), !rr) continue;
            }
            Hn.set(oe, Ot);
          }
          let qt = ti(t2.element, Hn, t2.styleCache, d2.width > 0 ? h2 / d2.width : 1, d2.height > 0 ? m2 / d2.height : 1);
          b2 = { top: Math.min(qt.top, ct.top), right: Math.min(qt.right, ct.right), bottom: Math.min(qt.bottom, ct.bottom), left: Math.min(qt.left, ct.left) };
        }
        K = Math.max(t2.element.scrollHeight || 0, an(K, J.height, d2.top - J.top, d2.bottom - J.top)), Q = Math.max(t2.element.scrollWidth || 0, Tt ? an(Q, J.width, J.right - d2.right, J.right - d2.left) : an(Q, J.width, d2.left - J.left, d2.right - J.left));
      }
      K > 0 && (m2 = Math.max(m2, H(K))), mt(Q);
      try {
        let J = (t2.scrollbarCSS || "").length + (t2.baseCSS || "").length + (t2.fontsCSS || "").length + (t2.classCSS || "").length, ct = j.measureHints.get(t2.element);
        if (ct && ct.cssLen === J && ct.w0 === ot && ct.docH === K && ct.docW === Q) ct.csh > 0 && (m2 = Math.max(m2, H(ct.csh))), mt(ct.csw);
        else {
          let bt = g2.createElement("div");
          tt(bt), bt.style.cssText = "position:absolute!important;left:-9999px!important;top:0!important;width:" + ot + "px!important;overflow:visible!important;visibility:hidden!important;";
          let pn = bt.attachShadow({ mode: "open" });
          Ln(pn, (t2.scrollbarCSS || "") + t2.baseCSS + "svg{overflow:visible;} foreignObject{overflow:visible;}" + t2.classCSS);
          let Hn = pn.appendChild(si(t2.clone));
          g2.body.appendChild(bt);
          let qt = bt.scrollHeight, oe = bt.scrollWidth;
          if (it) {
            let Ot = bt.getBoundingClientRect(), Dt = Hn.getBoundingClientRect();
            qt = an(qt, Ot.height, Dt.top - Ot.top, Dt.bottom - Ot.top), oe = Tt ? an(oe, Ot.width, Ot.right - Dt.right, Ot.right - Dt.left) : an(oe, Ot.width, Dt.left - Ot.left, Dt.right - Ot.left);
          }
          g2.body.removeChild(bt), j.measureHints.set(t2.element, { cssLen: J, w0: ot, docH: K, docW: Q, csh: qt, csw: oe }), qt > 0 && (m2 = Math.max(m2, H(qt))), mt(oe);
        }
      } catch {
      }
    }
    if (t2.options?.excludeMode === "remove" || typeof t2.options?.filter == "function" && t2.options.filterMode === "remove") {
      let K = ii(t2.element, t2.options), Q = 1, ot = ii(t2.element, {}), it = Math.max(2, m2 * 0.15);
      Number.isFinite(ot) && ot >= m2 - it && Number.isFinite(K) && K > 0 && (m2 = Math.max(1, Math.min(m2, H(K + Q))));
    }
    if (t2.options?.reconcile) try {
      let K = (t2.scrollbarCSS || "") + t2.baseCSS + "svg{overflow:visible;} foreignObject{overflow:visible;}" + t2.classCSS;
      ul(t2.element, t2.clone, K, t2.nodeMap, h2, m2);
    } catch (K) {
      nt(t2.options.__session, "reconcile-failed", "reconcile pass failed", K), D(t2.options, "reconcile couldn't run; captured without it.", K);
    }
    let S2 = (K, Q = NaN) => {
      let ot = typeof K == "string" ? parseFloat(K) : K;
      return Number.isFinite(ot) ? ot : Q;
    }, v2 = S2(t2.options.width), C = S2(t2.options.height), M = n2 ? H(n2.width) : h2, $2 = n2 ? H(n2.height) : m2, F = M, A = $2, x2 = Number.isFinite(v2), _2 = Number.isFinite(C), P = $2 > 0 ? M / $2 : 1;
    x2 && _2 ? (F = Math.max(1, H(v2)), A = Math.max(1, H(C))) : x2 ? (F = Math.max(1, H(v2)), A = Math.max(1, H(F / (P || 1)))) : _2 && (A = Math.max(1, H(C)), F = Math.max(1, H(A * (P || 1))));
    let E = 0, R = 0, L = h2, k = m2;
    if (n2) {
      let K = 0, Q = 0;
      if (mi(t2.element)) {
        let it = null;
        if (!o2 && i2 && Number.isFinite(i2.a)) it = { a: i2.a, b: i2.b || 0, c: i2.c || 0, d: i2.d || 1, e: 0, f: 0 };
        else {
          let Tt = ke(t2.element), mt = ri(f2.transform && f2.transform !== "none" ? f2.transform : "", Tt);
          mt && mt.is2D && (it = { a: mt.a, b: mt.b, c: mt.c, d: mt.d, e: 0, f: 0 });
        }
        if (it && !(it.a === 1 && it.b === 0 && it.c === 0 && it.d === 1)) {
          let { ox: Tt, oy: mt } = Tn(f2, h2, m2), J = tn(h2, m2, it, Tt, mt);
          K = J.minX, Q = J.minY;
        }
      }
      let ot = Y() ? 0 : (l2.dpr || 1) * (x2 || _2 ? F / M : l2.scale || 1);
      E = H(ot ? Math.round((n2.x + K) * ot) / ot : n2.x + K), R = H(ot ? Math.round((n2.y + Q) * ot) / ot : n2.y + Q), L = H(E + n2.width), k = H(R + n2.height);
    } else if (!o2 && i2 && Number.isFinite(i2.a)) {
      let K = { a: i2.a, b: i2.b || 0, c: i2.c || 0, d: i2.d || 1, e: 0, f: 0 }, Q = tn(h2, m2, K, 0, 0);
      E = H(Q.minX), R = H(Q.minY), L = H(Q.maxX), k = H(Q.maxY);
    } else if (o2 && mi(t2.element)) {
      let Q = f2.transform && f2.transform !== "none" ? f2.transform : "", ot = ke(t2.element), it = de({ baseTransform: Q, rotate: ot.rotate || "0deg", scale: ot.scale, translate: ot.translate, width: h2, height: m2 }), { ox: Tt, oy: mt } = Tn(f2, h2, m2), J = it.is2D ? it : new DOMMatrix(it.toString()), ct = { a: J.a, b: J.b, c: J.c, d: J.d, e: 0, f: 0 }, bt = tn(h2, m2, ct, Tt, mt);
      E = H(bt.minX), R = H(bt.minY), L = H(bt.maxX), k = H(bt.maxY);
    }
    let I = Yr(f2), W = Kr(f2), T = Jr(f2), N = Qr(f2), U = Zr(f2), z = d2.width > 0 ? (L - E) / d2.width : 1, V = d2.height > 0 ? (k - R) / d2.height : 1, B = r2 === "subtree" && !n2 ? ti(t2.element, t2.nodeMap, t2.styleCache, z, V) : { top: 0, right: 0, bottom: 0, left: 0 };
    b2 && (B = { top: b2.top, right: Math.max(0, b2.right - (h2 - d2.width)), bottom: Math.max(0, b2.bottom - (m2 - d2.height)), left: b2.left }), w2 > 0 && (B = { ...B, left: Math.max(B.left, w2) });
    let rt = n2 ? { top: 0, right: 0, bottom: 0, left: 0 } : r2 ? { top: H(Math.max(I.top, W.top, B.top) + T.top + N.top + U.bleed.top), right: H(Math.max(I.right, W.right, B.right) + T.right + N.right + U.bleed.right), bottom: H(Math.max(I.bottom, W.bottom, B.bottom) + T.bottom + N.bottom + U.bleed.bottom), left: H(Math.max(I.left, W.left, B.left) + T.left + N.left + U.bleed.left) } : { top: H(T.top + B.top), right: H(T.right + B.right), bottom: H(T.bottom + B.bottom), left: H(T.left + B.left) };
    E = H(E - rt.left), R = H(R - rt.top), L = H(L + rt.right), k = H(k + rt.bottom);
    let at = Math.max(1, H(L - E)), pt = Math.max(1, H(k - R)), St = "http://www.w3.org/2000/svg", ee = mi(t2.element) ? 2 : 0, It = H(ee + (o2 ? 0 : 1)), $e = l2.__subpixel?.x || 0, q = l2.__subpixel?.y || 0, X = Math.ceil(at + It * 2 + $e), G = Math.ceil(pt + It * 2 + q), ht = H(-(H(E) - It)), Z = H(-(H(R) - It)), zn = g2.defaultView || window, lt = !Y() && CSS.supports("zoom", "2") ? dh(zn) : 1;
    l2.__layoutZoom = lt;
    let dn = n2 && !Y(), ne = dn ? H(ht - Math.floor(ht * lt + 0.01) / lt) : 0, $t = dn ? H(Z - Math.floor(Z * lt + 0.01) / lt) : 0, Te = Math.min(0, ht - ne) - (ne ? 1 / lt : 0), Vt = Math.min(0, Z - $t) - ($t ? 1 / lt : 0), me = ht - ne - Te + $e, Pe = Z - $t - Vt + q, Ne = H(X - Te), Gt = H(G - Vt), Wt = document.createElementNS(St, "foreignObject");
    Wt.setAttribute("x", String(Te * lt)), Wt.setAttribute("y", String(Vt * lt)), Wt.setAttribute("width", String(Ne * lt)), Wt.setAttribute("height", String(Gt * lt)), Wt.style.overflow = "visible";
    let ji = document.createElement("style"), Ic = "svg{overflow:visible;} foreignObject{overflow:visible;} foreignObject>div{-webkit-text-size-adjust:100%!important;text-size-adjust:100%!important;}";
    ji.textContent = (t2.scrollbarCSS || "") + t2.baseCSS + t2.fontsCSS + Ic + t2.classCSS, Wt.appendChild(ji);
    let Le = document.createElement("div");
    Le.setAttribute("xmlns", "http://www.w3.org/1999/xhtml"), Le.style.cssText = `all:initial;box-sizing:border-box;display:block;overflow:visible;width:${l2.__subpixel ? H(me + d2.width) : Ne}px;height:${Gt}px` + (me !== 0 || Pe !== 0 ? `;padding:${Pe}px 0 0 ${me}px !important` : "") + (lt !== 1 ? `;zoom:${lt} !important` : "") + ";direction:ltr !important" + (y2 ? lh(g2) : ""), y2 && (me !== y2.left || Pe !== y2.top) && t2.__session && rl(t2.element, t2.nodeMap, t2.__session.styleMap, t2.styleCache, me - y2.left, Pe - y2.top), Le.appendChild(t2.clone), Wt.appendChild(Le);
    let Vi = new XMLSerializer(), Wc = Vi.serializeToString(Wt), Gi = x2 || _2, Oc = Object.freeze({ w0: M, h0: $2, vbW: X, vbH: G, targetW: F, targetH: A, contentX: H(ht + (n2 ? E : 0)), contentY: H(Z + (n2 ? R : 0)), clip: n2 ? Object.freeze({ x: H(E), y: H(R), width: M, height: $2 }) : null });
    Object.defineProperty(l2, "meta", { value: Oc, enumerable: true, writable: false, configurable: true });
    let Dc = !Gi || Y() ? X : x2 ? F : H(X * (A / G)), Bc = !Gi || Y() ? G : _2 ? A : H(G * (F / X)), zc = parseFloat(O(g2.documentElement)?.fontSize) || 16, nr = [ne || $t ? `translate(${ne} ${$t})` : "", lt !== 1 ? `scale(${1 / lt})` : ""].join(" ").trim(), Un = `<svg xmlns="${St}" width="${Dc}" height="${Bc}" viewBox="0 0 ${X} ${G}" font-size="${zc}px">${nr ? `<g transform="${nr}">` : ""}`, qi = nr ? "</g></svg>" : "</svg>";
    if (c2 = Un + fh(Wc, Wt) + qi, l2.__fileSvg = null, lt !== 1) {
      let K = (mt) => {
        let J = Vi.serializeToString(mt.cloneNode(false));
        return J.slice(0, J.indexOf(">") + 1).replace(/\/>$/, ">");
      }, Q = Wt.cloneNode(false);
      Q.setAttribute("x", String(Te)), Q.setAttribute("y", String(Vt)), Q.setAttribute("width", String(Ne)), Q.setAttribute("height", String(Gt));
      let ot = Le.cloneNode(false);
      ot.style.removeProperty("zoom");
      let it = ne || $t ? `translate(${ne} ${$t})` : "", Tt = Un.slice(0, Un.indexOf(">") + 1) + (it ? `<g transform="${it}">` : "");
      l2.__fileSvg = { zoomed: [Un + K(Wt), K(Le), qi], flat: [Tt + K(Q), K(ot), it ? "</g></svg>" : "</svg>"] };
    }
    u2 = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(c2)}`, t2.svgString = c2, t2.dataURL = u2, l2.__artifacts = { classCSS: t2.classCSS || "", fontsCSS: t2.fontsCSS || "", baseCSS: t2.baseCSS || "", scrollbarCSS: t2.scrollbarCSS || "" }, await Zt("afterRender", t2), t2.clone = t2.nodeMap = t2.styleCache = t2.svgString = null;
    let or = [...document.querySelectorAll("#snapdom-sandbox")].find(Xt);
    return or && or.style.position === "absolute" && or.remove(), t2.dataURL;
  }
  function mi(t2) {
    return tl(t2);
  }
  function dh(t2) {
    let e2 = t2.devicePixelRatio || 1;
    if (e2 === 1) return 1;
    let n2 = t2.document, o2 = e2;
    try {
      let r2 = n2.createElement("div");
      tt(r2), r2.style.cssText = "position:absolute!important;left:-9999px!important;top:0!important;width:0!important;height:0!important;visibility:hidden!important;pointer-events:none!important;border:0 solid transparent!important;border-top-width:0.5px!important", (n2.body || n2.documentElement).appendChild(r2);
      let i2 = parseFloat(t2.getComputedStyle(r2).borderTopWidth);
      r2.remove(), i2 >= 1 && (o2 = 1);
    } catch {
    }
    return o2;
  }
  function mh(t2) {
    let e2 = Array.isArray(t2.plugins) ? t2.plugins : di(), n2 = [];
    for (let o2 of e2) {
      let r2 = sn(o2);
      r2 && typeof r2.resolveNode == "function" && n2.push(r2.resolveNode.bind(r2));
    }
    return n2.length ? n2 : null;
  }
  async function Dl(t2, e2) {
    if (!t2) throw new Error("[SnapDOM] The element cannot be null or undefined.");
    e2.__session = ci(e2.cache), delete e2.__compressedAssets, delete e2.__compressedSnapshot, delete e2.__compressionDensity, e2.__resolveNodeHooks = mh(e2);
    let n2 = e2;
    n2.element = t2, Object.defineProperty(n2, "options", { value: n2, configurable: true });
    let o2, r2, i2, s2, a2, l2, u2, c2, f2, d2 = "", h2 = null, m2 = e2.needs || kt, g2 = n2.format, p2 = n2.type;
    await Zt("beforeSnap", n2);
    let y2 = n2.format !== g2 && /^(?:png|jpe?g|webp|svg)$/i.test(n2.format), b2 = n2.type !== p2 && /^(?:png|jpe?g|webp|svg)$/i.test(n2.type);
    if (y2 || b2) {
      let E = String(y2 ? n2.format : n2.type).toLowerCase();
      n2.format = E === "jpg" ? "jpeg" : E, n2.type = n2.format, n2.__explicitFormat = n2.format, /^(?:jpeg|webp)$/.test(n2.format) && (n2.backgroundColor == null || n2.backgroundColor === "transparent") && (n2.backgroundColor = "#ffffff");
    }
    await Zt("beforeClone", n2);
    let w2 = n2.outerTransforms !== false, S2 = n2.outerShadows === "subtree" ? "subtree" : !!n2.outerShadows, v2 = n2.clip ? Mo(n2.element, n2.clip) : null;
    if (e2.__styleShare === void 0) try {
      e2.__styleShare = Rs(n2.element) && (typeof n2.element.getAnimations != "function" || n2.element.getAnimations({ subtree: true }).length === 0);
    } catch {
      e2.__styleShare = false;
    }
    let C = gs(e2.fast);
    for (; ; ) {
      e2.__slicer = C;
      let E = Po(n2.element, v2);
      try {
        ({ clone: o2, classCSS: r2, classPrefixCSS: i2, styleCache: s2, nodeMap: a2, reconcileRisk: l2, clipWindow: u2, standIns: c2, universe: f2 } = await pl(n2.element, n2.options)), l2 > 0 && !e2.reconcile && (nt(e2.__session, "reconcile-risk", "text in inline/table-cell elements kept natural width and may re-wrap; pass { reconcile: true } for pixel-exact layout"), e2.debug && !j.warnedReconcile && (j.warnedReconcile = true, D(e2, "Some text may wrap differently in the capture. Pass { reconcile: true } to fix it (about 2x slower)."))), !w2 && o2 && (h2 = Za(n2.element, o2)), !S2 && o2 && sl(n2.element, o2, n2.options), o2 && (cl(n2.element, o2, a2, c2), al(n2.element, o2));
      } finally {
        E();
      }
      if (!C?.yielded || !e2.__tornSinceStart?.()) break;
      C = null, e2.__session = ci(e2.cache);
    }
    if (e2.__slicer = null, n2.clone = o2, n2.classCSS = r2, n2.styleCache = s2, n2.nodeMap = a2, await Zt("afterClone", n2), !on(m2, "render")) return null;
    if (C?.due() && await C.pause(), Ao(n2.clone), n2.options?.excludeMode === "remove" || typeof n2.options?.filter == "function" && n2.options.filterMode === "remove") try {
      fl(n2.element, n2.clone, n2.styleCache, n2.nodeMap);
    } catch (E) {
      nt(e2.__session, "shrink-failed", "shrink pass failed", E), D(e2, "Couldn't close the gaps left by removed elements.", E);
    }
    try {
      await uo(n2.clone, n2.element, n2.nodeMap);
    } catch {
    }
    try {
      let E = e2.__session?.styleMap;
      E && po(E.keys(), E, n2.nodeMap, n2.options.__iconMatchers);
    } catch {
    }
    let M = (E) => Promise.resolve().then(E), $2 = (async () => {
      await Promise.all([M(() => Ro(n2.clone, n2.options)), M(() => $o(n2.element, n2.clone, n2.styleCache, n2.options, n2.nodeMap))]);
      try {
        gl(n2.element, n2.clone, n2.nodeMap);
      } catch (E) {
        nt(e2.__session, "backdrop-filter-failed", "backdrop-filter emulation failed", E), D(e2, "Couldn't reproduce a backdrop-filter; captured without it.", E);
      }
      if (e2.compress && (e2.__compressionClip = u2, e2.__compressionRootTransform = h2, await M(() => Bo(n2.clone, n2.options, n2.nodeMap))), e2.captureSelection) try {
        da(n2.nodeMap);
      } catch (E) {
        nt(e2.__session, "selection-compose-failed", "field selection compose failed", E);
      }
    })(), F = Promise.resolve();
    (e2.embedFonts === "auto" ? ((n2.element.ownerDocument || document).fonts?.size || 0) > 0 : e2.embedFonts) && (F = M(async () => {
      let E = n2.element.ownerDocument || document, R = v2 ? (T) => {
        try {
          let N = T.getBoundingClientRect();
          return N.right >= v2.left - 200 && N.left <= v2.right + 200 && N.bottom >= v2.top - 200 && N.top <= v2.bottom + 200;
        } catch {
          return true;
        }
      } : null, { required: L, usedCodepoints: k } = !v2 && e2.__fontUsage || xo(n2.element, R), I = L, W = L;
      if (e2.embedFonts === "auto") {
        let { declared: T, drawn: N } = wo(E), U = (z) => Fn(z).toLowerCase();
        if (I = new Set(Array.from(L).filter((z) => N.has(U(z)))), !I.size) return;
        W = new Set(Array.from(L).filter((z) => N.has(U(z)) || !T.has(U(z))));
      }
      Y() && await So(I, k, E), d2 = await La({ required: W, usedCodepoints: k, exclude: n2.options.excludeFonts, localFonts: n2.options.localFonts, useProxy: n2.options.useProxy, fontStylesheetDomains: n2.options.fontStylesheetDomains, iconMatchers: n2.options.__iconMatchers, doc: E, debug: n2.options.debug });
    })), await Promise.all([$2, F]);
    let x2 = (n2.options.plugins || []).some((E) => E && (typeof E.beforeRender == "function" || typeof E.afterRender == "function"));
    if (n2.options.engine === "html-in-canvas" && !x2) {
      let { tryCanvasEngine: E } = await Promise.resolve().then(() => (Ol(), Wl));
      _o(n2, d2, f2);
      let R = await E(n2, n2.options);
      if (R) return R;
    }
    C?.due() && await C.pause();
    let _2 = n2.clone;
    Do(_2, e2.__compressedAssets);
    let P = await zo(n2, { clipWindow: u2, outerTransforms: w2, outerShadows: S2, rootTransform2D: h2, fontsCSS: d2, universe: f2 });
    if (e2.__compressedSnapshot = Oo(_2, e2.__compressedAssets), typeof e2.__retain == "function") try {
      e2.__retain({ clone: o2, nodeMap: a2, styleCache: s2, styleMap: e2.__session.styleMap, classPrefixCSS: i2, fontsCSS: d2, clipWindow: u2, outerTransforms: w2, outerShadows: S2, rootTransform2D: h2, __compressedAssets: e2.__compressedAssets, __compressionDensity: e2.__compressionDensity });
    } catch {
    }
    return P;
  }
  function Bl(t2 = {}) {
    let e2 = typeof t2.type == "string" && gh.has(t2.type.toLowerCase()) ? t2.type.toLowerCase() : null, n2 = t2.format ?? e2 ?? "png";
    n2 === "jpg" && (n2 = "jpeg");
    let o2 = t2.format != null ? n2 : e2 === "jpg" ? "jpeg" : e2, r2 = Xi(t2.cache), i2 = t2.exclude == null ? [] : Array.isArray(t2.exclude) ? t2.exclude : [t2.exclude], s2 = [], a2 = [];
    for (let f2 of i2) if (typeof f2 == "string") try {
      document.createDocumentFragment().querySelector(f2), s2.push(f2);
    } catch {
      D(t2, `Invalid exclude selector "${f2}"; ignored.`);
    }
    else typeof f2 == "function" ? a2.push(f2) : f2 != null && D(t2, "Ignored an exclude entry: use a CSS selector or a function.", f2);
    let l2 = t2.excludeMode ?? "hide", u2 = (f2) => {
      if (!f2 || f2.nodeType !== 1) return false;
      if (f2.getAttribute("data-capture") === "exclude") return true;
      for (let d2 of Array.isArray(c2.exclude) ? c2.exclude : []) try {
        if (f2.matches(d2)) return true;
      } catch {
      }
      for (let d2 of Array.isArray(c2.excludePredicates) ? c2.excludePredicates : []) try {
        if (d2(f2)) return true;
      } catch {
      }
      if (typeof c2.filter == "function") try {
        if (!c2.filter(f2)) return true;
      } catch {
      }
      return false;
    }, c2 = { debug: t2.debug ?? false, scale: t2.scale ?? 1, exclude: s2, excludePredicates: a2.length ? a2 : null, excludeMode: l2, filter: t2.filter ?? null, filterMode: t2.filterMode ?? "hide", shouldExclude: u2, placeholders: t2.placeholders !== false, captureSelection: t2.captureSelection ?? false, canvas: ft(t2.canvas, "canvas") ? t2.canvas : null, embedFonts: t2.embedFonts ?? "auto", iconFonts: Array.isArray(t2.iconFonts) ? t2.iconFonts : t2.iconFonts ? [t2.iconFonts] : [], __iconMatchers: Ma(t2.iconFonts, t2), localFonts: Array.isArray(t2.localFonts) ? t2.localFonts : [], excludeFonts: t2.excludeFonts ?? void 0, fontStylesheetDomains: Array.isArray(t2.fontStylesheetDomains) ? t2.fontStylesheetDomains : [], fallbackURL: t2.fallbackURL ?? void 0, cache: r2, __styleShare: t2.__styleShare, useProxy: typeof t2.useProxy == "string" ? t2.useProxy : "", width: t2.width ?? null, height: t2.height ?? null, format: n2, __explicitFormat: o2, type: n2, quality: t2.quality ?? 0.92, dpr: t2.dpr ?? (window.devicePixelRatio || 1), backgroundColor: t2.backgroundColor ?? (["jpeg", "webp"].includes(n2) ? "#ffffff" : null), filename: t2.filename ?? "snapDOM", outerTransforms: t2.outerTransforms ?? true, outerShadows: t2.outerShadows ?? false, reconcile: t2.reconcile ?? false, burst: t2.burst, fast: t2.fast === false || t2.fast === "auto" ? t2.fast : true, engine: t2.engine, invalidate: t2.invalidate ?? false, __pinned: t2.__pinned === true, __subpixel: t2.__subpixel ?? null, clip: t2.clip ?? null, compress: t2.compress !== false, excludeStyleProps: t2.excludeStyleProps ?? null, resolvePicturePlaceholders: t2.resolvePicturePlaceholders !== false };
    return c2;
  }
  function yh(t2) {
    try {
      return t2.matches?.("dialog,[popover]") || !!t2.querySelector?.("dialog,[popover]");
    } catch {
      return true;
    }
  }
  function wh(t2) {
    if (t2.__usesBackdropFilter !== void 0) return t2.__usesBackdropFilter;
    let e2 = false;
    for (let n2 of t2.styleMap.values()) if (bh.test(n2)) {
      e2 = true;
      break;
    }
    return t2.__usesBackdropFilter = e2, e2;
  }
  function xh(t2, e2) {
    let n2 = e2.has("backdrop-filter") || e2.has("-webkit-backdrop-filter");
    if (!n2 && (n2 = ((i2) => /(?:^|;)\s*(?:-webkit-)?backdrop-filter\s*:/i.test(i2.getAttribute?.("style") || ""))(t2), !n2)) try {
      n2 = !!t2.querySelector?.('[style*="backdrop-filter" i]');
    } catch {
      n2 = true;
    }
    if (!n2) return false;
    let o2 = [t2];
    t2.querySelectorAll && o2.push(...t2.querySelectorAll("*"));
    for (let r2 of o2) {
      let i2 = getComputedStyle(r2), s2 = i2.getPropertyValue("backdrop-filter") || i2.getPropertyValue("-webkit-backdrop-filter");
      if (s2 && s2 !== "none") return true;
    }
    return false;
  }
  function vh(t2, e2) {
    if (t2 === e2) return true;
    if (!t2.endsWith("px") || !e2.endsWith("px")) return false;
    let n2 = parseFloat(t2), o2 = parseFloat(e2);
    return Number.isFinite(n2) && Number.isFinite(o2) && Math.abs(n2 - o2) <= Sh;
  }
  function kh(t2) {
    let e2 = Uo.get(t2);
    if (e2 === void 0) {
      e2 = null;
      for (let n2 of Ch) {
        let o2 = t2.match(new RegExp("(?:^|;)" + n2 + ":([^;]+)"));
        o2 && o2[1].endsWith("px") && ((e2 || (e2 = {}))[n2] = o2[1]);
      }
      Uo.size > 5e3 && Uo.clear(), Uo.set(t2, e2);
    }
    return e2;
  }
  function Mh(t2) {
    if (!(!t2.classList || !t2.classList.length)) for (let e2 of Array.from(t2.classList)) /^c\d+$/.test(e2) && t2.classList.remove(e2);
  }
  function Ah(t2, e2) {
    let n2 = [t2];
    for (; n2.length; ) {
      let o2 = n2.pop();
      if (o2.nodeType === 1) {
        let r2 = e2.nodeMap.get(o2);
        r2 !== void 0 && (e2.nodeMap.delete(o2), e2.srcToClone.get(r2) === o2 && e2.srcToClone.delete(r2)), e2.styleMap.delete(o2);
      }
      for (let r2 = o2.firstChild; r2; r2 = r2.nextSibling) n2.push(r2);
    }
  }
  async function Ul(t2, e2, n2) {
    gi.attempts++;
    try {
      let o2 = await _h(t2, e2, n2);
      return o2 && gi.served++, o2;
    } catch {
      return null;
    }
  }
  async function _h(t2, e2, n2) {
    let o2 = e2.retained;
    if (!o2 || !o2.clone || !o2.styleMap || !o2.srcToClone || n2.reconcile || n2.clip || n2.captureSelection || o2.clipWindow || t2.scrollTop || t2.scrollLeft || yh(t2) || wh(o2) || o2.fontsCSS || Lo(n2)) return null;
    for (let d2 of n2.plugins || []) if (d2 && (typeof d2.beforeSnap == "function" || typeof d2.beforeClone == "function" || typeof d2.resolveNode == "function" || typeof d2.afterClone == "function")) return null;
    if (o2.classPrefixCSS && (o2.classPrefixCSS.includes("::marker") || o2.classPrefixCSS.includes("::first-line")) || n2.excludeMode === "remove") return null;
    let r2 = t2.ownerDocument || document, i2 = qe(t2);
    if (!i2 || Es(r2)) return null;
    let s2 = [];
    t: for (let d2 of e2.dirtyRoots) {
      if (!d2.isConnected || d2 === t2 || !t2.contains(d2)) return null;
      for (let h2 of e2.dirtyRoots) if (h2 !== d2 && h2 !== t2 && h2.contains(d2)) continue t;
      s2.push(d2);
    }
    if (!s2.length) return null;
    n2.__compressedAssets = o2.__compressedAssets, n2.__compressionDensity = o2.__compressionDensity, n2.__compressionRootTransform = o2.rootTransform2D;
    for (let d2 of s2) {
      if (d2.parentElement === t2 || d2.matches?.(zl) || d2.querySelector?.(zl) || xh(d2, i2)) return null;
      let h2 = o2.srcToClone.get(d2);
      if (!h2 || !h2.parentNode) return null;
      let m2 = /* @__PURE__ */ new Map(), g2 = { styleMap: o2.styleMap, styleCache: o2.styleCache, nodeMap: m2, options: n2 }, p2 = Po(d2, null), y2 = ko(d2), b2;
      try {
        b2 = await ue(d2, g2, n2);
      } finally {
        y2(), p2();
      }
      if (!b2 || b2.nodeType !== 1 || b2.querySelector?.("style[data-sd]") || (await Ze(d2, b2, g2, n2), g2.__pseudoCSS) || g2.__usesPlaceholder && !o2.classPrefixCSS?.includes("[data-sd-ph]")) return null;
      await io(b2, g2), Ao(b2);
      try {
        await uo(b2, d2, m2);
      } catch {
      }
      try {
        po([b2, ...b2.querySelectorAll("*")], o2.styleMap, m2, n2.__iconMatchers);
      } catch {
      }
      if (await Promise.all([Ro(b2, n2), $o(d2, b2, o2.styleCache, n2, m2)]), n2.compress) try {
        await Bo(b2, n2, m2);
      } catch {
      }
      for (let [w2, S2] of m2.entries()) li(w2, S2, m2, o2.styleCache);
      h2.replaceWith(b2), Ah(h2, o2);
      for (let [w2, S2] of m2.entries()) o2.nodeMap.set(w2, S2), o2.srcToClone.set(S2, w2);
    }
    let a2 = { styleMap: o2.styleMap, styleCache: o2.styleCache, nodeMap: o2.nodeMap, options: n2 }, l2 = /* @__PURE__ */ new WeakSet();
    for (let [d2, h2] of o2.nodeMap.entries()) {
      if (!h2 || h2.nodeType !== 1 || !h2.isConnected) continue;
      let m2 = o2.styleMap.get(d2);
      if (!m2) continue;
      let g2 = kh(m2);
      if (!g2) continue;
      let p2 = null, y2 = false;
      for (let b2 in g2) {
        p2 || (p2 = getComputedStyle(h2));
        let w2 = p2.getPropertyValue(b2);
        if (b2 === "min-width" && w2 === "auto" && !l2.has(h2.parentElement)) {
          let S2 = parseFloat(p2.width);
          p2.boxSizing !== "border-box" && m2.includes("box-sizing:border-box") && (S2 += ["padding-left", "padding-right", "border-left-width", "border-right-width"].reduce((v2, C) => v2 + (parseFloat(p2.getPropertyValue(C)) || 0), 0)), w2 = `${S2}px`;
        }
        if (!vh(w2, g2[b2])) {
          y2 = true;
          break;
        }
      }
      if (y2) {
        if (n2.__compressedAssets?.has(d2)) return null;
        l2.add(h2), gi.reconciled++, await xt(h2, d2, a2, n2);
      }
    }
    let u2 = yn(o2.styleMap);
    for (let [d2, h2] of o2.styleMap.entries()) Mh(d2), ai(d2, h2, u2);
    let c2 = (o2.classPrefixCSS || "") + Array.from(u2.entries()).map(([d2, h2]) => `.${h2}{${d2}}`).join("");
    if (qe(t2) !== i2) return null;
    Do(o2.clone, n2.__compressedAssets);
    let f2 = await zo({ element: t2, options: n2, plugins: n2.plugins, clone: o2.clone, classCSS: c2, styleCache: o2.styleCache, nodeMap: o2.nodeMap }, { clipWindow: null, outerTransforms: o2.outerTransforms, outerShadows: o2.outerShadows, rootTransform2D: o2.rootTransform2D, fontsCSS: o2.fontsCSS || "", universe: i2 });
    return n2.__compressedSnapshot = Oo(o2.clone, n2.__compressedAssets), o2.__compressedAssets = n2.__compressedAssets, o2.__compressionDensity = n2.__compressionDensity, f2;
  }
  function Fh(t2) {
    let e2 = t2?.defaultView;
    return typeof e2?.matchMedia != "function" ? "" : Rh.map((n2) => {
      try {
        return e2.matchMedia(n2).matches ? "1" : "0";
      } catch {
        return "?";
      }
    }).join("");
  }
  function Hl(t2) {
    let e2 = [];
    for (let n2 = t2; n2; ) {
      try {
        let o2 = n2.getBoundingClientRect();
        e2.push(o2.x, o2.y, o2.width, o2.height);
      } catch {
        e2.push("?");
      }
      n2.parentElement ? n2 = n2.parentElement : n2 = Bt(n2) || null;
    }
    return e2.join("|");
  }
  function jl(t2, e2) {
    if (e2.disposed || (Wn.delete(t2), Wn.set(t2, e2), Wn.size <= Eh)) return;
    let [n2, o2] = Wn.entries().next().value;
    ec(n2, o2);
  }
  function ec(t2, e2) {
    e2.disposed = true, Wn.delete(t2), bi.delete(t2);
    for (let n2 of e2.observers) try {
      n2.disconnect();
    } catch {
    }
    for (let n2 of tc) t2.removeEventListener(n2, e2.onMediaDirty, true);
    for (let n2 of e2.trackedShadowRoots.keys()) for (let o2 of xi) n2.removeEventListener(o2, e2.onMediaDirty, true);
    for (let [n2, o2] of e2.trackedImages) n2.removeEventListener("load", o2), n2.removeEventListener("error", o2);
    e2.trackedImages.clear(), e2.trackedShadowRoots.clear(), e2.images.length = 0, e2.controls.length = 0, e2.scrollNodes.length = 0, e2.observers.length = 0, e2.last = null, e2.retained = null, e2.retainedFrameDriven = false;
  }
  function nc(t2) {
    if (Zl.has(t2)) return false;
    jo.delete(t2);
    let e2 = [t2], n2 = [], o2 = [];
    for (let r2 = 0; r2 < e2.length; r2++) {
      let i2 = e2[r2], s2 = [];
      i2?.nodeType === 1 && s2.push(i2);
      try {
        s2.push(...i2.querySelectorAll("*"));
      } catch {
        return false;
      }
      for (let a2 of s2) {
        a2.shadowRoot && e2.push(a2.shadowRoot);
        let l2 = String(a2.localName || a2.tagName || "").toLowerCase();
        if (/^(?:iframe|canvas|video|audio|object|embed|marquee|blink)$/.test(l2) || l2 === "progress" && !a2.hasAttribute("value") || /^(?:animate|animatetransform|animatemotion|set)$/.test(l2)) return false;
        let u2 = "";
        if (l2 === "img") {
          o2.push(a2);
          try {
            u2 = a2.currentSrc || a2.src || "";
          } catch {
          }
        }
        /^(?:input|textarea|select|option)$/.test(l2) && n2.push(a2);
        let c2 = a2.getAttribute?.("style") || "", f2 = yi.get(a2);
        if (u2 || c2) {
          if ((!f2 || f2.src !== u2 || f2.style !== c2) && (f2 = { src: u2, style: c2, animated: fn(u2) || fn(c2) }, yi.set(a2, f2)), f2.animated) return false;
        } else f2 && yi.delete(a2);
      }
    }
    return jo.set(t2, { roots: e2.slice(1), controls: n2, images: o2 }), true;
  }
  function wi(t2, e2) {
    if (!t2.querySelectorAll) return false;
    let n2 = jo.get(t2);
    jo.delete(t2);
    let o2 = new Set(n2?.roots || []);
    if (n2 && (e2.controls = n2.controls, e2.scannedImages = n2.images), !n2) {
      let r2 = [t2];
      for (let i2 = 0; i2 < r2.length; i2++) {
        let s2 = r2[i2];
        s2.shadowRoot && !o2.has(s2.shadowRoot) && (o2.add(s2.shadowRoot), r2.push(s2.shadowRoot));
        for (let a2 of s2.querySelectorAll("*")) a2.shadowRoot && !o2.has(a2.shadowRoot) && (o2.add(a2.shadowRoot), r2.push(a2.shadowRoot));
      }
    }
    for (let [r2, i2] of e2.trackedShadowRoots) if (!o2.has(r2)) {
      try {
        i2.disconnect();
      } catch {
      }
      for (let a2 of xi) r2.removeEventListener(a2, e2.onMediaDirty, true);
      e2.trackedShadowRoots.delete(r2);
      let s2 = e2.observers.indexOf(i2);
      s2 >= 0 && e2.observers.splice(s2, 1);
    }
    for (let r2 of o2) if (!e2.trackedShadowRoots.has(r2)) try {
      let i2 = new MutationObserver(e2.markDirty);
      i2.observe(r2, { subtree: true, childList: true, attributes: true, characterData: true, attributeOldValue: true, characterDataOldValue: true }), i2.__flush = e2.markDirty, e2.observers.push(i2), e2.trackedShadowRoots.set(r2, i2);
      for (let s2 of xi) r2.addEventListener(s2, e2.onMediaDirty, { capture: true, passive: true });
      e2.retained && e2.dirtyAll();
    } catch {
    }
    return !!n2;
  }
  function Vo(t2, e2) {
    return [t2, ...e2.trackedShadowRoots.keys()];
  }
  function Si(t2, e2) {
    let n2 = e2.scannedImages;
    if (e2.scannedImages = null, !n2) {
      n2 = [], t2.tagName === "IMG" && n2.push(t2);
      for (let o2 of Vo(t2, e2)) o2.querySelectorAll && n2.push(...o2.querySelectorAll("img"));
    }
    if (e2.images = n2, e2.trackedImages.size) {
      let o2 = new Set(n2);
      for (let [r2, i2] of e2.trackedImages) o2.has(r2) || (r2.removeEventListener("load", i2), r2.removeEventListener("error", i2), e2.trackedImages.delete(r2));
    }
    for (let o2 of n2) {
      if (o2.complete || e2.trackedImages.has(o2)) continue;
      let r2 = () => {
        e2.capturing && (e2.torn = true), e2.dirty = true, e2.dirtyRoots = null, o2.removeEventListener("load", r2), o2.removeEventListener("error", r2), e2.trackedImages.delete(o2);
      };
      e2.trackedImages.set(o2, r2), o2.addEventListener("load", r2), o2.addEventListener("error", r2);
    }
  }
  function Vl(t2) {
    let e2 = /* @__PURE__ */ new Map(), n2 = /* @__PURE__ */ new Map(), o2 = /* @__PURE__ */ new Map();
    for (let r2 of t2) if (xe(r2)) if (r2.type === "attributes") {
      let i2 = e2.get(r2.target);
      i2 || e2.set(r2.target, i2 = /* @__PURE__ */ new Map()), i2.has(r2.attributeName) || i2.set(r2.attributeName, r2.oldValue);
    } else if (r2.type === "characterData") n2.has(r2.target) || n2.set(r2.target, r2.oldValue);
    else if (r2.type === "childList") {
      let i2 = o2.get(r2.target);
      i2 || o2.set(r2.target, i2 = /* @__PURE__ */ new Map());
      for (let s2 of r2.addedNodes) {
        if (s2.nodeType !== 3) return true;
        i2.set(s2.data, (i2.get(s2.data) || 0) + 1);
      }
      for (let s2 of r2.removedNodes) {
        if (s2.nodeType !== 3) return true;
        i2.set(s2.data, (i2.get(s2.data) || 0) - 1);
      }
    } else return true;
    for (let [r2, i2] of e2) for (let [s2, a2] of i2) if (r2.getAttribute(s2) !== a2) return true;
    for (let [r2, i2] of n2) if (r2.data !== i2) return true;
    for (let r2 of o2.values()) for (let i2 of r2.values()) if (i2 !== 0) return true;
    return false;
  }
  function Th(t2, e2 = 131072) {
    if (t2 = String(t2 || "").trim(), !/^data:/i.test(t2)) return "";
    let n2 = t2.indexOf(",");
    if (n2 < 0) return "";
    let o2 = t2.slice(0, n2), r2 = t2.slice(n2 + 1);
    try {
      if (/;base64/i.test(o2)) {
        let i2 = Math.ceil(e2 / 3) * 4;
        return atob(r2.slice(0, i2 - i2 % 4));
      }
      return r2.slice(0, e2 * 3).replace(/%([0-9a-f]{2})/gi, (i2, s2) => String.fromCharCode(parseInt(s2, 16))).slice(0, e2);
    } catch {
      return "";
    }
  }
  function Ph(t2) {
    let e2 = (t2.match(/^data:([^;,]+)/i)?.[1] || "").toLowerCase();
    if (e2 === "image/gif" || e2 === "image/apng") return true;
    if (!/image\/(?:png|webp|avif|svg\+xml)/.test(e2)) return false;
    let n2 = Th(t2);
    return e2 === "image/png" ? n2.includes("acTL") : e2 === "image/webp" ? n2.includes("ANIM") || n2.includes("ANMF") || n2.includes("VP8X") && !!(n2.charCodeAt(n2.indexOf("VP8X") + 8) & 2) : e2 === "image/avif" ? n2.includes("avis") : /<(?:animate|animateTransform|animateMotion|set)\b|@keyframes\b|animation(?:-name)?\s*:/i.test(n2);
  }
  function Gl(t2) {
    let e2 = String(t2 || "").trim();
    return e2 ? $h.test(e2) ? true : /^data:/i.test(e2) ? Ph(e2) : false : false;
  }
  function fn(t2) {
    let e2 = String(t2 || "");
    if (Gl(e2)) return true;
    for (let n2 of e2.matchAll(/url\(\s*(?:"((?:\\.|[^"\\])*)"|'((?:\\.|[^'\\])*)'|([^)]*))\s*\)/gi)) if (Gl(n2[1] ?? n2[2] ?? n2[3])) return true;
    return false;
  }
  function ql(t2, e2 = null) {
    let n2 = t2 && t2.clone;
    if (!n2) return false;
    let o2 = e2 ? e2.map((r2) => t2.srcToClone?.get(r2)).filter(Boolean) : [n2];
    for (let r2 of o2) for (let i2 of oc(r2)) if (fn(i2.getAttribute?.("src")) || fn(i2.getAttribute?.("href")) || fn(i2.getAttribute?.("style")) || fn(t2.styleMap?.get(i2))) return true;
    return false;
  }
  function oc(t2) {
    let e2 = [];
    t2 && t2.nodeType === 1 && e2.push(t2);
    try {
      e2.push(...t2.querySelectorAll("*"));
    } catch {
    }
    return e2;
  }
  function vi(t2, e2) {
    let n2 = [], o2 = /* @__PURE__ */ new Set(), r2 = (i2) => {
      i2 && !o2.has(i2) && (o2.add(i2), n2.push(i2));
    };
    t2.matches?.("input,textarea,select,option") && r2(t2);
    for (let i2 of Vo(t2, e2)) try {
      for (let s2 of i2.querySelectorAll("input,textarea,select,option")) r2(s2);
    } catch {
    }
    e2.controls = n2;
  }
  function Ci(t2, e2) {
    let n2 = [], o2 = /* @__PURE__ */ new Set(), r2 = (i2, s2 = false) => {
      if (!(!i2 || o2.has(i2))) {
        o2.add(i2);
        try {
          (s2 || i2.scrollLeft || i2.scrollTop || i2.scrollWidth > i2.clientWidth || i2.scrollHeight > i2.clientHeight) && n2.push(i2);
        } catch {
        }
      }
    };
    for (let i2 = t2; i2; i2 = i2.parentElement) r2(i2, true);
    for (let i2 of Vo(t2, e2)) for (let s2 of oc(i2)) r2(s2);
    e2.scrollNodes = n2;
  }
  function Xl(t2, e2) {
    let n2 = t2.ownerDocument || document, o2 = n2.defaultView, r2 = [o2?.location?.hash || "", Fh(n2), o2?.innerWidth || 0, o2?.innerHeight || 0, o2?.devicePixelRatio || 1, o2?.screen?.orientation?.type || ""];
    try {
      r2.push(...[...n2.adoptedStyleSheets || []].map(cn));
    } catch {
    }
    for (let c2 of e2.trackedShadowRoots.keys()) try {
      r2.push("#shadow", ...[...c2.adoptedStyleSheets || []].map(cn));
    } catch {
    }
    let i2 = n2.activeElement, s2 = n2.fullscreenElement;
    (i2?.contains(t2) || t2.contains(i2)) && r2.push(cn(i2)), (s2?.contains(t2) || t2.contains(s2)) && r2.push(cn(s2));
    let a2 = [o2?.scrollX || 0, o2?.scrollY || 0];
    for (let c2 of e2.scrollNodes) a2.push(c2.scrollLeft || 0, c2.scrollTop || 0);
    let l2 = [];
    for (let c2 of e2.controls) {
      let f2 = String(c2.localName || "").toLowerCase();
      f2 === "input" ? l2.push(c2.type, mn(c2) ? c2.value.length : c2.value, c2.checked ? 1 : 0, c2.indeterminate ? 1 : 0) : f2 === "textarea" ? l2.push(c2.value) : f2 === "select" ? l2.push(c2.selectedIndex, c2.value) : l2.push(c2.selected ? 1 : 0);
    }
    let u2 = [];
    for (let c2 of e2.images) {
      let f2 = "";
      try {
        f2 = c2.currentSrc || c2.src || "";
      } catch {
      }
      u2.push(f2, c2.complete ? 1 : 0, c2.naturalWidth || 0, c2.naturalHeight || 0);
    }
    return { style: r2.join("|"), scroll: a2.join("|"), controls: l2, images: u2, frameDriven: e2.retainedFrameDriven };
  }
  function ln(t2, e2, n2) {
    if (!t2) return false;
    let o2 = t2[n2], r2 = e2[n2];
    if (o2 === r2) return true;
    if (!Array.isArray(o2) || o2.length !== r2.length) return false;
    for (let i2 = 0; i2 < o2.length; i2++) if (o2[i2] !== r2[i2]) return false;
    return true;
  }
  function Yl(t2, e2) {
    let n2 = /* @__PURE__ */ new Set();
    for (let o2 of Vo(t2, e2)) try {
      let r2 = o2.getAnimations?.(o2.nodeType === 1 ? { subtree: true } : void 0) || [];
      for (let i2 of r2) n2.add(i2);
    } catch {
    }
    return [...n2];
  }
  function Kl(t2) {
    return t2.map((e2) => [cn(e2), e2.playState, Math.round((Number(e2.currentTime) || 0) * 10), e2.playbackRate].join(":")).join("|");
  }
  function Nh(t2, e2, n2) {
    if (!n2 || n2.nodeType !== 1) return null;
    if (n2 === t2 || t2.contains(n2)) return t2;
    for (let o2 of e2.trackedShadowRoots.keys()) if (o2.contains(n2)) return o2;
    return null;
  }
  function Lh(t2) {
    let e2 = { dirty: true, pending: [], torn: false, dirtyRoots: /* @__PURE__ */ new Set(), retained: null, retainedFrameDriven: false, disposed: false, capturing: false, last: null, inflight: Promise.resolve(), observers: [], trackedShadowRoots: /* @__PURE__ */ new Map(), trackedImages: /* @__PURE__ */ new Map(), images: [], scannedImages: null, scrollNodes: [], controls: [], envEpoch: je(), styleEpoch: Se(), styleStamp: Mn(t2), outsideMutations: kn(t2), geometry: null, renderState: null }, n2 = () => {
      e2.dirty = true, e2.dirtyRoots = null;
    }, o2 = (a2) => {
      if (!e2.dirtyRoots) return;
      let l2 = a2 && (a2.nodeType === 1 ? a2 : a2.parentElement);
      if (!l2 || l2 === t2 || !t2.contains(l2) || e2.dirtyRoots.size >= 12) {
        e2.dirtyRoots = null;
        return;
      }
      e2.dirtyRoots.add(l2);
    }, r2 = (a2) => {
      if (e2.capturing) {
        for (let l2 of a2) e2.pending.push(l2);
        return;
      }
      for (let l2 of a2) xe(l2) && (e2.dirty = true, o2(l2.target));
    }, i2 = () => {
      if (e2.capturing) {
        e2.torn = true;
        return;
      }
      n2();
    };
    e2.dirtyAll = n2;
    try {
      let a2 = new MutationObserver(r2);
      a2.observe(t2, { subtree: true, childList: true, attributes: true, characterData: true, attributeOldValue: true, characterDataOldValue: true }), a2.__flush = r2, e2.observers.push(a2);
    } catch {
    }
    e2.markDirty = r2, e2.onMediaDirty = i2;
    try {
      for (let a2 of tc) t2.addEventListener(a2, i2, { capture: true, passive: true });
    } catch {
    }
    return wi(t2, e2) || vi(t2, e2), Ci(t2, e2), Si(t2, e2), e2;
  }
  function Ho(t2) {
    let e2 = Jl.get(t2);
    return e2 || (e2 = "@" + ++Ih, Jl.set(t2, e2)), e2;
  }
  function ki(t2, e2) {
    let n2 = typeof t2;
    if (n2 === "undefined") return null;
    if (t2 === null || n2 === "boolean" || n2 === "number" || n2 === "string") return JSON.stringify(t2);
    if (n2 === "function" || n2 === "symbol") return n2 === "symbol" ? null : JSON.stringify(Ho(t2));
    if (n2 !== "object") return null;
    if (typeof t2.nodeType == "number") return JSON.stringify(Ho(t2));
    if (e2.has(t2)) return null;
    e2.add(t2);
    try {
      if (Array.isArray(t2)) {
        let i2 = [];
        for (let s2 of t2) {
          let a2 = ki(s2, e2);
          if (a2 === null) return null;
          i2.push(a2);
        }
        return "[" + i2.join(",") + "]";
      }
      let o2 = Object.getPrototypeOf(t2);
      if (o2 !== Object.prototype && o2 !== null) return JSON.stringify(Ho(t2));
      let r2 = [];
      for (let i2 of Object.keys(t2).sort()) {
        let s2 = t2[i2];
        if (s2 === void 0) continue;
        let a2 = ki(s2, e2);
        if (a2 === null) return null;
        r2.push(JSON.stringify(i2) + ":" + a2);
      }
      return "{" + r2.join(",") + "}";
    } finally {
      e2.delete(t2);
    }
  }
  function Ql(t2, e2) {
    let { burst: n2, invalidate: o2, ...r2 } = t2 || {};
    try {
      let i2 = ki(r2, /* @__PURE__ */ new Set());
      return i2 === null ? null : `${(e2 || []).map(cn).join(",")}:${i2}`;
    } catch {
      return null;
    }
  }
  function rc(t2, e2, n2, o2, r2 = null) {
    let i2 = bi.get(t2);
    i2 || (i2 = Lh(t2), i2.baselineSignature = Ql(e2, n2.plugins), bi.set(t2, i2));
    let s2 = Ql(e2, n2.plugins), a2 = async () => {
      if (await Yn(), i2.disposed) return o2();
      let u2 = s2 === null || s2 !== i2.baselineSignature;
      u2 && s2 !== null ? i2.pendingSig === s2 ? (i2.baselineSignature = s2, i2.last = null, i2.dirty = true, i2.dirtyRoots = null, i2.pendingSig = null, u2 = false) : i2.pendingSig = s2 : i2.pendingSig = null, wi(t2, i2), Si(t2, i2);
      for (let M of i2.observers) M.__flush(M.takeRecords());
      Ut();
      let c2 = kn(t2);
      i2.dirty && i2.outsideMutations !== c2 && i2.dirtyAll(), i2.outsideMutations = c2;
      let f2 = t2.getRootNode?.(), d2 = [...i2.trackedShadowRoots.keys()];
      f2?.nodeType === 11 && !d2.includes(f2) && d2.push(f2), eo(t2.ownerDocument || document, d2);
      let h2 = Mn(t2);
      i2.styleStamp !== h2 && (i2.styleStamp = h2, i2.dirty || i2.dirtyAll());
      let m2 = Xl(t2, i2), g2 = Yl(t2, i2);
      m2.animation = Kl(g2), i2.renderState && (!ln(i2.renderState, m2, "style") && (Ve(), i2.dirtyAll()), ln(i2.renderState, m2, "scroll") || i2.dirtyAll(), ln(i2.renderState, m2, "controls") || (ve(t2), i2.dirtyAll()), !ln(i2.renderState, m2, "images") && !i2.dirty && i2.dirtyAll());
      let p2 = je();
      i2.envEpoch !== p2 && (i2.dirtyAll(), i2.envEpoch = p2);
      let y2 = Se();
      if (i2.styleEpoch !== y2 && (i2.styleEpoch = y2, !i2.dirty)) {
        let M = Hl(t2);
        i2.geometry !== null && M !== i2.geometry && (ve(t2), i2.dirtyAll()), i2.geometry = M;
      }
      n2.invalidate && i2.dirtyAll();
      let b2 = false, w2 = !!i2.renderState && !ln(i2.renderState, m2, "animation");
      try {
        let M = /* @__PURE__ */ new Set();
        w2 && g2.length === 0 && (M = null);
        for (let $2 of g2) {
          let F = $2.playState === "running";
          if (!F && !w2) continue;
          F && (b2 = true), w2 = true;
          let A = $2.effect?.target;
          if (Nh(t2, i2, A) === t2) M.add(A);
          else {
            M = null;
            break;
          }
        }
        if (w2 && M && M.size && i2.retained) {
          i2.dirty = true;
          for (let $2 of M) i2.dirtyRoots && i2.dirtyRoots.add($2), ve($2);
        } else w2 && !M && i2.dirtyAll();
      } catch {
      }
      let S2 = m2.frameDriven, v2 = b2 || S2;
      if (v2 && (i2.last = null), S2 && i2.dirtyAll(), !u2 && !v2 && !i2.dirty && i2.last) return jl(t2, i2), i2.last;
      i2.capturing = true;
      let C = null;
      try {
        let M = null, $2 = false, F = null;
        if (!u2 && i2.dirty && i2.retained && i2.dirtyRoots && i2.dirtyRoots.size && r2) {
          F = [...i2.dirtyRoots];
          let A = await Ul(t2, i2, n2);
          A && (M = await r2(A), $2 = true);
        }
        if (M || (u2 || (n2.__retain = (A) => {
          let x2 = /* @__PURE__ */ new Map();
          for (let [_2, P] of A.nodeMap.entries()) x2.set(P, _2);
          C = { ...A, srcToClone: x2 };
        }), n2.__tornSinceStart = () => {
          for (let A of i2.observers) for (let x2 of A.takeRecords()) i2.pending.push(x2);
          return Ut(), i2.torn || Vl(i2.pending) || kn(t2) !== c2;
        }, M = await o2()), !u2 && !i2.disposed) {
          i2.dirty = false, i2.dirtyRoots = /* @__PURE__ */ new Set(), C ? (i2.retained = C, i2.retainedFrameDriven = ql(C), vi(t2, i2), Ci(t2, i2)) : $2 && (i2.retainedFrameDriven || (i2.retainedFrameDriven = ql(i2.retained, F)), vi(t2, i2), Ci(t2, i2));
          let A = Xl(t2, i2);
          A.animation = Kl(Yl(t2, i2));
          let x2 = ["style", "scroll", "controls", "images"];
          b2 || x2.push("animation");
          let _2 = x2.every((P) => ln(m2, A, P));
          i2.renderState = A, i2.styleEpoch = Se(), i2.styleStamp = Mn(t2), i2.geometry = Hl(t2), i2.renderState.frameDriven ? (Zl.add(t2), ec(t2, i2)) : _2 ? !v2 && !i2.renderState.frameDriven && (i2.last = M, jl(t2, i2)) : (i2.dirtyAll(), i2.last = null);
        }
        return M;
      } finally {
        n2.__retain = void 0, n2.__tornSinceStart = void 0;
        for (let $2 of i2.observers) for (let F of $2.takeRecords()) i2.pending.push(F);
        Ut();
        let M = kn(t2);
        (i2.torn || Vl(i2.pending) || M !== c2) && (i2.dirtyAll(), i2.last = null), i2.outsideMutations = M, i2.styleEpoch = Se(), i2.styleStamp = Mn(t2), i2.pending.length = 0, i2.torn = false, i2.capturing = false, i2.disposed || (wi(t2, i2), Si(t2, i2));
      }
    }, l2 = i2.inflight.then(a2, a2);
    return i2.inflight = l2.catch(() => {
    }), l2;
  }
  function ac(t2) {
    Go = t2;
  }
  function lc(t2, e2) {
    !Mi || !On || e2 && e2.burst === false || Ai.set(On.control, { element: t2, options: e2 && typeof e2 == "object" ? { ...e2 } : e2 });
  }
  function cc(t2) {
    let e2 = { control: t2 };
    On = e2, setTimeout(() => {
      On === e2 && (On = null);
    }, 0);
  }
  function Ei(t2) {
    let e2 = t2.target, n2 = e2 && (e2.nodeType === 1 ? e2 : e2.parentElement);
    return n2 && n2.closest ? n2.closest(Wh) : null;
  }
  function sc(t2) {
    if (t2.type === "keydown" && t2.key !== "Enter" && t2.key !== " ") return;
    let e2 = Ei(t2);
    e2 && (cc(e2), _i(t2, false));
  }
  function Oh(t2) {
    let e2 = Ei(t2);
    e2 && cc(e2);
  }
  function _i(t2, e2 = true) {
    if (!Go || document.visibilityState === "hidden") return;
    let n2 = Ei(t2);
    if (!n2 || t2.type === "pointerenter" && t2.target !== n2) return;
    let o2 = Ai.get(n2);
    if (o2) {
      if (!o2.element.isConnected) {
        Ai.delete(n2);
        return;
      }
      Go(o2.element, o2.options).catch(() => {
      });
      return;
    }
    e2 && !ic && (ic = true, Go(document.body, { clip: "viewport", burst: false }).catch(() => {
    }));
  }
  function fc() {
    if (Mi || typeof document > "u" || typeof document.addEventListener != "function") return;
    Mi = true;
    let t2 = { capture: true, passive: true };
    document.addEventListener("pointerdown", sc, t2), document.addEventListener("keydown", sc, t2), document.addEventListener("click", Oh, t2), document.addEventListener("pointerenter", _i, t2), document.addEventListener("focusin", _i, t2);
  }
  function cm(...t2) {
    return ui(...t2), et;
  }
  async function fm(t2, e2) {
    if (typeof t2 != "string" || !t2.trim()) throw new Error("[SnapDOM] fromString() needs an HTML string.");
    let n2 = document.createElement("div");
    tt(n2), n2.style.cssText = "position:fixed;left:-99999px;top:0;pointer-events:none;", n2.innerHTML = t2, document.body.appendChild(n2);
    try {
      await Ct();
      let o2 = Array.from(n2.childNodes).some((i2) => i2.nodeType === 3 && i2.textContent.trim()), r2 = n2.children.length === 1 && !o2 ? n2.firstElementChild : n2;
      return await Hi(r2, { ...e2 || {}, burst: false });
    } finally {
      n2.remove();
    }
  }
  async function Hi(t2, e2) {
    if (!t2) throw new Error("[SnapDOM] The element cannot be null or undefined.");
    let n2 = Bl(e2);
    n2.element = t2, n2.invalidate && Ve(), Al(n2, e2 && e2.plugins);
    let { stage: o2, loweredBy: r2 } = vl(n2);
    n2.needs = o2, n2.__needsLoweredBy = r2;
    let i2 = on(o2, "render"), s2 = n2.burst === true || !Lo(n2), a2 = typeof n2.filter == "function" || !!n2.excludePredicates || typeof n2.excludeStyleProps == "function" || typeof n2.fallbackURL == "function", u2 = i2 && !n2.captureSelection && n2.burst !== false && s2 && !a2 && nc(t2);
    return u2 && lc(t2, e2), n2.snap || (n2.snap = { toPng: (c2, f2) => et.toPng(c2, f2), toSvg: (c2, f2) => et.toSvg(c2, f2) }), u2 ? rc(t2, e2, n2, () => et.capture(t2, n2, Ui), (c2) => Lc(c2, n2)) : (await Yn(), et.capture(t2, n2, Ui));
  }
  async function Lc(t2, e2) {
    let n2 = e2.needs || kt, o2 = on(n2, "render"), r2 = (k) => kl(n2, e2.__needsLoweredBy || [], k), i2 = typeof HTMLCanvasElement < "u" && t2 instanceof HTMLCanvasElement ? t2 : null, s2 = i2 ? null : t2, a2 = () => s2 ?? (s2 = i2.toDataURL()), l2 = i2 || t2;
    i2 && (t2 = "");
    let u2 = e2.__compressedSnapshot, c2 = e2.__compressionDensity;
    delete e2.__compressedSnapshot, delete e2.__compressedAssets;
    let f2, d2 = e2.meta || {}, m2 = (Number.isFinite(e2.width) || Number.isFinite(e2.height)) && !Y(), g2 = m2 ? Number.isFinite(e2.width) ? d2.targetW / d2.vbW : d2.targetH / d2.vbH : 1, p2 = m2 ? Number.isFinite(e2.height) ? d2.targetH / d2.vbH : d2.targetW / d2.vbW : 1, y2 = (k) => {
      if (i2 || !u2?.size) return l2;
      let I = d2.vbW, W = d2.vbH, T = k.crop;
      T && (I = Math.max(1, Math.min(I, T.x + T.width) - Math.max(0, T.x)), W = Math.max(1, Math.min(W, T.y + T.height) - Math.max(0, T.y)));
      let N = Number.isFinite(k.width), U = Number.isFinite(k.height);
      return (N && U ? Math.max(k.width / I, k.height / W) : N ? k.width / I * (T ? Math.max(1, p2 / g2) : 1) : U ? k.height / W * (T ? Math.max(1, g2 / p2) : 1) : (k.scale || 1) * Math.max(g2, p2)) * (k.dpr || 1) <= c2 ? l2 : f2 ?? (f2 = Tl(a2(), u2));
    }, b2 = async (k, I) => {
      let { rasterize: W } = await Promise.resolve().then(() => (un(), Bn));
      return W(l2, { ...k, ...I || {}, format: "png" });
    }, w2 = () => {
      if (!o2) throw r2("svgString");
      if (i2) throw new Error("[SnapDOM] html-in-canvas makes a raster capture; there is no SVG string.");
      let k = t2.indexOf(",");
      return k >= 0 ? jn(decodeURIComponent(t2.slice(k + 1)), e2.__fileSvg) : "";
    }, S2 = (k) => Object.defineProperty({ ...k || {}, svgString: w2 }, "url", o2 ? { get: a2, enumerable: true } : { get() {
      throw r2("export.url");
    }, enumerable: false, configurable: true }), v2 = { img: async (k, I) => {
      if (i2) return b2(k, I);
      let { toImg: W } = await Promise.resolve().then(() => (Oi(), Wi)), T = { ...k, ...I || {} };
      return W(y2(T), T);
    }, svg: async (k, I) => {
      if (i2) return b2(k, I);
      let { toSvg: W } = await Promise.resolve().then(() => (Oi(), Wi)), T = { ...k, ...I || {} };
      return W(y2(T), T);
    }, canvas: async (k, I) => {
      let { toCanvas: W } = await Promise.resolve().then(() => (Fe(), yc)), T = { ...k, ...I || {} };
      return W(y2(T), T);
    }, blob: async (k, I) => {
      let { toBlob: W } = await Promise.resolve().then(() => (zi(), Fc)), T = { ...k, ...I || {} };
      return W(y2(T), T);
    }, png: async (k, I) => {
      let { rasterize: W } = await Promise.resolve().then(() => (un(), Bn)), T = { ...k, ...I || {}, format: "png" };
      return W(y2(T), T);
    }, jpeg: async (k, I) => {
      let { rasterize: W } = await Promise.resolve().then(() => (un(), Bn)), T = { ...k, ...I || {}, format: "jpeg" };
      return W(y2(T), T);
    }, webp: async (k, I) => {
      let { rasterize: W } = await Promise.resolve().then(() => (un(), Bn)), T = { ...k, ...I || {}, format: "webp" };
      return W(y2(T), T);
    }, download: async (k, I) => {
      let { download: W } = await Promise.resolve().then(() => (Pc(), Tc)), T = { ...k, ...I || {} };
      return W(y2(T), T);
    } };
    if (!o2) for (let k of Object.keys(v2)) {
      let I = k === "download" ? "download()" : `to${k.charAt(0).toUpperCase()}${k.slice(1)}()`;
      v2[k] = async () => {
        throw r2(I);
      };
    }
    let C = {};
    for (let k of ["img", "svg", "canvas", "blob", "png", "jpeg", "webp"]) C[k] = async (I) => v2[k](e2, { ..._2(k, I || {}), [dm]: true });
    C.jpg = C.jpeg;
    let M = (k) => Object.defineProperty({ ...e2, ...k }, "options", { value: e2, configurable: true }), $2 = M({ artifacts: e2.__artifacts || null, export: S2(), exports: C }), F = await No("defineExports", $2), A = Object.assign({}, ...F.filter((k) => k && typeof k == "object").reverse()), x2 = { ...v2, ...A };
    x2.jpeg && !x2.jpg && (x2.jpg = (k, I) => x2.jpeg(k, I));
    function _2(k, I) {
      let W = I || {}, T = { ...e2, ...W }, N = typeof W.type == "string" ? W.type.toLowerCase() : "", U = typeof W.format == "string" ? W.format.toLowerCase() : Nc.has(N) ? N : "";
      U && (T.format = U === "jpg" ? "jpeg" : U), T.__explicitFormat = U ? T.format : e2.__explicitFormat ?? null, k === "blob" && !T.__explicitFormat && (T.format = i2 ? "png" : "svg"), T.type = T.format;
      let z = (B) => B === "jpeg" || B === "jpg" || B === "webp";
      return [k, T.format, N].map((B) => typeof B == "string" ? B.toLowerCase() : "").find(z) && (T.backgroundColor == null || T.backgroundColor === "transparent") && (T.backgroundColor = "#ffffff"), T.scale !== 1 && (Number.isFinite(T.width) || Number.isFinite(T.height)) && D(T, "scale ignored: width/height already set the size."), T;
    }
    let P = false, E = Promise.resolve();
    async function R(k, I) {
      let W = Object.freeze(I && typeof I == "object" ? { ...I } : {}), T = async () => {
        let U = x2[k];
        if (!U) throw new Error(`[SnapDOM] Unknown export type: ${k}`);
        let z = _2(k, W), V = M({ artifacts: e2.__artifacts || null, export: S2({ type: k, options: z, requestedOptions: W }) }), B = z.format, rt = z.type;
        await No("beforeExport", V, { format: k, options: z });
        let at = z.format !== B ? z.format : z.type !== rt ? z.type : "", pt = typeof at == "string" ? at.toLowerCase() : "";
        Nc.has(pt) && (z.format = pt === "jpg" ? "jpeg" : pt, z.type = z.format, z.__explicitFormat = z.format, /^(?:jpeg|webp)$/.test(z.format) && (z.backgroundColor == null || z.backgroundColor === "transparent") && (z.backgroundColor = "#ffffff"));
        let St = await U(V, z);
        return await No("afterExport", V, { format: k, options: z, result: St }), P || (P = true, await Zt("afterSnap", e2)), St;
      }, N = E.then(T);
      return E = N.catch(() => {
      }), N;
    }
    let L = { url: t2, needs: n2, warnings: e2.__session && e2.__session.warnings || [], toRaw: () => {
      if (!o2) throw r2("toRaw()");
      return a2();
    }, to: (k, I) => R(k, I), toImg: (k) => R("img", k), toSvg: (k) => R("svg", k), toCanvas: (k) => R("canvas", k), toBlob: (k) => R("blob", k), toPng: (k) => R("png", k), toJpg: (k) => R("jpg", k), toWebp: (k) => R("webp", k), download: (k) => R("download", k) };
    o2 ? i2 && Object.defineProperty(L, "url", { get: a2, enumerable: true, configurable: true }) : Object.defineProperty(L, "url", { get() {
      throw r2("url");
    }, enumerable: false, configurable: true }), Object.defineProperty(L, "meta", o2 ? { value: e2.meta, enumerable: true } : { get() {
      throw r2("meta");
    }, enumerable: false, configurable: true });
    for (let k of Object.keys(x2)) {
      let I = "to" + k.charAt(0).toUpperCase() + k.slice(1);
      L[I] || (L[I] = (W) => R(k, W));
    }
    return L;
  }
  var Uc, st, re, gt, j, Mt, ir, Hc, Vc, Gc, vt, Ki, fr, Ji, Qt, ye, es, Zc, tf, pr, ef, nf, is, ss, of, ns, rf, os, qn, us, At, mr, gn, cf, ff, uf, ds, df, hs, pf, ps, hf, mf, gf, yf, bf, xf, Be, xr, Sf, bn, dt, vf, wt, Et, Xr, Pn, oi, Jd, Qd, tp, nl, ep, op, H, en, lp, ol, up, Me, Wl, Ol, yc, jt, he, Pi, qo, Xo, Yh, mc, pe, Yo, Dn, Fi, gc, Li, Jh, Qh, Zh, tm, Fe, Bn, un, Wi, Oi, wc, bc, xc, Ec, Sc, rm, im, vc, kc, _c, Mc, Rc, Di, Fc, zi, Tc, Pc, ce, ys, vr, Cf, He, ze, Rt, we, ae, le, Cr, kr, Sn, Mr, vn, Cn, bs, Af, xs, Kn, Ss, Ff, Nf, be, Of, Ar, Uf, Hf, jf, Yf, Kf, Is, Ws, tu, eu, Ue, Os, Cs, Ds, cu, fu, Nr, Us, du, pu, qs, An, Xs, vu, Cu, ku, la, Ir, so, Eu, Fu, $u, Tu, pa, ha, Pu, ma, Wr, ga, Du, lo, Bu, ju, Vu, Yu, Qu, rd, Je, fo, dd, ka, Fa, md, bo, $a, yo, Ta, Md, Ea, Ed, $d, Td, Qe, Ua, Od, Dd, qa, Hd, Gr, qr, Eo, pp, hp, gp, hl, wp, xp, Sp, vp, Fo, Ap, To, yl, nn, In, kt, rn, Dp, zp, _e, Fl, Up, $l, Pl, Nl, Vp, El, Io, Yp, Kp, Kt, Jp, Qp, Ae, eh, rh, ch, gh, zl, bh, Sh, Uo, Ch, gi, bi, jo, Zl, yi, Eh, Wn, tc, Rh, xi, $h, cn, Ih, Jl, Go, Wh, Mi, On, Ai, ic, um, et, Ui, dm, Nc;
  var init_snapdom = __esm({
    "node_modules/@zumer/snapdom/dist/snapdom.mjs"() {
      Uc = Object.defineProperty;
      st = (t2, e2, n2) => () => {
        if (n2) throw n2[0];
        try {
          return t2 && (e2 = t2(t2 = 0)), e2;
        } catch (o2) {
          throw n2 = [o2], o2;
        }
      };
      re = (t2, e2) => {
        for (var n2 in e2) Uc(t2, n2, { get: e2[n2], enumerable: true });
      };
      Mt = st(() => {
        "use strict";
        gt = class extends Map {
          constructor(e2 = 100, ...n2) {
            super(...n2), this._maxSize = e2;
          }
          set(e2, n2) {
            if (this.size >= this._maxSize && !this.has(e2)) {
              let o2 = this.keys().next().value;
              o2 !== void 0 && this.delete(o2);
            }
            return super.set(e2, n2);
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
        tp = /[\uD800-\uDBFF][\uDC00-\uDFFF]|[\x00-\x08\x0B\x0C\x0E-\x1F\uD800-\uDFFF\uFFFE\uFFFF]/g, nl = (t2) => t2.replace(tp, (e2) => e2.length === 2 ? e2 : ""), ep = /^data:[^,]{0,120};base64,/;
        op = /* @__PURE__ */ new Set(["img", "canvas", "video", "iframe", "object", "embed"]);
        H = (t2, e2 = 3) => Number.isFinite(t2) ? Math.round(t2 * 10 ** e2) / 10 ** e2 : t2;
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
        Xo = () => new Promise((t2) => {
          requestAnimationFrame(t2), setTimeout(t2, 50);
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
        for (let t2 = 0; t2 < 256; t2++) {
          let e2 = t2;
          for (let n2 = 0; n2 < 8; n2++) e2 = e2 & 1 ? 3988292384 ^ e2 >>> 1 : e2 >>> 1;
          bc[t2] = e2;
        }
      });
      Ec = {};
      re(Ec, { encodeJpeg: () => am });
      Rc = st(() => {
        "use strict";
        Sc = [0, 1, 5, 6, 14, 15, 27, 28, 2, 4, 7, 13, 16, 26, 29, 42, 3, 8, 12, 17, 25, 30, 41, 43, 9, 11, 18, 24, 31, 40, 44, 53, 10, 19, 23, 32, 39, 45, 52, 54, 20, 22, 33, 38, 46, 51, 55, 60, 21, 34, 37, 47, 50, 56, 59, 61, 35, 36, 48, 49, 57, 58, 62, 63], rm = [16, 11, 10, 16, 24, 40, 51, 61, 12, 12, 14, 19, 26, 58, 60, 55, 14, 13, 16, 24, 40, 57, 69, 56, 14, 17, 22, 29, 51, 87, 80, 62, 18, 22, 37, 56, 68, 109, 103, 77, 24, 35, 55, 64, 81, 104, 113, 92, 49, 64, 78, 87, 103, 121, 120, 101, 72, 92, 95, 98, 112, 100, 103, 99], im = Array.from({ length: 64 }, (t2, e2) => (e2 & 7) < 4 && e2 < 32 ? [17, 18, 24, 47, 18, 21, 26, 66, 24, 26, 56, 99, 47, 66, 99, 99][(e2 >> 3) * 4 + (e2 & 7)] : 99), vc = [1, 1.387039845, 1.306562965, 1.175875602, 1, 0.785694958, 0.5411961, 0.275899379];
        kc = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], _c = [[0, 0, [0, 1, 5, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0], kc], [16, 0, [0, 2, 1, 3, 3, 2, 4, 3, 5, 5, 4, 4, 0, 0, 1, 125], Cc([1, 2, 3, 0, 4, 17, 5, 18, 33, 49, 65, 6, 19, 81, 97, 7, 34, 113, 20, 50, 129, 145, 161, 8, 35, 66, 177, 193, 21, 82, 209, 240, 36, 51, 98, 114, 130])], [1, 1, [0, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0], kc], [17, 1, [0, 2, 1, 2, 4, 4, 3, 4, 7, 5, 4, 4, 0, 1, 2, 119], Cc([0, 1, 2, 3, 17, 4, 5, 33, 49, 6, 18, 65, 81, 7, 97, 113, 19, 34, 50, 129, 8, 20, 66, 145, 161, 177, 193, 9, 35, 51, 82, 240, 21, 98, 114, 209, 10, 22, 36, 52, 225, 37, 241])]], Mc = _c.map(([, , t2, e2]) => {
          let n2 = [], o2 = 0, r2 = 0;
          for (let i2 = 1; i2 <= 16; i2++, o2 <<= 1) for (let s2 = 0; s2 < t2[i2 - 1]; s2++) n2[e2[r2++]] = [o2++, i2];
          return n2;
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
      Kf = (t2) => t2.tagName === "INPUT" || t2.tagName === "TEXTAREA";
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
      so = (t2) => Number.parseFloat(t2) || 0;
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
      Fo = (t2) => Math.round(t2 * 100) / 100;
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
      $l = (t2, e2) => e2.kind === "style" ? t2.style?.getPropertyValue(e2.name) : t2.getAttribute(e2.name);
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
      cn = (t2) => t2 && (typeof t2 == "object" || typeof t2 == "function") ? Ho(t2) : "-";
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
      et.capture = async (t2, e2, n2) => {
        if (n2 !== Ui) throw new Error("[SnapDOM] snapdom.capture() is internal; use snapdom(el).");
        if (on(e2.needs || kt, "render") && Y()) {
          if (e2.embedFonts) try {
            let i2 = t2.ownerDocument || document, s2 = null;
            if (e2.embedFonts === "auto" && (t2.getBoundingClientRect(), s2 = wo(i2).drawn, s2.size === 0)) throw null;
            let a2 = xo(t2);
            e2.clip || (e2.__fontUsage = a2);
            let l2 = a2.required;
            if (s2 && (l2 = new Set([...l2].filter((u2) => s2.has(Fn(u2).toLowerCase()))), l2.size === 0)) throw null;
            await So(l2, a2.usedCodepoints, i2);
          } catch {
          }
          let r2 = Array.from(t2.querySelectorAll("canvas"));
          t2.tagName === "CANVAS" && r2.unshift(t2);
          for (let i2 of r2) try {
            if (Rn(i2)) continue;
            let s2 = i2.getContext("2d", { willReadFrequently: true });
            s2 && s2.getImageData(0, 0, 1, 1);
          } catch (s2) {
            D(e2, "Couldn't prepare canvases for Safari.", s2);
          }
        }
        let o2 = await Dl(t2, e2);
        return Lc(o2, e2);
      };
      et.toRaw = (t2, e2) => et(t2, e2).then((n2) => n2.toRaw());
      et.toImg = (t2, e2) => et(t2, e2).then((n2) => n2.toImg());
      et.toSvg = (t2, e2) => et(t2, e2).then((n2) => n2.toSvg());
      et.toCanvas = (t2, e2) => et(t2, e2).then((n2) => n2.toCanvas());
      et.toBlob = (t2, e2) => et(t2, e2).then((n2) => n2.toBlob());
      et.toPng = (t2, e2) => et(t2, { ...e2, format: "png" }).then((n2) => n2.toPng());
      et.toJpg = (t2, e2) => et(t2, { ...e2, format: "jpeg" }).then((n2) => n2.toJpg());
      et.toWebp = (t2, e2) => et(t2, { ...e2, format: "webp" }).then((n2) => n2.toWebp());
      et.download = (t2, e2) => et(t2, e2).then((n2) => n2.download());
    }
  });

  // node_modules/@preact/signals-core/dist/signals-core.module.js
  function t() {
    if (!(v > 1)) {
      var i2, t2 = false;
      !(function() {
        var i3 = c;
        c = void 0;
        while (void 0 !== i3) {
          var t3 = i3.S;
          if (t3.v === i3.v) {
            for (var r3 = t3.t; void 0 !== r3; r3 = r3.x) if (r3.i === i3.i) r3.i = t3.i;
          }
          i3 = i3.o;
        }
      })();
      while (void 0 !== h) {
        var r2 = h;
        h = void 0;
        s++;
        while (void 0 !== r2) {
          var n2 = r2.u;
          r2.u = void 0;
          r2.f &= -3;
          if (!(8 & r2.f) && w(r2)) try {
            r2.c();
          } catch (r3) {
            if (!t2) {
              i2 = r3;
              t2 = true;
            }
          }
          r2 = n2;
        }
      }
      s = 0;
      v--;
      if (t2) throw i2;
    } else v--;
  }
  function r(i2) {
    if (v > 0) return i2();
    u = ++e;
    v++;
    try {
      return i2();
    } finally {
      t();
    }
  }
  function f(i2) {
    var t2 = o, r2 = n;
    o = void 0;
    n = void 0;
    try {
      return i2();
    } finally {
      o = t2;
      n = r2;
    }
  }
  function d(i2) {
    if (void 0 !== o) {
      var t2 = i2.n;
      if (void 0 === t2 || t2.t !== o) {
        t2 = { i: 0, S: i2, p: o.s, n: void 0, t: o, e: void 0, x: void 0, r: t2 };
        if (void 0 !== o.s) o.s.n = t2;
        o.s = t2;
        i2.n = t2;
        if (32 & o.f) i2.S(t2);
        return t2;
      } else if (-1 === t2.i) {
        t2.i = 0;
        if (void 0 !== t2.n) {
          t2.n.p = t2.p;
          if (void 0 !== t2.p) t2.p.n = t2.n;
          t2.p = o.s;
          t2.n = void 0;
          o.s.n = t2;
          o.s = t2;
        }
        return t2;
      }
    }
  }
  function l(i2, t2) {
    this.v = i2;
    this.i = 0;
    this.n = void 0;
    this.t = void 0;
    this.l = 0;
    this.W = null == t2 ? void 0 : t2.watched;
    this.Z = null == t2 ? void 0 : t2.unwatched;
    this.name = null == t2 ? void 0 : t2.name;
  }
  function y(i2, t2) {
    return new l(i2, t2);
  }
  function w(i2) {
    for (var t2 = i2.s; void 0 !== t2; t2 = t2.n) if (t2.S.i !== t2.i || !t2.S.h() || t2.S.i !== t2.i) return true;
    return false;
  }
  function b(i2) {
    for (var t2 = i2.s; void 0 !== t2; t2 = t2.n) {
      var r2 = t2.S.n;
      if (void 0 !== r2) t2.r = r2;
      t2.S.n = t2;
      t2.i = -1;
      if (void 0 === t2.n) {
        i2.s = t2;
        break;
      }
    }
  }
  function _(i2) {
    var t2 = i2.s, r2 = void 0;
    while (void 0 !== t2) {
      var n2 = t2.p;
      if (-1 === t2.i) {
        t2.S.U(t2);
        if (void 0 !== n2) n2.n = t2.n;
        if (void 0 !== t2.n) t2.n.p = n2;
      } else r2 = t2;
      t2.S.n = t2.r;
      if (void 0 !== t2.r) t2.r = void 0;
      t2 = n2;
    }
    i2.s = r2;
  }
  function j2(i2, t2) {
    l.call(this, void 0, t2);
    this.x = i2;
    this.s = void 0;
    this.g = a - 1;
    this.f = 4;
  }
  function O2(i2, t2) {
    return new j2(i2, t2);
  }
  function p(i2) {
    var r2 = i2.j;
    i2.j = void 0;
    if ("function" == typeof r2) {
      v++;
      var n2 = o;
      o = void 0;
      try {
        r2();
      } catch (t2) {
        i2.f &= -2;
        i2.f |= 8;
        g(i2);
        throw t2;
      } finally {
        o = n2;
        t();
      }
    }
  }
  function g(i2) {
    for (var t2 = i2.s; void 0 !== t2; t2 = t2.n) t2.S.U(t2);
    i2.x = void 0;
    i2.s = void 0;
    p(i2);
  }
  function S(i2) {
    if (o !== this) throw new Error("Out-of-order effect");
    _(this);
    o = i2;
    this.f &= -2;
    try {
      if (8 & this.f) g(this);
    } finally {
      t();
    }
  }
  function m(i2, t2) {
    this.x = i2;
    this.j = void 0;
    this.s = void 0;
    this.u = void 0;
    this.f = 32;
    this.name = null == t2 ? void 0 : t2.name;
    if (n) n.push(this);
  }
  function x(i2, t2) {
    var r2 = new m(i2, t2);
    try {
      r2.c();
    } catch (i3) {
      r2.d();
      throw i3;
    }
    var n2 = r2.d.bind(r2);
    n2[Symbol.dispose] = n2;
    return n2;
  }
  var i, n, o, h, v, s, e, u, c, a;
  var init_signals_core_module = __esm({
    "node_modules/@preact/signals-core/dist/signals-core.module.js"() {
      i = /* @__PURE__ */ Symbol.for("preact-signals");
      o = void 0;
      h = void 0;
      v = 0;
      s = 0;
      e = 0;
      u = 0;
      c = void 0;
      a = 0;
      l.prototype.brand = i;
      l.prototype.h = function() {
        return true;
      };
      l.prototype.S = function(i2) {
        var t2 = this, r2 = this.t;
        if (r2 !== i2 && void 0 === i2.e) {
          i2.x = r2;
          this.t = i2;
          if (void 0 !== r2) r2.e = i2;
          else f(function() {
            var i3;
            null == (i3 = t2.W) || i3.call(t2);
          });
        }
      };
      l.prototype.U = function(i2) {
        var t2 = this;
        if (void 0 !== this.t) {
          var r2 = i2.e, n2 = i2.x;
          if (void 0 !== r2) {
            r2.x = n2;
            i2.e = void 0;
          }
          if (void 0 !== n2) {
            n2.e = r2;
            i2.x = void 0;
          }
          if (i2 === this.t) {
            this.t = n2;
            if (void 0 === n2) f(function() {
              var i3;
              null == (i3 = t2.Z) || i3.call(t2);
            });
          }
        }
      };
      l.prototype.subscribe = function(i2) {
        var t2 = this;
        return x(function() {
          var r2 = t2.value;
          f(function() {
            return i2(r2);
          });
        }, { name: "sub" });
      };
      l.prototype.valueOf = function() {
        return this.value;
      };
      l.prototype.toString = function() {
        return this.value + "";
      };
      l.prototype.toJSON = function() {
        return this.value;
      };
      l.prototype.peek = function() {
        var i2 = this;
        return f(function() {
          return i2.value;
        });
      };
      Object.defineProperty(l.prototype, "value", { get: function() {
        var i2 = d(this);
        if (void 0 !== i2) i2.i = this.i;
        return this.v;
      }, set: function(i2) {
        if (i2 !== this.v) {
          if (s > 100) throw new Error("Cycle detected");
          !(function(i3) {
            if (0 !== v && 0 === s) {
              if (i3.l !== u) {
                i3.l = u;
                c = { S: i3, v: i3.v, i: i3.i, o: c };
              }
            }
          })(this);
          this.v = i2;
          this.i++;
          a++;
          v++;
          try {
            for (var r2 = this.t; void 0 !== r2; r2 = r2.x) r2.t.N();
          } finally {
            t();
          }
        }
      } });
      j2.prototype = new l();
      j2.prototype.h = function() {
        this.f &= -3;
        if (1 & this.f) return false;
        if (32 == (36 & this.f)) return true;
        this.f &= -5;
        if (this.g === a) return true;
        this.g = a;
        this.f |= 1;
        if (this.i > 0 && !w(this)) {
          this.f &= -2;
          return true;
        }
        var i2 = o;
        try {
          b(this);
          o = this;
          var t2 = this.x();
          if (16 & this.f || this.v !== t2 || 0 === this.i) {
            this.v = t2;
            this.f &= -17;
            this.i++;
          }
        } catch (i3) {
          this.v = i3;
          this.f |= 16;
          this.i++;
        }
        o = i2;
        _(this);
        this.f &= -2;
        return true;
      };
      j2.prototype.S = function(i2) {
        if (void 0 === this.t) {
          this.f |= 36;
          for (var t2 = this.s; void 0 !== t2; t2 = t2.n) t2.S.S(t2);
        }
        l.prototype.S.call(this, i2);
      };
      j2.prototype.U = function(i2) {
        if (void 0 !== this.t) {
          l.prototype.U.call(this, i2);
          if (void 0 === this.t) {
            this.f &= -33;
            for (var t2 = this.s; void 0 !== t2; t2 = t2.n) t2.S.U(t2);
          }
        }
      };
      j2.prototype.N = function() {
        if (!(2 & this.f)) {
          this.f |= 6;
          for (var i2 = this.t; void 0 !== i2; i2 = i2.x) i2.t.N();
        }
      };
      Object.defineProperty(j2.prototype, "value", { get: function() {
        if (1 & this.f) throw new Error("Cycle detected");
        var i2 = d(this);
        this.h();
        if (void 0 !== i2) i2.i = this.i;
        if (16 & this.f) throw this.v;
        return this.v;
      } });
      m.prototype.c = function() {
        var i2 = this.S();
        try {
          if (8 & this.f) return;
          if (void 0 === this.x) return;
          var t2 = this.x();
          if ("function" == typeof t2) this.j = t2;
        } finally {
          i2();
        }
      };
      m.prototype.S = function() {
        if (1 & this.f) throw new Error("Cycle detected");
        this.f |= 1;
        this.f &= -9;
        p(this);
        b(this);
        v++;
        var i2 = o;
        o = this;
        return S.bind(this, i2);
      };
      m.prototype.N = function() {
        if (!(2 & this.f)) {
          this.f |= 2;
          this.u = h;
          h = this;
        }
      };
      m.prototype.d = function() {
        this.f |= 8;
        if (!(1 & this.f)) g(this);
      };
      m.prototype.dispose = function() {
        this.d();
      };
    }
  });

  // node_modules/@dnd-kit/state/dist/index.mjs
  function computed(compute, comparator) {
    if (comparator) {
      let previousValue;
      return O2(() => {
        const value = compute();
        if (value && previousValue && comparator(previousValue, value)) {
          return previousValue;
        }
        previousValue = value;
        return value;
      });
    }
    return O2(compute);
  }
  function deepEqual(a2, b2) {
    if (Object.is(a2, b2)) {
      return true;
    }
    if (a2 === null || b2 === null) return false;
    if (typeof a2 === "function" && typeof b2 === "function") {
      return a2 === b2;
    }
    if (a2 instanceof Set && b2 instanceof Set) {
      if (a2.size !== b2.size) {
        return false;
      }
      for (const value of a2) {
        if (!b2.has(value)) {
          return false;
        }
      }
      return true;
    }
    if (Array.isArray(a2)) {
      if (!Array.isArray(b2) || a2.length !== b2.length) {
        return false;
      }
      const hasDifferentValues = a2.some(
        (value, index) => !deepEqual(value, b2[index])
      );
      return !hasDifferentValues;
    }
    if (typeof a2 === "object" && typeof b2 === "object") {
      const aKeys = Object.keys(a2);
      const bKeys = Object.keys(b2);
      if (aKeys.length !== bKeys.length) return false;
      const hasDifferentValues = aKeys.some(
        (key) => !deepEqual(a2[key], b2[key])
      );
      return !hasDifferentValues;
    }
    return false;
  }
  function reactive({ get }, _2) {
    return {
      init(value) {
        return y(value);
      },
      get() {
        const current = get.call(this);
        return current.value;
      },
      set(newValue) {
        const current = get.call(this);
        if (current.peek() === newValue) {
          return;
        }
        current.value = newValue;
      }
    };
  }
  function derived(target, _2) {
    const map = /* @__PURE__ */ new WeakMap();
    return function() {
      let result = map.get(this);
      if (!result) {
        result = computed(target.bind(this));
        map.set(this, result);
      }
      return result.value;
    };
  }
  function enumerable(enumerable2 = true) {
    return function(_value2, context) {
      context.addInitializer(function() {
        const host = context.kind === "field" ? this : context.static ? this : Object.getPrototypeOf(this);
        const descriptor2 = Object.getOwnPropertyDescriptor(host, context.name);
        if (descriptor2) {
          Object.defineProperty(host, context.name, __spreadProps(__spreadValues({}, descriptor2), { enumerable: enumerable2 }));
        }
      });
    };
  }
  function effects(...entries) {
    const effects2 = entries.map((fn2) => x(fn2));
    return () => effects2.forEach((cleanup) => cleanup());
  }
  function snapshot(value) {
    return f(() => {
      const output = {};
      for (const key in value) {
        Object.defineProperty(output, key, {
          value: value[key],
          enumerable: true,
          configurable: true,
          writable: true
        });
      }
      return output;
    });
  }
  var __create, __defProp, __defProps, __getOwnPropDesc, __getOwnPropDescs, __getOwnPropSymbols, __hasOwnProp, __propIsEnum, __knownSymbol, __typeError, __defNormalProp, __spreadValues, __spreadProps, __name, __decoratorStart, __decoratorStrings, __expectFn, __decoratorContext, __decoratorMetadata, __runInitializers, __decorateElement, __accessCheck, __privateIn, __privateGet, __privateAdd, __privateSet, __privateMethod, _previous_dec, _initial_dec, _current_dec, _current_dec2, _previous_dec2, _initial_dec2, _init, _initial, _a2, initial_get, initial_set, _ValueHistory_instances, _previous, _b, previous_get, previous_set, _current, _c2, current_get, current_set, ValueHistory, _store, WeakStore;
  var init_dist = __esm({
    "node_modules/@dnd-kit/state/dist/index.mjs"() {
      init_signals_core_module();
      init_signals_core_module();
      init_signals_core_module();
      init_signals_core_module();
      init_signals_core_module();
      init_signals_core_module();
      __create = Object.create;
      __defProp = Object.defineProperty;
      __defProps = Object.defineProperties;
      __getOwnPropDesc = Object.getOwnPropertyDescriptor;
      __getOwnPropDescs = Object.getOwnPropertyDescriptors;
      __getOwnPropSymbols = Object.getOwnPropertySymbols;
      __hasOwnProp = Object.prototype.hasOwnProperty;
      __propIsEnum = Object.prototype.propertyIsEnumerable;
      __knownSymbol = (name, symbol) => (symbol = Symbol[name]) ? symbol : /* @__PURE__ */ Symbol.for("Symbol." + name);
      __typeError = (msg) => {
        throw TypeError(msg);
      };
      __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
      __spreadValues = (a2, b2) => {
        for (var prop in b2 || (b2 = {}))
          if (__hasOwnProp.call(b2, prop))
            __defNormalProp(a2, prop, b2[prop]);
        if (__getOwnPropSymbols)
          for (var prop of __getOwnPropSymbols(b2)) {
            if (__propIsEnum.call(b2, prop))
              __defNormalProp(a2, prop, b2[prop]);
          }
        return a2;
      };
      __spreadProps = (a2, b2) => __defProps(a2, __getOwnPropDescs(b2));
      __name = (target, value) => __defProp(target, "name", { value, configurable: true });
      __decoratorStart = (base) => {
        var _a23;
        return [, , , __create((_a23 = base == null ? void 0 : base[__knownSymbol("metadata")]) != null ? _a23 : null)];
      };
      __decoratorStrings = ["class", "method", "getter", "setter", "accessor", "field", "value", "get", "set"];
      __expectFn = (fn2) => fn2 !== void 0 && typeof fn2 !== "function" ? __typeError("Function expected") : fn2;
      __decoratorContext = (kind, name, done, metadata, fns) => ({ kind: __decoratorStrings[kind], name, metadata, addInitializer: (fn2) => done._ ? __typeError("Already initialized") : fns.push(__expectFn(fn2 || null)) });
      __decoratorMetadata = (array, target) => __defNormalProp(target, __knownSymbol("metadata"), array[3]);
      __runInitializers = (array, flags, self, value) => {
        for (var i2 = 0, fns = array[flags >> 1], n2 = fns && fns.length; i2 < n2; i2++) flags & 1 ? fns[i2].call(self) : value = fns[i2].call(self, value);
        return value;
      };
      __decorateElement = (array, flags, name, decorators, target, extra) => {
        var fn2, it, done, ctx, access, k = flags & 7, s2 = !!(flags & 8), p2 = !!(flags & 16);
        var j3 = k > 3 ? array.length + 1 : k ? s2 ? 1 : 2 : 0, key = __decoratorStrings[k + 5];
        var initializers = k > 3 && (array[j3 - 1] = []), extraInitializers = array[j3] || (array[j3] = []);
        var desc = k && (!p2 && !s2 && (target = target.prototype), k < 5 && (k > 3 || !p2) && __getOwnPropDesc(k < 4 ? target : { get [name]() {
          return __privateGet(this, extra);
        }, set [name](x2) {
          return __privateSet(this, extra, x2);
        } }, name));
        k ? p2 && k < 4 && __name(extra, (k > 2 ? "set " : k > 1 ? "get " : "") + name) : __name(target, name);
        for (var i2 = decorators.length - 1; i2 >= 0; i2--) {
          ctx = __decoratorContext(k, name, done = {}, array[3], extraInitializers);
          if (k) {
            ctx.static = s2, ctx.private = p2, access = ctx.access = { has: p2 ? (x2) => __privateIn(target, x2) : (x2) => name in x2 };
            if (k ^ 3) access.get = p2 ? (x2) => (k ^ 1 ? __privateGet : __privateMethod)(x2, target, k ^ 4 ? extra : desc.get) : (x2) => x2[name];
            if (k > 2) access.set = p2 ? (x2, y2) => __privateSet(x2, target, y2, k ^ 4 ? extra : desc.set) : (x2, y2) => x2[name] = y2;
          }
          it = (0, decorators[i2])(k ? k < 4 ? p2 ? extra : desc[key] : k > 4 ? void 0 : { get: desc.get, set: desc.set } : target, ctx), done._ = 1;
          if (k ^ 4 || it === void 0) __expectFn(it) && (k > 4 ? initializers.unshift(it) : k ? p2 ? extra = it : desc[key] = it : target = it);
          else if (typeof it !== "object" || it === null) __typeError("Object expected");
          else __expectFn(fn2 = it.get) && (desc.get = fn2), __expectFn(fn2 = it.set) && (desc.set = fn2), __expectFn(fn2 = it.init) && initializers.unshift(fn2);
        }
        return k || __decoratorMetadata(array, target), desc && __defProp(target, name, desc), p2 ? k ^ 4 ? extra : desc : target;
      };
      __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
      __privateIn = (member, obj) => Object(obj) !== obj ? __typeError('Cannot use the "in" operator on this value') : member.has(obj);
      __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
      __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
      __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
      __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);
      _initial_dec2 = [reactive], _previous_dec2 = [reactive], _current_dec2 = [reactive], _current_dec = [enumerable()], _initial_dec = [enumerable()], _previous_dec = [enumerable()];
      ValueHistory = class {
        constructor(defaultValue, equals = Object.is) {
          this.defaultValue = defaultValue;
          this.equals = equals;
          __runInitializers(_init, 5, this);
          __privateAdd(this, _ValueHistory_instances);
          __privateAdd(this, _initial, __runInitializers(_init, 8, this)), __runInitializers(_init, 11, this);
          __privateAdd(this, _previous, __runInitializers(_init, 12, this)), __runInitializers(_init, 15, this);
          __privateAdd(this, _current, __runInitializers(_init, 16, this)), __runInitializers(_init, 19, this);
          this.reset = this.reset.bind(this);
          this.reset();
        }
        get current() {
          return __privateGet(this, _ValueHistory_instances, current_get);
        }
        get initial() {
          return __privateGet(this, _ValueHistory_instances, initial_get);
        }
        get previous() {
          return __privateGet(this, _ValueHistory_instances, previous_get);
        }
        /** Set the current value */
        set current(value) {
          const current = f(() => __privateGet(this, _ValueHistory_instances, current_get));
          if (value && current && this.equals(current, value)) {
            return;
          }
          r(() => {
            if (!__privateGet(this, _ValueHistory_instances, initial_get)) {
              __privateSet(this, _ValueHistory_instances, value, initial_set);
            }
            __privateSet(this, _ValueHistory_instances, current, previous_set);
            __privateSet(this, _ValueHistory_instances, value, current_set);
          });
        }
        /** Reset the state to the initial value */
        reset(value = this.defaultValue) {
          r(() => {
            __privateSet(this, _ValueHistory_instances, void 0, previous_set);
            __privateSet(this, _ValueHistory_instances, value, initial_set);
            __privateSet(this, _ValueHistory_instances, value, current_set);
          });
        }
      };
      _init = __decoratorStart(null);
      _initial = /* @__PURE__ */ new WeakMap();
      _ValueHistory_instances = /* @__PURE__ */ new WeakSet();
      _previous = /* @__PURE__ */ new WeakMap();
      _current = /* @__PURE__ */ new WeakMap();
      _a2 = __decorateElement(_init, 20, "#initial", _initial_dec2, _ValueHistory_instances, _initial), initial_get = _a2.get, initial_set = _a2.set;
      _b = __decorateElement(_init, 20, "#previous", _previous_dec2, _ValueHistory_instances, _previous), previous_get = _b.get, previous_set = _b.set;
      _c2 = __decorateElement(_init, 20, "#current", _current_dec2, _ValueHistory_instances, _current), current_get = _c2.get, current_set = _c2.set;
      __decorateElement(_init, 2, "current", _current_dec, ValueHistory);
      __decorateElement(_init, 2, "initial", _initial_dec, ValueHistory);
      __decorateElement(_init, 2, "previous", _previous_dec, ValueHistory);
      __decoratorMetadata(_init, ValueHistory);
      WeakStore = class {
        constructor() {
          __privateAdd(this, _store, /* @__PURE__ */ new WeakMap());
        }
        get(key, id2) {
          var _a23;
          return key ? (_a23 = __privateGet(this, _store).get(key)) == null ? void 0 : _a23.get(id2) : void 0;
        }
        set(key, id2, value) {
          var _a23;
          if (!key) return;
          if (!__privateGet(this, _store).has(key)) __privateGet(this, _store).set(key, /* @__PURE__ */ new Map());
          return (_a23 = __privateGet(this, _store).get(key)) == null ? void 0 : _a23.set(id2, value);
        }
        clear(key) {
          var _a23;
          return key ? (_a23 = __privateGet(this, _store).get(key)) == null ? void 0 : _a23.clear() : void 0;
        }
      };
      _store = /* @__PURE__ */ new WeakMap();
    }
  });

  // node_modules/@dnd-kit/geometry/dist/index.mjs
  function rectangleRectangleIntersection(a2, b2) {
    const top = Math.max(b2.top, a2.top);
    const left = Math.max(b2.left, a2.left);
    const right = Math.min(b2.left + b2.width, a2.left + a2.width);
    const bottom = Math.min(b2.top + b2.height, a2.top + a2.height);
    const width = right - left;
    const height = bottom - top;
    if (left < right && top < bottom) {
      const intersectionArea = width * height;
      return intersectionArea;
    }
    return 0;
  }
  function exceedsDistance({ x: x2, y: y2 }, distance) {
    const dx = Math.abs(x2);
    const dy = Math.abs(y2);
    if (typeof distance === "number") {
      return Math.sqrt(__pow(dx, 2) + __pow(dy, 2)) > distance;
    }
    if ("x" in distance && "y" in distance) {
      return dx > distance.x && dy > distance.y;
    }
    if ("x" in distance) {
      return dx > distance.x;
    }
    if ("y" in distance) {
      return dy > distance.y;
    }
    return false;
  }
  var __create2, __defProp2, __getOwnPropDesc2, __getOwnPropSymbols2, __hasOwnProp2, __propIsEnum2, __knownSymbol2, __typeError2, __pow, __defNormalProp2, __spreadValues2, __name2, __decoratorStart2, __decoratorStrings2, __expectFn2, __decoratorContext2, __decoratorMetadata2, __runInitializers2, __decorateElement2, __accessCheck2, __privateIn2, __privateGet2, __privateAdd2, __privateSet2, __privateMethod2, Point, Rectangle, _direction_dec, _delta_dec, _a3, _timestamp, _init2, Position, Axis, Axes;
  var init_dist2 = __esm({
    "node_modules/@dnd-kit/geometry/dist/index.mjs"() {
      init_dist();
      __create2 = Object.create;
      __defProp2 = Object.defineProperty;
      __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
      __getOwnPropSymbols2 = Object.getOwnPropertySymbols;
      __hasOwnProp2 = Object.prototype.hasOwnProperty;
      __propIsEnum2 = Object.prototype.propertyIsEnumerable;
      __knownSymbol2 = (name, symbol) => (symbol = Symbol[name]) ? symbol : /* @__PURE__ */ Symbol.for("Symbol." + name);
      __typeError2 = (msg) => {
        throw TypeError(msg);
      };
      __pow = Math.pow;
      __defNormalProp2 = (obj, key, value) => key in obj ? __defProp2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
      __spreadValues2 = (a2, b2) => {
        for (var prop in b2 || (b2 = {}))
          if (__hasOwnProp2.call(b2, prop))
            __defNormalProp2(a2, prop, b2[prop]);
        if (__getOwnPropSymbols2)
          for (var prop of __getOwnPropSymbols2(b2)) {
            if (__propIsEnum2.call(b2, prop))
              __defNormalProp2(a2, prop, b2[prop]);
          }
        return a2;
      };
      __name2 = (target, value) => __defProp2(target, "name", { value, configurable: true });
      __decoratorStart2 = (base) => {
        var _a23;
        return [, , , __create2((_a23 = base == null ? void 0 : base[__knownSymbol2("metadata")]) != null ? _a23 : null)];
      };
      __decoratorStrings2 = ["class", "method", "getter", "setter", "accessor", "field", "value", "get", "set"];
      __expectFn2 = (fn2) => fn2 !== void 0 && typeof fn2 !== "function" ? __typeError2("Function expected") : fn2;
      __decoratorContext2 = (kind, name, done, metadata, fns) => ({ kind: __decoratorStrings2[kind], name, metadata, addInitializer: (fn2) => done._ ? __typeError2("Already initialized") : fns.push(__expectFn2(fn2 || null)) });
      __decoratorMetadata2 = (array, target) => __defNormalProp2(target, __knownSymbol2("metadata"), array[3]);
      __runInitializers2 = (array, flags, self, value) => {
        for (var i2 = 0, fns = array[flags >> 1], n2 = fns && fns.length; i2 < n2; i2++) flags & 1 ? fns[i2].call(self) : value = fns[i2].call(self, value);
        return value;
      };
      __decorateElement2 = (array, flags, name, decorators, target, extra) => {
        var fn2, it, done, ctx, access, k = flags & 7, s2 = !!(flags & 8), p2 = !!(flags & 16);
        var j3 = k > 3 ? array.length + 1 : k ? s2 ? 1 : 2 : 0, key = __decoratorStrings2[k + 5];
        var initializers = k > 3 && (array[j3 - 1] = []), extraInitializers = array[j3] || (array[j3] = []);
        var desc = k && (!p2 && !s2 && (target = target.prototype), k < 5 && (k > 3 || !p2) && __getOwnPropDesc2(k < 4 ? target : { get [name]() {
          return __privateGet2(this, extra);
        }, set [name](x2) {
          return __privateSet2(this, extra, x2);
        } }, name));
        k ? p2 && k < 4 && __name2(extra, (k > 2 ? "set " : k > 1 ? "get " : "") + name) : __name2(target, name);
        for (var i2 = decorators.length - 1; i2 >= 0; i2--) {
          ctx = __decoratorContext2(k, name, done = {}, array[3], extraInitializers);
          if (k) {
            ctx.static = s2, ctx.private = p2, access = ctx.access = { has: p2 ? (x2) => __privateIn2(target, x2) : (x2) => name in x2 };
            if (k ^ 3) access.get = p2 ? (x2) => (k ^ 1 ? __privateGet2 : __privateMethod2)(x2, target, k ^ 4 ? extra : desc.get) : (x2) => x2[name];
            if (k > 2) access.set = p2 ? (x2, y2) => __privateSet2(x2, target, y2, k ^ 4 ? extra : desc.set) : (x2, y2) => x2[name] = y2;
          }
          it = (0, decorators[i2])(k ? k < 4 ? p2 ? extra : desc[key] : k > 4 ? void 0 : { get: desc.get, set: desc.set } : target, ctx), done._ = 1;
          if (k ^ 4 || it === void 0) __expectFn2(it) && (k > 4 ? initializers.unshift(it) : k ? p2 ? extra = it : desc[key] = it : target = it);
          else if (typeof it !== "object" || it === null) __typeError2("Object expected");
          else __expectFn2(fn2 = it.get) && (desc.get = fn2), __expectFn2(fn2 = it.set) && (desc.set = fn2), __expectFn2(fn2 = it.init) && initializers.unshift(fn2);
        }
        return k || __decoratorMetadata2(array, target), desc && __defProp2(target, name, desc), p2 ? k ^ 4 ? extra : desc : target;
      };
      __accessCheck2 = (obj, member, msg) => member.has(obj) || __typeError2("Cannot " + msg);
      __privateIn2 = (member, obj) => Object(obj) !== obj ? __typeError2('Cannot use the "in" operator on this value') : member.has(obj);
      __privateGet2 = (obj, member, getter) => (__accessCheck2(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
      __privateAdd2 = (obj, member, value) => member.has(obj) ? __typeError2("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
      __privateSet2 = (obj, member, value, setter) => (__accessCheck2(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
      __privateMethod2 = (obj, member, method) => (__accessCheck2(obj, member, "access private method"), method);
      Point = class _Point {
        /**
         * @param {number} Coordinate of the point on the horizontal axis
         * @param {number} Coordinate of the point on the vertical axis
         */
        constructor(x2, y2) {
          this.x = x2;
          this.y = y2;
        }
        /**
         * Returns the delta between this point and another point.
         *
         * @param {Point} a - A point
         * @param {Point} b - Another point
         */
        static delta(a2, b2) {
          return new _Point(a2.x - b2.x, a2.y - b2.y);
        }
        /**
         * Returns the distance (hypotenuse) between this point and another point.
         *
         * @param {Point} a - A point
         * @param {Point} b - Another point
         */
        static distance(a2, b2) {
          return Math.hypot(a2.x - b2.x, a2.y - b2.y);
        }
        /**
         * Returns true if both points are equal.
         *
         * @param {Point} a - A point
         * @param {Point} b - Another point
         */
        static equals(a2, b2) {
          return a2.x === b2.x && a2.y === b2.y;
        }
        static from({ x: x2, y: y2 }) {
          return new _Point(x2, y2);
        }
      };
      Rectangle = class _Rectangle {
        constructor(left, top, width, height) {
          this.left = left;
          this.top = top;
          this.width = width;
          this.height = height;
          this.scale = {
            x: 1,
            y: 1
          };
        }
        get inverseScale() {
          return {
            x: 1 / this.scale.x,
            y: 1 / this.scale.y
          };
        }
        translate(x2, y2) {
          const { top, left, width, height, scale } = this;
          const newShape = new _Rectangle(left + x2, top + y2, width, height);
          newShape.scale = __spreadValues2({}, scale);
          return newShape;
        }
        get boundingRectangle() {
          const { width, height, left, top, right, bottom } = this;
          return { width, height, left, top, right, bottom };
        }
        get center() {
          const { left, top, right, bottom } = this;
          return new Point((left + right) / 2, (top + bottom) / 2);
        }
        get area() {
          const { width, height } = this;
          return width * height;
        }
        equals(shape) {
          if (!(shape instanceof _Rectangle)) {
            return false;
          }
          const { left, top, width, height } = this;
          return left === shape.left && top === shape.top && width === shape.width && height === shape.height;
        }
        containsPoint(point) {
          const { top, left, bottom, right } = this;
          return top <= point.y && point.y <= bottom && left <= point.x && point.x <= right;
        }
        intersectionArea(shape) {
          if (shape instanceof _Rectangle) {
            return rectangleRectangleIntersection(this, shape);
          }
          return 0;
        }
        intersectionRatio(shape) {
          const { area } = this;
          const intersectionArea = this.intersectionArea(shape);
          const intersectionRatio = intersectionArea / (shape.area + area - intersectionArea);
          return intersectionRatio;
        }
        get bottom() {
          const { top, height } = this;
          return top + height;
        }
        get right() {
          const { left, width } = this;
          return left + width;
        }
        get aspectRatio() {
          const { width, height } = this;
          return width / height;
        }
        get corners() {
          return [
            { x: this.left, y: this.top },
            { x: this.right, y: this.top },
            { x: this.left, y: this.bottom },
            { x: this.right, y: this.bottom }
          ];
        }
        static from({ top, left, width, height }) {
          return new _Rectangle(left, top, width, height);
        }
        static delta(a2, b2, alignment = { x: "center", y: "center" }) {
          const getCoordinate = (rect, axis) => {
            const align = alignment[axis];
            const start = axis === "x" ? rect.left : rect.top;
            const size = axis === "x" ? rect.width : rect.height;
            if (align == "start") return start;
            if (align == "end") return start + size;
            return start + size / 2;
          };
          return Point.delta(
            { x: getCoordinate(a2, "x"), y: getCoordinate(a2, "y") },
            { x: getCoordinate(b2, "x"), y: getCoordinate(b2, "y") }
          );
        }
        static intersectionRatio(a2, b2) {
          return _Rectangle.from(a2).intersectionRatio(_Rectangle.from(b2));
        }
      };
      Position = class extends (_a3 = ValueHistory, _delta_dec = [derived], _direction_dec = [derived], _a3) {
        constructor(initialValue) {
          const point = Point.from(initialValue);
          super(point, (a2, b2) => Point.equals(a2, b2));
          __runInitializers2(_init2, 5, this);
          __privateAdd2(this, _timestamp, 0);
          this.velocity = { x: 0, y: 0 };
        }
        get delta() {
          return Point.delta(this.current, this.initial);
        }
        get direction() {
          const { current, previous } = this;
          if (!previous) return null;
          const delta = {
            x: current.x - previous.x,
            y: current.y - previous.y
          };
          if (!delta.x && !delta.y) {
            return null;
          }
          if (Math.abs(delta.x) > Math.abs(delta.y)) {
            return delta.x > 0 ? "right" : "left";
          }
          return delta.y > 0 ? "down" : "up";
        }
        get current() {
          return super.current;
        }
        set current(coordinates) {
          const { current } = this;
          const point = Point.from(coordinates);
          const delta = {
            x: point.x - current.x,
            y: point.y - current.y
          };
          const timestamp = Date.now();
          const timeDelta = timestamp - __privateGet2(this, _timestamp);
          const velocity = (delta2) => Math.round(delta2 / timeDelta * 100);
          r(() => {
            __privateSet2(this, _timestamp, timestamp);
            this.velocity = {
              x: velocity(delta.x),
              y: velocity(delta.y)
            };
            super.current = point;
          });
        }
        reset(coordinates = this.defaultValue) {
          super.reset(Point.from(coordinates));
          this.velocity = { x: 0, y: 0 };
        }
      };
      _init2 = __decoratorStart2(_a3);
      _timestamp = /* @__PURE__ */ new WeakMap();
      __decorateElement2(_init2, 2, "delta", _delta_dec, Position);
      __decorateElement2(_init2, 2, "direction", _direction_dec, Position);
      __decoratorMetadata2(_init2, Position);
      Axis = /* @__PURE__ */ ((Axis2) => {
        Axis2["Horizontal"] = "x";
        Axis2["Vertical"] = "y";
        return Axis2;
      })(Axis || {});
      Axes = Object.values(Axis);
    }
  });

  // node_modules/@dnd-kit/abstract/index.js
  function configure(plugin, options) {
    return {
      plugin,
      options
    };
  }
  function configurator(plugin) {
    return (options) => {
      return configure(plugin, options);
    };
  }
  function descriptor(plugin) {
    if (typeof plugin === "function") {
      return {
        plugin,
        options: void 0
      };
    }
    return plugin;
  }
  function sortCollisions(a2, b2) {
    if (a2.priority === b2.priority) {
      if (a2.type === b2.type) {
        return b2.value - a2.value;
      }
      return b2.type - a2.type;
    }
    return b2.priority - a2.priority;
  }
  function defaultPreventable(event, cancelable = true) {
    let defaultPrevented = false;
    return __spreadProps2(__spreadValues3({}, event), {
      cancelable,
      get defaultPrevented() {
        return defaultPrevented;
      },
      preventDefault() {
        if (!cancelable) {
          return;
        }
        defaultPrevented = true;
      }
    });
  }
  function resolveCustomizable(value, defaults3) {
    if (typeof value === "function") {
      return value(defaults3);
    }
    return value != null ? value : defaults3;
  }
  var __create3, __defProp3, __defProps2, __getOwnPropDesc3, __getOwnPropDescs2, __getOwnPropSymbols3, __hasOwnProp3, __propIsEnum3, __knownSymbol3, __typeError3, __defNormalProp3, __spreadValues3, __spreadProps2, __name3, __objRest, __decoratorStart3, __decoratorStrings3, __expectFn3, __decoratorContext3, __decoratorMetadata3, __runInitializers3, __decorateElement3, __accessCheck3, __privateIn3, __privateGet3, __privateAdd3, __privateSet3, __privateMethod3, _disabled_dec, _init3, _disabled, _cleanupFunctions, Plugin, CorePlugin, _previousValues, PluginRegistry, DEFAULT_VALUE, _previousCoordinates, _collisions, CollisionObserver, _disabled_dec2, _data_dec, _manager_dec, _Entity_static, flushIdChanges_fn, _init22, _manager, _idSignal, _data, _disabled2, _Entity, Entity, EntityRegistry, _isDragSource_dec, _isDragging_dec, _isDropping_dec, _status_dec, _modifiers_dec, _type_dec, _c3, _init32, _type, _modifiers, _status, Draggable, _isDropTarget_dec, _shape_dec, _collisionPriority_dec, _collisionDetector_dec, _type_dec2, _accept_dec, _c22, _init4, _accept, _type2, _collisionDetector, _collisionPriority, _shape, Droppable, Monitor, DragDropMonitor, CollisionNotifier, CollisionPriority, CollisionType, _dropped_dec, _dragging_dec, _initialized_dec, _initializing_dec, _initializationPending_dec, _idle_dec, _current_dec3, _value_dec, _init5, _value, Status, DragActions, Sensor, ActivationController, _controller, ActivationConstraint, Modifier, DragDropRegistry, _transform_dec, _target_dec, _source_dec, _modifiers_dec2, _targetIdentifier_dec, _sourceIdentifier_dec, _activatorEvent_dec, _canceled_dec, _shape_dec2, _manager2, _previousSource, _shape2, _init6, _canceled, _activatorEvent, _sourceIdentifier, _targetIdentifier, _modifiers2, _transform, DragOperation, defaultRenderer, DragDropManager;
  var init_abstract = __esm({
    "node_modules/@dnd-kit/abstract/index.js"() {
      init_dist();
      init_dist2();
      __create3 = Object.create;
      __defProp3 = Object.defineProperty;
      __defProps2 = Object.defineProperties;
      __getOwnPropDesc3 = Object.getOwnPropertyDescriptor;
      __getOwnPropDescs2 = Object.getOwnPropertyDescriptors;
      __getOwnPropSymbols3 = Object.getOwnPropertySymbols;
      __hasOwnProp3 = Object.prototype.hasOwnProperty;
      __propIsEnum3 = Object.prototype.propertyIsEnumerable;
      __knownSymbol3 = (name, symbol) => (symbol = Symbol[name]) ? symbol : /* @__PURE__ */ Symbol.for("Symbol." + name);
      __typeError3 = (msg) => {
        throw TypeError(msg);
      };
      __defNormalProp3 = (obj, key, value) => key in obj ? __defProp3(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
      __spreadValues3 = (a2, b2) => {
        for (var prop in b2 || (b2 = {}))
          if (__hasOwnProp3.call(b2, prop))
            __defNormalProp3(a2, prop, b2[prop]);
        if (__getOwnPropSymbols3)
          for (var prop of __getOwnPropSymbols3(b2)) {
            if (__propIsEnum3.call(b2, prop))
              __defNormalProp3(a2, prop, b2[prop]);
          }
        return a2;
      };
      __spreadProps2 = (a2, b2) => __defProps2(a2, __getOwnPropDescs2(b2));
      __name3 = (target, value) => __defProp3(target, "name", { value, configurable: true });
      __objRest = (source, exclude) => {
        var target = {};
        for (var prop in source)
          if (__hasOwnProp3.call(source, prop) && exclude.indexOf(prop) < 0)
            target[prop] = source[prop];
        if (source != null && __getOwnPropSymbols3)
          for (var prop of __getOwnPropSymbols3(source)) {
            if (exclude.indexOf(prop) < 0 && __propIsEnum3.call(source, prop))
              target[prop] = source[prop];
          }
        return target;
      };
      __decoratorStart3 = (base) => {
        var _a5;
        return [, , , __create3((_a5 = base == null ? void 0 : base[__knownSymbol3("metadata")]) != null ? _a5 : null)];
      };
      __decoratorStrings3 = ["class", "method", "getter", "setter", "accessor", "field", "value", "get", "set"];
      __expectFn3 = (fn2) => fn2 !== void 0 && typeof fn2 !== "function" ? __typeError3("Function expected") : fn2;
      __decoratorContext3 = (kind, name, done, metadata, fns) => ({ kind: __decoratorStrings3[kind], name, metadata, addInitializer: (fn2) => done._ ? __typeError3("Already initialized") : fns.push(__expectFn3(fn2 || null)) });
      __decoratorMetadata3 = (array, target) => __defNormalProp3(target, __knownSymbol3("metadata"), array[3]);
      __runInitializers3 = (array, flags, self, value) => {
        for (var i2 = 0, fns = array[flags >> 1], n2 = fns && fns.length; i2 < n2; i2++) flags & 1 ? fns[i2].call(self) : value = fns[i2].call(self, value);
        return value;
      };
      __decorateElement3 = (array, flags, name, decorators, target, extra) => {
        var fn2, it, done, ctx, access, k = flags & 7, s2 = !!(flags & 8), p2 = !!(flags & 16);
        var j3 = k > 3 ? array.length + 1 : k ? s2 ? 1 : 2 : 0, key = __decoratorStrings3[k + 5];
        var initializers = k > 3 && (array[j3 - 1] = []), extraInitializers = array[j3] || (array[j3] = []);
        var desc = k && (!p2 && !s2 && (target = target.prototype), k < 5 && (k > 3 || !p2) && __getOwnPropDesc3(k < 4 ? target : { get [name]() {
          return __privateGet3(this, extra);
        }, set [name](x2) {
          return __privateSet3(this, extra, x2);
        } }, name));
        k ? p2 && k < 4 && __name3(extra, (k > 2 ? "set " : k > 1 ? "get " : "") + name) : __name3(target, name);
        for (var i2 = decorators.length - 1; i2 >= 0; i2--) {
          ctx = __decoratorContext3(k, name, done = {}, array[3], extraInitializers);
          if (k) {
            ctx.static = s2, ctx.private = p2, access = ctx.access = { has: p2 ? (x2) => __privateIn3(target, x2) : (x2) => name in x2 };
            if (k ^ 3) access.get = p2 ? (x2) => (k ^ 1 ? __privateGet3 : __privateMethod3)(x2, target, k ^ 4 ? extra : desc.get) : (x2) => x2[name];
            if (k > 2) access.set = p2 ? (x2, y2) => __privateSet3(x2, target, y2, k ^ 4 ? extra : desc.set) : (x2, y2) => x2[name] = y2;
          }
          it = (0, decorators[i2])(k ? k < 4 ? p2 ? extra : desc[key] : k > 4 ? void 0 : { get: desc.get, set: desc.set } : target, ctx), done._ = 1;
          if (k ^ 4 || it === void 0) __expectFn3(it) && (k > 4 ? initializers.unshift(it) : k ? p2 ? extra = it : desc[key] = it : target = it);
          else if (typeof it !== "object" || it === null) __typeError3("Object expected");
          else __expectFn3(fn2 = it.get) && (desc.get = fn2), __expectFn3(fn2 = it.set) && (desc.set = fn2), __expectFn3(fn2 = it.init) && initializers.unshift(fn2);
        }
        return k || __decoratorMetadata3(array, target), desc && __defProp3(target, name, desc), p2 ? k ^ 4 ? extra : desc : target;
      };
      __accessCheck3 = (obj, member, msg) => member.has(obj) || __typeError3("Cannot " + msg);
      __privateIn3 = (member, obj) => Object(obj) !== obj ? __typeError3('Cannot use the "in" operator on this value') : member.has(obj);
      __privateGet3 = (obj, member, getter) => (__accessCheck3(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
      __privateAdd3 = (obj, member, value) => member.has(obj) ? __typeError3("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
      __privateSet3 = (obj, member, value, setter) => (__accessCheck3(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
      __privateMethod3 = (obj, member, method) => (__accessCheck3(obj, member, "access private method"), method);
      _disabled_dec = [reactive];
      Plugin = class {
        /**
         * Creates a new plugin instance.
         *
         * @param manager - The drag and drop manager that owns this plugin
         * @param options - Optional configuration for the plugin
         */
        constructor(manager, options) {
          this.manager = manager;
          this.options = options;
          __privateAdd3(this, _disabled, __runInitializers3(_init3, 8, this, false)), __runInitializers3(_init3, 11, this);
          __privateAdd3(this, _cleanupFunctions, /* @__PURE__ */ new Set());
        }
        /**
         * Enables a disabled plugin instance.
         *
         * @remarks
         * This method triggers effects when called.
         */
        enable() {
          this.disabled = false;
        }
        /**
         * Disables an enabled plugin instance.
         *
         * @remarks
         * This method triggers effects when called.
         */
        disable() {
          this.disabled = true;
        }
        /**
         * Checks if the plugin instance is disabled.
         *
         * @returns true if the plugin is disabled
         * @remarks
         * This method does not trigger effects when accessed.
         */
        isDisabled() {
          return f(() => {
            return this.disabled;
          });
        }
        /**
         * Configures a plugin instance with new options.
         *
         * @param options - The new options to apply
         */
        configure(options) {
          this.options = options;
        }
        /**
         * Registers an effect that will be cleaned up when the plugin is destroyed.
         *
         * @param callback - The effect callback to register
         * @returns A function to dispose of the effect
         */
        registerEffect(callback) {
          const dispose = x(callback.bind(this));
          __privateGet3(this, _cleanupFunctions).add(dispose);
          return dispose;
        }
        /**
         * Destroys a plugin instance and cleans up its resources.
         *
         * @remarks
         * This method:
         * - Calls all registered cleanup functions
         * - Should be overridden by subclasses to clean up additional resources
         */
        destroy() {
          __privateGet3(this, _cleanupFunctions).forEach((cleanup) => cleanup());
        }
        /**
         * Configures a plugin constructor with options.
         *
         * @param options - The options to configure the constructor with
         * @returns The configured plugin constructor
         *
         * @remarks
         * This method is used to configure the options that the
         * plugin constructor will use to create plugin instances.
         */
        static configure(options) {
          return configure(this, options);
        }
      };
      _init3 = __decoratorStart3(null);
      _disabled = /* @__PURE__ */ new WeakMap();
      _cleanupFunctions = /* @__PURE__ */ new WeakMap();
      __decorateElement3(_init3, 4, "disabled", _disabled_dec, Plugin, _disabled);
      __decoratorMetadata3(_init3, Plugin);
      CorePlugin = class extends Plugin {
      };
      PluginRegistry = class {
        /**
         * Creates a new plugin registry.
         *
         * @param manager - The drag and drop manager that owns this registry
         */
        constructor(manager) {
          this.manager = manager;
          this.instances = /* @__PURE__ */ new Map();
          __privateAdd3(this, _previousValues, []);
        }
        /**
         * Gets all registered plugin instances.
         *
         * @returns An array of all active plugin instances
         */
        get values() {
          return Array.from(this.instances.values());
        }
        /**
         * Sets the list of plugins to be used by the registry.
         *
         * @param entries - Array of plugin constructors or descriptors
         * @remarks
         * This method:
         * - Filters out duplicate plugins
         * - Unregisters plugins that are no longer in use
         * - Registers new plugins with their options
         */
        set values(entries) {
          const descriptors = entries.map(descriptor).reduce((acc, descriptor2) => {
            const existing = acc.find(({ plugin }) => plugin === descriptor2.plugin);
            if (existing) {
              existing.options = descriptor2.options;
              return acc;
            }
            return [...acc, descriptor2];
          }, []);
          const constructors = descriptors.map(({ plugin }) => plugin);
          for (const plugin of __privateGet3(this, _previousValues)) {
            if (!constructors.includes(plugin)) {
              if (plugin.prototype instanceof CorePlugin) {
                continue;
              }
              this.unregister(plugin);
            }
          }
          for (const { plugin, options } of descriptors) {
            this.register(plugin, options);
          }
          __privateSet3(this, _previousValues, constructors);
        }
        /**
         * Gets a plugin instance by its constructor.
         *
         * @param plugin - The plugin constructor to look up
         * @returns The plugin instance or undefined if not found
         */
        get(plugin) {
          const instance = this.instances.get(plugin);
          return instance;
        }
        /**
         * Registers a new plugin instance.
         *
         * @param plugin - The plugin constructor to register
         * @param options - Optional configuration for the plugin
         * @returns The registered plugin instance
         * @remarks
         * If the plugin is already registered, its options will be updated
         * and the existing instance will be returned.
         */
        register(plugin, options) {
          const existingInstance = this.instances.get(plugin);
          if (existingInstance) {
            if (existingInstance.options !== options) {
              existingInstance.options = options;
            }
            return existingInstance;
          }
          const instance = new plugin(this.manager, options);
          this.instances.set(plugin, instance);
          return instance;
        }
        /**
         * Unregisters a plugin instance.
         *
         * @param plugin - The plugin constructor to unregister
         * @remarks
         * This method:
         * - Destroys the plugin instance
         * - Removes it from the registry
         */
        unregister(plugin) {
          const instance = this.instances.get(plugin);
          if (instance) {
            instance.destroy();
            this.instances.delete(plugin);
          }
        }
        /**
         * Destroys all registered plugin instances.
         *
         * @remarks
         * This method:
         * - Calls destroy() on all plugin instances
         * - Clears the registry
         */
        destroy() {
          for (const plugin of this.instances.values()) {
            plugin.destroy();
          }
          this.instances.clear();
        }
      };
      _previousValues = /* @__PURE__ */ new WeakMap();
      DEFAULT_VALUE = [];
      CollisionObserver = class extends Plugin {
        /**
         * Creates a new CollisionObserver instance.
         *
         * @param manager - The drag drop manager instance
         */
        constructor(manager) {
          super(manager);
          __privateAdd3(this, _previousCoordinates);
          __privateAdd3(this, _collisions);
          this.computeCollisions = this.computeCollisions.bind(this);
          __privateSet3(this, _collisions, y(DEFAULT_VALUE));
          this.destroy = effects(
            () => {
              const collisions = this.computeCollisions();
              const coordinates = f(
                () => this.manager.dragOperation.position.current
              );
              if (collisions !== DEFAULT_VALUE) {
                const previousCoordinates = __privateGet3(this, _previousCoordinates);
                __privateSet3(this, _previousCoordinates, coordinates);
                if (previousCoordinates && coordinates.x == previousCoordinates.x && coordinates.y == previousCoordinates.y) {
                  return;
                }
              } else {
                __privateSet3(this, _previousCoordinates, void 0);
              }
              __privateGet3(this, _collisions).value = collisions;
            },
            () => {
              const { dragOperation } = this.manager;
              if (dragOperation.status.initialized) {
                this.forceUpdate();
              }
            }
          );
        }
        /**
         * Forces an immediate update of collision detection.
         *
         * @param immediate - If true, updates collisions immediately. If false, resets previous coordinates.
         */
        forceUpdate(immediate = true) {
          f(() => {
            if (immediate) {
              __privateGet3(this, _collisions).value = this.computeCollisions();
            } else {
              __privateSet3(this, _previousCoordinates, void 0);
            }
          });
        }
        /**
         * Computes collisions between draggable and droppable elements.
         *
         * @param entries - Optional array of droppable elements to check. If not provided, uses all registered droppables.
         * @param collisionDetector - Optional custom collision detector function
         * @returns Array of detected collisions, sorted by priority
         */
        computeCollisions(entries, collisionDetector) {
          const { registry, dragOperation } = this.manager;
          const { source, shape, status } = dragOperation;
          if (!status.initialized || !shape) {
            return DEFAULT_VALUE;
          }
          const collisions = [];
          const potentialTargets = [];
          for (const entry of entries != null ? entries : registry.droppables) {
            if (entry.disabled) {
              continue;
            }
            if (source && !entry.accepts(source)) {
              continue;
            }
            const detectCollision = collisionDetector != null ? collisionDetector : entry.collisionDetector;
            if (!detectCollision) {
              continue;
            }
            potentialTargets.push(entry);
            void entry.shape;
            const collision = f(
              () => detectCollision({
                droppable: entry,
                dragOperation
              })
            );
            if (collision) {
              if (entry.collisionPriority != null) {
                collision.priority = entry.collisionPriority;
              }
              collisions.push(collision);
            }
          }
          if (potentialTargets.length === 0) {
            return DEFAULT_VALUE;
          }
          collisions.sort(sortCollisions);
          return collisions;
        }
        /**
         * Gets the current collisions signal value.
         */
        get collisions() {
          return __privateGet3(this, _collisions).value;
        }
      };
      _previousCoordinates = /* @__PURE__ */ new WeakMap();
      _collisions = /* @__PURE__ */ new WeakMap();
      _manager_dec = [reactive], _data_dec = [reactive], _disabled_dec2 = [reactive];
      _Entity = class _Entity2 {
        /**
         * Creates a new instance of the `Entity` class.
         *
         * @param input - An object containing the initial properties of the entity.
         * @param manager - The manager that controls the drag and drop operations.
         */
        constructor(input, manager) {
          __privateAdd3(this, _manager, __runInitializers3(_init22, 8, this)), __runInitializers3(_init22, 11, this);
          __privateAdd3(this, _idSignal);
          __privateAdd3(this, _data, __runInitializers3(_init22, 12, this)), __runInitializers3(_init22, 15, this);
          __privateAdd3(this, _disabled2, __runInitializers3(_init22, 16, this)), __runInitializers3(_init22, 19, this);
          const { effects: effects6, id: id2, data = {}, disabled = false, register = true } = input;
          let previousId = id2;
          __privateSet3(this, _idSignal, y(id2));
          this.manager = manager;
          this.data = data;
          this.disabled = disabled;
          this.effects = () => {
            var _a5;
            return [
              () => {
                const { id: id22, manager: manager2 } = this;
                if (id22 === previousId) {
                  return;
                }
                previousId = id22;
                manager2 == null ? void 0 : manager2.registry.register(this);
                return () => manager2 == null ? void 0 : manager2.registry.unregister(this);
              },
              ...(_a5 = effects6 == null ? void 0 : effects6()) != null ? _a5 : []
            ];
          };
          this.register = this.register.bind(this);
          this.unregister = this.unregister.bind(this);
          this.destroy = this.destroy.bind(this);
          if (manager && register) {
            queueMicrotask(this.register);
          }
        }
        get id() {
          var _a5, _b3;
          const signalValue = __privateGet3(this, _idSignal).value;
          return (_b3 = (_a5 = _Entity2.pendingIdChanges) == null ? void 0 : _a5.get(this)) != null ? _b3 : signalValue;
        }
        set id(value) {
          var _a5, _b3;
          const current = (_b3 = (_a5 = _Entity2.pendingIdChanges) == null ? void 0 : _a5.get(this)) != null ? _b3 : __privateGet3(this, _idSignal).peek();
          if (value === current) return;
          if (!_Entity2.pendingIdChanges) {
            _Entity2.pendingIdChanges = /* @__PURE__ */ new Map();
            queueMicrotask(() => {
              var _a23;
              return __privateMethod3(_a23 = _Entity2, _Entity_static, flushIdChanges_fn).call(_a23);
            });
          }
          _Entity2.pendingIdChanges.set(this, value);
        }
        /**
         * A method that registers the entity with the manager.
         * @returns CleanupFunction | void
         */
        register() {
          var _a5;
          return (_a5 = this.manager) == null ? void 0 : _a5.registry.register(this);
        }
        /**
         * A method that unregisters the entity from the manager.
         * @returns void
         */
        unregister() {
          var _a5;
          (_a5 = this.manager) == null ? void 0 : _a5.registry.unregister(this);
        }
        /**
         * A method that cleans up the entity when it is no longer needed.
         * @returns void
         */
        destroy() {
          var _a5;
          (_a5 = this.manager) == null ? void 0 : _a5.registry.unregister(this);
        }
      };
      _init22 = __decoratorStart3(null);
      _Entity_static = /* @__PURE__ */ new WeakSet();
      flushIdChanges_fn = function() {
        const changes = _Entity.pendingIdChanges;
        _Entity.pendingIdChanges = null;
        if (changes) {
          r(() => {
            for (const [entity, id2] of changes) {
              __privateGet3(entity, _idSignal).value = id2;
            }
          });
        }
      };
      _manager = /* @__PURE__ */ new WeakMap();
      _idSignal = /* @__PURE__ */ new WeakMap();
      _data = /* @__PURE__ */ new WeakMap();
      _disabled2 = /* @__PURE__ */ new WeakMap();
      __decorateElement3(_init22, 4, "manager", _manager_dec, _Entity, _manager);
      __decorateElement3(_init22, 4, "data", _data_dec, _Entity, _data);
      __decorateElement3(_init22, 4, "disabled", _disabled_dec2, _Entity, _disabled2);
      __privateAdd3(_Entity, _Entity_static);
      __decoratorMetadata3(_init22, _Entity);
      _Entity.pendingIdChanges = null;
      Entity = _Entity;
      EntityRegistry = class {
        constructor() {
          this.map = y(/* @__PURE__ */ new Map());
          this.cleanupFunctions = /* @__PURE__ */ new WeakMap();
          this.register = (key, value) => {
            const current = this.map.peek();
            const currentValue = current.get(key);
            const unregister = () => this.unregister(key, value);
            if (currentValue === value) return unregister;
            if (currentValue) {
              if (currentValue.id === key) {
                const cleanup2 = this.cleanupFunctions.get(currentValue);
                cleanup2 == null ? void 0 : cleanup2();
                this.cleanupFunctions.delete(currentValue);
              }
            }
            const updatedMap = new Map(current);
            for (const [existingKey, existingValue] of current) {
              if (existingValue === value && existingKey !== key) {
                updatedMap.delete(existingKey);
                break;
              }
            }
            updatedMap.set(key, value);
            this.map.value = updatedMap;
            const cleanup = effects(...value.effects());
            this.cleanupFunctions.set(value, cleanup);
            return unregister;
          };
          this.unregister = (key, value) => {
            const current = this.map.peek();
            if (current.get(key) !== value) {
              return;
            }
            const cleanup = this.cleanupFunctions.get(value);
            cleanup == null ? void 0 : cleanup();
            this.cleanupFunctions.delete(value);
            const updatedMap = new Map(current);
            updatedMap.delete(key);
            this.map.value = updatedMap;
          };
        }
        /**
         * Iterator for the EntityRegistry class.
         * @returns An iterator for the values in the map.
         */
        [Symbol.iterator]() {
          return this.map.peek().values();
        }
        get value() {
          return this.map.value.values();
        }
        /**
         * Checks if a entity with the given identifier exists in the registry.
         * @param identifier - The unique identifier of the entity.
         * @returns True if the entity exists, false otherwise.
         */
        has(identifier) {
          return this.map.value.has(identifier);
        }
        /**
         * Retrieves a entity from the registry using its identifier.
         * @param identifier - The unique identifier of the entity.
         * @returns The entity if it exists, undefined otherwise.
         */
        get(identifier) {
          return this.map.value.get(identifier);
        }
        /**
         * Destroys all entries in the registry and clears the registry.
         */
        destroy() {
          for (const entry of this) {
            const cleanup = this.cleanupFunctions.get(entry);
            cleanup == null ? void 0 : cleanup();
            entry.destroy();
          }
          this.map.value = /* @__PURE__ */ new Map();
        }
      };
      Draggable = class extends (_c3 = Entity, _type_dec = [reactive], _modifiers_dec = [reactive], _status_dec = [reactive], _isDropping_dec = [derived], _isDragging_dec = [derived], _isDragSource_dec = [derived], _c3) {
        constructor(_a5, manager) {
          var _b3 = _a5, { modifiers, type, sensors, plugins, effects: effects6 } = _b3, input = __objRest(_b3, ["modifiers", "type", "sensors", "plugins", "effects"]);
          super(
            __spreadProps2(__spreadValues3({}, input), {
              effects: () => {
                var _a23;
                return [
                  ...(_a23 = effects6 == null ? void 0 : effects6()) != null ? _a23 : [],
                  () => {
                    const { manager: manager2, plugins: plugins2 } = this;
                    if (!manager2 || !plugins2) return;
                    for (const entry of plugins2) {
                      const { plugin } = descriptor(entry);
                      manager2.registry.plugins.register(plugin);
                    }
                  }
                ];
              }
            }),
            manager
          );
          __runInitializers3(_init32, 5, this);
          __privateAdd3(this, _type, __runInitializers3(_init32, 8, this)), __runInitializers3(_init32, 11, this);
          __privateAdd3(this, _modifiers, __runInitializers3(_init32, 12, this)), __runInitializers3(_init32, 15, this);
          __privateAdd3(this, _status, __runInitializers3(_init32, 16, this, this.isDragSource ? "dragging" : "idle")), __runInitializers3(_init32, 19, this);
          this.type = type;
          this.sensors = sensors;
          this.modifiers = modifiers;
          this.alignment = input.alignment;
          this.plugins = plugins;
        }
        /**
         * Look up per-entity options for a given plugin constructor.
         */
        pluginConfig(plugin) {
          if (!this.plugins) return void 0;
          for (const entry of this.plugins) {
            const desc = descriptor(entry);
            if (desc.plugin === plugin) return desc.options;
          }
          return void 0;
        }
        get isDropping() {
          return this.status === "dropping" && this.isDragSource;
        }
        get isDragging() {
          return this.status === "dragging" && this.isDragSource;
        }
        get isDragSource() {
          var _a5, _b3;
          return ((_b3 = (_a5 = this.manager) == null ? void 0 : _a5.dragOperation.source) == null ? void 0 : _b3.id) === this.id;
        }
      };
      _init32 = __decoratorStart3(_c3);
      _type = /* @__PURE__ */ new WeakMap();
      _modifiers = /* @__PURE__ */ new WeakMap();
      _status = /* @__PURE__ */ new WeakMap();
      __decorateElement3(_init32, 4, "type", _type_dec, Draggable, _type);
      __decorateElement3(_init32, 4, "modifiers", _modifiers_dec, Draggable, _modifiers);
      __decorateElement3(_init32, 4, "status", _status_dec, Draggable, _status);
      __decorateElement3(_init32, 2, "isDropping", _isDropping_dec, Draggable);
      __decorateElement3(_init32, 2, "isDragging", _isDragging_dec, Draggable);
      __decorateElement3(_init32, 2, "isDragSource", _isDragSource_dec, Draggable);
      __decoratorMetadata3(_init32, Draggable);
      Droppable = class extends (_c22 = Entity, _accept_dec = [reactive], _type_dec2 = [reactive], _collisionDetector_dec = [reactive], _collisionPriority_dec = [reactive], _shape_dec = [reactive], _isDropTarget_dec = [derived], _c22) {
        constructor(_a5, manager) {
          var _b3 = _a5, { accept, collisionDetector, collisionPriority, type } = _b3, input = __objRest(_b3, ["accept", "collisionDetector", "collisionPriority", "type"]);
          super(input, manager);
          __runInitializers3(_init4, 5, this);
          __privateAdd3(this, _accept, __runInitializers3(_init4, 8, this)), __runInitializers3(_init4, 11, this);
          __privateAdd3(this, _type2, __runInitializers3(_init4, 12, this)), __runInitializers3(_init4, 15, this);
          __privateAdd3(this, _collisionDetector, __runInitializers3(_init4, 16, this)), __runInitializers3(_init4, 19, this);
          __privateAdd3(this, _collisionPriority, __runInitializers3(_init4, 20, this)), __runInitializers3(_init4, 23, this);
          __privateAdd3(this, _shape, __runInitializers3(_init4, 24, this)), __runInitializers3(_init4, 27, this);
          this.accept = accept;
          this.collisionDetector = collisionDetector;
          this.collisionPriority = collisionPriority;
          this.type = type;
        }
        /**
         * Checks whether or not the droppable accepts a given draggable.
         *
         * @param draggable - The draggable to check
         * @returns true if the draggable can be dropped here
         */
        accepts(draggable) {
          const { accept } = this;
          if (!accept) {
            return true;
          }
          if (typeof accept === "function") {
            return accept(draggable);
          }
          if (!draggable.type) {
            return false;
          }
          if (Array.isArray(accept)) {
            return accept.includes(draggable.type);
          }
          return draggable.type === accept;
        }
        get isDropTarget() {
          var _a5, _b3;
          return ((_b3 = (_a5 = this.manager) == null ? void 0 : _a5.dragOperation.target) == null ? void 0 : _b3.id) === this.id;
        }
      };
      _init4 = __decoratorStart3(_c22);
      _accept = /* @__PURE__ */ new WeakMap();
      _type2 = /* @__PURE__ */ new WeakMap();
      _collisionDetector = /* @__PURE__ */ new WeakMap();
      _collisionPriority = /* @__PURE__ */ new WeakMap();
      _shape = /* @__PURE__ */ new WeakMap();
      __decorateElement3(_init4, 4, "accept", _accept_dec, Droppable, _accept);
      __decorateElement3(_init4, 4, "type", _type_dec2, Droppable, _type2);
      __decorateElement3(_init4, 4, "collisionDetector", _collisionDetector_dec, Droppable, _collisionDetector);
      __decorateElement3(_init4, 4, "collisionPriority", _collisionPriority_dec, Droppable, _collisionPriority);
      __decorateElement3(_init4, 4, "shape", _shape_dec, Droppable, _shape);
      __decorateElement3(_init4, 2, "isDropTarget", _isDropTarget_dec, Droppable);
      __decoratorMetadata3(_init4, Droppable);
      Monitor = class {
        constructor() {
          this.registry = /* @__PURE__ */ new Map();
        }
        /**
         * Adds an event listener for the specified event type.
         *
         * @param name - The name of the event to listen for
         * @param handler - The function to call when the event occurs
         * @returns A function to remove the event listener
         */
        addEventListener(name, handler) {
          const { registry } = this;
          const listeners = new Set(registry.get(name));
          listeners.add(handler);
          registry.set(name, listeners);
          return () => this.removeEventListener(name, handler);
        }
        /**
         * Removes an event listener for the specified event type.
         *
         * @param name - The name of the event
         * @param handler - The function to remove
         */
        removeEventListener(name, handler) {
          const { registry } = this;
          const listeners = new Set(registry.get(name));
          listeners.delete(handler);
          registry.set(name, listeners);
        }
        /**
         * Dispatches an event to all registered listeners.
         *
         * @param name - The name of the event to dispatch
         * @param args - Arguments to pass to the event handlers
         */
        dispatch(name, ...args) {
          const { registry } = this;
          const listeners = registry.get(name);
          if (!listeners) {
            return;
          }
          for (const listener of listeners) {
            listener(...args);
          }
        }
      };
      DragDropMonitor = class extends Monitor {
        /**
         * Creates a new drag and drop monitor.
         *
         * @param manager - The drag and drop manager to monitor
         */
        constructor(manager) {
          super();
          this.manager = manager;
        }
        /**
         * Dispatches a drag and drop event.
         *
         * @param type - The type of event to dispatch
         * @param event - The event data to dispatch
         */
        dispatch(type, event) {
          const args = [event, this.manager];
          super.dispatch(type, ...args);
        }
      };
      CollisionNotifier = class extends CorePlugin {
        constructor(manager) {
          super(manager);
          const isEqual = (a2, b2) => a2.map(({ id: id2 }) => id2).join("") === b2.map(({ id: id2 }) => id2).join("");
          let previousCollisions = [];
          this.destroy = effects(
            () => {
              const { dragOperation, collisionObserver } = manager;
              if (dragOperation.status.initializing) {
                previousCollisions = [];
                collisionObserver.enable();
              }
            },
            () => {
              const { collisionObserver, monitor } = manager;
              const { collisions } = collisionObserver;
              if (collisionObserver.isDisabled()) {
                return;
              }
              if (Entity.pendingIdChanges) {
                return;
              }
              const event = defaultPreventable({
                collisions
              });
              monitor.dispatch("collision", event);
              if (event.defaultPrevented) {
                return;
              }
              if (isEqual(collisions, previousCollisions)) {
                return;
              } else {
                previousCollisions = collisions;
              }
              const [firstCollision] = collisions;
              f(() => {
                var _a5;
                if ((firstCollision == null ? void 0 : firstCollision.id) !== ((_a5 = manager.dragOperation.target) == null ? void 0 : _a5.id)) {
                  collisionObserver.disable();
                  manager.actions.setDropTarget(firstCollision == null ? void 0 : firstCollision.id).then(() => {
                    collisionObserver.enable();
                  });
                }
              });
            }
          );
        }
      };
      CollisionPriority = /* @__PURE__ */ ((CollisionPriority2) => {
        CollisionPriority2[CollisionPriority2["Lowest"] = 0] = "Lowest";
        CollisionPriority2[CollisionPriority2["Low"] = 1] = "Low";
        CollisionPriority2[CollisionPriority2["Normal"] = 2] = "Normal";
        CollisionPriority2[CollisionPriority2["High"] = 3] = "High";
        CollisionPriority2[CollisionPriority2["Highest"] = 4] = "Highest";
        return CollisionPriority2;
      })(CollisionPriority || {});
      CollisionType = /* @__PURE__ */ ((CollisionType2) => {
        CollisionType2[CollisionType2["Collision"] = 0] = "Collision";
        CollisionType2[CollisionType2["ShapeIntersection"] = 1] = "ShapeIntersection";
        CollisionType2[CollisionType2["PointerIntersection"] = 2] = "PointerIntersection";
        return CollisionType2;
      })(CollisionType || {});
      _value_dec = [reactive], _current_dec3 = [derived], _idle_dec = [derived], _initializationPending_dec = [derived], _initializing_dec = [derived], _initialized_dec = [derived], _dragging_dec = [derived], _dropped_dec = [derived];
      Status = class {
        constructor() {
          __runInitializers3(_init5, 5, this);
          __privateAdd3(this, _value, __runInitializers3(
            _init5,
            8,
            this,
            "idle"
            /* Idle */
          )), __runInitializers3(_init5, 11, this);
        }
        get current() {
          return this.value;
        }
        get idle() {
          return this.value === "idle";
        }
        get initializationPending() {
          return this.value === "initialization-pending";
        }
        get initializing() {
          return this.value === "initializing";
        }
        get initialized() {
          const { value } = this;
          return value !== "idle" && value !== "initialization-pending";
        }
        get dragging() {
          return this.value === "dragging";
        }
        get dropped() {
          return this.value === "dropped";
        }
        /**
         * Sets the current status value.
         *
         * @param value - The new status value
         */
        set(value) {
          this.value = value;
        }
      };
      _init5 = __decoratorStart3(null);
      _value = /* @__PURE__ */ new WeakMap();
      __decorateElement3(_init5, 4, "value", _value_dec, Status, _value);
      __decorateElement3(_init5, 2, "current", _current_dec3, Status);
      __decorateElement3(_init5, 2, "idle", _idle_dec, Status);
      __decorateElement3(_init5, 2, "initializationPending", _initializationPending_dec, Status);
      __decorateElement3(_init5, 2, "initializing", _initializing_dec, Status);
      __decorateElement3(_init5, 2, "initialized", _initialized_dec, Status);
      __decorateElement3(_init5, 2, "dragging", _dragging_dec, Status);
      __decorateElement3(_init5, 2, "dropped", _dropped_dec, Status);
      __decoratorMetadata3(_init5, Status);
      DragActions = class {
        /**
         * Creates a new instance of drag actions.
         *
         * @param manager - The drag and drop manager instance
         */
        constructor(manager) {
          this.manager = manager;
        }
        /**
         * Sets the source of the drag operation.
         *
         * @param source - The draggable entity or its unique identifier
         */
        setDragSource(source) {
          const { dragOperation } = this.manager;
          dragOperation.sourceIdentifier = typeof source === "string" || typeof source === "number" ? source : source.id;
        }
        /**
         * Sets the target of the drop operation.
         *
         * @param identifier - The unique identifier of the droppable entity or null/undefined
         * @returns A promise that resolves to true if the drop was prevented
         */
        setDropTarget(identifier) {
          return f(() => {
            const { dragOperation } = this.manager;
            const id2 = identifier != null ? identifier : null;
            if (dragOperation.targetIdentifier === id2) {
              return Promise.resolve(false);
            }
            dragOperation.targetIdentifier = id2;
            const event = defaultPreventable({
              operation: dragOperation.snapshot()
            });
            if (dragOperation.status.dragging) {
              this.manager.monitor.dispatch("dragover", event);
            }
            return this.manager.renderer.rendering.then(() => event.defaultPrevented);
          });
        }
        /**
         * Starts a new drag operation.
         *
         * @param args - Configuration for the drag operation
         * @param args.event - The event that initiated the drag
         * @param args.source - The source draggable entity or its identifier
         * @param args.coordinates - The initial coordinates of the drag
         * @returns true if the drag operation started successfully
         * @throws {Error} If there is no drag source or another operation is active
         */
        start(args) {
          return f(() => {
            const { dragOperation } = this.manager;
            if (args.source != null) {
              this.setDragSource(args.source);
            }
            const sourceInstance = dragOperation.source;
            if (!sourceInstance) {
              throw new Error("Cannot start a drag operation without a drag source");
            }
            if (!dragOperation.status.idle) {
              throw new Error(
                "Cannot start a drag operation while another is active"
              );
            }
            const controller = new AbortController();
            const { event: nativeEvent, coordinates } = args;
            r(() => {
              dragOperation.status.set(
                "initialization-pending"
                /* InitializationPending */
              );
              dragOperation.shape = null;
              dragOperation.canceled = false;
              dragOperation.activatorEvent = nativeEvent != null ? nativeEvent : null;
              dragOperation.position.reset(coordinates);
            });
            const beforeStartEvent = defaultPreventable({
              operation: dragOperation.snapshot()
            });
            this.manager.monitor.dispatch("beforedragstart", beforeStartEvent);
            if (beforeStartEvent.defaultPrevented) {
              dragOperation.reset();
              controller.abort();
              return controller;
            }
            dragOperation.status.set(
              "initializing"
              /* Initializing */
            );
            dragOperation.controller = controller;
            this.manager.renderer.rendering.then(() => {
              if (controller.signal.aborted) return;
              const { status } = dragOperation;
              if (status.current !== "initializing") return;
              r(() => {
                dragOperation.status.set(
                  "dragging"
                  /* Dragging */
                );
                this.manager.monitor.dispatch("dragstart", {
                  nativeEvent,
                  operation: dragOperation.snapshot(),
                  cancelable: false
                });
              });
            });
            return controller;
          });
        }
        /**
         * Moves the dragged entity to a new position.
         *
         * @param args - Configuration for the move operation
         * @param args.by - Relative coordinates to move by
         * @param args.to - Absolute coordinates to move to
         * @param args.event - The event that triggered the move
         * @param args.cancelable - Whether the move can be canceled
         * @param args.propagate - Whether to dispatch dragmove events
         */
        move(args) {
          return f(() => {
            var _a5, _b3;
            const { dragOperation } = this.manager;
            const { status, controller } = dragOperation;
            if (!status.dragging || !controller || controller.signal.aborted) {
              return;
            }
            const event = defaultPreventable(
              {
                nativeEvent: args.event,
                operation: dragOperation.snapshot(),
                by: args.by,
                to: args.to
              },
              (_a5 = args.cancelable) != null ? _a5 : true
            );
            if ((_b3 = args.propagate) != null ? _b3 : true) {
              this.manager.monitor.dispatch("dragmove", event);
            }
            queueMicrotask(() => {
              var _a23, _b22, _c32, _d3, _e2;
              if (event.defaultPrevented) {
                return;
              }
              const coordinates = (_e2 = args.to) != null ? _e2 : {
                x: dragOperation.position.current.x + ((_b22 = (_a23 = args.by) == null ? void 0 : _a23.x) != null ? _b22 : 0),
                y: dragOperation.position.current.y + ((_d3 = (_c32 = args.by) == null ? void 0 : _c32.y) != null ? _d3 : 0)
              };
              dragOperation.position.current = coordinates;
            });
          });
        }
        /**
         * Stops the current drag operation.
         *
         * @param args - Configuration for stopping the operation
         * @param args.event - The event that triggered the stop
         * @param args.canceled - Whether the operation was canceled
         * @remarks
         * This method:
         * - Dispatches a dragend event
         * - Allows suspension of the operation
         * - Handles cleanup of the operation state
         */
        stop(args = {}) {
          return f(() => {
            var _a5, _b3;
            const { dragOperation } = this.manager;
            const { controller } = dragOperation;
            if (!controller || controller.signal.aborted) return;
            let promise;
            const suspend = () => {
              const output = {
                resume: () => {
                },
                abort: () => {
                }
              };
              promise = new Promise((resolve, reject) => {
                output.resume = resolve;
                output.abort = reject;
              });
              return output;
            };
            controller.abort();
            const end = () => {
              this.manager.renderer.rendering.then(() => {
                dragOperation.status.set(
                  "dropped"
                  /* Dropped */
                );
                const dropping = f(
                  () => {
                    var _a23;
                    return ((_a23 = dragOperation.source) == null ? void 0 : _a23.status) === "dropping";
                  }
                );
                const cleanup = () => {
                  if (dragOperation.controller === controller) {
                    dragOperation.controller = void 0;
                  }
                  dragOperation.reset();
                };
                if (dropping) {
                  const { source } = dragOperation;
                  const dispose = x(() => {
                    if ((source == null ? void 0 : source.status) === "idle") {
                      dispose();
                      cleanup();
                    }
                  });
                } else {
                  this.manager.renderer.rendering.then(cleanup);
                }
              });
            };
            dragOperation.canceled = (_a5 = args.canceled) != null ? _a5 : false;
            this.manager.monitor.dispatch("dragend", {
              nativeEvent: args.event,
              operation: dragOperation.snapshot(),
              canceled: (_b3 = args.canceled) != null ? _b3 : false,
              suspend
            });
            if (promise) {
              promise.then(end).catch(() => dragOperation.reset());
            } else {
              end();
            }
          });
        }
      };
      Sensor = class extends Plugin {
        /**
         * Creates a new sensor instance.
         *
         * @param manager - The drag drop manager instance
         * @param options - Optional sensor configuration
         */
        constructor(manager, options) {
          super(manager, options);
          this.manager = manager;
          this.options = options;
        }
      };
      ActivationController = class extends AbortController {
        constructor(constraints, onActivate) {
          super();
          this.constraints = constraints;
          this.onActivate = onActivate;
          this.activated = false;
          for (const constraint of constraints != null ? constraints : []) {
            constraint.controller = this;
          }
        }
        onEvent(event) {
          var _a5;
          if (this.activated) return;
          if ((_a5 = this.constraints) == null ? void 0 : _a5.length) {
            for (const constraint of this.constraints) {
              constraint.onEvent(event);
            }
          } else {
            this.activate(event);
          }
        }
        activate(event) {
          if (this.activated) return;
          this.activated = true;
          this.onActivate(event);
        }
        abort(event) {
          this.activated = false;
          super.abort(event);
        }
      };
      ActivationConstraint = class {
        constructor(options) {
          this.options = options;
          __privateAdd3(this, _controller);
        }
        set controller(controller) {
          __privateSet3(this, _controller, controller);
          controller.signal.addEventListener("abort", () => this.abort());
        }
        /**
         * Called when the activation is triggered.
         */
        activate(event) {
          var _a5;
          (_a5 = __privateGet3(this, _controller)) == null ? void 0 : _a5.activate(event);
        }
      };
      _controller = /* @__PURE__ */ new WeakMap();
      Modifier = class extends Plugin {
        /**
         * Creates a new modifier instance.
         *
         * @param manager - The drag and drop manager that owns this modifier
         * @param options - Optional configuration for the modifier
         */
        constructor(manager, options) {
          super(manager, options);
          this.manager = manager;
          this.options = options;
        }
        /**
         * Applies the modifier to the current drag operation.
         *
         * @param operation - The current state of the drag operation
         * @returns The transformed coordinates
         *
         * @remarks
         * Override this method to implement custom transformation logic.
         * The default implementation returns the original transform unchanged.
         */
        apply(operation) {
          return operation.transform;
        }
      };
      DragDropRegistry = class {
        /**
         * Creates a new registry instance.
         *
         * @param manager - The drag and drop manager that owns this registry
         */
        constructor(manager) {
          this.draggables = new EntityRegistry();
          this.droppables = new EntityRegistry();
          this.plugins = new PluginRegistry(manager);
          this.sensors = new PluginRegistry(manager);
          this.modifiers = new PluginRegistry(manager);
        }
        register(input, options) {
          if (input instanceof Draggable) {
            return this.draggables.register(input.id, input);
          }
          if (input instanceof Droppable) {
            return this.droppables.register(input.id, input);
          }
          if (input.prototype instanceof Modifier) {
            return this.modifiers.register(input, options);
          }
          if (input.prototype instanceof Sensor) {
            return this.sensors.register(input, options);
          }
          if (input.prototype instanceof Plugin) {
            return this.plugins.register(input, options);
          }
          throw new Error("Invalid instance type");
        }
        unregister(input) {
          if (input instanceof Entity) {
            if (input instanceof Draggable) {
              return this.draggables.unregister(input.id, input);
            }
            if (input instanceof Droppable) {
              return this.droppables.unregister(input.id, input);
            }
            return () => {
            };
          }
          if (input.prototype instanceof Modifier) {
            return this.modifiers.unregister(input);
          }
          if (input.prototype instanceof Sensor) {
            return this.sensors.unregister(input);
          }
          if (input.prototype instanceof Plugin) {
            return this.plugins.unregister(input);
          }
          throw new Error("Invalid instance type");
        }
        /**
         * Destroys all registered entities and cleans up resources.
         *
         * @remarks
         * This method:
         * - Destroys all draggable and droppable entities
         * - Destroys all plugins, sensors, and modifiers
         * - Cleans up any associated resources
         */
        destroy() {
          this.draggables.destroy();
          this.droppables.destroy();
          this.plugins.destroy();
          this.sensors.destroy();
          this.modifiers.destroy();
        }
      };
      _shape_dec2 = [derived], _canceled_dec = [reactive], _activatorEvent_dec = [reactive], _sourceIdentifier_dec = [reactive], _targetIdentifier_dec = [reactive], _modifiers_dec2 = [reactive], _source_dec = [derived], _target_dec = [derived], _transform_dec = [derived];
      DragOperation = class {
        /**
         * Creates a new drag operation instance.
         *
         * @param manager - The drag and drop manager that owns this operation
         */
        constructor(manager) {
          __runInitializers3(_init6, 5, this);
          __privateAdd3(this, _manager2);
          __privateAdd3(this, _previousSource);
          __privateAdd3(this, _shape2, new ValueHistory(
            void 0,
            (a2, b2) => a2 && b2 ? a2.equals(b2) : a2 === b2
          ));
          this.status = new Status();
          __privateAdd3(this, _canceled, __runInitializers3(_init6, 8, this, false)), __runInitializers3(_init6, 11, this);
          __privateAdd3(this, _activatorEvent, __runInitializers3(_init6, 12, this, null)), __runInitializers3(_init6, 15, this);
          __privateAdd3(this, _sourceIdentifier, __runInitializers3(_init6, 16, this, null)), __runInitializers3(_init6, 19, this);
          __privateAdd3(this, _targetIdentifier, __runInitializers3(_init6, 20, this, null)), __runInitializers3(_init6, 23, this);
          __privateAdd3(this, _modifiers2, __runInitializers3(_init6, 24, this, [])), __runInitializers3(_init6, 27, this);
          this.position = new Position({ x: 0, y: 0 });
          __privateAdd3(this, _transform, { x: 0, y: 0 });
          __privateSet3(this, _manager2, manager);
        }
        get shape() {
          const { current, initial, previous } = __privateGet3(this, _shape2);
          if (!current || !initial) {
            return null;
          }
          return { current, initial, previous };
        }
        /**
         * Sets the shape of the dragged entity.
         *
         * @param value - The new shape or null to reset
         */
        set shape(value) {
          if (!value) {
            __privateGet3(this, _shape2).reset();
          } else {
            __privateGet3(this, _shape2).current = value;
          }
        }
        get source() {
          var _a5;
          const identifier = this.sourceIdentifier;
          if (identifier == null) return null;
          const value = __privateGet3(this, _manager2).registry.draggables.get(identifier);
          if (value) {
            __privateSet3(this, _previousSource, value);
          }
          return (_a5 = value != null ? value : __privateGet3(this, _previousSource)) != null ? _a5 : null;
        }
        get target() {
          var _a5;
          const identifier = this.targetIdentifier;
          return identifier != null ? (_a5 = __privateGet3(this, _manager2).registry.droppables.get(identifier)) != null ? _a5 : null : null;
        }
        get transform() {
          const { x: x2, y: y2 } = this.position.delta;
          let transform = { x: x2, y: y2 };
          for (const modifier of this.modifiers) {
            transform = modifier.apply(__spreadProps2(__spreadValues3({}, this.snapshot()), {
              transform
            }));
          }
          __privateSet3(this, _transform, transform);
          return transform;
        }
        /**
         * Creates a snapshot of the current drag operation state.
         *
         * @returns An immutable snapshot of the current operation state
         */
        snapshot() {
          return f(() => ({
            source: this.source,
            target: this.target,
            activatorEvent: this.activatorEvent,
            transform: __privateGet3(this, _transform),
            shape: this.shape ? snapshot(this.shape) : null,
            position: snapshot(this.position),
            status: snapshot(this.status),
            canceled: this.canceled
          }));
        }
        /**
         * Resets the drag operation to its initial state.
         *
         * @remarks
         * This method:
         * - Sets status to idle
         * - Clears source and target identifiers
         * - Resets shape history
         * - Resets position and transform
         * - Clears modifiers
         */
        reset() {
          r(() => {
            this.status.set(
              "idle"
              /* Idle */
            );
            this.sourceIdentifier = null;
            this.targetIdentifier = null;
            __privateGet3(this, _shape2).reset();
            this.position.reset({ x: 0, y: 0 });
            __privateSet3(this, _transform, { x: 0, y: 0 });
            this.modifiers = [];
          });
        }
      };
      _init6 = __decoratorStart3(null);
      _manager2 = /* @__PURE__ */ new WeakMap();
      _previousSource = /* @__PURE__ */ new WeakMap();
      _shape2 = /* @__PURE__ */ new WeakMap();
      _canceled = /* @__PURE__ */ new WeakMap();
      _activatorEvent = /* @__PURE__ */ new WeakMap();
      _sourceIdentifier = /* @__PURE__ */ new WeakMap();
      _targetIdentifier = /* @__PURE__ */ new WeakMap();
      _modifiers2 = /* @__PURE__ */ new WeakMap();
      _transform = /* @__PURE__ */ new WeakMap();
      __decorateElement3(_init6, 2, "shape", _shape_dec2, DragOperation);
      __decorateElement3(_init6, 4, "canceled", _canceled_dec, DragOperation, _canceled);
      __decorateElement3(_init6, 4, "activatorEvent", _activatorEvent_dec, DragOperation, _activatorEvent);
      __decorateElement3(_init6, 4, "sourceIdentifier", _sourceIdentifier_dec, DragOperation, _sourceIdentifier);
      __decorateElement3(_init6, 4, "targetIdentifier", _targetIdentifier_dec, DragOperation, _targetIdentifier);
      __decorateElement3(_init6, 4, "modifiers", _modifiers_dec2, DragOperation, _modifiers2);
      __decorateElement3(_init6, 2, "source", _source_dec, DragOperation);
      __decorateElement3(_init6, 2, "target", _target_dec, DragOperation);
      __decorateElement3(_init6, 2, "transform", _transform_dec, DragOperation);
      __decoratorMetadata3(_init6, DragOperation);
      defaultRenderer = {
        get rendering() {
          return Promise.resolve();
        }
      };
      DragDropManager = class {
        /**
         * Creates a new drag and drop manager instance.
         *
         * @param config - Optional configuration for plugins, sensors, modifiers, and renderer
         */
        constructor(config) {
          this.destroy = () => {
            if (!this.dragOperation.status.idle) {
              this.actions.stop({ canceled: true });
            }
            this.dragOperation.modifiers.forEach((modifier) => modifier.destroy());
            this.registry.destroy();
            this.collisionObserver.destroy();
          };
          var _a5;
          const raw = config != null ? config : {};
          const plugins = resolveCustomizable(raw.plugins, []);
          const sensors = resolveCustomizable(raw.sensors, []);
          const modifiers = resolveCustomizable(raw.modifiers, []);
          const renderer = (_a5 = raw.renderer) != null ? _a5 : defaultRenderer;
          const monitor = new DragDropMonitor(this);
          const registry = new DragDropRegistry(this);
          this.registry = registry;
          this.monitor = monitor;
          this.renderer = renderer;
          this.actions = new DragActions(this);
          this.dragOperation = new DragOperation(this);
          this.collisionObserver = new CollisionObserver(this);
          this.plugins = [CollisionNotifier, ...plugins];
          this.modifiers = modifiers;
          this.sensors = sensors;
          const { destroy } = this;
          const cleanup = effects(() => {
            var _a23, _b3, _c32;
            const currentModifiers = f(() => this.dragOperation.modifiers);
            const managerModifiers = this.modifiers;
            for (const modifier of currentModifiers) {
              if (!managerModifiers.includes(modifier)) {
                modifier.destroy();
              }
            }
            this.dragOperation.modifiers = (_c32 = (_b3 = (_a23 = this.dragOperation.source) == null ? void 0 : _a23.modifiers) == null ? void 0 : _b3.map((modifier) => {
              const { plugin, options } = descriptor(modifier);
              return new plugin(this, options);
            })) != null ? _c32 : managerModifiers;
          });
          this.destroy = () => {
            cleanup();
            destroy();
          };
        }
        /**
         * Gets the list of active plugins.
         *
         * @returns Array of active plugin instances
         */
        get plugins() {
          return this.registry.plugins.values;
        }
        /**
         * Sets the list of plugins to be used by the manager.
         *
         * @param plugins - Array of plugin constructors or instances
         */
        set plugins(plugins) {
          this.registry.plugins.values = plugins;
        }
        /**
         * Gets the list of active modifiers.
         *
         * @returns Array of active modifier instances
         */
        get modifiers() {
          return this.registry.modifiers.values;
        }
        /**
         * Sets the list of modifiers to be used by the manager.
         *
         * @param modifiers - Array of modifier constructors or instances
         */
        set modifiers(modifiers) {
          this.registry.modifiers.values = modifiers;
        }
        /**
         * Gets the list of active sensors.
         *
         * @returns Array of active sensor instances
         */
        get sensors() {
          return this.registry.sensors.values;
        }
        /**
         * Sets the list of sensors to be used by the manager.
         *
         * @param sensors - Array of sensor constructors or instances
         */
        set sensors(sensors) {
          this.registry.sensors.values = sensors;
        }
      };
    }
  });

  // node_modules/@dnd-kit/dom/utilities.js
  function isKeyframeEffect(effect) {
    if (!effect) return false;
    if (effect instanceof KeyframeEffect) return true;
    return "getKeyframes" in effect && typeof effect.getKeyframes === "function";
  }
  function getFinalKeyframe(element, match) {
    const animations2 = element.getAnimations();
    let result = null;
    for (const animation of animations2) {
      if (animation.playState !== "running") continue;
      const { effect } = animation;
      const keyframes = isKeyframeEffect(effect) ? effect.getKeyframes() : [];
      const matchedKeyframes = keyframes.filter(match);
      if (matchedKeyframes.length > 0) {
        result = [matchedKeyframes[matchedKeyframes.length - 1], animation];
      }
    }
    return result;
  }
  function getBoundingRectangle(element) {
    const { width, height, top, left, bottom, right } = element.getBoundingClientRect();
    return { width, height, top, left, bottom, right };
  }
  function isWindow(element) {
    const elementString = Object.prototype.toString.call(element);
    return elementString === "[object Window]" || // In Electron context the Window object serializes to [object global]
    elementString === "[object global]";
  }
  function isNode(node) {
    return "nodeType" in node;
  }
  function getWindow(target) {
    var _a5, _b3, _c5;
    if (!target) {
      return window;
    }
    if (isWindow(target)) {
      return target;
    }
    if (!isNode(target)) {
      return window;
    }
    if ("defaultView" in target) {
      return (_a5 = target.defaultView) != null ? _a5 : window;
    }
    return (_c5 = (_b3 = target.ownerDocument) == null ? void 0 : _b3.defaultView) != null ? _c5 : window;
  }
  function isDocument(node) {
    const { Document: Document2 } = getWindow(node);
    return node instanceof Document2 || "nodeType" in node && node.nodeType === Node.DOCUMENT_NODE;
  }
  function isHTMLElement(node) {
    if (!node || isWindow(node)) return false;
    return node instanceof getWindow(node).HTMLElement || "namespaceURI" in node && typeof node.namespaceURI === "string" && node.namespaceURI.endsWith("html");
  }
  function isSVGElement(node) {
    return node instanceof getWindow(node).SVGElement || "namespaceURI" in node && typeof node.namespaceURI === "string" && node.namespaceURI.endsWith("svg");
  }
  function getDocument(target) {
    if (!target) {
      return document;
    }
    if (isWindow(target)) {
      return target.document;
    }
    if (!isNode(target)) {
      return document;
    }
    if (isDocument(target)) {
      return target;
    }
    if (isHTMLElement(target) || isSVGElement(target)) {
      return target.ownerDocument;
    }
    return document;
  }
  function getViewportBoundingRectangle(element) {
    var _a5, _b3, _c5, _d3;
    const { documentElement } = getDocument(element);
    const vv = getWindow(element).visualViewport;
    const width = (_a5 = vv == null ? void 0 : vv.width) != null ? _a5 : documentElement.clientWidth;
    const height = (_b3 = vv == null ? void 0 : vv.height) != null ? _b3 : documentElement.clientHeight;
    const top = (_c5 = vv == null ? void 0 : vv.offsetTop) != null ? _c5 : 0;
    const left = (_d3 = vv == null ? void 0 : vv.offsetLeft) != null ? _d3 : 0;
    return {
      top,
      left,
      right: left + width,
      bottom: top + height,
      width,
      height
    };
  }
  function isOverflowVisible(element, style) {
    if (isDetailsElement(element) && element.open === false) {
      return false;
    }
    const { overflow, overflowX, overflowY } = getComputedStyle(element);
    return overflow === "visible" && overflowX === "visible" && overflowY === "visible";
  }
  function isDetailsElement(element) {
    return element.tagName === "DETAILS";
  }
  function getVisibleBoundingRectangle(element, boundingClientRect = element.getBoundingClientRect(), margin = 0) {
    var _a5, _b3, _c5, _d3, _e2;
    let rect = boundingClientRect;
    const { ownerDocument } = element;
    const ownerWindow = (_a5 = ownerDocument.defaultView) != null ? _a5 : window;
    let ancestor = element.parentElement;
    while (ancestor && ancestor !== ownerDocument.documentElement) {
      if (!isOverflowVisible(ancestor)) {
        const ancestorRect = ancestor.getBoundingClientRect();
        const marginTop = margin * (ancestorRect.bottom - ancestorRect.top);
        const marginRight = margin * (ancestorRect.right - ancestorRect.left);
        const marginBottom = margin * (ancestorRect.bottom - ancestorRect.top);
        const marginLeft = margin * (ancestorRect.right - ancestorRect.left);
        rect = {
          top: Math.max(rect.top, ancestorRect.top - marginTop),
          right: Math.min(rect.right, ancestorRect.right + marginRight),
          bottom: Math.min(rect.bottom, ancestorRect.bottom + marginBottom),
          left: Math.max(rect.left, ancestorRect.left - marginLeft),
          width: 0,
          // Will be calculated next
          height: 0
          // Will be calculated next
        };
        rect.width = rect.right - rect.left;
        rect.height = rect.bottom - rect.top;
      }
      ancestor = ancestor.parentElement;
    }
    const vv = ownerWindow.visualViewport;
    const viewportTop = (_b3 = vv == null ? void 0 : vv.offsetTop) != null ? _b3 : 0;
    const viewportLeft = (_c5 = vv == null ? void 0 : vv.offsetLeft) != null ? _c5 : 0;
    const viewportWidth = (_d3 = vv == null ? void 0 : vv.width) != null ? _d3 : ownerWindow.innerWidth;
    const viewportHeight = (_e2 = vv == null ? void 0 : vv.height) != null ? _e2 : ownerWindow.innerHeight;
    const viewportMarginY = margin * viewportHeight;
    const viewportMarginX = margin * viewportWidth;
    rect = {
      top: Math.max(rect.top, viewportTop - viewportMarginY),
      right: Math.min(
        rect.right,
        viewportLeft + viewportWidth + viewportMarginX
      ),
      bottom: Math.min(
        rect.bottom,
        viewportTop + viewportHeight + viewportMarginY
      ),
      left: Math.max(rect.left, viewportLeft - viewportMarginX),
      width: 0,
      // Will be calculated next
      height: 0
      // Will be calculated next
    };
    rect.width = rect.right - rect.left;
    rect.height = rect.bottom - rect.top;
    if (rect.width < 0) {
      rect.width = 0;
    }
    if (rect.height < 0) {
      rect.height = 0;
    }
    return rect;
  }
  function getEventCoordinates(event) {
    return {
      x: event.clientX,
      y: event.clientY
    };
  }
  function getDocuments(rootDoc = document, seen = /* @__PURE__ */ new Set()) {
    if (seen.has(rootDoc)) return [];
    seen.add(rootDoc);
    const docs = [rootDoc];
    for (const frame of Array.from(
      rootDoc.querySelectorAll("iframe, frame")
    )) {
      try {
        const childDoc = frame.contentDocument;
        if (childDoc && !seen.has(childDoc)) {
          docs.push(...getDocuments(childDoc, seen));
        }
      } catch (e2) {
      }
    }
    try {
      const win = rootDoc.defaultView;
      if (win && win !== window.top) {
        const parentWin = win.parent;
        if (parentWin && parentWin.document && parentWin.document !== rootDoc) {
          docs.push(...getDocuments(parentWin.document, seen));
        }
      }
    } catch (e2) {
    }
    return docs;
  }
  function isSafari() {
    return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  }
  function getFixedPositionOffset() {
    var _a5, _b3;
    const vv = isSafari() ? window.visualViewport : null;
    return {
      x: (_a5 = vv == null ? void 0 : vv.offsetLeft) != null ? _a5 : 0,
      y: (_b3 = vv == null ? void 0 : vv.offsetTop) != null ? _b3 : 0
    };
  }
  function isShadowRoot(target) {
    if (!target || !isNode(target)) return false;
    return target instanceof getWindow(target).ShadowRoot;
  }
  function getRoot(target) {
    if (target && isNode(target)) {
      let root = target.getRootNode();
      if (isShadowRoot(root)) {
        return root;
      } else if (root instanceof Document) {
        return root;
      }
    }
    return getDocument(target);
  }
  function prefersReducedMotion(window2) {
    return window2.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }
  function cloneElement(element) {
    const selector = "input, textarea, select, canvas, [contenteditable]";
    const clonedElement = element.cloneNode(true);
    const fields = Array.from(element.querySelectorAll(selector));
    const clonedFields = Array.from(clonedElement.querySelectorAll(selector));
    clonedFields.forEach((field, index) => {
      const originalField = fields[index];
      if (isField(field) && isField(originalField)) {
        if (field.type !== "file") {
          field.value = originalField.value;
        }
        if (field.type === "radio" && field.name) {
          field.name = `Cloned__${field.name}`;
        }
      }
      if (isCanvasElement(field) && isCanvasElement(originalField) && originalField.width > 0 && originalField.height > 0) {
        const destCtx = field.getContext("2d");
        destCtx == null ? void 0 : destCtx.drawImage(originalField, 0, 0);
      }
    });
    return clonedElement;
  }
  function isField(element) {
    return "value" in element;
  }
  function isCanvasElement(element) {
    return element.tagName === "CANVAS";
  }
  function getElementFromPoint(root, { x: x2, y: y2 }) {
    const element = root.elementFromPoint(x2, y2);
    if (isIFrameElement(element)) {
      const { contentDocument } = element;
      if (contentDocument) {
        const { left, top } = element.getBoundingClientRect();
        return getElementFromPoint(contentDocument, {
          x: x2 - left,
          y: y2 - top
        });
      }
    }
    return element;
  }
  function isIFrameElement(element) {
    return (element == null ? void 0 : element.tagName) === "IFRAME";
  }
  function getInteractiveElement(element) {
    return element.closest(`
    input:not([disabled]),
    select:not([disabled]),
    textarea:not([disabled]),
    button:not([disabled]),
    a[href],
    [contenteditable]:not([contenteditable="false"])
  `);
  }
  function getFrameElement(el2) {
    const refWindow = el2 == null ? void 0 : el2.ownerDocument.defaultView;
    if (refWindow && refWindow.self !== refWindow.parent) {
      return refWindow.frameElement;
    }
  }
  function getFrameElements(el2) {
    const frames = /* @__PURE__ */ new Set();
    let frame = getFrameElement(el2);
    while (frame) {
      frames.add(frame);
      frame = getFrameElement(frame);
    }
    return frames;
  }
  function timeout(callback, duration) {
    const id2 = setTimeout(callback, duration);
    return () => clearTimeout(id2);
  }
  function throttle(func, limit) {
    const time = () => performance.now();
    let cancel;
    let lastRan;
    return function(...args) {
      const context = this;
      if (!lastRan) {
        func.apply(context, args);
        lastRan = time();
      } else {
        cancel == null ? void 0 : cancel();
        cancel = timeout(
          () => {
            func.apply(context, args);
            lastRan = time();
          },
          limit - (time() - lastRan)
        );
      }
    };
  }
  function isRectEqual(a2, b2) {
    if (a2 === b2) return true;
    if (!a2 || !b2) return false;
    return a2.top == b2.top && a2.left == b2.left && a2.right == b2.right && a2.bottom == b2.bottom;
  }
  function isVisible(element, boundingClientRect = element.getBoundingClientRect()) {
    const { width, height } = getVisibleBoundingRectangle(
      element,
      boundingClientRect
    );
    return width > 0 && height > 0;
  }
  function addFrameListener(frame, callback) {
    let cached = framePositionObservers.get(frame);
    if (!cached) {
      const observer = new PositionObserver(
        frame,
        (boundingClientRect) => {
          const cached2 = framePositionObservers.get(frame);
          if (!cached2) return;
          cached2.callbacks.forEach((callback2) => callback2(boundingClientRect));
        },
        { skipInitial: true }
      );
      cached = { disconnect: observer.disconnect, callbacks: /* @__PURE__ */ new Set() };
    }
    cached.callbacks.add(callback);
    framePositionObservers.set(frame, cached);
    return () => {
      cached.callbacks.delete(callback);
      if (cached.callbacks.size === 0) {
        framePositionObservers.delete(frame);
        cached.disconnect();
      }
    };
  }
  function observeParentFrames(frames, callback) {
    const cleanup = /* @__PURE__ */ new Set();
    for (const frame of frames) {
      const remove = addFrameListener(frame, callback);
      cleanup.add(remove);
    }
    return () => cleanup.forEach((remove) => remove());
  }
  function addScrollListener(element, callback) {
    var _a5;
    const doc = element.ownerDocument;
    if (!scrollListeners.has(doc)) {
      const controller = new AbortController();
      const listeners2 = /* @__PURE__ */ new Set();
      document.addEventListener(
        "scroll",
        (event) => listeners2.forEach((listener) => listener(event)),
        {
          capture: true,
          passive: true,
          signal: controller.signal
        }
      );
      scrollListeners.set(doc, { disconnect: () => controller.abort(), listeners: listeners2 });
    }
    const { listeners, disconnect } = (_a5 = scrollListeners.get(doc)) != null ? _a5 : {};
    if (!listeners || !disconnect) return () => {
    };
    listeners.add(callback);
    return () => {
      listeners.delete(callback);
      if (listeners.size === 0) {
        disconnect();
        scrollListeners.delete(doc);
      }
    };
  }
  function supportsPopover(element) {
    return "showPopover" in element && "hidePopover" in element && typeof element.showPopover === "function" && typeof element.hidePopover === "function";
  }
  function showPopover(element) {
    try {
      if (supportsPopover(element) && element.isConnected && element.hasAttribute("popover") && // This selector can throw an error in browsers that don't support it
      !element.matches(":popover-open")) {
        element.showPopover();
      }
    } catch (error) {
    }
  }
  function getComputedStyles(element, cached = false) {
    if (!cached) return computeStyles(element);
    let styles = cachedStyles.get(element);
    if (styles) return styles;
    styles = computeStyles(element);
    cachedStyles.set(element, styles);
    scheduler2.schedule(clear);
    return styles;
  }
  function computeStyles(element) {
    return getWindow(element).getComputedStyle(element);
  }
  function isDocumentScrollingElement(element) {
    if (!canUseDOM || !element) {
      return false;
    }
    return element === getDocument(element).scrollingElement;
  }
  function getScrollPosition(scrollableElement) {
    var _a5, _b3;
    const window2 = getWindow(scrollableElement);
    const isDocument2 = isDocumentScrollingElement(scrollableElement);
    const rect = isDocument2 ? getViewportBoundingRectangle(scrollableElement) : getBoundingRectangle(scrollableElement);
    const vv = window2.visualViewport;
    const dimensions = isDocument2 ? {
      height: (_a5 = vv == null ? void 0 : vv.height) != null ? _a5 : window2.innerHeight,
      width: (_b3 = vv == null ? void 0 : vv.width) != null ? _b3 : window2.innerWidth
    } : {
      height: scrollableElement.clientHeight,
      width: scrollableElement.clientWidth
    };
    const rangeX = scrollableElement.scrollWidth - dimensions.width;
    const styles = getComputedStyles(scrollableElement, true);
    const hasNegativeScrollLeft = isDocument2 ? styles.direction === "rtl" : isHorizontalScrollReversed(styles);
    const position = {
      current: {
        x: scrollableElement.scrollLeft,
        y: scrollableElement.scrollTop
      },
      min: {
        x: hasNegativeScrollLeft ? -rangeX : 0,
        y: 0
      },
      max: {
        x: hasNegativeScrollLeft ? 0 : rangeX,
        y: scrollableElement.scrollHeight - dimensions.height
      }
    };
    const isTop = position.current.y <= position.min.y;
    const isLeft = position.current.x <= position.min.x;
    const isBottom = position.current.y >= position.max.y;
    const isRight = position.current.x >= position.max.x;
    return {
      rect,
      position,
      isTop,
      isLeft,
      isBottom,
      isRight
    };
  }
  function isHorizontalScrollReversed(styles) {
    const { direction, display, writingMode } = styles;
    const isVertical = writingMode === "vertical-lr" || writingMode === "vertical-rl" || writingMode === "sideways-lr" || writingMode === "sideways-rl";
    const isReversed = isVertical ? writingMode === "vertical-rl" || writingMode === "sideways-rl" : direction === "rtl";
    if (display !== "flex" && display !== "inline-flex") {
      return isReversed;
    }
    const { flexDirection, flexWrap } = styles;
    const isRow = flexDirection === "row" || flexDirection === "row-reverse";
    const isHorizontalMainAxis = isVertical ? !isRow : isRow;
    const isFlexReversed = isHorizontalMainAxis ? flexDirection === "row-reverse" || flexDirection === "column-reverse" : flexWrap === "wrap-reverse";
    return isReversed !== isFlexReversed;
  }
  function canScroll(scrollableElement, by, scrollPosition = getScrollPosition(scrollableElement)) {
    const { isTop, isBottom, isLeft, isRight, position } = scrollPosition;
    const { x: x2, y: y2 } = by != null ? by : { x: 0, y: 0 };
    const top = !isTop && position.current.y + y2 > position.min.y;
    const bottom = !isBottom && position.current.y + y2 < position.max.y;
    const left = !isLeft && position.current.x + x2 > position.min.x;
    const right = !isRight && position.current.x + x2 < position.max.x;
    return {
      top,
      bottom,
      left,
      right,
      x: left || right,
      y: top || bottom
    };
  }
  function isFixed(node, computedStyle = getComputedStyles(node, true)) {
    return computedStyle.position === "fixed" || computedStyle.position === "sticky";
  }
  function isScrollable(element, computedStyle = getComputedStyles(element, true)) {
    const overflowRegex = /(auto|scroll|overlay)/;
    const properties = ["overflow", "overflowX", "overflowY"];
    return properties.some((property) => {
      const value = computedStyle[property];
      return typeof value === "string" ? overflowRegex.test(value) : false;
    });
  }
  function getScrollableAncestors(element, options = defaultOptions) {
    const { limit, excludeElement, escapeShadowDOM } = options;
    const scrollParents = /* @__PURE__ */ new Set();
    function findScrollableAncestors(node) {
      if (limit != null && scrollParents.size >= limit) {
        return scrollParents;
      }
      if (!node) {
        return scrollParents;
      }
      if (isDocument(node) && node.scrollingElement != null && !scrollParents.has(node.scrollingElement)) {
        scrollParents.add(node.scrollingElement);
        return scrollParents;
      }
      if (escapeShadowDOM && isShadowRoot(node)) {
        return findScrollableAncestors(node.host);
      }
      if (!isHTMLElement(node)) {
        if (isSVGElement(node)) {
          return findScrollableAncestors(node.parentElement);
        }
        return scrollParents;
      }
      if (scrollParents.has(node)) {
        return scrollParents;
      }
      const computedStyle = getComputedStyles(node, true);
      if (excludeElement && node === element) ;
      else if (isScrollable(node, computedStyle)) {
        scrollParents.add(node);
      }
      if (isFixed(node, computedStyle)) {
        const { scrollingElement } = node.ownerDocument;
        if (scrollingElement) scrollParents.add(scrollingElement);
        return scrollParents;
      }
      return findScrollableAncestors(node.parentNode);
    }
    if (!element) {
      return scrollParents;
    }
    return findScrollableAncestors(element);
  }
  function getFrameTransform(el2, boundary = window.frameElement) {
    const transform = {
      x: 0,
      y: 0,
      scaleX: 1,
      scaleY: 1
    };
    if (!el2) return transform;
    let frame = getFrameElement(el2);
    while (frame) {
      if (frame === boundary) {
        return transform;
      }
      const rect = getBoundingRectangle(frame);
      const { x: scaleX, y: scaleY } = getScale(frame, rect);
      transform.x = transform.x + rect.left;
      transform.y = transform.y + rect.top;
      transform.scaleX = transform.scaleX * scaleX;
      transform.scaleY = transform.scaleY * scaleY;
      frame = getFrameElement(frame);
    }
    return transform;
  }
  function getScale(element, boundingRectangle = getBoundingRectangle(element)) {
    const width = Math.round(boundingRectangle.width);
    const height = Math.round(boundingRectangle.height);
    if (isHTMLElement(element)) {
      return {
        x: width / element.offsetWidth,
        y: height / element.offsetHeight
      };
    }
    const styles = getComputedStyles(element, true);
    return {
      x: (parseFloat(styles.width) || width) / width,
      y: (parseFloat(styles.height) || height) / height
    };
  }
  function parseScale(scale) {
    if (!scale || scale === "none") {
      return null;
    }
    const values = scale.split(" ");
    const x2 = parseFloat(values[0]);
    const y2 = parseFloat(values[1]);
    if (isNaN(x2) && isNaN(y2)) {
      return null;
    }
    return {
      x: isNaN(x2) ? y2 : x2,
      y: isNaN(y2) ? x2 : y2
    };
  }
  function parseTranslate(translate) {
    if (!translate || translate === "none") {
      return null;
    }
    const [x2, y2, z = "0"] = translate.split(" ");
    const output = { x: parseFloat(x2), y: parseFloat(y2), z: parseInt(z, 10) };
    if (isNaN(output.x) && isNaN(output.y)) {
      return null;
    }
    return {
      x: isNaN(output.x) ? 0 : output.x,
      y: isNaN(output.y) ? 0 : output.y,
      z: isNaN(output.z) ? 0 : output.z
    };
  }
  function parseTransform(computedStyles) {
    var _a5, _b3, _c5, _d3, _e2, _f2, _g, _h2, _i2;
    const { scale, transform, translate } = computedStyles;
    const parsedScale = parseScale(scale);
    const parsedTranslate = parseTranslate(translate);
    const parsedMatrix = parseTransformMatrix(transform);
    if (!parsedMatrix && !parsedScale && !parsedTranslate) {
      return null;
    }
    const normalizedScale = {
      x: (_a5 = parsedScale == null ? void 0 : parsedScale.x) != null ? _a5 : 1,
      y: (_b3 = parsedScale == null ? void 0 : parsedScale.y) != null ? _b3 : 1
    };
    const normalizedTranslate = {
      x: (_c5 = parsedTranslate == null ? void 0 : parsedTranslate.x) != null ? _c5 : 0,
      y: (_d3 = parsedTranslate == null ? void 0 : parsedTranslate.y) != null ? _d3 : 0
    };
    const normalizedMatrix = {
      x: (_e2 = parsedMatrix == null ? void 0 : parsedMatrix.x) != null ? _e2 : 0,
      y: (_f2 = parsedMatrix == null ? void 0 : parsedMatrix.y) != null ? _f2 : 0,
      scaleX: (_g = parsedMatrix == null ? void 0 : parsedMatrix.scaleX) != null ? _g : 1,
      scaleY: (_h2 = parsedMatrix == null ? void 0 : parsedMatrix.scaleY) != null ? _h2 : 1
    };
    return {
      x: normalizedTranslate.x + normalizedMatrix.x,
      y: normalizedTranslate.y + normalizedMatrix.y,
      z: (_i2 = parsedTranslate == null ? void 0 : parsedTranslate.z) != null ? _i2 : 0,
      scaleX: normalizedScale.x * normalizedMatrix.scaleX,
      scaleY: normalizedScale.y * normalizedMatrix.scaleY
    };
  }
  function parseTransformMatrix(transform) {
    if (transform.startsWith("matrix3d(")) {
      const transformArray = transform.slice(9, -1).split(/, /);
      return {
        x: +transformArray[12],
        y: +transformArray[13],
        scaleX: +transformArray[0],
        scaleY: +transformArray[5]
      };
    } else if (transform.startsWith("matrix(")) {
      const transformArray = transform.slice(7, -1).split(/, /);
      return {
        x: +transformArray[4],
        y: +transformArray[5],
        scaleX: +transformArray[0],
        scaleY: +transformArray[3]
      };
    }
    return null;
  }
  function detectScrollIntent(scrollableElement, coordinates, intent, acceleration = 25, thresholdPercentage = defaultThreshold, tolerance = defaultTolerance, scrollPosition = getScrollPosition(scrollableElement)) {
    const { x: x2, y: y2 } = coordinates;
    const { rect, isTop, isBottom, isLeft, isRight } = scrollPosition;
    const frameTransform = getFrameTransform(scrollableElement);
    const computedStyles = getComputedStyles(scrollableElement, true);
    const parsedTransform = parseTransform(computedStyles);
    const isXAxisInverted = parsedTransform !== null ? (parsedTransform == null ? void 0 : parsedTransform.scaleX) < 0 : false;
    const isYAxisInverted = parsedTransform !== null ? (parsedTransform == null ? void 0 : parsedTransform.scaleY) < 0 : false;
    const scrollContainerRect = new Rectangle(
      rect.left * frameTransform.scaleX + frameTransform.x,
      rect.top * frameTransform.scaleY + frameTransform.y,
      rect.width * frameTransform.scaleX,
      rect.height * frameTransform.scaleY
    );
    const direction = {
      x: 0,
      y: 0
      /* Idle */
    };
    const speed = {
      x: 0,
      y: 0
    };
    const threshold2 = {
      height: scrollContainerRect.height * thresholdPercentage.y,
      width: scrollContainerRect.width * thresholdPercentage.x
    };
    if (threshold2.height > 0 && (!isTop || isYAxisInverted && !isBottom) && y2 <= scrollContainerRect.top + threshold2.height && (intent == null ? void 0 : intent.y) !== 1 && x2 >= scrollContainerRect.left - tolerance.x && x2 <= scrollContainerRect.right + tolerance.x) {
      direction.y = isYAxisInverted ? 1 : -1;
      speed.y = acceleration * Math.abs(
        (scrollContainerRect.top + threshold2.height - y2) / threshold2.height
      );
    } else if (threshold2.height > 0 && (!isBottom || isYAxisInverted && !isTop) && y2 >= scrollContainerRect.bottom - threshold2.height && (intent == null ? void 0 : intent.y) !== -1 && x2 >= scrollContainerRect.left - tolerance.x && x2 <= scrollContainerRect.right + tolerance.x) {
      direction.y = isYAxisInverted ? -1 : 1;
      speed.y = acceleration * Math.abs(
        (scrollContainerRect.bottom - threshold2.height - y2) / threshold2.height
      );
    }
    if (threshold2.width > 0 && (!isRight || isXAxisInverted && !isLeft) && x2 >= scrollContainerRect.right - threshold2.width && (intent == null ? void 0 : intent.x) !== -1 && y2 >= scrollContainerRect.top - tolerance.y && y2 <= scrollContainerRect.bottom + tolerance.y) {
      direction.x = isXAxisInverted ? -1 : 1;
      speed.x = acceleration * Math.abs(
        (scrollContainerRect.right - threshold2.width - x2) / threshold2.width
      );
    } else if (threshold2.width > 0 && (!isLeft || isXAxisInverted && !isRight) && x2 <= scrollContainerRect.left + threshold2.width && (intent == null ? void 0 : intent.x) !== 1 && y2 >= scrollContainerRect.top - tolerance.y && y2 <= scrollContainerRect.bottom + tolerance.y) {
      direction.x = isXAxisInverted ? 1 : -1;
      speed.x = acceleration * Math.abs(
        (scrollContainerRect.left + threshold2.width - x2) / threshold2.width
      );
    }
    return {
      direction,
      speed
    };
  }
  function scrollIntoViewIfNeeded(el2, { block = "nearest", inline = "nearest" } = {}) {
    if (!isHTMLElement(el2)) {
      return;
    }
    const scrollableAncestors = getScrollableAncestors(el2);
    const processedAncestors = [];
    for (const ancestor of scrollableAncestors) {
      if (!isHTMLElement(ancestor)) {
        continue;
      }
      const { top, left } = getOffsetRelativeTo(el2, ancestor);
      let adjustedTop = top;
      let adjustedLeft = left;
      for (const inner of processedAncestors) {
        adjustedTop -= inner.scrollTop;
        adjustedLeft -= inner.scrollLeft;
      }
      if (block !== "none") {
        const overTop = adjustedTop < ancestor.scrollTop;
        const overBottom = adjustedTop + el2.offsetHeight > ancestor.scrollTop + ancestor.clientHeight;
        if (overTop !== overBottom) {
          if (block === "center") {
            ancestor.scrollTop = adjustedTop - ancestor.clientHeight / 2 + el2.offsetHeight / 2;
          } else if (overTop) {
            ancestor.scrollTop = adjustedTop;
          } else {
            ancestor.scrollTop = adjustedTop + el2.offsetHeight - ancestor.clientHeight;
          }
        }
      }
      if (inline !== "none") {
        const overLeft = adjustedLeft < ancestor.scrollLeft;
        const overRight = adjustedLeft + el2.offsetWidth > ancestor.scrollLeft + ancestor.clientWidth;
        if (overLeft !== overRight) {
          if (inline === "center") {
            ancestor.scrollLeft = adjustedLeft - ancestor.clientWidth / 2 + el2.offsetWidth / 2;
          } else if (overLeft) {
            ancestor.scrollLeft = adjustedLeft;
          } else {
            ancestor.scrollLeft = adjustedLeft + el2.offsetWidth - ancestor.clientWidth;
          }
        }
      }
      processedAncestors.push(ancestor);
    }
  }
  function getDocumentOffset(element) {
    let top = 0;
    let left = 0;
    let current = element;
    while (current) {
      top += current.offsetTop;
      left += current.offsetLeft;
      const offsetParent = current.offsetParent;
      if (!isHTMLElement(offsetParent)) {
        break;
      }
      top += offsetParent.clientTop;
      left += offsetParent.clientLeft;
      current = offsetParent;
    }
    return { top, left };
  }
  function getOffsetRelativeTo(element, ancestor) {
    const elOffset = getDocumentOffset(element);
    const ancestorOffset = getDocumentOffset(ancestor);
    return {
      top: elOffset.top - ancestorOffset.top - ancestor.clientTop,
      left: elOffset.left - ancestorOffset.left - ancestor.clientLeft
    };
  }
  function applyTransform(rect, parsedTransform, transformOrigin) {
    const { scaleX, scaleY, x: translateX, y: translateY } = parsedTransform;
    const x2 = rect.left + translateX + (1 - scaleX) * parseFloat(transformOrigin);
    const y2 = rect.top + translateY + (1 - scaleY) * parseFloat(transformOrigin.slice(transformOrigin.indexOf(" ") + 1));
    const w2 = scaleX ? rect.width * scaleX : rect.width;
    const h2 = scaleY ? rect.height * scaleY : rect.height;
    return {
      width: w2,
      height: h2,
      top: y2,
      right: x2 + w2,
      bottom: y2 + h2,
      left: x2
    };
  }
  function inverseTransform(rect, parsedTransform, transformOrigin) {
    const { scaleX, scaleY, x: translateX, y: translateY } = parsedTransform;
    const x2 = rect.left - translateX - (1 - scaleX) * parseFloat(transformOrigin);
    const y2 = rect.top - translateY - (1 - scaleY) * parseFloat(transformOrigin.slice(transformOrigin.indexOf(" ") + 1));
    const w2 = scaleX ? rect.width / scaleX : rect.width;
    const h2 = scaleY ? rect.height / scaleY : rect.height;
    return {
      width: w2,
      height: h2,
      top: y2,
      right: x2 + w2,
      bottom: y2 + h2,
      left: x2
    };
  }
  function animateTransform({ element, keyframes, options }) {
    return element.animate(keyframes, options).finished;
  }
  function computeTranslate(element, translate = getComputedStyles(element).translate, projected = true) {
    if (projected) {
      const keyframe = getFinalKeyframe(
        element,
        (keyframe2) => "translate" in keyframe2
      );
      if (keyframe) {
        const { translate: translate2 = "" } = keyframe[0];
        if (typeof translate2 === "string") {
          const finalTranslate = parseTranslate(translate2);
          if (finalTranslate) {
            return finalTranslate;
          }
        }
      }
    }
    if (translate) {
      const finalTranslate = parseTranslate(translate);
      if (finalTranslate) {
        return finalTranslate;
      }
    }
    return { x: 0, y: 0, z: 0 };
  }
  function getDocumentAnimations(element) {
    const document2 = element.ownerDocument;
    let documentAnimations = animations.get(document2);
    if (documentAnimations) return documentAnimations;
    documentAnimations = document2.getAnimations();
    animations.set(document2, documentAnimations);
    scheduler3.schedule(clear2);
    const elementAnimations = documentAnimations.filter(
      (animation) => isKeyframeEffect(animation.effect) && animation.effect.target === element
    );
    animations.set(element, elementAnimations);
    return documentAnimations;
  }
  function forceFinishAnimations(element, options) {
    const animations2 = getDocumentAnimations(element).filter((animation) => {
      var _a5, _b3;
      if (isKeyframeEffect(animation.effect)) {
        const { target } = animation.effect;
        const isValidTarget = (_b3 = target && ((_a5 = options.isValidTarget) == null ? void 0 : _a5.call(options, target))) != null ? _b3 : true;
        if (isValidTarget) {
          return animation.effect.getKeyframes().some((keyframe) => {
            for (const property of options.properties) {
              if (keyframe[property]) return true;
            }
          });
        }
      }
    }).map((animation) => {
      const { effect, currentTime } = animation;
      const duration = effect == null ? void 0 : effect.getComputedTiming().duration;
      if (animation.pending || animation.playState === "finished") return;
      if (typeof duration == "number" && typeof currentTime == "number" && currentTime < duration) {
        animation.currentTime = duration;
        return () => {
          animation.currentTime = currentTime;
        };
      }
    });
    if (animations2.length > 0) {
      return () => animations2.forEach((reset) => reset == null ? void 0 : reset());
    }
  }
  function getProjectedTransform(element, computedStyles) {
    const animations2 = element.getAnimations();
    if (!animations2.length) return null;
    let latestTransform;
    let latestTranslate;
    let latestScale;
    let hasAnimatedProperty = false;
    for (const animation of animations2) {
      if (animation.playState !== "running") continue;
      const keyframes = isKeyframeEffect(animation.effect) ? animation.effect.getKeyframes() : [];
      const keyframe = keyframes[keyframes.length - 1];
      if (!keyframe) continue;
      const { transform, translate, scale } = keyframe;
      if (typeof transform === "string" && transform) {
        latestTransform = transform;
        hasAnimatedProperty = true;
      }
      if (typeof translate === "string" && translate) {
        latestTranslate = translate;
        hasAnimatedProperty = true;
      }
      if (typeof scale === "string" && scale) {
        latestScale = scale;
        hasAnimatedProperty = true;
      }
    }
    if (!hasAnimatedProperty) return null;
    return parseTransform({
      transform: latestTransform != null ? latestTransform : computedStyles.transform,
      translate: latestTranslate != null ? latestTranslate : computedStyles.translate,
      scale: latestScale != null ? latestScale : computedStyles.scale
    });
  }
  function supportsStyle(element) {
    return "style" in element && typeof element.style === "object" && element.style !== null && "setProperty" in element.style && "removeProperty" in element.style && typeof element.style.setProperty === "function" && typeof element.style.removeProperty === "function";
  }
  function isElement(target) {
    if (!target) return false;
    return target instanceof getWindow(target).Element || isNode(target) && target.nodeType === Node.ELEMENT_NODE;
  }
  function isKeyboardEvent(event) {
    if (!event) return false;
    const { KeyboardEvent } = getWindow(event.target);
    return event instanceof KeyboardEvent;
  }
  function isPointerEvent(event) {
    if (!event) return false;
    const { PointerEvent } = getWindow(event.target);
    return event instanceof PointerEvent;
  }
  function isTextInput(target) {
    if (!isElement(target)) return false;
    const { tagName } = target;
    return tagName === "INPUT" || tagName === "TEXTAREA" || isContentEditable(target);
  }
  function isContentEditable(element) {
    return element.hasAttribute("contenteditable") && element.getAttribute("contenteditable") !== "false";
  }
  function generateUniqueId(prefix) {
    const id2 = ids[prefix] == null ? 0 : ids[prefix] + 1;
    ids[prefix] = id2;
    return `${prefix}-${id2}`;
  }
  var __typeError4, __accessCheck4, __privateGet4, __privateAdd4, __privateSet4, __privateMethod4, canUseDOM, ProxiedElements, Listeners, Observer, _initialized, ResizeNotifier, threshold, THROTTLE_INTERVAL, _visible, _previousBoundingClientRect, _resizeObserver, _positionObserver, _visibilityObserver, _debug, _disconnected, _observePosition, _PositionObserver_instances, notify_fn, updateDebug_fn, PositionObserver, framePositionObservers, scrollListeners, _elementObserver, _disconnected2, _frames, _handleScroll, FrameObserver, Scheduler, scheduler, scheduler2, cachedStyles, clear, defaultOptions, ScrollDirection, defaultThreshold, defaultTolerance, scheduler3, animations, clear2, DOMRectangle, Styles, ids;
  var init_utilities = __esm({
    "node_modules/@dnd-kit/dom/utilities.js"() {
      init_dist2();
      __typeError4 = (msg) => {
        throw TypeError(msg);
      };
      __accessCheck4 = (obj, member, msg) => member.has(obj) || __typeError4("Cannot " + msg);
      __privateGet4 = (obj, member, getter) => (__accessCheck4(obj, member, "read from private field"), member.get(obj));
      __privateAdd4 = (obj, member, value) => member.has(obj) ? __typeError4("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
      __privateSet4 = (obj, member, value, setter) => (__accessCheck4(obj, member, "write to private field"), member.set(obj, value), value);
      __privateMethod4 = (obj, member, method) => (__accessCheck4(obj, member, "access private method"), method);
      canUseDOM = typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined";
      ProxiedElements = /* @__PURE__ */ new WeakMap();
      Listeners = class {
        constructor() {
          this.entries = /* @__PURE__ */ new Set();
          this.clear = () => {
            for (const entry of this.entries) {
              const [target, { type, listener, options }] = entry;
              target.removeEventListener(type, listener, options);
            }
            this.entries.clear();
          };
        }
        bind(target, input) {
          const eventTargets = Array.isArray(target) ? target : [target];
          const listeners = Array.isArray(input) ? input : [input];
          const entries = [];
          for (const target2 of eventTargets) {
            for (const descriptor2 of listeners) {
              const { type, listener, options } = descriptor2;
              const entry = [target2, descriptor2];
              target2.addEventListener(type, listener, options);
              this.entries.add(entry);
              entries.push(entry);
            }
          }
          const allEntries = this.entries;
          return function cleanup() {
            for (const entry of entries) {
              const [target2, { type, listener, options }] = entry;
              target2.removeEventListener(type, listener, options);
              allEntries.delete(entry);
            }
          };
        }
      };
      Observer = typeof ResizeObserver !== "undefined" ? ResizeObserver : class MockResizeObserver {
        observe() {
        }
        unobserve() {
        }
        disconnect() {
        }
      };
      ResizeNotifier = class extends Observer {
        constructor(callback) {
          super((entries) => {
            if (!__privateGet4(this, _initialized)) {
              __privateSet4(this, _initialized, true);
              return;
            }
            callback(entries, this);
          });
          __privateAdd4(this, _initialized, false);
        }
      };
      _initialized = /* @__PURE__ */ new WeakMap();
      threshold = Array.from({ length: 100 }, (_2, index) => index / 100);
      THROTTLE_INTERVAL = 75;
      PositionObserver = class {
        constructor(element, callback, options = {
          debug: false,
          skipInitial: false
        }) {
          this.element = element;
          this.callback = callback;
          __privateAdd4(this, _PositionObserver_instances);
          this.disconnect = () => {
            var _a5, _b3, _c5;
            __privateSet4(this, _disconnected, true);
            (_a5 = __privateGet4(this, _resizeObserver)) == null ? void 0 : _a5.disconnect();
            (_b3 = __privateGet4(this, _positionObserver)) == null ? void 0 : _b3.disconnect();
            __privateGet4(this, _visibilityObserver).disconnect();
            (_c5 = __privateGet4(this, _debug)) == null ? void 0 : _c5.remove();
          };
          __privateAdd4(this, _visible, true);
          __privateAdd4(this, _previousBoundingClientRect);
          __privateAdd4(this, _resizeObserver);
          __privateAdd4(this, _positionObserver);
          __privateAdd4(this, _visibilityObserver);
          __privateAdd4(this, _debug);
          __privateAdd4(this, _disconnected, false);
          __privateAdd4(this, _observePosition, throttle(() => {
            var _a5, _b3, _c5;
            const { element: element2 } = this;
            (_a5 = __privateGet4(this, _positionObserver)) == null ? void 0 : _a5.disconnect();
            if (__privateGet4(this, _disconnected) || !__privateGet4(this, _visible) || !element2.isConnected) {
              return;
            }
            const root2 = (_b3 = element2.ownerDocument) != null ? _b3 : document;
            const { innerHeight, innerWidth } = (_c5 = root2.defaultView) != null ? _c5 : window;
            const clientRect = element2.getBoundingClientRect();
            const visibleRect = getVisibleBoundingRectangle(element2, clientRect);
            const { top, left, bottom, right } = visibleRect;
            const insetTop = -Math.floor(top);
            const insetLeft = -Math.floor(left);
            const insetRight = -Math.floor(innerWidth - right);
            const insetBottom = -Math.floor(innerHeight - bottom);
            const rootMargin = `${insetTop}px ${insetRight}px ${insetBottom}px ${insetLeft}px`;
            this.boundingClientRect = clientRect;
            __privateSet4(this, _positionObserver, new IntersectionObserver(
              (entries) => {
                const [entry] = entries;
                const { intersectionRect } = entry;
                const intersectionRatio = entry.intersectionRatio !== 1 ? entry.intersectionRatio : Rectangle.intersectionRatio(
                  intersectionRect,
                  getVisibleBoundingRectangle(element2)
                );
                if (intersectionRatio !== 1) {
                  __privateGet4(this, _observePosition).call(this);
                }
              },
              {
                threshold,
                rootMargin,
                root: root2
              }
            ));
            __privateGet4(this, _positionObserver).observe(element2);
            __privateMethod4(this, _PositionObserver_instances, notify_fn).call(this);
          }, THROTTLE_INTERVAL));
          this.boundingClientRect = element.getBoundingClientRect();
          __privateSet4(this, _visible, isVisible(element, this.boundingClientRect));
          let initial = true;
          this.callback = (boundingClientRect) => {
            if (initial) {
              initial = false;
              if (options.skipInitial) return;
            }
            callback(boundingClientRect);
          };
          const root = element.ownerDocument;
          if (options == null ? void 0 : options.debug) {
            __privateSet4(this, _debug, document.createElement("div"));
            __privateGet4(this, _debug).style.background = "rgba(0,0,0,0.15)";
            __privateGet4(this, _debug).style.position = "fixed";
            __privateGet4(this, _debug).style.pointerEvents = "none";
            root.body.appendChild(__privateGet4(this, _debug));
          }
          __privateSet4(this, _visibilityObserver, new IntersectionObserver(
            (entries) => {
              var _a5, _b3;
              const entry = entries[entries.length - 1];
              const { boundingClientRect, isIntersecting: visible } = entry;
              const { width, height } = boundingClientRect;
              const previousVisible = __privateGet4(this, _visible);
              __privateSet4(this, _visible, visible);
              if (!width && !height) return;
              if (previousVisible && !visible) {
                (_a5 = __privateGet4(this, _positionObserver)) == null ? void 0 : _a5.disconnect();
                this.callback(null);
                (_b3 = __privateGet4(this, _resizeObserver)) == null ? void 0 : _b3.disconnect();
                __privateSet4(this, _resizeObserver, void 0);
                if (__privateGet4(this, _debug)) __privateGet4(this, _debug).style.visibility = "hidden";
              } else {
                __privateGet4(this, _observePosition).call(this);
              }
              if (visible && !__privateGet4(this, _resizeObserver)) {
                __privateSet4(this, _resizeObserver, new ResizeNotifier(__privateGet4(this, _observePosition)));
                __privateGet4(this, _resizeObserver).observe(element);
              }
            },
            {
              threshold,
              root
            }
          ));
          if (__privateGet4(this, _visible) && !options.skipInitial) {
            this.callback(this.boundingClientRect);
          }
          __privateGet4(this, _visibilityObserver).observe(element);
        }
      };
      _visible = /* @__PURE__ */ new WeakMap();
      _previousBoundingClientRect = /* @__PURE__ */ new WeakMap();
      _resizeObserver = /* @__PURE__ */ new WeakMap();
      _positionObserver = /* @__PURE__ */ new WeakMap();
      _visibilityObserver = /* @__PURE__ */ new WeakMap();
      _debug = /* @__PURE__ */ new WeakMap();
      _disconnected = /* @__PURE__ */ new WeakMap();
      _observePosition = /* @__PURE__ */ new WeakMap();
      _PositionObserver_instances = /* @__PURE__ */ new WeakSet();
      notify_fn = function() {
        if (__privateGet4(this, _disconnected)) return;
        __privateMethod4(this, _PositionObserver_instances, updateDebug_fn).call(this);
        if (isRectEqual(this.boundingClientRect, __privateGet4(this, _previousBoundingClientRect)))
          return;
        this.callback(this.boundingClientRect);
        __privateSet4(this, _previousBoundingClientRect, this.boundingClientRect);
      };
      updateDebug_fn = function() {
        if (__privateGet4(this, _debug)) {
          const { top, left, width, height } = getVisibleBoundingRectangle(
            this.element
          );
          __privateGet4(this, _debug).style.overflow = "hidden";
          __privateGet4(this, _debug).style.visibility = "visible";
          __privateGet4(this, _debug).style.top = `${Math.floor(top)}px`;
          __privateGet4(this, _debug).style.left = `${Math.floor(left)}px`;
          __privateGet4(this, _debug).style.width = `${Math.floor(width)}px`;
          __privateGet4(this, _debug).style.height = `${Math.floor(height)}px`;
        }
      };
      framePositionObservers = /* @__PURE__ */ new WeakMap();
      scrollListeners = /* @__PURE__ */ new WeakMap();
      FrameObserver = class {
        constructor(element, callback, options) {
          this.callback = callback;
          __privateAdd4(this, _elementObserver);
          __privateAdd4(this, _disconnected2, false);
          __privateAdd4(this, _frames);
          __privateAdd4(this, _handleScroll, throttle((event) => {
            if (__privateGet4(this, _disconnected2)) return;
            if (!event.target) return;
            if ("contains" in event.target && typeof event.target.contains === "function") {
              for (const frame of __privateGet4(this, _frames)) {
                if (event.target.contains(frame)) {
                  this.callback(__privateGet4(this, _elementObserver).boundingClientRect);
                  break;
                }
              }
            }
          }, THROTTLE_INTERVAL));
          const frames = getFrameElements(element);
          const unobserveParentFrames = observeParentFrames(frames, callback);
          const removeScrollListener = addScrollListener(element, __privateGet4(this, _handleScroll));
          __privateSet4(this, _frames, frames);
          __privateSet4(this, _elementObserver, new PositionObserver(element, callback, options));
          this.disconnect = () => {
            if (__privateGet4(this, _disconnected2)) return;
            __privateSet4(this, _disconnected2, true);
            unobserveParentFrames();
            removeScrollListener();
            __privateGet4(this, _elementObserver).disconnect();
          };
        }
      };
      _elementObserver = /* @__PURE__ */ new WeakMap();
      _disconnected2 = /* @__PURE__ */ new WeakMap();
      _frames = /* @__PURE__ */ new WeakMap();
      _handleScroll = /* @__PURE__ */ new WeakMap();
      Scheduler = class {
        constructor(scheduler4) {
          this.scheduler = scheduler4;
          this.pending = false;
          this.tasks = /* @__PURE__ */ new Set();
          this.resolvers = /* @__PURE__ */ new Set();
          this.flush = () => {
            const { tasks, resolvers } = this;
            this.pending = false;
            this.tasks = /* @__PURE__ */ new Set();
            this.resolvers = /* @__PURE__ */ new Set();
            for (const task of tasks) {
              task();
            }
            for (const resolve of resolvers) {
              resolve();
            }
          };
        }
        schedule(task) {
          this.tasks.add(task);
          if (!this.pending) {
            this.pending = true;
            this.scheduler(this.flush);
          }
          return new Promise((resolve) => this.resolvers.add(resolve));
        }
      };
      scheduler = new Scheduler((callback) => {
        if (typeof requestAnimationFrame === "function") {
          requestAnimationFrame(callback);
        } else {
          callback();
        }
      });
      scheduler2 = new Scheduler((callback) => setTimeout(callback, 50));
      cachedStyles = /* @__PURE__ */ new Map();
      clear = cachedStyles.clear.bind(cachedStyles);
      defaultOptions = {
        excludeElement: true,
        escapeShadowDOM: true
      };
      ScrollDirection = /* @__PURE__ */ ((ScrollDirection2) => {
        ScrollDirection2[ScrollDirection2["Idle"] = 0] = "Idle";
        ScrollDirection2[ScrollDirection2["Forward"] = 1] = "Forward";
        ScrollDirection2[ScrollDirection2["Reverse"] = -1] = "Reverse";
        return ScrollDirection2;
      })(ScrollDirection || {});
      defaultThreshold = {
        x: 0.2,
        y: 0.2
      };
      defaultTolerance = {
        x: 10,
        y: 10
      };
      scheduler3 = new Scheduler((callback) => setTimeout(callback, 0));
      animations = /* @__PURE__ */ new Map();
      clear2 = animations.clear.bind(animations);
      DOMRectangle = class extends Rectangle {
        constructor(element, options = {}) {
          var _a5, _b3, _c5, _d3;
          const {
            frameTransform = getFrameTransform(element),
            ignoreTransforms,
            getBoundingClientRect = getBoundingRectangle
          } = options;
          const resetAnimations = forceFinishAnimations(element, {
            properties: ["transform", "translate", "scale", "width", "height"],
            isValidTarget: (target) => (target !== element || isSafari()) && target.contains(element)
          });
          const boundingRectangle = getBoundingClientRect(element);
          let { top, left, width, height } = boundingRectangle;
          let updated;
          const computedStyles = getComputedStyles(element);
          const parsedTransform = parseTransform(computedStyles);
          const scale = {
            x: (_a5 = parsedTransform == null ? void 0 : parsedTransform.scaleX) != null ? _a5 : 1,
            y: (_b3 = parsedTransform == null ? void 0 : parsedTransform.scaleY) != null ? _b3 : 1
          };
          const projectedTransform = getProjectedTransform(element, computedStyles);
          resetAnimations == null ? void 0 : resetAnimations();
          if (parsedTransform) {
            updated = inverseTransform(
              boundingRectangle,
              parsedTransform,
              computedStyles.transformOrigin
            );
            if (ignoreTransforms || projectedTransform) {
              top = updated.top;
              left = updated.left;
              width = updated.width;
              height = updated.height;
            }
          }
          const intrinsic = {
            width: (_c5 = updated == null ? void 0 : updated.width) != null ? _c5 : width,
            height: (_d3 = updated == null ? void 0 : updated.height) != null ? _d3 : height
          };
          if (projectedTransform && !ignoreTransforms && updated) {
            const projected = applyTransform(
              updated,
              projectedTransform,
              computedStyles.transformOrigin
            );
            top = projected.top;
            left = projected.left;
            width = projected.width;
            height = projected.height;
            scale.x = projectedTransform.scaleX;
            scale.y = projectedTransform.scaleY;
          }
          if (frameTransform) {
            if (!ignoreTransforms) {
              left *= frameTransform.scaleX;
              width *= frameTransform.scaleX;
              top *= frameTransform.scaleY;
              height *= frameTransform.scaleY;
            }
            left += frameTransform.x;
            top += frameTransform.y;
          }
          super(left, top, width, height);
          this.scale = scale;
          this.intrinsicWidth = intrinsic.width;
          this.intrinsicHeight = intrinsic.height;
        }
      };
      Styles = class {
        constructor(element) {
          this.element = element;
          this.initial = /* @__PURE__ */ new Map();
        }
        set(properties, prefix = "") {
          const { element } = this;
          if (!supportsStyle(element)) {
            return;
          }
          for (const [key, value] of Object.entries(properties)) {
            const property = `${prefix}${key}`;
            if (!this.initial.has(property)) {
              this.initial.set(property, element.style.getPropertyValue(property));
            }
            element.style.setProperty(
              property,
              typeof value === "string" ? value : `${value}px`
            );
          }
        }
        remove(properties, prefix = "") {
          const { element } = this;
          if (!supportsStyle(element)) {
            return;
          }
          for (const key of properties) {
            const property = `${prefix}${key}`;
            element.style.removeProperty(property);
          }
        }
        reset() {
          const { element } = this;
          if (!supportsStyle(element)) {
            return;
          }
          for (const [key, value] of this.initial) {
            element.style.setProperty(key, value);
          }
          if (element.getAttribute("style") === "") {
            element.removeAttribute("style");
          }
        }
      };
      ids = {};
    }
  });

  // node_modules/@dnd-kit/collision/dist/index.js
  var pointerIntersection, shapeIntersection, defaultCollisionDetection, closestCorners;
  var init_dist3 = __esm({
    "node_modules/@dnd-kit/collision/dist/index.js"() {
      init_abstract();
      init_dist2();
      init_abstract();
      init_dist2();
      init_abstract();
      init_dist2();
      pointerIntersection = ({
        dragOperation,
        droppable
      }) => {
        const pointerCoordinates = dragOperation.position.current;
        if (!pointerCoordinates) {
          return null;
        }
        const { id: id2 } = droppable;
        if (!droppable.shape) {
          return null;
        }
        if (droppable.shape.containsPoint(pointerCoordinates)) {
          const distance = Point.distance(droppable.shape.center, pointerCoordinates);
          return {
            id: id2,
            value: 1 / distance,
            type: CollisionType.PointerIntersection,
            priority: CollisionPriority.High
          };
        }
        return null;
      };
      shapeIntersection = ({
        dragOperation,
        droppable
      }) => {
        const { shape } = dragOperation;
        if (!droppable.shape || !(shape == null ? void 0 : shape.current)) {
          return null;
        }
        const intersectionArea = shape.current.intersectionArea(droppable.shape);
        if (intersectionArea) {
          const { position } = dragOperation;
          const distance = Point.distance(droppable.shape.center, position.current);
          const intersectionRatio = intersectionArea / (shape.current.area + droppable.shape.area - intersectionArea);
          const value = intersectionRatio / distance;
          return {
            id: droppable.id,
            value,
            type: CollisionType.ShapeIntersection,
            priority: CollisionPriority.Normal
          };
        }
        return null;
      };
      defaultCollisionDetection = (args) => {
        var _a5;
        return (_a5 = pointerIntersection(args)) != null ? _a5 : shapeIntersection(args);
      };
      closestCorners = (input) => {
        const { dragOperation, droppable } = input;
        const { shape, position } = dragOperation;
        if (!droppable.shape) {
          return null;
        }
        const shapeCorners = shape ? Rectangle.from(shape.current.boundingRectangle).corners : void 0;
        const distance = Rectangle.from(
          droppable.shape.boundingRectangle
        ).corners.reduce(
          (acc, corner, index) => {
            var _a5;
            return acc + Point.distance(
              Point.from(corner),
              (_a5 = shapeCorners == null ? void 0 : shapeCorners[index]) != null ? _a5 : position.current
            );
          },
          0
        );
        const value = distance / 4;
        return {
          id: droppable.id,
          value: 1 / value,
          type: CollisionType.Collision,
          priority: CollisionPriority.Normal
        };
      };
    }
  });

  // node_modules/@dnd-kit/dom/index.js
  function isFocusable(element) {
    const tagName = element.tagName.toLowerCase();
    return ["input", "select", "textarea", "a", "button"].includes(tagName);
  }
  function supportsPressedState(element) {
    var _a5;
    return ((_a5 = element.getAttribute("role")) != null ? _a5 : "button") === "button";
  }
  function createHiddenText(id2, value) {
    const element = document.createElement("div");
    element.id = id2;
    element.style.setProperty("display", "none");
    element.textContent = value;
    return element;
  }
  function createLiveRegion(id2) {
    const element = document.createElement("div");
    element.id = id2;
    element.setAttribute("role", "status");
    element.setAttribute("aria-live", "polite");
    element.setAttribute("aria-atomic", "true");
    element.style.setProperty("position", "fixed");
    element.style.setProperty("width", "1px");
    element.style.setProperty("height", "1px");
    element.style.setProperty("margin", "-1px");
    element.style.setProperty("border", "0");
    element.style.setProperty("padding", "0");
    element.style.setProperty("overflow", "hidden");
    element.style.setProperty("clip", "rect(0 0 0 0)");
    element.style.setProperty("clip-path", "inset(100%)");
    element.style.setProperty("white-space", "nowrap");
    return element;
  }
  function debounce(fn2, wait) {
    let timeout2;
    const debounced = () => {
      clearTimeout(timeout2);
      timeout2 = setTimeout(fn2, wait);
    };
    debounced.cancel = () => clearTimeout(timeout2);
    return debounced;
  }
  function isAttached(root) {
    return isShadowRoot(root) ? root.host.isConnected : root.defaultView != null;
  }
  function createPlaceholder(source, type = "hidden") {
    return f(() => {
      const { element, manager } = source;
      if (!element || !manager) return;
      const containedDroppables = findContainedDroppables(
        element,
        manager.registry.droppables
      );
      const cleanup = [];
      const placeholder = cloneElement(element);
      const { remove } = placeholder;
      proxyDroppableElements(containedDroppables, placeholder, cleanup);
      configurePlaceholder(placeholder, type);
      placeholder.remove = () => {
        cleanup.forEach((fn2) => fn2());
        remove.call(placeholder);
      };
      return placeholder;
    });
  }
  function findContainedDroppables(element, droppables) {
    const containedDroppables = /* @__PURE__ */ new Map();
    for (const droppable of droppables) {
      if (!droppable.element) continue;
      if (element === droppable.element || element.contains(droppable.element)) {
        const identifierAttribute = `${ATTR_PREFIX}${generateUniqueId("dom-id")}`;
        droppable.element.setAttribute(identifierAttribute, "");
        containedDroppables.set(droppable, identifierAttribute);
      }
    }
    return containedDroppables;
  }
  function proxyDroppableElements(containedDroppables, placeholder, cleanup) {
    for (const [droppable, identifierAttribute] of containedDroppables) {
      if (!droppable.element) continue;
      const selector = `[${identifierAttribute}]`;
      const clonedElement = placeholder.matches(selector) ? placeholder : placeholder.querySelector(selector);
      droppable.element.removeAttribute(identifierAttribute);
      if (!clonedElement) continue;
      const originalElement = droppable.element;
      droppable.proxy = clonedElement;
      clonedElement.removeAttribute(identifierAttribute);
      ProxiedElements.set(originalElement, clonedElement);
      cleanup.push(() => {
        ProxiedElements.delete(originalElement);
        droppable.proxy = void 0;
      });
    }
  }
  function configurePlaceholder(placeholder, type = "hidden") {
    placeholder.setAttribute("inert", "true");
    placeholder.setAttribute("tab-index", "-1");
    placeholder.setAttribute("aria-hidden", "true");
    placeholder.setAttribute(PLACEHOLDER_ATTRIBUTE, type);
  }
  function isSameFrame(element, target) {
    if (element === target) return true;
    return getFrameElement(element) === getFrameElement(target);
  }
  function preventPopoverClose(event) {
    const { target } = event;
    if ("newState" in event && event.newState === "closed" && isElement(target) && target.hasAttribute("popover")) {
      requestAnimationFrame(() => showPopover(target));
    }
  }
  function isTableRow(element) {
    return element.tagName === "TR";
  }
  function createElementMutationObserver(element, placeholder, clone) {
    const observer = new MutationObserver((mutations) => {
      let hasChildrenMutations = false;
      for (const mutation of mutations) {
        if (mutation.target !== element) {
          hasChildrenMutations = true;
          continue;
        }
        if (mutation.type !== "attributes") {
          continue;
        }
        const attributeName = mutation.attributeName;
        if (attributeName.startsWith("aria-") || IGNORED_ATTRIBUTES.includes(attributeName)) {
          continue;
        }
        const attributeValue = element.getAttribute(attributeName);
        if (attributeName === "style") {
          if (supportsStyle(element) && supportsStyle(placeholder)) {
            const styles = element.style;
            for (const key of Array.from(placeholder.style)) {
              if (styles.getPropertyValue(key) === "") {
                placeholder.style.removeProperty(key);
              }
            }
            for (const key of Array.from(styles)) {
              if (IGNORED_STYLES.includes(key) || key.startsWith(CSS_PREFIX)) {
                continue;
              }
              const value = styles.getPropertyValue(key);
              placeholder.style.setProperty(key, value);
            }
          }
        } else if (attributeValue !== null) {
          placeholder.setAttribute(attributeName, attributeValue);
        } else {
          placeholder.removeAttribute(attributeName);
        }
      }
      if (hasChildrenMutations && clone) {
        placeholder.replaceChildren(...element.cloneNode(true).childNodes);
      }
    });
    observer.observe(element, {
      attributes: true,
      subtree: true,
      childList: true
    });
    return observer;
  }
  function createDocumentMutationObserver(element, placeholder, feedbackElement) {
    const observer = new MutationObserver((entries) => {
      for (const entry of entries) {
        if (entry.addedNodes.length === 0) continue;
        for (const node of Array.from(entry.addedNodes)) {
          if (node.contains(element) && element.nextElementSibling !== placeholder) {
            element.insertAdjacentElement("afterend", placeholder);
            showPopover(feedbackElement);
            return;
          }
          if (node.contains(placeholder) && placeholder.previousElementSibling !== element) {
            placeholder.insertAdjacentElement("beforebegin", element);
            showPopover(feedbackElement);
            return;
          }
        }
      }
      if (element.isConnected && placeholder.isConnected && element.nextElementSibling !== placeholder) {
        element.insertAdjacentElement("afterend", placeholder);
        showPopover(feedbackElement);
      }
    });
    observer.observe(element.ownerDocument.body, {
      childList: true,
      subtree: true
    });
    return observer;
  }
  function createResizeObserver(ctx) {
    return new ResizeObserver(() => {
      var _a5, _b22, _c32;
      const placeholderShape = new DOMRectangle(ctx.placeholder, {
        frameTransform: ctx.frameTransform,
        ignoreTransforms: true
      });
      const origin = (_a5 = ctx.transformOrigin) != null ? _a5 : { x: 1, y: 1 };
      const dX = (ctx.width - placeholderShape.width) * origin.x + ctx.delta.x;
      const dY = (ctx.height - placeholderShape.height) * origin.y + ctx.delta.y;
      const fixedOffset = getFixedPositionOffset();
      ctx.styles.set(
        {
          width: placeholderShape.width - ctx.widthOffset,
          height: placeholderShape.height - ctx.heightOffset,
          top: ctx.top + dY + fixedOffset.y,
          left: ctx.left + dX + fixedOffset.x
        },
        CSS_PREFIX
      );
      (_b22 = ctx.getElementMutationObserver()) == null ? void 0 : _b22.takeRecords();
      if (isTableRow(ctx.element) && isTableRow(ctx.placeholder)) {
        const cells = Array.from(ctx.element.cells);
        const placeholderCells = Array.from(ctx.placeholder.cells);
        if (!ctx.getSavedCellWidths()) {
          ctx.setSavedCellWidths(cells.map((cell) => cell.style.width));
        }
        for (const [index, cell] of cells.entries()) {
          const placeholderCell = placeholderCells[index];
          cell.style.width = `${placeholderCell.getBoundingClientRect().width}px`;
        }
      }
      const translate = (_c32 = ctx.getTranslate()) != null ? _c32 : { x: 0, y: 0 };
      const shapeLeft = ctx.left + dX + fixedOffset.x + translate.x;
      const shapeTop = ctx.top + dY + fixedOffset.y + translate.y;
      const shapeWidth = placeholderShape.width - ctx.widthOffset;
      const shapeHeight = placeholderShape.height - ctx.heightOffset;
      const ft2 = ctx.frameTransform;
      ctx.dragOperation.shape = new Rectangle(
        shapeLeft * ft2.scaleX + ft2.x,
        shapeTop * ft2.scaleY + ft2.y,
        shapeWidth * ft2.scaleX,
        shapeHeight * ft2.scaleY
      );
    });
  }
  function runDropAnimation(ctx) {
    var _a5, _b22, _c32, _d22;
    const { animation } = ctx;
    if (typeof animation === "function") {
      const result = animation({
        source: ctx.source,
        element: ctx.element,
        feedbackElement: ctx.feedbackElement,
        placeholder: ctx.placeholder,
        translate: ctx.translate,
        moved: ctx.moved
      });
      Promise.resolve(result).then(() => {
        ctx.cleanup();
        requestAnimationFrame(ctx.restoreFocus);
      });
      return;
    }
    const {
      duration = DEFAULT_DURATION,
      easing = DEFAULT_EASING
    } = animation != null ? animation : {};
    showPopover(ctx.feedbackElement);
    const [, runningAnimation] = (_a5 = getFinalKeyframe(
      ctx.feedbackElement,
      (keyframe) => "translate" in keyframe
    )) != null ? _a5 : [];
    runningAnimation == null ? void 0 : runningAnimation.pause();
    const target = (_b22 = ctx.placeholder) != null ? _b22 : ctx.element;
    const options = {
      frameTransform: isSameFrame(ctx.feedbackElement, target) ? null : void 0
    };
    const current = new DOMRectangle(ctx.feedbackElement, options);
    const currentTranslate = (_c32 = parseTranslate(getComputedStyles(ctx.feedbackElement).translate)) != null ? _c32 : ctx.translate;
    const final = new DOMRectangle(target, options);
    const delta = Rectangle.delta(current, final, ctx.alignment);
    const finalTranslate = {
      x: currentTranslate.x - delta.x,
      y: currentTranslate.y - delta.y
    };
    const heightKeyframes = Math.round(current.intrinsicHeight) !== Math.round(final.intrinsicHeight) ? {
      minHeight: [
        `${current.intrinsicHeight}px`,
        `${final.intrinsicHeight}px`
      ],
      maxHeight: [
        `${current.intrinsicHeight}px`,
        `${final.intrinsicHeight}px`
      ]
    } : {};
    const widthKeyframes = Math.round(current.intrinsicWidth) !== Math.round(final.intrinsicWidth) ? {
      minWidth: [
        `${current.intrinsicWidth}px`,
        `${final.intrinsicWidth}px`
      ],
      maxWidth: [
        `${current.intrinsicWidth}px`,
        `${final.intrinsicWidth}px`
      ]
    } : {};
    ctx.styles.set({ transition: ctx.transition }, CSS_PREFIX);
    ctx.feedbackElement.setAttribute(DROPPING_ATTRIBUTE, "");
    (_d22 = ctx.getElementMutationObserver()) == null ? void 0 : _d22.takeRecords();
    animateTransform({
      element: ctx.feedbackElement,
      keyframes: __spreadProps3(__spreadValues4(__spreadValues4({}, heightKeyframes), widthKeyframes), {
        translate: [
          `${currentTranslate.x}px ${currentTranslate.y}px 0`,
          `${finalTranslate.x}px ${finalTranslate.y}px 0`
        ]
      }),
      options: {
        duration: prefersReducedMotion(getWindow(ctx.feedbackElement)) ? 0 : ctx.moved || ctx.feedbackElement !== ctx.element ? duration : 0,
        easing
      }
    }).then(() => {
      ctx.feedbackElement.removeAttribute(DROPPING_ATTRIBUTE);
      runningAnimation == null ? void 0 : runningAnimation.finish();
      ctx.cleanup();
      requestAnimationFrame(ctx.restoreFocus);
    });
  }
  function getDirection(a2, b2) {
    return Math.sign(a2 - b2);
  }
  function getScrollIntent(value) {
    if (value > 0) {
      return ScrollDirection.Forward;
    }
    if (value < 0) {
      return ScrollDirection.Reverse;
    }
    return ScrollDirection.Idle;
  }
  function removeSelection() {
    var _a5;
    (_a5 = document.getSelection()) == null ? void 0 : _a5.removeAllRanges();
  }
  function isKeyboardKey(event, codes) {
    const eventKey = normalizeKey(event.key);
    return codes.some((code) => normalizeKey(code) === eventKey);
  }
  function normalizeKey(key) {
    if (key === " " || key === "Spacebar") {
      return "space";
    }
    if (/^Key[A-Z]$/.test(key)) {
      return key.slice(3).toLowerCase();
    }
    if (/^Digit[0-9]$/.test(key)) {
      return key.slice(5);
    }
    if (key.length === 1) {
      return key.toLowerCase();
    }
    const lowerCaseKey = key.toLowerCase();
    return namedKeys.has(lowerCaseKey) ? lowerCaseKey : key;
  }
  function isCapturedBySensor(event) {
    return "sensor" in event;
  }
  function preventDefault(event) {
    event.preventDefault();
  }
  function noop() {
  }
  function patchWindow(window2) {
    if (!window2 || windows.has(window2)) {
      return;
    }
    window2.addEventListener("touchmove", noop, {
      capture: false,
      passive: false
    });
    windows.add(window2);
  }
  var __create4, __defProp4, __defProps3, __getOwnPropDesc4, __getOwnPropDescs3, __getOwnPropSymbols4, __hasOwnProp4, __propIsEnum4, __knownSymbol4, __typeError5, __defNormalProp4, __spreadValues4, __spreadProps3, __name4, __objRest2, __decoratorStart4, __decoratorStrings4, __expectFn4, __decoratorContext4, __decoratorMetadata4, __runInitializers4, __decorateElement4, __accessCheck5, __privateIn4, __privateGet5, __privateAdd5, __privateSet5, __privateMethod5, defaultAttributes, defaultDescriptionIdPrefix, defaultAnnouncementIdPrefix, defaultScreenReaderInstructions, defaultAnnouncements, debouncedEvents, Accessibility, styleRegistry, _roots_dec, _targetRoot_dec, _sourceRoot_dec, _additionalRoots_dec, _registeredRules_dec, _a4, _init7, _registeredRules, _additionalRoots, _retainedRoots, _injections, _StyleInjector_instances, syncStyles_fn, inject_fn, injectStyleElement_fn, injectAdoptedSheet_fn, _StyleInjector, StyleInjector, Cursor, ATTR_PREFIX, DROPPING_ATTRIBUTE, CSS_PREFIX, ATTRIBUTE, PLACEHOLDER_ATTRIBUTE, IGNORED_ATTRIBUTES, IGNORED_STYLES, CSS_RULES, DEFAULT_DURATION, DEFAULT_EASING, _overlay_dec, _a22, _init23, _overlay, _Feedback_instances, trackOverlayRoot_fn, render_fn, _Feedback, Feedback, LOCKED, UNLOCKED, _dec, _a32, _dec2, _b2, _init33, __b, __a, ScrollLock, DIRECTIONS, ScrollIntent, ScrollIntentTracker, _autoScrolling_dec, _a42, _init42, _autoScrolling, _meta, _scroll, Scroller, Scheduler2, scheduler32, AUTOSCROLL_INTERVAL, _AutoScroller, AutoScroller, listenerOptions, _timeout, ScrollListener, CSS_RULES2, PreventSelection, namedKeys, defaults, _cleanupFunctions2, _KeyboardSensor, KeyboardSensor, _coordinates, DistanceConstraint, _timeout2, _coordinates2, DelayConstraint, PointerActivationConstraints, defaults2, _cleanup, _PointerSensor, PointerSensor, windows, defaultPreset, DragDropManager2, _element_dec, _handle_dec, _c4, _init52, _handle, _element, Draggable2, _proxy_dec, _element_dec2, _c23, _init62, _element2, _d2, element_get, element_set, _Droppable_instances, _proxy, Droppable2;
  var init_dom = __esm({
    "node_modules/@dnd-kit/dom/index.js"() {
      init_abstract();
      init_utilities();
      init_dist();
      init_dist2();
      init_dist3();
      __create4 = Object.create;
      __defProp4 = Object.defineProperty;
      __defProps3 = Object.defineProperties;
      __getOwnPropDesc4 = Object.getOwnPropertyDescriptor;
      __getOwnPropDescs3 = Object.getOwnPropertyDescriptors;
      __getOwnPropSymbols4 = Object.getOwnPropertySymbols;
      __hasOwnProp4 = Object.prototype.hasOwnProperty;
      __propIsEnum4 = Object.prototype.propertyIsEnumerable;
      __knownSymbol4 = (name, symbol) => (symbol = Symbol[name]) ? symbol : /* @__PURE__ */ Symbol.for("Symbol." + name);
      __typeError5 = (msg) => {
        throw TypeError(msg);
      };
      __defNormalProp4 = (obj, key, value) => key in obj ? __defProp4(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
      __spreadValues4 = (a2, b2) => {
        for (var prop in b2 || (b2 = {}))
          if (__hasOwnProp4.call(b2, prop))
            __defNormalProp4(a2, prop, b2[prop]);
        if (__getOwnPropSymbols4)
          for (var prop of __getOwnPropSymbols4(b2)) {
            if (__propIsEnum4.call(b2, prop))
              __defNormalProp4(a2, prop, b2[prop]);
          }
        return a2;
      };
      __spreadProps3 = (a2, b2) => __defProps3(a2, __getOwnPropDescs3(b2));
      __name4 = (target, value) => __defProp4(target, "name", { value, configurable: true });
      __objRest2 = (source, exclude) => {
        var target = {};
        for (var prop in source)
          if (__hasOwnProp4.call(source, prop) && exclude.indexOf(prop) < 0)
            target[prop] = source[prop];
        if (source != null && __getOwnPropSymbols4)
          for (var prop of __getOwnPropSymbols4(source)) {
            if (exclude.indexOf(prop) < 0 && __propIsEnum4.call(source, prop))
              target[prop] = source[prop];
          }
        return target;
      };
      __decoratorStart4 = (base) => {
        var _a5;
        return [, , , __create4((_a5 = base == null ? void 0 : base[__knownSymbol4("metadata")]) != null ? _a5 : null)];
      };
      __decoratorStrings4 = ["class", "method", "getter", "setter", "accessor", "field", "value", "get", "set"];
      __expectFn4 = (fn2) => fn2 !== void 0 && typeof fn2 !== "function" ? __typeError5("Function expected") : fn2;
      __decoratorContext4 = (kind, name, done, metadata, fns) => ({ kind: __decoratorStrings4[kind], name, metadata, addInitializer: (fn2) => done._ ? __typeError5("Already initialized") : fns.push(__expectFn4(fn2 || null)) });
      __decoratorMetadata4 = (array, target) => __defNormalProp4(target, __knownSymbol4("metadata"), array[3]);
      __runInitializers4 = (array, flags, self, value) => {
        for (var i2 = 0, fns = array[flags >> 1], n2 = fns && fns.length; i2 < n2; i2++) flags & 1 ? fns[i2].call(self) : value = fns[i2].call(self, value);
        return value;
      };
      __decorateElement4 = (array, flags, name, decorators, target, extra) => {
        var fn2, it, done, ctx, access, k = flags & 7, s2 = !!(flags & 8), p2 = !!(flags & 16);
        var j3 = k > 3 ? array.length + 1 : k ? s2 ? 1 : 2 : 0, key = __decoratorStrings4[k + 5];
        var initializers = k > 3 && (array[j3 - 1] = []), extraInitializers = array[j3] || (array[j3] = []);
        var desc = k && (!p2 && !s2 && (target = target.prototype), k < 5 && (k > 3 || !p2) && __getOwnPropDesc4(k < 4 ? target : { get [name]() {
          return __privateGet5(this, extra);
        }, set [name](x2) {
          return __privateSet5(this, extra, x2);
        } }, name));
        k ? p2 && k < 4 && __name4(extra, (k > 2 ? "set " : k > 1 ? "get " : "") + name) : __name4(target, name);
        for (var i2 = decorators.length - 1; i2 >= 0; i2--) {
          ctx = __decoratorContext4(k, name, done = {}, array[3], extraInitializers);
          if (k) {
            ctx.static = s2, ctx.private = p2, access = ctx.access = { has: p2 ? (x2) => __privateIn4(target, x2) : (x2) => name in x2 };
            if (k ^ 3) access.get = p2 ? (x2) => (k ^ 1 ? __privateGet5 : __privateMethod5)(x2, target, k ^ 4 ? extra : desc.get) : (x2) => x2[name];
            if (k > 2) access.set = p2 ? (x2, y2) => __privateSet5(x2, target, y2, k ^ 4 ? extra : desc.set) : (x2, y2) => x2[name] = y2;
          }
          it = (0, decorators[i2])(k ? k < 4 ? p2 ? extra : desc[key] : k > 4 ? void 0 : { get: desc.get, set: desc.set } : target, ctx), done._ = 1;
          if (k ^ 4 || it === void 0) __expectFn4(it) && (k > 4 ? initializers.unshift(it) : k ? p2 ? extra = it : desc[key] = it : target = it);
          else if (typeof it !== "object" || it === null) __typeError5("Object expected");
          else __expectFn4(fn2 = it.get) && (desc.get = fn2), __expectFn4(fn2 = it.set) && (desc.set = fn2), __expectFn4(fn2 = it.init) && initializers.unshift(fn2);
        }
        return k || __decoratorMetadata4(array, target), desc && __defProp4(target, name, desc), p2 ? k ^ 4 ? extra : desc : target;
      };
      __accessCheck5 = (obj, member, msg) => member.has(obj) || __typeError5("Cannot " + msg);
      __privateIn4 = (member, obj) => Object(obj) !== obj ? __typeError5('Cannot use the "in" operator on this value') : member.has(obj);
      __privateGet5 = (obj, member, getter) => (__accessCheck5(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
      __privateAdd5 = (obj, member, value) => member.has(obj) ? __typeError5("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
      __privateSet5 = (obj, member, value, setter) => (__accessCheck5(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
      __privateMethod5 = (obj, member, method) => (__accessCheck5(obj, member, "access private method"), method);
      defaultAttributes = {
        role: "button",
        roleDescription: "draggable"
      };
      defaultDescriptionIdPrefix = `dnd-kit-description`;
      defaultAnnouncementIdPrefix = `dnd-kit-announcement`;
      defaultScreenReaderInstructions = {
        draggable: `To pick up a draggable item, press the space bar. While dragging, use the arrow keys to move the item in a given direction. Press space again to drop the item in its new position, or press escape to cancel.`
      };
      defaultAnnouncements = {
        dragstart({ operation: { source } }) {
          if (!source) return;
          return `Picked up draggable item ${source.id}.`;
        },
        dragover({ operation: { source, target } }) {
          if (!source || source.id === (target == null ? void 0 : target.id)) return;
          if (target) {
            return `Draggable item ${source.id} was moved over droppable target ${target.id}.`;
          }
          return `Draggable item ${source.id} is no longer over a droppable target.`;
        },
        dragend({ operation: { source, target }, canceled }) {
          if (!source) return;
          if (canceled) {
            return `Dragging was cancelled. Draggable item ${source.id} was dropped.`;
          }
          if (target) {
            return `Draggable item ${source.id} was dropped over droppable target ${target.id}`;
          }
          return `Draggable item ${source.id} was dropped.`;
        }
      };
      debouncedEvents = ["dragover", "dragmove"];
      Accessibility = class extends Plugin {
        constructor(manager, options) {
          super(manager);
          const {
            id: id2,
            idPrefix: {
              description: descriptionPrefix = defaultDescriptionIdPrefix,
              announcement: announcementPrefix = defaultAnnouncementIdPrefix
            } = {},
            announcements = defaultAnnouncements,
            screenReaderInstructions = defaultScreenReaderInstructions,
            debounce: debounceMs = 500
          } = options != null ? options : {};
          const descriptionId = id2 ? `${descriptionPrefix}-${id2}` : generateUniqueId(descriptionPrefix);
          const announcementId = id2 ? `${announcementPrefix}-${id2}` : generateUniqueId(announcementPrefix);
          let hiddenTextElement;
          let liveRegionElement;
          let liveRegionTextNode;
          let latestAnnouncement;
          const updateAnnouncement = (value = latestAnnouncement) => {
            if (!liveRegionTextNode || !value) return;
            if ((liveRegionTextNode == null ? void 0 : liveRegionTextNode.nodeValue) !== value) {
              liveRegionTextNode.nodeValue = value;
            }
          };
          const scheduleUpdateAnnouncement = () => scheduler.schedule(updateAnnouncement);
          const debouncedUpdateAnnouncement = debounce(
            scheduleUpdateAnnouncement,
            debounceMs
          );
          const eventListeners = Object.entries(announcements).map(
            ([eventName, getAnnouncement]) => {
              return this.manager.monitor.addEventListener(
                eventName,
                (event, manager2) => {
                  const element = liveRegionTextNode;
                  if (!element) return;
                  const announcement = getAnnouncement == null ? void 0 : getAnnouncement(event, manager2);
                  if (announcement && element.nodeValue !== announcement) {
                    latestAnnouncement = announcement;
                    if (debouncedEvents.includes(eventName)) {
                      debouncedUpdateAnnouncement();
                    } else {
                      scheduleUpdateAnnouncement();
                      debouncedUpdateAnnouncement.cancel();
                    }
                  }
                }
              );
            }
          );
          const initialize = () => {
            let elements = [];
            if (!(hiddenTextElement == null ? void 0 : hiddenTextElement.isConnected)) {
              hiddenTextElement = createHiddenText(
                descriptionId,
                screenReaderInstructions.draggable
              );
              elements.push(hiddenTextElement);
            }
            if (!(liveRegionElement == null ? void 0 : liveRegionElement.isConnected)) {
              liveRegionElement = createLiveRegion(announcementId);
              liveRegionTextNode = document.createTextNode("");
              liveRegionElement.appendChild(liveRegionTextNode);
              elements.push(liveRegionElement);
            }
            if (elements.length > 0) {
              document.body.append(...elements);
            }
          };
          const mutations = /* @__PURE__ */ new Set();
          function executeMutations() {
            for (const operation of mutations) {
              operation();
            }
          }
          this.registerEffect(() => {
            var _a5;
            mutations.clear();
            for (const draggable of this.manager.registry.draggables.value) {
              const activator = (_a5 = draggable.handle) != null ? _a5 : draggable.element;
              if (activator) {
                if (!hiddenTextElement || !liveRegionElement) {
                  mutations.add(initialize);
                }
                if ((!isFocusable(activator) || isSafari()) && !activator.hasAttribute("tabindex")) {
                  mutations.add(() => activator.setAttribute("tabindex", "0"));
                }
                if (!activator.hasAttribute("role") && !(activator.tagName.toLowerCase() === "button")) {
                  mutations.add(
                    () => activator.setAttribute("role", defaultAttributes.role)
                  );
                }
                if (!activator.hasAttribute("aria-roledescription")) {
                  mutations.add(
                    () => activator.setAttribute(
                      "aria-roledescription",
                      defaultAttributes.roleDescription
                    )
                  );
                }
                if (!activator.hasAttribute("aria-describedby")) {
                  mutations.add(
                    () => activator.setAttribute("aria-describedby", descriptionId)
                  );
                }
                const stateAttributes = supportsPressedState(activator) ? ["aria-pressed", "aria-grabbed"] : ["aria-grabbed"];
                for (const key of stateAttributes) {
                  const value = String(draggable.isDragging);
                  if (activator.getAttribute(key) !== value) {
                    mutations.add(() => activator.setAttribute(key, value));
                  }
                }
                const disabled = String(draggable.disabled);
                if (activator.getAttribute("aria-disabled") !== disabled) {
                  mutations.add(
                    () => activator.setAttribute("aria-disabled", disabled)
                  );
                }
              }
            }
            if (mutations.size > 0) {
              scheduler.schedule(executeMutations);
            }
          });
          this.destroy = () => {
            super.destroy();
            hiddenTextElement == null ? void 0 : hiddenTextElement.remove();
            liveRegionElement == null ? void 0 : liveRegionElement.remove();
            eventListeners.forEach((unsubscribe) => unsubscribe());
          };
        }
      };
      styleRegistry = /* @__PURE__ */ new Map();
      _StyleInjector = class _StyleInjector2 extends (_a4 = CorePlugin, _registeredRules_dec = [reactive], _additionalRoots_dec = [reactive], _sourceRoot_dec = [derived], _targetRoot_dec = [derived], _roots_dec = [derived], _a4) {
        constructor(manager, options) {
          super(manager, options);
          __runInitializers4(_init7, 5, this);
          __privateAdd5(this, _StyleInjector_instances);
          __privateAdd5(this, _registeredRules, __runInitializers4(_init7, 8, this, /* @__PURE__ */ new Map())), __runInitializers4(_init7, 11, this);
          __privateAdd5(this, _additionalRoots, __runInitializers4(_init7, 12, this, /* @__PURE__ */ new Set())), __runInitializers4(_init7, 15, this);
          __privateAdd5(this, _retainedRoots, /* @__PURE__ */ new Set());
          __privateAdd5(this, _injections, /* @__PURE__ */ new Map());
          this.registerEffect(__privateMethod5(this, _StyleInjector_instances, syncStyles_fn));
        }
        /**
         * Registers CSS rules to be injected into the active drag operation's
         * document and shadow roots. The StyleInjector handles tracking
         * which roots need the styles and cleaning up when they're no longer needed.
         *
         * Returns a cleanup function that unregisters the rules.
         */
        register(cssRules, options) {
          f(() => {
            var _a5;
            const rules = new Map(this.registeredRules);
            rules.set(cssRules, (_a5 = options == null ? void 0 : options.retain) != null ? _a5 : false);
            this.registeredRules = rules;
          });
          return () => {
            f(() => {
              const rules = new Map(this.registeredRules);
              rules.delete(cssRules);
              this.registeredRules = rules;
            });
          };
        }
        /**
         * Adds an additional root to track for style injection.
         * Returns a cleanup function that removes the root.
         */
        addRoot(root) {
          f(() => {
            const roots = new Set(this.additionalRoots);
            roots.add(root);
            this.additionalRoots = roots;
          });
          return () => {
            f(() => {
              const roots = new Set(this.additionalRoots);
              roots.delete(root);
              this.additionalRoots = roots;
            });
          };
        }
        get sourceRoot() {
          var _a5;
          const { source } = this.manager.dragOperation;
          return getRoot((_a5 = source == null ? void 0 : source.element) != null ? _a5 : null);
        }
        get targetRoot() {
          var _a5;
          const { target } = this.manager.dragOperation;
          return getRoot((_a5 = target == null ? void 0 : target.element) != null ? _a5 : null);
        }
        get roots() {
          const { status } = this.manager.dragOperation;
          if (status.initializing || status.initialized) {
            const roots = [this.sourceRoot, this.targetRoot].filter(
              (root) => root != null
            );
            return /* @__PURE__ */ new Set([...roots, ...this.additionalRoots]);
          }
          return /* @__PURE__ */ new Set();
        }
        destroy() {
          for (const injected of __privateGet5(this, _injections).values()) {
            for (const cleanup of injected.values()) {
              cleanup();
            }
          }
          __privateGet5(this, _injections).clear();
          __privateGet5(this, _retainedRoots).clear();
          super.destroy();
        }
      };
      _init7 = __decoratorStart4(_a4);
      _registeredRules = /* @__PURE__ */ new WeakMap();
      _additionalRoots = /* @__PURE__ */ new WeakMap();
      _retainedRoots = /* @__PURE__ */ new WeakMap();
      _injections = /* @__PURE__ */ new WeakMap();
      _StyleInjector_instances = /* @__PURE__ */ new WeakSet();
      syncStyles_fn = function() {
        const { roots, registeredRules } = this;
        for (const root of roots) {
          __privateGet5(this, _retainedRoots).add(root);
        }
        const wanted = /* @__PURE__ */ new Map();
        for (const root of __privateGet5(this, _retainedRoots)) {
          const active = roots.has(root);
          if (!active && !isAttached(root)) {
            __privateGet5(this, _retainedRoots).delete(root);
            continue;
          }
          for (const [cssRules, retain] of registeredRules) {
            if (!active && !retain) continue;
            let rules = wanted.get(root);
            if (!rules) {
              rules = /* @__PURE__ */ new Set();
              wanted.set(root, rules);
            }
            rules.add(cssRules);
          }
        }
        for (const [root, injected] of __privateGet5(this, _injections)) {
          const rules = wanted.get(root);
          for (const [cssRules, cleanup] of injected) {
            if (rules == null ? void 0 : rules.has(cssRules)) continue;
            cleanup();
            injected.delete(cssRules);
          }
          if (injected.size === 0) {
            __privateGet5(this, _injections).delete(root);
          }
        }
        for (const [root, rules] of wanted) {
          let injected = __privateGet5(this, _injections).get(root);
          if (!injected) {
            injected = /* @__PURE__ */ new Map();
            __privateGet5(this, _injections).set(root, injected);
          }
          for (const cssRules of rules) {
            if (!injected.has(cssRules)) {
              injected.set(cssRules, __privateMethod5(this, _StyleInjector_instances, inject_fn).call(this, root, cssRules));
            }
          }
        }
      };
      inject_fn = function(root, cssRules) {
        let rootStyles = styleRegistry.get(root);
        if (!rootStyles) {
          rootStyles = /* @__PURE__ */ new Map();
          styleRegistry.set(root, rootStyles);
        }
        let registration = rootStyles.get(cssRules);
        if (!registration) {
          const created = isDocument(root) ? __privateMethod5(this, _StyleInjector_instances, injectStyleElement_fn).call(this, root, rootStyles, cssRules) : __privateMethod5(this, _StyleInjector_instances, injectAdoptedSheet_fn).call(this, root, rootStyles, cssRules);
          if (!created) {
            return () => {
            };
          }
          registration = created;
          rootStyles.set(cssRules, registration);
        }
        registration.refCount++;
        let disposed = false;
        return () => {
          if (disposed) return;
          disposed = true;
          registration.refCount--;
          if (registration.refCount === 0) {
            registration.cleanup();
          }
        };
      };
      injectStyleElement_fn = function(root, rootStyles, cssRules) {
        var _a5;
        const style = root.createElement("style");
        const { nonce } = (_a5 = this.options) != null ? _a5 : {};
        if (nonce) {
          style.setAttribute("nonce", nonce);
        }
        style.textContent = cssRules;
        root.head.prepend(style);
        const observer = new MutationObserver((entries) => {
          for (const entry of entries) {
            for (const node of Array.from(entry.removedNodes)) {
              if (node === style) {
                root.head.prepend(style);
                return;
              }
            }
          }
        });
        observer.observe(root.head, { childList: true });
        return {
          refCount: 0,
          cleanup: () => {
            observer.disconnect();
            style.remove();
            rootStyles.delete(cssRules);
            if (rootStyles.size === 0) {
              styleRegistry.delete(root);
            }
          }
        };
      };
      injectAdoptedSheet_fn = function(root, rootStyles, cssRules) {
        if (!("adoptedStyleSheets" in root && Array.isArray(root.adoptedStyleSheets)) && true) {
          console.error(
            "Cannot inject styles: This browser doesn't support adoptedStyleSheets"
          );
        }
        const targetWindow = root.ownerDocument.defaultView;
        const { CSSStyleSheet: CSSStyleSheet2 } = targetWindow != null ? targetWindow : {};
        if (!CSSStyleSheet2) {
          if (true) {
            console.error(
              "Cannot inject styles: CSSStyleSheet constructor not available"
            );
          }
          return null;
        }
        const sheet = new CSSStyleSheet2();
        sheet.replaceSync(cssRules);
        root.adoptedStyleSheets.push(sheet);
        return {
          refCount: 0,
          cleanup: () => {
            var _a5;
            if (isShadowRoot(root) && ((_a5 = root.host) == null ? void 0 : _a5.isConnected)) {
              const index = root.adoptedStyleSheets.indexOf(sheet);
              if (index !== -1) {
                root.adoptedStyleSheets.splice(index, 1);
              }
            }
            rootStyles.delete(cssRules);
            if (rootStyles.size === 0) {
              styleRegistry.delete(root);
            }
          }
        };
      };
      __decorateElement4(_init7, 4, "registeredRules", _registeredRules_dec, _StyleInjector, _registeredRules);
      __decorateElement4(_init7, 4, "additionalRoots", _additionalRoots_dec, _StyleInjector, _additionalRoots);
      __decorateElement4(_init7, 2, "sourceRoot", _sourceRoot_dec, _StyleInjector);
      __decorateElement4(_init7, 2, "targetRoot", _targetRoot_dec, _StyleInjector);
      __decorateElement4(_init7, 2, "roots", _roots_dec, _StyleInjector);
      __decoratorMetadata4(_init7, _StyleInjector);
      _StyleInjector.configure = configurator(_StyleInjector);
      StyleInjector = _StyleInjector;
      Cursor = class extends Plugin {
        constructor(manager, options) {
          super(manager, options);
          this.manager = manager;
          const { cursor = "grabbing" } = options != null ? options : {};
          const styleInjector = manager.registry.plugins.get(
            StyleInjector
          );
          const unregisterStyles = styleInjector == null ? void 0 : styleInjector.register(
            `* { cursor: ${cursor} !important; }`
          );
          if (unregisterStyles) {
            const originalDestroy = this.destroy.bind(this);
            this.destroy = () => {
              unregisterStyles();
              originalDestroy();
            };
          }
        }
      };
      ATTR_PREFIX = "data-dnd-";
      DROPPING_ATTRIBUTE = `${ATTR_PREFIX}dropping`;
      CSS_PREFIX = "--dnd-";
      ATTRIBUTE = `${ATTR_PREFIX}dragging`;
      PLACEHOLDER_ATTRIBUTE = `${ATTR_PREFIX}placeholder`;
      IGNORED_ATTRIBUTES = [
        ATTRIBUTE,
        PLACEHOLDER_ATTRIBUTE,
        "popover",
        "aria-pressed",
        "aria-grabbing"
      ];
      IGNORED_STYLES = ["view-transition-name"];
      CSS_RULES = `
  :is(:root,:host) [${ATTRIBUTE}] {
    position: fixed !important;
    pointer-events: none !important;
    touch-action: none;
    z-index: calc(infinity);
    will-change: translate;
    top: var(${CSS_PREFIX}top, 0px) !important;
    left: var(${CSS_PREFIX}left, 0px) !important;
    right: unset !important;
    bottom: unset !important;
    width: var(${CSS_PREFIX}width, auto);
    max-width: var(${CSS_PREFIX}width, auto);
    height: var(${CSS_PREFIX}height, auto);
    max-height: var(${CSS_PREFIX}height, auto);
    transform: var(${CSS_PREFIX}transform, none) !important;
    transition: var(${CSS_PREFIX}transition) !important;
  }

  :is(:root,:host) [${PLACEHOLDER_ATTRIBUTE}] {
    transition: none;
  }

  :is(:root,:host) [${PLACEHOLDER_ATTRIBUTE}='hidden'] {
    visibility: hidden;
  }

  [${ATTRIBUTE}] * {
    pointer-events: none !important;
  }

  [${ATTRIBUTE}]:not([${DROPPING_ATTRIBUTE}]) {
    translate: var(${CSS_PREFIX}translate) !important;
  }

  [${ATTRIBUTE}][style*='${CSS_PREFIX}scale'] {
    scale: var(${CSS_PREFIX}scale) !important;
    transform-origin: var(${CSS_PREFIX}transform-origin) !important;
  }

  @layer dnd-kit {
    :where([${ATTRIBUTE}][popover]) {
      overflow: visible;
      background: unset;
      border: unset;
      margin: unset;
      padding: unset;
      color: inherit;

      &:is(input, button) {
        border: revert;
        background: revert;
      }
    }
  }
  [${ATTRIBUTE}]::backdrop, [${ATTR_PREFIX}overlay]:not([${ATTRIBUTE}]) {
    display: none;
    visibility: hidden;
  }
`.replace(/\n+/g, " ").replace(/\s+/g, " ").trim();
      DEFAULT_DURATION = 250;
      DEFAULT_EASING = "ease";
      _Feedback = class _Feedback2 extends (_a22 = Plugin, _overlay_dec = [reactive], _a22) {
        constructor(manager, options) {
          super(manager, options);
          __privateAdd5(this, _Feedback_instances);
          __privateAdd5(this, _overlay, __runInitializers4(_init23, 8, this)), __runInitializers4(_init23, 11, this);
          this.state = {
            initial: {},
            current: {}
          };
          const styleInjector = manager.registry.plugins.get(StyleInjector);
          const unregisterStyles = styleInjector == null ? void 0 : styleInjector.register(CSS_RULES, { retain: true });
          if (unregisterStyles) {
            const originalDestroy = this.destroy.bind(this);
            this.destroy = () => {
              unregisterStyles();
              originalDestroy();
            };
          }
          this.registerEffect(__privateMethod5(this, _Feedback_instances, trackOverlayRoot_fn).bind(this, styleInjector));
          this.registerEffect(__privateMethod5(this, _Feedback_instances, render_fn));
        }
      };
      _init23 = __decoratorStart4(_a22);
      _overlay = /* @__PURE__ */ new WeakMap();
      _Feedback_instances = /* @__PURE__ */ new WeakSet();
      trackOverlayRoot_fn = function(styleInjector) {
        const { overlay } = this;
        if (!overlay || !styleInjector) return;
        const root = getRoot(overlay);
        if (!root) return;
        return styleInjector.addRoot(root);
      };
      render_fn = function() {
        var _a5, _b22, _c32, _d22, _e2, _f2, _g;
        const { state, manager, options } = this;
        const { dragOperation } = manager;
        const { position, source, status } = dragOperation;
        if (status.idle) {
          state.current = {};
          state.initial = {};
          return;
        }
        if (!source) return;
        const { element } = source;
        const entityOptions = source.pluginConfig(_Feedback);
        const feedbackOption = (_b22 = (_a5 = entityOptions == null ? void 0 : entityOptions.feedback) != null ? _a5 : options == null ? void 0 : options.feedback) != null ? _b22 : "default";
        const feedback = typeof feedbackOption === "function" ? feedbackOption(source, manager) : feedbackOption;
        if (!element || feedback === "none" || !status.initialized || status.initializing) {
          return;
        }
        const { initial } = state;
        const feedbackElement = (_c32 = this.overlay) != null ? _c32 : element;
        const frameTransform = getFrameTransform(feedbackElement);
        const elementFrameTransform = getFrameTransform(element);
        const crossFrame = !isSameFrame(element, feedbackElement);
        const shape = new DOMRectangle(element, {
          frameTransform: crossFrame ? elementFrameTransform : null,
          ignoreTransforms: !crossFrame
        });
        const scaleDelta = {
          x: elementFrameTransform.scaleX / frameTransform.scaleX,
          y: elementFrameTransform.scaleY / frameTransform.scaleY
        };
        let { width, height, top, left } = shape;
        if (crossFrame) {
          width = width / scaleDelta.x;
          height = height / scaleDelta.y;
        }
        const styles = new Styles(feedbackElement);
        const elementStyles = getComputedStyles(element);
        const {
          transition,
          translate,
          boxSizing,
          paddingBlockStart,
          paddingBlockEnd,
          paddingInlineStart,
          paddingInlineEnd,
          borderInlineStartWidth,
          borderInlineEndWidth,
          borderBlockStartWidth,
          borderBlockEndWidth
        } = elementStyles;
        const feedbackTransition = transition.split(",").filter((t2) => !/^\s*(transform|translate|scale)\b/.test(t2)).join(",");
        const parsedTransform = parseTransform(elementStyles);
        const initialTransformStyle = elementStyles.transform;
        const clone = feedback === "clone";
        const contentBox = boxSizing === "content-box";
        const widthOffset = contentBox ? parseInt(paddingInlineStart) + parseInt(paddingInlineEnd) + parseInt(borderInlineStartWidth) + parseInt(borderInlineEndWidth) : 0;
        const heightOffset = contentBox ? parseInt(paddingBlockStart) + parseInt(paddingBlockEnd) + parseInt(borderBlockStartWidth) + parseInt(borderBlockEndWidth) : 0;
        const placeholder = feedback !== "move" && !this.overlay ? createPlaceholder(source, clone ? "clone" : "hidden") : null;
        const isKeyboardOperation = f(
          () => isKeyboardEvent(manager.dragOperation.activatorEvent)
        );
        if (!initial.translate) {
          if (this.overlay && parsedTransform) {
            initial.translate = { x: parsedTransform.x, y: parsedTransform.y };
          } else if (translate !== "none") {
            const parsedTranslate = parseTranslate(translate);
            if (parsedTranslate) {
              initial.translate = parsedTranslate;
            }
          }
        }
        if (!initial.transformOrigin) {
          const current = f(() => position.current);
          const visualLeft = left + ((_d22 = parsedTransform == null ? void 0 : parsedTransform.x) != null ? _d22 : 0);
          const visualTop = top + ((_e2 = parsedTransform == null ? void 0 : parsedTransform.y) != null ? _e2 : 0);
          initial.transformOrigin = {
            x: (current.x - visualLeft * frameTransform.scaleX - frameTransform.x) / (width * frameTransform.scaleX),
            y: (current.y - visualTop * frameTransform.scaleY - frameTransform.y) / (height * frameTransform.scaleY)
          };
        }
        const { transformOrigin } = initial;
        const relativeTop = top * frameTransform.scaleY + frameTransform.y;
        const relativeLeft = left * frameTransform.scaleX + frameTransform.x;
        if (!initial.coordinates) {
          initial.coordinates = {
            x: relativeLeft,
            y: relativeTop
          };
          if (scaleDelta.x !== 1 || scaleDelta.y !== 1) {
            const { scaleX, scaleY } = elementFrameTransform;
            const { x: tX2, y: tY2 } = transformOrigin;
            initial.coordinates.x += (width * scaleX - width) * tX2;
            initial.coordinates.y += (height * scaleY - height) * tY2;
          }
        }
        if (!initial.dimensions) {
          initial.dimensions = { width, height };
        }
        if (!initial.frameTransform) {
          initial.frameTransform = frameTransform;
        }
        const coordinatesDelta = {
          x: initial.coordinates.x - relativeLeft,
          y: initial.coordinates.y - relativeTop
        };
        const sizeDelta = {
          width: (initial.dimensions.width * initial.frameTransform.scaleX - width * frameTransform.scaleX) * transformOrigin.x,
          height: (initial.dimensions.height * initial.frameTransform.scaleY - height * frameTransform.scaleY) * transformOrigin.y
        };
        const delta = {
          x: coordinatesDelta.x / frameTransform.scaleX + sizeDelta.width,
          y: coordinatesDelta.y / frameTransform.scaleY + sizeDelta.height
        };
        const projected = {
          left: left + delta.x,
          top: top + delta.y
        };
        feedbackElement.setAttribute(ATTRIBUTE, "true");
        const transform = f(() => dragOperation.transform);
        const initialTranslate = (_f2 = initial.translate) != null ? _f2 : { x: 0, y: 0 };
        const tX = transform.x * frameTransform.scaleX + initialTranslate.x;
        const tY = transform.y * frameTransform.scaleY + initialTranslate.y;
        const fixedOffset = getFixedPositionOffset();
        styles.set(
          {
            width: width - widthOffset,
            height: height - heightOffset,
            top: projected.top + fixedOffset.y,
            left: projected.left + fixedOffset.x,
            translate: `${tX}px ${tY}px 0`,
            transform: this.overlay ? "none" : initialTransformStyle,
            transition: feedbackTransition ? `${feedbackTransition}, translate 0ms linear` : "translate 0ms linear",
            scale: crossFrame ? `${scaleDelta.x} ${scaleDelta.y}` : "",
            "transform-origin": `${transformOrigin.x * 100}% ${transformOrigin.y * 100}%`
          },
          CSS_PREFIX
        );
        if (placeholder) {
          element.insertAdjacentElement("afterend", placeholder);
          if (options == null ? void 0 : options.rootElement) {
            const root = typeof options.rootElement === "function" ? options.rootElement(source) : options.rootElement;
            root.appendChild(element);
          }
        }
        if (supportsPopover(feedbackElement)) {
          if (!feedbackElement.hasAttribute("popover")) {
            feedbackElement.setAttribute("popover", "manual");
          }
          showPopover(feedbackElement);
          feedbackElement.addEventListener("beforetoggle", preventPopoverClose);
        }
        let elementMutationObserver;
        let documentMutationObserver;
        let savedCellWidths;
        const resizeObserver = createResizeObserver({
          placeholder,
          element,
          feedbackElement,
          frameTransform,
          transformOrigin,
          width,
          height,
          top,
          left,
          widthOffset,
          heightOffset,
          delta,
          styles,
          dragOperation,
          getTranslate: () => state.current.translate,
          getElementMutationObserver: () => elementMutationObserver,
          getSavedCellWidths: () => savedCellWidths,
          setSavedCellWidths: (widths) => {
            savedCellWidths = widths;
          }
        });
        const initialShape = new DOMRectangle(feedbackElement);
        f(() => dragOperation.shape = initialShape);
        const feedbackWindow = getWindow(feedbackElement);
        const handleWindowResize = (event) => {
          this.manager.actions.stop({ event });
        };
        const reducedMotion = prefersReducedMotion(feedbackWindow);
        if (isKeyboardOperation) {
          feedbackWindow.addEventListener("resize", handleWindowResize);
        }
        if (f(() => source.status) === "idle") {
          requestAnimationFrame(() => source.status = "dragging");
        }
        if (placeholder) {
          resizeObserver.observe(placeholder);
          elementMutationObserver = createElementMutationObserver(
            element,
            placeholder,
            clone
          );
          documentMutationObserver = createDocumentMutationObserver(
            element,
            placeholder,
            feedbackElement
          );
        }
        const id2 = (_g = manager.dragOperation.source) == null ? void 0 : _g.id;
        const restoreFocus = () => {
          var _a6;
          if (!isKeyboardOperation || id2 == null) return;
          const draggable = manager.registry.draggables.get(id2);
          const focusTarget = (_a6 = draggable == null ? void 0 : draggable.handle) != null ? _a6 : draggable == null ? void 0 : draggable.element;
          if (isHTMLElement(focusTarget)) {
            focusTarget.focus();
          }
        };
        const cleanup = () => {
          elementMutationObserver == null ? void 0 : elementMutationObserver.disconnect();
          documentMutationObserver == null ? void 0 : documentMutationObserver.disconnect();
          resizeObserver.disconnect();
          feedbackWindow.removeEventListener("resize", handleWindowResize);
          if (supportsPopover(feedbackElement)) {
            feedbackElement.removeEventListener(
              "beforetoggle",
              preventPopoverClose
            );
            feedbackElement.removeAttribute("popover");
          }
          feedbackElement.removeAttribute(ATTRIBUTE);
          styles.reset();
          const finalize = () => {
            var _a6;
            if (savedCellWidths && isTableRow(element)) {
              const cells = Array.from(element.cells);
              for (const [index, cell] of cells.entries()) {
                cell.style.width = (_a6 = savedCellWidths[index]) != null ? _a6 : "";
              }
            }
            source.status = "idle";
            const moved = state.current.translate != null;
            const isDragging = dragOperation.status.dragging;
            if (placeholder && (!isDragging && moved || placeholder.parentElement !== feedbackElement.parentElement) && feedbackElement.isConnected) {
              placeholder.replaceWith(feedbackElement);
            }
            placeholder == null ? void 0 : placeholder.remove();
          };
          if (feedbackElement === this.overlay) {
            setTimeout(finalize, 0);
          } else {
            finalize();
          }
        };
        const optionsDropAnimation = options == null ? void 0 : options.dropAnimation;
        const feedbackPlugin = this;
        const cleanupEffects = effects(
          // Update transform on move
          () => {
            var _a6, _b3, _c42;
            const { transform: transform2, status: status2 } = dragOperation;
            if (!transform2.x && !transform2.y && !state.current.translate) {
              return;
            }
            if (status2.dragging) {
              const initialTranslate2 = (_a6 = initial.translate) != null ? _a6 : { x: 0, y: 0 };
              const translate2 = {
                x: transform2.x / frameTransform.scaleX + initialTranslate2.x,
                y: transform2.y / frameTransform.scaleY + initialTranslate2.y
              };
              const previousTranslate = state.current.translate;
              const modifiers = f(() => dragOperation.modifiers);
              const currentShape = f(() => {
                var _a7;
                return (_a7 = dragOperation.shape) == null ? void 0 : _a7.current;
              });
              const keyboardTransition = options == null ? void 0 : options.keyboardTransition;
              const translateTransition = isKeyboardOperation && !reducedMotion && keyboardTransition !== null ? `${(_b3 = keyboardTransition == null ? void 0 : keyboardTransition.duration) != null ? _b3 : 250}ms ${(_c42 = keyboardTransition == null ? void 0 : keyboardTransition.easing) != null ? _c42 : "cubic-bezier(0.25, 1, 0.5, 1)"}` : "0ms linear";
              styles.set(
                {
                  transition: feedbackTransition ? `${feedbackTransition}, translate ${translateTransition}` : `translate ${translateTransition}`,
                  translate: `${translate2.x}px ${translate2.y}px 0`
                },
                CSS_PREFIX
              );
              elementMutationObserver == null ? void 0 : elementMutationObserver.takeRecords();
              if (currentShape && currentShape !== initialShape && previousTranslate && !modifiers.length) {
                const delta2 = Point.delta(translate2, previousTranslate);
                dragOperation.shape = Rectangle.from(
                  currentShape.boundingRectangle
                ).translate(
                  delta2.x * frameTransform.scaleX,
                  delta2.y * frameTransform.scaleY
                );
              } else {
                dragOperation.shape = new DOMRectangle(feedbackElement);
              }
              state.current.translate = translate2;
            }
          },
          // Drop animation
          function() {
            if (dragOperation.status.dropped) {
              this.dispose();
              source.status = "dropping";
              const dropAnimationConfig = (entityOptions == null ? void 0 : entityOptions.dropAnimation) !== void 0 ? entityOptions.dropAnimation : feedbackPlugin.dropAnimation !== void 0 ? feedbackPlugin.dropAnimation : optionsDropAnimation;
              let translate2 = state.current.translate;
              const moved = translate2 != null;
              if (!translate2 && element !== feedbackElement) {
                translate2 = { x: 0, y: 0 };
              }
              if (!translate2 || dropAnimationConfig === null) {
                cleanup();
                return;
              }
              manager.renderer.rendering.then(() => {
                runDropAnimation({
                  source,
                  element,
                  feedbackElement,
                  placeholder,
                  translate: translate2,
                  moved,
                  transition,
                  alignment: source.alignment,
                  styles,
                  animation: dropAnimationConfig != null ? dropAnimationConfig : void 0,
                  getElementMutationObserver: () => elementMutationObserver,
                  cleanup,
                  restoreFocus
                });
              });
            }
          }
        );
        return () => {
          cleanup();
          cleanupEffects();
        };
      };
      __decorateElement4(_init23, 4, "overlay", _overlay_dec, _Feedback, _overlay);
      __decoratorMetadata4(_init23, _Feedback);
      _Feedback.configure = configurator(_Feedback);
      Feedback = _Feedback;
      LOCKED = true;
      UNLOCKED = false;
      _b2 = (_dec2 = [reactive], ScrollDirection.Forward), _a32 = (_dec = [reactive], ScrollDirection.Reverse);
      ScrollLock = class {
        constructor() {
          __privateAdd5(this, __b, __runInitializers4(_init33, 8, this, LOCKED)), __runInitializers4(_init33, 11, this);
          __privateAdd5(this, __a, __runInitializers4(_init33, 12, this, LOCKED)), __runInitializers4(_init33, 15, this);
        }
        isLocked(direction) {
          if (direction === ScrollDirection.Idle) {
            return false;
          }
          if (direction == null) {
            return this[ScrollDirection.Forward] === LOCKED && this[ScrollDirection.Reverse] === LOCKED;
          }
          return this[direction] === LOCKED;
        }
        unlock(direction) {
          if (direction === ScrollDirection.Idle) {
            return;
          }
          this[direction] = UNLOCKED;
        }
      };
      _init33 = __decoratorStart4(null);
      __b = /* @__PURE__ */ new WeakMap();
      __a = /* @__PURE__ */ new WeakMap();
      __decorateElement4(_init33, 4, _b2, _dec2, ScrollLock, __b);
      __decorateElement4(_init33, 4, _a32, _dec, ScrollLock, __a);
      __decoratorMetadata4(_init33, ScrollLock);
      DIRECTIONS = [ScrollDirection.Forward, ScrollDirection.Reverse];
      ScrollIntent = class {
        constructor() {
          this.x = new ScrollLock();
          this.y = new ScrollLock();
        }
        isLocked() {
          return this.x.isLocked() && this.y.isLocked();
        }
      };
      ScrollIntentTracker = class extends Plugin {
        constructor(manager) {
          super(manager);
          const scrollIntent = y(new ScrollIntent());
          let previousDelta = null;
          this.signal = scrollIntent;
          x(() => {
            const { status } = manager.dragOperation;
            if (!status.initialized) {
              previousDelta = null;
              scrollIntent.value = new ScrollIntent();
              return;
            }
            const { delta } = manager.dragOperation.position;
            if (previousDelta) {
              const directions = {
                x: getDirection(delta.x, previousDelta.x),
                y: getDirection(delta.y, previousDelta.y)
              };
              const intent = scrollIntent.peek();
              r(() => {
                for (const axis of Axes) {
                  for (const direction of DIRECTIONS) {
                    if (directions[axis] === direction) {
                      intent[axis].unlock(direction);
                    }
                  }
                }
                scrollIntent.value = intent;
              });
            }
            previousDelta = delta;
          });
        }
        get current() {
          return this.signal.peek();
        }
      };
      Scroller = class extends (_a42 = CorePlugin, _autoScrolling_dec = [reactive], _a42) {
        constructor(manager) {
          super(manager);
          __privateAdd5(this, _autoScrolling, __runInitializers4(_init42, 8, this, false)), __runInitializers4(_init42, 11, this);
          __privateAdd5(this, _meta);
          __privateAdd5(this, _scroll, () => {
            if (!__privateGet5(this, _meta)) {
              return;
            }
            const { element, by } = __privateGet5(this, _meta);
            if (by.y) element.scrollTop += by.y;
            if (by.x) element.scrollLeft += by.x;
          });
          this.scroll = (options, scrollOptions) => {
            var _a5;
            if (this.disabled) {
              return false;
            }
            const elements = this.getScrollableElements();
            if (!elements) {
              __privateSet5(this, _meta, void 0);
              return false;
            }
            const { position } = this.manager.dragOperation;
            const currentPosition = position == null ? void 0 : position.current;
            if (currentPosition) {
              const { by } = options != null ? options : {};
              const intent = by ? {
                x: getScrollIntent(by.x),
                y: getScrollIntent(by.y)
              } : void 0;
              const scrollIntent = intent ? void 0 : this.scrollIntentTracker.current;
              if (scrollIntent == null ? void 0 : scrollIntent.isLocked()) {
                return false;
              }
              for (const scrollableElement of elements) {
                const scrollPosition = getScrollPosition(scrollableElement);
                const elementCanScroll = canScroll(
                  scrollableElement,
                  by,
                  scrollPosition
                );
                if (elementCanScroll.x || elementCanScroll.y) {
                  const { speed, direction } = detectScrollIntent(
                    scrollableElement,
                    currentPosition,
                    intent,
                    scrollOptions == null ? void 0 : scrollOptions.acceleration,
                    scrollOptions == null ? void 0 : scrollOptions.threshold,
                    void 0,
                    scrollPosition
                  );
                  if (scrollIntent) {
                    for (const axis of Axes) {
                      if (scrollIntent[axis].isLocked(direction[axis])) {
                        speed[axis] = 0;
                        direction[axis] = 0;
                      }
                    }
                  }
                  if (direction.x || direction.y) {
                    const { x: x2, y: y2 } = by != null ? by : direction;
                    const scrollLeftBy = x2 * speed.x;
                    const scrollTopBy = y2 * speed.y;
                    if (scrollLeftBy || scrollTopBy) {
                      const previousScrollBy = (_a5 = __privateGet5(this, _meta)) == null ? void 0 : _a5.by;
                      if (this.autoScrolling && previousScrollBy) {
                        const scrollIntentMismatch = previousScrollBy.x && !scrollLeftBy || previousScrollBy.y && !scrollTopBy;
                        if (scrollIntentMismatch) continue;
                      }
                      __privateSet5(this, _meta, {
                        element: scrollableElement,
                        by: {
                          x: scrollLeftBy,
                          y: scrollTopBy
                        }
                      });
                      scheduler.schedule(__privateGet5(this, _scroll));
                      return true;
                    }
                  }
                }
              }
            }
            __privateSet5(this, _meta, void 0);
            return false;
          };
          let previousElementFromPoint = null;
          let previousScrollableElements = null;
          const elementFromPoint = computed(() => {
            const { position, source } = manager.dragOperation;
            if (!position) {
              return null;
            }
            const element = getElementFromPoint(
              getRoot(source == null ? void 0 : source.element),
              position.current
            );
            if (element) {
              previousElementFromPoint = element;
            }
            return element != null ? element : previousElementFromPoint;
          });
          const scrollableElements = computed(() => {
            const element = elementFromPoint.value;
            const { documentElement } = getDocument(element);
            if (!element || element === documentElement) {
              const { target } = manager.dragOperation;
              const targetElement = target == null ? void 0 : target.element;
              if (targetElement) {
                const elements = getScrollableAncestors(targetElement, {
                  excludeElement: false
                });
                previousScrollableElements = elements;
                return elements;
              }
            }
            if (element) {
              const elements = getScrollableAncestors(element, {
                excludeElement: false
              });
              if (this.autoScrolling && previousScrollableElements && elements.size < (previousScrollableElements == null ? void 0 : previousScrollableElements.size)) {
                return previousScrollableElements;
              }
              previousScrollableElements = elements;
              return elements;
            }
            previousScrollableElements = null;
            return null;
          }, deepEqual);
          this.getScrollableElements = () => {
            return scrollableElements.value;
          };
          this.scrollIntentTracker = new ScrollIntentTracker(manager);
          this.destroy = manager.monitor.addEventListener("dragmove", (event) => {
            if (this.disabled || event.defaultPrevented || !isKeyboardEvent(manager.dragOperation.activatorEvent) || !event.by) {
              return;
            }
            if (this.scroll({ by: event.by })) {
              event.preventDefault();
            }
          });
        }
      };
      _init42 = __decoratorStart4(_a42);
      _autoScrolling = /* @__PURE__ */ new WeakMap();
      _meta = /* @__PURE__ */ new WeakMap();
      _scroll = /* @__PURE__ */ new WeakMap();
      __decorateElement4(_init42, 4, "autoScrolling", _autoScrolling_dec, Scroller, _autoScrolling);
      __decoratorMetadata4(_init42, Scroller);
      Scheduler2 = class {
        constructor(scheduler5) {
          this.scheduler = scheduler5;
          this.pending = false;
          this.tasks = /* @__PURE__ */ new Set();
          this.resolvers = /* @__PURE__ */ new Set();
          this.flush = () => {
            const { tasks, resolvers } = this;
            this.pending = false;
            this.tasks = /* @__PURE__ */ new Set();
            this.resolvers = /* @__PURE__ */ new Set();
            for (const task of tasks) {
              task();
            }
            for (const resolve of resolvers) {
              resolve();
            }
          };
        }
        schedule(task) {
          this.tasks.add(task);
          if (!this.pending) {
            this.pending = true;
            this.scheduler(this.flush);
          }
          return new Promise((resolve) => this.resolvers.add(resolve));
        }
      };
      scheduler32 = new Scheduler2((callback) => {
        if (typeof requestAnimationFrame === "function") {
          requestAnimationFrame(callback);
        } else {
          callback();
        }
      });
      AUTOSCROLL_INTERVAL = 10;
      _AutoScroller = class _AutoScroller2 extends Plugin {
        constructor(manager, options) {
          super(manager, options);
          const scroller = manager.registry.plugins.get(Scroller);
          if (!scroller) {
            throw new Error("AutoScroller plugin depends on Scroller plugin");
          }
          this.destroy = x(() => {
            var _a5, _b22, _c32;
            if (this.disabled) {
              return;
            }
            const { position: _2, status } = manager.dragOperation;
            if (status.dragging) {
              const scrollOptions = {
                acceleration: (_a5 = this.options) == null ? void 0 : _a5.acceleration,
                threshold: typeof ((_b22 = this.options) == null ? void 0 : _b22.threshold) === "number" ? { x: this.options.threshold, y: this.options.threshold } : (_c32 = this.options) == null ? void 0 : _c32.threshold
              };
              const canScroll2 = scroller.scroll(void 0, scrollOptions);
              if (canScroll2) {
                scroller.autoScrolling = true;
                const interval = setInterval(
                  () => scheduler32.schedule(
                    () => scroller.scroll(void 0, scrollOptions)
                  ),
                  AUTOSCROLL_INTERVAL
                );
                return () => {
                  clearInterval(interval);
                };
              } else {
                scroller.autoScrolling = false;
              }
            }
          });
        }
      };
      _AutoScroller.configure = configurator(_AutoScroller);
      AutoScroller = _AutoScroller;
      listenerOptions = {
        capture: true,
        passive: true
      };
      ScrollListener = class extends CorePlugin {
        constructor(manager) {
          super(manager);
          __privateAdd5(this, _timeout);
          this.handleScroll = () => {
            if (__privateGet5(this, _timeout) == null) {
              __privateSet5(this, _timeout, setTimeout(() => {
                this.manager.collisionObserver.forceUpdate(false);
                __privateSet5(this, _timeout, void 0);
              }, 50));
            }
          };
          const { dragOperation } = this.manager;
          this.destroy = x(() => {
            var _a5, _b22, _c32;
            const enabled = dragOperation.status.dragging;
            if (enabled) {
              const root = (_c32 = (_b22 = (_a5 = dragOperation.source) == null ? void 0 : _a5.element) == null ? void 0 : _b22.ownerDocument) != null ? _c32 : document;
              root.addEventListener("scroll", this.handleScroll, listenerOptions);
              return () => {
                root.removeEventListener(
                  "scroll",
                  this.handleScroll,
                  listenerOptions
                );
              };
            }
          });
        }
      };
      _timeout = /* @__PURE__ */ new WeakMap();
      CSS_RULES2 = "* { user-select: none !important; -webkit-user-select: none !important; }";
      PreventSelection = class extends Plugin {
        constructor(manager) {
          super(manager);
          this.manager = manager;
          const styleInjector = manager.registry.plugins.get(
            StyleInjector
          );
          const unregisterStyles = styleInjector == null ? void 0 : styleInjector.register(CSS_RULES2);
          this.destroy = x(() => {
            const { dragOperation } = this.manager;
            if (dragOperation.status.initialized) {
              removeSelection();
              document.addEventListener("selectionchange", removeSelection, {
                capture: true
              });
              return () => {
                document.removeEventListener("selectionchange", removeSelection, {
                  capture: true
                });
              };
            }
          });
          if (unregisterStyles) {
            const originalDestroy = this.destroy.bind(this);
            this.destroy = () => {
              unregisterStyles();
              originalDestroy();
            };
          }
        }
      };
      namedKeys = /* @__PURE__ */ new Set([
        "alt",
        "altgraph",
        "backspace",
        "capslock",
        "control",
        "delete",
        "end",
        "enter",
        "escape",
        "home",
        "insert",
        "meta",
        "pagedown",
        "pageup",
        "pause",
        "printscreen",
        "shift",
        "space",
        "tab",
        "arrowdown",
        "arrowleft",
        "arrowright",
        "arrowup",
        "f1",
        "f2",
        "f3",
        "f4",
        "f5",
        "f6",
        "f7",
        "f8",
        "f9",
        "f10",
        "f11",
        "f12"
      ]);
      defaults = Object.freeze({
        offset: 10,
        keyboardCodes: {
          start: ["Space", "Enter"],
          cancel: ["Escape"],
          end: ["Space", "Enter", "Tab"],
          up: ["ArrowUp"],
          down: ["ArrowDown"],
          left: ["ArrowLeft"],
          right: ["ArrowRight"]
        },
        preventActivation(event, source) {
          var _a5;
          const target = (_a5 = source.handle) != null ? _a5 : source.element;
          return event.target !== target;
        }
      });
      _KeyboardSensor = class _KeyboardSensor2 extends Sensor {
        constructor(manager, options) {
          super(manager);
          this.manager = manager;
          this.options = options;
          __privateAdd5(this, _cleanupFunctions2, []);
          this.listeners = new Listeners();
          this.handleSourceKeyDown = (event, source, options2) => {
            if (this.disabled || event.defaultPrevented) {
              return;
            }
            if (!isElement(event.target)) {
              return;
            }
            if (source.disabled) {
              return;
            }
            const {
              keyboardCodes = defaults.keyboardCodes,
              preventActivation = defaults.preventActivation
            } = options2 != null ? options2 : {};
            if (!isKeyboardKey(event, keyboardCodes.start)) {
              return;
            }
            if (!this.manager.dragOperation.status.idle) {
              return;
            }
            if (preventActivation == null ? void 0 : preventActivation(event, source)) return;
            this.handleStart(event, source, options2);
          };
        }
        bind(source, options = this.options) {
          const unbind = x(() => {
            var _a5;
            const target = (_a5 = source.handle) != null ? _a5 : source.element;
            const listener = (event) => {
              if (isKeyboardEvent(event)) {
                this.handleSourceKeyDown(event, source, options);
              }
            };
            if (target) {
              target.addEventListener("keydown", listener);
              return () => {
                target.removeEventListener("keydown", listener);
              };
            }
          });
          return unbind;
        }
        handleStart(event, source, options) {
          const { element } = source;
          if (!element) {
            throw new Error("Source draggable does not have an associated element");
          }
          event.preventDefault();
          event.stopImmediatePropagation();
          scrollIntoViewIfNeeded(element);
          const { center } = new DOMRectangle(element);
          const controller = this.manager.actions.start({
            event,
            coordinates: {
              x: center.x,
              y: center.y
            },
            source
          });
          if (controller.signal.aborted) return this.cleanup();
          this.sideEffects();
          const sourceDocument = getDocument(element);
          const listeners = [
            this.listeners.bind(sourceDocument, [
              {
                type: "keydown",
                listener: (event2) => this.handleKeyDown(event2, source, options),
                options: { capture: true }
              }
            ])
          ];
          __privateGet5(this, _cleanupFunctions2).push(...listeners);
        }
        handleKeyDown(event, _source, options) {
          const { keyboardCodes = defaults.keyboardCodes } = options != null ? options : {};
          if (isKeyboardKey(event, [...keyboardCodes.end, ...keyboardCodes.cancel])) {
            event.preventDefault();
            const canceled = isKeyboardKey(event, keyboardCodes.cancel);
            this.handleEnd(event, canceled);
            return;
          }
          if (isKeyboardKey(event, keyboardCodes.up)) {
            this.handleMove("up", event);
          } else if (isKeyboardKey(event, keyboardCodes.down)) {
            this.handleMove("down", event);
          }
          if (isKeyboardKey(event, keyboardCodes.left)) {
            this.handleMove("left", event);
          } else if (isKeyboardKey(event, keyboardCodes.right)) {
            this.handleMove("right", event);
          }
        }
        handleEnd(event, canceled) {
          this.manager.actions.stop({
            event,
            canceled
          });
          this.cleanup();
        }
        handleMove(direction, event) {
          var _a5, _b22;
          const { shape } = this.manager.dragOperation;
          const factor = event.shiftKey ? 5 : 1;
          let by = {
            x: 0,
            y: 0
          };
          let offset = (_b22 = (_a5 = this.options) == null ? void 0 : _a5.offset) != null ? _b22 : defaults.offset;
          if (typeof offset === "number") {
            offset = { x: offset, y: offset };
          }
          if (!shape) {
            return;
          }
          switch (direction) {
            case "up":
              by = { x: 0, y: -offset.y * factor };
              break;
            case "down":
              by = { x: 0, y: offset.y * factor };
              break;
            case "left":
              by = { x: -offset.x * factor, y: 0 };
              break;
            case "right":
              by = { x: offset.x * factor, y: 0 };
              break;
          }
          if (by.x || by.y) {
            event.preventDefault();
            this.manager.actions.move({
              event,
              by
            });
          }
        }
        sideEffects() {
          const autoScroller = this.manager.registry.plugins.get(AutoScroller);
          if ((autoScroller == null ? void 0 : autoScroller.disabled) === false) {
            autoScroller.disable();
            __privateGet5(this, _cleanupFunctions2).push(() => {
              autoScroller.enable();
            });
          }
        }
        cleanup() {
          __privateGet5(this, _cleanupFunctions2).forEach((cleanup) => cleanup());
          __privateSet5(this, _cleanupFunctions2, []);
        }
        destroy() {
          this.cleanup();
          this.listeners.clear();
        }
      };
      _cleanupFunctions2 = /* @__PURE__ */ new WeakMap();
      _KeyboardSensor.configure = configurator(_KeyboardSensor);
      _KeyboardSensor.defaults = defaults;
      KeyboardSensor = _KeyboardSensor;
      DistanceConstraint = class extends ActivationConstraint {
        constructor() {
          super(...arguments);
          __privateAdd5(this, _coordinates);
        }
        onEvent(event) {
          switch (event.type) {
            case "pointerdown":
              __privateSet5(this, _coordinates, getEventCoordinates(event));
              break;
            case "pointermove":
              if (!__privateGet5(this, _coordinates)) return;
              const { x: x2, y: y2 } = getEventCoordinates(event);
              const delta = {
                x: x2 - __privateGet5(this, _coordinates).x,
                y: y2 - __privateGet5(this, _coordinates).y
              };
              const { tolerance } = this.options;
              if (tolerance && exceedsDistance(delta, tolerance)) {
                this.abort();
                return;
              }
              if (exceedsDistance(delta, this.options.value)) {
                this.activate(event);
              }
              break;
            case "pointerup":
              this.abort();
              break;
          }
        }
        abort() {
          __privateSet5(this, _coordinates, void 0);
        }
      };
      _coordinates = /* @__PURE__ */ new WeakMap();
      DelayConstraint = class extends ActivationConstraint {
        constructor() {
          super(...arguments);
          __privateAdd5(this, _timeout2);
          __privateAdd5(this, _coordinates2);
        }
        onEvent(event) {
          switch (event.type) {
            case "pointerdown":
              __privateSet5(this, _coordinates2, getEventCoordinates(event));
              __privateSet5(this, _timeout2, setTimeout(
                () => this.activate(event),
                this.options.value
              ));
              break;
            case "pointermove":
              if (!__privateGet5(this, _coordinates2)) return;
              const { x: x2, y: y2 } = getEventCoordinates(event);
              const delta = {
                x: x2 - __privateGet5(this, _coordinates2).x,
                y: y2 - __privateGet5(this, _coordinates2).y
              };
              if (exceedsDistance(delta, this.options.tolerance)) {
                this.abort();
              }
              break;
            case "pointerup":
              this.abort();
              break;
          }
        }
        abort() {
          if (__privateGet5(this, _timeout2)) {
            clearTimeout(__privateGet5(this, _timeout2));
            __privateSet5(this, _coordinates2, void 0);
            __privateSet5(this, _timeout2, void 0);
          }
        }
      };
      _timeout2 = /* @__PURE__ */ new WeakMap();
      _coordinates2 = /* @__PURE__ */ new WeakMap();
      PointerActivationConstraints = class {
      };
      PointerActivationConstraints.Delay = DelayConstraint;
      PointerActivationConstraints.Distance = DistanceConstraint;
      defaults2 = Object.freeze({
        activationConstraints(event, source) {
          var _a5;
          const { pointerType, target } = event;
          if (pointerType === "mouse" && isElement(target) && (source.handle === target || ((_a5 = source.handle) == null ? void 0 : _a5.contains(target)))) {
            return void 0;
          }
          if (pointerType === "touch") {
            return [
              new PointerActivationConstraints.Delay({ value: 250, tolerance: 5 })
            ];
          }
          if (isTextInput(target) && !event.defaultPrevented) {
            return [
              new PointerActivationConstraints.Delay({ value: 200, tolerance: 0 })
            ];
          }
          return [
            new PointerActivationConstraints.Delay({ value: 200, tolerance: 10 }),
            new PointerActivationConstraints.Distance({ value: 5 })
          ];
        },
        preventActivation(event, source) {
          var _a5;
          const { target } = event;
          if (target === source.element) return false;
          if (target === source.handle) return false;
          if (!isElement(target)) return false;
          if ((_a5 = source.handle) == null ? void 0 : _a5.contains(target)) return false;
          const interactiveElement = getInteractiveElement(target);
          if (interactiveElement === source.element) return false;
          return Boolean(interactiveElement);
        }
      });
      _PointerSensor = class _PointerSensor2 extends Sensor {
        constructor(manager, options) {
          super(manager);
          this.manager = manager;
          this.options = options;
          __privateAdd5(this, _cleanup, /* @__PURE__ */ new Set());
          this.listeners = new Listeners();
          this.latest = {
            event: void 0,
            coordinates: void 0
          };
          this.handleMove = () => {
            const { event, coordinates: to2 } = this.latest;
            if (!event || !to2) {
              return;
            }
            this.manager.actions.move({ event, to: to2 });
          };
          this.handleCancel = this.handleCancel.bind(this);
          this.handlePointerUp = this.handlePointerUp.bind(this);
          this.handleKeyDown = this.handleKeyDown.bind(this);
        }
        activationConstraints(event, source, options = this.options) {
          const { activationConstraints = defaults2.activationConstraints } = options != null ? options : {};
          const constraints = typeof activationConstraints === "function" ? activationConstraints(event, source) : activationConstraints;
          return constraints;
        }
        bind(source, options = this.options) {
          const unbind = x(() => {
            var _a5;
            const controller = new AbortController();
            const { signal: signal3 } = controller;
            const listener = (event) => {
              if (isPointerEvent(event)) {
                this.handlePointerDown(event, source, options);
              }
            };
            let targets = [(_a5 = source.handle) != null ? _a5 : source.element];
            if (options == null ? void 0 : options.activatorElements) {
              if (Array.isArray(options.activatorElements)) {
                targets = options.activatorElements;
              } else {
                targets = options.activatorElements(source);
              }
            }
            for (const target of targets) {
              if (!target) continue;
              patchWindow(target.ownerDocument.defaultView);
              target.addEventListener("pointerdown", listener, { signal: signal3 });
            }
            return () => controller.abort();
          });
          return unbind;
        }
        handlePointerDown(event, source, options) {
          if (this.disabled || !event.isPrimary || event.button !== 0 || !isElement(event.target) || source.disabled || isCapturedBySensor(event) || !this.manager.dragOperation.status.idle) {
            return;
          }
          const { preventActivation = defaults2.preventActivation } = options != null ? options : {};
          if (preventActivation == null ? void 0 : preventActivation(event, source)) {
            return;
          }
          const { target } = event;
          const isNativeDraggable = isHTMLElement(target) && target.draggable && target.getAttribute("draggable") === "true";
          const offset = getFrameTransform(source.element);
          const { x: x2, y: y2 } = getEventCoordinates(event);
          this.initialCoordinates = {
            x: x2 * offset.scaleX + offset.x,
            y: y2 * offset.scaleY + offset.y
          };
          const constraints = this.activationConstraints(event, source, options);
          event.sensor = this;
          const controller = new ActivationController(
            constraints,
            (event2) => this.handleStart(source, event2)
          );
          controller.signal.onabort = () => this.handleCancel(event);
          controller.onEvent(event);
          this.controller = controller;
          const { pointerId } = event;
          const forPointer = (listener) => (event2) => {
            if (event2.pointerId === pointerId) {
              listener(event2);
            }
          };
          const documents = getDocuments();
          const unbindListeners = this.listeners.bind(documents, [
            {
              type: "pointermove",
              listener: forPointer((event2) => this.handlePointerMove(event2, source))
            },
            {
              type: "pointerup",
              listener: forPointer(this.handlePointerUp),
              options: {
                capture: true
              }
            },
            {
              type: "pointercancel",
              listener: forPointer(this.handleCancel)
            },
            {
              // Cancel activation if there is a competing Drag and Drop interaction
              type: "dragstart",
              listener: isNativeDraggable ? this.handleCancel : preventDefault,
              options: {
                capture: true
              }
            }
          ]);
          const cleanup = () => {
            unbindListeners();
            this.initialCoordinates = void 0;
          };
          __privateGet5(this, _cleanup).add(cleanup);
        }
        handlePointerMove(event, source) {
          var _a5, _b22;
          if (((_a5 = this.controller) == null ? void 0 : _a5.activated) === false) {
            (_b22 = this.controller) == null ? void 0 : _b22.onEvent(event);
          }
          const { status } = this.manager.dragOperation;
          if (status.initializing || status.dragging) {
            const coordinates = getEventCoordinates(event);
            const offset = getFrameTransform(source.element);
            coordinates.x = coordinates.x * offset.scaleX + offset.x;
            coordinates.y = coordinates.y * offset.scaleY + offset.y;
            event.preventDefault();
            event.stopPropagation();
            this.latest.event = event;
            this.latest.coordinates = coordinates;
            if (status.dragging) {
              scheduler.schedule(this.handleMove);
            }
          }
        }
        handlePointerUp(event) {
          const { status } = this.manager.dragOperation;
          if (!status.idle) {
            event.preventDefault();
            event.stopPropagation();
            const canceled = !status.initialized;
            const ownerDocument = getDocument(event.target);
            const ownerWindow = ownerDocument.defaultView;
            if (!canceled && ownerWindow) {
              const suppressClick = (clickEvent) => {
                if (clickEvent.target === ownerDocument.body && clickEvent.detail > 0) {
                  clickEvent.preventDefault();
                  clickEvent.stopImmediatePropagation();
                }
              };
              ownerWindow.addEventListener("click", suppressClick, true);
              ownerWindow.setTimeout(() => {
                ownerWindow.removeEventListener("click", suppressClick, true);
              }, 0);
            }
            this.manager.actions.stop({ event, canceled });
          }
          this.cleanup();
        }
        handleKeyDown(event) {
          if (event.key === "Escape") {
            event.preventDefault();
            this.handleCancel(event);
          }
        }
        handleStart(source, event) {
          const { manager, initialCoordinates } = this;
          if (!initialCoordinates || !manager.dragOperation.status.idle) {
            return;
          }
          if (event.defaultPrevented) {
            return;
          }
          const controller = manager.actions.start({
            coordinates: initialCoordinates,
            event,
            source
          });
          if (controller.signal.aborted) return this.cleanup();
          event.preventDefault();
          const ownerDocument = getDocument(event.target);
          const pointerCaptureTarget = ownerDocument.body;
          try {
            pointerCaptureTarget.setPointerCapture(event.pointerId);
          } catch (e2) {
            this.handleCancel(event);
            return;
          }
          const listenerTargets = isElement(event.target) ? [event.target, pointerCaptureTarget] : pointerCaptureTarget;
          const unbind = this.listeners.bind(listenerTargets, [
            {
              // Prevent scrolling on touch devices
              type: "touchmove",
              listener: preventDefault,
              options: {
                passive: false
              }
            },
            {
              // Prevent click events
              type: "click",
              listener: preventDefault
            },
            {
              type: "contextmenu",
              listener: preventDefault
            },
            {
              type: "keydown",
              listener: this.handleKeyDown
            }
          ]);
          __privateGet5(this, _cleanup).add(unbind);
          manager.renderer.rendering.then(() => {
            if (!controller.signal.aborted && manager.dragOperation.status.dragging) {
              scheduler.schedule(this.handleMove);
            }
          });
        }
        handleCancel(event) {
          const { dragOperation } = this.manager;
          if (dragOperation.status.initialized) {
            this.manager.actions.stop({ event, canceled: true });
          }
          this.cleanup();
        }
        cleanup() {
          const { controller } = this;
          this.controller = void 0;
          if (controller && !controller.signal.aborted) {
            controller.abort();
          }
          this.latest = {
            event: void 0,
            coordinates: void 0
          };
          __privateGet5(this, _cleanup).forEach((cleanup) => cleanup());
          __privateGet5(this, _cleanup).clear();
        }
        destroy() {
          this.cleanup();
          this.listeners.clear();
        }
      };
      _cleanup = /* @__PURE__ */ new WeakMap();
      _PointerSensor.configure = configurator(_PointerSensor);
      _PointerSensor.defaults = defaults2;
      PointerSensor = _PointerSensor;
      windows = /* @__PURE__ */ new WeakSet();
      defaultPreset = {
        modifiers: [],
        plugins: [Accessibility, AutoScroller, Cursor, Feedback, PreventSelection],
        sensors: [PointerSensor, KeyboardSensor]
      };
      DragDropManager2 = class extends DragDropManager {
        constructor(input = {}) {
          const plugins = resolveCustomizable(input.plugins, defaultPreset.plugins);
          const sensors = resolveCustomizable(input.sensors, defaultPreset.sensors);
          const modifiers = resolveCustomizable(
            input.modifiers,
            defaultPreset.modifiers
          );
          super(__spreadProps3(__spreadValues4({}, input), {
            plugins: [ScrollListener, Scroller, StyleInjector, ...plugins],
            sensors,
            modifiers
          }));
        }
      };
      Draggable2 = class extends (_c4 = Draggable, _handle_dec = [reactive], _element_dec = [reactive], _c4) {
        constructor(_a5, manager) {
          var _b22 = _a5, {
            element,
            effects: effects2 = () => [],
            handle
          } = _b22, input = __objRest2(_b22, [
            "element",
            "effects",
            "handle"
          ]);
          super(
            __spreadValues4({
              effects: () => [
                ...effects2(),
                () => {
                  var _a6, _b3;
                  const { manager: manager2 } = this;
                  if (!manager2) return;
                  const sensors = (_b3 = (_a6 = this.sensors) == null ? void 0 : _a6.map(descriptor)) != null ? _b3 : [
                    ...manager2.sensors
                  ];
                  const unbindFunctions = sensors.map((entry) => {
                    const sensorInstance = entry instanceof Sensor ? entry : manager2.registry.register(entry.plugin);
                    const options = entry instanceof Sensor ? void 0 : entry.options;
                    const unbind = sensorInstance.bind(this, options);
                    return unbind;
                  });
                  return function cleanup() {
                    unbindFunctions.forEach((unbind) => unbind());
                  };
                }
              ]
            }, input),
            manager
          );
          __privateAdd5(this, _handle, __runInitializers4(_init52, 8, this)), __runInitializers4(_init52, 11, this);
          __privateAdd5(this, _element, __runInitializers4(_init52, 12, this)), __runInitializers4(_init52, 15, this);
          this.element = element;
          this.handle = handle;
        }
      };
      _init52 = __decoratorStart4(_c4);
      _handle = /* @__PURE__ */ new WeakMap();
      _element = /* @__PURE__ */ new WeakMap();
      __decorateElement4(_init52, 4, "handle", _handle_dec, Draggable2, _handle);
      __decorateElement4(_init52, 4, "element", _element_dec, Draggable2, _element);
      __decoratorMetadata4(_init52, Draggable2);
      Droppable2 = class extends (_c23 = Droppable, _element_dec2 = [reactive], _proxy_dec = [reactive], _c23) {
        constructor(_a5, manager) {
          var _b22 = _a5, { element, effects: effects2 = () => [] } = _b22, input = __objRest2(_b22, ["element", "effects"]);
          const { collisionDetector = defaultCollisionDetection } = input;
          const updateShape = (boundingClientRect) => {
            const { manager: manager2, element: element2 } = this;
            if (!element2 || boundingClientRect === null) {
              this.shape = void 0;
              return void 0;
            }
            if (!manager2) return;
            const updatedShape = new DOMRectangle(element2);
            const shape = f(() => this.shape);
            if (updatedShape && (shape == null ? void 0 : shape.equals(updatedShape))) {
              return shape;
            }
            this.shape = updatedShape;
            return updatedShape;
          };
          const observePosition = y(false);
          super(
            __spreadProps3(__spreadValues4({}, input), {
              collisionDetector,
              effects: () => [
                ...effects2(),
                () => {
                  const { element: element2, manager: manager2 } = this;
                  if (!manager2) return;
                  const { dragOperation } = manager2;
                  const { source } = dragOperation;
                  observePosition.value = Boolean(
                    source && dragOperation.status.initialized && element2 && !this.disabled && this.accepts(source)
                  );
                },
                () => {
                  const { element: element2 } = this;
                  if (observePosition.value && element2) {
                    const positionObserver = new FrameObserver(
                      element2,
                      updateShape
                    );
                    return () => {
                      positionObserver.disconnect();
                      this.shape = void 0;
                    };
                  }
                },
                () => {
                  var _a6;
                  if ((_a6 = this.manager) == null ? void 0 : _a6.dragOperation.status.initialized) {
                    return () => {
                      this.shape = void 0;
                    };
                  }
                }
              ]
            }),
            manager
          );
          __privateAdd5(this, _Droppable_instances);
          __privateAdd5(this, _element2, __runInitializers4(_init62, 8, this)), __runInitializers4(_init62, 11, this);
          __privateAdd5(this, _proxy, __runInitializers4(_init62, 12, this)), __runInitializers4(_init62, 15, this);
          this.element = element;
          this.refreshShape = () => updateShape();
        }
        set element(element) {
          __privateSet5(this, _Droppable_instances, element, element_set);
        }
        get element() {
          var _a5;
          return (_a5 = this.proxy) != null ? _a5 : __privateGet5(this, _Droppable_instances, element_get);
        }
      };
      _init62 = __decoratorStart4(_c23);
      _element2 = /* @__PURE__ */ new WeakMap();
      _Droppable_instances = /* @__PURE__ */ new WeakSet();
      _proxy = /* @__PURE__ */ new WeakMap();
      _d2 = __decorateElement4(_init62, 20, "#element", _element_dec2, _Droppable_instances, _element2), element_get = _d2.get, element_set = _d2.set;
      __decorateElement4(_init62, 4, "proxy", _proxy_dec, Droppable2, _proxy);
      __decoratorMetadata4(_init62, Droppable2);
    }
  });

  // node_modules/@dnd-kit/dom/sortable.js
  function isSortable(element) {
    return element instanceof SortableDroppable || element instanceof SortableDraggable;
  }
  function getDirection2(delta) {
    const { x: x2, y: y2 } = delta;
    if (x2 > 0) {
      return "right";
    } else if (x2 < 0) {
      return "left";
    } else if (y2 > 0) {
      return "down";
    } else if (y2 < 0) {
      return "up";
    }
  }
  function arrayMove(array, from, to2) {
    if (from === to2) {
      return array;
    }
    const newArray = array.slice();
    newArray.splice(to2, 0, newArray.splice(from, 1)[0]);
    return newArray;
  }
  function getRecordKey(items, id2) {
    const key = String(id2);
    return Object.prototype.hasOwnProperty.call(items, key) ? key : void 0;
  }
  function hasSortableIndices(source) {
    return "initialIndex" in source && typeof source.initialIndex === "number" && "index" in source && typeof source.index === "number";
  }
  function mutate(items, event, mutation) {
    var _a5, _b3;
    const { source, target, canceled } = event.operation;
    if (!source || !target || canceled) {
      if ("preventDefault" in event) event.preventDefault();
      return items;
    }
    const findIndex = (item, id2) => item === id2 || item !== null && typeof item === "object" && "id" in item && item.id === id2;
    if (Array.isArray(items)) {
      const sourceIndex2 = items.findIndex((item) => findIndex(item, source.id));
      const targetIndex2 = items.findIndex((item) => findIndex(item, target.id));
      if (sourceIndex2 === -1 || targetIndex2 === -1) {
        if (hasSortableIndices(source)) {
          const from = source.initialIndex;
          const to2 = source.index;
          if (from === to2 || from < 0 || from >= items.length) {
            if ("preventDefault" in event) event.preventDefault();
            return items;
          }
          return mutation(items, from, to2);
        }
        return items;
      }
      if (!canceled && "index" in source && typeof source.index === "number") {
        const projectedSourceIndex = source.index;
        if (projectedSourceIndex !== sourceIndex2) {
          return mutation(items, sourceIndex2, projectedSourceIndex);
        }
      }
      return mutation(items, sourceIndex2, targetIndex2);
    }
    const entries = Object.entries(items);
    let sourceIndex = -1;
    let sourceParent;
    let targetIndex = -1;
    let targetParent;
    for (const [id2, children] of entries) {
      if (sourceIndex === -1) {
        sourceIndex = children.findIndex((item) => findIndex(item, source.id));
        if (sourceIndex !== -1) {
          sourceParent = id2;
        }
      }
      if (targetIndex === -1) {
        targetIndex = children.findIndex((item) => findIndex(item, target.id));
        if (targetIndex !== -1) {
          targetParent = id2;
        }
      }
      if (sourceIndex !== -1 && targetIndex !== -1) {
        break;
      }
    }
    if (sourceIndex === -1 && hasSortableIndices(source)) {
      const srcParent = source.initialGroup == null ? void 0 : getRecordKey(items, source.initialGroup);
      const srcIndex = source.initialIndex;
      const tgtParent = source.group == null ? void 0 : getRecordKey(items, source.group);
      const tgtIndex = source.index;
      if (srcParent == null || tgtParent == null) {
        if ("preventDefault" in event) event.preventDefault();
        return items;
      }
      if (srcParent === tgtParent && srcIndex === tgtIndex) {
        if ("preventDefault" in event) event.preventDefault();
        return items;
      }
      if (srcParent === tgtParent) {
        return __spreadProps22(__spreadValues22({}, items), {
          [srcParent]: mutation(items[srcParent], srcIndex, tgtIndex)
        });
      }
      const sourceItem2 = items[srcParent][srcIndex];
      return __spreadProps22(__spreadValues22({}, items), {
        [srcParent]: [
          ...items[srcParent].slice(0, srcIndex),
          ...items[srcParent].slice(srcIndex + 1)
        ],
        [tgtParent]: [
          ...items[tgtParent].slice(0, tgtIndex),
          sourceItem2,
          ...items[tgtParent].slice(tgtIndex)
        ]
      });
    }
    if (!source.manager) return items;
    const { dragOperation } = source.manager;
    const position = (_b3 = (_a5 = dragOperation.shape) == null ? void 0 : _a5.current.center) != null ? _b3 : dragOperation.position.current;
    if (targetParent == null) {
      const targetKey = getRecordKey(items, target.id);
      if (targetKey != null) {
        const insertionIndex = target.shape && position.y > target.shape.center.y ? items[targetKey].length : 0;
        targetParent = targetKey;
        targetIndex = insertionIndex;
      }
    }
    if (sourceParent == null || targetParent == null || sourceParent === targetParent && sourceIndex === targetIndex) {
      if (sourceParent != null && sourceParent === targetParent && sourceIndex === targetIndex && hasSortableIndices(source)) {
        const sourceGroupParent = source.group == null ? void 0 : getRecordKey(items, source.group);
        const hasGroupChanged = source.group != null && sourceGroupParent !== sourceParent;
        const hasIndexChanged = source.index !== sourceIndex;
        if (hasGroupChanged || hasIndexChanged) {
          const reconciledTargetParent = source.group == null ? sourceParent : sourceGroupParent;
          if (reconciledTargetParent != null) {
            if (sourceParent === reconciledTargetParent) {
              return __spreadProps22(__spreadValues22({}, items), {
                [sourceParent]: mutation(
                  items[sourceParent],
                  sourceIndex,
                  source.index
                )
              });
            }
            const sourceItem2 = items[sourceParent][sourceIndex];
            return __spreadProps22(__spreadValues22({}, items), {
              [sourceParent]: [
                ...items[sourceParent].slice(0, sourceIndex),
                ...items[sourceParent].slice(sourceIndex + 1)
              ],
              [reconciledTargetParent]: [
                ...items[reconciledTargetParent].slice(0, source.index),
                sourceItem2,
                ...items[reconciledTargetParent].slice(source.index)
              ]
            });
          }
        }
      }
      if ("preventDefault" in event) event.preventDefault();
      return items;
    }
    if (sourceParent === targetParent) {
      return __spreadProps22(__spreadValues22({}, items), {
        [sourceParent]: mutation(items[sourceParent], sourceIndex, targetIndex)
      });
    }
    const isBelowTarget = target.shape && Math.round(position.y) > Math.round(target.shape.center.y);
    const modifier = isBelowTarget ? 1 : 0;
    const sourceItem = items[sourceParent][sourceIndex];
    return __spreadProps22(__spreadValues22({}, items), {
      [sourceParent]: [
        ...items[sourceParent].slice(0, sourceIndex),
        ...items[sourceParent].slice(sourceIndex + 1)
      ],
      [targetParent]: [
        ...items[targetParent].slice(0, targetIndex + modifier),
        sourceItem,
        ...items[targetParent].slice(targetIndex + modifier)
      ]
    });
  }
  function move(items, event) {
    return mutate(items, event, arrayMove);
  }
  function getSortableIndices(instances) {
    const sortableIndices = /* @__PURE__ */ new Map();
    for (const [, group] of instances) {
      for (const sortable of group) {
        sortableIndices.set(sortable.id, sortable.index);
      }
    }
    return sortableIndices;
  }
  function hasChanged(snapshotIndices, instances, newInstances) {
    var _a5;
    for (const [group, sortables] of instances) {
      for (const sortable of sortables) {
        const index = snapshotIndices.get(sortable.id);
        if (sortable.index !== index || sortable.group !== group || !((_a5 = newInstances.get(group)) == null ? void 0 : _a5.has(sortable))) {
          return true;
        }
      }
    }
    return false;
  }
  function reorder(sourceElement, sourceIndex, targetElement, targetIndex) {
    const position = targetIndex < sourceIndex ? "afterend" : "beforebegin";
    targetElement.insertAdjacentElement(position, sourceElement);
  }
  function sortByIndex(a2, b2) {
    return a2.index - b2.index;
  }
  function sortByInitialIndex(a2, b2) {
    return a2.initialIndex - b2.initialIndex;
  }
  function sort(instances, sortFn = sortByIndex) {
    return Array.from(instances).sort(sortFn);
  }
  function normalizeDisabled(disabled) {
    var _a5, _b3;
    if (typeof disabled === "boolean") {
      return {
        draggable: disabled,
        droppable: disabled
      };
    }
    return {
      draggable: (_a5 = disabled == null ? void 0 : disabled.draggable) != null ? _a5 : false,
      droppable: (_b3 = disabled == null ? void 0 : disabled.droppable) != null ? _b3 : false
    };
  }
  var __create5, __defProp5, __defProps4, __getOwnPropDesc5, __getOwnPropDescs4, __getOwnPropSymbols5, __hasOwnProp5, __propIsEnum5, __knownSymbol5, __typeError6, __defNormalProp5, __spreadValues5, __spreadProps4, __objRest3, __decoratorStart5, __decoratorStrings5, __expectFn5, __decoratorContext5, __decoratorMetadata5, __runInitializers5, __decorateElement5, __accessCheck6, __privateGet6, __privateAdd6, __privateSet6, TOLERANCE, SortableKeyboardPlugin, __defProp22, __defProps22, __getOwnPropDescs22, __getOwnPropSymbols22, __hasOwnProp22, __propIsEnum22, __defNormalProp22, __spreadValues22, __spreadProps22, defaultGroup, OptimisticSortingPlugin, defaultPlugins, defaultSortableTransition, store, _group_dec, _index_dec, _init8, _index, _previousGroup, _previousIndex, _group, _element3, Sortable2, SortableDraggable, SortableDroppable;
  var init_sortable = __esm({
    "node_modules/@dnd-kit/dom/sortable.js"() {
      init_dist();
      init_abstract();
      init_dist3();
      init_dom();
      init_utilities();
      init_dist2();
      __create5 = Object.create;
      __defProp5 = Object.defineProperty;
      __defProps4 = Object.defineProperties;
      __getOwnPropDesc5 = Object.getOwnPropertyDescriptor;
      __getOwnPropDescs4 = Object.getOwnPropertyDescriptors;
      __getOwnPropSymbols5 = Object.getOwnPropertySymbols;
      __hasOwnProp5 = Object.prototype.hasOwnProperty;
      __propIsEnum5 = Object.prototype.propertyIsEnumerable;
      __knownSymbol5 = (name, symbol) => (symbol = Symbol[name]) ? symbol : /* @__PURE__ */ Symbol.for("Symbol." + name);
      __typeError6 = (msg) => {
        throw TypeError(msg);
      };
      __defNormalProp5 = (obj, key, value) => key in obj ? __defProp5(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
      __spreadValues5 = (a2, b2) => {
        for (var prop in b2 || (b2 = {}))
          if (__hasOwnProp5.call(b2, prop))
            __defNormalProp5(a2, prop, b2[prop]);
        if (__getOwnPropSymbols5)
          for (var prop of __getOwnPropSymbols5(b2)) {
            if (__propIsEnum5.call(b2, prop))
              __defNormalProp5(a2, prop, b2[prop]);
          }
        return a2;
      };
      __spreadProps4 = (a2, b2) => __defProps4(a2, __getOwnPropDescs4(b2));
      __objRest3 = (source, exclude) => {
        var target = {};
        for (var prop in source)
          if (__hasOwnProp5.call(source, prop) && exclude.indexOf(prop) < 0)
            target[prop] = source[prop];
        if (source != null && __getOwnPropSymbols5)
          for (var prop of __getOwnPropSymbols5(source)) {
            if (exclude.indexOf(prop) < 0 && __propIsEnum5.call(source, prop))
              target[prop] = source[prop];
          }
        return target;
      };
      __decoratorStart5 = (base) => {
        var _a5;
        return [, , , __create5((_a5 = void 0) != null ? _a5 : null)];
      };
      __decoratorStrings5 = ["class", "method", "getter", "setter", "accessor", "field", "value", "get", "set"];
      __expectFn5 = (fn2) => fn2 !== void 0 && typeof fn2 !== "function" ? __typeError6("Function expected") : fn2;
      __decoratorContext5 = (kind, name, done, metadata, fns) => ({ kind: __decoratorStrings5[kind], name, metadata, addInitializer: (fn2) => done._ ? __typeError6("Already initialized") : fns.push(__expectFn5(fn2 || null)) });
      __decoratorMetadata5 = (array, target) => __defNormalProp5(target, __knownSymbol5("metadata"), array[3]);
      __runInitializers5 = (array, flags, self, value) => {
        for (var i2 = 0, fns = array[flags >> 1], n2 = fns && fns.length; i2 < n2; i2++) flags & 1 ? fns[i2].call(self) : value = fns[i2].call(self, value);
        return value;
      };
      __decorateElement5 = (array, flags, name, decorators, target, extra) => {
        var fn2, it, done, ctx, access, k = flags & 7, s2 = false, p2 = false;
        var j3 = array.length + 1, key = __decoratorStrings5[k + 5];
        var initializers = array[j3 - 1] = [], extraInitializers = array[j3] || (array[j3] = []);
        var desc = (target = target.prototype, __getOwnPropDesc5({ get [name]() {
          return __privateGet6(this, extra);
        }, set [name](x2) {
          return __privateSet6(this, extra, x2);
        } }, name));
        for (var i2 = decorators.length - 1; i2 >= 0; i2--) {
          ctx = __decoratorContext5(k, name, done = {}, array[3], extraInitializers);
          {
            ctx.static = s2, ctx.private = p2, access = ctx.access = { has: (x2) => name in x2 };
            access.get = (x2) => x2[name];
            access.set = (x2, y2) => x2[name] = y2;
          }
          it = (0, decorators[i2])({ get: desc.get, set: desc.set }, ctx), done._ = 1;
          if (it === void 0) __expectFn5(it) && (desc[key] = it);
          else if (typeof it !== "object" || it === null) __typeError6("Object expected");
          else __expectFn5(fn2 = it.get) && (desc.get = fn2), __expectFn5(fn2 = it.set) && (desc.set = fn2), __expectFn5(fn2 = it.init) && initializers.unshift(fn2);
        }
        return desc && __defProp5(target, name, desc), target;
      };
      __accessCheck6 = (obj, member, msg) => member.has(obj) || __typeError6("Cannot " + msg);
      __privateGet6 = (obj, member, getter) => (__accessCheck6(obj, member, "read from private field"), member.get(obj));
      __privateAdd6 = (obj, member, value) => member.has(obj) ? __typeError6("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
      __privateSet6 = (obj, member, value, setter) => (__accessCheck6(obj, member, "write to private field"), member.set(obj, value), value);
      TOLERANCE = 10;
      SortableKeyboardPlugin = class extends Plugin {
        constructor(manager) {
          super(manager);
          const cleanupEffect = x(() => {
            const { dragOperation } = manager;
            if (!isKeyboardEvent(dragOperation.activatorEvent)) {
              return;
            }
            if (!isSortable(dragOperation.source)) {
              return;
            }
            if (dragOperation.status.initialized) {
              const scroller = manager.registry.plugins.get(Scroller);
              if (scroller) {
                scroller.disable();
                return () => scroller.enable();
              }
            }
          });
          const unsubscribe = manager.monitor.addEventListener(
            "dragmove",
            (event, manager2) => {
              queueMicrotask(() => {
                if (this.disabled || event.defaultPrevented || !event.nativeEvent) {
                  return;
                }
                const { dragOperation } = manager2;
                if (!isKeyboardEvent(event.nativeEvent)) {
                  return;
                }
                if (!isSortable(dragOperation.source)) {
                  return;
                }
                if (!dragOperation.shape) {
                  return;
                }
                const { actions, collisionObserver, registry } = manager2;
                const { by } = event;
                if (!by) {
                  return;
                }
                const direction = getDirection2(by);
                const { source, target } = dragOperation;
                const { center } = dragOperation.shape.current;
                const potentialTargets = [];
                const cleanup = [];
                r(() => {
                  for (const droppable of registry.droppables) {
                    const { id: id22 } = droppable;
                    if (!droppable.accepts(source) || id22 === (target == null ? void 0 : target.id) && isSortable(droppable) || !droppable.element) {
                      continue;
                    }
                    let previousShape = droppable.shape;
                    const shape = new DOMRectangle(droppable.element, {
                      getBoundingClientRect: (element) => getVisibleBoundingRectangle(element, void 0, 0.2)
                    });
                    if (!shape.height || !shape.width) continue;
                    if (direction == "down" && center.y + TOLERANCE < shape.center.y || direction == "up" && center.y - TOLERANCE > shape.center.y || direction == "left" && center.x - TOLERANCE > shape.center.x || direction == "right" && center.x + TOLERANCE < shape.center.x) {
                      potentialTargets.push(droppable);
                      droppable.shape = shape;
                      cleanup.push(() => droppable.shape = previousShape);
                    }
                  }
                });
                event.preventDefault();
                collisionObserver.disable();
                const collisions = collisionObserver.computeCollisions(
                  potentialTargets,
                  closestCorners
                );
                r(() => cleanup.forEach((clean) => clean()));
                const [firstCollision] = collisions;
                if (!firstCollision) {
                  return;
                }
                const { id: id2 } = firstCollision;
                const { index, group } = source.sortable;
                actions.setDropTarget(id2).then(() => {
                  const { source: source2, target: target2, shape } = dragOperation;
                  if (!source2 || !isSortable(source2) || !shape) {
                    return;
                  }
                  const {
                    index: newIndex,
                    group: newGroup,
                    target: targetElement
                  } = source2.sortable;
                  const updated = index !== newIndex || group !== newGroup;
                  const element = updated ? targetElement : target2 == null ? void 0 : target2.element;
                  if (!element) return;
                  scrollIntoViewIfNeeded(element);
                  const updatedShape = new DOMRectangle(element);
                  if (!updatedShape) {
                    return;
                  }
                  const delta = Rectangle.delta(
                    updatedShape,
                    Rectangle.from(shape.current.boundingRectangle),
                    source2.alignment
                  );
                  actions.move({
                    by: delta
                  });
                  if (updated) {
                    actions.setDropTarget(source2.id).then(() => collisionObserver.enable());
                  } else {
                    collisionObserver.enable();
                  }
                });
              });
            }
          );
          this.destroy = () => {
            unsubscribe();
            cleanupEffect();
          };
        }
      };
      __defProp22 = Object.defineProperty;
      __defProps22 = Object.defineProperties;
      __getOwnPropDescs22 = Object.getOwnPropertyDescriptors;
      __getOwnPropSymbols22 = Object.getOwnPropertySymbols;
      __hasOwnProp22 = Object.prototype.hasOwnProperty;
      __propIsEnum22 = Object.prototype.propertyIsEnumerable;
      __defNormalProp22 = (obj, key, value) => key in obj ? __defProp22(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
      __spreadValues22 = (a2, b2) => {
        for (var prop in b2 || (b2 = {}))
          if (__hasOwnProp22.call(b2, prop))
            __defNormalProp22(a2, prop, b2[prop]);
        if (__getOwnPropSymbols22)
          for (var prop of __getOwnPropSymbols22(b2)) {
            if (__propIsEnum22.call(b2, prop))
              __defNormalProp22(a2, prop, b2[prop]);
          }
        return a2;
      };
      __spreadProps22 = (a2, b2) => __defProps22(a2, __getOwnPropDescs22(b2));
      defaultGroup = "__default__";
      OptimisticSortingPlugin = class extends Plugin {
        constructor(manager) {
          super(manager);
          const getSortableInstances = () => {
            const sortableInstances = /* @__PURE__ */ new Map();
            for (const droppable of manager.registry.droppables) {
              if (droppable instanceof SortableDroppable) {
                const { sortable } = droppable;
                const { group } = sortable;
                let instances = sortableInstances.get(group);
                if (!instances) {
                  instances = /* @__PURE__ */ new Set();
                  sortableInstances.set(group, instances);
                }
                instances.add(sortable);
              }
            }
            return sortableInstances;
          };
          const unsubscribe = [
            manager.monitor.addEventListener("dragover", (event, manager2) => {
              if (this.disabled) {
                return;
              }
              const { dragOperation } = manager2;
              const { source, target } = dragOperation;
              if (!isSortable(source) || !isSortable(target)) {
                return;
              }
              if (source.sortable === target.sortable) {
                return;
              }
              const instances = getSortableInstances();
              const sortableIndices = getSortableIndices(instances);
              const sameGroup = source.sortable.group === target.sortable.group;
              const sourceInstances = instances.get(source.sortable.group);
              const targetInstances = sameGroup ? sourceInstances : instances.get(target.sortable.group);
              if (!sourceInstances || !targetInstances) return;
              queueMicrotask(() => {
                if (event.defaultPrevented) return;
                manager2.renderer.rendering.then(() => {
                  var _a5, _b3;
                  const newInstances = getSortableInstances();
                  if (hasChanged(sortableIndices, instances, newInstances)) {
                    return;
                  }
                  const sourceElement = source.sortable.element;
                  const targetElement = target.sortable.element;
                  if (!targetElement || !sourceElement) {
                    return;
                  }
                  if (!sameGroup && target.id === source.sortable.group) {
                    return;
                  }
                  const orderedSourceSortables = sort(sourceInstances);
                  const orderedTargetSortables = sameGroup ? orderedSourceSortables : sort(targetInstances);
                  const sourceGroup = (_a5 = source.sortable.group) != null ? _a5 : defaultGroup;
                  const targetGroup = (_b3 = target.sortable.group) != null ? _b3 : defaultGroup;
                  const state = {
                    [sourceGroup]: orderedSourceSortables,
                    [targetGroup]: orderedTargetSortables
                  };
                  const newState = move(state, event);
                  if (state === newState) return;
                  const sourceIndex = newState[targetGroup].indexOf(source.sortable);
                  const targetIndex = newState[targetGroup].indexOf(target.sortable);
                  manager2.collisionObserver.disable();
                  reorder(sourceElement, sourceIndex, targetElement, targetIndex);
                  r(() => {
                    for (const [index, sortable] of newState[sourceGroup].entries()) {
                      sortable.index = index;
                    }
                    if (!sameGroup) {
                      for (const [index, sortable] of newState[targetGroup].entries()) {
                        sortable.group = target.sortable.group;
                        sortable.index = index;
                      }
                    }
                  });
                  manager2.actions.setDropTarget(source.id).then(() => manager2.collisionObserver.enable());
                });
              });
            }),
            manager.monitor.addEventListener("dragend", (event, manager2) => {
              if (!event.canceled) {
                return;
              }
              const { dragOperation } = manager2;
              const { source } = dragOperation;
              if (!isSortable(source)) {
                return;
              }
              if (source.sortable.initialIndex === source.sortable.index && source.sortable.initialGroup === source.sortable.group) {
                return;
              }
              queueMicrotask(() => {
                const instances = getSortableInstances();
                const sortableIndices = getSortableIndices(instances);
                const initialGroupInstances = instances.get(
                  source.sortable.initialGroup
                );
                if (!initialGroupInstances) return;
                manager2.renderer.rendering.then(() => {
                  const newInstances = getSortableInstances();
                  if (hasChanged(sortableIndices, instances, newInstances)) {
                    return;
                  }
                  const currentSortables = sort(initialGroupInstances);
                  const initialSortables = sort(
                    initialGroupInstances,
                    sortByInitialIndex
                  );
                  const sourceElement = source.sortable.element;
                  const initialPosition = initialSortables.indexOf(source.sortable);
                  const target = currentSortables[initialPosition];
                  const targetElement = target == null ? void 0 : target.element;
                  if (!target || !targetElement || !sourceElement) {
                    return;
                  }
                  reorder(sourceElement, target.index, targetElement, source.index);
                  r(() => {
                    for (const sortableInstances of instances.values()) {
                      const entries = Array.from(sortableInstances).values();
                      for (const sortable of entries) {
                        sortable.index = sortable.initialIndex;
                        sortable.group = sortable.initialGroup;
                      }
                    }
                  });
                });
              });
            })
          ];
          this.destroy = () => {
            for (const unsubscribeListener of unsubscribe) {
              unsubscribeListener();
            }
          };
        }
      };
      defaultPlugins = [
        SortableKeyboardPlugin,
        OptimisticSortingPlugin
      ];
      defaultSortableTransition = {
        duration: 250,
        easing: "cubic-bezier(0.25, 1, 0.5, 1)",
        idle: false
      };
      store = new WeakStore();
      _index_dec = [reactive], _group_dec = [reactive];
      Sortable2 = class {
        constructor(_a5, manager) {
          __privateAdd6(this, _index, __runInitializers5(_init8, 8, this)), __runInitializers5(_init8, 11, this);
          __privateAdd6(this, _previousGroup);
          __privateAdd6(this, _previousIndex);
          __privateAdd6(this, _group, __runInitializers5(_init8, 12, this)), __runInitializers5(_init8, 15, this);
          __privateAdd6(this, _element3);
          this.register = () => {
            r(() => {
              var _a6, _b4;
              (_a6 = this.manager) == null ? void 0 : _a6.registry.register(this.droppable);
              (_b4 = this.manager) == null ? void 0 : _b4.registry.register(this.draggable);
            });
            return () => this.unregister();
          };
          this.unregister = () => {
            r(() => {
              var _a6, _b4;
              (_a6 = this.manager) == null ? void 0 : _a6.registry.unregister(this.droppable);
              (_b4 = this.manager) == null ? void 0 : _b4.registry.unregister(this.draggable);
            });
          };
          this.destroy = () => {
            r(() => {
              this.droppable.destroy();
              this.draggable.destroy();
            });
          };
          var _b3 = _a5, {
            effects: inputEffects = () => [],
            disabled,
            group,
            index,
            sensors,
            type,
            transition = defaultSortableTransition,
            plugins: pluginsInput
          } = _b3, input = __objRest3(_b3, [
            "effects",
            "disabled",
            "group",
            "index",
            "sensors",
            "type",
            "transition",
            "plugins"
          ]);
          const plugins = resolveCustomizable(pluginsInput, defaultPlugins);
          const disabledState = normalizeDisabled(disabled);
          this.droppable = new SortableDroppable(
            __spreadProps4(__spreadValues5({}, input), { disabled: disabledState.droppable }),
            manager,
            this
          );
          this.draggable = new SortableDraggable(
            __spreadProps4(__spreadValues5({}, input), {
              disabled: disabledState.draggable,
              plugins,
              effects: () => [
                () => {
                  var _a23, _b22, _c5;
                  const status = (_a23 = this.manager) == null ? void 0 : _a23.dragOperation.status;
                  if ((status == null ? void 0 : status.initializationPending) && this.id === ((_c5 = (_b22 = this.manager) == null ? void 0 : _b22.dragOperation.source) == null ? void 0 : _c5.id)) {
                    store.clear(this.manager);
                  }
                  if (status == null ? void 0 : status.dragging) {
                    store.set(
                      this.manager,
                      this.id,
                      f(() => ({
                        initialIndex: this.index,
                        initialGroup: this.group
                      }))
                    );
                  }
                },
                () => {
                  const { index: index2, group: group2, manager: _2 } = this;
                  const previousIndex = __privateGet6(this, _previousIndex);
                  const previousGroup = __privateGet6(this, _previousGroup);
                  if (index2 !== previousIndex || group2 !== previousGroup) {
                    __privateSet6(this, _previousIndex, index2);
                    __privateSet6(this, _previousGroup, group2);
                    this.animate();
                  }
                },
                () => {
                  var _a23, _b22;
                  const { target } = this;
                  const { isDragSource } = this.draggable;
                  const feedback = (_b22 = (_a23 = this.draggable.pluginConfig(Feedback)) == null ? void 0 : _a23.feedback) != null ? _b22 : "default";
                  if (feedback === "move" && isDragSource) {
                    this.droppable.disabled = !target;
                  }
                },
                ...inputEffects()
              ],
              type,
              sensors
            }),
            manager,
            this
          );
          __privateSet6(this, _element3, input.element);
          this.manager = manager;
          this.index = index;
          __privateSet6(this, _previousIndex, index);
          this.group = group;
          __privateSet6(this, _previousGroup, group);
          this.type = type;
          this.transition = transition;
        }
        get initialIndex() {
          var _a5, _b3;
          return (_b3 = (_a5 = store.get(this.manager, this.id)) == null ? void 0 : _a5.initialIndex) != null ? _b3 : this.index;
        }
        get initialGroup() {
          var _a5, _b3;
          return (_b3 = (_a5 = store.get(this.manager, this.id)) == null ? void 0 : _a5.initialGroup) != null ? _b3 : this.group;
        }
        animate() {
          f(() => {
            const { manager, transition } = this;
            const { shape } = this.droppable;
            if (!manager) return;
            const { idle } = manager.dragOperation.status;
            if (!shape || !transition || idle && !transition.idle) {
              return;
            }
            manager.renderer.rendering.then(() => {
              const { element } = this;
              if (!element) {
                return;
              }
              for (const animation of element.getAnimations()) {
                if ("transitionProperty" in animation && (animation.transitionProperty === "transform" || animation.transitionProperty === "translate" || animation.transitionProperty === "scale")) {
                  animation.cancel();
                }
              }
              const updatedShape = this.refreshShape();
              if (!updatedShape) {
                return;
              }
              const delta = {
                x: shape.boundingRectangle.left - updatedShape.boundingRectangle.left,
                y: shape.boundingRectangle.top - updatedShape.boundingRectangle.top
              };
              const { translate } = getComputedStyles(element);
              const currentTranslate = computeTranslate(element, translate, false);
              const finalTranslate = computeTranslate(element, translate);
              if (delta.x || delta.y) {
                const resolvedTransition = prefersReducedMotion(getWindow(element)) ? __spreadProps4(__spreadValues5({}, transition), { duration: 0 }) : transition;
                animateTransform({
                  element,
                  keyframes: {
                    translate: [
                      `${currentTranslate.x + delta.x}px ${currentTranslate.y + delta.y}px ${currentTranslate.z}`,
                      `${finalTranslate.x}px ${finalTranslate.y}px ${finalTranslate.z}`
                    ]
                  },
                  options: resolvedTransition
                }).then(() => {
                  if (!manager.dragOperation.status.dragging) {
                    this.droppable.shape = void 0;
                  }
                });
              }
            });
          });
        }
        get manager() {
          return this.draggable.manager;
        }
        set manager(manager) {
          r(() => {
            this.draggable.manager = manager;
            this.droppable.manager = manager;
          });
        }
        set element(element) {
          r(() => {
            const previousElement = __privateGet6(this, _element3);
            const droppableElement = this.droppable.element;
            const draggableElement = this.draggable.element;
            if (!droppableElement || droppableElement === previousElement) {
              this.droppable.element = element;
            }
            if (!draggableElement || draggableElement === previousElement) {
              this.draggable.element = element;
            }
            __privateSet6(this, _element3, element);
          });
        }
        get element() {
          var _a5, _b3;
          const element = __privateGet6(this, _element3);
          if (!element) return;
          return (_b3 = (_a5 = ProxiedElements.get(element)) != null ? _a5 : element) != null ? _b3 : this.droppable.element;
        }
        set target(target) {
          this.droppable.element = target;
        }
        get target() {
          return this.droppable.element;
        }
        set source(source) {
          this.draggable.element = source;
        }
        get source() {
          return this.draggable.element;
        }
        get disabled() {
          const { disabled: draggable } = this.draggable;
          const { disabled: droppable } = this.droppable;
          return draggable === droppable ? draggable : { draggable, droppable };
        }
        set plugins(value) {
          this.draggable.plugins = resolveCustomizable(value, defaultPlugins);
        }
        set disabled(value) {
          const disabled = normalizeDisabled(value);
          r(() => {
            this.droppable.disabled = disabled.droppable;
            this.draggable.disabled = disabled.draggable;
          });
        }
        set data(data) {
          r(() => {
            this.droppable.data = data;
            this.draggable.data = data;
          });
        }
        set handle(handle) {
          this.draggable.handle = handle;
        }
        set id(id2) {
          this.droppable.id = id2;
          this.draggable.id = id2;
        }
        get id() {
          return this.droppable.id;
        }
        set sensors(value) {
          this.draggable.sensors = value;
        }
        set modifiers(value) {
          this.draggable.modifiers = value;
        }
        set collisionPriority(value) {
          this.droppable.collisionPriority = value;
        }
        set collisionDetector(value) {
          this.droppable.collisionDetector = value != null ? value : defaultCollisionDetection;
        }
        set alignment(value) {
          this.draggable.alignment = value;
        }
        get alignment() {
          return this.draggable.alignment;
        }
        set type(type) {
          r(() => {
            this.droppable.type = type;
            this.draggable.type = type;
          });
        }
        get type() {
          return this.draggable.type;
        }
        set accept(value) {
          this.droppable.accept = value;
        }
        get accept() {
          return this.droppable.accept;
        }
        get isDropTarget() {
          return this.droppable.isDropTarget;
        }
        /**
         * A boolean indicating whether the sortable item is the source of a drag operation.
         */
        get isDragSource() {
          return this.draggable.isDragSource;
        }
        /**
         * A boolean indicating whether the sortable item is being dragged.
         */
        get isDragging() {
          return this.draggable.isDragging;
        }
        /**
         * A boolean indicating whether the sortable item is being dropped.
         */
        get isDropping() {
          return this.draggable.isDropping;
        }
        get status() {
          return this.draggable.status;
        }
        refreshShape() {
          return this.droppable.refreshShape();
        }
        accepts(draggable) {
          return this.droppable.accepts(draggable);
        }
      };
      _init8 = __decoratorStart5();
      _index = /* @__PURE__ */ new WeakMap();
      _previousGroup = /* @__PURE__ */ new WeakMap();
      _previousIndex = /* @__PURE__ */ new WeakMap();
      _group = /* @__PURE__ */ new WeakMap();
      _element3 = /* @__PURE__ */ new WeakMap();
      __decorateElement5(_init8, 4, "index", _index_dec, Sortable2, _index);
      __decorateElement5(_init8, 4, "group", _group_dec, Sortable2, _group);
      __decoratorMetadata5(_init8, Sortable2);
      SortableDraggable = class extends Draggable2 {
        constructor(input, manager, sortable) {
          super(input, manager);
          this.sortable = sortable;
        }
        get index() {
          return this.sortable.index;
        }
        get initialIndex() {
          return this.sortable.initialIndex;
        }
        get group() {
          return this.sortable.group;
        }
        get initialGroup() {
          return this.sortable.initialGroup;
        }
      };
      SortableDroppable = class extends Droppable2 {
        constructor(input, manager, sortable) {
          super(input, manager);
          this.sortable = sortable;
        }
        get index() {
          return this.sortable.index;
        }
        get group() {
          return this.sortable.group;
        }
      };
    }
  });

  // assets/admin/js/builder/layer.js
  var require_layer = __commonJS({
    "assets/admin/js/builder/layer.js"() {
      init_snapdom();
      init_dom();
      init_sortable();
      var $drawerLayer = $("#drawer_layer");
      var $drawerLayerList = $("#drawer_layer_list");
      $("#drawer_layer_save").on("click", function(e2) {
        const sort_ids = [];
        $drawerLayerList.find("li").each(function() {
          sort_ids.push($(this).data("blockId"));
        });
        $.post("/admin/builder/page/save-blocks-sorted", { "page_id": appvar.page.id, "sort_ids": sort_ids }, function(res) {
          if (res.code === 0) {
            iframe.contentWindow.location.reload();
            sp.drawer($("#drawer_layer")[0]).hide();
          } else {
            alert(res.message);
          }
        });
      });
      $drawerLayer[0].addEventListener("sp-hidden", function() {
        $drawerLayerList.find("img").each(function() {
          URL.revokeObjectURL(this.src);
        });
        $drawerLayerList.empty();
      });
      $drawerLayer[0].addEventListener("sp-beforeshow", async function() {
        $drawerLayerList.html('<div class="text-center mt-10"><span class="shimmer text-sm text-muted-foreground">\u52A0\u8F7D\u4E2D...</span></div>');
        const results = await capturePageBlocks();
        const items = results.map(({ block_id, blob }) => ({
          block_id,
          url: URL.createObjectURL(blob)
        }));
        $drawerLayerList.html(renderList(items));
      });
      function renderList(items) {
        const $template = $('<ul class="flex flex-col gap-4"></ul>');
        const ddManager = new DragDropManager2();
        function updateButtons() {
          const $list = $template.children("li");
          const lastIndex = $list.length - 1;
          $list.each(function(index) {
            $(this).find('[name="up"]').prop("disabled", index === 0);
            $(this).find('[name="down"]').prop("disabled", index === lastIndex);
          });
        }
        $template.on("click", 'button[name="up"]', function() {
          const $item = $(this).closest("li");
          $item.prev("li").before($item);
          updateButtons();
        });
        $template.on("click", 'button[name="down"]', function() {
          const $item = $(this).closest("li");
          $item.next("li").after($item);
          updateButtons();
        });
        items.forEach(({ block_id, url }, index) => {
          const $item = $(`
            <li class="flex items-center gap-5 border rounded-md p-2 bg-white">
                <div class="grow">
                    <img src="" alt="" class="size-full object-cover object-top max-h-15 hover:cursor-move">
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
                </div>
            </li>
        `);
          $item.find("img").attr("src", url);
          $item.attr({
            "data-index": index,
            "data-block-id": block_id
          });
          new Sortable2({
            id: `item-${index}`,
            index,
            element: $item[0]
          }, ddManager);
          ddManager.monitor.addEventListener("dragend", (event) => {
            updateButtons();
          });
          $template.append($item);
        });
        updateButtons();
        return $template;
      }
      async function capturePageBlocks() {
        const elements = $("#iframe").contents().find("body").children(":not(script, style, link)").get();
        const results = [];
        for (const [index, element] of elements.entries()) {
          const blob = await captureTrim(element);
          if (blob) {
            results.push({ block_id: element.dataset.blockId, blob });
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
        for (let i2 = 3; i2 < data.length; i2 += 4) {
          if (data[i2] === 0) continue;
          const pixel = i2 >> 2;
          const x2 = pixel % width;
          const y2 = pixel / width | 0;
          minX = Math.min(minX, x2);
          minY = Math.min(minY, y2);
          maxX = Math.max(maxX, x2);
          maxY = Math.max(maxY, y2);
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
  require_layer();
})();
