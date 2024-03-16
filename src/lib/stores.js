/* * Custom Svelte Store: PriorityQueue
 * 
 * The PriorityQueue store is designed to manage a collection of items sorted by a specified priority.
 * In this implementation, each item is an object with at least a 'frequency' property, which determines its priority.
 * Items with lower frequency values are considered higher priority.
 * 
 * Methods:
 *  - subscribe(callback): Allows Svelte components to reactively subscribe to queue changes.
 *  - insert(item): Inserts an item into the queue, maintaining the priority order.
 *  - extractMin(): Removes and returns the item with the highest priority (lowest frequency) from the queue.
 *  - peek(): Returns the item with the highest priority without removing it from the queue.
 *  - clear(): Empties the queue.
 * 
 * Usage:
 * 
 * Import the store and use its methods to interact with the priority queue within Svelte components.
 * 
 * Example:
 * 
 * ```javascript
 * import { priorityQueueStore } from './PriorityQueueStore.js';
 * 
 * // To add an item to the queue
 * priorityQueueStore.insert({ character: 'a', frequency: 5 });
 * 
 * // To reactively display the queue in a component
 * <script>
 *   import { priorityQueueStore } from './PriorityQueueStore.js';
 * </script>
 * 
 * <ul>
 *   {#each $priorityQueueStore as item}
 *     <li>{item.character} - {item.frequency}</li>
 *   {/each}
 * </ul>
 * 
 * // To extract the minimum item from the queue
 * const minItem = priorityQueueStore.extractMin(); // Note: Due to Svelte's reactivity, direct return values should be handled with care.
 * 
 * // To clear the queue
 * priorityQueueStore.clear();
 * ```
 * 
 * Considerations:
 *  - This store is reactive; any changes made through its methods will automatically update subscribed components.
 *  - The `extractMin` method's direct use may need adaptation in Svelte components due to the async nature of store updates.
 *  - Ensure to handle the potential asynchronous nature of extracting and using items from the store in your components.
 */
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

    function clear() {
        set([]);
    }

    return {
        subscribe,
        insert,
        extractMin,
        peek,
        clear
    };
}

export const priorityQueueStore = createPriorityQueue();

export const highlightTopBar = writable(false);
export const highlightLeftNode = writable(false);
export const highlightRightNode = writable(false);
export const highlightRoot = writable(false);