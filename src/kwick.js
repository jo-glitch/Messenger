const app = {
	kwick_api_url: 'http://greenvelvet.alwaysdata.net/kwick/api/',
	init: function() {
		

		// $('#submit').on('click', app.signup);
		// app.ping();
		$('#submit').on('click', app.signup);
		$("#connexion").on('click', app.login);
		$("#logout").on('click',app.logout);
		$('#contact').on('click',app.logged);
		// $("#contact");

	},
	ping: function() {
		$.ajax({
			url: app.kwick_api_url + 'ping',
			dataType: 'jsonp',
			type: 'POST',
			contentType: 'application/json; charset=utf-8',
			success: function(result, status, xhr) {
				console.log(result);
				localStorage.setItem('time', result.kwick.completed_in);
			},
			error: function(xhr, status, error) {
				alert('Error');
			}
		});
	}, 
	// INSCRIPTION
    signup: function() {
		let user_name = $('#user_name').val();
		let password = $('#pass').val();
		// let password1 = $('#pass1').val();
		let email = $('#mail').val();
        $.ajax({
			url: app.kwick_api_url + 'signup' + '/' + user_name + '/' + password,
			dataType: "jsonp", // jsonp
			type: "POST",
			contentType: "application/json; charset=utf-8",
			success: function (result, status, xhr) {
				localStorage.setItem('name', result.result.token);
                localStorage.setItem('email', result.result.token);
				localStorage.setItem('password', result.result.id);
				//affichage
				// localStorage.getItem('name', user_name);
				// localStorage.getItem('email', email);
				// localStorage.getItem('password', password);
				console.log(localStorage.getItem('name', user_name));
				console.log(localStorage.getItem('email', email));
				console.log(localStorage.getItem('password', password));
				window.location.href = 'conv.html'
				// alert("vous êtes bien inscrit");
				// $.get( "conv.html", function( data ) {
				// 	$( "body" ).html( data );
				//   });
				console.log(result);
			},
			error: function (xhr, status, error) {
				console.log("error");
			}
		});
	},
	// CONNEXION SI DEJA INSCRIT
	login: function(){
		let login_name = $('#log_name').val();
		let login_pass = $('#log_pass').val();
		$.ajax({
			url: app.kwick_api_url + 'login' + '/' + login_name + '/' + login_pass,
			dataType: 'jsonp',
			type: 'POST',
			contentType: "application/json; charset=utf-8",
			success: function(result, status, xhr){
				// stockage de données
				localStorage.setItem('token', result.result.token);
				localStorage.setItem('id', result.result.id);
				// affichage
				console.log(localStorage.getItem('id', login_name));
				console.log(localStorage.getItem('token', login_pass));
				window.location.href = 'conv.html'
				console.log(result);
				
			},
			error: function(xhr, status, error){
				console.log("error")
			}
		});
	},
		// DECONNEXION
	 logout: function(){
		 let token = localStorage.getItem('token');
		 let id = localStorage.getItem('id');
	 	$.ajax({
			url : app.kwick_api_url + 'logout' + '/' + token + '/' + id,
	 		dataType: 'jsonp',
	 		type: 'POST',
	 		contentType: "application/json; charset=utf-8",
	 		success: function(result, status, xhr){

				window.location.href = 'login.html';
				
	 		},
	 		error: function(xhr, status, error){
				 console.log("error");
	 		}
	 	});
	 },
	 logged: function(){
		let token = localStorage.getItem('token');
		 $.ajax({
			url : app.kwick_api_url + 'user/' + 'logged/' + token,
	 		dataType: 'jsonp',
	 		type: 'POST',
			 contentType: "application/json; charset=utf-8",
			 success: function(result, status, xhr){

				// window.location.href = 'login.html';
				
				console.log(result);
				
	 		},
	 		error: function(xhr, status, error){
				 console.log("error");
	 		}
	 	});
	 },
	
};
