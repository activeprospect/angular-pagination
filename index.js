define(function(require){
  var $ = require('jquery');
  var angular = require('angular');

  angular.module('Pagination', [])
    .directive('pages', ['$compile', function($compile){
      return {
        compile: function(tElem, tAttrs){
          var pages = tElem.find('> page').detach();
          return {
            post: function(scope, el){
              var currentPage;
              var changePage = scope.changePage = function(page) {
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
