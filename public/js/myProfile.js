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
	window.onload = function(){
		$.ajax({
			url: '/sessionUser',
			type: 'GET',
			data: {},
			success: function(data){
				if(data) {
					if(data.user){
						$('#image').attr('src',data.user.profilepic);
						$('#bio').html(data.user.description);
						$('#username').html(data.user.username);
						$('#name').html(data.user.name);
						$('#age').html(data.user.age);
						$('#experiencelvl').html(data.user.experiencelvl);
						$('#lang').html(data.user.languages);
					}
				}
			}
		});
	}
	$("#login").click(login);
	$("#signup").click(signup);
	$("#browse").click(browse);
	$("#help").click(help);
	$("#home").click(home);
	
});