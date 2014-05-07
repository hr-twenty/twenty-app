angular.module('app.directives.editing', [])

/**
 * Directive that checks if the URL indicates if a state is being entered with a "parameter" like
 * /conversations or /settings and temporarily disables the CSS animation for menu toggling if 
 * that's the case.
 */

	.directive('addItem', function($location) {
		return {
			restrict: 'A',
			template: '<',
			scope: {
				'newInterests': '='
			},
			link: function(scope, element, attr) {
				// check the $location to see if it's editable
				console.log(scope);

			}
		};
	});
