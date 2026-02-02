import test from 'ava';
import onetime from './index.js';

test('call function once', t => {
	let index = 0;
	const fixture = onetime(() => ++index);
	t.is(fixture(), 1);
	t.is(fixture(), 1);
	t.is(fixture(), 1);
});

test('throw option when called more than once', t => {
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

test('preserves `this` context', t => {
	const object = {
		value: 42,
		getValue: onetime(function () {
			return this.value;
		}),
	};

	t.is(object.getValue(), 42);
	t.is(object.getValue(), 42);
});

test('retries if the first call throws', t => {
	let callCount = 0;
	const fixture = onetime(() => {
		callCount++;

		if (callCount === 1) {
			throw new Error('first call');
		}

		return 'success';
	});

	t.throws(() => fixture(), {message: 'first call'});
	t.is(fixture(), 'success');
	t.is(fixture(), 'success');
	t.is(onetime.callCount(fixture), 3);
});

test('`callCount` method - throw on non-onetime-wrapped functions', t => {
	const fixture = () => {};

	t.throws(() => {
		onetime.callCount(fixture);
	}, {message: /not wrapped/});
});
