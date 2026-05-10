# JSCRIPT-330-B-final-project-mukaidasam

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
