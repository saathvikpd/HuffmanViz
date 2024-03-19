export class TreeNode {
    static idCounter = 0;

    constructor(character, frequency, left = null, right = null, parent = null) {
        this.id = character ? character : 'i'+TreeNode.idCounter++;
        this.code = '';
        this.character = character;
        this.frequency = frequency;
        this.left = left;
        this.right = right;
        this.parent = parent; // Add a parent property
        this.isLeaf = !(left || right); // true for leaf, false for internal node

        // Automatically set this node as the parent of its children
        if (this.left) {
            this.left.parent = this;
        }
        if (this.right) {
            this.right.parent = this;
        }
    }
}
