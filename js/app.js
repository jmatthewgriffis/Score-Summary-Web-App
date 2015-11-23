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
		};
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
			if (checkForIncompleteForm()) { return; }

			if (!debug) { console.log("\nclicked entry [sort index = " + iSortIndex + ", array index = " + iArrayIndex + "]."); }
			event.stopPropagation();
			this.stopEditing();

			var tmp = event.srcElement.firstElementChild;
			if (debug) { console.log(tmp); }
			$(tmp).removeClass('hidden').addClass('activeField').focus();

			if (this.active === iSortIndex) { return; } // Already editing

			this.review = this.products[iArrayIndex]; // Here is the problem. for some reason after delting an element any ones below it in the array are it is passing in the next index (+1)
			/* AHH I FIGURED IT OUT! ARRAYINDEX IS THE ASSIGNED VALUE AS A PROPERTY, IT'S NOT THE ACTUAL ARRAY INDEX, DUH! THAT IS CHANGING WHEN AN ELEMENT IS REMOVED */
			this.setActive(iSortIndex);
			if (!debug && bIsEditing) { console.log("ENTERED edit mode; started editing entry [sort index = " + iSortIndex + ", array index = " + iArrayIndex + "]."); }
		};
		this.stopEditing = function(iSortIndex, iArrayIndex)
		{
			if (checkForIncompleteForm()) { return; }

			if (!debug)
			{
				// Clicked away rather than pressing ENTER; index details are not available.
				if (iArrayIndex === undefined)
				{
					// Submitted.
					if (checkForCompleteForm()) { console.log('EXITED edit mode (via click-away); successfully edited entry.'); }
					// Did not submit.
					else
					{
						if (debug) { console.log('clicked container; no changes submitted.'); }
						return;
					}
				}
				// Pressed ENTER. Index details are available.
				else { console.log('EXITED edit mode; successfully edited entry [sort index = ' + iSortIndex  + ", array index = " + iArrayIndex + "]."); }
			}
			
			$('.activeField').removeClass('activeField').addClass('hidden');
			this.review = {};
			this.setActive(-1);
		};
		this.delete = function(iSortIndex, iArrayIndex)
		{
			this.stopEditing(iSortIndex, iArrayIndex);
			this.products.splice(iArrayIndex, 1);
			if (!debug) { console.log('DELETED entry: [sort index = ' + iSortIndex  + ", array index = " + iArrayIndex + "]."); }
		};
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
					console.log('\nevent propagation stopped.');
				}
			}
		};
		this.test = function() {
			console.log('TEST: container registered a click.');
		};

		function checkForIncompleteForm()
		{
			var foundIncompleteForm = false;
			if ($('.invalidForm').length > 0)
			{
				foundIncompleteForm = true;
				if (!debug) { console.log('cannot leave form field empty; action cancelled.'); }
			}
			return foundIncompleteForm;
		};
		function checkForCompleteForm()
		{
			var foundCompleteForm = false;
			if ($('.validForm').length > 0)
			{
				foundCompleteForm = true;
			}
			return foundCompleteForm;
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