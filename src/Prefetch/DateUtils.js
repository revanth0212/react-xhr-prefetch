// @flow

export const getCurrentTimeStamp = (): number => +new Date()

export const getTimeDifference = (t1: number, t2: number): number => (t1 - t2) / 1000
