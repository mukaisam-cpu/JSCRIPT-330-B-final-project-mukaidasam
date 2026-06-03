# JSCRIPT-330-B-final-project-mukaidasam

## API Authentication:
Create a free account on the [RetroAchievements website.](https://retroachievements.org) Your web API key can be found in your profile settings under the "Authentication" section. Create a .env file with the following values:

```
RA_USERNAME = <your username here>
RA_API_KEY = <your api key here>
````

## Post-Mortem Reflection
Losing a week on this final project definitely cut into its scope hard. Even with the scope being narrower than many of my peers' projects, I still had to rush to get everything out the door. Unit tests in particular ate up much of my time- after struggling to get them functional, implementing them seemed to take up twice as much time and code as the actual project itself. Other utilities like eslint, prettier, and more robust features and security also had to take a backseat to simply pushing something out on time. On the one hand, I probably should have started working on this earlier and better managed my time with the project, but even so the lost week would have still kept the project's scope minimal.

Overall, there's a lot more work to be done before this could be applied to my frontend project for JSCRIPT-320. I'm only realizing after the fact that while I'm storing all the games through their IDs, there currently isn't really a viable way to construct actual data out of those IDs, particularly if one of the main goals is to decouple the API calls from the frontend. Originally I tried calling the API in the /bookmarks and /playlist routes, but it caused issues with testing due to the fact that I was giving the calls too many responsibilities at once and returning the data from the RA API calls instead of the database. The first thing I'd do with future development is to set up a new route specifically to access the RA API when passing in game IDs.

What's here works well enough, if anything I'm worried it's a bit too simple. In all fairness everything beyond saving bookmarks is already scope creep from the JSCRIPT-320 final, but I think this at least meets the bare minimum of the project requirements. A lot of the dao functions are simple invocations, and the routes don't add much more besides basic validation. At the very least I could add more validation, but I think the main issue here is that my main data models are incredibly simple with the RA API doing all the heavy lifting in terms of data complexity. I could implement searches on the bookmark data, but since it's stored as IDs it can't really be searched unless I were to obtain the name from the RA API somehow. Ultimately, I think that seperation between two different databases is both this project's blessing and curse- I can keep the data I store very consise, but how to approach that data in tandem with RA's data opened a lot of more high-level conceptual questions.

Given an extra week, I could do more to flesh the overall model out and decrease reliance on the RA API to better demonstrate the concepts we learned in class. I could save some of this data to peform deeper searches or provide more fleshed-out stats of a player's saved games. Even so, my frontend doesn't necessarily need much more than the current implementation to function, and if I were to implement a route for RA API calls that would still necessitate a rewrite of nearly all the frontend's code.

## Proof-of-concept update:
Project framework is mostly set up. Routes and models have been created, server starts and updates the Mongo database accordingly. Next step is getting tests set up- currently the very framework doesn't seem to be functioning properly and I might need to ask for assistance on that when I return.

## Project Proposal: Game and playlist save backend for RetroAcheviements API access tool

For the 310 and 320 classes, my final project was based around a web-based frontend for the RetroAcheivements API, which would allow users to view retro games and achievements created by the RA community. The original version created for 310 involved a save system that allowed users to bookmark and save favorite games to their browser cache. The upgraded version created for 320 was focused around the React frontend, and as such a save system could not be completed for the project. For this project, I intend to complete the missing feature and allow users to create an account and save favorite games, as well as adding some new functionality. This project's MVP will involve a simple backend to send requests to- time permitting, I would like to implement this into my 320 final project frontend.

### Routes
- /authentication
- /bookmarks
  - Save bookmark info with the user's ID and the game's RA ID
  - Obtain data from RetroAchievement's API to perform text searches
- /playlists
  - Save groups of bookmarks and a name to designate a playlist (eg. "Sports Games", "Super Robot Wars series", "Pokemon romhacks")
  - Text search playlist name, or playlists by user including specific games

### Database and DAOs
- User
- Bookmark
  - Distinct user and RA ID (No duplicate bookmarks for user)
- Playlist
  - Distinct user
  - Same individual bookmark document can be used in multiple playlists
- Game(?)
  - Storing RA's entire database of games is an option, especially if we don't include achievement data with the games- However, this data will get outdated if we want to include romhack entries in the system

### Data Sources:
- RetroAchievements API: https://api-docs.retroachievements.org

## Project Timeline:
May 11 - 17: Initial prototype, implement routes and data models
May 17 - 26: Visiting Japan with family, try to get as much finished as possible before this point
May 27 - June 2: Complete prototype, polish up and add searches
June 2: Project Presentation
