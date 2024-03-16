import HuffmanTree from '../src/lib/modules/HuffmanTree'; // Adjust the import based on your file structure

describe('HuffmanTree', () => {
    let frequencies;
    let huffmanTree;

    beforeEach(() => {
        // Sample frequencies for testing
        frequencies = [
            { character: 'a', frequency: 5 },
            { character: 'b', frequency: 9 },
            { character: 'c', frequency: 12 },
            { character: 'd', frequency: 13 },
            { character: 'e', frequency: 16 },
            { character: 'f', frequency: 45 }
        ];
        huffmanTree = new HuffmanTree(frequencies);
    });

    test('initializes priority queue correctly', () => {
        expect(huffmanTree.priorityQueue.size()).toBe(frequencies.length);
    });

    test('executes steps to combine nodes into a parent node', () => {
        // Execute two steps to select the first two nodes
        huffmanTree.executeNextStep(); // Selects first node
        huffmanTree.executeNextStep(); // Selects second node and combines them

        // Check if a parent node was created and added to the priority queue
        expect(huffmanTree.priorityQueue.size()).toBe(frequencies.length - 1); // One less because two nodes are combined
        expect(huffmanTree.waitingRoom.length).toBe(1); // Parent node added to the waiting room
    });

    test('completes the Huffman tree construction', () => {
        // Execute steps until the Huffman tree is complete
        while (!huffmanTree.root) {
            huffmanTree.executeNextStep();
        }

        // The root should be set, and priority queue and waiting room should be empty
        expect(huffmanTree.root).not.toBeNull();
        expect(huffmanTree.priorityQueue.size()).toBe(0);
        expect(huffmanTree.waitingRoom.length).toBe(0);
    });
});
