'use strict';
const mimicFn = require('mimic-fn');

const calledFunctions = new WeakMap();

module.exports = (fn, options = {}) => {
	if (typeof fn !== 'function') {
		throw new TypeError('Expected a function');
	}

	let ret;
	let isCalled = false;
	let count = 0;
	const funcionName = fn.displayName || fn.name || '<anonymous>';

	const onetime = function (...args) {
		calledFunctions.set(onetime, count++);

		if (isCalled) {
			if (options.throw === true) {
				throw new Error(`Function \`${funcionName}\` can only be called once`);
			}

			return ret;
		}

		isCalled = true;
		ret = fn.apply(this, args);
		fn = null;

		return ret;
	};

	mimicFn(onetime, fn);
	calledFunctions.set(onetime, count++);

	return onetime;
};

module.exports.callCount = fn => calledFunctions.get(fn);
