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
		var debug = false;

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

			this.student = this.students[iArrayIndex];
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
						if (debug) { console.log('clicked container; no changes submitted.'); }
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
		this.isScoreFailing = function(score)
		{
			var failing = false;
			if (score < 65) { failing = true; }
			return failing;
		};
		this.calcMinMaxAvg = function()
		{
			var sum = 0;

			// Initial values min and max.
			this.minScore = 100;
			this.maxScore = 0;

			for (var i = 0; i < this.students.length; i++)
			{
				// Update min.
				if (this.students[i].score < this.minScore)
				{
					this.minScore = this.students[i].score;
				}

				// Update max.
				if (this.students[i].score > this.maxScore)
				{
					this.maxScore = this.students[i].score;
				}

				// Update sum.
				sum += this.students[i].score;
			}
			// Get avg.
			var avg = sum / this.students.length;
			return avg;
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