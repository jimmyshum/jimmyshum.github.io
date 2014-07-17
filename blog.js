var app = angular.module('myApp',[]);

app.controller('myCtrl',  function($scope,$sce, myService) {
  //$scope.blog = "123";
  myService.get().then(function(datas) {
    console.log(datas);
    $scope.blog = $sce.trustAsHtml(datas+"");
  });
});

app.factory('myService', function($q, $http) {
  var myService = {
    get: function(){  
        var deferred = $q.defer();
        $http.get('/blog/catalog.txt')
          .then(function(result){
            console.log(result);

            var cat = result.data;
            var blogDateArr = cat.split("\n");
            var defs = [];
            var promises = [];

            for(var i=0; i<blogDateArr.length; i++) {
              defs[i] = $q.defer();
              promises[i] = defs[i].promise;
            }

            readBlogTxt(0,blogDateArr.length,blogDateArr,defs);

            $q.all(promises).then(function(datas) {
                deferred.resolve(datas);
            });
        });
        return deferred.promise;
    }
    
    
  }
  function readBlogTxt(curr,total,blogDateArr,defs){
    var dateArr,year,month,day;
    if(curr < total){
       dateArr = blogDateArr[curr].split("-");
       year = dateArr[0];
       month = dateArr[1];
       day = dateArr[2];
       var blogText = '/blog/'+year+'/'+month+'-'+day+'.txt';

       $http.get(blogText).then(function(result) {
         console.log(result);

         var lineArr = result.data.split('\n');

         //the format of the blog 

         //the opening of fieldset 
         var line = "<fieldset><legend><h3><b>";
         line += "<h3><b>" + day + "-" + month + "-" + year + "</b></h3>";
         line += "</strong></h3></legend>";

         //the text
         line += "<p class='blogText'>";
         for(var i=0;i<lineArr.length;i++){
            line += lineArr[i] + "<br/>" + '\n';
         }
         line += "</p>";

         //the end of fieldset
         line += "</fieldset>"

         defs[curr].resolve(line);
         readBlogTxt(++curr,total, blogDateArr,defs);
       });

    }

  }
  return myService;
});
