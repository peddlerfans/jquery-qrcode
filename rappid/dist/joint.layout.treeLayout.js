/*! JointJS+ v3.6.3 - HTML5 Diagramming Framework

Copyright (c) 2022 client IO

 2022-12-09 


This Source Code Form is subject to the terms of the JointJS+ License
, v. 2.0. If a copy of the JointJS+ License was not distributed with this
file, You can obtain one at http://jointjs.com/license/rappid_v2.txt
 or from the JointJS+ archive as was distributed by client IO. See the LICENSE file.*/


this.joint = this.joint || {};
(function (exports, Backbone, core_mjs) {
	'use strict';

	Backbone = Backbone && Object.prototype.hasOwnProperty.call(Backbone, 'default') ? Backbone['default'] : Backbone;

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

	var arrayMethodIsStrict = function (METHOD_NAME, argument) {
	  var method = [][METHOD_NAME];
	  return !!method && fails(function () {
	    // eslint-disable-next-line no-useless-call -- required for testing
	    method.call(null, argument || function () { return 1; }, 1);
	  });
	};

	var $forEach = arrayIteration.forEach;


	var STRICT_METHOD = arrayMethodIsStrict('forEach');

	// `Array.prototype.forEach` method implementation
	// https://tc39.es/ecma262/#sec-array.prototype.foreach
	var arrayForEach = !STRICT_METHOD ? function forEach(callbackfn /* , thisArg */) {
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

	var createProperty = function (object, key, value) {
	  var propertyKey = toPropertyKey(key);
	  if (propertyKey in object) objectDefineProperty.f(object, propertyKey, createPropertyDescriptor(0, value));
	  else object[propertyKey] = value;
	};

	var SPECIES$1 = wellKnownSymbol('species');

	var arrayMethodHasSpeciesSupport = function (METHOD_NAME) {
	  // We can't use this feature detection in V8 since it causes
	  // deoptimization and serious performance degradation
	  // https://github.com/zloirock/core-js/issues/677
	  return engineV8Version >= 51 || !fails(function () {
	    var array = [];
	    var constructor = array.constructor = {};
	    constructor[SPECIES$1] = function () {
	      return { foo: 1 };
	    };
	    return array[METHOD_NAME](Boolean).foo !== 1;
	  });
	};

	var arraySlice = functionUncurryThis([].slice);

	var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('slice');

	var SPECIES$2 = wellKnownSymbol('species');
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
	        Constructor = Constructor[SPECIES$2];
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

	var $find = arrayIteration.find;


	var FIND = 'find';
	var SKIPS_HOLES = true;

	// Shouldn't skip holes
	if (FIND in []) Array(1)[FIND](function () { SKIPS_HOLES = false; });

	// `Array.prototype.find` method
	// https://tc39.es/ecma262/#sec-array.prototype.find
	_export({ target: 'Array', proto: true, forced: SKIPS_HOLES }, {
	  find: function find(callbackfn /* , that = undefined */) {
	    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
	addToUnscopables(FIND);

	var $TypeError$6 = TypeError;

	// `Array.prototype.{ reduce, reduceRight }` methods implementation
	var createMethod$2 = function (IS_RIGHT) {
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
	        throw $TypeError$6('Reduce of empty array with no initial value');
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
	  left: createMethod$2(false),
	  // `Array.prototype.reduceRight` method
	  // https://tc39.es/ecma262/#sec-array.prototype.reduceright
	  right: createMethod$2(true)
	};

	var engineIsNode = classofRaw(global_1.process) == 'process';

	var $reduce = arrayReduce.left;




	var STRICT_METHOD$1 = arrayMethodIsStrict('reduce');
	// Chrome 80-82 has a critical bug
	// https://bugs.chromium.org/p/chromium/issues/detail?id=1049982
	var CHROME_BUG = !engineIsNode && engineV8Version > 79 && engineV8Version < 83;

	// `Array.prototype.reduce` method
	// https://tc39.es/ecma262/#sec-array.prototype.reduce
	_export({ target: 'Array', proto: true, forced: !STRICT_METHOD$1 || CHROME_BUG }, {
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

	var $some = arrayIteration.some;


	var STRICT_METHOD$2 = arrayMethodIsStrict('some');

	// `Array.prototype.some` method
	// https://tc39.es/ecma262/#sec-array.prototype.some
	_export({ target: 'Array', proto: true, forced: !STRICT_METHOD$2 }, {
	  some: function some(callbackfn /* , thisArg */) {
	    return $some(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var nativeJoin = functionUncurryThis([].join);

	var ES3_STRINGS = indexedObject != Object;
	var STRICT_METHOD$3 = arrayMethodIsStrict('join', ',');

	// `Array.prototype.join` method
	// https://tc39.es/ecma262/#sec-array.prototype.join
	_export({ target: 'Array', proto: true, forced: ES3_STRINGS || !STRICT_METHOD$3 }, {
	  join: function join(separator) {
	    return nativeJoin(toIndexedObject(this), separator === undefined ? ',' : separator);
	  }
	});

	var $TypeError$7 = TypeError;

	var deletePropertyOrThrow = function (O, P) {
	  if (!delete O[P]) throw $TypeError$7('Cannot delete property ' + tryToString(P) + ' of ' + tryToString(O));
	};

	var $String$2 = String;

	var toString_1 = function (argument) {
	  if (classof(argument) === 'Symbol') throw TypeError('Cannot convert a Symbol value to a string');
	  return $String$2(argument);
	};

	var $Array$2 = Array;
	var max$2 = Math.max;

	var arraySliceSimple = function (O, start, end) {
	  var length = lengthOfArrayLike(O);
	  var k = toAbsoluteIndex(start, length);
	  var fin = toAbsoluteIndex(end === undefined ? length : end, length);
	  var result = $Array$2(max$2(fin - k, 0));
	  for (var n = 0; k < fin; k++, n++) createProperty(result, n, O[k]);
	  result.length = n;
	  return result;
	};

	var floor$1 = Math.floor;

	var mergeSort = function (array, comparefn) {
	  var length = array.length;
	  var middle = floor$1(length / 2);
	  return length < 8 ? insertionSort(array, comparefn) : merge(
	    array,
	    mergeSort(arraySliceSimple(array, 0, middle), comparefn),
	    mergeSort(arraySliceSimple(array, middle), comparefn),
	    comparefn
	  );
	};

	var insertionSort = function (array, comparefn) {
	  var length = array.length;
	  var i = 1;
	  var element, j;

	  while (i < length) {
	    j = i;
	    element = array[i];
	    while (j && comparefn(array[j - 1], element) > 0) {
	      array[j] = array[--j];
	    }
	    if (j !== i++) array[j] = element;
	  } return array;
	};

	var merge = function (array, left, right, comparefn) {
	  var llength = left.length;
	  var rlength = right.length;
	  var lindex = 0;
	  var rindex = 0;

	  while (lindex < llength || rindex < rlength) {
	    array[lindex + rindex] = (lindex < llength && rindex < rlength)
	      ? comparefn(left[lindex], right[rindex]) <= 0 ? left[lindex++] : right[rindex++]
	      : lindex < llength ? left[lindex++] : right[rindex++];
	  } return array;
	};

	var arraySort = mergeSort;

	var firefox = engineUserAgent.match(/firefox\/(\d+)/i);

	var engineFfVersion = !!firefox && +firefox[1];

	var engineIsIeOrEdge = /MSIE|Trident/.test(engineUserAgent);

	var webkit = engineUserAgent.match(/AppleWebKit\/(\d+)\./);

	var engineWebkitVersion = !!webkit && +webkit[1];

	var test$1 = [];
	var nativeSort = functionUncurryThis(test$1.sort);
	var push$2 = functionUncurryThis(test$1.push);

	// IE8-
	var FAILS_ON_UNDEFINED = fails(function () {
	  test$1.sort(undefined);
	});
	// V8 bug
	var FAILS_ON_NULL = fails(function () {
	  test$1.sort(null);
	});
	// Old WebKit
	var STRICT_METHOD$4 = arrayMethodIsStrict('sort');

	var STABLE_SORT = !fails(function () {
	  // feature detection can be too slow, so check engines versions
	  if (engineV8Version) return engineV8Version < 70;
	  if (engineFfVersion && engineFfVersion > 3) return;
	  if (engineIsIeOrEdge) return true;
	  if (engineWebkitVersion) return engineWebkitVersion < 603;

	  var result = '';
	  var code, chr, value, index;

	  // generate an array with more 512 elements (Chakra and old V8 fails only in this case)
	  for (code = 65; code < 76; code++) {
	    chr = String.fromCharCode(code);

	    switch (code) {
	      case 66: case 69: case 70: case 72: value = 3; break;
	      case 68: case 71: value = 4; break;
	      default: value = 2;
	    }

	    for (index = 0; index < 47; index++) {
	      test$1.push({ k: chr + index, v: value });
	    }
	  }

	  test$1.sort(function (a, b) { return b.v - a.v; });

	  for (index = 0; index < test$1.length; index++) {
	    chr = test$1[index].k.charAt(0);
	    if (result.charAt(result.length - 1) !== chr) result += chr;
	  }

	  return result !== 'DGBEFHACIJK';
	});

	var FORCED = FAILS_ON_UNDEFINED || !FAILS_ON_NULL || !STRICT_METHOD$4 || !STABLE_SORT;

	var getSortCompare = function (comparefn) {
	  return function (x, y) {
	    if (y === undefined) return -1;
	    if (x === undefined) return 1;
	    if (comparefn !== undefined) return +comparefn(x, y) || 0;
	    return toString_1(x) > toString_1(y) ? 1 : -1;
	  };
	};

	// `Array.prototype.sort` method
	// https://tc39.es/ecma262/#sec-array.prototype.sort
	_export({ target: 'Array', proto: true, forced: FORCED }, {
	  sort: function sort(comparefn) {
	    if (comparefn !== undefined) aCallable(comparefn);

	    var array = toObject(this);

	    if (STABLE_SORT) return comparefn === undefined ? nativeSort(array) : nativeSort(array, comparefn);

	    var items = [];
	    var arrayLength = lengthOfArrayLike(array);
	    var itemsLength, index;

	    for (index = 0; index < arrayLength; index++) {
	      if (index in array) push$2(items, array[index]);
	    }

	    arraySort(items, getSortCompare(comparefn));

	    itemsLength = lengthOfArrayLike(items);
	    index = 0;

	    while (index < itemsLength) array[index] = items[index++];
	    while (index < arrayLength) deletePropertyOrThrow(array, index++);

	    return array;
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

	var $TypeError$8 = TypeError;
	var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF; // 2 ** 53 - 1 == 9007199254740991

	var doesNotExceedSafeInteger = function (it) {
	  if (it > MAX_SAFE_INTEGER) throw $TypeError$8('Maximum allowed index exceeded');
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

	var $map = arrayIteration.map;


	var HAS_SPECIES_SUPPORT$1 = arrayMethodHasSpeciesSupport('map');

	// `Array.prototype.map` method
	// https://tc39.es/ecma262/#sec-array.prototype.map
	// with adding support of @@species
	_export({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$1 }, {
	  map: function map(callbackfn /* , thisArg */) {
	    return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var $filter = arrayIteration.filter;


	var HAS_SPECIES_SUPPORT$2 = arrayMethodHasSpeciesSupport('filter');

	// `Array.prototype.filter` method
	// https://tc39.es/ecma262/#sec-array.prototype.filter
	// with adding support of @@species
	_export({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$2 }, {
	  filter: function filter(callbackfn /* , thisArg */) {
	    return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var quot = /"/g;
	var replace = functionUncurryThis(''.replace);

	// `CreateHTML` abstract operation
	// https://tc39.es/ecma262/#sec-createhtml
	var createHtml = function (string, tag, attribute, value) {
	  var S = toString_1(requireObjectCoercible(string));
	  var p1 = '<' + tag;
	  if (attribute !== '') p1 += ' ' + attribute + '="' + replace(toString_1(value), quot, '&quot;') + '"';
	  return p1 + '>' + S + '</' + tag + '>';
	};

	// check the existence of a method, lowercase
	// of a tag and escaping quotes in arguments
	var stringHtmlForced = function (METHOD_NAME) {
	  return fails(function () {
	    var test = ''[METHOD_NAME]('"');
	    return test !== test.toLowerCase() || test.split('"').length > 3;
	  });
	};

	// `String.prototype.link` method
	// https://tc39.es/ecma262/#sec-string.prototype.link
	_export({ target: 'String', proto: true, forced: stringHtmlForced('link') }, {
	  link: function link(url) {
	    return createHtml(this, 'a', 'href', url);
	  }
	});

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
	var replace$1 = functionUncurryThis(''.replace);
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
	      flags = replace$1(flags, 'y', '');
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

	// TODO: Remove from `core-js@4` since it's moved to entry points








	var SPECIES$3 = wellKnownSymbol('species');
	var RegExpPrototype = RegExp.prototype;

	var fixRegexpWellKnownSymbolLogic = function (KEY, exec, FORCED, SHAM) {
	  var SYMBOL = wellKnownSymbol(KEY);

	  var DELEGATES_TO_SYMBOL = !fails(function () {
	    // String methods call symbol-named RegEp methods
	    var O = {};
	    O[SYMBOL] = function () { return 7; };
	    return ''[KEY](O) != 7;
	  });

	  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails(function () {
	    // Symbol-named RegExp methods call .exec
	    var execCalled = false;
	    var re = /a/;

	    if (KEY === 'split') {
	      // We can't use real regex here since it causes deoptimization
	      // and serious performance degradation in V8
	      // https://github.com/zloirock/core-js/issues/306
	      re = {};
	      // RegExp[@@split] doesn't call the regex's exec method, but first creates
	      // a new one. We need to return the patched regex when creating the new one.
	      re.constructor = {};
	      re.constructor[SPECIES$3] = function () { return re; };
	      re.flags = '';
	      re[SYMBOL] = /./[SYMBOL];
	    }

	    re.exec = function () { execCalled = true; return null; };

	    re[SYMBOL]('');
	    return !execCalled;
	  });

	  if (
	    !DELEGATES_TO_SYMBOL ||
	    !DELEGATES_TO_EXEC ||
	    FORCED
	  ) {
	    var uncurriedNativeRegExpMethod = functionUncurryThis(/./[SYMBOL]);
	    var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
	      var uncurriedNativeMethod = functionUncurryThis(nativeMethod);
	      var $exec = regexp.exec;
	      if ($exec === regexpExec || $exec === RegExpPrototype.exec) {
	        if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
	          // The native String method already delegates to @@method (this
	          // polyfilled function), leasing to infinite recursion.
	          // We avoid it by directly calling the native @@method method.
	          return { done: true, value: uncurriedNativeRegExpMethod(regexp, str, arg2) };
	        }
	        return { done: true, value: uncurriedNativeMethod(str, regexp, arg2) };
	      }
	      return { done: false };
	    });

	    defineBuiltIn(String.prototype, KEY, methods[0]);
	    defineBuiltIn(RegExpPrototype, SYMBOL, methods[1]);
	  }

	  if (SHAM) createNonEnumerableProperty(RegExpPrototype[SYMBOL], 'sham', true);
	};

	// `SameValue` abstract operation
	// https://tc39.es/ecma262/#sec-samevalue
	// eslint-disable-next-line es/no-object-is -- safe
	var sameValue = Object.is || function is(x, y) {
	  // eslint-disable-next-line no-self-compare -- NaN check
	  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
	};

	var $TypeError$9 = TypeError;

	// `RegExpExec` abstract operation
	// https://tc39.es/ecma262/#sec-regexpexec
	var regexpExecAbstract = function (R, S) {
	  var exec = R.exec;
	  if (isCallable(exec)) {
	    var result = functionCall(exec, R, S);
	    if (result !== null) anObject(result);
	    return result;
	  }
	  if (classofRaw(R) === 'RegExp') return functionCall(regexpExec, R, S);
	  throw $TypeError$9('RegExp#exec called on incompatible receiver');
	};

	// @@search logic
	fixRegexpWellKnownSymbolLogic('search', function (SEARCH, nativeSearch, maybeCallNative) {
	  return [
	    // `String.prototype.search` method
	    // https://tc39.es/ecma262/#sec-string.prototype.search
	    function search(regexp) {
	      var O = requireObjectCoercible(this);
	      var searcher = isNullOrUndefined(regexp) ? undefined : getMethod(regexp, SEARCH);
	      return searcher ? functionCall(searcher, regexp, O) : new RegExp(regexp)[SEARCH](toString_1(O));
	    },
	    // `RegExp.prototype[@@search]` method
	    // https://tc39.es/ecma262/#sec-regexp.prototype-@@search
	    function (string) {
	      var rx = anObject(this);
	      var S = toString_1(string);
	      var res = maybeCallNative(nativeSearch, rx, S);

	      if (res.done) return res.value;

	      var previousLastIndex = rx.lastIndex;
	      if (!sameValue(previousLastIndex, 0)) rx.lastIndex = 0;
	      var result = regexpExecAbstract(rx, S);
	      if (!sameValue(rx.lastIndex, previousLastIndex)) rx.lastIndex = previousLastIndex;
	      return result === null ? -1 : result.index;
	    }
	  ];
	});

	// Layout Siblings
	// ===============
	// a group of sibling layout areas

	function LayoutSiblings(layoutAreas, parentArea, opt) {
	  opt = core_mjs.util.defaults(opt || {}, {
	    siblingGap: 0
	  });
	  this.width = 0;
	  this.height = 0;
	  this.layoutAreas = this.sortLayoutAreas(layoutAreas);
	  this.parentArea = parentArea;
	  this.siblingGap = opt.siblingGap;
	  if (this.exists()) {
	    this.computeSize(opt);
	  }
	}
	core_mjs.util.assign(LayoutSiblings.prototype, {
	  sortLayoutAreas: function sortLayoutAreas(layoutAreas) {
	    var areas = core_mjs.util.sortBy(layoutAreas, 'siblingRank');

	    // re-number the sibling ranks
	    areas.forEach(function (area, index) {
	      area.siblingRank = index;
	    });
	    return areas;
	  },
	  move: function move(dx, dy) {
	    for (var i = 0, n = this.layoutAreas.length; i < n; i++) {
	      this.layoutAreas[i].dx += dx;
	      this.layoutAreas[i].dy += dy;
	    }
	  },
	  exists: function exists() {
	    return this.layoutAreas.length > 0;
	  },
	  sumGaps: function sumGaps(gap) {
	    var gapCount = Math.max(this.layoutAreas.length - 1, 0);
	    return gapCount * gap;
	  },
	  getSiblingRankByPoint: function getSiblingRankByPoint(point) {
	    if (!this.exists()) {
	      // minimal extreme
	      return -1;
	    }
	    var closestArea = this.findAreaByPoint(point);
	    if (!closestArea) {
	      // maximal extreme
	      return this.layoutAreas.length - 1;
	    }
	    return closestArea.siblingRank - 1;
	  },
	  getFirstChildConnectionPoints: function getFirstChildConnectionPoints() {
	    return [];
	  },
	  getConnectionPoints: function getConnectionPoints(point, opt) {
	    if (!this.exists()) {
	      return this.getFirstChildConnectionPoints(point);
	    }
	    var deltaCoordinates = {
	      dx: point.x - this.parentArea.rootCX,
	      dy: point.y - this.parentArea.rootCY
	    };
	    return this.layoutAreas[0].getRootVertices(deltaCoordinates, opt);
	  },
	  getParentConnectionPoint: function getParentConnectionPoint() {
	    var parentArea = this.parentArea;
	    var offset = this.proxyLayoutArea('getConnectionPoint', parentArea.rootSize);
	    var connectionPoint = core_mjs.g.point(parentArea.rootCX, parentArea.rootCY);
	    return connectionPoint.offset(offset.x, offset.y);
	  },
	  getChildConnectionPoint: function getChildConnectionPoint(point, rootSize) {
	    var offset = this.proxyLayoutArea('getConnectionPoint', rootSize);
	    return core_mjs.g.point(point).difference(offset);
	  },
	  proxyLayoutArea: function proxyLayoutArea(method) {
	    var args = Array.prototype.slice.call(arguments, 1);
	    return LayoutArea.fromDirection(this.direction).prototype[method].apply(this.parentArea, args);
	  }
	});
	LayoutSiblings.extend = Backbone.Model.extend;
	var VerticalLayoutSiblings = LayoutSiblings.extend({
	  // Y coordinate of the most top sibling
	  getTopDY: function getTopDY() {
	    return -this.height / 2;
	  },
	  findAreaByPoint: function findAreaByPoint(point) {
	    return this.layoutAreas.find(function (area) {
	      return area.rootCY > point.y;
	    });
	  },
	  computeSize: function computeSize(opt) {
	    // compute height of all the siblings
	    this.height = this.sumGaps(opt.siblingGap);
	    var layoutAreas = this.layoutAreas;
	    this.height += layoutAreas.reduce(function (res, area) {
	      return res + area.height + area.prevSiblingGap + area.nextSiblingGap;
	    }, 0);
	    layoutAreas.reduce(function (y, area) {
	      // check if the current siblings width changed
	      this.width = Math.max(this.width, area.getExtendedWidth());
	      // set the shift of the area
	      area.dy += y + area.getCY();
	      // return the y-coordinate of the next sibling
	      return y + area.prevSiblingGap + area.height + area.nextSiblingGap + opt.siblingGap;
	    }.bind(this), this.getTopDY());
	  },
	  getYTowardsParent: function getYTowardsParent() {
	    return this.parentArea.rootCY;
	  },
	  getXTowardsParent: function getXTowardsParent() {
	    var parentArea = this.parentArea;
	    return parentArea.rootCX + this.LRSign * (parentArea.rootSize.width / 2 + parentArea.gap);
	  },
	  getNeighborPointFromRank: function getNeighborPointFromRank(rank) {
	    var y;
	    var siblingGap = this.siblingGap;
	    if (!this.exists()) {
	      y = this.getYTowardsParent();
	    } else {
	      var prevArea = this.layoutAreas[rank];
	      var nextArea = this.layoutAreas[rank + 1];
	      if (!prevArea) {
	        y = nextArea.y - siblingGap / 2;
	      } else if (!nextArea) {
	        y = prevArea.y + prevArea.height + siblingGap / 2;
	      } else {
	        y = (prevArea.y + prevArea.height + nextArea.y) / 2;
	      }
	    }
	    return {
	      x: this.getXTowardsParent(),
	      y: y
	    };
	  }
	});
	var LeftLayoutSiblings = VerticalLayoutSiblings.extend({
	  direction: 'L',
	  LRSign: -1
	});
	var RightLayoutSiblings = VerticalLayoutSiblings.extend({
	  direction: 'R',
	  LRSign: 1
	});

	// Vertical Tree Layout Siblings

	var treeLayoutSiblings = {
	  getXTowardsParent: function getXTowardsParent() {
	    var parentArea = this.parentArea;
	    return parentArea.rootCX + this.LRSign * parentArea.gap;
	  },
	  getYTowardsParent: function getYTowardsParent() {
	    var parentArea = this.parentArea;
	    var dy = parentArea.getLRHeight(parentArea.siblings) / 2;
	    dy += Math.min(parentArea.firstChildGap, this.siblingGap / 2);
	    return parentArea.rootCY + this.TBSign * dy;
	  },
	  getFirstChildConnectionPoints: function getFirstChildConnectionPoints(point) {
	    return [core_mjs.g.point(this.parentArea.rootCX, point.y)];
	  },
	  getChildConnectionPoint: function getChildConnectionPoint(point, rootSize) {
	    return core_mjs.g.point(point).offset(-this.LRSign * rootSize.width / 2, 0);
	  },
	  getParentConnectionPoint: function getParentConnectionPoint() {
	    var parentArea = this.parentArea;
	    var connectionPoint = core_mjs.g.point(parentArea.rootCX, parentArea.rootCY);
	    return connectionPoint.offset(0, this.TBSign * (parentArea.rootSize.height - parentArea.rootMargin) / 2);
	  }
	};
	var bottomTreeLayoutSiblings = {
	  getTopDY: function getTopDY() {
	    return 0;
	  }
	};
	var topTreeLayoutSiblings = {
	  getTopDY: function getTopDY() {
	    return -this.height;
	  }
	};
	var BottomRightLayoutSiblings = VerticalLayoutSiblings.extend({
	  direction: 'BR',
	  LRSign: 1,
	  TBSign: 1
	});
	core_mjs.util.assign(BottomRightLayoutSiblings.prototype, treeLayoutSiblings, bottomTreeLayoutSiblings);
	var BottomLeftLayoutSiblings = VerticalLayoutSiblings.extend({
	  direction: 'BL',
	  LRSign: -1,
	  TBSign: 1
	});
	core_mjs.util.assign(BottomLeftLayoutSiblings.prototype, treeLayoutSiblings, bottomTreeLayoutSiblings);
	var TopRightLayoutSiblings = VerticalLayoutSiblings.extend({
	  direction: 'TR',
	  LRSign: 1,
	  TBSign: -1
	});
	core_mjs.util.assign(TopRightLayoutSiblings.prototype, treeLayoutSiblings, topTreeLayoutSiblings);
	var TopLeftLayoutSiblings = VerticalLayoutSiblings.extend({
	  direction: 'TL',
	  LRSign: -1,
	  TBSign: -1
	});
	core_mjs.util.assign(TopLeftLayoutSiblings.prototype, treeLayoutSiblings, topTreeLayoutSiblings);

	// Horizontal Layout Siblings

	var HorizontalLayoutSiblings = LayoutSiblings.extend({
	  // X coordinate of the most left sibling
	  getLeftDX: function getLeftDX() {
	    return -this.width / 2;
	  },
	  findAreaByPoint: function findAreaByPoint(point) {
	    return this.layoutAreas.find(function (area) {
	      return area.rootCX > point.x;
	    });
	  },
	  computeSize: function computeSize(opt) {
	    this.width = this.sumGaps(opt.siblingGap);
	    var layoutAreas = this.layoutAreas;
	    this.width += layoutAreas.reduce(function (res, area) {
	      return res + area.width + area.prevSiblingGap + area.nextSiblingGap;
	    }, 0);
	    layoutAreas.reduce(function (x, area) {
	      // check if the current siblings height changed
	      this.height = Math.max(this.height, area.getExtendedHeight());
	      // set the shift of the area
	      area.dx += x + area.getCX();
	      // return the x-coordinate of the next sibling
	      return x + area.prevSiblingGap + area.width + area.nextSiblingGap + opt.siblingGap;
	    }.bind(this), this.getLeftDX());
	  },
	  getNeighborPointFromRank: function getNeighborPointFromRank(rank) {
	    var x;
	    if (!this.exists()) {
	      x = this.parentArea.rootCX;
	    } else {
	      var prevArea = this.layoutAreas[rank];
	      var nextArea = this.layoutAreas[rank + 1];
	      if (!prevArea) {
	        x = nextArea.x - this.siblingGap / 2;
	      } else if (!nextArea) {
	        x = prevArea.x + prevArea.width + this.siblingGap / 2;
	      } else {
	        x = (prevArea.x + prevArea.width + nextArea.x) / 2;
	      }
	    }
	    return {
	      x: x,
	      y: this.getYTowardsParent()
	    };
	  }
	});
	var TopLayoutSiblings = HorizontalLayoutSiblings.extend({
	  direction: 'T',
	  getYTowardsParent: function getYTowardsParent() {
	    var parentArea = this.parentArea;
	    return parentArea.rootCY - parentArea.getLRHeight() / 2 - parentArea.gap;
	  }
	});
	var BottomLayoutSiblings = HorizontalLayoutSiblings.extend({
	  direction: 'B',
	  getYTowardsParent: function getYTowardsParent() {
	    var parentArea = this.parentArea;
	    return parentArea.rootCY + parentArea.getLRHeight() / 2 + parentArea.gap;
	  }
	});

	// Layout Area
	// ===========

	function LayoutArea(root, opt) {
	  this.root = root;
	  var options = core_mjs.util.assign({}, opt, this.getRootAttributes(root, opt.attributeNames));
	  var globalGap = opt.gap || 0;
	  core_mjs.util.defaults(options, {
	    parentGap: globalGap,
	    siblingGap: globalGap,
	    firstChildGap: globalGap
	  });
	  this.siblingRank = options.siblingRank;
	  this.rootOffset = options.rootOffset;
	  this.rootMargin = options.rootMargin;
	  // Gaps
	  this.siblingGap = options.siblingGap;
	  this.gap = this.parentGap = options.parentGap;
	  this.nextSiblingGap = options.nextSiblingGap;
	  this.prevSiblingGap = options.prevSiblingGap;
	  this.firstChildGap = options.firstChildGap;
	  // metrics
	  this.dx = 0;
	  this.dy = 0;
	  this.width = 0;
	  this.height = 0;
	}
	core_mjs.util.assign(LayoutArea, {
	  create: function create(direction, root, opt) {
	    var constructor = LayoutArea.fromDirection(direction, opt);
	    return new constructor(root, opt);
	  },
	  fromDirection: function fromDirection(direction, opt) {
	    var constructor;
	    switch (direction) {
	      case 'L':
	        constructor = LeftLayoutArea;
	        break;
	      case 'T':
	        constructor = TopLayoutArea;
	        break;
	      case 'R':
	        constructor = RightLayoutArea;
	        break;
	      case 'B':
	        constructor = BottomLayoutArea;
	        break;
	      case 'BR':
	        constructor = BottomRightLayoutArea;
	        break;
	      case 'BL':
	        constructor = BottomLeftLayoutArea;
	        break;
	      case 'TR':
	        constructor = TopRightLayoutArea;
	        break;
	      case 'TL':
	        constructor = TopLeftLayoutArea;
	        break;
	      default:
	        constructor = LayoutArea;
	    }
	    return constructor;
	  }
	});
	core_mjs.util.assign(LayoutArea.prototype, {
	  direction: null,
	  compute: function compute(childLayoutAreas) {
	    this.childAreas = childLayoutAreas;
	    this.computeRelativePosition(this.root, childLayoutAreas);
	  },
	  // Returns height of the layout area
	  getHeight: function getHeight(siblings, rootSize) {
	    return this.getTHeight(siblings) + this.getBHeight(siblings) + this.getLRHeight();
	  },
	  // Returns width of the layout area
	  getWidth: function getWidth(siblings, rootSize) {
	    var tbWidth = Math.max(siblings.T.width, siblings.B.width) / 2;
	    var lWidth = Math.max(this.getLWidth(siblings, rootSize) + rootSize.width / 2, tbWidth);
	    var rWidth = Math.max(this.getRWidth(siblings, rootSize) + rootSize.width / 2, tbWidth);
	    return lWidth + rWidth;
	  },
	  // Returns height of layout area taken only L,R siblings into account
	  getLRHeight: function getLRHeight() {
	    return Math.max(this.rootSize.height, this.siblings.L.height, this.siblings.R.height);
	  },
	  // Returns height of the all top siblings (T,TR,TL)
	  getTHeight: function getTHeight(siblings) {
	    return siblings.T.height + this.getTXHeight(siblings);
	  },
	  // Returns height of the all bottom siblings (B,BR,BL)
	  getBHeight: function getBHeight(siblings) {
	    return siblings.B.height + this.getBXHeight(siblings);
	  },
	  // Returns width of layout area without T,B siblings
	  getXLRWidth: function getXLRWidth(siblings, rootSize) {
	    return this.getLWidth(siblings, rootSize) + rootSize.width + this.getRWidth(siblings, rootSize);
	  },
	  // Returns width of both right tree siblings (TR,BR)
	  getXRWidth: function getXRWidth(siblings, rootSize) {
	    var xrWidth = Math.max(siblings.BR.width, siblings.TR.width);
	    if (xrWidth > 0) {
	      xrWidth -= rootSize.width / 2;
	    }
	    return xrWidth;
	  },
	  // Returns height of both top tree siblings (TR,TL)
	  getTXHeight: function getTXHeight(siblings) {
	    var txHeight = Math.max(siblings.TR.height, siblings.TL.height);
	    if (txHeight > 0) {
	      txHeight += this.firstChildGap;
	    }
	    return txHeight;
	  },
	  // Returns height of both bottom tree siblings (BR,BL)
	  getBXHeight: function getBXHeight(siblings) {
	    var bxHeight = Math.max(siblings.BR.height, siblings.BL.height);
	    if (bxHeight > 0) {
	      bxHeight += this.firstChildGap;
	    }
	    return bxHeight;
	  },
	  // Returns width of both right tree siblings (BL,TL)
	  getXLWidth: function getXLWidth(siblings, rootSize) {
	    var xlWidth = Math.max(siblings.BL.width, siblings.TL.width);
	    if (xlWidth > 0) {
	      xlWidth -= rootSize.width / 2;
	    }
	    return xlWidth;
	  },
	  // Returns width of all the right siblings (R, TR, BR)
	  getRWidth: function getRWidth(siblings, rootSize) {
	    return Math.max(siblings.R.width, this.getXRWidth(siblings, rootSize));
	  },
	  // Returns width of all the left siblings (L, TL, BL)
	  getLWidth: function getLWidth(siblings, rootSize) {
	    return Math.max(siblings.L.width, this.getXLWidth(siblings, rootSize));
	  },
	  // Returns T,B siblings width that overlaps root element.
	  getTBOverlap: function getTBOverlap(siblings, rootSize) {
	    var tbOverlap = Math.max(siblings.T.width, siblings.B.width);
	    if (tbOverlap > 0) {
	      tbOverlap -= rootSize.width;
	      tbOverlap /= 2;
	    }
	    return tbOverlap;
	  },
	  getRootDX: function getRootDX(siblings, rootSize) {
	    var tbOverlap = this.getTBOverlap(siblings, rootSize);
	    var dx = Math.max(this.getLWidth(siblings, rootSize), tbOverlap);
	    dx -= Math.max(this.getRWidth(siblings, rootSize), tbOverlap);
	    return dx / 2;
	  },
	  // Returns the minimum amongst various gaps.
	  getMinimalGap: function getMinimalGap(siblings) {
	    return Math.min(siblings.siblingGap, this.firstChildGap, this.parentGap);
	  },
	  getBBox: function getBBox(opt) {
	    var bbox = core_mjs.g.rect(this);
	    var pad = opt && opt.expandBy;
	    if (pad) {
	      bbox.moveAndExpand({
	        x: -pad,
	        y: -pad,
	        width: pad * 2,
	        height: pad * 2
	      });
	    }
	    return bbox;
	  },
	  containsPoint: function containsPoint(point, opt) {
	    return this.getBBox(opt).containsPoint(point);
	  },
	  getLayoutSiblings: function getLayoutSiblings(direction) {
	    return this.siblings[direction];
	  },
	  getExtendedWidth: function getExtendedWidth() {
	    return this.width + this.gap + this.rootOffset;
	  },
	  getExtendedHeight: function getExtendedHeight() {
	    return this.height + this.gap + this.rootOffset;
	  },
	  findMinimalAreaByPoint: function findMinimalAreaByPoint(point, opt) {
	    if (!this.containsPoint(point, opt)) {
	      return null;
	    }
	    var minimalArea;
	    this.childAreas.some(function (area) {
	      minimalArea = area.findMinimalAreaByPoint(point, opt);
	      return !!minimalArea;
	    });
	    return minimalArea || this;
	  },
	  getType: function getType() {
	    return Object.keys(this.siblings).reduce(function (memo, direction) {
	      var siblingGroup = this.siblings[direction];
	      return siblingGroup.exists() ? memo.concat(direction) : memo;
	    }.bind(this), []).sort().join('-');
	  },
	  getRootAttributes: function getRootAttributes(root, attributeNames) {
	    var attributes = {
	      rootOffset: root.get(attributeNames.offset || 'offset') || 0,
	      rootMargin: root.get(attributeNames.margin || 'margin') || 0,
	      prevSiblingGap: root.get(attributeNames.prevSiblingGap || 'prevSiblingGap') || 0,
	      nextSiblingGap: root.get(attributeNames.nextSiblingGap || 'nextSiblingGap') || 0
	    };
	    var siblingRank = root.get(attributeNames.siblingRank || 'siblingRank');
	    if (core_mjs.util.isNumber(siblingRank)) {
	      attributes.siblingRank = siblingRank;
	    }
	    var firstChildGap = root.get(attributeNames.firstChildGap || 'firstChildGap');
	    if (core_mjs.util.isNumber(firstChildGap)) {
	      attributes.firstChildGap = firstChildGap;
	    }
	    return attributes;
	  },
	  getRootSize: function getRootSize(root, rootMargin) {
	    var rootSize = root.size();
	    rootSize[this.marginDimension] += rootMargin;
	    return rootSize;
	  },
	  createSiblings: function createSiblings(childAreas, opt) {
	    var groupedAreas = core_mjs.util.groupBy(childAreas, 'direction');
	    return {
	      L: new LeftLayoutSiblings(groupedAreas.L, this, opt),
	      T: new TopLayoutSiblings(groupedAreas.T, this, opt),
	      R: new RightLayoutSiblings(groupedAreas.R, this, opt),
	      B: new BottomLayoutSiblings(groupedAreas.B, this, opt),
	      BR: new BottomRightLayoutSiblings(groupedAreas.BR, this, opt),
	      BL: new BottomLeftLayoutSiblings(groupedAreas.BL, this, opt),
	      TR: new TopRightLayoutSiblings(groupedAreas.TR, this, opt),
	      TL: new TopLeftLayoutSiblings(groupedAreas.TL, this, opt)
	    };
	  },
	  computeSize: function computeSize(siblings, rootSize) {
	    return {
	      width: this.getWidth(siblings, rootSize),
	      height: this.getHeight(siblings, rootSize)
	    };
	  },
	  computeOrigin: function computeOrigin() {
	    var siblings = this.siblings;
	    var rootSize = this.rootSize;
	    var maxWidth = Math.max(this.getLWidth(siblings, rootSize) + rootSize.width / 2, this.getXLWidth(siblings, rootSize) + rootSize.width / 2, siblings.T.width / 2, siblings.B.width / 2);
	    return {
	      x: this.rootCX - maxWidth,
	      y: this.rootCY - this.getTHeight(siblings) - this.getLRHeight() / 2
	    };
	  },
	  moveSiblings: function moveSiblings(siblings, rootSize) {
	    if (this.hasHorizontalSiblings(siblings)) {
	      var dx = rootSize.width / 2;
	      siblings.L.move(-dx, 0);
	      siblings.R.move(dx, 0);
	    }
	    if (this.hasVerticalSiblings(siblings)) {
	      var dy = this.getLRHeight() / 2;
	      siblings.T.move(0, -dy);
	      siblings.B.move(0, dy);
	      siblings.BR.move(0, dy);
	      siblings.BL.move(0, dy);
	      siblings.B.move(0, this.getBXHeight(siblings));
	      siblings.TR.move(0, -dy);
	      siblings.TL.move(0, -dy);
	      siblings.T.move(0, -this.getTXHeight(siblings));
	    }
	  },
	  moveRootToConnectionPoint: function moveRootToConnectionPoint(rootSize) {
	    var connectionPoint = this.getConnectionPoint(rootSize);
	    this.dx += connectionPoint.x;
	    this.dy += connectionPoint.y;
	  },
	  computeRelativePosition: function computeRelativePosition(root, childAreas) {
	    var siblings = this.siblings = this.createSiblings(childAreas, {
	      siblingGap: this.siblingGap
	    });
	    var rootSize = this.rootSize = this.getRootSize(root, this.rootMargin);
	    core_mjs.util.assign(this, this.computeSize(siblings, rootSize));
	    this.moveSiblings(siblings, rootSize);
	    this.moveRootToConnectionPoint(rootSize);
	    this.moveRootBehindSiblings(siblings, rootSize);
	    this.moveRootFromParent();
	  },
	  computeAbsolutePosition: function computeAbsolutePosition() {
	    if (this.parentArea) {
	      this.rootCX = this.parentArea.rootCX + this.dx;
	      this.rootCY = this.parentArea.rootCY + this.dy;
	      this.level = this.parentArea.level + 1;
	    } else {
	      var rootCenter = this.root.getBBox().center();
	      this.rootCX = rootCenter.x;
	      this.rootCY = rootCenter.y;
	      this.level = 0;
	    }
	    core_mjs.util.assign(this, this.computeOrigin());
	  },
	  hasVerticalSiblings: function hasVerticalSiblings(siblings) {
	    return siblings.T.exists() || siblings.B.exists() || siblings.BR.exists() || siblings.BL.exists() || siblings.TR.exists() || siblings.TL.exists();
	  },
	  hasHorizontalSiblings: function hasHorizontalSiblings(siblings) {
	    return siblings.L.exists() || siblings.R.exists();
	  },
	  isSourceArea: function isSourceArea() {
	    return !this.parentArea;
	  },
	  isSinkArea: function isSinkArea() {
	    return this.childAreas.length === 0;
	  },
	  getRootPosition: function getRootPosition() {
	    var rootSize = this.root.get('size');
	    return {
	      x: this.rootCX - rootSize.width / 2,
	      y: this.rootCY - rootSize.height / 2
	    };
	  },
	  getRootVertices: function getRootVertices(deltaCoordinates, opt) {
	    opt = opt || {};
	    deltaCoordinates = deltaCoordinates || this;
	    if (deltaCoordinates[this.deltaCoordinate] === 0 || !this.parentArea) {
	      // Pure horizontal/vertical link has no vertices.
	      return [];
	    }
	    var parentInnerSize = this.parentArea.getInnerSize();
	    var relativeVertices;
	    if (!opt.ignoreSiblings && this.hasSiblingsBetweenParent()) {
	      // vertices avoids the elements between the root and its parent.
	      var oppositeSiblings = this.siblings[this.oppositeDirection];
	      relativeVertices = this.getRelativeVerticesAvoidingSiblings(parentInnerSize, deltaCoordinates, oppositeSiblings);
	    } else {
	      relativeVertices = this.getRelativeVertices(parentInnerSize, deltaCoordinates);
	    }
	    return core_mjs.util.invoke(relativeVertices, 'offset', this.parentArea.rootCX, this.parentArea.rootCY);
	  },
	  getInnerSize: function getInnerSize() {
	    return {
	      width: this.rootSize.width,
	      height: this.getLRHeight()
	    };
	  },
	  getConnectionPoint: function getConnectionPoint() {
	    // root area has no connection point
	    return null;
	  },
	  getRelativeVertices: function getRelativeVertices() {
	    // root area has no inbound link
	    return null;
	  },
	  moveRootFromParent: function moveRootFromParent() {

	    // root area has no parent
	  },
	  moveRootBehindSiblings: function moveRootBehindSiblings() {

	    // root area dx, dy are always 0,0
	  },
	  // Is there an element between the root of the area and the parent.
	  hasSiblingsBetweenParent: function hasSiblingsBetweenParent() {
	    return !this.isSourceArea() && this.siblings[this.oppositeDirection].exists();
	  },
	  getCY: function getCY() {
	    return this.height / 2 + this.prevSiblingGap;
	  },
	  getCX: function getCX() {
	    return this.width / 2 + this.prevSiblingGap;
	  }
	});
	LayoutArea.extend = Backbone.Model.extend;
	var RightLayoutArea = LayoutArea.extend({
	  direction: 'R',
	  oppositeDirection: 'L',
	  deltaCoordinate: 'dx',
	  marginDimension: 'height',
	  getConnectionPoint: function getConnectionPoint(rootSize) {
	    return core_mjs.g.point(rootSize.width / 2, 0);
	  },
	  moveRootBehindSiblings: function moveRootBehindSiblings(siblings, rootSize) {
	    this.dx += Math.max(this.getLWidth(siblings, rootSize), this.getTBOverlap(siblings, rootSize));
	    this.dy += (this.getTHeight(siblings) - this.getBHeight(siblings)) / 2;
	  },
	  moveRootFromParent: function moveRootFromParent() {
	    this.dx += this.parentGap + this.rootOffset;
	  },
	  getRelativeVertices: function getRelativeVertices(parentRootSize, deltaCoordinates) {
	    var connectionPoint = this.getConnectionPoint(parentRootSize);
	    var dx = this.parentGap / 2;
	    return [connectionPoint.clone().offset(dx, 0), connectionPoint.clone().offset(dx, deltaCoordinates.dy)];
	  },
	  getRelativeVerticesAvoidingSiblings: function getRelativeVerticesAvoidingSiblings(parentRootSize, deltaCoordinates, lSiblings) {
	    var connectionPoint = this.getConnectionPoint(parentRootSize);
	    var gap = lSiblings.siblingGap / 2;
	    var signY = this.dx > 0 ? -1 : 1;
	    var y1 = deltaCoordinates.dy + signY * (lSiblings.height + gap) / 2;
	    var y2 = deltaCoordinates.dy + signY * this.rootSize.height / 4;
	    var x1 = this.gap / 2;
	    var x2 = 1.5 * x1 + Math.max(this.getLWidth(this.siblings, this.rootSize), this.getTBOverlap(this.siblings, this.rootSize));
	    return [connectionPoint.clone().offset(x1, 0), connectionPoint.clone().offset(x1, y1), connectionPoint.clone().offset(x2, y1), connectionPoint.clone().offset(x2, y2)];
	  }
	});
	var LeftLayoutArea = LayoutArea.extend({
	  direction: 'L',
	  oppositeDirection: 'R',
	  deltaCoordinate: 'dx',
	  marginDimension: 'height',
	  getConnectionPoint: function getConnectionPoint(rootSize) {
	    return core_mjs.g.point(-rootSize.width / 2, 0);
	  },
	  moveRootBehindSiblings: function moveRootBehindSiblings(siblings, rootSize) {
	    this.dx -= Math.max(this.getRWidth(siblings, rootSize), this.getTBOverlap(siblings, rootSize));
	    this.dy += (this.getTHeight(siblings) - this.getBHeight(siblings)) / 2;
	  },
	  moveRootFromParent: function moveRootFromParent() {
	    this.dx -= this.parentGap + this.rootOffset;
	  },
	  getRelativeVertices: function getRelativeVertices(parentRootSize, deltaCoordinates) {
	    var connectionPoint = this.getConnectionPoint(parentRootSize);
	    var dx = -this.parentGap / 2;
	    return [connectionPoint.clone().offset(dx, 0), connectionPoint.clone().offset(dx, deltaCoordinates.dy)];
	  },
	  getRelativeVerticesAvoidingSiblings: function getRelativeVerticesAvoidingSiblings(parentRootSize, deltaCoordinates, rSiblings) {
	    var connectionPoint = this.getConnectionPoint(parentRootSize);
	    var signY = this.dx > 0 ? -1 : 1;
	    var y1 = deltaCoordinates.dy + signY * (rSiblings.height + rSiblings.siblingGap / 2) / 2;
	    var y2 = deltaCoordinates.dy + signY * this.rootSize.height / 4;
	    var x1 = this.gap / 2;
	    var x2 = 1.5 * x1 + Math.max(this.getRWidth(this.siblings, this.rootSize), this.getTBOverlap(this.siblings, this.rootSize));
	    return [connectionPoint.clone().offset(-x1, 0), connectionPoint.clone().offset(-x1, y1), connectionPoint.clone().offset(-x2, y1), connectionPoint.clone().offset(-x2, y2)];
	  }
	});
	var TopLayoutArea = LayoutArea.extend({
	  direction: 'T',
	  oppositeDirection: 'B',
	  deltaCoordinate: 'dy',
	  marginDimension: 'width',
	  getConnectionPoint: function getConnectionPoint(rootSize) {
	    return core_mjs.g.point(0, -rootSize.height / 2);
	  },
	  moveRootBehindSiblings: function moveRootBehindSiblings(siblings, rootSize) {
	    this.dx += this.getRootDX(siblings, rootSize);
	    if (this.hasHorizontalSiblings(siblings)) {
	      this.dy -= (this.getLRHeight() - rootSize.height) / 2;
	    }
	    this.dy -= this.getBHeight(siblings);
	  },
	  moveRootFromParent: function moveRootFromParent() {
	    this.dy -= this.parentGap + this.rootOffset;
	  },
	  getRelativeVertices: function getRelativeVertices(parentRootSize, deltaCoordinates) {
	    var connectionPoint = this.getConnectionPoint(parentRootSize);
	    var dy = -this.getTXHeight(this.parentArea.siblings) - this.parentGap / 2;
	    return [connectionPoint.clone().offset(0, dy), connectionPoint.clone().offset(deltaCoordinates.dx, dy)];
	  },
	  getRelativeVerticesAvoidingSiblings: function getRelativeVerticesAvoidingSiblings(parentRootSize, deltaCoordinates) {
	    var connectionPoint = this.getConnectionPoint(parentRootSize);
	    var siblings = this.siblings;
	    var bSiblings = siblings.B;

	    // Jump the Top-Right and Top-Left siblings of the parent element
	    var y1 = this.getTXHeight(this.parentArea.siblings) + this.parentGap / 2;
	    var y2 = y1 + bSiblings.height;
	    // Jump the Bottom-Right and Bottom-Left siblings of the child element
	    y2 += this.getBXHeight(this.siblings) + this.parentGap / 4;

	    // x1 lies far from the element center
	    var signX = this.dy < 0 ? -1 : 1;
	    var bxWidth = siblings[signX > 0 ? 'BR' : 'BL'].width;
	    var x1 = deltaCoordinates.dx;
	    x1 += signX * (Math.max(bxWidth, bSiblings.width / 2) + bSiblings.siblingGap / 4);
	    // x2 lies closer to the element center
	    var x2 = deltaCoordinates.dx + signX * this.rootSize.width / 4;
	    return [connectionPoint.clone().offset(0, -y1), connectionPoint.clone().offset(x1, -y1), connectionPoint.clone().offset(x1, -y2), connectionPoint.clone().offset(x2, -y2)];
	  }
	});
	var BottomLayoutArea = LayoutArea.extend({
	  direction: 'B',
	  oppositeDirection: 'T',
	  deltaCoordinate: 'dy',
	  marginDimension: 'width',
	  getConnectionPoint: function getConnectionPoint(rootSize) {
	    return core_mjs.g.point(0, rootSize.height / 2);
	  },
	  moveRootBehindSiblings: function moveRootBehindSiblings(siblings, rootSize) {
	    this.dx += this.getRootDX(siblings, rootSize);
	    this.dy += this.getTHeight(siblings);
	    if (this.hasHorizontalSiblings(siblings)) {
	      this.dy += (this.getLRHeight() - rootSize.height) / 2;
	    }
	  },
	  moveRootFromParent: function moveRootFromParent() {
	    this.dy += this.parentGap + this.rootOffset;
	  },
	  getRelativeVertices: function getRelativeVertices(parentRootSize, deltaCoordinates) {
	    var connectionPoint = this.getConnectionPoint(parentRootSize);
	    var dy = this.getBXHeight(this.parentArea.siblings) + this.parentGap / 2;
	    return [connectionPoint.clone().offset(0, dy), connectionPoint.clone().offset(deltaCoordinates.dx, dy)];
	  },
	  getRelativeVerticesAvoidingSiblings: function getRelativeVerticesAvoidingSiblings(parentRootSize, deltaCoordinates) {
	    var connectionPoint = this.getConnectionPoint(parentRootSize);
	    var siblings = this.siblings;
	    var tSiblings = siblings.T;

	    // Jump the Bottom-Right and Bottom-Left siblings of the parent element
	    var y1 = this.getBXHeight(this.parentArea.siblings) + this.parentGap / 2;
	    var y2 = y1 + tSiblings.height;
	    // Jump the Top-Right and Top-Left siblings of the child element
	    y2 += this.getTXHeight(siblings) + this.parentGap / 4;

	    // x1 lies far from the element center
	    var signX = this.dy < 0 ? -1 : 1;
	    var txWidth = siblings[signX > 0 ? 'TR' : 'TL'].width;
	    var x1 = deltaCoordinates.dx;
	    x1 += signX * (Math.max(txWidth, tSiblings.width / 2) + tSiblings.siblingGap / 4);
	    // x2 lies close to the element center
	    var x2 = deltaCoordinates.dx + signX * this.rootSize.width / 4;
	    return [connectionPoint.clone().offset(0, y1), connectionPoint.clone().offset(x1, y1), connectionPoint.clone().offset(x1, y2), connectionPoint.clone().offset(x2, y2)];
	  }
	});
	var BottomRightLayoutArea = LayoutArea.extend({
	  direction: 'BR',
	  oppositeDirection: 'L',
	  deltaCoordinate: 'dy',
	  marginDimension: 'height',
	  getConnectionPoint: function getConnectionPoint(rootSize) {
	    return core_mjs.g.point(0, rootSize.height / 2);
	  },
	  getCY: function getCY() {
	    return this.prevSiblingGap;
	  },
	  moveRootBehindSiblings: function moveRootBehindSiblings(siblings, rootSize) {
	    var btWidth = Math.max(siblings.T.width, siblings.B.width);
	    this.dx += Math.max(this.getLWidth(siblings, rootSize), (btWidth - rootSize.width) / 2);
	    this.dy += this.getTHeight(siblings);
	    if (this.hasHorizontalSiblings(siblings)) {
	      this.dy += (this.getLRHeight() - rootSize.height) / 2;
	    }
	  },
	  moveRootFromParent: function moveRootFromParent() {
	    var parentArea = this.parentArea;
	    if (parentArea) {
	      this.dy += parentArea.firstChildGap;
	    }
	    this.dx += this.rootSize.width / 2 + this.rootOffset + this.parentGap;
	  },
	  getRelativeVertices: function getRelativeVertices(parentRootSize, deltaCoordinates) {
	    var connectionPoint = this.getConnectionPoint(parentRootSize);
	    var dx = deltaCoordinates.dx,
	      dy = deltaCoordinates.dy;
	    var width = parentRootSize.width,
	      height = parentRootSize.height;
	    var x;
	    if (dy - height / 2 < 0) {
	      // Child is next to the parent because `firstChildGap` is negative
	      x = (width / 2 + (dx - this.rootSize.width / 2)) / 2;
	    } else {
	      x = 0;
	    }
	    return [connectionPoint.clone().offset(x, dy - height / 2)];
	  },
	  getRelativeVerticesAvoidingSiblings: function getRelativeVerticesAvoidingSiblings(parentRootSize, deltaCoordinates, siblings) {
	    var x = deltaCoordinates.dx - this.rootSize.width / 4;
	    var y = deltaCoordinates.dy;
	    y += Math.max(siblings.height, this.rootSize.height) / 2;
	    y += this.getMinimalGap(siblings) / 2;
	    return [core_mjs.g.point(0, y), core_mjs.g.point(x, y)];
	  }
	});
	var BottomLeftLayoutArea = LayoutArea.extend({
	  direction: 'BL',
	  oppositeDirection: 'R',
	  deltaCoordinate: 'dy',
	  marginDimension: 'height',
	  getConnectionPoint: function getConnectionPoint(rootSize) {
	    return core_mjs.g.point(0, rootSize.height / 2);
	  },
	  getCY: function getCY() {
	    return this.prevSiblingGap;
	  },
	  moveRootBehindSiblings: function moveRootBehindSiblings(siblings, rootSize) {
	    var btWidth = Math.max(siblings.T.width, siblings.B.width);
	    this.dx -= Math.max(this.getRWidth(siblings, rootSize), (btWidth - rootSize.width) / 2);
	    this.dy += this.getTHeight(siblings);
	    if (this.hasHorizontalSiblings(siblings)) {
	      this.dy += (this.getLRHeight() - rootSize.height) / 2;
	    }
	  },
	  moveRootFromParent: function moveRootFromParent() {
	    var parentArea = this.parentArea;
	    if (parentArea) {
	      this.dy += parentArea.firstChildGap;
	    }
	    this.dx -= this.rootSize.width / 2 + this.rootOffset + this.parentGap;
	  },
	  getRelativeVertices: function getRelativeVertices(parentRootSize, deltaCoordinates) {
	    var connectionPoint = this.getConnectionPoint(parentRootSize);
	    var dx = deltaCoordinates.dx,
	      dy = deltaCoordinates.dy;
	    var width = parentRootSize.width,
	      height = parentRootSize.height;
	    var x;
	    if (dy - height / 2 < 0) {
	      // Child is next to the parent because `firstChildGap` is negative
	      x = (-width / 2 + (dx + this.rootSize.width / 2)) / 2;
	    } else {
	      x = 0;
	    }
	    return [connectionPoint.clone().offset(x, dy - height / 2)];
	  },
	  getRelativeVerticesAvoidingSiblings: function getRelativeVerticesAvoidingSiblings(parentRootSize, deltaCoordinates, siblings) {
	    var x = deltaCoordinates.dx + this.rootSize.width / 4;
	    var y = deltaCoordinates.dy;
	    y += Math.max(siblings.height, this.rootSize.height) / 2;
	    y += this.getMinimalGap(siblings) / 2;
	    return [core_mjs.g.point(0, y), core_mjs.g.point(x, y)];
	  }
	});
	var TopRightLayoutArea = LayoutArea.extend({
	  direction: 'TR',
	  oppositeDirection: 'L',
	  deltaCoordinate: 'dy',
	  marginDimension: 'height',
	  getConnectionPoint: function getConnectionPoint(rootSize) {
	    return core_mjs.g.point(0, rootSize.height / 2);
	  },
	  getCY: function getCY() {
	    return this.height - this.rootSize.height + this.prevSiblingGap;
	  },
	  moveRootBehindSiblings: function moveRootBehindSiblings(siblings, rootSize) {
	    this.dx += Math.max(this.getLWidth(siblings, rootSize), this.getTBOverlap(siblings, rootSize));
	    this.dy -= this.getBHeight(siblings);
	    if (this.hasHorizontalSiblings(siblings)) {
	      this.dy -= (this.getLRHeight() - rootSize.height) / 2;
	    }
	  },
	  moveRootFromParent: function moveRootFromParent() {
	    var parentArea = this.parentArea;
	    if (parentArea) {
	      this.dy -= parentArea.firstChildGap;
	    }
	    this.dx += this.rootSize.width / 2 + this.rootOffset + this.parentGap;
	  },
	  getRelativeVertices: function getRelativeVertices(parentRootSize, deltaCoordinates) {
	    var connectionPoint = this.getConnectionPoint(parentRootSize);
	    var dx = deltaCoordinates.dx,
	      dy = deltaCoordinates.dy;
	    var width = parentRootSize.width,
	      height = parentRootSize.height;
	    var x;
	    if (dy + height / 2 > 0) {
	      // Child is next to the parent because `firstChildGap` is negative
	      x = (width / 2 + (dx - this.rootSize.width / 2)) / 2;
	    } else {
	      x = 0;
	    }
	    return [connectionPoint.clone().offset(x, dy - height / 2)];
	  },
	  getRelativeVerticesAvoidingSiblings: function getRelativeVerticesAvoidingSiblings(parentRootSize, deltaCoordinates, siblings) {
	    var x = deltaCoordinates.dx - this.rootSize.width / 4;
	    var y = deltaCoordinates.dy;
	    y -= Math.max(siblings.height, this.rootSize.height) / 2;
	    y -= this.getMinimalGap(siblings) / 2;
	    return [core_mjs.g.point(0, y), core_mjs.g.point(x, y)];
	  }
	});
	var TopLeftLayoutArea = LayoutArea.extend({
	  direction: 'TL',
	  oppositeDirection: 'R',
	  deltaCoordinate: 'dy',
	  marginDimension: 'height',
	  getConnectionPoint: function getConnectionPoint(rootSize) {
	    return core_mjs.g.point(0, rootSize.height / 2);
	  },
	  getCY: function getCY() {
	    return this.height - this.rootSize.height + this.prevSiblingGap;
	  },
	  moveRootBehindSiblings: function moveRootBehindSiblings(siblings, rootSize) {
	    this.dx -= Math.max(this.getRWidth(siblings, rootSize), this.getTBOverlap(siblings, rootSize));
	    this.dy -= this.getBHeight(siblings);
	    if (this.hasHorizontalSiblings(siblings)) {
	      this.dy -= (this.getLRHeight() - rootSize.height) / 2;
	    }
	  },
	  moveRootFromParent: function moveRootFromParent() {
	    var parentArea = this.parentArea;
	    if (parentArea) {
	      this.dy -= parentArea.firstChildGap;
	    }
	    this.dx -= this.rootSize.width / 2 + this.rootOffset + this.parentGap;
	  },
	  getRelativeVertices: function getRelativeVertices(parentRootSize, deltaCoordinates) {
	    var connectionPoint = this.getConnectionPoint(parentRootSize);
	    var dx = deltaCoordinates.dx,
	      dy = deltaCoordinates.dy;
	    var width = parentRootSize.width,
	      height = parentRootSize.height;
	    var x;
	    if (dy + height / 2 > 0) {
	      // Child is next to the parent because `firstChildGap` is negative
	      x = (-width / 2 + (dx + this.rootSize.width / 2)) / 2;
	    } else {
	      x = 0;
	    }
	    return [connectionPoint.clone().offset(x, dy - height / 2)];
	  },
	  getRelativeVerticesAvoidingSiblings: function getRelativeVerticesAvoidingSiblings(parentRootSize, deltaCoordinates, siblings) {
	    var x = deltaCoordinates.dx + this.rootSize.width / 4;
	    var y = deltaCoordinates.dy;
	    y -= Math.max(siblings.height, this.rootSize.height) / 2;
	    y -= this.getMinimalGap(siblings) / 2;
	    return [core_mjs.g.point(0, y), core_mjs.g.point(x, y)];
	  }
	});
	var directionRules = {
	  rotate: function rotate(rule) {
	    var directions = 'LRBT';
	    var directionChange = directions.indexOf(rule[0]) - directions.indexOf(rule[1]);
	    return function (direction) {
	      var directionIndex = directions.indexOf(direction);
	      return directionIndex >= 0 ? directions[(4 + directionIndex - directionChange) % 4] : direction;
	    };
	  },
	  flip: function flip(rule) {
	    var from = rule[0];
	    var to = rule[1];
	    return function (direction) {
	      if (direction === from) return to;
	      if (direction === to) return from;
	      return direction;
	    };
	  },
	  straighten: function straighten(rule) {
	    return function () {
	      return rule[1];
	    };
	  }
	};
	var TreeLayout = Backbone.Model.extend({
	  defaults: {
	    // A graph to perform the layout on.
	    graph: undefined,
	    // Global gap. Could be overridden via parentGap, siblingGap and childrenGap
	    gap: 20,
	    // Gap between a child and its parent.
	    parentGap: 20,
	    // Gap between two siblings.
	    siblingGap: 20,
	    // Gap between parent and its first children
	    // Applicable for BR,BL,TR,TL
	    firstChildGap: 20,
	    // Default direction used when elements
	    // doesn't explicitly specify their direction.
	    direction: 'R',
	    // A rule telling how to reorganize a branch after reconnect.
	    // The root of the branch can change the `direction` so
	    // it might be desirable to change also the directions of
	    // its descendants.
	    directionRule: directionRules.straighten,
	    // Allows elements to be positioned in animated manner.
	    //
	    // element.transition('position', position, {
	    //   delay: 300,
	    //   valueFunction: util.interpolate.object,
	    // });
	    updatePosition: function updatePosition(element, position, opt) {
	      element.set('position', position, opt);
	    },
	    // Allows vertices to be positioned in animated manner.
	    // Please see `updatePosition` option.
	    updateVertices: function updateVertices(link, vertices, opt) {
	      link.set('vertices', vertices, opt);
	    },
	    // Allows setting arbitrary (usually layout-related) attributes
	    // on the cells as part of the layout.
	    //
	    // function(layoutArea, root, rootLink, opt) {
	    //   /* update root and rootLink cells. */
	    // }
	    updateAttributes: null,
	    // Arbitrary subtree can be skipped in the layout computation.
	    // e.g. a collapse branch is not visible in the paper but present
	    // in the graph.
	    //
	    // function(children, parent, opt) {
	    //   /* returns filtered children */
	    // }
	    filter: null,
	    // The element attributes that control layout
	    // can be customized here.
	    // e.g { direction: 'rankDir' }
	    attributeNames: {
	      // siblingRank: 'siblingRank',
	      // direction: 'direction',
	      // margin: 'margin',
	      // offset: 'offset'
	      // prevSiblingGap: 'prevSiblingGap'
	      // nextSiblingGap: 'prevSiblingGap',
	      // firstChildGap: 'firstChildGap'
	    }
	  },
	  initialize: function initialize() {
	    // Caching the graph and the other options for a quicker access.
	    this._cacheOptions(this.attributes);

	    // Layout areas cache.
	    this.layoutAreas = {};
	  },
	  // Auto layout the entire graph
	  // Each root is treated separately.
	  layout: function layout(opt) {
	    // delete the previous layout areas
	    this.layoutAreas = {};
	    var graphSources = this.getGraphSources(opt);
	    for (var i = 0, n = graphSources.length; i < n; i++) {
	      this.layoutTree(graphSources[i], opt);
	    }

	    // COMPAT: backwards compatibility
	    this.trigger('layout:done', opt);
	    return this;
	  },
	  // Auto layout a single tree.
	  layoutTree: function layoutTree(root, opt) {
	    opt = opt || {};
	    opt.treeLayout = true;

	    // create layout areas and compute relative positions
	    var rootArea = this._computeLayoutAreas(root, null, opt);
	    this._computeAbsolutePositions(rootArea);
	    this._updateCells(rootArea, opt);
	    return this;
	  },
	  // Returns the bounding box of all laid out elements.
	  getLayoutBBox: function getLayoutBBox() {
	    return this.getRootLayoutAreas().reduce(function (bbox, area) {
	      var areaBBox = area.getBBox();
	      if (!bbox) return areaBBox;
	      return bbox.union(areaBBox);
	    }, null);
	  },
	  getLayoutArea: function getLayoutArea(element) {
	    return this.layoutAreas[element.id || element] || null;
	  },
	  getRootLayoutAreas: function getRootLayoutAreas() {
	    return this.getGraphSources().map(this.getLayoutArea, this);
	  },
	  // Returns filtered source elements from the graph
	  getGraphSources: function getGraphSources(opt) {
	    var sources = this.graph.getSources();
	    if (this.filter && sources.length > 0) {
	      sources = this.filter(sources, null, opt) || sources;
	    }
	    return sources;
	  },
	  // Returns a layout area with minimal size containing the given point.
	  getMinimalRootAreaByPoint: function getMinimalRootAreaByPoint(point) {
	    var rootLayoutAreas = this.getRootLayoutAreas().filter(function (layoutArea) {
	      return layoutArea.containsPoint(point);
	    });
	    if (core_mjs.util.isEmpty(rootLayoutAreas)) {
	      return null;
	    }
	    return rootLayoutAreas.reduce(function (res, layoutArea) {
	      if (layoutArea.width * layoutArea.height < res.min) {
	        res.min = layoutArea.width * layoutArea.height;
	        res.item = layoutArea;
	      }
	      return res;
	    }, {
	      min: Infinity,
	      item: undefined
	    }).item;
	  },
	  // Recursively (in top-down fashion) computes the layout areas
	  // for every single element in the current tree.
	  _computeLayoutAreas: function _computeLayoutAreas(element, prevLayoutArea, opt) {
	    // PHASE 1: Going from the root down to the leaves.
	    var prevDirection = prevLayoutArea ? prevLayoutArea.direction : this.get('direction');
	    var direction = element.get(this.getAttributeName('direction')) || prevDirection;
	    var layoutArea = LayoutArea.create(direction, element, this.attributes);
	    // Link to parent layout area
	    layoutArea.parentArea = prevLayoutArea;
	    // Find the element inbound link.
	    layoutArea.link = this.graph.getConnectedLinks(element, {
	      inbound: true
	    })[0];
	    // Recursion start.
	    var children = this._getChildren(element, opt);
	    // Store the layout area on the tree layout instance.
	    this.layoutAreas[element.id] = layoutArea;
	    var childLayoutAreas = [];
	    for (var i = 0, n = children.length; i < n; i++) {
	      childLayoutAreas.push(this._computeLayoutAreas(children[i], layoutArea, opt));
	    }

	    // PHASE 2: Going from the leaves up to the root.
	    layoutArea.compute(childLayoutAreas);
	    return layoutArea;
	  },
	  // Cache options on the instance object for quicker access.
	  _cacheOptions: function _cacheOptions(options) {
	    var functionNames = ['updateAttributes', 'updateVertices', 'updatePosition', 'filter'];

	    // cache functions
	    functionNames.forEach(function (name) {
	      this[name] = core_mjs.util.isFunction(options[name]) ? options[name] : null;
	    }, this);

	    // cache graph
	    this.graph = options.graph;
	  },
	  // Returns filtered children for the given parent.
	  _getChildren: function _getChildren(parent, opt) {
	    if (this.layoutAreas[parent.id]) {
	      // prevent infinite loop in case there are cycles in the graph
	      return [];
	    }
	    var children = this.graph.getNeighbors(parent, {
	      outbound: true
	    });
	    if (this.filter && children.length > 0) {
	      children = this.filter(children, parent, opt) || children;
	    }
	    return children;
	  },
	  // Recursively computes the elements absolute positions based on
	  // the relative position and absolute position of the parent element.
	  _computeAbsolutePositions: function _computeAbsolutePositions(layoutArea) {
	    layoutArea.computeAbsolutePosition(layoutArea);
	    for (var i = 0, n = layoutArea.childAreas.length; i < n; i++) {
	      this._computeAbsolutePositions(layoutArea.childAreas[i]);
	    }
	  },
	  // Applies computed values on the tree cells.
	  _updateCells: function _updateCells(layoutArea, opt) {
	    var rootElement = layoutArea.root;
	    var rootLink = layoutArea.link || null;
	    if (rootLink) {
	      // update the position of the current root.
	      if (this.updatePosition) {
	        this.updatePosition(rootElement, layoutArea.getRootPosition(), opt);
	      }

	      // update the vertices of the link connected to the current root.
	      if (this.updateVertices) {
	        this.updateVertices(rootLink, layoutArea.getRootVertices(), opt);
	      }
	    }
	    this.changeSiblingRank(rootElement, layoutArea.siblingRank, opt);

	    // update the attributes of the current root and the associated link
	    if (this.updateAttributes) {
	      this.updateAttributes(layoutArea, rootElement, rootLink, opt);
	    }
	    for (var i = 0, n = layoutArea.childAreas.length; i < n; i++) {
	      this._updateCells(layoutArea.childAreas[i], opt);
	    }
	  },
	  updateDirections: function updateDirections(root, rule, opt) {
	    opt = opt || {};
	    var directionAttribute = this.getAttributeName('direction');
	    var getDirection = this.get('directionRule')(rule);
	    this.graph.search(root, function (element, level) {
	      if (level === 0) return;
	      var newDirection = getDirection(element.get(directionAttribute));
	      this.changeDirection(element, newDirection, opt);
	    }.bind(this), {
	      outbound: true
	    });
	  },
	  reconnectElement: function reconnectElement(element, targetElement, opt) {
	    opt = opt || {};
	    var layoutArea = this.getLayoutArea(element);
	    var link = layoutArea.link;
	    if (link) {
	      link.set('source', {
	        id: targetElement.id || targetElement
	      }, opt);
	      var oldDirection = layoutArea.direction;
	      var newDirection = opt.direction || oldDirection;
	      var newSiblingRank = opt.siblingRank || undefined;
	      this.changeSiblingRank(element, newSiblingRank, opt);
	      this.changeDirection(element, newDirection, opt);
	      if (oldDirection !== newDirection) {
	        this.updateDirections(element, [oldDirection, opt.direction], opt);
	      }
	      return true;
	    }
	    return false;
	  },
	  // A convenient way how to get/set cells attributes
	  // as the attribute names can vary based on the tree layout settings.

	  changeSiblingRank: function changeSiblingRank(element, siblingRank, opt) {
	    element.set(this.getAttributeName('siblingRank'), siblingRank, opt);
	  },
	  changeDirection: function changeDirection(element, direction, opt) {
	    element.set(this.getAttributeName('direction'), direction, opt);
	  },
	  getAttributeName: function getAttributeName(attribute) {
	    return this.get('attributeNames')[attribute] || attribute;
	  },
	  getAttribute: function getAttribute(element, attribute) {
	    return element.get(this.getAttributeName(attribute));
	  },
	  // COMPAT: backwards compatibility

	  prepare: function prepare() {
	    // This method built the adjacency table originally.
	    // No need for this now as the graph build one internally.
	    return this;
	  }
	}, {
	  directionRules: directionRules
	});

	exports.TreeLayout = TreeLayout;

}(this.joint.layout = this.joint.layout || {}, Backbone, joint));
