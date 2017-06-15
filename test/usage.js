/*jslint indent: 2, maxlen: 80, node: true */
/* -*- tab-width: 2 -*- */
'use strict';

var eq = require('equal-pmb');


(function readmeDemo(expectEqual) {
  //#u
  var tok = require('transkey'),    // tok = translate object keys
    obj = {
      Hello: 'World',
      '': 'empty',
      'main dish': 'pork & beans',
      'content-type': 'text/plain',
    };

  expectEqual(tok('uc', obj), {
    HELLO: 'World',
    '': 'empty',
    'MAIN DISH': 'pork & beans',
    'CONTENT-TYPE': 'text/plain',
  });

  expectEqual(tok('dash2camel', obj), {
    Hello: 'World',
    '': 'empty',
    'main dish': 'pork & beans',
    'contentType': 'text/plain',
  });

  expectEqual(tok('dash2camel', {
    'double--dash': 'd--d',
    '-': -1,
    '-f': 'force',
    'é-é': 'eacute',
    '--': -2,
  }), {
    'double-Dash': 'd--d',
    '-': -1,
    F: 'force',
    'é-é': 'eacute',
    '--': -2,
  });

  function strlen(s) { return s.length; }
  expectEqual(tok(strlen, obj), {
    '0': 'empty',
    '5': 'World',
    '9': 'pork & beans',
    '12': 'text/plain',
  });

  function ifOdd(n) { return ((+n % 2) ? n : false); }
  function oddLength(s) { return ifOdd(s.length); }
  expectEqual(tok(oddLength, obj), {
    '5': 'World',
    '9': 'pork & beans',
  });

  expectEqual(tok({
    '': 'nothing',
    'content-type': false,
    'main dish': [ null, 'spaghetti' ],
    Hello: [ 'How', 'are you?' ],
  }, obj), {
    How: 'are you?',
    'main dish': 'spaghetti',
    nothing: 'empty',
  });
  //#r
}(eq));









console.log("+OK usage test passed.");    //= "+OK usage test passed."
