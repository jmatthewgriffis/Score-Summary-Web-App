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
		this.startEditing = function(sortIndex, arrayIndex)
		{
			if (debug) { console.log("clicked entry: sort index = " + sortIndex + "; product.index = " + arrayIndex); }
			event.stopPropagation();
			this.stopEditing();
			var tmp = event.srcElement.firstElementChild;
			if (debug) { console.log(tmp); }
			$(tmp).removeClass('hidden').addClass('activeField').focus();

			if (this.active === sortIndex) { return; } // Already editing

			this.review = this.products[arrayIndex];
			this.setActive(sortIndex);
			if (debug) { console.log("editing entry: sort index = " + this.active + "; product.index = " + arrayIndex); }
		};
		this.stopEditing = function(sortIndex, arrayIndex)
		{
			if (!debug && arrayIndex !== undefined) { console.log('edited entry: sort index = ' + sortIndex  + "; product.index = " + arrayIndex); }
			$('.activeField').removeClass('activeField').addClass('hidden');
			this.review = {};
			this.setActive(-1);
		};
		this.delete = function(index)
		{
			this.products.splice(index, 1);
			if (debug) { console.log('deleted entry: ' + index); }
		}
		this.stopProp = function()
		{
			event.stopPropagation();
		}
	});

	var students =
	[
		{
			name: 'Mary',
			score: 75,
			index: 0
		},
		{
			name: 'Tyler',
			score: 32,
			index: 1
		},
		{
			name: 'Moore',
			score: 100,
			index: 2
		}
	];
})();