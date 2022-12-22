/*! JointJS+ v3.6.3 - HTML5 Diagramming Framework

Copyright (c) 2022 client IO

 2022-12-09 


This Source Code Form is subject to the terms of the JointJS+ License
, v. 2.0. If a copy of the JointJS+ License was not distributed with this
file, You can obtain one at http://jointjs.com/license/rappid_v2.txt
 or from the JointJS+ archive as was distributed by client IO. See the LICENSE file.*/


this.joint = this.joint || {};
(function (exports, core_mjs, $) {
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

	var fails = function (exec) {
	  try {
	    return !!exec();
	  } catch (error) {
	    return true;
	  }
	};

	var functionBindNative = !fails(function () {
	  // eslint-disable-next-line es/no-function-prototype-bind -- safe
	  var test = (function () { /* empty */ }).bind();
	  // eslint-disable-next-line no-prototype-builtins -- safe
	  return typeof test != 'function' || test.hasOwnProperty('prototype');
	});

	var FunctionPrototype = Function.prototype;
	var call = FunctionPrototype.call;
	var uncurryThisWithBind = functionBindNative && FunctionPrototype.bind.bind(call, call);

	var functionUncurryThisRaw = function (fn) {
	  return functionBindNative ? uncurryThisWithBind(fn) : function () {
	    return call.apply(fn, arguments);
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

	var $Object = Object;

	// `ToObject` abstract operation
	// https://tc39.es/ecma262/#sec-toobject
	var toObject = function (argument) {
	  return $Object(requireObjectCoercible(argument));
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

	var aFunction = function (argument) {
	  return isCallable(argument) ? argument : undefined;
	};

	var getBuiltIn = function (namespace, method) {
	  return arguments.length < 2 ? aFunction(global_1[namespace]) : global_1[namespace] && global_1[namespace][method];
	};

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

	var TO_STRING_TAG = wellKnownSymbol('toStringTag');
	var test = {};

	test[TO_STRING_TAG] = 'z';

	var toStringTagSupport = String(test) === '[object z]';

	// Detect IE8's incomplete defineProperty implementation
	var descriptors = !fails(function () {
	  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
	  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
	});

	var documentAll$2 = documentAll_1.all;

	var isObject = documentAll_1.IS_HTMLDDA ? function (it) {
	  return typeof it == 'object' ? it !== null : isCallable(it) || it === documentAll$2;
	} : function (it) {
	  return typeof it == 'object' ? it !== null : isCallable(it);
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

	// V8 ~ Chrome 36-
	// https://bugs.chromium.org/p/v8/issues/detail?id=3334
	var v8PrototypeDefineBug = descriptors && fails(function () {
	  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
	  return Object.defineProperty(function () { /* empty */ }, 'prototype', {
	    value: 42,
	    writable: false
	  }).prototype != 42;
	});

	var $String = String;
	var $TypeError$1 = TypeError;

	// `Assert: Type(argument) is Object`
	var anObject = function (argument) {
	  if (isObject(argument)) return argument;
	  throw $TypeError$1($String(argument) + ' is not an object');
	};

	var call$1 = Function.prototype.call;

	var functionCall = functionBindNative ? call$1.bind(call$1) : function () {
	  return call$1.apply(call$1, arguments);
	};

	var objectIsPrototypeOf = functionUncurryThis({}.isPrototypeOf);

	var $Object$1 = Object;

	var isSymbol = useSymbolAsUid ? function (it) {
	  return typeof it == 'symbol';
	} : function (it) {
	  var $Symbol = getBuiltIn('Symbol');
	  return isCallable($Symbol) && objectIsPrototypeOf($Symbol.prototype, $Object$1(it));
	};

	var $String$1 = String;

	var tryToString = function (argument) {
	  try {
	    return $String$1(argument);
	  } catch (error) {
	    return 'Object';
	  }
	};

	var $TypeError$2 = TypeError;

	// `Assert: IsCallable(argument) is true`
	var aCallable = function (argument) {
	  if (isCallable(argument)) return argument;
	  throw $TypeError$2(tryToString(argument) + ' is not a function');
	};

	// `GetMethod` abstract operation
	// https://tc39.es/ecma262/#sec-getmethod
	var getMethod = function (V, P) {
	  var func = V[P];
	  return isNullOrUndefined(func) ? undefined : aCallable(func);
	};

	var $TypeError$3 = TypeError;

	// `OrdinaryToPrimitive` abstract operation
	// https://tc39.es/ecma262/#sec-ordinarytoprimitive
	var ordinaryToPrimitive = function (input, pref) {
	  var fn, val;
	  if (pref === 'string' && isCallable(fn = input.toString) && !isObject(val = functionCall(fn, input))) return val;
	  if (isCallable(fn = input.valueOf) && !isObject(val = functionCall(fn, input))) return val;
	  if (pref !== 'string' && isCallable(fn = input.toString) && !isObject(val = functionCall(fn, input))) return val;
	  throw $TypeError$3("Can't convert object to primitive value");
	};

	var $TypeError$4 = TypeError;
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
	    throw $TypeError$4("Can't convert object to primitive value");
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

	var $TypeError$5 = TypeError;
	// eslint-disable-next-line es/no-object-defineproperty -- safe
	var $defineProperty = Object.defineProperty;
	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
	var ENUMERABLE = 'enumerable';
	var CONFIGURABLE = 'configurable';
	var WRITABLE = 'writable';

	// `Object.defineProperty` method
	// https://tc39.es/ecma262/#sec-object.defineproperty
	var f = descriptors ? v8PrototypeDefineBug ? function defineProperty(O, P, Attributes) {
	  anObject(O);
	  P = toPropertyKey(P);
	  anObject(Attributes);
	  if (typeof O === 'function' && P === 'prototype' && 'value' in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
	    var current = $getOwnPropertyDescriptor(O, P);
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
		f: f
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

	var createPropertyDescriptor = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

	var createNonEnumerableProperty = descriptors ? function (object, key, value) {
	  return objectDefineProperty.f(object, key, createPropertyDescriptor(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

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

	var TO_STRING_TAG$1 = wellKnownSymbol('toStringTag');
	var $Object$2 = Object;

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
	    : typeof (tag = tryGet(O = $Object$2(it), TO_STRING_TAG$1)) == 'string' ? tag
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

	var $propertyIsEnumerable = {}.propertyIsEnumerable;
	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

	// Nashorn ~ JDK8 bug
	var NASHORN_BUG = getOwnPropertyDescriptor && !$propertyIsEnumerable.call({ 1: 2 }, 1);

	// `Object.prototype.propertyIsEnumerable` method implementation
	// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
	var f$1 = NASHORN_BUG ? function propertyIsEnumerable(V) {
	  var descriptor = getOwnPropertyDescriptor(this, V);
	  return !!descriptor && descriptor.enumerable;
	} : $propertyIsEnumerable;

	var objectPropertyIsEnumerable = {
		f: f$1
	};

	var $Object$3 = Object;
	var split = functionUncurryThis(''.split);

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var indexedObject = fails(function () {
	  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
	  // eslint-disable-next-line no-prototype-builtins -- safe
	  return !$Object$3('z').propertyIsEnumerable(0);
	}) ? function (it) {
	  return classofRaw(it) == 'String' ? split(it, '') : $Object$3(it);
	} : $Object$3;

	// toObject with fallback for non-array-like ES3 strings



	var toIndexedObject = function (it) {
	  return indexedObject(requireObjectCoercible(it));
	};

	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	var $getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;

	// `Object.getOwnPropertyDescriptor` method
	// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
	var f$2 = descriptors ? $getOwnPropertyDescriptor$1 : function getOwnPropertyDescriptor(O, P) {
	  O = toIndexedObject(O);
	  P = toPropertyKey(P);
	  if (ie8DomDefine) try {
	    return $getOwnPropertyDescriptor$1(O, P);
	  } catch (error) { /* empty */ }
	  if (hasOwnProperty_1(O, P)) return createPropertyDescriptor(!functionCall(objectPropertyIsEnumerable.f, O, P), O[P]);
	};

	var objectGetOwnPropertyDescriptor = {
		f: f$2
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

	var defineProperty$1 = objectDefineProperty.f;



	var TO_STRING_TAG$2 = wellKnownSymbol('toStringTag');

	var setToStringTag = function (target, TAG, STATIC) {
	  if (target && !STATIC) target = target.prototype;
	  if (target && !hasOwnProperty_1(target, TO_STRING_TAG$2)) {
	    defineProperty$1(target, TO_STRING_TAG$2, { configurable: true, value: TAG });
	  }
	};

	var SPECIES = wellKnownSymbol('species');

	var setSpecies = function (CONSTRUCTOR_NAME) {
	  var Constructor = getBuiltIn(CONSTRUCTOR_NAME);
	  var defineProperty = objectDefineProperty.f;

	  if (descriptors && Constructor && !Constructor[SPECIES]) {
	    defineProperty(Constructor, SPECIES, {
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

	var $TypeError$8 = TypeError;

	// `Assert: IsConstructor(argument) is true`
	var aConstructor = function (argument) {
	  if (isConstructor(argument)) return argument;
	  throw $TypeError$8(tryToString(argument) + ' is not a constructor');
	};

	var SPECIES$1 = wellKnownSymbol('species');

	// `SpeciesConstructor` abstract operation
	// https://tc39.es/ecma262/#sec-speciesconstructor
	var speciesConstructor = function (O, defaultConstructor) {
	  var C = anObject(O).constructor;
	  var S;
	  return C === undefined || isNullOrUndefined(S = anObject(C)[SPECIES$1]) ? defaultConstructor : aConstructor(S);
	};

	var FunctionPrototype$2 = Function.prototype;
	var apply = FunctionPrototype$2.apply;
	var call$2 = FunctionPrototype$2.call;

	// eslint-disable-next-line es/no-reflect -- safe
	var functionApply = typeof Reflect == 'object' && Reflect.apply || (functionBindNative ? call$2.bind(apply) : function () {
	  return call$2.apply(apply, arguments);
	});

	var bind = functionUncurryThis(functionUncurryThis.bind);

	// optional / simple context binding
	var functionBindContext = function (fn, that) {
	  aCallable(fn);
	  return that === undefined ? fn : functionBindNative ? bind(fn, that) : function (/* ...args */) {
	    return fn.apply(that, arguments);
	  };
	};

	var html = getBuiltIn('document', 'documentElement');

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
	var SPECIES$2 = wellKnownSymbol('species');
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
	    constructor[SPECIES$2] = FakePromise;
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
	var f$5 = function (C) {
	  return new PromiseCapability(C);
	};

	var newPromiseCapability = {
		f: f$5
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
	var ArrayPrototype = Array.prototype;

	// check on default Array iterator
	var isArrayIteratorMethod = function (it) {
	  return it !== undefined && (iterators.Array === it || ArrayPrototype[ITERATOR] === it);
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

	// `IsArray` abstract operation
	// https://tc39.es/ecma262/#sec-isarray
	// eslint-disable-next-line es/no-array-isarray -- safe
	var isArray = Array.isArray || function isArray(argument) {
	  return classofRaw(argument) == 'Array';
	};

	var SPECIES$3 = wellKnownSymbol('species');
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
	      C = C[SPECIES$3];
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

	// `Object.keys` method
	// https://tc39.es/ecma262/#sec-object.keys
	// eslint-disable-next-line es/no-object-keys -- safe
	var objectKeys = Object.keys || function keys(O) {
	  return objectKeysInternal(O, enumBugKeys);
	};

	// `Object.defineProperties` method
	// https://tc39.es/ecma262/#sec-object.defineproperties
	// eslint-disable-next-line es/no-object-defineproperties -- safe
	var f$6 = descriptors && !v8PrototypeDefineBug ? Object.defineProperties : function defineProperties(O, Properties) {
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
		f: f$6
	};

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

	var defineProperty$2 = objectDefineProperty.f;

	var UNSCOPABLES = wellKnownSymbol('unscopables');
	var ArrayPrototype$1 = Array.prototype;

	// Array.prototype[@@unscopables]
	// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
	if (ArrayPrototype$1[UNSCOPABLES] == undefined) {
	  defineProperty$2(ArrayPrototype$1, UNSCOPABLES, {
	    configurable: true,
	    value: objectCreate(null)
	  });
	}

	// add a key to Array.prototype[@@unscopables]
	var addToUnscopables = function (key) {
	  ArrayPrototype$1[UNSCOPABLES][key] = true;
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

	var FAILS_ON_PRIMITIVES = fails(function () { objectKeys(1); });

	// `Object.keys` method
	// https://tc39.es/ecma262/#sec-object.keys
	_export({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES }, {
	  keys: function keys(it) {
	    return objectKeys(toObject(it));
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

	var $TypeError$d = TypeError;
	var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF; // 2 ** 53 - 1 == 9007199254740991

	var doesNotExceedSafeInteger = function (it) {
	  if (it > MAX_SAFE_INTEGER) throw $TypeError$d('Maximum allowed index exceeded');
	  return it;
	};

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

	var FORCED = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT;

	// `Array.prototype.concat` method
	// https://tc39.es/ecma262/#sec-array.prototype.concat
	// with adding support of @@isConcatSpreadable and @@species
	_export({ target: 'Array', proto: true, arity: 1, forced: FORCED }, {
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

	var trim = stringTrim.trim;


	var $parseInt = global_1.parseInt;
	var Symbol$2 = global_1.Symbol;
	var ITERATOR$3 = Symbol$2 && Symbol$2.iterator;
	var hex = /^[+-]?0x/i;
	var exec$1 = functionUncurryThis(hex.exec);
	var FORCED$1 = $parseInt(whitespaces + '08') !== 8 || $parseInt(whitespaces + '0x16') !== 22
	  // MS Edge 18- broken with boxed symbols
	  || (ITERATOR$3 && !fails(function () { $parseInt(Object(ITERATOR$3)); }));

	// `parseInt` method
	// https://tc39.es/ecma262/#sec-parseint-string-radix
	var numberParseInt = FORCED$1 ? function parseInt(string, radix) {
	  var S = trim(toString_1(string));
	  return $parseInt(S, (radix >>> 0) || (exec$1(hex, S) ? 16 : 10));
	} : $parseInt;

	// `parseInt` method
	// https://tc39.es/ecma262/#sec-parseint-string-radix
	_export({ global: true, forced: parseInt != numberParseInt }, {
	  parseInt: numberParseInt
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

	var nativeJoin = functionUncurryThis([].join);

	var ES3_STRINGS = indexedObject != Object;
	var STRICT_METHOD$1 = arrayMethodIsStrict('join', ',');

	// `Array.prototype.join` method
	// https://tc39.es/ecma262/#sec-array.prototype.join
	_export({ target: 'Array', proto: true, forced: ES3_STRINGS || !STRICT_METHOD$1 }, {
	  join: function join(separator) {
	    return nativeJoin(toIndexedObject(this), separator === undefined ? ',' : separator);
	  }
	});

	var Widget = core_mjs.mvc.View.extend({
	  className: 'widget',
	  /** @type {Array.<string>} List of mandatory references, widget cannot be created if any of the reference from list
	   * is not defined in options */
	  references: [],
	  constructor: function constructor(options, refs) {
	    this.availableReferences = refs || {};
	    core_mjs.mvc.View.prototype.constructor.call(this, options);
	  },
	  /**
	   * @private
	   * Apply attributes data onto widget elements.
	   * @param {Object.<string, Object>} attrs
	   * @returns {jQuery}
	   */
	  updateAttrs: function updateAttrs(attrs) {
	    core_mjs.util.setAttributesBySelector(this.$el, attrs);
	  },
	  /**
	   * @protected
	   * Override in specific widget.
	   */
	  bindEvents: function bindEvents() {},
	  /**
	   * @private
	   */
	  validateReferences: function validateReferences() {
	    var refs = this.references || [];
	    var ret = [];
	    refs.forEach(function (ref) {
	      if (this.availableReferences[ref] === undefined) {
	        ret.push(ref);
	      }
	    }, this);
	    return ret;
	  },
	  /**
	   * @protected
	   * @param {string} name
	   * @returns {*}
	   */
	  getReference: function getReference(name) {
	    return this.availableReferences[name];
	  },
	  /**
	   * @protected
	   * @returns {Array.<*>}
	   */
	  getReferences: function getReferences() {
	    return this.availableReferences;
	  },
	  enable: function enable() {},
	  disable: function disable() {},
	  isDisabled: function isDisabled() {
	    return false;
	  }
	}, {
	  create: function create(opt, refs) {
	    var widgets = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
	    var type = core_mjs.util.camelCase(core_mjs.util.isString(opt) ? opt : opt.type);
	    if (!core_mjs.util.isFunction(widgets[type])) {
	      throw new Error('Widget: unable to find widget: "' + type + '"');
	    }
	    var widget = new widgets[type](opt, refs);
	    var invalidRefs = widget.validateReferences(refs);
	    if (invalidRefs.length > 0) {
	      throw new Error('Widget: "' + type + '" missing dependency: ' + invalidRefs.join(', '));
	    }
	    widget.render();
	    widget.updateAttrs(opt.attrs);
	    widget.bindEvents();
	    widget.$el.attr('data-type', type);
	    if (opt.name) {
	      widget.$el.attr('data-name', opt.name);
	    }
	    return widget;
	  }
	});

	var $findIndex = arrayIteration.findIndex;


	var FIND_INDEX = 'findIndex';
	var SKIPS_HOLES$1 = true;

	// Shouldn't skip holes
	if (FIND_INDEX in []) Array(1)[FIND_INDEX](function () { SKIPS_HOLES$1 = false; });

	// `Array.prototype.findIndex` method
	// https://tc39.es/ecma262/#sec-array.prototype.findindex
	_export({ target: 'Array', proto: true, forced: SKIPS_HOLES$1 }, {
	  findIndex: function findIndex(callbackfn /* , that = undefined */) {
	    return $findIndex(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
	addToUnscopables(FIND_INDEX);

	var SelectBox = core_mjs.mvc.View.extend({
	  className: 'select-box',
	  events: {
	    'click .select-box-selection': 'onToggle'
	  },
	  options: {
	    options: [],
	    // Example: `{ content: '<b>foo</b><br/><small>bar</small>', value: 'foo', selected: true }`
	    width: undefined,
	    // Set the width of the select box in JS. If `undefined`, it is assumed the width is set in CSS.
	    openPolicy: 'auto',
	    // Determines where the options panel will be displayed.
	    target: null,
	    keyboardNavigation: true,
	    selected: undefined,
	    // selected value can either be defined directly in the options array or here as an index to it.
	    selectBoxOptionsClass: undefined,
	    disabled: false
	  },
	  init: function init() {
	    this.options.target = this.options.target || document.body;
	    core_mjs.util.bindAll(this, 'onOutsideClick', 'onOptionSelect');
	    $(document).on('click.selectBox', this.onOutsideClick);
	    this.$el.data('view', this);
	    if (this.options.selected === undefined) {
	      // If there is no selection at the beginning, we assume it is the first
	      // option in the options array. This behaviour copies the behaviour
	      // of the native `<select>` HTML element.
	      this.selection = core_mjs.util.toArray(this.options.options).find(function (item) {
	        return item.selected === true;
	      }) || this.options.options[0];
	    } else {
	      this.selection = this.options.options[this.options.selected];
	    }
	  },
	  render: function render() {
	    this.$el.empty();
	    this.$selection = null;
	    this.renderSelection(this.selection);
	    if (this.options.width) {
	      this.$el.css('width', this.options.width);
	    }
	    if (this.options.disabled) {
	      this.disable();
	    }
	    this.$el.append(this.$options);
	    return this;
	  },
	  renderOptions: function renderOptions() {
	    this.removeOptions();
	    var options = this.options;
	    var config = {
	      selectBoxView: this,
	      parentClassName: core_mjs.util.result(this, 'className') || null,
	      extraClassName: core_mjs.util.result(options, 'selectBoxOptionsClass') || null,
	      options: options.options
	    };
	    if (options.width) {
	      config.width = options.width;
	    }
	    if (options.theme) {
	      config.theme = options.theme;
	    }
	    var optionsView = this.optionsView = new this.constructor.OptionsView(config);
	    optionsView.render();
	    this.listenTo(optionsView, 'option:select', this.onOptionSelect);
	    this.listenTo(optionsView, 'option:hover', this.onOptionHover);
	    this.listenTo(optionsView, 'options:mouseout', this.onOptionsMouseOut);
	    this.$options = optionsView.$el;
	    this.$optionsArrow = optionsView.$arrow;
	    this.$target = $(options.target);
	  },
	  onOptionHover: function onOptionHover(option, idx) {
	    this.trigger('option:hover', option, idx);
	  },
	  onOptionsMouseOut: function onOptionsMouseOut(evt) {
	    this.trigger('options:mouseout', evt);
	  },
	  onOptionSelect: function onOptionSelect(idx, opt) {
	    this.select(idx, opt);
	  },
	  removeOptions: function removeOptions() {
	    if (this.optionsView) {
	      this.stopListening(this.optionsView);
	      this.optionsView.remove();
	      this.optionsView = null;
	    }
	  },
	  renderSelection: function renderSelection(option) {
	    if (!this.$selection) {
	      this.$selection = $('<div/>', {
	        'class': 'select-box-selection'
	      });
	      this.$el.append(this.$selection);
	    }
	    this.$selection.empty();
	    if (option) {
	      var $option = this.constructor.OptionsView.prototype.renderOptionContent.call(undefined, option);
	      this.$selection.append($option);
	    } else if (this.options.placeholder) {
	      var $placeholder = $('<div/>', {
	        'class': 'select-box-placeholder',
	        html: this.options.placeholder
	      });
	      this.$selection.append($placeholder);
	    }
	  },
	  onToggle: function onToggle(evt) {
	    this.toggle();
	  },
	  onOutsideClick: function onOutsideClick(evt) {
	    // Check the clicked element is really outside our select box.
	    if (!this.el.contains(evt.target) && this.$el.hasClass('opened')) {
	      this.close();
	    }
	  },
	  getSelection: function getSelection() {
	    return this.selection;
	  },
	  getSelectionValue: function getSelectionValue(selection) {
	    selection = selection || this.selection;
	    return selection && (selection.value === undefined ? selection.content : selection.value);
	  },
	  getSelectionIndex: function getSelectionIndex() {
	    return core_mjs.util.toArray(this.options.options).findIndex(function (item) {
	      return item === this.selection;
	    }.bind(this));
	  },
	  select: function select(idx) {
	    var opt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	    this.selection = this.options.options[idx];
	    this.renderSelection(this.selection);
	    this.trigger('option:select', this.selection, idx, opt);
	    this.close();
	  },
	  selectByValue: function selectByValue(value, opt) {
	    var options = this.options.options || [];
	    for (var i = 0; i < options.length; i++) {
	      var option = options[i];
	      if (option.value === undefined && option.content === value) {
	        return this.select(i, opt);
	      } else if (option.value !== undefined && core_mjs.util.isEqual(option.value, value)) {
	        return this.select(i, opt);
	      }
	    }
	  },
	  isOpen: function isOpen() {
	    return this.$el.hasClass('opened');
	  },
	  toggle: function toggle() {
	    if (this.isOpen()) {
	      this.close();
	    } else {
	      this.open();
	    }
	  },
	  position: function position() {
	    var $selection = this.$('.select-box-selection');
	    var selectionHeight = $selection.outerHeight();
	    var selectionOffset = $selection.offset();
	    var selectionLeft = selectionOffset.left;
	    var selectionTop = selectionOffset.top;
	    var optionsHeight = this.$options.outerHeight();
	    var targetBBox = {
	      left: 0,
	      top: 0
	    };
	    if (this.options.target !== document.body) {
	      targetBBox = this.$target.offset();
	      targetBBox.width = this.$target.outerWidth();
	      targetBBox.height = this.$target.outerHeight();
	      targetBBox.left -= this.$target.scrollLeft();
	      targetBBox.top -= this.$target.scrollTop();
	    } else {
	      targetBBox.width = $(window).width();
	      targetBBox.height = $(window).height();
	    }
	    var left = selectionLeft;
	    var top = 'auto';
	    var openPolicy = this.options.openPolicy;

	    // For a selected open policy and no selection, we fallback to the
	    // 'auto' open policy. This is because we don't know the position of the
	    // selected option as there is no.
	    if (openPolicy === 'selected' && !this.selection) {
	      openPolicy = 'auto';
	    }
	    switch (openPolicy) {
	      case 'above':
	        top = selectionTop - optionsHeight;
	        break;
	      case 'coverAbove':
	        top = selectionTop - optionsHeight + selectionHeight;
	        break;
	      case 'below':
	        top = selectionTop + selectionHeight;
	        break;
	      case 'coverBelow':
	        // default
	        top = selectionTop;
	        break;
	      case 'selected':
	        var selectedOptionPosition = this.$options.find('.selected').position();
	        top = selectionTop - selectedOptionPosition.top;
	        break;
	      default:
	        // 'auto'
	        // It's like coverBelow but it tries to find the best spot. If the
	        // select box does not fit to the screen (goes below the screen edge),
	        // display it as coverAbove.

	        var isOptionsOverBottomEdge = selectionTop - this.$target.scrollTop() + optionsHeight > targetBBox.top + targetBBox.height;
	        top = isOptionsOverBottomEdge ? selectionTop - optionsHeight + selectionHeight : selectionTop;
	        break;
	    }

	    // Position relative to target element
	    left -= targetBBox.left;
	    top -= targetBBox.top;
	    this.$options.css({
	      left: left,
	      top: top
	    });
	  },
	  open: function open() {
	    if (this.isDisabled()) return;
	    this.renderOptions();
	    this.$options.appendTo(this.options.target);
	    this.$options.addClass('rendered');
	    this.position();
	    this.$el.addClass('opened');
	    this.respectWindowBoundaries();
	    this.alignOptionsArrow();
	  },
	  respectWindowBoundaries: function respectWindowBoundaries() {
	    var overflow = this.calculateElOverflow(this.$options, this.$target);
	    var increment = {
	      left: 0,
	      top: 0
	    };
	    if (this.$options.outerWidth() <= this.$target.innerWidth()) {
	      // Only adjust for left/right overflow if options element fits within target element.

	      if (overflow.left && overflow.right) ; else if (overflow.left) {
	        increment.left = overflow.left;
	      } else if (overflow.right) {
	        increment.left = -overflow.right;
	      }
	    }
	    if (this.$options.outerHeight() <= this.$target.innerHeight()) {
	      // Only adjust for top/bottom overflow if options element fits within target element.

	      if (overflow.top && overflow.bottom) ; else if (overflow.top) {
	        increment.top = overflow.top;
	      } else if (overflow.bottom) {
	        increment.top = -overflow.bottom;
	      }
	    }
	    this.$options.css({
	      left: '+=' + increment.left,
	      top: '+=' + increment.top
	    });
	  },
	  alignOptionsArrow: function alignOptionsArrow() {
	    var elBBox = this.$el[0].getBoundingClientRect();
	    var optionsBBox = this.$options[0].getBoundingClientRect();
	    var newLeft = elBBox.left + elBBox.width / 2;
	    newLeft -= optionsBBox.left;
	    newLeft -= this.$optionsArrow.outerWidth() / 2;
	    this.$optionsArrow.css({
	      left: newLeft
	    });
	  },
	  close: function close() {
	    this.removeOptions();
	    this.$el.removeClass('opened');
	    this.trigger('close');
	  },
	  onRemove: function onRemove() {
	    this.removeOptions();
	    $(document).off('.selectBox', this.onOutsideClick);
	  },
	  isDisabled: function isDisabled() {
	    return this.$el.hasClass('disabled');
	  },
	  enable: function enable() {
	    this.$el.removeClass('disabled');
	  },
	  disable: function disable() {
	    this.close();
	    this.$el.addClass('disabled');
	  },
	  onSetTheme: function onSetTheme(oldTheme, newTheme) {
	    if (this.$options) {
	      if (oldTheme) {
	        this.$options.removeClass(this.themeClassNamePrefix + oldTheme);
	      }
	      this.$options.addClass(this.themeClassNamePrefix + newTheme);
	    }
	  },
	  /*
	      Calculate the number of pixels an element is overflowing the target container.
	  */
	  calculateElOverflow: function calculateElOverflow(el, target) {
	    if (!target) {
	      target = window;
	    }
	    if (el instanceof $) {
	      el = el[0];
	    }
	    if (target instanceof $) {
	      target = target[0];
	    }
	    var overflow = {};
	    var elBBox = el.getBoundingClientRect();
	    var targetBBox;
	    if (target === window) {
	      // Window doesn't have getBoundingClientRect method.

	      var windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	      var windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
	      targetBBox = {
	        width: windowWidth,
	        height: windowHeight,
	        left: 0,
	        top: 0,
	        right: windowWidth,
	        bottom: windowHeight
	      };
	    } else {
	      targetBBox = target.getBoundingClientRect();
	    }
	    ['left', 'top'].forEach(function (side) {
	      overflow[side] = Math.min(0, elBBox[side] - targetBBox[side]);
	    });
	    ['right', 'bottom'].forEach(function (side) {
	      overflow[side] = Math.min(0, targetBBox[side] - elBBox[side]);
	    });
	    core_mjs.util.forIn(overflow, function (value, key) {
	      overflow[key] = Math.abs(Math.round(value));
	    });
	    return overflow;
	  }
	}, {
	  // Statics

	  OptionsView: core_mjs.mvc.View.extend({
	    events: {
	      'mouseover .select-box-option': 'onOptionHover',
	      'click .select-box-option': 'onOptionClick'
	    },
	    className: function className() {
	      var classNames = ['select-box-options'];
	      var parentClassName = this.options.parentClassName;
	      if (parentClassName) {
	        classNames.push(parentClassName);
	      }
	      return classNames.join(' ');
	    },
	    init: function init() {
	      core_mjs.util.bindAll(this, 'onMouseout', 'onKeydown');
	      $(document).on({
	        'keydown.selectBoxOptions': this.onKeydown,
	        'mouseleave.selectBoxOptions mouseout.selectBoxOptions': this.onMouseout
	      });
	    },
	    render: function render() {
	      var extraClassName = this.options.extraClassName;
	      if (extraClassName) {
	        this.$el.addClass(extraClassName);
	      }
	      if (this.options.width) {
	        this.$el.css('width', this.options.width);
	      }
	      core_mjs.util.toArray(this.options.options).forEach(function (option, idx) {
	        var $option = this.renderOption(option, idx);
	        if (this.options.selectBoxView.selection === option) {
	          $option.addClass('selected hover');
	        }
	        this.$el.append($option);
	      }, this);
	      this.$arrow = $('<div/>').addClass('select-box-options-arrow').appendTo(this.$el);
	      return this;
	    },
	    renderOption: function renderOption(option, idx) {
	      var $option = this.renderOptionContent(option);
	      $option.addClass('select-box-option');
	      $option.data('index', idx);
	      return $option;
	    },
	    renderOptionContent: function renderOptionContent(option) {
	      var $option = $('<div/>', {
	        'class': 'select-box-option-content',
	        html: option.content
	      });
	      if (option.icon) {
	        $option.prepend($('<img/>', {
	          'class': 'select-box-option-icon',
	          src: option.icon
	        }));
	      }
	      return $option;
	    },
	    select: function select(idx) {
	      var opt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	      this.trigger('option:select', idx, opt);
	    },
	    hover: function hover(idx) {
	      var option = this.options.options[idx];
	      this.markOptionHover(idx);
	      this.trigger('option:hover', option, idx);
	    },
	    onOptionClick: function onOptionClick(evt) {
	      var idx = this.getOptionIndex(evt.target);
	      this.select(idx, {
	        ui: true
	      });
	    },
	    onOptionHover: function onOptionHover(evt) {
	      var idx = this.getOptionIndex(evt.target);
	      this.hover(idx);
	    },
	    onMouseout: function onMouseout(evt) {
	      this.trigger('options:mouseout', evt);
	    },
	    onKeydown: function onKeydown(evt) {
	      var selectBoxView = this.options.selectBoxView;
	      if (!selectBoxView.options.keyboardNavigation) return;
	      if (!selectBoxView.isOpen()) return;
	      var dir;
	      switch (evt.which) {
	        case 39: // right
	        case 40:
	          // down
	          dir = 1;
	          break;
	        case 38: // up
	        case 37:
	          // left
	          dir = -1;
	          break;
	        case 13:
	          // enter
	          var hoverIndex = this.getOptionHoverIndex();
	          // `hoverIndex === -1` means no option has been hovered yet.
	          if (hoverIndex >= 0) {
	            this.select(hoverIndex);
	          }
	          return;
	        case 27:
	          // esc
	          return selectBoxView.close();
	        default:
	          return;
	        // noop; Unsupported key.
	      }

	      // Prevent page scrolling.
	      evt.preventDefault();
	      var idx = this.getOptionHoverIndex();
	      var nextIdx = idx + dir;
	      var options = this.options.options;

	      // Normalize and cycle if necessary.
	      if (nextIdx < 0) {
	        nextIdx = options.length - 1;
	      }
	      if (nextIdx >= options.length) {
	        nextIdx = 0;
	      }
	      this.hover(nextIdx);
	    },
	    onRemove: function onRemove() {
	      $(document).off('.selectBoxOptions');
	    },
	    markOptionHover: function markOptionHover(idx) {
	      this.$el.find('.hover').removeClass('hover');
	      $(this.$el.find('.select-box-option')[idx]).addClass('hover');
	    },
	    getOptionHoverIndex: function getOptionHoverIndex() {
	      return this.$el.find('.select-box-option.hover').index();
	    },
	    getOptionIndex: function getOptionIndex(el) {
	      return $(el).closest('.select-box-option').data('index');
	    }
	  })
	});

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

	// `Array.isArray` method
	// https://tc39.es/ecma262/#sec-array.isarray
	_export({ target: 'Array', stat: true }, {
	  isArray: isArray
	});

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

	var SelectButtonGroup = core_mjs.mvc.View.extend({
	  className: 'select-button-group',
	  events: {
	    'click .select-button-group-button': 'onSelect',
	    'mouseover .select-button-group-button': 'onOptionHover',
	    'mouseleave': 'onMouseOut',
	    'mousedown .select-button-group-button': 'pointerdown',
	    'touchstart .select-button-group-button': 'pointerdown',
	    'mouseup .select-button-group-button': 'pointerup',
	    'touchend .select-button-group-button': 'pointerup'
	  },
	  options: {
	    options: [],
	    // the actual buttons
	    disabled: false,
	    // Is the user allowed to interact with the options?
	    multi: false,
	    // Is multiple selection allowed?
	    selected: undefined,
	    // (multi === true): an array of indices of selected options; (multi === false): index of selected option; (selected === undefined): look at each option's `selected` property)
	    singleDeselect: false,
	    // Is it allowed to deselect in single-choice groups?
	    noSelectionValue: undefined,
	    // If there is no selection, what value should be reported by `getSelectionValue()`?
	    width: undefined,
	    // width of the whole SelectButtonGroup
	    buttonWidth: undefined,
	    buttonHeight: undefined,
	    iconWidth: undefined,
	    iconHeight: undefined
	  },
	  init: function init() {
	    core_mjs.util.bindAll(this, 'onSelect', 'pointerup');
	    this.$el.data('view', this);
	    var optionsItems = this.options.options;
	    var multi = this.options.multi;
	    var selected = this.options.selected;
	    if (selected === undefined) {
	      var selectedOptions = core_mjs.util.toArray(optionsItems).filter(function (item) {
	        return item && item.selected === true;
	      });
	      if (multi) {
	        this.selection = selectedOptions;
	      } else {
	        this.selection = selectedOptions[0]; // single-choice select button group may only have one selection
	      }
	    } else {
	      // something was provided to `selected`
	      if (multi) {
	        this.selection = !Array.isArray(selected) ? [optionsItems[selected]] : optionsItems.filter(function (option, idx) {
	          return selected.includes(idx);
	        });
	      } else {
	        this.selection = optionsItems[selected];
	      }
	    }
	  },
	  render: function render() {
	    this.renderOptions(this.selection);
	    if (this.options.width) {
	      this.$el.css('width', this.options.width);
	    }
	    if (this.options.disabled) {
	      this.disable();
	    }
	    this.$el.append(this.$options);
	    return this;
	  },
	  renderOptions: function renderOptions() {
	    this.removeOptions();
	    core_mjs.util.toArray(this.options.options).forEach(function (option, idx) {
	      var isSelected = this.options.multi ? this.selection.includes(option) : this.selection === option;
	      var $option = this.renderOption(option, idx, isSelected);
	      this.$el.append($option);
	      if (isSelected) {
	        $option.addClass('selected');
	      }
	    }, this);
	  },
	  removeOptions: function removeOptions() {
	    this.$el.empty();
	  },
	  renderOption: function renderOption(option, idx, isSelected) {
	    var $option = this.renderOptionContent(option, isSelected);
	    $option.data('index', idx);
	    var buttonWidth = option.buttonWidth || this.options.buttonWidth;
	    if (buttonWidth) {
	      $option.css('width', buttonWidth);
	    }
	    var buttonHeight = option.buttonHeight || this.options.buttonHeight;
	    if (buttonHeight) {
	      $option.css('height', buttonHeight);
	    }
	    return $option;
	  },
	  renderOptionContent: function renderOptionContent(option, isSelected) {
	    var $option = $('<div/>', {
	      'class': 'select-button-group-button',
	      html: option.content
	    });
	    if (option.icon || isSelected && option.iconSelected) {
	      var $icon = $('<img/>', {
	        'class': 'select-button-group-button-icon',
	        src: isSelected && option.iconSelected ? option.iconSelected : option.icon
	      });
	      var iconWidth = option.iconWidth || this.options.iconWidth;
	      if (iconWidth) {
	        $icon.css('width', iconWidth);
	      }
	      var iconHeight = option.iconHeight || this.options.iconHeight;
	      if (iconHeight) {
	        $icon.css('height', iconHeight);
	      }
	      $option.prepend($icon);
	    }
	    // `option.attrs` allows for setting arbitrary attributes on the generated HTML.
	    // This object is of the form: `<selector> : { <attributeName> : <attributeValue>, ... }`
	    core_mjs.util.setAttributesBySelector($option, option.attrs);
	    return $option;
	  },
	  getOptionIndex: function getOptionIndex(el) {
	    return $(el).closest('.select-button-group-button').data('index');
	  },
	  onSelect: function onSelect(evt) {
	    if (this.isDisabled()) return;
	    var idx = this.getOptionIndex(evt.target);
	    this.select(idx, {
	      ui: true
	    });
	  },
	  onOptionHover: function onOptionHover(evt) {
	    if (this.isDisabled()) return;
	    var idx = this.getOptionIndex(evt.target);
	    this.trigger('option:hover', this.options.options[idx], idx);
	  },
	  onMouseOut: function onMouseOut(evt) {
	    if (this.isDisabled()) return;
	    this.trigger('mouseout', evt);
	  },
	  getSelection: function getSelection() {
	    return this.selection;
	  },
	  // returns the value(s) associated with selected option(s)
	  // (multi === false): returns one value or `this.options.noSelectionValue` or `undefined`
	  // (multi === true): returns an array of values or `this.options.noSelectionValue` or `[]`
	  getSelectionValue: function getSelectionValue(selection) {
	    selection = selection || this.selection;
	    var noSelectionValue = this.options.noSelectionValue;
	    var multi = this.options.multi;
	    if (multi) {
	      // multiple-choice select button group
	      var selectionArray = core_mjs.util.toArray(selection); // (`undefined` becomes `[]`)
	      if (selectionArray.length === 0) {
	        return noSelectionValue !== undefined ? noSelectionValue : [];
	      }
	      return selectionArray.map(function (option) {
	        var optionValue = option.value;
	        return optionValue !== undefined ? optionValue : option.content;
	      });
	    }

	    // else: single-choice select button group
	    if (!selection) {
	      return noSelectionValue !== undefined ? noSelectionValue : undefined;
	    }
	    var selectionValue = selection.value;
	    return selectionValue !== undefined ? selectionValue : selection.content;
	  },
	  // selects and deselects appropriate options based on the `index` of clicked option,
	  // then triggers the `option:select` event
	  // (information about what kind of selection this was and what options were selected/deselected is stored in `opt`)
	  select: function select(index, opt) {
	    // the clicked option:
	    var $option = $(this.$('.select-button-group-button')[index]);
	    var option = this.options.options[index];

	    // hoisting here because selecting/deselecting information is returned in `opt`:
	    var deselectedIndex = null;
	    var deselectedOption = null;
	    var selectedIndex = null;
	    var selectedOption = null;

	    // hoisting here because variable is used in both conditional branches:
	    var isSelected;
	    if (this.options.multi) {
	      // multiple-choice select button group
	      // do not move these two lines out from the conditional branch!
	      // (single-choice selectButtonGroups need to do extra logic before these lines)
	      $option.toggleClass('selected');
	      isSelected = $option.hasClass('selected');
	      if (isSelected) {
	        // the user clicked on an option that was not selected before
	        selectedIndex = index;
	        selectedOption = option;
	        // add the option to `selection`
	        if (this.selection.indexOf(option) === -1) {
	          this.selection.push(option);
	        }
	        if (option.iconSelected) {
	          // if a special selected icon is defined for the option
	          // switch option to selected icon
	          $option.find('.select-button-group-button-icon').attr('src', option.iconSelected);
	        }
	      } else {
	        // the user clicked on one of the previously-selected options
	        deselectedIndex = index;
	        deselectedOption = option;
	        // remove the option from `selection`
	        this.selection = core_mjs.util.without(this.selection, option);
	        if (option.iconSelected) {
	          // if a special selected icon is defined for the option (and therefore is in use now)
	          // switch option to normal icon
	          $option.find('.select-button-group-button-icon').attr('src', option.icon);
	        }
	      }
	    } else {
	      // single-choice select button group
	      var $prevOption = this.$('.selected');
	      var prevIndex = $prevOption.index();
	      var prevOption = this.options.options[prevIndex];

	      // do not move these two lines out from the conditional branch!
	      // (we need to execute these lines AFTER determining `$prevOption` and `prevOption`)
	      $option.toggleClass('selected');
	      isSelected = $option.hasClass('selected');
	      if (isSelected) {
	        // the user clicked on an option that was not selected before
	        if (prevOption) {
	          // switching to another option
	          deselectedIndex = prevIndex;
	          deselectedOption = prevOption;
	          // deselect previously selected option
	          $prevOption.removeClass('selected');
	          if (prevOption.iconSelected) {
	            // if a special selected icon is defined for the previously selected option
	            // switch the previously selected option to normal icon
	            $prevOption.find('.select-button-group-button-icon').attr('src', prevOption.icon);
	          }
	        }
	        selectedIndex = index;
	        selectedOption = option;
	        // select the clicked option
	        this.selection = option;
	        if (option.iconSelected) {
	          // if a special selected icon is defined for the selected option
	          // switch the selected option to selected icon
	          $option.find('.select-button-group-button-icon').attr('src', option.iconSelected);
	        }
	      } else {
	        // the user clicked on the previously selected option
	        if (this.options.singleDeselect) {
	          // it is allowed to deselect in this single-choice button group
	          deselectedIndex = index;
	          deselectedOption = option;
	          // deselect the option
	          this.selection = undefined;
	          if (option.iconSelected) {
	            // if a special selected icon is defined for the option (and therefore in use now)
	            // switch option to normal icon
	            $option.find('.select-button-group-button-icon').attr('src', option.icon);
	          }
	        } else {
	          // it is not allowed to deselect in this single-choice button group
	          // keep current option selected
	          $option.addClass('selected');
	          //return; // TODO: (breaking change) we should not trigger `option:select` event in this case
	        }
	      }
	    }

	    // sneak extra information about selecting/deselecting into `opt`
	    var localOpt = core_mjs.util.assign({}, opt);
	    localOpt.deselectedIndex = deselectedIndex;
	    localOpt.deselectedOption = deselectedOption;
	    localOpt.selectedIndex = selectedIndex;
	    localOpt.selectedOption = selectedOption;
	    // note: it is possible that `deselectedOption` and/or `selectedOption` are `null`
	    // (also `deselectedIndex` and/or `selectedIndex`)
	    // this information is separate from `this.selection` (what options are currently selected)
	    // to get the after-event status of `selection`, use the first argument of the callback function
	    this.trigger('option:select', this.selection, index, localOpt);
	  },
	  selectByValue: function selectByValue(value, opt) {
	    if (!Array.isArray(value)) {
	      value = [value];
	    }
	    var options = this.options.options || [];
	    for (var i = 0; i < options.length; i++) {
	      var option = options[i];
	      if (option.value === undefined && value.includes(option.content)) {
	        this.select(i, opt);
	      } else if (option.value !== undefined) {
	        var containsOption = value.find(function (val) {
	          return core_mjs.util.isEqual(val, option.value);
	        });
	        if (containsOption) {
	          this.select(i, opt);
	        }
	      }
	    }
	  },
	  deselect: function deselect() {
	    this.$('.selected').removeClass('selected');
	    if (this.options.multi) {
	      this.selection = [];
	    } else {
	      this.selection = undefined;
	    }
	  },
	  isDisabled: function isDisabled() {
	    return this.$el.hasClass('disabled');
	  },
	  enable: function enable() {
	    this.$el.removeClass('disabled');
	  },
	  disable: function disable() {
	    this.$el.addClass('disabled');
	  },
	  pointerdown: function pointerdown(evt) {
	    var index = this.getOptionIndex(evt.target);
	    var $option = $(this.$('.select-button-group-button')[index]);
	    $option.addClass('is-in-action');
	    $(document).on('mouseup.select-button-group touchend.select-button-group', this.pointerup);
	  },
	  pointerup: function pointerup() {
	    this.$('.is-in-action').removeClass('is-in-action');
	    $(document).off('mouseup.select-button-group touchend.select-button-group');
	  }
	});

	var checkbox = Widget.extend({
	  tagName: 'label',
	  events: {
	    'change .input': 'onChange',
	    'mousedown': 'pointerdown',
	    'touchstart': 'pointerdown',
	    'mouseup': 'pointerup',
	    'touchend': 'pointerup',
	    'click': 'pointerclick'
	  },
	  documentEvents: {
	    'mouseup': 'pointerup',
	    'touchend': 'pointerup'
	  },
	  init: function init() {
	    core_mjs.util.bindAll(this, 'pointerup');
	  },
	  render: function render() {
	    var opt = this.options;
	    var $label = $('<span/>').text(opt.label || '');
	    this.$input = $('<input/>', {
	      type: 'checkbox',
	      'class': 'input'
	    }).prop('checked', !!opt.value);
	    this.$span = $('<span/>');
	    this.$el.append([$label, this.$input, this.$span]);
	    return this;
	  },
	  onChange: function onChange(evt) {
	    this.trigger('change', !!evt.target.checked, evt);
	  },
	  pointerdown: function pointerdown(evt) {
	    evt = core_mjs.util.normalizeEvent(evt);
	    this.$el.addClass('is-in-action');
	    this.trigger('pointerdown', evt);
	    this.delegateDocumentEvents();
	  },
	  pointerclick: function pointerclick(evt) {
	    evt = core_mjs.util.normalizeEvent(evt);
	    this.trigger('pointerclick', evt);
	  },
	  pointerup: function pointerup(evt) {
	    evt = core_mjs.util.normalizeEvent(evt);
	    this.undelegateDocumentEvents();
	    this.trigger('pointerup', evt);
	    this.$el.removeClass('is-in-action');
	    if (evt.type === 'touchend') {
	      this.$input.trigger('click');
	      evt.preventDefault();
	    }
	  },
	  isDisabled: function isDisabled() {
	    return this.$input.prop('disabled');
	  },
	  enable: function enable() {
	    this.$el.removeClass('disabled');
	    this.$input.prop('disabled', false);
	  },
	  disable: function disable() {
	    this.$el.addClass('disabled');
	    this.$input.prop('disabled', true);
	  }
	});
	var toggle$1 = Widget.extend({
	  tagName: 'label',
	  events: {
	    'change input.toggle': 'onChange',
	    'click input.toggle': 'pointerclick',
	    'mousedown': 'pointerdown',
	    'touchstart': 'pointerdown',
	    'mouseup': 'pointerup',
	    'touchend': 'pointerup'
	  },
	  documentEvents: {
	    'mouseup': 'pointerup',
	    'touchend': 'pointerup'
	  },
	  init: function init() {
	    core_mjs.util.bindAll(this, 'pointerup');
	  },
	  render: function render() {
	    var opt = this.options;
	    var $label = $('<span/>').text(opt.label || '');
	    var $button = $('<span><i/></span>');
	    this.$input = $('<input/>', {
	      type: 'checkbox',
	      "class": 'toggle'
	    }).prop('checked', !!opt.value);
	    var $wrapper = $('<div/>').addClass(opt.type);
	    this.$el.append([$label, $wrapper.append(this.$input, $button)]);
	    return this;
	  },
	  onChange: function onChange(evt) {
	    this.trigger('change', !!evt.target.checked, evt);
	  },
	  pointerclick: function pointerclick(evt) {
	    evt = core_mjs.util.normalizeEvent(evt);
	    this.trigger('pointerclick', evt);
	  },
	  pointerdown: function pointerdown(evt) {
	    evt = core_mjs.util.normalizeEvent(evt);
	    this.$el.addClass('is-in-action');
	    this.trigger('pointerdown', evt);
	    this.delegateDocumentEvents();
	  },
	  pointerup: function pointerup(evt) {
	    evt = core_mjs.util.normalizeEvent(evt);
	    this.undelegateDocumentEvents();
	    this.$el.removeClass('is-in-action');
	    this.trigger('pointerup', evt);
	    if (evt.type === 'touchend') {
	      this.$input.trigger('click');
	      evt.preventDefault();
	    }
	  },
	  isDisabled: function isDisabled() {
	    return this.$input.prop('disabled');
	  },
	  enable: function enable() {
	    this.$el.removeClass('disabled');
	    this.$input.prop('disabled', false);
	  },
	  disable: function disable() {
	    this.$el.addClass('disabled');
	    this.$input.prop('disabled', true);
	  }
	});
	var separator = Widget.extend({
	  render: function render() {
	    if (this.options.width) {
	      this.$el.css({
	        width: this.options.width
	      });
	    }
	    return this;
	  }
	});
	var label = Widget.extend({
	  tagName: 'label',
	  render: function render() {
	    this.$el.text(this.options.text);
	    return this;
	  }
	});
	var range = Widget.extend({
	  events: {
	    'change .input': 'onChange',
	    'input .input': 'onChange'
	  },
	  render: function render() {
	    var opt = this.options;
	    var $units;
	    this.$output = $('<output/>').text(opt.value);
	    $units = $('<span/>').addClass('units').text(opt.unit);
	    this.$input = $('<input/>', {
	      type: 'range',
	      name: opt.type,
	      min: opt.min,
	      max: opt.max,
	      step: opt.step,
	      'class': 'input'
	    }).val(opt.value);
	    this.$el.append([this.$input, this.$output, $units]);
	    return this;
	  },
	  onChange: function onChange(evt) {
	    var value = this.getValue();
	    if (value === this.currentValue) {
	      return;
	    }
	    this.currentValue = value;
	    this.$output.text(value);
	    this.trigger('change', value, evt);
	  },
	  getValue: function getValue() {
	    return parseInt(this.$input.val(), 10);
	  },
	  setValue: function setValue(value) {
	    var opt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	    this.$input.val(value);
	    if (opt.silent) {
	      value = this.getValue();
	      this.currentValue = value;
	      this.$output.text(value);
	    } else {
	      this.$input.trigger('change');
	    }
	  },
	  isDisabled: function isDisabled() {
	    return this.$input.prop('disabled');
	  },
	  enable: function enable() {
	    this.$input.prop('disabled', false);
	  },
	  disable: function disable() {
	    this.$input.prop('disabled', true);
	  }
	});
	var selectBox = Widget.extend({
	  render: function render() {
	    var selectBoxOptions = core_mjs.util.omit(this.options, 'type', 'group', 'index');
	    this.selectBox = new SelectBox(selectBoxOptions);
	    this.selectBox.render().$el.appendTo(this.el);
	    return this;
	  },
	  bindEvents: function bindEvents() {
	    this.selectBox.on('all', this.trigger, this);
	  },
	  isDisabled: function isDisabled() {
	    return this.selectBox.isDisabled();
	  },
	  enable: function enable() {
	    this.selectBox.enable();
	  },
	  disable: function disable() {
	    this.selectBox.disable();
	  }
	});
	var button = Widget.extend({
	  events: {
	    'mousedown': 'pointerdown',
	    'mouseup': 'pointerup',
	    'touchend': 'pointerup',
	    'touchstart': 'pointerdown',
	    'click': 'pointerclick'
	  },
	  tagName: 'button',
	  render: function render() {
	    var opt = this.options;
	    this.$el.text(opt.text);
	    return this;
	  },
	  pointerclick: function pointerclick(evt) {
	    evt = core_mjs.util.normalizeEvent(evt);
	    this.trigger('pointerclick', evt);
	  },
	  pointerdown: function pointerdown(evt) {
	    evt = core_mjs.util.normalizeEvent(evt);
	    this.trigger('pointerdown', evt);
	  },
	  pointerup: function pointerup(evt) {
	    evt = core_mjs.util.normalizeEvent(evt);
	    this.trigger('pointerup', evt);
	    if (evt.type === 'touchend') {
	      this.$el.trigger('click');
	      evt.preventDefault();
	    }
	  },
	  isDisabled: function isDisabled() {
	    return this.$el.prop('disabled');
	  },
	  enable: function enable() {
	    this.$el.prop('disabled', false);
	  },
	  disable: function disable() {
	    this.$el.prop('disabled', true);
	  }
	});
	var inputText = Widget.extend({
	  events: {
	    'mousedown': 'pointerdown',
	    'touchstart': 'pointerdown',
	    'mouseup': 'pointerup',
	    'touchend': 'pointerup',
	    'click': 'pointerclick',
	    'focusin': 'pointerfocusin',
	    'focusout': 'pointerfocusout'
	  },
	  tagName: 'div',
	  render: function render() {
	    var opt = this.options;
	    this.$label = $('<label/>').text(opt.label);
	    this.$text = $('<input/>', {
	      type: 'text',
	      'class': 'input'
	    }).val(opt.value);
	    this.$input = $('<div/>').addClass('input-wrapper').append(this.$text);
	    this.$el.append([this.$label, this.$input]);
	    return this;
	  },
	  pointerclick: function pointerclick(evt) {
	    evt = core_mjs.util.normalizeEvent(evt);
	    this.trigger('pointerclick', evt);
	  },
	  pointerdown: function pointerdown(evt) {
	    evt = core_mjs.util.normalizeEvent(evt);
	    this.trigger('pointerdown', evt);
	    if (evt.type === 'touchstart') {
	      this.$text.trigger('focus');
	    }
	  },
	  pointerup: function pointerup(evt) {
	    evt = core_mjs.util.normalizeEvent(evt);
	    this.trigger('pointerup', evt);
	    if (evt.type === 'touchend') {
	      this.$text.trigger('click');
	      evt.preventDefault();
	    }
	  },
	  pointerfocusin: function pointerfocusin(evt) {
	    evt = core_mjs.util.normalizeEvent(evt);
	    this.$el.addClass('is-focused');
	    this.trigger('pointerfocusin', evt);
	  },
	  pointerfocusout: function pointerfocusout(evt) {
	    evt = core_mjs.util.normalizeEvent(evt);
	    this.$el.removeClass('is-focused');
	    this.trigger('pointerfocusout', evt);
	  },
	  isDisabled: function isDisabled() {
	    return this.$text.prop('disabled');
	  },
	  enable: function enable() {
	    this.$text.prop('disabled', false);
	  },
	  disable: function disable() {
	    this.$text.prop('disabled', true);
	  }
	});
	var inputNumber = Widget.extend({
	  events: {
	    'mousedown': 'pointerdown',
	    'touchstart': 'pointerdown',
	    'mouseup': 'pointerup',
	    'touchend': 'pointerup',
	    'click': 'pointerclick',
	    'focusin': 'pointerfocusin',
	    'focusout': 'pointerfocusout'
	  },
	  tagName: 'div',
	  render: function render() {
	    var opt = this.options;
	    this.$label = $('<label/>').text(opt.label);
	    this.$number = $('<input/>', {
	      type: 'number',
	      'class': 'number',
	      max: opt.max,
	      min: opt.min
	    }).val(opt.value);
	    this.$input = $('<div/>').addClass('input-wrapper').append(this.$number);
	    this.$el.append([this.$label, this.$input]);
	    return this;
	  },
	  pointerclick: function pointerclick(evt) {
	    evt = core_mjs.util.normalizeEvent(evt);
	    this.trigger('pointerclick', evt);
	  },
	  pointerdown: function pointerdown(evt) {
	    evt = core_mjs.util.normalizeEvent(evt);
	    this.trigger('pointerdown', evt);
	    if (evt.type === 'touchstart') {
	      this.$number.trigger('focus');
	    }
	  },
	  pointerup: function pointerup(evt) {
	    evt = core_mjs.util.normalizeEvent(evt);
	    this.trigger('pointerup', evt);
	    if (evt.type === 'touchend') {
	      this.$number.trigger('click');
	      evt.preventDefault();
	    }
	  },
	  pointerfocusin: function pointerfocusin(evt) {
	    evt = core_mjs.util.normalizeEvent(evt);
	    this.$el.addClass('is-focused');
	    this.trigger('pointerfocusin', evt);
	  },
	  pointerfocusout: function pointerfocusout(evt) {
	    evt = core_mjs.util.normalizeEvent(evt);
	    this.$el.removeClass('is-focused');
	    this.trigger('pointerfocusout', evt);
	  },
	  isDisabled: function isDisabled() {
	    return this.$number.prop('disabled');
	  },
	  enable: function enable() {
	    this.$number.prop('disabled', false);
	  },
	  disable: function disable() {
	    this.$number.prop('disabled', true);
	  }
	});
	var textarea = Widget.extend({
	  events: {
	    'mousedown': 'pointerdown',
	    'touchstart': 'pointerdown',
	    'mouseup': 'pointerup',
	    'touchend': 'pointerup',
	    'click': 'pointerclick',
	    'focusin': 'pointerfocusin',
	    'focusout': 'pointerfocusout'
	  },
	  tagName: 'div',
	  render: function render() {
	    var opt = this.options;
	    this.$label = $('<label/>').text(opt.label);
	    this.$textarea = $('<textarea/>', {
	      'class': 'textarea'
	    }).text(opt.value);
	    this.$input = $('<div/>').addClass('input-wrapper').append(this.$textarea);
	    this.$el.append([this.$label, this.$input]);
	    return this;
	  },
	  pointerclick: function pointerclick(evt) {
	    evt.preventDefault();
	    evt = core_mjs.util.normalizeEvent(evt);
	    this.trigger('pointerclick', evt);
	  },
	  pointerdown: function pointerdown(evt) {
	    evt = core_mjs.util.normalizeEvent(evt);
	    this.trigger('pointerdown', evt);
	    if (evt.type === 'touchstart') {
	      this.$textarea.focus();
	    }
	  },
	  pointerup: function pointerup(evt) {
	    evt = core_mjs.util.normalizeEvent(evt);
	    this.trigger('pointerup', evt);
	    if (evt.type === 'touchend') {
	      this.$textarea.trigger('click');
	      evt.preventDefault();
	    }
	  },
	  pointerfocusin: function pointerfocusin(evt) {
	    evt = core_mjs.util.normalizeEvent(evt);
	    this.$el.addClass('is-focused');
	    this.trigger('pointerfocusin', evt);
	  },
	  pointerfocusout: function pointerfocusout(evt) {
	    evt = core_mjs.util.normalizeEvent(evt);
	    this.$el.removeClass('is-focused');
	    this.trigger('pointerfocusout', evt);
	  },
	  isDisabled: function isDisabled() {
	    return this.$textarea.prop('disabled');
	  },
	  enable: function enable() {
	    this.$textarea.prop('disabled', false);
	  },
	  disable: function disable() {
	    this.$textarea.prop('disabled', true);
	  }
	});
	var selectButtonGroup = Widget.extend({
	  render: function render() {
	    var selectButtonGroupOptions = core_mjs.util.omit(this.options, 'type', 'group', 'index');
	    this.selectButtonGroup = new SelectButtonGroup(selectButtonGroupOptions);
	    this.selectButtonGroup.render().$el.appendTo(this.el);
	    return this;
	  },
	  bindEvents: function bindEvents() {
	    this.selectButtonGroup.on('all', this.trigger, this);
	  },
	  isDisabled: function isDisabled() {
	    return this.selectButtonGroup.isDisabled();
	  },
	  enable: function enable() {
	    this.selectButtonGroup.enable();
	  },
	  disable: function disable() {
	    this.selectButtonGroup.disable();
	  }
	});
	var zoomIn = button.extend({
	  references: ['paperScroller'],
	  options: {
	    min: 0.2,
	    max: 5,
	    step: 0.2
	  },
	  bindEvents: function bindEvents() {
	    var _this = this;
	    if (!this.options.autoToggle) return;
	    var _this$getReferences = this.getReferences(),
	      paperScroller = _this$getReferences.paperScroller;
	    this.updateAvailability(paperScroller);
	    this.listenTo(paperScroller.options.paper, 'scale', function () {
	      return _this.updateAvailability(paperScroller);
	    });
	  },
	  pointerdown: function pointerdown(evt) {
	    var opt = this.options;
	    this.getReferences().paperScroller.zoom(opt.step, {
	      max: opt.max,
	      grid: opt.step
	    });
	    button.prototype.pointerdown.call(this, evt);
	  },
	  updateAvailability: function updateAvailability(paperScroller) {
	    if (paperScroller.zoom() < this.options.max) {
	      this.enable();
	    } else {
	      this.disable();
	    }
	  }
	});
	var zoomOut = button.extend({
	  references: ['paperScroller'],
	  options: {
	    min: 0.2,
	    max: 5,
	    step: 0.2
	  },
	  bindEvents: function bindEvents() {
	    var _this2 = this;
	    if (!this.options.autoToggle) return;
	    var _this$getReferences2 = this.getReferences(),
	      paperScroller = _this$getReferences2.paperScroller;
	    this.updateAvailability(paperScroller);
	    this.listenTo(paperScroller.options.paper, 'scale', function () {
	      return _this2.updateAvailability(paperScroller);
	    });
	  },
	  pointerdown: function pointerdown(evt) {
	    var opt = this.options;
	    this.getReferences().paperScroller.zoom(-opt.step, {
	      min: opt.min,
	      grid: opt.step
	    });
	    button.prototype.pointerdown.call(this, evt);
	  },
	  updateAvailability: function updateAvailability(paperScroller) {
	    if (paperScroller.zoom() > this.options.min) {
	      this.enable();
	    } else {
	      this.disable();
	    }
	  }
	});
	var zoomToFit = button.extend({
	  references: ['paperScroller'],
	  options: {
	    min: 0.2,
	    max: 5,
	    step: 0.2,
	    useModelGeometry: false,
	    padding: 20
	  },
	  pointerdown: function pointerdown(evt) {
	    var options = this.options;
	    this.getReferences().paperScroller.zoomToFit({
	      padding: options.padding,
	      scaleGrid: options.step,
	      minScale: options.min,
	      maxScale: options.max,
	      useModelGeometry: options.useModelGeometry
	    });
	    button.prototype.pointerdown.call(this, evt);
	  }
	});
	var zoomSlider = range.extend({
	  references: ['paperScroller'],
	  options: {
	    min: 20,
	    max: 500,
	    step: 20,
	    value: 100,
	    unit: ' %'
	  },
	  bindEvents: function bindEvents() {
	    var _this3 = this;
	    var _this$getReferences3 = this.getReferences(),
	      paperScroller = _this$getReferences3.paperScroller;
	    this.on('change', function (value) {
	      paperScroller.zoom(value / 100, {
	        absolute: true,
	        grid: this.options.step / 100
	      });
	    }, this);
	    this.listenTo(paperScroller.options.paper, 'scale', function (value) {
	      _this3.setValue(Math.floor(value * 100), {
	        silent: true
	      });
	    });
	  }
	});
	var undo = button.extend({
	  references: ['commandManager'],
	  bindEvents: function bindEvents() {
	    var _this4 = this;
	    if (!this.options.autoToggle) return;
	    var _this$getReferences4 = this.getReferences(),
	      commandManager = _this$getReferences4.commandManager;
	    this.updateAvailability(commandManager);
	    this.listenTo(commandManager, 'stack', function () {
	      return _this4.updateAvailability(commandManager);
	    });
	  },
	  pointerclick: function pointerclick() {
	    this.getReferences().commandManager.undo();
	  },
	  updateAvailability: function updateAvailability(commandManager) {
	    if (commandManager.hasUndo()) {
	      this.enable();
	    } else {
	      this.disable();
	    }
	  }
	});
	var redo = button.extend({
	  references: ['commandManager'],
	  bindEvents: function bindEvents() {
	    var _this5 = this;
	    if (!this.options.autoToggle) return;
	    var _this$getReferences5 = this.getReferences(),
	      commandManager = _this$getReferences5.commandManager;
	    this.updateAvailability(commandManager);
	    this.listenTo(commandManager, 'stack', function () {
	      return _this5.updateAvailability(commandManager);
	    });
	  },
	  pointerclick: function pointerclick() {
	    this.getReferences().commandManager.redo();
	  },
	  updateAvailability: function updateAvailability(commandManager) {
	    if (commandManager.hasRedo()) {
	      this.enable();
	    } else {
	      this.disable();
	    }
	  }
	});
	var fullscreen = button.extend({
	  onRender: function onRender() {
	    var target = this.target = $(this.options.target)[0];
	    if (target && !$.contains(window.top.document, target)) {
	      // The fullscreen feature is available only if the target is not displayed within an iframe.
	      this.$el.hide();
	    }
	  },
	  pointerclick: function pointerclick() {
	    core_mjs.util.toggleFullScreen(this.target);
	  }
	});
	var colorPicker = Widget.extend({
	  events: {
	    'change .input ': 'change',
	    'input .input ': 'input'
	  },
	  render: function render() {
	    var opt = this.options;
	    var defaultColor = '#FFFFFF';
	    this.inputEl = document.createElement('input');
	    this.inputEl.classList.add('input');
	    this.inputEl.setAttribute('type', 'color');
	    if (opt.value) {
	      this.setValue(opt.value);
	    } else {
	      this.inputEl.value = defaultColor;
	    }
	    this.el.appendChild(this.inputEl);
	    return this;
	  },
	  _validateHexCode: function _validateHexCode(value) {
	    return /^#(?:[0-9a-fA-F]{6})$/.test(value);
	  },
	  change: function change(evt) {
	    evt = core_mjs.util.normalizeEvent(evt);
	    this.trigger('change', evt.target.value, evt);
	  },
	  input: function input(evt) {
	    evt = core_mjs.util.normalizeEvent(evt);
	    this.trigger('input', evt.target.value, evt);
	  },
	  disable: function disable() {
	    this.el.classList.add('disabled');
	    this.inputEl.disabled = true;
	  },
	  enable: function enable() {
	    this.el.classList.remove('disabled');
	    this.inputEl.disabled = false;
	  },
	  setValue: function setValue(value) {
	    var opt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	    if (!this._validateHexCode(value)) return;
	    this.inputEl.value = value;
	    if (!opt.silent) {
	      this.trigger('change');
	    }
	  }
	});

	var widgets = /*#__PURE__*/Object.freeze({
		__proto__: null,
		checkbox: checkbox,
		toggle: toggle$1,
		separator: separator,
		label: label,
		range: range,
		selectBox: selectBox,
		button: button,
		inputText: inputText,
		inputNumber: inputNumber,
		textarea: textarea,
		selectButtonGroup: selectButtonGroup,
		zoomIn: zoomIn,
		zoomOut: zoomOut,
		zoomToFit: zoomToFit,
		zoomSlider: zoomSlider,
		undo: undo,
		redo: redo,
		fullscreen: fullscreen,
		colorPicker: colorPicker
	});

	var Align = {
	  Left: 'left',
	  Right: 'right'
	};

	/**
	 * @typedef {{items: Array.<Object>, group: Object}} GroupedItems
	 */
	var Toolbar = core_mjs.mvc.View.extend({
	  options: {
	    /*
	     tools: [
	        {group: 'groupName'}
	     ],
	     groups: {
	        'name': {
	            index: number,
	            align: 'left' | 'right'
	        }
	      }
	     references: {}
	     */
	    autoToggle: false,
	    widgetNamespace: null
	  },
	  align: ['left', 'right'],
	  className: 'toolbar',
	  defaultGroup: 'default',
	  widgets: [],
	  groupViews: [],
	  init: function init() {
	    this.tools = core_mjs.util.toArray(this.options.tools);
	    this.groups = this.options.groups || {};
	  },
	  /**
	   * @public
	   * @param {string} name
	   * @returns {Array.<ui.Widget>}
	   */
	  getWidgetByName: function getWidgetByName(name) {
	    return this.widgets.find(function (item) {
	      return item.options.name === name;
	    });
	  },
	  /**
	   * @public
	   * @returns {Array.<ui.Widget>}
	   */
	  getWidgets: function getWidgets() {
	    return this.widgets;
	  },
	  /**
	   * @private
	   * @typedef {{items: Array.<Object>, group: Object}} GroupedItems
	   * @returns {Array.<[string, GroupedItems]>}
	   */
	  groupsWithItemsPairs: function groupsWithItemsPairs() {
	    var groupedItems = {};
	    this.tools.forEach(function (item) {
	      var group = item.group || this.defaultGroup;
	      groupedItems[group] = groupedItems[group] || {
	        items: [],
	        group: {}
	      };
	      groupedItems[group].items.push(item);
	      groupedItems[group].group = this.groups[group] || {};
	    }, this);
	    var keys = Object.keys(groupedItems);
	    var pairs = [];
	    for (var i = 0, n = keys.length; i < n; i++) {
	      var key = keys[i];
	      pairs.push([key, groupedItems[key]]);
	    }
	    var byIndex = core_mjs.util.sortBy(pairs, function (pair) {
	      return pair[1].group.index;
	    });
	    return core_mjs.util.sortBy(byIndex, function (pair) {
	      return pair[1].group.align || 'left';
	    });
	  },
	  /**
	   * @public
	   * @returns {ui.Toolbar}
	   */
	  render: function render() {
	    var sortedGroups = this.groupsWithItemsPairs();
	    var firstAlignRight = false;
	    sortedGroups.forEach(function (groupArray) {
	      var name = groupArray[0];
	      var grouped = groupArray[1];
	      var $group = this.renderGroup(name, grouped);
	      if (!firstAlignRight && grouped.group.align && grouped.group.align === 'right') {
	        firstAlignRight = true;
	        $group.addClass('group-first');
	      }
	      $group.appendTo(this.el);
	    }, this);
	    return this;
	  },
	  /**
	   * @private
	   * @param {string} name
	   * @param {GroupedItems} grouped
	   * @returns {jQuery}
	   */
	  renderGroup: function renderGroup(name, grouped) {
	    var _this$options = this.options,
	      references = _this$options.references,
	      autoToggle = _this$options.autoToggle,
	      widgetNamespace = _this$options.widgetNamespace;
	    var groupView = new ToolbarGroupView({
	      name: name,
	      align: grouped.group.align,
	      items: grouped.items,
	      references: references,
	      autoToggle: autoToggle,
	      widgetNamespace: widgetNamespace
	    });
	    this.groupViews.push(groupView);
	    groupView.on('all', function () {
	      this.trigger.apply(this, arguments);
	    }.bind(this));
	    groupView.render();
	    this.widgets = this.widgets.concat(groupView.widgets);
	    return groupView.$el;
	  },
	  onRemove: function onRemove() {
	    core_mjs.util.invoke(this.groupViews, 'off');
	    core_mjs.util.invoke(this.groupViews, 'remove');
	  }
	}, {
	  Align: Align
	});
	var ToolbarGroupView = core_mjs.mvc.View.extend({
	  className: 'toolbar-group',
	  init: function init() {
	    this.widgets = [];
	  },
	  onRender: function onRender() {
	    this.$el.attr('data-group', this.options.name);
	    this.$el.addClass(this.options.align);
	    this.renderItems();
	  },
	  renderItems: function renderItems() {
	    core_mjs.util.toArray(this.options.items).forEach(function (item) {
	      var widget = this.createWidget(item);
	      this.$el.append(widget.$el);
	    }, this);
	  },
	  createWidget: function createWidget(item) {
	    var _this$options2 = this.options,
	      references = _this$options2.references,
	      autoToggle = _this$options2.autoToggle,
	      widgetNamespace = _this$options2.widgetNamespace;
	    var widgetOpt = core_mjs.util.isString(item) ? {
	      autoToggle: autoToggle,
	      type: item
	    } : core_mjs.util.assign({
	      autoToggle: autoToggle
	    }, item);
	    var widget = Widget.create(widgetOpt, references, widgetNamespace || widgets);
	    widget.on('all', function (eventName) {
	      var data = Array.prototype.slice.call(arguments, 1);
	      this.trigger.apply(this, [item.name + ':' + eventName].concat(data));
	    }.bind(this));
	    this.widgets.push(widget);
	    return widget;
	  },
	  onRemove: function onRemove() {
	    core_mjs.util.invoke(this.widgets, 'off');
	    core_mjs.util.invoke(this.widgets, 'remove');
	  }
	});

	exports.Toolbar = Toolbar;

}(this.joint.ui = this.joint.ui || {}, joint, $));
