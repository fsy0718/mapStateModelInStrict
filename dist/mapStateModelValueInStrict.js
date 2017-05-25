/**
 * vuex-mapstate-modelvalue-instrict- v0.0.3
 * (c) 2017 fsy0718
 * @license MIT
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.MapStateModelValueInStrict = factory());
}(this, (function () { 'use strict';

var push = Array.prototype.push;
var pop = Array.prototype.pop;
var _mapStateModelValueInStrict = function (modelValue, stateName, type, getFn, setWithPayload) {
  if ("development" === 'development' && (!modelValue || !stateName || !type)) {
    throw new Error(("vuex-mapstate-modelvalue-instrict: the " + modelValue + " at least 3 parameters are required"))
  }
  return {
    get: function get () {
      if (getFn) {
        return getFn(this.$store.state, modelValue, stateName)
      }
      return this.$store.state[stateName]
    },
    set: function set (value) {
      if (setWithPayload) {
        this.$store.commit(type, ( obj = {}, obj[stateName] = value, obj ));
        var obj;
      } else {
        this.$store.commit(type, value);
      }
    }
  }
};
// mapStateModelValueInStrict(modelValue, stateName, type, getFn)
// mapStateModelValueInStrict([[modelValue, stateName, type, getFn1], [modelValue, stateName, type]], getFn)
var _mapStateModelValuesInStrict = function () {
  var args = arguments;
  var setWithPayload = pop.call(args);
  var isMul = args.length < 3;
  var getFn = isMul ? args[2] : args[3];
  var result = {};
  if (isMul) {
    args[0].forEach(function (item) {
      result[item[0]] = _mapStateModelValueInStrict(item[0], item[1], item[2], item[3] || getFn, setWithPayload);
    });
  } else {
    result[args[0]] = _mapStateModelValueInStrict(args[0], args[1], args[2], getFn, setWithPayload);
  }
  return result
};
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
  version: '0.0.3'
};

return index;

})));
