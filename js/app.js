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
		this.review = {};
		this.addReview = function()
		{
			// this.review.createdOn = Date.now();
			if (debug) { console.log(this.review); }
			this.products.push(this.review);
			this.review = {};
		};
	});

	var students =
	[
		{
			name: 'Mary',
			score: 75
		},
		{
			name: 'Tyler',
			score: 32
		},
		{
			name: 'Moore',
			score: 100
		}
	];
})();