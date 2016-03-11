angular.module('standard.directive', [])
.directive('standardTimeMeridian', function() {
  return {
    restrict: 'AE',
    replace: true,
    scope: {
      etime: '=etime'
    },
    template: "<strong>{{stime}}</strong>",
    link: function(scope, elem, attrs) {

      scope.stime = epochParser(scope.etime, 'time');

      function prependZero(param) {
        if (String(param).length < 2) {
          return "0" + String(param);
        }
        return param;
      }

      function epochParser(val, opType) {
        if (val === null) {
          return "00:00";
        } else {
          var meridian = ['AM', 'PM'];

          if (opType === 'time') {
            var hours = parseInt(val / 3600);
            var minutes = (val / 60) % 60;
            var hoursRes = hours > 12 ? (hours - 12) : hours;

            var currentMeridian = meridian[parseInt(hours / 12)];

            return (prependZero(hoursRes) + ":" + prependZero(minutes) + " " + currentMeridian);
          }
        }
      }

      scope.$watch('etime', function(newValue, oldValue) {
        
        scope.stime = epochParser(scope.etime, 'time');
     
        
      });

    }
  };
})
.directive('standardTimeNoMeridian', function() {
  return {
    restrict: 'AE',
    replace: true,
    scope: {
      etime: '=etime'
    },
    template: "<strong>{{stime}}</strong>",
    link: function(scope, elem, attrs) {

      scope.stime = epochParser(scope.etime, 'time');

      function prependZero(param) {
        if (String(param).length < 2) {
          return "0" + String(param);
        }
        return param;
      }

      function epochParser(val, opType) {
        if (val === null) {
          return "00:00";
        } else {
          if (opType === 'time') {
            var hours = parseInt(val / 3600);
            var minutes = (val / 60) % 60;

            return (prependZero(hours) + ":" + prependZero(minutes));
          }
        }
      }

      scope.$watch('etime', function(newValue, oldValue) {
        scope.stime = epochParser(scope.etime, 'time');
      });

    }
  };
})

.directive('tabsSwipable', ['$ionicGesture', function($ionicGesture){
	//
	// make ionTabs swipable. leftswipe -> nextTab, rightswipe -> prevTab
	// Usage: just add this as an attribute in the ionTabs tag
	// <ion-tabs tabs-swipable> ... </ion-tabs>
	//
	return {
		restrict: 'A',
		require: 'ionTabs',
		link: function(scope, elm, attrs, tabsCtrl){
			var onSwipeLeft = function(){
				var target = tabsCtrl.selectedIndex() + 1;
				if(target < tabsCtrl.tabs.length){
					scope.$apply(tabsCtrl.select(target));
				}
			};
			var onSwipeRight = function(){
				var target = tabsCtrl.selectedIndex() - 1;
				if(target >= 0){
					scope.$apply(tabsCtrl.select(target));
				}
			};
		    
		    var swipeGesture = $ionicGesture.on('swipeleft', onSwipeLeft, elm).on('swiperight', onSwipeRight);
		    scope.$on('$destroy', function() {
		        $ionicGesture.off(swipeGesture, 'swipeleft', onSwipeLeft);
		        $ionicGesture.off(swipeGesture, 'swiperight', onSwipeRight);
		    });
		}
	};
}])
