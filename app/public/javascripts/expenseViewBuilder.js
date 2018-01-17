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

	var categoryOptions = '';
	$.each(budgeUser.currentRangeCategories, function(index, cat) {
		var selected = '';
		if(expense.categoryId === cat._id) {
			selected = ' selected';
		}
		categoryOptions += '<option value="' + cat.title + '"' + selected + '>' + cat.title + '</option>';
	});

	var submitString = '';
	if(expense._id) {
		submitString = '<input type="submit" value="Update Expense" style="margin: 5px;">';
	} else {
		submitString = '<input type="submit" value="Add Expense" style="margin: 5px;">';
	}

	// Render expense view
	$('#expenseWrapper').html(
		'<div style="position: relative; width: 100%; height: 100%">' +
			'<div id="innerExpenseView">' +
				'<table style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%)">' +
					'<tr>' +
						'<td>' +
							'<form style="text-align: center;">' +
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

	$('#closeExpenseView').on('click', function() {
		$('#expenseWrapper').css('transition', 'all 1s');
		$('#expenseWrapper').css('opacity', '0');
		setTimeout(function() {
			$('#expenseWrapper').remove();
		},1000);
	});

	setTimeout(function() {
		$('#expenseWrapper').css('opacity', '1');
	},0);
}