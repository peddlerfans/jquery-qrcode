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

	var arrayMethodIsStrict = function (METHOD_NAME, argument) {
	  var method = [][METHOD_NAME];
	  return !!method && fails(function () {
	    // eslint-disable-next-line no-useless-call -- required for testing
	    method.call(null, argument || function () { return 1; }, 1);
	  });
	};

	var nativeJoin = functionUncurryThis([].join);

	var ES3_STRINGS = indexedObject != Object;
	var STRICT_METHOD = arrayMethodIsStrict('join', ',');

	// `Array.prototype.join` method
	// https://tc39.es/ecma262/#sec-array.prototype.join
	_export({ target: 'Array', proto: true, forced: ES3_STRINGS || !STRICT_METHOD }, {
	  join: function join(separator) {
	    return nativeJoin(toIndexedObject(this), separator === undefined ? ',' : separator);
	  }
	});

	// TODO: Remove from `core-js@4`



	var DatePrototype = Date.prototype;
	var INVALID_DATE = 'Invalid Date';
	var TO_STRING = 'toString';
	var nativeDateToString = functionUncurryThis(DatePrototype[TO_STRING]);
	var thisTimeValue = functionUncurryThis(DatePrototype.getTime);

	// `Date.prototype.toString` method
	// https://tc39.es/ecma262/#sec-date.prototype.tostring
	if (String(new Date(NaN)) != INVALID_DATE) {
	  defineBuiltIn(DatePrototype, TO_STRING, function toString() {
	    var value = thisTimeValue(this);
	    // eslint-disable-next-line no-self-compare -- NaN check
	    return value === value ? nativeDateToString(this) : INVALID_DATE;
	  });
	}

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

	var RegExpPrototype = RegExp.prototype;

	var regexpGetFlags = function (R) {
	  var flags = R.flags;
	  return flags === undefined && !('flags' in RegExpPrototype) && !hasOwnProperty_1(R, 'flags') && objectIsPrototypeOf(RegExpPrototype, R)
	    ? functionCall(regexpFlags, R) : flags;
	};

	var PROPER_FUNCTION_NAME = functionName.PROPER;






	var TO_STRING$1 = 'toString';
	var RegExpPrototype$1 = RegExp.prototype;
	var nativeToString = RegExpPrototype$1[TO_STRING$1];

	var NOT_GENERIC = fails(function () { return nativeToString.call({ source: 'a', flags: 'b' }) != '/a/b'; });
	// FF44- RegExp#toString has a wrong name
	var INCORRECT_NAME = PROPER_FUNCTION_NAME && nativeToString.name != TO_STRING$1;

	// `RegExp.prototype.toString` method
	// https://tc39.es/ecma262/#sec-regexp.prototype.tostring
	if (NOT_GENERIC || INCORRECT_NAME) {
	  defineBuiltIn(RegExp.prototype, TO_STRING$1, function toString() {
	    var R = anObject(this);
	    var pattern = toString_1(R.source);
	    var flags = toString_1(regexpGetFlags(R));
	    return '/' + pattern + '/' + flags;
	  }, { unsafe: true });
	}

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
	var construct = getBuiltIn('Reflect', 'construct');
	var constructorRegExp = /^\s*(?:class|function)\b/;
	var exec = functionUncurryThis(constructorRegExp.exec);
	var INCORRECT_TO_STRING = !constructorRegExp.exec(noop);

	var isConstructorModern = function isConstructor(argument) {
	  if (!isCallable(argument)) return false;
	  try {
	    construct(noop, empty, argument);
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
	var isConstructor = !construct || fails(function () {
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
	var createMethod$1 = function (TYPE) {
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
	  forEach: createMethod$1(0),
	  // `Array.prototype.map` method
	  // https://tc39.es/ecma262/#sec-array.prototype.map
	  map: createMethod$1(1),
	  // `Array.prototype.filter` method
	  // https://tc39.es/ecma262/#sec-array.prototype.filter
	  filter: createMethod$1(2),
	  // `Array.prototype.some` method
	  // https://tc39.es/ecma262/#sec-array.prototype.some
	  some: createMethod$1(3),
	  // `Array.prototype.every` method
	  // https://tc39.es/ecma262/#sec-array.prototype.every
	  every: createMethod$1(4),
	  // `Array.prototype.find` method
	  // https://tc39.es/ecma262/#sec-array.prototype.find
	  find: createMethod$1(5),
	  // `Array.prototype.findIndex` method
	  // https://tc39.es/ecma262/#sec-array.prototype.findIndex
	  findIndex: createMethod$1(6),
	  // `Array.prototype.filterReject` method
	  // https://github.com/tc39/proposal-array-filtering
	  filterReject: createMethod$1(7)
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

	// a string of all valid unicode whitespaces
	var whitespaces = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002' +
	  '\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

	var replace = functionUncurryThis(''.replace);
	var whitespace = '[' + whitespaces + ']';
	var ltrim = RegExp('^' + whitespace + whitespace + '*');
	var rtrim = RegExp(whitespace + whitespace + '*$');

	// `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation
	var createMethod$2 = function (TYPE) {
	  return function ($this) {
	    var string = toString_1(requireObjectCoercible($this));
	    if (TYPE & 1) string = replace(string, ltrim, '');
	    if (TYPE & 2) string = replace(string, rtrim, '');
	    return string;
	  };
	};

	var stringTrim = {
	  // `String.prototype.{ trimLeft, trimStart }` methods
	  // https://tc39.es/ecma262/#sec-string.prototype.trimstart
	  start: createMethod$2(1),
	  // `String.prototype.{ trimRight, trimEnd }` methods
	  // https://tc39.es/ecma262/#sec-string.prototype.trimend
	  end: createMethod$2(2),
	  // `String.prototype.trim` method
	  // https://tc39.es/ecma262/#sec-string.prototype.trim
	  trim: createMethod$2(3)
	};

	var trim = stringTrim.trim;


	var $parseInt = global_1.parseInt;
	var Symbol$2 = global_1.Symbol;
	var ITERATOR = Symbol$2 && Symbol$2.iterator;
	var hex = /^[+-]?0x/i;
	var exec$1 = functionUncurryThis(hex.exec);
	var FORCED = $parseInt(whitespaces + '08') !== 8 || $parseInt(whitespaces + '0x16') !== 22
	  // MS Edge 18- broken with boxed symbols
	  || (ITERATOR && !fails(function () { $parseInt(Object(ITERATOR)); }));

	// `parseInt` method
	// https://tc39.es/ecma262/#sec-parseint-string-radix
	var numberParseInt = FORCED ? function parseInt(string, radix) {
	  var S = trim(toString_1(string));
	  return $parseInt(S, (radix >>> 0) || (exec$1(hex, S) ? 16 : 10));
	} : $parseInt;

	// `parseInt` method
	// https://tc39.es/ecma262/#sec-parseint-string-radix
	_export({ global: true, forced: parseInt != numberParseInt }, {
	  parseInt: numberParseInt
	});

	// `Array.isArray` method
	// https://tc39.es/ecma262/#sec-array.isarray
	_export({ target: 'Array', stat: true }, {
	  isArray: isArray
	});

	// `Object.keys` method
	// https://tc39.es/ecma262/#sec-object.keys
	// eslint-disable-next-line es/no-object-keys -- safe
	var objectKeys = Object.keys || function keys(O) {
	  return objectKeysInternal(O, enumBugKeys);
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

	var defineProperty$1 = objectDefineProperty.f;

	var UNSCOPABLES = wellKnownSymbol('unscopables');
	var ArrayPrototype = Array.prototype;

	// Array.prototype[@@unscopables]
	// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
	if (ArrayPrototype[UNSCOPABLES] == undefined) {
	  defineProperty$1(ArrayPrototype, UNSCOPABLES, {
	    configurable: true,
	    value: objectCreate(null)
	  });
	}

	// add a key to Array.prototype[@@unscopables]
	var addToUnscopables = function (key) {
	  ArrayPrototype[UNSCOPABLES][key] = true;
	};

	var $includes = arrayIncludes.includes;



	// FF99+ bug
	var BROKEN_ON_SPARSE = fails(function () {
	  return !Array(1).includes();
	});

	// `Array.prototype.includes` method
	// https://tc39.es/ecma262/#sec-array.prototype.includes
	_export({ target: 'Array', proto: true, forced: BROKEN_ON_SPARSE }, {
	  includes: function includes(el /* , fromIndex = 0 */) {
	    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
	addToUnscopables('includes');

	var MATCH = wellKnownSymbol('match');

	// `IsRegExp` abstract operation
	// https://tc39.es/ecma262/#sec-isregexp
	var isRegexp = function (it) {
	  var isRegExp;
	  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : classofRaw(it) == 'RegExp');
	};

	var $TypeError$6 = TypeError;

	var notARegexp = function (it) {
	  if (isRegexp(it)) {
	    throw $TypeError$6("The method doesn't accept regular expressions");
	  } return it;
	};

	var MATCH$1 = wellKnownSymbol('match');

	var correctIsRegexpLogic = function (METHOD_NAME) {
	  var regexp = /./;
	  try {
	    '/./'[METHOD_NAME](regexp);
	  } catch (error1) {
	    try {
	      regexp[MATCH$1] = false;
	      return '/./'[METHOD_NAME](regexp);
	    } catch (error2) { /* empty */ }
	  } return false;
	};

	var stringIndexOf = functionUncurryThis(''.indexOf);

	// `String.prototype.includes` method
	// https://tc39.es/ecma262/#sec-string.prototype.includes
	_export({ target: 'String', proto: true, forced: !correctIsRegexpLogic('includes') }, {
	  includes: function includes(searchString /* , position = 0 */) {
	    return !!~stringIndexOf(
	      toString_1(requireObjectCoercible(this)),
	      toString_1(notARegexp(searchString)),
	      arguments.length > 1 ? arguments[1] : undefined
	    );
	  }
	});

	var FunctionPrototype$2 = Function.prototype;
	var apply = FunctionPrototype$2.apply;
	var call$2 = FunctionPrototype$2.call;

	// eslint-disable-next-line es/no-reflect -- safe
	var functionApply = typeof Reflect == 'object' && Reflect.apply || (functionBindNative ? call$2.bind(apply) : function () {
	  return call$2.apply(apply, arguments);
	});

	var arraySlice = functionUncurryThis([].slice);

	var $TypeError$7 = TypeError;

	var validateArgumentsLength = function (passed, required) {
	  if (passed < required) throw $TypeError$7('Not enough arguments');
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

	var setInterval = schedulersFix.setInterval;

	// ie9- setInterval additional parameters fix
	// https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-setinterval
	_export({ global: true, bind: true, forced: global_1.setInterval !== setInterval }, {
	  setInterval: setInterval
	});

	var setTimeout$1 = schedulersFix.setTimeout;

	// ie9- setTimeout additional parameters fix
	// https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-settimeout
	_export({ global: true, bind: true, forced: global_1.setTimeout !== setTimeout$1 }, {
	  setTimeout: setTimeout$1
	});

	var PathEditor = core_mjs.mvc.View.extend({
	  tagName: 'g',
	  svgElement: true,
	  className: 'path-editor',
	  events: {
	    'mousedown .anchor-point': 'onAnchorPointPointerDown',
	    'mousedown .control-point': 'onControlPointPointerDown',
	    'mousedown .segment-path': 'onSegmentPathPointerDown',
	    //'mousemove': 'onPointerMove', // only bound (while mousedown), see `documentEvents`
	    //'mouseup': 'onPointerUp', // only bound (ends mousedown), see `documentEvents`
	    'touchstart .anchor-point': 'onAnchorPointPointerDown',
	    'touchstart .control-point': 'onControlPointPointerDown',
	    'touchstart .segment-path': 'onSegmentPathPointerDown',
	    //'touchmove': 'onPointerMove', // only bound (while touch), see `documentEvents`
	    //'touchup': 'onPointerUp', // only bound (ends touch), see `documentEvents`
	    //'touchcancel': 'onPointerUp', // only bound (ends touch), see `documentEvents`
	    'dblclick .anchor-point': 'onAnchorPointDoubleClick',
	    'dblclick .control-point': 'onControlPointDoubleClick',
	    'dblclick .segment-path': 'onSegmentPathDoubleClick'
	  },
	  documentEvents: {
	    'mousemove': 'onPointerMove',
	    'touchmove': 'onPointerMove',
	    'mouseup': 'onPointerUp',
	    'touchend': 'onPointerUp',
	    'touchcancel': 'onPointerUp'
	  },
	  options: {
	    anchorPointMarkup: '<circle r="2.5"/>',
	    controlPointMarkup: '<circle r="2.5"/>'
	  },
	  init: function init() {
	    var pathNode = this.pathNode = core_mjs.V(this.options.pathElement).normalizePath().node;
	    this.path = core_mjs.g.Path.parse(this.options.pathElement.getAttribute('d'));

	    //this.segList = pathNode.pathSegList;
	    this.svgRoot = core_mjs.V(pathNode.ownerSVGElement);
	    this.$document = $(pathNode.ownerDocument);
	    this.render();
	  },
	  onRemove: function onRemove() {
	    this.undelegateDocumentEvents();
	    this.clear();
	  },
	  clear: function clear() {
	    var vel = this.vel;
	    vel.empty();
	    this.directionPaths = [];
	    this.segmentPaths = [];
	    this.segmentPathElements = [];
	    this.controlPoints = [];
	    this.anchorPoints = [];

	    // first subPath always starts at index '0'
	    this._subPathIndices = [0];
	    this.trigger('clear', this.pathNode);
	  },
	  _transformPoint: function _transformPoint(x, y, matrix) {
	    return core_mjs.V.transformPoint(new core_mjs.g.Point(x, y), matrix);
	  },
	  _getPathCTM: function _getPathCTM() {
	    return this.pathNode.getCTM();
	  },
	  render: function render() {
	    this.clear();
	    var path = this.path,
	      vel = this.vel,
	      anchorPoints = this.anchorPoints,
	      controlPoints = this.controlPoints,
	      directionPaths = this.directionPaths,
	      segmentPaths = this.segmentPaths,
	      segmentPathElements = this.segmentPathElements;
	    var ctm = this._getPathCTM();
	    var anchorTpl = core_mjs.V(this.options.anchorPointMarkup).addClass('anchor-point');
	    var controlTpl = core_mjs.V(this.options.controlPointMarkup).addClass('control-point');
	    var directionPathTpl = core_mjs.V('<path class="direction-path"/>');
	    var segPathTpl = core_mjs.V('<path class="segment-path"/>');
	    var _subPathIndices = this._subPathIndices;
	    for (var index = 0, prevX = 0, prevY = 0; index < path.segments.length; index++) {
	      var seg = path.getSegment(index);

	      // convert to transformed coordinates to match how path is rendered on screen
	      var segCoords = this._transformPoint(seg.end.x, seg.end.y, ctm);
	      var x = segCoords.x;
	      var y = segCoords.y;
	      if (seg.type !== 'Z') {
	        anchorPoints[index] = anchorTpl.clone().attr({
	          index: index,
	          cx: x,
	          cy: y
	        });
	      }
	      if (seg.type !== 'M') {
	        var segPath = new core_mjs.g.Path();
	        segPath.appendSegment(new core_mjs.g.Path.createSegment('M', prevX, prevY));
	        switch (seg.type) {
	          case 'Z':
	            {
	              var subPathStartSeg = path.getSegment(_subPathIndices[0]);
	              var subPathStartSegPoint = this._transformPoint(subPathStartSeg.end.x, subPathStartSeg.end.y, ctm);
	              x = subPathStartSegPoint.x;
	              y = subPathStartSegPoint.y;
	              segPath.appendSegment(new core_mjs.g.Path.createSegment('L', x, y));
	              _subPathIndices.unshift(index + 1);
	              break;
	            }
	          case 'L':
	            {
	              segPath.appendSegment(new core_mjs.g.Path.createSegment('L', x, y));
	              break;
	            }
	          case 'C':
	            {
	              var controlSegCoords1 = this._transformPoint(seg.controlPoint1.x, seg.controlPoint1.y, ctm);
	              var controlPoint1 = controlTpl.clone().attr({
	                index: index,
	                'attribute-index': 1,
	                cx: controlSegCoords1.x,
	                cy: controlSegCoords1.y
	              });
	              var controlSegCoords2 = this._transformPoint(seg.controlPoint2.x, seg.controlPoint2.y, ctm);
	              var controlPoint2 = controlTpl.clone().attr({
	                index: index,
	                'attribute-index': 2,
	                cx: controlSegCoords2.x,
	                cy: controlSegCoords2.y
	              });
	              controlPoints[index] = [controlPoint1, controlPoint2];
	              segPath.appendSegment(new core_mjs.g.Path.createSegment('C', controlSegCoords1.x, controlSegCoords1.y, controlSegCoords2.x, controlSegCoords2.y, x, y));
	              directionPaths[index] = [directionPathTpl.clone().attr('d', ['M', prevX, prevY, 'L', controlSegCoords1.x, controlSegCoords1.y].join(' ')), directionPathTpl.clone().attr('d', ['M', x, y, 'L', controlSegCoords2.x, controlSegCoords2.y].join(' '))];
	              break;
	            }
	        }
	        segmentPaths[index] = segPath;
	        var segPathElement = segPathTpl.clone().attr('index', index).node;
	        segPathElement.setAttribute('d', segPath.toString());
	        segmentPathElements[index] = segPathElement;
	      }
	      prevX = x;
	      prevY = y;
	    }
	    var elements = [];
	    segmentPathElements.forEach(function (segment) {
	      if (segment) elements.push(segment);
	    });
	    directionPaths.forEach(function (direction) {
	      if (direction) Array.prototype.push.apply(elements, direction);
	    });
	    anchorPoints.forEach(function (anchor) {
	      if (anchor) elements.push(anchor);
	    });
	    controlPoints.forEach(function (control) {
	      if (control) Array.prototype.push.apply(elements, control);
	    });
	    vel.append(elements);
	    this.svgRoot.append(vel);
	  },
	  startMoving: function startMoving(e) {
	    var evt = core_mjs.util.normalizeEvent(e);
	    var $point = this.$point = $(evt.target);
	    this.prevClientX = evt.clientX;
	    this.prevClientY = evt.clientY;
	    var index = parseInt(this.$point.attr('index'), 10);

	    // TODO major release: args should be = this.pathNode, evt
	    this.trigger('path:interact');
	    if ($point.hasClass('anchor-point')) {
	      // TODO major release (breaking change): args should be = this.pathNode, evt, { index, segPoint }
	      this.trigger('path:anchor-point:select', index);
	      // first clickable anchor point is 0
	    } else if ($point.hasClass('control-point')) {
	      var controlPointIndex = parseInt(this.$point.attr('attribute-index'), 10);
	      // TODO major release (breaking change): args should be = this.pathNode, evt, { index, controlPointIndex, segPoint }
	      this.trigger('path:control-point:select', index, controlPointIndex);
	      // the index refers to the index of the curveto segment this control point belongs to
	      // curveto segment's control point 1 has index 1, control point 2 has index 2
	      // first clickable control point is at 1, 1 (even though the point has a direction path connected to anchor point 0)
	    } else {
	      // TODO major release (breaking change): args should be = this.pathNode, evt, { index }
	      this.trigger('path:segment:select', index);
	      // first clickable segment is segment 1
	      // segment 0 is the first M segment (which has no path)
	    }

	    evt.stopPropagation();
	    evt.preventDefault();

	    // clear values of movement variables
	    this.index = undefined;
	    this.controlPointIndex = undefined;
	    this.segPoint = undefined;
	    this.pathEditedEventType = undefined;
	  },
	  move: function move(e) {
	    var $point = this.$point;
	    if (!$point) return;

	    // move anchor and control points
	    var evt = core_mjs.util.normalizeEvent(e);
	    var dx = evt.clientX - this.prevClientX;
	    var dy = evt.clientY - this.prevClientY;
	    var index = parseInt($point.attr('index'), 10);
	    if ($point.hasClass('anchor-point')) {
	      // move anchor point
	      this.adjustAnchorPoint(index, dx, dy, evt);
	    } else if ($point.hasClass('control-point')) {
	      // move control point
	      var controlPointIndex = parseInt($point.attr('attribute-index'), 10);
	      this.adjustControlPoint(index, controlPointIndex, dx, dy, evt);
	    } else {
	      // move segment
	      this.adjustSegment(index, dx, dy, evt);
	    }

	    // move the direction paths
	    this.prevClientX = evt.clientX;
	    this.prevClientY = evt.clientY;
	  },
	  // note that `evt` is normalized event
	  adjustSegment: function adjustSegment(index, dx, dy, evt) {
	    var _ref = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {},
	      _ref$dry = _ref.dry,
	      dry = _ref$dry === void 0 ? undefined : _ref$dry;
	    this.adjustAnchorPoint(index - 1, dx, dy, {
	      dry: true
	    });
	    this.adjustAnchorPoint(index, dx, dy, {
	      dry: true
	    });
	    if (!dry) {
	      // preserve values of movement variables
	      this.pathEditedEventType = 'path:segment:adjust';
	      this.index = index;

	      // trigger movement events
	      this.trigger('path:editing', this.pathNode, evt);
	      this.trigger('path:segment:adjusting', this.pathNode, evt, {
	        index: index
	      });
	    }
	  },
	  // note that `evt` is normalized event
	  adjustControlPoint: function adjustControlPoint(index, controlPointIndex, dx, dy, evt) {
	    var _ref2 = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {},
	      _ref2$dry = _ref2.dry,
	      dry = _ref2$dry === void 0 ? undefined : _ref2$dry;
	    // get the path transformation matrix
	    var ctm = this._getPathCTM();
	    var path = this.path,
	      controlPoints = this.controlPoints;

	    // the raw path data is not transformed
	    var seg = path.getSegment(index);

	    // the client movement data is transformed because it comes from interaction events in a transformed viewport
	    // convert to untransformed coordinates to match the path's underlying representation (untransformed)
	    var inverseCTM = ctm.inverse();
	    // translations are ignored since we are interested in differences in position
	    inverseCTM.e = 0;
	    inverseCTM.f = 0;
	    var moveCoords = this._transformPoint(dx, dy, inverseCTM);
	    var cp = 'controlPoint' + controlPointIndex;
	    // apply untransformed client movement data to untransformed path data
	    seg[cp].x += moveCoords.x;
	    seg[cp].y += moveCoords.y;

	    // convert to transformed coordinates to match how path is rendered on screen
	    var controlSegCoords = this._transformPoint(seg[cp].x, seg[cp].y, ctm);
	    var segPoint = new core_mjs.g.Point(controlSegCoords); // save a copy for later
	    var controlPoint = controlPoints[index][controlPointIndex - 1].attr({
	      cx: controlSegCoords.x,
	      cy: controlSegCoords.y
	    });
	    if (controlPoint.hasClass('locked')) {
	      // this control point is locked with another control point
	      // we also need to modify the bound control point
	      var boundIndex = this.getBoundIndex(index, controlPointIndex);
	      var boundControlPointIndex = controlPointIndex === 1 ? 2 : 1;
	      var bindSeg = path.getSegment(boundIndex);

	      // recalculate bound point with untransformed coordinates
	      var cpB = 'controlPoint' + boundControlPointIndex;
	      var center = new core_mjs.g.Point(controlPointIndex === 1 ? bindSeg.end.x : seg.end.x, controlPointIndex === 1 ? bindSeg.end.y : seg.end.y);
	      var controlPos = new core_mjs.g.Point(seg[cp].x, seg[cp].y);
	      var distance = center.distance(new core_mjs.g.Point(bindSeg[cpB].x, bindSeg[cpB].y));
	      var bindControlPos = center.move(controlPos, distance);
	      bindSeg[cpB].x = bindControlPos.x;
	      bindSeg[cpB].y = bindControlPos.y;

	      // convert to transformed coordinates
	      var bindControlSegCoords = this._transformPoint(bindSeg[cpB].x, bindSeg[cpB].y, ctm);
	      controlPoints[boundIndex][boundControlPointIndex - 1].attr({
	        cx: bindControlSegCoords.x,
	        cy: bindControlSegCoords.y
	      });

	      // update paths involving bound control point
	      this.updateDirectionPaths(boundIndex);
	      this.updateSegmentPath(boundIndex);
	    }

	    // update paths involving control point
	    this.updateDirectionPaths(index);
	    this.updateSegmentPath(index);
	    if (!dry) {
	      // preserve values of movement variables
	      this.pathEditedEventType = 'path:control-point:adjust';
	      this.index = index;
	      this.controlPointIndex = controlPointIndex;
	      this.segPoint = segPoint;

	      // trigger movement events
	      this.trigger('path:editing', this.pathNode, evt);
	      this.trigger('path:control-point:adjusting', this.pathNode, evt, {
	        index: index,
	        controlPointIndex: controlPointIndex,
	        segPoint: segPoint
	      });
	    }
	  },
	  findSubpathIndex: function findSubpathIndex(index) {
	    var indices = this._subPathIndices;
	    for (var i = 0, n = indices.length; i < n; i++) {
	      if (indices[i] < index) return indices[i];
	    }
	    return undefined;
	  },
	  findReversedSubpathIndex: function findReversedSubpathIndex(index) {
	    var indices = this._subPathIndices;
	    for (var i = indices.length - 1; i >= 0; i--) {
	      if (indices[i] > index) return indices[i];
	    }
	    return undefined;
	  },
	  // note that `evt` is normalized event
	  adjustAnchorPoint: function adjustAnchorPoint(index, dx, dy, evt) {
	    var _ref3 = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {},
	      _ref3$dry = _ref3.dry,
	      dry = _ref3$dry === void 0 ? undefined : _ref3$dry;
	    // get the path transformation matrix
	    var ctm = this._getPathCTM();
	    var path = this.path,
	      anchorPoints = this.anchorPoints,
	      controlPoints = this.controlPoints;

	    // the raw path data is not transformed
	    var seg = path.getSegment(index);
	    if (seg.type === 'Z') {
	      index = this.findSubpathIndex(index);
	      seg = path.getSegment(index);
	    }

	    // if we move either endpoint, control points across start anchor point must be unlocked
	    var lastIndex = anchorPoints.length - 1;
	    if ((index === 0 || index === lastIndex) && controlPoints[1] && controlPoints[lastIndex]) {
	      var controlPoint1 = controlPoints[1][0];
	      var controlPoint2 = controlPoints[lastIndex][1];
	      if (controlPoint1 && controlPoint1.hasClass('locked')) controlPoint1.removeClass('locked');
	      if (controlPoint2 && controlPoint2.hasClass('locked')) controlPoint2.removeClass('locked');
	    }

	    // the client movement data is transformed because it comes from interaction events in a transformed viewport
	    // convert to untransformed coordinates to match the path's underlying representation (untransformed)
	    var inverseCTM = ctm.inverse();
	    // translations are ignored since we are interested in differences in position
	    inverseCTM.e = 0;
	    inverseCTM.f = 0;
	    var moveCoords = this._transformPoint(dx, dy, inverseCTM);

	    // apply untransformed client movement data to untransformed path data
	    seg.end.x += moveCoords.x;
	    seg.end.y += moveCoords.y;

	    // convert to transformed coordinates to match how path is rendered on screen
	    var segCoords = this._transformPoint(seg.end.x, seg.end.y, ctm);
	    var segPoint = new core_mjs.g.Point(segCoords); // save a copy for later
	    anchorPoints[index].attr({
	      cx: segCoords.x,
	      cy: segCoords.y
	    });
	    if (seg.type === 'C') {
	      seg.controlPoint2.x += moveCoords.x;
	      seg.controlPoint2.y += moveCoords.y;

	      // convert to transformed coordinates
	      var controlSegCoords = this._transformPoint(seg.controlPoint2.x, seg.controlPoint2.y, ctm);
	      controlPoints[index][1].attr({
	        cx: controlSegCoords.x,
	        cy: controlSegCoords.y
	      });
	    }
	    var nextSeg = index + 1 < path.segments.length ? path.getSegment(index + 1) : 0;
	    if (nextSeg) {
	      if (nextSeg.type === 'C') {
	        // apply untransformed client movement data to untransformed path data
	        nextSeg.controlPoint1.x += moveCoords.x;
	        nextSeg.controlPoint1.y += moveCoords.y;

	        // convert to transformed coordinates
	        var nextControlSegCoords = this._transformPoint(nextSeg.controlPoint1.x, nextSeg.controlPoint1.y, ctm);
	        controlPoints[index + 1][0].attr({
	          cx: nextControlSegCoords.x,
	          cy: nextControlSegCoords.y
	        });

	        // update control paths involving next anchor point
	        this.updateDirectionPaths(index + 1);
	      }

	      // update segment path involving next anchor point
	      this.updateSegmentPath(index + 1);
	    }

	    // update paths involving this anchor point
	    this.updateDirectionPaths(index);
	    this.updateSegmentPath(index);
	    if (!dry) {
	      // preserve values of movement variables
	      this.pathEditedEventType = 'path:anchor-point:adjust';
	      this.index = index;
	      this.segPoint = segPoint;

	      // trigger movement events
	      this.trigger('path:editing', this.pathNode, evt);
	      this.trigger('path:anchor-point:adjusting', this.pathNode, evt, {
	        index: index,
	        segPoint: segPoint
	      });
	    }
	  },
	  // updates paths from a given segment to control points
	  updateDirectionPaths: function updateDirectionPaths(index) {
	    // get the path transformation matrix
	    var ctm = this._getPathCTM();
	    var path = this.path;

	    // raw path data is unconverted
	    // convert to transformed coordinates to match how path is rendered on screen
	    var seg = path.getSegment(index);
	    var segCoords = this._transformPoint(seg.end.x, seg.end.y, ctm);

	    // make sure that previous segment exists
	    var prevSeg = index > 0 ? path.getSegment(index - 1) : null;
	    var prevSegCoords = prevSeg ? this._transformPoint(prevSeg.end.x, prevSeg.end.y, ctm) : null;

	    // for each direction path from this anchor point
	    var directionPaths = this.directionPaths[index];
	    if (!Array.isArray(directionPaths)) return;
	    directionPaths.forEach(function (directionPath, i) {
	      i++;
	      var controlSegCoords = this._transformPoint(seg['controlPoint' + i].x, seg['controlPoint' + i].y, ctm);

	      // update the path with transformed coordinates
	      directionPath.attr('d', ['M', i > 1 || !prevSeg ? segCoords.x : prevSegCoords.x, i > 1 || !prevSeg ? segCoords.y : prevSegCoords.y, controlSegCoords.x, controlSegCoords.y].join(' '));
	    }, this);
	  },
	  // updates given path
	  updateSegmentPath: function updateSegmentPath(index) {
	    var path = this.path,
	      _subPathIndices = this._subPathIndices;
	    if (_subPathIndices.includes(index)) {
	      var segMaxIndex = this.findReversedSubpathIndex(index) || this.path.segments.length;
	      segMaxIndex--;
	      if (path.getSegment(segMaxIndex).type !== 'Z') return;
	      index = segMaxIndex;
	    }

	    // first segment (index = 0) is always 'M' and such it has no segmentPath
	    var segPath = this.segmentPaths[index];
	    if (!segPath) return;

	    // get the path transformation matrix
	    var ctm = this._getPathCTM();

	    // there is always a previous segment because we are skipping over the first segment
	    // raw path data is untransformed
	    // convert to transformed coordinates to match how path is rendered on screen
	    var prevSeg = path.getSegment(index - 1);
	    var prevSegCoords = this._transformPoint(prevSeg.end.x, prevSeg.end.y, ctm);
	    // create the updated path
	    segPath = new core_mjs.g.Path();
	    var item = core_mjs.g.Path.createSegment('M', prevSegCoords.x, prevSegCoords.y);
	    segPath.appendSegment(item);

	    // transform path data to match path rendering
	    var seg = path.getSegment(index);
	    var segCoords = this._transformPoint(seg.end.x, seg.end.y, ctm);
	    switch (seg.type) {
	      case 'Z':
	        {
	          // transform path data to match path rendering
	          var nextSeg = path.getSegment(this.findSubpathIndex(index));
	          var nextSegCoords = this._transformPoint(nextSeg.end.x, nextSeg.end.y, ctm);
	          item = core_mjs.g.Path.createSegment('L', nextSegCoords.x, nextSegCoords.y);
	          break;
	        }
	      case 'L':
	        {
	          item = core_mjs.g.Path.createSegment('L', segCoords.x, segCoords.y);
	          break;
	        }
	      case 'C':
	        {
	          // transform control point data to match path rendering
	          var controlSegCoords1 = this._transformPoint(seg.controlPoint1.x, seg.controlPoint1.y, ctm);
	          var controlSegCoords2 = this._transformPoint(seg.controlPoint2.x, seg.controlPoint2.y, ctm);
	          item = core_mjs.g.Path.createSegment('C', controlSegCoords1.x, controlSegCoords1.y, controlSegCoords2.x, controlSegCoords2.y, segCoords.x, segCoords.y);
	          break;
	        }
	    }
	    segPath.appendSegment(item);
	    this.segmentPaths[index] = segPath;
	    var segPathElement = this.segmentPathElements[index];
	    if (segPathElement) {
	      segPathElement.setAttribute('d', segPath.toString());
	    }
	    this.pathNode.setAttribute('d', path.toString());
	  },
	  stopMoving: function stopMoving(e) {
	    var evt = core_mjs.util.normalizeEvent(e);
	    this.$point = undefined;

	    // trigger 'path:edit' events only if:
	    // - an `adjust` method has been called at least once, and
	    // - the `adjust` method has not been called as `dry`
	    if (this.pathEditedEventType) {
	      var pathNode = this.pathNode,
	        index = this.index,
	        controlPointIndex = this.controlPointIndex,
	        segPoint = this.segPoint;
	      this.trigger('path:edit', pathNode, evt);
	      this.trigger(this.pathEditedEventType, pathNode, evt, {
	        index: index,
	        controlPointIndex: controlPointIndex,
	        segPoint: segPoint
	      });
	    }

	    // clear values of movement variables
	    this.index = undefined;
	    this.controlPointIndex = undefined;
	    this.segPoint = undefined;
	    this.pathEditedEventType = undefined;
	  },
	  createAnchorPoint: function createAnchorPoint(e) {
	    var evt = core_mjs.util.normalizeEvent(e);
	    var index = core_mjs.V(evt.target).attr('index');
	    var pathNode = this.pathNode,
	      path = this.path;
	    var coords = core_mjs.V(pathNode).toLocalPoint(evt.pageX, evt.pageY);
	    var seg = path.getSegment(index);
	    switch (seg.type) {
	      // we assume that it is not possible to trigger this function at moveto segment
	      case 'Z':
	        {
	          var line = new core_mjs.g.Line(seg.start, seg.end);
	          // divide `seg` into two lines at point closest to `coords` of user click
	          var closestPoint = line.closestPoint(coords);
	          // insert new line into `segList` with closestPoint's coordinates
	          // the original closepath `seg` adjusts to come after this new segment
	          path.insertSegment(index, core_mjs.g.Path.createSegment('L', closestPoint.x, closestPoint.y));
	          break;
	        }
	      case 'L':
	        {
	          // option 2: we are dividing a lineto segment
	          // create a g.Line from `seg`
	          var _line = new core_mjs.g.Line(seg.start, seg.end);
	          // divide `seg` into two lines at point closest to `coords` of user click
	          var _closestPoint = _line.closestPoint(coords);
	          // insert new line into `segList` with closestPoint's coordinates
	          // the original `seg` adjusts to come after this new segment
	          path.insertSegment(index, core_mjs.g.Path.createSegment('L', _closestPoint.x, _closestPoint.y));
	          break;
	        }
	      case 'C':
	        {
	          var curve = new core_mjs.g.Curve(seg.start, seg.controlPoint1, seg.controlPoint2, seg.end);
	          var t = curve.closestPointT(coords);
	          var segments = seg.divideAtT(t);
	          // insert new curve into `segList` that looks like the first curve from division
	          // - start = prevSeg's end (unchanged)
	          // - controlPoint1 = first curve's controlPoint1
	          // - controlPoint2 = first curve's controlPoint2
	          // - end = first curve's end
	          // (inserting before `seg`)
	          path.insertSegment(index, segments[0]);
	          // change the original `seg` to look like the second curve from division
	          // - start = first curve's end (see above)
	          // - controlPoint1 = second curve's controlPoint1
	          // - controlPoint2 = second curve's controlPoint2
	          // - end = seg's (unchanged)
	          seg.controlPoint1.x = segments[1].controlPoint1.x;
	          seg.controlPoint1.y = segments[1].controlPoint1.y;
	          seg.controlPoint2.x = segments[1].controlPoint2.x;
	          seg.controlPoint2.y = segments[1].controlPoint2.y;
	          break;
	        }
	    }
	    this.render();
	    this.pathNode.setAttribute('d', path.toString());
	    this.trigger('path:edit', pathNode, evt);
	    this.trigger('path:anchor-point:create', pathNode, evt);
	  },
	  removeAnchorPoint: function removeAnchorPoint(e) {
	    var evt = core_mjs.util.normalizeEvent(e);
	    var index = parseInt($(evt.target).attr('index'), 10);
	    var pathNode = this.pathNode,
	      path = this.path;
	    var seg = path.getSegment(index);
	    var nextSeg;
	    var replacingSeg;
	    switch (seg.type) {
	      case 'M':
	        // replace following segment with a moveto segment
	        // then delete this segment
	        nextSeg = path.getSegment(index + 1);
	        replacingSeg = core_mjs.g.Path.createSegment('M', nextSeg.end.x, nextSeg.end.y);
	        path.replaceSegment(index + 1, replacingSeg);
	        path.removeSegment(index);
	        break;
	      case 'L':
	        // just remove this segment
	        path.removeSegment(index);
	        break;
	      case 'C':
	        // replace following curve's control point 1 with this curve's control point 1
	        // if not followed by a curve, then discard the curve information
	        // then delete this curveto segment
	        if (index + 1 <= path.segments.length - 1) {
	          nextSeg = path.getSegment(index + 1);
	          if (nextSeg.type === 'C') {
	            nextSeg.controlPoint1.x = seg.controlPoint1.x;
	            nextSeg.controlPoint1.y = seg.controlPoint1.y;
	          }
	        }
	        path.removeSegment(index);
	        break;
	    }
	    this.render();
	    this.pathNode.setAttribute('d', path.toString());
	    this.trigger('path:edit', pathNode, evt);
	    this.trigger('path:anchor-point:remove', pathNode, evt);
	    var numAnchorPoints = path.segments.length;
	    if (path.getSegment(path.segments.length - 1).type === 'Z') {
	      numAnchorPoints -= 1;
	    }
	    if (numAnchorPoints < 2) {
	      // the path has too few points to be seen
	      this.trigger('path:invalid', pathNode, evt);
	    }
	  },
	  lockControlPoint: function lockControlPoint(e) {
	    var evt = core_mjs.util.normalizeEvent(e);
	    var evtTarget = $(evt.target);
	    var index = parseInt(evtTarget.attr('index'));
	    var controlPointIndex = parseInt(evtTarget.attr('attribute-index'), 10);
	    var boundIndex = this.getBoundIndex(index, controlPointIndex);
	    var boundControlPointIndex = controlPointIndex === 1 ? 2 : 1;
	    var boundControlPoint = this.controlPoints[boundIndex];
	    if (boundControlPoint) {
	      var isLocked = evtTarget.hasClass('locked');
	      evtTarget.toggleClass('locked');
	      boundControlPoint[boundControlPointIndex - 1].toggleClass('locked');

	      // TODO major release: args should be = this.pathNode, evt
	      this.trigger('path:interact');
	      if (!isLocked) {
	        // TODO major release (breaking change): args should be = this.pathNode, evt, { index, controlPointIndex, segPoint }
	        this.trigger('path:control-point:lock', index, controlPointIndex);
	        // automatically adjust bound control point according to the clicked control point:
	        this.adjustControlPoint(index, controlPointIndex, 0, 0, {
	          dry: true
	        });
	        // TODO: the path changes because of the above action:
	        // - question 1: should this trigger edit/editing events too?
	        // - question 2: should the 'path:control-point:lock' opt object contain information about the changed control point?
	        // - OR: should we trigger an extra 'path:control-point:locked' event with information about the changed control point?
	      } else {
	        // TODO major release (breaking change): args should be = this.pathNode, evt, { index, controlPointIndex, segPoint }
	        this.trigger('path:control-point:unlock', index, controlPointIndex);
	      }
	    }
	  },
	  getBoundIndex: function getBoundIndex(index, controlPointIndex) {
	    var boundIndex;
	    var path = this.path,
	      anchorPoints = this.anchorPoints;
	    var lastSegIndex;
	    var lastSegType;
	    var closepathPresent;
	    var lastIndex = anchorPoints.length - 1;
	    var endpointsIdenticalX;
	    var endpointsIdenticalY;
	    if (controlPointIndex === 1) {
	      boundIndex = index - 1;
	      if (boundIndex === 0) {
	        // if we are trying to wrap past the start element:
	        lastSegIndex = path.segments.length - 1;
	        lastSegType = path.getSegment(lastSegIndex).type;
	        closepathPresent = lastSegType === 'Z';
	        endpointsIdenticalX = anchorPoints[0].attr('cx') === anchorPoints[lastIndex].attr('cx');
	        endpointsIdenticalY = anchorPoints[0].attr('cy') === anchorPoints[lastIndex].attr('cy');
	        if (closepathPresent && endpointsIdenticalX && endpointsIdenticalY) {
	          // there is a closepath segment between the start element and the last element AND
	          // the start element and the last element have the same coordinates
	          // (that is, the two curves look like any other curve join in the path)
	          boundIndex = lastIndex; // wrap to the last element
	        }
	        // else: leave the index at 0 (no control points correspond to the index)
	      }
	    } else {
	      boundIndex = index + 1;
	      if (boundIndex === lastIndex + 1) {
	        // if we are trying to wrap past the last element:
	        lastSegIndex = path.segments.length - 1;
	        lastSegType = path.getSegment(lastSegIndex).type;
	        closepathPresent = lastSegType === 'Z';
	        endpointsIdenticalX = anchorPoints[0].attr('cx') === anchorPoints[lastIndex].attr('cx');
	        endpointsIdenticalY = anchorPoints[0].attr('cy') === anchorPoints[lastIndex].attr('cy');
	        if (closepathPresent && endpointsIdenticalX && endpointsIdenticalY) {
	          // there is a closepath segment between the last element and the start element AND
	          // the start element and the last element have the same coordinates
	          // (that is, the two curves look like any other curve join in the path)
	          boundIndex = 1; // wrap to the first element
	        }
	        // else: leave the index at (lastIndex + 1) (no control points correspond to the index)
	      }
	    }

	    return boundIndex;
	  },
	  getControlPointLockedStates: function getControlPointLockedStates() {
	    var controlPoints = this.controlPoints;
	    var lockedStates = [];
	    for (var index = 0; index < controlPoints.length; index++) {
	      if (!controlPoints[index]) continue;
	      lockedStates[index] = [];
	      for (var j = 0; j <= 1; j++) {
	        if (!controlPoints[index][j]) continue;
	        var controlPointIndex = j + 1;
	        if (controlPoints[index][j].hasClass('locked')) {
	          lockedStates[index][controlPointIndex] = true;
	        } else {
	          lockedStates[index][controlPointIndex] = false;
	        }
	      }
	    }
	    return lockedStates;
	  },
	  setControlPointLockedStates: function setControlPointLockedStates(lockedStates) {
	    var controlPoints = this.controlPoints;
	    for (var index = 0; index < controlPoints.length; index++) {
	      if (!lockedStates[index]) continue;
	      if (!controlPoints[index]) continue;
	      for (var controlPointIndex = 1; controlPointIndex <= 2; controlPointIndex++) {
	        if (!lockedStates[index][controlPointIndex]) continue;
	        if (!controlPoints[index][controlPointIndex - 1]) continue;
	        if (lockedStates[index][controlPointIndex] === true) {
	          controlPoints[index][controlPointIndex - 1].addClass('locked');
	        } else {
	          controlPoints[index][controlPointIndex - 1].removeClass('locked');
	        }
	      }
	    }
	  },
	  convertSegmentPath: function convertSegmentPath(e) {
	    var evt = core_mjs.util.normalizeEvent(e);
	    var index = core_mjs.V(evt.target).attr('index');
	    var pathNode = this.pathNode,
	      path = this.path;
	    var seg = path.getSegment(index);
	    switch (seg.type) {
	      case 'Z':
	        path.insertSegment(index, core_mjs.g.Path.createSegment('C', seg.start.x, seg.start.y, seg.end.x, seg.end.y, seg.end.x, seg.end.y));
	        break;
	      case 'L':
	        path.replaceSegment(index, core_mjs.g.Path.createSegment('C', seg.start.x, seg.start.y, seg.end.x, seg.end.y, seg.end.x, seg.end.y));
	        break;
	      case 'C':
	        path.replaceSegment(index, core_mjs.g.Path.createSegment('L', seg.end.x, seg.end.y));
	        break;
	    }
	    this.render();
	    this.pathNode.setAttribute('d', path.toString());
	    this.trigger('path:edit', pathNode, evt);
	    this.trigger('path:segment:convert', pathNode, evt);
	  },
	  addClosePathSegment: function addClosePathSegment(e) {
	    var evt = core_mjs.util.normalizeEvent(e);
	    var index = parseInt($(evt.target).attr('index'), 10);
	    var path = this.path,
	      pathNode = this.pathNode;
	    if (index === 0 || index === path.segments.length - 1) {
	      // if the first or last anchor was selected:
	      var seg = path.getSegment(path.segments.length - 1);
	      if (seg.type !== 'Z') {
	        // if the last segment of path is not closepath:
	        // add closepath at the end of path
	        path.appendSegment(core_mjs.g.Path.createSegment('Z'));
	        this.render();
	        this.pathNode.setAttribute('d', path.toString());
	        this.trigger('path:edit', pathNode, evt);
	        this.trigger('path:closepath-segment:add', pathNode, evt);
	      }
	    }
	  },
	  removeClosePathSegment: function removeClosePathSegment(e) {
	    var evt = core_mjs.util.normalizeEvent(e);
	    var index = core_mjs.V(evt.target).attr('index');
	    var path = this.path,
	      pathNode = this.pathNode;
	    var seg = path.getSegment(index);
	    if (seg.type === 'Z') {
	      path.removeSegment(index);
	      this.render();
	      this.pathNode.setAttribute('d', path.toString());
	      this.trigger('path:edit', pathNode, evt);
	      this.trigger('path:closepath-segment:remove', pathNode, evt);
	    }
	  },
	  // if needed, `isMoreThanSecondClick()` is extremely easy to derive from this code
	  // create another `clickCounter` and `timeout` variables
	  // and then change `this.clickCounter >= 2` to `3`
	  isMoreThanFirstClick: function isMoreThanFirstClick() {
	    var DOUBLE_CLICK_THRESHOLD = 400;

	    // create or increment counter
	    this.clickCounter = this.clickCounter || 0;
	    this.clickCounter += 1;

	    // renew timeout
	    if (this.timeout) clearTimeout(this.timeout);
	    this.timeout = setTimeout(function () {
	      // if second click does not come within time threshold,
	      // reset click counter back to `0`
	      this.clickCounter = 0;
	    }, DOUBLE_CLICK_THRESHOLD);

	    // evaluate click counter
	    if (this.clickCounter >= 2) {
	      // this is a second click (or more)
	      // stop timer and return `true`
	      this.clickCounter = 0;
	      clearTimeout(this.timeout);
	      return true;
	    } else {
	      // this is a first click
	      // keep timer running and return `false`
	      return false;
	    }
	  },
	  //////////////
	  // Handlers //
	  //////////////

	  onAnchorPointPointerDown: function onAnchorPointPointerDown(e) {
	    var evt = core_mjs.util.normalizeEvent(e);
	    evt.stopPropagation();

	    // left button only
	    if (evt.which !== 1) return;

	    // first click only (if this was part of a double click)
	    if (this.isMoreThanFirstClick()) return;
	    this.startMoving(evt);
	    this.delegateDocumentEvents();
	  },
	  onControlPointPointerDown: function onControlPointPointerDown(e) {
	    var evt = core_mjs.util.normalizeEvent(e);
	    evt.stopPropagation();

	    // left button only
	    if (evt.which !== 1) return;

	    // first click only (if this was part of a double click)
	    if (this.isMoreThanFirstClick()) return;
	    this.startMoving(evt);
	    this.delegateDocumentEvents();
	  },
	  onSegmentPathPointerDown: function onSegmentPathPointerDown(e) {
	    var evt = core_mjs.util.normalizeEvent(e);
	    evt.stopPropagation();

	    // left button only
	    if (evt.which !== 1) return;

	    // first click only (if this was part of a double click)
	    if (this.isMoreThanFirstClick()) return;
	    this.startMoving(evt);
	    this.delegateDocumentEvents();
	  },
	  onPointerMove: function onPointerMove(e) {
	    var evt = core_mjs.util.normalizeEvent(e);
	    evt.stopPropagation();
	    this.move(evt);
	  },
	  onPointerUp: function onPointerUp(e) {
	    this.undelegateDocumentEvents();
	    var evt = core_mjs.util.normalizeEvent(e);
	    evt.stopPropagation();
	    this.stopMoving(evt);
	  },
	  onAnchorPointDoubleClick: function onAnchorPointDoubleClick(e) {
	    var evt = core_mjs.util.normalizeEvent(e);
	    evt.stopPropagation();
	    evt.preventDefault();

	    // left button only
	    if (evt.which !== 1) return;
	    this.removeAnchorPoint(evt); // default user interaction method

	    // alternative method that could be called by this interaction:
	    //this.addClosePathSegment(evt);
	  },

	  onControlPointDoubleClick: function onControlPointDoubleClick(e) {
	    var evt = core_mjs.util.normalizeEvent(e);
	    evt.stopPropagation();
	    evt.preventDefault();

	    // left button only
	    if (evt.which !== 1) return;
	    this.lockControlPoint(evt);
	  },
	  onSegmentPathDoubleClick: function onSegmentPathDoubleClick(e) {
	    var evt = core_mjs.util.normalizeEvent(e);
	    evt.stopPropagation();
	    evt.preventDefault();

	    // left button only
	    if (evt.which !== 1) return;
	    this.createAnchorPoint(evt); // default user interaction method

	    // alternative methods that could be called by this interaction:
	    //this.convertSegmentPath(evt);
	    //this.removeClosePathSegment(evt);
	  }
	});

	exports.PathEditor = PathEditor;

}(this.joint.ui = this.joint.ui || {}, $, joint));
