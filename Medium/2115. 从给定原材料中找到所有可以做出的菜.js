var findAllRecipes = function (recipes, ingredients, supplies) {
  // 创建一个哈希表用于记录原料的供应情况
  let map = {};
  // 初始化哈希表，将原料供应情况设置为true
  for (let i = 0; i < supplies.length; i++) { map[supplies[i]] = true; }

  // 定义深度优先搜索函数
  function dfs() {
    // 遍历所有菜品
    for (let i = 0; i < recipes.length; i++) {
      // 如果当前菜品已经可以制作，则跳过
      if (map[recipes[i]]) continue;
      // 标记当前菜品是否可制作，默认为可制作
      let flag = true;
      // 遍历当前菜品的所有原料
      for (let j = 0; j < ingredients[i].length; j++) {
        // 如果某个原料缺乏供应，则标记当前菜品不可制作
        if (!map[ingredients[i][j]]) {
          flag = false;
        }
      }
      // 如果当前菜品可制作，则将其标记为true，并继续搜索
      if (flag) {
        map[recipes[i]] = true;
      }

      dfs();
    }
  }

  // 初始调用深度优先搜索函数
  dfs();
  // 根据哈希表中记录的可制作菜品，构建结果数组
  let ret = [];
  for (let i = 0; i < recipes.length; i++) {
    map[recipes[i]] && ret.push(recipes[i]);
  }
  // 返回结果数组
  return ret;
};

// 练习
var findAllRecipes = function (recipes, ingredients, supplies) {
  // 创建一个哈希表用于记录原料的供应情况
  let map = {};
  // 初始化哈希表，将原料供应情况设置为true
  for (let i = 0; i < supplies.length; i++) { map[supplies[i]] = true; }

  // 定义深度优先搜索函数
  function dfs() {
    // 遍历所有菜品
    for (let i = 0; i < recipes.length; i++) {
      // 如果当前菜品已经可以制作，则跳过
      if (map[recipes[i]]) continue;
      // 标记当前菜品是否可制作，默认为可制作
      let flag = true;
      // 遍历当前菜品的所有原料
      for (let j = 0; j < ingredients[i].length; j++) {
        // 如果某个原料缺乏供应，则标记当前菜品不可制作
        if (!map[ingredients[i][j]]) {
          flag = false;
        }
      }
      // 如果当前菜品可制作，则将其标记为true，并继续搜索
      if (flag) {
        map[recipes[i]] = true;
      }

      dfs();
    }
  }

  // 初始调用深度优先搜索函数
  dfs();
  // 根据哈希表中记录的可制作菜品，构建结果数组
  let ret = [];
  for (let i = 0; i < recipes.length; i++) {
    map[recipes[i]] && ret.push(recipes[i]);
  }
  // 返回结果数组
  return ret;
};

// 练习
var findAllRecipes = function (recipes, ingredients, supplies) {
  // 创建一个哈希表用于记录原料的供应情况
  let map = {};
  // 初始化哈希表，将原料供应情况设置为true
  for (let i = 0; i < supplies.length; i++) { map[supplies[i]] = true; }

  // 定义深度优先搜索函数
  function dfs() {
    // 遍历所有菜品
    for (let i = 0; i < recipes.length; i++) {
      // 如果当前菜品已经可以制作，则跳过
      if (map[recipes[i]]) continue;
      // 标记当前菜品是否可制作，默认为可制作
      let flag = true;
      // 遍历当前菜品的所有原料
      for (let j = 0; j < ingredients[i].length; j++) {
        // 如果某个原料缺乏供应，则标记当前菜品不可制作
        if (!map[ingredients[i][j]]) {
          flag = false;
        }
      }
      // 如果当前菜品可制作，则将其标记为true，并继续搜索
      if (flag) {
        map[recipes[i]] = true;
      }
      // 重头再看一遍
      dfs();
    }
  }

  // 初始调用深度优先搜索函数
  dfs();
  // 根据哈希表中记录的可制作菜品，构建结果数组
  let ret = [];
  for (let i = 0; i < recipes.length; i++) {
    map[recipes[i]] && ret.push(recipes[i]);
  }
  // 返回结果数组
  return ret;
};

// 练习
var findAllRecipes10 = function (recipes, ingredients, supplies) {
  let suppliesSet = new Set(supplies), ret = [];

  function traverler() {
    for (let i = 0; i < recipes.length; i++) {
      if (suppliesSet.has(recipes[i])) continue;

      let doable = true;
      for (let j = 0; j < ingredients[i].length; j++) {
        if (!suppliesSet.has(ingredients[i][j])) {
          doable = false;
          break;
        }
      }

      // 还是需要 doable，不能单单靠上面的 break，因为 break 只是跳出当前原料的循环，但并不代表当前菜品就一定可制作，必须通过 doable 来判断整个菜品是否可制作
      if (doable) {
        suppliesSet.add(recipes[i]);
      }

      // 重头再看一遍
      traverler()
    }
  }

  traverler();
  // 根据哈希表中记录的可制作菜品，构建结果数组
  for (let i = 0; i < recipes.length; i++) { suppliesSet.has(recipes[i]) && ret.push(recipes[i]) }
  // 返回结果数组
  return ret;
}


findAllRecipes10(["bread", "sandwich"], [["yeast", "flour"], ["bread", "meat"]], ["yeast", "flour", "meat"])


// BFS
var findAllRecipes = function (recipes, ingredients, supplies) {
  // 创建一个哈希表用于记录原料的供应情况
  let map = {};
  // 初始化哈希表，将原料供应情况设置为 true
  for (let i = 0; i < supplies.length; i++) {
    map[supplies[i]] = true;
  }

  // 定义一个队列用于广度优先搜索
  let queue = [];

  // 初始化队列，检查直接可以制作的菜品
  for (let i = 0; i < recipes.length; i++) {
    let flag = true;
    for (let j = 0; j < ingredients[i].length; j++) {
      if (!map[ingredients[i][j]]) {
        flag = false;
        break;
      }
    }
    if (flag) {
      map[recipes[i]] = true;
      queue.push(recipes[i]);
    }
  }

  // 使用队列进行广度优先搜索
  while (queue.length > 0) {
    let currentRecipe = queue.shift();
    for (let i = 0; i < recipes.length; i++) {
      if (!map[recipes[i]]) {
        let flag = true;
        for (let j = 0; j < ingredients[i].length; j++) {
          if (!map[ingredients[i][j]]) {
            flag = false;
            break;
          }
        }
        if (flag) {
          map[recipes[i]] = true;
          queue.push(recipes[i]);
        }
      }
    }
  }

  // 利用 filter 方法筛选出可制作的菜品
  let ret = recipes.filter(recipe => map[recipe]);

  return ret;
};