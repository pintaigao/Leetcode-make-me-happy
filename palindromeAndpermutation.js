

let palindrome = (array) => {
    let result = []
    if (!array.length) return result;

    function swap(index1, index2) {
        let temp = array[index1];
        array[index1] = array[index2];
        array[index2] = temp;
    };

    function builder(array, index) {
        if (index === array.length) {
            result.push(array.join("") + array.slice().reverse().join(""));
        }

        for (let i = index; i < array.length; i++) {
            if (array[i] !== array[index]) {
                swap(index, i);
                builder(array, index + 1);
                swap(index, i);
            } else if (i === index) {
                builder(array, index + 1);
            };
        };
    };
    builder(array, 0);
    console.log(result);
};


palindrome(['a', 'b', 'c']);