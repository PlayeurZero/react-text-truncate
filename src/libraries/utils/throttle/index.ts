export default function throttle(callback, delay, thisArg = null) {
  let last
  let timer

  return (...args) => {
    const now = new Date()

    if (last && now < last + delay) {
      clearTimeout(timer)

      timer = setTimeout(() => {
        last = now
        callback.apply(thisArg, ...args)
      }, delay)
    } else {
      last = now
      callback.apply(thisArg, ...args)
    }
  }
}
