/**
 * // Definition for a Node.
 * function Node(val,children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */
/**
 * @param {Node} root
 * @return {number[][]}
 */
var levelOrder = function (root) {
  if (!root) {
    return [];
  }

  let result = [[root.val]];
  let nextProcessArr = [root];
  let nextProcessVal = [];
  let preArray = [];
  let preArrayVal = [];

  while (true) {
    for (let index = 0; index < nextProcessArr.length; index++) {
      if (nextProcessArr[index].children.length) {
        for (let i in nextProcessArr[index].children) {
          preArray.push(nextProcessArr[index].children[i]);
          preArrayVal.push(nextProcessArr[index].children[i].val);
        }
      }

      if (index == nextProcessArr.length - 1) {
        if (preArray.length === 0) {
          return result;
        }
      }
    }

    nextProcessArr = preArray;
    nextProcessVal = preArrayVal;
    preArray = [];
    preArrayVal = [];
    result.push(nextProcessVal);
  }
};

// const levelOrder = (root) => {
//   const res = []
//   if (!root) {
//     return res
//   }
//   let frontier = [root]
//   while (frontier.length) {
//     const next = []
//     res.push(frontier.map(node => node.val))
//     frontier.forEach((node) => {
//       if (node.children) {
//         next.push(...node.children)
//       }
//     })
//     frontier = next
//   }
//   return res
// }