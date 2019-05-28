import React, { Component } from "react";
import ReactDOM from "react-dom";


import {observer} from './mobx.js'
// import { observer } from "mobx-react"

import store from './store.js'

@observer
class Header extends Component {
  constructor() {
    super();
    this.state = {
      title: ""
    };
  }
  componentWillMount() {
    
  }
  change() {
    store.headerMsg = 'a22222222222'
  }
  render() {
    console.log('render1111', store)
    return (
      <form id="article-form" onClick={this.change}>
      	{store.headerMsg}
      </form>
    );
  }
}





export default Header;