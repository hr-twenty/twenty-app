angular.module('app.directives', [])

/**
 * Directive that checks if the URL indicates if a state is being entered with a "parameter" like
 * /conversations or /settings and temporarily disables the CSS animation for menu toggling if 
 * that's the case.
 */

	.directive('transitionCheck', function($stateParams, $timeout) {
		return {
			restrict: 'A',
			link: function(scope, element, attr) {
				if($stateParams.menuState) {
					if($stateParams.menuState) {
						element.addClass('no-animation')
						$timeout(function() {
							element.removeClass('no-animation')
						}, 100);
					}
				}
			}
		};
	});
		