
<!--#echo json="package.json" key="name" underline="=" -->
transkey
========
<!--/#echo -->

<!--#echo json="package.json" key="description" -->
Object -&gt; Object with keys translated by translator function or dictionary
object.
<!--/#echo -->


API
---

### transkey(dict, src[, dest])

Copy values from `src` to `dest`, to keys translated by `dict`.
If `dest` is false-y (e.g. because missing), a new object is created.

`dict` should be either…
* a function that returns the translation of its first argument
* an object that maps old keys to new keys
* `"dash2camel"`: `foo-bar` -> `fooBar`
* `"lc"`: lowercase
* `"uc"`: UPPERCASE

Some translations have special effects:
* `null`, `undefined`: Use the original key name.
* `false`: Omit that key.






Usage
-----

from [test/usage.js](test/usage.js):

<!--#include file="test/usage.js" start="  //#u" stop="  //#r"
  outdent="  " code="javascript" -->
<!--#verbatim lncnt="63" -->
```javascript
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
```
<!--/include-->



<!--#toc stop="scan" -->



Known issues
------------

* needs more/better tests and docs




&nbsp;


License
-------
<!--#echo json="package.json" key=".license" -->
ISC
<!--/#echo -->
