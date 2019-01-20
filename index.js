'use strict';
const mimicFn = require('mimic-fn');

const calledFns = new WeakMap();

module.exports = (fn, opts) => {
	// TODO: Remove this in v3
	if (opts === true) {
		throw new TypeError('The second argument is now an options object');
	}

	if (typeof fn !== 'function') {
		throw new TypeError('Expected a function');
	}

	opts = opts || {};

	let ret;
	let called = false;
	let count = 0;
	const fnName = fn.displayName || fn.name || '<anonymous>';

	const onetime = function () {
		calledFns.set(onetime, count++);

		if (called) {
			if (opts.throw === true) {
				throw new Error(`Function \`${fnName}\` can only be called once`);
			}

			return ret;
		}

		called = true;
		ret = fn.apply(this, arguments);
		fn = null;

		return ret;
	};

	mimicFn(onetime, fn);
	calledFns.set(onetime, count++);

	return onetime;
};

module.exports.callCount = fn => calledFns.get(fn);
