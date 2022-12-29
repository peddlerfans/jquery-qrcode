/*! JointJS+ v3.6.3 - HTML5 Diagramming Framework

Copyright (c) 2022 client IO

 2022-12-09 


This Source Code Form is subject to the terms of the JointJS+ License
, v. 2.0. If a copy of the JointJS+ License was not distributed with this
file, You can obtain one at http://jointjs.com/license/rappid_v2.txt
 or from the JointJS+ archive as was distributed by client IO. See the LICENSE file.*/


this.joint = this.joint || {};
(function (exports, $, basic_mjs, core_mjs) {
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
	var Deno$1 = global_1.Deno;
	var versions = process && process.versions || Deno$1 && Deno$1.version;
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

	var $findIndex = arrayIteration.findIndex;


	var FIND_INDEX = 'findIndex';
	var SKIPS_HOLES = true;

	// Shouldn't skip holes
	if (FIND_INDEX in []) Array(1)[FIND_INDEX](function () { SKIPS_HOLES = false; });

	// `Array.prototype.findIndex` method
	// https://tc39.es/ecma262/#sec-array.prototype.findindex
	_export({ target: 'Array', proto: true, forced: SKIPS_HOLES }, {
	  findIndex: function findIndex(callbackfn /* , that = undefined */) {
	    return $findIndex(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
	addToUnscopables(FIND_INDEX);

	var engineIsNode = classofRaw(global_1.process) == 'process';

	var $String$2 = String;
	var $TypeError$6 = TypeError;

	var aPossiblePrototype = function (argument) {
	  if (typeof argument == 'object' || isCallable(argument)) return argument;
	  throw $TypeError$6("Can't set " + $String$2(argument) + ' as a prototype');
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

	var defineProperty$2 = objectDefineProperty.f;



	var TO_STRING_TAG$2 = wellKnownSymbol('toStringTag');

	var setToStringTag = function (target, TAG, STATIC) {
	  if (target && !STATIC) target = target.prototype;
	  if (target && !hasOwnProperty_1(target, TO_STRING_TAG$2)) {
	    defineProperty$2(target, TO_STRING_TAG$2, { configurable: true, value: TAG });
	  }
	};

	var SPECIES$1 = wellKnownSymbol('species');

	var setSpecies = function (CONSTRUCTOR_NAME) {
	  var Constructor = getBuiltIn(CONSTRUCTOR_NAME);
	  var defineProperty = objectDefineProperty.f;

	  if (descriptors && Constructor && !Constructor[SPECIES$1]) {
	    defineProperty(Constructor, SPECIES$1, {
	      configurable: true,
	      get: function () { return this; }
	    });
	  }
	};

	var $TypeError$7 = TypeError;

	var anInstance = function (it, Prototype) {
	  if (objectIsPrototypeOf(Prototype, it)) return it;
	  throw $TypeError$7('Incorrect invocation');
	};

	var $TypeError$8 = TypeError;

	// `Assert: IsConstructor(argument) is true`
	var aConstructor = function (argument) {
	  if (isConstructor(argument)) return argument;
	  throw $TypeError$8(tryToString(argument) + ' is not a constructor');
	};

	var SPECIES$2 = wellKnownSymbol('species');

	// `SpeciesConstructor` abstract operation
	// https://tc39.es/ecma262/#sec-speciesconstructor
	var speciesConstructor = function (O, defaultConstructor) {
	  var C = anObject(O).constructor;
	  var S;
	  return C === undefined || isNullOrUndefined(S = anObject(C)[SPECIES$2]) ? defaultConstructor : aConstructor(S);
	};

	var FunctionPrototype$2 = Function.prototype;
	var apply = FunctionPrototype$2.apply;
	var call$2 = FunctionPrototype$2.call;

	// eslint-disable-next-line es/no-reflect -- safe
	var functionApply = typeof Reflect == 'object' && Reflect.apply || (functionBindNative ? call$2.bind(apply) : function () {
	  return call$2.apply(apply, arguments);
	});

	var arraySlice = functionUncurryThis([].slice);

	var $TypeError$9 = TypeError;

	var validateArgumentsLength = function (passed, required) {
	  if (passed < required) throw $TypeError$9('Not enough arguments');
	  return passed;
	};

	var engineIsIos = /(?:ipad|iphone|ipod).*applewebkit/i.test(engineUserAgent);

	var set$1 = global_1.setImmediate;
	var clear = global_1.clearImmediate;
	var process$1 = global_1.process;
	var Dispatch = global_1.Dispatch;
	var Function$1 = global_1.Function;
	var MessageChannel = global_1.MessageChannel;
	var String$1 = global_1.String;
	var counter = 0;
	var queue = {};
	var ONREADYSTATECHANGE = 'onreadystatechange';
	var $location, defer, channel, port;

	try {
	  // Deno throws a ReferenceError on `location` access without `--location` flag
	  $location = global_1.location;
	} catch (error) { /* empty */ }

	var run = function (id) {
	  if (hasOwnProperty_1(queue, id)) {
	    var fn = queue[id];
	    delete queue[id];
	    fn();
	  }
	};

	var runner = function (id) {
	  return function () {
	    run(id);
	  };
	};

	var listener = function (event) {
	  run(event.data);
	};

	var post = function (id) {
	  // old engines have not location.origin
	  global_1.postMessage(String$1(id), $location.protocol + '//' + $location.host);
	};

	// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
	if (!set$1 || !clear) {
	  set$1 = function setImmediate(handler) {
	    validateArgumentsLength(arguments.length, 1);
	    var fn = isCallable(handler) ? handler : Function$1(handler);
	    var args = arraySlice(arguments, 1);
	    queue[++counter] = function () {
	      functionApply(fn, undefined, args);
	    };
	    defer(counter);
	    return counter;
	  };
	  clear = function clearImmediate(id) {
	    delete queue[id];
	  };
	  // Node.js 0.8-
	  if (engineIsNode) {
	    defer = function (id) {
	      process$1.nextTick(runner(id));
	    };
	  // Sphere (JS game engine) Dispatch API
	  } else if (Dispatch && Dispatch.now) {
	    defer = function (id) {
	      Dispatch.now(runner(id));
	    };
	  // Browsers with MessageChannel, includes WebWorkers
	  // except iOS - https://github.com/zloirock/core-js/issues/624
	  } else if (MessageChannel && !engineIsIos) {
	    channel = new MessageChannel();
	    port = channel.port2;
	    channel.port1.onmessage = listener;
	    defer = functionBindContext(port.postMessage, port);
	  // Browsers with postMessage, skip WebWorkers
	  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
	  } else if (
	    global_1.addEventListener &&
	    isCallable(global_1.postMessage) &&
	    !global_1.importScripts &&
	    $location && $location.protocol !== 'file:' &&
	    !fails(post)
	  ) {
	    defer = post;
	    global_1.addEventListener('message', listener, false);
	  // IE8-
	  } else if (ONREADYSTATECHANGE in documentCreateElement('script')) {
	    defer = function (id) {
	      html.appendChild(documentCreateElement('script'))[ONREADYSTATECHANGE] = function () {
	        html.removeChild(this);
	        run(id);
	      };
	    };
	  // Rest old browsers
	  } else {
	    defer = function (id) {
	      setTimeout(runner(id), 0);
	    };
	  }
	}

	var task = {
	  set: set$1,
	  clear: clear
	};

	var engineIsIosPebble = /ipad|iphone|ipod/i.test(engineUserAgent) && global_1.Pebble !== undefined;

	var engineIsWebosWebkit = /web0s(?!.*chrome)/i.test(engineUserAgent);

	var getOwnPropertyDescriptor$2 = objectGetOwnPropertyDescriptor.f;
	var macrotask = task.set;





	var MutationObserver = global_1.MutationObserver || global_1.WebKitMutationObserver;
	var document$2 = global_1.document;
	var process$2 = global_1.process;
	var Promise = global_1.Promise;
	// Node.js 11 shows ExperimentalWarning on getting `queueMicrotask`
	var queueMicrotaskDescriptor = getOwnPropertyDescriptor$2(global_1, 'queueMicrotask');
	var queueMicrotask = queueMicrotaskDescriptor && queueMicrotaskDescriptor.value;

	var flush, head, last, notify, toggle, node, promise, then;

	// modern engines have queueMicrotask method
	if (!queueMicrotask) {
	  flush = function () {
	    var parent, fn;
	    if (engineIsNode && (parent = process$2.domain)) parent.exit();
	    while (head) {
	      fn = head.fn;
	      head = head.next;
	      try {
	        fn();
	      } catch (error) {
	        if (head) notify();
	        else last = undefined;
	        throw error;
	      }
	    } last = undefined;
	    if (parent) parent.enter();
	  };

	  // browsers with MutationObserver, except iOS - https://github.com/zloirock/core-js/issues/339
	  // also except WebOS Webkit https://github.com/zloirock/core-js/issues/898
	  if (!engineIsIos && !engineIsNode && !engineIsWebosWebkit && MutationObserver && document$2) {
	    toggle = true;
	    node = document$2.createTextNode('');
	    new MutationObserver(flush).observe(node, { characterData: true });
	    notify = function () {
	      node.data = toggle = !toggle;
	    };
	  // environments with maybe non-completely correct, but existent Promise
	  } else if (!engineIsIosPebble && Promise && Promise.resolve) {
	    // Promise.resolve without an argument throws an error in LG WebOS 2
	    promise = Promise.resolve(undefined);
	    // workaround of WebKit ~ iOS Safari 10.1 bug
	    promise.constructor = Promise;
	    then = functionBindContext(promise.then, promise);
	    notify = function () {
	      then(flush);
	    };
	  // Node.js without promises
	  } else if (engineIsNode) {
	    notify = function () {
	      process$2.nextTick(flush);
	    };
	  // for other environments - macrotask based on:
	  // - setImmediate
	  // - MessageChannel
	  // - window.postMessage
	  // - onreadystatechange
	  // - setTimeout
	  } else {
	    // strange IE + webpack dev server bug - use .bind(global)
	    macrotask = functionBindContext(macrotask, global_1);
	    notify = function () {
	      macrotask(flush);
	    };
	  }
	}

	var microtask = queueMicrotask || function (fn) {
	  var task = { fn: fn, next: undefined };
	  if (last) last.next = task;
	  if (!head) {
	    head = task;
	    notify();
	  } last = task;
	};

	var hostReportErrors = function (a, b) {
	  var console = global_1.console;
	  if (console && console.error) {
	    arguments.length == 1 ? console.error(a) : console.error(a, b);
	  }
	};

	var perform = function (exec) {
	  try {
	    return { error: false, value: exec() };
	  } catch (error) {
	    return { error: true, value: error };
	  }
	};

	var Queue = function () {
	  this.head = null;
	  this.tail = null;
	};

	Queue.prototype = {
	  add: function (item) {
	    var entry = { item: item, next: null };
	    if (this.head) this.tail.next = entry;
	    else this.head = entry;
	    this.tail = entry;
	  },
	  get: function () {
	    var entry = this.head;
	    if (entry) {
	      this.head = entry.next;
	      if (this.tail === entry) this.tail = null;
	      return entry.item;
	    }
	  }
	};

	var queue$1 = Queue;

	var promiseNativeConstructor = global_1.Promise;

	/* global Deno -- Deno case */
	var engineIsDeno = typeof Deno == 'object' && Deno && typeof Deno.version == 'object';

	var engineIsBrowser = !engineIsDeno && !engineIsNode
	  && typeof window == 'object'
	  && typeof document == 'object';

	var NativePromisePrototype = promiseNativeConstructor && promiseNativeConstructor.prototype;
	var SPECIES$3 = wellKnownSymbol('species');
	var SUBCLASSING = false;
	var NATIVE_PROMISE_REJECTION_EVENT = isCallable(global_1.PromiseRejectionEvent);

	var FORCED_PROMISE_CONSTRUCTOR = isForced_1('Promise', function () {
	  var PROMISE_CONSTRUCTOR_SOURCE = inspectSource(promiseNativeConstructor);
	  var GLOBAL_CORE_JS_PROMISE = PROMISE_CONSTRUCTOR_SOURCE !== String(promiseNativeConstructor);
	  // V8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
	  // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
	  // We can't detect it synchronously, so just check versions
	  if (!GLOBAL_CORE_JS_PROMISE && engineV8Version === 66) return true;
	  // We can't use @@species feature detection in V8 since it causes
	  // deoptimization and performance degradation
	  // https://github.com/zloirock/core-js/issues/679
	  if (!engineV8Version || engineV8Version < 51 || !/native code/.test(PROMISE_CONSTRUCTOR_SOURCE)) {
	    // Detect correctness of subclassing with @@species support
	    var promise = new promiseNativeConstructor(function (resolve) { resolve(1); });
	    var FakePromise = function (exec) {
	      exec(function () { /* empty */ }, function () { /* empty */ });
	    };
	    var constructor = promise.constructor = {};
	    constructor[SPECIES$3] = FakePromise;
	    SUBCLASSING = promise.then(function () { /* empty */ }) instanceof FakePromise;
	    if (!SUBCLASSING) return true;
	  // Unhandled rejections tracking support, NodeJS Promise without it fails @@species test
	  } return !GLOBAL_CORE_JS_PROMISE && (engineIsBrowser || engineIsDeno) && !NATIVE_PROMISE_REJECTION_EVENT;
	});

	var promiseConstructorDetection = {
	  CONSTRUCTOR: FORCED_PROMISE_CONSTRUCTOR,
	  REJECTION_EVENT: NATIVE_PROMISE_REJECTION_EVENT,
	  SUBCLASSING: SUBCLASSING
	};

	var $TypeError$a = TypeError;

	var PromiseCapability = function (C) {
	  var resolve, reject;
	  this.promise = new C(function ($$resolve, $$reject) {
	    if (resolve !== undefined || reject !== undefined) throw $TypeError$a('Bad Promise constructor');
	    resolve = $$resolve;
	    reject = $$reject;
	  });
	  this.resolve = aCallable(resolve);
	  this.reject = aCallable(reject);
	};

	// `NewPromiseCapability` abstract operation
	// https://tc39.es/ecma262/#sec-newpromisecapability
	var f$6 = function (C) {
	  return new PromiseCapability(C);
	};

	var newPromiseCapability = {
		f: f$6
	};

	var task$1 = task.set;









	var PROMISE = 'Promise';
	var FORCED_PROMISE_CONSTRUCTOR$1 = promiseConstructorDetection.CONSTRUCTOR;
	var NATIVE_PROMISE_REJECTION_EVENT$1 = promiseConstructorDetection.REJECTION_EVENT;
	var NATIVE_PROMISE_SUBCLASSING = promiseConstructorDetection.SUBCLASSING;
	var getInternalPromiseState = internalState.getterFor(PROMISE);
	var setInternalState = internalState.set;
	var NativePromisePrototype$1 = promiseNativeConstructor && promiseNativeConstructor.prototype;
	var PromiseConstructor = promiseNativeConstructor;
	var PromisePrototype = NativePromisePrototype$1;
	var TypeError$2 = global_1.TypeError;
	var document$3 = global_1.document;
	var process$3 = global_1.process;
	var newPromiseCapability$1 = newPromiseCapability.f;
	var newGenericPromiseCapability = newPromiseCapability$1;

	var DISPATCH_EVENT = !!(document$3 && document$3.createEvent && global_1.dispatchEvent);
	var UNHANDLED_REJECTION = 'unhandledrejection';
	var REJECTION_HANDLED = 'rejectionhandled';
	var PENDING = 0;
	var FULFILLED = 1;
	var REJECTED = 2;
	var HANDLED = 1;
	var UNHANDLED = 2;

	var Internal, OwnPromiseCapability, PromiseWrapper, nativeThen;

	// helpers
	var isThenable = function (it) {
	  var then;
	  return isObject(it) && isCallable(then = it.then) ? then : false;
	};

	var callReaction = function (reaction, state) {
	  var value = state.value;
	  var ok = state.state == FULFILLED;
	  var handler = ok ? reaction.ok : reaction.fail;
	  var resolve = reaction.resolve;
	  var reject = reaction.reject;
	  var domain = reaction.domain;
	  var result, then, exited;
	  try {
	    if (handler) {
	      if (!ok) {
	        if (state.rejection === UNHANDLED) onHandleUnhandled(state);
	        state.rejection = HANDLED;
	      }
	      if (handler === true) result = value;
	      else {
	        if (domain) domain.enter();
	        result = handler(value); // can throw
	        if (domain) {
	          domain.exit();
	          exited = true;
	        }
	      }
	      if (result === reaction.promise) {
	        reject(TypeError$2('Promise-chain cycle'));
	      } else if (then = isThenable(result)) {
	        functionCall(then, result, resolve, reject);
	      } else resolve(result);
	    } else reject(value);
	  } catch (error) {
	    if (domain && !exited) domain.exit();
	    reject(error);
	  }
	};

	var notify$1 = function (state, isReject) {
	  if (state.notified) return;
	  state.notified = true;
	  microtask(function () {
	    var reactions = state.reactions;
	    var reaction;
	    while (reaction = reactions.get()) {
	      callReaction(reaction, state);
	    }
	    state.notified = false;
	    if (isReject && !state.rejection) onUnhandled(state);
	  });
	};

	var dispatchEvent = function (name, promise, reason) {
	  var event, handler;
	  if (DISPATCH_EVENT) {
	    event = document$3.createEvent('Event');
	    event.promise = promise;
	    event.reason = reason;
	    event.initEvent(name, false, true);
	    global_1.dispatchEvent(event);
	  } else event = { promise: promise, reason: reason };
	  if (!NATIVE_PROMISE_REJECTION_EVENT$1 && (handler = global_1['on' + name])) handler(event);
	  else if (name === UNHANDLED_REJECTION) hostReportErrors('Unhandled promise rejection', reason);
	};

	var onUnhandled = function (state) {
	  functionCall(task$1, global_1, function () {
	    var promise = state.facade;
	    var value = state.value;
	    var IS_UNHANDLED = isUnhandled(state);
	    var result;
	    if (IS_UNHANDLED) {
	      result = perform(function () {
	        if (engineIsNode) {
	          process$3.emit('unhandledRejection', value, promise);
	        } else dispatchEvent(UNHANDLED_REJECTION, promise, value);
	      });
	      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
	      state.rejection = engineIsNode || isUnhandled(state) ? UNHANDLED : HANDLED;
	      if (result.error) throw result.value;
	    }
	  });
	};

	var isUnhandled = function (state) {
	  return state.rejection !== HANDLED && !state.parent;
	};

	var onHandleUnhandled = function (state) {
	  functionCall(task$1, global_1, function () {
	    var promise = state.facade;
	    if (engineIsNode) {
	      process$3.emit('rejectionHandled', promise);
	    } else dispatchEvent(REJECTION_HANDLED, promise, state.value);
	  });
	};

	var bind$1 = function (fn, state, unwrap) {
	  return function (value) {
	    fn(state, value, unwrap);
	  };
	};

	var internalReject = function (state, value, unwrap) {
	  if (state.done) return;
	  state.done = true;
	  if (unwrap) state = unwrap;
	  state.value = value;
	  state.state = REJECTED;
	  notify$1(state, true);
	};

	var internalResolve = function (state, value, unwrap) {
	  if (state.done) return;
	  state.done = true;
	  if (unwrap) state = unwrap;
	  try {
	    if (state.facade === value) throw TypeError$2("Promise can't be resolved itself");
	    var then = isThenable(value);
	    if (then) {
	      microtask(function () {
	        var wrapper = { done: false };
	        try {
	          functionCall(then, value,
	            bind$1(internalResolve, wrapper, state),
	            bind$1(internalReject, wrapper, state)
	          );
	        } catch (error) {
	          internalReject(wrapper, error, state);
	        }
	      });
	    } else {
	      state.value = value;
	      state.state = FULFILLED;
	      notify$1(state, false);
	    }
	  } catch (error) {
	    internalReject({ done: false }, error, state);
	  }
	};

	// constructor polyfill
	if (FORCED_PROMISE_CONSTRUCTOR$1) {
	  // 25.4.3.1 Promise(executor)
	  PromiseConstructor = function Promise(executor) {
	    anInstance(this, PromisePrototype);
	    aCallable(executor);
	    functionCall(Internal, this);
	    var state = getInternalPromiseState(this);
	    try {
	      executor(bind$1(internalResolve, state), bind$1(internalReject, state));
	    } catch (error) {
	      internalReject(state, error);
	    }
	  };

	  PromisePrototype = PromiseConstructor.prototype;

	  // eslint-disable-next-line no-unused-vars -- required for `.length`
	  Internal = function Promise(executor) {
	    setInternalState(this, {
	      type: PROMISE,
	      done: false,
	      notified: false,
	      parent: false,
	      reactions: new queue$1(),
	      rejection: false,
	      state: PENDING,
	      value: undefined
	    });
	  };

	  // `Promise.prototype.then` method
	  // https://tc39.es/ecma262/#sec-promise.prototype.then
	  Internal.prototype = defineBuiltIn(PromisePrototype, 'then', function then(onFulfilled, onRejected) {
	    var state = getInternalPromiseState(this);
	    var reaction = newPromiseCapability$1(speciesConstructor(this, PromiseConstructor));
	    state.parent = true;
	    reaction.ok = isCallable(onFulfilled) ? onFulfilled : true;
	    reaction.fail = isCallable(onRejected) && onRejected;
	    reaction.domain = engineIsNode ? process$3.domain : undefined;
	    if (state.state == PENDING) state.reactions.add(reaction);
	    else microtask(function () {
	      callReaction(reaction, state);
	    });
	    return reaction.promise;
	  });

	  OwnPromiseCapability = function () {
	    var promise = new Internal();
	    var state = getInternalPromiseState(promise);
	    this.promise = promise;
	    this.resolve = bind$1(internalResolve, state);
	    this.reject = bind$1(internalReject, state);
	  };

	  newPromiseCapability.f = newPromiseCapability$1 = function (C) {
	    return C === PromiseConstructor || C === PromiseWrapper
	      ? new OwnPromiseCapability(C)
	      : newGenericPromiseCapability(C);
	  };

	  if ( isCallable(promiseNativeConstructor) && NativePromisePrototype$1 !== Object.prototype) {
	    nativeThen = NativePromisePrototype$1.then;

	    if (!NATIVE_PROMISE_SUBCLASSING) {
	      // make `Promise#then` return a polyfilled `Promise` for native promise-based APIs
	      defineBuiltIn(NativePromisePrototype$1, 'then', function then(onFulfilled, onRejected) {
	        var that = this;
	        return new PromiseConstructor(function (resolve, reject) {
	          functionCall(nativeThen, that, resolve, reject);
	        }).then(onFulfilled, onRejected);
	      // https://github.com/zloirock/core-js/issues/640
	      }, { unsafe: true });
	    }

	    // make `.constructor === Promise` work for native promise-based APIs
	    try {
	      delete NativePromisePrototype$1.constructor;
	    } catch (error) { /* empty */ }

	    // make `instanceof Promise` work for native promise-based APIs
	    if (objectSetPrototypeOf) {
	      objectSetPrototypeOf(NativePromisePrototype$1, PromisePrototype);
	    }
	  }
	}

	_export({ global: true, constructor: true, wrap: true, forced: FORCED_PROMISE_CONSTRUCTOR$1 }, {
	  Promise: PromiseConstructor
	});

	setToStringTag(PromiseConstructor, PROMISE, false);
	setSpecies(PROMISE);

	var iterators = {};

	var ITERATOR = wellKnownSymbol('iterator');
	var ArrayPrototype$1 = Array.prototype;

	// check on default Array iterator
	var isArrayIteratorMethod = function (it) {
	  return it !== undefined && (iterators.Array === it || ArrayPrototype$1[ITERATOR] === it);
	};

	var ITERATOR$1 = wellKnownSymbol('iterator');

	var getIteratorMethod = function (it) {
	  if (!isNullOrUndefined(it)) return getMethod(it, ITERATOR$1)
	    || getMethod(it, '@@iterator')
	    || iterators[classof(it)];
	};

	var $TypeError$b = TypeError;

	var getIterator = function (argument, usingIterator) {
	  var iteratorMethod = arguments.length < 2 ? getIteratorMethod(argument) : usingIterator;
	  if (aCallable(iteratorMethod)) return anObject(functionCall(iteratorMethod, argument));
	  throw $TypeError$b(tryToString(argument) + ' is not iterable');
	};

	var iteratorClose = function (iterator, kind, value) {
	  var innerResult, innerError;
	  anObject(iterator);
	  try {
	    innerResult = getMethod(iterator, 'return');
	    if (!innerResult) {
	      if (kind === 'throw') throw value;
	      return value;
	    }
	    innerResult = functionCall(innerResult, iterator);
	  } catch (error) {
	    innerError = true;
	    innerResult = error;
	  }
	  if (kind === 'throw') throw value;
	  if (innerError) throw innerResult;
	  anObject(innerResult);
	  return value;
	};

	var $TypeError$c = TypeError;

	var Result = function (stopped, result) {
	  this.stopped = stopped;
	  this.result = result;
	};

	var ResultPrototype = Result.prototype;

	var iterate = function (iterable, unboundFunction, options) {
	  var that = options && options.that;
	  var AS_ENTRIES = !!(options && options.AS_ENTRIES);
	  var IS_RECORD = !!(options && options.IS_RECORD);
	  var IS_ITERATOR = !!(options && options.IS_ITERATOR);
	  var INTERRUPTED = !!(options && options.INTERRUPTED);
	  var fn = functionBindContext(unboundFunction, that);
	  var iterator, iterFn, index, length, result, next, step;

	  var stop = function (condition) {
	    if (iterator) iteratorClose(iterator, 'normal', condition);
	    return new Result(true, condition);
	  };

	  var callFn = function (value) {
	    if (AS_ENTRIES) {
	      anObject(value);
	      return INTERRUPTED ? fn(value[0], value[1], stop) : fn(value[0], value[1]);
	    } return INTERRUPTED ? fn(value, stop) : fn(value);
	  };

	  if (IS_RECORD) {
	    iterator = iterable.iterator;
	  } else if (IS_ITERATOR) {
	    iterator = iterable;
	  } else {
	    iterFn = getIteratorMethod(iterable);
	    if (!iterFn) throw $TypeError$c(tryToString(iterable) + ' is not iterable');
	    // optimisation for array iterators
	    if (isArrayIteratorMethod(iterFn)) {
	      for (index = 0, length = lengthOfArrayLike(iterable); length > index; index++) {
	        result = callFn(iterable[index]);
	        if (result && objectIsPrototypeOf(ResultPrototype, result)) return result;
	      } return new Result(false);
	    }
	    iterator = getIterator(iterable, iterFn);
	  }

	  next = IS_RECORD ? iterable.next : iterator.next;
	  while (!(step = functionCall(next, iterator)).done) {
	    try {
	      result = callFn(step.value);
	    } catch (error) {
	      iteratorClose(iterator, 'throw', error);
	    }
	    if (typeof result == 'object' && result && objectIsPrototypeOf(ResultPrototype, result)) return result;
	  } return new Result(false);
	};

	var ITERATOR$2 = wellKnownSymbol('iterator');
	var SAFE_CLOSING = false;

	try {
	  var called = 0;
	  var iteratorWithReturn = {
	    next: function () {
	      return { done: !!called++ };
	    },
	    'return': function () {
	      SAFE_CLOSING = true;
	    }
	  };
	  iteratorWithReturn[ITERATOR$2] = function () {
	    return this;
	  };
	  // eslint-disable-next-line es/no-array-from, no-throw-literal -- required for testing
	  Array.from(iteratorWithReturn, function () { throw 2; });
	} catch (error) { /* empty */ }

	var checkCorrectnessOfIteration = function (exec, SKIP_CLOSING) {
	  if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
	  var ITERATION_SUPPORT = false;
	  try {
	    var object = {};
	    object[ITERATOR$2] = function () {
	      return {
	        next: function () {
	          return { done: ITERATION_SUPPORT = true };
	        }
	      };
	    };
	    exec(object);
	  } catch (error) { /* empty */ }
	  return ITERATION_SUPPORT;
	};

	var FORCED_PROMISE_CONSTRUCTOR$2 = promiseConstructorDetection.CONSTRUCTOR;

	var promiseStaticsIncorrectIteration = FORCED_PROMISE_CONSTRUCTOR$2 || !checkCorrectnessOfIteration(function (iterable) {
	  promiseNativeConstructor.all(iterable).then(undefined, function () { /* empty */ });
	});

	// `Promise.all` method
	// https://tc39.es/ecma262/#sec-promise.all
	_export({ target: 'Promise', stat: true, forced: promiseStaticsIncorrectIteration }, {
	  all: function all(iterable) {
	    var C = this;
	    var capability = newPromiseCapability.f(C);
	    var resolve = capability.resolve;
	    var reject = capability.reject;
	    var result = perform(function () {
	      var $promiseResolve = aCallable(C.resolve);
	      var values = [];
	      var counter = 0;
	      var remaining = 1;
	      iterate(iterable, function (promise) {
	        var index = counter++;
	        var alreadyCalled = false;
	        remaining++;
	        functionCall($promiseResolve, C, promise).then(function (value) {
	          if (alreadyCalled) return;
	          alreadyCalled = true;
	          values[index] = value;
	          --remaining || resolve(values);
	        }, reject);
	      });
	      --remaining || resolve(values);
	    });
	    if (result.error) reject(result.value);
	    return capability.promise;
	  }
	});

	var FORCED_PROMISE_CONSTRUCTOR$3 = promiseConstructorDetection.CONSTRUCTOR;





	var NativePromisePrototype$2 = promiseNativeConstructor && promiseNativeConstructor.prototype;

	// `Promise.prototype.catch` method
	// https://tc39.es/ecma262/#sec-promise.prototype.catch
	_export({ target: 'Promise', proto: true, forced: FORCED_PROMISE_CONSTRUCTOR$3, real: true }, {
	  'catch': function (onRejected) {
	    return this.then(undefined, onRejected);
	  }
	});

	// makes sure that native promise-based APIs `Promise#catch` properly works with patched `Promise#then`
	if ( isCallable(promiseNativeConstructor)) {
	  var method = getBuiltIn('Promise').prototype['catch'];
	  if (NativePromisePrototype$2['catch'] !== method) {
	    defineBuiltIn(NativePromisePrototype$2, 'catch', method, { unsafe: true });
	  }
	}

	// `Promise.race` method
	// https://tc39.es/ecma262/#sec-promise.race
	_export({ target: 'Promise', stat: true, forced: promiseStaticsIncorrectIteration }, {
	  race: function race(iterable) {
	    var C = this;
	    var capability = newPromiseCapability.f(C);
	    var reject = capability.reject;
	    var result = perform(function () {
	      var $promiseResolve = aCallable(C.resolve);
	      iterate(iterable, function (promise) {
	        functionCall($promiseResolve, C, promise).then(capability.resolve, reject);
	      });
	    });
	    if (result.error) reject(result.value);
	    return capability.promise;
	  }
	});

	var FORCED_PROMISE_CONSTRUCTOR$4 = promiseConstructorDetection.CONSTRUCTOR;

	// `Promise.reject` method
	// https://tc39.es/ecma262/#sec-promise.reject
	_export({ target: 'Promise', stat: true, forced: FORCED_PROMISE_CONSTRUCTOR$4 }, {
	  reject: function reject(r) {
	    var capability = newPromiseCapability.f(this);
	    functionCall(capability.reject, undefined, r);
	    return capability.promise;
	  }
	});

	var promiseResolve = function (C, x) {
	  anObject(C);
	  if (isObject(x) && x.constructor === C) return x;
	  var promiseCapability = newPromiseCapability.f(C);
	  var resolve = promiseCapability.resolve;
	  resolve(x);
	  return promiseCapability.promise;
	};

	var FORCED_PROMISE_CONSTRUCTOR$5 = promiseConstructorDetection.CONSTRUCTOR;


	var PromiseConstructorWrapper = getBuiltIn('Promise');

	// `Promise.resolve` method
	// https://tc39.es/ecma262/#sec-promise.resolve
	_export({ target: 'Promise', stat: true, forced:  FORCED_PROMISE_CONSTRUCTOR$5 }, {
	  resolve: function resolve(x) {
	    return promiseResolve( this, x);
	  }
	});

	var FUNCTION_NAME_EXISTS = functionName.EXISTS;

	var defineProperty$3 = objectDefineProperty.f;

	var FunctionPrototype$3 = Function.prototype;
	var functionToString$1 = functionUncurryThis(FunctionPrototype$3.toString);
	var nameRE = /function\b(?:\s|\/\*[\S\s]*?\*\/|\/\/[^\n\r]*[\n\r]+)*([^\s(/]*)/;
	var regExpExec = functionUncurryThis(nameRE.exec);
	var NAME = 'name';

	// Function instances `.name` property
	// https://tc39.es/ecma262/#sec-function-instances-name
	if (descriptors && !FUNCTION_NAME_EXISTS) {
	  defineProperty$3(FunctionPrototype$3, NAME, {
	    configurable: true,
	    get: function () {
	      try {
	        return regExpExec(nameRE, functionToString$1(this))[1];
	      } catch (error) {
	        return '';
	      }
	    }
	  });
	}

	var globalIsFinite = global_1.isFinite;

	// `Number.isFinite` method
	// https://tc39.es/ecma262/#sec-number.isfinite
	// eslint-disable-next-line es/no-number-isfinite -- safe
	var numberIsFinite = Number.isFinite || function isFinite(it) {
	  return typeof it == 'number' && globalIsFinite(it);
	};

	// `Number.isFinite` method
	// https://tc39.es/ecma262/#sec-number.isfinite
	_export({ target: 'Number', stat: true }, { isFinite: numberIsFinite });

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

	var $String$3 = String;

	var toString_1 = function (argument) {
	  if (classof(argument) === 'Symbol') throw TypeError('Cannot convert a Symbol value to a string');
	  return $String$3(argument);
	};

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

	var getOwnPropertyNames = objectGetOwnPropertyNames.f;
	var getOwnPropertyDescriptor$3 = objectGetOwnPropertyDescriptor.f;
	var defineProperty$4 = objectDefineProperty.f;

	var trim = stringTrim.trim;

	var NUMBER = 'Number';
	var NativeNumber = global_1[NUMBER];
	var NumberPrototype = NativeNumber.prototype;
	var TypeError$3 = global_1.TypeError;
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
	  if (isSymbol(it)) throw TypeError$3('Cannot convert a Symbol value to a number');
	  if (typeof it == 'string' && it.length > 2) {
	    it = trim(it);
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
	      defineProperty$4(NumberWrapper, key, getOwnPropertyDescriptor$3(NativeNumber, key));
	    }
	  }
	  NumberWrapper.prototype = NumberPrototype;
	  NumberPrototype.constructor = NumberWrapper;
	  defineBuiltIn(global_1, NUMBER, NumberWrapper, { constructor: true });
	}

	var createProperty = function (object, key, value) {
	  var propertyKey = toPropertyKey(key);
	  if (propertyKey in object) objectDefineProperty.f(object, propertyKey, createPropertyDescriptor(0, value));
	  else object[propertyKey] = value;
	};

	var SPECIES$4 = wellKnownSymbol('species');

	var arrayMethodHasSpeciesSupport = function (METHOD_NAME) {
	  // We can't use this feature detection in V8 since it causes
	  // deoptimization and serious performance degradation
	  // https://github.com/zloirock/core-js/issues/677
	  return engineV8Version >= 51 || !fails(function () {
	    var array = [];
	    var constructor = array.constructor = {};
	    constructor[SPECIES$4] = function () {
	      return { foo: 1 };
	    };
	    return array[METHOD_NAME](Boolean).foo !== 1;
	  });
	};

	var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('slice');

	var SPECIES$5 = wellKnownSymbol('species');
	var $Array$1 = Array;
	var max$1 = Math.max;

	// `Array.prototype.slice` method
	// https://tc39.es/ecma262/#sec-array.prototype.slice
	// fallback for not array-like ES3 strings and DOM objects
	_export({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
	  slice: function slice(start, end) {
	    var O = toIndexedObject(this);
	    var length = lengthOfArrayLike(O);
	    var k = toAbsoluteIndex(start, length);
	    var fin = toAbsoluteIndex(end === undefined ? length : end, length);
	    // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible
	    var Constructor, result, n;
	    if (isArray(O)) {
	      Constructor = O.constructor;
	      // cross-realm fallback
	      if (isConstructor(Constructor) && (Constructor === $Array$1 || isArray(Constructor.prototype))) {
	        Constructor = undefined;
	      } else if (isObject(Constructor)) {
	        Constructor = Constructor[SPECIES$5];
	        if (Constructor === null) Constructor = undefined;
	      }
	      if (Constructor === $Array$1 || Constructor === undefined) {
	        return arraySlice(O, k, fin);
	      }
	    }
	    result = new (Constructor === undefined ? $Array$1 : Constructor)(max$1(fin - k, 0));
	    for (n = 0; k < fin; k++, n++) if (k in O) createProperty(result, n, O[k]);
	    result.length = n;
	    return result;
	  }
	});

	var $find = arrayIteration.find;


	var FIND = 'find';
	var SKIPS_HOLES$1 = true;

	// Shouldn't skip holes
	if (FIND in []) Array(1)[FIND](function () { SKIPS_HOLES$1 = false; });

	// `Array.prototype.find` method
	// https://tc39.es/ecma262/#sec-array.prototype.find
	_export({ target: 'Array', proto: true, forced: SKIPS_HOLES$1 }, {
	  find: function find(callbackfn /* , that = undefined */) {
	    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
	addToUnscopables(FIND);

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

	var $TypeError$d = TypeError;

	// `Array.prototype.{ reduce, reduceRight }` methods implementation
	var createMethod$3 = function (IS_RIGHT) {
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
	        throw $TypeError$d('Reduce of empty array with no initial value');
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
	  left: createMethod$3(false),
	  // `Array.prototype.reduceRight` method
	  // https://tc39.es/ecma262/#sec-array.prototype.reduceright
	  right: createMethod$3(true)
	};

	var $reduce = arrayReduce.left;




	var STRICT_METHOD$2 = arrayMethodIsStrict('reduce');
	// Chrome 80-82 has a critical bug
	// https://bugs.chromium.org/p/chromium/issues/detail?id=1049982
	var CHROME_BUG = !engineIsNode && engineV8Version > 79 && engineV8Version < 83;

	// `Array.prototype.reduce` method
	// https://tc39.es/ecma262/#sec-array.prototype.reduce
	_export({ target: 'Array', proto: true, forced: !STRICT_METHOD$2 || CHROME_BUG }, {
	  reduce: function reduce(callbackfn /* , initialValue */) {
	    var length = arguments.length;
	    return $reduce(this, callbackfn, length, length > 1 ? arguments[1] : undefined);
	  }
	});

	var $Function = Function;
	var concat$1 = functionUncurryThis([].concat);
	var join = functionUncurryThis([].join);
	var factories = {};

	var construct$1 = function (C, argsLength, args) {
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
	    return this instanceof boundFunction ? construct$1(F, args.length, args) : F.apply(that, args);
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

	/* eslint-disable es/no-array-prototype-indexof -- required for testing */


	var $indexOf = arrayIncludes.indexOf;


	var nativeIndexOf = functionUncurryThis([].indexOf);

	var NEGATIVE_ZERO = !!nativeIndexOf && 1 / nativeIndexOf([1], 1, -0) < 0;
	var STRICT_METHOD$3 = arrayMethodIsStrict('indexOf');

	// `Array.prototype.indexOf` method
	// https://tc39.es/ecma262/#sec-array.prototype.indexof
	_export({ target: 'Array', proto: true, forced: NEGATIVE_ZERO || !STRICT_METHOD$3 }, {
	  indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
	    var fromIndex = arguments.length > 1 ? arguments[1] : undefined;
	    return NEGATIVE_ZERO
	      // convert -0 to +0
	      ? nativeIndexOf(this, searchElement, fromIndex) || 0
	      : $indexOf(this, searchElement, fromIndex);
	  }
	});

	var MATCH = wellKnownSymbol('match');

	// `IsRegExp` abstract operation
	// https://tc39.es/ecma262/#sec-isregexp
	var isRegexp = function (it) {
	  var isRegExp;
	  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : classofRaw(it) == 'RegExp');
	};

	var $TypeError$e = TypeError;

	var notARegexp = function (it) {
	  if (isRegexp(it)) {
	    throw $TypeError$e("The method doesn't accept regular expressions");
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

	var FAILS_ON_PRIMITIVES = fails(function () { objectKeys(1); });

	// `Object.keys` method
	// https://tc39.es/ecma262/#sec-object.keys
	_export({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES }, {
	  keys: function keys(it) {
	    return objectKeys(toObject(it));
	  }
	});

	// `Array.prototype.fill` method implementation
	// https://tc39.es/ecma262/#sec-array.prototype.fill
	var arrayFill = function fill(value /* , start = 0, end = @length */) {
	  var O = toObject(this);
	  var length = lengthOfArrayLike(O);
	  var argumentsLength = arguments.length;
	  var index = toAbsoluteIndex(argumentsLength > 1 ? arguments[1] : undefined, length);
	  var end = argumentsLength > 2 ? arguments[2] : undefined;
	  var endPos = end === undefined ? length : toAbsoluteIndex(end, length);
	  while (endPos > index) O[index++] = value;
	  return O;
	};

	// `Array.prototype.fill` method
	// https://tc39.es/ecma262/#sec-array.prototype.fill
	_export({ target: 'Array', proto: true }, {
	  fill: arrayFill
	});

	// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
	addToUnscopables('fill');

	var $filter = arrayIteration.filter;


	var HAS_SPECIES_SUPPORT$1 = arrayMethodHasSpeciesSupport('filter');

	// `Array.prototype.filter` method
	// https://tc39.es/ecma262/#sec-array.prototype.filter
	// with adding support of @@species
	_export({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$1 }, {
	  filter: function filter(callbackfn /* , thisArg */) {
	    return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var $map = arrayIteration.map;


	var HAS_SPECIES_SUPPORT$2 = arrayMethodHasSpeciesSupport('map');

	// `Array.prototype.map` method
	// https://tc39.es/ecma262/#sec-array.prototype.map
	// with adding support of @@species
	_export({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$2 }, {
	  map: function map(callbackfn /* , thisArg */) {
	    return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var trim$1 = stringTrim.trim;


	var $parseInt = global_1.parseInt;
	var Symbol$2 = global_1.Symbol;
	var ITERATOR$3 = Symbol$2 && Symbol$2.iterator;
	var hex = /^[+-]?0x/i;
	var exec$1 = functionUncurryThis(hex.exec);
	var FORCED = $parseInt(whitespaces + '08') !== 8 || $parseInt(whitespaces + '0x16') !== 22
	  // MS Edge 18- broken with boxed symbols
	  || (ITERATOR$3 && !fails(function () { $parseInt(Object(ITERATOR$3)); }));

	// `parseInt` method
	// https://tc39.es/ecma262/#sec-parseint-string-radix
	var numberParseInt = FORCED ? function parseInt(string, radix) {
	  var S = trim$1(toString_1(string));
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

	var $TypeError$f = TypeError;
	var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF; // 2 ** 53 - 1 == 9007199254740991

	var doesNotExceedSafeInteger = function (it) {
	  if (it > MAX_SAFE_INTEGER) throw $TypeError$f('Maximum allowed index exceeded');
	  return it;
	};

	var IS_CONCAT_SPREADABLE = wellKnownSymbol('isConcatSpreadable');

	// We can't use this feature detection in V8 since it causes
	// deoptimization and serious performance degradation
	// https://github.com/zloirock/core-js/issues/679
	var IS_CONCAT_SPREADABLE_SUPPORT = engineV8Version >= 51 || !fails(function () {
	  var array = [];
	  array[IS_CONCAT_SPREADABLE] = false;
	  return array.concat()[0] !== array;
	});

	var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('concat');

	var isConcatSpreadable = function (O) {
	  if (!isObject(O)) return false;
	  var spreadable = O[IS_CONCAT_SPREADABLE];
	  return spreadable !== undefined ? !!spreadable : isArray(O);
	};

	var FORCED$1 = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT;

	// `Array.prototype.concat` method
	// https://tc39.es/ecma262/#sec-array.prototype.concat
	// with adding support of @@isConcatSpreadable and @@species
	_export({ target: 'Array', proto: true, arity: 1, forced: FORCED$1 }, {
	  // eslint-disable-next-line no-unused-vars -- required for `.length`
	  concat: function concat(arg) {
	    var O = toObject(this);
	    var A = arraySpeciesCreate(O, 0);
	    var n = 0;
	    var i, k, length, len, E;
	    for (i = -1, length = arguments.length; i < length; i++) {
	      E = i === -1 ? O : arguments[i];
	      if (isConcatSpreadable(E)) {
	        len = lengthOfArrayLike(E);
	        doesNotExceedSafeInteger(n + len);
	        for (k = 0; k < len; k++, n++) if (k in E) createProperty(A, n, E[k]);
	      } else {
	        doesNotExceedSafeInteger(n + 1);
	        createProperty(A, n++, E);
	      }
	    }
	    A.length = n;
	    return A;
	  }
	});

	var Plot = basic_mjs.Generic.extend({
	  markup: ['<clipPath class="clip"><rect/></clipPath>', '<g class="rotatable">', '<g class="scalable"></g>', '<g class="background"><rect/><text/></g>', '<g class="axis">', '<g class="y-axis"><path/><g class="ticks"></g></g>', '<g class="x-axis"><path/><g class="ticks"></g></g>', '<g class="markings"></g>', '</g>', '<g class="data"><g class="series"></g></g>', '<g class="foreground">', '<rect/><text class="caption"/><text class="subcaption"/>', '<g class="legend"><g class="legend-items"></g></g>', '<line class="guideline x-guideline" /><line class="guideline y-guideline" />', '</g>', '</g>'].join(''),
	  tickMarkup: '<g class="tick"><line/><text/></g>',
	  pointMarkup: '<g class="point"><circle/><text/></g>',
	  barMarkup: '<path class="bar"/>',
	  markingMarkup: '<g class="marking"><rect/><text/></g>',
	  serieMarkup: '<g><clipPath class="serie-clip"><rect/></clipPath><path/><g class="bars"></g><g class="points"></g></g>',
	  legendItemMarkup: '<g class="legend-item"><circle/><text/></g>',
	  defaults: core_mjs.util.deepSupplement({
	    type: 'chart.Plot',
	    attrs: {
	      '.data path': {
	        fill: 'none',
	        stroke: 'black'
	      },
	      '.data .bars rect': {
	        fill: 'none',
	        stroke: 'black'
	      },
	      '.background rect': {
	        fill: 'white',
	        stroke: '#e5e5e5',
	        opacity: 1
	      },
	      '.background text': {
	        fill: 'black',
	        text: 'No data available.',
	        ref: '.',
	        'ref-x': .5,
	        'ref-y': .5,
	        'text-anchor': 'middle',
	        'y-alignment': 'middle',
	        display: 'none'
	      },
	      '.foreground > rect': {
	        fill: 'white',
	        stroke: '#e5e5e5',
	        opacity: 0,
	        'pointer-events': 'none'
	      },
	      '.foreground .caption': {
	        fill: 'black',
	        text: '',
	        ref: '.foreground > rect',
	        'ref-x': .5,
	        'ref-y': 10,
	        'text-anchor': 'middle',
	        'y-alignment': 'middle',
	        'font-size': 14
	      },
	      '.foreground .subcaption': {
	        fill: 'black',
	        text: '',
	        ref: '.foreground > rect',
	        'ref-x': .5,
	        'ref-y': 23,
	        'text-anchor': 'middle',
	        'y-alignment': 'middle',
	        'font-size': 10
	      },
	      '.point': {
	        display: 'inline-block'
	      },
	      '.point circle': {
	        r: 2,
	        stroke: 'black',
	        fill: 'black',
	        'opacity': .3
	      },
	      '.point text': {
	        fill: 'black',
	        'font-size': 8,
	        'text-anchor': 'middle',
	        display: 'none'
	      },
	      '.axis path': {
	        fill: 'none',
	        stroke: 'black'
	      },
	      '.axis .tick': {
	        fill: 'none',
	        stroke: 'black'
	      },
	      '.y-axis .tick line': {
	        fill: 'none',
	        stroke: 'black',
	        x2: 2,
	        y2: 0,
	        opacity: 1
	      },
	      '.x-axis .tick line': {
	        fill: 'none',
	        stroke: 'black',
	        x2: 0,
	        y2: -3,
	        opacity: 1
	      },
	      '.y-axis .tick text': {
	        fill: 'black',
	        stroke: 'none',
	        'font-size': 10,
	        'text-anchor': 'end'
	      },
	      '.x-axis .tick text': {
	        fill: 'black',
	        stroke: 'none',
	        'font-size': 10,
	        'text-anchor': 'middle'
	      },
	      '.y-axis .tick text > tspan': {
	        dy: '-.5em',
	        x: -5
	      },
	      '.x-axis .tick text > tspan': {
	        dy: '.5em',
	        x: 0
	      },
	      '.axis .markings': {
	        fill: 'black',
	        stroke: 'none',
	        'fill-opacity': 1
	      },
	      '.axis .markings text': {
	        fill: 'black',
	        'text-anchor': 'end',
	        'font-size': 10,
	        dy: -5,
	        dx: -5
	      },
	      '.guideline': {
	        'pointer-events': 'none',
	        display: 'none'
	      },
	      '.x-guideline': {
	        stroke: 'black',
	        visibility: 'hidden'
	      },
	      '.y-guideline': {
	        stroke: 'black',
	        visibility: 'hidden'
	      },
	      '.legend': {
	        'ref-x': 10,
	        'ref-y': 10
	      },
	      '.legend-item text': {
	        fill: 'black',
	        transform: 'translate(14, 0)',
	        'font-size': 11
	      },
	      '.legend-item circle': {
	        r: 5,
	        transform: 'translate(5,5)'
	      },
	      '.legend-item': {
	        cursor: 'pointer'
	      },
	      '.legend-item.disabled circle': {
	        fill: 'gray'
	      },
	      '.legend-item.disabled text': {
	        opacity: .5
	      }
	    }
	  }, basic_mjs.Generic.prototype.defaults),
	  legendPosition: function legendPosition(pos, opt) {
	    opt = opt || {};
	    this.trigger('batch:start');

	    // Clean up previous attributes first. Do it silently so that we don't unncessarilly trigger updates.
	    ['.legend/ref-x', '.legend/ref-y', '.legend/ref-dx', '.legend/ref-dy', '.legend/x-alignment', '.legend/y-alignment'].forEach(function (item) {
	      this.removeAttr(item, {
	        silent: true
	      });
	    }, this);
	    var padding = opt.padding || 10;
	    var attrs = {
	      n: {
	        '.legend': {
	          'ref-x': .5,
	          'x-alignment': -.5,
	          'ref-y': padding
	        }
	      },
	      ne: {
	        '.legend': {
	          'ref-dx': -padding,
	          'x-alignment': -.999,
	          'ref-y': padding
	        }
	      },
	      e: {
	        '.legend': {
	          'ref-dx': -padding,
	          'x-alignment': -.999,
	          'ref-y': .5,
	          'y-alignment': -.5
	        }
	      },
	      se: {
	        '.legend': {
	          'ref-dx': -padding,
	          'ref-dy': -padding,
	          'x-alignment': -.999,
	          'y-alignment': -.999
	        }
	      },
	      s: {
	        '.legend': {
	          'ref-x': .5,
	          'ref-dy': -padding,
	          'x-alignment': -.5,
	          'y-alignment': -.999
	        }
	      },
	      sw: {
	        '.legend': {
	          'ref-x': padding,
	          'ref-dy': -padding,
	          'y-alignment': -.999
	        }
	      },
	      w: {
	        '.legend': {
	          'ref-x': padding,
	          'ref-y': .5,
	          'y-alignment': -.5
	        }
	      },
	      nw: {
	        '.legend': {
	          'ref-x': padding,
	          'ref-y': padding
	        }
	      },
	      nnw: {
	        '.legend': {
	          'ref-x': padding,
	          'ref-y': -padding,
	          'y-alignment': -.999
	        }
	      },
	      nn: {
	        '.legend': {
	          'ref-x': .5,
	          'ref-y': -padding,
	          'x-alignment': -.5,
	          'y-alignment': -.999
	        }
	      },
	      nne: {
	        '.legend': {
	          'ref-dx': -padding,
	          'ref-y': -padding,
	          'x-alignment': -.999,
	          'y-alignment': -.999
	        }
	      },
	      nnee: {
	        '.legend': {
	          'ref-dx': padding,
	          'ref-y': -padding,
	          'y-alignment': -.999
	        }
	      },
	      nee: {
	        '.legend': {
	          'ref-y': padding,
	          'ref-dx': padding
	        }
	      },
	      ee: {
	        '.legend': {
	          'ref-dx': padding,
	          'ref-y': .5,
	          'y-alignment': -.5
	        }
	      },
	      see: {
	        '.legend': {
	          'ref-dx': padding,
	          'ref-dy': -padding,
	          'y-alignment': -.999
	        }
	      },
	      ssee: {
	        '.legend': {
	          'ref-dx': padding,
	          'ref-dy': padding
	        }
	      },
	      sse: {
	        '.legend': {
	          'ref-dx': -padding,
	          'ref-dy': padding,
	          'x-alignment': -.999
	        }
	      },
	      ss: {
	        '.legend': {
	          'ref-x': .5,
	          'ref-dy': padding,
	          'x-alignment': -.5
	        }
	      },
	      ssw: {
	        '.legend': {
	          'ref-x': padding,
	          'ref-dy': padding
	        }
	      },
	      ssww: {
	        '.legend': {
	          'ref-x': -padding,
	          'ref-dy': padding,
	          'x-alignment': -.999
	        }
	      },
	      sww: {
	        '.legend': {
	          'ref-x': -padding,
	          'ref-dy': -padding,
	          'x-alignment': -.999,
	          'y-alignment': -.999
	        }
	      },
	      ww: {
	        '.legend': {
	          'ref-x': -padding,
	          'ref-y': .5,
	          'x-alignment': -.999,
	          'y-alignment': -.5
	        }
	      },
	      nww: {
	        '.legend': {
	          'ref-x': -padding,
	          'ref-y': padding,
	          'x-alignment': -.999
	        }
	      },
	      nnww: {
	        '.legend': {
	          'ref-x': -padding,
	          'ref-y': -padding,
	          'x-alignment': -.999,
	          'y-alignment': -.999
	        }
	      }
	    };
	    if (attrs[pos]) {
	      this.attr(attrs[pos]);
	    }
	    this.trigger('batch:stop');
	  },
	  // Add point `p` as the last point to the serie identified by `serieName`. If `opt.maxLen` is set and
	  // the number of points in the serie is higher than `maxLen`, shift the data in the serie.
	  addPoint: function addPoint(p, serieName, opt) {
	    opt = opt || {};
	    var series = this.get('series');
	    var serieIndex = core_mjs.util.toArray(series).findIndex(function (item) {
	      return item.name === serieName;
	    });
	    if (serieIndex === -1) {
	      throw new Error('Serie ' + serieName + ' was not found.');
	    }

	    // Clone the serie so that the normal Backbone mechanism for `set()` and `prev()` works as expected.
	    var serie = core_mjs.util.cloneDeep(series[serieIndex]);
	    serie.data.push(p);
	    if (Number.isFinite(opt.maxLen) && serie.data.length > opt.maxLen) {
	      serie.data.shift();
	    }

	    // Again, slice the array so that we don't alter the `series` array currently set.
	    series = series.slice();
	    series[serieIndex] = serie;
	    this.set('series', series, opt);
	  },
	  // Return the last point in the serie identified by `serieName`.
	  lastPoint: function lastPoint(serieName) {
	    var serie = core_mjs.util.toArray(this.get('series')).find(function (item) {
	      return item && item.name === serieName;
	    }).data;
	    return serie[serie.length - 1];
	  },
	  // Return the first point in the serie identified by `serieName`.
	  firstPoint: function firstPoint(serieName) {
	    return core_mjs.util.toArray(this.get('series')).find(function (item) {
	      return item && item.name === serieName;
	    }).data[0];
	  }
	});
	var PlotView = core_mjs.dia.ElementView.extend({
	  events: {
	    'mousemove': 'onMouseMove',
	    'mouseout': 'onMouseOut'
	  },
	  presentationAttributes: core_mjs.dia.ElementView.addPresentationAttributes({
	    series: ['UPDATE'],
	    interpolate: ['UPDATE'],
	    padding: ['UPDATE'],
	    canvas: ['UPDATE'],
	    markings: ['UPDATE'],
	    axis: ['UPDATE']
	  }),
	  initialize: function initialize() {
	    core_mjs.dia.ElementView.prototype.initialize.apply(this, arguments);
	    this.on('cell:pointerdown', this.onPointerDown, this);

	    // A list of disabled serie names. This is used when toggling series via the legend
	    // or programmatically.
	    this._disabledSeries = [];
	  },
	  renderMarkup: function renderMarkup() {
	    core_mjs.dia.ElementView.prototype.renderMarkup.apply(this, arguments);

	    // Cache important elements for faster access.
	    this.elDataClipPath = this.$('.clip')[0];
	    this.elDataClipPathRect = this.elDataClipPath.firstChild;
	    this.elBackgroundRect = this.$('.background rect')[0];
	    this.elBackgroundText = this.$('.background text')[0];
	    this.elForeground = this.$('.foreground')[0];
	    this.elForegroundRect = this.$('.foreground rect')[0];
	    this.elDataSeries = this.$('.data .series')[0];
	    this.elYAxisPath = this.$('.y-axis path')[0];
	    this.elYAxisTicks = this.$('.y-axis .ticks')[0];
	    this.elXAxisPath = this.$('.x-axis path')[0];
	    this.elXAxisTicks = this.$('.x-axis .ticks')[0];
	    this.elMarkings = this.$('.axis .markings')[0];
	    this.elXGuideline = this.$('.x-guideline')[0];
	    this.elYGuideline = this.$('.y-guideline')[0];
	    this.elLegend = this.$('.legend')[0];
	    this.elLegendItems = this.$('.legend-items')[0];

	    // An SVG element for repeatable elements. This will be used as an original for future clones.
	    this.elTick = core_mjs.V(this.model.tickMarkup);
	    this.elMarking = core_mjs.V(this.model.markingMarkup);
	    this.elLegendItem = core_mjs.V(this.model.legendItemMarkup);
	    this.elPoint = core_mjs.V(this.model.pointMarkup);
	    this.elBar = core_mjs.V(this.model.barMarkup);
	    this.elSerie = core_mjs.V(this.model.serieMarkup);

	    // Create clip region for the chart area and for the markings as they could also be out
	    // of the clip region.
	    this.elDataClipPath.id = 'clip_' + this.cid;
	    core_mjs.V(this.$('.data')[0]).attr('clip-path', 'url(#' + this.elDataClipPath.id + ')');
	    core_mjs.V(this.elMarkings).attr('clip-path', 'url(#' + this.elDataClipPath.id + ')');
	  },
	  update: function update() {
	    var series = this.filterSeries();

	    // Get statistics about the series.
	    this.calculateStats(series);
	    var size = this.model.get('size');
	    var width = size.width;
	    var height = size.height;

	    // Chart area.
	    this.canvas = core_mjs.util.assign({
	      x: 0,
	      y: 0,
	      width: width,
	      height: height
	    }, this.model.get('canvas'));

	    // Padding. In theory, padding is not necessary as one can always set the canvas area
	    // directly. However, it is much more convenient to be able to set a padding only for
	    // a specific dimension(s) (top/right/bottom/left) and let the canvas alone.
	    // Note that it is always advisable to set `padding` for bar charts, otherwise
	    // some of the bars (or their parts - depending on the `align` option) won't be visible.
	    var padding;
	    var defaultPadding = {
	      top: 0,
	      right: 0,
	      bottom: 0,
	      left: 0
	    };
	    var modelPadding = this.model.get('padding');
	    if (core_mjs.util.isObject(modelPadding)) {
	      padding = core_mjs.util.assign({}, defaultPadding, modelPadding);
	    } else if (modelPadding !== undefined) {
	      // The padding is assumed to be a number. In this case, compensate for the right/bottom coordinates
	      // automatically. So that if e.g. `padding` is `10`, the chart area is moved `10px` from the left
	      // and the width becomes `2*10px` less so that there is also `10px` padding from the right.
	      padding = {
	        top: modelPadding,
	        right: 2 * modelPadding,
	        bottom: 2 * modelPadding,
	        left: modelPadding
	      };
	    } else {
	      padding = defaultPadding;
	    }
	    this.canvas = core_mjs.g.rect(this.canvas).moveAndExpand(core_mjs.g.rect(padding.left, padding.top, -padding.right, -padding.bottom));
	    var viewRect = {
	      x: 0,
	      y: 0,
	      width: width,
	      height: height
	    };
	    core_mjs.V(this.elDataClipPathRect).attr(viewRect);
	    core_mjs.V(this.elBackgroundRect).attr(viewRect);
	    core_mjs.V(this.elForegroundRect).attr(viewRect);
	    this.updateAxis();
	    this.updateMarkings();
	    if (this.isEmpty()) {
	      // No data available.
	      // Show the "No data available" label that is hidden by default.
	      $(this.elBackgroundText).show();
	    } else {
	      $(this.elBackgroundText).hide();
	    }
	    this.updateSeries(series);
	    this.updateLegend();

	    // Apply attrs.
	    core_mjs.dia.ElementView.prototype.update.apply(this, arguments);
	  },
	  calculateStats: function calculateStats(series) {
	    series = series || this.model.get('series');
	    var xValues = [];
	    var yValues = [];
	    // `xMap` maps x values to an array of series these x values appear in and the corresponding
	    // y values. This is useful when we want to, for a given x value, retriev all the corresponding
	    // y values from all the series this x value appeared in (especially useful in tooltips).
	    var xMap = {};
	    var yMap = {};
	    var bySerie = {};
	    core_mjs.util.toArray(series).forEach(function (serie, idx) {
	      var stats = bySerie[serie.name || idx] || (bySerie[serie.name || idx] = {});

	      // Initial assumptions.
	      stats.decreasingX = true;
	      stats.decreasingY = true;
	      stats.nonDecreasingX = true;
	      stats.nonDecreasingY = true;
	      var prev; // Previous data point.

	      core_mjs.util.forIn(serie.data, function (dp) {
	        stats.minX = stats.minX === undefined ? dp.x : Math.min(stats.minX, dp.x);
	        stats.maxX = stats.maxX === undefined ? dp.x : Math.max(stats.maxX, dp.x);
	        stats.minY = stats.minY === undefined ? dp.y : Math.min(stats.minY, dp.y);
	        stats.maxY = stats.maxY === undefined ? dp.y : Math.max(stats.maxY, dp.y);
	        if (prev) {
	          stats.decreasingX = stats.decreasingX && dp.x < prev.x;
	          stats.decreasingY = stats.decreasingY && dp.y < prev.y;
	          stats.nonDecreasingX = stats.nonDecreasingX && dp.x >= prev.x;
	          stats.nonDecreasingY = stats.nonDecreasingY && dp.y >= prev.y;
	        }
	        if (!xValues.includes(dp.x)) xValues.push(dp.x);
	        if (!yValues.includes(dp.y)) yValues.push(dp.y);
	        (xMap[dp.x] || (xMap[dp.x] = [])).push({
	          serie: serie,
	          x: dp.x,
	          y: dp.y
	        });
	        (yMap[dp.y] || (yMap[dp.y] = [])).push({
	          serie: serie,
	          x: dp.x,
	          y: dp.y
	        });
	        prev = dp;
	      });
	    });
	    var axis = this.model.get('axis') || {};
	    var xAxis = axis['x-axis'] || {};
	    var yAxis = axis['y-axis'] || {};
	    this.stats = {
	      minX: xAxis.min === undefined ? xValues.reduce(function (min, item) {
	        return item < min ? item : min;
	      }, Infinity) : xAxis.min,
	      maxX: xAxis.max === undefined ? xValues.reduce(function (max, item) {
	        return item > max ? item : max;
	      }, -Infinity) : xAxis.max,
	      minY: yAxis.min === undefined ? yValues.reduce(function (min, item) {
	        return item < min ? item : min;
	      }, Infinity) : yAxis.min,
	      maxY: yAxis.max === undefined ? yValues.reduce(function (max, item) {
	        return item > max ? item : max;
	      }, -Infinity) : yAxis.max,
	      bySerie: bySerie,
	      xValues: xValues,
	      yValues: yValues,
	      xMap: xMap,
	      yMap: yMap
	    };
	  },
	  isEmpty: function isEmpty() {
	    return !this.stats.xValues.length;
	  },
	  updateSeries: function updateSeries(series) {
	    series = series || this.model.get('series');

	    // Remove all the previously rendered series.
	    this.elDataSeries.textContent = '';
	    if (this.isEmpty()) return;
	    var xDomain = [this.stats.minX, this.stats.maxX];
	    var yDomain = [this.stats.minY, this.stats.maxY];
	    var xRange = [this.canvas.x, this.canvas.x + this.canvas.width];
	    // Note how the `yRange` is inverted. This is because we render points from bottom to top.
	    var yRange = [this.canvas.y + this.canvas.height, this.canvas.y];
	    var attrs = this.model.get('attrs');
	    core_mjs.util.toArray(series).forEach(function (serie, i) {
	      var points = serie.data;
	      var transformedPoints = [];
	      var elSerie = this.elSerie.clone().attr('class', serie.name || 'serie-' + i);
	      core_mjs.V(this.elDataSeries).append(elSerie);
	      core_mjs.util.forIn(points, function (p) {
	        // Transform the data point to the chart area.
	        var x = core_mjs.g.scale.linear(xDomain, xRange, p.x);
	        var y = core_mjs.g.scale.linear(yDomain, yRange, p.y);
	        transformedPoints.push({
	          x: x,
	          y: y
	        });

	        // Set position of the point element circle and label.
	        // A little optimization: do not render the points if they're not turned on.
	        if (attrs['.point'] && attrs['.point'].display !== 'none') {
	          this.renderPoint(p, serie);
	        }
	        if (serie.bars) {
	          this.renderBar(p, serie);
	        }
	      }.bind(this));

	      // Clip the serie path in order to clip the helper continuation of the path
	      // that is used to close the path for filling. (see `fixPathForFill()`).
	      var elSeriePathClip = elSerie.findOne('.serie-clip');
	      var size = this.model.get('size');
	      var stats = this.stats.bySerie[serie.name || i];
	      var minX = core_mjs.g.scale.linear(xDomain, xRange, stats.minX);
	      var maxX = core_mjs.g.scale.linear(xDomain, xRange, stats.maxX);
	      var elSeriePathClipRect = elSeriePathClip.findOne('rect');
	      elSeriePathClipRect.attr(core_mjs.g.rect(minX, 0, maxX - minX, size.height));
	      if (!serie.bars) {
	        // Bars were already rendered for each data point.

	        var elSeriePath = elSerie.findOne('path');
	        elSeriePath.attr({
	          d: this.seriePathData(transformedPoints, serie, i),
	          'clip-path': 'url(#' + elSeriePathClip.node.id + ')'
	        });
	      }
	    }, this);
	  },
	  seriePathClipData: function seriePathClipData(points, serie) {
	    var padding = 10;
	    var size = this.model.get('size');
	    var firstPoint = points[0];
	    var d = ['M', firstPoint.x, firstPoint.y, 'V', size.height + padding];
	    return d.join(' ');
	  },
	  renderBar: function renderBar(p, serie) {
	    var xDomain = [this.stats.minX, this.stats.maxX];
	    var yDomain = [this.stats.minY, this.stats.maxY];
	    var xRange = [this.canvas.x, this.canvas.x + this.canvas.width];
	    // Note how the `yRange` is inverted. This is because we render points from bottom to top.
	    var yRange = [this.canvas.y + this.canvas.height, this.canvas.y];

	    // Transform the data point to the chart area.
	    var x = core_mjs.g.scale.linear(xDomain, xRange, p.x);
	    var y = core_mjs.g.scale.linear(yDomain, yRange, p.y);
	    var definedBarWidth = serie.bars.barWidth || .8;
	    var barWidth = definedBarWidth > 1 ? definedBarWidth : this.canvas.width / (this.stats.maxX - this.stats.minX) * definedBarWidth;
	    var barHeight = core_mjs.g.scale.linear(yDomain, yRange, 0) - y;

	    // Edge case: y-axis domain min and max are the same.
	    // Place the bar at the bottom of the canvas area within padding.
	    // The bar has zero height.
	    if (yDomain[0] === yDomain[1]) {
	      y = this.canvas.y + this.canvas.height;
	      barHeight = 0;
	    }

	    // `rx` values can be defined either directly in the data point for a specific bar
	    // or on the `serie` object for all the bars.
	    var topRx = p['top-rx'] || serie.bars['top-rx'];
	    var topRy = p['top-ry'] || serie.bars['top-ry'];
	    var bottomRx = p['bottom-rx'] || serie.bars['bottom-rx'];
	    var bottomRy = p['bottom-ry'] || serie.bars['bottom-ry'];

	    // Alignment of the bar against the x coordinate. `'left'` is the default.
	    var barX = {
	      'left': x,
	      'middle': x - barWidth / 2,
	      'right': x - barWidth
	    }[serie.bars.align || 'middle'];
	    var elBar = this.elBar.clone();
	    elBar.attr({
	      'data-serie': serie.name,
	      'data-x': p.x,
	      'data-y': p.y,
	      d: core_mjs.V.rectToPath({
	        x: barX,
	        y: y,
	        width: barWidth,
	        height: barHeight,
	        'top-rx': topRx,
	        'top-ry': topRy,
	        'bottom-rx': bottomRx,
	        'bottom-ry': bottomRy
	      })
	    });
	    var serieSelector = serie.name || 'serie-' + this.model.get('series').indexOf(serie);
	    core_mjs.V(this.elDataSeries).findOne('.' + serieSelector + ' .bars').append(elBar);
	    return elBar.node;
	  },
	  renderPoint: function renderPoint(p, serie) {
	    var xDomain = [this.stats.minX, this.stats.maxX];
	    var yDomain = [this.stats.minY, this.stats.maxY];
	    var xRange = [this.canvas.x, this.canvas.x + this.canvas.width];
	    // Note how the `yRange` is inverted. This is because we render points from bottom to top.
	    var yRange = [this.canvas.y + this.canvas.height, this.canvas.y];

	    // Transform the data point to the chart area.
	    var x = core_mjs.g.scale.linear(xDomain, xRange, p.x);
	    var y = core_mjs.g.scale.linear(yDomain, yRange, p.y);

	    // Edge case: y-axis domain min and max are the same.
	    // Place the point at the bottom of the canvas area within padding.
	    if (yDomain[0] === yDomain[1]) y = this.canvas.y + this.canvas.height;
	    var elPoint = this.elPoint.clone();
	    elPoint.attr({
	      'data-serie': serie.name,
	      'data-x': p.x,
	      'data-y': p.y
	    });
	    elPoint.findOne('circle').attr({
	      cx: x,
	      cy: y
	    });
	    elPoint.findOne('text').attr({
	      x: x,
	      dy: y
	    }).text(this.pointLabel(p, serie));
	    var serieSelector = serie.name || 'serie-' + this.model.get('series').indexOf(serie);
	    core_mjs.V(this.elDataSeries).findOne('.' + serieSelector + ' .points').append(elPoint);
	    return elPoint.node;
	  },
	  // Construct an SVG path for the data points. Use interpolation if desired.
	  seriePathData: function seriePathData(points, serie, idx) {
	    var i;
	    var pointsLength = points.length;
	    var yDomain = [this.stats.minY, this.stats.maxY];

	    // Edge case: y-axis domain min and max are the same.
	    // Place all points at the bottom of the canvas area within padding.
	    if (yDomain[0] === yDomain[1]) {
	      for (i = 0; i < pointsLength; i++) {
	        points[i].y = this.canvas.y + this.canvas.height;
	      }
	    }
	    var path;
	    var interpolate = serie.interpolate === undefined ? this.model.get('interpolate') : serie.interpolate;
	    switch (interpolate) {
	      case 'bezier':
	        path = new core_mjs.g.Path(core_mjs.g.Curve.throughPoints(points));
	        break;
	      case 'step':
	        path = new core_mjs.g.Path();
	        path.appendSegment(core_mjs.g.Path.createSegment('M', points[0].x, points[0].y));
	        for (i = 1; i < pointsLength; i++) {
	          path.appendSegment(core_mjs.g.Path.createSegment('L', (points[i - 1].x + points[i].x) / 2, points[i - 1].y));
	          path.appendSegment(core_mjs.g.Path.createSegment('L', (points[i - 1].x + points[i].x) / 2, points[i].y));
	        }
	        path.appendSegment(core_mjs.g.Path.createSegment('L', points[pointsLength - 1].x, points[pointsLength - 1].y));
	        break;
	      case 'stepBefore':
	        path = new core_mjs.g.Path();
	        path.appendSegment(core_mjs.g.Path.createSegment('M', points[0].x, points[0].y));
	        for (i = 1; i < pointsLength; i++) {
	          path.appendSegment(core_mjs.g.Path.createSegment('L', points[i - 1].x, points[i].y));
	          path.appendSegment(core_mjs.g.Path.createSegment('L', points[i].x, points[i].y));
	        }
	        break;
	      case 'stepAfter':
	        path = new core_mjs.g.Path();
	        path.appendSegment(core_mjs.g.Path.createSegment('M', points[0].x, points[0].y));
	        for (i = 1; i < pointsLength; i++) {
	          path.appendSegment(core_mjs.g.Path.createSegment('L', points[i].x, points[i - 1].y));
	          path.appendSegment(core_mjs.g.Path.createSegment('L', points[i].x, points[i].y));
	        }
	        break;
	      default:
	        // linear
	        path = new core_mjs.g.Path();
	        path.appendSegment(core_mjs.g.Path.createSegment('M', points[0].x, points[0].y));
	        for (i = 1; i < pointsLength; i++) {
	          path.appendSegment(core_mjs.g.Path.createSegment('L', points[i].x, points[i].y));
	        }
	        break;
	    }
	    return this.fixPathForFill(path, points, serie, idx).serialize();
	  },
	  fixPathForFill: function fixPathForFill(path, points, serie, idx) {
	    // Nothing needs to be fixed for empty points list.
	    if (points.length === 0) return path;

	    // If no fill boundaries, exit.
	    // (This will make fill behave weirdly.)
	    if (serie.hideFillBoundaries) return path;

	    // If the series isn't non-decreasing (it is an arbitrary function), we
	    // assume that the author knows what they are doing and that they can
	    // handle proper fill on their own.
	    var stats = this.stats.bySerie[serie.name || idx];
	    if (!stats.nonDecreasingX) return path;

	    // The first path command is assumed to be M. To fully support a fill,
	    // we need to replace that initial M with an L (because we are adding a
	    // new part of the path onto the front of the path).
	    var s = path.getSegment(0);
	    path.replaceSegment(0, core_mjs.g.Path.createSegment('L', s.end.x, s.end.y));
	    var leftFillPadding = serie.fillPadding && serie.fillPadding.left || 0;
	    var rightFillPadding = serie.fillPadding && serie.fillPadding.right || 0;
	    var bottomFillPadding = serie.fillPadding && serie.fillPadding.bottom || 10;
	    var size = this.model.get('size');
	    var firstPoint = points[0];
	    var lastPoint = points[points.length - 1];

	    // Start a subpath at the x-value of the last point of the series but
	    // hide it below the visible chart area (the clipped region). Then
	    // continue that path to the x-value of the first point. This enables
	    // setting the `fill` attr on the path.
	    path.insertSegment(0, core_mjs.g.Path.createSegment('M', lastPoint.x + rightFillPadding, size.height + bottomFillPadding));
	    path.insertSegment(1, core_mjs.g.Path.createSegment('L', firstPoint.x - leftFillPadding, size.height + bottomFillPadding));
	    path.insertSegment(2, core_mjs.g.Path.createSegment('L', firstPoint.x - leftFillPadding, firstPoint.y));

	    // If desired, the path can be rounded off with another side helper line
	    // to complement the side helper line at the beginning.
	    if (serie.showRightFillBoundary) {
	      path.appendSegment(core_mjs.g.Path.createSegment('L', lastPoint.x + rightFillPadding, lastPoint.y));
	      path.appendSegment(core_mjs.g.Path.createSegment('Z'));
	    }
	    return path;
	  },
	  updateAxis: function updateAxis() {
	    var axis = this.model.get('axis');
	    var size = this.model.get('size');
	    var height = size.height;
	    var width = size.width;

	    // Axis lines.
	    core_mjs.V(this.elXAxisPath).attr('d', ['M', 0, height, 'L', width, height].join(' '));
	    core_mjs.V(this.elYAxisPath).attr('d', ['M', 0, 0, 'L', 0, height].join(' '));

	    // Clean up old ticks.
	    this.elXAxisTicks.textContent = '';
	    this.elYAxisTicks.textContent = '';
	    if (this.isEmpty()) return;
	    var xDomain = [this.stats.minX, this.stats.maxX];
	    var yDomain = [this.stats.minY, this.stats.maxY];
	    var xRange = [this.canvas.x, this.canvas.x + this.canvas.width];
	    var yRange = [0, this.canvas.height];
	    var yAxis = axis && axis['y-axis'] || {};
	    var xAxis = axis && axis['x-axis'] || {};
	    getTicksX.call(this, xAxis, size, xDomain, xRange);
	    getTicksY.call(this, yAxis, size, yDomain, yRange);
	    function getTicksX(axis, size, domain, range) {
	      var addTickX = function addTickX(elTick, tickTranslate, size) {
	        elTick.translate(tickTranslate, size.height);
	        core_mjs.V(this.elXAxisTicks).append(elTick);
	      };
	      var tickTranslationX = function tickTranslationX(domain, range, x) {
	        return core_mjs.g.scale.linear(domain, range, x);
	      };
	      var tickLabelValueX = function tickLabelValueX(x) {
	        return x;
	      };

	      // If `ticks` are not specified explicitly, show ticks for every
	      // single x-value (perhaps skipping some according to the `tickStep`
	      // option).
	      if (!axis.ticks) {
	        var values = this.stats.xValues;
	        getAllTicks.call(this, axis, size, domain, range, tickTranslationX, addTickX, tickLabelValueX, values);
	        return;
	      }

	      // Else: show interval ticks.

	      // The canvas could be larger or smaller than the actual width of
	      // the chart view (e.g. when the chart is zoomed). However, we still
	      // want to render the axis along the width of the chart view (and we
	      // want it not to overflow right or left). The `canvasWidthRatio`
	      // helps us adjust the range to which we map the values from the
	      // axis domain.
	      var canvasWidthRatio = this.canvas.width / (size.width - 2 * this.canvas.x);
	      getTicks.call(this, axis, size, domain, range, tickTranslationX, addTickX, tickLabelValueX, canvasWidthRatio);
	    }
	    function getTicksY(axis, size, domain, range) {
	      var addTickY = function addTickY(elTick, tickTranslate) {
	        elTick.translate(0, tickTranslate);
	        core_mjs.V(this.elYAxisTicks).append(elTick);
	      };
	      var tickTranslationY = function tickTranslationY(domain, range, y) {
	        // Edge case: y-axis domain min and max are the same.
	        // Translate the tick to the bottom of the canvas area within
	        // padding.
	        if (domain[0] === domain[1]) return this.canvas.y + this.canvas.height;

	        // Else: use standard ticks.
	        return core_mjs.g.scale.linear(domain, range, y);
	      };
	      var tickLabelValueY = function tickLabelValueY(y, domain, range) {
	        // Invert the `y` value according to the domain since we are
	        // moving from top to bottom but the axis ticks are labeled from
	        // bottom to top.
	        var tickValue = domain[1] - (y - domain[0]);

	        // The `tickValue` is shifted by the `canvas.y` offset but first
	        // we must scale this offset back to the domain of the axis.
	        tickValue += core_mjs.g.scale.linear(range, domain, this.canvas.y) - domain[0];
	        return tickValue;
	      };

	      // Only interval ticks are supported for y-axis.

	      // The `canvasHeightRatio` helps us adjust the range to which we map
	      // the values from the axis domain.
	      var canvasHeightRatio = this.canvas.height / size.height;
	      getTicks.call(this, axis, size, domain, range, tickTranslationY, addTickY, tickLabelValueY, canvasHeightRatio);
	    }

	    // Show ticks for all values.
	    function getAllTicks(axis, size, domain, range, tickTranslationFn, addTickFn, tickLabelValueFn, values) {
	      values.forEach(function (tickValue, index) {
	        // Show only every `tickStep` value. Default is to show all
	        // x-values.
	        if (index % (axis.tickStep || 1) !== 0) return;
	        createTick.call(this, axis, size, domain, range, tickTranslationFn, addTickFn, tickLabelValueFn, tickValue);
	      }, this);
	    }

	    // Show interval ticks.
	    function getTicks(axis, size, domain, range, tickTranslationFn, addTickFn, tickLabelValueFn, canvasRatio) {
	      var domainInterval = domain[1] - domain[0];
	      var numTicks = axis.ticks || 11;
	      // Edge case: domain min and max are the same.
	      // Show one tick.
	      if (domainInterval === 0) numTicks = 1;

	      // A tick step. We must scale the tick step down by the
	      // `canvasRatio`. The tick step becomes smaller if the canvas is
	      // larger than the chart view and vice versa.
	      var tickStep = domainInterval / numTicks / canvasRatio;

	      // Render ticks. Start at the beginning of the domain and step by
	      // `tickStep` exactly `ticks` number of times.
	      var tickValue = domain[0];
	      for (var i = 0; i < numTicks; i++) {
	        createTick.call(this, axis, size, domain, range, tickTranslationFn, addTickFn, tickLabelValueFn, tickValue);
	        tickValue += tickStep;
	      }
	    }
	    function createTick(axis, size, domain, range, tickTranslationFn, addTickFn, tickLabelValueFn, tickValue) {
	      // Clone the default tick.
	      var elTick = this.elTick.clone();
	      var tickTranslation = tickTranslationFn.call(this, domain, range, tickValue);
	      // Do not show ticks outside of the chart area.
	      if (tickTranslation > size.width) return;
	      // Else: add tick.
	      addTickFn.call(this, elTick, tickTranslation, size);

	      // Add tick label.
	      var tickLabelValue = tickLabelValueFn.call(this, tickValue, domain, range);
	      elTick.findOne('text').text(this.tickLabel(tickLabelValue, axis));
	    }
	  },
	  tickLabel: function tickLabel(value, opt) {
	    if (core_mjs.util.isFunction(opt.tickFormat)) {
	      return opt.tickFormat(value);
	    }
	    var formatSpecifier = opt.tickFormat || '.1f';
	    var label = core_mjs.util.format.number(formatSpecifier, value);
	    return label + (core_mjs.util.isFunction(opt.tickSuffix) ? opt.tickSuffix(value) : opt.tickSuffix || '');
	  },
	  pointLabel: function pointLabel(p, opt) {
	    if (core_mjs.util.isFunction(opt.pointFormat)) {
	      return opt.pointFormat(p);
	    }
	    var formatSpecifier = opt.pointFormat || '.1f';
	    var label = core_mjs.util.format.number(formatSpecifier, p.y);
	    return label + (opt.pointSuffix || '');
	  },
	  updateMarkings: function updateMarkings() {
	    // Clean up old markings.
	    this.elMarkings.textContent = '';
	    var markings = this.model.get('markings');
	    // No need to continue if there are no markings.
	    if (!markings || markings.length === 0) return;
	    var size = this.model.get('size');
	    var width = size.width;
	    var height = size.height;
	    var xDomain = [this.stats.minX, this.stats.maxX];
	    var yDomain = [this.stats.minY, this.stats.maxY];
	    var xRange = [this.canvas.x, this.canvas.x + this.canvas.width];
	    var yRange = [this.canvas.y, this.canvas.y + this.canvas.height];
	    function firstDefined(a, b) {
	      return a === undefined ? b : a;
	    }
	    core_mjs.util.toArray(markings).forEach(function (marking, i) {
	      // Start and end of the marking. The following adjustments makes it
	      // easier to define the marking. It does not really matter if the `end`
	      // is before `start`. Also, if the only thing defined is `start.y`, the marking
	      // will be a single line starting at that `y` position crossing the whole chart.
	      var start = marking.start || marking.end;
	      var end = marking.end || marking.start;
	      var startX = Math.min(firstDefined(start.x, this.stats.minX), firstDefined(end.x, this.stats.minX));
	      var endX = Math.max(firstDefined(start.x, this.stats.maxX), firstDefined(end.x, this.stats.maxX));
	      var startY = Math.min(firstDefined(start.y, this.stats.minY), firstDefined(end.y, this.stats.minY));
	      var endY = Math.max(firstDefined(start.y, this.stats.maxY), firstDefined(end.y, this.stats.maxY));

	      // Scale `start` and `end` to use for translating the marking rectangle.

	      // If the marking is a trendline, i.e. one of the coordinates is missing,
	      // (in other words the marking is not an area), we want such line to
	      // cover the whole view regardless of the canvas area. The reasoning behind
	      // this is that, for example, if we have a bar chart and some of the bars
	      // are rendered after the canvas area and we can compensate for this by
	      // setting a padding on the canvas area, we still want the trendlines
	      // to be rendered for those bars.
	      var isTrendLineX = start.x === undefined || end.x === undefined;
	      var isTrendLineY = start.y === undefined || end.y === undefined;
	      if (isTrendLineX) xRange = [0, width];
	      if (isTrendLineY) yRange = [0, height];
	      var startTx = core_mjs.g.scale.linear(xDomain, xRange, startX);
	      var endTx = core_mjs.g.scale.linear(xDomain, xRange, endX);
	      var startTy = core_mjs.g.scale.linear(yDomain, yRange, startY);
	      var endTy = core_mjs.g.scale.linear(yDomain, yRange, endY);

	      // Marking position and dimensions.
	      var mx = startTx;
	      var my = yRange[1] - endTy + yRange[0];
	      var mw = endTx - startTx;
	      var mh = endTy - startTy;

	      // Edge case: y-axis domain min and max are the same and the marking
	      // is a line
	      if (yDomain[0] === yDomain[1] && startY === endY) {
	        // If this marking does not lie on the same y-value, ignore it.
	        if (yDomain[0] !== startY) return;

	        // Else: place the marking at the bottom of the canvas area
	        // within padding.
	        my = this.canvas.y + this.canvas.height;
	        mh = 1;
	      }

	      // Limit the marking to the bounding box of the canvas.
	      //if (mx + mw > this.canvas.width + this.canvas.x) mw = this.canvas.width + this.canvas.x - mx;
	      //if (my + mh > this.canvas.height + this.canvas.y) mh = this.canvas.height + this.canvas.y - my;

	      // Make sure we give the marking a positive width and height, otherwise it's not visible at all.
	      mw = Math.max(mw, 1);
	      mh = Math.max(mh, 1);

	      // Render the marking.
	      var elMarking = this.elMarking.clone();
	      elMarking.findOne('rect').attr({
	        x: mx,
	        y: my,
	        width: mw,
	        height: mh
	      });
	      elMarking.findOne('text').text(marking.label || '').attr({
	        x: mx + mw,
	        y: my
	      });
	      var className = elMarking.attr('class') + ' ' + (marking.name || 'marking-' + i);
	      elMarking.attr(core_mjs.util.assign({
	        'class': className
	      }, marking.attrs));
	      core_mjs.V(this.elMarkings).append(elMarking);
	    }, this);
	  },
	  updateLegend: function updateLegend() {
	    var series = this.model.get('series');
	    this.elLegendItems.textContent = '';
	    core_mjs.util.toArray(series).forEach(function (serie, i) {
	      // Give the outside world the ability to decide whether a legend item should be shown or not.
	      if (core_mjs.util.isFunction(serie.showLegend) && !serie.showLegend(serie, this.stats.bySerie[serie.name || i])) {
	        return;
	      } else if (serie.showLegend === false) {
	        return;
	      }
	      var elLegendItem = this.elLegendItem.clone();
	      if (this._disabledSeries.includes(serie.name)) {
	        elLegendItem.addClass('disabled');
	      }
	      elLegendItem.attr('data-serie', serie.name);
	      elLegendItem.findOne('circle').attr({
	        fill: this.getSerieColor(serie.name)
	      });
	      elLegendItem.findOne('text').text(serie.label || serie.name);
	      elLegendItem.translate(0, i * (serie.legendLabelLineHeight || 16));
	      core_mjs.V(this.elLegendItems).append(elLegendItem);
	    }, this);
	  },
	  getSerieColor: function getSerieColor(serieName) {
	    var attrs = this.model.get('attrs');
	    var serieAttrs = Object.keys(attrs).find(function (selector) {
	      return selector.includes(serieName);
	    });
	    return serieAttrs ? attrs[serieAttrs].stroke || attrs[serieAttrs].fill : 'black';
	  },
	  hideSerie: function hideSerie(serieName) {
	    if (!this._disabledSeries.includes(serieName)) {
	      this._disabledSeries.push(serieName);
	    }
	    var series = this.filterSeries();
	    this.update(series);
	  },
	  showSerie: function showSerie(serieName) {
	    this._disabledSeries = core_mjs.util.without(this._disabledSeries, serieName);
	    var series = this.filterSeries();
	    this.update(series);
	  },
	  filterSeries: function filterSeries(series) {
	    series = series || this.model.get('series');
	    series = core_mjs.util.toArray(series).filter(function (serie) {
	      return !this._disabledSeries.includes(serie.name);
	    }, this);
	    return series;
	  },
	  // Interaction.
	  // ------------

	  onPointerDown: function onPointerDown(evt, x, y) {
	    var elLegendItem = $(evt.target).closest('.legend-item')[0];
	    if (elLegendItem) {
	      core_mjs.V(elLegendItem).toggleClass('disabled');
	      if (core_mjs.V(elLegendItem).hasClass('disabled')) {
	        this.hideSerie(core_mjs.V(elLegendItem).attr('data-serie'));
	      } else {
	        this.showSerie(core_mjs.V(elLegendItem).attr('data-serie'));
	      }
	    }
	  },
	  onMouseMove: function onMouseMove(evt) {
	    this.showGuidelines(evt.clientX, evt.clientY, evt);
	  },
	  onMouseOut: function onMouseOut(evt) {
	    this.hideGuidelines();
	    this.trigger('mouseout', evt);
	  },
	  showGuidelines: function showGuidelines(clientX, clientY, evt) {
	    var angle = this.model.get('angle');
	    var bbox = this.model.getBBox();
	    var localPoint = new core_mjs.g.Point(core_mjs.V(this.paper.layers).toLocalPoint(clientX, clientY)).rotate(bbox.center(), angle);
	    if (core_mjs.g.rect(bbox).containsPoint(localPoint)) {
	      var size = this.model.get('size');
	      var x = localPoint.x - bbox.x;
	      var y = localPoint.y - bbox.y;
	      core_mjs.V(this.elXGuideline).attr({
	        x1: x,
	        y1: 0,
	        x2: x,
	        y2: size.height,
	        visibility: 'visible'
	      });
	      core_mjs.V(this.elYGuideline).attr({
	        x1: 0,
	        y1: y,
	        x2: size.width,
	        y2: y,
	        visibility: 'visible'
	      });
	      var dataX = core_mjs.g.scale.linear([this.canvas.x, this.canvas.x + this.canvas.width], [this.stats.minX, this.stats.maxX], x);
	      var dataY = core_mjs.g.scale.linear([this.canvas.y, this.canvas.y + this.canvas.height], [this.stats.minY, this.stats.maxY], y);
	      var dataPoint = {
	        x: dataX,
	        y: this.stats.minY + this.stats.maxY - dataY
	      };
	      var clientPoint = {
	        x: clientX,
	        y: clientY
	      };
	      var closestPoints = this.closestPoints(dataX);
	      this.trigger('mouseover', dataPoint, clientPoint, closestPoints, evt);
	    }
	  },
	  // Return the closest points for a given `x` value. The returned array contains objects
	  // with `x` and `y` values and a `serie` object this `x` value appeared in.
	  closestPoints: function closestPoints(x) {
	    var xValuesIndex = core_mjs.util.sortedIndex(this.stats.xValues, x);
	    var xValue = this.stats.xValues[xValuesIndex];
	    var xValueBefore = this.stats.xValues[xValuesIndex - 1];
	    var xClosest = xValueBefore === undefined ? xValue : Math.abs(x - xValue) < Math.abs(x - xValueBefore) ? xValue : xValueBefore;
	    return this.stats.xMap[xClosest];
	  },
	  hideGuidelines: function hideGuidelines() {
	    core_mjs.V(this.elXGuideline).attr('visibility', 'hidden');
	    core_mjs.V(this.elYGuideline).attr('visibility', 'hidden');
	  }
	});
	var Pie = basic_mjs.Generic.extend({
	  markup: ['<g class="rotatable">', '<g class="scalable"></g>', '<g class="background"><rect/><text/></g>', '<g class="data"></g>', '<g class="foreground">', '<rect/><text class="caption"/><text class="subcaption"/>', '<g class="legend"><g class="legend-items"></g></g>', '</g>', '</g>'].join(''),
	  sliceMarkup: '<g class="slice"/>',
	  sliceFillMarkup: '<path class="slice-fill"/>',
	  sliceBorderMarkup: '<path class="slice-border"/>',
	  sliceInnerLabelMarkup: '<text class="slice-inner-label"/>',
	  legendSerieMarkup: '<g class="legend-serie"><text/></g>',
	  legendSliceMarkup: '<g class="legend-slice"><circle/><text/></g>',
	  defaults: core_mjs.util.deepSupplement({
	    type: 'chart.Pie',
	    size: {
	      width: 200,
	      height: 200
	    },
	    // work only on first (or alone) serie
	    pieHole: 0,
	    // serieDefaults.startAngle: pie is draw clockwise from est (right)
	    serieDefaults: {
	      startAngle: 0,
	      degree: 360,
	      label: null,
	      showLegend: true,
	      labelLineHeight: 6
	    },
	    // onClickEffect/onHoverEffect: effect on click/mouseOver (see this.effectOnSlice for a list and option, ex. onHoverEffect: {type: 'enlarge', scale: 1.05})
	    sliceDefaults: {
	      innerLabel: '{percentage:.0f}%',
	      innerLabelMargin: 6,
	      legendLabel: '{label}: {value}',
	      legendLabelLineHeight: 6,
	      legendLabelMargin: 14,
	      offset: 0,
	      onClickEffect: {
	        type: 'offset',
	        offset: 20
	      },
	      onHoverEffect: null
	    },
	    series: [],
	    attrs: {
	      '.background > rect': {
	        opacity: 0
	      },
	      '.background > text': {
	        fill: 'black',
	        text: 'No data available.',
	        ref: '.background > rect',
	        'ref-x': .5,
	        'ref-y': .5,
	        'text-anchor': 'middle',
	        'y-alignment': 'middle',
	        display: 'none'
	      },
	      '.foreground > rect': {
	        fill: 'white',
	        stroke: '#e5e5e5',
	        opacity: 0,
	        'pointer-events': 'none'
	      },
	      '.foreground .caption': {
	        fill: 'black',
	        text: '',
	        ref: '.foreground > rect',
	        'ref-x': 2,
	        'ref-y': 6,
	        'text-anchor': 'start',
	        'y-alignment': 'middle',
	        'font-size': 14
	      },
	      '.foreground .subcaption': {
	        fill: 'black',
	        text: '',
	        ref: '.foreground > rect',
	        'ref-x': 2,
	        'ref-y': 18,
	        'text-anchor': 'start',
	        'y-alignment': 'middle',
	        'font-size': 10
	      },
	      '.data': {
	        ref: '.background',
	        'ref-x': .5,
	        'ref-y': .5
	      },
	      '.slice': {
	        cursor: 'pointer'
	      },
	      '.slice > .slice-fill': {
	        stroke: '#ffffff',
	        'stroke-width': 1,
	        'fill-opacity': 1
	      },
	      '.slice.hover > .slice-fill': {
	        'fill-opacity': .8
	      },
	      '.slice > .slice-border': {
	        'stroke-width': 6,
	        'stroke-opacity': .4,
	        'fill-opacity': 1,
	        fill: 'none',
	        display: 'none'
	      },
	      '.slice.hover > .slice-border': {
	        display: 'block'
	      },
	      '.slice > .slice-inner-label': {
	        'text-anchor': 'middle',
	        'font-size': '12',
	        stroke: 'none',
	        'stroke-width': '0',
	        fill: '#ffffff'
	      },
	      '.slice > .slice-inner-label > tspan': {
	        dy: '-.5em'
	      },
	      '.legend': {
	        'ref-dx': 20,
	        'ref-y': 5
	      },
	      '.legend-serie text': {
	        fill: 'grey',
	        transform: 'translate(2, 0)',
	        'font-size': 13
	      },
	      '.legend-slice': {
	        cursor: 'pointer'
	      },
	      '.legend-slice text': {
	        'font-weight': 'normal',
	        fill: 'black',
	        'font-size': 11
	      },
	      '.legend-slice.hover text': {
	        'font-weight': 'bold'
	      },
	      '.legend-slice circle': {
	        r: 5,
	        transform: 'translate(5,5)'
	      }
	    }
	  }, basic_mjs.Generic.prototype.defaults),
	  addSlice: function addSlice(slice, serieIndex, opt) {
	    opt = opt || {};
	    serieIndex = serieIndex || 0;
	    var series = this.get('series');

	    // If serie is undefinied (first slice added to serie)
	    if (series[serieIndex] === undefined) series[serieIndex] = {
	      data: []
	    };

	    // Clone the serie so that the normal Backbone mechanism for `set()` and `prev()` works as expected.
	    var serie = core_mjs.util.cloneDeep(series[serieIndex]);
	    serie.data.push(slice);

	    // Again, slice the array so that we don't alter the `series` array currently set.
	    series = series.slice();
	    series[serieIndex] = serie;

	    // If it's a new serie (first slice added)
	    opt = serie.data.length > 1 ? core_mjs.util.assign(opt, {
	      changedSerieIndex: serieIndex
	    }) : opt;

	    // Set in opt the serieIndex that change for update only serieIndex on view (could it be better?)
	    this.set('series', series, opt);
	  },
	  editSlice: function editSlice(slice, sliceIndex, serieIndex, opt) {
	    opt = opt || {};
	    serieIndex = serieIndex || 0;
	    var series = this.get('series');
	    if (series[serieIndex] === undefined || series[serieIndex].data[sliceIndex] === undefined) {
	      throw new Error('Slice ' + sliceIndex + ' on serie ' + serieIndex + ' was not found.');
	    }

	    // Clone the serie so that the normal Backbone mechanism for `set()` and `prev()` works as expected.
	    var serie = core_mjs.util.cloneDeep(series[serieIndex]);
	    serie.data[sliceIndex] = core_mjs.util.assign(serie.data[sliceIndex], slice);

	    // Again, slice the array so that we don't alter the `series` array currently set.
	    series = series.slice();
	    series[serieIndex] = serie;
	    this.set('series', series, core_mjs.util.assign(opt, {
	      changedSerieIndex: serieIndex
	    }));
	  }
	});
	var PieView = core_mjs.dia.ElementView.extend({
	  events: {
	    'mouseover .slice': 'onMouseOverSlice',
	    'mouseout .slice': 'onMouseOverSlice',
	    'mousemove .slice': 'onMouseMoveSlice',
	    'mouseover .legend-slice': 'onEventLegendItem',
	    'mouseout .legend-slice': 'onEventLegendItem'
	  },
	  presentationAttributes: core_mjs.dia.ElementView.addPresentationAttributes({
	    series: ['UPDATE'],
	    serieDefaults: ['UPDATE'],
	    sliceDefaults: ['UPDATE'],
	    pieHole: ['UPDATE']
	  }),
	  initialize: function initialize() {
	    core_mjs.dia.ElementView.prototype.initialize.apply(this, arguments);
	    this.on('cell:pointerclick', this.onClickSlice, this);
	    this.on('cell:pointerclick', this.onEventLegendItem, this);
	  },
	  renderMarkup: function renderMarkup() {
	    core_mjs.dia.ElementView.prototype.renderMarkup.apply(this, arguments);

	    // Cache important elements for faster access.
	    this.elBackgroundRect = this.$('.background rect')[0];
	    this.elBackgroundText = this.$('.background text')[0];
	    this.elForegroundRect = this.$('.foreground rect')[0];
	    this.elLegendItems = this.$('.legend-items')[0];
	    this.elPie = this.$('.data')[0];

	    // An SVG element for repeatable elements. This will be used as an original for future clones.
	    this.elSlice = core_mjs.V(this.model.sliceMarkup);
	    this.elSliceFill = core_mjs.V(this.model.sliceFillMarkup);
	    this.elSliceBorder = core_mjs.V(this.model.sliceBorderMarkup);
	    this.elSliceInnerLabel = core_mjs.V(this.model.sliceInnerLabelMarkup);
	    this.elLegendSerie = core_mjs.V(this.model.legendSerieMarkup);
	    this.elLegendSlice = core_mjs.V(this.model.legendSliceMarkup);
	  },
	  update: function update(_, _attrs, opt) {
	    opt = opt || {};
	    var serieIndex = opt.changedSerieIndex;
	    var series = this.calculateSeries(serieIndex);
	    if (serieIndex in series) {
	      // Remove only the serieIndex for which is request update
	      $(this.elPie).find('.serie-' + serieIndex).remove();
	    } else {
	      // Remove all the previously rendered series.
	      $(this.elPie).empty();
	    }
	    var size = this.model.get('size');
	    core_mjs.V(this.elBackgroundRect).attr(size);
	    core_mjs.V(this.elForegroundRect).attr(size);
	    if (!series.length) {
	      // No data available.
	      // Show the "No data available" label that is hidden by default.
	      $(this.elBackgroundText).show();
	    } else {
	      $(this.elBackgroundText).hide();
	    }
	    core_mjs.util.toArray(series).forEach(function (serie, index) {
	      // Use serieIndex for update only the requested serie
	      if (serieIndex !== undefined && serieIndex !== index) return;
	      core_mjs.util.forIn(serie.data, this.updateSlice.bind(this));
	    }, this);
	    this.updateLegend();

	    // Apply attrs.
	    core_mjs.dia.ElementView.prototype.update.apply(this, arguments);
	  },
	  calculateSeries: function calculateSeries(serieIndex) {
	    var series = core_mjs.util.cloneDeep(this.model.get('series'));
	    var serieDefaults = this.model.get('serieDefaults');
	    var sliceDefaults = this.model.get('sliceDefaults');

	    // Pie outer radius less margin
	    var size = this.model.get('size');
	    var radius = Math.min(size.width, size.height) / 2;
	    var pieHole = this.model.get('pieHole');
	    pieHole = pieHole > 1 ? pieHole : radius * pieHole;
	    var outerRadius = radius;
	    var radiusStep = (radius - pieHole) / series.length;
	    this._series = series.map(function (serie, index) {
	      // Use serieIndex for update only the selected serie
	      if (serieIndex !== undefined && serieIndex !== index) return serie;
	      serie = core_mjs.util.defaults(serie, serieDefaults);
	      var startAngle = serie.startAngle;

	      // Calculate percentage of each slice
	      var total = serie.data.reduce(function (sum, slice) {
	        return sum + slice.value;
	      }, 0);
	      var circleDividedByTotal = serie.degree / total || 0;
	      var percentageDividedByTotal = 100 / total;
	      serie.data = serie.data.map(function (slice, sliceIndex) {
	        // Init default params for all slice (less some attributes valid only for outer slice)
	        slice = core_mjs.util.defaults(slice, core_mjs.util.omit(sliceDefaults, 'offset', 'onClickEffect', 'onHoverEffect'));
	        slice.outerRadius = outerRadius;
	        slice.innerRadius = outerRadius - radiusStep;

	        // For outer slice
	        if (!index) {
	          // Init default params for outer slice
	          slice = core_mjs.util.defaults(slice, core_mjs.util.pick(sliceDefaults, 'offset', 'onClickEffect', 'onHoverEffect'));
	          slice.isOuter = true;
	          slice.offset = slice.offset > 1 ? slice.offset : slice.offset * slice.outerRadius;
	          slice.onClickEffect.offset = slice.onClickEffect.offset > 1 ? slice.onClickEffect.offset : slice.onClickEffect.offset * slice.outerRadius;
	        }
	        slice.serieIndex = index;
	        slice.sliceIndex = sliceIndex;
	        slice.innerLabelMargin = slice.innerLabelMargin < -1 || slice.innerLabelMargin > 1 ? slice.innerLabelMargin : slice.innerLabelMargin * slice.outerRadius;
	        slice.percentage = slice.value * percentageDividedByTotal;
	        var angle = slice.value * circleDividedByTotal;
	        slice.degree = {
	          angle: angle,
	          start: startAngle,
	          end: angle + startAngle
	        };
	        slice.rad = {
	          angle: core_mjs.g.toRad(slice.degree.angle, true),
	          start: core_mjs.g.toRad(slice.degree.start, true),
	          end: core_mjs.g.toRad(slice.degree.end, true)
	        };
	        slice.middleangle = (slice.rad.start + slice.rad.end) / 2;
	        startAngle = slice.degree.end;
	        return slice;
	      });
	      outerRadius -= radiusStep;
	      return serie;
	    });
	    return this._series;
	  },
	  updateLegend: function updateLegend() {
	    var series = this._series;
	    this.elLegendItems.textContent = '';
	    var xPadding = 0;
	    var fontSizeLegendSerieText = parseInt(this.model.attr('.legend-serie text/font-size'), 10);
	    var fontSizeLegendSliceText = parseInt(this.model.attr('.legend-slice text/font-size'), 10);
	    core_mjs.util.toArray(series).forEach(function (serie, serieIndex) {
	      if (!serie.showLegend) return;

	      // Append Serie label
	      if (serie.label) {
	        var elLegendSerie = this.elLegendSerie.clone();
	        if (serie.name) elLegendSerie.addClass(serie.name);
	        elLegendSerie.attr({
	          'data-serie': serieIndex
	        });
	        elLegendSerie.findOne('text').text(serie.label);
	        elLegendSerie.translate(0, xPadding);
	        core_mjs.V(this.elLegendItems).append(elLegendSerie);

	        // 1.5 is the proportional space between the legend items (one and half height of item)
	        xPadding += fontSizeLegendSerieText + serie.labelLineHeight;
	      }

	      // Append Slices
	      core_mjs.util.forIn(serie.data, function (slice, sliceIndex) {
	        var elLegendSlice = this.elLegendSlice.clone();
	        var slicefillColor = this.getSliceFillColor(sliceIndex, serieIndex);
	        if (slice.name) elLegendSlice.addClass(slice.name);
	        elLegendSlice.attr({
	          'data-serie': serieIndex,
	          'data-slice': sliceIndex
	        });
	        elLegendSlice.findOne('text').text(core_mjs.util.format.string(slice.legendLabel, slice));
	        elLegendSlice.findOne('text').translate(slice.legendLabelMargin);
	        elLegendSlice.translate(0, xPadding);

	        // 1.5 is the proportional space between the legend items (one and half height of item)
	        xPadding += fontSizeLegendSliceText + slice.legendLabelLineHeight;

	        // is a gradient
	        if (core_mjs.util.isObject(slicefillColor)) {
	          this.applyGradient(elLegendSlice.findOne('circle'), 'fill', slicefillColor);
	        } else {
	          elLegendSlice.findOne('circle').attr({
	            fill: slicefillColor
	          });
	        }
	        core_mjs.V(this.elLegendItems).append(elLegendSlice);
	      }.bind(this));
	    }, this);
	  },
	  // `selector` is a CSS selector or `'.'`. `attr` is either a `'fill'` or `'stroke'`.
	  // `gradient` must be in the special JointJS gradient format:
	  // `{ type: <linearGradient|radialGradient>, stops: [ { offset: <offset>, color: <color> }, ... ]`.
	  // An example is: `{ fill: { type: 'linearGradient', stops: [ { offset: '10%', color: 'green' }, { offset: '50%', color: 'blue' } ] } }`.
	  applyGradient: function applyGradient(selector, attr, gradient) {
	    var $selected = core_mjs.util.isString(selector) ? this.findBySelector(selector) : $(selector).toArray();
	    var gradientId = this.paper.defineGradient(gradient);
	    $selected.forEach(function (node) {
	      core_mjs.V(node).attr(attr, 'url(#' + gradientId + ')');
	    });
	  },
	  updateSlice: function updateSlice(slice) {
	    var elSlice = this.elSlice.clone();

	    // Append slice (at start for use .bbox() later)
	    core_mjs.V(this.elPie).append(elSlice);

	    // RENDER SLICE
	    var elSliceFill = this.elSliceFill.clone();
	    var slicefillColor = this.getSliceFillColor(slice.sliceIndex, slice.serieIndex);
	    elSliceFill.attr({
	      fill: slicefillColor,
	      d: core_mjs.V.createSlicePathData(slice.innerRadius, slice.outerRadius, slice.rad.start, slice.rad.end)
	    });
	    elSlice.append(elSliceFill);

	    // is a gradient
	    if (core_mjs.util.isObject(slicefillColor)) {
	      this.applyGradient('#' + elSliceFill.attr('id'), 'fill', slicefillColor);
	    }

	    // RENDER BORDER
	    var elSliceBorder = this.elSliceBorder.clone();

	    // ...with polar coordinate
	    var borderStrokeWidth = parseInt(this.model.attr('.slice > .slice-border/stroke-width'), 10);
	    var startPoint = core_mjs.g.point.fromPolar(slice.outerRadius + borderStrokeWidth / 2, -slice.rad.start, core_mjs.g.point(0, 0));
	    var endPoint = core_mjs.g.point.fromPolar(slice.outerRadius + borderStrokeWidth / 2, -slice.rad.end, core_mjs.g.point(0, 0));
	    elSliceBorder.attr({
	      stroke: slicefillColor,
	      d: this.drawArc(startPoint, endPoint, slice.outerRadius + borderStrokeWidth / 2, slice.rad.start, slice.rad.end)
	    });
	    elSlice.append(elSliceBorder);

	    // is a gradient
	    if (core_mjs.util.isObject(slicefillColor)) {
	      this.applyGradient('#' + elSliceBorder.attr('id'), 'stroke', slicefillColor);
	    }

	    // RENDER INNER LABEL
	    var elSliceInnerLabel = this.elSliceInnerLabel.clone();

	    // Apply inner label text through template
	    elSliceInnerLabel.text(core_mjs.util.format.string(slice.innerLabel, slice));
	    elSlice.append(elSliceInnerLabel);

	    // After the append (inserted in DOM) can calculate bbox of element
	    var innerLabelBbox = elSliceInnerLabel.bbox();

	    // Translate label: the gap from the middle of the text (bbox) and the pie border is constant
	    var radiusLabel = slice.outerRadius - innerLabelBbox.width / 2 - slice.innerLabelMargin;
	    elSliceInnerLabel.translate(radiusLabel * Math.cos(-slice.middleangle), -radiusLabel * Math.sin(-slice.middleangle));

	    // Add element data attributes
	    elSlice.attr({
	      'data-serie': slice.serieIndex,
	      'data-slice': slice.sliceIndex,
	      'data-value': slice.value
	    });

	    // Add class for styling use
	    var nameSerie = this._series[slice.serieIndex].name;
	    if (nameSerie) elSlice.addClass(nameSerie);
	    if (slice.name) elSlice.addClass(slice.name);
	    elSlice.addClass('serie-' + slice.serieIndex + ' slice-' + slice.sliceIndex);

	    // Is an outer slice
	    if (slice.isOuter) {
	      elSlice.addClass('outer');

	      // Apply init offset for explode some slices
	      if (slice.offset) {
	        elSlice.addClass('clicked');
	        this.effectOnSlice(elSlice, slice, {
	          type: 'offset',
	          offset: slice.offset
	        });
	      }
	    }
	    return elSlice;
	  },
	  getSliceFillColor: function getSliceFillColor(sliceIndex, serieIndex) {
	    serieIndex = serieIndex || 0;
	    var attrs = this.model.get('attrs');

	    // Find if there is customized fill color for selected slice in attrs
	    var sliceFillAttr = Object.keys(attrs).find(function (selector) {
	      return selector.indexOf('.serie-' + serieIndex + '.slice-' + sliceIndex + ' > .slice-fill') > -1;
	    });
	    return sliceFillAttr ? attrs[sliceFillAttr].fill : this._series[serieIndex].data[sliceIndex].fill;
	  },
	  onMouseMoveSlice: function onMouseMoveSlice(event) {
	    var elSlice = core_mjs.V(event.currentTarget);
	    var serieIndex = elSlice.attr('data-serie');
	    var sliceIndex = elSlice.attr('data-slice');
	    var slice = this._series[serieIndex].data[sliceIndex];
	    this.trigger(event.type, slice, event);
	  },
	  mouseOverSlice: function mouseOverSlice(sliceIndex, serieIndex) {
	    serieIndex = serieIndex || 0;
	    var elSlice = core_mjs.V(this.$('.slice[data-serie="' + serieIndex + '"][data-slice="' + sliceIndex + '"]')[0]);
	    var slice = this._series[serieIndex].data[sliceIndex];
	    elSlice.toggleClass('hover');

	    // Do effect if it is an outer slice and requested
	    if (slice.isOuter && !core_mjs.util.isEmpty(slice.onHoverEffect)) {
	      this.effectOnSlice(elSlice, slice, slice.onHoverEffect, elSlice.hasClass('hover') ? false : true);
	    }

	    // Add class 'hover' also to legend
	    var elLegendSlice = core_mjs.V(this.$('.legend-slice[data-serie="' + serieIndex + '"][data-slice="' + sliceIndex + '"]')[0]);
	    if (elLegendSlice) elLegendSlice.toggleClass('hover');

	    // Apply only attr style with selector '.slice' or '.legend-slice'
	    var attrsForSliceAndLegend = Object.keys(this.model.get('attrs')).filter(function (selector) {
	      return selector.indexOf('.slice') > -1 || selector.indexOf('.legend-slice') > -1;
	    });
	    core_mjs.dia.ElementView.prototype.update.call(this, this.model, core_mjs.util.pick(this.model.get('attrs'), attrsForSliceAndLegend));
	  },
	  onMouseOverSlice: function onMouseOverSlice(event) {
	    var elSlice = core_mjs.V(event.currentTarget);
	    var serieIndex = elSlice.attr('data-serie');
	    var sliceIndex = elSlice.attr('data-slice');
	    this.mouseOverSlice(sliceIndex, serieIndex);
	    var slice = this._series[serieIndex].data[sliceIndex];
	    this.trigger(event.type, slice, event);
	  },
	  clickSlice: function clickSlice(sliceIndex, serieIndex) {
	    serieIndex = serieIndex || 0;
	    var elSlice = core_mjs.V(this.$('.slice[data-serie="' + serieIndex + '"][data-slice="' + sliceIndex + '"]')[0]);
	    var slice = this._series[serieIndex].data[sliceIndex];
	    if (!slice.isOuter) return;
	    if (!elSlice.hasClass('clicked')) {
	      elSlice.addClass('clicked');

	      // Update the model series => resize and clone preserve offset
	      this.model.get('series')[serieIndex].data[sliceIndex].offset = slice.onClickEffect.offset;
	      this.effectOnSlice(elSlice, slice, slice.onClickEffect);
	    } else {
	      elSlice.removeClass('clicked');

	      // Update the model series => resize and clone preserve offset
	      this.model.get('series')[serieIndex].data[sliceIndex].offset = 0;
	      this.effectOnSlice(elSlice, slice, slice.onClickEffect, true);
	    }
	  },
	  onClickSlice: function onClickSlice(event) {
	    // Only for outer (external slice)
	    var elSlice = core_mjs.V($(event.target).closest('.slice.outer')[0]);
	    if (elSlice) {
	      var serieIndex = elSlice.attr('data-serie');
	      var sliceIndex = elSlice.attr('data-slice');
	      this.clickSlice(sliceIndex, serieIndex);
	      var slice = this._series[serieIndex].data[sliceIndex];
	      this.trigger(event.type, slice, event);
	    }
	  },
	  onEventLegendItem: function onEventLegendItem(event) {
	    var elLegendItem = core_mjs.V($(event.target).closest('.legend-slice')[0]);
	    if (elLegendItem) {
	      var serieIndex = elLegendItem.attr('data-serie');
	      var sliceIndex = elLegendItem.attr('data-slice');
	      switch (event.type) {
	        case 'click':
	          this.clickSlice(sliceIndex, serieIndex);
	          break;
	        case 'mouseover':
	        case 'mouseout':
	          this.mouseOverSlice(sliceIndex, serieIndex);
	          break;
	      }
	    }
	  },
	  effectOnSlice: function effectOnSlice(elSlice, slice, effect, remove) {
	    remove = remove || false;
	    switch (effect.type) {
	      case 'enlarge':
	        if (!remove) elSlice.scale(effect.scale || 1.05);else elSlice.scale(1);
	        break;
	      case 'offset':
	        if (!remove) elSlice.translate(effect.offset * Math.cos(-slice.middleangle), -effect.offset * Math.sin(-slice.middleangle));else elSlice.translate(0, 0, {
	          absolute: true
	        });
	        break;
	    }
	  },
	  svgArcMax: 2 * Math.PI - 1e-6,
	  drawArc: function drawArc(startPoint, endPoint, radius, startAngle, endAngle) {
	    var largeArcFlag = 0;
	    var sweepFlag = 1;
	    var angle = endAngle - startAngle;
	    if (angle > Math.PI) {
	      largeArcFlag = 1;
	      if (angle >= this.svgArcMax) {
	        largeArcFlag = 0;
	        sweepFlag = 0;
	      }
	    }
	    return 'M' + startPoint.x + ',' + startPoint.y + ' A' + radius + ',' + radius + ' 0 ' + largeArcFlag + ',' + sweepFlag + ' ' + endPoint.x + ',' + endPoint.y;
	  }
	});

	// Knob chart.
	// -----------

	// Supports the following properties:
	// `min` and `max` for defining the domain of the `value`.
	// `value` is the final value of the knob.
	// `fill` for the fill color of the knob.
	// Moreover, all of these properties can be arrays in which case the knob
	// displayes more values stacked one on another.
	var Knob = Pie.extend({
	  defaults: core_mjs.util.deepSupplement({
	    type: 'chart.Knob',
	    sliceDefaults: {
	      legendLabel: '{value:.0f}',
	      outer: {
	        offsetOnClick: 0
	      }
	    },
	    pieHole: .7,
	    value: 0,
	    attrs: {
	      '.legend': {
	        'ref-x': .5,
	        'ref-y': .5,
	        'ref-dx': null,
	        'x-alignment': -.5,
	        'y-alignment': -.5
	      },
	      '.legend-slice text': {
	        'font-size': 30
	      },
	      '.legend-slice circle': {
	        display: 'none'
	      },
	      '.slice-inner-label': {
	        display: 'none'
	      },
	      '.slice-fill': {
	        stroke: 'none'
	      }
	    }
	  }, Pie.prototype.defaults),
	  initialize: function initialize() {
	    this.set('series', this.getKnobSeries(), {
	      silent: true
	    });
	    Pie.prototype.initialize.apply(this, arguments);
	    this.on('change:value change:min change:max change:fill', this.updateKnob, this);
	  },
	  getKnobSeries: function getKnobSeries() {
	    // Create one serie with one slice holding the knob value and color.
	    var values = Array.isArray(this.get('value')) ? this.get('value') : [this.get('value')];
	    var fills = Array.isArray(this.get('fill')) ? this.get('fill') : [this.get('fill')];
	    var mins = Array.isArray(this.get('min')) ? this.get('min') : [this.get('min')];
	    var maxs = Array.isArray(this.get('max')) ? this.get('max') : [this.get('max')];
	    var series = values.map(function (value, i) {
	      var min = mins[i] === undefined ? mins[0] : mins[i];
	      var max = maxs[i] === undefined ? maxs[0] : maxs[i];
	      var fill = fills[i] === undefined ? fills[0] : fills[i];
	      return {
	        degree: core_mjs.g.scale.linear([min, max], [0, 360], value),
	        data: [{
	          value: value,
	          fill: fill
	        }],
	        showLegend: i > 0 ? false : true // Show legend only for the first serie.
	      };
	    });

	    return series;
	  },
	  updateKnob: function updateKnob() {
	    this.set('series', this.getKnobSeries());
	  }
	});
	var KnobView = PieView;

	// Matrix diagram.
	var Matrix = basic_mjs.Generic.extend({
	  markup: ['<g class="rotatable">', '<g class="scalable">', '<g class="background"><rect/></g>', '<g class="cells"/>', '<g class="foreground"/>', '</g>', '<g class="labels">', '<g class="rows"/>', '<g class="columns"/>', '</g>', '</g>'].join(''),
	  cellMarkup: '<rect class="cell"/>',
	  labelMarkup: '<text class="label"/>',
	  gridLineMarkup: '<path class="grid-line"/>',
	  defaults: core_mjs.util.deepSupplement({
	    type: 'chart.Matrix',
	    attrs: {
	      '.background rect': {
	        fill: '#eeeeee'
	      },
	      '.grid-line': {
	        stroke: 'white',
	        'stroke-width': 2
	      },
	      '.label': {
	        fill: 'black',
	        'alignment-baseline': 'middle'
	      },
	      '.labels .rows .label': {
	        'text-anchor': 'end'
	      },
	      '.labels .columns .label': {
	        'text-anchor': 'start'
	      }
	    }
	  }, basic_mjs.Generic.prototype.defaults)
	});
	var MatrixView = core_mjs.dia.ElementView.extend({
	  presentationAttributes: core_mjs.dia.ElementView.addPresentationAttributes({
	    size: ['LABELS'],
	    cells: ['MARKUP', 'LABELS']
	  }),
	  initFlag: ['LABELS'].concat(core_mjs.dia.ElementView.prototype.initFlag),
	  confirmUpdate: function confirmUpdate() {
	    var flag = core_mjs.dia.ElementView.prototype.confirmUpdate.apply(this, arguments);
	    if (this.hasFlag(flag, 'MARKUP')) {
	      this.renderMarkup();
	      flag = this.removeFlag(flag, 'MARKUP');
	    }
	    if (this.hasFlag(flag, 'LABELS')) {
	      this.renderLabels();
	      flag = this.removeFlag(flag, 'LABELS');
	    }
	    return flag;
	  },
	  renderMarkup: function renderMarkup() {
	    core_mjs.dia.ElementView.prototype.renderMarkup.apply(this, arguments);
	    this.elCells = this.$('.cells')[0];
	    this.elRowLabels = this.$('.labels .rows')[0];
	    this.elColumnLabels = this.$('.labels .columns')[0];
	    this.elForeground = this.$('.foreground')[0];
	    this.elCell = core_mjs.V(this.model.cellMarkup);
	    this.elGridLine = core_mjs.V(this.model.gridLineMarkup);
	    var cells = this.model.get('cells') || [];
	    var size = this.model.get('size');
	    this.elBackgroundRect = this.$('.background rect')[0];
	    core_mjs.V(this.elBackgroundRect).attr(size);
	    var cellHeight = size.height / cells.length;
	    var cellWidth = size.width / cells.length;
	    var elCellsFragment = document.createDocumentFragment();
	    this.elCells.textContent = '';
	    this.elForeground.textContent = '';
	    var elGridLinesFragment = document.createDocumentFragment();

	    // Cells.
	    // ------

	    var row, j, elGridLine, cell, elCell;
	    for (var i = 0; i < cells.length; i++) {
	      elGridLine = this.elGridLine.clone();
	      elGridLine.addClass('horizontal');
	      elGridLine.attr('d', 'M 0 ' + i * cellHeight + ' ' + size.width + ' ' + i * cellHeight);
	      elGridLinesFragment.appendChild(elGridLine.node);
	      row = cells[i];
	      for (j = 0; j < row.length; j++) {
	        if (i === 0) {
	          elGridLine = this.elGridLine.clone();
	          elGridLine.addClass('vertical');
	          elGridLine.attr('d', 'M ' + j * cellWidth + ' 0 ' + j * cellWidth + ' ' + size.height);
	          elGridLinesFragment.appendChild(elGridLine.node);
	        }
	        cell = row[j];
	        if (cell) {
	          elCell = this.elCell.clone();
	          elCell.attr(core_mjs.util.assign({
	            x: j * cellWidth,
	            y: i * cellHeight,
	            width: cellWidth,
	            height: cellHeight
	          }, cell));
	          elCellsFragment.appendChild(elCell.node);
	        }
	      }
	    }
	    this.elForeground.appendChild(elGridLinesFragment);
	    this.elCells.appendChild(elCellsFragment);
	  },
	  renderLabels: function renderLabels() {
	    // Labels are outside the scalables groups. Therefore,
	    // we must make sure their position stays correct after resize.

	    this.elLabel = core_mjs.V(this.model.labelMarkup);
	    var cells = this.model.get('cells') || [];
	    var labels = this.model.get('labels') || {};
	    var rowLabels = labels.rows || [];
	    var columnLabels = labels.columns || [];
	    var size = this.model.get('size');
	    var cellHeight = size.height / cells.length;
	    var cellWidth = size.width / cells.length;
	    var label, elLabel;
	    this.elRowLabels.textContent = '';
	    this.elColumnLabels.textContent = '';
	    var elRowLabelsFragment = document.createDocumentFragment();
	    for (var i = 0; i < rowLabels.length; i++) {
	      label = labels.rows[i];
	      elLabel = this.elLabel.clone();
	      elLabel.text(label.text);
	      elLabel.attr(core_mjs.util.assign({
	        x: -(labels.padding || 5),
	        y: i * cellHeight + cellHeight / 2,
	        'text-anchor': 'end',
	        'dominant-baseline': 'central',
	        'font-size': cellHeight,
	        'data-row': i
	      }, core_mjs.util.omit(label, 'text')));
	      elRowLabelsFragment.appendChild(elLabel.node);
	    }
	    this.elRowLabels.appendChild(elRowLabelsFragment);
	    var x, y;
	    var elColumnLabelsFragment = document.createDocumentFragment();
	    for (var j = 0; j < columnLabels.length; j++) {
	      label = labels.columns[j];
	      elLabel = this.elLabel.clone();
	      x = j * cellWidth + cellWidth / 2;
	      y = -(labels.padding || 5);
	      elLabel.attr('x', x);
	      elLabel.text(label.text);
	      elLabel.attr(core_mjs.util.assign({
	        y: y,
	        'text-anchor': 'start',
	        'dominant-baseline': 'central',
	        'font-size': cellWidth,
	        'data-column': j
	      }, core_mjs.util.omit(label, 'text')));
	      elLabel.rotate(-90, x, y);
	      elColumnLabelsFragment.appendChild(elLabel.node);
	    }
	    this.elColumnLabels.appendChild(elColumnLabelsFragment);
	  }
	});

	exports.Knob = Knob;
	exports.KnobView = KnobView;
	exports.Matrix = Matrix;
	exports.MatrixView = MatrixView;
	exports.Pie = Pie;
	exports.PieView = PieView;
	exports.Plot = Plot;
	exports.PlotView = PlotView;

}(this.joint.shapes = this.joint.shapes || {}, $, joint.shapes.basic, joint));
