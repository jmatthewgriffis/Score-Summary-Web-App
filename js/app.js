(function()
{
	var app = angular.module('gemStore', ['store-directives']);

	app.controller('StoreController', ['$http', function($http)
	{
		/*var store = this;
		store.products = [];	
		$http.get('json/products.json').success(function(data)
		{
			store.products = data;
		});*/
	}]);

	app.controller('ReviewController', function()
	{
		this.products = students;
		this.editingStudent = -1;
		this.review = {};
		this.addReview = function()
		{
			// this.review.createdOn = Date.now();
			if (debug) { console.log(this.review); }
			this.products.push(this.review);
			this.review = {};
		};
		this.setActive = function(index)
		{
			this.editingStudent = index;
			if (!debug) { console.log("editing row: " + this.editingStudent); }
		};
		this.checkActive = function(index)
		{
			return (this.editingStudent === index);
		};
	});

	var students =
	[
		{
			name: 'Mary',
			score: 75,
			isActive: false
		},
		{
			name: 'Tyler',
			score: 32,
			isActive: false
		},
		{
			name: 'Moore',
			score: 100,
			isActive: false
		}
	];
})();