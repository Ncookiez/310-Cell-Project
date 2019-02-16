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

The CELL Project is currently being hosted online, and can be viewed and utilized [here](#). <INSERT LINK>

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

* TODO
