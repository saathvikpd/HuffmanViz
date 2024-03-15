class PriorityQueue {
    constructor() {
        this.items = [];
    }

    // Insert item into the queue and maintain the sorted order
    insert(item) {
        // Find the correct position for the new item
        let added = false;
        for (let i = 0; i < this.items.length; i++) {
            if (item.frequency < this.items[i].frequency) {
                this.items.splice(i, 0, item);
                added = true;
                break;
            }
        }

        // If the item has the highest frequency so far, add it at the end
        if (!added) {
            this.items.push(item);
        }
    }

    // Remove and return the item with the lowest frequency (highest priority)
    extractMin() {
        if (this.isEmpty()) {
            throw new Error("PriorityQueue is empty");
        }
        return this.items.shift(); // Remove and return the first item
    }

    // Peek at the item with the lowest frequency without removing it
    peek() {
        if (this.isEmpty()) {
            throw new Error("PriorityQueue is empty");
        }
        return this.items[0];
    }

    // Check if the queue is empty
    isEmpty() {
        return this.items.length === 0;
    }

    // Get the size of the queue
    size() {
        return this.items.length;
    }

    // Clear the queue
    clear() {
        this.items = [];
    }
}

// Export the PriorityQueue class
export default PriorityQueue;
