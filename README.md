## desc
A public method used to two-way computed property

## api
  - `mapStateModelValuesInStrict` will commit a mutation with value
  - `mapStateModelValuesInStrictWithPayload` will commit a mutation with payload

## example
```js

import { mapStateModelValuesInStrict, mapStateModelValuesInStrictWithPayload } from 'vuex-mapstate-modelvalue-instrict'

// single, you can pass a get function
// mapStateModelValuesInStrict(modelValue, stateName, mutationType[, getFn])
computedProps = mapStateModelValuesInStrict('test', 'test', 'updateTest')
/**
  computedProps = {
    test: {
      get: function(){
        return this.$store.state.test
      }, 
      set: function(value){
        this.$store.commit('updateTest', value)
      }
    }
  }
*/
// commit with payload
computedProps = mapStateModelValuesInStrictWithPayload('test', 'test', 'updateTest')
/**
  computedProps = {
    test: {
      get: function(){
        return this.$store.state.test
      }, 
      set: function(value){
        this.$store.commit('updateTest', {
          test: value
        })
      }
    }
  }
*/
let getFn = function(state, modelValue, stateName){
  return state.obj.msg
}
computedProps = mapStateModelValuesInStrict('test', 'test', 'updateTest', getFn)
/** 
  computedProps = {
    test: {
      get: function(){
        return getFn(this.$store.state, 'test')
      }, 
      set: function(value){
        this.$store.commit('updateTest', value)
      }
    }
  }
*/

// multiple 
// mapStateModelValuesInStrict([[modelValue, stateName, type], [modelValue, stateName, type]], getFn)
//GetFn1 has a higher priority than getFn
// mapStateModelValuesInStrict([[modelValue, stateName, type, getFn1], [modelValue, stateName, type]], getFn)
let getFn1 = function(state, modelValue, stateName) {
  switch (modelValue) {
    case 'info':
      return state.obj.info
    case 'testModel':
      return state.test
    default:
      return state[stateName]
  }
}
computedProps = mapStateModelValuesInStrict([['testModel', 'test', 'updateTest'], ['info', 'info', 'updateInfo', getFn]], getFn1)
/** 
  computedProps = {
    test: {
      get: function(){
        return getFn1(this.$store.state, 'testModel', 'test')
      }, 
      set: function(value){
        this.$store.commit('updateTest', value)
      }
    },
    info: {
      get: function(){
        return getFn(this.$store.state, 'info', 'info')
      }, 
      set: function(value){
        this.$store.commit('updateInfo', value)
      }
    }
  }
*/


// then
const config = {
  computed: {
    //.....some computed methods
  }
}

Object.assign(config.computed, computedProps)
export default config

```

## License
[MIT](https://opensource.org/licenses/MIT)