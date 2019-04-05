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
};

function generateResponse(){
	if(input.value.length > 0){
		var response = null;
		let gameActive = currentHMGame!==null && currentHMGame!==undefined;
		let gameResp = null;
		if(gameActive) gameResp = getHangmanResponse(input.value);
		if(gameResp!==null){
			response = gameResp;
		}else{
			search = trie.search(input.value);
			response = search.resp;
			let outliers = search.out;
			//Check if hangman should be called to get a response:
			if(equalStr(response, "%hangmanStartEnglish")){
				if(!gameActive){
					currentHMGame = new HangmanGame(E2FDictionary, 0);//Start with English language
					response = getHangmanResponse("%hangmanStart");
				}else{
					response = "We are already playing Hangman!";
				}
			}else if(equalStr(response, "%hangmanStartFrench")){
				if(!gameActive){
					currentHMGame = new HangmanGame(E2FDictionary, 1);//Start with French language
					response = getHangmanResponse("%hangmanStart");
				}else{
					response = "Nous sommes déjà entrain de jouer au pendu!";
				}
			}else if(equalStr(response, "%hangman")){
				if(outliers.length > 0){
					//Find the last minimum length outlier (most likely a letter guess)
					let min = outliers[0].length;
					let minIdx = 0;
					for(let i = 0; i < outliers.length; i++){
						if(outliers[i].length <= min){//<= is used to find the last minimum letter word or character (most likely the guess)
							min = outliers[i].length;
							minIdx = i;
						}
					}
					response = getHangmanResponse(outliers[minIdx].charAt(0)); // Assume that the first outlier from the outliers list is the guessed letter.
				}else{
					response = null;
				}
			}else if(equalStr(response, "%translate")){ //Check if translate should be called to get a response
				
				if(outliers.length > 0){
					let translateStr = "";
					for(let i = 0; i < outliers.length; i++){
						translateStr += (outliers[i] + " ");
					}
					response = translatorTrie.search(translateStr).resp;
					if(response !== null){
						let translatedWord = translatorTrie.search(response).resp;
						response = "'"+translatedWord+"' translates to '"+response+"'.";
					}
				}else{
					response = null;
				}
			}
		}
		let date = new Date();
		document.getElementById("conv").innerHTML+="<div class='yourTime'>"+(date.getHours()%13 + Math.floor(date.getHours()/13)) +":"+date.getMinutes().pad(2)+(date.getHours()<12? " AM":" PM")+" - You</div><div class='yourText'>"+input.value+"</div>";
		if(response !== null) document.getElementById("conv").innerHTML+="<div class='itsTime'>CellBot - "+(date.getHours()%13 + Math.floor(date.getHours()/13)) +":"+date.getMinutes().pad(2)+(date.getHours()<12? " AM":" PM")+"</div><div class='itsText'>"+response+"</div>";
		input.value = "";
		//Scroll to bottom of conversation:
		document.getElementById("conv").lastChild.scrollIntoView();
	}
}

function equalStr(str1, str2){
	if(str1===null || str2===null) return false;
	if(str1.length!=str2.length){
		//console.log("different sizes. Str1:"+str1.length+" Str2:"+str2.length);
		return false;
	}
	for(let i = 0; i < str1.length; i++){
		if(str1.charAt(i) != str2.charAt(i)){
			//console.log("match false at "+i);
			return false;
		}
	}
	return true;
}

input.onkeyup = function(event){
	if(event.keyCode===13){
		generateResponse();
	}
};

submit.onclick = function(){
	generateResponse();
};

