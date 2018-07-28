var mongoose = require("mongoose");
var Promise = require('promise');
var User = require("./public/models/user");

var myDataBase = function(){
	this.profileUser = {};
	// this.infolist = [{username : "username", password : "password", 
	// 	profilepic : "/Avatar.jpg", name : "Nate", age : 17, 
	// 	experiencelvl : "High", languages : "Java" , description : "Hello"} , 
	// 	{username : "danielson", password : "anime", 
	// 	profilepic : "/Yee.jpg", name : "Daniel", age : 18, 
	// 	experiencelvl : "Low", languages : "Python" , admin : true , description : "Hello"} ,
	// 	{username : "something", password : "pass", 
	// 	profilepic : "/Yee.jpg", name : "Joey", age : 22, 
	// 	experiencelvl : "Medium", languages : "Java" , description : "Hello"} , 
	// 	{username : "user", password : "test", 
	// 	profilepic : "/Yee.jpg", name : "Nuel", age : 14, 
	// 	experiencelvl : "None", languages : "JavaScript" , description : "Hello"}];
};
myDataBase.prototype.getProfileUser = function(){
	console.log(this.profileUser);
	return this.profileUser;
}
myDataBase.prototype.changeProfileUser = function(user){
	console.log(user);
	this.profileUser = user;
}
myDataBase.prototype.createUser = function(usrnme,psword,pp,actualName,agee,experience,lang,_admin = false,_description,next){
	console.log("inside createUserDB");
	var newUser= new User({
		username : usrnme,
		password : psword,
		profilepic : pp,
		name : actualName,
		age : agee,
		experiencelvl : experience,
		languages : lang,
		admin : _admin,
		description : _description
	});
	/* Old Code
	this.infolist.push(newUser); 
	console.log(this.infolist);
	*/
	newUser.save(next);
};
myDataBase.prototype.accessUser = function(_username, _password, res, next) {
	console.log("inside accessUserDB");
	User.findOne({username : _username}, function(err,user){
		console.log(user)
		if(err){return next(err)}
		return user;
	});
	/* Old Code
	for (var i = 0; i < this.infolist.length; i++) {
		if(this.infolist[i].username == _username && 
			this.infolist[i].password == _password){
			return this.infolist[i]
		}
	}
	*/
	return false
};
////////////////////////////////Daniel
myDataBase.prototype.getAllUsers = function(_user,res,next) {
	// body...
	User.find({},function(err,infoList){
		if(err){return next(err)}
		return res.json({infolist : infoList , user : _user});
	});
	
};

myDataBase.prototype.removeUser = function(index,res,next) {
	var Prom2 = prom2();
	Prom2.then(function(infolist){
		User.remove({username : infolist[index].username},function(err,log){
			if(err){return next(err)}
			console.log(log); //ex. { n: 1, ok: 1 }
			return res.json({value : "Success"})
		});
	});
/*
	this.infolist.splice(index,1);
	console.log('**************************');
	console.log(this.infolist);
	console.log('**************************');
	*/
	return;
};
function prom2(){
	return new Promise(function(resolve,reject) {
	User.find({},function (err,infolist){
		if (err) {
	        reject(err);
		} else {
	        resolve(infolist);
		}
	});
  });
}
myDataBase.prototype.updateInfoRes = function(username,user,res,next){
	User.update({username: req.user.username},user,function (err){
				if(err){return next(err)}
				return res.redirect("myProfile");
			});
};

