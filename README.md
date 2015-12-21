#Score Summary
**[LIVE VERSION HERE](http://jmatthewgriffis.com/projects/score-summary)**

"Score Summary," for lack of a catchier name, is a simple one-page Web application I wrote to practice the **[model-view-controller (MVC) software architectural pattern](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller)**, using **[AngularJS](https://angularjs.org/)** and HTML5 local storage--the latter of which was completely new to me (and is very cool!).

##PLEASE NOTE
Before running this via the link above or locally (see below for instructions), here are some things to keep in mind:

* As will be described at greater length below, the project uses the browser's local storage to retain state. Refresh the page all you want, or even close it entirely and open it back up! The data doesn't/don't care! When you first open the project in a fresh browser, it will clear out any existing local storage, so be prepared for that. This is to ensure that the only items in local storage are the ones put there by the project. (Maybe local storage is page-specific, so this concern is irrelevant; I doubt it, but I don't yet know for sure.)

* This was developed entirely in **[Chrome](https://www.google.com/chrome/)**, so for the love of all that is good, run it in Chrome. I make no promises for other browsers. **[Safari](https://www.apple.com/safari/)** seemed like it might be OK; **[Firefox](https://www.mozilla.org/en-US/firefox/new/)** threw all kinds of errors; cross-browser compatibility is hopefully in the works at some point, but right now? Use Chrome.

* There are a few bugs still. I squashed as many as I could, but they just keep coming! If you notice one and manage to identify the source, I'd love to hear about it.

##So What's the Story?
The "narrative" purpose of the app is to be a browser tool a teacher might use to enter data (and see a summary) concerning students' performance on a test. Performance-based pay ain't no joke!

##What's the Functionality?
Functionally the app would allow for performing **[CRUD operations](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete)** and synopsis on a list of student names and test scores. Specifically the teacher should be able to:
* add new entries of name + score
* click any existing entry to edit it in-line
* press ENTER or click away from the input field to submit changes
* see that invalid input (e.g. letters instead of a numerical score) is not valid and cannot be submitted (input is validated)
* see the summary automatically update upon submission of changes
* see an automatic highlight of any failing grade(s), based on a threshold of 64 or lower
* close the app and return to it later, with all data and changes intact (state is preserved)

##Development History
The foundation of the app is...another app, specifically the one I built while working through the free introductory course "**[Shaping up with Angular.js](https://www.codeschool.com/courses/shaping-up-with-angular-js)**" by **[Code School](https://www.codeschool.com/)** (solid course! I recommend it). This gave me the basic one-page Angular setup, which I then proceeded to modify beyond recognition to adapt it to this new project's needs.

I decided early on to explore local storage in the browser via HTML5 as a way to preserve state, so I wouldn't have to go to the trouble of setting up a database (complete overkill for something this simple). All that would be needed was to store name + value (score) pairs. I'd never used HTML5 local storage before; fortunately it was pretty easy to learn and simple to employ (thanks as always to the generous wealth of helpful online resources).

In the course of building this I got into the swing of things and added some non-spec features, such as a button for clearing local storage and restarting the session afresh, and another for changing the criteron by which the list of names + scores is sorted.

As I mentioned, I hadn't used Angular much previously, and local storage not at all, and some of the intended functionality was new too, so development was a learning experience to put it mildly, and (mostly) a lot of fun. I had to solve many thorny problems, any one of which might make an interesting blog post (or not; who knows). No doubt as a consequence, the app still has some bugs, which I'm working to address; hopefully I can delete this sentence soon.

##How to Set This Up and Run It

If you want to download and run the project locally, here's what you need to know:

* It will not work if opened from the file browser; you'll get lots of cross-origin-request errors due to the file protocol. You'll need to run the project on a local server. No configuration is required. I use a generic installation of **[MAMP](https://www.mamp.info/en/)** for OS X. Simply put the project folder in the server directory (default is 'htdocs' for MAMP), start the server, and open the project folder via localhost in your browser.

* The console logs many messages, but most of them are hidden by default via the master "debug" variable at the top of app.js. If you like debug messages, set debug to true. This isn't necessary for interaction, they're just some solid debug messages.

* The project uses one or more libraries/frameworks/stylesheets from outside sources (e.g. er, Angular). They are set up to load via CDN first, with a local fallback. The local copies are not included in this repo though, so if you want the fallbacks available, you'll need to download the sources from their respective Web sites, and put them inside the "import" sub-directory in the js/css/whatever directory. Obviously you'll also need to ensure that the file name matches what's in the tag in the HTML file. You know the drill!

Thanks for checking out my project!

-J. Matthew 'Matt' Griffis
**[jmatthewgriffis.com](http://jmatthewgriffis.com/)**