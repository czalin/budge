/*********************** FUNCTION: buildCategoryView *************************
- A #wrapper view
- Clears the wrapper and adds all elements necessary to build a view that
  allows a user to log in
******************************************************************************/

function buildLoginView() {
	// Empty the wrapper
	$('#wrapper').empty();

	// Create and add the circle for the login screen
	var loginCircle = new BudgeCircle({}, Math.min($('#wrapper').width()/2 - 100, $('#wrapper').height()/2 - 100));
	$('#wrapper').append(loginCircle.container);
	loginCircle.draw();

	// Add elements to wrapper for login ///////////////////////////////
	// Login Options
	var loginOptionsDiv = document.createElement('div');
	$(loginOptionsDiv).attr('id', 'loginOptionsDiv');
	$(loginOptionsDiv).addClass('loginBox');
	$(loginCircle.container).append(loginOptionsDiv);

	$(loginOptionsDiv).html(
		'<div style="position: relative; width: 100%; height: 100%">' +
			'<table class="centerElement" style="text-align: center">' +
				'<tr>' +
					'<td>' +
						'<h1 id="budgeTitle" style="position: static;">Budge</h1>' +
					'</td>' +
				'</tr>' +
				'<tr>' +
					'<td>' +
						'<hr>' +
					'</td>' +
				'</tr>' +
				'<tr>' +
					'<td>' +
						'<h3 id="loginOptions"><a id="signInA" href="#signIn">Sign In</a> | <a id="createAccountA" href="#createAccount">Create Account</a></h3>' +
					'</td>' +
				'</tr>' +
			'</table>' +
		'</div>'
	);

	if($(window).width() > $(window).height()) {
		$('.loginBox h1').css('font-size','15vh');
		$('.loginBox h3').css('font-size','5vh');
	} else {
		$('.loginBox h1').css('font-size','15vw');
		$('.loginBox h3').css('font-size','5vw');
	}

	// Login Form
	var loginFormDiv = document.createElement('div');
	$(loginFormDiv).attr('id', 'loginFormDiv');
	$(loginFormDiv).addClass('loginBox');
	$(loginCircle.container).append(loginFormDiv);

	$(loginFormDiv).html(
		'<table class="centerElement" text-align: center;>' +
			'<tr">' +
				'<td style="text-align: center;">' +
					'<h1>Sign In</h1>' +
				'</td>' +
			'</tr>' +
			'<tr>' +
				'<td style="height: 10px">' +
				'</td>' +
			'</tr>' +
			'<tr>' +
				'<td style="position: relative;">' +
			    	'<input class="effect-21" type="email" placeholder="">' +
			        '<label>Email</label>' +
			        '<span class="focus-border">' +
			        	'<i></i>' +
			        '</span>' +
				'</td>' +
			'</tr>' +
			'<tr>' +
				'<td style="height: 35px">' +
				'</td>' +
			'</tr>' +
			'<tr>' +
				'<td style="position: relative;">' +
			    	'<input class="effect-21" type="password" placeholder="">' +
			        '<label>Password</label>' +
			        '<span class="focus-border">' +
			        	'<i></i>' +
			        '</span>' +
				'</td>' +
			'</tr>' +
			'<tr>' +
				'<td style="height: 10px">' +
				'</td>' +
			'</tr>' +
			'<tr>' +
				'<td style="position: relative; height: 35px;">' +
					'<button  class="centerElement" type="button" style="width: 50%; border-radius: 9999em">Sign In</button>' +
				'</td>' +
			'</tr>' +
			'<tr>' +
				'<td style="position: relative; height: 35px;">' +
					'<button  class="centerElement" type="button" style="width: 50%; border-radius: 9999em">Cancel</button>' +
				'</td>' +
			'</tr>' +
		'</table>'
	);
	$(loginFormDiv).hide();

	$('.effect-21').change(function() {
		if($(this).val() != "") {
			$(this).addClass('has-content');
		} else {
			$(this).removeClass('has-content');
		}
	});

	// Create Account Form
	var createAccountFormDiv = document.createElement('div');
	$(createAccountFormDiv).attr('id', 'loginFormDiv');
	$(createAccountFormDiv).addClass('loginBox');
	$(loginCircle.container).append(createAccountFormDiv);
	$(createAccountFormDiv).hide();

	// Handle selections
	$('#signInA').click(function() {
		$(loginOptionsDiv).hide();
		$(loginFormDiv).show();
	});

	$('#createAccountA').click(function() {
		$(loginOptionsDiv).hide();
		$(createAccountFormDiv).show();
	});

	$(window).resize(function() {
		loginCircle.resize(Math.min($('#wrapper').width()/2 - 100, $('#wrapper').height()/2 - 100));
		loginCircle.draw();

		if($(window).width() > $(window).height()) {
			$('.loginBox h1').css('font-size','15vh');
			$('.loginBox h3').css('font-size','5vh');
		} else {
			$('.loginBox h1').css('font-size','15vw');
			$('.loginBox h3').css('font-size','5vw');
		}
	});
}