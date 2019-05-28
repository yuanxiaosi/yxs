import React, { Component } from "react";
import ReactDOM from "react-dom";


import mobx from './mobx.js'

import Store from './store.js'




@mobx.observe
class FormContainer extends Component {
  constructor() {
    super();
    this.state = {
      title: ""
    };
  }
  render() {
    return (
      <form id="article-form">
      	123 title
      </form>
    );
  }
}








function testable(isTestable) {
    return function(target) {
    		console.log(target)
        target.isTestable = isTestable;
        return target
    }
}

@testable(true)
class MyTestableClass {}
let res = new MyTestableClass
console.log(MyTestableClass.isTestable)// true
 

@testable(false)
class MyClass {}
console.log(MyClass.isTestable)// false











export default FormContainer;