myDataBase.prototype.updateInfo = function(currUser, _username,_password,_name, _age, _experience , lang, _description,res,next) {
	
	// for (var i =  0; i < this.infolist.length; i++) {
	// 	if(this.infolist[i].password == currUser.password &&
	// 		this.infolist[i].username == currUser.username){
	// 		user = this.infolist[i];
	// 		unchangedUser = this.infolist[i];
	// 	}
	// };
	var Prom1 = prom1(currUser.username);
	Prom1.then(function(user){
		var curruser = user[0];
		console.log("inside prom1")
		console.log(curruser)
		console.log("inside prom1")
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
		console.log("this is user");
		console.log(user);
		if(user.changedlanguages || user.changedexperiencelvl || user.changedage ||
			user.changedname || user.changedprofilepic || user.changedpassword ||
			user.changedusername){

			User.update({username: unchangedUser.username},user,function (err){
				if(err){return next(err)}
				return res.redirect("myProfile");
			});
		}
	},function (err){console.log(err);});
	/*
	User.find({username: currUser.username},function (err,curruser){
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
			console.log("returned user");
			return(user);
		}
	}); 
	
	return null;
	*/
};
function prom1(_username){
	return new Promise(function(resolve,reject) {
	User.find({username: _username},function (err,curruser){
		if (err) {
	        reject(err);
		} else {
	        resolve(curruser);
		}
	});
  });
}
///////////////////////////////Daniel

myDataBase.prototype.searchUsersByCriteria = function(user,_name, _username, _age, _experience , lang, res, next){
	console.log("------------------New Search------------------")
	var retArray = [];
	User.find({},function(err,infoList){
		if(err){return next(err)}
	//var infoList = this.infolist;

	var objArray = []; //new

	var index = 0;
	for (var i = 0; i < infoList.length; i++) {
		var matchCount = 0;
		/* old
		infoList[i].nameMatch = false;
		infoList[i].usernameMatch = false;
		infoList[i].ageMatch = false;
		infoList[i].xpMatch = false;
		infoList[i].langMatch = false;
		*/
		objArray[i] = {};
		if(infoList[i].name == _name && infoList[i].name != ""){
			//infoList[i].nameMatch = true; *old
			objArray[i].nameMatch = true;
			matchCount++;
		}if(infoList[i].username == _username && infoList[i].username != ""){
			//infoList[i].usernameMatch = true; *old
			objArray[i].usernameMatch = true;
			matchCount++;
		}if(infoList[i].age <= _age && infoList[i].age >= (_age-4)){
			//infoList[i].ageMatch = true; *old
			objArray[i].ageMatch = true;
			matchCount++;
		}if(infoList[i].experiencelvl == _experience){
			//infoList[i].xpMatch = true; *old
			objArray[i].xpMatch = true;
			matchCount++;
		}if(infoList[i].languages == lang ){
			//infoList[i].langMatch = true; *old
			objArray[i].langMatch = true;
			matchCount++;
		}if(matchCount > 0){
			objArray[i].username = infoList[i].username;
			objArray[i].name = infoList[i].name;
			objArray[i].age = infoList[i].age;
			objArray[i].experiencelvl = infoList[i].experiencelvl;
			objArray[i].languages = infoList[i].languages;
			//retArray[index++] = infoList[i] *old
			retArray[index++] = objArray[i];
			retArray[(index-1)].matchCount = matchCount; 
		}
		console.log("objArray["+i+"]")
		console.log(objArray[i])
		// console.log(infoList[i].name + " name: "+ infoList[i].nameMatch + " user: " + infoList[i].usernameMatch + 
		// 	" age: " + infoList[i].ageMatch + " xp: " + infoList[i].xpMatch + " lang: " + infoList[i].langMatch)
	};
	console.log("retArray")
	console.log(retArray)
	//sorting algorithm, sorts users high to low based on their matchcount
	var sortedArray = [];
	while(retArray.length > 0){
		var high = retArray[0];
		var highArrayIndex = 0;
		for (var i = 0; i < retArray.length; i++) {
			if(retArray[i].matchCount > high.matchCount){
				high = retArray[i];
				highArrayIndex = i;
				//console.log(high + " " + highArrayIndex)
			}
		}
		if(user != null && user.username != high.username && user.password != high.password){
			sortedArray.push(high);
		}else if(user == null){
			sortedArray.push(high);
		}
		retArray.splice(highArrayIndex,1)
	}
	console.log("sortedArray")
	console.log(sortedArray)
	console.log("------------------End Search------------------")
	return res.json({array : sortedArray});
	}); //User.find({},function(err,infoList){
};
module.exports = myDataBase;