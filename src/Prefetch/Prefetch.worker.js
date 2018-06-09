import PromiseWorker from 'promise-worker'

import Worker from './MainXHR.worker'
import Store from './Store'
import { getCurrentTimeStamp } from './DateUtils'

// type DBValuesType = {
//   url: string,
//   prefetchTimeout: number,
//   lastFetchedAt: number,
// }

const TIMEOUT = 4000

const iterateOverStore = () => {
  const keysAboutToExpire = []
  const checkKeysForExpiry = (value) => {
    if (value.lastFetchedAt === null || getCurrentTimeStamp() - value.lastFetchedAt > value.prefetchTimeout - TIMEOUT) {
      keysAboutToExpire.push(value)
    }
  }
  Store.iterate(checkKeysForExpiry)
    .then(() => {
      console.log(keysAboutToExpire) // eslint-disable-line

      /*
      Stuck here. Unable to load 1 worker from another worker.
      */

      // if (Worker) {
      //   const worker = new Worker()
      //   const promiseWorker = new PromiseWorker(worker)
      //   promiseWorker
      //     .postMessage(keysAboutToExpire)
      //     .then(() => {
      //       worker.terminate()
      //     })
      //     .catch((error) => {
      //       console.error('Error while working on fetching XHR calls.', error) // eslint-disable-line
      //       worker.terminate()
      //     })
      // }
    })
    .catch((err) => {
      console.error('Error white iterating over data store.', err) // eslint-disable-line
    })
}

setInterval(() => {
  iterateOverStore()
}, TIMEOUT)
