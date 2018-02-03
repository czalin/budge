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

	// Update the background image based on the current category
	$('body').css('background-image', 'url(' + currentCategory.imageURL + ')');

	// Create the base table for the view
	var categoryViewTable = document.createElement('table');
	categoryViewTable.insertRow(0).id = 'categoryViewRow';
	//categoryViewTable.style.margin = 'auto';
	categoryViewTable.style.width = '100%';
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

	var catCircle;
	function updateVisualizerCell() {
		// Render the visualizer cell
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

		// Create the category circle based on screen orientation
		if($(window).width() > $(window).height()) {
			catCircle = new BudgeCircle(currentCategory, $(window).width()/7);
		} else {
			catCircle = new BudgeCircle(currentCategory, $(window).height()/4);
		}

		// Add the circle container to the screen
		$('#circleCell').append(catCircle.container);

		// Draw the circle
		catCircle.draw();

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
	buildCategoryView.updateVisualizerCell = updateVisualizerCell;

	// Set up the expense table
	var expenseTableCell = document.createElement('td');
	expenseTableCell.id = 'expenseTableCell';
	expenseTableCell.style.width = 'calc(100vw * 2 / 3)';
	$('#categoryViewRow').append(expenseTableCell);

	if($(window).width() < $(window).height()) {
		$('#expenseTableCell').hide();
	}
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
				expenseRows += '<tr class="expenseRow" data-id=' + expense._id + '>' + 
							       '<td style="width: 20%">' + expense.date.split('T')[0] + '</td>' + 
							       '<td style="width: 60%">' + expense.description + '</td>' + 
							       '<td style="width: 20%">$' + parseFloat(expense.amount).toFixed(2) + '</td>' + 
							    '</tr>';
			}
		});

		// Render the expense table cell
		expenseTableCell.innerHTML =
			'<div style="width: calc(100% - 30px); background-color: rgba(0,0,0,0.5); margin: 10px; padding: 5px; border-radius: 10px;">' +
				'<table style="width: calc(100% - 5px); font-family: geosans; color: white; text-align: center; margin-right: 5px;">' +
					'<tr>' +
						'<th style="width: 20%;">Date</th>' +
						'<th style="width: 60%;">Description</th>' +
						'<th style="width: 20%;">Amount</th>' +
					'</tr>' +
				'</table>' +
				'<hr style="width: 90%; height: 2px; border: none; background-color: white;">' +
				'<div style="max-height: 50vh; overflow-y: scroll;">' +
					'<table style="width:100%; font-family: geosans; color: white; text-align: center;">' +
						expenseRows +
					'</table>' +
				'</div>' +
				'<hr style="width: 90%; height: 2px; border: none; background-color: white;">' +
				'<table style="width: 100%; text-align: center;">' +
					'<tr>' +
						'<td style="border-radius: 10px;"><h2 id="addExpense" style="font-size: 20pt; line-height: normal">Add Expense</h2></td>' +
						'<td style="width: 10px"></td>' +
						'<td style="border-radius: 10px;"><h2 id="addMultiple" style="font-size: 20pt; line-height: normal">Add Multiple</h2></td>' +
					'</tr>' +
				'</table>' +
			'</div>';

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
	}
	buildCategoryView.updateExpenseTableCell = updateExpenseTableCell;

	$(window).resize(function() {
		if($(window).width() > $(window).height()) {
			$('#expenseTableCell').show();
			catCircle.resize($(window).width()/7);
			catCircle.draw();
		} else {
			$('#expenseTableCell').hide();
			catCircle.resize($(window).height()/4);
			catCircle.draw();
		}
	});
}