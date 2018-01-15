/*********************** FUNCTION: buildCategoryView *************************
- A #wrapper view
- Clears the wrapper and adds all elements necessary to build a view that
  displays details regarding that category (i.e. expenses and current budget)
******************************************************************************/

function buildCategoryView() {
	// Empty the wrapper
	$('#wrapper').empty();

	// Set the current category
	var currentCategory = budgeUser.currentRangeCategories[0];

	$('body').css('background-image', 'url(' + currentCategory.imageURL + ')');

	// Create circles for each category
	var catCircles = [];
	$.each(budgeUser.currentRangeCategories, function(index, cat) {
		catCircles.push(new BudgeCircle(cat, $(window).width()/6));
	});

	// Handle window resize events
	$(window).resize(function() {
		$.each(catCircles, function(index, circle) {
			circle.resize($(window).width()/6);
			catCircles[0].draw();
		});
	});

	$('#wrapper').html(
		'<table class="verticalAlign">' +
			'<tr>' +
				'<td style="width: ' + ($(window).width()/3).toString() + 'px;">' +
					'<table>' +
						'<tr>' +
							'<td>' +
								'<table style="width: 100%">' +
									'<tr>' +
										'<td><h2>Remaining</h2></td>' +
										'<td><h3> | </h3></td>' +
										'<td><h3>$' + currentCategory.remainder.toFixed(2).toString() + '</h3></td>' +
									'</tr>' +
								'</table>' +
							'</td>' +
						'</tr>' +
						'<tr>' +
							'<td id="circleCell"></td>' +
						'</tr>' +
						'<tr>' +
							'<td>' +
								'<table style="width: 100%">' +
									'<tr>' +
										'<td><h2>Budget</h2></td>' +
										'<td><h3> | </h3></td>' +
										'<td><h3>$' + currentCategory.amount.toFixed(2).toString() + '</h3></td>' +
									'</tr>' +
								'</table>' +
							'</td>' +
						'</tr>' +
					'</table>' +
				'</td>' +
				'<td style="width: ' + ($(window).width()*2/3).toString() + 'px;">' +
				'</td>' +
			'</tr>' +
		'</table>');

	$('#circleCell').append(catCircles[0].container);

	// Draw the circle
	catCircles[0].draw();
}