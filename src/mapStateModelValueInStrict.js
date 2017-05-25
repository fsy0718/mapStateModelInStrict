const _mapStateModelValueInStrict = function (modelValue, stateName, type, getFn) {
  if (process.env.NODE_ENV === 'development' && (!modelValue || !stateName || !type)) {
    throw new Error(`vuex-mapstate-modelvalue-instrict: the ${modelValue} at least 3 parameters are required`)
  }
  return {
    get () {
      if (getFn) {
        return getFn(this.$store.state, modelValue, stateName)
      }
      return this.$store.state[stateName]
    },
    set (value) {
      this.$store.commit(type, value)
    }
  }
}
// mapStateModelValueInStrict(modelValue, stateName, type, getFn)
// mapStateModelValueInStrict([[modelValue, stateName, type, getFn1], [modelValue, stateName, type]], getFn)
const mapStateModelValueInStrict = function () {
  let isMul = arguments.length < 3
  let getFn = isMul ? arguments[2] : arguments[3]
  let result = {}
  if (isMul) {
    arguments[0].forEach(function (item) {
      result[item[0]] = _mapStateModelValueInStrict(item[0], item[1], item[2], item[3] || getFn)
    })
  } else {
    result[arguments[0]] = _mapStateModelValueInStrict(arguments[0], arguments[1], arguments[2], getFn)
  }
  return result
}

export { mapStateModelValueInStrict }