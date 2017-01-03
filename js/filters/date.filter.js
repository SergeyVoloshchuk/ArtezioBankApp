angular.module('app.helpers')
    .filter('dateFilter', function() {

        return function(items, day, week, month) {

            Date.prototype.daysInMonth = function() {
                return 32 - new Date(this.getFullYear(), this.getMonth(), 32).getDate();
            };
            var filtered = [];
            if (day) {
                var date = getDataCurr();
                var thisDate = date.currDate + "." + date.currMonth + "." + date.currYear;


                for (var i = 0; i < items.length; i++) {
                    if (items[i].date.indexOf(thisDate) + 1) {
                        filtered[i] = items[i];
                    }

                }
            } else {
                filtered = items;
            }
            if (week) {
                console.log("op");
            }
            if (month) {
                var count = new Date().daysInMonth();
                var date = getDataCurr();
                var ind;
                var sub;
                for (var i = 0; i < items.length; i++) {
                    ind = items[i].date.indexOf(".");
                    sub = items[i].date.substr(0, ind)
                    //продумать дальше
                    if(sub<count){
                      console.log(sub);
                    }

                }

            }



            return filtered;
        };

        function getDataCurr() {
            var date = new Date();
            var currDate = date.getDate();
            var currMonth = date.getMonth() + 1;
            var currYear = date.getFullYear();
            var timeHours = date.getHours();
            var timeMinutes = date.getMinutes()

            return {
                currDate: currDate,
                currMonth: currMonth,
                currYear: currYear,
                timeHours: timeHours,
                timeMinutes
            };
        }


    });