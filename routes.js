var express = require('express');
var router = express.Router();
const myDataBase = require("./myDataBase");
var session = require('express-session');
var passport = require("passport");
var flash = require("connect-flash");


let db = new myDataBase();

var mongoose = require("mongoose");
var Promise = require('promise');
var User = require("./public/models/user");
/////////////////
var formidable = require('formidable');
var fs = require('fs');
/////////////////

router.get("/",function(request,response){
	response.sendFile(__dirname + "/public/views/index.html")
});
router.get("/login",function(request,response){
	if(!request.isAuthenticated()){
		response.sendFile(__dirname + "/public/views/login.html");
	}else{
		response.sendFile(__dirname + "/public/views/loggedin.html");
	}
});
router.get("/signup",function(request,response){
	response.sendFile(__dirname + "/public/views/signup.html");
});
router.get("/browse",function(request,response){
	response.sendFile(__dirname + "/public/views/browse.html");
});
router.get("/help",function(request,response){
	response.sendFile(__dirname + "/public/views/help.html");
});
router.get("/admin",function(request,response){
	response.sendFile(__dirname + "/public/views/ban.html");
});
router.get("/myProfile",function(request,response){
	response.sendFile(__dirname + "/public/views/myProfile.html");
});
function prom1(_username){
	return new Promise(function(resolve,reject){
		User.findOne({username : _username},function(err,user){
			console.log(user)
			if(err){
				reject(err);
			}else{
				resolve(user);
			}
		})
	});
}
router.post("/userProfile",function(req,res){
	//console.log(req.body.user);
	//console.log(req.session);
	var Prom1 = prom1(req.body.username);
	if(req.body.change == "true"){
		Prom1.then(function(user){
			db.changeProfileUser(user);
			res.json(null);
		});
	}else{
		res.json({user : db.getProfileUser()});
	}
});

router.get("/getUserProfile",function(request,response){
	response.sendFile(__dirname + "/public/views/userProfile.html");
});
router.get("/sessionUser",function(req,res){
	//console.log(req);
	console.log(req.user);
	console.log(req.isAuthenticated());
	if(req.isAuthenticated())
		res.json({user: req.user});
	else
		res.json(null);
});
router.get("/successroot", function(req, res) {
console.log("get successroot");
	res.json({redirect:"/"});	
});

router.get("/failroot", function(req, res) {
console.log("get failroot");
	res.json({redirect:"/login"});	
});

router.get("/successsignup", function(req, res) {
console.log("get successsignup");
	res.json({redirect:"/session"});	
});

router.get("/failsignup", function(req, res) {
console.log("get failsignup");
	res.json({redirect:"/login"});	
});

router.get("/successlogin", function(req, res) {
console.log("get successsignup");
	res.json({redirect:"/myprofile"});	
});
router.get("/faillogin", function(req, res) {
console.log("get failsignup");
	res.json({redirect:"/login"});	

});

router.post("/loginhere", passport.authenticate("login", {
  successRedirect: "/successlogin",
  failureRedirect: "/faillogin",
  failureFlash: true
}));



// router.post("/loginhere",function(req,res,next){
// 	console.log("inside loginhere Routes");
// 	console.log("req.sessionID is "+ req.sessionID);
// 	var currUser;
// 	User.findOne({username : req.body.username}, function(err,user){
// 		console.log(user)
// 		if(err){return next(err)}
// 		currUser = user; 
// 	});
	
// 	if(currUser){
// 		res.json({currentUser : user});
// 	}
// 	else{
// 		res.json(null);
// 	}
	
