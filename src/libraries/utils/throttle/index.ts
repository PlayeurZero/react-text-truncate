export default function throttle(callback, delay, context = this) {
	let last
	let timer

	return (...args) => {
		let now = new Date()

		if (last && now < last + delay) {
			clearTimeout(timer)

			timer = setTimeout(() => {
				last = now
				callback.apply(context, ...args)
			}, delay)
		} else {
			last = now
			callback.apply(context, ...args)
		}
	}
}
