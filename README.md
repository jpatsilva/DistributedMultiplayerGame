# DistributedMultiplayerGame
Node.js server using express + socket.io that enables multiple players to connect to and play Connect 4 multiplayer game.

For this assignment, you will build upon your previously implemented multiplayer game. Your main objective is to make the game playable between multiple players across a real-time network communication channel.

Develop a node.js server using express + socket.io that enables multiple players to connect to and play your multiplayer game.

Your browser based game clients should load their html, css, and javascript files from the node server and then establish a socket.io connection. Using this connection, your clients will then communicate changes in game state to the server, which then transmits the updated game states to other players' clients.

Remember you can use socket.io to transfer JavaScript objects easily using JSON.

Submission Note:  Please Include a README.TXT file that have all the installation commands of the packages that you have used to setup your sever.

Bonus: Enable multiple games to take place on the server at the same time. You can implement this by creating a unique ids for unique game instances, which you then incorporate into the url (i.e. http://localhost:3000/<unique_game_id>) You can then use this id as a means for establishing separate rooms in the socket.io server and as a key for storing server side game state.
