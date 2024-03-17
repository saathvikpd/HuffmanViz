
function getTreeDetails(codes) {
    let list = document.getElementById("codes");
    list.innerHTML = ''; // Clear the previous list content
    for (let i = 0; i < codes.length; i++) {
        let ele = document.createElement('li');
        let text = codes[i].c + " : " + codes[i].code;
        let task = document.createTextNode(text);
        ele.appendChild(task);
        list.appendChild(ele);
    }
}

function textDetails(c, data) {
    this.c = c;
    this.data = data;
}

document.getElementById('btn').addEventListener('click', submitText);

function submitText(e) {
    let txt = document.getElementById('huff-text').value;

    // Clear arrays and reset tree
    emptyArray(charArray1);
    emptyArray(charfreq1);
    emptyArray(codes);
    emptyArray(huffmanQueue);

    if (new Set(txt).size === 1) {
        alert("Please type more than one unique character");

        return;
    }
    
    // Populate arrays based on user input
    for (let i = 0; i < txt.length; i++) {
        if (txt[i] == " ") continue;
        let n = charArray1.indexOf(txt[i]);
        if (n == -1) {
            charArray1.push(txt[i]);
            charfreq1.push(1);
        } else {
            charfreq1[n] += 1;
        }
    }

    // Clear and update the tree visualization
    let svg = d3.select("#huffman-svg");
    svg.selectAll("*").remove(); // Clear the previous tree content
    setup();
    let huffman1 = new HuffmanNode();
    let huffmanQueue1 = []
    for (let i = 0; i < charArray1.length; i++) {
        huffman1.addNode(huffmanQueue1, charArray1[i], charfreq1[i]);
    }
    let root1 = huffman1.buildTree(huffmanQueue1);

    console.log("Huffman Tree:", root1); // Debugging

    let encodedText = generateHuffmanCode(txt, root1);
    const originalSize = txt.length * 8; // Assuming 1 byte = 8 bits per character
    const encodedSize = encodedText.length; 
    const spaceSavedPercentage = ((originalSize - encodedSize) / originalSize) * 100;

    console.log("Huffman Encoding for input text:", encodedText);
    
   testtxt = "Your text: " + txt +
    "\nHuffman Encoding for input text: " + encodedText +
    "\nSpace Saved: " + spaceSavedPercentage + "%";

    // Animate typing of encoded text
    animateTextTyping(testtxt);
}

function emptyArray(array) {
    array.length = 0;
}

function animateTextTyping(text) {
    const encodedTextElement = d3.select("#encoded-text");
    

    encodedTextElement.selectAll("text").remove(); // Remove any existing text elements

    const textElement = encodedTextElement.append("text")
        .attr("x", 100)
        .attr("y", 100)
        .attr("font-size", "18px")
        .attr("fill", "blue");

    // Split text into lines using '\n'
    const lines = text.split("\n");

    // Append tspans for each line
    lines.forEach((line, index) => {
        textElement.append("tspan")
            .attr("x", 100) // Adjust x position as needed
            .attr("dy", index === 0 ? 0 : "1.2em") // Adjust line spacing as needed
            .text(line);
    });
}