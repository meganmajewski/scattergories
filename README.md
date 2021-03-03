# Project Overview
![Image of Scattergories Logo](web/src/logo_2.png)
Scattergories is a creative-thinking category-based party game.

For each round there will be a list of 10 catergories, and a randomly selected letter. Each player should fill out one answer per category that matches the letter. For example if the category is 
```Type of animal``` and the letter is ```S``` the player would type ```Sloth```, or ```Snake```.

You score 1 point for each answer that is unique from the other players in that round.
You have the ability to score multipule points per answer if your answer contains more than one word that starts with that letter. 

For example:
```Sea Slug``` is worth 2 points.

# Motivation
The motivation behind this project is to simulate the table-top Scattergories game, but in a virtual setting. We want to translate the joining and playing of the game to a virtual platform, but expect that all players in a round can some how communicate with each other during game play.

The expectation is that scoring will be done via collaborative communication between players, and will not be automated into this application.

# Designs
https://ford.invisionapp.com/share/5RFLPTQTPAZ

# Tech Stack
    * API - Node
    * Web app - Create React App
    * DB - Postgress on Heroku
    * Hosting - Heroku

## CI/CD
    Heroku is configured to deploy on all commits to main. Currently no Tests in plays before this deploy.

## Required Tools
    * Node v14+
    * NPM