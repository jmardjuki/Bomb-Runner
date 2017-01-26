# Bomb Runner
#### SFU CSSS API Challenge Hackathon First Prize Winner
## Introduction
This is a simple two player game created during the 24 hour Hhackthon "SFU CSSS API Challenge" which was held on 7th to 8th of January at Simon Fraser University. This year's API to be challenged is the Google Map API.

The idea, and mechanism of the game was developed on the spot as we go thru each checkpoints. Balancing and overall application improvement might be implemented in the future. Currently this application only works for exactly two players, one runner, and one bomber as room faeature has not been implemented.

Application is currently hosted on Heroku:
https://api-potg.herokuapp.com/

Built using:
+ Node.js
+ Socket.IO
+ Google Maps API
+ Geolocation API
+ [gmaps.js](https://github.com/hpneo/gmaps)
+ [Buttons](https://github.com/alexwolfe/Buttons)

Created by
+ Mardjuki, Janet ([@jmardjuki](https://github.com/jmardjuki))
+ Ngo, Thomas ([@TechieWidget](https://github.com/TechieWidget))

## Gameplay
The game consist of two player, one would act as the runner, and one as the bomber. Runner 's target is to avoid the bomb drop by keep running away until the time limit passed. Bomber goal is to drop bomb on the runner within the time limit given. To make the game more balanced, both the bomber and the runner would be able to see how far off the bomber dropped the bomb by seeing the colour of the circle. This will allow both player to make informative decision on the next step they take.

## Screeshot:

Note: Application interface is not that mobile friendly, therefore some demo are done on PC

Choosing role

![alt text](http://i.imgur.com/aGXtsoh.png "titlePage_choosing")

For privacy reason, geolocation for the screenshoot purpose was spoofed using Chrome Dev Tools
![alt text](http://i.imgur.com/Zxgxahs.png "ChromeDevTools")


The runner would be able to see where the bomber dropped the bomb
![alt text](http://i.imgur.com/PSIRKUB.png"runner_bombDropped")

Those are what the application looks like when bomber manage to bomb the runner.
![alt text](http://i.imgur.com/hZLfY8w.png"bomber_bombedPrompt")
![alt text](http://i.imgur.com/JvgX9m9.png"runner_bombedResult")

When the runner was bombed
![alt text](http://i.imgur.com/L9ftXYO.png"runner_bombed")

This is the coordinate send by the server to the bomber, on which their map would be centralized on.
![alt text](http://i.imgur.com/xFigPzd.png"bomber_receiveData")

This is what the real location send after the game ended, allowing the app to show it on the bomber end.
![alt text](http://i.imgur.com/8cRIJN7.png"bomber_receiveDataEnd")

The application does keep track of the geolocation of the runner even after they lose.
This screenshot was taken a few minutes after the hackathon itself, near SFU bus loop.
![alt text](http://i.imgur.com/eoWmRnX.png"bomber_receiveDataEnd")

