/*********************** FUNCTION: buildCategoryView *************************
- A #wrapper view
- Clears the wrapper and adds all elements necessary to build a view that
  displays details regarding that category (i.e. expenses and current budget)
******************************************************************************/

function buildCategoryView(currentCategoryId) {
	// Empty the wrapper
	$('#wrapper').empty();

	// Set the current category
	var currentCategory;
	$.each(budgeUser.currentRangeCategories, function(index, cat) {
		if(cat._id === currentCategoryId) {
			currentCategory = cat;
		}
	});

	var catCircle;

	// Update the background image based on the current category
	$('body').css('background-image', 'url(' + currentCategory.imageURL + ')');

	// Initialize the view type
	/*
	var isLandscape = true;
	var catCircle;
	if($(window).width() > $(window).height()) {
		catCircle = new BudgeCircle(currentCategory, $(window).width()/7);
		renderLandscape();
	} else {
		catCircle = new BudgeCircle(currentCategory, $(window).height()/4);
		renderPortrait();
		isLandscape = false;
	}
	*/

	// Create the base table for the view
	var categoryViewTable = document.createElement('table');
	categoryViewTable.insertRow(0).id = 'categoryViewRow';
	categoryViewTable.style.margin = 'auto';
	categoryViewTable.style.height = '100%';
	$('#wrapper').append(categoryViewTable);

	// Set up the visualizer
	var visualizerCell = document.createElement('td');
	visualizerCell.id = 'visualizerCell';

	$('#categoryViewRow').append(visualizerCell);
	updateVisualizerCell();

	/*********** FUNCTION updateVisualizerCell *************
	- Updates the left side of the view (or full view if in
	  portrait mode) any time expenses are changed
	*******************************************************/

	function updateVisualizerCell() {
		visualizerCell.innerHTML = 
			'<table style="height: 100%; margin: auto">' +
				'<tr id="remainingRow" style="height: 0px">' +
					'<td>' +
						'<table style="width: 100%">' +
							'<tr style="height: 100%">' +
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
				'<tr id="budgetRow" style="height: 0px">' +
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
			'</table>';

		catCircle = new BudgeCircle(currentCategory, $(window).width()/7);
		// Add the circle container to the screen
		$('#circleCell').append(catCircle.container);
	}

	// Set up the expense table
	var expenseTableCell = document.createElement('td');
	expenseTableCell.id = 'expenseTableCell';
	expenseTableCell.style.width = 'calc(100vw * 2 / 3)';
	updateExpenseTableCell();

	/*********** FUNCTION updateExpenseTableCell ***********
	- Updates the right side of the view (if in landscape
	  mode) any time expenses are changed
	********************************************************/

	function updateExpenseTableCell() {
		// Get all expenses for current category
		var expenseRows = '';
		$.each(budgeUser.currentRangeExpenses, function(index, expense) {
			if(expense.categoryId === currentCategory._id) {
				expenseRows += '<tr class="expenseRow" data-id=' + expense._id + '><td>' + expense.date + '</td><td>' + expense.description + '</td><td>$' + parseFloat(expense.amount).toFixed(2) + '</td></tr>';
			}
		});

		expenseTableCell.innerHTML =
			'<div style="width: calc(100% - 30px); background-color: rgba(0,0,0,0.5); margin: 10px; padding: 5px; border-radius: 10px;">' +
				'<div style="max-height: 60vh; overflow-y: scroll;">' +
					'<table style="width: 100%; font-family: geosans; color: white; text-align: center;">' +
						'<tr>' +
							'<th>Date</th>' +
							'<th>Description</th>' +
							'<th>Amount</th>' +
						'</tr>' +
						expenseRows +
					'</table>' +
				'</div>' +
				'<hr style="width: 90%; height: 2px; border: none; background-color: white;">' +
				'<table style="width: 100%; text-align: center;">' +
					'<tr>' +
						'<td style="border-radius: 10px;"><h2 id="addExpense" style="font-size: 20pt; line-height: normal">Add Expense</h2></td>' +
						'<td style="border-radius: 10px;"><h2 id="addMultiple" style="font-size: 20pt; line-height: normal">Add Multiple</h2></td>' +
					'</tr>' +
				'</table>' +
			'</div>';
	}

	
	function renderLandscape() {
		$('#wrapper').html(
			'<table style="height: 100%; margin: auto;">' +
				'<tr>' +
					'<td>' +
						'<table style="margin: auto;">' +
							'<tr id="remainingRow">' +
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
							'<tr id="budgetRow">' +
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
							'<div style="max-height: 60vh; overflow-y: scroll;">' +
								'<table style="width: 100%; font-family: geosans; color: white; text-align: center;">' +
									'<tr>' +
										'<th>Date</th>' +
										'<th>Description</th>' +
										'<th>Amount</th>' +
									'</tr>' +
									expenseRows +
								'</table>' +
							'</div>' +
							'<hr style="width: 90%; height: 2px; border: none; background-color: white;">' +
							'<table style="width: 100%; text-align: center;">' +
								'<tr>' +
									'<td style="border-radius: 10px;"><h2 id="addExpense" style="font-size: 20pt; line-height: normal">Add Expense</h2></td>' +
									'<td style="border-radius: 10px;"><h2 id="addMultiple" style="font-size: 20pt; line-height: normal">Add Multiple</h2></td>' +
								'</tr>' +
							'</table>' +
						'</div>' +
					'</td>' +
				'</tr>' +
			'</table>'
		);

		// Add the circle container to the screen
		$('#circleCell').append(catCircle.container);

		/****************************** ADD EXPENSE ********************************
		// Handle expense adding by building a new expense view with default values
		***************************************************************************/

		$('#addExpense').hover(hoverCell);
		$('#addMultiple').hover(hoverCell);

		$('#addExpense').mouseout(mouseOutCell);
		$('#addMultiple').mouseout(mouseOutCell);

		function hoverCell() {
			$(this).css('color', 'black');
			$(this).css('cursor', 'pointer');
			$(this).css('transition', 'all 1s');
			$(this).parent().css('background-color', 'white');
			$(this).parent().css('transition', 'all 0.5s');
		}

		function mouseOutCell() {
			$(this).css('color', 'white');
			$(this).css('transition', 'all 0.5s');
			$(this).parent().css('background-color', 'transparent');
			$(this).parent().css('transition', 'all 0.25s');
		}


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

		/************************* SWITCH CATEGORIES **********************************
		- Handle switching categories when clicking on the circle
		*******************************************************************************/

		$('#circleCell').click(function() {
			var nextCatIndex = budgeUser.currentRangeCategories.indexOf(currentCategory) + 1;
			if(nextCatIndex >= budgeUser.currentRangeCategories.length) {
				nextCatIndex = 0;
			}
			buildCategoryView(budgeUser.currentRangeCategories[nextCatIndex]._id);
		});
	}

	function renderPortrait() {
		$('#wrapper').html(
			'<table style="height: 100%; margin: auto;">' +
				'<tr>' +
					'<td id="visualizerCell">' +
						'<table style="height: 100%; margin: auto">' +
							'<tr id="remainingRow" style="height: 0px">' +
								'<td>' +
									'<table style="width: 100%">' +
										'<tr style="height: 100%">' +
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
							'<tr id="budgetRow" style="height: 0px">' +
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
				'</tr>' +
			'</table>'
		);

		// Add the circle container to the screen
		$('#circleCell').append(catCircle.container);

		/************************* SWITCH CATEGORIES **********************************
		- Handle switching categories when clicking on the circle
		*******************************************************************************/
		
		$('#circleCell').click(function() {
			var nextCatIndex = budgeUser.currentRangeCategories.indexOf(currentCategory) + 1;
			if(nextCatIndex >= budgeUser.currentRangeCategories.length) {
				nextCatIndex = 0;
			}
			buildCategoryView(budgeUser.currentRangeCategories[nextCatIndex]._id);
		});
	}

	// Draw the circle
	catCircle.draw();

	// Handle window resize events
	$(window).resize(function() {
		if($(window).width() > $(window).height()) {
			catCircle.resize($(window).width()/7);
			if(!isLandscape) {
				renderLandscape();
				isLandscape = true;
			}
		} else {
			catCircle.resize($(window).height()/4);
			if(isLandscape) {
				renderPortrait();
				isLandscape = false;
			}
		}
		catCircle.draw();
	});
}