/*! JointJS+ v3.6.3 - HTML5 Diagramming Framework

Copyright (c) 2022 client IO

 2022-12-09 


This Source Code Form is subject to the terms of the JointJS+ License
, v. 2.0. If a copy of the JointJS+ License was not distributed with this
file, You can obtain one at http://jointjs.com/license/rappid_v2.txt
 or from the JointJS+ archive as was distributed by client IO. See the LICENSE file.*/


this.joint = this.joint || {};
(function (exports, jointjs) {
  'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }
  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    Object.defineProperty(subClass, "prototype", {
      writable: false
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }
  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }
  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };
    return _setPrototypeOf(o, p);
  }
  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;
    try {
      Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }
  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
  }
  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    } else if (call !== void 0) {
      throw new TypeError("Derived constructors may only return object or undefined");
    }
    return _assertThisInitialized(self);
  }
  function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();
    return function _createSuperInternal() {
      var Super = _getPrototypeOf(Derived),
        result;
      if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf(this).constructor;
        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }
      return _possibleConstructorReturn(this, result);
    };
  }
  function _superPropBase(object, property) {
    while (!Object.prototype.hasOwnProperty.call(object, property)) {
      object = _getPrototypeOf(object);
      if (object === null) break;
    }
    return object;
  }
  function _get() {
    if (typeof Reflect !== "undefined" && Reflect.get) {
      _get = Reflect.get.bind();
    } else {
      _get = function _get(target, property, receiver) {
        var base = _superPropBase(target, property);
        if (!base) return;
        var desc = Object.getOwnPropertyDescriptor(base, property);
        if (desc.get) {
          return desc.get.call(arguments.length < 3 ? target : receiver);
        }
        return desc.value;
      };
    }
    return _get.apply(this, arguments);
  }
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

  // `Object.keys` method
  // https://tc39.es/ecma262/#sec-object.keys
  // eslint-disable-next-line es/no-object-keys -- safe
  var objectKeys = Object.keys || function keys(O) {
    return objectKeysInternal(O, enumBugKeys);
  };

  // eslint-disable-next-line es/no-object-assign -- safe
  var $assign = Object.assign;
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  var defineProperty$1 = Object.defineProperty;
  var concat$1 = functionUncurryThis([].concat);

  // `Object.assign` method
  // https://tc39.es/ecma262/#sec-object.assign
  var objectAssign = !$assign || fails(function () {
    // should have correct order of operations (Edge bug)
    if (descriptors && $assign({ b: 1 }, $assign(defineProperty$1({}, 'a', {
      enumerable: true,
      get: function () {
        defineProperty$1(this, 'b', {
          value: 3,
          enumerable: false
        });
      }
    }), { b: 2 })).b !== 1) return true;
    // should work with symbols and should have deterministic property order (V8 bug)
    var A = {};
    var B = {};
    // eslint-disable-next-line es/no-symbol -- safe
    var symbol = Symbol();
    var alphabet = 'abcdefghijklmnopqrst';
    A[symbol] = 7;
    alphabet.split('').forEach(function (chr) { B[chr] = chr; });
    return $assign({}, A)[symbol] != 7 || objectKeys($assign({}, B)).join('') != alphabet;
  }) ? function assign(target, source) { // eslint-disable-line no-unused-vars -- required for `.length`
    var T = toObject(target);
    var argumentsLength = arguments.length;
    var index = 1;
    var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
    var propertyIsEnumerable = objectPropertyIsEnumerable.f;
    while (argumentsLength > index) {
      var S = indexedObject(arguments[index++]);
      var keys = getOwnPropertySymbols ? concat$1(objectKeys(S), getOwnPropertySymbols(S)) : objectKeys(S);
      var length = keys.length;
      var j = 0;
      var key;
      while (length > j) {
        key = keys[j++];
        if (!descriptors || functionCall(propertyIsEnumerable, S, key)) T[key] = S[key];
      }
    } return T;
  } : $assign;

  // `Object.assign` method
  // https://tc39.es/ecma262/#sec-object.assign
  // eslint-disable-next-line es/no-object-assign -- required for testing
  _export({ target: 'Object', stat: true, arity: 2, forced: Object.assign !== objectAssign }, {
    assign: objectAssign
  });

  // `IsArray` abstract operation
  // https://tc39.es/ecma262/#sec-isarray
  // eslint-disable-next-line es/no-array-isarray -- safe
  var isArray = Array.isArray || function isArray(argument) {
    return classofRaw(argument) == 'Array';
  };

  var $TypeError$6 = TypeError;
  var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF; // 2 ** 53 - 1 == 9007199254740991

  var doesNotExceedSafeInteger = function (it) {
    if (it > MAX_SAFE_INTEGER) throw $TypeError$6('Maximum allowed index exceeded');
    return it;
  };

  var createProperty = function (object, key, value) {
    var propertyKey = toPropertyKey(key);
    if (propertyKey in object) objectDefineProperty.f(object, propertyKey, createPropertyDescriptor(0, value));
    else object[propertyKey] = value;
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

  var OUTLINE_COLOR = '#222138';
  var FILL_COLOR = '#ffffff';
  var SECONDARY_FILL_COLOR = '#c6c7e2';
  var TEXT_MARGIN = 10;

  var offset = 30;
  var VSMCustomerSupplier = /*#__PURE__*/function (_dia$Element) {
    _inherits(VSMCustomerSupplier, _dia$Element);
    var _super = _createSuper(VSMCustomerSupplier);
    function VSMCustomerSupplier() {
      _classCallCheck(this, VSMCustomerSupplier);
      return _super.apply(this, arguments);
    }
    _createClass(VSMCustomerSupplier, [{
      key: "defaults",
      value: function defaults() {
        return Object.assign(Object.assign({}, _get(_getPrototypeOf(VSMCustomerSupplier.prototype), "defaults", this)), {
          type: 'VSMCustomerSupplier',
          size: {
            width: 120,
            height: 80
          },
          attrs: {
            body: {
              strokeWidth: 2,
              stroke: OUTLINE_COLOR,
              fill: FILL_COLOR,
              d: "M 0 ".concat(offset, " V calc(h) h calc(w) v -calc(h) l -calc(0.33 * w) ").concat(offset, " v ").concat(-offset, " l -calc(0.33 * w) ").concat(offset, " v ").concat(-offset, " z")
            },
            label: {
              text: 'Customer Supplier',
              textVerticalAnchor: 'middle',
              textAnchor: 'middle',
              textWrap: {
                width: -TEXT_MARGIN * 2,
                height: -offset - TEXT_MARGIN,
                ellipsis: true
              },
              x: 'calc(0.5 * w)',
              y: "calc(0.5 * h + ".concat(offset / 2, ")"),
              fontSize: 13,
              fontFamily: 'sans-serif',
              fill: OUTLINE_COLOR
            }
          }
        });
      }
    }, {
      key: "preinitialize",
      value: function preinitialize() {
        this.markup = [{
          tagName: 'path',
          selector: 'body'
        }, {
          tagName: 'text',
          selector: 'label'
        }];
      }
    }]);
    return VSMCustomerSupplier;
  }(jointjs.dia.Element);

  var VSMWorkcell = /*#__PURE__*/function (_dia$Element) {
    _inherits(VSMWorkcell, _dia$Element);
    var _super = _createSuper(VSMWorkcell);
    function VSMWorkcell() {
      _classCallCheck(this, VSMWorkcell);
      return _super.apply(this, arguments);
    }
    _createClass(VSMWorkcell, [{
      key: "defaults",
      value: function defaults() {
        return Object.assign(Object.assign({}, _get(_getPrototypeOf(VSMWorkcell.prototype), "defaults", this)), {
          type: 'VSMCustomerSupplier',
          size: {
            width: 120,
            height: 80
          },
          thickness: 15,
          attrs: {
            body: {
              strokeWidth: 2,
              stroke: OUTLINE_COLOR,
              fill: FILL_COLOR
            },
            label: {
              text: 'Workcell',
              textVerticalAnchor: 'top',
              textAnchor: 'middle',
              textWrap: {
                width: -20
              },
              x: 'calc(0.5 * w)',
              y: "calc(h + ".concat(TEXT_MARGIN, ")"),
              fontSize: 13,
              fontFamily: 'sans-serif',
              fill: OUTLINE_COLOR
            }
          }
        });
      }
    }, {
      key: "preinitialize",
      value: function preinitialize() {
        this.markup = [{
          tagName: 'path',
          selector: 'body'
        }, {
          tagName: 'text',
          selector: 'label'
        }];
      }
    }, {
      key: "initialize",
      value: function initialize() {
        var _this = this;
        _get(_getPrototypeOf(VSMWorkcell.prototype), "initialize", this).apply(this, arguments);
        this.on('change', function (_, opt) {
          if (!_this.hasChanged('thickness')) return;
          _this.resetThickness(opt);
        });
        this.resetThickness();
      }
    }, {
      key: "resetThickness",
      value: function resetThickness(opt) {
        var thickness = this.get('thickness') || 0;
        var d = "M 0 0 H calc(w) V calc(h) h ".concat(-thickness, " V ").concat(thickness, " H ").concat(thickness, " V calc(h) H 0 z");
        this.attr(['body', 'd'], d, opt);
      }
    }]);
    return VSMWorkcell;
  }(jointjs.dia.Element);

  var VSMTriangleInventory = /*#__PURE__*/function (_dia$Element) {
    _inherits(VSMTriangleInventory, _dia$Element);
    var _super = _createSuper(VSMTriangleInventory);
    function VSMTriangleInventory() {
      _classCallCheck(this, VSMTriangleInventory);
      return _super.apply(this, arguments);
    }
    _createClass(VSMTriangleInventory, [{
      key: "defaults",
      value: function defaults() {
        return Object.assign(Object.assign({}, _get(_getPrototypeOf(VSMTriangleInventory.prototype), "defaults", this)), {
          type: 'VSMTriangleInventory',
          size: {
            width: 80,
            height: 80
          },
          attrs: {
            body: {
              strokeWidth: 2,
              stroke: OUTLINE_COLOR,
              fill: FILL_COLOR,
              d: 'M calc(0.5*w) 0 calc(w) calc(h) H 0 Z'
            },
            icon: {
              stroke: OUTLINE_COLOR,
              fill: SECONDARY_FILL_COLOR,
              strokeWidth: 2,
              d: 'M calc(0.5*w-2) calc(0.4*h) V calc(0.8*h) h 4 V calc(0.4*h) Z'
            },
            label: {
              text: 'Triangle Inventory',
              textVerticalAnchor: 'top',
              textAnchor: 'middle',
              x: 'calc(0.5*w)',
              y: "calc(h + ".concat(TEXT_MARGIN, ")"),
              fontSize: 13,
              fontFamily: 'sans-serif',
              fill: OUTLINE_COLOR
            }
          }
        });
      }
    }, {
      key: "preinitialize",
      value: function preinitialize() {
        this.markup = [{
          tagName: 'path',
          selector: 'body'
        }, {
          tagName: 'path',
          selector: 'icon'
        }, {
          tagName: 'text',
          selector: 'label'
        }];
      }
    }]);
    return VSMTriangleInventory;
  }(jointjs.dia.Element);
  var VSMRoundedInventory = /*#__PURE__*/function (_dia$Element2) {
    _inherits(VSMRoundedInventory, _dia$Element2);
    var _super2 = _createSuper(VSMRoundedInventory);
    function VSMRoundedInventory() {
      _classCallCheck(this, VSMRoundedInventory);
      return _super2.apply(this, arguments);
    }
    _createClass(VSMRoundedInventory, [{
      key: "defaults",
      value: function defaults() {
        return Object.assign(Object.assign({}, _get(_getPrototypeOf(VSMRoundedInventory.prototype), "defaults", this)), {
          type: 'VSMRoundedInventory',
          size: {
            width: 80,
            height: 80
          },
          attrs: {
            body: {
              strokeWidth: 2,
              stroke: OUTLINE_COLOR,
              fill: FILL_COLOR,
              x: 0,
              y: 0,
              d: 'M 0 calc(h) C 0 calc(0.5 * h) 0 0 calc(0.5*w) 0 C calc(w) 0 calc(w) calc(0.5 * h) calc(w) calc(h) Z'
            },
            icon: {
              stroke: OUTLINE_COLOR,
              fill: SECONDARY_FILL_COLOR,
              strokeWidth: 2,
              d: 'M calc(0.5*w-2) calc(0.4*h) V calc(0.8*h) h 4 V calc(0.4*h) Z'
            },
            label: {
              text: 'Rounded Inventory',
              textVerticalAnchor: 'top',
              textAnchor: 'middle',
              x: 'calc(0.5 * w)',
              y: "calc(h + ".concat(TEXT_MARGIN, ")"),
              fontSize: 13,
              fontFamily: 'sans-serif',
              fill: OUTLINE_COLOR
            }
          }
        });
      }
    }, {
      key: "preinitialize",
      value: function preinitialize() {
        this.markup = [{
          tagName: 'path',
          selector: 'body'
        }, {
          tagName: 'path',
          selector: 'icon'
        }, {
          tagName: 'text',
          selector: 'label'
        }];
      }
    }]);
    return VSMRoundedInventory;
  }(jointjs.dia.Element);

  var VSMKaizenBurst = /*#__PURE__*/function (_dia$Element) {
    _inherits(VSMKaizenBurst, _dia$Element);
    var _super = _createSuper(VSMKaizenBurst);
    function VSMKaizenBurst() {
      _classCallCheck(this, VSMKaizenBurst);
      return _super.apply(this, arguments);
    }
    _createClass(VSMKaizenBurst, [{
      key: "defaults",
      value: function defaults() {
        return Object.assign(Object.assign({}, _get(_getPrototypeOf(VSMKaizenBurst.prototype), "defaults", this)), {
          type: 'VSMKaizenBurst',
          size: {
            width: 120,
            height: 120
          },
          attrs: {
            body: {
              strokeWidth: 2,
              stroke: OUTLINE_COLOR,
              fill: FILL_COLOR,
              refD: 'M 70 104 60 89 46 106 39 86 3 106 25 78 0 72 20 54 3 39 31 42 27 22 43 32 48 4 59 37 74 10 78 39 101 20 94 48 119 47 99 62 116 75 93 80 101 95 79 91 81 120 Z'
            },
            label: {
              text: 'Kaizen Burst',
              textVerticalAnchor: 'middle',
              textAnchor: 'middle',
              textWrap: {
                width: '50%',
                height: '50%',
                ellipsis: true
              },
              x: 'calc(0.5 * w)',
              y: 'calc(0.5 * h)',
              fontSize: 13,
              fontFamily: 'sans-serif',
              fill: OUTLINE_COLOR
            }
          }
        });
      }
    }, {
      key: "preinitialize",
      value: function preinitialize() {
        this.markup = [{
          tagName: 'path',
          selector: 'body'
        }, {
          tagName: 'text',
          selector: 'label'
        }];
      }
    }]);
    return VSMKaizenBurst;
  }(jointjs.dia.Element);

  var GAP = 5;
  var VSMOperator = /*#__PURE__*/function (_dia$Element) {
    _inherits(VSMOperator, _dia$Element);
    var _super = _createSuper(VSMOperator);
    function VSMOperator() {
      _classCallCheck(this, VSMOperator);
      return _super.apply(this, arguments);
    }
    _createClass(VSMOperator, [{
      key: "defaults",
      value: function defaults() {
        return Object.assign(Object.assign({}, _get(_getPrototypeOf(VSMOperator.prototype), "defaults", this)), {
          type: 'VSMOperator',
          size: {
            width: 40,
            height: 40
          },
          attrs: {
            body: {
              strokeWidth: 2,
              stroke: OUTLINE_COLOR,
              fill: FILL_COLOR,
              rx: 'calc(0.5 * w)',
              ry: 'calc(0.5 * h)',
              cx: 'calc(0.5 * w)',
              cy: 'calc(0.5 * h)'
            },
            cap: {
              fill: 'none',
              stroke: OUTLINE_COLOR,
              strokeWidth: 4,
              strokeLinecap: 'round',
              d: "M ".concat(-GAP, " calc(0.5 * h) A calc(0.5 * w + 5) calc(0.5 * h + 5) 0 1 1 calc(w+").concat(GAP, ") calc(0.5 * h)")
            },
            label: {
              text: 'Operator',
              textVerticalAnchor: 'top',
              textAnchor: 'middle',
              x: 'calc(0.5 * w)',
              y: "calc(h + ".concat(TEXT_MARGIN, ")"),
              fontSize: 13,
              fontFamily: 'sans-serif',
              fill: OUTLINE_COLOR
            }
          }
        });
      }
    }, {
      key: "preinitialize",
      value: function preinitialize() {
        this.markup = [{
          tagName: 'ellipse',
          selector: 'body'
        }, {
          tagName: 'path',
          selector: 'cap',
          attributes: {
            fill: 'none'
          }
        }, {
          tagName: 'text',
          selector: 'label'
        }];
      }
    }]);
    return VSMOperator;
  }(jointjs.dia.Element);

  var VSMMaterialPull = /*#__PURE__*/function (_dia$Element) {
    _inherits(VSMMaterialPull, _dia$Element);
    var _super = _createSuper(VSMMaterialPull);
    function VSMMaterialPull() {
      _classCallCheck(this, VSMMaterialPull);
      return _super.apply(this, arguments);
    }
    _createClass(VSMMaterialPull, [{
      key: "defaults",
      value: function defaults() {
        return Object.assign(Object.assign({}, _get(_getPrototypeOf(VSMMaterialPull.prototype), "defaults", this)), {
          type: 'VSMMaterialPull',
          size: {
            width: 60,
            height: 60
          },
          attrs: {
            body: {
              stroke: 'none',
              fill: 'transparent',
              rx: 'calc(0.5 * w)',
              ry: 'calc(0.5 * h)',
              cx: 'calc(0.5 * w)',
              cy: 'calc(0.5 * h)'
            },
            arrow: {
              fill: 'none',
              stroke: OUTLINE_COLOR,
              strokeWidth: 4,
              d: 'M calc(w) calc(0.5*h) A calc(0.5*w) calc(0.5*h) 0 1 0 calc(0.5*w) calc(h)',
              targetMarker: {
                'type': 'path',
                'stroke': OUTLINE_COLOR,
                'stroke-width': 2,
                'd': 'M 0 -6 -10 0 0 6 Z'
              }
            },
            label: {
              text: 'Material Pull',
              textVerticalAnchor: 'top',
              textAnchor: 'middle',
              x: 'calc(0.5 * w)',
              y: "calc(h + ".concat(TEXT_MARGIN, ")"),
              fontSize: 13,
              fontFamily: 'sans-serif',
              fill: OUTLINE_COLOR
            }
          }
        });
      }
    }, {
      key: "preinitialize",
      value: function preinitialize() {
        this.markup = [{
          tagName: 'ellipse',
          selector: 'body'
        }, {
          tagName: 'path',
          selector: 'arrow',
          attributes: {
            fill: 'none'
          }
        }, {
          tagName: 'text',
          selector: 'label'
        }];
      }
    }]);
    return VSMMaterialPull;
  }(jointjs.dia.Element);

  var VSMFIFOLane = /*#__PURE__*/function (_dia$Element) {
    _inherits(VSMFIFOLane, _dia$Element);
    var _super = _createSuper(VSMFIFOLane);
    function VSMFIFOLane() {
      _classCallCheck(this, VSMFIFOLane);
      return _super.apply(this, arguments);
    }
    _createClass(VSMFIFOLane, [{
      key: "defaults",
      value: function defaults() {
        return Object.assign(Object.assign({}, _get(_getPrototypeOf(VSMFIFOLane.prototype), "defaults", this)), {
          type: 'VSMFIFOLane',
          size: {
            width: 120,
            height: 60
          },
          attrs: {
            body: {
              fill: FILL_COLOR,
              width: 'calc(w)',
              height: 'calc(h)'
            },
            outline: {
              strokeWidth: 2,
              stroke: OUTLINE_COLOR,
              d: 'M 0 0 H calc(w) M calc(w) calc(h) H 0'
            },
            rectIcon: {
              x: 'calc(0.15*w - calc(0.15 * s))',
              y: 'calc(0.5*h - calc(0.15 * s))',
              width: 'calc(0.3 * s)',
              height: 'calc(0.3 * s)'
            },
            ellipseIcon: {
              cx: 'calc(0.85 * w)',
              cy: 'calc(0.5 * h)',
              rx: 'calc(0.15 * s)',
              ry: 'calc(0.15 * s)'
            },
            triangleIcon: {
              d: 'M calc(0.5*w) calc(0.5*h - calc(0.15 * s)) l -calc(0.15 * s) calc(0.3 * s) h calc(0.3 * s) z'
            },
            icons: {
              stroke: OUTLINE_COLOR,
              fill: SECONDARY_FILL_COLOR,
              strokeWidth: 2
            },
            label: {
              text: 'FIFO Line',
              textVerticalAnchor: 'top',
              textAnchor: 'middle',
              x: 'calc(0.5*w)',
              y: "calc(h + ".concat(TEXT_MARGIN, ")"),
              fontSize: 13,
              fontFamily: 'sans-serif',
              fill: OUTLINE_COLOR
            }
          }
        });
      }
    }, {
      key: "preinitialize",
      value: function preinitialize() {
        this.markup = [{
          tagName: 'rect',
          selector: 'body'
        }, {
          tagName: 'path',
          selector: 'outline'
        }, {
          tagName: 'rect',
          selector: 'rectIcon',
          groupSelector: 'icons'
        }, {
          tagName: 'path',
          selector: 'triangleIcon',
          groupSelector: 'icons'
        }, {
          tagName: 'ellipse',
          selector: 'ellipseIcon',
          groupSelector: 'icons'
        }, {
          tagName: 'text',
          selector: 'label'
        }];
      }
    }]);
    return VSMFIFOLane;
  }(jointjs.dia.Element);

  var ratio = 0.6;
  var VSMKanbanPost = /*#__PURE__*/function (_dia$Element) {
    _inherits(VSMKanbanPost, _dia$Element);
    var _super = _createSuper(VSMKanbanPost);
    function VSMKanbanPost() {
      _classCallCheck(this, VSMKanbanPost);
      return _super.apply(this, arguments);
    }
    _createClass(VSMKanbanPost, [{
      key: "defaults",
      value: function defaults() {
        return Object.assign(Object.assign({}, _get(_getPrototypeOf(VSMKanbanPost.prototype), "defaults", this)), {
          type: 'VSMKanbanPost',
          size: {
            width: 80,
            height: 80
          },
          attrs: {
            body: {
              strokeWidth: 4,
              stroke: OUTLINE_COLOR,
              strokeLinecap: 'round',
              fill: 'transparent',
              d: "M 0 0 V calc(".concat(ratio, " * h) H calc(w) V 0 M calc(0.5*w) calc(").concat(ratio, " * h) V calc(h) M calc(0.25*w) calc(h) H calc(0.75*w)")
            },
            label: {
              text: 'Kanban Post',
              textVerticalAnchor: 'top',
              textAnchor: 'middle',
              x: 'calc(0.5 * w)',
              y: "calc(h + ".concat(TEXT_MARGIN, ")"),
              fontSize: 13,
              fontFamily: 'sans-serif',
              fill: OUTLINE_COLOR
            }
          }
        });
      }
    }, {
      key: "preinitialize",
      value: function preinitialize() {
        this.markup = [{
          tagName: 'path',
          selector: 'body'
        }, {
          tagName: 'text',
          selector: 'label'
        }];
      }
    }]);
    return VSMKanbanPost;
  }(jointjs.dia.Element);

  var ratio$1 = 0.6;
  var VSMSequencePullBall = /*#__PURE__*/function (_dia$Element) {
    _inherits(VSMSequencePullBall, _dia$Element);
    var _super = _createSuper(VSMSequencePullBall);
    function VSMSequencePullBall() {
      _classCallCheck(this, VSMSequencePullBall);
      return _super.apply(this, arguments);
    }
    _createClass(VSMSequencePullBall, [{
      key: "defaults",
      value: function defaults() {
        return Object.assign(Object.assign({}, _get(_getPrototypeOf(VSMSequencePullBall.prototype), "defaults", this)), {
          type: 'VSMSequencePullBall',
          size: {
            width: 60,
            height: 60
          },
          attrs: {
            inner: {
              strokeWidth: 2,
              stroke: OUTLINE_COLOR,
              fill: SECONDARY_FILL_COLOR,
              rx: "calc(".concat(ratio$1 / 2, " * w)"),
              ry: "calc(".concat(ratio$1 / 2, " * h)"),
              cx: 'calc(0.5 * w)',
              cy: 'calc(0.5 * h)'
            },
            outer: {
              strokeWidth: 2,
              stroke: OUTLINE_COLOR,
              fill: FILL_COLOR,
              rx: 'calc(0.5 * w)',
              ry: 'calc(0.5 * h)',
              cx: 'calc(0.5 * w)',
              cy: 'calc(0.5 * h)'
            },
            label: {
              text: 'Sequence Pull Ball',
              textVerticalAnchor: 'top',
              textAnchor: 'middle',
              x: 'calc(0.5 * w)',
              y: "calc(h + ".concat(TEXT_MARGIN, ")"),
              fontSize: 13,
              fontFamily: 'sans-serif',
              fill: OUTLINE_COLOR
            }
          }
        });
      }
    }, {
      key: "preinitialize",
      value: function preinitialize() {
        this.markup = [{
          tagName: 'ellipse',
          selector: 'outer'
        }, {
          tagName: 'ellipse',
          selector: 'inner'
        }, {
          tagName: 'text',
          selector: 'label'
        }];
      }
    }]);
    return VSMSequencePullBall;
  }(jointjs.dia.Element);

  var VSMLoadLevelling = /*#__PURE__*/function (_dia$Element) {
    _inherits(VSMLoadLevelling, _dia$Element);
    var _super = _createSuper(VSMLoadLevelling);
    function VSMLoadLevelling() {
      _classCallCheck(this, VSMLoadLevelling);
      return _super.apply(this, arguments);
    }
    _createClass(VSMLoadLevelling, [{
      key: "defaults",
      value: function defaults() {
        return Object.assign(Object.assign({}, _get(_getPrototypeOf(VSMLoadLevelling.prototype), "defaults", this)), {
          type: 'VSMLoadLevelling',
          size: {
            width: 120,
            height: 60
          },
          attrs: {
            body: {
              fill: FILL_COLOR,
              width: 'calc(w)',
              height: 'calc(h)'
            },
            outline: {
              strokeWidth: 2,
              stroke: OUTLINE_COLOR,
              d: 'M 0 0 H calc(w) M calc(w) calc(h) H 0'
            },
            circle1Icon: {
              cx: 'calc(0.375 * w)',
              cy: 'calc(0.5 * h)',
              r: 'calc(0.1 * s)'
            },
            circle2Icon: {
              cx: 'calc(0.9 * w)',
              cy: 'calc(0.5 * h)',
              r: 'calc(0.1 * s)'
            },
            cross1Icon: {
              transform: 'translate(calc(0.1*w),calc(.5*h))',
              d: 'M -calc(.1*s) -calc(.1*s) L calc(.1*s) calc(.1*s) M -calc(.1*s) calc(.1*s) L calc(.1*s) -calc(.1*s)'
            },
            cross2Icon: {
              transform: 'translate(calc(0.625*w),calc(.5*h))',
              d: 'M -calc(.1*s) -calc(.1*s) L calc(.1*s) calc(.1*s) M -calc(.1*s) calc(.1*s) L calc(.1*s) -calc(.1*s)'
            },
            icons: {
              stroke: OUTLINE_COLOR,
              fill: 'none',
              strokeWidth: 2
            },
            label: {
              text: 'Load Levelling',
              textVerticalAnchor: 'top',
              textAnchor: 'middle',
              x: 'calc(0.5 * w)',
              y: "calc(h + ".concat(TEXT_MARGIN, ")"),
              fontSize: 13,
              fontFamily: 'sans-serif',
              fill: OUTLINE_COLOR
            }
          }
        });
      }
    }, {
      key: "preinitialize",
      value: function preinitialize() {
        this.markup = [{
          tagName: 'rect',
          selector: 'body'
        }, {
          tagName: 'path',
          selector: 'outline'
        }, {
          tagName: 'path',
          selector: 'cross1Icon',
          groupSelector: 'icons'
        }, {
          tagName: 'path',
          selector: 'cross2Icon',
          groupSelector: 'icons'
        }, {
          tagName: 'circle',
          selector: 'circle1Icon',
          groupSelector: 'icons'
        }, {
          tagName: 'circle',
          selector: 'circle2Icon',
          groupSelector: 'icons'
        }, {
          tagName: 'text',
          selector: 'label'
        }];
      }
    }]);
    return VSMLoadLevelling;
  }(jointjs.dia.Element);

  var VSMSignalKanban = /*#__PURE__*/function (_dia$Element) {
    _inherits(VSMSignalKanban, _dia$Element);
    var _super = _createSuper(VSMSignalKanban);
    function VSMSignalKanban() {
      _classCallCheck(this, VSMSignalKanban);
      return _super.apply(this, arguments);
    }
    _createClass(VSMSignalKanban, [{
      key: "defaults",
      value: function defaults() {
        return Object.assign(Object.assign({}, _get(_getPrototypeOf(VSMSignalKanban.prototype), "defaults", this)), {
          type: 'VSMSignalKanban',
          size: {
            width: 80,
            height: 80
          },
          attrs: {
            body: {
              strokeWidth: 2,
              stroke: OUTLINE_COLOR,
              fill: FILL_COLOR,
              x: 0,
              y: 0,
              d: 'M 0 0 H calc(w) L calc(0.5*w) calc(h) Z'
            },
            icon: {
              stroke: OUTLINE_COLOR,
              strokeWidth: 2,
              fill: SECONDARY_FILL_COLOR,
              x: 'calc(0.5 * w)',
              y: 'calc(0.4 * h)',
              textAnchor: 'middle',
              textVerticalAnchor: 'middle',
              text: 'S',
              fontSize: 36,
              fontWeight: 'bold',
              fontFamily: 'sans-serif'
            },
            label: {
              text: 'Signal Kanban',
              textVerticalAnchor: 'top',
              textAnchor: 'middle',
              x: 'calc(0.5 * w)',
              y: "calc(h + ".concat(TEXT_MARGIN, ")"),
              fontSize: 13,
              fontFamily: 'sans-serif',
              fill: OUTLINE_COLOR
            }
          }
        });
      }
    }, {
      key: "preinitialize",
      value: function preinitialize() {
        this.markup = [{
          tagName: 'path',
          selector: 'body'
        }, {
          tagName: 'text',
          selector: 'icon'
        }, {
          tagName: 'text',
          selector: 'label'
        }];
      }
    }]);
    return VSMSignalKanban;
  }(jointjs.dia.Element);

  var CORNER = 20;
  var OFFSET = 4;
  var VSMProductionKanban = /*#__PURE__*/function (_dia$Element) {
    _inherits(VSMProductionKanban, _dia$Element);
    var _super = _createSuper(VSMProductionKanban);
    function VSMProductionKanban() {
      _classCallCheck(this, VSMProductionKanban);
      return _super.apply(this, arguments);
    }
    _createClass(VSMProductionKanban, [{
      key: "defaults",
      value: function defaults() {
        return Object.assign(Object.assign({}, _get(_getPrototypeOf(VSMProductionKanban.prototype), "defaults", this)), {
          type: 'VSMProductionKanban',
          size: {
            width: 120,
            height: 80
          },
          attrs: {
            body: {
              strokeWidth: 2,
              stroke: OUTLINE_COLOR,
              fill: FILL_COLOR,
              x: 0,
              y: 0,
              d: "M 0 0 H calc(w - ".concat(CORNER, ") l ").concat(CORNER, " ").concat(CORNER, " V calc(h) H 0 Z")
            },
            label: {
              text: 'Production Kanban',
              textVerticalAnchor: 'middle',
              textAnchor: 'middle',
              textWrap: {
                width: -TEXT_MARGIN * 2,
                height: -TEXT_MARGIN * 2,
                ellipsis: true
              },
              x: 'calc(0.5 * w)',
              y: 'calc(0.5 * h)',
              fontSize: 13,
              fontFamily: 'sans-serif',
              fill: OUTLINE_COLOR
            }
          }
        });
      }
    }, {
      key: "preinitialize",
      value: function preinitialize() {
        this.markup = [{
          tagName: 'path',
          selector: 'body'
        }, {
          tagName: 'text',
          selector: 'label'
        }];
      }
    }]);
    return VSMProductionKanban;
  }(jointjs.dia.Element);
  var VSMProductionBatchKanban = /*#__PURE__*/function (_dia$Element2) {
    _inherits(VSMProductionBatchKanban, _dia$Element2);
    var _super2 = _createSuper(VSMProductionBatchKanban);
    function VSMProductionBatchKanban() {
      _classCallCheck(this, VSMProductionBatchKanban);
      return _super2.apply(this, arguments);
    }
    _createClass(VSMProductionBatchKanban, [{
      key: "defaults",
      value: function defaults() {
        return Object.assign(Object.assign({}, _get(_getPrototypeOf(VSMProductionBatchKanban.prototype), "defaults", this)), {
          type: 'VSMProductionKanban',
          size: {
            width: 120,
            height: 80
          },
          attrs: {
            bodies: {
              strokeWidth: 2,
              stroke: OUTLINE_COLOR,
              fill: FILL_COLOR,
              x: 0,
              y: 0,
              d: "M 0 0 H calc(w - ".concat(CORNER, ") l ").concat(CORNER, " ").concat(CORNER, " V calc(h) H 0 Z")
            },
            bodyMiddle: {
              transform: "translate(".concat(OFFSET, ", -").concat(OFFSET, ")")
            },
            bodyBottom: {
              transform: "translate(".concat(2 * OFFSET, ", -").concat(2 * OFFSET, ")")
            },
            label: {
              text: 'Production Batch Kanban',
              textVerticalAnchor: 'middle',
              textAnchor: 'middle',
              textWrap: {
                width: -TEXT_MARGIN * 2,
                height: -TEXT_MARGIN * 2,
                ellipsis: true
              },
              x: 'calc(0.5 * w)',
              y: 'calc(0.5 * h)',
              fontSize: 13,
              fontFamily: 'sans-serif',
              fill: OUTLINE_COLOR
            }
          }
        });
      }
    }, {
      key: "preinitialize",
      value: function preinitialize() {
        this.markup = [{
          tagName: 'path',
          selector: 'bodyBottom',
          groupSelector: 'bodies'
        }, {
          tagName: 'path',
          selector: 'bodyMiddle',
          groupSelector: 'bodies'
        }, {
          tagName: 'path',
          selector: 'body',
          groupSelector: 'bodies'
        }, {
          tagName: 'text',
          selector: 'label'
        }];
      }
    }]);
    return VSMProductionBatchKanban;
  }(jointjs.dia.Element);

  var getMaterialPattern = function getMaterialPattern(stroke, fill) {
    var size = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 20;
    var h = size / 2;
    return {
      type: 'pattern',
      attrs: {
        'width': size,
        'height': size,
        'stroke': stroke,
        'fill': fill,
        'stroke-width': 2
      },
      markup: [{
        tagName: 'rect',
        attributes: {
          'width': size,
          'height': size,
          'stroke': 'none'
        }
      }, {
        tagName: 'path',
        attributes: {
          'fill': 'none',
          'd': "M 0 ".concat(2 * h, " L ").concat(2 * h, " 0 M ").concat(h, " ").concat(3 * h, " L ").concat(3 * h, " ").concat(h, " M -").concat(h, " ").concat(h, " L ").concat(h, " -").concat(h)
        }
      }]
    };
  };

  var VSMMaterialKanban = /*#__PURE__*/function (_VSMProductionKanban) {
    _inherits(VSMMaterialKanban, _VSMProductionKanban);
    var _super = _createSuper(VSMMaterialKanban);
    function VSMMaterialKanban() {
      _classCallCheck(this, VSMMaterialKanban);
      return _super.apply(this, arguments);
    }
    _createClass(VSMMaterialKanban, [{
      key: "defaults",
      value: function defaults() {
        var defaults = _get(_getPrototypeOf(VSMMaterialKanban.prototype), "defaults", this).call(this);
        return Object.assign(Object.assign({}, defaults), {
          type: 'VSMMaterialKanban',
          attrs: jointjs.util.defaultsDeep({
            body: {
              fill: getMaterialPattern(SECONDARY_FILL_COLOR, FILL_COLOR)
            },
            label: {
              text: 'Material Kanban'
            }
          }, defaults.attrs)
        });
      }
    }]);
    return VSMMaterialKanban;
  }(VSMProductionKanban);
  var VSMMaterialBatchKanban = /*#__PURE__*/function (_VSMProductionBatchKa) {
    _inherits(VSMMaterialBatchKanban, _VSMProductionBatchKa);
    var _super2 = _createSuper(VSMMaterialBatchKanban);
    function VSMMaterialBatchKanban() {
      _classCallCheck(this, VSMMaterialBatchKanban);
      return _super2.apply(this, arguments);
    }
    _createClass(VSMMaterialBatchKanban, [{
      key: "defaults",
      value: function defaults() {
        var defaults = _get(_getPrototypeOf(VSMMaterialBatchKanban.prototype), "defaults", this).call(this);
        return Object.assign(Object.assign({}, defaults), {
          type: 'VSMMaterialBatchKanban',
          attrs: jointjs.util.defaultsDeep({
            body: {
              fill: getMaterialPattern(SECONDARY_FILL_COLOR, FILL_COLOR)
            },
            label: {
              text: 'Material Batch Kanban'
            }
          }, defaults.attrs)
        });
      }
    }]);
    return VSMMaterialBatchKanban;
  }(VSMProductionBatchKanban);

  var VSMSupermarketParts = /*#__PURE__*/function (_dia$Element) {
    _inherits(VSMSupermarketParts, _dia$Element);
    var _super = _createSuper(VSMSupermarketParts);
    function VSMSupermarketParts() {
      _classCallCheck(this, VSMSupermarketParts);
      return _super.apply(this, arguments);
    }
    _createClass(VSMSupermarketParts, [{
      key: "defaults",
      value: function defaults() {
        return Object.assign(Object.assign({}, _get(_getPrototypeOf(VSMSupermarketParts.prototype), "defaults", this)), {
          type: 'VSMSupermarketParts',
          size: {
            width: 120,
            height: 80
          },
          attrs: {
            body: {
              width: 'calc(w)',
              height: 'calc(h)',
              strokeWidth: 2,
              stroke: OUTLINE_COLOR,
              fill: getMaterialPattern(SECONDARY_FILL_COLOR, FILL_COLOR)
            },
            label: {
              text: 'Supermarket Parts',
              textVerticalAnchor: 'middle',
              textAnchor: 'middle',
              textWrap: {
                width: -10,
                height: -10,
                ellipsis: true
              },
              x: 'calc(0.5 * w)',
              y: 'calc(0.5 * h)',
              fontSize: 13,
              fontFamily: 'sans-serif',
              fill: OUTLINE_COLOR
            }
          }
        });
      }
    }, {
      key: "preinitialize",
      value: function preinitialize() {
        this.markup = [{
          tagName: 'rect',
          selector: 'body'
        }, {
          tagName: 'text',
          selector: 'label'
        }];
      }
    }]);
    return VSMSupermarketParts;
  }(jointjs.dia.Element);

  var VSMProductionControl = /*#__PURE__*/function (_dia$Element) {
    _inherits(VSMProductionControl, _dia$Element);
    var _super = _createSuper(VSMProductionControl);
    function VSMProductionControl() {
      _classCallCheck(this, VSMProductionControl);
      return _super.apply(this, arguments);
    }
    _createClass(VSMProductionControl, [{
      key: "defaults",
      value: function defaults() {
        return Object.assign(Object.assign({}, _get(_getPrototypeOf(VSMProductionControl.prototype), "defaults", this)), {
          type: 'VSMProductionControl',
          size: {
            width: 120,
            height: 80
          },
          attrs: {
            body: {
              width: 'calc(w)',
              height: 'calc(h)',
              strokeWidth: 2,
              stroke: OUTLINE_COLOR,
              fill: FILL_COLOR
            },
            label: {
              text: 'Production Control',
              textVerticalAnchor: 'middle',
              textAnchor: 'middle',
              textWrap: {
                width: -TEXT_MARGIN * 2,
                height: -TEXT_MARGIN * 2,
                ellipsis: true
              },
              x: 'calc(0.5 * w)',
              y: 'calc(0.5 * h)',
              fontSize: 13,
              fontFamily: 'sans-serif',
              fill: OUTLINE_COLOR
            }
          }
        });
      }
    }, {
      key: "preinitialize",
      value: function preinitialize() {
        this.markup = [{
          tagName: 'rect',
          selector: 'body'
        }, {
          tagName: 'text',
          selector: 'label'
        }];
      }
    }]);
    return VSMProductionControl;
  }(jointjs.dia.Element);

  var VSMSupermarket = /*#__PURE__*/function (_dia$Element) {
    _inherits(VSMSupermarket, _dia$Element);
    var _super = _createSuper(VSMSupermarket);
    function VSMSupermarket() {
      _classCallCheck(this, VSMSupermarket);
      return _super.apply(this, arguments);
    }
    _createClass(VSMSupermarket, [{
      key: "defaults",
      value: function defaults() {
        return Object.assign(Object.assign({}, _get(_getPrototypeOf(VSMSupermarket.prototype), "defaults", this)), {
          type: 'VSMSupermarket',
          size: {
            width: 80,
            height: 80
          },
          count: 2,
          attrs: {
            body: {
              strokeWidth: 4,
              stroke: OUTLINE_COLOR,
              strokeLinecap: 'round',
              fill: 'transparent'
            },
            label: {
              text: 'Supermarket',
              textVerticalAnchor: 'top',
              textAnchor: 'middle',
              x: 'calc(0.5 * w)',
              y: "calc(h + ".concat(TEXT_MARGIN, ")"),
              fontSize: 13,
              fontFamily: 'sans-serif',
              fill: OUTLINE_COLOR
            }
          }
        });
      }
    }, {
      key: "preinitialize",
      value: function preinitialize() {
        this.markup = [{
          tagName: 'path',
          selector: 'body'
        }, {
          tagName: 'text',
          selector: 'label'
        }];
      }
    }, {
      key: "initialize",
      value: function initialize() {
        var _this = this;
        _get(_getPrototypeOf(VSMSupermarket.prototype), "initialize", this).apply(this, arguments);
        this.on('change', function (_, opt) {
          if (!_this.hasChanged('count')) return;
          _this.resetCount(opt);
        });
        this.resetCount();
      }
    }, {
      key: "resetCount",
      value: function resetCount(opt) {
        var count = this.get('count') || 0;
        var d = 'M 0 0 H calc(w) V calc(h) H 0';
        var step = 1 / (count + 1);
        var y = step;
        for (var i = 0; i < count; i++) {
          d += " M calc(w) calc(".concat(y, "*h) H 0");
          y += step;
        }
        this.attr(['body', 'd'], d, opt);
      }
    }]);
    return VSMSupermarket;
  }(jointjs.dia.Element);

  var VSMSafetyStock = /*#__PURE__*/function (_dia$Element) {
    _inherits(VSMSafetyStock, _dia$Element);
    var _super = _createSuper(VSMSafetyStock);
    function VSMSafetyStock() {
      _classCallCheck(this, VSMSafetyStock);
      return _super.apply(this, arguments);
    }
    _createClass(VSMSafetyStock, [{
      key: "defaults",
      value: function defaults() {
        return Object.assign(Object.assign({}, _get(_getPrototypeOf(VSMSafetyStock.prototype), "defaults", this)), {
          type: 'VSMSafetyStock',
          size: {
            width: 40,
            height: 80
          },
          count: 2,
          attrs: {
            body: {
              strokeWidth: 2,
              stroke: OUTLINE_COLOR,
              fill: FILL_COLOR
            },
            label: {
              text: 'Safety Stock',
              textVerticalAnchor: 'top',
              textAnchor: 'middle',
              x: 'calc(0.5 * w)',
              y: "calc(h + ".concat(TEXT_MARGIN, ")"),
              fontSize: 13,
              fontFamily: 'sans-serif',
              fill: OUTLINE_COLOR
            }
          }
        });
      }
    }, {
      key: "preinitialize",
      value: function preinitialize() {
        this.markup = [{
          tagName: 'path',
          selector: 'body'
        }, {
          tagName: 'text',
          selector: 'label'
        }];
      }
    }, {
      key: "initialize",
      value: function initialize() {
        var _this = this;
        _get(_getPrototypeOf(VSMSafetyStock.prototype), "initialize", this).apply(this, arguments);
        this.on('change', function (_, opt) {
          if (!_this.hasChanged('count')) return;
          _this.resetCount(opt);
        });
        this.resetCount();
      }
    }, {
      key: "resetCount",
      value: function resetCount(opt) {
        var count = this.get('count') || 0;
        var step = 1 / (count + 1);
        var d = 'M 0 0 H calc(w) V calc(h) H 0 Z';
        var y = step;
        for (var i = 0; i < count; i++) {
          d += " M calc(w) calc(".concat(y, "*h) H 0");
          y += step;
        }
        this.attr(['body', 'd'], d, opt);
      }
    }]);
    return VSMSafetyStock;
  }(jointjs.dia.Element);

  var VSMGoSee = /*#__PURE__*/function (_dia$Element) {
    _inherits(VSMGoSee, _dia$Element);
    var _super = _createSuper(VSMGoSee);
    function VSMGoSee() {
      _classCallCheck(this, VSMGoSee);
      return _super.apply(this, arguments);
    }
    _createClass(VSMGoSee, [{
      key: "defaults",
      value: function defaults() {
        return Object.assign(Object.assign({}, _get(_getPrototypeOf(VSMGoSee.prototype), "defaults", this)), {
          type: 'VSMGoSee',
          size: {
            width: 120,
            height: 40
          },
          attrs: {
            body: {
              strokeWidth: 4,
              stroke: OUTLINE_COLOR,
              strokeLinecap: 'round',
              fill: SECONDARY_FILL_COLOR,
              refD: 'M 64 200 C 64 296 80 328 144 328 C 208 328 224 296 224 200 C 224 200 208 184 144 184 C 80 184 64 200 64 200 Z M 448 200 C 448 296 432 328 368 328 C 304 328 288 296 288 200 C 288 200 304 184 368 184 C 432 184 448 200 448 200 Z M 448 200 L 464 200 M 64 200 L 48 200 M 224 232 C 224 207 251 192 272 204 C 282 210 288 221 288 232 C 288 207 261 192 240 204 C 230 210 224 221 224 232'
            },
            label: {
              text: 'Go see',
              textVerticalAnchor: 'top',
              textAnchor: 'middle',
              x: 'calc(0.5 * w)',
              y: "calc(h + ".concat(TEXT_MARGIN, ")"),
              fontSize: 13,
              fontFamily: 'sans-serif',
              fill: OUTLINE_COLOR
            }
          }
        });
      }
    }, {
      key: "preinitialize",
      value: function preinitialize() {
        this.markup = [{
          tagName: 'path',
          selector: 'body'
        }, {
          tagName: 'text',
          selector: 'label'
        }];
      }
    }]);
    return VSMGoSee;
  }(jointjs.dia.Element);

  var VSMTimelineWaiting = /*#__PURE__*/function (_dia$Element) {
    _inherits(VSMTimelineWaiting, _dia$Element);
    var _super = _createSuper(VSMTimelineWaiting);
    function VSMTimelineWaiting() {
      _classCallCheck(this, VSMTimelineWaiting);
      return _super.apply(this, arguments);
    }
    _createClass(VSMTimelineWaiting, [{
      key: "defaults",
      value: function defaults() {
        return Object.assign(Object.assign({}, _get(_getPrototypeOf(VSMTimelineWaiting.prototype), "defaults", this)), {
          type: 'VSMTimelineWaiting',
          size: {
            width: 120,
            height: 40
          },
          attrs: {
            line: {
              strokeWidth: 3,
              stroke: OUTLINE_COLOR,
              strokeLinecap: 'round',
              fill: 'transparent',
              d: 'M 0 0 H calc(w) V calc(h)'
            },
            label: {
              text: 'Timeline Waiting',
              textVerticalAnchor: 'bottom',
              textAnchor: 'middle',
              textWrap: {
                width: -TEXT_MARGIN * 2,
                maxLineCount: 2,
                ellipsis: true
              },
              x: 'calc(0.5 * w)',
              y: -TEXT_MARGIN,
              fontSize: 13,
              fontFamily: 'sans-serif',
              fill: OUTLINE_COLOR
            }
          }
        });
      }
    }, {
      key: "preinitialize",
      value: function preinitialize() {
        this.markup = [{
          tagName: 'path',
          selector: 'line'
        }, {
          tagName: 'text',
          selector: 'label'
        }];
      }
    }]);
    return VSMTimelineWaiting;
  }(jointjs.dia.Element);
  var VSMTimelineProcessing = /*#__PURE__*/function (_dia$Element2) {
    _inherits(VSMTimelineProcessing, _dia$Element2);
    var _super2 = _createSuper(VSMTimelineProcessing);
    function VSMTimelineProcessing() {
      _classCallCheck(this, VSMTimelineProcessing);
      return _super2.apply(this, arguments);
    }
    _createClass(VSMTimelineProcessing, [{
      key: "defaults",
      value: function defaults() {
        return Object.assign(Object.assign({}, _get(_getPrototypeOf(VSMTimelineProcessing.prototype), "defaults", this)), {
          type: 'VSMTimelineProcessing',
          size: {
            width: 120,
            height: 40
          },
          attrs: {
            line: {
              strokeWidth: 3,
              stroke: OUTLINE_COLOR,
              strokeLinecap: 'round',
              fill: 'transparent',
              d: 'M 0 calc(h) H calc(w) V 0'
            },
            label: {
              text: 'Timeline Processing',
              textVerticalAnchor: 'bottom',
              textAnchor: 'middle',
              textWrap: {
                width: -10,
                maxLineCount: 2,
                ellipsis: true
              },
              x: 'calc(0.5*w)',
              y: "calc(h-".concat(TEXT_MARGIN, ")"),
              fontSize: 13,
              fontFamily: 'sans-serif',
              fill: OUTLINE_COLOR
            }
          }
        });
      }
    }, {
      key: "preinitialize",
      value: function preinitialize() {
        this.markup = [{
          tagName: 'path',
          selector: 'line'
        }, {
          tagName: 'text',
          selector: 'label'
        }];
      }
    }]);
    return VSMTimelineProcessing;
  }(jointjs.dia.Element);
  var VSMTimelineTotal = /*#__PURE__*/function (_dia$Element3) {
    _inherits(VSMTimelineTotal, _dia$Element3);
    var _super3 = _createSuper(VSMTimelineTotal);
    function VSMTimelineTotal() {
      _classCallCheck(this, VSMTimelineTotal);
      return _super3.apply(this, arguments);
    }
    _createClass(VSMTimelineTotal, [{
      key: "defaults",
      value: function defaults() {
        return Object.assign(Object.assign({}, _get(_getPrototypeOf(VSMTimelineTotal.prototype), "defaults", this)), {
          type: 'VSMTimelineTotal',
          size: {
            width: 120,
            height: 80
          },
          length: 80,
          attrs: {
            body: {
              fill: FILL_COLOR,
              stroke: OUTLINE_COLOR,
              strokeWidth: 2,
              width: 'calc(w)',
              height: 'calc(h)'
            },
            line: {
              strokeWidth: 3,
              stroke: OUTLINE_COLOR,
              strokeLinecap: 'round',
              fill: 'transparent',
              d: "M -".concat(length, " calc(0.5 * h) H calc(w)")
            },
            label: {
              text: 'Timeline Processing',
              textVerticalAnchor: 'bottom',
              textAnchor: 'middle',
              textWrap: {
                height: null
              },
              y: "calc(0.5*h-".concat(TEXT_MARGIN, ")"),
              fontSize: 13,
              fontFamily: 'sans-serif',
              fill: OUTLINE_COLOR
            },
            labelTotalWaiting: {
              text: 'Total Waiting',
              textVerticalAnchor: 'bottom',
              textAnchor: 'middle',
              textWrap: {
                width: -TEXT_MARGIN * 2,
                height: "calc(h/2-".concat(2 * TEXT_MARGIN, ")"),
                ellipsis: true
              },
              x: 'calc(0.5*w)',
              y: "calc(0.5*h-".concat(TEXT_MARGIN, ")"),
              fontSize: 13,
              fontFamily: 'sans-serif',
              fill: OUTLINE_COLOR
            },
            labelTotalProcessing: {
              text: 'Total Processing',
              textVerticalAnchor: 'bottom',
              textAnchor: 'middle',
              textWrap: {
                width: -TEXT_MARGIN * 2,
                height: "calc(h/2-".concat(2 * TEXT_MARGIN, ")"),
                ellipsis: true
              },
              x: 'calc(0.5*w)',
              y: "calc(h - ".concat(TEXT_MARGIN, ")"),
              fontSize: 13,
              fontFamily: 'sans-serif',
              fill: OUTLINE_COLOR
            }
          }
        });
      }
    }, {
      key: "preinitialize",
      value: function preinitialize() {
        this.markup = [{
          tagName: 'rect',
          selector: 'body'
        }, {
          tagName: 'path',
          selector: 'line'
        }, {
          tagName: 'text',
          selector: 'label'
        }, {
          tagName: 'text',
          selector: 'labelTotalWaiting'
        }, {
          tagName: 'text',
          selector: 'labelTotalProcessing'
        }];
      }
    }, {
      key: "initialize",
      value: function initialize() {
        var _this = this;
        _get(_getPrototypeOf(VSMTimelineTotal.prototype), "initialize", this).apply(this, arguments);
        this.on('change', function (_, opt) {
          if (!_this.hasChanged('length')) return;
          _this.resetLength(opt);
        });
        this.resetLength();
      }
    }, {
      key: "resetLength",
      value: function resetLength(opt) {
        var length = this.get('length') || 0;
        this.attr({
          line: {
            d: "M -".concat(length, " calc(0.5 * h) H calc(w)")
          },
          label: {
            x: -length / 2,
            textWrap: {
              width: length - 10
            }
          }
        }, opt);
      }
    }]);
    return VSMTimelineTotal;
  }(jointjs.dia.Element);

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

  var VSMResourcePlanning = /*#__PURE__*/function (_dia$Element) {
    _inherits(VSMResourcePlanning, _dia$Element);
    var _super = _createSuper(VSMResourcePlanning);
    function VSMResourcePlanning() {
      _classCallCheck(this, VSMResourcePlanning);
      return _super.apply(this, arguments);
    }
    _createClass(VSMResourcePlanning, [{
      key: "defaults",
      value: function defaults() {
        return Object.assign(Object.assign({}, _get(_getPrototypeOf(VSMResourcePlanning.prototype), "defaults", this)), {
          type: 'VSMResourcePlanning',
          size: {
            width: 80,
            height: 80
          },
          tilt: 10,
          attrs: {
            body: {
              fill: FILL_COLOR,
              stroke: OUTLINE_COLOR,
              strokeWidth: 2
            },
            top: {
              cx: 'calc(0.5*w)',
              rx: 'calc(0.5*w)',
              fill: FILL_COLOR,
              stroke: OUTLINE_COLOR,
              strokeWidth: 2
            },
            label: {
              text: 'MRP/ERP',
              textVerticalAnchor: 'top',
              textAnchor: 'middle',
              x: 'calc(0.5*w)',
              y: "calc(h+".concat(TEXT_MARGIN, ")"),
              fontSize: 13,
              fontFamily: 'sans-serif',
              fill: OUTLINE_COLOR
            }
          }
        });
      }
    }, {
      key: "preinitialize",
      value: function preinitialize() {
        this.markup = [{
          tagName: 'path',
          selector: 'body'
        }, {
          tagName: 'ellipse',
          selector: 'top'
        }, {
          tagName: 'text',
          selector: 'label'
        }];
      }
    }, {
      key: "initialize",
      value: function initialize() {
        var _this = this;
        _get(_getPrototypeOf(VSMResourcePlanning.prototype), "initialize", this).apply(this, arguments);
        this.on('change', function (_, opt) {
          if (!_this.hasChanged('tilt') && !_this.hasChanged('size')) return;
          _this.resetTilt(opt);
        });
        this.resetTilt();
      }
    }, {
      key: "resetTilt",
      value: function resetTilt(opt) {
        var tilt = this.get('tilt') || 0;
        return this.attr({
          body: {
            d: this.getLateralAreaPathData(tilt)
          },
          top: {
            cy: tilt,
            ry: tilt
          }
        }, opt);
      }
    }, {
      key: "getLateralAreaPathData",
      value: function getLateralAreaPathData(tilt) {
        var _this$size = this.size(),
          width = _this$size.width,
          height = _this$size.height;
        var rx = width / 2;
        var ry = tilt;
        var kappa = 0.551784;
        var cx = kappa * rx;
        var cy = kappa * tilt;
        var x = 0;
        var y = 0;
        var xLeft = x;
        var xCenter = x + width / 2;
        var xRight = x + width;
        var ySideTop = y + ry;
        var yCurveTop = ySideTop - ry;
        var ySideBottom = y + height - ry;
        var yCurveBottom = y + height;
        var curveBottom = function curveBottom(offset) {
          return ['M', xLeft, ySideBottom - offset, 'C', x, ySideBottom + cy - offset, xCenter - cx, yCurveBottom - offset, xCenter, yCurveBottom - offset, 'C', xCenter + cx, yCurveBottom - offset, xRight, ySideBottom + cy - offset, xRight, ySideBottom - offset];
        };
        return [].concat(_toConsumableArray(curveBottom(0)), ['L', xRight, ySideTop, 'C', xRight, ySideTop - cy, xCenter + cx, yCurveTop, xCenter, yCurveTop, 'C', xCenter - cx, yCurveTop, xLeft, ySideTop - cy, xLeft, ySideTop, 'Z'], _toConsumableArray(curveBottom(5)), _toConsumableArray(curveBottom(10))).join(' ');
      }
    }]);
    return VSMResourcePlanning;
  }(jointjs.dia.Element);

  var HEADER_HEIGHT = 30;
  var VSMDedicatedProcess = /*#__PURE__*/function (_dia$Element) {
    _inherits(VSMDedicatedProcess, _dia$Element);
    var _super = _createSuper(VSMDedicatedProcess);
    function VSMDedicatedProcess() {
      _classCallCheck(this, VSMDedicatedProcess);
      return _super.apply(this, arguments);
    }
    _createClass(VSMDedicatedProcess, [{
      key: "defaults",
      value: function defaults() {
        return Object.assign(Object.assign({}, _get(_getPrototypeOf(VSMDedicatedProcess.prototype), "defaults", this)), {
          type: 'VSMDedicatedProcess',
          size: {
            width: 120,
            height: 120
          },
          attrs: {
            body: {
              width: 'calc(w)',
              height: 'calc(h)',
              stroke: OUTLINE_COLOR,
              strokeWidth: 2,
              fill: FILL_COLOR
            },
            header: {
              width: 'calc(w)',
              height: HEADER_HEIGHT,
              stroke: OUTLINE_COLOR,
              strokeWidth: 2,
              fill: FILL_COLOR
            },
            label: {
              text: 'Dedicated Process',
              textVerticalAnchor: 'middle',
              textAnchor: 'middle',
              textWrap: {
                width: -TEXT_MARGIN * 2,
                maxLineCount: 2,
                ellipsis: true
              },
              x: 'calc(0.5 * w)',
              y: HEADER_HEIGHT / 2,
              fontSize: 13,
              fontFamily: 'sans-serif',
              fill: OUTLINE_COLOR
            }
          }
        });
      }
    }, {
      key: "preinitialize",
      value: function preinitialize() {
        this.markup = [{
          tagName: 'rect',
          selector: 'body'
        }, {
          tagName: 'rect',
          selector: 'header'
        }, {
          tagName: 'text',
          selector: 'label'
        }];
      }
    }]);
    return VSMDedicatedProcess;
  }(jointjs.dia.Element);
  var VSMSharedProcess = /*#__PURE__*/function (_dia$Element2) {
    _inherits(VSMSharedProcess, _dia$Element2);
    var _super2 = _createSuper(VSMSharedProcess);
    function VSMSharedProcess() {
      _classCallCheck(this, VSMSharedProcess);
      return _super2.apply(this, arguments);
    }
    _createClass(VSMSharedProcess, [{
      key: "defaults",
      value: function defaults() {
        return Object.assign(Object.assign({}, _get(_getPrototypeOf(VSMSharedProcess.prototype), "defaults", this)), {
          type: 'VSMSharedProcess',
          size: {
            width: 120,
            height: 120
          },
          attrs: {
            body: {
              width: 'calc(w)',
              height: 'calc(h)',
              stroke: OUTLINE_COLOR,
              strokeWidth: 2,
              fill: getMaterialPattern(SECONDARY_FILL_COLOR, FILL_COLOR)
            },
            header: {
              width: 'calc(w)',
              height: HEADER_HEIGHT,
              stroke: OUTLINE_COLOR,
              strokeWidth: 2,
              fill: FILL_COLOR
            },
            label: {
              text: 'Shared Process',
              textVerticalAnchor: 'middle',
              textAnchor: 'middle',
              textWrap: {
                width: -TEXT_MARGIN * 2,
                maxLineCount: 2,
                ellipsis: true
              },
              x: 'calc(0.5 * w)',
              y: HEADER_HEIGHT / 2,
              fontSize: 13,
              fontFamily: 'sans-serif',
              fill: OUTLINE_COLOR
            }
          }
        });
      }
    }, {
      key: "preinitialize",
      value: function preinitialize() {
        this.markup = [{
          tagName: 'rect',
          selector: 'body'
        }, {
          tagName: 'rect',
          selector: 'header'
        }, {
          tagName: 'text',
          selector: 'label'
        }];
      }
    }]);
    return VSMSharedProcess;
  }(jointjs.dia.Element);
  var VSMSubprocess = /*#__PURE__*/function (_dia$Element3) {
    _inherits(VSMSubprocess, _dia$Element3);
    var _super3 = _createSuper(VSMSubprocess);
    function VSMSubprocess() {
      _classCallCheck(this, VSMSubprocess);
      return _super3.apply(this, arguments);
    }
    _createClass(VSMSubprocess, [{
      key: "defaults",
      value: function defaults() {
        return Object.assign(Object.assign({}, _get(_getPrototypeOf(VSMSubprocess.prototype), "defaults", this)), {
          type: 'VSMSubprocess',
          size: {
            width: 120,
            height: 80
          },
          thickness: 10,
          attrs: {
            body: {
              width: 'calc(w)',
              height: 'calc(h)',
              stroke: OUTLINE_COLOR,
              strokeWidth: 2,
              fill: FILL_COLOR
            },
            stripes: {
              stroke: OUTLINE_COLOR,
              strokeWidth: 2,
              fill: SECONDARY_FILL_COLOR
            },
            label: {
              text: 'Subprocess',
              textVerticalAnchor: 'middle',
              textAnchor: 'middle',
              textWrap: {
                // width
                height: -TEXT_MARGIN * 2,
                ellipsis: true
              },
              x: 'calc(0.5 * w)',
              y: 'calc(0.5 * h)',
              fontSize: 13,
              fontFamily: 'sans-serif',
              fill: OUTLINE_COLOR
            }
          }
        });
      }
    }, {
      key: "preinitialize",
      value: function preinitialize() {
        this.markup = [{
          tagName: 'rect',
          selector: 'body'
        }, {
          tagName: 'path',
          selector: 'stripes'
        }, {
          tagName: 'text',
          selector: 'label'
        }];
      }
    }, {
      key: "initialize",
      value: function initialize() {
        var _this = this;
        _get(_getPrototypeOf(VSMSubprocess.prototype), "initialize", this).apply(this, arguments);
        this.on('change', function (_, opt) {
          if (!_this.hasChanged('thickness')) return;
          _this.resetThickness(opt);
        });
        this.resetThickness();
      }
    }, {
      key: "resetThickness",
      value: function resetThickness(opt) {
        var thickness = this.get('thickness') || 0;
        this.attr({
          stripes: {
            d: "M 0 0 V calc(h) h ".concat(thickness, " V 0 Z M calc(w) 0 V calc(h) h -").concat(thickness, " V 0 Z")
          },
          label: {
            textWrap: {
              width: -(TEXT_MARGIN + thickness) * 2
            }
          }
        }, opt);
      }
    }]);
    return VSMSubprocess;
  }(jointjs.dia.Element);

  var bind = functionUncurryThis(functionUncurryThis.bind);

  // optional / simple context binding
  var functionBindContext = function (fn, that) {
    aCallable(fn);
    return that === undefined ? fn : functionBindNative ? bind(fn, that) : function (/* ...args */) {
      return fn.apply(that, arguments);
    };
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

  var $String$2 = String;

  var toString_1 = function (argument) {
    if (classof(argument) === 'Symbol') throw TypeError('Cannot convert a Symbol value to a string');
    return $String$2(argument);
  };

  var MATCH = wellKnownSymbol('match');

  // `IsRegExp` abstract operation
  // https://tc39.es/ecma262/#sec-isregexp
  var isRegexp = function (it) {
    var isRegExp;
    return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : classofRaw(it) == 'RegExp');
  };

  var $TypeError$7 = TypeError;

  var notARegexp = function (it) {
    if (isRegexp(it)) {
      throw $TypeError$7("The method doesn't accept regular expressions");
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

  var getOwnPropertyDescriptor$2 = objectGetOwnPropertyDescriptor.f;







  // eslint-disable-next-line es/no-string-prototype-startswith -- safe
  var nativeStartsWith = functionUncurryThis(''.startsWith);
  var stringSlice$1 = functionUncurryThis(''.slice);
  var min$2 = Math.min;

  var CORRECT_IS_REGEXP_LOGIC = correctIsRegexpLogic('startsWith');
  // https://github.com/zloirock/core-js/pull/702
  var MDN_POLYFILL_BUG =  !CORRECT_IS_REGEXP_LOGIC && !!function () {
    var descriptor = getOwnPropertyDescriptor$2(String.prototype, 'startsWith');
    return descriptor && !descriptor.writable;
  }();

  // `String.prototype.startsWith` method
  // https://tc39.es/ecma262/#sec-string.prototype.startswith
  _export({ target: 'String', proto: true, forced: !MDN_POLYFILL_BUG && !CORRECT_IS_REGEXP_LOGIC }, {
    startsWith: function startsWith(searchString /* , position = 0 */) {
      var that = toString_1(requireObjectCoercible(this));
      notARegexp(searchString);
      var index = toLength(min$2(arguments.length > 1 ? arguments[1] : undefined, that.length));
      var search = toString_1(searchString);
      return nativeStartsWith
        ? nativeStartsWith(that, search, index)
        : stringSlice$1(that, index, index + search.length) === search;
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

        strCopy = stringSlice$2(str, re.lastIndex);
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

  // a string of all valid unicode whitespaces
  var whitespaces = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002' +
    '\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

  var replace$1 = functionUncurryThis(''.replace);
  var whitespace = '[' + whitespaces + ']';
  var ltrim = RegExp('^' + whitespace + whitespace + '*');
  var rtrim = RegExp(whitespace + whitespace + '*$');

  // `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation
  var createMethod$2 = function (TYPE) {
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
  var FORCED$1 = $parseInt(whitespaces + '08') !== 8 || $parseInt(whitespaces + '0x16') !== 22
    // MS Edge 18- broken with boxed symbols
    || (ITERATOR && !fails(function () { $parseInt(Object(ITERATOR)); }));

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

  var COUNT = 3;
  var VSMDataBox = /*#__PURE__*/function (_dia$Element) {
    _inherits(VSMDataBox, _dia$Element);
    var _super = _createSuper(VSMDataBox);
    function VSMDataBox() {
      _classCallCheck(this, VSMDataBox);
      return _super.apply(this, arguments);
    }
    _createClass(VSMDataBox, [{
      key: "defaults",
      value: function defaults() {
        return Object.assign(Object.assign({}, _get(_getPrototypeOf(VSMDataBox.prototype), "defaults", this)), {
          type: 'VSMDataBox',
          count: COUNT,
          size: {
            width: 120,
            height: COUNT * 40
          },
          attrs: {
            body: {
              width: 'calc(w)',
              height: 'calc(h)'
            },
            boxes: {
              width: 'calc(w)',
              fill: FILL_COLOR,
              stroke: OUTLINE_COLOR,
              strokeWidth: 2
            },
            labels: {
              text: '',
              x: 'calc(0.5 * w)',
              textWrap: {
                width: -TEXT_MARGIN * 2,
                ellipsis: true
              },
              textVerticalAnchor: 'middle',
              textAnchor: 'middle',
              fontSize: 13,
              fontFamily: 'sans-serif',
              fill: OUTLINE_COLOR
            }
          }
        });
      }
    }, {
      key: "preinitialize",
      value: function preinitialize() {
        this.markup = [];
      }
    }, {
      key: "initialize",
      value: function initialize() {
        var _this = this;
        _get(_getPrototypeOf(VSMDataBox.prototype), "initialize", this).apply(this, arguments);
        this.on('change', function (_, opt) {
          if (!_this.hasChanged('count')) return;
          _this.buildMarkup(opt);
        });
        this.buildMarkup();
      }
    }, {
      key: "toJSON",
      value: function toJSON() {
        var json = _get(_getPrototypeOf(VSMDataBox.prototype), "toJSON", this).call(this);
        delete json.markup;
        return json;
      }
    }, {
      key: "getCleanedAttrs",
      value: function getCleanedAttrs() {
        var count = this.get('count') || 0;
        var attrs = Object.assign({}, this.attr());
        Object.keys(attrs).forEach(function (key) {
          if (!key.startsWith('_')) return;
          var match = /_(\d+)$/.exec(key);
          if (!match) return;
          var index = parseInt(match[1]);
          if (index >= count) {
            delete attrs[key];
          }
        });
        return attrs;
      }
    }, {
      key: "buildMarkup",
      value: function buildMarkup(opt) {
        var flags = Object.assign({
          dry: true
        }, opt);
        var count = this.get('count');
        var markup = [{
          tagName: 'rect',
          selector: 'body',
          groupSelector: ''
        }];
        var attrs = this.getCleanedAttrs();
        var ratio = 1 / count;
        for (var i = 0; i < count; i++) {
          var boxSelector = "_box_".concat(i);
          var labelSelector = "_label_".concat(i);
          markup.push({
            tagName: 'rect',
            selector: boxSelector,
            groupSelector: 'boxes'
          }, {
            tagName: 'text',
            selector: labelSelector,
            groupSelector: 'labels'
          });
          attrs[boxSelector] = Object.assign(Object.assign({}, attrs[boxSelector]), {
            y: "calc(".concat(ratio * i, "*h)"),
            height: "calc(".concat(ratio, "*h)")
          });
          attrs[labelSelector] = Object.assign(Object.assign({}, attrs[labelSelector]), {
            y: "calc(".concat(ratio * (i + 0.5), "*h)"),
            textWrap: {
              height: "".concat(ratio * 100, "%")
            }
          });
        }
        this.set('markup', markup, flags);
        this.set('attrs', attrs, flags);
      }
    }, {
      key: "setLabelAttr",
      value: function setLabelAttr(index, attrs, opt) {
        this.attr(["_label_".concat(index)], attrs, opt);
      }
    }, {
      key: "setBoxAttr",
      value: function setBoxAttr(index, attrs, opt) {
        this.attr(["_box_".concat(index)], attrs, opt);
      }
    }]);
    return VSMDataBox;
  }(jointjs.dia.Element);

  var VSMTruck = /*#__PURE__*/function (_dia$Element) {
    _inherits(VSMTruck, _dia$Element);
    var _super = _createSuper(VSMTruck);
    function VSMTruck() {
      _classCallCheck(this, VSMTruck);
      return _super.apply(this, arguments);
    }
    _createClass(VSMTruck, [{
      key: "defaults",
      value: function defaults() {
        return Object.assign(Object.assign({}, _get(_getPrototypeOf(VSMTruck.prototype), "defaults", this)), {
          type: 'VSMTruck',
          size: {
            width: 120,
            height: 80
          },
          attrs: {
            body: {
              strokeWidth: 2,
              stroke: OUTLINE_COLOR,
              fill: FILL_COLOR,
              refD: 'M 248 120 L 248 120 C 248 119 248 119 248 119 L 248 119 C 248 119 248 118 248 118 L 248 118 L 248 117 L 248 117 L 234 82 C 231 76 225 72 219 72 L 184 72 L 184 64 C 184 60 180 56 176 56 L 24 56 C 15 56 8 63 8 72 L 8 184 C 8 193 15 200 24 200 L 37 200 C 43 224 73 232 90 215 C 95 211 98 206 99 200 L 157 200 C 163 224 193 232 210 215 C 215 211 218 206 219 200 L 232 200 C 241 200 248 193 248 184 L 248 120 Z M 184 88 L 219 88 L 228 112 L 184 112 Z M 24 72 L 168 72 L 168 136 L 24 136 Z M 68 208 C 56 208 48 195 54 184 C 60 173 76 173 82 184 C 83 186 84 189 84 192 C 84 201 77 208 68 208 Z M 188 208 C 176 208 168 195 174 184 C 180 173 196 173 202 184 C 203 186 204 189 204 192 C 204 201 197 208 188 208 Z'
            },
            background: {
              fill: SECONDARY_FILL_COLOR,
              refD: 'M 248 120 L 248 120 C 248 119 248 119 248 119 L 248 119 C 248 119 248 118 248 118 L 248 118 L 248 117 L 248 117 L 234 82 C 231 76 225 72 219 72 L 184 72 L 184 64 C 184 60 180 56 176 56 L 24 56 C 15 56 8 63 8 72 L 8 184 C 8 193 15 200 24 200 L 37 200 C 43 224 73 232 90 215 C 95 211 98 206 99 200 L 157 200 C 163 224 193 232 210 215 C 215 211 218 206 219 200 L 232 200 C 241 200 248 193 248 184 L 248 120 Z'
            },
            label: {
              text: 'Truck Shipment',
              textVerticalAnchor: 'top',
              textAnchor: 'middle',
              x: 'calc(0.5 * w)',
              y: "calc(h + ".concat(TEXT_MARGIN, ")"),
              fontSize: 13,
              fontFamily: 'sans-serif',
              fill: OUTLINE_COLOR
            }
          }
        });
      }
    }, {
      key: "preinitialize",
      value: function preinitialize() {
        this.markup = [{
          tagName: 'path',
          selector: 'background'
        }, {
          tagName: 'path',
          selector: 'body'
        }, {
          tagName: 'text',
          selector: 'label'
        }];
      }
    }]);
    return VSMTruck;
  }(jointjs.dia.Element);

  var VSMShipment = /*#__PURE__*/function (_dia$Link) {
    _inherits(VSMShipment, _dia$Link);
    var _super = _createSuper(VSMShipment);
    function VSMShipment() {
      _classCallCheck(this, VSMShipment);
      return _super.apply(this, arguments);
    }
    _createClass(VSMShipment, [{
      key: "defaults",
      value: function defaults() {
        return Object.assign(Object.assign({}, _get(_getPrototypeOf(VSMShipment.prototype), "defaults", this)), {
          type: 'VSMShipment',
          attrs: {
            line: {
              connection: true,
              stroke: OUTLINE_COLOR,
              strokeWidth: 8,
              strokeLinejoin: 'round',
              strokeLinecap: 'round',
              targetMarker: {
                'type': 'path',
                'd': 'M 0 -10 0 -10 -20 0 0 10 0 10'
              }
            }
          }
        });
      }
    }, {
      key: "preinitialize",
      value: function preinitialize() {
        this.markup = [{
          tagName: 'path',
          selector: 'line',
          attributes: {
            'fill': 'none'
          }
        }];
      }
    }]);
    return VSMShipment;
  }(jointjs.dia.Link);

  var VSMMaterialFlow = /*#__PURE__*/function (_dia$Link) {
    _inherits(VSMMaterialFlow, _dia$Link);
    var _super = _createSuper(VSMMaterialFlow);
    function VSMMaterialFlow() {
      _classCallCheck(this, VSMMaterialFlow);
      return _super.apply(this, arguments);
    }
    _createClass(VSMMaterialFlow, [{
      key: "defaults",
      value: function defaults() {
        return Object.assign(Object.assign({}, _get(_getPrototypeOf(VSMMaterialFlow.prototype), "defaults", this)), {
          type: 'VSMMaterialFlow',
          attrs: {
            line: {
              connection: true,
              stroke: FILL_COLOR,
              strokeWidth: 16,
              strokeLinejoin: 'round',
              strokeLinecap: 'square',
              targetMarker: {
                'type': 'path',
                'stroke': OUTLINE_COLOR,
                'stroke-width': 2,
                'd': 'M 0 -8 0 -20 -30 0 0 20 0 8'
              }
            },
            outline: {
              connection: true,
              stroke: OUTLINE_COLOR,
              strokeWidth: 20,
              strokeLinecap: 'square',
              strokeLinejoin: 'round'
            },
            material: {
              connection: true,
              stroke: OUTLINE_COLOR,
              strokeWidth: 10,
              strokeLinecap: 'butt',
              strokeLinejoin: 'round',
              strokeDasharray: '15,5'
            }
          }
        });
      }
    }, {
      key: "preinitialize",
      value: function preinitialize() {
        this.markup = [{
          tagName: 'path',
          selector: 'outline',
          attributes: {
            'fill': 'none'
          }
        }, {
          tagName: 'path',
          selector: 'line',
          attributes: {
            'fill': 'none'
          }
        }, {
          tagName: 'path',
          selector: 'material',
          attributes: {
            'fill': 'none'
          }
        }];
      }
    }]);
    return VSMMaterialFlow;
  }(jointjs.dia.Link);

  var VSMInformationFlow = /*#__PURE__*/function (_dia$Link) {
    _inherits(VSMInformationFlow, _dia$Link);
    var _super = _createSuper(VSMInformationFlow);
    function VSMInformationFlow() {
      _classCallCheck(this, VSMInformationFlow);
      return _super.apply(this, arguments);
    }
    _createClass(VSMInformationFlow, [{
      key: "defaults",
      value: function defaults() {
        return Object.assign(Object.assign({}, _get(_getPrototypeOf(VSMInformationFlow.prototype), "defaults", this)), {
          type: 'VSMInformationFlow',
          attrs: {
            line: {
              connection: true,
              stroke: FILL_COLOR,
              strokeWidth: 16,
              strokeLinejoin: 'round',
              strokeLinecap: 'square',
              targetMarker: {
                'type': 'path',
                'stroke': OUTLINE_COLOR,
                'stroke-width': 2,
                'd': 'M 0 -8 0 -20 -30 0 0 20 0 8'
              }
            },
            outline: {
              connection: true,
              stroke: OUTLINE_COLOR,
              strokeWidth: 20,
              strokeLinecap: 'square',
              strokeLinejoin: 'round'
            }
          }
        });
      }
    }, {
      key: "preinitialize",
      value: function preinitialize() {
        this.markup = [{
          tagName: 'path',
          selector: 'outline',
          attributes: {
            'fill': 'none'
          }
        }, {
          tagName: 'path',
          selector: 'line',
          attributes: {
            'fill': 'none'
          }
        }];
      }
    }]);
    return VSMInformationFlow;
  }(jointjs.dia.Link);

  var VSMElectronicInformationFlow = /*#__PURE__*/function (_dia$Link) {
    _inherits(VSMElectronicInformationFlow, _dia$Link);
    var _super = _createSuper(VSMElectronicInformationFlow);
    function VSMElectronicInformationFlow() {
      _classCallCheck(this, VSMElectronicInformationFlow);
      return _super.apply(this, arguments);
    }
    _createClass(VSMElectronicInformationFlow, [{
      key: "defaults",
      value: function defaults() {
        return Object.assign(Object.assign({}, _get(_getPrototypeOf(VSMElectronicInformationFlow.prototype), "defaults", this)), {
          type: 'VSMElectronicInformationFlow',
          attrs: {
            line: {
              connection: true,
              stroke: OUTLINE_COLOR,
              strokeWidth: 2,
              strokeLinejoin: 'round',
              targetMarker: {
                'type': 'path',
                'd': 'M 10 -5 0 0 10 5 8 0 z'
              }
            },
            wrapper: {
              connection: true,
              strokeWidth: 10,
              strokeLinejoin: 'round'
            }
          }
        });
      }
    }, {
      key: "preinitialize",
      value: function preinitialize() {
        this.markup = [{
          tagName: 'path',
          selector: 'wrapper',
          attributes: {
            'fill': 'none',
            'cursor': 'pointer',
            'stroke': 'transparent',
            'stroke-linecap': 'round'
          }
        }, {
          tagName: 'path',
          selector: 'line',
          attributes: {
            'fill': 'none',
            'pointer-events': 'none'
          }
        }];
      }
    }]);
    return VSMElectronicInformationFlow;
  }(jointjs.dia.Link);
  var VSMElectronicInformationFlowView = /*#__PURE__*/function (_dia$LinkView) {
    _inherits(VSMElectronicInformationFlowView, _dia$LinkView);
    var _super2 = _createSuper(VSMElectronicInformationFlowView);
    function VSMElectronicInformationFlowView() {
      _classCallCheck(this, VSMElectronicInformationFlowView);
      return _super2.apply(this, arguments);
    }
    _createClass(VSMElectronicInformationFlowView, [{
      key: "findPath",
      value: function findPath(route, sourcePoint, targetPoint) {
        var path = _get(_getPrototypeOf(VSMElectronicInformationFlowView.prototype), "findPath", this).call(this, route, sourcePoint, targetPoint);
        var offset = 10;
        var ratio = 0.5;
        var segmentIndex = path.segmentIndexAt(ratio);
        var segment = path.getSegment(segmentIndex);
        var tangent = segment.tangentAt(ratio);
        var p2 = tangent.start;
        var _tangent$clone$setLen = tangent.clone().setLength(offset).rotate(p2, 90).parallel(offset),
          p1 = _tangent$clone$setLen.end;
        var p3 = p1.reflection(p2);
        var Path = jointjs.g.Path;
        path.replaceSegment(segmentIndex, [Path.createSegment('L', p1), Path.createSegment('L', p3), Path.createSegment('L', segment.end)]);
        return path;
      }
    }]);
    return VSMElectronicInformationFlowView;
  }(jointjs.dia.LinkView);

  var VSMManualInfo = /*#__PURE__*/function (_dia$Link) {
    _inherits(VSMManualInfo, _dia$Link);
    var _super = _createSuper(VSMManualInfo);
    function VSMManualInfo() {
      _classCallCheck(this, VSMManualInfo);
      return _super.apply(this, arguments);
    }
    _createClass(VSMManualInfo, [{
      key: "defaults",
      value: function defaults() {
        return Object.assign(Object.assign({}, _get(_getPrototypeOf(VSMManualInfo.prototype), "defaults", this)), {
          type: 'VSMManualInfo',
          attrs: {
            line: {
              connection: true,
              stroke: '#333333',
              strokeWidth: 2,
              strokeLinejoin: 'round',
              targetMarker: {
                'type': 'path',
                'd': 'M 10 -5 0 0 10 5 z'
              }
            },
            wrapper: {
              connection: true,
              strokeWidth: 10,
              strokeLinejoin: 'round'
            }
          }
        });
      }
    }, {
      key: "preinitialize",
      value: function preinitialize() {
        this.markup = [{
          tagName: 'path',
          selector: 'wrapper',
          attributes: {
            'fill': 'none',
            'cursor': 'pointer',
            'stroke': 'transparent',
            'stroke-linecap': 'round'
          }
        }, {
          tagName: 'path',
          selector: 'line',
          attributes: {
            'fill': 'none',
            'pointer-events': 'none'
          }
        }];
      }
    }]);
    return VSMManualInfo;
  }(jointjs.dia.Link);

  var VSMPullArrow = /*#__PURE__*/function (_dia$Link) {
    _inherits(VSMPullArrow, _dia$Link);
    var _super = _createSuper(VSMPullArrow);
    function VSMPullArrow() {
      _classCallCheck(this, VSMPullArrow);
      return _super.apply(this, arguments);
    }
    _createClass(VSMPullArrow, [{
      key: "defaults",
      value: function defaults() {
        return Object.assign(Object.assign({}, _get(_getPrototypeOf(VSMPullArrow.prototype), "defaults", this)), {
          type: 'VSMPullArrow',
          attrs: {
            line: {
              connection: true,
              stroke: '#333333',
              strokeWidth: 2,
              strokeDasharray: '10,3',
              strokeLinejoin: 'round',
              targetMarker: {
                'type': 'path',
                'd': 'M 10 -5 0 0 10 5 z'
              }
            },
            wrapper: {
              connection: true,
              strokeWidth: 10,
              strokeLinejoin: 'round'
            }
          }
        });
      }
    }, {
      key: "preinitialize",
      value: function preinitialize() {
        this.markup = [{
          tagName: 'path',
          selector: 'wrapper',
          attributes: {
            'fill': 'none',
            'cursor': 'pointer',
            'stroke': 'transparent',
            'stroke-linecap': 'round'
          }
        }, {
          tagName: 'path',
          selector: 'line',
          attributes: {
            'fill': 'none',
            'pointer-events': 'none'
          }
        }];
      }
    }]);
    return VSMPullArrow;
  }(jointjs.dia.Link);

  exports.VSMCustomerSupplier = VSMCustomerSupplier;
  exports.VSMDataBox = VSMDataBox;
  exports.VSMDedicatedProcess = VSMDedicatedProcess;
  exports.VSMElectronicInformationFlow = VSMElectronicInformationFlow;
  exports.VSMElectronicInformationFlowView = VSMElectronicInformationFlowView;
  exports.VSMFIFOLane = VSMFIFOLane;
  exports.VSMGoSee = VSMGoSee;
  exports.VSMInformationFlow = VSMInformationFlow;
  exports.VSMKaizenBurst = VSMKaizenBurst;
  exports.VSMKanbanPost = VSMKanbanPost;
  exports.VSMLoadLevelling = VSMLoadLevelling;
  exports.VSMManualInfo = VSMManualInfo;
  exports.VSMMaterialBatchKanban = VSMMaterialBatchKanban;
  exports.VSMMaterialFlow = VSMMaterialFlow;
  exports.VSMMaterialKanban = VSMMaterialKanban;
  exports.VSMMaterialPull = VSMMaterialPull;
  exports.VSMOperator = VSMOperator;
  exports.VSMProductionBatchKanban = VSMProductionBatchKanban;
  exports.VSMProductionControl = VSMProductionControl;
  exports.VSMProductionKanban = VSMProductionKanban;
  exports.VSMPullArrow = VSMPullArrow;
  exports.VSMResourcePlanning = VSMResourcePlanning;
  exports.VSMRoundedInventory = VSMRoundedInventory;
  exports.VSMSafetyStock = VSMSafetyStock;
  exports.VSMSequencePullBall = VSMSequencePullBall;
  exports.VSMSharedProcess = VSMSharedProcess;
  exports.VSMShipment = VSMShipment;
  exports.VSMSignalKanban = VSMSignalKanban;
  exports.VSMSubprocess = VSMSubprocess;
  exports.VSMSupermarket = VSMSupermarket;
  exports.VSMSupermarketParts = VSMSupermarketParts;
  exports.VSMTimelineProcessing = VSMTimelineProcessing;
  exports.VSMTimelineTotal = VSMTimelineTotal;
  exports.VSMTimelineWaiting = VSMTimelineWaiting;
  exports.VSMTriangleInventory = VSMTriangleInventory;
  exports.VSMTruck = VSMTruck;
  exports.VSMWorkcell = VSMWorkcell;

}(this.joint.shapes = this.joint.shapes || {}, joint));
