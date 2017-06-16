/*jslint indent: 2, maxlen: 80, continue: false, unparam: false, node: true */
/* -*- tab-width: 2 -*- */
'use strict';

module.exports = (function () {
  function ifFun(x, d) { return ((typeof x) === 'function' ? x : d); }

  var EX = function translateObjectKeys(dict, src, dest) {
    if (!dest) { dest = {}; }
    if (!dict) { return Object.assign(dest, src); }
    dict = EX.ensureDictFunc(dict);
    Object.keys(src).forEach(function (k) {
      var v = src[k], n = dict(k, v);
      if ((n && typeof n) === 'object') {
        if (n.length > 1) { v = n[1]; }
        n = n[0];
      }
      if (n === false) { return; }
      if ((n === null) || (n === undefined)) { n = k; }
      dest[n] = v;
    });
    return dest;
  };


  EX.ensureDictFunc = function (dict) {
    if (ifFun(dict)) { return dict; }
    if (typeof dict === 'string') {
      if (ifFun(EX[dict])) { return EX[dict]; }
      throw new Error('Unknown translator function name: ' + dict);
    }
    return function (k) { return dict[k]; };
  };


  EX.uc = function (s) { return s.toUpperCase(); };
  EX.lc = function (s) { return s.toLowerCase(); };
  EX.swap = function (k, v) { return [v, k]; };


  EX.dash2camel = function (s) {
    return s.replace(/-([A-Za-z])/g,
      function (m, x) { return x.toUpperCase() || m; });
  };







  return EX;
}());
