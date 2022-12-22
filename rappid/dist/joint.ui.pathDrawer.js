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

  // Detect IE8's incomplete defineProperty implementation
  var descriptors = !fails(function () {
    // eslint-disable-next-line es/no-object-defineproperty -- required for testing
    return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
  });

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
  var $TypeError = TypeError;

  // `Assert: Type(argument) is Object`
  var anObject = function (argument) {
    if (isObject(argument)) return argument;
    throw $TypeError($String(argument) + ' is not an object');
  };

  var call$1 = Function.prototype.call;

  var functionCall = functionBindNative ? call$1.bind(call$1) : function () {
    return call$1.apply(call$1, arguments);
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

  var $Object = Object;

  var isSymbol = useSymbolAsUid ? function (it) {
    return typeof it == 'symbol';
  } : function (it) {
    var $Symbol = getBuiltIn('Symbol');
    return isCallable($Symbol) && objectIsPrototypeOf($Symbol.prototype, $Object(it));
  };

  var $String$1 = String;

  var tryToString = function (argument) {
    try {
      return $String$1(argument);
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

  // we can't use just `it == null` since of `document.all` special case
  // https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot-aec
  var isNullOrUndefined = function (it) {
    return it === null || it === undefined;
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

  var $TypeError$3 = TypeError;

  // `RequireObjectCoercible` abstract operation
  // https://tc39.es/ecma262/#sec-requireobjectcoercible
  var requireObjectCoercible = function (it) {
    if (isNullOrUndefined(it)) throw $TypeError$3("Can't call method on " + it);
    return it;
  };

  var $Object$1 = Object;

  // `ToObject` abstract operation
  // https://tc39.es/ecma262/#sec-toobject
  var toObject = function (argument) {
    return $Object$1(requireObjectCoercible(argument));
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

  var PathDrawer = core_mjs.mvc.View.extend({
    tagName: 'g',
    svgElement: true,
    className: 'path-drawer',
    events: {
      'mousedown .start-point': 'onStartPointPointerDown',
      'mousedown': 'onPointerDown',
      //'mousemove': 'onPointerMove',
      //'mouseup': 'onPointerUp',
      'touchstart .start-point': 'onStartPointPointerDown',
      'touchstart': 'onPointerDown',
      //'touchmove': 'onPointerMove',
      //'touchend': 'onPointerUp',
      'dblclick': 'onDoubleClick',
      'contextmenu': 'onContextMenu'
    },
    documentEvents: {
      'mousemove': 'onPointerMove',
      'touchmove': 'onPointerMove',
      'mouseup': 'onPointerUp',
      'touchend': 'onPointerUp',
      'touchcancel': 'onPointerUp'
    },
    options: {
      pathAttributes: {
        'class': null,
        'fill': '#ffffff',
        'stroke': '#000000',
        'stroke-width': 1,
        'pointer-events': 'none'
      },
      startPointMarkup: '<circle r="5"/>',
      snapRadius: 0
    },
    init: function init() {
      var svgTarget = this.svgTarget = core_mjs.V(this.options.target);
      this.path = new core_mjs.g.Path();
      this.$document = $(svgTarget.node.ownerDocument);
      this.action = 'awaiting-input';
      this.render();
    },
    onRemove: function onRemove() {
      var pathNode = this.pathNode;
      if (pathNode) {
        core_mjs.V(pathNode).remove();
      }
      this.clear();
    },
    clear: function clear() {
      var path = this.path,
        pathNode = this.pathNode;
      if (pathNode && path && path.segments.length <= 1) {
        core_mjs.V(pathNode).remove();
      }
      this.svgStart.remove();
      this.svgControl.remove();
      this.pathNode = null;
      this.path = new core_mjs.g.Path();
      this.undelegateDocumentEvents();
      this.action = 'awaiting-input';
      this.trigger('clear');
    },
    render: function render() {
      var options = this.options;
      this.svgPathTemplate = core_mjs.V('path').attr(options.pathAttributes);
      this.svgStart = core_mjs.V(options.startPointMarkup).addClass('start-point');
      this.svgControl = core_mjs.V('path').addClass('control-path');
      this.vel.append(core_mjs.V('rect', {
        x: 0,
        y: 0,
        width: '100%',
        height: '100%',
        fill: 'transparent',
        stroke: 'none'
      }));
      this.svgTarget.append(this.el);
      return this;
    },
    createPath: function createPath(x, y) {
      var path = this.svgPathTemplate.clone();
      var pathNode = this.pathNode = path.node;
      var start = this.svgStart.translate(x, y, {
        absolute: true
      });
      this.trigger('path:create', pathNode);
      this.addMoveSegment(x, y);
      this.vel.before(path);
      this.vel.append(start);
    },
    closePath: function closePath() {
      var path = this.path,
        pathNode = this.pathNode;
      var first = path.getSegment(0);
      var last = path.getSegment(path.segments.length - 1);
      if (last.type === 'L') {
        // if last segment is lineto
        // replace with closepath
        path.replaceSegment(path.segments.length - 1, core_mjs.g.Path.createSegment('Z'));
      } else {
        // if last segment is curveto
        // make sure that last segment ends exactly at beginning of path
        last.end.x = first.end.x;
        last.end.y = first.end.y;

        // add closepath behind it
        path.appendSegment(core_mjs.g.Path.createSegment('Z'));
      }
      pathNode.setAttribute('d', path.toString());
      this.finishPath('path:close');
    },
    finishPath: function finishPath(pathFinishedEventType) {
      var path = this.path,
        pathNode = this.pathNode;
      if (path && this.numberOfVisibleSegments() > 0) {
        // the new path is not just a single point; users can see it
        this.trigger('path:finish', pathNode);
        this.trigger(pathFinishedEventType, pathNode);
      } else {
        // the path is just a single point; users cannot see it
        // different event is triggered
        this.trigger('path:abort', pathNode);
      }
      this.clear();
    },
    numberOfVisibleSegments: function numberOfVisibleSegments() {
      var path = this.path;
      var numberOfVisibleSegments = path.segments.length;
      numberOfVisibleSegments -= 1; // the initial moveto segment
      if (path.getSegment(path.segments.length - 1).type === 'Z') {
        numberOfVisibleSegments -= 1; // if path is invisible, adding Z does not make it visible
      }

      return numberOfVisibleSegments;
    },
    addMoveSegment: function addMoveSegment(x, y) {
      var path = this.path,
        pathNode = this.pathNode;
      var move = core_mjs.g.Path.createSegment('M', x, y);
      path.appendSegment(move);
      pathNode.setAttribute('d', path.toString());
      this.trigger('path:segment:add', pathNode);
      this.trigger('path:move-segment:add', pathNode);
    },
    addLineSegment: function addLineSegment(x, y) {
      var path = this.path,
        pathNode = this.pathNode;
      var line = core_mjs.g.Path.createSegment('L', x, y);
      path.appendSegment(line);
      pathNode.setAttribute('d', path.toString());
      this.trigger('path:segment:add', pathNode);
      this.trigger('path:line-segment:add', pathNode);
    },
    addCurveSegment: function addCurveSegment(x, y, x1, y1, x2, y2) {
      var path = this.path,
        pathNode = this.pathNode;
      var curve = core_mjs.g.Path.createSegment('C', x1, y1, x2 || x, y2 || y, x, y);
      path.appendSegment(curve);
      pathNode.setAttribute('d', path.toString());
      this.trigger('path:segment:add', pathNode);
      this.trigger('path:curve-segment:add', pathNode);
    },
    adjustLastSegment: function adjustLastSegment(x, y, x1, y1, x2, y2) {
      var path = this.path,
        pathNode = this.pathNode;
      var snapRadius = this.options.snapRadius;
      if (snapRadius) {
        var snappedCoords = this.snapLastSegmentCoordinates(x, y, snapRadius);
        x = snappedCoords.x;
        y = snappedCoords.y;
      }
      var segment = path.getSegment(path.segments.length - 1);
      if (x != null) segment.end.x = x;
      if (y != null) segment.end.y = y;
      if (x1 != null) segment.controlPoint1.x = x1;
      if (y1 != null) segment.controlPoint1.y = y1;
      if (x2 != null) segment.controlPoint2.x = x2;
      if (y2 != null) segment.controlPoint2.y = y2;
      pathNode.setAttribute('d', path.toString());
      this.trigger('path:edit', pathNode);
      this.trigger('path:last-segment:adjust', pathNode);
    },
    snapLastSegmentCoordinates: function snapLastSegmentCoordinates(x, y, radius) {
      var path = this.path;
      var snappedX = false;
      var snappedY = false;
      var snapX = x;
      var snapY = y;
      for (var i = path.segments.length - 2; i >= 0; i--) {
        if (snappedX && snappedY) break;
        var segment = path.getSegment(i);
        var segmentX = segment.end.x;
        var segmentY = segment.end.y;
        if (!snappedX && Math.abs(segmentX - x) < radius) {
          snapX = segmentX;
          snappedX = true;
        }
        if (!snappedY && Math.abs(segmentY - y) < radius) {
          snapY = segmentY;
          snappedY = true;
        }
      }
      return new core_mjs.g.Point(snapX, snapY);
    },
    removeLastSegment: function removeLastSegment() {
      var path = this.path,
        pathNode = this.pathNode;
      path.removeSegment(path.segments.length - 1);
      pathNode.setAttribute('d', path.toString());
      this.trigger('path:edit', pathNode);
      this.trigger('path:last-segment:remove', pathNode);
    },
    findControlPoint: function findControlPoint(x, y) {
      var path = this.path;
      var last = path.getSegment(path.segments.length - 1);
      return new core_mjs.g.Point(x, y).reflection({
        x: last.end.x,
        y: last.end.y
      });
    },
    replaceLastSegmentWithCurve: function replaceLastSegmentWithCurve() {
      var path = this.path,
        pathNode = this.pathNode;
      var last = path.getSegment(path.segments.length - 1);
      var prev = path.getSegment(path.segments.length - 2);
      var curve = core_mjs.g.Path.createSegment('C', prev.end.x, prev.end.y, last.end.x, last.end.y, last.end.x, last.end.y);
      path.replaceSegment(path.segments.length - 1, curve);
      pathNode.setAttribute('d', path.toString());
      this.trigger('path:edit', pathNode);
      this.trigger('path:last-segment:replace-with-curve', pathNode);
    },
    adjustControlPath: function adjustControlPath(x1, y1, x2, y2) {
      var pathNode = this.pathNode;
      var control = this.svgControl.node;
      var controlPath = new core_mjs.g.Path([core_mjs.g.Path.createSegment('M', x1, y1), core_mjs.g.Path.createSegment('L', x2, y2)]);
      control.setAttribute('d', controlPath.toString());
      this.vel.append(control);
      this.trigger('path:interact', pathNode);
      this.trigger('path:control:adjust', pathNode);
    },
    removeControlPath: function removeControlPath() {
      var pathNode = this.pathNode;
      var control = this.svgControl.node;
      control.removeAttribute('d');
      this.vel.append(control);
      this.trigger('path:interact', pathNode);
      this.trigger('path:control:remove', pathNode);
    },
    //////////////
    // Handlers //
    //////////////

    onPointerDown: function onPointerDown(e) {
      var evt = core_mjs.util.normalizeEvent(e);
      evt.stopPropagation();

      // left button only (or touch)
      if (evt.which > 1) return;

      // first click only (if this was part of a double click)
      if (evt.originalEvent.detail > 1) return;

      // check if we are in the DOM (after remove)
      if (!this.el.parentNode) return;
      var coordinates = this.vel.toLocalPoint(evt.clientX, evt.clientY);
      switch (this.action) {
        case 'awaiting-input':
          this.createPath(coordinates.x, coordinates.y);
          this.action = 'path-created';
          this.delegateDocumentEvents();
          break;
        case 'adjusting-line-end':
          this.action = 'awaiting-line-end';
          break;
        case 'adjusting-curve-end':
          this.action = 'awaiting-curve-control-2';
          break;
      }
      this._timeStamp = evt.timeStamp;
    },
    MOVEMENT_DETECTION_THRESHOLD: 150,
    onPointerMove: function onPointerMove(e) {
      var evt = core_mjs.util.normalizeEvent(e);
      evt.stopPropagation();
      if (this.action == 'awaiting-input') return;
      var start;
      var control;
      var end = this.vel.toLocalPoint(evt.clientX, evt.clientY);
      var timeStamp = this._timeStamp;
      if (!timeStamp) {
        // mouse button is not pressed

        switch (this.action) {
          case 'adjusting-line-end':
            this.adjustLastSegment(end.x, end.y);
            break;
          case 'adjusting-curve-end':
            this.adjustLastSegment(end.x, end.y, null, null, end.x, end.y);
            break;
        }
      } else if (timeStamp && evt.timeStamp - timeStamp < this.MOVEMENT_DETECTION_THRESHOLD) {
        // mouse button is pressed but threshold for detecting movement has not been reached yet
        // keep following user pointer to prevent jumpy interface effects

        switch (this.action) {
          case 'path-created':
            start = this.svgStart.translate();
            this.adjustControlPath(start.tx, start.ty, end.x, end.y);
            break;
          case 'awaiting-line-end':
          case 'adjusting-curve-control-1':
            this.adjustLastSegment(end.x, end.y);
            break;
          case 'awaiting-curve-control-2':
            this.adjustLastSegment(end.x, end.y, null, null, end.x, end.y);
            break;
        }
      } else {
        // mouse button is pressed and movement is being detected

        switch (this.action) {
          case 'path-created':
            this.action = 'adjusting-curve-control-1';
            break;
          case 'awaiting-line-end':
            this.replaceLastSegmentWithCurve();
            this.action = 'adjusting-curve-control-2';
            break;
          case 'awaiting-curve-control-2':
            this.action = 'adjusting-curve-control-2';
            break;
          case 'adjusting-curve-control-1':
            start = this.svgStart.translate();
            this.adjustControlPath(start.tx, start.ty, end.x, end.y);
            break;
          case 'adjusting-curve-control-2':
            control = this.findControlPoint(end.x, end.y);
            this.adjustLastSegment(null, null, null, null, control.x, control.y);
            this.adjustControlPath(control.x, control.y, end.x, end.y);
            break;
        }
      }
    },
    onPointerUp: function onPointerUp(e) {
      this._timeStamp = null;
      var evt = core_mjs.util.normalizeEvent(e);
      evt.stopPropagation();

      // left button only (or touch)
      if (evt.which > 1) return;

      // first click only (if this was part of a double click)
      if (evt.originalEvent.detail > 1) return;
      var end = this.vel.toLocalPoint(evt.clientX, evt.clientY);
      switch (this.action) {
        case 'path-created':
        case 'awaiting-line-end':
          this.addLineSegment(end.x, end.y);
          this.action = 'adjusting-line-end';
          break;
        case 'awaiting-curve-control-2':
          this.removeControlPath();
          this.addLineSegment(end.x, end.y);
          this.action = 'adjusting-line-end';
          break;
        case 'adjusting-curve-control-1':
        case 'adjusting-curve-control-2':
          this.addCurveSegment(end.x, end.y, end.x, end.y);
          this.action = 'adjusting-curve-end';
          break;
      }
    },
    onStartPointPointerDown: function onStartPointPointerDown(e) {
      var evt = core_mjs.util.normalizeEvent(e);
      evt.stopPropagation();

      // left button only (or touch)
      if (evt.which > 1) return;

      // first click only (if this was part of a double click)
      if (evt.originalEvent.detail > 1) return;
      this.closePath();
    },
    onDoubleClick: function onDoubleClick(e) {
      var evt = core_mjs.util.normalizeEvent(e);
      evt.preventDefault();
      evt.stopPropagation();

      // left button only (or touch)
      if (evt.which > 1) return;
      if (this.pathNode && this.numberOfVisibleSegments() > 0) {
        // remove the path element created by first click's mousedown
        this.removeLastSegment();
        this.finishPath('path:stop');
      }
    },
    onContextMenu: function onContextMenu(e) {
      var evt = core_mjs.util.normalizeEvent(e);
      evt.preventDefault();
      evt.stopPropagation();

      // first click only (if this was part of a double click)
      if (evt.originalEvent.detail > 1) return;
      if (this.pathNode && this.numberOfVisibleSegments() > 0) {
        // remove currently edited path segment
        this.removeLastSegment();
        this.finishPath('path:stop');
      }
    }
  });

  exports.PathDrawer = PathDrawer;

}(this.joint.ui = this.joint.ui || {}, $, joint));
