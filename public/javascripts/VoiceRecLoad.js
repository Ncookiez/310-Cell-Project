
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

//Define the variables needed
var words, grammar, recognition, speechRecognitionList;

function loadVoiceRec(){
	var isChrome = !!window.chrome;
	if(!isChrome){
		alert("Voice Recognition will not work properly on browsers other than Chrome.");
	}
	//Create the recognition object
	recognition = new SpeechRecognition();
	speechRecognitionList = new SpeechGrammarList();
	
	recognition.continuous = false;
	recognition.lang = 'fr';
	recognition.interimResults = false;
	recognition.maxAlternatives = 1;
	
	recognition.onresult = function(event) {
		phrase = "";
		for(let i = 0; i < event.results.length; i++){
			phrase+=event.results[i][0].transcript;
		}
		input.value = phrase;
		generateResponse();
		//Change the color of the button back to black
		document.getElementById("voiceRec").style = "color: black;";
	};
}

// Changes the language of recognition
function setRecLang(lang){
	recognition.lang = lang;
}

function resetVoiceRec(){
	setTimeout(function(){document.getElementById("voiceRec").style = "color: black;";}, 5000);
}