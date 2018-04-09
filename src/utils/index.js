export function isPlainObject(obj) {
	return (
		typeof obj === 'object' &&
		Object.getPrototypeOf(obj) === Object.prototype
	)
}
export function isArray(arr) {
	return Object.prototype.toString.call(arr) === '[object Array]'
}
