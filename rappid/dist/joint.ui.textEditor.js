/*! JointJS+ v3.6.3 - HTML5 Diagramming Framework

Copyright (c) 2022 client IO

 2022-12-09 


This Source Code Form is subject to the terms of the JointJS+ License
, v. 2.0. If a copy of the JointJS+ License was not distributed with this
file, You can obtain one at http://jointjs.com/license/rappid_v2.txt
 or from the JointJS+ archive as was distributed by client IO. See the LICENSE file.*/


this.joint = this.joint || {};
(function (exports, $, Backbone, core_mjs) {
  'use strict';

  $ = $ && Object.prototype.hasOwnProperty.call($, 'default') ? $['default'] : $;
  Backbone = Backbone && Object.prototype.hasOwnProperty.call(Backbone, 'default') ? Backbone['default'] : Backbone;

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }
  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }
  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }
  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
    return arr2;
  }
  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
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

  var arrayMethodIsStrict = function (METHOD_NAME, argument) {
    var method = [][METHOD_NAME];
    return !!method && fails(function () {
      // eslint-disable-next-line no-useless-call -- required for testing
      method.call(null, argument || function () { return 1; }, 1);
    });
  };

  var $some = arrayIteration.some;


  var STRICT_METHOD = arrayMethodIsStrict('some');

  // `Array.prototype.some` method
  // https://tc39.es/ecma262/#sec-array.prototype.some
  _export({ target: 'Array', proto: true, forced: !STRICT_METHOD }, {
    some: function some(callbackfn /* , thisArg */) {
      return $some(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    }
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

  var $TypeError$d = TypeError;

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
    left: createMethod$2(false),
    // `Array.prototype.reduceRight` method
    // https://tc39.es/ecma262/#sec-array.prototype.reduceright
    right: createMethod$2(true)
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

  var $String$3 = String;

  var toString_1 = function (argument) {
    if (classof(argument) === 'Symbol') throw TypeError('Cannot convert a Symbol value to a string');
    return $String$3(argument);
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

  // TODO: Remove from `core-js@4` since it's moved to entry points








  var SPECIES$4 = wellKnownSymbol('species');
  var RegExpPrototype$2 = RegExp.prototype;

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
        re.constructor[SPECIES$4] = function () { return re; };
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
        if ($exec === regexpExec || $exec === RegExpPrototype$2.exec) {
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
      defineBuiltIn(RegExpPrototype$2, SYMBOL, methods[1]);
    }

    if (SHAM) createNonEnumerableProperty(RegExpPrototype$2[SYMBOL], 'sham', true);
  };

  var charAt$1 = functionUncurryThis(''.charAt);
  var charCodeAt = functionUncurryThis(''.charCodeAt);
  var stringSlice$2 = functionUncurryThis(''.slice);

  var createMethod$3 = function (CONVERT_TO_STRING) {
    return function ($this, pos) {
      var S = toString_1(requireObjectCoercible($this));
      var position = toIntegerOrInfinity(pos);
      var size = S.length;
      var first, second;
      if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
      first = charCodeAt(S, position);
      return first < 0xD800 || first > 0xDBFF || position + 1 === size
        || (second = charCodeAt(S, position + 1)) < 0xDC00 || second > 0xDFFF
          ? CONVERT_TO_STRING
            ? charAt$1(S, position)
            : first
          : CONVERT_TO_STRING
            ? stringSlice$2(S, position, position + 2)
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

  var charAt$2 = stringMultibyte.charAt;

  // `AdvanceStringIndex` abstract operation
  // https://tc39.es/ecma262/#sec-advancestringindex
  var advanceStringIndex = function (S, index, unicode) {
    return index + (unicode ? charAt$2(S, index).length : 1);
  };

  var floor$1 = Math.floor;
  var charAt$3 = functionUncurryThis(''.charAt);
  var replace$1 = functionUncurryThis(''.replace);
  var stringSlice$3 = functionUncurryThis(''.slice);
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
    return replace$1(replacement, symbols, function (match, ch) {
      var capture;
      switch (charAt$3(ch, 0)) {
        case '$': return '$';
        case '&': return matched;
        case '`': return stringSlice$3(str, 0, position);
        case "'": return stringSlice$3(str, tailPos);
        case '<':
          capture = namedCaptures[stringSlice$3(ch, 1, -1)];
          break;
        default: // \d\d?
          var n = +ch;
          if (n === 0) return match;
          if (n > m) {
            var f = floor$1(n / 10);
            if (f === 0) return match;
            if (f <= m) return captures[f - 1] === undefined ? charAt$3(ch, 1) : captures[f - 1] + charAt$3(ch, 1);
            return match;
          }
          capture = captures[n - 1];
      }
      return capture === undefined ? '' : capture;
    });
  };

  var $TypeError$e = TypeError;

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
    throw $TypeError$e('RegExp#exec called on incompatible receiver');
  };

  var REPLACE = wellKnownSymbol('replace');
  var max$1 = Math.max;
  var min$2 = Math.min;
  var concat$1 = functionUncurryThis([].concat);
  var push$2 = functionUncurryThis([].push);
  var stringIndexOf = functionUncurryThis(''.indexOf);
  var stringSlice$4 = functionUncurryThis(''.slice);

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
          stringIndexOf(replaceValue, UNSAFE_SUBSTITUTE) === -1 &&
          stringIndexOf(replaceValue, '$<') === -1
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
          var position = max$1(min$2(toIntegerOrInfinity(result.index), S.length), 0);
          var captures = [];
          // NOTE: This is equivalent to
          //   captures = result.slice(1).map(maybeToString)
          // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
          // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
          // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
          for (var j = 1; j < result.length; j++) push$2(captures, maybeToString(result[j]));
          var namedCaptures = result.groups;
          if (functionalReplace) {
            var replacerArgs = concat$1([matched], captures, position, S);
            if (namedCaptures !== undefined) push$2(replacerArgs, namedCaptures);
            var replacement = toString_1(functionApply(replaceValue, undefined, replacerArgs));
          } else {
            replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
          }
          if (position >= nextSourcePosition) {
            accumulatedResult += stringSlice$4(S, nextSourcePosition, position) + replacement;
            nextSourcePosition = position + matched.length;
          }
        }
        return accumulatedResult + stringSlice$4(S, nextSourcePosition);
      }
    ];
  }, !REPLACE_SUPPORTS_NAMED_GROUPS || !REPLACE_KEEPS_$0 || REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE);

  // `SameValue` abstract operation
  // https://tc39.es/ecma262/#sec-samevalue
  // eslint-disable-next-line es/no-object-is -- safe
  var sameValue = Object.is || function is(x, y) {
    // eslint-disable-next-line no-self-compare -- NaN check
    return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
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

  // call something on iterator step with safe closing on error
  var callWithSafeIterationClosing = function (iterator, fn, value, ENTRIES) {
    try {
      return ENTRIES ? fn(anObject(value)[0], value[1]) : fn(value);
    } catch (error) {
      iteratorClose(iterator, 'throw', error);
    }
  };

  var createProperty = function (object, key, value) {
    var propertyKey = toPropertyKey(key);
    if (propertyKey in object) objectDefineProperty.f(object, propertyKey, createPropertyDescriptor(0, value));
    else object[propertyKey] = value;
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

  var INCORRECT_ITERATION = !checkCorrectnessOfIteration(function (iterable) {
    // eslint-disable-next-line es/no-array-from -- required for testing
    Array.from(iterable);
  });

  // `Array.from` method
  // https://tc39.es/ecma262/#sec-array.from
  _export({ target: 'Array', stat: true, forced: INCORRECT_ITERATION }, {
    from: arrayFrom
  });

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

  var IteratorPrototype$1 = iteratorsCore.IteratorPrototype;





  var returnThis = function () { return this; };

  var iteratorCreateConstructor = function (IteratorConstructor, NAME, next, ENUMERABLE_NEXT) {
    var TO_STRING_TAG = NAME + ' Iterator';
    IteratorConstructor.prototype = objectCreate(IteratorPrototype$1, { next: createPropertyDescriptor(+!ENUMERABLE_NEXT, next) });
    setToStringTag(IteratorConstructor, TO_STRING_TAG, false);
    iterators[TO_STRING_TAG] = returnThis;
    return IteratorConstructor;
  };

  var PROPER_FUNCTION_NAME$1 = functionName.PROPER;
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
    if (PROPER_FUNCTION_NAME$1 && DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
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

  var charAt$4 = stringMultibyte.charAt;





  var STRING_ITERATOR = 'String Iterator';
  var setInternalState$1 = internalState.set;
  var getInternalState$1 = internalState.getterFor(STRING_ITERATOR);

  // `String.prototype[@@iterator]` method
  // https://tc39.es/ecma262/#sec-string.prototype-@@iterator
  iteratorDefine(String, 'String', function (iterated) {
    setInternalState$1(this, {
      type: STRING_ITERATOR,
      string: toString_1(iterated),
      index: 0
    });
  // `%StringIteratorPrototype%.next` method
  // https://tc39.es/ecma262/#sec-%stringiteratorprototype%.next
  }, function next() {
    var state = getInternalState$1(this);
    var string = state.string;
    var index = state.index;
    var point;
    if (index >= string.length) return createIterResultObject(undefined, true);
    point = charAt$4(string, index);
    state.index += point.length;
    return createIterResultObject(point, false);
  });

  var $TypeError$f = TypeError;
  var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF; // 2 ** 53 - 1 == 9007199254740991

  var doesNotExceedSafeInteger = function (it) {
    if (it > MAX_SAFE_INTEGER) throw $TypeError$f('Maximum allowed index exceeded');
    return it;
  };

  var SPECIES$5 = wellKnownSymbol('species');

  var arrayMethodHasSpeciesSupport = function (METHOD_NAME) {
    // We can't use this feature detection in V8 since it causes
    // deoptimization and serious performance degradation
    // https://github.com/zloirock/core-js/issues/677
    return engineV8Version >= 51 || !fails(function () {
      var array = [];
      var constructor = array.constructor = {};
      constructor[SPECIES$5] = function () {
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

  var SPECIES$6 = wellKnownSymbol('species');
  var $Array$2 = Array;
  var max$2 = Math.max;

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
        if (isConstructor(Constructor) && (Constructor === $Array$2 || isArray(Constructor.prototype))) {
          Constructor = undefined;
        } else if (isObject(Constructor)) {
          Constructor = Constructor[SPECIES$6];
          if (Constructor === null) Constructor = undefined;
        }
        if (Constructor === $Array$2 || Constructor === undefined) {
          return arraySlice(O, k, fin);
        }
      }
      result = new (Constructor === undefined ? $Array$2 : Constructor)(max$2(fin - k, 0));
      for (n = 0; k < fin; k++, n++) if (k in O) createProperty(result, n, O[k]);
      result.length = n;
      return result;
    }
  });

  var MATCH = wellKnownSymbol('match');

  // `IsRegExp` abstract operation
  // https://tc39.es/ecma262/#sec-isregexp
  var isRegexp = function (it) {
    var isRegExp;
    return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : classofRaw(it) == 'RegExp');
  };

  var $Array$3 = Array;
  var max$3 = Math.max;

  var arraySliceSimple = function (O, start, end) {
    var length = lengthOfArrayLike(O);
    var k = toAbsoluteIndex(start, length);
    var fin = toAbsoluteIndex(end === undefined ? length : end, length);
    var result = $Array$3(max$3(fin - k, 0));
    for (var n = 0; k < fin; k++, n++) createProperty(result, n, O[k]);
    result.length = n;
    return result;
  };

  var UNSUPPORTED_Y$2 = regexpStickyHelpers.UNSUPPORTED_Y;
  var MAX_UINT32 = 0xFFFFFFFF;
  var min$3 = Math.min;
  var $push = [].push;
  var exec$1 = functionUncurryThis(/./.exec);
  var push$3 = functionUncurryThis($push);
  var stringSlice$5 = functionUncurryThis(''.slice);

  // Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
  // Weex JS has frozen built-in prototypes, so use try / catch wrapper
  var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = !fails(function () {
    // eslint-disable-next-line regexp/no-empty-group -- required for testing
    var re = /(?:)/;
    var originalExec = re.exec;
    re.exec = function () { return originalExec.apply(this, arguments); };
    var result = 'ab'.split(re);
    return result.length !== 2 || result[0] !== 'a' || result[1] !== 'b';
  });

  // @@split logic
  fixRegexpWellKnownSymbolLogic('split', function (SPLIT, nativeSplit, maybeCallNative) {
    var internalSplit;
    if (
      'abbc'.split(/(b)*/)[1] == 'c' ||
      // eslint-disable-next-line regexp/no-empty-group -- required for testing
      'test'.split(/(?:)/, -1).length != 4 ||
      'ab'.split(/(?:ab)*/).length != 2 ||
      '.'.split(/(.?)(.?)/).length != 4 ||
      // eslint-disable-next-line regexp/no-empty-capturing-group, regexp/no-empty-group -- required for testing
      '.'.split(/()()/).length > 1 ||
      ''.split(/.?/).length
    ) {
      // based on es5-shim implementation, need to rework it
      internalSplit = function (separator, limit) {
        var string = toString_1(requireObjectCoercible(this));
        var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
        if (lim === 0) return [];
        if (separator === undefined) return [string];
        // If `separator` is not a regex, use native split
        if (!isRegexp(separator)) {
          return functionCall(nativeSplit, string, separator, lim);
        }
        var output = [];
        var flags = (separator.ignoreCase ? 'i' : '') +
                    (separator.multiline ? 'm' : '') +
                    (separator.unicode ? 'u' : '') +
                    (separator.sticky ? 'y' : '');
        var lastLastIndex = 0;
        // Make `global` and avoid `lastIndex` issues by working with a copy
        var separatorCopy = new RegExp(separator.source, flags + 'g');
        var match, lastIndex, lastLength;
        while (match = functionCall(regexpExec, separatorCopy, string)) {
          lastIndex = separatorCopy.lastIndex;
          if (lastIndex > lastLastIndex) {
            push$3(output, stringSlice$5(string, lastLastIndex, match.index));
            if (match.length > 1 && match.index < string.length) functionApply($push, output, arraySliceSimple(match, 1));
            lastLength = match[0].length;
            lastLastIndex = lastIndex;
            if (output.length >= lim) break;
          }
          if (separatorCopy.lastIndex === match.index) separatorCopy.lastIndex++; // Avoid an infinite loop
        }
        if (lastLastIndex === string.length) {
          if (lastLength || !exec$1(separatorCopy, '')) push$3(output, '');
        } else push$3(output, stringSlice$5(string, lastLastIndex));
        return output.length > lim ? arraySliceSimple(output, 0, lim) : output;
      };
    // Chakra, V8
    } else if ('0'.split(undefined, 0).length) {
      internalSplit = function (separator, limit) {
        return separator === undefined && limit === 0 ? [] : functionCall(nativeSplit, this, separator, limit);
      };
    } else internalSplit = nativeSplit;

    return [
      // `String.prototype.split` method
      // https://tc39.es/ecma262/#sec-string.prototype.split
      function split(separator, limit) {
        var O = requireObjectCoercible(this);
        var splitter = isNullOrUndefined(separator) ? undefined : getMethod(separator, SPLIT);
        return splitter
          ? functionCall(splitter, separator, O, limit)
          : functionCall(internalSplit, toString_1(O), separator, limit);
      },
      // `RegExp.prototype[@@split]` method
      // https://tc39.es/ecma262/#sec-regexp.prototype-@@split
      //
      // NOTE: This cannot be properly polyfilled in engines that don't support
      // the 'y' flag.
      function (string, limit) {
        var rx = anObject(this);
        var S = toString_1(string);
        var res = maybeCallNative(internalSplit, rx, S, limit, internalSplit !== nativeSplit);

        if (res.done) return res.value;

        var C = speciesConstructor(rx, RegExp);

        var unicodeMatching = rx.unicode;
        var flags = (rx.ignoreCase ? 'i' : '') +
                    (rx.multiline ? 'm' : '') +
                    (rx.unicode ? 'u' : '') +
                    (UNSUPPORTED_Y$2 ? 'g' : 'y');

        // ^(? + rx + ) is needed, in combination with some S slicing, to
        // simulate the 'y' flag.
        var splitter = new C(UNSUPPORTED_Y$2 ? '^(?:' + rx.source + ')' : rx, flags);
        var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
        if (lim === 0) return [];
        if (S.length === 0) return regexpExecAbstract(splitter, S) === null ? [S] : [];
        var p = 0;
        var q = 0;
        var A = [];
        while (q < S.length) {
          splitter.lastIndex = UNSUPPORTED_Y$2 ? 0 : q;
          var z = regexpExecAbstract(splitter, UNSUPPORTED_Y$2 ? stringSlice$5(S, q) : S);
          var e;
          if (
            z === null ||
            (e = min$3(toLength(splitter.lastIndex + (UNSUPPORTED_Y$2 ? q : 0)), S.length)) === p
          ) {
            q = advanceStringIndex(S, q, unicodeMatching);
          } else {
            push$3(A, stringSlice$5(S, p, q));
            if (A.length === lim) return A;
            for (var i = 1; i <= z.length - 1; i++) {
              push$3(A, z[i]);
              if (A.length === lim) return A;
            }
            q = p = e;
          }
        }
        push$3(A, stringSlice$5(S, p));
        return A;
      }
    ];
  }, !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC, UNSUPPORTED_Y$2);

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

  // a string of all valid unicode whitespaces
  var whitespaces = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002' +
    '\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

  var replace$2 = functionUncurryThis(''.replace);
  var whitespace = '[' + whitespaces + ']';
  var ltrim = RegExp('^' + whitespace + whitespace + '*');
  var rtrim = RegExp(whitespace + whitespace + '*$');

  // `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation
  var createMethod$4 = function (TYPE) {
    return function ($this) {
      var string = toString_1(requireObjectCoercible($this));
      if (TYPE & 1) string = replace$2(string, ltrim, '');
      if (TYPE & 2) string = replace$2(string, rtrim, '');
      return string;
    };
  };

  var stringTrim = {
    // `String.prototype.{ trimLeft, trimStart }` methods
    // https://tc39.es/ecma262/#sec-string.prototype.trimstart
    start: createMethod$4(1),
    // `String.prototype.{ trimRight, trimEnd }` methods
    // https://tc39.es/ecma262/#sec-string.prototype.trimend
    end: createMethod$4(2),
    // `String.prototype.trim` method
    // https://tc39.es/ecma262/#sec-string.prototype.trim
    trim: createMethod$4(3)
  };

  var trim = stringTrim.trim;


  var charAt$5 = functionUncurryThis(''.charAt);
  var $parseFloat = global_1.parseFloat;
  var Symbol$2 = global_1.Symbol;
  var ITERATOR$5 = Symbol$2 && Symbol$2.iterator;
  var FORCED$1 = 1 / $parseFloat(whitespaces + '-0') !== -Infinity
    // MS Edge 18- broken with boxed symbols
    || (ITERATOR$5 && !fails(function () { $parseFloat(Object(ITERATOR$5)); }));

  // `parseFloat` method
  // https://tc39.es/ecma262/#sec-parsefloat-string
  var numberParseFloat = FORCED$1 ? function parseFloat(string) {
    var trimmedString = trim(toString_1(string));
    var result = $parseFloat(trimmedString);
    return result === 0 && charAt$5(trimmedString, 0) == '-' ? -0 : result;
  } : $parseFloat;

  // `parseFloat` method
  // https://tc39.es/ecma262/#sec-parsefloat-string
  _export({ global: true, forced: parseFloat != numberParseFloat }, {
    parseFloat: numberParseFloat
  });

  // `Number.isNaN` method
  // https://tc39.es/ecma262/#sec-number.isnan
  _export({ target: 'Number', stat: true }, {
    isNaN: function isNaN(number) {
      // eslint-disable-next-line no-self-compare -- NaN check
      return number != number;
    }
  });

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
  var getOwnPropertyDescriptor$3 = objectGetOwnPropertyDescriptor.f;
  var defineProperty$3 = objectDefineProperty.f;

  var trim$1 = stringTrim.trim;

  var NUMBER = 'Number';
  var NativeNumber = global_1[NUMBER];
  var NumberPrototype = NativeNumber.prototype;
  var TypeError$3 = global_1.TypeError;
  var arraySlice$1 = functionUncurryThis(''.slice);
  var charCodeAt$1 = functionUncurryThis(''.charCodeAt);

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
      it = trim$1(it);
      first = charCodeAt$1(it, 0);
      if (first === 43 || first === 45) {
        third = charCodeAt$1(it, 2);
        if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
      } else if (first === 48) {
        switch (charCodeAt$1(it, 1)) {
          case 66: case 98: radix = 2; maxCode = 49; break; // fast equal of /^0b[01]+$/i
          case 79: case 111: radix = 8; maxCode = 55; break; // fast equal of /^0o[0-7]+$/i
          default: return +it;
        }
        digits = arraySlice$1(it, 2);
        length = digits.length;
        for (index = 0; index < length; index++) {
          code = charCodeAt$1(digits, index);
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
        defineProperty$3(NumberWrapper, key, getOwnPropertyDescriptor$3(NativeNumber, key));
      }
    }
    NumberWrapper.prototype = NumberPrototype;
    NumberPrototype.constructor = NumberWrapper;
    defineBuiltIn(global_1, NUMBER, NumberWrapper, { constructor: true });
  }

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

  var MSIE = /MSIE .\./.test(engineUserAgent); // <- dirty ie9- check
  var Function$2 = global_1.Function;

  var wrap = function (scheduler) {
    return MSIE ? function (handler, timeout /* , ...arguments */) {
      var boundArgs = validateArgumentsLength(arguments.length, 1) > 2;
      var fn = isCallable(handler) ? handler : Function$2(handler);
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

  var mergeAttrs = core_mjs.V.mergeAttrs;
  var isEqual = core_mjs.util.isEqual,
    isEmpty = core_mjs.util.isEmpty,
    flattenObject = core_mjs.util.flattenObject,
    setByPath = core_mjs.util.setByPath;
  function getCombinedAnnotationAttrsAtIndex(annotations, index) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var _options$merge = options.merge,
      merge = _options$merge === void 0 ? mergeAttrs : _options$merge;
    var attrs = {};
    annotations.forEach(function (annotation) {
      var start = annotation.start,
        end = annotation.end,
        currentAttrs = annotation.attrs;
      if (
      // The annotation does not have `start` and `end`. Assume it spans
      // the whole text. This allows us to pass default annotations
      // for text that is not spanned by any regular annotation.
      start === undefined && end === undefined || index >= start && index < end) {
        merge(attrs, currentAttrs);
      }
    });
    return attrs;
  }
  function getCombinedAnnotationAttrsBetweenIndexes(annotations, start, end) {
    var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    var _options$delim = options.delim,
      delim = _options$delim === void 0 ? '/' : _options$delim,
      _options$merge2 = options.merge,
      merge = _options$merge2 === void 0 ? mergeAttrs : _options$merge2;
    // Simplify the annotations by removing annotations that are not within the range.
    var annotationsBetweenIndexes = core_mjs.V.findAnnotationsBetweenIndexes(annotations, start, end);
    if (start === end) {
      return getCombinedAnnotationAttrsAtIndex(annotationsBetweenIndexes, start, options);
    }
    var commonAttrs;
    for (var i = start; i < end; i++) {
      var attrs = getCombinedAnnotationAttrsAtIndex(annotationsBetweenIndexes, i, options);
      if (commonAttrs && !isEqual(commonAttrs, attrs)) {
        // Attributes differ. Remove those that differ from commonAttrs.
        commonAttrs = flattenObject(merge({}, commonAttrs), delim);
        attrs = flattenObject(merge({}, attrs), delim);
        var result = {};
        for (var key in attrs) {
          if (commonAttrs[key] === attrs[key]) {
            setByPath(result, key, attrs[key], delim);
          }
        }
        commonAttrs = result;
      } else {
        commonAttrs = attrs;
      }
    }
    return commonAttrs;
  }
  function normalizeAnnotations(annotations) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var _options$compare = options.compare,
      compare = _options$compare === void 0 ? isEqual : _options$compare;
    var normalizedAnnotations = [];
    var maxEnd = annotations.reduce(function (maxEnd, annotation) {
      var end = annotation.end;
      return end === undefined ? maxEnd : Math.max(maxEnd, end);
    }, 0);
    for (var i = -1, n = maxEnd; i < n; i++) {
      var currentAttrs = null;
      for (var j = i + 1; j <= n; j++) {
        var rangeAttrs = getCombinedAnnotationAttrsBetweenIndexes(annotations, j - 1, j, options);
        if (!currentAttrs) {
          currentAttrs = rangeAttrs;
          continue;
        }
        if (compare(rangeAttrs, currentAttrs)) continue;
        j--;
        if (!isEmpty(currentAttrs)) {
          normalizedAnnotations.push({
            start: i,
            end: j,
            attrs: currentAttrs
          });
        }
        currentAttrs = null;
        i = j;
      }
      if (!currentAttrs) continue;
      if (i < n && !isEmpty(currentAttrs)) {
        normalizedAnnotations.push({
          start: i,
          end: n,
          attrs: currentAttrs
        });
      }
      break;
    }
    return normalizedAnnotations;
  }

  var TextEditor = core_mjs.mvc.View.extend({
    options: {
      text: undefined,
      // The SVG text element on which we want to enable inline text editing.
      newlineCharacterBBoxWidth: 10,
      // The width of the new line character. Used for selection of a newline.
      placeholder: undefined,
      // The placeholder in case the text gets emptied.
      focus: true,
      // Determines if the textarea should gain focus. In some cases, this is not intentional - e.g. if we use the ui.TextEditor for displaying remote cursor.
      debug: false,
      selectAllThreshold: 20,
      useNativeSelection: true,
      annotateUrls: false,
      urlAnnotation: {
        attrs: {
          'class': 'url-annotation',
          fill: 'lightblue',
          'text-decoration': 'underline'
        }
      },
      textareaAttributes: {
        autocorrect: 'off',
        autocomplete: 'off',
        autocapitalize: 'off',
        spellcheck: 'false',
        tabindex: '0'
      }
    },
    className: 'text-editor',
    events: {
      'keyup textarea': 'onKeyup',
      'input textarea': 'onInput',
      'copy textarea': 'onCopy',
      'cut textarea': 'onCut',
      'paste textarea': 'onPaste',
      'mousedown .char-selection-box': 'onMousedown',
      'dblclick .char-selection-box': 'onDoubleClick',
      'click .char-selection-box': 'onTripleClick'
    },
    selection: {
      start: null,
      end: null
    },
    selecting: false,
    _textCursor: null,
    // 10ms seems to work in all browsers (0ms does not work in Firefox)
    AFTER_KEYDOWN_DELAY: 10,
    DEFAULT_FONT_SIZE: 12,
    init: function init() {
      core_mjs.util.bindAll(this, 'onMousedown', 'onMousemove', 'onMouseup', 'onDoubleClick', 'onTripleClick', 'onKeydown', 'onAfterPaste', 'onAfterKeydown', 'onDocumentPointerdown');
      var text = this.options.text;
      if (!text) throw new Error('ui.TextEditor: text option is mandatory');
      this.setTextElement(text);
      document.addEventListener('pointerdown', this.onDocumentPointerdown, {
        capture: true
      });
      $(document.body).on('mousemove', this.onMousemove);
      $(document.body).on('mouseup', this.onMouseup);
      $(document.body).on('keydown', this.onKeydown);

      // If $viewport is not set, Chrome prints a warning about "Discontiguous Selection" and selections are not rendered.
      this.$viewport = $(text);
      if (this.options.annotations) {
        this.setAnnotations(this.options.annotations);
      }
    },
    setTextElement: function setTextElement(textElement) {
      this.options.text = textElement;
      this.bindTextElement(textElement);
    },
    bindTextElement: function bindTextElement(textElement) {
      this.unbindTextElement();
      if (!textElement) return;
      var $elText = $(textElement);
      $elText.on('mousedown', this.onMousedown);
      $elText.on('dblclick', this.onDoubleClick);
      $elText.on('click', this.onTripleClick);
      this.elText = textElement;
    },
    unbindTextElement: function unbindTextElement() {
      var elText = this.elText;
      if (!elText) return;
      var $elText = $(elText);
      $elText.off('mousedown', this.onMousedown);
      $elText.off('dblclick', this.onDoubleClick);
      $elText.off('click', this.onTripleClick);
      this.elText = null;
    },
    // @public
    render: function render(root) {
      // The caret (cursor), displayed as a thin <div> styled in CSS.
      this.$caret = $('<div>', {
        'class': 'caret'
      });

      // The container for selection boxes.
      this.$selection = $('<div>');
      // One selection box covering one character.
      this.$selectionBox = $('<div>', {
        'class': 'char-selection-box'
      });
      this.$el.append(this.$caret, this.$selection);
      this.$textareaContainer = $('<div>', {
        'class': 'textarea-container'
      });
      this.$textarea = $('<textarea>', this.options.textareaAttributes);
      this.textarea = this.$textarea[0];
      this._textContent = this.textarea.value = this.getTextContent();
      this._textareaValueBeforeInput = this.textarea.value;
      this.$textareaContainer.append(this.textarea);
      if (this.options.focus) {
        this.$el.append(this.$textareaContainer);
      }

      // First add the container element to the `<body>`, otherwise
      // the `focus()` called afterwards would not work.
      $(root || document.body).append(this.$el);
      var vText = core_mjs.V(this.options.text);
      var bbox = vText.bbox();
      this.$textareaContainer.css({
        left: bbox.x,
        top: bbox.y
      });
      this.focus();

      // TODO: This should be optional?
      this._textCursor = vText.attr('cursor');
      vText.attr('cursor', 'text');
      this.selectAll();
      return this;
    },
    annotateURLBeforeCaret: function annotateURLBeforeCaret(selectionStart) {
      if (selectionStart === 0) return false;
      // If whitespace character was added, check if there is not a URL
      // before the inserted text. If yes, annotate it.
      var index = Math.max(selectionStart - 1, 0);
      var urlBoundary = this.getURLBoundary(index);
      var annotations = this.getAnnotations() || [];
      if (urlBoundary) {
        this.annotateURL(annotations, urlBoundary[0], urlBoundary[1]);
        return true;
      }
      var annotationsAtIndex = core_mjs.V.findAnnotationsAtIndex(annotations, index);
      if (annotationsAtIndex.some(function (a8n) {
        return a8n.url;
      })) {
        return true;
      }
      return false;
    },
    hasSelection: function hasSelection() {
      return core_mjs.util.isNumber(this.selection.start) && core_mjs.util.isNumber(this.selection.end) && this.selection.start !== this.selection.end;
    },
    textContentHasChanged: function textContentHasChanged() {
      return this._textContent !== this.textarea.value;
    },
    restoreTextAreaSelectionDirection: function restoreTextAreaSelectionDirection() {
      if (this._selectionDirection) {
        this.textarea.selectionDirection = this._selectionDirection;
      }
    },
    storeSelectionDirection: function storeSelectionDirection() {
      this._selectionDirection = this.textarea.selectionDirection;
    },
    updateSelectionFromTextarea: function updateSelectionFromTextarea() {
      var _this$textarea = this.textarea,
        selectionStart = _this$textarea.selectionStart,
        selectionEnd = _this$textarea.selectionEnd;
      if (selectionStart === selectionEnd) {
        this.setCaret(selectionStart);
      } else {
        this.select(selectionStart, selectionEnd);
      }
    },
    textSelectionHasChanged: function textSelectionHasChanged() {
      var selection = this.selection,
        textarea = this.textarea;
      if (!selection || !textarea) return false;
      return selection.start !== textarea.selectionStart || selection.end !== textarea.selectionEnd;
    },
    isModifierKey: function isModifierKey(evt) {
      var modifiers = [16,
      // 'shiftKey',
      18,
      // 'altKey',
      17,
      // 'ctrlKey',
      91 // 'metaKey'
      ];

      return modifiers.some(function (modifier) {
        return evt.which === modifier;
      });
    },
    isArrowKey: function isArrowKey(evt) {
      return evt.which >= 37 && evt.which <= 40;
    },
    copyToClipboard: function copyToClipboard() {
      var copySupported = document.queryCommandSupported && document.queryCommandSupported('copy');
      if (copySupported) {
        this._copied = true;
        document.execCommand('copy');
      }
    },
    // @public
    // Find all the annotations in the `annotations` array that the
    // cursor at `selectionStart` position falls into.
    findAnnotationsUnderCursor: function findAnnotationsUnderCursor(annotations, selectionStart) {
      return core_mjs.V.findAnnotationsAtIndex(annotations, selectionStart);
    },
    // @public
    // Find all the annotations that fall into the selection range specified by `selectionStart` and `selectionEnd`.
    // This method assumes the selection range is normalized.
    findAnnotationsInSelection: function findAnnotationsInSelection(annotations, selectionStart, selectionEnd) {
      return core_mjs.V.findAnnotationsBetweenIndexes(annotations, selectionStart, selectionEnd);
    },
    // @private
    // This function infers the type of a text operation based solely on the selection indices
    // before and after the text input changed.
    inferTextOperationType: function inferTextOperationType(selectionBeforeInput, selectionAfterInput, diffLength) {
      if (selectionBeforeInput.start === selectionBeforeInput.end && selectionAfterInput.start === selectionAfterInput.end && diffLength > 0) {
        return 'insert';
      } else if (selectionBeforeInput.start === selectionBeforeInput.end && selectionAfterInput.start === selectionAfterInput.end && diffLength <= 0) {
        return 'delete-single';
      } else if (selectionBeforeInput.start !== selectionBeforeInput.end && selectionAfterInput.start === selectionAfterInput.end && selectionAfterInput.start === selectionBeforeInput.start) {
        return 'delete';
      } else if (selectionBeforeInput.start !== selectionBeforeInput.end && selectionAfterInput.start !== selectionBeforeInput.start) {
        // Delete followed by insert. The user might have selected a range and then started typing or pasting.
        return 'delete-insert';
      }
      return undefined;
    },
    // @private
    // Modify `annotations` (indices of all the affected annotations)
    // based on the user action defined by `selectionBeforeInput`, `selectionAfterInput` and `diffLength`.
    // For example, when the user inserts a new character, we want the new character to inherit
    // styling attributes (annotation) from the previous character (extend the affected annotation end index) and shift
    // all the following annotations by one to the right.
    // Note that this function modifies the original `annotations` array and returns it.
    annotate: function annotate(annotations, selectionBeforeInput, selectionAfterInput, diffLength) {
      var newAnnotations = [];
      var opType = this.inferTextOperationType(selectionBeforeInput, selectionAfterInput, diffLength);
      core_mjs.util.toArray(annotations).forEach(function (annotation) {
        var inAnnotation, removedInAnnotation;
        switch (opType) {
          case 'insert':
            if (annotation.start < selectionBeforeInput.start && selectionBeforeInput.start <= annotation.end) {
              annotation.end += diffLength;
            } else if (annotation.start >= selectionBeforeInput.start) {
              // We're writing before the annotated portion, move the
              // all the following annotations to the right.
              annotation.start += diffLength;
              annotation.end += diffLength;
            }
            break;
          case 'delete-single':
            // TODO: backspace and delete are two different operations.
            // It depends on the selectionAfterInput which one was used.
            if (annotation.start < selectionBeforeInput.start && selectionBeforeInput.start <= annotation.end && selectionBeforeInput.start !== selectionAfterInput.start) {
              // Backspace.
              annotation.end += diffLength;
            } else if (annotation.start <= selectionBeforeInput.start && selectionBeforeInput.start < annotation.end && selectionBeforeInput.start === selectionAfterInput.start) {
              // Delete.
              annotation.end += diffLength;
            } else if (annotation.start >= selectionBeforeInput.start) {
              // We're deleting before the annotated portion, move
              // all the following annotations by diff length.
              annotation.start += diffLength;
              annotation.end += diffLength;
            }
            break;
          case 'delete':
            if (annotation.start <= selectionBeforeInput.start && selectionBeforeInput.start <= annotation.end) {
              if (selectionBeforeInput.end <= annotation.end) {
                annotation.end += diffLength;
              } else {
                annotation.end += selectionAfterInput.start - annotation.end;
              }
            } else if (annotation.start >= selectionBeforeInput.start && annotation.start < selectionBeforeInput.end) {
              // Part of the annotation is deleted.
              inAnnotation = annotation.end - annotation.start;
              removedInAnnotation = selectionBeforeInput.end - annotation.start;
              annotation.start = selectionBeforeInput.start;
              annotation.end = annotation.start + inAnnotation - removedInAnnotation;
            } else if (annotation.start >= selectionBeforeInput.end) {
              // Shift all the following annotations by the diff length.
              annotation.start += diffLength;
              annotation.end += diffLength;
            }
            break;
          case 'delete-insert':
            // Delete followed by insert. The user might have selected a range and then started typing or pasting.

            if (annotation.start <= selectionBeforeInput.start && selectionBeforeInput.start <= annotation.end) {
              // If we're deleting something AFTER the annotation, we do now
              // want the inserting characters to inherit the annotated properties.
              // aBC[d]e -> aBCe   (not aBCE)
              if (selectionBeforeInput.start < annotation.end) {
                if (selectionBeforeInput.end > annotation.end) {
                  annotation.end = selectionAfterInput.end;
                } else {
                  annotation.end = selectionAfterInput.end + (annotation.end - selectionBeforeInput.end);
                }
              }
            } else if (annotation.start >= selectionBeforeInput.start && annotation.start <= selectionBeforeInput.end) {
              // Part of the annotation is affected.
              var addedChars = selectionAfterInput.start - selectionBeforeInput.start;
              removedInAnnotation = selectionBeforeInput.end - annotation.start;
              inAnnotation = annotation.end - annotation.start;
              annotation.start = selectionBeforeInput.start + addedChars;
              annotation.end = annotation.start + inAnnotation - removedInAnnotation;
            } else if (annotation.start >= selectionBeforeInput.start && annotation.end <= selectionBeforeInput.end) {
              // This annotation will be removed.
              annotation.start = annotation.end = 0;
            } else if (annotation.start >= selectionBeforeInput.end) {
              // Shift all the following annotations by the diff length.
              annotation.start += diffLength;
              annotation.end += diffLength;
            }
            break;
          default:
            // Unknown operation. Should never happen!
            if (this.options.debug) {
              console.log('ui.TextEditor: Unknown text operation.');
            }
            break;
        }
        if (annotation.end > annotation.start) {
          newAnnotations.push(annotation);
        }
      }, this);
      return newAnnotations;
    },
    shiftAnnotations: function shiftAnnotations(annotations, selectionStart, offset) {
      return core_mjs.V.shiftAnnotations(annotations, selectionStart, offset);
    },
    // @public
    // This method stores annotation attributes that will be used for the very next insert operation.
    // This is useful, for example, when we have a toolbar and the user changes text to e.g. bold.
    // At this point, we can just call `setCurrentAnnotation({ 'font-weight': 'bold' })` and let the
    // text editor know that once the user starts typing, the text should be bold.
    // Note that the current annotation will be removed right after the first text operation to come.
    // This is because after that, the next inserted character will already inherit properties
    // from the previous character which is our 'bold' text.
    setCurrentAnnotation: function setCurrentAnnotation(attrs) {
      this._currentAnnotationAttributes = attrs;
    },
    // @public
    // Set annotations of the text inside the text editor.
    // These annotations will be modified during the course of using the text editor.
    setAnnotations: function setAnnotations(annotations) {
      this._annotations = annotations;
    },
    // @public
    getAnnotations: function getAnnotations() {
      return this._annotations;
    },
    // @public
    // Get the combined (merged) attributes for a character at the position `selectionStart`
    // taking into account all the `annotations` that apply.
    getCombinedAnnotationAttrsAtIndex: function getCombinedAnnotationAttrsAtIndex$1(selectionStart, annotations) {
      return getCombinedAnnotationAttrsAtIndex(core_mjs.util.toArray(annotations), selectionStart);
    },
    // @public
    // Find a common annotation among all the `annotations` that fall into the
    // `range` (an object with `start` and `end` properties - *normalized*).
    // For characters that don't fall into any of the `annotations`, assume
    // `defaultAnnotation` (default annotation does not need `start` and `end` properties).
    // The common annotation denotes the attributes that all the characters in the `range` share.
    // If any of the attributes for any character inside `range` differ, `undefined` is returned.
    // This is useful e.g. when your toolbar needs to reflect the text attributes of a selection.
    getSelectionAttrs: function getSelectionAttrs(range, annotations) {
      var start = range.start,
        _range$end = range.end,
        end = _range$end === void 0 ? start : _range$end;
      if (start === end) {
        return getCombinedAnnotationAttrsAtIndex(annotations, start - 1);
      } else {
        return getCombinedAnnotationAttrsBetweenIndexes(annotations, start, end);
      }
    },
    // @public
    // Return the text content (including new line characters) inside the `<text>` SVG element.
    // We assume that each <tspan> represents a new line in the order in which
    // they were added to the DOM.
    getTextContent: function getTextContent() {
      // Add a newline character for every <tspan> that is a line. Such
      // tspans must be marked with the `line` class.
      var elText = this.options.text;
      var tspans = core_mjs.V(elText).find('.v-line');
      return tspans.length === 0 ? elText.textContent : tspans.reduce(function (memo, tspan, i, tspans) {
        var line = tspan.node.textContent;
        // Empty lines are assumed to be marked with the `empty-line` class.
        if (tspan.hasClass('v-empty-line')) line = '';
        // Last line does not need a new line (\n) character at the end.
        return i === tspans.length - 1 ? memo + line : memo + line + '\n';
      }, '');
    },
    startSelecting: function startSelecting() {
      this.selecting = true;
    },
    stopSelecting: function stopSelecting() {
      this.selecting = false;
    },
    selectionInProgress: function selectionInProgress() {
      return this.selecting === true;
    },
    // @public
    // Select the whole text.
    selectAll: function selectAll() {
      return this.select(0, this.getNumberOfChars());
    },
    // @public
    // Select a portion of the text starting at `startCharNum`
    // character position ending at `selectionEnd` character position.
    // This method automatically swaps `startCharNum` and `endCharNum`
    // if they are in the wrong order.
    select: function select(startCharNum, endCharNum) {
      var options = this.options,
        selection = this.selection;
      if (options.debug) {
        console.log('select(', startCharNum, endCharNum, ')');
      }
      var prevStart = selection.start;
      var prevEnd = selection.end;
      if (endCharNum === undefined) {
        endCharNum = startCharNum;
      }
      if (core_mjs.util.isNumber(startCharNum)) {
        selection.start = startCharNum;
      }
      if (core_mjs.util.isNumber(endCharNum)) {
        selection.end = endCharNum;
      }
      if (!core_mjs.util.isNumber(selection.end)) {
        selection.end = selection.start;
      }
      var start = selection.start,
        end = selection.end;
      if (core_mjs.util.isNumber(start) && core_mjs.util.isNumber(end)) {
        var changed = prevStart !== start || prevEnd !== end;
        if (changed) {
          // Reset the current annotation if the selection is changed.
          this.setCurrentAnnotation(null);
        }
        if (start === end) {
          this.clearSelection();
          this.focus();
          this.setCaret(start);
        } else {
          this.hideCaret();
          this.setTextAreaSelection(start, end);
          var text = this.textarea.value;
          if (start > end && this.constructor.isLineEnding(text, end)) {
            //  Fix R2L selection going over a new line (fixed by trial and error)
            if (this.constructor.isLineStart(text, start) && end !== start - 1) {
              this.renderSelection(end, start - 2);
            } else {
              this.renderSelection(end, start - 1);
            }
          } else {
            this.renderSelection(start, end);
          }
        }
        this.trigger('select:change', start, end);
      }
      return this;
    },
    setTextAreaSelection: function setTextAreaSelection(start, end) {
      var selection = {
        start: start,
        end: end
      };
      selection = this.normalizeSelectionRange(selection);
      this.textarea.focus();
      this.textarea.selectionStart = selection.start;
      this.textarea.selectionEnd = selection.end;
    },
    renderSelection: function renderSelection(start, end) {
      if (this.options.debug) {
        console.log('renderSelection()');
      }
      var selection = {
        start: start,
        end: end
      };
      selection = this.normalizeSelectionRange(selection);
      this.clearSelection();
      if (this.options.useNativeSelection) {
        // Use native selection.

        // Allow selection of elements in the paper.
        if (this.$viewport) {
          // Save this so that it can be reverted later.
          this._viewportUserSelectBefore = this.$viewport.css('user-select');
          this.$viewport.css({
            '-webkit-user-select': 'all',
            '-moz-user-select': 'all',
            'user-select': 'all'
          });
        }
        var length = selection.end - selection.start;
        this.selectTextInElement(this.options.text, selection.start, length);
      } else {
        // Fallback to the old method of rendering the selection box using a <div> for each character.

        this.renderSelectionBoxes(selection.start, selection.end);
      }
    },
    normalizeSelectionStartAndLength: function normalizeSelectionStartAndLength(text, start, length) {
      var textBefore = text.substr(0, start);
      var textSelected = text.substr(start, length);

      // Linebreaks aren't counted by the selectSubString() method.
      var numLineBreaksBefore = this.countLineBreaks(textBefore);
      var numLineBreaksInSelection = this.countLineBreaks(textSelected);
      start -= numLineBreaksBefore;
      length -= numLineBreaksInSelection;

      // "Empty lines" contain a hidden hyphen symbol, which are counted.
      var numEmptyLinesBefore = this.countEmptyLines(textBefore);
      var numEmptyLinesInSelection = this.countEmptyLines(textSelected);
      start += numEmptyLinesBefore;
      length += numEmptyLinesBefore;
      length -= numEmptyLinesBefore;
      length += numEmptyLinesInSelection;
      return {
        start: start,
        length: length
      };
    },
    selectTextInElement: function selectTextInElement(element, start, length) {
      if (core_mjs.util.isFunction(element.selectSubString)) {
        // Try using selectSubString().
        this.selectTextInElementUsingSelectSubString(element, start, length);
      }

      // Is the expected selected content is different from the actual selected content?
      if (!this.actualSelectionMatchesExpectedSelection(start, length)) {
        // Fallback to using ranges.

        try {
          this.selectTextInElementUsingRanges(element, start, length);
        } catch (error) {
          if (this.options.debug) {
            console.log(error);
          }
          if (core_mjs.util.isFunction(element.selectSubString)) {
            // Try again using selectSubString().
            this.selectTextInElementUsingSelectSubString(element, start, length);
          }
        }
      }
    },
    selectTextInElementUsingSelectSubString: function selectTextInElementUsingSelectSubString(element, start, length) {
      // Note:
      // When using this method, Firefox doesn't do well when the selection spans multiple <tspan> elements.
      // In that case only the first <tspan> is selected.

      var normalized = this.normalizeSelectionStartAndLength(this.getTextContent(), start, length);
      try {
        element.selectSubString(normalized.start, normalized.length);
      } catch (error) {
        if (this.options.debug) {
          console.log(error);
        }
      }
    },
    selectTextInElementUsingRanges: function selectTextInElementUsingRanges(element, start, length) {
      // Some browsers (Chrome) don't allow "discontiguous" ranges.
      // A "discontiguous" range is a range that includes multiple elements.
      // This isn't a problem for Firefox.

      var selection = window.getSelection();
      selection.removeAllRanges();
      var normalized = this.normalizeSelectionStartAndLength(this.getTextContent(), start, length);
      start = 0 + normalized.start;
      length = 0 + normalized.length;
      var textNodes = this.getTextNodesFromDomElement(element);
      var textNode;
      var textNodeStart;
      var textNodeEnd;
      var setStart;
      var setEnd;
      var offset = 0;
      var end = start + length;
      var range = document.createRange();
      while (length > 0 && textNodes.length > 0) {
        textNode = textNodes.shift();
        textNodeStart = offset;
        textNodeEnd = offset + textNode.length;
        if (textNodeStart >= start && textNodeStart < end || textNodeEnd > start && textNodeEnd <= end || start >= textNodeStart && start < textNodeEnd || end > textNodeStart && end <= textNodeEnd) {
          setStart = Math.max(start - textNodeStart, 0);
          setEnd = Math.min(setStart + Math.min(length, textNode.length), textNodeEnd);
          if (range.collapsed) {
            range.setStart(textNode, setStart);
          }
          range.setEnd(textNode, setEnd);
          length -= setEnd - setStart;
        }
        offset += textNode.length;
      }
      if (!range.collapsed) {
        selection.addRange(range);
      }
    },
    actualSelectionMatchesExpectedSelection: function actualSelectionMatchesExpectedSelection(start, length) {
      var selection = window.getSelection();
      var actualSelectedContent = selection.toString();
      var expectedSelectedContent = this.getExpectedSelectedContent(start, length);

      // Replace tab characters with space characters.
      actualSelectedContent = actualSelectedContent.replace(/\s/g, ' ');
      return expectedSelectedContent === actualSelectedContent;
    },
    getExpectedSelectedContent: function getExpectedSelectedContent(start, length) {
      var textContent = this.getTextContent();
      var expectedSelectedContent = textContent.substr(start, length);

      // Replace empty lines with a hyphen character.

      if (expectedSelectedContent.search(/(\n\r|\r|\n)/) === 0) {
        // The new line character on the first position always creates an empty line
        expectedSelectedContent = '-' + expectedSelectedContent;
      }
      expectedSelectedContent = expectedSelectedContent.replace(/(\n\r|\r|\n){2,}/g, function (match) {
        return Array.from({
          length: match.length - 1
        }, function () {
          return '-';
        }).join('');
      });

      // Remove single line break characters.
      expectedSelectedContent = expectedSelectedContent.replace(/\n\r|\r|\n/g, '');

      // Replace tab characters with space characters.
      expectedSelectedContent = expectedSelectedContent.replace(/\s/g, ' ');
      return expectedSelectedContent;
    },
    getTextNodesFromDomElement: function getTextNodesFromDomElement(element) {
      var textNodes = [];
      for (var i = 0, n = element.childNodes.length; i < n; i++) {
        var childNode = element.childNodes[i];
        if (childNode.tagName !== undefined) {
          // Not a text node.

          textNodes = textNodes.concat(this.getTextNodesFromDomElement(childNode));
        } else {
          textNodes.push(childNode);
        }
      }
      return textNodes;
    },
    renderSelectionBoxes: function renderSelectionBoxes(start, end) {
      if (this.options.debug) {
        console.log('renderSelectionBoxes()');
      }
      this.$selection.empty();
      var fontSize = this.getFontSize();
      var t = this.getTextTransforms();
      var angle = t.rotation;

      // Cache of a previous selection box element.
      var $prevBox;
      // Cache for a bounding box of a previous character.
      var prevBbox;
      var bbox;
      for (var i = start; i < end; i++) {
        var $box = this.$selectionBox.clone();

        // `getCharBBox()` can throw an exception in situations where
        // the character position is outside the range where
        // the `getStartPositionOfChar()` and `getEndPositionOfChar()`
        // methods can operate. An example of this is a text along a path
        // that is shorter than that of the text. In this case,
        // we fail silently. This is safe because the result of this
        // is selection boxes not being rendered for characters
        // outside of the visible text area - which is actually desired.
        try {
          bbox = this.getCharBBox(i);
        } catch (e) {
          this.trigger('select:out-of-range', start, end);
          break;
        }

        // A small optimization for the number of char-selection-box div elements.
        // If one box is right after the other, there is no need to render them both.
        // Instead, simply adjust the width of the previous one.
        if (prevBbox && angle === 0 && Math.round(bbox.y) === Math.round(prevBbox.y) && Math.round(bbox.height) === Math.round(prevBbox.height) && Math.round(bbox.x) === Math.round(prevBbox.x + prevBbox.width)) {
          $prevBox.css({
            width: '+=' + bbox.width
          });
        } else {
          // Using font size instead of bbox.height makes the bounding box
          // of the character more precise. Unfortunately, getting an accurate
          // bounding box of a character in SVG is not easy.
          $box.css({
            left: bbox.x,
            top: bbox.y - bbox.height,
            width: bbox.width,
            height: bbox.height,
            '-webkit-transform': 'rotate(' + angle + 'deg)',
            '-webkit-transform-origin': '0% 100%',
            '-moz-transform': 'rotate(' + angle + 'deg)',
            '-moz-transform-origin': '0% 100%'
          });
          this.$selection.append($box);
          $prevBox = $box;
        }
        prevBbox = bbox;
      }
      if (bbox) {
        this.$textareaContainer.css({
          left: bbox.x,
          top: bbox.y - fontSize * t.scaleY
        });
      }
    },
    clearSelection: function clearSelection() {
      if (this.options.debug) {
        console.log('clearSelection()');
      }
      this.$selection.empty();
      if (this.options.text.selectSubString) {
        if (this.$viewport && this._viewportUserSelectBefore) {
          this.$viewport.css({
            '-webkit-user-select': this._viewportUserSelectBefore,
            '-moz-user-select': this._viewportUserSelectBefore,
            'user-select': this._viewportUserSelectBefore
          });
        }
        window.getSelection().removeAllRanges();
      }
      return this;
    },
    // @public
    // Cancel selection of the text.
    deselect: function deselect() {
      if (this.options.debug) {
        console.log('deselect()');
      }
      this.stopSelecting();
      this.clearSelection();
      this.setTextAreaSelection(this.selection.start, this.selection.end);
      return this;
    },
    // @public
    // Return the start character position of the current selection.
    getSelectionStart: function getSelectionStart() {
      return this.selection.start;
    },
    // @public
    // Return the end character position of the current selection.
    getSelectionEnd: function getSelectionEnd() {
      return this.selection.end;
    },
    // @public
    // Return an object with `start` and `end` properties describing
    // the *normalized* selection range.
    getSelectionRange: function getSelectionRange() {
      return this.normalizeSelectionRange(this.selection);
    },
    normalizeSelectionRange: function normalizeSelectionRange(selection) {
      selection = core_mjs.util.clone(selection);

      // Normalize.
      if (selection.start > selection.end) {
        selection.end = [selection.start, selection.start = selection.end][0];
      }
      return selection;
    },
    // @public
    // Return the length of the selection.
    getSelectionLength: function getSelectionLength() {
      var range = this.getSelectionRange();
      return range.end - range.start;
    },
    // @public
    // Return the selected text.
    getSelection: function getSelection() {
      var range = this.getSelectionRange();
      return this.getTextContent().slice(range.start, range.end);
    },
    // @public
    // Return the start and end character positions for a word
    // under `charNum` character position.
    getWordBoundary: function getWordBoundary(charNum) {
      var text = this.textarea.value;
      var re = /\W/;
      var start = charNum;
      while (start) {
        if (re.test(text[start])) {
          start += 1;
          break;
        }
        start -= 1;
      }
      var numberOfChars = this.getNumberOfChars();
      var end = charNum;
      while (end < numberOfChars) {
        if (re.test(text[end])) {
          break;
        }
        end += 1;
      }

      // Normalize before returning.
      return start < end ? [start, end] : [end, start];
    },
    getURLBoundary: function getURLBoundary(charNum) {
      var text = this.textarea.value;
      var whitespaceRegEx = /\s/;
      var webUrlRegEx = /[-a-zA-Z0-9@:%_+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_+.~#?&//=]*)?/;
      var start = charNum;
      while (start > -1) {
        if (whitespaceRegEx.test(text[start])) {
          start += 1;
          break;
        }
        start -= 1;
      }
      start = Math.max(start, 0);
      var numberOfChars = this.getNumberOfChars();
      var end = Math.max(start, charNum);
      while (end <= numberOfChars) {
        if (whitespaceRegEx.test(text[end])) {
          break;
        }
        end += 1;
      }
      end = Math.min(end, numberOfChars);
      if (webUrlRegEx.test(text.substring(start, end))) {
        return [start, end];
      }
      return undefined;
    },
    annotateURL: function annotateURL(annotations, start, end) {
      // Include the actual URL with the annotation object. This is very useful to
      // have for cases where the text does not reflect the URL but rather only the title of the URL.
      // In this case, we still want to know what was the original URL.
      var url = this.textarea.value.substring(start, end);

      // Do not add the annotation if there is the same one already.
      if (annotations.some(function (a8n) {
        return a8n.url === url && a8n.start === start && a8n.end === end;
      })) {
        return annotations;
      }
      var urlAnnotation;
      var userUrlAnnotation = this.options.urlAnnotation;
      if (typeof userUrlAnnotation === 'function') {
        urlAnnotation = userUrlAnnotation(url);
        if (!urlAnnotation) return annotations;
      } else {
        urlAnnotation = core_mjs.util.assign({}, userUrlAnnotation);
      }
      core_mjs.util.assign(urlAnnotation, {
        url: url,
        start: start,
        end: end
      });
      annotations.push(urlAnnotation);
      return annotations;
    },
    // Get the bounding box (in screen coordinates) of the character
    // under `charNum` position (the real one, not the SVG one).
    getCharBBox: function getCharBBox(charNum) {
      // For a newline character (line ending), return a bounding box
      // that is derived from the previous - non newline - character
      // and move it to the right of that character.
      if (this.isLineEnding(charNum)) {
        var bbox = this.getCharBBox(charNum - 1);
        //bbox.x = bbox.x + bbox.width + -7;
        bbox.x = bbox.x2;
        bbox.y = bbox.y2;
        bbox.width = this.options.newlineCharacterBBoxWidth || 10;
        return bbox;
      }
      this.ensureTextVisibility();
      var svgCharNum = this.realToSvgCharNum(charNum);
      var elText = this.options.text;
      var startPosition = elText.getStartPositionOfChar(svgCharNum);
      var endPosition = elText.getEndPositionOfChar(svgCharNum);
      var extent = elText.getExtentOfChar(svgCharNum);
      startPosition = this.localToScreenCoordinates(startPosition);
      endPosition = this.localToScreenCoordinates(endPosition);
      var t = this.getTextTransforms();
      var x = startPosition.x;
      var y = startPosition.y;
      var w = extent.width * t.scaleX;
      var h = extent.height * t.scaleY;
      return {
        x: x,
        y: y,
        width: w,
        height: h,
        x2: endPosition.x,
        y2: endPosition.y
      };
    },
    realToSvgCharNum: function realToSvgCharNum(charNum) {
      // Calculate the position of the character in the SVG `<text>` element.
      // The reason why those two don't match (`charNum` and `svgCharNum`) is
      // because in the SVG `<text>` element, there are no newline characters.
      var lineEndings = 0;
      for (var i = 0; i <= charNum; i++) {
        if (this.isLineEnding(i)) {
          lineEndings += 1;
        }
      }
      return charNum - lineEndings;
    },
    selectionStartToSvgCharNum: function selectionStartToSvgCharNum(selectionStart) {
      return selectionStart - this.nonEmptyLinesBefore(selectionStart);
    },
    svgToRealCharNum: function svgToRealCharNum(svgCharNum) {
      var newLinesBefore = 0;
      for (var i = 0; i <= svgCharNum + newLinesBefore; i++) {
        if (this.isLineEnding(i)) {
          newLinesBefore += 1;
        }
      }
      return svgCharNum + newLinesBefore;
    },
    ensureTextVisibility: function ensureTextVisibility() {
      // [IE fix] The text element must be visible, otherwise getCTM() doesn't work.
      // See:
      // http://stackoverflow.com/questions/10714779/svgs-node-getscreenctm-method-failing-in-ie-9/10731378#10731378
      $(this.options.text).show();
    },
    localToScreenCoordinates: function localToScreenCoordinates(p) {
      return core_mjs.V.transformPoint(p, this.options.text.getCTM());
    },
    // @public
    // Return the number of characters in the text.
    getNumberOfChars: function getNumberOfChars() {
      return this.getTextContent().length;
    },
    // @public
    // Return the character position (the real one) the user clicked on.
    // If there is no such a position found, return the last one.
    getCharNumFromEvent: function getCharNumFromEvent(evt) {
      var elText = this.options.text;
      var localPoint = core_mjs.V(elText).toLocalPoint(evt.clientX, evt.clientY);
      return this.getCharNumAtPosition(localPoint);
    },
    getCharNumAtPosition: function getCharNumAtPosition(localPoint) {
      this.ensureTextVisibility();
      var elText = this.options.text;
      var svgCharNum = elText.getCharNumAtPosition(localPoint);

      // The user clicked somewhere outside, always return the last or the first char num.
      if (svgCharNum < 0) {
        var localTextBBox = core_mjs.V(elText).getBBox();
        // Firefox would otherwise ignore the characters at the beginning and end of the text.
        localTextBBox.inflate(-1);
        var insideTextBBox = localTextBBox.containsPoint(localPoint);
        if (!insideTextBBox && this.hasSelection() && localTextBBox.clone().inflate(this.options.selectAllThreshold).containsPoint(localPoint)) {
          return this.selection.end;
        }
        var nearest = insideTextBBox ? localPoint : localTextBBox.pointNearestToPoint(localPoint);
        var p = core_mjs.V.createSVGPoint(nearest.x, nearest.y);
        var nearestCharNum = elText.getCharNumAtPosition(p);
        var right = localPoint.x > localTextBBox.x;
        if (nearestCharNum === -1) {
          var start = localTextBBox.x;
          var end = localTextBBox.x + localTextBBox.width;
          var prevPivot;
          var pivot = (start + end) / 2;
          do {
            p.x = pivot;
            var currentNearestCharNum = elText.getCharNumAtPosition(p);
            if (currentNearestCharNum > -1) nearestCharNum = currentNearestCharNum;
            prevPivot = pivot;
            if (right && currentNearestCharNum > -1 || !right && currentNearestCharNum === -1) {
              pivot = (pivot + end) / 2;
              start = prevPivot;
            } else {
              pivot = (start + pivot) / 2;
              end = prevPivot;
            }
          } while (Math.abs(prevPivot - pivot) > 1);
        }
        if (nearestCharNum > -1) {
          var realCharNum = this.svgToRealCharNum(nearestCharNum);
          if (!right || this.getTextContent()[realCharNum] === '\n') return realCharNum;
          return realCharNum + 1;
        }
        return localPoint.x < localTextBBox.x && localPoint.y < localTextBBox.y + localTextBBox.height ? 0 : this.getNumberOfChars();
      }
      var clientScreen = this.localToScreenCoordinates(localPoint);

      // If the user clicked on the "left" side of the character,
      // return the character position of the clicked character, otherwise
      // return the character position of the character after the clicked one.
      var bbox = this.getCharBBox(this.svgToRealCharNum(svgCharNum));
      if (Math.abs(bbox.x - clientScreen.x) < Math.abs(bbox.x + bbox.width - clientScreen.x)) {
        return this.svgToRealCharNum(svgCharNum);
      }
      return this.svgToRealCharNum(svgCharNum) + 1;
    },
    lineNumber: function lineNumber(selectionStart) {
      var text = this.textarea.value.substr(0, selectionStart);
      return this.countLineBreaks(text);
    },
    emptyLinesBefore: function emptyLinesBefore(selectionStart) {
      var lines = this.textarea.value.split(/\n\r|\r|\n/g);
      var lineNumber = this.lineNumber(selectionStart);
      var n = 0;
      for (var i = lineNumber - 1; i >= 0; i--) {
        if (!lines[i]) {
          n += 1;
        }
      }
      return n;
    },
    countLineBreaks: function countLineBreaks(text) {
      return (text.match(/\n\r|\r|\n/g) || []).length;
    },
    countEmptyLines: function countEmptyLines(text) {
      var count = (text.match(/(\n\r|\r|\n){2,}/g) || []).reduce(function (res, breaks) {
        return res + (breaks.length - 1);
      }, 0);
      if (text.search(/(\n\r|\r|\n)/) === 0) {
        // The new line character on the first position always creates an empty line
        count++;
      }
      return count;
    },
    nonEmptyLinesBefore: function nonEmptyLinesBefore(selectionStart) {
      return this.lineNumber(selectionStart) - this.emptyLinesBefore(selectionStart);
    },
    isEmptyLine: function isEmptyLine(lineNumber) {
      var lines = this.textarea.value.split(/\n\r|\r|\n/g);
      return !lines[lineNumber];
    },
    isEmptyLineUnderSelection: function isEmptyLineUnderSelection(selectionStart) {
      var lineNumber = this.lineNumber(selectionStart);
      return this.isEmptyLine(lineNumber);
    },
    // Return `true` if the character at the position `charNum` is
    // a newline character but does not denote an empty line.
    // In other words, the newline character under `charNum` is
    // ending a non-empty line.
    isLineEnding: function isLineEnding(charNum) {
      return this.constructor.isLineEnding(this.textarea.value, charNum);
    },
    getTextTransforms: function getTextTransforms() {
      var screenCTM = this.options.text.getCTM();
      return core_mjs.V.decomposeMatrix(screenCTM);
    },
    getFontSize: function getFontSize() {
      var DEFAULT_FONT_SIZE = this.DEFAULT_FONT_SIZE,
        options = this.options;
      var fontSize = parseFloat(options.text.getAttribute('font-size'));
      return Number.isNaN(fontSize) ? DEFAULT_FONT_SIZE : fontSize;
    },
    getFontFill: function getFontFill() {
      var options = this.options;
      var fontColor = options.text.getAttribute('fill');
      return fontColor || '';
    },
    getTextAnchor: function getTextAnchor() {
      var options = this.options;
      var textAnchor = options.text.getAttribute('text-anchor');
      return textAnchor || '';
    },
    getCaretAttrs: function getCaretAttrs(index) {
      var annotations = this.getAnnotations() || [];
      var currentAnnotationAttrs = this._currentAnnotationAttributes;
      if (annotations.length === 0 && !currentAnnotationAttrs) {
        return {
          'font-size': this.getFontSize(),
          'fill': this.getFontFill()
        };
      }
      var currentAnnotations = [].concat(_toConsumableArray(annotations), [{
        attrs: currentAnnotationAttrs
      }]);
      var attrs = getCombinedAnnotationAttrsAtIndex(currentAnnotations, index - 1);
      var fontSize = parseFloat(attrs['font-size']);
      var fontFill = attrs['fill'];
      return {
        'font-size': Number.isNaN(fontSize) ? this.getFontSize() : fontSize,
        'fill': fontFill || this.getFontFill()
      };
    },
    // @public
    // Set the caret position based on the selectionStart of the textarea unless
    // `charNum` is provided in which case the caret will be set just before the
    // character at `charNum` position (starting from 0).
    setCaret: function setCaret(charNum, opt) {
      this.ensureTextVisibility();
      if (core_mjs.util.isObject(charNum)) {
        opt = charNum;
        charNum = undefined;
      }
      opt = opt || {};
      var numberOfChars = this.getNumberOfChars();
      var selectionStart = this.selection.start;
      if (typeof charNum !== 'undefined') {
        // Keep the character number within the valid range of characters.
        charNum = Math.min(Math.max(charNum, 0), numberOfChars);
        selectionStart = this.selection.start = this.selection.end = charNum;
      }
      if (!opt.silent) {
        this.trigger('caret:change', selectionStart);
      }
      if (this.options.debug) {
        console.log('setCaret(', charNum, opt, ')', 'selectionStart', selectionStart, 'isLineEnding', this.isLineEnding(selectionStart), 'isEmptyLineUnderSelection', this.isEmptyLineUnderSelection(selectionStart), 'svgCharNum', this.selectionStartToSvgCharNum(selectionStart), 'nonEmptyLinesBefore', this.nonEmptyLinesBefore(selectionStart));
      }
      this.updateCaret();
      this.setTextAreaSelection(selectionStart, selectionStart);

      // Always focus. If the caret was set as a reaction on
      // mouse click, the textarea looses focus in FF.
      this.focus();
      return this;
    },
    updateCaret: function updateCaret() {
      var $caret = this.$caret,
        $textareaContainer = this.$textareaContainer,
        selection = this.selection,
        options = this.options,
        textarea = this.textarea;
      var selectionStart = selection.start;
      var text = options.text,
        placeholder = options.placeholder;
      var numberOfChars = this.getNumberOfChars();
      var caretPosition;
      // `getStartPositionOfChar()` or `getEndPositionOfChar()` can throw an exception
      // in situations where the character position is outside the range of
      // the visible text area. In this case, we just hide the caret altogether -
      // which is desired because the user is editing a text that is not visible.
      // An example of this is a text along a path that is shorter than that of the text.
      try {
        var charIndex;
        // - If we're on an empty line, always take the start position of the
        //   SVG space character on that line.
        // - If we're at the end of the line, take the end position of the SVG character before.
        // - If we're at the end of the text, also take the end position of the character before.
        // - For all other cases, take the start position of the SVG character before the selection.
        if (!this.isEmptyLineUnderSelection(selectionStart) && (this.isLineEnding(selectionStart) || textarea.value.length === selectionStart)) {
          charIndex = this.selectionStartToSvgCharNum(selectionStart) - 1;
          caretPosition = text.getEndPositionOfChar(charIndex);
        } else {
          charIndex = this.selectionStartToSvgCharNum(selectionStart);
          caretPosition = text.getStartPositionOfChar(charIndex);
        }
      } catch (e) {
        this.trigger('caret:out-of-range', selectionStart);
        caretPosition = {
          x: 0,
          y: 0
        };
      }

      // Convert the caret local position (in the coordinate system of the SVG `<text>`)
      // into screen coordinates.
      var _this$localToScreenCo = this.localToScreenCoordinates(caretPosition),
        x = _this$localToScreenCo.x,
        y = _this$localToScreenCo.y;
      // Set the position of the caret. If the number of characters is zero, the caretPosition
      // is `{ x: 0, y: 0 }`, therefore it is not the the bottom right corner of the character but
      // the top left. Therefore, we do not want to shift the caret up using the `margin-top` property.
      var _this$getTextTransfor = this.getTextTransforms(),
        rotation = _this$getTextTransfor.rotation,
        scaleY = _this$getTextTransfor.scaleY;
      var caretAttrs = this.getCaretAttrs(selectionStart);
      var caretSize = caretAttrs['font-size'] * scaleY;
      var caretColor = caretAttrs['fill'];
      if (placeholder) {
        var placeholderText = typeof placeholder == 'string' ? placeholder : 'Enter text...';
        $caret.attr('data-placeholder-text', placeholderText);
        $caret.toggleClass('placeholder', numberOfChars === 0);
      }
      $caret.css({
        'left': x,
        'top': y - caretSize,
        'height': caretSize,
        'line-height': "".concat(caretSize, "px"),
        'font-size': "".concat(caretSize, "px"),
        '-webkit-transform': "rotate(".concat(rotation, "deg)"),
        '-webkit-transform-origin': '0% 100%',
        '-moz-transform': "rotate(".concat(rotation, "deg)"),
        '-moz-transform-origin': '0% 100%',
        'background-color': caretColor
      }).attr({
        // Important for styling the placeholder in CSS
        'text-anchor': this.getTextAnchor()
      }).show();
      $textareaContainer.css({
        left: x,
        top: y - caretSize
      });
    },
    focus: function focus() {
      if (this.options.debug) {
        console.log('focus()');
      }
      this.showCaret();
      return this;
    },
    blur: function blur() {
      if (this.options.debug) {
        console.log('blur()');
      }
      this.hideCaret();
      return this;
    },
    showCaret: function showCaret() {
      if (this.options.debug) {
        console.log('showCaret()');
      }
      this.$caret.show();
      return this;
    },
    // @public
    // Hide the caret (cursor).
    hideCaret: function hideCaret() {
      if (this.options.debug) {
        console.log('hideCaret()');
      }
      this.$caret.hide();
      return this;
    },
    onRemove: function onRemove() {
      var _this$options = this.options,
        text = _this$options.text,
        _this$options$cellVie = _this$options.cellView,
        cellView = _this$options$cellVie === void 0 ? null : _this$options$cellVie;
      this.deselect();
      this.unbindTextElement();
      document.removeEventListener('pointerdown', this.onDocumentPointerdown, {
        capture: true
      });
      $(document.body).off('mousemove', this.onMousemove);
      $(document.body).off('mouseup', this.onMouseup);
      $(document.body).off('keydown', this.onKeydown);

      // TODO: Optional?
      core_mjs.V(text).attr('cursor', this._textCursor);
      this.trigger('close', text, cellView);
    },
    /**
     * Event Callbacks
     */

    onDocumentPointerdown: function onDocumentPointerdown(evt) {
      var _this$options2 = this.options,
        text = _this$options2.text,
        onOutsidePointerdown = _this$options2.onOutsidePointerdown;
      var target = evt.target;
      if (text === target) return;
      if (text.contains(target)) return;
      if (typeof onOutsidePointerdown === 'function') {
        onOutsidePointerdown.call(this, evt, this);
      }
    },
    onKeydown: function onKeydown(evt) {
      if (this.options.debug) {
        console.log('onKeydown(): ', evt.keyCode);
      }
      var onKeydownFn = this.options.onKeydown;
      if (typeof onKeydownFn === 'function') {
        onKeydownFn.call(this, evt, this);
        if (evt.isPropagationStopped()) return;
      }
      if (this.isModifierKey(evt)) return;
      if (this.hasSelection()) {
        this.deselect();
        // Restore the textarea.selectionDirection so that the textarea knows in what direction
        // it should select in case Shift+Arrow keys are used.
        this.restoreTextAreaSelectionDirection();
      }

      // The stream of events when typing something to the textarea is:
      // keydown -> keypress/paste -> letter typed in textarea -> keyup.
      // Therefore, in keydown, we can store the selectionStart
      // value of the textarea before it is adjusted based on the input.
      // Also note that we use keydown and not keypress because
      // e.g. BACKSPACE key is not handled in keypress.

      // We want the navigation keys to be reflected in the UI immediately on keydown.
      // However, at that time, the textarea's selectionStart/End does not yet
      // take into account this very keydown action. Hence we need to
      // defer the `setCaret()` to the next turn. Note that there is no other way
      // as keypress is not triggered for arrow keys and when keyup is triggered, it's too late.
      setTimeout(this.onAfterKeydown, this.AFTER_KEYDOWN_DELAY);
      this._copied = false;
      this._selectionStartBeforeInput = this.textarea.selectionStart;
      this._selectionEndBeforeInput = this.textarea.selectionEnd;
    },
    // Called after the textarea handled the keydown. Remember the order of events:
    // onKeydown -> textarea receives keydown -> onAfterKeydown
    onAfterKeydown: function onAfterKeydown() {
      if (this.textarea === document.activeElement) {
        // Remember the textarea.selectionDirection because select() wipes it out (by cleaning selections).
        // We will restore it just before the keydown is received by the textarea so that the
        // textarea selects in the right direction (using the Shift+Arrow keys).
        this.storeSelectionDirection();
        this.setCurrentAnnotation(null);
        this.updateSelectionFromTextarea();
      }
    },
    onKeyup: function onKeyup(evt) {
      if (this.textContentHasChanged()) {
        this.onInput(evt);
      }
      if (this.textSelectionHasChanged() && !this.isArrowKey(evt)) {
        var _this$textarea2 = this.textarea,
          selectionEnd = _this$textarea2.selectionEnd,
          selectionStart = _this$textarea2.selectionStart;
        // On KeyUp is supposed to handle text selection (e.g. ctrl+a), not the cursor position change
        if (selectionEnd !== selectionStart) this.updateSelectionFromTextarea();
      }
    },
    onCopy: function onCopy(evt) {
      if (!this._copied) {
        this.copyToClipboard();
      }
    },
    onCut: function onCut(evt) {
      if (!this._copied) {
        this.copyToClipboard();
      }
    },
    onInput: function onInput(evt) {
      if (!this.textContentHasChanged()) return;
      var diffLength = this.textarea.value.length - this._textareaValueBeforeInput.length;
      var selectionBeforeInput = {
        start: this._selectionStartBeforeInput,
        end: this._selectionEndBeforeInput
      };
      var selectionAfterInput = {
        start: this.textarea.selectionStart,
        end: this.textarea.selectionEnd
      };
      if (this.options.debug) {
        console.log('onInput()', evt, 'selectionBeforeInput', selectionBeforeInput, 'selectionAfterInput', selectionAfterInput, 'diffLength', diffLength);
      }
      var opType = this.inferTextOperationType(selectionBeforeInput, selectionAfterInput, diffLength);
      var annotated = false;
      var annotations = this.getAnnotations();

      // If URL annotation is enabled and the user inserts a whitespace character,
      // try to detect a URL before the whitespace character. If one was found,
      // annotate it using the `urlAnnotation` option.
      if (this.options.annotateUrls && opType === 'insert') {
        var insertedText = this.textarea.value.substr(selectionBeforeInput.start, diffLength);
        if (this.options.debug) {
          console.log('onInput()', 'inserted text', insertedText);
        }
        if (/\s/.test(insertedText)) {
          annotated = this.annotateURLBeforeCaret(selectionBeforeInput.start);
          if (annotated) {
            // Now we have to shift all the annotations after the inserted whitespace by one to the right.
            annotations = this.shiftAnnotations(annotations, selectionAfterInput.end, diffLength);
          }
        }
      }
      if (annotations) {
        // Annotate only if it wasn't already annotated. This can happen if
        // URL annotation is enabled and we did indeed detect a URL. In this case,
        // the annotation is handed over to `annotateURL()` and not to the
        // generic annotation mechanism - based on the previous character.
        if (!annotated) {
          annotations = this.annotate(annotations, selectionBeforeInput, selectionAfterInput, diffLength);
        }
        if (this.options.debug) {
          console.log('onInput()', 'modified annotations', annotations);
        }

        // Take into account annotation attributes set from outside the text editor.
        // For example, if the user changes text to bold in the toolbar, the programmer
        // should call `setCurrentAnnotation()`. Then when the user starts typing ('insert' operation),
        // we want to create a new annotation with the desired attributes.
        if (this._currentAnnotationAttributes) {
          if (opType === 'insert') {
            var insertAnnotation = {
              start: selectionBeforeInput.start,
              end: selectionAfterInput.end,
              attrs: this._currentAnnotationAttributes
            };
            annotations.push(insertAnnotation);

            // Current annotations are removed right after the very next input which is now.
            // This is because the annotation already become part of the `annotations` array
            // and so if the user continues typing, the next characters will inherit
            // attributes of the previous one (which has our `insertAnnotation` applied).
            this.setCurrentAnnotation(null);
            if (this.options.debug) {
              console.log('onInput()', 'insert annotation', insertAnnotation, 'final annotations', annotations);
            }
          }
        }
      }
      this._annotations = annotations;
      this.trigger('text:change', this.textarea.value, this._textareaValueBeforeInput, annotations, selectionBeforeInput, selectionAfterInput);

      // Store the previous textarea value.
      this._selectionBeforeInput = selectionAfterInput;
      this._textareaValueBeforeInput = this.textarea.value;
      this._textContent = this.textarea.value;
    },
    onPaste: function onPaste(evt) {
      if (this.options.debug) {
        console.log('onPaste()');
      }
      this._textareaValueBeforeInput = this.textarea.value;

      // Give chance to react on when the text was actually pasted to the textarea
      // and the textarea adjusted its selectionStart/End.
      setTimeout(this.onAfterPaste, 0);
    },
    // Called after the textarea handled the paste. Remember the order of events:
    // onPaste -> textarea receives paste -> onAfterPaste
    onAfterPaste: function onAfterPaste() {
      this.setCaret(this.textarea.selectionStart);
    },
    onMousedown: function onMousedown(evt) {
      // Do not deselect the text if it is a triple-click in order to prevent
      // the "blinking effect" (deselect all -> select all). See `onTripleClick()`.
      if (evt.originalEvent.detail === 3) return;
      if (this.options.debug) {
        console.log('onMousedown()');
      }
      var selectionStart = this.getCharNumFromEvent(evt);
      this.startSelecting();
      this.select(selectionStart);

      // Prevent default action that could set focus
      // on the text element and therefore the textarea
      // inside the editor would loose it.
      evt.preventDefault();
      // Stop propagation, the active text editor takes over mousedown.
      evt.stopPropagation();
    },
    onMousemove: function onMousemove(evt) {
      if (this.selectionInProgress()) {
        if (this.options.debug) {
          console.log('onMousemove()');
        }
        var selectionEnd = this.getCharNumFromEvent(evt);

        // Remember the textarea.selectionDirection so that we can restore it later.
        // The reason is that select() internally clears the selection (removes all ranges)
        // which then wipes out the selectionDirection. To make sure that
        // Shift+Arrow keys select in the right direction, we have to remember it and
        // restore it later.
        this.storeSelectionDirection();

        // This will keep the start of the selection and change only the end.
        this.select(null, selectionEnd);

        // The active text editor takes over mousemove during selection.
        evt.preventDefault();
        evt.stopPropagation();
      }
    },
    onMouseup: function onMouseup(evt) {
      if (this.selectionInProgress()) {
        if (this.options.debug) {
          console.log('onMouseup()');
        }
        this.stopSelecting();
        this.trigger('select:changed', this.selection.start, this.selection.end);
      }
    },
    onDoubleClick: function onDoubleClick(evt) {
      if (this.options.debug) {
        console.log('onDoubleClick()');
      }
      var charNum = this.getCharNumFromEvent(evt);
      var wordBoundary = this.getWordBoundary(charNum);
      this.select(wordBoundary[0], wordBoundary[1]);
      evt.preventDefault();
      evt.stopPropagation();
    },
    onTripleClick: function onTripleClick(evt) {
      if (evt.originalEvent.detail !== 3) return;
      if (this.options.debug) {
        console.log('onTripleClick()');
      }
      this.hideCaret();
      this.selectAll();
      evt.preventDefault();
      evt.stopPropagation();
    }
  }, core_mjs.util.assign({
    // A tiny helper that checks if `el` is an SVG `<text>` or `<tspan>` element
    // and returns it if yes, otherwise it returns `undefined`.
    // Especially useful when working with events, e.g.:
    // $(document.body).on('click', function(evt) {
    //     var t = TextEditor.getTextElement(evt.target);
    //     if (t) { ... } else { ... }
    // })
    getTextElement: function getTextElement(el) {
      var tagName = el.tagName.toUpperCase();
      if (tagName === 'TEXT' || tagName === 'TSPAN' || tagName === 'TEXTPATH') {
        if (tagName === 'TEXT') return el;
        return this.getTextElement(el.parentNode);
      }
      return undefined;
    },
    // @public
    // Start inline editing an SVG text element. Therefore, `el` should always
    // be either an SVG `<text>` element directly or any of its descendants
    // `<tspan>` or `<textpath>` in which case the text editor automatically
    // finds the nearest `<text>` element climbing up the DOM tree.
    // If it can't find any `<text>` element, an error is printed to the console
    // and `undefined` is returned. Otherwise, the instance of the `ui.TextEditor`
    // is returned.
    // Options:
    // `opt.placeholder` ... Placeholder that will be passed to the `ui.TextEditor` instance.
    // `opt.annotations` ... Annotations that will be set on the `ui.TextEditor` instance.
    // `opt.cellView` ... For simplicity, we add direct support for JointJS cells.
    // `opt.annotationsProperty` ... If `opt.cellView` is used, annotations will be looked up and set from/to the cellView model by this property name.
    // `opt.textProperty` ... If `opt.cellView` is used, text will be set to the cellView model to this property name.
    edit: function edit(el, opt) {
      var _this = this;
      opt = opt || {};

      // By default, the text editor automatically updates either the cellView text string
      // and annotations (if `opt.cellView` is used) or the SVG text element via Vectorizer.
      // This behaviour can be suppressed by passing `update: false` in the options.
      // In that case, it is the responsibility of the programmer to update the text and annotations.
      var update = opt.update !== false;
      this.options = core_mjs.util.assign({}, opt, {
        update: update
      });
      var textElement = this.getTextElement(el);
      if (!textElement) {
        if (this.options.debug) {
          console.log('ui.TextEditor: cannot find a text element.');
        }
        return undefined;
      }

      // If there was another active text editor open, close it first.
      this.close();
      this.ed = new TextEditor(core_mjs.util.assign({
        text: textElement
      }, opt));

      // Proxy all events triggered by the `ui.TextEditor` to all the listeners
      // on the `ui.TextEditor` class singleton.
      this.ed.on('all', this.trigger, this);
      var _opt = opt,
        _opt$cellView = _opt.cellView,
        cellView = _opt$cellView === void 0 ? null : _opt$cellView;
      this.trigger('open', textElement, cellView);

      // The target container to render the `ui.TextEditor` instance into.
      // If `opt.cellView` is used, the `paper.el` will be used, otherwise the parent node
      // of the SVG document which our `textElement` resides will be used.
      var target;

      // Add support for JointJS cells to make integration easier.
      if (cellView) {
        target = cellView.paper.el;
        this.cellViewUnderEdit = cellView;
        // Prevent dragging during inline editing.
        this.cellViewUnderEditInteractiveOption = this.cellViewUnderEdit.options.interactive;
        this.cellViewUnderEdit.options.interactive = false;

        // Set annotations by the property name. Look them up from the cellView model.
        if (opt.annotationsProperty && !this.ed.getAnnotations()) {
          var annotations = this.cellViewUnderEdit.model.prop(opt.annotationsProperty);
          if (annotations) {
            // Note that we have to deep clone the annotations so that
            // all the backbone `changed` mechanism works. This is because
            // the text editor modifies the `annotations` array in-place.
            this.ed.setAnnotations(cloneDeep(annotations));
          }
        }
      } else {
        var svg = core_mjs.V(textElement).svg();
        target = svg.parentNode;
      }
      if (update) {
        this.ed.on('text:change', function (newText, _oldText, annotations) {
          if (cellView) {
            _this.updateCellView(cellView, newText, annotations);
          } else {
            _this.updateSVGTextNode(textElement, newText, annotations);
          }
        });
      }
      this.ed.render(target);
      return this;
    },
    updateCellView: function updateCellView(cellView, text, annotations) {
      var _this$options3 = this.options,
        textProperty = _this$options3.textProperty,
        annotationsProperty = _this$options3.annotationsProperty;
      var cid = this.ed.cid;
      var model = cellView.model;

      // If `opt.cellView` is used, we automatically set the new text and
      // annotations to the property defined in our options.
      if (textProperty) {
        model.prop(textProperty, text, {
          textEditor: cid,
          async: false
        });
      }
      if (annotationsProperty) {
        // Note that we have to deep clone the annotations so that
        // all the backbone `changed` mechanism works. This is because
        // the text editor modifies the `annotations` array in-place.
        model.prop(annotationsProperty, cloneDeep(annotations), {
          rewrite: true,
          textEditor: cid,
          async: false
        });
      }
    },
    updateSVGTextNode: function updateSVGTextNode(node, text, annotations) {
      core_mjs.V(node).text(text, {
        annotations: annotations
      });
    },
    close: function close() {
      if (!this.ed) return;
      if (this.ed.options.annotateUrls) {
        // If there is a URL detected before we leave the text-editing,
        // annotate it. The only exception is if there was already a URL annotation
        // at the cursor. In this case, we don't create another one.
        var selectionStart = this.ed.getSelectionStart();
        var annotationsUnderCursor = this.findAnnotationsUnderCursor();
        var containsURLAnnotation = annotationsUnderCursor.find(function (annotation) {
          if (annotation.url) return annotation;
          return false;
        });
        if (!containsURLAnnotation) {
          var annotated = this.ed.annotateURLBeforeCaret(selectionStart);
          if (annotated) {
            this.applyAnnotations(this.getAnnotations());
          }
        }
      }
      this.ed.remove();
      if (this.cellViewUnderEdit) {
        // Re-enable dragging after inline editing.
        this.cellViewUnderEdit.options.interactive = this.cellViewUnderEditInteractiveOption;
      }
      this.ed = this.cellViewUnderEdit = this.cellViewUnderEditInteractiveOption = undefined;
    },
    applyAnnotations: function applyAnnotations(annotations) {
      var opt = this.options;
      var ed = this.ed;
      if (ed && opt.update) {
        if (opt.cellView && opt.annotationsProperty) {
          // Note that we have to deep clone the annotations so that
          // all the backbone `changed` mechanism works. This is because
          // the text editor modifies the `annotations` array in-place.
          opt.cellView.model.prop(opt.annotationsProperty, cloneDeep(annotations), {
            rewrite: true,
            textEditor: ed.cid
          });
          ed.setAnnotations(annotations);
        } else {
          core_mjs.V(ed.options.text).text(ed.getTextContent(), {
            annotations: annotations
          });
        }

        // Refresh the selection boxes or the caret position after
        // the annotations are applied.
        var range = this.getSelectionRange();
        var selectionLength = this.getSelectionLength();
        if (selectionLength > 0) {
          ed.select(range.start, range.end);
        } else {
          ed.setCaret();
        }
      }
    },
    proxy: function proxy(method, args) {
      var ed = this.ed;
      if (!ed) return;
      return ed[method].apply(ed, args);
    },
    isEmptyLine: function isEmptyLine(text, index) {
      var prev = text[index - 1];
      var curr = text[index];
      // The empty line at the beginning of the text.
      if (index === 0 && curr === '\n') return true;
      // The empty line in the middle of the text.
      if (curr === '\n' && prev === '\n') return true;
      // The empty line at the end of the text.
      if (index === text.length && prev === '\n') return true;
      return false;
    },
    // Return `true` if the character at the position `charNum` is
    // a newline character but does not denote an empty line.
    // In other words, the newline character under `charNum` is
    // ending a non-empty line.
    isLineEnding: function isLineEnding(text, index) {
      return text[index] === '\n' && index > 0 && text[index - 1] !== '\n';
    },
    isLineStart: function isLineStart(text, index) {
      if (text[index] === '\n') return false;
      if (index === 0) return true;
      if (text[index - 1] === '\n') return true;
      return false;
    },
    getCombinedAnnotationAttrsAtIndex: getCombinedAnnotationAttrsAtIndex,
    getCombinedAnnotationAttrsBetweenIndexes: getCombinedAnnotationAttrsBetweenIndexes,
    normalizeAnnotations: normalizeAnnotations
  }, Backbone.Events));

  // Proxy useful methods to the active `ui.TextEditor` instance.

  TextEditor.findAnnotationsUnderCursor = function () {
    var ed = this.ed;
    if (!ed) return null;
    return this.proxy('findAnnotationsUnderCursor', [ed.getAnnotations(), ed.getSelectionStart()]);
  };
  TextEditor.findAnnotationsInSelection = function () {
    var ed = this.ed;
    if (!ed) return null;
    // Get the *normalized* selection range.
    var _ed$getSelectionRange = ed.getSelectionRange(),
      start = _ed$getSelectionRange.start,
      end = _ed$getSelectionRange.end;
    return this.proxy('findAnnotationsInSelection', [ed.getAnnotations(), start, end]);
  };
  TextEditor.getSelectionAttrs = function (annotations) {
    var ed = this.ed;
    if (!ed) return null;
    return this.proxy('getSelectionAttrs', [ed.getSelectionRange(), annotations]);
  };

  // other proxy methods with the same signature as the prototype counterpart
  ['setCurrentAnnotation', 'getAnnotations', 'setCaret', 'deselect', 'selectAll', 'select', 'getNumberOfChars', 'getCharNumFromEvent', 'getWordBoundary', 'getSelectionLength', 'getSelectionRange'].forEach(function (method) {
    TextEditor[method] = function () {
      return this.proxy(method, arguments);
    };
  });
  function cloneDeep(annotations) {
    // JSON.parse/stringify is still the fastest
    // way of deep cloning objects. See http://jsperf.com/lodash-deepclone-vs-jquery-extend-deep/5.
    try {
      return JSON.parse(JSON.stringify(annotations));
    } catch (e) {
      return undefined;
    }
  }

  exports.TextEditor = TextEditor;

}(this.joint.ui = this.joint.ui || {}, $, Backbone, joint));
