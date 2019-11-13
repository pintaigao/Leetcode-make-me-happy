/*
 * @lc app=leetcode id=872 lang=javascript
 *
 * [872] Leaf-Similar Trees
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root1
 * @param {TreeNode} root2
 * @return {boolean}
 */
var leafSimilar = function (root1, root2) {
  const leafSeq1 = getLeafSeq(root1);
  const leafSeq2 = getLeafSeq(root2);

  if (leafSeq1.length !== leafSeq2.length)
    return false;

  for (let i = 0; i < leafSeq1.length; i++) {
    if (leafSeq1[i] !== leafSeq2[i])
      return false;
  }

  return true;

  function getLeafSeq(rt) {
    const result = [];
    const helper = (root) => {
      if (!root)
        return null;
      let left = helper(root.left);
      let right = helper(root.right);

      if (!left && !right)
        result.push(root.val);
        
      return root;
    }

    helper(rt);
    return result;
  }
};

