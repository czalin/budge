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

	// Get all expenses for current category
	var expenseRows = '';
	$.each(budgeUser.currentRangeExpenses, function(index, expense) {
		if(expense.categoryId === currentCategory._id) {
			expenseRows += '<tr><td>' + expense.date + '</td><td>' + expense.description + '</td><td>' + expense.amount + '</td></tr>';
		}
	})

	// Render the view
	$('#wrapper').html(
		'<div style="position: relative; width: 100%; height: calc(100% - 75px);">' +
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
						'<div style="background-color: rgba(0,0,0,0.5); margin: 10px; border-radius: 10px">' +
							'<table style="width: 100%; font-family: geosans; color: white; text-align: center">' +
								'<tr>' +
									'<th>Date</th>' +
									'<th>Description</th>' +
									'<th>Amount</th>' +
								'</tr>' +
								expenseRows +
							'</table>' +
						'</div>' +
					'</td>' +
				'</tr>' +
			'</table>') +
		'</div>';

	// Add the circle container to the screen
	$('#circleCell').append(catCircles[0].container);

	// Draw the circle
	catCircles[0].draw();
}