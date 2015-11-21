(function()
{
	var app = angular.module('gemStore', ['store-directives']);

	app.controller('StoreController', ['$http', function($http)
	{
		this.products = students;

		/*var store = this;
		store.products = [];	
		$http.get('json/products.json').success(function(data)
		{
			store.products = data;
		});*/
	}]);

	app.controller('ReviewController', function()
	{
		this.review = {};
		this.addReview = function(product)
		{
			this.review.createdOn = Date.now();
			product.reviews.push(this.review);
			this.review = {};
		};
	});

	var students =
	[
		{
			name: 'Mary',
			grade: 75
		},
		{
			name: 'Tyler',
			grade: 32
		},
		{
			name: 'Moore',
			grade: 90
		}
	];
})();