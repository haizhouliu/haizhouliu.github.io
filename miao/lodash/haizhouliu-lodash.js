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
  // function differenceBy(array, values, iteratee) {
  //   let ary = array.map((it) => iteratee(it));
  //   let val = values.map((it) => iteratee(it));
  //   let nums = difference(ary, val);
  //   let result = [];
  //   for (let i = 0; i < nums.length; i++) {
  //     result.push(array[ary.indexOf(nums[i])]);
  //   }
  //   return result;
  // }
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
  return {
    compact,
    chunk,
    concat,
    difference,
    // differenceBy,
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
  };
})();
