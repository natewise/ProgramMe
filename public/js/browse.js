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
function home(){
	window.location.href="/";
}
var sortedArray = [];
function viewProfile(index){
	$.ajax ({
		url: '/userProfile',
		type: 'POST',
		data:{username : sortedArray[index].username , change : true},
		success: function(data) {
			console.log(data);
		}
	});
	window.location = "getUserProfile";
	
}
function buttonMatch(){
	$.ajax ({
		url: '/autoMatch',
		type: 'GET',
		data:{},
		success: function(data) {
			if(data){
				console.log(data);
				$("#under").html("The best matches for you are...")
				$("#list").empty();
				sortedArray = data.array;
				for (var i = 0; i < data.array.length; i++) {
					var name = "";
					var username = "";
					var age = "";
					var xp = "";
					var lang = "";
					if(data.array[i].nameMatch)
						name=data.array[i].name;
					if(data.array[i].usernameMatch)
						username=data.array[i].username;
					if(data.array[i].ageMatch)
						age=data.array[i].age;
					if(data.array[i].xpMatch)
						xp=data.array[i].experiencelvl;
					if(data.array[i].langMatch)
						lang=data.array[i].languages;
					$("#list").append("<li><b>"+data.array[i].name+"</b>, with matches: "
						+name+"  "+username+"  "+age+"  "+xp+"  "+lang+". <button class = 'profile' onclick = 'viewProfile("+i+")'>View Profile</button></li>")
				}
			}else{
				alert("Please sign in")
			}
		}
	});
}
function secondButtonMatch(){
	$.ajax ({
		url: '/manualMatch',
		type: 'GET',
		data:{name: $('#name').val(), username: $('#username').val(), 
			agerange: $('#agerange').val(), experience: $('#experiencelvl').val(),
			lang: $('#PL').val()},
		success: function(data) {
			$("#under").html("The best matches for you are...")
			$("#list").empty();
			sortedArray = data.array;
			for (var i = 0; i < data.array.length; i++) {
				var name = "";
				var username = "";
				var age = "";
				var xp = "";
				var lang = "";
				if(data.array[i].nameMatch)
					name=data.array[i].name;
				if(data.array[i].usernameMatch)
					username=data.array[i].username;
				if(data.array[i].ageMatch)
					age=data.array[i].age;
				if(data.array[i].xpMatch)
					xp=data.array[i].experiencelvl;
				if(data.array[i].langMatch)
					lang=data.array[i].languages;
				$("#list").append("<li><b>"+data.array[i].name+"</b>, with matches: "+name+"  "+username+"  "+age+"  "+xp+"  "+lang+". <button class = 'profile' onclick = 'viewProfile("+i+")'>View Profile</button></li>")

			}
		}
	});
}
$(document).ready(function(){
	$("#login").click(login);
	$("#signup").click(signup);
	$("#browse").click(browse);
	$("#help").click(help);
	$("#home").click(home);
	$("#buttonMatch").click(buttonMatch);
	$("#secondButtonMatch").click(secondButtonMatch);
});