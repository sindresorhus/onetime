import test from 'ava';
import onetime from './index.js';

test('call function once', t => {
	let i = 0;
	const fixture = onetime(() => ++i);
	t.is(fixture(), 1);
	t.is(fixture(), 1);
	t.is(fixture(), 1);
});

test('option to throw is called more than once', t => {
	const fixture = onetime(() => {}, {throw: true});
	fixture();
	t.throws(fixture, {message: /Function .* can only be called once/});
});

test('`callCount` method', t => {
	const fixture = onetime(() => {});
	t.is(onetime.callCount(fixture), 0);
	fixture();
	fixture();
	fixture();
	t.is(onetime.callCount(fixture), 3);
});

test('`callCount` method - throw on non-onetime-wrapped functions', t => {
	const fixture = () => {};

	t.throws(() => {
		onetime.callCount(fixture);
	}, {message: /not wrapped/});
});
