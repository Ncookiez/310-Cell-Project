/*
Hangman.js handles all string checks and responses for the bot when hangman is being played.
The HangmanGame Object stores all of the game data in a single object for easy cleaning.
*/

var currentGame = null;

function HangmanGame(){
	this.words = [""];
	this.selectedWord = this.words[Math.floor(Math.random()*this.words.length)];
	this.tries = 6;//6 tries = 1 head, 1 body, 2 legs, 2 arms
	this.guessedLetters = new Array(0);
	
	this.guessLetter = function(char){
		//TODO: check if letter has already been guessed. If not, then add the letter to the guessedLetters array.
		
		return false;//returns false if already guessed.
	}
	
	this.getCurrent = function(){
		//TODO: returns the selected word with spaces in place of un-guessed letters. Example: "f_ck th_s sh_t".
		
		return null;
	}
}

function getHangmanResponse(str){
	if(currentGame == null) currentGame = new hangmanGame();
	
	return "This isn't implemented yet.";
}