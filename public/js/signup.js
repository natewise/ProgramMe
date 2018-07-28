function login(){
	window.location = "login";
};
function signup(){
	window.location = "signup";
};
function browse(){
	window.location = "browse";
};
function help(){
	window.location = "help";
};
function home(){
	window.location.href="/";
};
function buttonSignup(){
	//alert("signupClick");
	$.ajax({
		url:"/buttonSignup",
		type:"POST",
		data:{
			username: $("#username").val(),
			password: $("#password").val(),
			confirmPassword: $("#confirmPassword").val(),
			profilepic: $("#fileStuff").val(),
			myName: $("#name").val(),
			age: $("#age").val(),
			experiencelvl: $("#experiencelvl").val(),
			language: $("#PL").val()
		}, 
		success: function(data){
			alert(data.value);
		}
	});
};
function buttonUpdate(){
	//alert("signupClick");
	$.ajax({
		url:"/buttonUpdate",
		type:"PUT",
		data:{
			username: $("#username").val(),
			password: $("#password").val(),
			confirmPassword: $("#confirmPassword").val(),
			profilepic: $("#fileStuff").val(),
			myName: $("#name").val(),
			age: $("#age").val(),
			experiencelvl: $("#experiencelvl").val(),
			language: $("#PL").val(),
			description: $("#bio").val()
		}, 
		success: function(data){
			alert(data.value);
		}
	});
	window.location = "myProfile";
};
$(document).ready(function(){
	window.onload = function(){
		$.ajax({
			url: '/sessionUser',
			type: 'GET',
			data: {},
			success: function(data){
				console.log(data);

				if(data){
					if(data.user){
						$('#buttonSignup').css('display','none');
						$('#buttonUpdate').css('display','inline');
						$('#profilepic').css('display','none');
						$('#header').html('Update Information');
					}
				}else{
					$('#buttonSignup').css('display','inline');
					$('#buttonUpdate').css('display','none');
					$('#profilepic').css('display','inline');
					$('#header').html('Sign Up');
				}
			}
		});
	};
	$("#login").click(login);
	$("#signup").click(signup);
	$("#browse").click(browse);
	$("#help").click(help);
	$("#home").click(home);
	$("#buttonUpdate").click(buttonUpdate);
});