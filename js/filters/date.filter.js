angular.module('app.helpers')
    .filter('dateFilter', function() {

        return function(items, day, week, month, type, status) {

            Date.prototype.daysInMonth = function() {
                return 32 - new Date(this.getFullYear(), this.getMonth(), 32).getDate();
            };
            var filtered = [];
            if (day) {
                var date = getDataCurr();
                var thisDate = date.currDate + "." + date.currMonth + "." + date.currYear;


                for (var i = 0; i < items.length; i++) {
                    if (items[i].date.indexOf(thisDate) + 1) {
                        filtered.push(items[i]);
                    }

                }
            } else
            if (week) {
                var date = getDataCurr();
                var startDay = getStartDayInWeek();
                var finDay = startDay + 6;
                var re = new RegExp(date.currMonth + "." + date.currYear);
                var ind, sub;
                for (var i = 0; i < items.length; i++) {
                    //проверяем в текущем ли месяце
                    if (re.test(items[i].date)) {
                        ind = items[i].date.indexOf(".");
                        sub = items[i].date.substr(0, ind)
                        if (sub >= startDay && sub <= finDay) {
                            filtered.push(items[i]);
                        }
                    }

                }


            } else

            if (month) {
                var date = getDataCurr();
                var re = new RegExp(date.currMonth + "." + date.currYear);
                for (var i = 0; i < items.length; i++) {

                    if (re.test(items[i].date)) {
                        filtered.push(items[i]);
                    }
                }

            } else {
                filtered = items;
            }

            if (type) {
                var typeMas = [];
                for (var i = 0; i < filtered.length; i++) {
                    if (type === filtered[i].typeInp) {
                        typeMas.push(filtered[i]);
                    }
                }
                filtered = typeMas;

            }

             if (status) {
                var typeMas = [];
                for (var i = 0; i < filtered.length; i++) {
                    if (status === filtered[i].status) {
                        typeMas.push(filtered[i]);
                    }
                }
                filtered = typeMas;

            }



            return filtered;
        };

        function getStartDayInWeek() {
            var w = 1,
                n = 1,
                y = new Date().getFullYear();
            var d = new Date(y, 0, 7 * w);
            var num = (d.getDate() - (d.getDay() || 7) + n);

            return num
        }

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