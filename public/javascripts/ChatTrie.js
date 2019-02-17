/*
	Add each word from each question or statement to the trie with a reference number to the question or statement it came from. When querying,
	put each word from the query through the trie and tally the references that it triggers. Keep track of the maximum referenced question and then
	return it's response as the answer.
*/

function ChatTrie(data){
	this.root = new TrieNode(null, null);
	this.resp = data;//The aray of questions/phrases asked by the user and the responses that the bot knows. Passed as an (n*2) array of strings.
	this.ignore = ['~','`','!','@','#','$','%','^','&','*','(',')','_','-','+','=','\\','|','}',']','{','[','?','.','>','<',',','\"','\'',':',';'];
	this.endPunct = ['.','!','?'];
	this.replace = [['è','e'],['é','e'],['ê','e'],['ç','c'],['à','a'],['â','a'],['ô','o'],['ù','u'],['û','u']];
	
	//Returns the length of the matching word or part of a word and the list of what phrase/response tuples that it references
	this.getRelevance = function(word){
		var len = 0;
		var refs = new Array(0);
		let node = this.root;
		for(let c = 0; c < word.length; c++){
			let char = word.charAt(c).toLowerCase();
			let match = false;
			for(let i = 0; i < node.chld.length; i++){
				if(char == node.chld[i].char){
					refs = node.chld[i].refs;//store the current refs
					if(c == word.length-1) refs.concat(refs);//Double the references to increase the correlation since this matches the whole word!
					len = c+1;//store the current match length
					node = node.chld[i];//Advance to the next node
					match = true;
					break;
				}
			}
			if(!match) break;
		}
		return {len:len, refs:refs};//return the highest match length and the refs that are associated
	};
	
	//Uses the this.getRelevance() function to return the response with the highest correlation to the phrase that was inputed
	this.search = function(str){
		var ignore = this.ignore;
		var replace = this.replace;
		var endPunct = this.endPunct;
		let totalResponse = "";
		let sentences = new Array(0);
		let cleanStr = "";
		for(let c = 0; c < str.length; c++){
			if(!ignore.includes(str.charAt(c))){
				let char = str.charAt(c).toLowerCase();
				for(let i = 0; i < replace.length; i++){
					if(replace[i][0]===char) char = replace[i][1]; //replace accented characters for simple searching.
				}
				cleanStr+=char;
			}else if(endPunct.includes(str.charAt(c))){//Check to see if the character is end punctuation
				sentences.push(cleanStr); //Add the sentence to the array of sentences
				cleanStr = ""; //Clear the temp sentence
			}
		}
		if(cleanStr.length > 0) sentences.push(cleanStr);//Push tghe remaining characters (incase the user didn't end with punctuation)
		for(let i = 0; i < sentences.length; i++){
			let words = sentences[i].split(" ");
			let wordRefs = new Array(words.length);//store the references each word had to see if it was individually correlated later
			let count = new Array(this.resp.length);//Array to store the strength of the correlation of the phrase to the bot's known phrases
			let max = 0;//store the max correlation;
			let maxRef = -1;
			for(let w = 0; w < words.length; w++){
				let relv = this.getRelevance(words[w]);
				let refs = relv.refs;
				wordRefs[w] = refs;
				//Only count the correlation of the word if it is longer than one character (this is mainly for hangman)
				if(words[w].length > 1){
					for(let r = 0; r < refs.length; r++){
						if(count[refs[r]] === null || count[refs[r]] === undefined){
							count[refs[r]] = 0;
						}
						count[refs[r]]+=(relv.len*relv.len);//Add the squared length of the match to the correlation count.
						if(count[refs[r]] > max){
							max = count[refs[r]];
							maxRef = refs[r];
						}else if(count[refs[r]] == max && this.resp[maxRef][0].length > this.resp[refs[r]][0].length){
							maxRef = refs[r];//Make the maximum correlation sentence, the one with less words total in the reference sentence
						}
					}
				}
			}
			if(maxRef > -1){
				let response = this.resp[maxRef][1];
				let threshold = (Math.pow(sentences[i].length, 2)+Math.pow(this.resp[maxRef][0].length, 2))/(max+1);
				console.log("correlation: "+(max+1)+", threshold: "+threshold);
				if(max+1 >= threshold){
					if(response.charAt(0) == '%'){
						let outliers = new Array(0);
						for(let i = 0; i < wordRefs.length; i++){
							if(!wordRefs[i].includes(maxRef) || words[i].length==1) outliers.push(words[i]);
						}
						console.log(outliers);
						return{resp:response, out:outliers};
					}else{
						totalResponse += response + (i+1<sentences.length?" ":"");
					}
				}
			}
		}
		if(totalResponse.length!==0) return {resp:totalResponse, out:null};
		return {resp:null, out:null};
	};
	
	//Adds references to the phrase/response tuple on each node that is part of the given word
	this.addWord = function(word, ref){
		let node = this.root;
		for(let c = 0; c < word.length; c++){
			let char = word.charAt(c);
			let match = false;
			for(let i = 0; i < node.chld.length; i++){
				if(char == node.chld[i].char){
					node.chld[i].addRef(ref);//Add the phrase reference to the matching node
					node = node.chld[i];//Advance to the next node
					match = true;
					break;
				}
			}
			if(!match){
				//Create new node with character that did not have a match
				let newNode = new TrieNode(node, char);
				newNode.addRef(ref);
				node.addChild(newNode);
				node = newNode;
			}
			if(c == word.length-1) node.addRef(ref);//Add the reference twice if it is the end of the word (STRONGER CORRELATION!!)
		}
	};
	
	//builds the initial Trie based on the resp array at the top
	this.build = function(){
		for(let r = 0; r < this.resp.length; r++){
			var phrase = this.resp[r][0];
			var ignore = this.ignore;
			var replace = this.replace;
			let cleanPhrase = "";
			for(let c = 0; c < phrase.length; c++){
				if(!ignore.includes(phrase.charAt(c))){
					let char = phrase.charAt(c).toLowerCase();
					for(let i = 0; i < replace.length; i++){
						if(replace[i][0]===char) char = replace[i][1]; //replace accented characters for simple searching.
					}
					cleanPhrase+=char;
				}
			}
			let words = cleanPhrase.split(" ");
			for(let w = 0; w < words.length; w++){
				this.addWord(words[w], r);
			}
		}
	};
	
	this.toString = function(){
		return this.root.toString(0);
	};
	
	this.build();//Build the initial Trie
}

//Defines a TrieNode to be used in the Trie structure
function TrieNode(root, char){
	this.root = root;
	this.char = char;
	this.chld = new Array(0);
	this.refs = new Array(0);
	
	this.addChild = function(chldNode){
		this.chld.push(chldNode);
	};
	
	this.addRef = function(ref){
		this.refs.push(ref);
	};
	
	this.toString = function(level){
		let str = "";
		for(let i = 0; i < level; i++){
			str+="--";
		}
		str+=this.char+" > ";
		for(let r = 0; r < this.refs.length; r++){
			str+=this.refs[r]+" ";
		}
		str+="\n";
		for(let n = 0; n < this.chld.length; n++){
			str+=this.chld[n].toString(level+1);
		}
		return str;
	};
}