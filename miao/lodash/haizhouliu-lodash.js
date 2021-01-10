/*
 * @Author: your name
 * @Date: 2020-12-08 15:04:25
 * @LastEditTime: 2021-01-10 17:18:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \haizhouliu.github.io\miao\lodash\haizhouliu-lodash.js
 */
/*
 * @Description: lodash部分函数实现
 * @Author: xxx
 * @Date: 2020-12-08 15:04:25
 * @LastEditTime: 2020-12-22 21:16:20
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
    let predicate = (it) => it;
    if (!isArray(iter)) {
      values.pop();
      predicate = iteratee(iter);
    }
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
  function differenceWith(array, ...values) {
    let comparator = values.pop();
    return array.filter((item) =>
      flatten(values).every((it) => comparator(it, item) == false)
    );
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
  function dropRightWhile(array, predicate = identity) {
    let pred = iteratee(predicate);
    for (let i = array.length - 1; i >= 0; i--) {
      if (!pred(array[i], predicate)) {
        return array.slice(0, i + 1);
      }
    }
  }
  function dropWhile(ary, predicate = identity) {
    let pred = iteratee(predicate);
    for (let i = 0; i < ary.length; i++) {
      if (!pred(ary[i])) {
        return ary.slice(i);
      }
    }
    return ary;
  }
  function matches(item) {
    return (value) => isMatch(value, item);
    // return _.bind(isMatch, null, _ , item)
  }
  function matchesProperty(path, srcValue) {
    if (isArray(path)) {
      srcValue = path[1];
      path = path[0];
    }
    return (obj) => {
      return obj[path] == srcValue;
    };
  }
  function fill(array, value, start = 0, end = array.length) {
    for (let i = start; i < end; i++) {
      array[i] = value;
    }
    return array;
  }
  function findIndex(array, predicate = identity, fromIndex = 0) {
    let pred = iteratee(predicate);
    for (let i = fromIndex; i < array.length; i++) {
      if (pred(array[i])) {
        return i;
      }
    }
    return -1;
  }
  function findLastIndex(
    array,
    predicate = identity,
    fromIndex = array.length - 1
  ) {
    let pred = iteratee(predicate);
    for (let i = fromIndex; i >= 0; i--) {
      if (pred(array[i])) {
        return i;
      }
    }
    return -1;
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
    // if (arrays.length == 1) {
    //   return arrays[0];
    // }
    // let firstArray = arrays[0];
    // let restArray = arrays.slice(1);
    // return firstArray.filter((it) =>
    //   restArray.every((item) => item.includes(it) == true)
    // );
    return intersectionBy(...arrays, identity);
  }
  function intersectionBy(...values) {
    let pred = iteratee(values.pop());
    let transValues = values.map((it) => it.map((item) => pred(item)));
    let firstArray = Array.from(new Set(transValues[0]));
    let restArray = transValues.slice(1);
    let idxAry = [];
    firstArray.forEach((it, idx) => {
      if (restArray.every((item) => item.includes(it))) {
        idxAry.push(idx);
      }
    });
    return idxAry.map((it) => values[0][it]);
  }
  function intersectionWith(...values) {
    let pred = iteratee(values.pop());
    let firstArray = values[0];
    let restArray = values.slice(1);
    return firstArray.filter((it) =>
      restArray.every((item) => item.some((content) => pred(it, content)))
    );
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
    let predicate = function (item) {
      return flatten(values).includes(item);
    };
    return remove2(array, predicate);
  }
  function pullAll(array, values) {
    // return pullAllBy(array, values, identity);
    return pull(array, values);
  }
  function pullAllBy(array, values, iter = identity) {
    let pred = iteratee(iter);
    let transVal = values.map((it) => pred(it));
    return remove2(array, (item) => transVal.includes(pred(item)));
  }
  function pullAt(array, indexes = []) {
    let transIndex = indexes.map((it) => array[it]);
    let predicate = function (value) {
      return transIndex.includes(value);
    };
    return remove(array, predicate);
  }
  function pullAllWith(array, values, comparator) {
    let pred = (val) => values.some((item) => comparator(item, val));
    return remove2(array, pred);
  }
  /**
   * @description: 移除数组中predicate(item)为true的元素，并返回由这些元素组成的新数组
   * @param {*} array
   * @param {*} predicate
   * @return {*} 返回新数组
   */
  function remove(array, predicate) {
    let result = [];
    for (let i = 0; i < array.length; i++) {
      if (predicate(array[i])) {
        result.push(array[i]);
        array.splice(i, 1);
        i--;
      }
    }
    return result;
  }
  /**
   * @description: 移除数组中predicate(item)为true的元素，返回移除后的数组
   * @param {*} array
   * @param {*} predicate
   * @return {*} 返回移除后的数组
   */
  function remove2(array, predicate) {
    for (let i = 0; i < array.length; i++) {
      if (predicate(array[i])) {
        array.splice(i, 1);
        i--;
      }
    }
    return array;
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
  function sortedIndexBy(array, value, iter = identity) {
    let pred = iteratee(iter);
    let transArray = array.map((it) => pred(it));
    return sortedIndex(transArray, pred(value));
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
  function sortedLastIndexBy(array, value, iter = identity) {
    let pred = iteratee(iter);
    let transArray = array.map((it) => pred(it));
    return sortedLastIndex(transArray, pred(value));
  }
  function sortedLastIndexOf(array, value) {
    for (let i = array.length - 1; i >= 0; i--) {
      if (value === array[i]) {
        return i;
      }
    }
    return -1;
  }
  function sortedUniq(array, idxAry = []) {
    let result = [];
    for (let i = 0; i < array.length; i++) {
      result.push(array[i]);
      idxAry.push(i);
      while (array[i + 1] == array[i]) {
        i++;
      }
    }
    return result;
  }
  function sortedUniqBy(array, iter) {
    let idxAry = [];
    sortedUniq(
      array.map((it) => iter(it)),
      idxAry
    );
    return idxAry.map((it) => array[it]);
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
  function takeRightWhile(array, predicate = identity) {
    let pred = iteratee(predicate);
    for (let i = array.length - 1; i >= 0; i--) {
      if (!pred(array[i])) {
        return array.slice(i + 1);
      }
    }
    return array;
  }
  function takeWhile(array, predicate = identity) {
    let pred = iteratee(predicate);
    for (let i = 0; i < array.length; i++) {
      if (!pred(array[i])) {
        return array.slice(0, i);
      }
    }
    return array;
  }
  function union(...values) {
    let result = values.reduce((a, b) => (a = a.concat(b)), []);
    return uniq(result);
  }
  function unionBy(...values) {
    let pred = iteratee(values.pop());
    let transVal = values.map((it) => it.map((item) => pred(item)));
    let idxAry = [];
    uniq(flattenDeep(transVal), idxAry);
    let flatValues = flattenDeep(values);
    return idxAry.map((it) => flatValues[it]);
  }
  function unionWith(...values) {
    let pred = iteratee(values.pop());
    let result = [];
    let flatVal = flatten(values);
    flatVal.forEach((it) => {
      if (result.every((item) => pred(item, it) == false)) {
        result.push(it);
      }
    });
    return result;
  }
  function uniq(array, idxAry = []) {
    let result = [];
    array.forEach((it, idx) => {
      if (!result.includes(it)) {
        result.push(it);
        idxAry.push(idx);
      }
    });
    return result;
  }
  function uniqBy(array, iter = identity) {
    let pred = iteratee(iter);
    let transAry = array.map((it) => pred(it));
    let idxAry = [];
    uniq(transAry, idxAry);
    return idxAry.map((it) => array[it]);
  }
  function uniqWith(array, comparator) {
    return unionWith(array, comparator);
  }
  function unzip(array) {
    return zip(...array);
  }
  function unzipWith(array, iter = identity) {
    let pred = iteratee(iter);
    let maxL = Math.max(...Array.from(new Set(array.map((it) => it.length))));
    let result = [];
    for (let i = 0; i < maxL; i++) {
      result.push(pred(array[0][i], array[1][i]));
    }
    return result;
  }
  function without(array, ...values) {
    let result = [];
    array.forEach((it) => {
      if (!values.includes(it)) {
        result.push(it);
      }
    });
    return result;
  }
  function xor(...values) {
    return xorBy(...values, identity);
  }
  function xorBy(...values) {
    let pred = iteratee(values.pop());
    let obj = new Map();
    let flatVal = flatten(values);
    let result = [];
    flatVal.forEach((it) => {
      let item = pred(it);
      if (obj.has(item)) {
        obj.set(item, false);
      } else {
        obj.set(item, true);
      }
    });
    flatVal.forEach((it) => {
      let item = pred(it);
      if (obj.get(item)) {
        result.push(it);
      }
    });
    return result;
  }
  function xorWith(...values) {
    let pred = iteratee(values.pop());
    let flatVal = flatten(values);
    let result = [];
    flatVal.forEach((it) => {
      let len = flatVal.filter((item) => pred(it, item)).length;
      if (len === 1) {
        result.push(it);
      }
    });
    return result;
  }
  function zip(...values) {
    let result = [];
    let maxL = Math.max(...Array.from(new Set(values.map((it) => it.length))));
    for (let i = 0; i < maxL; i++) {
      result.push(values.reduce((a, b) => (a = a.concat(b[i])), []));
    }
    return result;
  }
  function zipObject(props = [], values = []) {
    let obj = {};
    props.forEach((it, idx) => (obj[it] = values[idx]));
    return obj;
  }
  function zipObjectDeep(props = [], values = []) {
    let obj = {};
    let result = [];
    function aryToObj(ary, val, obj, result) {
      if (ary.length == 0) {
        return val;
      }
      let value = ary.shift();
      if (value == Number(value)) {
        result[value] = aryToObj(ary, val, {}, result);
        return result;
      }
      obj[value] = aryToObj(ary, val, {}, result);
      return obj;
    }
    return props.reduce(
      (a, b, idx) => (a = aryToObj(toPath(b), values[idx], obj, result)),
      obj
    );
  }
  function zipWith(...values) {
    let pred = iteratee(values.pop());
    let result = [];
    let maxL = Math.max(...Array.from(new Set(values.map((it) => it.length))));
    for (let i = 0; i < maxL; i++) {
      let val = values.map((it) => it[i]);
      result.push(pred(...val));
    }
    return result;
  }
  function countBy(values, iter = identity) {
    let pred = iteratee(iter);
    let mapVal = values.map((it) => pred(it));
    let obj = {};
    mapVal.forEach((it) => {
      if (it in obj) {
        obj[it]++;
      } else {
        obj[it] = 1;
      }
    });
    return obj;
  }
  function every(value, predicate = identity) {
    let pred = iteratee(predicate);
    for (let i = 0; i < value.length; i++) {
      if (!pred(value[i])) {
        return false;
      }
    }
    return true;
  }
  function filter(value, predicate = identity) {
    let result = [];
    let pred = iteratee(predicate);
    for (let i = 0; i < value.length; i++) {
      if (pred(value[i])) {
        result.push(value[i]);
      }
    }
    return result;
  }
  function find(value, predicate = identity, fromIndex = 0) {
    let pred = iteratee(predicate);
    for (let i = fromIndex; i < value.length; i++) {
      if (pred(value[i])) {
        return value[i];
      }
    }
    return undefined;
  }
  function findLast(value, predicate = identity, fromIndex = value.length - 1) {
    let pred = iteratee(predicate);
    for (let i = fromIndex; i >= 0; i--) {
      if (pred(value[i])) {
        return value[i];
      }
    }
    return undefined;
  }
  function flatMap(value, iter = identity) {
    return flatMapDeep(value, iter);
  }
  function flatMapDeep(value, iter = identity) {
    let pred = iteratee(iter);
    let result = [];
    value.forEach((it) => {
      result.push(...flattenDeep(pred(it)));
    });
    return result;
  }
  function flatMapDepth(value, iter = identity, depth = 1) {
    let pred = iteratee(iter);
    let result = [];
    value.forEach((it) => {
      result.push(flattenDepth(pred(it), depth));
    });
    return result;
  }
  function forEach(value, iter = identity) {
    let pred = iteratee(iter);
    for (let key in value) {
      pred(value[key], key, value);
    }
    return value;
  }
  function forEachRight(value, iter = identity) {
    let pred = iteratee(iter);
    let keysVal = Object.keys(value).reverse();
    for (let key in keysVal) {
      pred(value[keysVal[key]], keysVal[key], value);
    }
    return value;
  }
  function groupBy(value, iter = identity) {
    let pred = iteratee(iter);
    let mapVal = Array.from(new Set(value.map((it) => pred(it)))).sort(
      (a, b) => a - b
    );
    let obj = {};
    mapVal.forEach((it) => {
      obj[it] = value.filter((item) => pred(item) == it);
    });
    return obj;
  }
  function includes(collection, value, fromIndex = 0) {
    if (isString(collection)) {
      return collection.includes(value);
    }
    let collectVal = Object.values(collection);
    if (value !== value) {
      for (let i = fromIndex; i < collectVal.length; i++) {
        if (collectVal[i] !== collectVal[i]) {
          return true;
        }
      }
      return false;
    }
    for (let i = fromIndex; i < collectVal.length; i++) {
      if (collectVal[i] === value) {
        return true;
      }
    }
    return false;
  }
  function invokeMap(collection, path, ...args) {
    if (isString(path)) {
      return collection.map((it) => it[path](...args));
    }
    if (isFunction(path)) {
      return collection.map((it) => path.call(it, ...args));
    }
  }
  function keyBy(collection, iter = identity) {
    let pred = iteratee(iter);
    let obj = {};
    collection.forEach((it) => (obj[pred(it)] = it));
    return obj;
  }
  function map(collection, iter = identity) {
    let pred = iteratee(iter);
    let result = [];
    let value = Object.values(collection);
    for (let i = 0; i < value.length; i++) {
      result.push(pred(value[i]));
    }
    return result;
  }
  function partition(collection, predicate = identity) {
    let pred = iteratee(predicate);
    let result = [];
    let trueAry = [];
    let falseAry = [];
    collection.forEach((it) => {
      if (pred(it)) {
        trueAry.push(it);
      } else {
        falseAry.push(it);
      }
    });
    result.push(trueAry, falseAry);
    return result;
  }
  function reduce(collection, iter = identity, accumulator = 0) {
    let pred = iteratee(iter);
    let valueAry = Object.values(collection);
    let keyAry = Object.keys(collection);
    for (let i = 0; i < valueAry.length; i++) {
      accumulator = pred(accumulator, valueAry[i], keyAry[i]);
    }
    return accumulator;
  }
  function reduceRight(collection, iter = identity, accumulator) {
    let pred = iteratee(iter);
    return reduce(collection.reverse(), pred, accumulator);
  }
  function reject(collection, predicate = identity) {
    let pred = iteratee(predicate);
    let result = [];
    collection.forEach((it) => {
      if (!pred(it)) {
        result.push(it);
      }
    });
    return result;
  }
  function sample(collection) {
    return collection[(Math.random() * collection.length) | 0];
  }
  function sampleSize(collection, n = 1) {
    if (n === 1) {
      return sample(collection);
    }
    if (n >= collection.length) {
      return collection;
    }
    let result = [];
    while (result.length !== n) {
      let random = (Math.random() * collection.length) | 0;
      if (!result.includes(random)) {
        result.push(random);
      }
    }
    return result.map((it) => collection[it]);
  }
  function shuffle(collection) {
    for (let i = collection.length - 1; i >= 0; i--) {
      let random = (Math.random() * (i + 1)) | 0;
      let randomValue = collection[random];
      let itemValue = collection[i];
      collection[i] = randomValue;
      collection[random] = itemValue;
    }
    return collection;
  }
  function size(collection) {
    if (isArrayLike(collection)) {
      return collection.length;
    }
    if (isPlainObject(collection)) {
      return Object.keys(collection).length;
    }
    return 0;
  }
  function some(collection, predicate = identity) {
    let pred = iteratee(predicate);
    for (let i = 0; i < collection.length; i++) {
      if (pred(collection[i], i, collection)) {
        return true;
      }
    }
    return false;
  }
  function defer(func, ...args) {
    return setTimeout(() => {
      func(...args);
    });
  }

  function delay(func, wait, ...args) {
    return setTimeout(() => {
      func(...args);
    }, wait);
  }
  function castArray(value) {
    if (arguments.length === 0) {
      return [];
    }
    if (!isArray(value)) {
      return [value];
    }
    return value;
  }
  function conformsTo(object, source) {
    let srcKeys = Object.keys(source);
    return srcKeys.every((it) => {
      if (source[it](object[it]) && object[it] !== undefined) {
        return true;
      } else {
        return false;
      }
    });
  }
  function eq(value, other) {
    if (Number.isNaN(value) && Number.isNaN(other)) {
      return true;
    }
    return value === other;
  }
  function gt(value, other) {
    return value > other;
  }
  function gte(value, other) {
    return value >= other;
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
    if (Object.keys(value).length !== Object.keys(other).length) {
      return false;
    }
    for (let key in other) {
      if (
        !Object.keys(value).includes(key) ||
        !isEqual(value[key], other[key])
      ) {
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
  function isLength(value) {
    return isInteger(value) && value >= 0;
  }
  function isMap(value) {
    return checkType(value, "Map");
  }
  function isMatch(object, source) {
    for (let key in source) {
      if (typeof key && typeof source[key] === "object") {
        if (!isMatch(object[key], source[key])) {
          return false;
        }
      } else {
        if (object[key] !== source[key]) {
          return false;
        }
      }
    }
    return true;
  }
  function isNaN(value) {
    if (typeof value == "object") {
      return value.valueOf() !== value.valueOf();
    }
    return Number.isNaN(value);
  }
  function isNative(value) {
    return value.toString().includes("[native code]");
  }
  function isNil(value) {
    return value === null || value === undefined;
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
  function isPlainObject(value) {
    return value.__proto__ === Object.prototype || value.__proto__ == null;
  }
  function isRegExp(value) {
    return checkType(value, "RegExp");
  }
  function isSafeInteger(value) {
    return Number.isSafeInteger(value);
  }
  function isSet(value) {
    return checkType(value, "Set");
  }
  function isString(value) {
    return checkType(value, "String");
  }
  function isUndefined(value) {
    return checkType(value, "Undefined");
  }
  function isSymbol(value) {
    return checkType(value, "Symbol");
  }
  function isTypedArray(value) {
    return checkType(value, "Uint8Array");
  }
  function isWeakMap(value) {
    return checkType(value, "WeakMap");
  }
  function isWeakSet(value) {
    return checkType(value, "WeakSet");
  }
  function lt(value, other) {
    return value < other;
  }
  function lte(value, other) {
    return value <= other;
  }
  function toArray(value) {
    if (typeof value === "object" && value) {
      return Object.values(value);
    }
    if (isString(value)) {
      return value.split("");
    }
    return [];
  }
  function toFinite(value) {
    if (value == Infinity) {
      return Number.MAX_VALUE;
    }
    if (value == -Infinity) {
      return -Number.MAX_VALUE;
    }
    return Number(value);
  }
  function toInteger(value) {
    if (value == Infinity) {
      return Number.MAX_VALUE;
    }
    return Math.floor(value);
  }
  function toNumber(value) {
    return Number(value);
  }
  function ceil(value, p = 0) {
    return Math.ceil(value * 10 ** p) / 10 ** p;
  }
  function divide(dividend, divisor) {
    return dividend / divisor;
  }
  function floor(number, p = 0) {
    return Math.floor(number * 10 ** p) / 10 ** p;
  }
  function max(array) {
    if (isArray(array) && array.length !== 0) {
      return Math.max(...array);
    }
    return undefined;
  }
  function maxBy(array, iter = identity) {
    let pred = iteratee(iter);
    let item;
    let res = -Infinity;
    array.forEach((it) => {
      if (res < pred(it)) {
        res = pred(it);
        item = it;
      }
    });
    return item;
  }
  function mean(array) {
    return array.reduce((a, b) => a + b) / array.length;
  }
  function meanBy(array, iter = identity) {
    let pred = iteratee(iter);
    return mean(array.map((it) => pred(it)));
  }
  function min(array) {
    if (isArray(array) && array.length !== 0) {
      return Math.min(...array);
    }
    return undefined;
  }
  function minBy(array, iter = identity) {
    let pred = iteratee(iter);
    let item;
    let res = Infinity;
    array.forEach((it) => {
      if (res > pred(it)) {
        res = pred(it);
        item = it;
      }
    });
    return item;
  }
  function multiply(multiplier, multiplicand) {
    return multiplier * multiplicand;
  }
  function subtract(minuend, subtrahend) {
    return minuend - subtrahend;
  }
  function round(number, p = 0) {
    return Math.round(number * 10 ** p) / 10 ** p;
  }
  function sum(array) {
    return array.reduce((a, b) => a + b);
  }
  function sumBy(array, iter = iteratee) {
    let pred = iteratee(iter);
    return sum(array.map((it) => pred(it)));
  }
  function clamp(number, lower, upper) {
    if (number <= lower) {
      return lower;
    } else if (number >= upper) {
      return upper;
    } else {
      return number;
    }
  }
  function inRange(number, ...values) {
    let start = values[0];
    let end = values[1];
    if (values.length == 2 && values[1] < values[0]) {
      start = values[1];
      end = values[0];
    } else if (values.length == 1) {
      start = 0;
      end = values[0];
    }
    return number >= start && number < end;
  }
  function assign(object, ...sources) {
    for (let i = 0; i < sources.length; i++) {
      let obj = sources[i];
      Object.keys(obj).forEach((it) => (object[it] = obj[it]));
    }
    return object;
  }
  function assignIn(object, ...sources) {
    for (let i = 0; i < sources.length; i++) {
      let obj = sources[i];
      for (let key in obj) {
        object[key] = obj[key];
      }
    }
    return object;
  }
  function defaults(object, ...sources) {
    return defaultsDeep(object, ...sources);
  }
  function defaultsDeep(object, ...sources) {
    sources.forEach((it) => {
      let keyVal = Object.keys(it);
      keyVal.forEach((item) => {
        if (typeof it[item] == "object") {
          defaultsDeep(object[item], it[item]);
        }
        if (!(item in object)) {
          object[item] = it[item];
        }
      });
    });
    return object;
  }
  function add(a, b) {
    if (isUndefined(a) || isArray(a)) {
      a = 0;
    }
    if (isUndefined(b) || isArray(b)) {
      b = 0;
    }
    return a + b;
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
      return function (obj) {
        return obj[func];
      };
    }
    if (Object.prototype.toString.call(func) == "[object Object]") {
      return (value) => isMatch(value, func);
    }
    if (isArray(func)) {
      return (value) => value[func[0]] == func[1];
    }
  }
  function property(path) {
    if (isString(path)) {
      path = toPath(path);
    }
    return (obj) =>
      path.reduce((prev, next) => {
        if (!(next in Object(prev))) {
          return undefined;
        }
        return prev[next];
      }, obj);
  }
  function toPath(path) {
    return path.match(/\w+/g);
  }
  function get(object, path, defaultValue = "default") {
    return property(path)(object) ? property(path)(object) : defaultValue;
  }
  function mapKeys(object, iter = identity) {
    let predicate = iteratee(iter);
    let map = {};
    Object.keys(object).forEach(
      (it) => (map[predicate(object[it], it)] = object[it])
    );
    return map;
  }
  function mapValues(object, iter = identity) {
    let predicate = iteratee(iter);
    let map = {};
    Object.keys(object).forEach(
      (it) => (map[it] = predicate(object[it], iter))
    );
    return map;
  }
  function before(n, func) {
    let count = 0;
    let result;
    return function (...args) {
      if (count < n) {
        count++;
        return (result = func.call(this, ...args));
      } else {
        return result;
      }
    };
  }
  function negate(predicate) {
    return function (...args) {
      return !predicate(...args);
    };
  }
  function flip(func) {
    return function (...args) {
      return func(...args.reverse());
    };
  }
  /**
   * @description: 对象里的每个值传入iter函数运行，得到的值组成一个数组
   * @param {*} collection  对象
   * @param {*} iter  函数
   * @return {*}  返回一个数组
   */
  function map(collection, iter = identity) {
    let predicate;
    if (isString(iter)) {
      predicate = property(iter);
    } else {
      predicate = iteratee(iter);
    }
    let result = [];
    for (let key in collection) {
      result.push(predicate(collection[key], Number(key), collection));
    }
    return result;
  }

  return {
    compact,
    chunk,
    concat,
    difference,
    differenceBy,
    differenceWith,
    drop,
    dropRight,
    dropRightWhile,
    dropWhile,
    fill,
    findIndex,
    findLastIndex,
    flatten,
    flattenDeep,
    flattenDepth,
    fromPairs,
    head,
    indexOf,
    initial,
    intersection,
    intersectionBy,
    intersectionWith,
    join,
    last,
    lastIndexOf,
    nth,
    pull,
    pullAll,
    pullAllBy,
    pullAt,
    pullAllWith,
    remove,
    remove2,
    reverse,
    sortedIndex,
    sortedIndexBy,
    sortedIndexOf,
    sortedLastIndex,
    sortedLastIndexBy,
    sortedLastIndexOf,
    sortedUniq,
    sortedUniqBy,
    tail,
    take,
    takeRight,
    union,
    unionBy,
    unionWith,
    uniq,
    uniqBy,
    uniqWith,
    unzip,
    unzipWith,
    zip,
    without,
    takeRightWhile,
    takeWhile,
    xor,
    xorBy,
    xorWith,
    zipObject,
    zipObjectDeep,
    zipWith,
    countBy,
    every,
    filter,
    find,
    findLast,
    flatMap,
    flatMapDeep,
    flatMapDepth,
    forEach,
    forEachRight,
    groupBy,
    includes,
    invokeMap,
    keyBy,
    map,
    partition,
    reduce,
    reduceRight,
    reject,
    sample,
    sampleSize,
    shuffle,
    size,
    some,
    defer,
    delay,
    castArray,
    conformsTo,
    eq,
    gt,
    gte,
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
    isLength,
    isMap,
    isNaN,
    isMatch,
    isNative,
    isNil,
    isSet,
    isNull,
    isNumber,
    isObject,
    isObjectLike,
    isPlainObject,
    isRegExp,
    isSafeInteger,
    isString,
    isUndefined,
    isSymbol,
    isTypedArray,
    isWeakMap,
    isWeakSet,
    lt,
    lte,
    toArray,
    toFinite,
    toInteger,
    toNumber,
    ceil,
    divide,
    floor,
    max,
    maxBy,
    mean,
    meanBy,
    min,
    minBy,
    multiply,
    round,
    subtract,
    sum,
    sumBy,
    clamp,
    inRange,
    assign,
    assignIn,
    defaults,
    defaultsDeep,
    add,
    identity,
    iteratee,
    toPath,
    map,
    property,
    matches,
    matchesProperty,
    mapValues,
    mapKeys,
    before,
    flip,
    get,
  };
})();
