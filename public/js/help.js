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
	$("#login").click(login);
	$("#signup").click(signup);
	$("#browse").click(browse);
	$("#help").click(help);
	$("#home").click(home);

    $("#qname").keydown( function( event ) {
        if(event.which === 13){
            submitClicked();
            event.preventDefault();
            return false;
        }
    });

    var quest=$('#quest');

    function displayQ(data){
   // data.user=data.user.replace(/['"]+/g, '');
    quest.append('<div'+data.qs+'</div>');
    };

    // $("#reply").keydown( function( event ) {
    //     if(event.which === 13){
    //         submitClicked();
    //         event.preventDefault();
    //         return false;
    //     }
    // });

  $("#submitButton").click(submitClicked);
//  $("#replyButton").click(replyClicked);

//quest.append('<div>' + data.ques + '</div>');
quest.append('<div>' + "hiiiiii" + '</div>');
quest.append('<div>' +  + '</div>');

//chat.append('<div class="well"><strong>'+data.user+'</strong>: '+data.msg+'</div>');

});


function submitClicked(){
    var element = document.getElementById("answer");
    if($("#topic").val() == 1){
        element.innerHTML = "You can create an account by clicking the Sign Up button at the top of the page. After you're done entering all of the information required, log in and you can start finding your perfect programming buddy.";
    }
    else if($("#topic").val() == 2){
        element.innerHTML = "If you don't have an account yet, check out topic #1. If you do, click the Login button at the top of the page. Then enter your username and password that you chose when you signed up. If you forgot your username or password, look at topic #5.";
    }
    else if($("#topic").val() == 3){
        element.innerHTML = "Go to the Browse tab and enter the characteristics of your perfect programmer. Then we will watch you with other programmers that will best fit your programming desires, from most similar to least similar, top to bottom.";
    }
    else if($("#topic").val() == 4){
        element.innerHTML = "Go to the Home tab to chat with other programmers!";
    }
    else if($("#topic").val() == 5){
        element.innerHTML = "Create a new account.";
    }
    else
        element.innerHTML = "Topic number " + $("#topic").val() + " cannot be found.";
    
    
    // $.ajax({
    //     url:"/createQuestion",
    //     type:"POST",
    //     data:{topic:$("#topic").val(), 
    //           //language:$("#language").val(), 
    //           question:$("#question").val(),
    //           //qname:$("#aname").val(),
    //          // experience:$("#experience").val()
    //          },
    //         success: function(data){
    //             var datas = data;
    //             displayQ(datas);
    //              // $("#topic").val() = data.tp;
    //              // var top = $('#topic');
    //             // $("#language").val() = data.lang;
    //             // $("#question").val() = data.ques;
    //             // $("#aname").val() = data.nam;
    //             // $("#experience").val() = data.exp;
    //            // chat.append('<div class="well"><strong>'+data.user+'</strong>: '+data.msg+'</div>');
    //             //quest.append('<div>' + data.ques + '</div>');
    //             alert(data.value);    
    //         } 
    //     });
    };

// function successSubmit(data) { 
//     console.log($("#index").val()+" | "+
//                 $("#topic").val()+" | "+
//                 $("#question").val()+" | "+
//                 $("#qname").val());
//     if(!data)
//         alert("ERROR");
//     else
//         alert("SUBMIT VALID");
// }