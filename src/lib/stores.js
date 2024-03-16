import { writable } from 'svelte/store';

function createPriorityQueue() {
    const { subscribe, set, update } = writable([]);

    function insert(item) {
        update(items => {
            // Find the correct position for the new item
            const index = items.findIndex(el => item.frequency < el.frequency);
            const updatedItems = [...items];
            if (index !== -1) {
                updatedItems.splice(index, 0, item);
            } else {
                updatedItems.push(item);
            }
            return updatedItems;
        });
    }

    function extractMin() {
        let extractedItem = null;
        update(items => {
            if (items.length === 0) {
                throw new Error("PriorityQueue is empty");
            }
            extractedItem = items.shift();
            return items;
        });
        return extractedItem;
    }

    function peek() {
        let firstItem = null;
        update(items => {
            firstItem = items.length > 0 ? items[0] : null;
            return items; // We don't actually modify the items here
        });
        return firstItem;
    }

    // Added function to peek the second item in the queue
    function peekSecond() {
        let secondItem = null;
        update(items => {
            secondItem = items.length > 1 ? items[1] : null;
            return items; // We don't modify the items here
        });
        return secondItem;
    }

    function clear() {
        set([]);
    }

    return {
        subscribe,
        insert,
        extractMin,
        peek,
        peekSecond,
        clear
    };
}

export const priorityQueueStore = createPriorityQueue();

export const highlightTopBar = writable(false);

export const highlightLeftNode = writable('hidden');
export const highlightRightNode = writable('hidden');
export const highlightRoot = writable('hidden');