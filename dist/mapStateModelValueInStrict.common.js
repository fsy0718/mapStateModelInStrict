/**
 * vuex-mapstate-modelvalue-instrict- v0.0.2
 * (c) 2017 fsy0718
 * @license MIT
 */
'use strict';

var _mapStateModelValueInStrict = function (modelValue, stateName, type, getFn) {
  if (process.env.NODE_ENV === 'development' && (!modelValue || !stateName || !type)) {
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
      this.$store.commit(type, value);
    }
  }
};
// mapStateModelValueInStrict(modelValue, stateName, type, getFn)
// mapStateModelValueInStrict([[modelValue, stateName, type, getFn1], [modelValue, stateName, type]], getFn)
var mapStateModelValueInStrict = function () {
  var isMul = arguments.length < 3;
  var getFn = isMul ? arguments[2] : arguments[3];
  var result = {};
  if (isMul) {
    arguments[0].forEach(function (item) {
      result[item[0]] = _mapStateModelValueInStrict(item[0], item[1], item[2], item[3] || getFn);
    });
  } else {
    result[arguments[0]] = _mapStateModelValueInStrict(arguments[0], arguments[1], arguments[2], getFn);
  }
  return result
};

var index = {
  mapStateModelValueInStrict: mapStateModelValueInStrict,
  version: '0.0.2'
};

module.exports = index;
