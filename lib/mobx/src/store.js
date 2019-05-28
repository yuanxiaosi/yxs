import {observable} from './mobx.js'
// import { observable, computed } from "mobx";


class Store {
  @observable headerMsg = 'headerMsg'
  @observable bodyMsg = 'bodyMsg'
}

let store = new Store


// let value
// Object.defineProperty(store, 'headerMsg', {
//     get: function(){
//     		console.log(this)
//         return value
//     },
//     set: function(v){
//     	value = v
//     },
//     enumerable: true,
//     configurable: true
// })

// store.headerMsg = 111

export default store