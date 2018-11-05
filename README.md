# SousChef
A Google Assistant Skill that aids in every aspect of cooking

[![Build Status](https://travis-ci.org/trevorforrey/SousChef.svg?branch=master)](https://travis-ci.org/trevorforrey/SousChef)

### Running:
Because we utilize google apis and a mongo database with a password behind it, our keys are stored outside of git.
If you'd like to run the server yourself for grading purposes let us know and we can send that information with
instructions on how to set up all environment variables

### Demoing:
To interact with our site you can go to the following:
- [Web App](https://master-heroku-souchef.herokuapp.com/) - Add a user, add a recipe, view cookbook
- [Cooking Assistant (Google Assistant)](https://bot.dialogflow.com/201dfebf-ef6d-4c66-9b85-50e5e4bdc8fc) - Ask for ingredients, steps, cook time, etc.

* First steps to take in demoing the Web App is to say (type) lets get cooking, the app will ask who its talking to and you can type the username "thetoastyone" and it'll ask what you'd like to cook, that user has both "Bread and butter" and "Grilled cheese" recipes in their account.

* On both you can login as the user _thetoastyone_ with the password of _toast_
On the google assistant side, you can choose to cook the recipe _Bread and Butter_ or _Grilled Cheese_ 

* For the website you can use the username and password above, or create your own user under register.  You can upload a recipe, or view your "cookbook" as well.  Sprint 2 was all about functionality, so the design is not great, but thats coming in Sprint 3.

#### References:
JQuery snippet in index.html taken from www.bootsnip.com
Made it easier to toggle between the tabs so we didn't have 
to do a bunch of dom manipulation and unecessary javascript.
Bootsnip is code is opened to be used for anyone.  

Home page image sourced from:
https://www.canva.com/photos/food-drink/MACZiSgDn9A-food-products-rustic-vegetables-meat-cooking/?showAcquireAction=&query=food#
Free to use and no license required
