/*
 * @lc app=leetcode id=273 lang=javascript
 *
 * [273] Integer to English Words
 */

// @lc code=start
/**
 * @param {number} num
 * @return {string}
 */
var numberToWords = function (num) {
    let one = (num) => {
        switch (num) {
            case 1: return "One";
            case 2: return "Two";
            case 3: return "Three";
            case 4: return "Four";
            case 5: return "Five";
            case 6: return "Six";
            case 7: return "Seven";
            case 8: return "Eight";
            case 9: return "Nine";
        }
        return "";
    }

    let two = (num) => {
        switch (num) {
            case 10: return "Ten";
            case 11: return "Eleven";
            case 12: return "Twelve";
            case 13: return "Thirteen";
            case 14: return "Fourteen";
            case 15: return "Fifteen";
            case 16: return "Sixteen";
            case 17: return "Seventeen";
            case 18: return "Eighteen";
            case 19: return "Nineteen";
        }
        return "";
    }

    let ten = (num) => {
        switch (num) {
            case 2: return "Twenty";
            case 3: return "Thirty";
            case 4: return "Forty";
            case 5: return "Fifty";
            case 6: return "Sixty";
            case 7: return "Seventy";
            case 8: return "Eighty";
            case 9: return "Ninety";
        }
        return "";
    };

    let twoInteger = (num) => {
        if (num == 0)
            return "";
        else if (num < 10)
            return one(num);
        else if (num < 20)
            return two(num);
        else {
            let tenner = Math.floor(num / 10);
            let rest = num - tenner * 10;
            return rest ? ten(tenner) + " " + one(rest) : ten(tenner);
        }
    }

    let threeInteger = (num) => {
        let hundred = Math.floor(num / 100);
        let rest = num - hundred * 100;
        let res = "";
        res = (hundred ? one(hundred) + " Hundred" : "") + (rest ? (hundred ? " " : "") + twoInteger(rest) : "");
        return res;
    }


    if (num == 0)
        return "Zero";

    let billion = Math.floor(num / 1000000000);
    let million = Math.floor((num - billion * 1000000000) / 1000000);
    let thousand = Math.floor((num - billion * 1000000000 - million * 1000000) / 1000);
    let rest = Math.floor(num - billion * 1000000000 - million * 1000000 - thousand * 1000);

    let result = "";
    if (billion)
        result = threeInteger(billion) + " Billion";
    if (million) {
        if (result.length)
            result += " ";
        result += threeInteger(million) + " Million";
    }
    if (thousand) {
        if (result.length)
            result += " ";
        result += threeInteger(thousand) + " Thousand";
    }
    if (rest) {
        if (result.length)
            result += " ";
        result += threeInteger(rest);
    }
    return result;
};

// @lc code=end

