class DynamicArray {
    constructor() {
        this.data = [];
        this.size = 0;
        this.INIT_CAP = 1;
    }

    init(initCapacity) {
        const capacity = initCapacity || this.INIT_CAP;
        this.data = new Array(capacity);
        this.size = 0;
    }

    // 增
    addLast(e) {
        const cap = this.data.length;
        // Edge case: if no more space, resize it to 2X
        if (this.size === cap) {
            this.resize(2 * cap);
        }

        // 在数组末尾添加元素
        this.data[this.size] = e;
        this.size++;
    }

    add(index, e) {
        // Edge case:
        const cap = this.data.length;
        if (this.size === cap) {
            this.resize(2 * cap);
        }

        // 核心，index 后面的元素都要往后移一位然后插入
        for (let i = this.size - 1; i >= index; i--) {
            this.data[i + 1] = this.data[i];
        }
        this.data[index] = e;
        this.size++;
    }

    addFirst(e) {
        this.add(0, e);
    }

    removeLast() {
        // Edge case:
        const cap = this.data.length;
        if (this.size === Math.floor(cap / 4)) {
            this.resize(Math.floor(cap / 2));
        }

        // 核心
        const deleteValue = this.data[this.size - 1];
        this.data[this.size - 1] = null;
        this.size--;

        return deleteValue;
    }


    remove(index) {
        // 缩减
        const cap = this.data.length;
        if (this.size === Math.floor(cap / 4)) {
            this.resize(Math.floor(cap / 2));
        }

        // 核心
        const deleteValue = this.data[index];
        for (let i = index + 1; i < this.size; i++) {
            this.data[i - 1] = this.data[i];
        }
        this.data[this.size - 1] = null;
        this.size--;
        return deleteValue;
    }

    removeFirst() {
        return this.remove(0);
    }

    resize(newSize) {
        const temp = new Array(newSize);

        // Copy array to temp
        for (let i = 0; i < this.size; i++) {
            temp[i] = this.data[i];
        }

        this.data = temp;
    }
}