//Definephrases for the ChatTrie creation:
var testPhrases = [
	["Hello.","Hi!"],
	["Bonjour.","Salut!"],
	["Olá.","Oi!"],
	["Hi.","Hello!"],
	["Salut.","Bonjour!"],
	["Coucou","Salut!"],
	["Allo","Bonjour"],
	["Oi!","Olá!"],
	["What is your name?","Hmmm, I don't seem to have one... You can call me CellBot"+Math.floor(Math.random()*1000)],
	["Comment tu t’appelles?","Hmmm, je crois que je n’ai pas de nom… Tu peux m’appeler RobotCell"+Math.floor(Math.random()*1000)],
	["Qual o seu nome?","Hmmm, acho que eu não tenho um... Pode me chamar de CellBot"+Math.floor(Math.random()*1000)],
	["Are you a robot?","I hope not!"],
	["Est ce que tu es un robot?","J’espère que non!"],
	["Tu es un robot?","J’espère que non!"],
	["Você é um robô?","Espero que não!"],
	["How are you?","I'm doing well, thank you!"],
	["Est ce que tu vas bien?","Je vais bien, merci!"],
	["Ça va?","Je vais bien, merci!"],
	["Como vai?","Vou bem, obrigado!"],
	["I'm doing well.","That's good to hear!"],
	["Je me sens bien","Ça fait plaisir à entendre"],
	["Estou indo bem.","Que bom saber."],
	["I'm not doing well","I'm sorry to hear that."],
	["Je ne vais pas bien.","Je suis désolé d’entendre ça."],
	["Não estou muito bem","Que pena."],
	["I'm doing badly.","That sucks. Want to talk about it?"],
	["Je vais mal.","Oh non! Tu veux en parler?"],
	["Estou muito mal.","Que chato. Quer conversar sobre algo?"],
	["I'm doing pretty good.","That's nice."],
	["Je vais bien.","Super!"],
	["I'm doing pretty well.","That's nice."],
	["Je vais plutot bien.","Super!"],
	["Life sucks","Life is a roller coaster. It may be low now, but you'll be soaring near the clouds soon!"],
	["La vie est null.","La vie c’est comme des montagnes russes. Tu es peut être tout en pas pour l’instant, mais tu seras bientôt dans les nuages."],
	["A vida é uma merda.","A vida é uma montanha russa. Tem seus altos e baixos, mas sempre vale a pena!"],
	["Are you good at math?","Let me check... pi^2 = "+(Math.PI*Math.PI)+". Yeah I think I'm pretty good!"],
	["Est ce que tu es fort en math?","Laisse moi voir… pi^2 = "+(Math.PI*Math.PI)+". Oui, je crois que je suis plutôt fort"],
	["Você é bom com matemática?","Deixa eu ver... pi^2 = "+(Math.PI*Math.PI)+". Sim, acho que sou bem bom."],
	["Can you see me?","I can't, but the NSA can."],
	["Est que tu peux me voir?","Non, mais la NSA peut"],
	["Consegue me ver?","Não, mas a NSA consegue."],
	["How old are you?","One second older than when you asked me."],
	["Quel âge as tu?","Une seconde de plus que depuis que tu me l’as demandé"],
	["Quantos anos você tem?","Um segundo mais velho de quando você me perguntou!"],
	["Can you help me with my homework?","I don't think so, but I can help you get motivated to learn how to do your homework. You are one of a kind and I love you. You can do it!"],
	["Est ce que tu peux m’aider à faire mes devoirs?","Je crois pas, mais je peux t’aider à trouver la motivation d’apprendre à faire tes devoirs. Tu es unique et je t’aime. Tu peux y arriver!"],
	["Pode me ajudar com meu trabalho?","Acho que não, mas posso te motivar para aprender a fazer seu trabalho. Você é único e eu te amo. Acredite em si mesmo!"],
	["Are you real?","Is this conversation real?"],
	["Est ce que tu es réel?","Est ce que cette conversation est réel?"],
	["Você é de verdade?","Será que essa conversa é de verdade?"],
	["Where are you?","In your computer of course! I promise I won't mess up too many files..."],
	["Où es-tu?","Dans l'ordinateur bien sûr! Je te promets que je ne vais pas mettre de désordre dans trop de tes fichiers…"],
	["Onde você está?","Dentro do seu computador! Prometo que não vou estragar muitos arquivos..."],
	["How many fingers am I holding up?","Zero, you were just typing!"],
	["J’ai combien de doigts levés?","Aucun, tu étais entrain de taper!"],
	["Quantos dedos tenho levantados?","Zero! Você estava digitando!"],
	["Do you have a family?","I'm not sure. Maybe I'm the first?"],
	["Est ce que tu as une famille?","Je ne suis pas sûr. Peut-être que je suis le premier?"],
	["Você tem uma familia?","Não tenho certeza. Talvez sou o primeiro?"],
	["Can we play a game?","Sure! What do you want to play? I know how to play hangman and 20 questions."],
	["On peut faire un jeu?","Bien sûr! Tu veux jouer à quoi? Je connais le pendu"],
	["Podemos jogar um jogo?","Claro! O que quer jogar? Eu sei jogar 'hangman' e '20 perguntas', mas só em inglês."],
	["Do you want to play a game?","That sounds like fun! What should we play? I know how to play hangman and 20 questions."],
	["Est ce que tu veux jouer à un jeux?","Ça peut être drôle! Tu veux jouer à quoi? Je connais le pendu"],
	["Quer jogar um jogo?","Boa ideia! O que quer jogar? Eu sei jogar 'hangman' e '20 perguntas', mas só em inglês."],
	
	["Let's play hangman.","%hangmanStartEnglish"],
	["Jouons au pendu.","%hangmanStartFrench"],
	["Let's play 20 questions.","%20questionsStartEnglish"],
	["Jouons aux devinettes.","%20questionsStartFrench"],
	
	["I’m sad.","Oh no, I’m sorry to hear that."],
	["Je suis triste.","Oh non, je suis désolé d’entendre ça."],
	["Estou triste.","Que pena, sinto muito."],
	["I’m angry.","Don’t be angry, it’s a beautiful day!"],
	["Je suis en colère.","Ne sois pas en colère, c’est une belle journée!"],
	["Estou bravo.","Não precisa ficar bravo, é um lindo dia hoje!"],
	["I’m okay.","That’s good to hear."],
	["I’m tired.","You should get more sleep."],
	["Je suis fatigué.","Tu devrais dormir plus"],
	["Estou cansado.","Deveria dormir um pouco mais."],
	["Who are you?","You can call me CellBot"+Math.floor(Math.random()*1000)],
	["Qui est-tu?","Tu peux m’appeler RoboCell"+Math.floor(Math.random()*1000)],
	["Quem é você?","Pode me chamar de CellBot"+Math.floor(Math.random()*1000)],
	["Where am I?","Right in front of me!"],
	["Où suis-je?","Juste en face de moi!"],
	["Onde estou?","Bem na minha frente!"],
	["What is the meaning of life?","Hmm let me think… 42!"],
	["Quel est le sens de la vie?","Hmm laisse moi réfléchir… 42!"],
	["Qual o significado da vida?","Hmm deixe eu pensar... 42!"],
	["Who is your favourite musician?","None, I don’t have ears."],
	["Quel est ton musicien préféré?","Auncun, je ne peux pas entendre."],
	["Qual seu músico favorito?","Nenhum, não tenho ouvidos."],
	["Who is your favourite artist?","Cloudpainter, he uses computers like me!"],
	["Quel est ton artiste préféré?","Cloudpainter, il utilise des ordinateurs comme moi!"],
	["Qual seu artista favorito?","Cloudpainter, ele usa computadores como eu!"],
	["Can you sing?","Yes, but I only know Nickelback songs."],
	["Est-ce que tu sais chanter?","Oui, mais je connais seulement Nickelback"],
	["Consegue cantar?","Sim, mas infelizmente só músicas do Nickelback."],
	["Can you dance?","No, and neither can you..."],
	["Est-ce que tu sais danser?","Non, et toi non plus…"],
	["Consegue dançar?","Não, mas você tambêm não."],
	["Can you talk?","No. At least not to you."],
	["Est ce que tu peux parler?","Non. Ou du moins pas à toi"],
	["Consegue falar?","Não. Pelo menos não com você."],
	["Who shot first?","Han Solo. Obviously."],
	["Qui as tiré en premier?","Han Solo. Bien sûr."],
	["Quem atirou primeiro?","Han Solo. Obviamente."],
	["Do you know","Well, of course I do."], //default response to any question it doesn’t know
	["Est-ce que tu connais","Bien sûr."],
	["Voçê sabe","Sim, claro que sei."],
	["What is the","I’m not sure. Sorry!"], //default response to any question it doesn’t know
	["Qu’est ce que le","Je ne suis pas sûr. Désolé!"],
	["Qual","Não tenho certeza. Desculpe!"],
	["What is your","Why do you want to know?"], //default response to any question it doesn’t know
	["Quel est ton","Pourquoi est que tu veux que je le sache?"],
	["Qual o seu","Porquê você quer saber?"],
	["When is","I don’t know. Check your watch!"], //default response to any question it doesn’t know
	["Quand est-ce que","Je ne sais pas. Regarde ta montre!"],
	["Quando é","Não sei, cheque seu relógio!"],
	["Can you","Sadly, no."], //default response to any question it doesn’t know
	["Peux-tu","Malheureusement, non."],
	["Você consegue","Infelizemente, não."],
	["How many","Calculating… calculating… I don’t know."],
	["Combien","Calculation… calculation… Je ne sais pas."],
	["Quantos","Calculando... Calculando... Não sei."],
	["Do you have a favourite animal?", "I enjoy pythons as long as they have white spaces on them"],
	["Est-ce que tu as un animal préféré?","J’aime les pythons mais seulement ceux qui sont correctement espacé"],
	["Qual seu animal favorito?","Eu adoro cobras."],
	["Is there a monster under my bed?", "Is that where you put me when you aren’t talking to me? If so then probably."],
	["Y a-t-il un monstre sous mon lit?","C’est là que tu me mets quand tu n’es pas entrain de me parler?"],
	["Tem um monstro debaixo da minha cama?","É lá que me coloca quando não está falando comigo? Se for o caso, provavelmente."],
	["Am I pretty?", "I turned off your webcam a long time ago. Does that answer your question?"],
	["Je suis beau?","J’ai éteins ta webcam il y a longtemp. Est-ce-que ça répond à ta question?"],
	["Sou bonito?","Eu desliguei sua camera faz muito tempo. Responde sua pergunta?"],
	["Do you have a name?","Hmmm, I don't seem to have one... You can call me CellBot"+Math.floor(Math.random()*1000)],
	["Est-ce que tu as un nom?","Hmmm je n’ai pas l’air d’en avoir un… Tu peux m’appeler RoboCell"+Math.floor(Math.random()*1000)],
	["Tem um nome?","Hmmm, não tenho um... Pode me chamar de Cellbot"+Math.floor(Math.random()*1000)],
	["Do you","Do you?"], //default statement
	["Est-ce-que","Est-ce-que?"],
	["Who is","Probably someone cool!"], //default statement
	["Qui est","Probablement quelqu'un de cool!"],
	["Quem é","Provavelmente alguêm muito legal."],
	["Who is your","I’d rather keep that to myself."],
	["Qui est ton?","Je préfèrerai garder ça pour moi."],
	["Quem é seu","Prefiro manter essa informação comigo mesmo."],
	["I hate you"," :’( "],
	["Je te déteste",":’( "],
	["Te odeio."," :’( "],
	["I love you"," <3 "],
	["Je t’aime"," <3 "],
	["Te amo."," <3 "],
	["I like you"," I like you too! :D "],
	["Je t’aime bien","Moi aussi je t’aime bien! :D "],
	["Eu gosto de você.","Eu gosto de você tambêm! :D"],
	["What is software engineering?","Software engineering is a step by step process to design, develop, test, and deploy a software system."],
	["Qu’est-ce-que l'ingénierie informatique?","L'ingénierie informatique c’est une série d'étapes pour concevoir, développer, tester et déployer un logiciel informatique."],
	["What is your favourite","I don’t have a preference."],
	["Quel est ton préféré","Je n’ai pas de préférence."],
	["Qual seu preferido","Não tenho preferência."],
	["What does _ mean?","%translate"],
	["Qu’est-ce-que _ veut dire?","%translate"],
	["translate _ English?","%translate"],
	["traduit _ en Anglais","%translate"],
	["What is _ in English?","%translate"],
	["Qu'est ce que _ en Anglais?","%translate"],
	["How do you say _ in English?","%translate"],
	["Comment dit-ton _ en Anglais?","%translate"],
	["How do you say _ in French?","%translate"],
	["Comment dit-ton _ en Anglais?","%translate"],
	["translate _ French?","%translate"],
	["traduit _ en Français.","%translate"],
	["Can you translate _ in French.","%translate"],
	["Peux-tu traduire _ en Français","%translate"],
	["What is _ in French?","%translate"],
	["Quel est le mot français pour _","%translate"],
	
	["Are there any","%hangman"],
	["Y-a t-il un", "%hangman"],
	["Is there a","%hangman"],
	["Est-ce qu’il y a un","%hangman"],
	["Is there an","%hangman"],
	["I will guess","%hangman"],
	["Je pense","%hangman"],
	["Does it have any","%hangman"],
	["As-t-il un","%hangman"],
	["What languages do you speak?","I speak English and French."],
	["Quelles langues parles-tu?","Je parle Français et Anglais."],

];

