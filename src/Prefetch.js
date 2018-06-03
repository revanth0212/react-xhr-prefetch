//  @flow

import React from 'react'

import type { Element } from 'react'

import Store from './Store'

type PrefetchType = {
  url: string,
  prefetchTimeout: number,
  enable: boolean,
  children?: Element<any>,
}

class Prefetch extends React.Component<PrefetchType> {
  componentWillMount() {
    const { url, enable = false, prefetchTimeout } = this.props
    if (enable) {
      Store.setItem(url, { url, prefetchTimeout, lastFetchedAt: null })
    }
  }

  componentWillUpdate(newProps: PrefetchType) {
    const { url: oldURL, prefetchTimeout: oldPrefetchTimeout, enable: oldEnable } = this.props
    const { url: newURL, prefetchTimeout: newPrefetchTimeout, enable: newEnable } = newProps
    if (newEnable) {
      if (!oldEnable) {
        Store.setItem(newURL, { url: newURL, prefetchTimeout: newPrefetchTimeout, lastFetchedAt: null })
      } else if (oldURL !== newURL || oldPrefetchTimeout !== newPrefetchTimeout) {
        Store.getItem(oldURL)
          .then((oldConfig) => {
            Store.setItem(newURL, {
              url: newURL,
              prefetchTimeout: newPrefetchTimeout,
              lastFetchedAt: oldConfig.lastFetchedAt,
            })
              .then(() => {
                Store.removeItem(oldURL)
              })
              .catch((err) => {
                console.warn(`Unable to set value for ${newURL} in DB`, err) // eslint-disable-line
              })
          })
          .catch((err) => {
            console.warn(`Unable to find value for ${oldURL} in DB`, err) // eslint-disable-line
          })
      }
    }
  }

  componentWillUnmount() {
    Store.removeItem(this.props.url)
  }

  render() {
    return this.props.children
  }
}

export default Prefetch
