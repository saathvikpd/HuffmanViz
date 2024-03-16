export class TreeNode {
    constructor(character, frequency, left = null, right = null) {
        this.character = character;
        this.frequency = frequency;
        this.left = left;
        this.right = right;
        this.isLeaf = !(left || right); // true for leaf, false for internal node
    }
}