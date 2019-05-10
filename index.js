define(function(require){
  var $ = require('jquery');
  var angular = require('angular');

  angular.module('Pagination', [])
    .directive('pages', ['$compile', '$timeout', function($compile, $timeout){
      return {
        compile: function(tElem, tAttrs){
          var pages = $(tElem).find('> page').detach();
          return {
            post: function(scope, el){
              var currentPage, changing;
              var changePage = scope.changePage = function(page) {
                // If the page is already changing, let's give it 
                // a moment and try again. This gives the DOM time
                // to do it's thing to multiple pages don't render 
                // at once
                if (changing) {
                  return $timeout(function(){
                    scope.changePage(page);
                  }, 10);
                }

                changing = true;

                if ($.isNumeric(page)) {
                  // Do -1 so the API makes sense. In other words, changePage(2)
                  // will get you actual page 2 even though its index is 1
                  currentPage = (page - 1);
                } else if (page == '+') {
                  currentPage++;
                } else if (page == '-') {
                  currentPage--;
                }
                el.empty();
                el.append($compile($(pages[currentPage]).clone())(scope));
                $timeout(function(){
                  changing = false;
                }, 100);
              };
              changePage(1);
              scope.next = function(){
                scope.changePage('+');
              };
              scope.prev = function(){
                scope.changePage('-');
              };
            }
          };
        }
      };
    }])
    .directive('next', function(){
      return {
        replace: true,
        template: '<button class="primary" ng-click="next()">Next</button>'
      };
    })
    .directive('prev', function(){
      return {
        replace: true,
        template: '<button ng-click="prev()">Previous</button>'
      };
    });

});
