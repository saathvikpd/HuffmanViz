function displayCharacterDetails(characterList) {
    let container = document.getElementById("character-list");
    for (const character of characterList) {
        let item = document.createElement('li');
        let content = character.symbol + " : " + character.huffmanCode;
        let node = document.createTextNode(content);
        item.appendChild(node);
        container.appendChild(item);
    }
}

function Character(symbol, frequency) {
    this.symbol = symbol;
    this.frequency = frequency;
}

document.getElementById('submit-button').addEventListener('click', handleInputSubmission);

function handleInputSubmission(e) {
    let listContainer = document.getElementById("character-list");
    listContainer.innerHTML = '';
    let input = document.getElementById('input-text').value;

    clearArray(symbolArray);
    clearArray(frequencyArray);
    clearArray(huffmanCodes);
    clearArray(huffmanPriorityQueue);

    for (const char of input.replace(/\s/g, '')) {
        let symbolIndex = symbolArray.indexOf(char);
        if (symbolIndex == -1) {
            symbolArray.push(char);
            frequencyArray.push(1);
        } else {
            frequencyArray[symbolIndex] += 1;
        }
    }
    initializeHuffmanTree();
}

function clearArray(array) {
    while (array.length > 0) {
        array.pop();
    }
}