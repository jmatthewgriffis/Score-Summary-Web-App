Here's what you need to know to run this project:

1) It will not work if opened from the file browser; you'll get lots of cross-origin-request errors due to the file protocol. You'll need to run the project on a local server. No configuration is required. I use a generic installation of MAMP for OS X. Simply put the project folder in the server directory (default is 'htdocs' for MAMP), start the server, and open the project folder via localhost in your browser.

2) Speaking of browsers, this was developed entirely in Chrome, so for the love of all that is good, run it in Chrome. I make no promises for other browsers. Safari seemed like it might be OK; Firefox threw all kinds of errors; cross-browser compatibility was not at the top of the list this time. Use Chrome.

3) The project uses the browser's local storage to retain state. Refresh the page all you want, or even close it entirely and open it back up! The data doesn't care! When you first open the project in a fresh browser, it will clear out any existing local storage, so be prepared for that. This is to ensure that the only items in local storage are the ones put there by the project.

4) The console logs many messages, but most of them are hidden by default via the master "debug" variable at the top of app.js. If you like debug messages, set debug to true. This isn't necessary for interaction, they're just some solid debug messages.

5) There are a few bugs still. I squashed as many as I could, but they just keep coming! If you notice one and manage to identify the source, I'd love to hear about it.

Thanks for checking out my project!

-J. Matthew Griffis ("Matt")