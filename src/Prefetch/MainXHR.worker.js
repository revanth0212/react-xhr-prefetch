import registerPromiseWorker from 'promise-worker/register'

// type DBValuesType = {
//   url: string,
//   prefetchTimeout: number,
//   lastFetchedAt: number,
// }

const chunkSize = 5

const partitionKeysToExpire = (keysAboutToExpire) => {
  let i = 0
  const returnValue = []
  while (i < keysAboutToExpire.length) {
    returnValue.push(keysAboutToExpire.slice(i, i + chunkSize))
    i += chunkSize
  }
  return returnValue
}

registerPromiseWorker((keysAboutToExpire) => {
  console.log(partitionKeysToExpire(keysAboutToExpire))
})
