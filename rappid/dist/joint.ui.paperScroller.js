/*! JointJS+ v3.6.3 - HTML5 Diagramming Framework

Copyright (c) 2022 client IO

 2022-12-09 


This Source Code Form is subject to the terms of the JointJS+ License
, v. 2.0. If a copy of the JointJS+ License was not distributed with this
file, You can obtain one at http://jointjs.com/license/rappid_v2.txt
 or from the JointJS+ archive as was distributed by client IO. See the LICENSE file.*/


this.joint = this.joint || {};
(function (exports, $, core_mjs) {
	'use strict';

	$ = $ && Object.prototype.hasOwnProperty.call($, 'default') ? $['default'] : $;

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var check = function (it) {
	  return it && it.Math == Math && it;
	};

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global_1 =
	  // eslint-disable-next-line es/no-global-this -- safe
	  check(typeof globalThis == 'object' && globalThis) ||
	  check(typeof window == 'object' && window) ||
	  // eslint-disable-next-line no-restricted-globals -- safe
	  check(typeof self == 'object' && self) ||
	  check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
	  // eslint-disable-next-line no-new-func -- fallback
	  (function () { return this; })() || Function('return this')();

	var fails = function (exec) {
	  try {
	    return !!exec();
	  } catch (error) {
	    return true;
	  }
	};

	// Detect IE8's incomplete defineProperty implementation
	var descriptors = !fails(function () {
	  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
	  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
	});

	var functionBindNative = !fails(function () {
	  // eslint-disable-next-line es/no-function-prototype-bind -- safe
	  var test = (function () { /* empty */ }).bind();
	  // eslint-disable-next-line no-prototype-builtins -- safe
	  return typeof test != 'function' || test.hasOwnProperty('prototype');
	});

	var call = Function.prototype.call;

	var functionCall = functionBindNative ? call.bind(call) : function () {
	  return call.apply(call, arguments);
	};

	var $propertyIsEnumerable = {}.propertyIsEnumerable;
	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

	// Nashorn ~ JDK8 bug
	var NASHORN_BUG = getOwnPropertyDescriptor && !$propertyIsEnumerable.call({ 1: 2 }, 1);

	// `Object.prototype.propertyIsEnumerable` method implementation
	// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
	var f = NASHORN_BUG ? function propertyIsEnumerable(V) {
	  var descriptor = getOwnPropertyDescriptor(this, V);
	  return !!descriptor && descriptor.enumerable;
	} : $propertyIsEnumerable;

	var objectPropertyIsEnumerable = {
		f: f
	};

	var createPropertyDescriptor = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

	var FunctionPrototype = Function.prototype;
	var call$1 = FunctionPrototype.call;
	var uncurryThisWithBind = functionBindNative && FunctionPrototype.bind.bind(call$1, call$1);

	var functionUncurryThisRaw = function (fn) {
	  return functionBindNative ? uncurryThisWithBind(fn) : function () {
	    return call$1.apply(fn, arguments);
	  };
	};

	var toString = functionUncurryThisRaw({}.toString);
	var stringSlice = functionUncurryThisRaw(''.slice);

	var classofRaw = function (it) {
	  return stringSlice(toString(it), 8, -1);
	};

	var functionUncurryThis = function (fn) {
	  // Nashorn bug:
	  //   https://github.com/zloirock/core-js/issues/1128
	  //   https://github.com/zloirock/core-js/issues/1130
	  if (classofRaw(fn) === 'Function') return functionUncurryThisRaw(fn);
	};

	var $Object = Object;
	var split = functionUncurryThis(''.split);

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var indexedObject = fails(function () {
	  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
	  // eslint-disable-next-line no-prototype-builtins -- safe
	  return !$Object('z').propertyIsEnumerable(0);
	}) ? function (it) {
	  return classofRaw(it) == 'String' ? split(it, '') : $Object(it);
	} : $Object;

	// we can't use just `it == null` since of `document.all` special case
	// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot-aec
	var isNullOrUndefined = function (it) {
	  return it === null || it === undefined;
	};

	var $TypeError = TypeError;

	// `RequireObjectCoercible` abstract operation
	// https://tc39.es/ecma262/#sec-requireobjectcoercible
	var requireObjectCoercible = function (it) {
	  if (isNullOrUndefined(it)) throw $TypeError("Can't call method on " + it);
	  return it;
	};

	// toObject with fallback for non-array-like ES3 strings



	var toIndexedObject = function (it) {
	  return indexedObject(requireObjectCoercible(it));
	};

	var documentAll = typeof document == 'object' && document.all;

	// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot
	var IS_HTMLDDA = typeof documentAll == 'undefined' && documentAll !== undefined;

	var documentAll_1 = {
	  all: documentAll,
	  IS_HTMLDDA: IS_HTMLDDA
	};

	var documentAll$1 = documentAll_1.all;

	// `IsCallable` abstract operation
	// https://tc39.es/ecma262/#sec-iscallable
	var isCallable = documentAll_1.IS_HTMLDDA ? function (argument) {
	  return typeof argument == 'function' || argument === documentAll$1;
	} : function (argument) {
	  return typeof argument == 'function';
	};

	var documentAll$2 = documentAll_1.all;

	var isObject = documentAll_1.IS_HTMLDDA ? function (it) {
	  return typeof it == 'object' ? it !== null : isCallable(it) || it === documentAll$2;
	} : function (it) {
	  return typeof it == 'object' ? it !== null : isCallable(it);
	};

	var aFunction = function (argument) {
	  return isCallable(argument) ? argument : undefined;
	};

	var getBuiltIn = function (namespace, method) {
	  return arguments.length < 2 ? aFunction(global_1[namespace]) : global_1[namespace] && global_1[namespace][method];
	};

	var objectIsPrototypeOf = functionUncurryThis({}.isPrototypeOf);

	var engineUserAgent = getBuiltIn('navigator', 'userAgent') || '';

	var process = global_1.process;
	var Deno = global_1.Deno;
	var versions = process && process.versions || Deno && Deno.version;
	var v8 = versions && versions.v8;
	var match, version;

	if (v8) {
	  match = v8.split('.');
	  // in old Chrome, versions of V8 isn't V8 = Chrome / 10
	  // but their correct versions are not interesting for us
	  version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
	}

	// BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
	// so check `userAgent` even if `.v8` exists, but 0
	if (!version && engineUserAgent) {
	  match = engineUserAgent.match(/Edge\/(\d+)/);
	  if (!match || match[1] >= 74) {
	    match = engineUserAgent.match(/Chrome\/(\d+)/);
	    if (match) version = +match[1];
	  }
	}

	var engineV8Version = version;

	/* eslint-disable es/no-symbol -- required for testing */



	// eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
	var symbolConstructorDetection = !!Object.getOwnPropertySymbols && !fails(function () {
	  var symbol = Symbol();
	  // Chrome 38 Symbol has incorrect toString conversion
	  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
	  return !String(symbol) || !(Object(symbol) instanceof Symbol) ||
	    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
	    !Symbol.sham && engineV8Version && engineV8Version < 41;
	});

	/* eslint-disable es/no-symbol -- required for testing */


	var useSymbolAsUid = symbolConstructorDetection
	  && !Symbol.sham
	  && typeof Symbol.iterator == 'symbol';

	var $Object$1 = Object;

	var isSymbol = useSymbolAsUid ? function (it) {
	  return typeof it == 'symbol';
	} : function (it) {
	  var $Symbol = getBuiltIn('Symbol');
	  return isCallable($Symbol) && objectIsPrototypeOf($Symbol.prototype, $Object$1(it));
	};

	var $String = String;

	var tryToString = function (argument) {
	  try {
	    return $String(argument);
	  } catch (error) {
	    return 'Object';
	  }
	};

	var $TypeError$1 = TypeError;

	// `Assert: IsCallable(argument) is true`
	var aCallable = function (argument) {
	  if (isCallable(argument)) return argument;
	  throw $TypeError$1(tryToString(argument) + ' is not a function');
	};

	// `GetMethod` abstract operation
	// https://tc39.es/ecma262/#sec-getmethod
	var getMethod = function (V, P) {
	  var func = V[P];
	  return isNullOrUndefined(func) ? undefined : aCallable(func);
	};

	var $TypeError$2 = TypeError;

	// `OrdinaryToPrimitive` abstract operation
	// https://tc39.es/ecma262/#sec-ordinarytoprimitive
	var ordinaryToPrimitive = function (input, pref) {
	  var fn, val;
	  if (pref === 'string' && isCallable(fn = input.toString) && !isObject(val = functionCall(fn, input))) return val;
	  if (isCallable(fn = input.valueOf) && !isObject(val = functionCall(fn, input))) return val;
	  if (pref !== 'string' && isCallable(fn = input.toString) && !isObject(val = functionCall(fn, input))) return val;
	  throw $TypeError$2("Can't convert object to primitive value");
	};

	// eslint-disable-next-line es/no-object-defineproperty -- safe
	var defineProperty = Object.defineProperty;

	var defineGlobalProperty = function (key, value) {
	  try {
	    defineProperty(global_1, key, { value: value, configurable: true, writable: true });
	  } catch (error) {
	    global_1[key] = value;
	  } return value;
	};

	var SHARED = '__core-js_shared__';
	var store = global_1[SHARED] || defineGlobalProperty(SHARED, {});

	var sharedStore = store;

	var shared = createCommonjsModule(function (module) {
	(module.exports = function (key, value) {
	  return sharedStore[key] || (sharedStore[key] = value !== undefined ? value : {});
	})('versions', []).push({
	  version: '3.25.5',
	  mode:  'global',
	  copyright: '© 2014-2022 Denis Pushkarev (zloirock.ru)',
	  license: 'https://github.com/zloirock/core-js/blob/v3.25.5/LICENSE',
	  source: 'https://github.com/zloirock/core-js'
	});
	});

	var $Object$2 = Object;

	// `ToObject` abstract operation
	// https://tc39.es/ecma262/#sec-toobject
	var toObject = function (argument) {
	  return $Object$2(requireObjectCoercible(argument));
	};

	var hasOwnProperty = functionUncurryThis({}.hasOwnProperty);

	// `HasOwnProperty` abstract operation
	// https://tc39.es/ecma262/#sec-hasownproperty
	// eslint-disable-next-line es/no-object-hasown -- safe
	var hasOwnProperty_1 = Object.hasOwn || function hasOwn(it, key) {
	  return hasOwnProperty(toObject(it), key);
	};

	var id = 0;
	var postfix = Math.random();
	var toString$1 = functionUncurryThis(1.0.toString);

	var uid = function (key) {
	  return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString$1(++id + postfix, 36);
	};

	var WellKnownSymbolsStore = shared('wks');
	var Symbol$1 = global_1.Symbol;
	var symbolFor = Symbol$1 && Symbol$1['for'];
	var createWellKnownSymbol = useSymbolAsUid ? Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid;

	var wellKnownSymbol = function (name) {
	  if (!hasOwnProperty_1(WellKnownSymbolsStore, name) || !(symbolConstructorDetection || typeof WellKnownSymbolsStore[name] == 'string')) {
	    var description = 'Symbol.' + name;
	    if (symbolConstructorDetection && hasOwnProperty_1(Symbol$1, name)) {
	      WellKnownSymbolsStore[name] = Symbol$1[name];
	    } else if (useSymbolAsUid && symbolFor) {
	      WellKnownSymbolsStore[name] = symbolFor(description);
	    } else {
	      WellKnownSymbolsStore[name] = createWellKnownSymbol(description);
	    }
	  } return WellKnownSymbolsStore[name];
	};

	var $TypeError$3 = TypeError;
	var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');

	// `ToPrimitive` abstract operation
	// https://tc39.es/ecma262/#sec-toprimitive
	var toPrimitive = function (input, pref) {
	  if (!isObject(input) || isSymbol(input)) return input;
	  var exoticToPrim = getMethod(input, TO_PRIMITIVE);
	  var result;
	  if (exoticToPrim) {
	    if (pref === undefined) pref = 'default';
	    result = functionCall(exoticToPrim, input, pref);
	    if (!isObject(result) || isSymbol(result)) return result;
	    throw $TypeError$3("Can't convert object to primitive value");
	  }
	  if (pref === undefined) pref = 'number';
	  return ordinaryToPrimitive(input, pref);
	};

	// `ToPropertyKey` abstract operation
	// https://tc39.es/ecma262/#sec-topropertykey
	var toPropertyKey = function (argument) {
	  var key = toPrimitive(argument, 'string');
	  return isSymbol(key) ? key : key + '';
	};

	var document$1 = global_1.document;
	// typeof document.createElement is 'object' in old IE
	var EXISTS = isObject(document$1) && isObject(document$1.createElement);

	var documentCreateElement = function (it) {
	  return EXISTS ? document$1.createElement(it) : {};
	};

	// Thanks to IE8 for its funny defineProperty
	var ie8DomDefine = !descriptors && !fails(function () {
	  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
	  return Object.defineProperty(documentCreateElement('div'), 'a', {
	    get: function () { return 7; }
	  }).a != 7;
	});

	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

	// `Object.getOwnPropertyDescriptor` method
	// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
	var f$1 = descriptors ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
	  O = toIndexedObject(O);
	  P = toPropertyKey(P);
	  if (ie8DomDefine) try {
	    return $getOwnPropertyDescriptor(O, P);
	  } catch (error) { /* empty */ }
	  if (hasOwnProperty_1(O, P)) return createPropertyDescriptor(!functionCall(objectPropertyIsEnumerable.f, O, P), O[P]);
	};

	var objectGetOwnPropertyDescriptor = {
		f: f$1
	};

	// V8 ~ Chrome 36-
	// https://bugs.chromium.org/p/v8/issues/detail?id=3334
	var v8PrototypeDefineBug = descriptors && fails(function () {
	  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
	  return Object.defineProperty(function () { /* empty */ }, 'prototype', {
	    value: 42,
	    writable: false
	  }).prototype != 42;
	});

	var $String$1 = String;
	var $TypeError$4 = TypeError;

	// `Assert: Type(argument) is Object`
	var anObject = function (argument) {
	  if (isObject(argument)) return argument;
	  throw $TypeError$4($String$1(argument) + ' is not an object');
	};

	var $TypeError$5 = TypeError;
	// eslint-disable-next-line es/no-object-defineproperty -- safe
	var $defineProperty = Object.defineProperty;
	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	var $getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;
	var ENUMERABLE = 'enumerable';
	var CONFIGURABLE = 'configurable';
	var WRITABLE = 'writable';

	// `Object.defineProperty` method
	// https://tc39.es/ecma262/#sec-object.defineproperty
	var f$2 = descriptors ? v8PrototypeDefineBug ? function defineProperty(O, P, Attributes) {
	  anObject(O);
	  P = toPropertyKey(P);
	  anObject(Attributes);
	  if (typeof O === 'function' && P === 'prototype' && 'value' in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
	    var current = $getOwnPropertyDescriptor$1(O, P);
	    if (current && current[WRITABLE]) {
	      O[P] = Attributes.value;
	      Attributes = {
	        configurable: CONFIGURABLE in Attributes ? Attributes[CONFIGURABLE] : current[CONFIGURABLE],
	        enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
	        writable: false
	      };
	    }
	  } return $defineProperty(O, P, Attributes);
	} : $defineProperty : function defineProperty(O, P, Attributes) {
	  anObject(O);
	  P = toPropertyKey(P);
	  anObject(Attributes);
	  if (ie8DomDefine) try {
	    return $defineProperty(O, P, Attributes);
	  } catch (error) { /* empty */ }
	  if ('get' in Attributes || 'set' in Attributes) throw $TypeError$5('Accessors not supported');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};

	var objectDefineProperty = {
		f: f$2
	};

	var createNonEnumerableProperty = descriptors ? function (object, key, value) {
	  return objectDefineProperty.f(object, key, createPropertyDescriptor(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

	var FunctionPrototype$1 = Function.prototype;
	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	var getDescriptor = descriptors && Object.getOwnPropertyDescriptor;

	var EXISTS$1 = hasOwnProperty_1(FunctionPrototype$1, 'name');
	// additional protection from minified / mangled / dropped function names
	var PROPER = EXISTS$1 && (function something() { /* empty */ }).name === 'something';
	var CONFIGURABLE$1 = EXISTS$1 && (!descriptors || (descriptors && getDescriptor(FunctionPrototype$1, 'name').configurable));

	var functionName = {
	  EXISTS: EXISTS$1,
	  PROPER: PROPER,
	  CONFIGURABLE: CONFIGURABLE$1
	};

	var functionToString = functionUncurryThis(Function.toString);

	// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
	if (!isCallable(sharedStore.inspectSource)) {
	  sharedStore.inspectSource = function (it) {
	    return functionToString(it);
	  };
	}

	var inspectSource = sharedStore.inspectSource;

	var WeakMap = global_1.WeakMap;

	var weakMapBasicDetection = isCallable(WeakMap) && /native code/.test(String(WeakMap));

	var keys = shared('keys');

	var sharedKey = function (key) {
	  return keys[key] || (keys[key] = uid(key));
	};

	var hiddenKeys = {};

	var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
	var TypeError$1 = global_1.TypeError;
	var WeakMap$1 = global_1.WeakMap;
	var set, get, has;

	var enforce = function (it) {
	  return has(it) ? get(it) : set(it, {});
	};

	var getterFor = function (TYPE) {
	  return function (it) {
	    var state;
	    if (!isObject(it) || (state = get(it)).type !== TYPE) {
	      throw TypeError$1('Incompatible receiver, ' + TYPE + ' required');
	    } return state;
	  };
	};

	if (weakMapBasicDetection || sharedStore.state) {
	  var store$1 = sharedStore.state || (sharedStore.state = new WeakMap$1());
	  /* eslint-disable no-self-assign -- prototype methods protection */
	  store$1.get = store$1.get;
	  store$1.has = store$1.has;
	  store$1.set = store$1.set;
	  /* eslint-enable no-self-assign -- prototype methods protection */
	  set = function (it, metadata) {
	    if (store$1.has(it)) throw TypeError$1(OBJECT_ALREADY_INITIALIZED);
	    metadata.facade = it;
	    store$1.set(it, metadata);
	    return metadata;
	  };
	  get = function (it) {
	    return store$1.get(it) || {};
	  };
	  has = function (it) {
	    return store$1.has(it);
	  };
	} else {
	  var STATE = sharedKey('state');
	  hiddenKeys[STATE] = true;
	  set = function (it, metadata) {
	    if (hasOwnProperty_1(it, STATE)) throw TypeError$1(OBJECT_ALREADY_INITIALIZED);
	    metadata.facade = it;
	    createNonEnumerableProperty(it, STATE, metadata);
	    return metadata;
	  };
	  get = function (it) {
	    return hasOwnProperty_1(it, STATE) ? it[STATE] : {};
	  };
	  has = function (it) {
	    return hasOwnProperty_1(it, STATE);
	  };
	}

	var internalState = {
	  set: set,
	  get: get,
	  has: has,
	  enforce: enforce,
	  getterFor: getterFor
	};

	var makeBuiltIn_1 = createCommonjsModule(function (module) {
	var CONFIGURABLE_FUNCTION_NAME = functionName.CONFIGURABLE;



	var enforceInternalState = internalState.enforce;
	var getInternalState = internalState.get;
	// eslint-disable-next-line es/no-object-defineproperty -- safe
	var defineProperty = Object.defineProperty;

	var CONFIGURABLE_LENGTH = descriptors && !fails(function () {
	  return defineProperty(function () { /* empty */ }, 'length', { value: 8 }).length !== 8;
	});

	var TEMPLATE = String(String).split('String');

	var makeBuiltIn = module.exports = function (value, name, options) {
	  if (String(name).slice(0, 7) === 'Symbol(') {
	    name = '[' + String(name).replace(/^Symbol\(([^)]*)\)/, '$1') + ']';
	  }
	  if (options && options.getter) name = 'get ' + name;
	  if (options && options.setter) name = 'set ' + name;
	  if (!hasOwnProperty_1(value, 'name') || (CONFIGURABLE_FUNCTION_NAME && value.name !== name)) {
	    if (descriptors) defineProperty(value, 'name', { value: name, configurable: true });
	    else value.name = name;
	  }
	  if (CONFIGURABLE_LENGTH && options && hasOwnProperty_1(options, 'arity') && value.length !== options.arity) {
	    defineProperty(value, 'length', { value: options.arity });
	  }
	  try {
	    if (options && hasOwnProperty_1(options, 'constructor') && options.constructor) {
	      if (descriptors) defineProperty(value, 'prototype', { writable: false });
	    // in V8 ~ Chrome 53, prototypes of some methods, like `Array.prototype.values`, are non-writable
	    } else if (value.prototype) value.prototype = undefined;
	  } catch (error) { /* empty */ }
	  var state = enforceInternalState(value);
	  if (!hasOwnProperty_1(state, 'source')) {
	    state.source = TEMPLATE.join(typeof name == 'string' ? name : '');
	  } return value;
	};

	// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
	// eslint-disable-next-line no-extend-native -- required
	Function.prototype.toString = makeBuiltIn(function toString() {
	  return isCallable(this) && getInternalState(this).source || inspectSource(this);
	}, 'toString');
	});

	var defineBuiltIn = function (O, key, value, options) {
	  if (!options) options = {};
	  var simple = options.enumerable;
	  var name = options.name !== undefined ? options.name : key;
	  if (isCallable(value)) makeBuiltIn_1(value, name, options);
	  if (options.global) {
	    if (simple) O[key] = value;
	    else defineGlobalProperty(key, value);
	  } else {
	    try {
	      if (!options.unsafe) delete O[key];
	      else if (O[key]) simple = true;
	    } catch (error) { /* empty */ }
	    if (simple) O[key] = value;
	    else objectDefineProperty.f(O, key, {
	      value: value,
	      enumerable: false,
	      configurable: !options.nonConfigurable,
	      writable: !options.nonWritable
	    });
	  } return O;
	};

	var ceil = Math.ceil;
	var floor = Math.floor;

	// `Math.trunc` method
	// https://tc39.es/ecma262/#sec-math.trunc
	// eslint-disable-next-line es/no-math-trunc -- safe
	var mathTrunc = Math.trunc || function trunc(x) {
	  var n = +x;
	  return (n > 0 ? floor : ceil)(n);
	};

	// `ToIntegerOrInfinity` abstract operation
	// https://tc39.es/ecma262/#sec-tointegerorinfinity
	var toIntegerOrInfinity = function (argument) {
	  var number = +argument;
	  // eslint-disable-next-line no-self-compare -- NaN check
	  return number !== number || number === 0 ? 0 : mathTrunc(number);
	};

	var max = Math.max;
	var min = Math.min;

	// Helper for a popular repeating case of the spec:
	// Let integer be ? ToInteger(index).
	// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
	var toAbsoluteIndex = function (index, length) {
	  var integer = toIntegerOrInfinity(index);
	  return integer < 0 ? max(integer + length, 0) : min(integer, length);
	};

	var min$1 = Math.min;

	// `ToLength` abstract operation
	// https://tc39.es/ecma262/#sec-tolength
	var toLength = function (argument) {
	  return argument > 0 ? min$1(toIntegerOrInfinity(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
	};

	// `LengthOfArrayLike` abstract operation
	// https://tc39.es/ecma262/#sec-lengthofarraylike
	var lengthOfArrayLike = function (obj) {
	  return toLength(obj.length);
	};

	// `Array.prototype.{ indexOf, includes }` methods implementation
	var createMethod = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = toIndexedObject($this);
	    var length = lengthOfArrayLike(O);
	    var index = toAbsoluteIndex(fromIndex, length);
	    var value;
	    // Array#includes uses SameValueZero equality algorithm
	    // eslint-disable-next-line no-self-compare -- NaN check
	    if (IS_INCLUDES && el != el) while (length > index) {
	      value = O[index++];
	      // eslint-disable-next-line no-self-compare -- NaN check
	      if (value != value) return true;
	    // Array#indexOf ignores holes, Array#includes - not
	    } else for (;length > index; index++) {
	      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

	var arrayIncludes = {
	  // `Array.prototype.includes` method
	  // https://tc39.es/ecma262/#sec-array.prototype.includes
	  includes: createMethod(true),
	  // `Array.prototype.indexOf` method
	  // https://tc39.es/ecma262/#sec-array.prototype.indexof
	  indexOf: createMethod(false)
	};

	var indexOf = arrayIncludes.indexOf;


	var push = functionUncurryThis([].push);

	var objectKeysInternal = function (object, names) {
	  var O = toIndexedObject(object);
	  var i = 0;
	  var result = [];
	  var key;
	  for (key in O) !hasOwnProperty_1(hiddenKeys, key) && hasOwnProperty_1(O, key) && push(result, key);
	  // Don't enum bug & hidden keys
	  while (names.length > i) if (hasOwnProperty_1(O, key = names[i++])) {
	    ~indexOf(result, key) || push(result, key);
	  }
	  return result;
	};

	// IE8- don't enum bug keys
	var enumBugKeys = [
	  'constructor',
	  'hasOwnProperty',
	  'isPrototypeOf',
	  'propertyIsEnumerable',
	  'toLocaleString',
	  'toString',
	  'valueOf'
	];

	var hiddenKeys$1 = enumBugKeys.concat('length', 'prototype');

	// `Object.getOwnPropertyNames` method
	// https://tc39.es/ecma262/#sec-object.getownpropertynames
	// eslint-disable-next-line es/no-object-getownpropertynames -- safe
	var f$3 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
	  return objectKeysInternal(O, hiddenKeys$1);
	};

	var objectGetOwnPropertyNames = {
		f: f$3
	};

	// eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
	var f$4 = Object.getOwnPropertySymbols;

	var objectGetOwnPropertySymbols = {
		f: f$4
	};

	var concat = functionUncurryThis([].concat);

	// all object keys, includes non-enumerable and symbols
	var ownKeys = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
	  var keys = objectGetOwnPropertyNames.f(anObject(it));
	  var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
	  return getOwnPropertySymbols ? concat(keys, getOwnPropertySymbols(it)) : keys;
	};

	var copyConstructorProperties = function (target, source, exceptions) {
	  var keys = ownKeys(source);
	  var defineProperty = objectDefineProperty.f;
	  var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
	  for (var i = 0; i < keys.length; i++) {
	    var key = keys[i];
	    if (!hasOwnProperty_1(target, key) && !(exceptions && hasOwnProperty_1(exceptions, key))) {
	      defineProperty(target, key, getOwnPropertyDescriptor(source, key));
	    }
	  }
	};

	var replacement = /#|\.prototype\./;

	var isForced = function (feature, detection) {
	  var value = data[normalize(feature)];
	  return value == POLYFILL ? true
	    : value == NATIVE ? false
	    : isCallable(detection) ? fails(detection)
	    : !!detection;
	};

	var normalize = isForced.normalize = function (string) {
	  return String(string).replace(replacement, '.').toLowerCase();
	};

	var data = isForced.data = {};
	var NATIVE = isForced.NATIVE = 'N';
	var POLYFILL = isForced.POLYFILL = 'P';

	var isForced_1 = isForced;

	var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;






	/*
	  options.target         - name of the target object
	  options.global         - target is the global object
	  options.stat           - export as static methods of target
	  options.proto          - export as prototype methods of target
	  options.real           - real prototype method for the `pure` version
	  options.forced         - export even if the native feature is available
	  options.bind           - bind methods to the target, required for the `pure` version
	  options.wrap           - wrap constructors to preventing global pollution, required for the `pure` version
	  options.unsafe         - use the simple assignment of property instead of delete + defineProperty
	  options.sham           - add a flag to not completely full polyfills
	  options.enumerable     - export as enumerable property
	  options.dontCallGetSet - prevent calling a getter on target
	  options.name           - the .name of the function if it does not match the key
	*/
	var _export = function (options, source) {
	  var TARGET = options.target;
	  var GLOBAL = options.global;
	  var STATIC = options.stat;
	  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
	  if (GLOBAL) {
	    target = global_1;
	  } else if (STATIC) {
	    target = global_1[TARGET] || defineGlobalProperty(TARGET, {});
	  } else {
	    target = (global_1[TARGET] || {}).prototype;
	  }
	  if (target) for (key in source) {
	    sourceProperty = source[key];
	    if (options.dontCallGetSet) {
	      descriptor = getOwnPropertyDescriptor$1(target, key);
	      targetProperty = descriptor && descriptor.value;
	    } else targetProperty = target[key];
	    FORCED = isForced_1(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
	    // contained in target
	    if (!FORCED && targetProperty !== undefined) {
	      if (typeof sourceProperty == typeof targetProperty) continue;
	      copyConstructorProperties(sourceProperty, targetProperty);
	    }
	    // add a flag to not completely full polyfills
	    if (options.sham || (targetProperty && targetProperty.sham)) {
	      createNonEnumerableProperty(sourceProperty, 'sham', true);
	    }
	    defineBuiltIn(target, key, sourceProperty, options);
	  }
	};

	var arraySlice = functionUncurryThis([].slice);

	var $Function = Function;
	var concat$1 = functionUncurryThis([].concat);
	var join = functionUncurryThis([].join);
	var factories = {};

	var construct = function (C, argsLength, args) {
	  if (!hasOwnProperty_1(factories, argsLength)) {
	    for (var list = [], i = 0; i < argsLength; i++) list[i] = 'a[' + i + ']';
	    factories[argsLength] = $Function('C,a', 'return new C(' + join(list, ',') + ')');
	  } return factories[argsLength](C, args);
	};

	// `Function.prototype.bind` method implementation
	// https://tc39.es/ecma262/#sec-function.prototype.bind
	var functionBind = functionBindNative ? $Function.bind : function bind(that /* , ...args */) {
	  var F = aCallable(this);
	  var Prototype = F.prototype;
	  var partArgs = arraySlice(arguments, 1);
	  var boundFunction = function bound(/* args... */) {
	    var args = concat$1(partArgs, arraySlice(arguments));
	    return this instanceof boundFunction ? construct(F, args.length, args) : F.apply(that, args);
	  };
	  if (isObject(Prototype)) boundFunction.prototype = Prototype;
	  return boundFunction;
	};

	// TODO: Remove from `core-js@4`



	// `Function.prototype.bind` method
	// https://tc39.es/ecma262/#sec-function.prototype.bind
	_export({ target: 'Function', proto: true, forced: Function.bind !== functionBind }, {
	  bind: functionBind
	});

	var FunctionPrototype$2 = Function.prototype;
	var apply = FunctionPrototype$2.apply;
	var call$2 = FunctionPrototype$2.call;

	// eslint-disable-next-line es/no-reflect -- safe
	var functionApply = typeof Reflect == 'object' && Reflect.apply || (functionBindNative ? call$2.bind(apply) : function () {
	  return call$2.apply(apply, arguments);
	});

	var $TypeError$6 = TypeError;

	var validateArgumentsLength = function (passed, required) {
	  if (passed < required) throw $TypeError$6('Not enough arguments');
	  return passed;
	};

	var MSIE = /MSIE .\./.test(engineUserAgent); // <- dirty ie9- check
	var Function$1 = global_1.Function;

	var wrap = function (scheduler) {
	  return MSIE ? function (handler, timeout /* , ...arguments */) {
	    var boundArgs = validateArgumentsLength(arguments.length, 1) > 2;
	    var fn = isCallable(handler) ? handler : Function$1(handler);
	    var args = boundArgs ? arraySlice(arguments, 2) : undefined;
	    return scheduler(boundArgs ? function () {
	      functionApply(fn, this, args);
	    } : fn, timeout);
	  } : scheduler;
	};

	// ie9- setTimeout & setInterval additional parameters fix
	// https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#timers
	var schedulersFix = {
	  // `setTimeout` method
	  // https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-settimeout
	  setTimeout: wrap(global_1.setTimeout),
	  // `setInterval` method
	  // https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-setinterval
	  setInterval: wrap(global_1.setInterval)
	};

	var setInterval$1 = schedulersFix.setInterval;

	// ie9- setInterval additional parameters fix
	// https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-setinterval
	_export({ global: true, bind: true, forced: global_1.setInterval !== setInterval$1 }, {
	  setInterval: setInterval$1
	});

	var setTimeout = schedulersFix.setTimeout;

	// ie9- setTimeout additional parameters fix
	// https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-settimeout
	_export({ global: true, bind: true, forced: global_1.setTimeout !== setTimeout }, {
	  setTimeout: setTimeout
	});

	var $TypeError$7 = TypeError;

	// `Array.prototype.{ reduce, reduceRight }` methods implementation
	var createMethod$1 = function (IS_RIGHT) {
	  return function (that, callbackfn, argumentsLength, memo) {
	    aCallable(callbackfn);
	    var O = toObject(that);
	    var self = indexedObject(O);
	    var length = lengthOfArrayLike(O);
	    var index = IS_RIGHT ? length - 1 : 0;
	    var i = IS_RIGHT ? -1 : 1;
	    if (argumentsLength < 2) while (true) {
	      if (index in self) {
	        memo = self[index];
	        index += i;
	        break;
	      }
	      index += i;
	      if (IS_RIGHT ? index < 0 : length <= index) {
	        throw $TypeError$7('Reduce of empty array with no initial value');
	      }
	    }
	    for (;IS_RIGHT ? index >= 0 : length > index; index += i) if (index in self) {
	      memo = callbackfn(memo, self[index], index, O);
	    }
	    return memo;
	  };
	};

	var arrayReduce = {
	  // `Array.prototype.reduce` method
	  // https://tc39.es/ecma262/#sec-array.prototype.reduce
	  left: createMethod$1(false),
	  // `Array.prototype.reduceRight` method
	  // https://tc39.es/ecma262/#sec-array.prototype.reduceright
	  right: createMethod$1(true)
	};

	var arrayMethodIsStrict = function (METHOD_NAME, argument) {
	  var method = [][METHOD_NAME];
	  return !!method && fails(function () {
	    // eslint-disable-next-line no-useless-call -- required for testing
	    method.call(null, argument || function () { return 1; }, 1);
	  });
	};

	var engineIsNode = classofRaw(global_1.process) == 'process';

	var $reduce = arrayReduce.left;




	var STRICT_METHOD = arrayMethodIsStrict('reduce');
	// Chrome 80-82 has a critical bug
	// https://bugs.chromium.org/p/chromium/issues/detail?id=1049982
	var CHROME_BUG = !engineIsNode && engineV8Version > 79 && engineV8Version < 83;

	// `Array.prototype.reduce` method
	// https://tc39.es/ecma262/#sec-array.prototype.reduce
	_export({ target: 'Array', proto: true, forced: !STRICT_METHOD || CHROME_BUG }, {
	  reduce: function reduce(callbackfn /* , initialValue */) {
	    var length = arguments.length;
	    return $reduce(this, callbackfn, length, length > 1 ? arguments[1] : undefined);
	  }
	});

	var TO_STRING_TAG = wellKnownSymbol('toStringTag');
	var test = {};

	test[TO_STRING_TAG] = 'z';

	var toStringTagSupport = String(test) === '[object z]';

	var TO_STRING_TAG$1 = wellKnownSymbol('toStringTag');
	var $Object$3 = Object;

	// ES3 wrong here
	var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

	// fallback for IE11 Script Access Denied error
	var tryGet = function (it, key) {
	  try {
	    return it[key];
	  } catch (error) { /* empty */ }
	};

	// getting tag from ES6+ `Object.prototype.toString`
	var classof = toStringTagSupport ? classofRaw : function (it) {
	  var O, tag, result;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (tag = tryGet(O = $Object$3(it), TO_STRING_TAG$1)) == 'string' ? tag
	    // builtinTag case
	    : CORRECT_ARGUMENTS ? classofRaw(O)
	    // ES3 arguments fallback
	    : (result = classofRaw(O)) == 'Object' && isCallable(O.callee) ? 'Arguments' : result;
	};

	// `Object.prototype.toString` method implementation
	// https://tc39.es/ecma262/#sec-object.prototype.tostring
	var objectToString = toStringTagSupport ? {}.toString : function toString() {
	  return '[object ' + classof(this) + ']';
	};

	// `Object.prototype.toString` method
	// https://tc39.es/ecma262/#sec-object.prototype.tostring
	if (!toStringTagSupport) {
	  defineBuiltIn(Object.prototype, 'toString', objectToString, { unsafe: true });
	}

	// `Object.keys` method
	// https://tc39.es/ecma262/#sec-object.keys
	// eslint-disable-next-line es/no-object-keys -- safe
	var objectKeys = Object.keys || function keys(O) {
	  return objectKeysInternal(O, enumBugKeys);
	};

	var FAILS_ON_PRIMITIVES = fails(function () { objectKeys(1); });

	// `Object.keys` method
	// https://tc39.es/ecma262/#sec-object.keys
	_export({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES }, {
	  keys: function keys(it) {
	    return objectKeys(toObject(it));
	  }
	});

	var bind = functionUncurryThis(functionUncurryThis.bind);

	// optional / simple context binding
	var functionBindContext = function (fn, that) {
	  aCallable(fn);
	  return that === undefined ? fn : functionBindNative ? bind(fn, that) : function (/* ...args */) {
	    return fn.apply(that, arguments);
	  };
	};

	// `IsArray` abstract operation
	// https://tc39.es/ecma262/#sec-isarray
	// eslint-disable-next-line es/no-array-isarray -- safe
	var isArray = Array.isArray || function isArray(argument) {
	  return classofRaw(argument) == 'Array';
	};

	var noop = function () { /* empty */ };
	var empty = [];
	var construct$1 = getBuiltIn('Reflect', 'construct');
	var constructorRegExp = /^\s*(?:class|function)\b/;
	var exec = functionUncurryThis(constructorRegExp.exec);
	var INCORRECT_TO_STRING = !constructorRegExp.exec(noop);

	var isConstructorModern = function isConstructor(argument) {
	  if (!isCallable(argument)) return false;
	  try {
	    construct$1(noop, empty, argument);
	    return true;
	  } catch (error) {
	    return false;
	  }
	};

	var isConstructorLegacy = function isConstructor(argument) {
	  if (!isCallable(argument)) return false;
	  switch (classof(argument)) {
	    case 'AsyncFunction':
	    case 'GeneratorFunction':
	    case 'AsyncGeneratorFunction': return false;
	  }
	  try {
	    // we can't check .prototype since constructors produced by .bind haven't it
	    // `Function#toString` throws on some built-it function in some legacy engines
	    // (for example, `DOMQuad` and similar in FF41-)
	    return INCORRECT_TO_STRING || !!exec(constructorRegExp, inspectSource(argument));
	  } catch (error) {
	    return true;
	  }
	};

	isConstructorLegacy.sham = true;

	// `IsConstructor` abstract operation
	// https://tc39.es/ecma262/#sec-isconstructor
	var isConstructor = !construct$1 || fails(function () {
	  var called;
	  return isConstructorModern(isConstructorModern.call)
	    || !isConstructorModern(Object)
	    || !isConstructorModern(function () { called = true; })
	    || called;
	}) ? isConstructorLegacy : isConstructorModern;

	var SPECIES = wellKnownSymbol('species');
	var $Array = Array;

	// a part of `ArraySpeciesCreate` abstract operation
	// https://tc39.es/ecma262/#sec-arrayspeciescreate
	var arraySpeciesConstructor = function (originalArray) {
	  var C;
	  if (isArray(originalArray)) {
	    C = originalArray.constructor;
	    // cross-realm fallback
	    if (isConstructor(C) && (C === $Array || isArray(C.prototype))) C = undefined;
	    else if (isObject(C)) {
	      C = C[SPECIES];
	      if (C === null) C = undefined;
	    }
	  } return C === undefined ? $Array : C;
	};

	// `ArraySpeciesCreate` abstract operation
	// https://tc39.es/ecma262/#sec-arrayspeciescreate
	var arraySpeciesCreate = function (originalArray, length) {
	  return new (arraySpeciesConstructor(originalArray))(length === 0 ? 0 : length);
	};

	var push$1 = functionUncurryThis([].push);

	// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterReject }` methods implementation
	var createMethod$2 = function (TYPE) {
	  var IS_MAP = TYPE == 1;
	  var IS_FILTER = TYPE == 2;
	  var IS_SOME = TYPE == 3;
	  var IS_EVERY = TYPE == 4;
	  var IS_FIND_INDEX = TYPE == 6;
	  var IS_FILTER_REJECT = TYPE == 7;
	  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
	  return function ($this, callbackfn, that, specificCreate) {
	    var O = toObject($this);
	    var self = indexedObject(O);
	    var boundFunction = functionBindContext(callbackfn, that);
	    var length = lengthOfArrayLike(self);
	    var index = 0;
	    var create = specificCreate || arraySpeciesCreate;
	    var target = IS_MAP ? create($this, length) : IS_FILTER || IS_FILTER_REJECT ? create($this, 0) : undefined;
	    var value, result;
	    for (;length > index; index++) if (NO_HOLES || index in self) {
	      value = self[index];
	      result = boundFunction(value, index, O);
	      if (TYPE) {
	        if (IS_MAP) target[index] = result; // map
	        else if (result) switch (TYPE) {
	          case 3: return true;              // some
	          case 5: return value;             // find
	          case 6: return index;             // findIndex
	          case 2: push$1(target, value);      // filter
	        } else switch (TYPE) {
	          case 4: return false;             // every
	          case 7: push$1(target, value);      // filterReject
	        }
	      }
	    }
	    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
	  };
	};

	var arrayIteration = {
	  // `Array.prototype.forEach` method
	  // https://tc39.es/ecma262/#sec-array.prototype.foreach
	  forEach: createMethod$2(0),
	  // `Array.prototype.map` method
	  // https://tc39.es/ecma262/#sec-array.prototype.map
	  map: createMethod$2(1),
	  // `Array.prototype.filter` method
	  // https://tc39.es/ecma262/#sec-array.prototype.filter
	  filter: createMethod$2(2),
	  // `Array.prototype.some` method
	  // https://tc39.es/ecma262/#sec-array.prototype.some
	  some: createMethod$2(3),
	  // `Array.prototype.every` method
	  // https://tc39.es/ecma262/#sec-array.prototype.every
	  every: createMethod$2(4),
	  // `Array.prototype.find` method
	  // https://tc39.es/ecma262/#sec-array.prototype.find
	  find: createMethod$2(5),
	  // `Array.prototype.findIndex` method
	  // https://tc39.es/ecma262/#sec-array.prototype.findIndex
	  findIndex: createMethod$2(6),
	  // `Array.prototype.filterReject` method
	  // https://github.com/tc39/proposal-array-filtering
	  filterReject: createMethod$2(7)
	};

	var $forEach = arrayIteration.forEach;


	var STRICT_METHOD$1 = arrayMethodIsStrict('forEach');

	// `Array.prototype.forEach` method implementation
	// https://tc39.es/ecma262/#sec-array.prototype.foreach
	var arrayForEach = !STRICT_METHOD$1 ? function forEach(callbackfn /* , thisArg */) {
	  return $forEach(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	// eslint-disable-next-line es/no-array-prototype-foreach -- safe
	} : [].forEach;

	// `Array.prototype.forEach` method
	// https://tc39.es/ecma262/#sec-array.prototype.foreach
	// eslint-disable-next-line es/no-array-prototype-foreach -- safe
	_export({ target: 'Array', proto: true, forced: [].forEach != arrayForEach }, {
	  forEach: arrayForEach
	});

	// iterable DOM collections
	// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
	var domIterables = {
	  CSSRuleList: 0,
	  CSSStyleDeclaration: 0,
	  CSSValueList: 0,
	  ClientRectList: 0,
	  DOMRectList: 0,
	  DOMStringList: 0,
	  DOMTokenList: 1,
	  DataTransferItemList: 0,
	  FileList: 0,
	  HTMLAllCollection: 0,
	  HTMLCollection: 0,
	  HTMLFormElement: 0,
	  HTMLSelectElement: 0,
	  MediaList: 0,
	  MimeTypeArray: 0,
	  NamedNodeMap: 0,
	  NodeList: 1,
	  PaintRequestList: 0,
	  Plugin: 0,
	  PluginArray: 0,
	  SVGLengthList: 0,
	  SVGNumberList: 0,
	  SVGPathSegList: 0,
	  SVGPointList: 0,
	  SVGStringList: 0,
	  SVGTransformList: 0,
	  SourceBufferList: 0,
	  StyleSheetList: 0,
	  TextTrackCueList: 0,
	  TextTrackList: 0,
	  TouchList: 0
	};

	// in old WebKit versions, `element.classList` is not an instance of global `DOMTokenList`


	var classList = documentCreateElement('span').classList;
	var DOMTokenListPrototype = classList && classList.constructor && classList.constructor.prototype;

	var domTokenListPrototype = DOMTokenListPrototype === Object.prototype ? undefined : DOMTokenListPrototype;

	var handlePrototype = function (CollectionPrototype) {
	  // some Chrome versions have non-configurable methods on DOMTokenList
	  if (CollectionPrototype && CollectionPrototype.forEach !== arrayForEach) try {
	    createNonEnumerableProperty(CollectionPrototype, 'forEach', arrayForEach);
	  } catch (error) {
	    CollectionPrototype.forEach = arrayForEach;
	  }
	};

	for (var COLLECTION_NAME in domIterables) {
	  if (domIterables[COLLECTION_NAME]) {
	    handlePrototype(global_1[COLLECTION_NAME] && global_1[COLLECTION_NAME].prototype);
	  }
	}

	handlePrototype(domTokenListPrototype);

	/* eslint-disable es/no-array-prototype-indexof -- required for testing */


	var $indexOf = arrayIncludes.indexOf;


	var nativeIndexOf = functionUncurryThis([].indexOf);

	var NEGATIVE_ZERO = !!nativeIndexOf && 1 / nativeIndexOf([1], 1, -0) < 0;
	var STRICT_METHOD$2 = arrayMethodIsStrict('indexOf');

	// `Array.prototype.indexOf` method
	// https://tc39.es/ecma262/#sec-array.prototype.indexof
	_export({ target: 'Array', proto: true, forced: NEGATIVE_ZERO || !STRICT_METHOD$2 }, {
	  indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
	    var fromIndex = arguments.length > 1 ? arguments[1] : undefined;
	    return NEGATIVE_ZERO
	      // convert -0 to +0
	      ? nativeIndexOf(this, searchElement, fromIndex) || 0
	      : $indexOf(this, searchElement, fromIndex);
	  }
	});

	var $String$2 = String;

	var toString_1 = function (argument) {
	  if (classof(argument) === 'Symbol') throw TypeError('Cannot convert a Symbol value to a string');
	  return $String$2(argument);
	};

	// `RegExp.prototype.flags` getter implementation
	// https://tc39.es/ecma262/#sec-get-regexp.prototype.flags
	var regexpFlags = function () {
	  var that = anObject(this);
	  var result = '';
	  if (that.hasIndices) result += 'd';
	  if (that.global) result += 'g';
	  if (that.ignoreCase) result += 'i';
	  if (that.multiline) result += 'm';
	  if (that.dotAll) result += 's';
	  if (that.unicode) result += 'u';
	  if (that.unicodeSets) result += 'v';
	  if (that.sticky) result += 'y';
	  return result;
	};

	// babel-minify and Closure Compiler transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError
	var $RegExp = global_1.RegExp;

	var UNSUPPORTED_Y = fails(function () {
	  var re = $RegExp('a', 'y');
	  re.lastIndex = 2;
	  return re.exec('abcd') != null;
	});

	// UC Browser bug
	// https://github.com/zloirock/core-js/issues/1008
	var MISSED_STICKY = UNSUPPORTED_Y || fails(function () {
	  return !$RegExp('a', 'y').sticky;
	});

	var BROKEN_CARET = UNSUPPORTED_Y || fails(function () {
	  // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
	  var re = $RegExp('^r', 'gy');
	  re.lastIndex = 2;
	  return re.exec('str') != null;
	});

	var regexpStickyHelpers = {
	  BROKEN_CARET: BROKEN_CARET,
	  MISSED_STICKY: MISSED_STICKY,
	  UNSUPPORTED_Y: UNSUPPORTED_Y
	};

	// `Object.defineProperties` method
	// https://tc39.es/ecma262/#sec-object.defineproperties
	// eslint-disable-next-line es/no-object-defineproperties -- safe
	var f$5 = descriptors && !v8PrototypeDefineBug ? Object.defineProperties : function defineProperties(O, Properties) {
	  anObject(O);
	  var props = toIndexedObject(Properties);
	  var keys = objectKeys(Properties);
	  var length = keys.length;
	  var index = 0;
	  var key;
	  while (length > index) objectDefineProperty.f(O, key = keys[index++], props[key]);
	  return O;
	};

	var objectDefineProperties = {
		f: f$5
	};

	var html = getBuiltIn('document', 'documentElement');

	/* global ActiveXObject -- old IE, WSH */








	var GT = '>';
	var LT = '<';
	var PROTOTYPE = 'prototype';
	var SCRIPT = 'script';
	var IE_PROTO = sharedKey('IE_PROTO');

	var EmptyConstructor = function () { /* empty */ };

	var scriptTag = function (content) {
	  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
	};

	// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
	var NullProtoObjectViaActiveX = function (activeXDocument) {
	  activeXDocument.write(scriptTag(''));
	  activeXDocument.close();
	  var temp = activeXDocument.parentWindow.Object;
	  activeXDocument = null; // avoid memory leak
	  return temp;
	};

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var NullProtoObjectViaIFrame = function () {
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = documentCreateElement('iframe');
	  var JS = 'java' + SCRIPT + ':';
	  var iframeDocument;
	  iframe.style.display = 'none';
	  html.appendChild(iframe);
	  // https://github.com/zloirock/core-js/issues/475
	  iframe.src = String(JS);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(scriptTag('document.F=Object'));
	  iframeDocument.close();
	  return iframeDocument.F;
	};

	// Check for document.domain and active x support
	// No need to use active x approach when document.domain is not set
	// see https://github.com/es-shims/es5-shim/issues/150
	// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
	// avoid IE GC bug
	var activeXDocument;
	var NullProtoObject = function () {
	  try {
	    activeXDocument = new ActiveXObject('htmlfile');
	  } catch (error) { /* ignore */ }
	  NullProtoObject = typeof document != 'undefined'
	    ? document.domain && activeXDocument
	      ? NullProtoObjectViaActiveX(activeXDocument) // old IE
	      : NullProtoObjectViaIFrame()
	    : NullProtoObjectViaActiveX(activeXDocument); // WSH
	  var length = enumBugKeys.length;
	  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
	  return NullProtoObject();
	};

	hiddenKeys[IE_PROTO] = true;

	// `Object.create` method
	// https://tc39.es/ecma262/#sec-object.create
	// eslint-disable-next-line es/no-object-create -- safe
	var objectCreate = Object.create || function create(O, Properties) {
	  var result;
	  if (O !== null) {
	    EmptyConstructor[PROTOTYPE] = anObject(O);
	    result = new EmptyConstructor();
	    EmptyConstructor[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = NullProtoObject();
	  return Properties === undefined ? result : objectDefineProperties.f(result, Properties);
	};

	// babel-minify and Closure Compiler transpiles RegExp('.', 's') -> /./s and it causes SyntaxError
	var $RegExp$1 = global_1.RegExp;

	var regexpUnsupportedDotAll = fails(function () {
	  var re = $RegExp$1('.', 's');
	  return !(re.dotAll && re.exec('\n') && re.flags === 's');
	});

	// babel-minify and Closure Compiler transpiles RegExp('(?<a>b)', 'g') -> /(?<a>b)/g and it causes SyntaxError
	var $RegExp$2 = global_1.RegExp;

	var regexpUnsupportedNcg = fails(function () {
	  var re = $RegExp$2('(?<a>b)', 'g');
	  return re.exec('b').groups.a !== 'b' ||
	    'b'.replace(re, '$<a>c') !== 'bc';
	});

	/* eslint-disable regexp/no-empty-capturing-group, regexp/no-empty-group, regexp/no-lazy-ends -- testing */
	/* eslint-disable regexp/no-useless-quantifier -- testing */







	var getInternalState = internalState.get;



	var nativeReplace = shared('native-string-replace', String.prototype.replace);
	var nativeExec = RegExp.prototype.exec;
	var patchedExec = nativeExec;
	var charAt = functionUncurryThis(''.charAt);
	var indexOf$1 = functionUncurryThis(''.indexOf);
	var replace = functionUncurryThis(''.replace);
	var stringSlice$1 = functionUncurryThis(''.slice);

	var UPDATES_LAST_INDEX_WRONG = (function () {
	  var re1 = /a/;
	  var re2 = /b*/g;
	  functionCall(nativeExec, re1, 'a');
	  functionCall(nativeExec, re2, 'a');
	  return re1.lastIndex !== 0 || re2.lastIndex !== 0;
	})();

	var UNSUPPORTED_Y$1 = regexpStickyHelpers.BROKEN_CARET;

	// nonparticipating capturing group, copied from es5-shim's String#split patch.
	var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

	var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y$1 || regexpUnsupportedDotAll || regexpUnsupportedNcg;

	if (PATCH) {
	  patchedExec = function exec(string) {
	    var re = this;
	    var state = getInternalState(re);
	    var str = toString_1(string);
	    var raw = state.raw;
	    var result, reCopy, lastIndex, match, i, object, group;

	    if (raw) {
	      raw.lastIndex = re.lastIndex;
	      result = functionCall(patchedExec, raw, str);
	      re.lastIndex = raw.lastIndex;
	      return result;
	    }

	    var groups = state.groups;
	    var sticky = UNSUPPORTED_Y$1 && re.sticky;
	    var flags = functionCall(regexpFlags, re);
	    var source = re.source;
	    var charsAdded = 0;
	    var strCopy = str;

	    if (sticky) {
	      flags = replace(flags, 'y', '');
	      if (indexOf$1(flags, 'g') === -1) {
	        flags += 'g';
	      }

	      strCopy = stringSlice$1(str, re.lastIndex);
	      // Support anchored sticky behavior.
	      if (re.lastIndex > 0 && (!re.multiline || re.multiline && charAt(str, re.lastIndex - 1) !== '\n')) {
	        source = '(?: ' + source + ')';
	        strCopy = ' ' + strCopy;
	        charsAdded++;
	      }
	      // ^(? + rx + ) is needed, in combination with some str slicing, to
	      // simulate the 'y' flag.
	      reCopy = new RegExp('^(?:' + source + ')', flags);
	    }

	    if (NPCG_INCLUDED) {
	      reCopy = new RegExp('^' + source + '$(?!\\s)', flags);
	    }
	    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;

	    match = functionCall(nativeExec, sticky ? reCopy : re, strCopy);

	    if (sticky) {
	      if (match) {
	        match.input = stringSlice$1(match.input, charsAdded);
	        match[0] = stringSlice$1(match[0], charsAdded);
	        match.index = re.lastIndex;
	        re.lastIndex += match[0].length;
	      } else re.lastIndex = 0;
	    } else if (UPDATES_LAST_INDEX_WRONG && match) {
	      re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
	    }
	    if (NPCG_INCLUDED && match && match.length > 1) {
	      // Fix browsers whose `exec` methods don't consistently return `undefined`
	      // for NPCG, like IE8. NOTE: This doesn't work for /(.?)?/
	      functionCall(nativeReplace, match[0], reCopy, function () {
	        for (i = 1; i < arguments.length - 2; i++) {
	          if (arguments[i] === undefined) match[i] = undefined;
	        }
	      });
	    }

	    if (match && groups) {
	      match.groups = object = objectCreate(null);
	      for (i = 0; i < groups.length; i++) {
	        group = groups[i];
	        object[group[0]] = match[group[1]];
	      }
	    }

	    return match;
	  };
	}

	var regexpExec = patchedExec;

	// `RegExp.prototype.exec` method
	// https://tc39.es/ecma262/#sec-regexp.prototype.exec
	_export({ target: 'RegExp', proto: true, forced: /./.exec !== regexpExec }, {
	  exec: regexpExec
	});

	// a string of all valid unicode whitespaces
	var whitespaces = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002' +
	  '\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

	var replace$1 = functionUncurryThis(''.replace);
	var whitespace = '[' + whitespaces + ']';
	var ltrim = RegExp('^' + whitespace + whitespace + '*');
	var rtrim = RegExp(whitespace + whitespace + '*$');

	// `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation
	var createMethod$3 = function (TYPE) {
	  return function ($this) {
	    var string = toString_1(requireObjectCoercible($this));
	    if (TYPE & 1) string = replace$1(string, ltrim, '');
	    if (TYPE & 2) string = replace$1(string, rtrim, '');
	    return string;
	  };
	};

	var stringTrim = {
	  // `String.prototype.{ trimLeft, trimStart }` methods
	  // https://tc39.es/ecma262/#sec-string.prototype.trimstart
	  start: createMethod$3(1),
	  // `String.prototype.{ trimRight, trimEnd }` methods
	  // https://tc39.es/ecma262/#sec-string.prototype.trimend
	  end: createMethod$3(2),
	  // `String.prototype.trim` method
	  // https://tc39.es/ecma262/#sec-string.prototype.trim
	  trim: createMethod$3(3)
	};

	var trim = stringTrim.trim;


	var charAt$1 = functionUncurryThis(''.charAt);
	var $parseFloat = global_1.parseFloat;
	var Symbol$2 = global_1.Symbol;
	var ITERATOR = Symbol$2 && Symbol$2.iterator;
	var FORCED = 1 / $parseFloat(whitespaces + '-0') !== -Infinity
	  // MS Edge 18- broken with boxed symbols
	  || (ITERATOR && !fails(function () { $parseFloat(Object(ITERATOR)); }));

	// `parseFloat` method
	// https://tc39.es/ecma262/#sec-parsefloat-string
	var numberParseFloat = FORCED ? function parseFloat(string) {
	  var trimmedString = trim(toString_1(string));
	  var result = $parseFloat(trimmedString);
	  return result === 0 && charAt$1(trimmedString, 0) == '-' ? -0 : result;
	} : $parseFloat;

	// `parseFloat` method
	// https://tc39.es/ecma262/#sec-parsefloat-string
	_export({ global: true, forced: parseFloat != numberParseFloat }, {
	  parseFloat: numberParseFloat
	});

	var $String$3 = String;
	var $TypeError$8 = TypeError;

	var aPossiblePrototype = function (argument) {
	  if (typeof argument == 'object' || isCallable(argument)) return argument;
	  throw $TypeError$8("Can't set " + $String$3(argument) + ' as a prototype');
	};

	/* eslint-disable no-proto -- safe */




	// `Object.setPrototypeOf` method
	// https://tc39.es/ecma262/#sec-object.setprototypeof
	// Works with __proto__ only. Old v8 can't work with null proto objects.
	// eslint-disable-next-line es/no-object-setprototypeof -- safe
	var objectSetPrototypeOf = Object.setPrototypeOf || ('__proto__' in {} ? function () {
	  var CORRECT_SETTER = false;
	  var test = {};
	  var setter;
	  try {
	    // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	    setter = functionUncurryThis(Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set);
	    setter(test, []);
	    CORRECT_SETTER = test instanceof Array;
	  } catch (error) { /* empty */ }
	  return function setPrototypeOf(O, proto) {
	    anObject(O);
	    aPossiblePrototype(proto);
	    if (CORRECT_SETTER) setter(O, proto);
	    else O.__proto__ = proto;
	    return O;
	  };
	}() : undefined);

	// makes subclassing work correct for wrapped built-ins
	var inheritIfRequired = function ($this, dummy, Wrapper) {
	  var NewTarget, NewTargetPrototype;
	  if (
	    // it can work only with native `setPrototypeOf`
	    objectSetPrototypeOf &&
	    // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
	    isCallable(NewTarget = dummy.constructor) &&
	    NewTarget !== Wrapper &&
	    isObject(NewTargetPrototype = NewTarget.prototype) &&
	    NewTargetPrototype !== Wrapper.prototype
	  ) objectSetPrototypeOf($this, NewTargetPrototype);
	  return $this;
	};

	// `thisNumberValue` abstract operation
	// https://tc39.es/ecma262/#sec-thisnumbervalue
	var thisNumberValue = functionUncurryThis(1.0.valueOf);

	var getOwnPropertyNames = objectGetOwnPropertyNames.f;
	var getOwnPropertyDescriptor$2 = objectGetOwnPropertyDescriptor.f;
	var defineProperty$1 = objectDefineProperty.f;

	var trim$1 = stringTrim.trim;

	var NUMBER = 'Number';
	var NativeNumber = global_1[NUMBER];
	var NumberPrototype = NativeNumber.prototype;
	var TypeError$2 = global_1.TypeError;
	var arraySlice$1 = functionUncurryThis(''.slice);
	var charCodeAt = functionUncurryThis(''.charCodeAt);

	// `ToNumeric` abstract operation
	// https://tc39.es/ecma262/#sec-tonumeric
	var toNumeric = function (value) {
	  var primValue = toPrimitive(value, 'number');
	  return typeof primValue == 'bigint' ? primValue : toNumber(primValue);
	};

	// `ToNumber` abstract operation
	// https://tc39.es/ecma262/#sec-tonumber
	var toNumber = function (argument) {
	  var it = toPrimitive(argument, 'number');
	  var first, third, radix, maxCode, digits, length, index, code;
	  if (isSymbol(it)) throw TypeError$2('Cannot convert a Symbol value to a number');
	  if (typeof it == 'string' && it.length > 2) {
	    it = trim$1(it);
	    first = charCodeAt(it, 0);
	    if (first === 43 || first === 45) {
	      third = charCodeAt(it, 2);
	      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
	    } else if (first === 48) {
	      switch (charCodeAt(it, 1)) {
	        case 66: case 98: radix = 2; maxCode = 49; break; // fast equal of /^0b[01]+$/i
	        case 79: case 111: radix = 8; maxCode = 55; break; // fast equal of /^0o[0-7]+$/i
	        default: return +it;
	      }
	      digits = arraySlice$1(it, 2);
	      length = digits.length;
	      for (index = 0; index < length; index++) {
	        code = charCodeAt(digits, index);
	        // parseInt parses a string to a first unavailable symbol
	        // but ToNumber should return NaN if a string contains unavailable symbols
	        if (code < 48 || code > maxCode) return NaN;
	      } return parseInt(digits, radix);
	    }
	  } return +it;
	};

	// `Number` constructor
	// https://tc39.es/ecma262/#sec-number-constructor
	if (isForced_1(NUMBER, !NativeNumber(' 0o1') || !NativeNumber('0b1') || NativeNumber('+0x1'))) {
	  var NumberWrapper = function Number(value) {
	    var n = arguments.length < 1 ? 0 : NativeNumber(toNumeric(value));
	    var dummy = this;
	    // check on 1..constructor(foo) case
	    return objectIsPrototypeOf(NumberPrototype, dummy) && fails(function () { thisNumberValue(dummy); })
	      ? inheritIfRequired(Object(n), dummy, NumberWrapper) : n;
	  };
	  for (var keys$1 = descriptors ? getOwnPropertyNames(NativeNumber) : (
	    // ES3:
	    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
	    // ES2015 (in case, if modules with ES2015 Number statics required before):
	    'EPSILON,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,isFinite,isInteger,isNaN,isSafeInteger,parseFloat,parseInt,' +
	    // ESNext
	    'fromString,range'
	  ).split(','), j = 0, key; keys$1.length > j; j++) {
	    if (hasOwnProperty_1(NativeNumber, key = keys$1[j]) && !hasOwnProperty_1(NumberWrapper, key)) {
	      defineProperty$1(NumberWrapper, key, getOwnPropertyDescriptor$2(NativeNumber, key));
	    }
	  }
	  NumberWrapper.prototype = NumberPrototype;
	  NumberPrototype.constructor = NumberWrapper;
	  defineBuiltIn(global_1, NUMBER, NumberWrapper, { constructor: true });
	}

	var Inertia = function Inertia(onInertiaMove, opt) {
	  this.options = core_mjs.util.assign({
	    friction: 0.92
	  }, opt);
	  this._isDragging = false;
	  this._dragLastX = 0;
	  this._dragLastY = 0;
	  this._dragDeltaX = 0;
	  this._dragDeltaY = 0;
	  this._dragLastDeltaX = 0;
	  this._dragLastDeltaY = 0;
	  this._velocityX = 0;
	  this._velocityY = 0;
	  this._requestAnimationFrameId = -1;
	  this.onInertiaMove = onInertiaMove;
	};
	Inertia.prototype.approxZero = function (number) {
	  return Math.abs(number) < 0.5;
	};
	Inertia.prototype.updateVelocity = function () {
	  var _velocityX = this._velocityX,
	    _velocityY = this._velocityY,
	    _isDragging = this._isDragging,
	    options = this.options,
	    onInertiaMove = this.onInertiaMove;
	  if (!_isDragging && this.approxZero(_velocityX) && this.approxZero(_velocityY)) return;
	  this._requestAnimationFrameId = core_mjs.util.nextFrame(this.updateVelocity.bind(this));
	  if (_isDragging) {
	    this._dragLastDeltaX = this._dragDeltaX;
	    this._dragLastDeltaY = this._dragDeltaY;
	    this._dragDeltaX = this._dragLastX;
	    this._dragDeltaY = this._dragLastY;
	    this._velocityX = this._dragDeltaX - this._dragLastDeltaX;
	    this._velocityY = this._dragDeltaY - this._dragLastDeltaY;
	  } else {
	    var deltaX = _velocityX;
	    var deltaY = _velocityY;
	    var friction = options.friction;
	    this._velocityX *= friction;
	    this._velocityY *= friction;
	    this._dragLastX += deltaX;
	    this._dragLastY += deltaY;
	    if (typeof onInertiaMove === 'function') {
	      onInertiaMove(deltaX, deltaY);
	    }
	  }
	};
	Inertia.prototype.handleDragStart = function (event) {
	  this._isDragging = true;
	  this._dragLastX = event.clientX;
	  this._dragLastY = event.clientY;
	  this._velocityX = 0;
	  this._velocityY = 0;
	  core_mjs.util.cancelFrame(this._requestAnimationFrameId);
	  this.updateVelocity();
	};
	Inertia.prototype.handleDragMove = function (event) {
	  this._dragLastX = event.clientX;
	  this._dragLastY = event.clientY;
	};
	Inertia.prototype.handleDragEnd = function (_event) {
	  this._isDragging = false;
	};

	var PaperScroller = core_mjs.mvc.View.extend({
	  className: 'paper-scroller',
	  events: {
	    'scroll': 'onScroll'
	  },
	  options: {
	    paper: undefined,
	    // Default padding makes sure the paper inside the paperScroller is always panable
	    // all the way left, right, bottom and top.
	    // It also makes sure that there is always at least a fragment of the paper visible.
	    // Example usage:
	    //   padding: 10
	    //   padding: { left: 20, right: 20 }
	    //   padding: function() { return 10; }
	    padding: function padding() {
	      var clientSize = this.getClientSize();
	      var minVisibleSize = Math.max(this.options.minVisiblePaperSize, 1) || 1;
	      var padding = {};
	      padding.left = padding.right = Math.max(clientSize.width - minVisibleSize, 0);
	      padding.top = padding.bottom = Math.max(clientSize.height - minVisibleSize, 0);
	      return padding;
	    },
	    scrollWhileDragging: false,
	    // Minimal size (px) of the paper that has to stay visible.
	    // Used by the default padding method only.
	    minVisiblePaperSize: 50,
	    autoResizePaper: false,
	    baseWidth: undefined,
	    baseHeight: undefined,
	    contentOptions: undefined,
	    cursor: 'default',
	    inertia: false,
	    borderless: false
	  },
	  // Internal padding storage
	  _padding: {
	    left: 0,
	    top: 0
	  },
	  init: function init() {
	    var _this = this;
	    core_mjs.util.bindAll(this, 'startPanning', 'stopPanning', 'pan', 'onBackgroundEvent');
	    var options = this.options,
	      el = this.el;
	    var paper = options.paper,
	      autoResizePaper = options.autoResizePaper,
	      scrollWhileDragging = options.scrollWhileDragging,
	      cursor = options.cursor,
	      inertia = options.inertia;

	    // keep scale values for a quicker access
	    var initScale = paper.scale();
	    this._sx = initScale.sx;
	    this._sy = initScale.sy;

	    // if the base paper dimension is not specified use the paper size.
	    options.baseWidth === undefined && (options.baseWidth = paper.options.width);
	    options.baseHeight === undefined && (options.baseHeight = paper.options.height);
	    this.$background = $('<div/>').addClass('paper-scroller-background').css({
	      width: paper.options.width,
	      height: paper.options.height
	    }).append(paper.el).appendTo(el);
	    this.listenTo(paper, 'scale', this.onScale).listenTo(paper, 'resize', this.onResize).listenTo(paper, 'beforeprint beforeexport', this.storeScrollPosition).listenTo(paper, 'afterprint afterexport', this.restoreScrollPosition);

	    // automatically resize the paper
	    if (autoResizePaper) {
	      this.listenTo(paper, 'render:done', this.onPaperRenderDone);
	    }
	    if (scrollWhileDragging) {
	      this.listenTo(paper, 'cell:pointermove', this.onCellPointermove);
	      this.listenTo(paper, 'cell:pointerup', this.onCellPointerup);
	    }
	    this.debouncedStoreCenter = core_mjs.util.debounce(function () {
	      return _this.storeCenter();
	    });
	    this.storeCenter(paper.options.width / 2, paper.options.height / 2);
	    this.delegateBackgroundEvents();
	    this.setCursor(cursor);
	    if (inertia) {
	      this.inertia = new Inertia(function (deltaX, deltaY) {
	        var el = this.el;
	        el.scrollTop -= deltaY;
	        el.scrollLeft -= deltaX;
	      }.bind(this), inertia);
	    }
	  },
	  onCellPointermove: function onCellPointermove(_, evt, x, y) {
	    var scrollWhileDragging = this.options.scrollWhileDragging;
	    if (!scrollWhileDragging) return;
	    this.scrollWhileDragging(evt, x, y, scrollWhileDragging);
	  },
	  onCellPointerup: function onCellPointerup(_, evt) {
	    this.stopScrollWhileDragging(evt);
	  },
	  scrollWhileDragging: function scrollWhileDragging(evt, x, y) {
	    var opt = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
	    var el = this.el;
	    var _opt$interval = opt.interval,
	      interval = _opt$interval === void 0 ? 25 : _opt$interval,
	      _opt$padding = opt.padding,
	      padding = _opt$padding === void 0 ? -20 : _opt$padding,
	      _opt$scrollingFunctio = opt.scrollingFunction,
	      scrollingFunction = _opt$scrollingFunctio === void 0 ? function (distance) {
	        return distance < 20 ? 5 : 20;
	      } : _opt$scrollingFunctio;
	    var _this$eventData = this.eventData(evt),
	      scrollId = _this$eventData.scrollId;
	    var coordinates = new core_mjs.g.Point(x, y);
	    var _util$normalizeSides = core_mjs.util.normalizeSides(padding),
	      top = _util$normalizeSides.top,
	      left = _util$normalizeSides.left,
	      right = _util$normalizeSides.right,
	      bottom = _util$normalizeSides.bottom;
	    var area = this.getVisibleArea().moveAndExpand({
	      x: -left,
	      y: -top,
	      width: left + right,
	      height: top + bottom
	    });
	    if (area.containsPoint(coordinates)) {
	      clearInterval(scrollId);
	      this.eventData(evt, {
	        scrollId: null
	      });
	      return;
	    }
	    var areaPoint = area.pointNearestToPoint(coordinates);
	    var distance = areaPoint.distance(coordinates);
	    var scrollPerTick = scrollingFunction.call(this, distance, evt);

	    // Find Scroll Direction
	    var areaX = area.x,
	      areaY = area.y,
	      areaWidth = area.width,
	      areaHeight = area.height;
	    var scrollX = x < areaX ? -1 : x > areaX + areaWidth ? 1 : 0;
	    var scrollY = y < areaY ? -1 : y > areaY + areaHeight ? 1 : 0;
	    this.eventData(evt, {
	      scrollX: scrollX,
	      scrollY: scrollY,
	      scrollPerTick: scrollPerTick,
	      container: el
	    });
	    if (scrollId) return;
	    var data = this.eventData(evt);
	    // Start Scrolling
	    scrollId = setInterval(function (_ref) {
	      var scrollPerTick = _ref.scrollPerTick,
	        scrollX = _ref.scrollX,
	        scrollY = _ref.scrollY,
	        container = _ref.container;
	      container.scrollLeft += scrollPerTick * scrollX;
	      container.scrollTop += scrollPerTick * scrollY;
	    }, interval, data);
	    data.scrollId = scrollId;
	  },
	  stopScrollWhileDragging: function stopScrollWhileDragging(evt) {
	    var _this$eventData2 = this.eventData(evt),
	      scrollId = _this$eventData2.scrollId;
	    if (scrollId) clearInterval(scrollId);
	  },
	  onPaperRenderDone: function onPaperRenderDone(stats) {
	    // Adjust paper for cell updates only
	    if (stats.priority < 2) this.adjustPaper();
	  },
	  lock: function lock() {
	    this.$el.css('overflow', 'hidden');
	    return this;
	  },
	  unlock: function unlock() {
	    this.$el.css('overflow', 'scroll');
	    return this;
	  },
	  setCursor: function setCursor(cursor) {
	    switch (cursor) {
	      case 'grab':
	        // Make a special case for the cursor above
	        // due to bad support across browsers.
	        // It's handled in `layout.css`.
	        this.$el.css('cursor', '');
	        break;
	      default:
	        this.$el.css('cursor', cursor);
	        break;
	    }
	    this.$el.attr('data-cursor', cursor);
	    this.options.cursor = cursor;
	    return this;
	  },
	  // Set up listeners for passing events from outside the paper to the paper
	  delegateBackgroundEvents: function delegateBackgroundEvents(events) {
	    events || (events = core_mjs.util.result(this.options.paper, 'events'));
	    var normalizedEvents = this.paperEvents = Object.keys(events || {}).reduce(normalizeEvents.bind(this), {});
	    Object.keys(normalizedEvents).forEach(delegateBackgroundEvent, this);
	    function normalizeEvents(res, event) {
	      var listener = events[event];
	      // skip events with selectors
	      if (event.indexOf(' ') === -1) {
	        res[event] = core_mjs.util.isFunction(listener) ? listener : this.options.paper[listener];
	      }
	      return res;
	    }
	    function delegateBackgroundEvent(event) {
	      // Sending event data with `guarded=false` to prevent events from
	      // being guarded by the paper.
	      this.delegate(event, {
	        guarded: false
	      }, this.onBackgroundEvent);
	    }
	    return this;
	  },
	  // Pass the event outside the paper to the paper.
	  onBackgroundEvent: function onBackgroundEvent(evt) {
	    if (this.$background.is(evt.target)) {
	      var listener = this.paperEvents[evt.type];
	      if (core_mjs.util.isFunction(listener)) {
	        listener.apply(this.options.paper, arguments);
	      }
	    }
	  },
	  onScroll: function onScroll(evt) {
	    this.trigger('scroll', evt);
	    this.debouncedStoreCenter();
	  },
	  onResize: function onResize() {
	    // Move scroller so the user sees the same area as before the resizing.
	    this.restoreCenter();
	  },
	  onScale: function onScale(sx, sy, ox, oy) {
	    this.adjustScale(sx, sy);

	    // update scale values for a quicker access
	    this._sx = sx;
	    this._sy = sy;

	    // Move scroller to scale origin.
	    if (ox || oy) this.center(ox, oy);
	    var _this$options = this.options,
	      contentOptions = _this$options.contentOptions,
	      borderless = _this$options.borderless;
	    if (typeof contentOptions === 'function' || borderless) {
	      this.adjustPaper();
	    }
	  },
	  storeScrollPosition: function storeScrollPosition() {
	    this._scrollLeftBeforePrint = this.el.scrollLeft;
	    this._scrollTopBeforePrint = this.el.scrollTop;
	  },
	  restoreScrollPosition: function restoreScrollPosition() {
	    // Set the paper element to the scroll position before printing.
	    this.el.scrollLeft = this._scrollLeftBeforePrint;
	    this.el.scrollTop = this._scrollTopBeforePrint;

	    // Clean-up.
	    this._scrollLeftBeforePrint = null;
	    this._scrollTopBeforePrint = null;
	  },
	  beforePaperManipulation: function beforePaperManipulation() {
	    if (core_mjs.env.test('msie') || core_mjs.env.test('msedge')) {
	      // IE is trying to show every frame while we manipulate the paper.
	      // That makes the viewport kind of jumping while zooming for example.
	      // Make the paperScroller invisible fixes this.
	      // MSEDGE seems to have a problem with text positions after the animation.
	      this.$el.css('visibility', 'hidden');
	    }
	  },
	  afterPaperManipulation: function afterPaperManipulation() {
	    if (core_mjs.env.test('msie') || core_mjs.env.test('msedge')) {
	      this.$el.css('visibility', 'visible');
	    }
	  },
	  clientToLocalPoint: function clientToLocalPoint(x, y) {
	    var ctm = this.options.paper.matrix();
	    x += this.getLTRScrollLeft() - this._padding.left - ctm.e;
	    x /= ctm.a;
	    y += this.el.scrollTop - this._padding.top - ctm.f;
	    y /= ctm.d;
	    return new core_mjs.g.Point(x, y);
	  },
	  localToBackgroundPoint: function localToBackgroundPoint(x, y) {
	    var localPoint = new core_mjs.g.Point(x, y);
	    var ctm = this.options.paper.matrix();
	    var padding = this._padding;
	    return core_mjs.V.transformPoint(localPoint, ctm).offset(padding.left, padding.top);
	  },
	  getPadding: function getPadding() {
	    var padding = this.options.padding;
	    if (core_mjs.util.isFunction(padding)) {
	      padding = padding.call(this, this);
	    }
	    return core_mjs.util.normalizeSides(padding);
	  },
	  computeRequiredPadding: function computeRequiredPadding(rect) {
	    // rect is in the paper's coordinate system
	    var _this$options$paper$s = this.options.paper.scale(),
	      sx = _this$options$paper$s.sx,
	      sy = _this$options$paper$s.sy;
	    var _this$getCenter = this.getCenter(),
	      x = _this$getCenter.x,
	      y = _this$getCenter.y;
	    x *= sx;
	    y *= sy;
	    // the paper rectangle
	    // x1,y1 ---------
	    // |             |
	    // ----------- x2,y2
	    var x1 = rect.x;
	    var y1 = rect.y;
	    var x2 = x1 + rect.width;
	    var y2 = y1 + rect.height;
	    // the distance from a border to the center (where we want the `point` to be placed)
	    var clientSize = this.getClientSize();
	    var cx = clientSize.width / 2;
	    var cy = clientSize.height / 2;
	    // get user defined padding
	    var _this$getPadding = this.getPadding(),
	      left = _this$getPadding.left,
	      right = _this$getPadding.right,
	      top = _this$getPadding.top,
	      bottom = _this$getPadding.bottom;
	    // calculate required paddings
	    return {
	      left: Math.max(cx - left - x + x1, 0) + left,
	      right: Math.max(cx - right + x - x2, 0) + right,
	      top: Math.max(cy - top - y + y1, 0) + top,
	      bottom: Math.max(cy - bottom + y - y2, 0) + bottom
	    };
	  },
	  // Position the paper inside the paper wrapper and resize the wrapper.
	  addPadding: function addPadding() {
	    var _this$options2 = this.options,
	      borderless = _this$options2.borderless,
	      paper = _this$options2.paper;
	    var left, right, top, bottom;
	    if (borderless) {
	      left = right = top = bottom = 0;
	    } else {
	      var _paper$scale = paper.scale(),
	        sx = _paper$scale.sx,
	        sy = _paper$scale.sy;
	      var area = paper.getArea();
	      var padding = this.computeRequiredPadding(area.scale(sx, sy, {
	        x: 0,
	        y: 0
	      }));
	      left = Math.round(padding.left);
	      right = Math.round(padding.right);
	      top = Math.round(padding.top);
	      bottom = Math.round(padding.bottom);
	    }
	    this._padding = {
	      left: left,
	      top: top,
	      bottom: bottom,
	      right: right
	    };
	    var _paper$getComputedSiz = paper.getComputedSize(),
	      width = _paper$getComputedSiz.width,
	      height = _paper$getComputedSiz.height;
	    this.$background.css({
	      width: left + width + right,
	      height: top + height + bottom
	    });
	    paper.$el.css({
	      left: left,
	      top: top
	    });
	    return this;
	  },
	  storeCenter: function storeCenter(x, y) {
	    // store the current mid point of visible paper area, so we can center the paper
	    // to the same point after the resize
	    var center = core_mjs.util.isNumber(x) ? new core_mjs.g.Point(x, y) : this.computeCenter();
	    this._center = center;
	  },
	  restoreCenter: function restoreCenter() {
	    var center = this._center;
	    if (!center) return;
	    this.center(center.x, center.y);
	  },
	  getCenter: function getCenter() {
	    if (!this._center) this._center = this.options.paper.getArea().center();
	    return this._center;
	  },
	  computeCenter: function computeCenter() {
	    var _this$getClientSize = this.getClientSize(),
	      width = _this$getClientSize.width,
	      height = _this$getClientSize.height;
	    return this.clientToLocalPoint(width / 2, height / 2);
	  },
	  adjustPaper: function adjustPaper() {
	    var _this$options3 = this.options,
	      paper = _this$options3.paper,
	      borderless = _this$options3.borderless,
	      contentOptions = _this$options3.contentOptions;
	    if (typeof contentOptions === 'function') {
	      contentOptions = contentOptions.call(this, this);
	    }
	    var options = core_mjs.util.assign({
	      gridWidth: this.options.baseWidth,
	      gridHeight: this.options.baseHeight,
	      allowNewOrigin: 'negative'
	    }, contentOptions);
	    if (borderless) {
	      var bbox = paper.getFitToContentArea(this.transformContentOptions(options));
	      var _paper$scale2 = paper.scale(),
	        sx = _paper$scale2.sx,
	        sy = _paper$scale2.sy;
	      bbox.x *= sx;
	      bbox.y *= sy;
	      bbox.width *= sx;
	      bbox.height *= sy;
	      var _this$computeRequired = this.computeRequiredPadding(bbox),
	        left = _this$computeRequired.left,
	        right = _this$computeRequired.right,
	        top = _this$computeRequired.top,
	        bottom = _this$computeRequired.bottom;
	      bbox.moveAndExpand({
	        x: -left,
	        y: -top,
	        width: left + right,
	        height: top + bottom
	      });
	      paper.setOrigin(-bbox.x, -bbox.y);
	      paper.setDimensions(bbox.width, bbox.height);
	    } else {
	      paper.fitToContent(this.transformContentOptions(options));
	    }
	    return this;
	  },
	  adjustScale: function adjustScale(sx, sy) {
	    var paper = this.options.paper;
	    var paperOptions = paper.options;
	    var fx = sx / this._sx;
	    var fy = sy / this._sy;
	    paper.setOrigin(paperOptions.origin.x * fx, paperOptions.origin.y * fy);
	    paper.setDimensions(paperOptions.width * fx, paperOptions.height * fy);
	  },
	  // Recalculates content options taking the current scale into account.
	  transformContentOptions: function transformContentOptions(opt) {
	    var sx = this._sx;
	    var sy = this._sy;
	    if (opt.gridWidth) opt.gridWidth *= sx;
	    if (opt.gridHeight) opt.gridHeight *= sy;
	    if (opt.minWidth) opt.minWidth *= sx;
	    if (opt.minHeight) opt.minHeight *= sy;
	    if (core_mjs.util.isObject(opt.padding)) {
	      opt.padding = {
	        left: (opt.padding.left || 0) * sx,
	        right: (opt.padding.right || 0) * sx,
	        top: (opt.padding.top || 0) * sy,
	        bottom: (opt.padding.bottom || 0) * sy
	      };
	    } else if (core_mjs.util.isNumber(opt.padding)) {
	      opt.padding = opt.padding * sx;
	    }
	    return opt;
	  },
	  // Adjust the paper position so the point [x,y] (local units) is moved
	  // to the center of paperScroller element.
	  // If neither `x` nor `y` provided, center to paper center.
	  // If `x` or `y` not provided, only center in the dimensions we know.
	  // Difference from scroll() is that center() adds padding to paper to
	  // make sure x, y will actually be centered.
	  center: function center(x, y, opt) {
	    var paper = this.options.paper;
	    var _paper$matrix = paper.matrix(),
	      a = _paper$matrix.a,
	      d = _paper$matrix.d,
	      e = _paper$matrix.e,
	      f = _paper$matrix.f;
	    var xIsNumber = core_mjs.util.isNumber(x);
	    var yIsNumber = core_mjs.util.isNumber(y);
	    var localOpt;
	    if (!xIsNumber && !yIsNumber) {
	      // no coordinates provided
	      // find center of the paper
	      localOpt = x;
	      var size = paper.getComputedSize();
	      var x1 = -e;
	      var y1 = -f;
	      x = (x1 + size.width) / 2;
	      y = (y1 + size.height) / 2;
	    } else {
	      localOpt = opt;
	      // If one of the coords not provided, substitute with middle
	      // of visible area in that dimension
	      if (!xIsNumber) {
	        x = this.getVisibleArea().center().x;
	      }
	      if (!yIsNumber) {
	        y = this.getVisibleArea().center().y;
	      }
	      // convert to the paper's coordinates system;
	      x *= a;
	      y *= d;
	    }
	    this.storeCenter(x / a, y / d);
	    this.addPadding();
	    this.scroll(x, y, localOpt);
	    return this;
	  },
	  // Position the paper so that the center of content (local units) is at
	  // the center of client area.
	  centerContent: function centerContent(opt) {
	    return this.positionContent('center', opt);
	  },
	  // Position the paper so that the center of element (local units) is at
	  // the center of client area.
	  centerElement: function centerElement(element, opt) {
	    this.checkElement(element, 'centerElement');
	    return this.positionElement(element, 'center', opt);
	  },
	  // Position the paper so that the `positionName`-determined point of
	  // content is at `positionName`-determined point of client area.
	  positionContent: function positionContent(positionName, opt) {
	    var contentArea = this.options.paper.getContentArea(opt); // local units
	    return this.positionRect(contentArea, positionName, opt);
	  },
	  // Position the paper so that the `positionName`-determined point of
	  // element area is at `positionName`-determined point of client area.
	  positionElement: function positionElement(element, positionName, opt) {
	    this.checkElement(element, 'positionElement');
	    var elementArea = element.getBBox(); // local units
	    return this.positionRect(elementArea, positionName, opt);
	  },
	  // Position the paper so that the `positionName`-determined point of
	  // `rect` is at `positionName`-determined point of client area.
	  // For example, to position the paper so that the top-left corner of
	  // `rect` is in the top-left corner of client area and 10px away from
	  // edges:
	  // - `positionRect('top-left', { padding: 10 });`
	  positionRect: function positionRect(rect, positionName, opt) {
	    var point;
	    switch (positionName) {
	      case 'center':
	        point = rect.center();
	        return this.positionPoint(point, '50%', '50%', opt);
	      case 'top':
	        point = rect.topMiddle();
	        return this.positionPoint(point, '50%', 0, opt);
	      case 'top-right':
	        point = rect.topRight();
	        return this.positionPoint(point, '100%', 0, opt);
	      case 'right':
	        point = rect.rightMiddle();
	        return this.positionPoint(point, '100%', '50%', opt);
	      case 'bottom-right':
	        point = rect.bottomRight();
	        return this.positionPoint(point, '100%', '100%', opt);
	      case 'bottom':
	        point = rect.bottomMiddle();
	        return this.positionPoint(point, '50%', '100%', opt);
	      case 'bottom-left':
	        point = rect.bottomLeft();
	        return this.positionPoint(point, 0, '100%', opt);
	      case 'left':
	        point = rect.leftMiddle();
	        return this.positionPoint(point, 0, '50%', opt);
	      case 'top-left':
	        point = rect.topLeft();
	        return this.positionPoint(point, 0, 0, opt);
	      default:
	        throw new Error('Provided positionName (\'' + positionName + '\') was not recognized.');
	    }
	  },
	  // Position the paper so that `point` is `x` and `y` away from the (left
	  // and top) edges of the client area.
	  // Optional padding from edges with `opt.padding`.
	  // Optional animation with `opt.animation`.
	  // Percentages are allowed; they are understood with reference to the area
	  // of the client area that is inside padding.
	  // Negative values/percentages mean start counting from the other edge of
	  // the client area (right and/or bottom).
	  positionPoint: function positionPoint(point, x, y, opt) {
	    opt = opt || {};
	    var padding = core_mjs.util.normalizeSides(opt.padding); // client units

	    var clientRect = new core_mjs.g.Rect(this.getClientSize());
	    var restrictedClientRect = clientRect.clone().moveAndExpand({
	      x: padding.left,
	      y: padding.top,
	      width: -padding.right - padding.left,
	      height: -padding.top - padding.bottom
	    });
	    var xIsPercentage = core_mjs.util.isPercentage(x);
	    x = parseFloat(x); // ignores the final %
	    if (xIsPercentage) x = x / 100 * Math.max(0, restrictedClientRect.width);
	    if (x < 0) x = restrictedClientRect.width + x; // if negative, start counting from other edge

	    var yIsPercentage = core_mjs.util.isPercentage(y);
	    y = parseFloat(y); // ignores the final %
	    if (yIsPercentage) y = y / 100 * Math.max(0, restrictedClientRect.height);
	    if (y < 0) y = restrictedClientRect.height + y; // if negative, start counting from other edge

	    var target = restrictedClientRect.origin().offset(x, y); // client units
	    var center = clientRect.center();
	    var centerVector = center.difference(target);
	    var scale = this.zoom();
	    var localCenterVector = centerVector.scale(1 / scale, 1 / scale); // local units
	    var localCenter = point.clone().offset(localCenterVector);
	    return this.center(localCenter.x, localCenter.y, opt);
	  },
	  // Put the point at [x,y] in the paper (local units) to the center of
	  // paperScroller window.
	  // Less aggressive than center() as it only changes position of scrollbars
	  // without adding paddings - it won't actually move view onto the position
	  // if there isn't enough room for it!
	  // If `x` or `y` is not provided, only scroll in the directions we know.
	  // Optionally you can specify `animation` key in option argument
	  // to make the scroll animated; object is passed into $.animate
	  scroll: function scroll(x, y, opt) {
	    var ctm = this.options.paper.matrix();
	    var clientSize = this.getClientSize();
	    var change = {};
	    if (core_mjs.util.isNumber(x)) {
	      var cx = clientSize.width / 2;
	      change['scrollLeft'] = this.getScrollLeftFromLTR(x - cx + ctm.e + (this._padding.left || 0));
	    }
	    if (core_mjs.util.isNumber(y)) {
	      var cy = clientSize.height / 2;
	      change['scrollTop'] = y - cy + ctm.f + (this._padding.top || 0);
	    }
	    if (opt && opt.animation) this.$el.animate(change, opt.animation);else this.$el.prop(change);
	  },
	  // Simple wrapper around scroll method that finds center of paper
	  // content and scrolls to it.
	  // Accepts same `opt` objects as the scroll() method (`opt.animation`).
	  scrollToContent: function scrollToContent(opt) {
	    var center = this.options.paper.getContentArea(opt).center();
	    var sx = this._sx;
	    var sy = this._sy;
	    center.x *= sx;
	    center.y *= sy;
	    return this.scroll(center.x, center.y, opt);
	  },
	  // Simple wrapper around scroll method that finds center of specified
	  // element and scrolls to it.
	  // Accepts same `opt` objects as the scroll() method (`opt.animation`).
	  scrollToElement: function scrollToElement(element, opt) {
	    this.checkElement(element, 'scrollToElement');
	    var center = element.getBBox().center();
	    var sx = this._sx;
	    var sy = this._sy;
	    center.x *= sx;
	    center.y *= sy;
	    return this.scroll(center.x, center.y, opt);
	  },
	  zoom: function zoom(value) {
	    var opt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	    if (value === undefined) {
	      return this._sx;
	    }
	    var center = this.computeCenter();
	    var sx = value;
	    var sy = value;
	    var ox;
	    var oy;
	    if (!opt.absolute) {
	      // Prevent decimal fraction representation errors
	      // e.g. 0.1 + 0.2 = 0.30000000000000004
	      var precision = 1e12;
	      var add = function add(a, b) {
	        return (a * precision + b * precision) / precision;
	      };
	      sx = add(this._sx, sx);
	      sy = add(this._sy, sy);
	    }
	    if (opt.grid) {
	      sx = Math.round(sx / opt.grid) * opt.grid;
	      sy = Math.round(sy / opt.grid) * opt.grid;
	    }

	    // check if the new scale won't exceed the given boundaries
	    if (opt.max) {
	      sx = Math.min(opt.max, sx);
	      sy = Math.min(opt.max, sy);
	    }
	    if (opt.min) {
	      sx = Math.max(opt.min, sx);
	      sy = Math.max(opt.min, sy);
	    }
	    if (opt.ox === undefined || opt.oy === undefined) {
	      // if the origin is not specified find the center of the paper's visible area.
	      ox = center.x;
	      oy = center.y;
	    } else {
	      var fsx = sx / this._sx;
	      var fsy = sy / this._sy;
	      ox = opt.ox - (opt.ox - center.x) / fsx;
	      oy = opt.oy - (opt.oy - center.y) / fsy;
	    }
	    this.beforePaperManipulation();
	    this.options.paper.scale(sx, sy);
	    this.center(ox, oy);
	    this.afterPaperManipulation();
	    return this;
	  },
	  zoomToRect: function zoomToRect(rect) {
	    var opt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	    // rect accepts simple objects with `{ x, y, width, height }` (= `dia.BBox`)
	    rect = new core_mjs.g.Rect(rect);
	    var paper = this.options.paper;
	    var paperOrigin = core_mjs.util.assign({}, paper.options.origin);

	    // `opt.fittingBBox` is the exact size of this PaperScroller's viewport
	    opt.fittingBBox = opt.fittingBBox || core_mjs.util.assign({}, new core_mjs.g.Point(paperOrigin), {
	      width: this.$el.width(),
	      height: this.$el.height()
	    });

	    // `opt.contentArea` is the area we want to zoom to = `rect`
	    opt.contentArea = rect;
	    this.beforePaperManipulation();

	    // scale the paper so the fitting bbox fits `rect`
	    // (if no `rect` was provided, then no `opt.contentArea` was set)
	    // (and thus, `paper.scaleContentToFit()` scales to fit all graph content)
	    paper.scaleContentToFit(opt);

	    // center the paper at the center of `rect`
	    var center = rect.center();
	    this.adjustPaper();
	    this.center(center.x, center.y);
	    this.afterPaperManipulation();
	    return this;
	  },
	  zoomToFit: function zoomToFit() {
	    var opt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    var paper = this.options.paper;
	    var contentArea = paper.getContentArea(opt);
	    this.zoomToRect(contentArea, opt);
	    return this;
	  },
	  transitionClassName: 'transition-in-progress',
	  transitionEventName: 'transitionend.paper-scroller-transition',
	  transitionToPoint: function transitionToPoint(x, y, opt) {
	    // Allow both `transition(point, options)` and `transition(x, y, options)`
	    if (core_mjs.util.isObject(x)) {
	      opt = y;
	      y = x.y;
	      x = x.x;
	    }
	    opt || (opt = {});
	    var oldScale = this._sx;
	    var scale = Math.max(opt.scale || oldScale, 1e-6);
	    var localPoint = new core_mjs.g.Point(x, y);
	    var localCenter = this.computeCenter();
	    var transform, transformOrigin;
	    if (oldScale === scale) {
	      // Translate only
	      var translate = localCenter.difference(localPoint).scale(oldScale, oldScale).round();
	      transform = 'translate(' + translate.x + 'px,' + translate.y + 'px)';
	    } else {
	      // Translate and scale concurrently
	      var distance = scale / (oldScale - scale) * localPoint.distance(localCenter);
	      var localOrigin = localCenter.clone().move(localPoint, distance);
	      var origin = this.localToBackgroundPoint(localOrigin).round();
	      transform = 'scale(' + scale / oldScale + ')';
	      transformOrigin = origin.x + 'px ' + origin.y + 'px';
	    }
	    this.$el.addClass(this.transitionClassName);
	    this.$background.off(this.transitionEventName).on(this.transitionEventName, function (evt) {
	      var paperScroller = this.paperScroller;
	      paperScroller.syncTransition(this.scale, {
	        x: this.x,
	        y: this.y
	      });
	      // Trigger a callback
	      var onTransitionEnd = this.onTransitionEnd;
	      if (core_mjs.util.isFunction(onTransitionEnd)) {
	        onTransitionEnd.call(paperScroller, evt);
	      }
	    }.bind({
	      // TransitionEnd handler context
	      paperScroller: this,
	      scale: scale,
	      x: x,
	      y: y,
	      onTransitionEnd: opt.onTransitionEnd
	    })).css({
	      transition: 'transform',
	      transitionDuration: opt.duration || '1s',
	      transitionDelay: opt.delay,
	      transitionTimingFunction: opt.timingFunction,
	      transformOrigin: transformOrigin,
	      transform: transform
	    });
	    return this;
	  },
	  syncTransition: function syncTransition(scale, center) {
	    this.beforePaperManipulation();
	    this.options.paper.scale(scale);
	    this.removeTransition().center(center.x, center.y);
	    this.afterPaperManipulation();
	    return this;
	  },
	  removeTransition: function removeTransition() {
	    this.$el.removeClass(this.transitionClassName);
	    this.$background.off(this.transitionEventName).css({
	      transition: '',
	      transitionDuration: '',
	      transitionDelay: '',
	      transitionTimingFunction: '',
	      transform: '',
	      transformOrigin: ''
	    });
	    return this;
	  },
	  transitionToRect: function transitionToRect(rect) {
	    var opt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	    rect = new core_mjs.g.Rect(rect);
	    var maxScale = opt.maxScale || Infinity;
	    var minScale = opt.minScale || Number.MIN_VALUE;
	    var scaleGrid = opt.scaleGrid || null;
	    var visibility = opt.visibility || 1;
	    var center = opt.center ? new core_mjs.g.Point(opt.center) : rect.center();
	    var clientSize = this.getClientSize();
	    var clientWidth = clientSize.width * visibility;
	    var clientHeight = clientSize.height * visibility;
	    var clientRect = new core_mjs.g.Rect({
	      x: center.x - clientWidth / 2,
	      y: center.y - clientHeight / 2,
	      width: clientWidth,
	      height: clientHeight
	    });

	    // scale the paper so all the corner points are in the viewport.
	    var scale = clientRect.maxRectUniformScaleToFit(rect, center);
	    scale = Math.min(scale, maxScale);
	    if (scaleGrid) {
	      scale = Math.floor(scale / scaleGrid) * scaleGrid;
	    }
	    scale = Math.max(minScale, scale);
	    this.transitionToPoint(center, core_mjs.util.defaults({
	      scale: scale
	    }, opt));
	    return this;
	  },
	  startPanning: function startPanning(evt) {
	    evt = core_mjs.util.normalizeEvent(evt);
	    this._clientX = evt.clientX;
	    this._clientY = evt.clientY;
	    this.trigger('pan:start', evt);
	    this.delegatePanning();
	    if (this.options.inertia) this.inertia.handleDragStart(evt);
	  },
	  pan: function pan(evt) {
	    evt = core_mjs.util.normalizeEvent(evt);
	    var dx = evt.clientX - this._clientX;
	    var dy = evt.clientY - this._clientY;
	    this.el.scrollTop -= dy;
	    this.el.scrollLeft -= dx;
	    this._clientX = evt.clientX;
	    this._clientY = evt.clientY;
	    if (this.options.inertia) this.inertia.handleDragMove(evt);
	  },
	  stopPanning: function stopPanning(evt) {
	    this.undelegatePanning();

	    // The event does not have to exist (backwards compatibility)
	    if (evt) evt = core_mjs.util.normalizeEvent(evt);
	    this.trigger('pan:stop', evt);
	    if (this.options.inertia) this.inertia.handleDragEnd(evt);
	  },
	  delegatePanning: function delegatePanning() {
	    this.$el.addClass('is-panning');
	    $(document.body).on({
	      'mousemove.panning touchmove.panning': this.pan,
	      'mouseup.panning touchend.panning': this.stopPanning
	    });
	    $(window).on('mouseup.panning', this.stopPanning);
	  },
	  undelegatePanning: function undelegatePanning() {
	    this.$el.removeClass('is-panning');
	    $(document.body).off('.panning');
	    $(window).off('.panning');
	  },
	  // Return the client dimensions in pixels as reported by browser.
	  // "What is the size of the window through which the user can see the paper?"
	  getClientSize: function getClientSize() {
	    var _this$el = this.el,
	      clientWidth = _this$el.clientWidth,
	      clientHeight = _this$el.clientHeight;
	    return {
	      width: clientWidth,
	      height: clientHeight
	    };
	  },
	  // Return the dimensions of the visible area in local units.
	  // "What part of the paper can be seen by the user, taking zooming and panning into account?"
	  getVisibleArea: function getVisibleArea() {
	    var ctm = this.options.paper.matrix();
	    var clientSize = this.getClientSize(); // client units

	    var area = {
	      x: this.getLTRScrollLeft(),
	      y: this.el.scrollTop || 0,
	      width: clientSize.width,
	      height: clientSize.height
	    }; // client units

	    var transformedArea = core_mjs.V.transformRect(area, ctm.inverse()); // local units

	    transformedArea.x -= (this._padding.left || 0) / this._sx;
	    transformedArea.y -= (this._padding.top || 0) / this._sy;
	    return new core_mjs.g.Rect(transformedArea);
	  },
	  isElementVisible: function isElementVisible(element, opt) {
	    this.checkElement(element, 'isElementVisible');
	    opt = opt || {};
	    var method = opt.strict ? 'containsRect' : 'intersect';
	    return !!this.getVisibleArea()[method](element.getBBox());
	  },
	  isPointVisible: function isPointVisible(point) {
	    return this.getVisibleArea().containsPoint(point);
	  },
	  // some method require element only because link is missing some tools (eg. bbox)
	  checkElement: function checkElement(element, methodName) {
	    if (!(element && element instanceof core_mjs.dia.Element)) {
	      throw new TypeError('ui.PaperScroller.' + methodName + '() accepts instance of dia.Element only');
	    }
	  },
	  onRemove: function onRemove() {
	    this.undelegatePanning();
	  },
	  isRTLDirection: function isRTLDirection() {
	    return getComputedStyle(this.el).direction === 'rtl';
	  },
	  getLTRScrollLeft: function getLTRScrollLeft() {
	    var el = this.el;
	    if (this.isRTLDirection()) {
	      var scrollLeftRTL = el.scrollLeft,
	        scrollWidth = el.scrollWidth,
	        clientWidth = el.clientWidth;
	      return scrollWidth - clientWidth + scrollLeftRTL;
	    }
	    return el.scrollLeft;
	  },
	  getScrollLeftFromLTR: function getScrollLeftFromLTR(scrollLeftLTR) {
	    if (this.isRTLDirection()) {
	      // RTL starts with 0 at the right side of the scrollable area
	      var _this$el2 = this.el,
	        scrollWidth = _this$el2.scrollWidth,
	        clientWidth = _this$el2.clientWidth;
	      var scrollLeftRTL = scrollLeftLTR - (scrollWidth - clientWidth);
	      return scrollLeftRTL;
	    }
	    return scrollLeftLTR;
	  }
	});
	core_mjs.env.addTest('msie', function () {
	  var userAgent = window.navigator.userAgent;
	  return userAgent.indexOf('MSIE') !== -1 || userAgent.indexOf('Trident') !== -1;
	});
	core_mjs.env.addTest('msedge', function () {
	  return /Edge\/\d+/.test(window.navigator.userAgent);
	});

	exports.PaperScroller = PaperScroller;

}(this.joint.ui = this.joint.ui || {}, $, joint));
