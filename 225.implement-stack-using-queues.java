class MyQueue {
    Stack<Integer> stack;

    public MyQueue() {
        stack = new Stack<Integer>();
    }

    public void push(int x) {
        if (stack.size() == 0) {
            stack.push(x);
        } else {
            int data = stack.peek();
            stack.pop();
            push(x);
            stack.push(data);
        }
    }

    public void pop() {
        stack.pop();
    }

    public int peek() {
        return stack.peek();
    }

    public boolean empty() {
        return stack.isEmpty();
    }
}

/**
 * Your MyStack object will be instantiated and called as such:
 * MyStack obj = new MyStack();
 * obj.push(x);
 * int param_2 = obj.pop();
 * int param_3 = obj.top();
 * boolean param_4 = obj.empty();
 */