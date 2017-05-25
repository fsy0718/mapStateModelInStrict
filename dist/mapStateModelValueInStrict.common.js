/**
 * vuex-mapstate-modelvalue-instrict- v0.0.4
 * (c) 2017 fsy0718
 * @license MIT
 */
'use strict';

var push = Array.prototype.push;
var pop = Array.prototype.pop;
var _mapStateModelValueInStrict = function (modelValue, stateName, type, opts, setWithPayload, copts) {
  if ( opts === void 0 ) opts = {};
  if ( copts === void 0 ) copts = {};

  if (process.env.NODE_ENV === 'development' && (!modelValue || !stateName || !type)) {
    throw new Error(("vuex-mapstate-modelvalue-instrict: the " + modelValue + " at least 3 parameters are required"))
  }
  var getFn = opts.getFn || copts.getFn;
  var modulePath = opts.modulePath || copts.modulePath;
  return {
    get: function get () {
      if (getFn) {
        return getFn(this.$store.state, modelValue, stateName, modulePath)
      }
      if (modulePath) {
        var paths = modulePath.split('/') || [];
        var result;
        try {
          result = paths.reduce(function (r, c) {
            return r[c]
          }, this.$store.state);
          result = result[stateName];
        } catch (e) {
          if (process.env.NODE_ENV === 'development') {
            throw e
          }
          result = undefined;
        }
        return result
      }
      return this.$store.state[stateName]
    },
    set: function set (value) {
      var mutation = setWithPayload ? ( obj = {}, obj[stateName] = value, obj ) : value;
      var obj;
      var _type = modulePath ? (modulePath + "/" + type) : type;
      this.$store.commit(_type, mutation, modulePath ? opts.param || copts.param : undefined);
    }
  }
};

var _mapStateModelValuesInStrict = function () {
  var args = arguments;
  var setWithPayload = pop.call(args);
  var result = {};
  if (Array.isArray(args[0])) {
    var opts = args[1];
    args[0].forEach(function (item) {
      result[item[0]] = _mapStateModelValueInStrict(item[0], item[1], item[2], item[3], setWithPayload, opts);
    });
  } else {
    result[args[0]] = _mapStateModelValueInStrict(args[0], args[1], args[2], args[3], setWithPayload);
  }
  return result
};
// mapStateModelValuesInStrict(modelValue, stateName, type, {getFn, setWithPayload, modulePath}})
// mapStateModelValuesInStrict([[modelValue, stateName, type, {getFn1}], [modelValue, stateName, type]], {getFn, setWithPayload})
var mapStateModelValuesInStrictWithPayload = function () {
  var args = arguments;
  push.call(arguments, true);
  return _mapStateModelValuesInStrict.apply(null, args)
};
var mapStateModelValuesInStrict = function () {
  var args = arguments;
  push.call(arguments, false);
  return _mapStateModelValuesInStrict.apply(null, args)
};

var index = {
  mapStateModelValuesInStrict: mapStateModelValuesInStrict,
  mapStateModelValuesInStrictWithPayload: mapStateModelValuesInStrictWithPayload,
  version: '0.0.4'
};

module.exports = index;
