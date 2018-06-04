import React from 'react'

class PrefetchWorker extends React.Component {
  componentWillMount() {
    // load the worker and start it
    if (window.Worker) {
      this.worker = new Worker('prefetchMainWorker.js')
    }
  }

  componentWillUnmount() {
    this.worker && this.worker.terminate()
  }

  render() {
    return this.props.children
  }
}

export default PrefetchWorker
