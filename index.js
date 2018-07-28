var express = require('express');
//var path = require('path');
var bodyParser = require('body-parser');  //new
var routes = require('./routes');
var app = express();
var session = require('express-session');
var validator = require('express-validator');
var passport = require("passport");
var setUpPassport = require("./setuppassport");
var flash = require("connect-flash");

var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/ProgramMe");
setUpPassport();

////
//https://socket.io/docs/server-api/
var server=require("http").createServer(app);
var io=require("socket.io")(server, {
  // below are engine.IO options
  pingInterval: 10000,
  pingTimeout: 5000,
  cookie: false
});
var fs=require("fs");
////
const myDataBase = require("./myDataBase");

let db = new myDataBase();

app.use(bodyParser.urlencoded({extended: true}))  //new
app.use(bodyParser.json())  //new

console.log("The dirname is "+"-- "+__dirname+" --")

//tells express to match any routes for any files found in this folder 
app.use('/', express.static("./"));
app.use('/images', express.static("./public/images"));
app.use('/js', express.static("./public/js"));
app.use('/views', express.static("./public/views"));
app.use('/styles', express.static("./public/styles"));
app.use(validator());
app.use(session({secret: 'zd8gd8g8fcg' , saveUninitialized: true , resave: false}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(routes);

///////////////////
///////////////////////

// //var server=require("http").createServer(app);
s=[];
users=[];
allUsers=[];
connections=[];
 //server.listen(process.env.PORT||3000);
// /////////////////////////
//socket.broadcast.to(socketid).emit('message', 'for your eyes only');
io.sockets.on('connection',function(socket){
	
	//console.log("socket are: "+JSON.stringify(s));
	

	socket.on('addUsername',function(data){
 		socket.username=data;  //get username from the session
 		//console.log('addusername: '+data);
 		socket.socketIdentification=socket.id;
 		users.push(socket.username);
 		if (allUsers.indexOf(socket.username) > -1) {
 			s[allUsers.indexOf(socket.username)]=socket.id;
    console.log("--update socketid--");
} else {
	allUsers.push(socket.username);
	s.push(socket.id);
    //Not in the array
}
 		
 		connections.push(socket);
 		
 		addUser();
 	});
 	
	//socket.on('getPeople',function(data){
	//	socket.broadcast.to(socketid).emit('peopleOnline', users);
	//});
	//connections.push(socket);
	//console.log("connected %s sockets connected",connections.length);
 //disconect
    socket.on('disconnect',function(data){
 	console.log('disconnecting:'+socket.username+ " : "+users.indexOf(socket.username)+" : " +data)
 	  users.splice(users.indexOf(socket.username),1);
 	  addUser();
 	  connections.splice(connections.indexOf(socket),1);

 	  //console.log("Disconnected: %s sockets connected",connections.length);
    });
   
 //send message
    socket.on('send message',function(data){
 	  console.log("Sent Message: "+data);
 	 // var c=0;
 	  //for (var i = users.length - 1; i >= 0; i--) {
 	  //	if(users[i]=="danielson"){c=i;}
 	 // };
 	  //console.log(s[c]);
 	  //socket.broadcast.to(s[c]).emit('new message',{msg:data,user:socket.username});
 	  io.sockets.emit('new message',{msg:data,user:socket.username});
    });
    socket.on('send dm',function(data){
 	  console.log("Sent Message: "+data);
 	 var c=0;
   data=data.trim(); 
   var x=data.indexOf(' ');
   var sendTo=('"'+data.substring(0,x)+'"');
   //sendTo=data.substring(0,x);
   var mesg=data.substring(x,data.length);
  
   console.log("Send to: "+sendTo+" mesg: "+mesg+ " x: "+x);
   console.log(allUsers);
   console.log(s);
 	  for (var i = allUsers.length - 1; i >= 0; i--) {
 	  	if(allUsers[i]==sendTo){c=i;}
 	  	else{return;}
 	  };
 	  console.log("inv: "+ allUsers[c]+" : "+s[c]);
 	  socket.broadcast.to(s[c]).emit('new dm',{msg:mesg,user:socket.username});
    });
  });
function addUser(){
	//if(users[0]) {
		console.log("users: "+users);

		io.emit('get users',users);
	//}
}
//////////////////

//app.set("views", path.resolve(__dirname,"views"))

var port = process.env.PORT || 3000;
console.log("Listening on port "+port)
server.listen(process.env.PORT||3000);
//app.listen(port)