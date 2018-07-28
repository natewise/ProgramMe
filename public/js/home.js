function login(){
	window.location = "login";
}
function signup(){
	window.location = "signup";
}
function browse(){
	window.location = "browse";
}
function help(){
	window.location = "help";
}
function admin(){
	window.location = "admin";
}
function myProfile() {
	window.location='myProfile';
}
function logout(){
	$.ajax ({
		url: '/logout',
		type: 'GET',
		data:{},
		success: function(data) {
			//alert(data.value);
			window.location = "login";
		}
	});
}
//https://socket.io/docs/rooms-and-namespaces/
function updateChat(m){
$.ajax ({
		url: '/chat',
		type: 'GET',
		data:{msg:m},
		success: function(data) {
			//alert(data.value);
			$("#header ul").append('<li></li>');
		}
	});
}
var d="";
var p="";
function getUserName(){
	$.ajax ({
		async:false,
		url: '/sessionUser',
		type: 'GET',
		data:{},
		success: function(data) {
			console.log("success");
			//console.log(data);
			//alert("Hi: "+data.user.username);
			if(data.user.username){
				d=JSON.stringify(data.user.username);
				p=JSON.stringify(data.user.profilepic);
				console.log("data: " +d);
				//messageArea.show();
			//alert("chat");
			console.log("name= "+d);
			doStuff();
			//return(JSON.stringify(d));
			}
			else{
				//messageArea.Hide();
				alert("Need to Login");
			}
		}
	});
//alert("DY");
console.log("-----")
}
getUserName();
//alert("68")
$(document).ready(function(){
	var message=$('#message');
	var acceptingMsgs=true;
	 $('#message').on('keypress', function (e) {
         if(e.which === 13){
         	$("#infoStufff").hide();
         	e.preventDefault();
            console.log("submit");
var msg=message.val();
msg=msg.trim();
if(msg!=""){

	if(msg.indexOf("pm/")!=-1 )
	{
		//msg=msg.substring(4);
		console.log("send dm: "+msg.substring(4).trim());
		//sendInv(msg.substring(4).trim());
		d=d.replace(/['"]+/g, '');
		msg=msg.substring(4).trim();
		var x=msg.indexOf(" ");
		var mesg=msg.substring(x,msg.length);
		mesg=mesg.trim();
		chat.prepend('<div class="well"style="background-color:red;"><strong>'+d+'</strong>: '+mesg+'</div>');
		//alert(msg.substring(0).trim()+": "+msg.substring(0))
		socket.emit('send dm',msg.substring(0).trim());
		message.val("");
	}
	else{
socket.emit('send message',message.val());
message.val("");
}
}
         }
   });
	 $("#invite").hide();
	$("#login").click(login);
	$("#signup").click(signup);
	$("#browse").click(browse);
	$("#help").click(help);
	$("#admin").click(admin);
	$("#myProfile").click(myProfile);
	$("#logout").click(logout);
$("#acc").click(function(){acceptingMsgs=false;
$("#btns").hide();
$("#invite").hide("slow");
socket.emit('acceptedInvited',{status:true,sendTo:"danielson"});

});
$("#dec").click(function(){
	acceptingMsgs=true; 
	$("#invite").hide("slow");
	socket.emit('acceptedInvited',{status:false,sendTo:"danielson"});
});



///////////////////////////
//$(function(){
var socket=io.connect();

var messageArea=$('#messageArea')
var messageForm=$('#messageForm');

var chat=$('#chat');

//
//if(waitt==false){
//alert("od:"+d);
if(!d){
	login();
	console.log("hide chat: "+d);
		messageArea.hide();
	}
	else{
		console.log("hide");
		messageArea.show();
	}
messageForm.submit(function(stuff){stuff.preventDefault();
console.log("submit");
var msg=message.val();
msg=msg.trim();
if(msg!=""){
$("#infoStufff").hide();
	if(msg.indexOf("pm/")!=-1 )
	{
		//msg=msg.substring(4);
		console.log("send dm: "+msg.substring(4).trim());
		//sendInv(msg.substring(4).trim());
		d=d.replace(/['"]+/g, '');
		msg=msg.substring(4).trim();
		var x=msg.indexOf(" ");
		var mesg=msg.substring(x,msg.length);
		mesg=mesg.trim();
		chat.prepend('<div class="well"style="background-color:red;"><strong>'+d+'</strong>: '+mesg+'</div>');
		//alert(msg.substring(0).trim()+": "+msg.substring(0))
		socket.emit('send dm',msg.substring(4).trim());
		message.val("");
	}
	else{
socket.emit('send message',message.val());
message.val("");
}
}
});
socket.emit('addUsername',d);

socket.on('invited',function(data){
	console.log("iwasinvite=============")
	$("#invName").val("Invite From "+data+":");
	$("#invite").show("slow");
});


socket.on('new message',function(data){
	data.user=data.user.replace(/['"]+/g, '');
	chat.prepend('<div class="well"><strong>'+data.user+'</strong>: '+data.msg+'</div>');
});
socket.on('new dm',function(data){
	data.user=data.user.replace(/['"]+/g, '');
	chat.prepend('<div class="well"style="background-color:red;"><strong>'+data.user+'</strong>: '+data.msg+'</div>');
});
socket.on( 'disconnect', function () {
    console.log( 'disconnected to server' );
} );
socket.on('get users',function(data){
	console.log(data);
var html="";
let n = Array.from(new Set(data));
data=n;
for (var i = 0; i < data.length; i++) {
	data[i]=data[i].replace(/['"]+/g, '');
		//data[i]=data[i].replace('"', '');

	//alert(data[i]);
	html+='<li class="list-group-item">'+data[i]+'</li>'
};
$("#users").html(html)
//});

});
//}
/////////////////////////
});
function doStuff(){
//alert("dostuff():"+d);
//waitt==false;
}