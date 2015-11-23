(function()
{
	var app = angular.module('testScoreList', []);

	app.directive('editCurrentStudents', function()
	{
		return {
			restrict: 'E',
			templateUrl: 'directives/edit-current-students.html'
		};
	});
	app.directive('addNewStudent', function()
	{
		return {
			restrict: 'E',
			templateUrl: 'directives/add-new-student.html'
		};
	});
	app.directive('resetButton', function()
	{
		return {
			restrict: 'E',
			templateUrl: 'directives/reset-button.html'
		};
	});
	app.directive('sortControls', function()
	{
		return {
			restrict: 'E',
			templateUrl: 'directives/sort-controls.html'
		};
	});
	app.directive('statistics', function()
	{
		return {
			restrict: 'E',
			templateUrl: 'directives/statistics.html'
		};
	});
	app.directive('columnLabels', function()
	{
		return {
			restrict: 'E',
			templateUrl: 'directives/column-labels.html'
		};
	});

	app.controller('ListController', function()
	{
		var debug = false;

		this.students = [];
		this.active = -1;
		this.student = {};
		this.orderBy = '';
		this.sortText = 'when added';

		var editedIndex = -1;
		var storageIndex = 0;

		this.startNewSession = function()
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
		};
		this.resumeExistingSession = function()
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
		};
		this.addEntry = function(myName, myScore, needsToBeStored)
		{
			// console.log('name = ' + myName + '; score = ' + myScore);
			var tmp =
			{
				name: myName,
				score: myScore
			};
			if (myName === undefined)
			{
				tmp = this.student;
				$('.newStudent input.name').focus();
			}

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
		this.startEditing = function(iArrayIndex, iSortIndex, bIsEditing)
		{
			if (checkForIncompleteForm()) { return; }

			if (debug) { console.log("\nclicked entry [sort index = " + iSortIndex + ", array index = " + iArrayIndex + "]."); }

			event.stopPropagation();
			this.stopEditing();
			editedIndex = iArrayIndex;

			var selectedInput = event.srcElement.firstElementChild;
			// if (debug) { console.log(selectedInput); }
			$(selectedInput).removeClass('hidden').addClass('activeField').focus();

			this.student = this.students[iArrayIndex];
			this.setActive(iSortIndex);
			if (debug && bIsEditing) { console.log("ENTERED edit mode; started editing entry [sort index = " + iSortIndex + ", array index = " + iArrayIndex + "]."); }
		};
		this.stopEditing = function(iArrayIndex, iSortIndex, bIsDeleting)
		{
			if (checkForIncompleteForm()) { return; }

			// Clicked away rather than pressing ENTER; index details may not be available.
			if (iArrayIndex === undefined)
			{
				if (checkForCompleteForm()) // Submitted.
				{
					if (editedIndex !== -1)
					{
						if (debug) { console.log('EXITED edit mode (via click-away); successfully edited entry [array index = ' + editedIndex + '].'); }

						if (!bIsDeleting)
						{
							// Update localStorage.
							var tmpJSON = JSON.stringify(this.students[editedIndex]);
							localStorage.setItem(editedIndex, tmpJSON);
							if (debug) { console.log('updated entry in localStorage.'); }
						}
					}
				}
				else // Did not submit.
				{
					if (debug) { console.log('clicked container; no entries changed.'); }
					return;
				}
			}
			// Pressed ENTER; index details are available.
			else
			{
				if (debug) { console.log('EXITED edit mode; successfully edited entry [sort index = ' + iSortIndex  + ", array index = " + iArrayIndex + "]."); }

				if (!bIsDeleting)
				{
					// Update localStorage.
					var tmpJSON = JSON.stringify(this.student);
					localStorage.setItem(iArrayIndex, tmpJSON);
					if (debug) { console.log('updated entry in localStorage.'); }
				}
			}
			
			$('.activeField').removeClass('activeField').addClass('hidden');
			this.student = {};
			this.setActive(-1);
			editedIndex = -1;
		};
		this.deleteEntry = function(iArrayIndex, iSortIndex)
		{
			var tmp1 = this.students[iArrayIndex];
			var tmp2 = {};

			this.stopEditing(iArrayIndex, iSortIndex, true);
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
				else { console.log('event propagation stopped.'); }
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

		// Boot-up check of localStorage.
		if (localStorage.getItem('storageWasCleared') === null) { this.startNewSession(); }
		else { this.resumeExistingSession(); }

		// Thanks to http://html5tutorial.net/tutorials/working-with-html5-localstorage.html
		// Also to http://samcroft.co.uk/2013/using-localstorage-to-store-json/
		// Also to http://stackoverflow.com/questions/3138564/looping-through-localstorage-in-html5-and-javascript
		// Also to you, for reading this.
	});
})();