/*global it */
'use strict';
var assert = require('assert');
var onetime = require('./onetime');


it('only call a function once', function () {
	var i = 0;
	var fn = onetime(function () {
		return i++;
	});

	assert.equal(fn(), 0);
	assert.equal(fn(), 0);
	assert.equal(fn(), 0);
});

it('option to throw is called more than once', function () {
	var fn = onetime(function () {}, true);
	fn();
	assert.throws(function () {fn()});
});

it('should return use the name of the function if available', function () {
	var fn = onetime(function foo() {}, true);
	fn();
	assert.throws(function () {fn()}, Error, 'foo() can only be called once.');
});
