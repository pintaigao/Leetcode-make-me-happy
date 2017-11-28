class Solution {
    public List<Integer> findSubstring(String s, String[] words) {
		/**
		 * Let n=s.length, k=words[0].length traverse s with indices i, i+k,
		 * i+2k, ... for 0<=i<k, so that the time complexity is O(n).
		 */
		List<Integer> res = new ArrayList<Integer>(); // ok you got a list
		int len = s.length(), m = words.length, n; // ok you got the length of s and the length of words and n =0;
		if (len == 0 || m == 0 || (n = words[0].length()) == 0) return res;
		HashMap<String, Integer> wDict = new HashMap<String, Integer>(); // ok you have a hashMap
		for (String word : words) wDict.put(word, wDict.getOrDefault(word, 0) + 1); // ok you put two words into the map 
		int i, j, start, x, wordsLen = m * n; // ok you have so many this things i,j,start,x,wordlength = m*n
		HashMap<String, Integer> curDict = new HashMap<String, Integer>(); //ok you got another map 
		String test, temp; // ok you have two string 
		for (i = 0; i < n; i++) {
			curDict.clear(); 
			start = i; // ok start = i
			if (start + wordsLen > len) return res; 
			for (j = i; j <= len - n; j += n) {
				test = s.substring(j, j + n);
				if (wDict.containsKey(test)) {
					if (!curDict.containsKey(test)) {
						curDict.put(test, 1);
						start = checkFound(res, start, wordsLen, j, n, curDict, s);
					} else {
                        // curDict.containsKey(test)
					x = curDict.get(test);
					if (x < wDict.get(test)) {
						curDict.put(test, x + 1);

						start = checkFound(res, start, wordsLen, j, n, curDict, s);
						continue;
					}
					while (!(temp = s.substring(start, start + n)).equals(test)) {
						decreaseCount(curDict, temp);
						start += n;
					}
					start += n;
                    }

					
				} else {
                    // totally failed up to index j+k, slide start and reset all
                    start = j + n;
                    curDict.clear();
                }
                if (start + wordsLen > len) break;
			}
		}
		return res;
	}

	public int checkFound(List<Integer> res, int start, int wordsLen, int j, int k,
			HashMap<String, Integer> curDict, String s) {
		if (start + wordsLen == j + k) {
			res.add(start);
			// slide start to the next word
			decreaseCount(curDict, s.substring(start, start + k));
			return start + k;
		}
		return start;
	}

	public void decreaseCount(HashMap<String, Integer> curDict, String key) {
		// remove key if curDict.get(key)==1, otherwise decrease it by 1
		int x = curDict.get(key);
		if (x == 1)
			curDict.remove(key);
		else
			curDict.put(key, x - 1);
	}
}