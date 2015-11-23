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

	app.controller('ListController', function()
	{
		var debug = true;

		this.students = students;
		this.active = -1;
		this.student = {};

		this.setActive = function(index)
		{
			this.active = index;
		};
		this.checkActive = function(index)
		{
			return (this.active === index);
		};
		this.addEntry = function()
		{
			if (debug) { console.log('ADDED entry [name = ' + this.student.name + ', score = ' + this.student.score + '].'); }
			this.students.push(this.student);
			this.student = {};
		};
		this.startEditing = function(iSortIndex, iArrayIndex, bIsEditing)
		{
			if (checkForIncompleteForm()) { return; }

			if (debug) { console.log("\nclicked entry [sort index = " + iSortIndex + ", array index = " + iArrayIndex + "]."); }

			event.stopPropagation();
			this.stopEditing();

			var selectedInput = event.srcElement.firstElementChild;
			// if (debug) { console.log(selectedInput); }
			$(selectedInput).removeClass('hidden').addClass('activeField').focus();

			if (this.active === iSortIndex) { return; } // Already editing find me yo

			this.student = this.students[iArrayIndex]; // find me yo Here is the problem. for some reason after delting an element any ones below it in the array are it is passing in the next index (+1)
			/* AHH I FIGURED IT OUT! ARRAYINDEX IS THE ASSIGNED VALUE AS A PROPERTY, IT'S NOT THE ACTUAL ARRAY INDEX, DUH! THAT IS CHANGING WHEN AN ELEMENT IS REMOVED */
			this.setActive(iSortIndex);
			if (debug && bIsEditing) { console.log("ENTERED edit mode; started editing entry [sort index = " + iSortIndex + ", array index = " + iArrayIndex + "]."); }
		};
		this.stopEditing = function(iSortIndex, iArrayIndex)
		{
			if (checkForIncompleteForm()) { return; }

			if (debug)
			{
				// Clicked away rather than pressing ENTER; index details are not available.
				if (iArrayIndex === undefined)
				{
					if (checkForCompleteForm()) // Submitted.
					{
						console.log('EXITED edit mode (via click-away); successfully edited entry.');
					}
					else // Did not submit.
					{
						if (debug && ($('.activeField').length === 0)) { console.log('clicked container; no changes submitted.'); }
						return;
					}
				}
				// Pressed ENTER; index details are available.
				else { console.log('EXITED edit mode; successfully edited entry [sort index = ' + iSortIndex  + ", array index = " + iArrayIndex + "]."); }
			}
			
			$('.activeField').removeClass('activeField').addClass('hidden');
			this.student = {};
			this.setActive(-1);
		};
		this.deleteEntry = function(iSortIndex, iArrayIndex)
		{
			this.stopEditing(iSortIndex, iArrayIndex);
			this.students.splice(iArrayIndex, 1);
			if (debug) { console.log('DELETED entry [sort index = ' + iSortIndex  + ", array index = " + iArrayIndex + "]."); }
		};
		this.stopPropagation = function(bisSubmitting)
		{
			event.stopPropagation();
			if (debug)
			{
				if (bisSubmitting) { console.log('form submitted; event propagation stopped.'); }
				else { console.log('\nevent propagation stopped.'); }
			}
		};
		this.test = function() { // find me yo
			console.log('TEST: registered a click.');
		};

		function checkForIncompleteForm()
		{
			var foundIncompleteForm = false;
			if ($('.invalidForm').length > 0)
			{
				foundIncompleteForm = true;
				if (debug) { console.log('cannot leave form field empty; action cancelled.'); }
			}
			return foundIncompleteForm;
		};
		function checkForCompleteForm()
		{
			var foundCompleteForm = false;
			if ($('.validForm').length > 0) { foundCompleteForm = true; }
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