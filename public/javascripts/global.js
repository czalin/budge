// GLOBALS ==============================================================
var budgeUser = {
	userId: '1',
	budgetRanges: {}
};

// DOM Ready ============================================================
$(document).ready(function() {
	// Get budget ranges for current user
	$.getJSON('/budgetRanges/' + budgeUser.userId, function(data) {
		budgeUser.budgetRanges = data;
	});
});