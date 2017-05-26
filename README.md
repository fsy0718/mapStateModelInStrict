## desc
A public method used to two-way computed property

support modules

## api
  - `mapStateModelValuesInStrict` will commit a mutation with value
  - `mapStateModelValuesInStrictWithPayload` will commit a mutation with payload

## online demo
  [simple](https://jsfiddle.net/fsy0718/dwy9ejgo/)

## use

  - simple

  ```js
    import { mapStateModelValuesInStrict, mapStateModelValuesInStrictWithPayload } from 'vuex-mapstate-modelvalue-instrict'

    // single, you can pass a get function
    // mapStateModelValuesInStrict(modelValue, stateName, mutationType[, {getFn}])
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
  ```
  - commit mutation with payload

  ```js
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
  ```

  - get with custom function

  ```js
    let getFn = function(state, modelValue, stateName){
      return state.obj.msg
    }
    computedProps = mapStateModelValuesInStrict('test', 'test', 'updateTest', {getFn})
    /** 
      computedProps = {
        test: {
          get: function(){
            return getFn(this.$store.state, 'test', 'test')
          }, 
          set: function(value){
            this.$store.commit('updateTest', value)
          }
        }
      }
    */
  ```

  - mutiple

  ```js
    //GetFn1 has a higher priority than getFn
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
    computedProps = mapStateModelValuesInStrict([['testModel', 'test', 'updateTest'], ['info', 'info', 'updateInfo', {getFn}]], {getFn: getFn1})
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
  ```

  - you can set modulePath in opts

  ```js
    computedProps = mapStateModelValuesInStrict([['testModel', 'test', 'updateTest'], ['info', 'info', 'updateInfo', {modulePath: 'form/obj'}]], {modulePath: 'form', param: {root: true}})
    /** 
      computedProps = {
        test: {
          get: function(){
            return this.$store.state.form.test
          }, 
          set: function(value){
            this.$store.commit('form/updateTest', value, {root: true})
          }
        },
        info: {
          get: function(){
            return this.$store.state.form.obj.test
          }, 
          set: function(value){
            this.$store.commit('form/obj/updateInfo', value, {root: true})
          }
        }
      }
    */
  ```

  - you can use getFn for modules

  ```js
    let getFn2 = function (state, moduleName, stateName) {
      if (moduleName === 'testModel') {
        return state.form.updateTest
      }
      if (moduleName === 'info') {
        return state.form.obj.info
      }
    }
    computedProps = mapStateModelValuesInStrict([['testModel', 'test', 'form/updateTest'], ['info', 'info', 'form/obj/updateInfo']], {getFn: getFn2})
    /** 
      computedProps = {
        test: {
          get: function(){
            return getFn2()
          }, 
          set: function(value){
            this.$store.commit('form/updateTest', value)
          }
        },
        info: {
          get: function(){
            return getFn2()
          }, 
          set: function(value){
            this.$store.commit('form/obj/updateInfo', value)
          }
        }
      }
    */
  ```
  - mixin result to computed

  ```js
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
