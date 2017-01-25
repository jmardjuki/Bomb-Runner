# Bomb Runner
#### SFU CSSS API Challenge Hackathon First Prize Winner
## Introduction
This is a simple two player game created during the 24 hour Hhackthon "SFU CSSS API Challenge" which was held on 7th to 8th of January at Simon Fraser University. This year's API to be challenged is the Google Map API.

The idea, and mechanism of the game was developed on the spot as we go thru each checkpoints. Balancing and overall application improvement might be implemented in the future. Currently this application only works for 

Application is currently hosted on Heroku:
https://api-potg.herokuapp.com/

Built using:
+ Node.js
+ Socket.IO
+ Google Maps API
+ Geolocation API

Created by
+ Mardjuki, Janet ([@jmardjuki](https://github.com/jmardjuki))
+ Ngo, Thomas ([@TechieWidget](https://github.com/TechieWidget))

## Gameplay
The game consist of two player, one would act as the runner, and one as the bomber. Runner 's target is to avoid the bomb drop by keep running away until the time limit passed. Bomber goal is to drop bomb on the runner within the time limit given.

## Screeshot:

Note: Application interface is not that mobile friendly, therefore some demo are done on PC

![alt text](http://i.imgur.com/lI6lah6.png "title_page")

This is the game main page

![alt text](http://i.imgur.com/JN4LCK4.png "title_page")

Choosing role

![alt text](http://i.imgur.com/Zxgxahs.png "title_page")

For privacy reason, geolocation of this was spoofed using Chrome Dev Tools
