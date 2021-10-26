/*
 * @lc app=leetcode id=1507 lang=javascript
 *
 * [1507] Reformat Date
 */

// @lc code=start
/**
 * @param {string} date
 * @return {string}
 */
var reformatDate = function (date) {
  // Format the map
  let months = {
    Jan: "01",
    Feb: "02",
    Mar: "03",
    Apr: "04",
    May: "05",
    Jun: "06",
    Jul: "07",
    Aug: "08",
    Sep: "09",
    Oct: "10",
    Nov: "11",
    Dec: "12",
  };

  let ss = date.split(new RegExp("\\s+"));
  let sb = "";
  sb = sb + ss[2] + "-";
  sb = sb + months[ss[1]] + "-";

  let day =
    ss[0].length === 3 ? "0" + ss[0].substring(0, 1) : ss[0].substring(0, 2);
  sb += day;

  return sb;
};

// @lc code=end
