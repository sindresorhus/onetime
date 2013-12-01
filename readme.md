# onetime [![Build Status](https://secure.travis-ci.org/sindresorhus/onetime.png?branch=master)](http://travis-ci.org/sindresorhus/onetime)

> Only call a function once

When called multiple times it will return the return value from the first call.


## Install

Download [manually](https://github.com/sindresorhus/onetime/releases) or with a package-manager.

#### [npm](https://npmjs.org/package/onetime)

```
npm install --save onetime
```

#### [Bower](http://bower.io)

```
bower install --save onetime
```

#### [Component](https://github.com/component/component)

```
component install sindresorhus/onetime
```


## Examples

### Node.js

```js
var onetime = require('onetime');
var i = 0;
var foo = onetime(function () {
	return i++;
});

foo(); //=> 0
foo(); //=> 0
foo(); //=> 0
```

### Bower

```html
<script src="bower_components/onetime/onetime.js"></script>
```

```js
var i = 0;
var foo = onetime(function () {
	return i++;
});

foo(); //=> 0
foo(); //=> 0
foo(); //=> 0
```


## API

### onetime(function, [shouldThrow])

#### function

Type: `Function`

Function that should only be called once.

#### shouldThrow

Type: `Boolean`  
Default: `false`

Set to `true` if you want it to fail with an error when called more than once.


## License

MIT © [Sindre Sorhus](http://sindresorhus.com)
