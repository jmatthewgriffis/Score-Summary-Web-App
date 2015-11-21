(function()
{
	var app = angular.module('store-directives', []);

	app.directive('productTitle', function()
	{
		return {
			restrict: 'E',
			templateUrl: 'directives/product-title.html'
		};
	});

	app.directive('productDescription', function()
	{
		return {
			restrict: 'E',
			templateUrl: 'directives/product-description.html'
		};
	});

	app.directive('productSpecs', function()
	{
		return {
			restrict: 'A',
			templateUrl: 'directives/product-specs.html'
		};
	});

	app.directive('productTabs', function()
	{
		return {
			restrict: 'E',
			templateUrl: 'directives/product-tabs.html',
			controller: function()
			{
				this.tab = 1;

				this.setTab = function(currentTab)
				{
					this.tab = currentTab;
				};

				this.isSet = function(checkTab)
				{
					return this.tab === checkTab;
				};
			},
			controllerAs: 'tab'
		};
	});

	app.directive('productGallery', function()
	{
		return {
			restrict: 'E',
			templateUrl: 'directives/product-gallery.html',
			controller: function()
			{
				this.current = 0;
				this.setCurrent = function(selected){
					var tmp = 0;
					if (selected !== null) tmp = selected;
					this.current = tmp;
				};
			},
			controllerAs: 'gallery'
		};
	});
})();