import React, { Component } from 'react'

import PrefetchWorker from './PrefetchWorker'
import Prefetch from './Prefetch'
import './App.css'

/* eslint-disable react/prefer-stateless-function  */
class App extends Component {
  state = {
    show: false,
  }

  toggleView = () => {
    this.setState({
      show: !this.state.show,
    })
  }

  render() {
    return (
      <PrefetchWorker>
        <div className="App">
          <input type="button" value="Toggle View" onClick={this.toggleView} />
          {this.state.show && (
            <div>
              <Prefetch url="www.facebook.com" prefetchTimeout={10000} enable>
                <div> This Component has Prefetch Wrapped around it. </div>
              </Prefetch>
            </div>
          )}
          <div> {'Checkout Developer Tools -> Application -> IndexedDB -> prefetch'} </div>
        </div>
      </PrefetchWorker>
    )
  }
}
/* eslint-enable react/prefer-stateless-function  */

export default App
