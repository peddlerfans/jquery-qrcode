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

  function _typeof(obj) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
  }

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

  var $map = arrayIteration.map;


  var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('map');

  // `Array.prototype.map` method
  // https://tc39.es/ecma262/#sec-array.prototype.map
  // with adding support of @@species
  _export({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
    map: function map(callbackfn /* , thisArg */) {
      return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    }
  });

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

  var arraySlice = functionUncurryThis([].slice);

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
  var getOwnPropertyDescriptor$2 = objectGetOwnPropertyDescriptor.f;
  var defineProperty$1 = objectDefineProperty.f;

  var trim = stringTrim.trim;

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
        defineProperty$1(NumberWrapper, key, getOwnPropertyDescriptor$2(NativeNumber, key));
      }
    }
    NumberWrapper.prototype = NumberPrototype;
    NumberPrototype.constructor = NumberWrapper;
    defineBuiltIn(global_1, NUMBER, NumberWrapper, { constructor: true });
  }

  // `Array.isArray` method
  // https://tc39.es/ecma262/#sec-array.isarray
  _export({ target: 'Array', stat: true }, {
    isArray: isArray
  });

  var $TypeError$7 = TypeError;
  var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF; // 2 ** 53 - 1 == 9007199254740991

  var doesNotExceedSafeInteger = function (it) {
    if (it > MAX_SAFE_INTEGER) throw $TypeError$7('Maximum allowed index exceeded');
    return it;
  };

  var createProperty = function (object, key, value) {
    var propertyKey = toPropertyKey(key);
    if (propertyKey in object) objectDefineProperty.f(object, propertyKey, createPropertyDescriptor(0, value));
    else object[propertyKey] = value;
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

  // call something on iterator step with safe closing on error
  var callWithSafeIterationClosing = function (iterator, fn, value, ENTRIES) {
    try {
      return ENTRIES ? fn(anObject(value)[0], value[1]) : fn(value);
    } catch (error) {
      iteratorClose(iterator, 'throw', error);
    }
  };

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

  var $TypeError$8 = TypeError;

  var getIterator = function (argument, usingIterator) {
    var iteratorMethod = arguments.length < 2 ? getIteratorMethod(argument) : usingIterator;
    if (aCallable(iteratorMethod)) return anObject(functionCall(iteratorMethod, argument));
    throw $TypeError$8(tryToString(argument) + ' is not iterable');
  };

  var $Array$1 = Array;

  // `Array.from` method implementation
  // https://tc39.es/ecma262/#sec-array.from
  var arrayFrom = function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var IS_CONSTRUCTOR = isConstructor(this);
    var argumentsLength = arguments.length;
    var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    if (mapping) mapfn = functionBindContext(mapfn, argumentsLength > 2 ? arguments[2] : undefined);
    var iteratorMethod = getIteratorMethod(O);
    var index = 0;
    var length, result, step, iterator, next, value;
    // if the target is not iterable or it's an array with the default iterator - use a simple case
    if (iteratorMethod && !(this === $Array$1 && isArrayIteratorMethod(iteratorMethod))) {
      iterator = getIterator(O, iteratorMethod);
      next = iterator.next;
      result = IS_CONSTRUCTOR ? new this() : [];
      for (;!(step = functionCall(next, iterator)).done; index++) {
        value = mapping ? callWithSafeIterationClosing(iterator, mapfn, [step.value, index], true) : step.value;
        createProperty(result, index, value);
      }
    } else {
      length = lengthOfArrayLike(O);
      result = IS_CONSTRUCTOR ? new this(length) : $Array$1(length);
      for (;length > index; index++) {
        value = mapping ? mapfn(O[index], index) : O[index];
        createProperty(result, index, value);
      }
    }
    result.length = index;
    return result;
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

  var INCORRECT_ITERATION = !checkCorrectnessOfIteration(function (iterable) {
    // eslint-disable-next-line es/no-array-from -- required for testing
    Array.from(iterable);
  });

  // `Array.from` method
  // https://tc39.es/ecma262/#sec-array.from
  _export({ target: 'Array', stat: true, forced: INCORRECT_ITERATION }, {
    from: arrayFrom
  });

  var charAt = functionUncurryThis(''.charAt);
  var charCodeAt$1 = functionUncurryThis(''.charCodeAt);
  var stringSlice$1 = functionUncurryThis(''.slice);

  var createMethod$3 = function (CONVERT_TO_STRING) {
    return function ($this, pos) {
      var S = toString_1(requireObjectCoercible($this));
      var position = toIntegerOrInfinity(pos);
      var size = S.length;
      var first, second;
      if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
      first = charCodeAt$1(S, position);
      return first < 0xD800 || first > 0xDBFF || position + 1 === size
        || (second = charCodeAt$1(S, position + 1)) < 0xDC00 || second > 0xDFFF
          ? CONVERT_TO_STRING
            ? charAt(S, position)
            : first
          : CONVERT_TO_STRING
            ? stringSlice$1(S, position, position + 2)
            : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
    };
  };

  var stringMultibyte = {
    // `String.prototype.codePointAt` method
    // https://tc39.es/ecma262/#sec-string.prototype.codepointat
    codeAt: createMethod$3(false),
    // `String.prototype.at` method
    // https://github.com/mathiasbynens/String.prototype.at
    charAt: createMethod$3(true)
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

  var correctPrototypeGetter = !fails(function () {
    function F() { /* empty */ }
    F.prototype.constructor = null;
    // eslint-disable-next-line es/no-object-getprototypeof -- required for testing
    return Object.getPrototypeOf(new F()) !== F.prototype;
  });

  var IE_PROTO$1 = sharedKey('IE_PROTO');
  var $Object$4 = Object;
  var ObjectPrototype = $Object$4.prototype;

  // `Object.getPrototypeOf` method
  // https://tc39.es/ecma262/#sec-object.getprototypeof
  // eslint-disable-next-line es/no-object-getprototypeof -- safe
  var objectGetPrototypeOf = correctPrototypeGetter ? $Object$4.getPrototypeOf : function (O) {
    var object = toObject(O);
    if (hasOwnProperty_1(object, IE_PROTO$1)) return object[IE_PROTO$1];
    var constructor = object.constructor;
    if (isCallable(constructor) && object instanceof constructor) {
      return constructor.prototype;
    } return object instanceof $Object$4 ? ObjectPrototype : null;
  };

  var ITERATOR$3 = wellKnownSymbol('iterator');
  var BUGGY_SAFARI_ITERATORS = false;

  // `%IteratorPrototype%` object
  // https://tc39.es/ecma262/#sec-%iteratorprototype%-object
  var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;

  /* eslint-disable es/no-array-prototype-keys -- safe */
  if ([].keys) {
    arrayIterator = [].keys();
    // Safari 8 has buggy iterators w/o `next`
    if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;
    else {
      PrototypeOfArrayIteratorPrototype = objectGetPrototypeOf(objectGetPrototypeOf(arrayIterator));
      if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;
    }
  }

  var NEW_ITERATOR_PROTOTYPE = !isObject(IteratorPrototype) || fails(function () {
    var test = {};
    // FF44- legacy iterators case
    return IteratorPrototype[ITERATOR$3].call(test) !== test;
  });

  if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype = {};

  // `%IteratorPrototype%[@@iterator]()` method
  // https://tc39.es/ecma262/#sec-%iteratorprototype%-@@iterator
  if (!isCallable(IteratorPrototype[ITERATOR$3])) {
    defineBuiltIn(IteratorPrototype, ITERATOR$3, function () {
      return this;
    });
  }

  var iteratorsCore = {
    IteratorPrototype: IteratorPrototype,
    BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
  };

  var defineProperty$2 = objectDefineProperty.f;



  var TO_STRING_TAG$2 = wellKnownSymbol('toStringTag');

  var setToStringTag = function (target, TAG, STATIC) {
    if (target && !STATIC) target = target.prototype;
    if (target && !hasOwnProperty_1(target, TO_STRING_TAG$2)) {
      defineProperty$2(target, TO_STRING_TAG$2, { configurable: true, value: TAG });
    }
  };

  var IteratorPrototype$1 = iteratorsCore.IteratorPrototype;





  var returnThis = function () { return this; };

  var iteratorCreateConstructor = function (IteratorConstructor, NAME, next, ENUMERABLE_NEXT) {
    var TO_STRING_TAG = NAME + ' Iterator';
    IteratorConstructor.prototype = objectCreate(IteratorPrototype$1, { next: createPropertyDescriptor(+!ENUMERABLE_NEXT, next) });
    setToStringTag(IteratorConstructor, TO_STRING_TAG, false);
    iterators[TO_STRING_TAG] = returnThis;
    return IteratorConstructor;
  };

  var PROPER_FUNCTION_NAME = functionName.PROPER;
  var CONFIGURABLE_FUNCTION_NAME = functionName.CONFIGURABLE;
  var IteratorPrototype$2 = iteratorsCore.IteratorPrototype;
  var BUGGY_SAFARI_ITERATORS$1 = iteratorsCore.BUGGY_SAFARI_ITERATORS;
  var ITERATOR$4 = wellKnownSymbol('iterator');
  var KEYS = 'keys';
  var VALUES = 'values';
  var ENTRIES = 'entries';

  var returnThis$1 = function () { return this; };

  var iteratorDefine = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
    iteratorCreateConstructor(IteratorConstructor, NAME, next);

    var getIterationMethod = function (KIND) {
      if (KIND === DEFAULT && defaultIterator) return defaultIterator;
      if (!BUGGY_SAFARI_ITERATORS$1 && KIND in IterablePrototype) return IterablePrototype[KIND];
      switch (KIND) {
        case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
        case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
        case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
      } return function () { return new IteratorConstructor(this); };
    };

    var TO_STRING_TAG = NAME + ' Iterator';
    var INCORRECT_VALUES_NAME = false;
    var IterablePrototype = Iterable.prototype;
    var nativeIterator = IterablePrototype[ITERATOR$4]
      || IterablePrototype['@@iterator']
      || DEFAULT && IterablePrototype[DEFAULT];
    var defaultIterator = !BUGGY_SAFARI_ITERATORS$1 && nativeIterator || getIterationMethod(DEFAULT);
    var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
    var CurrentIteratorPrototype, methods, KEY;

    // fix native
    if (anyNativeIterator) {
      CurrentIteratorPrototype = objectGetPrototypeOf(anyNativeIterator.call(new Iterable()));
      if (CurrentIteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
        if ( objectGetPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype$2) {
          if (objectSetPrototypeOf) {
            objectSetPrototypeOf(CurrentIteratorPrototype, IteratorPrototype$2);
          } else if (!isCallable(CurrentIteratorPrototype[ITERATOR$4])) {
            defineBuiltIn(CurrentIteratorPrototype, ITERATOR$4, returnThis$1);
          }
        }
        // Set @@toStringTag to native iterators
        setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true);
      }
    }

    // fix Array.prototype.{ values, @@iterator }.name in V8 / FF
    if (PROPER_FUNCTION_NAME && DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
      if ( CONFIGURABLE_FUNCTION_NAME) {
        createNonEnumerableProperty(IterablePrototype, 'name', VALUES);
      } else {
        INCORRECT_VALUES_NAME = true;
        defaultIterator = function values() { return functionCall(nativeIterator, this); };
      }
    }

    // export additional methods
    if (DEFAULT) {
      methods = {
        values: getIterationMethod(VALUES),
        keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
        entries: getIterationMethod(ENTRIES)
      };
      if (FORCED) for (KEY in methods) {
        if (BUGGY_SAFARI_ITERATORS$1 || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
          defineBuiltIn(IterablePrototype, KEY, methods[KEY]);
        }
      } else _export({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS$1 || INCORRECT_VALUES_NAME }, methods);
    }

    // define iterator
    if ( IterablePrototype[ITERATOR$4] !== defaultIterator) {
      defineBuiltIn(IterablePrototype, ITERATOR$4, defaultIterator, { name: DEFAULT });
    }
    iterators[NAME] = defaultIterator;

    return methods;
  };

  // `CreateIterResultObject` abstract operation
  // https://tc39.es/ecma262/#sec-createiterresultobject
  var createIterResultObject = function (value, done) {
    return { value: value, done: done };
  };

  var charAt$1 = stringMultibyte.charAt;





  var STRING_ITERATOR = 'String Iterator';
  var setInternalState = internalState.set;
  var getInternalState = internalState.getterFor(STRING_ITERATOR);

  // `String.prototype[@@iterator]` method
  // https://tc39.es/ecma262/#sec-string.prototype-@@iterator
  iteratorDefine(String, 'String', function (iterated) {
    setInternalState(this, {
      type: STRING_ITERATOR,
      string: toString_1(iterated),
      index: 0
    });
  // `%StringIteratorPrototype%.next` method
  // https://tc39.es/ecma262/#sec-%stringiteratorprototype%.next
  }, function next() {
    var state = getInternalState(this);
    var string = state.string;
    var index = state.index;
    var point;
    if (index >= string.length) return createIterResultObject(undefined, true);
    point = charAt$1(string, index);
    state.index += point.length;
    return createIterResultObject(point, false);
  });

  var defineProperty$3 = objectDefineProperty.f;

  var UNSCOPABLES = wellKnownSymbol('unscopables');
  var ArrayPrototype$1 = Array.prototype;

  // Array.prototype[@@unscopables]
  // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
  if (ArrayPrototype$1[UNSCOPABLES] == undefined) {
    defineProperty$3(ArrayPrototype$1, UNSCOPABLES, {
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

  var HAS_SPECIES_SUPPORT$1 = arrayMethodHasSpeciesSupport('slice');

  var SPECIES$2 = wellKnownSymbol('species');
  var $Array$2 = Array;
  var max$1 = Math.max;

  // `Array.prototype.slice` method
  // https://tc39.es/ecma262/#sec-array.prototype.slice
  // fallback for not array-like ES3 strings and DOM objects
  _export({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$1 }, {
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
        if (isConstructor(Constructor) && (Constructor === $Array$2 || isArray(Constructor.prototype))) {
          Constructor = undefined;
        } else if (isObject(Constructor)) {
          Constructor = Constructor[SPECIES$2];
          if (Constructor === null) Constructor = undefined;
        }
        if (Constructor === $Array$2 || Constructor === undefined) {
          return arraySlice(O, k, fin);
        }
      }
      result = new (Constructor === undefined ? $Array$2 : Constructor)(max$1(fin - k, 0));
      for (n = 0; k < fin; k++, n++) if (k in O) createProperty(result, n, O[k]);
      result.length = n;
      return result;
    }
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

  var $TypeError$9 = TypeError;

  var notARegexp = function (it) {
    if (isRegexp(it)) {
      throw $TypeError$9("The method doesn't accept regular expressions");
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

  /* eslint-disable es/no-array-prototype-indexof -- required for testing */


  var $indexOf = arrayIncludes.indexOf;


  var nativeIndexOf = functionUncurryThis([].indexOf);

  var NEGATIVE_ZERO = !!nativeIndexOf && 1 / nativeIndexOf([1], 1, -0) < 0;
  var STRICT_METHOD$1 = arrayMethodIsStrict('indexOf');

  // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  _export({ target: 'Array', proto: true, forced: NEGATIVE_ZERO || !STRICT_METHOD$1 }, {
    indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
      var fromIndex = arguments.length > 1 ? arguments[1] : undefined;
      return NEGATIVE_ZERO
        // convert -0 to +0
        ? nativeIndexOf(this, searchElement, fromIndex) || 0
        : $indexOf(this, searchElement, fromIndex);
    }
  });

  var engineIsNode = classofRaw(global_1.process) == 'process';

  var SPECIES$3 = wellKnownSymbol('species');

  var setSpecies = function (CONSTRUCTOR_NAME) {
    var Constructor = getBuiltIn(CONSTRUCTOR_NAME);
    var defineProperty = objectDefineProperty.f;

    if (descriptors && Constructor && !Constructor[SPECIES$3]) {
      defineProperty(Constructor, SPECIES$3, {
        configurable: true,
        get: function () { return this; }
      });
    }
  };

  var $TypeError$a = TypeError;

  var anInstance = function (it, Prototype) {
    if (objectIsPrototypeOf(Prototype, it)) return it;
    throw $TypeError$a('Incorrect invocation');
  };

  var $TypeError$b = TypeError;

  // `Assert: IsConstructor(argument) is true`
  var aConstructor = function (argument) {
    if (isConstructor(argument)) return argument;
    throw $TypeError$b(tryToString(argument) + ' is not a constructor');
  };

  var SPECIES$4 = wellKnownSymbol('species');

  // `SpeciesConstructor` abstract operation
  // https://tc39.es/ecma262/#sec-speciesconstructor
  var speciesConstructor = function (O, defaultConstructor) {
    var C = anObject(O).constructor;
    var S;
    return C === undefined || isNullOrUndefined(S = anObject(C)[SPECIES$4]) ? defaultConstructor : aConstructor(S);
  };

  var FunctionPrototype$2 = Function.prototype;
  var apply = FunctionPrototype$2.apply;
  var call$2 = FunctionPrototype$2.call;

  // eslint-disable-next-line es/no-reflect -- safe
  var functionApply = typeof Reflect == 'object' && Reflect.apply || (functionBindNative ? call$2.bind(apply) : function () {
    return call$2.apply(apply, arguments);
  });

  var $TypeError$c = TypeError;

  var validateArgumentsLength = function (passed, required) {
    if (passed < required) throw $TypeError$c('Not enough arguments');
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

  var getOwnPropertyDescriptor$3 = objectGetOwnPropertyDescriptor.f;
  var macrotask = task.set;





  var MutationObserver = global_1.MutationObserver || global_1.WebKitMutationObserver;
  var document$2 = global_1.document;
  var process$2 = global_1.process;
  var Promise = global_1.Promise;
  // Node.js 11 shows ExperimentalWarning on getting `queueMicrotask`
  var queueMicrotaskDescriptor = getOwnPropertyDescriptor$3(global_1, 'queueMicrotask');
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
  var SPECIES$5 = wellKnownSymbol('species');
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
      constructor[SPECIES$5] = FakePromise;
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

  var $TypeError$d = TypeError;

  var PromiseCapability = function (C) {
    var resolve, reject;
    this.promise = new C(function ($$resolve, $$reject) {
      if (resolve !== undefined || reject !== undefined) throw $TypeError$d('Bad Promise constructor');
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
  var setInternalState$1 = internalState.set;
  var NativePromisePrototype$1 = promiseNativeConstructor && promiseNativeConstructor.prototype;
  var PromiseConstructor = promiseNativeConstructor;
  var PromisePrototype = NativePromisePrototype$1;
  var TypeError$3 = global_1.TypeError;
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
          reject(TypeError$3('Promise-chain cycle'));
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
      if (state.facade === value) throw TypeError$3("Promise can't be resolved itself");
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
      setInternalState$1(this, {
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

  var $TypeError$e = TypeError;

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
      if (!iterFn) throw $TypeError$e(tryToString(iterable) + ' is not iterable');
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







  var getInternalState$1 = internalState.get;



  var nativeReplace = shared('native-string-replace', String.prototype.replace);
  var nativeExec = RegExp.prototype.exec;
  var patchedExec = nativeExec;
  var charAt$2 = functionUncurryThis(''.charAt);
  var indexOf$1 = functionUncurryThis(''.indexOf);
  var replace$1 = functionUncurryThis(''.replace);
  var stringSlice$2 = functionUncurryThis(''.slice);

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
      var state = getInternalState$1(re);
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

        strCopy = stringSlice$2(str, re.lastIndex);
        // Support anchored sticky behavior.
        if (re.lastIndex > 0 && (!re.multiline || re.multiline && charAt$2(str, re.lastIndex - 1) !== '\n')) {
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
          match.input = stringSlice$2(match.input, charsAdded);
          match[0] = stringSlice$2(match[0], charsAdded);
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








  var SPECIES$6 = wellKnownSymbol('species');
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
        re.constructor[SPECIES$6] = function () { return re; };
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

  var charAt$3 = stringMultibyte.charAt;

  // `AdvanceStringIndex` abstract operation
  // https://tc39.es/ecma262/#sec-advancestringindex
  var advanceStringIndex = function (S, index, unicode) {
    return index + (unicode ? charAt$3(S, index).length : 1);
  };

  var $TypeError$f = TypeError;

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
    throw $TypeError$f('RegExp#exec called on incompatible receiver');
  };

  // @@match logic
  fixRegexpWellKnownSymbolLogic('match', function (MATCH, nativeMatch, maybeCallNative) {
    return [
      // `String.prototype.match` method
      // https://tc39.es/ecma262/#sec-string.prototype.match
      function match(regexp) {
        var O = requireObjectCoercible(this);
        var matcher = isNullOrUndefined(regexp) ? undefined : getMethod(regexp, MATCH);
        return matcher ? functionCall(matcher, regexp, O) : new RegExp(regexp)[MATCH](toString_1(O));
      },
      // `RegExp.prototype[@@match]` method
      // https://tc39.es/ecma262/#sec-regexp.prototype-@@match
      function (string) {
        var rx = anObject(this);
        var S = toString_1(string);
        var res = maybeCallNative(nativeMatch, rx, S);

        if (res.done) return res.value;

        if (!rx.global) return regexpExecAbstract(rx, S);

        var fullUnicode = rx.unicode;
        rx.lastIndex = 0;
        var A = [];
        var n = 0;
        var result;
        while ((result = regexpExecAbstract(rx, S)) !== null) {
          var matchStr = toString_1(result[0]);
          A[n] = matchStr;
          if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
          n++;
        }
        return n === 0 ? null : A;
      }
    ];
  });

  var RegExpPrototype$1 = RegExp.prototype;

  var regexpGetFlags = function (R) {
    var flags = R.flags;
    return flags === undefined && !('flags' in RegExpPrototype$1) && !hasOwnProperty_1(R, 'flags') && objectIsPrototypeOf(RegExpPrototype$1, R)
      ? functionCall(regexpFlags, R) : flags;
  };

  var defineProperty$4 = objectDefineProperty.f;

  var proxyAccessor = function (Target, Source, key) {
    key in Target || defineProperty$4(Target, key, {
      configurable: true,
      get: function () { return Source[key]; },
      set: function (it) { Source[key] = it; }
    });
  };

  var getOwnPropertyNames$1 = objectGetOwnPropertyNames.f;









  var enforceInternalState = internalState.enforce;





  var MATCH$2 = wellKnownSymbol('match');
  var NativeRegExp = global_1.RegExp;
  var RegExpPrototype$2 = NativeRegExp.prototype;
  var SyntaxError = global_1.SyntaxError;
  var exec$1 = functionUncurryThis(RegExpPrototype$2.exec);
  var charAt$4 = functionUncurryThis(''.charAt);
  var replace$2 = functionUncurryThis(''.replace);
  var stringIndexOf$1 = functionUncurryThis(''.indexOf);
  var stringSlice$3 = functionUncurryThis(''.slice);
  // TODO: Use only proper RegExpIdentifierName
  var IS_NCG = /^\?<[^\s\d!#%&*+<=>@^][^\s!#%&*+<=>@^]*>/;
  var re1 = /a/g;
  var re2 = /a/g;

  // "new" should create a new object, old webkit bug
  var CORRECT_NEW = new NativeRegExp(re1) !== re1;

  var MISSED_STICKY$1 = regexpStickyHelpers.MISSED_STICKY;
  var UNSUPPORTED_Y$2 = regexpStickyHelpers.UNSUPPORTED_Y;

  var BASE_FORCED = descriptors &&
    (!CORRECT_NEW || MISSED_STICKY$1 || regexpUnsupportedDotAll || regexpUnsupportedNcg || fails(function () {
      re2[MATCH$2] = false;
      // RegExp constructor can alter flags and IsRegExp works correct with @@match
      return NativeRegExp(re1) != re1 || NativeRegExp(re2) == re2 || NativeRegExp(re1, 'i') != '/a/i';
    }));

  var handleDotAll = function (string) {
    var length = string.length;
    var index = 0;
    var result = '';
    var brackets = false;
    var chr;
    for (; index <= length; index++) {
      chr = charAt$4(string, index);
      if (chr === '\\') {
        result += chr + charAt$4(string, ++index);
        continue;
      }
      if (!brackets && chr === '.') {
        result += '[\\s\\S]';
      } else {
        if (chr === '[') {
          brackets = true;
        } else if (chr === ']') {
          brackets = false;
        } result += chr;
      }
    } return result;
  };

  var handleNCG = function (string) {
    var length = string.length;
    var index = 0;
    var result = '';
    var named = [];
    var names = {};
    var brackets = false;
    var ncg = false;
    var groupid = 0;
    var groupname = '';
    var chr;
    for (; index <= length; index++) {
      chr = charAt$4(string, index);
      if (chr === '\\') {
        chr = chr + charAt$4(string, ++index);
      } else if (chr === ']') {
        brackets = false;
      } else if (!brackets) switch (true) {
        case chr === '[':
          brackets = true;
          break;
        case chr === '(':
          if (exec$1(IS_NCG, stringSlice$3(string, index + 1))) {
            index += 2;
            ncg = true;
          }
          result += chr;
          groupid++;
          continue;
        case chr === '>' && ncg:
          if (groupname === '' || hasOwnProperty_1(names, groupname)) {
            throw new SyntaxError('Invalid capture group name');
          }
          names[groupname] = true;
          named[named.length] = [groupname, groupid];
          ncg = false;
          groupname = '';
          continue;
      }
      if (ncg) groupname += chr;
      else result += chr;
    } return [result, named];
  };

  // `RegExp` constructor
  // https://tc39.es/ecma262/#sec-regexp-constructor
  if (isForced_1('RegExp', BASE_FORCED)) {
    var RegExpWrapper = function RegExp(pattern, flags) {
      var thisIsRegExp = objectIsPrototypeOf(RegExpPrototype$2, this);
      var patternIsRegExp = isRegexp(pattern);
      var flagsAreUndefined = flags === undefined;
      var groups = [];
      var rawPattern = pattern;
      var rawFlags, dotAll, sticky, handled, result, state;

      if (!thisIsRegExp && patternIsRegExp && flagsAreUndefined && pattern.constructor === RegExpWrapper) {
        return pattern;
      }

      if (patternIsRegExp || objectIsPrototypeOf(RegExpPrototype$2, pattern)) {
        pattern = pattern.source;
        if (flagsAreUndefined) flags = regexpGetFlags(rawPattern);
      }

      pattern = pattern === undefined ? '' : toString_1(pattern);
      flags = flags === undefined ? '' : toString_1(flags);
      rawPattern = pattern;

      if (regexpUnsupportedDotAll && 'dotAll' in re1) {
        dotAll = !!flags && stringIndexOf$1(flags, 's') > -1;
        if (dotAll) flags = replace$2(flags, /s/g, '');
      }

      rawFlags = flags;

      if (MISSED_STICKY$1 && 'sticky' in re1) {
        sticky = !!flags && stringIndexOf$1(flags, 'y') > -1;
        if (sticky && UNSUPPORTED_Y$2) flags = replace$2(flags, /y/g, '');
      }

      if (regexpUnsupportedNcg) {
        handled = handleNCG(pattern);
        pattern = handled[0];
        groups = handled[1];
      }

      result = inheritIfRequired(NativeRegExp(pattern, flags), thisIsRegExp ? this : RegExpPrototype$2, RegExpWrapper);

      if (dotAll || sticky || groups.length) {
        state = enforceInternalState(result);
        if (dotAll) {
          state.dotAll = true;
          state.raw = RegExpWrapper(handleDotAll(pattern), rawFlags);
        }
        if (sticky) state.sticky = true;
        if (groups.length) state.groups = groups;
      }

      if (pattern !== rawPattern) try {
        // fails in old engines, but we have no alternatives for unsupported regex syntax
        createNonEnumerableProperty(result, 'source', rawPattern === '' ? '(?:)' : rawPattern);
      } catch (error) { /* empty */ }

      return result;
    };

    for (var keys$2 = getOwnPropertyNames$1(NativeRegExp), index = 0; keys$2.length > index;) {
      proxyAccessor(RegExpWrapper, NativeRegExp, keys$2[index++]);
    }

    RegExpPrototype$2.constructor = RegExpWrapper;
    RegExpWrapper.prototype = RegExpPrototype$2;
    defineBuiltIn(global_1, 'RegExp', RegExpWrapper, { constructor: true });
  }

  // https://tc39.es/ecma262/#sec-get-regexp-@@species
  setSpecies('RegExp');

  var PROPER_FUNCTION_NAME$1 = functionName.PROPER;






  var TO_STRING = 'toString';
  var RegExpPrototype$3 = RegExp.prototype;
  var nativeToString = RegExpPrototype$3[TO_STRING];

  var NOT_GENERIC = fails(function () { return nativeToString.call({ source: 'a', flags: 'b' }) != '/a/b'; });
  // FF44- RegExp#toString has a wrong name
  var INCORRECT_NAME = PROPER_FUNCTION_NAME$1 && nativeToString.name != TO_STRING;

  // `RegExp.prototype.toString` method
  // https://tc39.es/ecma262/#sec-regexp.prototype.tostring
  if (NOT_GENERIC || INCORRECT_NAME) {
    defineBuiltIn(RegExp.prototype, TO_STRING, function toString() {
      var R = anObject(this);
      var pattern = toString_1(R.source);
      var flags = toString_1(regexpGetFlags(R));
      return '/' + pattern + '/' + flags;
    }, { unsafe: true });
  }

  var $TypeError$g = TypeError;

  // `Array.prototype.{ reduce, reduceRight }` methods implementation
  var createMethod$4 = function (IS_RIGHT) {
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
          throw $TypeError$g('Reduce of empty array with no initial value');
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
    left: createMethod$4(false),
    // `Array.prototype.reduceRight` method
    // https://tc39.es/ecma262/#sec-array.prototype.reduceright
    right: createMethod$4(true)
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

  var FUNCTION_NAME_EXISTS = functionName.EXISTS;

  var defineProperty$5 = objectDefineProperty.f;

  var FunctionPrototype$3 = Function.prototype;
  var functionToString$1 = functionUncurryThis(FunctionPrototype$3.toString);
  var nameRE = /function\b(?:\s|\/\*[\S\s]*?\*\/|\/\/[^\n\r]*[\n\r]+)*([^\s(/]*)/;
  var regExpExec = functionUncurryThis(nameRE.exec);
  var NAME = 'name';

  // Function instances `.name` property
  // https://tc39.es/ecma262/#sec-function-instances-name
  if (descriptors && !FUNCTION_NAME_EXISTS) {
    defineProperty$5(FunctionPrototype$3, NAME, {
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

  var floor$1 = Math.floor;
  var charAt$5 = functionUncurryThis(''.charAt);
  var replace$3 = functionUncurryThis(''.replace);
  var stringSlice$4 = functionUncurryThis(''.slice);
  var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d{1,2}|<[^>]*>)/g;
  var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d{1,2})/g;

  // `GetSubstitution` abstract operation
  // https://tc39.es/ecma262/#sec-getsubstitution
  var getSubstitution = function (matched, str, position, captures, namedCaptures, replacement) {
    var tailPos = position + matched.length;
    var m = captures.length;
    var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
    if (namedCaptures !== undefined) {
      namedCaptures = toObject(namedCaptures);
      symbols = SUBSTITUTION_SYMBOLS;
    }
    return replace$3(replacement, symbols, function (match, ch) {
      var capture;
      switch (charAt$5(ch, 0)) {
        case '$': return '$';
        case '&': return matched;
        case '`': return stringSlice$4(str, 0, position);
        case "'": return stringSlice$4(str, tailPos);
        case '<':
          capture = namedCaptures[stringSlice$4(ch, 1, -1)];
          break;
        default: // \d\d?
          var n = +ch;
          if (n === 0) return match;
          if (n > m) {
            var f = floor$1(n / 10);
            if (f === 0) return match;
            if (f <= m) return captures[f - 1] === undefined ? charAt$5(ch, 1) : captures[f - 1] + charAt$5(ch, 1);
            return match;
          }
          capture = captures[n - 1];
      }
      return capture === undefined ? '' : capture;
    });
  };

  var REPLACE = wellKnownSymbol('replace');
  var max$2 = Math.max;
  var min$2 = Math.min;
  var concat$2 = functionUncurryThis([].concat);
  var push$2 = functionUncurryThis([].push);
  var stringIndexOf$2 = functionUncurryThis(''.indexOf);
  var stringSlice$5 = functionUncurryThis(''.slice);

  var maybeToString = function (it) {
    return it === undefined ? it : String(it);
  };

  // IE <= 11 replaces $0 with the whole match, as if it was $&
  // https://stackoverflow.com/questions/6024666/getting-ie-to-replace-a-regex-with-the-literal-string-0
  var REPLACE_KEEPS_$0 = (function () {
    // eslint-disable-next-line regexp/prefer-escape-replacement-dollar-char -- required for testing
    return 'a'.replace(/./, '$0') === '$0';
  })();

  // Safari <= 13.0.3(?) substitutes nth capture where n>m with an empty string
  var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = (function () {
    if (/./[REPLACE]) {
      return /./[REPLACE]('a', '$0') === '';
    }
    return false;
  })();

  var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
    var re = /./;
    re.exec = function () {
      var result = [];
      result.groups = { a: '7' };
      return result;
    };
    // eslint-disable-next-line regexp/no-useless-dollar-replacements -- false positive
    return ''.replace(re, '$<a>') !== '7';
  });

  // @@replace logic
  fixRegexpWellKnownSymbolLogic('replace', function (_, nativeReplace, maybeCallNative) {
    var UNSAFE_SUBSTITUTE = REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE ? '$' : '$0';

    return [
      // `String.prototype.replace` method
      // https://tc39.es/ecma262/#sec-string.prototype.replace
      function replace(searchValue, replaceValue) {
        var O = requireObjectCoercible(this);
        var replacer = isNullOrUndefined(searchValue) ? undefined : getMethod(searchValue, REPLACE);
        return replacer
          ? functionCall(replacer, searchValue, O, replaceValue)
          : functionCall(nativeReplace, toString_1(O), searchValue, replaceValue);
      },
      // `RegExp.prototype[@@replace]` method
      // https://tc39.es/ecma262/#sec-regexp.prototype-@@replace
      function (string, replaceValue) {
        var rx = anObject(this);
        var S = toString_1(string);

        if (
          typeof replaceValue == 'string' &&
          stringIndexOf$2(replaceValue, UNSAFE_SUBSTITUTE) === -1 &&
          stringIndexOf$2(replaceValue, '$<') === -1
        ) {
          var res = maybeCallNative(nativeReplace, rx, S, replaceValue);
          if (res.done) return res.value;
        }

        var functionalReplace = isCallable(replaceValue);
        if (!functionalReplace) replaceValue = toString_1(replaceValue);

        var global = rx.global;
        if (global) {
          var fullUnicode = rx.unicode;
          rx.lastIndex = 0;
        }
        var results = [];
        while (true) {
          var result = regexpExecAbstract(rx, S);
          if (result === null) break;

          push$2(results, result);
          if (!global) break;

          var matchStr = toString_1(result[0]);
          if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
        }

        var accumulatedResult = '';
        var nextSourcePosition = 0;
        for (var i = 0; i < results.length; i++) {
          result = results[i];

          var matched = toString_1(result[0]);
          var position = max$2(min$2(toIntegerOrInfinity(result.index), S.length), 0);
          var captures = [];
          // NOTE: This is equivalent to
          //   captures = result.slice(1).map(maybeToString)
          // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
          // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
          // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
          for (var j = 1; j < result.length; j++) push$2(captures, maybeToString(result[j]));
          var namedCaptures = result.groups;
          if (functionalReplace) {
            var replacerArgs = concat$2([matched], captures, position, S);
            if (namedCaptures !== undefined) push$2(replacerArgs, namedCaptures);
            var replacement = toString_1(functionApply(replaceValue, undefined, replacerArgs));
          } else {
            replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
          }
          if (position >= nextSourcePosition) {
            accumulatedResult += stringSlice$5(S, nextSourcePosition, position) + replacement;
            nextSourcePosition = position + matched.length;
          }
        }
        return accumulatedResult + stringSlice$5(S, nextSourcePosition);
      }
    ];
  }, !REPLACE_SUPPORTS_NAMED_GROUPS || !REPLACE_KEEPS_$0 || REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE);

  var trim$1 = stringTrim.trim;


  var $parseInt = global_1.parseInt;
  var Symbol$2 = global_1.Symbol;
  var ITERATOR$5 = Symbol$2 && Symbol$2.iterator;
  var hex = /^[+-]?0x/i;
  var exec$2 = functionUncurryThis(hex.exec);
  var FORCED$1 = $parseInt(whitespaces + '08') !== 8 || $parseInt(whitespaces + '0x16') !== 22
    // MS Edge 18- broken with boxed symbols
    || (ITERATOR$5 && !fails(function () { $parseInt(Object(ITERATOR$5)); }));

  // `parseInt` method
  // https://tc39.es/ecma262/#sec-parseint-string-radix
  var numberParseInt = FORCED$1 ? function parseInt(string, radix) {
    var S = trim$1(toString_1(string));
    return $parseInt(S, (radix >>> 0) || (exec$2(hex, S) ? 16 : 10));
  } : $parseInt;

  // `parseInt` method
  // https://tc39.es/ecma262/#sec-parseint-string-radix
  _export({ global: true, forced: parseInt != numberParseInt }, {
    parseInt: numberParseInt
  });

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

  var nativeReverse = functionUncurryThis([].reverse);
  var test$1 = [1, 2];

  // `Array.prototype.reverse` method
  // https://tc39.es/ecma262/#sec-array.prototype.reverse
  // fix for Safari 12.0 bug
  // https://bugs.webkit.org/show_bug.cgi?id=188794
  _export({ target: 'Array', proto: true, forced: String(test$1) === String(test$1.reverse()) }, {
    reverse: function reverse() {
      // eslint-disable-next-line no-self-assign -- dirty hack
      if (isArray(this)) this.length = this.length;
      return nativeReverse(this);
    }
  });

  // `Number.isNaN` method
  // https://tc39.es/ecma262/#sec-number.isnan
  _export({ target: 'Number', stat: true }, {
    isNaN: function isNaN(number) {
      // eslint-disable-next-line no-self-compare -- NaN check
      return number != number;
    }
  });

  var trim$2 = stringTrim.trim;


  var charAt$6 = functionUncurryThis(''.charAt);
  var $parseFloat = global_1.parseFloat;
  var Symbol$3 = global_1.Symbol;
  var ITERATOR$6 = Symbol$3 && Symbol$3.iterator;
  var FORCED$2 = 1 / $parseFloat(whitespaces + '-0') !== -Infinity
    // MS Edge 18- broken with boxed symbols
    || (ITERATOR$6 && !fails(function () { $parseFloat(Object(ITERATOR$6)); }));

  // `parseFloat` method
  // https://tc39.es/ecma262/#sec-parsefloat-string
  var numberParseFloat = FORCED$2 ? function parseFloat(string) {
    var trimmedString = trim$2(toString_1(string));
    var result = $parseFloat(trimmedString);
    return result === 0 && charAt$6(trimmedString, 0) == '-' ? -0 : result;
  } : $parseFloat;

  // `parseFloat` method
  // https://tc39.es/ecma262/#sec-parsefloat-string
  _export({ global: true, forced: parseFloat != numberParseFloat }, {
    parseFloat: numberParseFloat
  });

  var $every = arrayIteration.every;


  var STRICT_METHOD$4 = arrayMethodIsStrict('every');

  // `Array.prototype.every` method
  // https://tc39.es/ecma262/#sec-array.prototype.every
  _export({ target: 'Array', proto: true, forced: !STRICT_METHOD$4 }, {
    every: function every(callbackfn /* , thisArg */) {
      return $every(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    }
  });

  var $some = arrayIteration.some;


  var STRICT_METHOD$5 = arrayMethodIsStrict('some');

  // `Array.prototype.some` method
  // https://tc39.es/ecma262/#sec-array.prototype.some
  _export({ target: 'Array', proto: true, forced: !STRICT_METHOD$5 }, {
    some: function some(callbackfn /* , thisArg */) {
      return $some(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    }
  });

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

  var ColorPalette = SelectBox.extend({
    className: 'select-box color-palette',
    position: function position() {
      var $selection = this.$('.select-box-selection');
      var selectionHeight = $selection.outerHeight();
      var selectionOffset = $selection.offset();
      var left = selectionOffset.left;
      var top = selectionOffset.top + selectionHeight;
      if (this.options.target !== document.body) {
        this.$target = this.$target || $(this.options.target);

        // Position relative to target element
        var targetOffset = this.$target.offset();
        left -= targetOffset.left - this.$target.scrollLeft();
        top -= targetOffset.top - this.$target.scrollTop();
      }
      this.$options.css({
        left: left,
        top: top
      });
    }
  }, {
    // Statics

    OptionsView: SelectBox.OptionsView.extend({
      renderOptionContent: function renderOptionContent(option) {
        var $option = $('<div/>', {
          'class': 'select-box-option-content'
        });
        $option.css('background-color', option.content);
        if (option.icon) {
          $option.prepend($('<img/>', {
            'class': 'select-box-option-icon',
            src: option.icon
          }));
        }
        return $option;
      }
    })
  });

  var Inspector = core_mjs.mvc.View.extend({
    className: 'inspector',
    options: {
      cellView: undefined,
      // One can pass either a cell view ...
      cell: undefined,
      // ... or the cell itself.
      live: true,
      // By default, we enabled live changes from the inspector inputs.
      validateInput: function validateInput(element, path, type, inspector) {
        return element.validity ? element.validity.valid : true;
      },
      renderFieldContent: undefined,
      // function(options, path, value, inspector) { return html }
      renderLabel: undefined,
      // function(options, path, inspector) { return html }
      focusField: undefined,
      // function(options, path, element, inspector) { return void }
      // Custom operators can be defined here as `function(cell, value, argument*) { return boolean; }`
      // e.g. { longerThan: function (cell, value, prop) { return value.length > cell.prop(prop); }}
      operators: {},
      multiOpenGroups: true,
      // `true` if the Inspector is supposed to allow multiple open groups at the same time. Set to `false` for classical accordion.
      container: null,
      /**
       * Used for logic of store/restore currently opened/stored groups.
       * @params {dia.Cell} model
       * @returns {string}
       * */
      stateKey: function stateKey(model) {
        return model.id;
      }
    },
    events: {
      // Custom fields need to call updateCell() explicitly
      'change [data-attribute]:not([data-custom-field])': 'onChangeInput',
      'click .group-label': 'onGroupLabelClick',
      'click .btn-list-add': 'addListItem',
      'click .btn-list-del': 'deleteListItem',
      'mousedown .field': 'pointerdown',
      'touchstart .field': 'pointerdown',
      'focusin .field': 'pointerfocusin',
      'focusout .field': 'pointerfocusout'
    },
    HTMLEntities: {
      'lt': '<',
      'gt': '>',
      'amp': '&',
      'nbsp': ' ',
      'quot': '"',
      'cent': '¢',
      'pound': '£',
      'euro': '€',
      'yen': '¥',
      'copy': '©',
      'reg': '®'
    },
    init: function init() {
      var groups = this.options.groups = this.options.groups || {};
      core_mjs.util.bindAll(this, 'stopBatchCommand', 'pointerup', 'onContentEditableBlur', 'replaceHTMLEntity');
      this.DEFAULT_PATH_WILDCARD = '${index}';
      this.pathWildcard = this.options.pathWildcard;

      // List of built-in widgets (references to their views). This allows
      // us to clean up the views (call `remove()` method on them) whenever the
      // inspector need to re-render.
      this.widgets = {};

      // Dictionary of `$attribute` values, keyed by their absolute paths.
      this._byPath = {};
      this._attributeKeysInUse = [];

      // Flatten the `inputs` object until the level where the options object is.
      // This produces an object with this structure: { <path>: <options> }, e.g. { 'attrs/rect/fill': { type: 'color' } }
      this.flatAttributes = this.flattenInputs(this.options.inputs);

      // expand attributes {'a/b/c': { type: 'number'} => {a: {b: {c: {type:'number'}}}
      this.expandAttributes = this.expandAttrs(this.options.inputs || {});

      // `_when` object maps path to a set of conditions (either `eq` or `regex`).
      // When an input under the path changes to
      // the value that equals all the `eq` values or matches all the `regex` regular expressions,
      // the inspector rerenders itself and this time includes all the
      // inputs that met the conditions.
      this._when = {};

      // `_bound` object maps a slave path to a master path (A slave is using master's data).
      // When an input under the master path changes, the inspector re-renders the input under the
      // slave path
      this._bound = {};

      // Add the attributes path the options object - we're converting the flat object to an array,
      // so we would lose the keys otherwise.
      var attributesArray = Object.keys(this.flatAttributes).map(function (path) {
        var options = this.flatAttributes[path];
        this._registerDependants.call(this, options, path);
        options.path = path;
        return options;
      }, this);

      // Add dependency paths from the groups `when` expressions. We are making sure here,
      // they are added as a key only (we're not adding them to array of inputs!)
      for (var groupName in groups) {
        var groupOptions = groups[groupName];
        if (groupOptions && groups.hasOwnProperty(groupName)) {
          this.extractExpressionPaths(groupOptions.when).forEach(function (condPath) {
            if (!this._when[condPath]) this._when[condPath] = [];
          }, this);
        }
      }

      // Sort the flat attributes object by two criteria: group first, then index inside that group.
      // As underscore 'sortBy' is a stable sort algorithm we can sort by index first and then
      // by group again.
      var sortedByIndexAttributes = core_mjs.util.sortBy(attributesArray, 'index');
      this.groupedFlatAttributes = core_mjs.util.sortBy(sortedByIndexAttributes, function (options) {
        var groupOptions = this.options.groups[options.group];
        return groupOptions && groupOptions.index || Number.MAX_VALUE;
      }.bind(this));

      // Listen on events on the cell.
      this.listenTo(this.getModel(), 'all', this.onCellChange, this);
    },
    _registerDependants: function _registerDependants(options, path) {
      if (options.when) {
        var expr = options.when;
        var dependant = {
          expression: expr,
          path: path
        };
        this.extractExpressionPaths(expr).forEach(function (condPath) {
          // If we encountered this dependency before, add the current path to it as a
          // dependant (indexed in `this._when` by the dependency path: `condPath`).
          // If we didn't encounter this dependency before, create an entry in
          // `this._when` and add the current path as a dependant.
          (this._when[condPath] || (this._when[condPath] = [])).push(dependant);
        }, this);
      }

      // If the option type is 'select' and its options needs resolving (is defined by path)
      // we bind the select (slave) and the input under the path (master) together.
      if (this.needsResolving(options)) {
        // slave : master
        this._bound[path] = options.options;
      }

      // If the option type is 'object' or 'list', it might contain nested dependants
      this._registerNestedDependants.call(this, options, path);
    },
    _registerNestedDependants: function _registerNestedDependants(options, path) {
      // convert string path to array path notation
      var localPath = Array.isArray(path) ? path : path.split('/');

      // Objects have `properties`; each one may have a `when` clause and/or nested objects/lists.
      if (options.type === 'object' && options.properties) {
        var properties = options.properties;
        Object.keys(properties).forEach(function (propertyPath) {
          var property = properties[propertyPath];
          var newPath = localPath.concat(propertyPath); // path array notation
          this._registerDependants(property, newPath);
        }, this);
      }

      // Lists define a generic `item`; it may have a `when` clause and/or nested objects/lists.
      else if (options.type === 'list' && options.item) {
        var item = options.item;
        var newPath = localPath.concat(null); // `null` is a wildcard for "any list item" in path array notation
        this._registerDependants(item, newPath);
      }

      // Generic objects define properties immediately in `options`; each one may have a `when` clause and/or nested objects/lists.
      // If there is a `type` with a string value among `options`, do not go in (this is an input field definition).
      else if (typeof options.type !== 'string') {
        Object.keys(options).forEach(function (optionPath) {
          var option = options[optionPath];
          if (_typeof(option) === 'object') {
            var _newPath = localPath.concat(optionPath); // path array notation
            this._registerDependants(option, _newPath);
          }
        }, this);
      }
    },
    // Cache all the attributes (inputs, lists and objects) with every change to the DOM tree.
    // Cache it by its path.
    cacheInputs: function cacheInputs() {
      var byPath = {};
      Array.from(this.$('[data-attribute]')).forEach(function (attribute) {
        var $attribute = $(attribute);
        var path = $attribute.attr('data-attribute');
        byPath[path] = $attribute;
      }, this);
      this._byPath = byPath;
      this._attributeKeysInUse = this.getAttributeKeysInUse();
    },
    updateGroupsVisibility: function updateGroupsVisibility() {
      var $groups = this.$groups;
      for (var i = 0, n = $groups.length; i < n; i++) {
        var $group = $($groups[i]);
        var groupName = $group.attr('data-name');
        var options = this.options.groups[groupName];

        // If a group fields are all hidden mark the group with 'empty' class name.
        var isGroupEmpty = $group.find('> .field:not(.hidden)').length === 0;
        $group.toggleClass('empty', isGroupEmpty);
        var isGroupHidden = !!(options && options.when && !this.isExpressionValid(options.when));
        $group.toggleClass('hidden', isGroupHidden);
      }
    },
    expandAttrs: function expandAttrs(inputs) {
      var result = {};
      var keys = Object.keys(inputs);
      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        var value = inputs[key];
        var parts = key.split('/');
        core_mjs.util.setByPath(result, parts, core_mjs.util.isPlainObject(value) ? this.expandAttrs(value) : value);
      }
      return result;
    },
    flattenInputs: function flattenInputs(inputs) {
      return core_mjs.util.flattenObject(inputs, '/', function (obj) {
        // Stop flattening when we reach an object that contains the `type` string property . We assume
        // that this is our options object.
        return typeof obj.type === 'string';
      });
    },
    getModel: function getModel() {
      return this.options.cell || this.options.cellView.model;
    },
    onCellChange: function onCellChange(eventName, cell, change, opt) {
      opt = opt || {};

      // Do not react on changes that happened inside this inspector. This would
      // cause a re-render of the same inspector triggered by an input change in this inspector.
      if (opt.inspector == this.cid) return;

      // Note that special care is taken for all the transformation attribute changes
      // (`position`, `size` and `angle`). See below for details.

      switch (eventName) {
        case 'remove':
          // Make sure the element inspector gets removed when the cell is removed from the graph.
          // Otherwise, a zombie cell could possibly be updated.
          if (this.constructor.instance) {
            this.trigger('close');
          }
          this.remove();
          break;
        case 'change:position':
          // Make a special case for `position` as this one is performance critical.
          // There is no need to rerender the whole inspector but only update the position input.
          this.updateInputPosition();
          break;
        case 'change:size':
          // Make a special case also for the `size` attribute for the same reasons as for `position`.
          this.updateInputSize();
          break;
        case 'change:angle':
          // Make a special case also for the `angle` attribute for the same reasons as for `position`.
          this.updateInputAngle();
          break;
        case 'change:source':
        case 'change:target':
        case 'change:vertices':
          // Make a special case also for the 'source' and 'target' of a link for the same reasons
          // as for 'position'. We don't expect source or target to be configurable.
          // That's why we do nothing here.
          break;
        default:
          // Re-render only on specific attributes changes. These are all events that starts with `'change:'`.
          // Otherwise, the re-render would be called unnecessarily (consider generic `'change'` event, `'bach:start'`, ...).
          var changeAttributeEvent = 'change:';
          if (eventName.slice(0, changeAttributeEvent.length) === changeAttributeEvent) {
            // re-render the inspector only if the changed attribute is displayed by the inspector
            var attributeKey = eventName.slice(changeAttributeEvent.length);
            if (this._attributeKeysInUse.includes(attributeKey)) {
              this.render({
                refresh: true
              });
            }
          }
          break;
      }
    },
    render: function render(opt) {
      var refresh = opt && opt.refresh;
      if (refresh && this.options.storeGroupsState) {
        this.storeGroupsState();
      }
      this.$el.empty();
      this.removeWidgets();
      var lastGroup;
      var groups = [];
      var $group;
      this.groupedFlatAttributes.forEach(function (options) {
        if (lastGroup !== options.group) {
          // A new group should be created.

          var groupOptions = this.options.groups[options.group];
          $group = this.renderGroup({
            name: options.group,
            label: groupOptions && groupOptions.label
          });
          if (!refresh) {
            if (groupOptions && groupOptions.closed) {
              this.closeGroup($group, {
                init: true
              });
            } else {
              this.openGroup($group, {
                init: true
              });
            }
          }
          groups.push($group);
        }
        this.renderTemplate($group, options, options.path);
        lastGroup = options.group;
      }, this);

      // cache groups

      this.$document = $(this.el.ownerDocument);
      this.$groups = $(groups);
      this.$el.append(groups);
      if (refresh && this.options.restoreGroupsState) {
        this.restoreGroupsState();
      }
      this.afterRender();
      return this;
    },
    getAttributeKeysInUse: function getAttributeKeysInUse() {
      // all attributes used explicitly in the `inputs` definition
      var inputsAttributeKeys = Object.keys(this._byPath).map(function (path) {
        return path.substring(0, path.indexOf('/')) || path;
      });

      // all attributes that are bound by the selection `options` reference
      var boundedAttributeKeys = core_mjs.util.toArray(this._bound);

      // all attributes that are part of the `when` expression
      var dependantAttributeKeys = Object.keys(this._when);
      return core_mjs.util.uniq([].concat(inputsAttributeKeys, boundedAttributeKeys, dependantAttributeKeys));
    },
    // Get the value of the attribute at `path`.
    // Take into account `options.defaultValue`.
    // Matches found value through `options.valueRegExp` (if any).
    // Beware - gives real value currently present at a specific path in cell.
    // That means, it cannot deal with a `path` with a placeholder!
    getCellAttributeValue: function getCellAttributeValue(path, options) {
      var cell = this.getModel();
      var value = core_mjs.util.getByPath(cell.attributes, path, '/');
      options = options || this.flatAttributes[path];
      if (!options) return value;
      if (value === undefined && options.defaultValue !== undefined) {
        value = options.defaultValue;
      }
      if (options.valueRegExp) {
        if (value === undefined) {
          throw new Error('Inspector: defaultValue must be present when valueRegExp is used.');
        }
        var valueMatch = value.match(new RegExp(options.valueRegExp));
        value = valueMatch && valueMatch[2];
      }
      return value;
    },
    resolvableTypes: ['select', 'select-box', 'color-palette', 'select-button-group'],
    needsResolving: function needsResolving(options) {
      return !!options && this.resolvableTypes.indexOf(options.type) > -1 && core_mjs.util.isString(options.options);
    },
    resolveBindings: function resolveBindings(options) {
      if (this.resolvableTypes.indexOf(options.type) > -1) {
        // options['options'] are transformed here to options['items']
        var items = options.options || [];

        // resolve items if the options are defined indirectly as a reference to a model property
        if (core_mjs.util.isString(items)) {
          items = core_mjs.util.getByPath(this.getModel().attributes, items, '/') || [];
        }

        // Check if items array has incorrect format (i.e an array of strings).
        if (!core_mjs.util.isObject(items[0])) {
          // Transform each array item into the { value: [value], content: [content] } object.
          items = core_mjs.util.toArray(items).map(function (item) {
            return {
              value: item,
              content: item
            };
          });
        }

        // export result as 'items'
        options.items = items;
      }
    },
    updateBindings: function updateBindings(path) {
      // Find all inputs which are bound to the current input (i.e find all slaves).
      var slaves = Object.keys(this._bound).reduce(function (result, slave) {
        var master = this._bound[slave];
        // Does the current input path starts with a master path?
        if (path.indexOf(master) === 0) result.push(slave);
        return result;
      }.bind(this), []);
      if (!core_mjs.util.isEmpty(slaves)) {
        // Re-render all slave inputs
        slaves.forEach(function (slave) {
          var options = this.flatAttributes[slave];
          if (!options) return;
          this.renderTemplate(null, options, slave, {
            replace: true
          });
        }, this);
        this.afterPartialRender();
      }
    },
    renderFieldContent: function renderFieldContent(options, path, value) {
      var fieldHtml;

      // Give the outside world a chance to render the field.
      // It is the responsibility of the programmer to call `updateCell()` whenever the custom field changes value.
      if (core_mjs.util.isFunction(this.options.renderFieldContent)) {
        fieldHtml = this.options.renderFieldContent(options, path, value, this);
        if (fieldHtml) {
          return $(fieldHtml).attr({
            'data-attribute': path,
            'data-type': options.type,
            'data-custom-field': true
          });
        }
      }
      var widget;
      var selectedIndex;
      var originalSelection;
      var $label;

      // Note that widgets might also have special ways of reporting changed values.
      switch (options.type) {
        case 'select-box':
          selectedIndex = core_mjs.util.toArray(options.items).findIndex(function (option) {
            var optionValue = option.value;
            var modelValue = value;
            if (optionValue === undefined && option.content === modelValue) return true;
            var key = options.key;
            if (key) {
              modelValue = core_mjs.util.getByPath(modelValue, key, '/');
              optionValue = core_mjs.util.getByPath(optionValue, key, '/');
            }
            return core_mjs.util.isEqual(optionValue, modelValue);
          });
          var selectBoxOptions = core_mjs.util.assign({
            theme: this.options.theme,
            target: this.options.container
          }, core_mjs.util.omit(options, 'type', 'group', 'index', 'selectBoxOptionsClass', 'options'), {
            options: options.items,
            selected: selectedIndex,
            // add special class name on select-box options that originates from the inspector
            selectBoxOptionsClass: [core_mjs.util.addClassNamePrefix('inspector-select-box-options'), options.selectBoxOptionsClass].filter(function (item) {
              return !!item;
            }).join(' ')
          });
          widget = new SelectBox(selectBoxOptions);
          widget.$el.attr({
            'data-attribute': path,
            'data-type': options.type,
            'data-overwrite': options.overwrite
          });
          widget.render();
          $label = this.renderOwnLabel(options, path);
          fieldHtml = $('<div/>').append($label, widget.el);

          // In `previewMode`, cell gets updated when the user hovers
          // over the options in the select box. However, the final
          // value is reset only when the user selects an option.
          if (options.previewMode) {
            originalSelection = widget.selection;
            widget.on('options:mouseout close', function () {
              widget.selection = originalSelection;
              this.processInput(widget.$el, {
                previewCancel: true,
                dry: true
              });
            }, this);
            widget.on('option:hover', function (option, index) {
              widget.selection = option;
              // Update the cell in `dry` run. `dry` run gives hint to the
              // outside application that even though the model updated,
              // we don't have to e.g. store the change into DB.
              this.processInput(widget.$el, {
                dry: true
              });
            }, this);
            widget.on('option:select', function (option, index) {
              var originalValue = originalSelection === undefined ? undefined : widget.getSelectionValue(originalSelection);
              var newValue = widget.getSelectionValue(option);
              // If the original value equals the new value, run the update
              // in `dry` mode as there is no need to tell the outside application
              // that the model has changed (and possibly needs to be updated in e.g. a DB).
              var dry = originalValue === newValue;
              // `previewDone` is only used internally inside ui.Inspector
              // to tell the `setProperty()` method that it should trigger
              // a change event.
              this.processInput(widget.$el, {
                previewDone: true,
                dry: dry,
                originalValue: originalValue
              });
              originalSelection = option;
            }, this);
          } else {
            widget.on('option:select', function (option, index) {
              this.processInput(widget.$el);
            }, this);
          }
          this.widgets[path] = widget;
          break;
        case 'color-palette':
          selectedIndex = core_mjs.util.toArray(options.items).findIndex(function (option) {
            if (option.value === value) return true;
            if (option.value === undefined && option.content === value) return true;
            return false;
          });
          var colorPaletteOptions = core_mjs.util.assign({
            theme: this.options.theme,
            target: this.options.container
          }, core_mjs.util.omit(options, 'type', 'group', 'index', 'options'), {
            options: options.items,
            selected: selectedIndex
          });
          widget = new ColorPalette(colorPaletteOptions);
          widget.$el.attr({
            'data-attribute': path,
            'data-type': options.type
          });
          widget.render();
          $label = this.renderOwnLabel(options, path);
          fieldHtml = $('<div/>').append($label, widget.el);

          // In `previewMode`, cell gets updated when the user hovers
          // over the options in the color palette. However, the final
          // value is reset only when the user selects an option.
          if (options.previewMode) {
            originalSelection = widget.selection;
            widget.on('options:mouseout close', function () {
              widget.selection = originalSelection;
              this.processInput(widget.$el, {
                previewCancel: true,
                dry: true
              });
            }, this);
            widget.on('option:hover', function (option, index) {
              widget.selection = option;
              this.processInput(widget.$el, {
                dry: true
              });
            }, this);
            widget.on('option:select', function (option, index) {
              var originalValue = originalSelection === undefined ? undefined : widget.getSelectionValue(originalSelection);
              var newValue = widget.getSelectionValue(option);
              // If the original value equals the new value, run the update
              // in `dry` mode as there is no need to tell the outside application
              // that the model has changed (and possibly needs to be updated in e.g. a DB).
              var dry = originalValue === newValue;
              // `previewDone` is only used internally inside ui.Inspector
              // to tell the `setProperty()` method that it should trigger
              // a change event.
              this.processInput(widget.$el, {
                previewDone: true,
                dry: dry,
                originalValue: originalValue
              });
              originalSelection = option;
            }, this);
          } else {
            widget.on('option:select', function (option, index) {
              this.processInput(widget.$el);
            }, this);
          }
          this.widgets[path] = widget;
          break;
        case 'select-button-group':
          if (options.multi) {
            selectedIndex = [];
            core_mjs.util.toArray(options.items).forEach(function (option, idx) {
              var val1 = option.value === undefined ? option.content : option.value;
              var key = options.key;
              if (key) val1 = core_mjs.util.getByPath(val1, key, '/');
              var containsOption = core_mjs.util.toArray(value).find(function (val2) {
                if (key) val2 = core_mjs.util.getByPath(val2, key, '/');
                return core_mjs.util.isEqual(val1, val2);
              });
              if (containsOption) {
                selectedIndex.push(idx);
              }
            });
          } else {
            selectedIndex = core_mjs.util.toArray(options.items).findIndex(function (option) {
              var optionValue = option.value;
              var modelValue = value;
              if (optionValue === undefined && option.content === modelValue) return true;
              var key = options.key;
              if (key) {
                modelValue = core_mjs.util.getByPath(modelValue, key, '/');
                optionValue = core_mjs.util.getByPath(optionValue, key, '/');
              }
              return core_mjs.util.isEqual(optionValue, modelValue);
            });
          }
          var selectButtonGroupOptions = core_mjs.util.assign({
            theme: this.options.theme
          }, core_mjs.util.omit(options, 'type', 'group', 'index', 'options'), {
            options: options.items,
            selected: selectedIndex
          });
          widget = new SelectButtonGroup(selectButtonGroupOptions);
          widget.$el.attr({
            'data-attribute': path,
            'data-type': options.type,
            'data-overwrite': options.overwrite
          });
          widget.render();
          $label = this.renderOwnLabel(options, path);
          fieldHtml = $('<div/>').append($label, widget.el);

          // In `previewMode`, cell gets updated when the user hovers
          // over the options in the color palette. However, the final
          // value is reset only when the user selects an option.
          if (options.previewMode) {
            originalSelection = widget.selection;
            widget.on('mouseout', function () {
              widget.selection = originalSelection;
              this.processInput(widget.$el, {
                previewCancel: true,
                dry: true
              });
            }, this);
            widget.on('option:hover', function (option, index) {
              if (options.multi) {
                widget.selection = core_mjs.util.uniq(widget.selection.concat([option]));
              } else {
                widget.selection = option;
              }
              this.processInput(widget.$el, {
                dry: true
              });
            }, this);
            widget.on('option:select', function (selection, index) {
              var originalValue = originalSelection === undefined ? undefined : widget.getSelectionValue(originalSelection);
              var newValue = widget.getSelectionValue(selection);
              // If the original value equals the new value, run the update
              // in `dry` mode as there is no need to tell the outside application
              // that the model has changed (and possibly needs to be updated in e.g. a DB).

              var dry = core_mjs.util.isEqual(originalValue, newValue);
              // `previewDone` is only used internally inside ui.Inspector
              // to tell the `setProperty()` method that it should trigger
              // a change event.
              this.processInput(widget.$el, {
                previewDone: true,
                dry: dry,
                originalValue: originalValue
              });
              originalSelection = selection;
            }, this);
          } else {
            widget.on('option:select', function (option, index) {
              this.processInput(widget.$el);
            }, this);
          }
          this.widgets[path] = widget;
          break;
        default:
          fieldHtml = this.renderOwnFieldContent({
            options: options,
            type: options.type,
            overwrite: options.overwrite,
            label: options.label || path,
            attribute: path,
            value: value
          });
      }
      return fieldHtml;
    },
    renderGroup: function renderGroup(opt) {
      opt = opt || {};
      var $group = $('<div/>').addClass('group').attr('data-name', opt.name);
      var $label = $('<h3/>').addClass('group-label').text(opt.label || opt.name);
      return $group.append($label);
    },
    renderOwnLabel: function renderOwnLabel(options, path) {
      var label;
      var customRenderFn = this.options.renderLabel;
      if (typeof customRenderFn === 'function') {
        label = customRenderFn(options, path, this);
      }
      if (label !== undefined) {
        return $(label);
      }

      // Default label
      // the different behavior below is kept for backwards compatibility
      switch (options.type) {
        case 'select-box':
        case 'color-palette':
        case 'select-button-group':
          return $('<label/>').html(options.label || path);
        default:
          return $('<label/>').text(options.label || path);
      }
    },
    renderOwnFieldContent: function renderOwnFieldContent(opt) {
      var content, $input, $wrapper, $output, $units, $button, $nest, $label;
      $label = this.renderOwnLabel(opt.options, opt.attribute);
      switch (opt.type) {
        case 'number':
          $input = $('<input/>', {
            type: 'number',
            min: opt.options.min,
            max: opt.options.max,
            step: opt.options.step
          }).val(opt.value);
          content = [$label, $('<div/>').addClass('input-wrapper').append($input)];
          break;
        case 'range':
          $label.addClass('with-output');
          $output = $('<output/>').text(opt.value);
          $units = $('<span/>').addClass('units').text(opt.options.unit);
          $input = $('<input/>', {
            type: 'range',
            name: opt.type,
            min: opt.options.min,
            max: opt.options.max,
            step: opt.options.step
          }).val(opt.value);
          $input.on('change input', function () {
            $output.text($input.val());
          });
          content = [$label, $output, $units, $input];
          break;
        case 'textarea':
          $input = $('<textarea/>').text(opt.value);
          content = [$label, $('<div/>').addClass('input-wrapper').append($input)];
          break;
        case 'content-editable':
          {
            var value = opt.value,
              _opt$options = opt.options,
              options = _opt$options === void 0 ? {} : _opt$options;
            var _options$html = options.html,
              html = _options$html === void 0 ? true : _options$html,
              _options$readonly = options.readonly,
              readonly = _options$readonly === void 0 ? false : _options$readonly;
            var editableContent;
            if (core_mjs.util.isString(value)) {
              var safeValue = html ? core_mjs.util.sanitizeHTML(value) : this.encodeHTMLEntities(value);
              // replace the newline characters with the line-break tags
              editableContent = safeValue.replace(/\n/g, '<br>');
            } else {
              editableContent = '';
            }
            $input = $('<div/>').prop('contenteditable', !readonly).toggleClass('content-editable-readonly', Boolean(readonly)).css('display', 'inline-block') // Chrome would use <div> instead of <p> for the new line otherwise.
            .html(editableContent).on('blur', this.onContentEditableBlur);
            content = [$label, $('<div/>').addClass('input-wrapper').append($input)];
            break;
          }
        case 'select':
          var items = opt.options.items;
          $input = $('<select/>');
          if (opt.options.multiple) {
            // multiple select allows specify via `size` number of items
            // to be displayed in the scrollable list.
            $input.prop({
              size: opt.options.size || items.length,
              multiple: true
            });
          }
          var selected = function selected(itemValue) {
            if (opt.options.multiple) {
              return core_mjs.util.toArray(opt.value).find(function (val) {
                return core_mjs.util.isEqual(itemValue, val);
              });
            }
            return core_mjs.util.isEqual(itemValue, opt.value);
          };
          core_mjs.util.toArray(items).forEach(function (item) {
            var $option = $('<option/>', {
              value: item.value
            }).text(item.content);
            if (selected(item.value)) {
              $option.attr('selected', 'selected');
            }
            $input.append($option);
          });
          content = [$label, $input];
          break;
        case 'toggle':
          $button = $('<span><i/></span>');
          $input = $('<input/>', {
            type: 'checkbox'
          }).prop('checked', !!opt.value);
          $wrapper = $('<div/>').addClass(opt.type);
          content = [$label, $wrapper.append($input, $button)];
          break;
        case 'color':
          $input = $('<input/>', {
            type: 'color'
          }).val(opt.value);
          content = [$label, $input];
          break;
        case 'text':
          $input = $('<input/>', {
            type: 'text'
          }).val(opt.value);
          content = [$label, $('<div/>').addClass('input-wrapper').append($input)];
          break;
        case 'object':
          $input = $('<div/>');
          $nest = $('<div/>').addClass('object-properties');
          content = [$label, $input.append($nest)];
          break;
        case 'list':
          $button = $('<button/>').addClass('btn-list-add').text(opt.options.addButtonLabel || '+');
          $nest = $('<div/>').addClass('list-items');
          $input = $('<div/>');
          content = [$label, $input.append($button, $nest)];
          break;
      }
      if ($input) {
        $input.addClass(opt.type).attr({
          'data-type': opt.type,
          'data-attribute': opt.attribute,
          'data-overwrite': opt.overwrite
        });
      }

      // A little trick how to convert an array of jQuery elements
      // to a jQuery object.
      return $.fn.append.apply($('<div>'), content).children();
    },
    onContentEditableBlur: function onContentEditableBlur(evt) {
      // Workaround for Webkit content editable focus bug
      // https://gist.github.com/shimondoodkin/1081133

      var $editableFix = $('<input/>', {
        disabled: true,
        tabIndex: -1,
        style: {
          width: '1px',
          height: '1px',
          border: 'none',
          margin: 0,
          padding: 0
        }
      }).appendTo(this.$el);
      $editableFix.focus();
      $editableFix[0].setSelectionRange(0, 0);
      $editableFix.blur().remove();
      $(evt.target).trigger('change');
    },
    replaceHTMLEntity: function replaceHTMLEntity(entity, code) {
      return this.HTMLEntities[code] || '';
    },
    encodeHTMLEntities: function encodeHTMLEntities(str) {
      return str.replace(/[\u00A0-\u9999<>&]/g, function (i) {
        return "&#".concat(i.charCodeAt(0), ";");
      });
    },
    renderObjectProperty: function renderObjectProperty(opt) {
      opt = opt || {};
      var $objectProperty = $('<div/>', {
        'data-property': opt.property,
        'class': 'object-property'
      });
      return $objectProperty;
    },
    renderListItem: function renderListItem(opt) {
      opt = opt || {};
      var $button = $('<button/>').addClass('btn-list-del').text(opt.options.removeButtonLabel || '-');
      var $listItem = $('<div/>', {
        'data-index': opt.index,
        'class': 'list-item'
      });
      return $listItem.append($button);
    },
    renderFieldContainer: function renderFieldContainer(opt) {
      opt = opt || {};
      var $field = $('<div/>', {
        'data-field': opt.path,
        'class': 'field ' + opt.type + '-field'
      });
      return $field;
    },
    renderTemplate: function renderTemplate($el, options, path, opt) {
      $el = $el || this.$el;
      opt = opt || {};

      // Prepare rendering of `'select'` elements that refer to cell for their options.
      this.resolveBindings(options);

      // If this field is a generic object, treat is as a non-generic object where `options` are properties.
      if (typeof options.type !== 'string') {
        // Normally, generic objects are flattened when encountered inside a non-generic object, so we do not get here.
        // However, there are two situations in which that does not happen:
        // - There is a generic object directly in the Inspector's `inputs` definition.
        // - There is a generic object directly in a list's `item` definition.
        options = {
          type: 'object',
          properties: options
        };
      }

      // Wrap the input field into a `.field` classed div.
      // This will allow us to hide and show entire blocks in `this.updateFieldsVisibility()`.
      // (Which needs us to save all fields into `this._byPath` in `this.cacheInputs()`.)
      var $field = this.renderFieldContainer({
        path: path,
        type: options.type
      });
      if (opt.hidden) {
        $field.addClass('hidden');
      }
      // This must never get a `path` with a placeholder!
      var value = this.getCellAttributeValue(path, options);
      var $input = this.renderFieldContent(options, path, value);
      $field.append($input);

      // The `attrs` option allows us to set arbitrary attributes on the generated HTML.
      // This object is of the form: `<selector> : { <attributeName> : <attributeValue>, ... }`
      core_mjs.util.setAttributesBySelector($field, options.attrs);

      // If this field is a list or an object, we need recursion.
      if (options.type === 'list' && options.item) {
        // Create all nested fields.
        core_mjs.util.toArray(value).forEach(function (itemValue, index) {
          var $listItem = this.renderListItem({
            index: index,
            options: options
          });
          // Recursion: Call `renderTemplate` for list item.
          this.renderTemplate($listItem, options.item, path + '/' + index);
          $input.children('.list-items').append($listItem);
        }, this);

        // Toggle the list's "add" and "delete" buttons.
        var numItems = value && value.length;
        var min = options && options.min;
        var max = options && options.max;
        this.fixListButtons($input, numItems, min, max);
      } else if (options.type === 'object' && options.properties) {
        // Condense generic objects on the path into a '/' separated path.
        // End flattening at anything that has a `type` (object, list, input field).
        var flatAttributes = this.flattenInputs(options.properties);

        // Assign current `path` to every attribute so that we can access it later.
        var attributesArray = Object.keys(flatAttributes).map(function (attributePath) {
          var attributeOptions = flatAttributes[attributePath];
          attributeOptions.path = attributePath;
          return attributeOptions;
        });

        // Sort attributes by `index`.
        attributesArray = core_mjs.util.sortBy(attributesArray, function (options) {
          return options.index;
        });

        // Create all nested fields.
        attributesArray.forEach(function (attribute) {
          var $objectProperty = this.renderObjectProperty({
            property: attribute.path
          });
          // Recursion: Call `renderTemplate` for every object property.
          this.renderTemplate($objectProperty, attribute, path + '/' + attribute.path);
          $input.children('.object-properties').append($objectProperty);
        }, this);
      }
      if (opt.replace) {
        // We are trying to re-render the field.
        // Find the existing field on `$el` and replace with the one we just made.
        $el.find('[data-field="' + path + '"]').replaceWith($field);
      } else {
        // Add the new field to `$el`.
        $el.append($field);
      }
    },
    updateInputPosition: function updateInputPosition() {
      var $inputX = this._byPath['position/x'];
      var $inputY = this._byPath['position/y'];
      var position = this.getModel().get('position');
      if ($inputX) {
        $inputX.val(position.x);
      }
      if ($inputY) {
        $inputY.val(position.y);
      }
    },
    updateInputSize: function updateInputSize() {
      var $inputWidth = this._byPath['size/width'];
      var $inputHeight = this._byPath['size/height'];
      var size = this.getModel().get('size');
      if ($inputWidth) {
        $inputWidth.val(size.width);
      }
      if ($inputHeight) {
        $inputHeight.val(size.height);
      }
    },
    updateInputAngle: function updateInputAngle() {
      var $inputAngle = this._byPath['angle'];
      var angle = this.getModel().get('angle');
      if ($inputAngle) {
        $inputAngle.val(angle);
      }
    },
    validateInput: function validateInput(type, input, path) {
      // It is assumed custom widgets have their own validation setup.
      switch (type) {
        case 'select-box':
        case 'color-palette':
          var widget = this.widgets[path];
          if (!widget) return false;
          return widget.getSelectionIndex() !== -1;
        case 'select-button-group':
          return !!this.widgets[path];
        default:
          return this.options.validateInput(input, path, type, this);
      }
    },
    focusField: function focusField(path) {
      var options = this.getOptionsFromPath(path);
      var element = this._byPath[path];
      if (element) {
        this._focusFieldInternal(options, path, element[0]);
      } else {
        throw 'path not found';
      }
    },
    _focusListField: function _focusListField(options, path, element) {
      var listElement = element.querySelector('[data-attribute]:not(.hidden)');
      if (listElement) {
        this._focusFieldInternal(options.item, listElement.getAttribute('data-attribute'), listElement);
      }
    },
    _focusObjectField: function _focusObjectField(options, path, element) {
      var firstField = element.querySelector('[data-attribute]:not(.hidden)');
      if (firstField) {
        var fieldPath = firstField.getAttribute('data-attribute');
        var fieldOptions = this.getOptionsFromPath(fieldPath);
        this._focusFieldInternal(fieldOptions, fieldPath, firstField);
      }
    },
    _focusFieldInternal: function _focusFieldInternal(options, path, element) {
      switch (options.type) {
        case 'number':
        case 'text':
        case 'range':
        case 'color':
        case 'toggle':
        case 'select':
        case 'textarea':
        case 'content-editable':
          element.focus();
          break;
        case 'object':
          this._focusObjectField(options, path, element);
          break;
        case 'list':
          this._focusListField(options, path, element);
          break;
        default:
          if (this.options.focusField) {
            this.options.focusField(options, path, element, this);
          }
          break;
      }
    },
    onChangeInput: function onChangeInput(evt) {
      if (evt.target === evt.currentTarget) {
        this.processInput($(evt.target));
      }
    },
    processInput: function processInput($input, opt) {
      var path = $input.attr('data-attribute');
      var type = $input.attr('data-type');
      if (!this.validateInput(type, $input[0], path)) {
        // The input value is not valid. Do nothing.
        return;
      }
      if (this.options.live) {
        this.updateCell($input, path, opt);
      }
      var rawValue = this.getFieldValue($input[0], type);
      var value = this.parse(type, rawValue, $input[0]);

      // Notify the outside world that an input has changed.
      this.trigger('change:' + path, value, $input[0], opt);
    },
    // update visibility of all rendered fields
    // update all bindings and all dependants
    // assumes that `this._attributeKeysInUse` exists = that `render()` and `cacheInputs()` have been run
    updateFieldsVisibility: function updateFieldsVisibility() {
      var _this = this;
      this._attributeKeysInUse.forEach(function (path) {
        _this.updateBindings(path);
        _this.updateDependants(path);
      });
    },
    // update everything that depends on attribute at `path`
    // assumes that `this._byPath` exists = that `render()` and `cacheInputs()` have been run
    updateDependants: function updateDependants(path) {
      var _this2 = this;
      // expressions that may use the attribute
      var dependantPathDict = this._when;
      var dependantPaths = Object.keys(dependantPathDict);

      // fields that may be affected by the attribute
      var attributePathDict = this._byPath;
      var attributePaths = Object.keys(attributePathDict);
      var flatAttributes = this.flatAttributes;

      // Go through all the inputs that are dependent on the value of the changed input.
      // Show them if the 'when' expression is evaluated to 'true'. Hide them otherwise.

      // account for paths with wildcard chunks in `this._when` (path)
      // (introduced by expressions with a relative path pointing into a list)
      var filteredDependantPaths = filterDependantPaths.call(this, dependantPaths, path);
      filteredDependantPaths.forEach(function (filteredDependantPathData) {
        var filteredDependantPath = filteredDependantPathData.path;
        //const pathWildcardValues = filteredDependantPathData.pathWildcardValues;

        var dependants = core_mjs.util.toArray(dependantPathDict[filteredDependantPath]);
        dependants.forEach(function (dependant) {
          var dependantPath = dependant.path;
          var dependantExpression = dependant.expression;
          var bareExpression = _this2._getBareExpression(dependantExpression);
          var expressionExtras = _this2._getExpressionExtras(dependantExpression);

          // account for paths with `null` chunks in `dependantPath` (comparison path)
          // (introduced by expressions with an absolute path within a list)
          var filteredPaths = filterPaths(attributePaths, dependantPath);
          filteredPaths.forEach(function (filteredPathData) {
            var filteredPath = filteredPathData.path;
            var comparisonWildcardValues = filteredPathData.comparisonWildcardValues;
            var $attribute = attributePathDict[filteredPath];
            var $field = $attribute.closest('.field');
            var previouslyHidden = $field.hasClass('hidden');

            // fix the bare expression to refer to actual `path`
            var fixedExpression = fixDependantExpression.call(_this2, bareExpression, comparisonWildcardValues);
            var valid = _this2.isExpressionValid(fixedExpression);
            $field.toggleClass('hidden', !valid);

            // unset option - works only with 'live' inspector
            var otherwise = expressionExtras.otherwise;
            if (otherwise && otherwise.unset && _this2.options.live) {
              if (!valid) {
                // The attribute just switched from visible to hidden.
                // Unset its value on the model.
                _this2.unsetProperty(filteredPath);

                // Re-render the field.
                // The attribute at dependant path may be inside a nested object or list.
                var attribute = getAttribute(flatAttributes, filteredPath);
                if (attribute) {
                  _this2.renderTemplate(null, attribute, filteredPath, {
                    replace: true,
                    hidden: true
                  });
                }
                _this2.afterPartialRender();
              } else if (previouslyHidden) {
                // The attribute just switched from hidden to visible.
                // We set its value according to model.
                // (In case it has been unset earlier.)
                _this2.updateCell($attribute, filteredPath);
              }
            }
          }, _this2);
        }, _this2);
      }, this);
      function fixDependantExpression(bareExpression, wildcardValues) {
        // for example, `bareExpression = { eq: { 'foo': true }}` (primitive)
        // or `bareExpression = { not: { eq: { 'foo': true }}}` (unary operation)
        // or `bareExpression = { and: [{ eq: { 'foo': true }}, { eq: { 'bar': true }}]}` (multiary operation)
        var fixedExpression = {};
        // there should be only one key in `bareExpression` but we don't know its name
        // `for...in` loop is the easiest way to access it (= `exprKey`)
        for (var exprKey in bareExpression) {
          var exprVal = bareExpression[exprKey];
          if (Array.isArray(exprVal)) {
            // `exprKey` is a multiary operator
            var operator = exprKey;
            var operands = exprVal;
            // for example, `operator = 'and'`
            // and `operands = [{ eq: { 'foo': true }}, { eq: { 'bar': true }}]`
            fixedExpression[operator] = [];
            var numOperands = operands.length;
            for (var i = 0; i < numOperands; i++) {
              var operand = operands[i];
              // for example, `operand = { eq: { 'foo': true }}`
              // recursion: `operand` may be a primitive or a composite expression
              var fixedOperand = fixDependantExpression.call(this, operand, wildcardValues);
              // push the fixed operand into fixed expression array at `operator`:
              fixedExpression[operator].push(fixedOperand);
            }
          } else if (this._isComposite(bareExpression)) {
            // `exprKey` is a unary operator (= 'not' operator)
            var _operator = exprKey;
            var _operand = exprVal;
            // for example, `operator = 'not'`
            // and `operand = { eq: { 'foo': true }}`
            // recursion: `operand` may be a primitive or a composite expression
            var _fixedOperand = fixDependantExpression.call(this, _operand, wildcardValues);
            fixedExpression[_operator] = _fixedOperand;
          } else {
            // `bareExpression` is a primitive expression
            var primitiveKey = exprKey;
            var primitiveVal = exprVal;
            // modify `fixedExpression`:
            fixPrimitive.call(this, primitiveKey, primitiveVal, wildcardValues, fixedExpression);
          }
        }
        return fixedExpression;
        function fixPrimitive(primitiveKey, primitiveVal, wildcardValues, output) {
          // for example, `primitiveKey = 'eq'`
          // and `primitiveVal = { 'foo': true }`
          output[primitiveKey] = {};
          // there should be only one key in `primitiveVal` but we don't know its name
          // `for...in` loop is the easiest way to access it (= `condPath`)
          for (var condPath in primitiveVal) {
            var condVal = primitiveVal[condPath];
            // for example, `condPath = 'foo'`
            // and `condVal = true`
            // fix `condPath` by substituting provided `wildcardValues` at appropriate places
            var newCondPath = substituteWildcardValues.call(this, condPath, wildcardValues);
            output[primitiveKey][newCondPath] = condVal;
          }
          // no return, modifications were done directly into provided `output` reference

          function substituteWildcardValues(genericPath, wildcardValues) {
            var pathWildcard = this.pathWildcard || this.DEFAULT_PATH_WILDCARD;
            var fixedChunks = [];
            var wildcardIndex = 0;
            var pathChunks = genericPath.split('/');
            var numPathChunks = pathChunks.length;
            for (var _i = 0; _i < numPathChunks; _i++) {
              var currentChunk = pathChunks[_i];
              if (currentChunk === pathWildcard) {
                currentChunk = wildcardValues[wildcardIndex] || pathWildcard;
                wildcardIndex += 1;
              }
              fixedChunks.push(currentChunk);
            }
            return fixedChunks.join('/');
          }
        }
      }
      function filterDependantPaths(dependantPaths, comparisonPath) {
        // `comparisonPath` is a string
        // return an array of objects:
        // - path: `dependantPaths` which conform to `comparisonPath`
        // - pathWildcardValues: list indices which were substituted for wildcard chunks

        var comparisonChunks = comparisonPath.split('/');
        // `pathWildcard` is a wildcard for path chunks (every comparison chunk is equal to it)
        var pathWildcard = this.pathWildcard || this.DEFAULT_PATH_WILDCARD;
        return compareChunks(dependantPaths, comparisonChunks, {
          pathWildcard: pathWildcard
        });
      }
      function filterPaths(paths, comparisonPath) {
        // `comparisonPath` is a string or Array<string|null>
        // return an array of objects
        // - path: `paths` which conform to `comparisonPath`
        // - comparisonWildcardValues: list indices which were substituted for wildcard chunks

        // if `comparisonPath` is a string:
        if (!Array.isArray(comparisonPath)) {
          return [{
            path: comparisonPath,
            pathWildcardValues: [],
            comparisonWildcardValues: []
          }];
        }
        // else: `comparisonPath` is actually an array
        var comparisonChunks = comparisonPath;
        // if `comparisonChunks` do not contain any `null` chunk (= wildcard):
        // array notation is not needed, convert to string notation
        if (comparisonChunks.indexOf(null) === -1) {
          return [{
            path: comparisonChunks.join('/'),
            pathWildcardValues: [],
            comparisonWildcardValues: []
          }];
        }
        // else: `comparisonChunks` contain a `null` chunk
        // compare each path in `pathDict` to `comparisonChunks`
        // `null` is a wildcard for comparison chunks (every path chunk is equal to it)
        return compareChunks(paths, comparisonChunks, {
          comparisonWildcard: null
        });
      }
      function compareChunks(paths, comparisonChunks, opt) {
        var pathWildcard = opt.pathWildcard,
          comparisonWildcard = opt.comparisonWildcard;
        var filteredPaths = []; // result array = paths that conform to `comparisonPath`
        var numComparisonChunks = comparisonChunks.length;
        var numPaths = paths.length;
        for (var i = 0; i < numPaths; i++) {
          var currentPath = paths[i];
          var pathChunks = getPathChunks(currentPath);
          var numPathChunks = pathChunks.length;
          // if the number of path chunks doesn't match, skip to next path
          if (numPathChunks !== numComparisonChunks) continue;
          // else: the number of path chunks matches
          // compare path chunks one by one
          var isEqual = true;
          var pathWildcardValues = [];
          var comparisonWildcardValues = [];
          for (var j = 0; j < numPathChunks; j++) {
            var currentChunk = pathChunks[j];
            var comparisonChunk = comparisonChunks[j];
            var isPathWildcard = currentChunk === pathWildcard;
            var isComparisonWildcard = comparisonChunk === comparisonWildcard;
            // does `currentChunk` equal `comparisonChunk`?
            // if any chunk doesn't equal, skip out of comparison
            if (currentChunk !== comparisonChunk && !isPathWildcard && !isComparisonWildcard) {
              isEqual = false;
              break;
            }
            // if we encountered a wildcard chunk, save the value of the other chunk
            if (isPathWildcard) {
              pathWildcardValues.push(comparisonChunk);
            } else if (isComparisonWildcard) {
              comparisonWildcardValues.push(currentChunk);
            }
          }
          // if all chunks are equal, add `currentPath` to result array
          if (isEqual) {
            filteredPaths.push({
              path: currentPath,
              pathWildcardValues: pathWildcardValues,
              comparisonWildcardValues: comparisonWildcardValues
            });
          }
        }
        return filteredPaths;
        function getPathChunks(pathToSplit) {
          // split string paths to an array, keep array paths untouched
          if (!Array.isArray(pathToSplit)) return pathToSplit.split('/');
          return pathToSplit;
        }
      }
      function getAttribute(attributes, path) {
        // if the path is flat, and leads to an attribute, return it (shortcut)
        var attribute = attributes[path];
        if (attribute != null) return attribute;
        // else: path is not flat
        // that must mean that the path points into an object, a list, or a generic object
        // find the definition that corresponds to our path
        var pathChunks = path.split('/');
        var numPathChunks = pathChunks.length;
        // start with the flat attribute
        var currentCompositePath = pathChunks[0];
        attribute = attributes[currentCompositePath];
        var previouslyFoundAttribute = attribute;
        // continue with the second chunk of the path:
        for (var i = 1; i < numPathChunks; i++) {
          var pathChunk = pathChunks[i];
          if (attribute === undefined) {
            // we failed to find an attribute at `currentCompositePath` in the previous iteration
            // - this happens when `currentCompositePath` points into a flattened path
            // - move one level deeper in the flattened path by appending current `pathChunk`
            currentCompositePath += '/' + pathChunk;
            if (previouslyFoundAttribute === undefined) {
              // the flattened path segment occurs at the very beginning of the path
              // find attribute within initial `attributes`
              attribute = attributes[currentCompositePath];
            } else {
              // the flattened path segment occurs elsewhere
              // find attribute within `previouslyFoundAttribute`
              attribute = previouslyFoundAttribute[currentCompositePath];
            }
            continue;
          }
          // else: we have found an attribute in the previous iteration
          previouslyFoundAttribute = attribute;
          // was the previous attribute an object, a list, or a generic object?
          if (attribute.type === 'object' && attribute.properties) {
            // the previous attribute was an object
            // objects have `properties` - go inside
            // return the property named like the current `pathChunk`
            attribute = attribute.properties[pathChunk];
          } else if (attribute.type === 'list' && attribute.item) {
            // the previous attribute was a list
            // lists have `item` - the current `pathChunk` must be index
            // the definition is shared by all indices, so return `item`
            attribute = attribute.item;
          } else if (typeof attribute.type !== 'string') {
            // the previous attribute was a generic object
            // properties are defined immediately in `attribute`
            // return the property named like the current `pathChunk`
            attribute = attribute[pathChunk];
          } else {
            // there is a `type` with a string value among `attribute` properties
            // = `attribute` is an input field definition
            // = return `attribute` immediately
            break;
          }
          // we found an attribute at `currentCompositePath`
          // - reset `currentCompositePath` with current `pathChunk`
          currentCompositePath = pathChunk;
        }
        return attribute;
      }
    },
    // unset a model property
    unsetProperty: function unsetProperty(path, opt) {
      var cell = this.getModel();
      var pathArray = path.split('/');
      var attribute = pathArray[0];
      var followingPath = pathArray.slice(1).join('/');
      opt = opt || {};
      opt.inspector = this.cid;
      opt['inspector_' + this.cid] = true; // kept for backwards compatibility

      if (path === 'attrs') {
        // Unsetting an attrs property requires to re-render the view.
        // The cell.removeAttr() does it for us.
        cell.removeAttr(followingPath, opt);
      } else if (path === attribute) {
        // Unsetting a primitive object. Shortcut.
        cell.unset(attribute, opt);
      } else {
        // Unsetting a nested property.
        var oldValue = cell.get(attribute);
        // if `oldValue === undefined`, then `util.unsetByPath()` may fail
        // - so in that case, short-circuit to `newValue = undefined`
        var newValue = oldValue !== undefined ? core_mjs.util.unsetByPath(oldValue, followingPath, '/') : undefined;
        cell.set(attribute, newValue, opt);
      }
    },
    getOptions: function getOptions($attribute) {
      if ($attribute.length === 0) return undefined;
      var path = $attribute.attr('data-attribute');
      return this.getOptionsFromPath(path);
    },
    markForRemoval: function markForRemoval(path, storage) {
      var listPath = this.findParentListByPath(path);
      if (listPath) {
        var itemPath = path.substr(listPath.length + 1);
        var index = parseInt(itemPath, 10);
        if (Number.isFinite(index)) {
          storage['remove'][listPath] = storage['remove'][listPath] || [];
          if (!storage['remove'][listPath].includes(index)) {
            storage['remove'][listPath].push(index);
          }
        }
      }
    },
    markForUpdate: function markForUpdate(path, storage, value, listPath) {
      var itemPath = path.substr(listPath.length + 1);
      if (storage.update[listPath]) {
        core_mjs.util.setByPath(storage.update[listPath].value, itemPath, value, '/');
      }
    },
    updateCell: function updateCell(attrNode, attrPath, opt) {
      var cell = this.getModel();
      var byPath = {};
      if (attrNode) {
        // We are updating only one specific attribute
        byPath[attrPath] = $(attrNode);
      } else {
        // No parameters given. We are updating all attributes
        byPath = this._byPath;
      }
      this.startBatchCommand();
      var valuesByPath = {};
      var listChanges = {
        update: {},
        remove: {}
      };
      core_mjs.util.forIn(byPath, function ($attribute, path) {
        if ($attribute.closest('.field').hasClass('hidden')) return;
        var type = $attribute.attr('data-type');
        var overwriteAttr = $attribute.attr('data-overwrite');
        var overwrite = overwriteAttr !== 'false' && overwriteAttr !== undefined;
        var isAdeptForRemoval = $attribute.hasClass('remove');
        switch (type) {
          case 'list':
            // Do not empty the list (and trigger change event) if we have at
            // least one item in the list. It is not only desirable but necessary.
            // An example is when an element has ports. If we emptied the list
            // and then reconstructed it again, all the links connected to the ports
            // will get lost as the element with ports will think the ports disappeared
            // first.
            if (isAdeptForRemoval) {
              this.markForRemoval(path, listChanges);
            }
            break;
          case 'object':
            // For objects, all is handled in the actual inputs.
            if (isAdeptForRemoval) {
              this.markForRemoval(path, listChanges);
            }
            break;
          default:
            if (!this.validateInput(type, $attribute[0], path)) return;
            var rawValue = this.getFieldValue($attribute[0], type);
            var value = this.parse(type, rawValue, $attribute[0]);
            var options = this.getOptionsFromPath(path);
            if (options.valueRegExp) {
              var oldValue = core_mjs.util.getByPath(cell.attributes, path, '/') || options.defaultValue;
              value = oldValue.replace(new RegExp(options.valueRegExp), '$1' + value + '$3');
            }
            if (isAdeptForRemoval) {
              this.markForRemoval(path, listChanges);
            } else {
              var parent = options.parent;
              if (parent && parent.type === 'object' && parent.overwrite !== undefined && parent.overwrite !== false) {
                var objectValue = {};
                var pathArr = path.split('/');
                var key = pathArr[pathArr.length - 1];
                objectValue[key] = value;
                listChanges.update[parent.path] = {
                  value: objectValue,
                  overwrite: true
                };
              } else {
                valuesByPath[path] = {
                  value: value,
                  overwrite: overwrite
                };
              }
            }
            break;
        }
      }.bind(this));

      // Set all the values on the model.
      core_mjs.util.forIn(valuesByPath, function (val, path) {
        this.setProperty(path, val.value, core_mjs.util.assign({
          overwrite: val.overwrite
        }, opt));
      }.bind(this));

      // list of paths for remove - "deepest" first
      var pathsToRemove = core_mjs.util.sortBy(Object.keys(listChanges.remove), function (item) {
        return item.split('/').length;
      }).reverse();

      // Set all the arrays with all its items on the model now.
      pathsToRemove.forEach(function (path) {
        var indexes = listChanges.remove[path];
        this.removeProperty(path, indexes, core_mjs.util.assign({
          rewrite: true
        }, opt));
      }.bind(this));
      core_mjs.util.forIn(listChanges.update, function (items, list) {
        this.setProperty(list, this.compactDeep(items.value), core_mjs.util.assign({
          rewrite: true,
          overwrite: items.overwrite
        }, opt));
      }.bind(this));

      // Refresh inspector
      this.updateFieldsVisibility();
      this.updateGroupsVisibility();
      this.stopBatchCommand();
    },
    compactDeep: function compactDeep(items) {
      if (Array.isArray(items)) {
        return items.reduce(function (res, item) {
          if (item) {
            res.push(this.compactDeep(item));
          }
          return res;
        }.bind(this), []);
      }
      return items;
    },
    // Find the first list on the given path (exclude the list determined by the path itself).
    // @return path
    findParentListByPath: function findParentListByPath(path) {
      var pathArray = path.split('/');
      pathArray.pop();
      var inputsPathArray = pathArray;
      while (inputsPathArray.length) {
        var inputOptions = this.getOptionsFromPath(inputsPathArray.join('/'));
        if (inputOptions && inputOptions.type === 'list') {
          return pathArray.slice(0, inputsPathArray.length).join('/');
        }
        inputsPathArray.pop();
      }
      return null;
    },
    getOptionsFromPath: function getOptionsFromPath(path) {
      var pathArray = path.split('/');
      var options = this.expandAttributes;
      var parent;
      var parentPath = [];
      while (pathArray.length) {
        var part;
        var partPrev = part;
        if (options && options.type === 'object') {
          part = 'properties';
        } else {
          part = pathArray.shift();
          if (pathArray.length || options.type === 'list') {
            parent = options;
            parentPath.push(part);
          }
        }
        var isNumeric = !Number.isNaN(parseInt(part));
        part = isNumeric && options.type === 'list' ? 'item' : part;
        if (Object(options) === options && (part in options || options[path])) {
          options = options[part] || options[path];
        } else {
          return {};
        }
      }
      options = core_mjs.util.assign({}, options);
      parent = core_mjs.util.assign({}, parent);
      parent.path = parentPath.join('/');
      if (partPrev && partPrev === 'properties') {
        parent.type = 'object';
      }
      options.parent = parent;
      return options;
    },
    getFieldValue: function getFieldValue(attribute, type) {
      if (core_mjs.util.isFunction(this.options.getFieldValue)) {
        var fieldValue = this.options.getFieldValue(attribute, type, this);
        if (fieldValue) {
          return fieldValue.value;
        }
      }
      var $attribute = $(attribute);
      switch (type) {
        case 'select-box':
        case 'color-palette':
        case 'select-button-group':
          var path = $attribute.attr('data-attribute');
          return this.widgets[path].getSelectionValue();
        case 'content-editable':
          return $attribute.html()
          // replace newlines for end-of-line tags:
          // - Chrome, Safari: <br> => \n
          // - IE: </p> => \n
          // - IE10 empty line: <p>&nbsp;</p> => <p>\n
          // - IE11 empty line: <p><br></p> => <p>\n
          // - Firefox: </div> => \n
          // - Firefox empty line: <div><br></div> => <div>\n
          .replace(/((<br\s*\/*>)?<\/div>)|(((&nbsp;)|(<br\s*\/*>))?<\/p>)|(<br\s*\/*>)/ig, '\n')
          // remove any remaining tags:
          // - IE: remove all <p> (line beginning)
          // - Firefox: remove all <div> (line beginning)
          .replace(/(<([^>]+)>)/ig, '')
          // replace html entities with plain text:
          // - mostly convert all various &nbsp; sequences to actual spaces
          .replace(/&(\w+);/ig, this.replaceHTMLEntity)
          // remove last newline:
          .replace(/\n$/, '');
        default:
          return $attribute.val();
      }
    },
    removeProperty: function removeProperty(path, indexes, opt) {
      var model = this.getModel();
      var prop = core_mjs.dia.Cell.prototype.prop;
      var current = prop.call(model, path);
      if (!current) {
        // this is usual when live == false
        return;
      }
      var updated = current.reduce(function (res, item, i) {
        if (!indexes.includes(i)) {
          res.push(item);
        }
        return res;
      }, []);
      var isTopLevelAttr = this.flatAttributes[path];
      if (Array.isArray(updated) && updated.length === 0 && !isTopLevelAttr) {
        updated = null;
      }
      prop.call(model, path, updated, opt);
    },
    setProperty: function setProperty(path, value, opt) {
      opt = opt || {};
      opt.inspector = this.cid;

      // The model doesn't have to be a JointJS cell necessarily. It could be
      // an ordinary Backbone.Model and such would have no method 'prop'.
      var prop = core_mjs.dia.Cell.prototype.prop;
      var model = this.getModel();
      var overwrite = opt.overwrite || false;
      if (opt.previewDone) {
        // If we're finished with the preview mode, first set silently the model property to the value
        // before the preview mode has started. This is because we want the outside application
        // to be able to handle the end of the preview (useful when you don't want to
        // store value changes caused by preview to a DB but only want to store the
        // final value after the preview mode has finished).
        prop.call(model, path, opt.originalValue, {
          rewrite: true,
          silent: true
        });
      }
      if (value === undefined) {
        // Method prop can't handle undefined values in right way.
        // The model attributes would stay untouched if try to
        // set a nested property to undefined.
        core_mjs.dia.Cell.prototype.removeProp.call(model, path, opt);
      } else {
        var updated;
        if (core_mjs.util.isObject(value) && !overwrite) {
          var current = prop.call(model, path);
          var targetType = Array.isArray(value) ? [] : {};
          updated = core_mjs.util.merge(targetType, current, value);
        } else {
          updated = core_mjs.util.clone(value);
        }
        if (overwrite) opt.rewrite = true;
        prop.call(model, path, updated, opt);
      }
    },
    // Parse the input `value` based on the input `type`.
    // Override this method if you need your own specific parsing.
    parse: function parse(type, value, targetElement) {
      switch (type) {
        case 'number':
        case 'range':
          value = parseFloat(value);
          break;
        case 'toggle':
          value = targetElement.checked;
          break;
      }
      return value;
    },
    startBatchCommand: function startBatchCommand() {
      if (!this.inBatch) {
        this.inBatch = true;
        var model = this.getModel();
        if (model instanceof core_mjs.dia.Cell) {
          model.startBatch('inspector', {
            cid: this.cid
          });
        }
      }
    },
    stopBatchCommand: function stopBatchCommand() {
      if (this.inBatch) {
        var model = this.getModel();
        if (model instanceof core_mjs.dia.Cell) {
          model.stopBatch('inspector', {
            cid: this.cid
          });
        }
        this.inBatch = false;
      }
    },
    afterRender: function afterRender() {
      this.cacheInputs();
      this.updateFieldsVisibility();
      this.updateGroupsVisibility();
      this.trigger('render');
    },
    afterPartialRender: function afterPartialRender() {
      this.cacheInputs();
      this.updateGroupsVisibility();
      this.trigger('render');
    },
    addListItem: function addListItem(evt) {
      var $addButton = $(evt.target);
      var $attribute = $addButton.parent('[data-attribute]'); // parent element of $collection
      var options = this.getOptions($attribute);

      // New index = index of last list item +1.
      var $collection = $attribute.children('.list-items');
      var $items = $collection.children('.list-item');
      var $lastItem = $items.last();
      var lastIndex = $lastItem.length === 0 ? -1 : parseInt($lastItem.attr('data-index'), 10);
      var index = lastIndex + 1;

      // Append the new item to collection.
      var $addedItem = this.renderListItem({
        index: index,
        options: options
      });
      var path = $attribute.attr('data-attribute') + '/' + index;
      this.renderTemplate($addedItem, options.item, path);
      $collection.append($addedItem);

      // Show or hide the add and delete buttons
      $items = $collection.children('.list-item'); // refresh to include the added item.
      var $validItems = $items.not('.remove');
      var numItems = $validItems.length;
      this.fixListButtons($attribute, numItems, options.min, options.max);
      this.afterPartialRender();
      var focusField = $addedItem[0];
      if (options.item.type !== 'object' && options.item.type !== 'list') {
        focusField = focusField.querySelector('[data-attribute]');
      }
      if (this.options.live) {
        this.updateCell();
      }
      this._focusFieldInternal(options.item, path, focusField);
    },
    deleteListItem: function deleteListItem(evt) {
      var $deleteButton = $(evt.target);
      var $attribute = $deleteButton.closest('[data-attribute]'); // parent element of $collection
      var options = this.getOptions($attribute);

      // Hide and 'remove' the item.
      var $deletedItem = $deleteButton.closest('.list-item');
      $deletedItem.hide();
      $deletedItem.addClass('remove');

      // Find all nested inputs and hide and 'remove' them as well.
      $deletedItem.find('[data-field]').each(function () {
        $(this).hide().addClass('remove');
      });
      $deletedItem.find('[data-attribute]').each(function () {
        $(this).hide().addClass('remove');
      });

      // Show or hide the add and delete buttons
      var $collection = $attribute.children('.list-items');
      var $items = $collection.children('.list-item');
      var $validItems = $items.not('.remove');
      var numItems = $validItems.length;
      this.fixListButtons($attribute, numItems, options.min, options.max);
      this.afterPartialRender();
      if (this.options.live) {
        this.updateCell();
      }
    },
    fixListButtons: function fixListButtons($attribute, current, min, max) {
      var showAdd = function showAdd(current, max) {
        // If max is undefined or invalid, show the add button.
        if (typeof max !== 'number') return true;

        // If current value is undefined or invalid, show the add button.
        if (typeof current !== 'number') return true;

        // If current value is less than max, show the add button.
        // If current value equals or exceeds max, hide the add button.
        return current < max;
      };
      var showDelete = function showDelete(current, min) {
        // If min is undefined or invalid, show the delete button.
        if (typeof min !== 'number' || min <= 0) return true;

        // If current value is undefined or invalid, hide the delete button.
        if (typeof current !== 'number' || current <= 0) return false;

        // If current value is more than min, show the delete button.
        // If current value is equal to or lower than min, hide the delete button.
        return current > min;
      };

      // Check whether our list is maxed out after adding/removing an item.
      var $addButton = $attribute.children('.btn-list-add');
      var showAddButton = showAdd(current, max);
      if (showAddButton) $addButton.removeClass('hidden'); // we are under the limit, show button
      else $addButton.addClass('hidden'); // we are over the limit, hide button

      // Check whether our list has at least the minimum number of items after adding/removing an item.
      var $deleteButtons = $attribute.children('.list-items').children('.list-item').children('.btn-list-del');
      var showDeleteButtons = showDelete(current, min);
      if (showDeleteButtons) $deleteButtons.removeClass('hidden'); // we are over the limit, show buttons
      else $deleteButtons.addClass('hidden'); // we are under the limit, hide buttons
    },

    bindDocumentEvents: function bindDocumentEvents() {
      var ns = this.getEventNamespace();
      this.$document.on('mouseup' + ns + ' touchend' + ns, this.pointerup);
    },
    unbindDocumentEvents: function unbindDocumentEvents() {
      this.$document.off(this.getEventNamespace());
    },
    pointerdown: function pointerdown(evt) {
      evt.stopPropagation();
      this.bindDocumentEvents();
      this.startBatchCommand();
      this._$activeField = $(evt.currentTarget).addClass('is-in-action');
    },
    pointerup: function pointerup() {
      this.unbindDocumentEvents();
      // Start a batch command on `mousedown` over the inspector and stop it when the mouse is
      // released anywhere in the document. This prevents setting attributes in tiny steps
      // when e.g. a value is being adjusted through a slider. This gives other parts
      // of the application a chance to treat several little changes as one change.
      // Consider e.g. the CommandManager plugin.
      this.stopBatchCommand();
      if (this._$activeField) {
        this._$activeField.removeClass('is-in-action');
        this._$activeField = null;
      }
    },
    pointerfocusin: function pointerfocusin(evt) {
      evt.stopPropagation();
      $(evt.currentTarget).addClass('is-focused');
    },
    pointerfocusout: function pointerfocusout(evt) {
      evt.stopPropagation();
      $(evt.currentTarget).removeClass('is-focused');
    },
    onRemove: function onRemove() {
      this.unbindDocumentEvents();
      this.removeWidgets();
      if (this === this.constructor.instance) {
        this.constructor.instance = null;
      }
    },
    removeWidgets: function removeWidgets() {
      var widgets = this.widgets;
      for (var path in widgets) {
        widgets[path].remove();
      }
      this.widgets = {};
    },
    onGroupLabelClick: function onGroupLabelClick(evt) {
      // Prevent default action for iPad not to handle this event twice.
      evt.preventDefault();
      if (!this.options.multiOpenGroups) {
        this.closeGroups();
      }
      var $group = $(evt.target).closest('.group');
      this.toggleGroup($group);
    },
    toggleGroup: function toggleGroup(name) {
      var $group = core_mjs.util.isString(name) ? this.$('.group[data-name="' + name + '"]') : $(name);
      if ($group.hasClass('closed')) {
        this.openGroup($group);
      } else {
        this.closeGroup($group);
      }
    },
    closeGroup: function closeGroup(name, opt) {
      opt = opt || {};
      var $group = core_mjs.util.isString(name) ? this.$('.group[data-name="' + name + '"]') : $(name);
      if (opt.init || !$group.hasClass('closed')) {
        $group.addClass('closed');
        this.trigger('group:close', $group.data('name'), opt);
      }
    },
    openGroup: function openGroup(name, opt) {
      opt = opt || {};
      var $group = core_mjs.util.isString(name) ? this.$('.group[data-name="' + name + '"]') : $(name);
      if (opt.init || $group.hasClass('closed')) {
        $group.removeClass('closed');
        this.trigger('group:open', $group.data('name'), opt);
      }
    },
    closeGroups: function closeGroups() {
      for (var i = 0, n = this.$groups.length; i < n; i++) {
        this.closeGroup(this.$groups[i]);
      }
    },
    openGroups: function openGroups() {
      for (var i = 0, n = this.$groups.length; i < n; i++) {
        this.openGroup(this.$groups[i]);
      }
    },
    // Expressions

    COMPOSITE_OPERATORS: ['not', 'and', 'or', 'nor'],
    PRIMITIVE_OPERATORS: ['eq', 'ne', 'regex', 'text', 'lt', 'lte', 'gt', 'gte', 'in', 'nin', 'equal'],
    _isComposite: function _isComposite(expr) {
      return core_mjs.util.intersection(this.COMPOSITE_OPERATORS, Object.keys(expr)).length > 0;
    },
    _isPrimitive: function _isPrimitive(expr) {
      var operators = Object.keys(this.options.operators).concat(this.PRIMITIVE_OPERATORS);
      return core_mjs.util.intersection(operators, Object.keys(expr)).length > 0;
    },
    _evalCustomPrimitive: function _evalCustomPrimitive(name, value, args, path) {
      // Operator signature --> function(cell, value, argument*) {}
      return !!this.options.operators[name].apply(this, [this.getModel(), value].concat(args).concat([path]));
    },
    _evalPrimitive: function _evalPrimitive(expr) {
      return Object.keys(expr).reduce(function (res, operator) {
        var condition = expr[operator];
        return Object.keys(condition).reduce(function (res, condPath) {
          var condValue = condition[condPath];
          // This must never get a `condPath` with a placeholder!
          var val = this.getCellAttributeValue(condPath);

          // Let's check if this is a custom operator.
          if (core_mjs.util.isFunction(this.options.operators[operator])) {
            // Note that custom operators can replace the existing primitives.
            return this._evalCustomPrimitive(operator, val, condValue, condPath);
          }
          switch (operator) {
            case 'eq':
              return condValue == val;
            case 'ne':
              return condValue != val;
            case 'regex':
              return new RegExp(condValue).test(val);
            case 'text':
              return !condValue || core_mjs.util.isString(val) && val.toLowerCase().indexOf(condValue) > -1;
            case 'lt':
              return val < condValue;
            case 'lte':
              return val <= condValue;
            case 'gt':
              return val > condValue;
            case 'gte':
              return val >= condValue;
            case 'in':
              return Array.isArray(condValue) && condValue.includes(val);
            case 'nin':
              return Array.isArray(condValue) && !condValue.includes(val);
            case 'equal':
              return core_mjs.util.isEqual(condValue, val);
            default:
              return res;
          }
        }.bind(this), false);
      }.bind(this), false);
    },
    _evalExpression: function _evalExpression(expr) {
      if (this._isPrimitive(expr)) {
        return this._evalPrimitive(expr);
      }
      return Object.keys(expr).reduce(function (res, operator) {
        var childExpr = expr[operator];
        if (operator == 'not') return !this._evalExpression(childExpr);
        var childExprRes = core_mjs.util.toArray(childExpr).map(this._evalExpression, this);
        switch (operator) {
          case 'and':
            return childExprRes.every(function (e) {
              return !!e;
            });
          case 'or':
            return childExprRes.some(function (e) {
              return !!e;
            });
          case 'nor':
            return !childExprRes.some(function (e) {
              return !!e;
            });
          default:
            return res;
        }
      }.bind(this), false);
    },
    _getBareExpression: function _getBareExpression(expr) {
      return core_mjs.util.omit(expr, 'otherwise', 'dependencies');
    },
    _getExpressionExtras: function _getExpressionExtras(expr) {
      return {
        otherwise: core_mjs.util.clone(expr.otherwise),
        dependencies: core_mjs.util.clone(expr.dependencies)
      };
    },
    _extractVariables: function _extractVariables(expr) {
      if (Array.isArray(expr) || this._isComposite(expr)) {
        return core_mjs.util.toArray(expr).reduce(function (res, childExpr) {
          return res.concat(this._extractVariables(childExpr));
        }.bind(this), []);
      }
      return core_mjs.util.toArray(expr).reduce(function (res, primitive) {
        return Object.keys(primitive);
      }, []);
    },
    isExpressionValid: function isExpressionValid(expr) {
      var bareExpression = this._getBareExpression(expr);
      return this._evalExpression(bareExpression);
    },
    extractExpressionPaths: function extractExpressionPaths(expr) {
      // Additional dependencies can be defined. Useful when we using custom operators and
      // we want the input to be displayed/showed also if this dependency changes.
      var dependencies = expr && expr.dependencies || [];

      // All other dependencies are mentioned inside the expression definition.
      var bareExpression = this._getBareExpression(expr);
      return core_mjs.util.uniq(this._extractVariables(bareExpression).concat(dependencies));
    },
    /**
     * @private
     * @returns {string}
     */
    getGroupsStateKey: function getGroupsStateKey() {
      if (core_mjs.util.isFunction(this.options.stateKey)) {
        return this.options.stateKey(this.getModel());
      }
      throw new Error('Inspector: Option stateKey must be a function');
    },
    /**
     * @public
     * store the current state of groups.
     */
    storeGroupsState: function storeGroupsState() {
      var key = this.getGroupsStateKey();
      var closedGroups = core_mjs.util.toArray(this.$('.group.closed'));
      Inspector.groupStates[key] = closedGroups.map(function (g) {
        return $(g).attr('data-name');
      });
    },
    /**
     * @public
     * get groups which are actually stored as closed in state. This could differ from currently rendered state.
     * @returns {Array.<string>}
     */
    getGroupsState: function getGroupsState() {
      return Inspector.groupStates[this.getGroupsStateKey()];
    },
    /**
     * @public
     * Opens/closes groups regards to the stored state.
     */
    restoreGroupsState: function restoreGroupsState() {
      var processGroups = function processGroups(isClosed, context) {
        core_mjs.util.forIn(context.options.groups, function (group, groupName) {
          isClosed(group, groupName) ? this.closeGroup(groupName) : this.openGroup(groupName);
        }.bind(context));
      };
      var key = this.getGroupsStateKey();
      if (Inspector.groupStates[key]) {
        processGroups(function (group, groupName) {
          return Inspector.groupStates[key].includes(groupName);
        }, this);
      } else {
        processGroups(function (group) {
          return group.closed;
        }, this);
      }
    }
  }, {
    /** @type {Object.<string, Array.<string>>} */
    groupStates: {},
    /** @type Inspector */
    instance: null,
    /**
     * @param {Element|string} container Element or selector
     * @param {Object} opt Inspector options
     * @returns {Inspector}
     */
    create: function create(container, opt) {
      opt = opt || {};
      core_mjs.util.defaults(opt, {
        updateCellOnClose: true,
        restoreGroupsState: true,
        storeGroupsState: true
      });
      var cell = opt.cell || opt.cellView.model;
      var inspector = this.instance;

      // No need to re-render inspector if the cellView didn't change.
      if (!inspector || inspector.getModel() !== cell) {
        // Is there an inspector that has not been removed yet.
        // Note that an inspector can be also removed when the underlying cell is removed.
        if (inspector && inspector.el.parentNode) {
          if (opt.storeGroupsState) {
            inspector.storeGroupsState();
          }

          // Clean up the old inspector.
          if (opt.updateCellOnClose) {
            inspector.updateCell();
          }
          inspector.trigger('close');
          inspector.remove();
        }
        inspector = new this(opt).render();
        this.instance = inspector;
        $(container).html(inspector.el);
        if (opt.restoreGroupsState) {
          inspector.restoreGroupsState();
        }
      }
      return inspector;
    },
    close: function close() {
      var inspector = this.instance;
      if (inspector) {
        var _document = document,
          activeElement = _document.activeElement;
        if ($.contains(inspector.el, activeElement)) activeElement.blur();
        inspector.trigger('close');
        inspector.remove();
      }
    }
  });

  exports.Inspector = Inspector;

}(this.joint.ui = this.joint.ui || {}, $, joint));
