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
function loginClick() {
	//alert("loginClick");
	$.ajax ({
		url: '/loginhere',
		type: 'POST',
		data:{username: $('#username').val(), password: $('#password').val()},
		success: function (data) {
			console.log(data);
			////
			if(data){
				if(data.redirect);
					window.location = data.redirect;
				//$("#title").html(data.currentUser.name);
				//alert("Welcome back "+data.currentUser.name+"!")
			}
			else{
				alert("Invalid login")
			}
		}
	});
	//location.reload();
}
function logoutClick (){
	$.ajax({
		url: '/logout',
		type: 'GET',
		data: {},
		success: function(data){
			window.location = "login";
		}
	});
	location.reload();
}
$(document).ready(function(){
	window.onload = function(){
		$.ajax({
			url: '/sessionUser',
			type: 'GET',
			data: {},
			success: function(data){
				console.log(data);
				//if(data){
					if(data)
						$("#sessionName").html(data.user.name);
				//}
			}
		});
	};
	$("#password").keydown( function( event ) {
            if ( event.which === 13 ) {
              loginClick();
              event.preventDefault();
              return false;
            }
        });
	$("#login").click(login);
	$("#signup").click(signup);
	$("#browse").click(browse);
	$("#help").click(help);
	$("#home").click(home);
	$("#loginButton").click(loginClick);
	$("#logoutButton").click(logoutClick);
});