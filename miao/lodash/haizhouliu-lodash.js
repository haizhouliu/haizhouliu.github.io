/*
 * @Description: lodash部分函数实现
 * @Author: xxx
 * @Date: 2020-12-08 15:04:25
 * @LastEditTime: 2020-12-16 22:36:37
 */
var haizhouliu = (function () {
  function chunk(ary, size = 1) {
    let result = [];
    for (let i = 0; i < ary.length; i += size) {
      result.push(ary.slice(i, i + size));
    }
    return result;
  }
  function compact(ary) {
    let result = [];
    for (let i = 0; i < ary.length; i++) {
      if (ary[i]) {
        result.push(ary[i]);
      }
    }
    return result;
  }
  function concat(ary, ...values) {
    let result = ary.slice();
    for (let i = 0; i < values.length; i++) {
      if (Array.isArray(values[i])) {
        for (let j = 0; j < values[i].length; j++) {
          result.push(values[i][j]);
        }
      } else {
        result.push(values[i]);
      }
    }
    return result;
  }
  function difference(array, ...values) {
    let result = [];
    values = flattenDeep(values);
    for (let i = 0; i < array.length; i++) {
      if (!values.includes(array[i])) {
        result.push(array[i]);
      }
    }
    return result;
  }
  function differenceBy(array, ...values) {
    let iter = values[values.length - 1];
    values.length = values.length - 1;
    let predicate = iteratee(iter);
    let ary = array.map((it) => predicate(it, iter));
    let result = [];
    values.forEach((it) => result.push(it.map((it) => predicate(it, iter))));
    result = flatten(result);
    let nums = difference(ary, result);
    let n = [];
    for (let i = 0; i < nums.length; i++) {
      n.push(array[ary.indexOf(nums[i])]);
    }
    return n;
  }
  function drop(array, n = 1) {
    return array.slice(n);
  }
  function dropRight(array, n = 1) {
    if (array.length <= n) {
      return [];
    }
    return array.slice(0, array.length - n);
  }
  function fill(array, value, start = 0, end = array.length) {
    for (let i = start; i < end; i++) {
      array[i] = value;
    }
    return array;
  }
  function flatten(array) {
    let result = [];
    for (let i = 0; i < array.length; i++) {
      if (Array.isArray(array[i])) {
        for (let j = 0; j < array[i].length; j++) {
          result.push(array[i][j]);
        }
      } else {
        result.push(array[i]);
      }
    }
    return result;
  }
  function flattenDeep(array) {
    let result = [];
    for (let i = 0; i < array.length; i++) {
      if (Array.isArray(array[i])) {
        result.push(...flattenDeep(array[i]));
      } else {
        result.push(array[i]);
      }
    }
    return result;
  }
  function flattenDepth(array, depth = 1) {
    while (depth--) {
      array = flatten(array);
    }
    return array;
  }
  function fromPairs(pairs) {
    let obj = {};
    for (let i = 0; i < pairs.length; i++) {
      obj[pairs[i][0]] = pairs[i][1];
    }
    return obj;
  }
  function head(array) {
    return array[0];
  }
  function indexOf(array, value, fromIndex = 0) {
    for (let i = fromIndex; i < array.length; i++) {
      if (array[i] == value) {
        return i;
      }
    }
    return -1;
  }
  function initial(array) {
    return array.slice(0, array.length - 1);
  }
  function intersection(...arrays) {
    if (arrays.length == 1) {
      return arrays[0];
    }
    if (arrays.length !== 2) {
      return [];
    }
    let firstArray = arrays[0];
    let restArray = arrays[1];
    return firstArray.filter((it) => restArray.includes(it) == true);
  }
  function join(array, separator = ",") {
    let str = "";
    for (let i = 0; i < array.length; i++) {
      str = str + array[i] + separator;
    }
    return str.slice(0, str.length - 1);
  }
  function last(array) {
    return array[array.length - 1];
  }
  function lastIndexOf(array, value, fromIndex = array.length - 1) {
    for (let i = fromIndex; i >= 0; i--) {
      if (array[i] == value) {
        return i;
      }
    }
    return -1;
  }
  function nth(array, n = 0) {
    if (n < 0) {
      n = array.length + n;
    }
    return array[n];
  }
  function pull(array, ...values) {
    let array2 = array;
    let nums = array;
    for (let i = 0; i < values.length; i++) {
      array2 = array2.filter((it) => it !== values[i]);
    }
    nums.length = 0;
    nums.push(...array2);
    return array2;
  }
  function pullAll(array, values) {
    let array2 = array;
    let nums = array;
    for (let i = 0; i < values.length; i++) {
      array2 = array2.filter((it) => it !== values[i]);
    }
    nums.length = 0;
    nums.push(...array2);
    return array2;
  }
  function pullAt(array, indexes = []) {
    let result = [];
    let nums = array.slice();
    let nums2 = array.slice();
    let p = array;
    p.length = 0;
    for (let i = 0; i < nums2.length; i++) {
      if (indexes.includes(i)) {
        result.push(nums2.splice(i, 1)[0]);
        nums2 = nums.slice();
      } else {
        p.push(nums2[i]);
      }
    }
    return result;
  }
  function remove(array, predicate) {
    let result = array.filter((it) => predicate(it) == true);
    return result;
  }
  function reverse(array) {
    let len = Math.floor(array.length / 2);
    for (let i = 0; i < len; i++) {
      let t = array[i];
      array[i] = array[array.length - i - 1];
      array[array.length - i - 1] = t;
    }
    return array;
  }
  function sortedIndex(array, value) {
    if (value > array[array.legnth - 1]) {
      return array.legnth;
    }
    if (value <= array[0]) {
      return 0;
    }
    let left = 0;
    let right = array.length - 1;
    while (right > left) {
      let mid = Math.floor((left + right) / 2);
      if (value > array[mid]) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
    return left;
  }
  function sortedIndexOf(array, value) {
    if (value > array[array.length - 1] || value < array[0]) {
      return -1;
    }
    let left = 0;
    let right = array.length - 1;
    while (right > left) {
      let mid = Math.floor((left + right) / 2);
      if (value > array[mid]) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
    return left;
  }
  function sortedLastIndex(array, value) {
    let len = array.length;
    for (let i = len - 1; i >= 0; i--) {
      if (value >= array[i]) {
        return i + 1;
      }
    }
    return 0;
  }
  function sortedUniq(array) {
    let result = [];
    for (let i = 0; i < array.length; i++) {
      result.push(array[i]);
      while (array[i + 1] == array[i]) {
        i++;
      }
    }
    return result;
  }
  function tail(array) {
    return array.slice(1);
  }
  function take(array, n = 1) {
    return array.slice(0, n);
  }
  function takeRight(array, n = 1) {
    if (n > array.length) {
      return array;
    }
    return array.slice(array.length - n);
  }
  function union(array) {
    return uniq(flatten(arguments));
  }
  function uniq(array) {
    let result = [];
    array.forEach((it) => {
      if (!result.includes(it)) {
        result.push(it);
      }
    });
    return result;
  }
  function isArguments(value) {
    return checkType(value, "Arguments");
  }
  function isArray(value) {
    return checkType(value, "Array");
  }
  function isArrayBuffer(value) {
    return checkType(value, "ArrayBuffer");
  }
  function isArrayLike(value) {
    if (!value) {
      return false;
    }
    if (
      value.length &&
      Object.prototype.toString.call(value) !== "[object Function]"
    ) {
      return true;
    }
    return false;
  }
  function isArrayLikeObject(value) {
    if (typeof value == "object") {
      return isArrayLike(value);
    }
    return false;
  }
  function isBoolean(value) {
    return checkType(value, "Boolean");
  }
  function isDate(value) {
    return checkType(value, "Date");
  }
  function isElement(value) {
    return Object.prototype.toString.call(value).slice(-8, -1) == "Element";
  }
  function isEmpty(value) {
    if (isMap(value) || isSet(value)) {
      return value.size == 0;
    }
    // 判断null undefined
    if (typeof value == "object" && value) {
      return Object.keys(value) == 0;
    }
    return true;
  }
  function isEqual(value, other) {
    if (value === other) {
      return true;
    }
    if (
      Object.prototype.toString.call(value) !==
      Object.prototype.toString.call(other)
    ) {
      return false;
    }
    if (typeof value !== "object") {
      return false;
    }
    let ary = Object.keys(value);
    if (ary.length !== Object.keys(other).length) {
      return false;
    }
    for (let key in other) {
      if (!ary.includes(key) || !isEqual(value[key], other[key])) {
        return false;
      }
    }
    return true;
  }
  function isError(value) {
    return checkType(value, "Error");
  }
  function isFinite(value) {
    return isNumber(value) && value !== Infinity && value !== -Infinity;
  }
  function isFunction(value) {
    return checkType(value, "Function");
  }
  function isInteger(value) {
    return isFinite(value) && Math.floor(value) === value;
  }
  function isMap(value) {
    return checkType(value, "Map");
  }
  function isMatch(object, source) {}
  function isNaN(value) {
    if (typeof value == "object") {
      return value.valueOf() !== value.valueOf();
    }
    return Number.isNaN(value);
  }
  function isSet(value) {
    return checkType(value, "Set");
  }
  function isNull(value) {
    return checkType(value, "Null");
  }
  function isNumber(value) {
    return typeof value == "number";
  }
  function isObject(value) {
    if (!value) {
      return false;
    }
    if (typeof value == "function") {
      return true;
    }
    return typeof value == "object";
  }
  function isObjectLike(value) {
    if (!value) {
      return false;
    }
    return typeof value == "object";
  }
  function isRegExp(value) {
    return checkType(value, "RegExp");
  }
  function isString(value) {
    return checkType(value, "String");
  }
  function isUndefined(value) {
    return checkType(value, "Undefined");
  }
  /**
   * @description: 判断 value类型 是否和 type 相等
   * @param {string} value
   * @param {string} type
   * @return {boolean} true or false
   */
  function checkType(value, type) {
    return Object.prototype.toString.call(value) === `[object ${type}]`;
  }
  function identity(value) {
    return value;
  }
  function iteratee(func = identity) {
    if (isFunction(func)) {
      return func;
    }
    if (isString(func)) {
      return function (obj, func) {
        return obj[func];
      };
    }
  }
  function property(path) {
    if (isString(path)) {
      path = toPath(path);
    }
    return (obj) =>
      path.reduce((prev, next) => {
        return (prev = prev[next]);
      }, obj);
  }
  function toPath(path) {
    return path.match(/\w+/g);
  }
  /**
   * @description: 对象里的每个值传入iter函数运行，得到的值组成一个数组
   * @param {*} collection  对象
   * @param {*} iter  函数
   * @return {*}  返回一个数组
   */
  function map(collection, iter = identity) {
    let predicate = iteratee(iter);
    let result = [];
    for (let key in collection) {
      result.push(predicate(collection[key]));
    }
    return result;
  }

  return {
    compact,
    chunk,
    concat,
    difference,
    differenceBy,
    drop,
    dropRight,
    fill,
    flatten,
    flattenDeep,
    flattenDepth,
    fromPairs,
    head,
    indexOf,
    initial,
    intersection,
    join,
    last,
    lastIndexOf,
    nth,
    pull,
    pullAll,
    pullAt,
    remove,
    reverse,
    sortedIndex,
    sortedIndexOf,
    sortedLastIndex,
    sortedUniq,
    tail,
    take,
    takeRight,
    union,
    uniq,
    isArguments,
    isArray,
    isArrayBuffer,
    isArrayLike,
    isArrayLikeObject,
    isBoolean,
    isDate,
    isElement,
    isEmpty,
    isEqual,
    isError,
    isFinite,
    isFunction,
    isInteger,
    isMap,
    isNaN,
    isMatch,
    isSet,
    isNull,
    isNumber,
    isObject,
    isObjectLike,
    isRegExp,
    isString,
    isUndefined,
    identity,
    iteratee,
    toPath,
    map,
    property,
  };
})();
