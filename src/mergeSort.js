function mergeSort(arr) {
  if (arr == null) {
    return [];
  }
  const l = arr.length;
  if (l <= 1) {
    return arr;
  }

  const middle = Math.floor(l / 2);
  return merge(
    mergeSort(arr.slice(0, middle)),
    mergeSort(arr.slice(middle)),
    [],
  );
}

function merge(arr1, arr2, sorted) {
  if (arr1.length === 0 && arr2.length === 0) {
    return sorted;
  } else if (arr1.length === 0) {
    return [...sorted, ...arr2];
  } else if (arr2.length === 0) {
    return [...sorted, ...arr1];
  } else if (arr1[0] <= arr2[0]) {
    return merge(arr1.slice(1), arr2, [...sorted, arr1[0]]);
  } else {
    return merge(arr1, arr2.slice(1), [...sorted, arr2[0]]);
  }
}

export { mergeSort };
