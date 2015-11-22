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
		this.startEditing = function(iSortIndex, iArrayIndex, bIsEditing)
		{
			if (!debug) { console.log("clicked entry [sort index = " + iSortIndex + ", array index = " + iArrayIndex + "]."); }
			event.stopPropagation();
			this.stopEditing();

			var tmp = event.srcElement.firstElementChild;
			if (debug) { console.log(tmp); }
			$(tmp).removeClass('hidden').addClass('activeField').focus();

			if (this.active === iSortIndex) { return; } // Already editing

			this.review = this.products[iArrayIndex];
			this.setActive(iSortIndex);
			if (!debug && bIsEditing) { console.log("ENTERED edit mode; started editing entry [sort index = " + iSortIndex + ", array index = " + iArrayIndex + "]."); }
		};
		this.stopEditing = function(iSortIndex, iArrayIndex)
		{
			if (!debug)
			{
				if (iArrayIndex === undefined) { console.log('stopped any previous editing; no changes submitted.'); }
				else { console.log('EXITED edit mode; successfully edited entry [sort index = ' + iSortIndex  + ", array index = " + iArrayIndex + "]."); }
			}
			
			$('.activeField').removeClass('activeField').addClass('hidden');
			this.review = {};
			this.setActive(-1);
		};
		this.delete = function(index)
		{
			this.products.splice(index, 1);
			if (debug) { console.log('deleted entry: ' + index); }
		}
		this.stopPropagation = function(bisSubmitting)
		{
			event.stopPropagation();
			if (!debug)
			{
				if (bisSubmitting)
				{
					console.log('form submitted; event propagation stopped.');
				}
				else
				{
					console.log('event propagation stopped.');
				}
			}
		}
		this.test = function() {
			console.log('TEST: container registered a click.');
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