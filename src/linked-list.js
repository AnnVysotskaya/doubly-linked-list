const Node = require('./node');

class LinkedList {
    constructor() {
        this.length = 0;
        this._head = null;
        this._tail = null;
    }

    append(data) {
        var node = new Node(data);

        if (this.length) {
            this._tail.next = node;
            node.prev = this._tail;
            this._tail = node;
        } else {
            this._head = node;
            this._tail = node;
        }

        this.length++;
    }

    head() {
        return this._head.data;
    }

    tail() {
        return this._tail.data;
    }

    at(index) {
        var currentNode = this._head,
            length = this.length,
            count = 0;

        // invalid index
        if (index < 0 || index >= length) {
            throw new Error("Invalid index");
        }

        // valid index
        while (count < index) {
            currentNode = currentNode.next;
            count++;
        }

        return currentNode.data;
    }

    insertAt(index, data) {
        var node = new Node(data),
            currentNode = this._head,
            length = this.length,
            count = 0,
            beforeNodeToInsert = null,
            afterNodeToInsert = null;

        // invalid index
        if (index < 0 || index > length + 1) {
            throw new Error("Invlid index");
        }

        while (count < index) {
            beforeNodeToInsert = currentNode;
            afterNodeToInsert = currentNode.next;
            count++;
        }

        beforeNodeToInsert.next = node;
        node.prev = beforeNodeToInsert;
        afterNodeToInsert.prev = node;
        node.next = afterNodeToInsert;
        this.length++;
    }

    isEmpty() {
        return this.length === 0 ? true : false;
    }

    clear() {
        var currentNode = this._head,
            length = this.length,
            count = 1;

        while (count <= length) {
            currentNode.data = null;
            currentNode.prev = null;
            currentNode = currentNode.next;
            count++;
            this.length--;
        }
    }

    deleteAt(index) {
        var currentNode = this._head,
            length = this.length,
            count = 0,
            beforeNodeToDelete = null,
            nodeToDelete = null;

        // invalid index
        if (index < 0 || index > length) {
            throw new Error("Invalid index");
        }

        // delete first node
        if (index === 1) {
            this._head = currentNode.next;
            currentNode = null;
            this.length--;
        }

        // delete other node
        while (count < index) {
            beforeNodeToDelete = currentNode;
            nodeToDelete = currentNode.next;
            count++;
        }

        beforeNodeToDelete.next = nodeToDelete.next;
        nodeToDelete = null;
        this.length--;

    }

    reverse() {
        var head = this._head,
            tail = this._tail,
            count = (this.length - (this.length % 2)) / 2,
            temp;
        while (count > 0) {
            temp = head.data;
            head.data = tail.data;
            tail.data = temp;
            tail = tail.prev;
            head = head.next;
            count--;
        }
    }

    indexOf(data) {
        var currentNode = this._head,
            length = this.length,
            count = 0;

        while (count <= length - 1) {
            if (data === currentNode.data) {
                return count;
                break;
            }
            currentNode = currentNode.next;
            count++;
        }

        return -1;
    }
}

module.exports = LinkedList;
