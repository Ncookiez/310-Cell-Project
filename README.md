# CELL Project
COSC 310 - Group 24

**Authors:** Everton S. - Trevor R. - Joshua H. - Noah C. - Eloise E.

## Contents

* [About](#About)
* [How To View The Project](#How-To-View-The-Project)
* [How To Host The Project Locally](#How-To-Host-The-Project-Locally)
* [File Structure](#File-Structure)
* [Function Descriptions](#Function-Descriptions)

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
