(function()
{
	var app = angular.module('testScoreList', ['directives']);

	app.controller('ListController', function()
	{
		var debug = false; // Turn this on to log many helpful messages.

		this.students = [];
		this.student = {};
		this.active = -1;
		this.orderBy = '';
		this.sortText = 'when added';

		var editedIndex = -1;
		var storageIndex = 0;

		this.startNewSession = function()
		{
			localStorage.clear();
			console.log("started new session; cleared localStorage.");
			localStorage.setItem('storageWasCleared', JSON.stringify('true'));

			console.log('adding initial student data...');
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
			var tmp = // Method was called on bootup; data is passed in via arguments.
			{
				name: myName,
				score: myScore
			};
			if (myName === undefined) // Method was called via form submission; data is passed in via ng-model.
			{
				tmp = this.student;
				$('.newStudent input.name').focus();
			}

			if (debug) { console.log('ADDED entry [name = ' + tmp.name + ', score = ' + tmp.score + '].'); }
			this.students.push(tmp);
			this.student = {};

			// Write into localStorage. Entries already in storage are not rewritten.
			if (myName === undefined || needsToBeStored)
			{
				var tmpJSON = JSON.stringify(tmp);
				localStorage.setItem(storageIndex, tmpJSON);
				if (debug) { console.log('added entry to localStorage.'); }
			}
			storageIndex++; // This may not be necessary, but is an attempt to give each item in storage a unique key.
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
			this.stopEditing(); // End any previous editing.
			editedIndex = iArrayIndex;

			var selectedInput = event.srcElement.firstElementChild;
			// if (debug) { console.log(selectedInput); }
			$(selectedInput).removeClass('hidden').addClass('activeField').focus(); // Get the focus on whatever input was clicked (previously hidden).

			this.student = this.students[iArrayIndex];
			this.setActive(iSortIndex);
			if (debug && bIsEditing) { console.log("ENTERED edit mode; started editing entry [sort index = " + iSortIndex + ", array index = " + iArrayIndex + "]."); }
		};

		this.stopEditing = function(iArrayIndex, iSortIndex, bIsDeleting)
		{
			if (checkForIncompleteForm()) { return; }

			if (iArrayIndex === undefined) // Clicked away rather than pressing ENTER; index details may not be available.
			{
				if (checkForCompleteForm()) // Submitted.
				{
					if (editedIndex !== -1) // We have reference to whatever was just being edited!
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
			else // Pressed ENTER and submitted; index details are available.
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
			// This is not the best method, since it would trip up on duplicate entries; would be better to find a way to get the correct index.
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
				if (this.students[i].score < this.minScore) { this.minScore = this.students[i].score; } // Update min.

				if (this.students[i].score > this.maxScore) { this.maxScore = this.students[i].score; } // Update max.

				sum += this.students[i].score;
			}

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