var E2FDictionary = [
	["White",				"Blanc"],
	["Brown",				"Marron"],
	["Yellow",			"Jaune"],
	["Pink",				"Rose"],
	["Green",				"Vert"],
	["Black",				"Noir"],
	["Orange",			"Orange"],
	["Red",					"Rouge"],
	["Fly",					"Voler"],
	["Jump",				"Sauter"],
	["Swim",				"Nager"],
	["Run",					"Courir"],
	["Crawl",				"Ramper"],
	["Feather",			"Plume"],
	["Scales",			"Écailles"],
	["Trunk",				"Trompe"],
	["Beak",				"Bec"],
	["Tail",				"Queue"],
	["Horn",				"Corne"],
	["Wool",				"Laine"],
	["Hump",				"Bosse"],
	["Fur",					"Fourrure"],
	["Paws",				"Pattes"],
	["None",				"Aucune"],
	["Two",					"Deux"],
	["Three",				"Trois"],
	["Four",				"Quatre"],
	["Small",				"Petit"],
	["Big",					"Grand"],
	["Long",				"Long"],
	["Short",				"Court"],
	["Primate",			"Primate"],
	["Mammal",			"Mammifère"],
	["Fish",				"Poisson"],
	["Reptile",			"Reptile"],
	["Bird",				"Oiseau"],
	["Amphibians",	"Amphibien"],
	["Bear",				"Ours"],
	["Horse",				"Cheval"],
	["Cat",					"Chat"],
	["Dog",					"Chien"],
	["Penguin",			"Penguin"],
	["Pig",					"Cochon"],
	["Cheetah",			"Guépard"],
	["Kangaroo",		"Kangourou"],
	["Tiger",				"Tigre"],
	["Cow",					"Vache"],
	["Chicken",			"Poulet"],
	["Flamingo",		"Flamant Rose"],
	["Elephant",		"Éléphant"],
	["Wolf",				"Loup"],
	["Hamster",			"Hamster"],
	["Whale",				"Balaine"],
	["Panda",				"Panda"],
	["Frog",				"Grenouille"],
	["Butterfly",		"Papillion"],
	["Lion",				"Lion"],
	["Giraffe",			"Girafe"],
	["Monkey",			"Singe"],
	["Zebra",				"Zèbre"],
	["Savannah",		"Savane"],
	["Ice Floe",		"Banquise"],
	["Jungle",			"Jungle"],
	["Forest",			"Forêt"],
	["Wild",				"Sauvage"],
	["Domesticated","Domestique"],
	["Warm",				"Chaud"],
	["Cold",				"Froid"],
	["Water",				"Eau"],
	["Animals",			"Animaux"],
	["Animal",			"Animal"],
	["Country",			"Pays"]
];

var F2EDictionary = new Array(E2FDictionary.length);
for(let i = 0; i < E2FDictionary.length; i++){
	F2EDictionary[i] = new Array(2);
	F2EDictionary[i][0] = E2FDictionary[i][1];
	F2EDictionary[i][1] = E2FDictionary[i][0];
}
	
//Define ChatTrie:
var trie = new ChatTrie(testPhrases);
//Test if Trie is built:
console.log(trie.toString());
//Define tranlator Trie:
var translatorTrie = new ChatTrie(E2FDictionary.concat(F2EDictionary));