$(document).ready(function(){

	// var images = ['./img/sky1.jpg','./img/sky2.jpg','./img/sky3.jpg','./img/sky4.jpg'];
	// var img = images[Math.floor(Math.random()*4)];


	// var body = document.getElementById('background');
	// body.style.background = "url(./img/sky2small.JPG) no-repeat center center fixed";
	
	var winloc = window.location.href;
	var link = winloc.substring(winloc.lastIndexOf("#")+1);
	console.log(link);
	
	if(link.charAt(0) == 'h'){
		//$('#right').load("");

	} else {
		$('#right').load("pages/"+link+".html");
		console.log(link.charAt(0));
	}
	
	$(document).find('a').on('click',function(e){
		e.preventDefault();

		var $page = $('#right');
		var hash = window.location.hash;



		switch($(this).attr('href')){
			case 'home.html':
			
				window.location = "";
					
				
				break;
			case 'work.html':

				window.location.hash = "work";
				if(window.location.hash == "#work"){
					$page.load('pages/work.html');
					console.log(window.location.hash);
				}

				break;
			case 'research.html':


				window.location.hash = "research";
				if(window.location.hash == "#research"){
					$page.load('pages/research.html');
				}


				break;
			case 'calendar.html':

				window.location.hash = "calendar";
				if(window.location.hash == "#calendar"){
					$page.load('pages/calendar.html');
				}

				break;
			case 'about.html':

				window.location.hash = "about";
				if(window.location.hash == "#about"){
					$page.load('pages/about.html');
				}

				break;
			case 'contact.html':

				window.location.hash = "contact";
				if(window.location.hash == "#contact"){
					$page.load('pages/contact.html');
				}

				break;

			case 'top.html':

				
				window.scroll(0,0);
				$('#right').scrollTop(0);
				

				break;
			}

	});






});
