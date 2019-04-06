## All recent changes are by Joshua Henderson
# CELL Project
COSC 310 - Group 24

**Authors:** Everton S. - Trevor R. - Joshua H. - Noah C. - Eloise E.

## Contents

* [About](#About)
* [How To View The Project](#How-To-View-The-Project)
* [How To Host The Project Locally](#How-To-Host-The-Project-Locally)
* [File Structure](#File-Structure)
* [Function Descriptions](#Function-Descriptions)
* [Assignment 3](#Assignment-3)

## About

The **Conversational Environment for Learning Languages**, or **CELL** for short, is a chatbot that allows the user to converse and play different games in different languages. All features take place in a seamless and natural conversation that can be viewed on a desktop, laptop or mobile device.

## How To View The Project

The CELL Project is currently being hosted online, and can be viewed and utilized [here](https://mighty-inlet-33381.herokuapp.com/).

## How To Host The Project Locally

Since CELL works off the Node.js framework, it can be easily hosted locally on your computer if you wish to do so.

**Step 1:** Download the CELL Project

This can be done in a variety of ways. You could simply download all the files, use Git to clone the respository directly, or even clone it to some IDE. The project even has a .PROJECT file, so it should be recognized by Eclipse (no IDE is necessary though).

**Step 2:** Download & Install Node.js & NPM

You can do so by downloading the Windows or Mac version [here](https://nodejs.org/en/download/). Node.js and NPM come bundled together, so it's one simple download. Run the file downloaded in order to install it.

**Step 3:** Install Nodemon

With your command prompt or terminal, navigate to wherever your CELL project is located. You should be able to see all the files as they are shown in this repository. Use the following command to install Nodemon:

```
npm install -g nodemon
```

**Step 4:** Run Nodemon

Now that everything is setup, with your command prompt still in your CELL directory, use the following command to start your locally hosted version of CELL:

```
nodemon start
```

With that, the CELL project will be running solely for your machine on your local address:

```
127.0.0.1:3000
```

## File Structure

* **Views** - Includes all HTML files; the pages available on our site.
* **Public > Stylesheets** - Includes all CSS files; the customization of our page's looks.
* **Public > Javascripts** - Includes all JavaScript files; the functionality of our pages and bot.

In **views**, we have 'index.ejs' that holds the homepage of our website, and the base for the bot to go on. We also have 'error.ejs' that loads in case the user enters a wrong url within our website.

In **Public > Stylesheets**, we have 'style.css' which contains all the custom CSS we have used within our pages. We are also using Bootstrap CSS, with anything on our custom CSS file overriding it.

In **Public > Javascripts**, we have 'ChatBot.js' which includes all the main functionality and decision making of the CELL bot. We also have 'ChatTrie.js' which includes the Trie structure in which all predicted inputs and outputs are stored (more details on this structure can be found in the function descriptions section). Finally, 'Hangman.js' includes the functionality in order to allow the bot to play a game of hangman with the user.

## Function Descriptions

* **ChatTrie.js**
  * chatTrie(data) - This function takes the user data entered into the chatbot and checks it for similarities in the trie data structure. Each word from each question/statement is checked by searching through the trie for a matching relevance for each word, the relevance is measured through by a number value. The maximum value question is kept track of and once the search is done the relevant answer is returned to the chatbot as a response to the user question.
    * getRelevance(word) - The function takes each word from the user response and returns the length of the matching word and the array of references to the phrases/responses associated to that word. This function also works with partial matches for words as well.
    * search(str) - This function takes the users full response and searches the trie to determine the match with the greatest correlation by using the getRelevance() function. The returned value is the response with the highest correlation value that meets the treshold requirement when compared to the users response.
    * addWord(word, ref) - This function takes a word when building the trie and adds a reference to it on each node that it is a part of. If there is no match then a new node is created for the trie.
    * build() - The function that builds the initial trie from an existing array of questions/phrases asked by the user with correlating responses that the bot knows. The function will also replace words with accents on them to make it easier to work with later on.
  * trieNode() - This creates a new node in the trie.

* **ChatBot.js**
  * onload() - Contains some actions to complete when the page first loads. This includes getting the current time, posting an initial message from the bot to the user, and placing the user's cursor on the text input automatically.
  * generateResponse() - This is the main function to acquire an appropriate response from the bot. It searches the trie structure in order to do so. This method also checks if the acquired response is a command to start a game or initialize a translation.
  * equalStr(str1, str2) - Checks if a string is the same as another. Checks for null strings and then for equal length for optimization purposes.

* **Hangman.js**
  * hangmanGame(dictionary, speakLang) - This function contains the main functionality of the hangman game. It collects all required variables for a game to begin and contains the following four functions:
    * guessLetter(char) - Keeps track of guesses as well as if the letter guessed by the user is correct or wrong. It also has statetements in case the user runs out of guesses or successfully finishes the game.
    * getCurrent() - Returns the word to the user with un-guessed letters hidden. This is so that the user can keep track of what they have guessed correctly, the length of the word, and so on.
    * getInitialStatement() - Contains the initial statement once a game of hangman is started.
    * getGuessFromString(str) - This functions extracts the letter guessed by the user from their input.
  * getHangmanResponse(str) - This function makes use of the functions above in order to start the game, and calls the appropriate functions throughout the game.
  
## Assignment 3 
  
**Implemented Features**
   * I implemented an additional topic for the user to communicate to the chatbot with. The topic that I chose was music, the chatbot is able to respond to the users statements about favorite songs or bands and an instrument that the user may play. The chatbot can also answer simple music theory related questions (eg. What is a time signature?) to continue with the idea that we designed our chatbot to be a program that could help a user learn another language, in this case it is musical language. 
   * The functionality is obviously limited due to the fact that it would be difficult for the system to interpret actual sheet music or musical notes, but given enough time the system could be provided with more functionality to potentially allow this. These improvements are only available in English right now, there was not enough time to translate The statements to another language. 
   
**Feature Descriptions**
  * GUI - the graphical user interface designed for our system provides a colorful and enjoyable experience to match the light-hearted nature of our chatbot. The GUI allows users to view all previous messages sent and responses from the chatbot as well. **This feature was implemented in A2**
  * Additional Responses - In the list of understood sentences for the trie data structure there are certain responses that are considered default responses that will be used if the chatbot doesn't understand the users input. The default responses have a similar opening structure to most commonly phrased questions but are not specific to any particular question. This means that for most question formats our chatbot will have a response that fits the asked question but may not answer the specific question. **This feature was implemented in A2**
  * Spell Check - The way the trie data structure works allows for simple spelling errors, what this means is that because the trie structure looks for the strongest correlation of words possible it can handle words with slight errors as the correlation will still be moderately high. **This feature was implemented in A2**

**Examples of Features**

* **Spell Check**

  ![](https://github.com/Ncookiez/310-Cell-Project/blob/JH/public/images/Spellcheck_Image.png?raw=true)
  
* **Additional Responses**

  ![](https://github.com/Ncookiez/310-Cell-Project/blob/JH/public/images/Additional_Responses_Image.png?raw=true)
  
**DFD Level 0**

![](https://github.com/Ncookiez/310-Cell-Project/blob/JH/public/images/DFD_Level_0.png?raw=true)

**DFD Level 1**

![](https://github.com/Ncookiez/310-Cell-Project/blob/JH/public/images/DFD_Level_1.png?raw=true)
  
**Sample Output**

![](https://github.com/Ncookiez/310-Cell-Project/blob/JH/public/images/Output_1.png?raw=true)

![](https://github.com/Ncookiez/310-Cell-Project/blob/JH/public/images/Output_2.png?raw=true)

![](https://github.com/Ncookiez/310-Cell-Project/blob/JH/public/images/Output_3.png?raw=true)

**System Limitations**

* **No Correlation**
  Our chatbot was designed to handle almost any kind of input given by the user, however, there are instances where the chatbot will output no response. This is because the trie looks to see what parts of the users input most correlate to parts of the statements in the trie structure. We have designed our system to have simple statements with standard question style openers ("Do you know", "Can you", etc) where if the beginning correlates but not the ending then it will send a response back that will give a non-direct response if the full question is not known. We could not take into account every input from the user so certain phrases will return no response because the trie cannot find any correlation to any part of the sentence.

* **Example**
  
  ![](https://github.com/Ncookiez/310-Cell-Project/blob/JH/public/images/Incorrect_Output_1.png?raw=true)
  
* **Incorrect Correlation**
  As stated before our system is correlation based, this can pose potential problems when a user enters two strings that are the same but may have slightly different syntax to them. This means that the system can output two different reponses to statements that are similar in content but possibly use different words or incorrect grammar. Therefore the system is only as accurate as the sentences that are created for it. 
  
* **Example**

  ![](https://github.com/Ncookiez/310-Cell-Project/blob/JH/public/images/Incorrect_Output_2.png?raw=true)
  
**Exportable Features**
  * Data Structure - The best part about our chatbot is the trie data structure, it is extremely versitle and efficient for the uses of this project. The trie does suffer from time complexity issues when attempting to remove information from the trie but that is not our concern with this project.
  * Hangman game - While the hangman game is only really compatable with the data structure the core functionality is still available for use in this case. 
