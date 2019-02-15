//Define Number.pad() function to add '0' padding to numbers for time formatting
Number.prototype.pad = function(size){
	let str = String(this);
	while(str.length < size) str = "0"+str;
	return str;
};

//Define response functions when text is entered by the user:
var input = document.getElementById("input");
var submit = document.getElementById("submit");

window.onload = function(){
	//Post inital greeting method:
	let date = new Date();
	document.getElementById("conv").innerHTML+="<div class='itsTime'>CellBot - "+(date.getHours()%13 + Math.floor(date.getHours()/13)) +":"+date.getMinutes().pad(2)+(date.getHours()<12? " AM":" PM")+"</div><div class='itsText'>Hello! How are you?<br>Salut! Ça va?</div>";
	//Focus the text input:
	input.focus();
}

function generateResponse(){
	let str = trie.search(input.value);
	let date = new Date();
	document.getElementById("conv").innerHTML+="<div class='yourTime'>"+(date.getHours()%13 + Math.floor(date.getHours()/13)) +":"+date.getMinutes().pad(2)+(date.getHours()<12? " AM":" PM")+" - You</div><div class='yourText'>"+input.value+"</div>";
	if(str !== null) document.getElementById("conv").innerHTML+="<div class='itsTime'>CellBot - "+(date.getHours()%13 + Math.floor(date.getHours()/13)) +":"+date.getMinutes().pad(2)+(date.getHours()<12? " AM":" PM")+"</div><div class='itsText'>"+str+"</div>";
	input.value = "";
	//Scroll to bottom of conversation:
	document.getElementById("conv").lastChild.scrollIntoView();
}

input.onkeyup = function(event){
	if(event.keyCode===13){
		generateResponse();
	}
};

submit.onclick = function(){
	generateResponse();
}

//Definephrases for the ChatTrie creation:
var testPhrases = [
	["Hello.","Hi!"],
	["Bonjour.","Salut!"],
	["Hi.","Hello!"],
	["Salut.","Bonjour!"],
	["Coucou","Salut!"],
	["Allo","Bonjour"],
	["What is your name?","Hmmm, I don't seem to have one... You can call me CellBot"+Math.floor(Math.random()*1000)],
	["Comment tu t’appelles?","Hmmm, je crois que je n’ai pas de nom… Tu peux m’appeler RobotCell"+Math.floor(Math.random()*1000)],
	["Are you a robot?","I hope not!"],
	["Est ce que tu es un robot?","J’espère que non!"],
	["Tu es un robot?","J’espère que non!"],
	["How are you?","I'm doing well, thank you!"],
	["Est ce que tu vas bien?","Je vais bien, merci!"],
	["Ça va?","Je vais bien, merci!"],
	["I'm doing well.","That's good to hear!"],
	["Je me sens bien","Ça fait plaisir à entendre"],
	["I'm not doing well","I'm sorry to hear that."],
	["Je ne vais pas bien.","Je suis désolé d’entendre ça."],
	["I'm doing badly.","That sucks. Want to talk about it?"],
	["Je vais mal.","Oh non! Tu veux en parler?"],
	["I'm doing pretty good.","That's nice."],
	["Je vais bien.","Super!"],
	["I'm doing pretty well.","That's nice."],
	["Je vais plutot bien.","Super!"],
	["Life sucks","Life is a roller coaster. It may be low now, but you'll be soaring near the clouds soon!"],
	["La vie est null.","La vie c’est comme des montagnes russes. Tu es peut être tout en pas pour l’instant, mais tu seras bientôt dans les nuages."],
	["Are you good at math?","Let me check... pi^2 = "+(Math.PI*Math.PI)+". Yeah I think I'm pretty good!"],
	["Est ce que tu es fort en math?","Laisse moi voir… pi^2 = "+(Math.PI*Math.PI)+". Oui, je crois que je suis plutôt fort"],
	["Can you see me?","I can't, but the NSA can."],
	["Est que tu peux me voir?","Non, mais la NSA peut"],
	["How old are you?","One second older than when you asked me."],
	["Quel âge as tu?","Une seconde de plus que depuis que tu me l’as demandé"],
	["Can you help me with my homework?","I don't think so, but I can help you get motivated to learn how to do your homework. You are one of a kind and I love you. You can do it!"],
	["Est ce que tu peux m’aider à faire mes devoirs?","Je crois pas, mais je peux t’aider à trouver la motivation d’apprendre à faire tes devoirs. Tu es unique et je t’aime. Tu peux y arriver!"],
	["Are you real?","Is this conversation real?"],
	["Est ce que tu es réel?","Est ce que cette conversation est réel?"],
	["Where are you?","In your computer of course! I promise I won't mess up too many files..."],
	["Où es-tu?","Dans l'ordinateur bien sûr! Je te promets que je ne vais pas mettre de désordre dans trop de tes fichiers…"],
	["How many fingers am I holding up?","Zero, you were just typing!"],
	["J’ai combien de doigts levés?","Aucun, tu étais entrain de taper!"],
	["Do you have a family?","I'm not sure. Maybe I'm the first?"],
	["Est ce que tu as une famille?","Je ne suis pas sûr. Peut-être que je suis le premier?"],
	["Can we play a game?","Sure! What do you want to play? I know how to play hangman and 20 questions."],
	["On peut faire un jeu?","Bien sûr! Tu veux jouer à quoi? Je connais le pendu"],
	["Do you want to play a game?","That sounds like fun! What should we play? I know how to play hangman and 20 questions."],
	["Est ce que tu veux jouer à un jeux?","Ça peut être drôle! Tu veux jouer à quoi? Je connais le pendu"],
	
	
	["Let's play hangman.","%hangman"],
	["Jouons au pendu.","%hangman"],
	["Let's play 20 questions.","%20questions"],
	["Jouons aux devinettes.","%20questions"],
	
	//Adding separately so not to mix together with translated work
	["I’m sad.","Oh no, I’m sorry to hear that."],
	["I’m angry.","Don’t be angry, it’s a beautiful day!"],
	["I’m okay.","That’s good to hear."],
	["I’m tired.","You should get more sleep."],
	["Who are you?","You can call me CellBot"+Math.floor(Math.random()*1000)],
	["Where am I?","Right in front of me!"],
	["What is the meaning of life?","Hmm let me think… 42!"],
	["Who is your favourite musician?","None, I don’t have ears."],
	["Who is your favourite artist?","Cloudpainter, he uses computers like me!"],
	["Can you sing?","Yes, but I only know Nickelback songs."],
	["Can you dance?","No, and neither can you..."],
	["Can you talk?","No. At least not to you."],
	["Who shot first?","Han Solo. Obviously."],
	["Do you know","Well, of course I do."], //default response to any question it doesn’t know
	["What is the","I’m not sure. Sorry!"], //default response to any question it doesn’t know
	["What is your","Why do you want to know?"], //default response to any question it doesn’t know
	["When is","I don’t know. Check your watch!"], //default response to any question it doesn’t know
	["Can you","Sadly, no."], //default response to any question it doesn’t know
	["How many","Calculating… calculating… I don’t know."],
	["Do you have a favorite animal?", "I enjoy pythons as long as they have white spaces on them"],
	["Is there a monster under my bed?", "Is that where you put me when you aren’t talking to me? If so then probably."],
	["Am I pretty?", "I turned off your webcam a long time ago. Does that answer your question?"],

];
	
//Define ChatTrie:
var trie = new ChatTrie(testPhrases);
//Test if Trie is built:
console.log(trie.toString());