use budge

userId = new ObjectId()
budgetId = new ObjectId()
rangeId = new ObjectId()
cat1Id = new ObjectId()
cat2Id = new ObjectId()

db.users.insert({'_id' : userId, 'username' : 'goku','email' : 'kakarot@saiyan.com', 'password' : '12345', 'budgetId' : budgetId})

db.budgets.insert({'_id' : budgetId, 'budgetRangeId' : rangeId})

db.budgetRanges.insert({'_id' : rangeId, 'categoryIds' : '1', 'startDate' : new ISODate("2018-01-01T00:00:00Z"), 'endDate' : new ISODate("2018-02-01T00:00:00Z"), 'userId' : userId})

db.categories.insert({'_id' : cat1Id, 'title' : 'Groceries', 'imageURL' : '/images/groceries-large.jpeg', 'amount' : 500.00, 'budgetRangeId' : rangeId})
db.categories.insert({'_id' : cat2Id, 'title' : 'Restaurants', 'imageURL' : '/images/restaurants-large.jpeg', 'amount' : 150.00, 'budgetRangeId' : rangeId})

db.expenses.insert({'categoryId' : cat1Id, 'amount' : 25.43, 'date' : new ISODate("2018-01-11T00:00:00Z"), 'description' : 'Trader Joe\'s Groceries'})
db.expenses.insert({'categoryId' : cat1Id, 'amount' : 75.71, 'date' : new ISODate("2018-01-20T00:00:00Z"), 'description' : 'HEB Groceries'})
db.expenses.insert({'categoryId' : cat1Id, 'amount' : 90.12, 'date' : new ISODate("2018-01-29T00:00:00Z"), 'description' : 'Target'})
db.expenses.insert({'categoryId' : cat1Id, 'amount' : 6.66, 'date' : new ISODate("2017-12-29T00:00:00Z"), 'description' : 'BAD BAD'})
db.expenses.insert({'categoryId' : cat1Id, 'amount' : 66.66, 'date' : new ISODate("2018-02-29T00:00:00Z"), 'description' : 'ALSO BAD'})

db.expenses.insert({'categoryId' : cat2Id, 'amount' : 13.24, 'date' : new ISODate("2018-01-20T00:00:00Z"), 'description' : 'Cougar Country'})
db.expenses.insert({'categoryId' : cat2Id, 'amount' : 25.12, 'date' : new ISODate("2018-01-29T00:00:00Z"), 'description' : 'Red Bento'})
