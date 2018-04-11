// Code goes here
(function() {

  var app = angular.module('myApp', []);


  app.controller('myCtrl', function($scope, $rootScope) {
    $scope.quantity = ["0","1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

    $scope.coupon = "";

    $scope.item = [
    {
      "name": "thumb.jpeg", 
      "price": "99.00",
      "quantity": "0",
      "cost": "0"
    },
    {
      "name": "wentz.jpeg",
      "price": "80.00",
      "quantity": "0",
      "cost" : "0"
    },
    {
      "name": "garoppolo.jpeg", 
      "price": "99.50",
      "quantity": "0",
      "cost": "0"
    },
    {
      "name": "trubisky.jpeg",
      "price": "100.50",
      "quantity": "0",
      "cost" : "0"
    },
    {
      "name": "jones.jpeg",
      "price": "98.00",
      "quantity": "0",
      "cost" : "0"
    },
    {
      "name": "brady.jpeg", 
      "price": "100.50",
      "quantity": "0",
      "cost": "0"
    }

    ];

    $scope.cart = {
      "names": "cart.png"
    }






    $scope.getTotalBeforeTax = function(){
      $scope.totalbeforetax = 0;
      for(var i = 0; i < $scope.item.length; i++){
        var product = $scope.item[i];
        $scope.totalbeforetax += (product.price * product.quantity);
        console.log(product);
      }

      $rootScope.abc = $scope.totalbeforetax;
      return $scope.totalbeforetax;
    };



    $scope.getSalesTax = function(){
      $scope.totalSalesTax = 0;
      $scope.totalSalesTax = $scope.totalbeforetax*.0625;
      return $scope.totalSalesTax;
    };

    $scope.getTotalAfterTax = function(){
      $scope.totalAfterTax = 0;
      $scope.totalAfterTax = $scope.totalSalesTax + $scope.totalbeforetax;
      return $scope.totalAfterTax;
    };

    $scope.getTotalAfterDiscount = function(){
      var discount = 0;
      if ($scope.coupon == "DISCOUNT5"){
        discount = 5;
      }
      else if ($scope.coupon == "DISCOUNT10")
        {discount = 10;
        }
        else if($scope.coupon == "DISCOUNT15"){
          discount = 15;
        }
        else if($scope.coupon == "DISCOUNT20"){
          discount = 20;
        }

        var totalafterdiscount = $scope.totalAfterTax;
        if (discount != 0){
         totalafterdiscount -= totalafterdiscount * (discount/100);
       }
       return totalafterdiscount;
     }



   });


})();


