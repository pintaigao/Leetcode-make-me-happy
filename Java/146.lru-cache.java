public class LRUCache {
    LinkedHashMap<Integer, Integer> cache = new LinkedHashMap<>();
    int cap = 0;

    public LRUCache(int capacity) {
        cap = capacity;
    }

    public int get(int key) {
        if (cache.containsKey(key)) {
            int value = cache.get(key);
            cache.remove(key);
            cache.put(key, value);
            return value;
        }
        return -1;
    }

    public void put(int key, int value) {
        if (cache.containsKey(key)) {
            cache.remove(key);
            cache.put(key, value);
        } else if (cache.size() == cap)
            cache.remove(cache.entrySet().iterator().next().getKey());
        cache.put(key, value);
    }
}