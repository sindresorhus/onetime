/*!
	onetime
	Only call a function once
	https://github.com/sindresorhus/onetime
	by Sindre Sorhus
	MIT License
*/
(function () {
	'use strict';

	function onetime(fn, errMsg) {
		if (typeof fn !== 'function') {
			throw new TypeError('Expected a function.');
		}

		var ret;
		var called = false;
		var fnName = fn.name || (/function ([^\(]+)/.exec(fn.toString()) || [])[1];

		return function () {
			if (called) {
				if (errMsg === true) {
					fnName = fnName ? fnName + '()' : 'Function';
					throw new Error(fnName + ' can only be called once.');
				}
				return ret;
			}
			called = true;
			ret = fn.apply(this, arguments);
			fn = null;
			return ret;
		}
	}

	if (typeof module !== 'undefined' && module.exports) {
		module.exports = onetime;
	} else {
		window.onetime = onetime;
	}
})();
