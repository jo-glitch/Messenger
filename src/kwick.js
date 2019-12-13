// FOUBERT JOAN


const app = {
	kwick_api_url: 'http://greenvelvet.alwaysdata.net/kwick/api/',
	init: function() {
		
		$('#submit').on('click', app.signup);
		$("#connexion").on('click', app.login);
		$("#logout").on('click',app.logout);
		$('#envoyez').on('click', app.say);
		// app.timestamp();
	},
	ping: function() {
		$.ajax({
			url: app.kwick_api_url + 'ping',
			dataType: 'jsonp',
			type: 'GET',
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
			type: "GET",
			contentType: "application/json; charset=utf-8",
			success: function (result, status, xhr) {
				localStorage.setItem('name', result.result.token);
				localStorage.setItem('password', result.result.id);
				//affichage
				
				window.location.href = 'conv.html' //direction vers ma page conv.html
				
				console.log(result);
			},
			error: function (xhr, status, error) {
				alert('veuillez remplir');
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
			type: 'GET',
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
				alert('veuillez remplir');
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
	 		type: 'GET',
	 		contentType: "application/json; charset=utf-8",
	 		success: function(result, status, xhr){

				window.location.href = 'login.html';
				
	 		},
	 		error: function(xhr, status, error){
				 console.log("error");
	 		}
	 	});
	 },
	 // LISTE DES CONNECTER
	 logged: function(){
		let token = localStorage.getItem('token');
		let name = localStorage.getItem('name');
		 $.ajax({
			url : app.kwick_api_url + 'user/logged/' + token,
	 		dataType: 'jsonp',
	 		type: 'GET',
			 contentType: "application/json; charset=utf-8",
			 success: function(result, status, xhr){
				console.log(result);
				//boucle qui permet de recuperer la nom des personnes connecter
				for(let i = 0; i < result.result.user.length; i++){
					// place le nom du user dans le p qui est apres l'id '#titre'
					$('#titre').after('<div class=\"container-contact\">\
					 <div class=\"connecter\"></div><img src=\"../assets/stormtrooper.gif\" alt="stormtrooper"<p class=\"prenom\" style=\'margin-right:30px\'>' + result.result.user[i] + '</p></div>');
				}
				
				
	 		},
	 		error: function(xhr, status, error){
				 console.log("error");
	 		}
	 	});
	 },
	 // PERMET D'ECRIRE DANS LA MESSAGERIE
	 say: function(){
		let token = localStorage.getItem('token');
		let id = localStorage.getItem('id');
		let message = encodeURI($('#text').val());
		console.log(message);
		
			$.ajax({
				url : app.kwick_api_url + 'say/' + token + '/' + id + '/' + message,
				 dataType: 'jsonp',
				 type: 'GET',
				contentType: "application/json; charset=utf-8",
				success: function(result, status, xhr){
					
					console.log(result);
					
				 },
				 error: function(xhr, status, error){
					 console.log("error");
				 }
			 });
		},
		//PERMET DE RAFFRAICHIR LA PAGE POUR VOIR LE DERNIER MESSAGE AJOUTER
		refreshText: function(){
			let token = localStorage.getItem('token');
			$.ajax({
				url: app.kwick_api_url + 'talk/list/' + token + '/0',
				dataType:'jsonp',
				type: 'GET',
				contentType: "application/json; charset=utf-8",
				success: function(result, status, xhr){
					console.log(result);
					// place le dernier message dans le localStorage 'refresh'
					localStorage.setItem('refresh', result.result.last_timestamp);
				},
				error: function(xhr, status, error){
					console.log('error');
				}
			});
		},
		// Permet d'afficher les messages
		timestamp: function(){
			let token = localStorage.getItem('token');
			//recupere le localStorage 'refresh'
			let timestamp = 0;
				$.ajax({
					url : app.kwick_api_url + 'talk/list/'+ token + '/' + timestamp,
					dataType: 'jsonp',
					type: 'GET',
					contentType: "application/json; charset=utf-8",
					success: function(result, status, xhr){
						//boucle qui permet d'afficher les messages apres la l'id repeat
						for(let i = 0; i < result.result.talk.length; i++){
							$('#repeat').after('<div id=\"bulle-discussion\"><div id=\"utilisateur\"><img src=\"../assets/vador.gif" alt="Dark Vador\"><div id=\"bulle\"><p class=\"text-ecrit\">' + result.result.talk[i].content + '</p></div><div><div>');
							
						}
						localStorage.getItem('refresh');
						
						console.log(result);
						
					 },
					 error: function(xhr, status, error){
						 console.log("error");
					 }
				 });
			},
			
			
		 
	
};
