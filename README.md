# nodeCellar

This is a demonstration of how a node server operates RESTfully. 

This projects uses a simple mongoDB as a data store. 

To run this project

1) install mongoDB (this step is only needed once.)

2) run the deamon in a terminal window

npm install mongodb --save

mongod

3) run the server

node routes/server.js 

4)You should be able to a list of wines here:

http://localhost:3000/wines
