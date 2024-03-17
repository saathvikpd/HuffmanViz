<script>
    export let userInput;



class HuffmanNode {
        constructor() {
            this.data = '0';
            this.c = '';
            this.left = this.right = null;
            this.x = 0;
            this.y = 0;
        }

        addNode(huffmanQueue, data, freq) {
            let tempNode = new HuffmanNode();
            tempNode.c = data;
            tempNode.data = freq;
            tempNode.left = null;
            tempNode.right = null;
            huffmanQueue.push(tempNode);
        }

        buildTree(huffmanQueue) {
            let root = null;
            huffmanQueue.sort((a, b) => a.data - b.data);

            while (huffmanQueue.length > 1) {
                let x = huffmanQueue[0];
                huffmanQueue.shift();
                let y = huffmanQueue[0];
                huffmanQueue.shift();
                let tempNode = new HuffmanNode();
                tempNode.data = x.data + y.data;
                tempNode.c = '-';
                tempNode.left = x;
                tempNode.right = y;
                root = tempNode;
                huffmanQueue.push(tempNode);
                huffmanQueue.sort((a, b) => a.data - b.data);
            }
            return root;
        }

        printCode(root, depth, codes){        
            getCodes(root, "", codes);
        }


    }
function HuffmanCode(c, freq, code){
    this.c = c;
    this.freq = freq;
    this.code = code;
}

function getCodes(root, s, codes){
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
    while (i<userText.length) {
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


let treeDetails = [];
let codes = [];



function runHuffman() {
    treeDetails = [];
    codes = [];
    let huffmanQueue = [];
    let txt = userInput;
    const huffman = new HuffmanNode();
    let charArray1 =[]
    let charfreq1 = []

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

    for (let i = 0; i < charArray1.length; i++) {
        huffman.addNode(huffmanQueue, charArray1[i], charfreq1[i]);	
    }

    let root = huffman.buildTree(huffmanQueue);
    getCodes(root, "", codes)
    let encoded_txt = generateHuffmanCode(txt, root);
    updateTreeDetails();
    console.log(encoded_txt);
    return encoded_txt;
    

}



function updateTreeDetails() {
        treeDetails = codes.map(code => `${code.c} : ${code.code}`);
    }

    // Call the updateTreeDetails function when userInput changes
    $: {
        updateTreeDetails();
    }

</script>

<style>
    #codes {
        position: absolute;
        top: 30%;
        left: 20%;
        list-style-type: none;
        font-size: 150%;
        padding: 10px;
        border: 3px solid rgb(18, 20, 20);
        border-radius: 5px;
    }
</style>

<textarea bind:value={userInput} rows="4" cols="50"></textarea>

{#if treeDetails.length > 0}
    <ul id="codes">
        {#each treeDetails as detail}
            <li>{detail}</li>
        {/each}
    </ul>
{/if}


<button on:click={runHuffman}>Encode Text</button>





 