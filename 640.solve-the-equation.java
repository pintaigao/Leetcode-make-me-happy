class Solution {
	public String solveEquation(String equation) {
		String[] parts = equation.split("=");
		char[] leftChars = parts[0].toCharArray();
		char[] rightChars = parts[1].toCharArray();
		int leftSum = 0;
		int rightSum = 0;

		int sign = 1;
		for (int i = 0; i < leftChars.length; i++) {
			char c = leftChars[i];
			if (c == '+') {
				sign = 1;
			} else if (c == '-') {
				sign = -1;
			} else if (c == 'x') {
				leftSum += sign;
			} else {
				int sum = 0;
				boolean withX = false;
				while (i < leftChars.length && leftChars[i] != '+' && leftChars[i] != '-') {
					if (leftChars[i] != 'x') {
						sum = sum * 10 + (leftChars[i] - '0');
					} else {
						withX = true;
						break;
					}
					i++;
				}
				if (!withX) {
					rightSum -= sign * sum;
					i--;
				} else {
					leftSum += sign * sum;
				}
			}
		}

		sign = 1;
		for (int i = 0; i < rightChars.length; i++) {
			char c = rightChars[i];
			if (c == '+') {
				sign = 1;
			} else if (c == '-') {
				sign = -1;
			} else if (c == 'x') {
				leftSum -= sign;
			} else {
				int sum = 0;
				boolean withX = false;
				while (i < rightChars.length && rightChars[i] != '+' && rightChars[i] != '-') {
					if (rightChars[i] != 'x') {
						sum = sum * 10 + (rightChars[i] - '0');
					} else {
						withX = true;
						break;
					}
					i++;
				}
				if (!withX) {
					rightSum += sign * sum;
					i--;
				} else {
					leftSum -= sign * sum;
				}
			}
		}

		if (rightSum == 0 && leftSum == 0)
			return "Infinite solutions";
		if (leftSum == 0)
			return "No solution";
		return "x=" + (int) (rightSum / leftSum);
	}
}