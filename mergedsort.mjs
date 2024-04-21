export function sort(array) {
    let arr = array;
    if (arr.length === 1) {
        return arr;
    }
    else {
        let half = Math.floor(arr.length / 2) + arr.length % 2;
        let arr1 = arr.slice(0, half);
        let arr2 = arr.slice(half);
        arr1 = sort(arr1);
        arr2 = sort(arr2);
        arr = [];
        while (arr1.length > 0 && arr2.length > 0) {
            if (arr1[0] > arr2[0]) {
                arr.push(arr2.shift());
            }
            else {
                arr.push(arr1.shift());
            }
        }
        if (arr1.length === 0) {
            arr = arr.concat(arr2);
        }
        else {
            arr = arr.concat(arr1);
        }
        return arr;
    }
}
