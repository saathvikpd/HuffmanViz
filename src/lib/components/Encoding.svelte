<script>
    import { select } from 'd3-selection'; 
    export let userInput;
    
    let isTreeConstructionComplete;

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
    function updateProgress(value) {
        // Select the progress bar and update its width
        select('.progress').transition().duration(500).attr('width', value + '%');
    }

    let treeDetails = [];
    let codes = [];
    let encoded_txt = [];

    let percentage_bar = 0;
    export function runHuffman() {
        treeDetails = [];
        codes = [];
        let huffmanQueue = [];
        let txt = userInput;
        const huffman = new HuffmanNode();
        let charArray1 =[];
        let charfreq1 = [];

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
        getCodes(root, "", codes);
        encoded_txt = generateHuffmanCode(txt, root);

        // Calculate percentage progress
        let txt_space = txt.length * 8;
        let encoded_space = encoded_txt.length;
        percentage_bar = ((txt_space - encoded_space) / txt_space) * 100;
        updateProgress(percentage_bar);
        updateTreeDetails();
        console.log(percentage_bar);
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

    .progress-bar {
        position: relative;
        top: 50%;
        left: 10%;
        width: 50%;
        height: 30px;
        background-color: #f0f0f0;
        border-radius: 5px;
    }

    .progress {
        height: 100%;
        background-color: #007bff;
        border-radius: 5px;
    }

    .percentage {
        dominant-baseline: middle;
        text-anchor: middle;
        font-size: 14px;
        color: rgb(184, 145, 145); /* Set text color to white */
        font-weight: bold; /* Set font weight to bold */
    }
</style>
{#if isTreeConstructionComplete}


<div class="progress-bar">
    <svg class="progress" width="0%" height="100%">
     
      <!-- Bind text content to the percentage_bar variable -->
      <text class="percentage" x="50%" y="50%">{percentage_bar.toFixed(2)}% of original file saved</text>
    </svg>
</div>
<!-- <textarea bind:value={userInput} rows="4" cols="50"></textarea> -->

<!-- Prints out Huffman encoding -->
    <div>
        <p>Encoded Text:</p>
        <textarea readonly rows="4" cols="50">{encoded_txt}</textarea>
    </div>

    <!-- Prints out legend -->
    {#if treeDetails.length > 0}
        <ul id="codes">
            {#each treeDetails as detail}
                <li>{detail}</li>
            {/each}
        </ul>
    {/if}

    {runHuffman}
{/if}

<!-- <button on:click={runHuffman}>Encode Text</button> -->



