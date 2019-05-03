

public class Solution {
    public boolean isValid(String s) {
        // char[] chars = s.toCharArray();
        // Map<Character, Character> pairs = new HashMap<Character, Character>();
        // pairs.put('(', ')');
        // pairs.put('{', '}');
        // pairs.put('[', ']');
        // Stack<Character> stack = new Stack<Character>();
        // for (char c : chars) {
        //     if (pairs.containsKey(c)) {
        //         stack.push(pairs.get(c));
        //     } else {
        //         if (stack.isEmpty() || c != stack.pop())
        //             return false;
        //     }
        // }
        // return stack.isEmpty();
        Stack<Character> stack = new Stack();
        for (Character c : s.toCharArray()) {
            switch (c) {
            case '{':
                stack.push('}');
            case '[':
                stack.push(']');
            case '(':
                stack.push(')');
            case '}':
                if(stack.isEmpty()||stack.pop() != '}')
                    return false;
            case ']':
                if(stack.isEmpty()||stack.pop() != ']' )
                    return false;
            case ')':
                if(stack.isEmpty()||stack.pop() != ')')
                    return false;
            }
        }
        return stack.isEmpty();
    }

}