(function()
{
	var app = angular.module('directives', []);

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
})();