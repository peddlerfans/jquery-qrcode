/*! JointJS+ v3.6.3 - HTML5 Diagramming Framework

Copyright (c) 2022 client IO

 2022-12-09 


This Source Code Form is subject to the terms of the JointJS+ License
, v. 2.0. If a copy of the JointJS+ License was not distributed with this
file, You can obtain one at http://jointjs.com/license/rappid_v2.txt
 or from the JointJS+ archive as was distributed by client IO. See the LICENSE file.*/


this.joint = this.joint || {};
(function (exports, core_mjs) {
  'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
  }
  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }
  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }
  function _iterableToArrayLimit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);
        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
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
  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
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

  // `IsArray` abstract operation
  // https://tc39.es/ecma262/#sec-isarray
  // eslint-disable-next-line es/no-array-isarray -- safe
  var isArray = Array.isArray || function isArray(argument) {
    return classofRaw(argument) == 'Array';
  };

  // `Array.isArray` method
  // https://tc39.es/ecma262/#sec-array.isarray
  _export({ target: 'Array', stat: true }, {
    isArray: isArray
  });

  var bind = functionUncurryThis(functionUncurryThis.bind);

  // optional / simple context binding
  var functionBindContext = function (fn, that) {
    aCallable(fn);
    return that === undefined ? fn : functionBindNative ? bind(fn, that) : function (/* ...args */) {
      return fn.apply(that, arguments);
    };
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

  var createProperty = function (object, key, value) {
    var propertyKey = toPropertyKey(key);
    if (propertyKey in object) objectDefineProperty.f(object, propertyKey, createPropertyDescriptor(0, value));
    else object[propertyKey] = value;
  };

  var ITERATOR$1 = wellKnownSymbol('iterator');

  var getIteratorMethod = function (it) {
    if (!isNullOrUndefined(it)) return getMethod(it, ITERATOR$1)
      || getMethod(it, '@@iterator')
      || iterators[classof(it)];
  };

  var $TypeError$6 = TypeError;

  var getIterator = function (argument, usingIterator) {
    var iteratorMethod = arguments.length < 2 ? getIteratorMethod(argument) : usingIterator;
    if (aCallable(iteratorMethod)) return anObject(functionCall(iteratorMethod, argument));
    throw $TypeError$6(tryToString(argument) + ' is not iterable');
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

  var $String$2 = String;

  var toString_1 = function (argument) {
    if (classof(argument) === 'Symbol') throw TypeError('Cannot convert a Symbol value to a string');
    return $String$2(argument);
  };

  var charAt = functionUncurryThis(''.charAt);
  var charCodeAt = functionUncurryThis(''.charCodeAt);
  var stringSlice$1 = functionUncurryThis(''.slice);

  var createMethod$2 = function (CONVERT_TO_STRING) {
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
    codeAt: createMethod$2(false),
    // `String.prototype.at` method
    // https://github.com/mathiasbynens/String.prototype.at
    charAt: createMethod$2(true)
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

  var defineProperty$1 = objectDefineProperty.f;



  var TO_STRING_TAG$2 = wellKnownSymbol('toStringTag');

  var setToStringTag = function (target, TAG, STATIC) {
    if (target && !STATIC) target = target.prototype;
    if (target && !hasOwnProperty_1(target, TO_STRING_TAG$2)) {
      defineProperty$1(target, TO_STRING_TAG$2, { configurable: true, value: TAG });
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

  var $String$3 = String;
  var $TypeError$7 = TypeError;

  var aPossiblePrototype = function (argument) {
    if (typeof argument == 'object' || isCallable(argument)) return argument;
    throw $TypeError$7("Can't set " + $String$3(argument) + ' as a prototype');
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

  var $TypeError$8 = TypeError;
  // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
  var getOwnPropertyDescriptor$2 = Object.getOwnPropertyDescriptor;

  // Safari < 13 does not throw an error in this case
  var SILENT_ON_NON_WRITABLE_LENGTH_SET = descriptors && !function () {
    // makes no sense without proper strict mode support
    if (this !== undefined) return true;
    try {
      // eslint-disable-next-line es/no-object-defineproperty -- safe
      Object.defineProperty([], 'length', { writable: false }).length = 1;
    } catch (error) {
      return error instanceof TypeError;
    }
  }();

  var arraySetLength = SILENT_ON_NON_WRITABLE_LENGTH_SET ? function (O, length) {
    if (isArray(O) && !getOwnPropertyDescriptor$2(O, 'length').writable) {
      throw $TypeError$8('Cannot set read only .length');
    } return O.length = length;
  } : function (O, length) {
    return O.length = length;
  };

  var $TypeError$9 = TypeError;
  var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF; // 2 ** 53 - 1 == 9007199254740991

  var doesNotExceedSafeInteger = function (it) {
    if (it > MAX_SAFE_INTEGER) throw $TypeError$9('Maximum allowed index exceeded');
    return it;
  };

  var $TypeError$a = TypeError;

  var deletePropertyOrThrow = function (O, P) {
    if (!delete O[P]) throw $TypeError$a('Cannot delete property ' + tryToString(P) + ' of ' + tryToString(O));
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

  var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('splice');

  var max$1 = Math.max;
  var min$2 = Math.min;

  // `Array.prototype.splice` method
  // https://tc39.es/ecma262/#sec-array.prototype.splice
  // with adding support of @@species
  _export({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
    splice: function splice(start, deleteCount /* , ...items */) {
      var O = toObject(this);
      var len = lengthOfArrayLike(O);
      var actualStart = toAbsoluteIndex(start, len);
      var argumentsLength = arguments.length;
      var insertCount, actualDeleteCount, A, k, from, to;
      if (argumentsLength === 0) {
        insertCount = actualDeleteCount = 0;
      } else if (argumentsLength === 1) {
        insertCount = 0;
        actualDeleteCount = len - actualStart;
      } else {
        insertCount = argumentsLength - 2;
        actualDeleteCount = min$2(max$1(toIntegerOrInfinity(deleteCount), 0), len - actualStart);
      }
      doesNotExceedSafeInteger(len + insertCount - actualDeleteCount);
      A = arraySpeciesCreate(O, actualDeleteCount);
      for (k = 0; k < actualDeleteCount; k++) {
        from = actualStart + k;
        if (from in O) createProperty(A, k, O[from]);
      }
      A.length = actualDeleteCount;
      if (insertCount < actualDeleteCount) {
        for (k = actualStart; k < len - actualDeleteCount; k++) {
          from = k + actualDeleteCount;
          to = k + insertCount;
          if (from in O) O[to] = O[from];
          else deletePropertyOrThrow(O, to);
        }
        for (k = len; k > len - actualDeleteCount + insertCount; k--) deletePropertyOrThrow(O, k - 1);
      } else if (insertCount > actualDeleteCount) {
        for (k = len - actualDeleteCount; k > actualStart; k--) {
          from = k + actualDeleteCount - 1;
          to = k + insertCount - 1;
          if (from in O) O[to] = O[from];
          else deletePropertyOrThrow(O, to);
        }
      }
      for (k = 0; k < insertCount; k++) {
        O[k + actualStart] = arguments[k + 2];
      }
      arraySetLength(O, len - actualDeleteCount + insertCount);
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

  var arraySlice = functionUncurryThis([].slice);

  var HAS_SPECIES_SUPPORT$3 = arrayMethodHasSpeciesSupport('slice');

  var SPECIES$2 = wellKnownSymbol('species');
  var $Array$2 = Array;
  var max$2 = Math.max;

  // `Array.prototype.slice` method
  // https://tc39.es/ecma262/#sec-array.prototype.slice
  // fallback for not array-like ES3 strings and DOM objects
  _export({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$3 }, {
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
      result = new (Constructor === undefined ? $Array$2 : Constructor)(max$2(fin - k, 0));
      for (n = 0; k < fin; k++, n++) if (k in O) createProperty(result, n, O[k]);
      result.length = n;
      return result;
    }
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

  var FORCED$1 = fails(function () {
    return new Date(NaN).toJSON() !== null
      || Date.prototype.toJSON.call({ toISOString: function () { return 1; } }) !== 1;
  });

  // `Date.prototype.toJSON` method
  // https://tc39.es/ecma262/#sec-date.prototype.tojson
  _export({ target: 'Date', proto: true, arity: 1, forced: FORCED$1 }, {
    // eslint-disable-next-line no-unused-vars -- required for `.length`
    toJSON: function toJSON(key) {
      var O = toObject(this);
      var pv = toPrimitive(O, 'number');
      return typeof pv == 'number' && !isFinite(pv) ? null : O.toISOString();
    }
  });

  // `URL.prototype.toJSON` method
  // https://url.spec.whatwg.org/#dom-url-tojson
  _export({ target: 'URL', proto: true, enumerable: true }, {
    toJSON: function toJSON() {
      return functionCall(URL.prototype.toString, this);
    }
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

  // a string of all valid unicode whitespaces
  var whitespaces = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002' +
    '\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

  var replace = functionUncurryThis(''.replace);
  var whitespace = '[' + whitespaces + ']';
  var ltrim = RegExp('^' + whitespace + whitespace + '*');
  var rtrim = RegExp(whitespace + whitespace + '*$');

  // `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation
  var createMethod$3 = function (TYPE) {
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
    start: createMethod$3(1),
    // `String.prototype.{ trimRight, trimEnd }` methods
    // https://tc39.es/ecma262/#sec-string.prototype.trimend
    end: createMethod$3(2),
    // `String.prototype.trim` method
    // https://tc39.es/ecma262/#sec-string.prototype.trim
    trim: createMethod$3(3)
  };

  var getOwnPropertyNames = objectGetOwnPropertyNames.f;
  var getOwnPropertyDescriptor$3 = objectGetOwnPropertyDescriptor.f;
  var defineProperty$2 = objectDefineProperty.f;

  var trim = stringTrim.trim;

  var NUMBER = 'Number';
  var NativeNumber = global_1[NUMBER];
  var NumberPrototype = NativeNumber.prototype;
  var TypeError$2 = global_1.TypeError;
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
    if (isSymbol(it)) throw TypeError$2('Cannot convert a Symbol value to a number');
    if (typeof it == 'string' && it.length > 2) {
      it = trim(it);
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
        defineProperty$2(NumberWrapper, key, getOwnPropertyDescriptor$3(NativeNumber, key));
      }
    }
    NumberWrapper.prototype = NumberPrototype;
    NumberPrototype.constructor = NumberWrapper;
    defineBuiltIn(global_1, NUMBER, NumberWrapper, { constructor: true });
  }

  var $TypeError$b = TypeError;

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
          throw $TypeError$b('Reduce of empty array with no initial value');
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

  var engineIsNode = classofRaw(global_1.process) == 'process';

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

  var FAILS_ON_PRIMITIVES = fails(function () { objectKeys(1); });

  // `Object.keys` method
  // https://tc39.es/ecma262/#sec-object.keys
  _export({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES }, {
    keys: function keys(it) {
      return objectKeys(toObject(it));
    }
  });

  var Element = core_mjs.dia.Element;
  var ElementView = core_mjs.dia.ElementView;
  var ElementViewPrototype = ElementView.prototype;

  // Models

  var Record = Element.define('standard.Record', {
    size: {
      width: 100
    },
    padding: 0,
    scrollTop: null,
    items: [],
    itemHeight: 20,
    itemOffset: 20,
    itemMinLabelWidth: 10,
    itemButtonSize: 10,
    itemIcon: {
      width: 16,
      height: 16,
      padding: 2
    },
    itemOverflow: false,
    itemAboveViewSelector: 'root',
    itemBelowViewSelector: 'root',
    attrs: {
      wrapper: {
        scrollable: true
      },
      bodiesGroups: {
        fill: 'transparent',
        stroke: 'none'
      },
      labelsGroups: {
        fill: '#333333'
      },
      buttonsGroups: {
        fill: 'transparent',
        stroke: '#333333',
        strokeWidth: 1
      },
      forksGroups: {
        stroke: '#333333'
      },
      groups: {
        groupPosition: true
      },
      itemBodies: {
        groupWidth: true,
        itemHighlight: {
          'fill': '#eeeeee'
        }
      },
      itemLabels: {
        fontSize: 16,
        textVerticalAnchor: 'middle',
        itemText: {
          textWrap: true,
          ellipsis: true
        },
        itemHighlight: {
          'fill': 'red'
        }
      }
    }
  }, {
    markup: [],
    metrics: null,
    markupAttributes: ['items', 'itemHeight', 'itemOffset', 'itemIcon', 'itemMinLabelWidth', 'itemButtonSize', 'itemOverflow', 'padding'],
    initialize: function initialize() {
      core_mjs.dia.Element.prototype.initialize.apply(this, arguments);
      this.on('change', this.onChange, this);
      this.buildMarkup();
    },
    anyHasChanged: function anyHasChanged(attributes) {
      if (!Array.isArray(attributes)) return false;
      return attributes.some(function (attrName) {
        return this.hasChanged(attrName);
      }, this);
    },
    onChange: function onChange(_, opt) {
      if (opt.record !== this.id && this.hasChanged('markup')) error('Markup can not be modified.');
      if (this.anyHasChanged(this.markupAttributes)) this.buildMarkup(opt);
    },
    getPadding: function getPadding() {
      return core_mjs.util.normalizeSides(this.attributes.padding);
    },
    buildMarkup: function buildMarkup(opt) {
      var metrics = this.metrics = {};
      var cache = metrics.items = {};
      var attributes = this.attributes;
      var defaultItemHeight = attributes.itemHeight;
      var itemOffset = attributes.itemOffset;
      var itemOverflow = !!attributes.itemOverflow;
      var groups = attributes.items;
      if (!Array.isArray(groups)) groups = [];
      var groupsCount = groups.length;
      var groupY = 0;
      var markup = core_mjs.util.cloneDeep(this.markup);
      if (!Array.isArray(markup)) error('Expects Prototype JSON Markup.');
      var padding = this.getPadding();
      var minGroupWidth = 0;
      var rootGroups = [];
      markup.push({
        tagName: 'g',
        selector: 'wrapper',
        children: rootGroups
      });
      for (var i = 0; i < groupsCount; i++) {
        var itemBodiesMarkup = [];
        var labelsMarkup = [];
        var buttonsMarkup = [];
        var iconsMarkup = [];
        var forks = [];
        var items = Array.from(groups[i]);
        var queue = this.createQueue(items, 0, [], null);
        var y = 0;
        var minItemWidth = 0;
        while (queue.length > 0) {
          var queueItem = queue.pop();
          var path = queueItem.path;
          var level = queueItem.level;
          var item = queueItem.item;
          var parent = queueItem.parent;
          if (level === 0) path.splice(1, 0, i);
          var itemId = item.id;
          var visible = level !== -1;
          var itemHeight = item.height || defaultItemHeight;
          var icon = item.icon;
          var subItems = item.items;
          var highlighted = !!item.highlighted;
          var collapsed = !!item.collapsed;
          var hasSubItems = Array.isArray(subItems) && subItems.length > 0;
          if (!itemId) error('Item id required.');
          if (cache.hasOwnProperty(itemId)) error('Duplicated item id.');
          var itemCache = cache[itemId] = {
            path: path,
            visible: visible,
            parent: parent,
            label: item.label,
            height: itemHeight,
            group: i,
            hasSubItems: hasSubItems,
            highlighted: highlighted,
            collapsed: collapsed
          };
          if (hasSubItems) {
            itemCache.children = subItems.map(function (subItem) {
              return subItem.id;
            });
            Array.prototype.push.apply(queue, this.createQueue(subItems, collapsed || !visible ? -1 : level + 1, path, itemId));
          }
          if (!visible) continue;

          // Generate Markup
          var x = itemOffset * level;
          itemCache.x = x + itemOffset;
          itemCache.y = y;
          itemCache.cx = x + itemOffset / 2;
          itemCache.cy = y + itemHeight / 2;
          itemCache.span = item.span || 1;
          if (itemId) {
            var bodyMarkup = this.getItemBodyMarkup(item, x, y, i, itemOverflow && i === 0 ? padding.left : 0);
            itemBodiesMarkup.push(bodyMarkup);
            var labelMarkup = this.getItemLabelMarkup(item, x, y, i);
            labelsMarkup.push(labelMarkup);
            if (hasSubItems) {
              buttonsMarkup.push(this.getButtonMarkup(item, x, y, i));
              if (!collapsed) {
                forks.push(itemId);
              }
            }
            if (icon) {
              iconsMarkup.push(this.getIconMarkup(item, x, y, i));
              itemCache.x += attributes.itemIcon.width + attributes.itemIcon.padding;
            }
          }
          minItemWidth = Math.max(minItemWidth, itemCache.x + attributes.itemMinLabelWidth);
          y += itemHeight;
        }
        minGroupWidth = Math.max(minItemWidth, minGroupWidth);
        groupY = Math.max(groupY, y);
        var groupItems = [];
        rootGroups.push({
          tagName: 'g',
          selector: this.getSelector('group', i),
          groupSelector: 'groups',
          attributes: {
            'record-group': i
          },
          children: groupItems
        });
        // Items
        groupItems.push({
          tagName: 'g',
          selector: this.getSelector('bodiesGroup', i),
          groupSelector: 'bodiesGroups',
          children: itemBodiesMarkup
        }, {
          tagName: 'g',
          selector: this.getSelector('labelsGroup', i),
          groupSelector: 'labelsGroups',
          children: labelsMarkup
        });
        // Forks
        if (forks.length > 0) {
          groupItems.push({
            tagName: 'g',
            selector: this.getSelector('forksGroup', i),
            groupSelector: 'forksGroups',
            children: forks.map(this.getForkMarkup, this)
          });
        }
        // Buttons
        if (buttonsMarkup.length > 0) {
          groupItems.push({
            tagName: 'g',
            selector: this.getSelector('buttonsGroup', i),
            groupSelector: 'buttonsGroups',
            children: buttonsMarkup
          });
        }
        // Icons
        if (iconsMarkup.length > 0) {
          groupItems.push({
            tagName: 'g',
            selector: this.getSelector('iconsGroup', i),
            groupSelector: 'iconsGroups',
            children: iconsMarkup
          });
        }
      }
      metrics.padding = padding;
      metrics.groupsCount = groupsCount;
      metrics.overflow = itemOverflow;
      metrics.minHeight = groupY + padding.top + padding.bottom;
      metrics.minWidth = minGroupWidth * groupsCount + padding.left + padding.right;

      // Use `dry` flag to let the command manager know not to record this change.
      var flags = core_mjs.util.assign({
        record: this.id,
        dry: true
      }, opt);
      this.set('markup', markup, flags);
      this.autoresize(flags);
    },
    autoresize: function autoresize(opt) {
      var minSize = this.getMinimalSize();
      var size = this.attributes.size;
      var height = size.height,
        width = size.width;
      var newHeight = this.getScrollTop() === null ? minSize.height // No scrollbar - use minimal height
      : height; // With scrollbar - use current height
      var newWidth = Math.max(width, minSize.width);
      this.resize(newWidth, newHeight, opt);
    },
    getMinimalSize: function getMinimalSize() {
      var metrics = this.metrics;
      return {
        width: metrics.minWidth,
        height: metrics.minHeight
      };
    },
    removeInvalidLinks: function removeInvalidLinks(opt) {
      var graph = this.graph;
      if (!graph) return [];
      return graph.getConnectedLinks(this).filter(this.isLinkInvalid, this).map(function (link) {
        return link.remove(opt);
      });
    },
    isLinkInvalid: function isLinkInvalid(link) {
      var id = this.id;
      var items = this.metrics.items;
      var source = link.source();
      if (source.id === id && source.hasOwnProperty('port') && !(items[source.port] || this.hasPort(source.port))) return true;
      var target = link.target();
      if (target.id === id && target.hasOwnProperty('port') && !(items[target.port] || this.hasPort(target.port))) return true;
      return false;
    },
    createQueue: function createQueue(items, level, path, parent) {
      var length = items.length;
      return Array.from({
        length: length
      }, function (_, i) {
        var itemIndex = length - i - 1;
        return {
          path: path.concat(['items', itemIndex]),
          item: items[itemIndex],
          level: level,
          parent: parent
        };
      });
    },
    getGroupSelector: function getGroupSelector(selector) {
      var ids = Array.prototype.slice.call(arguments, 1);
      var groupSelector = [selector];
      for (var i = 0, n = ids.length; i < n; i++) {
        var groups = ids[i];
        if (groups === null || groups === undefined) continue;
        if (!Array.isArray(groups)) groups = [groups];
        for (var j = 0, m = groups.length; j < m; j++) {
          groupSelector.push(this.getSelector(selector, groups[j]));
        }
      }
      return groupSelector;
    },
    getItemLabelMarkup: function getItemLabelMarkup(item, x, y, i) {
      var attributes = this.attributes;
      var itemOffset = attributes.itemOffset;
      var itemHeight = item.height || attributes.itemHeight;
      var itemId = item.id;
      var textX = x + itemOffset;
      if (item.icon) {
        textX += attributes.itemIcon.width + 2 * attributes.itemIcon.padding;
      }
      return {
        tagName: 'text',
        className: 'record-item-label',
        selector: this.getSelector('itemLabel', itemId),
        groupSelector: this.getGroupSelector('itemLabels', i, item.group),
        attributes: {
          'x': textX,
          'y': y + itemHeight / 2,
          'item-id': itemId
        }
      };
    },
    getItemBodyMarkup: function getItemBodyMarkup(item, _, y, i, overflow) {
      var itemHeight = item.height || this.attributes.itemHeight;
      var x = 0;
      if (overflow) x -= overflow;
      var attributes = {
        'x': x,
        'y': y,
        'height': itemHeight,
        'item-id': item.id
      };
      var itemSpan = item.span;
      if (itemSpan) {
        attributes['item-span'] = itemSpan;
      }
      return {
        tagName: 'rect',
        selector: this.getSelector('itemBody', item.id),
        groupSelector: this.getGroupSelector('itemBodies', i, item.group),
        className: 'record-item-body',
        attributes: attributes
      };
    },
    getButtonMarkup: function getButtonMarkup(item, x, y) {
      var attributes = this.attributes;
      var buttonSize = attributes.itemButtonSize;
      var itemOffset = attributes.itemOffset;
      var itemHeight = item.height || attributes.itemHeight;
      return {
        tagName: 'path',
        className: 'record-item-button',
        attributes: {
          'd': this.getButtonPathData(x + itemOffset / 2, y + itemHeight / 2, buttonSize / 2, item.collapsed),
          'item-id': item.id,
          'cursor': 'pointer',
          'shape-rendering': 'geometricprecision'
        }
      };
    },
    getIconMarkup: function getIconMarkup(item, x, y) {
      var attributes = this.attributes;
      var itemOffset = attributes.itemOffset;
      var itemIcon = attributes.itemIcon;
      var itemHeight = item.height || attributes.itemHeight;
      return {
        tagName: 'image',
        className: 'record-item-icon',
        attributes: {
          'x': x + itemOffset + itemIcon.padding,
          'y': y + (itemHeight - itemIcon.height) / 2,
          'width': itemIcon.width,
          'height': itemIcon.height,
          'xlink:href': item.icon
        }
      };
    },
    getForkMarkup: function getForkMarkup(itemId) {
      return {
        tagName: 'path',
        attributes: {
          'd': this.getForkPathData(itemId),
          'fill': 'none'
        }
      };
    },
    getButtonPathData: function getButtonPathData(x, y, r, collapsed) {
      var path = ['M', x - r, y - r, x + r, y - r, x + r, y + r, x - r, y + r, 'Z', 'M', x - r / 2, y, x + r / 2, y];
      if (collapsed) {
        Array.prototype.push.apply(path, ['M', x, y - r / 2, x, y + r / 2]);
      }
      return path.join(' ');
    },
    getForkPathData: function getForkPathData(itemId) {
      var cache = this.metrics.items;
      if (!cache) return null;
      var itemCache = cache[itemId];
      if (!itemCache) return null;
      var children = itemCache.children;
      if (!children || children.length === 0) return null;
      var buttonSize = this.attributes.itemButtonSize;
      var d = [];
      var childCache;
      for (var i = 0, n = children.length; i < n; i++) {
        childCache = cache[children[i]];
        var x = childCache.cx + (childCache.hasSubItems ? -1 : 1) * buttonSize / 2;
        d.push('M', itemCache.cx, childCache.cy, x, childCache.cy);
      }
      d.push('M', itemCache.cx, itemCache.cy + buttonSize / 2, itemCache.cx, childCache.cy);
      return d.join(' ');
    },
    item: function item(itemId, value, opt) {
      var pathArray = this.getItemPathArray(itemId);
      if (!pathArray) return null;
      if (value === undefined) {
        return this.prop(pathArray);
      }
      return this.prop(pathArray, value, opt);
    },
    toggleItemCollapse: function toggleItemCollapse(itemId, opt) {
      var pathArray = this.getItemPathArray(itemId);
      if (!pathArray) return this;
      pathArray.push('collapsed');
      var collapsed = !!this.prop(pathArray);
      this.prop(pathArray, !collapsed, opt);
      return this;
    },
    toggleItemHighlight: function toggleItemHighlight(itemId, opt) {
      var pathArray = this.getItemPathArray(itemId);
      if (!pathArray) return this;
      pathArray.push('highlighted');
      var highlighted = !!this.prop(pathArray);
      this.prop(pathArray, !highlighted, opt);
      return this;
    },
    isItemVisible: function isItemVisible(itemId) {
      return this.getItemCacheAttribute(itemId, 'visible');
    },
    isItemCollapsed: function isItemCollapsed(itemId) {
      return this.getItemCacheAttribute(itemId, 'collapsed');
    },
    isItemHighlighted: function isItemHighlighted(itemId) {
      return this.getItemCacheAttribute(itemId, 'highlighted');
    },
    getItemParentId: function getItemParentId(itemId) {
      return this.getItemCacheAttribute(itemId, 'parent');
    },
    getItemGroupIndex: function getItemGroupIndex(itemId) {
      return this.getItemCacheAttribute(itemId, 'group');
    },
    getItemPathArray: function getItemPathArray(itemId) {
      var path = this.getItemCacheAttribute(itemId, 'path');
      if (path) return path.slice();
      return null;
    },
    getItemSide: function getItemSide(itemId) {
      var groupIndex = this.getItemGroupIndex(itemId);
      if (groupIndex === null) return null;
      var metrics = this.metrics;
      var groupsCount = metrics.groupsCount;
      if (groupsCount > 1) {
        if (groupIndex === 0) return 'left';
        if (groupIndex + metrics.items[itemId].span - 1 === groupsCount - 1) return 'right';
      }
      return 'middle';
    },
    getItemCacheAttribute: function getItemCacheAttribute(itemId, attribute) {
      if (!attribute) return null;
      var itemCache = this.getItemCache(itemId);
      if (!itemCache) return null;
      return itemCache[attribute];
    },
    getItemCache: function getItemCache(itemId) {
      var cache = this.metrics.items;
      if (!cache) return null;
      var itemCache = cache[itemId];
      if (!itemCache) return null;
      return itemCache;
    },
    getItemBBox: function getItemBBox(itemId) {
      var itemCache = this.getItemCache(itemId);
      if (!itemCache) return null;
      var x = itemCache.x,
        y = itemCache.y,
        width = itemCache.width,
        height = itemCache.height;
      return new core_mjs.g.Rect(x, y, width, height);
    },
    getSelector: function getSelector(type, id) {
      return type + '_' + id;
    },
    removeItem: function removeItem(itemId, opt) {
      var parentPathArray = this.getItemPathArray(itemId);
      if (!parentPathArray) return this;
      var index = parentPathArray.pop();
      var items = this.prop(parentPathArray).slice();
      if (items.length > 1) {
        // Removing a single item from items array. Items won't become empty.
        items.splice(index, 1);
        this.prop(parentPathArray, items, core_mjs.util.assign({
          rewrite: true
        }, opt));
      } else if (parentPathArray.length > 2) {
        // Removing the last child of a nested item
        this.removeProp(parentPathArray, opt);
      } else {
        // Removing the last child from the top level group
        index = parentPathArray.pop();
        items = this.get('items').slice();
        items.splice(index, 1, []);
        this.prop(parentPathArray, items, core_mjs.util.assign({
          rewrite: true
        }, opt));
      }
      return this;
    },
    addNextSibling: function addNextSibling(siblingId, item, opt) {
      var siblingPathArray = this.getItemPathArray(siblingId);
      if (!siblingPathArray) return this;
      var parentId = this.getItemParentId(siblingId) || this.getItemGroupIndex(siblingId);
      var index = siblingPathArray[siblingPathArray.length - 1] + 1;
      return this.addItemAtIndex(parentId, index, item, opt);
    },
    addPrevSibling: function addPrevSibling(siblingId, item, opt) {
      var siblingPathArray = this.getItemPathArray(siblingId);
      if (!siblingPathArray) return this;
      var parentId = this.getItemParentId(siblingId) || this.getItemGroupIndex(siblingId);
      var index = siblingPathArray[siblingPathArray.length - 1];
      return this.addItemAtIndex(parentId, index, item, opt);
    },
    addItemAtIndex: function addItemAtIndex(itemId, index, item, opt) {
      if (!item) return this;
      var itemsPathArray;
      switch (_typeof(itemId)) {
        case 'number':
          var groups = this.prop('items');
          var groupIndex = Math.min(Math.max(itemId, 0), groups.length);
          itemsPathArray = ['items', groupIndex];
          break;
        case 'string':
          itemsPathArray = this.getItemPathArray(itemId);
          if (!itemsPathArray) return this; // item does not exists
          itemsPathArray.push('items');
          break;
        default:
          error('Requires an item id.');
      }
      var newItems = this.prop(itemsPathArray);
      if (Array.isArray(newItems)) {
        newItems = newItems.slice();
      } else {
        newItems = [];
      }
      var newIndex = Math.min(Math.max(index, 0), newItems.length);
      newItems.splice(newIndex, 0, item);
      return this.prop(itemsPathArray, newItems, core_mjs.util.assign({
        rewrite: true
      }, opt));
    },
    toJSON: function toJSON() {
      var json = core_mjs.dia.Element.prototype.toJSON.apply(this, arguments);
      delete json.markup;
      return json;
    },
    // Scrolling

    getItemViewSign: function getItemViewSign(itemId) {
      if (!this.isItemVisible(itemId)) {
        error("Item \"".concat(itemId, "\" does not exist or is not visible."));
      }
      var attributes = this.attributes,
        metrics = this.metrics;
      var _metrics$items$itemId = metrics.items[itemId],
        y = _metrics$items$itemId.y,
        itemHeight = _metrics$items$itemId.height;
      var scrollTop = this.getScrollTop();
      if (scrollTop === null) return 0;
      var height = attributes.size.height;
      var _metrics$padding = metrics.padding,
        top = _metrics$padding.top,
        bottom = _metrics$padding.bottom;
      // overflow top
      if (y - scrollTop < 0) return -1;
      // overflow bottom;
      if (height - top - bottom - (y + itemHeight - scrollTop) < 0) return 1;
      // in view
      return 0;
    },
    isItemInView: function isItemInView(itemId) {
      return this.getItemViewSign(itemId) === 0;
    },
    isEveryItemInView: function isEveryItemInView() {
      if (this.getScrollTop() === null) return true;
      var minHeight = this.metrics.minHeight;
      var _this$size = this.size(),
        height = _this$size.height;
      return minHeight <= height;
    },
    clampScrollTop: function clampScrollTop(scrollTop) {
      var _this$size2 = this.size(),
        height = _this$size2.height;
      var minHeight = this.metrics.minHeight;
      if (!Number.isFinite(scrollTop)) return null;
      var clampedScrollTop = Math.min(Math.max(scrollTop, 0), Math.max(minHeight - height, 0));
      return clampedScrollTop;
    },
    getScrollTop: function getScrollTop() {
      return this.clampScrollTop(this.get('scrollTop'));
    },
    setScrollTop: function setScrollTop(scrollTop, opt) {
      var currentScrollTop = this.get('scrollTop');
      var clampedScrollTop = this.clampScrollTop(scrollTop);
      if (currentScrollTop === clampedScrollTop) return;
      this.set('scrollTop', clampedScrollTop, opt);
    }
  }, {
    attributes: {
      // Public Attributes
      itemText: {
        set: function set(opt, refBBox, node, attrs) {
          if (!core_mjs.util.isPlainObject(opt)) return null;
          var model = this.model;
          var itemId = node.getAttribute('item-id');
          var cache = model.metrics.items[itemId];
          if (!cache) return;
          var text = cache.label;
          var padding = model.metrics.padding;
          var groupsCount = model.metrics.groupsCount;
          var x1 = cache.x;
          var x2 = (refBBox.width - padding.left - padding.right) / groupsCount * cache.span - x1;
          var bbox = new core_mjs.g.Rect(x1, cache.y, x2, cache.height);
          var textAttribute, textValue;
          if (opt.textWrap) {
            textAttribute = 'textWrap';
            textValue = core_mjs.util.assign({
              text: text
            }, opt);
          } else {
            textAttribute = 'text';
            textValue = text;
          }
          this.getAttributeDefinition(textAttribute).set.call(this, textValue, bbox, node, attrs);
        }
      },
      itemHighlight: {
        set: function set(highlightAttributes, _, node, attrs) {
          if (!core_mjs.util.isPlainObject(highlightAttributes)) return null;
          var model = this.model;
          var itemId = node.getAttribute('item-id');
          var highlighted = model.getItemCacheAttribute(itemId, 'highlighted');
          switch (highlighted) {
            case true:
              return highlightAttributes;
            case null:
            case false:
              return Object.keys(highlightAttributes).reduce(function (res, attrName) {
                var attrDefined = attrs.hasOwnProperty(attrName) || attrs.hasOwnProperty(core_mjs.util.camelCase(attrName));
                if (!attrDefined && node.getAttribute(attrName)) {
                  // Remove the node attribute
                  res[attrName] = null;
                }
                return res;
              }, {});
          }
        }
      },
      // Private Attributes
      groupWidth: {
        set: function set(_, refBBox, node) {
          var metrics = this.model.metrics;
          var padding = metrics.padding;
          var groupsCount = metrics.groupsCount;
          var width = (refBBox.width - padding.left - padding.right) / groupsCount;
          var span = Number(node.getAttribute('item-span') || 1);
          if (!isFinite(span)) span = 1;
          width *= span;
          if (metrics.overflow) {
            var groupIndex = Number(this.findAttribute('record-group', node));
            if (groupIndex === 0) width += padding.left;
            if (groupIndex + span === groupsCount) width += padding.right;
          }
          return {
            width: width
          };
        }
      },
      groupPosition: {
        position: function position(_, refBBox, node) {
          var groupIndex = Number(node.getAttribute('record-group'));
          var metrics = this.model.metrics;
          var groupsCount = metrics.groupsCount;
          var padding = metrics.padding;
          var width = (refBBox.width - padding.left - padding.right) / groupsCount;
          var x = padding.left + groupIndex * width;
          var y = padding.top;
          return new core_mjs.g.Point(x, y);
        }
      },
      scrollable: {
        set: callWithScrollTop(function (scrollTop, refBBox) {
          var _this$paper = this.paper,
            svg = _this$paper.svg,
            defs = _this$paper.defs,
            model = this.model,
            cid = this.cid;
          var id = "scroll-clip-".concat(cid);
          var vRect;
          var vClipPath = svg.getElementById(id);
          if (!vClipPath) {
            vRect = core_mjs.V('rect');
            vClipPath = core_mjs.V('clipPath', {
              id: id
            }, [vRect]);
            vClipPath.appendTo(defs);
          } else {
            vClipPath = core_mjs.V(vClipPath);
            var _vClipPath$children = vClipPath.children();
            var _vClipPath$children2 = _slicedToArray(_vClipPath$children, 1);
            vRect = _vClipPath$children2[0];
          }
          var _model$metrics = model.metrics,
            padding = _model$metrics.padding,
            overflow = _model$metrics.overflow;
          var top = padding.top,
            bottom = padding.bottom,
            left = padding.left,
            right = padding.right;
          var x = 0;
          var width = refBBox.width;
          if (!overflow) {
            x += left;
            width -= left + right;
          }
          vRect.attr({
            'y': scrollTop + top,
            'x': x,
            'width': width,
            'height': Math.max(refBBox.height - top - bottom, 0)
          });
          return {
            'clip-path': "url(#".concat(id, ")")
          };
        }),
        position: callWithScrollTop(function (scrollTop) {
          return new core_mjs.g.Point(0, -scrollTop);
        })
      }
    }
  });
  var BorderedRecord = Record.define('standard.BorderedRecord', {
    padding: 0,
    attrs: {
      body: {
        refWidth: '100%',
        refHeight: '100%',
        stroke: '#000000',
        fill: '#FFFFFF'
      }
    }
  }, {
    markup: [{
      tagName: 'rect',
      selector: 'body'
    }]
  });
  var HeaderedRecord = Record.define('standard.HeaderedRecord', {
    padding: {
      top: 30,
      left: 0,
      right: 0,
      bottom: 0
    },
    itemAboveViewSelector: 'header',
    itemBelowViewSelector: 'header',
    attrs: {
      body: {
        refWidth: '100%',
        refHeight: '100%',
        stroke: '#000000',
        fill: '#FFFFFF'
      },
      header: {
        refWidth: '100%',
        height: 30,
        stroke: '#000000',
        fill: 'transparent'
      },
      headerLabel: {
        refX: '50%',
        refY: 15,
        textAnchor: 'middle',
        textVerticalAnchor: 'middle',
        fontSize: 20,
        fill: '#333333'
      }
    }
  }, {
    markup: [{
      tagName: 'rect',
      selector: 'body'
    }, {
      tagName: 'rect',
      selector: 'header'
    }, {
      tagName: 'text',
      selector: 'headerLabel'
    }]
  });

  // Views

  var RecordViewPresentationAttributes = Record.prototype.markupAttributes.reduce(function (presentationAttributes, attribute) {
    presentationAttributes[attribute] = ['UPDATE'];
    return presentationAttributes;
  }, {
    scrollTop: ['UPDATE', 'TOOLS']
  });
  var RecordView = core_mjs.dia.ElementView.extend({
    events: {
      'mousedown .record-item-button': 'onItemButtonClick',
      'touchstart .record-item-button': 'onItemButtonClick'
    },
    presentationAttributes: core_mjs.dia.ElementView.addPresentationAttributes(RecordViewPresentationAttributes),
    getLinkEnd: function getLinkEnd(magnet) {
      var end = {
        id: this.model.id,
        port: this.findAttribute('item-id', magnet) || this.findAttribute('port', magnet)
      };
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }
      return this.customizeLinkEnd.apply(this, [end, magnet].concat(args));
    },
    getMagnetFromLinkEnd: function getMagnetFromLinkEnd(end) {
      var itemId = end.port;
      var model = this.model;
      while (itemId && !model.isItemVisible(itemId)) {
        itemId = model.getItemParentId(itemId);
      }
      if (!itemId) {
        // The connected magnet is not an item (it's a port or arbitrary sub-node)
        return ElementViewPrototype.getMagnetFromLinkEnd.apply(this, arguments);
      }
      var sign = model.getItemViewSign(itemId);
      var selector;
      switch (sign) {
        case -1:
          selector = String(model.get('itemAboveViewSelector'));
          break;
        case 1:
          selector = String(model.get('itemBelowViewSelector'));
          break;
        case 0:
        default:
          selector = model.getSelector('itemBody', itemId);
          break;
      }
      return this.findBySelector(selector, this.el, this.selectors)[0];
    },
    onItemButtonClick: function onItemButtonClick(evt) {
      if (evt.button === 2) return;
      evt.stopPropagation();
      evt.preventDefault();
      var itemId = evt.currentTarget.getAttribute('item-id');
      this.model.toggleItemCollapse(itemId, {
        ui: true
      });
    }
  });
  var BorderedRecordView = RecordView;
  var HeaderedRecordView = RecordView;
  function error(message) {
    throw new Error('shapes.standard.Record: ' + message);
  }
  function callWithScrollTop(fn) {
    return function (scrollable) {
      if (!scrollable) return;
      var model = this.model;
      var scrollTop = model.getScrollTop();
      if (scrollTop !== null) {
        for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
          args[_key2 - 1] = arguments[_key2];
        }
        return fn.call.apply(fn, [this, scrollTop].concat(args));
      }
    };
  }

  exports.BorderedRecord = BorderedRecord;
  exports.BorderedRecordView = BorderedRecordView;
  exports.HeaderedRecord = HeaderedRecord;
  exports.HeaderedRecordView = HeaderedRecordView;
  exports.Record = Record;
  exports.RecordView = RecordView;

}(this.joint.shapes = this.joint.shapes || {}, joint));
