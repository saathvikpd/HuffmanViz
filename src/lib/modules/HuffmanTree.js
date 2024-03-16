import { PriorityQueue } from './PriorityQueue';

class TreeNode {
    constructor(character, frequency, left = null, right = null) {
        this.character = character;
        this.frequency = frequency;
        this.left = left;
        this.right = right;
        this.isLeaf = !(left || right); // true for leaf, false for internal node
    }
}

class HuffmanTree {
    constructor(frequencies) {
        this.priorityQueue = new PriorityQueue();
        this.waitingRoom = []; // Reference for visualization, not for logical tree construction
        this.currentNodes = { left: null, right: null }; // Tracks nodes for current operation
        this.root = null; // Root of the final Huffman tree
        this.initializeQueue(frequencies);
    }

    initializeQueue(frequencies) {
        frequencies.forEach(({ character, frequency }) => {
            const node = new TreeNode(character, frequency);
            this.priorityQueue.insert(node);
        });
    }

    // Adjusted getNextNode to only pull from the priority queue
    getNextNode() {
        if (this.priorityQueue.isEmpty()) {
            return null;
        }
        const nextNode = this.priorityQueue.extractMin();

        // If the node is not a leaf, it means it's an internal node possibly in the waiting room
        if (!nextNode.isLeaf) {
            const indexInWaitingRoom = this.waitingRoom.findIndex(node => node === nextNode);
            if (indexInWaitingRoom !== -1) {
                // Remove the node from the waiting room as it's now being used
                this.waitingRoom.splice(indexInWaitingRoom, 1);
            }
        }

        return nextNode;
    }

    createParentNode() {
        const { left, right } = this.currentNodes;
        if (left && right) {
            const parentFrequency = left.frequency + right.frequency;
            const parentNode = new TreeNode(null, parentFrequency, left, right);
            if (this.priorityQueue.size() === 0 && this.waitingRoom.length === 0) {
                // If this is the final node, don't reinsert; this is the root
                this.root = parentNode;
            } else {
                this.priorityQueue.insert(parentNode);
                this.waitingRoom.push(parentNode); // Keep reference for visualization
            }
            this.currentNodes = { left: null, right: null }; // Reset for the next operation
        }
    }

    executeNextStep() {
        if (this.root) {
            console.log("Huffman tree construction is complete.");
            return;
        }
        if (!this.currentNodes.left) {
            this.currentNodes.left = this.getNextNode();
        } else if (!this.currentNodes.right) {
            this.currentNodes.right = this.getNextNode();
        }
        if (this.currentNodes.left && this.currentNodes.right) {
            this.createParentNode();
        }
    }
}

export default HuffmanTree;