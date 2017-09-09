class Solution {
	public static List<List<String>> findDuplicate(String[] paths) {
		// hashmap: file content as key, list of files as value
		HashMap<String, List<String>> hm = new HashMap<String, List<String>>();
		List<List<String>> ret = new LinkedList<List<String>>();

		// populate the hashmap
		for (String path : paths) {
			String[] p = path.split(" ");
			String dir = null;
			for (int i = 0; i < p.length; i++) {
				if (i == 0) {
					dir = p[0];
				} else {
					String f = p[i];
					String content = f.substring(f.indexOf("(") + 1, f.indexOf(")"));
					String fulldir = dir + "/" + f.substring(0, f.indexOf("("));
					if (hm.containsKey(content)) {
						((List<String>) hm.get(content)).add(fulldir);
					} else {
						List<String> ll = new LinkedList<String>();
						ll.add(fulldir);
						hm.put(content, ll);
					}
				}
			}
		}

		// collect only when files more than 1
		for (String content : hm.keySet()) {
			List<String> ll = hm.get(content);
			if (ll.size() > 1) {
				ret.add(ll);
			}
		}

		return ret;
	}
}