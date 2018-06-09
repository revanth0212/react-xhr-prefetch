import Store from './Store'

console.log('Worker started...')

Store.keys().then((keys) => {
  console.log(keys)
})
