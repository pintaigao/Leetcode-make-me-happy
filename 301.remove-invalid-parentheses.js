/*
 * @lc app=leetcode id=301 lang=javascript
 *
 * [301] Remove Invalid Parentheses
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string[]}
 */

// 1. DFS 思路 (这个实在是，太brillient但又太复杂了)
var removeInvalidParentheses = function (s) {
    let result = [];
    function remove(str, open_index, close_index, pairs) {
        for (let stack = 0, i = open_index; i < str.length(); i++) {
            if (s[i] === pairs[0]) stack++;
            if (s[i] === pairs[1]) stack--;
            if (stack >= 0) continue;
            for (let j = close_index; j <= i; j++) {
                if (s[j] === pairs[1] && (j === close_index || s[j - 1] != pairs[1])) {
                    remove(str.substring(0, j) + str.substring(j + 1, str.length), i, j, pairs);
                }
            }
            return;
        }
        let reversed = str.split("").reverse().join();
        if (pairs[0] == "(")
            remove(reversed, 0, 0, [")", "("]);
        else
            result.add(reversed);
    }
    remove(s, 0, 0, ["(", ")"]);
    return result;
};

// 2. BFS
var removeInvalidParentheses = function (s) {
    let result = [];
    // condition check


    // Initiate the data
    let visited = new Set();
    let queue = [s];
    visited.add(s);

    let found = false;

    while (queue.length) {
        s = queue.shift();
        if (isValid(s)) {
            result.push(s);
            fount = true;
        }

        if (found) continue;

        for (let i = 0; i < s.length; i++) {
            if (s[i] !== "(" && s[i] !== ")") continue;
            let t = s.substring(0, i) + s.substring(i + 1);

            if (!visited.has(t)) {
                queue.push(t);
                visited.add(t);
            }
        }
    }



    isValid = (s) => {
        let count = 0;
        for (let i = 0; i < s.length; i++) {
            if (s[i] == ")" && count == 0) return false;
            if (s[i] == "(") count++
            if (s[i] == ")") count--;
        }
        return count === 0;
    }

    return result;
}


// @lc code=end

