'use strict';
var test = require('ava');
var onetime = require('./');

test('only call a function once', function (t) {
	var i = 0;
	var fn = onetime(function () {
		return i++;
	});

	t.assert(fn() === 0);
	t.assert(fn() === 0);
	t.assert(fn() === 0);
	t.end();
});

test('option to throw is called more than once', function (t) {
	var fn = onetime(function () {}, true);

	fn();

	try {
		fn();
	} catch (err) {
		t.assert(err instanceof Error);
		t.end();
	}
});

test('should return use the name of the function if available', function (t) {
	var fn = onetime(function foo() {}, true);

	fn();

	try {
		fn();
	} catch (err) {
		t.assert(err instanceof Error);
		t.assert(err.message === 'foo() can only be called once.');
		t.end();
	}
});
