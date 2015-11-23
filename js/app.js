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

		this.students = [];
		this.active = -1;
		this.student = {};
		this.orderBy = '';
		this.sortText = 'when added';

		var storageIndex = 0;

		this.addEntry = function(myName, myScore, needsToBeStored)
		{
			// console.log('name = ' + myName + '; score = ' + myScore);
			var tmp =
			{
				name: myName,
				score: myScore
			};
			if (myName === undefined) { tmp = this.student; }

			if (debug) { console.log('ADDED entry [name = ' + tmp.name + ', score = ' + tmp.score + '].'); }
			this.students.push(tmp);
			this.student = {};

			// Write into localStorage.
			if (myName === undefined || needsToBeStored)
			{
				var tmpJSON = JSON.stringify(tmp);
				localStorage.setItem(storageIndex, tmpJSON);
				if (debug) { console.log('added entry to localStorage.'); }
			}
			storageIndex++;
		};
		this.switchOrder = function()
		{
			if (checkForIncompleteForm()) { return; }

			if (debug) { console.log('was sorting by ' + this.sortText); }
			if (this.orderBy === '') { this.orderBy = 'name'; }
			else if (this.orderBy === 'name') { this.orderBy = 'score'; }
			else { this.orderBy = ''; }
			this.sortText = this.orderBy;
			if (this.sortText === '') { this.sortText = 'when added'; }
			if (debug) { console.log('now sorting by ' + this.sortText); }
		};
		this.setActive = function(index)
		{
			this.active = index;
		};
		this.checkActive = function(index)
		{
			return (this.active === index);
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
						if (debug) { console.log('clicked container; no entries changed.'); }
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
			var tmp1 = this.students[iArrayIndex];
			var tmp2 = {};

			this.stopEditing(iSortIndex, iArrayIndex);
			this.students.splice(iArrayIndex, 1);
			if (debug) { console.log('DELETED entry [sort index = ' + iSortIndex  + ", array index = " + iArrayIndex + "]."); }

			// Remove from localStorage.
			for (var i in localStorage)
			{
				tmp2 = JSON.parse(localStorage.getItem(i));
				if ((tmp2.name === tmp1.name) && (tmp2.score === tmp1.score))
				{
					localStorage.removeItem(i);
					if (debug) { console.log('removed entry from localStorage.'); }
					break;
				}
			}
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
		this.resetSession = function()
		{
			localStorage.clear();
			location.reload();
		}

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



		// Local storage madness
		var myStudents = [
			{name: 'mary', score: 75},
			{name: 'joe', score: 32}
		];
		//var mary = {mary: 75};
		//var joe = {joe: 32};
		var studentsJSON = JSON.stringify(myStudents);

		/*var test1 = "yay";
		var test1J = JSON.stringify(test1);
		var test2 = "boo";
		var test2J = JSON.stringify(test2);
		var test3 = "uh";
		var test3J = JSON.stringify(test3);
		localStorage.setItem('test1', test1J);
		localStorage.setItem('test2', test2J);
		localStorage.setItem('test3', test3J);
		for (var i in localStorage)
		{
			console.log(localStorage.getItem(i));
		}
		test2 = "booya";
		var test2J = JSON.stringify(test2);
		localStorage.setItem('test2', test2J);
		for (var i in localStorage)
		{
			console.log(localStorage.getItem(i));
		}

		localStorage.clear();*/
		/*if (typeof(localStorage) == 'undefined' )
		{
			alert('Your browser does not support HTML5 localStorage. Try upgrading.');
		}
		else
		{
			if (localStorage.getItem('students') === null)
			{
				try
				{
					localStorage.setItem('students', studentsJSON); //saves to the database, “key”, “value”
					if (debug) { console.log('students set!'); }
				}
				catch (e)
				{
					if (e == QUOTA_EXCEEDED_ERR)
					{
						alert('Quota exceeded!'); //data wasn’t successfully saved due to quota exceed so throw an error
					}
				}
			}
			else
			{
				if (debug) { console.log('students array already exists!'); }
			}
			// if (debug) { document.write(localStorage.getItem('students')); } //Hello World!
			var studentsJSONparsed = JSON.parse(localStorage.getItem('students'));
			if (debug) { console.log(studentsJSONparsed); }
			//console.log("mary's score = " + studentsJSONparsed.mary);
			studentsJSONparsed.forEach(function(key, value)
			{
			    if (debug) { console.log(key + ' = ' + value); }
			});
			for (var i = 0; i < studentsJSONparsed.length; i++)
			{
				console.log(studentsJSONparsed[i].name);
			}
			console.log(localStorage.length);
			for (var i in localStorage)
			{
				console.log(localStorage.getItem(i));
			}
			// localStorage.removeItem('students'); //deletes the matching item from the database
			localStorage.clear();
		}*/

		// Boot-up check of localStorage.
		if (localStorage.getItem('storageWasCleared') === null)
		{
			// Initial clean.
			localStorage.clear();
			console.log("started new session; cleared localStorage.");
			localStorage.setItem('storageWasCleared', JSON.stringify('true'));

			console.log('adding initial student data...');
			// Set initial students.
			this.addEntry('Mary', 75, true);
			this.addEntry('Tyler', 32, true);
			this.addEntry('Moore', 100, true);
			console.log('finished adding initial student data.');
		}
		else
		{
			console.log("resumed existing session.");

			if (localStorage.length > 1) { console.log('loading student data from localStorage...'); }
			for (var i in localStorage)
			{
				if (localStorage.getItem(i) !== localStorage.getItem('storageWasCleared'))
				{
					var JSONparsed = JSON.parse(localStorage.getItem(i));
					// if (debug) { console.log(JSONparsed); }
					this.addEntry(JSONparsed.name, JSONparsed.score);
				}
			}
			if (localStorage.length > 1) { console.log('finished loading student data from localStorage.'); }
		}
	});
})();