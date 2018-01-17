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
			expenseRows += '<tr class="expenseRow" data-id=' + expense._id + '><td>' + expense.date + '</td><td>' + expense.description + '</td><td>' + expense.amount + '</td></tr>';
		}
	})

	// Render the view
	$('#wrapper').html(
		'<div style="position: relative; width: 100%; height: calc(100% - 75px);">' +
			'<table class="verticalAlign">' +
				'<tr>' +
					'<td style="width: calc(100vw / 3);">' +
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
					'<td style="width: calc(100vw * 2 / 3);">' +
						'<div style="width: calc(100% - 30px); background-color: rgba(0,0,0,0.5); margin: 10px; padding: 5px; border-radius: 10px;">' +
							'<div style="max-height: 80vh; overflow-y: scroll;">' +
								'<table style="width: 100%; font-family: geosans; color: white; text-align: center;">' +
									'<tr>' +
										'<th>Date</th>' +
										'<th>Description</th>' +
										'<th>Amount</th>' +
									'</tr>' +
									expenseRows +
									'<tr style="height: 10px;"></tr>' +
									'<tr>' +
										'<td></td>' +
										'<td style="border-radius: 10px;"><h2 id="addExpense" style="font-size: 20pt">Add Expense</h2></td>' +
										'<td></td>' +
									'</tr>' +
								'</table>' +
							'</div>' +
						'</div>' +
					'</td>' +
				'</tr>' +
			'</table>') +
		'</div>';

	// Add the circle container to the screen
	$('#circleCell').append(catCircles[0].container);

	// Draw the circle
	catCircles[0].draw();

	/****************************** ADD EXPENSE ********************************
	// Handle expense adding by building a new expense view with default values
	***************************************************************************/

	$('#addExpense').hover(function() {
		$(this).css('font-weight', 'bold');
		$(this).css('color', 'black');
		$(this).css('cursor', 'pointer');
		$(this).parent().css('background-color', 'white');
	});

	$('#addExpense').mouseout(function() {
		$(this).css('font-weight', 'normal');
		$(this).css('color', 'white');
		$(this).parent().css('background-color', 'transparent');
	});

	$('#addExpense').click(function() {
		var today = new Date();

		var newExpense = {
			categoryId: currentCategory._id,
			amount: 0.00,
			date: today.toISOString().split('T')[0],
			description: ''
		}

		buildExpenseView(newExpense);
	});

	/**************************** UPDATE EXPENSE ******************************
	- Handle expense updating by building a new expense view with the selected expense
	***************************************************************************/

	$('.expenseRow').hover(function() {
		$(this).css('font-weight', 'bold');
		$(this).css('cursor', 'pointer');
	});

	$('.expenseRow').mouseout(function() {
		$(this).css('font-weight', 'normal');
	});

	$('.expenseRow').click(function() {
		var expenseId = $(this).data('id').toString();
		$.each(budgeUser.currentRangeExpenses, function(index, expense) {
			if(expense._id === expenseId) {
				buildExpenseView(expense);
			}
		});
	});
}