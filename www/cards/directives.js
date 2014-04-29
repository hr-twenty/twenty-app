// angular.module('ionic.contrib.ui.cards', ['ionic'])

//   /** 
//    * swipeCard directive that 
//    */

//   .directive('swipeCard', ['$timeout', function($timeout) {
//     return {
//       restrict: 'E',
//       template: '<div class="swipe-card" ng-transclude></div>',
//       require: '^swipeCards',
//       replace: true,
//       transclude: true,
//       scope: {
//         onSwipe: '&' //on-swipe
//       },
//       compile: function(element, attr) {
//         return function($scope, $element, $attr, swipeCards) {
//           var el = $element[0];

//           // Instantiate our card view
//           var swipeableCard = new SwipeableCardView({
//             el: el,
//             onSwipe: function() {
//               $timeout(function() {
//                 $scope.onSwipe();
//               });
//             }
//           });
//           console.log($scope.$parent);
//           $scope.$parent.swipeCard = swipeableCard;

//           swipeCards.pushCard(swipeableCard);
//           console.log('swipeCards: ', swipeCards);

//         }
//       }
//     }
//   }])

//   .directive('swipeCards', ['$rootScope', function($rootScope) {
//     return {
//       restrict: 'E',
//       template: '<div class="swipe-cards" ng-transclude></div>',
//       replace: true,
//       transclude: true,
//       scope: {},
//       controller: function($scope, $element) {
//         var swipeController = new SwipeableCardController({
//         });

//         $rootScope.$on('swipeCard.pop', function(isAnimated) {
//           swipeController.popCard(isAnimated);
//         });

//         return swipeController;
//       }
//     }
//   }])

//   .factory('$ionicSwipeCardDelegate', ['$rootScope', function($rootScope) {
//     return {
//       popCard: function($scope, isAnimated) {
//         $rootScope.$emit('swipeCard.pop', isAnimated);
//       },
//       getSwipebleCard: function($scope) {
//         return $scope.$parent.swipeCard;
//       }
//     }
//   }]);