var _ = require('lodash');

var processObj = function(data, objectFields, propFields, options){
  var keepPath = (options && _.has(options, 'keepPath')) ? options.keepPath: true;
  var item = (propFields.length>0) ? _.pick(data, propFields) : {};
  if (objectFields.length > 0) {
    var map = {};
    _.forEach(objectFields, function (f) {
      var token = f.split('.');
      var obj = _.head(token);
      var prop = _.tail(token).join('.');
      if (map[obj]){
        map[obj].push(prop);
      }  else {
        map[obj] = [prop];
      }
    });
    _.forEach(map, function(prop, obj){
      if (_.isArray(data[obj]) || _.isObject(data[obj])){
        var returned = pickData(data[obj], prop, options);
        if (keepPath || !_.isEmpty(returned)){
          item[obj] = returned;
        }
      } else {
        item[obj] = data[obj]
      }
    });
  }
  return item;
};

var pickData = function(data, fields, options){
  var keepPath = (options && _.has(options, 'keepPath')) ? options.keepPath: true;
  fields = (_.isArray(fields)) ? fields : [fields];
  var objectFields = _.filter(fields, function(n){return n.indexOf('.') !== -1;});
  var propFields = _.difference(fields, objectFields);
  var result;
  if (_.isArray(data)) {
    result = [];
    _.forEach(data, function(d) {
      var returned = processObj(d, objectFields, propFields, options)

      if (keepPath || !_.isEmpty(returned)){
        result.push(returned);
      }
    });
  } else if (_.isObject(data)) {
    result = processObj(data, objectFields, propFields, options);
  } else {
    result = data;
  }

  return result;
};

module.exports = pickData;
