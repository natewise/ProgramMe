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

function refreshUsers() {
	$.ajax ({
		url: '/getUsers',
		type: 'GET',
		//data:{},
		success: function(data) {
			$('#users').empty();
			for(let i = 0; i<data.infolist.length;i++) {
				if(data.infolist[i] != null && data.user.username != data.infolist[i].username) {
					$('#users').append('<li><button onclick="specificClick('+i+
						')" class="myButton">Ban: </button> '+data.infolist[i].name+", "+ data.infolist[i].username 
				+', '+data.infolist[i].age+', '+data.infolist[i].experiencelvl+', '+data.infolist[i].languages+'</li>');
				}
			}
		}
	});
}
function specificClick(index) {
	console.log(index)
	$.ajax ({
		url: '/delete/' + index,
		type: 'DELETE',
		//data:{},
		success: function(data) {
			refreshUsers();
		}
	});
	
}
function deleteUser() {
	if($('#IndexSelect').val() === '') {
		alert('Index Empty');
		return;
	}
	$.ajax ({
		url: '/delete/' + (Number($('#IndexSelect').val()) - 1),
		type: 'DELETE',
		//data:{},
		success: function(data) {
			if(data.ERROR != undefined) {
				alert("Index Invalid");
			}
		}
	});
	refreshUsers();
}
$(document).ready(function(){
	window.onload = function(){
		$.ajax({
			url: '/sessionUser',
			type: 'GET',
			data: {},
			success: function(data){
				console.log(data.user.admin)
				if(data.user && data.user.admin){
					$('.accessDenied').css('display','none');
					$('.access').css('display','block');
					//or $('.accessDenied').show(); and $('.accessDenied').hide();
				}else{
					$('.accessDenied').css('display','block');
					$('.access').css('display','none');
				}
			}
		});
	};
	$("#login").click(login);
	$("#signup").click(signup);
	$("#browse").click(browse);
	$("#help").click(help);
	$("#home").click(home);
	$("#refresh").click(refreshUsers);
});
