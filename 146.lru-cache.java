public class LRUCache {
    private Map<Integer, DoubleLinkedList> cache;
    DoubleLinkedList tail = null;
    DoubleLinkedList head = null;
    int capacity;

    public LRUCache(int capacity) {
        cache = new HashMap<Integer, DoubleLinkedList>();
        this.capacity = capacity;
    }

    public int get(int key) {
        if (cache.containsKey(key)) {
            DoubleLinkedList target = cache.get(key);
            int value = target.value;
            target.update();
            return value;
        } else
            return -1;
    }

    public void set(int key, int value) {
        if (cache.containsKey(key)) {
            DoubleLinkedList target = cache.get(key);
            target.value = value;
            target.update();
        } else {
            if (capacity == 0)
                return;
            if (cache.size() == capacity) {
                cache.remove(head.key);
                head.removeFromHead();
            }
            DoubleLinkedList newNode = new DoubleLinkedList(key, value);
            newNode.append();
            cache.put(key, newNode);
        }
    }

    class DoubleLinkedList {
        int key;
        int value;
        DoubleLinkedList left = null;
        DoubleLinkedList right = null;

        public DoubleLinkedList(int key, int value) {
            this.key = key;
            this.value = value;
        }

        // remove head from list and update head reference.
        private void removeFromHead() {
            // if 'this' is the only node, set both head and tail to null.
            if (tail == this) {
                head = null;
                tail = null;
            } else {
                head = this.right;
                head.left = null;
            }
        }

        private void update() {
            // no need to update if accessing the most revently used value.
            if (tail == this)
                return;
            else {
                // remove from current postion and update nodes (if any) on both sides.
                if (this != head) {
                    this.left.right = this.right;
                } else {
                    head = this.right;
                }
                this.right.left = this.left;
                // append to tail.
                this.append();
            }
        }

        private void append() {
            // inserting the first node.
            if (tail == null) {
                head = this;
                tail = this;
                // appned as tail and update tail reference.
            } else {
                this.right = null;
                this.left = tail;
                tail.right = this;
                tail = this;
            }
        }
    }
}