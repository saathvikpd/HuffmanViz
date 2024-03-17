export function reingoldTilford(treeNode, siblingSeparation = 1.0, subtreeSeparation = 1.0, levelSeparation = 1.0, xOffset = 0.0, yOffset = 0.0) {
    firstPass(treeNode, siblingSeparation, subtreeSeparation);
    let xAdjustment = secondPass(treeNode, levelSeparation, xOffset, yOffset);
    thirdPass(treeNode, xAdjustment);
}

function firstPass(treeNode, siblingSeparation = 1.0, subtreeSeparation = 1.0) {
    if (treeNode.children.length === 0) return;

    treeNode.children.forEach((child, index) => {
        firstPass(child, siblingSeparation, subtreeSeparation);
        if (index > 0) {
            child.leftSibling = treeNode.children[index - 1];
        }
    });

    // Calculate the shift of the left subtree and log.
    console.log("Calculating shifts in firstPass for node:", treeNode.value);

    let shift = 0;
    for (let i = 1; i < treeNode.children.length; i++) {
        const current = treeNode.children[i];
        const previous = treeNode.children[i - 1];
        shift = Math.max(shift, getSubtreeShift(previous, current, i - 1, i, subtreeSeparation));
    }

    treeNode.children.forEach((child, index) => {
        child.shift += shift * (index / (treeNode.children.length - 1));
        console.log(`Child after shift calculation: ${child.value}, shift: ${child.shift}, index: ${index}`);  // debug log
    });

    if (treeNode.children.length === 1) {
        treeNode.x = treeNode.children[0].x;
    } else {
        const firstChildX = treeNode.children[0].x + treeNode.children[0].shift;
        const lastChildX = treeNode.children[treeNode.children.length - 1].x + treeNode.children[treeNode.children.length - 1].shift;
        treeNode.x = (firstChildX + lastChildX) / 2;
    }
}

function getSubtreeShift(leftSubtree, rightSubtree, leftIdx, rightIdx, subtreeSeparation, leftCumShift = 0, rightCumShift = 0, cumShift = 0, initialRun = true) {
    let newShift = 0;

    if (!initialRun) {
        const xLeft = leftSubtree.x + leftSubtree.shift + leftCumShift;
        const xRight = rightSubtree.x + rightSubtree.shift + rightCumShift + cumShift;
        newShift = Math.max((xLeft + subtreeSeparation - xRight) / (1 - leftIdx / rightIdx), 0);
    }

    if (leftSubtree.children.length > 0 && rightSubtree.children.length > 0) {
        return getSubtreeShift(
            leftSubtree.children[leftSubtree.children.length - 1],
            rightSubtree.children[0],
            leftIdx,
            rightIdx,
            subtreeSeparation,
            leftCumShift + leftSubtree.mod + leftSubtree.shift,
            rightCumShift + rightSubtree.mod + rightSubtree.shift,
            cumShift + newShift,
            false
        );
    }

    return cumShift + newShift;
}

function secondPass(treeNode, levelSeparation = 1.0, xOffset = 0.0, yOffset = 0.0, cumMod = 0.0, depth = 0, xAdjustment = 0.0) {
    // At the beginning to log the starting conditions
    console.log(`Starting secondPass for node: ${treeNode.value}, cumMod: ${cumMod}, depth: ${depth}`);

    const finalX = treeNode.x + treeNode.shift + cumMod + xOffset;
    treeNode.x = finalX;
    treeNode.y = depth * levelSeparation + yOffset;

    let newAdjustment = xAdjustment;
    if (finalX < 0) {
        newAdjustment = Math.max(xAdjustment, -finalX);
    }

    treeNode.children.forEach(child => {
        newAdjustment = Math.max(newAdjustment, secondPass(child, levelSeparation, xOffset, yOffset, cumMod + treeNode.mod + treeNode.shift, depth + 1, newAdjustment));
    });

    // Before returning newAdjustment
    console.log(`Final xAdjustment for node: ${treeNode.value} is ${newAdjustment}`);

    return newAdjustment;
}

function thirdPass(treeNode, xAdjustment) {
    // At the start to log adjustments being applied
    console.log(`Applying xAdjustment in thirdPass for node: ${treeNode.value}, xAdjustment: ${xAdjustment}`);
    treeNode.x += xAdjustment;
    treeNode.children.forEach(child => thirdPass(child, xAdjustment));
}

export class BaseNode {
    constructor(value) {
        this.value = value;
        this.children = [];
        this.x = 0;
        this.y = 0;
        this.shift = 0;
        this.mod = 0;
        // Additional properties for JavaScript implementation
        this.leftSibling = null;
        this.depth = 0; // Will be set during the tree construction or traversal
    }
    
    setAttrs(attrs) {
        Object.keys(attrs).forEach(key => {
            this[key] = attrs[key];
        });
    }

    getAttr(attr, defaultValue = 0) {
        return Object.prototype.hasOwnProperty.call(this, attr) ? this[attr] : defaultValue;
    }
}
// Assume a simple tree structure and function calls to visualize its usage
export class TreeNode extends BaseNode {
    constructor(value) {
        super(value);
    }
}

// // Example usage:
// let rootNode = new TreeNode('root');
// let child1 = new TreeNode('child1');
// let child2 = new TreeNode('child2');
// rootNode.children.push(child1, child2);

// firstPass(rootNode);
// let xAdjustment = secondPass(rootNode);
// thirdPass(rootNode, xAdjustment);

// console.log('Root Node:', rootNode);