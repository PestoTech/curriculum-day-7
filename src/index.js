/* Q1
 * Implement the two-argument Ackermann Function defined as
 *
 * A(m,n) = n+1             when m = 0
 * A(m,n) = A(m-1,1)        when m > 0 and n = 0
 * A(m,n) = A(m-1,A(m,n-1)) when m > 0 and n > 0
 *
 * Help with Ackermann Function:
 * https://en.wikipedia.org/wiki/Ackermann_function
 *
 * input: Object containing:
 *        m: Non-negative Integer
 *        n: Non-negative Integer
 *
 * output: Integer as defined above.
 */

function ackermann(input) {
  if (input.m === 0) {
    return input.n + 1;
  } else if (input.m > 0 && input.n === 0) {
    return ackermann({ m: input.m - 1, n: 1 });
  }

  return ackermann({ m: input.m - 1, n: ackermann({ m: input.m, n: input.n - 1 }) });
}

/* Q2 (*)
 * Returns a new list, composed of n-tuples of consecutive elements. If `n` is
 * greater than the length of the list, an empty list is returned.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * aperture(2, [1, 2, 3, 4, 5]); //=> [[1, 2], [2, 3], [3, 4], [4, 5]]
 * aperture(3, [1, 2, 3, 4, 5]); //=> [[1, 2, 3], [2, 3, 4], [3, 4, 5]]
 * aperture(7, [1, 2, 3, 4, 5]); //=> []
 */

function aperture(n, input) {
  if (n > input.length) {
    return [];
  }

  const slicedArray = [input.slice(0, n)];
  const [, ...restArr] = input;
  const arr = aperture(n, restArr);
  slicedArray.push(...arr);
  return slicedArray;
}

/* Q3 (*)
 * Returns the result of concatenating the given lists or strings.
 *
 * Note: `R.concat` expects both arguments to be of the same type,
 * unlike the native `Array.prototype.concat` method. It will throw
 * an error if you `concat` an Array with a non-Array value.
 *
 * Dispatches to the `concat` method of the first argument, if present.
 * Can also concatenate two members of a [fantasy-land
 * compatible semigroup](https://github.com/fantasyland/fantasy-land#semigroup).
 *
 *
 *    concat('ABC', 'DEF'); // 'ABCDEF'
 *    concat([4, 5, 6], [1, 2, 3]); //=> [4, 5, 6, 1, 2, 3]
 *    concat([], []); //=> []
 */

function concat(obj1, obj2) {
  const concatObj = obj1.concat(obj2);
  return concatObj;
}

/**
 * Finds the set (i.e. no duplicates) of all elements in the first list not
 * contained in the second list. Objects and Arrays are compared in terms of
 * value equality, not reference equality.
 *
 *      difference([1,2,3,4], [7,6,5,4,3]); //=> [1,2]
 *      difference([7,6,5,4,3], [1,2,3,4]); //=> [7,6,5]
 *      difference([{a: 1}, {b: 2}], [{a: 1}, {c: 3}]) //=> [{b: 2}]
 */

function difference(arr1, arr2) {
  const set2 = new Set(arr2);
  const set1 = new Set(arr1);

  const diffArr = [];

  set1.forEach((value) => {
    if (!set2.has(value)) {
      diffArr.push(value);
    }
  });

  return diffArr;
}

/* Q5 (*)
 * Returns a new object with the keys of the given object as values, and the
 * values of the given object, which are coerced to strings, as keys. Note
 * that the last key found is preferred when handling the same value.
 *
 *      const raceResults = {
 *        first: 'alice',
 *        second: 'jake'
 *      };
 *      invertObj(raceResults);
 *      //=> { 'alice': 'first', 'jake':'second' }
 *
 *      // Alternatively:
 *      const raceResults = ['alice', 'jake'];
 *      invertObj(raceResults);
 *      //=> { 'alice': '0', 'jake':'1' }
 */

function invertArrayObj(arr) {
  const invObj = {};
  arr.forEach((val, index) => {
    invObj[val] = index.toString();
  });
  return invObj;
}

function invertObj(obj) {
  if (typeof obj !== 'object' || obj === null) {
    return {};
  }

  if (Array.isArray(obj)) {
    return invertArrayObj(obj);
  }

  const invObj = {};
  Object.keys(obj).forEach((key) => {
    invObj[obj[key]] = key;
  });
  return invObj;
}


module.exports = {
  ackermann,
  aperture,
  concat,
  difference,
  invertObj,
};
