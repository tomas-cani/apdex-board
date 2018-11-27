function binarySearch(array, element, criteria) {
  let start = 0;
  let end = array.length;
  
  while (start < end) {
    let middle = Math.floor((end + start) / 2);
    if (array[middle][criteria] > element[criteria]) {
      start = middle + 1;
    } else {
      end = middle;
    }
  }
  return start;
}

export default class ArrayUtils {
  static insertInOrder(array, newElement, criteria) {
    const index = this.findOrderedInsertionIndex(array, newElement, criteria);
    array.splice(index, 0, newElement);
  }

  static findOrderedInsertionIndex(array, newElement, criteria) {
    return binarySearch(array, newElement, criteria);
  }
}
