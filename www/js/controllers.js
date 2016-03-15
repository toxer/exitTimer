angular.module('time.controllers', [])

    .controller('TimeCtrl', function ($scope, $filter, $http, $ionicPopup) {
        
         function prependZero(param) {
        if (String(param).length < 2) {
          return "0" + String(param);
        }
        return param;
      }

      function epochParser(val) {
        if (val === null) {
          return "00:00";
        } else {
        
            var hours = parseInt(val / 3600);
            var minutes = (val / 60) % 60;

            return (prependZero(hours) + ":" + prependZero(minutes));
          
        }
      }
        //salvataggio e retrive dei dati
       
        var lastData = null



        $scope.sendMail = function () {
            
            var body = "<html><body><h2>Riepilogo timbrature</h2> <br><b>Entrata</b> "+epochParser($scope.enterTime.inputEpochTime)+"<br>"+"<b>Uscita pranzo</b> "+epochParser($scope.exitLunchTime.inputEpochTime)+"<br>"+"<b>Rientro pranzo</b> "+epochParser($scope.enterLunchTime.inputEpochTime)+"<br>"+"<b>Uscita dopo 7 ore</b> "+epochParser($scope.toWork7)+"<br>"+"<b>Uscita dopo 8 ore</b> "+epochParser($scope.toWork8)+"<br>"
         
          //  console.info(body)
            if (window.plugins && window.plugins.emailComposer && $scope.mailTo) {
                window.plugins.emailComposer.showEmailComposerWithCallback(function (result) {
                    console.log("Response -> " + result);
                },
                    "Riepilogo timbrature del " + lastData, // Subject
                    body,                      // Body
                    [$scope.mailTo],    // To
                    null,                    // CC
                    null,                    // BCC
                    true,                   // isHTML
                    null,                    // Attachments
                    null);                   // Attachment Data
            }
        }





        $scope.$on('$ionicView.enter', function () {
           
            lastData = window.localStorage['lastData']

            if (lastData == "null") {
                clearAll();


            }
            else {

                if (lastData == moment().format("DD-MM-YYYY")) {
                    $scope.enterTime.inputEpochTime = window.localStorage['enterTime']
                    $scope.exitLunchTime.inputEpochTime = window.localStorage['exitLunchTime']
                    $scope.enterLunchTime.inputEpochTime = window.localStorage['enterLunchTime']
                    calcTime();
                }
                else {
                    clearAll()

                }
            }



            $scope.serviceUrl = window.localStorage['serviceUrl']
            if ($scope.serviceUrl == null) {
                $scope.serviceUrl = 'http://vlsijsaturno001.intra.infocamere.it:8080/GSipertService/Sipert/test'
                window.localStorage['serviceUrl'] = $scope.serviceUrl;
            } else {
                $scope.serviceUrl = window.localStorage['serviceUrl']
            }



            $scope.username = window.localStorage['username']
            if ($scope.username == null) {
                $scope.username = "";

            } else {
                $scope.username = window.localStorage['username']
            }

            $scope.password = window.localStorage['password']
            if ($scope.password == null) {
                $scope.password = "";

            } else {
                $scope.password = window.localStorage['password']
            }
            $scope.mailTo = window.localStorage['mailTo']
            if ($scope.mailTo == null) {
                $scope.mailTo = "";

            } else {
                $scope.mailTo = window.localStorage['mailTo']
            }
           
           $scope.data = new Object()
            $scope.data.isMailPresent = ($scope.mailTo != null && $scope.mailTo != 'undefined')
          
        
            
        });


        function clearAll() {
            window.localStorage['lastData'] = moment().format("DD-MM-YYYY");
            window.localStorage['enterTime'] = 9 * 3600;
            window.localStorage['exitLunchTime'] = 12 * 60 * 60;
            window.localStorage['enterLunchTime'] = parseInt(window.localStorage['exitLunchTime']) + 30 * 60;
            $scope.enterTime.inputEpochTime = window.localStorage['enterTime'];
            $scope.exitLunchTime.inputEpochTime = window.localStorage['exitLunchTime'];
            $scope.enterLunchTime.inputEpochTime = window.localStorage['enterLunchTime'];
            $scope.mailTo = window.localStorage['mailTo']
            calcTime()
        }


        $scope.enterTime = {
            inputEpochTime: window.localStorage['enterTime'],  //Optional
            step: 1,  //Optional
            format: 24,  //Optional
            titleLabel: 'Entrata',  //Optional
            setLabel: 'Set',  //Optional
            closeLabel: 'Close',  //Optional
            setButtonType: 'button-positive',  //Optional
            closeButtonType: 'button-stable',  //Optional
            callback: function (val) {    //Mandatory
                enterTimeCallback(val);
            }
        };

        $scope.exitLunchTime = {
            inputEpochTime: window.localStorage['exitLunchTime'],  //Optional
            step: 1,  //Optional
            format: 24,  //Optional
            titleLabel: 'Uscita a pranzo',  //Optional
            setLabel: 'Set',  //Optional
            closeLabel: 'Close',  //Optional
            setButtonType: 'button-positive',  //Optional
            closeButtonType: 'button-stable',  //Optional
            callback: function (val) {    //Mandatory
                exitLunchTimeTimeCallback(val);
            }
        };


        $scope.enterLunchTime = {
            inputEpochTime: window.localStorage['enterLunchTime'],  //Optional
            step: 1,  //Optional
            format: 24,  //Optional
            titleLabel: 'Rientro da pranzo',  //Optional
            setLabel: 'Set',  //Optional
            closeLabel: 'Close',  //Optional
            setButtonType: 'button-positive',  //Optional
            closeButtonType: 'button-stable',  //Optional
            callback: function (val) {    //Mandatory
                enterLunchTimeTimeCallback(val);
            }
        };


        $scope.exitTime = {
            inputEpochTime: ((new Date()).getHours() * 60 * 60),  //Optional
            step: 1,  //Optional
            format: 24,  //Optional
            titleLabel: 'Uscita',  //Optional
            setLabel: 'Set',  //Optional
            closeLabel: 'Close',  //Optional
            setButtonType: 'button-positive',  //Optional
            closeButtonType: 'button-stable',  //Optional
            callback: function (val) {    //Mandatory
                exitTimeCallback(val);
            }
        };


        function enterTimeCallback(val) {
            if (typeof (val) === 'undefined') {

            } else {
                $scope.enterTime.inputEpochTime = val;
                window.localStorage['enterTime'] = val;
            }
            calcTime();
        };


        function exitLunchTimeTimeCallback(val) {
            if (typeof (val) === 'undefined') {

            } else {
                $scope.exitLunchTime.inputEpochTime = val;
                $scope.enterLunchTime.inputEpochTime = val + 30 * 60;
                window.localStorage['exitLunchTime'] = val;


            }
            calcTime();
        };

        function enterLunchTimeTimeCallback(val) {
            if (typeof (val) === 'undefined') {

            } else {
                $scope.enterLunchTime.inputEpochTime = val;
                window.localStorage['enterLunchTime'] = val;

            }
            calcTime();
        };
        function exitTimeCallback(val) {
            if (typeof (val) === 'undefined') {

            } else {
                $scope.exitTime.inputEpochTime = val;

            }
            calcTime();
        };




        $scope.resetTime = function () {
            clearAll();


        }

        $scope.nowEnter = function () {
            $scope.enterTime.inputEpochTime = ((new Date()).getHours() * 60 * 60);
            calcTime();
        }

        $scope.nowExitLunch = function () {
            $scope.exitLunchTime.inputEpochTime = ((new Date()).getHours() * 60 * 60);
            calcTime();
        }

        $scope.nowEnterLunch = function () {
            $scope.enterLunchTime.inputEpochTime = ((new Date()).getHours() * 60 * 60);
            calcTime();
        }


        $scope.sipertLogin = function () {
            console.log($scope.username)
            console.log($scope.password)
            console.log($scope.serviceUrl)
            if ($scope.username == null || $scope.password == null || $scope.username == 'undefined' || $scope.password == 'undefined') {
                return;
            }
            var requestObject = new Object();
            requestObject.username = $scope.username
            requestObject.password = $scope.password
            requestObject.data = new moment().format('DD-MM-YYYY')
            console.log($scope.serviceUrl)
            console.log($scope.serviceUrl)
            console.log(requestObject.username)
            console.log(requestObject.password)
            if ($scope.serviceUrl != null) {
                $http({
                    method: 'POST',
                    url: $scope.serviceUrl,
                    data: requestObject,
                    timeout: 5000
                })
                
                
                // $http.post($scope.serviceUrl, requestObject)
                    .success(function (data, status, header, config) {

                        if (data.errorCode != null && data.errorCode != 0) {
                            $ionicPopup.alert({
                                title: 'Errore',
                                template: data.errorMessage
                            });
                            return
                        }

                        $scope.oreEntrata = data.oreUscita
                        $scope.oreUscita = data.oreEntrata
                        
                        //sistemo le ore per sostituirle
            
                        $scope.orari = []


                        $scope.oreEntrata.forEach(function (it) {
                            $scope.orari.push(new moment(it, "HH:mm"));
                        });

                        $scope.oreUscita.forEach(function (it) {
                            $scope.orari.push(new moment(it, "HH:mm"));
                        });

                        $scope.orari.sort();
                        var o = "";
                        $scope.orari.forEach(function (it) {
                            o = o + " " + it.format("HH:mm")
                        });
                        if ($scope.orari[0] != null) {

                            enterTimeCallback((parseInt($scope.orari[0].format("HH"))) * 3600 + (parseInt($scope.orari[0].format("mm"))) * 60)
                        }
                        if ($scope.orari[1] != null) {

                            exitLunchTimeTimeCallback((parseInt($scope.orari[1].format("HH"))) * 3600 + (parseInt($scope.orari[1].format("mm"))) * 60)
                        }
                        if ($scope.orari[2] != null) {

                            enterLunchTimeTimeCallback((parseInt($scope.orari[2].format("HH"))) * 3600 + (parseInt($scope.orari[2].format("mm"))) * 60)
                        }







                    })
                    .error(function (data, status, header, config) {
                        var confirmPopup = $ionicPopup.alert({
                            title: 'Errore',
                            template: 'Mancata connessione con il server'
                        });
                    });

            }




        }


        function calcTime() {

            if ($scope.enterTime.inputEpochTime > 9 * 3600 + 30 * 60) {
                $scope.enterTime.inputEpochTime = 9 * 3600 + 30 * 60
            }

            if ($scope.enterTime.inputEpochTime < 8 * 3600 + 30 * 60) {
                $scope.enterTime.inputEpochTime = 8 * 3600 + 30 * 60
            }



            if ($scope.exitLunchTime.inputEpochTime != null && $scope.enterLunchTime.inputEpochTime != null) {
                $scope.lunch = parseInt($scope.enterLunchTime.inputEpochTime) - parseInt($scope.exitLunchTime.inputEpochTime);
            }

            if ($scope.lunch != null && $scope.lunch < 30 * 60) {
                $scope.lunch = 30 * 60;

            }



            if ($scope.enterTime.inputEpochTime != null && $scope.lunch != null) {


                $scope.toWork8 = parseInt($scope.enterTime.inputEpochTime) + (3600 * 8) + parseInt($scope.lunch)
                $scope.toWork7 = parseInt($scope.enterTime.inputEpochTime) + (3600 * 7) + parseInt($scope.lunch)





                if ($scope.toWork7 < 16 * 3600 + 30 * 60) {
                    $scope.toWork7 = 16 * 3600 + 30 * 60;
                }
                if ($scope.toWork8 < 16 * 3600 + 30 * 60) {
                    $scope.toWork8 = 16 * 3600 + 30 * 60;
                }
            }






        }
        calcTime();

    })
    .controller('DeviceCtrl', function ($scope, $http) {

    }
        )
    .controller('SetupCtrl', function ($scope, $http, $ionicPopup) {
        $scope.setup = new Object()
        $scope.$on('$ionicView.enter', function () {
            //caricamento dei dati
            $scope.setup.serviceUrl = window.localStorage['serviceUrl']
            if ($scope.setup.serviceUrl == null || $scope.setup.serviceUrl == 'undefined') {
                $scope.setup.serviceUrl = 'http://vlsijsaturno001.intra.infocamere.it:8080/GSipertService/Sipert/test'
                window.localStorage['serviceUrl'] = $scope.serviceUrl;
            } else {
                $scope.setup.serviceUrl = window.localStorage['serviceUrl']
            }

            $scope.setup.username = window.localStorage['username']
            if ($scope.setup.username == null || $scope.setup.username == 'undefined') {
                $scope.setup.username = ""

            } else {
                $scope.setup.username = window.localStorage['username']
            }

            $scope.setup.password = window.localStorage['password']
            if ($scope.setup.password == null || $scope.setup.password == 'undefined') {
                $scope.setup.password = ""

            } else {
                $scope.setup.password = window.localStorage['password']
            }

            $scope.setup.mailTo = window.localStorage['mailTo']
            if ($scope.setup.mailTo == null || $scope.setup.mailTo == 'undefined') {
                $scope.setup.mailTo = ""

            } else {
                $scope.setup.mailTo = window.localStorage['mailTo']
            }





        })



        $scope.saveData = function (setup) {


            window.localStorage['serviceUrl'] = setup.serviceUrl;
            window.localStorage['username'] = setup.username;
            window.localStorage['password'] = setup.password;
            window.localStorage['mailTo'] = setup.mailTo;
            $ionicPopup.alert({
                title: 'Salvataggio',
                template: 'I dati sono stati salvati'
            });
        }






    }).
    controller('Sipert', function ($scope, $http) {

    });
        
        
        
        
        
      
             
            
      
    


 
