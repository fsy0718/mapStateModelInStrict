const push = Array.prototype.push
const pop = Array.prototype.pop
const _mapStateModelValueInStrict = function (modelValue, stateName, type, getFn, setWithPayload) {
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
      if (setWithPayload) {
        this.$store.commit(type, {
          [stateName]: value
        })
      } else {
        this.$store.commit(type, value)
      }
    }
  }
}
// mapStateModelValueInStrict(modelValue, stateName, type, getFn)
// mapStateModelValueInStrict([[modelValue, stateName, type, getFn1], [modelValue, stateName, type]], getFn)
const _mapStateModelValuesInStrict = function () {
  let args = arguments
  let setWithPayload = pop.call(args)
  let isMul = args.length < 3
  let getFn = isMul ? args[2] : args[3]
  let result = {}
  if (isMul) {
    args[0].forEach(function (item) {
      result[item[0]] = _mapStateModelValueInStrict(item[0], item[1], item[2], item[3] || getFn, setWithPayload)
    })
  } else {
    result[args[0]] = _mapStateModelValueInStrict(args[0], args[1], args[2], getFn, setWithPayload)
  }
  return result
}
const mapStateModelValuesInStrictWithPayload = function () {
  let args = arguments
  push.call(arguments, true)
  return _mapStateModelValuesInStrict.apply(null, args)
}
const mapStateModelValuesInStrict = function () {
  let args = arguments
  push.call(arguments, false)
  return _mapStateModelValuesInStrict.apply(null, args)
}

export { mapStateModelValuesInStrict, mapStateModelValuesInStrictWithPayload }
