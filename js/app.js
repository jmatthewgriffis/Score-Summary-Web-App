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
		this.setActive = function(index)
		{
			this.active = index;
		}
		this.checkActive = function(index)
		{
			return (this.active === index);
		};
		this.addReview = function()
		{
			if (debug) { console.log(this.review); }
			this.products.push(this.review);
			this.review = {};
		};
		this.startEditing = function(index)
		{
			event.stopPropagation();
			this.stopEditing();
			var tmp = event.srcElement.firstElementChild;
			if (debug) { console.log(tmp); }
			$(tmp).removeClass('hidden').addClass('activeField').focus();

			if (this.active === index) { return; } // Already editing

			this.review = this.products[index];
			this.setActive(index);
			if (debug) { console.log("editing entry: " + this.active); }
		};
		this.stopEditing = function(index)
		{
			$('.activeField').removeClass('activeField').addClass('hidden');
			//this.products[index] = this.review;
			if (debug && index !== undefined) { console.log('edited entry: ' + index); }
			this.review = {};
			this.setActive(-1);
		};
		this.stopProp = function()
		{
			event.stopPropagation();
		}
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