/* eslint-disable arrow-body-style */
import test from 'ava';
import fn from './';

test('call function once', t => {
	let i = 0;
	const f = fn(() => i++);
	t.is(f(), 0);
	t.is(f(), 0);
	t.is(f(), 0);
});

test('option to throw is called more than once', t => {
	const f = fn(() => {}, true);
	f();
	t.throws(f, Error);
});

test('use the name of the function if available', t => {
	const f = fn(function foo() {}, true);
	f();
	t.throws(f, 'foo() can only be called once.');
});
