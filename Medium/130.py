from typing import List

class Solution:
  def solve(self, board: List[List[str]]) -> None:
    rows = len(board)
    cols = len(board[0])
    directions = [[1, 0], [-1, 0], [0, 1], [0, -1]]

    # 1. 定义 DFS 函数
    def dfs(r, c):
      if r < 0 or r >= rows or c < 0 or c >= cols or board[r][c] != 'O':
        return

      board[r][c] = 'E'

      for dr, dc in directions:
        dfs(r + dr, c + dc)

    # 2. 先处理边界上的 O
    # 从边界上的 'O' 开始 DFS，将其及其相连的 'O' 标记为 'E'
    # 目的是怕后面遍历的时候误将这些 'O' 变为 'X'
    for r in range(rows):
      for c in range(cols):
        if r == 0 or r == rows - 1 or c == 0 or c == cols - 1:
          if board[r][c] == 'O':
            dfs(r, c)

    # 3. 遍历整个 board
    # 将未被标记的 'O' 变为 'X'
    # 将 'E' 还原为 'O'
    for r in range(rows):
      for c in range(cols):
        if board[r][c] == 'O':
          board[r][c] = 'X'
        elif board[r][c] == 'E':
          board[r][c] = 'O'
          
          
    def solveBFS(self, board: List[List[str]]) -> None:
      rows = len(board)
      cols = len(board[0])
      directions = [[1, 0], [-1, 0], [0, 1], [0, -1]]
      # 先处理边界上的 O
      # 从边界上的 'O' 开始 BFS，将其及其相连的 'O' 标记为 'E'
      for r in range(rows):
        for c in range(cols):
          if r == 0 or r == rows - 1 or c == 0 or c == cols - 1:
            if board[r][c] == 'O':
              queue = deque()
              queue.append((r, c))
              board[r][c] = 'E'
              while queue:
                cur_r, cur_c = queue.popleft()
                for dr, dc in directions:
                  new_r = cur_r + dr
                  new_c = cur_c + dc
                  if new_r >= 0 and new_r < rows and new_c >= 0 and new_c < cols and board[new_r][new_c] == 'O':
                    queue.append((new_r, new_c))
                    board[new_r][new_c] = 'E'
      # 遍历整个 board
      # 将未被标记的 'O' 变为 'X'
      # 将 'E' 还原为 'O'
      for r in range(rows):
        for c in range(cols):
          if board[r][c] == 'O':
            board[r][c] = 'X'
          elif board[r][c] == 'E':
            board[r][c] = 'O'