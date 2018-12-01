# SousChef
A Google Assistant Skill that aids in every aspect of cooking

[![Build Status](https://travis-ci.org/trevorforrey/SousChef.svg?branch=master)](https://travis-ci.org/trevorforrey/SousChef)

* First steps to take in demoing the Web App is to say (type) lets get cooking, the app will ask who its talking to and you can type the username "thetoastyone" and it'll ask what you'd like to cook, that user has both "Bread and butter" and "Grilled cheese" recipes in their account.

* On both you can login as the user _thetoastyone_ with the password of _toast_
On the google assistant side, you can choose to cook the recipe _Bread and Butter_ or _Grilled Cheese_ 

* For the website you can use the username and password above, or create your own user under register.  You can upload a recipe, or view your "cookbook" as well.  Sprint 3 was mainly about the Website, making the design more astecically pleasing and allowing the user CRUD operations for their cookbook.  
    • The user can now Update a recipe in their cookbook, including adjusting the serving size of the recipe, which will in turn update the amount of ingriendients accordingly.  
    • The user can delete as well as upload a recipe from their cookbook.  
    
* The login and registration for the website has been drastically updated and upgraded.  
    • The login validation is better and the passwords are now being encrypted in the MongoDB for better security.
    • The registration has been updated with enhanced validation to make sure the password and confirm password are the same.  
    • The registration no longer allows duplicate usernames.  A username must be unique.
    • A users login session no longer is open indefinitely and expires after an hour of inactivity
    • The user session is verified and a user will stay logged

* New design and better UI for the website
    • New navigation bar and each page as a more astetically pleasing look to it.
    • The navigation bar will let the user know when they are logged in and dynamically change the Login/Registration/Logout buttons accordingly.
    

* Sprint 4 was all about bug fixes, more UI enhancements and small updates and bug fixes to dialogflow


======== TEST APPLICATION ON DIALOGFLOW HERE ==========
https://bot.dialogflow.com/201dfebf-ef6d-4c66-9b85-50e5e4bdc8fc



======== TEST THE WEBSITE HERE ==========
http://sous-chef-assistant.herokuapp.com/



## References:
JQuery snippet in index.html taken from www.bootsnip.com
Made it easier to toggle between the tabs so we didn't have 
to do a bunch of dom manipulation and unecessary javascript.
Bootsnip is code is opened to be used for anyone.  

Home page image sourced from:
https://www.canva.com/photos/food-drink/MACZiSgDn9A-food-products-rustic-vegetables-meat-cooking/?showAcquireAction=&query=food#
Free to use and no license required
