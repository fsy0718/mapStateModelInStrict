const _mapStateModelValueInStrict = function (modelValue, stateName,type, getFn) {
  return  {
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
export default function mapStateModelValueInStrict () {
  let isMul = arguments.length
  let getFn = isMul > 2 ? arguments[3] : arguments[2]
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