import localForage from 'localforage'

localForage.config({
  driver: localForage.INDEXEDDB, // Force INDEXEDDB
  name: 'prefetch',
  version: 1.0,
  storeName: 'prefetch',
  description: 'Prefetch DB',
})

const store = localForage.createInstance({
  name: 'prefetch',
})

export default store
