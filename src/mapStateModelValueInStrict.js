const push = Array.prototype.push
const pop = Array.prototype.pop
const _mapStateModelValueInStrict = function (modelValue, stateName, type, opts = {}, setWithPayload, copts = {}) {
  if (process.env.NODE_ENV === 'development' && (!modelValue || !stateName || !type)) {
    throw new Error(`vuex-mapstate-modelvalue-instrict: the ${modelValue} at least 3 parameters are required`)
  }
  let getFn = opts.getFn || copts.getFn
  let modulePath = opts.modulePath || copts.modulePath
  return {
    get () {
      if (getFn) {
        return getFn(this.$store.state, modelValue, stateName, modulePath)
      }
      if (modulePath) {
        let paths = modulePath.split('/') || []
        let result
        try {
          result = paths.reduce(function (r, c) {
            return r[c]
          }, this.$store.state)
          result = result[stateName]
        } catch (e) {
          if (process.env.NODE_ENV === 'development') {
            throw e
          }
          result = undefined
        }
        return result
      }
      return this.$store.state[stateName]
    },
    set (value) {
      let mutation = setWithPayload ? { [stateName]: value } : value
      let _type = modulePath ? `${modulePath}/${type}` : type
      this.$store.commit(_type, mutation, modulePath ? opts.param || copts.param : undefined)
    }
  }
}

const _mapStateModelValuesInStrict = function () {
  let args = arguments
  let setWithPayload = pop.call(args)
  let result = {}
  if (Array.isArray(args[0])) {
    let opts = args[1]
    args[0].forEach(function (item) {
      result[item[0]] = _mapStateModelValueInStrict(item[0], item[1], item[2], item[3], setWithPayload, opts)
    })
  } else {
    result[args[0]] = _mapStateModelValueInStrict(args[0], args[1], args[2], args[3], setWithPayload)
  }
  return result
}
// mapStateModelValuesInStrict(modelValue, stateName, type, {getFn, setWithPayload, modulePath}})
// mapStateModelValuesInStrict([[modelValue, stateName, type, {getFn1}], [modelValue, stateName, type]], {getFn, setWithPayload})
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
