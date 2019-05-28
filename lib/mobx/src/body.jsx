import React, { Component } from "react";
import ReactDOM from "react-dom";


import {observer} from './mobx.js'
// import { observer } from "mobx-react"

import store from './store.js'

@observer
class Body extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      time: 0
    };
  }
  componentWillMount() {
    // setInterval(()=>{
    //   let time = this.state.time
    //   this.setState({
    //     time: time+1
    //   })
    // }, 1000)
  }
  componentDidMount() {
    
  }
  change() {
    // store.bodyMsg = 'a22222222222'
  }
  render() {
    console.log('render222233')
    return (
      <form id="article-form" onClick={this.change}>
      	{store.bodyMsg} --- {store.bodyMsg} --- {store.bodyMsg} --- - {store.bodyMsg}
        <div>{this.state.time}</div>
      </form>
    );
  }
}






export default Body;