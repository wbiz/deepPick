# deepPick
pick object or array by given fields recusively

## Installation
```
npm install deepPick --save
```
or
```
bower install deepPick --save
```

## Usage

```
var deepPick = require('deepPick');
var obj = deepPick(data, fields, options);
```

- data: object or array of objects
- fields: array of strings eg. ['a.b.c', 'd.e'] or 'a.b.c'
- options(optional): {keepPath: true, exclude: false}

Examples

```
deepPick({a:[{b:[{c:1}, {d:5}], d:{e:2}}], f:{g:[{h:3}], i:4}}, ['a.b.c', 'f.g.h']);
// -> {"a":[{"b":[{},{}]}],"f":{"g":[{"h":3}]}}

deepPick({a:[{b:[{c:1}, {d:5}], d:{e:2}}], f:{g:[{h:3}], i:4}},  ['a.b.c', 'f.g.h'],
  {keepPath: false});
// -> {"f":{"g":[{"h":3}]}}

deepPick({a:[{b:[{c:1}, {d:5}], d:{e:2}}], f:{g:[{h:3}], i:4}, j:{k:4, l:9}},  ['a.b.c', 'f.g.h', 'j.l'],
  {keepPath: false, exclude: true});
// -> {a:[{b:[{d:5}],d:{e:2}}],f:{i:4}, j:{k:4}}
```
