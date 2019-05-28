import React, { Component } from "react";
import ReactDom from 'react-dom'

import Header from './header.jsx'
import Body from './body.jsx'

class App extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div>
      	<Header />
      	<Body />
      </div>
    );
  }
}


ReactDom.render(
  <App />,
  document.getElementById('root')
)
