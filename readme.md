# onetime

> Ensure a function is only called once

When called multiple times it will return the return value from the first call.

*Unlike the module [once](https://github.com/isaacs/once), this one isn't naughty and extending `Function.prototype`.*

## Install

```sh
npm install onetime
```

## Usage

```js
import onetime from 'onetime';

let index = 0;

const foo = onetime(() => ++index);

foo(); //=> 1
foo(); //=> 1
foo(); //=> 1

onetime.callCount(foo); //=> 3
```

```js
import onetime from 'onetime';

const foo = onetime(() => {}, {throw: true});

foo();

foo();
//=> Error: Function `foo` can only be called once
```

## API

### onetime(fn, options?)

Returns a function that only calls `fn` once.

#### fn

Type: `Function`

The function that should only be called once.

#### options

Type: `object`

##### throw

Type: `boolean`\
Default: `false`

Throw an error when called more than once.

### onetime.callCount(fn)

Returns a number representing how many times `fn` has been called.

Note: It throws an error if you pass in a function that is not wrapped by `onetime`.

```js
import onetime from 'onetime';

const foo = onetime(() => {});

foo();
foo();
foo();

console.log(onetime.callCount(foo));
//=> 3
```

#### fn

Type: `Function`

The function to get call count from.
