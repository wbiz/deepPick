var expect = require('chai').expect;
var _ = require('lodash');
var deepPick = require('../index');

describe('deepPick', function () {

  it('should get fields from object', function (done) {
    var data = {a:{b:{c:1}, d:{e:2}}, f:{g:{h:3}, i:4}};
    var fields = ['a.d.e', 'f.i'];
    var results = {a:{d:{e:2}}, f:{i:4}};

    var obj = deepPick(data, fields);
    expect(obj).to.eql(results);
    done();
  });

  it('should get {}  if not found', function (done) {
    var data = {a:{b:{c:1}, d:{e:2}}, f:{g:{h:3}, i:4}};
    var fields = ['a.d.f', 'f.i'];
    var results = {a:{d:{}}, f:{i:4}};

    var obj = deepPick(data, fields);
    expect(obj).to.eql(results);
    done();
  });

  it('should get arrays from array', function (done) {
    var data = {a:[{b:[{c:1}], d:{e:2}}], f:{g:[{h:3}], i:4}};
    var fields = ['a.b.c', 'f.g.h'];
    var results = {a:[{b:[{c: 1}]}], f:{g:[{h: 3}]}};

    var obj = deepPick(data, fields);
    expect(obj).to.eql(results);
    done();
  });

  it('should get [{}] from array if not found', function (done) {
    var data = {a:[{b:[{c:1}, {d:5}], d:{e:2}}], f:{g:[{h:3}], i:4}};
    var fields = ['a.b.dd', 'f.g.f'];
    var results = {a:[{b:[{},{}]}], f:{g:[{}]}};

    var obj = deepPick(data, fields);
    expect(obj).to.eql(results);
    done();
  });

  it('should get empty if keepPath false', function (done) {
    var data = {a:[{b:[{c:1}, {d:5}], d:{e:2}}], f:{g:[{h:3}], i:4}};
    var fields = ['a.b.dd', 'f.g.f'];
    var results = {};

    var obj = deepPick(data, fields, {keepPath: false});
    expect(obj).to.eql(results);
    done();
  });

  it('should allow string fields', function (done) {
    var data = {a:[{b:[{c:1}, {d:5}], d:{e:2}}], f:{g:[{h:3}], i:4}};
    var fields = 'a.b.c';
    var results = {a:[{b:[{c:1}]}]};

    var obj = deepPick(data, fields, {keepPath: false});
    expect(obj).to.eql(results);
    done();
  });

  it('should get from array of object', function (done) {
    var data = [{a:[{b:[{c:1}, {d:5}], d:{e:2}}], f:{g:[{h:3}], i:4}},
    {a:[{b:[{c:11}, {d:15}], d:{e:12}}], f:{g:[{h:13}], i:14}}
    ];
    var fields = ['a.b.c', 'f.g'];
    var results = [{a:[{b:[{c:1}]}], f: {g:[{h:3}]}}, 
    {a:[{b:[{c:11}]}], f: {g:[{h:13}]}}];

    var obj = deepPick(data, fields, {keepPath: false});
    expect(obj).to.eql(results);
    done();
  });

  it('compound test', function (done) {
    var data = {a:[{b:[{c:1}, {d:5}], d:{e:2}}], f:{g:[{h:3}], i:4}};
    var fields = ['a.b.dd', 'f.g.f'];
    var results = {};

    var obj = deepPick(data, fields, {keepPath: false});
    expect(obj).to.eql(results);
    
    fields = ['a.b.d', 'f.g.f'];
    results = {a:[{b:[{},{d:5}]}], f:{g:[{}]}}
    obj = deepPick(data, fields);
    expect(obj).to.eql(results);

    results = {a:[{b:[{d:5}]}]}
    var obj = deepPick(data, fields, {keepPath: false});
    expect(obj).to.eql(results);
    done();
  });

});
