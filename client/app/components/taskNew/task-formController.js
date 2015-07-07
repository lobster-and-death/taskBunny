(function(){

  angular.module('trApp').directive('mapboxForwardGeocoding', function ($http) {
    return {
      restrict: 'AE',
      scope: {
        selectedLocation: '=',
        queryResults: '=',
        options: '=',
        apiToken: '='
      },
      template: [
        '<form class="mapbbox-fgd" name="mapboxFGD"><input name="searchText" type="text" ng-focus="flagminerror=false" placeholder="{{selectedLoc || placeHolderText}}" id="mbac-searchInput" ng-minlength="minLength" ng-model="searchText" ng-keyup="!autoSuggest || search()"/>',
        // '<input type="button" value="search" id="mbfgd-searchbtn" ng-click="search(\'button\')" >',
        '<ul id="mbfgd-suggestions">',
        '<li ng-repeat="suggestion in suggestions" ng-if="autoSuggest" ng-click="!selectedLocationAvailable || useSelectedLocation($index)">{{suggestion[displayProperty] ? suggestion[displayProperty] : emptyPropertyText}}</li>',
        '</ul><div ng-show="mapboxFGD.searchText.$error.minlength || flagminerror">{{minLengthErrorText}}</div></form>'
      ].join(''),
      link: function (scope,element,attrs) {

        scope.suggestions = [];
        scope.flagminerror = false;
        scope.searchText = '';
        scope.selectedLocationAvailable = angular.isDefined(attrs.selectedLocation);
        scope.wantResults = angular.isDefined(attrs.queryResults);
        // set defaults
        scope.apiToken = scope.apiToken ? scope.apiToken : "pk.eyJ1Ijoicm9ubmllYnJvd24iLCJhIjoiZjE0NDRmMmJiZTYyNzZlY2Y2OGNhNGM5NDg3Yjc5ZjkifQ.oWwrU2zjDqgvikSLJODqvg";

        angular.extend(scope, {
          placeHolderText: 'Search for an address',
          minLengthErrorText: 'Search text must be at least %N% character(s).',
          displayProperty: 'place_name',
          excludeEntriesWithNoPlaceName: false,
          autoSuggest: true,
          emptyPropertyText: '(empty property)',
          minLength: 4,
          includeThisKeyword: undefined
        });

        if (!angular.isUndefined(scope.options)) {
          angular.extend(scope, scope.options);

        }

        scope.minLengthErrorText = scope.minLengthErrorText.replace('%N%',scope.minLength);

        scope.search = function (src) {

          if( angular.isUndefined(scope.searchText) || (src == 'button' && !scope.wantResults)){
            return;
          }
          var localSearchText,
            myurl;

          if (scope.searchText.length < scope.minLength) {
            scope.flagminerror = true;
            scope.suggestions = [];
            return;
          }

          localSearchText = encodeURI(scope.searchText);

          if (scope.includeThisKeyword) {
            if (localSearchText.toLowerCase().indexOf(scope.includeThisKeyword.toLowerCase()) < 0) {
              localSearchText += '+' + scope.includeThisKeyword;
            }
          }

          myurl = 'https://api.tiles.mapbox.com/v4/geocode/mapbox.places/' + localSearchText + '.json?access_token=' + scope.apiToken;

          $http.get(myurl)
            .success(function (data) {
              scope.suggestions = data.features.map(function (val) {
                if (scope.excludeEntriesWithNoPlaceName) {
                  if (val.place_name) {
                    return val;
                  }
                } else {
                  return val;
                }
              });
  
              if((src == 'button' && scope.wantResults)){
                scope.queryResults = scope.suggestions.slice(0);
                scope.selectedLoc = scope.searchText;
                scope.searchText = '';
                scope.suggestions = [];
              }

            })
            .error(function (data, status) {
              var errorObj = {}, msg;
              while (scope.suggestions.length > 0) {
                scope.suggestions.pop();
              }
              msg = "Error getting Mapbox data:  [" + status + " | api token used: " + scope.apiToken + "]";
              errorObj[scope.displayProperty] = msg;
              scope.suggestions.push(errorObj);
              console.log(msg);
            });
        };

        scope.useSelectedLocation = function (index) {
          scope.selectedLocation = scope.suggestions[index];
          scope.selectedLoc = scope.selectedLocation.place_name;
          scope.searchText = '';
          scope.suggestions = [];
        };
      }
    }
  });


angular.module('trApp').controller('TaskFormController', ['$scope', '$location', 'TaskService', function($scope, $location, TaskService) {
    $scope.form = {};

    $scope.myapitoken = "pk.eyJ1Ijoicm9ubmllYnJvd24iLCJhIjoiZjE0NDRmMmJiZTYyNzZlY2Y2OGNhNGM5NDg3Yjc5ZjkifQ.oWwrU2zjDqgvikSLJODqvg";

    $scope.$watchCollection('addressSelection',function(){
      if(angular.isDefined($scope.addressSelection)){
        console.log('Selected address/city/zip info');
        console.log($scope.addressSelection);
      }
    });

    $scope.$watchCollection('results',function(){
    if(angular.isDefined($scope.results)){
      console.log(results);
      //$scope.form[city] = $scope.results;
    }
});

    // http POST on form submit
    $scope.createTask = function(){
      console.log($scope.form.deadline);
      TaskService.addTask($scope.form).success(function(){
        $location.path('/tasks');
      }).catch(function(err){
        console.log(err);
        $scope.errorMessage = "task creation error";
      });
    };

    $scope.redirectCall = function() {
      $location.path('/tasks');
    };
  }
  ]);

})();