// });
/*
router.post("/buttonSignup",function(req,res){
	console.log("inside buttonSignup Routes");
	console.log("password: "+req.body.password+" confirmPassword: "+req.body.confirmPassword);
	var infolist = db.getAllUsers();
	for (var i = 0; i < infolist.length; i++) {
		if(req.body.username == infolist[i].username){
			res.json({value : "Username is already taken."})
			return;
		}
	}
	if(req.body.password != req.body.confirmPassword || req.body.password.length < 4){
		res.json({value : "Invalid password"})
		return;
	}else {
		db.createUser(req.body.username, req.body.password, req.body.profilepic, 
			req.body.myName, req.body.age, req.body.experiencelvl, req.body.language);
		res.json({value : "Welcome "+req.body.myName+"!"});
		return;
	}
});  */
router.put("/buttonUpdate",function (req,res,next){
	db.updateInfo(req.user, req.body.username, req.body.password, 
			req.body.myName, req.body.age, req.body.experiencelvl, req.body.language, req.body.description,res,next);
	 /*
	User.find({username: req.user.username},function (err,curruser){
		var _username = req.body.username;
		var _password = req.body.password;
		var _name = req.body.myName;
		var _age = req.body.age;
		var _experience = req.body.experiencelvl;
		var lang = req.body.language;
		var _description = req.body.description;

		var user = {};
		var unchangedUser = {};

		user = curruser;
		unchangedUser = curruser; 
		
		if(unchangedUser.username != _username && _username != "" && _username != undefined && _username != null){
			console.log("username changed" + _username);
			user.username = _username;
			user.changedusername = true;
		}if(unchangedUser.password != _password && _password != "" && _password != undefined && _password != null){
			console.log("password changed " + _password);
			user.password = _password;
			user.changedpassword = true;
		}if(unchangedUser.name != _name && _name != "" && _name != undefined && _name != null){
			console.log("name changed " + _name);
			user.name = _name;
			user.changedname = true;
		}if(unchangedUser.age != _age && _age != "" && _age != undefined && _age != null){
			console.log("age changed " + _age);
			user.age = _age;
			user.changedage = true;
		}if(unchangedUser.experiencelvl != _experience){
			console.log("experiencelvl changed " + _experience);
			user.experiencelvl = _experience;
			user.changedexperiencelvl = true;
		}if(unchangedUser.languages != lang){
			console.log("languages changed " + lang);
			user.languages = lang;
			user.changedlanguages = true;
		}if(unchangedUser.description != _description){
			console.log("description changed " + _description);
			user.description = _description;
			user.changeddescription = true;
		}
		console.log(user);
		if(user.changedlanguages || user.changedexperiencelvl || user.changedage ||
			user.changedname || user.changedprofilepic || user.changedpassword ||
			user.changedusername){

			User.update({username: req.user.username},user,function (err){
				if(err){return next(err)}
				return res.redirect("myProfile");
			});
		}
	}); 
	res.redirect("signup");*/


	/* old stuff
	//console.log('inside buttonUpdate');
	var infolist = db.getAllUsers();
	//console.log(req.body.language);
	var num = db.updateInfo(req.user, req.body.username, req.body.password, 
			req.body.myName, req.body.age, req.body.experiencelvl, req.body.language, req.body.description);
	//req.user = num;

	if(num){
		for (var i = 0; i < infolist.length; i++) {
			if(req.body.username == infolist[i].username){
				res.json({value : "Username is already taken."})
				return;
			}
		}
		if(req.body.password != req.body.confirmPassword || req.body.password.length < 4
		 && req.body.password != "" && req.body.password != undefined){
			res.json({value : "Invalid password"})
			return;
		}
		res.json({value : "Valid update"})
	}else{
		res.json({value : "Invalid update"});
	}
	*/
}); 
router.post("/buttonSignup",function(req,res,next){
	//console.log("inside buttonSignup Routes");
	//var infolist = db.getAllUsers();
	User.find({},function(err,infolist){
		if(err){return next(err)}
//////////////////////////////////////////////////////
	var form = new formidable.IncomingForm();

	form.parse(req, function (err, fields, files) {

	    var fileName = files.filetoupload.name;
	    var fileType = fileName.slice(fileName.lastIndexOf('.'));
	   	var oldpath = files.filetoupload.path;
	   	var newName =  Math.floor(Number(Math.random() * 10000000000));
	   	var newpath = __dirname + '/public/images/' + newName + fileType;

	   	var username = fields.username;
	   	var password = fields.Password;
	   	var confirmPassword = fields.ConfirmPassword;
	   	var profilepic = '/images/' + newName + fileType;
	   	var myName = fields.name;
	   	var age = fields.age;
	   	var experiencelvl = fields.experience;
	   	var language = fields.preference;
	   	var description = fields.bio;

	   	for (var i = 0; i < infolist.length; i++) {
		if(username == infolist[i].username){
			res.redirect('/signup');
			return;
		}
		}
		if(password != confirmPassword || password.length < 4){
			res.redirect('/signup');
			return;
		}else {
			db.createUser(username, password, profilepic, myName, age, experiencelvl, language, false, description,next);
			fs.rename(oldpath, newpath, function (err) {
				if (err) throw err;
				console.log("fileupload " + files.filetoupload.name);
		    	res.redirect('/login');
				return;
	    	});
		}
	   	//console.log(username + ' ' + password + ' ' + confirmPassword + ' ' + confirmPassword + ' ' + profilepic + ' ' + myName + ' ' + age + ' ' + experiencelvl + ' ' + language);
	}, passport.authenticate("login", {
  successRedirect: "/",
  failureRedirect: "/signup",
  failureFlash: true
}));
//////////////////////////////////////////////////////
	});	//Users.find
});
router.get("/makemeadmin",function(req,res,next){
	if(req.isAuthenticated()){
		User.update({username : req.user.username},{admin : true},function(err,user){
			if(err){return next(err)}
			console.log(user);
			res.redirect("admin");
		});
	}else{
		res.redirect("login");
	}
	
});
router.get("/autoMatch",function(req,res,next){
	var user = req.user;
	if(req.isAuthenticated()){
		//var callback = db.searchUsersByCriteria(user,user.name, user.username, 
		//user.age, user.experiencelvl, user.languages, res, next);
		//res.json({array : callback});
		db.searchUsersByCriteria(user,user.name, user.username, 
		user.age, user.experiencelvl, user.languages, res, next);
	}else{
		res.json(null);
	}
})
router.get("/manualMatch",function(req,res,next){
	db.searchUsersByCriteria(req.user,req.query.name, req.query.username, 
		req.query.agerange, req.query.experience, req.query.lang, res, next);
});
router.get("/logout",function(req,res){
	if(!req.user){
		res.json({value : "Please log in"});
	}else{
		req.logout();
		res.json({value : "Successful logout!"});
	}

});
////////////////Daniel
router.get("/delete",function(request,response){
	response.sendFile(__dirname + "/public/views/Delete.html")
});

router.delete("/delete/:index",function(req,res,next){
	db.removeUser(req.params.index,res,next);
});

router.get("/getUsers",function(req,res,next){
	if(req.isAuthenticated() && req.user.admin == true){
		//res.json({infolist : db.getAllUsers() , user : request.session.user}); *old
		db.getAllUsers(req.user,res,next);
	}else{
		res.sendFile(__dirname + "/Yee.jpg");
	}
});

//////////////////Daniel
module.exports = router;