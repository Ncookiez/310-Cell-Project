
var currentVoice = 'f';
var voiceBtn;

// Loads the function for the voice toggle button
function loadVoice(){
	voiceBtn = document.getElementById("toggleVoice");
	
	voiceBtn.onclick = function(){
		var voiceScript = document.getElementById("voices");
		var voiceRec = document.getElementById("voiceRec");
	
		if(currentVoice == 'f'){
			currentVoice = 'e';
			voiceBtn.value = "English";
			let voice = "UK English Female";
			let say = "English";
			responsiveVoice.speak(say, voice);
			//Change the recognition language
			setRecLang('en-US');
		}else if(currentVoice === null){
			currentVoice = 'f';
			voiceBtn.value = "Français";
			let voice = "French Female";
			let say = "Français";
			responsiveVoice.speak(say, voice);
			//Change the recognition language
			setRecLang('fr');
			//Un-hide the voice rec btn
			voiceRec.style="display:inline;";
		}else if(currentVoice == 'e'){
			currentVoice = null;
			voiceBtn.value = "None";
			//hid the voice rec btn
			voiceRec.style="display:none;";
		}
	};
}

// Function used to make the bot speak any phrase in its currently set language
function speak(phrase){
	splitPhrase = phrase.split('<br>');
	phrase = splitPhrase[0];
	if(currentVoice == 'f'){
		let voice = "French Female";
		responsiveVoice.speak(phrase, voice);
	}else if(currentVoice == 'e'){
		let voice = "UK English Female";
		responsiveVoice.speak(phrase, voice);
	}
}