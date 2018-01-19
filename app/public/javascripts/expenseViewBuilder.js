/*********************** FUNCTION: buildCategoryView *************************
- A #wrapper view
- Overlays the wrapper and adds all elements necessary to build a view that
  displays details regarding an expense (i.e. adding new and updating)
******************************************************************************/

function buildExpenseView(expense) {
	// Create overlay
	var expenseWrapper = document.createElement('div');
	expenseWrapper.id = 'expenseWrapper';
	$('#wrapper').after(expenseWrapper);

	// Get category options based on current range
	var categoryOptions = '';
	$.each(budgeUser.currentRangeCategories, function(index, cat) {
		var selected = '';
		if(expense.categoryId === cat._id) {
			selected = ' selected';
		}
		categoryOptions += '<option data-id="' + cat._id + '" value="' + cat.title + '"' + selected + '>' + cat.title + '</option>';
	});

	// Create submit string based on whether adding or updating expenses
	var submitString = '';
	if(expense._id) {
		submitString = '<button id="btnUpdateExpense" type="button" style="margin: 5px;">Update Expense</button>' +
					   '<button id="btnDeleteExpense" type="button" style="margin: 5px; color: red">Delete Expense</button>';
	} else {
		submitString = '<button id="btnAddExpense" type="button" style="margin: 5px;">Add Expense</button>';
	}

	// Render expense view
	$('#expenseWrapper').html(
		'<div style="position: relative; width: 100%; height: 100%">' +
			'<div id="innerExpenseView">' +
				'<table style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%)">' +
					'<tr>' +
						'<td>' +
							'<form id="expenseForm" style="text-align: center;">' +
								'<h2>Category</h2>' +
								'<select name="category">' +
									categoryOptions +
								'</select></br>' +
								'<h2>Amount</h2>' +
								'<input type="text" name="amount" value="' + expense.amount.toFixed(2) + '"></br>' +
								'<h2>Date</h2>' +
								'<input type="date" name="date" value="' + expense.date + '"></br>' +
								'<h2>Description</h2>' +
								'<input type="text" name="description" value="' + expense.description + '"></br>' +
								submitString +
								'<button id="closeExpenseView" type="button" style="margin: 5px;">Cancel</button>' +
							'</form>' +
						'</td>' +
					'</tr>' +
				'</table>' +
			'</div>' +
		'</div>'
	);

	// Handle updating expense
	$('#btnUpdateExpense').click(function() {
		// Update the local expense data with inputs
		expense.categoryId = $('#expenseForm [name="category"] option:selected').data('id').toString();
		expense.amount = parseFloat($('#expenseForm [name="amount"]').val());
		expense.date = $('#expenseForm [name="date"]').val();
		expense.description = $('#expenseForm [name="description"]').val();

		/************** UNCOMMENT AFTER ROUTES BUILT **********************
		// Put updates to database
		$.ajax({
			type: 'PUT',
			data: expense,
			url: '/expenses',
			dataType: 'JSON'
		}).done(function(response) {
			// Check for post error
			if(response.msg.split(':')[0] === 'ERROR') {
				alert(response.msg);
			} else {
				getRemainders();
			}
			closeExpenseView();
			buildCategoryView.updateExpenseTableCell();
			buildCategoryView.updateVisualizerCell();
		});
		******************************************************************/

		/********* REMOVE AFTER ROUTES BUILT ***********/
		closeExpenseView();
		getRemainders();
		buildCategoryView.updateExpenseTableCell();
		buildCategoryView.updateVisualizerCell();
		/***********************************************/
	});

	// Handle deleting expense
	$('#btnDeleteExpense').click(function() {
		// Delete the local expense data
		budgeUser.currentRangeExpenses.splice(budgeUser.currentRangeExpenses.indexOf(expense),1);

		/************** UNCOMMENT AFTER ROUTES BUILT **********************
		// Request delete from database
		$.ajax({
			type: 'DELETE',
			url: '/expenses/' + expense._id
		}).done(function (response) {
			// Check for delete error
			if(response.msg.split(':')[0] === 'ERROR') {
				alert(response.msg);
			}
			closeExpenseView();
			getRemainders();
			buildCategoryView.updateExpenseTableCell();
			buildCategoryView.updateVisualizerCell();
		});
		******************************************************************/

		/********* REMOVE AFTER ROUTES BUILT ***********/
		closeExpenseView();
		getRemainders();
		buildCategoryView.updateExpenseTableCell();
		buildCategoryView.updateVisualizerCell();
		/***********************************************/
	});

	// Handle adding expense
	$('#btnAddExpense').click(function() {
		// Update the expense data with inputs
		expense.categoryId = $('#expenseForm [name="category"] option:selected').data('id').toString();
		expense.amount = parseFloat($('#expenseForm [name="amount"]').val());
		expense.date = $('#expenseForm [name="date"]').val();
		expense.description = $('#expenseForm [name="description"]').val();

		/************** UNCOMMENT AFTER ROUTES BUILT **********************
		// Push to database and retrieve the new id
		$.ajax({
			type: 'POST',
			data: expense,
			url: '/expenses',
			dataType: 'JSON'
		}).done(function(response) {
			// Check for post error
			if(response.msg.split(':')[0] === 'ERROR') {
				alert(response.msg);
			} else {
				// Update local copy
				expense._id = response.msg.split(':')[1];
				budgeUser.currentRangeExpenses.push(expense);
				getRemainders();
			}
			closeExpenseView();
			buildCategoryView.updateExpenseTableCell();
			buildCategoryView.updateVisualizerCell();
		});
		******************************************************************/

		/********* REMOVE AFTER ROUTES BUILT ***********/
		// Test add
		expense._id = staticExpenseId.toString();
		staticExpenseId++;
		// Add local copy
		budgeUser.currentRangeExpenses.push(expense);

		closeExpenseView();
		getRemainders();
		buildCategoryView.updateExpenseTableCell();
		buildCategoryView.updateVisualizerCell();
		/***********************************************/
	});

	// Handle cancelling of the form
	$('#closeExpenseView').click(function() {
		closeExpenseView();
	});

	function closeExpenseView() {
		$('#expenseWrapper').css('transition', 'opacity 0.25s');
		$('#expenseWrapper').css('opacity', '0');
		setTimeout(function() {
			$('#expenseWrapper').remove();
		},250);
	}

	// Set timeout to fade in view
	setTimeout(function() {
		$('#expenseWrapper').css('opacity', '1');
	},0);
}