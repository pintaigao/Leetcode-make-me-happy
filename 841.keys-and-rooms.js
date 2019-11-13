/*
 * @lc app=leetcode id=841 lang=javascript
 *
 * [841] Keys and Rooms
 */
/**
 * @param {number[][]} rooms
 * @return {boolean}
 */
var canVisitAllRooms = function (rooms) {
  if (!rooms.length) {
    return true;
  }

  let set = new Set();
  dfs(rooms, set, 0);

  return set.size === rooms.length;
};

let dfs = (rooms, set, room) => {
  if (set.has(room)) {
    return;
  }

  set.add(room);

  for (let key of rooms[room]) {
    dfs(rooms, set, key);
  }
}

