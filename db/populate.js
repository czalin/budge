db.users.insert({'_id' : '1', 'username' : 'goku','email' : 'kakarot@saiyan.com', 'password' : '12345', 'budgetID' : '1'})

db.budgets.insert({ '_id' : '1', 'budgetRangeID' : '1'})

db.categories.insert({'_id' : '1', 'title' : 'Groceries', 'imageURL' : '/images/beach-large.jpeg', 'amount' : '500.00'})

db.budgetranges.insert({'_id' : '1', 'categoryIDs' : '1', 'startDate' : new ISODate("2018-01-01T00:00:00Z"), 'endDate' : new ISODate("2018-02-01T00:00:00Z")})

db.expenses.insert({'categoryID' : '1', 'amount' : '25.43', 'date' : new ISODate("2018-01-11T00:00:00Z"), 'description' : 'Trader Joe\'s Groceries'})
db.expenses.insert({'categoryID' : '1', 'amount' : '75.71', 'date' : new ISODate("2018-01-20T00:00:00Z"), 'description' : 'HEB Groceries'})
db.expenses.insert({'categoryID' : '1', 'amount' : '90.12', 'date' : new ISODate("2018-01-29T00:00:00Z"), 'description' : 'Target'})

