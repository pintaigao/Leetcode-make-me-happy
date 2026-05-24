class Solution:
  def solveNQueens(self, n: int) -> List[List[str]]:
        res = []
        board = []

        # 生成 ["....", "....", "....", "...."]
        for i in range(n):
            board.append("." * n)

        def backtrack(row):
            # 触发结束条件
            if row == len(board):
                res.append(board[:])
                return

            for col in range(len(board[row])):
                # 排除不合法选择
                if is_valid(row, col):
                    # 做选择
                    new_row = list(board[row])
                    new_row[col] = "Q"
                    board[row] = "".join(new_row)
                    # 进入下一行决策
                    backtrack(row + 1)
                    # 撤销选择
                    new_row[col] = "."
                    board[row] = "".join(new_row)

        def is_valid(row, col):
            # 检查列是否有皇后互相冲突
            for i in range(row):
                if board[i][col] == "Q":
                    return False

            # 检查右上方 range(start, stop, step)
            for i, j in zip(range(row - 1, -1, -1), range(col + 1, len(board))):
                if board[i][j] == "Q":
                    return False

            # 检查左上方是否有皇后互相冲突
            i = row - 1
            j = col - 1

            while i >= 0 and j >= 0:
                if board[i][j] == "Q":
                    return False

                i -= 1
                j -= 1

            return True

        backtrack(0)
        return res