const app = {
	kwick_api_url: 'http://greenvelvet.alwaysdata.net/kwick/api/',
	init: function() {
		
		// app.ping();
		$('#submit').on('click', app.signup);
		$("#connexion").on('click', app.login);
		$("#logout").on('click',app.logout);
		$('#envoyez').on('click', app.say);
		setTimeout(() => {
			app.timestamp();
		}, 3000);;

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
        $.ajax({
			url: app.kwick_api_url + 'signup/' + user_name + '/' + password,
			dataType: "jsonp", // jsonp
			type: "POST",
			contentType: "application/json; charset=utf-8",
			success: function (result, status, xhr) {
				localStorage.setItem('name', result.result.token);
				localStorage.setItem('password', result.result.id);
				//affichage
				
				// console.log(localStorage.getItem('name', user_name));
				// console.log(localStorage.getItem('email', email));
				// console.log(localStorage.getItem('password', password));
				window.location.href = 'conv.html'
				
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
			url: app.kwick_api_url + 'login/' + login_name + '/' + login_pass,
			dataType: 'jsonp',
			type: 'POST',
			contentType: "application/json; charset=utf-8",
			success: function(result, status, xhr){
				// stockage de données
				localStorage.setItem('token', result.result.token);
				localStorage.setItem('name', result.result.user);
				localStorage.setItem('id', result.result.id);
				// affichage
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
			url : app.kwick_api_url + 'logout/' + token + '/' + id,
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
		let name = localStorage.getItem('name');
		 $.ajax({
			url : app.kwick_api_url + 'user/logged/' + token,
	 		dataType: 'jsonp',
	 		type: 'POST',
			 contentType: "application/json; charset=utf-8",
			 success: function(result, status, xhr){
				console.log(result);
				for(let i = 0; i < result.result.user.length; i++){

					$('#titre').after('<div class=\"container-contact\">\
					 <div class=\"connecter\"></div><img src=\"../assets/stormtrooper.gif\" alt="stormtrooper"<p class=\"prenom\" style=\'margin-right:30px\'>' + result.result.user[i] + '</p></div>');
				}
				
				
	 		},
	 		error: function(xhr, status, error){
				 console.log("error");
	 		}
	 	});
	 },
	 say: function(){
		let token = localStorage.getItem('token');
		let id = localStorage.getItem('id');
		let message = $('#text').val();
		console.log(message);
		// if(message == true){
			$.ajax({
				url : app.kwick_api_url + 'say/' + token + '/' + id + '/' + message,
				 dataType: 'jsonp',
				 type: 'POST',
				contentType: "application/json; charset=utf-8",
				success: function(result, status, xhr){
					
					console.log(result);
					
				 },
				 error: function(xhr, status, error){
					 console.log("error");
				 }
			 });
		// }
		},
		timestamp: function(){
			let token = localStorage.getItem('token');
			let id = localStorage.getItem('id');
			let timestamp = 0;
				$.ajax({
					url : app.kwick_api_url + 'talk/list/'+ token + '/' + timestamp,
					 dataType: 'jsonp',
					 type: 'POST',
					contentType: "application/json; charset=utf-8",
					success: function(result, status, xhr){
						for(let i = 0; i < result.result.talk.length; i++){
							$('#repeat').after('<div id=\"bulle-discussion\"><div id=\"utilisateur\"> <img src=\"../assets/vador.gif" alt="Dark Vador\"><div id=\"bulle\"><p class=\"text-ecrit\">' + result.result.talk[i] + '</p></div><div>')
						}
						console.log(result);
						
					 },
					 error: function(xhr, status, error){
						 console.log("error");
					 }
				 });
			},
		 
	
};
