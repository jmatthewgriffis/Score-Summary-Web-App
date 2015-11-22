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
		this.active = -1;
		this.review = {};
		this.addReview = function()
		{
			// this.review.createdOn = Date.now();
			if (debug) { console.log(this.review); }
			this.products.push(this.review);
			this.review = {};
		};
		this.editEntry = function(index)
		{
			this.review = this.products[index];
			this.active = index;
			if (debug) { console.log("editing entry: " + this.active); }
		};
		this.doneEditingEntry = function(index)
		{
			if (debug) { console.log('edited entry: ' + index); }
			this.review = {};
			this.editEntry(-1);
		}
		this.checkActive = function(index)
		{
			return (this.active === index);
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