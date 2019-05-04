const minimumDeleteSum = (s1, s2) => {
    if (!s1 && !s2) return 0;
    if (!s1 || !s2) return getASCIISum(s1) || getASCIISum(s2);
    const matrix = new Array(s1.length + 1).fill().map(() => new Array(s2.length + 1).fill(0));
    console.log(matrix);
    for (let i = 0; i < matrix.length; i++) {
        console.log("Inside Matric and i:" + i);
        for (let j = 0; j < matrix[i].length; j++) {
            console.log("Inside Matric and j:" + j);
            if (i === 0 || j === 0) continue;
            if (s1[i - 1] === s2[j - 1]) {
                console.log("s1[i - 1] === s2[j - 1] and s1[i - 1]:"+s1[i - 1]+" s2[j - 1]:"+s2[j - 1]);
                matrix[i][j] = matrix[i - 1][j - 1] + s1[i - 1].charCodeAt();
            } else {
                console.log("s1[i - 1] !== s2[j - 1] and s1[i - 1]:"+s1[i - 1]+" s2[j - 1]:"+s2[j - 1]);
                matrix[i][j] = Math.max(matrix[i][j - 1], matrix[i - 1][j]);
            }
        }
    }

    console.log(matrix);
    const max = matrix[s1.length][s2.length];
    return getASCIISum(s1) + getASCIISum(s2) - max * 2;
};

const getASCIISum = (s) => {
    if (!s) return 0;
    let sum = 0;
    for (let i = 0; i < s.length; i++) {
        sum += s[i].charCodeAt();
    }
    return sum;
};

minimumDeleteSum("delete", "leet");