# API-Assignment

App Description:

This application allows users to search for best rated restaurants in any US city. The user will input the city name and the app will dynamically return a list of best rated restaurant buttons. The user will then have the option to press on any of the buttons that were generated. This will return the phone number, address, reviews, menu and google map location of the restaurant. The menu will be displayed in a different tab as well as the location of the restaurant. Users can search for data from a different city, which will reset the recently viewed restaurants.

Technology used:

In this assignment, I used Zomato and Google Maps API's to make a dynamic web page that populates with restaurants from city of user's choice. JavaScript and jQuery are used to change the HTML of website.
-Used Jquery AJAX method to query city and restaurant data based on user input through a GET Zomato API.
-Used Jquery AJAX method to pull data using Google Map's GET API and dynamically embedded map into website.
-Stored restaurant address from Zomato API response object and used latitude and longitude to integrate google map to application.
