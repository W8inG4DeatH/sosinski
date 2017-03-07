(function(){
  
    var app = angular.module('myControllers', ['myDirectives', 'myServices', 'ngMaterial']);
  
    app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

        $routeProvider
            .when('/artykuly/poznan-media-expo', {
                controller: 'articlesController',
                templateUrl: 'views/artykuly/poznan-media-expo.html',
                label: 'Poznań Media Expo'
            })
            .otherwise({
                redirectTo: '/artykuly/poznan-media-expo'
            });            

        $locationProvider
            .html5Mode(true);
            
    }]);
 
    app.controller('myController', ['$rootScope', '$scope', '$http', '$timeout', '$window', '$location', '$anchorScroll', 'mainService', 'getWWWData', function($rootScope, $scope, $http, $timeout, $window, $location, $anchorScroll, mainService, getWWWData) {

        $scope.actualYear = new Date().getFullYear();


        $scope.showWebsiteData = { 
            a1 : {mode: "FadeIn", selector: ".anim-1", stepTime: 500, delayTime: 0},
            a2 : {mode: "FadeIn", selector: ".anim-2", stepTime: 500, delayTime: 0},
            a3 : {mode: "FadeIn", selector: ".anim-3", stepTime: 500, delayTime: 0},
            a4 : {mode: "FadeIn", selector: ".anim-4", stepTime: 500, delayTime: 0}
        };

        $scope.activeSelector = '#site-header';

        $(window).load(function() {
            
            $(window).scroll(function() {

                $timeout.cancel($scope.timeScroll);

                $scope.timeScroll = $timeout(function() {

                    var windowElement = $(window);
                    var windowScrollTop = windowElement.scrollTop();
                    var bgImage = $('.bg-image');
                    var bgImageContainer = $('.bg-container');

                    var siteArticle = $('#site-article').offset().top - windowScrollTop;
 
                    if (siteArticle <= 0) {
                        // console.log('siteArticle');
                        // bgImage.attr('src', 'img/bg_'+3+'.jpg');
                        bgImageContainer.removeClass('bg-container-1').addClass('bg-container-2');
                        $scope.activeSelector = '#site-article';
                    } else {
                        // console.log('siteHeader');
                        // bgImage.attr('src', 'img/bg_'+1+'.jpg');
                        bgImageContainer.removeClass('bg-container-2').addClass('bg-container-1');
                        $scope.activeSelector = '#site-header';
                    }

                }, 300);

            });

            $scope.OnWindowResize();
            $scope.IntervalInit();

            $('.siteLoader').hide();

            mainService.ShowWebsite($scope.showWebsiteData);

        });

        $( window ).resize(function() {
            $scope.OnWindowResize();
        });

        $scope.OnWindowResize = function() {
            /*
            var width = $( window ).width();
            var height = $( window ).height();
            var bgContainer = $('.bg-container');
            if ( width > (1280/800) * height ) {
                bgContainer.width(width);
                bgContainer.height(800 * width / 1280);
                var topOffset = (height - bgContainer.height()) / 2;
                bgContainer.css({top:topOffset, left:0});
            } else {
                bgContainer.height(height);
                bgContainer.width(1280 * height / 800);
                var leftOffset = (width - bgContainer.width()) / 2;
                bgContainer.css({top:0, left:leftOffset});
            }
            // features
            $scope.featureElementHeight = $(".feature-element-container").height();
            $scope.featureBElementHeight = $(".feature-element-B-container").height() * 1.5;
            $('.feature-element-container').css({"height": $scope.featureElementHeight, "min-height": $scope.featureElementHeight, "max-height": $scope.featureElementHeight});
            $('.feature-element-B-container').css({"height": $scope.featureBElementHeight, "min-height": $scope.featureBElementHeight, "max-height": $scope.featureBElementHeight});            
            */
        };

        $scope.IntervalInit = function() {
            /*
            setInterval(function() {
            }, $scope.quadButtonsAutoStep);
            */
        };

        $scope.SetBG = function(numer) {
            var bgImage= $('.bg-image');
            var path = 'img/bg_'+numer+'.jpg';
            bgImage.attr('src', path);
        };

        $scope.ScrollSite = function(sectorSelector) {
            var windowElement = $(window);
            var windowScrollTop = windowElement.scrollTop();            
            var sectorTopOffset = $(sectorSelector).offset().top;
            $('html, body').animate({
                scrollTop: sectorTopOffset
            }, 1000);
        };

        $scope.SlideUpAndDownByClass = function(elementClass) {
            $(elementClass).slideUp($scope.slideTime).slideDown($scope.slideTime);
        };

        $scope.childsSlided = [];
        $scope.SlideUpAndDownChildByClass = function(e,elementChildClass) {
            if ($scope.childsSlided[elementChildClass] !== true)
            {
                $(e.currentTarget).find(elementChildClass).slideUp($scope.slideTime).slideDown($scope.slideTime);
                $scope.childsSlided = [];
                $scope.childsSlided[elementChildClass] = true;                
            }
        };

        $scope.SlideUpChildByClass = function(e,elementChildClass) {
            $(e.currentTarget).find(elementChildClass).slideUp($scope.slideTime);
        };
        $scope.SlideDownChildByClass = function(e,elementChildClass) {
            $(e.currentTarget).find(elementChildClass).slideDown($scope.slideTime);
        };

    }]); 

    app.controller('articlesController', ['$scope', 'mainService', function($scope, mainService){
        angular.element(document).ready(function() {

        });

    }]);

})();