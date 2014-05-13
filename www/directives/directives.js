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
					element.addClass('no-animation')
					$timeout(function() {
						element.removeClass('no-animation')
					}, 300);
				}
			}
		};
	})

	.directive('disableScreen', function($ionicGesture) {
		return {
			restrict: 'E',
			link: function(scope, element) {
				window.testScope = scope;

				$ionicGesture.on('swipe', function() {
					console.log('registered swipe!');
					//hasClass('display') is a proxy for this directive being active
					element.hasClass('display') && scope.$$childHead.toggleOpenMenu();
				}, element);

				$ionicGesture.on('drag', function() {
					console.log('registered drag!');
					//hasClass('display') is a proxy for this directive being active
					element.hasClass('display') && scope.$$childHead.toggleOpenMenu();
				}, element);

				scope.$watch(
					function() {
						return scope.sideMenuContentTranslateX;
					}, function(translateVal) {
					if(Math.abs(translateVal) === 275) {
						!element.hasClass('display') && element.addClass('display');
					} else {
						element.hasClass('display') && element.removeClass('display');
					}
				});


			}
		};
	})

	.directive('loadingScreen', function() {
		return {
			restrict: 'E',
			scope: {
				'emptyDeck': '='
			},
			replace: true,
			template: '<div class="loading-screen">' + 
									'<div class="loading-animation"></div>' + 
									'<p>{{ loadingMsg }}</p>' + 
								'</div>',
			link: function(scope, element, attrs) {
				scope.loadingMsg = 'There are currently no other users in your area.';
				var $el = angular.element(element);
				scope.emptyDeck ? $el.addClass('hide') : $el.removeClass('hide');
			}
		};
	})
	;
