import PriorityQueue from './PriorityQueueStore';
import TreeNode from './TreeNode';

class HuffmanTree {
    constructor(frequencies) {
        this.codes = []
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

    class HuffmanCode {
        constructor(c, freq, code) {
            this.c = c;
            this.freq = freq;
            this.code = code;
        }
    }
    
    function getCodes(root, s, codes) {
        if (root.left == null && root.right == null) {
            let huffCode = new HuffmanCode(root.c, root.data, s);
            codes.push(huffCode);
            return;
        }
        getCodes(root.left, s + "0", codes);
        getCodes(root.right, s + "1", codes);
    }
    
    function generateHuffmanCode(userText, root) {
        let huffmanCodes = [];
        getCodes(root, "", huffmanCodes);
    
        let encryptedText = "";
        let i = 0;
        while (i < userText.length) {
            let char = userText[i];
            let huffmanCode = huffmanCodes.find(code => code.c === char);
            if (huffmanCode) {
                encryptedText += huffmanCode.code;
            } else {
                encryptedText += char;
            }
            i++;
        }
    
        return encryptedText;
    }
    
     

export default HuffmanTree;