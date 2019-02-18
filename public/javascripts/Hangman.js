/*
Hangman.js handles all string checks and responses for the bot when hangman is being played.
The HangmanGame Object stores all of the game data in a single object for easy cleaning.
*/

//Variable to see if there is an active game
var currentHMGame = null;

function HangmanGame(dictionary, speakLang){
	this.speakLang = speakLang;
	this.words = dictionary;
	this.lang = Math.floor(Math.random()*2);
	this.selectedWord = this.words[Math.floor(Math.random()*this.words.length)][this.lang];
	this.guessedLetters = new Array(0);
	this.tries = 6;//6 tries = 1 head, 1 body, 2 legs, 2 arms
	this.replace = [['è','e'],['é','e'],['ê','e'],['ç','c'],['à','a'],['â','a'],['ô','o'],['ù','u'],['û','u']];
	this.endGame = false;
	
	this.guessLetter = function(char){
		//TODO: check if letter has already been guessed. If not, then add the letter to the guessedLetters array.
		char = char.toLowerCase();
		for(let i = 0; i < this.replace.length; i++){
			if(this.replace[i][0]===char) char = this.replace[i][1]; //replace accented characters for simple searching.
		}
		if(char.charAt(0) >= 'a' && char <= 'z'){
			if(this.guessedLetters.includes(char)){
				if(this.speakLang === 0) return "You have already guessed '"+char+"'. You have " + this.tries + " tries left.<br>" + this.getCurrent().str;
				else return "Tu as déjà essayé la lettre'"+char+"'. Il te reste " + this.tries + "chances.<br>" + this.getCurrent().str;
			}else{
				this.guessedLetters.push(char);
				let current = this.getCurrent();
				if(current.charLeft === 0){
					this.endGame = true;
					if(this.speakLang === 0) return "Congratulations! You got it!<br>" + current.str;
					else return "Félicitation! Tu as trouver le bon mot!<br>" + current.str;
				}
				for(let i = 0; i < this.selectedWord.length; i++){
					let c = this.selectedWord.charAt(i).toLowerCase();
					for(let i = 0; i < this.replace.length; i++){
						if(this.replace[i][0]===c) c = this.replace[i][1]; //replace accented characters for simple searching.
					}
					if(c == char){
						if(this.speakLang === 0) return "Good job! You have " + this.tries + " tries left.<br>" + current.str;
						else return "Bien joué! Il te reste " + this.tries + " chances.<br>" + current.str;
					}
				}
				this.tries--;
				if(this.tries === 0){
					this.endGame = true;
					if(this.speakLang === 0) return "You have no more tries. The word was '"+this.selectedWord+"'.";
					else return "Tu as utilisé toutes tes chances. Le mot était '"+this.selectedWord+"'.";
				}
				if(this.speakLang === 0) return "There are no "+char+"\'s. You have " + this.tries + " tries left.<br>" + this.getCurrent().str;
				else return "Il n’y a pas de "+char+"\'s. Il te reste " + this.tries + " chances.<br>" + this.getCurrent().str;
			}
		}
		return null; //Something went wrong...
	};
	
	this.getCurrent = function(){
		//TODO: returns the selected word with spaces in place of un-guessed letters. Example: "f_ck th_s sh_t".
		var str = "";
		var charLeft = 0;
		for(let i = 0; i < this.selectedWord.length; i++){
			let char = this.selectedWord.charAt(i).toLowerCase();
			for(let i = 0; i < this.replace.length; i++){
				if(this.replace[i][0]===char) char = this.replace[i][1]; //replace accented characters for simple searching.
			}
			if(char==' ' || this.guessedLetters.includes(char)){
				str+=this.selectedWord.charAt(i);//use original character with accents
			}else{
				str+='_ ';
				charLeft++;
			}
		}
		return {str:str, charLeft:charLeft};
	};
	
	this.getInitialStatement = function(){
		if(this.speakLang === 0) return "Ok, Let's play hangman! I'm thinking of " + (this.lang===0?"an English":"a French") + " word. You have " + this.tries + " tries left.<br>" + this.getCurrent().str + "<br>Guess a letter!";
		else return "Ok, jouons au pendu! Je pense à mot "+ (this.lang===0?"Anglais":"Français")+". Il te reste " + this.tries + " chances.<br>" + this.getCurrent().str + "<br>Choisi une lettre!";
	};
	
	this.getGuessFromString = function(str){
		str = str.toLowerCase();
		cleanStr = "";
		for(let i = 0; i < str.length; i++){
			let char = str.charAt(i);
			if(char >= 'a' && char <= 'z') cleanStr+=char;
		}
		if(cleanStr.length == 1) return cleanStr.charAt(0);
		return null;
	};
}

function getHangmanResponse(str){
	if(equalStr(str.toString(),"%hangmanStart")) return currentHMGame.getInitialStatement();
	else if(currentHMGame !== null && currentHMGame !== undefined){
		let guess = currentHMGame.getGuessFromString(str);
		if(guess !== null){
			let response = currentHMGame.guessLetter(guess);
			if(currentHMGame.endGame === true) currentHMGame = null;
			return response;
		}else{
			return null;
		}
	}
	return null;
}