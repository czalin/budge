// GLOBAL VARIABLES =====================================================
var budgeUser = {
	userId: '5a67f701473517625df4bfda',
	budgetRanges: [],
	currentRangeExpenses: [],
	currentRangeCategories: []
};

// DOM Ready ============================================================
$(document).ready(function() {
	// Get budget ranges for current user
	$.getJSON('/budgetRanges/' + budgeUser.userId, function(data) {
		budgeUser.budgetRanges = data;

		// Run initial queries for expenses and categories for current range
		var currentRange = budgeUser.budgetRanges[budgeUser.budgetRanges.length-1];

		// Get expenses
		$.getJSON('/expenses/' + currentRange._id, function(data) {
			budgeUser.currentRangeExpenses = data;

			// Get the categories
			$.getJSON('/categories/' + currentRange._id, function(data) {
				budgeUser.currentRangeCategories = data;

				// Calculate remaining in each category after retrieving expenses
				getRemainders();

				// Build initial view
				buildCategoryView(budgeUser.currentRangeCategories[0]._id);
			});
		});
	});
});

// GLOBAL OBJECTS AND FUNCTIONS ========================================

/************************** OBJECT: BudgeCircle *************************
- Stores canvas element to be added wherever necessary
- Handles drawing circle
************************************************************************/

function BudgeCircle(category, radius) {
	// Initialize locals
	this.title = category.title;
	this.amount = category.amount;
	this.remainder = category.remainder;
	this.imageURL = category.imageURL;
	this.radius = radius;

	// Create a container for all circle elements
	this.container = document.createElement('div');
	this.container.style.width = (this.radius*2).toString() + 'px';
	this.container.style.height = (this.radius*2).toString() + 'px';
	this.container.style.position = 'relative';
	this.container.style.margin = 'auto';

	// Create canvas element and add to container
	this.canvas = document.createElement('canvas');
	this.canvas.width = this.radius * 2;
	this.canvas.style.width = this.canvas.width;
	this.canvas.height = this.radius * 2;
	this.canvas.style.height = this.canvas.height;
	this.container.appendChild(this.canvas);

	// Create title element and add to container
	this.titleElement = document.createElement('h1');
	this.titleElement.innerHTML = this.title;
	this.container.appendChild(this.titleElement);

	// Manage the canvas art
	this.draw = function() {
		var r = this.radius - 10;
		var ctx = this.canvas.getContext('2d');
		var lineWidth = r * 0.05;

		// Draw inner circle
		ctx.beginPath();
		ctx.arc(this.radius, this.radius, r-lineWidth, 0, 2*Math.PI, false);
		ctx.fillStyle = 'rgba(0,0,0,0.5)';
		ctx.fill();
		ctx.closePath();

		// Draw the outer circle base
		ctx.beginPath();
		ctx.arc(this.radius, this.radius, r-(lineWidth/2), 0, 2*Math.PI, false);
		ctx.lineWidth = lineWidth;
		ctx.strokeStyle = 'rgba(255,255,255,0.25)';
		ctx.stroke();
		ctx.closePath();

		// Draw the outer circle percentage
		ctx.beginPath();
		ctx.arc(this.radius, this.radius, r-(lineWidth/2), 1.5*Math.PI, (1.5*Math.PI) - (this.remainder/this.amount)*2*Math.PI, true);
		ctx.lineWidth = lineWidth;
		ctx.strokeStyle = 'hsl(' + (120 * this.remainder/this.amount).toString() + ', 80%, 50%)';
		ctx.stroke();
	}

	// Update container/canvas size if necessary
	this.resize = function(newRadius) {
		this.radius = newRadius;

		this.container.style.width = (this.radius*2).toString() + 'px';
		this.container.style.height = (this.radius*2).toString() + 'px';

		this.canvas.width = this.radius * 2;
		this.canvas.style.width = this.canvas.width;
		this.canvas.height = this.radius * 2;
		this.canvas.style.height = this.canvas.height;
	}
}

/************************* FUNCTION: getCategories *************************
- Gets remainders for each category based on previously retrieved expenses
  and stores them in a new category property "remainder"
**************************************************************************/

function getRemainders() {
	// Iterate through all expenses and map categoryIds to total spent
	var spentMap = {};
	$.each(budgeUser.currentRangeExpenses, function(index, expense) {
		if(spentMap[expense.categoryId]) {
			spentMap[expense.categoryId] += expense.amount;
		} else {
			spentMap[expense.categoryId] = expense.amount;
		}
	})

	// Set remainder property of each category to category.amount - spent
	$.each(budgeUser.currentRangeCategories, function(index, cat) {
		if(spentMap[cat._id]) {
			cat.remainder = cat.amount - spentMap[cat._id];
		} else {
			cat.remainder = cat.amount;
		}
	});
}

/************************* FUNCTION: makeSafe ******************************
- Takes a string and makes it safe for HTML
***************************************************************************/
function makeSafe(unsafe) {
    return String(unsafe).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
