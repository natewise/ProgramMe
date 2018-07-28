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
$(document).ready(function(){
	$.ajax({
		url: '/userProfile',
		type: 'POST',
		data: {change : false},
		success: function(data){
			console.log(data);
			if(data.user){
				console.log(data.user);
				$('#image').attr('src',data.user.profilepic);
				$('#bio').html(data.user.description);
				$('#username').html(data.user.username);
				$('#name').html(data.user.name);
				$('#age').html(data.user.age);
				$('#experiencelvl').html(data.user.experiencelvl);
				$('#lang').html(data.user.languages);
			}else{
				console.log(data.value);
			}
		}
	}); 
	$("#login").click(login);
	$("#signup").click(signup);
	$("#browse").click(browse);
	$("#help").click(help);
	$("#home").click(home);
	
});